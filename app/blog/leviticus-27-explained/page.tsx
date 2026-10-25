import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-27-explained", {
  title: "Leviticus 27 Explained: The Law of Vows and Valuations",
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

export default function LeviticusTwentySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-27-explained"
      title={<>📖 Leviticus 27 Explained: The Law of Vows and Valuations</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A man opens his mouth and promises something to God. Now what?</p>
            <p>
              <strong>Leviticus 27 explained</strong> is the last chapter of this book, and it
              closes the whole thing with a question none of the feasts or sacrifices answered
              yet: once you have told God you will give Him something, what happens if that
              something turns out to be a person, a house, or a field you cannot simply hand over?
            </p>
            <p>Maybe you have skipped this chapter, assuming a list of prices has nothing to teach you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the chapter put a shekel price on a human being?</li>
            <li>❓ What happens if someone vows something and then cannot afford to pay it?</li>
            <li>❓ Why could some things never be bought back, no matter the price offered?</li>
            <li>❓ And why does Leviticus choose to end on this note, after everything else it already covered?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 27 is not about what a person is worth to God. It is about what
              a careless promise costs the person who made it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: valuing a person vowed to
              the LORD, the rule against swapping a good animal for a bad one, a house made holy,
              a field priced by the clock of Jubilee, and the handful of things no amount of money
              could ever redeem.
            </p>
            <p>Read slowly. This chapter is Moses closing the book with a warning about words.</p>
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
            <ArticleLink href="/blog/leviticus-26-explained">Leviticus 26</ArticleLink> closed the
            covenant itself: blessing for obedience, five stages of discipline for refusing to
            listen, and a promise that God would remember His covenant with Abraham, Isaac, and
            Jacob even in exile. That chapter ended by saying these were the statutes the LORD
            gave Moses at Sinai.
          </p>
          <p>
            Leviticus 27 adds one more thing before the book truly closes. Nothing in the chapters
            before this one dealt with a vow, a spoken promise to give God something beyond what
            the Law already required. This chapter answers exactly what a vow cost, verse by
            verse, for a person, an animal, a house, or a field, and it ends by repeating the same
            line Leviticus 26 just used: these are the commandments given at Sinai.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 27 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Valuing a Person Vowed to the LORD (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the kind of vow people actually made: giving a person&apos;s service to the LORD.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak unto the children of Israel, and say unto them, When a man shall make a singular vow, the persons shall be for the LORD by thy estimation."
          reference="Leviticus 27:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A &quot;singular vow&quot; means one specific vow about one specific person, not a
            general class of promise. If someone vowed a person&apos;s life or service to the
            LORD, that person had to be bought back with money instead, set at a price the priest
            could enforce fairly.
          </p>
        </div>
        <VerseQuote
          text="And thy estimation shall be of the male from twenty years old even unto sixty years old, even thy estimation shall be fifty shekels of silver, after the shekel of the sanctuary. And if it be a female, then thy estimation shall be thirty shekels."
          reference="Leviticus 27:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next three verses build out the rest of the scale by age.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>👀 Five to twenty years old: twenty shekels for a male, ten for a female.</li>
          <li>👀 A month old to five years old: five shekels for a male, three for a female.</li>
          <li>👀 Sixty years old and older: fifteen shekels for a male, ten for a female.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 These numbers were never a verdict on a person&apos;s worth before God. They were a
            redemption fee, tracking how much labor a person of that age and sex could typically
            contribute in Israel&apos;s agricultural economy. The highest price, fifty shekels,
            went to a man in his strongest working years. The same book that prices a vow this way
            also says every person, male and female, carries God&apos;s image equally.
          </p>
          <p>Then comes the verse that keeps the whole scale from crushing a poor family.</p>
        </div>
        <VerseQuote
          text="But if he be poorer than thy estimation, then he shall present himself before the priest, and the priest shall value him; according to his ability that vowed shall the priest value him."
          reference="Leviticus 27:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The fixed price was never the last word. A poor man&apos;s vow was valued
            against what he could actually pay, not against a chart he could never reach.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Animals: No Swapping Good for Bad (verses 9 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From people, the law turns to the animal most often actually vowed: livestock for an offering.</p>
        </div>
        <VerseQuote
          text="And if it be a beast, whereof men bring an offering unto the LORD, all that any man giveth of such unto the LORD shall be holy. He shall not alter it, nor change it, a good for a bad, or a bad for a good: and if he shall at all change beast for beast, then it and the exchange thereof shall be holy."
          reference="Leviticus 27:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Once an animal was vowed, swapping it for a cheaper one was not just discouraged, it
            was impossible to pull off. The law simply declared both animals holy the moment
            anyone tried the switch, so the attempted fraud cost the owner double instead of
            saving him anything.
          </p>
          <p>The next verses cover an animal that was never fit for sacrifice in the first place.</p>
        </div>
        <VerseQuote
          text="And if it be any unclean beast, of which they do not offer a sacrifice unto the LORD, then he shall present the beast before the priest: And the priest shall value it, whether it be good or bad: as thou valuest it, who art the priest, so shall it be. But if he will at all redeem it, then he shall add a fifth part thereof unto thy estimation."
          reference="Leviticus 27:11 to 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Redeeming something back from God always cost more than the thing itself
            was worth.</strong> Adding a fifth, twenty percent, shows up again later in this
            chapter for houses, fields, and tithes. It was not a punishment. It was the price of
            changing your mind after you had already given your word.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A House Sanctified to the LORD (verses 14 and 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A house was next, and the same redemption pattern repeats.</p>
        </div>
        <VerseQuote
          text="And when a man shall sanctify his house to be holy unto the LORD, then the priest shall estimate it, whether it be good or bad: as the priest shall estimate it, so shall it stand. And if he that sanctified it will redeem his house, then he shall add the fifth part of the money of thy estimation unto it, and it shall be his."
          reference="Leviticus 27:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice who sets the price here: the priest, not the man who made the vow. A person
            could not quietly lowball the value of his own house to make redeeming it cheaper. An
            outside judgment protected the vow from being gamed by the very person who spoke it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Fields and the Jubilee Clock (verses 16 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Land is where the chapter gets the most specific, because land in Israel was never fully for sale.</p>
        </div>
        <VerseQuote
          text="And if a man shall sanctify unto the LORD some part of a field of his possession, then thy estimation shall be according to the seed thereof: an homer of barley seed shall be valued at fifty shekels of silver. If he sanctify his field from the year of jubile, according to thy estimation it shall stand."
          reference="Leviticus 27:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A field&apos;s value was not set by how pretty it looked. It was set by how much
            barley seed it took to sow it, a measure every farmer in the room could picture
            instantly. The timing mattered just as much as the size.
          </p>
        </div>
        <VerseQuote
          text="But if he sanctify his field after the jubile, then the priest shall reckon unto him the money according to the years that remain, even unto the year of the jubile, and it shall be abated from thy estimation."
          reference="Leviticus 27:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The closer a vow landed to the next Jubilee, the less the field cost,
            because fewer growing years were actually being given away.</strong> This is the exact
            same fifty year clock{" "}
            <ArticleLink href="/blog/leviticus-25-explained">Leviticus 25</ArticleLink> already
            put on every field in Israel. Nobody could permanently sell land that belonged to God
            and to a family&apos;s inheritance, not even by vowing it.
          </p>
          <p>
            If the man never redeemed the field, something unusual happened at Jubilee that did
            not apply to ordinary sold land.
          </p>
        </div>
        <VerseQuote
          text="And if he will not redeem the field, or if he have sold the field to another man, it shall not be redeemed any more. But the field, when it goeth out in the jubile, shall be holy unto the LORD, as a field devoted; the possession thereof shall be the priest’s."
          reference="Leviticus 27:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary sold land went back to its original family at Jubilee, exactly like{" "}
            <ArticleLink href="/blog/leviticus-25-explained">Leviticus 25</ArticleLink> promised.
            A vowed field broke that pattern on purpose: it never returned to the man who vowed
            it. It went to the priest instead, a permanent reminder that this field had been given
            away, not merely sold.
          </p>
          <p>A field someone had bought, rather than inherited, followed a different rule entirely.</p>
        </div>
        <VerseQuote
          text="And if a man sanctify unto the LORD a field which he hath bought, which is not of the fields of his possession; Then the priest shall reckon unto him the worth of thy estimation, even unto the year of the jubile: and he shall give thine estimation in that day, as a holy thing unto the LORD. In the year of the jubile the field shall return unto him of whom it was bought, even to him to whom the possession of the land did belong."
          reference="Leviticus 27:22 to 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A bought field was never truly the buyer&apos;s to give away forever. He could only
            vow the years he actually had left before Jubilee returned it to its original family
            anyway. The law would not let a man dedicate to God more ownership than he actually held.
          </p>
          <p>One closing verse fixes the measuring stick for every estimation in the whole chapter.</p>
        </div>
        <VerseQuote
          text="And all thy estimations shall be according to the shekel of the sanctuary: twenty gerahs shall be the shekel."
          reference="Leviticus 27:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same standard weight{" "}
            <ArticleLink href="/blog/exodus-30-explained">Exodus 30</ArticleLink> used for the
            atonement money every Israelite paid at the census. One fixed shekel, the same twenty
            gerahs everywhere, meant no priest and no town could quietly inflate a price.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Could Never Be Redeemed (verses 26 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the one category money never touched, because it was never available to vow in the first place.</p>
        </div>
        <VerseQuote
          text="Only the firstling of the beasts, which should be the LORD’s firstling, no man shall sanctify it; whether it be ox, or sheep: it is the LORD’s."
          reference="Leviticus 27:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A firstborn animal could not be vowed to the LORD, because it already belonged to Him.{" "}
            <ArticleLink href="/blog/exodus-13-explained">Exodus 13</ArticleLink> had already
            claimed every firstborn, animal and human, back in Egypt. A man cannot give God a gift
            God already owned before he ever opened his mouth.
          </p>
          <p>Then the chapter names a category more severe than any ordinary vow.</p>
        </div>
        <VerseQuote
          text="Notwithstanding no devoted thing, that a man shall devote unto the LORD of all that he hath, both of man and beast, and of the field of his possession, shall be sold or redeemed: every devoted thing is most holy unto the LORD."
          reference="Leviticus 27:28"
        />
        <VerseQuote
          text="None devoted, which shall be devoted of men, shall be redeemed; but shall surely be put to death."
          reference="Leviticus 27:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A &quot;devoted thing&quot; is a different legal category from the ordinary vows
            filling the rest of this chapter. Every vow up to this point always had a redemption
            price attached. A devoted thing had none, by definition, because it had already been
            set apart entirely for destruction or for the LORD, not offered with a buyback option
            built in. The next section looks closer at what this verse is, and is not, describing.
          </p>
          <p>The last three verses turn from vows to something already owed before anyone vowed anything.</p>
        </div>
        <VerseQuote
          text="And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is the LORD’s: it is holy unto the LORD."
          reference="Leviticus 27:30"
        />
        <VerseQuote
          text="And concerning the tithe of the herd, or of the flock, even of whatsoever passeth under the rod, the tenth shall be holy unto the LORD."
          reference="Leviticus 27:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A vow was always extra. A tithe was never optional in the first place.</strong>{" "}
            Every rule about estimations and redemption in this chapter applied to gifts given on
            top of what God already required. The tithe sat underneath all of it, already His
            before a single vow was ever spoken.
          </p>
          <p>The book ends on the same note Leviticus 26 just closed on.</p>
        </div>
        <VerseQuote
          text="These are the commandments, which the LORD commanded Moses for the children of Israel in mount Sinai."
          reference="Leviticus 27:34"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 27 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the chapter put a shekel price on a human being at all?</strong> The
            price was never a statement about a soul&apos;s worth before God. It was a redemption
            fee for a vow of service, sized to the typical labor an Israelite of that age and sex
            could provide in an agricultural economy. Verse 8 proves the point: a poor man&apos;s
            vow was valued against what he could actually afford, which would make no sense if the
            number were measuring a person&apos;s spiritual value.
          </p>
          <p>
            <strong>Why were women valued at a lower price than men in verses 3 and 4?</strong>{" "}
            The standard explanation is economic, not spiritual. These numbers tracked average
            physical field labor capacity in that specific agrarian setting, the kind of work a
            redemption price for lost service would need to account for. Scripture elsewhere is
            direct that both men and women equally carry God&apos;s image, so this valuation scale
            describes ancient Israel&apos;s labor economy, not God&apos;s view of a person.
          </p>
          <p>
            <strong>Does Leviticus 27:29 mean human sacrifice was practiced or endorsed in
            Israel?</strong> No. This verse describes a &quot;devoted thing,&quot; the legal
            category elsewhere called being set apart under the ban, used specifically in the
            context of holy war against things and people already given over to destruction,
            such as Jericho in the book of Joshua. It is a different category from the ordinary
            vow of a living person&apos;s service covered in verses 1 through 8, which always came
            with a redemption price attached. Nothing in this chapter instructs Israel to sacrifice
            a person as an ordinary act of worship.
          </p>
          <p>
            <strong>Should a Christian today be careful about making vows the way this chapter
            is?</strong> The principle behind the price tags still applies even without the
            shekels. A later Old Testament book states this plainly.
          </p>
        </div>
        <VerseQuote
          text="When thou vowest a vow unto God, defer not to pay it; for he hath no pleasure in fools: pay that which thou hast vowed. Better is it that thou shouldest not vow, than that thou shouldest vow and not pay."
          reference="Ecclesiastes 5:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Leviticus 27 built a system of prices because a vow was never meant to be
            spoken casually.</strong> The lesson was never really about silver. It was about the
            weight of your own word.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 27:8</h3>
        <VerseQuote
          text="But if he be poorer than thy estimation, then he shall present himself before the priest, and the priest shall value him; according to his ability that vowed shall the priest value him."
          reference="Leviticus 27:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that keeps the whole chapter from crushing the poor, valuing a vow against
          what a man could actually pay rather than a fixed number he could never reach.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 27:25</h3>
        <VerseQuote
          text="And all thy estimations shall be according to the shekel of the sanctuary: twenty gerahs shall be the shekel."
          reference="Leviticus 27:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One fixed standard of weight for every price in this chapter, the same measure Exodus 30
          used for the census offering, so no one could quietly inflate a vow&apos;s cost.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 27:28</h3>
        <VerseQuote
          text="Notwithstanding no devoted thing, that a man shall devote unto the LORD of all that he hath, both of man and beast, and of the field of his possession, shall be sold or redeemed: every devoted thing is most holy unto the LORD."
          reference="Leviticus 27:28"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that separates an ordinary vow, which always had a redemption price, from a
          devoted thing, which never did because it had already been set apart entirely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 27:30</h3>
        <VerseQuote
          text="And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is the LORD’s: it is holy unto the LORD."
          reference="Leviticus 27:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A reminder that the tithe was never a gift Israel chose to give. It was already God&apos;s,
          sitting underneath every voluntary vow this chapter describes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 27:34</h3>
        <VerseQuote
          text="These are the commandments, which the LORD commanded Moses for the children of Israel in mount Sinai."
          reference="Leviticus 27:34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The closing line of the entire book of Leviticus, tying every law from clean food to
          Jubilee to a vow&apos;s price back to the one mountain where Moses received all of it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 27 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 27 sets the redemption price for a vow made to the LORD, covering a person, an
          unclean animal, a house, and a field, and it closes by naming the handful of things, like
          firstborn animals and devoted things, that could never be redeemed at any price.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to make a vow to the LORD in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A vow was a voluntary promise to give God something beyond what the Law already required,
          whether a person&apos;s service, an animal, a house, or a field. Leviticus 27 exists
          because a spoken vow still needed a fair, enforceable way to be paid or redeemed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were people valued at different prices in Leviticus 27?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The prices in verses 3 through 7 tracked typical labor capacity by age and sex in
          Israel&apos;s agricultural economy, not a person&apos;s worth before God. It was a
          redemption fee for lost service, not a judgment on spiritual value.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened if someone could not afford to pay their vow?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 8 let a poor man present himself to the priest, who valued the vow according to
          what he could actually afford rather than holding him to the full fixed price.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;devoted&quot; mean in Leviticus 27:28 and 29?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A devoted thing was set apart for the LORD so completely that it could never be sold or
          redeemed, unlike every ordinary vow earlier in the chapter, which always had a price
          attached for buying it back.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Leviticus 27:29 mean human sacrifice was practiced in Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. That verse describes the separate legal category of being set apart under the ban in
          holy war contexts, not an ordinary act of worship. The ordinary vow of a person&apos;s
          service, covered in verses 1 through 8, always came with a redemption price.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was a field priced by how much barley seed it took to sow it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 16 ties a field&apos;s value to its seed capacity, a measure every Israelite farmer
          could picture instantly, and it kept the price scaled fairly between a small plot and a
          large one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between a vow and a tithe in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A vow, covered in verses 1 through 25, was a voluntary gift on top of what the Law
          required. The tithe, covered in verses 30 through 33, was never optional. It already
          belonged to the LORD before anyone vowed anything at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is a shekel of silver worth twenty gerahs?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 25 fixes this exchange as the standard weight behind every estimation in the
          chapter, the same measure Exodus 30 used for Israel&apos;s census offering, so no priest
          could quietly inflate a price.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the book of Leviticus end with laws about vows?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After twenty six chapters of commands Israel was required to keep, Leviticus closes on
          the one category of giving that was entirely voluntary, making sure that even a freely
          spoken promise to God stayed fair and enforceable rather than an empty word.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus closes, fittingly, on the cost of a promise.</p>
          <p>
            📌 <strong>A vow was never free, and that was the point.</strong> Attaching a real
            price to a spoken promise kept Israel from treating its own words to God as something
            that cost nothing to say.
          </p>
          <p>
            📌 <strong>Mercy still had a place inside the price list.</strong> Verse 8&apos;s
            allowance for a poor man&apos;s ability to pay kept this entire system from becoming a
            burden only the wealthy could afford to keep.
          </p>
          <p>
            📌 <strong>Some things were never yours to vow in the first place.</strong> The
            firstling already belonged to the LORD, and the tithe already belonged to the LORD,
            long before anyone opened their mouth to promise anything extra.
          </p>
          <p>
            You do not bring a lamb or a shekel to redeem a vow today. But you still make
            promises, to God and to the people around you, and this chapter still asks the same
            question it asked Israel: did you mean it enough to actually pay it?
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of one promise you have made to God and not yet kept. Do not vow a new one
            before you pay that one.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
