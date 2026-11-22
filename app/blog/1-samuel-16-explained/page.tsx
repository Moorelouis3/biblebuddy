import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-16-explained", {
  title: "1 Samuel 16 Explained: David Anointed King in Secret",
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

export default function OneSamuelSixteenExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-16-explained"
      title={<>📖 1 Samuel 16 Explained: David Anointed King in Secret</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A grieving prophet. A nervous town. A boy nobody thought to call in from the field.</p>
            <p>That boy is the next king.</p>
            <p>
              <strong>1 Samuel 16 explained</strong> is the chapter where the story quietly turns away
              from Saul and toward David, years before David ever sits on a throne or fights a single
              battle anyone remembers. Samuel is sent to Bethlehem under cover of a sacrifice, told to
              anoint a king from a family that does not yet know which son it will be, and the one God
              picks is the one nobody in the room would have picked.
            </p>
            <p>Maybe you have watched someone impressive get chosen for something, and felt overlooked yourself.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Samuel need a cover story just to anoint the next king?</li>
            <li>❓ What does it actually mean that God looks at the heart and not the outward appearance?</li>
            <li>❓ If the Spirit of the LORD came on David that day, why does he spend years after this still serving Saul?</li>
            <li>❓ What is the evil spirit that starts troubling Saul at the end of the chapter?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not choose David because no one else was looking for a king. He
              chooses him because everyone kept looking in the wrong place.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the sacrifice that hides the
              real reason Samuel comes to Bethlehem, Eliab standing there looking every bit like a
              king, the brothers who pass by one after another and get turned away, the boy still out
              with the sheep, the oil poured out and the Spirit that comes with it, and the strange,
              quiet way David ends up in Saul&apos;s own house before either man understands what is
              happening.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 What Happened Just Before This Chapter
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/1-samuel-15-explained">1 Samuel 15</ArticleLink> ended with the
            relationship between Saul and Samuel broken for good. Saul had kept the best of the
            Amalekite spoil instead of destroying it as God commanded, and Samuel told him plainly
            that the LORD had rejected him from being king. The two men walked away from each other in
            different directions, and the chapter closed on Samuel mourning for a king he would never
            visit again.
          </p>
          <p>
            1 Samuel 16 explained is the chapter where that mourning finally has to end, because God
            has somewhere else for Samuel to be. Saul is still on the throne. Nothing about his
            kingdom looks any different from the outside. But the next king has already been chosen,
            and this chapter is the first time anyone meets him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 16 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. God Tells Samuel to Stop Mourning (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God interrupting Samuel&apos;s grief.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Samuel, How long wilt thou mourn for Saul, seeing I have rejected him from reigning over Israel? fill thine horn with oil, and go, I will send thee to Jesse the Bethlehemite: for I have provided me a king among his sons."
          reference="1 Samuel 16:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Grief over Saul was real and right, but God does not let it become a reason
            to sit still.</strong> There is a new king already provided, Samuel just does not know his
            name yet. This is the same horn of oil Samuel used years earlier when he first{" "}
            <ArticleLink href="/blog/1-samuel-9-explained">anointed Saul in secret</ArticleLink>. The
            method has not changed. The outcome this time will be very different.
          </p>
          <p>Samuel&apos;s next question is an honest, fearful one.</p>
        </div>
        <VerseQuote
          text="And Samuel said, How can I go? if Saul hear it, he will kill me. And the LORD said, Take an heifer with thee, and say, I am come to sacrifice to the LORD."
          reference="1 Samuel 16:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Samuel is not being told to invent a lie as a cover story. He really did come to
            sacrifice, and the family really did gather for it. God gives him a true reason to be in
            Bethlehem that does not require announcing the second, far more dangerous reason. The
            anointing stays hidden inside something ordinary.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Nervous Town, a Sacrifice, and a Family Set Apart (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Samuel arrives, and the town already senses something is wrong before he says a word.</p>
        </div>
        <VerseQuote
          text="And he said, Peaceably: I am come to sacrifice unto the LORD: sanctify yourselves, and come with me to the sacrifice. And he sanctified Jesse and his sons, and called them to the sacrifice."
          reference="1 Samuel 16:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesse&apos;s family is this same line the book of{" "}
            <ArticleLink href="/blog/ruth-4-explained">Ruth closes on</ArticleLink>, where Boaz and
            Ruth have a son named Obed, and Obed has a son named Jesse. Nobody in Bethlehem that day
            is thinking about that genealogy. They are just a family asked to sanctify themselves for
            a visiting prophet, with no idea one of the sons in the room is about to carry the weight
            of the whole nation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Not the One Who Looks Like a King (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesse brings his oldest son forward first, and Samuel is immediately convinced.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when they were come, that he looked on Eliab, and said, Surely the LORD's anointed is before him."
          reference="1 Samuel 16:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the same Samuel who confronted Saul face to face without flinching, and
            he still gets this wrong on sight.</strong> Eliab is the firstborn, likely tall and
            commanding the way Saul himself had been described years earlier. Samuel sees the shape of
            a king he already knows, and almost reaches for the oil.
          </p>
        </div>
        <VerseQuote
          text="But the LORD said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart."
          reference="1 Samuel 16:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This verse is not saying appearance never matters. It is saying appearance is
            not the thing God is choosing by.</strong> Samuel had the right instinct about what a king
            usually looks like. He had the wrong instinct about what this king would be chosen for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Seven Sons Pass By, and None of Them Is the One (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesse brings his sons forward one at a time. Abinadab passes. Shammah passes. Then four
            more pass, seven sons total standing in front of Samuel, and the answer is the same every
            time.
          </p>
        </div>
        <VerseQuote
          text="Again, Jesse made seven of his sons to pass before Samuel. And Samuel said unto Jesse, The LORD hath not chosen these."
          reference="1 Samuel 16:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Seven is a full, finished number through most of Scripture, and that is exactly the
            point here. Jesse has brought everyone he thought could possibly be meant. By every normal
            account, the search should already be over, and it has produced nothing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The One Out With the Sheep (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Samuel has to ask the obvious question Jesse never thought to volunteer the answer to.</p>
        </div>
        <VerseQuote
          text="And Samuel said unto Jesse, Are here all thy children? And he said, There remaineth yet the youngest, and, behold, he keepeth the sheep. And Samuel said unto Jesse, Send and fetch him: for we will not sit down till he come hither."
          reference="1 Samuel 16:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jesse did not hide his youngest son out of cruelty. He simply never considered
            him a candidate worth calling in.</strong> The job out with the sheep was the job nobody
            competing for anything important would be doing. Samuel will not sit down to eat until
            that son is standing in the room.
          </p>
        </div>
        <VerseQuote
          text="And he sent, and brought him in. Now he was ruddy, and withal of a beautiful countenance, and goodly to look to. And the LORD said, Arise, anoint him: for this is he."
          reference="1 Samuel 16:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David is not described as plain. He is described as healthy, bright eyed, good to look
            at. Verse 7 was never a claim that looks are worthless. It was a claim that looks are not
            the deciding factor, and here the deciding factor finally arrives.
          </p>
        </div>
        <VerseQuote
          text="Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward. So Samuel rose up, and went to Ramah."
          reference="1 Samuel 16:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The anointing happens in front of his own brothers, the same brothers who
            passed by Samuel and were turned away one by one.</strong> This is the same language used
            when{" "}
            <ArticleLink href="/blog/1-samuel-10-explained">
              the Spirit of the LORD came upon Saul
            </ArticleLink>{" "}
            at the start of his own reign. The sign is familiar. What happens next for the man who
            receives it will not be.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Spirit Leaves Saul, and Something Darker Moves In (verse 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The scene cuts away from Bethlehem without a word of transition, and lands back on the
            king nobody in that room even mentioned.
          </p>
        </div>
        <VerseQuote
          text="But the Spirit of the LORD departed from Saul, and an evil spirit from the LORD troubled him."
          reference="1 Samuel 16:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>One verse holds both halves of the hinge this whole chapter turns on.</strong>{" "}
            The Spirit that came on David in verse 13 is the same Spirit now described leaving Saul.
            Two men, one departure and one arrival, placed side by side on purpose rather than told as
            two separate stories.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. David Comes to Court, Still Years From a Throne (verses 15 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Saul&apos;s servants notice his torment and suggest a remedy that has nothing to do with
            kings or anointing. They just want music.
          </p>
        </div>
        <VerseQuote
          text="Then answered one of the servants, and said, Behold, I have seen a son of Jesse the Bethlehemite, that is cunning in playing, and a mighty valiant man, and a man of war, and prudent in matters, and a comely person, and the LORD is with him."
          reference="1 Samuel 16:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice how much this servant already knows about David, including that the LORD is
            with him, long before David has done anything the rest of Scripture records as famous. A
            quiet reputation was already forming around him at home, out of sight of the palace.
          </p>
          <p>Saul sends for David, and the arrangement that follows is simple and immediate.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when the evil spirit from God was upon Saul, that David took an harp, and played with his hand: so Saul was refreshed, and was well, and the evil spirit departed from him."
          reference="1 Samuel 16:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The future king of Israel enters Saul&apos;s own house as hired comfort for the
            man he will eventually replace.</strong> Neither of them understands yet what the other
            one is. David has no throne, no army, no plan. He has an anointing nobody outside one
            family in Bethlehem even knows happened, and a harp.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 16 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does &quot;man looketh on the outward appearance&quot; mean looks do not matter at
            all, since the text turns around and calls David good looking?</strong> What the text
            says: verse 7 contrasts how God chooses with how Samuel was about to choose, and verse 12
            still describes David as ruddy and good to look at. How this is read: the point of verse 7
            is not that appearance is worthless, it is that appearance was never the qualification God
            was selecting for. David&apos;s looks are mentioned, but they are not given as the reason
            he was chosen.
          </p>
          <p>
            <strong>Was Samuel lying to Saul by telling Bethlehem he had only come to sacrifice?</strong>{" "}
            What the text says: verse 2 and 3 have God Himself supply the sacrifice as the reason for
            the trip, and verse 5 shows the sacrifice actually taking place. How this is read: Samuel
            is given a true reason for being there, not a cover story invented on his own. He simply
            is not required to announce the second, far more dangerous purpose alongside the first.
          </p>
          <p>
            <strong>Does God send evil spirits to torment people?</strong> What the text says: verse
            14 states directly that an evil spirit from the LORD troubled Saul, right after the Spirit
            of the LORD departed from him. How this is read: Christians read this as God permitting a
            tormenting affliction as the consequence of Saul&apos;s own rejection in the previous
            chapter, in the same direct way Scripture elsewhere attributes events to God that He
            allows rather than personally originates. The text does not explain the mechanism further,
            and that restraint is worth keeping rather than filling in with speculation.
          </p>
          <p>
            <strong>If the Spirit of the LORD came on David in verse 13, why does he spend years
            after this still serving in Saul&apos;s house instead of becoming king right away?</strong>{" "}
            What the text says: the anointing happens privately, in front of his own family only, and
            the very next scene shows David entering Saul&apos;s court as a musician, not a rival.
            How this is read: being chosen and being enthroned are shown here as two different
            moments, separated by a long stretch of ordinary service that the rest of 1 Samuel will
            go on to describe in detail.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 16:7</h3>
        <VerseQuote
          text="But the LORD said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart."
          reference="1 Samuel 16:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse the whole chapter is remembered for. Even a prophet as discerning as Samuel needed
          to be corrected about what he was looking at.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 16:13</h3>
        <VerseQuote
          text="Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward."
          reference="1 Samuel 16:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment David becomes king in God&apos;s eyes, years before anyone else knows it, witnessed
          only by the brothers who had already been passed over themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 16:14</h3>
        <VerseQuote
          text="But the Spirit of the LORD departed from Saul, and an evil spirit from the LORD troubled him."
          reference="1 Samuel 16:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The hinge of the whole chapter in a single sentence, placing what leaves Saul and what
          arrives for David side by side on purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 16:23</h3>
        <VerseQuote
          text="And it came to pass, when the evil spirit from God was upon Saul, that David took an harp, and played with his hand: so Saul was refreshed, and was well, and the evil spirit departed from him."
          reference="1 Samuel 16:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The future king spends his first scene at court easing the suffering of the king he will
          one day replace, neither of them aware yet of what that means.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 16:11</h3>
        <VerseQuote
          text="And Samuel said unto Jesse, Are here all thy children? And he said, There remaineth yet the youngest, and, behold, he keepeth the sheep."
          reference="1 Samuel 16:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one candidate nobody thought to bring to the sacrifice turns out to be the only one God
          ever intended to choose.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 1 Samuel 16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God sends Samuel to Bethlehem to anoint one of Jesse&apos;s sons as the next king. Samuel
          assumes it will be the oldest, Eliab, but God rejects him and six of his brothers. The
          youngest son, David, is brought in from tending sheep and anointed instead. The chapter ends
          with the Spirit of the LORD leaving Saul and David being brought to Saul&apos;s court to play
          music that eases his torment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Samuel need a sacrifice as a reason to go to Bethlehem?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Samuel was afraid Saul would kill him if word got out that he was anointing a new king,
          which verse 2 states directly. God gives him a genuine reason to travel there, a sacrifice
          that really takes place, so the true purpose of the trip could stay hidden inside it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the LORD looketh on the heart&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Samuel was about to anoint Eliab based on his height and presence, the same qualities that
          had drawn people to Saul. Verse 7 corrects him, saying God chooses based on something
          internal rather than what a person looks like standing in a room.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why wasn&apos;t David included with his brothers from the start?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 11 shows Jesse did not think to bring him because he was the youngest and was out
          keeping the sheep, a job nobody expected to matter for choosing a king. Samuel has to ask
          directly whether every son is present before David is even sent for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did David become king right after being anointed in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The anointing in verse 13 happens privately in front of his family, and Saul remains on
          the throne for years afterward. The rest of 1 Samuel follows a long stretch of David serving
          in and around Saul&apos;s court before he ever rules.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the evil spirit that troubles Saul in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 14 says it came from the LORD right after the Spirit of the LORD departed from Saul,
          following his rejection as king in the previous chapter. Scripture presents it as a real
          torment permitted on Saul as a consequence, without explaining the mechanism in more detail
          than that.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did David end up playing music for Saul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Saul&apos;s servants noticed his torment and recommended finding a skilled musician, and one
          of them already knew of David from Bethlehem. Saul sent for him on that recommendation alone,
          with no idea he was bringing the next king into his own house.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was David already famous before this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not widely, but verse 18 shows a servant already able to describe him in detail, including
          that the LORD was with him, so a local reputation had already begun forming around him in
          Bethlehem before the events the rest of Scripture remembers him for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens right after 1 Samuel 16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Philistine army gathers for battle and sends out a giant champion named Goliath to
          challenge Israel, setting up the confrontation David becomes known for in the very next
          chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 16 is not really about a throne changing hands yet. It is about who gets looked at, and who gets overlooked.</p>
          <p>
            📌 <strong>God was never choosing against appearance. He was choosing past it.</strong>{" "}
            Samuel saw Eliab and assumed. David is described as good looking too, but his looks are
            never named as the reason he was picked.
          </p>
          <p>
            📌 <strong>Being chosen and being enthroned are not the same moment.</strong> David is
            anointed in private in one scene, then shows up in the next as hired help for the very
            king he will replace. Years sit between the two.
          </p>
          <p>
            Saul still sits on the throne when this chapter closes. But something has already shifted
            that no one in the palace can see yet.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of the person in your life doing the job nobody thinks matters, and ask what you
            might be missing about them by only looking at what everyone else already looked at.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
