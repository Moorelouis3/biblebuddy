import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("how-is-epiphany-celebrated-around-the-world", {
  title: "How Do Christians Celebrate Epiphany Around the World?",
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

export default function HowIsEpiphanyCelebratedAroundTheWorldPage() {
  return (
    <BlogPostShell
      slug="how-is-epiphany-celebrated-around-the-world"
      title={<>📖 How Do Christians Celebrate Epiphany Around the World?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              In one house, a child leaves a shoe by the door tonight, hoping
              a king will fill it by morning. In another house, on the exact
              same date, grandparents cut into a cake looking for a tiny
              figurine. In another, a crowd walks toward a river before dawn,
              waiting for a priest to bless the water. None of these families
              would call what the others are doing strange. They would call
              it Epiphany.
            </p>
            <p>
              You already know the basic meaning of the day if you have read{" "}
              <ArticleLink href="/blog/what-is-epiphany">
                what Epiphany actually celebrates
              </ArticleLink>
              . What this guide gives you is the part that never fits in one
              country&apos;s story: how wildly different the same feast looks
              once it leaves the church building and moves into kitchens,
              streets, and rivers on six continents.
            </p>
            <p>
              📌 <strong>Here is the plain answer. Epiphany is kept on or
              near January 6 by Christians from Spain to Ethiopia, and almost
              none of them keep it the same way. Spain and Latin America
              center it on gift giving kings. Italy gives the night to a
              kindly old woman with a broom. France and Germany each built a
              custom around food or song. Orthodox Christians in Russia and
              Ethiopia center the whole day on blessing water.</strong>
            </p>
            <p>
              This guide walks through six of those customs, where each one
              actually comes from as far as it can be traced, and what they
              all still have in common underneath the very different
              surfaces.
            </p>
            <p>Every historical claim below links back to a named source you can check for yourself.</p>
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
            It would be easy to read a list like this as travel trivia. A
            cake here, a parade there, nothing that touches your own walk
            with God.
          </p>
          <p>
            ⚠️ <strong>But look at what all six customs are actually
            witnesses to.</strong> Every single one of them exists because
            Christians in a particular place decided this feast, about God
            revealing Himself to the whole world, was worth building a real
            habit around. John saw where that kind of spread was always
            heading.
          </p>
          <VerseQuote
            text="After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands;"
            reference="Revelation 7:9"
          />
          <p>
            💡 <strong>That multitude is not a future promise with nothing
            behind it yet.</strong> It is already visible, in miniature,
            every January 6, in a Roscón de Reyes in Madrid, a star singer&apos;s
            chalk mark in Vienna, and a priest cutting a hole in river ice
            near Moscow. Different languages. Different customs. The same
            feast, because the same Christ showed Himself to all of them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 How Six Christian Cultures Keep the Same Day
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Spain and Latin America: The Night the Kings Arrive
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In Spain and across much of Latin America, Epiphany outranks
            December 25 for one thing: presents. NBC New York, reporting on
            the custom for its own readers, explains that in Spain and many
            Latin American countries, the Three Kings, not Santa Claus, are
            the ones credited with bringing gifts, and January 6 is the day
            children actually receive them.
          </p>
          <p>
            The evening of January 5 belongs to the Cabalgata de Reyes, a
            parade in which people dressed as Melchior, Caspar, and Balthazar
            ride through city streets, often on floats or animals, throwing
            candy to children lining the route. Families leave out shoes the
            night before, the same NBC report notes, so the Kings have
            somewhere to leave the gifts once the children are asleep.
          </p>
          <p>
            Food carries just as much weight as the gifts. The centerpiece is
            the Rosca de Reyes, a ring shaped sweet bread studded with
            candied fruit, with a small figurine of the baby Jesus baked
            inside. Whoever&apos;s slice holds the figurine is traditionally
            expected to host the next gathering, on Candlemas, February 2nd.
          </p>
          <p>
            📌 <strong>The whole custom is a dramatized retelling of
            Matthew 2.</strong> The gifts the Magi once laid in front of a
            child in Bethlehem now arrive, every year, in the shoes of
            children who have never read that chapter but already know the
            story by heart.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Italy: La Befana Finishes What Christmas Started
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Italy keeps the night before Epiphany for a very different
            visitor. Encyclopaedia Britannica&apos;s own entry describes La
            Befana in Italian tradition as the old woman who fills
            children&apos;s stockings with gifts on Epiphany, also called
            Twelfth Night.
          </p>
          <p>
            She is usually pictured as a hunched, broom carrying old woman
            who slips down chimneys on the night of January 5, leaving sweets
            for children who have been good and a lump of coal, these days
            usually rock candy shaped like coal, for those who have not. The
            legend most often told about her has the Magi stopping at her
            house on their own journey and inviting her to come along. She
            said no. Afterward, the story goes, she regretted it and has
            spent every year since searching for the Christ child herself,
            leaving gifts at every house she passes in case He is there.
          </p>
          <p>
            ⚠️ <strong>Treat her backstory carefully.</strong> Nobody can
            trace exactly when or how the Befana tradition began. What is
            well documented is the custom itself: a national holiday in
            Italy on January 6 that closes out the Christmas season, with
            the old woman as its central character rather than the Magi
            directly.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. France: A Cake, a Crown, and a Hidden Bean
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            France marks the day with the galette des rois, a round puff
            pastry cake usually filled with almond frangipane. The Connexion,
            an English language newspaper covering France, reports that the
            custom has existed in some form since at least the fourteenth
            century, though the record that far back is thin enough that it
            is worth treating as a tradition rather than a settled fact.
          </p>
          <p>
            What is well attested is the modern custom. A small charm called
            a fève is hidden inside the cake before baking. The Connexion
            notes it was originally an actual dried bean, which gave the
            charm its name, before it was gradually replaced by a small
            porcelain or plastic figure late in the nineteenth century.
            Whoever&apos;s slice holds the fève wears a paper crown and is
            named king or queen for the day.
          </p>
          <p>
            A 2019 survey for the French bakers&apos; federation, cited by
            the same outlet, found that 94 percent of people in France eat a
            galette at some point during the Epiphany season, which makes
            the custom one of the most widely kept of any on this list,
            religious or not.
          </p>
          <p>
            📌 <strong>The crown is the whole point.</strong> For one slice
            of cake, an ordinary person, often a child, gets treated like
            royalty at their own table. It is a small, edible echo of kings
            kneeling in front of someone far more ordinary than themselves in
            Bethlehem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Germany and Austria: Children Dressed as the Magi, Singing for Others
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In Germany and Austria, Epiphany is carried door to door by
            children. Dressed as the three kings and carrying a star on a
            pole, groups known as Sternsinger, star singers, go from house to
            house singing and asking for a donation, almost always for
            children&apos;s charities overseas rather than for themselves.
          </p>
          <p>
            The modern organizing body behind the German action, the
            Kindermissionswerk, now known simply as Die Sternsinger, traces
            its own roots back to February 2, 1846, when a teenager named
            Auguste von Sartorius founded a children&apos;s aid group around
            one idea: children helping children. That same organization,
            based in Aachen, still runs the annual star singing collection
            today, supporting partner projects across Asia, Africa, and
            Latin America.
          </p>
          <p>
            Many of these households also keep the custom of chalking the
            door, writing the year and the letters C, M, and B above the
            doorframe as a blessing for the house. In some homes the star
            singers write the chalk mark themselves as part of their visit,
            right in the middle of{" "}
            <ArticleLink href="/blog/what-is-christmastide">
              the twelve days the church calls Christmastide
            </ArticleLink>
            .
          </p>
          <p>
            💡 <strong>This is the one custom on this list built entirely
            around giving, not receiving.</strong> The children playing kings
            are not collecting gifts for themselves. They are handing
            everything they collect to children they will never meet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Russia: A Hole Cut in the Ice
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Russia and other Eastern Orthodox countries do not center
            Epiphany on the Magi at all. They call it Theophany, and it
            belongs to Christ&apos;s baptism in the Jordan. Many of these same
            churches still follow the older Julian calendar, which is the
            same reason{" "}
            <ArticleLink href="/blog/why-is-christmas-on-january-7">
              some Orthodox Christmases fall on January 7
            </ArticleLink>
            . The Orthodox Church in America describes the Great Blessing of
            Water as the rite at the heart of the day, performed in churches
            and then, often, repeated outdoors at a river, lake, or well.
          </p>
          <p>
            In Russia that outdoor blessing has grown into one of the
            country&apos;s most striking winter images. Atlas Obscura&apos;s
            own coverage of the custom describes a cross shaped hole cut into
            the ice of a frozen river or lake, called an Iordan, after a
            priest blesses the water. Believers then climb down and immerse
            themselves, traditionally three times, in honor of the Trinity,
            in water that can be well below freezing in the open air.
          </p>
          <p>
            ⚠️ <strong>Do not treat the ice dive as the ancient part.</strong>{" "}
            The blessing of the water itself goes back to the earliest
            centuries of the Church. The icy plunge is a newer, popular
            addition, and some Orthodox clergy themselves have pushed back on
            treating it as a required practice rather than an optional, and
            genuinely risky, custom. Russian officials now prepare thousands
            of supervised sites each year largely for safety reasons.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Ethiopia: Timkat and the Procession of the Tabot
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Few countries keep Epiphany louder, or longer, than Ethiopia.
            The Ethiopian Orthodox Tewahedo Church calls its own Epiphany
            celebration Timkat, and the Ethiopian Embassy&apos;s own account
            of the festival explains that the day marks Christ&apos;s baptism
            in the Jordan, the same event Eastern Orthodox Christians
            remember as Theophany.
          </p>
          <p>
            On the eve of the feast, called Ketera, priests carry the tabot,
            a replica of the Ark of the Covenant normally kept hidden inside
            each church, in procession to a nearby river, pool, or
            specially built reservoir. The tabot stays there overnight under
            guard while crowds gather, sing, and keep an all night vigil.
            Toward dawn, a priest blesses the water, and the gathered crowd
            is sprinkled with it or, for many, immersed in it, as a renewal
            of their own baptismal vows.
          </p>
          <p>
            In December 2019 UNESCO added Ethiopia&apos;s Epiphany
            celebration to its Representative List of the Intangible
            Cultural Heritage of Humanity, a recognition the Ethiopian
            Embassy itself announced and welcomed at the time.
          </p>
          <p>
            📌 <strong>Notice what Russia and Ethiopia share that Spain,
            Italy, France, and Germany do not.</strong> Two very different
            Orthodox churches, thousands of miles apart, independently built
            their biggest Epiphany custom around the same thing: real water,
            really blessed, for real people to step into.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping Epiphany Wherever You Live
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not have to move to Seville or Addis Ababa to let this feast shape your January 6. Here are seven ways to borrow from it honestly.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Matthew 2:1 to 12 before you try any custom.</strong>{" "}
            Every tradition on this list is a response to that one chapter.
            Know the source before you borrow the symbol.
          </li>
          <li>
            <strong>Bake something, and say why you baked it.</strong> A
            simple ring shaped cake with a bean or small charm hidden inside
            can carry the same lesson the galette des rois carries, if you
            tell your family what it is for before you cut it.
          </li>
          <li>
            <strong>Give before you receive.</strong> Borrow the heart of the
            German star singers by having your family give something away,
            time, money, or a meal, on or near January 6, rather than only
            receiving.
          </li>
          <li>
            <strong>Let your kids ask who the Magi represent.</strong> They
            had no covenant claim on Israel&apos;s God, and they found Him
            anyway. Ask who around you still needs to hear that the door is
            open to them too.
          </li>
          <li>
            <strong>Learn one Eastern Orthodox custom on purpose.</strong>{" "}
            You do not need to find frozen water to appreciate what the Great
            Blessing of Water is actually saying about Christ&apos;s baptism.
          </li>
          <li>
            <strong>Do not adopt a custom you cannot explain.</strong> If you
            cannot say in one sentence why a tradition exists, you are
            borrowing decoration, not meaning. Learn the reason first.
          </li>
          <li>
            <strong>Close your own Christmas season with one deliberate
            act of worship.</strong> Whatever your family&apos;s custom,
            spend five minutes on January 6 thanking God that He showed
            Himself to people with no claim on Him at all, including you.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses Behind These Epiphany Customs
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every custom above is a culture&apos;s own way of pointing back at these five verses.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 2:9 to 11</h3>
        <VerseQuote
          text="When they had heard the king, they departed; and, lo, the star, which they saw in the east, went before them, till it came and stood over where the young child was. When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh."
          reference="Matthew 2:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This single scene is the seed behind the Spanish Cabalgata, the
            shoes left out overnight, and every gift exchanged on January 6
            anywhere in the world. The Magi gave first. Every custom built
            on gift giving is trying to copy that order.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Isaiah 60:3</h3>
        <VerseQuote
          text="And the Gentiles shall come to thy light, and kings to the brightness of thy rising."
          reference="Isaiah 60:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Written centuries before any Magi packed for their trip, this
            verse already pictures outsiders and kings drawn toward a light
            that was never their own to begin with. Every country on this
            list is still, in its own way, that light drawing in a different
            crowd.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Psalm 72:10 and 11</h3>
        <VerseQuote
          text="The kings of Tarshish and of the isles shall bring presents: the kings of Sheba and Seba shall offer gifts. Yea, all kings shall fall down before him: all nations shall serve him."
          reference="Psalm 72:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Early readers heard this psalm echoing under Matthew&apos;s
            account of the Magi, which is most likely where the later legend
            of three crowned kings first grew from. The galette des rois
            crown and the Cabalgata&apos;s costumed kings are both, at bottom,
            dramatizing this exact verse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Acts 10:34 and 35</h3>
        <VerseQuote
          text="Then Peter opened his mouth, and said, Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him."
          reference="Acts 10:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Peter said this out loud for the first time standing in the home
            of a Roman soldier, a Gentile with no claim on Israel&apos;s
            covenant at all. It is the same discovery the Magi made decades
            earlier at a much smaller scale, now stated as a rule for every
            nation, not just one visit.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Revelation 7:9</h3>
        <VerseQuote
          text="After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands;"
          reference="Revelation 7:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is where every custom on this list is ultimately headed. Not
            one culture keeping one tradition, but every nation and tongue,
            together, in front of the same throne. The Roscón, the galette,
            the star singers, and the Iordan are all small, present day
            rehearsals of that one future gathering.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Epiphany Customs
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do different countries celebrate Epiphany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Spain and much of Latin America center the day on gift giving kings
          and a parade called the Cabalgata de Reyes. Italy gives the night
          before to an old woman named La Befana. France eats a cake called
          the galette des rois. Germany and Austria send children dressed as
          the Magi door to door collecting for charity. Russia and Ethiopia,
          both Orthodox, center the day on blessing water.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do people in Spain open gifts on January 6 instead of December 25?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the Spanish tradition credits the Three Kings, not Santa
          Claus, with bringing the gifts, and the Kings are remembered on the
          day tied to their visit in Matthew 2, which the Western Church
          keeps as Epiphany, January 6.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who is La Befana?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          La Befana is a figure in Italian folklore, usually pictured as an
          old woman with a broom, who is said to leave gifts for children on
          the night before Epiphany. Her exact origin cannot be traced with
          certainty, though the most common legend ties her to the Magi
          themselves, who are said to have stopped at her house on their way
          to Bethlehem.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is hidden inside a galette des rois?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A small charm called a fève, French for bean, because the charm was
          originally an actual dried bean before it was replaced by a small
          porcelain or plastic figure in the late nineteenth century.
          Whoever&apos;s slice contains it is crowned king or queen for the
          day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do the German star singers actually do?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Groups of children, usually three at a time dressed as the Magi and
          carrying a star on a pole, go house to house around Epiphany
          singing and collecting donations for children&apos;s charities,
          often overseas. Many also chalk a blessing above the door of the
          homes they visit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do Russians cut a hole in the ice for Epiphany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Russian Orthodox Christians call the day Theophany and center it on
          Christ&apos;s baptism, not the Magi. After a priest blesses a river
          or lake, many believers immerse themselves in the icy water three
          times, honoring the Trinity, as a popular custom alongside the
          Church&apos;s own Great Blessing of Water.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Timkat in Ethiopia?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Timkat is the Ethiopian Orthodox Tewahedo Church&apos;s own name
          for Epiphany. It centers on an overnight procession of the tabot,
          a replica of the Ark of the Covenant, to a body of water, followed
          by a blessing of that water at dawn. UNESCO added the celebration
          to its Intangible Cultural Heritage list in 2019.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Three Kings Day the same as Epiphany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Three Kings Day, Dia de Reyes, and Epiphany all name the same
          day on the Western church calendar. The different names simply
          reflect which culture is naming it, and most Spanish speaking
          countries use Three Kings Day as their everyday term for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do all Christians celebrate Epiphany the same way?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and that is really the whole point of this guide. Even
          Christians who agree on what the day means, God revealing Himself
          to the world, have built very different customs around it
          depending on their own country and church tradition.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can a Protestant family borrow a Catholic or Orthodox Epiphany custom?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nothing in Scripture forbids it, as long as the custom is kept with
          understanding rather than superstition. A family can bake a king
          cake, give to charity like the star singers do, or simply read
          Matthew 2 together without adopting the full liturgical calendar
          that produced the custom in the first place.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the cakes, the costumes, and the cold water, and three things remain true.</p>
          <p>
            📌 <strong>One feast, many doors.</strong> Spain hands gifts
            through a parade. Germany hands them through a children&apos;s
            charity. Russia and Ethiopia hand a blessing through water. None
            of them is the real version with the others as imitations.
          </p>
          <p>
            📌 <strong>Every custom is still answering Matthew 2.</strong>{" "}
            Whatever shape it takes in a given country, each tradition is
            some culture&apos;s own way of saying what the Magi said first:
            God showed Himself, and it was worth traveling for.
          </p>
          <p>
            📌 <strong>The variety is not a flaw in the Church. It is the
            promise working exactly as written.</strong> Gentiles and kings
            were always going to come to the light from more directions than
            one.
          </p>
          <p>
            Wherever you live, and whatever is on your own table this
            January, let the Spanish shoe, the Italian stocking, and the
            Ethiopian riverbank remind you of the same thing.{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              Churches keep this calendar very differently
            </ArticleLink>
            , but they are all still keeping watch for the same God who
            showed up once and has never really left.
          </p>
          <p>❓ Which of these six customs would actually teach your own family something true about Christ, not just something festive?</p>
          <p>📌 <strong>He showed Himself to strangers once. He is still willing to be found, in every language there is.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="6 November 2026"
        sources={[
          {
            title: "What Is Three Kings Day and How Is It Celebrated?",
            publisher: "NBC New York",
            url: "https://www.nbcnewyork.com/holidays/what-is-three-kings-day-and-how-is-it-celebrated/4031388/",
            note: "The source for Spain and Latin America's Three Kings Day: the Cabalgata de Reyes parade, children leaving out shoes, and the Rosca de Reyes tradition.",
          },
          {
            title: "Befana",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Befana",
            note: "The source for La Befana as the old woman of Italian Epiphany tradition who fills children's stockings on Twelfth Night.",
          },
          {
            title: "France's galette des rois: Six facts about this January 6 cake",
            publisher: "The Connexion",
            url: "https://www.connexionfrance.com/magazine/frances-galette-des-rois-six-facts-about-this-january-6-cake/196050",
            note: "The source for the galette des rois dating to at least the fourteenth century, the fève's change from a real bean to a porcelain charm, and the 2019 bakers' federation survey.",
          },
          {
            title: "Historie und Gründung",
            publisher: "Kindermissionswerk \"Die Sternsinger\" e.V.",
            url: "https://www.sternsinger.de/ueber-uns/geschichte",
            note: "The source for the organization's own founding on 2 February 1846 by Auguste von Sartorius, and its present day name and mission behind the German and Austrian star singing custom.",
          },
          {
            title: "Fleeting Wonders: Russian Orthodox Christians Take the Epiphany Plunge",
            publisher: "Atlas Obscura",
            url: "https://www.atlasobscura.com/articles/fleeting-wonders-russian-orthodox-christians-take-the-epiphany-plunge",
            note: "The source for the Russian custom of cutting a cross shaped hole in river ice and immersing three times after the water is blessed.",
          },
          {
            title: "Feast of the Theophany of our Lord and Savior Jesus Christ",
            publisher: "Orthodox Church in America (OCA)",
            url: "https://www.oca.org/saints/lives/2018/01/06/100106-feast-of-the-theophany-of-our-lord-and-savior-jesus-christ",
            note: "The source for the Great Blessing of Water as the Orthodox Church's own rite at the center of Theophany.",
          },
          {
            title: "Ethiopian Epiphany Inscribed On UNESCO Intangible Cultural Heritage Lists",
            publisher: "Embassy of Ethiopia, Washington D.C.",
            url: "https://ethiopianembassy.org/ethiopian-epiphany-inscribed-on-unesco-intangible-cultural-heritage-lists-december-12-2019/",
            note: "The source for Timkat's UNESCO inscription in December 2019 and the embassy's own description of the tabot procession and water blessing.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
