import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-28-explained", {
  title: "Numbers 28 Explained: The Offering Calendar Israel Could Never Skip",
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

export default function NumbersTwentyEightExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-28-explained"
      title={<>📖 Numbers 28 Explained: The Offering Calendar Israel Could Never Skip</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One chapter ago, Moses just learned the mountain where he will die.</p>
            <p>
              <strong>Numbers 28 explained</strong> is what God hands Israel right after that. Not a eulogy, not a
              battle plan, a calendar. Every lamb, every loaf of flour, every cup of wine the nation owes God each
              day, each Sabbath, each new month, and at Passover, gets written down here before Moses ever climbs
              that mountain.
            </p>
            <p>Maybe you have wondered why a list like this even made it into the Bible at all.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God repeat the daily offering law He already gave back at Sinai?</li>
            <li>❓ What is a drink offering, and why does every sacrifice in this chapter need one?</li>
            <li>❓ Why do Passover week and the day of firstfruits ask for the exact same animals?</li>
            <li>❓ Does this chapter still mean anything once the sacrifices themselves have stopped?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 28 is God telling Israel what faithfulness looks like on an ordinary Tuesday, not
              only during a crisis.</strong> Leadership changes. The calendar does not.
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the twice daily lamb that never stopped
              burning, the extra Sabbath offering, the new moon offering, Passover and the week of unleavened bread,
              and the day of firstfruits that closes the chapter.
            </p>
            <p>Thirty one verses, and not one wasted word in any of them.</p>
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
            <ArticleLink href="/blog/numbers-27-explained">Numbers 27</ArticleLink> closed with a changing of the
            guard. Zelophehad&apos;s daughters won their case for an inheritance, then God told Moses plainly that
            his own inheritance in the land was never coming. Moses asked for a shepherd for the people instead of
            asking for himself, and Joshua was commissioned in front of the whole congregation.
          </p>
          <p>
            Numbers 28 does not continue that story. The narrative pauses here for three full chapters of law,
            covering offerings, feasts, and vows, before the fighting resumes in Numbers 31. This chapter is the
            first of that pause, and it answers a question the previous chapter never had to ask. Once Moses is
            gone and Joshua is leading, what exactly does Israel still owe God every single day, whether anything
            dramatic is happening or not?
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 28 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Daily Offering, Morning and Evening (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God opens with the offering that never had a day off.</p>
        </div>
        <VerseQuote
          text="Command the children of Israel, and say unto them, My offering, and my bread for my sacrifices made by fire, for a sweet savour unto me, shall ye observe to offer unto me in their due season."
          reference="Numbers 28:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;My offering, and my bread.&quot; God calls it His own before a single detail of it is described.
            This was never Israel doing God a favor. It was upkeep on a relationship God Himself set the terms for.
          </p>
        </div>
        <VerseQuote
          text="This is the offering made by fire which ye shall offer unto the LORD; two lambs of the first year without spot day by day, for a continual burnt offering. The one lamb shalt thou offer in the morning, and the other lamb shalt thou offer at even;"
          reference="Numbers 28:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two lambs, every single day, one at sunrise and one at sunset, for as long as Israel existed
            as a nation under this covenant.</strong> This was not a new command. It had already been given decades
            earlier.
          </p>
        </div>
        <VerseQuote
          text="Now this is that which thou shalt offer upon the altar; two lambs of the first year day by day continually."
          reference="Exodus 29:38"
        />
        <VerseQuote
          text="This shall be a continual burnt offering throughout your generations at the door of the tabernacle of the congregation before the LORD: where I will meet you, to speak there unto thee."
          reference="Exodus 29:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Numbers 28 itself points back to that same moment, in case anyone wonders whether this is a fresh
            demand placed on a new generation.
          </p>
        </div>
        <VerseQuote
          text="It is a continual burnt offering, which was ordained in mount Sinai for a sweet savour, a sacrifice made by fire unto the LORD."
          reference="Numbers 28:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Continual</strong> translates a Hebrew word that simply means ongoing, without break. Four
            decades had passed, an entire generation had died in the wilderness, and this one offering had not
            missed a morning or an evening the whole time. Every lamb also carried flour mixed with oil and a cup of
            wine poured out beside it, a meat offering and a drink offering riding along with the burnt offering
            every single time.
          </p>
          <p>
            That detail matters for the rest of the chapter. Every offering from here on, the Sabbath, the new
            moon, Passover, firstfruits, gets added{" "}
            <ArticleLink href="/blog/exodus-29-explained">on top of</ArticleLink> this daily offering, never instead
            of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Sabbath Adds Its Own Offering (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Sabbath does not replace the daily offering. It doubles it.</p>
        </div>
        <VerseQuote
          text="And on the sabbath day two lambs of the first year without spot, and two tenth deals of flour for a meat offering, mingled with oil, and the drink offering thereof: This is the burnt offering of every sabbath, beside the continual burnt offering, and his drink offering."
          reference="Numbers 28:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two more lambs, on top of the usual two.</strong> On an ordinary day Israel offers two lambs.
            On the Sabbath, that becomes four, even though the Sabbath is also the one day a week built entirely
            around rest. The day of rest cost Israel more sacrifice, not less. Resting from work never meant
            resting from worship.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The New Moon Offering (verses 11 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every new moon marked the start of a month on Israel&apos;s calendar, and it carried its own offering.</p>
        </div>
        <VerseQuote
          text="And in the beginnings of your months ye shall offer a burnt offering unto the LORD; two young bullocks, and one ram, seven lambs of the first year without spot;"
          reference="Numbers 28:11"
        />
        <VerseQuote
          text="And one kid of the goats for a sin offering unto the LORD shall be offered, beside the continual burnt offering, and his drink offering."
          reference="Numbers 28:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two bullocks, one ram, seven lambs, and one goat. Eleven animals, on top of the day&apos;s
            usual two lambs, marking a new month every single time.</strong> Notice this is also the first time in
            the chapter a sin offering shows up. The daily offering and the Sabbath offering never include one.
            Something about marking a new month called for dealing with sin specifically, not only giving thanks.
          </p>
          <p>
            Hold onto that exact list of animals. Two bullocks, one ram, seven lambs, one goat. It is about to
            repeat itself twice more before the chapter ends.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Passover and the Week of Unleavened Bread (verses 16 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter moves from monthly rhythm to the first great feast of Israel&apos;s year, the one{" "}
            <ArticleLink href="/blog/exodus-12-explained">instituted the night Israel left Egypt</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="And in the fourteenth day of the first month is the passover of the LORD. And in the fifteenth day of this month is the feast: seven days shall unleavened bread be eaten."
          reference="Numbers 28:16 and 17"
        />
        <VerseQuote
          text="But ye shall offer a sacrifice made by fire for a burnt offering unto the LORD; two young bullocks, and one ram, and seven lambs of the first year: they shall be unto you without blemish:"
          reference="Numbers 28:19"
        />
        <VerseQuote text="And one goat for a sin offering, to make an atonement for you." reference="Numbers 28:22" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Same eleven animals as the new moon offering. But this time it is not a single day&apos;s requirement.
          </p>
        </div>
        <VerseQuote
          text="After this manner ye shall offer daily, throughout the seven days, the meat of the sacrifice made by fire, of a sweet savour unto the LORD: it shall be offered beside the continual burnt offering, and his drink offering."
          reference="Numbers 28:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two bullocks, one ram, seven lambs, and one goat, repeated every single day for all seven
            days of the feast.</strong> Seventy seven animals for that one festival week alone, and that count
            still does not include the fourteen lambs the twice daily offering also required across those same
            seven days.{" "}
            <ArticleLink href="/blog/leviticus-23-explained">Leviticus 23</ArticleLink> had already named Passover
            and the feast days. Numbers 28 is the chapter that finally says how much each day of it actually cost.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Day of Firstfruits (verses 26 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with one more holy day, counted out in weeks from an earlier harvest offering rather than fixed to a set date on the calendar.</p>
        </div>
        <VerseQuote
          text="Also in the day of the firstfruits, when ye bring a new meat offering unto the LORD, after your weeks be out, ye shall have an holy convocation; ye shall do no servile work:"
          reference="Numbers 28:26"
        />
        <VerseQuote
          text="But ye shall offer the burnt offering for a sweet savour unto the LORD; two young bullocks, one ram, seven lambs of the first year;"
          reference="Numbers 28:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;After your weeks be out&quot; is this chapter&apos;s name for what later Scripture calls the
            feast of weeks, counted seven full weeks after the firstfruits of the harvest. The exact same seven
            weeks of counting lies behind the Greek name Pentecost, meaning fiftieth, the day the Holy Spirit came
            on the church in Acts 2.
          </p>
          <p>
            📌 <strong>Two bullocks, one ram, seven lambs, one goat, for the third time in this chapter.</strong>{" "}
            The new moon offering, the full week of Passover, and firstfruits all share the exact same formula of
            animals. Three completely different occasions, spread across an entire year, answered with one
            identical list every time. God was not improvising a new requirement for each feast. He was applying
            one pattern consistently.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 28 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does God repeat a law He already gave at Sinai, word for word in substance?</strong> Numbers
            28:6 itself answers this directly, calling the daily offering one &quot;ordained in mount Sinai,&quot;
            not a new rule. The repetition is not forgetfulness. An entire generation that heard the original
            command at Sinai had since died in the wilderness. The generation about to enter the land needed to
            hear, in their own ears, what their fathers had already agreed to decades earlier.
          </p>
          <p>
            <strong>Do Numbers 28 and Leviticus 23 actually agree on the firstfruits offering?</strong> Not exactly,
            and this chapter is honest ground to say so plainly. Numbers 28:27 lists two bullocks and one ram for
            the day of firstfruits.
          </p>
        </div>
        <VerseQuote
          text="And ye shall offer with the bread seven lambs without blemish of the first year, and one young bullock, and two rams: they shall be for a burnt offering unto the LORD, with their meat offering, and their drink offerings, even an offering made by fire, of sweet savour unto the LORD."
          reference="Leviticus 23:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Leviticus 23:18 lists one bullock and two rams for the same feast, the bullock and ram counts reversed
            from Numbers 28:27. Both chapters agree on seven lambs and the same kind of offering. Scripture never
            explains the difference in bullocks and rams, and forcing the two numbers to match would be adding to
            the text rather than reading it. The honest answer is that both counts stand exactly as written.
          </p>
          <p>
            <strong>Why does a sin offering appear at every feast in this chapter, but never in the daily or
            Sabbath offering?</strong> The text does not say outright, but the pattern is consistent enough to
            notice. The daily and Sabbath offerings are described only as burnt offerings, maintaining an ongoing
            relationship already in place. Every feast in this chapter adds a goat specifically &quot;for a sin
            offering,&quot; as if stepping into a holy day called for dealing with guilt freshly, not only renewing
            routine worship.
          </p>
          <p>
            <strong>Why give Israel a feast tied to a grain harvest while they are still eating manna in the
            wilderness?</strong> Numbers 28 never says the offerings here start the day this law is spoken. Like
            much of the law given in Moses&apos; final months, this calendar describes life in the land Israel is
            about to enter, not life in the wilderness camp still gathered around the tabernacle. The command looks
            forward to fields they had not yet planted.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 28
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 28:2</h3>
        <VerseQuote
          text="Command the children of Israel, and say unto them, My offering, and my bread for my sacrifices made by fire, for a sweet savour unto me, shall ye observe to offer unto me in their due season."
          reference="Numbers 28:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God names the offering His own before a single detail is given. Every sacrifice in this chapter answers
          something God asked for, not something Israel invented to impress Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 28:3 and 4</h3>
        <VerseQuote
          text="This is the offering made by fire which ye shall offer unto the LORD; two lambs of the first year without spot day by day, for a continual burnt offering. The one lamb shalt thou offer in the morning, and the other lamb shalt thou offer at even;"
          reference="Numbers 28:3 and 4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The offering that framed every single day in Israel&apos;s camp, one lamb at sunrise and one at sunset,
          for as long as the nation stood under this covenant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 28:9 and 10</h3>
        <VerseQuote
          text="And on the sabbath day two lambs of the first year without spot, and two tenth deals of flour for a meat offering, mingled with oil, and the drink offering thereof: This is the burnt offering of every sabbath, beside the continual burnt offering, and his drink offering."
          reference="Numbers 28:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Rest from labor never meant rest from worship. The one day set aside for rest asked for double the
          sacrifice of an ordinary day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 28:19</h3>
        <VerseQuote
          text="But ye shall offer a sacrifice made by fire for a burnt offering unto the LORD; two young bullocks, and one ram, and seven lambs of the first year: they shall be unto you without blemish:"
          reference="Numbers 28:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact formula of animals that this chapter also assigns to the new moon offering and the day of
          firstfruits, repeated at the start of Passover week.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 28:26</h3>
        <VerseQuote
          text="Also in the day of the firstfruits, when ye bring a new meat offering unto the LORD, after your weeks be out, ye shall have an holy convocation; ye shall do no servile work:"
          reference="Numbers 28:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The count of seven weeks named here is the same count behind Pentecost, the day the church would later
          receive the Holy Spirit in Acts 2.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 28
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 28 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 28 lists the offerings Israel owed God on every ordinary day, every Sabbath, every new moon, and
          during Passover week and the day of firstfruits. It is a calendar of required sacrifices, given right
          after Moses learned he would not enter the land himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the continual burnt offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was two lambs offered every single day without exception, one in the morning and one in the evening,
          as Numbers 28:3 and 4 describe. Numbers 28:6 confirms it was not new, it had already been ordained back
          at Mount Sinai in Exodus 29.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a drink offering in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A drink offering was wine poured out before the LORD alongside a burnt offering and meat offering, never
          offered on its own. Numbers 28 attaches one to every single sacrifice in the chapter, from the daily
          lambs to the feast day animals.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Sabbath require more sacrifice, not less?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 28:9 and 10 add two extra lambs on top of the usual daily two, doubling the offering on the one
          day set apart for rest. Resting from ordinary work never meant reducing devotion to God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do the new moon, Passover week, and firstfruits offerings match?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All three ask for two young bullocks, one ram, seven lambs, and one goat, described in Numbers 28:11,
          28:19, and 28:27. The repetition shows a consistent pattern rather than a separate requirement invented
          for each occasion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Numbers 28 and Leviticus 23 disagree about the firstfruits offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, on one detail. Numbers 28:27 lists two bullocks and one ram, while Leviticus 23:18 lists one bullock
          and two rams for that same day. Scripture does not explain the difference, and both numbers stand exactly
          as written.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the day of firstfruits in Numbers 28?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 28:26 calls it the day a new grain offering was brought after counting out full weeks from the
          harvest. Later Scripture calls this same count the feast of weeks, and the Greek name for it, Pentecost,
          describes the fiftieth day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Numbers 28 repeat laws already given in Exodus and Leviticus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The generation that first heard these laws at Sinai had died in the wilderness by the time Numbers 28 was
          spoken. Numbers 28:6 names the daily offering as one already ordained at Sinai, repeating it for the new
          generation about to live it out in the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Numbers 28 relevant for Christians who do not offer animal sacrifices?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The specific sacrifices ended with Christ&apos;s finished work, but the chapter&apos;s picture of faithfulness
          offered on ordinary days, not only in a crisis, still applies. The daily lamb pictures a devotion that
          never took a day off, which is still the shape of a life following God.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 28 looks like a list. Underneath the list sits a real claim about what faithfulness is made of.</p>
          <p>
            📌 <strong>Devotion to God is measured on ordinary days, not only during a crisis.</strong> This
            chapter arrives right after a succession crisis in Numbers 27, and it has nothing to say about Moses or
            Joshua at all. It is only concerned with the next sunrise and the next sunset.
          </p>
          <p>
            📌 <strong>Rest and worship were never competitors.</strong> The Sabbath, the one day built around
            rest, asked for double the daily sacrifice, not a break from it.
          </p>
          <p>
            📌 <strong>God repeats one pattern rather than inventing a new rule for every occasion.</strong> The
            same list of animals answers the new moon, Passover week, and firstfruits alike, because faithfulness
            does not need to be reinvented every time a new holy day arrives.
          </p>
          <p>
            You are probably not counting lambs or pouring out wine this week. But you do have a version of the
            daily offering, the ordinary, unglamorous thing God asks of you before anything dramatic ever happens.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the one thing you keep treating as optional because it feels small, then do it today the way
            Israel offered that first lamb, before the sun was even fully up.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
