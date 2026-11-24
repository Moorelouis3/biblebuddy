"use client";

/**
 * Bible Memory, the third game under Games (2026-11-12).
 *
 * Three views in one screen: the saved verses, the picker that adds one, and
 * a practice session. They are views rather than routes so a session cannot
 * be reloaded half way into a broken state, and Back from the Games tab
 * always lands on the list.
 *
 * Game look since 2026-11-24: full screen over a painted scene, the verses on
 * parchment with the medal each has earned (Bronze, Silver, Gold by level;
 * lib/bibleMemoryGames.ts medalFor), and a medal count at the top.
 */

import { useCallback, useEffect, useState } from "react";
import { GameStage, GameTopBar } from "@/components/games/GameStage";
import { supabase } from "@/lib/supabaseClient";
import { listMemoryVerses, onMemoryVersesChange, removeMemoryVerse } from "@/lib/bibleMemory";
import { trackFeatureEvent } from "@/lib/featureEvents";
import { cleanVerseText, formatReference, medalFor, memoryLabel, type MemoryLabel, type MemoryVerse } from "@/lib/bibleMemoryGames";
import { bookScene } from "@/lib/games/bookScene";
import MemoryPractice from "./MemoryPractice";
import MemoryVersePicker from "./MemoryVersePicker";

type View = "list" | "add" | "practice";
type LoadState = "loading" | "ready" | "failed" | "signed-out";

const LABEL_STYLES: Record<MemoryLabel, string> = {
  New: "bg-[#e0e7ff] text-[#3730a3]",
  Practising: "bg-[#fef3c7] text-[#92400e]",
  "Ready for review": "bg-[#dcfce7] text-[#166534]",
};

const MEDAL_ICON = { Bronze: "🥉", Silver: "🥈", Gold: "🥇" } as const;
const HOME_SCENE = bookScene("Psalms");

export default function BibleMemoryHome() {
  const [userId, setUserId] = useState<string | null>(null);
  const [verses, setVerses] = useState<MemoryVerse[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [view, setView] = useState<View>("list");
  const [run, setRun] = useState(0);
  const [removing, setRemoving] = useState<string | null>(null);
  const [removeFailed, setRemoveFailed] = useState(false);

  const load = useCallback(async (id: string, quiet = false) => {
    if (!quiet) setState("loading");
    try {
      setVerses(await listMemoryVerses(id));
      setState("ready");
    } catch {
      // A failed read is not "no verses saved". Say so and offer another try.
      if (!quiet) setState("failed");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      const id = data.user?.id ?? null;
      setUserId(id);
      if (!id) {
        setState("signed-out");
        return;
      }
      // One "opened" per visit, whether or not anything gets saved: this is
      // what separates "looked and left" from "never found it".
      trackFeatureEvent("bible_memory_opened", id);
      void load(id);
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  // A verse added from the picker (or anywhere else on the page) shows up
  // without a reload.
  useEffect(() => {
    if (!userId) return;
    return onMemoryVersesChange(() => void load(userId, true));
  }, [userId, load]);

  async function remove(verse: MemoryVerse) {
    if (!userId || removing) return;
    if (!window.confirm(`Remove ${formatReference(verse)} from Bible Memory? Its practice progress goes with it.`)) return;
    setRemoving(verse.id);
    setRemoveFailed(false);
    const ok = await removeMemoryVerse(userId, verse.id);
    setRemoving(null);
    if (!ok) setRemoveFailed(true);
  }

  const now = new Date();

  if (view === "practice" && userId) {
    return (
      <MemoryPractice
        key={run}
        userId={userId}
        verses={verses}
        onFinished={() => void load(userId, true)}
        onExit={() => {
          setView("list");
          void load(userId, true);
        }}
        onAgain={() => setRun((n) => n + 1)}
      />
    );
  }

  if (view === "add" && userId) {
    return (
      <GameStage scene={HOME_SCENE} dim={0.5}>
        <style>{HOME_CSS}</style>
        <GameTopBar title="Bible Memory" sub="Add a verse" onBack={() => setView("list")} />
        <div className="bbg-col">
          <div className="bbmh-picker">
            <MemoryVersePicker userId={userId} saved={verses} onAdded={() => void load(userId, true)} onClose={() => setView("list")} />
          </div>
        </div>
      </GameStage>
    );
  }

  const medals = { Gold: 0, Silver: 0, Bronze: 0 };
  for (const verse of verses) {
    const medal = medalFor(verse.level);
    if (medal) medals[medal] += 1;
  }

  return (
    <GameStage scene={HOME_SCENE} dim={0.42}>
      <style>{HOME_CSS}</style>
      <GameTopBar title="Bible Memory" back="/bible-study-games" />
      <div className="bbg-col">
        {state === "loading" ? <p className="bbmh-note py-10 text-center">Loading your verses...</p> : null}

        {state === "signed-out" ? (
          <div className="bbg-parch text-center">
            <p className="bbg-serif text-lg font-bold">Sign in to save verses and keep your progress.</p>
            <a href="/login?next=/bible-study-games/memory" className="bbg-btn bbg-btn-green mt-4">
              Sign in
            </a>
          </div>
        ) : null}

        {state === "failed" ? (
          <div className="bbg-parch text-center">
            <p className="bbg-serif text-lg font-bold">Your verses did not load.</p>
            <p className="mt-1 text-sm font-semibold">They are still saved. Check your connection and try again.</p>
            <button type="button" onClick={() => userId && void load(userId)} className="bbg-btn bbg-btn-green mt-4">
              Try again
            </button>
          </div>
        ) : null}

        {state === "ready" && verses.length === 0 ? (
          <div className="bbg-parch text-center">
            <p className="text-5xl" aria-hidden="true">
              🧠
            </p>
            <h2 className="bbg-serif mt-2 text-2xl font-black">Add your first verse</h2>
            <p className="mx-auto mt-2 max-w-sm text-[15px] font-semibold leading-6">
              Pick one here, or tap &ldquo;Add to Bible Memory&rdquo; on the Verse of the Day or on any verse number in the Bible.
            </p>
            <button type="button" onClick={() => setView("add")} className="bbg-btn bbg-btn-green mt-4">
              Choose a verse
            </button>
          </div>
        ) : null}

        {state === "ready" && verses.length > 0 ? (
          <>
            <div className="bbg-parch text-center">
              <div className="flex items-center justify-center gap-4" aria-label="Your medals">
                {(["Gold", "Silver", "Bronze"] as const).map((medal) => (
                  <span key={medal} className="bbmh-medal-count">
                    <span className="text-[30px] leading-none">{MEDAL_ICON[medal]}</span>
                    <span className="bbg-serif text-[20px] font-black">{medals[medal]}</span>
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[13px] font-bold">Five games, five questions. A clean session moves a verse up a medal.</p>
              <div className="mt-3 flex flex-col gap-2">
                <button type="button" onClick={() => setView("practice")} className="bbg-btn bbg-btn-green">
                  ▶ Start practice
                </button>
                <button type="button" onClick={() => setView("add")} className="bbg-btn bbg-btn-cream">
                  + Add a verse
                </button>
              </div>
            </div>

            {removeFailed ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                That verse was not removed. Check your connection and try again.
              </p>
            ) : null}

            <h2 className="bbmh-ribbon">My verses ({verses.length})</h2>
            <ul className="flex flex-col gap-3">
              {verses.map((verse) => {
                const label = memoryLabel(verse, now);
                const medal = medalFor(verse.level);
                return (
                  <li key={verse.id} className="bbg-parch" style={{ padding: 4 }}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="bbg-serif text-[17px] font-black">
                        {medal ? <span className="mr-1" aria-label={`${medal} medal`}>{MEDAL_ICON[medal]}</span> : null}
                        {formatReference(verse)} <span className="text-xs font-bold opacity-70">{verse.translation}</span>
                      </p>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${LABEL_STYLES[label]}`}>{label}</span>
                    </div>
                    <p className="bbg-serif mt-2 text-[15px] font-semibold leading-6">{cleanVerseText(verse.verse_text)}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold opacity-75">
                        {verse.last_practised_at ? `${verse.correct_count} right · ${verse.mistake_count} to review` : "Not practised yet"}
                      </p>
                      <button
                        type="button"
                        onClick={() => void remove(verse)}
                        disabled={removing === verse.id}
                        className="text-xs font-black underline opacity-75 disabled:opacity-50"
                      >
                        {removing === verse.id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    </GameStage>
  );
}

const HOME_CSS = `
.bbmh-note { font-size:13px; font-weight:700; color:#fff3dc; text-shadow: 0 1px 2px rgba(0,0,0,.75); }
.bbmh-medal-count { display:flex; align-items:center; gap:4px; }
.bbmh-ribbon { margin: 6px auto 0; width: min(100%, 320px); min-height:46px; display:flex; align-items:center; justify-content:center;
  font-family: Georgia, serif; font-weight:900; font-size:17px; color:#3b2412;
  background: url(/games/match/ui/level-name-plaque.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 4px 8px rgba(0,0,0,.4)); }
.bbmh-picker { border-radius:18px; background: var(--bb-card,#ffffff); padding: 14px; box-shadow: 0 14px 30px rgba(0,0,0,.4); }
`;
