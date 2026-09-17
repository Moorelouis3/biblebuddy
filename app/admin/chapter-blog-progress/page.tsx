"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import progress from "@/data/chapter-blog/progress.json";

// "Bible Chapter Library" tracker (2026-09-17). Reads the progress file the
// Chapter Blog Writer routine commits with every article, so it refreshes
// each time the site deploys (08:00 and 16:00 UTC).

type Entry = {
  status: string;
  attempts?: number;
  startedAt?: string;
  committedAt?: string;
  publishedAt?: string;
  lastError?: string;
  note?: string;
};

const TOTAL_CHAPTERS = 1189;
// Same order the queue script walks; only the book names are needed here.
const BOOK_ORDER = [
  "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth", "1-samuel", "2-samuel",
  "1-kings", "2-kings", "1-chronicles", "2-chronicles", "ezra", "nehemiah", "esther", "job", "psalm", "proverbs",
  "ecclesiastes", "song-of-solomon", "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos",
  "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew",
  "mark", "luke", "john", "acts", "romans", "1-corinthians", "2-corinthians", "galatians", "ephesians", "philippians",
  "colossians", "1-thessalonians", "2-thessalonians", "1-timothy", "2-timothy", "titus", "philemon", "hebrews", "james", "1-peter",
  "2-peter", "1-john", "2-john", "3-john", "jude", "revelation",
];

function label(slug: string) {
  const match = slug.match(/^(.+)-(\d+)-explained$/);
  if (!match) return slug;
  const book = match[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return `${book} ${match[2]}`;
}

function sortKey(slug: string) {
  const match = slug.match(/^(.+)-(\d+)-explained$/);
  if (!match) return 1e9;
  return BOOK_ORDER.indexOf(match[1]) * 1000 + Number(match[2]);
}

function berlinDay(iso?: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(iso ? new Date(iso) : new Date());
}

function when(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

const STATUS_LABEL: Record<string, string> = {
  generating: "✍️ Writing",
  quality_check: "🔍 Checking",
  committed: "⏳ Waiting to go live",
  published: "✅ Live",
  failed: "⚠️ Failed, will retry",
  needs_louis: "🛑 Needs you",
};

export default function ChapterBlogProgressPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setIsOwner(data.user?.email === "moorelouis3@gmail.com");
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) return <div style={{ padding: 40, fontSize: 18 }}>Checking access…</div>;
  if (!isOwner) return <div style={{ padding: 40 }}>This page is private.</div>;

  const entries = Object.entries(progress.chapters as Record<string, Entry>).sort((a, b) => sortKey(a[0]) - sortKey(b[0]));
  const completed = entries.filter(([, e]) => e.status === "committed" || e.status === "published").length;
  const today = berlinDay();
  const writtenToday = entries.filter(([, e]) => e.committedAt && berlinDay(e.committedAt) === today).length;
  const lastDone = [...entries]
    .filter(([, e]) => e.status === "committed" || e.status === "published")
    .sort((a, b) => sortKey(b[0]) - sortKey(a[0]))[0];
  const problems = entries.filter(([, e]) => e.status === "failed" || e.status === "needs_louis");
  const recent = entries.slice(-15).reverse();
  const pct = Math.round((completed / TOTAL_CHAPTERS) * 1000) / 10;

  const card: React.CSSProperties = { border: "1px solid #e3e8f0", borderRadius: 16, padding: 16, background: "#fff" };

  return (
    <div style={{ padding: "28px 20px 100px", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 820, margin: "0 auto", color: "#1a1a1a" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>📚 Bible Chapter Library</h1>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 15 }}>
        One &quot;Explained&quot; article for every chapter of the Bible, {progress.dailyTarget} a day, in order. Updates each time the site publishes.
      </p>

      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 34, fontWeight: 900 }}>
          {completed} <span style={{ fontSize: 18, color: "#666", fontWeight: 700 }}>/ {TOTAL_CHAPTERS.toLocaleString()}</span>
        </div>
        <div style={{ height: 10, background: "#eef2f7", borderRadius: 99, marginTop: 10, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(pct, 0.5)}%`, height: "100%", background: "#0056fd" }} />
        </div>
        <div style={{ marginTop: 8, color: "#555", fontSize: 14 }}>
          {pct}% done · {(TOTAL_CHAPTERS - completed).toLocaleString()} to go · about {Math.ceil((TOTAL_CHAPTERS - completed) / progress.dailyTarget)} days left at {progress.dailyTarget}/day
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
        <div style={card}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>LAST FINISHED</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{lastDone ? label(lastDone[0]) : "—"}</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>NEXT UP</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{progress.nextChapter}</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>WRITTEN TODAY</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{writtenToday} / {progress.dailyTarget}</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>PROBLEMS</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: problems.length ? "#b45309" : "#15803d" }}>{problems.length || "None"}</div>
        </div>
      </div>

      {problems.length ? (
        <div style={{ ...card, marginBottom: 16, borderColor: "#fcd9a8", background: "#fffaf2" }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Needs attention</div>
          {problems.map(([slug, e]) => (
            <div key={slug} style={{ fontSize: 14, marginBottom: 6 }}>
              <strong>{label(slug)}</strong> · {STATUS_LABEL[e.status]} · tried {e.attempts || 0}x · {e.lastError}
            </div>
          ))}
        </div>
      ) : null}

      <div style={card}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Latest chapters</div>
        {recent.map(([slug, e]) => (
          <div key={slug} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14, padding: "6px 0", borderTop: "1px solid #f1f4f8" }}>
            <a href={`/blog/${slug}`} style={{ fontWeight: 700, color: "#0056fd" }}>{label(slug)}</a>
            <span style={{ color: "#555", textAlign: "right" }}>
              {STATUS_LABEL[e.status] || e.status} {when(e.publishedAt || e.committedAt || e.startedAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
