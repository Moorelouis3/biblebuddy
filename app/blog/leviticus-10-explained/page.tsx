import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-10-explained", {
  title: "Leviticus 10 Explained: Strange Fire, Sudden Death, and the Line Between Holy and Unholy",
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

export default function LeviticusTenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-10-explained"
      title={<>📖 Leviticus 10 Explained: Strange Fire, Sudden Death, and the Line Between Holy and Unholy</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The same fire that made Israel shout for joy now makes two men disappear in an instant.</p>
            <p>
              <strong>Leviticus 10 explained</strong> opens on what should have been the best day
              of Aaron&apos;s life. His ordination is finished. His sons are finally serving at
              the altar. Then two of those sons bring fire God never asked for, and fire comes
              back out to meet them, and they are gone before anyone can speak.
            </p>
            <p>Maybe you have wondered how the same chapter can hold both grief and law in the same breath.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What exactly was &quot;strange fire,&quot; and why did it cost Nadab and Abihu their lives?</li>
            <li>❓ Why were Aaron and his remaining sons forbidden to mourn the way everyone else could?</li>
            <li>❓ Why does a ban on wine show up right after two men die at the altar?</li>
            <li>❓ And why does Moses get angry over a goat that was simply burned instead of eaten?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 10 is the chapter that proves access to God was never the same
              thing as safety around God.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the strange fire and the
              fire that answered it, Aaron&apos;s silence, the bodies carried out while the
              priests were told not to grieve, the new law against wine at the tabernacle, what
              the surviving priests were allowed to eat and where, the goat Moses found burned
              instead of eaten, and the answer that finally satisfied him.
            </p>
            <p>Read slowly. This chapter draws a line most readers rush past too quickly.</p>
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
            <ArticleLink href="/blog/leviticus-9-explained">Leviticus 9</ArticleLink> ended with
            fire falling from the LORD to consume the offering on the altar, and the whole camp
            shouting and falling on their faces. That chapter promised the LORD would appear that
            day, and He did, in a way every witness could see.
          </p>
          <p>
            Leviticus 10 opens with no transition at all. The same day, the same altar, the same
            fire that just answered a sacrifice with joy now answers something else entirely. The
            chapter does not let the reader catch their breath between the two.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Strange Fire and Sudden Death (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming two men the book has not yet shown doing anything at all.</p>
        </div>
        <VerseQuote
          text="And Nadab and Abihu, the sons of Aaron, took either of them his censer, and put fire therein, and put incense thereon, and offered strange fire before the LORD, which he commanded them not."
          reference="Leviticus 10:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nadab and Abihu were not strangers to God&apos;s presence.</strong> Exodus
            24 names them among the handful who went partway up the mountain with Moses and
            Aaron, saw God, and ate and drank in His presence without harm. They had already been
            that close once. That history makes verse 1 harder to read, not easier.
          </p>
          <p>
            <strong>Censer</strong> means a small vessel for carrying burning coals and incense.{" "}
            <strong>Strange fire</strong> does not mean the fire looked unusual. It means the fire
            came from the wrong source. &quot;Which he commanded them not&quot; is the key phrase
            in the verse: not a mistake in the recipe, an action God had never authorized at all.
          </p>
          <p>What answers it is immediate.</p>
        </div>
        <VerseQuote
          text="And there went out fire from the LORD, and devoured them, and they died before the LORD."
          reference="Leviticus 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Count the fires in these two chapters. In{" "}
            <ArticleLink href="/blog/leviticus-9-explained">Leviticus 9</ArticleLink>, fire from
            the LORD consumed an offering and the people shouted for joy. Here, fire from the
            LORD consumes two men, and no one shouts. Same source. Completely different result,
            because what it met was completely different.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Moses&apos; Explanation and Aaron&apos;s Silence (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before anyone moves the bodies, Moses speaks first, and he speaks to Aaron, not about him.</p>
        </div>
        <VerseQuote
          text="Then Moses said unto Aaron, This is it that the LORD spake, saying, I will be sanctified in them that come nigh me, and before all the people I will be glorified. And Aaron held his peace."
          reference="Leviticus 10:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Held his peace&quot; means Aaron said nothing.</strong> Not nothing
            in anger, and the text gives no reason to read it as nothing in approval either. A
            father has just lost two sons in front of the whole camp, and Scripture records his
            silence without explaining what filled it. Anything beyond that is the reader
            guessing, not the text speaking.
          </p>
          <p>
            Moses does not say the LORD had never told Israel this principle before. He says this
            is what the LORD &quot;spake,&quot; already, at some earlier point the chapter does
            not name. Coming near God on His own terms has a built in cost whether anyone has
            kept that in view or not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Carried Out, and Not Mourned (verses 4 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Practical instructions follow almost immediately, starting with who removes the bodies.</p>
        </div>
        <VerseQuote
          text="And Moses called Mishael and Elzaphan, the sons of Uzziel the uncle of Aaron, and said unto them, Come near, carry your brethren from before the sanctuary out of the camp."
          reference="Leviticus 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Cousins, not Aaron or his two remaining sons, do the carrying. The men still serving
            at the altar that day are kept apart from the bodies entirely, and the next verses
            explain exactly why.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto Aaron, and unto Eleazar and unto Ithamar, his sons, Uncover not your heads, neither rend your clothes; lest ye die, and lest wrath come upon all the people: but let your brethren, the whole house of Israel, bewail the burning which the LORD hath kindled."
          reference="Leviticus 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Letting the hair hang loose and tearing one&apos;s clothes were Israel&apos;s
            ordinary signs of mourning. Aaron, Eleazar, and Ithamar are told plainly not to do
            either one, on pain of death, while the rest of the nation is told to grieve openly
            on their behalf. The grief was real and allowed. It was simply not allowed to come
            from the men still wearing the anointing oil.
          </p>
        </div>
        <VerseQuote
          text="And ye shall not go out from the door of the tabernacle of the congregation, lest ye die: for the anointing oil of the LORD is upon you. And they did according to the word of Moses."
          reference="Leviticus 10:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;For the anointing oil of the LORD is upon you&quot; is the reason
            given, and it is the only reason given.</strong> Aaron, Eleazar, and Ithamar were set
            apart for service that same oil had marked. Stepping away from that service, even to
            grieve two sons and two brothers, was not treated as a small thing they could decide
            for themselves.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. No Wine or Strong Drink at the Tabernacle (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The LORD speaks to Aaron directly for the first time in the chapter, and the subject shifts without warning.</p>
        </div>
        <VerseQuote
          text="Do not drink wine nor strong drink, thou, nor thy sons with thee, when ye go into the tabernacle of the congregation, lest ye die: it shall be a statute for ever throughout your generations:"
          reference="Leviticus 10:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The text never says Nadab and Abihu were drunk when they brought the strange fire.
            That link is a guess readers have made for a long time because of where this command
            lands, right after two sons just died at that altar, but Leviticus 10:9 does not state
            it as the reason. What it does state plainly is the purpose behind the command.
          </p>
        </div>
        <VerseQuote
          text="And that ye may put difference between holy and unholy, and between unclean and clean;"
          reference="Leviticus 10:10"
        />
        <VerseQuote
          text="And that ye may teach the children of Israel all the statutes which the LORD hath spoken unto them by the hand of Moses."
          reference="Leviticus 10:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A priest&apos;s job in this chapter is named in one sentence: tell the
            difference, and teach it.</strong> Holy from unholy. Clean from unclean. A clear mind
            was not optional for a role whose entire purpose was making distinctions other people
            depended on. Whatever actually happened with Nadab and Abihu, the command that
            follows their death is not really about that one morning. It is a permanent statute
            for every priest after them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What the Surviving Priests Could Eat, and Where (verses 12 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses turns from the dead to the living, and gives Aaron, Eleazar, and Ithamar their next instruction the same day.</p>
        </div>
        <VerseQuote
          text="And Moses spake unto Aaron, and unto Eleazar and unto Ithamar, his sons that were left, Take the meat offering that remaineth of the offerings of the LORD made by fire, and eat it without leaven beside the altar: for it is most holy:"
          reference="Leviticus 10:12"
        />
        <VerseQuote
          text="And ye shall eat it in the holy place, because it is thy due, and thy sons' due, of the sacrifices of the LORD made by fire: for so I am commanded."
          reference="Leviticus 10:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;His sons that were left&quot; is a quiet, exact phrase. Two sons are already
            gone. The instruction keeps moving forward anyway, naming the two who remain and
            telling them exactly where to eat this particular offering and why: because it is
            &quot;most holy,&quot; the strongest category this book uses.
          </p>
          <p>A second portion comes with a different location attached.</p>
        </div>
        <VerseQuote
          text="And the wave breast and heave shoulder shall ye eat in a clean place; thou, and thy sons, and thy daughters with thee: for they be thy due, and thy sons' due, which are given out of the sacrifices of peace offerings of the children of Israel."
          reference="Leviticus 10:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the difference in location and household.</strong> The most holy
            meat offering could only be eaten by priests themselves, in the holy place. The wave
            breast and heave shoulder, the priestly portion of a peace offering already described
            back in{" "}
            <ArticleLink href="/blog/leviticus-7-explained">Leviticus 7</ArticleLink>, only needed
            a clean place, and the whole priestly household, sons and daughters included, could
            share it. Not every holy thing carried the same restriction. The chapter is careful to
            say which rule applies to which food.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Burnt Goat and Moses&apos; Anger (verses 16 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses goes looking for one specific animal, and does not find it where he expects.</p>
        </div>
        <VerseQuote
          text="And Moses diligently sought the goat of the sin offering, and, behold, it was burnt: and he was angry with Eleazar and Ithamar, the sons of Aaron which were left alive, saying,"
          reference="Leviticus 10:16"
        />
        <VerseQuote
          text="Wherefore have ye not eaten the sin offering in the holy place, seeing it is most holy, and God hath given it you to bear the iniquity of the congregation, to make atonement for them before the LORD?"
          reference="Leviticus 10:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Diligently sought&quot; means Moses went looking carefully, not casually. This
            was the people&apos;s sin offering from{" "}
            <ArticleLink href="/blog/leviticus-9-explained">Leviticus 9</ArticleLink>, the goat
            offered that very day to make atonement for the whole congregation. The normal rule
            for a sin offering whose blood never entered the holy place, already laid out in{" "}
            <ArticleLink href="/blog/leviticus-6-explained">Leviticus 6</ArticleLink>, was that the
            priests ate it in the holy place rather than burning it. Eleazar and Ithamar had
            burned it instead.
          </p>
          <p>Moses states the reason the rule mattered, not just the rule itself.</p>
        </div>
        <VerseQuote
          text="Behold, the blood of it was not brought in within the holy place: ye should indeed have eaten it in the holy place, as I commanded."
          reference="Leviticus 10:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Eating that goat was not a reward for the priests. It was a duty.</strong>{" "}
            Verse 17 calls it bearing &quot;the iniquity of the congregation,&quot; part of how
            atonement for the people actually happened. Burning it instead of eating it, however
            it was intended, skipped a step God had specifically commanded.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Aaron&apos;s Answer, and Moses Is Satisfied (verses 19 and 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Aaron, not his sons, answers for what happened.</p>
        </div>
        <VerseQuote
          text="And Aaron said unto Moses, Behold, this day have they offered their sin offering and their burnt offering before the LORD; and such things have befallen me: and if I had eaten the sin offering to day, should it have been accepted in the sight of the LORD?"
          reference="Leviticus 10:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Aaron does not deny the goat was burned. He explains the reasoning behind it:
            &quot;such things have befallen me,&quot; a plain way of naming the day he had just
            had, and a real question about whether eating a holy meal in the middle of that grief
            would have honored God or not.
          </p>
        </div>
        <VerseQuote
          text="And when Moses heard that, he was content."
          reference="Leviticus 10:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter that opened with God&apos;s anger at Nadab and Abihu closes
            with Moses satisfied by Aaron&apos;s answer.</strong> The text does not say Aaron was
            right because he was Moses&apos; brother, or let off easy because of what he had just
            suffered. It says Moses heard the reasoning and accepted it. Not every departure from
            the letter of a command gets the same response in this book, and this chapter does
            not explain why this one did. It simply records that it did.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What exactly made the fire &quot;strange&quot;?</strong> Leviticus 10:1 states
            only that it was fire God &quot;commanded them not,&quot; without listing the specific
            rule it broke. What the rest of the book supplies is a strong, text based clue:{" "}
            <ArticleLink href="/blog/leviticus-6-explained">Leviticus 6</ArticleLink> already
            commanded that the fire on the altar burn continually and never go out, and Leviticus
            16:12 later describes the high priest taking coals specifically &quot;from off the
            altar&quot; for his censer. The most likely reading is that Nadab and Abihu&apos;s fire
            came from some other source entirely, not from that one authorized flame, though the
            chapter itself never spells this out in so many words.
          </p>
          <p>
            <strong>Were Nadab and Abihu drunk when they did this?</strong> Some readers connect
            the wine and strong drink ban in verses 9 to 11 directly to their deaths, and the
            placement in the text invites that reading. But Leviticus 10 never states it as fact.
            What can be said honestly is that the command follows their death immediately and
            applies to every priest after them, whatever was or was not true of that one morning.
          </p>
          <p>
            <strong>Why forbid Aaron and his surviving sons from the normal signs of mourning?</strong>{" "}
            Verses 6 and 7 give the reason directly: &quot;for the anointing oil of the LORD is
            upon you.&quot; The men still consecrated for service at that moment were not free to
            step out of that role, even for grief that every reader can recognize as real and
            understandable. The rest of Israel was explicitly told to mourn in their place.
          </p>
          <p>
            <strong>Why was Moses satisfied with Aaron&apos;s explanation for the burned
            goat?</strong> Leviticus 10:20 records the outcome, &quot;he was content,&quot; without
            explaining Moses&apos; full reasoning. What the text does show is that Aaron&apos;s
            answer addressed the actual question Moses asked, whether the goat had been eaten
            where commanded, by explaining the circumstances rather than denying what had
            happened. The chapter treats an honest accounting differently than it treated an
            unauthorized act offered with no explanation at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 10:1 and 2</h3>
        <VerseQuote
          text="And Nadab and Abihu, the sons of Aaron, took either of them his censer, and put fire therein, and put incense thereon, and offered strange fire before the LORD, which he commanded them not. And there went out fire from the LORD, and devoured them, and they died before the LORD."
          reference="Leviticus 10:1 and 2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same fire that answered Israel&apos;s sacrifice with joy one chapter earlier
          answers an unauthorized act with judgment here. The source never changed. What it met
          did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 10:3</h3>
        <VerseQuote
          text="This is it that the LORD spake, saying, I will be sanctified in them that come nigh me, and before all the people I will be glorified. And Aaron held his peace."
          reference="Leviticus 10:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A father says nothing after losing two sons in front of the whole camp. Scripture
          records the silence without filling it in for him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 10:9 and 10</h3>
        <VerseQuote
          text="Do not drink wine nor strong drink, thou, nor thy sons with thee, when ye go into the tabernacle of the congregation, lest ye die: it shall be a statute for ever throughout your generations: And that ye may put difference between holy and unholy, and between unclean and clean;"
          reference="Leviticus 10:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A priest&apos;s core task stated in one breath: tell the difference between holy and
          unholy. A clear mind was never optional for that job.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 10:17</h3>
        <VerseQuote
          text="Wherefore have ye not eaten the sin offering in the holy place, seeing it is most holy, and God hath given it you to bear the iniquity of the congregation, to make atonement for them before the LORD?"
          reference="Leviticus 10:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Eating that offering was never a priestly perk. It was a commanded part of how
          atonement for the whole congregation actually happened.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 10:19 and 20</h3>
        <VerseQuote
          text="And such things have befallen me: and if I had eaten the sin offering to day, should it have been accepted in the sight of the LORD? And when Moses heard that, he was content."
          reference="Leviticus 10:19 and 20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A chapter that opens with judgment on an unexplained act closes with mercy toward an
          explained one. The difference between the two is not left unmarked.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Leviticus 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two of Aaron&apos;s sons, Nadab and Abihu, offered unauthorized &quot;strange fire&quot;
          before the LORD and were instantly killed by fire from the LORD. Moses then gave Aaron
          and his two remaining sons instructions about mourning, forbade priests from drinking
          wine or strong drink at the tabernacle, laid out what the priests could eat and where,
          and confronted Eleazar and Ithamar over a sin offering that was burned instead of eaten
          before accepting Aaron&apos;s explanation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Nadab and Abihu?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 6:23 names them as the two oldest sons of Aaron. Exodus 24:1 and 9 to 11 lists
          them among the small group, alongside Moses and seventy elders, who went partway up
          Mount Sinai, saw God, and ate and drank in His presence without being harmed. By the
          time Leviticus 10 opens, they had already been unusually close to God once before.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was &quot;strange fire&quot; in Leviticus 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 10:1 calls it fire &quot;which he commanded them not,&quot; without naming the
          exact rule it broke. The likely explanation, based on Leviticus 6&apos;s command that
          the altar fire burn continually and Leviticus 16&apos;s instruction to take censer coals
          &quot;from off the altar,&quot; is that Nadab and Abihu used fire from an unauthorized
          source rather than the one fire God had sanctioned.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were Nadab and Abihu drunk?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never says so directly. The ban on wine and strong drink in verses 9 to 11
          comes immediately after their death, which has led many readers to connect the two, but
          Leviticus 10 states the command as a permanent statute for every future priest, not as
          a stated explanation for what happened to Nadab and Abihu specifically.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t Aaron mourn his sons?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 10:6 and 7 give the reason directly: the anointing oil of the LORD was still
          on Aaron, Eleazar, and Ithamar. As men currently set apart for tabernacle service, they
          were told not to uncover their heads or tear their clothes, the normal signs of
          mourning, while the rest of Israel was told to grieve on their behalf instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God forbid wine for priests at the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 10:10 and 11 state the purpose plainly: so the priests could tell the
          difference between holy and unholy, clean and unclean, and teach those statutes to
          Israel accurately. A clear mind was treated as necessary for a role whose whole job was
          making careful distinctions other people&apos;s worship depended on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Moses angry about the burned goat?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 10:16 to 18 show Moses discovering that the people&apos;s sin offering had
          been burned rather than eaten in the holy place, the normal procedure already commanded
          in Leviticus 6. Eating it was not optional; it was how the priests bore the
          congregation&apos;s guilt as part of making atonement for them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses accept Aaron&apos;s explanation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 10:20 states only that Moses &quot;was content&quot; once he heard
          Aaron&apos;s reasoning, without explaining His full thinking. Aaron&apos;s answer
          directly addressed the circumstances of that specific day rather than ignoring the
          command, which the chapter treats differently than it treated the unexplained act of
          Nadab and Abihu.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 10 connect to Leviticus 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The two chapters share the same day and the same fire. Leviticus 9 ends with fire from
          the LORD consuming an offering while the people shout for joy. Leviticus 10 opens with
          fire from the same LORD consuming two men instead, showing that access to God&apos;s
          presence never removed the need to approach Him on His own terms.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Leviticus 10 mean God punishes every mistake in worship this severely?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter itself argues against that reading in its own closing verses. Eleazar and
          Ithamar also departed from a specific command, burning a sin offering instead of eating
          it, and Moses accepted Aaron&apos;s explanation rather than treating it the way Nadab
          and Abihu&apos;s unauthorized fire was treated. The text distinguishes between an
          unexplained act God never commanded and a decision made under real, acknowledged
          circumstances.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 10 refuses to let one chapter&apos;s joy carry into the next without a warning attached.</p>
          <p>
            📌 <strong>Closeness to God is not the same thing as safety around God.</strong> Nadab
            and Abihu had already seen Him on the mountain. That history did not exempt them from
            approaching Him on His own terms this time.
          </p>
          <p>
            📌 <strong>A clear mind and a clear distinction between holy and unholy were not
            minor details.</strong> They were named as the actual job a priest existed to do,
            right after the chapter&apos;s worst morning.
          </p>
          <p>
            📌 <strong>Not every departure from a command gets the same response.</strong> An
            unauthorized act with no explanation ended in judgment. An honest accounting of real
            circumstances ended with Moses content.
          </p>
          <p>
            You will never carry a censer or stand at a bronze altar. But this chapter still asks
            whether you approach God carelessly or carefully, and whether you are honest about
            your own choices the way Aaron was about his.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before your next moment of worship, however ordinary, ask whether you are bringing
            what God actually asked for, or just something that looks close enough.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
