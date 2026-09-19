import BlogPostShell from "@/components/blog/BlogPostShell";
import BlogVideoEmbed from "@/components/blog/BlogVideoEmbed";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";
import { getBibleYearDayYoutubeVideoId } from "@/lib/bibleYearDayYoutubeVideos";

export const metadata = buildBlogArticleMetadata("bible-in-one-year-day-2-study-notes", {
  title: "Bible in One Year Day 2 Study Notes: Genesis 3-4",
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

// From the registry, never hand typed (docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md).
const videoId = getBibleYearDayYoutubeVideoId(2);

export default function BibleInOneYearDayTwoStudyNotesPage() {
  return (
    <BlogPostShell
      slug="bible-in-one-year-day-2-study-notes"
      title={<>📖 Bible in One Year Day 2 Study Notes: Genesis 3-4</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Hey. Welcome back.</p>
            <p>
              Yesterday we stood at the very beginning, in a world God had just called good.
              Today, something breaks.
            </p>
            <p>Not a war. Not a disaster. Not an army at the gate.</p>
            <p>A conversation.</p>
            <p>That is how it starts.</p>
            <p>
              Today is <strong>Day 2</strong> of Bible in One Year, and the reading is Genesis 3
              and 4. This is the day trust breaks, shame arrives, and God comes looking anyway.
            </p>
            <p>
              These are the written notes for Bible in One Year Day 2. If you listened to today&apos;s
              teaching already, this is the same walk in writing. So take a breath. This one sits
              heavier than yesterday. Stay with me.
            </p>
            <p>Here is what Day 2 puts in front of you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🐍 A conversation in the garden that quietly rewrites what God said</li>
            <li>🍎 The bite, the opened eyes, and the first hiding place ever built</li>
            <li>🌳 God walking through the garden asking a question He already knows the answer to</li>
            <li>🔥 A field, a warning ignored, and the first murder</li>
            <li>🙏 The chapter that ends, quietly, with people praying again</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Judgment is real in these two chapters. So is mercy. And they are never
              very far apart.</strong>
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🐍 A question that already knows what it wants you to think
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice how this starts. Not with force. With a question.</p>
          <VerseQuote
            text="Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?"
            reference="Genesis 3:1"
          />
          <p>
            The serpent does not deny God. He asks what God actually said, and then quietly
            changes it. God had told Adam he could eat of every tree except one. The serpent
            makes it sound like God fenced off the whole garden. Every word is almost right.
            Almost is the whole problem.
          </p>
          <p>
            Then the lie gets bolder. Ye shall not surely die, the serpent says next, straight
            against what God actually told them. First God&apos;s word gets questioned. Then
            God&apos;s heart gets questioned. You will not die, he tells her. God is holding
            something back from you.
          </p>
          <p>
            📌 <strong>That is still how it works.</strong> It rarely arrives as open rebellion.
            It arrives as a reasonable sounding question about whether God is really being fair
            with you.
          </p>
          <p>
            And notice what is missing from this whole scene. Nobody forces anything. No hand
            grabs the fruit. The whole thing happens in a conversation, one question leading to
            another, until a lie sounds like common sense.
          </p>
          <p>
            Look, too, at how the woman answers. She adds a word God never said. God told Adam
            he could eat freely of every tree except one, and that touching it was never part of
            the command. By the time it reaches her, she is repeating a rule that sounds
            stricter than the one God actually gave. It is a small thing, but it is exactly the
            kind of small thing a lie can work with.
          </p>
        </div>
        {videoId ? (
          <BlogVideoEmbed
            videoId={videoId}
            title="Day 2 | The Fall of Man | Bible in One Year | Genesis 3-4 Explained"
            description="Day 2 of the Bible in One Year: Genesis 3 and 4, the fall of man, the first promise of a Savior, and the first murder, explained in plain English."
            uploadDate="2026-08-29"
            caption="Prefer to listen? This is Day 2 of the Bible in One Year, the same walk through Genesis 3 and 4."
          />
        ) : null}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🍎 The moment everything opens and nothing looks the same
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look at what the woman sees when she looks at the tree.</p>
          <VerseQuote
            text="And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat."
            reference="Genesis 3:6"
          />
          <p>
            Good for food. Pleasing to the eye. Desirable for wisdom. Nothing about it looks
            ugly. It almost never does in the moment of choosing.
          </p>
          <p>
            And Adam is right there. He is not away somewhere, off in another part of the
            garden being deceived at a distance. He is with her, and he says nothing. He eats
            too.
          </p>
          <VerseQuote
            text="And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons."
            reference="Genesis 3:7"
          />
          <p>
            Their eyes open, and the first thing they discover is themselves. Not wisdom like
            they were promised. Just exposure. They see that they are naked, and they hide.
          </p>
          <p>
            📌 <strong>That is what shame does. It does not make you better. It makes you
            cover.</strong>
          </p>
          <p>
            Think about that for a second. The first thing human beings build in the Bible is
            not a tool, or a song, or a home. It is a hiding place, stitched together out of
            leaves, to keep from being seen.
          </p>
          <p>
            Fig leaves are not built for this. They tear. They wilt. Adam and Eve are not
            hiding from a person who does not already know. They are hiding from the God who
            made them, and the covering they build themselves cannot actually do what they need
            it to do. You will see that gap matter again in a few verses.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌳 Where are you
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Listen to the sound of what happens next. God walks in the garden, the way He
            apparently always did, and this time they are not there to meet Him. They are
            hiding among the trees He planted.
          </p>
          <VerseQuote
            text="And the LORD God called unto Adam, and said unto him, Where art thou?"
            reference="Genesis 3:9"
          />
          <p>
            God asks a question He already knows the answer to. Where are you. That is not
            Him gathering information. That is an invitation.
          </p>
          <p>
            📌 <strong>He is not hunting them down. He is calling them out of hiding.</strong>
          </p>
          <p>
            But watch what has already changed between them by the time they answer. Adam
            blames the woman, and then blames God for giving her to him. She blames the
            serpent. Nobody says, it was me.
          </p>
          <p>
            The relationship broke long before anyone got sent anywhere. It broke the moment
            hiding felt safer than being known.
          </p>
          <p>
            Notice also who God questions first, and in what order. He goes to Adam first, then
            the woman, then the serpent, working his way down to where the trouble actually
            started. And each answer passes the blame one step further away, until it lands on
            a creature that cannot answer back at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Real consequences, and a promise buried inside them
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            There are real consequences here, and Genesis does not soften a single one of them.
            Pain. Struggle. Ground that fights back instead of cooperating. A body that will one
            day return to the dust it came from.
          </p>
          <p>
            But buried inside the judgment on the serpent is a promise that is almost easy to
            miss on a first read.
          </p>
          <VerseQuote
            text="And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel."
            reference="Genesis 3:15"
          />
          <p>
            One will come from the woman, and He will crush the serpent&apos;s head, even
            though it costs Him a wound of His own. Christians have long read this as the first
            promise in the whole Bible that points ahead to Jesus.
          </p>
          <p>
            📌 <strong>The first announcement of rescue in the whole Bible shows up in the
            middle of the worst moment in the whole Bible.</strong>
          </p>
          <p>
            Sit with that for a second. God does not wait for things to be fixed before He
            starts promising to fix them. The curse and the cure get spoken in the same breath.
          </p>
          <p>
            The rest of the consequences follow that same pattern of real cost without total
            ruin. The woman&apos;s pain in childbirth increases, and the closeness between her
            and her husband gets harder, not easier. The ground itself changes for Adam. It was
            given to him to tend in Genesis 2, and now it fights him back with thorns and
            thistles, and the work that was always good becomes work that wears him down.
          </p>
          <p>
            Nothing here is undone by the end of the chapter. Genesis does not pretend the fall
            was not costly. But every consequence sits next to a promise God has already made,
            and that order matters.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧥 Clothed before they are sent out
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before Adam and Eve leave the garden, God does something quiet that is easy to skip
            past.
          </p>
          <VerseQuote
            text="Unto Adam also and to his wife did the LORD God make coats of skins, and clothed them."
            reference="Genesis 3:21"
          />
          <p>
            They had already covered themselves with leaves. God makes them something that
            will actually last. Their own covering cost them nothing. His covering cost a life.
          </p>
          <p>
            Then they are sent out of the garden, and the way back in is guarded by cherubim
            and a flaming sword. This is real loss. Eden is behind them now, and it stays
            behind them.
          </p>
          <p>
            📌 <strong>But being sent out is not the same as being thrown away.</strong> They
            walk out clothed by God, carrying a promise He made in front of them just verses
            earlier.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔥 One generation later, worship itself goes wrong
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 4 opens with Adam and Eve&apos;s two sons, Cain and Abel. Cain works the
            ground. Abel keeps sheep. Both of them bring an offering to the Lord, and this is
            where things go wrong again, one generation later, in the place you would least
            expect it.
          </p>
          <p>
            Abel brings the best of what he has, the firstlings of his flock. Cain brings what
            happened to be there. God has respect for Abel and his offering, and none for
            Cain&apos;s, and Cain burns with anger over it.
          </p>
          <p>
            And God speaks to him first, before anything else happens.
          </p>
          <VerseQuote
            text="If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door. And unto thee shall be his desire, and thou shalt rule over him."
            reference="Genesis 4:7"
          />
          <p>
            📌 <strong>That is mercy. Cain is warned out loud, and given a way out, in
            advance.</strong>
          </p>
          <p>
            The anger itself is not the sin yet. What Cain decides to do with it is.
          </p>
          <p>
            It is worth noticing what Genesis does not tell you here. It never says Cain&apos;s
            offering was rejected because grain is worse than a lamb, or because farming is
            worse than shepherding. The text points at the giving itself. Abel is described
            bringing the firstlings and the fat, the best of what he had. Cain just brings of
            the fruit of the ground, with nothing said about it being his first or his best.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🩸 Am I my brother&apos;s keeper
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He does not rule over it. Instead, Cain invites his brother out into a field, and
            the warning God gave him turns out to be exactly right.
          </p>
          <p>
            Afterward, God asks another question He already knows the answer to. Where is your
            brother. It is the same shape as the question in the garden. Where are you. Where
            is he.
          </p>
          <VerseQuote
            text="And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper?"
            reference="Genesis 4:9"
          />
          <p>
            Cain&apos;s answer is one of the coldest lines in Scripture. The rest of the Bible,
            from here all the way to the end, answers that question yes.
          </p>
          <p>
            And even here, judgment comes with protection. Cain is cursed and sent away, but
            God marks him so that no one will kill him.
          </p>
          <p>
            📌 <strong>Mercy keeps showing up in places where it does not have to.</strong>
          </p>
          <p>
            Cain still has to live with what he did. He is cursed from the ground, told he will
            be a fugitive and a wanderer, and he says his punishment is greater than he can
            bear. That grief is real. But the mark God puts on him is protection, not a brand of
            shame. Even the man who just killed his own brother does not get handed over to be
            killed himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🏙️ Cities, songs, tools, and a boast
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            What follows is strange, and worth slowing down for. Cain has a son, and builds a
            city, and names it after him. A few generations later, out of that same family
            line, cities get built, instruments get invented, and tools get made out of brass
            and iron. Culture begins.
          </p>
          <p>
            The world outside Eden is not empty or hopeless. People are still creative, still
            capable, still carrying the image of God even after everything that happened in
            chapter 3. Genesis even names the people behind it. Jabal is the father of those who
            live in tents and raise livestock. His brother Jubal is the father of everyone who
            plays the harp and the organ. Their half brother Tubalcain works in brass and iron,
            the first metalworker in the Bible.
          </p>
          <p>
            But then listen to Lamech, Tubalcain&apos;s father, the same family line, several
            generations down from Cain. He takes the protection God gave his ancestor and turns
            it into a boast, bragging to his two wives that he has killed a man for wounding
            him, and that if anyone touches him he will be avenged seventy and sevenfold, far
            beyond the sevenfold protection God gave Cain.
          </p>
          <p>
            📌 <strong>Both of these are true at the same time. Human beings make beautiful
            things, and human beings escalate.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🙏 People began to call on the name of the LORD
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter does not end on Lamech. It ends with another son, Seth, born to Adam
            and Eve in place of Abel, and a family line that keeps going.
          </p>
          <VerseQuote
            text="And to Seth, to him also there was born a son; and he called his name Enos: then began men to call upon the name of the LORD."
            reference="Genesis 4:26"
          />
          <p>
            After all of it. The lie, the hiding, the blaming, the blood, the boasting. People
            start praying again.
          </p>
          <p>
            📌 <strong>The story is not over. It is barely started.</strong> You can read where
            the line from Seth goes next in{" "}
            <ArticleLink href="/blog/genesis-5-explained">Genesis 5 explained</ArticleLink>, and
            the fuller walkthrough of everything in this chapter in{" "}
            <ArticleLink href="/blog/genesis-4-explained">Genesis 4 explained</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔑 Where Day 2 leaves you
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So that is Day 2. One conversation. One choice.</p>
          <p>
            And a world that no longer works the way it was made to. Yesterday everything was
            very good. Today trust is broken, shame has arrived, and blood has been spilled by
            one brother against another.
          </p>
          <p>
            But look at what God actually does in these two chapters. He comes walking. He asks
            where you are. He makes clothes. He makes a promise. He marks Cain to keep him
            alive.
          </p>
          <p>
            📌 <strong>Judgment is real here. So is mercy. And they are never very far
            apart.</strong>
          </p>
          <p>
            If you are carrying something today that makes you want to hide, Genesis 3 already
            knows that instinct. It is the oldest one we have. And the answer to hiding was
            never a better hiding place. It was God walking into the garden, asking where you
            are. If you want to read more about that instinct to cover instead of come clean,{" "}
            <ArticleLink href="/blog/genesis-3-explained">Genesis 3 explained</ArticleLink> goes
            deeper into the fall itself.
          </p>
          <p>
            Tomorrow we step into Genesis 5 through 7. The world keeps going, it keeps
            breaking, and God finds one man named Noah. You can catch up on yesterday&apos;s
            reading first in{" "}
            <ArticleLink href="/blog/bible-in-one-year-day-1-study-notes">
              Bible in One Year Day 1
            </ArticleLink>{" "}
            if you missed it.
          </p>
          <p>For now, stay here a moment.</p>
          <p>You were not abandoned.</p>
          <p>
            <strong>He came looking.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Bible in One Year Day 2 reading?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 3 and Genesis 4: the serpent&apos;s temptation, the first sin, the curses and
          the first promise of a Savior, and then the first murder between Cain and Abel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the serpent in the garden actually Satan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 3 itself just calls him a serpent, more subtil than any other beast God made.
          Later Scripture, including Revelation, identifies him with Satan, so Christians have
          long read Genesis 3 in that light, even though the text in Genesis does not say the
          word Satan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the original sin in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Adam and Eve ate from the one tree God told them not to eat from, the tree of the
          knowledge of good and evil. The deeper issue underneath the fruit was trust: whether
          they would take God at His word or decide for themselves what was good and evil.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God accept Abel&apos;s offering and not Cain&apos;s?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 4 says Abel brought the firstlings of his flock and the fat, while Cain
          brought of the fruit of the ground without that same description of giving his best.
          The text points to the heart behind the offering rather than the type of offering
          itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where did Cain get his wife?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 5 records that Adam had other sons and daughters, so Cain&apos;s wife would
          have come from within his own family line, which is not addressed in detail in
          chapter 4 itself. Early in Genesis, that kind of marriage was not yet forbidden the
          way it later would be under the law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What comes after Day 2 in the Bible in One Year?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 3 is Genesis 5 through 7: the genealogy from Adam to Noah, the wickedness that
          fills the earth, and the start of the flood. The notes for chapter 5 are in{" "}
          <ArticleLink href="/blog/genesis-5-explained">Genesis 5 explained</ArticleLink>.
        </p>
      </section>
    </BlogPostShell>
  );
}
