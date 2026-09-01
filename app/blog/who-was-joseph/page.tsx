import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-joseph", {
  title: "Who Was Joseph? From the Pit to the Palace",
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

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]">
      {children}
    </Link>
  );
}

export default function WhoWasJosephPage() {
  return (
    <BlogPostShell
      slug="who-was-joseph"
      title={<>📖 Who Was Joseph? From the Pit to the Palace</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody you trusted turned on you.</p>
            <p>A door you did not deserve got slammed shut anyway.</p>
            <p>And now you are sitting in a season that makes no sense, wondering if God even sees it.</p>
            <p>
              📌 <strong>That is exactly where the story of Joseph in the Bible starts. A favorite
              son, thrown in a pit by his own brothers, and sold like property.</strong>
            </p>
            <p>
              If you have ever typed &quot;who was Joseph in the Bible&quot; into your phone, you
              are probably not just curious about ancient history.
            </p>
            <p>You want to know if God can actually work something good out of a mess this bad.</p>
            <p>
              This is the full story, told in order, straight from Genesis. The dreams. The pit.
              Potiphar&apos;s house. The prison. The rise to power no one saw coming. And the moment
              Joseph looked his own betrayers in the face and chose forgiveness instead of revenge.
            </p>
            <p>Let&apos;s walk through it together.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Joseph Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph was one of the twelve sons of Jacob, the patriarch also called Israel.</p>
          <p>
            His mother was Rachel, the wife Jacob loved most, though he had first been tricked into
            marrying her older sister <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>.
            Joseph was born to Rachel late in Jacob&apos;s life, which is why he was the favorite.
            Not because he was the youngest.
          </p>
          <p>
            📌 A lot of retellings get that wrong. Benjamin, Joseph&apos;s only full brother, was the
            actual youngest, and stayed home while the older brothers tended the flocks.
          </p>
          <p>
            His story runs from <strong>Genesis 37</strong> through <strong>Genesis 50</strong>. He
            was seventeen when it turns dark, and would not see his father again for over twenty
            years.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Joseph&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Dreams That Made His Brothers Hate Him</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jacob loved Joseph more than his other sons and made him a special coat.</p>
          <p>His brothers noticed. They hated him for it.</p>
          <p>Then Joseph made it worse. He had a dream and told it to them anyway.</p>
        </div>
        <VerseQuote
          text="And Joseph dreamed a dream, and he told it his brethren: and they hated him yet the more. And he said unto them, Hear, I pray you, this dream which I have dreamed: For, behold, we were binding sheaves in the field, and, lo, my sheaf arose, and also stood upright; and, behold, your sheaves stood round about, and made obeisance to my sheaf. And his brethren said to him, Shalt thou indeed reign over us? or shalt thou indeed have dominion over us? And they hated him yet the more for his dreams, and for his words."
          reference="Genesis 37:5 through 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then came a second dream, the sun, moon, and eleven stars bowing to him, and even his
            father rebuked him for it. Joseph was not tactful here, and that does not excuse what
            happened next, but it is part of the honest picture.
          </p>
          <p>By the time his brothers saw him coming across the field, they had a plan.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Sold Into Slavery, Faithful in Potiphar&apos;s House</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            His brothers stripped him of his coat and threw him into an empty pit. Reuben quietly
            planned to rescue him later, but Judah had a different idea.
          </p>
          <p>
            📌 A caravan of traders passed by, and the brothers sold Joseph for{" "}
            <strong>twenty pieces of silver</strong>, not thirty. That is often confused with the
            thirty pieces Judas later took to betray Jesus, but Scripture keeps the two separate.
          </p>
          <p>Joseph ended up a slave in the house of Potiphar, an Egyptian official. And Scripture says something remarkable right in the middle of that loss.</p>
        </div>
        <VerseQuote
          text="And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian."
          reference="Genesis 39:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Not after Joseph got promoted. In the house of a slave owner. God&apos;s presence did
            not wait for his circumstances to improve. It was already there.
          </p>
          <p>Joseph rose to run Potiphar&apos;s whole household. Then it fell apart again.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Falsely Accused and Forgotten in Prison</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Potiphar&apos;s wife tried repeatedly to pull Joseph into bed with her. He refused every
            time, showing{" "}
            <ArticleLink href="/blog/building-self-control">self control</ArticleLink> with no one
            watching but God. One day she grabbed his garment as he fled, and used it as evidence
            against him.
          </p>
          <p>Joseph did nothing wrong and lost everything anyway. He was thrown into prison, and once again, Scripture repeats the same line on purpose.</p>
        </div>
        <VerseQuote
          text="But the LORD was with Joseph, and shewed him mercy, and gave him favour in the sight of the keeper of the prison."
          reference="Genesis 39:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sold unfairly, God was with him. Accused unfairly, God was with him.</p>
          <p>
            📌 <strong>God&apos;s presence was not a reward for Joseph&apos;s circumstances
            improving. It was the constant underneath every single one of them.</strong>
          </p>
          <p>
            In prison Joseph correctly interpreted dreams for Pharaoh&apos;s cupbearer and baker,
            and asked to be remembered once free. The cupbearer forgot him for two full years.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. From the Prison to Pharaoh&apos;s Right Hand</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eventually Pharaoh had two troubling dreams no one could explain, and the cupbearer
            finally remembered Joseph. Pulled from prison to stand before the king, Joseph gave God
            the credit, then said what the dreams meant: seven years of plenty in Egypt, followed by
            seven years of severe famine.
          </p>
          <p>
            Pharaoh put him over the whole house of Egypt, second in command to Pharaoh alone. Joseph
            went from a prison cell to the most powerful man in the nation, apart from the king, in a
            single day. He was thirty years old. Thirteen years had passed since the pit.
          </p>
          <p>
            💡 God did not rush Joseph&apos;s story to protect him from thirteen hard years. He was
            present in every one of them, working toward something Joseph could not yet see.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Famine, the Reunion, and the Test</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The famine reached Canaan, and Jacob sent his sons to Egypt for grain. His ten brothers
            bowed before the governor of Egypt, exactly like Joseph&apos;s teenage dream, not
            recognizing the brother they had sold. He recognized them instantly.
          </p>
          <p>
            Instead of revealing himself right away, Joseph tested them. Would they abandon their
            youngest brother Benjamin the way they had once abandoned him? They would not. Judah,
            the brother who had suggested selling Joseph, offered his own life for
            Benjamin&apos;s freedom. That was the moment Joseph could not hold it in any longer.
          </p>
        </div>
        <VerseQuote
          text="And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt. Now therefore be not grieved, nor angry with yourselves, that ye sold me hither: for God did send me before you to preserve life."
          reference="Genesis 45:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He wept so loudly the whole palace heard it.</p>
          <p>
            📌 <strong>He did not lead with the wrong done to him. He led with grace.</strong>
          </p>
          <p>Joseph brought his whole family, seventy people, down to Egypt to live through the famine.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. &quot;Ye Thought Evil, But God Meant It Unto Good&quot;</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Years later, Jacob died. And Joseph&apos;s brothers panicked.</p>
          <p>
            They assumed Joseph had only been kind to them because their father was alive to see
            it. Now that he was gone, they braced for the revenge that{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              fear
            </ArticleLink>{" "}
            told them was coming.
          </p>
          <p>They came to Joseph, bowed down, and begged for mercy.</p>
          <p>Joseph&apos;s answer is the verse the whole story has been building toward.</p>
        </div>
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what Joseph does not say. He does not say the evil never happened, or that it did not cost him something real.</p>
          <p>He holds both things at once. What you did was evil. And God used it for good.</p>
          <p>
            💡 That is not the same as saying God caused the brothers to sin. It means God is
            skilled enough to work His purposes even through what other people mean for harm.
          </p>
          <p>
            This overview only scratches the surface of Genesis 37 through 50. Inside{" "}
            <strong>Bible Buddy</strong>, you can walk through Joseph&apos;s whole life verse by
            verse, completely free.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Joseph&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God&apos;s presence is not tied to your circumstances</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Slave or prisoner, ruler or forgotten man, the LORD was with Joseph the whole time.</p>
          <p>❓ Where do you assume God is absent simply because things are hard right now?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Integrity in private seasons matters</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nobody was watching Joseph refuse Potiphar&apos;s wife except God, and he stayed faithful in a moment that cost him, long before anyone rewarded it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Forgiveness does not require pretending nothing happened</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joseph named the evil plainly, then forgave without minimizing what was done
            to him. Real forgiveness can hold both truths.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Joseph&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 39:2</h3>
        <VerseQuote
          text="And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian."
          reference="Genesis 39:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 This is stated while Joseph is still enslaved. Prosperity here is not wealth. It is God&apos;s hand on a man in a place he never chose.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 50:20</h3>
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The theme verse of Genesis. Two wills, working over the same events, do not cancel
            each other out. God&apos;s purpose stands over human evil without erasing human
            responsibility for it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Joseph</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Joseph the youngest son of Jacob?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, Benjamin was. Joseph was the favorite because he was born to Rachel in Jacob&apos;s old
          age, and that favoritism, not birth order, is what stirred his brothers&apos; jealousy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many pieces of silver was Joseph sold for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Twenty, according to Genesis 37:28. That is often confused with the thirty pieces of
          silver Judas was later paid to betray Jesus, but Scripture keeps the two figures distinct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long was Joseph a slave and prisoner in Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          About thirteen years. Joseph was seventeen when his brothers sold him and thirty when he
          stood before Pharaoh, according to Genesis 37:2 and 41:46.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Joseph when he died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          One hundred and ten years old, according to Genesis 50:26. Before he died he made his
          family promise to carry his bones out of Egypt when God eventually brought them into the
          promised land, a promise{" "}
          <ArticleLink href="/blog/moses">Moses</ArticleLink> and Israel kept generations later
          during the exodus.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph&apos;s story is not really about a coat, or a pit, or even a throne.</p>
          <p>
            📌 <strong>It is about a God who does not waste seasons, even the ones that make no
            sense at the time. And a man who stayed faithful in a slave&apos;s house, a prison
            cell, and a palace, because his character was never up for negotiation.</strong>
          </p>
          <p>
            You may not be in a pit or a prison. But you may be in a season you did not choose and
            cannot explain. Joseph&apos;s life says that season is not empty. God is present in it,
            even now.
          </p>
          <p>
            Read Genesis 37 through 50 for yourself this week, and watch how one man&apos;s worst
            days became the very thing that saved a nation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph&apos;s full story runs fourteen chapters, from Genesis 37 to Genesis 50, and it
            rewards a slow read. If you are not sure where to start,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>{" "}
            walks you through it.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking the same road</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
