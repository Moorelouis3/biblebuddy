"use client";

import { forwardRef } from "react";
import { toBlob } from "html-to-image";
import { shareContent, shareImage, type ShareOutcome } from "@/lib/nativeShare";

/**
 * The "share your streak" card (Bible Reading Streak, N DAYS, "I have read the
 * Bible N days straight!", Bible in One Year progress, MyBibleBuddy.net).
 *
 * It was built inside DashboardJourneyExperience as the dashboard's progress
 * slide, and was only reachable there once Home became HomeScreen. Louis,
 * 2026-11-22: "i want my share your streak back when u click on streak that
 * card we made to share should be there". So the card moved here unchanged,
 * and is used by:
 *
 * - DashboardJourneyExperience's progress slide (/plan), as before;
 * - StreakShareModal, opened by tapping the streak on Home.
 *
 * One card, one share routine. Do not copy the markup into a third place.
 */

export type StreakShareCardProps = {
  streakDays: number;
  /**
   * The Bible in One Year block. Left out when the reader is not on the plan,
   * so the card is just the streak.
   */
  bibleYear?: {
    currentDay: number;
    overallPercent: number;
    /** "Started" and "Progress" row; left out when the screen does not know them. */
    startDateLabel?: string | null;
    expectedFinishDateLabel?: string | null;
  } | null;
};

const StreakShareCard = forwardRef<HTMLDivElement, StreakShareCardProps>(function StreakShareCard(
  { streakDays, bibleYear },
  ref,
) {
  const shareStreakDays = Math.max(streakDays, 0);
  const currentDay = Math.max(1, Math.min(365, bibleYear?.currentDay ?? 1));
  const dayProgressPercent = Math.max(0, Math.min(100, Math.round((currentDay / 365) * 100)));
  const overallPercent = Math.max(0, Math.min(100, Math.round(bibleYear?.overallPercent ?? 0)));
  const remainingDays = Math.max(0, 365 - currentDay);
  const startDateLabel = bibleYear?.startDateLabel ?? null;
  const expectedFinishDateLabel = bibleYear?.expectedFinishDateLabel ?? null;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[22px] bg-[#f1f6fc] p-1.5 text-[var(--bb-text-primary,#111827)] shadow-[0_20px_48px_rgba(14,26,58,0.14)]"
    >
      <div className="relative overflow-hidden rounded-[20px] border-2 border-[#8eb6ff] bg-white px-3 py-3.5 shadow-[inset_0_0_0_3px_rgba(142,182,255,0.38)] sm:px-4 sm:py-4">
        <div className="pointer-events-none absolute inset-[8px] rounded-[14px] border border-[#8eb6ff]" aria-hidden="true" />

        {[
          "left-3 top-3",
          "right-3 top-3 rotate-90",
          "left-3 bottom-3 -rotate-90",
          "right-3 bottom-3 rotate-180",
        ].map((position) => (
          <div key={position} className={`pointer-events-none absolute ${position} text-[#8eb6ff] opacity-95`} aria-hidden="true">
            <svg width="70" height="70" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 82C11 53 11 35 27 19C36 10 49 7 68 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M13 61C16 49 22 40 31 31C38 24 49 20 63 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".75"/>
              <path d="M57 12C61 18 63 24 63 31C57 29 53 26 49 21C51 17 54 14 57 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M30 28C34 32 37 37 38 44C31 44 26 42 22 39C23 34 26 31 30 28Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M18 53C22 57 24 61 24 67C18 67 14 65 11 62C12 58 14 55 18 53Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M69 7C76 8 81 10 86 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M75 19C73 23 70 26 65 28C65 22 66 18 69 14C72 15 74 16 75 19Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[linear-gradient(180deg,#2567ff_0%,#0f4fe8_100%)] text-[20px] font-black text-white shadow-[0_8px_16px_rgba(37,103,255,0.22)]">
              B
            </div>
            <p className="text-[19px] font-black tracking-[-0.02em] text-[#10224b]">Bible Buddy</p>
          </div>

          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.32em] text-[#496ab3]">
            Bible Reading Streak
          </p>

          <div className="relative mx-auto mt-3 flex max-w-[300px] flex-col items-center text-center">
            <div className="pointer-events-none absolute top-3 h-[100px] w-[176px] bg-[radial-gradient(circle_at_center,rgba(37,103,255,0.14)_0%,rgba(37,103,255,0.08)_28%,transparent_72%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute top-3 h-[104px] w-[186px] opacity-80" aria-hidden="true">
              <svg viewBox="0 0 250 150" className="h-full w-full">
                {Array.from({ length: 17 }).map((_, index) => {
                  const x = 125 + Math.cos(((index - 8) * 10 * Math.PI) / 180) * 104;
                  const y = 118 - Math.sin(((index - 8) * 10 * Math.PI) / 180) * 104;
                  return <line key={index} x1="125" y1="118" x2={x} y2={y} stroke="#dce8ff" strokeWidth={index % 4 === 0 ? 2.4 : 1.5} strokeLinecap="round" />;
                })}
              </svg>
            </div>
            <div className="flex w-full items-center justify-between px-5 text-[#89a9ef]" aria-hidden="true">
              <span className="text-[20px]">&#10022;</span>
              <span className="text-[20px]">&#10022;</span>
            </div>
            <div className="relative mt-[-4px] text-[72px] font-black leading-none tracking-[-0.05em] text-[#1860ff] sm:text-[82px]">
              {shareStreakDays}
            </div>
            <div className="relative mt-[-8px] min-w-[116px] rounded-[6px] bg-[linear-gradient(180deg,#2567ff_0%,#1253eb_100%)] px-5 py-1.5 text-[16px] font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_20px_rgba(37,103,255,0.18)]">
              {shareStreakDays === 1 ? "DAY" : "DAYS"}
            </div>
            <p className="mt-4 text-[20px] font-black leading-tight tracking-[-0.03em] text-[#10224b]">
              I have read the Bible
              <br />
              {shareStreakDays} {shareStreakDays === 1 ? "day" : "days"} straight!
            </p>
          </div>

          {bibleYear ? (
          <>
          <div className="mt-4 flex items-center gap-3 text-[#89a9ef]" aria-hidden="true">
            <div className="h-px flex-1 bg-[#a6c2ff]" />
            <span className="text-[16px]">&#10022;</span>
            <div className="h-px flex-1 bg-[#a6c2ff]" />
          </div>

          <div className="mt-4 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#185cff]">Bible In One Year</p>
            <p className="mt-2 text-[28px] font-black leading-none tracking-[-0.04em] text-[#10224b] sm:text-[31px]">Day {currentDay} of 365</p>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e7efff]">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#2567ff_0%,#1454eb_100%)]" style={{ width: `${Math.max(2, dayProgressPercent)}%` }} />
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 text-[13px] font-semibold text-[#2f4c8c]">
            <span>{overallPercent}% completed</span>
            <span>{remainingDays} days left</span>
          </div>

          {startDateLabel || expectedFinishDateLabel ? (
          <>
          <div className="mt-4 flex items-center gap-3 text-[#89a9ef]" aria-hidden="true">
            <div className="h-px flex-1 bg-[#a6c2ff]" />
            <span className="text-[16px]">&#10022;</span>
            <div className="h-px flex-1 bg-[#a6c2ff]" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#185cff]">Started</p>
              <p className="mt-1 text-[15px] font-black text-[#10224b]">{startDateLabel}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#185cff]">Progress</p>
              <p className="mt-1 text-[13px] font-black text-[#10224b]">{expectedFinishDateLabel}</p>
            </div>
          </div>
          </>
          ) : null}
          </>
          ) : null}

          <div className="mt-4 border-t border-[#dbe7ff] pt-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#496ab3]">Start your Bible study streak at</p>
            <p className="mt-1 text-[14px] font-black uppercase tracking-[0.12em] text-[#1860ff] sm:text-[16px]">MyBibleBuddy.net</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StreakShareCard;

/**
 * Turns the card on screen into a picture and shares it. The same framing the
 * dashboard always used: the card at 1200px wide on a soft blue frame.
 *
 * Where a file cannot be shared, the picture is downloaded and the share text
 * copied, as before; the returned message says which.
 */
export async function renderStreakCardFile(node: HTMLElement, fileStem: string): Promise<File | null> {
  const blob = await (async () => {
    const cardBlob = await toBlob(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "var(--bb-cv-light-bg, #f8fbff)",
    });
    if (!cardBlob) return null;
    const cardBitmap = await createImageBitmap(cardBlob);
    const exportFrame = 28;
    const exportWidth = 1200;
    const availableWidth = exportWidth - exportFrame * 2;
    const scale = availableWidth / cardBitmap.width;
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = Math.round(cardBitmap.height * scale) + exportFrame * 2;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = "#f1f6fc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(cardBitmap, exportFrame, exportFrame, availableWidth, Math.round(cardBitmap.height * scale));
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  })().catch(() => null);

  return blob ? new File([blob], `${fileStem}.png`, { type: "image/png" }) : null;
}

/**
 * Pass `prepared` when the picture was made ahead of the tap (the modal does
 * this on open): Safari only opens a share sheet shortly after a tap, and
 * drawing the card takes seconds on a phone.
 */
export async function shareStreakCardImage(
  node: HTMLElement,
  fileStem: string,
  prepared?: File | null,
): Promise<{ outcome: ShareOutcome | "downloaded"; message: string | null }> {
  const shareText = "Check out my Bible progress from https://www.mybiblebuddy.net/";
  const file = prepared ?? (await renderStreakCardFile(node, fileStem));

  if (!file) {
    const outcome = await shareContent({ title: "Bible Buddy Progress", text: shareText });
    return { outcome, message: outcome === "copied" ? "Share text copied. Image export was not available on this device." : null };
  }

  const canShareFile =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (canShareFile) {
    const outcome = await shareImage({ title: "Bible Buddy Progress", text: shareText, file });
    return { outcome, message: outcome === "copied" ? "Share text copied." : null };
  }

  // A desktop browser with no file sharing: save the picture, copy the words.
  const objectUrl = URL.createObjectURL(file);
  try {
    const downloadLink = document.createElement("a");
    downloadLink.href = objectUrl;
    downloadLink.download = file.name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    try {
      await navigator.clipboard?.writeText(shareText);
    } catch {
      // The download is the main thing.
    }
    return { outcome: "downloaded", message: "Progress image downloaded and share text copied." };
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }
}
