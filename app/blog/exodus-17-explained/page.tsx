import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-17-explained", {
  title: "Exodus 17 Explained: Water From the Rock and the Fight With Amalek",
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

export default function ExodusSeventeenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-17-explained"
      title={<>📖 Exodus 17 Explained: Water From the Rock and the Fight With Amalek</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The manna is falling every morning now. The sabbath test is settled. And still, two chapters later, Israel is ready to stone Moses.</p>
            <p>
              <strong>Exodus 17 explained</strong> is the chapter where a new camp at a place called
              Rephidim finds no water at all, and the same people who just watched bread fall from
              the sky are suddenly convinced God has abandoned them to die of thirst. Before that
              crisis is even settled, a second one arrives from outside the camp: a raiding nation
              called Amalek attacks, and Israel has to fight its first war since leaving Egypt.
            </p>
            <p>Maybe you know what it is like for one crisis to barely end before the next one starts.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God call it tempting Him when the thirst was completely real?</li>
            <li>❓ Why does Moses have to strike the same rock with the same rod he used on the Nile?</li>
            <li>❓ Why does Israel win a battle just because Moses keeps his hands in the air?</li>
            <li>❓ And who is Amalek, and why does God want him forgotten forever?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 17 puts two very different threats back to back on purpose: one from
              inside the camp&apos;s own fear, and one from an enemy outside it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the thirst at Rephidim, the
              rock at Horeb, the two names Moses gives that place, Joshua&apos;s first appearance as
              a fighter, the strange detail of two men holding up an old man&apos;s arms, and the
              altar Moses builds once the fighting stops.
            </p>
            <p>Read slowly. This chapter has more to say about where your strength actually comes from than you might expect.</p>
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
            <ArticleLink href="/blog/exodus-16-explained">Exodus 16</ArticleLink> ended with Israel
            settled into a daily rhythm: manna every morning, a double portion on the sixth day, and
            a sabbath rest Israel had already been tested on weeks before the Ten Commandments were
            given. A jar of manna was kept as a witness, and the chapter closed by summarizing all
            forty years of that same bread in a single verse.
          </p>
          <p>
            Exodus 17 opens with the camp still moving, &quot;after their journeys, according to the
            commandment of the LORD,&quot; the same pillar of cloud from{" "}
            <ArticleLink href="/blog/exodus-13-explained">Exodus 13</ArticleLink> still setting the
            pace. Food has been solved. The next stop, a place called Rephidim, turns out to have no
            water at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 17 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. No Water at Rephidim (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens the same way Exodus 16 did: a journey, a camp, and an immediate crisis.</p>
        </div>
        <VerseQuote
          text="And all the congregation of the children of Israel journeyed from the wilderness of Sin, after their journeys, according to the commandment of the LORD, and pitched in Rephidim: and there was no water for the people to drink."
          reference="Exodus 17:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice what the verse does not say. It does not say Israel wandered off course or missed
            a turn. They camped at Rephidim &quot;according to the commandment of the LORD,&quot; and
            the camp God led them to had no water in it. The lack came first. The complaint followed.
          </p>
        </div>
        <VerseQuote
          text="Wherefore the people did chide with Moses, and said, Give us water that we may drink. And Moses said unto them, Why chide ye with me? wherefore do ye tempt the LORD?"
          reference="Exodus 17:2"
        />
        <VerseQuote
          text="And the people thirsted there for water; and the people murmured against Moses, and said, Wherefore is this that thou hast brought us up out of Egypt, to kill us and our children and our cattle with thirst?"
          reference="Exodus 17:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The thirst is real. The accusation underneath it is not.</strong> Moses never
            brought anyone out of Egypt on his own authority, and the text has already shown exactly
            whose idea this journey was. A genuine physical need and an unfair accusation are sitting
            in the very same sentence here.
          </p>
          <p>
            💡 <strong>Chide</strong> and <strong>tempt</strong> are doing specific work in verse 2.
            Chiding is a legal word, closer to lodging a formal complaint than losing one&apos;s
            temper. Tempting the LORD means testing whether He can be trusted, demanding proof on the
            spot instead of simply asking and waiting. Moses hears the second thing hiding inside the
            first.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Moses Cries Out, and God Sends Him to a Rock (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses does not defend himself to the crowd. He takes the danger straight to God, in blunt
            terms.
          </p>
        </div>
        <VerseQuote
          text="And Moses cried unto the LORD, saying, What shall I do unto this people? they be almost ready to stone me."
          reference="Exodus 17:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is not a minor grumble. <ArticleLink href="/blog/moses">Moses</ArticleLink> names
            stoning, the actual physical danger he believes he is in, and he names it to God rather
            than to the crowd threatening him.
          </p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Go on before the people, and take with thee of the elders of Israel; and thy rod, wherewith thou smotest the river, take in thine hand, and go."
          reference="Exodus 17:5"
        />
        <VerseQuote
          text="Behold, I will stand before thee there upon the rock in Horeb; and thou shalt smite the rock, and there shall come water out of it, that the people may drink. And Moses did so in the sight of the elders of Israel."
          reference="Exodus 17:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God tells Moses to bring the exact rod that turned the Nile to blood back in
            Egypt, and point it at a rock instead of a river this time.</strong> The same tool that
            once announced judgment on Egypt&apos;s water now produces life out of a dry rock for
            Israel. And God says something easy to miss in the middle of the instruction:{" "}
            <strong>I will stand before thee there upon the rock.</strong> Moses does the striking.
            God supplies the standing.
          </p>
          <p>
            Elders are specifically named as witnesses. Whatever happens at that rock, it does not
            happen in private where Moses could be accused of staging it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Two Names for One Place (verse 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the chapter moves on, it stops to name what just happened.</p>
        </div>
        <VerseQuote
          text="And he called the name of the place Massah, and Meribah, because of the chiding of the children of Israel, and because they tempted the LORD, saying, Is the LORD among us, or not?"
          reference="Exodus 17:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Massah</strong> means temptation or testing. <strong>Meribah</strong> means
            strife or quarrel. One place, two names, because both things happened there at once: a
            test of whether God could be trusted, and a quarrel that never needed to happen.
          </p>
          <p>
            💡 The question underneath the whole chapter gets spoken out loud here: <strong>Is the
            LORD among us, or not?</strong> Not long after a sea split and bread started falling from
            the sky, Israel is still asking the most basic question about whether God is actually
            present with them. Centuries later, a psalm warns a whole new generation not to harden
            their hearts the way Israel did at this exact place, and the writer of Hebrews quotes that
            same warning word for word for an early church still tempted to do the same thing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Amalek Attacks, and Joshua Steps Forward (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Water is barely solved before a second, very different crisis arrives, this one from outside the camp.</p>
        </div>
        <VerseQuote
          text="Then came Amalek, and fought with Israel in Rephidim."
          reference="Exodus 17:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Amalek was a nation descended from Esau&apos;s grandson, living in the region Israel was
            now passing through. Unlike the thirst in verses 1 to 3, this threat did not come from
            Israel misreading its own circumstances. It came from a real enemy choosing to attack a
            traveling people, including the weak and the stragglers, a detail Scripture remembers
            about this exact raid for generations afterward.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto Joshua, Choose us out men, and go out, fight with Amalek: to morrow I will stand on the top of the hill with the rod of God in mine hand."
          reference="Exodus 17:9"
        />
        <VerseQuote
          text="So Joshua did as Moses had said to him, and fought with Amalek: and Moses, Aaron, and Hur went up to the top of the hill."
          reference="Exodus 17:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time Joshua is named in the entire Bible, and he is already
            leading Israel into battle.</strong> The man who will one day lead Israel into Canaan
            itself makes his debut here, chosen by Moses to fight while Moses himself goes up a hill
            instead of into the field.
          </p>
          <p>
            Hur appears for the first time as well, named alongside Aaron with no introduction at
            all, simply standing beside Moses when it matters.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Hands Held Up, All Day Long (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>What happens on the hill turns out to matter just as much as what happens on the field.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when Moses held up his hand, that Israel prevailed: and when he let down his hand, Amalek prevailed."
          reference="Exodus 17:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The text never says Moses&apos; hand carries any power of its own.</strong> It
            is holding the rod of God, the same rod already used on the Nile and the rock in this
            same chapter, a visible sign that the battle below is being won by the LORD, not by
            Israel&apos;s own strength, every time that hand goes up.
          </p>
        </div>
        <VerseQuote
          text="But Moses' hands were heavy; and they took a stone, and put it under him, and he sat thereon; and Aaron and Hur stayed up his hands, the one on the one side, and the other on the other side; and his hands were steady until the going down of the sun."
          reference="Exodus 17:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses gets tired. His arms get heavy, exactly the way anyone&apos;s would.</strong>{" "}
            Scripture does not smooth that detail over to make him look superhuman. What wins the day
            is not Moses alone. It is Moses sitting on a stone with two other men holding his arms up
            until the sun goes down.
          </p>
        </div>
        <VerseQuote
          text="And Joshua discomfited Amalek and his people with the edge of the sword."
          reference="Exodus 17:13"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Memorial, and an Altar Called &quot;The LORD Is My Banner&quot; (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the fighting stops, God tells Moses to make sure this day is never forgotten.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Write this for a memorial in a book, and rehearse it in the ears of Joshua: for I will utterly put out the remembrance of Amalek from under heaven."
          reference="Exodus 17:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is one of the first times Scripture explicitly says a specific event is being
            written down as it happens, and spoken directly into Joshua&apos;s ears, the same man who
            just led the fight and who will one day lead Israel without Moses at all.
          </p>
        </div>
        <VerseQuote
          text="And Moses built an altar, and called the name of it Jehovahnissi:"
          reference="Exodus 17:15"
        />
        <VerseQuote
          text="For he said, Because the LORD hath sworn that the LORD will have war with Amalek from generation to generation."
          reference="Exodus 17:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Jehovahnissi</strong> means &quot;the LORD is my banner,&quot; one of the{" "}
            <ArticleLink href="/blog/names-of-god-meanings">names of God</ArticleLink> that Scripture
            builds directly out of a specific event rather than an abstract title. A banner marked who
            an army belonged to and rallied them around it. Moses names the altar after exactly what
            the hill full of raised hands had just proven: whose side this victory actually came from.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 17 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>If Israel was genuinely thirsty, why does God call it tempting Him rather than a
            fair complaint?</strong> The text does not treat the thirst as imaginary. It treats the
            way Israel brought it as the problem. Verse 2 and 3 show them accusing Moses of trying to
            kill them, demanding proof God was with them rather than simply crying out and waiting, a
            pattern already seen at the Red Sea and at Marah. A real need expressed as an accusation
            is still an accusation.
          </p>
          <p>
            <strong>Is this the same rock striking incident as the one in Numbers 20?</strong> No.
            Numbers 20 happens decades later, near the end of the wilderness years, at a different
            location called Kadesh, and it is there that Moses is punished, not for striking a rock,
            but for striking it in anger and taking credit he and Aaron had not been given. Exodus 17
            happens early in the journey at Horeb, and Moses here does exactly what God tells him to
            do, in the sight of the elders, with no rebuke attached to it.
          </p>
          <p>
            <strong>Did Moses&apos; raised hands have power on their own?</strong> The text never says
            so. What it names repeatedly is the rod of God in that hand, the same rod already
            connected to two other miracles in this same chapter. Most careful readers take the
            raised hands as a visible sign tying the battle&apos;s outcome to dependence on the LORD,
            not as a magic gesture that worked by itself.
          </p>
          <p>
            <strong>Why does God command that Amalek be remembered for destruction forever?</strong>{" "}
            Deuteronomy later explains what made this attack different from ordinary warfare: Amalek
            struck the weary and the straggling at the back of a traveling people who posed no threat
            to them, and did it &quot;when thou wast faint and weary,&quot; without fear of God.
            Scripture treats this as a case of commanded judgment on a specific nation for a specific,
            named act of cruelty, carried out generations later under Saul, not a template Scripture
            applies broadly elsewhere.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 17
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 17:6</h3>
        <VerseQuote
          text="Behold, I will stand before thee there upon the rock in Horeb; and thou shalt smite the rock, and there shall come water out of it, that the people may drink."
          reference="Exodus 17:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God does not just send Moses to a rock. He says He will already be standing on it. Moses
          supplies the striking; God had already supplied Himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 17:11 and 12</h3>
        <VerseQuote
          text="And it came to pass, when Moses held up his hand, that Israel prevailed: and when he let down his hand, Amalek prevailed. But Moses' hands were heavy; and they took a stone, and put it under him, and he sat thereon; and Aaron and Hur stayed up his hands."
          reference="Exodus 17:11 and 12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest picture in the chapter of victory depending on something other than muscle on
          the battlefield, and of one tired man needing two other people to keep going.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 17:15 and 16</h3>
        <VerseQuote
          text="And Moses built an altar, and called the name of it Jehovahnissi: For he said, Because the LORD hath sworn that the LORD will have war with Amalek from generation to generation."
          reference="Exodus 17:15 and 16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          &quot;The LORD is my banner,&quot; built out of a real afternoon on a real hill, not an
          abstract title invented in a classroom.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 25:17 and 18</h3>
        <VerseQuote
          text="Remember what Amalek did unto thee by the way, when ye were come forth out of Egypt; How he met thee by the way, and smote the hindmost of thee, even all that were feeble behind thee, when thou wast faint and weary; and he feared not God."
          reference="Deuteronomy 25:17 and 18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Decades later, Scripture still remembers the exact shape of this attack: not a fair fight,
          but a strike against the weary and the weak at the back of the line.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Hebrews 3:8 and 9</h3>
        <VerseQuote
          text="Harden not your hearts, as in the provocation, in the day of temptation in the wilderness: When your fathers tempted me, proved me, and saw my works forty years."
          reference="Hebrews 3:8 and 9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Centuries after Massah and Meribah, a New Testament writer still points straight back at
          this one afternoon of thirst and doubt as a warning worth repeating.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 17
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 17?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel camps at Rephidim and finds no water, so the people accuse Moses of bringing them
          out of Egypt to die. God tells Moses to strike a rock at Horeb, and water comes out for
          the whole camp. Moses names the place Massah and Meribah. Amalek then attacks Israel at the
          same location, and Israel wins the battle while Moses holds up his hands on a nearby hill
          with Aaron and Hur supporting his arms, after which Moses builds an altar called
          Jehovahnissi.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God tell Moses to strike the rock instead of just speaking to it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:5 and 6 record the command exactly as given: bring the rod already used on the
          Nile, and strike the rock with it. Scripture does not explain why this miracle took that
          specific physical form rather than a spoken word, only that Moses did precisely what he
          was told, with elders watching.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do Massah and Meribah mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:7 names both meanings directly: Massah means temptation or testing, and Meribah
          means strife or quarrel. The verse ties both names to the same event, Israel testing
          whether the LORD was really present among them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this the same place where Moses later struck the rock and was punished?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Numbers 20 records a separate incident, decades later, at a different location called
          Kadesh, where Moses struck a rock in anger and took credit that belonged to God alone.
          Exodus 17 happens early in the wilderness journey at Horeb, and Moses follows God&apos;s
          instructions exactly, with no judgment pronounced on him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Amalek in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Amalek was a nation descended from Esau&apos;s grandson of the same name, living in the
          region Israel was passing through. Deuteronomy 25:17 and 18 remember this specific attack
          as a strike against the weak and weary stragglers at the back of Israel&apos;s camp, which
          shaped how Scripture treats this nation afterward.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel win the battle only while Moses&apos; hands were up?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:11 states the pattern plainly without explaining the mechanism. The rod of God
          was in that raised hand, the same rod already tied to two other miracles earlier in this
          chapter, which most readers take as a visible sign that the victory depended on the LORD
          rather than on Israel&apos;s own fighting strength.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Aaron and Hur have to hold up Moses&apos; arms?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:12 says Moses&apos; hands grew heavy from holding the position, an ordinary
          physical limit for a man likely in his eighties by this point in the story. Two other men
          stepping in to keep his arms raised let the sign continue past the point his own strength
          could sustain it alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Joshua before he led Israel into Canaan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:9 and 10 mark his first appearance in Scripture, chosen by Moses to lead men into
          battle against Amalek. The man who would one day succeed Moses and lead the conquest of
          Canaan is introduced here simply as a soldier following orders in his first recorded fight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Jehovahnissi mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 17:15 names the altar Moses built Jehovahnissi, meaning &quot;the LORD is my
          banner.&quot; A banner marked which side a soldier belonged to in battle, and Moses names
          the altar after exactly what the hour on the hill had just proven about whose victory it
          really was.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 17 connect to the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 3:8 and 9 quotes a warning from Psalm 95 that points directly back at Massah,
          urging believers not to harden their hearts the way that generation did when they tempted
          God over real but temporary hardship in the wilderness.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 17 puts a real need and a real enemy back to back, and answers both the same way: not with Israel&apos;s own strength, but with what God was already standing on before anyone asked.</p>
          <p>
            📌 <strong>A genuine need can still be expressed as an unfair accusation.</strong> Israel
            was truly thirsty. The charge that Moses was trying to kill them was not true at all.
            Both things sat in the same breath.
          </p>
          <p>
            📌 <strong>Visible dependence wins what raw effort cannot.</strong> Joshua fought with a
            sword. The battle still turned on a tired man&apos;s raised hands, held up by two other
            people when his own strength ran out.
          </p>
          <p>
            📌 <strong>What God does gets named, written down, and remembered on purpose.</strong>{" "}
            Massah and Meribah, the memorial book, Jehovahnissi: this chapter refuses to let a hard
            day pass without marking exactly what happened in it.
          </p>
          <p>So here is one thing to actually do with this chapter.</p>
          <p>
            Think of the last time you asked, even quietly, &quot;Is the LORD among us, or not.&quot;
            Name what He actually did the last time you asked that, the way Moses named a rock and an
            altar, instead of letting the question go unanswered again.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
