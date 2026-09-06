import type { SupabaseClient } from "@supabase/supabase-js";

// Moderator engagement system (2026-09-06). Four existing accounts operate
// as disclosed Bible Buddy team voices (moderator badge + About-page
// disclosure) whose job is to make sure nobody posts into silence: welcome
// first-time posters, acknowledge vulnerable posts, restart stalled
// discussions, keep Verse of the Day threads alive - then get out of the
// way once real members engage. Phase 1: likes run automatically under
// per-day caps; comments are DRAFTED and held in a review queue that Louis
// approves from /moderator-admin (auto_comments stays off by default, and
// vulnerability-flagged posts ALWAYS queue for review regardless).

export type ModeratorKey = "christina" | "marcus" | "mateo" | "harold";

export type ModeratorProfile = {
  key: ModeratorKey;
  userId: string;
  displayName: string;
  persona: string;
};

export const MODERATORS: ModeratorProfile[] = [
  {
    key: "christina",
    userId: "c36fe21d-cca0-4561-b543-b6dba8290316",
    displayName: "Christina",
    persona:
      "You are Christina, a warm, friendly, encouraging Bible Buddy community moderator with a younger conversational style. You welcome new members, respond gently to emotional or personal posts, use an occasional emoji (at most one), and often ask one simple follow-up question. You especially encourage people who are nervous about posting.",
  },
  {
    key: "marcus",
    userId: "4e1f989d-e0ac-49f4-9649-0e38d022960f",
    displayName: "Marcus",
    persona:
      "You are Marcus, a thoughtful, calm, Bible-study-focused Bible Buddy community moderator. You respond to Scripture discussions with short but deeper questions, participate in Verse of the Day threads, and encourage reflection. You rarely use emojis.",
  },
  {
    key: "mateo",
    userId: "e5fa510c-d5bf-4e90-a7a1-1394103a54f8",
    displayName: "Mateo",
    persona:
      "You are Mateo, a casual, friendly, conversational Bible Buddy community moderator. You keep things light with short comments, are good for polls, questions and general conversation, and occasionally use a playful emoji.",
  },
  {
    key: "harold",
    userId: "0867f26e-3384-40fe-a782-21a9f0e12c0b",
    displayName: "Harold",
    persona:
      "You are Harold, an older-feeling, steady, reflective, encouraging Bible Buddy community moderator. You write calm, brief, wise responses, encourage patience, and suit deeper life discussions. You almost never use emojis.",
  },
];

export const MODERATOR_USER_IDS = MODERATORS.map((mod) => mod.userId);

const SHARED_RULES =
  "Rules: Write ONE short community comment (1-3 short sentences, under 45 words). Plain, warm, human language. NEVER invent personal history, stories, family members, or past events - you have none. No sermons, no lectures, no theological correction, no arguing. Never claim to be an ordinary member; you are a community moderator. If the post is about grief, fear or loneliness, be gentle and simple - acknowledge, encourage, maybe point to prayer - never give advice about medical, legal or crisis matters. When natural, end with one simple question that invites the poster (or others) to share more. Output ONLY the comment text.";

export type EngagementCandidate = {
  postId: string;
  authorUserId: string;
  authorName: string;
  title: string | null;
  content: string;
  category: string;
  createdAt: string;
  ageMinutes: number;
  replyCount: number;
  realUserReplied: boolean;
  moderatorReplied: boolean;
  likeCount: number;
  likedByModerator: Set<string>;
  isFirstPost: boolean;
  isVulnerable: boolean;
  isVotd: boolean;
  isAutomated: boolean;
  priority: number;
  reason: string;
};

const VULNERABILITY_PATTERNS = [
  /nervous/i, /scared/i, /afraid/i, /anxious/i, /anxiety/i, /lonely/i, /alone/i,
  /grie(f|ving)/i, /passed away/i, /lost my/i, /depress/i, /discourag/i,
  /pray for me/i, /prayer request/i, /struggling/i, /hard time/i, /giving up/i,
  /don'?t (normally|usually) post/i, /first time post/i, /feel(ing)? ignored/i,
  /hurting/i, /broken/i,
];

const AUTOMATED_CATEGORIES = new Set([
  "weekly_poll", "weekly_question", "weekly_trivia", "who_was_this_friday",
  "bible_study_saturday", "prayer_request_sunday", "update_monday",
]);

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function isVulnerableText(text: string) {
  return VULNERABILITY_PATTERNS.some((pattern) => pattern.test(text));
}

function hashString(value: string) {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

export async function loadModeratorSettings(supabase: SupabaseClient) {
  const defaults = { enabled: true, auto_comments: false, max_likes_per_day: 10, max_comments_per_day: 3, min_delay_minutes: 25 };
  const { data } = await supabase.from("moderator_settings").select("*");
  const byKey = new Map((data || []).map((row: any) => [row.moderator_key, row]));
  const missing = ["global", ...MODERATORS.map((m) => m.key)].filter((key) => !byKey.has(key));
  if (missing.length) {
    const rows = missing.map((key) => ({
      moderator_key: key,
      user_id: MODERATORS.find((m) => m.key === key)?.userId ?? null,
      ...defaults,
    }));
    await supabase.from("moderator_settings").upsert(rows, { onConflict: "moderator_key" });
    rows.forEach((row) => byKey.set(row.moderator_key, row));
  }
  return byKey as Map<string, any>;
}

export async function gatherCandidates(supabase: SupabaseClient, groupId: string): Promise<EngagementCandidate[]> {
  const sinceIso = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const modIds = new Set(MODERATOR_USER_IDS);

  const { data: roots, error: rootsError } = await supabase
    .from("group_posts")
    .select("id, user_id, display_name, title, category, content, like_count, created_at, link_url")
    .eq("group_id", groupId)
    .is("parent_post_id", null)
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false })
    .limit(60);
  if (rootsError) throw new Error(rootsError.message);
  const rootPosts = (roots || []).filter((post) => !modIds.has(post.user_id));
  if (!rootPosts.length) return [];

  const rootIds = rootPosts.map((post) => post.id);
  const [repliesResult, likesResult, actionsResult] = await Promise.all([
    supabase
      .from("group_posts")
      .select("id, user_id, parent_post_id")
      .in("parent_post_id", rootIds)
      .limit(2000),
    supabase
      .from("group_post_likes")
      .select("post_id, user_id")
      .in("post_id", rootIds)
      .in("user_id", MODERATOR_USER_IDS),
    supabase
      .from("moderator_actions")
      .select("target_post_id, action_type, status")
      .in("target_post_id", rootIds)
      .neq("status", "rejected"),
  ]);

  const repliesByPost = new Map<string, Array<{ user_id: string }>>();
  (repliesResult.data || []).forEach((reply: any) => {
    const list = repliesByPost.get(reply.parent_post_id) || [];
    list.push(reply);
    repliesByPost.set(reply.parent_post_id, list);
  });
  const modLikesByPost = new Map<string, Set<string>>();
  (likesResult.data || []).forEach((like: any) => {
    const set = modLikesByPost.get(like.post_id) || new Set<string>();
    set.add(like.user_id);
    modLikesByPost.set(like.post_id, set);
  });
  const commentActionsByPost = new Set(
    (actionsResult.data || [])
      .filter((action: any) => action.action_type === "comment")
      .map((action: any) => action.target_post_id),
  );

  // First-post detection: does the author have any earlier root post?
  const authorIds = Array.from(new Set(rootPosts.map((post) => post.user_id)));
  const { data: earlier } = await supabase
    .from("group_posts")
    .select("user_id, created_at")
    .eq("group_id", groupId)
    .is("parent_post_id", null)
    .in("user_id", authorIds)
    .lt("created_at", sinceIso)
    .limit(1000);
  const hasEarlierPosts = new Set((earlier || []).map((post: any) => post.user_id));
  const seenInWindow = new Map<string, number>();

  const candidates: EngagementCandidate[] = [];
  for (const post of [...rootPosts].reverse()) {
    const replies = repliesByPost.get(post.id) || [];
    const realUserReplied = replies.some((reply) => !modIds.has(reply.user_id) && reply.user_id !== post.user_id);
    const moderatorReplied = replies.some((reply) => modIds.has(reply.user_id)) || commentActionsByPost.has(post.id);
    const text = `${post.title || ""} ${stripHtml(post.content)}`;
    const priorCount = seenInWindow.get(post.user_id) || 0;
    seenInWindow.set(post.user_id, priorCount + 1);
    const isFirstPost = !hasEarlierPosts.has(post.user_id) && priorCount === 0;
    const isVotd = (post.title || "").includes("Verse of the Day");
    // Blog shares and other promo posts carry a link_url - they're official
    // content, not a member opening up, so they never score as vulnerable
    // or first-post candidates.
    const isAutomated = AUTOMATED_CATEGORIES.has(post.category) || isVotd || Boolean((post as any).link_url);
    const ageMinutes = Math.floor((Date.now() - new Date(post.created_at).getTime()) / 60000);
    const isVulnerable = !isAutomated && isVulnerableText(text);
    const looksLikeQuestion = /\?/.test(text);

    let priority = 7;
    let reason = "General community activity.";
    if (isFirstPost && !isAutomated && replies.length === 0) {
      priority = 1;
      reason = "First-time poster with no responses yet.";
    } else if (isVulnerable && replies.length <= 1) {
      priority = 2;
      reason = "Post contains vulnerability signals and has little or no response.";
    } else if (!isAutomated && replies.length === 0 && ageMinutes >= 180) {
      priority = 3;
      reason = `Member post with zero comments after ${Math.round(ageMinutes / 60)}h.`;
    } else if (isVotd && replies.length < 2) {
      priority = 4;
      reason = "Verse of the Day discussion with little engagement.";
    } else if (!isAutomated && looksLikeQuestion && replies.length <= 1) {
      priority = 5;
      reason = "Community question that could start a discussion.";
    }

    candidates.push({
      postId: post.id,
      authorUserId: post.user_id,
      authorName: post.display_name || "Buddy",
      title: post.title,
      content: stripHtml(post.content).slice(0, 600),
      category: post.category,
      createdAt: post.created_at,
      ageMinutes,
      replyCount: replies.length,
      realUserReplied,
      moderatorReplied,
      likeCount: post.like_count || 0,
      likedByModerator: modLikesByPost.get(post.id) || new Set(),
      isFirstPost,
      isVulnerable,
      isVotd,
      isAutomated,
      priority,
      reason,
    });
  }
  return candidates.sort((a, b) => a.priority - b.priority || b.ageMinutes - a.ageMinutes);
}

// Which moderator naturally answers which kind of post. The hash keeps the
// pick stable per post (no flip-flopping between runs) while spreading
// posts across the team instead of always leading with the same voice.
export function pickModerator(candidate: EngagementCandidate): ModeratorProfile {
  const pools: Record<number, ModeratorKey[]> = {
    1: ["christina", "christina", "mateo"],
    2: ["christina", "harold"],
    3: ["mateo", "christina", "harold"],
    4: ["marcus", "marcus", "harold"],
    5: ["mateo", "marcus"],
    6: ["mateo", "christina"],
    7: ["mateo", "harold", "christina", "marcus"],
  };
  const pool = pools[candidate.priority] || pools[7];
  const key = pool[hashString(candidate.postId) % pool.length];
  return MODERATORS.find((mod) => mod.key === key)!;
}

export async function countActionsToday(supabase: SupabaseClient, moderatorKey: string, actionType: "like" | "comment") {
  const dayStart = `${new Date().toISOString().slice(0, 10)}T00:00:00Z`;
  const types = actionType === "like" ? ["like_post", "like_comment"] : ["comment"];
  const { count } = await supabase
    .from("moderator_actions")
    .select("id", { count: "exact", head: true })
    .eq("moderator_key", moderatorKey)
    .in("action_type", types)
    .neq("status", "rejected")
    .gte("created_at", dayStart);
  return count || 0;
}

export async function generateModeratorComment(
  moderator: ModeratorProfile,
  candidate: EngagementCandidate,
  extraInstructions?: string | null,
  prohibitedTopics?: string | null,
): Promise<{ text: string | null; error: string | null }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { text: null, error: "OPENAI_API_KEY not configured" };
  const context =
    `Community post by ${candidate.authorName}` +
    (candidate.isFirstPost ? " (their FIRST post here - welcome them)" : "") +
    (candidate.isVotd ? " (this is today's Verse of the Day discussion post)" : "") +
    `:\nTitle: ${candidate.title || "(none)"}\nContent: ${candidate.content}\n\nWhy you are engaging: ${candidate.reason}`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 120,
        temperature: 0.9,
        messages: [
          {
            role: "system",
            content:
              `${moderator.persona}\n${SHARED_RULES}` +
              (extraInstructions ? `\nExtra instructions from the team: ${extraInstructions}` : "") +
              (prohibitedTopics ? `\nNever engage with or mention these topics: ${prohibitedTopics}` : ""),
          },
          { role: "user", content: context },
        ],
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      return { text: null, error: payload?.error?.message || `OpenAI HTTP ${response.status}` };
    }
    const text = payload?.choices?.[0]?.message?.content?.trim() || null;
    return { text, error: text ? null : "Empty completion" };
  } catch (error) {
    return { text: null, error: error instanceof Error ? error.message : "Generation failed" };
  }
}

export async function likePostAsModerator(supabase: SupabaseClient, moderator: ModeratorProfile, postId: string) {
  const { error: likeError } = await supabase
    .from("group_post_likes")
    .insert({ post_id: postId, user_id: moderator.userId });
  if (likeError) {
    // Unique violation = already liked; anything else bubbles up.
    if (!likeError.message.toLowerCase().includes("duplicate")) throw new Error(likeError.message);
    return false;
  }
  const { data: post } = await supabase.from("group_posts").select("like_count").eq("id", postId).maybeSingle();
  await supabase
    .from("group_posts")
    .update({ like_count: (post?.like_count || 0) + 1 })
    .eq("id", postId);
  return true;
}

export async function postModeratorComment(
  supabase: SupabaseClient,
  moderator: ModeratorProfile,
  groupId: string,
  postId: string,
  category: string,
  text: string,
) {
  const { data: inserted, error } = await supabase
    .from("group_posts")
    .insert({
      group_id: groupId,
      user_id: moderator.userId,
      display_name: moderator.displayName,
      category,
      content: text,
      parent_post_id: postId,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return inserted.id as string;
}

export async function resolveOfficialGroupId(supabase: SupabaseClient) {
  const { data: groups, error } = await supabase
    .from("study_groups")
    .select("id, name, created_at")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const group =
    groups?.find((row) => row.name === "Bible Buddy Study Group") ??
    groups?.find((row) => row.name === "Hope Nation") ??
    null;
  if (!group) throw new Error("Official study group not found.");
  return group.id as string;
}
