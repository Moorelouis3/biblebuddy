"use client";

/**
 * The app's bottom navigation - a floating pill (Louis, 2026-10-13).
 *
 * Bible Buddy TV, the games and the invite page all existed and worked but
 * nothing linked to them - the only navigation was a "Navigation" dropdown in
 * the header, and it listed five of them at most. This is the way in.
 *
 * Six tabs, per Louis (2026-09-02): Home, Bible, Plans, Games, Group, More.
 * Everything else lives behind More rather than crowding the bar on a phone.
 *
 * It was a full-width rectangle welded to the bottom edge until 2026-10-13.
 * Now it is one capsule with air around it, the page visible past its sides,
 * and a pale blue lozenge behind whichever tab you are on.
 *
 * It also gets out of the way while you read: scrolling down slides it off,
 * and it comes back a quarter of a second after you stop, or instantly if you
 * scroll back up. The things that make that feel wrong rather than helpful -
 * flickering on tiny movements, reacting to iOS's rubber-band bounce, the page
 * jumping as it goes - are each handled below.
 */

import Link from "next/link";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  href: string;
  icon: string;
  /** A tab lights up for any page underneath it, not just its own href. */
  prefixes: string[];
};

const TABS: Tab[] = [
  { label: "Home", href: "/dashboard", icon: "🏠", prefixes: ["/dashboard"] },
  { label: "Bible", href: "/reading", icon: "📖", prefixes: ["/reading", "/bible", "/bible-study-notes"] },
  // Plans became Library on 2026-10-16. Same slot, same six tabs - the old
  // prefixes stay so a bookmark, notification or deep link into any of them
  // still lights this tab up while it redirects.
  {
    label: "Library",
    href: "/library",
    icon: "📚",
    prefixes: ["/library", "/plans", "/plan", "/devotionals", "/guided-studies", "/bible-studies", "/reading-plans"],
  },
  {
    label: "Games",
    href: "/bible-study-games",
    icon: "🎮",
    prefixes: ["/bible-study-games", "/bible-trivia"],
  },
  // Straight to the group page. The old /dashboard?view=group deep link only
  // worked through the old dashboard's slide logic, which the plan view
  // suppresses - so it silently landed people on their plan instead.
  {
    label: "Group",
    href: `/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`,
    icon: "👥",
    prefixes: ["/study-groups"],
  },
];

const MORE_LINKS: Array<{ label: string; href: string; icon: string }> = [
  // Bible Buddy TV pulled from the UI 2026-09-02 - too buggy for now. The
  // routes still exist; it just has no doors until it is fixed.
  // Settings last used to be reachable only through the dashboard's own tab
  // strip, which switches slides inside one page. Louis found that it bounced
  // him back to the dashboard every time, so account deletion - the thing App
  // Review specifically checks for - had no dependable way in. /settings is a
  // real route and always works.
  { label: "Settings", href: "/settings", icon: "⚙️" },
  { label: "Invite a Buddy", href: "/ambassador", icon: "💌" },
  { label: "BB Chat", href: "/chat", icon: "💬" },
  { label: "Notes", href: "/notes", icon: "📝" },
];

/** Below this, a movement is a twitch or a bounce, not a scroll. */
const SCROLL_THRESHOLD_PX = 10;
/** How long after the last scroll event the pill comes back. */
const RESTORE_DELAY_MS = 250;

function isActive(pathname: string | null, tab: Tab) {
  if (!pathname) return false;
  return tab.prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Hide while scrolling down, restore shortly after it stops.
 *
 * Listening on document in the CAPTURE phase is what makes this work on every
 * page rather than only the ones that scroll the window: scroll events do not
 * bubble, but they do capture, so a scrolling div inside a page is heard here
 * too. The last position is remembered per element, because two scrollers have
 * nothing to do with each other.
 */
function useHideOnScroll(pathname: string | null) {
  const [hidden, setHidden] = useState(false);
  const positions = useRef(new WeakMap<EventTarget, number>());
  const restoreTimer = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  const clearRestore = useCallback(() => {
    if (restoreTimer.current !== null) {
      window.clearTimeout(restoreTimer.current);
      restoreTimer.current = null;
    }
  }, []);

  useEffect(() => {
    function onScroll(event: Event) {
      const target = event.target;
      if (!target) return;

      // One read and one decision per frame, however many events arrive.
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;

        const element =
          target === document || target === document.documentElement
            ? document.scrollingElement ?? document.documentElement
            : (target as HTMLElement);
        const top = element === document.scrollingElement ? window.scrollY : element.scrollTop;
        const max = element.scrollHeight - element.clientHeight;

        // iOS lets you drag past both ends. Those positions are not scrolling
        // and reacting to them is what makes a bar flicker at the edges.
        if (top < 0 || top > max) return;

        const previous = positions.current.get(target) ?? top;
        const delta = top - previous;

        if (Math.abs(delta) < SCROLL_THRESHOLD_PX) return;
        positions.current.set(target, top);

        clearRestore();
        // Up, or back near the top: show it immediately.
        if (delta < 0 || top < 24) {
          setHidden((was) => (was ? false : was));
        } else {
          setHidden((was) => (was ? was : true));
        }

        restoreTimer.current = window.setTimeout(() => {
          setHidden((was) => (was ? false : was));
        }, RESTORE_DELAY_MS);
      });
    }

    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      clearRestore();
    };
  }, [clearRestore]);

  // A new page starts with the navigation on screen. Adjusted during render
  // rather than in an effect: React re-runs this component immediately with
  // the corrected value and never paints the stale one, which is what an
  // effect would do a frame later.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (hidden) setHidden(false);
  }

  // Cancelling the pending restore touches a ref, which belongs in an effect
  // rather than in the render pass above.
  useEffect(() => {
    clearRestore();
  }, [pathname, clearRestore]);

  return hidden;
}

/**
 * True while the on-screen keyboard is up.
 *
 * visualViewport shrinks when the keyboard opens; window.innerHeight does not.
 * The pill has to get out of the way because it would otherwise sit on top of
 * whatever field is being typed into.
 */
function useKeyboardOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const check = () => setOpen(window.innerHeight - viewport.height > 150);
    check();
    viewport.addEventListener("resize", check);
    return () => viewport.removeEventListener("resize", check);
  }, []);

  return open;
}

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const scrolledAway = useHideOnScroll(pathname);
  const keyboardOpen = useKeyboardOpen();

  // The menu being open outranks everything: you cannot have a sheet anchored
  // to a bar that has slid off the screen.
  const hidden = !moreOpen && (scrolledAway || keyboardOpen);

  // Publish the bar's real height (safe area included) as --bb-bottom-nav-h,
  // so anything pinned to the bottom of a page - like the group comment box -
  // can sit on top of the bar instead of underneath it (Louis, 2026-09-17).
  // Deliberately NOT recomputed while it is hidden: the reserved space has to
  // stay constant or the page would jump every time it slides away.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const root = document.documentElement;
    const publish = () => {
      if (nav.dataset.hidden === "true") return;
      root.style.setProperty("--bb-bottom-nav-h", `${Math.ceil(nav.getBoundingClientRect().height)}px`);
    };
    publish();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(publish);
    observer?.observe(nav);
    return () => {
      observer?.disconnect();
      root.style.setProperty("--bb-bottom-nav-h", "0px");
    };
  }, []);

  // A tap that navigates should not leave the sheet hanging open behind it.
  const [moreLastPath, setMoreLastPath] = useState(pathname);
  if (pathname !== moreLastPath) {
    setMoreLastPath(pathname);
    if (moreOpen) setMoreOpen(false);
  }

  const moreIsActive = MORE_LINKS.some((link) => pathname === link.href.split("?")[0]);

  return (
    <>
      {moreOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-[29] bg-black/40"
          />
          {/* The sheet scrolls itself. Without max-height + overflow, a long
              menu ran under the tab bar and swiping scrolled the page behind
              it instead, so Notes could never be reached. overscroll-contain
              keeps the swipe inside the sheet. */}
          <div className="fixed inset-x-3 bottom-[calc(84px+env(safe-area-inset-bottom,0px))] z-[31] mx-auto max-h-[min(60vh,480px)] max-w-md overflow-y-auto overscroll-contain rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-[0_18px_44px_rgba(15,23,42,0.22)]">
            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // Closing on pathname change misses query-only navigations -
                // close on the tap itself.
                onClick={() => setMoreOpen(false)}
                className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-black text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {/* z-30: above page content, below every popup. At z-50 it was drawn
          after (so on top of) the pages' z-40/z-50 popups and covered their
          bottom buttons, e.g. Post to Group (Louis, 2026-09-17).

          The wrapper is what moves. It is the full width of the screen and
          has no background of its own, so the page shows through either side
          of the capsule, and because it only ever transforms, nothing it does
          can change the height of the page underneath it. */}
      <nav
        ref={navRef}
        aria-label="Main"
        aria-hidden={hidden || undefined}
        data-hidden={hidden ? "true" : "false"}
        className={`bb-bottom-pill fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(10px,env(safe-area-inset-bottom,0px))] ${
          hidden ? "pointer-events-none translate-y-[140%] opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-md items-stretch gap-0.5 rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-1.5 py-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.14)]">
          {TABS.map((tab) => {
            const active = isActive(pathname, tab);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                tabIndex={hidden ? -1 : undefined}
                className={`flex min-h-[46px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-0.5 text-[9.5px] font-black leading-none transition-colors ${
                  active
                    ? "bg-[#E8F0FE] text-[var(--bb-accent,#2f7fe8)]"
                    : "text-[var(--bb-text-muted,#6b7280)]"
                }`}
              >
                <span className="text-[17px] leading-none" aria-hidden="true">
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-expanded={moreOpen}
            tabIndex={hidden ? -1 : undefined}
            className={`flex min-h-[46px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-0.5 text-[9.5px] font-black leading-none transition-colors ${
              moreOpen || moreIsActive
                ? "bg-[#E8F0FE] text-[var(--bb-accent,#2f7fe8)]"
                : "text-[var(--bb-text-muted,#6b7280)]"
            }`}
          >
            <span className="text-[17px] leading-none" aria-hidden="true">
              ☰
            </span>
            More
          </button>
        </div>
      </nav>

      <style>{`
        .bb-bottom-pill {
          transition: transform 220ms ease, opacity 180ms ease;
          will-change: transform;
        }
        /* Someone who has asked their phone to stop animating things gets a
           bar that is simply there or simply not. */
        @media (prefers-reduced-motion: reduce) {
          .bb-bottom-pill { transition: none; }
        }
      `}</style>
    </>
  );
}
