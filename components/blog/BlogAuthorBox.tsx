import Image from "next/image";
import Link from "next/link";

// Author box (2026-09-09 blog audit). Google's quality guidelines lean hard
// on who wrote a page and why they are worth trusting - it is one of the
// clearest gaps between a hobby blog and a real one, and Bible teaching is
// exactly the kind of subject where that judgement gets applied. The
// BlogPosting schema already names Louis as author; this is the human-
// readable half that a reader (and a rater) actually sees.
export default function BlogAuthorBox() {
  return (
    <section
      aria-labelledby="blog-author-heading"
      className="mt-10 rounded-[24px] border border-[#dce8ff] bg-[#f7fbff] p-5"
    >
      <div className="flex items-start gap-4">
        <Image
          src="/Biblebuddyicon.png"
          alt="Louis, founder of Bible Buddy"
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full bg-white object-contain ring-1 ring-[#dce8ff]"
        />
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">Written by</p>
          <h2 id="blog-author-heading" className="mt-0.5 text-lg font-black tracking-tight text-slate-950">
            Louis, founder of Bible Buddy
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#41506b]">
            I built Bible Buddy because I kept getting stuck reading the Bible on my own, needing a notebook, three
            apps and a search engine just to understand a few verses. Every study here is written the way I wish
            someone had explained it to me: plain language, the verses printed where they happen, and no assumption
            that you already know the background.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
            <Link href="/blog" className="rounded-full bg-white px-3 py-1.5 text-[#0056fd] ring-1 ring-[#dce8ff]">
              All studies
            </Link>
            <Link href="/contact" className="rounded-full bg-white px-3 py-1.5 text-[#0056fd] ring-1 ring-[#dce8ff]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
