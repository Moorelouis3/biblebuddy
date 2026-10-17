import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-1-explained", {
  title: "Leviticus 1 Explained: The Law of the Burnt Offering",
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

export default function LeviticusOneExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-1-explained"
      title={<>📖 Leviticus 1 Explained: The Law of the Burnt Offering</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The tabernacle is finally standing. Now someone has to be told what to actually do inside it.</p>
            <p>
              <strong>Leviticus 1 explained</strong> is the first law in the whole book, and it is not about priests
              or Israel&apos;s leaders. It is written for any ordinary man who wants to bring an offering to the
              LORD, whether he owns a herd of cattle, a few sheep, or nothing more than a couple of birds.
            </p>
            <p>Maybe you have skipped past Leviticus before, assuming it was all rules with no story in it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God speak to Moses from inside a tent he could not enter one chapter ago?</li>
            <li>❓ What did it mean to lay your hand on an animal&apos;s head before it died?</li>
            <li>❓ Why does the law offer three completely different options depending on what you own?</li>
            <li>❓ And why burn the whole animal, when later chapters let people eat parts of other offerings?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 1 is the law that makes worship possible for a rich man and a poor man alike,
              on exactly the same terms.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the general command any Israelite could
              follow, the hand laid on the animal&apos;s head, the bullock from the herd, the sheep or goat from
              the flock, and the turtledoves or pigeons available to a man who had neither.
            </p>
            <p>Read slowly. This chapter decides who gets to approach God, and on what terms, long before it ever discusses sin directly.</p>
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
            <ArticleLink href="/blog/exodus-40-explained">Exodus 40</ArticleLink> ended with a cloud and a glory so
            full that Moses, the one man who had spoken with God face to face on the mountain, could not walk
            through the tabernacle&apos;s own door.
          </p>
          <p>Leviticus opens on the very next line of Scripture, and it quietly answers a question Exodus 40 left hanging.</p>
        </div>
        <VerseQuote
          text="And the LORD called unto Moses, and spake unto him out of the tabernacle of the congregation, saying,"
          reference="Leviticus 1:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God is no longer calling Moses up a mountain. He is calling him out of the tent itself.</strong>{" "}
            Whatever kept Moses outside at the end of Exodus did not keep him out forever. The glory that once
            filled the whole structure has settled enough that a voice can now come from inside it, and Moses is
            close enough to hear it clearly.
          </p>
          <p>
            The building is finished. The furniture is in place. What is missing is instruction: nobody has told
            Israel yet how to actually use any of it. Leviticus 1 is where that silence ends.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 1 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Any Man, A Willing Gift (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very first command in Leviticus is addressed wider than you might expect.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, If any man of you bring an offering unto the LORD, ye shall bring your offering of the cattle, even of the herd, and of the flock."
          reference="Leviticus 1:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;If any man of you.&quot;</strong> Not Aaron. Not the priests. This law is written for an
            ordinary Israelite deciding to bring an offering. The priests appear a few verses later, but only to
            handle the blood and the fire. The decision to come belongs to the worshipper himself.
          </p>
          <p>The next verse narrows the first kind of offering down and states something easy to read past.</p>
        </div>
        <VerseQuote
          text="If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD."
          reference="Leviticus 1:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;Of his own voluntary will&quot;</strong> matters. The burnt offering described in this
            chapter was not a fine for a specific sin. It was a gift a man chose to bring. Later chapters in
            Leviticus describe offerings that are required after a particular failure. This one opens the book
            instead as something freely given, by a man who simply wanted to come near to God. That is not a new
            idea in Israel&apos;s story.{" "}
            <ArticleLink href="/blog/genesis-4-explained">Cain and Abel both brought offerings</ArticleLink> long
            before any tabernacle existed, and the difference between them was never the category of gift. It was
            the willingness behind it.
          </p>
          <p>
            <strong>Without blemish</strong> meant no missing part, no disease, no visible flaw. A worshipper could
            not quietly bring the weakest animal in his herd and call it a gift. Abraham had already lived this
            principle out generations earlier, when{" "}
            <ArticleLink href="/blog/genesis-22-explained">a ram took Isaac&apos;s place on Mount Moriah</ArticleLink>, and
            nothing in that story suggests Abraham would have offered a damaged animal either. The same standard
            carried straight into the priesthood itself, when{" "}
            <ArticleLink href="/blog/exodus-29-explained">Aaron and his sons were ordained</ArticleLink> with a ram
            held to this exact measure.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Hand on the Head: What One Gesture Meant (verse 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before any blood is shed, the text pauses on a single physical action.</p>
        </div>
        <VerseQuote
          text="And he shall put his hand upon the head of the burnt offering; and it shall be accepted for him to make atonement for him."
          reference="Leviticus 1:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The text states the result plainly: the offering is accepted to make atonement for the man
            bringing it.</strong> What it does not explain is exactly how laying a hand on an animal&apos;s head
            accomplished that. Leviticus simply records the gesture and moves on, the same way a reader is told
            what the ark looked like without being told why gold was the metal God chose.
          </p>
          <p>
            ⚠️ What most Bible teachers agree on, without claiming the text spells it out, is that the hand
            created a visible link between the worshipper and the animal standing in for him. The man was not a
            spectator watching something happen nearby. He was physically connected to the one thing about to die
            in his place.
          </p>
          <p>
            That same substitution had already played out once in Israel&apos;s family history, generations before
            any tabernacle existed.
          </p>
        </div>
        <VerseQuote
          text="And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son."
          reference="Genesis 22:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;In the stead of his son&quot; is the whole idea Leviticus 1:4 now turns into fixed
            law.</strong> One life stands in for another. Abraham lived it once, on a single mountain, for his own
            son. Leviticus 1 makes it something every Israelite could do, for himself, at the tabernacle door.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Bullock From the Herd: Blood, Fire, and Order (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From here, the chapter reads almost like a checklist, and the order itself is part of the point.</p>
        </div>
        <VerseQuote
          text="And he shall kill the bullock before the LORD: and the priests, Aaron's sons, shall bring the blood, and sprinkle the blood round about upon the altar that is by the door of the tabernacle of the congregation."
          reference="Leviticus 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice who does what. The worshipper kills the animal himself. The priests only take over once blood
            is involved, carrying it to the altar and sprinkling it all around. Killing was not outsourced to a
            professional. The man bringing the gift felt the weight of it with his own hands.
          </p>
        </div>
        <VerseQuote
          text="And he shall flay the burnt offering, and cut it into his pieces. And the sons of Aaron the priest shall put fire upon the altar, and lay the wood in order upon the fire:"
          reference="Leviticus 1:6 and 7"
        />
        <VerseQuote
          text="And the priests, Aaron's sons, shall lay the parts, the head, and the fat, in order upon the wood that is on the fire which is upon the altar: But his inwards and his legs shall he wash in water: and the priest shall burn all on the altar, to be a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 1:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Burn all.&quot;</strong> Head, fat, inwards, legs, every part, once washed. Nothing
            here gets set aside for the priest&apos;s own table or the worshipper&apos;s own meal. That detail
            separates the burnt offering from several of the other offerings Leviticus goes on to describe, where
            a portion is eaten rather than entirely consumed by fire.
          </p>
          <p>
            <strong>Sweet savour</strong> closes the section, the first of three times this exact phrase appears
            in the chapter. The wording pictures the smoke itself as something pleasing, rising up from the
            altar toward God rather than lingering at ground level among the people who brought it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Sheep or the Goat: A Smaller Animal, the Same Pattern (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law does not stop at cattle. It immediately scales down for anyone without a herd.</p>
        </div>
        <VerseQuote
          text="And if his offering be of the flocks, namely, of the sheep, or of the goats, for a burnt sacrifice; he shall bring it a male without blemish."
          reference="Leviticus 1:10"
        />
        <VerseQuote
          text="And he shall kill it on the side of the altar northward before the LORD: and the priests, Aaron's sons, shall sprinkle his blood round about upon the altar."
          reference="Leviticus 1:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One new detail appears here that the bullock section never mentioned: this animal is killed
            specifically on the north side of the altar. Leviticus never explains why that side and not another.
            What is clear is that even the exact spot a smaller animal died was not left to personal preference.
          </p>
        </div>
        <VerseQuote
          text="And he shall cut it into his pieces, with his head and his fat: and the priest shall lay them in order on the wood that is on the fire which is upon the altar: But he shall wash the inwards and the legs with water: and the priest shall bring it all, and burn it upon the altar: it is a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 1:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Read verses 12 and 13 next to verses 8 and 9, and the wording is almost identical.</strong> A
            smaller animal from a poorer household went through the same washing, the same order on the wood, and
            earned the exact same phrase at the end: a sweet savour unto the LORD. Wealth changed what a man
            brought. It never changed whether God called the gift acceptable.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Turtledoves or Pigeons: An Offering Sized to a Poor Man&apos;s Hands (verses 14 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with the smallest option of all, for the man who owned neither a herd nor a flock.</p>
        </div>
        <VerseQuote
          text="And if the burnt sacrifice for his offering to the LORD be of fowls, then he shall bring his offering of turtledoves, or of young pigeons."
          reference="Leviticus 1:14"
        />
        <VerseQuote
          text="And the priest shall bring it unto the altar, and wring off his head, and burn it on the altar; and the blood thereof shall be wrung out at the side of the altar:"
          reference="Leviticus 1:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice what is missing here.</strong> The bullock and the flock animal both had to be
            &quot;male without blemish.&quot; That exact phrase never appears for the birds. The text does not
            explain the gap. What is observable is only that the standard applied to a man&apos;s cattle or flock
            is not repeated word for word once the offering shrinks down to what a poor man could actually carry
            in his hands.
          </p>
        </div>
        <VerseQuote
          text="And he shall pluck away his crop with his feathers, and cast it beside the altar on the east part, by the place of the ashes: And he shall cleave it with the wings thereof, but shall not divide it asunder: and the priest shall burn it upon the altar, upon the wood that is upon the fire: it is a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 1:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The exact same closing phrase, &quot;a sweet savour unto the LORD,&quot; ends this section
            too, the third and final time in seventeen verses.</strong> A bullock worth a small fortune and a
            single bird worth almost nothing both finish the chapter described in identical words.
          </p>
          <p>
            This same provision for turtledoves and pigeons runs through more than one chapter of Leviticus for
            more than one kind of offering, and centuries later a young couple relied on exactly this allowance
            at the temple in Jerusalem.
          </p>
        </div>
        <VerseQuote
          text="And to offer a sacrifice according to that which is said in the law of the Lord, A pair of turtledoves, or two young pigeons."
          reference="Luke 2:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Mary and Joseph brought birds, not a lamb, after Jesus was born. The law that made room for the
            poorest worshipper in Leviticus 1 was still operating, unchanged, the exact year God&apos;s own Son
            was born into a family that needed it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 1 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why was the burnt offering burned entirely, instead of partly eaten like other offerings?</strong>{" "}
            Leviticus 1 does not explain its own name, but Bible teachers widely connect it to the Hebrew word
            behind &quot;burnt offering,&quot; commonly understood to mean that which goes up or ascends. Every
            other detail in the chapter supports that reading. Nothing is set aside for a meal. The whole animal
            rises as smoke, with nothing held back for the man who brought it or the priest who handled it.
          </p>
          <p>
            <strong>Did laying a hand on the animal&apos;s head actually transfer the man&apos;s sin onto it?</strong>{" "}
            The text states only that the act made the offering &quot;accepted... to make atonement for him.&quot;
            It does not describe a mechanism. What Christians have widely read into this gesture, reading it
            alongside the rest of Scripture, is a picture of substitution: an innocent life standing in for a
            guilty one. That reading fits the pattern already seen with Abraham&apos;s ram, but Leviticus 1 itself
            stops short of spelling out exactly what the hand accomplished.
          </p>
          <p>
            <strong>Why require a male animal specifically?</strong> Leviticus 1:3 and 1:10 both state the
            requirement without giving a reason. One explanation commonly offered by Bible teachers, though not
            stated in the text itself, is practical: a herding economy needed far fewer males than females to
            keep its numbers growing, so giving up a male cost less to the flock&apos;s future than giving up a
            breeding female would have.
          </p>
          <p>
            <strong>Could the burnt offering really take away sin on its own?</strong> Leviticus 1:4 says the
            offering was accepted to make atonement, and the text leaves it there. Centuries later, Hebrews looks
            back at this entire system of animal sacrifice and states its limit plainly.
          </p>
        </div>
        <VerseQuote
          text="For it is not possible that the blood of bulls and of goats should take away sins."
          reference="Hebrews 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Leviticus 1 never claims otherwise. It describes a real, commanded form of worship and atonement
            within its own system, while the rest of Scripture eventually points past it to something the blood
            of an animal was never meant to finish on its own.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 1:3</h3>
        <VerseQuote
          text="If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD."
          reference="Leviticus 1:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The very first instruction in Leviticus, and it is built on a free choice to come near to God, not on a
          penalty for something already done wrong.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 1:4</h3>
        <VerseQuote
          text="And he shall put his hand upon the head of the burnt offering; and it shall be accepted for him to make atonement for him."
          reference="Leviticus 1:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One physical gesture, and the whole idea of substitution, one life standing in for another, becomes
          written law instead of a story that happened once on a mountain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 1:9</h3>
        <VerseQuote
          text="But his inwards and his legs shall he wash in water: and the priest shall burn all on the altar, to be a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 1:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Nothing held back, nothing eaten, nothing kept. The whole animal becomes smoke rising toward God rather
          than a meal for anyone standing at the altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 1:17</h3>
        <VerseQuote
          text="And he shall cleave it with the wings thereof, but shall not divide it asunder: and the priest shall burn it upon the altar, upon the wood that is upon the fire: it is a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 1:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s last verse, closing a poor man&apos;s single bird with the identical phrase given to
          a rich man&apos;s bullock three times over.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 1 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 1 lays out the law of the burnt offering, the first command given from the newly finished
          tabernacle. It covers three options depending on what a worshipper owned: a bullock from the herd, a
          sheep or goat from the flock, or turtledoves and pigeons for anyone with neither.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a burnt offering in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A burnt offering was an animal sacrifice entirely consumed by fire on the altar, with nothing eaten
          afterward by the priest or the worshipper. Leviticus 1:9, 1:13, and 1:17 all describe the whole animal
          burning as &quot;a sweet savour unto the LORD.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the burnt offering have to be a male without blemish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 1:3 and 1:10 state the requirement without giving a reason. Bible teachers commonly connect it
          to giving God a worshipper&apos;s best rather than a flawed or expendable animal, though the text itself
          does not spell out why a male was specified.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to lay your hand on the offering&apos;s head?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 1:4 says the act made the offering accepted to make atonement for the man bringing it. Many
          Christians read this as a picture of substitution, one life standing in for another, similar to the ram
          that took Isaac&apos;s place in Genesis 22, though Leviticus itself does not explain the mechanism.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why are there three different offerings in Leviticus 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The bullock, the sheep or goat, and the turtledoves or pigeons scale the cost of the offering to what a
          worshipper actually owned. Luke 2:24 shows this same provision for birds still in use centuries later,
          when Mary and Joseph brought turtledoves rather than a lamb.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;sweet savour&quot; mean in Leviticus 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes the smoke of the burnt offering as pleasing, rising up from the altar toward God. The exact
          phrase &quot;sweet savour unto the LORD&quot; closes all three kinds of offering in this chapter, the
          bullock, the flock animal, and the birds, in identical words.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the burnt offering take away sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 1:4 says the offering was accepted to make atonement, within the system Leviticus describes.
          Hebrews 10:4 later states plainly that the blood of bulls and goats could never actually take away sins
          on its own, pointing ahead to something greater than this chapter&apos;s own system could finish.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus start with burnt offerings instead of other laws?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 1 opens with God speaking from the tabernacle Moses had just finished setting up in Exodus 40.
          The burnt offering, a voluntary gift rather than a response to a specific sin, gives Israel its first
          lesson in approaching God before the book moves on to offerings tied to particular failures.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 1 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The burnt offering pictures an innocent life given in place of a guilty one, the same substitution seen
          when a ram died in Isaac&apos;s place in Genesis 22. Hebrews 10:4 says animal blood could never finish
          what this picture pointed toward, which Christians understand Christ&apos;s own sacrifice to complete.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 1 is the first law in a book famous for being hard to read. It is not hard to understand.</p>
          <p>
            📌 <strong>Worship here starts as a choice, not a penalty.</strong> &quot;Of his own voluntary
            will&quot; opens the whole book of Leviticus, before a single required sacrifice is ever named.
          </p>
          <p>
            📌 <strong>What you bring can change. Whether God accepts it does not.</strong> A bullock, a goat, or a
            single bird, each one finishes the chapter with the exact same words: a sweet savour unto the LORD.
          </p>
          <p>
            📌 <strong>A hand on an animal&apos;s head said something words alone could not.</strong> One life
            standing in for another was not a new idea here. Abraham had already lived it once, and Leviticus 1
            turned it into something every Israelite could do for himself.
          </p>
          <p>
            You will never bring a bullock to an altar. But you still bring God something, your time, your
            attention, whatever you actually have, and this chapter insists that what matters most is not its size.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Leviticus 1:3 again today, and ask whether what you bring to God this week is given freely, the
            way this chapter opens, or only handed over when you feel you have no other choice.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
