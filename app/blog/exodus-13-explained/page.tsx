import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-13-explained", {
  title: "Exodus 13 Explained: Firstborn, Bread, and the Pillar of Fire",
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

export default function ExodusThirteenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-13-explained"
      title={<>📖 Exodus 13 Explained: Firstborn, Bread, and the Pillar of Fire</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Egypt is behind them. The sea is still ahead. In between, God stops to talk about memory.</p>
            <p>
              <strong>Exodus 13 explained</strong> is the chapter where Israel takes its first steps
              as a free nation, and almost nothing in it is about the walking. It is about making
              sure a people only hours removed from slavery never forget why they are walking at
              all, and about the first strange decisions God makes on their behalf before Egypt
              has even finished counting its dead.
            </p>
            <p>Maybe you have wondered why a chapter about freedom spends so much time on rules for the future.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God claim every firstborn son the same morning Israel walks out of Egypt?</li>
            <li>❓ Why does a donkey&apos;s firstborn get treated differently from every other animal?</li>
            <li>❓ Why does God deliberately avoid the fastest road to Canaan?</li>
            <li>❓ And why does Moses stop to carry a centuries old promise with him?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 13 is the chapter where a newly freed people learns that freedom
              and memory were never going to be separate things.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the claim God makes on
              every firstborn, the ordinance that turns one terrible night into a yearly teaching
              moment, the detour that looks like the long way round, the bones Moses refuses to
              leave behind, and the fire that never once left Israel in the dark.
            </p>
            <p>Read slowly. This chapter is quietly building habits that outlast the whole wilderness.</p>
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
            <ArticleLink href="/blog/exodus-12-explained">Exodus 12</ArticleLink> ended with Egypt
            burying its dead and Israel walking out the same night, six hundred thousand men plus
            women and children, exactly four hundred and thirty years after the sojourn began. The
            Passover lamb had been killed, the blood applied, and the rules for keeping that one
            night sacred in every future generation had already been given in detail.
          </p>
          <p>
            Exodus 13 opens with Israel actually on the road, camped somewhere between Succoth and
            the edge of the wilderness, and God adding a second set of instructions on top of the
            first. Passover looked backward at one specific night. This chapter looks forward,
            toward a people who will someday raise children who never smelled the smoke of a
            burning doorpost.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 13 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Every Firstborn Belongs to God (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Israel has gone far at all, God makes a claim that touches every household at once.</p>
        </div>
        <VerseQuote
          text="Sanctify unto me all the firstborn, whatsoever openeth the womb among the children of Israel, both of man and of beast: it is mine."
          reference="Exodus 13:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Sanctify</strong> means set apart as belonging to God alone. Not offered as a
            suggestion, and not limited to animals. Every firstborn son, and every firstborn male
            of the herds and flocks, is claimed in the same breath.
          </p>
          <p>
            📌 <strong>This is the first command God gives Israel after they are already
            free.</strong> Not a law about worship days or food. A claim on the very first life
            each family produces from here on, timed to land in the same hours death had just
            passed through every other house in Egypt.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Day Built to Be Remembered on Purpose (verses 3 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses turns from God&apos;s instruction to the people, and gives them a command built entirely around memory.</p>
        </div>
        <VerseQuote
          text="And Moses said unto the people, Remember this day, in which ye came out from Egypt, out of the house of bondage; for by strength of hand the LORD brought you out from this place: there shall no leavened bread be eaten."
          reference="Exodus 13:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Egypt does not get credited here at all. Not Pharaoh&apos;s decision, not Israel&apos;s
            own courage. <strong>Strength of hand</strong> belongs to the LORD, and the command to
            remember comes attached to that one fact before anything else is said.
          </p>
        </div>
        <VerseQuote
          text="Seven days thou shalt eat unleavened bread, and in the seventh day shall be a feast to the LORD."
          reference="Exodus 13:6"
        />
        <VerseQuote
          text="And thou shalt shew thy son in that day, saying, This is done because of that which the LORD did unto me when I came forth out of Egypt."
          reference="Exodus 13:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 8 is quietly one of the most important lines in the whole chapter. The
            instruction is not written for the generation standing there that week. It is written
            for a son who has not been born yet, being handed a script his father will one day use
            to explain a story the son never personally lived.
          </p>
          <p>
            📌 <strong>A feast nobody has to be told to remember eventually becomes a feast nobody
            remembers why they keep.</strong> God does not leave that to chance here. He builds the
            explaining into the ritual itself, every single year, on purpose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Sign on the Hand, and a Donkey Treated Differently (verses 9 and 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The command to remember gets stranger, and more physical, in the very next verse.</p>
        </div>
        <VerseQuote
          text="And it shall be for a sign unto thee upon thine hand, and for a memorial between thine eyes, that the LORD's law may be in thy mouth: for with a strong hand hath the LORD brought thee out of Egypt."
          reference="Exodus 13:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse, along with its twin later in Deuteronomy, that observant Jewish
            families still take literally today, binding small boxes containing these words to the
            hand and forehead in prayer. Other readers take it as picture language, the same way
            someone today might say they wear a reminder on their sleeve. Either way, the point is
            the same: this memory is meant to be worn, not just thought about once a year.
          </p>
          <p>Then the chapter turns to something that sounds, at first, like a strange side note.</p>
        </div>
        <VerseQuote
          text="That thou shalt set apart unto the LORD all that openeth the matrix, and every firstling that cometh of a beast which thou hast; the males shall be the LORD's."
          reference="Exodus 13:12"
        />
        <VerseQuote
          text="And every firstling of an ass thou shalt redeem with a lamb; and if thou wilt not redeem it, then thou shalt break his neck: and all the firstborn of man among thy children shalt thou redeem."
          reference="Exodus 13:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the donkey gets a different rule than the sheep or the ox.</strong>{" "}
            Clean animals could simply be set apart and offered. A donkey could not be sacrificed
            that way, so its firstling had to be redeemed, bought back with a lamb standing in its
            place, or killed outright if the owner refused. And a human firstborn son was never, in
            any version of this law, killed or sacrificed. He was always redeemed. The text draws a
            careful line here: animals belong to God outright, but a son is bought back, not
            offered up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Question a Son Will One Day Ask (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God anticipates the exact moment this teaching will actually get used.</p>
        </div>
        <VerseQuote
          text="And it shall be when thy son asketh thee in time to come, saying, What is this? that thou shalt say unto him, By strength of hand the LORD brought us out from Egypt, from the house of bondage:"
          reference="Exodus 13:14"
        />
        <VerseQuote
          text="And it came to pass, when Pharaoh would hardly let us go, that the LORD slew all the firstborn in the land of Egypt, both the firstborn of man, and the firstborn of beast: therefore I sacrifice to the LORD all that openeth the matrix, being males; but all the firstborn of my children I redeem."
          reference="Exodus 13:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The whole law of the firstborn is designed to provoke a question.</strong>{" "}
            Not to be followed quietly and left unexplained, but to be strange enough that a child
            notices it and asks about it. The answer the father gives is not a theory. It is a
            direct line back to a specific night in a specific country, the same night{" "}
            <ArticleLink href="/blog/exodus-12-explained">Exodus 12</ArticleLink> already described
            in full.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Road God Chose Not to Take (verses 17 and 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns from teaching to travel, and the first decision about the route is God&apos;s, not Moses&apos;s.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when Pharaoh had let the people go, that God led them not through the way of the land of the Philistines, although that was near; for God said, Lest peradventure the people repent when they see war, and they return to Egypt:"
          reference="Exodus 13:17"
        />
        <VerseQuote
          text="But God led the people about, through the way of the wilderness of the Red sea: and the children of Israel went up harnessed out of the land of Egypt."
          reference="Exodus 13:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The shortest road from Egypt to Canaan ran straight along the coast, through land
            Philistines controlled, and it was the busiest, most exposed route in the region. A
            people who had been slaves the week before were in no shape to meet trained soldiers on
            that road and come out the other side still believing God had freed them for anything
            good.
          </p>
          <p>
            💡 <strong>Harnessed</strong> is a word translators have never fully agreed on. It may
            mean armed, or arranged in ranks, or simply equipped for the journey. What the verse
            does say clearly is that God&apos;s reason for the longer route was not strategy for its
            own sake. It was mercy aimed at keeping a frightened people from giving up on freedom
            the first time it looked hard.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Promise Moses Would Not Leave Behind (verse 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>In the middle of organizing a nation&apos;s exit, Moses stops for one specific errand.</p>
        </div>
        <VerseQuote
          text="And Moses took the bones of Joseph with him: for he had straitly sworn the children of Israel, saying, God will surely visit you; and ye shall carry up my bones away hence with you."
          reference="Exodus 13:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This goes back more than three centuries, to{" "}
            <ArticleLink href="/blog/genesis-50-explained">Genesis 50</ArticleLink>, where a dying
            Joseph made Israel swear this exact oath before he was ever embalmed and placed in a
            coffin in Egypt.
          </p>
        </div>
        <VerseQuote
          text="And Joseph took an oath of the children of Israel, saying, God will surely visit you, and ye shall carry up my bones from hence."
          reference="Genesis 50:25"
        />
        <VerseQuote
          text="By faith Joseph, when he died, made mention of the departing of the children of Israel; and gave commandment concerning his bones."
          reference="Hebrews 11:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>
              <ArticleLink href="/blog/who-was-joseph">Joseph</ArticleLink> never saw the exodus. He
              died trusting it would happen anyway, and asked for the only thing a dead man can
              still ask for: to not be left out of it.
            </strong>{" "}
            Moses carrying that coffin out of Egypt is one generation making good on a promise an
            earlier generation never lived to see kept. It would not reach its final rest until
            decades later, buried at Shechem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. A Fire That Never Once Left Them (verses 20 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the first camp, and the first sign of God&apos;s constant, visible presence.</p>
        </div>
        <VerseQuote
          text="And they took their journey from Succoth, and encamped in Etham, in the edge of the wilderness."
          reference="Exodus 13:20"
        />
        <VerseQuote
          text="And the LORD went before them by day in a pillar of a cloud, to lead them the way; and by night in a pillar of fire, to give them light; to go by day and night:"
          reference="Exodus 13:21"
        />
        <VerseQuote
          text="He took not away the pillar of the cloud by day, nor the pillar of fire by night, from before the people."
          reference="Exodus 13:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not a single night of the whole wilderness journey happens in the dark
            without a reason.</strong> One visible form, changing shape for day and for night, so
            there is never a stretch of hours where Israel has to wonder whether God is still out
            in front of them.
          </p>
          <p>
            Paul later points straight back to this image when writing to a church hundreds of
            years removed from the wilderness.
          </p>
        </div>
        <VerseQuote
          text="Moreover, brethren, I would not that ye should be ignorant, how that all our fathers were under the cloud, and all passed through the sea; And were all baptized unto Moses in the cloud and in the sea;"
          reference="1 Corinthians 10:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Paul treats the cloud Israel walked under as more than weather. He calls it a
            shared experience the whole nation passed through together, the same way he will go on
            to use the wilderness generation as a warning and an example for believers reading his
            letter centuries later.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 13 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does a donkey&apos;s firstborn get redeemed or killed, while other
            firstling animals are simply called the LORD&apos;s?</strong> The text does not explain
            the reasoning directly, but the distinction fits a pattern found elsewhere in the law:
            donkeys were not among the animals Israel offered in sacrifice, so a donkey&apos;s
            firstling could not simply be set apart the way a lamb or a calf could be. Redeeming it
            with a lamb, or killing it if the owner refused, kept the principle that the firstborn
            belonged to God intact even for an animal that could never be placed on an altar.
          </p>
          <p>
            <strong>Why did God lead Israel away from the shortest road to Canaan?</strong> Verse 17
            gives the reason in the text itself: the way of the Philistines ran through territory
            where Israel would meet war almost immediately, and God judged a people fresh out of
            slavery was not ready for that test. This was not caution for its own sake. It was a
            decision to protect a fragile, newly freed people from a battle that could send them
            running straight back to Egypt.
          </p>
          <p>
            <strong>What does the word &quot;harnessed&quot; mean in verse 18?</strong> Bible
            translators genuinely disagree here. Some read the Hebrew as describing Israel armed or
            equipped for a fight, others as marching in organized ranks or companies rather than a
            scattered crowd. The text does not settle which is meant, and it is honest to say both
            readings remain in use rather than picking one with more certainty than the evidence
            allows.
          </p>
          <p>
            <strong>Is the sign on the hand and the memorial between the eyes meant to be taken
            literally?</strong> Observant Jewish tradition has long taken verse 9 and its twin in
            Deuteronomy literally, binding small boxes of Scripture to the arm and forehead in
            prayer, a practice still kept today. Many other readers, including most Christian
            interpreters, take the language as a figure of speech calling for a memory worn so
            constantly it shapes every action, the same kind of picture language Scripture uses
            elsewhere for binding God&apos;s word to the heart. Both readings take the command
            seriously; they differ on whether the wearing is physical or entirely internal.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 13:21</h3>
        <VerseQuote
          text="And the LORD went before them by day in a pillar of a cloud, to lead them the way; and by night in a pillar of fire, to give them light; to go by day and night:"
          reference="Exodus 13:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest picture in the whole chapter of a God who does not simply promise to lead.
          He goes visibly in front, in a form everyone could see, day and night without a gap.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 13:14</h3>
        <VerseQuote
          text="And it shall be when thy son asketh thee in time to come, saying, What is this? that thou shalt say unto him, By strength of hand the LORD brought us out from Egypt, from the house of bondage:"
          reference="Exodus 13:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A law built to be questioned by a child, so the story of the exodus never has to survive
          on memory alone. Someone always has to answer, generation after generation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 13:19</h3>
        <VerseQuote
          text="And Moses took the bones of Joseph with him: for he had straitly sworn the children of Israel, saying, God will surely visit you; and ye shall carry up my bones away hence with you."
          reference="Exodus 13:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise kept more than three centuries after it was made, by people who had never met
          the man who asked for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 13:17</h3>
        <VerseQuote
          text="And it came to pass, when Pharaoh had let the people go, that God led them not through the way of the land of the Philistines, although that was near; for God said, Lest peradventure the people repent when they see war, and they return to Egypt:"
          reference="Exodus 13:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God protecting a people from a test He already knew they could not pass yet, even if it
          meant choosing the longer, harder road to get there.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Corinthians 10:1 and 2</h3>
        <VerseQuote
          text="Moreover, brethren, I would not that ye should be ignorant, how that all our fathers were under the cloud, and all passed through the sea; And were all baptized unto Moses in the cloud and in the sea;"
          reference="1 Corinthians 10:1 and 2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul reaching back to the same pillar of cloud this chapter describes, treating it as a
          shared experience that still has something to teach a church centuries removed from
          Egypt.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 13?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God claims every firstborn son and animal as His own, and Moses gives Israel the lasting
          rules for keeping the Feast of Unleavened Bread and teaching it to their children. Israel
          then begins its journey, and God deliberately leads them away from the direct road to
          Canaan, through the wilderness instead. Moses carries the bones of Joseph out of Egypt
          according to an old oath, and the chapter closes with the pillar of cloud and fire
          leading the people day and night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God command Israel to sanctify the firstborn?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 13:2 and 15 tie the command directly to the tenth plague: because the LORD struck
          Egypt&apos;s firstborn and spared Israel&apos;s, Israel&apos;s own firstborn now belong to
          Him as a permanent reminder of that night. The claim applies to both firstborn sons and
          firstling animals.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a donkey&apos;s firstborn have to be redeemed with a lamb?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 13:13 singles out the donkey because, unlike sheep or cattle, it was never an
          animal Israel offered in sacrifice. Redeeming it with a lamb, or killing it if the owner
          refused, kept the principle that the firstborn belonged to God even for an animal that
          could not be placed on an altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t God take Israel the shortest way to Canaan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 13:17 states the reason plainly: the direct road ran through Philistine
          territory where Israel would face war almost immediately, and God judged that a people
          just freed from slavery would retreat to Egypt rather than fight. The longer wilderness
          route protected them from a test they were not ready for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;harnessed&quot; mean in Exodus 13:18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Translators are not fully agreed. Some read it as Israel going out armed or equipped for
          battle, others as marching in organized companies rather than a loose crowd. The exact
          meaning of the Hebrew word is genuinely debated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Moses really carry Joseph&apos;s actual bones through the wilderness?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 50:26 says Joseph was embalmed and placed in a coffin in Egypt after he died, and
          Exodus 13:19 says Moses carried that coffin out with Israel, fulfilling the oath Joseph
          had made them swear centuries earlier. Joshua 24:32 confirms those bones were finally
          buried at Shechem once Israel reached the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the sign on the hand and the memorial between the eyes?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 13:9 and 16 command Israel to carry the memory of the exodus as a sign on the
          hand and a memorial between the eyes. Observant Jewish tradition takes this literally,
          binding boxes of Scripture to the arm and forehead in prayer. Many other readers take it
          as picture language for a memory that should shape every action.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the pillar of cloud and fire represent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 13:21 and 22 describe one visible form that led Israel as a cloud by day and fire
          by night, never leaving them without light or direction. It continues through the rest of
          the wilderness journey and becomes a lasting picture of God&apos;s guiding presence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 13 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 2:22 and 23 describe Mary and Joseph presenting the infant Jesus in the temple,
          quoting the very law Exodus 13:2 and 12 establish, that every firstborn male belongs to
          the LORD. The chapter&apos;s claim on the firstborn son finds its fullest picture in the
          one firstborn Son who was never redeemed with a substitute, but given outright.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is this month called Abib?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abib was the original name of the first month on Israel&apos;s calendar, named for the
          young, green ears of grain in the barley harvest around that time of year. The same
          month was later called Nisan, the name still used on the Hebrew calendar today.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 13 is the sound of a free people being taught how to remember on purpose.</p>
          <p>
            📌 <strong>Freedom that is not deliberately remembered gets quietly forgotten.</strong>{" "}
            God did not leave the exodus to oral tradition and good intentions. He built the
            remembering into a feast, a question, and a sign worn on the body.
          </p>
          <p>
            📌 <strong>God&apos;s route is not always the fastest one.</strong> The longer road
            through the wilderness was slower and harder, and it was also the only road a people
            that fragile could actually survive.
          </p>
          <p>
            📌 <strong>A promise kept generations late is still kept.</strong> Joseph never
            saw the exodus, but Moses still made room for his coffin on the way out the door.
          </p>
          <p>
            You are carrying promises right now that were made before you, by people who will
            never see how they end either.
          </p>
          <p>Here is one thing this chapter is worth doing something with today.</p>
          <p>
            Pick one thing God has actually done for you, and build a small, repeatable habit
            around remembering it, the way Israel was given a feast instead of just a feeling.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
