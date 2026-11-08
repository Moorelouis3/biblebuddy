import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-king-herod", {
  title: "Who Was King Herod? The Ruler Behind the Christmas Story",
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

export default function WhoWasKingHerodPage() {
  return (
    <BlogPostShell
      slug="who-was-king-herod"
      title={<>📖 Who Was King Herod? The Ruler Behind the Christmas Story</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Every nativity play needs a villain, and Herod is always cast as the obvious one.</p>
            <p>A cruel old king on a throne, scowling at a baby he has never even met.</p>
            <p>That picture is not wrong. It is just thinner than the real man.</p>
            <p>
              📌 <strong>Here is the plain answer. Herod was not a minor local despot. He was a
              Roman client king who ruled Judea for roughly thirty three years, rebuilt the Jerusalem
              Temple on a scale that still shapes the city today, and had his own wife, two of his
              sons, his wife&apos;s brother, and his wife&apos;s grandfather all put to death before
              he ever heard a rumor about a newborn king.</strong>
            </p>
            <p>
              By the time the wise men reached his palace, killing the people closest to him to
              protect his crown was not new behavior. It was the pattern of his entire reign.
            </p>
            <p>
              This is the real story of the king behind the Christmas story. Who he actually was,
              how he actually got the crown, and why a baby in Bethlehem was ever a threat to a man
              who already ruled an entire kingdom. Every historical claim below links to a named
              source you can check for yourself.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who King Herod Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Herod was not born a king, and he was not born an Israelite.</p>
          <p>
            His father, Antipater, was an Idumean, from the region south of Judea whose people had
            been forced to accept Judaism generations earlier under the Hasmonean ruler John
            Hyrcanus. His mother, Cypros, was a Nabatean Arab princess from Petra.
          </p>
          <p>
            📌 <strong>Herod was raised Jewish, but to many of the Jews he ruled, he was always an
            outsider wearing a crown he did not inherit.</strong>
          </p>
          <p>
            Antipater&apos;s own alliance with Julius Caesar opened the door. Herod became governor
            of Galilee around 47 BC while still in his twenties, and when Parthian invaders
            installed a rival on the throne in 40 BC, Herod fled to Rome rather than fight a losing
            war. The Roman Senate, backed by Mark Antony and Octavian, named him King of the Jews
            that same year, while another man still physically held Jerusalem.
          </p>
          <p>
            💡 Understand this one fact and the rest of his life makes sense: Herod&apos;s throne
            came from Rome, not from his own people, and he spent the next thirty three years
            ruling like a man who never stopped feeling that gap.
          </p>
          <p>He did not actually take the city he had been named king of for three more years. Here is how that went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of King Herod</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A King Who Had to Conquer His Own Capital</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rome could hand Herod a title. It could not hand him Jerusalem, which was still held by
            Antigonus, the last independent Hasmonean king.
          </p>
          <p>
            Herod and the Roman general Sosius besieged the city and took it in 37 BC. Antony then
            had Antigonus executed, clearing the last rival claim to the throne.
          </p>
          <p>
            📌 <strong>Herod spent his first years as king fighting other people for a crown Rome
            had already given him on paper.</strong>
          </p>
          <p>
            The year before, in 38 BC, he had married Mariamne, a Hasmonean princess, specifically
            because her bloodline carried the legitimacy his own could not give him.
          </p>
          <p>💡 A marriage built to fix a weakness rarely stays simple. This one did not.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. What Rome Gave Him, Rome Could Take Away</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Herod&apos;s whole career depended on guessing correctly which Roman would stay in power.</p>
          <p>
            He backed Mark Antony for years. When Antony lost to Octavian at the naval battle of
            Actium in 31 BC, Herod&apos;s crown should have gone down with him.
          </p>
          <p>
            📌 <strong>Instead, Herod sailed to Rhodes, met Octavian in person, and argued that his
            loyalty to a friend, even a defeated one, was exactly why Octavian could trust him
            too.</strong> It worked. Octavian, soon to be the emperor Augustus, confirmed him as
            king and added territory to his kingdom.
          </p>
          <p>
            ⚠️ Notice what that survival taught him. Being useful to Rome, not being loved by his
            own people, was what actually kept him alive. He ruled the rest of his reign on that
            same lesson.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Wife He Married for Legitimacy, and Then Killed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mariamne gave Herod exactly what he married her for: a direct line back to the Hasmonean kings.</p>
          <p>It did not buy her safety.</p>
          <p>
            📌 <strong>Herod had Mariamne&apos;s brother, the young high priest Aristobulus,
            drowned at a party in 35 BC, reportedly because his popularity with the people
            frightened him.</strong>
          </p>
          <p>
            The Catholic Encyclopedia&apos;s account of the Herodian family describes Herod as a
            genuinely skilled ruler whom fortune favored, but one who treated murder and generosity
            as equally useful tools for the same goal: staying in power.
          </p>
          <p>
            In 29 BC, Herod put Mariamne on trial for alleged adultery and had her executed. He then
            executed her mother, Alexandra, the following year, and had already put Mariamne&apos;s
            grandfather, the aging former king Hyrcanus, to death as well.
          </p>
          <p>
            ⚠️ <strong>By 28 BC, Herod had killed his wife, his wife&apos;s brother, her mother, and
            her grandfather.</strong> Every one of them carried Hasmonean blood. Every one of them
            was, in Herod&apos;s eyes, a possible rival claim to his own throne.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Temple Built Bigger Than Devotion Required</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not everything Herod built was a tomb for his enemies.</p>
          <p>
            Around 19 BC he began an enormous rebuilding of the Jerusalem Temple, doubling the size
            of its platform. The retaining wall he built to support that platform still stands
            today as the Western Wall.
          </p>
          <p>
            Jewish Virtual Library&apos;s account of the project notes that Herod also enlarged the
            Temple Mount itself with massive encasement walls packed with earth, using thousands of
            forced Jewish laborers to move limestone blocks, some of them weighing more than ten
            tons.
          </p>
          <p>
            💡 The Catholic Encyclopedia raises an honest question about his motive, noting that his
            public speech at the project&apos;s start was full of piety while his real driving force
            may have been vanity as much as devotion.
          </p>
          <p>
            Herod built far beyond the Temple too: the harbor city of Caesarea, the desert fortress
            of Masada, and the fortified palace mound of Herodium, among others. The scale of the
            building program is one reason historians who study the period still call him Herod the
            Great, whatever else they say about him.
          </p>
          <p>
            📌 <strong>None of it changed how his own people felt about him.</strong> Jewish
            Virtual Library states plainly that even the projects meant to win the people over
            failed to change their hatred of him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The King Who Began Killing His Own Sons</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Herod had many wives and many sons, and late in his reign the paranoia that killed Mariamne turned on them too.</p>
          <p>
            In 7 BC, after a trial held before a Roman court in Beirut, Herod had Alexander and
            Aristobulus, his two sons by Mariamne, executed on suspicion of plotting against him.
          </p>
          <p>
            A third son, Antipater, spent years positioning himself as heir after his
            half brothers&apos; deaths. Shortly before Herod&apos;s own death, Antipater was
            convicted of trying to poison his father and was executed as well.
          </p>
          <p>
            ⚠️ <strong>By the end of his life, Herod had executed three of his own adult sons.</strong>{" "}
            A king that willing to kill his own family over a rumor of rivalry was never going to
            treat a rumor about a newborn king gently.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Night a Child&apos;s Birth Reached His Palace</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke dates the whole Christmas story against this one man&apos;s reign, years before the
            wise men ever arrived.
          </p>
        </div>
        <VerseQuote
          text="There was in the days of Herod, the king of Judaea, a certain priest named Zacharias, of the course of Abia: and his wife was of the daughters of Aaron, and her name was Elisabeth."
          reference="Luke 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 John the Baptist&apos;s own father was already serving as a priest under
            Herod&apos;s reign, before Jesus was even conceived.
          </p>
          <p>
            Then, in Matthew&apos;s Gospel, strangers from the east arrive in Jerusalem asking where
            to find a newborn king. Watch what that question does to the man already sitting on the
            throne.
          </p>
        </div>
        <VerseQuote
          text="When Herod the king had heard these things, he was troubled, and all Jerusalem with him."
          reference="Matthew 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Given everything that came before this verse, that reaction is not surprising at all.
            Herod had already shown, repeatedly, exactly what he did with rivals, real or
            imagined.{" "}
            <ArticleLink href="/blog/who-were-the-wise-men">
              What the wise men actually said and did
            </ArticleLink>{" "}
            is its own story. What matters here is what their question did to the king who heard
            it.
          </p>
          <p>
            Herod sent the wise men toward Bethlehem privately, asking them to report back once they
            found the child, with no intention of worshipping anyone himself.
          </p>
          <p>
            When they never returned, having been warned in a dream to go home another way, Herod
            responded the only way his whole reign had trained him to respond.
          </p>
        </div>
        <VerseQuote
          text="Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under, according to the time which he had diligently enquired of the wise men."
          reference="Matthew 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Be honest about what can and cannot be checked here.</strong> No surviving
            writing from Herod&apos;s own court historian, and no mention in the Jewish historian
            Josephus, directly confirms this specific killing. The Catholic Encyclopedia&apos;s
            defense of the passage points out that Josephus leaned heavily on Nicolaus of Damascus,
            a courtier who wrote favorably about Herod, and argues that an underreported killing in
            one small town would not be out of character for either source to leave out.
          </p>
          <p>
            Other historians read the silence differently and treat the episode as a literary way of
            showing Herod&apos;s character rather than a separately documented event. What is not in
            dispute is the kind of man doing the deciding. Everything in the paragraphs above this
            one is independently recorded, and none of it makes a massacre ordered by this
            particular king implausible.
          </p>
          <p>
            Joseph, warned in his own dream, had already fled with Mary and the child into Egypt.
            This is the part of{" "}
            <ArticleLink href="/blog/what-the-first-christmas-actually-looked-like">
              the actual first Christmas
            </ArticleLink>{" "}
            that gets left out of nearly every pageant, and it is remembered on its own feast day,{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-the-holy-innocents">
              the Feast of the Holy Innocents
            </ArticleLink>
            , three days after Christmas itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. A Death Even His Own Family Celebrated</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Herod did not die quickly. The Catholic Encyclopedia describes his final illness as a
            long, painful decline, and later medical writers have proposed chronic kidney disease
            with an infected complication as the likely cause.
          </p>
          <p>
            📌 <strong>Josephus reports that Herod tried to stab himself near the end, and that a
            cousin stopped him.</strong> He also records that Herod, anticipating his own death,
            ordered a group of prominent men executed so the nation would be forced into mourning
            when he died. His sister and brother in law quietly did not carry the order out.
          </p>
          <p>
            ⚠️ Most scholars date his death to around March or April of 4 BC, based on an eclipse
            Josephus mentions and the length of his sons&apos; later reigns. A smaller number of
            historians argue for 1 BC instead, pointing to how those same sons dated their own coins.
            The exact year is still argued among historians who study the period closely. His death
            happening sometime in that narrow window is not.
          </p>
          <p>
            Josephus says he was buried at Herodium, the fortress he built in the desert. In 2007,
            archaeologist Ehud Netzer announced that his team had found the tomb there. Other
            Hebrew University scholars, Joseph Patrich and Benjamin Arubas, published a formal
            challenge in 2015, arguing the structure&apos;s modest size and mismatched orientation
            point to a different member of Herod&apos;s family instead.
          </p>
          <p>
            💡 <strong>Even where the body of the man who feared losing his throne actually lies is
            still an open argument among historians.</strong>
          </p>
          <p>
            Augustus honored Herod&apos;s will and split the kingdom three ways. Herod Antipas, one
            surviving son, became tetrarch of Galilee, the same ruler who later killed John the
            Baptist and questioned Jesus before the crucifixion. Another son, Archelaus, briefly
            ruled Judea itself, the reason Joseph avoided settling there and raised Jesus in Nazareth
            instead.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From King Herod&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A throne you have to protect will own you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Herod never stopped defending a crown he feared losing.</p>
          <p>He killed his wife, her family, and three of his own sons protecting it.</p>
          <p>❓ What are you currently guarding so tightly that you would not notice yourself becoming cruel to keep it?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Fear mistakes a baby for a threat</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A newborn in a small town posed no army, no claim, no actual danger to Herod&apos;s throne.</p>
          <p>⚠️ Fear does not wait for a real threat. It reacts to any rumor that something else might matter more than what you already have.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Power and legitimacy are not the same thing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rome gave Herod a title. It never gave him his people&apos;s trust, and he spent thirty three years building things that could not buy it either.</p>
          <p>📌 You can hold every official mark of authority and still be missing the one thing it was supposed to represent.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The true King did not need Herod&apos;s throne</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus was born poor, in a small town, under a ruler determined to kill Him, and none of it stopped Him from becoming exactly who He was sent to be.</p>
          <p>💡 Herod had the palace, the army, and the title. He still could not touch the one birth he was most afraid of.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From King Herod&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:5</h3>
        <VerseQuote
          text="There was in the days of Herod, the king of Judaea, a certain priest named Zacharias, of the course of Abia: and his wife was of the daughters of Aaron, and her name was Elisabeth."
          reference="Luke 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke anchors the entire Christmas story to a real, dateable reign before a single angel appears on the page.</p>
          <p>📌 The Gospels were never written as legend floating outside history. They name the king who was actually on the throne.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Matthew 2:3</h3>
        <VerseQuote
          text="When Herod the king had heard these things, he was troubled, and all Jerusalem with him."
          reference="Matthew 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Troubled is a soft word for what the rest of this article shows Herod was capable of doing with that feeling.</p>
          <p>💡 The same news that filled the wise men with joy a few verses later filled this king with dread.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 2:13</h3>
        <VerseQuote
          text="And when they were departed, behold, the angel of the Lord appeareth to Joseph in a dream, saying, Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word: for Herod will seek the young child to destroy him."
          reference="Matthew 2:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>God moved Joseph out of danger before Herod ever acted on his anger.</p>
          <p>📌 The warning came before the threat did anything. Protection rarely waits for the danger to prove itself first.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 2:16</h3>
        <VerseQuote
          text="Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under, according to the time which he had diligently enquired of the wise men."
          reference="Matthew 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The same pattern that killed Mariamne and three of his own sons shows up here against children who had no part in any plot at all.</p>
          <p>⚠️ Cruelty practiced for years rarely stays contained to the people who actually threatened him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 2:19 to 20</h3>
        <VerseQuote
          text="But when Herod was dead, behold, an angel of the Lord appeareth in a dream to Joseph in Egypt, Saying, Arise, and take the young child and his mother, and go into the land of Israel: for they are dead which sought the young child's life."
          reference="Matthew 2:19 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The king who killed to keep his throne is in the ground. The child he wanted dead is on His way home.</p>
          <p>📌 Every threat Herod ever raised against this family had an expiration date his own power could not extend.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About King Herod</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was King Herod a real historical person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Herod the Great is one of the best documented rulers of the ancient Near East, known
          from the Jewish historian Josephus, Roman writers, coins minted in his name, and the
          archaeological remains of his building projects, including the Western Wall, Masada, and
          Herodium.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is King Herod the same Herod who killed John the Baptist?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. That was Herod Antipas, one of Herod the Great&apos;s surviving sons, who ruled
          Galilee as tetrarch after his father&apos;s death. Herod the Great, the subject of this
          article, had already been dead for decades by the time John the Baptist began preaching.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is King Herod the same Herod who questioned Jesus before the crucifixion?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, that was Herod Antipas again, the same son who killed John the Baptist, examining
          Jesus decades after his father&apos;s death. The Gospels mention several different Herods
          across roughly a century, and the name belongs to the whole family, not one single man.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Herod Jewish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He was raised and practiced as a Jew, but his father&apos;s Idumean ancestry meant many of
          his Jewish subjects never fully accepted him as one of their own. Jewish Virtual
          Library notes that his background as the son of a forced convert was a lasting source of
          resentment throughout his reign.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Herod the Great known for building?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His largest project was expanding the Jerusalem Temple and its platform, whose retaining
          wall survives today as the Western Wall. He also built the port city of Caesarea, the
          desert fortress of Masada, and the fortified palace mound of Herodium, where he was
          reportedly buried.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did King Herod really order the massacre of the innocents?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew&apos;s Gospel is the only ancient source that records it by name, and Josephus does
          not separately confirm it. Defenders of the account point out that Josephus relied partly
          on a writer favorable to Herod, and that the killing fits everything else Herod is
          independently known to have done to protect his throne. Honest readers should hold the
          specific event a little more loosely than the rest of his documented life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did King Herod die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After a long and painful final illness, which later medical writers have suggested was
          chronic kidney disease with an infected complication. Josephus records that he attempted
          to take his own life shortly before he died, and that his final order to execute leading
          men so the nation would mourn him was never actually carried out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When exactly did King Herod die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most historians place his death around March or April of 4 BC, based on an eclipse
          Josephus records and the length of his sons&apos; reigns afterward. A minority of scholars
          argue for 1 BC instead. The exact year remains debated among historians, though it falls
          within those few years either way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where is King Herod buried?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Josephus says he was buried at Herodium. Archaeologist Ehud Netzer announced a tomb there
          in 2007, but other Hebrew University scholars published a formal challenge in 2015,
          arguing the structure more likely held a close relative. The exact location of his body is
          still disputed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happened to Herod&apos;s kingdom after he died?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His will, honored by Augustus, split it three ways among his surviving sons. Herod
          Antipas received Galilee, Archelaus received Judea itself before being removed by Rome
          within a decade, and Philip received territory northeast of the Jordan. All three names
          reappear later in the Gospels.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the pageant costume, and Herod was not a cartoon villain who appears for one scene and disappears.</p>
          <p>
            📌 <strong>He was a genuinely capable ruler who spent thirty three years proving, over
            and over, that he would kill anyone, including his own wife and his own sons, to keep a
            crown Rome had given him and his own people never fully accepted.</strong>
          </p>
          <p>
            By the time a handful of travelers asked where to find a newborn king, that question was
            never going to get a calm reception. It landed on a man who had already shown exactly
            what he did with rivals.
          </p>
          <p>
            📌 <strong>And none of it worked.</strong> Herod died with his throne still contested,
            his own burial place still argued over two thousand years later, and the child he wanted
            dead alive in Nazareth. A king cannot kill his way to safety, no matter how many
            threats, real or imagined, he removes.{" "}
            <ArticleLink href="/blog/what-is-christmas">
              The whole rest of the Christmas story
            </ArticleLink>{" "}
            depends on that one failure.
          </p>
          <p>
            ❓ What would it look like to actually trust God with the thing you are currently
            tempted to protect at any cost?
          </p>
          <p>📌 <strong>Herod never asked that question. You still can.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="8 November 2026"
        sources={[
          {
            title: "Herod the Great",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Herod_the_Great",
            note: "The source for Herod's Idumean and Nabatean parentage, his appointment as governor of Galilee around 47 BC, the Roman Senate naming him king in 40 BC, his capture of Jerusalem in 37 BC, his backing of Mark Antony and later Octavian at Rhodes, the executions of Mariamne, Alexander, Aristobulus and Antipater, his final illness, and the 4 BC versus 1 BC death date debate.",
          },
          {
            title: "Herod",
            publisher: "Catholic Encyclopedia (1913), via Wikisource",
            url: "https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/Herod",
            note: "The source for the Catholic Encyclopedia's character assessment of Herod, his marriage to Mariamne for legitimacy, the drowning of Aristobulus, the question of vanity versus piety behind the Temple project, his planned killings at his own death, and its defense of the massacre of the innocents against claims that Josephus's silence disproves it.",
          },
          {
            title: "Tomb of Herod",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tomb_of_Herod",
            note: "The source for Ehud Netzer's 2007 announcement of a tomb at Herodium, and Joseph Patrich and Benjamin Arubas's 2015 published challenge to that identification.",
          },
          {
            title: "Herod",
            publisher: "Jewish Virtual Library",
            url: "https://www.jewishvirtuallibrary.org/herod",
            note: "The source for Herod's Idumean background as a lasting source of Jewish resentment, the scale of his Temple Mount expansion and forced labor, his building projects at Masada and Caesarea, and his reputation among the people he ruled.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
