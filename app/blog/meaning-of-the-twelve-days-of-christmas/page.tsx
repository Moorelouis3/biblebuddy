import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import ClaimStatus from "@/components/blog/ClaimStatus";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("meaning-of-the-twelve-days-of-christmas", {
  title: "What Is the Meaning of the Twelve Days of Christmas?",
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

export default function MeaningOfTheTwelveDaysOfChristmasPage() {
  return (
    <BlogPostShell
      slug="meaning-of-the-twelve-days-of-christmas"
      title={<>📖 What Is the Meaning of the Twelve Days of Christmas?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              You have sung the song every December since you were a kid. A partridge in a pear
              tree. Five gold rings. Eight maids milking something.
            </p>
            <p>Nobody ever tells you what it actually means. The gifts just get stranger every verse.</p>
            <p>
              Maybe you have also seen the other version of this conversation, the one that shows
              up every Christmas in a church bulletin or a forwarded email. It says the whole song
              is secretly a catechism. A code English Catholics supposedly used to teach their
              children the faith while the religion itself was outlawed.
            </p>
            <p>
              📌 <strong>Here is the plain answer. The real history of this carol has nothing to
              do with a secret code. It was first printed in 1780 as a party game for Twelfth
              Night, and nobody can even prove it is English rather than French. The catechism
              story is a much newer invention, built on claims nobody can actually source, and
              both Catholic scholars and independent fact checkers have taken it apart in detail.</strong>
            </p>
            <p>
              This guide walks through where the song actually came from, exactly what the
              catechism legend claims, why it does not hold up, and what the real twelve days of
              Christmas are actually for, no code required.
            </p>
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
          <p>It is tempting to wave this off as harmless trivia. A fun story for the car ride home from church.</p>
          <p>
            ⚠️ <strong>But a faith that needs an invented history to feel meaningful is telling you
            something true is already strong enough without it.</strong> The real story behind
            this season does not need decoration. It needs to be told accurately.
          </p>
          <p>
            Christians are called to speak the truth, especially about their own history. Dressing
            up a children&apos;s party game as secret persecution literature does not make the
            gospel more impressive. It makes Christians look careless with facts the next time a
            skeptic checks one.
          </p>
          <p>
            💡 The twelve days between Christmas and Epiphany mark something genuinely large: God
            entering the world as a baby, named by an angel, worshipped by shepherds, revealed to
            strangers from the east. That story has carried the weight of two thousand years of
            faith on its own. It was never the one that needed help from a song about birds.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Real Story Behind the Twelve Days of Christmas
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Where the Carol Actually Comes From
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Start with what can actually be documented, because almost nobody who repeats the
            catechism story bothers to check this part first.
          </p>
          <p>
            The earliest known printed version of the song appears in 1780, in a London children&apos;s
            book called <em>Mirth Without Mischief</em>. Smithsonian magazine, reporting on the
            carol&apos;s history, describes it there as a chant, printed with no music at all.
          </p>
          <p>
            📌 <strong>It almost certainly started as a game, not a hymn.</strong> Multiple
            historians Smithsonian cites describe the song as a memory and forfeit game played on
            Twelfth Night, the kind of party where a leader recited a growing list of gifts, each
            guest repeated it back, and whoever stumbled owed a kiss or a small treat to the
            group.
          </p>
          <p>
            Nobody agrees on where it came from before that. Some historians who studied the
            Newcastle broadsheets that printed it for roughly a century and a half argue for an
            English origin. Others point to the red legged partridge in the first verse, a bird
            not actually introduced into England until around 1770, and argue the whole song
            points toward France instead. Both theories come from real researchers. Neither one
            has won.
          </p>
          <p>
            Even the tune most people sing is not as old as the words. The version almost
            everyone knows today was arranged by the English singer Frederic Austin, who
            performed it in concerts starting in 1905 and published his arrangement with the
            music firm Novello in 1909, more than a century after the lyrics first appeared in
            print.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Legend That Took Over the Internet in the 1990s
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Now for the version you have probably actually heard, because it travels much faster
            than the real history does.
          </p>
          <p>
            The claim says that after England outlawed Catholic worship, Catholic parents taught
            their children the faith through this song, disguising each doctrine as a gift so a
            child caught singing it would not be turning in their own family.
          </p>
          <p>
            📌 <strong>The theory is newer than almost anyone telling it realizes.</strong> The
            earliest known version comes from a Canadian hymnologist named Hugh D. McKellar, who
            proposed it in 1979. Wikipedia&apos;s account of the song&apos;s history notes plainly
            that McKellar offered no actual evidence for the claim when he made it.
          </p>
          <p>
            A Catholic priest named Father Hal Stockert gave the story its wider life. He wrote a
            short essay on the idea in 1982 and posted it online in 1995, right as the early
            internet was starting to pass stories like this around faster than anyone could check
            them. By the 1990s the story was everywhere, usually forwarded with no author name
            attached at all.
          </p>
          <p>
            Here is the detail worth sitting with. Stockert&apos;s own supporting evidence was a
            set of old letters he said he once had, which he later said were lost in a flood. He
            eventually admitted, in his own words, that the story might contain &quot;elements of
            legend.&quot; That is the actual foundation under one of the most repeated Christmas
            stories online.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Full List the Legend Actually Claims
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            To be fair to the theory, here is the full list, exactly as a Catholic News Service
            article republished by Our Sunday Visitor lays it out. Read it once, honestly, before
            the next section explains why it does not hold together.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🐦 The partridge is supposed to stand for Jesus Christ</li>
          <li>🕊️ The two turtle doves are the Old and New Testaments</li>
          <li>🐔 The three French hens are faith, hope, and charity</li>
          <li>🎶 The four calling birds are the four Gospels</li>
          <li>💍 The five golden rings are the five books of the Torah</li>
          <li>🪿 The six geese a laying are the six days of creation</li>
          <li>🦢 The seven swans a swimming are the seven gifts of the Holy Spirit</li>
          <li>🥛 The eight maids a milking are the eight Beatitudes</li>
          <li>💃 The nine ladies dancing are the nine fruits of the Holy Spirit</li>
          <li>🤴 The ten lords a leaping are the Ten Commandments</li>
          <li>🎵 The eleven pipers piping are the eleven faithful apostles</li>
          <li>🥁 The twelve drummers drumming are the twelve points of the Apostles&apos; Creed</li>
        </ul>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Why That List Falls Apart Under Its Own Weight
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Snopes.com, the fact checking site, investigated this claim directly. Its central
            objection is simple and hard to argue with: every one of these doctrines, except
            possibly the exact count of sacraments, was shared by Catholics and Anglicans alike.
          </p>
          <p>
            ⚠️ <strong>Nobody needed to hide the Ten Commandments or the four Gospels.</strong>{" "}
            Every church in England already taught both openly. A secret code only makes sense
            for teaching something your captors would actually punish you for knowing, and this
            list is not that.
          </p>
          <p>
            Catholic film critic and writer Steven Greydanus, in the National Catholic Register,
            goes further and checks the symbols themselves against how Christian art actually
            used them. A partridge, he points out, shows up in Scripture as a symbol of deceit, in
            Jeremiah 17:11, not as a picture of Christ. Blackbirds, the bird most older versions
            of the song actually use for the fourth gift before later editions changed the word,
            were a common symbol in Christian art for temptation and the devil, the opposite of four
            Gospels worth memorizing.
          </p>
          <p>
            💡 Greydanus also notes something that quietly ends the theory on its own. The
            &quot;four calling birds&quot; wording only started appearing in print after 1829, the
            year Britain finally lifted the legal restrictions on Catholics. A catechism meant to
            protect persecuted Catholic children cannot be built around a line of the song that
            did not exist until the persecution was already over.
          </p>
          <p>
            Benedictine Father Jerome Kodell, quoted in that same Catholic News Service article,
            does not soften his verdict at all. He calls the whole catechism interpretation
            &quot;preposterous.&quot;
          </p>
          <p>
            📌 <strong>Say the honest version, not the exciting one.</strong> The twelve days of
            Christmas are real. The feast days inside them are real, and well documented. This one
            specific explanation for a specific song is simply not supported by the evidence
            anyone has actually produced.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What the Twelve Days Actually Commemorate Instead
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Strip the legend away and the real twelve days are still worth your attention, just
            for a plainer reason.{" "}
            <ArticleLink href="/blog/what-is-christmastide">
              Christmastide
            </ArticleLink>{" "}
            is the Church&apos;s actual season between Christmas Day and Epiphany, built not
            around a song but around a church council at Tours in the year 567 that marked the
            days between the two feasts as sacred time rather than ordinary days on the calendar.
          </p>
          <p>
            Inside that stretch sit real, individually named days, not coded gifts.{" "}
            <ArticleLink href="/blog/who-was-saint-stephen">
              Saint Stephen&apos;s feast
            </ArticleLink>{" "}
            falls on December 26, remembering the first Christian martyr. The naming of Jesus and
            His{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-the-circumcision">
              circumcision under the law
            </ArticleLink>{" "}
            falls on January 1. The whole season leads toward{" "}
            <ArticleLink href="/blog/what-is-epiphany">Epiphany</ArticleLink>{" "}
            on January 6, when the church remembers Christ being revealed to the nations.
          </p>
          <p>
            That is the actual content behind these twelve days. Not an encoded lesson plan, but a
            sequence of real events the church decided were worth more than a single day each.
          </p>
          <VerseQuote
            text="Fear them not therefore: for there is nothing covered, that shall not be revealed; and hid, that shall not be known. What I tell you in darkness, that speak ye in light: and what ye hear in the ear, that preach ye upon the housetops."
            reference="Matthew 10:26 and 27"
          />
          <p>
            💡 <strong>That is worth sitting with next to this whole legend.</strong> Jesus told
            His own disciples that the truth He gave them was never meant to be whispered in
            code. It was meant to be preached from the rooftops. Whatever real courage it took
            English Catholics to practice their faith under real persecution, the gospel itself
            was never a secret they had to smuggle past anyone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Why a Good Legend Still Spreads
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If the evidence is this thin, why does the story keep coming back every December?
          </p>
          <p>
            Part of it is simple appeal. A secret resistance code is a far better story than a
            party game about forfeits. Part of it is real history being used to borrow weight it
            was never attached to.{" "}
            <ArticleLink href="/blog/what-is-reformation-day">
              English Catholics genuinely were persecuted
            </ArticleLink>{" "}
            after the Reformation split the church, and that real suffering makes the catechism
            story feel like it must be true, even without a single verified document to back it
            up.
          </p>
          <p>
            ⚠️ <strong>Real persecution happened. This particular story about it did not.</strong>{" "}
            Both things can be true at once, and keeping them straight matters more than letting a
            good story do the work facts should be doing.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Established and Unsettled
        </h2>
        <ClaimStatus
          established={[
            "The earliest known printed text of the song appears in 1780, in the London children's book Mirth Without Mischief.",
            "Canadian hymnologist Hugh D. McKellar first proposed the catechism theory in 1979 and offered no documentary evidence for it.",
            "Father Hal Stockert's widely shared 1982 and 1995 account of the theory rests on letters he said were later lost in a flood, and he acknowledged the story may contain elements of legend.",
            "Nearly all of the doctrines the legend claims were encoded, including the Ten Commandments and the four Gospels, were already taught openly by both Catholics and Anglicans in England.",
            "The 'four calling birds' wording the legend relies on only appears in printed versions of the song after 1829, the year Britain lifted its Catholic civil restrictions.",
            "The melody most people sing today was arranged by Frederic Austin and published in 1909, well over a century after the lyrics were first printed.",
          ]}
          uncertain={[
            "Whether the song originated in England or France. Historians who studied the Newcastle broadsheets argue for an English origin, while others point to the French red legged partridge and French cumulative folk songs with a similar structure.",
            "How much older than 1780 the song actually is, since several historians believe the printed version reflects an existing oral tradition rather than a brand new composition.",
            "Whether a real Twelfth Night memory and forfeit game using this exact song predates its first printing, or grew up alongside it.",
          ]}
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Talking About This Honestly
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You will probably have this exact conversation again this December. Here is how to handle it well.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Do not repeat the catechism story as settled fact.</strong> It is a popular
            legend with real weaknesses, not a documented piece of church history.
          </li>
          <li>
            <strong>Learn the one line that actually sinks it.</strong> The &quot;four calling
            birds&quot; wording the theory depends on did not exist in print until 1829, after the
            persecution it supposedly protected against had already ended.
          </li>
          <li>
            <strong>Give the real history its due instead.</strong> A 1780 party game, an unsettled
            French or English origin, and a 1909 tune are a genuinely interesting story on their
            own merits.
          </li>
          <li>
            <strong>Learn one real feast day inside the twelve days this year.</strong>{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-the-holy-innocents">
              The Feast of the Holy Innocents
            </ArticleLink>{" "}
            on December 28 is more solid ground than a disputed song theory.
          </li>
          <li>
            <strong>Do not let a skeptic catch you in the wrong fact.</strong> If you are going to
            defend your faith&apos;s history, defend the parts that are actually true. Those parts
            do not need help.
          </li>
          <li>
            <strong>Remember the real persecution without borrowing a fake story for it.</strong>{" "}
            English Catholics really did suffer for their faith. That truth stands on its own,
            with no song required to prove it.
          </li>
          <li>
            <strong>Enjoy the song anyway.</strong> A party game is not a lesser thing to sing at
            Christmas. It does not need to be secretly theological to be worth your time.
          </li>
          <li>
            <strong>Point people to a named source, not a forwarded email.</strong> This whole
            legend spread because nobody checked it the first time. Be the person who actually
            checks.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses for This Conversation
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            None of these verses mention a partridge. They carry the actual weight this whole
            conversation keeps reaching for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 10:26 and 27</h3>
        <VerseQuote
          text="Fear them not therefore: for there is nothing covered, that shall not be revealed; and hid, that shall not be known. What I tell you in darkness, that speak ye in light: and what ye hear in the ear, that preach ye upon the housetops."
          reference="Matthew 10:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus describes His own teaching as something built to be shouted from rooftops, not
            smuggled past anyone in code. Whatever a persecuted believer had to risk to practice
            their faith, the content of that faith was never meant to stay hidden.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Psalm 85:10</h3>
        <VerseQuote
          text="Mercy and truth are met together; righteousness and peace have kissed each other."
          reference="Psalm 85:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This verse describes what actually happened at the Incarnation. Mercy and truth
            meeting in one place is a better picture of these twelve days than any coded gift
            list, and it does not need an unproven legend to make the point.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Corinthians 13:13</h3>
        <VerseQuote
          text="And now abideth faith, hope, charity, these three; but the greatest of these is charity."
          reference="1 Corinthians 13:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the real verse behind the legend&apos;s claim about the three French hens.
            Paul already wrote faith, hope, and charity out in plain language, addressed to a
            church with no reason to hide any of it. The actual source was never a secret to begin
            with.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 1:31</h3>
        <VerseQuote
          text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
          reference="Genesis 1:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The legend ties six geese to the six days of creation. The real text needs no
            disguise either. Genesis states it plainly, in the open, the same way the church has
            always taught it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Twelve Days of Christmas
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the meaning of the Twelve Days of Christmas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          On the church calendar, the twelve days mark Christmastide, the real season running from
          Christmas Day to the eve of Epiphany. The famous song of the same name began as a
          Twelfth Night memory and forfeit game, first printed in 1780, and was never written as a
          lesson plan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Twelve Days of Christmas song really a secret Catholic catechism?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No evidence supports that. The theory was proposed in 1979 with no documentation, and
          the version most people have heard rests on a priest&apos;s account of letters he said
          were later lost in a flood. Fact checkers and Catholic scholars alike have rejected it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who started the Twelve Days of Christmas catechism theory?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Canadian hymnologist Hugh D. McKellar proposed it in 1979 without evidence. Father Hal
          Stockert popularized a similar version in a 1982 essay that spread widely online once he
          posted it in 1995.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Father Hal Stockert prove the catechism theory was true?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. His own account relied on letters he said were lost in a flood, leaving nothing
          independently verifiable, and he later acknowledged the story might include elements of
          legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What do historians think the song&apos;s gifts actually mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most historians treat the gifts as exactly what they appear to be: an accumulating,
          slightly absurd list built for a Twelfth Night party game, not a theological code.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Twelve Days of Christmas song English or French?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody knows for certain. Some historians argue for an English origin based on
          Newcastle broadsheets that printed it for generations. Others point to the French red
          legged partridge in the first verse and to similar French folk songs.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who wrote the tune everyone sings today?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          English singer Frederic Austin arranged the now standard melody, performing it from 1905
          and publishing it with Novello in 1909, well over a century after the words were first
          printed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What do the Twelve Days of Christmas actually celebrate in the church calendar?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Real, separately named days: the Nativity itself, Saint Stephen&apos;s martyrdom, the
          naming and circumcision of Jesus, and the lead up to Epiphany, when the church remembers
          Christ revealed to the nations.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do people still believe the catechism legend?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It tells a better story than the truth does, and it borrows real weight from the
          genuine persecution English Catholics suffered after the Reformation, even though no
          verified document ties that persecution to this specific song.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it wrong for a Christian to enjoy the song anyway?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not at all. A Twelfth Night party game is a perfectly good thing to sing at Christmas. It
          simply does not need an invented secret meaning to be worth singing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Clear away the legend and three things remain true about the real twelve days of Christmas.</p>
          <p>
            📌 <strong>The famous song is a party game, not a catechism.</strong> It first appears
            in print in 1780, decades before the secret code theory was ever proposed, and the
            theory itself has no verified document behind it.
          </p>
          <p>
            📌 <strong>The real twelve days do not need the legend to matter.</strong> They mark
            an actual church season, with real feast days inside it, built around the Incarnation
            itself rather than a coded gift list.
          </p>
          <p>
            📌 <strong>The gospel was never meant to travel in secret.</strong> Jesus told His own
            followers to preach from the rooftops, not whisper through a song about birds.
          </p>
          <p>
            Whatever you sing at your own Christmas party this year, you can sing it for what it
            actually is, a strange and delightful old game, while still giving the real twelve
            days, and the Child they point to, your full attention.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="7 November 2026"
        sources={[
          {
            title: "12 Facts About '12 Days of Christmas'",
            publisher: "Kat Eschner, Smithsonian Magazine",
            year: "2017",
            url: "https://www.smithsonianmag.com/smart-news/12-facts-about-12-days-christmas-180967569/",
            note: "The source for the song's 1780 first printing in Mirth Without Mischief, the memory and forfeit game theory, the French origin debate, and Snopes researcher David Mikkelson's comments on the catechism claim.",
          },
          {
            title: "The Twelve Days of Christmas (song)",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/The_Twelve_Days_of_Christmas_(song)",
            note: "The source for Hugh D. McKellar's 1979 catechism proposal with no supporting evidence, Father Hal Stockert's 1982 and 1995 account, Father James Gilhooley's later versions of the claim, and Frederic Austin's 1909 Novello published melody.",
          },
          {
            title: "'The 12 Days of Christmas': Underground Catechism?",
            publisher: "Steven D. Greydanus, National Catholic Register",
            year: "2017",
            url: "https://www.ncregister.com/blog/steven-greydanus/12-days-of-christmas",
            note: "The source for the detailed critique of the catechism theory's symbolism, including the partridge as a biblical symbol of deceit in Jeremiah 17:11, the blackbird symbolism problem, and the 1829 dating issue with the 'four calling birds' wording.",
          },
          {
            title: "Is there a deeper meaning behind 'The Twelve Days of Christmas'?",
            publisher: "Catholic News Service, via Our Sunday Visitor",
            year: "2022",
            url: "https://www.oursundayvisitor.com/is-there-a-deeper-meaning-behind-the-twelve-days-of-christmas/",
            note: "The source for the full list of claimed symbolic meanings behind each gift, and for Father Jerome Kodell's description of the catechism theory as 'preposterous.'",
          },
        ]}
      />
    </BlogPostShell>
  );
}
