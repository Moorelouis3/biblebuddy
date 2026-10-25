import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-25-explained", {
  title: "Leviticus 25 Explained: The Sabbath Year and the Year of Jubilee",
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

export default function LeviticusTwentyFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-25-explained"
      title={<>📖 Leviticus 25 Explained: The Sabbath Year and the Year of Jubilee</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Count to forty nine, and something changes for every field, every house, and every family in Israel.</p>
            <p>
              <strong>Leviticus 25 explained</strong> is the chapter where the calendar stops
              serving only feast days and starts serving debt, land, and freedom itself. One law
              tells a farmer to let his field sit untouched for an entire year. Another law tells
              a buyer exactly how to price land he does not really own forever. A third law tells
              a brother selling himself into service exactly when he gets to go home.
            </p>
            <p>Maybe you have only ever heard one line from this chapter, carved onto a bell in Philadelphia.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did the land itself need a year of rest, not just the people working it?</li>
            <li>❓ What actually happened on the Year of Jubilee, and why fifty years?</li>
            <li>❓ Why could an Israelite not be enslaved by his own people forever, when the chapter allows exactly that for foreigners?</li>
            <li>❓ And what happened to a family that could not afford to buy back the field or the house they had lost?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 25 keeps repeating one idea in a dozen different situations:
              nothing in Israel, not the land, not a field, not even a person, ever belonged to
              anyone forever except God.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the sabbath given to the
              land itself, the count of forty nine years to one trumpet blast, fair pricing by a
              clock everyone could count, trusting God for the seventh year&apos;s food, land and
              houses that eventually come back to their original family, mercy for a brother who
              falls on hard times, and the Israelite sold to a foreigner who is never without a
              way home.
            </p>
            <p>Read slowly. This chapter puts a number on things you might have assumed had none.</p>
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
            <ArticleLink href="/blog/leviticus-24-explained">Leviticus 24</ArticleLink> closed on
            a single case, a man under guard until God Himself named the sentence for cursing the
            LORD&apos;s name. That chapter measured one offense against one standard applied
            without exception.
          </p>
          <p>
            Leviticus 25 widens the lens again, this time from people and offerings to land,
            debt, and freedom. It even reuses a date <ArticleLink href="/blog/leviticus-23-explained">Leviticus 23</ArticleLink>{" "}
            already fixed on the calendar. The Day of Atonement, the tenth day of the seventh
            month, is not only the day Israel fasted and watched the high priest carry its sin
            away. Once every fifty years, that same day is also the day a trumpet announces that
            every family gets its land back.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 25 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Land Gets a Sabbath of Its Own (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by handing the sabbath rule to something that cannot keep a calendar.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, When ye come into the land which I give you, then shall the land keep a sabbath unto the LORD."
          reference="Leviticus 25:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel had already kept a sabbath every seventh day. Now the field itself gets the
            same rhythm, stretched out over years instead of days.
          </p>
        </div>
        <VerseQuote
          text="But in the seventh year shall be a sabbath of rest unto the land, a sabbath for the LORD: thou shalt neither sow thy field, nor prune thy vineyard. That which groweth of its own accord of thy harvest thou shalt not reap, neither gather the grapes of thy vine undressed: for it is a year of rest unto the land."
          reference="Leviticus 25:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No sowing. No pruning. No organized harvest at all.</strong> Whatever grew
            on its own that year grew without a farmer managing it, and nobody was allowed to
            treat it as a normal crop.
          </p>
          <p>Whatever did grow was not wasted. It just belonged to everyone, not to the landowner alone.</p>
        </div>
        <VerseQuote
          text="And the sabbath of the land shall be meat for you; for thee, and for thy servant, and for thy maid, and for thy hired servant, and for thy stranger that sojourneth with thee, And for thy cattle, and for the beast that are in thy land, shall all the increase thereof be meat."
          reference="Leviticus 25:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice who gets to eat from the untended field: the landowner, his servants, his
            hired workers, the foreigner living nearby, and even the animals. For one year out of
            seven, ownership stopped deciding who got fed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Counting Forty Nine Years to One Trumpet Blast (verses 8 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From a single seventh year, the chapter zooms out to a much longer count.</p>
        </div>
        <VerseQuote
          text="And thou shalt number seven sabbaths of years unto thee, seven times seven years; and the space of the seven sabbaths of years shall be unto thee forty and nine years. Then shalt thou cause the trumpet of the jubile to sound on the tenth day of the seventh month, in the day of atonement shall ye make the trumpet sound throughout all your land. And ye shall hallow the fiftieth year, and proclaim liberty throughout all the land unto all the inhabitants thereof: it shall be a jubile unto you; and ye shall return every man unto his possession, and ye shall return every man unto his family."
          reference="Leviticus 25:8 to 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Jubile</strong> is the exact word the King James translators used. English
            speakers now say <strong>Jubilee</strong>, but the idea is the same either way: seven
            sabbath years, seven times over, land on the fiftieth year, the one that resets
            everything.
          </p>
          <p>
            📌 <strong>&quot;Return every man unto his possession&quot; meant exactly what it
            says.</strong> Whatever land a family had sold off over the previous forty nine
            years, whoever was serving someone else to pay off a debt, this was the year it all
            came back. Not as a favor. As a command written into the calendar from the start.
          </p>
        </div>
        <VerseQuote
          text="A jubile shall that fiftieth year be unto you: ye shall not sow, neither reap that which groweth of itself in it, nor gather the grapes in it of thy vine undressed. For it is the jubile; it shall be holy unto you: ye shall eat the increase thereof out of the field."
          reference="Leviticus 25:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The math here is unforgiving on purpose. The Jubilee year sat right next to a
            regular sabbath year, which means Israel may have faced two years in a row with no
            planted harvest. The land rules were never designed around the easiest possible
            schedule.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Buying and Selling on the Jubilee Clock (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once Jubilee sets a hard reset point, buying and selling land can never work like an ordinary sale again.</p>
        </div>
        <VerseQuote
          text="According to the number of years after the jubile thou shalt buy of thy neighbour, and according unto the number of years of the fruits he shall sell unto thee: According to the multitude of years thou shalt increase the price thereof, and according to the fewness of years thou shalt diminish the price of it: for according to the number of the years of the fruits doth he sell unto thee."
          reference="Leviticus 25:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Nobody was ever actually buying land in Israel. They were buying a number
            of harvests.</strong> Land sold right after a Jubilee, with forty nine years of crops
            still ahead of it, cost far more than the same field sold the year before the next
            Jubilee, with almost nothing left to farm before it reverted.
          </p>
          <p>That math closes with a plain command, aimed straight at anyone tempted to use the system unfairly.</p>
        </div>
        <VerseQuote
          text="Ye shall not therefore oppress one another; but thou shalt fear thy God: for I am the LORD your God."
          reference="Leviticus 25:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A fair price was not optional kindness. It was the law.</strong> Knowing
            exactly how many years were left until Jubilee removed every excuse for lowballing a
            desperate seller or overcharging a buyer who had no other land to turn to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Trusting God for the Seventh Year (verses 18 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after the pricing rules, the chapter answers the question every farmer reading this law was already asking.</p>
        </div>
        <VerseQuote
          text="And if ye shall say, What shall we eat the seventh year? behold, we shall not sow, nor gather in our increase: Then I will command my blessing upon you in the sixth year, and it shall bring forth fruit for three years. And ye shall sow the eighth year, and eat yet of old fruit until the ninth year; until her fruits come in ye shall eat of the old store."
          reference="Leviticus 25:20 to 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ That is not a rhetorical question God ignores. He states it out loud, the exact
            worry a farmer would have, then answers it with a specific promise: one sixth year
            harvest, stretched to cover three years of eating.
          </p>
          <p>
            💡 Obeying this law meant doing the math on paper and coming up short, then obeying it
            anyway because of what God said He would do. That is close to the same question{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              Scripture asks anyone wrestling with anxiety over provision
            </ArticleLink>{" "}
            today, just asked first to a farmer standing in his own field.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Land, and Eventually the House, Comes Back (verses 23 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter now states outright the idea the pricing rule already assumed.</p>
        </div>
        <VerseQuote
          text="The land shall not be sold for ever: for the land is mine; for ye are strangers and sojourners with me."
          reference="Leviticus 25:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every Israelite who ever sold a field was only ever leasing it out until
            Jubilee.</strong> God calls the whole nation strangers and guests on His own land,
            which meant no family could permanently lose its inheritance to someone else&apos;s
            wealth or someone else&apos;s hard season.
          </p>
          <p>
            A kinsman could redeem a field early if the family wanted it back before Jubilee ever
            arrived, and if no kinsman stepped in, the man himself could buy it back once he had
            the money. Either way, the field was never gone for good.
          </p>
          <p>Houses, though, split into two very different rules depending on where they stood.</p>
        </div>
        <VerseQuote
          text="And if a man sell a dwelling house in a walled city, then he may redeem it within a whole year after it is sold; within a full year may he redeem it. And if it be not redeemed within the space of a full year, then the house that is in the walled city shall be established for ever to him that bought it throughout his generations: it shall not go out in the jubile."
          reference="Leviticus 25:29 and 30"
        />
        <VerseQuote
          text="But the houses of the villages which have no wall round about them shall be counted as the fields of the country: they may be redeemed, and they shall go out in the jubile."
          reference="Leviticus 25:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A house inside a walled city had exactly one year to be bought back. Miss that
            window and it belonged to the buyer forever, Jubilee or no Jubilee. A house out in an
            open village never had that deadline. It counted as part of the family&apos;s field
            and came back at Jubilee like everything else. The text never explains the difference
            directly, but a city house was not tied to a family&apos;s ability to grow food the
            way a village house and its surrounding land were.
          </p>
          <p>
            One group of houses got an exception from the exception. The Levites, who owned no
            farmland of their own, could redeem a house in their own cities at any time, no one
            year deadline, no waiting for Jubilee, because those cities were the only inheritance
            they had.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. When a Brother Falls on Hard Times (verses 35 to 46)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From land and houses, the chapter turns to the hardest situation of all, a person who has nothing left to sell but himself.</p>
        </div>
        <VerseQuote
          text="And if thy brother be waxen poor, and fallen in decay with thee; then thou shalt relieve him: yea, though he be a stranger, or a sojourner; that he may live with thee. Take thou no usury of him, or increase: but fear thy God; that thy brother may live with thee."
          reference="Leviticus 25:35 and 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The very first word is &quot;relieve,&quot; not &quot;lend at a
            profit.&quot;</strong> Charging interest to a struggling neighbor was banned outright,
            long before the man ever got poor enough to sell himself into service.
          </p>
          <p>When relief was not enough and a brother did sell himself, the chapter is strict about what that service could not become.</p>
        </div>
        <VerseQuote
          text="And if thy brother that dwelleth by thee be waxen poor, and be sold unto thee; thou shalt not compel him to serve as a bondservant: But as an hired servant, and as a sojourner, he shall be with thee, and shall serve thee unto the year of jubile:"
          reference="Leviticus 25:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink> already gave a
            Hebrew servant a release date fixed at six years. Leviticus 25 ties the same release
            to the Jubilee clock instead, and goes further: whatever the arrangement was called,
            God insists it be treated like hired work, not ownership.
          </p>
          <p>Then, without softening the contrast, the chapter states a very different rule for anyone who was not an Israelite.</p>
        </div>
        <VerseQuote
          text="Both thy bondmen, and thy bondmaids, which thou shalt have, shall be of the heathen that are round about you; of them shall ye buy bondmen and bondmaids. Moreover of the children of the strangers that do sojourn among you, of them shall ye buy, and of their families that are with you, which they begat in your land: and they shall be your possession. And ye shall take them as an inheritance for your children after you, to inherit them for a possession; they shall be your bondmen for ever: but over your brethren the children of Israel, ye shall not rule one over another with rigour."
          reference="Leviticus 25:44 to 46"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is the hardest line in the whole chapter, and it deserves to be named plainly
            rather than explained away. An Israelite serving another Israelite could never be
            held as permanent property. A person bought from the surrounding nations could be,
            passed down as an inheritance like land or livestock. The reason the text gives for
            protecting an Israelite&apos;s own kin is repeated three separate times in this
            chapter alone, in verses 38, 42, and 55: God had already brought Israel itself out of
            slavery in Egypt. That memory shaped how one Israelite had to treat another. The
            chapter does not extend that same protection to the foreigner being bought, and
            honesty about the text means saying so instead of softening it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Redeeming a Brother Sold to a Foreigner (verses 47 to 55)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by covering the one case left unaddressed, an Israelite who ends up serving a foreigner instead of his own people.</p>
        </div>
        <VerseQuote
          text="And if a sojourner or stranger wax rich by thee, and thy brother that dwelleth by him wax poor, and sell himself unto the stranger or sojourner by thee, or to the stock of the stranger's family: After that he is sold he may be redeemed again; one of his brethren may redeem him: Either his uncle, or his uncle's son, may redeem him, or any that is nigh of kin unto him of his family may redeem him; or if he be able, he may redeem himself."
          reference="Leviticus 25:47 to 49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Even in the worst case the chapter imagines, an Israelite was never
            without a way out.</strong> A whole list of relatives could step in, uncle, cousin,
            or the man himself if he ever gained the means. The price for buying him back followed
            the same math as land, counted down by the years left until Jubilee.
          </p>
          <p>
            And if nobody ever redeemed him, the chapter still guarantees an ending that no debt
            could override.
          </p>
        </div>
        <VerseQuote
          text="For unto me the children of Israel are servants; they are my servants whom I brought forth out of the land of Egypt: I am the LORD your God."
          reference="Leviticus 25:55"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The chapter&apos;s last word is a claim of ownership, but not the buyer&apos;s.
            Every Israelite already belonged to God first, rescued out of Egypt once already,
            which is exactly why no human master got to hold one of them forever.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 25 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What does it mean that &quot;the land is mine&quot; in verse 23?</strong>{" "}
            It means Israel never owned the ground the way a modern deed describes ownership. God
            held the title permanently and let families use the land in between Jubilees. A
            family could lose the use of a field through debt or hardship. It could never
            permanently lose its claim to it, because the claim never fully belonged to any human
            owner in the first place.
          </p>
          <p>
            <strong>Why did an Israelite servant get released at Jubilee while a foreign bondman
            could be held as property forever?</strong> The text draws this line plainly in
            verses 44 through 46 and does not apologize for it. The stated reason, repeated three
            times across the chapter, is that God had personally rescued Israel from slavery in
            Egypt, and that history bound Israelites to treat each other differently than they
            treated outsiders bought from surrounding nations. This reflects how the ancient world
            around Israel generally treated war captives and purchased foreigners. It does not
            match how later Scripture would eventually unfold. In the New Testament, Paul&apos;s
            short letter to Philemon asks a slave owner to receive a runaway slave back not as
            property but as a brother, a very different final word than this chapter gives.
          </p>
          <p>
            <strong>Why was a house in a walled city treated so differently from a house in an
            open village?</strong> Leviticus 25:29 through 31 states the rule without stating the
            reason. The most reasonable explanation, drawn from how the rest of the chapter treats
            land, is that a village house sat on the family&apos;s farmland and fed them the way
            a field did, while a city house was closer to a standalone asset, detached from the
            harvest that Jubilee was built to protect.
          </p>
          <p>
            <strong>Does the Year of Jubilee point to anything beyond Israel&apos;s own
            economy?</strong> Centuries later, Jesus stood up in a synagogue in Nazareth and read
            from Isaiah using language that echoes this exact chapter.
          </p>
        </div>
        <VerseQuote
          text="The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind, to set at liberty them that are bruised, To preach the acceptable year of the Lord."
          reference="Luke 4:18 and 19"
        />
        <VerseQuote
          text="The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the LORD, and the day of vengeance of our God; to comfort all that mourn;"
          reference="Isaiah 61:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Liberty to the captives&quot; and &quot;the acceptable year of the
            Lord&quot; are Jubilee language, read by Jesus about Himself.</strong> Christians have
            long understood Him to be announcing a Jubilee that reaches further than any field or
            house ever could, freedom from the debt sin leaves behind.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 25
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 25:10</h3>
        <VerseQuote
          text="And ye shall hallow the fiftieth year, and proclaim liberty throughout all the land unto all the inhabitants thereof: it shall be a jubile unto you; and ye shall return every man unto his possession, and ye shall return every man unto his family."
          reference="Leviticus 25:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse engraved on the Liberty Bell in Philadelphia. Long before it named a nation&apos;s
          freedom, it named a fiftieth year when every Israelite family got its land and its
          people back.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 25:23</h3>
        <VerseQuote
          text="The land shall not be sold for ever: for the land is mine; for ye are strangers and sojourners with me."
          reference="Leviticus 25:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that explains every pricing and redemption rule in the chapter. Israel never
          fully owned the ground it lived on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 25:17</h3>
        <VerseQuote
          text="Ye shall not therefore oppress one another; but thou shalt fear thy God: for I am the LORD your God."
          reference="Leviticus 25:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A short command sitting right in the middle of a chapter built on numbers and prices,
          a reminder that none of the math was permission to take advantage of a neighbor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 25:35 and 36</h3>
        <VerseQuote
          text="And if thy brother be waxen poor, and fallen in decay with thee; then thou shalt relieve him: yea, though he be a stranger, or a sojourner; that he may live with thee. Take thou no usury of him, or increase: but fear thy God; that thy brother may live with thee."
          reference="Leviticus 25:35 and 36"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s clearest statement of mercy, naming relief before any of the rules
          about repayment or service even begin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 25:55</h3>
        <VerseQuote
          text="For unto me the children of Israel are servants; they are my servants whom I brought forth out of the land of Egypt: I am the LORD your God."
          reference="Leviticus 25:55"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The closing verse, and the reason behind every limit in the chapter. No human owner got
          the final word over an Israelite, because God already did.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 25
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 25 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 25 covers the sabbath year, when Israel&apos;s land rested every seventh
          year, and the Year of Jubilee, every fiftieth year, when land returned to its original
          family and Israelites serving others went free. It also sets rules for fair land
          prices, caring for the poor, and the limits on how one Israelite could serve another.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the sabbath year for the land in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 2 through 7 describe a year, every seventh year, when Israel could not sow,
          prune, or run an organized harvest. Whatever grew on its own belonged to everyone,
          landowner, servant, stranger, and animal alike.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the Year of Jubilee?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 8 through 10 set it at the fiftieth year, after seven cycles of seven years, when
          a trumpet sounded on the Day of Atonement and every Israelite returned to his own land
          and his own family. Debts tied to land and service effectively reset.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Leviticus 25:10 written on the Liberty Bell?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The bell&apos;s inscription quotes the verse&apos;s own words, &quot;Proclaim Liberty
          throughout all the Land unto all the Inhabitants thereof.&quot; Those who chose it for
          a bell meant to mark a new nation&apos;s freedom were drawing directly on the language
          of Israel&apos;s Jubilee.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Israel actually keep the sabbath year and the Jubilee?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not record a specific year when Israel celebrated the Jubilee by name,
          and how consistently later generations kept either law is genuinely debated. What
          Leviticus 25 states plainly is the command itself, whether or not every generation
          after Moses obeyed it in full.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why could Israelites not enslave each other forever, but could hold foreign slaves permanently?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 44 through 46 state this difference directly rather than hiding it. The chapter
          ties Israel&apos;s own release to its history of being rescued from Egypt, a memory
          repeated three times in this chapter, while applying a harsher standard, common in the
          ancient world, to bondmen bought from surrounding nations. The New Testament, in
          Paul&apos;s letter to Philemon, eventually pushes toward treating a servant as a brother
          rather than property.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the land is mine&quot; mean in Leviticus 25:23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means Israel held the land as God&apos;s guests, not as final owners. A family could
          lose the use of a field but never its underlying claim to it, since the deeper claim
          belonged to God the whole time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why was a house in a walled city treated differently than a house in a village?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 29 through 31 give a city house only one year to be redeemed before it belonged
          to the buyer permanently, while a village house counted as part of the family&apos;s
          farmland and still returned at Jubilee. The text does not explain the reasoning, but a
          village house was tied to the land that fed a family in a way a city house was not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 25 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 4:18 and 19 records Jesus reading Isaiah 61 in the synagogue at Nazareth, language
          of liberty to captives and the acceptable year of the Lord drawn straight from Jubilee
          vocabulary. Christians have long read that moment as Jesus announcing a Jubilee that
          frees people from sin&apos;s debt, not only from a financial one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every law in Leviticus 25 answers back to the same clock, whether it governs a field, a house, or a person.</p>
          <p>
            📌 <strong>Nothing in Israel belonged to anyone permanently except God.</strong> Land,
            houses in the countryside, even a brother sold into service, all had a built in way
            back to where they started.
          </p>
          <p>
            📌 <strong>Mercy had a number attached to it, not just a feeling.</strong> A fair
            price, a release date, a kinsman&apos;s right to redeem, these turned compassion into
            something a desperate family could actually count on.
          </p>
          <p>
            📌 <strong>God&apos;s own rescue of Israel from Egypt was the reason given for how
            Israel had to treat its own people.</strong> Being shown mercy came with an obligation
            to extend it, even when the chapter admits it did not yet extend that same mercy to
            everyone.
          </p>
          <p>
            You keep no Jubilee year on your own calendar. But you likely know what it feels like
            to owe something you cannot pay back, or to watch someone else carry that weight.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of one debt, financial or otherwise, that you are holding over someone else, and
            ask whether this chapter&apos;s God would want you still holding it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
