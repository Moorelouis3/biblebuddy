import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("judges-9-explained", {
  title: "Judges 9 Explained: Abimelech and Jotham's Fable of the Trees",
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

export default function JudgesNineExplainedPage() {
  return (
    <BlogPostShell
      slug="judges-9-explained"
      title={<>📖 Judges 9 Explained: Abimelech and Jotham&apos;s Fable of the Trees</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Seventy brothers murdered on one stone. One brother left alive by hiding. And the killer gets crowned king a few verses later.</p>
            <p>
              <strong>Judges 9 explained</strong> is the longest chapter in the book, and it has no deliverer, no battle against a foreign army, and
              no angel. The enemy here is Gideon&apos;s own son, and the war is a civil one, fought inside the family of the man who just refused a
              crown.
            </p>
            <p>Maybe you have watched someone take by force what was never offered to them, and wondered how anyone was supposed to stop it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why would trees go looking for a king in a story told out loud in the middle of a coronation?</li>
            <li>❓ Why do the useful trees say no, and only the useless one say yes?</li>
            <li>❓ Does God really send an evil spirit in verse 23, and what does that actually mean?</li>
            <li>❓ Why does a dying man care more about how he is remembered than about anything he has just done?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Nobody in Judges 9 gets away with anything. The chapter spends fifty seven verses proving it, one betrayal at a time.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: Abimelech&apos;s plot and the massacre at Ophrah, Jotham&apos;s fable
              shouted down from a mountain, three years of uneasy peace, the rival who talked too big, the siege and the fire, and the millstone
              that ended it all.
            </p>
            <p>Fifty seven verses, one stolen crown, and a curse that lands on every single person who had a hand in it.</p>
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
            <ArticleLink href="/blog/judges-8-explained">Judges 8</ArticleLink> ended with Gideon dead and two things already loose in Israel that
            Judges 9 is going to collect. Gideon had refused a hereditary throne in plain words, telling Israel the LORD alone should rule over them.
            But he also fathered seventy sons from many wives, and a concubine from Shechem gave him one more, a son he named Abimelech, meaning
            &quot;my father is king.&quot; The same chapter closed with a warning the size of a headline: the moment Gideon was dead, Israel
            forgot the LORD and showed no kindness to his household at all.
          </p>
          <p>
            That is the opening Judges 9 needed. A son with a name that argues against his own father&apos;s refusal. A household nobody felt
            obligated to protect. And a town, Shechem, where that son&apos;s mother still had family with something to gain.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Judges 9 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Abimelech&apos;s Plot and the Massacre at Ophrah (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with Abimelech making his case, not to Israel, but to his own mother&apos;s side of the family.</p>
        </div>
        <VerseQuote
          text="And Abimelech the son of Jerubbaal went to Shechem unto his mother's brethren, and communed with them, and with all the family of the house of his mother's father, saying, Speak, I pray you, in the ears of all the men of Shechem, Whether is better for you, either that all the sons of Jerubbaal, which are threescore and ten persons, reign over you, or that one reign over you? remember also that I am your bone and your flesh."
          reference="Judges 9:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Abimelech never argues that he would rule better than his seventy brothers. He argues the math: one ruler instead of seventy, and a
            ruler who is their own blood instead of a stranger. &quot;Bone and flesh&quot; is a kinship appeal, not a qualification.
          </p>
          <p>It works exactly the way he hoped.</p>
        </div>
        <VerseQuote
          text="And his mother's brethren spake of him in the ears of all the men of Shechem all these words: and their hearts inclined to follow Abimelech; for they said, He is our brother. And they gave him threescore and ten pieces of silver out of the house of Baalberith, wherewith Abimelech hired vain and light persons, which followed him."
          reference="Judges 9:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Shechem funds a murder with temple money and never once asks what the silver is for.</strong> Baalberith means
            &quot;Baal of the covenant,&quot; the same god named back in{" "}
            <ArticleLink href="/blog/judges-8-explained">Judges 8:33</ArticleLink>, right after Gideon died. A town already worshipping a
            counterfeit covenant god bankrolls a counterfeit king with that god&apos;s own treasury. &quot;Vain and light persons&quot; means
            reckless men with nothing to lose, the kind any town would normally be afraid of, now hired as muscle.
          </p>
        </div>
        <VerseQuote
          text="And he went unto his father's house at Ophrah, and slew his brethren the sons of Jerubbaal, being threescore and ten persons, upon one stone: notwithstanding yet Jotham the youngest son of Jerubbaal was left; for he hid himself."
          reference="Judges 9:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;Upon one stone&quot; describes an execution laid out on purpose, not a chaotic massacre. Seventy sons of the man who tore down
            his own father&apos;s altar of Baal and once judged Israel in peace for forty years are killed one at a time on the same slab, by their
            own half brother. Only Jotham survives, and only because he hides. Nothing here is fought. It is simply done.
          </p>
        </div>
        <VerseQuote
          text="And all the men of Shechem gathered together, and all the house of Millo, and went, and made Abimelech king, by the plain of the pillar that was in Shechem."
          reference="Judges 9:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Many Bible teachers connect this pillar to the same Shechem where Joshua once set up a stone under a tree as a witness to Israel&apos;s
            covenant with God, generations earlier. If that memory still clung to the spot, the irony is sharp. A town crowns a murderer at the exact
            place their ancestors once promised to serve the LORD alone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Jotham&apos;s Fable of the Trees (verses 7 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jotham did not stay hidden forever. Once word of the coronation reaches him, he climbs a mountain that overlooks the whole town.</p>
        </div>
        <VerseQuote
          text="And when they told it to Jotham, he went and stood in the top of mount Gerizim, and lifted up his voice, and cried, and said unto them, Hearken unto me, ye men of Shechem, that God may hearken unto you."
          reference="Judges 9:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Mount Gerizim was the mountain of blessing, the one Moses named for pronouncing good over Israel, with Mount Ebal across the
            valley reserved for the curse.</strong> Jotham climbs the mountain built for blessing to warn a town it has earned the opposite one. Then
            he tells a story instead of making an accusation.
          </p>
        </div>
        <VerseQuote
          text="The trees went forth on a time to anoint a king over them; and they said unto the olive tree, Reign thou over us. But the olive tree said unto them, Should I leave my fatness, wherewith by me they honour God and man, and go to be promoted over the trees?"
          reference="Judges 9:8 and 9"
        />
        <VerseQuote
          text="And the trees said to the fig tree, Come thou, and reign over us. But the fig tree said unto them, Should I forsake my sweetness, and my good fruit, and go to be promoted over the trees?"
          reference="Judges 9:10 and 11"
        />
        <VerseQuote
          text="Then said the trees unto the vine, Come thou, and reign over us. And the vine said unto them, Should I leave my wine, which cheereth God and man, and go to be promoted over the trees?"
          reference="Judges 9:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Every answer uses the same word, &quot;promoted,&quot; and every answer treats the offer as a demotion, not an honor. The olive tree
            gives oil for lamps and for anointing. The fig gives sweetness. The vine gives wine that God and man both enjoy. Each one already does
            something genuinely useful, and ruling over trees would take them away from it. Jotham is describing Gideon exactly, a man who
            already had real work to do and never once asked to be king.
          </p>
          <p>Only one tree answers differently.</p>
        </div>
        <VerseQuote
          text="Then said all the trees unto the bramble, Come thou, and reign over us. And the bramble said unto the trees, If in truth ye anoint me king over you, then come and put your trust in my shadow: and if not, let fire come out of the bramble, and devour the cedars of Lebanon."
          reference="Judges 9:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A bramble is a thorny, low scrub bush. It casts no real shade and bears no fruit at all, and in a dry country it is one of
            the first things to catch fire.</strong> &quot;Put your trust in my shadow&quot; promises shelter the bramble cannot actually give,
            and the very next clause threatens to burn down cedars, trees far taller and stronger than itself, if the trees refuse. The only tree
            willing to rule is the one with nothing to offer and everything to threaten.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Jotham Names Names, Then Pronounces the Curse (verses 16 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The fable finished, Jotham drops the trees and speaks plainly.</p>
        </div>
        <VerseQuote
          text="Now therefore, if ye have done truly and sincerely, in that ye have made Abimelech king, and if ye have dealt well with Jerubbaal and his house, and have done unto him according to the deserving of his hands;"
          reference="Judges 9:16"
        />
        <VerseQuote
          text="(For my father fought for you, and adventured his life far, and delivered you out of the hand of Midian: And ye are risen up against my father's house this day, and have slain his sons, threescore and ten persons, upon one stone, and have made Abimelech, the son of his maidservant, king over the men of Shechem, because he is your brother;)"
          reference="Judges 9:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jotham will not let Shechem forget what Gideon actually did for them.</strong> He risked his own life to save them from
            Midian, the exact rescue told across{" "}
            <ArticleLink href="/blog/judges-6-explained">Judges 6</ArticleLink> and{" "}
            <ArticleLink href="/blog/judges-8-explained">Judges 8</ArticleLink>. Shechem answered that rescue by funding the murder of his
            seventy sons. Jotham lets the contrast speak for itself before he ever pronounces judgment.
          </p>
        </div>
        <VerseQuote
          text="If ye then have dealt truly and sincerely with Jerubbaal and with his house this day, then rejoice ye in Abimelech, and let him also rejoice in you: But if not, let fire come out from Abimelech, and devour the men of Shechem, and the house of Millo; and let fire come out from the men of Shechem, and from the house of Millo, and devour Abimelech."
          reference="Judges 9:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jotham does not ask God to strike Shechem down. He states a conditional curse, fire running in both directions, Abimelech against
            Shechem and Shechem against Abimelech, and leaves the outcome to prove itself. The rest of the chapter is that proof.
          </p>
        </div>
        <VerseQuote text="And Jotham ran away, and fled, and went to Beer, and dwelt there, for fear of Abimelech his brother." reference="Judges 9:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Jotham speaks the truth and then runs for his life, which the chapter records without embarrassment. Courage to say something hard
            out loud does not always come packaged with the ability to stay and face the consequences, and this chapter never pretends otherwise.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Three Years, Then God Sends Discord (verses 22 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nothing happens for three years. Then the curse begins to move.</p>
        </div>
        <VerseQuote
          text="When Abimelech had reigned three years over Israel, Then God sent an evil spirit between Abimelech and the men of Shechem; and the men of Shechem dealt treacherously with Abimelech:"
          reference="Judges 9:22 and 23"
        />
        <VerseQuote
          text="That the cruelty done to the threescore and ten sons of Jerubbaal might come, and their blood be laid upon Abimelech their brother, which slew them; and upon the men of Shechem, which aided him in the killing of his brethren."
          reference="Judges 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The text states its own purpose before the discord even starts.</strong> This is not random bad luck. It is the murdered
            brothers&apos; blood finally being accounted for, against the man who swung the blade and against the town that paid for it. The
            same pattern shows up again later in Scripture, when an evil spirit troubles Saul after he is already rejected, or when God allows a
            lying spirit to move Ahab toward a battle he was already doomed to lose. In each case the discord does not create guilt that was not
            already there. It brings an existing guilt to its reckoning.
          </p>
        </div>
        <VerseQuote
          text="And the men of Shechem set liers in wait for him in the top of the mountains, and they robbed all that came along that way by them: and it was told Abimelech."
          reference="Judges 9:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Shechem&apos;s first act of rebellion is not even against Abimelech directly. It is lawlessness against travelers, a town that
            crowned a king on nothing but blood ties now unraveling into banditry under his own rule.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Gaal&apos;s Boast and Zebul&apos;s Warning (verses 26 to 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Into that unraveling town walks a new voice.</p>
        </div>
        <VerseQuote
          text="And Gaal the son of Ebed came with his brethren, and went over to Shechem: and the men of Shechem put their confidence in him. And they went out into the fields, and gathered their vineyards, and trode the grapes, and made merry, and went into the house of their god, and did eat and drink, and cursed Abimelech."
          reference="Judges 9:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The same house of Baalberith that funded Abimelech&apos;s rise in verse 4 now hosts the harvest festival where the town curses him.
            The town&apos;s loyalty was never to a conviction. It was to whoever was standing closest at the moment, and Gaal is standing closest
            now.
          </p>
        </div>
        <VerseQuote
          text="And Gaal the son of Ebed said, Who is Abimelech, and who is Shechem, that we should serve him? is not he the son of Jerubbaal? and Zebul his officer? serve the men of Hamor the father of Shechem: for why should we serve him? And would to God this people were under my hand! then would I remove Abimelech. And he said to Abimelech, Increase thine army, and come out."
          reference="Judges 9:28 and 29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Gaal talks about removing Abimelech while Abimelech is nowhere near enough to hear it.</strong> His whole speech is a dare
            thrown at an empty room, appealing to Shechem&apos;s old Canaanite founder Hamor instead of the half Israelite king they themselves
            crowned. Brave words cost Gaal nothing yet, because the one person who could make him answer for them is not there.
          </p>
          <p>Zebul, Abimelech&apos;s own officer still inside the city, makes sure that changes.</p>
        </div>
        <VerseQuote
          text="And when Zebul the ruler of the city heard the words of Gaal the son of Ebed, his anger was kindled. And he sent messengers unto Abimelech privily, saying, Behold, Gaal the son of Ebed and his brethren be come to Shechem; and, behold, they fortify the city against thee."
          reference="Judges 9:30 and 31"
        />
        <VerseQuote
          text="Now therefore up by night, thou and the people that is with thee, and lie in wait in the field: And it shall be, that in the morning, as soon as the sun is up, thou shalt rise early, and set upon the city: and, behold, when he and the people that is with him come out against thee, then mayest thou do to them as thou shalt find occasion."
          reference="Judges 9:32 and 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Zebul&apos;s plan is simple and patient. Hide overnight, let the city think nothing is coming, and strike the moment Gaal walks out
            through the gate boasting. Everything Gaal said in public, Zebul is now using against him in private.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Rout of Gaal, and the Burning of Shechem&apos;s Tower (verses 34 to 49)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The plan runs exactly as Zebul described it.</p>
        </div>
        <VerseQuote
          text="And when Gaal saw the people, he said to Zebul, Behold, there come people down from the top of the mountains. And Zebul said unto him, Thou seest the shadow of the mountains as if they were men."
          reference="Judges 9:36"
        />
        <VerseQuote
          text="Then said Zebul unto him, Where is now thy mouth, wherewith thou saidst, Who is Abimelech, that we should serve him? is not this the people that thou hast despised? go out, I pray now, and fight with them."
          reference="Judges 9:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Zebul throws Gaal&apos;s own boast back at him at the exact moment it stops being free.</strong> Gaal has no real army,
            only confidence borrowed from a drunken festival. He still walks out to fight, because he already said too much to back down in
            front of the town watching him.
          </p>
        </div>
        <VerseQuote text="And Abimelech chased him, and he fled before him, and many were overthrown and wounded, even unto the entering of the gate." reference="Judges 9:40" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gaal is driven out of Shechem entirely, and Zebul makes sure he does not come back. But the chapter is not finished with the city itself.</p>
        </div>
        <VerseQuote
          text="And it came to pass on the morrow, that the people went out into the field; and they told Abimelech. And he took the people, and divided them into three companies, and laid wait in the field, and looked, and, behold, the people were come forth out of the city; and he rose up against them, and smote them."
          reference="Judges 9:42 and 43"
        />
        <VerseQuote
          text="And Abimelech fought against the city all that day; and he took the city, and slew the people that was therein, and beat down the city, and sowed it with salt."
          reference="Judges 9:45"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Sowing a ruined city with salt was a way of marking total destruction, land declared unfit to ever be planted again.</strong>
            {" "}It is a statement of finality, not a scientific act, and Scripture never treats it as a literal permanent curse on the ground.
            Shechem itself shows up again later in the Bible, rebuilt and inhabited. Here, in this moment, it is Abimelech announcing that this
            version of the city is finished.
          </p>
          <p>A last group of survivors tries to hold out.</p>
        </div>
        <VerseQuote
          text="And when all the men of the tower of Shechem heard that, they entered into an hold of the house of the god Berith."
          reference="Judges 9:46"
        />
        <VerseQuote
          text="And Abimelech gat him up to mount Zalmon, he and all the people that were with him; and Abimelech took an axe in his hand, and cut down a bough from the trees, and took it, and laid it on his shoulder, and said unto the people that were with him, What ye have seen me do, make haste, and do as I have done."
          reference="Judges 9:48"
        />
        <VerseQuote
          text="And all the people likewise cut down every man his bough, and followed Abimelech, and put them to the hold, and set the hold on fire upon them; so that all the men of the tower of Shechem died also, about a thousand men and women."
          reference="Judges 9:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Fire from Abimelech devours the house of Millo, exactly as Jotham said it would.</strong> The same man his mother&apos;s
            family once crowned at a pillar in this town now burns about a thousand of its own people alive inside a stronghold built onto the
            temple of their own god, the same god whose treasury paid for his rise in verse 4.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Thebez, the Millstone, and the Death Nobody Could Dress Up (verses 50 to 57)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Shechem is finished, but Abimelech keeps moving.</p>
        </div>
        <VerseQuote
          text="Then went Abimelech to Thebez, and encamped against Thebez, and took it. But there was a strong tower within the city, and thither fled all the men and women, and all they of the city, and shut it to them, and gat them up to the top of the tower."
          reference="Judges 9:50 and 51"
        />
        <VerseQuote
          text="And Abimelech came unto the tower, and fought against it, and went hard unto the door of the tower to burn it with fire."
          reference="Judges 9:52"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 It is the same tactic that leveled Shechem&apos;s tower. This time, someone inside is watching him approach the door.</p>
        </div>
        <VerseQuote text="And a certain woman cast a piece of a millstone upon Abimelech's head, and all to brake his skull." reference="Judges 9:53" />
        <VerseQuote
          text="Then he called hastily unto the young man his armourbearer, and said unto him, Draw thy sword, and slay me, that men say not of me, A woman slew him. And his young man thrust him through, and he died."
          reference="Judges 9:54"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A millstone is the heavy upper stone of a hand mill, dropped from above with enough weight behind it to crack a man&apos;s
            skull.</strong> Dying from that blow, Abimelech&apos;s last words are not about his seventy murdered brothers or the thousand people he
            just burned alive. They are about his reputation. He spends his final breath trying to control a story that Scripture then records
            exactly the way he feared it, a woman ended him, whatever his armorbearer&apos;s sword did afterward.
          </p>
        </div>
        <VerseQuote text="And when the men of Israel saw that Abimelech was dead, they departed every man unto his place." reference="Judges 9:55" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ No mourning, no funeral, no mention of a burial place at all. Compare that single flat sentence to{" "}
            <ArticleLink href="/blog/judges-8-explained">Gideon dying in a good old age and being buried in his father&apos;s own
            tomb</ArticleLink>. The son who grabbed what his father refused ends with less dignity than his father ever asked for.
          </p>
          <p>The chapter closes with the narrator stating plainly what the whole story has been building toward.</p>
        </div>
        <VerseQuote
          text="Thus God rendered the wickedness of Abimelech, which he did unto his father, in slaying his seventy brethren: And all the evil of the men of Shechem did God render upon their heads: and upon them came the curse of Jotham the son of Jerubbaal."
          reference="Judges 9:56 and 57"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The narrator names Jotham&apos;s curse by name, three mountains, three years, and one millstone later, and calls the whole
            chapter its fulfillment.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Judges 9 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Is Jotham&apos;s fable of the talking trees meant to be read as something that actually happened?</strong> What the text says:
            Jotham introduces it plainly as a story, &quot;the trees went forth on a time,&quot; the same way a modern speaker would say
            &quot;imagine if.&quot; How this is read: Bible teachers universally treat this as a parable, a teaching device using plants to make a
            point about Abimelech and Shechem, not a report of an actual event. Nothing else in the chapter, or in the rest of Judges, describes
            literal talking vegetation.
          </p>
          <p>
            <strong>Does &quot;God sent an evil spirit&quot; in verse 23 mean God caused Abimelech and Shechem to sin?</strong> What the text says:
            verse 24 states the purpose directly, so that the blood of the murdered seventy sons would be laid on the men responsible for it. How
            this is read: the guilt for the massacre at Ophrah was already real before this verse, committed freely by Abimelech and funded
            freely by Shechem. What God sends is discord that brings an existing sin to its reckoning, the same pattern Scripture uses later with
            Saul&apos;s troubling spirit and the lying spirit before Ahab&apos;s last battle. It describes God using conflict as judgment, not God
            creating the original wrongdoing.
          </p>
          <p>
            <strong>Was Abimelech&apos;s final request, to be killed by his own armorbearer rather than die by a woman&apos;s hand, about
            courage or about pride?</strong> What the text says: his stated reason in verse 54 is only concern for how his death will be
            described, &quot;that men say not of me, A woman slew him.&quot; How this is read: the chapter records the request without praising
            it, and the irony lands anyway. Scripture itself preserves exactly the detail he tried to erase, so his last act of control fails even
            as his armorbearer carries it out.
          </p>
          <p>
            <strong>Did sowing Shechem with salt in verse 45 mean the city was cursed and left unable to be inhabited again?</strong> What the
            text says: the verse describes the act without explaining its mechanics or claiming permanence. How this is read: ancient readers
            understood sowing a defeated city with salt as a dramatic sign of total, finished destruction, not an actual chemical curse on the
            soil. Shechem reappears later in Israel&apos;s history as a real, functioning city, which fits a symbolic reading of this verse far
            better than a literal one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Judges 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Judges 9:15</h3>
        <VerseQuote
          text="And the bramble said unto the trees, If in truth ye anoint me king over you, then come and put your trust in my shadow: and if not, let fire come out of the bramble, and devour the cedars of Lebanon."
          reference="Judges 9:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The only tree that wants to rule is the one with no real shade to offer, and its first instinct in power is already a threat of fire.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Judges 9:2</h3>
        <VerseQuote
          text="Whether is better for you, either that all the sons of Jerubbaal, which are threescore and ten persons, reign over you, or that one reign over you? remember also that I am your bone and your flesh."
          reference="Judges 9:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A pitch built entirely on kinship and convenience, with not one word about character, and a town that bought it without asking a single
          question.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Judges 9:20</h3>
        <VerseQuote
          text="But if not, let fire come out from Abimelech, and devour the men of Shechem, and the house of Millo; and let fire come out from the men of Shechem, and from the house of Millo, and devour Abimelech."
          reference="Judges 9:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A curse aimed in both directions at once, spoken years before either half of it comes true exactly as stated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Judges 9:54</h3>
        <VerseQuote
          text="Then he called hastily unto the young man his armourbearer, and said unto him, Draw thy sword, and slay me, that men say not of me, A woman slew him."
          reference="Judges 9:54"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A dying man&apos;s last concern is his legacy, not his victims, and Scripture records the very fact he was trying to bury.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Judges 9:56 and 57</h3>
        <VerseQuote
          text="Thus God rendered the wickedness of Abimelech, which he did unto his father, in slaying his seventy brethren: And all the evil of the men of Shechem did God render upon their heads: and upon them came the curse of Jotham the son of Jerubbaal."
          reference="Judges 9:56 and 57"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The narrator closes the account by name, tying every death in the chapter back to the curse spoken from a mountain years earlier.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Judges 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Judges 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abimelech convinced his mother&apos;s relatives in Shechem to back him as king, used temple money to hire mercenaries, and murdered his
          seventy half brothers except Jotham, who escaped. Jotham warned Shechem with a fable about trees choosing a worthless bramble as king,
          then pronounced a curse. Three years later God sent discord between Abimelech and Shechem, a rival named Gaal rose up and was driven
          out, Abimelech destroyed Shechem and burned its last defenders alive, and he died soon after when a woman dropped a millstone on his
          head during another siege.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Abimelech in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abimelech was a son of Gideon, also called Jerubbaal, born to a concubine from Shechem. His name means &quot;my father is king,&quot; and
          Judges 9 tells how he murdered his seventy brothers and ruled Shechem and the surrounding area for three years before dying in a siege at
          Thebez.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the meaning of Jotham&apos;s fable of the trees?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In verses 7 through 15, three useful trees, the olive, the fig, and the vine, all refuse an offer to be king because it would take them
          away from the real good they already do. Only the bramble, a thorny bush with nothing to offer, accepts, and immediately threatens fire
          if it is not obeyed. The fable contrasts Gideon, who already had real work and refused the throne, with Abimelech, who had nothing to
          offer but ambition and threats.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the olive tree, fig tree, and vine refuse to be king?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Each one names the specific good it already provides, oil, sweetness and fruit, and wine that cheers both God and man, and calls
          kingship a &quot;promotion&quot; it does not want, since ruling over other trees would cost it the very usefulness that made it worth
          anything in the first place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the bramble represent in Judges 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The bramble stands for Abimelech. It is a thorny shrub that gives no real shade and bears no fruit, yet it is the only tree willing to
          rule, and it rules by threatening to burn down cedars far greater than itself if it is refused, matching Abimelech&apos;s rise through
          murder and his later use of fire against Shechem itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Abimelech really kill all seventy of his brothers?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 5 says he slew his brethren, the seventy sons of Jerubbaal, on one stone, with only Jotham surviving by hiding. The number
          seventy is repeated several times in the chapter, by Abimelech&apos;s own pitch in verse 2, by Jotham&apos;s accusation in verse 18, and
          by the narrator&apos;s closing verdict in verse 56, leaving no ambiguity about how many died.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God really send an evil spirit in Judges 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 23 says plainly that God sent an evil spirit between Abimelech and the men of Shechem, and verse 24 explains why, so that the
          murdered brothers&apos; blood would come back on both the killer and the town that funded him. The discord is presented as a tool of
          judgment on guilt that already existed, not as the source of that guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abimelech want his armorbearer to kill him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After a woman dropped a millstone on his head in verse 53, Abimelech asked his armorbearer to run him through so that history would not
          record that a woman killed him, a concern for reputation spoken while he was dying from the very wound he was trying to hide.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did sowing Shechem with salt mean it was destroyed forever?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 45 records Abimelech sowing the ruined city with salt as a sign of complete destruction in that moment, not a literal curse making
          the ground permanently unusable. Shechem appears again later in Israel&apos;s history as a real city, which fits reading this act as a
          dramatic statement of finality rather than a lasting agricultural curse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Judges 9 connect to Gideon&apos;s refusal to be king in Judges 8?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          <ArticleLink href="/blog/judges-8-explained">Judges 8:23</ArticleLink> has Gideon tell Israel that the LORD alone should rule over them.
          Judges 9 shows what happens almost immediately after, when his own son takes by murder the very throne his father turned down, proving
          that one man&apos;s right answer does not automatically protect the next generation from chasing the wrong one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judges 9 is the longest chapter in the book for a reason. It needs every verse to settle every account it opened.</p>
          <p>
            📌 <strong>The people with something real to offer are usually the ones least eager to rule.</strong> The olive, fig, and vine all
            say no. Only the bramble, with nothing but thorns and a threat, says yes.
          </p>
          <p>
            📌 <strong>Borrowed loyalty breaks the same way it was bought.</strong> Shechem crowned Abimelech because he was their blood, and
            turned on him the moment someone louder walked into town. Nothing holding that town together was ever conviction.
          </p>
          <p>
            📌 <strong>What a man spends his last breath protecting tells you what he actually valued.</strong> Abimelech, dying, did not ask
            about his brothers or the thousand people he had just burned. He asked about his reputation, and Scripture let that fail too.
          </p>
          <p>
            You may be watching someone take by force what was never rightly theirs, wondering why nothing seems to be stopping them.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Trust that the chapter you are living in may simply need more verses, the same way this one did, before every account gets settled.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
