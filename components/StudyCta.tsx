import Link from "next/link";

/**
 * In-article call to action pointing at a free study.
 *
 * Drop into any blog post to send a reader from what they were already curious
 * about straight into the relevant study:
 *
 *   <StudyCta
 *     slug="women-of-the-bible"
 *     title="Women of the Bible"
 *     description="A 21-day study through the women whose stories shaped Scripture — including Leah."
 *   />
 *
 * `slug` is resolved by app/study/[slug]/page.tsx, so articles never hardcode a
 * devotional UUID and links survive content being reseeded.
 *
 * The CTA deliberately does not say "create an account" or "start free trial".
 * There is nothing to sign up for and nothing to pay, so the button says what
 * actually happens next.
 */
export default function StudyCta({
  slug,
  title,
  description,
  days,
  ctaLabel,
}: {
  slug: string;
  title: string;
  description: string;
  /** Optional day count, e.g. 21 — shown as a small badge. */
  days?: number;
  /** Override the button text. Defaults to "Start studying — free". */
  ctaLabel?: string;
}) {
  return (
    <aside className="my-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm md:p-7">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Keep going
      </p>

      <h3 className="mt-2 text-xl font-bold text-gray-950 md:text-2xl">{title}</h3>

      {days ? (
        <p className="mt-1 text-sm font-semibold text-blue-800">{days}-day study</p>
      ) : null}

      <p className="mt-3 text-base leading-7 text-gray-700">{description}</p>

      <Link
        href={`/study/${slug}`}
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {ctaLabel || "Start studying — free"}
      </Link>

      <p className="mt-3 text-xs font-medium text-gray-500">
        No account needed. Bible Buddy is completely free.
      </p>
    </aside>
  );
}
