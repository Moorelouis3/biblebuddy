/**
 * The source list at the foot of a Christian News article (Louis, 2026-10-12).
 *
 * Every other kind of post on this blog links inward, through each page's own
 * ArticleLink helper. News has to link outward as well, to the paper or the
 * museum or the university that actually said the thing, because an article
 * about a disputed claim is only as good as the reader's ability to go and
 * check it.
 *
 * Deliberately plain: title, who published it, the year, and the link. The
 * `checkedOn` date is the honest part - research moves, and a reader three
 * years from now deserves to know when we last looked.
 *
 * External links open in a new tab and carry rel="noopener" and
 * rel="nofollow": we are citing these sites, not vouching for them, and
 * several of them are sources we are disagreeing with.
 */

export type ArticleSource = {
  title: string;
  publisher: string;
  /** Year, or a fuller date when it matters. Printed as given. */
  year?: string;
  url: string;
  /** One short line on what this source is, when it is not obvious. */
  note?: string;
};

export default function ArticleSources({
  sources,
  checkedOn,
}: {
  sources: ArticleSource[];
  checkedOn: string;
}) {
  return (
    <section className="mt-14">
      <h2 className="text-3xl font-black tracking-tight text-slate-950">📚 Sources</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Every claim in this article traces back to one of these. All links checked {checkedOn}.
      </p>
      <ol className="mt-6 space-y-4">
        {sources.map((source) => (
          <li
            key={source.url}
            className="rounded-2xl border border-[#e3e8f0] bg-white px-5 py-4 text-base leading-7"
          >
            <a
              href={source.url}
              target="_blank"
              rel="noopener nofollow"
              className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]"
            >
              {source.title}
            </a>
            <p className="mt-1 text-sm font-bold text-[#41506b]">
              {source.publisher}
              {source.year ? ` · ${source.year}` : ""}
            </p>
            {source.note ? <p className="mt-1 text-sm text-slate-600">{source.note}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
