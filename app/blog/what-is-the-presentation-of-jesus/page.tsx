import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-presentation-of-jesus", {
  title: "What Is the Presentation of Jesus in the Temple? The Meaning Explained",
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

export default function WhatIsThePresentationOfJesusPage() {
  return (
    <BlogPostShell
      slug="what-is-the-presentation-of-jesus"
      title={<>📖 What Is the Presentation of Jesus in the Temple? The Meaning Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              A baby gets carried into a building. An old man picks him up. An old woman starts
              talking about him to strangers. On the surface, nothing happens.
            </p>
            <p>
              But Luke spends twenty verses on this one afternoon, more space than he gives to most
              of Jesus&apos; actual miracles. That alone should tell you something got missed if you
              only ever heard this called a quaint custom about a temple visit.
            </p>
            <p>
              📌 <strong>Here is the plain answer. The Presentation of Jesus is the moment, forty
              days after His birth, when Mary and Joseph brought the infant Jesus to the Jerusalem
              temple to fulfill two separate requirements under the Law of Moses: a mother&apos;s
              purification offering, and the dedication of a firstborn son to God. What turns that
              ordinary errand into one of the most quoted scenes in the Gospels is what two elderly
              strangers said over the child once he arrived.</strong>
            </p>
            <p>
              This guide is not about the later feast day built on this event, with its candles and
              its calendar. That has its own full treatment in{" "}
              <ArticleLink href="/blog/what-is-candlemas">this guide to Candlemas</ArticleLink>. This
              one stays on the event itself. What the Law actually required. What Simeon&apos;s words
              meant, and still mean, for anyone reading them today. And why Catholics and Protestants
              land in slightly different places on the same twenty verses.
            </p>
            <p>Every historical and doctrinal claim below links back to a named source you can check for yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It would have been easy for Luke to skip this scene. Jesus was six weeks old. Nothing
            about the trip looked newsworthy to anyone standing in the temple courts that day.
          </p>
          <p>
            ⚠️ <strong>But look at what actually happens underneath the errand.</strong> God the Son
            submits to a human law, carried in the arms of parents who could not afford the normal
            offering. Before He ever preaches a sermon or heals a single person, Jesus is already
            doing the thing the rest of His life will keep doing: keeping the Law perfectly, on
            behalf of people who never could.
          </p>
          <p>
            That has a direct bearing on your own life. If your standing with God depended on your
            own perfect law keeping, this story would be terrifying. It is not asking that of you.
          </p>
          <p>
            📌 <strong>It is telling you that Jesus did the keeping for you, starting before He could
            even walk.</strong> Paul puts words to exactly this later, writing that Christ was &quot;made
            under the law, to redeem them that were under the law.&quot;
          </p>
          <p>
            And notice who God chose to recognize this quietly, before anyone else did. Not the
            priests on duty that day. Two elderly, ordinary believers who had simply kept showing up
            and kept watching, longer than it probably felt reasonable to.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Presentation Actually Means
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Two Different Laws Were Being Kept at Once
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most retellings flatten this scene into one errand. Scripture is actually describing two
            separate commands from the Law of Moses, fulfilled on the same trip.
          </p>
          <p>
            The first is Mary&apos;s purification. Leviticus set a waiting period after childbirth,
            forty days for a son, after which a mother brought an offering to the priest.
          </p>
        </div>
        <VerseQuote
          text="And she shall then continue in the blood of her purifying three and thirty days; she shall touch no hallowed thing, nor come into the sanctuary, until the days of her purifying be fulfilled."
          reference="Leviticus 12:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The second law is older and about the child, not the mother. From the exodus onward, God
            claimed every firstborn son as belonging to Him.
          </p>
        </div>
        <VerseQuote
          text="Sanctify unto me all the firstborn, whatsoever openeth the womb among the children of Israel, both of man and of beast: it is mine."
          reference="Exodus 13:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            By the time of Numbers, that claim had a set price attached, paid to a priest to redeem
            the child back from sanctuary service: five shekels of silver, about one hundred grams
            weight, according to Chabad.org&apos;s own explanation of the law and its value today.
          </p>
          <p>
            📌 <strong>Luke blends both laws into one sentence, and it is worth reading slowly.</strong>
          </p>
        </div>
        <VerseQuote
          text="And when the days of her purification according to the law of Moses were accomplished, they brought him to Jerusalem, to present him to the Lord; (As it is written in the law of the LORD, Every male that openeth the womb shall be called holy to the Lord;) And to offer a sacrifice according to that which is said in the law of the Lord, A pair of turtledoves, or two young pigeons."
          reference="Luke 2:22 to 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke names Mary&apos;s purification offering plainly, the two turtledoves, the provision
            Leviticus made for a family too poor for a lamb.{" "}
            <ArticleLink href="/blog/was-jesus-born-in-a-stable">
              The same quiet poverty runs through this whole family&apos;s story
            </ArticleLink>
            , not only the manger.
          </p>
          <p>
            ⚠️ <strong>What Luke never says is whether the five shekel redemption was actually
            paid.</strong> The St. Paul Center, a Catholic biblical research group, notes plainly that
            Luke &quot;never takes the time to mention the paying of the five shekels to redeem baby
            Jesus,&quot; even while naming the turtledoves offering right next to it. The same source
            cites Pope Benedict XVI reading that silence as deliberate: the child is &quot;handed over
            to God, and from now on belongs to him completely,&quot; the opposite of a redemption that
            buys a son back out of God&apos;s service.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Why Mary Kept a Law She Arguably Did Not Need
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is a question that has sat inside this passage for centuries, and it is worth
            stating plainly rather than skipping past. Catholic teaching holds Mary was preserved
            from sin from her own conception. If that is true, why would she need a purification
            rite built for a mother&apos;s ordinary ceremonial uncleanness?
          </p>
          <p>
            Catholic Answers takes this question directly, and its answer does not claim Mary was
            cleansed from sin by the ritual. It argues she submitted to the Law out of obedience, the
            same reason Jesus Himself would later be baptized by John despite having no sin to repent
            of. The ritual was prescribed by Mosaic law for every mother regardless of her personal
            situation, not a response to a specific fault.
          </p>
          <p>
            📌 <strong>The source goes further, citing Thomas Aquinas on why Mary would choose this
            path even if she were not strictly required to.</strong> Aquinas argued it was fitting for
            the mother to match her Son&apos;s humility, since Jesus Himself, &quot;intrinsically and
            infinitely holy,&quot; submitted to rites He did not need either.
          </p>
          <p>
            💡 <strong>A simpler reading sits alongside that one, common in Protestant commentary.</strong>{" "}
            The scene shows a family keeping the Law in full, ordinary obedience, without needing a
            separate theory about Mary&apos;s own nature to explain it. What both readings agree on is
            the obedience itself. Neither reads this as Mary confessing personal sin.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Simeon&apos;s Words Reach Far Past a Blessing
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke introduces Simeon carefully. Just, devout, carrying a personal promise from the Holy
            Ghost that he would not die before he saw the Lord&apos;s Christ.
          </p>
        </div>
        <VerseQuote
          text="Then took he him up in his arms, and blessed God, and said, Lord, now lettest thou thy servant depart in peace, according to thy word: For mine eyes have seen thy salvation, Which thou hast prepared before the face of all people; A light to lighten the Gentiles, and the glory of thy people Israel."
          reference="Luke 2:28 to 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Catechism of the Catholic Church reads this moment as the whole nation&apos;s posture
            in miniature, stating plainly that &quot;with Simeon and Anna, all Israel awaits its
            encounter with the Saviour.&quot; An old man and an old widow stand in for centuries of
            waiting, finished in one afternoon neither of them had any reason to expect would be the
            day.
          </p>
          <p>
            📌 <strong>Notice who Simeon says this light is for.</strong> Not Israel alone. A light to
            lighten the Gentiles, named first, before he even gets to Israel&apos;s own glory. The
            same theme opens the season this feast sits inside, the one{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              Epiphany is built entirely around
            </ArticleLink>
            , forty days earlier on the calendar.
          </p>
          <p>Simeon was not finished. He turned to Mary with a far harder word.</p>
        </div>
        <VerseQuote
          text="And Simeon blessed them, and said unto Mary his mother, Behold, this child is set for the fall and rising again of many in Israel; and for a sign which shall be spoken against; (Yea, a sword shall pierce through thy own soul also,) that the thoughts of many hearts may be revealed."
          reference="Luke 2:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The Catechism reads that sword as a straight line forward to Calvary.</strong>{" "}
            Its own language is direct: &quot;the sword of sorrow predicted for Mary announces
            Christ&apos;s perfect and unique oblation on the cross.&quot; An infant still in his
            mother&apos;s arms, and already the cross is named, decades before it happens.
          </p>
          <p>
            That is the whole shape of this scene held together. Joy and warning, in the same
            sentence, over the same child.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Anna Was Not a Footnote to Simeon&apos;s Story
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke could have ended the scene with Simeon. He adds a second witness instead, and spends
            real space introducing her.
          </p>
        </div>
        <VerseQuote
          text="And there was one Anna, a prophetess, the daughter of Phanuel, of the tribe of Aser; she was of a great age, and had lived with an husband seven years from her virginity; And she was a widow of about fourscore and four years, which departed not from the temple, but served God with fastings and prayers night and day."
          reference="Luke 2:36 and 37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eighty four years old. Widowed for most of her adult life. Still at the temple, every
            single day, when the moment finally arrived.
          </p>
        </div>
        <VerseQuote
          text="And she coming in that instant gave thanks likewise unto the Lord, and spake of him to all them that looked for redemption in Jerusalem."
          reference="Luke 2:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Anna does not just recognize the child. She immediately starts telling other
            people about him.</strong> Scripture&apos;s first recorded public testimony about the
            identity of Jesus comes from an elderly widow speaking to whoever in Jerusalem would
            listen, not from a religious official with a title.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Jesus Was Already Doing What Paul Later Explained
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years later, writing to a church he never watched grow up, Paul reached back to describe
            exactly what this scene was doing theologically, even though he never mentions the temple
            visit by name.
          </p>
        </div>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Made under the law.</strong> Not exempt from it, and not merely teaching about
            it from a safe distance. A forty day old infant, already being carried through the exact
            legal requirements every other Israelite family faced.
          </p>
          <p>
            The Vatican&apos;s own guide to the Rosary&apos;s mysteries draws the same line, linking
            this scene back to Jesus&apos; circumcision eight days earlier as part of the same larger
            act, his &quot;submission to the Law.&quot; This feast is the fourth of the five Joyful
            Mysteries for exactly that reason, placed deliberately alongside the Annunciation and the
            Nativity rather than treated as a minor detail after them. You can read more about{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-the-annunciation">
              the first of those mysteries, the Annunciation
            </ArticleLink>
            , in its own guide.
          </p>
          <p>
            📌 <strong>Keeping the Law was never the point for its own sake.</strong> Redeeming people
            who could never keep it themselves was. That is the same reason{" "}
            <ArticleLink href="/blog/who-were-the-wise-men">
              foreign strangers were already showing up to worship this child
            </ArticleLink>{" "}
            weeks before this temple visit. The redemption Simeon and Anna were watching for was
            never going to stay inside one nation&apos;s law alone.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ What This Means for You, Practically
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a temple or a first century law code to take something real from this scene.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Luke 2:22 to 38 slowly, out loud.</strong> It is short enough for one sitting
            and dense enough to reward a second reading the same week.
          </li>
          <li>
            <strong>Let the obedience comfort you, not pressure you.</strong> Jesus kept the Law
            perfectly so your own imperfect record would not be the thing standing between you and
            God.
          </li>
          <li>
            <strong>Notice who God used.</strong> Two elderly, unremarkable believers, not the
            religious establishment on duty that day. Faithfulness that nobody is watching is still
            being watched.
          </li>
          <li>
            <strong>Hold the joy and the warning together.</strong> Simeon&apos;s blessing and his
            sword prophecy came in the same breath. Your own hardest seasons and your clearest
            evidence of God&apos;s presence are often closer together than they feel.
          </li>
          <li>
            <strong>Name what you are still watching for.</strong> Simeon and Anna had both waited for
            years. Be honest about what you are still waiting on God to do.
          </li>
          <li>
            <strong>Follow Anna&apos;s instinct.</strong> The moment she recognized Christ, she told
            someone. You do not need a title or a platform to do the same with whatever God has shown
            you.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses Behind the Presentation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 2:22 to 24</h3>
        <VerseQuote
          text="And when the days of her purification according to the law of Moses were accomplished, they brought him to Jerusalem, to present him to the Lord; (As it is written in the law of the LORD, Every male that openeth the womb shall be called holy to the Lord;) And to offer a sacrifice according to that which is said in the law of the Lord, A pair of turtledoves, or two young pigeons."
          reference="Luke 2:22 to 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The whole event compressed into three verses. A purification law kept, a consecration law
            named, and an offering that quietly identifies this as a poor family long before anyone
            calls them that outright.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 2:29 to 32</h3>
        <VerseQuote
          text="Lord, now lettest thou thy servant depart in peace, according to thy word: For mine eyes have seen thy salvation, Which thou hast prepared before the face of all people; A light to lighten the Gentiles, and the glory of thy people Israel."
          reference="Luke 2:29 to 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Simeon&apos;s prayer, later named the Nunc Dimittis. A man who had waited his whole life
            finally allowed to stop waiting, over a child six weeks old.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 2:34 and 35</h3>
        <VerseQuote
          text="Behold, this child is set for the fall and rising again of many in Israel; and for a sign which shall be spoken against; (Yea, a sword shall pierce through thy own soul also,) that the thoughts of many hearts may be revealed."
          reference="Luke 2:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The hardest verse in the scene, and the one that keeps this story from turning into a
            simple feel good moment. Mary leaves the temple carrying both a blessing and a warning.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul never visited this temple scene directly in his letters, but this is the verse
            theologians reach for to explain what it meant. A Son sent under the exact law He came to
            redeem people from.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 18:15 and 16</h3>
        <VerseQuote
          text="Every thing that openeth the matrix in all flesh, which they bring unto the LORD, whether it be of men or beasts, shall be thine: nevertheless the firstborn of man shalt thou surely redeem, and the firstling of unclean beasts shalt thou redeem. And those that are to be redeemed from a month old shalt thou redeem, according to thine estimation, for the money of five shekels, after the shekel of the sanctuary, which is twenty gerahs."
          reference="Numbers 18:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The specific law behind the consecration Luke 2:23 references. Every firstborn son in
            Israel belonged to God first, before he ever belonged to his own family.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Presentation of Jesus
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Presentation of Jesus in the temple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the event in Luke 2:22 to 40 where Mary and Joseph brought the infant Jesus, forty
          days after His birth, to the Jerusalem temple to fulfill the Law of Moses: Mary&apos;s
          purification offering and the consecration owed for a firstborn son. There, the elderly
          Simeon and the prophetess Anna both recognized the child as the promised Messiah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Jesus need to be presented in the temple if He was God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He did not need it for His own sake. Scripture and later Christian teaching read this as
          Jesus fully submitting to the Law His people lived under, not as a requirement His own
          holiness demanded. Paul describes this directly, saying God&apos;s Son was &quot;made under
          the law, to redeem them that were under the law.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Mary undergo purification if Catholics believe she was sinless?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic teaching does not read the rite as cleansing Mary from personal sin. Catholic
          Answers explains it as an act of obedience to a law that applied to every Israelite mother
          regardless of her own situation, the same reasoning behind Jesus later submitting to a
          baptism He did not personally need.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Simeon and Anna?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Simeon was a just and devout man in Jerusalem who had been promised by the Holy Ghost that
          he would see the Lord&apos;s Christ before he died. Anna was an eighty four year old
          widowed prophetess who never left the temple, serving God there with fasting and prayer.
          Both recognized the infant Jesus and spoke about Him that same day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What did Simeon mean about a sword piercing Mary&apos;s soul?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Catechism of the Catholic Church reads that line as a direct foreshadowing of the cross,
          stating that the sword predicted for Mary &quot;announces Christ&apos;s perfect and unique
          oblation on the cross.&quot; It was the first warning Mary received that her son&apos;s
          mission would include deep personal grief for her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was the five shekel redemption for Jesus actually paid?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke does not say either way. He names Mary&apos;s purification offering, the two
          turtledoves, but is silent on the firstborn redemption payment required under Numbers 18.
          Interpreters disagree on whether that silence is simply an unrecorded detail or a deliberate
          choice to present Jesus as consecrated rather than redeemed back from God&apos;s service.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Presentation the same thing as Candlemas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They describe the same Gospel event, but one is the event and the other is the feast built
          on it. The Presentation is what happened in Luke 2. Candlemas is the later Christian feast,
          kept every February 2, that commemorates it, with its own separate history of candles and
          customs.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the Catholic Church call this a Joyful Mystery of the Rosary?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Vatican&apos;s own guide to the Rosary lists the Presentation as the fourth Joyful
          Mystery, grouped with the Annunciation, the Visitation, and the Nativity as events from
          Christ&apos;s early life meant for prayerful meditation, each paired with one Our Father and
          ten Hail Marys.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants read this passage differently than Catholics?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The core events are read the same way across traditions. The difference shows up mainly
          around Mary&apos;s purification specifically. Catholic sources explain her participation
          through her own humility and example, while most Protestant commentary focuses on the
          passage as straightforward evidence of a family keeping the Law, without building a
          separate doctrinal explanation around Mary&apos;s own nature.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Where in the Bible is the Presentation of Jesus found?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 2:22 to 40 is the only Gospel account of this event. Matthew, Mark, and John do not
          record it. The chapter is also the source for the Mosaic laws it fulfills, which themselves
          go back to Leviticus 12, Exodus 13, and Numbers 18.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the legal detail, and three things are left standing from this one afternoon.</p>
          <p>
            📌 <strong>Jesus kept the Law before He could even speak.</strong> Not as a formality, but
            as the first visible piece of a lifetime spent fulfilling what no one else could.
          </p>
          <p>
            📌 <strong>God let two overlooked, elderly believers be the ones who recognized Him.</strong>{" "}
            Simeon and Anna had nothing but years of faithful, quiet waiting to show for themselves,
            and that was enough.
          </p>
          <p>
            📌 <strong>Joy and grief arrived in the same sentence, over the same child.</strong>{" "}
            Simeon blessed God and warned Mary in the same breath, and the gospel has carried both
            halves of that truth ever since.
          </p>
          <p>
            Whatever law you feel like you keep failing to keep,{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              this scene sits inside a much larger story
            </ArticleLink>{" "}
            of a God who sent His own Son to keep it for you.
          </p>
          <p>❓ Who in your own life has been quietly watching and waiting on God the way Simeon and Anna were?</p>
          <p>
            📌 <strong>He has seen thy salvation.</strong> That was true in a temple two thousand
            years ago, and it has not stopped being true since.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="5 November 2026"
        sources={[
          {
            title: "Catechism of the Catholic Church, Paragraphs 522 to 534: The Mysteries of Christ's Infancy and Hidden Life",
            publisher: "The Holy See (vatican.va)",
            url: "https://www.vatican.va/archive/ENG0015/__P1L.HTM",
            note: "The source for paragraph 529's teaching that the Presentation shows Jesus as the firstborn Son belonging to the Lord, that Simeon and Anna represent all Israel awaiting the Saviour, and that the sword predicted for Mary announces Christ's oblation on the cross.",
          },
          {
            title: "The Mysteries of the Rosary: The Joyful Mysteries",
            publisher: "The Holy See (vatican.va)",
            url: "https://www.vatican.va/special/rosary/documents/popup/popup04_gau_en.html",
            note: "The source for the Presentation's place as the fourth Joyful Mystery and its link to Jesus' circumcision and submission to the Law under Catechism paragraph 527.",
          },
          {
            title: "If Mary was free of sin, why did she go through the purification ceremony?",
            publisher: "Catholic Answers",
            url: "https://www.catholic.com/qa/if-mary-was-free-of-sin-why-did-she-go-through-the-purification-ceremony",
            note: "The source for the Catholic explanation of Mary's purification as obedience rather than personal cleansing, including the comparison to Jesus' baptism and the citation of Thomas Aquinas on Mary's humility.",
          },
          {
            title: "All About the Five Shekels",
            publisher: "Chabad.org",
            url: "https://www.chabad.org/library/article_cdo/aid/586454/jewish/All-About-the-Five-Shekels.htm",
            note: "The source for the value and biblical basis, Numbers 18:15 and 16, of the redemption price owed for a firstborn son under Jewish law.",
          },
          {
            title: "The Deeper Meaning of the Presentation in the Temple",
            publisher: "St. Paul Center for Biblical Theology",
            url: "https://stpaulcenter.com/posts/the-deeper-meaning-of-the-presentation-in-the-temple",
            note: "The source for Luke's silence on the five shekel redemption payment, and for Pope Benedict XVI's reading of that silence as Jesus being handed over to God rather than redeemed back from Him.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
