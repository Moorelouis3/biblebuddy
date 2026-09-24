import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-37-explained", {
  title: "Genesis 37 Explained: Joseph's Dreams and the Brothers Who Sold Him",
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

export default function GenesisThirtySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-37-explained"
      title={<>📖 Genesis 37 Explained: Joseph&apos;s Dreams and the Brothers Who Sold Him</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One coat. Two dreams. Ten brothers who cannot say a kind word to him.</p>
            <p>That is all it takes for Joseph&apos;s own family to sell him for the price of a slave.</p>
            <p>
              <strong>Genesis 37 explained</strong> is where the second half of Genesis turns a
              corner. After chapters of genealogies and family history, the story narrows down to
              one seventeen year old boy, a father who cannot hide his favorite son, and brothers
              whose hatred grows from cold silence into a plan to kill him. By the end of the
              chapter Joseph is gone, sold into Egypt, and his father is left holding a bloodstained
              coat, convinced his son is dead.
            </p>
            <p>Maybe you know what it is like to be the one your own family cannot stand to be around.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Did Joseph&apos;s brothers actually sell him, or did someone else take him first?</li>
            <li>❓ Why does Jacob send his favorite son alone into the middle of his brothers&apos; hatred?</li>
            <li>❓ Was Reuben really trying to save Joseph, or protect himself?</li>
            <li>❓ Why does a coat matter enough to nearly get a man killed?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every major turn in this chapter, the coat, the dreams, the pit, the sale,
              comes back to one root problem: a father who loved one son out loud and let the rest
              of his sons feel it every day.</strong>
            </p>
            <p>
              This walkthrough goes through Genesis 37 in order: the coat that marks Joseph out, the
              two dreams that seal his brothers&apos; hatred, the errand that walks him straight into
              danger, the plot to kill him, Reuben&apos;s quiet attempt to save him, Judah&apos;s
              bargain, and the coat that comes home without him.
            </p>
            <p>Watch how many people in this chapter choose the story that is easiest to tell over the one that is true.</p>
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
            <ArticleLink href="/blog/genesis-36-explained">Genesis 36</ArticleLink> spent forty
            three verses recording every branch of Esau&apos;s family, the dukes, the kings, the
            territory of Edom, before Genesis turned its attention away from that side of the family
            for good. Before that, <ArticleLink href="/blog/genesis-35-explained">Genesis 35</ArticleLink>{" "}
            closed out Jacob&apos;s own line: Rachel died giving birth to Benjamin, Jacob&apos;s
            twelve sons were listed complete for the first time, and Jacob&apos;s father Isaac died
            at Hebron.
          </p>
          <p>
            📌 <strong>Genesis 37 opens by narrowing the whole book down to one family line and,
            within a few verses, to one son inside it.</strong> Joseph was{" "}
            <ArticleLink href="/blog/genesis-30-explained">born to Rachel</ArticleLink>, the wife
            Jacob loved most, late in Jacob&apos;s years of working for Laban. Rachel is gone now,
            and Joseph is seventeen, the older of her two sons, living in a household of half
            brothers who never forgot how their father counted the years before Rachel finally had a
            son of her own.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 37 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Favored Son and His Coat (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter wastes no time naming the problem at the center of everything that follows.</p>
        </div>
        <VerseQuote
          text="These are the generations of Jacob. Joseph, being seventeen years old, was feeding the flock with his brethren; and the lad was with the sons of Bilhah, and with the sons of Zilpah, his father's wives: and Joseph brought unto his father their evil report."
          reference="Genesis 37:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Joseph is introduced as a tale bearer before he is introduced as a dreamer.</strong>{" "}
            Whatever the &quot;evil report&quot; actually was, Genesis never explains it, only that
            Joseph carried it to Jacob. That single detail, before anything else happens, already
            gives his brothers a reason to resent him.
          </p>
          <p>Then comes the verse the whole chapter turns on.</p>
        </div>
        <VerseQuote
          text="Now Israel loved Joseph more than all his children, because he was the son of his old age: and he made him a coat of many colours."
          reference="Genesis 37:3"
        />
        <VerseQuote
          text="And when his brethren saw that their father loved him more than all his brethren, they hated him, and could not speak peaceably unto him."
          reference="Genesis 37:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Genesis states the favoritism and the hatred it caused back to back, with no
            softening in between.</strong> The coat was not a small gift. It marked Joseph out in
            front of ten grown brothers every single day, a visible sign of a preference their father
            never bothered to hide.
          </p>
          <p>
            💡 This is not the first time this family repeats a pattern. Isaac loved Esau and Rebekah
            loved Jacob back in{" "}
            <ArticleLink href="/blog/genesis-25-explained">Genesis 25</ArticleLink>, and that
            favoritism split a household then too. Jacob grew up inside that damage and still handed
            the same wound to his own sons.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Two Dreams Joseph Should Have Kept to Himself (verses 5 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If the coat made the brothers resentful, the dreams make them dangerous.</p>
        </div>
        <VerseQuote
          text="For, behold, we were binding sheaves in the field, and, lo, my sheaf arose, and also stood upright; and, behold, your sheaves stood round about, and made obeisance to my sheaf."
          reference="Genesis 37:7"
        />
        <VerseQuote
          text="And his brethren said to him, Shalt thou indeed reign over us? or shalt thou indeed have dominion over us? And they hated him yet the more for his dreams, and for his words."
          reference="Genesis 37:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Joseph tells this dream to the very brothers it is about, without being
            asked.</strong> Whatever the dream meant, repeating it out loud to the men it puts beneath
            him does nothing but confirm what they already suspected about how their father&apos;s
            favorite sees himself.
          </p>
          <p>Then he does it again, and this time even his father pushes back.</p>
        </div>
        <VerseQuote
          text="And he dreamed yet another dream, and told it his brethren, and said, Behold, I have dreamed a dream more; and, behold, the sun and the moon and the eleven stars made obeisance to me."
          reference="Genesis 37:9"
        />
        <VerseQuote
          text="And he told it to his father, and to his brethren: and his father rebuked him, and said unto him, What is this dream that thou hast dreamed? Shall I and thy mother and thy brethren indeed come to bow down ourselves to thee to the earth?"
          reference="Genesis 37:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jacob&apos;s rebuke is worth noticing. He does not dismiss the dream as nonsense. He
            questions it while clearly taking it seriously enough to name every member of the family
            in it, sun, moon, and eleven stars. Genesis closes the scene with one quiet line:
          </p>
        </div>
        <VerseQuote text="And his brethren envied him; but his father observed the saying." reference="Genesis 37:11" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Envied and observed sit next to each other on purpose.</strong> The brothers
            react with jealousy. Jacob reacts by holding onto the words. Neither response does
            anything to close the growing distance between Joseph and the rest of the family.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Sent Alone to Check on His Brothers (verses 12 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the resentment already at a boil, Jacob sends Joseph straight into it.</p>
        </div>
        <VerseQuote
          text="And Israel said unto Joseph, Do not thy brethren feed the flock in Shechem? come, and I will send thee unto them. And he said to him, Here am I."
          reference="Genesis 37:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Shechem is not a neutral location.</strong> It is the same town where Dinah
            was assaulted and where Simeon and Levi slaughtered every man in{" "}
            <ArticleLink href="/blog/genesis-34-explained">Genesis 34</ArticleLink>. Jacob sends his
            favorite son alone toward a place already soaked in his family&apos;s violence, with no
            hint that he sees any danger in it.
          </p>
          <p>Joseph does not even find them there. A stranger redirects him further out.</p>
        </div>
        <VerseQuote
          text="And the man said, They are departed hence; for I heard them say, Let us go to Dothan. And Joseph went after his brethren, and found them in Dothan."
          reference="Genesis 37:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Joseph could have turned back once his brothers were nowhere to be found. Instead he
            keeps walking, further from home and further from anyone who could help him, straight
            toward the men who already hate him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Plot to Kill the Dreamer (verses 18 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The brothers see him coming from a distance, and the plan forms before he is even close enough to speak.</p>
        </div>
        <VerseQuote
          text="And when they saw him afar off, even before he came near unto them, they conspired against him to slay him."
          reference="Genesis 37:18"
        />
        <VerseQuote
          text="And they said one to another, Behold, this dreamer cometh. Come now therefore, and let us slay him, and cast him into some pit, and we will say, Some evil beast hath devoured him: and we shall see what will become of his dreams."
          reference="Genesis 37:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;This dreamer&quot; is the name they give him now, not brother, not
            Joseph, just the thing about him they resent most.</strong> Their plan is not only to
            kill him but to erase the dreams along with him, as if silencing Joseph could undo
            whatever those dreams pointed toward.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Reuben&apos;s Rescue Attempt, and the Pit (verses 21 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One brother pulls back from the plan, though not by refusing it outright.</p>
        </div>
        <VerseQuote
          text="And Reuben heard it, and he delivered him out of their hands; and said, Let us not kill him."
          reference="Genesis 37:21"
        />
        <VerseQuote
          text="And Reuben said unto them, Shed no blood, but cast him into this pit that is in the wilderness, and lay no hand upon him; that he might rid him out of their hands, to deliver him to his father again."
          reference="Genesis 37:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Reuben does not confront his brothers directly. He redirects them toward a pit instead
            of a knife, with a private plan to come back later and pull Joseph out. It is a real
            rescue attempt, just a quiet, roundabout one rather than a bold refusal.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, when Joseph was come unto his brethren, that they stript Joseph out of his coat, his coat of many colours that was on him; And they took him, and cast him into a pit: and the pit was empty, there was no water in it."
          reference="Genesis 37:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The coat comes off before anything else happens.</strong> The exact thing that
            marked Joseph as their father&apos;s favorite is the first thing his brothers strip from
            him. Genesis even repeats the phrase, &quot;his coat of many colours,&quot; as if
            lingering on it before it disappears from his back for good.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Judah&apos;s Bargain, and the Sale to Egypt (verses 25 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With Joseph in the pit, his brothers sit down to eat, and a caravan passing by gives Judah an idea.</p>
        </div>
        <VerseQuote
          text="And Judah said unto his brethren, What profit is it if we slay our brother, and conceal his blood?"
          reference="Genesis 37:26"
        />
        <VerseQuote
          text="Come, and let us sell him to the Ishmeelites, and let not our hand be upon him; for he is our brother and our flesh. And his brethren were content."
          reference="Genesis 37:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Judah calls Joseph &quot;our brother and our flesh&quot; in the very sentence
            where he proposes selling him.</strong> It sounds like mercy compared to murder, and it
            still treats a brother as merchandise. Profit, not conscience, is the word Judah leads
            with.
          </p>
        </div>
        <VerseQuote
          text="Then there passed by Midianites merchantmen; and they drew and lifted up Joseph out of the pit, and sold Joseph to the Ishmeelites for twenty pieces of silver: and they brought Joseph into Egypt."
          reference="Genesis 37:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Twenty pieces of silver, the price of a slave, is what Joseph is worth to his own
            brothers. He is gone, sold south into Egypt, and the men who sold him still have to go
            home and face their father.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Bloody Coat, and a Father Who Refuses Comfort (verses 29 to 36)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Reuben returns to the pit to carry out his rescue and finds it already empty.</p>
        </div>
        <VerseQuote
          text="And Reuben returned unto the pit; and, behold, Joseph was not in the pit; and he rent his clothes."
          reference="Genesis 37:29"
        />
        <VerseQuote
          text="And he returned unto his brethren, and said, The child is not; and I, whither shall I go?"
          reference="Genesis 37:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Reuben&apos;s plan worked exactly as he intended, right up until it
            didn&apos;t.</strong> He kept Joseph alive, and still lost him. His question, &quot;I,
            whither shall I go,&quot; sounds like a man realizing he is about to answer for
            something he did not even do.
          </p>
          <p>The brothers settle on a story, and it requires one more use of the coat.</p>
        </div>
        <VerseQuote
          text="And they took Joseph's coat, and killed a kid of the goats, and dipped the coat in the blood; And they sent the coat of many colours, and they brought it to their father; and said, This have we found: know now whether it be thy son's coat or no."
          reference="Genesis 37:31 and 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jacob deceived his own father with a goat and a garment in{" "}
            <ArticleLink href="/blog/genesis-27-explained">Genesis 27</ArticleLink>, and now his sons
            deceive him the exact same way.</strong> A goat provides the blood, a garment carries the
            lie, and the deception Jacob once used on Isaac comes back on him through his own
            children.
          </p>
        </div>
        <VerseQuote
          text="And he knew it, and said, It is my son's coat; an evil beast hath devoured him; Joseph is without doubt rent in pieces."
          reference="Genesis 37:33"
        />
        <VerseQuote
          text="And Jacob rent his clothes, and put sackcloth upon his loins, and mourned for his son many days. And all his sons and all his daughters rose up to comfort him; but he refused to be comforted; and he said, For I will go down into the grave unto my son mourning. Thus his father wept for him."
          reference="Genesis 37:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Every one of Jacob&apos;s sons and daughters tries to comfort him, and he refuses all
            of it. The chapter closes on one final line, almost an afterthought, that tells the
            reader something Jacob does not yet know.
          </p>
        </div>
        <VerseQuote
          text="And the Midianites sold him into Egypt unto Potiphar, an officer of Pharaoh's, and captain of the guard."
          reference="Genesis 37:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jacob believes Joseph is dead. Genesis lets the reader know he is not.</strong>{" "}
            That gap between what Jacob thinks and what is actually true is what the rest of the
            Joseph story is built on.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 37 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Joseph&apos;s brothers actually sell him, or did the Midianites simply take
            him from the pit on their own?</strong> Verse 28 reads ambiguously in English, naming
            Midianites drawing Joseph up and selling him, right after Judah had just proposed selling
            him to Ishmeelites. Genesis 45:4 settles the question in Joseph&apos;s own words, spoken
            years later to the very men responsible:
          </p>
        </div>
        <VerseQuote
          text="And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt."
          reference="Genesis 45:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Whatever the exact mechanics of the transaction in Genesis 37:28, Joseph himself holds his
            brothers responsible for selling him, not the traders who happened to be passing by.
          </p>
          <p>
            <strong>Is it a contradiction that the chapter calls the traders both Ishmeelites and
            Midianites?</strong> Not necessarily. Scripture elsewhere uses the two names for the same
            group of desert traders. Judges 8:24 describes the very men Gideon defeated as Midianites
            in one verse and explains their gold earrings by calling them Ishmaelites in the next:
          </p>
        </div>
        <VerseQuote
          text="And Gideon said unto them, I would desire a request of you, that ye would give me every man the earrings of his prey. (For they had golden earrings, because they were Ishmaelites.)"
          reference="Judges 8:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The two names overlap elsewhere in the Old Testament, which fits a chapter that uses them
            interchangeably for the same caravan rather than describing two separate groups.
          </p>
          <p>
            <strong>What did &quot;a coat of many colours&quot; actually look like?</strong> The
            Hebrew phrase behind it is rare enough that translators are not fully certain, and some
            render it as a long robe with sleeves rather than a garment of many colors. The same
            phrase describes a royal garment in 2 Samuel 13, worn by the king&apos;s virgin
            daughters, which fits a coat meant to set Joseph apart rather than simply keep him warm.
          </p>
          <p>
            <strong>Was Reuben genuinely trying to save Joseph, or protecting himself as the
            oldest?</strong> Genesis records his private plan to return and rescue Joseph, which
            reads as a real intention to save him. As the firstborn, Reuben would also have carried
            the heaviest blame if Joseph turned up dead, so both a real concern for his brother and an
            awareness of his own exposure can sit inside the same choice.
          </p>
          <p>
            <strong>Why does Jacob send Joseph out alone, straight toward brothers who already hate
            him?</strong> Genesis gives no indication Jacob saw any danger in it. He appears to have
            no idea how far his sons&apos; hatred has actually grown, which is its own quiet
            commentary on a father too consumed with one son to notice what was happening to the
            rest of his family.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips From Genesis 37
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This chapter is hard to read, and it still has real weight for how you handle favor, envy, and family.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Notice what favoritism actually costs.</strong> Jacob&apos;s open preference for
            Joseph did not just wound the other brothers. It built the exact hatred that nearly got
            Joseph killed.
          </li>
          <li>
            <strong>Watch what you repeat from your own upbringing.</strong> Jacob grew up in a home
            split by favoritism and handed the same pattern to his own sons without seeming to notice.
          </li>
          <li>
            <strong>Be careful what you say out loud, even if it is true.</strong> Joseph&apos;s
            dreams may have been genuinely from God, and telling them to the brothers they placed
            beneath him only deepened the danger he was already in.
          </li>
          <li>
            <strong>A quiet rescue still counts as a rescue.</strong> Reuben never confronted his
            brothers outright, and his roundabout plan still kept Joseph alive long enough to be sold
            instead of killed.
          </li>
          <li>
            <strong>Watch for the moment profit replaces conscience.</strong> Judah&apos;s plan
            sounded better than murder and still turned his own brother into merchandise. Better than
            the worst option is not the same as right.
          </li>
          <li>
            <strong>What looks like the end of the story rarely is.</strong> Jacob mourned a son who
            was very much alive. You do not always see the whole picture in the moment you are
            grieving it.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 37
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 37:3 and 4</h3>
        <VerseQuote
          text="Now Israel loved Joseph more than all his children, because he was the son of his old age: and he made him a coat of many colours."
          reference="Genesis 37:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The favoritism that sets the whole chapter in motion, stated plainly before the hatred it
          causes is even named.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 37:19 and 20</h3>
        <VerseQuote
          text="And they said one to another, Behold, this dreamer cometh. Come now therefore, and let us slay him, and cast him into some pit, and we will say, Some evil beast hath devoured him: and we shall see what will become of his dreams."
          reference="Genesis 37:19 and 20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment the brothers&apos; hatred becomes an actual plan, aimed at silencing the dreams
          along with the dreamer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 37:26 and 27</h3>
        <VerseQuote
          text="And Judah said unto his brethren, What profit is it if we slay our brother, and conceal his blood? Come, and let us sell him to the Ishmeelites, and let not our hand be upon him; for he is our brother and our flesh. And his brethren were content."
          reference="Genesis 37:26 and 27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The bargain that spares Joseph&apos;s life and still sells him as property, calling him
          brother in the very sentence that prices him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 37:33</h3>
        <VerseQuote
          text="And he knew it, and said, It is my son's coat; an evil beast hath devoured him; Joseph is without doubt rent in pieces."
          reference="Genesis 37:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Jacob believing the very lie his own sons built from a goat and a coat, the same kind of
          deception he once used on his own father.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 37:35</h3>
        <VerseQuote
          text="And all his sons and all his daughters rose up to comfort him; but he refused to be comforted; and he said, For I will go down into the grave unto my son mourning. Thus his father wept for him."
          reference="Genesis 37:35"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A father&apos;s grief over a son the reader already knows is alive, closing the chapter on
          a loss that is not what it appears to be.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 37
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 37 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records Jacob openly favoring his son Joseph, the two dreams that convince Joseph&apos;s
          brothers he expects to rule over them, their plot to kill him, Reuben and Judah softening
          that plan into a sale, and Jacob being deceived into believing Joseph was killed by a wild
          animal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jacob love Joseph more than his other sons?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 37:3 says it was because Joseph was the son of his old age. Joseph was also one of
          only two sons born to Rachel, the wife Jacob loved most and who had died not long before
          this chapter opens.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Joseph&apos;s coat of many colours actually look like?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The exact Hebrew phrase is uncertain enough that scholars disagree, with some translating it
          as a coat of many colors and others as a long robe with sleeves. The same phrase appears in
          2 Samuel 13:18 describing a royal garment worn by a king&apos;s daughter, which fits a coat
          meant to mark Joseph as set apart.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were Joseph&apos;s two dreams about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The first showed his brothers&apos; sheaves of grain bowing to his own. The second showed
          the sun, moon, and eleven stars bowing to him, which his father understood as representing
          the whole family. Both dreams point to Joseph one day holding authority over his brothers.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Joseph&apos;s brothers sell him, or did the Midianites take him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 37:28 names both Midianites and Ishmeelites in the same transaction, which reads
          ambiguously on its own. Genesis 45:4 removes the ambiguity: Joseph himself tells his
          brothers plainly that they sold him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Reuben suggest the pit instead of stopping the murder outright?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 37:22 says Reuben privately intended to come back and rescue Joseph from the pit
          and return him to Jacob. Redirecting his brothers toward a pit rather than confronting them
          directly kept Joseph alive, even though Reuben&apos;s plan ultimately failed when the others
          sold Joseph before he could return.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How much did Joseph&apos;s brothers sell him for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 37:28 says twenty pieces of silver, the price of a slave in that era, paid by the
          Ishmeelite traders who carried him into Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Potiphar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 37:36 introduces him as an officer of Pharaoh and captain of the guard, the Egyptian
          official who buys Joseph once he arrives in Egypt. His household is where the next chapters
          of Joseph&apos;s story unfold.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 37 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It opens the story that fills the rest of Genesis, ending with Joseph second in command
          over Egypt and his family bowing before him exactly as his dreams once showed. Joseph later
          names the sale directly in Genesis 45 and 50, telling his brothers that what they meant for
          evil, God meant for good, in order to preserve the very family that sold him.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 37 ends with a father weeping over a son who is not actually dead.</p>
          <p>
            📌 <strong>Favoritism spoken out loud does real damage, and this family had already
            learned that lesson once before it repeated it.</strong> Jacob grew up inside a divided
            home and built the same kind of division in his own.
          </p>
          <p>
            📌 <strong>What looks like the worst outcome is not always the whole story.</strong>{" "}
            Jacob believed Joseph was gone for good. The reader already knows otherwise, and so does
            the rest of Genesis.
          </p>
          <p>
            📌 <strong>Deception has a way of returning to the one who first used it.</strong> A goat
            and a garment once helped Jacob deceive his own father. A goat and a coat now deceive
            Jacob in turn.
          </p>
          <p>You may know what it is like to be pushed out by the very people who should have protected you.</p>
          <p>So here is your one next step.</p>
          <p>
            Keep reading into the chapters that follow, and watch what God does with a story that
            looks, right now, like it has already ended badly.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
