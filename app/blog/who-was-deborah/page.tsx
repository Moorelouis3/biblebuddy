import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-deborah", {
  title: "Who Was Deborah in the Bible? The Woman Who Led a Nation to War",
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

export default function WhoWasDeborahPage() {
  return (
    <BlogPostShell
      slug="who-was-deborah"
      title={<>📖 Who Was Deborah in the Bible? The Woman Who Led a Nation to War</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>For twenty straight years, nobody in Israel would fight back.</p>
            <p>A foreign king had crushed them and left them there.</p>
            <p>His army commander had nine hundred chariots made of iron. Israel had none.</p>
            <p>So people kept their heads down. They hoped somebody else would deal with it.</p>
            <p>
              📌 <strong>Nobody did. Until a woman named Deborah stood up and did what every man in
              the nation had been too afraid to do.</strong>
            </p>
            <p>Maybe you know that feeling.</p>
            <p>You are waiting for someone else to fix a mess. A leader. A parent. A coworker. Anyone but you.</p>
            <p>The days keep passing and nothing changes, and you start to wonder if anything ever will.</p>
            <p>That was Israel, year after year, for two whole decades.</p>
            <p>
              This is the full story of Deborah in the Bible, told in order, straight from the book
              of Judges. Who she was. What Israel was suffering under. How she called a hesitant
              general named Barak into battle. What happened when he refused to go without her. And
              how the war actually ended, in the tent of a woman nobody in the story saw coming.
            </p>
            <p>Let&apos;s start with who Deborah actually was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Deborah Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deborah was a prophetess, which means God spoke through her to guide His people.</p>
          <p>
            📌 She was also a judge, and she is the only woman among all the judges of Israel named
            in Scripture.
          </p>
          <p>
            In this period of Israel&apos;s history, before the nation had kings, God raised up
            judges to lead and rescue His people whenever they were in trouble.
          </p>
          <p>Deborah was married to a man named Lapidoth. Scripture tells us his name and nothing else about him.</p>
          <p>She held court under a palm tree between two towns called Ramah and Bethel, up in the hill country of Ephraim.</p>
          <p>
            💡 People walked out to that tree from all over the land just to bring her their
            disputes. She was already trusted with real authority before the war ever started.
          </p>
          <p>Her story is told in Judges chapters 4 and 5. The first chapter tells the events. The second is a song she sang about them.</p>
          <p>Now here is how it actually happened.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Deborah&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Nation Crushed for Twenty Years</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The book of Judges tells the same sad pattern over and over.</p>
          <p>Israel forgets God. God allows an enemy to oppress them. They cry out. God sends a rescuer.</p>
          <p>This time, the enemy was a king named Jabin, and his army commander was a man named Sisera.</p>
        </div>
        <VerseQuote
          text="And the LORD sold them into the hand of Jabin king of Canaan, that reigned in Hazor; the captain of whose host was Sisera, which dwelt in Harosheth of the Gentiles."
          reference="Judges 4:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sisera commanded a terrifying weapon for that era.</p>
        </div>
        <VerseQuote
          text="And the children of Israel cried unto the LORD: for he had nine hundred chariots of iron; and twenty years he mightily oppressed the children of Israel."
          reference="Judges 4:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Nine hundred chariots of iron.</strong> Israel had foot soldiers with basic
            weapons. This was not a fair fight on paper.
          </p>
          <p>And notice that timeline again. Twenty years.</p>
          <p>
            That is not a short season of hardship. That is most of a person&apos;s childhood spent
            under someone else&apos;s boot. If you have ever wondered why God allows suffering to
            drag on this long, this story does not give an easy answer, but it does show that He was
            never absent from it. If that question weighs on you,{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why does God allow suffering
            </ArticleLink>{" "}
            is worth reading slowly.
          </p>
          <p>God did not step in immediately. He let the ache build until the people cried out.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Prophetess Under the Palm Tree</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Into that crushed, waiting nation, Scripture introduces one leader who was already in place.</p>
        </div>
        <VerseQuote
          text="And Deborah, a prophetess, the wife of Lapidoth, she judged Israel at that time."
          reference="Judges 4:4"
        />
        <VerseQuote
          text="And she dwelt under the palm tree of Deborah between Ramah and Bethel in mount Ephraim: and the children of Israel came up to her for judgment."
          reference="Judges 4:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>People had a place to find her, and they already trusted her word.</strong>
          </p>
          <p>
            The tree even carries her name. That tells you she had been doing this work long enough
            for a landmark to be named after her.
          </p>
          <p>
            💡 In a culture where men usually held every position of public authority, Israel came
            to a woman for judgment and nobody in the text acts like that is strange. God had simply
            placed her there.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Command Deborah Gave Barak</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One day, Deborah sent for a man named Barak, from a town called Kedeshnaphtali.</p>
          <p>She did not offer him an idea. She gave him a message straight from God.</p>
        </div>
        <VerseQuote
          text="And she sent and called Barak the son of Abinoam out of Kedeshnaphtali, and said unto him, Hath not the LORD God of Israel commanded, saying, Go and draw toward mount Tabor, and take with thee ten thousand men of the children of Naphtali and of the children of Zebulun?"
          reference="Judges 4:6"
        />
        <VerseQuote
          text="And I will draw unto thee to the river Kishon Sisera, the captain of Jabin's army, with his chariots and his multitude; and I will deliver him into thine hand."
          reference="Judges 4:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ten thousand men, against nine hundred chariots of iron.</strong> Humanly
            speaking, this was still a terrible plan.
          </p>
          <p>
            But notice who was giving the order. Not Deborah&apos;s own strategy. The LORD&apos;s
            command, carried through her.
          </p>
          <p>❓ What would you do with a battle plan that only makes sense if God shows up?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Barak&apos;s Condition</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Barak did not refuse the mission outright. But he set one condition.</p>
        </div>
        <VerseQuote
          text="And Barak said unto her, If thou wilt go with me, then I will go: but if thou wilt not go with me, then I will not go."
          reference="Judges 4:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A trained general, holding a direct word from God, still would not go to war without
            a woman walking beside him.
          </p>
          <p>
            Maybe that was fear. Maybe it was wisdom, wanting the prophetess who heard from God close
            by. Scripture does not spell out his reason. If fear is part of your own story right now,
            you are in good company, and{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>{" "}
            is worth reading alongside this one.
          </p>
          <p>Deborah agreed to go. But she attached a warning of her own.</p>
        </div>
        <VerseQuote
          text="And she said, I will surely go with thee: notwithstanding the journey that thou takest shall not be for thine honour; for the LORD shall sell Sisera into the hand of a woman. And Deborah arose, and went with Barak to Kedesh."
          reference="Judges 4:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Barak would win the battle. He would not get the credit for it.</strong>
          </p>
          <p>
            💡 Barak got his condition met, but the honor still slipped through his fingers because
            of the very condition he set. Be careful what you ask for when the cost is somebody
            else&apos;s glory.
          </p>
          <p>He did not know it yet, but the woman handing him this warning would be proven exactly right.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Battle at Mount Tabor</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Barak gathered his ten thousand men. Sisera gathered his nine hundred chariots.</p>
          <p>When the moment came, Deborah gave the order to move.</p>
        </div>
        <VerseQuote
          text="And Deborah said unto Barak, Up; for this is the day in which the LORD hath delivered Sisera into thine hand: is not the LORD gone out before thee? So Barak went down from mount Tabor, and ten thousand men after him."
          reference="Judges 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Is not the LORD gone out before thee?</strong> She spoke the victory as
            already decided, before a single sword was drawn.
          </p>
          <p>What happened next confirmed it completely.</p>
        </div>
        <VerseQuote
          text="And the LORD discomfited Sisera, and all his chariots, and all his host, with the edge of the sword before Barak; so that Sisera lighted down off his chariot, and fled away on his feet. But Barak pursued after the chariots, and after the host, unto Harosheth of the Gentiles: and all the host of Sisera fell upon the edge of the sword; and there was not a man left."
          reference="Judges 4:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nine hundred chariots of iron, and not one man left standing on Sisera&apos;s side.</p>
          <p>📌 The commander who caused twenty years of terror climbed down and ran away on foot.</p>
          <p>He survived the battle. He would not survive the day.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Tent of Jael</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sisera ran toward a family he believed was friendly toward him, the tent of a woman named Jael.</p>
        </div>
        <VerseQuote
          text="Howbeit Sisera fled away on his feet to the tent of Jael the wife of Heber the Kenite: for there was peace between Jabin the king of Hazor and the house of Heber the Kenite."
          reference="Judges 4:17"
        />
        <VerseQuote
          text="And Jael went out to meet Sisera, and said unto him, Turn in, my lord, turn in to me; fear not. And when he had turned in unto her into the tent, she covered him with a mantle."
          reference="Judges 4:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He asked for water. She gave him more than he asked for.</p>
        </div>
        <VerseQuote
          text="And he said unto her, Give me, I pray thee, a little water to drink; for I am thirsty. And she opened a bottle of milk, and gave him drink, and covered him."
          reference="Judges 4:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He asked her to stand guard and lie for him if anyone came asking. He trusted her completely.</p>
          <p>Exhausted from the battle, he fell asleep. Then Jael made her own decision.</p>
        </div>
        <VerseQuote
          text="Then Jael Heber's wife took a nail of the tent, and took an hammer in her hand, and went softly unto him, and smote the nail into his temples, and fastened it into the ground: for he was fast asleep and weary. So he died."
          reference="Judges 4:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The man who ran from an army did not survive a tent peg in the hand of one
            woman.</strong>
          </p>
          <p>
            When Barak finally arrived chasing Sisera, Jael met him and showed him the body. Deborah&apos;s
            words came true to the letter. The LORD sold Sisera into the hand of a woman, and the
            general who wanted a woman beside him watched another woman finish what he could not.
          </p>
          <p>
            💡 Not every woman in Scripture used her strength this way. Compare this to{" "}
            <ArticleLink href="/blog/who-is-jezebel">Jezebel</ArticleLink>, a queen who had far more
            power than Jael ever held and spent it pulling a whole nation away from God instead of
            toward Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The Song of Deborah</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After the victory, Deborah and Barak sang a song. All of Judges chapter 5 is the words to it.</p>
          <p>One line stands out above the rest, describing exactly what those twenty years had been like.</p>
        </div>
        <VerseQuote
          text="In the days of Shamgar the son of Anath, in the days of Jael, the highways were unoccupied, and the travellers walked through byways. The inhabitants of the villages ceased, they ceased in Israel, until that I Deborah arose, that I arose a mother in Israel."
          reference="Judges 5:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Before her, the roads were too dangerous to travel and the villages were
            emptying out. Then she arose, and she calls herself a mother in Israel.</strong>
          </p>
          <p>
            💡 Not a queen. Not a general. A mother. She took responsibility for a whole nation the
            way a mother takes responsibility for a household nobody else will run.
          </p>
          <p>
            The song goes on to celebrate the tribes who showed up and to name the ones who stayed
            home. Then it ends with a plain, hopeful line: the land had rest for forty years. After
            twenty years of terror, two full generations finally got to live in peace.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Deborah&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. When nobody else will lead, someone still has to</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Twenty years passed with no one stepping forward.</p>
          <p>Deborah did not wait for a more qualified man to appear.</p>
          <p>📌 If you are waiting for someone else to finally act, you may be the someone you are waiting for.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. God is not limited by who a culture expects to lead</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Israel&apos;s culture, like most in that era, expected men to hold public authority.</p>
          <p>God placed a woman under a palm tree and let a whole nation walk out to hear her anyway.</p>
          <p>💡 God chooses whoever will actually obey Him. Everything else is secondary to that.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Needing support is not the same thing as lacking courage</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Barak still led ten thousand men into battle. He still charged down that mountain.</p>
          <p>He simply would not do it without someone steady beside him.</p>
          <p>❓ Is there a battle in your life you keep avoiding because you feel like you have to face it completely alone?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Obedience does not always come with the credit attached</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Barak won the battle God assigned him. The story remembers Jael and Deborah far more.</p>
          <p>⚠️ Chasing the glory and chasing the obedience are two different pursuits, and only one of them actually matters to God.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Faith can sound like certainty before the outcome is visible</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deborah told Barak the LORD had already delivered Sisera, before the armies ever met.</p>
          <p>✅ She spoke like the battle was already finished, because in God&apos;s plan it already was.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses From Deborah&apos;s Story
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Judges 4:4 and 5</h3>
        <VerseQuote
          text="And Deborah, a prophetess, the wife of Lapidoth, she judged Israel at that time. And she dwelt under the palm tree of Deborah between Ramah and Bethel in mount Ephraim: and the children of Israel came up to her for judgment."
          reference="Judges 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two short verses that introduce one of the most respected leaders in the whole book of Judges.</p>
          <p>📌 A prophetess, a judge, and a place people already trusted enough to travel to.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Judges 4:9</h3>
        <VerseQuote
          text="And she said, I will surely go with thee: notwithstanding the journey that thou takest shall not be for thine honour; for the LORD shall sell Sisera into the hand of a woman. And Deborah arose, and went with Barak to Kedesh."
          reference="Judges 4:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A prophecy spoken before the war even began, and it came true exactly as she said.</p>
          <p>💡 God can tell you the ending before you have lived a single day of the story.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Judges 4:14</h3>
        <VerseQuote
          text="And Deborah said unto Barak, Up; for this is the day in which the LORD hath delivered Sisera into thine hand: is not the LORD gone out before thee? So Barak went down from mount Tabor, and ten thousand men after him."
          reference="Judges 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the tense. Hath delivered. Not will deliver.</p>
          <p>✅ She called the victory finished before a single arrow flew, and it was.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Judges 5:7</h3>
        <VerseQuote
          text="The inhabitants of the villages ceased, they ceased in Israel, until that I Deborah arose, that I arose a mother in Israel."
          reference="Judges 5:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deborah names herself here, in her own song, in her own words.</p>
          <p>📌 Not a title anyone gave her. A description of what she actually did for her people.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Judges 5:31</h3>
        <VerseQuote
          text="So let all thine enemies perish, O LORD: but let them that love him be as the sun when he goeth forth in his might. And the land had rest forty years."
          reference="Judges 5:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The song ends looking forward, not backward.</p>
          <p>✅ Forty years of rest, after twenty years of terror. That is what one woman&apos;s obedience helped bring an entire nation.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deborah
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Deborah a real judge of Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Judges 4:4 states plainly that she judged Israel at that time. She held that role
          before the war with Jabin and Sisera ever began, meeting with people under a palm tree to
          settle their disputes. Her leadership was already established when the crisis hit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Deborah was a prophetess?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A prophetess is a woman through whom God speaks. When Deborah told Barak that the LORD had
          commanded him to gather an army, she was passing along a message she believed came directly
          from God, not offering her own opinion or strategy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Barak need Deborah to go with him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never states his reason outright. It simply records his condition. If thou wilt
          go with me, then I will go. He may have wanted the presence of the prophetess who carried
          God&apos;s word, or he may have needed the courage her presence gave him. Either way, he
          would not go to war without her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Jael and what did she do?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jael was the wife of Heber the Kenite. When Sisera fled the battle on foot, he ran to her
          tent believing her family was friendly to his king. She welcomed him, gave him milk, and
          let him fall asleep. While he slept, she drove a tent peg through his temple, fulfilling
          Deborah&apos;s prophecy that Sisera would fall into the hand of a woman.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Deborah the only female judge in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Among the judges named by title in the book of Judges, yes. She is the only woman listed
          among them. Other women in Scripture led, prophesied, or delivered God&apos;s people in
          different ways, but Deborah is the one Scripture specifically calls a judge.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Deborah sit under a palm tree?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judges 4:5 says she dwelt under a palm tree between Ramah and Bethel, and people came to
          her there for judgment. It seems to have simply been her established place of work, well
          enough known that the tree itself came to carry her name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Deborah&apos;s husband, Lapidoth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture tells us his name and nothing more. He never appears again in the story. Deborah
          is introduced and remembered entirely by her own role as prophetess and judge, not by
          anything her husband did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How many years did Israel suffer under Jabin and Sisera?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Twenty years, according to Judges 4:3. Sisera&apos;s nine hundred iron chariots kept
          Israel oppressed that entire time, until Deborah and Barak led the army that finally broke
          his power.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Song of Deborah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the victory song recorded in all of Judges chapter 5, sung by Deborah and Barak after
          the battle. It celebrates the LORD&apos;s deliverance, honors the tribes who joined the
          fight, and calls out the ones who stayed home. Many scholars consider it one of the oldest
          pieces of poetry in the entire Bible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What can we learn from Deborah&apos;s leadership today?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God raises up whoever will actually obey Him, regardless of what a culture expects.
          That courage and needing support can exist in the same person. And that faithfulness often
          matters more to God than who ends up getting the credit for it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deborah did not wait twenty years for a man to be brave enough.</p>
          <p>She was already leading before the war started, and she kept leading when it came.</p>
          <p>
            📌 <strong>God placed her exactly where she was needed, and she simply did the next
            right thing in front of her.</strong>
          </p>
          <p>
            📌 <strong>Barak needed her courage, and Jael finished what Deborah had already
            prophesied.</strong>
          </p>
          <p>Neither woman waited for permission to matter.</p>
          <p>
            If you feel like you are waiting on someone else to finally lead, or finally fix what
            keeps hurting, ask yourself what Deborah asked herself. Not who else could do this, but
            what she was actually being asked to do right now.
          </p>
          <p>
            Read Judges 4 and 5 for yourself this week. You will not walk away the same way you
            walked in. Like{" "}
            <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>, another woman Scripture almost
            overlooks at first glance, Deborah shows what God can do through someone nobody expected
            to carry a nation.
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
          description="Deborah's courage is one story among many. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
