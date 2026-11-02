import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-36-explained", {
  title: "Numbers 36 Explained: The Daughters of Zelophehad and the Last Word of Numbers",
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

export default function NumbersThirtySixExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-36-explained"
      title={<>📖 Numbers 36 Explained: The Daughters of Zelophehad and the Last Word of Numbers</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Thirty six chapters, and the book of Numbers ends on a question about marriage.</p>
            <p>Not a battle. Not a plague. Not a border.</p>
            <p>
              <strong>Numbers 36 explained</strong> is the last chapter of Numbers, and it closes
              the book by finishing a story that started chapters earlier: five sisters who asked
              for their father&apos;s land, got it, and then ran into a problem nobody had thought
              through yet. If they marry outside their own tribe, does their inheritance leave
              with them?
            </p>
            <p>Maybe you have watched a good decision create a problem nobody saw coming.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does five women&apos;s marriage choice need a ruling from Moses himself?</li>
            <li>❓ What does the Year of Jubile have to do with any of this?</li>
            <li>❓ Is this law protecting women, or restricting them?</li>
            <li>❓ Why does the whole book of Numbers end here, of all places?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 36 is not a footnote after the real story ended. It is God
              protecting a promise He already made, down to the last detail that could have
              quietly undone it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the problem the leaders of
              Gilead bring to Moses, the LORD&apos;s answer, the reasoning behind the rule, the
              daughters&apos; own obedience, and the single closing verse that ends the entire
              book of Numbers.
            </p>
            <p>Thirteen verses, and every one of them is still protecting a decision made in Numbers 27.</p>
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
            To understand Numbers 36, you have to go back nine chapters. In{" "}
            <ArticleLink href="/blog/numbers-27-explained">Numbers 27</ArticleLink>, five sisters,
            Mahlah, Noah, Hoglah, Milcah, and Tirzah, came to Moses with a problem. Their father
            Zelophehad had died in the wilderness with no sons, which meant his name and his land
            were about to disappear from Israel entirely. God sided with them completely, and
            through Moses established a new rule: when a man dies without a son, his inheritance
            passes to his daughters.
          </p>
          <p>
            <ArticleLink href="/blog/numbers-34-explained">Numbers 34</ArticleLink> then drew the
            actual borders of Canaan, and{" "}
            <ArticleLink href="/blog/numbers-35-explained">Numbers 35</ArticleLink> set aside
            cities for the Levites and for anyone who killed someone by accident. The map is
            finished. The law is in place. Everything is ready for Israel to cross the Jordan.
          </p>
          <p>
            But one detail from Numbers 27 never got addressed, and the leaders of Zelophehad&apos;s
            own tribe are the ones who finally bring it up.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 36 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Chief Fathers of Gilead Raise a Real Problem (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a group of men who have a direct stake in how this plays out.</p>
        </div>
        <VerseQuote
          text="And the chief fathers of the families of the children of Gilead, the son of Machir, the son of Manasseh, of the families of the sons of Joseph, came near, and spake before Moses, and before the princes, the chief fathers of the children of Israel:"
          reference="Numbers 36:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 These men are from Manasseh, the same tribe Zelophehad belonged to. This is not an
            outside complaint. It is Zelophehad&apos;s own extended family, worried about what
            happens to land that still carries their tribe&apos;s name.
          </p>
          <p>Their concern is specific, not vague.</p>
        </div>
        <VerseQuote
          text="And they said, The LORD commanded my lord to give the land for an inheritance by lot to the children of Israel: and my lord was commanded by the LORD to give the inheritance of Zelophehad our brother unto his daughters. And if they be married to any of the sons of the other tribes of the children of Israel, then shall their inheritance be taken from the inheritance of our fathers, and shall be put to the inheritance of the tribe whereunto they are received: so shall it be taken from the lot of our inheritance."
          reference="Numbers 36:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what they are not arguing.</strong> They are not asking God to take
            the land back from the daughters, and they are not questioning the ruling from Numbers
            27. They accept it fully. Their worry is narrower and sharper: once land belongs to a
            woman, and she marries into a different tribe, whose land is it the moment she becomes
            that tribe&apos;s wife?
          </p>
          <p>Then they name the part that makes the problem permanent, not just awkward.</p>
        </div>
        <VerseQuote
          text="And when the jubile of the children of Israel shall be, then shall their inheritance be put unto the inheritance of the tribe whereunto they are received: so shall their inheritance be taken away from the inheritance of the tribe of our fathers."
          reference="Numbers 36:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the detail that turns a family worry into a national problem.</strong>{" "}
            Normally the Year of Jubile reset everything. Land that had been sold or leased
            returned to its original family, exactly as{" "}
            <ArticleLink href="/blog/leviticus-25-explained">Leviticus 25</ArticleLink> describes.
            But a daughter&apos;s inheritance was never sold or leased. If she married into another
            tribe, the land simply became that tribe&apos;s land through her marriage, and no
            jubile would ever undo that. Every fifty years would make the shift more permanent,
            not less.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The LORD&apos;s Answer: Marry Within the Tribe (verses 5 and 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses does not work out an answer on his own. He takes it straight to God, the same way he did with the original request in Numbers 27.</p>
        </div>
        <VerseQuote
          text="And Moses commanded the children of Israel according to the word of the LORD, saying, The tribe of the sons of Joseph hath said well."
          reference="Numbers 36:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Hath said well&quot; is the same kind of response God gave the
            daughters themselves back in Numbers 27:7.</strong> Both the daughters&apos; original
            request and the tribe&apos;s follow up concern get the same verdict: a fair question,
            honestly raised, deserves a real answer, not a brush off.
          </p>
          <p>Here is the answer itself.</p>
        </div>
        <VerseQuote
          text="This is the thing which the LORD doth command concerning the daughters of Zelophehad, saying, Let them marry to whom they think best; only to the family of the tribe of their father shall they marry."
          reference="Numbers 36:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Read the freedom in that sentence as carefully as the restriction.</strong>{" "}
            &quot;Let them marry to whom they think best&quot; comes first. The daughters are not
            assigned husbands. They are not told who to marry. The only boundary is which tribe
            the husband belongs to, not which man inside it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why the Rule Applies to Every Tribe, Not Just Manasseh (verses 7 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The LORD does not stop at settling one family&apos;s case. He turns the ruling into a
            permanent principle for the whole nation.
          </p>
        </div>
        <VerseQuote
          text="So shall not the inheritance of the children of Israel remove from tribe to tribe: for every one of the children of Israel shall keep himself to the inheritance of the tribe of his fathers. And every daughter, that possesseth an inheritance in any tribe of the children of Israel, shall be wife unto one of the family of the tribe of her father, that the children of Israel may enjoy every man the inheritance of his fathers."
          reference="Numbers 36:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was never only about Zelophehad&apos;s five daughters.</strong> Verse 8
            widens the rule to any daughter, in any tribe, who inherits land because her father
            had no sons. The exact situation that happened once to Zelophehad&apos;s family could
            happen again anywhere in Israel, and the law gets ahead of it before it does.
          </p>
          <p>The chapter restates the core principle one more time, almost word for word.</p>
        </div>
        <VerseQuote
          text="Neither shall the inheritance remove from one tribe to another tribe; but every one of the tribes of the children of Israel shall keep himself to his own inheritance."
          reference="Numbers 36:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verses 7 and 9 say almost the same thing on purpose.{" "}
            <ArticleLink href="/blog/numbers-34-explained">Numbers 34</ArticleLink> drew Canaan&apos;s
            outer borders with that same kind of careful, repeated precision. This chapter is
            drawing the inner borders, the lines between one tribe&apos;s ground and another&apos;s,
            with the same seriousness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Daughters Do Exactly What Was Asked (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After nine verses of debate and ruling, the chapter tells you plainly how the five
            women actually responded.
          </p>
        </div>
        <VerseQuote
          text="Even as the LORD commanded Moses, so did the daughters of Zelophehad: For Mahlah, Tirzah, and Hoglah, and Milcah, and Noah, the daughters of Zelophehad, were married unto their father's brothers' sons:"
          reference="Numbers 36:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Here are the same five names from Numbers 27, in the same order, now
            actually married.</strong> This is not a vague summary. The text names each sister
            individually a second time, confirming that the ruling was not just agreed to in
            theory. It was carried out, by name.
          </p>
          <p>And the land stayed exactly where the law said it had to.</p>
        </div>
        <VerseQuote
          text="And they were married into the families of the sons of Manasseh the son of Joseph, and their inheritance remained in the tribe of the family of their father."
          reference="Numbers 36:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 They married their father&apos;s brothers&apos; sons, their own cousins, inside the
            same tribe of Manasseh. The land their father fought to keep in Numbers 27 never left
            Manasseh&apos;s hands for a single generation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Last Verse of the Whole Book (verse 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers does not end with a story. It ends with a label on everything that came before it.</p>
        </div>
        <VerseQuote
          text="These are the commandments and the judgments, which the LORD commanded by the hand of Moses unto the children of Israel in the plains of Moab by Jordan near Jericho."
          reference="Numbers 36:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Thirty six chapters, almost forty years, two entire generations, and the book
            closes by calling all of it commandments and judgments given through one man, in one
            place.</strong> Israel is still camped in the plains of Moab, still on the wrong side
            of the Jordan, exactly where{" "}
            <ArticleLink href="/blog/numbers-33-explained">Numbers 33</ArticleLink> first placed
            them. The crossing itself has not happened yet. Numbers ends at the border, not past it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 36 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Is this law protecting the daughters, or restricting them?</strong> Both things
            are true, and the text does not hide either one. Verse 6 opens with real freedom,
            &quot;let them marry to whom they think best,&quot; which was not nothing in the
            ancient world. But that freedom has a real boundary attached, the tribe of their
            father. The restriction exists to protect something the text treats as more important
            than individual preference: the permanence of the tribal inheritance God had just
            finished assigning in Numbers 34. The daughters themselves, in verses 10 and 11, show
            no resistance to the boundary at all.
          </p>
          <p>
            <strong>Why does this rule only apply to daughters who inherit land, not to daughters
            in general?</strong> Because the problem only exists where land is involved. A daughter
            with brothers never received the inheritance in the first place, so her marriage never
            moved tribal land anywhere. This law is narrow on purpose. It solves the exact gap
            Numbers 27 left open and nothing more.
          </p>
          <p>
            <strong>Does this restrict women more than men?</strong> Not in the way it might first
            appear. Men also kept their inheritance inside their own tribe automatically, simply by
            staying in their father&apos;s family line, which is why the problem never showed up
            for sons. The daughters needed a rule spelled out only because they were, for the first
            time in Numbers 27, allowed to hold land directly instead of through a male relative. The
            restriction in Numbers 36 is the cost of extending that same right.
          </p>
          <p>
            <strong>Does marrying a cousin in verse 11 raise a problem for a modern reader?</strong>{" "}
            Marriage between close relatives was common and lawful in the ancient world, and
            Scripture only forbids specific close relationships, listed later in Leviticus 18, which
            did not include the first cousin marriages described here. Reading a modern cultural
            discomfort back into the text would be reading something into it that the chapter itself
            never raises as a concern.
          </p>
          <p>
            <strong>How does this law compare to what happens later with Ruth and Boaz?</strong>{" "}
            They are related in spirit but not the same law. Numbers 36 restricts which tribe an
            heiress may marry into, so land never crosses tribal lines. Ruth&apos;s story runs on a
            different mechanism entirely, a kinsman buying back a dead relative&apos;s land so the
            family name does not disappear.
          </p>
        </div>
        <VerseQuote
          text="Moreover Ruth the Moabitess, the wife of Mahlon, have I purchased to be my wife, to raise up the name of the dead upon his inheritance, that the name of the dead be not cut off from among his brethren, and from the gate of his place: ye are witnesses this day."
          reference="Ruth 4:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Different law, same underlying value running through both stories: God consistently
            treats a family&apos;s land and a family&apos;s name as things worth protecting by
            name, not just in principle.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 36
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 36:6</h3>
        <VerseQuote
          text="This is the thing which the LORD doth command concerning the daughters of Zelophehad, saying, Let them marry to whom they think best; only to the family of the tribe of their father shall they marry."
          reference="Numbers 36:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Real freedom and a real boundary in the same sentence. The daughters choose their own
          husbands, inside the one limit that protects their father&apos;s inheritance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 36:7</h3>
        <VerseQuote
          text="So shall not the inheritance of the children of Israel remove from tribe to tribe: for every one of the children of Israel shall keep himself to the inheritance of the tribe of his fathers."
          reference="Numbers 36:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The principle behind the entire chapter, stated as a permanent national rule rather than
          a one time exception for a single family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 36:12</h3>
        <VerseQuote
          text="And they were married into the families of the sons of Manasseh the son of Joseph, and their inheritance remained in the tribe of the family of their father."
          reference="Numbers 36:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The payoff of the whole chapter. A right won in Numbers 27 is still intact here, because
          five women did exactly what the ruling asked of them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 36:13</h3>
        <VerseQuote
          text="These are the commandments and the judgments, which the LORD commanded by the hand of Moses unto the children of Israel in the plains of Moab by Jordan near Jericho."
          reference="Numbers 36:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The last sentence of the whole book of Numbers, closing almost forty years of history with a
          plain statement of what all of it actually was: law given through one man, at one place,
          before the river was ever crossed.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 36
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 36 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 36 settles a problem left open by the daughters of Zelophehad&apos;s inheritance
          in Numbers 27: if an heiress marries outside her tribe, her land would permanently
          transfer to her husband&apos;s tribe. God rules that any daughter who inherits land must
          marry within her father&apos;s own tribe, and the five sisters do exactly that.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were the daughters of Zelophehad?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mahlah, Noah, Hoglah, Milcah, and Tirzah, five sisters from the tribe of Manasseh whose
          father died in the wilderness without any sons. Numbers 27 records them successfully
          asking Moses for the right to inherit his land, and Numbers 36 shows how that right was
          protected once they married.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the daughters of Zelophehad have to marry within their own tribe?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 36:3 and 4 explain the danger plainly: if they married into another tribe, their
          inheritance would transfer to that tribe permanently, even surviving the Year of Jubile,
          since the land was never sold, only passed by marriage. Marrying within their father&apos;s
          tribe kept the land exactly where it started.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the Year of Jubile have to do with Numbers 36?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The jubile, described fully in Leviticus 25, normally returned sold or leased land to its
          original family every fifty years. But a daughter&apos;s inherited land was never sold,
          so jubile would not undo a transfer caused by her marriage. Numbers 36:4 names that gap
          directly as the reason the rule was needed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the daughters of Zelophehad actually obey the ruling?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Numbers 36:10 to 12 name all five sisters again and state plainly that they married
          within their father&apos;s own family, specifically their father&apos;s brothers&apos;
          sons, so their inheritance stayed inside the tribe of Manasseh.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Numbers 36 the last chapter of the book?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because by this point every major piece is finished: the people are counted, the land is
          divided by borders and by lot, the cities are set aside, and even this last loose thread
          about tribal inheritance is closed. Verse 13 sums up the whole book as commandments and
          judgments given in the plains of Moab, with Israel still camped at the border, ready to
          cross.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Numbers 36 restrict women&apos;s rights?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It limits which tribe an heiress could marry into, not who specifically she could marry
          or whether she had a say. Verse 6 states the daughters could marry whomever they thought
          best within that boundary. The restriction exists because the daughters had just been
          given a right, land ownership, that sons already held automatically, and the boundary
          was the condition attached to that right.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were Zelophehad&apos;s daughters marrying their cousins?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Numbers 36:11 says they married their father&apos;s brothers&apos; sons, which makes
          their husbands first cousins. This was lawful and common in the ancient world, and
          Scripture&apos;s later lists of forbidden relationships in Leviticus 18 never include this
          kind of marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Numbers end before Israel crosses the Jordan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Numbers 36:13 places Israel in the plains of Moab, by the Jordan, near Jericho,
          exactly where the later chapters of the book have had them camped. The actual crossing
          into Canaan happens in the book of Joshua, after Moses has died and Deuteronomy has
          recorded his final words.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers ends quietly, and that is exactly the point.</p>
          <p>
            📌 <strong>God does not let a good decision come apart at the seams.</strong> Numbers
            27 gave the daughters their father&apos;s land. Numbers 36 makes sure that gift could
            not quietly dissolve through an ordinary marriage nobody meant any harm by.
          </p>
          <p>
            📌 <strong>Freedom and boundary are not opposites in this chapter.</strong> &quot;Let
            them marry to whom they think best&quot; and &quot;only to the family of the tribe of
            their father&quot; sit in the very same verse, and neither one cancels the other.
          </p>
          <p>
            📌 <strong>A book this long ends on five women keeping a promise.</strong> Not a king,
            not a battle, not a miracle. Mahlah, Noah, Hoglah, Milcah, and Tirzah doing exactly what
            was asked of them, and the inheritance held.
          </p>
          <p>
            You probably are not dividing tribal land this week. But you likely have a promise or a
            provision in your own life that could quietly slip away through no dramatic failure at
            all, just an ordinary choice nobody thought all the way through.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one thing God has given you that you need to guard on purpose, the way these five
            sisters guarded their father&apos;s land, and decide today what boundary actually
            protects it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
