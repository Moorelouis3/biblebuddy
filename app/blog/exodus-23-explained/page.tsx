import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-23-explained", {
  title: "Exodus 23 Explained: Justice, Rest, and the Three Feasts",
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

export default function ExodusTwentyThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-23-explained"
      title={<>📖 Exodus 23 Explained: Justice, Rest, and the Three Feasts</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Stolen oxen and gored servants are done. This chapter asks a quieter question instead.</p>
            <p>
              <strong>Exodus 23 explained</strong> is the chapter where the case law softens into
              something closer to a way of life: how to testify honestly, how to treat an enemy&apos;s
              struggling animal, when to let the land itself rest, and which three feasts mark the whole
              year. Then, in its last third, the subject shifts entirely to the land Israel has not even
              reached yet.
            </p>
            <p>Maybe you have never noticed how much of this chapter is about people you do not like.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God command kindness to your enemy&apos;s ox, centuries before Jesus says love your enemies?</li>
            <li>❓ Why does the law warn against favoring a poor man in court, right next to warning against crushing him?</li>
            <li>❓ Who is the &quot;Angel&quot; God says He is sending ahead of Israel, with His own name in him?</li>
            <li>❓ And why does one line about a young goat and its mother&apos;s milk still shape kosher kitchens today?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 23 keeps circling back to one test: does your life actually look different
              toward the people and the land you have no obligation to be kind to?</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: honesty in court, mercy toward an
              enemy&apos;s animal, the sabbath given to both land and people, the three annual feasts, the
              rules around sacrifice, and the long closing promise about the Angel who leads Israel into a
              land still full of nations that do not yet know they are leaving.
            </p>
            <p>This chapter asks more of your ordinary Tuesday than it does of your Sunday.</p>
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
            <ArticleLink href="/blog/exodus-22-explained">Exodus 22</ArticleLink> closed Israel&apos;s
            case law on property and people with its most personal turn yet: God naming Himself the one
            who hears the cry of the stranger, the widow, and the poor when no human court will. The
            chapter ended on firstfruits, firstborn animals, and a people told plainly to be holy, down to
            what they put on their plates.
          </p>
          <p>
            Exodus 23 keeps the same voice speaking to Moses on the same mountain, but the subject moves
            from settling disputes after the fact to shaping honesty and rest before any dispute starts.
            By the chapter&apos;s second half, the camera pulls back even further, from Israel&apos;s own
            camp to the land of Canaan itself, a land none of them have set foot in yet.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 23 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Honesty in Court, From Both Directions (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens back in the courtroom, picking up exactly where the case law in Exodus 21 and 22 assumed judges would be listening.</p>
        </div>
        <VerseQuote
          text="Thou shalt not raise a false report: put not thine hand with the wicked to be an unrighteous witness."
          reference="Exodus 23:1"
        />
        <VerseQuote
          text="Thou shalt not follow a multitude to do evil; neither shalt thou speak in a cause to decline after many to wrest judgment:"
          reference="Exodus 23:2"
        />
        <VerseQuote text="Neither shalt thou countenance a poor man in his cause." reference="Exodus 23:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Verse 2 names a specific kind of lying: going along with a crowd.</strong> A false
            report does not need a single liar behind it. It only needs enough people agreeing on the
            wrong version of events, and one more witness willing to decline after the many rather than
            say what actually happened.
          </p>
          <p>
            📌 <strong>Verse 3 sounds almost backward at first read.</strong> Why would the law warn
            against favoring a poor man? Because justice this chapter describes is not supposed to bend
            toward wealth or toward poverty. A judge who pities a poor man into a verdict he did not earn
            has broken the same rule as a judge who bows to a rich man&apos;s pressure. The law wants the
            facts of the case weighed, not the social standing of whoever is standing in front of the
            judge.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Your Enemy&apos;s Ox (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From the courtroom, the law turns to a situation no court would ever hear about, because nobody is forcing the choice.</p>
        </div>
        <VerseQuote
          text="If thou meet thine enemy’s ox or his ass going astray, thou shalt surely bring it back to him again."
          reference="Exodus 23:4"
        />
        <VerseQuote
          text="If thou see the ass of him that hateth thee lying under his burden, and wouldest forbear to help him, thou shalt surely help with him."
          reference="Exodus 23:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Nobody is watching either of these moments happen.</strong> A stray animal could
            simply be ignored. A struggling animal under a heavy load could be walked past without a word
            said to anyone. The law names the exact temptation, &quot;wouldest forbear to help him,&quot;
            and commands the opposite anyway.
          </p>
          <p>
            📌 <strong>This is centuries before Jesus tells His listeners to love their enemies.</strong>{" "}
            Exodus 23 already assumes an Israelite will have people who hate him, and already requires
            concrete, physical kindness toward their property anyway. The command is not about feelings.
            It is about what your hands do with an enemy&apos;s struggling animal when no one is around to
            make you.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. No Bribes, No Oppressing the Stranger (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law returns to the courtroom, now from the opposite angle of verse 3.</p>
        </div>
        <VerseQuote text="Thou shalt not wrest the judgment of thy poor in his cause." reference="Exodus 23:6" />
        <VerseQuote
          text="Keep thee far from a false matter; and the innocent and righteous slay thou not: for I will not justify the wicked."
          reference="Exodus 23:7"
        />
        <VerseQuote
          text="And thou shalt take no gift: for the gift blindeth the wise, and perverteth the words of the righteous."
          reference="Exodus 23:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verses 3 and 6 are the same warning aimed at two different failures.</strong> A
            judge can tilt toward a poor man out of sympathy, or tilt against him because he has no money
            or standing to push back. Either way the verdict stopped being about what actually happened.
            Verse 8 names the more familiar version of that same failure: a gift, a bribe, dulling even a
            wise judge&apos;s ability to see clearly.
          </p>
          <p>Then the warning widens to someone with even less standing in court than a poor Israelite.</p>
        </div>
        <VerseQuote
          text="Also thou shalt not oppress a stranger: for ye know the heart of a stranger, seeing ye were strangers in the land of Egypt."
          reference="Exodus 23:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the same reasoning <ArticleLink href="/blog/exodus-22-explained">Exodus 22</ArticleLink>{" "}
            already used for the stranger: Israel knows exactly what that treatment feels like, so the law
            will not let the memory of Egypt fade into indifference toward the next foreigner standing in
            their own courts.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Sabbath for the Land, and a Sabbath for Everyone in the House (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From courtroom honesty, the law moves to a rhythm built into the calendar itself.</p>
        </div>
        <VerseQuote text="And six years thou shalt sow thy land, and shalt gather in the fruits thereof:" reference="Exodus 23:10" />
        <VerseQuote
          text="But the seventh year thou shalt let it rest and lie still; that the poor of thy people may eat: and what they leave the beasts of the field shall eat. In like manner thou shalt deal with thy vineyard, and with thy oliveyard."
          reference="Exodus 23:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The land itself gets a sabbath, and the point of that rest is named plainly: so the
            poor can eat.</strong> Whatever grows on its own in the seventh year is not the landowner&apos;s
            harvest to collect. It belongs first to the poor, then to whatever animals are left to graze
            it. Rest here is not only about the soil recovering. It is a built in year of provision for
            people who own no land of their own.
          </p>
          <p>The same rhythm then drops from years down to a single week.</p>
        </div>
        <VerseQuote
          text="Six days thou shalt do thy work, and on the seventh day thou shalt rest: that thine ox and thine ass may rest, and the son of thy handmaid, and the stranger, may be refreshed."
          reference="Exodus 23:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same weekly sabbath{" "}
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink> already commanded, stated
            again here with its reason spelled out even more plainly: rest for the ox, rest for the
            donkey, rest for a slave&apos;s own son, rest for the stranger living among them. The person
            with the least power in the household gets named by the same word, &quot;refreshed,&quot; as
            the animals doing the household&apos;s heaviest labor.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. No Other Gods Named, Three Feasts a Year (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short warning bridges the sabbath laws into the calendar of worship that follows.</p>
        </div>
        <VerseQuote
          text="And in all things that I have said unto you be circumspect: and make no mention of the name of other gods, neither let it be heard out of thy mouth."
          reference="Exodus 23:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Not even casual reference to another god&apos;s name is allowed, let alone worship of one.
            That warning sets up everything that follows: three feasts, all aimed at the LORD, and no
            one else.
          </p>
        </div>
        <VerseQuote text="Three times thou shalt keep a feast unto me in the year." reference="Exodus 23:14" />
        <VerseQuote
          text="Thou shalt keep the feast of unleavened bread: (thou shalt eat unleavened bread seven days, as I commanded thee, in the time appointed of the month Abib; for in it thou camest out from Egypt: and none shall appear before me empty:)"
          reference="Exodus 23:15"
        />
        <VerseQuote
          text="And the feast of harvest, the firstfruits of thy labours, which thou hast sown in the field: and the feast of ingathering, which is in the end of the year, when thou hast gathered in thy labours out of the field."
          reference="Exodus 23:16"
        />
        <VerseQuote text="Three times in the year all thy males shall appear before the LORD God." reference="Exodus 23:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Each of the three feasts marks a different point in the farming year, and each one
            points back to something God already did.</strong> The feast of unleavened bread falls in
            early spring and remembers the rushed, leaven free exit from{" "}
            <ArticleLink href="/blog/exodus-12-explained">Egypt on the night of the Passover</ArticleLink>.
            The feast of harvest comes at the end of the spring grain harvest, later called the feast of
            weeks. The feast of ingathering falls in autumn, at the end of the whole growing year, later
            called the feast of tabernacles. None of the three is invented for its own sake. Every one of
            them ties worship to a season Israel was already living through.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Sacrifice Rules, and the Kid in Its Mother&apos;s Milk (verses 18 and 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two short, specific rules close out the section on worship.</p>
        </div>
        <VerseQuote
          text="Thou shalt not offer the blood of my sacrifice with leavened bread; neither shall the fat of my sacrifice remain until the morning."
          reference="Exodus 23:18"
        />
        <VerseQuote
          text="The first of the firstfruits of thy land thou shalt bring into the house of the LORD thy God. Thou shalt not seethe a kid in his mother’s milk."
          reference="Exodus 23:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 18 protects the Passover sacrifice specifically, the same meal{" "}
            <ArticleLink href="/blog/exodus-12-explained">Exodus 12</ArticleLink> already instructed
            Israel to eat with unleavened bread and nothing left over until morning. Leaven and delay both
            had no place in that one meal.
          </p>
          <p>
            📌 <strong>The last line of verse 19 is one sentence, and an entire branch of later Jewish
            dietary law grows out of it.</strong> &quot;Thou shalt not seethe a kid in his mother&apos;s
            milk&quot; forbids cooking a young goat in the milk of its own mother. Jewish tradition later
            widened this single command into the broader practice of keeping meat and dairy separate at
            every meal, not just this one dish.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Angel Who Goes Before Them, and the Nations Still in the Land (verses 20 to 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter&apos;s final third turns forward, past Sinai entirely, to the land Israel has not yet walked into.</p>
        </div>
        <VerseQuote
          text="Behold, I send an Angel before thee, to keep thee in the way, and to bring thee into the place which I have prepared."
          reference="Exodus 23:20"
        />
        <VerseQuote
          text="Beware of him, and obey his voice, provoke him not; for he will not pardon your transgressions: for my name is in him."
          reference="Exodus 23:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;My name is in him&quot; is a striking thing to say about a created
            messenger.</strong> This Angel is not told to pardon on his own authority, and he is not
            treated as an ordinary envoy either. Because of that language, many Bible teachers read this
            Angel as carrying God&apos;s own authority in a direct, personal way, the same kind of
            appearance Scripture elsewhere calls the Angel of the LORD.
          </p>
        </div>
        <VerseQuote
          text="But if thou shalt indeed obey his voice, and do all that I speak; then I will be an enemy unto thine enemies, and an adversary unto thine adversaries."
          reference="Exodus 23:22"
        />
        <VerseQuote
          text="For mine Angel shall go before thee, and bring thee in unto the Amorites, and the Hittites, and the Perizzites, and the Canaanites, the Hivites, and the Jebusites: and I will cut them off."
          reference="Exodus 23:23"
        />
        <VerseQuote
          text="Thou shalt not bow down to their gods, nor serve them, nor do after their works: but thou shalt utterly overthrow them, and quite break down their images."
          reference="Exodus 23:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Six nations are named by name, long before Israel has fought a single battle
            against any of them.</strong> The warning against their gods is not abstract. Israel is about
            to live surrounded by people whose worship looked nothing like what this chapter just spent
            nineteen verses describing.
          </p>
        </div>
        <VerseQuote
          text="And ye shall serve the LORD your God, and he shall bless thy bread, and thy water; and I will take sickness away from the midst of thee."
          reference="Exodus 23:25"
        />
        <VerseQuote text="There shall nothing cast their young, nor be barren, in thy land: the number of thy days I will fulfil." reference="Exodus 23:26" />
        <VerseQuote
          text="I will send my fear before thee, and will destroy all the people to whom thou shalt come, and I will make all thine enemies turn their backs unto thee."
          reference="Exodus 23:27"
        />
        <VerseQuote
          text="And I will send hornets before thee, which shall drive out the Hivite, the Canaanite, and the Hittite, from before thee."
          reference="Exodus 23:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The hornets in verse 28 have been read two different ways. Some take the word plainly, an
            actual plague of stinging insects sent ahead of Israel&apos;s advance. Others read it as a
            picture of terror and panic spreading through these nations before Israel ever arrives. The
            text itself does not settle which, only that something real and frightening clears the way
            before them.
          </p>
        </div>
        <VerseQuote
          text="I will not drive them out from before thee in one year; lest the land become desolate, and the beast of the field multiply against thee."
          reference="Exodus 23:29"
        />
        <VerseQuote text="By little and little I will drive them out from before thee, until thou be increased, and inherit the land." reference="Exodus 23:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God tells Israel plainly that this will not happen all at once.</strong> A land
            emptied in a single year, before Israel had enough people to farm it or enough flocks to graze
            it, would turn back into wilderness. The slow pace is not a sign the promise is failing. It is
            built into the promise on purpose.
          </p>
        </div>
        <VerseQuote
          text="And I will set thy bounds from the Red sea even unto the sea of the Philistines, and from the desert unto the river: for I will deliver the inhabitants of the land into your hand; and thou shalt drive them out before thee."
          reference="Exodus 23:31"
        />
        <VerseQuote text="Thou shalt make no covenant with them, nor with their gods." reference="Exodus 23:32" />
        <VerseQuote
          text="They shall not dwell in thy land, lest they make thee sin against me: for if thou serve their gods, it will surely be a snare unto thee."
          reference="Exodus 23:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The chapter ends with a warning about a danger that never comes from the outside at
            all.</strong> Israel is not warned that the Canaanites might defeat them in battle. They are
            warned that sharing the land with Canaanite worship will become a snare, something that traps
            quietly rather than attacks openly. That is exactly the failure Israel&apos;s later history in
            Judges keeps running into.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 23 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Who is the Angel God sends before Israel in verses 20 and 21?</strong> The text says
            God&apos;s own name is in him, and that he can refuse to pardon rebellion, language stronger
            than what Scripture uses for an ordinary created angel elsewhere. Many Bible teachers connect
            this figure to other appearances of the Angel of the LORD, who speaks and acts with God&apos;s
            own authority. Others read him simply as a uniquely empowered messenger carrying delegated
            divine authority. The chapter itself does not resolve the question further than what these two
            verses already say.
          </p>
          <p>
            <strong>Do verses 3 and 6 contradict each other?</strong> No. Verse 3 warns against favoring a
            poor man out of pity, and verse 6 warns against crushing a poor man&apos;s case because he has
            no standing to push back. Both verses protect the same thing: a verdict decided by the facts of
            the case, not by how much sympathy or how little power the person in front of the judge
            happens to have.
          </p>
          <p>
            <strong>Why does the law single out an enemy&apos;s animal instead of just saying love your
            enemy?</strong> Because a command aimed at an action can actually be checked, while a command
            aimed only at a feeling cannot. Verses 4 and 5 do not ask Israel to feel differently about
            someone who hates them. They ask for a specific action, returning a stray animal or helping a
            struggling one, which still shapes the heart even before the feelings catch up.
          </p>
          <p>
            <strong>Are the hornets in verse 28 literal insects?</strong> Scripture does not settle this.
            Some take it at face value, an actual plague of stinging insects sent ahead of Israel.
            Others read it as a figure for the dread and panic that spread through these nations before
            Israel&apos;s arrival. Either reading keeps the main point intact: the clearing of the land was
            God&apos;s doing, not Israel&apos;s military strength.
          </p>
          <p>
            <strong>Why does God say He will not drive out the nations all in one year?</strong> Verse 29
            gives the reason directly: an empty land would turn back to wilderness and fill with wild
            animals faster than a small, newly arrived nation could manage it. The slow timeline in verse
            30 protects the very inheritance God is giving, rather than handing it over faster than Israel
            could actually keep it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 23:9</h3>
        <VerseQuote
          text="Also thou shalt not oppress a stranger: for ye know the heart of a stranger, seeing ye were strangers in the land of Egypt."
          reference="Exodus 23:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Israel&apos;s own memory of Egypt becomes the reason to treat the next foreigner fairly, the same
          argument Exodus 22 already made, repeated because it still needed saying.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 23:4 and 5</h3>
        <VerseQuote
          text="If thou meet thine enemy’s ox or his ass going astray, thou shalt surely bring it back to him again. If thou see the ass of him that hateth thee lying under his burden, and wouldest forbear to help him, thou shalt surely help with him."
          reference="Exodus 23:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A command to help an enemy&apos;s struggling animal, centuries before Jesus ever says the words
          love your enemies.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 23:12</h3>
        <VerseQuote
          text="Six days thou shalt do thy work, and on the seventh day thou shalt rest: that thine ox and thine ass may rest, and the son of thy handmaid, and the stranger, may be refreshed."
          reference="Exodus 23:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same word, refreshed, covers the household&apos;s animals and its least powerful people
          alike, naming exactly who the sabbath was always meant to protect.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 23:21</h3>
        <VerseQuote
          text="Beware of him, and obey his voice, provoke him not; for he will not pardon your transgressions: for my name is in him."
          reference="Exodus 23:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most debated lines in the chapter, describing a messenger who carries God&apos;s own
          name and authority ahead of Israel into the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 23:30</h3>
        <VerseQuote
          text="By little and little I will drive them out from before thee, until thou be increased, and inherit the land."
          reference="Exodus 23:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise that comes with its own pace built in, slow enough that the inheritance it describes
          could actually be kept once it arrived.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 23 covers honesty in court, kindness toward an enemy&apos;s animal, protection for the
          stranger, a sabbath for both the land and the household, the three annual feasts, rules around
          sacrifice, and a long closing promise about the Angel who leads Israel into Canaan, with a
          warning not to worship the gods of the nations already living there.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 23 say about helping your enemy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 4 and 5 command returning a stray animal belonging to an enemy and helping an animal
          struggling under its load, even when it belongs to someone who hates you. The command targets
          the action, not the feeling behind it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the three feasts in Exodus 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The feast of unleavened bread in early spring, remembering the exodus from Egypt. The feast of
          harvest, later called the feast of weeks, at the end of the grain harvest. The feast of
          ingathering, later called the feast of tabernacles, at the end of the farming year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who is the Angel in Exodus 23:20 and 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A messenger God sends ahead of Israel into Canaan, described as carrying God&apos;s own name and
          the authority to refuse pardon for rebellion. Many Bible teachers connect this figure to other
          appearances of the Angel of the LORD elsewhere in Scripture, though the chapter itself does not
          say more than these two verses state.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible say not to boil a young goat in its mother&apos;s milk?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 23:19 states the command without explaining its reasoning. Jewish tradition later built
          the broader practice of separating meat and dairy at every meal out of this one specific
          instruction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the sabbatical year in Exodus 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 10 and 11 command letting farmland rest every seventh year, with whatever grows on its
          own during that year set aside first for the poor to eat and then for wild animals, rather than
          harvested by the landowner.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 23 name six specific nations?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 23 names the Amorites, Hittites, Perizzites, Canaanites, Hivites, and Jebusites as the
          peoples already living in the land God is giving Israel, making the warning against worshipping
          their gods a concrete one rather than a vague caution about idolatry in general.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t God clear the land for Israel all at once?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 29 gives the reason: a land emptied too quickly would turn to wilderness and fill with wild
          animals faster than a small, newly settled nation could manage. Verse 30 promises the process
          instead of matching Israel&apos;s own growth over time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 23 say about bribery?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 8 forbids taking any gift connected to a legal case, stating plainly that a bribe blinds
          even a wise judge and twists the words of someone in the right.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 23 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Its command to help an enemy&apos;s animal anticipates Jesus teaching His followers to love their
          enemies, and its warning against covenants with Canaan&apos;s gods sets up the exact failure
          Israel&apos;s later history in Judges keeps repeating.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 23 spends most of its length on people nobody is forcing you to be fair to.</p>
          <p>
            📌 <strong>Kindness toward an enemy shows up here as an action, not a feeling.</strong> Verses
            4 and 5 do not wait for Israel to stop hating anyone. They just command the hand to move
            toward a struggling animal anyway, enemy or not.
          </p>
          <p>
            📌 <strong>Rest in this chapter was never only personal.</strong> The land gets a sabbath year
            so the poor can eat from it. The weekly sabbath names the household&apos;s servants and even
            its animals by the same word as everyone else: refreshed.
          </p>
          <p>
            📌 <strong>The real danger waiting in Canaan was never the nations themselves.</strong> The
            chapter&apos;s closing verses warn that sharing the land with Canaanite worship, not losing a
            battle, is the snare that would actually catch Israel.
          </p>
          <p>
            You probably will not meet a straying ox this week. You will almost certainly cross paths with
            someone who has done nothing to earn your help.
          </p>
          <p>
            That is the test Exodus 23:4 and 5 actually sets. Not whether you can be kind to people who
            deserve it. Whether you will still be kind when they do not.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
