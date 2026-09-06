import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-hagar", {
  title: "Who Was Hagar in the Bible? The Slave Girl Who Gave God a Name",
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

export default function WhoWasHagarPage() {
  return (
    <BlogPostShell
      slug="who-was-hagar"
      title={<>📖 Who Was Hagar in the Bible? The Slave Girl Who Gave God a Name</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Hagar never got to choose anything about her own life.</p>
            <p>She was a slave, an Egyptian woman serving inside a family that was not her own.</p>
            <p>
              When her owners needed something only her body could give them, they handed her over
              like a tool. When the plan worked, they punished her for it.
            </p>
            <p>
              📌 <strong>Hagar&apos;s story is about a woman used to solve someone else&apos;s
              problem, then thrown away, not once but twice, the moment she was no longer
              convenient.</strong>
            </p>
            <p>Maybe you know a version of that feeling.</p>
            <p>
              A family, a boss, even a church, that valued you for what you could produce and
              forgot you the moment the need was met.
            </p>
            <p>
              Twice in her life, Hagar ended up completely alone in the wilderness. The first time
              she was running from cruelty. The second time she was carrying a dying child and an
              empty water bottle, with nowhere left to go and no one left who cared.
            </p>
            <p>
              This is the full story of Hagar in the Bible, told in the order it happened. Who she
              really was. How Sarai used her, and then turned on her. The moment an angel of the
              LORD found her by a well in the desert and asked her two simple questions nobody else
              had bothered to ask. The name she gave God, the first name anyone in the whole Bible
              ever gave Him. And what happened years later, when she was cast out a second time and
              God met her again, right as her hope ran completely dry.
            </p>
            <p>Let&apos;s start with who she was before any of this happened to her.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Hagar Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hagar was an Egyptian servant, what the Bible calls a handmaid or a bondwoman.</p>
          <p>
            That means she was not a free woman. She belonged to Sarai, the wife of a man named
            Abram. God would later rename them Sarah and Abraham, but for most of Hagar&apos;s
            story they still carried their first names.
          </p>
          <p>
            Sarai could not have children. In that culture, a servant could be given to a husband
            so her child would legally count as the wife&apos;s own. That is exactly what happened
            to Hagar. Sarai gave her to Abram to be a surrogate mother.
          </p>
          <p>
            📌 Her story is told in <strong>Genesis 16 and Genesis 21</strong>, roughly two
            thousand years before Christ, more than a century before another woman in this same
            family line, <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>, would go through
            her own painful version of being used and unwanted.
          </p>
          <p>
            Hagar&apos;s son, Ishmael, would go on to become the father of twelve tribes and a
            great nation of his own, exactly as God promised.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Hagar&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Sarai&apos;s Plan to Fix Her Barrenness</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Abram and Sarai had waited ten years since God first promised them a child. Nothing had
            happened. Sarai decided to take matters into her own hands.
          </p>
        </div>
        <VerseQuote
          text="Now Sarai Abram's wife bare him no children: and she had an handmaid, an Egyptian, whose name was Hagar. And Sarai said unto Abram, Behold now, the LORD hath restrained me from bearing: I pray thee, go in unto my maid; it may be that I may obtain children by her. And Abram hearkened to the voice of Sarai. And Sarai Abram's wife took Hagar her maid the Egyptian, after Abram had dwelt ten years in the land of Canaan, and gave her to her husband Abram to be his wife."
          reference="Genesis 16:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This was a real custom of that time and place, not something God commanded.</p>
          <p>
            ⚠️ <strong>Nobody asked Hagar if she wanted this.</strong> In that world, a slave&apos;s
            body belonged to her owner to use as they decided. Sarai made the plan. Abram agreed
            to it. Hagar had no vote.
          </p>
          <p>She is the object of the sentence in every verse of this scene, never the subject.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Despised, Then Driven Away</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hagar conceived. And something in her changed once she knew she could do what Sarai could not.</p>
        </div>
        <VerseQuote
          text="And he went in unto Hagar, and she conceived: and when she saw that she had conceived, her mistress was despised in her eyes."
          reference="Genesis 16:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Suddenly the servant had leverage the wife never had. Hagar started to look down on
            Sarai, and Sarai felt every bit of it.
          </p>
          <p>Sarai brought her complaint to Abram, and he handed the whole problem back to her.</p>
        </div>
        <VerseQuote
          text="But Abram said unto Sarai, Behold, thy maid is in thy hand; do to her as it pleaseth thee. And when Sarai dealt hardly with her, she fled from her face."
          reference="Genesis 16:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Abram will not step in. He created no rule to protect the woman he had taken as a
            wife just verses earlier. He simply washed his hands of the whole conflict.
          </p>
          <p>
            Sarai dealt hardly with her. That phrase covers real cruelty, and Scripture does not
            soften it. Hagar, pregnant and alone, ran. A slave fleeing her owners was risking
            everything, and she did it anyway rather than stay.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Angel Who Found Her First</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hagar ran toward Egypt, her home country, along the road to a place called Shur. Along
            the way, she stopped at a spring of water in the wilderness.
          </p>
        </div>
        <VerseQuote
          text="And the angel of the LORD found her by a fountain of water in the wilderness, by the fountain in the way to Shur. And he said, Hagar, Sarai's maid, whence camest thou? and whither wilt thou go? And she said, I flee from the face of my mistress Sarai."
          reference="Genesis 16:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the very first time the phrase &quot;the angel of the LORD&quot;
            appears anywhere in the Bible.</strong> Not to a king. Not to a prophet. To a runaway
            slave girl, alone in the desert.
          </p>
          <p>
            He calls her by name and by her owner&apos;s name in the same breath, then asks her two
            plain questions. Where have you come from. Where are you going.
          </p>
          <p>❓ Nobody else in her life had ever asked her that. She was told what to do, not asked.</p>
          <p>She answers him honestly, without excuse. I flee from the face of my mistress Sarai.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Woman Who Named God</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The angel tells her to go back and submit to Sarai. That is a hard verse. God does not
            tell her the hardship is over. He sends her back into it. But He does not send her back
            empty handed.
          </p>
        </div>
        <VerseQuote
          text="And the angel of the LORD said unto her, Behold, thou art with child, and shalt bear a son, and shalt call his name Ishmael; because the LORD hath heard thy affliction."
          reference="Genesis 16:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ishmael means God shall hear. Every time Hagar said her son&apos;s name for the rest of
            her life, she would be saying a sentence about her own suffering being noticed.
          </p>
          <p>✅ God heard her affliction before she ever asked Him to.</p>
          <p>Then Hagar does something no one before her in the entire Bible had ever done.</p>
        </div>
        <VerseQuote
          text="And she called the name of the LORD that spake unto her, Thou God seest me: for she said, Have I also here looked after him that seeth me?"
          reference="Genesis 16:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Hagar is the first person in the whole Bible to give God a name.</strong> Not
            Abraham. Not a priest. Not a prophet. A pregnant, runaway, Egyptian slave girl, alone
            in a wilderness, named God Thou God seest me.
          </p>
          <p>
            The well itself was named after that meeting too. It was called Beerlahairoi, meaning
            the well of the Living One who sees me.
          </p>
          <p>
            💡 Nobody had seen Hagar her entire life. Not as a person, only as a means to an end.
            The one place she felt fully seen was in the middle of nowhere, talking to God.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Sent Away a Second Time</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years passed. Sarah finally had her own son, Isaac, exactly as God had promised. By the
            time Isaac was weaned, Ishmael was a teenager. At Isaac&apos;s weaning feast, Sarah saw
            something that changed everything again.
          </p>
        </div>
        <VerseQuote
          text="And Sarah saw the son of Hagar the Egyptian, which she had born unto Abraham, mocking. Wherefore she said unto Abraham, Cast out this bondwoman and her son: for the son of this bondwoman shall not be heir with my son, even with Isaac. And the thing was very grievous in Abraham's sight because of his son."
          reference="Genesis 21:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Sarah does not use Hagar&apos;s name here. She calls her this bondwoman. After
            fourteen years or more sharing the same household, Hagar is still just a slave to her.
          </p>
          <p>Abraham loved his son Ishmael. This request grieved him deeply. But God spoke.</p>
        </div>
        <VerseQuote
          text="And God said unto Abraham, Let it not be grievous in thy sight because of the lad, and because of thy bondwoman; in all that Sarah hath said unto thee, hearken unto her voice; for in Isaac shall thy seed be called. And also of the son of the bondwoman will I make a nation, because he is thy seed."
          reference="Genesis 21:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God tells Abraham to listen to Sarah, but in the very same breath He makes a promise
            about Ishmael. He will still become a nation. God does not forget the son of the
            servant, even while allowing the servant to be sent away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Alone in the Wilderness of Beersheba</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The next morning, Abraham acted. This was a wealthy household, yet look at what she was
            sent away with.
          </p>
        </div>
        <VerseQuote
          text="And Abraham rose up early in the morning, and took bread, and a bottle of water, and gave it unto Hagar, putting it on her shoulder, and the child, and sent her away: and she departed, and wandered in the wilderness of Beersheba."
          reference="Genesis 21:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Bread and one bottle of water. That is what a household this wealthy sent a mother
            and her teenage son into the desert with. She wandered until it ran out.
          </p>
        </div>
        <VerseQuote
          text="And the water was spent in the bottle, and she cast the child under one of the shrubs. And she went, and sat her down over against him a good way off, as it were a bow shot: for she said, Let me not see the death of the child. And she sat over against him, and lift up her voice, and wept."
          reference="Genesis 21:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>She put her son under a bush and walked away, because she could not stand to
            watch him die.</strong> That is a mother at the absolute end of what she can carry.
          </p>
          <p>
            If you have ever sat helpless while someone you love suffered, wondering where God was
            in it, that ache belongs in front of God. Reading{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why God allows suffering
            </ArticleLink>{" "}
            is a good place to bring that exact question.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The God Who Opens Eyes</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hagar was not the only one crying out. Scripture says something remarkable about her son.</p>
        </div>
        <VerseQuote
          text="And God heard the voice of the lad; and the angel of God called to Hagar out of heaven, and said unto her, What aileth thee, Hagar? fear not; for God hath heard the voice of the lad where he is. Arise, lift up the lad, and hold him in thine hand; for I will make him a great nation. And God opened her eyes, and she saw a well of water; and she went, and filled the bottle with water, and gave the lad drink."
          reference="Genesis 21:17 to 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 God heard the voice of the lad. Ishmael&apos;s own name, given years earlier, was
            coming true in this exact moment.
          </p>
          <p>
            💡 <strong>Notice what the verse does not say.</strong> It does not say God made a new
            well appear. It says God opened her eyes. The well may have been there the whole time.
            Her grief had blinded her to the very provision next to her.
          </p>
          <p>
            ✅ The God who named Himself Thou God seest me to her years earlier showed up and saw
            her again, at the exact moment she had nothing left.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Hagar&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Being used by people does not mean you are unseen by God</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarai used Hagar to solve a problem. Abram let it happen twice.</p>
          <p>📌 Both times Hagar ended up alone in the wilderness, God went looking for her.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. God hears the cry nobody else is listening for</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ishmael&apos;s whole name means God shall hear.</p>
          <p>
            If fear or worry keeps telling you that no one notices what you are carrying, what
            the Bible says about anxiety is worth reading slowly. See{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              what the Bible says about anxiety
            </ArticleLink>{" "}
            for more on that.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. A promise does not erase the hard road ahead</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The angel told Hagar to go back into a hard house before He told her anything good.</p>
          <p>⚠️ God&apos;s comfort is real, but it rarely removes the hard thing you still have to walk through.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. You can know God closely even if your whole life has been hard</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hagar had no priest, no temple, no family teaching her about God.</p>
          <p>She met Him once by a well and knew Him well enough to give Him a name.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God provides for the people others have given up on</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah wanted Hagar and Ishmael gone for good.</p>
          <p>
            📌 God still promised Ishmael a nation, and still opened Hagar&apos;s eyes to a well
            right when she needed it most.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Hagar&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 16:13</h3>
        <VerseQuote
          text="And she called the name of the LORD that spake unto her, Thou God seest me: for she said, Have I also here looked after him that seeth me?"
          reference="Genesis 16:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most quoted line in her whole story, and for good reason.</p>
          <p>📌 A slave with no rights and no title gave God a name that has outlasted empires.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 16:11</h3>
        <VerseQuote
          text="And the angel of the LORD said unto her, Behold, thou art with child, and shalt bear a son, and shalt call his name Ishmael; because the LORD hath heard thy affliction."
          reference="Genesis 16:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the reason given for the name. Not because he was special. Because she had suffered and God heard it.</p>
          <p>💡 Sometimes the reminder of God&apos;s care gets built into the very name we carry.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 16:7 and 8</h3>
        <VerseQuote
          text="And the angel of the LORD found her by a fountain of water in the wilderness, by the fountain in the way to Shur. And he said, Hagar, Sarai's maid, whence camest thou? and whither wilt thou go?"
          reference="Genesis 16:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first appearance of the angel of the LORD in the whole Bible, and it happens for a runaway slave.</p>
          <p>❓ Where you come from and where you are going are still two questions worth answering honestly before God.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 21:12 and 13</h3>
        <VerseQuote
          text="For in Isaac shall thy seed be called. And also of the son of the bondwoman will I make a nation, because he is thy seed."
          reference="Genesis 21:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>God&apos;s covenant plan went through Isaac. His care did not stop at Ishmael&apos;s edge.</p>
          <p>📌 God can be working out one promise for one person and still care deeply about another.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 21:17 to 19</h3>
        <VerseQuote
          text="And God heard the voice of the lad; and the angel of God called to Hagar out of heaven, and said unto her, What aileth thee, Hagar? fear not; for God hath heard the voice of the lad where he is."
          reference="Genesis 21:17 to 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Fear not. Two words spoken to a woman who had just given up on her son surviving the day.</p>
          <p>💡 God can call your name and answer your worst fear in the very same sentence.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Hagar</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Hagar a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents her as a real historical woman, an Egyptian servant in the household of
          Abraham and Sarah. Her story is told in specific, concrete detail across Genesis 16 and
          21, including named places like Beersheba and the well of Beerlahairoi.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Hagar in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hagar was an Egyptian handmaid, or servant, belonging to Sarai, the wife of Abram. Sarai
          gave her to Abram as a surrogate because Sarai could not have children. Hagar became the
          mother of Ishmael, and years later she was cast out of the household along with her son.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Thou God seest me mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was the name Hagar gave to God after He found her alone in the wilderness. It means
          exactly what it says. God is a God who truly sees people, even a slave nobody else was
          paying attention to. She is the first person recorded in the entire Bible to give God a
          name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Sarah want Hagar and Ishmael sent away?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sarah saw Ishmael mocking at the feast celebrating Isaac being weaned. She was also
          protecting Isaac&apos;s inheritance, since she did not want Ishmael, the son of a
          servant, to share it with her own son. Scripture says the request grieved Abraham deeply
          before God told him to go along with it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God abandon Hagar in the wilderness?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Both times Hagar found herself alone in the wilderness, God came to her personally.
          The first time an angel of the LORD spoke to her by a spring of water. The second time
          God heard her son crying, called to her from heaven, and opened her eyes to see a well of
          water right where she needed it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Ishmael mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ishmael means God shall hear, or God hears. The angel of the LORD told Hagar to give him
          that name specifically because the LORD had heard her affliction. Every time she said her
          son&apos;s name, she was speaking a small sermon about being heard by God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Hagar an Egyptian princess?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is a popular tradition, but it is not what the Bible says. Genesis calls her plainly
          an handmaid, an Egyptian, meaning a servant, not royalty. The idea that she was a
          princess given to Abraham by Pharaoh comes from later legend, not from the text itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Hagar and Ishmael die in the wilderness?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, though it came close. Ishmael nearly died of thirst before God opened Hagar&apos;s
          eyes to see a well of water nearby. Genesis says God was with the boy as he grew up, and
          that he lived in the wilderness of Paran and became skilled with a bow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Hagar considered a mother of a nation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. God promised twice that Ishmael would become a great nation, once to Hagar directly
          and once to Abraham. Genesis later records that Ishmael had twelve sons who became twelve
          tribal princes, so the promise was kept in full.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Hagar after Genesis 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not say much more about her directly. It records that she got Ishmael a
          wife from Egypt, her own home country, and that he grew up under God&apos;s protection.
          Her final years are not described, but her son&apos;s survival and future were secured by
          the promise she was given twice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hagar never had power over her own body or her own future.</p>
          <p>People used her, then discarded her, twice, when she stopped being convenient.</p>
          <p>But hold two things next to each other.</p>
          <p>
            📌 <strong>Both times she was abandoned in the wilderness, God found her
            first.</strong>
          </p>
          <p>
            📌 <strong>A woman with no name that anyone bothered to remember became the first
            person in the Bible to give God a name.</strong>
          </p>
          <p>
            The same pattern shows up all through Scripture. <ArticleLink href="/blog/who-was-eve">
            Eve</ArticleLink> received the first promise of a Savior in her worst moment, not her
            best one. God keeps meeting people at the exact place they think they have been
            forgotten.
          </p>
          <p>
            If you feel used up, forgotten, or completely alone right now, read Genesis 16 and 21
            tonight. Watch how God shows up for a woman nobody else was looking for.
          </p>
          <p>He is Thou God seest me. That has not changed.</p>
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
          description="Hagar was used and cast aside by the people around her, but seen by God not once but twice. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
