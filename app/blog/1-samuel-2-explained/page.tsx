import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-2-explained", {
  title: "1 Samuel 2 Explained: Hannah's Song and Eli's Corrupt Sons",
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

export default function OneSamuelTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-2-explained"
      title={<>📖 1 Samuel 2 Explained: Hannah&apos;s Song and Eli&apos;s Corrupt Sons</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A woman who could barely speak without crying in the last chapter now cannot stop singing.</p>
            <p>She hands her only son to an old priest and walks out of Shiloh composing a prayer on her way home.</p>
            <p>
              <strong>1 Samuel 2 explained</strong> opens with that song, and then spends the rest of
              its length on the opposite kind of story: two priests who inherited everything Hannah
              spent years asking God for, and treated it like nothing.
            </p>
            <p>Maybe you have watched someone waste a gift you would have given almost anything to receive.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Hannah talk about a king and an anointed one when Israel does not have a king yet?</li>
            <li>❓ What does it mean that Eli&apos;s sons were &quot;sons of Belial&quot;?</li>
            <li>❓ Why does the text say they would not listen because the LORD meant to kill them?</li>
            <li>❓ Who is the &quot;faithful priest&quot; God promises near the end of the chapter?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The same chapter that records Hannah&apos;s joy also records exactly how far
              a priesthood can rot while still showing up for work every day.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: Hannah&apos;s song, the
              corruption of Hophni and Phinehas, Samuel growing up at Shiloh, Eli&apos;s weak
              response, and the prophecy that tells Eli exactly how his family&apos;s story ends.
            </p>
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
            <ArticleLink href="/blog/1-samuel-1-explained">1 Samuel 1</ArticleLink> ended with Hannah
            finally bringing Samuel to Shiloh once he was weaned, handing him over to Eli exactly as
            she had vowed, and saying out loud that she was lending him to the LORD for the rest of
            his life.
          </p>
          <VerseQuote
            text="Therefore also I have lent him to the LORD; as long as he liveth he shall be lent to the LORD. And he worshipped the LORD there."
            reference="1 Samuel 1:28"
          />
          <p>
            1 Samuel 2 explained picks up right there, with a small child left behind at the
            tabernacle and a mother walking home without him. Before the narrator returns to Samuel
            at all, Hannah gets the first word, and what she says sets the tone for everything that
            follows.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 2 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Hannah Sings Instead of Just Saying Thank You (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens mid breath, as if Hannah started composing this the moment her prayer was answered.</p>
        </div>
        <VerseQuote
          text="And Hannah prayed, and said, My heart rejoiceth in the LORD, mine horn is exalted in the LORD: my mouth is enlarged over mine enemies; because I rejoice in thy salvation."
          reference="1 Samuel 2:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A horn on an animal was a picture of strength and standing in that world, so &quot;mine
            horn is exalted&quot; means Hannah&apos;s honor has been publicly lifted, not just her mood.
            &quot;Mine enemies&quot; almost certainly includes Peninnah, the rival wife who spent years
            provoking her at this same place of worship.
          </p>
          <p>Hannah does not stop at her own story. She widens out to who God is in general.</p>
        </div>
        <VerseQuote
          text="There is none holy as the LORD: for there is none beside thee: neither is there any rock like our God."
          reference="1 Samuel 2:2"
        />
        <VerseQuote
          text="Talk no more so exceeding proudly; let not arrogancy come out of your mouth: for the LORD is a God of knowledge, and by him actions are weighed."
          reference="1 Samuel 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 3 reads like it is aimed at a specific person, even though the text never
            names one.</strong> After a whole previous chapter of Peninnah&apos;s taunting, a warning
            against proud talk lands exactly where the reader expects it to. God weighs actions, not
            volume.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The God Who Turns Everything Upside Down (verses 4 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From here, Hannah&apos;s song stops being personal and becomes a pattern she sees in how God acts everywhere.</p>
        </div>
        <VerseQuote
          text="The bows of the mighty men are broken, and they that stumbled are girded with strength."
          reference="1 Samuel 2:4"
        />
        <VerseQuote
          text="They that were full have hired out themselves for bread; and they that were hungry ceased: so that the barren hath born seven; and she that hath many children is waxed feeble."
          reference="1 Samuel 2:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;The barren hath born seven&quot; is not a count of Hannah&apos;s own children.
            Seven was Israel&apos;s number for fullness, so this line is poetry describing total
            reversal, not a prediction about her family specifically. The pattern is the point, not
            the exact number: strong men fall, weak men rise, and a woman who could not conceive is
            held up as proof that God can turn any situation inside out.
          </p>
        </div>
        <VerseQuote
          text="The LORD killeth, and maketh alive: he bringeth down to the grave, and bringeth up."
          reference="1 Samuel 2:6"
        />
        <VerseQuote
          text="The LORD maketh poor, and maketh rich: he bringeth low, and lifteth up."
          reference="1 Samuel 2:7"
        />
        <VerseQuote
          text="He raiseth up the poor out of the dust, and lifteth up the beggar from the dunghill, to set them among princes, and to make them inherit the throne of glory: for the pillars of the earth are the LORD's, and he hath set the world upon them."
          reference="1 Samuel 2:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Hannah is not only celebrating what happened to her. She is describing how God
            runs the whole world.</strong> Dust and dunghill to a throne is about as far a reversal as
            language can picture, and she sings it as an ordinary fact about God&apos;s character, not
            as a special exception He made for her alone.
          </p>
          <p>The song ends on two verses that reach further than Hannah&apos;s own moment.</p>
        </div>
        <VerseQuote
          text="He will keep the feet of his saints, and the wicked shall be silent in darkness; for by strength shall no man prevail."
          reference="1 Samuel 2:9"
        />
        <VerseQuote
          text="The adversaries of the LORD shall be broken to pieces; out of heaven shall he thunder upon them: the LORD shall judge the ends of the earth; and he shall give strength unto his king, and exalt the horn of his anointed."
          reference="1 Samuel 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Hannah speaks of &quot;his king&quot; and &quot;his anointed&quot; at a moment
            when Israel has no king at all.</strong> Judges had just ended with the whole nation
            leaderless, and here a woman in an ordinary family prayer talks about God defending a
            king as though the idea is already settled. The son she just gave away will grow up to
            anoint the first two men who ever hold that office.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Samuel Serves at Shiloh While Eli&apos;s Sons Rot the Priesthood (verses 11 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The narrator moves fast from the song to the child it was all about.</p>
        </div>
        <VerseQuote
          text="And Elkanah went to Ramah to his house. And the child did minister unto the LORD before Eli the priest."
          reference="1 Samuel 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One sentence covers the family leaving and Samuel staying. The chapter does not linger on
            the goodbye. It moves straight to the men Samuel is now living among.
          </p>
        </div>
        <VerseQuote text="Now the sons of Eli were sons of Belial; they knew not the LORD." reference="1 Samuel 2:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Belial&quot; is a Hebrew word for worthlessness, and &quot;sons of Belial&quot; is
            an idiom the Old Testament uses elsewhere for thoroughly wicked men, not a proper name in
            this verse. Centuries later, Jewish and Christian writers started using Belial as a title
            for Satan himself, which is how it later appears in 2 Corinthians 6:15. Here it simply
            means Hophni and Phinehas were rotten through, serving as priests while not actually
            knowing the LORD they served.
          </p>
          <p>What that rot looked like in practice gets spelled out in detail.</p>
        </div>
        <VerseQuote
          text="And the priests' custom with the people was, that, when any man offered sacrifice, the priest's servant came, while the flesh was in seething, with a fleshhook of three teeth in his hand;"
          reference="1 Samuel 2:13"
        />
        <VerseQuote
          text="And he struck it into the pan, or kettle, or caldron, or pot; all that the fleshhook brought up the priest took for himself. So they did in Shiloh unto all the Israelites that came thither."
          reference="1 Samuel 2:14"
        />
        <VerseQuote
          text="Also before they burnt the fat, the priest's servant came, and said to the man that sacrificed, Give flesh to roast for the priest; for he will not have sodden flesh of thee, but raw."
          reference="1 Samuel 2:15"
        />
        <VerseQuote
          text="And if any man said unto him, Let them not fail to burn the fat presently, and then take as much as thy soul desireth; then he would answer him, Nay; but thou shalt give it me now: and if not, I will take it by force."
          reference="1 Samuel 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This was not greedy priests cutting corners on manners.</strong> The fat
            belonged to the LORD and was supposed to be burned on the altar first, before anyone ate
            anything. Hophni and Phinehas skipped that step, demanded the best raw meat before it was
            even cooked, and threatened force on any worshipper who objected. They were stealing from
            God and from the people bringing sacrifices to Him, at the same time.
          </p>
        </div>
        <VerseQuote text="Wherefore the sin of the young men was very great before the LORD: for men abhorred the offering of the LORD." reference="1 Samuel 2:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ordinary worshippers started hating the very act of bringing an offering,
            because of what the priesthood had turned it into.</strong> Corrupt leadership did not
            just damage Hophni and Phinehas. It poisoned how an entire nation experienced worship.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Linen Ephod, a Little Coat, and Three More Children (verses 18 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Against that backdrop, the chapter returns to the one person at Shiloh actually doing things right.</p>
        </div>
        <VerseQuote text="But Samuel ministered before the LORD, being a child, girded with a linen ephod." reference="1 Samuel 2:18" />
        <VerseQuote
          text="Moreover his mother made him a little coat, and brought it to him from year to year, when she came up with her husband to offer the yearly sacrifice."
          reference="1 Samuel 2:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A plain linen ephod was simple priestly clothing, nothing like the elaborate jeweled
            ephod the high priest wore. A child too young for full priestly duties is already dressed
            for service, right next to grown men abusing the very offerings he helps attend. Hannah&apos;s
            yearly visit with a homemade coat is the one steady, ordinary act of love running through
            this whole corrupt scene.
          </p>
          <p>Eli, for his part, does not forget the family he once misjudged.</p>
        </div>
        <VerseQuote
          text="And Eli blessed Elkanah and his wife, and said, The LORD give thee seed of this woman for the loan which is lent to the LORD. And they went unto their own home."
          reference="1 Samuel 2:20"
        />
        <VerseQuote
          text="And the LORD visited Hannah, so that she conceived, and bare three sons and two daughters. And the child Samuel grew before the LORD."
          reference="1 Samuel 2:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Hannah gave up her only child and ended up with five more.</strong> Nothing in
            the text suggests this was a trade she was owed, and nothing she does afterward treats it
            that way either. She does not reclaim Samuel now that she has other children. The
            chapter simply notes that the woman who once had none now has six, and moves on.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Eli&apos;s Warning That Changes Nothing (verses 22 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eli finally hears the full extent of what his sons have been doing, and it is worse than skimming meat.</p>
        </div>
        <VerseQuote
          text="Now Eli was very old, and heard all that his sons did unto all Israel; and how they lay with the women that assembled at the door of the tabernacle of the congregation."
          reference="1 Samuel 2:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Theft at the altar had already made ordinary Israelites hate bringing sacrifices.
            Sexual abuse connected to the tabernacle itself is a different order of evil, turning the
            one place meant for approaching God into a place people had reason to fear.
          </p>
          <p>Eli does speak up, finally, with real words of rebuke.</p>
        </div>
        <VerseQuote
          text="And he said unto them, Why do ye such things? for I hear of your evil dealings by all this people."
          reference="1 Samuel 2:23"
        />
        <VerseQuote
          text="Nay, my sons; for it is no good report that I hear: ye make the LORD's people to transgress."
          reference="1 Samuel 2:24"
        />
        <VerseQuote
          text="If one man sin against another, the judge shall judge him: but if a man sin against the LORD, who shall intreat for him? Notwithstanding they hearkened not unto the voice of their father, because the LORD would slay them."
          reference="1 Samuel 2:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Eli&apos;s words are not weak in content. &quot;Who shall intreat for him&quot; is a
            genuinely serious warning about the danger of sinning against God directly. What is
            missing is action. Eli is a priest with the authority to remove his own sons from service,
            and the text never records him doing it. A hard conversation replaces real discipline.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Man of God&apos;s Verdict on Eli&apos;s House (verses 26 to 36)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right next to that failed rebuke, the chapter sets Samuel&apos;s own growth as a deliberate contrast.</p>
        </div>
        <VerseQuote text="And the child Samuel grew on, and was in favour both with the LORD, and also with men." reference="1 Samuel 2:26" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Luke later describes the boy Jesus in almost the same terms, growing in favor with God
            and with people. Samuel is not Jesus, but the same pattern, a childhood marked by genuine
            growth before God rather than status or privilege, shows up again centuries later.
          </p>
          <p>Then an unnamed prophet arrives at Shiloh with a message Eli cannot talk his way around.</p>
        </div>
        <VerseQuote
          text="And there came a man of God unto Eli, and said unto him, Thus saith the LORD, Did I plainly appear unto the house of thy father, when they were in Egypt in Pharaoh's house?"
          reference="1 Samuel 2:27"
        />
        <VerseQuote
          text="And did I choose him out of all the tribes of Israel to be my priest, to offer upon mine altar, to burn incense, to wear an ephod before me? and did I give unto the house of thy father all the offerings made by fire of the children of Israel?"
          reference="1 Samuel 2:28"
        />
        <VerseQuote
          text="Wherefore kick ye at my sacrifice and at mine offering, which I have commanded in my habitation; and honourest thy sons above me, to make yourselves fat with the chiefest of all the offerings of Israel my people?"
          reference="1 Samuel 2:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The charge against Eli is not only that his sons sinned. It is that Eli valued
            them more than he valued God.</strong> &quot;Honourest thy sons above me&quot; names the
            real failure plainly: Eli saw what was happening and let it continue rather than lose his
            sons&apos; favor.
          </p>
          <p>The verdict that follows is specific and final.</p>
        </div>
        <VerseQuote
          text="Wherefore the LORD God of Israel saith, I said indeed that thy house, and the house of thy father, should walk before me for ever: but now the LORD saith, Be it far from me; for them that honour me I will honour, and they that despise me shall be lightly esteemed."
          reference="1 Samuel 2:30"
        />
        <VerseQuote
          text="Behold, the days come, that I will cut off thine arm, and the arm of thy father's house, that there shall not be an old man in thine house."
          reference="1 Samuel 2:31"
        />
        <VerseQuote
          text="And this shall be a sign unto thee, that shall come upon thy two sons, on Hophni and Phinehas; in one day they shall die both of them."
          reference="1 Samuel 2:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A standing privilege, the priesthood promised to Eli&apos;s family line, gets revoked
            inside this one prophecy. The sign given is unmistakable and dated: both sons dying on the
            same day. Nothing about this judgment is vague enough to explain away later.
          </p>
          <p>The chapter does not end on judgment alone.</p>
        </div>
        <VerseQuote
          text="And I will raise me up a faithful priest, that shall do according to that which is in mine heart and in my mind: and I will build him a sure house; and he shall walk before mine anointed for ever."
          reference="1 Samuel 2:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Most readers connect this promise to Zadok, the priest who later replaces one of Eli&apos;s
            descendants under Solomon. God removing a corrupt line does not mean He abandons the
            priesthood itself. He simply replaces the people who failed it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 2 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does Hannah talk about a king and an anointed one before Israel ever had
            one?</strong> What the text says: verse 10 ends the song by asking God to give strength to
            &quot;his king&quot; and exalt the horn of &quot;his anointed,&quot; with no king reigning
            anywhere in Israel at this point. How this is read: Hannah speaks about God&apos;s
            character the way a believer naturally speaks of it, trusting Him to defend whatever king
            He sets up, even before one exists. Her own son grows up to anoint Israel&apos;s first two
            kings, and centuries later her song&apos;s language and structure echo closely in{" "}
            <ArticleLink href="/blog/who-was-mary-mother-of-jesus">Mary&apos;s own prayer</ArticleLink>{" "}
            after learning she would bear Jesus.
          </p>
          <VerseQuote
            text="And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour."
            reference="Luke 1:46 and 47"
          />
          <p>
            <strong>Did God take away Eli&apos;s sons&apos; ability to choose, since verse 25 says they
            would not listen &quot;because the LORD would slay them&quot;?</strong> What the text says:
            the sentence states their refusal and God&apos;s coming judgment back to back, without
            explaining the mechanism connecting them. How this is read: Hophni and Phinehas had
            already been sinning deliberately for years before this verse, described in detail earlier
            in the chapter. The statement reads as God confirming that judgment was now settled because
            of sin already committed freely, closer to how Scripture describes{" "}
            <ArticleLink href="/blog/exodus-9-explained">Pharaoh&apos;s heart being hardened</ArticleLink>{" "}
            after he had already refused Moses repeatedly, not a claim that God forced the original
            sin in the first place.
          </p>
          <VerseQuote
            text="And the LORD hardened the heart of Pharaoh, and he hearkened not unto them; as the LORD had spoken unto Moses."
            reference="Exodus 9:12"
          />
          <p>
            <strong>What does &quot;sons of Belial&quot; mean, and is Belial a name for Satan
            here?</strong> What the text says: verse 12 uses &quot;sons of Belial&quot; as a
            description of Hophni and Phinehas, not as a title for any outside spiritual being. How
            this is read: Belial is a Hebrew word for worthlessness, used elsewhere in the Old
            Testament as a plain idiom for wicked men. Later Jewish and Christian writing, including 2
            Corinthians 6:15, uses Belial as a name associated with Satan, but 1 Samuel 2 itself is
            simply calling these two men worthless, not naming a demonic figure behind them.
          </p>
          <p>
            <strong>Who is the &quot;faithful priest&quot; God promises to raise up in verse
            35?</strong> What the text says: the verse promises a replacement priest who will do what
            is in God&apos;s heart and mind, with a lasting house, without naming him directly. How
            this is read: the standard reading ties this to Zadok, who later serves faithfully under
            David and Solomon after Eli&apos;s line is finally removed from the high priesthood. The
            text itself does not make that identification explicit, so it is the most natural
            fulfillment within the story rather than a certainty Scripture states outright.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 2:1</h3>
        <VerseQuote
          text="And Hannah prayed, and said, My heart rejoiceth in the LORD, mine horn is exalted in the LORD: my mouth is enlarged over mine enemies; because I rejoice in thy salvation."
          reference="1 Samuel 2:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A woman who once could only weep in front of a priest now opens a prayer that becomes one of
          the Bible&apos;s great songs of praise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 2:8</h3>
        <VerseQuote
          text="He raiseth up the poor out of the dust, and lifteth up the beggar from the dunghill, to set them among princes, and to make them inherit the throne of glory: for the pillars of the earth are the LORD's, and he hath set the world upon them."
          reference="1 Samuel 2:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the clearest single pictures in Scripture of how completely God can reverse a
          situation, offered as an ordinary fact about His character.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 2:17</h3>
        <VerseQuote text="Wherefore the sin of the young men was very great before the LORD: for men abhorred the offering of the LORD." reference="1 Samuel 2:17" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A warning that corrupt leadership rarely stays contained. It changed how an entire nation
          felt about worship itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 2:30</h3>
        <VerseQuote
          text="Wherefore the LORD God of Israel saith, I said indeed that thy house, and the house of thy father, should walk before me for ever: but now the LORD saith, Be it far from me; for them that honour me I will honour, and they that despise me shall be lightly esteemed."
          reference="1 Samuel 2:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Even a standing promise from God is not a guarantee His people can coast on. Honor and
          contempt both get answered in kind.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in 1 Samuel 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hannah prayed a song of praise after leaving Samuel at Shiloh, celebrating how God reverses
          situations. The chapter then describes the corruption of Eli&apos;s sons Hophni and
          Phinehas, who stole from sacrifices and abused their position, contrasted with Samuel&apos;s
          quiet growth in service. It closes with a prophet announcing that Eli&apos;s sons will both
          die and his family&apos;s priesthood will end.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Hannah&apos;s prayer in 1 Samuel 2 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is Hannah moving from thanking God for her own son to describing a pattern she sees in how
          God works everywhere: lifting up the weak, humbling the proud, and reversing situations that
          look permanent. It is widely read as the model behind Mary&apos;s own prayer of praise in
          Luke 1.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Hannah mention a king before Israel had one?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel had no king at the time, having just come out of the leaderless period described at
          the end of Judges. Hannah speaks about God defending &quot;his king&quot; and &quot;his
          anointed&quot; as part of trusting His character in general, and her own son later anoints
          Israel&apos;s first two kings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;sons of Belial&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Belial means worthlessness in Hebrew, and &quot;sons of Belial&quot; was a common Old
          Testament idiom for thoroughly wicked men. It is not used as a name for Satan in this verse,
          though later Jewish and Christian writing eventually used Belial that way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Eli&apos;s sons do wrong?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hophni and Phinehas took the best parts of sacrifices for themselves before the fat was
          burned for the LORD, threatened force on worshippers who objected, and were involved in
          serious sexual sin connected to the tabernacle. Their behavior made ordinary Israelites
          start to hate bringing offerings at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Eli stop his sons?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eli rebuked them verbally once he heard the full extent of what they had done, but the text
          never records him removing them from service or taking any real disciplinary action. The man
          of God&apos;s prophecy later names the actual problem: Eli honored his sons above honoring
          God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does 1 Samuel 2:25 mean God removed Eli&apos;s sons&apos; free will?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse connects their refusal to listen with God&apos;s coming judgment, but it comes
          after years of their own deliberate sin already described earlier in the chapter. It reads
          as confirming that judgment was settled because of sin they had already freely chosen, not
          as God forcing the original wrongdoing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who is the faithful priest promised in 1 Samuel 2:35?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse does not name him directly. Most readers connect the promise to Zadok, who later
          serves faithfully under David and Solomon once Eli&apos;s descendants are finally removed
          from the high priesthood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Hannah&apos;s prayer connect to Mary&apos;s Magnificat?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both songs praise God for reversing a lowly situation and for lifting up someone the world
          had overlooked. Mary&apos;s prayer in Luke 1 closely echoes the structure and themes of
          Hannah&apos;s song here, spoken centuries apart by two women God chose for history changing
          sons.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 1 Samuel 2 set up 1 Samuel 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter ends with Eli&apos;s house under judgment and a general prophet delivering the
          message. The next chapter shows God speaking directly to young Samuel for the first time,
          placing him, not Eli&apos;s sons, as the one who will carry God&apos;s word forward from
          Shiloh.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 2 puts the best and worst of worship in the same building, in the same chapter.</p>
          <p>
            📌 <strong>Hannah turned her own answered prayer into praise about who God is, not just
            what He did for her.</strong> Her song reaches past her own story into how God treats
            anyone the world has written off.
          </p>
          <p>
            📌 <strong>A title does not make someone faithful.</strong> Hophni and Phinehas wore the
            priesthood every day and still knew nothing real about the LORD they claimed to serve.
          </p>
          <p>
            Eli&apos;s weak rebuke is worth sitting with longer than it feels comfortable to. Naming a
            problem out loud is not the same as actually dealing with it.
          </p>
          <p>
            Ask yourself this week whether there is a Hophni and Phinehas situation you have been
            talking about instead of actually confronting, and take one real step on it today, not
            another conversation about it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
