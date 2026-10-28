import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-saint-martin-of-tours", {
  title: "Who Was Saint Martin of Tours? The Meaning of St. Martin's Day",
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

export default function WhoWasSaintMartinOfToursPage() {
  return (
    <BlogPostShell
      slug="who-was-saint-martin-of-tours"
      title={<>📖 Who Was Saint Martin of Tours? The Meaning of St. Martin&apos;s Day</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the picture even if you never learned the name.</p>
            <p>Kids walking through a dark street in Germany or Austria, each one holding a paper lantern, singing as they go.</p>
            <p>That picture exists because of one decision a Roman soldier made at a city gate, almost seventeen hundred years ago.</p>
            <p>
              📌 <strong>A freezing beggar had nothing. A young soldier had one cloak. He cut it in
              half and gave away the warmer part, and the Church never stopped telling the
              story.</strong>
            </p>
            <p>Most people who hang a lantern on St. Martin&apos;s Day could not tell you who he actually was.</p>
            <p>
              This is the real story of Saint Martin of Tours. The soldier, the cloak, the bishop
              who did not want the job, and why a German boy born in 1483 ended up named after
              him.
            </p>
            <p>Let&apos;s start with who he actually was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Saint Martin of Tours Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Martin was born around 316, in Sabaria, a Roman town in what is now Hungary.
          </p>
          <p>His father was a Roman army officer, and the household was not Christian.</p>
          <p>
            Martin was drawn to Christianity early anyway, and became a catechumen, someone
            preparing for baptism, as a boy.
          </p>
          <p>
            📌 <strong>He did not get a say in his first career. Roman law required the sons of
            veteran soldiers to serve, and Martin was enrolled in the army at around fifteen.</strong>
          </p>
          <p>Almost everything we know about him comes from one book.</p>
          <p>
            A friend named Sulpicius Severus wrote the Life of Martin while Martin was still
            alive, finishing it only a couple of years before Martin died in 397.
          </p>
          <p>
            ⚠️ Be honest about what that book is. It is a devoted friend writing to honor a man
            he admired, not a neutral court record. The core events line up across other ancient
            sources, but some of the details carry the shine a biography written by an admirer
            always carries.
          </p>
          <p>Now here is how his story actually goes.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of Saint Martin of Tours</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Soldier Before He Was a Saint</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin&apos;s regiment was eventually posted to Amiens, in Gaul, modern day France.</p>
          <p>
            Sulpicius Severus says Martin lived more like a monk than a soldier the whole time he
            served, giving away much of his pay and caring for the sick in his unit.
          </p>
          <p>💡 He was already living like a Christian years before he was baptized as one.</p>
          <p>Then came the day everyone remembers him for.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Cloak at the Gates of Amiens</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It was a brutally cold winter, and people were freezing to death in the streets.</p>
          <p>At the city gate, Martin passed a beggar, half naked, shivering, and no one else had stopped to help him.</p>
          <p>
            Martin had already given away most of what he owned. All he had left on his own back
            was his soldier&apos;s cloak.
          </p>
          <p>He drew his sword, cut the cloak in two, and handed half to the man.</p>
          <p>
            📌 <strong>He did not give what was left over. He gave half of the only warm thing he
            had, and kept walking in the other half.</strong>
          </p>
        </div>
        <VerseQuote
          text="Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me."
          reference="Matthew 25:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That night, Sulpicius Severus says, Martin saw Christ in a dream, wearing the half cloak he had given away.</p>
          <p>
            Christ turned to the angels around him and said, in the biography&apos;s words, that
            Martin, &quot;as yet only a catechumen,&quot; had clothed him with that garment.
          </p>
          <p>💡 The beggar was not a stranger to be helped and forgotten. Christ identified Himself with the man in the cold.</p>
          <p>According to the same account, Martin asked for baptism as soon as he could get to a church after that.</p>
          <p>⚠️ No exact date survives for the baptism itself. What survives is the order of events: the gift came first, and the baptism followed it.</p>
          <p>
            He is not the only bishop the Church remembers mostly for what he gave away quietly.{" "}
            <ArticleLink href="/blog/when-is-saint-nicholas-day">
              Saint Nicholas, centuries later, gave away gold the same way
            </ArticleLink>
            , through a window instead of a sword cut, but for the same reason.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leaving the Army to Serve Christ</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin stayed in the army a few more years as a baptized Christian.</p>
          <p>
            Then, before a battle against invading tribes, Emperor Julian handed out a bonus to
            his soldiers. Martin refused his share.
          </p>
          <p>
            &quot;I have served you as a soldier,&quot; he reportedly told Julian. &quot;Let me
            now serve Christ.&quot;
          </p>
        </div>
        <VerseQuote
          text="Thou therefore endure hardness, as a good soldier of Jesus Christ. No man that warreth entangleth himself with the affairs of this life; that he may please him who hath chosen him to be a soldier."
          reference="2 Timothy 2:3 to 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Julian accused him of cowardice. Martin offered to walk into the next battle unarmed, to prove it was not fear talking.</p>
          <p>He was thrown in a cell for it. A truce ended the fighting before the offer was tested, and Martin was released and let go from the army.</p>
          <p>📌 <strong>He did not leave the fight because it got hard. He left because he had decided which army he actually belonged to.</strong></p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exile, Hilary, and the First Monastery in Gaul</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A free man, Martin went to Poitiers to study under Hilary, the city&apos;s bishop and a respected defender of orthodox teaching about Christ.</p>
          <p>
            Hilary ordained him a deacon. Soon after, Martin ran into the same fight Hilary was
            already in: Arian bishops who denied that Christ was fully God were pushing
            orthodox Christians out of their positions, Martin among them.
          </p>
          <p>He was publicly whipped and driven out of more than one town for it.</p>
          <p>
            Hilary himself was exiled to the eastern empire. Martin waited it out on a small
            island off the coast of Italy until an imperial order let Hilary come home in 360.
          </p>
          <p>Martin followed him back to Poitiers the next year.</p>
          <p>
            📌 <strong>Hilary gave him a plot of remote land nearby. Other men who wanted the
            same kind of life started showing up and settling around him.</strong>
          </p>
          <p>
            That settlement grew into the community now called Ligugé, and historians generally
            treat it as the earliest monastery founded on Gallic soil.
          </p>
          <p>Martin stayed there roughly ten years, walking out into the countryside to preach.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Dragged Into Being Bishop</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Around 371, the bishop of Tours died, and the people of the city wanted Martin to take his place.</p>
          <p>Martin did not want it. He liked his quiet, hidden life at Ligugé.</p>
          <p>
            So the people tricked him. A local man named Rusticius begged Martin to come and pray
            over his sick wife. Once Martin reached the city, a crowd was waiting to make him
            bishop whether he agreed or not.
          </p>
          <p>
            Some neighboring bishops objected, saying his plain, unwashed appearance made him
            look unfit for the office. The crowd overruled them anyway.
          </p>
        </div>
        <VerseQuote
          text="For whosoever exalteth himself shall be abased; and he that humbleth himself shall be exalted."
          reference="Luke 14:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A much loved detail belongs here, with one honest caveat attached. Popular legend
            says Martin hid in a goose shed to dodge the appointment, and that the geese gave him
            away with their honking.
          </p>
          <p>
            That specific story does not appear in Sulpicius Severus&apos;s account, Martin&apos;s
            earliest and closest biography. It shows up centuries later in European folk tradition,
            long after his death, and it is the reason geese became tied to his feast day at all.
          </p>
          <p>
            📌 <strong>The reluctance is well documented. The goose shed is a story people kept
            telling anyway, because it was too good to let go of.</strong>
          </p>
          <p>
            Once he was bishop, Martin refused to live like one. He set up a small hermitage
            across the river from Tours, and other men gathered there with him. That settlement
            became the monastery of Marmoutier.
          </p>
          <p>
            Martin is one of thousands of men and women the Church has honored this way, the
            same company{" "}
            <ArticleLink href="/blog/what-is-all-saints-day">
              All Saints&apos; Day sets aside a whole feast to remember
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Tearing Down Idols, Then Dying Facing Heaven</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rural Gaul outside the cities was still largely pagan when Martin became bishop.
            Sulpicius Severus describes him traveling out into the countryside on foot, by
            donkey, or by boat, and preaching there himself.
          </p>
          <p>
            The same account credits him with pulling down shrines and cutting sacred trees
            villagers worshipped, which earned him the later title Apostle of Gaul.
          </p>
        </div>
        <VerseQuote
          text="For they themselves shew of us what manner of entering in we had unto you, and how ye turned to God from idols to serve the living and true God."
          reference="1 Thessalonians 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Those stories come entirely from his own biographer, so read them as the Church&apos;s
            memory of a missionary bishop, not as an outside eyewitness report, the same caution
            worth keeping on hand any time{" "}
            <ArticleLink href="/blog/is-christmas-pagan">
              a tidy story about old paganism gets repeated as settled fact
            </ArticleLink>
            .
          </p>
          <p>
            Martin also used what influence he had to spare lives, including pleading with the
            emperor&apos;s court at Trier for condemned prisoners.
          </p>
          <p>
            He opposed the execution of a man named Priscillian over doctrine he disagreed with,
            arguing that a church court, not an executioner, was the right place to settle it. He
            lost that argument, and Priscillian was put to death anyway.
          </p>
          <p>
            Years later, worn down and ill, Martin traveled to settle a dispute among his own
            clergy at a town called Candes. He never made it home.
          </p>
          <p>
            He asked to lie on the bare ground, on ashes, instead of a bed, saying it was not
            fitting for a Christian to die any other way.
          </p>
        </div>
        <VerseQuote text="For to me to live is Christ, and to die is gain." reference="Philippians 1:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He died on November 8, 397, at around eighty one years old.</p>
          <p>
            📌 <strong>His body was carried to Tours and buried three days later, on November 11,
            which is why that date, not the day he died, became his feast.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Saint Martin&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Give what is actually in your hand</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin did not have a spare cloak sitting at home. He had one, on his own back, in the cold.</p>
          <p>He cut it instead of waiting for a better moment to give something whole.</p>
          <p>❓ What is the one thing you keep waiting to have more of before you give any of it?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A real calling will cost you the life you already built</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin had years invested in the army before he walked away from it.</p>
          <p>⚠️ Serving Christ is rarely free. It usually costs the thing you already have standing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. You cannot outrun the work God keeps putting in front of you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin wanted to stay hidden at Ligugé. The people of Tours would not let him.</p>
          <p>He spent the rest of his life doing the job he never asked for, and doing it well.</p>
          <p>📌 Not wanting a responsibility has never once been proof that it is not yours.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Keep your eyes forward, especially at the end</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martin spent his last conscious hours making sure nothing softened his view of what was coming.</p>
          <p>💡 He did not fear death. He arranged his final hours around facing it directly.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Saint Martin&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 25:36</h3>
        <VerseQuote
          text="Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me."
          reference="Matthew 25:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus names clothing the naked as something done directly to Him, not merely for Him.</p>
          <p>📌 Martin&apos;s cloak at Amiens is this verse, acted out three centuries later at a city gate in Gaul.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Timothy 2:3 to 4</h3>
        <VerseQuote
          text="Thou therefore endure hardness, as a good soldier of Jesus Christ. No man that warreth entangleth himself with the affairs of this life; that he may please him who hath chosen him to be a soldier."
          reference="2 Timothy 2:3 to 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is writing to Timothy, not about Martin, centuries earlier.</p>
          <p>💡 Martin simply traded one army&apos;s entanglements for the other soldier&apos;s calling Paul describes here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Thessalonians 1:9</h3>
        <VerseQuote
          text="For they themselves shew of us what manner of entering in we had unto you, and how ye turned to God from idols to serve the living and true God."
          reference="1 Thessalonians 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is describing the Thessalonians turning from idols. It was already the normal shape of conversion long before Martin preached in rural Gaul.</p>
          <p>⚠️ Whatever the exact details, Martin&apos;s whole ministry was aimed at exactly this turn, village by village.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Philippians 1:21</h3>
        <VerseQuote text="For to me to live is Christ, and to die is gain." reference="Philippians 1:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul wrote this from a Roman prison, uncertain whether he would live or die.</p>
          <p>📌 Martin, asking to lie on ashes so nothing would dull his view of heaven, died saying the same thing without a single word.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Saint Martin of Tours</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Saint Martin of Tours a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. He is a documented fourth century Roman soldier who became bishop of Tours, in
          what is now France, and the broad outline of his life is attested by his contemporary
          biographer Sulpicius Severus and later church historians. Some individual stories about
          him carry more legend than the core events do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When is St. Martin&apos;s Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          November 11 every year, the day Martin was buried in Tours three days after his death
          on November 8, 397. Western Christians have marked that date since at least the early
          Middle Ages.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do people eat goose on St. Martin&apos;s Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The most repeated explanation ties it to the legend of geese exposing Martin&apos;s hiding
          place when he tried to avoid becoming bishop. A second, more practical explanation is
          that November was once rent and tax day in much of medieval Europe, and a fattened
          goose was a common way to pay the bill. Both traditions likely fed each other over time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saint Martin really cut his cloak in half?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is the best attested story about him, recorded by his own biographer while people
          who had known Martin were still alive. It is treated as historical, not legend, in
          nearly every account of his life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the story about Saint Martin hiding from geese true?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Almost certainly not as history. It does not appear in Sulpicius Severus&apos;s account
          written near Martin&apos;s own lifetime, and it surfaces only much later in European folk
          tradition. What is documented is that Martin genuinely did not want to become bishop and
          had to be tricked into going to Tours at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Martin Luther named after Saint Martin of Tours?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luther was born on November 10, 1483, and baptized the next day, November 11, which was
          St. Martin&apos;s feast day. Naming a child after the saint whose feast fell near his
          birth was common practice at the time, which is how the future reformer ended up
          sharing a name with a fourth century Catholic bishop, something{" "}
          <ArticleLink href="/blog/what-is-reformation-day">the story of Reformation Day</ArticleLink>{" "}
          picks up more than a thousand years later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Saint Martin of Tours the patron saint of?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic tradition names him patron of France, along with soldiers, the poor, and
          several trades connected to his cloak, including tailors. France has kept him as a
          national patron since the Middle Ages.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saint Martin really destroy pagan temples?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His biographer Sulpicius Severus says so directly, describing shrines pulled down and
          sacred trees cut across the Gallic countryside. Since the only detailed source is a
          biography written to honor him, read the specific episodes as the Church&apos;s memory of
          an aggressive rural missionary campaign, not as a neutral outside record.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Saint Martin of Tours die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He died of natural causes at Candes, a town where he had traveled to settle a dispute
          among his clergy, on November 8, 397, at roughly eighty one. He reportedly asked to be
          laid on ashes rather than a bed in his final hours.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate St. Martin&apos;s Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do, as a cultural and historical observance rather than a day of prayer to a saint.
          German and Scandinavian Lutherans in particular keep the lantern walks and the goose
          dinner, partly because the date is tied to Martin Luther&apos;s own name. Many other
          Protestants, especially those wary of venerating saints at all, do not mark the day, and
          Scripture leaves the choice to each believer&apos;s own conscience.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the goose, the lantern, even the slight shine a loving biographer puts on his hero, and one decision still stands underneath everything else.</p>
          <p>
            📌 <strong>A freezing man needed a coat. A soldier had exactly one. He did not wait for
            a better moment or a bigger gift. He cut it in half.</strong>
          </p>
          <p>
            Everything else in Martin&apos;s life, the army he left, the bishopric he tried to
            dodge, the shrines he tore down, the way he chose to die, grew out of that same
            instinct: give what is actually yours to give, right now, even when it only covers
            half the need.
          </p>
          <p>
            That instinct is also why his feast day, centuries ago, marked the start of a forty
            day fast leading into Christmas, before the Church shortened it into the four weeks
            of{" "}
            <ArticleLink href="/blog/when-does-advent-begin">Advent you keep today</ArticleLink>.
          </p>
          <p>
            You probably will not meet a beggar at a city gate this week. You will meet someone
            who needs exactly what you already have in your hand. 📌{" "}
            <strong>That is the whole assignment St. Martin&apos;s Day actually leaves you with.</strong>
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="28 October 2026"
        sources={[
          {
            title: "St. Martin of Tours",
            publisher: "John J. a Becket, The Catholic Encyclopedia (1911), New Advent",
            url: "https://www.newadvent.org/cathen/09732b.htm",
            note: "The source for Martin's birth around 316 in Sabaria, his father's rank, the chronology with Hilary of Poitiers, the 371 to 372 election at Tours, his consecration on July 4, and the death date debate between 397 and 400.",
          },
          {
            title: "St. Martin of Tours",
            publisher: "EWTN",
            url: "https://www.ewtn.com/catholicism/saints/martin-of-tours-689",
            note: "The source for the cloak and beggar story at Amiens, the vision of Christ that followed, the confrontation with Emperor Julian, the founding of Ligugé and Marmoutier, the destruction of pagan shrines, the Priscillian affair, and his death at Candes on November 8.",
          },
          {
            title: "Saint of the Day, 11 November: Saint Martin of Tours",
            publisher: "Vatican News",
            url: "https://www.vaticannews.va/en/saints/11/11.print.html",
            note: "The Vatican's own listing confirming November 11 as the day Martin is commemorated, and the title Apostle of Gaul.",
          },
          {
            title: "Mårtensgås (The Legend and History of St. Martin's Goose)",
            publisher: "Nordiska museet (Nordic Museum, Sweden)",
            url: "https://www.nordiskamuseet.se/en/traditions-celebrations/martensgas/",
            note: "The source for the goose shed legend as later folklore, and the documented history of eating goose on St. Martin's Day in medieval and early modern Europe.",
          },
          {
            title: "November 10, 1483",
            publisher: "Stephen Nichols, 5 Minutes in Church History, Ligonier Ministries",
            url: "https://learn.ligonier.org/podcasts/5-minutes-in-church-history-with-stephen-nichols/november-10-1483",
            note: "The source for Martin Luther's birth on November 10, 1483, his baptism the next day, and his name coming from St. Martin's feast day.",
          },
          {
            title: "St. Martin's Day: The Feast That Began the Fast",
            publisher: "Building Catholic Culture",
            url: "https://buildingcatholicculture.com/st-martins-day-the-feast-that-began-the-fast/",
            note: "The source for Bishop Perpetuus of Tours establishing a pre-Christmas fast beginning on St. Martin's feast day, and that period later shortening into the four weeks of Advent.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
