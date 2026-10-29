import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-21-explained", {
  title: "Numbers 21 Explained: The Bronze Serpent and Sihon's Defeat",
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

export default function NumbersTwentyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-21-explained"
      title={<>📖 Numbers 21 Explained: The Bronze Serpent and Sihon&apos;s Defeat</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A battle won. A plague of snakes. A pole lifted up that Jesus Himself would later point to.</p>
            <p>
              <strong>Numbers 21 explained</strong> is the chapter where this whole wandering story
              finally starts moving forward. After two straight chapters of death, burial, and a
              verdict that kept Moses and Aaron out of the promised land, Israel wins its first real
              battle, survives its own complaint turned deadly, and begins taking actual ground east
              of the Jordan.
            </p>
            <p>Maybe you have been in a season where nothing but bad news seemed to land.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God send snakes as punishment for the same old complaint He has heard for forty years?</li>
            <li>❓ Why does looking at a bronze snake on a pole heal a snakebite?</li>
            <li>❓ Isn&apos;t a bronze image exactly the kind of thing God told Israel never to make?</li>
            <li>❓ Who are Sihon and Og, and why does beating them matter so much?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter turns a symbol of the curse into the one place Israel could
              look and live, centuries before Jesus pointed back to it and said that is Me.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the victory at Hormah, the
              fiery serpents and the bronze serpent God provides, the long march with its strange
              little song to a well, and the two kings, Sihon and Og, whose defeat hands Israel its
              first real territory.
            </p>
            <p>A short chapter that covers more ground, literally and spiritually, than almost any other in Numbers.</p>
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
            <ArticleLink href="/blog/numbers-20-explained">Numbers 20</ArticleLink> closed out with
            two deaths and one verdict. Miriam died at Kadesh. Moses struck the rock instead of
            speaking to it, and both he and Aaron were told they would not enter the promised land
            because of it. Edom refused Israel safe passage along the king&apos;s highway, forcing a
            detour. Then Aaron himself died on Mount Hor, stripped of his priestly garments in full
            view of the camp, and the whole house of Israel mourned him thirty days.
          </p>
          <p>
            Numbers 21 picks up right where that detour leaves off. Israel is moving again, skirting
            Edom&apos;s border, and for the first time in a long while, the news in this book is not
            only grief and judgment. A fight breaks out, and Israel actually wins it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 21 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Victory at Hormah (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with an attack, not a complaint, for once.</p>
        </div>
        <VerseQuote
          text="And when king Arad the Canaanite, which dwelt in the south, heard tell that Israel came by the way of the spies; then he fought against Israel, and took some of them prisoners."
          reference="Numbers 21:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;The way of the spies&quot; is not a throwaway detail.</strong> It is
            the same route the twelve men took in{" "}
            <ArticleLink href="/blog/numbers-13-explained">Numbers 13</ArticleLink>, the mission that
            led to the whole generation&apos;s forty years of wandering when ten of them came back
            afraid. Israel is now walking, decades later, straight back through the territory that
            began this entire story. This time the response is different.
          </p>
        </div>
        <VerseQuote
          text="And Israel vowed a vow unto the LORD, and said, If thou wilt indeed deliver this people into my hand, then I will utterly destroy their cities. And the LORD hearkened to the voice of Israel, and delivered up the Canaanites; and they utterly destroyed them and their cities: and he called the name of the place Hormah."
          reference="Numbers 21:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Hormah means destruction. Instead of running from a threat the way the earlier
            generation ran from the giants&apos; report, this Israel vows, fights, and wins. It is a
            small, local battle, but after so many chapters of defeat and death inside the camp
            itself, it is the first time in a long while that the enemy, rather than Israel, is the
            one who loses.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Discouragement, Complaint, and Fiery Serpents (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The victory does not last long before the old pattern returns.</p>
        </div>
        <VerseQuote
          text="And they journeyed from mount Hor by the way of the Red sea, to compass the land of Edom: and the soul of the people was much discouraged because of the way."
          reference="Numbers 21:4"
        />
        <VerseQuote
          text="And the people spake against God, and against Moses, Wherefore have ye brought us up out of Egypt to die in the wilderness? for there is no bread, neither is there any water; and our soul loatheth this light bread."
          reference="Numbers 21:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the complaint is not just against Moses this time. It is against God
            directly, by name.</strong> The detour around Edom was long, and the people had heard
            this same promise of bread and water met before, more than once. What changes here is
            not the complaint. It is the response to it.
          </p>
        </div>
        <VerseQuote
          text="And the LORD sent fiery serpents among the people, and they bit the people; and much people of Israel died."
          reference="Numbers 21:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text does not give a death count here the way it does for some other judgments in
            this book. It only says &quot;much people of Israel died,&quot; a real and painful loss
            left without a number attached to it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Bronze Serpent on a Pole (verses 7 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This time, unlike some earlier complaints in this book, the people respond immediately.</p>
        </div>
        <VerseQuote
          text="Therefore the people came to Moses, and said, We have sinned, for we have spoken against the LORD, and against thee; pray unto the LORD, that he take away the serpents from us. And Moses prayed for the people."
          reference="Numbers 21:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No argument, no blame shifted onto someone else. &quot;We have sinned&quot;
            comes first, and Moses prays for the very people who had just complained against
            him.</strong> God&apos;s answer, though, is not simply to remove the serpents.
          </p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Make thee a fiery serpent, and set it upon a pole: and it shall come to pass, that every one that is bitten, when he looketh upon it, shall live."
          reference="Numbers 21:8"
        />
        <VerseQuote
          text="And Moses made a serpent of brass, and put it upon a pole, and it came to pass, that if a serpent had bitten any man, when he beheld the serpent of brass, he lived."
          reference="Numbers 21:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The cure looks like the curse. A bronze snake, shaped like the very thing biting
            them, lifted up where a bitten person had to look at it on purpose to live. There was
            nothing in the metal itself that healed anyone. The healing was tied to simple, visible
            obedience: look, and live.
          </p>
          <p>
            ⚠️ <strong>This is the only place in the law where God commands an image to be
            made and looked at, after spending so much of this book guarding Israel from exactly
            that kind of worship.</strong> The difference is not subtle once you read it closely.
            The serpent was never worshiped here. It was looked at, once, as an act of trust in
            what God said He would do through it.
          </p>
          <p>
            Centuries later, Jesus reached back to this exact image to explain His own purpose.
          </p>
        </div>
        <VerseQuote text="And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:" reference="John 3:14" />
        <VerseQuote text="That whosoever believeth in him should not perish, but have eternal life." reference="John 3:15" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a later interpretation layered onto the text. It is Jesus&apos;
            own words, comparing His own death directly to this bronze serpent lifted up on a
            pole.</strong> A dying people, bitten by their own sin, told to look at the one thing
            lifted up for them and live. Jesus says that pattern is Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Long March and the Song of the Well (verses 10 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After the crisis passes, the chapter slows down into a travel log, naming one stop after
            another as Israel presses toward Moab.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel set forward, and pitched in Oboth. And they journeyed from Oboth, and pitched at Ijeabarim, in the wilderness which is before Moab, toward the sunrising."
          reference="Numbers 21:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The text even cites an outside source for part of this itinerary, &quot;the book of
            the wars of the LORD,&quot; a record that no longer survives anywhere today. Scripture
            quotes it by name here without explaining what else it contained or where it went. It is
            one of several ancient documents the Bible mentions in passing that simply have not come
            down to us.
          </p>
          <p>At one stop, the mood shifts from a bare list of names into an actual song.</p>
        </div>
        <VerseQuote
          text="And from thence they went to Beer: that is the well whereof the LORD spake unto Moses, Gather the people together, and I will give them water."
          reference="Numbers 21:16"
        />
        <VerseQuote
          text="Then Israel sang this song, Spring up, O well; sing ye unto it: The princes digged the well, the nobles of the people digged it, by the direction of the lawgiver, with their staves."
          reference="Numbers 21:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this to verse 5, where the same nation complained bitterly about no
            water and no bread.</strong> Here, when the water comes, the response is singing, with
            the princes and nobles themselves doing the digging rather than leaving it to someone
            else. One generation&apos;s worth of water crises produced one angry complaint and, right
            here, one genuine song. Both responses sit inside the very same chapter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Sihon King of the Amorites Defeated (verses 21 to 32)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel tries the same approach that failed with Edom, this time with the Amorite king
            who controls the road ahead.
          </p>
        </div>
        <VerseQuote
          text="And Israel sent messengers unto Sihon king of the Amorites, saying, Let me pass through thy land: we will not turn into the fields, or into the vineyards; we will not drink of the waters of the well: but we will go along by the king’s high way, until we be past thy borders."
          reference="Numbers 21:21 and 22"
        />
        <VerseQuote
          text="And Sihon would not suffer Israel to pass through his border: but Sihon gathered all his people together, and went out against Israel into the wilderness: and he came to Jahaz, and fought against Israel."
          reference="Numbers 21:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Sihon is not provoked. He is the one who gathers his army and marches out to
            attack Israel first,</strong> after being offered the exact same courteous request Edom
            had already refused. Where Israel turned away from Edom rather than fight a relative,
            there is no such restraint required here. Sihon starts the battle, and Israel finishes it.
          </p>
        </div>
        <VerseQuote
          text="And Israel smote him with the edge of the sword, and possessed his land from Arnon unto Jabbok, even unto the children of Ammon: for the border of the children of Ammon was strong."
          reference="Numbers 21:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is new. Not a battle survived, not a plague ended, but actual land taken and held,
            the first real territory Israel possesses anywhere in this whole book. The text pauses to
            quote a taunting proverb about the fallen city of Heshbon.
          </p>
        </div>
        <VerseQuote
          text="Wherefore they that speak in proverbs say, Come into Heshbon, let the city of Sihon be built and prepared: For there is a fire gone out of Heshbon, a flame from the city of Sihon: it hath consumed Ar of Moab, and the lords of the high places of Arnon."
          reference="Numbers 21:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This proverb was not written about Israel. It describes Sihon&apos;s own earlier
            conquest of Moab, before Israel ever arrived, quoted here to show how thoroughly the
            city Israel just took had already changed hands by force once before. Heshbon falls to
            Israel the same way it had fallen to Sihon.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Og King of Bashan Defeated (verses 33 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One king down, Israel turns north, and a second king comes out to meet them the same way Sihon did.</p>
        </div>
        <VerseQuote
          text="And they turned and went up by the way of Bashan: and Og the king of Bashan went out against them, he, and all his people, to the battle at Edrei."
          reference="Numbers 21:33"
        />
        <VerseQuote
          text="And the LORD said unto Moses, Fear him not: for I have delivered him into thy hand, and all his people, and his land; and thou shalt do to him as thou didst unto Sihon king of the Amorites, which dwelt at Heshbon."
          reference="Numbers 21:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Fear him not&quot; is worth sitting with.</strong> Og was known later in
            Scripture as a king of unusual size, and his approach with his whole army could easily
            have revived the same fear that paralyzed the earlier generation back at{" "}
            <ArticleLink href="/blog/numbers-14-explained">Kadesh-barnea</ArticleLink>. This time God
            names the outcome before the battle even starts.
          </p>
        </div>
        <VerseQuote
          text="So they smote him, and his sons, and all his people, until there was none left him alive: and they possessed his land."
          reference="Numbers 21:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two kings, two kingdoms, taken in a single chapter. This land east of the Jordan,
            stretching from the Arnon to Bashan, becomes the first real inheritance Israel ever
            holds, and it sets up the territory the tribes of Reuben, Gad, and half of Manasseh will
            later settle in, long before the rest of the nation ever crosses into Canaan itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 21 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did God send fiery serpents for a complaint He had heard many times
            before?</strong> The text does not explain why this particular complaint, in verse 5,
            drew this particular judgment when earlier complaints in this book drew other
            responses. What is clear from the chapter itself is that the people recognized it as sin
            immediately, in verse 7, without the text excusing the complaint either way.
          </p>
          <p>
            <strong>Isn&apos;t making a bronze image exactly what the law forbids?</strong> God
            Himself commands this specific image in verse 8, the only time in the law He does so.
            The text draws a clear line between making the serpent, which God commanded, and
            worshiping it, which He never commanded and which later became a real problem. Centuries
            later, King Hezekiah had to deal with exactly that drift.
          </p>
        </div>
        <VerseQuote
          text="He removed the high places, and brake the images, and cut down the groves, and brake in pieces the brasen serpent that Moses had made: for unto those days the children of Israel did burn incense to it: and he called it Nehushtan."
          reference="2 Kings 18:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            By Hezekiah&apos;s time, people were burning incense to the very object Moses had made at
            God&apos;s own instruction, centuries after it had done its job. Hezekiah destroyed it.
            The object God commanded in Numbers 21 and the idol some of Israel later made of it are
            not treated as the same thing by the text.
          </p>
          <p>
            <strong>Does the bronze serpent actually point to Jesus, or is that read into the
            text?</strong> Numbers 21 itself makes no mention of a future savior. It is Jesus Himself,
            not a later Christian interpreter, who draws the comparison directly in John 3:14 and 15,
            naming His own being lifted up as the fulfillment of what Moses lifted up in the
            wilderness.
          </p>
          <p>
            <strong>Was Israel the aggressor against Sihon and Og?</strong> The text says otherwise
            on both counts. Verses 21 through 23 show Israel asking only for peaceful passage, the
            same request already refused by Edom, before Sihon gathers his army and attacks first.
            Verse 33 shows Og marching out against Israel the same way. Neither battle in this chapter
            opens with an Israelite attack.
          </p>
          <p>
            <strong>Why is the place called Hormah here, when Numbers 14:45 already used that same
            name for an earlier Israelite defeat in roughly the same region?</strong> Scripture
            records both without reconciling them. One possibility the text leaves open is that the
            name was given, or confirmed, more than once for the same general area across different
            events separated by decades. The text itself does not resolve the overlap, and neither
            should a reader claim more certainty about it than Scripture gives.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 21:8 and 9</h3>
        <VerseQuote
          text="And the LORD said unto Moses, Make thee a fiery serpent, and set it upon a pole: and it shall come to pass, that every one that is bitten, when he looketh upon it, shall live."
          reference="Numbers 21:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A cure shaped like the curse, lifted up where a dying person had to choose to look at it.
          The healing was always tied to trust, not to the metal itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 3:14 and 15</h3>
        <VerseQuote text="And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life." reference="John 3:14 and 15" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Jesus Himself names this chapter as a picture of His own death, long before any Christian
          writer drew the comparison for Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 21:3</h3>
        <VerseQuote
          text="And the LORD hearkened to the voice of Israel, and delivered up the Canaanites; and they utterly destroyed them and their cities: and he called the name of the place Hormah."
          reference="Numbers 21:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first clean victory in a book that had mostly recorded defeat, death, and judgment up
          to this point. Hormah means destruction, and for once it describes the enemy&apos;s fate,
          not Israel&apos;s.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 21:17</h3>
        <VerseQuote text="Then Israel sang this song, Spring up, O well; sing ye unto it:" reference="Numbers 21:17" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same nation that complained bitterly about thirst a few verses earlier breaks into song
          when the water actually comes. Both reactions sit in the very same chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 21:34</h3>
        <VerseQuote
          text="And the LORD said unto Moses, Fear him not: for I have delivered him into thy hand, and all his people, and his land; and thou shalt do to him as thou didst unto Sihon king of the Amorites, which dwelt at Heshbon."
          reference="Numbers 21:34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise given before the battle, not after. God names the outcome ahead of time, against
          a king whose size alone could have revived the same fear that cost the earlier generation
          its future.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 21 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 21 covers Israel&apos;s victory over king Arad at Hormah, the plague of fiery
          serpents and the bronze serpent God provides to heal those bitten, the journey toward
          Moab including a song at a well, and the defeat of two kings, Sihon of the Amorites and Og
          of Bashan, which gives Israel its first real territory.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God send fiery serpents to punish Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 21:5 and 6 record the people speaking against both God and Moses over the long
          detour, and serpents being sent among them as a result. The text states the judgment
          without fully explaining why this complaint specifically drew this response.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the bronze serpent, and why did looking at it heal people?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 21:8 and 9 describe a serpent of brass set on a pole at God&apos;s command.
          Anyone bitten who looked at it lived. The healing was tied to the act of trusting and
          obeying what God said He would do, not to any power in the metal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Isn&apos;t the bronze serpent an idol, the kind of image God forbids?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God Himself commands this one image in verse 8, which sets it apart from the idols the law
          forbids elsewhere. It became a problem only centuries later, when people started burning
          incense to it, and 2 Kings 18:4 records King Hezekiah destroying it for that reason.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does the bronze serpent connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus makes the connection Himself in John 3:14 and 15, comparing His own being lifted up
          to the serpent Moses lifted up in the wilderness, so that whoever looks to Him in faith
          would live.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the bronze serpent later?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It survived for centuries until people began worshiping it. 2 Kings 18:4 says King
          Hezekiah broke it in pieces and called it Nehushtan, removing it along with other objects
          Israel had turned into idols.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Sihon and Og?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sihon was king of the Amorites at Heshbon, and Og was king of Bashan further north.
          Numbers 21:21 through 35 records both kings attacking Israel first, and Israel defeating
          both and taking their land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does defeating Sihon and Og matter so much?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is the first real territory Israel possesses in the entire book of Numbers, land
          east of the Jordan that later becomes the inheritance of the tribes of Reuben, Gad, and
          half of Manasseh, well before the rest of the nation crosses into Canaan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is &quot;the book of the wars of the LORD&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 21:14 quotes it by name as a source for part of Israel&apos;s travel record. It
          does not survive anywhere today, and Scripture does not describe its full contents or what
          happened to it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Israel sing a song to a well?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 21:16 through 18 records the princes and nobles themselves digging the well at
          Beer, and the nation responding with song rather than complaint, a striking contrast to the
          bitter water complaint earlier in the very same chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 21 covers more emotional ground than its length suggests.</p>
          <p>
            📌 <strong>The same chapter holds a deadly complaint and a joyful song.</strong> Verse 5
            records bitter words over thirst. A few verses later, the people sing over a well their
            own princes dug. Both responses to hardship are real, and they sit side by side here.
          </p>
          <p>
            📌 <strong>The cure for the curse was never hidden. It was lifted up to be looked
            at.</strong> The bronze serpent healed no one who refused to look. Centuries later, Jesus
            said that was always a picture of Himself.
          </p>
          <p>
            📌 <strong>God named the victory before the battle started.</strong> &quot;Fear him
            not&quot; came before Og&apos;s army ever reached Israel. The fear that cost the earlier
            generation its future never got the chance to take root here.
          </p>
          <p>
            You are probably not facing fiery serpents or an army at Edrei this week. But you likely
            know what it is to be worn down by a long detour, and to need something simple to look at
            instead of something complicated to fix on your own.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Whatever is biting at you right now, bring it honestly to God the way Israel finally did
            in verse 7, instead of carrying it quietly until it spreads.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
