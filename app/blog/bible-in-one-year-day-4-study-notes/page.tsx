import BlogPostShell from "@/components/blog/BlogPostShell";
import BlogVideoEmbed from "@/components/blog/BlogVideoEmbed";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";
import { getBibleYearDayYoutubeVideoId } from "@/lib/bibleYearDayYoutubeVideos";

export const metadata = buildBlogArticleMetadata("bible-in-one-year-day-4-study-notes", {
  title: "Bible in One Year Day 4 Study Notes: Genesis 8-10",
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
const videoId = getBibleYearDayYoutubeVideoId(4);

export default function BibleInOneYearDayFourStudyNotesPage() {
  return (
    <BlogPostShell
      slug="bible-in-one-year-day-4-study-notes"
      title={<>📖 Bible in One Year Day 4 Study Notes: Genesis 8-10</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Hey. You made it back.</p>
            <p>
              Yesterday we left you in the worst place this book has gone so far. Water over
              everything, and one boat.
            </p>
            <p>Today the water goes down.</p>
            <p>But this is not a story about weather.</p>
            <p>It starts with three words.</p>
            <p>
              <strong>God remembered Noah.</strong>
            </p>
            <p>
              Today is <strong>Day 4</strong> of Bible in One Year, and the reading is Genesis 8,
              9, and 10. A dove, an altar, a rainbow, and a long list of nations that matters more
              than it looks.
            </p>
            <p>
              These are the written notes for Bible in One Year Day 4. If you listened to
              today&apos;s teaching already, this is the same walk in writing. Take a breath.
              Let&apos;s go.
            </p>
            <p>Here is what Day 4 puts in front of you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🕊️ A dove sent out three times, and the small sign that finally means it is over</li>
            <li>🔥 The first thing Noah does on dry ground, before anything else</li>
            <li>🌈 A bow hung in the sky, and the reason God says He put it there</li>
            <li>🍷 The man who survived the flood, and the sin the water could not wash out of him</li>
            <li>🌍 A list of names that quietly says there is no such thing as a stranger</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The flood did not make the world new by making people new. It made the
              world new by God promising to hold it steady anyway.</strong>
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕊️ God remembered Noah
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 8 opens with three words that turn the whole story around.</p>
          <VerseQuote
            text="And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters asswaged."
            reference="Genesis 8:1"
          />
          <p>
            Remembered does not mean God had forgotten. He was never gone from that boat. In the
            Bible, to remember someone is not about memory at all. It is about acting on a
            promise. When God remembers, something starts to move.
          </p>
          <p>
            And what moves here is a wind over the waters. That is the same picture as Genesis 1,
            when the Spirit of God moved over the face of the deep before anything existed. Here
            it is again, moving over water, before a world can start over.
          </p>
          <p>
            📌 <strong>God is making a world again.</strong> Not from nothing this time, but out
            of the one boat still floating on it.
          </p>
          <p>
            The water does not vanish. It goes down slowly, over months, the ark coming to rest on
            the mountains of Ararat in the seventh month, the tops of the mountains not visible
            until the tenth. Rescue is real here, and it is not instant. Noah still has to wait it
            out.
          </p>
          <p>
            Maybe you know what that kind of waiting feels like. You have already been rescued
            from something, and the water still has not fully gone down. Genesis 8 does not rush
            past that. It names the months.
          </p>
        </div>
        {videoId ? (
          <BlogVideoEmbed
            videoId={videoId}
            title="Day 4: Life After the Flood | Bible in One Year (Genesis 8-10)"
            description="Day 4 of the Bible in One Year: Genesis 8 through 10, the flood waters receding, Noah leaving the ark, the rainbow covenant, and the table of nations, explained in plain English."
            uploadDate="2026-08-31"
            caption="Prefer to listen? This is Day 4 of the Bible in One Year, the same walk through Genesis 8, 9, and 10."
          />
        ) : null}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌿 A dove that finally does not come back
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After forty more days, Noah opens a window and sends out a raven, which just goes back
            and forth until the ground dries. Then he tries something gentler. He sends out a
            dove.
          </p>
          <p>
            The dove cannot find anywhere to land. The water is still over everything, so she
            comes back to the ark, and Noah reaches out his hand and pulls her back in to him.
            There is something tender in that. A tired bird returning to the one place left that
            will still hold it.
          </p>
          <p>Seven days later he sends her out again.</p>
          <VerseQuote
            text="And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth."
            reference="Genesis 8:11"
          />
          <p>
            An olive leaf, torn fresh off a branch. Something out there is growing again. That
            small, ordinary leaf is the first proof Noah has had in months that the world is
            coming back.
          </p>
          <p>Then he waits seven more days and sends her out a third time.</p>
          <p>
            📌 <strong>She does not come back at all.</strong> That silence is the good news. It
            means she finally found somewhere to land that was not this boat.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚪 Noah waited to be told to leave
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis is careful to tell you what Noah does next, which is nothing. He removes the
            covering of the ark and looks out, and the ground is dry. And he still does not leave.
          </p>
          <p>
            The text lays out the timeline in enough detail to make the point unmissable: the
            ground had been drying out for weeks before that door finally opened. Noah could have
            climbed down on his own. He waited, the same way he waited to be told to get in, a
            year earlier.
          </p>
          <p>Then God speaks.</p>
          <VerseQuote
            text="And God spake unto Noah, saying, Go forth of the ark, thou, and thy wife, and thy sons, and thy sons' wives with thee. Bring forth with thee every living thing that is with thee, of all flesh, both of fowl, and of cattle, and of every creeping thing that creepeth upon the earth; that they may breed abundantly in the earth, and be fruitful, and multiply upon the earth."
            reference="Genesis 8:15-17"
          />
          <p>
            Be fruitful, and multiply. Those are the exact words spoken over the first man and
            woman in Genesis 1, said again here on the other side of the flood. This is not a
            brand new command for a brand new world. It is the same world, the same mission,
            picked back up.
          </p>
          <p>
            📌 <strong>Noah waited for God to tell him to leave the same way he waited to be told
            to go in.</strong> Obedience here is not one dramatic act. It is patience, held all
            the way through.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔥 The first thing Noah does on dry ground
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis even hands you the exact dates. On the first day of the first month of
            Noah&apos;s six hundred and first year, he removes the covering of the ark and sees
            dry ground. By the twenty-seventh day of the second month, the earth is fully dried.
            Almost two more months pass, ground dry the whole time, before God finally speaks and
            tells him to come out.
          </p>
          <p>
            Everyone finally steps out onto solid ground, and before Noah builds a house, or a
            fence, or plants a single seed, he builds an altar.
          </p>
          <VerseQuote
            text="And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar. And the LORD smelled a sweet savour; and the LORD said in his heart, I will not again curse the ground any more for man's sake; for the imagination of man's heart is evil from his youth; neither will I again smite any more every thing living, as I have done."
            reference="Genesis 8:20-21"
          />
          <p>
            📌 <strong>Read that carefully.</strong> The reason God gives for this mercy is not
            that people got better. He says the imagination of man&apos;s heart is evil from his
            youth, the very thing that led to the flood in the first place, and He decides to hold
            the world steady anyway.
          </p>
          <p>
            The flood did not change what is in a human heart. What changes here is what God
            decides to do about it. He commits Himself to the ground staying reliable, seedtime
            and harvest, cold and heat, summer and winter, day and night, without a break, for as
            long as the earth remains.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🩸 Blessing repeated, and a rule about blood
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 9 opens with God blessing Noah and his sons and repeating the same commission
            He gave Adam. Fill the earth.
          </p>
          <p>
            But the world these words land in has changed.
          </p>
          <VerseQuote
            text="And the fear of you and the dread of you shall be upon every beast of the earth, and upon every fowl of the air, upon all that moveth upon the earth, and upon all the fishes of the sea; into your hand are they delivered. Every moving thing that liveth shall be meat for you; even as the green herb have I given you all things. But flesh with the life thereof, which is the blood thereof, shall ye not eat."
            reference="Genesis 9:2-4"
          />
          <p>
            Before the flood, Genesis 1 gave people green plants to eat and never mentions meat.
            Now animals fear people for the first time, and meat is permitted, with one rule
            attached: never eat it with the blood still in it. Blood stands for life in this
            passage, and life belongs to God to give and take, not to be treated carelessly. And
            in the middle of all this sits a line that reaches all the way back to Genesis 1.
          </p>
          <VerseQuote
            text="Whoso sheddeth man's blood, by man shall his blood be shed: for in the image of God made he man."
            reference="Genesis 9:6"
          />
          <p>
            📌 <strong>Human life is protected because of what a human being is.</strong> Not
            because of what someone has done, or how useful they are, or who is watching. Genesis
            1:27 said every person carries God&apos;s image. That has not changed since the fall,
            and it has not changed after the flood either. It is the reason this rule exists at
            all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌈 A bow hung in the clouds
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then God makes a covenant, and it is worth noticing exactly who it is with. Not just
            Noah. Not just people.
          </p>
          <VerseQuote
            text="And I, behold, I establish my covenant with you, and with your seed after you; And with every living creature that is with you, of the fowl, of the cattle, and of every beast of the earth with you; from all that go out of the ark, to every beast of the earth. And I will establish my covenant with you; neither shall all flesh be cut off any more by the waters of a flood; neither shall there any more be a flood to destroy the earth."
            reference="Genesis 9:8-11"
          />
          <p>
            Every living creature and the earth itself are named in this promise, not only the
            family that walked off the ark. Nobody is asked to do anything in return. This is a
            promise God makes and God keeps, unconditionally, on His side alone.
          </p>
          <p>And He gives it a sign.</p>
          <VerseQuote
            text="I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth."
            reference="Genesis 9:13"
          />
          <p>
            A war bow, the kind used for shooting arrows, hung up in the clouds. Then listen to
            the reason He gives for putting it there.
          </p>
          <VerseQuote
            text="And I will remember my covenant, which is between me and you and every living creature of all flesh; and the waters shall no more become a flood to destroy all flesh. And the bow shall be in the cloud; and I will look upon it, that I may remember the everlasting covenant between God and every living creature of all flesh that is upon the earth."
            reference="Genesis 9:14-16"
          />
          <p>
            📌 <strong>The rainbow is not there to remind you. It is there so that God will look
            at it.</strong> The promise is held on His side of the sky, not on how well anyone
            below it behaves.
          </p>
          <p>
            That changes what a rainbow can mean to you the next time you see one. It is not a
            reward for having your life together. It is a sign hung up by a God who binds Himself
            to keep His word whether you are watching or not.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🍷 The flood did not wash away the human heart
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then the man who just survived the judgment of the entire world plants a vineyard.
          </p>
          <VerseQuote
            text="And Noah began to be an husbandman, and he planted a vineyard: And he drank of the wine, and was drunken; and he was uncovered within his tent."
            reference="Genesis 9:20-21"
          />
          <p>
            The flood washed away the world. It did not wash away the human heart. Genesis said as
            much itself back at the altar a few verses earlier, and here it is proven true in the
            very next generation, inside the family God just saved.
          </p>
          <p>
            While Noah lies uncovered, his son Ham sees him and goes and tells his two brothers
            outside. Shem and Japheth take a garment, walk in backward so they will not see their
            father, and cover him. When Noah wakes and learns what happened, he speaks a curse
            over Canaan, Ham&apos;s son, and a blessing over Shem and Japheth.
          </p>
          <p>
            📌 <strong>That is the honest thing about Genesis. It refuses to clean up its
            heroes.</strong> Whatever the fresh start after the flood was going to be, it was
            never going to be a better man walking off that ark. It was always going to have to
            be a better rescue than that.
          </p>
          <p>
            Noah is the best man Genesis could find in his entire generation, the one man walking
            with God while everyone around him had gone the other way, and even he falls within a
            few verses of stepping onto dry ground. If the flood was ever going to fix people by
            starting them over, this is the moment that answer breaks. The problem was never just
            outside people. It was inside them, and a new start on the same old ground was not
            going to be enough on its own.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌍 A list of names that quietly says there is no such thing as a stranger
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 10 opens with the sons of Noah, Shem, Ham, and Japheth, and then runs on into a
            long list of names. It is easy to hear this as filler on the way to the next real
            story. It is not.
          </p>
          <p>
            This is the world map of the ancient reader, every nation they had ever heard of,
            traced back to one family in one boat. 📌{" "}
            <strong>Genesis is quietly saying there is no such thing as a foreign
            people.</strong> Everyone on this list shares the same great-grandfather.
          </p>
          <p>Power reappears fast inside that list, too.</p>
          <VerseQuote
            text="And Cush begat Nimrod: he began to be a mighty one in the earth. He was a mighty hunter before the LORD: wherefore it is said, Even as Nimrod the mighty hunter before the LORD."
            reference="Genesis 10:8-9"
          />
          <p>
            A world that started over with one obedient family already has a mighty man building a
            name for himself a few verses later. The names keep spreading out after that, into
            lands and languages and coastlines, and Genesis sums the whole chapter up in one line
            at the end: these are the families of the sons of Noah, after their generations, in
            their nations, and by these were the nations divided in the earth after the flood.
          </p>
          <p>
            The list even tells you these families spread out after their tongues, after their
            families, in their nations. Genesis mentions their languages dividing them before it
            ever explains how those languages came to be different in the first place. Hold that
            question for tomorrow, because Genesis 11 is about to answer it directly.
          </p>
          <p>
            The command back in chapter 9 was fill the earth, and the earth is filling. Hold on to
            that as this list runs out, because in two more chapters God is going to reach into
            one of these very families, pull out one man, and promise to bless every nation on
            this list through him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔑 Where Day 4 leaves you
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So that is Day 4.</p>
          <p>
            The water goes down. The door opens. An altar goes up. And God makes a promise to a
            world that has not earned it.
          </p>
          <p>
            The rainbow is the thing to carry out of today. Not because it is pretty, but because
            of what God said it is for. I will look at it, and remember. The promise is held on
            God&apos;s side of the sky.
          </p>
          <p>
            And then, almost immediately, Noah fails. Genesis puts those two things right next to
            each other on purpose.
          </p>
          <p>
            📌 <strong>The world is steady because God is steady. Not because we are.</strong>
          </p>
          <p>
            If you want to go deeper into any of today&apos;s three chapters, the fuller studies
            are here: <ArticleLink href="/blog/genesis-8-explained">Genesis 8 explained</ArticleLink>,{" "}
            <ArticleLink href="/blog/genesis-9-explained">Genesis 9 explained</ArticleLink>, and{" "}
            <ArticleLink href="/blog/genesis-10-explained">Genesis 10 explained</ArticleLink>. And
            if you missed yesterday&apos;s reading, you can catch up on{" "}
            <ArticleLink href="/blog/bible-in-one-year-day-3-study-notes">
              Bible in One Year Day 3
            </ArticleLink>{" "}
            first.
          </p>
          <p>
            Tomorrow we step into Genesis 11, 12, and 13. A tower, a scattering, and a man told to
            leave everything and go.
          </p>
          <p>For now, look up.</p>
          <p>The bow is in the clouds.</p>
          <p>
            <strong>And God is looking at it.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Bible in One Year Day 4 reading?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 8, 9, and 10: the flood waters receding, Noah and his family leaving the ark,
          the altar and the rainbow covenant, Noah&apos;s drunkenness, and the table of nations
          descending from Shem, Ham, and Japheth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God &quot;remembered&quot; Noah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 8:1 says God remembered Noah, but He had not forgotten him. In the Bible, to
          remember someone is about acting on a promise, not recalling a memory. Once God
          remembers Noah, the wind rises and the water starts to go down.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Noah build an altar before doing anything else?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 8:20 says building an altar and offering a sacrifice was the very first thing
          Noah did once he was on dry ground, before building a home or planting a field. It was
          his response of worship after the flood, and God answers it by promising never again to
          curse the ground in that same way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the rainbow mean in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In Genesis 9:12-17, the rainbow is the sign of God&apos;s covenant never to destroy the
          earth again with a flood. God says the bow is set in the cloud so that He will look at
          it and remember His everlasting covenant with every living creature on the earth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Noah get drunk after the flood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 9:20-21 simply records that Noah planted a vineyard, drank wine, became drunk,
          and was uncovered in his tent. The text does not explain his reasons. What it does show
          is that surviving the flood did not make Noah, or anyone in his family, free from sin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What comes after Day 4 in the Bible in One Year?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 5 is Genesis 11 through 13: the tower of Babel and the scattering of the nations,
          and the start of Abram&apos;s story, when God calls him to leave his home and go to a
          land He will show him.
        </p>
      </section>
    </BlogPostShell>
  );
}
