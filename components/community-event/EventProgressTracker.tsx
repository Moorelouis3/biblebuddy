"use client";

/**
 * A member's 31-day tracker on the event page. Real completion only (see
 * useEventProgress). Tone is encouraging: missed days are neutral, never red,
 * and every cell opens that day's study so catching up is one tap away.
 *
 * Phones: 7 columns (a week per row). Wider screens: 11 columns.
 */

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CommunityEvent, CommunityEventState } from "../../lib/communityEvents";
import { eventDayStudyPath } from "../../lib/communityEventDays";

function paceLine(state: CommunityEventState, completed: Set<number>, total: number, doneCount: number) {
  if (state.phase === "evergreen") {
    if (doneCount >= total) return `You finished all ${total} days. Well done!`;
    return doneCount > 0 ? "Keep going at your own pace — every day is open." : "Start whenever you're ready — every day is open.";
  }
  if (state.phase === "countdown") {
    return doneCount > 0
      ? `You've got a head start — ${doneCount} day${doneCount === 1 ? "" : "s"} done before the group begins.`
      : "Your days will fill in here as you complete them.";
  }
  const today = state.communityDay;
  if (doneCount > today) return "You're ahead of the group. Keep it up!";
  let pastMissed = 0;
  for (let d = 1; d < today; d += 1) if (!completed.has(d)) pastMissed += 1;
  if (pastMissed === 0 && completed.has(today)) return "You're right on pace with the group.";
  if (pastMissed === 0) return "You're on pace — today's study is waiting for you.";
  return "Catch up anytime — every past day stays open.";
}

export default function EventProgressTracker({
  event,
  state,
  completedDays,
}: {
  event: CommunityEvent;
  state: CommunityEventState;
  completedDays: Set<number>;
}) {
  const total = event.totalDays;
  let doneCount = 0;
  for (let d = 1; d <= total; d += 1) if (completedDays.has(d)) doneCount += 1;
  const pct = Math.round((doneCount / total) * 100);
  const today = state.phase === "live" ? state.communityDay : null;

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 sm:p-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a57d2c]">Your progress</p>
      <h2 className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">
        {doneCount} of {total} days completed
      </h2>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={doneCount}
        aria-label={`${doneCount} of ${total} days completed`}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #f0d489 0%, #cfa147 100%)" }}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
        {paceLine(state, completedDays, total, doneCount)}
      </p>

      <ol className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-11 sm:gap-2">
        {Array.from({ length: total }, (_, i) => {
          const day = i + 1;
          const done = completedDays.has(day);
          const isToday = today === day;
          const isFuture = state.phase === "countdown" || (today !== null && day > today);

          let cls =
            "border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f4f6)] text-[var(--bb-text-primary,#111827)]";
          let style: CSSProperties | undefined;
          if (done) {
            cls = `border border-[#cfa147] text-[#221503]${isToday ? " ring-2 ring-[#cfa147]/60 ring-offset-1" : ""}`;
            style = { background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" };
          } else if (isToday) {
            cls = "border-2 border-[#cfa147] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#111827)] ring-2 ring-[#f0d489]/50";
          } else if (isFuture) {
            cls =
              "border border-dashed border-[var(--bb-card-border,#dbe7f4)] bg-transparent text-[var(--bb-text-muted,#6b7280)] opacity-60";
          }

          const label = `Day ${day}${done ? ", completed" : isToday ? ", today" : isFuture ? ", upcoming" : ""}`;

          return (
            <li key={day} className="min-w-0">
              <Link
                href={eventDayStudyPath(event.devotionalId, day)}
                aria-label={label}
                title={label}
                aria-current={isToday ? "date" : undefined}
                className={`relative flex aspect-square w-full flex-col items-center justify-center rounded-lg text-xs font-black leading-none transition hover:brightness-95 sm:text-sm ${cls}`}
                style={style}
              >
                <span>{day}</span>
                {done ? (
                  <span aria-hidden="true" className="mt-0.5 text-[10px] leading-none sm:text-xs">
                    ✓
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
