import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-27-explained", {
  title: "Deuteronomy 27 Explained: Stones, an Altar, and Twelve Curses",
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

export default function DeuteronomyTwentySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-27-explained"
      title={<>📖 Deuteronomy 27 Explained: Stones, an Altar, and Twelve Curses</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two mountains face each other across a valley. A whole nation stands between them.</p>
            <p>
              <strong>Deuteronomy 27 explained</strong> is twenty six verses that turn the end of
              Moses&apos;s long law code into something you could actually watch happen. Stones go
              up and get covered in plaster. An altar gets built from rocks no tool has ever
              touched. Six tribes walk to one mountain and six tribes walk to the other. And a list
              of twelve hidden sins gets read out loud, with the whole nation answering the exact
              same word back every single time.
            </p>
            <p>You may have skimmed past this chapter as a strange bridge between two bigger ones.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the law have to be written on stone and plastered over?</li>
            <li>❓ Why does it matter whether an iron tool ever touches the altar?</li>
            <li>❓ Why does this chapter list twelve curses but never write out the blessings?</li>
            <li>❓ What does it mean that the whole nation says &quot;Amen&quot; twelve times in a row?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 27 makes sure the covenant cannot stay private. It gets
              written where anyone can read it, built where anyone can see it, and answered out
              loud by everyone standing there.</strong>
            </p>
            <p>
              Walk through it slowly. The twelve curses near the end of this chapter are aimed at
              exactly the kind of sin a human court could never catch, and that one detail changes
              how the whole list reads.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 What Happened Just Before This Chapter
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/deuteronomy-26-explained">Deuteronomy 26</ArticleLink> closed
            the entire law section that started back in chapter twelve with a basket of firstfruits,
            a spoken history, a tithe declaration, and a covenant Israel and God each stated out loud
            about the other.
          </p>
          <p>
            Deuteronomy 27 does not add a new law. It adds instructions for the exact moment Israel
            crosses into the land: a monument to build, an altar to raise, and a ceremony to carry
            out on two mountains whose names Moses had already used once before, back in chapter
            eleven, long before any of this law had even been given.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 27 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Stones Plastered With Every Word of the Law (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This instruction does not come from Moses alone.</p>
        </div>
        <VerseQuote
          text="And Moses with the elders of Israel commanded the people, saying, Keep all the commandments which I command you this day."
          reference="Deuteronomy 27:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The elders of Israel are named right alongside Moses</strong>, the men who
            will still be leading this nation long after Moses is gone. Then comes the instruction
            itself.
          </p>
        </div>
        <VerseQuote
          text="And it shall be on the day when ye shall pass over Jordan unto the land which the LORD thy God giveth thee, that thou shalt set thee up great stones, and plaister them with plaister: And thou shalt write upon them all the words of this law, when thou art passed over, that thou mayest go in unto the land which the LORD thy God giveth thee, a land that floweth with milk and honey; as the LORD God of thy fathers hath promised thee. Therefore it shall be when ye be gone over Jordan, that ye shall set up these stones, which I command you this day, in mount Ebal, and thou shalt plaister them with plaister."
          reference="Deuteronomy 27:2 to 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Large stones, smoothed over with a plaster surface and then written on, were a common
            way to make an inscription legible and lasting in the ancient Near East. Moses wants
            the words of this law planted in the ground the first day Israel is actually standing
            on the land it describes, not years later once everyone has settled in and moved on to
            other things.
          </p>
          <p>
            ⚠️ <strong>The mountain gets named here too.</strong> Mount Ebal, on the north side of
            the valley near Shechem, is where both the stones and everything else in this chapter
            take place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. An Altar No Iron Tool Ever Touched (verses 5 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Alongside the inscribed stones, Moses commands a second structure on the same mountain.</p>
        </div>
        <VerseQuote
          text="And there shalt thou build an altar unto the LORD thy God, an altar of stones: thou shalt not lift up any iron tool upon them. Thou shalt build the altar of the LORD thy God of whole stones: and thou shalt offer burnt offerings thereon unto the LORD thy God:"
          reference="Deuteronomy 27:5 and 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is not a new idea. Moses had already given the same rule for any altar years
            earlier at Sinai.
          </p>
        </div>
        <VerseQuote
          text="And if thou wilt make me an altar of stone, thou shalt not build it of hewn stone: for if thou lift up thy tool upon it, thou hast polluted it."
          reference="Exodus 20:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Shaping the stone would mean human skill and human effort made this altar
            what it is.</strong> Leaving the stones whole, exactly as the ground produced them,
            keeps the altar entirely God&apos;s own, nothing added by human hands beyond stacking
            what was already there. The same principle Moses gave in{" "}
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink> is still in effect
            forty years later, at the exact moment Israel finally gets to use it.
          </p>
          <p>Once the altar stands, it gets used immediately.</p>
        </div>
        <VerseQuote
          text="And thou shalt offer peace offerings, and shalt eat there, and rejoice before the LORD thy God. And thou shalt write upon the stones all the words of this law very plainly."
          reference="Deuteronomy 27:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Burnt offerings first, nothing kept back from God. Peace offerings second, a shared meal
            Israel actually gets to eat and enjoy. The command to write the law comes a second time
            here, now with one extra word attached: &quot;very plainly.&quot; Moses is not content
            with a technically accurate inscription. He wants it legible enough that no one standing
            in front of it can later claim they could not read what it said.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. &quot;This Day Thou Art Become the People of the LORD&quot; (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A different leadership group joins Moses for the next announcement.</p>
        </div>
        <VerseQuote
          text="And Moses and the priests the Levites spake unto all Israel, saying, Take heed, and hearken, O Israel; this day thou art become the people of the LORD thy God. Thou shalt therefore obey the voice of the LORD thy God, and do his commandments and his statutes, which I command thee this day."
          reference="Deuteronomy 27:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel had already become God&apos;s people a generation earlier, at Sinai. &quot;This
            day&quot; is not claiming the relationship is brand new. It is Deuteronomy&apos;s
            constant refrain throughout the whole book: every generation is told to receive this
            covenant as if it were being offered to them personally, right now, not inherited
            secondhand from parents who heard it first.
          </p>
          <p>
            📌 <strong>Moses speaks with the priests, not alone, because what is being announced
            will outlast him.</strong> He will not cross the Jordan with the people he is giving
            these instructions to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Two Mountains, Twelve Tribes (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses assigns each tribe a side, and he is not introducing these two mountains for the
            first time.
          </p>
        </div>
        <VerseQuote
          text="And it shall come to pass, when the LORD thy God hath brought thee in unto the land whither thou goest to possess it, that thou shalt put the blessing upon mount Gerizim, and the curse upon mount Ebal."
          reference="Deuteronomy 11:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses already matched Gerizim to blessing and Ebal to curse back in{" "}
            <ArticleLink href="/blog/deuteronomy-11-explained">Deuteronomy 11</ArticleLink>, before
            most of the law in between had even been given. Now, right before the people actually
            cross, the assignment gets specific.
          </p>
        </div>
        <VerseQuote
          text="These shall stand upon mount Gerizim to bless the people, when ye are come over Jordan; Simeon, and Levi, and Judah, and Issachar, and Joseph, and Benjamin: And these shall stand upon mount Ebal to curse; Reuben, Gad, and Asher, and Zebulun, Dan, and Naphtali."
          reference="Deuteronomy 27:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            👀 Six tribes on Gerizim, six on Ebal, twelve in all. Joseph is counted as one tribe
            here rather than split into Ephraim and Manasseh, and Levi stands among the twelve
            instead of being set apart from this particular list.
          </p>
          <p>
            ⚠️ <strong>Reuben, Israel&apos;s actual firstborn, stands on the cursing mountain.</strong>{" "}
            Years earlier Reuben had defiled his own father&apos;s bed, the reason his birthright
            quietly passed to Joseph&apos;s sons instead. Levi, by contrast, stands on the mountain
            of blessing. When Israel worshiped a golden calf at the foot of Sinai, it was the sons
            of Levi who gathered to{" "}
            <ArticleLink href="/blog/exodus-32-explained">
              stand on the LORD&apos;s side
            </ArticleLink>{" "}
            while the rest of the camp scattered into sin. Neither placement is explained in the
            text itself, but neither reads like an accident either.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 27 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does this chapter name the blessing mountain but never write out the
            blessings themselves?</strong> The text does not explain the gap, and it deserves an
            honest answer rather than a guess dressed up as certainty. Verse 12 commands a blessing
            from Gerizim exactly as verse 13 commands a curse from Ebal, yet only the curse side
            gets spelled out word for word in this chapter. The matching blessings arrive one
            chapter later, in Deuteronomy 28, where they get a full list of their own. Whatever was
            actually said that day on Gerizim, Moses saves its content for the next chapter rather
            than this one.
          </p>
          <p>
            <strong>What do these twelve curses actually have in common?</strong> Chapters nineteen
            through twenty five of this book built real courtroom procedure: witnesses, judges,
            evidence. This list names the opposite kind of sin, the kind built to escape exactly
            that procedure. A hidden idol, a boundary stone moved at night, a trick played on
            someone who cannot see who tricked him, a case twisted against people with no standing
            to fight back, a sin kept inside a family&apos;s own walls, an attack with no witness, a
            bribe paid quietly. None of these necessarily reaches a human court. 📌 <strong>The
            answer to every one of them is not a human witness. It is the whole nation&apos;s
            &quot;Amen,&quot; and God&apos;s own judgment behind it.</strong>
          </p>
          <p>
            <strong>Did Israel actually carry this ceremony out once they crossed the
            Jordan?</strong> Yes. The book of Joshua records it happening almost exactly as
            commanded here.
          </p>
        </div>
        <VerseQuote
          text="Then Joshua built an altar unto the LORD God of Israel in mount Ebal, As Moses the servant of the LORD commanded the children of Israel, as it is written in the book of the law of Moses, an altar of whole stones, over which no man hath lift up any iron: and they offered thereon burnt offerings unto the LORD, and sacrificed peace offerings."
          reference="Joshua 8:30 and 31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joshua also closes the gap left open by this chapter&apos;s missing blessing text.
          </p>
        </div>
        <VerseQuote
          text="And afterward he read all the words of the law, the blessings and cursings, according to all that is written in the book of the law."
          reference="Joshua 8:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both the blessings and the curses got read that day. Deuteronomy 27 simply never wrote
            down which words those were.
          </p>
          <p>
            <strong>Why would Paul later use a curse formula from this chapter to argue that keeping
            the law cannot make anyone right with God?</strong> That question belongs to the very
            last curse in the chapter, and the walkthrough below sets it up before answering it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Curses, and the Nation That Answers Them
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Curses Target What No Human Court Could Catch (verses 14 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A third leadership group speaks next, and the pattern that follows never changes.</p>
        </div>
        <VerseQuote
          text="And the Levites shall speak, and say unto all the men of Israel with a loud voice, Cursed be the man that maketh any graven or molten image, an abomination unto the LORD, the work of the hands of the craftsman, and putteth it in a secret place. And all the people shall answer and say, Amen."
          reference="Deuteronomy 27:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One Levite line, one answer from everyone present. &quot;Secret place&quot; sets the
            tone for the whole list before a second curse is even spoken.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>⚠️ Cursed is anyone who dishonors a father or a mother (verse 16).</li>
          <li>⚠️ Cursed is anyone who moves a neighbor&apos;s boundary stone (verse 17).</li>
          <li>⚠️ Cursed is anyone who leads a blind traveler the wrong way (verse 18).</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Dishonoring a parent can happen entirely inside a family&apos;s own walls. A boundary
            stone gets moved at night, with no one else in the field to see it. A blind man cannot
            name who misled him even if he wanted to report it. 📌 <strong>Three curses, three
            different ways for a wrong to escape every witness but God.</strong>
          </p>
          <p>The fourth curse in this stretch names people this book keeps returning to.</p>
        </div>
        <VerseQuote text="Cursed be he that perverteth the judgment of the stranger, fatherless, and widow. And all the people shall say, Amen." reference="Deuteronomy 27:19" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A stranger, an orphan, and a widow rarely have the standing to challenge a corrupt
            ruling. 💡 Moses has spent several chapters now building real protection for exactly
            these three groups, and here their protection gets backed by a curse the whole nation
            speaks out loud.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Final Curses, and a Word Paul Would Quote Centuries Later (verses 20 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next four curses move inside the home itself.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>⚠️ Cursed is anyone who sleeps with his father&apos;s wife (verse 20).</li>
          <li>⚠️ Cursed is anyone who sleeps with an animal (verse 21).</li>
          <li>⚠️ Cursed is anyone who sleeps with his sister (verse 22).</li>
          <li>⚠️ Cursed is anyone who sleeps with his mother in law (verse 23).</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every one of these relationships is already forbidden in the detailed list Moses gave
            years earlier in{" "}
            <ArticleLink href="/blog/leviticus-18-explained">Leviticus 18</ArticleLink>. What changes
            here is not the law but the setting: a sin that could stay entirely hidden inside a
            household now has to answer to a curse the whole nation speaks together at the border of
            the land. Then the list turns outward again.
          </p>
        </div>
        <VerseQuote
          text="Cursed be he that smiteth his neighbour secretly. And all the people shall say, Amen. Cursed be he that taketh reward to slay an innocent person. And all the people shall say, Amen."
          reference="Deuteronomy 27:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A secret attack and a paid killing close the specific list, before Moses ends on
            something far broader than any single sin.
          </p>
        </div>
        <VerseQuote text="Cursed be he that confirmeth not all the words of this law to do them. And all the people shall say, Amen." reference="Deuteronomy 27:26" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Eleven specific curses, then one that covers everything the first eleven did
            not already name.</strong> &quot;All the words of this law&quot; leaves no quiet exit
            for anyone who kept most of it. Paul picks up this exact verse more than a thousand
            years later, in an argument about who can actually be made right with God.
          </p>
        </div>
        <VerseQuote
          text="For as many as are of the works of the law are under the curse: for it is written, Cursed is every one that continueth not in all things which are written in the book of the law to do them."
          reference="Galatians 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not inventing a harsh new reading of Deuteronomy 27:26. He is taking it exactly
            as it stands. Anyone trying to be right with God by keeping the law has taken on an
            obligation to keep all of it, and this verse already pronounces a curse on falling
            short of all. Paul&apos;s whole argument in Galatians rests on a fact this chapter
            states plainly thirty centuries earlier: nobody has ever kept all of it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 27:9 and 10</h3>
        <VerseQuote
          text="And Moses and the priests the Levites spake unto all Israel, saying, Take heed, and hearken, O Israel; this day thou art become the people of the LORD thy God. Thou shalt therefore obey the voice of the LORD thy God, and do his commandments and his statutes, which I command thee this day."
          reference="Deuteronomy 27:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses and the priests together tell Israel to receive the covenant as if this were the
          day it was first given, not something inherited secondhand.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 27:12 and 13</h3>
        <VerseQuote
          text="These shall stand upon mount Gerizim to bless the people, when ye are come over Jordan; Simeon, and Levi, and Judah, and Issachar, and Joseph, and Benjamin: And these shall stand upon mount Ebal to curse; Reuben, Gad, and Asher, and Zebulun, Dan, and Naphtali."
          reference="Deuteronomy 27:12 and 13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Twelve tribes split six and six between two mountains, Reuben on the cursing side and
          Levi on the blessing side, neither placement left unexplained by their own history.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 27:15</h3>
        <VerseQuote
          text="Cursed be the man that maketh any graven or molten image, an abomination unto the LORD, the work of the hands of the craftsman, and putteth it in a secret place. And all the people shall answer and say, Amen."
          reference="Deuteronomy 27:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The opening curse sets the pattern for all twelve: a sin named, hidden in a secret place,
          and answered by the whole nation in one word.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 27:19</h3>
        <VerseQuote text="Cursed be he that perverteth the judgment of the stranger, fatherless, and widow. And all the people shall say, Amen." reference="Deuteronomy 27:19" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Protection for the three groups least able to defend themselves in court, backed by a
          curse the entire nation speaks out loud together.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 27:26</h3>
        <VerseQuote text="Cursed be he that confirmeth not all the words of this law to do them. And all the people shall say, Amen." reference="Deuteronomy 27:26" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The broadest curse in the chapter, and the exact verse Paul later quotes to argue that no
          one can be made right with God simply by keeping the law.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 27 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 27 covers Moses&apos;s instructions for the moment Israel crosses the Jordan:
          setting up plastered stones with the law written on them, building an altar of whole
          stones on Mount Ebal, splitting the twelve tribes between two mountains, and the Levites
          reading twelve curses that the whole nation answers with &quot;Amen.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the twelve curses in Deuteronomy 27?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Secret idolatry, dishonoring a parent, moving a boundary stone, misleading a blind
          traveler, perverting justice for the stranger, fatherless, and widow, four forbidden
          relationships inside a family, a secret attack on a neighbor, taking a bribe to kill an
          innocent person, and a final curse on anyone who does not keep the whole law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel have to build an altar on Mount Ebal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The altar had to be made of whole, unshaped stones, with no iron tool ever lifted on
          them, following the exact rule Moses had already given at Sinai in Exodus 20:25. Leaving
          the stones untouched by human skill kept the altar entirely God&apos;s own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between Mount Gerizim and Mount Ebal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The two mountains face each other across a valley near Shechem. Moses assigned Gerizim to
          blessing and Ebal to curse back in Deuteronomy 11, and Deuteronomy 27 carries out that
          same assignment with six tribes standing on each mountain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 27 only list curses and not the blessings?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text never explains the gap. Verse 12 commands a blessing from Gerizim just as verse
          13 commands a curse from Ebal, but only the curse side is written out here. Joshua 8:34
          confirms both the blessings and the curses were actually read aloud once Israel crossed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Israel actually carry out the ceremony in Deuteronomy 27?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Joshua 8:30 to 35 records Joshua building the altar on Mount Ebal exactly as
          commanded, writing the law on the stones, and reading the blessings and the curses to all
          of Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Reuben placed on Mount Ebal, the mountain of cursing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not explain the placement directly, but Reuben had already lost his
          birthright for defiling his father&apos;s bed, while Levi, standing on the blessing
          mountain, had stood with Moses when Israel worshiped a golden calf at Sinai.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;Amen&quot; mean in Deuteronomy 27?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Amen means something close to &quot;let it be so,&quot; a legal and public agreement to
          what was just spoken. Israel had already used the same word as a curse response once
          before, in Numbers 5:22, so Deuteronomy 27 is not its first appearance, only its loudest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Paul quote Deuteronomy 27:26 in Galatians?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul quotes it in Galatians 3:10 to argue that anyone trying to be right with God by
          keeping the law takes on the obligation to keep all of it, and this verse already curses
          anyone who falls short, which is the reason Paul points instead to righteousness by
          faith.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter name the elders and the priests alongside Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses will die before Israel crosses the Jordan. Naming the elders in verse 1 and the
          priests the Levites in verse 9 alongside him shows the whole leadership structure stepping
          forward together, not resting on one man who will not be there to lead it himself.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 27 is a chapter about things that will not stay hidden.</p>
          <p>
            📌 <strong>The covenant gets written in stone, built into an altar, and answered out
            loud, because God never meant it to live only in private conviction.</strong> A law no
            one can see or hear is a law no one can actually be held to.
          </p>
          <p>
            📌 <strong>The twelve curses target what a court could never prove.</strong> A secret
            idol, a moved boundary stone, a sin kept inside a family&apos;s own walls. The obedience
            this chapter actually measures is the kind nobody is watching except God.
          </p>
          <p>
            Here is your one next step from this chapter, not a feeling but something concrete.
          </p>
          <p>
            Name one thing you do differently when you know nobody is watching, and bring it into
            the light before God today, the way these twelve curses already assumed He sees it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
