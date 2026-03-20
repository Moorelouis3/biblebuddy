"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type AnalyticsPayload = {
  group: {
    id: string;
    name: string;
    coverEmoji: string;
  };
  metrics: {
    uniqueFeedVisitors: number;
    totalFeedVisits: number;
    bibleStudyCardClicks24h: number;
    uniqueBibleStudyCardVisitors24h: number;
    posts: number;
    comments: number;
    likes: number;
    articleReads: number;
    uniqueArticleReaders: number;
  };
  latestDrops: {
    weeklyTrivia: { week_key: string; subject_title: string; created_at: string } | null;
    opinionWednesday: { week_key: string; subject_title: string; question: string; created_at: string } | null;
    truthThursday: { week_key: string; subject_title: string; prompt: string; created_at: string } | null;
  };
  charts: {
    bibleStudyCardDaily: Array<{
      dateKey: string;
      label: string;
      totalClicks: number;
      uniqueVisitors: number;
    }>;
    postsDaily: Array<{
      dateKey: string;
      label: string;
      total: number;
      uniqueVisitors: number;
    }>;
    commentsDaily: Array<{
      dateKey: string;
      label: string;
      total: number;
      uniqueVisitors: number;
    }>;
    likesDaily: Array<{
      dateKey: string;
      label: string;
      total: number;
      uniqueVisitors: number;
    }>;
    articleReadsDaily: Array<{
      dateKey: string;
      label: string;
      total: number;
      uniqueVisitors: number;
    }>;
  };
  recentActions: Array<{
    created_at: string;
    actionType: string;
    text: string;
  }>;
  mostActiveBuddies: Array<{
    rank: number;
    userId: string;
    displayName: string;
    profileImageUrl: string | null;
    memberBadge: string | null;
    isPaid: boolean;
    posts: number;
    comments: number;
    likes: number;
    score: number;
  }>;
  schedule: Array<{
    key: string;
    label: string;
    accent: string;
    nextReleaseLabel: string;
    nextReleaseIso: string;
    nextContentTitle: string;
    nextContentDescription: string;
    preview: {
      title: string;
      description: string;
    };
    nextFour: Array<{
      releaseLabel: string;
      releaseIso: string;
      title: string;
      description: string;
      pollOptions?: string[];
    }>;
  }>;
};

type CalendarEvent = {
  id: string;
  label: string;
  accent: string;
  releaseLabel: string;
  releaseIso: string;
  title: string;
  description: string | null;
  pollOptions?: string[];
};

type CarouselQueueItem = {
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

const BERLIN_TIME_ZONE = "Europe/Berlin";

function getBerlinDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: BERLIN_TIME_ZONE,
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
    weekday: parts.weekday,
  };
}

function getBerlinDateKey(date: Date) {
  const parts = getBerlinDateParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function formatQueueDateTime(dateStr: string | null) {
  if (!dateStr) return "Not scheduled";
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDateTimeLocalValue(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function queueStatusLabel(item: CarouselQueueItem) {
  if (item.status === "published") return "Posted";
  if (item.status === "scheduled") return "Scheduled";
  return "Draft";
}

function queueStyleLabel(item: CarouselQueueItem) {
  return item.post_style === "text" ? "Text Post" : "Cover Post";
}

function stripSchedulerHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (error && typeof error === "object" && "message" in error && typeof (error as { message?: unknown }).message === "string") {
    return (error as { message: string }).message;
  }
  return fallback;
}

function formatActionLogDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getGroupActionColorClass(actionType: string) {
  if (actionType.includes("liked")) return "bg-[#fff6eb]";
  if (actionType.includes("comment") || actionType.includes("reply")) return "bg-[#f6f8ff]";
  if (actionType.includes("viewed") || actionType.includes("opened")) return "bg-[#f4faf4]";
  return "bg-[#fcfbf8]";
}

export default function StudyGroupAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedMetricKey, setSelectedMetricKey] = useState<string | null>("feed_visitors");
  const [chartWeekOffset, setChartWeekOffset] = useState(0);
  const [adminUserId, setAdminUserId] = useState<string | null>(null);
  const [carouselQueue, setCarouselQueue] = useState<CarouselQueueItem[]>([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [queueError, setQueueError] = useState<string | null>(null);
  const [queuePostStyle, setQueuePostStyle] = useState<"cover" | "text">("cover");
  const [queueTitle, setQueueTitle] = useState("");
  const [queueScheduledFor, setQueueScheduledFor] = useState("");
  const [queueCoverFile, setQueueCoverFile] = useState<File | null>(null);
  const [queueCoverPreview, setQueueCoverPreview] = useState<string | null>(null);
  const [savingQueueItem, setSavingQueueItem] = useState(false);
  const [publishingQueueId, setPublishingQueueId] = useState<string | null>(null);
  const [deletingQueueId, setDeletingQueueId] = useState<string | null>(null);
  const [selectedQueueItemId, setSelectedQueueItemId] = useState<string | null>(null);
  const queueFileInputRef = useRef<HTMLInputElement>(null);
  const queueEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
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

  function runQueueEditorCommand(command: () => boolean) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      command();
    };
  }

  const queueEditorHtml = queueEditor?.getHTML() ?? "";
  const queueEditorText = stripSchedulerHtml(queueEditorHtml);

  const metricCards = [
    { key: "feed_visitors", label: "Feed Visitors", value: data?.metrics.bibleStudyCardClicks24h ?? 0, helper: `${data?.metrics.uniqueBibleStudyCardVisitors24h ?? 0} unique buddies clicked the Bible study card in the last 24 hours` },
    { key: "posts", label: "Posts", value: data?.metrics.posts ?? 0, helper: "Top-level group posts" },
    { key: "comments", label: "Comments", value: data?.metrics.comments ?? 0, helper: "Replies and discussion" },
    { key: "likes", label: "Likes", value: data?.metrics.likes ?? 0, helper: "Group post likes" },
    { key: "article_reads", label: "Article Reads", value: data?.metrics.articleReads ?? 0, helper: `${data?.metrics.uniqueArticleReaders ?? 0} unique readers` },
  ];

  const selectedMetricConfig = useMemo(() => {
    switch (selectedMetricKey) {
      case "posts":
        return {
          title: "Posts Trend",
          helper: "Top-level group posts by day, one week at a time.",
          valueLabel: "posts",
          series: data?.charts.postsDaily || [],
        };
      case "comments":
        return {
          title: "Comments Trend",
          helper: "Comments and replies by day, one week at a time.",
          valueLabel: "comments",
          series: data?.charts.commentsDaily || [],
        };
      case "likes":
        return {
          title: "Likes Trend",
          helper: "Group post likes by day, one week at a time.",
          valueLabel: "likes",
          series: data?.charts.likesDaily || [],
        };
      case "article_reads":
        return {
          title: "Article Reads Trend",
          helper: "Bible study article opens by day, one week at a time.",
          valueLabel: "reads",
          series: data?.charts.articleReadsDaily || [],
        };
      case "feed_visitors":
      default:
        return {
          title: "Feed Visitors Trend",
          helper: "Bible study card clicks by day, one week at a time.",
          valueLabel: "clicks",
          series: (data?.charts.bibleStudyCardDaily || []).map((entry) => ({
            dateKey: entry.dateKey,
            label: entry.label,
            total: entry.totalClicks,
            uniqueVisitors: entry.uniqueVisitors,
          })),
        };
    }
  }, [data, selectedMetricKey]);

  const selectedMetricChart = useMemo(() => {
    const today = new Date();
    const berlinToday = getBerlinDateParts(today);
    const weekdayOrder: Record<string, number> = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    };
    const todayUtc = new Date(Date.UTC(berlinToday.year, berlinToday.month - 1, berlinToday.day));
    const mondayOffset = berlinToday.weekday === "Sun" ? -6 : 1 - (weekdayOrder[berlinToday.weekday] || 1);
    const start = new Date(todayUtc);
    start.setUTCDate(start.getUTCDate() + mondayOffset - chartWeekOffset * 7);

    const dayMap = new Map(selectedMetricConfig.series.map((entry) => [entry.dateKey, entry]));
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);
      const dateKey = getBerlinDateKey(date);
      const existing = dayMap.get(dateKey);
      return {
        dateKey,
        shortLabel: new Intl.DateTimeFormat("en-US", { timeZone: BERLIN_TIME_ZONE, weekday: "short" }).format(date),
        fullLabel: new Intl.DateTimeFormat("en-US", {
          timeZone: BERLIN_TIME_ZONE,
          month: "short",
          day: "numeric",
        }).format(date),
        total: existing?.total ?? 0,
        uniqueVisitors: existing?.uniqueVisitors ?? 0,
      };
    });

    const maxValue = Math.max(1, ...days.map((day) => day.total));
    const weekLabel = `${days[0]?.fullLabel} to ${days[6]?.fullLabel}`;

    return { days, maxValue, weekLabel };
  }, [chartWeekOffset, selectedMetricConfig]);

  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    if (!data) return [];
    return data.schedule
      .flatMap((item) =>
        item.nextFour.map((future, index) => ({
          id: `${item.key}-${index}`,
          label: item.label,
          accent: item.accent,
          releaseLabel: future.releaseLabel,
          releaseIso: future.releaseIso,
          title: future.title,
          description: future.description,
          pollOptions: future.pollOptions,
        })),
      )
      .sort((a, b) => new Date(a.releaseIso).getTime() - new Date(b.releaseIso).getTime());
  }, [data]);

  const selectedEvent =
    calendarEvents.find((event) => event.id === selectedEventId) || null;

  const selectedQueueItem =
    carouselQueue.find((item) => item.id === selectedQueueItemId) || null;

  const calendarDays = useMemo(() => {
    const berlinToday = getBerlinDateParts(new Date());
    const weekdayOrder: Record<string, number> = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    };
    const todayUtc = new Date(Date.UTC(berlinToday.year, berlinToday.month - 1, berlinToday.day));
    const mondayOffset = berlinToday.weekday === "Sun" ? -6 : 1 - (weekdayOrder[berlinToday.weekday] || 1);
    const start = new Date(todayUtc);
    start.setUTCDate(start.getUTCDate() + mondayOffset);

    return Array.from({ length: 28 }, (_, index) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);
      const dateKey = getBerlinDateKey(date);
      const events = calendarEvents.filter((event) => getBerlinDateKey(new Date(event.releaseIso)) === dateKey);
      return {
        date,
        dateKey,
        events,
      };
    });
  }, [calendarEvents]);

  async function loadCarouselQueue(currentUserId: string) {
    setQueueLoading(true);
    setQueueError(null);
    try {
      const { data: queueRows, error: queueLoadError } = await supabase
        .from("group_feed_carousel_queue")
        .select("id, group_id, created_by, post_style, title, caption, cover_image_url, scheduled_for, status, published_post_id, published_at, created_at")
        .eq("group_id", groupId)
        .eq("created_by", currentUserId)
        .order("created_at", { ascending: false });

      if (queueLoadError) {
        throw queueLoadError;
      }

      setCarouselQueue((queueRows || []) as CarouselQueueItem[]);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not load the home feed scheduler."));
    } finally {
      setQueueLoading(false);
    }
  }

  function resetQueueComposer() {
    setQueuePostStyle("cover");
    setQueueTitle("");
    setQueueScheduledFor("");
    setQueueCoverFile(null);
    queueEditor?.commands.setContent("");
    if (queueCoverPreview) {
      URL.revokeObjectURL(queueCoverPreview);
    }
    setQueueCoverPreview(null);
    if (queueFileInputRef.current) {
      queueFileInputRef.current.value = "";
    }
  }

  async function handleCreateQueueItem() {
    if (!adminUserId) {
      setQueueError("Could not verify your account.");
      return;
    }

    if (queuePostStyle === "cover" && !queueCoverFile) {
      setQueueError("Upload a carousel cover first.");
      return;
    }

    setSavingQueueItem(true);
    setQueueError(null);

    try {
      let coverImageUrl: string | null = null;

      if (queuePostStyle === "cover" && queueCoverFile) {
        const ext = queueCoverFile.name.split(".").pop() ?? "jpg";
        const path = `${adminUserId}/group-carousel-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("post-media")
          .upload(path, queueCoverFile, { upsert: false });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage.from("post-media").getPublicUrl(path);
        coverImageUrl = publicUrlData.publicUrl;
      }
      const scheduledForIso = queueScheduledFor ? new Date(queueScheduledFor).toISOString() : null;

      const { error: insertError } = await supabase.from("group_feed_carousel_queue").insert({
        group_id: groupId,
        created_by: adminUserId,
        post_style: queuePostStyle,
        title: queueTitle.trim() || null,
        caption: queueEditorHtml.trim() || null,
        cover_image_url: coverImageUrl,
        scheduled_for: scheduledForIso,
        status: scheduledForIso ? "scheduled" : "draft",
      });

      if (insertError) {
        throw insertError;
      }

      resetQueueComposer();
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not save this home feed draft."));
    } finally {
      setSavingQueueItem(false);
    }
  }

  async function handlePublishQueueItem(queueItem: CarouselQueueItem) {
    if (!queueItem || publishingQueueId) return;
    setPublishingQueueId(queueItem.id);
    setQueueError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${groupId}/carousel-queue/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ queueId: queueItem.id }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not post this carousel to the home feed.");
      }

      if (adminUserId) {
        await loadCarouselQueue(adminUserId);
      }
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not publish this queued post."));
    } finally {
      setPublishingQueueId(null);
    }
  }

  async function handleDeleteQueueItem(queueItemId: string) {
    if (!adminUserId || deletingQueueId) return;
    setDeletingQueueId(queueItemId);
    setQueueError(null);

    try {
      const { error: deleteError } = await supabase
        .from("group_feed_carousel_queue")
        .delete()
        .eq("id", queueItemId);

      if (deleteError) {
        throw deleteError;
      }

      if (selectedQueueItemId === queueItemId) {
        setSelectedQueueItemId(null);
      }
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not delete this queued post."));
    } finally {
      setDeletingQueueId(null);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        router.push("/login");
        return;
      }
      setAdminUserId(user.id);
      if (user.email !== "moorelouis3@gmail.com") {
        router.push(`/study-groups/${groupId}/chat`);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        setError("Could not verify your session.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/groups/${groupId}/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || "Could not load analytics.");
        }

        if (!cancelled) {
          setData(payload);
          setSelectedEventId(null);
          setSelectedMetricKey("feed_visitors");
          setChartWeekOffset(0);
        }

        await loadCarouselQueue(user.id);
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err, "Could not load analytics."));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();
    return () => {
      cancelled = true;
    };
  }, [groupId, router]);

  useEffect(() => {
    const shouldLockBodyScroll = Boolean(selectedEventId || selectedQueueItemId);
    if (!shouldLockBodyScroll) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedEventId, selectedQueueItemId]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-500">Loading group analytics...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#ead8c4] bg-white p-6 shadow-sm text-center">
          <p className="text-lg font-bold text-gray-900">Group analytics unavailable</p>
          <p className="mt-2 text-sm text-gray-500">{error || "Could not load this page."}</p>
          <Link href={`/study-groups/${groupId}/chat`} className="mt-4 inline-flex rounded-xl bg-[#4a9b6f] px-4 py-2.5 text-sm font-semibold text-white">
            Back to Group
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f4]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-4 flex-wrap">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <span>/</span>
          <Link href={`/study-groups/${groupId}/chat`} className="hover:underline">Bible Study Group</Link>
          <span>/</span>
          <span className="text-gray-900">Analytics</span>
        </div>

        <div className="rounded-[28px] border border-[#d8e8d7] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f8d6c]">Study Group Analytics</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>{data.group.coverEmoji}</span>
                <span>{data.group.name}</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                A quick Louis-only view of group momentum, engagement, and the next planned recurring drops.
              </p>
            </div>
            <Link
              href={`/study-groups/${groupId}/chat`}
              className="rounded-full border border-[#d9c7b4] bg-[#fffaf4] px-4 py-2 text-sm font-semibold text-[#8d5d38]"
            >
              Back to Group
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metricCards.map((card) => (
              <button
                key={card.label}
                type="button"
                onClick={() => card.key ? setSelectedMetricKey(card.key) : undefined}
                className={`rounded-2xl border bg-[#fcfbf8] p-4 text-left ${card.key ? "transition hover:border-[#bfd9bf]" : ""} ${selectedMetricKey === card.key ? "border-[#4a9b6f] bg-white shadow-sm" : "border-[#ece6dd]"}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{card.helper}</p>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="border-b border-[#eef1ec] px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f8d6c]">Group Action Log</p>
              <p className="mt-2 text-sm text-gray-600">
                Everything happening in this group right now, including posts, comments, replies, likes, and study opens.
              </p>
            </div>
            <div className="max-h-[420px] overflow-y-auto px-4 py-4">
              {data.recentActions.length === 0 ? (
                <div className="rounded-2xl bg-[#fcfbf8] px-4 py-5 text-sm text-gray-500">
                  No group activity yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {data.recentActions.map((action, index) => (
                    <div
                      key={`${action.created_at}-${index}`}
                      className={`rounded-2xl px-4 py-3 ${getGroupActionColorClass(action.actionType)}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm leading-6 text-gray-900">{action.text}</p>
                        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                          {formatActionLogDateTime(action.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedMetricKey ? (
            <div className="mt-5 rounded-3xl border border-[#dce8dc] bg-[#f8fcf7] p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f8d6c]">{selectedMetricConfig.title}</p>
                  <p className="mt-2 text-sm text-gray-600">{selectedMetricConfig.helper}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChartWeekOffset((value) => value + 1)}
                    className="rounded-full border border-[#d9c7b4] bg-white px-3 py-1.5 text-sm font-semibold text-[#8d5d38]"
                  >
                    Previous Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartWeekOffset((value) => Math.max(0, value - 1))}
                    disabled={chartWeekOffset === 0}
                    className="rounded-full border border-[#d9c7b4] bg-white px-3 py-1.5 text-sm font-semibold text-[#8d5d38] disabled:opacity-50"
                  >
                    Next Week
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-800">{selectedMetricChart.weekLabel}</p>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-7">
                {selectedMetricChart.days.map((day) => (
                  <div key={day.dateKey} className="rounded-2xl border border-[#e3eadf] bg-white p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{day.shortLabel}</p>
                    <p className="mt-1 text-xs text-gray-500">{day.fullLabel}</p>
                    <div className="mt-3 flex h-24 items-end">
                      <div
                        className="w-full rounded-t-2xl bg-[#4a9b6f] transition-all"
                        style={{ height: `${Math.max(10, (day.total / selectedMetricChart.maxValue) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-900">{day.total}</p>
                    <p className="text-xs text-gray-500">{selectedMetricConfig.valueLabel}</p>
                    <p className="text-xs text-gray-500">{day.uniqueVisitors} unique buddies</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 rounded-3xl border border-[#dce8dc] bg-[#f8fcf7] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f8d6c]">Content Calendar</p>
            <p className="mt-2 text-sm text-gray-600">
              Click a scheduled day to see the real preview of how that post will look.
            </p>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="px-2 pb-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  {day}
                </div>
              ))}
              {calendarDays.map((day) => {
                const isSelected = !!selectedEvent && day.events.some((event) => event.id === selectedEvent.id);
                const hasEvents = day.events.length > 0;
                return (
                  <button
                    key={day.dateKey}
                    type="button"
                    onClick={() => {
                      if (day.events[0]) setSelectedEventId(day.events[0].id);
                    }}
                    className={`min-h-[84px] rounded-2xl border p-2.5 text-left transition ${
                      isSelected
                        ? "border-[#4a9b6f] bg-white shadow-sm"
                        : hasEvents
                          ? "border-[#dfe9dd] bg-white hover:border-[#bfd9bf]"
                          : "border-[#edf2eb] bg-[#fbfcfa]"
                    }`}
                  >
                    <p className="text-sm font-bold text-gray-900">{day.date.getUTCDate()}</p>
                    <div className="mt-1.5 space-y-1">
                      {day.events.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-xl px-2 py-1 text-[10px] font-semibold leading-tight text-white"
                          style={{ backgroundColor: event.accent }}
                        >
                          {event.label}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Home Feed Scheduler</p>
                <p className="mt-2 text-lg font-bold text-gray-900">Private scheduler feed</p>
                <p className="mt-2 max-w-2xl text-sm text-gray-600">
                  The scheduler now lives on its own page so it can feel like the real home feed composer and preview flow instead of an analytics widget.
                </p>
              </div>
              <Link
                href={`/study-groups/${groupId}/scheduler`}
                className="rounded-2xl bg-[#4a9b6f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Open Scheduler
              </Link>
            </div>

            <div className="mt-5 rounded-3xl border border-[#d4ecd4] bg-[#f9fcf9] p-5">
              <p className="text-sm font-semibold text-gray-900">What moved</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your cover drafts and text-only thread drafts now live in a dedicated private scheduler feed. You can save drafts with no time, click any queued post to preview it like a real home feed post, and post it from there when ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          onClick={() => setSelectedEventId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-[28px] border border-[#e8dccb] bg-[#fffdf9] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: selectedEvent.accent }}>
                  {selectedEvent.label}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">{selectedEvent.releaseLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEventId(null)}
                className="rounded-full border border-[#eadfce] bg-white px-3 py-1.5 text-sm font-semibold text-gray-600"
              >
                Close
              </button>
            </div>

            <div className="mt-5 rounded-[28px] border border-[#e8e1d6] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e7dc] text-sm font-bold text-[#8d5d38]">
                  L
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Louis</p>
                  <p className="text-xs text-gray-400">Scheduled preview</p>
                </div>
              </div>

              <h3 className="mt-4 text-[28px] font-bold leading-tight text-gray-900">{selectedEvent.title}</h3>
              {selectedEvent.description ? (
                <div className="mt-4 whitespace-pre-line text-[15px] leading-7 text-gray-700">{selectedEvent.description}</div>
              ) : null}

              {selectedEvent.pollOptions?.length ? (
                <div className={`${selectedEvent.description ? "mt-5" : "mt-4"} space-y-2.5`}>
                  {selectedEvent.pollOptions.map((option) => (
                    <div
                      key={option}
                      className="rounded-2xl border border-[#ece7de] bg-[#fcfbf8] px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-gray-900">{option}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 border-t border-[#efe5d9] pt-4 text-sm text-gray-500">
                0 likes / 0 Comments
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedQueueItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          onClick={() => setSelectedQueueItemId(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-gray-200 bg-[#f7f8f4] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <div>
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 bg-white px-5 py-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Home Feed Preview</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {queueStatusLabel(selectedQueueItem)} • {selectedQueueItem.status === "published"
                        ? `Posted ${formatQueueDateTime(selectedQueueItem.published_at)}`
                        : `Auto post: ${formatQueueDateTime(selectedQueueItem.scheduled_for)}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedQueueItemId(null)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-600"
                  >
                    Close
                  </button>
                </div>

                <div className="px-5 py-5">
                  <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef7f1] text-sm font-bold text-[#4a9b6f]">
                        L
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Louis</p>
                        <p className="text-xs text-gray-400">Queued home feed post</p>
                      </div>
                    </div>

                    {selectedQueueItem.post_style === "cover" && selectedQueueItem.cover_image_url ? (
                      <div className="mt-4 overflow-hidden rounded-[24px] border border-gray-100 bg-[#f8f8f8]">
                        <img
                          src={selectedQueueItem.cover_image_url}
                          alt={selectedQueueItem.title || "Queued cover post"}
                          className="w-full object-contain"
                          style={{ maxHeight: "520px", objectPosition: "center" }}
                        />
                      </div>
                    ) : null}

                    {selectedQueueItem.title ? (
                      <h3 className="mt-5 text-xl font-bold leading-snug text-gray-900">{selectedQueueItem.title}</h3>
                    ) : null}

                    <div className="mt-4 text-[15px] leading-7 text-gray-700">
                      {selectedQueueItem.caption ? (
                        <div
                          className="prose prose-sm max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: selectedQueueItem.caption }}
                        />
                      ) : (
                        "No caption yet."
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="flex flex-wrap gap-3">
                    {selectedQueueItem.status !== "published" ? (
                      <button
                        type="button"
                        onClick={() => void handlePublishQueueItem(selectedQueueItem)}
                        disabled={publishingQueueId === selectedQueueItem.id}
                        className="rounded-2xl bg-[#4a9b6f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                      >
                        {publishingQueueId === selectedQueueItem.id ? "Posting..." : "Post to Home Feed"}
                      </button>
                    ) : (
                      <Link
                        href={`/study-groups/${groupId}/chat`}
                        className="rounded-2xl bg-[#4a9b6f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Open Group Feed
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => void handleDeleteQueueItem(selectedQueueItem.id)}
                      disabled={deletingQueueId === selectedQueueItem.id}
                      className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingQueueId === selectedQueueItem.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
