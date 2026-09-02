"use client";

/**
 * The app's bottom tab bar.
 *
 * Bible Buddy TV, the games and the invite page all existed and worked but
 * nothing linked to them - the only navigation was a "Navigation" dropdown in
 * the header, and it listed five of them at most. This is the way in.
 *
 * Six tabs, per Louis (2026-09-02): Home, Bible, Plans, Games, Group, More.
 * Everything else lives behind More rather than crowding the bar on a phone.
 */

import Link from "next/link";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Tab = {
  label: string;
  href: string;
  icon: string;
  /** A tab lights up for any page underneath it, not just its own href. */
  prefixes: string[];
};

const TABS: Tab[] = [
  { label: "Home", href: "/dashboard", icon: "🏠", prefixes: ["/dashboard"] },
  { label: "Bible", href: "/reading", icon: "📖", prefixes: ["/reading", "/Bible", "/bible-study-notes"] },
  {
    label: "Plans",
    href: "/plans",
    icon: "🗓️",
    prefixes: ["/plans", "/plan", "/devotionals", "/guided-studies", "/bible-studies", "/reading-plans"],
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
  { label: "Invite a Buddy", href: "/ambassador", icon: "💌" },
  { label: "BB Chat", href: "/chat", icon: "💬" },
  { label: "Notes", href: "/notes", icon: "📝" },
];

function isActive(pathname: string | null, tab: Tab) {
  if (!pathname) return false;
  return tab.prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // A tap that navigates should not leave the sheet hanging open behind it.
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const moreIsActive = MORE_LINKS.some((link) => pathname === link.href.split("?")[0]);

  return (
    <>
      {moreOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />
          {/* The sheet scrolls itself. Without max-height + overflow, a long
              menu ran under the tab bar and swiping scrolled the page behind
              it instead, so Notes could never be reached. overscroll-contain
              keeps the swipe inside the sheet. */}
          <div className="fixed inset-x-0 bottom-[60px] z-50 mx-auto max-h-[min(60vh,480px)] max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,0.18)]">
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

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-3xl items-stretch">
          {TABS.map((tab) => {
            const active = isActive(pathname, tab);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[60px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-black ${
                  active ? "text-[var(--bb-accent,#2f7fe8)]" : "text-[var(--bb-text-muted,#6b7280)]"
                }`}
              >
                <span className="text-lg leading-none" aria-hidden="true">
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
            className={`flex min-h-[60px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-black ${
              moreOpen || moreIsActive ? "text-[var(--bb-accent,#2f7fe8)]" : "text-[var(--bb-text-muted,#6b7280)]"
            }`}
          >
            <span className="text-lg leading-none" aria-hidden="true">
              ☰
            </span>
            More
          </button>
        </div>
      </nav>
    </>
  );
}
