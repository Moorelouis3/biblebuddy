import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blogContent";

// Custom 404 (2026-09-09 blog audit). Next's default is a bare "404 | This
// page could not be found" on a white screen - the surest way to lose
// someone who followed an old or mistyped link. A dead end is now a way
// back in, with the newest studies to land on.
export const metadata = { title: "Page not found | Bible Buddy" };

export default function NotFound() {
  const recent = [...BLOG_ARTICLES]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 4);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-16 text-slate-950">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0056fd]">Page not found</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
        That page moved, or never existed
      </h1>
      <p className="mt-3 text-base font-semibold leading-7 text-[#41506b]">
        Nothing is broken on your end. Try one of these instead.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-2xl bg-[#0056FD] px-6 py-3 text-sm font-black text-white shadow-[0_16px_36px_rgba(0,86,253,0.22)]"
        >
          Start studying
        </Link>
        <Link
          href="/blog"
          className="rounded-2xl border border-[#dce8ff] bg-white px-6 py-3 text-sm font-black text-[#0056fd]"
        >
          Read the blog
        </Link>
      </div>

      <section aria-labelledby="notfound-recent" className="mt-10 border-t border-[#dce8ff] pt-7">
        <h2 id="notfound-recent" className="text-lg font-black tracking-tight">
          Latest studies
        </h2>
        <ul className="mt-3 space-y-2">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.canonicalPath}
                className="block rounded-2xl border border-[#dce8ff] bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-[#0056fd]"
              >
                {post.title}
                <span className="ml-2 text-xs font-bold text-[#6d7789]">{post.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
