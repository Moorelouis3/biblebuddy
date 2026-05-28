import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-6 py-10 text-[#07162f]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#135397]">Bible Buddy</Link>
        <h1 className="mt-10 font-serif text-5xl font-black leading-tight">FAQ</h1>
        <div className="mt-10 grid gap-5">
          {[
            ["Is Bible Buddy free to start?", "Yes. You can start your Bible journey free and upgrade later if you want deeper tools."],
            ["How long is each day?", "Most days are designed to fit into about 15-30 minutes."],
            ["Can I listen while doing other things?", "Yes. Bible Buddy is audio-first, so it works while driving, walking, cleaning, or working out."],
            ["What is the goal?", "To help you understand Scripture and finish the Bible one day at a time."],
          ].map(([question, answer]) => (
            <section key={question} className="rounded-lg border border-[#eadfcd] bg-white/80 p-6">
              <h2 className="text-xl font-black">{question}</h2>
              <p className="mt-3 font-semibold leading-7 text-[#526075]">{answer}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
