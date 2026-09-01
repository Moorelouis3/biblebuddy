import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("could-you-sacrifice-your-isaac", {
  title: "Could You Sacrifice Your Isaac? The Story of Abraham and Isaac",
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

export default function CouldYouSacrificeYourIsaacPage() {
  return (
    <BlogPostShell
      slug="could-you-sacrifice-your-isaac"
      title={<>⛰️ Could You Sacrifice Your Isaac? The Story of Abraham and Isaac</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>What if God asked you to sacrifice your son?</p>
            <p>Not just any son.</p>
            <p>The son you and your wife prayed for, for years.</p>
            <p>The son born when having children seemed impossible.</p>
            <p>The son God Himself promised you by name, before he was ever conceived.</p>
            <p>
              The son through whom God said your family would be more numerous than the stars in
              the sky.
            </p>
            <p>You waited decades for this child.</p>
            <p>You buried every doubt his mother&apos;s laughter once carried.</p>
            <p>You finally believed the promise was real, held it, named it, watched it grow.</p>
            <p>
              📌 <strong>This is the story of Abraham and Isaac, and it starts right here. God
              gave Abraham a son he had waited a hundred years for. Then God told him to give that
              son back.</strong>
            </p>
            <p>Read the actual command, word for word.</p>
          </div>
          <VerseQuote
            text="And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of."
            reference="Genesis 22:2"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Read it again slowly.</p>
            <p>Thy son. Thine only son. Isaac. Whom thou lovest.</p>
            <p>God names every reason this would hurt before He even gives the command.</p>
            <p>❓ So. What would you do?</p>
            <p>Because that is exactly where Abraham found himself.</p>
            <p>
              Not in a Bible story with a tidy ending already printed at the bottom of the page.
              In a tent, at night, with a command he could not undo and could not explain to
              anyone he loved.
            </p>
            <p>
              This is the full story of Abraham and Isaac, walked through in order, straight from
              the text. What God actually said. What Abraham actually did on the road there. And
              the line this whole story is built to deliver.
            </p>
            <p>Let&apos;s walk through what actually happened on that mountain, in order.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Abraham and Isaac Were</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham started out as Abram, a man from Ur with no children and a promise from God.</p>
          <p>God told him he would become a great nation.</p>
          <p>Years passed. Nothing happened.</p>
          <p>He and his wife Sarah grew old. Then they grew older.</p>
          <p>By the time God renamed him Abraham, he was ninety nine years old and still childless.</p>
          <p>Scripture records his reaction to the promise honestly:</p>
        </div>
        <VerseQuote
          text="Then Abraham fell upon his face, and laughed, and said in his heart, Shall a child be born unto him that is an hundred years old? and shall Sarah, that is ninety years old, bear?"
          reference="Genesis 17:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not a man of easy, effortless faith.</p>
          <p>That is a man who laughed at the promise because it sounded impossible.</p>
          <p>God answered him anyway:</p>
        </div>
        <VerseQuote
          text="And God said, Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac: and I will establish my covenant with him for an everlasting covenant, and with his seed after him."
          reference="Genesis 17:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 The name Isaac means he laughs. God let the laughter become the boy&apos;s name.</p>
          <p>And then, at the set time God had spoken, it actually happened.</p>
        </div>
        <VerseQuote
          text="For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him."
          reference="Genesis 21:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham was a hundred years old. Sarah was ninety.</p>
          <p>Their whole future ran through this one boy.</p>
          <p>Every promise God had ever made Abraham depended on Isaac being alive to inherit it.</p>
          <p>
            Isaac was not a background character in his father&apos;s life. He was the answer to
            decades of prayer, the one relationship Abraham could point to and say, that came from
            God, not from me.
          </p>
          <p>By the time our story picks up, Isaac was likely a teenager, old enough to walk for days and carry a load of wood up a mountain on his own back.</p>
          <p>
            His whole story sits in <strong>Genesis 12 through 25</strong>, and the sacrifice
            itself is told in one chapter, <strong>Genesis 22</strong>.
          </p>
          <p>
            If you have never walked through Genesis start to finish, learning{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>{" "}
            will help this story land the way it is meant to.
          </p>
          <p>Now here is where the story turns.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Story of Abraham and Isaac</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Promise Built on One Boy</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Isaac was finally born, Sarah said something worth sitting with.</p>
        </div>
        <VerseQuote
          text="And Sarah said, God hath made me to laugh, so that all that hear will laugh with me."
          reference="Genesis 21:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Picture that house.</p>
          <p>A baby nobody thought would ever come, held by two parents who had stopped expecting one.</p>
          <p>Every night Isaac fell asleep, Abraham was watching a promise breathe.</p>
          <p>
            📌 <strong>God had already said this son was the one through whom Abraham&apos;s
            family would become more numerous than the stars. Not a son. This son.</strong>
          </p>
          <p>There was no backup plan.</p>
          <p>Isaac was not one option among several for how God would keep His word.</p>
          <p>He was the only option God had ever named.</p>
          <p>
            Think about what that means for how Abraham lived. Every meal, every conversation,
            every ordinary evening with his son doubled as proof that God keeps His word.
          </p>
          <p>
            He was not just raising a boy. He was watching a promise grow up in front of him,
            year after year, laughing at his own jokes and learning to walk beside his father in
            the fields.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Command That Made No Sense</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then, without warning, God spoke again.</p>
        </div>
        <VerseQuote
          text="And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of."
          reference="Genesis 22:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not a stranger. Not a servant. Not an animal from the flock.</p>
          <p>Thine only son Isaac, whom thou lovest.</p>
          <p>⚠️ God names the exact cost before Abraham takes a single step toward it.</p>
          <p>
            💡 Look closely at the wording in Genesis 22:2. That is the first time the word love
            shows up anywhere in the book of Genesis. Not for a wife. Not for a friend. For a son,
            in a sentence commanding his father to give him up.
          </p>
          <p>No explanation comes with the command.</p>
          <p>No reason is given. No promise that it will make sense later.</p>
          <p>Just an old man, a mountain, and a son he had waited a hundred years to hold.</p>
          <p>
            Abraham had already argued with God once, standing in the road toward Sodom, pleading
            for the lives of strangers he had never met.
          </p>
          <p>This time, about his own son, the text records no argument at all.</p>
          <p>And look at what the text says he did next:</p>
        </div>
        <VerseQuote
          text="And Abraham rose up early in the morning, and saddled his ass, and took two of his young men with him, and Isaac his son, and clave the wood for the burnt offering, and rose up, and went unto the place of which God had told him."
          reference="Genesis 22:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rose up early.</p>
          <p>Not after a week of arguing with God. Not after a night of stalling.</p>
          <p>💡 Notice something else. Abraham did not tell Isaac what God had actually said.</p>
          <p>He did not tell Sarah either, as far as the text records.</p>
          <p>He got up, split the wood himself, and started walking.</p>
          <p>
            No one to talk him out of it. No one to talk it through with. Just a man, a knife, some
            wood, and a command he was carrying completely alone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Three Days to Live With It</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the detail most people rush straight past.</p>
          <p>God did not wait until Abraham reached the mountain to tell him what was coming.</p>
          <p>He told him beforehand, back home, before the journey ever began.</p>
        </div>
        <VerseQuote
          text="Then on the third day Abraham lifted up his eyes, and saw the place afar off."
          reference="Genesis 22:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that again. On the third day.</p>
          <p>That means Abraham walked with this command sitting on him for three full days.</p>
          <p>
            📌 <strong>Three days to hear Isaac&apos;s voice. Three days to eat together at the
            fire each night. Three days to look at his son and remember, this is the son God
            promised me.</strong>
          </p>
          <p>This was not one terrible moment he had to survive.</p>
          <p>It was seventy two hours of ordinary life with an unbearable weight underneath it.</p>
          <p>Every sunrise on that trip brought them one day closer to Mount Moriah.</p>
          <p>Every campfire, every meal, every mile Isaac walked beside his father was borrowed time as far as Abraham knew.</p>
          <p>⚠️ Try to sit inside that for a second, instead of skipping to the ending you already know.</p>
          <p>
            You know how to be brave for five minutes. Most people can find courage for one hard
            moment if they have to.
          </p>
          <p>Three days is different.</p>
          <p>Three days is watching your son sleep and still getting up the next morning to keep walking toward it.</p>
          <p>💡 The weight of this story is not on the mountain. It is on the road that got them there.</p>
          <p>Nothing in the text says Abraham argued, delayed, or turned back even once.</p>
          <p>He just kept walking, one day at a time, toward the one thing in the world he did not want to do.</p>
          <p>Think about what a normal day on that road looked like.</p>
          <p>Isaac probably asked ordinary questions. How far is it now. What are we going to eat tonight. Can I walk next to the donkey instead of behind it.</p>
          <p>Abraham had to answer, normally, with a command from God sitting underneath every single word.</p>
          <p>He watched his son sleep at night and got up the next morning anyway.</p>
          <p>
            ⚠️ That is a different kind of hard than one terrible moment. It is choosing obedience
            over and over, on a road with nothing forcing your hand except your own decision to
            keep walking.
          </p>
          <p>God could have given Abraham the command and the mountain on the same afternoon.</p>
          <p>He did not.</p>
          <p>
            📌 <strong>He let Abraham live inside the weight of it for three days, which means the
            test was never really about the moment with the knife. The test was the whole walk.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Problem God Never Explained</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what made this so impossible to make sense of.</p>
          <p>God had already made Abraham a promise, years earlier, in plain language.</p>
        </div>
        <VerseQuote text="Of whom it was said, That in Isaac shall thy seed be called:" reference="Hebrews 11:18" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every descendant God had promised Abraham would come through Isaac.</p>
          <p>Not through a nephew. Not through another son born later.</p>
          <p>Through Isaac, specifically, by name.</p>
          <p>
            📌 <strong>That is what makes this so difficult. God&apos;s promise depended on
            Isaac, yet God&apos;s command seemed to threaten the very promise He had made.</strong>
          </p>
          <p>Abraham could not possibly understand how both could be true.</p>
          <p>How do you keep a promise built on a son and take that son&apos;s life at the same time?</p>
          <p>There is no explanation in the text. God does not offer Abraham one.</p>
          <p>
            If you have ever tried to hold two things God has said and could not figure out how
            both could possibly be true at once, you already understand exactly where Abraham was
            standing.
          </p>
          <p>Most of us want the contradiction resolved before we obey.</p>
          <p>Abraham did not get that.</p>
          <p>He got a command that seemed to cancel out a promise, and no explanation for how the two fit together.</p>
          <p>But he knew one thing, and it was enough. God had made a promise.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Abraham Believed God Anyway</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis does not tell you what Abraham was thinking on that road.</p>
          <p>Hebrews does.</p>
        </div>
        <VerseQuote
          text="Accounting that God was able to raise him up, even from the dead; from whence also he received him in a figure."
          reference="Hebrews 11:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read what that verse is actually saying.</p>
          <p>Abraham believed that even if Isaac died on that altar, God was able to raise him from the dead.</p>
          <p>💡 Nobody had ever been raised from the dead before. Abraham had no example, no precedent, nothing to point to.</p>
          <p>He did not know how God would keep His promise.</p>
          <p>He just knew God would.</p>
          <p>
            📌 <strong>His faith was not in an outcome he could see. His faith was in the God who
            made the promise.</strong>
          </p>
          <p>That is the difference between hoping things turn out fine and actually trusting God.</p>
          <p>Abraham had no evidence that resurrection was even possible.</p>
          <p>He had a word from God, spoken years earlier, and he decided that word was solid enough to keep walking on.</p>
          <p>
            Notice the word Hebrews uses. Accounting. Not hoping, not guessing, not talking himself
            into a feeling of peace. Accounting is the language of settled math, of a conclusion
            already worked out before the crisis ever arrived.
          </p>
          <p>
            Abraham had done that math back home, long before he ever saddled the donkey. That is
            why he could rise up early and start walking without a single recorded argument.
          </p>
          <p>The faith was not built on that road. It was only proven there.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. What Is Your Isaac?</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to say I trust God.</p>
          <p>You can say that from a couch. You can say it in a worship song with your hands raised.</p>
          <p>❓ But can you still say it when He asks you to surrender your Isaac?</p>
          <p>Something you love.</p>
          <p>Something you prayed for by name for years, the way Abraham prayed for a son.</p>
          <p>Something you planned your whole future around.</p>
          <p>Maybe even something you believe God Himself gave you in the first place.</p>
          <p>
            ⚠️ That is when faith actually gets tested. Not when obedience is easy, but when it
            does not make sense to you at all.
          </p>
          <p>Your Isaac might be a relationship you cannot picture your life without.</p>
          <p>It might be a career you built for fifteen years.</p>
          <p>It might be a plan for your family, or your health, or your money, that you have quietly decided God is not allowed to touch.</p>
          <p>It might even be a ministry, ironically, something you started for God that has slowly become about you.</p>
          <p>
            Here is what makes it so hard. It is rarely a bad thing God asks you to lay down.
            Isaac was not a sin Abraham needed to repent of. Isaac was a gift, given by God
            Himself, that God then asked for back.
          </p>
          <p>That is a different test than giving up something you know is wrong.</p>
          <p>
            It is trusting God with something good, something you did not talk yourself into,
            something He gave you in the first place.
          </p>
          <p>
            ❓ Can you trust God when obedience does not make sense to you? That is the exact
            question Abraham had to answer on that road, and it is the question every believer
            eventually has to answer too.
          </p>
          <p>
            The same trust that carried Abraham up that mountain is the trust Scripture ties to{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              knowing you are saved
            </ArticleLink>
            . It has never been about seeing the whole plan. It has always been about believing the
            One who made the promise.
          </p>
          <p>
            <ArticleLink href="/blog/paul">Paul</ArticleLink> later called everything he had
            worked for rubbish compared to knowing Christ, the same trade Abraham was asked to
            make on that mountain, years before Paul ever wrote the words.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. God Provides a Way</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham did not know about the ram.</p>
          <p>He did not know how God would resolve any of this.</p>
          <p>He only knew what God had already promised, and he trusted God enough to keep climbing that mountain anyway.</p>
          <p>Watch how far he actually went:</p>
        </div>
        <VerseQuote
          text="And they came to the place which God had told him of; and Abraham built an altar there, and laid the wood in order, and bound Isaac his son, and laid him on the altar upon the wood."
          reference="Genesis 22:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He built the altar with his own hands.</p>
          <p>He laid the wood in order.</p>
          <p>He bound his son and laid him on top of it.</p>
          <p>
            Isaac was strong enough to have resisted. He was old enough to carry wood up a
            mountain. He let his father bind him anyway.
          </p>
          <p>Two men, walking together in faith, right up to the very last second.</p>
        </div>
        <VerseQuote text="And Abraham stretched forth his hand, and took the knife to slay his son." reference="Genesis 22:10" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right there, at the last possible second, God stopped him.</p>
        </div>
        <VerseQuote
          text="And the angel of the LORD called unto him out of heaven, and said, Abraham, Abraham: and he said, Here am I."
          reference="Genesis 22:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then came the provision Abraham never saw coming:</p>
        </div>
        <VerseQuote
          text="And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son."
          reference="Genesis 22:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Behind him. A ram he had not noticed until that exact moment.</p>
          <p>God did not send the ram at the bottom of the mountain, before the climb.</p>
          <p>He sent it at the top, after the obedience, not before it.</p>
          <p>Abraham named that place Jehovahjireh, meaning the LORD will provide.</p>
          <p>
            📌 <strong>Here is the line the whole story is built to deliver. Faith isn&apos;t
            knowing what God is going to do. Faith is trusting what God has already said.</strong>
          </p>
          <p>Abraham never got a preview of the ram.</p>
          <p>He got a promise, years earlier, and he trusted it all the way up a mountain with a knife in his hand.</p>
          <p>God showed up exactly on time. Not a day sooner than Abraham needed Him to.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Abraham&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Faith is trusting the promise, not seeing the outcome</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham never saw the ram until he needed it.</p>
          <p>He believed God could raise Isaac from the dead before he had any proof resurrection was even possible.</p>
          <p>
            If Abraham had needed to see the outcome first, he never would have left the tent that
            morning. The seeing came after the trusting, not before it.
          </p>
          <p>📌 You will rarely get to see the outcome before you are asked to trust God with it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. God tests what you love most, not what you are bad at</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God did not ask Abraham to give up something he barely valued.</p>
          <p>He named the son, the only son, the one Abraham loved.</p>
          <p>
            That is how you can usually spot what God is doing in your own life. He does not
            circle the things you were already willing to let go of.
          </p>
          <p>⚠️ The places God asks you to surrender are usually the places you least want to.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The waiting proves the faith, not just the decision</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Anyone can be brave for one dramatic moment.</p>
          <p>Abraham had to carry this obedience for three ordinary days first.</p>
          <p>
            <ArticleLink href="/blog/moses">Moses</ArticleLink> walked by that same kind of faith
            for forty years in the wilderness before he ever set foot in the promised land.
          </p>
          <p>
            Most of your own faith will not be tested in one dramatic scene either. It will be
            tested on an ordinary Tuesday, walking toward something hard, one unremarkable step at
            a time.
          </p>
          <p>💡 A lot of your faith gets built during the walk, long before you ever reach the mountain.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Obedience does not require an explanation first</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham never got a reason. He rose up early anyway.</p>
          <p>He kept walking without ever learning how the two promises fit together.</p>
          <p>
            You will face decisions like that too. Places where obeying God costs you something,
            and He does not explain Himself before He asks for it.
          </p>
          <p>📌 Sometimes obedience comes first, and understanding comes later, if it comes at all.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God provides, but usually after you climb</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The ram was there the whole time, caught in a thicket, out of sight until the exact moment it was needed.</p>
          <p>God&apos;s provision met Abraham at the top of obedience, not at the bottom of it.</p>
          <p>
            If you are waiting on God to show you the provision before you take the next step of
            obedience, you may be waiting on the wrong order. The provision is usually already
            there. You just cannot see it from the bottom of the mountain.
          </p>
          <p>✅ He is rarely early by your clock. He has never once been late by His.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Abraham and Isaac&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 22:2</h3>
        <VerseQuote
          text="And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of."
          reference="Genesis 22:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The whole test is loaded into one sentence.</p>
          <p>God names the son, the relationship, and the cost before Abraham ever moves.</p>
          <p>There is no vague request here. It is specific, personal, and impossible to misunderstand.</p>
          <p>
            God could have simply said take a son. Instead He said thy son, thine only son, Isaac,
            whom thou lovest. Every extra word makes the request harder, and every extra word is
            still there in the text on purpose.
          </p>
          <p>📌 God already knows exactly what He is asking of you. He is not testing whether you understand. He is testing whether you will trust Him anyway.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 22:4</h3>
        <VerseQuote
          text="Then on the third day Abraham lifted up his eyes, and saw the place afar off."
          reference="Genesis 22:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three days pass in half a verse.</p>
          <p>The text moves fast, but the road did not feel fast to Abraham.</p>
          <p>Every one of those seventy two hours was real, ordinary time spent carrying an unbearable command.</p>
          <p>
            This is the verse that carries the real weight of the whole story, even though it is
            the easiest one to read past. Everything hard about this test happened before Abraham
            ever lifted his eyes and saw that mountain in the distance.
          </p>
          <p>💡 Some of the heaviest faith you will ever walk in will not happen in a single moment. It will happen slowly, one ordinary day after another.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Hebrews 11:17 and 18</h3>
        <VerseQuote
          text="By faith Abraham, when he was tried, offered up Isaac: and he that had received the promises offered up his only begotten son, Of whom it was said, That in Isaac shall thy seed be called:"
          reference="Hebrews 11:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The writer of Hebrews spells out the tension plainly.</p>
          <p>The man who had received the promise is the same man asked to give up the promise.</p>
          <p>He offered up his only begotten son, knowing that son was the very one the promise depended on.</p>
          <p>
            Notice the word tried at the start of the verse. This was never framed as cruelty. It
            was framed as a test, meant to prove something that was already true in Abraham long
            before God ever spoke the command.
          </p>
          <p>📌 Real faith often looks like this. Not one contradiction resolved neatly, but a promise held onto in the middle of one that has not been explained yet.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Hebrews 11:19</h3>
        <VerseQuote
          text="Accounting that God was able to raise him up, even from the dead; from whence also he received him in a figure."
          reference="Hebrews 11:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse that tells you what Genesis leaves out.</p>
          <p>Abraham was not walking up that mountain resigned to loss.</p>
          <p>He believed, without ever having seen it happen once, that God could reverse death itself.</p>
          <p>
            This is centuries before anyone in Scripture had witnessed a resurrection. Abraham
            reached that conclusion with nothing to go on except who he already knew God to be.
          </p>
          <p>💡 Faith is not pretending the cost is not real. It is trusting that God is bigger than the cost.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 22:13</h3>
        <VerseQuote
          text="And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son."
          reference="Genesis 22:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Behind him. Not ahead of him, not visible from a distance on the walk up.</p>
          <p>Abraham had to obey all the way to the knife before he ever saw the provision.</p>
          <p>God&apos;s answer had been in place the whole time, right where Abraham could not see it until it was needed.</p>
          <p>
            He did not have to go find the ram himself, and he did not need to plan for it. He
            only had to keep obeying until the moment came, and then he simply had to lift his
            eyes and look.
          </p>
          <p>✅ God&apos;s provision is rarely visible from far away. It usually shows up exactly where obedience finally leads you.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Abraham and Isaac</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Abraham really almost sacrifice his son?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Genesis 22 records it as a real event, not a parable or a vision. God commanded it,
          Abraham obeyed step by step, and he had the knife raised before the angel of the LORD
          stopped him. The text treats it with complete seriousness, and the rest of Scripture,
          including Hebrews 11, refers back to it as a historical act of faith.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Isaac when this happened?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not give his exact age, but the details point to a young man, not a small
          child. He was old enough to carry the wood for the offering up the mountain himself and
          to ask his father a pointed question along the way. Many Bible scholars place him
          somewhere in his teens, which means Isaac likely could have resisted a frail, hundred
          year old father if he had chosen to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God test Abraham like this?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 22:1 says plainly that God did tempt, or test, Abraham. This was never about God
          learning something He did not already know. It was about revealing what was already
          true in Abraham&apos;s heart, both to Abraham himself and to everyone who would read this
          story afterward. The angel later says, now I know that thou fearest God, language meant
          for us as much as for Abraham.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Isaac know what was happening?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He noticed something was missing. Genesis 22:7 records him asking his father where the
          lamb was for the burnt offering. Abraham answered that God would provide Himself a lamb,
          and the text says they went on together after that. Scripture never says exactly when
          Isaac understood he was the offering, but he willingly let his father bind him, which
          says something about the trust between them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Mount Moriah matter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mount Moriah is the same location where Solomon later built the temple in Jerusalem,
          according to 2 Chronicles 3:1. The place where a father offered his beloved son and God
          provided a substitute became the very ground where Israel&apos;s sacrificial system was
          centered for generations. That connection is not an accident of geography.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Jehovahjireh mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abraham named the place Jehovahjireh, meaning the LORD will provide, right after the ram
          appeared in Genesis 22:14. It was not a name he chose in advance, hoping it would come
          true. He named it after watching God provide at the exact moment it mattered, and the
          name became a testimony every time someone in Israel spoke it afterward.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this story connected to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many Christians see clear parallels. A father offering his only, beloved son. The son
          carrying the wood for his own sacrifice up the same mountain range where Jesus would
          later carry His cross. A substitute provided so the son would not have to die. Scripture
          does not spell out every connection explicitly, but the pattern is hard to miss once you
          see it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does this story mean God wants human sacrifice?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and the story itself makes that clear. God stopped Abraham before the sacrifice was
          completed and provided a ram instead. The surrounding nations practiced child sacrifice
          to their gods, and this story stands in stark contrast to that. God was testing
          Abraham&apos;s trust, not asking for a human life, and He proved that by stopping the
          knife Himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Sarah know about the trip?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis does not record Abraham telling Sarah what God had said. That silence is part of
          why this story is so heavy. Abraham carried this alone, without the comfort of talking it
          through with the one person who loved Isaac as much as he did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Abraham argue with God about this, like he did for Sodom?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and the contrast is striking. In Genesis 18, Abraham bargained with God repeatedly
          over the fate of strangers he had never met. In Genesis 22, facing the loss of his own
          son, Scripture records no negotiation at all. He rose up early and obeyed. Whatever
          reasoning Abraham worked through, he worked through it privately, before the journey
          ever began.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can Christians learn from Abraham and Isaac today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That faith is not knowing how God will work things out. It is trusting what He has
          already promised, even when the path there makes no sense. Abraham never saw the ram
          until the exact moment he needed it, and neither will you, most of the time. The lesson
          is not to admire his faith from a distance. It is to ask honestly what your own Isaac
          is, and whether you are still holding on to it with both hands.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham never got to see the ram from the bottom of the mountain.</p>
          <p>He got a promise, years earlier, and he chose to believe it was solid enough to build a life on.</p>
          <p>
            📌 <strong>Faith isn&apos;t knowing what God is going to do. Faith is trusting what
            God has already said.</strong>
          </p>
          <p>That is not a comfortable lesson. It was not comfortable for Abraham either.</p>
          <p>
            It took three days of ordinary walking, a bound son on an altar, and a knife already
            raised before God stepped in.
          </p>
          <p>So the question is not just, do you trust God?</p>
          <p>❓ The harder question is this. Could you sacrifice your Isaac?</p>
          <p>You may not be standing on a literal mountain tonight.</p>
          <p>
            But something is probably sitting on your altar right now, something you love, something
            you prayed for, something you are not sure you could hand back.
          </p>
          <p>
            Abraham did not get an easier version of that question, and neither do you. He got the
            real one, with a real cost attached, and he answered it with his feet before he ever
            had it fully figured out in his head.
          </p>
          <p>
            Spend real time with God about it, the way{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              an unhurried hour with Him
            </ArticleLink>{" "}
            can open up, instead of rushing past it.
          </p>
          <p>Bring Him the honest answer, whatever it is.</p>
          <p>He already knows what it costs you. He named it before you did.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Abraham&apos;s story is one chapter in Genesis, but it holds a lifetime of faith inside
            it. If you want to keep walking through stories like this one, you do not have to do it
            alone.
          </p>
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
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
