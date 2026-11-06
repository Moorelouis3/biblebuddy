import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("how-does-the-church-make-a-saint", {
  title: "How Does the Church Make a Saint? Canonization Explained",
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

export default function HowDoesTheChurchMakeASaintPage() {
  return (
    <BlogPostShell
      slug="how-does-the-church-make-a-saint"
      title={<>📖 How Does the Church Make a Saint? Canonization Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Someone just died, and a friend who knew them says it plainly.
              She was a saint. A headline somewhere says the Vatican has
              opened a cause for a nun, a priest, or a layperson you have
              never heard of. Nobody ever explains what either sentence
              actually means.
            </p>
            <p>
              Maybe you grew up Catholic and watched a canonization on the
              news without ever learning the steps that led up to it. Maybe
              you are Protestant and the whole idea feels borrowed from a
              different religion entirely, something closer to a legal
              proceeding than anything you read about in church.
            </p>
            <p>
              📌 <strong>Here is the plain answer. Canonization is a real,
              formal process inside the Catholic Church, not a vote and not a
              vibe. It runs through a local bishop, a tribunal, a Vatican
              office, a panel of theologians, an actual medical board, and a
              Pope who signs the final decree. Most causes take decades. Some
              never finish at all.</strong>
            </p>
            <p>
              This guide walks through every real step, from a bishop opening
              a file to two verified miracles and a declaration read aloud in
              Saint Peter&apos;s Square. You will see where Mother Teresa and
              John Paul II actually fit into that timeline, who checks a
              miracle before any theologian even weighs in, and the
              straightforward reason a large share of Christians never
              adopted this process to begin with.
            </p>
            <p>Every historical and doctrinal claim below links back to a named source you can check for yourself.</p>
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
            It is easy to treat this as church bureaucracy, interesting
            trivia with no real weight on your own walk with God.
          </p>
          <p>
            ⚠️ <strong>But strip away the paperwork and one real question is
            sitting underneath all of it.</strong> How does anyone actually
            know whether a life was worth imitating. Not admired from a
            distance. Imitated.
          </p>
          <p>Scripture answers that question before any Vatican office ever existed.</p>
          <VerseQuote
            text="Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,"
            reference="Hebrews 12:1"
          />
          <p>
            Every Christian, Catholic or Protestant, is told to run a race
            while watching lives that already finished theirs well. Canonization
            is the Catholic Church&apos;s own careful, documented attempt to
            answer who belongs on that list, and to show its work doing it.
          </p>
          <p>
            Whether or not you accept the process, the instinct behind it,
            that a finished life can still teach you something about how to
            run your own, is one every believer already owns.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 How the Catholic Church Actually Names a Saint
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. It Starts With a Bishop, Not a Vote in Rome
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Catholic Straight Answers lays out where every cause actually
            begins. After someone dies with a local reputation for holiness,
            what the Church calls fame of sanctity, a cause can open once the
            normal five year waiting period has passed.
          </p>
          <p>
            The local bishop, not a Vatican office, starts things moving. He
            appoints a tribunal, gathers testimony from people who actually
            knew the person, examines their writings for soundness of
            doctrine, and records any favors reported through their
            intercession.
          </p>
          <p>
            📌 <strong>A sealed, authenticated copy of all of it then goes to
            Rome.</strong> At that point the person is formally called a
            Servant of God, the first real title in the process.
          </p>
          <p>
            The Roman office receiving that file has changed names more than
            once. Vatican News traces it to the Sacred Congregation of Rites,
            set up by Pope Sixtus V in 1588, which Paul VI split in 1969 into
            one body for worship and a separate Congregation for the Causes
            of Saints. John Paul II renamed it again in 1988, and Pope
            Francis&apos; 2022 constitution gave it its current name, the
            Dicastery for the Causes of Saints.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Venerable: Nine Theologians Vote on Heroic Virtue
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Once the Dicastery accepts a cause, a postulator, appointed to
            argue for the candidate, pulls everything into one document.
            Catholic Straight Answers describes it as part biography, part
            legal brief, part scholarly argument, known as the positio.
          </p>
          <p>
            A Vatican official called the promoter of the faith, popularly
            nicknamed the devil&apos;s advocate, raises formal objections
            against the file. The 1907 Catholic Encyclopedia, hosted on New
            Advent, describes a process built entirely around answering his
            questions, called dubia, before any stage can move forward. In
            that era there was, by its account, only one promoter of the
            faith and one assistant handling every single cause in the whole
            Church.
          </p>
          <p>
            A panel of nine theologians then votes on whether the evidence
            shows heroic virtue, or in a martyr&apos;s case, death specifically
            for the faith. Catholic Straight Answers reports that six positive
            votes send the cause to the Dicastery&apos;s own bishops and
            cardinals, and a two thirds vote there sends it on to the Pope
            himself.
          </p>
          <p>
            If he agrees, he signs a decree and the person becomes Venerable.
            Nothing about that title is a guess or a feeling. It is a formal
            judgment that a specific life produced the fruit Jesus said to
            look for.
          </p>
          <VerseQuote
            text="Ye shall know them by their fruits. Do men gather grapes of thorns, or figs of thistles?"
            reference="Matthew 7:16"
          />
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Blessed: One Miracle Changes Everything, Unless the Candidate Died a Martyr
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Venerable is not yet permission to publicly venerate anyone.
            Catholic Straight Answers is specific about what closes that gap.
            One verified miracle, attributed to the candidate&apos;s
            intercession after death, is required for beatification, unless
            the candidate is a martyr, who can be beatified on the martyrdom
            alone.
          </p>
          <p>
            Even then, beatification is limited. The newly titled Blessed can
            be venerated publicly, but Catholic Straight Answers notes that
            permission usually only covers one diocese, country, or religious
            order, not the whole Church at once.
          </p>
          <p>
            💡 <strong>Why a miracle at all.</strong> EWTN quotes Monsignor
            Michele Di Ruberto, once an undersecretary at the Dicastery,
            putting the Church&apos;s own logic plainly. People can be wrong
            about who was holy. A miracle, by definition, comes only from
            God, who does not deceive. In that framework a verified miracle
            functions as God&apos;s own confirmation of a human judgment that
            could otherwise be mistaken.
          </p>
          <p>
            That logic is not new. Peter leaned on the same connection between
            miracles and divine approval the very first time he preached
            after Pentecost.
          </p>
          <VerseQuote
            text="Ye men of Israel, hear these words; Jesus of Nazareth, a man approved of God among you by miracles and wonders and signs, which God did by him in the midst of you, as ye yourselves also know:"
            reference="Acts 2:22"
          />
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Who Actually Checks a Miracle: The Vatican&apos;s Own Medical Board
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A reported miracle does not go to theologians first. Aleteia
            traces organized medical review of these claims back to 1743,
            when the future Pope Benedict XIV, already an expert on
            canonization law, created the first standing register of
            physicians for the job.
          </p>
          <p>
            The board in its current form dates to 10 July 1959, when Pope
            John XXIII merged two earlier bodies into a single Medical Board,
            often called the Consulta Medica. Two experts carry out a first
            review of the case. A seven member commission from that board
            then studies it in full.
          </p>
          <p>
            📌 <strong>Nothing moves forward on a simple majority.</strong>{" "}
            Aleteia reports that revised 2016 rules require the commission&apos;s
            conclusions to be approved by a qualified majority, at least five
            of seven doctors, or four of six when a smaller panel sits, and
            that a single case cannot be sent back for review more than three
            times. Only once that panel finds no natural explanation does the
            file move on to the theologians who weigh its spiritual meaning.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Saint: A Second Miracle and the Pope&apos;s Final Word
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Canonization asks for the same proof again. Catholic Straight
            Answers states that a second miracle, attributed to the
            candidate&apos;s intercession after beatification, is normally
            required before a Blessed can become a Saint. That one plus one
            standard is itself a modern simplification. The 1907 Catholic
            Encyclopedia describes a far heavier older requirement, up to
            four miracles for beatification alone depending on how the
            evidence was gathered, before John Paul II&apos;s 1983 reform cut
            it down to the standard used today.
          </p>
          <p>
            The Pope reviews the finished file personally and makes the
            declaration in public, usually at a Mass in Saint Peter&apos;s
            Square, the same square where Pope Francis canonized Mother
            Teresa on 4 September 2016, the final word on a cause that had
            opened almost two decades earlier.
          </p>
          <p>
            Once that happens, the person&apos;s feast day enters the
            Church&apos;s own calendar for every parish, not just the one
            diocese beatification allowed. That is the same calendar behind{" "}
            <ArticleLink href="/blog/solemnity-feast-memorial-difference">
              the difference between a solemnity, a feast, and a memorial
            </ArticleLink>
            , and the reason{" "}
            <ArticleLink href="/blog/all-saints-day-vs-all-souls-day">
              All Saints Day exists at all
            </ArticleLink>
            , as one shared day for every canonized name the ordinary
            calendar has no room for individually.
          </p>
          <p>
            📌 <strong>One more claim needs stating carefully, not flattened
            into a fact.</strong> The 1907 Catholic Encyclopedia, citing
            Aquinas, says most theologians across history have held that the
            Pope cannot err when he canonizes. The same entry is just as
            clear that this has never been formally defined as a required
            article of faith, only treated as theologically certain, and that
            a minority of serious theologians have disputed it. Say it the
            way that source does. Widely held, not universally settled.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Five Year Rule, and Why Popes Keep Waiving It
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That five year wait mentioned at the very start is not absolute.
            Catholic Straight Answers confirms it is the normal rule before a
            cause can even open, set as part of John Paul II&apos;s 1983
            reform. It is also entirely within the Pope&apos;s own discretion
            to set aside.
          </p>
          <p>
            Mother Teresa is the clearest example. EWTN News, carried through
            Catholic News Agency, reported in 2005 that John Paul II himself
            had waived the wait for her, letting her cause open only two
            years after her 1997 death instead of five. She was beatified in
            October 2003 on the strength of a healing credited to her in
            2002, and VOA News reported that the Vatican approved a second
            miracle, the inexplicable cure of a Brazilian man&apos;s brain
            tumors, in December 2015, clearing the way for canonization.
          </p>
          <p>
            John Paul II received the same courtesy in reverse. That same
            2005 report records Pope Benedict XVI announcing, within weeks of
            John Paul II&apos;s own death, that he would waive the five year
            wait for him as well. UPI reported that Pope Francis canonized
            John Paul II on 27 April 2014, and the Associated Press reported
            that roughly 120,000 people filled Saint Peter&apos;s Square when
            Francis canonized Mother Teresa there on 4 September 2016.
          </p>
          <p>
            ⚠️ <strong>Notice what a waiver does and does not do.</strong> It
            moves the paperwork faster. It never skips the tribunal, the
            theologians, the medical board, or the two miracles. Every
            shortcut in this process has still run through the whole
            process.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Where Protestants Read the Same Bible and Land Somewhere Else Entirely
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most Protestant traditions have no version of this process at
            all, and it is worth hearing the actual biblical case rather than
            dismissing the whole thing as a difference in style.
          </p>
          <p>
            GotQuestions makes the core argument directly. It reads the New
            Testament as using the word saint for every believer, living or
            dead, not for a smaller class the Church certifies later. Paul
            opens an entire letter addressing a whole ordinary congregation
            that way.
          </p>
          <VerseQuote
            text="Paul, an apostle of Jesus Christ by the will of God, to the saints which are at Ephesus, and to the faithful in Christ Jesus:"
            reference="Ephesians 1:1"
          />
          <p>
            From there, GotQuestions argues that Scripture gives every
            believer direct access to God and never instructs anyone to
            route a prayer through someone already in heaven, which leaves
            the Protestant case against the whole practice resting on
            something simpler than a disagreement over paperwork.
          </p>
          <p>
            📌 <strong>Say the actual disagreement plainly, because it is not
            about the history above.</strong> Catholic teaching does not claim
            canonization manufactures holiness. It claims to recognize a
            holiness the Church believes already exists in heaven. Most
            Protestant readers reject the premise underneath that claim, that
            a believer in heaven can hear and relay a prayer at all, which is
            the same disagreement running underneath{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              the wider split between Catholic and Protestant church calendars
            </ArticleLink>
            . It is worth adding that the earliest saints, figures like{" "}
            <ArticleLink href="/blog/who-was-saint-andrew">
              Andrew the apostle
            </ArticleLink>
            , were never run through this tribunal at all. Their recognition
            came from centuries of ordinary veneration, long before Rome
            built a formal process for anyone else.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Thinking About Canonization Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You do not have to resolve every doctrinal question here to let
            this topic shape you honestly. Seven ways to do that.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Learn the real steps before repeating a headline.</strong>{" "}
            A phrase like the Vatican opened her cause means something
            specific, a bishop&apos;s tribunal and a sealed file, not an
            announcement that someone is already a saint.
          </li>
          <li>
            <strong>Separate the formal title from the New Testament word.</strong>{" "}
            Knowing that Scripture calls every believer a saint, while Rome
            reserves the capital letter title for a certified few, will keep
            you from treating the two claims as the same argument.
          </li>
          <li>
            <strong>Read an actual positio story, not just the headline.</strong>{" "}
            The life behind a canonization is almost always more specific and
            more human than the one sentence version that made the news.
          </li>
          <li>
            <strong>Watch for a miracle claim reported before the medical
            board has ruled.</strong> News coverage often runs ahead of the
            Vatican&apos;s own process, which can take years on a single
            case.
          </li>
          <li>
            <strong>If you are Protestant, you can still read these lives.</strong>{" "}
            A canonized biography can instruct you about faith under
            pressure the same way any Christian biography can, without asking
            you to pray through that person to get there.
          </li>
          <li>
            <strong>Remember heroic virtue is not the same as a sinless
            life.</strong> The Church is certifying a pattern of faithfulness
            carried to an unusual degree, not claiming the person never
            failed at anything.
          </li>
          <li>
            <strong>Let any approved example point you back to Christ, not
            past Him.</strong> Whatever your tradition, the entire point of
            studying a finished life is wanting to finish your own the way
            Hebrews 12:1 describes.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses Behind the Idea of Canonization
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            None of these verses mention a tribunal or a medical board. They
            are the raw material underneath the question canonization is
            actually trying to answer: who finished well, and how would
            anyone know.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Hebrews 12:1</h3>
        <VerseQuote
          text="Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,"
          reference="Hebrews 12:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is the verse the whole instinct behind canonization actually
          rests on. A finished life is not just a memory. It is meant to
          change how you run the part of the race still in front of you.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Philippians 3:17</h3>
        <VerseQuote text="Brethren, be followers together of me, and mark them which walk so as ye have us for an ensample." reference="Philippians 3:17" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul says this about an ordinary group of believers around him, not
          about a figure certified centuries later. It is the same pattern a
          canonized life runs on, scaled down to people Paul&apos;s readers
          could actually watch with their own eyes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Peter 5:4</h3>
        <VerseQuote text="And when the chief Shepherd shall appear, ye shall receive a crown of glory that fadeth not away." reference="1 Peter 5:4" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Every stage of canonization is ultimately trying to describe
          someone the Church believes already holds this crown. The title
          saint is a claim about where a life landed, not an award for how it
          looked along the way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Mark 16:17 and 18</h3>
        <VerseQuote
          text="And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues; They shall take up serpents; and if they drink any deadly thing, it shall not hurt them; they shall lay hands on the sick, and they shall recover."
          reference="Mark 16:17 and 18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Jesus ties miraculous signs to faith long before any Vatican medical
          board existed. The modern miracle requirement is a very old
          Christian instinct wearing a formal, documented process.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Timothy 2:2</h3>
        <VerseQuote
          text="And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also."
          reference="2 Timothy 2:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul is describing exactly what canonization is trying to protect
          across centuries instead of one conversation. A faithful life,
          witnessed and passed down so someone far later can still learn from
          it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Canonization
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is canonization in simple terms?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Canonization is the Catholic Church&apos;s formal, final declaration
          that a specific person is in heaven and worthy of public veneration
          by the whole Church, reached through a bishop&apos;s investigation,
          a Vatican review, verified miracles, and a decree the Pope signs
          and announces publicly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What are the four steps to becoming a saint?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Servant of God, once a bishop opens the cause. Venerable, once nine
          theologians and the Pope agree the evidence shows heroic virtue.
          Blessed, after one verified miracle, unless the candidate is a
          martyr. Saint, after a second verified miracle and the Pope&apos;s
          final declaration.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How many miracles does the Catholic Church require?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Under the current rules from John Paul II&apos;s 1983 reform, one
          verified miracle is required for beatification and a second for
          canonization, two in total for a non martyr. Martyrs can be
          beatified without one, though a miracle is still required for them
          to be canonized.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can the Pope waive the five year waiting period?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. It is entirely at his discretion. John Paul II waived it for
          Mother Teresa only two years after her death, and Benedict XVI
          waived it for John Paul II himself within weeks of his death. The
          waiver only speeds up when a cause can open, not any step that
          follows it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do martyrs need a miracle to be beatified?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. A martyr can be beatified on the evidence of dying for the
          faith alone. A verified miracle still has to be confirmed before
          that same martyr can be canonized as a saint.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who is the devil&apos;s advocate in the canonization process?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The official title is promoter of the faith. His job is to raise
          every real objection against a cause before it can advance, so that
          a title like Blessed or Saint only survives genuine scrutiny rather
          than popular pressure alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is a canonization considered infallible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Catholic theologians across history have held that the Pope
          cannot err when he canonizes, but this has never been formally
          defined as a required article of faith, and a minority of
          theologians have historically disputed it. Beatification, by
          contrast, is generally treated as a permission rather than a
          binding judgment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How long does canonization usually take?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          There is no fixed timeline, and many causes stall for decades
          waiting on evidence or a verified miracle. Mother Teresa&apos;s
          cause moved unusually fast at under twenty years from death to
          canonization, largely because two different popes chose to waive
          waiting periods and expedite review along the way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who actually verifies a reported miracle?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A standing panel of Vatican appointed physicians, often called the
          Consulta Medica, examines whether a reported cure has any natural
          medical explanation. Only once that panel cannot explain it does
          the case move on to the theologians who weigh its spiritual
          meaning.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants believe in canonizing saints?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Protestant traditions do not practice this at all. Sites like
          GotQuestions argue the New Testament already calls every believer a
          saint and gives every believer direct access to God, leaving no
          need, in their reading, for a separate formal process. The practice
          itself stays largely a Catholic and Orthodox one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the headlines and three things remain true.</p>
          <p>
            📌 <strong>Canonization is a documented process, not an
            announcement.</strong> A bishop&apos;s tribunal, a positio, nine
            theologians, a medical board, and two verified miracles all stand
            between a death and a declared saint.
          </p>
          <p>
            📌 <strong>The waivers only ever move the calendar.</strong> Every
            shortcut Rome has granted, to Mother Teresa, to John Paul II,
            still ran through the same tribunal and the same miracle
            standard everyone else faces.
          </p>
          <p>
            📌 <strong>The real disagreement with Protestants is not about the
            steps.</strong> It is about whether a believer already in heaven
            can hear and carry a prayer at all. Settle that question and the
            rest of this process becomes a detail, not the argument.
          </p>
          <p>
            Wherever you land on that question, Hebrews 12:1 still asks
            something of you directly. A finished life, examined honestly, is
            there to change how you run the part of the race still ahead of
            you.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="6 November 2026"
        sources={[
          {
            title: "Dicastery for the Causes of Saints",
            publisher: "Vatican News",
            year: "2025",
            url: "https://www.vaticannews.va/en/vatican-city/news/2025-07/dicastery-for-the-causes-of-saints.print.html",
            note: "The source for the office's history from the 1588 Sacred Congregation of Rites through the 1969 split, the 1983 reform under Divinus Perfectionis Magister, and the 1988 and 2022 name changes.",
          },
          {
            title: "Divinus Perfectionis Magister",
            publisher: "The Holy See (Pope John Paul II, 25 January 1983)",
            year: "1983",
            url: "https://www.vatican.va/content/john-paul-ii/en/apost_constitutions/documents/hf_jp-ii_apc_25011983_divinus-perfectionis-magister.html",
            note: "The primary source for the 1983 reform of the entire canonization procedure, including the five year waiting period and the simplified miracle standard.",
          },
          {
            title: "What Is the Official Process for Declaring Someone a Saint?",
            publisher: "Catholic Straight Answers",
            url: "https://catholicstraightanswers.com/what-is-the-official-process-for-declaring-someone-a-saint",
            note: "The source for the step by step process: the bishop's tribunal, the postulator and positio, the nine theologian vote, the miracle requirements for Blessed and Saint, and the martyr exception.",
          },
          {
            title: "Beatification and Canonization",
            publisher: "Catholic Encyclopedia (1907), via New Advent",
            year: "1907",
            url: "https://newadvent.org/cathen/02364b.htm",
            note: "The source for the historical development of the process, the role of the promoter of the faith, and the theological debate over whether canonization is an infallible act.",
          },
          {
            title: "Why Miracles Are Required for Canonizations",
            publisher: "EWTN",
            url: "https://www.ewtn.com/catholicism/library/why-miracles-are-required-for-canonizations-5992",
            note: "The source for the Church's own stated reasoning, through Monsignor Michele Di Ruberto, for why a verified miracle functions as divine confirmation of a human judgment.",
          },
          {
            title: "Vatican Issues Stricter Procedures for Medical Examination of Miracles",
            publisher: "Aleteia",
            year: "2016",
            url: "https://aleteia.org/2016/09/25/vatican-issues-stricter-procedures-for-medical-examination-of-miracles/",
            note: "The source for how the Medical Board, the Consulta Medica, reviews a reported miracle, its 1743 and 1959 origins, and the 2016 qualified majority rules.",
          },
          {
            title: "Canonization",
            publisher: "GotQuestions.org",
            url: "https://www.gotquestions.org/beatification.html",
            note: "The source for the Protestant case against formal canonization, including its reading of the New Testament's use of the word saint for every believer.",
          },
          {
            title: "John Paul II's Sainthood Could Take Some Time, Cautions Vatican Official",
            publisher: "EWTN News, carried by Catholic News Agency",
            year: "16 May 2005",
            url: "https://www.ewtnnews.com/vatican/john-paul-iis-sainthood-could-take-some-time-cautions-vatican-official?redirectedfrom=cna",
            note: "The source for Benedict XVI waiving the five year wait for John Paul II's cause, and for John Paul II having earlier waived it for Mother Teresa.",
          },
          {
            title: "Pope Approves Sainthood for Mother Teresa",
            publisher: "VOA News",
            year: "18 December 2015",
            url: "https://www.voanews.com/a/pope-approves-sainthood-for-mother-teresa/3108475.html",
            note: "The source for the timeline of Mother Teresa's two miracles, the 2002 healing and the December 2015 approval of the Brazilian man's cure.",
          },
          {
            title: "Pope Francis Declares John Paul II and John XXIII Saints",
            publisher: "UPI",
            year: "27 April 2014",
            url: "https://www.upi.com/Top_News/World-News/2014/04/27/Pope-Francis-declares-John-Paul-II-and-John-XXIII-saints/6311398616894/?sl=5",
            note: "The source for the 27 April 2014 date Pope Francis canonized John Paul II.",
          },
          {
            title: "Mother Teresa, 'Saint of the Gutters,' Canonized at Vatican",
            publisher: "Associated Press, via Valley News",
            year: "4 September 2016",
            url: "https://vnews.com/2016/09/04/mother-teresa-saint-of-the-gutters-canonized-at-vatican-4536121/",
            note: "The source for the 4 September 2016 canonization date and the estimated 120,000 people who filled Saint Peter's Square.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
