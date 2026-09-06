import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-sarah", {
  title: "Who Was Sarah in the Bible? The Woman Who Laughed at God",
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

export default function WhoWasSarahPage() {
  return (
    <BlogPostShell
      slug="who-was-sarah"
      title={<>📖 Who Was Sarah in the Bible? The Woman Who Laughed at God</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>God made her husband a promise. She waited decades to see it happen.</p>
            <p>She was still childless at sixty. Still childless at seventy. Still childless at eighty.</p>
            <p>
              In the world Sarah lived in, a woman without children had no safety net and almost no
              standing at all. Children were how a family survived, how land stayed in the family, and
              how a woman was cared for in old age. Every year without a child was another year of
              quiet shame that everyone around her could see.
            </p>
            <p>
              📌 <strong>So when God finally said the promise was about to come true, at ninety years
              old, Sarah did not shout for joy. She laughed.</strong> Not the good kind of laugh. The
              kind that slips out when something sounds flat out impossible.
            </p>
            <p>
              Maybe you know a smaller version of that laugh. The one that escapes when someone tells
              you God is still going to fix the thing you gave up praying about years ago. You have
              asked so many times that the prayer stopped feeling like faith and started feeling like a
              habit you cannot quite put down.
            </p>
            <p>
              This is the full story of Sarah in the Bible, walked through in order, straight from
              Genesis. Her long wait. Her trip to Egypt. The plan she came up with using her servant
              Hagar. The night she overheard a promise and laughed at it in the dark. The son she
              finally held. And a death that closed her story exactly where a story like hers should
              close: in hope.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Sarah Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah was not always called Sarah. Her first name was Sarai.</p>
          <p>
            She married a man named Abram, who God would later rename Abraham. Genesis introduces their
            marriage in a single quiet sentence, no ceremony, no detail, just a name added to a family
            list in Genesis 11:29.
          </p>
          <p>
            📌 Her story runs from <strong>Genesis 11 through Genesis 23</strong>, more chapters than
            almost any other woman gets in the whole Old Testament.
          </p>
          <p>
            She left her homeland with Abram, trusting a promise God had given him, a promise that God
            would make his family into a great nation. There was one huge problem built right into
            that promise. Sarai could not have children.
          </p>
          <p>
            💡 Every part of her story sits inside one long test. Could she keep believing God after
            year after year of nothing happening? Eve, the very first woman, was told to be fruitful
            and fill the earth. If you want to see where that command started, read{" "}
            <ArticleLink href="/blog/who-was-eve">who Eve was</ArticleLink> and how her story opens
            the Bible. Sarah spent most of her life watching that exact command feel completely out
            of reach.
          </p>
          <p>Now let&apos;s walk through what actually happened to her, in order.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Sarah&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Woman Named Barren</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Scripture tells you anything else about her, it tells you this.</p>
        </div>
        <VerseQuote text="But Sarai was barren; she had no child." reference="Genesis 11:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>That is the very first thing the Bible says about her, before her name is even
            fully explained.</strong>
          </p>
          <p>
            In a culture built around family lines and inheritance, a woman with no children was seen
            as a woman with no future. It was not just sad. It was treated as a kind of failure, even
            though it was completely out of her control.
          </p>
          <p>Sarai carried that single sentence for most of her adult life.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Called My Sister in Egypt</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A famine forced Abram and Sarai to travel down into Egypt to survive.</p>
          <p>As they got close, Abram grew afraid, and he made a request of his wife.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when he was come near to enter into Egypt, that he said unto Sarai his wife, Behold now, I know that thou art a fair woman to look upon: Therefore it shall come to pass, when the Egyptians shall see thee, that they shall say, This is his wife: and they will kill me, but they will save thee alive. Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee."
          reference="Genesis 12:11 to 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Abram protected his own life by asking his wife to hide the truth about
            theirs.</strong>
          </p>
          <p>It worked exactly the way Abram feared, and worse.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that, when Abram was come into Egypt, the Egyptians beheld the woman that she was very fair. The princes also of Pharaoh saw her, and commended her before Pharaoh: and the woman was taken into Pharaoh's house."
          reference="Genesis 12:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Sarai was taken into a king&apos;s house, with no say in the matter at all. Scripture does
            not record a single word from her in this whole scene.
          </p>
          <p>
            💡 She had no power over what happened to her body. Her husband had asked her to lie to
            protect himself, and she paid the price for it. God stepped in and struck Pharaoh&apos;s
            house with plagues, and Pharaoh sent them both away untouched, but the fear underneath
            that whole trip never fully left Abram. He asked her to do the same thing again years
            later with another king.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Giving Hagar to Abram</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ten more years passed in Canaan. Still no child.</p>
          <p>So Sarai came up with a plan of her own.</p>
        </div>
        <VerseQuote
          text="Now Sarai Abram's wife bare him no children: and she had an handmaid, an Egyptian, whose name was Hagar. And Sarai said unto Abram, Behold now, the LORD hath restrained me from bearing: I pray thee, go in unto my maid; it may be that I may obtain children by her. And Abram hearkened to the voice of Sarai."
          reference="Genesis 16:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 In that culture, giving a servant to a husband so she could bear children on the wife&apos;s
            behalf was an accepted custom. It was not something God commanded. It was a solution
            people reached for when they got tired of waiting on God to act.
          </p>
        </div>
        <VerseQuote
          text="And Sarai Abram's wife took Hagar her maid the Egyptian, after Abram had dwelt ten years in the land of Canaan, and gave her to her husband Abram to be his wife."
          reference="Genesis 16:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The plan worked, and it also broke something.</strong> Once Hagar conceived, the
            two women despised each other, and the pain from this one decision would follow this
            family for the rest of the story.
          </p>
          <p>Sarai had tried to build the promise with her own hands. It was not what God had in mind.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A New Name and an Impossible Promise</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Thirteen years after Hagar bore a son named Ishmael, God spoke again. This time He changed her name.</p>
        </div>
        <VerseQuote
          text="And God said unto Abraham, As for Sarai thy wife, thou shalt not call her name Sarai, but Sarah shall her name be. And I will bless her, and give thee a son also of her: yea, I will bless her, and she shall be a mother of nations; kings of people shall be of her."
          reference="Genesis 17:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what God did not say. He did not tell Abraham to try Hagar&apos;s line
            again, or to find another solution. He said Sarah herself would have a son.</strong>
          </p>
          <p>
            Her new name still meant something like princess, but it no longer pointed to just one
            household. It pointed to nations. God was telling a woman in her late eighties that she
            would still become a mother, and that whole nations and kings would trace back to her.
          </p>
          <p>💡 God did not need Sarai&apos;s plan from years earlier to work. He was going to do this Himself, on His own timing, His own way.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Laughing Behind the Tent Door</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not long after that, three visitors came to Abraham&apos;s tent. One of them spoke as the
            LORD Himself, and He asked a very specific question.
          </p>
        </div>
        <VerseQuote
          text="And they said unto him, Where is Sarah thy wife? And he said, Behold, in the tent. And he said, I will certainly return unto thee according to the time of life; and, lo, Sarah thy wife shall have a son. And Sarah heard it in the tent door, which was behind him."
          reference="Genesis 18:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah was listening from inside the tent. Here is what happened next.</p>
        </div>
        <VerseQuote
          text="Now Abraham and Sarah were old and well stricken in age; and it ceased to be with Sarah after the manner of women. Therefore Sarah laughed within herself, saying, After I am waxed old shall I have pleasure, my lord being old also?"
          reference="Genesis 18:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ Put yourself in that tent for a second. You have prayed for one thing your whole married
            life. A stranger tells you it is finally about to happen, at an age when your own body
            says it is over. What would you do?
          </p>
          <p>
            📌 <strong>Sarah laughed within herself. Not out loud, not at anyone, just a private,
            disbelieving laugh at a promise that sounded too good to be true.</strong>
          </p>
          <p>God heard it anyway.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Abraham, Wherefore did Sarah laugh, saying, Shall I of a surety bear a child, which am old? Is any thing too hard for the LORD? At the time appointed I will return unto thee, according to the time of life, and Sarah shall have a son."
          reference="Genesis 18:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Is any thing too hard for the LORD? That question is the heart of Sarah&apos;s
            whole story.</strong>
          </p>
          <p>Then came her response, and it tells you something true about fear.</p>
        </div>
        <VerseQuote
          text="Then Sarah denied, saying, I laughed not; for she was afraid. And he said, Nay; but thou didst laugh."
          reference="Genesis 18:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ She denied laughing because she was afraid. Not defiant, not proud. Afraid. If fear
            makes you cover up your honest reaction to God too, you are not the only one. Reading{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>{" "}
            is a good next step if that is where you are right now.
          </p>
          <p>💡 God did not scold her for laughing. He simply corrected the lie and restated the promise. He was patient with her doubt, and He is patient with yours.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Son Named Laughter, and the Cost That Followed
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A year later, at ninety years old, Sarah held a son of her own for the first time in her life.</p>
        </div>
        <VerseQuote
          text="And the LORD visited Sarah as he had said, and the LORD did unto Sarah as he had spoken. For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him. And Abraham called the name of his son that was born unto him, whom Sarah bare to him, Isaac."
          reference="Genesis 21:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 The name Isaac means he laughs. Every time anyone said her son&apos;s name for the rest
            of his life, it echoed back to a promise Sarah once thought was impossible.
          </p>
          <p>Sarah put words to it herself.</p>
        </div>
        <VerseQuote
          text="And Sarah said, God hath made me to laugh, so that all that hear will laugh with me. And she said, Who would have said unto Abraham, that Sarah should have given children suck? for I have born him a son in his old age."
          reference="Genesis 21:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>The laugh of disbelief in the tent became a laugh of pure joy at ninety years
            old.</strong>
          </p>
          <p>
            But joy for Sarah brought pain for another family in her own household. When Isaac was a
            little older, Sarah saw Hagar&apos;s son Ishmael mocking, and she reacted fast.
          </p>
        </div>
        <VerseQuote
          text="And Sarah saw the son of Hagar the Egyptian, which she had born unto Abraham, mocking. Wherefore she said unto Abraham, Cast out this bondwoman and her son: for the son of this bondwoman shall not be heir with my son, even with Isaac."
          reference="Genesis 21:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham was heartbroken over it. It was his son too.</p>
        </div>
        <VerseQuote
          text="And the thing was very grievous in Abraham's sight because of his son. And God said unto Abraham, Let it not be grievous in thy sight because of the lad, and because of thy bondwoman; in all that Sarah hath said unto thee, hearken unto her voice; for in Isaac shall thy seed be called. And also of the son of the bondwoman will I make a nation, because he is thy seed."
          reference="Genesis 21:11 to 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is a hard, uncomfortable moment. God told Abraham to listen to Sarah, and Hagar and
            Ishmael were sent away into the wilderness. Scripture does not pretend this was painless.
            It also does not leave Hagar and Ishmael without hope. God met them in the wilderness and
            promised to care for the boy, but that is its own story, separate from Sarah&apos;s.
          </p>
          <p>
            💡 The plan Sarai started years earlier out of impatience kept producing pain long after
            she thought it was finished.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Sarah&apos;s Death and a Grave Bought With Grief</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah lived a long life after Isaac was born. Genesis tells you exactly how long.</p>
        </div>
        <VerseQuote
          text="And Sarah was an hundred and seven and twenty years old: these were the years of the life of Sarah. And Sarah died in Kirjatharba; the same is Hebron in the land of Canaan: and Abraham came to mourn for Sarah, and to weep for her."
          reference="Genesis 23:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Sarah is the only woman in the whole Bible whose exact age at death is recorded. That
            small detail tells you how much weight her life was given in Scripture.
          </p>
          <p>Abraham refused to bury her in borrowed ground. He bought a permanent resting place.</p>
        </div>
        <VerseQuote
          text="And after this, Abraham buried Sarah his wife in the cave of the field of Machpelah before Mamre: the same is Hebron in the land of Canaan."
          reference="Genesis 23:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That cave became the family tomb for generations. Isaac was buried there. So was Jacob,
            and so was Leah, his first wife. If you want to see who ended up resting beside Sarah in
            that same cave, and why it mattered so much,{" "}
            <ArticleLink href="/blog/who-is-leah">Leah&apos;s story</ArticleLink> picks the thread up
            two generations later.
          </p>
          <p>
            💡 The woman who once had no future because she had no child became the mother a whole
            nation traced its beginning back to, and a permanent piece of ground in Canaan was bought
            because of her.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Sarah&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Waiting does not mean God has forgotten you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Decades passed between the promise and the birth of Isaac.</p>
          <p>God had not forgotten. He was simply working on a timeline Sarah could not see from inside her own waiting.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Taking matters into your own hands can create pain that outlasts the problem</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Giving Hagar to Abram felt like a reasonable plan at the time.</p>
          <p>⚠️ Years later, it produced heartbreak that touched two families instead of one.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Doubt and faith can live in the very same moment</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah laughed at a promise she later believed enough to become pregnant by.</p>
          <p>Hebrews later says her faith is what made that happen. Both things were true of her at once.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. God answers honest doubt with patience, not punishment</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God did not strike Sarah down for laughing.</p>
          <p>💡 He asked a question, restated the promise, and kept His word anyway.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God can still be trusted even when a family gets things wrong</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah and Abraham both made choices that hurt other people along the way.</p>
          <p>📌 God still kept His promise, and He still cared for the people hurt by their mistakes. He was not limited by their failures.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Sarah&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 11:30</h3>
        <VerseQuote text="But Sarai was barren; she had no child." reference="Genesis 11:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The problem is named before anything else about her.</p>
          <p>💡 The Bible never hides the hard part of anyone&apos;s story to make it easier to read.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 17:15 and 16</h3>
        <VerseQuote
          text="And God said unto Abraham, As for Sarai thy wife, thou shalt not call her name Sarai, but Sarah shall her name be. And I will bless her, and give thee a son also of her: yea, I will bless her, and she shall be a mother of nations; kings of people shall be of her."
          reference="Genesis 17:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A new name arrived with a promise attached to it.</p>
          <p>📌 God was not going to work around Sarah. He was going to work through her.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 18:14</h3>
        <VerseQuote
          text="Is any thing too hard for the LORD? At the time appointed I will return unto thee, according to the time of life, and Sarah shall have a son."
          reference="Genesis 18:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the question at the center of Sarah&apos;s whole life.</p>
          <p>✅ It is also a promise you can hold onto for whatever feels impossible in your own life right now.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 21:6</h3>
        <VerseQuote
          text="And Sarah said, God hath made me to laugh, so that all that hear will laugh with me."
          reference="Genesis 21:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The laugh of disbelief became a laugh of joy.</p>
          <p>💡 What starts as a doubtful laugh can end as a grateful one, once you have seen what God actually does.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Hebrews 11:11</h3>
        <VerseQuote
          text="Through faith also Sara herself received strength to conceive seed, and was delivered of a child when she was past age, because she judged him faithful who had promised."
          reference="Hebrews 11:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The New Testament spells her name Sara here, but it is the same woman. This verse looks
            back at Sarah&apos;s life and calls her whole story faith, even with the laughing and the
            fear included.
          </p>
          <p>
            📌 <strong>God did not need her to feel confident. He needed her to keep trusting Him,
            even in the middle of her doubt.</strong> If you have ever wondered whether your own faith
            counts when it feels shaky, reading{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              how you know you are saved
            </ArticleLink>{" "}
            can help settle that question.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Sarah</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Sarah a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents her as a real, historical woman, the wife of Abraham and the mother of
          Isaac. The New Testament treats her the same way, naming her directly in Hebrews, Romans,
          and 1 Peter as a real ancestor of the faith, not a legend or a symbol.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Sarah&apos;s original name, and why did it change?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Her original name was Sarai. God changed it to Sarah in Genesis 17, right when He renewed
          His promise that she would personally bear a son. The name change came with the promise
          attached, not after it was fulfilled.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Sarah when Isaac was born?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ninety. Genesis 17 records God telling Abraham that Sarah, who was ninety, would bear a
          son, and Genesis 21 says Abraham was a hundred years old when Isaac was born. She had waited
          roughly twenty five years from the time the promise was first given.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Sarah laugh at God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the promise sounded impossible. She was well past the age of having children, and a
          stranger sitting in her husband&apos;s tent told her she would have a son within a year. Her
          laugh was not mockery. It was disbelief, the kind that comes out on its own when something
          sounds too good to be real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Sarah give Hagar to Abraham?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After ten years in Canaan with still no child, Sarah acted on a custom of her time and gave
          her servant Hagar to Abraham so she could have children through her. It was a common
          practice in that culture, but Scripture presents it as Sarah trying to solve the problem
          herself rather than continuing to wait on God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Sarah really Abraham&apos;s sister?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20 later reveals that Sarah was Abraham&apos;s half sister, the daughter of his
          father but not his mother. So when Abraham told her to say she was his sister, it was
          technically true, but it was still meant to hide the fact that she was also his wife, which
          put her in real danger both times he asked her to do it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened between Sarah and Hagar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Once Hagar became pregnant, tension grew between the two women, and Sarah treated Hagar
          harshly. Years later, after Isaac was born, Sarah saw Hagar&apos;s son Ishmael mocking and
          insisted that Abraham send Hagar and Ishmael away. It is one of the most painful, honest
          parts of the whole account.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Sarah die, and where was she buried?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sarah died at a hundred and twenty seven years old in Hebron. Abraham bought the cave of
          Machpelah as a permanent family burial place and buried her there. That same cave later held
          Abraham, Isaac, Rebekah, Jacob, and Leah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Sarah mentioned in the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Hebrews 11 lists her by faith among the great examples of trusting God. Romans 4 and 9
          point back to the promise she carried. And 1 Peter 3 holds her up as an example for wives,
          noting that she called Abraham lord and did not give in to fear.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Sarah&apos;s story?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That waiting on God does not mean He has forgotten you. That trying to force a promise into
          being on your own timeline can cause pain that lasts for years. And that doubt, even doubt
          that shows up as laughter, does not disqualify you from being counted as a woman of faith.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah spent most of her life waiting for something that felt impossible.</p>
          <p>Hold three things next to each other.</p>
          <p>
            📌 <strong>God kept His promise on His own timeline, not hers.</strong>
          </p>
          <p>
            📌 <strong>Her doubt, laughter included, did not disqualify her from being called a woman
            of faith.</strong>
          </p>
          <p>
            📌 <strong>Is any thing too hard for the LORD is still the right question to ask about
            whatever feels impossible in your life right now.</strong>
          </p>
          <p>Her worth was never tied to how quickly the promise arrived.</p>
          <p>It was tied to the God who kept it.</p>
          <p>
            If you are in a season of waiting, read Genesis 18 tonight and sit with that one question
            God asked Abraham. Then, if you want a simple way to start reading Scripture on your own
            like this,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> is a
            good place to begin.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking the same road</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is completely free. No pressure, no credit card, no account needed to begin.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
        </div>

        <StudyCta
          slug="women-of-the-bible"
          title="Women of the Bible"
          days={21}
          description="Sarah waited decades on a promise that seemed impossible. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
