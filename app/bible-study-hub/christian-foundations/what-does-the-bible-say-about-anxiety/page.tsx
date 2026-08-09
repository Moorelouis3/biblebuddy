import type { Metadata } from "next";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import Image from "next/image";

export const metadata: Metadata = {
  title: "What Does the Bible Say About Anxiety? | Bible Buddy",
  description:
    "What the Bible actually says about anxiety and worry: what Jesus taught, God's alternative to anxious thoughts, and practical ways to fight anxiety with Scripture.",
  alternates: {
    canonical: "/bible-study-hub/christian-foundations/what-does-the-bible-say-about-anxiety",
  },
};

function VerseQuote({ text, reference }: { text: string; reference: string }) {
  return (
    <blockquote className="mt-5 rounded-2xl border border-[#d7e5ff] bg-[#f7faff] px-6 py-5 text-lg italic leading-8 text-slate-700">
      <p>&quot;{text}&quot;</p>
      <footer className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#0056fd]">
        {reference}
      </footer>
    </blockquote>
  );
}

export default function WhatDoesTheBibleSayAboutAnxietyPage() {
  return (
    <BibleStudyHubArticleLayout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <Image
            src="/anxietyarticlebanner.jpg"
            alt="What the Bible Says About Anxiety banner"
            width={1600}
            height={1000}
            className="h-auto w-full rounded-[28px] object-cover shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            priority
          />
        </div>

        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          📖 What Does the Bible Say About Anxiety?
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
          <p>Anxiety does not knock first.</p>
          <p>It shows up in the middle of the night.</p>
          <p>It shows up before the doctor calls back.</p>
          <p>It shows up when the bank account is low and the bills are not.</p>
          <p>
            📌 <strong>If you struggle with anxious thoughts, you are not a bad Christian. You are a
            human being.</strong>
          </p>
          <p>And here is what might surprise you.</p>
          <p>The Bible never pretends anxiety isn&apos;t real.</p>
          <p>It talks about it constantly.</p>
          <p>Not to shame the anxious. To comfort them.</p>
          <p>
            Let&apos;s walk through what God&apos;s Word actually says about anxiety, and what He
            offers in its place.
          </p>
        </div>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🕰️ Anxiety Is Not a Modern Problem
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>We like to think anxiety was invented by smartphones and news feeds.</p>
            <p>It wasn&apos;t.</p>
            <p>
              📌 <strong>David</strong> wrote about lying awake at night, soaking his bed with tears.
            </p>
            <p>
              📌 <strong>Elijah</strong> won his greatest victory and then immediately spiraled into
              fear.
            </p>
            <p>
              📌 <strong>Martha</strong> was so anxious about serving dinner that she missed Jesus
              sitting in her living room.
            </p>
            <p>The people in Scripture were not calm, untroubled heroes.</p>
            <p>They were anxious people learning to trust a faithful God.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="In the multitude of my thoughts within me thy comforts delight my soul."
            reference="Psalm 94:19"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Notice what this verse admits.</p>
            <p>
              A <strong>multitude</strong> of thoughts.
            </p>
            <p>Racing thoughts. Crowded thoughts. Thoughts that will not sit still.</p>
            <p>The psalmist knew exactly what an anxious mind feels like.</p>
            <p>And he discovered that God&apos;s comfort could reach him right in the middle of it.</p>
            <p>Not after the thoughts stopped.</p>
            <p>
              <strong>In the multitude of them.</strong>
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🗣️ What Jesus Said About Worry
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Jesus gave more direct teaching about worry than almost any other daily struggle.</p>
            <p>That alone should tell you something.</p>
            <p>He knew His people would battle it.</p>
            <p>In the Sermon on the Mount, He points at the birds.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 They do not plant crops.</li>
            <li>🟢 They do not store food in barns.</li>
            <li>🟢 And they are fed, every single day, because your heavenly Father feeds them.</li>
          </ul>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Then Jesus asks a question that cuts straight through the noise.
          </p>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="Which of you by taking thought can add one cubit unto his stature?"
            reference="Matthew 6:27"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>In other words: has worrying ever actually worked?</p>
            <p>❓ Has it ever paid a bill?</p>
            <p>❓ Healed a diagnosis?</p>
            <p>❓ Fixed a relationship?</p>
            <p>Worry feels productive.</p>
            <p>It is not.</p>
            <p>
              ⚠️ <strong>Worry is suffering in advance.</strong>
            </p>
            <p>That is why Jesus finishes with this:</p>
          </div>
          <VerseQuote
            text="Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof."
            reference="Matthew 6:34"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              God gives grace <strong>one day at a time</strong>.
            </p>
            <p>
              When you borrow tomorrow&apos;s troubles, you are carrying them without
              tomorrow&apos;s grace.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🙏 God&apos;s Alternative to Anxiety
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>The Bible does not just say &quot;stop being anxious.&quot;</p>
            <p>That advice has never helped anyone.</p>
            <p>
              Instead, God gives anxiety a <strong>replacement</strong>.
            </p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."
            reference="Philippians 4:6"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              In the old King James language, &quot;be careful for nothing&quot; means{" "}
              <strong>&quot;be anxious about nothing.&quot;</strong>
            </p>
            <p>Look at what fills the space anxiety leaves behind:</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>
              🙏 <strong>Prayer</strong>
            </li>
            <li>
              🙏 <strong>Supplication</strong>
            </li>
            <li>
              🙏 <strong>Thanksgiving</strong>
            </li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Every worry becomes something to bring to God.</p>
            <p>Every anxious thought becomes raw material for prayer.</p>
            <p>And thanksgiving is not decoration.</p>
            <p>
              It is the part that retrains your heart to remember what God has already carried you
              through.
            </p>
            <p>Then comes one of the most beautiful promises in all of Scripture:</p>
          </div>
          <VerseQuote
            text="And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
            reference="Philippians 4:7"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              💡 The word <em>keep</em> there is a military word.
            </p>
            <p>
              It means <strong>to guard</strong>.
            </p>
            <p>Like a soldier standing watch at the gate.</p>
            <p>God&apos;s peace does not just visit your mind.</p>
            <p>
              <strong>It stands guard over it.</strong>
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🤝 You Were Never Meant to Carry It Alone
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Here is where anxiety lies to you.</p>
            <p>It tells you that everything depends on you.</p>
            <p>That if you stop gripping, everything falls apart.</p>
            <p>God says the opposite.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote text="Casting all your care upon him; for he careth for you." reference="1 Peter 5:7" />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              <strong>All</strong> your care.
            </p>
            <p>Not the small stuff while you keep the heavy things.</p>
            <p>All of it.</p>
            <p>
              And notice the reason attached: <em>for he careth for you.</em>
            </p>
            <p>You are not handing your worries to a distant God who processes requests.</p>
            <p>
              You are handing them to a <strong>Father who genuinely cares about you</strong>.
            </p>
          </div>
          <VerseQuote
            text="Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."
            reference="Isaiah 41:10"
          />
          <p className="mt-5 text-lg leading-8 text-slate-700">Count the promises in that one verse.</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>
              ✅ I am <strong>with thee</strong>
            </li>
            <li>
              ✅ I am <strong>thy God</strong>
            </li>
            <li>
              ✅ I will <strong>strengthen thee</strong>
            </li>
            <li>
              ✅ I will <strong>help thee</strong>
            </li>
            <li>
              ✅ I will <strong>uphold thee</strong>
            </li>
          </ul>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            📌 <strong>Five promises against one fear.</strong>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            💪 How To Fight Anxiety With Scripture
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Anxiety is rarely defeated by one big moment.</p>
            <p>
              It is defeated by <strong>small, daily habits</strong> that put truth in front of your
              fears.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Pray out loud when the anxious spiral starts. Name the worry to God specifically.</li>
            <li>
              🔲 Keep <strong>one verse</strong> with you each week. Write Philippians 4:6-7 on a card
              or your phone lock screen.
            </li>
            <li>
              🔲 Start your day in the Word <strong>before</strong> your inbox or news feed.
            </li>
            <li>
              🔲 End your prayers with thanksgiving. List three things God has already carried you
              through.
            </li>
            <li>
              🔲 Tell a trusted believer what you are anxious about. Hidden worries grow. Spoken ones
              shrink.
            </li>
            <li>
              🔲 Get enough sleep. Elijah&apos;s cure for despair started with food and rest. God cares
              about your body too.
            </li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>And one more thing, said plainly:</p>
            <p>
              ⚠️ If anxiety is crushing you day after day, seeing a doctor or counselor is not weak
              faith. God works through wise helpers too.
            </p>
            <p>Taking care of your mind honors the God who made it.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Anxiety says: everything depends on you.</p>
            <p>
              Scripture says: <strong>you are held by Someone stronger.</strong>
            </p>
            <p>Anxiety says: imagine every way this could go wrong.</p>
            <p>
              Scripture says: <strong>remember every way God has been faithful.</strong>
            </p>
            <p>You will probably not wake up tomorrow free of every anxious thought.</p>
            <p>That is okay.</p>
            <p>
              💡 <strong>Faith is not the absence of anxiety. Faith is where you carry it.</strong>
            </p>
            <p>
              Keep bringing your multitude of thoughts to the God whose comfort can delight your
              soul.
            </p>
            <p>He is not tired of hearing from you.</p>
            <p>He never will be.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Want To Go Deeper?</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              If anxious thoughts make it hard to focus when you read the Bible, you don&apos;t have
              to figure it out alone.
            </p>
            <p>
              Inside <strong>Bible Buddy</strong>, you&apos;ll find:
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>📖 Verse-by-verse Bible explanations</li>
            <li>🎧 Audio Bible reading plans you can listen to anywhere</li>
            <li>📝 Easy-to-understand study notes</li>
            <li>📅 Bible in One Year plans</li>
            <li>🌱 Daily devotionals</li>
            <li>🧠 Bible trivia and learning tools</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Everything is designed to help you understand Scripture without feeling overwhelmed.</p>
            <p>May the peace that passeth all understanding guard your heart and mind today. 🙏</p>
          </div>
        </section>
      </article>
    </BibleStudyHubArticleLayout>
  );
}
