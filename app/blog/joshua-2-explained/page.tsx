import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-2-explained", {
  title: "Joshua 2 Explained: Rahab, the Spies, and the Scarlet Cord",
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

export default function JoshuaTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-2-explained"
      title={<>📖 Joshua 2 Explained: Rahab, the Spies, and the Scarlet Cord</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two spies slip into enemy territory. The one house that saves them belongs to a woman the text will not let you ignore.</p>
            <p>
              <strong>Joshua 2 explained</strong> is the chapter where Israel&apos;s invasion of Canaan
              starts with a secret, a lie, and an unlikely ally. Before a single sword is drawn, before
              a single wall falls, the whole conquest hinges on whether a Canaanite woman named Rahab
              decides to protect two strangers or hand them over.
            </p>
            <p>Maybe you have skipped this chapter because of who it is about.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did the spies go straight to a harlot&apos;s house of all places?</li>
            <li>❓ Did God actually approve of Rahab lying to the king of Jericho?</li>
            <li>❓ What was the scarlet cord, and why did it matter so much?</li>
            <li>❓ How does a woman like Rahab end up in the story of Jesus at all?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Rahab says more about who God is in one speech than most of the men in this
              book say in a whole chapter.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter: the two spies sent out in secret, the
              king&apos;s soldiers pounding on Rahab&apos;s door, her confession about who the LORD
              really is, the oath she extracts, and the report that sends Israel toward the Jordan.
            </p>
            <p>Read slowly. The most unexpected person in the Bible is often the one holding the plan together.</p>
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
            <ArticleLink href="/blog/joshua-1-explained">Joshua 1</ArticleLink> ended with Joshua
            giving his very first order as Israel&apos;s new leader: pack food, because in three days
            the nation would cross the Jordan. The two and a half tribes already settled east of the
            river had just renewed the promise they first made to Moses in{" "}
            <ArticleLink href="/blog/deuteronomy-31-explained">Deuteronomy 31</ArticleLink>, agreeing
            to fight alongside everyone else, and the whole camp had answered Joshua with one voice,
            promising to obey him the way they once obeyed Moses.
          </p>
          <p>
            Joshua 2 is what happens in those same three days, away from the camp, where nobody back
            at Shittim can see it. Before Israel moves one step toward the river, Joshua needs to know
            what is actually waiting for them on the other side. That means sending men into the one
            city that stands directly in Israel&apos;s path: Jericho.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 2 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Two Spies Sent Out in Secret (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a quiet decision that will determine the shape of everything that follows.</p>
        </div>
        <VerseQuote
          text="And Joshua the son of Nun sent out of Shittim two men to spy secretly, saying, Go view the land, even Jericho. And they went, and came into an harlot's house, named Rahab, and lodged there."
          reference="Joshua 2:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Shittim was Israel&apos;s camp east of the Jordan, the same staging ground Joshua had
            just ordered the nation to prepare food in. Sending spies was not a new idea for this
            generation. Their parents had sent twelve men into this same land forty years earlier,
            and ten of them came back with a report that kept the whole nation out of Canaan for a
            generation. Joshua himself had been one of the two who did not.
          </p>
          <p>
            📌 <strong>Joshua only sends two men this time, not twelve, and he never tells the
            nation what they find out until the whole mission is finished.</strong> Whatever he
            learned from the first disaster, keeping the report small and quiet looks like part of it.
          </p>
          <p>
            A harlot&apos;s house was not a strange place for two foreign strangers to end up
            unnoticed. An inn built into the business of a woman already used to visitors coming and
            going at odd hours was exactly the kind of place two spies could disappear into without
            drawing attention, at least at first.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The King&apos;s Men at the Door (verses 2 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The spies are not as hidden as they hoped. Word reaches the king of Jericho almost immediately.</p>
        </div>
        <VerseQuote
          text="And it was told the king of Jericho, saying, Behold, there came men in hither to night of the children of Israel to search out the country."
          reference="Joshua 2:2"
        />
        <VerseQuote
          text="And the king of Jericho sent unto Rahab, saying, Bring forth the men that are come to thee, which are entered into thine house: for they be come to search out all the country."
          reference="Joshua 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jericho already knows exactly who is camped across the river. Rahab now has a direct
            order from the king himself, and a houseful of men who have not done anything yet to
            earn her loyalty. What she does next is the hinge the whole chapter turns on.
          </p>
        </div>
        <VerseQuote
          text="And the woman took the two men, and hid them, and said thus, There came men unto me, but I wist not whence they were: And it came to pass about the time of shutting of the gate, when it was dark, that the men went out: whither the men went I wot not: pursue after them quickly; for ye shall overtake them."
          reference="Joshua 2:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Wist not&quot; and &quot;wot not&quot; are both old forms of the verb &quot;to
            wit,&quot; meaning to know. Rahab is not being vague. She is flatly denying knowledge she
            clearly has, sending the king&apos;s men chasing after spies who are, at that exact
            moment, hidden somewhere in her own house.
          </p>
        </div>
        <VerseQuote
          text="But she had brought them up to the roof of the house, and hid them with the stalks of flax, which she had laid in order upon the roof. And the men pursued after them the way to Jordan unto the fords: and as soon as they which pursued after them were gone out, they shut the gate."
          reference="Joshua 2:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the order of events. She hides the men first, then answers the
            king&apos;s messengers.</strong> The decision to protect them was already made before she
            ever opened her mouth to lie about it. The lie was not the moment she chose a side. It
            only covered a choice she had already settled in her own house, alone, with everything to
            lose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Rahab&apos;s Confession: &quot;The LORD Your God, He Is God&quot; (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With the king&apos;s men gone and the gate shut behind them, Rahab climbs back up to
            the men she just risked everything for, and says something far bigger than a simple
            rescue plan. The fuller story of who she was before this night, and what became of her
            afterward, is worth its own read in{" "}
            <ArticleLink href="/blog/who-was-rahab">who Rahab was in the Bible</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="And before they were laid down, she came up unto them upon the roof; And she said unto the men, I know that the LORD hath given you the land, and that your terror is fallen upon us, and that all the inhabitants of the land faint because of you."
          reference="Joshua 2:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;I know&quot; is not a guess. Rahab states, as settled fact, that the
            LORD has already given Israel this land, before Israel has crossed the river or fought a
            single battle.</strong> No Israelite has told her this. She has worked it out herself,
            from reports an entire city is already terrified of.
          </p>
          <p>She explains exactly what convinced her.</p>
        </div>
        <VerseQuote
          text="For we have heard how the LORD dried up the water of the Red sea for you, when ye came out of Egypt; and what ye did unto the two kings of the Amorites, that were on the other side Jordan, Sihon and Og, whom ye utterly destroyed."
          reference="Joshua 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Red Sea crossing was forty years old news by this point. Sihon and Og were far more
            recent, two Amorite kings Israel had defeated east of the Jordan on the way to Shittim.
            Both stories had traveled across the river and settled into Jericho as common knowledge,
            with a very specific effect on the people who heard them.
          </p>
        </div>
        <VerseQuote
          text="And as soon as we had heard these things, our hearts did melt, neither did there remain any more courage in any man, because of you: for the LORD your God, he is God in heaven above, and in earth beneath."
          reference="Joshua 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>This is the theological center of the whole chapter, and it comes from a
            Canaanite woman inside Canaan&apos;s own walls, not from anyone in Israel&apos;s camp.</strong>{" "}
            Rahab reaches, through nothing but secondhand reports and her own conclusion, the exact
            confession Israel&apos;s own law had been trying to teach Israel directly for forty
            years: that the LORD is not one god among many, but God over everything, above and below
            at once. The spies never have to argue her into faith. She arrives there before they say a
            single word back to her.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Oath, the Request, and the Scarlet Cord (verses 12 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rahab&apos;s confession is not where she stops. She has a request, and she wants it in writing, in a manner of speaking.</p>
        </div>
        <VerseQuote
          text="Now therefore, I pray you, swear unto me by the LORD, since I have shewed you kindness, that ye will also shew kindness unto my father's house, and give me a true token: And that ye will save alive my father, and my mother, and my brethren, and my sisters, and all that they have, and deliver our lives from death."
          reference="Joshua 2:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>She does not ask the spies to swear by their own word. She asks them to swear
            by the LORD, the very God she just named as ruler of heaven and earth.</strong> Rahab is
            not negotiating with two frightened foreigners. She is holding Israel&apos;s own God to
            His own character, the same way she just heard He treated Sihon and Og, and asking Him to
            treat her household differently because she chose differently.
          </p>
          <p>Notice too who she asks for. Not herself alone, but her whole family, named one by one.</p>
        </div>
        <VerseQuote
          text="And the men answered her, Our life for yours, if ye utter not this our business. And it shall be, when the LORD hath given us the land, that we will deal kindly and truly with thee."
          reference="Joshua 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The spies put their own lives on the line as the collateral for the promise. If Rahab
            exposes them later, their lives answer for it. The arrangement only works because both
            sides are now equally exposed to each other.
          </p>
        </div>
        <VerseQuote
          text="Then she let them down by a cord through the window: for her house was upon the town wall, and she dwelt upon the wall."
          reference="Joshua 2:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab&apos;s house being built into the wall itself is not incidental detail. It is the
            reason the whole escape is even possible, and it will matter again later in the book,
            once the wall itself comes down.
          </p>
        </div>
        <VerseQuote
          text="And she said unto them, Get you to the mountain, lest the pursuers meet you; and hide yourselves there three days, until the pursuers be returned: and afterward may ye go your way."
          reference="Joshua 2:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A Canaanite woman is now giving two Israelite spies tactical advice about how to survive
            inside her own country, and they take it without argument. Before they go, the men lay
            out exactly what will keep Rahab&apos;s family safe once the attack actually comes.
          </p>
        </div>
        <VerseQuote
          text="And the men said unto her, We will be blameless of this thine oath which thou hast made us swear. Behold, when we come into the land, thou shalt bind this line of scarlet thread in the window which thou didst let us down by: and thou shalt bring thy father, and thy mother, and thy brethren, and all thy father's household, home unto thee."
          reference="Joshua 2:17 and 18"
        />
        <VerseQuote
          text="And it shall be, that whosoever shall go out of the doors of thy house into the street, his blood shall be upon his head, and we will be guiltless: and whosoever shall be with thee in the house, his blood shall be on our head, if any hand be upon him."
          reference="Joshua 2:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Safety has one clear condition: stay inside the house marked by the cord.</strong>{" "}
            The scarlet line is not a charm or a magic sign. It is a location marker, telling the
            soldiers coming later exactly which house to leave untouched, and it only protects the
            people who do not leave it.
          </p>
        </div>
        <VerseQuote
          text="And if thou utter this our business, then we will be quit of thine oath which thou hast made us to swear."
          reference="Joshua 2:20"
        />
        <VerseQuote
          text="And she said, According unto your words, so be it. And she sent them away, and they departed: and she bound the scarlet line in the window."
          reference="Joshua 2:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Rahab ties the cord in the window the moment the men are gone, long before any army
            is anywhere near Jericho. She is not waiting to see if Israel actually wins before she
            commits. The cord goes up while the outcome is still completely unproven.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Spies Return With Their Report (verses 22 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The two men follow Rahab&apos;s advice to the letter, and it works exactly as she said it would.</p>
        </div>
        <VerseQuote
          text="And they went, and came unto the mountain, and abode there three days, until the pursuers were returned: and the pursuers sought them throughout all the way, but found them not."
          reference="Joshua 2:22"
        />
        <VerseQuote
          text="So the two men returned, and descended from the mountain, and passed over, and came to Joshua the son of Nun, and told him all things that befell them: And they said unto Joshua, Truly the LORD hath delivered into our hands all the land; for even all the inhabitants of the country do faint because of us."
          reference="Joshua 2:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this report to the one Israel&apos;s parents brought back from this
            same land a generation earlier.</strong> That report was full of giants, walled cities, and
            fear. This one comes back with the exact words Rahab already said to them on her roof,
            now repeated as Israel&apos;s own official intelligence: the land is theirs, and the
            people in it are already faint with fear.
          </p>
          <p>
            Two spies went in quietly, and the only solid thing they bring back is not a map or a
            troop count. It is a Canaanite woman&apos;s testimony about the God of Israel, confirmed
            by everything they just saw with their own eyes.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 2 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did God approve of Rahab lying to the king of Jericho?</strong> What the text
            says: Joshua 2 records the lie without commenting on it, and nowhere does it say God told
            her to say it. What the rest of Scripture says: Hebrews 11:31 and James 2:25 both praise
            Rahab by name, but what they name is her faith and the kindness of receiving and hiding
            the spies, not the specific words she used doing it. Christians have read this two ways.
            Some say Scripture simply does not pass verdict on the lie itself, only on the loyalty
            behind it. Others argue that in a moment of genuine war and deception already underway on
            both sides, hiding enemies of her own king from men actively hunting to kill them carries
            a different weight than an ordinary lie. Neither view treats the lie as the reason Rahab
            is commended. Her faith is.
          </p>
          <p>
            <strong>Was Rahab really a prostitute?</strong> What the text says: the Hebrew word
            behind &quot;harlot&quot; is zonah, the standard Old Testament word for a prostitute, and
            both Hebrews 11:31 and James 2:25 repeat the exact same description centuries later with
            no softening. How it has sometimes been read: a few have suggested &quot;innkeeper&quot;
            instead, since her house clearly functioned as a place travelers stayed. The text itself
            gives no reason to replace the plain meaning, and the New Testament had every chance to
            correct it if it were wrong. What makes Rahab&apos;s story land is not that the title is
            softened. It is that it is not.
          </p>
          <p>
            <strong>Why did the spies end up in a harlot&apos;s house at all?</strong> What the text
            says: Joshua 2:1 states it plainly, with no explanation for why that house specifically.
            What is reasoned rather than stated: a house used to housing travelers at all hours was
            one of the few places two foreign men could come and go without immediately drawing a
            crowd&apos;s attention, at least for a while. Whatever the spies&apos; reasoning, the
            chapter spends far more time on what Rahab did once they arrived than on why they picked
            her house in the first place.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 2:11</h3>
        <VerseQuote
          text="And as soon as we had heard these things, our hearts did melt, neither did there remain any more courage in any man, because of you: for the LORD your God, he is God in heaven above, and in earth beneath."
          reference="Joshua 2:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A Canaanite woman states the whole point of the book of Deuteronomy back to Israel, in her
          own words, before Israel has fought a single battle to prove it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 2:9</h3>
        <VerseQuote
          text="And she said unto the men, I know that the LORD hath given you the land, and that your terror is fallen upon us, and that all the inhabitants of the land faint because of you."
          reference="Joshua 2:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Rahab speaks about Israel&apos;s victory in the past tense before it happens. Faith this
          certain, from someone with every reason to side against Israel, is the real shock of the
          chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 2:14</h3>
        <VerseQuote
          text="And the men answered her, Our life for yours, if ye utter not this our business. And it shall be, when the LORD hath given us the land, that we will deal kindly and truly with thee."
          reference="Joshua 2:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A covenant sealed between two frightened spies and a woman risking everything for them,
          with both sides putting their own lives on the table as the guarantee.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Hebrews 11:31</h3>
        <VerseQuote
          text="By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace."
          reference="Hebrews 11:31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Centuries later, Rahab stands in the same list of heroes as Abraham, Moses, and Joshua
          himself. Her title never changes. Her outcome does.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 2:24</h3>
        <VerseQuote
          text="And they said unto Joshua, Truly the LORD hath delivered into our hands all the land; for even all the inhabitants of the country do faint because of us."
          reference="Joshua 2:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact opposite of the report Israel&apos;s parents brought back a generation before.
          This time the fear belongs to the people already living in the land.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Joshua 2 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 2 tells how two Israelite spies, sent into Jericho before the conquest of Canaan
          begins, are hidden and protected by a Canaanite woman named Rahab. She confesses faith in
          the God of Israel, secures a promise of safety for her family, and marks her house with a
          scarlet cord so it can be identified and spared later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Rahab in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Rahab was a Canaanite woman living in Jericho, described in Joshua 2 as a harlot whose
          house was built into the city wall. She hid two Israelite spies from the king&apos;s
          soldiers, confessed faith in the LORD, and was later named in the genealogy of Jesus and
          praised in both Hebrews and James as an example of faith.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Rahab really a prostitute?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Hebrew word used for Rahab, zonah, is the standard Old Testament term for a prostitute,
          and the New Testament repeats the same description without softening it in either Hebrews
          11:31 or James 2:25. Nothing in the text supports replacing that plain meaning with a
          different occupation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God bless Rahab for lying to the king?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never specifically commends the lie itself. Hebrews 11:31 and James 2:25 both
          praise Rahab for her faith and for the kindness of receiving and protecting the spies, not
          for the exact words she used to cover for them. Christians continue to debate how to weigh
          the lie, but her faith is what both New Testament writers name directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the significance of the scarlet cord in Joshua 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The cord was a practical marker, telling Israel&apos;s soldiers exactly which house to
          spare once the attack on Jericho began. Rahab had to stay inside that house with her family
          for the promise to protect them, since anyone who left it was no longer covered by the
          agreement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the spies go into a harlot&apos;s house of all places?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the choice directly, but a house used to travelers coming and
          going at all hours was one of the few places two strangers could stay without immediately
          drawing suspicion. Whatever drew them there, the chapter&apos;s real focus is on what Rahab
          chose to do with them once they arrived.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Rahab in Joshua 2 the same Rahab in Jesus&apos; genealogy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Matthew 1:5 lists Rachab, an alternate spelling of the same name, as the mother of
          Boaz, who later married <ArticleLink href="/blog/who-was-ruth">Ruth</ArticleLink>. The
          woman who hid two spies in Jericho&apos;s wall became a direct ancestor of King David and,
          through him, of Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does James say Rahab was justified by works, while Hebrews says by faith?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The two books are not contradicting each other. Hebrews 11:31 points to the inward faith
          that made Rahab act the way she did. James 2:25 points to the outward action, hiding and
          protecting the spies, as proof that her faith was real rather than empty words. Both
          writers are describing the same event from two angles.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Rahab and her family after Jericho fell?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 2 only records the promise made to her. The rest of her story, including whether
          Israel kept its word once Jericho&apos;s walls actually came down, belongs to the chapters
          that follow later in the book.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Joshua 2 spend so much time on one Canaanite woman?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because her confession carries the theological weight the whole conquest rests on. Before
          Israel crosses the Jordan or fights a single battle, a woman with every reason to oppose
          them states plainly that the LORD has already given them the land, and that He alone is
          God over heaven and earth.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 2 is a quiet chapter, and it still manages to settle the outcome of the book before the fighting even starts.</p>
          <p>
            📌 <strong>Faith showed up first in the last place Israel expected it.</strong> A
            Canaanite woman inside Jericho&apos;s own walls said out loud what it would take Israel
            chapters of battles to prove: the LORD is God over heaven and earth, and this land is
            already His to give.
          </p>
          <p>
            📌 <strong>Rahab&apos;s choice came before her safety, not after it.</strong> She hid the
            spies, then lied to cover it, then tied the cord in her window long before anyone knew
            whether Israel would win. Faith acted while the outcome was still unproven.
          </p>
          <p>
            📌 <strong>One decision in one house reached further than anyone in that house could have
            guessed.</strong> The woman who protected two spies in secret became an ancestor of David,
            and of Jesus.
          </p>
          <p>
            You will probably never hide spies on a rooftop. You will almost certainly face a moment
            where choosing the right side costs you something before it proves itself right.
          </p>
          <p>So here is your one next step.</p>
          <p>Read Joshua 2:11 again, and ask whether you believe what Rahab believed before she ever saw Israel win a single battle.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
