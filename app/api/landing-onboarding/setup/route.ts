import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Answers = {
  goal?: string;
  experience?: string;
  studyFocus?: string;
  time?: string;
  difficulty?: string;
};

type StudyRoute = "bible_year" | "devotional";

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

async function getNextGuestDisplayName(admin: any) {
  const { count, error: countError } = await admin
    .from("profile_stats")
    .select("user_id", { count: "exact", head: true })
    .eq("account_type", "guest");

  if (!countError && typeof count === "number") {
    return `Bible Buddy Guest #${count + 1}`;
  }

  const { data, error } = await admin
    .from("profile_stats")
    .select("display_name")
    .ilike("display_name", "Bible Buddy Guest #%")
    .limit(10000);

  if (error) {
    console.warn("[LANDING_SETUP] Guest display name count fallback failed:", error.message);
    return `Bible Buddy Guest #${Date.now().toString().slice(-6)}`;
  }

  const guestRows = (data || []) as Array<{ display_name?: string | null }>;
  const maxGuestNumber = guestRows.reduce((max, row) => {
    const displayName = typeof row.display_name === "string" ? row.display_name : "";
    const match = displayName.match(/^Bible Buddy Guest #(\d+)$/i);
    const guestNumber = match ? Number(match[1]) : 0;
    return Number.isFinite(guestNumber) && guestNumber > max ? guestNumber : max;
  }, 0);

  return `Bible Buddy Guest #${maxGuestNumber + 1}`;
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
  let fullName = typeof body?.fullName === "string" && body.fullName.trim() ? body.fullName.trim() : "Bible Buddy";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : userData.user.email || "";
  const answers = (body?.answers && typeof body.answers === "object" ? body.answers : {}) as Answers;
  const recommendationDays = Number.isFinite(Number(body?.recommendationDays)) ? Number(body.recommendationDays) : 365;
  const requestedStudyRoute: StudyRoute = "bible_year";
  const requestedDevotionalId = null;

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const isAnonymousUser = Boolean((userData.user as any).is_anonymous) || !userData.user.email;
  if (isAnonymousUser) {
    fullName = await getNextGuestDisplayName(admin);
    const { error: metadataError } = await admin.auth.admin.updateUserById(userData.user.id, {
      user_metadata: {
        ...(userData.user.user_metadata || {}),
        display_name: fullName,
      },
    });
    if (metadataError) {
      console.warn("[LANDING_SETUP] Guest auth metadata name update skipped:", metadataError.message);
    }
  }

  const nowIso = new Date().toISOString();
  const todayKey = getLocalDateKey();
  const [{ data: existingProfile }, { data: existingBibleYearProgressRows }] = await Promise.all([
    admin
      .from("profile_stats")
      .select("bible_year_started_at, bible_year_launch_seen_at")
      .eq("user_id", userData.user.id)
      .maybeSingle(),
    admin
      .from("bible_year_day_progress")
      .select("day_number")
      .eq("user_id", userData.user.id)
      .limit(1),
  ]);
  const hasExistingBibleYearProgress = Boolean(existingBibleYearProgressRows && existingBibleYearProgressRows.length > 0);

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

  const profilePayload = {
      user_id: userData.user.id,
      display_name: fullName,
      username: fullName,
      ...(profileImageUrl ? { profile_image_url: profileImageUrl } : {}),
      onboarding_completed: true,
      landing_onboarding_completed: true,
      account_type: isAnonymousUser ? "guest" : "registered",
      app_theme: "light",
      guest_started_at: isAnonymousUser ? nowIso : null,
      registered_at: isAnonymousUser ? null : nowIso,
      converted_from_guest_at: null,
      traffic_source: "landing_questionnaire",
      bible_experience_level: normalizeExperienceForProfile(answers.experience),
      onboarding_goal: normalizeGoalForProfile(answers.goal),
      preferred_study_mode: "bible_year",
      onboarding_study_focus: answers.studyFocus ?? null,
      onboarding_time_commitment: answers.time ?? null,
      onboarding_difficulty: answers.difficulty ?? null,
      bible_year_started_at: existingProfile?.bible_year_started_at || todayKey,
      bible_year_launch_seen_at: existingProfile?.bible_year_launch_seen_at || nowIso,
      free_devotional_id: null,
      louis_primary_devotional_id: null,
      louis_primary_devotional_day: 1,
      updated_at: nowIso,
    };

  let { error: profileError } = await admin.from("profile_stats").upsert(profilePayload, { onConflict: "user_id" });

  if (profileError && /preferred_study_mode|account_type|guest_started_at|registered_at|converted_from_guest_at|onboarding_study_focus|onboarding_time_commitment|onboarding_difficulty|bible_year_started_at|bible_year_launch_seen_at/i.test(profileError.message || "")) {
    const {
      preferred_study_mode: _preferredStudyMode,
      account_type: _accountType,
      guest_started_at: _guestStartedAt,
      registered_at: _registeredAt,
      converted_from_guest_at: _convertedFromGuestAt,
      onboarding_study_focus: _onboardingStudyFocus,
      onboarding_time_commitment: _onboardingTimeCommitment,
      onboarding_difficulty: _onboardingDifficulty,
      ...fallbackProfilePayload
    } = profilePayload;
    const fallback = await admin.from("profile_stats").upsert(fallbackProfilePayload, { onConflict: "user_id" });
    profileError = fallback.error;
  }

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
      study_focus: answers.studyFocus ?? null,
      time_commitment: answers.time ?? null,
      difficulty: answers.difficulty ?? null,
      recommended_journey: "Bible in One Year",
      recommended_days: recommendationDays,
      updated_at: nowIso,
    },
    { onConflict: "user_id" },
  );
  if (responseError) console.warn("[LANDING_SETUP] onboarding response save skipped:", responseError.message);

  if (!hasExistingBibleYearProgress) {
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
  }

  return NextResponse.json({ ok: true, displayName: fullName });
}
