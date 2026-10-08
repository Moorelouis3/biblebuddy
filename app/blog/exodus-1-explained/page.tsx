import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-1-explained", {
  title: "Exodus 1 Explained: Slavery in Egypt and the Midwives Who Feared God",
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

export default function ExodusOneExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-1-explained"
      title={<>📖 Exodus 1 Explained: Slavery in Egypt and the Midwives Who Feared God</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The last book ended with a coffin and an oath nobody had kept yet.</p>
            <p>
              <strong>Exodus 1 explained</strong> is the chapter where the oath starts to matter.
              Seventy people walked into Egypt following a son they thought was dead. By the end
              of this one chapter, their children&apos;s children are slaves under taskmasters, and a
              king is ordering newborn boys thrown into a river.
            </p>
            <p>Maybe you have watched something small and overlooked grow into something a powerful person suddenly feared.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ How did seventy people turn into a nation strong enough to worry a king?</li>
            <li>❓ Why does a brand new Pharaoh forget everything Joseph did to save Egypt?</li>
            <li>❓ Why does the king go after Hebrew baby boys through their own midwives?</li>
            <li>❓ And why does the Bible remember the midwives&apos; names, when it never once gives Pharaoh&apos;s?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Two women with no title and no army are the ones who stop a king&apos;s
              plan, in the very chapter that introduces him.</strong> Fear of God outlasts fear of a
              throne here, and the whole book of Exodus grows out of that one choice.
            </p>
            <p>
              This walkthrough goes through Exodus 1 in order: the family list that opens the book,
              a new king who owes Joseph nothing, forced labor that only backfires, a secret order
              to kill Hebrew sons, and the two midwives who refuse it.
            </p>
            <p>A chapter with no named hero still manages to introduce the bravest people in it by name.</p>
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
            <ArticleLink href="/blog/genesis-50-explained">Genesis 50</ArticleLink> ended the first
            book of the Bible with Joseph dead and embalmed in a coffin in Egypt, having made his
            family swear to carry his bones out of the country once God brought them home. Genesis
            closed unfinished on purpose. The land God promised Abraham was still four hundred
            miles away and generations in the future.
          </p>
          <p>
            Exodus 1 opens by picking up that same family, still in Egypt, still waiting. The man
            who once ran the country and saved it from famine is gone. So is the whole generation
            that remembered him.
          </p>
          <p>
            How that family ended up welcomed into Egypt&apos;s best land in the first place is
            covered in <ArticleLink href="/blog/who-was-joseph">the story of Joseph</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 1 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Family Jacob Brought Down, Now Multiplying (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The book opens with a roll call, not a new story.</p>
        </div>
        <VerseQuote
          text="Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob."
          reference="Exodus 1:1"
        />
        <VerseQuote
          text="Reuben, Simeon, Levi, and Judah, Issachar, Zebulun, and Benjamin, Dan, and Naphtali, Gad, and Asher."
          reference="Exodus 1:2 to 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>These are the same twelve sons Jacob blessed one by one in</strong>{" "}
            <ArticleLink href="/blog/genesis-49-explained">Genesis 49</ArticleLink>, now simply
            listed as the heads of a household. The individual stories are finished. What starts
            here is the story of a people.
          </p>
          <p>The chapter gives the exact headcount next.</p>
        </div>
        <VerseQuote
          text="And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already."
          reference="Exodus 1:5"
        />
        <VerseQuote
          text="All the souls that came with Jacob into Egypt, which came out of his loins, besides Jacob's sons' wives, all the souls were threescore and six; And the sons of Joseph, which were born him in Egypt, were two souls: all the souls of the house of Jacob, which came into Egypt, were threescore and ten."
          reference="Genesis 46:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Seventy souls, the same number <ArticleLink href="/blog/genesis-46-explained">Genesis 46</ArticleLink>{" "}
            already counted when the family first arrived. Exodus opens by restating a number
            Genesis already gave, so the reader starts here on familiar ground before anything new
            happens.
          </p>
          <p>Then two verses move fast through decades.</p>
        </div>
        <VerseQuote text="And Joseph died, and all his brethren, and all that generation." reference="Exodus 1:6" />
        <VerseQuote
          text="And the children of Israel were fruitful, and increased abundantly, and multiplied, and waxed exceeding mighty; and the land was filled with them."
          reference="Exodus 1:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>One verse buries an entire generation. The next shows their grandchildren
            already filling the land.</strong> Four Hebrew words stack up in verse 7 almost on top
            of each other: fruitful, increased, multiplied, mighty. That pileup of words is the
            point. God&apos;s command in Eden to be fruitful and multiply is quietly happening, in
            a country Abraham never owned a foot of, exactly the way God told Abram it would.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A King Who Did Not Know Joseph (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns on one short, cold sentence.</p>
        </div>
        <VerseQuote text="Now there arose up a new king over Egypt, which knew not Joseph." reference="Exodus 1:8" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Knew not Joseph&quot; does not mean he had never heard the name.</strong>{" "}
            It means Joseph&apos;s rescue of Egypt from famine carried no weight with him. A debt
            an entire nation once owed got erased in one change of throne. Stephen tells the same
            story centuries later, in almost the same words.
          </p>
        </div>
        <VerseQuote
          text="But when the time of the promise drew nigh, which God had sworn to Abraham, the people grew and multiplied in Egypt, Till another king arose, which knew not Joseph."
          reference="Acts 7:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This new king does not waste time deciding what to do about a people he never thanked.</p>
        </div>
        <VerseQuote
          text="And he said unto his people, Behold, the people of the children of Israel are more and mightier than we: Come on, let us deal wisely with them; lest they multiply, and it come to pass, that, when there falleth out any war, they join also unto our enemies, and fight against us, and so get them up out of the land."
          reference="Exodus 1:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice what actually worries him. Not that the Israelites have done anything wrong.
            Only that they exist in large numbers and might one day leave. &quot;Deal wisely&quot;
            is the king&apos;s own word for a plan built entirely on fear of a people who have
            given him no reason to fear them.
          </p>
          <p>The plan itself starts with forced labor.</p>
        </div>
        <VerseQuote
          text="Therefore they did set over them taskmasters to afflict them with their burdens. And they built for Pharaoh treasure cities, Pithom and Raamses."
          reference="Exodus 1:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pithom and Raamses were store or supply cities, the kind of building project that
            needed large amounts of cheap, controlled labor. The family that once held the best
            land in Egypt is now building warehouses for the man who gave them none of the credit
            for saving the country.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Forced Labor That Only Backfires (verses 12 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The king&apos;s own strategy produces the opposite of what he wanted.</p>
        </div>
        <VerseQuote
          text="But the more they afflicted them, the more they multiplied and grew. And they were grieved because of the children of Israel."
          reference="Exodus 1:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Oppression was supposed to shrink the problem. Instead it grows faster than
            ever.</strong> Egypt feels the one thing it never expected from a plan meant to control
            a people: it is the Egyptians who end up grieved, not the Israelites who disappear.
          </p>
          <p>So the cruelty escalates instead of easing off.</p>
        </div>
        <VerseQuote text="And the Egyptians made the children of Israel to serve with rigour:" reference="Exodus 1:13" />
        <VerseQuote
          text="And they made their lives bitter with hard bondage, in morter, and in brick, and in all manner of service in the field: all their service, wherein they made them serve, was with rigour."
          reference="Exodus 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Rigour&quot; appears twice in two verses. This is not occasional hard work. It
            is a whole life, every day, built around making it as bitter as possible. Genesis 15
            told Abram this exact season was coming, centuries before any of these people were
            born.
          </p>
        </div>
        <VerseQuote
          text="Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years; And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance."
          reference="Genesis 15:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The bondage in this chapter is not a surprise to God. It was named, by God,
            long before it started.</strong> That does not make the suffering smaller. It means the
            rescue was also already promised, before the first brick was ever laid.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Secret Plan to Kill Every Hebrew Son (verses 15 and 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forced labor has not slowed the growth. So the king changes tactics completely.</p>
        </div>
        <VerseQuote
          text="And the king of Egypt spake to the Hebrew midwives, of which the name of the one was Shiphrah, and the name of the other Puah:"
          reference="Exodus 1:15"
        />
        <VerseQuote
          text="And he said, When ye do the office of a midwife to the Hebrew women, and see them upon the stools; if it be a son, then ye shall kill him: but if it be a daughter, then she shall live."
          reference="Exodus 1:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Pharaoh is never named in this entire chapter. The two women he gives this
            order to are.</strong> Scripture remembers Shiphrah and Puah by name forever. The king
            who tried to erase a whole generation of sons does not even get a title attached to his
            own.
          </p>
          <p>
            The plan is also quieter than open slaughter. If sons simply fail to survive birth, no
            soldier ever has to be blamed for it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Two Women Who Feared God More Than Pharaoh (verses 17 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The whole plan depends on two women doing exactly what they are told. They do not.</p>
        </div>
        <VerseQuote
          text="But the midwives feared God, and did not as the king of Egypt commanded them, but saved the men children alive."
          reference="Exodus 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One verse, and the king&apos;s entire strategy is already broken.</strong>{" "}
            Shiphrah and Puah have no soldiers, no political power, and every reason to be
            terrified of a king who has already ordered hard labor on their whole nation. They
            disobey him anyway.
          </p>
          <p>Pharaoh eventually notices and calls them in.</p>
        </div>
        <VerseQuote
          text="And the king of Egypt called for the midwives, and said unto them, Why have ye done this thing, and have saved the men children alive?"
          reference="Exodus 1:18"
        />
        <VerseQuote
          text="And the midwives said unto Pharaoh, Because the Hebrew women are not as the Egyptian women; for they are lively, and are delivered ere the midwives come in unto them."
          reference="Exodus 1:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The text does not tell you whether this answer is the full truth, a generalization
            stretched further than it should be, or a clever way to protect lives without flatly
            refusing a king to his face. What the text does say plainly is what God thought of the
            result.
          </p>
        </div>
        <VerseQuote text="Therefore God dealt well with the midwives: and the people multiplied, and waxed very mighty." reference="Exodus 1:20" />
        <VerseQuote text="And it came to pass, because the midwives feared God, that he made them houses." reference="Exodus 1:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Scripture credits the nation&apos;s continued growth directly to these two
            women&apos;s courage, not to luck.</strong> &quot;He made them houses&quot; is a
            Hebrew way of saying God gave them households, families, a lasting name, the exact
            opposite of what Pharaoh was trying to erase from the Hebrew homes around them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Pharaoh&apos;s Last Resort: A Public Decree (verse 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two women ruined a secret plan. So the king stops being secret about it.</p>
        </div>
        <VerseQuote
          text="And Pharaoh charged all his people, saying, Every son that is born ye shall cast into the river, and every daughter ye shall save alive."
          reference="Exodus 1:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>What started as a private order to two midwives ends the chapter as a public
            command to an entire nation.</strong> The river Pharaoh names here is the same river
            that will carry a basket, and a baby, straight into his own daughter&apos;s hands in
            the very next chapter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 1 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did the midwives lie to Pharaoh in verse 19?</strong> The text records their
            answer without stating whether it is fully accurate, an exaggeration, or a deflection.
            Some readers take it as a genuine observation about women accustomed to hard physical
            labor giving birth quickly. Others read it as a careful half truth meant to protect
            lives without a direct refusal to the king&apos;s face. What the text states clearly,
            without any ambiguity, is that God blessed the midwives for the actual outcome of their
            actions: the babies they saved. The verse praising them in Exodus 1:17 is tied to their
            disobedience to a murderous order, not to the specific wording they later gave Pharaoh.
          </p>
          <p>
            <strong>Were Shiphrah and Puah Hebrew women themselves, or Egyptians assigned to the
            Hebrews?</strong> &quot;Hebrew midwives&quot; most naturally reads as midwives who were
            themselves Hebrew, and that is the majority reading among Bible teachers. A smaller
            number of readers have suggested two women could not have served every birth among a
            whole nation, and propose they were overseers of a larger group of midwives rather than
            the only two in the country. The text itself does not settle the question of how large
            their actual role was, only that it was significant enough for the king to summon them
            personally.
          </p>
          <p>
            <strong>When did the events of Exodus 1 actually happen?</strong> Bible scholars
            genuinely disagree. Some, reading 1 Kings 6:1 at face value, place the exodus itself
            around 1446 BC, which would put this chapter&apos;s oppression beginning well before
            that. Others connect the store city of Raamses in verse 11 to the Egyptian Pharaoh
            Ramesses II and place the exodus centuries later, closer to 1250 BC. Both positions have
            serious defenders, and Exodus itself does not name which king this is.
          </p>
          <p>
            <strong>Why does a king fear a minority population this much?</strong> Verse 7 already
            answered part of it: the growth described is extreme, four strong words stacked
            together. A people numerous enough to be useful as forced labor, yet foreign enough to
            feel like a risk in wartime, is exactly the kind of group a new ruler with no personal
            history with them would see as a problem to manage rather than people to thank.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Exodus 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 1:17</h3>
        <VerseQuote
          text="But the midwives feared God, and did not as the king of Egypt commanded them, but saved the men children alive."
          reference="Exodus 1:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Two women with no power break an entire royal strategy in one verse, simply by fearing
          God more than they feared a throne.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 1:8</h3>
        <VerseQuote text="Now there arose up a new king over Egypt, which knew not Joseph." reference="Exodus 1:8" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One sentence erases a nation&apos;s gratitude and sets the entire book of Exodus in
          motion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 1:12</h3>
        <VerseQuote
          text="But the more they afflicted them, the more they multiplied and grew. And they were grieved because of the children of Israel."
          reference="Exodus 1:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A plan built on fear produces the exact outcome it was designed to prevent, and it is
          Egypt that ends up grieved by it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 1:20 and 21</h3>
        <VerseQuote
          text="Therefore God dealt well with the midwives: and the people multiplied, and waxed very mighty. And it came to pass, because the midwives feared God, that he made them houses."
          reference="Exodus 1:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God directly credits a nation&apos;s survival to two ordinary women&apos;s courage, and
          gives them households of their own in return.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 1:7</h3>
        <VerseQuote
          text="And the children of Israel were fruitful, and increased abundantly, and multiplied, and waxed exceeding mighty; and the land was filled with them."
          reference="Exodus 1:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Four words piled on top of each other, showing a promise made to Abraham centuries
          earlier quietly coming true in a country that never wanted it to.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob&apos;s family of seventy multiplies rapidly in Egypt after Joseph&apos;s generation
          dies. A new king who owes Joseph nothing enslaves them with hard labor, and when that
          fails to slow their growth, he orders Hebrew midwives to kill newborn sons, a command two
          midwives refuse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Pharaoh in Exodus 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus never names him. Bible teachers connect him to different Egyptian kings depending
          on which date they hold for the exodus, but the text itself only ever calls him &quot;a
          new king&quot; who did not know Joseph.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the king of Egypt fear the Israelites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 1:9 and 10 has him worried about their sheer numbers and the possibility they
          would side with an enemy in a future war. Nothing in the text suggests the Israelites had
          actually done anything wrong. The fear is entirely about what they might become.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Shiphrah and Puah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They were the Hebrew midwives Pharaoh ordered to kill newborn Hebrew sons. Exodus 1:17
          says they feared God instead of obeying him, and Scripture preserves their names forever,
          while the king who gave the order is never named at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the midwives lie to Pharaoh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 1:19 records their answer without confirming whether it was fully literal,
          exaggerated, or a careful way to avoid a direct confrontation. What Exodus 1:20 states
          plainly is that God blessed them for the outcome of their disobedience to a murderous
          command, which is the point the text actually settles.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many Israelites came into Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 1:5 gives the number as seventy souls, the same total Genesis 46:27 already
          recorded when the family first arrived under Jacob, before the rapid growth described
          later in the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that the midwives &quot;feared God&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means their loyalty to God outranked their fear of a king who could have had them
          killed for disobedience. Exodus 1:17 and 21 both tie that fear of God directly to their
          refusal to harm the babies and to the reward God gave them afterward.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When did the events of Exodus 1 happen?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scholars disagree. An early date reading of 1 Kings 6:1 points to roughly 1446 BC for the
          exodus itself. A later date reading, connecting the city of Raamses in verse 11 to
          Pharaoh Ramesses II, places it closer to 1250 BC. Exodus itself does not state which view
          is correct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 1 connect to Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pharaoh&apos;s public order in verse 22 to cast every Hebrew son into the river sets up
          the very next chapter, where a Hebrew mother hides her own son in a basket on that same
          river rather than lose him to that decree.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens after Exodus 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2 opens with a Levite couple hiding their newborn son from Pharaoh&apos;s decree,
          setting him afloat on the Nile in a basket, where Pharaoh&apos;s own daughter finds him
          and raises him as her son, naming him Moses.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 1 has no famous hero in it, and it still manages to be unforgettable.</p>
          <p>
            📌 <strong>A debt forgotten by one generation still has to be paid by the next.</strong>{" "}
            Joseph saved Egypt from famine. One king later, his family is enslaved by the same
            country, because gratitude did not survive the change of throne.
          </p>
          <p>
            📌 <strong>Oppression built on fear tends to produce the very thing it feared.</strong>{" "}
            Every attempt in this chapter to shrink Israel instead makes room for its growth, right
            up to two midwives undoing a king&apos;s entire plan.
          </p>
          <p>
            📌 <strong>God remembers the names power tries to erase.</strong> Pharaoh is nameless in
            his own chapter. Shiphrah and Puah are not.
          </p>
          <p>
            You may be the only person in a room choosing to do the harder, honest thing while
            everyone above you expects the opposite.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask God for the kind of fear Shiphrah and Puah had, the kind that outweighs whatever
            fear a powerful voice is currently asking you to obey instead.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
