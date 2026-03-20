"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type GroupBasics = {
  id: string;
  name: string;
  cover_emoji: string | null;
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

function queueStatusLabel(item: QueueItem) {
  if (item.status === "published") return "Posted";
  if (item.status === "scheduled") return "Scheduled";
  return "Draft";
}

function formatQueueDateTime(dateStr: string | null) {
  if (!dateStr) return "No auto post time";
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
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
  const selectedQueueItem = carouselQueue.find((item) => item.id === selectedQueueItemId) || null;

  async function loadCarouselQueue(currentUserId: string) {
    setQueueLoading(true);
    setQueueError(null);
    try {
      const { data, error: loadError } = await supabase
        .from("group_feed_carousel_queue")
        .select("id, group_id, created_by, post_style, title, caption, cover_image_url, scheduled_for, status, published_post_id, published_at, created_at")
        .eq("group_id", groupId)
        .eq("created_by", currentUserId)
        .order("created_at", { ascending: false });

      if (loadError) throw loadError;
      setCarouselQueue((data || []) as QueueItem[]);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not load the scheduler feed."));
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
    if (queueCoverPreview) URL.revokeObjectURL(queueCoverPreview);
    setQueueCoverPreview(null);
    if (queueFileInputRef.current) queueFileInputRef.current.value = "";
  }

  async function handleCreateQueueItem() {
    if (!adminUserId) {
      setQueueError("Could not verify your account.");
      return;
    }

    if (queuePostStyle === "cover" && !queueCoverFile) {
      setQueueError("Upload a cover image first.");
      return;
    }

    if (!queueEditorText.trim()) {
      setQueueError("Add your caption or post text first.");
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

        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("post-media").getPublicUrl(path);
        coverImageUrl = data.publicUrl;
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

      if (insertError) throw insertError;

      resetQueueComposer();
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not save this home feed draft."));
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

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not post this to the home feed.");

      if (adminUserId) await loadCarouselQueue(adminUserId);
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
      const { error: deleteError } = await supabase.from("group_feed_carousel_queue").delete().eq("id", queueItemId);
      if (deleteError) throw deleteError;
      if (selectedQueueItemId === queueItemId) setSelectedQueueItemId(null);
      await loadCarouselQueue(adminUserId);
    } catch (err) {
      setQueueError(getErrorMessage(err, "Could not delete this queued post."));
    } finally {
      setDeletingQueueId(null);
    }
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

        await loadCarouselQueue(user.id);
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
    if (!selectedQueueItemId) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedQueueItemId]);

  useEffect(() => {
    return () => {
      if (queueCoverPreview) URL.revokeObjectURL(queueCoverPreview);
    };
  }, [queueCoverPreview]);

  const schedulerFeed = useMemo(() => carouselQueue, [carouselQueue]);

  if (loading) {
    return <div className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-center text-sm text-gray-500">Loading scheduler...</div>;
  }

  if (error || !group) {
    return <div className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-center text-sm text-red-600">{error || "Could not load scheduler."}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white px-5 py-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4a9b6f]">Home Feed Scheduler</p>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">{group.cover_emoji ? `${group.cover_emoji} ` : ""}{group.name}</h1>
              <p className="mt-2 text-sm text-gray-600">
                Build posts exactly like your feed flow, save them privately here, then tap a scheduler post to preview it and send it to the real home feed.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link href={`/study-groups/${groupId}/analytics`} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                Back to Analytics
              </Link>
              <Link href={`/study-groups/${groupId}/chat`} className="rounded-full bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Open Home Feed
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d4ecd4] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt={displayName} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                {getInitial(displayName)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Create a scheduled home feed post</p>
              <p className="mt-1 text-sm text-gray-400">This looks like your private feed first. Nothing hits the group until you post it.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-[#fafafa] p-1">
            <button
              type="button"
              onClick={() => setQueuePostStyle("cover")}
              className={`rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${queuePostStyle === "cover" ? "bg-[#4a9b6f] text-white" : "text-gray-600 hover:bg-white"}`}
            >
              Cover Post
            </button>
            <button
              type="button"
              onClick={() => setQueuePostStyle("text")}
              className={`rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${queuePostStyle === "text" ? "bg-[#4a9b6f] text-white" : "text-gray-600 hover:bg-white"}`}
            >
              Text Post
            </button>
          </div>

          <input
            ref={queueFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setQueueCoverFile(file);
              if (queueCoverPreview) URL.revokeObjectURL(queueCoverPreview);
              setQueueCoverPreview(file ? URL.createObjectURL(file) : null);
            }}
          />

          {queuePostStyle === "cover" ? (
            <button
              type="button"
              onClick={() => queueFileInputRef.current?.click()}
              className="mt-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-[26px] border border-dashed border-[#d4ecd4] bg-[#fafdf9] text-center transition hover:border-[#4a9b6f]"
            >
              {queueCoverPreview ? (
                <img src={queueCoverPreview} alt="Cover preview" className="h-full w-full object-cover" />
              ) : (
                <div className="px-6">
                  <p className="text-sm font-semibold text-gray-700">Upload cover image</p>
                  <p className="mt-1 text-xs text-gray-400">This is the image-only card that will show in the feed.</p>
                </div>
              )}
            </button>
          ) : null}

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Subject</label>
              <input
                type="text"
                value={queueTitle}
                onChange={(event) => setQueueTitle(event.target.value)}
                placeholder="Optional subject"
                className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Message</label>
              <div className="overflow-hidden rounded-3xl border border-[#ead8c4] bg-[#fffaf4]">
                <div className="flex flex-wrap gap-2 border-b border-[#efe5d9] bg-[#fffdf9] px-4 py-3">
                  <button type="button" onMouseDown={runQueueEditorCommand(() => queueEditor?.chain().focus().toggleBold().run() ?? false)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${queueEditor?.isActive("bold") ? "bg-[#dff0df] text-[#4f7e54]" : "border border-[#d4ecd4] bg-white text-gray-600"}`}>Bold</button>
                  <button type="button" onMouseDown={runQueueEditorCommand(() => queueEditor?.chain().focus().toggleItalic().run() ?? false)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${queueEditor?.isActive("italic") ? "bg-[#dff0df] text-[#4f7e54]" : "border border-[#d4ecd4] bg-white text-gray-600"}`}>Italic</button>
                  <button type="button" onMouseDown={runQueueEditorCommand(() => queueEditor?.chain().focus().toggleHeading({ level: 1 }).run() ?? false)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${queueEditor?.isActive("heading", { level: 1 }) ? "bg-[#dff0df] text-[#4f7e54]" : "border border-[#d4ecd4] bg-white text-gray-600"}`}>H1</button>
                  <button type="button" onMouseDown={runQueueEditorCommand(() => queueEditor?.chain().focus().toggleHeading({ level: 2 }).run() ?? false)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${queueEditor?.isActive("heading", { level: 2 }) ? "bg-[#dff0df] text-[#4f7e54]" : "border border-[#d4ecd4] bg-white text-gray-600"}`}>H2</button>
                  <button type="button" onMouseDown={runQueueEditorCommand(() => queueEditor?.chain().focus().toggleBulletList().run() ?? false)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${queueEditor?.isActive("bulletList") ? "bg-[#dff0df] text-[#4f7e54]" : "border border-[#d4ecd4] bg-white text-gray-600"}`}>List</button>
                </div>
                <EditorContent editor={queueEditor} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Auto Post Time</label>
              <input
                type="datetime-local"
                value={queueScheduledFor}
                onChange={(event) => setQueueScheduledFor(event.target.value)}
                className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
              />
              <p className="mt-2 text-xs text-gray-500">Leave this empty if you just want to store it in the scheduler feed as a draft.</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetQueueComposer}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleCreateQueueItem}
              disabled={savingQueueItem || !queueEditorText || (queuePostStyle === "cover" && !queueCoverFile)}
              className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {savingQueueItem ? "Saving..." : "Save to Scheduler"}
            </button>
          </div>

          {queueError ? <p className="mt-3 text-sm text-red-600">{queueError}</p> : null}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Scheduler Feed</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Private queued posts</h2>
            </div>
            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600">
              {schedulerFeed.length} post{schedulerFeed.length === 1 ? "" : "s"}
            </div>
          </div>

          {queueLoading ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500 shadow-sm">
              Loading your scheduler feed...
            </div>
          ) : schedulerFeed.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-bold text-gray-900">No scheduled drafts yet</p>
              <p className="mt-2 text-sm text-gray-500">Your private scheduler feed will fill up here once you save a post.</p>
            </div>
          ) : (
            schedulerFeed.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedQueueItemId(item.id)}
                className="w-full rounded-3xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt={displayName} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: avatarColor(adminUserId || displayName) }}>
                      {getInitial(displayName)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                      <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4a9b6f]">
                        {queueStatusLabel(item)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.status === "published" ? `Posted ${formatQueueDateTime(item.published_at)}` : formatQueueDateTime(item.scheduled_for)}
                    </p>
                  </div>
                </div>

                {item.post_style === "cover" && item.cover_image_url ? (
                  <div className="mt-4 overflow-hidden rounded-2xl">
                    <img src={item.cover_image_url} alt={item.title || "Queued cover post"} className="h-auto w-full object-cover" />
                  </div>
                ) : (
                  <>
                    {item.title ? <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900">{item.title}</h3> : null}
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">
                      {stripSchedulerHtml(item.caption || "")}
                    </p>
                  </>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {selectedQueueItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setSelectedQueueItemId(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-xl modal-panel-in"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#efe5d9] px-6 py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                  <span className="text-xs text-gray-400">
                    {selectedQueueItem.status === "published" ? `Posted ${formatQueueDateTime(selectedQueueItem.published_at)}` : `${queueStatusLabel(selectedQueueItem)} · ${formatQueueDateTime(selectedQueueItem.scheduled_for)}`}
                  </span>
                </div>
                {selectedQueueItem.title && selectedQueueItem.post_style !== "cover" ? (
                  <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">{selectedQueueItem.title}</h2>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedQueueItemId(null)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5">
              {selectedQueueItem.cover_image_url ? (
                <img
                  src={selectedQueueItem.cover_image_url}
                  alt={selectedQueueItem.title || "Queued cover post"}
                  className="w-full rounded-2xl object-contain"
                  style={{ maxHeight: "520px", objectPosition: "center" }}
                />
              ) : null}

              {selectedQueueItem.post_style === "cover" && selectedQueueItem.title ? (
                <h2 className="mt-5 text-xl font-bold leading-snug text-gray-900">{selectedQueueItem.title}</h2>
              ) : null}

              {selectedQueueItem.caption ? (
                <div
                  className="prose prose-sm mt-5 max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedQueueItem.caption }}
                />
              ) : null}

              <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span>0 likes</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span>0 Comments</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
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
                    {publishingQueueId === selectedQueueItem.id ? "Posting..." : "Post to Home Feed"}
                  </button>
                ) : (
                  <Link
                    href={`/study-groups/${groupId}/chat`}
                    className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Open Group Feed
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
