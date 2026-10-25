import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("thanksgiving-when-the-year-has-been-hard");

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

export default function ThanksgivingWhenTheYearHasBeenHardPage() {
  return (
    <BlogPostShell
      slug="thanksgiving-when-the-year-has-been-hard"
      title={<>📖 Gratitude When the Year Has Been Hard: What Thanksgiving Really Means</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody is going to ask you what you are thankful for.</p>
            <p>Maybe at a table. Maybe in a group chat. Maybe in a circle at church.</p>
            <p>And you are going to smile and say something small and true, because the honest answer is longer and heavier than the room is ready for.</p>
            <p>
              This year took something from you. A person. A job. A marriage. A diagnosis. A
              friendship that just went quiet. Money that was supposed to last. A version of your
              life you assumed you would still be living by now.
            </p>
            <p>
              📌 <strong>Gratitude when the year has been hard is not the same thing as pretending
              the year was good.</strong>
            </p>
            <p>
              If you have been searching for how to be thankful when life is hard, you have probably
              already found the advice that does not help.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Count your blessings.</li>
            <li>🔲 It could always be worse.</li>
            <li>🔲 Somebody out there has it harder than you.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              All three are technically true. None of them is what the Bible actually asks of you.
            </p>
            <p>
              Scripture never tells you to feel good about a bad thing. It never asks you to call
              a loss a gift. What it does, over and over, is put thanksgiving and grief in the same
              mouth at the same moment, and refuse to let you choose between them.
            </p>
            <p>
              Paul writes the most joyful letter in the New Testament from a prison cell. David
              asks God how long he plans to keep forgetting about him, and six verses later sings.
              Habakkuk looks at empty fields and dead livestock and says he will rejoice anyway.
            </p>
            <p>
              <strong>That is the kind of thanksgiving this article is about.</strong> Not the kind
              that waits for the trouble to clear. The kind that opens its mouth in the middle of it.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💡 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what is actually at stake.</p>
          <p>
            If thanksgiving only works when life is going well, then your faith is a fair weather
            arrangement. It holds in the easy season and collapses in the hard one. And most of life
            is not the easy season.
          </p>
          <p>
            The world has one answer for a hard year, and it is distraction. Buy something. Scroll
            something. Drink something. Get through December and hope January is different. That
            answer is not evil. It is just thin. It gets you to the other side of the day without
            changing anything inside you.
          </p>
          <p>
            ⚠️ <strong>There is also a church answer that is worse than the world&apos;s, and it is
            forced cheerfulness.</strong> The kind that treats sadness as a sin and makes you
            perform a gratitude you do not have. That is not faith. That is acting. And God never
            asked you to act.
          </p>
          <p>
            What the Bible offers instead is harder and better. It tells you to be honest about the
            year, out loud, to God, in detail. And then it tells you to remember who He is while you
            are still standing in the wreckage. Both. In that order. Without skipping either one.
          </p>
          <p>
            That is a muscle. And a hard year is the only place it ever gets built. If you learn it
            now, you carry it into every year after this one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Giving Thanks in Hard Times
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Five things the Bible actually teaches about thanksgiving, none of which require your
            circumstances to improve first.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The command is &quot;in every thing,&quot; not &quot;for every thing&quot;</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read the verse slowly, because one small word carries the whole weight.</p>
        </div>
        <VerseQuote
          text="In every thing give thanks: for this is the will of God in Christ Jesus concerning you."
          reference="1 Thessalonians 5:18"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>In</strong> every thing. Not <strong>for</strong> every thing.
          </p>
          <p>
            You are not being told to thank God for the funeral. You are being told that there is
            something to thank Him for while you are standing at it.
          </p>
          <p>
            That distinction is not a technicality. It is the difference between a faith you can
            actually practice and a lie you have to tell. Nowhere does Scripture ask you to describe
            evil as good. It asks you to find God present in a place where evil happened, and to say
            so.
          </p>
          <p>
            Notice also what sits on either side of that verse. &quot;Rejoice evermore&quot; comes
            first. &quot;Pray without ceasing&quot; comes second. Thanksgiving is the third
            instruction in a row, and all three are written to a church under pressure, not a church
            on holiday.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Paul wrote his most joyful letter in chains</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Philippians is the letter people quote when they want something warm. Rejoice in the
            Lord alway. I can do all things through Christ. The peace of God which passeth all
            understanding.
          </p>
          <p>
            It was written by a prisoner. Paul says so himself, plainly, and he says it without
            self pity.
          </p>
        </div>
        <VerseQuote
          text="But I would ye should understand, brethren, that the things which happened unto me have fallen out rather unto the furtherance of the gospel;"
          reference="Philippians 1:12"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He does not say the imprisonment was good. He says God got something done through it
            that would not have been done otherwise. The guards heard. The believers outside got
            braver, not quieter.
          </p>
          <p>
            And then he writes the line that most people misread as a personality trait.
          </p>
        </div>
        <VerseQuote
          text="Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content."
          reference="Philippians 4:11"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>I have learned.</strong> Paul was not born content. He picked it up somewhere,
            and the next verse tells you where. He learned it being full and being hungry. He
            learned it abounding and suffering need. Contentment was not his starting point. It was
            his tuition, and the hard years paid for it.
          </p>
          <p>
            The same man and his friend Silas had already been beaten and locked in the inner
            prison with their feet in stocks. What they did at midnight is one of the strangest
            sentences in the book of Acts.
          </p>
        </div>
        <VerseQuote
          text="And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them."
          reference="Acts 16:25"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Note the last five words. The singing was not private. Other people in pain heard it.
            Your thanksgiving in a hard year is never only yours. If you want more on the man behind
            these letters, we walk through his whole story in{" "}
            <ArticleLink href="/blog/paul">the life of Paul</ArticleLink>.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Psalms complain and thank in the same breath</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you only know the famous Psalms, you would think the songbook of Israel was all green
            pastures. It is not. A large part of it is complaint, and the complaint is loud.
          </p>
          <p>Psalm 13 opens with four questions and none of them are polite.</p>
        </div>
        <VerseQuote
          text="How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me?"
          reference="Psalm 13:1"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is in your Bible. God put it there. He did not edit it down into something more
            respectful. He preserved a man accusing Him of forgetting, and He called it worship.
          </p>
          <p>Then watch what happens six verses later, in the same short song.</p>
        </div>
        <VerseQuote
          text="But I have trusted in thy mercy; my heart shall rejoice in thy salvation. I will sing unto the LORD, because he hath dealt bountifully with me."
          reference="Psalm 13:5 and 6"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nothing changed between verse 1 and verse 5. The enemy is still there. God has not
            answered. The psalm records no rescue. What changed is where the writer is looking.
          </p>
          <p>
            Psalm 77 does the same thing and shows its working. The writer asks whether God has
            forgotten to be gracious. Then he makes a deliberate turn.
          </p>
        </div>
        <VerseQuote
          text="And I said, This is my infirmity: but I will remember the years of the right hand of the most High. I will remember the works of the LORD: surely I will remember thy wonders of old."
          reference="Psalm 77:10 and 11"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>I will remember.</strong> Said three times, on purpose. Thanksgiving here is not
            a feeling that arrives. It is a decision to go and get something out of the past and
            hold it up in front of the present. If you have ever wondered what the little word in
            the margin of these songs is doing, we explain it in{" "}
            <ArticleLink href="/blog/what-does-selah-mean">what Selah actually means</ArticleLink>.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Habakkuk thanks God for nothing he can see</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The prophet Habakkuk spends most of his short book arguing with God about why the wicked
            are winning. He does not get the answer he wanted. He ends the book like this.
          </p>
        </div>
        <VerseQuote
          text="Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls: Yet I will rejoice in the LORD, I will joy in the God of my salvation."
          reference="Habakkuk 3:17 and 18"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Go through that list again. No figs. No grapes. No olives. No crop. No sheep. No cattle.
            In an agricultural economy that is not a bad quarter. That is everything gone.
          </p>
          <p>
            ✅ <strong>And the word the whole passage turns on is &quot;yet.&quot;</strong>
          </p>
          <p>
            Habakkuk is not grateful for the empty field. He is grateful for the God who is still
            God while the field is empty. Those are two different sentences, and only one of them is
            honest.
          </p>
          <p>
            Job says the same thing in fewer words on the worst day of his life, after losing his
            property and all ten of his children in a single afternoon.
          </p>
        </div>
        <VerseQuote
          text="Naked came I out of my mother&apos;s womb, and naked shall I return thither: the LORD gave, and the LORD hath taken away; blessed be the name of the LORD."
          reference="Job 1:21"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read the verse before it and you will see he tore his clothes and shaved his head first.
            He grieved properly. The worship came out of the grief, not instead of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Thanksgiving is how you pray when you are afraid</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul gives the Philippians an instruction about anxiety, and he slips thanksgiving into
            the middle of it where you would not expect it.
          </p>
        </div>
        <VerseQuote
          text="Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
          reference="Philippians 4:6 and 7"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Be careful for nothing&quot; is older English for be anxious about nothing. And
            the method he gives is three parts. Prayer. Supplication, which means asking for
            specific things. And thanksgiving.
          </p>
          <p>
            That third part is what keeps the first two from becoming a list of complaints read
            aloud. Thanksgiving is what reminds you, mid prayer, who you are talking to. If anxiety
            is where you live right now, we go much deeper into it in{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              what the Bible says about anxiety
            </ArticleLink>
            , and if the honest problem is that God has gone quiet, start with{" "}
            <ArticleLink href="/blog/when-you-dont-feel-god-anymore">
              when you do not feel God anymore
            </ArticleLink>
            .
          </p>
          <p>
            Notice what Paul promises and what he does not. He does not promise the thing you are
            afraid of will not happen. He promises peace that does not make sense given your
            circumstances. That is a different gift, and in a hard year it is the better one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Ways to Give Thanks in a Hard Year
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Things you can actually do, starting today.</p>
        </div>
        <ol className="mt-6 space-y-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>1. Complain to God first, properly.</strong> Before you try to be grateful, tell
            Him the real thing. Out loud if you can. Psalm 13 gives you permission and Psalm 77
            gives you the shape. Gratitude that skips the honesty is the kind that cracks in
            January.
          </li>
          <li>
            <strong>2. Thank Him for what He is, not for what happened.</strong> Start sentences
            with &quot;You are&quot; rather than &quot;Thank you for.&quot; You are faithful. You
            are here. You have not left. This is the Habakkuk move and it works when nothing else
            does.
          </li>
          <li>
            <strong>3. Go back further than this year.</strong> Psalm 77 reaches for the wonders of
            old on purpose, because this year had nothing to offer. Write down three things God did
            before this year started. The list does not have to be recent to be true.
          </li>
          <li>
            <strong>4. Be specific and small.</strong> Vague gratitude dies fast. The friend who
            texted on the bad Tuesday. The bill that got covered. The night you finally slept.
            Small and specific beats large and general every single time.
          </li>
          <li>
            <strong>5. Say one true thing at the table.</strong> When somebody asks, you do not owe
            them the whole story and you do not owe them a performance. One real sentence is enough.
            &quot;It has been a hard year and I am still here, and I am thankful for that.&quot;
          </li>
          <li>
            <strong>6. Put it where you will see it.</strong> A note in your phone. A page in the
            back of your Bible. A card on the mirror. On the days you cannot generate gratitude, you
            can at least read your own handwriting from a day when you could.
          </li>
          <li>
            <strong>7. Let someone else hear it.</strong> The prisoners heard Paul and Silas. Tell
            one person one thing you are thankful for this week. It does something in you that
            thinking it never does.
          </li>
          <li>
            <strong>8. Get help if the weight is medical.</strong> If you have not slept properly in
            weeks, if you cannot eat, if you have stopped wanting to be here, talk to a doctor or a
            counselor. That is not a failure of faith and it never was.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📌 Top Bible Verses About Thanksgiving When Life Is Hard
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Lamentations 3:22 and 23</h3>
        <VerseQuote
          text="It is of the LORD&apos;s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."
          reference="Lamentations 3:22 and 23"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the most quoted line in a book called Lamentations. The whole book is a funeral
            song over a destroyed city. The writer is not looking at a sunrise and feeling poetic.
            He is standing in rubble.
          </p>
          <p>
            &quot;New every morning&quot; is not a promise that tomorrow will be easier. It is a
            promise that tomorrow will have its own mercy in it, delivered fresh, whether or not the
            situation has moved. That is a supply line, not a forecast.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Psalm 34:1</h3>
        <VerseQuote
          text="I will bless the LORD at all times: his praise shall continually be in my mouth."
          reference="Psalm 34:1"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David wrote this after escaping a foreign king by pretending to be insane. That is the
            background. It is not a line from a comfortable man.
          </p>
          <p>
            &quot;At all times&quot; is the hinge. Not at good times. Not when it makes sense. The
            commitment is made in advance, before the year shows you what it contains.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Psalm 103:1 and 2</h3>
        <VerseQuote
          text="Bless the LORD, O my soul: and all that is within me, bless his holy name. Bless the LORD, O my soul, and forget not all his benefits:"
          reference="Psalm 103:1 and 2"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read who is talking and who is being spoken to. David is talking to himself. He is
            giving his own soul an instruction, because his soul was not volunteering.
          </p>
          <p>
            <strong>That is permission to preach to yourself.</strong> Gratitude is often something
            you have to tell your own heart to do rather than something your heart offers.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Colossians 3:15</h3>
        <VerseQuote
          text="And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful."
          reference="Colossians 3:15"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three words at the end, stuck on almost casually. Be ye thankful. It reads like an
            afterthought and it is not one. In the next verse Paul connects it to singing, and in
            the verse after that he says do everything in the name of Jesus, giving thanks.
          </p>
          <p>Thanksgiving in Colossians is not an event in November. It is a setting you leave on.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2 Corinthians 4:8 and 9</h3>
        <VerseQuote
          text="We are troubled on every side, yet not distressed; we are perplexed, but not in despair; Persecuted, but not forsaken; cast down, but not destroyed;"
          reference="2 Corinthians 4:8 and 9"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Four pairs, and in every pair the first half is admitted. Paul does not deny the
            trouble, the confusion, the feeling of being hunted, or the fall.
          </p>
          <p>
            What he denies is the final word. Troubled is allowed. Crushed is not. That is the
            honest shape of a hard year lived with God in it, and it is a far better description of
            most Christian lives than any slogan about blessings.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Gratitude and Hard Times
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it a sin to not feel thankful?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Feelings are not commands and the Bible never treats them as sins by themselves. What
          Scripture asks for is an action you can take without the feeling: saying true things to God
          about who He is. The feeling sometimes follows and sometimes does not, and the obedience
          counts either way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does God want me to thank Him for the bad thing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text says in every thing, not for every thing. You are not asked to call a death or an
          abuse or a betrayal a blessing. You are asked to look for God inside the situation and
          thank Him for what you find there. Those are very different, and conflating them has hurt
          a lot of sincere people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I give thanks when I am angry at God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Say the anger first. Psalm 13 and Psalm 77 are both angry prayers that end in worship, and
          the anger is not removed from the text. God is not fragile. Bring the complaint, then make
          the deliberate turn to remember. Skipping the first step is what makes the second one feel
          fake. We cover this in more depth in{" "}
          <ArticleLink href="/blog/is-it-a-sin-to-doubt-god">whether doubt is a sin</ArticleLink>.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;in every thing give thanks&quot; actually mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means there is no circumstance so dark that nothing true remains to be said about God.
          His character does not change with your year. The verse puts the stable thing, God, inside
          the unstable thing, your life, and tells you to speak about the stable one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible tell us to rejoice in suffering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not because suffering is good, and not because joy cancels pain. Paul says in Philippians
          1 that his imprisonment moved the gospel forward. The rejoicing is aimed at what God does
          through the suffering, never at the suffering itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Thanksgiving a Christian holiday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Thanksgiving as it is kept in the United States and Canada is a national holiday, not a
          church feast day, and it is not commanded anywhere in Scripture. Giving thanks, on the
          other hand, is commanded repeatedly. Christians can keep the day with a clear conscience
          and should not confuse the calendar with the command.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I answer when someone asks what I am thankful for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Say one true, small thing. You do not owe the table your whole year. &quot;I am thankful I
          am still standing&quot; is a complete and honest answer, and it is usually truer than the
          longer one people expect.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if I cannot think of anything to be thankful for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then go backwards. Psalm 77 reaches past the present year to the wonders of old precisely
          because the present had nothing in it. Name something God did five years ago. It is still
          true, and it still counts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can I be grieving and grateful at the same time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, and the Bible assumes you will be. Job tore his clothes and worshipped in the same
          scene. The two are not rivals. Anyone who tells you that real faith removes the grief is
          adding something Scripture never said.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I start a habit of thanksgiving?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pick a fixed moment you already have, such as the first minute after you wake or the walk
          to the car, and attach one sentence to it. Keep it short enough that you will still do it
          on a bad day. If prayer itself is the hard part, start with{" "}
          <ArticleLink href="/blog/how-to-pray-when-you-dont-know-what-to-say">
            how to pray when you do not know what to say
          </ArticleLink>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things worth carrying out of this.</p>
          <p>
            📌 <strong>Thanksgiving does not require a good year.</strong> It requires a God who
            does not change, and you have one. The fig tree can fail and the word &quot;yet&quot; is
            still available to you.
          </p>
          <p>
            📌 <strong>Honesty comes first.</strong> Every thankful person in Scripture complained
            out loud before they sang. If you have been trying to be grateful without being honest,
            that is why it has felt like acting.
          </p>
          <p>
            📌 <strong>Say it to somebody.</strong> The prisoners heard the singing. Your one true
            sentence at a table this year will land on someone who needed to hear that a hard year
            and a real faith can live in the same person.
          </p>
          <p>
            <strong>One thing to do today.</strong> Open a note on your phone and write down three
            things God has done, from any year of your life, not just this one. Then read them back
            tomorrow morning before you look at anything else.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
