import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-elizabeth", {
  title: "Who Was Elizabeth in the Bible? The Woman Who Waited a Lifetime for a Miracle",
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

export default function WhoWasElizabethPage() {
  return (
    <BlogPostShell
      slug="who-was-elizabeth"
      title={<>📖 Who Was Elizabeth in the Bible? The Woman Who Waited a Lifetime for a Miracle</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Some Bible stories start with a battle.</p>
            <p>Elizabeth&apos;s starts with a wait.</p>
            <p>
              She was married to a good man. She loved God with her whole life. And year after year,
              the one thing she wanted most never came.
            </p>
            <p>
              📌 <strong>In her world, a woman without children carried a quiet shame that never
              really let up.</strong>
            </p>
            <p>People whispered. Some pitied her. Some probably wondered what she had done wrong.</p>
            <p>
              Nothing. She had done nothing wrong. The Bible says plainly that she was righteous
              before God. And still, the years kept passing with an empty cradle.
            </p>
            <p>
              By the time we meet her in Luke chapter 1, Elizabeth was old. Old enough that having a
              baby was not just unlikely. It was impossible by every normal measure.
            </p>
            <p>
              Maybe you know a version of that ache. A prayer you have prayed so many times you
              almost stopped expecting an answer. A door that seems shut for good.
            </p>
            <p>
              ❓ What do you do when you have run out of reasons to hope, but you have not run out of
              years to wait?
            </p>
            <p>Elizabeth&apos;s story answers that question in a way nobody could have guessed.</p>
            <p>
              God did not just give her a son. He gave her a son at the exact same moment He was
              setting the stage for the most important birth in human history, the birth of Jesus
              Himself. Her story and Mary&apos;s story cross paths, and neither woman&apos;s life
              makes full sense without the other.
            </p>
            <p>
              This is the full story of Elizabeth in the Bible, walked through in order. Who she was.
              What happened to her husband in the temple. The five months she spent in hiding. The
              moment a young relative showed up at her door carrying a secret of her own. And the son
              who grew up to prepare the way for the Messiah.
            </p>
            <p>Let&apos;s start with who she actually was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Elizabeth Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth was the wife of a priest named Zacharias.</p>
          <p>
            Zacharias belonged to a specific group of priests called the course of Abia. Priests
            worked in rotating shifts at the temple in Jerusalem, and Zacharias&apos;s shift only came
            up a few times a year.
          </p>
          <p>
            Elizabeth herself came from priestly stock too. Scripture calls her one of the daughters
            of Aaron, the very first high priest of Israel.
          </p>
        </div>
        <VerseQuote
          text="There was in the days of Herod, the king of Judaea, a certain priest named Zacharias, of the course of Abia: and his wife was of the daughters of Aaron, and her name was Elisabeth."
          reference="Luke 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the King James Version spells her name Elisabeth. Most people today write it
            Elizabeth, and that is the spelling used throughout this article.
          </p>
          <p>Luke tells us something important about both of them before anything else happens.</p>
        </div>
        <VerseQuote
          text="And they were both righteous before God, walking in all the commandments and ordinances of the Lord blameless."
          reference="Luke 1:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Elizabeth was not barren because she had done something wrong. The text goes
            out of its way to say the opposite.</strong>
          </p>
          <p>Then comes the hard sentence.</p>
        </div>
        <VerseQuote
          text="And they had no child, because that Elisabeth was barren, and they both were now well stricken in years."
          reference="Luke 1:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two faithful people. No child. Old age arriving with the door still shut.</p>
          <p>
            Elizabeth was also a relative of Mary, the young woman who would become the mother of
            Jesus. Luke calls her Mary&apos;s cousin, though the Greek word simply means a female
            relative or kinswoman.
          </p>
          <p>
            Her whole story is told in the first chapter of Luke, a Gospel written to lay out, in
            order, exactly how the events around Jesus&apos;s birth happened.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Elizabeth&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Zacharias in the Temple and the Angel Who Interrupted Everything
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One day it was finally Zacharias&apos;s turn to serve in the temple.</p>
          <p>
            There were so many priests by this point in history that each one might only get this
            honor once in his whole life. On this day, the lot fell to Zacharias to go into the
            temple and burn incense before the Lord while the people prayed outside.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, that while he executed the priest's office before God in the order of his course,"
          reference="Luke 1:8"
        />
        <VerseQuote
          text="According to the custom of the priest's office, his lot was to burn incense when he went into the temple of the Lord."
          reference="Luke 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            While he was in there alone, something happened that had not happened to anyone in Israel
            for hundreds of years. An angel showed up.
          </p>
        </div>
        <VerseQuote
          text="And there appeared unto him an angel of the Lord standing on the right side of the altar of incense."
          reference="Luke 1:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ Zacharias did not respond with excitement. He responded with fear.</p>
        </div>
        <VerseQuote
          text="And when Zacharias saw him, he was troubled, and fear fell upon him."
          reference="Luke 1:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If fear is something you wrestle with too, you are in good company. Even a righteous
            priest, alone with God in the holiest room he would ever stand in, was shaken. Read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">what the Bible says
            about fear</ArticleLink> if that is a battle you know well.
          </p>
          <p>
            The angel calmed him down and delivered news Zacharias had probably stopped expecting to
            hear.
          </p>
        </div>
        <VerseQuote
          text="But the angel said unto him, Fear not, Zacharias: for thy prayer is heard; and thy wife Elisabeth shall bear thee a son, and thou shalt call his name John."
          reference="Luke 1:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Thy prayer is heard.</strong> Not just is heard right now, but has been heard
            this whole time, even during the years when nothing seemed to change.
          </p>
          <p>The angel kept talking, and the promise got bigger with every sentence.</p>
        </div>
        <VerseQuote
          text="For he shall be great in the sight of the Lord, and shall drink neither wine nor strong drink; and he shall be filled with the Holy Ghost, even from his mother's womb."
          reference="Luke 1:15"
        />
        <VerseQuote
          text="And he shall go before him in the spirit and power of Elias, to turn the hearts of the fathers to the children, and the disobedient to the wisdom of the just; to make ready a people prepared for the Lord."
          reference="Luke 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This son would not just end Elizabeth&apos;s years of shame. He would grow up to be a
            prophet who prepared an entire nation for the Messiah.
          </p>
          <p>But Zacharias asked for proof.</p>
        </div>
        <VerseQuote
          text="And Zacharias said unto the angel, Whereby shall I know this? for I am an old man, and my wife well stricken in years."
          reference="Luke 1:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>❓ Was that such an unreasonable question, given his age and hers?</p>
          <p>
            Maybe not. But the one answering him was Gabriel, one of the highest ranking angels named
            in Scripture, someone who stands in the very presence of God.
          </p>
        </div>
        <VerseQuote
          text="And the angel answering said unto him, I am Gabriel, that stand in the presence of God; and am sent to speak unto thee, and to shew thee these glad tidings."
          reference="Luke 1:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ Doubting Gabriel came with a price.</p>
        </div>
        <VerseQuote
          text="And, behold, thou shalt be dumb, and not able to speak, until the day that these things shall be performed, because thou believest not my words, which shall be fulfilled in their season."
          reference="Luke 1:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Zacharias walked out of the temple that day unable to say a single word. For the next
            nine months, whatever he felt about becoming a father at his age, he could not speak it
            out loud.
          </p>
          <p>
            💡 Sometimes God lets silence do what words could not. Zacharias could not talk his way
            out of faith. He had to live inside the promise until it was born.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Elizabeth&apos;s Five Hidden Months</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Zacharias went home still unable to speak.</p>
          <p>Not long after, Elizabeth conceived, exactly as the angel had promised.</p>
        </div>
        <VerseQuote
          text="And after those days his wife Elisabeth conceived, and hid herself five months, saying,"
          reference="Luke 1:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>❓ Why would she hide?</p>
          <p>
            Scripture does not spell out her reasons, but it is not hard to imagine. Maybe she wanted
            to be sure before she told anyone. Maybe she simply wanted to sit quietly with God in the
            miracle before the whole town started talking about it. Either way, for five months,
            Elizabeth kept this news between herself and the Lord.
          </p>
          <p>When she finally spoke about it, here is what she said.</p>
        </div>
        <VerseQuote
          text="Thus hath the Lord dealt with me in the days wherein he looked on me, to take away my reproach among men."
          reference="Luke 1:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Take away my reproach among men.</strong> That single phrase carries decades of
            pain most of us will never fully understand.
          </p>
          <p>
            Reproach means shame, the kind other people put on you. For years, Elizabeth had likely
            absorbed sideways looks and quiet judgments simply for being barren, as if it were a
            punishment or a personal failure.
          </p>
          <p>
            💡 Notice she does not say the Lord finally rewarded her. She says He looked on her. The
            miracle was not payment for good behavior. It was God turning His attention toward a
            woman who had waited a long time.
          </p>
          <p>
            ✅ Whatever shame you have carried for something you never chose and could not control,
            Elizabeth&apos;s life says God is able to take that away too, in His own timing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Mary at the Door</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Six months into Elizabeth&apos;s pregnancy, the angel Gabriel made another visit, this time
            to a young relative of hers named Mary, in the town of Nazareth.
          </p>
          <p>
            Gabriel told Mary she would give birth to the Son of God Himself, and as proof that
            nothing is impossible with God, he pointed her straight to Elizabeth.
          </p>
        </div>
        <VerseQuote
          text="And, behold, thy cousin Elisabeth, she hath also conceived a son in her old age: and this is the sixth month with her, who was called barren."
          reference="Luke 1:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>So Mary went to find her.</p>
        </div>
        <VerseQuote
          text="And Mary arose in those days, and went into the hill country with haste, into a city of Juda; And entered into the house of Zacharias, and saluted Elisabeth."
          reference="Luke 1:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The moment Mary greeted her, something remarkable happened.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that, when Elisabeth heard the salutation of Mary, the babe leaped in her womb; and Elisabeth was filled with the Holy Ghost:"
          reference="Luke 1:41"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Before John the Baptist was even born, he responded to the presence of Jesus,
            who at that point was only an unborn child in Mary&apos;s womb.</strong>
          </p>
          <p>
            Elizabeth, filled with the Holy Ghost, did not need anyone to explain what was happening.
            She knew immediately.
          </p>
        </div>
        <VerseQuote
          text="And she spake out with a loud voice, and said, Blessed art thou among women, and blessed is the fruit of thy womb."
          reference="Luke 1:42"
        />
        <VerseQuote
          text="And whence is this to me, that the mother of my Lord should come to me?"
          reference="Luke 1:43"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Elizabeth, an older woman with her own miracle already growing inside her, called her
            young relative the mother of my Lord. She did not compete with Mary&apos;s moment. She
            recognized it and honored it, out loud, right away.
          </p>
        </div>
        <VerseQuote
          text="For, lo, as soon as the voice of thy salutation sounded in mine ears, the babe leaped in my womb for joy."
          reference="Luke 1:44"
        />
        <VerseQuote
          text="And blessed is she that believed: for there shall be a performance of those things which were told her from the Lord."
          reference="Luke 1:45"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ Blessed is she that believed. That line is a promise for anyone who takes God at His
            word before they can see how it will happen.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Two Women, One Waiting Room</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary stayed with Elizabeth for about three months.</p>
        </div>
        <VerseQuote
          text="And Mary abode with her about three months, and returned to her own house."
          reference="Luke 1:56"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Think about what those three months must have meant for both of them.</p>
          <p>
            Mary was young, unmarried, and pregnant in a way no one around her would easily understand
            or believe. Elizabeth was old, married, and finally pregnant after decades of waiting.
            Neither situation was normal. Both were the direct work of God.
          </p>
          <p>
            📌 <strong>God gave each woman a companion who actually understood what she was
            carrying.</strong>
          </p>
          <p>
            Elizabeth, six months further along, had already lived through the shock, the fear, and
            the wonder Mary was just beginning to feel. She could offer Mary something no one else in
            Nazareth could: someone older and steadier who had already seen God do the impossible up
            close.
          </p>
          <p>
            💡 God rarely asks His people to carry something enormous completely alone. He tends to
            put someone nearby who already understands part of the weight.
          </p>
          <p>
            Compare that to how alone <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink> felt
            for most of her story, and you see how much of a gift these three months really were for
            two women stepping into the unknown together.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Not So, He Shall Be Called John</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth&apos;s full time came, and she gave birth to a son, exactly as the angel had said.</p>
        </div>
        <VerseQuote
          text="Now Elisabeth's full time came that she should be delivered; and she brought forth a son."
          reference="Luke 1:57"
        />
        <VerseQuote
          text="And her neighbours and her cousins heard how the Lord had shewed great mercy upon her; and they rejoiced with her."
          reference="Luke 1:58"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>✅ The reproach was gone. The whole community celebrated with her.</p>
          <p>
            On the eighth day, according to Jewish law, it was time to circumcise the baby. That was
            also the customary day a child was formally named. Everyone assumed they knew what the
            name would be.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, that on the eighth day they came to circumcise the child; and they called him Zacharias, after the name of his father."
          reference="Luke 1:59"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Naming a firstborn son after his father was expected. It was how families honored their
            line.
          </p>
          <p>Elizabeth stopped them cold.</p>
        </div>
        <VerseQuote text="And his mother answered and said, Not so; but he shall be called John." reference="Luke 1:60" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not so.</strong> Two small words, spoken by a woman standing against everyone
            else in the room.
          </p>
          <p>The family pushed back immediately.</p>
        </div>
        <VerseQuote
          text="And they said unto her, There is none of thy kindred that is called by this name."
          reference="Luke 1:61"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nobody in the family had ever been named John. Elizabeth had no relative, no tradition, no
            explanation they would accept as a reason. She simply knew what the angel had told her
            husband, and she held her ground.
          </p>
          <p>Confused, the family turned to Zacharias, who still could not speak.</p>
        </div>
        <VerseQuote text="And they made signs to his father, how he would have him called." reference="Luke 1:62" />
        <VerseQuote
          text="And he asked for a writing table, and wrote, saying, His name is John. And they marvelled all."
          reference="Luke 1:63"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A husband who had spent nine months in silence backed up his wife&apos;s obedience the
            moment he had the chance to answer. They were not guessing separately. They had each
            agreed with God, apart, and arrived at the same answer.
          </p>
          <p>The instant Zacharias confirmed the name, something else happened.</p>
        </div>
        <VerseQuote
          text="And his mouth was opened immediately, and his tongue loosed, and he spake, and praised God."
          reference="Luke 1:64"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ Obedience was the key that opened his mouth again. He had gone silent for doubting
            God&apos;s word, and his voice came back the moment he finally lined up with it
            completely.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💡 Lessons From Elizabeth&apos;s Life
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Being faithful does not guarantee an easy story
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Elizabeth and Zacharias were both righteous before God, walking blameless in every
            commandment. That did not spare them decades of waiting, disappointment, and public
            shame.
          </p>
          <p>
            ⚠️ A hard season is not automatic proof that something is wrong with your walk with God.
            Sometimes the most faithful people simply have to wait the longest.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. God&apos;s silence is not the same as God&apos;s absence
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Elizabeth spent five months hiding her pregnancy before she said a word to anyone. God had
            already acted; He just had not announced it yet.
          </p>
          <p>
            💡 Just because you cannot see what God is doing does not mean He has stopped doing
            anything at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Doubt has consequences, but it does not disqualify you
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Zacharias doubted Gabriel and lost his voice for nine months. He was not written out of
            the story. He was still the father of John the Baptist, and he still got to speak the very
            name that confirmed everything the angel had promised.
          </p>
          <p>
            📌 <strong>God can discipline you for doubt and still use you for something enormous, both
            at the same time.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Older believers can carry younger ones through the unknown
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Elizabeth did not need to be told what Mary was carrying. The Holy Ghost showed her
            immediately, and she poured out blessing instead of confusion or jealousy.
          </p>
          <p>
            ✅ If you are further along in your walk with God than someone near you, your steadiness
            might be exactly what they need right now.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Obedience sometimes means standing alone in the room
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nobody in that room agreed with Elizabeth when she said the baby&apos;s name would be
            John. She said it anyway, and her husband backed her up the second he could speak.
          </p>
          <p>
            ❓ Are you willing to obey God even when everyone around you expects something different?
            The same quiet obedience runs through{" "}
            <ArticleLink href="/blog/who-was-joseph">Joseph&apos;s story</ArticleLink>, another
            believer who followed God&apos;s instructions even when they made no sense to the people
            watching him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses From Elizabeth&apos;s Story
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:13</h3>
        <VerseQuote
          text="But the angel said unto him, Fear not, Zacharias: for thy prayer is heard; and thy wife Elisabeth shall bear thee a son, and thou shalt call his name John."
          reference="Luke 1:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse that turns Elizabeth&apos;s whole life around, and it is spoken to her
            husband, not to her directly.
          </p>
          <p>
            📌 Thy prayer is heard. That prayer had likely been prayed for decades. God was not
            answering a new request. He was finally answering an old one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 1:25</h3>
        <VerseQuote
          text="Thus hath the Lord dealt with me in the days wherein he looked on me, to take away my reproach among men."
          reference="Luke 1:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth&apos;s own words, spoken after months of quiet.</p>
          <p>
            💡 She frames the miracle as God looking at her, not as a reward she earned. The shame
            other people placed on her, God removed on His own timing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 1:42</h3>
        <VerseQuote
          text="And she spake out with a loud voice, and said, Blessed art thou among women, and blessed is the fruit of thy womb."
          reference="Luke 1:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth speaks these words while filled with the Holy Ghost, not from her own guessing.</p>
          <p>
            📌 An older woman in the middle of her own miracle still had room to loudly celebrate
            someone else&apos;s. That is a rare and beautiful kind of joy.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 1:45</h3>
        <VerseQuote
          text="And blessed is she that believed: for there shall be a performance of those things which were told her from the Lord."
          reference="Luke 1:45"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth says this about Mary, but it could just as easily describe her own life.</p>
          <p>
            💡 Belief does not remove the waiting. It simply trusts that what was promised will still
            arrive, on time, even if the timeline makes no earthly sense.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Luke 1:60</h3>
        <VerseQuote text="And his mother answered and said, Not so; but he shall be called John." reference="Luke 1:60" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two words of resistance, spoken by a woman with an entire family disagreeing with her.</p>
          <p>
            📌 Obedience to God will sometimes put you at odds with people who love you and still get
            it wrong. Elizabeth chose the name God gave over the name tradition expected.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Elizabeth
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Elizabeth in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Elizabeth was the wife of a priest named Zacharias. Scripture calls her righteous before
          God, but she was barren and well along in years. She and Zacharias became the parents of
          John the Baptist after an angel appeared to Zacharias in the temple. Her story is told in
          Luke chapter 1.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Elizabeth related to Mary?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Luke calls Elizabeth Mary&apos;s cousin, though the Greek word simply means a female
          relative or kinswoman. The exact family connection is not spelled out further, but the two
          women were close enough that Mary traveled to stay with her for three months.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How old was Elizabeth when she had John the Baptist?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never gives an exact age. It only says she and Zacharias were both well stricken
          in years, and that she had been called barren for her whole marriage. The point of the
          story is not a specific number, it is that having a child was well past what anyone
          expected naturally.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Zacharias lose his ability to speak?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The angel Gabriel struck him unable to speak because he doubted the promise of a son,
          asking for proof instead of simply believing. His silence lasted until John was born and
          Zacharias confirmed the name in writing, at which point his voice returned immediately.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does blessed art thou among women mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a Hebrew style of expressing the highest possible honor, meaning Mary was uniquely
          favored above every other woman. Elizabeth said it while filled with the Holy Ghost, the
          moment Mary greeted her, recognizing that Mary was carrying the Lord Himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Elizabeth hide herself for five months?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not explain her exact reason. It simply says she hid herself and then
          credited the Lord for taking away her reproach. Many readers believe she wanted time alone
          with God to absorb the miracle before facing the town&apos;s reaction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does take away my reproach mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Reproach means public shame or disgrace. In her culture, a barren woman often carried
          quiet blame or pity from her community. Elizabeth&apos;s pregnancy publicly removed that
          shame, which is exactly what she says in Luke 1:25.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Elizabeth insist on the name John?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because that is the name the angel Gabriel had given Zacharias before John was even
          conceived. Custom expected the boy to be named after his father, but Elizabeth held firm to
          what God had already said, and Zacharias confirmed it in writing the moment he was asked.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does it mean that the baby leaped in her womb?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          When Mary greeted Elizabeth, the unborn John moved inside her in a way Elizabeth understood
          as a response to the presence of Jesus, still unborn in Mary&apos;s womb. It is read as an
          early sign that John, even before birth, recognized and responded to the Messiah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Elizabeth a prophetess?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not give her that title directly, but Luke says she was filled with the
          Holy Ghost right before she spoke out about Mary and the child Mary was carrying. Her words
          in that moment carry the same weight as prophetic speech elsewhere in Scripture.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Elizabeth waited most of her life for one thing, and God answered right on time.</p>
          <p>Not her time. His.</p>
          <p>
            📌 <strong>God saw her faithfulness during the years nothing seemed to be happening.</strong>
          </p>
          <p>
            📌 <strong>He removed a shame she never deserved, in a moment she could not have
            planned.</strong>
          </p>
          <p>
            📌 <strong>And He wove her story into the single most important birth in history without
            asking her to compete with it.</strong>
          </p>
          <p>
            If you are waiting on something right now that feels impossible, hold onto this. Elizabeth
            did not manufacture her miracle. She kept walking blameless before God through years that
            gave her every reason to give up.
          </p>
          <p>
            Read Luke 1 for yourself this week, slowly, and watch how much happens in the quiet parts
            most people skip past. If you have never made a habit of reading Scripture that closely,{" "}
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
          description="Elizabeth waited a lifetime for a promise, and this 21 day study walks through more women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
