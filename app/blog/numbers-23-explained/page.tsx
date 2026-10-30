import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-23-explained", {
  title: "Numbers 23 Explained: Balaam's Two Blessings Over Israel",
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

export default function NumbersTwentyThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-23-explained"
      title={<>📖 Numbers 23 Explained: Balaam&apos;s Two Blessings Over Israel</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Balak builds an altar. Balaam climbs a hill alone. He comes back blessing the very nation he was paid to curse.</p>
            <p>
              <strong>Numbers 23 explained</strong> is the chapter where the curse Balak paid for comes
              out as a blessing, twice, from two different mountains, using two completely separate sets
              of altars. Nothing about the location changes what leaves Balaam&apos;s mouth.
            </p>
            <p>Maybe you have watched someone try every angle they had to force an outcome, and watched it fail every single time anyway.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Balaam build seven altars twice in one chapter?</li>
            <li>❓ What does it mean that &quot;God is not a man, that he should lie&quot;?</li>
            <li>❓ Why does moving Balaam to a new mountain change nothing about what he says?</li>
            <li>❓ Why does Balak finally ask Balaam to stop talking altogether?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Two oracles, two mountains, one unbreakable blessing. Balak keeps changing the
              stage. God never changes the script.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the first altars and the first
              oracle, Balak&apos;s shock, the second mountain and the second oracle, and the moment Balak
              finally gives up trying to shape what Balaam is allowed to say.
            </p>
            <p>A short chapter proving that no ritual, no new location, and no price can talk God out of what He has already promised.</p>
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
            <ArticleLink href="/blog/numbers-22-explained">Numbers 22</ArticleLink> told the strange
            story of how Balaam got to Moab at all. Balak hired him to curse Israel, God told him no
            flatly, Balaam asked again anyway, and an angel with a drawn sword and a talking donkey
            stopped him on the road before he ever reached the king. The chapter ended with Balak
            marching his hired prophet up to the high places of Baal, pointing him down at the
            Israelite camp spread across the plain below.
          </p>
          <p>
            Numbers 23 picks up on that same mountain, with the altars already built and the first
            attempt about to happen. Everything Balak has arranged up to this point is designed to
            produce one result. This chapter is where that plan meets reality for the first time.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 23 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Same Ritual, New Altars (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Balaam does not go straight into a pronouncement. He first asks for a setup.</p>
        </div>
        <VerseQuote
          text="And Balaam said unto Balak, Build me here seven altars, and prepare me here seven oxen and seven rams."
          reference="Numbers 23:1"
        />
        <VerseQuote
          text="And Balak did as Balaam had spoken; and Balak and Balaam offered on every altar a bullock and a ram."
          reference="Numbers 23:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Seven altars, seven oxen, seven rams, a full set of sacrifices at every single
            one.</strong> This is the costume of a serious divination ritual, the kind of staging a
            king paying top price for a curse would expect from the man he hired. Balak holds up his
            end of it in full.
          </p>
          <p>Then Balaam does something Balak cannot follow him into.</p>
        </div>
        <VerseQuote
          text="And Balaam said unto Balak, Stand by thy burnt offering, and I will go: peradventure the LORD will come to meet me: and whatsoever he sheweth me I will tell thee. And he went to an high place."
          reference="Numbers 23:3"
        />
        <VerseQuote
          text="And God met Balaam: and he said unto him, I have prepared seven altars, and I have offered upon every altar a bullock and a ram."
          reference="Numbers 23:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Balaam reports his own ritual back to God as though God needed the update. God does not
            correct him or comment on the altars at all. What happens next has nothing to do with how
            many oxen were offered.
          </p>
        </div>
        <VerseQuote
          text="And the LORD put a word in Balaam's mouth, and said, Return unto Balak, and thus thou shalt speak."
          reference="Numbers 23:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Balaam goes back down to find Balak exactly where he left him, standing by the burnt
            offering with all the princes of Moab gathered around. Every eye on that hillside is
            waiting for a curse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The First Oracle: &quot;How Shall I Curse Whom God Has Not Cursed?&quot; (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>What comes out of Balaam&apos;s mouth opens by naming exactly what he was hired to do.</p>
        </div>
        <VerseQuote
          text="And he took up his parable, and said, Balak the king of Moab hath brought me from Aram, out of the mountains of the east, saying, Come, curse me Jacob, and come, defy Israel."
          reference="Numbers 23:7"
        />
        <VerseQuote
          text="How shall I curse, whom God hath not cursed? or how shall I defy, whom the LORD hath not defied?"
          reference="Numbers 23:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Balaam states the job, then states the problem with the job, in the same
            breath.</strong> He was hired to curse a nation God has already decided not to curse. No
            ritual changes that starting point, no matter how many altars stand behind him.
          </p>
        </div>
        <VerseQuote
          text="For from the top of the rocks I see him, and from the hills I behold him: lo, the people shall dwell alone, and shall not be reckoned among the nations."
          reference="Numbers 23:9"
        />
        <VerseQuote
          text="Who can count the dust of Jacob, and the number of the fourth part of Israel? Let me die the death of the righteous, and let my last end be like his!"
          reference="Numbers 23:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Who can count the dust of Jacob&quot; echoes a promise made centuries earlier to
            Jacob&apos;s grandfather, that his descendants would be as countless as{" "}
            <ArticleLink href="/blog/genesis-13-explained">the dust of the earth</ArticleLink>. Balaam,
            a hired diviner from Mesopotamia with no stake in Israel&apos;s covenant, ends up quoting
            the shape of that promise back almost word for word, without anyone handing him the text.
          </p>
          <p>
            ⚠️ <strong>&quot;Let me die the death of the righteous&quot; is the strangest line in the
            whole oracle.</strong> Balaam wishes for an end like Israel&apos;s, while standing on a
            hill he climbed specifically to help destroy them. He can see what Israel has with God
            clearly enough to want it, and still goes back down the mountain afterward to try again
            for Balak&apos;s money.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Balak&apos;s Shock, Balaam&apos;s Answer (verses 11 and 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Balak hears none of what he paid for, and says so immediately.</p>
        </div>
        <VerseQuote
          text="And Balak said unto Balaam, What hast thou done unto me? I took thee to curse mine enemies, and, behold, thou hast blessed them altogether."
          reference="Numbers 23:11"
        />
        <VerseQuote
          text="And he answered and said, Must I not take heed to speak that which the LORD hath put in my mouth?"
          reference="Numbers 23:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Balaam answers a furious client with a question, not an apology.</strong> He is
            not claiming credit for the blessing and he is not pretending he tried to curse Israel and
            failed. He is telling Balak plainly that the words were never his to change in the first
            place, the same condition the angel on the road had already made unmistakable.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Different Mountain, the Same God (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Balak&apos;s solution to a failed ritual is a new location for the ritual.</p>
        </div>
        <VerseQuote
          text="And Balak said unto him, Come, I pray thee, with me unto another place, from whence thou mayest see them: thou shalt see but the utmost part of them, and shalt not see them all: and curse me them from thence."
          reference="Numbers 23:13"
        />
        <VerseQuote
          text="And he brought him into the field of Zophim, to the top of Pisgah, and built seven altars, and offered a bullock and a ram on every altar."
          reference="Numbers 23:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Pisgah is the same ridge where Moses himself will later stand to view the promised land
            he is barred from entering, told in{" "}
            <ArticleLink href="/blog/numbers-20-explained">the verdict handed down at Meribah</ArticleLink>.
            Here, decades before that, a pagan king is using the exact same ridge hoping for the
            opposite view: a narrower look at Israel that might make them seem small enough to curse.
          </p>
          <p>
            Balak&apos;s reasoning in verse 13 is worth noticing closely. He thinks seeing less of
            Israel, not all of them at once, might produce a different result. The ritual logic
            behind moving locations assumes the outcome depends on the angle, the altars, or the god
            of that particular hill. Balaam goes through the same motions regardless.
          </p>
        </div>
        <VerseQuote
          text="And he said unto Balak, Stand here by thy burnt offering, while I meet the LORD yonder."
          reference="Numbers 23:15"
        />
        <VerseQuote
          text="And the LORD met Balaam, and put a word in his mouth, and said, Go again unto Balak, and say thus."
          reference="Numbers 23:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Balaam returns to find Balak exactly as before, standing with the princes of Moab by the
            burnt offering, asking the same question he asked the last time.
          </p>
        </div>
        <VerseQuote
          text="And when he came to him, behold, he stood by his burnt offering, and the princes of Moab with him. And Balak said unto him, What hath the LORD spoken?"
          reference="Numbers 23:17"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Second Oracle: &quot;God Is Not a Man, That He Should Lie&quot; (verses 18 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This time Balaam does not open by restating the job. He opens by telling Balak to listen.</p>
        </div>
        <VerseQuote
          text="And he took up his parable, and said, Rise up, Balak, and hear; hearken unto me, thou son of Zippor:"
          reference="Numbers 23:18"
        />
        <VerseQuote
          text="God is not a man, that he should lie; neither the son of man, that he should repent: hath he said, and shall he not do it? or hath he spoken, and shall he not make it good?"
          reference="Numbers 23:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the verse the entire chapter turns on.</strong> A king keeps moving the
            location, hoping a different mountain produces a different word. Balaam tells him outright
            that the word was never going to change, because the one who spoke it does not change His
            mind the way a person does. Centuries later Israel&apos;s own prophet Samuel says almost
            the identical thing about God&apos;s own promise:
          </p>
        </div>
        <VerseQuote
          text="And also the Strength of Israel will not lie nor repent: for he is not a man, that he should repent."
          reference="1 Samuel 15:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul later draws the same line about God&apos;s commitment to His people in Romans:
          </p>
        </div>
        <VerseQuote
          text="For the gifts and calling of God are without repentance."
          reference="Romans 11:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A hired diviner, Israel&apos;s own prophet Samuel, and an apostle all land on the same
            point from three different centuries: whatever God has promised, God keeps, and nothing
            done afterward, by Balak, by Saul, or by anyone else, reopens it.
          </p>
        </div>
        <VerseQuote
          text="Behold, I have received commandment to bless: and he hath blessed; and I cannot reverse it."
          reference="Numbers 23:20"
        />
        <VerseQuote
          text="He hath not beheld iniquity in Jacob, neither hath he seen perverseness in Israel: the LORD his God is with him, and the shout of a king is among them."
          reference="Numbers 23:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Verse 21 is not saying Israel is sinless.</strong> The rest of Numbers has just
            spent several chapters recording exactly how far this nation falls short, including the
            verdict against Moses and Aaron one chapter earlier. The oracle is describing how God has
            chosen to relate to Israel under the covenant He made with them, not grading their actual
            behavior.
          </p>
        </div>
        <VerseQuote
          text="God brought them out of Egypt; he hath as it were the strength of an unicorn."
          reference="Numbers 23:22"
        />
        <VerseQuote
          text="Surely there is no enchantment against Jacob, neither is there any divination against Israel: according to this time it shall be said of Jacob and of Israel, What hath God wrought!"
          reference="Numbers 23:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The word translated &quot;unicorn&quot; here refers to a wild ox known for raw, untamable
            strength, not the horned horse of later folklore. The image is about power nobody can
            domesticate or direct, exactly the kind of power Balak thought money could rent for an
            afternoon on a hillside.
          </p>
          <p>
            📌 <strong>&quot;No enchantment against Jacob, neither divination against Israel&quot; is
            Balaam, a professional in exactly those arts, saying his own trade has no power here.</strong>{" "}
            The man hired for his skill at divination tells the man who hired him that divination does
            not work on this particular nation.
          </p>
        </div>
        <VerseQuote
          text="Behold, the people shall rise up as a great lion, and lift up himself as a young lion: he shall not lie down until he eat of the prey, and drink the blood of the slain."
          reference="Numbers 23:24"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. &quot;Neither Curse Them at All, Nor Bless Them at All&quot; (verses 25 and 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two oracles in, Balak has heard enough.</p>
        </div>
        <VerseQuote
          text="And Balak said unto Balaam, Neither curse them at all, nor bless them at all."
          reference="Numbers 23:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is Balak trying to negotiate silence, having already failed to negotiate a
            curse.</strong> If he cannot get the word he paid for, his fallback is simply no word at
            all, since every word so far has made his situation worse in front of his own princes.
          </p>
        </div>
        <VerseQuote
          text="But Balaam answered and said unto Balak, Told not I thee, saying, All that the LORD speaketh, that I must do?"
          reference="Numbers 23:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Balaam reminds him of the one thing he has been consistent about since before they ever left
            Pethor. Silence was never on the table either. The only choice available was always what
            God decided to say through him, not whether he spoke at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. One More Try, Toward Peor (verses 27 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two failures have not talked Balak out of trying a third time.</p>
        </div>
        <VerseQuote
          text="And Balak said unto Balaam, Come, I pray thee, I will bring thee unto another place; peradventure it will please God that thou mayest curse me them from thence."
          reference="Numbers 23:27"
        />
        <VerseQuote
          text="And Balak brought Balaam unto the top of Peor, that looketh toward Jeshimon."
          reference="Numbers 23:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Peor is not a throwaway name here.</strong> This same region becomes the site of
            Israel&apos;s own sin with Moab a few chapters later, the very failure Balaam is later tied
            to in Numbers 31. The chapter closes by quietly naming the ground where Israel will fall,
            right after two chapters of watching every attempt to curse them fail.
          </p>
        </div>
        <VerseQuote
          text="And Balaam said unto Balak, Build me here seven altars, and prepare me here seven bullocks and seven rams."
          reference="Numbers 23:29"
        />
        <VerseQuote
          text="And Balak did as Balaam had said, and offered a bullock and a ram on every altar."
          reference="Numbers 23:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter ends mid ritual, altars built, animals offered, a third oracle still to come.
            Numbers 23 closes on repetition, the same seven altars for the third time, because Balak
            still believes the next location might be the one that finally changes the outcome.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 23 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does Balak build seven altars twice, at two different mountains, for the same
            request?</strong> Ancient divination often assumed a god&apos;s power was tied to a place,
            so a different hill or a narrower view of Israel might get a different answer. Numbers 23
            never endorses that logic. It shows the same word coming out regardless of the altar count
            or the address, because the word was never controlled by the ritual in the first place.
          </p>
          <p>
            <strong>What does &quot;God is not a man, that he should lie&quot; actually mean?</strong>{" "}
            It means God&apos;s promises are not subject to the same regret, persuasion, or change of
            mind that moves a person to go back on their word. Once God has committed to bless Israel,
            no new argument, altar, or location reopens the decision, a point 1 Samuel 15:29 and Romans
            11:29 both repeat about God&apos;s character long after this chapter.
          </p>
          <p>
            <strong>Why does Balaam keep going back up the mountain, if he already knows what he will
            say?</strong> The text does not say. What it does show, both here and in Numbers 22, is a
            man who keeps testing whether a different attempt might land differently, even after
            receiving a clear answer. His theology is accurate every single time. His own motives for
            continuing to try are left for the reader to notice rather than for the text to state
            outright.
          </p>
          <p>
            <strong>Does Numbers 23 prove Balaam was a godly man?</strong> No. The oracles prove God
            spoke truly through him, not that Balaam&apos;s own heart was right. Later Scripture never
            remembers him as an example to follow. He is tied to the sin at Peor that follows a few
            chapters later, and both 2 Peter and Jude use him as a warning about loving a reward more
            than loving obedience, the same warning raised in{" "}
            <ArticleLink href="/blog/numbers-22-explained">Numbers 22&apos;s own account</ArticleLink>{" "}
            of how he got onto this mountain at all.
          </p>
          <p>
            <strong>Why does the chapter use &quot;Jacob&quot; and &quot;Israel&quot; for the same
            nation?</strong> Both oracles use the names in parallel lines, a common pattern in Hebrew
            poetry where two names for the same subject appear side by side for emphasis. &quot;Jacob&quot;
            points back to the patriarch and the promise made to him; &quot;Israel&quot; names the
            nation that promise became.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 23:19</h3>
        <VerseQuote
          text="God is not a man, that he should lie; neither the son of man, that he should repent: hath he said, and shall he not do it? or hath he spoken, and shall he not make it good?"
          reference="Numbers 23:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest statement in the chapter of why nothing Balak tries can work. God&apos;s word,
          once given, does not get negotiated down.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 23:8</h3>
        <VerseQuote
          text="How shall I curse, whom God hath not cursed? or how shall I defy, whom the LORD hath not defied?"
          reference="Numbers 23:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The problem with the whole hired job, stated by the man hired to do it, before the first
          oracle has even finished.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 23:23</h3>
        <VerseQuote
          text="Surely there is no enchantment against Jacob, neither is there any divination against Israel: according to this time it shall be said of Jacob and of Israel, What hath God wrought!"
          reference="Numbers 23:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A professional diviner admitting his own craft has no power here. &quot;What hath God
          wrought&quot; still gets quoted today, usually by people who have forgotten where it came
          from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 23:10</h3>
        <VerseQuote
          text="Who can count the dust of Jacob, and the number of the fourth part of Israel? Let me die the death of the righteous, and let my last end be like his!"
          reference="Numbers 23:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A hired outsider echoes{" "}
          <ArticleLink href="/blog/genesis-12-explained">God&apos;s own ancient promise to Abraham</ArticleLink>{" "}
          without being asked to, and finds himself wishing for a share in what he was paid to destroy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 23:20</h3>
        <VerseQuote
          text="Behold, I have received commandment to bless: and he hath blessed; and I cannot reverse it."
          reference="Numbers 23:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The blessing is described as already finished and already irreversible, not something
          Balaam is granting in the moment.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 23 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23 records Balaam speaking two oracles over Israel from two different mountains,
          both of them blessings instead of the curse Balak paid for, followed by Balak&apos;s failed
          attempt to get Balaam to stay silent and a third set of altars built for one more try.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Balaam build seven altars in Numbers 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Seven altars with a bullock and a ram on each one, built twice in this chapter, formed the
          ritual Balaam used as a diviner. The text never suggests the ritual itself produced the
          word Balaam spoke; God supplied the actual words both times regardless of the ceremony.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;God is not a man, that he should lie&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means God does not change His mind about a promise the way a person might under
          pressure or after more persuasion. Numbers 23:19 states this as the reason Balak&apos;s
          second attempt could not produce a different answer than the first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;who can count the dust of Jacob&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes Israel as too numerous to count, language that echoes God&apos;s promise to
          Abraham in Genesis that his descendants would be like the dust of the earth. Balaam uses the
          image without being told to, describing what he genuinely sees from the hilltop.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t Balaam curse Israel even though Balak paid him to?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23:8 and 20 both say the blessing on Israel was already settled by God before
          Balaam ever opened his mouth. Balaam himself states he has no power to reverse a commandment
          God had already given, no matter what Balak offered him for a different result.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;let me die the death of the righteous&quot; mean, if Balaam himself was not living righteously?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23:10 records Balaam wishing for an end like Israel&apos;s, even while he is on that
          hill specifically to help destroy them. The text leaves the contradiction standing rather
          than resolving it, showing a man who can recognize what is good without choosing it himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Balak keep moving Balaam to new mountains?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23:13 and 27 show Balak hoping a different vantage point, or a narrower view of
          Israel&apos;s camp, might produce a different oracle. Both new attempts in this chapter
          produce the same outcome as the first, since the word was never tied to the location.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;there is no enchantment against Jacob&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23:23 has Balaam, a professional diviner, admitting that divination and enchantment
          have no effect on Israel. The man hired for exactly that skill tells his own employer it
          does not work here.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Balak tell Balaam to stop talking altogether in verse 25?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After two oracles that blessed Israel in front of his own princes, Balak&apos;s request in
          Numbers 23:25 to neither curse nor bless them at all is an attempt to stop the damage, since
          every word spoken so far has made his original goal look worse, not better.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Numbers 23 point to Jesus or just to Israel&apos;s history?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 23 itself only records Israel&apos;s history, not a direct prophecy of Jesus. What it
          does establish, that God&apos;s promises cannot be reversed by any outside pressure, is the
          same principle Paul later applies to God&apos;s faithfulness in Romans 11:29.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 23 is short, and it still manages to settle something enormous.</p>
          <p>
            📌 <strong>God&apos;s blessing on His people is not tied to a location, a ritual, or a
            price.</strong> Balak changed the mountain twice, and the oracle stayed exactly the same
            both times.
          </p>
          <p>
            📌 <strong>God is not a man, that he should lie.</strong> Once a promise is given, no
            amount of pressure, money, or persuasion reopens it, from either side of the conversation.
          </p>
          <p>
            📌 <strong>Even the hired opposition can end up telling the truth.</strong> Balaam&apos;s
            own trade had no power here, and he said so himself, twice, to the man paying for the
            opposite.
          </p>
          <p>
            You are probably not facing seven altars or a king trying to buy a curse against you. But
            you may be carrying a fear that someone else&apos;s words, or someone else&apos;s money,
            could somehow undo what God has already settled about you.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Numbers 23:19 over whatever situation feels unsettled right now, and let it answer
            the question honestly: has God actually said this, or are you only afraid someone louder
            might talk Him out of it?
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
