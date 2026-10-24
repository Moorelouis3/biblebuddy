import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-21-explained", {
  title: "Leviticus 21 Explained: The Holiness Rules for God's Priests",
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

export default function LeviticusTwentyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-21-explained"
      title={<>📖 Leviticus 21 Explained: The Holiness Rules for God&apos;s Priests</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Twenty chapters of rules for the whole nation. Now the lens narrows to one family.</p>
            <p>
              <strong>Leviticus 21 explained</strong> is the chapter where God turns from Israel in
              general to the sons of Aaron specifically, the men who actually walked up to the
              altar on everyone else&apos;s behalf. A higher calling gets a higher bar. Ordinary
              priests face limits on who they can mourn and who they can marry. The high priest
              faces a bar higher still. And a son of Aaron born with a physical blemish faces a
              limit nobody chose for himself.
            </p>
            <p>Maybe you have read this chapter and winced at that last part.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why can an ordinary priest mourn for his parents, but the high priest cannot?</li>
            <li>❓ Why does a priest&apos;s daughter face a harsher penalty than other women in Israel?</li>
            <li>❓ Is banning a priest with a disability from the altar fair, or even kind?</li>
            <li>❓ And why does the chapter insist a blemished priest still eats the holy bread?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every limit in this chapter protects one thing: the picture of
              wholeness the priest carried to the altar on the nation&apos;s behalf.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the mourning limits on
              ordinary priests, the marriage limits that go with them, the one verse about a
              priest&apos;s daughter that still unsettles readers, the even stricter rules reserved
              for the high priest alone, and the blemish list that closes the chapter, including
              the provision inside it that is easy to miss.
            </p>
            <p>Read slowly. This is one of the harder chapters in Leviticus to read fairly.</p>
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
            <ArticleLink href="/blog/leviticus-20-explained">Leviticus 20</ArticleLink> closed
            with the reason behind every penalty it had just listed:
            &quot;ye should be holy unto me, for I the LORD am holy, and have severed you from
            other people, that ye should be mine.&quot; That holiness was commanded to the whole
            congregation, every Israelite, every household.
          </p>
          <p>
            Leviticus 21 takes that same word, holy, and narrows it down to one family inside the
            nation, the sons of Aaron. If all of Israel had to be set apart, the men who
            represented Israel at the altar had to be set apart again, inside that, by a second,
            tighter boundary. This is not a new idea introduced out of nowhere. It picks up
            exactly where <ArticleLink href="/blog/leviticus-10-explained">Leviticus 10</ArticleLink>{" "}
            left it, the chapter where two of Aaron&apos;s own sons died for treating the altar
            carelessly, and God told Aaron&apos;s surviving sons to put a difference between holy
            and unholy, clean and unclean.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 21 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Mourning Limits for Ordinary Priests (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming exactly who God is speaking to.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Speak unto the priests the sons of Aaron, and say unto them, There shall none be defiled for the dead among his people:"
          reference="Leviticus 21:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In Israel, touching a dead body meant becoming ritually unclean for a
            period of time. An ordinary Israelite could become unclean this way for almost
            anyone close to them. A priest could not, except for a short list named by name.</strong>
          </p>
        </div>
        <VerseQuote
          text="But for his kin, that is near unto him, that is, for his mother, and for his father, and for his son, and for his daughter, and for his brother, And for his sister a virgin, that is nigh unto him, which hath had no husband; for her may he be defiled."
          reference="Leviticus 21:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mother, father, son, daughter, brother, and an unmarried sister. That is the whole
            list. A priest could stop his duties and mourn properly for any of these six. Anyone
            outside that circle, including an aunt, a married sister, or a distant cousin, he was
            expected to keep his ordinary service going instead.
          </p>
          <p>Then comes a line that sounds almost cold, until you notice exactly what it protects.</p>
        </div>
        <VerseQuote
          text="But he shall not defile himself, being a chief man among his people, to profane himself."
          reference="Leviticus 21:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Chief man among his people&quot; names the reason for the whole restriction.
            A priest was not mourning as a private individual only. He belonged to his people as
            their representative before God, and that role did not pause just because grief did
            not.
          </p>
          <p>The next verse repeats, word for word almost, a ban already given once to the whole nation.</p>
        </div>
        <VerseQuote
          text="They shall not make baldness upon their head, neither shall they shave off the corner of their beard, nor make any cuttings in their flesh."
          reference="Leviticus 21:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <ArticleLink href="/blog/leviticus-19-explained">Leviticus 19</ArticleLink> already
            forbade exactly this, cutting the body or shaving certain patterns as part of grieving
            for the dead, for every Israelite. Leviticus 21 does not introduce a new rule here. It
            repeats the same one, aimed specifically at the men who had to model it in front of
            everyone else.
          </p>
        </div>
        <VerseQuote
          text="They shall be holy unto their God, and not profane the name of their God: for the offerings of the LORD made by fire, and the bread of their God, they do offer: therefore they shall be holy."
          reference="Leviticus 21:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The reason given is not abstract. Their hands handled the fire offerings and the bread
            set before God. What touched the holy things had to stay holy itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Marriage Limits for Ordinary Priests (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From mourning, the chapter moves straight to marriage, using the same logic.</p>
        </div>
        <VerseQuote
          text="They shall not take a wife that is a whore, or profane; neither shall they take a woman put away from her husband: for he is holy unto his God."
          reference="Leviticus 21:7"
        />
        <VerseQuote
          text="Thou shalt sanctify him therefore; for he offereth the bread of thy God: he shall be holy unto thee: for I the LORD, which sanctify you, am holy."
          reference="Leviticus 21:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two women are named as off limits for an ordinary priest: a prostitute,
            and a divorced woman.</strong> Verse 8 then does something the chapter does
            repeatedly, it hands the responsibility back to the people around the priest, not
            only to the priest himself. &quot;Thou shalt sanctify him&quot; puts Israel on the hook
            for treating its priests as set apart, not just the priests on the hook for acting
            that way.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Priest&apos;s Daughter Who Plays the Harlot (verse 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse, on its own, interrupts the flow with the heaviest penalty in the chapter.</p>
        </div>
        <VerseQuote
          text="And the daughter of any priest, if she profane herself by playing the whore, she profaneth her father: she shall be burnt with fire."
          reference="Leviticus 21:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is the same penalty, burning, that{" "}
            <ArticleLink href="/blog/leviticus-20-explained">Leviticus 20:14</ArticleLink> already
            attached to a man taking a wife and her mother at once, the single harshest sentence
            in that entire chapter.
          </p>
        </div>
        <VerseQuote
          text="And if a man take a wife and her mother, it is wickedness: they shall be burnt with fire, both he and they; that there be no wickedness among you."
          reference="Leviticus 20:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The verse does not say a priest&apos;s daughter sinned more than any other Israelite
            woman who did the same thing. It says plainly what made this case different:
            &quot;she profaneth her father.&quot; Her father&apos;s standing was handling the
            holy bread of God. Her choice did not stay private. It reached backward onto the
            thing he represented.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The High Priest&apos;s Even Higher Standard (verses 10 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now narrows one more time, from the sons of Aaron generally to the one man
            who carried the title of high priest.
          </p>
        </div>
        <VerseQuote
          text="And he that is the high priest among his brethren, upon whose head the anointing oil was poured, and that is consecrated to put on the garments, shall not uncover his head, nor rend his clothes;"
          reference="Leviticus 21:10"
        />
        <VerseQuote
          text="Neither shall he go in to any dead body, nor defile himself for his father, or for his mother;"
          reference="Leviticus 21:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>An ordinary priest could stop and mourn for his own mother or father. The
            high priest could not, even for them.</strong> This is not a harsher version of the
            same rule. It is a different rule entirely, and it has an exact precedent already on
            record.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto Aaron, and unto Eleazar and unto Ithamar, his sons, Uncover not your heads, neither rend your clothes; lest ye die, and lest wrath come upon all the people: but let your brethren, the whole house of Israel, bewail the burning which the LORD hath kindled."
          reference="Leviticus 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 That command was given to Aaron on the day his own sons Nadab and Abihu died for
            offering strange fire before the LORD. Aaron was told not to uncover his head or rend
            his clothes, the exact wording Leviticus 21:10 now turns into a permanent statute for
            every high priest after him. What was an emergency instruction in Leviticus 10
            becomes settled law here.
          </p>
          <p>The reason given is the anointing itself.</p>
        </div>
        <VerseQuote
          text="Neither shall he go out of the sanctuary, nor profane the sanctuary of his God; for the crown of the anointing oil of his God is upon him: I am the LORD."
          reference="Leviticus 21:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;The crown of the anointing oil&quot; is not a decoration. It marks the high
            priest as never fully off duty, not even at his own parent&apos;s deathbed. The
            marriage rule that follows tightens the same way.
          </p>
        </div>
        <VerseQuote
          text="And he shall take a wife in her virginity. A widow, or a divorced woman, or profane, or an harlot, these shall he not take: but he shall take a virgin of his own people to wife."
          reference="Leviticus 21:13 and 14"
        />
        <VerseQuote
          text="Neither shall he profane his seed among his people: for I the LORD do sanctify him."
          reference="Leviticus 21:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ An ordinary priest only had to avoid a prostitute or a divorced woman. The high
            priest could not marry a widow either, a woman guilty of nothing, simply because the
            standard for him narrowed further than it did for his own brothers.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Blemishes and the Altar (verses 16 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes with the part that stops most readers cold, a list of physical
            conditions that barred a son of Aaron from approaching the altar.
          </p>
        </div>
        <VerseQuote
          text="Speak unto Aaron, saying, Whosoever he be of thy seed in their generations that hath any blemish, let him not approach to offer the bread of his God."
          reference="Leviticus 21:17"
        />
        <VerseQuote
          text="For whatsoever man he be that hath a blemish, he shall not approach: a blind man, or a lame, or he that hath a flat nose, or any thing superfluous, Or a man that is brokenfooted, or brokenhanded, Or crookbackt, or a dwarf, or that hath a blemish in his eye, or be scurvy, or scabbed, or hath his stones broken;"
          reference="Leviticus 21:18 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Twelve conditions named in a row, none of them chosen by the man born with them.
            Nothing in this list is framed as sin. The text never once says a blemished priest did
            anything wrong. It says he cannot approach the altar, which is a different claim
            entirely from saying he is guilty of something.
          </p>
          <p>The reason sits in the very next verse, tied to the offering itself rather than the man.</p>
        </div>
        <VerseQuote
          text="No man that hath a blemish of the seed of Aaron the priest shall come nigh to offer the offerings of the LORD made by fire: he hath a blemish; he shall not come nigh to offer the bread of his God."
          reference="Leviticus 21:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every acceptable animal offering in this book had to be without blemish.
            The man carrying that offering to the altar was held, in this one narrow function, to
            the same visible standard as what he carried.</strong> The rule is about the picture
            the altar presented, unbroken wholeness offered to a holy God, not a verdict on the
            man&apos;s worth or standing before God.
          </p>
          <p>And the very next verse makes sure nobody mistakes this for exclusion from everything.</p>
        </div>
        <VerseQuote
          text="He shall eat the bread of his God, both of the most holy, and of the holy. Only he shall not go in unto the vail, nor come nigh unto the altar, because he hath a blemish; that he profane not my sanctuaries: for I the LORD do sanctify them."
          reference="Leviticus 21:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>This is the verse easiest to skip past, and the one that changes how the
            whole list should be read.</strong> A blemished priest still ate the same holy bread
            as every other son of Aaron, the same bread denied entirely to anyone outside the
            priestly family. He lost one specific function, standing at the altar itself. He did
            not lose his place at his own family&apos;s table, his portion of the holy food, or
            his identity as a son of Aaron.
          </p>
          <p>The chapter ends with a single sentence confirming the instruction was carried out exactly as given.</p>
        </div>
        <VerseQuote
          text="And Moses told it unto Aaron, and to his sons, and unto all the children of Israel."
          reference="Leviticus 21:24"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 21 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Is it fair, or even kind, for God to bar a priest born with a disability from
            the altar through no fault of his own?</strong> The text never calls a blemish sin,
            and it never cuts the man off from the priestly household or its food. What it
            restricts is one specific function, standing at the altar to offer the fire
            offerings, tied to the same unblemished standard required of every acceptable animal
            offering in this book. Readers today, including many Christian readers, still find
            this rule hard to sit with, and the fairest response is not to soften what the text
            says but to notice precisely what it does and does not take away, named plainly in
            verses 22 and 23.
          </p>
          <p>
            <strong>Why can an ordinary priest mourn his own mother and father, but the high
            priest cannot?</strong> The text does not explain the difference in feeling, only in
            office. The high priest alone carried the anointing oil and the crown named in verse
            12, and Leviticus 10:6 already shows Aaron himself held to this exact standard the day
            his own sons died. The higher office carried a boundary with no exception built in,
            not even for grief that every reader would call natural.
          </p>
          <p>
            <strong>Why does a priest&apos;s daughter in verse 9 face a harsher penalty than other
            women in Israel for the same act?</strong> The verse states its own reason plainly:
            &quot;she profaneth her father.&quot; The harsher consequence is tied to what her
            father represented at the altar, not to a claim that her sin was greater in itself.
          </p>
          <p>
            <strong>Does any of this still apply to Christians or church leaders today?</strong>{" "}
            The New Testament does carry forward a version of &quot;held to a higher standard,&quot;
            but it reshapes what the standard measures.
          </p>
        </div>
        <VerseQuote
          text="A bishop then must be blameless, the husband of one wife, vigilant, sober, of good behaviour, given to hospitality, apt to teach;"
          reference="1 Timothy 3:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul tells Timothy a church leader must be blameless, echoing the weight Leviticus 21
            put on priests, but the entire list that follows is about character and conduct, never
            physical appearance. The New Testament&apos;s version of this chapter&apos;s standard
            moved from the body to the heart.
          </p>
          <p>
            <strong>Does Jesus fulfill the blemish requirement differently?</strong> Hebrews says
            so directly.
          </p>
        </div>
        <VerseQuote
          text="For such an high priest became us, who is holy, harmless, undefiled, separate from sinners, and made higher than the heavens;"
          reference="Hebrews 7:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every requirement in Leviticus 21 pointed toward a priest whole enough to
            stand before a holy God. Hebrews says Jesus is that priest, without the physical list,
            morally undefiled rather than physically unblemished.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 21:6</h3>
        <VerseQuote
          text="They shall be holy unto their God, and not profane the name of their God: for the offerings of the LORD made by fire, and the bread of their God, they do offer: therefore they shall be holy."
          reference="Leviticus 21:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind every rule that follows in the chapter: what a priest&apos;s hands
          touched decided what his life had to look like.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 21:9</h3>
        <VerseQuote
          text="And the daughter of any priest, if she profane herself by playing the whore, she profaneth her father: she shall be burnt with fire."
          reference="Leviticus 21:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that still unsettles readers, and states its own reasoning plainly: her choice
          reached backward onto her father&apos;s standing at the altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 21:12</h3>
        <VerseQuote
          text="Neither shall he go out of the sanctuary, nor profane the sanctuary of his God; for the crown of the anointing oil of his God is upon him: I am the LORD."
          reference="Leviticus 21:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse behind the high priest&apos;s hardest restriction, naming the anointing oil
          itself as the reason he could not step away, even to mourn his own parents.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 21:21</h3>
        <VerseQuote
          text="No man that hath a blemish of the seed of Aaron the priest shall come nigh to offer the offerings of the LORD made by fire: he hath a blemish; he shall not come nigh to offer the bread of his God."
          reference="Leviticus 21:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse behind the chapter&apos;s hardest list, tying the standard to the offering
          itself rather than declaring anything about the man&apos;s own worth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 21:22 and 23</h3>
        <VerseQuote
          text="He shall eat the bread of his God, both of the most holy, and of the holy. Only he shall not go in unto the vail, nor come nigh unto the altar, because he hath a blemish; that he profane not my sanctuaries: for I the LORD do sanctify them."
          reference="Leviticus 21:22 and 23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that reframes the whole blemish list: one function was restricted, not the
          man&apos;s place at his own family&apos;s table.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 21 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 21 sets extra holiness standards for the priests specifically, covering who
          they could mourn, who they could marry, a penalty for a priest&apos;s daughter who
          turned to prostitution, an even stricter set of rules for the high priest alone, and a
          list of physical conditions that barred a priest from serving at the altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why could priests only mourn for certain family members?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 1 through 3 name mother, father, son, daughter, brother, and an unmarried sister
          as the only exceptions. Priests were considered a &quot;chief man among his people,&quot;
          verse 4&apos;s own phrase, and kept on duty for anyone outside that short list.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why couldn&apos;t the high priest mourn even for his own parents?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 10 through 12 tie this specifically to the anointing oil poured on his head.
          Leviticus 10:6 already shows Aaron held to this exact standard on the day his own sons
          died, so Leviticus 21 is turning an emergency instruction into a permanent statute.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did a priest&apos;s daughter face death for a sin other women were not executed for?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 9 states its own reason: &quot;she profaneth her father.&quot; Her father&apos;s
          role handling the holy offerings meant her choice was treated as reaching beyond her
          own life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Leviticus 21 call a physical disability a sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verses 17 through 21 never use the word sin for any of the twelve conditions listed.
          They restrict one function, approaching the altar, tied to the same unblemished standard
          required of the offerings themselves, not a moral judgment on the man.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was a priest with a blemish cut off from the priesthood entirely?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verses 22 and 23 say he still ate the holy bread and the most holy bread, the same
          food reserved for every other son of Aaron. He lost access to the altar itself, not his
          place in the priestly family or its provision.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Could an ordinary priest marry a widow?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Verse 7 only bars an ordinary priest from marrying a prostitute or a divorced
          woman. The ban on marrying a widow applied to the high priest alone, named separately in
          verse 14.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does the New Testament apply this chapter&apos;s standard to church leaders?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In a reshaped form. 1 Timothy 3:2 and Titus 1:7 both call a church leader
          &quot;blameless,&quot; echoing the weight this chapter placed on priests, but every
          qualification listed is about character and conduct, not physical appearance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How does Jesus relate to the blemish requirement in this chapter?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 7:26 calls Jesus a high priest who is &quot;holy, harmless, undefiled,&quot; the
          moral fulfillment of a standard this chapter required physically. Where Leviticus 21
          listed what a priest&apos;s body had to be free of, Hebrews describes what His character
          already was.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does this chapter repeat a rule already given in Leviticus 19?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 5&apos;s ban on cutting the body or shaving certain patterns for the dead already
          applied to every Israelite in Leviticus 19:27 and 28. Leviticus 21 restates it aimed at
          priests specifically, the men expected to model the standard in front of everyone else.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 21 is one of the harder chapters in this book to read fairly, and it rewards slowing down.</p>
          <p>
            📌 <strong>A higher calling carried a higher bar, not a harsher verdict.</strong> The
            high priest lost the right to mourn his own parents. He never lost his place at the
            altar he had been set apart to serve.
          </p>
          <p>
            📌 <strong>The blemish list restricted a function, not a man&apos;s worth.</strong>{" "}
            Verses 22 and 23 say it plainly: still fed, still family, still a son of Aaron, just
            not standing at the altar that day.
          </p>
          <p>
            📌 <strong>Every standard in this chapter pointed forward to a better high priest.</strong>{" "}
            Hebrews says Jesus fulfilled it in character rather than appearance, holy and
            undefiled, able to stand where the law once required something no one born into it
            could guarantee for themselves.
          </p>
          <p>
            You are not a son of Aaron, and none of this chapter&apos;s specific penalties apply to
            you by name. But the question underneath it has not gone away: what you handle shapes
            what you are called to become.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one holy thing God has actually put into your hands this week, and ask honestly
            whether your life matches what you are carrying.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
