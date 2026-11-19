import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { evaluateProfile, validateFullName } from "@/lib/profileCompleteness";

/**
 * The server half of mandatory profile completion (Louis, 2026-11-19).
 *
 * POST { firstName, lastName, profileImageUrl } saves all three or nothing,
 * and answers with the same evaluateProfile() result the browser gate uses.
 *
 * The browser uploads the picture itself to the existing "avatars" bucket at
 * <userId>/avatar.<ext> (the path the profile editor, comments and the old
 * prompts have always used), then posts the public URL here. This route
 * refuses anything that is not either the picture already on the profile or a
 * file that really exists in that user's own avatars folder, and refuses
 * placeholder or invalid names - so a request built by hand cannot mark a
 * profile complete without the three things being there.
 *
 * Completeness is never a stored flag: it is re-derived from display_name and
 * profile_image_url each time, so there is nothing else to forge.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clients() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) return null;
  const opts = { auth: { autoRefreshToken: false, persistSession: false } };
  return {
    supabaseUrl: supabaseUrl.replace(/\/+$/, ""),
    auth: createClient(supabaseUrl, anonKey, opts),
    admin: createClient(supabaseUrl, serviceKey, opts),
  };
}

async function signedInUser(request: NextRequest, auth: NonNullable<ReturnType<typeof clients>>["auth"]) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /i, "") || "";
  if (!token) return null;
  const { data, error } = await auth.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

/** first_name / last_name exist only once supabase/migrations/20261113_profile_first_last_name.sql has run. */
function isMissingNameColumn(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === "42703" || error.code === "PGRST204") return true;
  return /(first_name|last_name)/i.test(error.message || "");
}

export async function POST(request: NextRequest) {
  const c = clients();
  if (!c) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const user = await signedInUser(request, c.auth);
  if (!user) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  let body: { firstName?: unknown; lastName?: unknown; profileImageUrl?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = validateFullName(
    typeof body.firstName === "string" ? body.firstName : "",
    typeof body.lastName === "string" ? body.lastName : "",
    user.email,
  );
  if (!name.ok) return NextResponse.json({ error: name.error, field: "name" }, { status: 400 });

  const imageUrl = typeof body.profileImageUrl === "string" ? body.profileImageUrl.trim() : "";
  if (!imageUrl) {
    return NextResponse.json({ error: "Please choose a profile picture.", field: "photo" }, { status: 400 });
  }

  const { data: current, error: readError } = await c.admin
    .from("profile_stats")
    .select("profile_image_url")
    .eq("user_id", user.id)
    .maybeSingle();
  if (readError) return NextResponse.json({ error: "Could not read your profile. Please try again." }, { status: 503 });

  const keepsCurrent = Boolean(current?.profile_image_url) && current?.profile_image_url === imageUrl;
  if (!keepsCurrent) {
    const ownPrefix = `${c.supabaseUrl}/storage/v1/object/public/avatars/${user.id}/`;
    if (!imageUrl.startsWith(ownPrefix)) {
      return NextResponse.json({ error: "Please upload your profile picture again.", field: "photo" }, { status: 400 });
    }
    const fileName = decodeURIComponent(imageUrl.slice(ownPrefix.length).split(/[?#]/)[0] || "");
    if (!fileName || fileName.includes("/")) {
      return NextResponse.json({ error: "Please upload your profile picture again.", field: "photo" }, { status: 400 });
    }
    const { data: files, error: listError } = await c.admin.storage
      .from("avatars")
      .list(user.id, { search: fileName, limit: 10 });
    if (listError) return NextResponse.json({ error: "Could not check your picture. Please try again." }, { status: 503 });
    if (!(files || []).some((file) => file.name === fileName)) {
      return NextResponse.json({ error: "Your picture did not finish uploading. Please try again.", field: "photo" }, { status: 400 });
    }
  }

  const shared = {
    user_id: user.id,
    display_name: name.fullName,
    username: name.fullName,
    profile_image_url: imageUrl,
  };
  let { error: saveError } = await c.admin
    .from("profile_stats")
    .upsert({ ...shared, first_name: name.firstName, last_name: name.lastName }, { onConflict: "user_id" });
  if (isMissingNameColumn(saveError)) {
    // The structured columns are not in production yet; display_name is what
    // every screen reads, so saving it alone is the complete profile.
    ({ error: saveError } = await c.admin.from("profile_stats").upsert(shared, { onConflict: "user_id" }));
  }
  if (saveError) {
    console.error("[PROFILE_COMPLETE] save failed:", saveError.message);
    return NextResponse.json({ error: "Could not save your profile. Please try again." }, { status: 500 });
  }

  // Keep the auth metadata in step, as settings and the profile editor do.
  // Best effort: the profile row above is what the gate reads.
  const { error: metaError } = await c.admin.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...(user.user_metadata || {}),
      firstName: name.firstName,
      first_name: name.firstName,
      lastName: name.lastName,
      last_name: name.lastName,
      display_name: name.fullName,
    },
  });
  if (metaError) console.warn("[PROFILE_COMPLETE] metadata update failed:", metaError.message);

  const { error: logError } = await c.admin.from("master_actions").insert({
    user_id: user.id,
    action_type: "profile_creation_popup_completed",
    username: name.fullName,
  });
  if (logError) console.warn("[PROFILE_COMPLETE] action log failed:", logError.message);

  return NextResponse.json(evaluateProfile(shared, user.email));
}
