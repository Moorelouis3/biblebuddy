"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { BUDDY_STORE_ITEMS } from "../../lib/bibleBuddyStore";
import { supabase } from "../../lib/supabaseClient";

function orderBuddies(currentBuddyId: BuddyAvatarId) {
  const current = BUDDY_AVATARS.find((buddy) => buddy.id === currentBuddyId) ?? BUDDY_AVATARS[0];
  return [current, ...BUDDY_AVATARS.filter((buddy) => buddy.id !== current.id)];
}

function getBuddyMood(buddy: BuddyAvatar, currentBuddyId: BuddyAvatarId) {
  if (buddy.id !== "louis") return "wave";
  return currentBuddyId === "louis" ? "peace" : "wave";
}

function getBuddyStoreItemId(buddyId: BuddyAvatarId) {
  return buddyId === "louis" ? "buddy-lil-louis" : `buddy-${buddyId}`;
}

function getBuddyStoreItem(buddyId: BuddyAvatarId) {
  return BUDDY_STORE_ITEMS.find((item) => item.id === getBuddyStoreItemId(buddyId)) ?? null;
}

const BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY = "bb:buddy-selection-dashboard-handoff";

export default function ChangeBuddyPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(DEFAULT_BUDDY_AVATAR);
  const [activeIndex, setActiveIndex] = useState(0);
  const [savingBuddy, setSavingBuddy] = useState<BuddyAvatarId | null>(null);
  const [ownedBuddyItemIds, setOwnedBuddyItemIds] = useState<Set<string>>(() => new Set(["buddy-lil-louis"]));
  const [diamondCount, setDiamondCount] = useState(0);
  const [ownerHasUnlimitedDiamonds, setOwnerHasUnlimitedDiamonds] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const buddySwipeStartRef = useRef<{ x: number; y: number } | null>(null);

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
        if (!cancelled) setOwnerHasUnlimitedDiamonds(user.email?.toLowerCase() === "moorelouis3@gmail.com");

        const { data } = await supabase
          .from("profile_stats")
          .select("selected_buddy_avatar, diamonds_count")
          .eq("user_id", user.id)
          .maybeSingle();

        const { data: purchases } = await supabase
          .from("user_store_purchases")
          .select("item_id")
          .eq("user_id", user.id)
          .eq("item_kind", "buddy");

        const savedBuddy = data?.selected_buddy_avatar
          ? normalizeBuddyAvatarId(data.selected_buddy_avatar)
          : typeof window !== "undefined"
            ? normalizeBuddyAvatarId(window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY))
            : DEFAULT_BUDDY_AVATAR;

        if (!cancelled) {
          setSelectedBuddy(savedBuddy);
          setDiamondCount(Math.max(0, Number(data?.diamonds_count ?? 0)));
          setOwnedBuddyItemIds(new Set(["buddy-lil-louis", ...(purchases || []).map((purchase) => purchase.item_id)]));
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

  async function saveBuddySelection(buddy: BuddyAvatar) {
    setSelectedBuddy(buddy.id);
    setActiveIndex(0);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddy.id);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId: buddy.id } }));
    }

    try {
      if (!userId) throw new Error("No user session found.");
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            selected_buddy_avatar: buddy.id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );

      if (error) throw error;
      setMessage(`${buddy.name} is your Buddy now.`);
    } catch (error) {
      console.error("[CHANGE_BUDDY] Could not save selected buddy:", error);
      setMessage(`${buddy.name} is selected on this device.`);
    }
  }

  async function chooseBuddy(buddy: BuddyAvatar) {
    if (buddy.id === selectedBuddy || savingBuddy) return;

    setSavingBuddy(buddy.id);
    setMessage(null);
    try {
      await saveBuddySelection(buddy);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY,
          JSON.stringify({ buddyId: buddy.id, buddyName: buddy.name, createdAt: Date.now() }),
        );
      }
      router.push("/dashboard");
    } finally {
      setSavingBuddy(null);
    }
  }

  async function purchaseBuddy(buddy: BuddyAvatar) {
    if (savingBuddy) return;
    const storeItem = getBuddyStoreItem(buddy.id);
    if (!storeItem || storeItem.comingSoon) {
      setMessage(`${buddy.name} is coming soon.`);
      return;
    }

    if (!userId) {
      setMessage("Sign in first so BibleBuddy can save this Buddy.");
      return;
    }

    setSavingBuddy(buddy.id);
    setMessage(null);

    try {
      const { data: statsRow, error: statsError } = await supabase
        .from("profile_stats")
        .select("diamonds_count")
        .eq("user_id", userId)
        .maybeSingle();

      if (statsError) throw statsError;

      const serverDiamonds = Math.max(0, Number(statsRow?.diamonds_count ?? diamondCount));
      if (!ownerHasUnlimitedDiamonds && serverDiamonds < storeItem.price) {
        setDiamondCount(serverDiamonds);
        setMessage(`You need ${(storeItem.price - serverDiamonds).toLocaleString()} more diamonds for ${buddy.name}.`);
        return;
      }

      const nextDiamonds = ownerHasUnlimitedDiamonds ? serverDiamonds : serverDiamonds - storeItem.price;
      if (!ownerHasUnlimitedDiamonds) {
        const { error: updateError } = await supabase
          .from("profile_stats")
          .update({ diamonds_count: nextDiamonds })
          .eq("user_id", userId);

        if (updateError) throw updateError;
      }

      const { error: purchaseError } = await supabase.from("user_store_purchases").insert({
        user_id: userId,
        item_id: storeItem.id,
        item_kind: storeItem.kind,
        item_title: storeItem.title,
        price_diamonds: storeItem.price,
        reward_payload: {
          buddyId: buddy.id,
        },
      });

      if (purchaseError) {
        if (!ownerHasUnlimitedDiamonds) {
          await supabase.from("profile_stats").update({ diamonds_count: serverDiamonds }).eq("user_id", userId);
        }
        throw purchaseError;
      }

      setDiamondCount(nextDiamonds);
      setOwnedBuddyItemIds((current) => new Set([...Array.from(current), storeItem.id]));
      setMessage(`${buddy.name} is unlocked.`);
      await saveBuddySelection(buddy);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY,
          JSON.stringify({ buddyId: buddy.id, buddyName: buddy.name, createdAt: Date.now() }),
        );
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("[CHANGE_BUDDY] Could not purchase buddy:", error);
      setMessage("The Buddy purchase did not go through. Try again in a moment.");
    } finally {
      setSavingBuddy(null);
    }
  }

  function handleBuddyButton(buddy: BuddyAvatar) {
    const storeItem = getBuddyStoreItem(buddy.id);
    const isOwned = buddy.id === "louis" || ownedBuddyItemIds.has(getBuddyStoreItemId(buddy.id)) || buddy.id === selectedBuddy;
    if (isOwned) {
      void chooseBuddy(buddy);
      return;
    }
    if (storeItem?.comingSoon) {
      setMessage(`${buddy.name} is coming soon.`);
      return;
    }
    void purchaseBuddy(buddy);
  }

  function moveCard(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + buddies.length) % buddies.length);
  }

  function handleBuddySwipeStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    buddySwipeStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function handleBuddySwipeEnd(event: React.TouchEvent<HTMLDivElement>) {
    const start = buddySwipeStartRef.current;
    buddySwipeStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const endX = touch?.clientX ?? start.x;
    const endY = touch?.clientY ?? start.y;
    const deltaX = endX - start.x;
    const deltaY = endY - start.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX < 70 || absY > 35 || absY > absX * 0.55) return;

    moveCard(deltaX < 0 ? 1 : -1);
  }

  return (
    <main className="min-h-screen px-4 py-5 text-[var(--bb-text-primary,#2b0707)]">
      <div className="mx-auto max-w-[760px]">
        <section className="relative overflow-hidden rounded-[32px] border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-surface,#fff7f7)] px-3 pb-5 pt-4 text-center shadow-[0_18px_50px_rgba(127,29,29,0.12)] sm:px-5">
          <Link
            href="/dashboard"
            aria-label="Close Change Buddy"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-card,#ffffff)] text-xl font-black text-[var(--bb-text-secondary,#8a1c1c)] shadow-sm transition hover:brightness-95"
          >
            x
          </Link>

          <div className="relative mx-auto max-w-[720px] px-0 sm:px-16">
            <button
              type="button"
              onClick={() => moveCard(-1)}
              className="absolute left-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-card,#ffffff)] text-2xl font-black text-[var(--bb-accent,#dc2626)] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:brightness-95 active:scale-95 sm:left-0 sm:h-14 sm:w-14"
              aria-label="Previous Buddy"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="mx-auto flex w-full max-w-[600px] gap-4 overflow-x-hidden px-0 pb-3 pt-1 [touch-action:pan-y] sm:px-1"
              onTouchStart={handleBuddySwipeStart}
              onTouchEnd={handleBuddySwipeEnd}
            >
              {buddies.map((buddy, index) => {
                const isCurrent = buddy.id === selectedBuddy;
                const isActive = index === activeIndex;
                const storeItem = getBuddyStoreItem(buddy.id);
                const isOwned = buddy.id === "louis" || ownedBuddyItemIds.has(getBuddyStoreItemId(buddy.id)) || isCurrent;
                const isComingSoon = Boolean(storeItem?.comingSoon);

                return (
                  <article
                    key={buddy.id}
                    data-buddy-card-index={index}
                    className={`relative min-w-full snap-center overflow-hidden rounded-[26px] border p-4 text-center shadow-[0_16px_42px_rgba(38,63,99,0.12)] transition duration-300 sm:rounded-[30px] sm:p-7 ${
                      isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-80"
                    }`}
                    style={{
                      borderColor: isCurrent ? "var(--bb-accent,#dc2626)" : "var(--bb-card-border,#fecaca)",
                      background:
                        "radial-gradient(circle at 50% 18%, var(--bb-accent-soft,#fee2e2), transparent 34%), var(--bb-card,#ffffff)",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-x-10 bottom-20 h-24 rounded-full bg-[var(--bb-accent-soft,#fee2e2)] blur-3xl" aria-hidden="true" />
                    <div className="relative mx-auto grid min-h-[270px] place-items-center sm:min-h-[360px]">
                      <LouisAvatar buddyId={buddy.id} mood={getBuddyMood(buddy, selectedBuddy)} size={isActive ? 280 : 260} />
                    </div>

                    <h2 className="relative -mt-2 text-5xl font-black leading-none sm:text-6xl">{buddy.name}</h2>
                    <p className="relative mt-3 text-sm font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#dc2626)]">{buddy.title}</p>

                    <button
                      type="button"
                      onClick={() => handleBuddyButton(buddy)}
                      disabled={isCurrent || savingBuddy === buddy.id || isComingSoon}
                      className={`relative mt-6 w-full rounded-full px-5 py-3.5 text-sm font-black shadow-sm transition active:scale-[0.98] ${
                        isCurrent
                          ? "bg-[var(--bb-accent,#dc2626)] text-[var(--bb-button-text,#ffffff)]"
                          : "bg-[var(--bb-button,#dc2626)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
                      } disabled:cursor-default disabled:opacity-95`}
                    >
                      {savingBuddy === buddy.id
                        ? "Saving..."
                        : isCurrent
                          ? "Current Buddy"
                          : isComingSoon
                            ? "Coming Soon"
                            : isOwned
                              ? "Select"
                              : `Purchase ${storeItem?.price.toLocaleString() ?? 0} diamonds`}
                    </button>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => moveCard(1)}
              className="absolute right-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#fecaca)] bg-[var(--bb-card,#ffffff)] text-2xl font-black text-[var(--bb-accent,#dc2626)] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:brightness-95 active:scale-95 sm:right-0 sm:h-14 sm:w-14"
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

          <p className="sr-only" aria-live="polite">
            Showing {activeBuddy.name}
          </p>
        </section>
      </div>
    </main>
  );
}
