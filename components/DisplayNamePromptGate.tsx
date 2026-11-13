"use client";

/**
 * Ask for a first and last name at the moment someone's study activity is
 * about to appear on the community wall.
 *
 * Louis, 2026-11-13: the feed was showing "Bible Buddy User" next to real
 * people's activity, one account 48 times over, and he wants real names on it.
 * Two decisions of his shape this file:
 *
 *  - Ask when they post, not on arrival and not as a wall across the app.
 *    Reading and studying are never interrupted. The three action types that
 *    publish to the wall (see lib/communityMilestones.ts) are the ones that
 *    open this, because that is the moment a name becomes public. 1,829
 *    accounts with no usable name predate the old launch gate below and could
 *    never be asked; they can now, when it actually matters.
 *
 *  - First AND last name, both required. He chose this knowing the cost: 2,698
 *    members currently use a single name and 221 of them were active in the
 *    last month. None of them is locked out of anything - they are asked the
 *    next time their activity would publish, and their existing name is never
 *    overwritten until they answer.
 *
 * A photo stays optional. 86% of accounts have none, and a free Bible app
 * should not demand a face. The preview shows the initials circle the feed
 * will use instead, so the choice is visible rather than a blank.
 *
 * Writes first_name and last_name (structured) plus display_name as
 * "First Last", which is the field the feed, comments, notifications, buddies
 * and profile pages already read - so nothing else needed changing and no
 * published activity moved. Degrades to display_name alone if the columns are
 * not there yet (supabase/migrations/20261113_profile_first_last_name.sql).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { MEANINGFUL_ACTION_EVENT, type MeaningfulActionDetail } from "../lib/actionRecorder";
import { COMMUNITY_MILESTONES } from "../lib/communityMilestones";
import type { ActionType } from "../lib/actionTypes";

/**
 * Names this app has written to a profile when it had nothing real to use.
 * Lowercase; compared against the trimmed, lowercased display name.
 */
const PLACEHOLDER_NAMES = new Set([
  "bible buddy user",
  "user",
  "new user",
  "guest",
  "guest user",
  "anonymous",
]);
// Deliberately NOT "bible buddy". The official Bible Buddy account posts the
// Verse of the Day and the weekly poll under that name, and it is its chosen
// name. Listing it here would have the app nagging its own brand account. An
// account with no name at all is caught by the empty check below; the feed
// only *renders* the words "Bible Buddy" for those, it never stores them.

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
  // "Bible Buddy User" was missing here, and it was the single most common
  // placeholder in the database: 325 profiles carried it, 165 of them created
  // after this prompt shipped. Those accounts looked like they had already
  // answered, so they were never asked.
  if (PLACEHOLDER_NAMES.has(lower)) return true;
  return false;
}

/**
 * Is this a name we are willing to publish next to someone's activity?
 *
 * Deliberately permissive about shape and strict only about substance. Names
 * are not US-shaped: "van der Westhuizen", "O'Neill", "Jean-Baptiste",
 * "Nel", single-syllable, non-Latin scripts and multi-part surnames all have
 * to pass. What it rejects is the things that are not a name at all - empty,
 * whitespace only, digits, an email, a URL, or one of our own placeholders.
 */
function validateNamePart(raw: string, label: "first" | "last"): { ok: true; value: string } | { ok: false; error: string } {
  const value = raw.replace(/\s+/g, " ").trim();
  const which = label === "first" ? "first name" : "last name";
  if (!value) return { ok: false, error: `Please enter your ${which}.` };
  if (value.length > 40) return { ok: false, error: `That ${which} is too long.` };
  // At least one letter, in any script.
  if (!/\p{L}/u.test(value)) return { ok: false, error: `Please enter your real ${which}.` };
  if (/\d/.test(value)) return { ok: false, error: `A ${which} should not contain numbers.` };
  if (/[@/\\<>]/.test(value) || /https?:/i.test(value)) {
    return { ok: false, error: `Please enter your ${which}, not an address.` };
  }
  if (PLACEHOLDER_NAMES.has(value.toLowerCase())) {
    return { ok: false, error: `Please enter your real ${which}.` };
  }
  return { ok: true, value };
}

/** Postgres tells us the column is not there; fall back rather than fail. */
function isMissingNameColumn(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === "42703") return true;
  return /column .*(first_name|last_name).* does not exist/i.test(error.message || "");
}

function initialsOf(first: string, last: string): string {
  const a = first.trim().slice(0, 1).toUpperCase();
  const b = last.trim().slice(0, 1).toUpperCase();
  return `${a}${b}` || "?";
}

export default function DisplayNamePromptGate() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Once we've resolved "already has a real name" for this page load, stop
  // re-checking on every subsequent action.
  const resolvedRef = useRef(false);
  const checkingRef = useRef(false);

  const initials = useMemo(() => initialsOf(firstName, lastName), [firstName, lastName]);

  const maybeShow = useCallback(async (actionType?: string) => {
    // Only when their activity is about to become public. Everything else in
    // the app - reading, trivia, notes - goes on uninterrupted.
    if (actionType && !COMMUNITY_MILESTONES.has(actionType as ActionType)) return;
    if (resolvedRef.current || checkingRef.current) return;
    checkingRef.current = true;
    try {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", user.id)
        .maybeSingle();
      // supabase-js returns an error rather than throwing. A dropped read is
      // not "this person has no name" - say nothing and try again next time.
      if (profileError) return;

      const currentName = (profile?.display_name || profile?.username || "").trim();
      if (!isPlaceholderDisplayName(currentName, user.email)) {
        resolvedRef.current = true;
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email || null);
      setExistingPhoto((profile?.profile_image_url as string) || null);
      setPhotoPreview((profile?.profile_image_url as string) || null);
      setFirstName("");
      setLastName("");
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
    function onMeaningfulAction(event: Event) {
      const detail = (event as CustomEvent<MeaningfulActionDetail>).detail;
      void maybeShow(detail?.actionType);
    }
    window.addEventListener(MEANINGFUL_ACTION_EVENT, onMeaningfulAction);
    return () => window.removeEventListener(MEANINGFUL_ACTION_EVENT, onMeaningfulAction);
  }, [maybeShow]);

  async function save() {
    if (saving || !userId) return;
    const first = validateNamePart(firstName, "first");
    if (!first.ok) {
      setError(first.error);
      return;
    }
    const last = validateNamePart(lastName, "last");
    if (!last.ok) {
      setError(last.error);
      return;
    }
    const fullName = `${first.value} ${last.value}`;
    if (isPlaceholderDisplayName(fullName, userEmail)) {
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

      const shared = {
        user_id: userId,
        display_name: fullName,
        username: fullName,
        profile_image_url: imageUrl,
      };
      let { error: profileError } = await supabase
        .from("profile_stats")
        .upsert({ ...shared, first_name: first.value, last_name: last.value }, { onConflict: "user_id" });
      if (isMissingNameColumn(profileError)) {
        // The migration has not been run yet. display_name is what every
        // screen reads, so saving it alone still gets the name onto the feed.
        const retry = await supabase.from("profile_stats").upsert(shared, { onConflict: "user_id" });
        profileError = retry.error;
      }
      if (profileError) throw profileError;

      await supabase.auth.updateUser({
        data: {
          firstName: first.value,
          first_name: first.value,
          lastName: last.value,
          last_name: last.value,
          display_name: fullName,
        },
      });

      try {
        await supabase.from("master_actions").insert({
          user_id: userId,
          action_type: "profile_creation_popup_completed",
          username: fullName,
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
          Add your name
        </h2>
        <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
          Your study activity is about to show up in the community. This is the name
          other members will see next to it.
        </p>

        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First name"
              autoComplete="given-name"
              autoFocus
              className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
            />
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
              className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
            />
          </div>

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
                // The initials circle the feed will use. Showing it means an
                // empty photo reads as a choice rather than something missing.
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-base font-black text-white"
                  aria-hidden="true"
                >
                  {initials.trim() || "?"}
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
              Optional - your initials are used if you skip it, and you can add a photo
              anytime from your profile.
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
