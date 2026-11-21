"use client";

/**
 * Mandatory profile completion - the ONE gate (Louis, 2026-11-19, priority
 * High: "This is a required rule"). Every signed-in member has a first name,
 * a last name and a profile picture before they can use the app.
 *
 * History, so nobody rebuilds a fourth one of these:
 *  - 2026-09-04 AccountRequiredModal / useAccountGate: asks only when someone
 *    posts or joins, and has a close button.
 *  - AppShell's own "full name" modal: its check had been reduced to always
 *    setShowFullNameModal(false) and was never called. Removed 2026-11-19.
 *  - 2026-09-21 / 2026-11-13 DisplayNamePromptGate (this file's previous
 *    name): opened only after a community-milestone action, once per page
 *    load, never checked again after one miss, photo optional.
 * None of them ran on arrival, so a member who never posted was never asked.
 * The old prompts stay as in-context fallbacks, but they now share the same
 * rule (lib/profileCompleteness.ts) and are effectively never reached.
 *
 * How this one holds:
 *  - It wraps the page content inside AppShell. On any signed-in, non-public
 *    path it checks profile_stats; when incomplete it does not render the
 *    page at all, and draws a full-screen step above the shell chrome with no
 *    close button. Refreshing or deep-linking lands on the same check.
 *  - It re-checks on every sign-in and user change, not "once per load".
 *  - A failed read (supabase-js returns {data:null,error}) is "unknown", not
 *    "incomplete": the member sees a retry, and someone already known to be
 *    complete on this device is let through instead of locked out.
 *  - Saving goes through /api/profile/complete, which re-validates all three
 *    fields server-side. The picture is uploaded to the existing avatars
 *    bucket, same path as the profile editor.
 *  - Public pages (lib/publicRoutes.ts), auth, logout, support and account
 *    deletion are never gated; the step itself links to log out, support and
 *    deletion.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { isPublicPath } from "../lib/publicRoutes";
import {
  PROFILE_COMPLETION_COPY,
  evaluateProfile,
  isProfileGateExemptPath,
  validateFullName,
} from "../lib/profileCompleteness";

type GateState = "pass" | "checking" | "incomplete" | "error";

const CACHE_PREFIX = "bb:profile-complete:v1:";
export const PROFILE_GATE_EVENT = "bb:profile-gate";
const MAX_PHOTO_BYTES = 15 * 1024 * 1024;

// useLayoutEffect warns on the server; this is a client component that still
// renders there.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let blockingNow = false;
function announce(blocking: boolean) {
  if (blockingNow === blocking) return;
  blockingNow = blocking;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PROFILE_GATE_EVENT, { detail: { blocking } }));
  }
}

/** For AppShell: hold every popup back while the gate is up. */
export function useProfileGateBlocking(): boolean {
  const [blocking, setBlocking] = useState(false);
  useEffect(() => {
    setBlocking(blockingNow);
    const onChange = (event: Event) => setBlocking(Boolean((event as CustomEvent<{ blocking?: boolean }>).detail?.blocking));
    window.addEventListener(PROFILE_GATE_EVENT, onChange);
    return () => window.removeEventListener(PROFILE_GATE_EVENT, onChange);
  }, []);
  return blocking;
}

function readCache(userId: string): boolean {
  try {
    return window.localStorage.getItem(CACHE_PREFIX + userId) === "1";
  } catch {
    return false;
  }
}

function writeCache(userId: string, complete: boolean) {
  try {
    if (complete) window.localStorage.setItem(CACHE_PREFIX + userId, "1");
    else window.localStorage.removeItem(CACHE_PREFIX + userId);
  } catch {
    // Storage can be blocked; the gate still works, it just checks first.
  }
}

/** AbortSignal.timeout is missing on older iOS WebKit. */
function timeoutSignal(ms: number): AbortSignal {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) return AbortSignal.timeout(ms);
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

function metaString(meta: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = meta[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export default function ProfileCompletionGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const exempt = isProfileGateExemptPath(pathname, isPublicPath);

  const [session, setSession] = useState<{ userId: string; email: string | null; meta: Record<string, unknown> } | null>(null);
  const [state, setState] = useState<GateState>("pass");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkSeq = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Who is signed in. getSession is local (no network); onAuthStateChange
  // catches web sign-in, native Apple/Google (signInWithIdToken) and logout.
  useEffect(() => {
    let alive = true;
    const apply = (user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null | undefined) => {
      if (!alive) return;
      setSession((prev) => {
        if (!user) return null;
        if (prev && prev.userId === user.id && prev.email === (user.email || null)) return prev;
        return { userId: user.id, email: user.email || null, meta: user.user_metadata || {} };
      });
    };
    void supabase.auth.getSession().then(({ data }) => apply(data?.session?.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => apply(nextSession?.user));
    return () => {
      alive = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  const check = useCallback(async (userId: string, email: string | null, meta: Record<string, unknown>) => {
    const seq = ++checkSeq.current;
    const cachedComplete = readCache(userId);
    setState(cachedComplete ? "pass" : "checking");

    const { data, error: readError } = await supabase
      .from("profile_stats")
      .select("display_name, username, profile_image_url")
      .eq("user_id", userId)
      .abortSignal(timeoutSignal(12000))
      .maybeSingle()
      .then(
        (result) => result,
        (thrown: unknown) => ({ data: null, error: thrown as { message?: string } }),
      );
    if (seq !== checkSeq.current) return;

    if (readError) {
      // Unknown, not incomplete. Known-complete on this device: let them in.
      setState(cachedComplete ? "pass" : "error");
      return;
    }

    const result = evaluateProfile(data, email);
    writeCache(userId, result.complete);
    if (result.complete) {
      setState("pass");
      return;
    }

    // Prefill from what we have, then from what Apple/Google sent at sign-in.
    // Apple only sends a name on the very first authorisation and lets people
    // hide it, so this is often empty - the member types it once.
    setFirstName(result.firstName || metaString(meta, "given_name", "first_name", "firstName"));
    setLastName(result.lastName || metaString(meta, "family_name", "last_name", "lastName"));
    setExistingPhoto(result.profileImageUrl);
    setPhotoPreview(result.profileImageUrl);
    setPhotoFile(null);
    setError(null);
    setState("incomplete");
  }, []);

  // Before paint on the client, so a known-incomplete or unknown profile never
  // flashes the page it deep-linked to.
  useIsoLayoutEffect(() => {
    if (exempt || !session) {
      setState("pass");
      return;
    }
    if (state === "incomplete" || state === "error") return; // already holding
    setState(readCache(session.userId) ? "pass" : "checking");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exempt, session?.userId]);

  useEffect(() => {
    if (exempt || !session) return;
    void check(session.userId, session.email, session.meta);
    // Re-check per user, not per navigation: the gate is in the layout and
    // persists across pages, and an incomplete state stays put until saved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.userId, exempt ? "exempt" : "gated", check]);

  const blocking = !exempt && Boolean(session) && state !== "pass";
  useEffect(() => {
    announce(blocking);
  }, [blocking]);
  useEffect(() => () => announce(false), []);

  // While held, the page under the step must not scroll behind it.
  useEffect(() => {
    if (!blocking || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [blocking]);

  const initials = useMemo(
    () => `${firstName.trim().slice(0, 1)}${lastName.trim().slice(0, 1)}`.toUpperCase() || "?",
    [firstName, lastName],
  );

  async function save() {
    if (saving || !session) return;
    const name = validateFullName(firstName, lastName, session.email);
    if (!name.ok) {
      setError(name.error);
      return;
    }
    if (!photoFile && !existingPhoto) {
      setError("Please choose a profile picture. It can be any image you like.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      let imageUrl = existingPhoto;
      if (photoFile) {
        // Same bucket and path as the profile editor and the old prompts.
        const ext = (photoFile.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${session.userId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, photoFile, { upsert: true, contentType: photoFile.type || undefined });
        if (uploadError) throw new Error("Your picture could not be uploaded. Please try again or choose another image.");
        // The path is reused on every change, so version the URL or phones
        // keep showing the old picture from cache.
        imageUrl = `${supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl}?v=${Date.now()}`;
      }

      const { data: authData } = await supabase.auth.getSession();
      const token = authData?.session?.access_token;
      if (!token) throw new Error("Your session has ended. Please log in again.");

      // Absolute URL: a relative fetch can hang forever under CapacitorHttp.
      const response = await fetch(`${window.location.origin}/api/profile/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firstName: name.firstName, lastName: name.lastName, profileImageUrl: imageUrl }),
        signal: timeoutSignal(20000),
      });
      const payload = (await response.json().catch(() => ({}))) as { complete?: boolean; error?: string };
      if (!response.ok || !payload.complete) {
        throw new Error(payload.error || "Could not save your profile. Please try again.");
      }

      // The browser client caches the session's metadata; pick up the new name.
      void supabase.auth.refreshSession().catch(() => undefined);
      writeCache(session.userId, true);
      setState("pass");
    } catch (saveError) {
      const message =
        saveError instanceof Error && saveError.name !== "AbortError" && saveError.name !== "TimeoutError"
          ? saveError.message
          : "The connection timed out. Please try again.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function logOut() {
    try {
      await supabase.auth.signOut();
    } finally {
      window.location.assign("/login");
    }
  }

  const step = blocking && mounted
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bb-profile-gate-title"
          className="fixed inset-0 overflow-y-auto bg-[var(--bb-page-bg,#f4f8ff)]"
          style={{
            zIndex: 10000,
            paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-6">
            {state === "checking" ? (
              <div className="flex flex-col items-center gap-3 py-24 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#0056FD]/20 border-t-[#0056FD]" aria-hidden="true" />
                Loading your profile...
              </div>
            ) : state === "error" ? (
              <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-white p-5 text-left shadow-xl">
                <h2 id="bb-profile-gate-title" className="text-xl font-black text-[var(--bb-text-primary,#111827)]">
                  We could not load your profile
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                  Check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={() => session && void check(session.userId, session.email, session.meta)}
                  className="mt-4 w-full rounded-2xl px-5 py-3 text-sm font-black"
                  style={{ backgroundColor: "var(--bb-cv-primary-bg, #0056FD)", color: "var(--bb-cv-primary-text, #ffffff)" }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-white p-5 text-left shadow-xl">
                <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--bb-cv-link, #0056FD)" }}>
                  Complete your profile
                </p>
                <h2 id="bb-profile-gate-title" className="mt-2 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                  Welcome to the community
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                  {PROFILE_COMPLETION_COPY}
                </p>

                <div className="mt-5 grid gap-4">
                  <label className="flex cursor-pointer flex-col items-center gap-2">
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoPreview}
                        alt="Your profile picture"
                        className="h-24 w-24 rounded-full border border-[var(--bb-card-border,#dbe7f4)] object-cover"
                      />
                    ) : (
                      <span
                        className="grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-[#0056FD]/40 bg-[#0056FD]/5 text-2xl font-black"
                        style={{ color: "var(--bb-cv-link, #0056FD)" }}
                        aria-hidden="true"
                      >
                        {initials}
                      </span>
                    )}
                    <span className="text-sm font-black" style={{ color: "var(--bb-cv-link, #0056FD)" }}>
                      {photoPreview ? "Change picture" : "Choose a profile picture"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        event.target.value = "";
                        if (!file) return;
                        if (file.type && !file.type.startsWith("image/")) {
                          setError("Please choose an image file.");
                          return;
                        }
                        if (file.size > MAX_PHOTO_BYTES) {
                          setError("That image is too large. Please choose one under 15 MB.");
                          return;
                        }
                        setError(null);
                        setPhotoFile(file);
                        setPhotoPreview(URL.createObjectURL(file));
                      }}
                    />
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="First name"
                      aria-label="First name"
                      autoComplete="given-name"
                      className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-base font-semibold outline-none focus:border-[#0056FD]"
                    />
                    <input
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Last name"
                      aria-label="Last name"
                      autoComplete="family-name"
                      className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-base font-semibold outline-none focus:border-[#0056FD]"
                    />
                  </div>

                  {error ? (
                    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => void save()}
                    disabled={saving}
                    className="rounded-2xl px-5 py-3 text-sm font-black disabled:cursor-wait disabled:opacity-70"
                    style={{ backgroundColor: "var(--bb-cv-primary-bg, #0056FD)", color: "var(--bb-cv-primary-text, #ffffff)" }}
                  >
                    {saving ? "Saving..." : "Save & continue"}
                  </button>
                </div>
              </div>
            )}

            {state !== "checking" ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">
                <button type="button" onClick={() => void logOut()} className="underline">
                  Log out
                </button>
                <a href="/contact" className="underline" style={{ color: "inherit" }}>
                  Need help?
                </a>
                <a href="/delete-account" className="underline" style={{ color: "inherit" }}>
                  Delete account
                </a>
              </div>
            ) : null}
          </div>
        </div>,
        document.body,
      )
    : null;

  // Checking: the page stays mounted (it was server-rendered and hydrating)
  // but sits under an opaque cover. Incomplete or unknown: it is not rendered.
  const hidePage = blocking && state !== "checking";
  return (
    <>
      {hidePage ? null : children}
      {step}
    </>
  );
}
