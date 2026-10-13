import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-29-explained", {
  title: "Exodus 29 Explained: The Ordination of Aaron and His Sons",
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

export default function ExodusTwentyNineExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-29-explained"
      title={<>📖 Exodus 29 Explained: The Ordination of Aaron and His Sons</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The clothes are finished. Nobody is allowed to put them on yet.</p>
            <p>
              <strong>Exodus 29 explained</strong> is the chapter where Aaron and his sons actually become
              priests: a bullock killed for their own sin, a ram burned whole on the altar, a second ram
              whose blood gets smeared on an ear, a thumb, and a big toe, and seven straight days before any
              of it is considered finished.
            </p>
            <p>Maybe you have pictured ordination as Aaron simply putting on the garments from the chapter before.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did Aaron need a sacrifice made for his own sin before he could offer anything for anyone else?</li>
            <li>❓ What was the point of putting blood on an ear, a thumb, and a toe?</li>
            <li>❓ Why did the whole process have to repeat every day for a week?</li>
            <li>❓ And why does the chapter end on God talking about where He will live?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 29 is not a dress rehearsal. It is the chapter that turns Aaron from a man
              wearing holy clothes into a man actually qualified to wear them.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the washing and the gathered
              offerings, Aaron dressed and anointed, the bullock killed as a sin offering, the first ram
              burned whole, the second ram whose blood marks Aaron and his sons for service, the garments
              handed down to future generations, and the seven days of atonement that end with God naming
              exactly why He went through all of this.
            </p>
            <p>None of it is decoration. Every single step answers the same question: how does a sinful man get close enough to serve a holy God without being destroyed by the closeness?</p>
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
            <ArticleLink href="/blog/exodus-28-explained">Exodus 28</ArticleLink> designed every garment
            Aaron and his sons would wear: the ephod, the breastplate of judgment, the robe with its bells,
            and the gold plate reading &quot;Holiness to the Lord.&quot; By the end of that chapter the
            clothes existed. Nobody had worn them into actual service yet.
          </p>
          <p>
            Clothes alone were never going to be enough. A man could put on every thread God designed and
            still be unqualified to stand in front of the Lord, because the problem was never the outfit.
            The problem was Aaron himself, a sinful man like everyone he would represent. Exodus 29 is God
            giving Moses the actual ceremony that deals with that problem before a single priest ever lights
            a lamp or burns an offering.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 29 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Offerings Gathered, and Aaron Washed (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before a single garment goes on, the chapter opens with a shopping list and a bath.</p>
        </div>
        <VerseQuote
          text="And this is the thing that thou shalt do unto them to hallow them, to minister unto me in the priest’s office: Take one young bullock, and two rams without blemish,"
          reference="Exodus 29:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One bullock, two rams, and three kinds of unleavened bread, all without blemish. Nothing
            flawed, nothing second rate, gets brought near this ceremony. Then comes the first physical act
            Aaron and his sons actually do.
          </p>
        </div>
        <VerseQuote
          text="And Aaron and his sons thou shalt bring unto the door of the tabernacle of the congregation, and shalt wash them with water."
          reference="Exodus 29:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Washing comes before a single garment or a single sacrifice.</strong> Before Aaron
            wears anything holy or offers anything holy, his body gets cleaned first. The order is not an
            accident. Cleansing always comes before service, never the other way around.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Dressed, Crowned, and Anointed (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after the washing does Moses start handing Aaron the garments from the previous chapter, piece by piece.</p>
        </div>
        <VerseQuote
          text="And thou shalt take the garments, and put upon Aaron the coat, and the robe of the ephod, and the ephod, and the breastplate, and gird him with the curious girdle of the ephod: And thou shalt put the mitre upon his head, and put the holy crown upon the mitre."
          reference="Exodus 29:5 and 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Aaron never dresses himself here. Moses does it, piece after piece, in the exact order{" "}
            <ArticleLink href="/blog/exodus-28-explained">Exodus 28</ArticleLink> listed them. Then one more
            step, and it is the step that actually sets Aaron apart from every other Israelite in the camp.
          </p>
        </div>
        <VerseQuote
          text="Then shalt thou take the anointing oil, and pour it upon his head, and anoint him."
          reference="Exodus 29:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Oil poured on the head, not rubbed in or sprinkled.</strong> This is the act that
            gives Aaron the standing Leviticus later calls &quot;the priest that is anointed.&quot; His sons get simpler
            coats and girdles, no anointing oil poured on them the same way, and the chapter calls the whole
            arrangement a lasting rule.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt gird them with girdles, Aaron and his sons, and put the bonnets on them: and the priest’s office shall be theirs for a perpetual statute: and thou shalt consecrate Aaron and his sons."
          reference="Exodus 29:9"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Sin Offering: a Bullock for Aaron Himself (verses 10 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Dressed and anointed, Aaron still cannot touch the altar on behalf of anyone else. He needs an offering made for himself first.</p>
        </div>
        <VerseQuote
          text="And thou shalt cause a bullock to be brought before the tabernacle of the congregation: and Aaron and his sons shall put their hands upon the head of the bullock."
          reference="Exodus 29:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hands pressed on the animal&apos;s head identified Aaron and his sons with it. Whatever happened
            to that bullock next was happening in their place.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt take of the blood of the bullock, and put it upon the horns of the altar with thy finger, and pour all the blood beside the bottom of the altar."
          reference="Exodus 29:12"
        />
        <VerseQuote
          text="But the flesh of the bullock, and his skin, and his dung, shalt thou burn with fire without the camp: it is a sin offering."
          reference="Exodus 29:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The bullock was burned outside the camp, not on the altar.</strong> A sin offering was
            too tied to guilt to be treated like a normal gift to God. The horns got blood, the base got the
            rest, and the carcass itself was removed entirely from the holy ground.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Burnt Offering: the First Ram Goes Up Whole (verses 15 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the sin offering made, a different kind of sacrifice follows, and this one holds nothing back.</p>
        </div>
        <VerseQuote
          text="And thou shalt cut the ram in pieces, and wash the inwards of him, and his legs, and put them unto his pieces, and unto his head."
          reference="Exodus 29:17"
        />
        <VerseQuote
          text="And thou shalt burn the whole ram upon the altar: it is a burnt offering unto the LORD: it is a sweet savour, an offering made by fire unto the LORD."
          reference="Exodus 29:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>A sin offering dealt with guilt. A burnt offering was total surrender.</strong> The
            whole ram burned, nothing kept back and nothing eaten, picturing complete dedication rather than
            payment for a specific wrong. &quot;Sweet savour&quot; is the text&apos;s own description, a
            sacrifice fully given and fully accepted, not God enjoying violence.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Ram of Consecration: Blood on the Ear, Thumb, and Toe (verses 19 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A second ram follows, and its blood goes somewhere no offering in the tabernacle instructions has gone yet.</p>
        </div>
        <VerseQuote
          text="Then shalt thou kill the ram, and take of his blood, and put it upon the tip of the right ear of Aaron, and upon the tip of the right ear of his sons, and upon the thumb of their right hand, and upon the great toe of their right foot, and sprinkle the blood upon the altar round about."
          reference="Exodus 29:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three points on the body, and all three matter for a priest&apos;s actual job.</strong>{" "}
            The ear hears God&apos;s instructions. The thumb does the work of the hands, the sacrifices and
            the handling of holy things. The toe carries him into the holy place and back out. Hearing,
            doing, and going, all three marked by the same blood.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt take of the blood that is upon the altar, and of the anointing oil, and sprinkle it upon Aaron, and upon his garments, and upon his sons, and upon the garments of his sons with him: and he shall be hallowed, and his garments, and his sons, and his sons’ garments with him."
          reference="Exodus 29:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Blood and oil together, on the men and on the clothes from the previous chapter alike. Even the
            garments needed hallowing before they counted as holy. Then comes a wave offering, lifted up
            before the Lord and placed back in Aaron&apos;s hands.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt take the breast of the ram of Aaron’s consecration, and wave it for a wave offering before the LORD: and it shall be thy part."
          reference="Exodus 29:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The breast of the ram became Moses&apos; own portion that day, and the chapter sets it up as a
            standing rule: part of the priest&apos;s service would always come with a part of the offering
            set aside for him to eat.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Garments Passed Down, and a Meal Only the Holy Can Eat (verses 29 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The ceremony pauses to answer a practical question. What happens to these garments after Aaron dies?</p>
        </div>
        <VerseQuote
          text="And the holy garments of Aaron shall be his sons’ after him, to be anointed therein, and to be consecrated in them."
          reference="Exodus 29:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The clothes outlive the man. One high priest&apos;s garments become the next high priest&apos;s
            garments, generation after generation. Then Aaron and his sons sit down to eat what was offered.
          </p>
        </div>
        <VerseQuote
          text="And they shall eat those things wherewith the atonement was made, to consecrate and to sanctify them: but a stranger shall not eat thereof, because they are holy."
          reference="Exodus 29:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This meal was not open to the camp.</strong> Only the men being consecrated could eat
            it, by the door of the tabernacle, because the food itself had become holy through the
            atonement made with it. Anything left by morning had to be burned, never saved and never shared
            with anyone outside the ceremony.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Seven Days, Two Lambs a Day, and the Reason for All of It (verses 35 to 46)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One day of this ceremony was not enough. God sets a number, and it is not a small one.</p>
        </div>
        <VerseQuote
          text="And thus shalt thou do unto Aaron, and to his sons, according to all things which I have commanded thee: seven days shalt thou consecrate them."
          reference="Exodus 29:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven straight days, a new bullock for a sin offering every single one of them, cleansing the
            altar itself as much as the men serving at it. Only after the full week does the chapter move to
            what daily worship would look like going forward.
          </p>
        </div>
        <VerseQuote
          text="Now this is that which thou shalt offer upon the altar; two lambs of the first year day by day continually."
          reference="Exodus 29:38"
        />
        <VerseQuote
          text="The one lamb thou shalt offer in the morning; and the other lamb thou shalt offer at even:"
          reference="Exodus 29:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Every single day, forever, a lamb at sunrise and a lamb at sunset.</strong> Not an
            occasional ceremony. A rhythm built into the beginning and end of every day Israel existed as a
            nation, the same way the{" "}
            <ArticleLink href="/blog/exodus-12-explained">Passover lamb</ArticleLink> had already marked the
            night of their freedom.
          </p>
        </div>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the chapter ends, and it ends by telling you why any of this mattered at all.</p>
        </div>
        <VerseQuote
          text="And there I will meet with the children of Israel, and the tabernacle shall be sanctified by my glory. And I will sanctify the tabernacle of the congregation, and the altar: I will sanctify also both Aaron and his sons, to minister to me in the priest’s office. And I will dwell among the children of Israel, and will be their God."
          reference="Exodus 29:43 to 45"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every bullock, every ram, every drop of blood on every ear and thumb and toe was for
            this one sentence.</strong> &quot;I will dwell among the children of Israel, and will be their
            God.&quot; The whole chapter is the cost of a holy God living next to an unholy people without
            destroying them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 29 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did Aaron need a sin offering made for himself before he could serve anyone else?</strong>{" "}
            The text states it plainly. Aaron was never exempt from the problem he was ordained to deal
            with. He was a sinful man representing sinful people, which meant his own sin had to be dealt
            with before his hands could touch a sacrifice for the nation. Hebrews later points out exactly
            how unusual it was that one priest would not need this.
          </p>
        </div>
        <VerseQuote
          text="Who needeth not daily, as those high priests, to offer up sacrifice, first for his own sins, and then for the people’s: for this he did once, when he offered up himself."
          reference="Hebrews 7:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every high priest after Aaron, generation after generation, had to repeat verse 10 to 14 before
            ever representing anyone else. Christians read Hebrews 7:27 as naming the one exception the
            whole Aaronic system was quietly pointing toward.
          </p>
          <p>
            <strong>Did this ceremony actually happen the way Exodus 29 describes it?</strong> Yes. Leviticus
            8 records Moses carrying out these exact instructions, down to the same three points on the
            body.
          </p>
        </div>
        <VerseQuote
          text="And he slew it; and Moses took of the blood of it, and put it upon the tip of Aaron’s right ear, and upon the thumb of his right hand, and upon the great toe of his right foot."
          reference="Leviticus 8:23"
        />
        <VerseQuote
          text="So Aaron and his sons did all things which the LORD commanded by the hand of Moses."
          reference="Leviticus 8:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nothing in Exodus 29 stayed theoretical. Leviticus shows the same blood landing in the same
            places, exactly as commanded.
          </p>
          <p>
            <strong>Why does the chapter close on God talking about where He will dwell, instead of ending on the sacrifices?</strong>{" "}
            Because the sacrifices were never the point. They were the cost of the point. God names His
            actual goal in verse 45, to dwell among His people as their God, and every earlier verse in the
            chapter exists to make that possible without it destroying them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 29
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 29:20</h3>
        <VerseQuote
          text="Then shalt thou kill the ram, and take of his blood, and put it upon the tip of the right ear of Aaron, and upon the tip of the right ear of his sons, and upon the thumb of their right hand, and upon the great toe of their right foot, and sprinkle the blood upon the altar round about."
          reference="Exodus 29:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that marks a priest in three places that actually matter for his job: what he hears,
          what his hands do, and where his feet carry him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 29:33</h3>
        <VerseQuote
          text="And they shall eat those things wherewith the atonement was made, to consecrate and to sanctify them: but a stranger shall not eat thereof, because they are holy."
          reference="Exodus 29:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A meal only the consecrated could eat. What atonement made holy, nobody outside the ceremony was
          permitted to share.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 29:38</h3>
        <VerseQuote
          text="Now this is that which thou shalt offer upon the altar; two lambs of the first year day by day continually."
          reference="Exodus 29:38"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A lamb at sunrise and a lamb at sunset, for as long as Israel stood. Not a single event, but a
          daily rhythm written into the start and end of every day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 29:45</h3>
        <VerseQuote text="And I will dwell among the children of Israel, and will be their God." reference="Exodus 29:45" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason the entire chapter exists. Every offering before this verse was the cost of a holy God
          living next to a people who had no right to His presence on their own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 1:14</h3>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Written centuries after Exodus 29, but Christians read it as the fuller answer to the same
          promise: God dwelling among His people, this time in a body rather than a tent.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 29
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 29 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29 gives Moses the ceremony for ordaining Aaron and his sons as priests: washing, dressing,
          anointing, a sin offering, a burnt offering, a ram of consecration with blood placed on the ear,
          thumb, and toe, a meal eaten at the tabernacle door, seven days of repeated atonement, and the
          standing order for a lamb offered every morning and every evening.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the ram of consecration?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The second of two rams sacrificed in the ceremony, named specifically for this purpose in Exodus
          29:22. Its blood marked Aaron and his sons on the ear, thumb, and toe, and part of it was waved
          before the Lord as an offering before becoming food for the men being ordained.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was blood put on Aaron&apos;s ear, thumb, and toe?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29:20 commands it without explaining the symbolism directly, but the three points correspond
          to a priest&apos;s actual work: hearing God&apos;s word, doing the work of his hands, and walking
          where his service required him to go.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Aaron need a sin offering made for himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Aaron was a sinful man like everyone he represented. Exodus 29:10 to 14 commands a bullock
          sacrificed specifically for his own sin before he could minister on behalf of anyone else, a
          pattern every high priest after him had to repeat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the ordination ceremony last seven days?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29:35 to 37 commands seven full days of consecration, with a fresh sin offering and a fresh
          atonement for the altar every day. The text does not explain the exact number, only that the
          process could not be shortened to a single ceremony.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;sweet savour&quot; mean in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a burnt offering fully given to God and fully accepted by Him, used in Exodus 29:18
          for the first ram. It pictures total surrender being welcomed, not God taking pleasure in the
          violence of the sacrifice itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t a stranger eat the consecration meal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29:33 says the food had become holy through the atonement made with it, so only the men
          being consecrated that day could eat it. Anything left by morning was burned rather than kept or
          shared.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the two lambs offered every morning and evening?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29:38 and 39 command a continual burnt offering, one lamb at sunrise and one at sunset,
          every single day Israel existed as a nation under this law. It was never a one time ceremony.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 29 end by talking about God dwelling with Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 29:45 and 46 state the purpose behind everything earlier in the chapter. God wanted to live
          among His people as their God, and the sacrifices, the washing, and the anointing were the way a
          holy God could do that without an unholy people being destroyed by His presence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 29 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 7:27 draws a direct contrast: every priest ordained by Exodus 29 needed sacrifice first for
          his own sin, then for the people&apos;s, over and over. Jesus needed neither, offering Himself
          once. John 1:14 answers the chapter&apos;s closing promise, that God would dwell among His people,
          this time in a body rather than a tent.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 29 is not about clothes anymore. It is about what it actually costs to qualify a sinful man to represent sinful people before a holy God.</p>
          <p>
            📌 <strong>Washing came before dressing, and dressing came before sacrifice.</strong> Nothing in
            this chapter happened out of order. Cleansing always came first.
          </p>
          <p>
            📌 <strong>Aaron could not serve anyone else until his own sin was dealt with.</strong> Blood on
            the ear, thumb, and toe marked a whole man, not just a title.
          </p>
          <p>
            📌 <strong>Every sacrifice in this chapter existed for one closing sentence.</strong> God wanted
            to dwell among His people. That was always the goal, not the blood itself.
          </p>
          <p>
            You will never need a bullock or a ram to come near God. But you live after a priest who needed
            no sin offering for Himself, and who finished what every day by day lamb in this chapter could
            only point toward.
          </p>
          <p>So here is your one next step.</p>
          <p>Read Hebrews 7:27 today, right after Exodus 29:38 and 39, and notice how long God had already been showing Israel what one final, sufficient sacrifice would look like.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
