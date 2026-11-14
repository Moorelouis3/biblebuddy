"use client";

/**
 * The one place that decides whether a tutorial or announcement opens
 * (Louis, 2026-11-13). See docs/POPUP_SYSTEM_PROPOSAL.md.
 *
 * ON for everyone since 14 November 2026 (`COORDINATOR_ENABLED` in
 * lib/popups/switch.ts). A popup still only shows if it has a row in
 * popup_settings with enabled = true, so any one of them can be turned off
 * there without a build.
 *
 * What it does when on, once per page load:
 *
 *  1. Reads the switches. No popup on -> stop, having made one small request.
 *  2. Reads this person's history with the popups, and whether they already
 *     use each feature (remembered on the phone once known, so it is asked
 *     once, not on every visit).
 *  3. Once a second, with no network, asks lib/popups/decide.ts whether there
 *     is anything to show on this page right now. Nothing opens until the
 *     page has been still and clear for a few seconds.
 *  4. Asks the database for permission (claim_popup). The database holds the
 *     20-hour and three-a-week limits and answers one request at a time, so
 *     two tabs or two devices cannot both be told yes.
 *  5. Opens the shared shell, and writes down how it ended.
 *
 * It only handles popups in lib/popups/catalog.ts. The older popups
 * (NewGamesPopup, BibleLockPopup, the study popups, the store asks) still run
 * on their own triggers until each is moved into the catalog; they are not
 * yet limited by this.
 *
 * Nothing here writes to master_actions. Seeing or closing a popup is not
 * study activity and must never look like it.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { checkFullAccount } from "../../lib/accountGate";
import { BETA_OPEN } from "../../lib/androidBeta";
import {
  readStoreAsk,
  recordAppStoreTap,
  recordPlayStoreTap,
  silenceAppStoreAsk,
  silencePlayStoreAsk,
  snoozeAppStoreAsk,
  snoozePlayStoreAsk,
} from "../../lib/appStoreAsk";
import { joinCommunityEvent } from "../../lib/communityEventJoin";
import { isAndroid, isIOS, isStandalone } from "../../lib/installEnvironment";
import { isNativeApp } from "../../lib/nativeApp";
import { inSection, POPUP_CATALOG, type PopupDefinition, type PopupDevice } from "../../lib/popups/catalog";
import { coordinatorActive, testDevice } from "../../lib/popups/switch";
import {
  decide,
  nextEligibleAfterClose,
  sameVisit,
  type DecideInput,
  type PopupHistory,
  type PopupSettings,
} from "../../lib/popups/decide";
import { supabase } from "../../lib/supabaseClient";
import FeaturePopup, { type FeaturePopupCloseMethod, type FeaturePopupSignup } from "./FeaturePopup";

/** How long the page must be still and clear before a popup may open. */
const QUIET_MS = 2500;
const TICK_MS = 1000;
/** After tapping a popup's button, leave the person alone on the page they chose. */
const AFTER_CTA_MS = 15_000;

/** Places where a popup is never welcome, whatever is eligible. */
const NEVER_ON = ["/start", "/events", "/login", "/signup", "/reset-password", "/admin", "/moderator-admin", "/onboarding", "/tips"];
/** In the middle of a study day or a puzzle. */
const MID_TASK = [/^\/devotionals\/[^/]+\/day\//, /^\/bible-study-games\/word-search\/[^/]+/, /^\/reading-plans\/[^/]+\/day/];

/**
 * Send a write and do not wait for it.
 *
 * A supabase query is lazy - nothing is sent until it is awaited or .then()
 * is called - so `void supabase.from(...).update(...)` silently does nothing.
 * The first test of this component (2026-11-13) closed a popup, saw no
 * dismissal in the database, and was shown the same popup again.
 */
function send(query: PromiseLike<unknown>) {
  void Promise.resolve(query).then(
    () => {},
    () => {},
  );
}

const visitKey = (userId: string) => `bb:popup-visit:${userId}`;
const usedKey = (userId: string) => `bb:popup-used:${userId}`;
const CTA_KEY = "bb:popup-cta-at";

type Visit = { lastActiveAt: string; shown: boolean };

function readVisit(userId: string, now: Date): Visit {
  try {
    const stored = JSON.parse(window.localStorage.getItem(visitKey(userId)) || "null") as Visit | null;
    if (stored && sameVisit(stored.lastActiveAt, now)) return stored;
  } catch {
    // Unreadable is the same as no visit yet.
  }
  return { lastActiveAt: now.toISOString(), shown: false };
}

function writeVisit(userId: string, visit: Visit) {
  try {
    window.localStorage.setItem(visitKey(userId), JSON.stringify(visit));
  } catch {
    // Without it the database limit still holds.
  }
}

function track(eventName: string, userId: string, popupId: string, extra: Record<string, unknown> = {}) {
  try {
    // Absolute URL: inside the iOS app a relative fetch can hang forever.
    void fetch(`${window.location.origin}/api/landing-analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { promotion_id: popupId, source: "coordinator", ...extra },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never blocks a popup.
  }
}

/** Why this is a bad moment, or null. Local checks only. */
function busyReason(pathname: string | null, blocked: boolean): string | null {
  if (!pathname) return "no page yet";
  if (document.hidden) return "tab not visible";
  if (blocked) return "another dialog";
  if (document.body.style.overflow === "hidden" || document.querySelector('[aria-modal="true"]')) return "another dialog";
  if (NEVER_ON.some((prefix) => pathname.startsWith(prefix))) return "not on this page";
  if (MID_TASK.some((pattern) => pattern.test(pathname))) return "in the middle of a task";
  // A screen can say so itself: <div data-bb-busy="a trivia round">.
  const declared = document.querySelector<HTMLElement>("[data-bb-busy]");
  if (declared) return declared.dataset.bbBusy || "busy";
  const active = document.activeElement as HTMLElement | null;
  if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) return "typing";
  if (Array.from(document.querySelectorAll("audio, video")).some((media) => !(media as HTMLMediaElement).paused)) return "listening";
  try {
    const ctaAt = Number(window.sessionStorage.getItem(CTA_KEY) || 0);
    if (ctaAt && Date.now() - ctaAt < AFTER_CTA_MS) return "just arrived from a popup";
  } catch {}
  return null;
}

/** Which device-only popups could work here. Empty in the app and on a laptop. */
function devicesHere(): Set<PopupDevice> {
  const devices = new Set<PopupDevice>();
  const pretend = testDevice();
  if (pretend) return devices.add(pretend);
  // Already in the real app, or opened from a home-screen shortcut: they have
  // what the ask is offering, or have made their choice.
  if (isNativeApp() || isStandalone()) return devices;
  if (isIOS()) devices.add("ios_web");
  if (isAndroid() && BETA_OPEN) devices.add("android_web");
  return devices;
}

/**
 * The two store asks used to keep their answers on the phone only, in a key
 * the install banners and the blog prompt also read (lib/appStoreAsk.ts). So
 * that those other places keep agreeing with what was answered here, the same
 * key is still written.
 */
const STORE_ASK: Record<string, { store: "ios" | "android"; snooze: () => void; silence: () => void; tap: () => void }> = {
  ask_app_store: { store: "ios", snooze: snoozeAppStoreAsk, silence: silenceAppStoreAsk, tap: recordAppStoreTap },
  ask_android_beta: { store: "android", snooze: snoozePlayStoreAsk, silence: silencePlayStoreAsk, tap: recordPlayStoreTap },
};

type Loaded = Pick<
  DecideInput,
  "settings" | "history" | "usedActions" | "joinedEvents" | "accountCreatedAt" | "lastAutomaticAt" | "automaticInLast7Days"
>;

const HISTORY_COLUMNS =
  "popup_id, content_version, display_count, last_shown_at, dismissed_at, cta_clicked_at, completed_at, never_again, next_eligible_at, automatic";

type HistoryRow = {
  popup_id: string;
  content_version: number | null;
  display_count: number | null;
  last_shown_at: string | null;
  dismissed_at: string | null;
  cta_clicked_at: string | null;
  completed_at: string | null;
  never_again: boolean | null;
  next_eligible_at: string | null;
  automatic: boolean | null;
};

/** Everything decide() needs that lives in the database. Null = show nothing. */
async function load(userId: string): Promise<Loaded | null> {
  const { data: settingRows, error: settingsError } = await supabase
    .from("popup_settings")
    .select("popup_id, enabled, priority, expires_at")
    .eq("enabled", true);
  // A failed read is "show nothing", never "show everything".
  if (settingsError || !settingRows?.length) return null;

  const settings: Record<string, PopupSettings> = {};
  for (const row of settingRows) {
    settings[row.popup_id] = { enabled: true, priority: row.priority ?? undefined, expiresAt: row.expires_at };
  }
  const live = POPUP_CATALOG.filter((popup) => settings[popup.id]);
  if (!live.length) return null;

  const [{ data: sessionData }, { data: rows, error: historyError }] = await Promise.all([
    supabase.auth.getSession(),
    supabase.from("user_popups_seen").select(HISTORY_COLUMNS).eq("user_id", userId).limit(1000),
  ]);
  const accountCreatedAt = sessionData.session?.user.created_at;
  if (historyError || !accountCreatedAt) return null;

  const history: Record<string, PopupHistory> = {};
  let lastAutomaticAt: string | null = null;
  let automaticInLast7Days = 0;
  const weekAgo = Date.now() - 7 * 86_400_000;
  for (const row of (rows || []) as HistoryRow[]) {
    history[row.popup_id] = {
      version: row.content_version ?? 1,
      displayCount: row.display_count ?? 1,
      lastShownAt: row.last_shown_at,
      dismissedAt: row.dismissed_at,
      ctaClickedAt: row.cta_clicked_at,
      completedAt: row.completed_at,
      neverAgain: Boolean(row.never_again),
      nextEligibleAt: row.next_eligible_at,
    };
    if (row.automatic && row.last_shown_at) {
      if (!lastAutomaticAt || row.last_shown_at > lastAutomaticAt) lastAutomaticAt = row.last_shown_at;
      if (Date.parse(row.last_shown_at) > weekAgo) automaticInLast7Days += 1;
    }
  }

  // What this phone already answered about a store ask, copied to the account
  // once. Only where the account has nothing: an existing row is never touched.
  for (const popup of live) {
    const ask = STORE_ASK[popup.id];
    if (!ask || history[popup.id]) continue;
    const remembered = readStoreAsk(ask.store);
    if (remembered.state === "pending") continue;
    const at = new Date(remembered.at || Date.now());
    const past: PopupHistory = {
      version: popup.version,
      displayCount: 1,
      lastShownAt: at.toISOString(),
      dismissedAt: remembered.state === "later" ? at.toISOString() : null,
      ctaClickedAt: remembered.state === "tapped" ? at.toISOString() : null,
      completedAt: null,
      neverAgain: remembered.state === "never",
      nextEligibleAt: remembered.state === "later" ? nextEligibleAfterClose(at) : null,
    };
    history[popup.id] = past;
    send(
      supabase.from("user_popups_seen").upsert(
        {
          user_id: userId,
          popup_id: popup.id,
          has_seen: true,
          seen_at: at.toISOString(),
          updated_at: new Date().toISOString(),
          content_version: popup.version,
          first_shown_at: at.toISOString(),
          last_shown_at: at.toISOString(),
          display_count: 1,
          dismissed_at: past.dismissedAt,
          dismiss_type: past.dismissedAt ? "later" : null,
          cta_clicked_at: past.ctaClickedAt,
          never_again: past.neverAgain,
          next_eligible_at: past.nextEligibleAt,
          // Not a coordinator display, so it does not count toward the limit.
          automatic: false,
        },
        { onConflict: "user_id,popup_id", ignoreDuplicates: true },
      ),
    );
  }

  // "Already uses the feature". Once true it is true for good, so it is kept
  // on the phone and only the still-unknown actions are asked about.
  let known: string[] = [];
  try {
    known = JSON.parse(window.localStorage.getItem(usedKey(userId)) || "[]") as string[];
  } catch {}
  const usedActions = new Set<string>(known);
  const unknown = Array.from(new Set(live.flatMap((popup) => popup.usedWhen))).filter((action) => !usedActions.has(action));
  await Promise.all(
    unknown.map(async (action) => {
      const { data, error } = await supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", action).limit(1);
      // Unsure counts as "uses it": better to stay quiet than teach someone
      // something they do every day.
      if (error || data?.length) usedActions.add(action);
    }),
  );
  try {
    window.localStorage.setItem(usedKey(userId), JSON.stringify(Array.from(usedActions)));
  } catch {}

  // Study sign-ups: which of those studies this person is already in. One
  // small read, and only while such a popup is switched on.
  const eventSlugs = live.flatMap((popup) => (popup.event ? [popup.event.slug] : []));
  const joinedEvents = new Set<string>();
  if (eventSlugs.length) {
    const { data, error } = await supabase.from("community_event_members").select("event_slug").eq("user_id", userId).in("event_slug", eventSlugs);
    // Unsure counts as signed up: never ask a member to join their own study.
    if (error) eventSlugs.forEach((slug) => joinedEvents.add(slug));
    else for (const row of data || []) joinedEvents.add(row.event_slug as string);
  }

  // Seen recently and now using the feature: that is the popup having worked.
  const recently = Date.now() - 7 * 86_400_000;
  for (const popup of live) {
    const past = history[popup.id];
    if (!past || past.completedAt || !past.lastShownAt || Date.parse(past.lastShownAt) < recently) continue;
    if (!popup.usedWhen.some((action) => usedActions.has(action))) continue;
    const now = new Date().toISOString();
    past.completedAt = now;
    send(supabase.from("user_popups_seen").update({ completed_at: now, updated_at: now }).eq("user_id", userId).eq("popup_id", popup.id));
    track("popup_feature_adopted", userId, popup.id);
  }

  return { settings, history, usedActions, joinedEvents, accountCreatedAt, lastAutomaticAt, automaticInLast7Days };
}

export default function PopupCoordinator({
  userId,
  pathname,
  blocked,
}: {
  userId: string;
  pathname: string | null;
  /** AppShell's own modals (install ask, celebrations...) are open. */
  blocked: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<{ popup: PopupDefinition; inSection: boolean } | null>(null);
  /** A study sign-up only: idle until the button, then working, then done. */
  const [signup, setSignup] = useState<FeaturePopupSignup>("idle");
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  /** Kept ready so a tap that leaves the site has nothing left to wait for. */
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  useEffect(() => {
    if (!coordinatorActive()) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      let loaded: Loaded | null = null;
      try {
        loaded = await load(userId);
      } catch {
        loaded = null;
      }
      if (!loaded || cancelled) return;

      let clearSince = 0;
      let lastPath = pathRef.current;
      const devices = devicesHere();

      const tick = async () => {
        if (cancelled) return;
        const now = new Date();
        const path = pathRef.current;
        const busy = busyReason(path, blockedRef.current);

        // The visit is kept alive only while the person is actually here.
        const visit = readVisit(userId, now);
        if (!document.hidden) writeVisit(userId, { ...visit, lastActiveAt: now.toISOString() });

        // A new page starts the quiet wait again.
        if (path !== lastPath) {
          lastPath = path;
          clearSince = 0;
        }

        const decision = decide({
          ...loaded,
          now,
          pathname: path,
          catalog: POPUP_CATALOG,
          devices,
          busy,
          shownThisVisit: visit.shown,
        });

        // These do not change for the rest of this page load.
        if (decision.blockedBy && !decision.blockedBy.startsWith("busy")) return;

        if (!decision.chosen) {
          clearSince = 0;
          timer = setTimeout(tick, TICK_MS);
          return;
        }
        if (!clearSince) clearSince = Date.now();
        if (Date.now() - clearSince < QUIET_MS) {
          timer = setTimeout(tick, TICK_MS);
          return;
        }

        // Ask the database. It is the only thing that can say yes.
        const popup = decision.chosen;
        const { data: granted, error } = await supabase.rpc("claim_popup", { p_popup_id: popup.id, p_version: popup.version });
        if (cancelled || error || granted !== true) return;
        // Another tab may have shown one while we were asking.
        if (readVisit(userId, new Date()).shown) return;

        tokenRef.current = (await supabase.auth.getSession()).data.session?.access_token ?? null;
        if (cancelled) return;
        writeVisit(userId, { lastActiveAt: new Date().toISOString(), shown: true });
        setOpen({ popup, inSection: inSection(popup, pathRef.current) });
        track("popup_shown", userId, popup.id, { version: popup.version, page: pathRef.current });
      };

      timer = setTimeout(tick, TICK_MS);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  const close = useCallback(
    (method: FeaturePopupCloseMethod) => {
      if (!open) return;
      // Signed up, then closed: that is not a dismissal, and it is already
      // written down as done.
      if (signup === "done") {
        setOpen(null);
        return;
      }
      // Mid sign-up: let it finish rather than record a "no" beside a "yes".
      if (signup === "working") return;
      const now = new Date();
      send(
          supabase
            .from("user_popups_seen")
          .update({
            dismissed_at: now.toISOString(),
            dismiss_type: method,
            never_again: method === "never",
            next_eligible_at: method === "never" ? null : nextEligibleAfterClose(now),
            updated_at: now.toISOString(),
          })
          .eq("user_id", userId)
          .eq("popup_id", open.popup.id),
        );
      const ask = STORE_ASK[open.popup.id];
      if (ask) (method === "never" ? ask.silence : ask.snooze)();
      track("popup_dismissed", userId, open.popup.id, { method });
      setOpen(null);
    },
    [open, signup, userId],
  );

  const act = useCallback(() => {
    if (!open) return;
    if (open.popup.event && signup !== "idle") return;
    const now = new Date().toISOString();
    const patch = { cta_clicked_at: now, updated_at: now };
    STORE_ASK[open.popup.id]?.tap();
    track("popup_cta_clicked", userId, open.popup.id, { in_section: open.inSection });

    // A study sign-up: the button registers the person, here, with the same
    // joinCommunityEvent() the study's page uses (it writes nothing twice).
    // The tap and the registration are separate events on purpose: a tap that
    // did not end in a saved row must not be counted as a sign-up.
    if (open.popup.event) {
      const popupId = open.popup.id;
      const slug = open.popup.event.slug;
      setSignup("working");
      send(supabase.from("user_popups_seen").update(patch).eq("user_id", userId).eq("popup_id", popupId));
      const finishOnPage = (query: string) => {
        try {
          window.sessionStorage.setItem(CTA_KEY, String(Date.now()));
        } catch {}
        setOpen(null);
        setSignup("idle");
        router.push(`/events/${slug}?${query}`);
      };
      void (async () => {
        // Joining a study needs a name, an email and a photo, and the study's
        // page is where that step lives. Somebody missing one is taken there
        // with the sign-up already under way, so the intent is not lost.
        const account = await checkFullAccount();
        if (!account.ok) {
          finishOnPage("join=1&src=popup");
          return;
        }
        const result = await joinCommunityEvent(userId, slug, { source: "popup" });
        if (!result.ok) {
          track("popup_registration_failed", userId, popupId, { event: slug, error: result.error });
          finishOnPage("src=popup");
          return;
        }
        const done = new Date().toISOString();
        send(supabase.from("user_popups_seen").update({ completed_at: done, updated_at: done }).eq("user_id", userId).eq("popup_id", popupId));
        if (!result.alreadyJoined) {
          track("popup_registration_completed", userId, popupId, { event: slug });
          track("community_event_joined", userId, popupId, { event: slug, via: "popup" });
        }
        setSignup("done");
      })();
      return;
    }

    if (open.popup.cta.external) {
      // The link itself does the navigating (it is a real <a>). The page is
      // about to be left, so the write has to be one the browser finishes on
      // its own: an ordinary request would be dropped with the page.
      const token = tokenRef.current;
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (token && url && key) {
        const where = `user_id=eq.${encodeURIComponent(userId)}&popup_id=eq.${encodeURIComponent(open.popup.id)}`;
        try {
          void fetch(`${url}/rest/v1/user_popups_seen?${where}`, {
            method: "PATCH",
            keepalive: true,
            headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${token}`, Prefer: "return=minimal" },
            body: JSON.stringify(patch),
          }).catch(() => {});
        } catch {}
      }
      setOpen(null);
      return;
    }

    send(supabase.from("user_popups_seen").update(patch).eq("user_id", userId).eq("popup_id", open.popup.id));
    const href = open.inSection ? null : open.popup.cta.href;
    setOpen(null);
    if (href) {
      try {
        window.sessionStorage.setItem(CTA_KEY, String(Date.now()));
      } catch {}
      router.push(href);
    }
  }, [open, router, signup, userId]);

  /** "See the study page", after a sign-up. */
  const seeStudy = useCallback(() => {
    const slug = open?.popup.event?.slug;
    setOpen(null);
    if (!slug) return;
    try {
      window.sessionStorage.setItem(CTA_KEY, String(Date.now()));
    } catch {}
    router.push(`/events/${slug}`);
  }, [open, router]);

  if (!open) return null;
  return (
    <FeaturePopup
      key={open.popup.id}
      popup={open.popup}
      inSection={open.inSection}
      onClose={close}
      onCta={act}
      signup={signup}
      onDone={seeStudy}
    />
  );
}
