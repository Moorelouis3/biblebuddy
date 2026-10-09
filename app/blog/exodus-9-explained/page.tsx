import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-9-explained", {
  title: "Exodus 9 Explained: Boils, Hail, and a Name Declared to Egypt",
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

export default function ExodusNineExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-9-explained"
      title={<>📖 Exodus 9 Explained: Boils, Hail, and a Name Declared to Egypt</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The cattle in the field start dying. Then the sores appear on skin. Then fire falls out of the sky.</p>
            <p>
              <strong>Exodus 9 explained</strong> is the chapter where the plagues stop being an
              inconvenience Pharaoh can wait out and start taking lives and bodies directly. Three
              plagues land in these verses, and for the first time, Pharaoh&apos;s own magicians are
              not just outperformed. They are personally struck down by the very disease they used
              to study from a safe distance.
            </p>
            <p>Maybe you have said the right words under pressure without actually meaning to change anything.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What is a murrain, and why does it target cattle specifically?</li>
            <li>❓ Why can the magicians not even stand up in this chapter?</li>
            <li>❓ Why does God say He raised Pharaoh up for this exact purpose?</li>
            <li>❓ And why does the hail skip some Egyptians but not others?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 9 is the chapter where God states, out loud, exactly why this is
              happening, and Pharaoh still cannot get past saying the right words.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 9 in order: the cattle disease that kills what
              Egypt cannot replace, the boils that reach the magicians themselves, the long speech
              where God names His own purpose in full, the Egyptians who get a choice the earlier
              plagues never offered, the worst hailstorm Egypt had ever seen, and Pharaoh&apos;s
              fastest return to a hardened heart yet.
            </p>
            <p>Watch how close Pharaoh gets to the truth in this chapter, and how little it changes him.</p>
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
            <ArticleLink href="/blog/exodus-8-explained">Exodus 8</ArticleLink> ended with Pharaoh
            offering Moses a worship arrangement that kept Israel inside Egypt, then a worship
            arrangement that kept them close by, and rejecting the real request both times. The
            flies lifted the moment Moses prayed, and Pharaoh hardened his heart a third time in
            that one chapter alone, breaking the pattern down to its bare mechanics: pressure,
            promise, relief, nothing.
          </p>
          <p>
            Exodus 9 opens with God sending Moses back in again, and this time the
            plagues stop touching only Egypt&apos;s water and its dust. They start touching
            Egypt&apos;s food supply, its own people&apos;s bodies, and finally its crops.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 9 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Fifth Plague: Death Comes to the Cattle (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God sends the same demand He has sent three times already, with a new kind of warning attached.</p>
        </div>
        <VerseQuote
          text="Then the LORD said unto Moses, Go in unto Pharaoh, and tell him, Thus saith the LORD God of the Hebrews, Let my people go, that they may serve me."
          reference="Exodus 9:1"
        />
        <VerseQuote
          text="For if thou refuse to let them go, and wilt hold them still, Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain."
          reference="Exodus 9:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Murrain</strong> is an old English word for a disease that kills livestock. Every
            working animal Egypt owns is named one at a time: horses, donkeys, camels, oxen, sheep.
            This is not a plague on an inconvenience. It is a plague on the animals that plow the
            fields, carry the loads, and feed the people.
          </p>
          <p>Then comes a line that had not appeared this plainly before.</p>
        </div>
        <VerseQuote
          text="And the LORD shall sever between the cattle of Israel and the cattle of Egypt: and there shall nothing die of all that is the children's of Israel."
          reference="Exodus 9:4"
        />
        <VerseQuote
          text="And the LORD appointed a set time, saying, To morrow the LORD shall do this thing in the land."
          reference="Exodus 9:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God names the day before it happens, and names which animals will live before
            a single one dies.</strong> Nothing here is left for Pharaoh to explain away later as an
            unlucky coincidence of weather or disease moving through the region on its own.
          </p>
        </div>
        <VerseQuote
          text="And the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one."
          reference="Exodus 9:6"
        />
        <VerseQuote
          text="And Pharaoh sent, and, behold, there was not one of the cattle of the Israelites dead. And the heart of Pharaoh was hardened, and he did not let the people go."
          reference="Exodus 9:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Pharaoh does not take anyone else&apos;s word for this. He sends his own people to
            check Israel&apos;s herds with his own eyes. The report comes back exactly as God said it
            would, and it changes nothing. Notice too what is missing from this plague that was
            present in every earlier one: no magician steps forward to copy it. Dead animals cannot
            be faked, and for the first time nobody even tries.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Boils That Strike the Magicians Themselves (verses 8 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The sixth plague comes without a warning sent to Pharaoh first.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses and unto Aaron, Take to you handfuls of ashes of the furnace, and let Moses sprinkle it toward the heaven in the sight of Pharaoh."
          reference="Exodus 9:8"
        />
        <VerseQuote
          text="And it shall become small dust in all the land of Egypt, and shall be a boil breaking forth with blains upon man, and upon beast, throughout all the land of Egypt."
          reference="Exodus 9:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Blains</strong> is an old word for swellings or sores, paired here with boils to
            describe something painful breaking out across skin. This time the plague comes from
            ash thrown into the air rather than from the river or the ground, striking the
            Egyptians&apos; own bodies directly for the first time in the book.
          </p>
        </div>
        <VerseQuote
          text="And they took ashes of the furnace, and stood before Pharaoh; and Moses sprinkled it up toward heaven; and it became a boil breaking forth with blains upon man, and upon beast."
          reference="Exodus 9:10"
        />
        <VerseQuote
          text="And the magicians could not stand before Moses because of the boils; for the boil was upon the magicians, and upon all the Egyptians."
          reference="Exodus 9:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In every earlier contest, the magicians lost by failing to copy a sign. Here,
            they lose by becoming part of the plague they once tried to reproduce.</strong> They
            cannot even stand in Pharaoh&apos;s court, let alone perform. The men Pharaoh once called
            in to answer <ArticleLink href="/blog/exodus-7-explained">Aaron&apos;s rod</ArticleLink>
            {" "}are now too sick to appear at all.
          </p>
        </div>
        <VerseQuote
          text="And the LORD hardened the heart of Pharaoh, and he hearkened not unto them; as the LORD had spoken unto Moses."
          reference="Exodus 9:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the first time in Exodus that the text says plainly the LORD hardened
            Pharaoh&apos;s heart, rather than saying Pharaoh&apos;s heart simply was hardened. The
            wording shifts from verse to verse across this chapter, and it is worth watching closely
            as the chapter goes on.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why God Says He Raised Pharaoh Up (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the seventh plague falls, God gives Moses the longest speech of the confrontation so far.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Rise up early in the morning, and stand before Pharaoh, and say unto him, Thus saith the LORD God of the Hebrews, Let my people go, that they may serve me."
          reference="Exodus 9:13"
        />
        <VerseQuote
          text="For I will at this time send all my plagues upon thine heart, and upon thy servants, and upon thy people; that thou mayest know that there is none like me in all the earth."
          reference="Exodus 9:14"
        />
        <VerseQuote
          text="For now I will stretch out my hand, that I may smite thee and thy people with pestilence; and thou shalt be cut off from the earth."
          reference="Exodus 9:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God tells Pharaoh plainly that He could have ended this already. The plagues so far
            have been restraint, not the full weight of what could fall on Egypt. Then comes the
            verse that explains the whole confrontation from God&apos;s side.
          </p>
        </div>
        <VerseQuote
          text="And in very deed for this cause have I raised thee up, for to shew in thee my power; and that my name may be declared throughout all the earth."
          reference="Exodus 9:16"
        />
        <VerseQuote
          text="As yet exaltest thou thyself against my people, that thou wilt not let them go?"
          reference="Exodus 9:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God names His own purpose out loud, in the middle of the story, instead of
            leaving it for the reader to guess.</strong> Pharaoh was not raised up by accident into
            a position to defy God. His resistance itself becomes the stage on which God&apos;s power
            and name get shown to the whole earth, not only to Egypt.
          </p>
          <p>
            Centuries later, Paul draws this same declaration straight into Romans 9:17 while
            writing about how God works out His purposes even through a hardened king. It is one of
            the clearest straight lines in Scripture between an Old Testament event and a New
            Testament argument about God&apos;s sovereignty.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Warning the Egyptians Could Actually Act On (verses 18 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>For the first time, God tells Egypt exactly what to do to avoid the coming disaster.</p>
        </div>
        <VerseQuote
          text="Behold, to morrow about this time I will cause it to rain a very grievous hail, such as hath not been in Egypt since the foundation thereof even until now."
          reference="Exodus 9:18"
        />
        <VerseQuote
          text="Send therefore now, and gather thy cattle, and all that thou hast in the field; for upon every man and beast which shall be found in the field, and shall not be brought home, the hail shall come down upon them, and they shall die."
          reference="Exodus 9:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Egypt splits into two groups, and the line between them has nothing to do with being Egyptian or Hebrew.</p>
        </div>
        <VerseQuote
          text="He that feared the word of the LORD among the servants of Pharaoh made his servants and his cattle flee into the houses:"
          reference="Exodus 9:20"
        />
        <VerseQuote
          text="And he that regarded not the word of the LORD left his servants and his cattle in the field."
          reference="Exodus 9:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every earlier plague drew the line at the border of Goshen. This one draws the
            line at whoever actually believed the warning.</strong> Some of Pharaoh&apos;s own
            servants feared the word of the LORD enough to act on it, and the text says plainly that
            those servants, and their animals, were spared. Being Egyptian did not decide the
            outcome here. What a person did with the warning did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Worst Hail Egypt Had Ever Seen (verses 22 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses raises his rod, and the storm God described arrives exactly as promised.</p>
        </div>
        <VerseQuote
          text="And Moses stretched forth his rod toward heaven: and the LORD sent thunder and hail, and the fire ran along upon the ground; and the LORD rained hail upon the land of Egypt."
          reference="Exodus 9:23"
        />
        <VerseQuote
          text="So there was hail, and fire mingled with the hail, very grievous, such as there was none like it in all the land of Egypt since it became a nation."
          reference="Exodus 9:24"
        />
        <VerseQuote
          text="And the hail smote throughout all the land of Egypt all that was in the field, both man and beast; and the hail smote every herb of the field, and brake every tree of the field."
          reference="Exodus 9:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Fire mixed inside falling ice is not ordinary weather, and the text does not pretend
            otherwise, calling it something Egypt had never once seen since it became a nation.
            Crops, trees, and anyone caught outside all suffer the same damage.
          </p>
        </div>
        <VerseQuote
          text="Only in the land of Goshen, where the children of Israel were, was there no hail."
          reference="Exodus 9:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The national line reappears here even after verses 20 and 21 already showed a line drawn
            by belief rather than birth.{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> is watching both kinds of mercy work
            at the same time: the fearful Egyptian servant spared in his own house, and the whole
            territory of Goshen spared outright.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Pharaoh&apos;s Clearest Confession, and the Fastest Hardening Yet (verses 27 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>For the first time in the book, Pharaoh says something that sounds like an admission of guilt.</p>
        </div>
        <VerseQuote
          text="And Pharaoh sent, and called for Moses and Aaron, and said unto them, I have sinned this time: the LORD is righteous, and I and my people are wicked."
          reference="Exodus 9:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No earlier plague produced words this direct.</strong> Pharaoh does not just
            ask for relief this time. He says the LORD is righteous and names his own people wicked,
            closer to real confession than anything he has said through the six plagues before this one.
          </p>
        </div>
        <VerseQuote
          text="Intreat the LORD (for it is enough) that there be no more mighty thunderings and hail; and I will let you go, and ye shall stay no longer."
          reference="Exodus 9:28"
        />
        <VerseQuote
          text="And Moses said unto him, As soon as I am gone out of the city, I will spread abroad my hands unto the LORD; and the thunder shall cease, neither shall there be any more hail; that thou mayest know how that the earth is the LORD's."
          reference="Exodus 9:29"
        />
        <VerseQuote
          text="But as for thee and thy servants, I know that ye will not yet fear the LORD God."
          reference="Exodus 9:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Moses says yes to the request and tells Pharaoh to his face that the words will not
            hold. He has watched this exact pattern three plagues running and names it again before
            it happens a fourth time.
          </p>
        </div>
        <VerseQuote
          text="And the flax and the barley was smitten: for the barley was in the ear, and the flax was bolled."
          reference="Exodus 9:31"
        />
        <VerseQuote
          text="But the wheat and the rie were not smitten: for they were not grown up."
          reference="Exodus 9:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Barley ripens earlier in the Egyptian growing season than wheat, which is exactly why
            one crop stood tall enough to be destroyed while the other was still low to the ground.
            A small farming detail like this is easy to skip past, but it fits the real agricultural
            calendar of Egypt rather than a vague, generic disaster.
          </p>
        </div>
        <VerseQuote
          text="And Moses went out of the city from Pharaoh, and spread abroad his hands unto the LORD: and the thunders and hail ceased, and the rain was not poured upon the earth."
          reference="Exodus 9:33"
        />
        <VerseQuote
          text="And when Pharaoh saw that the rain and the hail and the thunders were ceased, he sinned yet more, and hardened his heart, he and his servants."
          reference="Exodus 9:34"
        />
        <VerseQuote
          text="And the heart of Pharaoh was hardened, neither would he let the children of Israel go; as the LORD had spoken by Moses."
          reference="Exodus 9:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Verse 34 does not just say Pharaoh hardened again. It says he sinned yet
            more.</strong> The man who said two verses earlier that he and his people were wicked
            turns around and adds to that same guilt the moment the sky clears. Watch the grammar
            across this one chapter: the LORD hardened him in verse 12, Pharaoh hardened himself in
            verse 34, and his heart simply was hardened in verses 7 and 35. Scripture holds all three
            without flattening any of them into the others.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 9 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did God harden Pharaoh&apos;s heart, or did Pharaoh harden his own?</strong>{" "}
            Exodus 9 uses both kinds of language inside the same chapter. Verse 12 says the LORD
            hardened Pharaoh&apos;s heart. Verse 34 says Pharaoh himself hardened his heart and
            sinned yet more. Verses 7 and 35 simply state that his heart was hardened, without
            naming who did it. The text never resolves the two into one simple mechanism. It presents
            God&apos;s active role and Pharaoh&apos;s own choice as both real at once.
          </p>
          <p>
            <strong>What does it mean that God raised Pharaoh up for this purpose?</strong> Exodus
            9:16 states that God placed Pharaoh in this exact position to show His power and declare
            His name throughout the earth. Paul quotes this verse directly in Romans 9:17 while
            defending God&apos;s right to work His purposes through whoever He chooses, including a
            king who refuses Him. Christians have long debated how far this extends to questions of
            free will and divine sovereignty in general, and the honest answer is that serious,
            Bible believing thinkers land in different places on that larger question. What Exodus 9
            itself states plainly is narrower: Pharaoh&apos;s specific resistance served God&apos;s
            specific purpose of making His name known.
          </p>
          <p>
            <strong>Was Pharaoh&apos;s confession in verse 27 real repentance?</strong> He says the
            LORD is righteous and calls his own people wicked, words no earlier plague produced from
            him. But Moses answers him in verse 30 by predicting he still will not fear the LORD, and
            verse 34 confirms it within the same chapter. Exodus draws a distinction between saying
            true words under pressure and actually being changed by them, and lets Pharaoh&apos;s own
            next move make the distinction rather than stating it as a rule.
          </p>
          <p>
            <strong>Why were some Egyptians spared from the hail and others were not?</strong>{" "}
            Verses 20 and 21 say plainly that it came down to who feared the word of the LORD enough
            to bring themselves and their animals indoors. This sits inside the same chapter as the
            land of Goshen being spared entirely in verse 26, so the chapter shows mercy working
            along two different lines at once: one drawn by where Israel lived, and one drawn by who
            believed the warning regardless of where they lived.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 9:16</h3>
        <VerseQuote
          text="And in very deed for this cause have I raised thee up, for to shew in thee my power; and that my name may be declared throughout all the earth."
          reference="Exodus 9:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God states His own purpose in the middle of the story rather than leaving it hidden, and
          Paul draws this same declaration into his own argument centuries later in Romans 9:17.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 9:27</h3>
        <VerseQuote
          text="And Pharaoh sent, and called for Moses and Aaron, and said unto them, I have sinned this time: the LORD is righteous, and I and my people are wicked."
          reference="Exodus 9:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most direct words Pharaoh has spoken yet, and still not enough to outlast the storm
          clearing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 9:11</h3>
        <VerseQuote
          text="And the magicians could not stand before Moses because of the boils; for the boil was upon the magicians, and upon all the Egyptians."
          reference="Exodus 9:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The men who once matched Aaron&apos;s signs become part of the next plague instead of its
          audience.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 9:20</h3>
        <VerseQuote
          text="He that feared the word of the LORD among the servants of Pharaoh made his servants and his cattle flee into the houses:"
          reference="Exodus 9:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A line drawn by belief rather than birth, inside the household of the very king refusing
          to listen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Romans 9:17</h3>
        <VerseQuote
          text="For the scripture saith unto Pharaoh, Even for this same purpose have I raised thee up, that I might shew my power in thee, and that my name might be declared throughout all the earth."
          reference="Romans 9:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul reaches back to this same declaration from Exodus 9:16, treating Pharaoh&apos;s own
          story as proof inside his own argument about God.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Three plagues strike Egypt in order: a disease that kills Egypt&apos;s livestock while
          Israel&apos;s survives, boils that strike every Egyptian including Pharaoh&apos;s own
          magicians, and the worst hailstorm Egypt had ever known. God also tells Pharaoh plainly
          why He raised him up, and Pharaoh confesses he has sinned before hardening his heart again
          once the hail stops.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is murrain in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Murrain is an old English word used in Exodus 9:3 for a disease that kills livestock.
          The fifth plague struck every kind of Egyptian animal named in that verse while leaving
          Israel&apos;s herds untouched.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t the magicians copy the plague of boils?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 9:11 says they could not even stand before Moses, because the boils were on the
          magicians themselves. This plague did not just defeat their power. It made them part of
          the disaster rather than observers of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;I have raised thee up&quot; mean in Exodus 9:16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means God placed Pharaoh in his position specifically so that God&apos;s power and name
          would be made known through the confrontation. Paul quotes this verse directly in Romans
          9:17 to make the same point centuries later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 9 say God hardened Pharaoh&apos;s heart or Pharaoh hardened his own?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both appear in this single chapter. Verse 12 says the LORD hardened it. Verse 34 says
          Pharaoh hardened his own heart and sinned yet more. Scripture states both as true without
          resolving them into one simple cause.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were some Egyptians spared from the hail?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 9:20 says it came down to who feared the word of the LORD enough to bring
          themselves and their animals indoors before the storm. That line ran through
          Pharaoh&apos;s own household, not only along Egypt&apos;s border with Goshen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the hail destroy the barley and flax but not the wheat?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 9:31 and 32 explain it directly: the barley and flax were already grown and
          exposed, while the wheat and rie had not grown up enough yet to be struck the same way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Pharaoh&apos;s confession in Exodus 9:27 genuine repentance?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses did not think so. He tells Pharaoh in verse 30 that he and his servants still will
          not fear the LORD, and verse 34 shows Pharaoh hardening his heart again the moment the
          hail clears.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 9 connect to the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Romans 9:17 draws directly on Exodus 9:16, using God&apos;s stated purpose for Pharaoh as
          part of Paul&apos;s argument about God&apos;s sovereignty over who He raises up and who He
          hardens.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 9 is the chapter where Pharaoh finally says almost everything right, and it still is not enough.</p>
          <p>
            📌 <strong>Saying the truth about God is not the same as fearing Him.</strong>{" "}
            Pharaoh called the LORD righteous and his own people wicked, closer to a real confession
            than anything he had said before, and hardened his heart again within the same chapter.
          </p>
          <p>
            📌 <strong>God never hid His purpose in this confrontation.</strong> Exodus 9:16 states
            plainly why Pharaoh was raised up, and Paul leans on that exact verse generations later
            to make his own case about God&apos;s sovereignty.
          </p>
          <p>
            📌 <strong>Mercy in this chapter did not only follow a border.</strong> Some of
            Pharaoh&apos;s own servants feared the word of the LORD and were spared inside Egypt
            itself, proof that the line was never only about which side of Goshen someone lived on.
          </p>
          <p>
            You may have said the right words to God under pressure before, the way Pharaoh did,
            without letting them cost you anything once the pressure lifted.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask whether a recent confession of yours was Pharaoh&apos;s kind, true words with no
            follow through, or the kind that actually feared God enough to act before the storm hit.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
