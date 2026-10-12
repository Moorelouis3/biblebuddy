import type { ReactNode } from "react";

/**
 * The two boxes every Christian News article carries: what is actually
 * established, and what is still open (Louis, 2026-10-12).
 *
 * It is a component rather than two hand written sections on purpose. A news
 * category about discoveries and disputed claims lives or dies on whether the
 * honesty is structural or left to whoever is writing that day. If the
 * template demands both lists, nobody can quietly publish an article that only
 * has the exciting half.
 *
 * Rules for the writer:
 *  - Both lists must be non-empty. A story with nothing uncertain is not news,
 *    it is teaching, and it belongs in another category.
 *  - Each line is one claim, stated plainly, no hedging adverbs.
 *  - "Established" means a named source could be cited for it. Not "most
 *    people think" and not "it seems likely".
 */
export default function ClaimStatus({
  established,
  uncertain,
}: {
  established: ReactNode[];
  uncertain: ReactNode[];
}) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl border border-[#bfe6cd] bg-[#f3fbf6] px-6 py-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1c7a4a]">
          ✅ What is established
        </p>
        <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
          {established.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span aria-hidden="true" className="text-[#1c7a4a]">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-[#f0dcae] bg-[#fdf9ef] px-6 py-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9a6b10]">
          ⚠️ What is still uncertain
        </p>
        <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
          {uncertain.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span aria-hidden="true" className="text-[#9a6b10]">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
