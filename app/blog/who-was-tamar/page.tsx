import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-tamar", {
  title: "Who Was Tamar in the Bible? The Widow Judah Called More Righteous",
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

export default function WhoWasTamarPage() {
  return (
    <BlogPostShell
      slug="who-was-tamar"
      title={<>📖 Who Was Tamar in the Bible? The Widow Judah Called More Righteous</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Tamar buried a husband before she was even done grieving her wedding.</p>
            <p>Then she buried a second one.</p>
            <p>She was owed a family. That was the law. That was the promise.</p>
            <p>Instead she was sent home, told to wait, and then quietly forgotten.</p>
            <p>
              📌 <strong>Tamar&apos;s story is about being denied what you are rightfully owed, by
              the very people who are supposed to protect you.</strong>
            </p>
            <p>Maybe you know that feeling.</p>
            <p>A promise made to your face, and then never kept.</p>
            <p>A system, a family, or a workplace that keeps stalling while you keep waiting.</p>
            <p>You did everything right, and you are still the one left out in the cold.</p>
            <p>
              Tamar lived that for years. And when nobody with power over her life would do the
              right thing, she took a huge risk to force the truth into the open. It was not a safe
              plan. It could have gotten her killed. It nearly did.
            </p>
            <p>
              This is the full story of Tamar in the Bible, told in order, straight from Genesis 38.
              Her two husbands. The promise Judah made and broke. The disguise by the road. The
              pledge she kept as proof. The moment Judah himself was forced to say she was more
              righteous than he was. And the surprising place her name shows up again, generations
              later, in the family line of Jesus.
            </p>
            <p>Let&apos;s start with who she was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Tamar Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Tamar was a Canaanite woman, not part of the family of Israel by birth.</p>
          <p>
            She married into that family when she became the wife of Er, the oldest son of a man
            named Judah.
          </p>
          <p>
            Judah was one of the twelve sons of Jacob, the man whose twelve sons became the twelve
            tribes of Israel. If you want the fuller story of that family, read about{" "}
            <ArticleLink href="/blog/who-was-joseph">Joseph</ArticleLink>, one of Judah&apos;s
            brothers.
          </p>
          <p>
            📌 Her story is told in one chapter, <strong>Genesis 38</strong>, tucked right in the
            middle of the story of Joseph being sold into Egypt.
          </p>
          <p>
            That placement is not an accident. Genesis pauses the Joseph story to tell you what was
            happening back home, inside Judah&apos;s own household.
          </p>
          <p>
            💡 Tamar matters far more than one chapter suggests. Her sons become ancestors of Boaz,
            then King David, and eventually Jesus Christ.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Tamar&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Husband Who Was Wicked, and Died</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah had three sons: Er, Onan, and Shelah.</p>
          <p>He chose Tamar to be the wife of his firstborn son, Er.</p>
          <p>Scripture does not describe the wedding. It skips straight to the point.</p>
        </div>
        <VerseQuote
          text="And Er, Judah's firstborn, was wicked in the sight of the LORD; and the LORD slew him."
          reference="Genesis 38:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>That is the entire description of Er&apos;s life. Wicked, and then
            dead.</strong>
          </p>
          <p>Genesis never tells us exactly what he did.</p>
          <p>It does not need to. God saw it, and God judged it.</p>
          <p>
            Tamar was left a widow, very young, with no children, in a culture where a woman&apos;s
            security depended almost entirely on her husband and her sons.
          </p>
          <p>She had done nothing wrong. She still lost everything a wife had.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Custom Meant to Protect Her, and a Brother Who Refused
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In that culture there was a custom called levirate marriage. If a man died without a
            son, his brother was expected to marry the widow and give her a child.
          </p>
          <p>
            That child would legally count as the dead brother&apos;s son, carrying on his name and
            his share of the family inheritance.
          </p>
          <p>
            📌 <strong>The custom existed to protect widows like Tamar, so they were not left with
            nothing.</strong>
          </p>
          <p>Judah told his second son, Onan, to do exactly that.</p>
        </div>
        <VerseQuote
          text="And Judah said unto Onan, Go in unto thy brother's wife, and marry her, and raise up seed to thy brother."
          reference="Genesis 38:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Onan agreed to the marriage. He did not agree to the child.</p>
        </div>
        <VerseQuote
          text="And Onan knew that the seed should not be his; and it came to pass, when he went in unto his brother's wife, that he spilled it on the ground, lest that he should give seed to his brother."
          reference="Genesis 38:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Any son born to Tamar would not carry Onan&apos;s name. He would carry Er&apos;s.</p>
          <p>
            ⚠️ Onan took the benefit of the marriage and refused the one thing that actually helped
            Tamar. He used her without giving her what she was owed.
          </p>
          <p>God saw that too.</p>
        </div>
        <VerseQuote
          text="And the thing which he did displeased the LORD: wherefore he slew him also."
          reference="Genesis 38:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two husbands. Two funerals. Tamar still had no child, and now no protector at all.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Promise Made, and Quietly Broken
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah still had a third son, Shelah. By custom, he was next in line.</p>
          <p>But Judah had now lost two sons after they married Tamar.</p>
          <p>He was afraid, even if he never said it plainly at the time.</p>
        </div>
        <VerseQuote
          text="Then said Judah to Tamar his daughter in law, Remain a widow at thy father's house, till Shelah my son be grown: for he said, Lest peradventure he die also, as his brethren did. And Tamar went and dwelt in her father's house."
          reference="Genesis 38:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Judah made Tamar a promise. Go home, wait, and I will give you my third son
            when he is grown.</strong>
          </p>
          <p>Tamar obeyed. She went back to her father&apos;s house and waited.</p>
          <p>
            ❓ How long do you wait on a promise from someone who has all the power and you have
            none?
          </p>
          <p>Shelah grew up. Judah never sent for her.</p>
          <p>
            ⚠️ He was afraid to give his third son to her, so instead of saying that honestly, he
            just let her sit in her father&apos;s house, year after year, with no husband, no child,
            and no way to move on with her life.
          </p>
          <p>
            She was legally still tied to Judah&apos;s family, and legally still owed a husband from
            it. She simply was not being given one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Widow Waits by the Road
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Years passed. Judah&apos;s own wife, the mother of his three sons, died.</p>
          <p>When his time of mourning ended, Judah went up to a town called Timnath to shear his sheep.</p>
          <p>Word of it reached Tamar.</p>
        </div>
        <VerseQuote
          text="And it was told Tamar, saying, Behold thy father in law goeth up to Timnath to shear his sheep."
          reference="Genesis 38:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Tamar made a decision right then. Genesis tells us exactly why.</p>
        </div>
        <VerseQuote
          text="And she put her widow's garments off from her, and covered her with a vail, and wrapped herself, and sat in an open place, which is by the way to Timnath; for she saw that Shelah was grown, and she was not given unto him to wife."
          reference="Genesis 38:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Read the reason the Bible gives, plainly. Shelah was grown, and she was not
            given to him.</strong>
          </p>
          <p>
            That is the injustice in one sentence. Judah&apos;s promise had expired. He had simply
            never kept his word.
          </p>
          <p>
            Tamar took off her widow&apos;s clothes and covered her face with a veil, the way a
            prostitute of that region might dress, and sat by the road Judah would travel.
          </p>
          <p>
            ⚠️ This was a desperate, risky plan. Scripture does not hide that, and neither will this
            article. Tamar disguised herself and used deception to get what she was legally owed.
          </p>
          <p>
            It is worth saying plainly here: this was not a moment of romance or seduction for its
            own sake. It was one wronged woman&apos;s attempt to force a broken promise into the
            open, in a system where she had almost no other way to do it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Judah, Deceived, Leaves a Pledge
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah passed by and saw a veiled woman sitting by the road.</p>
        </div>
        <VerseQuote
          text="When Judah saw her, he thought her to be an harlot; because she had covered her face."
          reference="Genesis 38:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He did not recognize his own daughter in law. He approached her, not knowing who she was.</p>
        </div>
        <VerseQuote
          text="And he turned unto her by the way, and said, Go to, I pray thee, let me come in unto thee; (for he knew not that she was his daughter in law.) And she said, What wilt thou give me, that thou mayest come in unto me?"
          reference="Genesis 38:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah offered to send a young goat from his flock later. Tamar was not willing to trust an empty promise from this man again.</p>
          <p>She asked for something to hold onto until the payment came.</p>
        </div>
        <VerseQuote
          text="And he said, What pledge shall I give thee? And she said, Thy signet, and thy bracelets, and thy staff that is in thine hand. And he gave it her, and came in unto her, and she conceived by him."
          reference="Genesis 38:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A man&apos;s signet, bracelets, and staff in that culture worked something like his
            personal ID and his signature combined. They were unmistakably his.
          </p>
          <p>
            📌 <strong>Tamar was not thinking about the moment. She was already thinking about the
            proof she would need later.</strong>
          </p>
          <p>Judah gave them to her, went in to her, and she conceived.</p>
          <p>Afterward, she went home, put her widow&apos;s garments back on, and said nothing.</p>
          <p>
            When Judah later sent his friend to deliver the young goat and collect the pledge back,
            the men of that place said there had never been a prostitute at that spot at all. Judah
            let it go, saying he did not want to be shamed by chasing after it further.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Bring Her Forth, and Let Her Be Burnt
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>About three months went by. Then Tamar&apos;s pregnancy became visible.</p>
          <p>Word reached Judah, and he responded with shocking speed and severity.</p>
        </div>
        <VerseQuote
          text="And it came to pass about three months after, that it was told Judah, saying, Tamar thy daughter in law hath played the harlot; and also, behold, she is with child by whoredom. And Judah said, Bring her forth, and let her be burnt."
          reference="Genesis 38:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Judah, the man who had broken his own promise to her, was now ready to have
            her executed by fire.</strong>
          </p>
          <p>
            He still had Tamar legally tied to his family through the promise of Shelah, so her
            pregnancy outside of marriage was treated as a disgrace against his household.
          </p>
          <p>
            ❓ Notice who was never questioned in this moment. Judah did not know he was the father.
            He was ready to condemn her to death without a trial, without a hearing, without a
            single question asked of anyone else involved.
          </p>
          <p>This is the moment her risky plan either worked, or she died for nothing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Discern, I Pray Thee, Whose Are These
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>As Tamar was being brought out to be killed, she sent a message to Judah instead of pleading for her life.</p>
        </div>
        <VerseQuote
          text="When she was brought forth, she sent to her father in law, saying, By the man, whose these are, am I with child: and she said, Discern, I pray thee, whose are these, the signet, and bracelets, and staff."
          reference="Genesis 38:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 She did not scream his name in public or accuse him outright. She let the proof do
            the talking and gave him room to recognize the truth himself.
          </p>
          <p>Judah looked at the signet, the bracelets, and the staff, and he knew immediately.</p>
        </div>
        <VerseQuote
          text="And Judah acknowledged them, and said, She hath been more righteous than I; because that I gave her not to Shelah my son. And he knew her again no more."
          reference="Genesis 38:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Judah admitted it publicly. She hath been more righteous than I.</strong>
          </p>
          <p>
            He was ready to burn her for the same thing he himself had done, while also finally
            owning the real wrong. He had never kept his word and given her Shelah.
          </p>
          <p>
            💡 Notice what Judah does not do. He does not marry her himself, and he does not send
            her away. He calls off the execution and lets her live in his household with the
            child she is carrying. It is not a clean ending, but it is the closest thing to justice
            this story gives her.
          </p>
          <p>Her plan was dangerous. It also worked. The truth came out, and her life was spared.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          8. Twin Sons, and a Thread Tied on a Hand
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Tamar&apos;s time came, she gave birth to twins.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when she travailed, that the one put out his hand: and the midwife took and bound upon his hand a scarlet thread, saying, This came out first."
          reference="Genesis 38:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One baby put his hand out first, and the midwife tied a scarlet thread on it to mark
            him as the firstborn.
          </p>
          <p>Then something unexpected happened.</p>
        </div>
        <VerseQuote
          text="And it came to pass, as he drew back his hand, that, behold, his brother came out: and she said, How hast thou broken forth? this breach be upon thee: therefore his name was called Pharez."
          reference="Genesis 38:29"
        />
        <VerseQuote
          text="And afterward came out his brother, that had the scarlet thread upon his hand: and his name was called Zarah."
          reference="Genesis 38:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The baby with the thread on his hand pulled it back, and his brother actually came
            out first, even though he was the second one to reach out. He was named Pharez, which
            means a breaking through.
          </p>
          <p>
            📌 <strong>Pharez becomes an ancestor of Boaz, then King David, and eventually Jesus
            Christ.</strong>
          </p>
          <p>
            That family line is traced again generations later: <strong>Pharez begat Hezron, and
            Hezron begat Ram, and Ram begat Amminadab, and Amminadab begat Nahshon, and Nahshon
            begat Salmon, and Salmon begat Boaz, and Boaz begat Obed, and Obed begat Jesse, and
            Jesse begat David</strong> (Ruth 4:18 through 22).
          </p>
          <p>
            Matthew&apos;s genealogy of Jesus names Tamar directly, even though genealogies in that
            culture almost never named women at all.
          </p>
        </div>
        <VerseQuote
          text="And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;"
          reference="Matthew 1:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Matthew was written in Greek, so the names look slightly different there. Thamar is
            Tamar. Phares is Pharez. Zara is Zarah. Same family, same story, remembered by name
            centuries later at the front of the New Testament.
          </p>
          <p>
            ✅ <strong>The widow who was denied a place in Judah&apos;s family became a named
            ancestor of the Messiah Himself.</strong>
          </p>
          <p>
            If you want to see how God kept working through that same family line generations
            later, read about <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>, another
            woman whose sons carried the promise forward.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Tamar&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Being wronged by someone in authority does not mean you were wrong
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah had power over Tamar&apos;s whole future, and he misused it.</p>
          <p>
            ⚠️ Scripture does not blame Tamar for the years of waiting. It blames Judah, in his own
            words, for never keeping his promise.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Fighting for justice inside a broken system can be costly and risky
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Tamar had almost no legal power of her own. Nobody was going to stand up for her.
          </p>
          <p>
            So she took a plan that could have ended in her death just to get the truth out into
            the open.
          </p>
          <p>
            📌 <strong>Sometimes doing the right thing when you have been wronged does not look
            neat or safe. It looks like a desperate, costly risk taken because no one else would
            act.</strong>
          </p>
          <p>
            That does not mean every risky plan is wise or right. It means Scripture is honest
            about how hard it can be to get justice when the people over you will not give it
            freely.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. God can work through a painful, complicated story
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nothing about Genesis 38 looks clean. Two men are struck dead. A promise is broken. A woman disguises herself in desperation.</p>
          <p>
            💡 God did not need a tidy story to bring forward the line that led to Jesus. He worked
            through the actual, messy history of real people.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Owning your wrong matters, even late and even publicly
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah could have hidden the truth once he saw his own signet in Tamar&apos;s hand.</p>
          <p>Instead he said it out loud, in front of others: she hath been more righteous than I.</p>
          <p>📌 A late confession is still worth more than none at all.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. God notices the people a system leaves out
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Tamar was a Canaanite widow with no husband, no children, and no standing.</p>
          <p>
            ✅ God still wrote her name into the family line of King David and of Jesus. Being
            overlooked by people is never the same as being overlooked by God.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Tamar&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 38:11</h3>
        <VerseQuote
          text="Then said Judah to Tamar his daughter in law, Remain a widow at thy father's house, till Shelah my son be grown: for he said, Lest peradventure he die also, as his brethren did. And Tamar went and dwelt in her father's house."
          reference="Genesis 38:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The promise that started her whole ordeal.</p>
          <p>Tamar obeyed it fully. Judah never kept his half of it.</p>
          <p>💡 A broken promise from someone with power over you can trap you for years.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 38:14</h3>
        <VerseQuote
          text="And she put her widow's garments off from her, and covered her with a vail, and wrapped herself, and sat in an open place, which is by the way to Timnath; for she saw that Shelah was grown, and she was not given unto him to wife."
          reference="Genesis 38:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Bible gives the reason plainly. She was not given to him.</p>
          <p>⚠️ Her desperate plan grew directly out of a broken promise, not out of nowhere.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 38:24</h3>
        <VerseQuote
          text="And it came to pass about three months after, that it was told Judah, saying, Tamar thy daughter in law hath played the harlot; and also, behold, she is with child by whoredom. And Judah said, Bring her forth, and let her be burnt."
          reference="Genesis 38:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The lowest, most dangerous moment in her entire story.</p>
          <p>📌 Judah was ready to have her killed for the very thing he had done himself.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 38:26</h3>
        <VerseQuote
          text="And Judah acknowledged them, and said, She hath been more righteous than I; because that I gave her not to Shelah my son. And he knew her again no more."
          reference="Genesis 38:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The turning point of the whole chapter.</p>
          <p>Judah names his own failure out loud, in front of witnesses.</p>
          <p>💡 The truth Tamar risked her life to reveal was the truth that finally saved her.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 1:3</h3>
        <VerseQuote
          text="And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;"
          reference="Matthew 1:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Her name, spelled Thamar here, sits right in the opening genealogy of Jesus.</p>
          <p>✅ The Messiah&apos;s family tree includes the widow who was denied justice and had to fight for it herself.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Tamar</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Tamar a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents her as a real woman, married into the family of Judah, one of the twelve
          sons of Jacob. Her story is told with real names, real places, and real consequences, and
          she is named again generations later in Matthew&apos;s genealogy of Jesus, treated there
          as an actual ancestor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Judah call Tamar more righteous than himself?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because he realized she had only done what she did after he broke his promise to give her
          his third son, Shelah, as a husband. He was ready to have her put to death for the same
          kind of act he himself had committed. When he saw his own signet, bracelets, and staff,
          he admitted his failure in front of others.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is levirate marriage?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a custom where a man&apos;s brother was expected to marry his widow and give her a
          son if the man died without children. That son would carry the dead brother&apos;s name
          and inheritance. It existed to protect widows financially and legally in a culture where
          they had few other options.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is Tamar in the genealogy of Jesus?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Matthew 1:3 names her directly, calling her Thamar, in the opening genealogy of
          Jesus Christ. Genealogies in that culture almost never included women, which makes her
          inclusion stand out even more.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Tamar sin by disguising herself as a prostitute?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not directly praise or condemn the disguise itself. It does record Judah
          calling her more righteous than himself, meaning her actions, weighed against his own
          broken promise and his readiness to have her killed, came out looking better than his.
          The Bible is honest that her plan was risky and involved deception, without holding her
          up as sinless.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did God kill Er and Onan?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis says Er was wicked in the sight of the LORD without giving further detail. Onan
          was struck down for deliberately refusing to give Tamar a child while still taking the
          benefit of the marriage, which the text calls displeasing to the LORD.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who were Pharez and Zarah?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They were Tamar&apos;s twin sons by Judah. Zarah put his hand out first and had a scarlet
          thread tied on it, but Pharez was the one who was actually born first. Pharez became an
          ancestor of Boaz, King David, and eventually Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was Tamar related to Ruth?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not by blood, but by family line. Ruth later married Boaz, who was a direct descendant of
          Tamar&apos;s son Pharez, as recorded in Ruth 4:18 through 22. So Tamar was an ancestor of the man
          Ruth married.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does Tamar&apos;s name mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Tamar means date palm tree in Hebrew. Scripture does not explain the name further, but a
          palm tree was known in that culture for staying upright and fruitful even in a harsh,
          dry climate.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What can we learn from Tamar today?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That being denied what you are rightfully owed by people who should protect you is a real
          injustice, not something to just accept quietly. That God sees and works through painful,
          complicated situations. And that He can bring something good, even something eternal, out
          of a story that looked like a disaster from the inside.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Tamar was denied a husband, denied a family, and nearly denied her life.</p>
          <p>Hold three things next to each other.</p>
          <p>
            📌 <strong>She was wronged by the man who should have protected her.</strong>
          </p>
          <p>
            📌 <strong>She fought for justice at real risk to herself, and the truth came out.</strong>
          </p>
          <p>
            📌 <strong>God wrote her name into the family line of Jesus Christ.</strong>
          </p>
          <p>
            If you are waiting on a promise someone with power over your life keeps failing to
            keep, Tamar&apos;s story will not tell you exactly what to do about it. It will tell you
            that God sees it, and that being wronged by people does not put you outside His plan.
          </p>
          <p>
            Read Genesis 38 for yourself this week, slowly, and notice every place justice was
            delayed before it finally arrived.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
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
          <p>It is completely free. No pressure, no credit card, no account needed to begin.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
        </div>

        <StudyCta
          slug="women-of-the-bible"
          title="Women of the Bible"
          days={21}
          description="Tamar's story is one of many. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
