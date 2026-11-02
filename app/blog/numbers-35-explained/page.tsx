import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-35-explained", {
  title: "Numbers 35 Explained: Cities of Refuge and the Law of Blood Guilt",
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

export default function NumbersThirtyFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-35-explained"
      title={<>📖 Numbers 35 Explained: Cities of Refuge and the Law of Blood Guilt</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Not one acre of the promised land has been divided yet.</p>
            <p>But six cities already have a job, and nobody has needed them yet.</p>
            <p>
              <strong>Numbers 35 explained</strong> is the chapter where Israel sets aside the
              Levites&apos; cities before any tribe gets its inheritance, then appoints six cities
              of refuge so a person who kills someone by accident has somewhere real to run, long
              before anyone actually needs to run there.
            </p>
            <p>Maybe you have never thought about what happens to someone who takes a life they never meant to take.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why do the Levites get forty eight scattered cities instead of one solid territory like every other tribe?</li>
            <li>❓ What actually separates a murderer from someone who kills by complete accident?</li>
            <li>❓ Why can a city built for safety still get a man killed if he steps outside its border?</li>
            <li>❓ Why does God flatly refuse to let anyone pay their way out of a killing?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 35 is not a side note before the real land gets divided. It is
              God building mercy and justice into the map itself, before either one is ever put to
              the test.</strong>
            </p>
            <p>
              This walkthrough works through the chapter in order: the cities carved out for the
              Levites and the suburbs measured around them, the six cities of refuge and who was
              allowed to use them, the line the text draws between murder and an honest accident,
              what it cost to leave a city of refuge too soon, and the strict rules about witnesses
              and ransom that close the chapter.
            </p>
            <p>Thirty four verses, and the last two name the real reason behind every one of them.</p>
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
            <ArticleLink href="/blog/numbers-34-explained">Numbers 34</ArticleLink> drew the four
            borders of Canaan and named the twelve men, Eleazar, Joshua, and ten tribal princes,
            who would divide the land once Israel crossed the Jordan. The map is finished. The
            names are set.
          </p>
          <p>
            But two questions still sit unanswered underneath that map. Where will the one tribe
            with no territory of its own actually live? And what happens the day one Israelite
            kills another, whether on purpose or by accident, somewhere inside those borders?
            Numbers 35 answers both before a single lot is ever cast.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 35 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Levites&apos; Cities, Measured Suburb by Suburb (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a command that has nothing to do with battle lines or borders.</p>
        </div>
        <VerseQuote
          text="Command the children of Israel, that they give unto the Levites of the inheritance of their possession cities to dwell in; and ye shall give also unto the Levites suburbs for the cities round about them."
          reference="Numbers 35:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/numbers-18-explained">Numbers 18</ArticleLink> already
            explained why: Aaron and the Levites get no inheritance of land, because God Himself is
            their portion. This chapter is where that promise becomes an actual address. The
            Levites will not get one territory like the other tribes. They get homes scattered
            inside every other tribe&apos;s land instead.
          </p>
          <p>
            💡 <strong>Suburbs</strong> here does not mean a residential neighborhood. It means
            open pasture land ringing each city, measured out for the Levites&apos; cattle and
            herds.
          </p>
          <p>The measuring itself gets spelled out in exact numbers.</p>
        </div>
        <VerseQuote
          text="And the suburbs of the cities, which ye shall give unto the Levites, shall reach from the wall of the city and outward a thousand cubits round about. And ye shall measure from without the city on the east side two thousand cubits, and on the south side two thousand cubits, and on the west side two thousand cubits, and on the north side two thousand cubits; and the city shall be in the midst: this shall be to them the suburbs of the cities."
          reference="Numbers 35:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every Levite city got the exact same shape of land around it, with the city
            sitting in the middle.</strong> Bible teachers have long noticed that verse 4 and verse
            5 give two different distances, a thousand cubits and two thousand cubits, and read
            them as two bands measured from different starting points rather than a contradiction:
            a close ring for the wall itself, and a wider square reaching out from there. Either
            way, the point stands. This was not a vague gesture of land. It was surveyed.
          </p>
        </div>
        <VerseQuote
          text="And among the cities which ye shall give unto the Levites there shall be six cities for refuge, which ye shall appoint for the manslayer, that he may flee thither: and to them ye shall add forty and two cities. So all the cities which ye shall give to the Levites shall be forty and eight cities: them shall ye give with their suburbs."
          reference="Numbers 35:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Forty eight cities total, and six of them carry a second job on top of housing
            Levites: they double as the cities of refuge the rest of the chapter describes. The
            same towns that hold the priesthood&apos;s families also hold the nation&apos;s
            emergency exit.
          </p>
        </div>
        <VerseQuote
          text="And the cities which ye shall give shall be of the possession of the children of Israel: from them that have many ye shall give many; but from them that have few ye shall give few: every one shall give of his cities unto the Levites according to his inheritance which he inheriteth."
          reference="Numbers 35:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is also the quiet answer to a question Numbers 34 left open.</strong>{" "}
            That chapter named a prince from ten tribes to help divide the land, and no prince from
            Levi. Here is why there was nothing for a Levite prince to divide: Levi&apos;s
            inheritance was never a single block of territory to measure and allot. It was forty
            eight cities, carved proportionally out of every other tribe&apos;s share.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Six Cities of Refuge, Set Apart Before Anyone Needs Them (verses 9 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns from housing to something closer to a justice system.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, When ye be come over Jordan into the land of Canaan; Then ye shall appoint you cities to be cities of refuge for you; that the slayer may flee thither, which killeth any person at unawares. And they shall be unto you cities for refuge from the avenger; that the manslayer die not, until he stand before the congregation in judgment."
          reference="Numbers 35:10 to 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was not optional, and it was not something Israel could improvise once
            trouble started.</strong> The command comes before the Jordan is even crossed. A person
            who kills by accident has somewhere to run already waiting, not a system invented
            after the first tragedy happens.
          </p>
          <p>
            This idea did not start here. <ArticleLink href="/blog/exodus-21-explained">
            Exodus 21</ArticleLink> already distinguished a killing God let happen from one a man
            planned, and promised Israel a place to flee. Numbers 35 is where that promise finally
            gets cities attached to it.
          </p>
        </div>
        <VerseQuote
          text="And of these cities which ye shall give six cities shall ye have for refuge. Ye shall give three cities on this side Jordan, and three cities shall ye give in the land of Canaan, which shall be cities of refuge."
          reference="Numbers 35:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Three cities sit on the east side of the Jordan, inside the very territory{" "}
            <ArticleLink href="/blog/numbers-32-explained">Numbers 32</ArticleLink> already gave
            Reuben, Gad, and half of Manasseh. Three more sit west of the Jordan, inside the land
            the other nine and a half tribes are about to receive. No one, on either side of the
            river, is left without a city close enough to actually reach.
          </p>
        </div>
        <VerseQuote
          text="These six cities shall be a refuge, both for the children of Israel, and for the stranger, and for the sojourner among them: that every one that killeth any person unawares may flee thither."
          reference="Numbers 35:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who else this protects: the stranger and the sojourner.</strong> This
            was not a native born privilege. A foreigner living among Israel who killed someone by
            accident got the exact same legal shelter as an Israelite. The justice this chapter sets
            up is national, not ethnic.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. What Makes a Killing Murder (verses 16 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the law can protect anyone, it has to define exactly who it will not protect.</p>
        </div>
        <VerseQuote
          text="And if he smite him with an instrument of iron, so that he die, he is a murderer: the murderer shall surely be put to death. And if he smite him with throwing a stone, wherewith he may die, and he die, he is a murderer: the murderer shall surely be put to death. Or if he smite him with an hand weapon of wood, wherewith he may die, and he die, he is a murderer: the murderer shall surely be put to death."
          reference="Numbers 35:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            👀 Iron, stone, or wood. Three verses, the exact same sentence repeated three times,
            changing only the object.
          </p>
          <p>
            📌 <strong>The weapon never decides the verdict. The intent does.</strong> The text
            could have stopped at one weapon and let the principle generalize. Instead it names
            three on purpose, closing off any argument that a particular object was somehow less
            deadly in God&apos;s eyes than another.
          </p>
        </div>
        <VerseQuote
          text="The revenger of blood himself shall slay the murderer: when he meeteth him, he shall slay him."
          reference="Numbers 35:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The <strong>revenger of blood</strong>, called the avenger in verse 12, is usually
            the victim&apos;s nearest male relative. He carries out the sentence, but as the next
            section shows, he does not get to skip the trial to do it.
          </p>
        </div>
        <VerseQuote
          text="But if he thrust him of hatred, or hurl at him by laying of wait, that he die; Or in enmity smite him with his hand, that he die: he that smote him shall surely be put to death; for he is a murderer: the revenger of blood shall slay the murderer, when he meeteth him."
          reference="Numbers 35:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Hatred. Laying of wait. Enmity.</strong> Three different words for the same
            thing: a killing planned ahead of time, out of a grudge that already existed. That
            premeditation, not the method, is what the law calls murder.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. When It Is Not Murder: The Congregation Judges (verses 22 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The opposite case gets the same careful attention.</p>
        </div>
        <VerseQuote
          text="But if he thrust him suddenly without enmity, or have cast upon him any thing without laying of wait, Or with any stone, wherewith a man may die, seeing him not, and cast it upon him, that he die, and was not his enemy, neither sought his harm:"
          reference="Numbers 35:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Seeing him not&quot; and &quot;was not his enemy, neither sought his
            harm&quot; are the exact opposite of the words used for murder two sections earlier.
            No history of hatred. No intent to hurt. The text is practically mirroring its own
            language on purpose so the two cases cannot be confused.
          </p>
          <p>So what happens to a person who genuinely fits that description?</p>
        </div>
        <VerseQuote
          text="Then the congregation shall judge between the slayer and the revenger of blood according to these judgments: And the congregation shall deliver the slayer out of the hand of the revenger of blood, and the congregation shall restore him to the city of his refuge, whither he was fled: and he shall abide in it unto the death of the high priest, which was anointed with the holy oil."
          reference="Numbers 35:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The revenger of blood never gets to decide this case on his own.</strong> The
            whole congregation has to weigh the evidence first. Only after that judgment does the
            city of refuge actually shelter anyone. Grief does not get to become the jury.
          </p>
          <p>
            ⚠️ <strong>The text ties the man&apos;s freedom to one specific event: the death of the
            high priest.</strong> Not a fixed number of years, not a payment, not a pardon from
            Moses. The chapter does not explain why that particular death closes the case. It only
            states that it does.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why Leaving the City Too Soon Could Cost Everything (verses 26 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Refuge, it turns out, has a border, and the border is not a suggestion.</p>
        </div>
        <VerseQuote
          text="But if the slayer shall at any time come without the border of the city of his refuge, whither he was fled; And the revenger of blood find him without the borders of the city of his refuge, and the revenger of blood kill the slayer; he shall not be guilty of blood:"
          reference="Numbers 35:26 and 27"
        />
        <VerseQuote
          text="Because he should have remained in the city of his refuge until the death of the high priest: but after the death of the high priest the slayer shall return into the land of his possession."
          reference="Numbers 35:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Safety here was conditional and geographic, not unconditional and
            personal.</strong> Step outside the city&apos;s own border before the high priest dies,
            and the protection simply stops applying. The revenger of blood is not called a
            murderer for acting at that point. He is called innocent.
          </p>
          <p>
            💡 That one detail says something easy to miss. The cities of refuge were real mercy,
            but they were never meant to be treated as a loophole a person could quietly stretch.
            Once the high priest did die, the exile ended completely, and the man went home with
            nothing left hanging over him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Two Witnesses, No Ransom, and a Land That Cannot Be Bought Clean (verses 29 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with three short rules that all protect the same thing: the integrity of the verdict itself.</p>
        </div>
        <VerseQuote
          text="Whoso killeth any person, the murderer shall be put to death by the mouth of witnesses: but one witness shall not testify against any person to cause him to die."
          reference="Numbers 35:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A single accusation, however confident, was never enough to end a
            life.</strong> This same standard reappears almost word for word later in Scripture.
          </p>
        </div>
        <VerseQuote
          text="One witness shall not rise up against a man for any iniquity, or for any sin, in any sin that he sinneth: at the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established."
          reference="Deuteronomy 19:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The same demand for life-for-life weight behind a human death shows up in{" "}
            <ArticleLink href="/blog/leviticus-24-explained">Leviticus 24</ArticleLink>, where the
            law states plainly that a man who kills another man must be put to death, no exception
            carved out.
          </p>
        </div>
        <VerseQuote
          text="Moreover ye shall take no satisfaction for the life of a murderer, which is guilty of death: but he shall be surely put to death. And ye shall take no satisfaction for him that is fled to the city of his refuge, that he should come again to dwell in the land, until the death of the priest."
          reference="Numbers 35:31 and 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>No amount of money could shorten either sentence.</strong> A convicted
            murderer could not pay to live. A man cleared of murder but still waiting out his time
            in the city of refuge could not pay to go home early either. Both verdicts, once made,
            were final in every way except time.
          </p>
          <p>Then the chapter gives its own reason for all of this.</p>
        </div>
        <VerseQuote
          text="So ye shall not pollute the land wherein ye are: for blood it defileth the land: and the land cannot be cleansed of the blood that is shed therein, but by the blood of him that shed it. Defile not therefore the land which ye shall inhabit, wherein I dwell: for I the LORD dwell among the children of Israel."
          reference="Numbers 35:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was never only about one family&apos;s grief or one man&apos;s
            guilt.</strong> Unresolved bloodshed, in this chapter&apos;s own words, defiles the
            ground itself. The land Israel is about to inherit is the same land God says He dwells
            in among them, which is why He will not let a killing simply be managed quietly or
            bought away.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 35 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Were the six cities of refuge ever actually named?</strong> Not here. Numbers
            35 gives the law, not the map. Joshua names the actual cities once Israel is settled.
          </p>
        </div>
        <VerseQuote
          text="And they appointed Kedesh in Galilee in mount Naphtali, and Shechem in mount Ephraim, and Kirjatharba, which is Hebron, in the mountain of Judah. And on the other side Jordan by Jericho eastward, they assigned Bezer in the wilderness upon the plain out of the tribe of Reuben, and Ramoth in Gilead out of the tribe of Gad, and Golan in Bashan out of the tribe of Manasseh."
          reference="Joshua 20:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Kedesh, Shechem, and Hebron sit west of the Jordan. Bezer, Ramoth, and Golan sit
            east, inside the territory Numbers 32 already gave Reuben, Gad, and Manasseh. Numbers
            35&apos;s law becomes Joshua&apos;s actual geography, place by place.
          </p>
          <p>
            <strong>Is the revenger of blood just a relative taking personal revenge?</strong> Not
            exactly. He is usually the victim&apos;s nearest male relative, and he is the one who
            carries out the sentence. But verse 24 makes the congregation, not him, the one who
            decides guilt first. He executes a verdict already reached. He does not get to reach it
            himself.
          </p>
          <p>
            <strong>Why tie the slayer&apos;s release to the death of the high priest instead of a
            fixed sentence?</strong> The text itself never explains the reasoning; it simply states
            the rule. Many Christian teachers read this detail as a picture of Jesus, our great
            High Priest, whose own death actually frees the one who has taken refuge in Him, rather
            than merely postponing judgment the way a human high priest&apos;s death did. That is a
            reading laid onto the chapter by later Christian teaching, worth holding loosely. What
            Numbers 35 itself claims is narrower: the sentence ends at that death, full stop.
          </p>
          <p>
            <strong>Does Numbers 35:31&apos;s ban on ransom contradict Exodus 21:30, where an
            owner could pay a ransom over an ox that killed someone?</strong> No, because the two
            laws cover different people. Exodus 21:29 and 30 deal with an owner held liable for an
            animal he knew was dangerous and failed to restrain, a case of negligence. Numbers 35
            deals with a person already convicted of killing someone with his own hands and his own
            intent. The negligent owner could be ransomed. The convicted murderer never could.
          </p>
          <p>
            <strong>Did the cities of refuge really protect foreigners, or is verse 15 just a
            formality?</strong> It reads as a real, operating protection, not a formality. The
            stranger and the sojourner get named in the same sentence as the children of Israel,
            with no separate or lesser process described for them anywhere in the chapter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 35
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 35:6 and 7</h3>
        <VerseQuote
          text="And among the cities which ye shall give unto the Levites there shall be six cities for refuge, which ye shall appoint for the manslayer, that he may flee thither: and to them ye shall add forty and two cities. So all the cities which ye shall give to the Levites shall be forty and eight cities: them shall ye give with their suburbs."
          reference="Numbers 35:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The whole chapter&apos;s math in two sentences: forty eight cities for the Levites, and
          six of them doing double duty as cities of refuge.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 35:15</h3>
        <VerseQuote
          text="These six cities shall be a refuge, both for the children of Israel, and for the stranger, and for the sojourner among them: that every one that killeth any person unawares may flee thither."
          reference="Numbers 35:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A legal shelter extended to foreigners living in Israel, not reserved for native born
          citizens alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 35:25</h3>
        <VerseQuote
          text="And the congregation shall deliver the slayer out of the hand of the revenger of blood, and the congregation shall restore him to the city of his refuge, whither he was fled: and he shall abide in it unto the death of the high priest, which was anointed with the holy oil."
          reference="Numbers 35:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A verdict decided by the congregation first, then a sentence measured not in years but in
          a single future death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 35:30</h3>
        <VerseQuote
          text="Whoso killeth any person, the murderer shall be put to death by the mouth of witnesses: but one witness shall not testify against any person to cause him to die."
          reference="Numbers 35:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A standard of evidence strong enough that Deuteronomy, and later the New Testament, keep
          repeating it almost word for word.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 35:33 and 34</h3>
        <VerseQuote
          text="So ye shall not pollute the land wherein ye are: for blood it defileth the land: and the land cannot be cleansed of the blood that is shed therein, but by the blood of him that shed it. Defile not therefore the land which ye shall inhabit, wherein I dwell: for I the LORD dwell among the children of Israel."
          reference="Numbers 35:33 and 34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind every rule in the chapter, stated plainly: unresolved bloodshed
          defiles the very ground God says He lives on with His people.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 35
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 35 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 35 sets aside forty eight cities for the Levites, six of which also serve as
          cities of refuge for anyone who kills a person by accident. It defines what counts as
          murder, describes how the congregation judges an accidental killing, and closes with
          rules on witnesses and ransom.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the cities of refuge for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They gave a person who killed someone unintentionally a safe place to flee to before the
          victim&apos;s family could take revenge, and a congregation there to judge whether the
          killing was truly an accident.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many cities of refuge were there, and where were they?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          There were six, three on each side of the Jordan. Joshua 20:7 and 8 later names them as
          Kedesh, Shechem, and Hebron west of the Jordan, and Bezer, Ramoth, and Golan to the east.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between a murderer and a manslayer in Numbers 35?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A murderer acts out of hatred or premeditation, as verses 20 and 21 describe. A manslayer
          kills suddenly, without enmity and without lying in wait, as verses 22 and 23 describe.
          The weapon never decides which one applies; the intent does.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the slayer have to stay in the city of refuge until the high priest died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 35:25 and 28 tie his release to that one event rather than to a fixed sentence.
          The text does not explain the reasoning; it simply states that the high priest&apos;s
          death is what closes the case.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened if someone left the city of refuge before the high priest died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 35:26 and 27 say that if the revenger of blood found him outside the city&apos;s
          border and killed him, the revenger would not be guilty of murder. Protection only
          applied inside the city&apos;s own limits.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the cities of refuge protect foreigners, or only native Israelites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They protected foreigners too. Numbers 35:15 names the stranger and the sojourner
          alongside the children of Israel as people the six cities were meant to shelter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why could a murderer not pay money to avoid the death penalty?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 35:31 and 32 forbid taking any payment in place of a murderer&apos;s death or to
          let someone leave a city of refuge early. Blood guilt could not be settled with money, in
          contrast to the ransom Exodus 21:30 allowed for an owner liable over a dangerous animal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many witnesses did Israelite law require to convict someone of murder?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          At least two. Numbers 35:30 states that one witness was never enough to put anyone to
          death, a standard Deuteronomy 19:15 repeats almost word for word.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Levites get forty eight scattered cities instead of one territory?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 18 already established that the Levites&apos; inheritance was God Himself rather
          than land. Numbers 35:7 and 8 turn that into forty eight actual cities, contributed
          proportionally by every other tribe instead of claimed from a single region.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 35 reads like a legal code, and underneath it, it is a chapter about what mercy and justice actually cost.</p>
          <p>
            📌 <strong>Mercy here had real boundaries, not an open invitation.</strong> The city of
            refuge protected a man fully, right up to its own border, and not one step past it.
          </p>
          <p>
            📌 <strong>Justice needed more than one voice and could not be bought.</strong> One
            witness could not convict, and no amount of money could shorten a sentence or erase a
            murder. Blood guilt stayed exactly what it was until it was actually dealt with.
          </p>
          <p>
            📌 <strong>God built both of these into the land before Israel needed either
            one.</strong> The cities existed before the first accidental death. The rule about
            witnesses existed before the first false accusation.
          </p>
          <p>
            You are probably not measuring a city&apos;s suburbs this week. But you likely have
            some boundary God gave you that you have started treating as negotiable, the way the
            man in verse 26 treated the edge of his own city of refuge.
          </p>
          <p>Try this today.</p>
          <p>
            Name one line you already know you should not cross, and ask honestly whether you have
            been quietly testing how far past it you can go.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
