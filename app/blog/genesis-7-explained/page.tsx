import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-7-explained", {
  title: "Genesis 7 Explained: The Flood Begins and the Ark Door Shuts",
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

export default function GenesisSevenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-7-explained"
      title={<>📖 Genesis 7 Explained: The Flood Begins and the Ark Door Shuts</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Seven days of warning left. Then one door closes, and nobody on the outside opens it again.</p>
            <p>
              <strong>Genesis 7 explained</strong> is the chapter where everything Genesis 6 set up
              finally gets used. The ark stops being a strange project Noah&apos;s neighbors laughed
              at and becomes the only dry ground left on earth.
            </p>
            <p>Maybe you have wondered what actually happened once Noah walked through that door.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ How did two of every animal on earth end up inside one boat?</li>
            <li>❓ Why does God ask for sevens of some animals and only twos of others?</li>
            <li>❓ Who actually shut the door once everyone was inside?</li>
            <li>❓ Did anyone outside the ark survive what came next?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Noah does not shut himself in. Genesis 7 says the LORD does it for
              him.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the last personal
              invitation before the flood, the sevens and twos of the animals, the door only God
              could close, and the water that erased everything except one floating family.
            </p>
            <p>This is the chapter where all of Noah&apos;s waiting finally ends.</p>
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
            <ArticleLink href="/blog/genesis-6-explained">Genesis 6</ArticleLink> ended with an ark
            finished to exact measurements, sealed with pitch inside and out, and a covenant
            already promised to keep Noah and his family alive through the coming flood.
          </p>
          <p>
            That chapter closed on a single line about Noah&apos;s character: he did everything
            God commanded him, exactly as commanded. Genesis 7 is where that obedience stops being
            words on a page and starts being tested for real.
          </p>
          <p>
            📌 <strong>Genesis 6 was preparation. Genesis 7 is arrival.</strong> The blueprint
            becomes a boarding, and the boarding becomes a flood.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 7 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. &quot;Come Thou Into the Ark&quot; (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a personal word from the LORD to Noah, not a general command shouted at the world.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."
          reference="Genesis 7:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the verb. &quot;Come thou,&quot; not &quot;go thou.&quot;</strong> God
            does not point Noah toward the ark from a distance. He speaks as though He is already
            there, inviting Noah into a space where He is present. &quot;Seen righteous before me
            in this generation&quot; measures Noah against the people around him, not against a
            standard of sinless perfection.
          </p>
          <p>Then comes a detail Genesis 6 never mentioned.</p>
        </div>
        <VerseQuote
          text="Of every clean beast thou shalt take to thee by sevens, the male and his female: and of beasts that are not clean by two, the male and his female. Of fowls also of the air by sevens, the male and the female; to keep seed alive upon the face of all the earth."
          reference="Genesis 7:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 6:19 only said two of every sort. Here God adds a refinement: seven of every
            clean animal, and two of every unclean one. Most readers take &quot;by sevens&quot; as
            seven pairs, fourteen animals total, since each unit is already described as &quot;the
            male and his female.&quot;
          </p>
          <p>
            💡 <strong>&quot;Clean&quot; and &quot;unclean&quot; show up here centuries before
            Moses ever writes the food laws in Leviticus.</strong> Genesis 7 does not explain how
            Noah knew which animals counted as clean, only that the category already existed.
            Extra clean animals also explain how Noah has anything left to sacrifice once the ark
            empties out in the next chapter, without wiping out an entire kind in the process.
          </p>
          <p>The warning then comes with an exact number attached.</p>
        </div>
        <VerseQuote
          text="For yet seven days, and I will cause it to rain upon the earth forty days and forty nights; and every living substance that I have made will I destroy from off the face of the earth."
          reference="Genesis 7:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven days to finish loading. Then <ArticleLink href="/blog/biblical-numbers-meanings">forty days and forty nights</ArticleLink>{" "}
            of rain, a number that shows up again and again in Scripture wherever testing is
            underway. This chapter alone repeats &quot;forty&quot; five separate times.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Six Hundred Years Old, and Obedient (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The text pauses to mark exactly how old Noah is when the countdown starts.</p>
        </div>
        <VerseQuote
          text="And Noah did according unto all that the LORD commanded him. And Noah was six hundred years old when the flood of waters was upon the earth."
          reference="Genesis 7:5 and 6"
        />
        <VerseQuote
          text="And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood. Of clean beasts, and of beasts that are not clean, and of fowls, and of every thing that creepeth upon the earth, There went in two and two unto Noah into the ark, the male and the female, as God had commanded Noah."
          reference="Genesis 7:7 to 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The phrase &quot;commanded him&quot; or &quot;commanded Noah&quot; appears
            three separate times in this one chapter,</strong> in verses 5, 9, and again later at
            the door. Scripture is not letting the reader forget whose instructions are being
            followed here.
          </p>
          <p>
            Notice also who moves toward whom. The animals &quot;went in unto Noah,&quot; not the
            other way around. Noah does not spend these verses chasing creatures across the earth.
            Hebrews later says he acted &quot;moved with fear,&quot; preparing the ark by faith in
            a warning he could not yet see, which fits a man who trusted God to bring the animals
            rather than one who tried to control every detail himself. That same trust is what
            earns Noah a place among the small handful of men Scripture describes as{" "}
            <ArticleLink href="/blog/men-who-walked-with-god">walking with God</ArticleLink>.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Fountains and the Windows (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Seven days pass exactly as promised, and the text marks the date with unusual precision.</p>
        </div>
        <VerseQuote
          text="And it came to pass after seven days, that the waters of the flood were upon the earth. In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights."
          reference="Genesis 7:10 to 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The seventeenth day of the second month, in Noah&apos;s six hundredth year, is the
            exact year the math in{" "}
            <ArticleLink href="/blog/genesis-5-explained">Genesis 5&apos;s genealogy</ArticleLink>{" "}
            already pointed toward.
          </p>
          <p>
            📌 <strong>Two separate sources of water break loose at once: fountains from below and
            windows from above.</strong> Genesis 1 described God dividing the waters, some under a
            firmament He called Heaven and some above it.
          </p>
        </div>
        <VerseQuote
          text="And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so."
          reference="Genesis 1:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 7:11 reads like that ordering coming undone. The boundary God set on day two of
            creation gives way, and the world that emerged from water in the beginning starts
            sliding back into it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The LORD Shuts the Door (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The whole household and every kind of creature finish boarding on the very day the rain starts.</p>
        </div>
        <VerseQuote
          text="In the selfsame day entered Noah, and Shem, and Ham, and Japheth, the sons of Noah, and Noah's wife, and the three wives of his sons with them, into the ark; They, and every beast after his kind, and all the cattle after their kind, and every creeping thing that creepeth upon the earth after his kind, and every fowl after his kind, every bird of every sort."
          reference="Genesis 7:13 and 14"
        />
        <VerseQuote
          text="And they went in unto Noah into the ark, two and two of all flesh, wherein is the breath of life. And they that went in, went in male and female of all flesh, as God had commanded him: and the LORD shut him in."
          reference="Genesis 7:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Six words end this section, and they carry the whole chapter&apos;s
            weight: &quot;and the LORD shut him in.&quot;</strong> Not Noah pulling a bolt across
            the door out of caution. God Himself closes it.
          </p>
          <p>
            ⚠️ Once that door shuts, nothing more is left for Noah to do either way. Whatever
            safety the ark offered was already sealed in place before the first drop of rain fell,
            entirely out of Noah&apos;s hands from that point forward.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Ark Lifted Above the Mountains (verses 17 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the door shut, the text turns from the people inside to the water rising outside.</p>
        </div>
        <VerseQuote
          text="And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters."
          reference="Genesis 7:17 and 18"
        />
        <VerseQuote
          text="And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered."
          reference="Genesis 7:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Fifteen cubits, roughly twenty two feet, over the highest ground Noah could
            see.</strong> That is enough depth to leave nothing showing anywhere on the horizon,
            not a partial flood leaving dry patches for anyone to escape to.
          </p>
          <p>
            How wide that horizon reached is the same question already raised in{" "}
            <ArticleLink href="/blog/genesis-6-explained">Genesis 6</ArticleLink>, and Genesis 7
            does not settle it either. What this verse adds is not the flood&apos;s geography but
            its depth: wherever the water reached, it reached completely.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Only Noah Remained (verses 21 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the starkest language in it, stated three separate ways.</p>
        </div>
        <VerseQuote
          text="And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man: All in whose nostrils was the breath of life, of all that was in the dry land, died. And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark."
          reference="Genesis 7:21 to 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Died,&quot; then &quot;died&quot; again, then &quot;destroyed&quot; twice more.
            Scripture rarely repeats itself this many times in three verses. The point is not
            variety of vocabulary. It is that no reader walks away thinking anyone was spared
            outside that one boat.
          </p>
          <p>
            💡 Count the people named across this chapter, Noah, his wife, his three sons, and
            their three wives, and the number comes to eight. Peter later calls Noah exactly that:
          </p>
        </div>
        <VerseQuote
          text="Which sometime were disobedient, when once the longsuffering of God waited in the days of Noah, while the ark was a preparing, wherein few, that is, eight souls were saved by water."
          reference="1 Peter 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eight people, saved through water rather than from it. Peter goes on to call that
            water a picture of baptism, the same pattern of judgment and rescue arriving together
            that has run through every chapter since{" "}
            <ArticleLink href="/blog/genesis-3-explained">the garden</ArticleLink>.
          </p>
        </div>
        <VerseQuote text="And the waters prevailed upon the earth an hundred and fifty days." reference="Genesis 7:24" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Forty days of rain, then a hundred and fifty days of water still standing over the
            earth before anything begins to recede. The waiting Noah did before the flood was
            matched by a long wait still ahead of him inside it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 7 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Could every land animal on earth really fit inside one ark?</strong> Genesis 6
            already gave the ark&apos;s size, roughly 450 feet long, and Genesis 7 does not add new
            dimensions. What it does add is that the animals are gathered by &quot;kind,&quot; a
            broader category than a modern species classification, which means far fewer distinct
            groups needed boarding than a full list of every animal alive today. Genesis 7 states
            what came aboard. It does not give a total count, so any specific figure beyond that is
            an estimate, not the text.
          </p>
          <p>
            <strong>Why sevens of clean animals but only two of unclean, before Moses ever wrote
            down which animals counted as which?</strong> The text assumes Noah already understood
            the distinction without explaining where it came from. What is clear from the numbers
            themselves is a practical reason: seven of a kind leaves animals left over for
            sacrifice and future food once the flood ends, while two of a kind preserves a species
            without spare individuals to lose.
          </p>
          <p>
            <strong>Did literally no one outside the ark survive?</strong> Verse 23 states it as
            plainly as Scripture states anything: &quot;Noah only remained alive, and they that
            were with him in the ark.&quot; Jesus later describes the people outside as going about
            ordinary life, &quot;eating and drinking, marrying and giving in marriage,&quot; right
            up until the flood came and &quot;took them all away.&quot; Nothing in either passage
            leaves room for other survivors.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 7:1</h3>
        <VerseQuote
          text="And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."
          reference="Genesis 7:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A personal invitation, not a distant command. God speaks as though He is already inside
          the ark, calling Noah toward His presence rather than simply away from danger.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 7:5</h3>
        <VerseQuote text="And Noah did according unto all that the LORD commanded him." reference="Genesis 7:5" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same obedience already praised at the end of Genesis 6, now repeated right as the
          real test of that obedience begins.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 7:16</h3>
        <VerseQuote text="And the LORD shut him in." reference="Genesis 7:16" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Six words carrying the weight of the whole chapter. Noah&apos;s safety was sealed by
          God&apos;s own hand, not by anything Noah did to secure the door himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 7:23</h3>
        <VerseQuote
          text="And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark."
          reference="Genesis 7:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The starkest sentence in the chapter, and the clearest picture of how completely one
          family was set apart from the judgment falling on everyone else.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 7:24</h3>
        <VerseQuote text="And the waters prevailed upon the earth an hundred and fifty days." reference="Genesis 7:24" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The forty days of rain get most of the attention, but the flood actually stood over the
          earth nearly four times that long before the water even began to go down.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Genesis 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Noah and his family board the ark with the animals God sends to them, the LORD shuts the
          door, and the flood covers the earth for forty days of rain and a hundred and fifty days
          of standing water, destroying every living thing outside the ark.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Noah when the flood came?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 7:6 states his age directly: six hundred years old, on the seventeenth day of the
          second month of that year, according to verse 11.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many of each animal went into the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two of every unclean animal, male and female, and seven of every clean animal, most
          likely seven pairs. Genesis 6:19 first gave the general command of two by two; Genesis
          7:2 adds the clean and unclean distinction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God want seven of the clean animals but only two of the unclean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not explain the reasoning directly, but the extra clean animals line up
          with what happens next in Genesis 8, where Noah offers burnt sacrifices once the flood
          ends. Two would have left nothing to sacrifice without ending the species entirely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who shut the door of the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 7:16 says plainly that the LORD shut Noah in, not Noah himself. It is one of the
          clearest pictures in the Old Testament of safety that depends on God rather than on human effort.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did it rain during the flood in Genesis 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Forty days and forty nights, stated in verses 4 and 12. The rain was only the beginning;
          the water it produced stayed high for far longer than the rain itself lasted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did the floodwaters stay high?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 7:24 gives the number directly: a hundred and fifty days, well beyond the forty
          days of actual rainfall.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the fountains of the great deep&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a second source of water rising up from below the earth, breaking loose at
          the same moment the &quot;windows of heaven&quot; opened above. Together they reverse the
          separation of waters God set in place on the second day of creation in Genesis 1:7.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Could Noah really fit every land animal on earth into one ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 7 describes animals gathered by broader &quot;kind&quot; rather than by every
          individual species known today, and does not give a total number. The ark&apos;s size was
          already described in Genesis 6 as roughly 450 feet long with three levels, but Genesis 7
          itself leaves exact capacity unstated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many people survived the flood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eight: Noah, his wife, his three sons, and their three wives. 1 Peter 3:20 confirms the
          same count, calling them &quot;eight souls saved by water.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did anyone outside the ark survive the flood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 7:23 states that Noah and those with him in the ark were the only ones left
          alive. Matthew 24:38 and 39 describe everyone else going about ordinary life until the
          flood came and took them all away, with no mention of any other survivors.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 7 is not really about weather. It is about what it looks like when a promise finally comes due.</p>
          <p>
            📌 <strong>God&apos;s invitation was personal, not distant.</strong> &quot;Come
            thou&quot; sounds like Someone already present, calling Noah toward Him rather than
            merely warning him away from danger.
          </p>
          <p>
            📌 <strong>Noah&apos;s safety was sealed by God&apos;s hand, not his own.</strong> The
            LORD shut the door. Nothing Noah did afterward could have made him any safer, and
            nothing outside could get in.
          </p>
          <p>
            📌 <strong>Total judgment fell, and eight people floated safely on top of it.</strong>{" "}
            The same water that destroyed everything else was the very thing keeping the ark, and
            everyone in it, alive.
          </p>
          <p>You are not on an ark waiting for rain. But you know what it feels like to wait on a promise that has not landed yet.</p>
          <p>So here is your one next step.</p>
          <p>
            Read Genesis 7:16 again, slowly, and let &quot;the LORD shut him in&quot; be the
            picture you carry into whatever you are waiting on right now.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
