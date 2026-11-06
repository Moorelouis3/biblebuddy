import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-20-explained", {
  title: "Deuteronomy 20 Explained: War, Mercy, and the Law That Spares Trees",
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

export default function DeuteronomyTwentyExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-20-explained"
      title={<>📖 Deuteronomy 20 Explained: War, Mercy, and the Law That Spares Trees</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Horses. Chariots. An army bigger than yours standing across the field.</p>
            <p>
              <strong>Deuteronomy 20 explained</strong> is Moses handing Israel a field manual for
              war before a single battle in the land has happened. Who gets sent home before the
              fighting starts. What offer a distant city gets before Israel ever draws a sword.
              What happens to the nations already living in the land God is giving them. And one
              strange, careful rule about trees in the middle of a siege.
            </p>
            <p>Maybe you have skipped this chapter because war laws feel like the least spiritual part of the Bible.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a priest, not a general, talk to the troops before battle?</li>
            <li>❓ Why does Israel send soldiers home for building a house or planting a vineyard?</li>
            <li>❓ Why do distant cities get an offer of peace, but the nations in the land do not?</li>
            <li>❓ Why does a chapter about killing stop to protect fruit trees?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 20 is not a chapter cheering for war. It is Moses setting hard
              limits on it, before Israel has fought a single battle in Canaan.</strong>
            </p>
            <p>
              Twenty verses, and they cover who fights, who is sent home, who gets offered peace,
              who does not, and what even an army at war is never allowed to destroy.
            </p>
            <p>Read slowly. This is one of the hardest chapters in Deuteronomy, and it deserves an honest look rather than a quick skip.</p>
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
            <ArticleLink href="/blog/deuteronomy-19-explained">Deuteronomy 19</ArticleLink> closed
            the courtroom laws Moses had been building since chapter 16: cities of refuge, two or
            three witnesses, a penalty for lying under oath. That chapter protected Israel from an
            injustice committed by one neighbour against another.
          </p>
          <p>
            Deuteronomy 20 widens the lens from a courtroom to a battlefield. The question is no
            longer how Israel treats a fellow Israelite accused of wrong. It is how Israel, as a
            whole nation, is allowed to treat an enemy once war actually starts.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 20 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Do Not Be Afraid of What You Can See (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with the exact sight that would make any soldier&apos;s stomach drop.</p>
        </div>
        <VerseQuote
          text="When thou goest out to battle against thine enemies, and seest horses, and chariots, and a people more than thou, be not afraid of them: for the LORD thy God is with thee, which brought thee up out of the land of Egypt."
          reference="Deuteronomy 20:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel had no chariot corps. Egypt did, and Israel watched God drown an entire chariot
            army in the sea at the exodus. 📌 <strong>Moses does not tell Israel the enemy army is
            small. He tells them the size of the enemy is not the number that decides the
            battle.</strong>
          </p>
          <p>Then comes a detail easy to miss on a first read.</p>
        </div>
        <VerseQuote
          text="And it shall be, when ye are come nigh unto the battle, that the priest shall approach and speak unto the people, And shall say unto them, Hear, O Israel, ye approach this day unto battle against your enemies: let not your hearts faint, fear not, and do not tremble, neither be ye terrified because of them;"
          reference="Deuteronomy 20:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A priest, not a general, gives the pep talk. Courage in this chapter is not a
            motivational trick. It is a theological claim the priest is responsible to speak
            out loud at the exact moment fear would otherwise win.
          </p>
        </div>
        <VerseQuote
          text="For the LORD your God is he that goeth with you, to fight for you against your enemies, to save you."
          reference="Deuteronomy 20:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel still had to march, still had to swing a sword, still had to stand in the line.
            But the verse is clear about who the chapter credits with the actual victory.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Four Reasons an Officer Sends a Man Home (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before anyone fights, the officers walk the ranks and start pulling men out of it.</p>
        </div>
        <VerseQuote
          text="And the officers shall speak unto the people, saying, What man is there that hath built a new house, and hath not dedicated it? let him go and return to his house, lest he die in the battle, and another man dedicate it."
          reference="Deuteronomy 20:5"
        />
        <VerseQuote
          text="And what man is he that hath planted a vineyard, and hath not yet eaten of it? let him also go and return unto his house, lest he die in the battle, and another man eat of it."
          reference="Deuteronomy 20:6"
        />
        <VerseQuote
          text="And what man is there that hath betrothed a wife, and hath not taken her? let him go and return unto his house, lest he die in the battle, and another man take her."
          reference="Deuteronomy 20:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three men are excused for the same reason stated three different ways:
            each one started something good and has not yet finished it.</strong> A house not yet
            lived in. A vineyard not yet tasted. A wife not yet married. Moses will not send a man
            to die with his life&apos;s work still unfinished behind him while someone else
            inherits it.
          </p>
          <p>The fourth man excused has nothing unfinished at all.</p>
        </div>
        <VerseQuote
          text="And the officers shall speak further unto the people, and they shall say, What man is there that is fearful and fainthearted? let him go and return unto his house, lest his brethren’s heart faint as well as his heart."
          reference="Deuteronomy 20:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the stated reason is not embarrassment for the frightened man. It is
            protection for everyone standing next to him.</strong> Fear spreads through a line of
            soldiers faster than courage does, and Moses treats that as a fact to plan around, not
            a weakness to shame.
          </p>
        </div>
        <VerseQuote
          text="And it shall be, when the officers have made an end of speaking unto the people, that they shall make captains of the armies to lead the people."
          reference="Deuteronomy 20:9"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. An Offer of Peace Before a Single Arrow Flies (verses 10 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the army is sorted, Moses gives the rule for any city outside the land itself.</p>
        </div>
        <VerseQuote text="When thou comest nigh unto a city to fight against it, then proclaim peace unto it." reference="Deuteronomy 20:10" />
        <VerseQuote
          text="And it shall be, if it make thee answer of peace, and open unto thee, then it shall be, that all the people that is found therein shall be tributaries unto thee, and they shall serve thee."
          reference="Deuteronomy 20:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Peace was the first offer, not the fallback. A city that surrendered kept its
            people alive. They became tributaries, paying tax and serving Israel, hard terms, but
            terms that let an entire population go on living.
          </p>
          <p>Moses does not pretend every city would take that offer.</p>
        </div>
        <VerseQuote text="And if it will make no peace with thee, but will make war against thee, then thou shalt besiege it:" reference="Deuteronomy 20:12" />
        <VerseQuote
          text="And when the LORD thy God hath delivered it into thine hands, thou shalt smite every male thereof with the edge of the sword: But the women, and the little ones, and the cattle, and all that is in the city, even all the spoil thereof, shalt thou take unto thyself; and thou shalt eat the spoil of thine enemies, which the LORD thy God hath given thee."
          reference="Deuteronomy 20:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A rejected offer of peace led to a harsh outcome for the men of that city, but women
            and children were spared and taken in rather than destroyed. This is the rule for
            cities <ArticleLink href="/blog/numbers-31-explained">outside Canaan itself</ArticleLink>,
            and Moses states that limit plainly in the very next verse.
          </p>
        </div>
        <VerseQuote
          text="Thus shalt thou do unto all the cities which are very far off from thee, which are not of the cities of these nations."
          reference="Deuteronomy 20:15"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. No Peace Offer for the Nations Already in the Land (verses 16 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verse 15 drew a line. Verse 16 names exactly who stands on the other side of it.</p>
        </div>
        <VerseQuote
          text="But of the cities of these people, which the LORD thy God doth give thee for an inheritance, thou shalt save alive nothing that breatheth:"
          reference="Deuteronomy 20:16"
        />
        <VerseQuote
          text="But thou shalt utterly destroy them; namely, the Hittites, and the Amorites, the Canaanites, and the Perizzites, the Hivites, and the Jebusites; as the LORD thy God hath commanded thee:"
          reference="Deuteronomy 20:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Six named nations, the same group named throughout Deuteronomy, already living inside
            the exact borders of the land God promised to Israel. This command is not aimed at
            distant enemies in some future war. It is aimed at the specific population already
            occupying the inheritance Israel is about to receive.
          </p>
          <p>Verse 18 states the reason, in Moses&apos; own words, before anyone has to guess at it.</p>
        </div>
        <VerseQuote
          text="That they teach you not to do after all their abominations, which they have done unto their gods; so should ye sin against the LORD your God."
          reference="Deuteronomy 20:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The stated reason is religious contamination, not ethnicity.</strong>{" "}
            <ArticleLink href="/blog/deuteronomy-9-explained">Deuteronomy 9</ArticleLink> already
            made the same point from the other direction: Israel was not given this land for its
            own righteousness. Here Moses gives the matching half of that claim. These nations are
            not removed for who they were born. They are removed for what their worship would
            teach Israel to become.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Law That Protects a Tree in the Middle of a Siege (verses 19 and 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After the hardest verses in the chapter, Moses ends with an order almost nobody expects.</p>
        </div>
        <VerseQuote
          text="When thou shalt besiege a city a long time, in making war against it to take it, thou shalt not destroy the trees thereof by forcing an axe against them: for thou mayest eat of them, and thou shalt not cut them down (for the tree of the field is man’s life) to employ them in the siege:"
          reference="Deuteronomy 20:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;The tree of the field is man&apos;s life&quot; is the plainest line in
            the whole chapter.</strong> A fruit tree feeds people for years. Cutting it down for a
            few days of siege ramp gains almost nothing and destroys a food supply that outlasts
            the war itself, for whichever side eventually eats from it.
          </p>
          <p>A second verse draws the line between what is protected and what is not.</p>
        </div>
        <VerseQuote
          text="Only the trees which thou knowest that they be not trees for meat, thou shalt destroy and cut them down; and thou shalt build bulwarks against the city that maketh war with thee, until it be subdued."
          reference="Deuteronomy 20:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A &quot;bulwark&quot; is a siege rampart or earthwork, built from whatever non fruit
            timber was on hand. 📌 <strong>Even at the furthest edge of a chapter about warfare,
            Moses still draws a line between what war requires and what it merely wastes.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 20 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why do distant cities get an offer of peace while the nations already in the
            land get none?</strong> The text draws this line itself in verses 15 and 16. Cities
            &quot;very far off&quot; and &quot;not of the cities of these nations&quot; receive the
            peace offer of verse 10. The six nations named in verse 17, already living inside the
            exact land God promised Israel, are placed under a separate and harsher command. This
            is not Israel choosing harsher treatment for whichever enemy it happens to meet. Moses
            sets two different categories before a single battle has even started.
          </p>
          <p>
            <strong>Is the command in verses 16 and 17 a call for Israel to commit genocide?</strong>{" "}
            What the text says is narrower than that word suggests. The command names six specific
            nations, inside one specific land, tied to one stated reason in verse 18: stopping
            their religious practices from spreading into Israel&apos;s worship. It is not a
            general rule for how Israel is to treat any enemy anywhere, and{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7</ArticleLink> repeats
            the same limited scope. How Christians weigh the command&apos;s severity still varies.
            Some read it as a unique act of judgment on nations whose worship included practices
            Scripture elsewhere calls abominable, carried out at one moment in redemptive history
            that does not repeat. Others point out that Judges 1 records many of these same
            nations still living in the land afterward, which suggests the command&apos;s language
            of total destruction functioned, at least in part, as the kind of sweeping victory
            language common across ancient Near Eastern war accounts, read against a result that
            Scripture itself shows was not literally total. Both views take the text seriously; they
            differ on how literally to press &quot;save alive nothing that breatheth.&quot;
          </p>
          <p>
            <strong>Does Deuteronomy 20 contradict Jesus telling His followers to love their
            enemies?</strong> Jesus teaches personal enemy love in the Sermon on the Mount, one
            person&apos;s response to someone who wrongs them directly. Deuteronomy 20 is a
            national war code for a covenant people living under a government God Himself was
            directing at a specific moment in history. A command about how an ancient nation
            conducted war under direct divine instruction is not the same kind of statement as an
            instruction for how an individual treats a personal enemy today, and the New Testament
            never applies this chapter as a pattern for Christian behavior now.
          </p>
          <p>
            <strong>Why protect fruit trees in verse 19 while commanding the destruction of whole
            cities in verse 16?</strong> The two commands are not weighed against each other by the
            same scale. The command regarding the six nations is about ending a specific religious
            threat to Israel&apos;s covenant. The fruit tree law is about what any war, against
            anyone, actually needs to accomplish its goal. Even a chapter willing to command the
            harshest outcome for one specific enemy still refuses to let Israel destroy something
            with no military purpose at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 20:4</h3>
        <VerseQuote
          text="For the LORD your God is he that goeth with you, to fight for you against your enemies, to save you."
          reference="Deuteronomy 20:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A priest spoke this line to soldiers staring at a bigger army than their own. It names
          who the chapter actually credits with the victory before a single sword is drawn.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 20:1</h3>
        <VerseQuote
          text="When thou goest out to battle against thine enemies, and seest horses, and chariots, and a people more than thou, be not afraid of them: for the LORD thy God is with thee, which brought thee up out of the land of Egypt."
          reference="Deuteronomy 20:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Fear in this verse is tied to what the eyes can count: horses, chariots, numbers. The
          command not to fear is tied to something the eyes cannot count at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 20:8</h3>
        <VerseQuote
          text="And the officers shall speak further unto the people, and they shall say, What man is there that is fearful and fainthearted? let him go and return unto his house, lest his brethren’s heart faint as well as his heart."
          reference="Deuteronomy 20:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Fear is treated as something that spreads, not something to hide or shame. Moses builds
          an army that protects its own morale rather than pretending everyone is fearless.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 20:10</h3>
        <VerseQuote text="When thou comest nigh unto a city to fight against it, then proclaim peace unto it." reference="Deuteronomy 20:10" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Peace is the opening move, not the last resort tried after everything else fails. A city
          that said yes kept its people alive.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 20:19</h3>
        <VerseQuote
          text="When thou shalt besiege a city a long time, in making war against it to take it, thou shalt not destroy the trees thereof by forcing an axe against them: for thou mayest eat of them, and thou shalt not cut them down (for the tree of the field is man’s life) to employ them in the siege:"
          reference="Deuteronomy 20:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A rule about trees sitting right beside the hardest verses in the chapter. Even here,
          Moses will not let destruction become a habit instead of a last necessity.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 20 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 20 lays out Israel&apos;s rules for war: why soldiers should not fear a
          larger enemy army, which men are excused from fighting, the offer of peace given to
          distant cities, the command against the nations already living in Canaan, and a law
          protecting fruit trees during a siege.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a priest speak to the army instead of a military commander?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 2 and 3 have the priest, not a general, remind the soldiers that the LORD goes
          with them. The chapter treats courage before battle as a matter tied directly to
          Israel&apos;s relationship with God, not only to military strategy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was excused from fighting in Israel&apos;s army?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Four kinds of men: someone with a new house he had not yet dedicated, someone with a new
          vineyard he had not yet eaten from, someone betrothed to a wife he had not yet married,
          and anyone who was fearful or fainthearted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were fearful soldiers sent home instead of made to fight anyway?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 8 gives the stated reason: fear in one man could spread and weaken the resolve of
          the soldiers around him. Sending him home protected the whole army&apos;s courage, not
          just his own comfort.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to a city that accepted Israel&apos;s offer of peace?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 11 says its people became tributaries who served Israel. The terms were not easy,
          but accepting peace kept the entire population alive rather than facing a siege.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the nations already in Canaan treated differently than distant cities?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 16 through 18 state the reason directly: these specific nations would teach Israel
          to copy their religious practices, which Moses calls abominations. The command is tied
          to that specific danger, not to warfare against any enemy in general.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 20 mean God commands genocide?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The command in this chapter names six specific nations in one specific land for one
          stated reason, rather than setting a general rule for how Israel treats any enemy.
          Christians read its severity differently, and Judges 1 shows these same nations still
          living in the land afterward, but the text itself limits the command&apos;s scope rather
          than leaving it open ended.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter protect fruit trees during a siege?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 19 calls a fruit tree &quot;man&apos;s life&quot; because it feeds people for
          years, far longer than the siege itself lasts. Only trees that did not produce food could
          be cut down for building siege works.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does this chapter apply to how nations should fight wars today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 20 was written for Israel under a specific covenant with God at a specific
          point in its history, not as a universal manual for any nation&apos;s army. Christians
          generally read it as describing that particular moment rather than as standing law for
          every war since.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 20 refuses to let war become either cowardice or cruelty without limits.</p>
          <p>
            📌 <strong>Fear gets named out loud instead of hidden.</strong> A priest spoke to an
            army staring down chariots, and officers sent home anyone whose fear could spread to
            the man beside him.
          </p>
          <p>
            📌 <strong>Peace was always offered first.</strong> A distant city that said yes to
            verse 10 kept its people alive. Only a refusal led anywhere near a siege.
          </p>
          <p>
            📌 <strong>Even the hardest command in the chapter is not the whole chapter.</strong>{" "}
            The nations named in verse 17 faced a severe judgment for a stated reason, and the
            very next verses still refuse to let that severity spill over into destroying a fruit
            tree that served no purpose in the fight.
          </p>
          <p>
            You are probably not marching toward a literal battlefield this week. But you do face
            moments that feel like staring at horses and chariots: a diagnosis, a decision, a fight
            you did not pick.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the thing in front of you that looks bigger than you are, and read Deuteronomy
            20:4 over it before you decide how afraid to be.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
