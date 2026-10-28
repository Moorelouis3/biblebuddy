import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("should-christians-tithe");

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

export default function ShouldChristiansTithePage() {
  return (
    <BlogPostShell
      slug="should-christians-tithe"
      title={<>📖 Should Christians Tithe?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably heard it from a pulpit.</p>
            <p>Give ten percent, or you are robbing God.</p>
            <p>Give ten percent, or the blessing stops.</p>
            <p>And somewhere underneath that pressure, a real question got buried.</p>
            <p>
              📌 <strong>Should Christians tithe? Here is the honest answer. The Old Testament
              commanded a tithe under the law God gave Israel. The New Testament never repeats
              that command for the church. Instead it teaches something higher: cheerful,
              proportional, willing generosity, not a fixed percentage enforced by guilt.</strong>
            </p>
            <p>That sentence alone will not satisfy everyone, and it should not have to.</p>
            <p>
              This is one of the most asked questions in the Christian life, and one of the ones
              people feel most manipulated about.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Maybe you grew up terrified to skip an envelope.</li>
            <li>🔲 Maybe a leader used giving as leverage over you.</li>
            <li>🔲 Maybe you just want to know what Scripture actually says, without the guilt trip attached.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>You are not wrong to ask.</p>
            <p>Money touches everything. Your trust in God, your sense of provision, your fear of not having enough.</p>
            <p>So this guide is not going to circle the question for three thousand words and land nowhere.</p>
            <p>
              It is going to walk you through where the tithe came from, what Jesus actually said
              about it, why the New Testament writers never command a percentage, and what sincere
              Christians believe today.
            </p>
            <p>And it is going to name the abuse plainly, because giving has been used as a weapon, and that is not God.</p>
            <p>Let&apos;s look at what God&apos;s Word actually says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could treat this like a math question. Ten percent or not.</p>
          <p>But that misses what is really at stake.</p>
          <p>
            ⚠️ <strong>How you give reveals what you actually believe about God.</strong>
          </p>
          <p>If you give out of fear, you believe in a God who is one missed envelope away from punishing you.</p>
          <p>If you give out of guilt, you believe your standing with God is something you earn with a number.</p>
          <p>If you give freely, you believe you serve a Father who already owns everything and still wants your heart, not your math.</p>
          <p>That is why this question is not just about budgets.</p>
          <p>
            It sits right next to{" "}
            <ArticleLink href="/blog/is-wanting-money-a-sin">
              whether wanting money is a sin
            </ArticleLink>
            . Both questions are really asking the same thing underneath. Who is actually in charge of your money?
          </p>
          <p>The world&apos;s answer is that it is yours, so spend it however you want.</p>
          <p>
            📌 <strong>Scripture&apos;s answer is that none of it was ever fully yours to begin with.</strong>
          </p>
          <p>Get that settled first, and the percentage question gets a lot less scary.</p>
          <p>
            There is also a trust issue buried in here that has nothing to do with math. Every
            paycheck is a small test of whether you actually believe God will still be faithful
            after you let go of a piece of it.
          </p>
          <p>Fail that test enough times and your faith shrinks to fit only what you can control.</p>
          <p>Pass it, even imperfectly, and your trust in God grows in a place most sermons never touch: your bank account.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Bible Actually Teaches About Tithing
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Tithe Started Before the Law, as a Response to Grace
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The tithe does not begin with a command.</p>
          <p>It begins with a man who had just been rescued.</p>
          <p>Abraham had chased down a coalition of kings to rescue his nephew Lot. He won. He came home with the spoils.</p>
          <p>And a mysterious priest named Melchizedek met him.</p>
        </div>
        <VerseQuote
          text="And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God. And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth: And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all."
          reference="Genesis 14:18 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the order.</p>
          <p>Melchizedek blessed Abraham first. Then Abraham gave a tenth.</p>
          <p>
            📌 <strong>The tithe was a response to being blessed, not a condition for being blessed.</strong>
          </p>
          <p>There was no law yet. No commandment. Moses had not been born.</p>
          <p>Abraham just gave back a tenth out of gratitude for a victory he knew God had handed him.</p>
          <p>Hebrews looks back at this moment centuries later and makes a careful point about it.</p>
        </div>
        <VerseQuote
          text="For this Melchisedec, king of Salem, priest of the most high God, who met Abraham returning from the slaughter of the kings, and blessed him; To whom also Abraham gave a tenth part of all."
          reference="Hebrews 7:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hold onto that detail. It matters later.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Under the Law, the Tithe Became a Commandment
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Centuries later, God gave Israel a full legal and religious system through Moses.</p>
          <p>Inside that law, the tithe became a requirement, not just a grateful gift.</p>
        </div>
        <VerseQuote
          text="And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is the LORD's: it is holy unto the LORD."
          reference="Leviticus 27:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That tenth funded the Levites, the priests who served the tabernacle full time and owned no land of their own.</p>
          <p>It fed the poor, the widow, the orphan, and the stranger during certain years in the cycle.</p>
          <p>It was, in effect, Israel&apos;s tax system and its welfare system at once, built into a covenant with God at the center of it.</p>
          <p>God told Moses exactly who that tenth belonged to.</p>
        </div>
        <VerseQuote
          text="And, behold, I have given the children of Levi all the tenth in Israel for an inheritance, for their service which they serve, even the service of the tabernacle of the congregation."
          reference="Numbers 18:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Levites owned no farmland and ran no business. The tithe was literally their paycheck for serving God&apos;s people full time.</p>
          <p>Israel&apos;s law actually describes more than one tithe across the calendar, not a single flat ten percent.</p>
        </div>
        <VerseQuote
          text="Thou shalt truly tithe all the increase of thy seed, that the field bringeth forth year by year. And thou shalt eat before the LORD thy God, in the place which he shall choose to place his name there, the tithe of thy corn, of thy wine, and of thine oil, and the firstlings of thy herds and of thy flocks; that thou mayest learn to fear the LORD thy God always."
          reference="Deuteronomy 14:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the purpose named right there in the text. Not to fund a building program. To teach Israel to fear the LORD always.
          </p>
          <p>This particular tithe was eaten in celebration before God, a kind of built in feast of gratitude, not only a transfer of money.</p>
          <p>
            That is the same kind of{" "}
            <ArticleLink href="/blog/proverbs-11-explained">
              generosity that multiplies instead of shrinks
            </ArticleLink>{" "}
            that Proverbs describes long after the law was given.
          </p>
          <p>Centuries after that, through the prophet Malachi, God confronted a nation that had quietly stopped giving it.</p>
        </div>
        <VerseQuote
          text="Will a man rob God? Yet ye have robbed me. But ye say, Wherein have we robbed thee? In tithes and offerings. Ye are cursed with a curse: for ye have robbed me, even this whole nation."
          reference="Malachi 3:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strong words. This is the verse most often quoted to pressure Christians today.</p>
          <p>But read what God says right after it.</p>
        </div>
        <VerseQuote
          text="Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it."
          reference="Malachi 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is God speaking to Israel under the old covenant, about a specific storehouse that fed specific priests and specific poor people.
          </p>
          <p>It is a real promise, inside a real covenant, to a real nation.</p>
          <p>It was never written to a Gentile church that did not exist yet.</p>
          <p>That does not make it meaningless. It means we have to be honest about what it was actually promising, and to whom, before we hand it to someone as a formula.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Jesus Confronted the Tithe Becoming a Checklist
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>By the time Jesus arrived, some religious leaders had turned tithing into something small.</p>
          <p>They measured out exact tenths of herbs grown in a window box, down to the leaf.</p>
          <p>And they skipped the parts of God&apos;s law that actually cost them something.</p>
        </div>
        <VerseQuote
          text="Woe unto you, scribes and Pharisees, hypocrites! for ye pay tithe of mint and anise and cummin, and have omitted the weightier matters of the law, judgment, mercy, and faith: these ought ye to have done, and not to leave the other undone."
          reference="Matthew 23:23"
        />
        <VerseQuote
          text="But woe unto you, Pharisees! for ye tithe mint and rue and all manner of herbs, and pass over judgment and the love of God: these ought ye to have done, and not to leave the other undone."
          reference="Luke 11:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that carefully. Jesus does not tell them to stop tithing.</p>
          <p>
            ⚠️ <strong>He tells them that a perfect percentage is worthless next to justice, mercy, and faith.</strong>
          </p>
          <p>You can hit ten percent exactly and still miss everything God actually wanted from you.</p>
          <p>That is the warning this whole topic needs printed over the top of it.</p>
          <p>
            It is worth sitting with how specific Jesus gets. Mint, anise, cummin, rue. Garden herbs, not major crops.
          </p>
          <p>These men were tithing spices grown in a pot by the window while a widow down the street went hungry.</p>
          <p>The number was never the point. The heart behind the number was always the point.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Why the New Testament Never Repeats the Command
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the part that surprises most people.</p>
          <p>Search the letters written to the church. Paul, Peter, James, John.</p>
          <p>Not one of them commands believers to tithe ten percent.</p>
          <p>That is not an accident, and Hebrews explains why.</p>
          <p>Remember Melchizedek from Genesis 14. Hebrews uses him to make an argument about the whole priestly system.</p>
        </div>
        <VerseQuote
          text="And verily they that are of the sons of Levi, who receive the office of the priesthood, have a commandment to take tithes of the people according to the law, that is, of their brethren, though they come out of the loins of Abraham: But he whose descent is not counted from them received tithes of Abraham, and blessed him that had the promises."
          reference="Hebrews 7:5 and 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hebrews spends an entire chapter arguing that Jesus is a priest in the order of Melchizedek, not Levi.</p>
          <p>
            📌 <strong>The tithe was tied to the Levitical priesthood. When the priesthood changed, the law built around it changed with it.</strong>
          </p>
          <p>Christ became our great high priest, once for all, and the system that funded the old priesthood was fulfilled, not simply carried over with a new coat of paint.</p>
          <p>That is why the New Testament letters never say &quot;bring your tithe to the storehouse.&quot;</p>
          <p>They talk about giving constantly. They just talk about it differently.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What the New Testament Actually Teaches Instead
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is organizing a relief offering for believers in Jerusalem, and he gives the Corinthian church his clearest teaching on giving.</p>
        </div>
        <VerseQuote
          text="But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."
          reference="2 Corinthians 9:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not a tenth. A decision of the heart.</p>
          <p>Not grudging. Not under pressure. Cheerful.</p>
          <p>Earlier, Paul gave practical instruction on how to actually do it.</p>
        </div>
        <VerseQuote
          text="Upon the first day of the week let every one of you lay by him in store, as God hath prospered him, that there be no gatherings when I come."
          reference="1 Corinthians 16:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Regular. Planned ahead of time. Tied to how God has actually prospered you, not a flat percentage forced on every income.</strong>
          </p>
          <p>And on the question of how much is enough, Paul says this.</p>
        </div>
        <VerseQuote text="For if there be first a willing mind, it is accepted according to that a man hath, and not according to that he hath not." reference="2 Corinthians 8:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>God is not measuring a number against a universal standard.</p>
          <p>He is measuring a willing mind against what you actually have.</p>
          <p>
            The New Testament still expects believers to materially support those who teach and shepherd them. That part never disappeared.
          </p>
          <p>Paul writes to Timothy about elders who serve the church full time.</p>
        </div>
        <VerseQuote
          text="Let the elders that rule well be counted worthy of double honour, especially they who labour in the word and doctrine. For the scripture saith, Thou shalt not muzzle the ox that treadeth out the corn. And, The labourer is worthy of his reward."
          reference="1 Timothy 5:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul says almost the exact same thing to the Galatians, about anyone who teaches you the Word.</p>
        </div>
        <VerseQuote text="Let him that is taught in the word communicate unto him that teacheth in all good things." reference="Galatians 6:6" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>So the New Testament did not erase Numbers 18. It just stopped tying the support of ministers to one fixed Old Testament percentage and left the amount to a willing heart.</strong>
          </p>
          <p>Jesus taught the underlying principle as plainly as anyone.</p>
        </div>
        <VerseQuote
          text="Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again."
          reference="Luke 6:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not a transaction with God. A description of how generosity tends to come back around, measured out by the same hand that measured yours.</p>
          <p>
            That lines up with what{" "}
            <ArticleLink href="/blog/proverbs-3-explained">Proverbs 3</ArticleLink>{" "}
            already said about honoring God with what you own.
          </p>
        </div>
        <VerseQuote text="Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine." reference="Proverbs 3:9 and 10" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Give God the first and best of what comes in, not the leftovers. That principle never expired.</p>
          <p>The fixed percentage enforced by law is what changed.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. When Giving Becomes Control, Name It
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This needs to be said plainly, because it has not been said plainly enough from enough pulpits.</p>
          <p>
            ⚠️ <strong>Giving has been used as leverage. Threatening curses on people who do not give a specific number is not God&apos;s heart. It is manipulation wearing a Bible verse as a costume.</strong>
          </p>
          <p>Jesus watched people give at the temple one afternoon, and what He praised was not the amount.</p>
        </div>
        <VerseQuote
          text="And Jesus sat over against the treasury, and beheld how the people cast money into the treasury: and many that were rich cast in much. And there came a certain poor widow, and she threw in two mites, which make a farthing. And he called unto him his disciples, and saith unto them, Verily I say unto you, That this poor widow hath cast more in, than all they which have cast into the treasury: For all they did cast in of their abundance; but she of her want did cast in all that she had, even all her living."
          reference="Mark 12:41 to 44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He praised a woman who gave almost nothing by dollar amount, and nobody applauded her on the way out.</p>
          <p>That story has been twisted into a guilt trip. Give until it hurts, no matter your situation, because the widow did.</p>
          <p>That is not the point.</p>
          <p>
            📌 <strong>Jesus was not writing a fundraising formula. He was exposing what was already in a heart.</strong>
          </p>
          <p>The rich gave a comfortable fraction of their surplus. She gave her whole life, trusting God with what came next.</p>
          <p>Nobody has the right to point at her and demand the same of you to prove your faith.</p>
          <p>
            Pressure that preys on fear of a curse, or shames someone who is behind on rent, has pushed real people toward{" "}
            <ArticleLink href="/blog/why-christians-leave-the-faith">
              walking away from the church altogether
            </ArticleLink>
            . That cost is real, and it is not a small one.
          </p>
          <p>If a leader is using money to control you instead of teaching you to trust God, that is worth naming out loud, to someone, not just carrying quietly.</p>
          <p>
            There is a simple way to tell the difference. A healthy appeal to give points you toward
            trusting God and loving people. A manipulative one points you toward fear of what will
            happen to you personally if you keep your wallet closed.
          </p>
          <p>One grows your faith. The other feeds off your anxiety. Learn to tell them apart.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Two Honest Positions Christians Hold Today
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sincere, Bible believing Christians land in two different places on this, and you deserve to hear both stated fairly.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            🟢 <strong>Tithing as a fulfilled Old Testament command.</strong> This view holds that
            the ten percent tithe belonged to Israel&apos;s law and priesthood, that the New
            Testament deliberately replaces it with cheerful, proportional giving, and that
            calling it a binding rule today adds a requirement Scripture itself does not add.
          </li>
          <li>
            🟢 <strong>Tithing as a continuing principle.</strong> This view holds that God asked
            for a tenth long before the law existed, through Abraham, so the principle outlives
            the Mosaic system, and that ten percent remains a wise, concrete starting point for
            New Testament giving even though it is no longer commanded under threat of curse.
          </li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Both camps agree on far more than they disagree on.</p>
          <p>Give. Give generously. Give cheerfully. Give as an act of trust, not fear.</p>
          <p>Where they differ is whether a specific percentage is still commanded or simply a wise, free choice.</p>
          <p>This is not the hill to divide a friendship over, and it is not a verdict on anyone&apos;s salvation either way.</p>
          <p>
            If you are unsure which view to hold, you are allowed to start somewhere concrete, like
            ten percent, and let your convictions sharpen as you grow rather than waiting for
            certainty before you give anything at all.
          </p>
          <p>Giving now, imperfectly, teaches you more about trusting God than studying the question forever will.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Giving Without Fear or Guilt
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever conclusion you land on, here is how to actually practice it.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Decide in your heart before offering day, not during it.</strong> Paul says
            giving should be purposed ahead of time, not decided under pressure while a basket is
            in front of you.
          </li>
          <li>
            <strong>Pick a number you can actually explain to God.</strong> Whether it is ten
            percent or a different figure, choose it honestly based on what He has actually given
            you, not what will impress anyone watching.
          </li>
          <li>
            <strong>Automate it like any other bill.</strong> A standing transfer on payday removes
            the moment of pressure entirely and turns giving into a settled habit instead of a
            weekly negotiation. You decided once, calmly, instead of deciding under the weight of a
            sermon every single week.
          </li>
          <li>
            <strong>Give to where real ministry and real need actually happen.</strong> Your local
            church, missionaries you know, people in genuine need. Follow the money with your eyes
            open, not blind trust.
          </li>
          <li>
            <strong>Walk away from any leader who threatens you over an amount.</strong> A shepherd
            teaches and models generosity. A shepherd does not bill you under threat of a curse.
            If a church&apos;s teaching on money leaves you feeling smaller instead of freer, trust
            that reaction.
          </li>
          <li>
            <strong>Give something even when money is tight.</strong> It does not have to be ten
            percent this month. A small, faithful amount given in trust still honors God more than
            a large amount given in resentment.
          </li>
          <li>
            <strong>Say thank you out loud when you give.</strong> Turning the transfer or the
            envelope into a short prayer of thanks keeps it an act of worship instead of a bill on
            autopilot.
          </li>
          <li>
            <strong>Review it once a year, not once in a panic.</strong> As income changes, revisit
            the number calmly, the way you would revisit any budget line, rather than only thinking
            about it when a guilt inducing sermon catches you off guard.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Tithing and Giving
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you want a short list to actually sit with, start here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Malachi 3:10</h3>
        <VerseQuote
          text="Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it."
          reference="Malachi 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most quoted verse on this topic, and the one most often weaponized.</p>
          <p>Read in its own context, it is God inviting a specific, struggling nation to test His faithfulness, not a universal vending machine formula for personal wealth.</p>
          <p>The heart of it still applies. God is not stingy toward people who trust Him with what they have.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Corinthians 9:7</h3>
        <VerseQuote text="Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." reference="2 Corinthians 9:7" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the New Testament&apos;s clearest word on giving, and it is worth memorizing.</p>
          <p>God is not watching the number on the check. He is watching the posture of the heart that writes it.</p>
          <p>Grudging giving and cheerful giving can be the exact same amount and mean completely different things to God.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Proverbs 3:9 and 10</h3>
        <VerseQuote text="Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine." reference="Proverbs 3:9 and 10" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Firstfruits means first, not leftover.</p>
          <p>This verse is less about a percentage and more about order. Does God get the first part of what comes in, or whatever happens to be left at the end of the month?</p>
          <p>
            The whole chapter is worth your time, and{" "}
            <ArticleLink href="/blog/proverbs-3-explained">
              Proverbs 3 explained verse by verse
            </ArticleLink>{" "}
            walks through the rest of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Mark 12:43 and 44</h3>
        <VerseQuote
          text="Verily I say unto you, That this poor widow hath cast more in, than all they which have cast into the treasury: For all they did cast in of their abundance; but she of her want did cast in all that she had, even all her living."
          reference="Mark 12:43 and 44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus measures gifts by what they cost the giver, not by their size.</p>
          <p>This is not a command to give everything you have. It is proof that God sees past the number on the surface, every single time.</p>
          <p>The rich men in that story probably felt good walking away. The widow walked away with nothing left but her trust in God, and that is exactly what Jesus called greater.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 14:20</h3>
        <VerseQuote text="And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all." reference="Genesis 14:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very first tithe in Scripture, and it came centuries before any law required it.</p>
          <p>Abraham gave out of gratitude for a victory, not fear of a curse.</p>
          <p>Nobody commanded him. Nobody threatened him. He simply recognized whose hand had actually won the battle, and gave accordingly.</p>
          <p>That is the original spirit behind this whole topic, long before anyone turned it into a rulebook.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Tithing
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Should Christians tithe 10 percent today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          There is no New Testament command that binds a believer to exactly ten percent. Many
          Christians still give ten percent as a wise, concrete starting point for generosity.
          Others give a different amount based on 2 Corinthians 9:7 and what they can honestly
          give with a willing heart. Either path is a legitimate, sincere way to follow Christ.
          What matters more than the number is whether you actually give, and whether you give it
          freely rather than under pressure.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is tithing a New Testament command?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The word tithe appears in the Gospels only when Jesus addresses the Pharisees under
          the old covenant. Paul, Peter, James, and John never command the church to tithe a fixed
          percentage. They teach cheerful, proportional, willing giving instead, which is a higher
          standard than a number, not a lower one. A heart that genuinely trusts God will usually
          give more than a bare ten percent over time, not less.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happens if I don&apos;t tithe?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God does not revoke your salvation or send a curse because you gave eight percent instead
          of ten. Malachi 3 was a specific warning to a specific nation under the Mosaic covenant.
          Under grace, your giving flows from gratitude and trust, not from fear of punishment for
          missing a quota. That said, a heart that never gives anything at all is worth examining
          honestly, since generosity is one of the plainest signs of a heart that actually trusts God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do you tithe on gross income or net income?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never answers this question directly, because it is not asking for a tax
          formula. Pick an honest number based on what you actually receive and can give in good
          conscience, and let it be between you and God rather than a technicality to argue over.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where should my giving go?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The early church gave toward real needs: ministers who served full time, the poor, and
          fellow believers in crisis. Your local church is a faithful place to start, and giving
          directly to people in need or trusted missionaries also fits the New Testament pattern.
          Ask where the money actually goes before you commit to a long term habit of giving there,
          and do not be afraid to ask a church leader directly how funds are used. A healthy church
          will welcome the question, not treat it as distrust.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it wrong to give in order to be blessed?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is wrong to give as a transaction, as if God is a vending machine you can manipulate
          with a check. It is not wrong to trust that a generous God responds to generosity. The
          difference is the posture of the heart: demanding a payout, or trusting a Father who
          already knows what you need. Watch for the warning sign in your own heart, which is
          resentment when the blessing does not arrive on your timeline.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What if my church pressures me to give a specific amount?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Teaching generosity is healthy. Threatening curses, shaming people publicly, or treating
          membership as conditional on an amount is not. You are free to give cheerfully and
          firmly decline pressure that does not reflect the heart of 2 Corinthians 9:7. If it keeps
          happening, that is a conversation worth having with the leadership directly, and a reason
          to keep looking for a healthier church home if nothing changes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can tithing become legalism?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, exactly the way Jesus described in Matthew 23:23. A person can hit ten percent
          precisely and still neglect justice, mercy, and a trusting heart. The number was never
          the finish line. The heart behind it always was.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus ever teach tithing directly?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus mentioned tithing only to correct religious leaders who had turned it into an
          empty checklist while ignoring justice and mercy. He never gave His followers a new
          command to tithe. His consistent teaching on money was about the heart, generosity, and
          trusting God over wealth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Should I feel guilty if I can&apos;t give ten percent right now?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. 2 Corinthians 8:12 says a willing mind is accepted according to what you actually
          have, not what you do not have. If this season is tight, give what you honestly can in
          faith, and let guilt go. God is not keeping score against a number you cannot reach.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what this guide hopes you walk away holding.</p>
          <p>
            📌 <strong>The Old Testament commanded a tithe under a covenant that has been fulfilled in Christ.</strong>
          </p>
          <p>
            📌 <strong>The New Testament never repeats that command. It calls you to something deeper: cheerful, willing, proportional generosity.</strong>
          </p>
          <p>
            📌 <strong>Any pressure that uses fear, shame, or a threatened curse to move your wallet is not the heart of God, whatever verse it hides behind.</strong>
          </p>
          <p>You do not need to carry guilt over a percentage.</p>
          <p>You do need to ask yourself an honest question. Does my giving come from trust, or from fear?</p>
          <p>
            That question matters more than the number on the envelope, and it ties back to{" "}
            <ArticleLink href="/blog/do-you-have-to-go-to-church">
              why gathering with a local church
            </ArticleLink>{" "}
            and supporting it still matters, even without a law demanding it.
          </p>
          <p>
            If giving has ever been used to frighten or control you, hear this clearly. That was
            never God&apos;s heart, and it does not get to define your relationship with Him going
            forward.
          </p>
          <p>So here is your one next step.</p>
          <p>Before you give again, pause and ask God honestly what He is asking of you right now, with what you actually have.</p>
          <p>Then give that, cheerfully, and let the guilt stay behind.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
