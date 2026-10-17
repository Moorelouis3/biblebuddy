import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-2-explained", {
  title: "Leviticus 2 Explained: The Law of the Meat Offering",
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

export default function LeviticusTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-2-explained"
      title={<>📖 Leviticus 2 Explained: The Law of the Meat Offering</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No animal dies in this chapter. No blood touches the altar at all.</p>
            <p>
              <strong>Leviticus 2 explained</strong> is the law of the meat offering, and the old word
              &quot;meat&quot; is the first thing worth clearing up. In 1611 English it simply meant food. This
              chapter never mentions flesh. It is about flour, oil, frankincense, and salt, the ordinary
              contents of a kitchen rather than a flock.
            </p>
            <p>Maybe you assumed every Old Testament offering involved a knife.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God accept flour and oil as an offering made by fire at all?</li>
            <li>❓ Why does the priest burn only a handful, and keep the rest for himself?</li>
            <li>❓ Why is leaven banned from the fire here, when the same loaf shows up leavened later in Leviticus 23?</li>
            <li>❓ And why does every single offering in this chapter need salt?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 2 is the chapter that says worship is not only about what dies for you.
              Sometimes it is about what you grow, bake, and hand over.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the fine flour and frankincense, the
              three ways a worshipper could bake it, the handful burned and the portion kept, the leaven and
              honey that were never allowed near the fire, the firstfruits offering that breaks its own rule,
              and the salt that had to season every single gift.
            </p>
            <p>Read slowly. This is the quietest chapter in Leviticus so far, and it still has plenty to say.</p>
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
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> laid out the burnt
            offering: a bullock, a sheep or goat, or a bird, killed and entirely burned, a sweet savour
            rising from the altar with nothing held back for a meal.
          </p>
          <p>
            Leviticus 2 keeps the same closing phrase, the same fire, and the same altar. What changes is
            everything a worshipper actually brings.
          </p>
        </div>
        <VerseQuote
          text="And when any will offer a meat offering unto the LORD, his offering shall be of fine flour; and he shall pour oil upon it, and put frankincense thereon:"
          reference="Leviticus 2:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Any&quot; opens this chapter the same way &quot;any man&quot; opened the last
            one.</strong> The meat offering was never restricted to the wealthy. A man who had no herd and no
            flock still had flour.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 2 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Grain Itself: Fine Flour, Oil, and Frankincense (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens with three ingredients named in order: fine flour, oil poured on top, and
            frankincense laid on. Nothing here grows wild or costs nothing. Fine flour meant grain already
            ground and sifted, not raw stalks pulled from a field.
          </p>
        </div>
        <VerseQuote
          text="And he shall bring it to Aaron's sons the priests: and he shall take thereout his handful of the flour thereof, and of the oil thereof, with all the frankincense thereof; and the priest shall burn the memorial of it upon the altar, to be an offering made by fire, of a sweet savour unto the LORD:"
          reference="Leviticus 2:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Only a handful goes into the fire.</strong> The priest reaches in, takes a single
            handful of flour and oil, and burns that much alongside all the frankincense. The text calls this
            small portion &quot;the memorial,&quot; the part that stands in for the whole gift once it reaches
            the altar.
          </p>
          <p>Verse 3 then says what happens to everything the handful left behind.</p>
        </div>
        <VerseQuote
          text="And the remnant of the meat offering shall be Aaron's and his sons': it is a thing most holy of the offerings of the LORD made by fire."
          reference="Leviticus 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;Most holy&quot; is a strong phrase, and it describes flour and oil, not an
            animal&apos;s blood.</strong> Holiness in this chapter is not measured by what the gift cost or
            whether it bled. It is measured by whose it became once it was given.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Three Ways to Bake It: Oven, Pan, and Fryingpan (verses 4 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 1 described raw flour. The next four verses assume a worshipper baked it first, and the law
            scales to however his kitchen actually worked.
          </p>
        </div>
        <VerseQuote
          text="And if thou bring an oblation of a meat offering baken in the oven, it shall be unleavened cakes of fine flour mingled with oil, or unleavened wafers anointed with oil."
          reference="Leviticus 2:4"
        />
        <VerseQuote
          text="And if thy oblation be a meat offering baken in a pan, it shall be of fine flour unleavened, mingled with oil. Thou shalt part it in pieces, and pour oil thereon: it is a meat offering."
          reference="Leviticus 2:5 and 6"
        />
        <VerseQuote
          text="And if thy oblation be a meat offering baken in the fryingpan, it shall be made of fine flour with oil."
          reference="Leviticus 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Oven, pan, or fryingpan, the law never asks which one a worshipper owned.</strong> Each
            method gets its own verse and its own small variation, cakes or wafers from the oven, pieces torn
            apart and oiled again from the pan. One requirement stays fixed through all three: unleavened.
          </p>
          <p>
            That word is going to matter a great deal two verses from now, so hold onto it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Handful for God, the Rest for the Priests (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whichever way it was baked, the same two steps follow.</p>
        </div>
        <VerseQuote
          text="And thou shalt bring the meat offering that is made of these things unto the LORD: and when it is presented unto the priest, he shall bring it unto the altar."
          reference="Leviticus 2:8"
        />
        <VerseQuote
          text="And the priest shall take from the meat offering a memorial thereof, and shall burn it upon the altar: it is an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 2:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The pattern from verse 2 repeats exactly: a memorial portion burns, nothing more. Verse 10 then
            states, almost word for word, what verse 3 already said about the flour offering.
          </p>
        </div>
        <VerseQuote
          text="And that which is left of the meat offering shall be Aaron's and his sons': it is a thing most holy of the offerings of the LORD made by fire."
          reference="Leviticus 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare that to the chapter just before this one.</strong> In{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink>, the burnt offering went
            up entirely as smoke, with nothing left for anyone. Here, a small handful goes to the fire and the
            far larger remainder becomes food for Aaron and his sons. The meat offering was a worshipper&apos;s
            gift and the priesthood&apos;s provision at the same time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. No Leaven, No Honey, Ever (verse 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse, and the law closes a door it never opens again in this chapter.</p>
        </div>
        <VerseQuote
          text="No meat offering, which ye shall bring unto the LORD, shall be made with leaven: for ye shall burn no leaven, nor any honey, in any offering of the LORD made by fire."
          reference="Leviticus 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Every cake, wafer, and piece in verses 4 through 7 was already called
            &quot;unleavened.&quot;</strong> Verse 11 now says why, and widens the rule past this chapter: no
            leaven and no honey may ever be burned in any fire offering to the LORD, not just the meat
            offering described here.
          </p>
          <p>
            The same unleavened standard had already shown up once before, in the bread Aaron and his sons
            ate at their own ordination, when{" "}
            <ArticleLink href="/blog/exodus-29-explained">Exodus 29</ArticleLink> listed three kinds of
            unleavened bread among the offerings for consecrating the priesthood. Leviticus 2 now turns that
            same standard into a rule for every Israelite who ever brought flour to the altar.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Firstfruits That Never Touch the Fire (verse 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after that strict rule, one verse seems to step outside it.</p>
        </div>
        <VerseQuote
          text="As for the oblation of the firstfruits, ye shall offer them unto the LORD: but they shall not be burnt on the altar for a sweet savour."
          reference="Leviticus 2:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Offered, but not burned.</strong> That is an unusual instruction in a chapter built
            entirely around fire. Leviticus does not explain which firstfruits offering this verse means here,
            but the rest of the book answers it later, at the Feast of Weeks.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Salt in Every Offering: A Covenant That Cannot Run Out (verse 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter pauses here for a requirement that applies to far more than the meat offering alone.</p>
        </div>
        <VerseQuote
          text="And every oblation of thy meat offering shalt thou season with salt; neither shalt thou suffer the salt of the covenant of thy God to be lacking from thy meat offering: with all thine offerings thou shalt offer salt."
          reference="Leviticus 2:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;With all thine offerings thou shalt offer salt.&quot;</strong> Not just the
            flour. Every offering in the whole sacrificial system needed salt, tied here to &quot;the covenant
            of thy God.&quot; Numbers later ties the same two words together again, salt and covenant, for the
            priesthood&apos;s own lasting portion of the offerings.
          </p>
        </div>
        <VerseQuote
          text="All the heave offerings of the holy things, which the children of Israel offer unto the LORD, have I given thee, and thy sons and thy daughters with thee, by a statute for ever: it is a covenant of salt for ever before the LORD unto thee and to thy seed with thee."
          reference="Numbers 18:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Leviticus does not explain why salt carries this weight, only that it does, and the requirement
            never lets up. Centuries later, Jesus reaches for the same image when He describes His own
            followers.
          </p>
        </div>
        <VerseQuote
          text="Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men."
          reference="Matthew 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            And Mark records Jesus making the connection to the altar itself even more directly, using the
            exact picture this chapter opened.
          </p>
        </div>
        <VerseQuote
          text="For every one shall be salted with fire, and every sacrifice shall be salted with salt."
          reference="Mark 9:49"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Green Ears Dried by Fire: A Second Kind of Firstfruits (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes with a second, different firstfruits offering, and this one does go into the
            fire.
          </p>
        </div>
        <VerseQuote
          text="And if thou offer a meat offering of thy firstfruits unto the LORD, thou shalt offer for the meat offering of thy firstfruits green ears of corn dried by the fire, even corn beaten out of full ears."
          reference="Leviticus 2:14"
        />
        <VerseQuote
          text="And thou shalt put oil upon it, and lay frankincense thereon: it is a meat offering. And the priest shall burn the memorial of it, part of the beaten corn thereof, and part of the oil thereof, with all the frankincense thereof: it is an offering made by fire unto the LORD."
          reference="Leviticus 2:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This firstfruits offering is roasted grain straight from the stalk, oiled, and burned
            exactly like the flour offering that opened the chapter.</strong> It is not the same gift verse 12
            held back from the fire. That one appears later in Leviticus, described as two loaves presented at
            the Feast of Weeks.
          </p>
        </div>
        <VerseQuote
          text="Ye shall bring out of your habitations two wave loaves of two tenth deals: they shall be of fine flour; they shall be baken with leaven; they are the firstfruits unto the LORD."
          reference="Leviticus 23:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Read that verse next to verse 11 of this chapter, and the two firstfruits offerings stop looking
            like a contradiction. The wave loaves of the Feast of Weeks were baked with leaven on purpose.
            Verse 11 had already banned burning any leaven in a fire offering. So the loaves were presented to
            the LORD exactly as verse 12 said, offered, but never burned on the altar, while the roasted green
            ears here, with no leaven in them at all, went straight into the fire like every other meat
            offering in the chapter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 2 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why forbid leaven and honey from the fire, when both were common and good foods in
            Israel?</strong> Leviticus 2:11 states the rule without stating the reason. What is widely agreed,
            without claiming the text spells it out, is that leaven works by fermentation, a visible process of
            corruption spreading through dough, which made it an unfit picture for a gift meant to represent
            something whole and unspoiled. Paul later leans on that same picture directly.
          </p>
        </div>
        <VerseQuote
          text="Your glorying is not good. Know ye not that a little leaven leaveneth the whole lump? Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. For even Christ our passover is sacrificed for us:"
          reference="1 Corinthians 5:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That same unleavened standard governed the week after Israel&apos;s first Passover, when{" "}
            <ArticleLink href="/blog/exodus-12-explained">Exodus 12</ArticleLink> commanded a whole feast of
            bread made without leaven, tying this chapter&apos;s fire offering back to the night Israel left
            Egypt.
          </p>
          <p>
            <strong>Why does verse 12 say the firstfruits offering should not be burned, right after a chapter
            built entirely around burning things?</strong> Leviticus 2 itself does not name which offering
            verse 12 means. Leviticus 23:17 answers it later: that firstfruits gift was two loaves baked with
            leaven, which verse 11 had already excluded from the fire. The two firstfruits offerings are not in
            tension with each other. They are simply two different gifts, one leavened and withheld from the
            altar, one unleavened and burned on it.
          </p>
          <p>
            <strong>Why does a grain offering with no blood in it get called &quot;most holy,&quot; the same
            weight of word used for the ark itself?</strong> Leviticus 2:3 and 2:10 state the term without
            ranking it against the burnt offering&apos;s own holiness. What the text does make clear is who
            benefits: &quot;most holy&quot; food could only be eaten by Aaron and his sons, inside the
            tabernacle courts, never taken home to their families. The label marks a boundary on who may touch
            it, not a competition between offerings.
          </p>
          <p>
            <strong>Why does the priest burn only a handful instead of the whole offering?</strong> The text
            does not explain the mechanics of the memorial portion, only its function: a small part stands in
            for the whole gift once it reaches God. The worshipper&apos;s entire offering is still accounted as
            given, even though most of it becomes food for the priesthood rather than smoke on the altar.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 2:2</h3>
        <VerseQuote
          text="And he shall bring it to Aaron's sons the priests: and he shall take thereout his handful of the flour thereof, and of the oil thereof, with all the frankincense thereof; and the priest shall burn the memorial of it upon the altar, to be an offering made by fire, of a sweet savour unto the LORD:"
          reference="Leviticus 2:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A single handful represents an entire gift. The rest never disappears, it feeds the priesthood, but
          the whole offering still counts as given to God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 2:11</h3>
        <VerseQuote
          text="No meat offering, which ye shall bring unto the LORD, shall be made with leaven: for ye shall burn no leaven, nor any honey, in any offering of the LORD made by fire."
          reference="Leviticus 2:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A rule that reaches past this one chapter into every fire offering in the whole sacrificial system,
          and one the New Testament keeps coming back to for its own picture of corruption and purity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 2:13</h3>
        <VerseQuote
          text="And every oblation of thy meat offering shalt thou season with salt; neither shalt thou suffer the salt of the covenant of thy God to be lacking from thy meat offering: with all thine offerings thou shalt offer salt."
          reference="Leviticus 2:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The only verse in the chapter that widens past the meat offering by name, naming salt as part of
          every single offering Israel ever brought.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 2:16</h3>
        <VerseQuote
          text="And the priest shall burn the memorial of it, part of the beaten corn thereof, and part of the oil thereof, with all the frankincense thereof: it is an offering made by fire unto the LORD."
          reference="Leviticus 2:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s last verse, closing a second firstfruits offering with the same memorial pattern
          that opened the whole law back in verse 2.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 2 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2 lays out the law of the meat offering, a grain gift of fine flour, oil, and frankincense
          brought raw or baked. The priest burns a small handful as a memorial, and the rest becomes food for
          Aaron and his sons.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a meat offering in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In the King James Bible, &quot;meat&quot; meant food in general, not flesh. Leviticus 2&apos;s meat
          offering never involves an animal. It is made of flour, oil, frankincense, and salt, offered raw,
          baked, or as roasted green ears of grain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was leaven forbidden in the meat offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2:11 bans both leaven and honey from any offering burned by fire, without stating the
          reason. Bible teachers commonly connect leaven&apos;s fermenting process to corruption, a reading 1
          Corinthians 5:6 and 7 later builds on directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the covenant of salt in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2:13 requires salt in every offering, calling it &quot;the salt of the covenant of thy
          God.&quot; Numbers 18:19 uses the same phrase, &quot;covenant of salt,&quot; for the priesthood&apos;s
          lasting share of Israel&apos;s offerings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;most holy&quot; mean in Leviticus 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2:3 and 2:10 call the remainder of the meat offering &quot;most holy,&quot; meaning only
          Aaron and his sons could eat it, and only within the tabernacle courts. The term marks who may touch
          the gift, not how it compares to other offerings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the firstfruits offering in verse 12 not get burned, when the one in verses 14 to 16 did?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They are two different gifts. Leviticus 23:17 identifies the firstfruits of verse 12 as two loaves
          baked with leaven, already excluded from the fire by verse 11. The green ears of verses 14 to 16 have
          no leaven, so they burn like the rest of the chapter&apos;s offerings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the priest only burn a handful of the offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2:2 and 2:9 call this handful &quot;the memorial,&quot; a representative portion standing
          in for the entire gift. The rest did not go to waste. It became food set apart for Aaron and his
          sons.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the meat offering required, or voluntary?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2 opens with &quot;when any will offer,&quot; the same voluntary language that opened the
          burnt offering in Leviticus 1:3. Later chapters attach meat offerings to required sacrifices, but
          this chapter describes it as a freewill gift.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 2 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus draws on this chapter&apos;s own images when He calls His followers &quot;the salt of the
          earth&quot; in Matthew 5:13, and Mark 9:49 ties salt directly back to sacrifice itself, echoing
          Leviticus 2:13&apos;s command that every offering be seasoned with salt.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 2 never asks for an animal, and it still calls what it asks for &quot;most holy.&quot;</p>
          <p>
            📌 <strong>Worship was never limited to what could bleed.</strong> Flour, oil, and frankincense,
            the ordinary contents of a kitchen, were accepted as a sweet savour unto the LORD the same as a
            bullock.
          </p>
          <p>
            📌 <strong>A handful stood for the whole, and the whole still counted as given.</strong> God did
            not need the entire offering burned to receive it as complete.
          </p>
          <p>
            📌 <strong>Purity and permanence mattered more than size.</strong> No leaven allowed near the fire,
            no honey either, but salt in every single gift, without exception.
          </p>
          <p>
            You will likely never bring fine flour to an altar. But you still decide, this week, whether the
            ordinary things you produce, your work, your time, what you actually make with your hands, ever
            get offered at all.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one ordinary thing you made or earned this week, and bring it to God deliberately, the way
            Leviticus 2 opens, instead of only noticing Him on the days something dramatic happens.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
