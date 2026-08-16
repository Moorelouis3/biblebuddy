/**
 * Reader skeleton.
 *
 * Used both by the route's loading.tsx, which covers the stretch before the
 * chapter page's JavaScript arrives, and by the page itself while the chapter
 * text is still being fetched. Sharing one component means the two run into
 * each other without the layout jumping.
 *
 * Deliberately neutral: it stands in for any chapter, not just Genesis 1.
 */
export default function ChapterReaderSkeleton() {
  const verseWidths = ["100%", "92%", "68%", "100%", "84%", "55%", "97%", "73%"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-2" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading chapter</span>

      <div className="mx-auto max-w-4xl animate-pulse">
        {/* Chapter and translation row, then the reader tabs */}
        <div className="mb-4 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3.5 py-3">
            <div className="h-6 w-32 rounded-md bg-slate-200" />
            <div className="h-7 w-16 rounded-xl bg-slate-100" />
          </div>
          <div className="flex">
            {[0, 1, 2].map((tab) => (
              <div key={tab} className="flex flex-1 justify-center px-2 py-3.5">
                <div className="h-4 w-20 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Player */}
        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 py-2">
          <div className="h-9 w-9 rounded-full bg-slate-100" />
          <div className="h-12 w-12 rounded-full bg-slate-200" />
          <div className="h-9 w-9 rounded-full bg-slate-100" />
          <div className="h-9 w-9 rounded-full bg-slate-100" />
        </div>

        {/* Scripture, with a card block standing in after some verses */}
        <div className="space-y-4">
          {verseWidths.map((width, index) => (
            <div key={width + index}>
              <div className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 shrink-0 rounded bg-slate-200" />
                <div className="h-5 rounded bg-slate-200" style={{ width }} />
              </div>

              {index === 0 || index === 3 ? (
                <div className="mt-3 space-y-2.5">
                  <div className="h-16 rounded-[14px] border border-slate-200 bg-white" />
                  <div className="h-16 rounded-[14px] border border-slate-200 bg-white" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
