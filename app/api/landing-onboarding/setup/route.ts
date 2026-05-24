import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Answers = {
  goal?: string;
  experience?: string;
  ageRange?: string;
  time?: string;
  difficulty?: string;
};

function normalizeExperienceForProfile(experience: string | null | undefined) {
  if (experience === "I'm just getting started") return "brand_new";
  if (experience === "Less than 1 year") return "beginner";
  if (experience === "1-3 years") return "intermediate";
  return "experienced";
}

function normalizeGoalForProfile(goal: string | null | undefined) {
  if (goal === "Understand the Bible better") return "understand_bible";
  if (goal === "Grow closer to God") return "grow_closer_to_god";
  if (goal === "Study with other believers") return "study_with_buddies";
  return "build_consistency";
}

function getLocalDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dataUrlToUpload(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("data:")) return null;
  const match = value.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  const mime = match[1] || "image/jpeg";
  if (!mime.startsWith("image/")) return null;
  const extension = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
  return {
    buffer: Buffer.from(match[2] || "", "base64"),
    mime,
    extension,
  };
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "You need to be signed in before setup can finish." }, { status: 401 });
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Could not verify the new account session." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const fullName = typeof body?.fullName === "string" && body.fullName.trim() ? body.fullName.trim() : "Bible Buddy";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : userData.user.email || "";
  const answers = (body?.answers && typeof body.answers === "object" ? body.answers : {}) as Answers;
  const recommendationDays = Number.isFinite(Number(body?.recommendationDays)) ? Number(body.recommendationDays) : 365;

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const nowIso = new Date().toISOString();
  const todayKey = getLocalDateKey();

  let profileImageUrl: string | null = null;
  const imageUpload = dataUrlToUpload(body?.profileImage);
  if (imageUpload?.buffer.length) {
    const path = `${userData.user.id}/landing-avatar.${imageUpload.extension}`;
    const { error: uploadError } = await admin.storage.from("avatars").upload(path, imageUpload.buffer, {
      contentType: imageUpload.mime,
      upsert: true,
    });
    if (!uploadError) {
      const { data } = admin.storage.from("avatars").getPublicUrl(path);
      profileImageUrl = data.publicUrl;
    } else {
      console.warn("[LANDING_SETUP] Profile image upload skipped:", uploadError.message);
    }
  }

  const { data: creationStudy } = await admin
    .from("devotionals")
    .select("id")
    .eq("title", "The Creation of the World")
    .maybeSingle();
  const creationStudyId = typeof creationStudy?.id === "string" ? creationStudy.id : null;

  const { error: profileError } = await admin.from("profile_stats").upsert(
    {
      user_id: userData.user.id,
      display_name: fullName,
      username: fullName,
      ...(profileImageUrl ? { profile_image_url: profileImageUrl } : {}),
      onboarding_completed: true,
      landing_onboarding_completed: true,
      traffic_source: "landing_questionnaire",
      bible_experience_level: normalizeExperienceForProfile(answers.experience),
      onboarding_goal: normalizeGoalForProfile(answers.goal),
      age_range: answers.ageRange ?? null,
      onboarding_time_commitment: answers.time ?? null,
      onboarding_difficulty: answers.difficulty ?? null,
      bible_year_started_at: todayKey,
      bible_year_launch_seen_at: nowIso,
      free_devotional_id: creationStudyId,
      louis_primary_devotional_id: creationStudyId,
      louis_primary_devotional_day: 1,
      updated_at: nowIso,
    },
    { onConflict: "user_id" },
  );

  if (profileError) {
    console.error("[LANDING_SETUP] profile_stats setup failed:", profileError);
    return NextResponse.json({ error: "Could not create your Bible Buddy dashboard profile." }, { status: 500 });
  }

  const { error: responseError } = await admin.from("landing_onboarding_responses").upsert(
    {
      user_id: userData.user.id,
      full_name: fullName,
      email,
      goal: answers.goal ?? null,
      experience: answers.experience ?? null,
      age_range: answers.ageRange ?? null,
      time_commitment: answers.time ?? null,
      difficulty: answers.difficulty ?? null,
      recommended_journey: "Bible in One Year",
      recommended_days: recommendationDays,
      updated_at: nowIso,
    },
    { onConflict: "user_id" },
  );
  if (responseError) console.warn("[LANDING_SETUP] onboarding response save skipped:", responseError.message);

  const { error: bibleYearProgressError } = await admin.from("bible_year_day_progress").upsert(
    {
      user_id: userData.user.id,
      day_number: 1,
      reading_completed: false,
      trivia_completed: false,
      reflection_completed: false,
    },
    { onConflict: "user_id,day_number" },
  );
  if (bibleYearProgressError) console.warn("[LANDING_SETUP] Bible Year progress seed skipped:", bibleYearProgressError.message);

  if (creationStudyId) {
    const { error: devotionalProgressError } = await admin.from("devotional_progress").upsert(
      {
        user_id: userData.user.id,
        devotional_id: creationStudyId,
        day_number: 1,
        is_completed: false,
        reading_completed: false,
      },
      { onConflict: "user_id,devotional_id,day_number" },
    );
    if (devotionalProgressError) console.warn("[LANDING_SETUP] devotional progress seed skipped:", devotionalProgressError.message);
  }

  return NextResponse.json({ ok: true });
}
