import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-created-god");

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

export default function WhoCreatedGodPage() {
  return (
    <BlogPostShell
      slug="who-created-god"
      title={<>📖 Who Created God?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Everyone you know has a parent.</p>
            <p>Every tree grew from a seed. Every chicken hatched from an egg. Every house has a builder standing behind it somewhere.</p>
            <p>Everything around you had a beginning.</p>
            <p>So if God created everything, the question is not strange at all. It is the most natural question in the world.</p>
            <p>
              📌 <strong>Who created God?</strong>
            </p>
            <p>
              Here is the honest answer before we go any further. Nobody created God. He was never created. He has always existed.
            </p>
            <p>That answer probably raises more questions than it settles. Good. It should.</p>
            <p>So let us walk through it slowly, straight from Scripture.</p>
            <p>
              We will start with the everyday logic that makes this question come up in the first place. Then we will look at
              what Genesis 1:1 actually says, and what it does not say. Then we will look at three words that describe who
              God is, each one with a plain picture so it actually makes sense. And we will come back to the exact question
              one more time at the end, with a straight answer.
            </p>
            <p>Plenty of people have wondered the exact same thing and never said it out loud in church.</p>
            <p>This is not a question to be ashamed of asking.</p>
            <p>Let&apos;s look at what His own Word says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a side question for scholars.</p>
          <p>
            Everything you believe about prayer, about trust, about whether God can actually hold your life together rests
            on who you believe God is.
          </p>
          <p>If God is just a very powerful being who popped into existence first, He is still a creature.</p>
          <p>A creature can run out. A creature can be outlasted. A creature can have a worse day than you.</p>
          <p>
            📌 <strong>But if God has always existed, with nothing before Him and nothing above Him, then He is not one more
            link in the chain. He is the reason the chain exists at all.</strong>
          </p>
          <p>
            The world&apos;s answer to this question usually stops at &quot;we don&apos;t know&quot; or tries to explain God
            away entirely. Neither one gives you anything to stand on.
          </p>
          <p>Scripture gives you something firmer. Not a theory. A Person who was never not there.</p>
          <p>That is worth getting settled before anything else.</p>
          <p>
            It changes what you are actually doing when you pray. You are not appealing to a powerful being who might
            eventually be replaced by something stronger. You are speaking to the One nothing can outlast.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Who He Is
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Everything You Know Had a Beginning</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with what you already know, before you open a Bible at all.</p>
          <p>Every person alive had two parents.</p>
          <p>Every tree started as a seed in the ground.</p>
          <p>Every chicken hatched from an egg that came from another chicken.</p>
          <p>Every house, every car, every phone had someone who built it.</p>
          <p>
            💡 <strong>Your whole experience of the world runs on one rule. Things come from other things.</strong>
          </p>
          <p>So when you hear that God created the heavens and the earth, your mind reaches for that same rule.</p>
          <p>❓ If everything needs a cause, what caused God?</p>
          <p>
            It is a fair question, and{" "}
            <ArticleLink href="/blog/christian-and-science">science and faith</ArticleLink>{" "}
            are not enemies here. Science is very good at describing what happens inside creation, from one created thing to
            the next. It was never built to tell you what exists outside of creation altogether.
          </p>
          <p>That is exactly where the Bible starts talking.</p>
        </div>
        <VerseQuote
          text="For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead; so that they are without excuse."
          reference="Romans 1:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul makes the same point from the other direction.</p>
          <p>Look at anything God made, and His eternal power is right there in it, plain enough that nobody has an excuse.</p>
          <p>The seed, the egg, the house with a builder behind it. All of it points past itself to a Maker who did not need a maker of His own.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 1:1 Does Not Explain Where God Came From</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Open the first page of the Bible and read the first sentence.</p>
        </div>
        <VerseQuote text="In the beginning God created the heaven and the earth." reference="Genesis 1:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what this verse does not do.</p>
          <p>It does not explain where God came from.</p>
          <p>It does not say &quot;and this is how God began.&quot;</p>
          <p>
            📌 <strong>It starts with God already there.</strong>
          </p>
          <p>
            <ArticleLink href="/blog/genesis-1-explained">Genesis 1</ArticleLink> is the account of how everything else began.
            God is simply the One doing the beginning.
          </p>
          <p>Every other beginning in that chapter has God standing before it.</p>
          <p>That is a different kind of statement than &quot;parents have children&quot; or &quot;trees grow from seeds.&quot;</p>
          <p>Those are beginnings inside a timeline God already set in motion.</p>
          <p>Genesis 1:1 is telling you where the timeline itself starts. And it starts with Him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. What It Means to Call God Eternal</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the word Scripture uses for this: eternal.</p>
          <p>Christians use that word so often it can stop meaning anything. So slow down and let one verse define it.</p>
        </div>
        <VerseQuote
          text="Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God."
          reference="Psalm 90:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mountains feel permanent to us. They were still formed by Him.</p>
          <p>The earth itself, the whole world, was still formed by Him.</p>
          <p>
            And before any of that, &quot;from everlasting to everlasting, thou art God.&quot;
          </p>
          <p>
            📌 <strong>This is what Christians mean by eternal. No beginning. No end.</strong>
          </p>
          <p>
            Not that God has existed for a very long time. Not that He is extremely old. Those words still assume a starting
            point somewhere back in the past that you could, in theory, find.
          </p>
          <p>Eternal means there is no such point to find.</p>
          <p>God did not start existing further back than anything else. He simply never started.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. All Powerful: He Speaks and It Happens</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now look at what kind of God this eternal God actually is. Scripture describes Him three ways. The first is all powerful, or omnipotent.</p>
          <p>Watch how God creates in Genesis 1.</p>
        </div>
        <VerseQuote text="And God said, Let there be light: and there was light." reference="Genesis 1:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>No equipment. No raw materials gathered first. Nobody helping Him.</p>
          <p>He speaks, and it exists.</p>
          <p>He does this again and again through the chapter. He speaks the sky into place. He speaks the dry land into place. He speaks the sun, moon and stars into place.</p>
          <p>
            💡 <strong>Picture how differently you make things. You need materials. You need time. You need tools.</strong>
          </p>
          <p>God needs none of that. His word is the only material He has ever required.</p>
          <p>That is what all powerful means. Not just very strong. Strong enough that speaking and doing are the same action.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. All Knowing: He Knows Your Words Before You Speak Them</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The second word is all knowing, or omniscient.</p>
          <p>David wrote a whole psalm about what it feels like to be fully known by God.</p>
        </div>
        <VerseQuote
          text="Thou knowest my downsitting and mine uprising, thou understandest my thought afar off."
          reference="Psalm 139:2"
        />
        <VerseQuote
          text="For there is not a word in my tongue, but, lo, O LORD, thou knowest it altogether."
          reference="Psalm 139:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Your sitting down. Your standing up. Your thoughts, before you have even finished thinking them.</p>
          <p>Your words, before you open your mouth to say them.</p>
          <p>
            📌 <strong>God does not need a report at the end of your day. He was not waiting to find out how it went.</strong>
          </p>
          <p>
            That changes how you think about prayer. You are not{" "}
            <ArticleLink href="/blog/how-to-know-gods-will">informing God of anything new</ArticleLink>{" "}
            when you pray. You are being honest with the One who already knows, because He wants your heart turned toward
            Him, not your information delivered to Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Everywhere at Once: No Place Outside His Reach</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The third word is everywhere present, or omnipresent.</p>
          <p>David asks a question in the same psalm, and then answers it himself.</p>
        </div>
        <VerseQuote
          text="Whither shall I go from thy spirit? or whither shall I flee from thy presence?"
          reference="Psalm 139:7"
        />
        <VerseQuote
          text="If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there."
          reference="Psalm 139:8"
        />
        <VerseQuote
          text="If I take the wings of the morning, and dwell in the uttermost parts of the sea; Even there shall thy hand lead me, and thy right hand shall hold me."
          reference="Psalm 139:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Heaven. The depths. The farthest edge of the sea you could ever reach.</p>
          <p>
            📌 <strong>There is nowhere on earth, and nowhere beyond it, where God has to travel to reach you.</strong>
          </p>
          <p>He does not need a flight booked. He is already there, holding on, before you even arrive.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. So, Who Created God?</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Let&apos;s be honest about what we have done so far.</p>
          <p>
            This explains what Scripture teaches about who God is. It is not a proof that will win over someone who has
            already decided not to believe. Faith reads these verses and recognizes the God it already trusts. Doubt reads
            the same verses and asks for more. Both reactions are human, and{" "}
            <ArticleLink href="/blog/is-it-a-sin-to-doubt-god">asking honest questions is not a sin</ArticleLink>.
          </p>
          <p>
            But here is what the Bible is clear about. God is not a very powerful creature who simply appeared first in
            line, ahead of everything else.
          </p>
          <p>He is the uncreated Creator.</p>
          <p>
            📌 <strong>Asking who made God is a different kind of question than asking who built a house.</strong>
          </p>
          <p>
            A house needs a builder because a house is made of parts that someone had to put together. God is not made of
            parts. He did not come together. He was never assembled, never born, never switched on.
          </p>
          <p>So let&apos;s return to the exact question we opened with.</p>
          <p>❓ Who created God?</p>
          <p>
            <strong>Nobody.</strong> God was never created. He has always existed.
          </p>
          <p>That is not a dodge of the question. It is the answer Scripture gives, from the first verse to the last.</p>
          <p>
            People sometimes picture an endless line of causes stretching back forever, with God simply standing further
            back in that same line than everything else. That is not what the Bible describes.
          </p>
          <p>God is not further back in the chain. He is outside the chain, holding the whole thing up.</p>
        </div>
        <VerseQuote
          text="Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God."
          reference="Psalm 90:2"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Living Like God Is Who He Says He Is
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Knowing these truths matters. Letting them change how you live matters more.</p>
          <p>Here are six ways to put this into practice this week.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Pray without editing yourself first.</strong> If God already knows your thought before you finish it,
            you do not need the polished version. Say the real thing.
          </li>
          <li>
            <strong>Bring Him the problem that feels too big.</strong> A God who speaks light into existence is not strained
            by your situation, whatever it is.
          </li>
          <li>
            <strong>Stop waiting to feel His presence before you trust it.</strong> Psalm 139 says He is already there, in
            heaven, in the depths, at the edge of the sea. Your feelings did not put Him there and cannot remove Him either.
          </li>
          <li>
            <strong>Let your questions lead you to Scripture, not away from it.</strong> Asking who created God is not the
            end of faith. It is an invitation to read Genesis and the Psalms slower than you have before.
          </li>
          <li>
            <strong>Teach this to someone younger than you.</strong> A child who hears early that God was never created,
            and that everything else was, is building on rock instead of sand.
          </li>
          <li>
            <strong>Rest in what He is, not in what you can prove.</strong> You are not responsible for winning every
            argument about God&apos;s existence. You are responsible for trusting the One who has always existed.
          </li>
          <li>
            <strong>Thank Him specifically for being eternal.</strong> Most prayers thank God for what He has done. Take one
            prayer this week and simply thank Him for who He is, with no beginning and no end, before you ask Him for
            anything.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About Who God Is
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you only remember a handful of verses from this whole article, start with these five.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Psalm 90:2</h3>
        <VerseQuote
          text="Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God."
          reference="Psalm 90:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest statement in the Bible of God&apos;s eternal nature. Everlasting to everlasting is not a figure of
          speech. It is the actual shape of who He is.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Isaiah 40:28</h3>
        <VerseQuote
          text="Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding."
          reference="Isaiah 40:28"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Isaiah wrote this to a people who felt forgotten. He reminds them that the same God who made the farthest ends of
          the earth never gets tired of carrying them. He will not grow tired of you either.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Revelation 1:8</h3>
        <VerseQuote
          text="I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty."
          reference="Revelation 1:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first and last letters of the Greek alphabet, used as a name. Everything that could ever be said sits between
          those two letters. God is not inside that range. He is the range itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Psalm 102:25 to 27</h3>
        <VerseQuote
          text="Of old hast thou laid the foundation of the earth: and the heavens are the work of thy hands. They shall perish, but thou shalt endure: yea, all of them shall wax old like a garment; as a vesture shalt thou change them, and they shall be changed: But thou art the same, and thy years shall have no end."
          reference="Psalm 102:25 to 27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The heavens themselves will wear out like an old coat. God will not. His years have no end, which is just another
          way of saying His years never had a beginning either.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Colossians 1:16 and 17</h3>
        <VerseQuote
          text="For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist."
          reference="Colossians 1:16 and 17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul writes this about Jesus. Everything that exists, seen and unseen, was made by Him and for Him, and He was
          before all of it. The eternal nature of God belongs to the whole Trinity, not just the Father.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Who Created God
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who created God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody. Scripture teaches that God was never created and has always existed. Psalm 90:2 says He is &quot;from
          everlasting to everlasting.&quot; He is the uncreated Creator, not one more thing that came into being.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God create Himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. To create Himself He would have had to exist before He existed, which makes no sense. The Bible does not
          describe God creating Himself. It describes Him as having no beginning at all, so there was never a moment He
          needed to be created.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">If everything needs a cause, why doesn&apos;t God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the rule &quot;everything needs a cause&quot; describes things inside creation, things that had a
          beginning in time. The Bible places God outside that category entirely. He is not the first item in the chain of
          caused things. He is the reason there is a chain at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it wrong or disrespectful to ask who created God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Nothing in Scripture condemns an honest question. God is not threatened by it. He would rather you ask and
          search the Word than quietly wonder and never bring it to Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God is eternal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eternal means no beginning and no end, not simply a very long existence. Psalm 90:2 puts it as &quot;from
          everlasting to everlasting.&quot; There is no point in the past, no matter how far back you go, where God started.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do omnipotent, omniscient and omnipresent mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Omnipotent means all powerful: God speaks and it happens, with no materials or help required (Genesis 1).
          Omniscient means all knowing: God knows your thoughts and your words before you speak them (Psalm 139).
          Omnipresent means present everywhere: there is no place in heaven, earth or sea where God is not already there
          (Psalm 139:7 to 10).
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Big Bang disprove God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. A beginning for the physical universe is not the same claim as a beginning for God. The Bible has always
          placed God outside of time and matter, so a scientific description of how the physical universe began does not
          touch the question of who was there before it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this the same as the cosmological argument?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It overlaps with it. Philosophers and theologians have long argued that an endless chain of caused things still
          needs something uncaused to start it. This article is not trying to win that argument. It is laying out what
          Scripture itself says God is like, in His own words.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was God doing before He created the world?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not answer that in detail, and it would be dishonest to pretend otherwise. What it does say is that
          the Father, Son and Spirit existed together before anything was made (John 1:1 to 3), so God was never alone and
          never idle in some empty waiting room before Genesis 1:1.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does believing God always existed take blind faith?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It takes faith, but not blind faith. The Bible gives reasons: everything made points to a Maker (Romans 1:20), and
          an endless chain of caused things still needs something uncaused to start it. Faith here means trusting what
          Scripture reveals about a God who cannot, by definition, be fully explained by something smaller than Himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does this question matter for my everyday faith?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the God you pray to is either a creature who had a starting point, or the eternal God Scripture describes.
          Only one of those can actually hold your life, your fears and your future without running out Himself.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Let&apos;s land this where we started.</p>
          <p>
            📌 <strong>Everything around you had a beginning. God did not.</strong>
          </p>
          <p>
            📌 <strong>He is all powerful, all knowing and everywhere present, and none of that came from somewhere. It is
            simply who He has always been.</strong>
          </p>
          <p>
            📌 <strong>Who created God? Nobody. He was never created. He has always existed.</strong>
          </p>
          <p>
            That is not a loophole in the logic. It is the one place logic was always going to have to stop, and Scripture
            tells you plainly where that place is.{" "}
            <ArticleLink href="/blog/what-does-it-mean-to-fear-god">Learning to fear God rightly</ArticleLink> starts right
            here, with knowing exactly who you are standing in front of.
          </p>
          <p>So here is one next step.</p>
          <p>Read Psalm 90 all the way through tonight. Let the first two verses settle in before you move on.</p>
          <p>Then thank Him, plainly, for being the one thing in your life that was never created and can never run out.</p>
          <p>The same God who had no beginning is the God holding your today.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
