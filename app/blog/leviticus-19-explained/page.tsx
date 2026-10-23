import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-19-explained", {
  title: "Leviticus 19 Explained: Love Your Neighbor as Yourself",
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

export default function LeviticusNineteenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-19-explained"
      title={<>📖 Leviticus 19 Explained: Love Your Neighbor as Yourself</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Thirty seven verses. No altar. No priest doing anything in this one at all.</p>
            <p>
              <strong>Leviticus 19 explained</strong> is the chapter where holiness stops being
              only about blood on a mercy seat and starts being about how you treat the field
              worker, the deaf man, the blind man, the old woman, and the immigrant living next
              door. One verse in the middle of this chapter gets quoted by Jesus Himself as the
              second greatest commandment in the whole law.
            </p>
            <p>Maybe you have only ever heard that one verse pulled out of this chapter, with no idea what it is sitting next to.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a command about loving your neighbor sit beside a command about mixed fabric?</li>
            <li>❓ Why does the law protect gleanings for the poor by telling farmers what not to harvest?</li>
            <li>❓ Did the man behind Ruth&apos;s field actually keep this exact law?</li>
            <li>❓ And why does the phrase &quot;I am the LORD&quot; show up over and over again, attached to rules this small?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 19 treats honest business, caring for the poor, and leaving
              room for a stranger as every bit as sacred as anything done at the tabernacle
              door.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the holiness command that
              opens it, the harvest law that still shapes how Ruth is read, ten ordinary ways of
              loving a neighbor, the law against mixing two kinds together, a hard case involving
              a bondwoman, patience with a new orchard, boundaries around grief and the occult,
              and the closing command to love the stranger the same way.
            </p>
            <p>Read slowly. You will recognize more of this chapter than you expect.</p>
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
            <ArticleLink href="/blog/leviticus-18-explained">Leviticus 18</ArticleLink> drew one
            line around the most private room in Israelite life, the family, and told Israel not
            to borrow Egypt&apos;s or Canaan&apos;s terms for what happened behind a closed tent
            flap. That chapter closed with a warning that the land itself had already paid a
            price for the practices just listed.
          </p>
          <p>
            Leviticus 19 widens the lens again, past the family and into everything else: the
            field, the marketplace, the courtroom, the dinner table, and the treatment of a
            stranger passing through camp. Where Leviticus 18 spoke almost entirely about the
            body, Leviticus 19 opens by addressing &quot;all the congregation of the children of
            Israel&quot; at once, a wider audience than most single chapters in this book name
            up front.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 19 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Be Holy, Because I Am Holy (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the sentence every rule after it is built to explain.</p>
        </div>
        <VerseQuote
          text="Speak unto all the congregation of the children of Israel, and say unto them, Ye shall be holy: for I the LORD your God am holy."
          reference="Leviticus 19:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a command aimed only at Aaron or the priests. It is spoken to
            the whole congregation, by name.</strong> Everything that follows, farming rules,
            courtroom rules, table manners, haircuts, applies to ordinary Israelites living
            ordinary lives, not only to men serving at an altar.
          </p>
          <p>The very next verse puts parents and the sabbath in the same breath as idols.</p>
        </div>
        <VerseQuote
          text="Ye shall fear every man his mother, and his father, and keep my sabbaths: I am the LORD your God. Turn ye not unto idols, nor make to yourselves molten gods: I am the LORD your God."
          reference="Leviticus 19:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice mother comes first here, ahead of father, the reverse order from the fifth
            of the <ArticleLink href="/blog/exodus-20-explained">Ten Commandments</ArticleLink>.
            Leviticus does not explain why the order flips. What is consistent across both texts
            is that honoring parents and keeping the sabbath are never treated as lesser rules
            than the ban on idols sitting right beside them.
          </p>
          <p>
            The chapter then turns to something very practical: what happens to leftover meat from
            a peace offering.
          </p>
        </div>
        <VerseQuote
          text="It shall be eaten the same day ye offer it, and on the morrow: and if ought remain until the third day, it shall be burnt in the fire. And if it be eaten at all on the third day, it is abominable; it shall not be accepted."
          reference="Leviticus 19:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Eating it a day late was allowed. Eating it two days late carried the same word,
            &quot;abominable,&quot; used elsewhere in Leviticus for far more serious offenses.
            Holiness in this chapter starts small, with something as ordinary as how long meat
            sits before it is eaten.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Harvest You Are Not Allowed to Fully Collect (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From peace offerings, the chapter jumps straight to a farmer&apos;s own field.</p>
        </div>
        <VerseQuote
          text="And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest. And thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God."
          reference="Leviticus 19:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not charity added on top of farming. It is written into farming
            itself, as a limit on how much of the harvest a landowner was ever allowed to call his
            own.</strong> A field owner did not get to decide whether to be generous that year. The
            corners and the leftover grapes already belonged to whoever needed them.
          </p>
          <p>
            <ArticleLink href="/blog/who-was-ruth">Ruth</ArticleLink> is the clearest picture of
            this law working exactly as written, centuries later. A Moabite widow, a
            &quot;stranger&quot; in Israel by this chapter&apos;s own word, gleans in Boaz&apos;s
            field and is not run off for it. The law in front of you right now is the reason that
            scene was legal before it was ever romantic.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Ten Ordinary Ways of Loving Your Neighbor (verses 11 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The list that follows reads almost like a courtroom and marketplace version of the
            Ten Commandments, one short rule after another.
          </p>
        </div>
        <VerseQuote
          text="Ye shall not steal, neither deal falsely, neither lie one to another. And ye shall not swear by my name falsely, neither shalt thou profane the name of thy God: I am the LORD."
          reference="Leviticus 19:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verses 13 and 14 move from lying to two very specific kinds of cruelty.</p>
        </div>
        <VerseQuote
          text="Thou shalt not defraud thy neighbour, neither rob him: the wages of him that is hired shall not abide with thee all night until the morning. Thou shalt not curse the deaf, nor put a stumblingblock before the blind, but shalt fear thy God: I am the LORD."
          reference="Leviticus 19:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A deaf man never hears the curse spoken against him. A blind man never sees the
            stone placed in his path. Both laws target exactly the kind of cruelty that counts on
            the victim never finding out. &quot;I am the LORD&quot; answers that directly: someone
            always sees it.
          </p>
          <p>
            Verse 15 bans favoritism in court toward either the poor or the powerful, and verse 16
            bans gossip and silent complicity, &quot;standing against the blood of thy
            neighbour,&quot; the same phrase used for Abel&apos;s blood crying out back in Genesis
            4. Then the section closes on the verse this chapter is best known for.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt not hate thy brother in thine heart: thou shalt in any wise rebuke thy neighbour, and not suffer sin upon him. Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD."
          reference="Leviticus 19:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Love thy neighbour as thyself&quot; does not stand alone in this
            chapter. It is the last line of a list that starts with not hating your brother in
            your heart.</strong> Hatred, silence, grudges, and revenge are named first, as the
            things love actually has to replace, not as a separate problem from a separate
            chapter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. No Mixing Two Kinds Together, and a Hard Case (verses 19 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The tone shifts abruptly from courtroom ethics to something stranger.</p>
        </div>
        <VerseQuote
          text="Ye shall keep my statutes. Thou shalt not let thy cattle gender with a diverse kind: thou shalt not sow thy field with mingled seed: neither shall a garment mingled of linen and woollen come upon thee."
          reference="Leviticus 19:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Three separate bans, cattle breeding, planting, and clothing, all built around the
            same single idea: keeping distinct kinds distinct. The text states the rule plainly
            and never explains the reasoning behind it in this chapter.
          </p>
          <p>Right after it comes a case the law treats with real care instead of a flat penalty.</p>
        </div>
        <VerseQuote
          text="And whosoever lieth carnally with a woman, that is a bondmaid, betrothed to an husband, and not at all redeemed, nor freedom given her; she shall be scourged; they shall not be put to death, because she was not free."
          reference="Leviticus 19:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The text does not treat her as equally guilty with the man who approached her.
            &quot;Because she was not free&quot; is stated as the reason the full penalty attached
            to adultery elsewhere in this book does not fall on her. The man still owes a trespass
            offering, named in verses 21 and 22, and still needs atonement for what he did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Patience With a New Orchard (verses 23 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From a field and a courtroom, the chapter moves to a newly planted tree.</p>
        </div>
        <VerseQuote
          text="And when ye shall come into the land, and shall have planted all manner of trees for food, then ye shall count the fruit thereof as uncircumcised: three years shall it be as uncircumcised unto you: it shall not be eaten of. But in the fourth year all the fruit thereof shall be holy to praise the LORD withal. And in the fifth year shall ye eat of the fruit thereof, that it may yield unto you the increase thereof: I am the LORD your God."
          reference="Leviticus 19:23 to 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A brand new tree gets three years where nobody, not even its owner, is
            allowed to eat a single piece of its fruit.</strong> The fourth year&apos;s fruit
            belongs entirely to the LORD. Only in the fifth year does the owner finally get to eat
            from a tree he planted five years earlier. Holiness in this chapter even reaches a
            farmer&apos;s own patience.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Boundaries Around Grief, the Body, and the Occult (verses 26 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns next to a cluster of rules about death, mourning, and hidden power.</p>
        </div>
        <VerseQuote
          text="Ye shall not eat any thing with the blood: neither shall ye use enchantment, nor observe times."
          reference="Leviticus 19:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That first line repeats the exact ban{" "}
            <ArticleLink href="/blog/leviticus-17-explained">Leviticus 17</ArticleLink> already
            built an entire chapter around. &quot;Enchantment&quot; and &quot;observe times&quot;
            point toward divination practices, reading omens or lucky and unlucky days, without
            this verse describing exactly what those practices looked like.
          </p>
        </div>
        <VerseQuote
          text="Ye shall not round the corners of your heads, neither shalt thou mar the corners of thy beard. Ye shall not make any cuttings in your flesh for the dead, nor print any marks upon you: I am the LORD."
          reference="Leviticus 19:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Many Bible scholars connect these specific grooming and mourning bans to practices
            documented among Israel&apos;s neighboring nations, cutting the body or shaving
            certain patterns as part of mourning rituals tied to pagan worship of the dead.
            Leviticus 19 itself does not spell out that connection; it simply forbids the
            practices and attaches &quot;I am the LORD&quot; to the ban.
          </p>
          <p>Two more warnings close this stretch, one about a daughter and one about the sanctuary.</p>
        </div>
        <VerseQuote
          text="Do not prostitute thy daughter, to cause her to be a whore; lest the land fall to whoredom, and the land become full of wickedness. Ye shall keep my sabbaths, and reverence my sanctuary: I am the LORD."
          reference="Leviticus 19:29 and 30"
        />
        <VerseQuote
          text="Regard not them that have familiar spirits, neither seek after wizards, to be defiled by them: I am the LORD your God."
          reference="Leviticus 19:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;Familiar spirits&quot; describes a spirit supposedly consulted through a
            medium for guidance, the same practice King Saul later breaks this exact law to use.
            The verse calls seeking one out defilement, not a harmless curiosity.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Honor Age, Love the Stranger, Keep the Scales Honest (verses 32 to 37)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with three more relationships, each stated as plainly as the last.</p>
        </div>
        <VerseQuote
          text="Thou shalt rise up before the hoary head, and honour the face of the old man, and fear thy God: I am the LORD."
          reference="Leviticus 19:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>&quot;Hoary head&quot; means gray hair. Standing up for an older person is written here as an act of fearing God, not simply good manners.</p>
          <p>Then the chapter returns to the stranger, and uses language that echoes verse 18 without repeating it word for word.</p>
        </div>
        <VerseQuote
          text="And if a stranger sojourn with thee in your land, ye shall not vex him. But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God."
          reference="Leviticus 19:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 18 commands love for &quot;thy neighbour.&quot; Verse 34 commands the
            same love, in almost the same words, for a foreigner who has no family claim on you at
            all.</strong> The reason given is Israel&apos;s own memory: they were once strangers
            in Egypt themselves. The word &quot;stranger&quot; appears four times across this
            chapter, in the gleaning law and here again, and both times the command attached to it
            is the same, leave room and show love.
          </p>
          <p>The chapter&apos;s last practical command moves from people to scales.</p>
        </div>
        <VerseQuote
          text="Ye shall do no unrighteousness in judgment, in meteyard, in weight, or in measure. Just balances, just weights, a just ephah, and a just hin, shall ye have: I am the LORD your God, which brought you out of the land of Egypt."
          reference="Leviticus 19:35 and 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 An ephah measured dry goods, a hin measured liquid. A rigged scale in the
            marketplace gets the same weight in this chapter as mistreating a stranger or
            dishonoring a parent. Then one closing sentence sums up all thirty seven verses at
            once.
          </p>
        </div>
        <VerseQuote
          text="Therefore shall ye observe all my statutes, and all my judgments, and do them: I am the LORD."
          reference="Leviticus 19:37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Some version of &quot;I am the LORD&quot; or &quot;I am the LORD your God&quot;
            appears fifteen separate times across this chapter&apos;s thirty seven verses. Nearly
            every rule, however small, gets tied back to the same four words.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 19 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does a chapter about loving your neighbor also forbid mixed fabric and
            cross breeding cattle?</strong> Leviticus 19 never explains its own structure. What can
            be said plainly is that this chapter, like much of the holiness code surrounding it,
            treats moral commands and boundary markers like these as belonging to the same
            category, keeping distinct things distinct, rather than sorting them into separate
            sections the way a modern reader might expect. Scholars genuinely disagree on exactly
            why mixing cattle, seed, and cloth specifically drew a law, and any confident claim
            beyond &quot;the text forbids mixing kinds and does not explain why&quot; goes further
            than Leviticus 19 does.
          </p>
          <p>
            <strong>How does Jesus use Leviticus 19:18?</strong> Directly, and by name, when asked
            which commandment matters most.
          </p>
        </div>
        <VerseQuote
          text="Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself. On these two commandments hang all the law and the prophets."
          reference="Matthew 22:37 to 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jesus calls one line out of thirty seven verses the second greatest
            commandment in the entire law.</strong> Paul later does the same thing, almost word for
            word.
          </p>
        </div>
        <VerseQuote
          text="For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself."
          reference="Galatians 5:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A verse first spoken to farmers, judges, and merchants about honest measures and
            gleaning laws becomes, centuries later, the New Testament&apos;s own summary of the
            entire law.
          </p>
          <p>
            <strong>Was the bondmaid in verses 20 to 22 treated fairly?</strong> The text does not
            moralize about her situation beyond what it states. It records that she was not
            punished with death because she was not free to refuse, a real limit built into the
            penalty, while making the man responsible for a trespass offering. Leviticus 19 is
            regulating a form of bondage already present in Israel&apos;s world, not holding it up
            as an ideal, and the text itself stops short of saying more than that.
          </p>
          <p>
            <strong>Do Christians still have to follow every rule in this chapter?</strong> Most
            Christian traditions separate Israel&apos;s civil and ceremonial laws, tied to its land
            and calendar, from its moral commands, understood as a lasting reflection of
            God&apos;s character. Fabric mixing and new orchard timing fall under the first
            category in how the New Testament treats them. Loving your neighbor, named directly by
            Jesus, Paul, and James, falls under the second, carried forward rather than set aside.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 19
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 19:18</h3>
        <VerseQuote
          text="Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD."
          reference="Leviticus 19:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Centuries before Jesus calls it the second greatest commandment, this verse closes a
          list that opens with not hating your brother in your heart.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 19:2</h3>
        <VerseQuote
          text="Speak unto all the congregation of the children of Israel, and say unto them, Ye shall be holy: for I the LORD your God am holy."
          reference="Leviticus 19:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The thesis statement every other verse in the chapter unpacks, spoken to the whole
          nation, not only to its priests.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 19:9 and 10</h3>
        <VerseQuote
          text="And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest. And thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God."
          reference="Leviticus 19:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The law behind Ruth&apos;s whole story, written into farming itself as a limit on what a
          landowner could ever call entirely his own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 19:34</h3>
        <VerseQuote
          text="But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God."
          reference="Leviticus 19:34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same command as verse 18, extended to someone with no family claim at all, grounded
          in Israel&apos;s own memory of being foreigners in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 19:15</h3>
        <VerseQuote
          text="Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor, nor honor the person of the mighty: but in righteousness shalt thou judge thy neighbour."
          reference="Leviticus 19:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A courtroom instruction that refuses to tilt toward either the poor or the powerful,
          judging the case instead of the person standing in front of it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 19
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 19 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 19 is a wide ranging holiness code covering honoring parents, caring for the
          poor through gleaning laws, honest courts and honest scales, love for both neighbor and
          stranger, and a cluster of bans on mixing, mourning rites, and the occult.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;ye shall be holy for I am holy&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 19:2 ties every rule that follows back to God&apos;s own character. Holiness in
          this chapter is not limited to the tabernacle; it reaches into farming, business, and
          everyday speech.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Bible say to love your neighbor as yourself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in Leviticus 19:18, centuries before Jesus names it the second greatest
          commandment in Matthew 22:39. Paul repeats the same words in Galatians 5:14, and James
          calls it the royal law in James 2:8.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 19 forbid harvesting a whole field?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 9 and 10 require farmers to leave the corners of their fields and the gleanings
          of their vineyards for the poor and the stranger. It was not treated as optional charity
          but as a built in limit on the harvest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Boaz follow this law with Ruth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ruth gleaning in Boaz&apos;s field is this exact law in action. Ruth was a Moabite, a
          &quot;stranger&quot; by Leviticus 19&apos;s own word, and the law already guaranteed her
          the right to gather what the reapers left behind.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Leviticus 19:19 mean about mixed fabric and cattle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse bans crossbreeding cattle, planting mixed seed in one field, and wearing cloth
          woven from both linen and wool. The text states the rule without explaining its own
          reasoning, and scholars genuinely disagree on exactly why these specific combinations
          were singled out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 19:27 say not to cut your beard?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many scholars connect this and the ban on cutting the body for the dead in verse 28 to
          mourning customs practiced by nations around Israel, tied to pagan worship. Leviticus 19
          itself only states the ban and attaches &quot;I am the LORD&quot; to it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a familiar spirit in Leviticus 19:31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a spirit supposedly consulted for guidance through a human medium. The
          verse calls seeking one out defilement, the same practice King Saul later turns to
          against this very law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians still have to follow Leviticus 19 today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions separate this chapter&apos;s civil and ceremonial rules, tied
          to Israel&apos;s land and calendar, from its moral commands. Loving your neighbor is
          reaffirmed directly in the New Testament, while rules like orchard timing and fabric
          mixing are not treated as binding on Christians today.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 19 is the chapter that refuses to separate worship from everyday life.</p>
          <p>
            📌 <strong>Holiness here is not only ritual. It is a dishonest scale, a stolen wage, a
            field harvested too clean, a stranger turned away.</strong> Thirty seven verses, and
            almost none of them happen anywhere near an altar.
          </p>
          <p>
            📌 <strong>&quot;Love thy neighbour as thyself&quot; was never meant to float free of
            its context.</strong> It closes a list that starts with not hating your brother in
            your heart, and it gets repeated for the stranger just sixteen verses later.
          </p>
          <p>
            📌 <strong>Fifteen times in thirty seven verses, the chapter answers its own long list
            of rules the same way: &quot;I am the LORD.&quot;</strong> Big command or small one,
            the authority behind it never changes.
          </p>
          <p>
            You will probably never glean a vineyard or wait three years to eat from a tree you
            planted. But this chapter still asks what you leave for someone who has less, and
            whether your word, your wages, and your scales can be trusted.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Pick one rule from this chapter today, honest wages, honest words, or room left for
            someone in need, and actually keep it before the day is over.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
