import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-7-explained", {
  title: "Joshua 7 Explained: Achan's Hidden Sin and the Defeat at Ai",
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

export default function JoshuaSevenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-7-explained"
      title={<>📖 Joshua 7 Explained: Achan&apos;s Hidden Sin and the Defeat at Ai</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Jericho fell without Israel striking a single blow. Then a city a fraction of its size sends Israelite soldiers running for their lives.</p>
            <p>
              <strong>Joshua 7 explained</strong> is the chapter where the winning streak breaks, and the reason has
              nothing to do with Ai&apos;s walls or Ai&apos;s army. One man made a quiet decision inside his own tent
              back at Jericho, and because of it, the whole camp cannot stand in front of an enemy that should never
              have been a real threat at all.
            </p>
            <p>Maybe the setback you are facing right now does not add up either. You did what seemed right, or thought you did, and the ground still gave way under you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did a small city like Ai defeat an army that had just leveled Jericho?</li>
            <li>❓ What exactly did Achan take, and why did it matter enough to cost thirty six lives?</li>
            <li>❓ Why did God narrow the search with lots, tribe to family to household to one man, instead of simply naming Achan?</li>
            <li>❓ Did Achan&apos;s whole household really pay for a sin only he committed?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Achan&apos;s sin was hidden from every person in the camp. It was never hidden from God,
              and it cost Israel exactly as much as if the whole nation had done it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the sin the narrator tells you about before
              anyone inside the story knows it, the failed attack on Ai, Joshua tearing his own clothes before the
              ark, the lots closing in one step at a time, Achan&apos;s confession, and the judgment carried out in
              the valley that still carries the name of what happened there.
            </p>
            <p>Read slowly. Hidden sin feels private right up until the moment it stops being hidden.</p>
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
            <ArticleLink href="/blog/joshua-6-explained">Joshua 6</ArticleLink> ended with Jericho burned to the
            ground, Rahab&apos;s household rescued exactly as promised, and a curse spoken over anyone who ever
            rebuilt the city. In the middle of that chapter sat a command easy to read past in the excitement of the
            wall falling.
          </p>
        </div>
        <VerseQuote
          text="And ye, in any wise keep yourselves from the accursed thing, lest ye make yourselves accursed, when ye take of the accursed thing, and make the camp of Israel a curse, and trouble it. But all the silver, and gold, and vessels of brass and iron, are consecrated unto the LORD: they shall come into the treasury of the LORD."
          reference="Joshua 6:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That warning was not a suggestion. The gold and silver of Jericho belonged to the LORD alone, and
            touching it for yourself was described as making yourself accursed, the exact word used for the devoted
            things themselves. Joshua 7 opens on the far side of that warning, and it answers a question the
            previous chapter never had to ask out loud. Did everyone actually listen?
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 7 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Sin the Reader Knows Before Joshua Does (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by telling you something nobody inside the story knows yet.</p>
        </div>
        <VerseQuote
          text="But the children of Israel committed a trespass in the accursed thing: for Achan, the son of Carmi, the son of Zabdi, the son of Zerah, of the tribe of Judah, took of the accursed thing: and the anger of the LORD was kindled against the children of Israel."
          reference="Joshua 7:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the order of information.</strong> The narrator names the man, his father, his
            grandfather, and his great grandfather, and states exactly what he did, before Joshua or a single
            soldier has any idea anything is wrong. The rest of the chapter will spend twenty five more verses
            making Israel search for information you were already handed in the first sentence.
          </p>
          <p>
            <strong>Trespass</strong> here means a violation of something set apart, not a small slip. Achan is
            identified by a full line of ancestry, tribe of Judah included, which matters later when the search for
            him narrows tribe by tribe. The LORD&apos;s anger is stated as fact in the same verse, against the whole
            nation, even though only one man had sinned.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A City Small Enough to Beat Without Really Trying (verses 2 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With Jericho behind them, Joshua turns his attention to a much smaller target.</p>
        </div>
        <VerseQuote
          text="And Joshua sent men from Jericho to Ai, which is beside Bethaven, on the east side of Bethel, and spake unto them, saying, Go up and view the country. And the men went up and viewed Ai."
          reference="Joshua 7:2"
        />
        <VerseQuote
          text="And they returned to Joshua, and said unto him, Let not all the people go up; but let about two or three thousand men go up and smite Ai; and make not all the people to labour thither; for they are but few."
          reference="Joshua 7:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The spies are confident, almost casual. After a fortified city as large as Jericho, Ai looks like
            nothing worth tiring the whole army over. Three thousand men go up instead.
          </p>
        </div>
        <VerseQuote
          text="So there went up thither of the people about three thousand men: and they fled before the men of Ai. And the men of Ai smote of them about thirty and six men: for they chased them from before the gate even unto Shebarim, and smote them in the going down: wherefore the hearts of the people melted, and became as water."
          reference="Joshua 7:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read that last phrase again.</strong> &quot;Hearts melted&quot; is the same language{" "}
            <ArticleLink href="/blog/joshua-5-explained">Joshua 5:1</ArticleLink> used for every king in Canaan when
            they heard what God had done at the Jordan. Now the same words describe Israel. The nation that
            terrified every king in the land a chapter ago is now the one running.
          </p>
          <p>
            It gets worse set against <ArticleLink href="/blog/joshua-1-explained">what God had already told
            Joshua</ArticleLink> before any of this began: be strong and of a good courage, be not afraid, neither be
            dismayed. Thirty six men are dead, and the whole camp is suddenly living out the opposite of that
            promise, for a reason nobody on the battlefield understands yet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Joshua Falls on His Face (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua&apos;s response to the news is not strategy. It is grief.</p>
        </div>
        <VerseQuote
          text="And Joshua rent his clothes, and fell to the earth upon his face before the ark of the LORD until the eventide, he and the elders of Israel, and put dust upon their heads."
          reference="Joshua 7:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Torn clothes, dust, lying face down until evening. Every elder in Israel joins him. Then Joshua speaks,
            and the prayer that comes out sounds almost like doubt.
          </p>
        </div>
        <VerseQuote
          text="And Joshua said, Alas, O LORD God, wherefore hast thou at all brought this people over Jordan, to deliver us into the hand of the Amorites, to destroy us? would to God we had been content, and dwelt on the other side Jordan!"
          reference="Joshua 7:7"
        />
        <VerseQuote
          text="O LORD, what shall I say, when Israel turneth their backs before their enemies! For the Canaanites and all the inhabitants of the land shall hear of it, and shall environ us round, and cut off our name from the earth: and what wilt thou do unto thy great name?"
          reference="Joshua 7:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua does not know about Achan yet, so his questions go straight at God instead.</strong>{" "}
            Why bring us here just to let us be destroyed. He even echoes the wilderness generation&apos;s old
            complaint, wishing they had stayed on the other side of the Jordan, the very unbelief that cost an entire
            generation the land in the first place.
          </p>
          <p>
            💡 The closing line of the prayer is the real weight of it. Joshua is not only worried about Israel. He
            is worried about God&apos;s own reputation among the nations watching, &quot;thy great name,&quot; the
            same concern Moses raised for Israel more than once in the wilderness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. God&apos;s Answer Is a Diagnosis, Not Comfort (verses 10 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The LORD does not sympathize with the lament. He cuts it off.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Joshua, Get thee up; wherefore liest thou thus upon thy face?"
          reference="Joshua 7:10"
        />
        <VerseQuote
          text="Israel hath sinned, and they have also transgressed my covenant which I commanded them: for they have even taken of the accursed thing, and have also stolen, and dissembled also, and they have put it even among their own stuff."
          reference="Joshua 7:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Six separate actions stack up in a single breath: sinned, transgressed, taken, stolen,
            dissembled, and put it among their own stuff.</strong> God names what Achan did with no softening at
            all, and he names it as Israel&apos;s sin, singular man and whole nation treated as one unit. The
            defeat at Ai was never about Ai&apos;s strength. It was already decided the moment the accursed thing
            went into that tent.
          </p>
        </div>
        <VerseQuote
          text="Therefore the children of Israel could not stand before their enemies, but turned their backs before their enemies, because they were accursed: neither will I be with you any more, except ye destroy the accursed from among you."
          reference="Joshua 7:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is the real stakes of the chapter, stated plainly. God&apos;s own presence, the thing that had
            carried Israel across the Jordan and flattened Jericho, is now on hold until this one hidden theft is
            found and removed. Then come the instructions for how to find it.
          </p>
        </div>
        <VerseQuote
          text="Up, sanctify the people, and say, Sanctify yourselves against to morrow: for thus saith the LORD God of Israel, There is an accursed thing in the midst of thee, O Israel: thou canst not stand before thine enemies, until ye take away the accursed thing from among you."
          reference="Joshua 7:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is also exactly what{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7 had already warned Israel about</ArticleLink>{" "}
            before they ever crossed the Jordan: do not desire the silver or the gold on a devoted thing and take it
            for yourself, because it is a cursed thing, and bringing it into your own house makes you a cursed thing
            right along with it. Achan did not break an unfamiliar rule. He broke one Israel had already been told,
            twice now, in plain words.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Lots Close In, One Step at a Time (verses 16 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The LORD gives Joshua a method, and the chapter slows down to narrate every single step of it.
          </p>
        </div>
        <VerseQuote
          text="So Joshua rose up early in the morning, and brought Israel by their tribes; and the tribe of Judah was taken: And he brought the family of Judah; and he took the family of the Zarhites: and he brought the family of the Zarhites man by man; and Zabdi was taken: And he brought his household man by man; and Achan, the son of Carmi, the son of Zabdi, the son of Zerah, of the tribe of Judah, was taken."
          reference="Joshua 7:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Tribe, then family, then household, then one man.</strong> Twelve tribes narrow to one. One
            family inside that tribe narrows further. One household inside that family narrows again, until a single
            name is left standing. The text repeats Achan&apos;s full genealogy a second time, word for word from
            verse 1, closing the loop the reader was already let in on.
          </p>
          <p>
            📌 <strong>Nobody in the camp learns anything the reader did not already know in the first verse.</strong>{" "}
            The suspense in this section belongs entirely to Israel. God already knew exactly who it was. The whole
            point of the search was never information for God. It was Israel coming face to face, slowly and
            publicly, with what one of their own had done.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. &quot;Indeed I Have Sinned&quot;: Achan&apos;s Confession (verses 19 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua speaks to Achan with unexpected gentleness for a man about to face judgment.</p>
        </div>
        <VerseQuote
          text="And Joshua said unto Achan, My son, give, I pray thee, glory to the LORD God of Israel, and make confession unto him; and tell me now what thou hast done; hide it not from me."
          reference="Joshua 7:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;My son&quot; is not a small detail. Even here, Joshua invites honesty rather than demanding it
            with threats. Achan answers without a single excuse.
          </p>
        </div>
        <VerseQuote
          text="And Achan answered Joshua, and said, Indeed I have sinned against the LORD God of Israel, and thus and thus have I done: When I saw among the spoils a goodly Babylonish garment, and two hundred shekels of silver, and a wedge of gold of fifty shekels weight, then I coveted them, and took them; and, behold, they are hid in the earth in the midst of my tent, and the silver under it."
          reference="Joshua 7:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saw, coveted, took, hid. Four steps, in that order, and Achan names every one of them
            himself.</strong> Nothing in his confession tries to shift blame the way{" "}
            <ArticleLink href="/blog/genesis-3-explained">Adam and Eve once did</ArticleLink> in the garden. He
            simply states what happened. A fine garment, a stack of silver, one wedge of gold, worth noticing but
            nowhere near enough to explain the cost that followed.
          </p>
          <p>
            💡 &quot;Hid in the earth in the midst of my tent&quot; is the detail that ties the whole chapter
            together. The sin stayed buried, literally, under the ground of his own home, invisible to every person
            in the camp except the one who buried it and the God who saw it anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Judgment in the Valley Named for Trouble (verses 22 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Messengers confirm every word of the confession before anything else happens.</p>
        </div>
        <VerseQuote
          text="So Joshua sent messengers, and they ran unto the tent; and, behold, it was hid in his tent, and the silver under it. And they took them out of the midst of the tent, and brought them unto Joshua, and unto all the children of Israel, and laid them out before the LORD."
          reference="Joshua 7:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The stolen things are laid out in front of everyone, before the LORD, exactly where they should have
            gone in the first place, straight into His treasury rather than under a tent floor.
          </p>
        </div>
        <VerseQuote
          text="And Joshua, and all Israel with him, took Achan the son of Zerah, and the silver, and the garment, and the wedge of gold, and his sons, and his daughters, and his oxen, and his asses, and his sheep, and his tent, and all that he had: and they brought them unto the valley of Achor."
          reference="Joshua 7:24"
        />
        <VerseQuote
          text="And Joshua said, Why hast thou troubled us? the LORD shall trouble thee this day. And all Israel stoned him with stones, and burned them with fire, after they had stoned them with stones."
          reference="Joshua 7:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Joshua&apos;s own words become the name of the place.</strong> &quot;Why hast thou troubled
            us, the LORD shall trouble thee&quot; is not a figure of speech. The valley is named directly after that
            sentence in the very next verse.
          </p>
        </div>
        <VerseQuote
          text="And they raised over him a great heap of stones unto this day. So the LORD turned from the fierceness of his anger. Wherefore the name of that place was called, The valley of Achor, unto this day."
          reference="Joshua 7:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Achor</strong> means trouble, and the chapter makes sure you cannot miss the connection.
            Achan&apos;s own name and the valley&apos;s name sound almost identical in Hebrew, a wordplay that ties
            the man to the trouble he caused permanently. Only after this is finished does the chapter say the
            LORD&apos;s anger actually turned. The defeat at Ai never had anything to do with Ai. It ends the moment
            the hidden thing is no longer hidden.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 7 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Achan&apos;s sons and daughters die along with him?</strong> What the text says: verse 24
            lists Achan&apos;s sons, daughters, animals, and tent all being brought to the valley together with him,
            but verse 25 shifts to singular language, &quot;stoned him,&quot; before switching back to plural,
            &quot;burned them,&quot; &quot;stoned them,&quot; which leaves real ambiguity about exactly who the
            stones fell on. How Christians read it: some take the plain, surface reading that the household was
            executed together with Achan, consistent with how an entire family or household could be treated as one
            unit under covenant law in this period. Others point to{" "}
            <ArticleLink href="/blog/deuteronomy-24-explained">Deuteronomy 24:16</ArticleLink>, which states that
            fathers are not put to death for their children, nor children for their fathers, and argue the family
            was brought along only as witnesses to the judgment and to the removal of a household
            now tied to something accursed, not as people being executed themselves. The chapter does not settle
            this cleanly either way.
          </p>
          <p>
            <strong>Why did thirty six men who had nothing to do with Achan&apos;s theft die in the attack on
            Ai?</strong> What the text says: verse 11 and verse 12 describe the sin as Israel&apos;s sin, not only
            Achan&apos;s, and tie the entire army&apos;s defeat directly to it, with no separate explanation offered
            for why those particular men fell. What this reflects: Israel is treated throughout Joshua as one body
            under one covenant, the same framework that let the whole nation share in the blessing of Jericho
            falling. A covenant community that shares completely in victory, in this chapter, shares completely in
            the consequence of hidden sin inside it as well. The text does not say this makes the thirty six deaths
            easy to accept. It only states that this is how the chapter presents what happened.
          </p>
          <p>
            <strong>Was this harsh punishment for taking a garment and some metal?</strong> What the text says:
            Achan&apos;s theft directly violated a specific, recent, repeated command about things devoted entirely
            to God from the first city taken in the conquest, not an ordinary case of stealing from another person.
            How this fits the larger pattern: nothing in Joshua 7 suggests this penalty applies to everyday theft
            under Israel&apos;s law generally. The severity is tied to what was taken, items set apart for God
            alone at the start of a conquest meant to prove whether Israel would obey completely, and to the
            cost that one hidden act had already produced before anyone even knew Achan&apos;s name.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 7:11</h3>
        <VerseQuote
          text="Israel hath sinned, and they have also transgressed my covenant which I commanded them: for they have even taken of the accursed thing, and have also stolen, and dissembled also, and they have put it even among their own stuff."
          reference="Joshua 7:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God names the exact sin before Joshua ever finds out who committed it, and names it as belonging to all of
          Israel, not only to the one man responsible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 7:12</h3>
        <VerseQuote
          text="Therefore the children of Israel could not stand before their enemies, but turned their backs before their enemies, because they were accursed: neither will I be with you any more, except ye destroy the accursed from among you."
          reference="Joshua 7:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The real stakes of the whole chapter in one sentence. Not the loss of a battle, but the loss of God&apos;s
          own presence, which nothing else in Israel&apos;s arsenal could replace.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 7:20 and 21</h3>
        <VerseQuote
          text="And Achan answered Joshua, and said, Indeed I have sinned against the LORD God of Israel, and thus and thus have I done: When I saw among the spoils a goodly Babylonish garment, and two hundred shekels of silver, and a wedge of gold of fifty shekels weight, then I coveted them, and took them; and, behold, they are hid in the earth in the midst of my tent, and the silver under it."
          reference="Joshua 7:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The anatomy of hidden sin, told plainly by the man who committed it. He saw, he wanted, he took, he buried
          it, with no excuse offered for any step.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 7:25</h3>
        <VerseQuote
          text="And Joshua said, Why hast thou troubled us? the LORD shall trouble thee this day. And all Israel stoned him with stones, and burned them with fire, after they had stoned them with stones."
          reference="Joshua 7:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A sentence that becomes the permanent name of the place where it was spoken, in the very next verse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 7:5</h3>
        <VerseQuote
          text="And the men of Ai smote of them about thirty and six men: for they chased them from before the gate even unto Shebarim, and smote them in the going down: wherefore the hearts of the people melted, and became as water."
          reference="Joshua 7:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact fear that every Canaanite king felt toward Israel now belongs to Israel itself, over a city far
          smaller than the one they had just destroyed.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Joshua 7 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 7 records Israel&apos;s defeat at Ai right after the victory at Jericho, caused by one man, Achan,
          secretly keeping gold, silver, and a garment that had been devoted entirely to God. Once Achan is found
          out through lots and confesses, he is judged in a valley later named for the trouble his hidden sin caused.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel lose the battle of Ai?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 7:11 and 12 explain it directly. Israel lost because Achan had taken something devoted to God, and
          the LORD withdrew His presence from the whole camp until that hidden sin was removed, not because Ai had a
          stronger army.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Achan in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Achan was an Israelite from the tribe of Judah who secretly kept a garment, silver, and gold from the
          devoted things of Jericho, hiding them under his tent. Joshua 7:1 names his sin before the rest of the
          chapter even begins.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the accursed thing Achan took?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:18 and 19 had already set apart everything valuable in Jericho for the LORD&apos;s own treasury.
          Joshua 7:21 names what Achan kept instead: a fine garment, two hundred shekels of silver, and a wedge of
          gold weighing fifty shekels.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God use lots to find Achan instead of just naming him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the reasoning directly, but the slow narrowing from tribe to family to household
          to one man made the whole nation watch the search happen in front of them, rather than simply being told
          the answer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Achan&apos;s family die because of his sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 7:24 and 25 describe his household being brought to the valley with him, but the verses leave real
          ambiguity about whether they were executed or only present. Christians read this differently, and the
          chapter itself does not fully resolve it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did thirty six soldiers die at Ai for Achan&apos;s sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 7:11 treats Achan&apos;s theft as the whole nation&apos;s sin, not only his own, under the same
          covenant framework that let all of Israel share in the earlier victory at Jericho.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the valley of Achor mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Achor means trouble. Joshua 7:26 names the valley directly after Joshua&apos;s own words to Achan,
          &quot;why hast thou troubled us.&quot; Centuries later, Hosea 2:15 promises that the same valley of Achor
          would one day become &quot;a door of hope,&quot; turning the place of judgment into a place of restoration.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Joshua 7 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It directly fulfills the warning given in Joshua 6:18 and 19 and echoes the exact command against coveting
          devoted silver and gold already laid out in Deuteronomy 7:25. Generations later, Hosea 2:15 reaches back
          to the same valley and turns its name into a promise instead of only a memory of judgment.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 7 is the chapter where one hidden decision undoes what an entire army had just won.</p>
          <p>
            📌 <strong>A victory does not make you immune to the next failure.</strong> Israel had just watched a
            fortified city fall flat without a fight, then lost thirty six men to a city barely worth mentioning,
            because something was wrong underneath the surface the whole time.
          </p>
          <p>
            📌 <strong>What is buried does not stay buried from God, even while it stays buried from everyone
            else.</strong> Achan&apos;s tent floor hid the evidence from every person in the camp. It never hid
            anything from the one who already named him in the chapter&apos;s very first verse.
          </p>
          <p>
            📌 <strong>Confession, once it finally comes, does not undo the consequence, but it is still worth
            telling the truth.</strong> Achan named exactly what he did, in order, with no excuse attached, and
            Joshua still called him &quot;my son&quot; before any judgment was carried out.
          </p>
          <p>
            You will not bury silver under a tent. But you likely have something smaller tucked away right now that
            you have told no one about, trusting that nobody will ever dig there.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Bring that one hidden thing into the open yourself, today, instead of waiting for a search to find it
            for you. The valley of Achor ends in judgment in this chapter, but Hosea 2:15 promises it does not have
            to stay that way.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
