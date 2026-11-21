"use client";

/**
 * The Bible Cover shelf in Settings (lib/bibleCovers.ts). A cover is chosen
 * like a Bible is - by its cover - so they are shown as books on a shelf, not
 * as colour swatches. "No cover" is the plain Bible Buddy look.
 *
 * The choice is applied on this device at once and saved to the account
 * through /api/bible-covers, which also says how many Buddies have each
 * cover on (Louis, 2026-11-21: "when a buddy selects it shows 56 buddies are
 * using this cover").
 */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BIBLE_COVERS, BIBLE_COVER_EVENT, EFFECT_LABELS, readBibleCover, setBibleCover, type BibleCoverId } from "@/lib/bibleCovers";
import { setBibleCoverSnow } from "@/components/BibleCoverBackdrop";

const SNOW_PREF_KEY = "bb:bible-cover-snow:v1";

type Counts = Partial<Record<BibleCoverId, number>>;

const buddies = (n: number) => `${n.toLocaleString()} ${n === 1 ? "Buddy" : "Buddies"}`;

export default function BibleCoverPicker() {
  const [current, setCurrent] = useState<BibleCoverId | null>(null);
  const [motionOn, setMotionOn] = useState(true);
  const [counts, setCounts] = useState<Counts | null>(null);

  // How many Buddies wear each cover. Absolute URL: a relative fetch can hang
  // forever inside the app (CapacitorHttp).
  useEffect(() => {
    let alive = true;
    fetch(`${window.location.origin}/api/bible-covers`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (alive && data?.counts) setCounts(data.counts); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  /** On this device at once; then to the account, which returns fresh counts. */
  async function choose(id: BibleCoverId | null) {
    const before = current;
    setBibleCover(id);
    // Show the change straight away; the server's numbers replace this.
    setCounts((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      if (before) next[before] = Math.max(0, (next[before] || 0) - 1);
      if (id) next[id] = (next[id] || 0) + 1;
      return next;
    });
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return;
      const res = await fetch(`${window.location.origin}/api/bible-covers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cover: id }),
      });
      const payload = await res.json().catch(() => null);
      if (payload?.counts) setCounts(payload.counts);
    } catch {
      // Saved on this device either way; the account catches up next time.
    }
  }

  useEffect(() => {
    const sync = () => setCurrent(readBibleCover());
    sync();
    try {
      setMotionOn(window.localStorage.getItem(SNOW_PREF_KEY) !== "off");
    } catch {
      // storage blocked: motion stays on
    }
    window.addEventListener(BIBLE_COVER_EVENT, sync);
    return () => window.removeEventListener(BIBLE_COVER_EVENT, sync);
  }, []);

  // Light and Dark first, as plain books; then the picture covers, Winter
  // Cabin first because it is the one the others were modelled on.
  const covers = Object.values(BIBLE_COVERS)
    .filter((cover) => cover.art)
    .sort((a, b) => Number(b.id === "winter-cabin") - Number(a.id === "winter-cabin"));

  /** Light and Dark: plain books, drawn in fixed colours so each shows what it is under any cover. */
  const plain = (id: BibleCoverId | null, label: string, bg: string, ink: string, edge: string) => {
    const selected = current === id;
    const count = id ? counts?.[id] || 0 : 0;
    return (
      <button type="button" onClick={() => void choose(id)} aria-pressed={selected} aria-label={`${label} mode`} className="text-left">
        <span
          className={`relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-l-md rounded-r-xl border text-center shadow-[0_10px_18px_-8px_rgba(14,26,58,0.45)] ${
            selected ? "ring-[3px] ring-[var(--bb-accent,#0056fd)] ring-offset-2" : ""
          }`}
          style={{ background: bg, borderColor: edge }}
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: edge }} />
          <span className="px-2">
            <span className="block text-[7px] font-black tracking-[0.22em]" style={{ color: "#0056FD" }}>BIBLE BUDDY</span>
            <span className="block font-serif text-[15px] font-bold" style={{ color: ink }}>{label}</span>
          </span>
          {selected ? (
            <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--bb-accent,#0056fd)] text-[11px] font-black text-[var(--bb-button-text,#ffffff)]">
              ✓
            </span>
          ) : null}
        </span>
        <span className="mt-1.5 block text-center text-[11px] font-bold text-[var(--bb-text-secondary,#4b5563)]">{label}</span>
        {count > 0 ? (
          <span className="block text-center text-[10px] font-semibold text-[var(--bb-text-muted,#6b7280)]">{buddies(count)}</span>
        ) : null}
      </button>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {plain(null, "Light", "#F7FAFC", "#0E1A3A", "#DBE7F4")}
        {plain("dark", "Dark", "#121821", "#F1F5F9", "#2A3444")}
        {covers.map((cover) => {
          const selected = current === cover.id;
          return (
            <button
              key={cover.id}
              type="button"
              onClick={() => void choose(cover.id)}
              aria-pressed={selected}
              aria-label={`${cover.name} Bible cover`}
              className="text-left"
            >
              <span
                className={`relative block aspect-[3/4] w-full overflow-hidden rounded-l-md rounded-r-xl bg-cover bg-center shadow-[0_10px_18px_-8px_rgba(14,26,58,0.55)] ${
                  selected ? "ring-[3px] ring-[var(--bb-accent,#0056fd)] ring-offset-2" : ""
                }`}
                style={{ backgroundImage: `url(${cover.art?.thumb})`, backgroundColor: cover.base }}
              >
                {/* The spine and the gilt title, so it reads as a Bible. */}
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-black/30" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <span className="absolute inset-x-2 bottom-2 text-white">
                  <span className="block text-[7px] font-black tracking-[0.22em] opacity-85">HOLY BIBLE</span>
                  <span className="block font-serif text-[12px] font-bold leading-tight">{cover.name}</span>
                </span>
                {selected ? (
                  <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--bb-accent,#0056fd)] text-[11px] font-black text-[var(--bb-button-text,#ffffff)]">
                    ✓
                  </span>
                ) : null}
              </span>
              <span className="mt-1.5 block text-center text-[11px] font-bold text-[var(--bb-text-secondary,#4b5563)]">{cover.name}</span>
              {counts && (counts[cover.id] || 0) > 0 ? (
                <span className="block text-center text-[10px] font-semibold text-[var(--bb-text-muted,#6b7280)]">
                  {buddies(counts[cover.id] || 0)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {current && counts ? (
        <p className="mt-4 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
          <span aria-hidden>👥 </span>
          {(counts[current] || 0) <= 1
            ? `You're the first Buddy using ${BIBLE_COVERS[current].art ? BIBLE_COVERS[current].name : "Dark mode"}.`
            : `${buddies(counts[current] || 0)} are using ${BIBLE_COVERS[current].art ? BIBLE_COVERS[current].name : "Dark mode"}.`}
        </p>
      ) : null}

      {current && BIBLE_COVERS[current].motion !== "none" ? (
        <label className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 py-3">
          <span>
            <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">
              {EFFECT_LABELS[BIBLE_COVERS[current].motion]}
            </span>
            <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
              Off keeps the picture still. It also goes still by itself on phones that cannot keep up.
            </span>
          </span>
          <input
            type="checkbox"
            checked={motionOn}
            onChange={(event) => {
              setMotionOn(event.target.checked);
              setBibleCoverSnow(event.target.checked);
            }}
            className="h-5 w-5 shrink-0 accent-[var(--bb-accent,#0056fd)]"
          />
        </label>
      ) : null}
    </div>
  );
}
