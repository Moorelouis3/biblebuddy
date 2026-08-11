import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("bible-in-one-year-day-1");

// Swap in the real YouTube id once the Day 1 episode is published. While
// this is empty the post renders the placeholder card instead of an iframe
// so the page never ships a broken embed.
const YOUTUBE_VIDEO_ID = "";

function VideoEmbed({ day }: { day: number }) {
  return (
    <div className="mt-8">
      <div className="relative w-full overflow-hidden rounded-[24px] border border-[#DCE8FF] bg-[#0b1120] pb-[56.25%] shadow-[0_18px_48px_rgba(15,23,42,0.12)]">
        {YOUTUBE_VIDEO_ID ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
            title={`Bible in One Year Day ${day}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-4xl">▶️</p>
            <p className="text-base font-black uppercase tracking-[0.16em] text-white">
              Day {day} video
            </p>
            <p className="text-sm font-bold text-[#9db6e4]">Watch the full episode here</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-[#6d7789]">
        🎧 Prefer to listen? The full Day {day} audio is inside Bible Buddy.
      </p>
    </div>
  );
}

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

export default function BibleInOneYearDayOnePage() {
  return (
    <BlogPostShell
      slug="bible-in-one-year-day-1"
      title={<>📖 Bible in One Year Day 1: Creation of the World (Genesis 1-2)</>}
      intro={
        <>
          <VideoEmbed day={1} />
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>This is Day 1.</p>
            <p>The first page of the Bible, and the first day of the whole year.</p>
            <p>
              Below is the overview of the reading and the one big thing Genesis 1 and 2 want you to
              see about God before anything else in Scripture makes sense.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 What Day 1 Covers</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Day 1 takes you through <strong>Genesis 1 and 2</strong>. God creates the heavens and the
            earth. The earth starts out dark, shapeless, and empty. God speaks light into it. Then He
            forms the sky, the seas, and the dry land, and He fills them with sun, moon, stars, birds,
            fish, and animals. Last of all He makes human beings in His own image, male and female,
            blesses them, and hands them the care of the world.
          </p>
          <p>
            Genesis 2 covers the same beginning from closer in. God finishes the work, rests on the
            seventh day, and makes that day holy. Then the camera moves in tight on one man. God forms
            him from dust and breathes life into him. God plants a garden, gives him work, gives him
            almost total freedom with one boundary, and then says the first <strong>not good</strong>{" "}
            in the Bible. It is not good for the man to be alone. So God makes the woman. The chapter
            ends with two people who have nothing to hide.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🌑 God Is Not Scared Of Empty</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most people read Genesis 1 as an argument about how the world started.</p>
          <p>Read it again and notice where God actually shows up.</p>
          <p>Verse 2.</p>
        </div>
        <VerseQuote
          text="And the earth was without form, and void; and darkness was upon the face of the deep."
          reference="Genesis 1:2"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is the room God walks into.</p>
          <p>Not a finished world. Not a beautiful one.</p>
          <p>Dark. Shapeless. Nothing living in it.</p>
          <p>
            📌 <strong>The first page of the Bible does not open on beauty. It opens on empty.</strong>
          </p>
          <p>And God does not react the way we do.</p>
          <p>He does not panic.</p>
          <p>He does not back away.</p>
          <p>He does not wait for better conditions.</p>
          <p>He speaks. Let there be light. And there is light.</p>
          <p>
            💡 <strong>When God speaks, reality answers.</strong> That is the pattern the rest of
            Scripture is built on.
          </p>
        </div>

        <h3 className="mt-10 text-2xl font-black tracking-tight text-slate-950">Two problems, two answers</h3>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look closely at verse 2 and you will see two different problems named.</p>
          <p>The earth was <strong>without form</strong>. It had no shape.</p>
          <p>And it was <strong>void</strong>. There was nothing in it.</p>
          <p>Now watch how Genesis 1 answers them, in order.</p>
          <p>God spends the first three days giving the world shape.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🌅 Light separated from dark</li>
          <li>🌊 Sky separated from sea</li>
          <li>🌱 Dry land pulled up out of the water</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then God spends the next three days filling what He just shaped.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✨ Sun, moon, and stars fill the light</li>
          <li>🕊️ Birds and fish fill the sky and the sea</li>
          <li>🐂 Animals and people fill the land</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not decoration. That is deliberate.</p>
          <p>Day four fills day one. Day five fills day two. Day six fills day three.</p>
          <p>God shapes, then God fills.</p>
          <p>
            📌 <strong>God does not just clear out the emptiness. He answers it piece by piece, in an
            order He chose.</strong>
          </p>
          <p>And He is not quiet about how He feels while He does it.</p>
          <p>Over and over the text says God saw that it was good.</p>
          <p>Then at the end, with people standing in it, He calls it very good.</p>
          <p>God is not tolerating this world. He is delighting in it.</p>
        </div>

        <h3 className="mt-10 text-2xl font-black tracking-tight text-slate-950">The same pattern, up close</h3>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 2 does the same thing again. Smaller, and far more personal.</p>
        </div>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that slowly.</p>
          <p>God forms him. That is shape.</p>
          <p>God breathes into him. That is fullness.</p>
          <p>Dust with no breath is just a shape with nothing in it.</p>
          <p>
            The same God who shaped and filled a planet bends down and does it to one man. Powerful
            enough to speak stars into place. Close enough to breathe into a face.
          </p>
          <p>Then it happens a third time.</p>
        </div>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nothing is broken yet. Sin has not entered the story.</p>
          <p>But there is still an empty place.</p>
          <p>And God names it out loud before He fills it.</p>
          <p>
            ⚠️ Notice He does not shame the man for the emptiness. He does not tell him to be content
            with it. He calls it what it is, and then He does something about it.
          </p>
          <p>There is one more filling in this reading that is easy to read past.</p>
        </div>
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every person in that garden carried the image of God before they built anything, earned
            anything, or proved anything.
          </p>
          <p>
            📌 <strong>Your worth was put in you. It was not produced by you.</strong>
          </p>
          <p>Same pattern one more time. God fills what was empty, and what He puts in is His own likeness.</p>
        </div>

        <h3 className="mt-10 text-2xl font-black tracking-tight text-slate-950">What this means for you today</h3>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is why this matters on your very first day of reading.</p>
          <p>
            Before you learn a thing about sin, covenant, Israel, or the cross, God shows you His
            instinct. His instinct toward empty is to move into it and fill it.
          </p>
          <p>Not to walk away from it. Not to be disgusted by it.</p>
          <p>
            📌 <strong>The dark, formless, empty place is not where God is absent. It is where God
            starts.</strong>
          </p>
          <p>That should change how you read your own life.</p>
          <p>There is probably something in it right now that feels like verse 2.</p>
          <p>A part with no shape. A part with nothing in it.</p>
          <p>Maybe it is your prayer life. Maybe your work. Maybe a room that used to have someone in it.</p>
          <p>Genesis 1 does not promise you that every empty thing fills up on your schedule.</p>
          <p>It tells you something better, and more permanent, about who God is.</p>
          <p>
            ✅ <strong>He is not intimidated by nothing. He has done His best work starting from
            it.</strong>
          </p>
          <p>And there is one more thing hiding in the order.</p>
          <p>God shaped before He filled.</p>
          <p>The land came before the animals. The sky came before the birds.</p>
          <p>If your life feels like it is being shaped and not filled yet, you are not behind.</p>
          <p>You may just be on day three.</p>
          <p>Then, when the world was full, God did one thing nobody expects.</p>
          <p>He rested. And He made that day holy.</p>
          <p>The first thing called holy in the whole Bible is not a building and not a priest. It is a day.</p>
          <p>🕊️ Even rest was God filling something. He filled time.</p>
          <p>That is the God you meet on Day 1.</p>
          <p>
            He speaks into dark. He gives shape. He gives fullness. He gives dignity. He gives rest.
            And He does all of it before a single human being has done anything to earn it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Your Reflection For Day 1</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sit with this one before you move on.</p>
          <p>
            ❓ <strong>What part of your life still feels formless and empty, and what would change
            today if you believed God was already speaking over it?</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Go Deeper On Day 1 Inside Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This post is the overview.</p>
          <p>
            The <strong>full verse by verse breakdown</strong> of Genesis 1 and 2 lives inside{" "}
            <strong>Bible Buddy</strong>, along with the study notes for every section of the reading
            and the Day 1 trivia that checks what you actually caught.
          </p>
          <p>Inside you get:</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>📝 Study notes for every chapter you read</li>
          <li>🧠 Daily trivia on the passage you just finished</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 People reading the exact same chapters as you today</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is free to start. No pressure, no credit card. If you have never read Scripture
            straight through before, start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> and
            take it one day at a time.
          </p>
          <p>
            Thousands of Christians are already reading through the Bible this way. There is room for
            you.
          </p>
          <p>Sign up by clicking the button below. 👇</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔗 Keep Going In The Series</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⬅️ <strong>Previous:</strong> this is the start of the year. Here is the full{" "}
            <ArticleLink href="/reading-plans/bible-in-one-year">Bible in One Year reading plan</ArticleLink>.
          </p>
          <p>
            ➡️ <strong>Next:</strong>{" "}
            <ArticleLink href="/blog/bible-in-one-year-day-2">Bible in One Year Day 2: The Fall of Man (Genesis 3-4)</ArticleLink>
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
