import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-10-explained", {
  title: "Genesis 10 Explained: The Table of Nations After the Flood",
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

export default function GenesisTenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-10-explained"
      title={<>📖 Genesis 10 Explained: The Table of Nations After the Flood</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One family gets off a boat. A whole world of nations comes out of it.</p>
            <p>
              <strong>Genesis 10 explained</strong> is a list of names, seventy something of them,
              tracing every branch of Noah&apos;s three sons out into the nations that fill the rest
              of the Bible. It reads like a list to skim. It is actually a map.
            </p>
            <p>Maybe you have never made it past the first few names before your eyes glazed over.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the Bible bother listing dozens of ancient names most people cannot pronounce?</li>
            <li>❓ Who was Nimrod, and why does the text call him a mighty hunter?</li>
            <li>❓ Where did Babel, Nineveh, and the Canaanites actually come from?</li>
            <li>❓ Why does this chapter set up the very next one, the Tower of Babel?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Genesis 10 is the only place in the ancient world where every nation, even
              rival empires and future enemies of Israel, gets traced back to one shared family.</strong>
            </p>
            <p>
              Here is every branch of that family tree, verse by verse: Japheth&apos;s scattered
              coastlands, Ham&apos;s line and the rise of Nimrod&apos;s kingdoms, Canaan&apos;s
              descendants and the land they would one day lose, and Shem&apos;s line, the one the rest
              of Genesis quietly follows all the way to Abraham.
            </p>
            <p>A family tree has never mattered this much to where the story goes next.</p>
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
            <ArticleLink href="/blog/genesis-9-explained">Genesis 9</ArticleLink> closed on a hard
            note. Noah, the man who obeyed God through the entire flood, ended his story drunk and
            exposed in his own tent, and a curse fell on Canaan because of what happened there.
          </p>
          <p>
            That chapter also named Noah&apos;s three sons plainly: Shem, Ham, and Japheth, &quot;of
            them was the whole earth overspread.&quot; Genesis 10 is where that one line finally gets
            unpacked, name by name, family by family.
          </p>
          <p>
            📌 <strong>Genesis 9 told you Noah had three sons. Genesis 10 tells you what became of
            them.</strong> Every nation named or hinted at anywhere later in Scripture, Egypt,
            Assyria, Babylon, the Philistines, the Canaanites, has its roots planted somewhere in
            this one chapter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One Family, Three Directions (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming the frame everything else fits inside.</p>
        </div>
        <VerseQuote
          text="Now these are the generations of the sons of Noah, Shem, Ham, and Japheth: and unto them were sons born after the flood."
          reference="Genesis 10:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the order: Shem, Ham, Japheth.</strong> That is the birth order used
            elsewhere in Genesis. But the chapter itself covers them in the opposite direction,
            Japheth first, then Ham, then Shem last. Scripture already used this same pattern with{" "}
            <ArticleLink href="/blog/genesis-4-explained">Cain before Seth</ArticleLink>: the lines
            that are not being followed get told first and finished, so the line the story actually
            cares about can close the chapter and carry straight into what comes next.
          </p>
          <p>Japheth&apos;s family goes first, and goes quickly.</p>
        </div>
        <VerseQuote
          text="The sons of Japheth; Gomer, and Magog, and Madai, and Javan, and Tubal, and Meshech, and Tiras."
          reference="Genesis 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven sons, then a handful of grandsons through Gomer and Javan. Javan is widely
            understood as the ancestor of the Greeks, called Ionians in later history, and names
            from this short list, Magog, Meshech, Tubal, resurface together centuries later in
            Ezekiel&apos;s prophecy about a northern power called Gog. The chapter sums up the whole
            branch in one closing verse.
          </p>
        </div>
        <VerseQuote
          text="By these were the isles of the Gentiles divided in their lands; every one after his tongue, after their families, in their nations."
          reference="Genesis 10:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;The isles of the Gentiles&quot; points toward the coastlands and islands around
            the Mediterranean, the direction Japheth&apos;s descendants are pictured spreading into.
            Language, family, and nation are named together here, the same three categories that will
            repeat at the end of both Ham&apos;s and Shem&apos;s sections too.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Cush, Nimrod, and the First Kingdoms (verses 6 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ham&apos;s line opens with four names that will matter for the rest of the Bible.</p>
        </div>
        <VerseQuote text="And the sons of Ham; Cush, and Mizraim, and Phut, and Canaan." reference="Genesis 10:6" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Cush is generally tied to regions south of Egypt, Mizraim is the Hebrew name for Egypt
            itself, and Canaan will get an entire section of its own further down. Cush&apos;s own
            line gets a quick list of sons, then the text slows down for one name in particular.
          </p>
        </div>
        <VerseQuote
          text="And Cush begat Nimrod: he began to be a mighty one in the earth. He was a mighty hunter before the LORD: wherefore it is said, Even as Nimrod the mighty hunter before the LORD."
          reference="Genesis 10:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nimrod is the first person in the Bible the text stops to describe as a
            standout, not just a name in a list.</strong> &quot;Mighty one&quot; and &quot;mighty
            hunter&quot; get repeated three times in two verses. Scripture does not say outright
            whether that repetition is praise or a warning. What it does next is show exactly what
            Nimrod built with that strength.
          </p>
        </div>
        <VerseQuote
          text="And the beginning of his kingdom was Babel, and Erech, and Accad, and Calneh, in the land of Shinar. Out of that land went forth Asshur, and builded Nineveh, and the city Rehoboth, and Calah, And Resen between Nineveh and Calah: the same is a great city."
          reference="Genesis 10:10 to 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Babel, in the land of Shinar, is the same place Genesis 11 is about to make
            famous for an entirely different reason.</strong> This is the first mention of Babel in
            the Bible, and it is already a kingdom before a single brick gets stacked into a tower.
          </p>
          <p>
            The KJV names Asshur as the one who went out from Shinar and built Nineveh. Some other
            translations read the same Hebrew as Nimrod himself pushing north into Assyria, so
            respected translations genuinely differ on the exact subject of that sentence. Either
            way, the two cities named here, Babel and Nineveh, become the capitals of Babylon and
            Assyria, the two empires that will later conquer and exile Israel.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Mizraim, Canaan, and a Border Israel Would Later Cross (verses 13 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mizraim&apos;s line gets a short list of names tied to Egypt and its neighbors, including
            one detail worth pausing on.
          </p>
        </div>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 14 notes that the Philistines came out of Casluhim, a descendant of Mizraim. That
            single line quietly answers a question later books never stop to explain: the Philistines
            who fight Israel throughout Judges and Samuel trace back to Egypt&apos;s branch of this
            family tree, not Canaan&apos;s, even though they end up living inside Canaan&apos;s
            borders.
          </p>
          <p>Then the text turns to Canaan, and slows all the way down.</p>
        </div>
        <VerseQuote
          text="And Canaan begat Sidon his first born, and Heth, And the Jebusite, and the Amorite, and the Girgasite,"
          reference="Genesis 10:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Almost every name in Canaan&apos;s list shows up again later as a people group
            Israel is told to drive out of the promised land.</strong> The Jebusites hold Jerusalem
            until David&apos;s time. The Amorites and Hivites appear across Joshua and Judges. This
            genealogy is quietly listing the exact nations Israel&apos;s conquest will be fought
            against, generations before Israel exists.
          </p>
        </div>
        <VerseQuote
          text="And the border of the Canaanites was from Sidon, as thou comest to Gerar, unto Gaza; as thou goest, unto Sodom, and Gomorrah, and Admah, and Zeboim, even unto Lasha."
          reference="Genesis 10:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 That border, running from Sidon in the north down through Gaza and out to Sodom and
            Gomorrah, is roughly the land God later promises Abram. Canaan&apos;s descendants are
            occupying it here, long before any promise about it is ever spoken.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Shem, Eber, and the Line the Story Follows (verses 21 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter finally turns to Shem, and the very first verse about him already points
            somewhere specific.
          </p>
        </div>
        <VerseQuote
          text="Unto Shem also, the father of all the children of Eber, the brother of Japheth the elder, even to him were children born."
          reference="Genesis 10:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Shem is not simply introduced as Noah&apos;s son here. He is called &quot;the
            father of all the children of Eber.&quot;</strong> Eber has not even been named yet in
            this chapter, but the text already flags him as the reason Shem&apos;s line matters. Many
            scholars connect Eber&apos;s name to the word &quot;Hebrew,&quot; the term that will
            eventually describe Abraham and his descendants.
          </p>
          <p>Shem&apos;s sons are named, then his grandson Arphaxad&apos;s own line narrows fast.</p>
        </div>
        <VerseQuote
          text="And Arphaxad begat Salah; and Salah begat Eber. And unto Eber were born two sons: the name of one was Peleg; for in his days was the earth divided; and his brother's name was Joktan."
          reference="Genesis 10:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ <strong>What does &quot;in his days was the earth divided&quot; actually mean?</strong>{" "}
            The chapter does not explain it here. Most readers connect it directly to what happens in
            the very next chapter, when God confuses one shared language into many and scatters
            people across the earth. Peleg&apos;s own name reflects that word for division. Read this
            way, Genesis 10 is quietly counting down toward Genesis 11 before that chapter has even
            started.
          </p>
          <p>
            Joktan&apos;s branch gets thirteen sons of its own, more names than any other single
            father in the chapter, then Shem&apos;s section closes the same way Japheth&apos;s and
            Ham&apos;s already did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. One Family, Many Nations (verse 32)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The whole chapter closes with a single sentence that says what all those names were for.</p>
        </div>
        <VerseQuote
          text="These are the families of the sons of Noah, after their generations, in their nations: and by these were the nations divided in the earth after the flood."
          reference="Genesis 10:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every nation on earth, according to this verse, shares one set of
            grandparents.</strong> Jewish tradition has long spoken of this chapter as listing seventy
            nations, a number used elsewhere in Scripture to represent the full spread of humanity.
            Whatever the exact count, the point stands either way: no nation named here, not Egypt,
            not Assyria, not even Canaan, gets described as less than fully human or less than fully
            descended from Noah.
          </p>
          <p>
            And the very next word after this verse in the Bible is a description of one shared
            language, right before it gets taken away.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the Bible spend a whole chapter on a genealogy nobody can pronounce?</strong>{" "}
            Because almost every nation named or implied later in Scripture gets its start here.
            Egypt, Assyria, Babylon, the Philistines, and the Canaanites all trace back to a name in
            this list. Readers who skip it miss where half the rest of the Bible&apos;s geography
            comes from.
          </p>
          <p>
            <strong>Was Nimrod a hero or a villain?</strong> The text itself does not say outright.
            &quot;Mighty hunter before the LORD&quot; can read as genuine praise or as pointed irony,
            and Genesis 10 leaves the description standing without a verdict attached. What is not in
            doubt is what he built: the kingdom centered on Babel, the very city where Genesis 11
            records humanity&apos;s next act of open defiance against God.
          </p>
          <p>
            <strong>Did Nimrod or Asshur build Nineveh?</strong> The KJV names Asshur as the subject
            of that sentence, but the underlying Hebrew is genuinely ambiguous, and other respected
            translations read it as Nimrod extending his own empire into Assyria. Genesis 10 does not
            resolve which reading is correct, and honest readers hold that uncertainty rather than
            picking a side with more confidence than the text supports.
          </p>
          <p>
            <strong>Has this chapter ever been misused to rank nations or races?</strong> Yes, and it
            should be said plainly. Some readers over the centuries have tried to tie Ham&apos;s
            descendants to inferiority based on geography or skin color. Genesis 10 itself does the
            opposite. It traces Japheth, Ham, and Shem with the exact same structure, family by
            family, tongue by tongue, nation by nation, and never ranks one line above another. The
            only line singled out for extra attention is Shem&apos;s, and that is because of where the
            story is headed, Abraham, not because of any claim about superiority.
          </p>
          <p>
            <strong>Are these ancient names historically real?</strong> Many of them are. Nineveh and
            Babylon are well documented cities in the archaeological record, and peoples like the
            Jebusites, Amorites, and Philistines appear repeatedly in later biblical history exactly
            where Genesis 10 places their ancestors. This chapter is not a myth loosely describing
            unknown places. It is naming real regions that show up again and again across the rest of
            Scripture.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 10:32</h3>
        <VerseQuote
          text="These are the families of the sons of Noah, after their generations, in their nations: and by these were the nations divided in the earth after the flood."
          reference="Genesis 10:32"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse the whole chapter has been building toward: every nation on earth, without
          exception, shares one family tree.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 10:8 and 9</h3>
        <VerseQuote
          text="And Cush begat Nimrod: he began to be a mighty one in the earth. He was a mighty hunter before the LORD: wherefore it is said, Even as Nimrod the mighty hunter before the LORD."
          reference="Genesis 10:8 and 9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first individual in this whole chapter singled out for description, and the man whose
          kingdom becomes the setting for the Tower of Babel in the very next chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 10:25</h3>
        <VerseQuote
          text="The name of one was Peleg; for in his days was the earth divided; and his brother's name was Joktan."
          reference="Genesis 10:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A single line dropped in the middle of a genealogy, quietly pointing forward to the
          scattering of nations Genesis 11 is about to describe.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 10:21</h3>
        <VerseQuote
          text="Unto Shem also, the father of all the children of Eber, the brother of Japheth the elder, even to him were children born."
          reference="Genesis 10:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that quietly marks which branch of this huge family tree the rest of the Bible is
          about to follow, all the way to Abraham.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 10:1</h3>
        <VerseQuote
          text="Now these are the generations of the sons of Noah, Shem, Ham, and Japheth: and unto them were sons born after the flood."
          reference="Genesis 10:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The opening line that turns one surviving family into the starting point for every nation
          named anywhere else in Scripture.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 10 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It traces the descendants of Noah&apos;s three sons, Shem, Ham, and Japheth, into the
          nations that fill the rest of the Bible, including Egypt, Assyria, Babylon, the
          Philistines, and the Canaanites, before Genesis 11 explains why those nations ended up
          speaking different languages.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Genesis 10 called the Table of Nations?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because it lists nations rather than only individuals, organized by which of Noah&apos;s
          three sons they descended from. It is often called the oldest surviving document of its
          kind that traces so many ancient peoples back to a single shared ancestry.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Nimrod in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A descendant of Ham through Cush, described in Genesis 10:8 and 9 as a mighty hunter and
          the first person the Bible calls a mighty one on earth. He founded a kingdom centered on
          Babel in the land of Shinar, the same city where the Tower of Babel is built in Genesis 11.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the order go Japheth, Ham, and Shem instead of birth order?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis often lists side branches of a family before turning to the line it actually
          follows, the same pattern used with Cain before Seth in Genesis 4 and 5. Shem&apos;s line
          closes Genesis 10 because it is the line Genesis 11 and the rest of the Bible continue,
          leading eventually to Abraham.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where did the Philistines come from?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 10:14 traces them to Casluhim, a descendant of Mizraim, the line associated with
          Egypt. That makes the Philistines part of Ham&apos;s family through Egypt, not through
          Canaan, even though they later settle inside Canaan&apos;s borders.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;in his days was the earth divided&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes Peleg, a descendant of Shem in Genesis 10:25. Most readers connect it to the
          scattering of languages and peoples at the Tower of Babel in Genesis 11, since Peleg&apos;s
          own name reflects the idea of division.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many nations are listed in Genesis 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jewish tradition has long spoken of seventy nations coming from this chapter, a number
          Scripture elsewhere uses to represent the complete family of humanity. The exact count
          depends on how names that appear more than once across the three lines get counted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Genesis 10 connect to the curse of Canaan in Genesis 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Genesis 10 lists Canaan&apos;s actual descendants, the Jebusites, Amorites, and others,
          the same peoples Israel is later told to drive out of the promised land, giving names and
          geography to the line{" "}
          <ArticleLink href="/blog/genesis-9-explained">Genesis 9&apos;s curse</ArticleLink> already
          pointed toward.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 10 set up the Tower of Babel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It names Babel as the beginning of Nimrod&apos;s kingdom in Genesis 10:10, before Genesis
          11 ever describes what gets built there. It also introduces Peleg, whose name marks a
          division of the earth, right at the hinge point between the two chapters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Genesis 10 historically accurate?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many of the places and peoples named here, Nineveh, Egypt, the Philistines, the Jebusites,
          are well documented in later Scripture and the wider historical record. The chapter names
          real regions that keep reappearing throughout the rest of the Bible.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 10 looks like a list to skip past. It is actually a promise being kept in real time.</p>
          <p>
            📌 <strong>Every nation traces back to one family.</strong> Egypt, Assyria, Canaan,
            Babylon, and every name in between all descend from the same three brothers who once
            stood together on dry ground.
          </p>
          <p>
            📌 <strong>The nations Israel would later fight are named here first, as family, not
            strangers.</strong> Long before conquest or exile, this chapter refuses to describe any of
            them as less than fully human.
          </p>
          <p>
            📌 <strong>One line quietly gets set apart, not because it is better, but because of
            where the story is going.</strong> Shem&apos;s line closes the chapter and carries straight
            into Genesis 11, then all the way to Abraham.
          </p>
          <p>
            You come from a long, tangled family tree too, full of names you will never fully trace.
            Genesis 10 says God was never confused about any branch of it.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Open Genesis 11 next. The family you just met here, still united, still speaking one
            language, is about to build something God will not let stand.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
