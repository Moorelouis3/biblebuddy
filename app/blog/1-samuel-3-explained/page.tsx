import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-3-explained", {
  title: "1 Samuel 3 Explained: The Call of Samuel, Judgment on Eli",
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

export default function OneSamuelThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-3-explained"
      title={<>📖 1 Samuel 3 Explained: The Call of Samuel, Judgment on Eli</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A boy is asleep near the ark when he hears his name spoken out loud.</p>
            <p>He gets up and runs to the one person he assumes called him. Three times.</p>
            <p>
              <strong>1 Samuel 3 explained</strong> is the night God speaks directly to Samuel for
              the first time, in a house where, the chapter says plainly, that almost never
              happened anymore. An old priest with failing eyes cannot recognize the voice of God
              even from the next room. A child who has never heard that voice before mistakes it
              for the only other voice he knows.
            </p>
            <p>Maybe you have wondered whether God still speaks that clearly to anyone.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why was the word of the LORD so rare at this point in Israel&apos;s history?</li>
            <li>❓ Why did Samuel run to Eli three times instead of recognizing God&apos;s voice?</li>
            <li>❓ Does verse 14 mean Eli&apos;s family could never be forgiven?</li>
            <li>❓ Why does Eli respond so calmly to the worst news he will ever hear?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not go around Eli to reach Samuel. He goes around Eli because
              Eli already knows what is coming, and the message now needs a messenger willing to
              say it out loud.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the rare word of the
              LORD, the four calls in the night, the message Samuel is given, the morning he has
              to deliver it, and the moment all Israel starts calling him a prophet.
            </p>
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
            <ArticleLink href="/blog/1-samuel-2-explained">1 Samuel 2</ArticleLink> ended with an
            unnamed man of God standing in front of Eli, laying out exactly how his family&apos;s
            priesthood would end. Both of his sons would die on the same day. His line would lose
            the priesthood for good. A faithful priest would eventually replace them.
          </p>
          <p>
            Eli heard all of that already, by the time this chapter opens. What he has not yet
            heard is it confirmed a second time, this time through the boy his own family is
            raising at Shiloh. 1 Samuel 3 explained is that second confirmation, and the beginning
            of Samuel&apos;s own work as a prophet, which starts the very night he learns to
            recognize God&apos;s voice.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Rare Word in a Dark House (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by telling you exactly how unusual what is about to happen really is.</p>
        </div>
        <VerseQuote
          text="And the child Samuel ministered unto the LORD before Eli. And the word of the LORD was precious in those days; there was no open vision."
          reference="1 Samuel 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Precious&quot; here means scarce, not treasured.</strong> God speaking
            directly to someone was rare in Israel at this point. Given what{" "}
            <ArticleLink href="/blog/1-samuel-2-explained">1 Samuel 2</ArticleLink> already showed
            about the priesthood at Shiloh, that scarcity is not a coincidence. A corrupt
            priesthood and a silent God tend to show up in the same chapter.
          </p>
          <p>Then the scene narrows to one house, one night, two people in the dark.</p>
        </div>
        <VerseQuote
          text="And it came to pass at that time, when Eli was laid down in his place, and his eyes began to wax dim, that he could not see;"
          reference="1 Samuel 3:2"
        />
        <VerseQuote
          text="And ere the lamp of God went out in the temple of the LORD, where the ark of God was, and Samuel was laid down to sleep;"
          reference="1 Samuel 3:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The lamp of God burned through the night in the tabernacle, so &quot;ere the lamp
            went out&quot; places this scene in the deep hours before dawn, not full darkness.
            Eli&apos;s failing eyesight is a plain physical detail, but it sits right next to a
            house where almost nobody has heard God&apos;s voice in years. The old priest cannot
            see well. The whole nation, in a different sense, cannot see well either.
          </p>
          <p>
            Samuel is sleeping close enough to the ark that the text bothers to say so. A child too
            young for full priestly duties is lying down a few feet from the one object in all of
            Israel that represented God&apos;s own presence among His people.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Three Times Mistaken for Eli (verses 4 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Into that quiet house, a voice speaks a name.</p>
        </div>
        <VerseQuote
          text="That the LORD called Samuel: and he answered, Here am I."
          reference="1 Samuel 3:4"
        />
        <VerseQuote
          text="And he ran unto Eli, and said, Here am I; for thou calledst me. And he said, I called not; lie down again. And he went and lay down."
          reference="1 Samuel 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Samuel answers immediately, with the right words, aimed at the wrong
            person.</strong> &quot;Here am I&quot; is the same answer Abraham gave when God called
            his name twice at Mount Moriah, and the same answer Moses gave at the burning bush.
            Samuel already has the posture of a servant ready to listen. He just does not yet know
            who is actually speaking.
          </p>
          <VerseQuote
            text="And the angel of the LORD called unto him out of heaven, and said, Abraham, Abraham: and he said, Here am I."
            reference="Genesis 22:11"
          />
          <p>
            It happens again, almost word for word.
          </p>
        </div>
        <VerseQuote
          text="And the LORD called yet again, Samuel. And Samuel arose and went to Eli, and said, Here am I; for thou didst call me. And he answered, I called not, my son; lie down again."
          reference="1 Samuel 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The narrator stops the action to explain why, in case any reader assumes Samuel is being slow or foolish.</p>
        </div>
        <VerseQuote
          text="Now Samuel did not yet know the LORD, neither was the word of the LORD yet revealed unto him."
          reference="1 Samuel 3:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Samuel grew up serving at the tabernacle. He wore a linen ephod. He slept near the
            ark. None of that, by itself, meant he actually knew the LORD in the sense this verse
            means. Growing up around holy things is not the same as personally hearing God speak.
            Serving in a religious place his whole childhood still did not prepare Samuel to
            recognize this voice on the first try.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Fourth Call, and an Answer Missing One Word (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Twice was easy to dismiss. A third time is harder to ignore.</p>
        </div>
        <VerseQuote
          text="And the LORD called Samuel again the third time. And he arose and went to Eli, and said, Here am I; for thou didst call me. And Eli perceived that the LORD had called the child."
          reference="1 Samuel 3:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Eli figures this out on the third call, not the first.</strong> The man who
            spends his whole life around the ark and the lamp of God is slower to recognize God
            speaking than the child who has never heard it once before. His instructions, once he
            does understand, are specific.
          </p>
        </div>
        <VerseQuote
          text="Therefore Eli said unto Samuel, Go, lie down: and it shall be, if he call thee, that thou shalt say, Speak, LORD; for thy servant heareth. So Samuel went and lay down in his place."
          reference="1 Samuel 3:9"
        />
        <VerseQuote
          text="And the LORD came, and stood, and called as at other times, Samuel, Samuel. Then Samuel answered, Speak; for thy servant heareth."
          reference="1 Samuel 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Look closely at the two answers.</strong> Eli told Samuel to say &quot;Speak,
            LORD; for thy servant heareth.&quot; Samuel actually says &quot;Speak; for thy servant
            heareth,&quot; leaving out the name LORD entirely. The text does not explain why, and
            reading too much into one missing word goes further than it should. What is certain is
            that Samuel is listening carefully enough, and respectfully enough, that whatever
            happens next, it is clearly God doing the talking and Samuel doing the listening.
          </p>
          <p>
            &quot;The LORD came, and stood&quot; is also worth slowing down on. This is not a
            distant voice drifting through a window. The text describes God taking a position in
            the room, the same way He appeared to people elsewhere in the Old Testament, close
            enough that &quot;stood&quot; is the right word to use.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Message: Judgment Confirmed, Not Changed (verses 11 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once Samuel finally answers correctly, God does not waste the moment on anything gentle.</p>
        </div>
        <VerseQuote
          text="And the LORD said to Samuel, Behold, I will do a thing in Israel, at which both the ears of every one that heareth it shall tingle."
          reference="1 Samuel 3:11"
        />
        <VerseQuote
          text="In that day I will perform against Eli all things which I have spoken concerning his house: when I begin, I will also make an end."
          reference="1 Samuel 3:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a new judgment. It is the same one from the man of God in{" "}
            <ArticleLink href="/blog/1-samuel-2-explained">1 Samuel 2</ArticleLink>, repeated and
            sealed through a second messenger.</strong> &quot;When I begin, I will also make an
            end&quot; promises that this judgment will not stall out halfway, the way Eli&apos;s own
            discipline of his sons once did.
          </p>
          <p>The reason for the judgment gets restated plainly, with one detail added that did not appear in chapter 2.</p>
        </div>
        <VerseQuote
          text="For I have told him that I will judge his house for ever for the iniquity which he knoweth; because his sons made themselves vile, and he restrained them not."
          reference="1 Samuel 3:13"
        />
        <VerseQuote
          text="And therefore I have sworn unto the house of Eli, that the iniquity of Eli's house shall not be purged with sacrifice nor offering for ever."
          reference="1 Samuel 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;He restrained them not&quot; names Eli&apos;s own failure specifically.</strong>{" "}
            Not that he never said anything. 1 Samuel 2 already showed him rebuking his sons in
            words. The failure is that a rebuke was the only thing he ever did, when he had the
            authority as their father and their priest to actually remove them from service.
          </p>
          <p>
            Verse 14 adds something new: this sin cannot be purged by sacrifice or offering, which
            is striking in a chapter about priests whose entire job was offering sacrifices.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Morning Comes, and Samuel Has to Speak (verses 15 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The vision ends, but the hardest part of Samuel&apos;s night is still ahead of him.</p>
        </div>
        <VerseQuote
          text="And Samuel lay until the morning, and opened the doors of the house of the LORD. And Samuel feared to shew Eli the vision."
          reference="1 Samuel 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Samuel gets up and does his ordinary job, opening the tabernacle doors,
            while carrying a message that could end the only family he has ever known.</strong> Fear
            does not stop him from working. It stops him from speaking, at least until Eli makes
            him.
          </p>
        </div>
        <VerseQuote
          text="Then Eli called Samuel, and said, Samuel, my son. And he answered, Here am I."
          reference="1 Samuel 3:16"
        />
        <VerseQuote
          text="And he said, What is the thing that the LORD hath said unto thee? I pray thee hide it not from me: God do so to thee, and more also, if thou hide any thing from me of all the things that he said unto thee."
          reference="1 Samuel 3:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Eli puts Samuel under an oath to hide nothing, which tells you he already suspects
            exactly what kind of news this is. A man who had not already guessed would not need to
            threaten a curse on the boy for staying silent.
          </p>
        </div>
        <VerseQuote
          text="And Samuel told him every whit, and hid nothing from him. And he said, It is the LORD: let him do what seemeth him good."
          reference="1 Samuel 3:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Samuel obeys fully. He hides nothing, exactly as commanded.</strong> Eli&apos;s
            response is not denial, and it is not an argument. &quot;Let him do what seemeth him
            good&quot; is the closest this chapter gets to Eli actually accepting responsibility for
            what his own house has earned.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Established as a Prophet From Dan to Beersheba (verses 19 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by zooming out from one house to the whole nation.</p>
        </div>
        <VerseQuote
          text="And Samuel grew, and the LORD was with him, and did let none of his words fall to the ground."
          reference="1 Samuel 3:19"
        />
        <VerseQuote
          text="And all Israel from Dan even to Beersheba knew that Samuel was established to be a prophet of the LORD."
          reference="1 Samuel 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Dan and Beersheba mark the far north and far south of Israel&apos;s territory, so
            this is the Bible&apos;s own way of saying the whole nation knew. &quot;Did let none of
            his words fall to the ground&quot; means nothing Samuel spoke as God&apos;s messenger
            ever turned out false. One accurate, costly message to Eli is apparently all it took to
            establish that reputation nationwide.
          </p>
        </div>
        <VerseQuote
          text="And the LORD appeared again in Shiloh: for the LORD revealed himself to Samuel in Shiloh by the word of the LORD."
          reference="1 Samuel 3:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter that opened with the word of the LORD being rare closes with God
            speaking again, repeatedly, in the same place.</strong> The silence described in verse 1
            was never permanent. It ended the moment someone was finally ready to listen and then
            actually say what he heard.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why was the word of the LORD so rare at this point in Israel&apos;s
            history?</strong> What the text says: verse 1 states it as a plain fact, without
            explaining the cause directly in this chapter. How this is read: 1 Samuel 2 already
            showed a corrupt priesthood that stole from sacrifices and ignored real correction.
            Amos later describes a similar famine as a direct consequence of a nation&apos;s
            unfaithfulness, which fits the pattern this chapter sets up without needing to state
            the cause outright.
          </p>
          <VerseQuote
            text="Behold, the days come, saith the Lord GOD, that I will send a famine in the land, not a famine of bread, nor a thirst for water, but of hearing the words of the LORD:"
            reference="Amos 8:11"
          />
          <p>
            <strong>Does verse 14 mean Eli&apos;s household&apos;s sin could never be
            forgiven?</strong> What the text says: the LORD swears that the iniquity of Eli&apos;s
            house will not be purged by sacrifice or offering, specifically, for ever. How this is
            read: the verse names one particular remedy, the sacrificial system, as insufficient
            for this particular sin, rather than declaring every individual in Eli&apos;s family
            eternally condemned. Hophni and Phinehas had already sinned willfully and repeatedly
            with full knowledge, closer to the kind of deliberate, unrepented sin the law elsewhere
            treats as outside what an ordinary offering could cover.
          </p>
          <p>
            <strong>Why does God speak to Samuel instead of speaking to Eli directly, since Eli is
            the priest?</strong> What the text says: the chapter never explains the choice, only
            that the LORD calls Samuel by name three times before Samuel understands who is
            speaking. How this is read: Eli already received this same warning once, from the man
            of God in 1 Samuel 2. Speaking to Samuel this time is not God bypassing the proper
            channel. It reads as God raising up the next voice Israel will actually need once
            Eli&apos;s house is gone, starting that transition the same night the judgment is
            confirmed.
          </p>
          <p>
            <strong>Why does Eli respond so calmly to the worst news he will ever hear?</strong>{" "}
            What the text says: verse 18 records only one sentence from Eli, &quot;It is the LORD:
            let him do what seemeth him good,&quot; with no recorded anger, denial, or pleading.
            How this is read: by this point Eli has already heard the same verdict once from the
            man of God in chapter 2. A second confirmation, through a boy he raised himself,
            appears to land as settled fact rather than fresh shock. Resignation and genuine
            submission can look identical in one sentence, and the text does not tell you which one
            this is.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 3:10</h3>
        <VerseQuote
          text="And the LORD came, and stood, and called as at other times, Samuel, Samuel. Then Samuel answered, Speak; for thy servant heareth."
          reference="1 Samuel 3:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The fourth call is the one Samuel finally recognizes, and his answer becomes the model
          for listening prayer quoted by Christians ever since.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 3:1</h3>
        <VerseQuote
          text="And the child Samuel ministered unto the LORD before Eli. And the word of the LORD was precious in those days; there was no open vision."
          reference="1 Samuel 3:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One sentence sets the whole chapter in motion: God speaking at all, to anyone, was rare
          enough that the narrator felt he had to say so first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 3:7</h3>
        <VerseQuote
          text="Now Samuel did not yet know the LORD, neither was the word of the LORD yet revealed unto him."
          reference="1 Samuel 3:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Growing up inside a religious place never guarantees personally knowing the God it was
          built for. This verse says so plainly, about the boy who becomes Israel&apos;s next prophet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 3:18</h3>
        <VerseQuote
          text="And Samuel told him every whit, and hid nothing from him. And he said, It is the LORD: let him do what seemeth him good."
          reference="1 Samuel 3:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A full, honest answer from Samuel, and a response from Eli that reads less like comfort
          and more like a man finally accepting what has already been decided.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 3:19</h3>
        <VerseQuote
          text="And Samuel grew, and the LORD was with him, and did let none of his words fall to the ground."
          reference="1 Samuel 3:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A short verse carrying a large claim: everything Samuel speaks for God from this night
          forward turns out true.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in 1 Samuel 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God called Samuel by name in the night while he slept near the ark at Shiloh. Samuel
          mistook the voice for Eli three times before Eli realized what was happening and told
          him how to answer. God then confirmed the judgment against Eli&apos;s house, Samuel
          relayed it to Eli the next morning, and the chapter ends with all Israel recognizing
          Samuel as a true prophet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Samuel think Eli was calling him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 7 explains it directly. Samuel did not yet know the LORD personally, and the word
          of the LORD had not yet been revealed to him, so the voice calling his name had nothing
          familiar to compare it to except Eli, the one person who normally called him at night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was the word of the LORD rare before this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not state the cause directly in this chapter, but it follows right after 1
          Samuel 2&apos;s description of a corrupt priesthood under Hophni and Phinehas. Scripture
          elsewhere, like Amos 8:11, connects a scarcity of God&apos;s word with a nation&apos;s
          unfaithfulness, a pattern this chapter fits without spelling it out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;Speak, LORD, for thy servant heareth&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the answer Eli told Samuel to give if the voice called again, offering himself as
          ready to listen before knowing what would be said. It has become one of the most quoted
          verses in Scripture for approaching prayer with an open, listening posture rather than
          only bringing requests.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does 1 Samuel 3:14 mean Eli&apos;s family could never be forgiven?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse specifically says the iniquity cannot be purged by sacrifice or offering, which
          names one remedy as insufficient rather than declaring every family member eternally
          condemned. It reflects how seriously Scripture treats deliberate, unrepented sin
          committed with full knowledge, which is exactly what chapter 2 already showed in Hophni
          and Phinehas.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Samuel afraid to tell Eli the vision?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eli had raised Samuel since he was a small child, and the message Samuel now carried
          announced the end of Eli&apos;s entire family line in the priesthood. Verse 15 says
          Samuel feared to tell him, which is an understandable reaction to delivering devastating
          news to someone you love.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;established to be a prophet&quot; mean in verse 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means all Israel, from the northern town of Dan to the southern town of Beersheba,
          recognized Samuel as a genuine prophet of the LORD. That recognition came quickly, built
          on the fact that nothing he spoke as God&apos;s messenger failed to come true.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the double call of Samuel&apos;s name significant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture uses a repeated name at several key moments, including{" "}
          <ArticleLink href="/blog/genesis-22-explained">Abraham, Abraham</ArticleLink> at Mount
          Moriah and <ArticleLink href="/blog/exodus-3-explained">Moses, Moses</ArticleLink> at the
          burning bush. Each time, the person called answers &quot;Here am I,&quot; the same
          response Samuel gives before he even understands who is speaking.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 1 Samuel 3 connect to 1 Samuel 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter confirms, through Samuel, the same judgment against Eli&apos;s house that an
          unnamed man of God already announced in 1 Samuel 2. Nothing in the verdict changes. What
          changes is the messenger, and the fact that Eli now hears it from the boy his own family
          is raising.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens to Samuel after this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Samuel goes on to lead Israel as a prophet and judge for decades, eventually anointing
          both Saul and David as the nation&apos;s first two kings. This chapter marks the night his
          public ministry effectively begins.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 3 turns on one quiet, repeated line: a voice calling a name in the dark.</p>
          <p>
            📌 <strong>Growing up near holy things is not the same as knowing the God behind
            them.</strong> Samuel served at the tabernacle his whole life and still needed three
            tries to recognize God&apos;s own voice.
          </p>
          <p>
            📌 <strong>The hardest part of hearing from God is rarely the hearing. It is the
            telling.</strong> Samuel got the message in one night. Working up the courage to say it
            to Eli took until morning.
          </p>
          <p>
            A nation that had barely heard from God in years gets a new prophet established in a
            single chapter, and it starts with nothing more dramatic than a boy willing to say
            &quot;here am I&quot; a fourth time.
          </p>
          <p>So here is your one next step.</p>
          <p>
            The next time you sense God getting your attention, answer like Samuel did on the
            fourth call, ready to listen before you know what you are about to hear.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
