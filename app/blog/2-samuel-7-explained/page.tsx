import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-7-explained", {
  title: "2 Samuel 7 Explained: God's Covenant Promise to David",
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

export default function TwoSamuelSevenExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-7-explained"
      title={<>📖 2 Samuel 7 Explained: God&apos;s Covenant Promise to David</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>David wants to build God a house. God answers with a promise so much bigger that it reaches all the way to Jesus.</p>
            <p>
              <strong>2 Samuel 7 explained</strong> is the chapter where David, finally settled in his own
              cedar palace, offers to build the LORD a permanent temple to replace the tent the ark has
              traveled in for generations. That night God sends Nathan the prophet back with an answer
              nobody expected. David will not build God a house. God will build David one, a dynasty, a
              throne, and a promise that outlasts every king who ever sits on it.
            </p>
            <p>Maybe you have offered God something good, and found out His plan for you was even bigger than your offer.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God say no to a temple David only wanted to honor Him with?</li>
            <li>❓ What does it mean that God will build David a house?</li>
            <li>❓ Is the promise in this chapter conditional, or forever no matter what?</li>
            <li>❓ How does a promise to one king four thousand years ago reach you?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter is the hinge the rest of the Bible&apos;s story about a coming king
              swings on.</strong> Every later promise of a Messiah who reigns forever points back to one
              night, one prophet, and one word from God to a shepherd turned king.
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: David&apos;s plan, God&apos;s
              correction, the reversal at the heart of the promise, and the prayer David prays once he
              understands what he has actually just been given.
            </p>
            <p>Read slowly. Few chapters in the Old Testament carry this much weight in this few verses.</p>
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
            <ArticleLink href="/blog/2-samuel-6-explained">2 Samuel 6</ArticleLink> ended with the ark of
            the covenant finally resting in Jerusalem, carried the right way after the costly mistake that
            killed Uzzah, celebrated with dancing, sacrifices, and a feast for the whole nation. David had
            pitched a tabernacle, a tent, to house it there. The ark had a home in David&apos;s capital. It
            still did not have a permanent building.
          </p>
          <p>
            David himself was already living somewhere far sturdier.{" "}
            <ArticleLink href="/blog/2-samuel-5-explained">2 Samuel 5</ArticleLink> recorded Hiram king of
            Tyre sending cedar, carpenters, and masons to build David a house once he took Jerusalem. The
            king had cedar walls. The LORD had curtains. 2 Samuel 7 explained opens with David noticing
            that gap and deciding to close it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 7 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. David&apos;s Plan to Build God a House (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens in a rare moment of quiet for a king who has spent most of his story at war.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when the king sat in his house, and the LORD had given him rest round about from all his enemies;"
          reference="2 Samuel 7:1"
        />
        <VerseQuote
          text="That the king said unto Nathan the prophet, See now, I dwell in an house of cedar, but the ark of God dwelleth within curtains."
          reference="2 Samuel 7:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Rest is what makes this chapter possible. David has no war to fight for the first time in
            years, and the first thing he notices once the fighting stops is an imbalance that bothers
            him: his own house is cedar, God&apos;s house is fabric. This is Nathan the prophet&apos;s
            first appearance in David&apos;s story, and he will go on to play a far larger role later,
            confronting David directly after the sin with Bathsheba.
          </p>
          <p>Nathan&apos;s first response sounds like full approval.</p>
        </div>
        <VerseQuote
          text="And Nathan said to the king, Go, do all that is in thine heart; for the LORD is with thee."
          reference="2 Samuel 7:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nathan speaks here on his own judgment, not yet on a word from the LORD.</strong>{" "}
            The plan sounds right. The king wants to honor God. The prophet sees nothing wrong with it.
            That night proves a good-sounding plan still needs to be checked against what God actually
            said, not just what seems obviously generous.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. God&apos;s Answer Through Nathan: Not a House of Cedar (verses 4 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the night is over, Nathan has to go back with a different answer.</p>
        </div>
        <VerseQuote
          text="And it came to pass that night, that the word of the LORD came unto Nathan, saying,"
          reference="2 Samuel 7:4"
        />
        <VerseQuote
          text="Go and tell my servant David, Thus saith the LORD, Shalt thou build me an house for me to dwell in?"
          reference="2 Samuel 7:5"
        />
        <VerseQuote
          text="Whereas I have not dwelt in any house since the time that I brought up the children of Israel out of Egypt, even to this day, but have walked in a tent and in a tabernacle."
          reference="2 Samuel 7:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ God&apos;s question is not an accusation. It is a correction of timing. From the exodus
            onward, God had chosen to move with His people in a tent, the same tabernacle{" "}
            <ArticleLink href="/blog/exodus-25-explained">built to the exact pattern given at Sinai</ArticleLink>.
            That was never a sign of neglect. It was God choosing to travel light with a people who were
            still on the move.
          </p>
        </div>
        <VerseQuote
          text="In all the places wherein I have walked with all the children of Israel spake I a word with any of the tribes of Israel, whom I commanded to feed my people Israel, saying, Why build ye not me an house of cedar?"
          reference="2 Samuel 7:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God has never once asked for this, in all the centuries since Egypt.</strong> David
            is not being told his instinct was wrong to have. He is being told the timing and the person
            are not his to decide. The next verses explain why.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. What God Already Did for David (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before announcing anything new, God reminds David exactly where he started.</p>
        </div>
        <VerseQuote
          text="Now therefore so shalt thou say unto my servant David, Thus saith the LORD of hosts, I took thee from the sheepcote, from following the sheep, to be ruler over my people, over Israel:"
          reference="2 Samuel 7:8"
        />
        <VerseQuote
          text="And I was with thee whithersoever thou wentest, and have cut off all thine enemies out of thy sight, and have made thee a great name, like unto the name of the great men that are in the earth."
          reference="2 Samuel 7:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Every verb in these two verses belongs to God, not David. &quot;I took thee.&quot; &quot;I
            was with thee.&quot; &quot;I have cut off.&quot; &quot;I have made.&quot; David did not build
            his own greatness and then decide to repay God with a temple.{" "}
            <ArticleLink href="/blog/1-samuel-16-explained">The shepherd boy Samuel anointed years
            earlier</ArticleLink> became a king entirely by what God did to him and around him, not by
            what he earned.
          </p>
        </div>
        <VerseQuote
          text="Moreover I will appoint a place for my people Israel, and will plant them, that they may dwell in a place of their own, and move no more; neither shall the children of wickedness afflict them any more, as beforetime,"
          reference="2 Samuel 7:10"
        />
        <VerseQuote
          text="And as since the time that I commanded judges to be over my people Israel, and have caused thee to rest from all thine enemies. Also the LORD telleth thee that he will make thee an house."
          reference="2 Samuel 7:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The last line of verse 11 is the turn the entire chapter has been building toward.</strong>{" "}
            David offered to make God a house. God answers that He will make David one instead. From here
            the word &quot;house&quot; stops meaning a building and starts meaning something far larger: a
            family, a dynasty, a line of descendants that will not end.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Reversal: God Will Build David a House (verses 12 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God spells out exactly what that house will look like, starting with the son who comes after David.</p>
        </div>
        <VerseQuote
          text="And when thy days be fulfilled, and thou shalt sleep with thy fathers, I will set up thy seed after thee, which shall proceed out of thy bowels, and I will establish his kingdom."
          reference="2 Samuel 7:12"
        />
        <VerseQuote
          text="He shall build an house for my name, and I will stablish the throne of his kingdom for ever."
          reference="2 Samuel 7:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The temple David wanted to build is not cancelled. It is reassigned. &quot;He shall build an
            house for my name&quot; points straight ahead to Solomon, the son not yet born who will raise
            the temple David only dreamed of. But the second half of the verse, &quot;for ever,&quot;
            already reaches further than one building or one son ever could.
          </p>
        </div>
        <VerseQuote
          text="I will be his father, and he shall be my son. If he commit iniquity, I will chasten him with the rod of men, and with the stripes of the children of men:"
          reference="2 Samuel 7:14"
        />
        <VerseQuote
          text="But my mercy shall not depart away from him, as I took it from Saul, whom I put away before thee."
          reference="2 Samuel 7:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Verse 14 holds both halves of this promise together on purpose.</strong> A father
            and son relationship with God does not mean a free pass from consequences. Solomon&apos;s own
            failures later in his reign will bring real discipline. What verse 15 promises is something
            Saul never had: whatever correction comes, the mercy underneath it stays. Saul lost the
            kingdom entirely. David&apos;s line will not.
          </p>
        </div>
        <VerseQuote
          text="And thine house and thy kingdom shall be established for ever before thee: thy throne shall be established for ever."
          reference="2 Samuel 7:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;For ever&quot; appears three times across verses 13 and 16 alone.</strong> No
            human dynasty actually lasts forever, and David&apos;s own royal line did stop sitting on an
            earthly throne after the Babylonian exile centuries later. The weight of that repeated word is
            exactly why later Scripture reads this promise as reaching past any one son of David, toward a
            king who actually never stops reigning.
          </p>
          <p>Nathan delivers every word of it exactly as it was given.</p>
        </div>
        <VerseQuote
          text="According to all these words, and according to all this vision, so did Nathan speak unto David."
          reference="2 Samuel 7:17"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. David&apos;s Prayer: &quot;Who Am I?&quot; (verses 18 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David&apos;s response to being handed an everlasting dynasty is not a victory speech. It is a prayer of disbelief.</p>
        </div>
        <VerseQuote
          text="Then went king David in, and sat before the LORD, and he said, Who am I, O Lord GOD? and what is my house, that thou hast brought me hitherto?"
          reference="2 Samuel 7:18"
        />
        <VerseQuote
          text="And this was yet a small thing in thy sight, O Lord GOD; but thou hast spoken also of thy servant's house for a great while to come. And is this the manner of man, O Lord GOD?"
          reference="2 Samuel 7:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 David calls everything that already happened to him, rescue from the sheepfold, victory over
            every enemy, the throne itself, &quot;a small thing&quot; next to this new promise about his
            future house. His question, &quot;is this the manner of man,&quot; is David recognizing out
            loud that no human king makes promises like this one. Only God does.
          </p>
        </div>
        <VerseQuote
          text="And what can David say more unto thee? for thou, Lord GOD, knowest thy servant."
          reference="2 Samuel 7:20"
        />
        <VerseQuote
          text="For thy word's sake, and according to thine own heart, hast thou done all these great things, to make thy servant know them."
          reference="2 Samuel 7:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David credits none of this to himself, twice in two verses.</strong> &quot;For thy
            word&apos;s sake&quot; and &quot;according to thine own heart&quot; both place the entire
            reason for the promise inside God&apos;s own character, not inside anything David did to
            deserve it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. David&apos;s Prayer Continues: Praise and a Request to Keep the Promise (verses 22 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From personal amazement, David&apos;s prayer widens out to the whole nation God has built around this promise.</p>
        </div>
        <VerseQuote
          text="Wherefore thou art great, O LORD God: for there is none like thee, neither is there any God beside thee, according to all that we have heard with our ears."
          reference="2 Samuel 7:22"
        />
        <VerseQuote
          text="And what one nation in the earth is like thy people, even like Israel, whom God went to redeem for a people to himself, and to make him a name, and to do for you great things and terrible, for thy land, before thy people, which thou redeemedst to thee from Egypt, from the nations and their gods?"
          reference="2 Samuel 7:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 David&apos;s prayer never stays narrowly about himself for long. The promise about his own
            house becomes a reason to praise God for the far older promise to Israel as a whole, redeemed
            out of Egypt long before David was born.
          </p>
        </div>
        <VerseQuote
          text="For thou hast confirmed to thyself thy people Israel to be a people unto thee for ever: and thou, LORD, art become their God."
          reference="2 Samuel 7:24"
        />
        <VerseQuote
          text="And now, O LORD God, the word that thou hast spoken concerning thy servant, and concerning his house, establish it for ever, and do as thou hast said."
          reference="2 Samuel 7:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Do as thou hast said&quot; is not David doubting the promise.</strong> It is
            the normal shape of biblical prayer: taking God&apos;s own word and asking Him to be exactly
            who He already said He would be. Asking God to keep His promise is not weak faith. It is what
            faith in a promise actually looks like out loud.
          </p>
        </div>
        <VerseQuote
          text="And let thy name be magnified for ever, saying, The LORD of hosts is the God over Israel: and let the house of thy servant David be established before thee."
          reference="2 Samuel 7:26"
        />
        <VerseQuote
          text="For thou, O LORD of hosts, God of Israel, hast revealed to thy servant, saying, I will build thee an house: therefore hath thy servant found in his heart to pray this prayer unto thee."
          reference="2 Samuel 7:27"
        />
        <VerseQuote
          text="And now, O Lord GOD, thou art that God, and thy words be true, and thou hast promised this goodness unto thy servant:"
          reference="2 Samuel 7:28"
        />
        <VerseQuote
          text="Therefore now let it please thee to bless the house of thy servant, that it may continue for ever before thee: for thou, O Lord GOD, hast spoken it: and with thy blessing let the house of thy servant be blessed for ever."
          reference="2 Samuel 7:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The chapter that opened with David wanting to build God something closes with David asking
            God to build and bless what He already promised to build. The direction of the whole chapter
            runs one way: from a king&apos;s generous plan, to a correction, to a promise that completely
            outgrows the plan it replaced.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 7 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did David do something wrong by offering to build God a temple?</strong> What the text
            says: nothing in this chapter calls David&apos;s desire sinful. Nathan himself approved it
            first, and God&apos;s answer corrects the timing and the builder, not David&apos;s motive. How
            this is read: most readers take verses 4 through 7 as God redirecting a good impulse rather
            than rebuking a bad one. Later Scripture adds a separate reason David personally could not be
            the one to build it, tied to the wars of his reign, but that detail belongs to other passages,
            not to this chapter&apos;s own wording.
          </p>
          <p>
            <strong>Is the promise in verses 12 to 16 unconditional, or does verse 14&apos;s warning about
            discipline make it conditional?</strong> What the text says: verse 14 promises real
            consequences for iniquity in the same breath that verse 15 promises mercy will not depart the
            way it did from Saul. How this is read: most readers hold both together rather than picking
            one. The dynasty itself and God&apos;s commitment to it are not up for cancellation the way
            Saul&apos;s kingship was, but that does not exempt any individual son of David, including
            Solomon, from facing real consequences for real sin.
          </p>
          <p>
            <strong>How can a kingdom be established &quot;for ever&quot; when David&apos;s royal line
            stopped ruling an earthly throne after the Babylonian exile?</strong> What the text says: verse
            13 and verse 16 both use the phrase without limiting it to Solomon&apos;s lifetime or even to
            the nation&apos;s political survival. How this is read: Christians read the earthly interruption
            of David&apos;s dynasty as proof the promise was never only about an unbroken line of political
            kings in Jerusalem. Luke&apos;s Gospel applies the same language directly to Jesus centuries
            later.
          </p>
          <VerseQuote
            text="He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end."
            reference="Luke 1:32 and 33"
          />
          <p>
            <strong>Does the New Testament apply verse 14&apos;s father and son language to Jesus
            directly?</strong> What the text says: 2 Samuel 7:14 originally names Solomon as the son who
            will be God&apos;s son with real discipline attached. How this is read: Hebrews quotes almost
            the same father and son wording and applies it to Christ, without the discipline clause that
            applied to Solomon&apos;s own sin.
          </p>
          <VerseQuote
            text="For unto which of the angels said he at any time, Thou art my Son, this day have I begotten thee? And again, I will be to him a Father, and he shall be to me a Son?"
            reference="Hebrews 1:5"
          />
          <p>
            Most readers take this as the same pattern seen elsewhere in Scripture: a promise with a real,
            immediate fulfillment in Solomon, and a fuller, final fulfillment in Christ that the first one
            only pointed toward.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 7:16</h3>
        <VerseQuote
          text="And thine house and thy kingdom shall be established for ever before thee: thy throne shall be established for ever."
          reference="2 Samuel 7:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The heart of the Davidic covenant in one sentence, and the verse every later promise of a king
          who reigns without end eventually traces back to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 7:18</h3>
        <VerseQuote
          text="Then went king David in, and sat before the LORD, and he said, Who am I, O Lord GOD? and what is my house, that thou hast brought me hitherto?"
          reference="2 Samuel 7:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king who has just been promised an everlasting dynasty, responding not with pride but with
          genuine disbelief that he was ever chosen for any of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 7:22</h3>
        <VerseQuote
          text="Wherefore thou art great, O LORD God: for there is none like thee, neither is there any God beside thee, according to all that we have heard with our ears."
          reference="2 Samuel 7:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          David&apos;s prayer turning from his own house to God&apos;s own character, the actual reason any
          of this promise is trustworthy in the first place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 7:25</h3>
        <VerseQuote
          text="And now, O LORD God, the word that thou hast spoken concerning thy servant, and concerning his house, establish it for ever, and do as thou hast said."
          reference="2 Samuel 7:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A model for praying God&apos;s own promises back to Him, asking Him to be exactly who He already
          said He would be.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Chronicles 17:13</h3>
        <VerseQuote
          text="I will be his father, and he shall be my son: and I will not take my mercy away from him, as I took it from him that was before thee:"
          reference="1 Chronicles 17:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The parallel account of the same promise, recorded decades later, carrying the identical father
          and son language and the same contrast with the king David replaced.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David tells Nathan the prophet he wants to build God a permanent temple. That night God tells
          Nathan to stop David, not because the idea is wrong, but because God has a bigger plan: instead
          of David building God a house, God will build David a house, a lasting dynasty whose throne is
          established forever. David responds with a long prayer of humility and praise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Davidic Covenant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the promise God makes to David in verses 12 through 16: that David&apos;s descendant will
          build God&apos;s house, that God will be a father to that son, and that David&apos;s throne and
          kingdom will be established forever. Christians read this covenant as finding its first
          fulfillment in Solomon and its final fulfillment in Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t God let David build the temple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter states that God had never asked for a permanent house since Israel left Egypt, and
          redirects the plan toward David&apos;s future son instead. The text itself gives a timing reason,
          not a condemnation of David&apos;s intention.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who actually built the temple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 13 names the builder only as David&apos;s seed who will come after him. Later in Scripture,
          that son is revealed to be Solomon, the same son born in Jerusalem named at the end of{" "}
          <ArticleLink href="/blog/2-samuel-5-explained">2 Samuel 5</ArticleLink>.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;I will be his father, and he shall be my son&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In verse 14, it first describes God&apos;s relationship with Solomon, including real correction
          for real sin. The New Testament later applies the same words to Jesus in Hebrews 1:5, without
          the warning of discipline that applied to Solomon&apos;s own failures.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Davidic Covenant unconditional?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The covenant itself, God&apos;s commitment to David&apos;s house, is treated as unbreakable in
          verse 15, unlike the kingdom God took away from Saul. Individual descendants of David still face
          real consequences for sin, as verse 14 states plainly, so the dynasty&apos;s security and any one
          king&apos;s personal accountability are both true at once.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 7 point to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The promise of a throne &quot;established for ever,&quot; repeated three times in verses 13 and
          16, outlasts the actual political history of David&apos;s earthly dynasty. Luke 1:32 and 33
          applies that exact promise to Jesus directly, naming Him the one who receives David&apos;s throne
          and reigns with a kingdom that never ends.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does David pray such a long prayer instead of just saying thank you?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 18 through 29 show David working through genuine disbelief that this promise was given to
          him at all, then widening into praise of God&apos;s uniqueness and a direct request that God keep
          His word. The length reflects how far the promise exceeded anything David had asked for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between 2 Samuel 7 and 1 Chronicles 17?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both chapters record the same night and the same promise in very similar wording. One small
          difference stands out: 2 Samuel 7:15 names Saul directly as the king whose mercy was taken away,
          while 1 Chronicles 17:13 refers to him only as &quot;him that was before thee,&quot; without
          naming him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God remind David he was once a shepherd?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 8 and 9 recap David&apos;s entire rise, from the sheepcote to the throne, using God as the
          subject of every verb. The reminder keeps the promise that follows from being mistaken for
          something David earned rather than something God freely gave.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 7 turns one king&apos;s generous offer into one of the largest promises in the entire Bible.</p>
          <p>
            📌 <strong>God does not always say yes to a good idea, even a generous one aimed entirely at
            honoring Him.</strong> David wanted to build God a house. God had something far larger in mind
            for David instead.
          </p>
          <p>
            📌 <strong>A promise can hold both permanent commitment and real consequences at the same
            time.</strong> God&apos;s mercy toward David&apos;s house will not depart the way it did from
            Saul, and that same house still faces discipline for its own failures.
          </p>
          <p>
            📌 <strong>The right response to a promise this big is not pride. It is David&apos;s own
            question: &quot;Who am I?&quot;</strong> Every verb describing David&apos;s rise belonged to
            God first.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Take whatever promise of God you have been quietly doubting, and pray it back to Him the way
            David did, asking Him to do exactly as He has said.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
