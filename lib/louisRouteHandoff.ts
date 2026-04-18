"use client";

import type { DailyRecommendation } from "./dailyRecommendation";
import { supabase } from "./supabaseClient";

const LOUIS_ROUTE_HANDOFF_KEY = "bb:louis:route-handoff";
const LOUIS_ROUTE_HANDOFF_MAX_AGE_MS = 1000 * 60 * 10;

export type LouisRouteHandoff = {
  targetPath: string;
  message: string;
  createdAt: number;
};

type GroupNotificationRow = {
  message: string | null;
  from_user_name: string | null;
  created_at: string;
};

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickVariant(seed: string, options: string[]) {
  if (options.length === 0) return "";
  return options[hashString(seed) % options.length];
}

function getPathnameFromHref(href: string) {
  try {
    return new URL(href, "https://biblebuddy.local").pathname;
  } catch {
    return href.split("?")[0] || href;
  }
}

function normalizeRecommendationLabel(recommendation: DailyRecommendation) {
  return (
    recommendation.cardTitle ||
    recommendation.primaryButtonText ||
    "this next step"
  ).replace(/^Continue\s+/i, "").trim();
}

function normalizeNotificationLine(row: GroupNotificationRow) {
  const raw = row.message?.trim();
  if (!raw) {
    return row.from_user_name
      ? `${row.from_user_name} did something new in The Bible Study Group.`
      : "There is something new waiting in The Bible Study Group.";
  }

  return raw.endsWith(".") ? raw : `${raw}.`;
}

async function buildGroupRecommendationMessage(
  recommendation: DailyRecommendation,
  seed: string,
) {
  const { data } = await supabase
    .from("notifications")
    .select("message, from_user_name, created_at")
    .like("article_slug", "/study-groups/%")
    .order("created_at", { ascending: false })
    .limit(2);

  const recentLines = ((data as GroupNotificationRow[] | null) || [])
    .map(normalizeNotificationLine)
    .filter(Boolean)
    .slice(0, 2);

  if (recentLines.length > 0) {
    return pickVariant(seed, [
      `You are in The Bible Study Group now.\n\n${recentLines.join("\n")}\n\nCatch up on what is new and jump into the conversation if something stands out.\n\nYou do not have to study alone in here.`,
      `This is The Bible Study Group.\n\n${recentLines.join("\n")}\n\nStart with what is fresh so you do not miss the thread of the conversation.\n\nIf you want help finding where to jump in, ask me.`,
      `You made it into The Bible Study Group.\n\n${recentLines.join("\n")}\n\nSee what is active right now, then add your voice if something hits you.\n\nI am here if you want help figuring out where to start.`,
    ]);
  }

  return pickVariant(seed, [
    `You are in The Bible Study Group now.\n\nLook for what is active today and do not be afraid to join the discussion.\n\nCommunity works best when people actually show up and say something.\n\nYou do not have to study alone in here.`,
    `This is The Bible Study Group.\n\nCheck what is new and see where you can jump into the conversation.\n\nA quick comment or reply can help you stay connected.\n\nI am here if you want help finding where to start.`,
    `You made it into The Bible Study Group.\n\nDo not just scroll past everything.\n\nSee what people are saying, look for the discussion, and join in if something stands out.\n\nI am right here if you need help.`,
  ]);
}

export async function buildLouisRecommendationHandoff(
  recommendation: DailyRecommendation,
): Promise<LouisRouteHandoff | null> {
  const targetPath = getPathnameFromHref(recommendation.primaryButtonHref);
  const label = normalizeRecommendationLabel(recommendation);
  const seed = `${recommendation.recommendationKey || recommendation.primaryButtonHref}:${recommendation.category || "general"}`;

  if (targetPath.startsWith("/devotionals/")) {
    return null;
  }

  let message = "";

  if (targetPath === "/settings") {
    message = pickVariant(seed, [
      `You are in your profile settings now.\n\nTake a minute and finish it the right way.\n\nThe more complete your profile is, the more Bible Buddy feels like a real community.\n\nI am here if you want help deciding what to add.`,
      `You are in the profile setup now.\n\nClean up what is missing while you are here.\n\nA good profile makes it easier for people to know who they are studying with.\n\nIf you need help, just ask me.`,
      `This is a quick profile win.\n\nAdd the missing pieces and make the app feel more personal.\n\nA little setup here goes a long way later.\n\nI am here if you want help with it.`,
    ]);
  } else if (targetPath.startsWith("/Bible") || targetPath === "/reading") {
    message = pickVariant(seed, [
      `You are back in Scripture now.\n\nSlow down and really read what is in front of you.\n\nThen sit with what stands out before you move on.\n\nI am here if you want help understanding what you read.`,
      `You are back in the Bible now.\n\nDo not rush it just to say you opened the page.\n\nRead the chapter, pay attention, and let the Word speak before you move on.\n\nIf anything feels unclear, ask me.`,
      `This next step puts you back in the Bible.\n\nRead carefully and stay with the chapter long enough to actually take something from it.\n\nUnderstanding grows when you stop and pay attention.\n\nI am here if you need me.`,
    ]);
  } else if (targetPath.startsWith("/study-groups")) {
    message = await buildGroupRecommendationMessage(recommendation, seed);
  } else if (targetPath.startsWith("/biblebuddy-tv")) {
    message = pickVariant(seed, [
      `You are watching ${label} now.\n\nDo not just play it in the background and move on.\n\nPay attention to what lines up with what you have been reading lately.\n\nIf you want to talk through it after, ask me.`,
      `This is a good next watch.\n\nStay present with it and listen for what connects back to Scripture.\n\nGood teaching lands better when you actually slow down and take it in.\n\nI am here if you want to talk about it after.`,
      `You are in Bible Buddy TV now.\n\nWatch this with intention and look for what God might be trying to highlight.\n\nA good teaching can deepen what you have already been reading.\n\nIf anything stands out, come tell me.`,
    ]);
  } else if (targetPath.startsWith("/bible-trivia") || targetPath.startsWith("/bible-study-games")) {
    message = pickVariant(seed, [
      `You are testing what stuck now.\n\nTake your time and actually think through the answers.\n\nThis is one of the easiest ways to lock in what you have been learning.\n\nAfter you finish, come back and tell me how it went.`,
      `You are in a Bible game now.\n\nDo not just tap through it.\n\nUse it to see what you really remember and where you need to go back.\n\nI am here if you want help after.`,
      `This is a good way to reinforce what you have been learning.\n\nSlow down and let the game show you what actually stayed with you.\n\nThe goal is not speed. It is retention.\n\nIf you want, we can talk through it after.`,
    ]);
  } else if (
    targetPath.startsWith("/people-in-the-bible") ||
    targetPath.startsWith("/places-in-the-bible") ||
    targetPath.startsWith("/keywords-in-the-bible")
  ) {
    message = pickVariant(seed, [
      `You are in the Bible reference tools now.\n\nUse this to understand the people, places, or words behind what you have been reading.\n\nA little context can make the whole passage feel clearer.\n\nIf you want help connecting it back to Scripture, ask me.`,
      `This is one of the best ways to add context fast.\n\nTake a minute and really learn what is behind the name or word you are looking at.\n\nThat kind of detail makes your Bible reading stronger.\n\nI am here if you want to talk it through.`,
      `You are stepping into the deeper study side now.\n\nRead closely and look for the context that helps the passage make more sense.\n\nSmall details matter more than people think.\n\nIf something clicks, come tell me.`,
    ]);
  } else {
    message = pickVariant(seed, [
      `You are in ${label} now.\n\nTake a minute and do it with intention.\n\nThe point is not just opening the page. The point is actually moving forward.\n\nI am here if you need help once you get there.`,
      `This is your next step.\n\nDo not just tap in and drift.\n\nTake a real minute with it and let it move you forward today.\n\nIf you need help, ask me.`,
      `You are in ${label} now.\n\nStay with it long enough to get something real from it.\n\nA small focused step still counts.\n\nI am here if you want help once you are in.`,
    ]);
  }

  return {
    targetPath,
    message,
    createdAt: Date.now(),
  };
}

export function storeLouisRouteHandoff(handoff: LouisRouteHandoff) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LOUIS_ROUTE_HANDOFF_KEY, JSON.stringify(handoff));
}

export function consumeLouisRouteHandoff(pathname: string) {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(LOUIS_ROUTE_HANDOFF_KEY);
  if (!raw) return null;

  try {
    const handoff = JSON.parse(raw) as LouisRouteHandoff;
    if (!handoff?.targetPath || !handoff?.message || !handoff?.createdAt) {
      window.sessionStorage.removeItem(LOUIS_ROUTE_HANDOFF_KEY);
      return null;
    }

    if (Date.now() - handoff.createdAt > LOUIS_ROUTE_HANDOFF_MAX_AGE_MS) {
      window.sessionStorage.removeItem(LOUIS_ROUTE_HANDOFF_KEY);
      return null;
    }

    if (handoff.targetPath !== pathname) {
      return null;
    }

    window.sessionStorage.removeItem(LOUIS_ROUTE_HANDOFF_KEY);
    return handoff;
  } catch {
    window.sessionStorage.removeItem(LOUIS_ROUTE_HANDOFF_KEY);
    return null;
  }
}
