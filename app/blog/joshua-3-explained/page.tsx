import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-3-explained", {
  title: "Joshua 3 Explained: Crossing the Jordan on Dry Ground",
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

export default function JoshuaThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-3-explained"
      title={<>📖 Joshua 3 Explained: Crossing the Jordan on Dry Ground</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A flooded river stands between Israel and the land God promised them. Nobody has a boat.</p>
            <p>
              <strong>Joshua 3 explained</strong> is the chapter where Israel finally crosses the
              Jordan, and the way it happens is not quiet or ordinary. The river is at flood stage.
              The ark of the covenant goes first, carried by priests who have to actually stand in the
              water before anything changes. And the whole nation watches a river stop moving in front
              of them.
            </p>
            <p>Maybe you have a Jordan of your own right now, something flooded that nobody can simply wade through.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did God wait for the river to flood instead of crossing when it was low?</li>
            <li>❓ Why did the people have to stay two thousand cubits back from the ark?</li>
            <li>❓ Is this the same miracle as the Red Sea, or something different?</li>
            <li>❓ Why does the chapter stop to pick twelve men before the crossing even finishes?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every detail in this chapter is aimed at one thing: making sure Israel knows
              this was God, not good timing or a lucky sandbar.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter: the three days of waiting, the
              instructions about the ark, the command to sanctify themselves, and the moment the water
              actually stops.
            </p>
            <p>Read slowly. This is the chapter where a new generation gets its own reason to trust God, instead of just hearing about their parents&apos; reasons.</p>
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
            <ArticleLink href="/blog/joshua-2-explained">Joshua 2</ArticleLink> ended with two spies
            slipping back across the Jordan into the camp at Shittim, carrying a report that had
            nothing to do with armies or walls. A Canaanite woman named <ArticleLink href="/blog/who-was-rahab">Rahab</ArticleLink>{" "}
            had already told them the LORD had given Israel the land, and the spies came back
            repeating her own words as Israel&apos;s official intelligence: the people of the land are
            already faint with fear.
          </p>
          <p>
            Before that, <ArticleLink href="/blog/joshua-1-explained">Joshua 1</ArticleLink> had God
            commissioning Joshua directly after Moses&apos; death, promising him the same presence
            Moses had, and ending with the whole nation vowing to obey him. The spies were sent out
            and had come back. The promise had been repeated. Everything up to this point has been
            preparation. Joshua 3 is the moment the preparation turns into movement.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Three Days at the River&apos;s Edge (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the whole nation on the move, but not yet across.</p>
        </div>
        <VerseQuote
          text="And Joshua rose early in the morning; and they removed from Shittim, and came to Jordan, he and all the children of Israel, and lodged there before they passed over."
          reference="Joshua 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Shittim to the Jordan was not a long march, but the text is specific that Israel
            <strong> lodged</strong> at the river rather than crossing the same day. The three day
            deadline Joshua had already given back in his first order as leader is now running out,
            and the next verse confirms it.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass after three days, that the officers went through the host; And they commanded the people, saying, When ye see the ark of the covenant of the LORD your God, and the priests the Levites bearing it, then ye shall remove from your place, and go after it."
          reference="Joshua 3:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The marching order is simple and total: watch the ark, then follow it.</strong>{" "}
            No map, no scouted route, no column order based on tribe or rank. The entire nation&apos;s
            movement is reduced to one visible object.
          </p>
        </div>
        <VerseQuote
          text="Yet there shall be a space between you and it, about two thousand cubits by measure: come not near unto it, that ye may know the way by which ye must go: for ye have not passed this way heretofore."
          reference="Joshua 3:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two thousand cubits is roughly a thousand yards, a distance meant to keep the ark clearly
            visible to the whole camp while keeping everyone well clear of it. The reason given is
            twofold: reverence for what the ark represents, and plain necessity, since nobody in this
            generation has ever walked this ground before.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Sanctify Yourselves (verse 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before any instructions about movement, Joshua gives one about the heart.</p>
        </div>
        <VerseQuote
          text="And Joshua said unto the people, Sanctify yourselves: for to morrow the LORD will do wonders among you."
          reference="Joshua 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Joshua announces the miracle before it happens. This is not a vague hope that God might
            show up. He tells the people, out loud, a day ahead of time, that wonders are coming.
          </p>
          <p>
            Sanctifying themselves meant the kind of ritual preparation Israel&apos;s law required
            before encountering God directly, the same posture Israel took before receiving the law at
            Sinai. 📌 <strong>What is about to happen is treated as an encounter with God Himself, not
            just a river crossing that happens to go well.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Ark Goes First, and God Explains Why (verses 6 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua gives the priests their part, then God tells Joshua what the whole day is really about.</p>
        </div>
        <VerseQuote
          text="And Joshua spake unto the priests, saying, Take up the ark of the covenant, and pass over before the people. And they took up the ark of the covenant, and went before the people."
          reference="Joshua 3:6"
        />
        <VerseQuote
          text="And the LORD said unto Joshua, This day will I begin to magnify thee in the sight of all Israel, that they may know that, as I was with Moses, so I will be with thee."
          reference="Joshua 3:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God repeats, almost word for word, the exact promise He already gave Joshua in
            Joshua 1:5.</strong> That promise was spoken in private, between God and Joshua alone.
            Today it is about to be proven in public, in front of every single person in the camp.
          </p>
          <p>Then comes the actual order the priests will carry out.</p>
        </div>
        <VerseQuote
          text="And thou shalt command the priests that bear the ark of the covenant, saying, When ye are come to the brink of the water of Jordan, ye shall stand still in Jordan."
          reference="Joshua 3:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice what the priests are told to do, and what they are not told. Nobody tells them
            the water will stop first and then they should step in. They are told to walk to the edge
            of a flooded river and stand still in it, with no promise yet visible that anything will
            change. The obedience comes before the proof.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. &quot;The Living God Is Among You&quot; (verses 9 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before anyone moves toward the water, Joshua stops the whole nation to explain what they are about to watch.</p>
        </div>
        <VerseQuote
          text="And Joshua said unto the children of Israel, Come hither, and hear the words of the LORD your God."
          reference="Joshua 3:9"
        />
        <VerseQuote
          text="And Joshua said, Hereby ye shall know that the living God is among you, and that he will without fail drive out from before you the Canaanites, and the Hittites, and the Hivites, and the Perizzites, and the Girgashites, and the Amorites, and the Jebusites."
          reference="Joshua 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Those seven names were not scattered tribes picked at random. Together they stood for the
            whole population already living in Canaan, the complete list of who Israel would have to
            face to take the land. Naming all seven before the river even moves is Joshua telling
            Israel plainly: this crossing is proof for everything still ahead, not just for today.
          </p>
          <p>
            📌 <strong>&quot;The living God&quot; is the point of the whole demonstration.</strong>{" "}
            Not a God who once acted at the Red Sea and then went quiet for forty years. A God active
            right now, in this generation, about to do something nobody in this camp has personally
            seen Him do before.
          </p>
        </div>
        <VerseQuote
          text="Behold, the ark of the covenant of the LORD of all the earth passeth over before you into Jordan."
          reference="Joshua 3:11"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Twelve Men Are Chosen Before the Crossing Finishes (verse 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right in the middle of the buildup, the chapter pauses for one short instruction that will not pay off until the next chapter.</p>
        </div>
        <VerseQuote
          text="Now therefore take you twelve men out of the tribes of Israel, out of every tribe a man."
          reference="Joshua 3:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Joshua 3 never explains what these twelve men are for. The chapter simply sets them
            apart, one from each tribe, and moves on. Whatever job they have been chosen for is left
            completely open until the memorial they build becomes the whole subject of the next
            chapter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Water Stops, and Israel Crosses on Dry Ground (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua tells the people exactly what sign to watch for, before it happens.</p>
        </div>
        <VerseQuote
          text="And it shall come to pass, as soon as the soles of the feet of the priests that bear the ark of the LORD, the LORD of all the earth, shall rest in the waters of Jordan, that the waters of Jordan shall be cut off from the waters that come down from above; and they shall stand upon an heap."
          reference="Joshua 3:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The trigger is specific: the moment the priests&apos; feet actually touch the water, not a
            moment before. Nothing happens on command from a safe distance. Someone has to step into a
            flooded river first.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, when the people removed from their tents, to pass over Jordan, and the priests bearing the ark of the covenant before the people; And as they that bare the ark were come unto Jordan, and the feet of the priests that bare the ark were dipped in the brim of the water, (for Jordan overfloweth all his banks all the time of harvest,)"
          reference="Joshua 3:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter stops its own action to make sure you notice the parenthetical: the
            Jordan was at flood stage.</strong> This was not a dry season crossing at a shallow ford.
            Harvest time in this region meant the river was swollen with melted snow from the north,
            at its widest and fastest all year. God did not pick an easy moment and call it a miracle
            afterward. He picked the hardest one on the calendar.
          </p>
        </div>
        <VerseQuote
          text="That the waters which came down from above stood and rose up upon an heap very far from the city Adam, that is beside Zaretan: and those that came down toward the sea of the plain, even the salt sea, failed, and were cut off: and the people passed over right against Jericho."
          reference="Joshua 3:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The &quot;city Adam&quot; here is a place name, a town beside Zaretan upstream from where
            Israel stood, not a reference to the first man in Genesis. The water backed up far enough
            north to clear the whole crossing point, while the water downstream toward the Dead Sea
            drained away and left the riverbed open, directly across from Jericho itself, the very
            city Israel would face next.
          </p>
        </div>
        <VerseQuote
          text="And the priests that bare the ark of the covenant of the LORD stood firm on dry ground in the midst of Jordan, and all the Israelites passed over on dry ground, until all the people were passed clean over Jordan."
          reference="Joshua 3:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The priests do not cross and then wait on the far bank. They stand in the middle of the
            riverbed, holding their position, for as long as it takes every single Israelite to pass.
            The miracle is not a brief flash. It holds steady for the whole length of the crossing.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did God have Israel cross when the river was flooded, instead of waiting for
            low water?</strong> What the text says: Joshua 3:15 specifically points out that the
            Jordan overflows its banks during harvest, right as it describes the crossing happening
            anyway. How it has been read: crossing at the hardest possible moment removes any room to
            credit good timing, a shallow season, or a lucky ford. A flooded river parting is
            unmistakably different from a shallow river being waded across.
          </p>
          <p>
            <strong>Why did the people have to stay two thousand cubits from the ark?</strong> What
            the text says: Joshua 3:4 gives two reasons, visibility for the whole camp and simple
            unfamiliarity with the route. What the rest of Scripture adds: the ark represented God&apos;s
            own presence, and Israel&apos;s law already warned that even the Levites assigned to carry
            sacred objects could die if they touched the wrong thing at the wrong time. The distance
            was reverence built into the architecture of the crossing itself, long before anyone
            learned the cost of treating the ark carelessly, the way Israel later would in{" "}
            <ArticleLink href="/blog/numbers-4-explained">Numbers 4</ArticleLink>.
          </p>
          <p>
            <strong>Is the Jordan crossing the same miracle as the Red Sea?</strong> What the text
            says: the language is close enough to be deliberate, waters standing up as a heap and the
            people walking through on dry ground. What is different: the generation that saw the{" "}
            <ArticleLink href="/blog/exodus-14-explained">Red Sea</ArticleLink> part had almost
            entirely died in the wilderness, the judgment described back in{" "}
            <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink>. Joshua 3 is not a
            replay for people who already believed. It is a brand new generation getting its own
            undeniable reason to trust the same God.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 3:17</h3>
        <VerseQuote
          text="And the priests that bare the ark of the covenant of the LORD stood firm on dry ground in the midst of Jordan, and all the Israelites passed over on dry ground, until all the people were passed clean over Jordan."
          reference="Joshua 3:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse the whole chapter has been building toward. A flooded river stays parted for as
          long as it takes an entire nation to walk through it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 3:7</h3>
        <VerseQuote
          text="And the LORD said unto Joshua, This day will I begin to magnify thee in the sight of all Israel, that they may know that, as I was with Moses, so I will be with thee."
          reference="Joshua 3:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A private promise from Joshua 1 becomes a public proof here. What God told Joshua alone is
          about to be seen by every person in the camp.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 3:13</h3>
        <VerseQuote
          text="And it shall come to pass, as soon as the soles of the feet of the priests that bear the ark of the LORD, the LORD of all the earth, shall rest in the waters of Jordan, that the waters of Jordan shall be cut off from the waters that come down from above; and they shall stand upon an heap."
          reference="Joshua 3:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sign was announced before it happened. Someone still had to step into the water first
          for the promise to mean anything.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 3:5</h3>
        <VerseQuote text="And Joshua said unto the people, Sanctify yourselves: for to morrow the LORD will do wonders among you." reference="Joshua 3:5" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua announces the miracle a full day ahead of time, treating the crossing as an encounter
          with God, not just a logistics problem solved.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 3:10</h3>
        <VerseQuote
          text="And Joshua said, Hereby ye shall know that the living God is among you, and that he will without fail drive out from before you the Canaanites, and the Hittites, and the Hivites, and the Perizzites, and the Girgashites, and the Amorites, and the Jebusites."
          reference="Joshua 3:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The crossing is explicitly tied to everything still ahead. A God who can stop a flooded river
          today can drive out seven nations tomorrow.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Joshua 3 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3 records Israel crossing the flooded Jordan River on dry ground, led by priests
          carrying the ark of the covenant. The waters upstream stood up as a heap while the water
          downstream drained away, opening a dry path directly across from Jericho.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Israel cross the Jordan River in Joshua 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Priests carried the ark of the covenant to the river first and stood in the water. The
          moment their feet touched it, the water flowing down from upstream stopped and piled up near
          a town called Adam, leaving the riverbed dry so the whole nation could walk across.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was the Jordan flooded when Israel crossed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3:15 notes that the Jordan overflows its banks during harvest time, which was exactly
          when Israel crossed. Choosing that moment rather than a dry season removed any question about
          whether the crossing was simply good timing on a shallow river.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the people have to stay two thousand cubits from the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3:4 gives a practical reason, keeping the ark visible to the whole camp since nobody
          had traveled this route before, alongside a reverent one: the ark represented God&apos;s own
          presence, and Israel&apos;s law already treated it as something to approach carefully, not
          casually.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Jordan crossing the same miracle as the Red Sea?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The two events share deliberate similarities, including water standing up as a heap and the
          people walking through on dry ground. But the generation crossing the Jordan had mostly never
          seen the Red Sea part, since the wilderness generation had died off. This crossing gave a new
          generation its own direct proof.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were the Canaanites, Hittites, Hivites, Perizzites, Girgashites, Amorites, and Jebusites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Together these seven names covered the whole population already living in the land of
          Canaan. Naming all seven in Joshua 3:10 was Joshua telling Israel that the same God who could
          stop a flooded river could also remove every nation still standing between them and the
          promised land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were twelve men chosen in Joshua 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3:12 sets apart one man from each of the twelve tribes but does not say why yet. Their
          purpose, building a memorial from stones taken out of the Jordan riverbed, is explained in
          the chapter that follows.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where exactly did Israel cross the Jordan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3:16 places the crossing directly across from Jericho, with the water piling up far
          upstream near a town called Adam, beside Zaretan. The dry ground opened at the exact point
          Israel needed to reach the city they would face next.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God would &quot;magnify&quot; Joshua?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In Joshua 3:7, God says the crossing will begin to magnify Joshua in the sight of all Israel,
          meaning the nation will visibly see that Joshua carries the same presence Moses once did.
          It was never about making Joshua look impressive for his own sake.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the priests have to stand in the water before it stopped?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 3:13 makes the priests&apos; feet touching the water the trigger for the waters being
          cut off, not something that happened before they stepped in. The obedience of walking toward
          a flooded river came before any visible sign that it would work.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 3 is a short chapter, and almost every verse in it is aimed at removing one excuse: that this was anything less than God.</p>
          <p>
            📌 <strong>God chose the hardest version of the crossing, not the easiest one.</strong> A
            flooded river at harvest time leaves no room to credit good timing instead of God.
          </p>
          <p>
            📌 <strong>Obedience came before the proof, not after it.</strong> The priests had to stand
            in the water with nothing yet visibly changed. Faith here looked like a wet first step.
          </p>
          <p>
            📌 <strong>A new generation needed its own reason to believe.</strong> Hearing about the
            Red Sea secondhand was never going to carry Israel into Canaan. They needed the Jordan
            parted in front of their own eyes.
          </p>
          <p>
            You probably have a flooded river of your own right now, something that will not simply
            dry up because you wait long enough.
          </p>
          <p>So here is your one next step.</p>
          <p>Read Joshua 3:13 again, and ask whether you are willing to take the first step toward it before you see anything change.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
