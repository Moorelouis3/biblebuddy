import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("ruth-4-explained", {
  title: "Ruth 4 Explained: Boaz Redeems Ruth at the City Gate",
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

export default function RuthFourExplainedPage() {
  return (
    <BlogPostShell
      slug="ruth-4-explained"
      title={<>📖 Ruth 4 Explained: Boaz Redeems Ruth at the City Gate</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One morning. One conversation at the city gate. One decision that nobody in the room could see the full weight of.</p>
            <p>By the end of it, a widow with nothing has a husband, a family line that almost died out has a son, and a nation waiting for a king has its great grandfather.</p>
            <p>
              <strong>Ruth 4 explained</strong> is the last chapter of this short book, and it closes
              every thread the first three chapters opened. Boaz made an oath in the dark on a
              threshing floor. Now, in the full light of morning, in front of witnesses, he keeps it.
            </p>
            <p>Maybe you have waited on a promise someone made you in private, wondering if it would hold up once it had to be said out loud, in public, where it actually costs something.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the nearer kinsman change his mind the moment Ruth comes up?</li>
            <li>❓ What is actually happening with the sandal in verses 7 and 8?</li>
            <li>❓ Why do the elders bless Boaz by naming Rachel, Leah, and Tamar?</li>
            <li>❓ How does this quiet family story end up pointing straight at King David?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Ruth 4 is a legal transaction at a city gate that turns into the opening
              chapter of Israel&apos;s royal line, and nobody standing there that morning knew
              it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: Boaz at the gate, the land
              offer, the kinsman&apos;s refusal once Ruth enters the deal, the sandal custom that
              sealed it, the public declaration, the blessing of the elders, and the birth that
              connects a Moabite widow to the throne of Israel.
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
            <ArticleLink href="/blog/ruth-3-explained">Ruth 3</ArticleLink> ended with Ruth back home
            before sunrise, six measures of barley in her lap, and an oath from Boaz still hanging
            unresolved. He had told her plainly that a kinsman nearer than himself had first right to
            act for Naomi&apos;s family, and he swore that one way or another, by that man or by
            himself, the matter would be settled before the day was finished. Naomi told Ruth to sit
            still and wait.
          </p>
          <p>
            Ruth 4 explained is Boaz keeping that promise before the sun has fully cleared the
            horizon. He does not wait, and he does not handle it quietly on the side. He walks
            straight to the one place in a small town like Bethlehem where a legal matter could be
            settled publicly and permanently.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Ruth 4 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Boaz Goes Up to the Gate (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with Boaz moving fast, straight from the threshing floor to business.</p>
        </div>
        <VerseQuote
          text="Then went Boaz up to the gate, and sat him down there: and, behold, the kinsman of whom Boaz spake came by; unto whom he said, Ho, such a one! turn aside, sit down here. And he turned aside, and sat down."
          reference="Ruth 4:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The city gate in an ancient town like Bethlehem was not just a doorway. It was the
            courthouse, the town square, and the record office all at once, the place elders sat to
            hear disputes and witness contracts because everyone passed through it eventually. Boaz
            does not go looking for the kinsman. He simply sits down and waits, because he already
            knows this is where the man will walk by.
          </p>
          <p>
            📌 <strong>&quot;Ho, such a one&quot; is the narrator&apos;s own way of saying the
            Hebrew text never records this man&apos;s actual name.</strong> Every other named person
            in this book gets a name. This kinsman, who had the first legal right to everything about
            to happen, is left anonymous on purpose.
          </p>
        </div>
        <VerseQuote
          text="And he took ten men of the elders of the city, and said, Sit ye down here. And they sat down."
          reference="Ruth 4:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ten elders made this an official hearing, not two men talking privately. Whatever gets
            decided in the next few minutes will have ten witnesses who can confirm it for the rest of
            their lives.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Land, and the Kinsman&apos;s First Yes (verses 3 and 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz opens with land, not with Ruth. That order matters.</p>
        </div>
        <VerseQuote
          text="And he said unto the kinsman, Naomi, that is come again out of the country of Moab, selleth a parcel of land, which was our brother Elimelech's: And I thought to advertise thee, saying, Buy it before the inhabitants, and before the elders of my people. If thou wilt redeem it, redeem it: but if thou wilt not redeem it, then tell me, that I may know: for there is none to redeem it beside thee; and I am after thee. And he said, I will redeem it."
          reference="Ruth 4:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Naomi owned, or had the right to reclaim, a piece of family land that once belonged to
            her husband Elimelech. Selling it outside the family would have ended that branch of the
            family&apos;s claim to it forever. The nearer kinsman had first right to buy it back and
            keep it inside the family, and Boaz offers it to him first, in order, exactly as the
            custom required.
          </p>
          <p>
            The kinsman answers without hesitation. Land that increases what he owns, with no visible
            cost attached yet, is an easy yes. He has no idea what Boaz is about to add to the
            offer.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Catch: Ruth Comes With the Land (verses 5 and 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz adds the one detail that changes everything.</p>
        </div>
        <VerseQuote
          text="Then said Boaz, What day thou buyest the field of the hand of Naomi, thou must buy it also of Ruth the Moabitess, the wife of the dead, to raise up the name of the dead upon his inheritance."
          reference="Ruth 4:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Redeeming the field was never only about the field.</strong> Under the custom
            Israel followed, taking the land also meant taking responsibility for Ruth, marrying her
            so that any son she bore would carry her dead husband Mahlon&apos;s name forward instead
            of letting that family line disappear. Boaz was not hiding this requirement to trap the
            man. He names it directly, in front of the elders, the moment it becomes relevant.
          </p>
          <p>Hearing that, the kinsman reverses himself completely.</p>
        </div>
        <VerseQuote
          text="And the kinsman said, I cannot redeem it for myself, lest I mar mine own inheritance: redeem thou my right to thyself; for I cannot redeem it."
          reference="Ruth 4:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Mar mine own inheritance&quot; likely means the land would eventually pass to a
            son born to Ruth, carrying Mahlon&apos;s name and claim, not the kinsman&apos;s own. He
            would spend his own money and effort to redeem a field that would not even end up
            belonging to his family line in the end. The land alone was worth having. The land plus a
            widow and a future heir who is not his own was a cost he was not willing to carry.
          </p>
          <p>
            📌 <strong>The unnamed kinsman is not written as a villain.</strong> He is simply a man
            doing honest math about his own estate, and stepping back the moment the real price
            becomes clear.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Sandal That Sealed the Deal (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The narrator pauses the scene to explain a custom readers in his own day already knew but later readers would not.</p>
        </div>
        <VerseQuote
          text="Now this was the manner in former time in Israel concerning redeeming and concerning changing, for to confirm all things; a man plucked off his shoe, and gave it to his neighbour: and this was a testimony in Israel."
          reference="Ruth 4:7"
        />
        <VerseQuote
          text="Therefore the kinsman said unto Boaz, Buy it for thee. So he drew off his shoe."
          reference="Ruth 4:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Pulling off a sandal and handing it over was a simple, physical way to confirm a
            transfer of rights in front of witnesses, long before written contracts were common.
            Everyone watching saw the exact moment the kinsman&apos;s claim passed to Boaz, with no
            room afterward for anyone to argue about what had really been agreed.
          </p>
          <p>
            <ArticleLink href="/blog/deuteronomy-25-explained">Deuteronomy 25</ArticleLink> describes
            a related sandal custom used specifically to shame a kinsman who refused to raise up a
            dead brother&apos;s name. Nothing in Ruth 4 suggests shame here. This kinsman declines
            openly and hands over the sandal without being forced into it, which reads as an ordinary,
            respectful transfer rather than a public rebuke.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Boaz&apos;s Public Declaration (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the sandal in hand, Boaz turns from the one kinsman to the whole gathered crowd.</p>
        </div>
        <VerseQuote
          text="And Boaz said unto the elders, and unto all the people, Ye are witnesses this day, that I have bought all that was Elimelech's, and all that was Chilion's and Mahlon's, of the hand of Naomi."
          reference="Ruth 4:9"
        />
        <VerseQuote
          text="Moreover Ruth the Moabitess, the wife of Mahlon, have I purchased to be my wife, to raise up the name of the dead upon his inheritance, that the name of the dead be not cut off from among his brethren, and from the gate of his place: ye are witnesses this day."
          reference="Ruth 4:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Boaz says &quot;ye are witnesses&quot; twice, bracketing the whole
            announcement.</strong> He is not quietly taking a wife. He is making sure this entire town
            can confirm, for the rest of their lives, exactly what was agreed and why. Everything
            Naomi lost in <ArticleLink href="/blog/ruth-1-explained">Ruth 1</ArticleLink>, her
            husband, her sons, her family&apos;s claim to its own land, gets named here specifically
            and publicly reversed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Blessing of the Elders and the People (verses 11 and 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The crowd answers Boaz with a blessing that reaches back into Israel&apos;s own history.</p>
        </div>
        <VerseQuote
          text="And all the people that were in the gate, and the elders, said, We are witnesses. The LORD make the woman that is come into thine house like Rachel and like Leah, which two did build the house of Israel: and do thou worthily in Ephratah, and be famous in Bethlehem:"
          reference="Ruth 4:11"
        />
        <VerseQuote
          text="And let thy house be like the house of Pharez, whom Tamar bare unto Judah, of the seed which the LORD shall give thee of this young woman."
          reference="Ruth 4:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Rachel and Leah were Jacob&apos;s wives, the mothers of the twelve tribes. Comparing
            Ruth to both of them is about as high a blessing as Bethlehem could offer a bride who had
            arrived in town as a foreign widow with nothing. The mention of Pharez and Tamar reaches
            even further back, to a story in{" "}
            <ArticleLink href="/blog/genesis-38-explained">Genesis 38</ArticleLink> that nobody in
            Bethlehem would have called tidy.
          </p>
          <p>
            ⚠️ <strong>The elders bless Boaz by name dropping a scandal, not hiding one.</strong>{" "}
            <ArticleLink href="/blog/who-was-tamar">Tamar</ArticleLink> and Judah&apos;s own story
            involved deception and a broken promise before Pharez was ever born, yet Pharez became
            the ancestor of an entire clan in Judah, the clan Boaz himself belongs to. The blessing is
            not pretending Israel&apos;s family history is clean. It is trusting that the same God who
            worked through a messy beginning once can do it again through Ruth and Boaz.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Obed Is Born, and the Line Runs to David (verses 13 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From a legal hearing at the gate, the chapter moves straight to a wedding and a birth.</p>
        </div>
        <VerseQuote
          text="So Boaz took Ruth, and she was his wife: and when he went in unto her, the LORD gave her conception, and she bare a son."
          reference="Ruth 4:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One sentence covers the marriage and the birth, but it credits the result to the LORD
            directly, not to chance or to Boaz. The women of Bethlehem, who had met Naomi coming home
            empty and bitter back in Ruth 1, are given the next words.
          </p>
        </div>
        <VerseQuote
          text="And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel."
          reference="Ruth 4:14"
        />
        <VerseQuote
          text="And he shall be unto thee a restorer of thy life, and a nourisher of thine old age: for thy daughter in law, which loveth thee, which is better to thee than seven sons, hath born him."
          reference="Ruth 4:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Better to thee than seven sons&quot; is the highest compliment the town
            knows how to pay a daughter in law.</strong> Seven was Israel&apos;s number for
            completeness, so this is not faint praise. It is the women of Bethlehem saying Ruth&apos;s
            loyalty outweighs what an entire ideal family could have given Naomi.
          </p>
          <p>Naomi&apos;s own response is quiet, physical, and says more than words could.</p>
        </div>
        <VerseQuote
          text="And Naomi took the child, and laid it in her bosom, and became nurse unto it."
          reference="Ruth 4:16"
        />
        <VerseQuote
          text="And the women her neighbours gave it a name, saying, There is a son born to Naomi; and they called his name Obed: he is the father of Jesse, the father of David."
          reference="Ruth 4:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The neighbors call the baby a son born <strong>to Naomi</strong>, even though Ruth gave
            birth to him. That is the custom of raising up a dead man&apos;s name doing exactly what
            it was meant to do. Mahlon&apos;s line, through Naomi&apos;s family, continues in Obed,
            even as the final verse quietly drops the name that changes how every reader understands
            this whole book: David.
          </p>
          <p>
            The chapter closes with a short genealogy, naming the family line from the Pharez
            mentioned in the elders&apos; blessing all the way down to David.
          </p>
        </div>
        <VerseQuote
          text="Now these are the generations of Pharez: Pharez begat Hezron, And Hezron begat Ram, and Ram begat Amminadab, And Amminadab begat Nahshon, and Nahshon begat Salmon, And Salmon begat Boaz, and Boaz begat Obed, And Obed begat Jesse, and Jesse begat David."
          reference="Ruth 4:18 to 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ten names carry the family from Pharez to David, Boaz sitting seventh in that list, Obed
            eighth, Jesse ninth, David tenth. A short book about two widows and a field of barley ends
            by placing itself directly inside the family history of Israel&apos;s greatest king.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Ruth 4 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the unnamed kinsman agree to redeem the land but refuse once Ruth is
            part of the deal?</strong> What the text says: verse 4 shows an immediate yes to the land
            alone, and verse 6 shows an immediate no once Boaz adds that marrying Ruth and raising up
            Mahlon&apos;s name goes with it. How this is read: the kinsman says plainly that it would
            mar his own inheritance, most likely because a son born to Ruth would inherit the land
            under Mahlon&apos;s name rather than his own family&apos;s. He is not condemned by the
            text for this. He simply counts the cost differently than Boaz does.
          </p>
          <p>
            <strong>Was the sandal custom in verses 7 and 8 the same practice Deuteronomy 25
            describes, where a widow removes a reluctant brother in law&apos;s sandal to shame
            him?</strong> What
            the text says: Ruth 4:7 calls it a general custom for confirming any transfer of rights,
            and the kinsman removes his own sandal and hands it over without being compelled. How this
            is read: the two customs likely share the same root idea, a sandal standing for a man&apos;s
            claim or standing in the community, but Ruth 4 describes an ordinary, voluntary legal
            transfer, not the specific act of public shaming Deuteronomy 25 describes for a brother in
            law who refuses outright.
          </p>
          <p>
            <strong>Why would the elders bless Boaz by invoking Tamar, given how troubled that story
            in Genesis 38 actually is?</strong> What the text says: verse 12 names Pharez and Tamar directly as part of the
            blessing, with no attempt to soften or hide the reference. How this is read: Bethlehem
            knew exactly whose descendants they were. Naming Tamar is not Scripture glossing over a
            hard chapter in Judah&apos;s family. It is an honest acknowledgment that God had already
            built something lasting out of a broken beginning once, and the blessing asks Him to do
            it again through Ruth.
          </p>
          <p>
            <strong>Does the genealogy at the end of Ruth 4 really connect to the Gospels, or is that
            a later Christian reading added onto the text?</strong> What the text says: Ruth 4:17 to
            22 names Obed as the father of Jesse, the father of David, in plain, unadorned language,
            with no commentary added. How this is read: this is simply the same family line Matthew&apos;s
            Gospel later traces forward from David to Jesus. Ruth 4 does not claim to know where its
            own genealogy leads. It only records the first steps of a line that later Scripture
            follows all the way back to Bethlehem, generations later, in a stable.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Ruth 4
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Ruth 4:14 and 15</h3>
        <VerseQuote
          text="And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel. And he shall be unto thee a restorer of thy life, and a nourisher of thine old age: for thy daughter in law, which loveth thee, which is better to thee than seven sons, hath born him."
          reference="Ruth 4:14 and 15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The town that watched Naomi come home bitter and empty now says, out loud, that a foreign
          daughter in law&apos;s love outweighs seven sons. Few verses in Scripture praise loyalty this
          plainly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Ruth 4:10</h3>
        <VerseQuote
          text="Moreover Ruth the Moabitess, the wife of Mahlon, have I purchased to be my wife, to raise up the name of the dead upon his inheritance, that the name of the dead be not cut off from among his brethren, and from the gate of his place: ye are witnesses this day."
          reference="Ruth 4:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Boaz keeps the oath he swore in the dark on a threshing floor, this time in front of the
          whole town, with nothing left unsaid.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Ruth 4:17</h3>
        <VerseQuote
          text="And the women her neighbours gave it a name, saying, There is a son born to Naomi; and they called his name Obed: he is the father of Jesse, the father of David."
          reference="Ruth 4:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A quiet naming in a small town turns out to be the earliest recorded step toward Israel&apos;s
          throne.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Ruth 4:6</h3>
        <VerseQuote
          text="And the kinsman said, I cannot redeem it for myself, lest I mar mine own inheritance: redeem thou my right to thyself; for I cannot redeem it."
          reference="Ruth 4:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The man with first right to redeem Ruth counts the cost and steps back, clearing the way
          for Boaz without anyone forcing him to.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Ruth 4
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Ruth 4?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Boaz went to the city gate, called ten elders as witnesses, and offered a nearer kinsman
          the chance to redeem Naomi&apos;s land. The kinsman agreed until Boaz explained that
          marrying Ruth came with it, at which point he refused and transferred his right with a
          sandal custom. Boaz then married Ruth, Obed was born, and the chapter ends with the
          genealogy running from Pharez through Boaz and Obed to Jesse and David.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is the kinsman in Ruth 4 never named?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not say. The narrator calls him only &quot;such a one,&quot; while every
          other significant person in the book, including Boaz, Ruth, Naomi, and even Orpah, is named
          directly. Many readers take the contrast as deliberate, leaving the man who declined his
          role nameless while Boaz, who stepped up, is remembered by name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the sandal mean in Ruth 4:7 and 8?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Removing a sandal and handing it to another man was a recognized way of confirming a legal
          transfer of rights in ancient Israel, used here to seal the kinsman&apos;s handover of his
          claim to Boaz in front of witnesses. It functioned the way a signed document would today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a kinsman redeemer in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A near relative with the responsibility, and the right, to buy back family land that had to
          be sold and to marry a widow so her dead husband&apos;s name would continue. Leviticus 25
          and Deuteronomy 25 describe different parts of this custom, and Ruth 4 shows it carried out
          in full.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do the elders mention Rachel, Leah, and Tamar in their blessing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Rachel and Leah were the mothers of Israel&apos;s twelve tribes, and Tamar was the mother of
          Pharez, ancestor of Boaz&apos;s own clan in Judah. Naming all three is Bethlehem asking God
          to build something as lasting through Ruth as He already had through those women, scandal
          and all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Ruth an ancestor of King David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Ruth 4:17 names her son Obed as the father of Jesse, who was David&apos;s father,
          making Ruth David&apos;s great grandmother. A Moabite widow with nothing becomes part of the
          direct family line of Israel&apos;s most famous king.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the book of Ruth end with a genealogy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The genealogy confirms, in the plainest way Scripture has, that everything in the story,
          the famine, the deaths, the gleaning, the threshing floor, and the gate, led somewhere real
          and lasting. It ties a small, personal story directly into the larger history of Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Ruth 4 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ruth 4 ends its genealogy at David, and Matthew&apos;s Gospel later continues that same
          family line forward to Jesus. The chapter does not say this itself, but it records the exact
          generations later Scripture builds on.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ruth 4 takes a private oath from a dark threshing floor and settles it in broad daylight, in front of witnesses, where it actually costs Boaz something.</p>
          <p>
            📌 <strong>Boaz kept a promise nobody but Ruth and Naomi had even heard him make.</strong>{" "}
            The nearer kinsman had the easier path and took it. Boaz had the costly path and still
            walked straight toward it that same morning.
          </p>
          <p>
            📌 <strong>God was not absent from any of this, even though the chapter never records Him
            speaking once.</strong> A field, a sandal, and a family line with a scandal in its own
            past become the exact road to King David.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of a promise you have made that nobody is watching you keep. Ruth 4 is what it
            looks like to keep it anyway, in the open, when it finally has the chance to count.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
