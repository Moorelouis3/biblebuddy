import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LOUIS_EMAIL = "moorelouis3@gmail.com";
const POST_TITLE = "Bible Buddy 3.0 is now ready";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const postHtml = `
<p>Bible Buddy 3.0 is now ready.</p>

<p>This update is really about helping people understand the Bible and stay consistent with it.</p>

<p>A lot of people want to read the Bible, but the hard part is knowing where to start, staying with it, and actually understanding what you are reading. That is what this new system is built around.</p>

<p>The biggest change is in Bible Studies. Bible Buddy now has a guided study system for every part of the Bible. It is not all fully done yet, but I will be building it out over the next weeks.</p>

<p>Genesis and Exodus are done, so you can start right now with <strong>The Creation of the World</strong>, which begins at Genesis 1.</p>

<p>To start, go to your main Dashboard and select it from the current Bible Study card. From there, Bible Buddy will walk you through the flow: the study intro, the Bible chapter, notes, trivia, Scrambled, and reflection.</p>

<p>The goal is not to rush. The goal is to keep showing up, understand what you are reading, and slowly build a real Bible study habit.</p>

<p>If you have ever felt like you did not know where to begin, this is what Bible Buddy is trying to solve.</p>
`.trim();

function getBerlinDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function berlinDateTimeToUtcIso(dateKey: string, hour = 2) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, 0, 0));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utcGuess);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asIfUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );
  const desiredAsIfUtc = Date.UTC(year, month - 1, day, hour, 0, 0);
  return new Date(utcGuess.getTime() + (desiredAsIfUtc - asIfUtc)).toISOString();
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

async function resolveLouisUserId() {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;
  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  const found = data.users.find((user) => user.email?.toLowerCase() === LOUIS_EMAIL);
  if (found?.id) return found.id;

  const { data: profile, error: profileError } = await supabase
    .from("profile_stats")
    .select("user_id")
    .or("username.eq.moorelouis3,display_name.eq.moorelouis3,username.eq.Louis,display_name.eq.Louis Moore")
    .limit(1)
    .maybeSingle();

  if (profileError) throw profileError;
  if (!profile?.user_id) throw new Error(`Could not find ${LOUIS_EMAIL}.`);
  return profile.user_id as string;
}

async function getNextScheduledIso() {
  const { data, error } = await supabase
    .from("group_feed_carousel_queue")
    .select("scheduled_for")
    .eq("group_id", BIBLE_STUDY_GROUP_ID)
    .neq("status", "published")
    .not("scheduled_for", "is", null)
    .order("scheduled_for", { ascending: false })
    .limit(1);

  if (error) throw error;

  const latest = data?.[0]?.scheduled_for ? new Date(data[0].scheduled_for) : new Date();
  const latestDateKey = getBerlinDateKey(latest);
  const nextDate = addDays(new Date(`${latestDateKey}T00:00:00.000Z`), 1);
  return berlinDateTimeToUtcIso(getBerlinDateKey(nextDate), 2);
}

async function main() {
  const louisUserId = await resolveLouisUserId();
  const scheduledFor = await getNextScheduledIso();

  const { data: existing, error: existingError } = await supabase
    .from("group_feed_carousel_queue")
    .select("id")
    .eq("group_id", BIBLE_STUDY_GROUP_ID)
    .eq("created_by", louisUserId)
    .eq("title", POST_TITLE)
    .is("published_post_id", null)
    .maybeSingle();

  if (existingError) throw existingError;

  const payload = {
    group_id: BIBLE_STUDY_GROUP_ID,
    created_by: louisUserId,
    post_style: "text" as const,
    title: POST_TITLE,
    caption: postHtml,
    cover_image_url: null,
    scheduled_for: scheduledFor,
    status: "scheduled" as const,
    updated_at: new Date().toISOString(),
  };

  if (existing?.id) {
    const { error } = await supabase
      .from("group_feed_carousel_queue")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
    console.log(`Updated scheduled post ${existing.id} for ${scheduledFor}`);
    return;
  }

  const { data: inserted, error } = await supabase
    .from("group_feed_carousel_queue")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  console.log(`Created scheduled post ${inserted.id} for ${scheduledFor}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
