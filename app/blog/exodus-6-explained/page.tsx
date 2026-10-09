import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-6-explained", {
  title: "Exodus 6 Explained: The Name JEHOVAH and the Genealogy of Moses",
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

export default function ExodusSixExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-6-explained"
      title={<>📖 Exodus 6 Explained: The Name JEHOVAH and the Genealogy of Moses</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Moses just accused God of doing nothing. God answers with His own name.</p>
            <p>
              <strong>Exodus 6 explained</strong> is the chapter where God responds to the raw
              complaint at the end of the last chapter, not with an apology, but with a promise
              stacked seven times over, and a name Moses has not heard used this way before. Then
              the chapter stops the story cold for a genealogy, tracing Moses and Aaron back
              through three tribes to prove exactly who is being sent to stand in front of Pharaoh.
            </p>
            <p>Maybe you have prayed hard and gotten an answer that did not feel like relief yet.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What does it mean that God was not known by the name JEHOVAH before this?</li>
            <li>❓ Why does the Bible stop the action to list family names right here?</li>
            <li>❓ Why does Moses raise the exact same objection twice in one chapter?</li>
            <li>❓ And why does Israel refuse to even listen the second time around?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God never answers Moses&apos;s complaint by explaining the suffering. He
              answers it by renewing the covenant and naming Himself again.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 6 in order: the seven promises packed into
              three verses, the people who cannot hear them yet, Moses&apos;s second refusal, and
              the genealogy that quietly answers the question &quot;who exactly are these two
              brothers.&quot;
            </p>
            <p>This is a slower chapter. It rewards reading slowly.</p>
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
            <ArticleLink href="/blog/exodus-5-explained">Exodus 5</ArticleLink> ended on the worst
            note the book has hit so far. Moses obeyed God exactly as instructed, Pharaoh answered
            by stripping the straw from the brick quota, Hebrew officers were beaten for a
            shortage they did not cause, and the people Moses came to rescue turned on him in the
            street outside Pharaoh&apos;s court. The chapter closed with Moses taking an open,
            unanswered accusation straight to God: why have you let this get worse, and why did
            you even send me.
          </p>
          <p>
            Exodus 6 opens as the direct reply to that question. No time passes between the two
            chapters. Moses is still standing in the same posture, having just asked God to
            account for Himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. &quot;Now Shalt Thou See&quot; (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God&apos;s first word to Moses is not comfort. It is a promise about what Moses is about to watch happen.</p>
        </div>
        <VerseQuote
          text="Then the LORD said unto Moses, Now shalt thou see what I will do to Pharaoh: for with a strong hand shall he let them go, and with a strong hand shall he drive them out of his land."
          reference="Exodus 6:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who the strong hand belongs to in this sentence.</strong> It is not
            Moses&apos;s hand or Pharaoh&apos;s own stubbornness that finally moves events. Twice in
            one verse, the strong hand is described as doing the work, first to let Israel go and
            then to drive them out, and the natural reading of a verse built entirely around God&apos;s
            action is that both strong hands belong to God, working through Pharaoh&apos;s own
            resistance rather than around it.
          </p>
          <p>
            Moses asked why God had not delivered His people at all. God does not argue the point.
            He tells Moses to keep watching.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. &quot;I Am the LORD&quot;: A Name Revealed in Full (verses 2 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God then does something He has not done at any point so far in Exodus. He opens with His own name, twice, before saying anything else.</p>
        </div>
        <VerseQuote
          text="And God spake unto Moses, and said unto him, I am the LORD: And I appeared unto Abraham, unto Isaac, and unto Jacob, by the name of God Almighty, but by my name JEHOVAH was I not known to them."
          reference="Exodus 6:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>God Almighty</strong> translates El Shaddai, the name God used with{" "}
            <ArticleLink href="/blog/genesis-17-explained">Abraham in Genesis 17</ArticleLink>, a
            name that stresses raw power and provision. <strong>JEHOVAH</strong> is an older English
            way of writing out the personal covenant name usually printed as LORD in small capital
            letters through the rest of the Old Testament, the same name God first gave Moses as{" "}
            <ArticleLink href="/blog/exodus-3-explained">I AM THAT I AM at the burning
            bush</ArticleLink>.
          </p>
          <p>
            Genesis already records Abraham and his family using that exact name, which makes
            verse 3 sound at first like a contradiction. It is not. &quot;Known&quot; in Hebrew
            thought rarely means simple word recognition. It means tested, proven, experienced in
            action. The patriarchs knew the word. They had not yet watched it deliver an entire
            nation out of slavery with a stretched out arm. Moses is about to.
          </p>
        </div>
        <VerseQuote
          text="And I have also established my covenant with them, to give them the land of Canaan, the land of their pilgrimage, wherein they were strangers."
          reference="Exodus 6:4"
        />
        <VerseQuote
          text="And I have also heard the groaning of the children of Israel, whom the Egyptians keep in bondage; and I have remembered my covenant."
          reference="Exodus 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Heard and remembered are the same quiet verbs that closed{" "}
            <ArticleLink href="/blog/exodus-2-explained">Exodus 2</ArticleLink> and opened Exodus 3.
            God is not describing a new decision. He is reminding Moses, right after Moses accused
            Him of doing nothing, that the watching never stopped even while the bricks got harder
            to make.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Seven Promises in Three Verses (verses 6 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God then lays out exactly what the name JEHOVAH is about to mean in action.</p>
        </div>
        <VerseQuote
          text="Wherefore say unto the children of Israel, I am the LORD, and I will bring you out from under the burdens of the Egyptians, and I will rid you out of their bondage, and I will redeem you with a stretched out arm, and with great judgments: And I will take you to me for a people, and I will be to you a God: and ye shall know that I am the LORD your God, which bringeth you out from under the burdens of the Egyptians. And I will bring you in unto the land, concerning the which I did swear to give it to Abraham, to Isaac, and to Jacob; and I will give it you for an heritage: I am the LORD."
          reference="Exodus 6:6 to 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Count the promises and there are exactly seven: bring out, rid, redeem,
            take, be, bring in, give.</strong> Bible teachers often call these the seven I wills of
            redemption, and the number is not a stretch or a stylistic guess. It is there in the
            plain text, three sentences holding the whole shape of what the exodus and the
            conquest of the land will eventually look like, promised before a single plague has
            struck Egypt.
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>✅ Bring you out: rescue from the place of bondage.</li>
            <li>✅ Rid you out of their bondage: the chains themselves broken, not just the location changed.</li>
            <li>✅ Redeem you: a purchase, at a cost, not a favor handed out for free.</li>
            <li>✅ Take you to me for a people: belonging, not just freedom.</li>
            <li>✅ Be to you a God: relationship, not merely protection.</li>
            <li>✅ Bring you in unto the land: a destination, not an open ended wandering.</li>
            <li>✅ Give it you for an heritage: a permanent possession, not a loan.</li>
          </ul>
          <p>
            And the phrase <strong>I am the LORD</strong> frames the whole promise, opening it in
            verse 2, repeating at the center in verses 6 and 8, and appearing a fifth time later in
            verse 29 when the same commission is repeated. Every promise in this chapter is
            anchored to that one name, not to a plan that might fail.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Moses Obeys, but Israel Cannot Hear It Yet (verse 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses does exactly what he is told. The result is not what happened the first time he spoke to the people.</p>
        </div>
        <VerseQuote
          text="And Moses spake so unto the children of Israel: but they hearkened not unto Moses for anguish of spirit, and for cruel bondage."
          reference="Exodus 6:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This single verse is the explanation for everything that just happened at
            the end of Exodus 5.</strong> In{" "}
            <ArticleLink href="/blog/exodus-4-explained">Exodus 4</ArticleLink>, Israel heard the
            message and bowed their heads in worship on the spot. Nothing about God&apos;s promise
            has gotten weaker since then. What changed is what the people have lived through in
            between: the straw taken away, the beatings, the same quota demanded anyway. A promise
            of future rescue, spoken into present anguish, does not automatically land. Exodus does
            not treat that as a failure of faith to be scolded. It simply records it as true, and
            moves forward anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Sent Back to Pharaoh, Moses Objects Again (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Without pausing on Israel&apos;s unbelief, God gives Moses the next assignment.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Go in, speak unto Pharaoh king of Egypt, that he let the children of Israel go out of his land."
          reference="Exodus 6:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses answers with an objection that leans directly on the verse just before it.</p>
        </div>
        <VerseQuote
          text="And Moses spake before the LORD, saying, Behold, the children of Israel have not hearkened unto me; how then shall Pharaoh hear me, who am of uncircumcised lips?"
          reference="Exodus 6:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Uncircumcised lips</strong> is a Hebrew way of calling something unfit or
            not properly prepared for its purpose, the same kind of language later used for an
            uncircumcised heart or uncircumcised ears. Moses is not describing a physical defect.
            He is saying his speech is not equal to the size of the task, using the verse he just
            watched happen, his own people&apos;s refusal, as the proof.
          </p>
          <p>
            📌 <strong>This is the same objection Moses already raised and God already answered in
            Exodus 4.</strong> God does not repeat the earlier argument about who made Moses&apos;s
            mouth. He simply answers by widening the commission.
          </p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses and unto Aaron, and gave them a charge unto the children of Israel, and unto Pharaoh king of Egypt, to bring the children of Israel out of the land of Egypt."
          reference="Exodus 6:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The charge now belongs to both brothers by name, not to Moses carrying Aaron as a
            backup voice. That shared commission is exactly what the genealogy that follows is
            about to establish in detail.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Why a Genealogy, Right Here (verses 14 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The story stops completely. What follows looks, at first glance, like it belongs in a
            different book.
          </p>
        </div>
        <VerseQuote
          text="These be the heads of their fathers' houses: The sons of Reuben the firstborn of Israel; Hanoch, and Pallu, Hezron, and Carmi: these be the families of Reuben."
          reference="Exodus 6:14"
        />
        <VerseQuote
          text="And the sons of Simeon; Jemuel, and Jamin, and Ohad, and Jachin, and Zohar, and Shaul the son of a Canaanitish woman: these are the families of Simeon."
          reference="Exodus 6:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The list does not cover all twelve of Jacob&apos;s sons. It names exactly
            three: Reuben, Simeon, and Levi, in that order, and then stays on Levi for the rest of
            the section.</strong> Reuben and Simeon are Leah&apos;s first two sons, listed only to
            get to the third in line. The genealogy is not trying to be complete. It is building a
            direct, verifiable line from Jacob down to two specific men: Moses and Aaron.
          </p>
        </div>
        <VerseQuote
          text="And these are the names of the sons of Levi according to their generations; Gershon, and Kohath, and Merari: and the years of the life of Levi were an hundred thirty and seven years."
          reference="Exodus 6:16"
        />
        <VerseQuote
          text="And the sons of Kohath; Amram, and Izhar, and Hebron, and Uzziel: and the years of the life of Kohath were an hundred thirty and three years."
          reference="Exodus 6:18"
        />
        <VerseQuote
          text="And Amram took him Jochebed his father's sister to wife; and she bare him Aaron and Moses: and the years of the life of Amram were an hundred and thirty and seven years."
          reference="Exodus 6:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three generations, three lifespans recorded in the text itself: Levi at a hundred
            thirty seven years, Kohath at a hundred thirty three, Amram at a hundred thirty seven
            again. Jochebed, Amram&apos;s wife, is identified here as his father&apos;s sister, his
            own aunt. Marriage that close within a family is forbidden later, once the Law is given
            at Sinai in Leviticus 18. Exodus 6 records this marriage plainly, without comment,
            because it happened generations before that law existed. The text is not endorsing a
            practice for every generation. It is reporting one family&apos;s actual history, at the
            time it actually occurred.
          </p>
          <p>
            ⚠️ This detail also means Moses and Aaron are not distant descendants of Levi. Amram is
            Levi&apos;s own grandson through Kohath. Only three generations separate the man who
            will stand in front of Pharaoh from the patriarch whose sons walked down into Egypt
            with Jacob.
          </p>
        </div>
        <VerseQuote
          text="And Aaron took him Elisheba, daughter of Amminadab, sister of Naashon, to wife; and she bare him Nadab, and Abihu, Eleazar, and Ithamar."
          reference="Exodus 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Aaron&apos;s own four sons are named here before any of them has done a single thing in
            the story. Two of them, Nadab and Abihu, will later die for offering unauthorized fire
            before the LORD. The other two, Eleazar and Ithamar, will carry the priesthood forward
            after Aaron is gone. The genealogy plants all four names quietly, long before either
            outcome plays out.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Same Call, Repeated (verses 26 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The genealogy closes with the exact two names it was building toward.</p>
        </div>
        <VerseQuote
          text="These are that Aaron and Moses, to whom the LORD said, Bring out the children of Israel from the land of Egypt according to their armies. These are they which spake to Pharaoh king of Egypt, to bring out the children of Israel from Egypt: these are that Moses and Aaron."
          reference="Exodus 6:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the order flips between the two sentences: Aaron and Moses, then
            Moses and Aaron.</strong> The genealogy traced Aaron&apos;s family in more detail, so he
            is named first closing it out. The mission itself belongs to Moses first everywhere
            else in the book. Scripture holds both without needing to settle which brother ranks
            higher.
          </p>
          <p>The narrative then picks back up exactly where it paused, almost word for word.</p>
        </div>
        <VerseQuote
          text="That the LORD spake unto Moses, saying, I am the LORD: speak thou unto Pharaoh king of Egypt all that I say unto thee."
          reference="Exodus 6:29"
        />
        <VerseQuote
          text="And Moses said before the LORD, Behold, I am of uncircumcised lips, and how shall Pharaoh hearken unto me?"
          reference="Exodus 6:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verses 10 through 12 and verses 28 through 30 say almost the same thing in almost
            the same words, with the entire genealogy sitting between them like a long parenthesis.
            That repetition is not an editing mistake. It is the writer picking the story back up
            exactly where it left off, after pausing to answer a question the reader has not even
            asked yet: who are these two men, really.
          </p>
          <p>
            The chapter ends on Moses&apos;s objection still standing, unresolved. Exodus 7 opens
            with God&apos;s reply, and the first real confrontation with Pharaoh finally begins.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did the patriarchs really never hear the name JEHOVAH before this?</strong>{" "}
            Genesis uses that name dozens of times, including in Abraham&apos;s own mouth. Exodus
            6:3 is best read as being about experienced knowledge, not vocabulary. The patriarchs
            knew the word. They had not yet watched it act on the scale of a national deliverance
            with a stretched out arm, which is exactly what Moses is about to see. Scripture often
            uses &quot;know&quot; this way, for proven experience rather than simple information.
          </p>
          <p>
            <strong>Why interrupt the story with a genealogy right here?</strong> The text does not
            explain its own placement, but the content makes the purpose clear. Moses and Aaron are
            about to confront the most powerful man in the ancient world. Before that happens, the
            text establishes exactly who they are: real men, from a real family, only three
            generations removed from Levi himself, not legendary figures dropped into the story
            from nowhere.
          </p>
          <p>
            <strong>Was Amram and Jochebed&apos;s marriage sinful?</strong> Leviticus 18:12 forbids
            a man marrying his father&apos;s sister, but that law comes generations after Amram and
            Jochebed married. Exodus 6:20 records the marriage without judgment, as history from
            before the law existed, the same way Scripture records other marriages that predate
            later commands without treating every detail of patriarchal life as a model to copy.
          </p>
          <p>
            <strong>Why does Moses raise the exact same objection twice?</strong> &quot;Uncircumcised
            lips&quot; appears in both verse 12 and verse 30, bracketing the genealogy on both
            sides. The repetition shows Moses still has not moved past the discouragement of verse
            9, Israel&apos;s refusal to listen. God&apos;s earlier answer about who made Moses&apos;s
            mouth has not erased the fear. It simply has not stopped God from sending him anyway.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Exodus 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 6:6 to 8</h3>
        <VerseQuote
          text="I am the LORD, and I will bring you out from under the burdens of the Egyptians, and I will rid you out of their bondage, and I will redeem you with a stretched out arm."
          reference="Exodus 6:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first three of seven promises God stacks together in these three verses, each one
          anchored to the name LORD rather than to circumstances that have not improved yet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 6:3</h3>
        <VerseQuote
          text="And I appeared unto Abraham, unto Isaac, and unto Jacob, by the name of God Almighty, but by my name JEHOVAH was I not known to them."
          reference="Exodus 6:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God&apos;s covenant name is about to be proven in action, not just spoken, for the first
          time at this scale in Israel&apos;s history.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 6:9</h3>
        <VerseQuote text="But they hearkened not unto Moses for anguish of spirit, and for cruel bondage." reference="Exodus 6:9" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise of rescue, spoken into real suffering, does not automatically land. Exodus
          records that honestly instead of pretending faith is simple under pressure.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 6:12</h3>
        <VerseQuote
          text="Behold, the children of Israel have not hearkened unto me; how then shall Pharaoh hear me, who am of uncircumcised lips?"
          reference="Exodus 6:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses measures his own fitness for the task by what just happened, not by what God just
          promised. The objection repeats word for word eighteen verses later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 6:5</h3>
        <VerseQuote
          text="And I have also heard the groaning of the children of Israel, whom the Egyptians keep in bondage; and I have remembered my covenant."
          reference="Exodus 6:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same quiet verbs from the end of Exodus 2, still true, spoken directly back to Moses
          right after he accused God of doing nothing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God answers Moses&apos;s complaint from the end of Exodus 5 by renewing His covenant and
          revealing His name JEHOVAH in full, promising seven things He will do for Israel. Moses
          delivers the message, but the people are too worn down by suffering to receive it. God
          sends Moses back to Pharaoh, Moses objects again, and the chapter pauses for a genealogy
          tracing Moses and Aaron through Levi before the confrontation with Pharaoh resumes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name JEHOVAH mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          JEHOVAH is an older English rendering of God&apos;s personal covenant name, usually
          printed as LORD in small capital letters elsewhere in the Old Testament. It is the same
          name behind I AM THAT I AM, given to Moses at the burning bush in Exodus 3.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Abraham, Isaac, and Jacob really not know God&apos;s name?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis shows them using the name LORD directly, so Exodus 6:3 is best understood as
          being about proven, experienced knowledge rather than simple vocabulary. They knew the
          word. They had not yet watched it deliver an entire nation the way Moses is about to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the seven I wills of Exodus 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 6 through 8 contain seven distinct promises: bring you out, rid you out of
          bondage, redeem you, take you for a people, be to you a God, bring you in to the land,
          and give it you for an heritage. Together they outline the whole shape of the exodus and
          the conquest before either one happens.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 6 include a genealogy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It establishes exactly who Moses and Aaron are before they confront Pharaoh: real
          descendants of Levi, only three generations removed from him through Kohath and Amram,
          not legendary figures appearing from nowhere.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the genealogy only cover Reuben, Simeon, and Levi?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Reuben and Simeon were Leah&apos;s first two sons, named only to reach the third, Levi, in
          birth order. The list is not trying to cover all twelve tribes. It exists to trace one
          specific line down to Moses and Aaron.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was it wrong for Amram to marry his own aunt Jochebed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That marriage happened generations before the Law given at Sinai forbade it in Leviticus
          18:12. Exodus 6:20 records it plainly as family history from before that command existed,
          not as an example for later generations to follow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;uncircumcised lips&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a Hebrew way of calling Moses&apos;s speech unfit or unprepared for the size of the
          task, the same kind of language later used for an uncircumcised heart or ears. It is not
          a physical condition. Moses uses it in both verse 12 and verse 30 to argue he is not
          equal to speaking before Pharaoh.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Israel believe Moses this time, when they believed him before?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 6:9 says it was anguish of spirit and cruel bondage, not doubt about God. Between
          Exodus 4 and Exodus 6, Pharaoh had removed their straw, increased their quota, and had
          their officers beaten. A promise of future rescue did not automatically outweigh present
          suffering.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 6 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The covenant name revealed here, LORD in small capitals, becomes the most common name for
          God through the rest of the Old Testament. The genealogy also quietly plants the names of
          Aaron&apos;s four sons, two of whom die later for unauthorized worship and two of whom
          carry the priesthood forward, long before either outcome is explained.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 6 answers an accusation with a covenant, not an explanation.</p>
          <p>
            📌 <strong>God met Moses&apos;s complaint with His own name, not a defense.</strong> He
            did not explain why the suffering happened. He restated exactly who He is and what He
            had already promised to do about it.
          </p>
          <p>
            📌 <strong>A true promise does not automatically land in a suffering heart.</strong>{" "}
            Israel&apos;s refusal to listen in verse 9 was not unbelief in the ordinary sense. It
            was exhaustion, and Scripture records it without shame.
          </p>
          <p>
            📌 <strong>God sends the same unconvinced man anyway.</strong> Moses repeated his
            weakest excuse twice in one chapter, and God still handed him, alongside Aaron, the
            exact same mission both times.
          </p>
          <p>
            You may be holding a promise from God that has not caught up to how worn out you
            actually feel right now.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read the seven promises of Exodus 6:6 to 8 slowly, by name, the way God spoke them to a
            people too exhausted to hear them the first time.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
