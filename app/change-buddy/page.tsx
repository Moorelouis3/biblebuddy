"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LouisAvatar } from "../../components/LouisAvatar";
import {
  BUDDY_AVATARS,
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  normalizeBuddyAvatarId,
  type BuddyAvatar,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { supabase } from "../../lib/supabaseClient";

function orderBuddies(currentBuddyId: BuddyAvatarId) {
  const current = BUDDY_AVATARS.find((buddy) => buddy.id === currentBuddyId) ?? BUDDY_AVATARS[0];
  return [current, ...BUDDY_AVATARS.filter((buddy) => buddy.id !== current.id)];
}

function getBuddyMood(buddy: BuddyAvatar, currentBuddyId: BuddyAvatarId) {
  if (buddy.id !== "louis") return "peace";
  return currentBuddyId === "louis" ? "peace" : "wave";
}

export default function ChangeBuddyPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(DEFAULT_BUDDY_AVATAR);
  const [activeIndex, setActiveIndex] = useState(0);
  const [savingBuddy, setSavingBuddy] = useState<BuddyAvatarId | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const buddies = useMemo(() => orderBuddies(selectedBuddy), [selectedBuddy]);
  const activeBuddy = buddies[activeIndex] ?? buddies[0];

  useEffect(() => {
    let cancelled = false;

    async function loadBuddyState() {
      try {
        const { data: authData } = await supabase.auth.getUser();
        const user = authData.user;
        if (!user) return;

        if (!cancelled) setUserId(user.id);

        const { data } = await supabase
          .from("profile_stats")
          .select("selected_buddy_avatar")
          .eq("user_id", user.id)
          .maybeSingle();

        const savedBuddy = data?.selected_buddy_avatar
          ? normalizeBuddyAvatarId(data.selected_buddy_avatar)
          : typeof window !== "undefined"
            ? normalizeBuddyAvatarId(window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY))
            : DEFAULT_BUDDY_AVATAR;

        if (!cancelled) {
          setSelectedBuddy(savedBuddy);
          setActiveIndex(0);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, savedBuddy);
            window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed"));
          }
        }
      } catch (error) {
        console.error("[CHANGE_BUDDY] Could not load buddy selection:", error);
      }
    }

    void loadBuddyState();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const activeCard = node.querySelector<HTMLElement>(`[data-buddy-card-index="${activeIndex}"]`);
    activeCard?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex, buddies]);

  async function chooseBuddy(buddy: BuddyAvatar) {
    if (buddy.id === selectedBuddy || savingBuddy) return;

    setSavingBuddy(buddy.id);
    setMessage(null);
    setSelectedBuddy(buddy.id);
    setActiveIndex(0);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddy.id);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed"));
    }

    try {
      if (!userId) throw new Error("No user session found.");
      const { error } = await supabase
        .from("profile_stats")
        .update({ selected_buddy_avatar: buddy.id })
        .eq("user_id", userId);

      if (error) throw error;
      setMessage(`${buddy.name} is your Buddy now.`);
    } catch (error) {
      console.error("[CHANGE_BUDDY] Could not save selected buddy:", error);
      setMessage(`${buddy.name} is selected on this device.`);
    } finally {
      setSavingBuddy(null);
    }
  }

  function moveCard(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + buddies.length) % buddies.length);
  }

  return (
    <main className="min-h-screen px-4 py-5 text-[var(--bb-text-primary,#2b0707)]">
      <div className="mx-auto max-w-[760px]">
        <section className="relative overflow-hidden rounded-[32px] border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-card,#ffffff)] px-4 pb-6 pt-5 text-center shadow-[0_18px_50px_rgba(127,29,29,0.12)] sm:px-6">
          <Link
            href="/dashboard"
            aria-label="Close Change Buddy"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-card,#ffffff)] text-xl font-black text-[var(--bb-text-secondary,#8a1c1c)] shadow-sm transition hover:brightness-95"
          >
            x
          </Link>

          <div className="mx-auto max-w-sm">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--bb-accent,#dc2626)]">Change Buddy</p>
            <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Pick your guide</h1>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => moveCard(-1)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-accent-soft,#fee2e2)] text-lg font-black text-[var(--bb-accent,#dc2626)] shadow-sm transition active:scale-95"
              aria-label="Previous Buddy"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="flex w-full max-w-[430px] snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(event) => {
                const container = event.currentTarget;
                const width = container.clientWidth || 1;
                const nextIndex = Math.round(container.scrollLeft / width);
                if (nextIndex >= 0 && nextIndex < buddies.length) setActiveIndex(nextIndex);
              }}
            >
              {buddies.map((buddy, index) => {
                const isCurrent = buddy.id === selectedBuddy;
                const isActive = index === activeIndex;

                return (
                  <article
                    key={buddy.id}
                    data-buddy-card-index={index}
                    className={`min-w-full snap-center rounded-[30px] border bg-[var(--bb-surface,#fff7f7)] p-4 text-center shadow-sm transition duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-[0.96] opacity-80"
                    }`}
                    style={{
                      borderColor: isCurrent ? "var(--bb-accent,#dc2626)" : "var(--bb-card-border,#fecaca)",
                    }}
                  >
                    <div className="mx-auto mb-3 inline-flex rounded-full bg-[var(--bb-card,#ffffff)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#dc2626)] shadow-sm">
                      {isCurrent ? "Current Buddy" : "Select"}
                    </div>

                    <div className="relative mx-auto grid h-[250px] w-full max-w-[300px] place-items-center overflow-hidden rounded-[28px] bg-[var(--bb-card,#ffffff)] shadow-inner">
                      <div className="absolute inset-x-8 bottom-8 h-20 rounded-full bg-[var(--bb-accent-soft,#fee2e2)] blur-2xl" />
                      <LouisAvatar buddyId={buddy.id} mood={getBuddyMood(buddy, selectedBuddy)} size={220} />
                    </div>

                    <h2 className="mt-4 text-4xl font-black leading-none">{buddy.name}</h2>
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#dc2626)]">{buddy.title}</p>
                    <p className="mx-auto mt-3 max-w-[300px] text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#8a1c1c)]">
                      {buddy.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => void chooseBuddy(buddy)}
                      disabled={isCurrent || savingBuddy === buddy.id}
                      className={`mt-5 w-full rounded-full px-5 py-3 text-sm font-black shadow-sm transition active:scale-[0.98] ${
                        isCurrent
                          ? "bg-[var(--bb-accent,#dc2626)] text-[var(--bb-button-text,#ffffff)]"
                          : "bg-[var(--bb-button,#dc2626)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
                      } disabled:cursor-default disabled:opacity-95`}
                    >
                      {savingBuddy === buddy.id ? "Saving..." : isCurrent ? "Current Buddy" : "Select"}
                    </button>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => moveCard(1)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-accent-soft,#fee2e2)] text-lg font-black text-[var(--bb-accent,#dc2626)] shadow-sm transition active:scale-95"
              aria-label="Next Buddy"
            >
              ›
            </button>
          </div>

          <div className="mt-1 flex justify-center gap-2">
            {buddies.map((buddy, index) => (
              <button
                key={buddy.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${index === activeIndex ? "w-7 bg-[var(--bb-accent,#dc2626)]" : "w-2.5 bg-[var(--bb-card-border,#fecaca)]"}`}
                aria-label={`Show ${buddy.name}`}
              />
            ))}
          </div>

          {message ? (
            <p className="mx-auto mt-4 max-w-sm rounded-full bg-[var(--bb-accent-soft,#fee2e2)] px-4 py-2 text-sm font-black text-[var(--bb-accent,#dc2626)]">
              {message}
            </p>
          ) : null}

          <p className="mt-4 text-xs font-bold text-[var(--bb-text-muted,#9f6262)]">Swipe the card or use the arrows.</p>
          <p className="sr-only" aria-live="polite">
            Showing {activeBuddy.name}
          </p>
        </section>
      </div>
    </main>
  );
}
