import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("christmas-day-one-thing-to-carry");

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

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]">
      {children}
    </Link>
  );
}

export default function ChristmasDayOneThingToCarryPage() {
  return (
    <BlogPostShell
      slug="christmas-day-one-thing-to-carry"
      title={<>📖 Christmas Day: One Thing to Carry Into Today</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You are probably reading this on a phone.</p>
            <p>There are people in the house. Something is in the oven. Somebody needs you in about four minutes.</p>
            <p>So this will be short.</p>
            <p>
              📌 <strong>One passage. One idea. One thing to carry into today.</strong>
            </p>
            <p>
              Whatever this Christmas Day looks like, full house or quiet flat, good year or the
              hardest one yet, here is the sentence the angel said first.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Passage
        </h2>
        <VerseQuote
          text="And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord."
          reference="Luke 2:10 and 11"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is the first Christmas sermon. Two sentences, preached at night, to working men in
            a field who had no idea it was coming.
          </p>
          <p>
            There are three small phrases in it. If today gets loud, these are the ones to keep.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. &quot;Fear not&quot;</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is the first thing said, before any of the good news.</p>
          <p>And it was needed, because of what had just happened to them.</p>
        </div>
        <VerseQuote
          text="And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them: and they were sore afraid."
          reference="Luke 2:9"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Sore afraid. Not moved. Not inspired. The glory of God turned up in a dark field and
            terrified them.
          </p>
          <p>
            That order matters. God knew the announcement would land on frightened people, so He
            dealt with the fear before He delivered the message.
          </p>
          <p>
            ✅ <strong>You do not have to be calm before this day can mean something to you.</strong>{" "}
            The shepherds were not calm. The text says they were sore afraid, and the angel preached
            to them anyway. More on this in{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. &quot;This day&quot;</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not one day. Not soon. This day.</p>
          <p>
            Everything the shepherds had been waiting for had been a promise for centuries. On that
            night it stopped being a promise and became a date.
          </p>
          <p>
            Today is a date too. Not an idea about God, not a feeling you have to work up over
            lunch. Something that happened, in a town, under a named emperor, whether or not anyone
            in your house is in the mood for it.
          </p>
          <p>
            If today is heavy, that is worth holding. The truth of it does not depend on how the day
            goes. It does not depend on whether the food works, whether everyone shows up, or
            whether you manage to feel what you think you are supposed to feel.
          </p>
          <p>
            A date is a stubborn thing. It stays true in a full house and it stays true in an empty
            one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. &quot;Unto you&quot;</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the one to carry.</p>
          <p>Not born near you. Not born about you. Born <strong>unto</strong> you.</p>
          <p>
            And look who is being told. Not priests. Not the king. Men on a night shift, outside, in
            the dark, who could not have got into the temple in the clothes they were wearing.
          </p>
          <p>
            📌 <strong>The first people on earth to be told were the people least likely to be
            invited.</strong>
          </p>
          <p>
            Then the angel widens it further still. Good tidings of great joy, which shall be to all
            people. All. Including whoever is reading this with a knot in their stomach about the
            next few hours.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ One Thing to Carry Into Today
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here it is.</p>
          <p>
            <strong>He was born unto you, and today is the day.</strong>
          </p>
          <p>
            That is the whole thing. You do not have to get the day right for it to be true. You do
            not have to feel it at the table. You do not have to fix the relationship in the next
            room by this evening.
          </p>
          <p>
            When the day gets loud, or when it gets too quiet, say those nine words to yourself and
            go back to what you were doing.
          </p>
          <p>And one more small thing from the end of the story.</p>
        </div>
        <VerseQuote
          text="And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them."
          reference="Luke 2:20"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            They <strong>returned</strong>. To the field. Same sheep, same cold, same job they had
            walked away from a few hours before. The night did not get them a better life.
          </p>
          <p>
            What changed is that they went back praising. The circumstances were identical and the
            men were not.
          </p>
          <p>
            That is available to you tonight when the plates are done and the house goes quiet and
            tomorrow looks exactly like it was always going to look.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Quick Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What should I read on Christmas Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 2, verses 1 to 20. It is about four minutes. If you only have one, read verses 10 and
          11 and stop there. We go through the whole scene in{" "}
          <ArticleLink href="/blog/what-the-first-christmas-actually-looked-like">
            what the first Christmas actually looked like
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if I do not feel anything today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then you are in good company. Nobody in Luke 2 is described as feeling festive. Mary was
          exhausted, Joseph was far from home, and the shepherds were terrified. The day is an event
          before it is ever a mood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I handle a hard family day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Decide now where you will go for ten minutes if you need to, and let one true sentence be
          enough when somebody asks how you are. If the year behind you was the hard part, read{" "}
          <ArticleLink href="/blog/thanksgiving-when-the-year-has-been-hard">
            gratitude when the year has been hard
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it wrong to enjoy today when other people are struggling?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Guilt is not the same as compassion, and refusing to enjoy a good day has never once
          helped a person having a bad one. Enjoy the food, laugh at the bad joke, and then do
          something small and real for somebody this week. The angel said the joy was for all
          people, which means your joy today is not taken from anyone else&apos;s share of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were shepherds told first?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain it. What it shows is a pattern God keeps: He starts at the
          bottom of the room. The same pattern put a young woman from a small northern town at the
          centre of it, which we cover in{" "}
          <ArticleLink href="/blog/who-was-mary-mother-of-jesus">
            who Mary, the mother of Jesus, really was
          </ArticleLink>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Fear not came before the good news</strong>, because God knew who He was
            talking to.
          </p>
          <p>
            📌 <strong>This day means it already happened.</strong> Nothing today can undo it.
          </p>
          <p>
            📌 <strong>Unto you means you are not watching someone else&apos;s story.</strong>
          </p>
          <p>
            <strong>One thing to do today.</strong> Sometime before the day is over, find sixty
            seconds on your own and say thank you out loud. That is enough.
          </p>
          <p>Merry Christmas. 🙏</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
