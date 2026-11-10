import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-9-explained", {
  title: "Joshua 9 Explained: The Gibeonites' Trick and the Unbreakable Oath",
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

export default function JoshuaNineExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-9-explained"
      title={<>📖 Joshua 9 Explained: The Gibeonites&apos; Trick and the Unbreakable Oath</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No army marches on Israel in this chapter. A costume does the work instead.</p>
            <p>
              <strong>Joshua 9 explained</strong> is the chapter where an entire city survives the conquest
              of Canaan without fighting a single battle. The Gibeonites look at what happened to Jericho and
              Ai and decide the only way to live is to lie their way into a treaty Israel can never take
              back, even after the lie is found out.
            </p>
            <p>Maybe you have made a promise you later wished you had checked into first.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did the Gibeonites dress up old bread and worn out sandals instead of just asking for peace?</li>
            <li>❓ Why does the text say Israel &quot;asked not counsel at the mouth of the LORD&quot; before making this deal?</li>
            <li>❓ Once Israel learns the truth, why can it not simply cancel an oath that was built on a lie?</li>
            <li>❓ Why does God let an entire city survive the conquest by becoming servants instead of soldiers?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Israel keeps a promise it never should have made this carelessly, and keeping it
              costs less than breaking it would have.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the coalition forming against
              Israel, the disguise Gibeon builds down to the crumbs in their bread bags, the oath Joshua
              swears without asking God first, the three day discovery, and the sentence that turns killers
              into servants without turning them into enemies.
            </p>
            <p>Watch how much of this chapter turns on words said too fast, and a promise kept anyway.</p>
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
            <ArticleLink href="/blog/joshua-8-explained">Joshua 8</ArticleLink> ended with Israel winning its
            second battle at Ai, then stopping everything to build an altar on Mount Ebal and read the
            entire law of Moses out loud to the whole nation, women and children included. The chapter
            closed on a picture of total obedience.
          </p>
        </div>
        <VerseQuote
          text="There was not a word of all that Moses commanded, which Joshua read not before all the congregation of Israel, with the women, and the little ones, and the strangers that were conversant among them."
          reference="Joshua 8:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jericho and Ai are both gone. Word of that travels fast in Canaan, and chapter 9 opens with two
            very different reactions to the same news. One group of kings decides to fight. One small group
            of cities decides to lie instead.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 9 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Coalition Forms, and One City Chooses a Different Path (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens wide, naming every kind of king Israel still faces in the land.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when all the kings which were on this side Jordan, in the hills, and in the valleys, and in all the coasts of the great sea over against Lebanon, the Hittite, and the Amorite, the Canaanite, the Perizzite, the Hivite, and the Jebusite, heard thereof; That they gathered themselves together, to fight with Joshua and with Israel, with one accord."
          reference="Joshua 9:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Six peoples are named in two verses, every major group still living in Canaan, and the text says
            they gather &quot;with one accord.&quot; That is the normal response to an invading army winning
            battle after battle. Build a bigger army and meet the threat head on.
          </p>
          <p>
            📌 <strong>Verse 3 breaks away from that pattern immediately.</strong> One group of cities looks
            at the same news and decides fighting is not the move at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Gibeon Builds a Disguise Out of Old Bread and Worn Sandals (verses 3 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gibeon hears the same news everyone else just heard, and chooses craft over combat.</p>
        </div>
        <VerseQuote
          text="And when the inhabitants of Gibeon heard what Joshua had done unto Jericho and to Ai, They did work wilily, and went and made as if they had been ambassadors, and took old sacks upon their asses, and wine bottles, old, and rent, and bound up;"
          reference="Joshua 9:3 and 4"
        />
        <VerseQuote
          text="And old shoes and clouted upon their feet, and old garments upon them; and all the bread of their provision was dry and mouldy."
          reference="Joshua 9:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Wilily</strong> means craftily, the same root word behind &quot;wily.&quot; This is not a
            quick lie told under pressure. Every detail is built ahead of time: torn sacks, cracked wine
            bottles, patched sandals, clothes chosen to look old, bread deliberately left to go stale and
            moldy before the trip. Nothing about this disguise was improvised.
          </p>
          <p>
            💡 Gibeon is not far from Gilgal at all, but the whole costume is designed to sell one specific
            lie: that these men have traveled so long and so far that everything they own has worn out along
            the way.
          </p>
        </div>
        <VerseQuote
          text="And they went to Joshua unto the camp at Gilgal, and said unto him, and to the men of Israel, We be come from a far country: now therefore make ye a league with us."
          reference="Joshua 9:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is a very different kind of deception than{" "}
            <ArticleLink href="/blog/joshua-2-explained">Rahab&apos;s choice in Joshua 2</ArticleLink>. Rahab
            hid two spies at real risk to her own life, and Scripture later praises her faith for it. Gibeon
            builds an elaborate hoax to secure a treaty, motivated by fear of being destroyed like Jericho
            and Ai. Both stories involve Canaanites and deception, but the chapter does not ask you to read
            them the same way.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Shortcut Israel Does Not Check First (verses 7 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Israel does not fall for the story instantly. There is at least one moment of real suspicion.</p>
        </div>
        <VerseQuote
          text="And the men of Israel said unto the Hivites, Peradventure ye dwell among us; and how shall we make a league with you?"
          reference="Joshua 9:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That question is exactly right. If these men live nearby, a treaty with them would directly
            contradict{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">
              the command Moses had already given in Deuteronomy 7
            </ArticleLink>
            , which forbids Israel from making any covenant with the nations living in the land it is about
            to take. Gibeon has to answer that exact objection, and they answer it with more of the same
            story.
          </p>
        </div>
        <VerseQuote
          text="And they said unto him, From a very far country thy servants are come because of the name of the LORD thy God: for we have heard the fame of him, and all that he did in Egypt, And all that he did to the two kings of the Amorites, that were beyond Jordan, to Sihon king of Heshbon, and to Og king of Bashan, which was at Ashtaroth."
          reference="Joshua 9:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice what the Gibeonites use to sell the lie. They quote back exactly what the LORD has
            already done for Israel, in Egypt and against Sihon and Og. They are not denying God&apos;s power.
            They are using the report of it as proof that they come from too far away to be a threat.
          </p>
          <p>They finish by pointing at the physical evidence they carried in on purpose.</p>
        </div>
        <VerseQuote
          text="This our bread we took hot for our provision out of our houses on the day we came forth to go unto you; but now, behold, it is dry, and it is mouldy: And these bottles of wine, which we filled, were new; and, behold, they be rent: and these our garments and our shoes are become old by reason of the very long journey."
          reference="Joshua 9:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the verse the whole chapter turns on.</p>
        </div>
        <VerseQuote
          text="And the men took of their victuals, and asked not counsel at the mouth of the LORD."
          reference="Joshua 9:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Twelve words describe Israel&apos;s whole mistake.</strong> They inspect the evidence
            with their own eyes, taste the bread with their own mouths, and never once stop to ask God what
            He sees that they cannot. Joshua had a priest with an ephod and, later in this same book, uses
            lots and direct inquiry of the LORD for far smaller decisions. Here, with a binding treaty on the
            table, nobody asks.
          </p>
        </div>
        <VerseQuote
          text="And Joshua made peace with them, and made a league with them, to let them live: and the princes of the congregation sware unto them."
          reference="Joshua 9:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The oath is not casual. Joshua personally makes peace, and the princes of the whole congregation
            swear to it. This is not one man&apos;s private promise. It binds the entire nation, which is
            exactly why it cannot be quietly undone once the truth comes out.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Truth Comes Out, Three Days Too Late (verses 16 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The lie does not even survive a week.</p>
        </div>
        <VerseQuote
          text="And it came to pass at the end of three days after they had made a league with them, that they heard that they were their neighbours, and that they dwelt among them."
          reference="Joshua 9:16"
        />
        <VerseQuote
          text="And the children of Israel journeyed, and came unto their cities on the third day. Now their cities were Gibeon, and Chephirah, and Beeroth, and Kirjathjearim."
          reference="Joshua 9:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Four cities, not one. The deception was never a single town&apos;s scheme. It covered an entire
            small confederation hiding in plain sight, close enough that Israel reaches all four of them in
            three days on foot.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel smote them not, because the princes of the congregation had sworn unto them by the LORD God of Israel. And all the congregation murmured against the princes."
          reference="Joshua 9:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what holds the army back.</strong> Not mercy toward Gibeon. Not a change of
            heart about the Canaanite nations. The oath was sworn in the name of the LORD, and that single
            fact outweighs everyone&apos;s anger, including the whole congregation&apos;s open complaint
            against its own leaders.
          </p>
        </div>
        <VerseQuote
          text="But all the princes said unto all the congregation, We have sworn unto them by the LORD God of Israel: now therefore we may not touch them."
          reference="Joshua 9:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The princes do not defend their own judgment here. They never claim the deal was wise. They
            only insist it must be kept, because the name invoked over it was God&apos;s own name, not
            theirs. A careless oath still carries the full weight of whose name was used to make it.
          </p>
        </div>
        <VerseQuote
          text="And Joshua called for them, and he spake unto them, saying, Wherefore have ye beguiled us, saying, We are very far from you; when ye dwell among us?"
          reference="Joshua 9:22"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Cursed, But Kept Alive (verses 22 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joshua confronts Gibeon directly, and their answer does not deny the lie. It explains the fear
            behind it.
          </p>
        </div>
        <VerseQuote
          text="And they answered Joshua, and said, Because it was certainly told thy servants, how that the LORD thy God commanded his servant Moses to give you all the land, and to destroy all the inhabitants of the land from before you, therefore we were sore afraid of our lives because of you, and have done this thing."
          reference="Joshua 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Gibeon admits the deception came from pure fear of death, not from any claim that the trick
            was justified. They had heard exactly what God told Moses about the land, believed every word of
            it, and lied their way around it instead of trusting Israel for mercy honestly.
          </p>
        </div>
        <VerseQuote
          text="Now therefore ye are cursed, and there shall none of you be freed from being bondmen, and hewers of wood and drawers of water for the house of my God."
          reference="Joshua 9:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The sentence is a curse, and it is also survival.</strong> Every other named city in
            this conquest that fights Israel is destroyed. Gibeon is cursed to permanent labor, cutting wood
            and drawing water for the altar of the LORD, and remains alive to do it. The judgment is real.
            So is the mercy folded inside it.
          </p>
        </div>
        <VerseQuote
          text="And Joshua made them that day hewers of wood and drawers of water for the congregation, and for the altar of the LORD, even unto this day, in the place which he should choose."
          reference="Joshua 9:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A city that lied its way out of war ends up serving at the one altar it never even asked about.
            Gibeon&apos;s whole future gets tied permanently to Israel&apos;s worship, not to Israel&apos;s
            battles.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 9 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Israel sin by making this covenant at all, since Moses forbade treaties with
            Canaan&apos;s nations?</strong> What the text says: verse 7 shows Israel raising this exact
            objection before agreeing to anything, and verse 14 states plainly that they &quot;asked not
            counsel at the mouth of the LORD&quot; before accepting Gibeon&apos;s story. How this is read:
            the chapter does not say God approved the process. It highlights the missing step, asking God
            first, as the real failure, distinct from the oath itself once it was sworn.
          </p>
          <p>
            <strong>Why could Israel not simply cancel an oath obtained through deliberate deception?</strong>{" "}
            What the text says: verses 18 and 19 tie the army&apos;s hands directly to the fact that the
            princes &quot;sworn unto them by the LORD God of Israel,&quot; not to any judgment about whether
            Gibeon deserved protection. How Christians read it: an oath sworn in God&apos;s name carries
            weight regardless of how the other side behaved to get it, a principle echoed later in Scripture
            about keeping a promise even when it costs you.
          </p>
          <p>
            <strong>Why punish Gibeon with servitude instead of either destroying them or simply forgiving
            them outright?</strong> What the text says: verse 23 pronounces a curse of permanent labor at
            the same time verse 15 and 26 confirm their lives are spared. How this fits: the chapter presents
            both as true at once, real judgment for real deception, and real mercy that keeps the oath Israel
            swore. Scripture does not resolve the tension by picking one side of it.
          </p>
          <p>
            <strong>Why does the text single out that Israel never asked the LORD, rather than blaming
            Gibeon alone?</strong> What the text says: verse 14 places the failure on Israel&apos;s own
            decision making, not only on the cleverness of the disguise. How this is read: Joshua 9 reads as
            a caution about moving fast on a decision that looks settled by the physical evidence in front of
            you, without ever stopping to ask God about it first.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 9:14</h3>
        <VerseQuote
          text="And the men took of their victuals, and asked not counsel at the mouth of the LORD."
          reference="Joshua 9:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The whole chapter&apos;s turning point in one short sentence. Evidence was checked. God was not
          asked. That gap is where the deception gets through.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 9:19</h3>
        <VerseQuote
          text="But all the princes said unto all the congregation, We have sworn unto them by the LORD God of Israel: now therefore we may not touch them."
          reference="Joshua 9:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise made in God&apos;s name outweighs an entire angry congregation. The leaders do not defend
          their wisdom here, only the word they already gave.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 9:23</h3>
        <VerseQuote
          text="Now therefore ye are cursed, and there shall none of you be freed from being bondmen, and hewers of wood and drawers of water for the house of my God."
          reference="Joshua 9:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Judgment and survival arrive in the same sentence. Gibeon is cursed, and Gibeon lives, tied forever
          to labor at the altar instead of a grave outside its own walls.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 9:24</h3>
        <VerseQuote
          text="And they answered Joshua, and said, Because it was certainly told thy servants, how that the LORD thy God commanded his servant Moses to give you all the land, and to destroy all the inhabitants of the land from before you, therefore we were sore afraid of our lives because of you, and have done this thing."
          reference="Joshua 9:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Gibeon&apos;s own confession. They believed every word God had spoken about the land, and still
          chose a lie over trusting Him for mercy honestly.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The people of Gibeon disguise themselves as travelers from a distant country and trick Israel into
          swearing a treaty of peace with them. Three days later Israel learns Gibeon actually lives nearby,
          but keeps the oath anyway and sentences the Gibeonites to permanent labor instead of destruction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Gibeonites trick Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 9:24 says they had heard exactly what God commanded Moses about destroying the land&apos;s
          inhabitants and were afraid for their lives. Rather than risk an honest appeal, they built an
          elaborate disguise to secure a treaty before Israel ever reached their cities.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Israel ask God before making the covenant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 9:14 states plainly that Israel inspected the physical evidence, the bread and the worn
          clothing, but never asked counsel at the mouth of the LORD. The chapter treats that missing step as
          Israel&apos;s real failure in the whole episode.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Israel allowed to make a covenant with a Canaanite city?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses had already commanded in Deuteronomy 7 that Israel make no covenant with the nations living
          in Canaan. Joshua 9:7 shows Israel raising that exact concern before Gibeon&apos;s disguise talked
          them past it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t Israel break the oath once they learned the truth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 9:18 and 19 tie Israel&apos;s hands to the fact that the princes had sworn the oath in the
          name of the LORD God of Israel. That made it binding regardless of how angry the rest of the
          congregation was once the deception came out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;hewers of wood and drawers of water&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes permanent manual labor, cutting firewood and carrying water, assigned to the
          Gibeonites in Joshua 9:23 and 27 for the congregation and the altar of the LORD. It replaced
          destruction with lasting servitude rather than freedom or death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Joshua 9 connect to Rahab&apos;s story in Joshua 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both involve Canaanites using deception around Israel&apos;s conquest, but the motives differ.
          Rahab risked her life to protect two spies out of faith in God, while Gibeon built an elaborate
          hoax purely out of fear of being destroyed, as Joshua 9:24 admits outright.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the Gibeonites later in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Years later, King Saul broke this same oath by attacking Gibeonite lives, and 2 Samuel 21 records
          a famine on Israel that was traced directly back to that broken covenant. The promise made in
          Joshua 9 still mattered generations after it was sworn.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the Gibeonites punished or saved?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both at once. Joshua 9:23 pronounces a real curse of servitude on them, while verses 15 and 26
          confirm their lives were spared under the same oath. The chapter holds judgment and mercy together
          without softening either one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>No battle gets fought in Joshua 9, and it is still one of the costliest chapters in the book.</p>
          <p>
            📌 <strong>Checking the evidence is not the same as asking God.</strong> Israel examined the
            bread and the sandals carefully and still missed the truth, because looking was never a
            substitute for asking.
          </p>
          <p>
            📌 <strong>A promise made in God&apos;s name outlasts the circumstances that produced it.</strong>{" "}
            The princes never defend the wisdom of the deal. They only keep the word they already gave,
            even against their own people&apos;s anger.
          </p>
          <p>
            📌 <strong>Judgment and mercy showed up in the same sentence for Gibeon.</strong> A curse that
            still lets you live is not the same as no consequence at all, and it is not the same as no mercy
            either.
          </p>
          <p>
            You probably will not face a disguised ambassador this week. But you will face a decision that
            looks settled before you have actually asked God about it.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Before you sign on to whatever looks convincing right now, stop and ask the question Israel
            skipped. Not what does the evidence show. What does God say.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
