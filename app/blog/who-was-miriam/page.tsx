import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-miriam", {
  title: "Who Was Miriam in the Bible? The Sister Who Saved Moses",
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

export default function WhoWasMiriamPage() {
  return (
    <BlogPostShell
      slug="who-was-miriam"
      title={<>📖 Who Was Miriam in the Bible? The Sister Who Saved Moses</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A little girl crouched in the tall reeds by a river.</p>
            <p>She was watching a basket floating in the water.</p>
            <p>Inside that basket was her baby brother.</p>
            <p>One wrong move from her, and he could have died that morning.</p>
            <p>
              📌 <strong>That same girl grew up to become a prophetess, a worship leader, and one
              of the three people God used to lead an entire nation out of slavery.</strong>
            </p>
            <p>Her name was Miriam.</p>
            <p>Most people know her, if they know her at all, for one bad moment near the end of her life.</p>
            <p>That is not fair to her, and it is not the whole story either.</p>
            <p>
              Maybe you know what it feels like to serve faithfully for years and then have one bad
              day define how people remember you.
            </p>
            <p>One sharp word said out loud. One moment of pride you cannot take back.</p>
            <p>
              ❓ Can a person spend decades serving God and still stumble badly near the end of the
              road?
            </p>
            <p>Miriam&apos;s life says yes.</p>
            <p>
              This is the full story of Miriam in the Bible, told in order, straight from Scripture.
              The baby in the basket. The bold offer to a princess. The song she led on the far side
              of the sea. The bitter words she spoke against her own brother. What happened to her
              body the moment she spoke them. And what it means that God still called her, along
              with Moses and Aaron, one of the leaders He sent to rescue His people.
            </p>
            <p>Let us start where her story starts, beside a river in Egypt.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Miriam Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam was the oldest child of Amram and Jochebed, a Hebrew couple living in Egypt.</p>
          <p>
            Her younger brother was Aaron, and her youngest brother was{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink>, the man God later used to confront
            Pharaoh and lead Israel out of Egypt.
          </p>
          <p>
            📌 Exodus 15:20 gives her a title most people miss: <strong>the prophetess</strong>. She
            is one of only a handful of women in the whole Bible given that exact word.
          </p>
          <p>Her story is not told in one neat block. It is scattered across four chapters, years apart.</p>
          <p>
            📌 Her life shows up in <strong>Exodus 2</strong> as a child, in{" "}
            <strong>Exodus 15</strong> as a grown worship leader, and in{" "}
            <strong>Numbers 12 and 20</strong> near the end of her life.
          </p>
          <p>
            The family itself belonged to the tribe of Levi, the tribe descended from Leah&apos;s
            third son. If you want to see where that family line began, read the story of{" "}
            <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>, generations earlier.
          </p>
          <p>
            Miriam lived through slavery, through the exodus, and through decades of wandering in
            the desert. She never entered the promised land. She died before Israel got there.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Miriam&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Baby Hidden in the Nile</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam&apos;s story starts during a terrifying time to be born a Hebrew baby boy.</p>
          <p>
            Pharaoh, the king of Egypt, had ordered that every Hebrew baby boy be thrown into the
            river and killed. He was afraid the Hebrew people were growing too strong.
          </p>
          <p>
            Miriam&apos;s mother, Jochebed, hid her newborn son for three months. When she could not
            hide him any longer, she made a small boat out of reeds, called bulrushes, and set it
            among the reeds at the edge of the river.
          </p>
        </div>
        <VerseQuote
          text="And when she could not longer hide him, she took for him an ark of bulrushes, and daubed it with slime and with pitch, and put the child therein; and she laid it in the flags by the river’s brink. And his sister stood afar off, to wit what would be done to him."
          reference="Exodus 2:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That sister was Miriam.</strong> Scripture does not tell us her exact age, but
            she was old enough to be trusted with watching her baby brother alone, near a river, in
            a country that wanted him dead.
          </p>
          <p>Picture that assignment for a moment.</p>
          <p>
            ⚠️ One wrong move, one panic, one moment of running to get help too late, and the story
            could have ended right there in the reeds.
          </p>
          <p>Miriam did not run. She stayed close and she watched.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Bold Sister Steps Forward</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pharaoh&apos;s own daughter came down to the river to bathe. Her maids walked along the
            bank with her.
          </p>
        </div>
        <VerseQuote
          text="And the daughter of Pharaoh came down to wash herself at the river; and her maidens walked along by the river’s side; and when she saw the ark among the flags, she sent her maid to fetch it."
          reference="Exodus 2:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>She opened the basket and saw the baby crying. The text says she had compassion on him.</p>
          <p>
            This was the daughter of the very man who had ordered Hebrew babies killed, and she was
            looking straight at one.
          </p>
          <p>That is the moment Miriam moved.</p>
        </div>
        <VerseQuote
          text="Then said his sister to Pharaoh’s daughter, Shall I go and call to thee a nurse of the Hebrew women, that she may nurse the child for thee? And Pharaoh’s daughter said to her, Go. And the maid went and called the child’s mother."
          reference="Exodus 2:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A young Hebrew girl walked up to an Egyptian princess and offered a plan on
            the spot.</strong>
          </p>
          <p>She did not know how the princess would react. She spoke up anyway.</p>
          <p>
            💡 Watch how quick her thinking was. She did not just offer any nurse. She went straight
            home and brought back the baby&apos;s own mother.
          </p>
          <p>
            Because of Miriam&apos;s courage, Jochebed was paid wages to nurse her own son, and Moses
            grew up knowing his real family before he ever moved into Pharaoh&apos;s house.
          </p>
          <p>
            ✅ One brave sentence from a child changed the entire course of Israel&apos;s history.
            The man who would confront Pharaoh and lead the exodus was alive because his sister spoke
            up at the right moment.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Prophetess Leads Israel in Song</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jump forward many years. Miriam is no longer a child watching from the reeds.</p>
          <p>
            God has just parted the Red Sea. Israel has walked through on dry ground, and Pharaoh&apos;s
            army has been drowned behind them. Moses has just led the people in a long song of
            praise to God.
          </p>
          <p>Then Miriam steps forward.</p>
        </div>
        <VerseQuote
          text="And Miriam the prophetess, the sister of Aaron, took a timbrel in her hand; and all the women went out after her with timbrels and with dances. And Miriam answered them, Sing ye to the LORD, for he hath triumphed gloriously; the horse and his rider hath he thrown into the sea."
          reference="Exodus 15:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time in the whole Bible that any woman is called a
            prophetess.</strong>
          </p>
          <p>
            A timbrel was a small handheld drum, similar to a tambourine. Miriam picked one up, and
            all the women of Israel followed her, playing timbrels and dancing.
          </p>
          <p>She was not standing quietly at the edge of the celebration. She was leading it.</p>
          <p>
            💡 Notice that her song echoes the same line Moses had just sung: the horse and his rider
            hath he thrown into the sea. She was not competing with her brother&apos;s worship. She
            was carrying it forward, to a whole group Moses had not directly led in song.
          </p>
          <p>
            This is Miriam at her best. Bold as a child by the river. Bold as a grown woman leading a
            nation in worship.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Miriam and Aaron Turn Against Moses</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years pass again. The story picks back up in Numbers 12, and the tone changes
            completely.
          </p>
          <p>Miriam and Aaron begin speaking against their younger brother Moses.</p>
        </div>
        <VerseQuote
          text="And Miriam and Aaron spake against Moses because of the Ethiopian woman whom he had married: for he had married an Ethiopian woman. And they said, Hath the LORD indeed spoken only by Moses? hath he not spoken also by us? And the LORD heard it."
          reference="Numbers 12:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the two complaints packed into that one moment.</p>
          <p>The first complaint is about Moses&apos;s wife, a woman from a different background.</p>
          <p>
            ❓ But read the very next sentence. Was the real problem actually about the marriage, or
            about something else entirely?
          </p>
          <p>
            <strong>Hath the LORD indeed spoken only by Moses? hath he not spoken also by us?</strong>
          </p>
          <p>
            ⚠️ <strong>The complaint about the marriage was cover. The real issue was authority.</strong>{" "}
            Miriam and Aaron wanted equal standing with Moses, and they resented that God had set him
            apart in a unique way.
          </p>
          <p>
            The last sentence in that verse is easy to skip past, and it should not be. And the LORD
            heard it.
          </p>
          <p>He was listening the entire time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God&apos;s Sudden Rebuke</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God did not wait long to respond.</p>
        </div>
        <VerseQuote
          text="And the LORD spake suddenly unto Moses, and unto Aaron, and unto Miriam, Come out ye three unto the tabernacle of the congregation. And they three came out."
          reference="Numbers 12:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Suddenly.</strong> No warning. No time to rehearse an excuse.
          </p>
          <p>
            God came down in a pillar of cloud and called Aaron and Miriam forward. He reminded them
            that with other prophets He spoke in visions and dreams, but with Moses He spoke face to
            face, plainly, not in riddles.
          </p>
          <p>
            Then He asked them a direct question. Why were you not afraid to speak against my servant
            Moses?
          </p>
          <p>The cloud lifted. And something had changed.</p>
        </div>
        <VerseQuote
          text="And the cloud departed from off the tabernacle; and, behold, Miriam became leprous, white as snow: and Aaron looked upon Miriam, and, behold, she was leprous."
          reference="Numbers 12:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Miriam, and only Miriam, was struck with a skin disease that made her white
            as snow.</strong>
          </p>
          <p>
            Scripture does not fully explain why she alone bore this consequence while Aaron did not.
            Many readers over the years have guessed that Miriam started the complaint, since her
            name is listed first in Numbers 12:1. Scripture itself never states that reason directly,
            so it is worth saying plainly rather than repeating it as settled fact.
          </p>
          <p>What is certain is what the text actually says. Her sin against her brother reached God&apos;s ears, and it cost her.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Aaron&apos;s Plea and Moses&apos;s Prayer</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Aaron turned to Moses immediately.</p>
        </div>
        <VerseQuote
          text="And Aaron said unto Moses, Alas, my lord, I beseech thee, lay not the sin upon us, wherein we have done foolishly, and wherein we have sinned."
          reference="Numbers 12:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Aaron does not defend himself here. He calls it foolishness and sin, plainly, with no
            excuse attached.
          </p>
          <p>Then Moses did something remarkable. He prayed for the very sister who had just spoken against him.</p>
        </div>
        <VerseQuote text="And Moses cried unto the LORD, saying, Heal her now, O God, I beseech thee." reference="Numbers 12:13" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Six words in the original prayer, and no bitterness in any of them.</strong>
          </p>
          <p>
            Miriam had just attacked his authority in front of everyone. Moses did not gloat over the
            judgment or let her suffer to make a point. He cried out for her healing immediately.
          </p>
          <p>
            ✅ That is what a forgiving heart looks like when it is tested in real time, not just
            talked about.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Seven Days Outside the Camp, and Her Death at Kadesh
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God answered Moses&apos;s prayer, but there was still a consequence to walk through.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, If her father had but spit in her face, should she not be ashamed seven days? let her be shut out from the camp seven days, and after that let her be received in again. And Miriam was shut out from the camp seven days: and the people journeyed not till Miriam was brought in again."
          reference="Numbers 12:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Miriam spent seven days shut out of the camp, in shame, before she was
            restored.</strong>
          </p>
          <p>
            📌 Notice one more detail most people miss. The people journeyed not till Miriam was
            brought in again. An entire nation of millions waited seven days because of what happened
            to one woman. That is how much her position mattered.
          </p>
          <p>
            And notice the ending too. She was received back in. She was not left outside forever.
            The story does not end with her disgrace.
          </p>
          <p>
            Miriam&apos;s story is recorded far more sparsely from this point on. Years later, near
            the very end of the wilderness years, Scripture gives us one short, quiet sentence about
            her.
          </p>
        </div>
        <VerseQuote
          text="Then came the children of Israel, even the whole congregation, into the desert of Zin in the first month: and the people abode in Kadesh; and Miriam died there, and was buried there."
          reference="Numbers 20:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>No drama. No long tribute. Just a place, a death, and a burial.</p>
          <p>
            But that is not the last word Scripture gives about her. Long after her death, the
            prophet Micah looked back and reminded Israel exactly who God had sent to lead them out
            of Egypt.
          </p>
        </div>
        <VerseQuote
          text="For I brought thee up out of the land of Egypt, and redeemed thee out of the house of servants; and I sent before thee Moses, Aaron, and Miriam."
          reference="Micah 6:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three names, side by side. Not two leaders and a sister. Three leaders God
            sent.</strong>
          </p>
          <p>
            One bitter chapter in Numbers 12 did not erase that. God still counted her among the
            three He used to rescue His people.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Miriam&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God can use you before anyone thinks you are ready</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam was a child when she saved her brother&apos;s life.</p>
          <p>Nobody handed her a title first. She simply acted with courage when it counted.</p>
          <p>📌 You do not need permission to be brave in the moment God gives you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Years of faithful service do not make you immune to sin</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>By Numbers 12, Miriam had led worship for a whole nation.</p>
          <p>She still spoke words that God took seriously enough to strike her body over.</p>
          <p>⚠️ Long service to God is not a shield against pride. It can quietly become the ground pride grows in.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Jealousy over someone else&apos;s calling is a real danger</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Be honest about what actually happened in Numbers 12.</p>
          <p>The complaint about Moses&apos;s wife was the surface issue. The real wound was resentment over Moses&apos;s unique place with God.</p>
          <p>
            That pattern shows up more than once in Scripture. Long before Miriam, a whole family of
            brothers let jealousy over a favored sibling&apos;s calling turn into betrayal, as{" "}
            <ArticleLink href="/blog/who-was-joseph">Joseph&apos;s story</ArticleLink> shows in
            painful detail.
          </p>
          <p>
            ⚠️ <strong>Watching someone else get a calling, a gift, or an honor you wanted can turn
            bitter fast if you let it sit unspoken.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Words against God&apos;s chosen leaders are not a small thing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam and Aaron did not hit Moses or plot to remove him.</p>
          <p>They only spoke against him. God still called it out directly and suddenly.</p>
          <p>💡 What you say about someone in leadership, even quietly, is not neutral to God.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Discipline is not the end of the story</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam spent seven hard days outside the camp.</p>
          <p>Then she was brought back in, and Micah later still names her as one of Israel&apos;s three leaders.</p>
          <p>✅ God&apos;s correction is meant to restore you, not to define you forever.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses From Miriam&apos;s Story
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 15:20 and 21</h3>
        <VerseQuote
          text="And Miriam the prophetess, the sister of Aaron, took a timbrel in her hand; and all the women went out after her with timbrels and with dances. And Miriam answered them, Sing ye to the LORD, for he hath triumphed gloriously; the horse and his rider hath he thrown into the sea."
          reference="Exodus 15:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam at her strongest. A worship leader in front of an entire nation.</p>
          <p>📌 The first woman in the Bible ever called a prophetess.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 12:2</h3>
        <VerseQuote
          text="And they said, Hath the LORD indeed spoken only by Moses? hath he not spoken also by us? And the LORD heard it."
          reference="Numbers 12:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The real complaint, said out loud, underneath the surface issue.</p>
          <p>💡 God hears the words you say about other people, even when you think no one is listening.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 12:10</h3>
        <VerseQuote
          text="And the cloud departed from off the tabernacle; and, behold, Miriam became leprous, white as snow: and Aaron looked upon Miriam, and, behold, she was leprous."
          reference="Numbers 12:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A sudden, visible consequence, right in front of her own brother.</p>
          <p>⚠️ Sin against another person rarely stays private in its results.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 12:13</h3>
        <VerseQuote text="And Moses cried unto the LORD, saying, Heal her now, O God, I beseech thee." reference="Numbers 12:13" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One of the shortest, most urgent prayers in the whole Bible.</p>
          <p>✅ Forgiveness that shows up in action, not just in a feeling, right when it is tested.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Micah 6:4</h3>
        <VerseQuote
          text="For I brought thee up out of the land of Egypt, and redeemed thee out of the house of servants; and I sent before thee Moses, Aaron, and Miriam."
          reference="Micah 6:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Written long after Miriam&apos;s death, and long after her worst chapter.</p>
          <p>📌 God still names her as one of the three He sent to lead His people out.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Miriam
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Miriam a prophetess?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Exodus 15:20 calls her the prophetess directly, making her one of the first women in
          the Bible given that title. She led the women of Israel in worship after the Red Sea
          crossing, playing a timbrel and singing a song that echoed the one Moses had just sung.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did God punish Miriam and not Aaron the same way?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never explains this directly. Both Miriam and Aaron spoke against Moses, and both
          were called out by God in Numbers 12, but only Miriam became leprous. Many readers point
          out that her name comes first in Numbers 12:1, which may suggest she led the complaint, but
          the Bible itself does not state that as the reason, so it is best held as a guess rather
          than a fact.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Miriam&apos;s role in the exodus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          As a young girl, she watched over baby Moses and arranged for their own mother to nurse
          him, keeping him alive and connected to his family. As an adult, she was recognized as a
          prophetess and led the women of Israel in worship right after God parted the Red Sea.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Miriam die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 20:1 simply says she died at Kadesh, in the desert of Zin, and was buried there.
          Scripture gives no other detail about her death, unlike the more detailed accounts given
          for some other Bible figures.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Miriam older than Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Miriam was the oldest of the three siblings, older than both Aaron and Moses. That is
          why she was old enough to be trusted watching over the baby Moses at the river while her
          parents kept their distance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Miriam mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scholars debate the exact meaning, with suggestions ranging from bitter to beloved to
          rebellion. No single meaning is certain. What we know clearly about her comes from her
          actions in Scripture, not from her name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Miriam and Aaron speak against Moses?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          On the surface, they criticized his marriage to an Ethiopian woman. But their very next
          words asked whether the LORD had spoken only through Moses, revealing the deeper issue was
          resentment over his unique authority as God&apos;s chosen leader.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a timbrel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A timbrel was a small handheld drum, similar to a modern tambourine. Miriam and the women of
          Israel played timbrels and danced while singing praise to God after crossing the Red Sea.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Miriam ever lead Israel again after her leprosy?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not describe another moment of public leadership for her after Numbers 12.
          She was restored to the camp after seven days, and her story continues quietly until her
          death is recorded in Numbers 20. Micah 6:4 later still names her alongside Moses and Aaron
          as one of Israel&apos;s three leaders.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Miriam&apos;s life?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That courage can start young, that faithful service for years does not make anyone immune
          to pride or jealousy, and that God&apos;s discipline is meant to restore a person, not to
          throw them away. Miriam&apos;s worst chapter did not become God&apos;s final word about her.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Miriam&apos;s life will not fit into one simple label.</p>
          <p>She was brave enough as a child to save her brother&apos;s life.</p>
          <p>She was faithful enough as an adult to lead a nation in worship.</p>
          <p>And she was human enough to let jealousy turn into words she could not take back.</p>
          <p>
            📌 <strong>God still called her, right alongside Moses and Aaron, one of the leaders He
            sent to rescue His people.</strong>
          </p>
          <p>
            📌 <strong>Her discipline was real, and so was her restoration.</strong>
          </p>
          <p>If you have served God faithfully for years and still feel the pull of pride or resentment, you are not alone, and you are not disqualified.</p>
          <p>
            Read Numbers 12 for yourself tonight and watch how quickly God moves, both in correction
            and in mercy. If reading it straight through feels hard to follow, start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> first.
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
          description="Miriam's courage, worship, and one bitter mistake are part of a bigger story. This 21 day study walks through the women whose lives shaped Scripture and what their stories mean for you."
        />
      </section>
    </BlogPostShell>
  );
}
