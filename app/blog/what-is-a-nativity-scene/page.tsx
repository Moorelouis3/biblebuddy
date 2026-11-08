import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-a-nativity-scene", {
  title: "What Is a Nativity Scene? The History Behind the Christmas Crib",
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
    <Link
      href={href}
      className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]"
    >
      {children}
    </Link>
  );
}

export default function WhatIsANativityScenePage() {
  return (
    <BlogPostShell
      slug="what-is-a-nativity-scene"
      title={<>📖 What Is a Nativity Scene? The History Behind the Christmas Crib</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              A little wooden stable shows up in your church lobby, or your neighbor&apos;s yard, or
              on your own shelf, every December.
            </p>
            <p>
              Mary. Joseph. A baby in a feeding trough. A few shepherds. Three kings carrying
              boxes.
            </p>
            <p>You have looked at it a hundred times and probably never asked where it came from.</p>
            <p>
              📌 <strong>Here is the plain answer. A nativity scene is a model of Christ&apos;s
              birth, and the first one was not a model at all. In the year 1223, a man named Francis
              of Assisi staged it live, with real hay and real animals, in a cave in an Italian hill
              town called Greccio.</strong>
            </p>
            <p>
              One more thing up front. The shepherds and the three kings standing together in your
              set never actually met like that in the Bible. One Gospel puts the shepherds there the
              night Jesus was born. The other puts the visitors with the star at a house, later,
              calling Jesus a young child rather than a newborn.
            </p>
            <p>That is a reason to learn where the scene actually came from, not to throw it out.</p>
            <p>Every historical claim below links back to a named source you can check yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It would be easy to treat a nativity scene as background decoration, something that
            comes out of a box with the lights and the wreath.
          </p>
          <VerseQuote
            text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
            reference="John 1:14"
          />
          <p>
            ⚠️ <strong>But that verse is the whole reason the scene exists.</strong> God did not stay
            an idea. He took on a body you could actually look at, in a specific place, at a
            specific time.
          </p>
          <p>
            A nativity scene is one way the church has tried to make that fact impossible to float
            past. Not a symbol for the Incarnation. An attempt to put it where your eyes can land.
          </p>
          <p>
            💡 <strong>That is also why the history matters.</strong> A tradition built to make a
            true thing feel real should not get its own facts wrong along the way.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Where the Nativity Scene Actually Comes From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. What the Bible Actually Says Happened
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the text itself, because the scene on your shelf quietly edits it.</p>
          <p>Luke tells you where the baby was laid, and why.</p>
        </div>
        <VerseQuote
          text="And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
          reference="Luke 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That same night, an angel sends shepherds to go see it, and they find exactly what they
            were told.
          </p>
        </div>
        <VerseQuote
          text="And they came with haste, and found Mary, and Joseph, and the babe lying in a manger."
          reference="Luke 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Matthew tells a different visit, with different people, at a different point in the
            story.
          </p>
        </div>
        <VerseQuote
          text="And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh."
          reference="Matthew 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the two details that do not match a standard nativity set.</strong>{" "}
            Matthew calls Jesus a young child, not a newborn, and places him in a house, not a
            stable. Most Bible teachers read that as proof this visit came some real time after the
            birth, not the same night.{" "}
            <ArticleLink href="/blog/who-were-the-wise-men">Who the wise men actually were</ArticleLink>{" "}
            is worth asking honestly, not assuming from the set on your shelf.
          </p>
          <p>
            ⚠️ Nobody has to throw out the shepherds and kings standing together. It is devotional
            art, not a courtroom transcript. It compresses two separate Gospel visits into one
            picture so you can hold the whole story in your eyes at once.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Priest, a Cave, and Real Hay in 1223
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man credited with the first nativity scene is Francis of Assisi, and the church has
            never let the memory of it drift into vague legend.
          </p>
          <p>
            Pope Francis wrote an entire letter about it in 2019, titled Admirabile Signum, and
            signed it at the actual site. The letter says Francis of Assisi stopped at Greccio, a
            small Italian hill town, and the caves there reminded him of Bethlehem.
          </p>
          <p>
            📌 <strong>Drawing on the earliest biography of Francis, written by Thomas of Celano,
            the letter says Francis wanted to bring to life the memory of the babe born in
            Bethlehem.</strong> He asked a local nobleman for a manger, hay, and animals, then
            invited the town.
          </p>
          <p>
            💡 <strong>Here is the detail that gets lost in later versions of this story.</strong> At
            Greccio there were no statues at all. The letter is specific about that. The nativity
            scene was a living event, enacted and experienced by the people standing there, not an
            object anyone looked at from a distance.
          </p>
          <p>
            A priest celebrated the Eucharist right over the manger that night, tying the newborn
            Christ to the bread of communion. One account Celano preserved describes a man there
            seeing a vision of the actual infant Jesus lying in the hay. The letter simply says
            everyone went home with joy.
          </p>
          <p>
            📌 <strong>One thing started the whole custom.</strong> A priest wanted people to feel,
            with their own eyes, what they already believed. Every carved figure since is still
            trying to do that same one thing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. How a Living Scene Became a Word, Then a Craft
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Francis acted his scene out with real people and real hay. Within a few generations,
            churches started keeping a version of it standing year round, so someone had to make it
            out of something that did not need to breathe.
          </p>
          <p>
            Merriam Webster traces the English word crèche to the Old French creche, meaning manger
            or crib, itself from a Germanic root related to the Old High German krippa, also meaning
            manger. The dictionary notes the word only shifted to naming a whole display, rather
            than just the feeding trough itself, by the late 1700s.
          </p>
          <p>
            Italian took a different root for the same idea. The Victoria and Albert Museum&apos;s
            own account of the tradition says the Italian word presepio comes from the Latin word
            for crib, and that churches and homes across Europe began building their own versions
            soon after Greccio.
          </p>
          <p>
            💡 <strong>Notice what changed and what did not.</strong> The word kept meaning manger
            for centuries. What it pointed at grew from one box of hay into an entire scene. The
            feeding trough standing in for where God chose to start never did change.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Naples Turned a Simple Scene Into an Art Form
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nowhere ran further with the idea than Naples, Italy.
          </p>
          <p>
            The Victoria and Albert Museum&apos;s account of the Neapolitan presepio says the
            eighteenth century was its high point, when aristocratic patrons, including the
            Neapolitan king himself, employed skilled sculptors and painters to build increasingly
            elaborate scenes.
          </p>
          <p>
            📌 <strong>These were not quiet, reverent boxes.</strong> The museum describes them as
            theatrical, mixing the Holy Family with ordinary street life. A tavern with sausages
            hanging from the rafters. A market stocked with fruit and fish. Foreign musicians mingling
            with locals. Even ruined pagan temples worked into the backdrop, read by the museum as
            the church replacing the old religion around it.
          </p>
          <p>
            💡 Naples was not decorating the Gospel with clutter. It was insisting Christ was born
            into an actual, crowded, working city, not a sealed diagram with nothing else in the
            frame.
          </p>
          <p>
            One Neapolitan custom has quietly spread everywhere a nativity scene gets set up today.
            The museum notes that the baby Jesus figure traditionally stays out of the manger until
            midnight on{" "}
            <ArticleLink href="/blog/what-is-christmas-eve">Christmas Eve</ArticleLink>, so the scene
            genuinely waits for the birth instead of displaying it from the first day of Advent.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Each Figure Is Actually Meant to Teach You
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Admirabile Signum does not stop at history. Pope Francis walks through what each figure
            in the scene is supposed to say to the person looking at it.
          </p>
          <p>
            The shepherds, the letter says, become the first to see the most essential thing of all,
            because it is the humble and the poor who greet the Incarnation first. The poor figures
            scattered through a scene are not filler either. The letter calls them a privileged part
            of the mystery, often the first to recognize God&apos;s presence in a room.
          </p>
          <p>
            📌 <strong>The star and the angels get their own meaning too.</strong> The letter reads
            them as a sign that everyone looking at the scene is also called to set out for the cave
            and worship, not just admire it from a safe distance.
          </p>
          <p>
            The wise men carry the furthest message of all. The letter says they teach that people
            can come to Christ by a very long route, and that their gifts were never random: gold for
            his kingship, incense for his divinity, myrrh for the humanity that would face death.
          </p>
          <p>
            💡 Even the manger gets a reading. The letter notes that Jesus was laid where animals
            feed, and that the hay became the first bed of the one who would later call himself the
            bread come down from heaven. The feeding trough was never an accident.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Why the Church Still Pushes This Tradition Today
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Admirabile Signum is not a nostalgic essay. It is an active request. Pope Francis asks
            Catholic families, schools, hospitals, workplaces, and town squares to keep setting up a
            nativity scene on purpose, not out of habit.
          </p>
          <p>
            📌 <strong>The letter gives the custom a real job, not just a sentimental one.</strong>{" "}
            With the simplicity of that first scene at Greccio, it says, Francis carried out a great
            work of evangelization, and the crèche still belongs to the work of passing the faith to
            the next generation.
          </p>
          <p>
            It even names the moment most families remember from childhood. When the infant is
            placed in the manger at Christmas, the letter says, the scene suddenly comes alive,
            because God appears as a child small enough to take into your arms.
          </p>
          <p>
            💡 That is also why Pope Francis signed this exact letter at Greccio himself, in the cave
            Thomas of Celano first wrote about nearly eight hundred years earlier. The custom a
            parish priest started is still being defended, by name, by the church that outlived him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Setting Up Your Own Nativity Scene
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need Greccio&apos;s cave or Naples&apos;s workshops to let this history actually shape how you keep the tradition this year.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Luke 2 and Matthew 2 before you unpack the box.</strong> Knowing which
            figures the Bible puts together, and which ones it does not, changes how you look at
            your own set.
          </li>
          <li>
            <strong>Try the Christmas Eve tradition for the baby Jesus figure.</strong> Leave the
            manger empty through Advent and place the infant in it at midnight. The wait is the
            point.
          </li>
          <li>
            <strong>Save the wise men for Epiphany if you want the timeline right.</strong> Moving
            them in from a distance on January 6 matches{" "}
            <ArticleLink href="/blog/what-is-epiphany">what Epiphany itself</ArticleLink> is
            actually marking.
          </li>
          <li>
            <strong>Tell your kids one true story behind one figure this year.</strong> Pick the
            shepherds or the manger itself and explain why that detail is in the Bible at all.
          </li>
          <li>
            <strong>Put a nativity scene somewhere other than your own living room.</strong> A desk
            at work, a classroom, a hospital room. Admirabile Signum specifically asks for this.
          </li>
          <li>
            <strong>Do not confuse the scene with the text.</strong> Enjoy the shepherds and the
            kings standing side by side, but know which Gospel actually puts them where.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About the Nativity Scene
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These five passages are the entire Bible behind the figures in your set.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 2:7</h3>
        <VerseQuote
          text="And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
          reference="Luke 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every nativity scene in the world exists because of this one verse. The feeding trough is
            not decoration. It is the actual reported location.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 2:12</h3>
        <VerseQuote
          text="And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger."
          reference="Luke 2:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An angel calls a baby in a feeding trough a sign, not an embarrassment to explain away.
            📌 God chose the humble detail on purpose, long before Francis ever staged it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 2:16</h3>
        <VerseQuote
          text="And they came with haste, and found Mary, and Joseph, and the babe lying in a manger."
          reference="Luke 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the exact grouping, Mary, Joseph, and the baby, that a nativity scene is actually
            drawn from. The shepherds who ran to see it are the reason the scene has an audience
            built in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 2:11</h3>
        <VerseQuote
          text="And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh."
          reference="Matthew 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The wise men belong to this verse, not the manger scene. 💡 Knowing that does not make
            them less welcome in your set. It makes the whole story bigger than one single night.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 1:14</h3>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse every carved figure is quietly trying to say out loud. God did not stay
            distant. He moved in, with a body you could have actually touched.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Nativity Scenes
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a nativity scene?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A nativity scene is a representation, live or in model form, of the birth of Jesus
          Christ, usually showing Mary, Joseph, the infant Jesus in a manger, and figures drawn from
          Luke and Matthew&apos;s Gospel accounts, such as shepherds, angels, and the wise men.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who invented the nativity scene?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Francis of Assisi is credited with the first one, staged live with real hay and animals
          in a cave at Greccio, Italy, in 1223. Pope Francis&apos;s own 2019 letter on the tradition,
          Admirabile Signum, confirms the date and location and draws on the earliest biography of
          Francis for the details.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do nativity scenes show shepherds and wise men together if the Bible does not put
          them there at the same time?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because a nativity scene is devotional art, not a courtroom transcript. Luke&apos;s
          shepherds arrive the night of the birth, at a manger. Matthew&apos;s wise men arrive later,
          at a house, calling Jesus a young child rather than a newborn. A nativity set compresses
          both visits into one picture so the whole story can be seen at a glance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is a nativity scene called in other languages?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          French calls it a crèche, from an Old French word for manger. Italian calls it a presepio
          or presepe, from the Latin word for crib. Both words started out naming the feeding trough
          itself before coming to mean the whole scene built around it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          When should you put the baby Jesus figure in the manger?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The traditional Neapolitan custom, recorded by the Victoria and Albert Museum, places the
          infant figure in the manger at midnight on Christmas Eve, so the display actually waits
          for the birth rather than showing it the whole season.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          When should the wise men be added to a nativity scene?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many families add the wise men figures gradually, moving them closer each day, and have
          them arrive at the scene on Epiphany, January 6, the day that closes{" "}
          <ArticleLink href="/blog/meaning-of-the-twelve-days-of-christmas">
            the twelve days of Christmas
          </ArticleLink>{" "}
          and matches Matthew&apos;s account of a visit that came some time after the birth rather
          than the same night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why is Naples, Italy, famous for nativity scenes?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eighteenth century Naples turned the simple scene into a genuine art form. The Victoria and
          Albert Museum notes that aristocratic patrons, including the Neapolitan king, hired
          sculptors and painters to build elaborate scenes mixing the Holy Family with ordinary
          street life, a craft the city is still known for today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What do the three gifts the wise men brought actually mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Francis&apos;s letter on the nativity scene explains the traditional reading. Gold
          honors Jesus as king. Frankincense points to his divinity. Myrrh, used in burial
          preparation, points ahead to his death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is setting up a nativity scene biblical, or just a tradition?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never commands a physical display. The custom is a tradition, started in 1223,
          though every figure in a careful set is drawn directly from the birth accounts in Luke and
          Matthew. It is a tradition built entirely out of Bible text, even though the text itself
          never asks for one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestant Christians set up nativity scenes too?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, widely. A nativity scene carries none of the specific doctrinal weight of a saint&apos;s
          statue or relic, so most Protestant families and churches keep one as a plain visual
          retelling of Luke and Matthew&apos;s Christmas accounts, the same accounts{" "}
          <ArticleLink href="/blog/what-the-first-christmas-actually-looked-like">
            the first Christmas
          </ArticleLink>{" "}
          is actually built from.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the plastic and the painted plaster, and three things remain true.</p>
          <p>
            📌 <strong>A parish priest started this to make a real event feel real.</strong> Francis
            of Assisi did not invent a doctrine at Greccio. He built a cave, filled it with hay, and
            let people stand close enough to feel what they already believed.
          </p>
          <p>
            📌 <strong>Every figure is still trying to point past itself.</strong> The shepherd
            points to who God shows up for first. The wise men point to how far someone can travel to
            find Him. The manger points straight at a verse you can still read in Luke tonight.
          </p>
          <p>
            📌 <strong>The church never stopped asking you to keep setting one up.</strong> Not out
            of nostalgia. Pope Francis called it evangelization in writing, nearly eight hundred years
            after Greccio, because a scene you can see still reaches people a sentence sometimes
            cannot.
          </p>
          <p>
            Whatever sits on your own shelf this year, plastic or carved, inherited or bought last
            week, it is standing in for a real decision God made. Not to stay an idea. To be laid
            somewhere animals ate, where ordinary people could actually come and look.
          </p>
          <p>❓ When you set your own scene up this year, what will you actually stop and look at?</p>
          <p>
            📌 <strong>Start with the manger. That is where the whole story started too.</strong>
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="8 November 2026"
        sources={[
          {
            title: "Admirabile Signum: Apostolic Letter on the Meaning and Importance of the Nativity Scene",
            publisher: "Pope Francis, via vatican.va",
            year: "2019",
            url: "https://www.vatican.va/content/francesco/en/apost_letters/documents/papa-francesco-lettera-ap_20191201_admirabile-signum.html",
            note: "The primary source for the 1223 Greccio event drawn from Thomas of Celano's account, the detail that no statues were used at Greccio, the Eucharist celebrated over the manger, and the meaning given to the shepherds, the poor, the star, the wise men's gifts, and placing the infant figure in the manger at Christmas.",
          },
          {
            title: "Pope visits place of first Nativity Scene, in Italian town of Greccio",
            publisher: "Vatican News",
            year: "2019",
            url: "https://www.vaticannews.va/en/pope/news/2019-12/pope-francis-reflection-greccio-nativity-scene.html",
            note: "Confirms Pope Francis signed Admirabile Signum at Greccio on 1 December 2019, and describes the grotto and its medieval frescoes of Francis and the Christ child.",
          },
          {
            title: "The Neapolitan Nativity",
            publisher: "Victoria and Albert Museum",
            url: "https://www.vam.ac.uk/articles/the-neapolitan-nativity",
            note: "The source for the Italian word presepio coming from the Latin for crib, the eighteenth century flourishing of Neapolitan nativity scenes under aristocratic and royal patrons, the street life details worked into the scenes, and the tradition of placing the infant figure in the crib only at midnight on Christmas Eve.",
          },
          {
            title: "Creche",
            publisher: "Merriam-Webster",
            url: "https://www.merriam-webster.com/dictionary/creche",
            note: "The source for the word crèche descending from the Old French creche, meaning manger or crib, from a Germanic root related to Old High German krippa, and for the word's sense shifting to a Nativity display by the late eighteenth century.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
