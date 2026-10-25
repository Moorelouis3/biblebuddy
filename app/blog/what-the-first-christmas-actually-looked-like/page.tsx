import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-the-first-christmas-actually-looked-like");

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

export default function WhatTheFirstChristmasActuallyLookedLikePage() {
  return (
    <BlogPostShell
      slug="what-the-first-christmas-actually-looked-like"
      title={<>📖 What the First Christmas Actually Looked Like</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The card on your shelf is lying to you.</p>
            <p>Not on purpose. But it is.</p>
            <p>
              Soft light. Clean straw. A calm mother in blue. Everybody arranged in a tidy
              semicircle, everybody at peace, nobody sweating.
            </p>
            <p>
              Then there is your December. The money is short. The calendar is full of things you
              did not choose. There is a person coming to dinner you have not forgiven, or a chair
              at the table that is going to be empty this year.
            </p>
            <p>
              📌 <strong>So you look at the card, and you look at your life, and you assume the
              distance between them is your fault.</strong>
            </p>
            <p>
              Here is the thing. If you go back and read what the first Christmas was really like,
              in the actual text, the card is the thing that is out of place. Not you.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 An unmarried girl with a pregnancy nobody would believe.</li>
            <li>🔲 A man quietly planning how to end the engagement.</li>
            <li>🔲 A government order that moved them across the country at the worst possible time.</li>
            <li>🔲 No room anywhere, and a feeding trough instead of a bed.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              That is the real scene. Not an inconvenience inside an otherwise lovely story. The
              mess <strong>is</strong> the story.
            </p>
            <p>
              <strong>God did not wait for the room to be ready.</strong> He arrived while it was
              still a mess, and that is the only reason the night means anything to anyone having a
              hard December.
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
          <p>A sanitised Christmas does real damage, and it does it quietly.</p>
          <p>
            If the first Christmas was serene, then serenity is the condition God shows up in. And
            if your life is not serene, you are outside the story looking in. That is the logic most
            people never say out loud, and it is why December is one of the loneliest months in the
            church.
          </p>
          <p>
            ⚠️ <strong>The world fixes this by making the season about feeling.</strong> Get the
            lights right. Get the food right. Get everybody in a good mood for one evening. It works
            for about four hours and then the house is quiet again.
          </p>
          <p>
            The text does something better. It refuses to clean up the circumstances at all. It
            leaves the scandal in, the poverty in, the political order in, the homelessness in. And
            into that, it puts God.
          </p>
          <p>
            That is a promise you can actually use. It means the condition for God coming near is
            not that you have sorted your life out by the twenty fifth. There is no record of Him
            ever requiring that, and the one night the whole faith is built on is the proof.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Bible Actually Says About the First Christmas
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Six parts of the story, in order, from the text rather than the card.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. It began with a girl who had everything to lose</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke tells you where she lived before he tells you anything else, and the location is
            part of the point. Nazareth was a small place in the north, far from the temple and far
            from power.
          </p>
        </div>
        <VerseQuote
          text="And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth, To a virgin espoused to a man whose name was Joseph, of the house of David; and the virgin&apos;s name was Mary."
          reference="Luke 1:26 and 27"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Espoused&quot; is not the same as engaged in the modern sense. A betrothal in that
            culture was legally binding and ending it took a formal act. So an unexplained pregnancy
            was not an awkward conversation. It was a public accusation waiting to happen.
          </p>
          <p>
            The Bible never tells you how old Mary was. Tradition has guessed young, and the
            betrothal customs of the time make that likely, but the text is silent and honest
            teaching should be too. What the text does tell you is her answer.
          </p>
        </div>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read the last six words again. The angel left. The glory ended and the ordinary problem
            began, and she had to go and explain this to her family and her fiancé by herself. We
            walk through her whole life in{" "}
            <ArticleLink href="/blog/who-was-mary-mother-of-jesus">
              who Mary, the mother of Jesus, really was
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joseph had already decided to walk away</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Matthew gives you the part Luke leaves out, and it is uncomfortable. Joseph did not
            believe her. He made a plan.
          </p>
        </div>
        <VerseQuote
          text="Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily."
          reference="Matthew 1:19"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Put her away privily&quot; means end it quietly. Matthew calls him a just man in
            the same sentence, which tells you he was choosing the kindest version of a decision he
            had already made.
          </p>
          <p>
            It took an angel in a dream to change his mind. And the name the angel gives the child
            carries the whole reason for the night.
          </p>
        </div>
        <VerseQuote
          text="And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins."
          reference="Matthew 1:21"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Notice what He came to save them from.</strong> Not from Rome. Not from
            poverty. From their sins. That is the one problem nobody at the table on the twenty
            fifth can fix for themselves, and it is the one He came for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. A census nobody asked for moved them at the worst time</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke dates the birth by a government order, which is a strange way to begin a story
            about God.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass in those days, that there went out a decree from Caesar Augustus, that all the world should be taxed."
          reference="Luke 2:1"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A heavily pregnant woman and a working man had to leave home and travel south to
            Bethlehem because of paperwork in a city they would never see. Nobody consulted them.
            Nobody cared about the timing.
          </p>
          <p>
            And yet. Centuries earlier the prophet Micah had named the town the ruler would come
            from.
          </p>
        </div>
        <VerseQuote
          text="But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting."
          reference="Micah 5:2"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>An emperor who had never heard of Micah moved two poor people exactly where
            the prophecy said they needed to be.</strong>
          </p>
          <p>
            That is worth sitting with if your own December is being shaped by a decision somebody
            else made. The census was not an obstacle God worked around. It was the transport.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. There was no room, and the text never says stable</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the whole birth, in one verse. Count how much detail you do not get.</p>
        </div>
        <VerseQuote
          text="And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
          reference="Luke 2:7"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            No stable. No animals. No innkeeper. No weather. Those come from later tradition and
            from carols, not from Luke, and saying so plainly takes nothing away from the night.
          </p>
          <p>
            What you do get is a manger. A manger is a feeding trough for livestock. Whatever
            building it stood in, the first bed of the Son of God was something animals ate out of.
          </p>
          <p>
            And the reason given is almost offhand. There was no room. Not no money, not no
            kindness. No room. The town was full because of the census, and the arrangement nobody
            planned became the only one available.
          </p>
          <p>
            If you have ever felt like the overlooked option, read that verse again slowly. God
            chose the overlooked option on purpose, and He has never explained it away since.
          </p>
          <p>
            The other detail in that verse is the swaddling clothes. Wrapping a newborn in strips of
            cloth was the ordinary thing every mother in that world did. It is not a holy garment
            and it carries no symbolism in the text. It is simply what a baby looked like.
          </p>
          <p>
            Which makes the sign the angel gave the shepherds strange when you read it carefully.
          </p>
        </div>
        <VerseQuote
          text="And this shall be a sign unto you; Ye shall find the babe wrapped in swaddling clothes, lying in a manger."
          reference="Luke 2:12"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A sign is normally something extraordinary. This one is a normally dressed baby in an
            abnormal bed. There is no light around Him in the text, no halo, nothing to mark Him
            out. The shepherds were told to look for something that would be easy to walk past.
          </p>
          <p>
            📌 <strong>That is the pattern of the whole night.</strong> The glory was in the sky
            over the field. In the room there was a tired couple and a baby in a trough, and the
            shepherds had to take the angel&apos;s word for what they were looking at.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The announcement went to the night shift</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Think about who God could have told. Priests in the temple. The king in his palace. The
            scholars who knew Micah by heart.
          </p>
          <p>He told men who were outside, at work, in the dark.</p>
        </div>
        <VerseQuote
          text="And there were in the same country shepherds abiding in the field, keeping watch over their flock by night."
          reference="Luke 2:8"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Shepherding was low status work. It was dirty, it ran through the night, and it kept you
            away from religious life. These were not the people anyone would have picked as the
            first congregation.
          </p>
        </div>
        <VerseQuote
          text="And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord."
          reference="Luke 2:10 and 11"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>&quot;Unto you.&quot;</strong> Not about you. Not near you. To you. The working
            men in the field were told the child was theirs before anyone in a position of power
            knew He existed.
          </p>
          <p>
            If fear is what you carry into most rooms, the first word of the first Christmas sermon
            was aimed at you. There is more on that in{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The glory ended and everyone went back to work</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the part the card never shows, and it may be the most useful part for the
            twenty sixth of December.
          </p>
        </div>
        <VerseQuote
          text="And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them."
          reference="Luke 2:20"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            They <strong>returned</strong>. To the field. To the sheep. To the same cold job they
            had left a few hours earlier. Nothing about their employment changed. Nothing about
            their status changed.
          </p>
          <p>
            What changed is that they went back praising. The circumstances were identical and the
            men were not.
          </p>
          <p>
            Mary did something different and just as ordinary. Luke says she kept all these things
            and pondered them in her heart. She did not understand it either. She stored it and
            thought about it for years. If holding on through a long unclear stretch is where you
            are, we wrote about that in{" "}
            <ArticleLink href="/blog/thanksgiving-when-the-year-has-been-hard">
              gratitude when the year has been hard
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Two gospels, two halves of one night</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            People sometimes notice that Matthew and Luke do not tell the same story and assume one
            of them must be wrong. Read them side by side and something simpler is going on.
          </p>
          <p>
            <strong>Matthew follows Joseph.</strong> You get his dilemma, his dream, his decision,
            his later dreams about Herod and about Egypt. Mary barely speaks in Matthew. The angel
            talks to Joseph every time.
          </p>
          <p>
            <strong>Luke follows Mary.</strong> You get Gabriel in her house, her questions, her
            cousin Elisabeth, her song, and at the end the detail that she kept these things and
            pondered them. Joseph is present and almost silent.
          </p>
          <p>
            Two men wrote down the parts they could get. Luke says at the start of his gospel that
            he had looked into everything from the beginning, and the material only Mary could have
            known reads exactly like someone was eventually asked. Elisabeth&apos;s part of the
            story is told in{" "}
            <ArticleLink href="/blog/who-was-elizabeth">who Elisabeth was in the Bible</ArticleLink>.
          </p>
          <p>
            ⚠️ <strong>The practical point is about how you read.</strong> If you only ever read
            Luke, Christmas is a mother&apos;s story about being overwhelmed and saying yes. If you
            only ever read Matthew, it is a father&apos;s story about doing the right thing when
            nothing makes sense. Most people in a hard December need the second one and have only
            ever been given the first.
          </p>
          <p>
            Read both this year. They take about ten minutes together and they are not the same
            night in the same key.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ What to Do With This When Christmas Is Hard
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Seven things that are actually available to you this month.</p>
        </div>
        <ol className="mt-6 space-y-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>1. Read Luke 2 before you read anything else on the day.</strong> Twenty verses.
            Four minutes. Do it before the phone, before the kitchen, before the first guest. It
            resets what the day is about faster than any amount of effort later.
          </li>
          <li>
            <strong>2. Stop apologising for a small Christmas.</strong> The first one had no budget
            at all. A quiet, cheap, thin Christmas is closer to the original than an expensive one,
            and you can say that to yourself without bitterness.
          </li>
          <li>
            <strong>3. Name the empty chair out loud.</strong> If somebody is missing, say their
            name at the table rather than steering around it all day. Pretending costs more energy
            than grieving does.
          </li>
          <li>
            <strong>4. Expect the mess and plan one exit.</strong> Know in advance where you will go
            for ten minutes when the room gets heavy. A walk, a kitchen, a car. Decide now, not at
            the moment you need it.
          </li>
          <li>
            <strong>5. Give something small to one person outside your family.</strong> The
            announcement went to outsiders first. A text, a meal, a knock on a door. It will do more
            for your December than another purchase will.
          </li>
          <li>
            <strong>6. Let the day be ordinary afterwards.</strong> The shepherds went back to the
            sheep. You will go back to work and to the same problems, and that is not a failure of
            the day. It is what the first one did too.
          </li>
          <li>
            <strong>7. Keep one thing and think about it.</strong> Mary pondered. Pick one line from
            Luke 2 and carry it through the week instead of trying to feel everything at once.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📌 Top Bible Verses About the Birth of Jesus
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Luke 2:7</h3>
        <VerseQuote
          text="And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
          reference="Luke 2:7"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The most important birth in history gets one sentence and no adjectives. Luke writes it
            like a line in a record book.
          </p>
          <p>
            That restraint is deliberate. The weight of the verse is not in how it is described. It
            is in the gap between who the child is and where they had to put Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Matthew 1:23</h3>
        <VerseQuote
          text="Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us."
          reference="Matthew 1:23"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Matthew stops and translates the name for you, which he rarely does. He wants there to
            be no chance you miss it.
          </p>
          <p>
            <strong>God with us.</strong> Not God watching us, and not God waiting for us. With. In
            the room, in the trouble, in the December you are actually having.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">John 1:14</h3>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            John gives you no manger and no shepherds. He gives you the same event from above, in
            one line.
          </p>
          <p>
            Made flesh. Real body, real hunger, real cold. Christianity does not teach a God who
            visited in disguise. It teaches a God who took a body and kept it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Isaiah 9:6</h3>
        <VerseQuote
          text="For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace."
          reference="Isaiah 9:6"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Written centuries before the night, and the tense is what catches you. Is born. Is
            given. Isaiah speaks about it as though it has already happened.
          </p>
          <p>
            Four titles follow, and they are not sentimental. The government on His shoulder is a
            claim about who is actually running things, which is exactly the claim the census in
            Luke 2 appears to contradict and does not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Luke 2:10</h3>
        <VerseQuote
          text="And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people."
          reference="Luke 2:10"
        />
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The first two words of the first Christmas announcement are an instruction about fear,
            given to men who were terrified.
          </p>
          <p>
            And the reach of it is &quot;all people.&quot; Not the religious, not the qualified, not
            the people having a good year. All.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the First Christmas
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Jesus really born in a stable?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible never uses the word. Luke says He was laid in a manger because there was no room
          in the inn, and a manger is a feeding trough. Christians have pictured a stable, a cave,
          and the lower room of a house, and the text does not settle it. What it does settle is
          that the place was not prepared for a baby.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were there animals at the birth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          None are mentioned. The presence of a manger suggests animals were kept nearby, which is a
          reasonable inference, but the ox and the donkey of the nativity scene come from later
          Christian art and tradition rather than from Matthew or Luke.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Mary when she had Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not say. The customs around betrothal in that period make a young age
          likely, and that is the common assumption, but it is an inference from culture rather than
          a statement in the text. Anyone who gives you a confident number is going beyond the Bible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the wise men visit the manger?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew says they came into a house and saw the young child, which is a different setting
          from Luke&apos;s manger and may be a good deal later. The shepherds and the wise men sit
          together on every nativity set, and in the text they are two separate visits.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many wise men were there?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not give a number. Three gifts are listed, gold, frankincense and myrrh,
          and the number three attached itself to the men because of the gifts. Matthew only says
          wise men came from the east.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Mary and Joseph go to Bethlehem?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because of a Roman census that required people to register in their own city, and Joseph
          was of the house and lineage of David. Luke names Caesar Augustus and the governor
          Cyrenius, which is his way of saying this happened in real time, under real administration.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were shepherds told first?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain it, but the pattern runs through the whole Bible. God repeatedly
          starts at the bottom of the social order. Shepherds were low status and ceremonially
          inconvenient, and they were the first people on earth to hear.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Christmas story historically reliable?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke anchors it to named rulers and a public administrative event, which is how an ancient
          writer signals he is reporting rather than inventing. Scholars argue about the details of
          the census and the dating. We look at the wider question of the historical Jesus in{" "}
          <ArticleLink href="/blog/did-jesus-really-exist">did Jesus really exist</ArticleLink>.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do Matthew and Luke tell the story differently?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because they follow different people. Matthew stays with Joseph and reports the dreams and
          the decisions he had to make. Luke stays with Mary and reports Gabriel, the visit to
          Elisabeth, and the things she kept in her heart. They are not competing versions of one
          scene. They are two witnesses standing in different places on the same night, and reading
          both gives you a fuller account than either one alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Emmanuel mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew translates it for you in the same verse. It means God with us. It is a title
          describing what the birth accomplished rather than a name anyone called Him in daily life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What should I actually do on Christmas Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Read Luke 2 early, keep one line from it, and let the rest of the day be whatever it is.
          The first Christmas was not a feeling that had to be achieved. It was an event that
          happened whether or not the people in it were ready.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things to take out of the real story.</p>
          <p>
            📌 <strong>God arrived before the room was ready.</strong> No space, no plan, no
            dignity, no status. If He had waited for conditions to improve, there would be no
            Christmas at all.
          </p>
          <p>
            📌 <strong>The people in the story did not feel chosen.</strong> Mary had a reputation
            to lose, Joseph had already drafted his exit, and the shepherds were at work in the
            dark. Feeling unqualified is not evidence that you are outside this.
          </p>
          <p>
            📌 <strong>Afterwards, everyone went back to ordinary life.</strong> The field, the
            sheep, the long unclear years of raising Him. Nothing in your situation has to change
            for the night to be true.
          </p>
          <p>
            <strong>One thing to do today.</strong> Open Luke 2 and read verses 1 to 20 straight
            through, slowly, without a commentary and without a devotional. Let the plainness of it
            do the work.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
