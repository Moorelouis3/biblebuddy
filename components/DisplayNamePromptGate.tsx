"use client";

/**
 * After a brand-new account's first meaningful in-app action, ask for their
 * real name (required) and a profile picture (optional) if the profile
 * still only carries the auto-assigned placeholder from signup - the email
 * prefix for email signups, or nothing at all for guest/OAuth accounts
 * (Louis, 2026-09-21: new members shouldn't show up around the app as
 * anonymous auto-generated labels). Listens for actionRecorder's global
 * "meaningful action" event, so it works no matter which page/route the
 * user starts on. Never shown to accounts created before this shipped
 * (existing users keep whatever name they already have), and never shown
 * again once a real name is saved - reuses profile_stats.display_name, the
 * same field the rest of the app already reads, no new state.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { MEANINGFUL_ACTION_EVENT } from "../lib/actionRecorder";

// Only accounts created at/after this ship with the prompt - no existing
// user gets unexpectedly trapped by a new mandatory flow.
const FEATURE_LAUNCH_AT = new Date("2026-09-21T00:00:00.000Z").getTime();

function isPlaceholderDisplayName(name: string | null | undefined, email: string | null | undefined): boolean {
  const trimmed = (name || "").trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  // The exact fallback this app writes at signup: email.split("@")[0].
  const emailPrefix = email ? email.split("@")[0].trim().toLowerCase() : null;
  if (emailPrefix && lower === emailPrefix) return true;
  // Defensive: catch "User 28" / "User 189DE35E" style fallbacks even
  // though this codebase doesn't currently persist them to profile_stats.
  if (/^user[\s_-]*[0-9a-f]{2,}$/i.test(trimmed)) return true;
  if (lower === "user" || lower === "new user") return true;
  return false;
}

export default function DisplayNamePromptGate() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Once we've resolved "already has a real name" / "not a new account" for
  // this page load, stop re-checking on every subsequent action.
  const resolvedRef = useRef(false);
  const checkingRef = useRef(false);

  const maybeShow = useCallback(async () => {
    if (resolvedRef.current || checkingRef.current) return;
    checkingRef.current = true;
    try {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;
      if (!user) return;

      const createdAtMs = user.created_at ? new Date(user.created_at).getTime() : 0;
      if (!createdAtMs || createdAtMs < FEATURE_LAUNCH_AT) {
        resolvedRef.current = true;
        return;
      }

      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", user.id)
        .maybeSingle();

      const currentName = (profile?.display_name || profile?.username || "").trim();
      if (!isPlaceholderDisplayName(currentName, user.email)) {
        resolvedRef.current = true;
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email || null);
      setExistingPhoto((profile?.profile_image_url as string) || null);
      setPhotoPreview((profile?.profile_image_url as string) || null);
      setName("");
      setPhotoFile(null);
      setError(null);
      setOpen(true);
      resolvedRef.current = true;
    } catch (err) {
      console.error("[DisplayNamePromptGate] check failed:", err);
    } finally {
      checkingRef.current = false;
    }
  }, []);

  useEffect(() => {
    function onMeaningfulAction() {
      void maybeShow();
    }
    window.addEventListener(MEANINGFUL_ACTION_EVENT, onMeaningfulAction);
    return () => window.removeEventListener(MEANINGFUL_ACTION_EVENT, onMeaningfulAction);
  }, [maybeShow]);

  async function save() {
    if (saving || !userId) return;
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (isPlaceholderDisplayName(trimmed, userEmail)) {
      setError("Please enter your real name.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      let imageUrl = existingPhoto;
      if (photoFile) {
        const ext = photoFile.name.split(".").pop() || "jpg";
        const path = `${userId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, photoFile, { upsert: true });
        if (uploadError) throw uploadError;
        imageUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
      }

      const { error: profileError } = await supabase.from("profile_stats").upsert(
        { user_id: userId, display_name: trimmed, username: trimmed, profile_image_url: imageUrl },
        { onConflict: "user_id" },
      );
      if (profileError) throw profileError;

      const firstToken = trimmed.split(/\s+/)[0];
      await supabase.auth.updateUser({
        data: { firstName: firstToken, first_name: firstToken, display_name: trimmed },
      });

      try {
        await supabase.from("master_actions").insert({
          user_id: userId,
          action_type: "profile_creation_popup_completed",
          username: trimmed,
        });
      } catch (logError) {
        console.error("[DisplayNamePromptGate] Could not log completion action:", logError);
      }

      setOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your name. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ModalShell isOpen={open} backdropColor="bg-black/55" closeOnBackdrop={false}>
      <div className="mx-4 w-full max-w-md rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-white p-5 text-left shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
          One quick step
        </p>
        <h2 className="mt-2 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
          What should we call you?
        </h2>
        <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
          So the rest of Bible Buddy knows you by name, not an ID.
        </p>

        <div className="mt-4 grid gap-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            autoFocus
            className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
          />

          <div>
            <label className="flex cursor-pointer items-center gap-3">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt=""
                  className="h-12 w-12 rounded-full border border-[var(--bb-card-border,#dbe7f4)] object-cover"
                />
              ) : (
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-xl"
                  aria-hidden="true"
                >
                  📷
                </span>
              )}
              <span className="text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
                {photoPreview ? "Change profile picture" : "Add a profile picture"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setPhotoFile(file);
                  if (file) setPhotoPreview(URL.createObjectURL(file));
                }}
              />
            </label>
            <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">
              Optional - skip it and tap Save & Continue, add one anytime later from your profile.
            </p>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="mt-1 rounded-2xl bg-[#111827] px-5 py-3 text-sm font-black disabled:cursor-wait disabled:opacity-70"
            style={{ color: "#ffffff" }}
          >
            {saving ? "Saving..." : "Save & continue"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
