import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("moses", {
  title: "Who Was Moses in the Bible? The Story of the Man God Drew Out",
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

export default function MosesCharacterStudyPage() {
  return (
    <BlogPostShell
      slug="moses"
      title={<>📖 Who Was Moses in the Bible? The Story of the Man God Drew Out</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ever feel like your past already disqualified you?</p>
            <p>Like God might use somebody else, but not you.</p>
            <p>Not after what you did. Not after how long you have been sitting still.</p>
            <p>
              📌 <strong>If that is where you are, Moses is your story.</strong>
            </p>
            <p>Most people know two scenes from his life.</p>
            <p>The baby in the basket. The sea splitting open.</p>
            <p>What gets skipped is everything in between.</p>
            <p>A murder. A run for his life. Forty years of nothing.</p>
            <p>
              And a man arguing with God at a burning bush, saying the same thing you would say.
              <strong> Please send somebody else.</strong>
            </p>
            <p>Moses is not in Scripture because he was impressive.</p>
            <p>He is there because God kept using him anyway.</p>
            <p>
              This is the whole story of Moses in the Bible, walked through in order, straight from
              the text. Who he was. What he actually did. What his life still says to you today.
            </p>
            <p>Let&apos;s walk through it.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Moses Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses was a Hebrew, born in Egypt while his people were slaves there.</p>
          <p>Scholars place him somewhere around 1400 to 1200 BC.</p>
          <p>
            📌 His story runs from <strong>Exodus 2</strong> all the way to{" "}
            <strong>Deuteronomy 34</strong>.
          </p>
          <p>That is four books of the Bible following one man.</p>
          <p>His life splits cleanly into three parts, forty years each.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>👑 <strong>Forty years a prince</strong> in Pharaoh&apos;s palace</li>
          <li>🐑 <strong>Forty years a shepherd</strong> hiding in the desert</li>
          <li>🔥 <strong>Forty years a leader</strong> of a freed nation</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He is also the man who wrote the first five books of the Bible.</p>
          <p>
            If you have ever wondered <ArticleLink href="/blog/what-is-the-bible">what the Bible
            actually is</ArticleLink> and where it came from, it starts with what Moses put down on
            paper.
          </p>
          <p>Now here is how his life actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of Moses</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Baby Who Should Have Died</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses enters Scripture in the middle of a genocide.</p>
          <p>Israel was multiplying in Egypt. Egypt got scared.</p>
          <p>Fear turned into oppression. Oppression turned into slaughter.</p>
          <p>Pharaoh gave an order:</p>
        </div>
        <VerseQuote
          text="Every son that is born ye shall cast into the river, and every daughter ye shall save alive."
          reference="Exodus 1:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mothers were hiding newborns. Fathers were praying for miracles.</p>
          <p>And one woman made a desperate decision.</p>
          <p>She built a basket. Coated it in pitch.</p>
          <p>Put her three month old son inside and set him in the reeds of the Nile.</p>
          <p>Then she let go.</p>
          <p>The river did not swallow him.</p>
          <p>Pharaoh&apos;s own daughter found him.</p>
        </div>
        <VerseQuote
          text="And when she had opened it, she saw the child: and, behold, the babe wept. And she had compassion on him, and said, This is one of the Hebrews' children."
          reference="Exodus 2:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look at what God just did.</p>
          <p>The river meant to kill Hebrew boys became the river that saved one.</p>
          <p>Pharaoh ordered death. Pharaoh&apos;s daughter handed out life.</p>
          <p>💡 God was already working before Moses could even speak.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Prince With a Slave&apos;s Blood</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses grew up in the palace.</p>
          <p>Hebrew by blood. Egyptian by upbringing.</p>
          <p>Stephen says he was trained in all the wisdom of Egypt, mighty in words and deeds.</p>
          <p>He had the best education on the planet at the time.</p>
          <p>But he belonged to a people in chains.</p>
          <p>Every day he lived between two worlds.</p>
          <p>Palace comfort on one side. His own people under the whip on the other.</p>
          <p>Think about what that does to a man.</p>
          <p>He ate food his own relatives were dying to harvest.</p>
          <p>He learned to read and write in the language of the people enslaving his family.</p>
          <p>He had every reason to look away and enjoy the life he was handed.</p>
          <p>Hebrews says he refused it on purpose.</p>
        </div>
        <VerseQuote
          text="Choosing rather to suffer affliction with the people of God, than to enjoy the pleasures of sin for a season."
          reference="Hebrews 11:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He picked his people over his privilege.</p>
          <p>That choice cost him everything he had been raised with.</p>
          <p>
            📌 <strong>God was building a deliverer long before Moses knew he needed to be
            one.</strong>
          </p>
          <p>
            The education came from Egypt. The compassion came from somewhere else. God used both.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Day He Took It Into His Own Hands</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Around forty years old, something in Moses snapped.</p>
          <p>He saw an Egyptian beating a Hebrew slave.</p>
          <p>He looked around. Nobody was watching.</p>
          <p>He killed the Egyptian and buried him in the sand.</p>
          <p>This was not cowardice. It was zeal pointed the wrong way.</p>
          <p>
            Acts 7:25 says Moses assumed his people would understand that God was using him to
            rescue them.
          </p>
          <p>They did not.</p>
          <p>The next day he tried to break up a fight between two Hebrews, and one of them said:</p>
        </div>
        <VerseQuote
          text="Who made thee a prince and a judge over us? intendest thou to kill me, as thou killedst the Egyptian?"
          reference="Exodus 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That rejection cut deeper than Pharaoh&apos;s anger ever could.</p>
          <p>When Pharaoh found out, Moses ran.</p>
          <p>⚠️ The prince became a fugitive in a single day.</p>
          <p>Right calling. Right heart. Completely wrong way of doing it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Forty Years of Nothing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses disappeared into Midian.</p>
          <p>Not for weeks. Not for months.</p>
          <p>
            <strong>Forty years.</strong>
          </p>
          <p>The man raised in a palace spent them keeping somebody else&apos;s sheep.</p>
          <p>No crowds. No platform. No sign that God still had plans for him.</p>
          <p>He got married. Had sons. Built an ordinary life in a place nobody wrote songs about.</p>
          <p>He named his first son Gershom, which means a stranger there.</p>
          <p>That is how he saw himself. A stranger. Far from home. Far from whatever he was for.</p>
          <p>Think about how that must have felt around year twenty.</p>
          <p>The dream of rescuing his people would have looked like a young man&apos;s fantasy by then.</p>
          <p>He was eighty when God finally spoke.</p>
          <p>💡 The palace gave Moses his education. The desert gave him his character.</p>
          <p>
            📌 <strong>Midian was not punishment. It was preparation.</strong>
          </p>
          <p>
            If you are sitting in a season where nothing is happening, that is not proof God is
            done with you. Sometimes He takes you out of the spotlight before He trusts you with
            weight.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Bush That Would Not Burn Up</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then one ordinary workday turned into history.</p>
          <p>Moses saw a bush on fire that was not burning up.</p>
          <p>He walked closer. And the fire said his name.</p>
          <p>Take off your shoes. This ground is holy.</p>
          <p>Then God told him what He had been doing all along:</p>
        </div>
        <VerseQuote
          text="I have surely seen the affliction of my people which are in Egypt, and have heard their cry by reason of their taskmasters; for I know their sorrows."
          reference="Exodus 3:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Seen. Heard. Known.</p>
          <p>Four hundred years of silence, and God had not missed a single day of it.</p>
          <p>Then He said the part Moses did not want: I am sending you.</p>
          <p>And Moses argued. Not once. Five times.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>❓ Who am I to go?</li>
          <li>❓ What if they ask your name?</li>
          <li>❓ What if they do not believe me?</li>
          <li>❓ I am slow of speech.</li>
          <li>❓ Please, send somebody else.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>God never argued him into confidence.</p>
          <p>He answered the fear with a promise instead:</p>
        </div>
        <VerseQuote text="Certainly I will be with thee." reference="Exodus 3:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That is the difference between ambition and calling.</strong>
          </p>
          <p>
            Ambition needs you to be enough. Calling only needs God to go with you. If arguing with
            God about whether you are qualified sounds familiar, so does{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">what the Bible says
            about anxiety</ArticleLink> and where to carry it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Ten Plagues and a Sea That Opened</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses walked back into Egypt at eighty years old.</p>
          <p>Not as a prince. As a shepherd holding a stick.</p>
          <p>He stood in front of the most powerful man on earth with a message of four words.</p>
          <p>
            <strong>Let my people go.</strong>
          </p>
          <p>Pharaoh said no. Ten times.</p>
          <p>And ten plagues hit Egypt, each one aimed at a god Egypt worshiped.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🩸 The Nile they worshiped turned to blood</li>
          <li>🐸 The frog goddess became a plague crawling through their beds</li>
          <li>🐄 The livestock they treated as sacred died in the fields</li>
          <li>🌑 The sun god went dark for three days</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 This was never just a rescue. It was God dismantling a whole religion in public.</p>
          <p>Then came the Passover.</p>
          <p>The blood of a lamb on the doorpost, and judgment passed over that house.</p>
          <p>💡 Keep that picture. The whole Bible comes back to a lamb whose blood covers people.</p>
          <p>Israel walked out free. Then they hit the Red Sea with an army behind them.</p>
          <p>They panicked. Moses did not.</p>
        </div>
        <VerseQuote
          text="Fear ye not, stand still, and see the salvation of the LORD, which he will shew to you to day."
          reference="Exodus 14:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He raised the staff. The water stood up in walls.</p>
          <p>Slaves walked out on dry ground and an empire drowned behind them.</p>
          <p>
            📌 <strong>The man who ran from Egypt in fear came back and emptied it.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The Mountain, the Golden Calf, and the Rock</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Getting out of Egypt was not the end. It was the start.</p>
          <p>At Mount Sinai, Moses walked up into the thunder and came back with the Law.</p>
          <p>The mountain shook. The people were terrified and begged him to go up alone.</p>
          <p>So he did. Forty days in the presence of God.</p>
          <p>He became lawgiver, mediator, and go between for a whole nation.</p>
          <p>
            Everything Israel would be for the next fifteen hundred years came down that mountain in
            his hands.
          </p>
          <p>And while he was up there, the people melted their jewelry into a golden calf.</p>
          <p>God was ready to wipe them out. Watch what Moses did:</p>
        </div>
        <VerseQuote
          text="Yet now, if thou wilt forgive their sin; and if not, blot me, I pray thee, out of thy book which thou hast written."
          reference="Exodus 32:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He offered to be erased if it would save them.</p>
          <p>💡 That is what a real shepherd looks like. Standing between judgment and the people.</p>
          <p>But Moses was not flawless.</p>
          <p>Years later, the people complained about water one more time.</p>
          <p>God told him to speak to the rock. Moses hit it with his staff instead, in anger.</p>
          <p>
            ⚠️ Because of that moment, God told him he would not enter the Promised Land.
          </p>
          <p>Even the faithful are not perfect. Even leaders live with consequences.</p>
          <p>Yet this is how Scripture describes him:</p>
        </div>
        <VerseQuote
          text="Now the man Moses was very meek, above all the men which were upon the face of the earth."
          reference="Numbers 12:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The impulsive prince became the humblest man alive.</p>
          <p>
            📌 <strong>That is not a personality. That is forty years of God at work.</strong>
          </p>
          <p>At the end, Moses climbed Mount Nebo and God showed him the land.</p>
          <p>He saw it. He never walked in it. He died there, and God buried him Himself.</p>
          <p>No shrine. No monument. No grave for people to worship.</p>
          <p>Just a life of obedience and a nation standing at the border because of him.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From the Life of Moses</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Your hidden years are not wasted years</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forty years of sheep looked like forty years of nothing.</p>
          <p>It was God building the man who could handle a nation.</p>
          <p>The season you are calling a waste may be the season doing the most work in you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Feeling unqualified is not a disqualification</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses gave God five reasons he was the wrong man.</p>
          <p>God never told him he was wrong about himself.</p>
          <p>He just promised to go with him.</p>
          <p>
            💡 God is not looking for qualified people. He is looking for available ones.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Right calling, wrong method, still costs you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses was right that his people needed rescuing.</p>
          <p>He was wrong to grab it with his own hands and his own timing.</p>
          <p>It cost him forty years.</p>
          <p>Wanting the right thing does not excuse forcing it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. God can use where you came from, even the painful parts</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses knew Egypt from the inside.</p>
          <p>He knew the palace, the language, the politics, the way Pharaoh thought.</p>
          <p>The years that felt like a compromised identity turned into training.</p>
          <p>
            💡 God wastes nothing. Not your background, not your detours, not the parts of your
            story you would rather not explain.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God notices long before He moves</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Israel cried for four hundred years and heaven seemed silent.</p>
          <p>Then God said I have seen, I have heard, I know their sorrows.</p>
          <p>Silence is not absence.</p>
          <p>Your unanswered prayer is not an unheard prayer.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. You can lead people somewhere you never get to go</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses got the whole nation to the border and stopped there.</p>
          <p>He never set foot in the land he spent his life walking toward.</p>
          <p>
            📌 Some of what God does through you, you will not get to enjoy. Do it anyway.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From the Story of Moses</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 3:14</h3>
        <VerseQuote
          text="And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you."
          reference="Exodus 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses asked for a name and God gave him a statement of existence.</p>
          <p>Not a local god. Not one option among many.</p>
          <p>The One who simply is, who was never made and never started.</p>
          <p>Everything else in the universe depends on something. He does not.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 3:12</h3>
        <VerseQuote text="Certainly I will be with thee." reference="Exodus 3:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four words that answered every excuse Moses had.</p>
          <p>Notice God did not fix his speech or his confidence.</p>
          <p>He offered His presence instead, and that was enough to move a nation.</p>
          <p>This is still the promise you get when you say yes to something too big for you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 14:14</h3>
        <VerseQuote text="The LORD shall fight for you, and ye shall hold your peace." reference="Exodus 14:14" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>An army behind them. A sea in front of them. No way out.</p>
          <p>God&apos;s instruction was to stop panicking and watch.</p>
          <p>There are fights God hands you and fights God takes from you.</p>
          <p>Wisdom is knowing which one you are standing in right now.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 33:11</h3>
        <VerseQuote
          text="And the LORD spake unto Moses face to face, as a man speaketh unto his friend."
          reference="Exodus 33:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the detail people miss about Moses.</p>
          <p>The miracles are not what made him great. The friendship did.</p>
          <p>He talked to God the way you talk to somebody who knows you.</p>
          <p>That access is what he protected more than his position.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 34:10</h3>
        <VerseQuote
          text="And there arose not a prophet since in Israel like unto Moses, whom the LORD knew face to face."
          reference="Deuteronomy 34:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Written after his death, as the final word on his life.</p>
          <p>Not the plagues. Not the sea. Not the Law.</p>
          <p>He was the man the LORD knew.</p>
          <p>💡 That is the legacy worth wanting.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Moses</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Moses a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians and Jews have held for thousands of years that he was, and the entire Old
          Testament treats him as a real historical figure. Jesus spoke about him as a real man and
          quoted his writings. Outside sources for any single person from that era are thin, which
          is normal for the ancient world, so the case rests largely on the Scriptural record. What
          is not in question is his impact: his writings shaped a nation that still exists today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God choose Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never gives a flattering reason, and that is the point. God did not pick him for
          his speaking ability, because Moses said he did not have any. He did not pick him for a
          clean record, because Moses had killed a man. He chose him, prepared him for eighty years,
          and promised to go with him. The qualification was God, not Moses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Moses really write the first five books of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The traditional view, held by Jesus and the New Testament writers, is that Moses authored
          Genesis through Deuteronomy. Some modern scholars argue for later editing, and the final
          chapter of Deuteronomy describing his death was obviously added by someone else. Neither
          point changes what the Church has always confessed about these books being God&apos;s Word.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Moses not allowed to enter the Promised Land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God told him to speak to a rock so water would come out. Moses struck it with his staff
          instead, in front of everyone, in anger. It looks small until you see what it did: it made
          the moment about Moses instead of God. Leadership carries weight, and Scripture is honest
          that consequences reach the faithful too.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Moses when he died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          One hundred and twenty. Deuteronomy 34:7 adds a striking detail: his eyes were not weak
          and his strength had not gone. He did not die worn out. He finished the assignment and God
          took him home.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Moses mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pharaoh&apos;s daughter named him Moses because, she said, she drew him out of the water.
          The name carries the meaning of being drawn out. It fits his whole life. He was drawn out
          of a river, drawn out of a palace, drawn out of hiding, and then used to draw a whole
          nation out of slavery.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Moses black?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible never describes his skin color. He was a Hebrew born in northeast Africa, so he
          would have looked like the people of that region rather than the pale European Moses of
          old paintings. Scripture spends zero time on his appearance and a great deal on his
          character, which tells you what matters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Moses have a stutter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He said he was slow of speech and slow of tongue. Some read that as a speech impediment,
          others as a lack of eloquence or confidence in Egyptian court language. The Bible does not
          settle it. What it does settle is God&apos;s answer: who made your mouth? God sent him
          anyway and gave him Aaron to help.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How is Moses connected to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses gave the Law that showed people their sin. Jesus came to fulfill that Law and deal
          with the sin. Moses led people out of slavery in Egypt; Jesus leads people out of slavery
          to sin. And at the Transfiguration, Moses himself appears standing beside Jesus, which is
          about the clearest link Scripture could draw. <ArticleLink href="/blog/paul">Paul</ArticleLink>{" "}
          spent much of his ministry explaining exactly how those two fit together.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Moses today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God prepares people in private before He uses them in public. That feeling unqualified
          is not the same as being disqualified. That obedience matters more than talent. And that a
          life can look wasted for forty years and still turn out to be the most important life of
          its generation.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses was not perfect.</p>
          <p>He was impulsive. He argued with God. He lost his temper and paid for it.</p>
          <p>But he was faithful, and that turned out to be the thing that mattered.</p>
          <p>
            📌 <strong>The baby drawn out of a river. The shepherd drawn out of obscurity. The man
            who drew a nation out of slavery.</strong>
          </p>
          <p>His life says three things you can hold onto today.</p>
          <p>God prepares in hidden places.</p>
          <p>God calls people who feel unqualified.</p>
          <p>God finishes what He starts, even when you do not get to see the end of it.</p>
          <p>
            If you are in your Midian right now, read Exodus 3 tonight and pay attention to how
            gently God handles a man full of excuses. He handles you the same way. And if you want
            to see that same pattern in someone the world overlooked entirely, read{" "}
            <ArticleLink href="/blog/who-is-leah">Leah&apos;s story</ArticleLink> next.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If the Old Testament feels hard to read on your own, you do not have to figure it out
            alone. Start with a simple plan for{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> and
            take it one day at a time.
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
