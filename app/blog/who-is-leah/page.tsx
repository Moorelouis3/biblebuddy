import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-is-leah", {
  title: "Who Is Leah in the Bible? The Wife Her Husband Didn't Want",
});

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

export default function WhoIsLeahPage() {
  return (
    <BlogPostShell
      slug="who-is-leah"
      title={<>📖 Who Is Leah? The Wife Her Husband Didn&apos;t Want</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
          <p>Some people in the Bible get statues.</p>
          <p>Leah got a footnote.</p>
          <p>Her own wedding was a trick.</p>
          <p>Her husband loved her sister.</p>
          <p>Her whole life, she was the one who wasn&apos;t chosen.</p>
          <p>
            📌 <strong>If you have ever felt overlooked, second-best, or unwanted, Leah&apos;s story
            is for you.</strong>
          </p>
          <p>Because the God of the Bible has a habit.</p>
          <p>He sees the person everyone else looks past.</p>
        </div>
        </>
      }
    >
      <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            💍 A Wedding Built on a Lie
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Leah was the older daughter of a man named Laban.</p>
            <p>Her younger sister was Rachel.</p>
            <p>
              Scripture is blunt about the comparison: Rachel was beautiful, and Jacob was in love
              with her.
            </p>
            <p>Jacob worked seven years for Rachel&apos;s hand.</p>
            <p>But on the wedding night, Laban switched his daughters.</p>
            <p>Jacob woke up married to Leah.</p>
            <p>Imagine being Leah in that morning light.</p>
            <p>Your husband&apos;s face falling when he sees you.</p>
            <p>Knowing you were the trick.</p>
            <p>
              Jacob then worked seven more years for Rachel, and Leah spent her marriage sharing her
              husband with the sister he actually wanted.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            👀 The God Who Sees the Unloved
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Here is where the story turns.</p>
            <p>Everyone overlooked Leah.</p>
            <p>God didn&apos;t.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="And when the LORD saw that Leah was hated, he opened her womb: but Rachel was barren."
            reference="Genesis 29:31"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Read those first words again: <strong>when the LORD saw</strong>.
            </p>
            <p>Nobody else was looking at Leah.</p>
            <p>God was.</p>
            <p>
              💡 The word &quot;hated&quot; here means unloved, second, rejected - and God moved
              toward her, not away from her.
            </p>
            <p>While the favored sister waited, God blessed the forgotten one.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            👶 The Names That Tell Her Heart&apos;s Story
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Leah named her sons after her pain.</p>
            <p>You can hear her heart change, one baby at a time.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>
              📌 <strong>Reuben</strong> - &quot;the LORD hath looked upon my affliction... now my
              husband will love me.&quot;
            </li>
            <li>
              📌 <strong>Simeon</strong> - &quot;the LORD hath heard that I was hated.&quot;
            </li>
            <li>
              📌 <strong>Levi</strong> - &quot;now will my husband be joined unto me.&quot;
            </li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Three sons.</p>
            <p>Three hopes that Jacob would finally love her.</p>
            <p>It never worked.</p>
            <p>Then came the fourth son.</p>
            <p>And something changed.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="And she conceived again, and bare a son: and she said, Now will I praise the LORD: therefore she called his name Judah; and left bearing."
            reference="Genesis 29:35"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>No mention of Jacob this time.</p>
            <p>No &quot;now my husband will love me.&quot;</p>
            <p>
              Just: <strong>&quot;Now will I praise the LORD.&quot;</strong>
            </p>
            <p>
              💡 Somewhere between son three and son four, Leah stopped building her worth on a man
              who would not love her, and set it on the God who always had.
            </p>
            <p>That is one of the quietest, biggest victories in the whole Bible.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            👑 The Unwanted Wife in the Family Tree of Jesus
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Here is the part that should give you chills.</p>
            <p>That fourth son, Judah, became a tribe.</p>
            <p>From the tribe of Judah came King David.</p>
            <p>And from the line of David came Jesus Christ.</p>
            <p>
              📌 <strong>The Messiah did not come through the loved and chosen sister. He came
              through Leah.</strong>
            </p>
            <p>The rejected wife became a mother of the King of Kings.</p>
            <p>And there is one more quiet detail.</p>
            <p>
              At the end of his life, Jacob asked to be buried in the family tomb of Abraham - where
              he himself had buried Leah. Not Rachel. Leah.
            </p>
          </div>
          <VerseQuote
            text="There they buried Abraham and Sarah his wife; there they buried Isaac and Rebekah his wife; and there I buried Leah."
            reference="Genesis 49:31"
          />
          <p className="mt-5 text-lg leading-8 text-slate-700">
            In the end, the wife nobody wanted rests with the fathers and mothers of the faith.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            💪 What Leah Teaches Us
          </h2>
          <ul className="mt-6 space-y-3 text-lg leading-8 text-slate-700">
            <li>✅ Being unchosen by people does not mean being unchosen by God.</li>
            <li>✅ God sees the one everyone else looks past - and moves toward her.</li>
            <li>
              ✅ Chasing love from someone who will not give it will break your heart four times in a
              row. Anchoring in God&apos;s love sets it free.
            </li>
            <li>✅ Your pain can carry a purpose far bigger than you will ever see in your lifetime.</li>
            <li>✅ &quot;Now will I praise the LORD&quot; is a decision, not a feeling.</li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Maybe you know Leah&apos;s ache.</p>
            <p>Passed over. Compared. Tolerated instead of treasured.</p>
            <p>Hear this clearly:</p>
            <p>
              💡 <strong>The God who saw Leah sees you.</strong>
            </p>
            <p>Not the version of you that performs for acceptance.</p>
            <p>You.</p>
            <p>
              And He is able to write a story through your life that no one - including you - would
              ever expect.
            </p>
            <p>He did it with Leah.</p>
            <p>He has not changed.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Want To Go Deeper?</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Leah&apos;s whole story is in Genesis 29-30, and you don&apos;t have to read it alone.
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
            <p>May you know today that you are seen, chosen, and loved by God. 🙏</p>
          </div>
        </section>
    </BlogPostShell>
  );
}
