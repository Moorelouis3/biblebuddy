import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-12-explained", {
  title: "Leviticus 12 Explained: Childbirth and Mary's Offering",
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

export default function LeviticusTwelveExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-12-explained"
      title={<>📖 Leviticus 12 Explained: Childbirth and Mary&apos;s Offering</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Eight verses. One of the shortest chapters in Leviticus so far.</p>
            <p>
              <strong>Leviticus 12 explained</strong> is the law for a woman after she gives birth:
              how many days she stays ceremonially unclean, a single sentence in the middle about
              circumcising her son on the eighth day, and the offering that finally ends the whole
              period. Nothing here happens at an altar you have read about yet in a new way. It all
              happens at home, at the cradle.
            </p>
            <p>Maybe you have read this chapter and wondered why having a baby would make anyone unclean at all.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does giving birth count as something to be purified from?</li>
            <li>❓ Why does a daughter cost twice as many days as a son?</li>
            <li>❓ Why is circumcision tucked into a chapter about a mother, not its own chapter?</li>
            <li>❓ And why does this short chapter matter again, centuries later, in Luke&apos;s Gospel?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 12 never calls a new mother a sinner. It calls her ceremonially
              unclean, and those are not the same word, even though it is easy to read them as
              one.</strong>
            </p>
            <p>
              This walkthrough goes through the chapter in order: the son&apos;s forty days, the
              daughter&apos;s eighty, the covenant sign given on the eighth day in the middle of it
              all, the sacrifice that closes the period, and the exception made for a poor family, an
              exception Mary herself needed four hundred years later.
            </p>
            <p>Read slowly. The shortest chapter in Leviticus so far carries one of its clearest previews of the manger.</p>
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
            <ArticleLink href="/blog/leviticus-11-explained">Leviticus 11</ArticleLink> closed by
            handing every Israelite the skill of telling clean from unclean at the dinner table, all
            of it rooted in the fact that the LORD had just brought them out of Egypt. That chapter
            spoke to Moses and Aaron together, and to the whole nation through them.
          </p>
          <p>
            Leviticus 12 opens differently. The LORD speaks to Moses alone this time, and the subject
            moves from what a person eats to what happens inside a family the day a child is born.
            The same pattern keeps unfolding, ordinary life, one piece at a time, now covered by
            instruction straight after the opening chapters built the tabernacle and ordained its
            priests.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 12 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Son Is Born: Seven Days, Then the Eighth (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the LORD speaking to Moses only, and the instruction is immediate.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, saying, If a woman have conceived seed, and born a man child: then she shall be unclean seven days; according to the days of the separation for her infirmity shall she be unclean."
          reference="Leviticus 12:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Look closely at the wording. The same word, <strong>separation</strong>, shows up twice
            in one verse, and it is the exact word already used for a woman&apos;s monthly cycle. This
            is not a new category of uncleanness invented for childbirth. It places the blood of birth
            in the same ceremonial class as the blood already covered by that earlier law, not in the
            class of moral guilt.
          </p>
          <p>
            📌 <strong>Nothing in this verse says having a baby is a sin.</strong> It says the blood
            involved in having one made a woman ceremonially unclean for seven days, the same length
            already set for her monthly separation.
          </p>
          <p>Right in the middle of that first week comes a command that has nothing to do with the mother directly.</p>
        </div>
        <VerseQuote
          text="And in the eighth day the flesh of his foreskin shall be circumcised."
          reference="Leviticus 12:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the only verse in the entire book of Leviticus that actually commands
            circumcision. The command itself is older, first given to Abraham in{" "}
            <ArticleLink href="/blog/genesis-17-explained">Genesis 17</ArticleLink>, where every male
            child was to be circumcised on his eighth day as the sign of the covenant. Leviticus 12
            does not introduce the rule. It simply applies an already standing command inside the
            timeline of a new mother&apos;s own purification.
          </p>
          <p>
            📌 <strong>Two clocks run at once in this chapter, and they do not conflict.</strong> The
            son&apos;s covenant sign lands on day eight, right as his mother&apos;s first stage of
            separation ends. Her own purification keeps going well past his.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Thirty Three More Days: The Mother&apos;s Longer Wait (verse 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After the first seven days end, the chapter adds a second, longer stretch of time.</p>
        </div>
        <VerseQuote
          text="And she shall then continue in the blood of her purifying three and thirty days; she shall touch no hallowed thing, nor come into the sanctuary, until the days of her purifying be fulfilled."
          reference="Leviticus 12:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven days of separation plus thirty three more days of purifying comes to forty days
            total before a mother of a son could enter the sanctuary or touch anything set apart as
            holy. During those thirty three days she was not confined to a tent or kept from her
            household. The restriction named is narrow and specific: no hallowed thing, no sanctuary,
            nothing wider than that.
          </p>
          <p>
            💡 Forty days is a number that shows up again and again across Scripture, from the flood,
            to Moses on the mountain, to Jesus in the wilderness. This chapter does not explain why
            forty, it simply lands on that exact total once the two periods are added together.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Daughter Is Born: Fourteen Days, Then Sixty Six (verse 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The same law repeats for a daughter, and every number in it doubles.</p>
        </div>
        <VerseQuote
          text="But if she bear a maid child, then she shall be unclean two weeks, as in her separation: and she shall continue in the blood of her purifying threescore and six days."
          reference="Leviticus 12:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two weeks is fourteen days, and threescore and six is sixty six, for a total of eighty
            days, exactly double the forty set for a son. The doubling is precise and consistent
            through both stages of the law, the separation and the purifying alike.
          </p>
          <p>
            ⚠️ <strong>The text never states why a daughter&apos;s purification takes twice as
            long.</strong> No reason is given anywhere in this chapter or the rest of Leviticus.
            Whatever the explanation, it is not one the text itself offers, so this is one to hold
            honestly as an open question rather than fill in with a guess.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Offering That Ends the Separation (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once her days are fulfilled, whether forty or eighty, one offering closes the period.</p>
        </div>
        <VerseQuote
          text="And when the days of her purifying are fulfilled, for a son, or for a daughter, she shall bring a lamb of the first year for a burnt offering, and a young pigeon, or a turtledove, for a sin offering, unto the door of the tabernacle of the congregation, unto the priest: Who shall offer it before the LORD, and make an atonement for her; and she shall be cleansed from the issue of her blood. This is the law for her that hath born a male or a female."
          reference="Leviticus 12:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the last line of verse 7.</strong> &quot;This is the law for her that
            hath born a male or a female.&quot; The number of days differs by the child&apos;s sex,
            but the offering required at the end does not. One lamb, one bird, the same two sacrifices
            whether the chapter&apos;s first seven verses were about a son or a daughter.
          </p>
          <p>
            The lamb is a burnt offering, and the bird is a sin offering, brought together to the
            door of the tabernacle itself, not left to a private ritual at home. The priest, not the
            mother, makes the atonement that finally lets her approach holy things again.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. When She Cannot Afford a Lamb (verse 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter does not close on verse 7. It adds one more sentence for the family that cannot afford what verse 6 names.</p>
        </div>
        <VerseQuote
          text="And if she be not able to bring a lamb, then she shall bring two turtles, or two young pigeons; the one for the burnt offering, and the other for a sin offering: and the priest shall make an atonement for her, and she shall be clean."
          reference="Leviticus 12:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A poor family brought two birds instead of a lamb and a bird, one bird standing in for
            the burnt offering, the other still carrying the sin offering. The atonement is described
            in the exact same words either way: the priest makes atonement, and she is clean.
          </p>
          <p>
            📌 <strong>This single verse is the one Luke quotes, almost word for word, about Mary
            herself.</strong>
          </p>
        </div>
        <VerseQuote
          text="And when the days of her purification according to the law of Moses were accomplished, they brought him to Jerusalem, to present him to the Lord; ... And to offer a sacrifice according to that which is said in the law of the Lord, A pair of turtledoves, or two young pigeons."
          reference="Luke 2:22 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/who-was-mary-mother-of-jesus">Mary</ArticleLink> and Joseph did
            not bring a lamb to the temple for Jesus. They brought the exception written into verse
            8 for a family that could not afford one. The Gospel of Luke is not improvising a detail;
            it is quoting the poor family&apos;s provision this chapter wrote centuries earlier,
            applied to the family of the Messiah Himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 12 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does this chapter mean childbirth itself is sinful?</strong> The text does not say
            that. It places the blood of childbirth in the same ceremonial category already used for
            the monthly separation law, a category about ritual uncleanness, not moral guilt. Some
            Christians have connected this chapter to the wider doctrine that every person is born
            with a sinful nature, pointing to lines like Psalm 51:5, where David says he was sinful
            from conception. That is a real conversation in Christian theology, but it is a separate
            claim from what Leviticus 12 itself states. This chapter never says the mother sinned by
            giving birth, and it never calls the child sinful either. It simply treats the blood
            involved the way it already treats blood elsewhere in the law.
          </p>
          <p>
            <strong>Why does a daughter take twice as long to purify as a son?</strong> Leviticus 12
            gives no reason anywhere in its eight verses, and the rest of Leviticus does not return to
            explain it either. Bible teachers have offered different guesses over the centuries, but
            none of them comes from the text itself, so none of them can be stated here as the answer.
            The honest reading is that the doubling is certain and precise, fourteen days instead of
            seven, sixty six instead of thirty three, while the reason behind it is simply not
            something this chapter discloses.
          </p>
          <p>
            <strong>Why is circumcision placed inside a chapter about a mother&apos;s purification
            instead of its own chapter?</strong> Leviticus 12:3 is the only verse in the whole book of
            Leviticus that commands circumcision at all, and it does not introduce the practice. The
            command already existed, given to Abraham as the sign of God&apos;s covenant. Placing it
            here, on the son&apos;s eighth day, lines his covenant sign up with the exact point his
            mother&apos;s own first stage of separation ends, two timelines belonging to the same
            family event, recorded together rather than split into separate chapters.
          </p>
          <p>
            <strong>Do Christians today still have to keep this law?</strong> What the text itself says
            is that this was given to Israel, tied to the tabernacle and its priesthood.{" "}
            <ArticleLink href="/blog/what-is-sin">How later Scripture reads it</ArticleLink> is where
            the Christian answer comes from. Colossians 2:11 describes believers as circumcised
            &quot;without hands,&quot; in Christ, rather than through the physical sign this chapter
            commands. Most Christian traditions read Leviticus 12&apos;s purification laws as part of
            a ceremonial system fulfilled in Christ, not as a rule still binding on new mothers today,
            though the exact line between what carries forward and what does not remains a question
            the church has worked through since its earliest years, not one this chapter settles by
            itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 12:2 and 3</h3>
        <VerseQuote
          text="If a woman have conceived seed, and born a man child: then she shall be unclean seven days; according to the days of the separation for her infirmity shall she be unclean. And in the eighth day the flesh of his foreskin shall be circumcised."
          reference="Leviticus 12:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s opening rule, and the one verse in all of Leviticus that commands
          circumcision, placed at exactly the point a mother&apos;s first week of separation ends.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 12:4</h3>
        <VerseQuote
          text="And she shall then continue in the blood of her purifying three and thirty days; she shall touch no hallowed thing, nor come into the sanctuary, until the days of her purifying be fulfilled."
          reference="Leviticus 12:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Seven days plus thirty three days adds up to forty, the number that keeps appearing across
          Scripture at moments of waiting before something new begins.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 12:6 and 7</h3>
        <VerseQuote
          text="She shall bring a lamb of the first year for a burnt offering, and a young pigeon, or a turtledove, for a sin offering, unto the door of the tabernacle of the congregation, unto the priest: Who shall offer it before the LORD, and make an atonement for her; and she shall be cleansed from the issue of her blood."
          reference="Leviticus 12:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The offering that ends the whole period, the same for a son or a daughter even though the
          number of days leading up to it was never the same.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 12:8</h3>
        <VerseQuote
          text="And if she be not able to bring a lamb, then she shall bring two turtles, or two young pigeons; the one for the burnt offering, and the other for a sin offering: and the priest shall make an atonement for her, and she shall be clean."
          reference="Leviticus 12:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exception for a family too poor to bring a lamb, the exact exception Mary and Joseph
          needed when they brought Jesus to the temple in Luke 2.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 12 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12 sets the law for a woman after childbirth: a period of ceremonial separation,
          seven days for a son and fourteen for a daughter, followed by a longer period of purifying,
          thirty three more days for a son and sixty six more for a daughter, ending with a sacrifice
          that the priest offers to make atonement for her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was a new mother considered unclean after childbirth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:2 uses the same word for her period of separation that Leviticus 15 already
          uses for a monthly cycle, placing the blood of childbirth in the same ceremonial category.
          The chapter never calls the mother sinful or the child sinful; it is a ritual classification
          tied to blood, not a moral judgment on giving birth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did purification take longer after a daughter than a son?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:5 doubles every number for a daughter, fourteen days instead of seven and
          sixty six instead of thirty three, for a total of eighty days instead of forty. The text
          does not explain the reason for the doubling, and no clear answer is stated anywhere else in
          Leviticus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was a baby boy circumcised on the eighth day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:3 applies the covenant sign God first gave Abraham in Genesis 17, where every
          male child was circumcised on his eighth day as a mark of belonging to God&apos;s covenant
          people. Leviticus 12 is the only verse in the book that commands the practice, placed right
          inside the timeline of his mother&apos;s own purification.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What offering did a new mother have to bring?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:6 required a lamb for a burnt offering and a young pigeon or turtledove for a
          sin offering, brought to the priest at the tabernacle. The priest then made atonement for
          her, and she was considered clean.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Leviticus 12 teach that childbirth itself is sinful?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No verse in this chapter calls childbirth a sin. It describes the blood involved as
          ceremonially unclean, the same category already used for a monthly cycle in Leviticus 15,
          which is a ritual classification rather than a statement about guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 12 connect to Mary and Jesus in Luke 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 2:22 and 24 record Mary and Joseph bringing &quot;a pair of turtledoves, or two young
          pigeons&quot; to the temple after Jesus was born, the exact provision Leviticus 12:8 made
          for a family too poor to afford a lamb. Luke is quoting this chapter&apos;s own exception,
          applied to the family of Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why could a poor woman bring birds instead of a lamb?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:8 allowed two turtledoves or two young pigeons in place of a lamb and a bird,
          one bird covering the burnt offering and the other the sin offering, so that cost was never
          a reason a family could not complete the required atonement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians still have to follow Leviticus 12 today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions read Leviticus 12 as part of the ceremonial law tied to the
          tabernacle and its priesthood, fulfilled in Christ rather than still required. Colossians
          2:11 describes believers as circumcised &quot;without hands&quot; in Christ, pointing past
          the physical sign this chapter commands.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 12 use the same word as the purity law in Leviticus 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 12:2 and 5 both describe the mother&apos;s time as her &quot;separation,&quot; the
          identical word Leviticus 15:19, 20, 25, and 26 use for a woman&apos;s monthly cycle. The
          shared word ties the two laws into the same ceremonial category of blood, rather than
          treating childbirth as its own, separate kind of impurity.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 12 is eight verses long, but it reaches further than its length suggests.</p>
          <p>
            📌 <strong>Ceremonial uncleanness was never the same thing as guilt.</strong> This chapter
            places the blood of childbirth in the same category as the monthly separation law, not in
            the category of sin, and never once calls a new mother or her child sinful for the event
            itself.
          </p>
          <p>
            📌 <strong>The law made the same room for a poor family that it made for a wealthy
            one.</strong> A lamb and a bird, or two birds alone, both ended at the same altar with the
            same atonement. Mary and Joseph needed the second option, and the chapter had already
            made space for them.
          </p>
          <p>
            📌 <strong>A covenant sign and a mother&apos;s healing sit inside the same eight
            verses.</strong> The eighth day circumcision and the fortieth or eightieth day offering
            both belong to the same family event, recorded together rather than apart.
          </p>
          <p>
            You will likely never count thirty three days or bring a bird to an altar. But this
            chapter still asks whether you see God&apos;s provision reaching into the most ordinary,
            unglamorous parts of family life, the parts no one writes songs about.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Luke 2:22 to 24 today, and picture Mary holding the exact offering Leviticus 12:8
            had set aside for a family like hers, centuries before she ever needed it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
