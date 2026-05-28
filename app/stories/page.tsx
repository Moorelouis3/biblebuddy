import Link from "next/link";

const stories = [
  "I listen every morning while getting ready for work. It centers my day.",
  "I play one lesson on the way to work and another on the way home.",
  "For the first time, Bible study fits the life I actually have.",
];

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-6 py-10 text-[#07162f]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#135397]">Bible Buddy</Link>
        <h1 className="mt-10 font-serif text-5xl font-black leading-tight">Stories</h1>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#526075]">
          Real-life moments from people building a daily Bible rhythm with Bible Buddy.
        </p>
        <div className="mt-10 grid gap-5">
          {stories.map((story) => (
            <blockquote key={story} className="rounded-lg border border-[#eadfcd] bg-white/80 p-7 font-serif text-3xl font-black leading-tight">
              &ldquo;{story}&rdquo;
            </blockquote>
          ))}
        </div>
      </div>
    </main>
  );
}
