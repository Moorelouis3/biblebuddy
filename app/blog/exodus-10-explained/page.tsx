import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-10-explained", {
  title: "Exodus 10 Explained: Locusts, Darkness, and Pharaoh's Closest Confession",
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

export default function ExodusTenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-10-explained"
      title={<>📖 Exodus 10 Explained: Locusts, Darkness, and Pharaoh&apos;s Closest Confession</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Pharaoh&apos;s own men finally turn on him. Locusts strip Egypt bare. Then the sun itself goes out.</p>
            <p>
              <strong>Exodus 10 explained</strong> is the chapter where the eighth and ninth
              plagues land, and for the first time someone close to Pharaoh says out loud what the
              reader has been thinking for three chapters. His own servants ask him how long he
              plans to let his whole country burn down around his pride.
            </p>
            <p>Maybe you have watched someone keep making the same costly choice while everyone around them begs them to stop.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why do Pharaoh&apos;s own servants turn against him in this chapter?</li>
            <li>❓ Why does Pharaoh offer to let the men go but not the children?</li>
            <li>❓ What does darkness &quot;which may be felt&quot; actually mean?</li>
            <li>❓ And was &quot;I have sinned&quot; ever a real confession this time?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 10 is the chapter where Pharaoh gets closest to telling the truth,
              and still will not let it cost him anything.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 10 in order: the servants who break first, the
              locusts that finish what the hail started, the bargain over who actually gets to
              leave, the confession that sounds almost real, and a darkness so total that one
              nation could not see the sun while the other had light in its own house.
            </p>
            <p>Watch how close &quot;almost&quot; gets to the real thing in this chapter, and how far short it still falls.</p>
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
            <ArticleLink href="/blog/exodus-9-explained">Exodus 9</ArticleLink> ended with the
            worst hailstorm Egypt had ever seen flattening its flax and barley, and with Pharaoh
            saying &quot;I have sinned&quot; for the first time in the book, only to harden his
            heart again the moment the sky cleared. The text closed that chapter by naming all
            three ways Scripture describes it: the LORD hardened him, Pharaoh hardened himself,
            and his heart simply was hardened.
          </p>
          <p>
            Exodus 10 opens with God telling Moses exactly why that pattern has been allowed to
            keep repeating, before sending him back in for two more plagues.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Why God Says He Did This (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the eighth plague falls, God tells Moses the reason behind everything so far.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Go in unto Pharaoh: for I have hardened his heart, and the heart of his servants, that I might shew these my signs before him:"
          reference="Exodus 10:1"
        />
        <VerseQuote
          text="And that thou mayest tell in the ears of thy son, and of thy son's son, what things I have wrought in Egypt, and my signs which I have done among them; that ye may know how that I am the LORD."
          reference="Exodus 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who verse 1 says God hardened. Not only Pharaoh. His servants
            too.</strong> This confrontation was never only a contest between God and one king. The
            whole court that props him up gets swept into the same resistance.
          </p>
          <p>
            Verse 2 adds something new. God names a second audience for all of this: not just
            Egypt watching it happen, but children and grandchildren hearing the story told long
            after. The plagues were always meant to outlive the people who witnessed them first.
          </p>
        </div>
        <VerseQuote
          text="And Moses and Aaron came in unto Pharaoh, and said unto him, Thus saith the LORD God of the Hebrews, How long wilt thou refuse to humble thyself before me? let my people go, that they may serve me."
          reference="Exodus 10:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Humble</strong> is a new word in this confrontation. Seven plagues in, God
            finally names what has actually been missing from Pharaoh the entire time. It was
            never really about the frogs or the boils or the hail. It was about a man who would
            not bend.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Pharaoh&apos;s Own Servants Break First (verses 4 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God describes the eighth plague before it lands, and the description alone is enough to cost Pharaoh support inside his own palace.</p>
        </div>
        <VerseQuote
          text="Else, if thou refuse to let my people go, behold, to morrow will I bring the locusts into thy coast: And they shall cover the face of the earth, that one cannot be able to see the earth: and they shall eat the residue of that which is escaped, which remaineth unto you from the hail, and shall eat every tree which groweth for you out of the field."
          reference="Exodus 10:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Whatever the hail in <ArticleLink href="/blog/exodus-9-explained">Exodus 9</ArticleLink>{" "}
            left standing, this plague is sent to finish. Egypt already lost its flax and barley.
            Locusts are coming for whatever survived that storm.
          </p>
        </div>
        <VerseQuote
          text="And they shall fill thy houses, and the houses of all thy servants, and the houses of all the Egyptians; which neither thy fathers, nor thy fathers' fathers have seen, since the day that they were upon the earth unto this day. And he turned himself, and went out from Pharaoh."
          reference="Exodus 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses does not wait for an answer. He describes the disaster and walks out, the way a
            man speaks who already knows what the response will be.
          </p>
          <p>Then something happens that has not happened once in the last seven plagues.</p>
        </div>
        <VerseQuote
          text="And Pharaoh's servants said unto him, How long shall this man be a snare unto us? let the men go, that they may serve the LORD their God: knowest thou not yet that Egypt is destroyed?"
          reference="Exodus 10:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Pharaoh&apos;s own court turns on him before the locusts even arrive.</strong>{" "}
            No magician said this after the blood. No official said it after the boils. It takes
            seven plagues and the certainty of an eighth before anyone standing beside Pharaoh
            admits out loud that his country is already ruined.
          </p>
          <p>
            ⚠️ They do not ask him to repent. They ask him to cut his losses. Even that much honesty
            does not come from conviction. It comes from watching Egypt collapse around them one
            plague at a time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Pharaoh Offers Half of Yes (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Under pressure from his own servants, Pharaoh calls Moses and Aaron back for the first real negotiation of the chapter.</p>
        </div>
        <VerseQuote
          text="And Moses and Aaron were brought again unto Pharaoh: and he said unto them, Go, serve the LORD your God: but who are they that shall go?"
          reference="Exodus 10:8"
        />
        <VerseQuote
          text="And Moses said, We will go with our young and with our old, with our sons and with our daughters, with our flocks and with our herds will we go; for we must hold a feast unto the LORD."
          reference="Exodus 10:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses answers plainly. Everyone goes, young and old, every animal with them. Nothing
            about Israel&apos;s worship gets left behind as collateral in Egypt.
          </p>
        </div>
        <VerseQuote
          text="And he said unto them, Let the LORD be so with you, as I will let you go, and your little ones: look to it; for evil is before you."
          reference="Exodus 10:10"
        />
        <VerseQuote
          text="Not so: go now ye that are men, and serve the LORD; for that ye did desire. And they were driven out from Pharaoh's presence."
          reference="Exodus 10:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Pharaoh offers the men their worship and keeps the children as insurance.</strong>{" "}
            A people who leave their families behind are a people who have to come back. This is
            not a partial yes out of confusion. It is a calculated way to look like he is giving
            something up while keeping the leverage that matters most.
          </p>
          <p>
            Moses and Aaron are not asked to leave. They are driven out, the same hostility that
            will end this whole book of negotiations long before it ends in a changed heart.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Locusts, and the Closest Pharaoh Gets to the Truth (verses 12 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the offer refused, God sends exactly what He described.</p>
        </div>
        <VerseQuote
          text="And Moses stretched forth his rod over the land of Egypt, and the LORD brought an east wind upon the land all that day, and all that night; and when it was morning, the east wind brought the locusts."
          reference="Exodus 10:13"
        />
        <VerseQuote
          text="And the locusts went up over all the land of Egypt, and rested in all the coasts of Egypt: very grievous were they; before them there were no such locusts as they, neither after them shall be such."
          reference="Exodus 10:14"
        />
        <VerseQuote
          text="For they covered the face of the whole earth, so that the land was darkened; and they did eat every herb of the land, and all the fruit of the trees which the hail had left: and there remained not any green thing in the trees, or in the herbs of the field, through all the land of Egypt."
          reference="Exodus 10:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 15 says the locusts darkened the land. That detail matters for what is coming
            later in this same chapter. Egypt has already seen a false preview of the ninth plague
            inside the eighth one, an insect cloud so thick it blocked the sun before the real
            darkness ever fell.
          </p>
          <p>
            Every green thing left standing after the hail is gone by the end of this swarm.
            Whatever Egypt&apos;s fields had managed to recover, this plague erases completely.
          </p>
        </div>
        <VerseQuote
          text="Then Pharaoh called for Moses and Aaron in haste; and he said, I have sinned against the LORD your God, and against you."
          reference="Exodus 10:16"
        />
        <VerseQuote
          text="Now therefore forgive, I pray thee, my sin only this once, and intreat the LORD your God, that he may take away from me this death only."
          reference="Exodus 10:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the closest Pharaoh ever comes to real repentance in the whole
            book.</strong> He names the LORD specifically, confesses sin against both God and
            Moses, and asks for forgiveness, not just relief. The words sound almost indistinguishable
            from genuine conviction.
          </p>
          <p>
            Scripture elsewhere makes clear that real forgiveness is never out of reach for anyone
            who actually turns, the same promise{" "}
            <ArticleLink href="/blog/can-god-forgive-what-ive-done">
              held out to people who did far worse than Pharaoh and still found mercy
            </ArticleLink>
            . What is missing here is not the vocabulary of repentance. It is what comes after the
            vocabulary.
          </p>
        </div>
        <VerseQuote
          text="And he went out from Pharaoh, and intreated the LORD."
          reference="Exodus 10:18"
        />
        <VerseQuote
          text="And the LORD turned a mighty strong west wind, which took away the locusts, and cast them into the Red sea; there remained not one locust in all the coasts of Egypt."
          reference="Exodus 10:19"
        />
        <VerseQuote
          text="But the LORD hardened Pharaoh's heart, so that he would not let the children of Israel go."
          reference="Exodus 10:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Not one locust left in the whole country, and still not one Israelite released.
            Three verses after words that sounded like a broken man finally facing himself, the
            text records the fastest return to a hardened heart in the book so far.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Darkness That Could Be Felt (verses 21 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The ninth plague comes with no warning sent to Pharaoh first.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt."
          reference="Exodus 10:21"
        />
        <VerseQuote
          text="And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days:"
          reference="Exodus 10:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Darkness which may be felt</strong> describes something thicker than an
            ordinary night. Egypt worshipped the sun as one of its chief gods, and for three
            straight days that god simply does not show up.
          </p>
        </div>
        <VerseQuote
          text="They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings."
          reference="Exodus 10:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Egypt could not even move for three days. Israel had light in its own
            houses the entire time.</strong> This is not two nations experiencing the same weather
            differently. It is one territory going completely dark while another, living right
            alongside it, keeps its lamps lit the whole time.
          </p>
          <p>
            The same God who swallowed Egypt&apos;s serpents with{" "}
            <ArticleLink href="/blog/exodus-7-explained">Aaron&apos;s rod back in Exodus 7</ArticleLink>{" "}
            now controls whether a nation can see the hand in front of its own face.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. One More Negotiation, and a Final Threat (verses 24 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three days into darkness, Pharaoh calls Moses back for a third offer.</p>
        </div>
        <VerseQuote
          text="And Pharaoh called unto Moses, and said, Go ye, serve the LORD; only let your flocks and your herds be stayed: let your little ones also go with you."
          reference="Exodus 10:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The children can go now. The animals cannot. Pharaoh has simply traded one piece of
            leverage for another.
          </p>
        </div>
        <VerseQuote
          text="And Moses said, Thou must give us also sacrifices and burnt offerings, that we may sacrifice unto the LORD our God."
          reference="Exodus 10:25"
        />
        <VerseQuote
          text="Our cattle also shall go with us; there shall not an hoof be left behind; for thereof must we take to serve the LORD our God; and we know not with what we must serve the LORD, until we come thither."
          reference="Exodus 10:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Not an hoof left behind</strong> is Moses refusing the compromise down to the
            last animal. Israel does not yet know exactly what God will ask of them once they
            arrive at the mountain, so nothing gets left in Egypt as a guess.
          </p>
        </div>
        <VerseQuote
          text="But the LORD hardened Pharaoh's heart, and he would not let them go."
          reference="Exodus 10:27"
        />
        <VerseQuote
          text="And Pharaoh said unto him, Get thee from me, take heed to thyself, see my face no more; for in that day thou seest my face thou shalt die."
          reference="Exodus 10:28"
        />
        <VerseQuote
          text="And Moses said, Thou hast spoken well, I will see thy face again no more."
          reference="Exodus 10:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Pharaoh threatens death. Moses answers with simple agreement.</strong> Nine
            plagues of negotiating are over. Whatever is coming next in{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink>&apos;s confrontation with Egypt, it
            will not come through another trip to this throne room.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does verse 1 say God hardened the hearts of Pharaoh&apos;s servants too,
            not just Pharaoh?</strong> The text states it plainly without explaining the mechanism.
            What verse 7 shows a few lines later is that this hardening was not total resistance.
            The servants still push Pharaoh toward letting Israel go. Their hearts being hardened
            against full repentance did not stop them from seeing, and saying, that Egypt was
            already ruined.
          </p>
          <p>
            <strong>Was Pharaoh&apos;s confession in verses 16 and 17 real repentance?</strong>{" "}
            It uses language no earlier plague produced from him: naming the LORD specifically,
            confessing sin against both God and Moses, and asking forgiveness rather than only
            relief. But he asks forgiveness for his sin &quot;only this once,&quot; a phrase that
            asks for the plague removed more than it asks for anything in himself to change, and
            verse 20 shows his heart hardened again within three verses.
          </p>
          <p>
            <strong>What does darkness &quot;which may be felt&quot; mean?</strong> Some read it as
            a literal physical description, like the thick dust storms that occasionally blanket
            Egypt and leave the air itself heavy. Others read it as emphasizing how total and
            paralyzing the darkness was, dark enough that no one could so much as rise from where
            they sat for three days. Exodus 10 does not explain the mechanism, only the effect.
          </p>
          <p>
            <strong>Why did Pharaoh keep offering partial deals instead of simply refusing
            outright?</strong> Each offer in this chapter, men only, then children but not animals,
            looks like movement without actually releasing what God asked for. The chapter never
            states Pharaoh&apos;s inner reasoning directly, but the pattern across all three offers
            suggests a man trying to look reasonable to his own court while keeping real control of
            the outcome.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 10:16 and 17</h3>
        <VerseQuote
          text="Then Pharaoh called for Moses and Aaron in haste; and he said, I have sinned against the LORD your God, and against you. Now therefore forgive, I pray thee, my sin only this once, and intreat the LORD your God, that he may take away from me this death only."
          reference="Exodus 10:16 and 17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The closest Pharaoh ever gets to the words of real repentance, and still only words
          asking for relief rather than real change.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 10:23</h3>
        <VerseQuote
          text="They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings."
          reference="Exodus 10:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One nation frozen in darkness for three days while another, living right beside it, keeps
          its lamps burning the entire time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 10:7</h3>
        <VerseQuote
          text="And Pharaoh's servants said unto him, How long shall this man be a snare unto us? let the men go, that they may serve the LORD their God: knowest thou not yet that Egypt is destroyed?"
          reference="Exodus 10:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first voice in the entire confrontation to tell Pharaoh plainly that his own
          stubbornness is the thing destroying his country.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 10:21</h3>
        <VerseQuote
          text="And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt."
          reference="Exodus 10:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A plague aimed directly at a nation that worshipped the sun, striking the one thing
          Egypt&apos;s own religion could not explain away.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 10:28 and 29</h3>
        <VerseQuote
          text="And Pharaoh said unto him, Get thee from me, take heed to thyself, see my face no more; for in that day thou seest my face thou shalt die. And Moses said, Thou hast spoken well, I will see thy face again no more."
          reference="Exodus 10:28 and 29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king&apos;s death threat answered with calm agreement, closing the door on chapters of
          back and forth negotiation between Moses and Pharaoh.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two plagues strike Egypt: locusts that strip away every green thing the hail had left
          standing, and three days of total darkness. Pharaoh&apos;s own servants push him to let
          Israel go, he offers partial deals over who can leave and what they can take, and he
          speaks his closest words yet to real confession before hardening his heart again within
          verses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What two plagues are in Exodus 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The eighth plague, locusts that cover the land and eat every remaining green thing, and
          the ninth plague, three days of darkness described in verse 21 as thick enough to be
          felt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Pharaoh&apos;s own servants turn against him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 10:7 has them tell Pharaoh directly that Egypt is already destroyed and ask how
          long he will let Moses keep being a snare to them. Seven plagues of ruin convinced his own
          court before it ever softened Pharaoh himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Pharaoh offer to let the men go but not the women and children?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 10:10 and 11 show Pharaoh keeping the families behind as leverage, betting that
          men who left their children in Egypt would have to return. Moses refuses the offer rather
          than accept a partial release.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Pharaoh&apos;s confession in Exodus 10:16 genuine repentance?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It uses stronger language than any earlier plague, naming the LORD and confessing sin
          directly. But he asks forgiveness &quot;only this once&quot; while asking for the plague
          removed, and Exodus 10:20 records his heart hardened again just three verses later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does darkness &quot;which may be felt&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 10:21 describes a darkness so thick that Egyptians could not see one another or
          rise from where they sat for three days. The text does not explain whether this was a
          natural phenomenon intensified by God or something entirely outside nature, only how
          total its effect was.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Israel have light during the plague of darkness?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Exodus 10:23 says plainly that all the children of Israel had light in their
          dwellings while Egypt sat frozen in total darkness for three days.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God say He hardened the hearts of Pharaoh&apos;s servants, not just Pharaoh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 10:1 names both. The chapter does not explain the mechanism, but verse 7 shows the
          hardening was not absolute: the same servants still urged Pharaoh to let Israel go, even
          while their own hearts stayed resistant to what it would actually cost them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Pharaoh mean telling Moses never to see his face again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 10:28 has Pharaoh threaten death if Moses returns to his court. Moses agrees in
          verse 29, closing the back and forth negotiation of the plague chapters and signaling
          that whatever happens next will not come through another audience in that throne room.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 10 connect to the plagues before it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The locusts finish what the hail in Exodus 9 started, destroying whatever crops survived
          that storm. The pattern of confession followed by renewed hardening, first seen in Exodus
          9:27 and 34, repeats here in an even sharper form across just a few verses.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 10 is the chapter where Pharaoh gets as close to the truth as he will ever get, and still turns away from it.</p>
          <p>
            📌 <strong>Words that sound like repentance are not the same as a changed life.</strong>{" "}
            &quot;I have sinned&quot; and &quot;forgive me&quot; are the right words. &quot;Only
            this once&quot; gives away that Pharaoh was still only asking for the pain to stop.
          </p>
          <p>
            📌 <strong>A partial yes can still be a complete no.</strong> Offering the men but not
            the families, then the families but not the animals, let Pharaoh look like he was
            compromising while he kept exactly the leverage God told him to release.
          </p>
          <p>
            📌 <strong>It took someone else telling the truth out loud before anything moved.</strong>{" "}
            Pharaoh&apos;s own servants named the obvious seven plagues before he could, or would.
          </p>
          <p>
            You may be close to the truth about something right now, using the right words for it,
            while still holding back the one part that would actually cost you something.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask whether your own last confession had an &quot;only this once&quot; hiding inside
            it, the same quiet exit Pharaoh built into his.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
