import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-14-explained", {
  title: "Joshua 14 Explained: Caleb's Faith at 85 Years Old",
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

export default function JoshuaFourteenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-14-explained"
      title={<>📖 Joshua 14 Explained: Caleb&apos;s Faith at 85 Years Old</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Everyone else in this chapter receives land by lot. One man asks for his by name.</p>
            <p>
              <strong>Joshua 14 explained</strong> is the chapter where the actual tribal division of Canaan
              finally begins, and before a single border gets drawn for anyone else, an 85 year old man named
              Caleb walks up to Joshua and calls in a promise that is 45 years old. He does not ask for the
              easiest ground left on the map. He asks for the one piece everyone else is still afraid of.
            </p>
            <p>Maybe you have been waiting decades for something God said would happen, long after everyone else stopped expecting it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Caleb, not Joshua, get the first personal land grant in the whole division?</li>
            <li>❓ What promise is Caleb actually calling in, and when was it made?</li>
            <li>❓ Why does an 85 year old man ask for the mountain full of giants instead of the quiet land next door?</li>
            <li>❓ Why does the chapter end with the same line Joshua 11 already used, that the land rested from war?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Joshua 14 is proof that one person&apos;s long obedience does not expire just
              because everyone around him grew old waiting with him.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the priest and the general dividing
              the land together, Caleb reminding Joshua of a 45 year old oath, the strength Caleb claims he
              still has at 85, and the mountain he asks for on purpose.
            </p>
            <p>Watch how much of this short chapter rests on a promise nobody but Caleb seems to be tracking anymore.</p>
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
            <ArticleLink href="/blog/joshua-13-explained">Joshua 13</ArticleLink> handed out the land east of
            the Jordan, the territory Moses had already won for Reuben, Gad, and half of Manasseh, and it
            closed by naming the one tribe, Levi, that would receive no ground at all.
          </p>
          <p>
            Joshua 14 crosses the river and starts the division of the land west of the Jordan, the land
            Joshua and this generation actually fought for. But instead of opening with Joshua, it opens with
            a man most of the army probably considered too old to still be asking for anything.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 14 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Land Divided by Lot, Under Two Leaders, Not One (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming exactly who is in charge of handing out the land, and it is not Joshua alone.</p>
        </div>
        <VerseQuote
          text="And these are the countries which the children of Israel inherited in the land of Canaan, which Eleazar the priest, and Joshua the son of Nun, and the heads of the fathers of the tribes of the children of Israel, distributed for inheritance to them."
          reference="Joshua 14:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Eleazar the priest is named before Joshua in this verse.</strong> Dividing the
            promised land was not only a military decision. It was a priestly one too, carried out by the man
            who wore the breastplate and stood before the LORD, standing beside the man who led the army.
          </p>
          <p>The method itself removes any chance of favoritism.</p>
        </div>
        <VerseQuote
          text="By lot was their inheritance, as the LORD commanded by the hand of Moses, for the nine tribes, and for the half tribe."
          reference="Joshua 14:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verses 3 and 4 pause to explain why only nine and a half tribes are being counted here at all.</p>
        </div>
        <VerseQuote
          text="For Moses had given the inheritance of two tribes and an half tribe on the other side Jordan: but unto the Levites he gave none inheritance among them. For the children of Joseph were two tribes, Manasseh and Ephraim: therefore they gave no part unto the Levites in the land, save cities to dwell in, with their suburbs for their cattle and for their substance."
          reference="Joshua 14:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two and a half tribes already have land east of the Jordan from the previous chapter. Joseph
            counts as two tribes instead of one because his sons Manasseh and Ephraim each became a tribe in
            their own right. Levi still gets no territory, only cities to live in among everyone else&apos;s
            land, the same arrangement already stated twice in the previous chapter.
          </p>
          <p>Verse 5 closes the setup with one plain sentence.</p>
        </div>
        <VerseQuote
          text="As the LORD commanded Moses, so the children of Israel did, and they divided the land."
          reference="Joshua 14:5"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Caleb Calls In a 45 Year Old Promise (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before any tribe gets a border, one man steps forward first, and he does not wait to be assigned
            anything.
          </p>
        </div>
        <VerseQuote
          text="Then the children of Judah came unto Joshua in Gilgal: and Caleb the son of Jephunneh the Kenezite said unto him, Thou knowest the thing that the LORD said unto Moses the man of God concerning me and thee in Kadeshbarnea."
          reference="Joshua 14:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Caleb is not introducing a new request. He is reminding Joshua of something they both lived
            through together, back when Moses sent twelve men to{" "}
            <ArticleLink href="/blog/numbers-13-explained">scout the land of Canaan</ArticleLink>. Ten of
            those spies came back afraid. Caleb and Joshua were the only two who did not.
          </p>
        </div>
        <VerseQuote
          text="Nevertheless my brethren that went up with me made the heart of the people melt: but I wholly followed the LORD my God."
          reference="Joshua 14:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Wholly followed&quot; is the phrase the rest of this chapter keeps circling
            back to.</strong> It is not a claim of being perfect. It is a claim of not holding back when
            everyone around him did. The full story of that day, the murmuring, the LORD&apos;s anger, and
            the decree that only Caleb and Joshua of that generation would enter the land, is told in{" "}
            <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink>.
          </p>
          <p>Because of that one response, Moses made Caleb a personal promise.</p>
        </div>
        <VerseQuote
          text="And Moses sware on that day, saying, Surely the land whereon thy feet have trodden shall be thine inheritance, and thy children's for ever, because thou hast wholly followed the LORD my God."
          reference="Joshua 14:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That oath is also recorded from Moses&apos; own mouth in{" "}
            <ArticleLink href="/blog/deuteronomy-1-explained">Deuteronomy 1</ArticleLink>. Caleb has not
            forgotten a word of it. He has simply been waiting 45 years for the day it could actually be
            paid.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Eighty Five Years Old, and Asking for the Hardest Ground (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Caleb states his age without hiding it, and he states his strength the same way.</p>
        </div>
        <VerseQuote
          text="And now, behold, the LORD hath kept me alive, as he said, these forty and five years, even since the LORD spake this word unto Moses, while the children of Israel wandered in the wilderness: and now, lo, I am this day fourscore and five years old."
          reference="Joshua 14:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Fourscore and five is 85. Caleb was 40 when he scouted the land. The 45 years since cover both
            the wilderness years Israel spent wandering because of the other spies&apos; report, and the
            years of fighting since Israel crossed the Jordan. Caleb has lived through all of it still waiting
            for one hillside.
          </p>
          <p>Then he makes a claim most 85 year old men could not honestly make.</p>
        </div>
        <VerseQuote
          text="As yet I am as strong this day as I was in the day that Moses sent me: as my strength was then, even so is my strength now, for war, both to go out, and to come in."
          reference="Joshua 14:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Caleb does not ask Joshua for an easy retirement plot.</strong> He names exactly what
            he wants, and it is the one piece of ground the original spies were the most afraid of.
          </p>
        </div>
        <VerseQuote
          text="Now therefore give me this mountain, whereof the LORD spake in that day; for thou heardest in that day how the Anakims were there, and that the cities were great and fenced: if so be the LORD will be with me, then I shall be able to drive them out, as the LORD said."
          reference="Joshua 14:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The Anakims are the exact detail that broke the other ten spies&apos; nerve in Numbers
            13.</strong> Walled cities and reports of giants were the reason an entire generation refused to
            enter the land in the first place. Caleb names the same fear by its same name, and asks for it on
            purpose, not despite his age but because of 45 years of watching the LORD keep every other word
            He spoke.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Hebron Becomes Caleb&apos;s, and the Land Rests Again (verses 13 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua does not argue, question, or make Caleb wait for a lot to be cast.</p>
        </div>
        <VerseQuote
          text="And Joshua blessed him, and gave unto Caleb the son of Jephunneh Hebron for an inheritance."
          reference="Joshua 14:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hebron is the first individual land grant named in the whole division of Canaan, and it goes to
            one man, not one tribe, before a single tribal border has been drawn.
          </p>
        </div>
        <VerseQuote
          text="Hebron therefore became the inheritance of Caleb the son of Jephunneh the Kenezite unto this day, because that he wholly followed the LORD God of Israel."
          reference="Joshua 14:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter states the reason a second time, using the same core phrase as verses 8
            and 9.</strong>{" "}
            Scripture is not vague about why Caleb got this. It repeats &quot;wholly followed the LORD&quot;
            a third time so the reader cannot miss it.
          </p>
          <p>The last verse adds one piece of history and one familiar closing line.</p>
        </div>
        <VerseQuote
          text="And the name of Hebron before was Kirjatharba; which Arba was a great man among the Anakims. And the land had rest from war."
          reference="Joshua 14:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Kirjatharba means the city of Arba, named after a leading figure among the very Anakims Caleb just
            asked to fight. The chapter ends on the same note{" "}
            <ArticleLink href="/blog/joshua-11-explained">Joshua 11</ArticleLink> already used once before,
            that the land rested from war.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 14 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Had Caleb actually driven the Anakims out of Hebron by the end of this chapter?</strong>{" "}
            What the text says: verse 12 records Caleb asking for the mountain and stating his confidence
            that the LORD will help him drive the Anakims out, phrased as a future hope, not a finished
            fact. How this is read: the actual driving out of the Anakims from Hebron is told afterward, in
            Joshua 15:13 and 14, meaning Joshua 14 records the request and the grant of land, while the
            fighting for it still lay ahead of an 85 year old man.
          </p>
          <p>
            <strong>Does verse 15 saying the land rested from war contradict the fact that Caleb still had
            giants to fight?</strong> What the text says: verse 15 states the land had rest from war, the
            same closing phrase Joshua 11:23 already used after the main military campaign ended. How this
            fits together: the statement
            describes the overall state of the land at the close of the organized conquest, not a claim that
            every remaining local resistance, including the fight still ahead of Caleb at Hebron, was already
            finished.
          </p>
          <p>
            <strong>Was Caleb actually an Israelite, given that he is twice called &quot;the
            Kenezite&quot;?</strong> What the text says: Joshua 14:6 and 14 both attach this title to Caleb
            without explaining it. How Bible scholars read it: most read it simply as a clan name within the
            tribe of Judah, since Caleb is consistently listed as Judah&apos;s representative from Numbers 13
            onward. A smaller number of scholars note that Kenaz was also the name of a grandson of Esau in
            Genesis 36, and wonder whether Caleb&apos;s family had roots outside Israel before being counted
            fully within Judah. Scripture itself never raises this question or treats Caleb as anything other
            than a full member of Judah, so it remains a minority observation rather than a settled claim.
          </p>
          <p>
            <strong>Why did only Caleb and Joshua, out of twelve spies and an entire generation, actually
            enter the land?</strong> What the text says: Joshua 14:8 and 9 tie Caleb&apos;s inheritance
            directly to the fact that he wholly followed the LORD when the other spies did not. How this
            connects: <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink> records the
            LORD naming that same reason directly, that Caleb had another spirit in him. The chapter does not
            treat this as luck or timing. It treats it as the direct outcome of one specific response, 45
            years earlier, that everyone else in that generation failed to give.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 14:9</h3>
        <VerseQuote
          text="And Moses sware on that day, saying, Surely the land whereon thy feet have trodden shall be thine inheritance, and thy children's for ever, because thou hast wholly followed the LORD my God."
          reference="Joshua 14:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The promise Caleb is still holding onto 45 years later, and the one this entire chapter exists to
          finally pay out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 14:10 and 11</h3>
        <VerseQuote
          text="And now, behold, the LORD hath kept me alive, as he said, these forty and five years, even since the LORD spake this word unto Moses, while the children of Israel wandered in the wilderness: and now, lo, I am this day fourscore and five years old."
          reference="Joshua 14:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          An 85 year old man naming his exact age and crediting every one of those years directly to the
          LORD keeping him alive for this day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 14:12</h3>
        <VerseQuote
          text="Now therefore give me this mountain, whereof the LORD spake in that day; for thou heardest in that day how the Anakims were there, and that the cities were great and fenced: if so be the LORD will be with me, then I shall be able to drive them out, as the LORD said."
          reference="Joshua 14:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Caleb naming the exact fear that stopped an entire generation, and asking for it anyway, by name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 14:14</h3>
        <VerseQuote
          text="Hebron therefore became the inheritance of Caleb the son of Jephunneh the Kenezite unto this day, because that he wholly followed the LORD God of Israel."
          reference="Joshua 14:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason Scripture gives twice in one chapter for why Caleb received what he received, with no
          other explanation offered or needed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 14:15</h3>
        <VerseQuote
          text="And the name of Hebron before was Kirjatharba; which Arba was a great man among the Anakims. And the land had rest from war."
          reference="Joshua 14:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s closing line, naming the very giant Caleb is about to face even while declaring
          the land at rest.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eleazar the priest and Joshua began dividing the land of Canaan by lot among the remaining tribes.
          Before that division reached anyone else, Caleb reminded Joshua of a promise Moses made him 45
          years earlier and asked for Hebron, including the mountain still held by the Anakim giants, which
          Joshua granted him on the spot.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Caleb in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Caleb was the representative of the tribe of Judah among the twelve spies Moses sent into Canaan in
          Numbers 13. He and Joshua were the only two spies who trusted the LORD&apos;s promise instead of
          fearing the people already living there, and the only two of that entire generation who lived to
          enter the promised land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Caleb ask for Hebron specifically?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebron was the territory Moses had sworn would belong to Caleb back in Kadeshbarnea, the place
          Caleb himself had walked through while scouting the land. Joshua 14:9 ties the promise directly to
          wherever Caleb&apos;s feet had already trodden, and Hebron was that ground.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Caleb when he received Hebron?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 14:10 states he was 85 years old, 45 years after he scouted the land at age 40. He states in
          the same chapter that his strength for war had not changed in all that time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the Kenezite&quot; mean in Joshua 14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most read it as the name of Caleb&apos;s clan within the tribe of Judah. Caleb is consistently
          identified as Judah&apos;s man among the spies and throughout the conquest, and the title appears
          attached to his family line elsewhere in Scripture as well.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;wholly followed the LORD&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 14:8 and 14 both use this exact phrase to describe Caleb&apos;s response when the other ten
          spies brought back a fearful report. It describes a complete trust in what God had said, with
          nothing held back, rather than a claim that Caleb never made a mistake.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Caleb actually drive the giants out of Hebron?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 14 only records Caleb&apos;s request and Joshua granting him the land. The actual driving
          out of the three sons of Anak from Hebron is told afterward, in Joshua 15:13 and 14.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Eleazar the priest help divide the land instead of only Joshua?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 14:1 names Eleazar first among those who distributed the inheritance. Dividing the promised
          land carried priestly weight as well as military authority, and Eleazar held the priesthood that
          had led Israel&apos;s worship since the days of Moses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the tribe of Levi receive no land in Joshua 14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 14:3 and 4 recap the same arrangement already stated in Joshua 13, that the Levites received
          cities to live in among the other tribes rather than their own tribal territory, because their
          portion was service at the altar rather than farmland.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 14 is a short chapter, and almost every line of it belongs to one old man.</p>
          <p>
            📌 <strong>A promise does not expire just because it takes decades to collect.</strong> Caleb
            tracked the exact wording of what Moses swore to him for 45 years, through war and wilderness,
            and brought it back word for word the moment it could finally be paid.
          </p>
          <p>
            📌 <strong>Faithfulness earlier in life can still be asking something of you later in
            life.</strong> Caleb did not retire on the reputation he earned at 40. At 85 he asked for the
            hardest assignment still left on the map.
          </p>
          <p>
            You are probably not 85, and you are probably not facing literal giants. But you likely have a
            promise you have been carrying longer than feels reasonable, with no guarantee anyone else still
            remembers it the way you do.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Name the exact promise you are still holding onto, the way Caleb named his to Joshua, instead of
            letting the years quietly talk you out of asking for it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
