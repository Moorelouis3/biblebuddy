"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import CreditLimitModal from "@/components/CreditLimitModal";
import { LouisAvatar } from "@/components/LouisAvatar";
import { triggerPoints } from "@/components/PointsPop";
import PostMentionSuggestions from "@/components/PostMentionSuggestions";
import { ACTION_TYPE } from "@/lib/actionTypes";
import {
  type GroupRecurringOverrideRow,
  type RecurringOverridePayload,
  type RecurringPollOverridePayload,
  type RecurringQuestionOverridePayload,
  type RecurringScheduleKey,
  type RecurringSeriesOverridePayload,
  type RecurringTriviaOverridePayload,
  normalizeRecurringOverridePayload,
} from "@/lib/groupRecurringOverrides";
import {
  buildBibleStudySaturdayPost,
  buildPrayerRequestSundayPost,
  buildUpdateMondayPost,
  buildWhoWasThisFridayPost,
  getBerlinDateKey,
  type BibleStudySeriesSnapshot,
} from "@/lib/groupRecurringSeries";
import { GROUP_SCHEDULE_TIME_ZONE } from "@/lib/groupScheduleTimeZone";
import { resolveBibleReference } from "@/lib/bibleTermResolver";
import { consumeCreditAction } from "@/lib/creditClient";
import { buildWeeklyGroupPoll } from "@/lib/groupWeeklyPoll";
import { buildWeeklyGroupQuestion } from "@/lib/groupWeeklyQuestion";
import { buildWeeklyGroupTrivia } from "@/lib/groupWeeklyTrivia";
import { enrichBibleVerses } from "@/lib/bibleHighlighting";
import {
  linkMentionItemsInHtml,
  loadGroupPostMentions,
  type MentionCatalogItem,
} from "@/lib/groupPostMentions";

type GroupBasics = {
  id: string;
  name: string;
  cover_emoji: string | null;
};

type GroupSeriesRow = {
  id: string;
  title: string | null;
  total_weeks: number | null;
};

type RecurringPreviewItem = {
  scheduleId: string;
  key: RecurringScheduleKey;
  weekKey: string;
  label: string;
  accent: string;
  releaseIso: string;
  isPublished: boolean;
  title: string;
  description: string | null;
  contentHtml: string;
  pollOptions?: string[];
  defaultOverridePayload: RecurringOverridePayload;
  supplementalHtml?: string;
  endpoint: string;
};

type ScriptureSelection = {
  reference: string;
  book: string;
  chapter: number;
};

type QueueItem = {
  id: string;
  group_id: string;
  created_by: string;
  post_style: "cover" | "text";
  title: string | null;
  caption: string | null;
  cover_image_url: string | null;
  scheduled_for: string | null;
  status: "draft" | "scheduled" | "published";
  published_post_id: string | null;
  published_at: string | null;
  created_at: string;
};

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function getErrorMessage(error: unknown, fallback: string) {
  const rawMessage =
    error instanceof Error && error.message
      ? error.message
      : error && typeof error === "object" && "message" in error && typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : null;

  if (rawMessage) {
    if (rawMessage.toLowerCase().includes("statement timeout")) {
      return "Posting is taking longer than usual right now. Please try again in a moment.";
    }
    return rawMessage;
  }
  return fallback;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatCountdown(isoDate: string, now: number): string {
  const diff = new Date(isoDate).getTime() - now;
  if (diff <= 0) return "Live now";
  const totalMins = Math.floor(diff / 60_000);
  const hours = Math.floor(totalMins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `in ${days}d ${hours % 24}h`;
  if (hours > 0) return `in ${hours}h ${totalMins % 60}m`;
  return `in ${totalMins}m`;
}

function getBerlinDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: parts.weekday as "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
  };
}

function getBerlinDateWithOffset(offsetDays: number) {
  const berlin = getBerlinDateParts();
  const date = new Date(Date.UTC(berlin.year, berlin.month - 1, berlin.day, 12, 0, 0));
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date;
}

function getBerlinDateWithOffsetFrom(baseDate: Date, offsetDays: number) {
  const berlin = getBerlinDateParts(baseDate);
  const date = new Date(Date.UTC(berlin.year, berlin.month - 1, berlin.day, 12, 0, 0));
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date;
}

function getBerlinDateTimeParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  });
  const zoneName = formatter.formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "GMT+0";
  const match = zoneName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/i);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
}

function convertBerlinLocalInputToIso(value: string) {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return null;

  const [, yearRaw, monthRaw, dayRaw, hourRaw, minuteRaw] = match;
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);

  const firstGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const firstOffset = getTimeZoneOffsetMinutes(firstGuess, GROUP_SCHEDULE_TIME_ZONE);
  const adjusted = new Date(Date.UTC(year, month - 1, day, hour, minute, 0) - firstOffset * 60_000);
  const finalOffset = getTimeZoneOffsetMinutes(adjusted, GROUP_SCHEDULE_TIME_ZONE);
  const finalDate = finalOffset === firstOffset
    ? adjusted
    : new Date(Date.UTC(year, month - 1, day, hour, minute, 0) - finalOffset * 60_000);

  return finalDate.toISOString();
}

function formatQueueDateTime(iso: string | null | undefined) {
  if (!iso) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatBerlinLocalInputFromDate(date: Date, hour: number, minute: number) {
  const parts = getBerlinDateTimeParts(date);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${pad(hour)}:${pad(minute)}`;
}

function getNextBaseQueueAutoScheduleIso(now = new Date()) {
  let candidateDate = getBerlinDateWithOffsetFrom(now, 0);
  let candidateIso = convertBerlinLocalInputToIso(formatBerlinLocalInputFromDate(candidateDate, 2, 0));

  if (!candidateIso || new Date(candidateIso).getTime() <= now.getTime()) {
    candidateDate = getBerlinDateWithOffsetFrom(now, 1);
    candidateIso = convertBerlinLocalInputToIso(formatBerlinLocalInputFromDate(candidateDate, 2, 0));
  }

  return candidateIso;
}

function getNextDayBerlin2amIso(afterIso: string) {
  return convertBerlinLocalInputToIso(
    formatBerlinLocalInputFromDate(getBerlinDateWithOffsetFrom(new Date(afterIso), 1), 2, 0),
  );
}

function getNextQueueAutoScheduleIso(
  queueItems: QueueItem[],
  editingQueueItemId?: string | null,
  existingScheduledFor?: string | null,
) {
  if (existingScheduledFor) return existingScheduledFor;

  const candidateIso = getNextBaseQueueAutoScheduleIso();

  const latestScheduledIso = queueItems
    .filter((item) => item.id !== editingQueueItemId && item.status !== "published" && item.scheduled_for)
    .map((item) => item.scheduled_for as string)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .at(-1);

  if (!latestScheduledIso) return candidateIso;

  const latestPlusOneIso = getNextDayBerlin2amIso(latestScheduledIso);
  if (!latestPlusOneIso) return candidateIso;
  if (!candidateIso) return latestPlusOneIso;

  return new Date(latestPlusOneIso).getTime() > new Date(candidateIso).getTime()
    ? latestPlusOneIso
    : candidateIso;
}

function parseBibleReference(reference: string) {
  const match = reference.match(/^((?:[1-3]\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+):?/);
  if (!match) return null;

  const book = match[1].trim();
  const chapter = Number(match[2]);
  if (!book || Number.isNaN(chapter)) return null;

  return { book, chapter };
}

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function linkBibleReferencesInHtml(html: string) {
  return html.replace(
    /\b((?:[1-3]\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+):(\d+)(?:-(\d+))?\b/g,
    (match) =>
      `<button type="button" class="scripture-ref-link inline font-semibold text-[#8d5d38] underline underline-offset-2" data-scripture-ref="${escapeHtmlAttribute(match)}">${match}</button>`,
  );
}

function getRecurringPreviewItem(
  date: Date,
  seriesSnapshot: BibleStudySeriesSnapshot | null,
): RecurringPreviewItem {
  const berlin = getBerlinDateParts(date);

  switch (berlin.weekday) {
    case "Mon": {
      const post = buildUpdateMondayPost(date);
      return {
        scheduleId: `update_monday:${post.weekKey}`,
        key: "update_monday",
        weekKey: post.weekKey,
        label: "Update Monday",
        accent: "#5a9a5a",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: post.title,
        description: post.description,
        contentHtml: post.contentHtml,
        defaultOverridePayload: {
          kind: "series",
          title: post.title,
          description: post.description,
          contentHtml: post.contentHtml,
        },
        endpoint: "update-monday",
      };
    }
    case "Tue": {
      const trivia = buildWeeklyGroupTrivia(date);
      const questionsHtml = trivia.questions
        .map((q, i) => `<li><strong>Q${i + 1}:</strong> ${q.question}</li>`)
        .join("");
      const supplementalHtml =
        `<ol>${questionsHtml}</ol>` +
        `<p>Tap into this week's 10-question Bible trivia, see your score, and compare with the group board below.</p>`;
      return {
        scheduleId: `trivia_tuesday:${trivia.weekKey}`,
        key: "trivia_tuesday",
        weekKey: trivia.weekKey,
        label: "Trivia Tuesday",
        accent: "#4a9b6f",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: `Weekly Bible Trivia: ${trivia.subjectTitle}`,
        description: trivia.intro,
        contentHtml:
          `<p><strong>${trivia.subjectTitle}</strong></p>` +
          `<p>${trivia.intro}</p>` +
          supplementalHtml,
        defaultOverridePayload: {
          kind: "trivia",
          subjectTitle: trivia.subjectTitle,
          intro: trivia.intro,
        },
        supplementalHtml,
        endpoint: "weekly-trivia",
      };
    }
    case "Wed": {
      const poll = buildWeeklyGroupPoll(date);
      return {
        scheduleId: `opinion_wednesday:${poll.weekKey}`,
        key: "opinion_wednesday",
        weekKey: poll.weekKey,
        label: "Opinion Wednesday",
        accent: "#5d7ec2",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: poll.question,
        description: poll.intro,
        contentHtml: poll.intro ? `<p>${poll.intro}</p>` : "",
        pollOptions: poll.options.map((option) => option.text),
        defaultOverridePayload: {
          kind: "poll",
          question: poll.question,
          intro: poll.intro || "",
          options: poll.options.map((option) => option.text),
        },
        endpoint: "weekly-poll",
      };
    }
    case "Thu": {
      const question = buildWeeklyGroupQuestion(date);
      return {
        scheduleId: `truth_thursday:${question.weekKey}`,
        key: "truth_thursday",
        weekKey: question.weekKey,
        label: "Truth Thursday",
        accent: "#b7794d",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: question.prompt,
        description: question.intro,
        contentHtml: `<p>${question.intro}</p><p>${question.commentPrompt}</p>`,
        defaultOverridePayload: {
          kind: "question",
          prompt: question.prompt,
          intro: question.intro,
          commentPrompt: question.commentPrompt,
        },
        endpoint: "weekly-question",
      };
    }
    case "Fri": {
      const post = buildWhoWasThisFridayPost(date);
      return {
        scheduleId: `who_was_this_friday:${post.weekKey}`,
        key: "who_was_this_friday",
        weekKey: post.weekKey,
        label: "Who Was This Friday",
        accent: "#a2684f",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: post.title,
        description: post.description,
        contentHtml: post.contentHtml,
        defaultOverridePayload: {
          kind: "series",
          title: post.title,
          description: post.description,
          contentHtml: post.contentHtml,
        },
        endpoint: "who-was-this-friday",
      };
    }
    case "Sat": {
      const post = buildBibleStudySaturdayPost(date, seriesSnapshot);
      return {
        scheduleId: `bible_study_saturday:${post.weekKey}`,
        key: "bible_study_saturday",
        weekKey: post.weekKey,
        label: "Bible Study Saturday",
        accent: "#8d5d38",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: post.title,
        description: post.description,
        contentHtml: post.contentHtml,
        defaultOverridePayload: {
          kind: "series",
          title: post.title,
          description: post.description,
          contentHtml: post.contentHtml,
        },
        endpoint: "bible-study-saturday",
      };
    }
    case "Sun":
    default: {
      const post = buildPrayerRequestSundayPost(date);
      return {
        scheduleId: `prayer_request_sunday:${post.weekKey}`,
        key: "prayer_request_sunday",
        weekKey: post.weekKey,
        label: "Prayer Request Sunday",
        accent: "#7b5ca8",
        releaseIso: date.toISOString(),
        isPublished: false,
        title: post.title,
        description: post.description,
        contentHtml: post.contentHtml,
        defaultOverridePayload: {
          kind: "series",
          title: post.title,
          description: post.description,
          contentHtml: post.contentHtml,
        },
        endpoint: "prayer-request-sunday",
      };
    }
  }
}

function queueStatusLabel(item: QueueItem) {
  if (item.status === "published") return "Posted";
  if (item.status === "scheduled") return "Scheduled";
  return "Draft";
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "L";
}

function avatarColor(seed: string) {
  const palette = ["#4a9b6f", "#8d5d38", "#5f7adb", "#d97706", "#be185d", "#0f766e"];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

function isUploadedVideo(url: string | null | undefined) {
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(url);
}

function getRenderablePostContent(content: string) {
  return linkBibleReferencesInHtml(content || "<p></p>");
}

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToEditableText(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6)>/gi, "\n\n")
      .replace(/<li[^>]*>/gi, "• ")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\u00a0/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function editableTextToHtml(text: string) {
  const normalized = text.trim();
  if (!normalized) return "<p></p>";

  return normalized
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

function applyRecurringOverrideToItem(
  item: RecurringPreviewItem,
  overridePayload: RecurringOverridePayload,
): RecurringPreviewItem {
  if (overridePayload.kind === "series") {
    return {
      ...item,
      title: overridePayload.title,
      description: overridePayload.description,
      contentHtml: overridePayload.contentHtml,
    };
  }

  if (overridePayload.kind === "trivia") {
    return {
      ...item,
      title: `Weekly Bible Trivia: ${overridePayload.subjectTitle}`,
      description: overridePayload.intro,
      contentHtml:
        `<p><strong>${overridePayload.subjectTitle}</strong></p>` +
        `<p>${overridePayload.intro}</p>` +
        (item.supplementalHtml || ""),
    };
  }

  if (overridePayload.kind === "poll") {
    return {
      ...item,
      title: overridePayload.question,
      description: overridePayload.intro || null,
      contentHtml: overridePayload.intro ? `<p>${overridePayload.intro}</p>` : "",
      pollOptions: overridePayload.options,
    };
  }

  return {
    ...item,
    title: overridePayload.prompt,
    description: overridePayload.intro,
    contentHtml: `<p>${overridePayload.intro}</p><p>${overridePayload.commentPrompt}</p>`,
  };
}

function getPostPreviewText(content: string) {
  return stripHtml(content).replace(/\n{2,}/g, "\n").trim();
}

function normalizePersonMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizePlaceMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeKeywordMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function StudyGroupSchedulerPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupBasics | null>(null);
  const [adminUserId, setAdminUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("Louis");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [carouselQueue, setCarouselQueue] = useState<QueueItem[]>([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [queueError, setQueueError] = useState<string | null>(null);
  const [savingQueueItem, setSavingQueueItem] = useState(false);
  const [publishingQueueId, setPublishingQueueId] = useState<string | null>(null);
  const [deletingQueueId, setDeletingQueueId] = useState<string | null>(null);
  const [selectedQueueItemId, setSelectedQueueItemId] = useState<string | null>(null);
  const [editingQueueItemId, setEditingQueueItemId] = useState<string | null>(null);
  const [selectedRecurringItemKey, setSelectedRecurringItemKey] = useState<string | null>(null);
  const [editingRecurringItemKey, setEditingRecurringItemKey] = useState<string | null>(null);
  const [showPostComposerModal, setShowPostComposerModal] = useState(false);
  const [publishingRecurringKey, setPublishingRecurringKey] = useState<string | null>(null);
  const [savingRecurringOverride, setSavingRecurringOverride] = useState(false);
  const [resettingRecurringOverride, setResettingRecurringOverride] = useState(false);
  const [recurringEditError, setRecurringEditError] = useState<string | null>(null);
  const [selectedScripture, setSelectedScripture] = useState<ScriptureSelection | null>(null);
  const [scriptureHtml, setScriptureHtml] = useState<string | null>(null);
  const [loadingScripture, setLoadingScripture] = useState(false);
  const [publishedRecurringIds, setPublishedRecurringIds] = useState<Set<string>>(new Set());
  const [dismissedRecurringIds, setDismissedRecurringIds] = useState<Set<string>>(new Set());
  const [recurringOverridesByScheduleId, setRecurringOverridesByScheduleId] = useState<Record<string, RecurringOverridePayload>>({});
  const [recurringExpanded, setRecurringExpanded] = useState(false);
  const [expandedCalendarDayKey, setExpandedCalendarDayKey] = useState<string | null>(null);
  const [schedulerNow, setSchedulerNow] = useState(() => Date.now());
  const [selectedPerson, setSelectedPerson] = useState<{ name: string } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string } | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<{ name: string } | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [composerMode, setComposerMode] = useState<"text" | "photo" | "video">("text");
  const [composerPhotoFile, setComposerPhotoFile] = useState<File | null>(null);
  const [composerPhotoPreview, setComposerPhotoPreview] = useState<string | null>(null);
  const [composerVideoFile, setComposerVideoFile] = useState<File | null>(null);
  const [composerVideoPreview, setComposerVideoPreview] = useState<string | null>(null);
  const [composerVideoDurationError, setComposerVideoDurationError] = useState(false);
  const [recurringEditTitle, setRecurringEditTitle] = useState("");
  const [recurringEditDescription, setRecurringEditDescription] = useState("");
  const [recurringEditBody, setRecurringEditBody] = useState("");
  const [recurringEditPollOptions, setRecurringEditPollOptions] = useState("");
  const [composerUploadError, setComposerUploadError] = useState<string | null>(null);
  const [mentionItems, setMentionItems] = useState<MentionCatalogItem[]>([]);

  const groupPhotoInputRef = useRef<HTMLInputElement>(null);
  const groupVideoInputRef = useRef<HTMLInputElement>(null);
  const scriptureContainerRef = useRef<HTMLDivElement>(null);

  const postEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[180px] px-4 py-4 text-gray-800 focus:outline-none",
      },
    },
  });

  function runPostEditorCommand(command: () => boolean) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      command();
    };
  }

  useEffect(() => {
    let cancelled = false;

    async function loadMentionItems() {
      if (!groupId) return;

      try {
        const items = await loadGroupPostMentions(supabase, groupId);
        if (!cancelled) setMentionItems(items);
      } catch (error) {
        console.error("Could not load mention items:", error);
      }
    }

    loadMentionItems();

    return () => {
      cancelled = true;
    };
  }, [groupId]);

  useEffect(() => {
    const interval = setInterval(() => setSchedulerNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!adminUserId) return;

    let cancelled = false;

    async function loadProgress() {
      try {
        const [peopleResult, placesResult, keywordsResult] = await Promise.all([
          supabase.from("people_progress").select("person_name").eq("user_id", adminUserId),
          supabase.from("places_progress").select("place_name").eq("user_id", adminUserId),
          supabase.from("keywords_progress").select("keyword_name").eq("user_id", adminUserId),
        ]);

        if (cancelled) return;

        const nextCompletedPeople = new Set<string>();
        (peopleResult.data || []).forEach((row: { person_name: string | null }) => {
          nextCompletedPeople.add(String(row.person_name || "").toLowerCase().trim());
        });
        setCompletedPeople(nextCompletedPeople);

        const nextCompletedPlaces = new Set<string>();
        (placesResult.data || []).forEach((row: { place_name: string | null }) => {
          nextCompletedPlaces.add(String(row.place_name || "").toLowerCase().trim());
        });
        setCompletedPlaces(nextCompletedPlaces);

        const nextCompletedKeywords = new Set<string>();
        (keywordsResult.data || []).forEach((row: { keyword_name: string | null }) => {
          nextCompletedKeywords.add(String(row.keyword_name || "").toLowerCase().trim());
        });
        setCompletedKeywords(nextCompletedKeywords);
      } catch (progressError) {
        console.error("[SCHEDULER] Could not load Bible popup progress:", progressError);
      }
    }

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [adminUserId]);

  useEffect(() => {
    if (!adminUserId) return;

    const storageKey = `schedulerDismissedRecurring:${groupId}:${adminUserId}`;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        setDismissedRecurringIds(new Set());
        return;
      }
      const parsed = JSON.parse(raw) as string[];
      setDismissedRecurringIds(new Set(Array.isArray(parsed) ? parsed : []));
    } catch {
      setDismissedRecurringIds(new Set());
    }
  }, [groupId, adminUserId]);

  useEffect(() => {
    if (!adminUserId) return;
    const storageKey = `schedulerDismissedRecurring:${groupId}:${adminUserId}`;
    window.localStorage.setItem(storageKey, JSON.stringify([...dismissedRecurringIds]));
  }, [dismissedRecurringIds, groupId, adminUserId]);

  const selectedQueueItem = carouselQueue.find((item) => item.id === selectedQueueItemId) || null;
  const editingQueueItem = carouselQueue.find((item) => item.id === editingQueueItemId) || null;
  const schedulerFeed = useMemo(() => carouselQueue, [carouselQueue]);
  const [seriesSnapshot, setSeriesSnapshot] = useState<BibleStudySeriesSnapshot | null>(null);
  const recurringFeedItems = useMemo(() => {
    const items: RecurringPreviewItem[] = [];

    for (let offset = 0; offset < 21 && items.length < 7; offset += 1) {
      const baseItem = getRecurringPreviewItem(getBerlinDateWithOffset(offset), seriesSnapshot);
      const overridePayload = recurringOverridesByScheduleId[baseItem.scheduleId];
      const item = overridePayload ? applyRecurringOverrideToItem(baseItem, overridePayload) : baseItem;
      item.isPublished = publishedRecurringIds.has(item.scheduleId);
      if (dismissedRecurringIds.has(item.scheduleId)) continue;
      items.push(item);
    }

    return items;
  }, [dismissedRecurringIds, publishedRecurringIds, recurringOverridesByScheduleId, seriesSnapshot]);
  const selectedRecurringItem =
    recurringFeedItems.find((item) => item.scheduleId === selectedRecurringItemKey) || null;
  const editingRecurringItem =
    recurringFeedItems.find((item) => item.scheduleId === editingRecurringItemKey) || null;
  const selectedRecurringOverride = selectedRecurringItem
    ? recurringOverridesByScheduleId[selectedRecurringItem.scheduleId] || null
    : null;
  const mixedFeedItems = useMemo(() => {
    const recurring = recurringFeedItems.map((item) => ({
      kind: "recurring" as const,
      id: item.scheduleId,
      releaseIso: item.releaseIso,
      recurringItem: item,
      queueItem: null as QueueItem | null,
    }));

    const custom = carouselQueue
      .filter((item) => item.status === "scheduled" && item.scheduled_for)
      .map((item) => ({
        kind: "custom" as const,
        id: item.id,
        releaseIso: item.scheduled_for as string,
        recurringItem: null as RecurringPreviewItem | null,
        queueItem: item,
      }));

    return [...recurring, ...custom].sort(
      (a, b) => new Date(a.releaseIso).getTime() - new Date(b.releaseIso).getTime(),
    );
  }, [carouselQueue, recurringFeedItems]);
  const schedulerCalendarDays = useMemo(() => {
    return Array.from({ length: 14 }, (_, offset) => {
      const date = getBerlinDateWithOffset(offset);
      const dateKey = getBerlinDateKey(date);
      const recurring = recurringFeedItems
        .filter((item) => getBerlinDateKey(new Date(item.releaseIso)) === dateKey)
        .map((item) => ({
          id: item.scheduleId,
          title: item.title,
          kind: "recurring" as const,
          timeLabel: formatQueueDateTime(item.releaseIso),
        }));
      const custom = carouselQueue
        .filter((item) => item.status === "scheduled" && item.scheduled_for && getBerlinDateKey(new Date(item.scheduled_for)) === dateKey)
        .map((item) => ({
          id: item.id,
          title: item.title || "Scheduled post",
          kind: "custom" as const,
          timeLabel: formatQueueDateTime(item.scheduled_for),
        }));

      return {
        date,
        dateKey,
        recurring,
        custom,
      };
    });
  }, [carouselQueue, recurringFeedItems]);
  const activeCalendarDayKey = expandedCalendarDayKey ?? schedulerCalendarDays[0]?.dateKey ?? null;
  const nextQueueAutoScheduleIso = useMemo(
    () => getNextQueueAutoScheduleIso(carouselQueue, editingQueueItemId, editingQueueItem?.scheduled_for ?? null),
    [carouselQueue, editingQueueItemId, editingQueueItem?.scheduled_for],
  );

  async function loadCarouselQueue(currentUserId: string) {
    setQueueLoading(true);
    setQueueError(null);
    try {
      const { data, error: loadError } = await supabase
        .from("group_feed_carousel_queue")
        .select("id, group_id, created_by, post_style, title, caption, cover_image_url, scheduled_for, status, published_post_id, published_at, created_at")
        .eq("group_id", groupId)
        .eq("created_by", currentUserId)
        .order("scheduled_for", { ascending: true })
        .order("created_at", { ascending: true });

      if (loadError) throw loadError;

      const rows = (data || []) as QueueItem[];
      const activeRows = rows.filter((item) => item.status !== "published");
      const unscheduledRows = activeRows
        .filter((item) => !item.scheduled_for)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      if (unscheduledRows.length > 0) {
        let latestScheduledIso = activeRows
          .filter((item) => item.scheduled_for)
          .map((item) => item.scheduled_for as string)
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .at(-1) ?? getNextBaseQueueAutoScheduleIso();

        for (const item of unscheduledRows) {
          const scheduledFor = latestScheduledIso;
          if (!scheduledFor) continue;

          const { error: normalizeError } = await supabase
            .from("group_feed_carousel_queue")
            .update({
              scheduled_for: scheduledFor,
              status: "scheduled",
              updated_at: new Date().toISOString(),
            })
            .eq("id", item.id);

          if (normalizeError) throw normalizeError;

          item.scheduled_for = scheduledFor;
          item.status = "scheduled";
          latestScheduledIso = getNextDayBerlin2amIso(scheduledFor) ?? scheduledFor;
        }
      }

      const publishedIds = rows
        .filter((item) => item.status === "published" && item.published_post_id)
        .map((item) => item.published_post_id as string);

      if (publishedIds.length > 0) {
        const { data: livePosts, error: livePostsError } = await supabase
          .from("group_posts")
          .select("id")
          .in("id", publishedIds);

        if (livePostsError) throw livePostsError;

        const liveIdSet = new Set((livePosts || []).map((row) => row.id));
        const ghostItems = rows.filter(
          (item) => item.status === "published" && item.published_post_id && !liveIdSet.has(item.published_post_id),
        );

        if (ghostItems.length > 0) {
          await Promise.all(
            ghostItems.map((item) =>
              supabase
                .from("group_feed_carousel_queue")
                .update({
                  status: item.scheduled_for ? "scheduled" : "draft",
                  published_post_id: null,
                  published_at: null,
                })
                .eq("id", item.id),
            ),
          );

          const repairedRows = rows.map((item) =>
            ghostItems.some((ghost) => ghost.id === item.id)
              ? {
                  ...item,
                  status: item.scheduled_for ? ("scheduled" as const) : ("draft" as const),
                  published_post_id: null,
                  published_at: null,
                }
              : item,
          );

          setCarouselQueue(repairedRows);
          return;
        }
      }

      setCarouselQueue(rows.filter((item) => item.status !== "published"));
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not load your private feed."));
    } finally {
      setQueueLoading(false);
    }
  }

  async function loadRecurringOverrides() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Could not verify your session.");

      const response = await fetch(`/api/groups/${groupId}/recurring-overrides`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error || "Could not load recurring post edits.");

      const nextOverrides: Record<string, RecurringOverridePayload> = {};
      const rows = Array.isArray(payload?.rows) ? (payload.rows as GroupRecurringOverrideRow[]) : [];
      rows.forEach((row) => {
        if (!row?.schedule_key || !row?.week_key) return;
        const normalized = normalizeRecurringOverridePayload(row.schedule_key, row.override_payload);
        if (!normalized) return;
        nextOverrides[`${row.schedule_key}:${row.week_key}`] = normalized;
      });

      setRecurringOverridesByScheduleId(nextOverrides);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not load recurring post edits."));
    }
  }

  async function loadPublishedRecurringItems() {
    const [
      weeklySeriesResult,
      triviaResult,
      pollResult,
      questionResult,
      livePostsResult,
    ] = await Promise.all([
      supabase
        .from("weekly_group_series_posts")
        .select("series_key, week_key, post_id")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("weekly_group_trivia_sets")
        .select("week_key, post_id")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("weekly_group_polls")
        .select("week_key, post_id")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("weekly_group_questions")
        .select("week_key, post_id")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("group_posts")
        .select("id")
        .eq("group_id", groupId)
        .is("parent_post_id", null),
    ]);

    const nextPublishedIds = new Set<string>();
    const livePostIds = new Set((livePostsResult.data || []).map((row: { id: string }) => row.id));

    (weeklySeriesResult.data || []).forEach((row: { series_key: string; week_key: string; post_id: string | null }) => {
      if (!row.post_id || !livePostIds.has(row.post_id)) return;
      nextPublishedIds.add(`${row.series_key}:${row.week_key}`);
    });
    (triviaResult.data || []).forEach((row: { week_key: string; post_id: string | null }) => {
      if (!row.post_id || !livePostIds.has(row.post_id)) return;
      nextPublishedIds.add(`trivia_tuesday:${row.week_key}`);
    });
    (pollResult.data || []).forEach((row: { week_key: string; post_id: string | null }) => {
      if (!row.post_id || !livePostIds.has(row.post_id)) return;
      nextPublishedIds.add(`opinion_wednesday:${row.week_key}`);
    });
    (questionResult.data || []).forEach((row: { week_key: string; post_id: string | null }) => {
      if (!row.post_id || !livePostIds.has(row.post_id)) return;
      nextPublishedIds.add(`truth_thursday:${row.week_key}`);
    });

    setPublishedRecurringIds(nextPublishedIds);
  }

  function resetPostComposer() {
    setEditingQueueItemId(null);
    setShowPostComposerModal(false);
    setNewPostTitle("");
    postEditor?.commands.clearContent();
    setComposerPhotoFile(null);
    setComposerPhotoPreview(null);
    if (composerVideoPreview?.startsWith("blob:")) URL.revokeObjectURL(composerVideoPreview);
    setComposerVideoFile(null);
    setComposerVideoPreview(null);
    setComposerVideoDurationError(false);
    setComposerMode("text");
    setComposerUploadError(null);
  }

  function startEditingQueueItem(item: QueueItem) {
    setSelectedQueueItemId(null);
    setEditingQueueItemId(item.id);
    setShowPostComposerModal(true);
    setNewPostTitle(item.title || "");
    postEditor?.commands.setContent(item.caption || "");
    setComposerPhotoFile(null);
    setComposerVideoFile(null);
    setComposerVideoDurationError(false);
    setComposerUploadError(null);

    if (composerVideoPreview?.startsWith("blob:")) URL.revokeObjectURL(composerVideoPreview);

    if (item.cover_image_url && isUploadedVideo(item.cover_image_url)) {
      setComposerMode("video");
      setComposerVideoPreview(item.cover_image_url);
      setComposerPhotoPreview(null);
    } else if (item.cover_image_url) {
      setComposerMode("photo");
      setComposerPhotoPreview(item.cover_image_url);
      setComposerVideoPreview(null);
    } else {
      setComposerMode("text");
      setComposerPhotoPreview(null);
      setComposerVideoPreview(null);
    }

  }

  async function handleSaveQueueItem() {
    const editorHtml = postEditor?.getHTML() ?? "";
    let normalizedContent = editorHtml === "<p></p>" ? "" : editorHtml;
    const hasContent = stripHtml(normalizedContent).length > 0;
    const hasPhoto = composerMode === "photo" && !!composerPhotoFile;
    const hasVideo = composerMode === "video" && !!composerVideoFile && !composerVideoDurationError;
    const existingMediaUrl = editingQueueItem?.cover_image_url || null;
    const hasExistingMedia = !!existingMediaUrl && !composerPhotoFile && !composerVideoFile;

    if (!adminUserId) {
      setQueueError("Could not verify your account.");
      return;
    }

    if (!hasContent && !hasPhoto && !hasVideo && !hasExistingMedia) {
      setComposerUploadError("Add a message, photo, or video first.");
      return;
    }

    setSavingQueueItem(true);
    setQueueError(null);
    setComposerUploadError(null);

    try {
      if (normalizedContent) {
        const items = mentionItems.length > 0 ? mentionItems : await loadGroupPostMentions(supabase, groupId);
        normalizedContent = linkMentionItemsInHtml(normalizedContent, items);
      }

      let mediaUrl: string | null = hasExistingMedia ? existingMediaUrl : null;

      if (hasPhoto && composerPhotoFile) {
        const ext = composerPhotoFile.name.split(".").pop() ?? "jpg";
        const path = `${adminUserId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("post-media").upload(path, composerPhotoFile, { upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("post-media").getPublicUrl(path);
        mediaUrl = data.publicUrl;
      }

      if (hasVideo && composerVideoFile) {
        const ext = composerVideoFile.name.split(".").pop() ?? "mp4";
        const path = `${adminUserId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("post-media").upload(path, composerVideoFile, { upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("post-media").getPublicUrl(path);
        mediaUrl = data.publicUrl;
      }

      const resolvedScheduledFor =
        editingQueueItemId && editingQueueItem?.scheduled_for
          ? editingQueueItem.scheduled_for
          : nextQueueAutoScheduleIso;

      if (!resolvedScheduledFor) {
        throw new Error("Could not find the next 2:00 AM Berlin slot.");
      }

      const payload = {
        group_id: groupId,
        created_by: adminUserId,
        post_style: "text" as const,
        title: newPostTitle.trim() || null,
        caption: normalizedContent || null,
        cover_image_url: mediaUrl,
        scheduled_for: resolvedScheduledFor,
        status: "scheduled" as const,
      };

      if (editingQueueItemId) {
        const { error: updateError } = await supabase
          .from("group_feed_carousel_queue")
          .update(payload)
          .eq("id", editingQueueItemId)
          .is("published_post_id", null);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("group_feed_carousel_queue").insert(payload);
        if (insertError) throw insertError;
      }

      resetPostComposer();
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not save this scheduled post."));
    } finally {
      setSavingQueueItem(false);
    }
  }

  async function handlePublishQueueItem(queueItem: QueueItem) {
    if (!queueItem || publishingQueueId) return;
    setPublishingQueueId(queueItem.id);
    setQueueError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Could not verify your session.");

      const response = await fetch(`/api/groups/${groupId}/carousel-queue/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ queueId: queueItem.id }),
      });

      const raw = await response.text();
      const payload = raw ? JSON.parse(raw) : null;
      if (!response.ok) throw new Error(payload?.error || "Could not post this to the home feed.");

      if (adminUserId) await loadCarouselQueue(adminUserId);
      setSelectedQueueItemId(null);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not publish this draft."));
    } finally {
      setPublishingQueueId(null);
    }
  }

  async function handleDeleteQueueItem(queueItemId: string) {
    if (!adminUserId || deletingQueueId) return;
    setDeletingQueueId(queueItemId);
    setQueueError(null);

    try {
      const { error: deleteError } = await supabase.from("group_feed_carousel_queue").delete().eq("id", queueItemId);
      if (deleteError) throw deleteError;
      if (selectedQueueItemId === queueItemId) setSelectedQueueItemId(null);
      if (editingQueueItemId === queueItemId) resetPostComposer();
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not delete this draft."));
    } finally {
      setDeletingQueueId(null);
    }
  }

  async function handlePublishRecurringItem(item: RecurringPreviewItem) {
    if (publishingRecurringKey) return;
    setPublishingRecurringKey(item.key);
    setQueueError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Could not verify your session.");

      const response = await fetch(`/api/groups/${groupId}/${item.endpoint}/ensure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ force: true, targetDate: item.releaseIso }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not post this scheduled item.");
      if (payload?.skipped && payload?.reason === "already_exists") {
        await loadPublishedRecurringItems();
        setSelectedRecurringItemKey(null);
        return;
      }
      if (payload?.skipped) {
        throw new Error(payload.error || "This scheduled item was skipped instead of posting.");
      }

      await loadPublishedRecurringItems();
      setSelectedRecurringItemKey(null);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not publish this scheduled item."));
    } finally {
      setPublishingRecurringKey(null);
    }
  }

  function handleDismissRecurringItem(scheduleId: string) {
    setDismissedRecurringIds((prev) => {
      const next = new Set(prev);
      next.add(scheduleId);
      return next;
    });

    if (selectedRecurringItemKey === scheduleId) {
      setSelectedRecurringItemKey(null);
    }
  }

  function startEditingRecurringItem(item: RecurringPreviewItem) {
    const payload = recurringOverridesByScheduleId[item.scheduleId] || item.defaultOverridePayload;
    setRecurringEditError(null);
    setEditingRecurringItemKey(item.scheduleId);

    if (payload.kind === "series") {
      setRecurringEditTitle(payload.title);
      setRecurringEditDescription(payload.description || "");
      setRecurringEditBody(htmlToEditableText(payload.contentHtml));
      setRecurringEditPollOptions("");
      return;
    }

    if (payload.kind === "trivia") {
      setRecurringEditTitle(payload.subjectTitle);
      setRecurringEditDescription(payload.intro);
      setRecurringEditBody("");
      setRecurringEditPollOptions("");
      return;
    }

    if (payload.kind === "poll") {
      setRecurringEditTitle(payload.question);
      setRecurringEditDescription(payload.intro);
      setRecurringEditBody("");
      setRecurringEditPollOptions(payload.options.join("\n"));
      return;
    }

    setRecurringEditTitle(payload.prompt);
    setRecurringEditDescription(payload.intro);
    setRecurringEditBody(payload.commentPrompt);
    setRecurringEditPollOptions("");
  }

  function closeRecurringEditor() {
    setEditingRecurringItemKey(null);
    setRecurringEditError(null);
    setRecurringEditTitle("");
    setRecurringEditDescription("");
    setRecurringEditBody("");
    setRecurringEditPollOptions("");
  }

  async function handleSaveRecurringOverride() {
    if (!editingRecurringItem) return;

    const scheduleKey = editingRecurringItem.key;
    let overridePayload: RecurringOverridePayload | null = null;

    if (editingRecurringItem.defaultOverridePayload.kind === "series") {
      if (!recurringEditTitle.trim() || !recurringEditBody.trim()) {
        setRecurringEditError("Add a title and message before saving.");
        return;
      }
      overridePayload = {
        kind: "series",
        title: recurringEditTitle.trim(),
        description: recurringEditDescription.trim() || null,
        contentHtml: editableTextToHtml(recurringEditBody),
      } satisfies RecurringSeriesOverridePayload;
    } else if (editingRecurringItem.defaultOverridePayload.kind === "trivia") {
      if (!recurringEditTitle.trim() || !recurringEditDescription.trim()) {
        setRecurringEditError("Add a trivia title and intro before saving.");
        return;
      }
      overridePayload = {
        kind: "trivia",
        subjectTitle: recurringEditTitle.trim(),
        intro: recurringEditDescription.trim(),
      } satisfies RecurringTriviaOverridePayload;
    } else if (editingRecurringItem.defaultOverridePayload.kind === "poll") {
      const options = recurringEditPollOptions
        .split("\n")
        .map((option) => option.trim())
        .filter(Boolean);
      if (!recurringEditTitle.trim() || options.length < 2) {
        setRecurringEditError("Add a poll question and at least two options.");
        return;
      }
      overridePayload = {
        kind: "poll",
        question: recurringEditTitle.trim(),
        intro: recurringEditDescription.trim(),
        options,
      } satisfies RecurringPollOverridePayload;
    } else {
      if (!recurringEditTitle.trim() || !recurringEditDescription.trim() || !recurringEditBody.trim()) {
        setRecurringEditError("Add a prompt, intro, and comment prompt before saving.");
        return;
      }
      overridePayload = {
        kind: "question",
        prompt: recurringEditTitle.trim(),
        intro: recurringEditDescription.trim(),
        commentPrompt: recurringEditBody.trim(),
      } satisfies RecurringQuestionOverridePayload;
    }

    setSavingRecurringOverride(true);
    setRecurringEditError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Could not verify your session.");

      const response = await fetch(`/api/groups/${groupId}/recurring-overrides`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scheduleKey,
          weekKey: editingRecurringItem.weekKey,
          overridePayload,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error || "Could not save recurring post edits.");

      setRecurringOverridesByScheduleId((prev) => ({
        ...prev,
        [editingRecurringItem.scheduleId]: overridePayload as RecurringOverridePayload,
      }));
      closeRecurringEditor();
    } catch (err) {
      setRecurringEditError(getErrorMessage(err, "Could not save recurring post edits."));
    } finally {
      setSavingRecurringOverride(false);
    }
  }

  async function handleResetRecurringOverride(item: RecurringPreviewItem) {
    setResettingRecurringOverride(true);
    setRecurringEditError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Could not verify your session.");

      const response = await fetch(`/api/groups/${groupId}/recurring-overrides`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scheduleKey: item.key,
          weekKey: item.weekKey,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error || "Could not reset recurring post edits.");

      setRecurringOverridesByScheduleId((prev) => {
        const next = { ...prev };
        delete next[item.scheduleId];
        return next;
      });

      if (editingRecurringItemKey === item.scheduleId) {
        closeRecurringEditor();
      }
    } catch (err) {
      setRecurringEditError(getErrorMessage(err, "Could not reset recurring post edits."));
    } finally {
      setResettingRecurringOverride(false);
    }
  }

  function handleScriptureClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    const scriptureButton = target?.closest(".scripture-ref-link") as HTMLElement | null;
    if (!scriptureButton) return;

    event.preventDefault();
    event.stopPropagation();

    const reference = scriptureButton.dataset.scriptureRef;
    if (!reference) return;

    const parsed = parseBibleReference(reference);
    if (!parsed) return;

    setSelectedScripture({
      reference,
      book: parsed.book,
      chapter: parsed.chapter,
    });
  }

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setLoading(true);
      setError(null);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        router.push("/login");
        return;
      }

      if (user.email !== "moorelouis3@gmail.com") {
        router.push(`/study-groups/${groupId}/chat`);
        return;
      }

      setAdminUserId(user.id);

      try {
        const [{ data: groupData, error: groupError }, { data: profileData, error: profileError }] = await Promise.all([
          supabase.from("study_groups").select("id, name, cover_emoji").eq("id", groupId).maybeSingle(),
          supabase.from("profile_stats").select("display_name, profile_image_url").eq("user_id", user.id).maybeSingle(),
        ]);

        if (groupError) throw groupError;
        if (profileError) throw profileError;
        if (!groupData) throw new Error("Could not load this study group.");

        if (!cancelled) {
          setGroup(groupData as GroupBasics);
          setDisplayName(profileData?.display_name || "Louis");
          setProfileImageUrl(profileData?.profile_image_url || null);
        }

        const { data: currentSeries } = await supabase
          .from("group_series")
          .select("id, title, total_weeks")
          .eq("group_id", groupId)
          .eq("is_current", true)
          .maybeSingle<GroupSeriesRow>();

        if (currentSeries?.id) {
          const { data: scheduleData } = await supabase
            .from("series_schedules")
            .select("start_at, start_date")
            .eq("series_id", currentSeries.id)
            .maybeSingle<{ start_at?: string | null; start_date?: string | null }>();

          if (!cancelled) {
            setSeriesSnapshot({
              groupId,
              seriesTitle: currentSeries.title || "Bible Study",
              seriesStartAt: scheduleData?.start_at || (scheduleData?.start_date ? `${scheduleData.start_date}T00:00:00` : null),
              totalWeeks: currentSeries.total_weeks ?? null,
            });
          }
        } else if (!cancelled) {
          setSeriesSnapshot(null);
        }

        await Promise.all([
          loadCarouselQueue(user.id),
          loadPublishedRecurringItems(),
          loadRecurringOverrides(),
        ]);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Could not load the scheduler."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [groupId, router]);

  useEffect(() => {
    if (!selectedQueueItemId && !selectedRecurringItemKey && !editingRecurringItemKey) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [editingRecurringItemKey, selectedQueueItemId, selectedRecurringItemKey]);

  useEffect(() => {
    let cancelled = false;

    async function loadScriptureSelection() {
      if (!selectedScripture) {
        setScriptureHtml(null);
        return;
      }

      try {
        setLoadingScripture(true);
        setScriptureHtml(null);

        const normalizedRef = selectedScripture.reference.replace(/\s+/g, "+");
        const response = await fetch(`https://bible-api.com/${normalizedRef}`);
        if (!response.ok) throw new Error("Could not load Bible verses.");
        const payload = await response.json();
        const verses = Array.isArray(payload?.verses) ? payload.verses : [];
        const enriched = await enrichBibleVerses(verses);

        if (!cancelled) {
          setScriptureHtml(enriched);
        }
      } catch (error) {
        if (!cancelled) {
          setScriptureHtml("<p>Could not load this verse right now.</p>");
        }
      } finally {
        if (!cancelled) {
          setLoadingScripture(false);
        }
      }
    }

    void loadScriptureSelection();

    return () => {
      cancelled = true;
    };
  }, [selectedScripture]);

  useEffect(() => {
    if (!scriptureHtml) return undefined;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const highlightElement = target?.closest(".bible-highlight") as HTMLElement | null;
      if (!highlightElement) return;

      event.preventDefault();
      event.stopPropagation();

      const type = highlightElement.dataset.type;
      const term = highlightElement.dataset.term;
      if (!type || !term) return;

      if (type === "people") {
        setSelectedPerson({ name: resolveBibleReference("people", term) });
        setSelectedPlace(null);
        setSelectedKeyword(null);
      } else if (type === "places") {
        setSelectedPlace({ name: resolveBibleReference("places", term) });
        setSelectedPerson(null);
        setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: resolveBibleReference("keywords", term) });
        setSelectedPerson(null);
        setSelectedPlace(null);
      }
    };

    const container = scriptureContainerRef.current;
    if (!container) return undefined;

    container.addEventListener("click", handler, true);

    return () => {
      container.removeEventListener("click", handler, true);
    };
  }, [scriptureHtml]);

  useEffect(() => {
    if (!selectedPerson) {
      setPersonNotes(null);
      setPersonCreditBlocked(false);
      return;
    }
    const selectedPersonName = selectedPerson.name;

    async function loadPersonNotes() {
      setPersonNotes(null);
      setPersonCreditBlocked(false);

      try {
        const primaryName = resolveBibleReference("people", selectedPersonName);

        const personNameKey = primaryName.toLowerCase().trim();

        if (adminUserId) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, {
            userId: adminUserId,
            actionLabel: selectedPersonName,
          });
          if (!creditResult.ok) {
            setPersonCreditBlocked(true);
            return;
          }

          setViewedPeople((prev) => new Set(prev).add(personNameKey));
          triggerPoints(1);
          if (typeof window !== "undefined") {
            const stamp = String(Date.now());
            const progressEvent = new CustomEvent("bb:study-progress-changed", {
              detail: { actionType: ACTION_TYPE.person_viewed, person: primaryName, at: stamp },
            });
            window.dispatchEvent(progressEvent);
            if (typeof document !== "undefined") {
              document.dispatchEvent(new CustomEvent("bb:study-progress-changed", {
                detail: { actionType: ACTION_TYPE.person_viewed, person: primaryName, at: stamp },
              }));
            }
            window.localStorage.setItem("bb:last-study-progress-change", stamp);
          }
        }

        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing person notes:", existingError);
        }

        if (existing?.notes_text?.trim()) {
          setPersonNotes(existing.notes_text);
          return;
        }

        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(primaryName);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis. Generate Bible study style notes for ${primaryName} from Scripture using the EXACT markdown structure below.

CRITICAL RENDERING RULES (MANDATORY):
- Use ONLY markdown
- Use SINGLE # for all section headers
- INSERT TWO FULL LINE BREAKS AFTER EVERY SECTION
- INSERT TWO FULL LINE BREAKS AFTER EVERY PARAGRAPH GROUP
- DO NOT use markdown bullet characters (*, -, â€¢)
- Use EMOJIS as bullets instead
- Emojis must start each bullet line
- No hyphens anywhere
- No compact spacing
- Spacing matters more than word count

The person's name is already shown in the UI. DO NOT include their name as a header.

---

TEMPLATE (FOLLOW EXACTLY):

# ðŸ‘¤ Who ${whoPronoun} Is

Write two short paragraphs explaining who this person is.



# ðŸ“– Their Role in the Story

Write two to three short paragraphs explaining what role this person plays in the biblical narrative.



# ðŸ”¥ Key Moments

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.



# ðŸ“ Where You Find ${pronoun}

ðŸ“– Book Chapter range

ðŸ“– Book Chapter range

ðŸ“– Book Chapter range



# ðŸŒ± Why This Person Matters

Write two to three short paragraphs explaining why this person is important and what we learn from them.



FINAL RULES:
- Every section must be separated by TWO blank lines
- Every paragraph block must be separated by TWO blank lines
- Do not compress content
- No lists without emojis
- Keep it cinematic, Bible study focused, and clear`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        const { data: existingCheck } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        let notesText = "";
        if (existingCheck?.notes_text?.trim()) {
          notesText = existingCheck.notes_text;
        } else {
          await supabase
            .from("bible_people_notes")
            .upsert({ person_name: personNameKey, notes_text: generated }, { onConflict: "person_name" });

          const { data: finalData } = await supabase
            .from("bible_people_notes")
            .select("notes_text")
            .eq("person_name", personNameKey)
            .single();
          notesText = finalData?.notes_text || generated;
        }

        setPersonNotes(notesText);
      } catch (personError) {
        console.error("Error loading person notes:", personError);
      }
    }

    void loadPersonNotes();
  }, [selectedPerson, adminUserId]);

  useEffect(() => {
    if (!selectedPlace) {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);
      return;
    }
    const selectedPlaceName = selectedPlace.name;

    async function loadPlaceNotes() {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);

      try {
        const placeName = selectedPlaceName;
        const normalizedPlace = placeName.toLowerCase().trim().replace(/\s+/g, "_");
        const isCompleted = completedPlaces.has(normalizedPlace);
        const isViewed = viewedPlaces.has(normalizedPlace);

        if (adminUserId && !isCompleted && !isViewed) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, {
            userId: adminUserId,
            actionLabel: selectedPlaceName,
          });
          if (!creditResult.ok) {
            setPlaceCreditBlocked(true);
            return;
          }

          setViewedPlaces((prev) => new Set(prev).add(normalizedPlace));
        }

        const { data: existing } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existing?.notes_text?.trim()) {
          setPlaceNotes(existing.notes_text);
          return;
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis.

Generate beginner friendly Bible notes about the PLACE: ${placeName}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# Where is this place?

One short paragraph explaining where ${placeName} is located (region, country, significance) and why it matters in the Bible.



# What happens at ${placeName}?

Include two or three specific Bible references where ${placeName} appears. Each reference should include the book, chapter, and verse (e.g., "Genesis 12:1-9"). After each reference, write one sentence explaining what happens in that passage at ${placeName}.



# Why is ${placeName} significant?

List two or three key reasons why ${placeName} matters in the Bible story. Each point should be one sentence. Keep it simple and beginner-friendly.



# How does ${placeName} connect to Jesus?

One short paragraph connecting ${placeName} to Jesus, prophecy, or the bigger story of redemption. Keep it simple and clear.



# What can we learn from ${placeName}?

One short paragraph with a simple, practical life application related to place, journey, or God's presence.

RULES
DO NOT include a header like "${placeName} Notes" or any title at the beginning. Start directly with "# Where is this place?".
Keep emojis in headers if helpful, but focus on clarity.
No images. No Greek or Hebrew words unless essential (and then explain simply).
Keep it cinematic, warm, simple. Do not overwhelm beginners.
Be accurate to Scripture.`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        await supabase
          .from("places_in_the_bible_notes")
          .upsert({ place: placeName, normalized_place: normalizedPlace, notes_text: generated }, { onConflict: "normalized_place" });

        setPlaceNotes(generated);
      } catch (placeError) {
        console.error("Error loading place notes:", placeError);
      }
    }

    void loadPlaceNotes();
  }, [selectedPlace, adminUserId, completedPlaces, viewedPlaces]);

  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      return;
    }
    const selectedKeywordName = selectedKeyword.name;

    async function loadKeywordNotes() {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);

      try {
        const keywordName = selectedKeywordName;
        const keywordKey = keywordName.toLowerCase().trim();
        const isCompleted = completedKeywords.has(keywordKey);
        const isViewed = viewedKeywords.has(keywordKey);

        if (adminUserId && !isCompleted && !isViewed) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, {
            userId: adminUserId,
            actionLabel: selectedKeywordName,
          });
          if (!creditResult.ok) {
            setKeywordCreditBlocked(true);
            return;
          }

          setViewedKeywords((prev) => new Set(prev).add(keywordKey));
        }

        const { data: existing } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (existing?.notes_text?.trim()) {
          setKeywordNotes(existing.notes_text);
          return;
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis.

Generate beginner friendly Bible notes about the KEYWORD: ${keywordName}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# ðŸ“– What This Keyword Means

(two short paragraphs)





# ðŸ” Where It Appears in Scripture

(two to three short paragraphs)





# ðŸ”‘ Key Verses Using This Keyword

ðŸ”¥ sentence  

ðŸ”¥ sentence  

ðŸ”¥ sentence  

ðŸ”¥ sentence  





# ðŸ“š Where You Find It in the Bible

ðŸ“– Book Chapterâ€“Chapter  

ðŸ“– Book Chapterâ€“Chapter  

ðŸ“– Book Chapterâ€“Chapter  





# ðŸŒ± Why This Keyword Matters

(two to three short paragraphs)



RULES:
- Use # for all section headers
- Double line breaks between sections
- No hyphens anywhere
- Use emoji bullets only
- No lists with dashes
- No meta commentary
- No deep theology
- Cinematic but simple
- Total length about 200â€“300 words
- Do NOT include the keyword name as a header`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        await supabase
          .from("keywords_in_the_bible")
          .upsert({ keyword: keywordName, notes_text: generated }, { onConflict: "keyword" });

        const { data: finalData } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .single();

        setKeywordNotes(finalData?.notes_text || generated);
      } catch (keywordError) {
        console.error("Error loading keyword notes:", keywordError);
      }
    }

    void loadKeywordNotes();
  }, [selectedKeyword, adminUserId, completedKeywords, viewedKeywords]);

  if (loading) {
    return <div className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-center text-sm text-gray-500">Loading scheduler...</div>;
  }

  if (error || !group) {
    return <div className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-center text-sm text-red-600">{error || "Could not load scheduler."}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4] pb-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6">
        <div className="flex items-center justify-between gap-4 px-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Post Queue</p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">{group.cover_emoji ? `${group.cover_emoji} ` : ""}{group.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/study-groups/${groupId}/analytics`} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Analytics
            </Link>
            <Link href={`/study-groups/${groupId}/chat`} className="rounded-full bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Home Feed
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPostComposerModal(true)}
          className="w-full bg-white border border-[#d4ecd4] rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition text-left relative overflow-hidden"
        >
          <span className="absolute right-4 top-4 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ccf98] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4a9b6f]" />
          </span>
          <div className="flex items-center gap-3">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt={displayName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                {getInitial(displayName)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Share something with your private feed</p>
              <p className="text-sm text-gray-400 mt-1">Add a title, write your post, and save it just for you...</p>
            </div>
          </div>
        </button>

        {false && (
          <>
          <div className="flex flex-col gap-3">
          {(recurringExpanded ? recurringFeedItems : recurringFeedItems.slice(0, 2)).map((item) => (
            <div
              key={item.key}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedRecurringItemKey(item.scheduleId)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedRecurringItemKey(item.scheduleId);
                }
              }}
              className="w-full text-left transition cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                    {getInitial(displayName)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                      style={{ backgroundColor: item.isPublished ? "#94a3b8" : item.accent }}
                    >
                      {item.isPublished ? "Posted" : "Scheduled"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.releaseIso).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    </span>
                    {!item.isPublished && (
                      <span className="text-xs font-semibold" style={{ color: item.accent }}>
                        {formatCountdown(item.releaseIso, schedulerNow)}
                      </span>
                    )}
                    {item.isPublished ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleDismissRecurringItem(item.scheduleId);
                        }}
                        className="ml-auto rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold text-gray-600 transition hover:bg-gray-50"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: item.accent }}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900 leading-snug">{item.title}</p>
                  <p className="text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-line line-clamp-2">
                    {getPostPreviewText(item.contentHtml || item.description || "")}
                  </p>
                  {item.pollOptions && item.pollOptions.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {item.pollOptions.map((option, idx) => (
                        <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {recurringFeedItems.length > 2 && (
            <button
              type="button"
              onClick={() => setRecurringExpanded((prev) => !prev)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 transition"
            >
              <span>{recurringExpanded ? "Show less" : `Show ${recurringFeedItems.length - 2} more scheduled posts`}</span>
              <span className="text-base leading-none">{recurringExpanded ? "▲" : "▼"}</span>
            </button>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Berlin Calendar</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">Daily posts and your scheduled posts</h2>
            <p className="mt-1 text-sm text-gray-500">
              See the Bible Study Group daily posts and your custom scheduled posts together by day.
            </p>
          </div>

          <div className="mt-4 max-h-[34rem] overflow-y-auto pr-1">
            <div className="flex flex-col gap-3">
              {schedulerCalendarDays.map((day) => {
                const isOpen = activeCalendarDayKey === day.dateKey;
                const totalItems = day.recurring.length + day.custom.length;
                const summaryLabel =
                  totalItems === 0
                    ? "Nothing scheduled"
                    : `${day.recurring.length} daily post${day.recurring.length === 1 ? "" : "s"} • ${day.custom.length} custom post${day.custom.length === 1 ? "" : "s"}`;

                return (
                  <div key={day.dateKey} className="rounded-2xl border border-[#ece6dd] bg-[#fcfbf8]">
                    <button
                      type="button"
                      onClick={() => setExpandedCalendarDayKey((prev) => (prev === day.dateKey ? null : day.dateKey))}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                          {new Intl.DateTimeFormat("en-US", { timeZone: GROUP_SCHEDULE_TIME_ZONE, weekday: "long" }).format(day.date)}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {new Intl.DateTimeFormat("en-US", { timeZone: GROUP_SCHEDULE_TIME_ZONE, month: "short", day: "numeric" }).format(day.date)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{summaryLabel}</p>
                      </div>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#e7ddd0] bg-white text-sm text-gray-500">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="border-t border-[#efe7dc] px-4 pb-4 pt-3">
                        <div className="space-y-2">
                          {day.recurring.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedRecurringItemKey(item.id)}
                              className="w-full rounded-xl border border-[#dce8dc] bg-white px-3 py-2 text-left transition hover:shadow-sm"
                            >
                              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4a9b6f]">Daily post</p>
                              <p className="mt-1 text-sm font-semibold text-gray-900">{item.title}</p>
                              <p className="mt-1 text-xs text-gray-500">{item.timeLabel}</p>
                            </button>
                          ))}

                          {day.custom.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedQueueItemId(item.id)}
                              className="w-full rounded-xl border border-[#ead8c4] bg-white px-3 py-2 text-left transition hover:shadow-sm"
                            >
                              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5d38]">Your scheduled post</p>
                              <p className="mt-1 text-sm font-semibold text-gray-900">{item.title}</p>
                              <p className="mt-1 text-xs text-gray-500">{item.timeLabel}</p>
                            </button>
                          ))}

                          {day.recurring.length === 0 && day.custom.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#e5ddd2] px-3 py-3 text-xs text-gray-400">
                              Nothing scheduled yet
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
          </>
        )}

        {queueLoading ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500 shadow-sm">
            Loading your post queue...
          </div>
        ) : mixedFeedItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex w-fit rounded-full bg-[#f7f2ff] p-2 shadow-sm">
              <LouisAvatar mood="think" size={54} />
            </div>
            <p className="mt-4 text-lg font-bold text-gray-900">No scheduled posts yet</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Louis is ready when you are. Save a post here and it will automatically take the next 2:00 AM Berlin slot before it goes live on the real feed.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mixedFeedItems.map((feedItem) => {
              if (feedItem.kind === "recurring" && feedItem.recurringItem) {
                const item = feedItem.recurringItem;
                return (
                  <div
                    key={feedItem.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRecurringItemKey(item.scheduleId)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedRecurringItemKey(item.scheduleId);
                      }
                    }}
                    className="w-full text-left transition cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      {profileImageUrl ? (
                        <img src={profileImageUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                          {getInitial(displayName)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                          <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                            style={{ backgroundColor: item.isPublished ? "#94a3b8" : item.accent }}
                          >
                            {item.isPublished ? "Posted" : "Scheduled"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(item.releaseIso).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                          </span>
                          {!item.isPublished && (
                            <span className="text-xs font-semibold" style={{ color: item.accent }}>
                              {formatCountdown(item.releaseIso, schedulerNow)}
                            </span>
                          )}
                          {item.isPublished ? (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                handleDismissRecurringItem(item.scheduleId);
                              }}
                              className="ml-auto rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: item.accent }}>
                          {item.label}
                        </p>
                        <p className="mt-1 text-lg font-bold text-gray-900 leading-snug">{item.title}</p>
                        <p className="text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-line line-clamp-2">
                          {getPostPreviewText(item.contentHtml || item.description || "")}
                        </p>
                        {item.pollOptions && item.pollOptions.length > 0 && (
                          <div className="mt-3 flex flex-col gap-1.5">
                            {item.pollOptions.map((option, idx) => (
                              <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              const item = feedItem.queueItem!;
              const hasImagePost = Boolean(item.cover_image_url && !isUploadedVideo(item.cover_image_url));
              return (
                <div
                  key={feedItem.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedQueueItemId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedQueueItemId(item.id);
                    }
                  }}
                  className="w-full text-left transition cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    {profileImageUrl ? (
                      <img src={profileImageUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                        {getInitial(displayName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                        <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4a9b6f]">
                          {queueStatusLabel(item)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.status === "scheduled" && item.scheduled_for
                            ? `Posts ${formatQueueDateTime(item.scheduled_for)}`
                            : timeAgo(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.title && <h3 className={`font-bold text-gray-900 leading-snug ${hasImagePost ? "text-base mt-3" : "text-lg mt-3"}`}>{item.title}</h3>}
                  {item.caption && (
                    <p className="text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-line line-clamp-4">
                      {getPostPreviewText(item.caption)}
                    </p>
                  )}
                  {item.cover_image_url && isUploadedVideo(item.cover_image_url) && (
                    <video
                      src={item.cover_image_url}
                      controls
                      playsInline
                      className="mt-3 w-full rounded-xl"
                      style={{ maxHeight: "400px" }}
                      onClick={(event) => event.stopPropagation()}
                    />
                  )}
                  {item.cover_image_url && !isUploadedVideo(item.cover_image_url) && (
                    <div className="mt-3 w-full block rounded-[22px] overflow-hidden bg-white" style={{ maxHeight: hasImagePost ? "560px" : "420px" }}>
                      <img
                        src={item.cover_image_url}
                        alt="Post image"
                        className="w-full object-contain"
                        style={{ maxHeight: hasImagePost ? "560px" : "420px", objectPosition: "center" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>

      {showPostComposerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in" onClick={() => resetPostComposer()}>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto modal-panel-in" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#efe5d9]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4a9b6f]">Private Scheduler Feed</p>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{editingQueueItem ? "Edit Post" : "Create a Post"}</h2>
              </div>
              <button
                type="button"
                onClick={resetPostComposer}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
              >
                x
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {queueError ? <p className="text-sm text-red-500">{queueError}</p> : null}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(event) => setNewPostTitle(event.target.value)}
                  placeholder="Add a title for your post"
                  className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Auto-scheduled in Berlin time</label>
                <div className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm font-semibold text-gray-900">
                  {formatQueueDateTime(nextQueueAutoScheduleIso)}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Every post in this queue takes the next available 2:00 AM Berlin slot in order.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Message</label>
                <div className="rounded-3xl border border-[#ead8c4] overflow-hidden bg-[#fffaf4]">
                  <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#efe5d9] bg-[#fffdf9]">
                    <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleBold().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("bold") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>Bold</button>
                    <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleItalic().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("italic") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>Italic</button>
                    <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleHeading({ level: 1 }).run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("heading", { level: 1 }) ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>H1</button>
                    <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleHeading({ level: 2 }).run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("heading", { level: 2 }) ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>H2</button>
                    <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleBulletList().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("bulletList") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>List</button>
                  </div>
                  <EditorContent editor={postEditor} />
                </div>
                <PostMentionSuggestions editor={postEditor} items={mentionItems} />
              </div>

              <input
                ref={groupPhotoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setComposerPhotoFile(file);
                  const reader = new FileReader();
                  reader.onload = (loadEvent) => setComposerPhotoPreview(loadEvent.target?.result as string);
                  reader.readAsDataURL(file);
                  if (composerVideoPreview?.startsWith("blob:")) URL.revokeObjectURL(composerVideoPreview);
                  setComposerVideoFile(null);
                  setComposerVideoPreview(null);
                  setComposerVideoDurationError(false);
                  setComposerUploadError(null);
                  setComposerMode("photo");
                }}
              />
              <input
                ref={groupVideoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (file.size > 52428800) {
                    setComposerUploadError("Video must be under 50 MB.");
                    return;
                  }
                  if (composerVideoPreview?.startsWith("blob:")) URL.revokeObjectURL(composerVideoPreview);
                  setComposerVideoFile(file);
                  setComposerVideoPreview(URL.createObjectURL(file));
                  setComposerPhotoFile(null);
                  setComposerPhotoPreview(null);
                  setComposerVideoDurationError(false);
                  setComposerUploadError(null);
                  setComposerMode("video");
                }}
              />

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => groupPhotoInputRef.current?.click()} className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${composerMode === "photo" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>Add Photo</button>
                <button type="button" onClick={() => groupVideoInputRef.current?.click()} className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${composerMode === "video" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>Add Video</button>
              </div>

              {composerMode === "photo" && composerPhotoPreview && (
                <div className="relative inline-block">
                  <img src={composerPhotoPreview} alt="Preview" className="h-24 rounded-2xl object-cover border border-[#ead8c4]" />
                  <button
                    type="button"
                    onClick={() => {
                      setComposerPhotoFile(null);
                      setComposerPhotoPreview(null);
                      setComposerMode("text");
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-700 text-white text-xs"
                  >
                    x
                  </button>
                </div>
              )}

              {composerMode === "video" && composerVideoPreview && (
                <div className="relative">
                  <video
                    src={composerVideoPreview}
                    controls
                    playsInline
                    className="w-full rounded-2xl border border-[#ead8c4]"
                    style={{ maxHeight: "240px" }}
                    onLoadedMetadata={(event) => {
                      if (event.currentTarget.duration > 90) {
                        setComposerVideoDurationError(true);
                        setComposerUploadError("Video must be 90 seconds or shorter.");
                      } else {
                        setComposerVideoDurationError(false);
                        setComposerUploadError(null);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (composerVideoPreview?.startsWith("blob:")) URL.revokeObjectURL(composerVideoPreview);
                      setComposerVideoFile(null);
                      setComposerVideoPreview(null);
                      setComposerVideoDurationError(false);
                      setComposerUploadError(null);
                      setComposerMode("text");
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white text-sm"
                  >
                    x
                  </button>
                </div>
              )}

              {composerUploadError && <p className="text-sm text-red-500">{composerUploadError}</p>}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetPostComposer}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveQueueItem}
                  disabled={savingQueueItem || (!stripHtml(postEditor?.getHTML() ?? "").length && !composerPhotoFile && !composerVideoFile && !editingQueueItem?.cover_image_url)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition bg-[#4a9b6f]"
                >
                  {savingQueueItem ? "Saving..." : editingQueueItem ? "Save Changes" : "Add to Queue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedQueueItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in" onClick={() => setSelectedQueueItemId(null)}>
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-xl modal-panel-in" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-[#efe5d9] px-6 py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                  <span className="text-xs text-gray-400">
                    {selectedQueueItem.status === "published" && selectedQueueItem.published_at
                      ? `Posted ${timeAgo(selectedQueueItem.published_at)}`
                      : selectedQueueItem.status === "scheduled" && selectedQueueItem.scheduled_for
                        ? `Scheduled for ${formatQueueDateTime(selectedQueueItem.scheduled_for)}`
                        : `${queueStatusLabel(selectedQueueItem)} - ${timeAgo(selectedQueueItem.created_at)}`}
                  </span>
                </div>
                {selectedQueueItem.title ? <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">{selectedQueueItem.title}</h2> : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedQueueItemId(null)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                x
              </button>
            </div>

            <div className="px-6 py-5">
              {queueError ? <p className="mb-4 text-sm text-red-500">{queueError}</p> : null}

              {selectedQueueItem.caption ? (
                <div
                  className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                  onClick={handleScriptureClick}
                  dangerouslySetInnerHTML={{ __html: getRenderablePostContent(selectedQueueItem.caption) }}
                />
              ) : null}

              {selectedQueueItem.cover_image_url && isUploadedVideo(selectedQueueItem.cover_image_url) && (
                <video src={selectedQueueItem.cover_image_url} controls playsInline className="mt-5 w-full rounded-2xl" style={{ maxHeight: "520px" }} />
              )}

              {selectedQueueItem.cover_image_url && !isUploadedVideo(selectedQueueItem.cover_image_url) && (
                <img
                  src={selectedQueueItem.cover_image_url}
                  alt="Draft media"
                  className="mt-5 w-full rounded-2xl object-contain"
                  style={{ maxHeight: "520px", objectPosition: "center" }}
                />
              )}

              <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                {selectedQueueItem.status !== "published" ? (
                  <button
                    type="button"
                    onClick={() => startEditingQueueItem(selectedQueueItem)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Edit
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => void handleDeleteQueueItem(selectedQueueItem.id)}
                  disabled={deletingQueueId === selectedQueueItem.id}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingQueueId === selectedQueueItem.id ? "Deleting..." : "Delete"}
                </button>

                {selectedQueueItem.status !== "published" ? (
                  <button
                    type="button"
                    onClick={() => void handlePublishQueueItem(selectedQueueItem)}
                    disabled={publishingQueueId === selectedQueueItem.id}
                    className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    {publishingQueueId === selectedQueueItem.id ? "Posting..." : selectedQueueItem.status === "scheduled" ? "Post Now" : "Post to Home Feed"}
                  </button>
                ) : (
                  <Link href={`/study-groups/${groupId}/chat`} className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                    Open Home Feed
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {editingRecurringItem ? (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/45 px-4 modal-backdrop-in" onClick={closeRecurringEditor}>
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-xl modal-panel-in" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-[#efe5d9] px-6 py-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: editingRecurringItem.accent }}>
                  Edit Scheduled Post
                </p>
                <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">{editingRecurringItem.label}</h2>
                <p className="mt-1 text-sm text-gray-500">{formatQueueDateTime(editingRecurringItem.releaseIso)}</p>
              </div>
              <button
                type="button"
                onClick={closeRecurringEditor}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                x
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              {recurringEditError ? <p className="text-sm text-red-500">{recurringEditError}</p> : null}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  {editingRecurringItem.defaultOverridePayload.kind === "trivia"
                    ? "Trivia title"
                    : editingRecurringItem.defaultOverridePayload.kind === "question"
                      ? "Prompt"
                      : editingRecurringItem.defaultOverridePayload.kind === "poll"
                        ? "Question"
                        : "Title"}
                </label>
                <input
                  type="text"
                  value={recurringEditTitle}
                  onChange={(event) => setRecurringEditTitle(event.target.value)}
                  className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  {editingRecurringItem.defaultOverridePayload.kind === "question"
                    ? "Intro"
                    : editingRecurringItem.defaultOverridePayload.kind === "trivia"
                      ? "Trivia intro"
                      : editingRecurringItem.defaultOverridePayload.kind === "poll"
                        ? "Short intro"
                        : "Short description"}
                </label>
                <textarea
                  value={recurringEditDescription}
                  onChange={(event) => setRecurringEditDescription(event.target.value)}
                  rows={editingRecurringItem.defaultOverridePayload.kind === "series" ? 4 : 3}
                  className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                />
              </div>

              {editingRecurringItem.defaultOverridePayload.kind === "series" ? (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">Post message</label>
                  <textarea
                    value={recurringEditBody}
                    onChange={(event) => setRecurringEditBody(event.target.value)}
                    rows={12}
                    className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm leading-relaxed text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                  />
                  <p className="mt-2 text-xs text-gray-500">Line breaks stay in place when this scheduled post goes live.</p>
                </div>
              ) : null}

              {editingRecurringItem.defaultOverridePayload.kind === "question" ? (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">Comment prompt</label>
                  <textarea
                    value={recurringEditBody}
                    onChange={(event) => setRecurringEditBody(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm leading-relaxed text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                  />
                </div>
              ) : null}

              {editingRecurringItem.defaultOverridePayload.kind === "poll" ? (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">Poll options</label>
                  <textarea
                    value={recurringEditPollOptions}
                    onChange={(event) => setRecurringEditPollOptions(event.target.value)}
                    rows={6}
                    className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm leading-relaxed text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                  />
                  <p className="mt-2 text-xs text-gray-500">Use one option per line.</p>
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                {recurringOverridesByScheduleId[editingRecurringItem.scheduleId] ? (
                  <button
                    type="button"
                    onClick={() => void handleResetRecurringOverride(editingRecurringItem)}
                    disabled={resettingRecurringOverride}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    {resettingRecurringOverride ? "Resetting..." : "Reset to Default"}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={closeRecurringEditor}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleSaveRecurringOverride()}
                  disabled={savingRecurringOverride}
                  className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {savingRecurringOverride ? "Saving..." : "Save Edits"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedRecurringItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in" onClick={() => setSelectedRecurringItemKey(null)}>
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-xl modal-panel-in" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-[#efe5d9] px-6 py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: selectedRecurringItem.accent }}>
                    {selectedRecurringItem.label}
                  </span>
                  <span className="rounded-full bg-[#f6f7f4] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    {selectedRecurringItem.isPublished ? "Already Posted" : "Ready to Post"}
                  </span>
                  {selectedRecurringOverride ? (
                    <span className="rounded-full bg-[#eef7ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#35618b]">
                      Edited
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">{selectedRecurringItem.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecurringItemKey(null)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                x
              </button>
            </div>

            <div className="px-6 py-5">
              {queueError ? <p className="mb-4 text-sm text-red-500">{queueError}</p> : null}
              <div
                className="prose prose-sm max-w-none text-gray-800 leading-relaxed [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-5 [&_li]:my-1.5"
                onClick={handleScriptureClick}
                dangerouslySetInnerHTML={{ __html: getRenderablePostContent(selectedRecurringItem.contentHtml || "<p></p>") }}
              />

              {selectedRecurringItem.pollOptions?.length ? (
                <div className="mt-5 space-y-2">
                  {selectedRecurringItem.pollOptions.map((option) => (
                    <div key={option} className="rounded-2xl border border-[#e8dccb] bg-[#fffaf4] px-4 py-3 text-sm font-medium text-gray-800">
                      {option}
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex items-center justify-end gap-3">
                {selectedRecurringItem.isPublished ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDismissRecurringItem(selectedRecurringItem.scheduleId)}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Delete from Scheduler
                    </button>
                    <Link href={`/study-groups/${groupId}/chat`} className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                      Open Home Feed
                    </Link>
                  </>
                ) : (
                  <>
                    {selectedRecurringOverride ? (
                      <button
                        type="button"
                        onClick={() => void handleResetRecurringOverride(selectedRecurringItem)}
                        disabled={resettingRecurringOverride}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                      >
                        {resettingRecurringOverride ? "Resetting..." : "Reset Edits"}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => startEditingRecurringItem(selectedRecurringItem)}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Edit Scheduled Post
                    </button>
                    <button
                      type="button"
                      onClick={() => void handlePublishRecurringItem(selectedRecurringItem)}
                      disabled={publishingRecurringKey === selectedRecurringItem.key}
                      className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      {publishingRecurringKey === selectedRecurringItem.key ? "Posting..." : "Post to Home Feed"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedScripture ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4" onClick={() => setSelectedScripture(null)}>
          <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#efe5d9] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8d5d38]">Bible Reference</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">{selectedScripture.reference}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScripture(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                x
              </button>
            </div>

            <div className="px-6 py-5">
              {loadingScripture ? (
                <p className="text-sm text-gray-500">Loading verses...</p>
              ) : (
                <div
                  ref={scriptureContainerRef}
                  className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: scriptureHtml || "<p>Could not load this verse right now.</p>" }}
                />
              )}

              <div className="mt-6 flex justify-end">
                <Link
                  href={`/Bible/${encodeURIComponent(selectedScripture.book.toLowerCase())}/${selectedScripture.chapter}`}
                  className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read Full Chapter
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedPerson ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedPerson.name}</h2>
            {personCreditBlocked ? null : personNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedPerson.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizePersonMarkdown(personNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      {selectedPlace ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedPlace.name}</h2>
            {placeCreditBlocked ? null : placeNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedPlace.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizePlaceMarkdown(placeNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      {selectedKeyword ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedKeyword.name}</h2>
            {keywordCreditBlocked ? null : keywordNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedKeyword.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizeKeywordMarkdown(keywordNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      <CreditLimitModal
        open={personCreditBlocked}
        userId={adminUserId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPersonCreditBlocked(false);
          setSelectedPerson(null);
          setPersonNotes(null);
        }}
      />

      <CreditLimitModal
        open={placeCreditBlocked}
        userId={adminUserId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPlaceCreditBlocked(false);
          setSelectedPlace(null);
          setPlaceNotes(null);
        }}
      />

      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={adminUserId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setKeywordCreditBlocked(false);
          setSelectedKeyword(null);
          setKeywordNotes(null);
        }}
      />
    </div>
  );
}
