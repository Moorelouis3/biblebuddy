"use client";

/**
 * Bible Memory, the third game under Games (2026-11-12).
 *
 * Two lists and two ways to play since 2026-11-26. Louis: "do one verse at a
 * time and have like ten different questions or activities for that one
 * verse... if you say that you know it, then it goes to the master list, and
 * then you can do the test version."
 *
 *   Learning        every saved verse the reader has not said they know. Each
 *                   has its own "Study this verse" button: ten steps on that
 *                   verse and no other.
 *   Verses I know   the ones the reader marked "I know it". One "Take the
 *                   test" button asks ten questions across these, and only
 *                   these. A clean test moves a verse up a medal.
 *
 * A version picker (KJV, WEB, ASV) since 2026-11-27: the saved verses are
 * shown and practised in the picked version. Nothing saved changes; see
 * lib/bibleMemoryVersions.ts.
 *
 * The views (list, add, learn, test) are views rather than routes so a
 * session cannot be reloaded half way into a broken state, and Back from the
 * Games tab always lands on the list.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { GameStage, GameTopBar } from "@/components/games/GameStage";
import { supabase } from "@/lib/supabaseClient";
import { listMemoryVerses, onMemoryVersesChange, removeMemoryVerse, setMemoryVerseKnown } from "@/lib/bibleMemory";
import { trackFeatureEvent } from "@/lib/featureEvents";
import { cleanVerseText, formatReference, isKnown, medalFor, TEST_LENGTH, type MemoryVerse } from "@/lib/bibleMemoryGames";
import { loadVersesInVersion } from "@/lib/bibleMemoryVersions";
import { BIBLE_VERSIONS, readPreferredBibleVersion, savePreferredBibleVersion, type BibleVersion } from "@/lib/bibleVersionPreference";
import { bookScene } from "@/lib/games/bookScene";
import MemoryPractice from "./MemoryPractice";
import MemoryVersePicker from "./MemoryVersePicker";

type View = "list" | "add" | "learn" | "test";
type LoadState = "loading" | "ready" | "failed" | "signed-out";

const MEDAL_ICON = { Bronze: "🥉", Silver: "🥈", Gold: "🥇" } as const;
const HOME_SCENE = bookScene("Psalms");

export default function BibleMemoryHome() {
  const [userId, setUserId] = useState<string | null>(null);
  const [savedVerses, setVerses] = useState<MemoryVerse[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [view, setView] = useState<View>("list");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  // The version the verses are shown and practised in. Null until the reader
  // picks one: every verse then shows in the wording it was saved in.
  const [version, setVersion] = useState<BibleVersion | null>(null);
  const [versionText, setVersionText] = useState<Record<string, string>>({});
  const [versionLoading, setVersionLoading] = useState(false);

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

  // A verse added from the picker (or anywhere else on the page), or one just
  // marked known, shows up without a reload.
  useEffect(() => {
    if (!userId) return;
    return onMemoryVersesChange(() => void load(userId, true));
  }, [userId, load]);

  useEffect(() => {
    setVersion(readPreferredBibleVersion());
  }, []);

  // Fetch the saved verses in the picked version. Keyed on the references,
  // not on the rows, so a progress save does not ask for them again.
  const referenceKey = savedVerses.map((verse) => verse.id).join(",");
  useEffect(() => {
    if (!version || !savedVerses.length) {
      setVersionText({});
      return;
    }
    let cancelled = false;
    setVersionText({});
    setVersionLoading(true);
    void loadVersesInVersion(savedVerses, version, (id, text) => {
      if (!cancelled) setVersionText((current) => ({ ...current, [id]: text }));
    }).finally(() => {
      if (!cancelled) setVersionLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, referenceKey]);

  function pickVersion(next: BibleVersion) {
    setVersion(next);
    savePreferredBibleVersion(next);
  }

  // The verses as every screen below sees them: in the picked version where
  // that wording loaded, as saved where it did not.
  const verses = useMemo(
    () =>
      version
        ? savedVerses.map((verse) =>
            versionText[verse.id] ? { ...verse, translation: version.toUpperCase(), verse_text: versionText[verse.id] } : verse,
          )
        : savedVerses,
    [savedVerses, version, versionText],
  );

  async function remove(verse: MemoryVerse) {
    if (!userId || busy) return;
    if (!window.confirm(`Remove ${formatReference(verse)} from Bible Memory? Its progress goes with it.`)) return;
    setBusy(verse.id);
    setProblem(null);
    const ok = await removeMemoryVerse(userId, verse.id);
    setBusy(null);
    if (!ok) setProblem("That verse was not removed. Check your connection and try again.");
  }

  async function backToLearning(verse: MemoryVerse) {
    if (!userId || busy) return;
    setBusy(verse.id);
    setProblem(null);
    const ok = await setMemoryVerseKnown(userId, verse.id, false);
    setBusy(null);
    if (!ok) setProblem("That verse was not moved. Check your connection and try again.");
  }

  function backToList() {
    setView("list");
    setFocusId(null);
    if (userId) void load(userId, true);
  }

  const focus = focusId ? verses.find((verse) => verse.id === focusId) ?? null : null;

  if (view === "learn" && userId && focus) {
    return (
      <MemoryPractice
        key={`learn-${focus.id}-${run}`}
        mode="learn"
        userId={userId}
        verses={verses}
        focus={focus}
        onFinished={() => void load(userId, true)}
        onExit={backToList}
        onAgain={() => setRun((n) => n + 1)}
      />
    );
  }

  if (view === "test" && userId) {
    return (
      <MemoryPractice
        key={`test-${run}`}
        mode="test"
        userId={userId}
        verses={verses}
        onFinished={() => void load(userId, true)}
        onExit={backToList}
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
            <MemoryVersePicker userId={userId} saved={savedVerses} onAdded={() => void load(userId, true)} onClose={() => setView("list")} />
          </div>
        </div>
      </GameStage>
    );
  }

  const learning = verses.filter((verse) => !isKnown(verse));
  const known = verses.filter(isKnown);

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
              Pick one here, or tap &ldquo;Add to Bible Memory&rdquo; on the Verse of the Day or on any verse number in the Bible. Then
              learn it one verse at a time.
            </p>
            <button type="button" onClick={() => setView("add")} className="bbg-btn bbg-btn-green mt-4">
              Choose a verse
            </button>
          </div>
        ) : null}

        {state === "ready" && verses.length > 0 ? (
          <>
            {/* The one setting on this screen: which Bible version the verses are
                shown and practised in. Its own bar, apart from adding a verse
                (Louis, 2026-11-27: "its one simple setting on memory"). */}
            <div className="bbmh-setting" role="group" aria-label="Bible version">
              <span className="bbmh-setting-label">Bible version</span>
              {BIBLE_VERSIONS.map((option) => {
                const active = (version ?? "kjv") === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => pickVersion(option.value)}
                    aria-pressed={active}
                    title={option.name}
                    className={`bbmh-version${active ? " is-on" : ""}`}
                  >
                    {versionLoading && active ? "..." : option.label}
                  </button>
                );
              })}
            </div>
            <div className="bbg-parch text-center">
              <h2 className="bbg-serif text-[20px] font-black">One verse at a time</h2>
              <p className="mx-auto mt-1 max-w-sm text-[14px] font-semibold leading-6">
                Pick a verse and work through ten steps on just that verse. When you know it, say so, and it joins your test.
              </p>
              <button type="button" onClick={() => setView("add")} className="bbg-btn bbg-btn-cream mt-3">
                + Add a verse
              </button>
            </div>

            {problem ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{problem}</p>
            ) : null}

            <h2 className="bbmh-ribbon">Learning ({learning.length})</h2>
            {learning.length === 0 ? (
              <p className="bbmh-note text-center">Nothing left to learn. Add a verse to start a new one.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {learning.map((verse) => (
                  <li key={verse.id} className="bbg-parch" style={{ padding: 4 }}>
                    <p className="bbg-serif text-[17px] font-black">
                      {formatReference(verse)} <span className="text-xs font-bold opacity-70">{verse.translation}</span>
                    </p>
                    <p className="bbg-serif mt-2 text-[15px] font-semibold leading-6">{cleanVerseText(verse.verse_text)}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFocusId(verse.id);
                        setView("learn");
                      }}
                      className="bbg-btn bbg-btn-green mt-3"
                    >
                      ▶ Study this verse
                    </button>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold opacity-75">
                        {verse.last_practised_at ? `${verse.correct_count} right · ${verse.mistake_count} missed so far` : "Not studied yet"}
                      </p>
                      <button
                        type="button"
                        onClick={() => void remove(verse)}
                        disabled={busy === verse.id}
                        className="text-xs font-black underline opacity-75 disabled:opacity-50"
                      >
                        {busy === verse.id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h2 className="bbmh-ribbon">Verses I know ({known.length})</h2>
            {known.length === 0 ? (
              <p className="bbmh-note text-center">
                Finish a verse and tap &ldquo;I know it&rdquo;. It lands here, and the test opens.
              </p>
            ) : (
              <>
                <div className="bbg-parch text-center">
                  <p className="text-[14px] font-bold leading-6">
                    {TEST_LENGTH} questions across the {known.length === 1 ? "verse" : `${known.length} verses`} you know. A clean test moves a
                    verse up a medal.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRun((n) => n + 1);
                      setView("test");
                    }}
                    className="bbg-btn bbg-btn-green mt-3"
                  >
                    ▶ Take the test
                  </button>
                </div>
                <ul className="flex flex-col gap-3">
                  {known.map((verse) => {
                    const medal = medalFor(verse.level);
                    return (
                      <li key={verse.id} className="bbg-parch" style={{ padding: 4 }}>
                        <p className="bbg-serif text-[17px] font-black">
                          {medal ? (
                            <span className="mr-1" aria-label={`${medal} medal`}>
                              {MEDAL_ICON[medal]}
                            </span>
                          ) : (
                            <span className="mr-1" aria-hidden="true">
                              ✓
                            </span>
                          )}
                          {formatReference(verse)} <span className="text-xs font-bold opacity-70">{verse.translation}</span>
                        </p>
                        <p className="bbg-serif mt-2 text-[15px] font-semibold leading-6">{cleanVerseText(verse.verse_text)}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => void backToLearning(verse)}
                            disabled={busy === verse.id}
                            className="text-xs font-black underline opacity-75 disabled:opacity-50"
                          >
                            {busy === verse.id ? "Moving..." : "Move back to Learning"}
                          </button>
                          <button
                            type="button"
                            onClick={() => void remove(verse)}
                            disabled={busy === verse.id}
                            className="text-xs font-black underline opacity-75 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </>
        ) : null}
      </div>
    </GameStage>
  );
}

const HOME_CSS = `
.bbmh-note { font-size:13px; font-weight:700; color:#fff3dc; text-shadow: 0 1px 2px rgba(0,0,0,.75); }
.bbmh-ribbon { margin: 6px auto 0; width: min(100%, 320px); min-height:46px; display:flex; align-items:center; justify-content:center;
  font-family: Georgia, serif; font-weight:900; font-size:17px; color:#3b2412;
  background: url(/games/match/ui/level-name-plaque.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 4px 8px rgba(0,0,0,.4)); }
.bbmh-setting { display:flex; align-items:center; justify-content:center; gap:8px; padding: 8px 10px; border-radius:999px; background: rgba(42,26,12,.72); box-shadow: inset 0 0 0 1px rgba(246,196,69,.45); }
.bbmh-setting-label { margin-right:4px; font-size:13px; font-weight:900; color:#fff3dc; }
.bbmh-version { min-width:56px; padding: 6px 12px; border-radius:999px; font-family: Georgia, serif; font-weight:900; font-size:15px; color:#3b2412; background: linear-gradient(180deg,#fff9e8,#f1dfb2); border:2px solid #b8893c; box-shadow: 0 3px 0 #7a5320; }
.bbmh-version.is-on { color:#fff8dc; background: linear-gradient(180deg,#3d9a5c,#1f6b3a); border-color:#14502a; box-shadow: 0 3px 0 #0e3a1e; }
.bbmh-picker { border-radius:18px; background: var(--bb-card,#ffffff); padding: 14px; box-shadow: 0 14px 30px rgba(0,0,0,.4); }
`;
