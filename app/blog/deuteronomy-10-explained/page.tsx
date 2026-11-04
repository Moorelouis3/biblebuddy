import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-10-explained", {
  title: "Deuteronomy 10 Explained: Circumcise Your Heart",
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

export default function DeuteronomyTenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-10-explained"
      title={<>📖 Deuteronomy 10 Explained: Circumcise Your Heart</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>New stone. Same ten words. And a question Moses will not let Israel skip.</p>
            <p>
              <strong>Deuteronomy 10 explained</strong> is Moses finishing the story he started in
              the last chapter, the broken tables replaced, Aaron buried, the priesthood settled,
              and then turning that whole story into a single demand: not a better sacrifice, not
              a bigger offering, but a changed heart.
            </p>
            <p>Maybe you have wondered what God actually wants from you, underneath all the rules.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Moses stop a dramatic story to mention Aaron&apos;s death and the tribe of Levi?</li>
            <li>❓ What does it mean to circumcise your heart?</li>
            <li>❓ Why does a chapter about Israel suddenly command love for strangers?</li>
            <li>❓ Is &quot;what the LORD thy God require of thee&quot; really this short a list?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 10 answers the question every religious person eventually
              asks, and the answer is not another rule to add to the pile.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the second set of tables,
              the ark built to hold them, the quiet aside about Aaron and the Levites, the forty
              more days on the mountain, and the command to circumcise a heart instead of just a
              body.
            </p>
            <p>Twenty two verses, and the second half rewrites what obedience actually means.</p>
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
            <ArticleLink href="/blog/deuteronomy-9-explained">Deuteronomy 9</ArticleLink> told the
            golden calf story from Moses&apos; own memory: the first tables broken at the foot of
            the mountain, God ready to destroy the whole nation, and Moses falling down for forty
            days twice, pleading for people who had just melted down a calf and called it their
            god. That chapter ended on one line holding the whole argument together: Israel is
            spared because they are still His, not because they deserved it.
          </p>
          <p>
            Deuteronomy 10 picks the story up exactly where it stopped. The calf is gone. The
            tables are broken. Now something has to replace them, and Moses spends the first half
            of this chapter closing out the story <ArticleLink href="/blog/exodus-32-explained">
            Exodus 32</ArticleLink> started, before turning to what all of it was actually for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. New Stone, Same Words, a Box to Hold Them (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with God&apos;s instruction right after the broken tables.</p>
        </div>
        <VerseQuote
          text="At that time the LORD said unto me, Hew thee two tables of stone like unto the first, and come up unto me into the mount, and make thee an ark of wood. And I will write on the tables the words that were in the first tables which thou brakest, and thou shalt put them in the ark."
          reference="Deuteronomy 10:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who does the cutting and who does the writing.</strong> Moses hews
            the stone. God writes the words. The second set of tables is not a watered down
            replacement negotiated after Israel&apos;s failure. It carries the exact same words as
            the first, because the covenant itself never changed, only the stone it was written
            on.
          </p>
          <p>He obeys, and names the one new object this time that the first tables never needed.</p>
        </div>
        <VerseQuote
          text="And I made an ark of shittim wood, and hewed two tables of stone like unto the first, and went up into the mount, having the two tables in mine hand. And he wrote on the tables, according to the first writing, the ten commandments, which the LORD spake unto you in the mount out of the midst of the fire in the day of the assembly: and the LORD gave them unto me."
          reference="Deuteronomy 10:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The first time Moses came down the mountain, he had nothing ready to hold the
            tables because no one expected him to need one. This time, warned by what happened
            the first time, he builds the ark before he ever climbs back up. A people who just
            proved they could not be trusted empty handed are given something built on purpose to
            keep the words safe.
          </p>
        </div>
        <VerseQuote
          text="And I turned myself and came down from the mount, and put the tables in the ark which I had made; and there they be, as the LORD commanded me."
          reference="Deuteronomy 10:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;There they be&quot; is Moses speaking decades later, pointing at an ark still
            sitting exactly where he put the tables. The ten words that almost ended in a pile of
            broken rock are, right now, as he preaches this sermon, still resting safely inside a
            box he built with his own hands.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Quiet Aside About Aaron and the Levites (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses breaks the ark story to insert something that sounds out of place until you
            notice why it is here.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel took their journey from Beeroth of the children of Jaakan to Mosera: there Aaron died, and there he was buried; and Eleazar his son ministered in the priest's office in his stead. From thence they journeyed unto Gudgodah; and from Gudgodah to Jotbath, a land of rivers of waters."
          reference="Deuteronomy 10:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Elsewhere, Aaron&apos;s death is placed at Mount Hor, not Mosera.</strong>{" "}
            <ArticleLink href="/blog/numbers-20-explained">Numbers 20</ArticleLink> records Aaron
            dying on Mount Hor, and Numbers 33 lists Moseroth earlier in the same itinerary, before
            the camp ever reaches Mount Hor. The most common explanation among readers who take
            both passages seriously is that Mosera was a wider camp or region that included Mount
            Hor, the way a traveler might name the nearest town rather than the exact hillside.
            Moses is also not narrating a strict travel log here; he inserts this notice to explain
            why the Levites hold the priesthood now, not to retrace the itinerary verse by verse.
            Either way, both passages agree on what matters most: Aaron died before Israel entered
            the land, and his son took his place.
          </p>
          <p>Then the aside explains itself.</p>
        </div>
        <VerseQuote
          text="At that time the LORD separated the tribe of Levi, to bear the ark of the covenant of the LORD, to stand before the LORD to minister unto him, and to bless in his name, unto this day. Wherefore Levi hath no part nor inheritance with his brethren; the LORD is his inheritance, according as the LORD thy God promised him."
          reference="Deuteronomy 10:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses mentions the ark, then immediately mentions the tribe assigned to
            carry it.</strong> The connection is not an accident. A box this important needed
            carriers set apart for nothing else, and{" "}
            <ArticleLink href="/blog/numbers-18-explained">Numbers 18</ArticleLink> already laid
            out exactly what that set apart life would cost the Levites: no land of their own, no
            inheritance like the other eleven tribes. Moses sums up what that trade was worth in
            four words. The LORD is his inheritance.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Forty More Days, and the Command to Move (verse 10 and 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses returns to the main story and closes it with one sentence that could have been the whole chapter.</p>
        </div>
        <VerseQuote
          text="And I stayed in the mount, according to the first time, forty days and forty nights; and the LORD hearkened unto me at that time also, and the LORD would not destroy thee."
          reference="Deuteronomy 10:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Deuteronomy 9 already told the story of this second forty day fast in detail, Moses
            face down, pleading, afraid of what God&apos;s anger might still do. Here he compresses
            the whole thing into a single verse and a single outcome: the LORD would not destroy
            thee. Everything that mattered about those forty days gets flattened into that one
            sentence, because the sentence is the only part Israel actually needs to carry forward.
          </p>
          <p>With the crisis finally behind them, God gives the only command that matters now.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto me, Arise, take thy journey before the people, that they may go in and possess the land, which I sware unto their fathers to give unto them."
          reference="Deuteronomy 10:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The golden calf does not get the last word.</strong> The last word is move
            forward, toward a promise made long before any calf was ever built. A failure this
            serious still ends with God pointing Israel at the land, not away from it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. &quot;What Doth the LORD Thy God Require of Thee&quot; (verses 12 and 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses turns from the story to the question the whole chapter has been building toward.</p>
        </div>
        <VerseQuote
          text="And now, Israel, what doth the LORD thy God require of thee, but to fear the LORD thy God, to walk in all his ways, and to love him, and to serve the LORD thy God with all thy heart and with all thy soul, To keep the commandments of the LORD, and his statutes, which I command thee this day for thy good?"
          reference="Deuteronomy 10:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>After a whole chapter and a half about broken stone, a melted calf, and a
            nation nearly destroyed, Moses asks what God actually requires, and the list is short:
            fear, walk, love, serve, keep.</strong> Five verbs, no sacrifice listed among them, no
            mention of ritual at all. The requirement was never complicated. What made it hard was
            never the length of the list.
          </p>
          <p>
            💡 &quot;For thy good&quot; at the end of verse 13 matters. The commandments are not
            framed here as a test God needs Israel to pass for His own sake. They are framed as
            instructions for Israel&apos;s own benefit, the same way a parent&apos;s rule about a
            hot stove is for the child, not for the parent.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Everything Already Belongs to Him, and He Still Chose You (verses 14 and 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses answers an unspoken question: why would a God this big care about one small, stiffnecked nation at all?</p>
        </div>
        <VerseQuote
          text="Behold, the heaven and the heaven of heavens is the LORD's thy God, the earth also, with all that therein is. Only the LORD had a delight in thy fathers to love them, and he chose their seed after them, even you above all people, as it is this day."
          reference="Deuteronomy 10:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God does not choose Israel because He needed anything from them.</strong>{" "}
            Verse 14 says plainly that the heaven and the heaven of heavens, every corner of
            creation, already belongs to Him. A God who owns everything has no practical need for
            one small nation of shepherds. The only reason given in verse 15 is delight, the same
            undeserved love Deuteronomy 9 already insisted had nothing to do with Israel&apos;s
            own righteousness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Circumcise the Heart, Not Just the Flesh (verse 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short verse, and it is the sharpest line in the whole chapter.</p>
        </div>
        <VerseQuote
          text="Circumcise therefore the foreskin of your heart, and be no more stiffnecked."
          reference="Deuteronomy 10:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Circumcision was already the physical sign of the covenant, cut into the
            body of every Israelite male.</strong> Moses takes that same word and points it
            somewhere a knife cannot reach. The real cutting away Israel needs is not on the body.
            It is whatever hard, resistant layer around the heart keeps it stiffnecked, the same
            word <ArticleLink href="/blog/deuteronomy-9-explained">Deuteronomy 9</ArticleLink>{" "}
            already used twice to describe Israel at Horeb.
          </p>
          <p>
            💡 This is not the last time Scripture reaches for this exact picture. Moses himself
            uses it again later, promising that one day God Himself will circumcise Israel&apos;s
            heart. Centuries later Paul picks up the same language, calling the circumcision that
            actually matters one of the heart, not a mark on the flesh. The outward sign was
            always meant to point at something inward it could not perform by itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The God of Gods Who Loves the Stranger (verses 17 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses describes exactly who Israel is being asked to love with a circumcised heart.</p>
        </div>
        <VerseQuote
          text="For the LORD your God is God of gods, and Lord of lords, a great God, a mighty, and a terrible, which regardeth not persons, nor taketh reward: He doth execute the judgment of the fatherless and widow, and loveth the stranger, in giving him food and raiment."
          reference="Deuteronomy 10:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The same sentence holds together a God too great to be bribed and a God
            who personally feeds the stranger with no family to protect him.</strong> &quot;Regardeth
            not persons, nor taketh reward&quot; rules out every shortcut wealth or status might
            buy with a lesser god. The very next clause shows what that impartial justice looks
            like up close: food and clothing for the one person in the camp with nothing and no
            one.
          </p>
          <p>Moses turns that description into a command aimed straight at Israel.</p>
        </div>
        <VerseQuote
          text="Love ye therefore the stranger: for ye were strangers in the land of Egypt."
          reference="Deuteronomy 10:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The command is not abstract kindness. It is memory turned into law. Israel knows
            exactly what it feels like to be a stranger with no standing in someone else&apos;s
            land, because they lived it in Egypt for generations. <ArticleLink href="/blog/leviticus-19-explained">
            Leviticus 19</ArticleLink> gives this same command its fullest form, love the stranger
            as thyself, built on the identical memory of Egypt.
          </p>
          <p>The chapter closes by returning to where verses 12 and 13 started, and adding one more layer.</p>
        </div>
        <VerseQuote
          text="Thou shalt fear the LORD thy God; him shalt thou serve, and to him shalt thou cleave, and swear by his name. He is thy praise, and he is thy God, that hath done for thee these great and terrible things, which thine eyes have seen."
          reference="Deuteronomy 10:20 and 21"
        />
        <VerseQuote
          text="Thy fathers went down into Egypt with threescore and ten persons; and now the LORD thy God hath made thee as the stars of heaven for multitude."
          reference="Deuteronomy 10:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Seventy people went down into Egypt. Now Moses looks at a camp too large to
            count easily, standing at the edge of the land God promised their seventy ancestors.</strong>{" "}
            The chapter ends on the same note Deuteronomy 9 ended on: not Israel&apos;s record, but
            what God has actually done with a small, stiffnecked family over four hundred years.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Aaron die at Mosera or at Mount Hor?</strong> Numbers 20 and Numbers 33
            both place Aaron&apos;s death at Mount Hor, while Deuteronomy 10:6 names Mosera. The
            text does not fully resolve the difference. The explanation most readers who take both
            passages seriously land on is that Mosera named a wider camp or region that included
            Mount Hor, the way someone today might name the nearest town instead of the exact spot
            on a hillside. Both accounts agree on the part that matters for this chapter&apos;s
            point: Aaron died, and Eleazar took his place.
          </p>
          <p>
            <strong>Why does Moses interrupt the ark story to talk about Aaron&apos;s death and
            the Levites?</strong> The insertion sits right after the ark is mentioned because the
            ark needed dedicated carriers. Verses 8 and 9 explain that the tribe of Levi was set
            apart for exactly this role, with no inheritance of land because, as Moses puts it, the
            LORD is their inheritance instead. The aside is not a detour from the chapter&apos;s
            point. It is background for who gets to carry the thing the chapter just finished
            building.
          </p>
          <p>
            <strong>What does it actually mean to circumcise your heart?</strong> Verse 16 pairs
            the command directly with &quot;be no more stiffnecked,&quot; the same resistant,
            unyielding posture Deuteronomy 9 describes at Horeb. The command pictures cutting away
            whatever hard layer keeps a person&apos;s will turned against God, the same inward
            change later prophets and Paul both describe using this exact image. The chapter does
            not explain the mechanics of how that cutting happens, only that it is required.
          </p>
          <p>
            <strong>Does verse 19&apos;s command to love the stranger apply only to Israel&apos;s
            specific situation in Egypt?</strong> The verse grounds the command in Israel&apos;s
            own memory of being strangers, which could sound limited to their history. But Leviticus
            19 repeats the same command in a broader law code applied generally to how Israel was
            to treat any outsider living among them, not as a one time exception tied only to the
            exodus. The principle behind the command, remembering your own vulnerability before
            treating someone else&apos;s, is stated as a standing instruction, not a historical
            footnote.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 10:12 and 13</h3>
        <VerseQuote
          text="And now, Israel, what doth the LORD thy God require of thee, but to fear the LORD thy God, to walk in all his ways, and to love him, and to serve the LORD thy God with all thy heart and with all thy soul, To keep the commandments of the LORD, and his statutes, which I command thee this day for thy good?"
          reference="Deuteronomy 10:12 and 13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The entire law compressed into five verbs: fear, walk, love, serve, keep. After a chapter
          and a half of crisis, the requirement turns out to have been this simple all along.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 10:16</h3>
        <VerseQuote text="Circumcise therefore the foreskin of your heart, and be no more stiffnecked." reference="Deuteronomy 10:16" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that takes a mark already cut into every Israelite man&apos;s body and points
          it at something a knife was never going to reach.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 10:17 and 18</h3>
        <VerseQuote
          text="For the LORD your God is God of gods, and Lord of lords, a great God, a mighty, and a terrible, which regardeth not persons, nor taketh reward: He doth execute the judgment of the fatherless and widow, and loveth the stranger, in giving him food and raiment."
          reference="Deuteronomy 10:17 and 18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same sentence that calls God too great to be bribed also calls Him the one who
          personally feeds the stranger with nothing and no one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 10:19</h3>
        <VerseQuote text="Love ye therefore the stranger: for ye were strangers in the land of Egypt." reference="Deuteronomy 10:19" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A command built directly on memory. Israel is told to love the stranger not as an
          abstract virtue but because they know exactly what being one felt like.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 10:22</h3>
        <VerseQuote
          text="Thy fathers went down into Egypt with threescore and ten persons; and now the LORD thy God hath made thee as the stars of heaven for multitude."
          reference="Deuteronomy 10:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Seventy people became a nation too large to count easily, standing at the edge of the
          land God promised them four hundred years earlier.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 10 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 10 closes out the golden calf story with new stone tables and an ark to hold
          them, explains why the tribe of Levi carries the ark and has no land inheritance, and
          then turns to what God actually requires of Israel: fear, obedience, love, and a heart
          circumcised instead of just a body.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to circumcise your heart?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 10:16 pairs the command with &quot;be no more stiffnecked,&quot; picturing an
          inward change that cuts away whatever hard, resistant layer keeps a person&apos;s will
          turned against God. It takes the physical sign already cut into every Israelite man and
          points it at something only the heart itself can undergo.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 10 mention Aaron&apos;s death and the Levites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses mentions the ark in verse 5, then explains in verses 6 to 9 why the Levites were
          the ones carrying it: Aaron had died and Eleazar had taken his place, and the whole tribe
          of Levi was set apart to minister before the LORD instead of receiving land like the
          other tribes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Aaron die at Mosera or Mount Hor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 10:6 names Mosera, while Numbers 20 and Numbers 33 both name Mount Hor. Most
          readers who take both seriously conclude Mosera was a wider camp or region that included
          Mount Hor, since both accounts agree Aaron died there and Eleazar succeeded him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the LORD require according to Deuteronomy 10:12 and 13?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Five things: fear the LORD, walk in all His ways, love Him, serve Him with all your heart
          and soul, and keep His commandments. No sacrifice or ritual appears on the list, and
          verse 13 adds that the commandments are given for Israel&apos;s own good.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 10 command love for the stranger?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 19 grounds the command in Israel&apos;s own history: they were once strangers in
          Egypt with no standing of their own. God&apos;s own character, described in verse 18 as
          loving the stranger with food and clothing, becomes the pattern Israel is told to follow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Levites get no land inheritance?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 10:9 says the Levites were set apart to carry the ark and minister before the
          LORD, and in exchange the LORD Himself became their inheritance instead of a plot of
          land like the other eleven tribes received.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the second set of stone tables made of?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text says Moses hewed the stone tables himself, like the first ones, while God wrote
          the same ten commandments on them. The ark built to hold them was made of shittim wood,
          named in verse 3.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 10 say heaven belongs to the LORD before talking about Israel being chosen?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 14 and 15 make the point that God did not choose Israel out of any need. He
          already owned everything in creation. The only reason given for choosing Israel&apos;s
          fathers is delight, the same kind of undeserved love Deuteronomy 9 already insisted had
          nothing to do with Israel&apos;s own righteousness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the main lesson of Deuteronomy 10 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That obedience was never meant to stop at outward signs. The chapter moves from a
          physical mark cut into the body to a change God demands in the heart itself, and ties
          that inward change directly to how you treat the person with the least standing to
          demand anything from you.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 10 moves from broken stone to a short list to one demanding verse, and each step gets closer to the real point.</p>
          <p>
            📌 <strong>What God requires was never complicated.</strong> Fear, walk, love, serve,
            keep. The hard part was never the length of the list.
          </p>
          <p>
            📌 <strong>A mark on the body was always meant to point at the heart.</strong> Verse 16
            takes a sign Israel already carried and asks for the thing it was supposed to
            represent all along.
          </p>
          <p>
            📌 <strong>Loving the stranger is not a side issue next to loving God.</strong> Moses
            puts them in the same breath, and grounds the second in a memory Israel could not
            pretend not to have.
          </p>
          <p>
            You are probably not carrying stone tables down a mountain this week. But something in
            your own life is still only circumcised on the surface, obeyed outwardly while the
            heart underneath stays exactly as stiffnecked as before.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask God honestly to cut away whatever is keeping your own heart stiffnecked, and watch
            for the one person this week who most needs you to remember what it felt like to be a
            stranger.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
