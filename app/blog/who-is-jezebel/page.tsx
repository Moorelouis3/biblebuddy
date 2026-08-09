import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-is-jezebel", {
  title: "Who Is Jezebel in the Bible? The Queen Who Led Israel Into Idolatry",
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

export default function WhoIsJezebelPage() {
  return (
    <BlogPostShell
      slug="who-is-jezebel"
      title={<>📖 Who Is Jezebel? The Queen Who Led Israel Into Idol Worship</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
          <p>Her name is still an insult three thousand years later.</p>
          <p>Call someone &quot;a Jezebel&quot; and everybody knows it is not a compliment.</p>
          <p>But most people could not tell you what she actually did.</p>
          <p>
            📌 <strong>Jezebel was not just a wicked queen. She was the most dangerous kind of
            influence: the kind that makes evil look normal.</strong>
          </p>
          <p>Her story is one of the Bible&apos;s loudest warnings.</p>
          <p>Let&apos;s look at who she really was.</p>
        </div>
        </>
      }
    >
      <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            👑 A Marriage That Changed a Nation
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Jezebel was a Phoenician princess, the daughter of a foreign king who served Baal.</p>
            <p>She married Ahab, king of Israel.</p>
            <p>It was a political power move.</p>
            <p>It became a spiritual disaster.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="...he took to wife Jezebel the daughter of Ethbaal king of the Zidonians, and went and served Baal, and worshipped him."
            reference="1 Kings 16:31"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Notice the order of events.</p>
            <p>He married Jezebel.</p>
            <p>Then he served Baal.</p>
            <p>
              💡 <strong>Who you bind your life to shapes who you worship.</strong>
            </p>
            <p>
              Through Ahab, Jezebel brought hundreds of Baal prophets into Israel, fed them at her
              own table, and hunted down the prophets of the LORD to kill them.
            </p>
            <p>The queen did not just practice idolatry.</p>
            <p>She made it national policy.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🔥 The Power Behind the Throne
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>The Bible gives Ahab a chilling epitaph.</p>
          </div>
          <VerseQuote
            text="But there was none like unto Ahab, which did sell himself to work wickedness in the sight of the LORD, whom Jezebel his wife stirred up."
            reference="1 Kings 21:25"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              <em>Whom Jezebel his wife stirred up.</em>
            </p>
            <p>She was the engine behind his worst evil.</p>
            <p>The clearest example is Naboth&apos;s vineyard.</p>
            <p>Ahab wanted a vineyard that was not his. The owner, Naboth, rightly refused to sell.</p>
            <p>Ahab went home and sulked.</p>
            <p>Jezebel wrote letters in the king&apos;s name, hired false witnesses, and had an
              innocent man stoned to death so her husband could take his field.</p>
            <p>⚠️ That is what unchecked power with no fear of God looks like.</p>
            <p>
              She even stared down Elijah - fresh from his greatest victory on Mount Carmel - with a
              death threat so intimidating that the prophet who called down fire from heaven ran for
              his life.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            ⚖️ The End God Promised
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Jezebel seemed untouchable for decades.</p>
            <p>Kings feared her. Prophets fled from her.</p>
            <p>But God had spoken through Elijah, and His word does not expire.</p>
          </div>

          <h3 className="mt-8 text-2xl font-black text-slate-950">📖 What Does The Bible Say?</h3>
          <VerseQuote
            text="...This is the word of the LORD, which he spake by his servant Elijah the Tishbite, saying, In the portion of Jezreel shall dogs eat the flesh of Jezebel."
            reference="2 Kings 9:36"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Years after the prophecy, a commander named Jehu rode into Jezreel.</p>
            <p>Jezebel painted her face, fixed her hair, and looked down from her window in defiance.</p>
            <p>Defiant to the very last minute.</p>
            <p>Her own servants threw her down at Jehu&apos;s word.</p>
            <p>By the time they went to bury her, the prophecy had already come true.</p>
            <p>
              💡 <strong>Evil can win for a long time. It cannot win forever.</strong>
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            🗣️ Why Jesus Mentioned Her Name Again
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>A thousand years later, Jezebel&apos;s name appears one more time.</p>
            <p>
              In Revelation, Jesus warns the church in Thyatira about a false teacher He calls
              &quot;that woman Jezebel&quot; - someone inside the church leading believers into
              compromise.
            </p>
          </div>
          <VerseQuote
            text="Notwithstanding I have a few things against thee, because thou sufferest that woman Jezebel, which calleth herself a prophetess, to teach and to seduce my servants..."
            reference="Revelation 2:20"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>The point is sobering.</p>
            <p>
              📌 <strong>The spirit of Jezebel is not ancient history. It is any influence that
              normalizes sin and pulls God&apos;s people away from Him - and Jesus takes it
              seriously.</strong>
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            💪 What Jezebel&apos;s Story Teaches Us
          </h2>
          <ul className="mt-6 space-y-3 text-lg leading-8 text-slate-700">
            <li>
              ✅ Influence is never neutral. The people closest to you are always pulling you toward
              something.
            </li>
            <li>✅ Compromise rarely announces itself. It arrives married to something attractive.</li>
            <li>
              ✅ Power without the fear of God destroys the innocent - and eventually, itself.
            </li>
            <li>
              ✅ God&apos;s patience is long, but His word always comes true. Always.
            </li>
            <li>
              ✅ One Elijah with God is stronger than a palace full of Jezebels - even on the days he
              is afraid.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Jezebel&apos;s story asks each of us two uncomfortable questions.</p>
            <p>
              ❓ <strong>Who is influencing you</strong> - and toward what?
            </p>
            <p>
              ❓ <strong>Who are you influencing</strong> - and toward what?
            </p>
            <p>Every life is pulling other lives somewhere.</p>
            <p>Jezebel pulled a nation away from God.</p>
            <p>You can pull the people around you toward Him.</p>
            <p>Choose your influence on purpose.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Want To Go Deeper?</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Jezebel&apos;s full story runs through 1 Kings 16 to 2 Kings 9, and it reads like a
              thriller.
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
            <p>May you walk close to God and choose your influences wisely. 🙏</p>
          </div>
        </section>
    </BlogPostShell>
  );
}
