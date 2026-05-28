import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-6 py-10 text-[#07162f]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#135397]">Bible Buddy</Link>
        <h1 className="mt-10 font-serif text-5xl font-black leading-tight">How Bible Buddy works</h1>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#526075]">
          Bible Buddy gives you one simple daily rhythm: listen to the guided lesson, understand the passage, reflect on what you learned, and keep moving through Scripture one day at a time.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["1. Listen", "Play the daily cinematic Bible audio lesson."],
            ["2. Understand", "Read a clear summary and helpful notes."],
            ["3. Reflect", "Answer simple prompts and review what you learned."],
            ["4. Stay on track", "Build your streak and finish the Bible consistently."],
          ].map(([title, copy]) => (
            <section key={title} className="rounded-lg border border-[#eadfcd] bg-white/80 p-6">
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 font-semibold leading-7 text-[#526075]">{copy}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
