import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-46-explained", {
  title: "Genesis 46 Explained: Jacob Goes Down to Egypt",
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

export default function GenesisFortySixExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-46-explained"
      title={<>📖 Genesis 46 Explained: Jacob Goes Down to Egypt</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>An old man stops at the edge of the land God promised his grandfather, and offers a sacrifice before he crosses out of it.</p>
            <p>
              <strong>Genesis 46 explained</strong> is the chapter where Jacob finally leaves Canaan
              for Egypt, the wagons from the last chapter actually rolling, a whole household of
              seventy on the move, and a father seeing a son he gave up for dead twenty two years
              ago.
            </p>
            <p>Maybe you have stood at the edge of a decision you knew was right and still needed one more word from God before you could take the step.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Jacob stop to offer sacrifices before he even leaves Canaan?</li>
            <li>❓ Why does this chapter stop the story cold for a list of names?</li>
            <li>❓ Did seventy people really go down to Egypt, or is that number disputed?</li>
            <li>❓ And why does Joseph coach his brothers on exactly what to tell Pharaoh?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not send Jacob to Egypt without a word. He meets him first, by
              name, at the border.</strong>
            </p>
            <p>
              This walkthrough goes through Genesis 46 in order: the vision at Beersheba, the
              journey itself, the family list that counts every soul who made the trip, the
              reunion between Joseph and his father, and the plan Joseph lays out before his
              brothers ever stand in front of Pharaoh.
            </p>
            <p>Underneath a list of names is a promise that this move was never a retreat.</p>
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
            <ArticleLink href="/blog/genesis-45-explained">Genesis 45</ArticleLink> ended with Jacob
            finally believing the news that Joseph was alive, not because his sons told him twice,
            but because he saw the wagons Joseph sent. &quot;It is enough,&quot; he said. &quot;I
            will go and see him before I die.&quot;
          </p>
          <p>
            Genesis 46 picks up the moment that decision turns into movement. Everything is already
            agreed. Pharaoh has already commanded it. The wagons are already loaded. All that is
            left is the road itself, and the first stop on that road is a place that means
            something far older than this famine.
          </p>
          <p>
            The full story of how Joseph ended up ruling Egypt in the first place, sold by his own
            brothers and raised up through a prison cell and a pair of dreams, is covered in{" "}
            <ArticleLink href="/blog/who-was-joseph">the story of Joseph</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 46 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Promise Renewed at Beersheba (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jacob does not head straight for Egypt. He stops first at a place with history.</p>
        </div>
        <VerseQuote
          text="And Israel took his journey with all that he had, and came to Beersheba, and offered sacrifices unto the God of his father Isaac."
          reference="Genesis 46:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Beersheba is not a random rest stop.</strong> It is where Isaac lived and
            worshipped, and where Jacob himself once fled from his brother Esau. Before he leaves
            the land God promised to his grandfather Abraham, Jacob pauses to worship the God of
            that promise, not just the God who has reunited him with a son.
          </p>
          <p>Then, for the first time in this entire Joseph story, God speaks directly.</p>
        </div>
        <VerseQuote
          text="And God spake unto Israel in the visions of the night, and said, Jacob, Jacob. And he said, Here am I."
          reference="Genesis 46:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Calling a name twice is how God speaks to people at turning points throughout
            Scripture. It gets someone&apos;s full attention before the words that matter even
            arrive. Jacob&apos;s answer, &quot;Here am I,&quot; is the same answer his grandfather
            Abraham once gave.
          </p>
        </div>
        <VerseQuote
          text="And he said, I am God, the God of thy father: fear not to go down into Egypt; for I will there make of thee a great nation: I will go down with thee into Egypt; and I will also surely bring thee up again: and Joseph shall put his hand upon thine eyes."
          reference="Genesis 46:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the thing God actually addresses: fear, not logistics.</strong> Jacob
            already knows Joseph is alive and that Pharaoh has invited the whole family. What he
            needs settled is something bigger. Egypt is not Canaan. Leaving the land his father and
            grandfather walked could feel like walking away from the promise itself.
          </p>
          <p>
            God answers that fear directly. He will go down with Jacob. He will bring the family
            back up again, a promise that will not be fulfilled for four hundred years and will take
            an entire book, Exodus, to play out. And He adds a detail only a dying man would care
            about: Joseph, not a stranger, will be the one to close his father&apos;s eyes when the
            time comes.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Journey Into Egypt (verses 5 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the word he needed, Jacob moves.</p>
        </div>
        <VerseQuote
          text="And Jacob rose up from Beersheba: and the sons of Israel carried Jacob their father, and their little ones, and their wives, in the wagons which Pharaoh had sent to carry him."
          reference="Genesis 46:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same wagons that convinced Jacob the news was real in{" "}
            <ArticleLink href="/blog/genesis-45-explained">Genesis 45</ArticleLink> are now doing the
            actual work they were sent for, carrying an old man and the generation too young to walk
            that distance themselves.
          </p>
        </div>
        <VerseQuote
          text="And they took their cattle, and their goods, which they had gotten in the land of Canaan, and came into Egypt, Jacob, and all his seed with him: His sons, and his sons' sons with him, his daughters, and his sons' daughters, and all his seed brought he with him into Egypt."
          reference="Genesis 46:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a man fleeing with nothing.</strong> Cattle, goods, sons,
            daughters, grandchildren, everything Jacob built over a lifetime in Canaan travels with
            him. God told him not to be afraid, and the move itself shows a household bringing its
            whole life along, not abandoning it in a panic.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Seventy Souls: The Family Who Came Down (verses 8 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The story stops here, for twenty verses, to do something that can feel like filler to a
            modern reader: it names names.
          </p>
          <p>
            Reuben&apos;s sons, Simeon&apos;s sons, Levi&apos;s sons, Judah&apos;s sons, down through
            all twelve brothers, grouped by which mother bore them, Leah, Zilpah, Rachel, Bilhah.
            Then the chapter adds up the count.
          </p>
        </div>
        <VerseQuote
          text="All the souls that came with Jacob into Egypt, which came out of his loins, besides Jacob's sons' wives, all the souls were threescore and six; And the sons of Joseph, which were born him in Egypt, were two souls: all the souls of the house of Jacob, which came into Egypt, were threescore and ten."
          reference="Genesis 46:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Threescore and ten is seventy.</strong> Verse 26 counts sixty six people
            who traveled from Canaan as Jacob&apos;s own offspring, not counting Jacob himself and
            not counting the wives his sons married. Add Jacob, add Joseph, who was already living
            in Egypt rather than traveling with the caravan, and add Joseph&apos;s two sons born
            there, and the total reaches seventy, the number this chapter and{" "}
            <ArticleLink href="/blog/genesis-45-explained">the rest of Genesis</ArticleLink> treat as
            the family&apos;s official size on the day they entered the land.
          </p>
          <p>
            This is not padding. A list like this is how an ancient reader checked that a promise
            was actually being kept. God told Abraham his descendants would become a nation too
            numerous to count. Genesis 46 marks the exact headcount at the moment that nation&apos;s
            story moves to a new country, so every reader after this can watch the growth for
            themselves.
          </p>
          <p>
            📌 <strong>Notice who appears inside this list without comment.</strong> Dinah, Jacob&apos;s
            daughter, is named in verse 15 among the children of Leah, the only daughter counted by
            name in the whole genealogy. The text does not explain why she alone is singled out among
            the daughters it otherwise only mentions in general terms, but her presence here means
            she is not forgotten by the record even though her story in Genesis 34 ended in violence
            and grief.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Joseph Meets His Father (verses 28 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The caravan has a destination already picked out, and a brother sent ahead to mark the way.</p>
        </div>
        <VerseQuote
          text="And he sent Judah before him unto Joseph, to direct his face unto Goshen; and they came into the land of Goshen."
          reference="Genesis 46:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is Judah again, the same brother who stood surety for Benjamin and gave the longest
            speech of his life pleading for him in{" "}
            <ArticleLink href="/blog/genesis-44-explained">Genesis 44</ArticleLink>, now sent ahead
            to guide his father the rest of the way. The man who once helped sell Joseph is the one
            Jacob now trusts to lead the family to him.
          </p>
        </div>
        <VerseQuote
          text="And Joseph made ready his chariot, and went up to meet Israel his father, to Goshen, and presented himself unto him; and he fell on his neck, and wept on his neck a good while."
          reference="Genesis 46:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The most powerful man in Egypt does not wait for his father to be brought to
            him.</strong> Joseph readies his own chariot and goes out to meet him. Every other scene
            with Joseph&apos;s brothers in this story involves Joseph managing his composure in
            front of an audience. Here there is no test left to run and no secret left to keep. He
            simply weeps on his father&apos;s neck for a long while, the text making a point of
            saying how long.
          </p>
          <p>Jacob&apos;s own words, when they finally come, are not about Egypt, Pharaoh, or famine at all.</p>
        </div>
        <VerseQuote
          text="And Israel said unto Joseph, Now let me die, since I have seen thy face, because thou art yet alive."
          reference="Genesis 46:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is not despair. It is the opposite. Jacob had spent twenty two years believing
            his favorite son was torn apart by an animal. Every ambition he might still have had for
            his own life was already satisfied the moment he saw Joseph&apos;s face. He is not
            asking to die. He is saying that whatever happens next, grief has already lost.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Trade Nobody Wants, and the Land It Buys Them (verses 31 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before any brother stands in front of Pharaoh, Joseph gives them a script, and the
            script depends on something most people would never think to brag about.
          </p>
        </div>
        <VerseQuote
          text="And Joseph said unto his brethren, and unto his father's house, I will go up, and shew Pharaoh, and say unto him, My brethren, and my father's house, which were in the land of Canaan, are come unto me; And the men are shepherds, for their trade hath been to feed cattle; and they have brought their flocks, and their herds, and all that they have."
          reference="Genesis 46:31 and 32"
        />
        <VerseQuote
          text="And it shall come to pass, when Pharaoh shall call you, and shall say, What is your occupation? That ye shall say, Thy servants' trade hath been about cattle from our youth even until now, both we, and also our fathers: that ye may dwell in the land of Goshen; for every shepherd is an abomination unto the Egyptians."
          reference="Genesis 46:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Joseph tells his brothers to lead with the one detail that sounds like a
            liability.</strong> Shepherding was looked down on in Egyptian society, enough that the
            text calls it an abomination to them. Rather than hide that fact to look more impressive
            to Pharaoh, Joseph has his brothers state it plainly, because the very thing Egyptians
            find distasteful is exactly what will get the family settled on their own land in
            Goshen, away from Egyptian cities, with their flocks intact and their own customs left
            undisturbed.
          </p>
          <p>
            📌 <strong>Joseph is thinking several steps ahead of his own brothers again,</strong> the
            same way he managed grain, dreams, and a famine years earlier in{" "}
            <ArticleLink href="/blog/genesis-41-explained">Genesis 41</ArticleLink>. He is not
            improvising a reunion. He is arranging a permanent home for a family of seventy inside a
            foreign empire, using the very prejudice that could have shut them out as the reason
            they get kept apart and protected instead.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 46 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does the Bible contradict itself on how many people went down to Egypt, seventy
            or seventy five?</strong> Genesis 46:27 and Exodus 1:5 both say seventy. Stephen, in his
            speech in Acts, gives a different number.
          </p>
        </div>
        <VerseQuote
          text="Then sent Joseph, and called his father Jacob to him, and all his kindred, threescore and fifteen souls."
          reference="Acts 7:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Threescore and fifteen is seventy five. Stephen is quoting from the Greek Septuagint
            translation of Genesis, which lists five additional descendants of Joseph through
            Manasseh and Ephraim that the Hebrew text used for Genesis 46 does not include in its
            count. Both numbers come from a real textual tradition. Christians generally hold that
            the Hebrew seventy is the number the original Genesis author intended, and that Stephen,
            speaking to a Greek speaking audience, simply used the version of Scripture they would
            have recognized. Neither number is invented, and the small gap reflects two authentic
            manuscript traditions rather than an error in either speaker&apos;s account.
          </p>
          <p>
            <strong>Why does the genealogy include grandchildren who seem too young to have existed
            yet?</strong> Verse 12 lists Hezron and Hamul as sons of Pharez, Judah&apos;s grandson,
            even though Judah&apos;s own sons Er and Onan are described as already dead in Canaan
            earlier in the same verse. Hebrew genealogies often record a family&apos;s full line as
            it stood by the time the record was finalized, not strictly who existed on the single day
            the caravan crossed into Egypt. Some of these grandchildren were almost certainly born
            after the family settled in Goshen, and the list includes them because the real point of
            the count is the completed household God was building, not a single afternoon&apos;s
            headcount.
          </p>
          <p>
            <strong>Why does Joseph tell his brothers to volunteer information Pharaoh never even
            asked about yet?</strong> Genesis 46:34 shows Joseph anticipating Pharaoh&apos;s question
            and preparing the brothers&apos; answer in advance. The text does not record Joseph
            explaining his full reasoning to them, but the strategy becomes clear once Genesis 47
            opens: Pharaoh grants the family Goshen specifically because of the answer Joseph scripted.
            Joseph is not leaving a sensitive conversation to chance.
          </p>
          <p>
            <strong>Why does God need to tell Jacob not to be afraid, when Jacob already chose to
            go?</strong> Choosing to go and feeling settled about it are not the same thing. Jacob had
            already decided in Genesis 45:28 to see Joseph before he died, but leaving the Promised
            Land itself, the land God swore to Abraham and Isaac, could easily have felt like
            abandoning the covenant rather than simply reuniting with a son. God&apos;s words at
            Beersheba answer that specific fear, promising both that He will go with Jacob into Egypt
            and that the family will one day come back out.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses From Genesis 46
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 46:3 and 4</h3>
        <VerseQuote
          text="And he said, I am God, the God of thy father: fear not to go down into Egypt; for I will there make of thee a great nation: I will go down with thee into Egypt; and I will also surely bring thee up again: and Joseph shall put his hand upon thine eyes."
          reference="Genesis 46:3 and 4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God addresses the one fear logistics could never settle, leaving the land of the promise,
          with a promise bigger than the move itself: He goes down with Jacob, and He will bring
          the family back up again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 46:27</h3>
        <VerseQuote
          text="And the sons of Joseph, which were born him in Egypt, were two souls: all the souls of the house of Jacob, which came into Egypt, were threescore and ten."
          reference="Genesis 46:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A headcount that lets every later reader watch a promise of a nation too numerous to
          count start from a very countable seventy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 46:29</h3>
        <VerseQuote
          text="And Joseph made ready his chariot, and went up to meet Israel his father, to Goshen, and presented himself unto him; and he fell on his neck, and wept on his neck a good while."
          reference="Genesis 46:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most powerful man in Egypt drives out himself to meet an old shepherd, and for once
          in this whole story there is no test left to manage, only grief finally allowed to show.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 46:30</h3>
        <VerseQuote
          text="And Israel said unto Joseph, Now let me die, since I have seen thy face, because thou art yet alive."
          reference="Genesis 46:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Not despair but the opposite, a father telling his son that whatever comes next, the
          worst thing grief could have told him turned out not to be true.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 46
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Genesis 46?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob stops at Beersheba and offers sacrifices, where God speaks to him at night and
          tells him not to fear going down to Egypt. The chapter then lists every member of
          Jacob&apos;s household, seventy souls in total, before Joseph meets his father in Goshen
          and coaches his brothers on how to answer Pharaoh about their trade as shepherds.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jacob stop at Beersheba on his way to Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Beersheba was tied to his father Isaac&apos;s worship and his own earlier history in
          Canaan. Stopping there to offer sacrifices before leaving the Promised Land shows Jacob
          seeking God&apos;s presence at the border, not just taking Pharaoh&apos;s invitation at
          face value.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where was Goshen, and why did Jacob&apos;s family settle there?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Goshen was a fertile region in the eastern part of Egypt, well suited for grazing flocks
          and herds. Genesis 46:34 shows Joseph arranging for his family to live there rather than
          among Egyptians generally, using their trade as shepherds, something Egyptians viewed as
          beneath them, as the very reason Pharaoh would grant them a separate territory.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many people went to Egypt with Jacob?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 46:27 and Exodus 1:5 both say seventy. Acts 7:14 says seventy five, following the
          Greek Septuagint translation, which counts five additional descendants of Joseph that
          the Hebrew text used for Genesis does not list. Both figures come from real, ancient
          manuscript traditions.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible list so many names in Genesis 46?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The list functions as an official record of exactly who entered Egypt and when, letting
          later readers measure the nation God promised Abraham against its actual starting size.
          It is also the same family tree Exodus and later books build directly on top of.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joseph tell his brothers to say they were shepherds?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shepherding was considered beneath Egyptian society, enough that Genesis 46:34 calls it
          an abomination to them. Joseph uses that very prejudice to secure his family their own
          separate land in Goshen rather than having them absorbed into Egyptian cities and
          customs.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;Now let me die, since I have seen thy face&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob is not asking to die. He is saying that everything grief ever told him about losing
          Joseph has now been proven false, and nothing that comes after this moment can take that
          away from him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God tell Jacob not to be afraid in Genesis 46?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob had already agreed to go to Egypt, but leaving the land God promised to Abraham and
          Isaac carried its own weight separate from simply wanting to see Joseph again. God&apos;s
          words at Beersheba promise both His presence in Egypt and an eventual return, answering
          that deeper fear directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 46 connect to Exodus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The seventy souls counted here are the same family Exodus 1 opens by naming again,
          right before describing how they multiplied into a nation under new, much harsher
          circumstances. God&apos;s promise in Genesis 46:4 to bring the family back out of Egypt is
          the promise the entire book of Exodus exists to keep.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens after Genesis 46?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 47 opens with Joseph presenting his brothers to Pharaoh exactly as he
          instructed them, Pharaoh granting the family the land of Goshen, and Jacob himself
          brought in to meet Pharaoh and give him a blessing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 46 is a chapter that moves a whole family and still makes time to speak to one man&apos;s fear first.</p>
          <p>
            📌 <strong>God addresses the fear underneath the decision, not just the decision
            itself.</strong> Jacob had already agreed to go. He still needed to hear, by name, that
            leaving the Promised Land was not the same as leaving the promise.
          </p>
          <p>
            📌 <strong>A list of names is not filler. It is a receipt.</strong> Seventy souls
            entering Egypt is the number every later promise of a nation too numerous to count gets
            measured against.
          </p>
          <p>
            📌 <strong>Wisdom sometimes means leading with the detail that looks like a
            weakness.</strong> Joseph has his brothers announce their despised trade on purpose,
            because that very prejudice is what keeps his family together and protected.
          </p>
          <p>
            You may be standing at your own Beersheba right now, already decided on a next step and
            still waiting for enough peace to actually take it.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Bring your own fear about the move you have already chosen honestly to God, the way
            Jacob did, before you take the first step of it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
