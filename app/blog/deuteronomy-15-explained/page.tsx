import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-15-explained", {
  title: "Deuteronomy 15 Explained: Debt Release, Open Hands, Free Servants",
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

export default function DeuteronomyFifteenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-15-explained"
      title={<>📖 Deuteronomy 15 Explained: Debt Release, Open Hands, Free Servants</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A debt wiped clean. A hand forced open. A servant sent off with a flock of his own.</p>
            <p>
              <strong>Deuteronomy 15 explained</strong> is Moses moving from the dinner table in
              the last chapter to the ledger. <ArticleLink href="/blog/deuteronomy-14-explained">
              Deuteronomy 14</ArticleLink> asked whether holiness reached what Israel ate. This
              chapter asks whether it reached what Israel owned, and whether a household let go of
              money, grain, and people the moment God said the time was up.
            </p>
            <p>Maybe you have only ever heard this chapter as an ancient rule about loans, with nothing left to say to you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why would God command every debt forgiven on a fixed schedule?</li>
            <li>❓ Does verse 4 promising no poor contradict verse 11 saying the poor will never cease?</li>
            <li>❓ Why does a servant get paid to leave after serving for free?</li>
            <li>❓ What does an awl through the ear have to do with loving your master?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 15 is three different kinds of release, all running on the same
              clock, all testing the same thing: does your hand stay open once the bill comes
              due.</strong>
            </p>
            <p>
              Twenty three verses, and they cover a debt released every seven years, a hand
              commanded to stay open to the poor in between, a servant freed and sent off loaded
              with provisions, and a firstborn animal that belonged to God before it belonged to
              anyone&apos;s herd.
            </p>
            <p>Read slowly. This chapter will not let generosity stay a feeling. It makes generosity a law with a due date.</p>
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
            <ArticleLink href="/blog/deuteronomy-14-explained">Deuteronomy 14</ArticleLink> closed
            with a tithe that stayed home every third year specifically to feed the Levite, the
            stranger, the fatherless, and the widow within the gates. Holiness had already reached
            the dinner table and the storeroom.
          </p>
          <p>
            Deuteronomy 15 takes that same concern for the forgotten and moves it into the
            household&apos;s money and labor. It stops asking what gets stored in the barn for the
            poor once every three years and starts asking what gets released to them, on a fixed
            seven year rhythm, long before anyone has to ask for it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 15 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Every Seven Years, the Debt Is Gone (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens the chapter with a date already circled on the calendar.</p>
        </div>
        <VerseQuote text="At the end of every seven years thou shalt make a release." reference="Deuteronomy 15:1" />
        <VerseQuote
          text="And this is the manner of the release: Every creditor that lendeth ought unto his neighbour shall release it; he shall not exact it of his neighbour, or of his brother; because it is called the LORD's release."
          reference="Deuteronomy 15:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This release has a name, and the name is not Israel&apos;s. It is the
            LORD&apos;s release.</strong> A creditor who cancels a debt in this chapter is not
            being extra generous out of his own goodness. He is simply doing what the actual owner
            of the arrangement already decided. The debt was always going to end on this clock,
            whether the creditor liked the schedule or not.
          </p>
          <p>Verse 3 then draws a line most modern readers do not expect.</p>
        </div>
        <VerseQuote text="Of a foreigner thou mayest exact it again: but that which is thine with thy brother thine hand shall release;" reference="Deuteronomy 15:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The release runs along covenant lines, not a universal rule for every loan
            everywhere. A foreign trader doing business with Israel operated outside this cycle and
            could still be held to the original terms. Inside the covenant family, between brother
            and brother, the clock could not be negotiated away.
          </p>
          <p>Then comes a promise that sounds almost too clean.</p>
        </div>
        <VerseQuote
          text="Save when there shall be no poor among you; for the LORD shall greatly bless thee in the land which the LORD thy God giveth thee for an inheritance to possess it: Only if thou carefully hearken unto the voice of the LORD thy God, to observe to do all these commandments which I command thee this day."
          reference="Deuteronomy 15:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The promise of no poor is not unconditional. It is tied directly to
            obedience.</strong> Verse 5 attaches the blessing of verse 4 to one word: only. Only if
            Israel carefully listens and does what is commanded. The abundance was real, but it was
            never separate from the obedience that made room for it.
          </p>
        </div>
        <VerseQuote
          text="For the LORD thy God blesseth thee, as he promised thee: and thou shalt lend unto many nations, but thou shalt not borrow; and thou shalt reign over many nations, but they shall not reign over thee."
          reference="Deuteronomy 15:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A nation that obeyed would lend, not borrow. It would lead, not be led. Verse 6 paints
            the picture of what full obedience could have produced, before the chapter turns and
            describes the land as it would actually be lived in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Hand That Has to Stay Open (verses 7 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses turns from the schedule itself to the heart that has to carry it out.</p>
        </div>
        <VerseQuote
          text="If there be among you a poor man of one of thy brethren within any of thy gates in thy land which the LORD thy God giveth thee, thou shalt not harden thine heart, nor shut thine hand from thy poor brother:"
          reference="Deuteronomy 15:7"
        />
        <VerseQuote
          text="But thou shalt open thine hand wide unto him, and shalt surely lend him sufficient for his need, in that which he wanteth."
          reference="Deuteronomy 15:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two body parts get named in one breath: the heart and the hand.</strong> A
            hardened heart comes first in verse 7, and a shut hand follows right behind it. Moses
            treats the two as one problem. What a person refuses inwardly, their hand eventually
            refuses outwardly too.
          </p>
          <p>Then he names the exact thought that would make the whole system fail.</p>
        </div>
        <VerseQuote
          text="Beware that there be not a thought in thy wicked heart, saying, The seventh year, the year of release, is at hand; and thine eye be evil against thy poor brother, and thou givest him nought; and he cry unto the LORD against thee, and it be sin unto thee."
          reference="Deuteronomy 15:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The law Moses just gave to protect the poor could become the exact reason a
            lender refused to help them.</strong> Someone doing the math in year six, watching the
            release clock tick closer, could decide a loan was too risky to make at all. Moses
            calls that calculation out by name before it ever gets the chance to feel reasonable.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt surely give him, and thine heart shall not be grieved when thou givest unto him: because that for this thing the LORD thy God shall bless thee in all thy works, and in all that thou puttest thine hand unto."
          reference="Deuteronomy 15:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verse 11 then says plainly what verse 4 only hinted at.</p>
        </div>
        <VerseQuote
          text="For the poor shall never cease out of the land: therefore I command thee, saying, Thou shalt open thine hand wide unto thy brother, to thy poor, and to thy needy, in thy land."
          reference="Deuteronomy 15:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 4 described what full obedience could produce. Verse 11 describes the land as
            Moses actually expects it to run, with poverty never fully gone. The two verses are not
            fighting each other. One names the ideal God offers; the other names the reality Moses
            knows Israel will actually live in, and commands generosity either way.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Servant Set Free, and Sent Off Loaded (verses 12 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From debts, Moses turns to a different kind of release: a person.</p>
        </div>
        <VerseQuote
          text="And if thy brother, an Hebrew man, or an Hebrew woman, be sold unto thee, and serve thee six years; then in the seventh year thou shalt let him go free from thee."
          reference="Deuteronomy 15:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A Hebrew servant in this world was usually someone who had sold their own labor to pay
            off debt, not property seized by force. <ArticleLink href="/blog/exodus-21-explained">
            Exodus 21</ArticleLink> had already set the same six year limit at Sinai. Moses is not
            introducing a new law here. He is making sure a generation that never heard it the
            first time does not let the limit quietly disappear.
          </p>
          <p>What comes next is new, and it is the heart of this whole section.</p>
        </div>
        <VerseQuote
          text="And when thou sendest him out free from thee, thou shalt not let him go away empty: Thou shalt furnish him liberally out of thy flock, and out of thy floor, and out of thy winepress: of that wherewith the LORD thy God hath blessed thee thou shalt give unto him."
          reference="Deuteronomy 15:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Freedom with empty hands was not freedom Moses was willing to call
            enough.</strong> A servant released with nothing would be free in name only, likely back
            in debt within a season. Moses commands flock, grain, and wine to leave with him,
            enough to actually start again, not just enough to walk out the door.
          </p>
          <p>Then Moses gives the reason, and it is the same reason Israel hears again and again.</p>
        </div>
        <VerseQuote text="And thou shalt remember that thou wast a bondman in the land of Egypt, and the LORD thy God redeemed thee: therefore I command thee this thing to day." reference="Deuteronomy 15:15" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Israel did not walk out of Egypt with empty hands either. Exodus describes them
            leaving with silver, gold, and livestock from the very nation that had enslaved them.
            A master sending a servant off loaded is simply repeating, on a small scale, what God
            already did for every person reading this law.
          </p>
          <p>Moses then allows for the servant who genuinely wants to stay.</p>
        </div>
        <VerseQuote
          text="And it shall be, if he say unto thee, I will not go away from thee; because he loveth thee and thine house, because he is well with thee; Then thou shalt take an aul, and thrust it through his ear unto the door, and he shall be thy servant for ever. And also unto thy maidservant thou shalt do likewise."
          reference="Deuteronomy 15:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This permanent arrangement is offered, never forced.</strong> The whole
            scenario depends on the servant&apos;s own words: because he loves his master, and is
            well with him. The piercing marked a choice already made freely, not a master
            overriding a servant who wanted to leave.
          </p>
          <p>Verse 18 closes the section by reframing the entire six years that came before.</p>
        </div>
        <VerseQuote
          text="It shall not seem hard unto thee, when thou sendest him away free from thee; for he hath been worth a double hired servant to thee, in serving thee six years: and the LORD thy God shall bless thee in all that thou doest."
          reference="Deuteronomy 15:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses anticipates the master&apos;s resentment before it has a chance to form.</strong>{" "}
            Losing free labor could feel like a loss. Moses answers that feeling directly: six years
            of service already outweighed what a hired servant would have cost, so the release owed
            to the servant was never really a net loss to begin with.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Firstborn Animal Already Belongs to God (verses 19 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes on a release that happens before an animal is ever old enough to work.</p>
        </div>
        <VerseQuote
          text="All the firstling males that come of thy herd and of thy flock thou shalt sanctify unto the LORD thy God: thou shalt do no work with the firstling of thy bullock, nor shear the firstling of thy sheep."
          reference="Deuteronomy 15:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A firstborn male calf or lamb was claimed by God before a household ever got
            to use it.</strong> No plowing with it, no shearing it for wool first. It belonged to
            the LORD from birth, the same claim already placed on Israel&apos;s own firstborn sons
            back in <ArticleLink href="/blog/exodus-13-explained">Exodus 13</ArticleLink>, the
            night the LORD passed over Egypt&apos;s firstborn and spared Israel&apos;s.
          </p>
          <p>Eaten, not kept, and eaten in one specific place.</p>
        </div>
        <VerseQuote text="Thou shalt eat it before the LORD thy God year by year in the place which the LORD shall choose, thou and thy household." reference="Deuteronomy 15:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That one chosen place is the same place <ArticleLink href="/blog/deuteronomy-14-explained">
            Deuteronomy 14</ArticleLink> already sent the yearly tithe. A firstling sacrifice and an
            annual tithe both run through the same single location, keeping Israel&apos;s worship
            from scattering the way Canaanite worship did.
          </p>
          <p>Not every firstling qualifies, though.</p>
        </div>
        <VerseQuote text="And if there be any blemish therein, as if it be lame, or blind, or have any ill blemish, thou shalt not sacrifice it unto the LORD thy God." reference="Deuteronomy 15:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A lame or blind animal could not be offered to God, though it was never simply
            discarded.
          </p>
        </div>
        <VerseQuote text="Thou shalt eat it within thy gates: the unclean and the clean person shall eat it alike, as the roebuck, and as the hart." reference="Deuteronomy 15:22" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A blemished firstling simply becomes ordinary food, eaten at home like any
            other meat.</strong> The sacrifice rule only ever applied to what was fit to offer. A
            flawed animal lost its place at the altar, not its place at the table.
          </p>
          <p>The chapter ends on the one rule that has followed every meat law so far in Deuteronomy.</p>
        </div>
        <VerseQuote text="Only thou shalt not eat the blood thereof; thou shalt pour it upon the ground as water." reference="Deuteronomy 15:23" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>A chapter that opened by releasing debts closes by releasing blood back to
            the ground.</strong> Every kind of release in this chapter, money, people, and now
            life itself, ends up handed back to the one it actually belonged to all along.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 15 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does verse 4 promising no poor contradict verse 11 saying the poor will never
            cease?</strong> The two verses describe different things, not a contradiction. Verse 4
            states what full, careful obedience could produce, explicitly conditioned in verse 5 on
            Israel actually keeping every command. Verse 11 states the realistic situation Moses
            expects, since Israel&apos;s obedience would never be perfect, and commands open handed
            generosity regardless of which situation is true.
          </p>
          <p>
            <strong>Why did the release apply to a brother but not to a foreigner, in verse 3?</strong>{" "}
            The release ran along covenant lines rather than functioning as a universal debt law.
            A foreign trader operated by the ordinary terms of the loan, while a fellow Israelite
            fell under the LORD&apos;s release because both lender and borrower belonged to the
            same covenant people under the same God.
          </p>
          <p>
            <strong>Was Hebrew servitude in this chapter the same as slavery as commonly
            understood today?</strong> The text describes a time limited arrangement, usually
            entered to pay off debt, with a mandatory release after six years and a command to
            send the servant away provided for, not empty handed. The chapter also allows, but
            never forces, a servant to choose permanent service out of love for the household,
            marked by the piercing in verse 17. Both of these features mark it as different from
            chattel slavery, though the text does not pretend the arrangement carried no real
            hardship for the person inside it.
          </p>
          <p>
            <strong>Why pierce a servant&apos;s ear specifically, rather than use some other
            mark?</strong> Scripture does not explain the choice of the ear beyond describing the
            practice itself. What the text makes plain is that the mark followed a stated choice,
            not a master&apos;s decision made for the servant. The servant&apos;s own words, because
            he loveth thee, come first in verse 16, before the piercing in verse 17.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 15:1</h3>
        <VerseQuote text="At the end of every seven years thou shalt make a release." reference="Deuteronomy 15:1" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse the whole chapter is built around. Debt in Israel was never meant to run
          forever. It had a release date written into the law itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 15:7 and 8</h3>
        <VerseQuote
          text="If there be among you a poor man of one of thy brethren within any of thy gates in thy land which the LORD thy God giveth thee, thou shalt not harden thine heart, nor shut thine hand from thy poor brother: But thou shalt open thine hand wide unto him."
          reference="Deuteronomy 15:7 and 8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The heart and the hand named together. Moses treats a closed hand as a symptom of a
          hardened heart, not a separate problem on its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 15:11</h3>
        <VerseQuote
          text="For the poor shall never cease out of the land: therefore I command thee, saying, Thou shalt open thine hand wide unto thy brother, to thy poor, and to thy needy, in thy land."
          reference="Deuteronomy 15:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A realistic verse, not a defeated one. The command to give generously does not wait for
          poverty to disappear first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 15:14</h3>
        <VerseQuote
          text="Thou shalt furnish him liberally out of thy flock, and out of thy floor, and out of thy winepress: of that wherewith the LORD thy God hath blessed thee thou shalt give unto him."
          reference="Deuteronomy 15:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Freedom with nothing to start on was not freedom Moses called finished. A released
          servant had to leave with something real in his hands.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 15:15</h3>
        <VerseQuote text="And thou shalt remember that thou wast a bondman in the land of Egypt, and the LORD thy God redeemed thee: therefore I command thee this thing to day." reference="Deuteronomy 15:15" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind every release in this chapter, in one sentence. Israel gives because
          Israel first received, from a God who redeemed them while they owned nothing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 15 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 15 commands a release of debts between Israelites every seven years, an open
          handed response to the poor regardless of the release schedule, a freed and provisioned
          Hebrew servant after six years of service, and the dedication of firstborn male animals
          to the LORD.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the Sabbath year debt release in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 15:1 and 2 command every seven years that a creditor cancel what a fellow
          Israelite owes him, called the LORD&apos;s release. It applied between covenant brothers
          and did not cancel what a foreigner owed, as verse 3 states directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 15 contradict itself about poverty?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verse 4 describes what full obedience could produce, conditioned in verse 5 on
          Israel actually keeping every command. Verse 11 names the more realistic future and
          commands generosity to the poor either way, so the two verses work together rather than
          against each other.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did a Hebrew servant serve before being freed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Six years, with release required in the seventh, the same limit Exodus 21 already set at
          Sinai. Deuteronomy 15:13 and 14 add a new requirement on top of that limit: the servant
          had to leave provisioned with flock, grain, and wine, not empty handed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a servant&apos;s ear get pierced in Deuteronomy 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 16 and 17 describe a servant who chooses to stay permanently because he loves his
          master and is well with him. The piercing marked that freely stated choice to remain, not
          a master forcing the servant to stay against his will.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Hebrew servitude in the Bible the same as slavery?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It differed in key ways from chattel slavery: it was usually entered to pay off debt, it
          carried a mandatory six year limit, and a servant leaving was required to be provided
          for rather than released empty handed. The text does not pretend the arrangement carried
          no hardship, but it is not described or regulated the way later slave systems were.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did firstborn animals belong to God in Deuteronomy 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 15:19 claims every firstling male for the LORD before it could be put to work
          or sheared. This mirrors the claim God placed on Israel&apos;s own firstborn sons in
          Exodus 13, the night the LORD spared Israel&apos;s firstborn in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to a firstling animal with a blemish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 15:21 and 22 forbid sacrificing a lame or blind firstling, but it was not
          thrown away. It became ordinary food, eaten at home like any other meat, available to the
          clean and unclean person alike.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 15 still apply to Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The specific debt and servant release laws belonged to Israel&apos;s covenant and
          economy. The principle behind them still stands: God&apos;s people are called to open
          handed generosity toward the poor and the indebted, rooted in remembering that they were
          themselves once redeemed while owning nothing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 15 never asks Israel to feel generous. It asks them to release on schedule, whether they feel like it or not.</p>
          <p>
            📌 <strong>Generosity in this chapter is a law with a due date, not a mood.</strong>{" "}
            A debt released, a hand opened, a servant provisioned for, all commanded on a fixed
            clock rather than left to whatever a lender happened to feel in the moment.
          </p>
          <p>
            📌 <strong>Every release traces back to one memory.</strong> Verse 15 roots the whole
            chapter in Egypt. Israel gives because Israel first received, redeemed while owning
            nothing at all.
          </p>
          <p>
            📌 <strong>What belongs to God gets handed back to Him, even down to the blood poured
            on the ground.</strong> Money, people, and life itself all move through this chapter
            toward the one they actually belonged to from the start.
          </p>
          <p>
            You do not run a seven year debt cycle. But you still decide, on your own private
            schedule, whether your hand stays open once giving stops feeling convenient.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one debt, favor, or grudge you are quietly still holding over someone, and
            release it this week the way this chapter commands, before anyone has to ask.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
