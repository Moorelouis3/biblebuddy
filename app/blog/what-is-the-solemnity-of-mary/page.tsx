import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-solemnity-of-mary", {
  title: "What Is the Solemnity of Mary, Mother of God? Why January 1 Matters",
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

export default function WhatIsTheSolemnityOfMaryPage() {
  return (
    <BlogPostShell
      slug="what-is-the-solemnity-of-mary"
      title={<>📖 What Is the Solemnity of Mary, Mother of God? Why January 1 Matters</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You walk into Mass on January 1 expecting a New Year blessing, maybe a tired homily about resolutions.</p>
            <p>Instead the priest is talking about a council that met sixteen hundred years ago, a title the early church fought over, and a baby getting named eight days after His birth.</p>
            <p>No fireworks talk. No countdown. Just Mary, standing at the very start of the calendar.</p>
            <p>
              📌 <strong>Here is the plain answer. The Solemnity of Mary, Mother of God is the Catholic Church&apos;s highest ranked feast of the Virgin Mary, kept every January 1. It celebrates the title Theotokos, God bearer, that the Council of Ephesus formally attached to Mary in the year 431, and it also marks the Gospel moment eight days after Christmas when the infant Jesus was circumcised and given His name. Since 1969 this has been the official name and date for the feast, and Pope Paul VI later attached a second observance to the same day: the World Day of Peace.</strong>
            </p>
            <p>That one paragraph packs a theological council, a Gospel scene, and a modern papal project into a single date, and most people in the pew have never heard why.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through what the title Mother of God actually claims, the ancient fight that made it official doctrine, why the feast landed on January 1 of all days, what the day has been called across Christian history, why the Pope prays for peace on this exact date, and where Protestants agree with Rome on this one and where they do not.
            </p>
            <p>Every historical claim below links back to a named source, mostly the Vatican&apos;s own words, so you can read it for yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to hear &quot;Mother of God&quot; and assume it is a title about Mary. It is not, not really.</p>
          <p>
            ⚠️ <strong>Every word of this feast is actually a statement about Jesus.</strong> The early church was not arguing about how important Mary was. It was arguing about whether the baby she carried was fully God from the very first moment in her womb.
          </p>
          <p>
            Call Mary &quot;Mother of God&quot; and you are forced to say that the child in the manger was already, truly, completely God. Soften that title and you risk softening Christ Himself, splitting Him into something less than one undivided person.
          </p>
          <p>
            That is why this feast opens the calendar year instead of hiding in some quiet corner of it.{" "}
            <ArticleLink href="/blog/what-is-christmastide">
              Christmastide does not end at the manger
            </ArticleLink>
            . It keeps unfolding what the birth of Jesus actually means, one feast at a time, and January 1 is where the church states the stakes as plainly as it ever will.
          </p>
          <p>
            💡 <strong>Get the identity of Jesus right, and everything else about the Christian faith has somewhere solid to stand.</strong> Get it wrong, and the whole gospel shifts underneath you.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Solemnity of Mary Actually Celebrates
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. One Day, Several Names Through History</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Start with something that trips up even longtime Catholics. January 1 has not always carried the same name.
          </p>
          <p>
            According to Wikipedia&apos;s account of the feast&apos;s history, the Roman church once marked January 1 as the anniversary of Mary&apos;s divine motherhood as early as the sixth century, before other Marian feasts grew to overshadow it. By the early medieval period the day had shifted to mark the octave, the eighth day, of Christmas, the Gospel moment when the infant Jesus was circumcised and named. For centuries the day was widely known as the Feast of the Circumcision of the Lord.
          </p>
          <p>
            Pope John XXIII&apos;s 1960 calendar reform dropped the word circumcision from the title and simply called the day the Octave of the Nativity. A separate Feast of the Maternity of the Blessed Virgin Mary, which began in Portugal in 1751 and was extended to the whole church by Pope Pius XI in 1931, was kept on October 11.
          </p>
          <p>
            📌 <strong>Pope Paul VI brought all of that together.</strong> His 1969 reform of the church calendar, carried out through the apostolic letter Mysterii Paschalis, moved Mary&apos;s divine motherhood to January 1 for good, gave the day its current name, the Solemnity of Mary, the Holy Mother of God, and folded in the ancient naming of Jesus as well. The October date quietly disappeared from the universal calendar, though some traditionalist communities still keep it.
          </p>
          <p>History did not settle quickly here. It took fourteen centuries to land on one name and one date.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. What &quot;Mother of God&quot; Actually Means</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pope Benedict XVI addressed this title directly in a general audience given on January 2, the day after the solemnity, in 2008. He explained that Mother of God, in Greek Theotokos, meaning God bearer, was officially attributed to Mary at the Council of Ephesus in the year 431, though devotion using the idea had already taken root among ordinary Christians since the third century.
          </p>
          <p>
            Here is the part that matters most. Benedict XVI was clear that the whole debate at Ephesus was really about Christ, not about Mary. The council was defending the unity of Jesus as one undivided person, fully God and fully man at the same time, against a bishop named Nestorius who argued for keeping Mary&apos;s title to Christotokos, Christ bearer, to avoid implying that God himself had a beginning in her womb.
          </p>
          <p>💡 <strong>Rome&apos;s answer was not about elevating Mary for her own sake.</strong> It was about refusing to divide Jesus into two separate persons, one human and one divine, loosely attached to each other.</p>
          <p>
            The council sided against Nestorius. Theotokos stood. And the logic behind it is simple enough to say in three short lines.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🟢 Jesus is God.</li>
          <li>🟢 Mary gave birth to Jesus.</li>
          <li>🟢 Therefore Mary gave birth to God, in the flesh.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is the entire claim. Not that Mary existed before God, not that she is divine herself, only that the baby she carried in her own body was never, for one single moment, anything less than fully God.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Angel Said It First</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Long before any council met, Luke&apos;s Gospel already carried this claim in the angel Gabriel&apos;s own words to Mary.
          </p>
        </div>
        <VerseQuote
          text="And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS. He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end."
          reference="Luke 1:31 to 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice what the angel does not say. He does not tell Mary she is carrying a future prophet who will later become divine, or a man God will adopt. He says this son will be called the Son of the Highest, and that His kingdom will never end.
          </p>
          <p>
            Paul puts the same truth into a single tight sentence, written to a church arguing over something adjacent to this exact question, whether keeping the law could save anyone.
          </p>
        </div>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;God sent forth his Son&quot; and &quot;made of a woman&quot; sit in the same sentence, with no contradiction.</strong> The eternal Son of God entered the world through an ordinary human birth. Ephesus did not invent that claim. It defended it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Baby Who Got a Name Eight Days Later</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            January 1 is the eighth day of Christmas, and Luke&apos;s Gospel tells you exactly what happened on that day in the actual story.
          </p>
        </div>
        <VerseQuote
          text="But Mary kept all these things, and pondered them in her heart. And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them. And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
          reference="Luke 2:19 to 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two things happen in that one short passage. Mary says almost nothing out loud and simply ponders, and the baby is circumcised and formally named, exactly as the angel had instructed before He was ever conceived.
          </p>
          <p>
            For most of Christian history this circumcision, the moment Jesus was marked as a true son of Abraham under the law Paul mentions above, was the headline event of January 1. The 1969 reform did not erase that Gospel scene. It simply moved the spotlight to the woman standing quietly beside it, pondering, the one the angel had told eight months of her own life were about to prove the Son of the Highest.
          </p>
          <p>
            💡 <strong>The naming of Jesus is still part of the day.</strong> It is just no longer the title on the sign out front.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Why the Pope Prays for Peace on This Exact Day</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One more layer sits on top of January 1, and it is newer than everything above it by roughly fifteen centuries.
          </p>
          <p>
            On December 8, 1967, Pope Paul VI issued a message announcing a World Day of Peace, to be observed for the first time on January 1, 1968, and repeated every year after. In his own written reasoning, he chose New Year&apos;s Day on purpose because it opens the calendar, a symbol he hoped would carry hope for peace into everything that followed in the year ahead. He was also explicit that this was not meant to be a Catholic club. He hoped every person of good will, regardless of belief, would take up the day.
          </p>
          <p>
            Paul VI was careful about one more thing. His message says plainly that the new peace observance does not replace or compete with the liturgical calendar, which already gave New Year&apos;s Day to Mary&apos;s divine motherhood and the Holy Name of Jesus. The two observances sit on the same date on purpose, not by accident.
          </p>
          <p>
            The USCCB&apos;s own page for January 1 keeps both threads together today. It names the day the Octave Day of Christmas and the Solemnity of Mary, and in the same breath notes that it is also the World Day of Peace, pointing readers toward prayers for peace and ways to work for it.
          </p>
          <p>
            📌 <strong>The church calls Mary the Queen of Peace in its own devotional language, so praying for peace on the day it honors her as Mother of God is not a coincidence tacked on by a modern pope.</strong> It is one more layer built on the same foundation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Where Protestants Land, and Why</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is a rarer case among the disagreements covered in this series. The two sides are closer together than almost anywhere else Catholics and Protestants differ over Mary.
          </p>
          <p>
            The ministry GotQuestions.org addresses the title directly and lands somewhere careful. It affirms that the underlying logic holds up. Jesus is God, Mary is His mother, so in that narrow sense it is correct to say Mary bore God in the flesh. But the site calls Theotokos, God bearer, the more precise term, because &quot;mother of God&quot; in everyday English can wrongly suggest Mary came before God or was somehow His source, an idea GotQuestions calls flatly unbiblical.
          </p>
          <p>
            That caution is really the whole Protestant position in miniature.{" "}
            <ArticleLink href="/blog/what-is-the-immaculate-conception">
              Unlike a doctrine such as the Immaculate Conception, which most Protestants reject outright as unscriptural
            </ArticleLink>
            , the core claim behind Mother of God, that Jesus was fully God from the moment of His conception, is something virtually every confessing Christian affirms. Even several of the Reformers were comfortable using the title itself. The disagreement is less about the logic and more about where the church goes with it next.
          </p>
          <p>
            ⚠️ <strong>GotQuestions draws the line at later developments, not at the original title.</strong> It points to practices that grew out of Marian devotion, like venerating images of Mary or praying to her as Queen of Heaven, as a shift away from treating Christ alone as Redeemer and the one who intercedes for His people, a concern most Protestants would recognize instantly from their own churches.
          </p>
          <p>
            So the honest summary is this. Say &quot;Mary is the mother of God&quot; carefully, meaning the specific claim that Jesus was fully God in her womb, and most Protestants and Catholics are standing on the same ground. Build a yearly feast day, a title like Queen of Peace, and a request for her intercession on top of that claim, and{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              you have reached the place where the two traditions genuinely part ways
            </ArticleLink>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for January 1
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Whether you attend Mass this year or simply want the day to mean something more than a hangover and a resolution list, here is how to actually observe it.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Know whether it is a holy day of obligation this year before you plan your morning.</strong>{" "}
            <ArticleLink href="/blog/what-is-a-holy-day-of-obligation">
              The United States suspends the Mass obligation in certain years
            </ArticleLink>
            , so a Catholic friend&apos;s plans may look different from yours even on the same date.
          </li>
          <li>
            <strong>Read Luke 1:31 to 33 out loud before the day gets busy.</strong> Let the angel&apos;s words about the Son of the Highest set the tone for the whole year, not the countdown from the night before.
          </li>
          <li>
            <strong>Say one honest prayer for peace.</strong> You do not need to be Catholic to take Paul VI&apos;s original invitation seriously. Pick one real conflict, in the world or in your own home, and pray into it specifically.
          </li>
          <li>
            <strong>If you grew up thinking &quot;Mother of God&quot; was a strange or even offensive phrase, go learn what it is actually claiming.</strong> The target of the title is Jesus, not Mary&apos;s own status.
          </li>
          <li>
            <strong>Let the day reset your view of the whole Christmas season.</strong>{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              Epiphany is still two weeks away on January 6
            </ArticleLink>
            , and January 1 is proof the church never meant the story to end at the manger.
          </li>
          <li>
            <strong>Write down one resolution tied to Scripture instead of a gym membership.</strong> Mary pondered. Start the year with one verse you intend to actually keep, not just read.
          </li>
          <li>
            <strong>Talk with a Catholic friend about where you actually agree.</strong> This is one of the few Marian questions where the honest answer is &quot;mostly the same ground,&quot; and that conversation is worth having on purpose.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses for the Solemnity of Mary
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Five passages carry almost the entire meaning of this day.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul packs the whole claim of the day into one sentence. God sent His Son, and that Son was made of a woman. Eternity and an ordinary human birth, side by side with no contradiction. This is the verse the Council of Ephesus was ultimately defending centuries later.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 1:31 to 33</h3>
        <VerseQuote
          text="And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS. He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end."
          reference="Luke 1:31 to 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The angel tells Mary who this child is before she ever carries Him. Son of the Highest. A kingdom with no end. Nothing in this announcement treats Jesus as anything less than fully divine from the very start.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 2:19</h3>
        <VerseQuote
          text="But Mary kept all these things, and pondered them in her heart."
          reference="Luke 2:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the posture the whole day actually asks of you. Not a theological argument, not a party. A quiet pondering of what just happened, the same response Mary herself had in the exact scene the church remembers on January 1.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 1:46 and 47</h3>
        <VerseQuote
          text="And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour."
          reference="Luke 1:46 and 47"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mary&apos;s own recorded words settle something both Catholics and Protestants agree on without argument. She calls God her Saviour, in her own voice. Whatever title the church later gave her, she never once spoke of herself as anything more than a servant who needed rescuing like anyone else.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 6:24 to 26</h3>
        <VerseQuote
          text="The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace."
          reference="Numbers 6:24 to 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This ancient priestly blessing is one of the readings the church actually assigns for January 1 Mass. It closes on the word peace, centuries before Paul VI ever attached a World Day of Peace to the same date. The connection was sitting in the lectionary long before anyone made it official.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Solemnity of Mary
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Solemnity of Mary, Mother of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the Catholic Church&apos;s highest ranked feast honoring Mary, kept every January 1. It celebrates the title Theotokos, God bearer, affirmed at the Council of Ephesus in 431, and marks the Gospel scene eight days after Christmas when Jesus was circumcised and named.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Solemnity of Mary a holy day of obligation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in most years. The United States Conference of Catholic Bishops lists January 1 among the holy days of obligation, though the Mass attendance precept is suspended in years the date falls on a Saturday or a Monday. Check with your own parish for the current year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Mary called the Mother of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Jesus is fully God and Mary gave birth to Jesus. The title, in Greek Theotokos, was never really about elevating Mary. It was the early church&apos;s way of insisting that the baby in the manger was truly God from His very first moment, against a bishop named Nestorius who argued otherwise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was decided at the Council of Ephesus in 431?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The council affirmed that Jesus Christ is one undivided person, fully God and fully man, and that Mary can rightly be called Theotokos, God bearer, because of it. It rejected Nestorius&apos;s preferred title, Christotokos, Christ bearer, as a threat to that unity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is the Solemnity of Mary celebrated on January 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          January 1 is the octave day of Christmas, the eighth day, which the Gospel of Luke records as the day the infant Jesus was circumcised and formally named. Pope Paul VI&apos;s 1969 calendar reform, Mysterii Paschalis, placed Mary&apos;s divine motherhood on this same date for good.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did January 1 used to be called before 1969?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          For much of Christian history it was known as the Feast of the Circumcision of the Lord. Pope John XXIII&apos;s 1960 calendar renamed it the Octave of the Nativity, and Paul VI&apos;s 1969 reform gave it its current name while still folding the naming of Jesus into the same day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the connection between the Solemnity of Mary and the World Day of Peace?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Paul VI established the World Day of Peace for January 1, 1968, choosing New Year&apos;s Day because it opens the calendar. He was explicit that it does not replace the existing feast honoring Mary and the Holy Name of Jesus. Both observances share the date on purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants believe Mary is the Mother of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many do, in the narrow sense the term was originally meant to carry. GotQuestions.org affirms the underlying logic, that Jesus is God and Mary is His mother, while preferring the term Theotokos as more precise and cautioning against later Marian devotions it sees as going beyond Scripture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the Reformers accept the title Mother of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Several did, with care. Historical accounts describe both Martin Luther and John Calvin as willing to use the title in its original, narrow sense, even while rejecting later Catholic devotions built on top of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Feast of the Circumcision of Christ still observed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not under that name in the Catholic Church&apos;s main calendar since 1969, though the naming of Jesus is still part of the Solemnity of Mary readings, and some traditionalist Catholic communities continue to keep the older title and date.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things are worth carrying out of this guide and into the rest of your year.</p>
          <p>
            📌 <strong>This title was always about Jesus.</strong> The church was never trying to make Mary bigger. It was refusing to make Christ smaller.
          </p>
          <p>
            📌 <strong>The day itself has worn several names across fourteen centuries</strong>, and that history is a reminder that the church has kept thinking carefully about who Jesus is long after the councils stopped meeting.
          </p>
          <p>
            📌 <strong>This is one of the rare places where Catholics and Protestants stand on mostly common ground.</strong> The disagreement starts past the original claim, not inside it.
          </p>
          <p>
            Whatever you call January 1 this year, let the first thing you say about Jesus be the same thing the angel said to Mary before she ever carried Him.{" "}
            <ArticleLink href="/blog/most-important-christian-holidays">
              He is the Son of the Highest, and His kingdom will have no end
            </ArticleLink>
            . Start the year there, and the rest of it has somewhere solid to stand.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="1 November 2026"
        sources={[
          {
            title: "January 1: The Octave Day of Christmas; Solemnity of Mary, the Holy Mother of God",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://usccb.org/prayer-and-worship/liturgical-year/christmas/christmas-january-1",
            note: "The source for the day's current name, its pairing with the World Day of Peace, and the USCCB's own framing of the date.",
          },
          {
            title: "General Audience, 2 January 2008",
            publisher: "Pope Benedict XVI, The Holy See, vatican.va",
            year: "2008",
            url: "https://www.vatican.va/content/benedict-xvi/en/audiences/2008/documents/hf_ben-xvi_aud_20080102.html",
            note: "The source for the Council of Ephesus in 431, the title Theotokos, the conflict with Nestorius over Christotokos, and the Vatican's own explanation of why the title is really about Christ's identity.",
          },
          {
            title: "Message of His Holiness Pope Paul VI for the Observance of a Day of Peace, 1 January 1968",
            publisher: "Pope Paul VI, The Holy See, vatican.va",
            year: "1967",
            url: "https://www.vatican.va/content/paul-vi/en/messages/peace/documents/hf_p-vi_mes_19671208_i-world-day-for-peace.html",
            note: "The source for the founding of the World Day of Peace, Paul VI's reasoning for choosing January 1, and his statement that it does not replace the existing Marian feast.",
          },
          {
            title: "Solemnity of Mary, Mother of God",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Solemnity_of_Mary,_Mother_of_God",
            note: "The source for the day's history across many names: the ancient Roman feast, the Feast of the Circumcision, the 1931 October Maternity feast, and Pope Paul VI's 1969 reform Mysterii Paschalis.",
          },
          {
            title: "Is Mary the 'mother of God'? What does Theotokos mean?",
            publisher: "GotQuestions.org",
            url: "https://www.gotquestions.org/Mary-mother-God-theotokos.html",
            note: "The source for the evangelical Protestant position: affirming the underlying logic of the title while preferring the term Theotokos and cautioning against later Marian devotions.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
