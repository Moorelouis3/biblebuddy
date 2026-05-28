import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-6 py-10 text-[#07162f]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#135397]">Bible Buddy</Link>
        <h1 className="mt-10 font-serif text-5xl font-black leading-tight">Features</h1>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#526075]">
          Bible Buddy is built around cinematic audio lessons, simple summaries, deeper study notes, reflection, trivia, streaks, and Bible progress tracking.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {["Audio-first daily lessons", "Chapter summaries", "Study notes", "Trivia and reflection", "Journey map", "Streak and progress tracking"].map((feature) => (
            <section key={feature} className="rounded-lg border border-[#eadfcd] bg-white/80 p-6 text-lg font-black">
              {feature}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
