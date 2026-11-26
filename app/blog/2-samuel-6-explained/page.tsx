import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-6-explained", {
  title: "2 Samuel 6 Explained: Uzzah's Death and the Ark in Jerusalem",
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

export default function TwoSamuelSixExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-6-explained"
      title={<>📖 2 Samuel 6 Explained: Uzzah&apos;s Death and the Ark in Jerusalem</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>David has a throne and a capital. The one thing missing from Jerusalem is God&apos;s own presence.</p>
            <p>
              <strong>2 Samuel 6 explained</strong> is the chapter where David goes to fix that, and the trip almost
              ends in disaster before it ends in celebration. A man named Uzzah reaches out to steady a box he was
              never supposed to touch, and dies on the spot. David panics, parks the ark in a stranger&apos;s house
              for three months, then finally brings it home with dancing, sacrifices, and a wife watching from a
              window who hates every second of it.
            </p>
            <p>Maybe you have started something the right motive and the wrong method, and watched it fall apart.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God kill Uzzah for touching the very thing David sent him to move?</li>
            <li>❓ Why does a three month delay fix what the first attempt got wrong?</li>
            <li>❓ Why does David dance in public, and what did Michal actually see?</li>
            <li>❓ Why does this chapter end with a queen who never has a child?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>David gets the destination right and the method wrong the first time, and this chapter is
              the record of what that cost, and what he changed because of it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the journey to fetch the ark, the cart that
              should never have carried it, the death that stops the procession cold, the three months of waiting,
              the second attempt done the right way, and the argument inside David&apos;s own house once the
              celebration is over.
            </p>
            <p>Read slowly. This chapter is as much about how you approach God as it is about what happens when you do not.</p>
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
            <ArticleLink href="/blog/2-samuel-5-explained">2 Samuel 5</ArticleLink> ended with David crowned over all
            Israel, a captured capital in Jerusalem, a house built for him by a foreign king&apos;s carpenters, and
            two wars won after he asked God for a plan both times. Everything a king could want was finally in
            place. One thing was still missing from the city David had just made his own.
          </p>
          <p>
            The ark of the covenant, the gold covered chest that held the stone tablets of the law and represented
            God&apos;s own presence among His people, was not in Jerusalem. It had not even been with the nation&apos;s
            worship for most of a lifetime. It was sitting quietly in a private home, where it had been resting since
            long before David was ever a shepherd boy. 2 Samuel 6 explained opens with David finally going to get it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Thirty Thousand Men and a Journey to Fetch the Ark (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the size of the trip, before it says anything about what the trip was actually for.</p>
        </div>
        <VerseQuote
          text="Again, David gathered together all the chosen men of Israel, thirty thousand."
          reference="2 Samuel 6:1"
        />
        <VerseQuote
          text="And David arose, and went with all the people that were with him from Baale of Judah, to bring up from thence the ark of God, whose name is called by the name of the LORD of hosts that dwelleth between the cherubims."
          reference="2 Samuel 6:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Thirty thousand men is not a work crew for lifting one box. This is closer to a national procession,
            the whole might of the new kingdom turned toward a single purpose. David is not sneaking the ark into
            the city quietly. He is making its arrival as public as the throne he just received.
          </p>
          <p>
            📌 <strong>The verse names exactly what the ark was: the place where the LORD of hosts dwelt between the
            cherubims.</strong> This was never ordinary cargo. It was the closest thing on earth to God&apos;s own
            address, built to the exact instructions{" "}
            <ArticleLink href="/blog/exodus-25-explained">Moses received at Sinai</ArticleLink>, down to the two
            golden figures facing each other over the mercy seat.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A New Cart and a House That Had Held the Ark for Decades (verses 3 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The procession arrives at the house where the ark has been waiting.</p>
        </div>
        <VerseQuote
          text="And they set the ark of God upon a new cart, and brought it out of the house of Abinadab that was in Gibeah: and Uzzah and Ahio, the sons of Abinadab, drave the new cart."
          reference="2 Samuel 6:3"
        />
        <VerseQuote
          text="And they brought it out of the house of Abinadab which was at Gibeah, accompanying the ark of God: and Ahio went before the ark."
          reference="2 Samuel 6:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same house{" "}
            <ArticleLink href="/blog/1-samuel-7-explained">1 Samuel 7 already named</ArticleLink>, the house of
            Abinadab, where the men of Kirjathjearim brought the ark after the Philistines sent it home and where it
            had rested ever since. &quot;Gibeah&quot; here is simply the Hebrew word for a hill, the same hill 1
            Samuel 7 calls Abinadab&apos;s house. By the time David arrives, the ark has sat in that one family&apos;s
            keeping for far longer than most of the men marching with David have been alive.
          </p>
          <p>
            ⚠️ <strong>A new cart sounds respectful, but it was the wrong tool entirely.</strong> It is the exact
            method{" "}
            <ArticleLink href="/blog/1-samuel-6-explained">the Philistines once used to send the ark back</ArticleLink>{" "}
            after it brought them nothing but disaster, two cows and a wooden cart pulling a holy object down a
            dirt road. The law given at Sinai never once allowed that. It commanded something far more careful.
          </p>
        </div>
        <VerseQuote
          text="And when Aaron and his sons have made an end of covering the sanctuary, and all the vessels of the sanctuary, as the camp is to set forward; after that, the sons of Kohath shall come to bear it: but they shall not touch any holy thing, lest they die."
          reference="Numbers 4:15"
        />
        <VerseQuote
          text="But unto the sons of Kohath he gave none: because the service of the sanctuary belonging unto them was that they should bear upon their shoulders."
          reference="Numbers 7:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The ark was never meant to ride on a cart, and it was never meant to be touched directly.</strong>{" "}
            It had carrying poles built into its own frame for exactly that reason, poles meant to rest on the
            shoulders of a specific family of Levites, the Kohathites, who were warned by name not to touch the holy
            things themselves. David&apos;s plan broke both rules at once, and nobody in thirty thousand men seems to
            have stopped to check.
          </p>
        </div>
        <VerseQuote
          text="And David and all the house of Israel played before the LORD on all manner of instruments made of fir wood, even on harps, and on psalteries, and on timbrels, and on cornets, and on cymbals."
          reference="2 Samuel 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Nothing about the mood here is careless or disrespectful. The music, the crowd, the two brothers
            walking alongside their father&apos;s cart, all of it reads as genuine joy. Good intentions do not change
            what the law actually required.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Uzzah&apos;s Death at the Threshingfloor (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The celebration stops in the space of a single verse.</p>
        </div>
        <VerseQuote
          text="And when they came to Nachon's threshingfloor, Uzzah put forth his hand to the ark of God, and took hold of it; for the oxen shook it."
          reference="2 Samuel 6:6"
        />
        <VerseQuote
          text="And the anger of the LORD was kindled against Uzzah; and God smote him there for his error; and there he died by the ark of God."
          reference="2 Samuel 6:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Uzzah&apos;s instinct looks like the right one.</strong> The cart lurches, the ark tips, and
            a man reaches out to keep it from falling. On a cart, that moment was never going to stay avoidable
            forever. The text calls what killed him &quot;his error,&quot; not cruelty on a whim. The real error had
            already happened back at the house, when a cart was chosen for a job that belonged to the Kohathites&apos;
            shoulders.
          </p>
          <p>
            📌 <strong>Growing up with the ark in his own front yard may be exactly what made Uzzah too comfortable
            with it.</strong> Years of familiarity can wear down the sense that something is still as holy as it
            ever was. The ark had not changed. Uzzah&apos;s sense of what it was safe to do to it had.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. David Afraid, and the Ark Left at Obededom&apos;s House (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David&apos;s reaction is not quiet grief. It is something closer to shock.</p>
        </div>
        <VerseQuote
          text="And David was displeased, because the LORD had made a breach upon Uzzah: and he called the name of the place Perezuzzah to this day."
          reference="2 Samuel 6:8"
        />
        <VerseQuote
          text="And David was afraid of the LORD that day, and said, How shall the ark of the LORD come to me?"
          reference="2 Samuel 6:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Perezuzzah means something close to &quot;the breach of Uzzah.&quot; David names the spot the same way
            he will later name a battlefield in the next chapter, marking what happened there permanently in the
            land itself. His own question, &quot;how shall the ark of the LORD come to me,&quot; is the sound of a
            king realizing he does not actually know how to do this, even though he had just organized thirty
            thousand men to try.
          </p>
        </div>
        <VerseQuote
          text="So David would not remove the ark of the LORD unto him into the city of David: but David carried it aside into the house of Obededom the Gittite."
          reference="2 Samuel 6:10"
        />
        <VerseQuote
          text="And the ark of the LORD continued in the house of Obededom the Gittite three months: and the LORD blessed Obededom, and all his household."
          reference="2 Samuel 6:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ A Gittite was a man from Gath, Philistine territory, serving in or near David&apos;s own household.
            Whether Obededom was an Israelite living among Philistines or a Philistine convert living among Israel,
            the text does not fully settle. What it does settle is the result. The ark that killed a man one mile
            earlier becomes the reason an entire household is blessed three months later.
          </p>
          <p>
            📌 <strong>The ark was never the danger. Handling it carelessly was.</strong> Obededom did not fix
            anything about how the ark was carried. He simply received it, kept it, and the same presence that
            struck Uzzah down brought nothing but blessing to the next house it rested in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Three Months Later, the Ark Comes Up the Right Way, and Michal Watches From a Window (verses 12 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>News of Obededom&apos;s blessing is what finally moves David to try again.</p>
        </div>
        <VerseQuote
          text="And it was told king David, saying, The LORD hath blessed the house of Obededom, and all that pertaineth unto him, because of the ark of God. So David went and brought up the ark of God from the house of Obededom into the city of David with gladness."
          reference="2 Samuel 6:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This chapter never actually says what changed about the method. A parallel account of this same day
            tells David&apos;s side of it in his own words, spoken to the priests and Levites before they moved the
            ark a second time.
          </p>
        </div>
        <VerseQuote
          text="Then David said, None ought to carry the ark of God but the Levites: for them hath the LORD chosen to carry the ark of God, and to minister unto him for ever."
          reference="1 Chronicles 15:2"
        />
        <VerseQuote
          text="For because ye did it not at the first, the LORD our God made a breach upon us, for that we sought him not after the due order."
          reference="1 Chronicles 15:13"
        />
        <VerseQuote
          text="And the children of the Levites bare the ark of God upon their shoulders with the staves thereon, as Moses commanded according to the word of the LORD."
          reference="1 Chronicles 15:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David names his own mistake out loud before he fixes it.</strong> &quot;We sought him not
            after the due order&quot; is about as plain an admission as Scripture records. The second trip has no
            cart anywhere in it. The Levites carry the ark on their own shoulders, on the poles built for exactly
            this, the way the law had said all along.
          </p>
        </div>
        <VerseQuote
          text="And it was so, that when they that bare the ark of the LORD had gone six paces, he sacrificed oxen and fatlings."
          reference="2 Samuel 6:13"
        />
        <VerseQuote
          text="And David danced before the LORD with all his might; and David was girded with a linen ephod."
          reference="2 Samuel 6:14"
        />
        <VerseQuote
          text="So David and all the house of Israel brought up the ark of the LORD with shouting, and with the sound of the trumpet."
          reference="2 Samuel 6:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Stopping after six paces to sacrifice again is not a sign of nerves this time. It reads as relief
            turned into worship, a king thanking God for every safe step instead of assuming the ark would simply
            cooperate. The dancing is not staged ceremony either. &quot;With all his might&quot; describes genuine,
            physical, undignified celebration from the man now wearing the crown of the whole nation.
          </p>
        </div>
        <VerseQuote
          text="And as the ark of the LORD came into the city of David, Michal Saul's daughter looked through a window, and saw king David leaping and dancing before the LORD; and she despised him in her heart."
          reference="2 Samuel 6:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice how the verse names her.</strong> Not David&apos;s wife. &quot;Michal Saul&apos;s
            daughter,&quot; watching from inside a window instead of walking in the street with everyone else. The
            distance in that one detail says as much as the contempt that follows it. She is watching a celebration
            she has already decided she will not be part of.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Worship, Offerings, and Bread for Everyone (verses 17 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The ark finally reaches the place David had already prepared for it.</p>
        </div>
        <VerseQuote
          text="And they brought in the ark of the LORD, and set it in his place, in the midst of the tabernacle that David had pitched for it: and David offered burnt offerings and peace offerings before the LORD."
          reference="2 Samuel 6:17"
        />
        <VerseQuote
          text="And as soon as David had made an end of offering burnt offerings and peace offerings, he blessed the people in the name of the LORD of hosts."
          reference="2 Samuel 6:18"
        />
        <VerseQuote
          text="And he dealt among all the people, even among the whole multitude of Israel, as well to the women as men, to every one a cake of bread, and a good piece of flesh, and a flagon of wine. So all the people departed every one to his house."
          reference="2 Samuel 6:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David shares the day with everyone, not just the men who marched.</strong> Bread, meat, and
            wine go out to every person in the crowd, &quot;as well to the women as men.&quot; A king who nearly
            lost a man to this ark three months earlier now hands out a feast to the whole nation because of it.
            The celebration a cart could not safely deliver, the Levites&apos; shoulders finally did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Michal&apos;s Accusation and David&apos;s Answer (verses 20 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The public celebration is over. What happens next happens inside David&apos;s own house.</p>
        </div>
        <VerseQuote
          text="Then David returned to bless his household. And Michal the daughter of Saul came out to meet David, and said, How glorious was the king of Israel to day, who uncovered himself to day in the eyes of the handmaids of his servants, as one of the vain fellows shamelessly uncovereth himself!"
          reference="2 Samuel 6:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Michal does not open with a question. She opens with sarcasm, calling the king of Israel &quot;glorious&quot;
            in a tone that means the exact opposite. Her complaint is that he humiliated himself in front of servant
            girls, acting like one of the &quot;vain fellows,&quot; a phrase that means something closer to worthless
            or empty men, not royalty at all.
          </p>
          <p>
            💡 A linen ephod was a simple garment, not a king&apos;s robes, and vigorous dancing in it could easily
            have looked undignified to someone watching for exactly that. A parallel account of the same day adds
            one detail Michal&apos;s complaint leaves out: David also wore a robe of fine linen over the ephod.
            Whatever she saw, it was not the literal nakedness her words suggest.
          </p>
        </div>
        <VerseQuote
          text="And David said unto Michal, It was before the LORD, which chose me before thy father, and before all his house, to appoint me ruler over the people of the LORD, over Israel: therefore will I play before the LORD."
          reference="2 Samuel 6:21"
        />
        <VerseQuote
          text="And I will yet be more vile than thus, and will be base in mine own sight: and of the maidservants which thou hast spoken of, of them shall I be had in honour."
          reference="2 Samuel 6:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David does not defend his dignity. He abandons it on purpose.</strong> His answer is not
            that he was not really undignified. It is that undignified is exactly what he is willing to be, because
            the celebration was never about how a king is supposed to look. It was about the LORD who chose him
            over Saul&apos;s entire house, the same house Michal still belongs to.
          </p>
          <p>That contrast, Saul&apos;s house against the house God actually chose, closes the chapter in a single line.</p>
        </div>
        <VerseQuote
          text="Therefore Michal the daughter of Saul had no child unto the day of her death."
          reference="2 Samuel 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ The text does not say God closed her womb as a direct punishment for this argument. It states the
            fact and lets the whole chapter&apos;s pattern explain it: Saul&apos;s line, already collapsing across the
            last four chapters, ends here too, in the one wife of David&apos;s who is named &quot;Saul&apos;s daughter&quot;
            at the very moment she despises the house that replaced her father&apos;s.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was it fair for God to kill Uzzah for a reflex?</strong> What the text says: verse 7 calls
            Uzzah&apos;s death a response to &quot;his error,&quot; without describing his motive as malicious.
            How this is read: most readers separate the instinct to steady a falling ark from the decision, made
            earlier by David and everyone around him, to put the ark on a cart in the first place. The law in
            Numbers 4:15 had already warned that touching the holy things directly carried a death penalty. Uzzah&apos;s
            hand was the last step in a chain of choices that never should have put him in that position.
          </p>
          <p>
            <strong>Why does God bless Obededom for keeping the very thing that just killed a man?</strong> What the
            text says: verse 11 states plainly that the LORD blessed Obededom&apos;s whole household during the
            three months the ark stayed there. How this is read: the contrast is usually read as proof that the ark
            itself was never dangerous to anyone who simply honored it in its place. The danger was in moving it
            wrongly, not in its presence.
          </p>
          <p>
            <strong>Was David&apos;s dancing inappropriate for a king?</strong> What the text says: Michal calls it
            shameful in verse 20, while David defends it in verses 21 and 22 as worship offered to the LORD rather
            than a performance for anyone watching. How this is read: Christians differ on how physically expressive
            worship should look, but most readers note that David directs his own explanation entirely toward God,
            not toward impressing or even defending himself to people.
          </p>
          <p>
            <strong>Did God punish Michal with childlessness because of this argument?</strong> What the text says:
            verse 23 states the fact without naming it a punishment for anything she said that day. How this is
            read: many readers connect it to the chapter&apos;s larger pattern of Saul&apos;s house ending, rather than
            treating it as a direct penalty for one conversation. The text leaves the exact cause unstated and lets
            the outcome speak for itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 6:6 and 7</h3>
        <VerseQuote
          text="And when they came to Nachon's threshingfloor, Uzzah put forth his hand to the ark of God, and took hold of it; for the oxen shook it. And the anger of the LORD was kindled against Uzzah; and God smote him there for his error; and there he died by the ark of God."
          reference="2 Samuel 6:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment that turns a national celebration into a funeral, and the verse that forces every reader to ask
          what it actually means to approach God carelessly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 6:9</h3>
        <VerseQuote text="And David was afraid of the LORD that day, and said, How shall the ark of the LORD come to me?" reference="2 Samuel 6:9" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king who has just conquered a capital city admits, in one sentence, that he does not know how to bring
          God&apos;s presence into it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 6:14</h3>
        <VerseQuote text="And David danced before the LORD with all his might; and David was girded with a linen ephod." reference="2 Samuel 6:14" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same man who was too afraid to move the ark three months earlier now celebrates it with everything he
          has, no longer worried about how it looks.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 6:21</h3>
        <VerseQuote
          text="And David said unto Michal, It was before the LORD, which chose me before thy father, and before all his house, to appoint me ruler over the people of the LORD, over Israel: therefore will I play before the LORD."
          reference="2 Samuel 6:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          David&apos;s answer to being mocked for worship, and a clear statement of whose opinion he was actually
          performing for.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David sets out with thirty thousand men to bring the ark of the covenant to Jerusalem. Uzzah touches it to
          steady it on its cart and dies instantly, so David leaves the ark at Obededom&apos;s house for three
          months. He then brings it the rest of the way carried properly by the Levites, dancing and celebrating,
          while his wife Michal watches from a window and later confronts him for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Uzzah die for touching the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The law in Numbers 4:15 and 7:9 required the ark to be carried on poles by the Levites, never touched
          directly and never hauled on a cart. David&apos;s men broke both rules, and when the cart lurched, Uzzah&apos;s
          hand met the one object the law had warned him never to touch.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where had the ark been before this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It had rested in the house of Abinadab since the days recorded in 1 Samuel 7, long before David became
          king. &quot;Gibeah&quot; in verses 3 and 4 simply means the hill where that house stood, not a separate
          town.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did David leave the ark at Obededom&apos;s house?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Uzzah&apos;s death left David afraid to bring the ark the rest of the way into Jerusalem. He diverted it to
          the nearest house rather than risk moving it further without understanding what had gone wrong.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What changed between the first and second attempt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A parallel account in 1 Chronicles 15 records David admitting the first attempt broke the LORD&apos;s own
          order for carrying the ark. The second time, Levites carried it on their shoulders using its built-in
          poles, with no cart anywhere in the process.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did David dance in front of everyone?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 14 describes him dancing &quot;with all his might,&quot; a physical, unrestrained response to the
          ark finally reaching Jerusalem safely. He later tells Michal directly that the display was for the LORD,
          not for any audience watching.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was David naked when he danced?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verse 14 says he wore a linen ephod, and 1 Chronicles 15:27 adds that he also wore a robe of fine
          linen over it. Michal&apos;s accusation of shameful exposure reads as an exaggeration driven by contempt,
          not a literal description.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Michal despise David for this?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 16 says she watched from a window rather than joining the crowd, and verse 20 shows her accusing him
          of acting beneath a king&apos;s dignity in front of servant girls. As Saul&apos;s daughter, she may also
          have seen the celebration as honoring the house that replaced her father&apos;s.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Michal never have children?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 23 simply records the fact without naming a direct cause. Many readers connect it to the chapter&apos;s
          larger pattern of Saul&apos;s house losing its future, following the deaths already recorded in the three
          chapters before this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 6 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The ark&apos;s arrival in Jerusalem sets up the very next chapter, where David wants to build it a permanent
          house and God answers with a promise about David&apos;s own house instead. The tabernacle David pitches
          for it here stands until Solomon later builds the temple to hold it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 6 is one chapter with two very different moods, and both of them matter.</p>
          <p>
            📌 <strong>Good intentions do not replace God&apos;s actual instructions.</strong> David wanted the ark
            in Jerusalem for all the right reasons, and still chose the wrong method, and the wrong method had a
            cost neither he nor Uzzah expected.
          </p>
          <p>
            📌 <strong>Admitting a mistake out loud is what let David try again correctly.</strong> &quot;We sought
            him not after the due order&quot; is not a comfortable sentence for a king to say about himself, and it
            is exactly what made the second attempt succeed where the first one failed.
          </p>
          <p>
            📌 <strong>Worship aimed at God does not need to look dignified to be real.</strong> David&apos;s answer
            to Michal was never that he looked fine. It was that he was not dancing for her, or for anyone else
            watching from a window.
          </p>
          <p>So here is your one next step.</p>
          <p>
            If something you are doing for God has started to feel like a formality, ask whether you are still
            doing it the way He actually asked, the same question David had to ask himself at Perezuzzah.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
