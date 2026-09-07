import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("when-you-dont-feel-god-anymore");

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

export default function WhenYouDontFeelGodAnymorePage() {
  return (
    <BlogPostShell
      slug="when-you-dont-feel-god-anymore"
      title={<>📖 What to Do When You Don&apos;t Feel God Anymore</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You used to feel Him.</p>
            <p>Worship used to move something in your chest. Prayer used to feel like talking to someone in the room.</p>
            <p>Now you sing the same songs and feel nothing.</p>
            <p>You pray and the words hit the ceiling.</p>
            <p>
              📌 <strong>You are typing &quot;I don&apos;t feel God anymore&quot; into your phone, and part of
              you is scared of what that means about you.</strong>
            </p>
            <p>Here is the honest answer, right away, before anything else.</p>
            <p>Feeling nothing does not mean God left. And it does not mean your faith is fake.</p>
            <p>It means you are in a season the Bible has a name for. A dry season.</p>
            <p>David wrote whole psalms from inside it. So did Job. So did Jesus, on a cross, out loud.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Maybe you already tried the usual advice.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Pray harder.</li>
            <li>🔲 Read more.</li>
            <li>🔲 Just worship until you feel it again.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>And maybe none of it worked, and now you feel guilty on top of numb.</p>
            <p>This guide is not another push to try harder.</p>
            <p>It is what Scripture actually says about the times God feels far away, why it happens far more
              often than anyone talks about, and what you can actually do while you wait.</p>
            <p>Not to force a feeling back.</p>
            <p>But to keep walking with Him even without one.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most people quietly believe that feeling close to God is proof they are doing this right.</p>
          <p>So when the feeling goes, the fear underneath is bigger than the numbness.</p>
          <p>
            ⚠️ <strong>You start wondering if God is real, or if you ever really believed at all.</strong>
          </p>
          <p>That fear is exactly why this matters.</p>
          <p>The world&apos;s answer to feeling nothing is to chase a new feeling. A new church, a new
            relationship, a new routine, something loud enough to fill the quiet.</p>
          <p>That answer cannot hold. Feelings are not built to carry the weight of your faith.</p>
          <p>
            📌 <strong>Faith was never designed to run on feeling. It was designed to run on truth.</strong>
          </p>
          <p>The truth does not change when the feeling does. God&apos;s Word is still true on the day you
            feel nothing at all.</p>
          <p>If you let this season convince you that God left, you can drift somewhere far worse than numb.
            You can start skipping church, skipping the Word, skipping the people who would have reminded
            you of the truth, and the drift can go on far longer than the original numbness ever needed
            to.</p>
          <p>But if you learn to keep walking while it feels dry, you come out the other side with a faith
            that can survive anything. A faith built on truth instead of feeling does not collapse the next
            time a hard season comes. It has already been tested once and held.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Dry Seasons of Faith
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Feelings Were Never the Measuring Stick
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nowhere does Scripture say your faith is measured by what you feel in a given moment.</p>
          <p>Faith is defined completely differently.</p>
        </div>
        <VerseQuote
          text="Now faith is the substance of things hoped for, the evidence of things not seen."
          reference="Hebrews 11:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The evidence of things not seen. Not the feeling of things not seen.</p>
          <p>Paul said the same thing a different way.</p>
        </div>
        <VerseQuote text="For we walk by faith, not by sight." reference="2 Corinthians 5:7" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sight there means everything you can sense. What you can see, hear, and feel.</p>
          <p>Faith was built to keep walking when sight, and feeling, run out.</p>
          <p>
            💡 <strong>You are not failing at faith when you cannot feel it. That is exactly when faith is
            doing its actual job.</strong>
          </p>
          <p>People make the same mistake trying to answer <ArticleLink href="/blog/how-do-you-know-you-are-saved">how
            you know you are saved</ArticleLink>. They go looking for a feeling instead of standing on what
            God already said in His Word.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Ordinary Causes Nobody Mentions
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before you assume something spiritual has gone wrong, look at the ordinary suspects.</p>
          <p>Most dry seasons have very human roots.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🟢 <strong>Exhaustion.</strong> A worn out body cannot feel much of anything, including God.</li>
          <li>🟢 <strong>Grief.</strong> Loss can go so deep it numbs everything else along with it.</li>
          <li>🟢 <strong>Depression.</strong> A real medical condition, not a spiritual verdict on your soul.</li>
          <li>🟢 <strong>A phone that never stops.</strong> A mind fed noise all day has no quiet left for God&apos;s voice.</li>
          <li>🟢 <strong>Unconfessed sin left sitting.</strong> Sometimes distance is real, and honest confession clears it fast.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elijah is the clearest example in Scripture. He had just seen fire fall from heaven, and one
            chapter later he was so undone he begged God to let him die.</p>
          <p>God did not lecture him about his faith. God did not even mention his faith. He fed him and let
            him sleep, twice, before He ever spoke a single word to him.</p>
          <p>That order matters. Rest and food came before any conversation about what Elijah believed.</p>
          <p>📌 Your body and your faith are connected. If you have not slept, grieved properly, or set the
            phone down in weeks, start there before you assume God moved.</p>
          <p>Grief especially gets skipped over. A death, a breakup, a diagnosis, a job that ended without
            warning. Grief takes real energy, and it can quietly use up the same part of you that used to
            reach for God. That is not spiritual failure. That is what grief does to a person.</p>
          <p>Scripture is clear that <ArticleLink href="/blog/your-body-is-a-temple">your body is a
            temple</ArticleLink>, and a temple that is running on empty will struggle to sense anything,
            including the God who lives there.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. You Are Not the First to Feel This
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The writer of Psalm 42 was not a weak believer. He was desperate for God and could not find
            Him.</p>
        </div>
        <VerseQuote
          text="As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God: when shall I come and appear before God?"
          reference="Psalm 42:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A deer, panting, dying of thirst. That is the picture he chose for how it felt to want God and
            not sense Him.</p>
          <p>He goes further, and names the cruelest part out loud.</p>
        </div>
        <VerseQuote
          text="My tears have been my meat day and night, while they continually say unto me, Where is thy God?"
          reference="Psalm 42:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>People were mocking him with the very question you are afraid to ask yourself.</p>
          <p>Job went further still. He searched for God on every side and came up empty.</p>
        </div>
        <VerseQuote
          text="Behold, I go forward, but he is not there; and backward, but I cannot perceive him: On the left hand, where he doth work, but I cannot behold him: he hideth himself on the right hand, that I cannot see him."
          reference="Job 23:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forward, backward, left, right. Job checked every direction. Nothing.</p>
          <p>And even Jesus, on the cross, cried out with the exact words of Psalm 22.</p>
        </div>
        <VerseQuote
          text="My God, my God, why hast thou forsaken me?"
          reference="Matthew 27:46"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 <strong>The Son of God said those words out loud.</strong> If Jesus could voice that cry and
            still be fully faithful, so can you.</p>
          <p>This is a lot like what happens in seasons when <ArticleLink href="/blog/why-does-god-feel-silent">God
            feels completely silent</ArticleLink>. Silence and absence feel identical from the inside. They are
            not the same thing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Faith Is a Decision, Not a Feeling
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Job never got an explanation for what he was going through, and neither does everyone asking
            <ArticleLink href="/blog/why-does-god-allow-suffering"> why God allows suffering</ArticleLink>.
            But he made a decision in the middle of the fog.</p>
        </div>
        <VerseQuote
          text="But he knoweth the way that I take: when he hath tried me, I shall come forth as gold."
          reference="Job 23:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what carried him. Not a feeling. A fact. God knew the way, even while Job could not find
            Him anywhere.</p>
          <p>The prophet Habakkuk models the same decision when every single thing around him fails.</p>
        </div>
        <VerseQuote
          text="Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls: Yet I will rejoice in the LORD, I will joy in the God of my salvation."
          reference="Habakkuk 3:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every crop failed. Every animal was gone. Nothing left to feel good about.</p>
          <p>And he says <strong>yet</strong>. That one word is the whole hinge of this article.</p>
          <p>💡 Faith is choosing to rejoice in who God is, not in what you currently feel about Him.</p>
          <p>This does not mean fake a smile. It means keep telling the truth about God out loud even when
            your feelings have nothing to add.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Silence Is Not the Same as Absence
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God has promised something specific, and the promise does not mention feelings at all.</p>
        </div>
        <VerseQuote
          text="Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee."
          reference="Hebrews 13:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Never leave you, nor forsake you. That is a promise about His presence, not about your senses.</p>
          <p>A parent sitting quietly beside a sick child has not left the room just because the child cannot
            feel their hand in the dark.</p>
          <p>Isaiah has a specific verse for exactly this moment, the walker in the dark with no light.</p>
        </div>
        <VerseQuote
          text="Who is among you that feareth the LORD, that obeyeth the voice of his servant, that walketh in darkness, and hath no light? let him trust in the name of the LORD, and stay upon his God."
          reference="Isaiah 50:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 <strong>God names this exact experience in His Word.</strong> Walking in darkness with no
            light is not a sign you have left the faith. It is a described condition, with an instruction
            attached. Trust and lean anyway.</p>
          <p>Think about what it actually means to trust someone in the dark. You are not relying on what
            you can currently see or feel. You are relying on what you already know to be true about
            them from before the lights went out.</p>
          <p>That is the whole posture this verse is asking for. Not manufactured confidence. Just leaning
            your weight on a God you already have good reason to trust, even with the lights off.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. When It Might Be More Than a Season
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One more thing, said plainly.</p>
          <p>Sometimes what looks like spiritual dryness is really <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">anxiety</ArticleLink>,
            grief, or depression that has not been named yet.</p>
          <p>⚠️ If the numbness has lasted for months, if you cannot get out of bed, if you have lost interest
            in everything and not only your faith, please talk to a doctor or a counselor. That is not a
            failure of faith. God made bodies and minds, and He works through wise helpers too.</p>
          <p>Seeking that kind of help is not giving up on God. It is often the most faithful next step
            available to you.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: What to Do Right Now
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>None of these will manufacture a feeling.</p>
          <p>That is not the goal. Staying close to God through a dry season is the goal.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read anyway, even if it feels empty.</strong> Open the Bible whether you feel something
            or not. You are not reading for a feeling. You are reading because it is true either way, and
            truth read faithfully has a way of doing its work quietly, long before you notice it.
          </li>
          <li>
            <strong>Show up anyway.</strong> Keep the habits of prayer, church, and worship going even
            without the emotion attached. The habit itself is an act of faith while the feeling is gone, and
            it keeps the door open for the feeling to return whenever God decides the timing.
          </li>
          <li>
            <strong>Tell someone, out loud.</strong> Say the actual sentence to a friend, a spouse, or a
            pastor: &quot;I do not feel God right now.&quot; Hidden numbness grows in silence. Spoken
            numbness gets carried by someone else too, and often someone else will tell you they felt this
            exact same way once.
          </li>
          <li>
            <strong>Pray in plain, honest words.</strong> Skip the performance. Try something like &quot;God,
            I do not feel you, and I am still choosing to talk to you anyway.&quot; That is a real prayer.
          </li>
          <li>
            <strong>Check the ordinary suspects first.</strong> Sleep, food, sunlight, and screen time change
            how you feel everything, including God. Fix what you can fix in your body this week.
          </li>
          <li>
            <strong>Give it time without panic.</strong> A dry season is a season. It has an end. Panicking
            about it rarely shortens it and usually just adds fear on top of numbness, and fear makes it
            harder to notice when the feeling does start to return.
          </li>
          <li>
            <strong>Confess anything sitting between you and God.</strong> If something specific has been
            left unconfessed, bring it into the light. 1 John 1:9 says He is faithful to forgive what is
            actually brought to Him.
          </li>
          <li>
            <strong>Get real help when it is heavy.</strong> If this has lasted a long time, talk to a
            doctor or a counselor. That is wisdom, not weak faith.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses for When You Don&apos;t Feel God
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Keep these five close. Read them on the nights the feeling is furthest away.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Psalm 42:1 and 2</h3>
        <VerseQuote
          text="As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God: when shall I come and appear before God?"
          reference="Psalm 42:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse for the exact ache of wanting God and not sensing Him. The psalmist does not
            hide the thirst. He puts it into words, and that honesty is itself a form of worship.</p>
          <p>Notice he is still calling God &quot;the living God.&quot; The thirst has not talked him out of
            who God is.</p>
          <p>Use this verse to name your own thirst honestly, instead of pretending it is not there.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Job 23:8, 9 and 10</h3>
        <VerseQuote
          text="Behold, I go forward, but he is not there; and backward, but I cannot perceive him: On the left hand, where he doth work, but I cannot behold him: he hideth himself on the right hand, that I cannot see him: But he knoweth the way that I take: when he hath tried me, I shall come forth as gold."
          reference="Job 23:8, 9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Job checked every direction and found nothing. Then he landed on a fact bigger than his
            search.</p>
          <p>God knew the way Job was taking, even while Job could not find God anywhere around him.</p>
          <p>This is the verse for when you have already looked everywhere and come up empty.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Habakkuk 3:17 and 18</h3>
        <VerseQuote
          text="Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls: Yet I will rejoice in the LORD, I will joy in the God of my salvation."
          reference="Habakkuk 3:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every single thing that should have made him feel secure had failed. And still he said
            <strong> yet</strong>.</p>
          <p>This is the verse for choosing to trust God&apos;s character even when the evidence in front of
            you gives you nothing to feel good about.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Lamentations 3:22 and 23</h3>
        <VerseQuote
          text="It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."
          reference="Lamentations 3:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse sits inside a book written over the ruins of Jerusalem. If mercy could be found there,
            it can be found in your dry season too.</p>
          <p>New every morning does not depend on how you feel when you wake up. It depends on Him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Hebrews 13:5</h3>
        <VerseQuote
          text="Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee."
          reference="Hebrews 13:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This promise is not addressed to your emotions. It is addressed to your circumstances, and a numb
            season is one of them.</p>
          <p>He said it, and He does not need your feelings to confirm it before it becomes true.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why don&apos;t I feel God anymore?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Usually it is one or more ordinary causes: exhaustion, grief, depression, distraction, or a season
          of spiritual dryness Scripture describes over and over. It is rarely a sign that God left or that
          your faith stopped being real. Start by checking sleep, grief, and screen time before assuming
          something spiritual has gone wrong, and remember that David, Job, and Elijah all asked this exact
          question at some point in their walk with God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it a sin to not feel God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Feeling nothing is not a sin. David, Job, and even Jesus voiced the exact same experience in
          Scripture. What matters is what you do while you feel it, not whether the feeling shows up on
          command.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does God still love me if I feel nothing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, completely. His love was never based on your ability to sense it. Hebrews 13:5 says He will
          never leave you or forsake you, a promise made about His presence, not about your feelings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did I feel God before but not now?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Faith often feels strongest early on, or right after a real high point, and then settles into
          something steadier and quieter. Elijah&apos;s greatest victory was followed almost immediately by
          his lowest point. Feelings rise and fall for reasons that have little to do with how close God
          actually is.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is this depression or a spiritual dry season?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It can be either, and sometimes both at once. If the numbness covers everything in your life, not
          only your faith, food tastes the same, friends feel the same, hobbies feel flat too, and it has
          lasted a long time, that points toward depression and is worth talking to a doctor or counselor
          about. A dry season usually still leaves you able to feel other parts of life normally, while your
          walk with God specifically feels distant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Should I keep praying if I don&apos;t feel anything?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Praying without feeling is still praying. Habakkuk chose to rejoice in the Lord while every
          crop and animal he owned had failed him. The prayer is not less real because it feels dry.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How long do spiritual dry seasons last?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not give a set length, and it is different for every person. Some last weeks, some
          last much longer. What matters more than the length is what you do inside it: keep reading, keep
          showing up, keep telling the truth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What if I never feel God again?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That fear is common, and it is not the same as reality. Almost every dry season described in
          Scripture eventually gives way, sometimes to fresh closeness and sometimes just to steady,
          ordinary faith. Keep walking, and let God decide the timing rather than the fear deciding it for
          you. Even if the feeling never returns exactly the way it once was, a faith built to walk without
          it is not a smaller faith. It is often a stronger one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it normal for Christians to feel distant from God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, more normal than most churches talk about out loud. David, Job, Elijah, and the writer of
          Psalm 42 all named this exact experience in Scripture. You are in well documented company, not an
          exception.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can a counselor help with spiritual dryness?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Often, yes. A counselor can help sort out whether grief, exhaustion, or depression sits underneath
          what feels spiritual, and that is not a lack of faith. God works through wise helpers, and getting
          help is frequently the wisest next step available. Talking to a Christian counselor specifically
          can also help you hold both truths at once: the medical reality of what you are carrying, and the
          spiritual truth that God has not left you in the middle of it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Feelings were never the measure of your faith.</strong> Faith is the evidence of things
            not seen, not the feeling of things not seen.
          </p>
          <p>
            📌 <strong>You are in well documented company.</strong> David, Job, Elijah, and Jesus Himself all
            named this exact experience out loud, and none of it disqualified them.
          </p>
          <p>
            📌 <strong>Silence is not absence.</strong> He promised never to leave you, and that promise does
            not depend on whether you can currently feel it.
          </p>
          <p>You will probably not feel something the moment you finish reading this. That is fine.</p>
          <p>This was never about forcing a feeling back. It is about staying close to a faithful God with or
            without one, the same way David, Job, and Habakkuk did before you.</p>
          <p>Every one of them kept showing up long before the feeling ever returned. The showing up was the
            faith. The feeling, when it came back, was just the mercy on top of it.</p>
          <p>So here is your one next step. Open your Bible tonight, even if it feels empty, and read one
            chapter anyway.</p>
          <p>Not for the feeling. Because it is true either way.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If your Bible reading feels dry right now, you do not have to figure it out alone.
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
          <p>Just you, God&apos;s Word, and a little help understanding it, even on the days it feels
            empty.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
