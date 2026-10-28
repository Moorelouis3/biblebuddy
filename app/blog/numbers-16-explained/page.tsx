import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-16-explained", {
  title: "Numbers 16 Explained: Korah's Rebellion Against Moses and Aaron",
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

export default function NumbersSixteenExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-16-explained"
      title={<>📖 Numbers 16 Explained: Korah&apos;s Rebellion Against Moses and Aaron</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two hundred and fifty respected leaders stand up at once and say Moses has grabbed more power than God ever gave him.</p>
            <p>
              <strong>Numbers 16 explained</strong> is the chapter where that accusation ends with the ground itself
              splitting open and swallowing men whole, in front of the entire camp. Korah starts it. Dathan and
              Abiram escalate it into something uglier. Two hundred and fifty princes back it with their names. By
              the time it is over, the earth has opened once and fire has fallen once, and that is still not the end
              of the dying in this chapter.
            </p>
            <p>Maybe you have questioned why someone else holds the authority they hold, and told yourself your complaint was really about fairness.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Was Korah angry about the priesthood, or about something closer to civil power?</li>
            <li>❓ Why did Dathan and Abiram&apos;s complaint sound like an entirely different argument from Korah&apos;s?</li>
            <li>❓ Did Korah&apos;s own sons die with him?</li>
            <li>❓ Why did fourteen thousand seven hundred more people die after the ground had already swallowed the ringleaders?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Korah never disputes that Moses leads Israel. He disputes that Moses and Aaron alone should
              stand this close to God.</strong> That distinction is the whole chapter.
            </p>
            <p>
              This walkthrough covers the chapter in order: who actually joined the rebellion and why their reasons
              did not match, Moses&apos; strange test with censers and fire, Dathan and Abiram&apos;s refusal to even
              show up, the earth opening and the fire falling, the censers turned into a permanent warning, and the
              plague that still had to be stopped after all of that.
            </p>
            <p>A chapter about who gets to come near God, and what it costs to decide that for yourself.</p>
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
            <ArticleLink href="/blog/numbers-15-explained">Numbers 15</ArticleLink> closed with a man stoned for
            gathering sticks on the Sabbath, a known command broken openly, and a blue fringe commanded for every
            garment so Israel would stop following its own eyes instead of God&apos;s word. The camp had just been
            handed a hard lesson about what it costs to defy God with a high hand rather than stumble into sin by
            accident.
          </p>
          <p>
            Numbers 16 is that same lesson aimed somewhere new. This is not a stranger breaking a Sabbath law. This
            is Moses&apos; own cousin, a Levite with real standing in the camp, along with two Reubenite leaders and
            two hundred and fifty respected princes, deciding in broad daylight that the line God drew around who
            comes near Him did not apply to them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 16 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Korah, Dathan, Abiram, and Two Hundred and Fifty Princes Rise Up (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming exactly who is behind this, and the list is not a random crowd.</p>
        </div>
        <VerseQuote
          text="Now Korah, the son of Izhar, the son of Kohath, the son of Levi, and Dathan and Abiram, the sons of Eliab, and On, the son of Peleth, sons of Reuben, took men: And they rose up before Moses, with certain of the children of Israel, two hundred and fifty princes of the assembly, famous in the congregation, men of renown:"
          reference="Numbers 16:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Korah is Moses and Aaron&apos;s own first cousin.</strong> Kohath had two sons named in
            Exodus 6:18 and 20, Amram and Izhar. Amram&apos;s sons were Moses and Aaron. Izhar&apos;s son was Korah.
            This was never an outsider attacking the family. It was family, questioning the one piece of the family
            business he had not been given.
          </p>
          <p>
            Dathan, Abiram, and On come from a completely different tribe, Reuben, Jacob&apos;s firstborn son, a
            line that had already lost its birthright standing generations earlier. These five men did not start
            from the same grievance, but the text says they &quot;took men&quot; and joined forces anyway, pulling
            in two hundred and fifty princes who were not nobodies. They were &quot;famous in the congregation,
            men of renown,&quot; exactly the kind of leaders whose names would carry weight the moment they put them
            behind a complaint. This is also not the first time Moses&apos; own family circle had tested his
            standing. <ArticleLink href="/blog/numbers-12-explained">Numbers 12</ArticleLink> already showed Miriam
            and Aaron questioning whether Moses alone should speak for God. Numbers 16 is that same question, aimed
            now at both brothers together, and backed by far more people.
          </p>
          <p>Then comes the complaint itself, aimed at both Moses and Aaron together.</p>
        </div>
        <VerseQuote
          text="And they gathered themselves together against Moses and against Aaron, and said unto them, Ye take too much upon you, seeing all the congregation are holy, every one of them, and the LORD is among them: wherefore then lift ye up yourselves above the congregation of the LORD?"
          reference="Numbers 16:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the argument&apos;s shape. It sounds almost reasonable. The whole congregation is holy, the
            LORD is among all of them, so why should two men stand above everyone else. It is a half truth doing
            the work of a lie. Israel was called holy as a nation. That never meant every role inside the nation was
            interchangeable, and the rest of the chapter is God answering that exact confusion.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Moses Falls on His Face, Then Sets a Test With Censers (verses 4 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses does not argue back right away. He goes to the ground first.</p>
        </div>
        <VerseQuote
          text="And when Moses heard it, he fell upon his face: And he spake unto Korah and unto all his company, saying, Even to morrow the LORD will shew who are his, and who is holy; and will cause him to come near unto him: even him whom he hath chosen will he cause to come near unto him."
          reference="Numbers 16:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rather than settle it by argument, <ArticleLink href="/blog/moses">Moses</ArticleLink> hands the
            decision straight back to God. He tells Korah and his company to bring censers and incense the next day,
            the same tools the priesthood used before the LORD, and let God show who He has actually chosen.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto Korah, Hear, I pray you, ye sons of Levi: Seemeth it but a small thing unto you, that the God of Israel hath separated you from the congregation of Israel, to bring you near to himself to do the service of the tabernacle of the LORD, and to stand before the congregation to minister unto them? And he hath brought thee near to him, and all thy brethren the sons of Levi with thee: and seek ye the priesthood also?"
          reference="Numbers 16:8 to 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Here is the precise shape of Korah&apos;s complaint.</strong> The Levites already had a job no
            other tribe had: carrying, guarding, and serving at the tabernacle, already &quot;brought near&quot; in a
            way most of Israel was not. Korah&apos;s problem was not being shut out of worship. It was wanting the
            one role, the priesthood itself, that God had reserved for Aaron&apos;s line alone. Moses names it
            plainly: &quot;seek ye the priesthood also.&quot; Not enough access was never the issue. A specific office
            was.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Dathan and Abiram Refuse to Even Show Up (verses 12 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses sends for Dathan and Abiram next, part of the same generation{" "}
            <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink> had already sentenced to die in
            the wilderness for refusing to trust God for the land, and their answer reveals a grievance that has
            nothing to do with censers or priesthood at all.
          </p>
        </div>
        <VerseQuote
          text="And Moses sent to call Dathan and Abiram, the sons of Eliab: which said, We will not come up: Is it a small thing that thou hast brought us up out of a land that floweth with milk and honey, to kill us in the wilderness, except thou make thyself altogether a prince over us?"
          reference="Numbers 16:12 and 13"
        />
        <VerseQuote
          text="Moreover thou hast not brought us into a land that floweth with milk and honey, or given us inheritance of fields and vineyards: wilt thou put out the eyes of these men? we will not come up."
          reference="Numbers 16:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read that carefully. Dathan and Abiram call Egypt, the house of their slavery, &quot;a land
            that floweth with milk and honey.&quot;</strong> That exact phrase belongs to Canaan everywhere else in
            this book. These two men have rewritten their own history until slavery sounds like the good old days
            and the actual promised land sounds like a lie Moses told to make himself a prince. This is not a
            complaint about who gets to burn incense. It is a flat accusation that Moses invented the whole mission
            for his own power, and a refusal to even appear before him to discuss it.
          </p>
          <p>Moses answers, not to them, but to God.</p>
        </div>
        <VerseQuote
          text="And Moses was very wroth, and said unto the LORD, Respect not thou their offering: I have not taken one ass from them, neither have I hurt one of them."
          reference="Numbers 16:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Not one donkey taken, not one man harmed. Moses has nothing to defend because he has done nothing to
            defend himself from. His anger is not wounded pride. It is the frustration of a man being accused of
            exactly the kind of self serving leadership he has spent years refusing to practice.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. All Israel Gathers; the Glory of the LORD Appears (verses 16 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The test Moses proposed goes forward, and Korah widens it far past his original two hundred and fifty.</p>
        </div>
        <VerseQuote
          text="And they took every man his censer, and put fire in them, and laid incense thereon, and stood in the door of the tabernacle of the congregation with Moses and Aaron. And Korah gathered all the congregation against them unto the door of the tabernacle of the congregation: and the glory of the LORD appeared unto all the congregation."
          reference="Numbers 16:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            👀 Korah does not stop at two hundred and fifty princes. He brings the whole congregation to watch, as if
            putting the decision to a crowd could change what God had already decided. The glory of the LORD answers
            by showing up for everyone to see, and what He says next is aimed at every single person standing there.
          </p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses and unto Aaron, saying, Separate yourselves from among this congregation, that I may consume them in a moment."
          reference="Numbers 16:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses and Aaron do not step back and let that happen. They fall on their faces and intercede, immediately.</p>
        </div>
        <VerseQuote
          text="And they fell upon their faces, and said, O God, the God of the spirits of all flesh, shall one man sin, and wilt thou be wroth with all the congregation?"
          reference="Numbers 16:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The exact men Korah just accused of claiming too much authority are the ones who throw
            themselves down to beg mercy for the crowd that had turned against them.</strong> God answers by
            narrowing the judgment Himself, telling the congregation to get away from Korah, Dathan, and
            Abiram&apos;s tents rather than wiping out everyone who had simply gathered to watch.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Earth Opens; Fire Falls (verses 23 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses walks to Dathan and Abiram&apos;s tents himself and warns the rest of the camp to step back,
            laying out exactly how they will know this judgment is real.
          </p>
        </div>
        <VerseQuote
          text="And Moses said, Hereby ye shall know that the LORD hath sent me to do all these works; for I have not done them of mine own mind. If these men die the common death of all men, or if they be visited after the visitation of all men; then the LORD hath not sent me. But if the LORD make a new thing, and the earth open her mouth, and swallow them up, with all that appertain unto them, and they go down quick into the pit; then ye shall understand that these men have provoked the LORD."
          reference="Numbers 16:28 to 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses stakes his own credibility on something nobody could fake or explain away. An ordinary death, even
            a sudden one, would prove nothing. Only something the camp had never seen before would settle the
            question of whether this was God acting or Moses acting alone.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, as he had made an end of speaking all these words, that the ground clave asunder that was under them: And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation."
          reference="Numbers 16:31 to 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The timing is the point.</strong> The ground splits the moment Moses stops speaking, not an
            hour later, not after some ambiguous delay the camp could argue about. &quot;Went down alive into the
            pit&quot; is as specific and unmistakable as a judgment can be. The panic it caused was immediate too.
          </p>
        </div>
        <VerseQuote
          text="And all Israel that were round about them fled at the cry of them: for they said, Lest the earth swallow us up also."
          reference="Numbers 16:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A separate judgment falls on the two hundred and fifty men still standing at the tabernacle with their censers.</p>
        </div>
        <VerseQuote
          text="And there came out a fire from the LORD, and consumed the two hundred and fifty men that offered incense."
          reference="Numbers 16:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two different judgments, in the same hour, matched to where each group stood. The earth opened under
            the tents of the men who refused to even show up for the test. Fire fell on the men who did show up,
            censers in hand, asking God to prove them right. Neither group got to choose which one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Censers Become a Permanent Warning (verses 36 to 40)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not let the two hundred and fifty censers simply get discarded with the men who held them.</p>
        </div>
        <VerseQuote
          text="Speak unto Eleazar the son of Aaron the priest, that he take up the censers out of the burning, and scatter thou the fire yonder; for they are hallowed. The censers of these sinners against their own souls, let them make them broad plates for a covering of the altar: for they offered them before the LORD, therefore they are hallowed: and they shall be a sign unto the children of Israel."
          reference="Numbers 16:37 and 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The very metal these men brought to challenge the priesthood ends up hammered into a covering
            for the altar, the priesthood&apos;s own furniture.</strong> Every time a priest afterward approached
            that altar, he would be looking at bronze that once belonged to two hundred and fifty men who tried to
            take his job and did not survive the attempt. That is what verse 40 says the plates were actually for.
          </p>
        </div>
        <VerseQuote
          text="To be a memorial unto the children of Israel, that no stranger, which is not of the seed of Aaron, come near to offer incense before the LORD; that he be not as Korah, and as his company: as the LORD said to him by the hand of Moses."
          reference="Numbers 16:40"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. A New Complaint, a Plague, and Aaron Standing Between the Dead and the Living (verses 41 to 50)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Anyone expecting this scene to end the rebellion is wrong. The very next day, the whole camp turns on
            Moses and Aaron again, for the opposite reason.
          </p>
        </div>
        <VerseQuote
          text="But on the morrow all the congregation of the children of Israel murmured against Moses and against Aaron, saying, Ye have killed the people of the LORD."
          reference="Numbers 16:41"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The congregation that just watched God open the earth blames Moses and Aaron for it, as if
            they had thrown the rebels in themselves.</strong> The glory of the LORD appears again, and God again
            tells Moses and Aaron to step back so He can consume the congregation. This time Moses sends Aaron
            running with a censer of his own, not to challenge anyone, but to stop what is already starting.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto Aaron, Take a censer, and put fire therein from off the altar, and put on incense, and go quickly unto the congregation, and make an atonement for them: for there is wrath gone out from the LORD; the plague is begun."
          reference="Numbers 16:46"
        />
        <VerseQuote
          text="And he stood between the dead and the living; and the plague was stayed."
          reference="Numbers 16:48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The same priesthood Korah died trying to seize is the exact thing that stops the dying a day
            later.</strong> Aaron does not run toward the plague with a weapon or an argument. He runs with incense,
            standing physically between the people already dead and the people still breathing, and the plague
            stops where he stands.
          </p>
        </div>
        <VerseQuote
          text="Now they that died in the plague were fourteen thousand and seven hundred, beside them that died about the matter of Korah."
          reference="Numbers 16:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That fourteen thousand seven hundred is its own separate death toll, on top of whatever number went down
            with Korah&apos;s tents and whatever number burned with the two hundred and fifty censers. One
            rebellion, three distinct waves of judgment, before the chapter is finally done. It is the same pattern
            Moses had already used once before, running toward God&apos;s anger with intercession instead of away
            from it, the way he stood in the gap for the whole camp after the{" "}
            <ArticleLink href="/blog/exodus-32-explained">golden calf</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 16 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was this one rebellion or two merging into one?</strong> The text itself keeps the two
            grievances distinct. Korah, a Levite already serving at the tabernacle, wanted the priesthood itself,
            the one office Numbers 16:10 says he was reaching past his own role to grab. Dathan and Abiram, from
            Reuben, never mention the priesthood at all. Their complaint in verses 13 and 14 is about Moses&apos;
            civil leadership and the land itself, calling Egypt the place that flowed with milk and honey. Two
            different men with two different grudges joined forces under one banner, which is exactly how &quot;ye
            take too much upon you&quot; in verse 3 could sound like one united complaint when it never really was.
          </p>
          <p>
            <strong>Did Korah himself die in the earth opening, or in the fire that killed the two hundred and
            fifty?</strong> This is genuinely harder to pin down than most of the chapter. Verses 31 through 33 name
            Korah among those swallowed by the earth, alongside Dathan, Abiram, and &quot;all the men that
            appertained unto Korah.&quot; Verse 35 separately records fire consuming the two hundred and fifty
            princes who had carried their censers to
            the tabernacle door, a group Korah himself had gathered and stood among in verse 19. Numbers 26:10, retold
            years later, ties both judgments to the same company and the same moment without stating plainly which
            one actually took Korah. The honest answer is that Scripture does not fully separate the two for his
            specific case, even though it is precise about everyone else involved.
          </p>
          <p>
            <strong>Did Korah&apos;s own children die with him?</strong> Numbers 16:32 says the earth swallowed
            Korah&apos;s household along with him. Numbers 26:11, written later in the same book, says plainly,
            &quot;Notwithstanding the children of Korah died not.&quot; Scripture does not explain exactly how both
            statements hold together, whether his sons were not present in the tents that day or the judgment in
            chapter 16 fell on those actively involved rather than every relative by blood. What is certain is that
            his line continued. Several Psalms later carry the heading &quot;for the sons of Korah,&quot; and 1
            Chronicles traces Levites serving in temple worship back through this same family.
          </p>
          <p>
            <strong>Why does God threaten to consume the whole congregation twice in this chapter, when only a
            handful of men actually rebelled?</strong> Both times, in verse 21 and again in verse 45, Moses and
            Aaron intercede immediately, and both times God narrows the judgment instead of carrying out the wider
            threat. The pattern of corporate consequence for an individual sin runs throughout the Old Testament, and
            this chapter does not resolve the tension philosophically. What it shows, twice in the same account, is
            that the threat of corporate judgment and a leader&apos;s intercession on the people&apos;s behalf are
            not opposites. The intercession is part of how the wider judgment keeps getting limited.
          </p>
          <p>
            <strong>What happened to On, the son of Peleth?</strong> He is named once, in verse 1, standing with
            Dathan and Abiram, and never mentioned again anywhere in the chapter or the rest of Numbers. Scripture
            gives no account of his fate separate from the men he joined. Whether that silence means something about
            him specifically is not something the text answers.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 16:3</h3>
        <VerseQuote
          text="And they gathered themselves together against Moses and against Aaron, and said unto them, Ye take too much upon you, seeing all the congregation are holy, every one of them, and the LORD is among them: wherefore then lift ye up yourselves above the congregation of the LORD?"
          reference="Numbers 16:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A half true complaint doing the work of a full lie. Israel really was called holy as a nation. That never
          meant every role inside it was interchangeable.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 16:32 and 33</h3>
        <VerseQuote
          text="And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation."
          reference="Numbers 16:32 and 33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most physically specific judgments in the entire Bible, timed to the exact moment Moses stopped
          speaking.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 16:48</h3>
        <VerseQuote
          text="And he stood between the dead and the living; and the plague was stayed."
          reference="Numbers 16:48"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The office Korah died trying to take by force is the exact thing that stops the dying a day later, in
          Aaron&apos;s hands.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Jude 1:11</h3>
        <VerseQuote
          text="Woe unto them! for they have gone in the way of Cain, and ran greedily after the error of Balaam for reward, and perished in the gainsaying of Core."
          reference="Jude 1:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          &quot;Core&quot; is the Greek form of Korah&apos;s name. Centuries later, the New Testament still uses his
          rebellion as the shorthand for arguing against God given authority.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Psalm 106:16 to 18</h3>
        <VerseQuote
          text="They envied Moses also in the camp, and Aaron the saint of the LORD. The earth opened and swallowed up Dathan, and covered the company of Abiram. And a fire was kindled in their company; the flame burned up the wicked."
          reference="Psalm 106:16 to 18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Israel&apos;s own worship later names envy, plainly, as the root of what happened in Numbers 16. Not a
          theological dispute. Jealousy over someone else&apos;s standing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 16 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 16 covers Korah, Dathan, Abiram, and two hundred and fifty princes rebelling against Moses and
          Aaron&apos;s leadership. God settles the dispute with a test involving censers and incense, the earth
          opens and swallows Korah, Dathan, Abiram, and their households, fire consumes the two hundred and fifty
          men, and a plague that kills fourteen thousand seven hundred more people follows the next day until Aaron
          stops it with an atonement offering.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Korah in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Korah was a Levite, the son of Izhar, which made him a first cousin of Moses and Aaron through their shared
          grandfather Kohath. He already served at the tabernacle but wanted the priesthood itself, the role
          reserved only for Aaron&apos;s line.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Korah rebel against Moses and Aaron?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 16:10 has Moses naming it directly: Korah and the Levites already had a special role serving at
          the tabernacle, and Korah wanted the priesthood on top of it, the one office God had given only to
          Aaron&apos;s family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Dathan and Abiram?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Dathan and Abiram refused to even appear before Moses, accused him of lying about the promised land, and
          were swallowed by the earth along with their households and tents, verses 27 through 33.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Korah&apos;s children die too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 16:32 describes Korah&apos;s household going down with him, but Numbers 26:11 later states plainly
          that the children of Korah did not die. Scripture does not spell out exactly how to reconcile the two, but
          his family line continued, later tied to several Psalms written &quot;for the sons of Korah.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the earth open up and swallow Korah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses staked his credibility on a judgment nobody could mistake for a natural death, Numbers 16:28 through
          30. The ground splitting open the moment he finished speaking, verse 31, was the proof that God, not
          Moses, had decided the outcome.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many people died in Numbers 16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Three separate groups: Korah, Dathan, Abiram and their households swallowed by the earth, verses 32 and
          33, two hundred and fifty princes consumed by fire, verse 35, and fourteen thousand seven hundred more who
          died in the plague the next day, verse 49, a total the text itself counts separately from the earlier
          deaths.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the bronze censers used for afterward?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 16:38 says the two hundred and fifty censers were hammered into plates to cover the altar, a
          permanent, visible memorial so Israel would remember what happened to anyone outside Aaron&apos;s line who
          tried to take the priesthood by force.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Aaron run toward the plague instead of away from it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses sent him with a censer and incense to make atonement, Numbers 16:46, and verse 48 says he stood
          between the dead and the living until the plague stopped. The office the rebels died trying to seize is
          the exact thing that stopped the dying.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Korah mentioned anywhere in the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jude 1:11 warns against following &quot;the gainsaying of Core,&quot; using the Greek form of Korah&apos;s
          name as shorthand for arguing against authority God has actually set in place.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the earthquake and the fire, and Numbers 16 is still a chapter about wanting a role you were never given.</p>
          <p>
            📌 <strong>Korah&apos;s complaint was never really about fairness.</strong> He already had a role no
            other tribe had. What he wanted was someone else&apos;s, and he dressed that want up as a question about
            holiness for everyone.
          </p>
          <p>
            📌 <strong>The men accused of grabbing too much authority are the ones who fell on their faces to beg
            mercy for the people turning against them.</strong> Real authority from God looks like intercession, not
            self defense, both times this chapter tests it.
          </p>
          <p>
            📌 <strong>The same priesthood someone died trying to seize is what stopped the dying a day later.</strong>{" "}
            God does not just punish the attempt to take His appointed order by force. He keeps using that order
            exactly as He designed it.
          </p>
          <p>
            Psalm 106 named the root of this whole chapter in one word: envy. Not theology, not justice, envy over
            someone else&apos;s standing with God.
          </p>
          <p>
            If there is a role you have been eyeing that was never given to you, Numbers 16 is worth sitting with
            before you decide your complaint about it is really about holiness.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
