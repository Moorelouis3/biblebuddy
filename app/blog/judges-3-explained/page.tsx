import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("judges-3-explained", {
  title: "Judges 3 Explained: Othniel, Ehud, and the Left-Handed Assassin",
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

export default function JudgesThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="judges-3-explained"
      title={<>📖 Judges 3 Explained: Othniel, Ehud, and the Left-Handed Assassin</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A king so fat a dagger disappears inside him. A judge who gets four verses. A man remembered for one line about an ox goad.</p>
            <p>
              <strong>Judges 3 explained</strong> is where the cycle named in the previous chapter stops being a
              description and starts being a story. Israel marries into the nations it never finished driving out,
              forgets the LORD, and gets sold to an oppressor. Then, exactly as promised, a deliverer shows up. This
              chapter gives you three of them, back to back, each one stranger than the last.
            </p>
            <p>Maybe you have watched the same failure repeat in your own life and wondered if rescue ever actually shows up the second time.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God deliberately leave enemies in the land, by name, as a test?</li>
            <li>❓ Who was Othniel, and why does his whole story fit in four verses?</li>
            <li>❓ Was it right for Ehud to lie his way into a king&apos;s private room?</li>
            <li>❓ Why does Shamgar get only one sentence in the entire book?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every deliverer in this chapter is unlikely. A relative of an old conqueror, a left-handed
              man from a tribe not known for warriors, a man armed with a farm tool.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the exact nations named as Israel&apos;s
              test, the first full turn of the cycle, Othniel&apos;s brief rescue, Eglon&apos;s eighteen year
              oppression, Ehud&apos;s assassination in a locked room, the battle at the Jordan, and Shamgar&apos;s
              one verse.
            </p>
            <p>Thirty one verses, three deliverers, and over a century of Israel&apos;s history compressed into one chapter.</p>
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
            <ArticleLink href="/blog/judges-2-explained">Judges 2</ArticleLink> stepped outside the story to explain
            the shape every story after it would take. A generation that never personally saw the LORD&apos;s works
            served Baalim instead. God handed them to oppressors, then raised up judges to deliver them, then
            watched the people relapse further each time a judge died. The chapter closed by stating plainly why
            the remaining nations were still in the land at all: to prove Israel, to test whether they would keep
            walking in the LORD&apos;s way without a miracle forcing the issue.
          </p>
          <p>
            Judges 3 opens by naming exactly which nations that test involved, then gives the test its first three
            results.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Judges 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Nations Named as Israel&apos;s Test (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by putting names to the test Judges 2 had only described in general terms.</p>
        </div>
        <VerseQuote
          text="Now these are the nations which the LORD left, to prove Israel by them, even as many of Israel as had not known all the wars of Canaan; Only that the generations of the children of Israel might know, to teach them war, at the least such as before knew nothing thereof;"
          reference="Judges 3:1 and 2"
        />
        <VerseQuote
          text="Namely, five lords of the Philistines, and all the Canaanites, and the Sidonians, and the Hivites that dwelt in mount Lebanon, from mount Baalhermon unto the entering in of Hamath."
          reference="Judges 3:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Four groups, by this count: the five Philistine city lords on the coast, the Canaanites, the
            Sidonians to the north, and the Hivites up in Lebanon. Two verses later, the chapter names a different
            list of who Israel actually lived among day to day.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel dwelt among the Canaanites, Hittites, and Amorites, and Perizzites, and Hivites, and Jebusites:"
          reference="Judges 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The two lists only partly overlap.</strong> Verse 3 names the Philistines and Sidonians as
            the outside test, the border pressure Israel had to live next to. Verse 5 names the Hittites, Amorites,
            Perizzites, and Jebusites, the inland peoples Israel actually settled down beside. The test was not one
            threat. It was two different kinds of neighbor at once, pressing in from the border and sitting right
            inside the territory.
          </p>
          <p>
            Verse 2 adds a reason for the test that Judges 2 had not mentioned: so a generation too young to
            remember the conquest would learn how to fight at all. The test was never only moral. It was also
            practical.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The First Full Turn of the Cycle (verses 5 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Living among these nations did not stay neutral for long.</p>
        </div>
        <VerseQuote
          text="And they took their daughters to be their wives, and gave their daughters to their sons, and served their gods."
          reference="Judges 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the exact danger Joshua named by name before he died.</strong>{" "}
            <ArticleLink href="/blog/joshua-24-explained">Joshua 24</ArticleLink> had Israel swear to put away
            every foreign god and serve the LORD alone. One generation later, the marriages Joshua warned about are
            happening on both sides, sons and daughters both, and the gods come into the family along with the in
            laws.
          </p>
          <p>Scripture does not soften what follows.</p>
        </div>
        <VerseQuote
          text="And the children of Israel did evil in the sight of the LORD, and forgat the LORD their God, and served Baalim and the groves."
          reference="Judges 3:7"
        />
        <VerseQuote
          text="Therefore the anger of the LORD was hot against Israel, and he sold them into the hand of Chushanrishathaim king of Mesopotamia: and the children of Israel served Chushanrishathaim eight years."
          reference="Judges 3:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Chushanrishathaim&apos;s own name is doing some of the chapter&apos;s work. It is built from a
            Hebrew root meaning double wickedness, which matches exactly what an oppressor from Mesopotamia,
            hundreds of miles east, would have looked like to a nation that had just forgotten the God who freed
            them from an empire. Eight years under him is the first bill for the marriages in verse 6.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Othniel: A Rescue Told in Four Verses (verses 9 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judges 2 had promised that crying out would bring a deliverer. Here is the first time that promise gets tested in a real story.</p>
        </div>
        <VerseQuote
          text="And when the children of Israel cried unto the LORD, the LORD raised up a deliverer to the children of Israel, who delivered them, even Othniel the son of Kenaz, Caleb's younger brother."
          reference="Judges 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Othniel is not a stranger to readers of this library.</strong> He already appeared in{" "}
            <ArticleLink href="/blog/judges-1-explained">Judges 1</ArticleLink>, winning Achsah&apos;s hand by
            conquering Kirjathsepher, the same Caleb who had stood alone in faith at Kadeshbarnea decades earlier in{" "}
            <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink> now has a younger brother
            leading the whole nation. The family that trusted God when ten other tribal leaders would not produces
            Israel&apos;s first judge.
          </p>
        </div>
        <VerseQuote
          text="And the Spirit of the LORD came upon him, and he judged Israel, and went out to war: and the LORD delivered Chushanrishathaim king of Mesopotamia into his hand; and his hand prevailed against Chushanrishathaim."
          reference="Judges 3:10"
        />
        <VerseQuote
          text="And the land had rest forty years. And Othniel the son of Kenaz died."
          reference="Judges 3:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Three verses cover the entire rescue: the Spirit comes on him, he fights, he wins, the land rests
            forty years, he dies. No battle details, no dialogue, nothing about how he actually defeated a
            Mesopotamian king. Othniel&apos;s story is the shortest of any judge in this book, and the chapter does
            not treat that as a lesser victory. It treats it as the pattern working exactly the way Judges 2 said
            it would.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Eglon of Moab, and a Left-Handed Man Named Ehud (verses 12 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forty years of rest ends the same way the last period of peace did.</p>
        </div>
        <VerseQuote
          text="And the children of Israel did evil again in the sight of the LORD: and the LORD strengthened Eglon the king of Moab against Israel, because they had done evil in the sight of the LORD."
          reference="Judges 3:12"
        />
        <VerseQuote
          text="And he gathered unto him the children of Ammon and Amalek, and went and smote Israel, and possessed the city of palm trees. So the children of Israel served Eglon the king of Moab eighteen years."
          reference="Judges 3:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Eighteen years under Eglon is more than double what Chushanrishathaim cost Israel. &quot;The city of
            palm trees&quot; is Jericho, the very city Israel had once marched around with trumpets. An enemy king
            is now sitting inside the first prize Israel ever won in the land.
          </p>
          <p>Relief comes from an unlikely direction.</p>
        </div>
        <VerseQuote
          text="But when the children of Israel cried unto the LORD, the LORD raised them up a deliverer, Ehud the son of Gera, a Benjamite, a man lefthanded: and by him the children of Israel sent a present unto Eglon the king of Moab."
          reference="Judges 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Being lefthanded is stated as a plain fact about Ehud, not a flaw to overcome.</strong> It
            turns out to matter directly in a few verses, when a detail that sounds like trivia becomes the whole
            reason his plan works. Ehud is sent, officially, carrying Israel&apos;s tribute payment to the king who
            is oppressing them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Assassination in the Summer Parlour (verses 16 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Ehud ever reaches the king, he prepares a weapon no one is looking for.</p>
        </div>
        <VerseQuote
          text="But Ehud made him a dagger which had two edges, of a cubit length; and he did gird it under his raiment upon his right thigh."
          reference="Judges 3:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A right-handed man&apos;s weapon sits on his left side, where his drawing hand can reach it.
            Ehud straps his dagger to his right thigh, exactly where a guard searching a right-handed visitor would
            not think to check.</strong> His lefthandedness from verse 15 was never a side note. It is the entire
            plan.
          </p>
          <p>The tribute is delivered in full view. Then Ehud sends everyone else away and comes back alone.</p>
        </div>
        <VerseQuote
          text="And when he had made an end to offer the present, he sent away the people that bare the present. But he himself turned again from the quarries that were by Gilgal, and said, I have a secret errand unto thee, O king: who said, Keep silence. And all that stood by him went out from him."
          reference="Judges 3:18 and 19"
        />
        <VerseQuote
          text="And Ehud came unto him; and he was sitting in a summer parlour, which he had for himself alone. And Ehud said, I have a message from God unto thee. And he arose out of his seat."
          reference="Judges 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Eglon stands up out of respect for what he thinks is a word from heaven. The text calls Eglon &quot;a
            very fat man&quot; back in verse 17, a detail that is not mockery for its own sake. It explains why the
            king cannot react in time, and why the next verse ends the way it does.
          </p>
        </div>
        <VerseQuote
          text="And Ehud put forth his left hand, and took the dagger from his right thigh, and thrust it into his belly: And the haft also went in after the blade; and the fat closed upon the blade, so that he could not draw the dagger out of his belly; and the dirt came out."
          reference="Judges 3:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ehud does not retrieve the weapon. He locks the room from the outside and walks out past the king&apos;s
            own servants.
          </p>
        </div>
        <VerseQuote
          text="Then Ehud went forth through the porch, and shut the doors of the parlour upon him, and locked them."
          reference="Judges 3:23"
        />
        <VerseQuote
          text="And they tarried till they were ashamed: and, behold, he opened not the doors of the parlour; therefore they took a key, and opened them: and, behold, their lord was fallen down dead on the earth."
          reference="Judges 3:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The servants assume privacy, not danger.</strong> They wait outside a locked door out of
            embarrassment, giving Ehud the exact head start he needs to escape past the quarries to Seirath before
            anyone realizes what has happened.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Battle at the Fords of Jordan (verses 27 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ehud does not stay in hiding. He turns the assassination into a rallying call.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when he was come, that he blew a trumpet in the mountain of Ephraim, and the children of Israel went down with him from the mount, and he before them."
          reference="Judges 3:27"
        />
        <VerseQuote
          text="And he said unto them, Follow after me: for the LORD hath delivered your enemies the Moabites into your hand. And they went down after him, and took the fords of Jordan toward Moab, and suffered not a man to pass over."
          reference="Judges 3:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Blocking the fords cuts off the one way Moab&apos;s army could retreat back across the Jordan.
            Whatever panic Eglon&apos;s death caused inside Moab, Ehud makes sure it has nowhere to run.
          </p>
        </div>
        <VerseQuote
          text="And they slew of Moab at that time about ten thousand men, all lusty, and all men of valour; and there escaped not a man."
          reference="Judges 3:29"
        />
        <VerseQuote
          text="So Moab was subdued that day under the hand of Israel. And the land had rest fourscore years."
          reference="Judges 3:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Fourscore years, eighty years, is the longest single stretch of rest named anywhere in this
            book.</strong> Add up every number this chapter gives: eight years under Chushanrishathaim, forty years
            of rest after Othniel, eighteen years under Eglon, eighty years of rest after Ehud. That is a hundred
            and forty six years of Israel&apos;s history inside thirty one verses, most of it quiet, some of it not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Shamgar: One Verse, Six Hundred Men (verse 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends on the shortest judge story in the entire book.</p>
        </div>
        <VerseQuote
          text="And after him was Shamgar the son of Anath, which slew of the Philistines six hundred men with an ox goad: and he also delivered Israel."
          reference="Judges 3:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ No cry to the LORD is recorded before him. No years of oppression are numbered. No years of rest are
            given after him. An ox goad was a long farming pole used to drive cattle, not a weapon anyone would
            choose on purpose. The verse states the result and moves on: &quot;he also delivered Israel.&quot; Even
            with none of the usual markers of the cycle spelled out, the chapter still counts him among the
            deliverers.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Judges 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was it right for Ehud to say &quot;I have a message from God unto thee&quot; right before
            killing Eglon?</strong> What the text says: verse 20 has Ehud speak those exact words, and Eglon stands
            up in response, right before verse 21 describes the killing. How this is read: the chapter never
            comments on the morality of the line itself. It reports the deception as part of a plan God used to
            deliver an oppressed nation, the same way it reports the Bethel spy&apos;s mercy deal in Judges 1
            without weighing in on every detail of how victory was won. Judges narrates deliverance; it does not
            hand out a tactics manual to imitate in every situation.
          </p>
          <p>
            <strong>Does God raising up Ehud mean assassination is an approved method whenever a ruler is
            unjust?</strong> What the text says: verse 15 states plainly that the LORD raised up Ehud as Israel&apos;s
            deliverer from a specific, named oppressor who was actively enslaving God&apos;s people after they cried
            out. How this is read: the text ties this rescue to that particular situation, a conquered nation crying
            out under eighteen years of forced service, not to a general principle about removing any ruler someone
            judges to be bad. Judges never repeats this exact method again in the chapters that follow.
          </p>
          <p>
            <strong>Why does Othniel&apos;s rescue take three verses while Ehud&apos;s takes eleven?</strong> What
            the text says: verses 9 through 11 cover Othniel&apos;s entire judgeship, war, and death; verses 15
            through 29 give Ehud a detailed scene with dialogue and specific physical description. How this is
            read: the book of Judges is not an evenly weighted record. Each judge gets exactly as much space as the
            story needs to make its point, and the length given to a deliverer is not a measure of how important
            his rescue was.
          </p>
          <p>
            <strong>Is Shamgar actually one of the judges, or just a footnote between Ehud and Deborah?</strong>{" "}
            What the text says: verse 31 gives him no cry for help, no number of oppression years, and no stated
            rest afterward, yet it still calls him a deliverer of Israel in the same sentence structure used for
            Othniel and Ehud. How this is read: Bible teachers notice the missing details and read Shamgar either as
            a judge whose full story was simply never recorded, or as a transitional figure placed here to bridge
            to the next oppression under Jabin in Judges 4. The text itself does not explain the gap, only the
            result.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Judges 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Judges 3:9 and 10</h3>
        <VerseQuote
          text="And when the children of Israel cried unto the LORD, the LORD raised up a deliverer to the children of Israel, who delivered them, even Othniel the son of Kenaz, Caleb's younger brother. And the Spirit of the LORD came upon him, and he judged Israel, and went out to war: and the LORD delivered Chushanrishathaim king of Mesopotamia into his hand; and his hand prevailed against Chushanrishathaim."
          reference="Judges 3:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The cycle named in Judges 2 working exactly as promised, the very first time it gets tested in a real
          story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Judges 3:15</h3>
        <VerseQuote
          text="But when the children of Israel cried unto the LORD, the LORD raised them up a deliverer, Ehud the son of Gera, a Benjamite, a man lefthanded: and by him the children of Israel sent a present unto Eglon the king of Moab."
          reference="Judges 3:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A small, plain detail, a man&apos;s lefthandedness, stated here as fact and turned into the whole plan a
          few verses later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Judges 3:20 and 21</h3>
        <VerseQuote
          text="And Ehud came unto him; and he was sitting in a summer parlour, which he had for himself alone. And Ehud said, I have a message from God unto thee. And he arose out of his seat. And Ehud put forth his left hand, and took the dagger from his right thigh, and thrust it into his belly:"
          reference="Judges 3:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most vivid single scene in the chapter, a king standing in respect for a message that turns out to be
          his own death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Judges 3:30</h3>
        <VerseQuote
          text="So Moab was subdued that day under the hand of Israel. And the land had rest fourscore years."
          reference="Judges 3:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Eighty years, the longest stretch of rest anywhere in the book of Judges, following the strangest rescue
          in it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Judges 3:31</h3>
        <VerseQuote
          text="And after him was Shamgar the son of Anath, which slew of the Philistines six hundred men with an ox goad: and he also delivered Israel."
          reference="Judges 3:31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A whole judgeship told in a single sentence, with a farm tool standing in for a sword.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Judges 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Judges 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter names the nations God left to test Israel, then records the cycle from Judges 2 playing out
          three times. Israel intermarries with the remaining nations and serves Baal, gets sold to Chushanrishathaim
          of Mesopotamia for eight years until Othniel delivers them, falls again and serves Eglon of Moab for
          eighteen years until the left-handed Ehud assassinates him and leads Israel to victory at the Jordan, and
          closes with one verse about Shamgar killing six hundred Philistines with an ox goad.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Othniel in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Othniel was Caleb&apos;s younger brother, already introduced in Judges 1 for conquering Kirjathsepher and
          marrying Caleb&apos;s daughter Achsah. Judges 3:9 and 10 name him as Israel&apos;s first judge, delivered
          by the Spirit of the LORD to defeat Chushanrishathaim king of Mesopotamia after eight years of oppression.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Ehud, and why does it matter that he was left-handed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ehud was a Benjamite judge raised up to deliver Israel from eighteen years under Eglon king of Moab.
          Verse 16 has him strap his dagger to his right thigh, the side a guard checking a typical right-handed
          visitor would not search, which is exactly how he gets a hidden weapon into the king&apos;s private room.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Ehud kill Eglon?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ehud delivered Israel&apos;s tribute openly, sent the other messengers away, then returned alone claiming
          to have a message from God. When Eglon stood up to receive it, Ehud drew the hidden dagger with his left
          hand and stabbed him, locking the door behind him as he escaped before anyone discovered the body.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible call Eglon a fat man?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 17 states it as a plain physical fact, and it is not incidental. Verse 22 says the fat closed around
          the blade after the strike, which is part of why Eglon could not react or call for help before Ehud had
          already locked the door and fled.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God leave the Philistines, Canaanites, Sidonians, and Hivites in the land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 1 through 4 give two reasons together: to test whether Israel would obey the LORD, and to teach a
          generation that had never personally fought in Canaan how to go to war. The test was both about character
          and about survival skill the eyewitness generation had already learned the hard way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Shamgar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shamgar, son of Anath, gets exactly one verse. He killed six hundred Philistines with an ox goad, a long
          farming pole, and the text calls him a deliverer of Israel without recording any cry for help beforehand
          or any years of rest afterward, unlike Othniel and Ehud.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter list two different sets of nations in verses 3 and 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 3 names the Philistines, Canaanites, Sidonians, and Hivites of Lebanon as the outside test pressing
          on Israel&apos;s borders. Verse 5 names the Canaanites, Hittites, Amorites, Perizzites, Hivites, and
          Jebusites as the peoples Israel actually settled down among. The chapter is describing pressure from two
          directions at once, not repeating itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did the events of Judges 3 take?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Adding the chapter&apos;s own numbers together: eight years under Chushanrishathaim, forty years of rest
          after Othniel, eighteen years under Eglon, and eighty years of rest after Ehud comes to a hundred and
          forty six years, not counting whatever time Shamgar&apos;s unnumbered judgeship added on top.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the lesson of Judges 3 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That the cycle named in Judges 2, sin, judgment, deliverance, rest, is not a theory. It plays out three
          separate times in one chapter, through three very different people, and in every case the rescue begins
          the moment Israel actually cries out, not before.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judges 3 proves the pattern Judges 2 only described, three separate times, with three very different people.</p>
          <p>
            📌 <strong>A deliverer does not need to look like one in advance.</strong> A quiet brother of an old
            conqueror, a left-handed man from an unremarkable tribe, and a man swinging a farm tool all get called
            by the same word: deliverer.
          </p>
          <p>
            📌 <strong>The length of a story is not the size of the rescue.</strong> Othniel&apos;s whole judgeship
            fits in three verses. It still bought Israel forty years of peace.
          </p>
          <p>
            📌 <strong>The cry comes before the rescue, every single time.</strong> Chushanrishathaim and Eglon both
            only lose their grip after Israel actually cries out to the LORD, not the moment the oppression starts.
          </p>
          <p>
            You probably are not facing a king in a locked room. But you likely have something that has had its
            grip on you long enough that it stopped feeling worth crying out about.
          </p>
          <p>So here is your one next step.</p>
          <p>Name that thing honestly to God today, the way Israel finally did under Eglon, before you assume no deliverer is coming.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
