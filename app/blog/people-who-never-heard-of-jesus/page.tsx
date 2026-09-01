import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("people-who-never-heard-of-jesus", {
  title: "What Happens to People Who Never Heard of Jesus? An Honest Answer",
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

export default function PeopleWhoNeverHeardOfJesusPage() {
  return (
    <BlogPostShell
      slug="people-who-never-heard-of-jesus"
      title={<>📖 What Happens to People Who Never Heard of Jesus?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Maybe it is your grandfather.</p>
            <p>He lived his whole life in a village that never saw a missionary. He died before anyone ever said the name of Jesus to him. Not once, as far as you know.</p>
            <p>Or maybe it is not your grandfather at all. Maybe it is a friend who died in an accident before you found the courage to say anything. Or a stranger in a country you will never visit, with a life you will never know.</p>
            <p>
              📌 <strong>Whoever it is for you, this is not an abstract question. It has a face attached to it.</strong>
            </p>
            <p>
              So here is the question you are really asking: what happens to those who never heard of Jesus? Did they lose out on{" "}
              <ArticleLink href="/blog/what-is-heaven">heaven</ArticleLink>{" "}
              simply because of where and when they were born?
            </p>
            <p>Let me give you the honest answer up front, before we go any further.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              ⚠️ <strong>Scripture does not hand you a complete, certain answer to this exact question.</strong>
            </p>
            <p>
              It does not say, in so many words, whether the person you are thinking of is in heaven or not. Anyone who tells you they know for sure, in either direction, is telling you more than the Bible actually says.
            </p>
            <p>
              What Scripture does give you is real. It tells you that no one stands before God with zero witness at all. It tells you that God has written something of His law on every human heart. And it gives you one of the oldest questions in the Bible, asked by a man who trusted God enough to ask it out loud: shall not the Judge of all the earth do right?
            </p>
            <p>
              That question is where we are going to land. Not a formula. Not a loophole. The character of the God who is doing the judging.
            </p>
            <p>Stay with me through this. You are not wrong to ask it, and you will not be scolded for asking it here.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Question Won&apos;t Let You Go
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Some questions stay theoretical. This one rarely does.</p>
          <p>
            It usually shows up attached to someone. A grandparent who worshiped other gods because that was all he ever knew. A friend who died young, before you got around to sharing your faith. A child born in a place the gospel has never reached.
          </p>
          <p>That is what makes this question so heavy.</p>
          <p>
            📌 <strong>You are not just asking about fairness in general. You are asking whether God was fair to someone you loved.</strong>
          </p>
          <p>
            And underneath that is a quieter fear. If God would let a good, sincere person suffer forever simply for being born in the wrong place, is He really good at all? Can you actually trust Him?
          </p>
          <p>
            That fear is worth naming honestly, because it is often the real reason people quietly drift from God. Not one big argument. Just this one question, unanswered, sitting in the back of the mind for years.
          </p>
          <p>
            This matters for your faith because it is really a question about{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">whether you can trust God</ArticleLink>{" "}
            with the things you cannot see. That trust is not blind. It is built on who He has already shown Himself to be.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Scripture Actually Says
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. This Question Has a Face, Not Just a Theory
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before we look at a single verse, sit with something true.</p>
          <p>
            Most people who ask this question are not doing philosophy. They are grieving, or worrying, or replaying a conversation they wish they had started differently.
          </p>
          <p>
            📌 <strong>If a specific person&apos;s face came to mind when you clicked on this article, that is not a distraction from the real question. That is the real question.</strong>
          </p>
          <p>
            Scripture never treats people as statistics, and neither should we. God did not create a category called &quot;the unreached.&quot; He created your grandfather. He knew his name before he had one.
          </p>
          <p>
            So as we walk through what the Bible actually says, keep that face in mind. Everything below is written for a real person, wondering about a real person. Not for a debate club.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. No One Is Left With Zero Witness
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first thing Scripture tells you is that no human being has ever stood before God with absolutely nothing to go on.</p>
          <p>Paul writes this in the opening chapter of Romans:</p>
        </div>
        <VerseQuote
          text="Because that which may be known of God is manifest in them; for God hath shewed it unto them. For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead; so that they are without excuse:"
          reference="Romans 1:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that slowly. God shewed it unto them.</p>
          <p>
            This is called general revelation. It means creation itself is a kind of witness. The sunrise, the vastness of the sky, the order in a single cell, the ache every human being feels that there must be something more than this. Paul says all of that testifies to God&apos;s eternal power, even to someone who has never opened a Bible or heard a sermon.
          </p>
          <p>
            📌 <strong>Nobody looks up at the stars and concludes there is nothing behind them without suppressing something they already sense.</strong>
          </p>
          <p>
            That does not mean creation alone teaches someone the name of Jesus, or the cross. But it does mean no one stands before God having received zero witness of Him. Creation has been preaching since the first morning.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. God Has Written Something on Every Heart
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture goes further than the sky and the stars. It says something has been placed inside every human heart too.</p>
        </div>
        <VerseQuote
          text="For when the Gentiles, which have not the law, do by nature the things contained in the law, these, having not the law, are a law unto themselves: Which shew the work of the law written in their hearts, their conscience also bearing witness, and their thoughts the mean while accusing or else excusing one another;)"
          reference="Romans 2:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is talking about people who never received the law of Moses. People with no Scripture at all. And he says something remarkable: the work of the law is written in their hearts.
          </p>
          <p>Their conscience bears witness. Their own thoughts either accuse them or excuse them.</p>
          <p>
            💡 <strong>Every human culture in history, however cut off, has some sense that murder is wrong, that betrayal is wrong, that cruelty deserves shame.</strong>
          </p>
          <p>
            That is not a coincidence. That is the fingerprint of a moral God stamped into every person He made, whether or not they can name Him.
          </p>
          <p>
            So creation testifies to God&apos;s existence and power, and conscience testifies to His moral law. No one is left in a total vacuum, with nothing at all to answer to.
          </p>
          <p>
            That does not mean conscience is a perfect guide, or the same thing as knowing Christ. It simply means the witness is there, and God will take it into account.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Judge of All the Earth Will Do Right
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse to actually hold onto. Not because it answers every detail, but because it answers the thing underneath your question.</p>
          <p>
            It comes from a strange, tense conversation between Abraham and God. God was about to judge Sodom and Gomorrah, and Abraham, worried for the righteous people who might be caught in that judgment, pushed back.
          </p>
        </div>
        <VerseQuote
          text="That be far from thee to do after this manner, to slay the righteous with the wicked: and that the righteous should be as the wicked, that be far from thee: Shall not the Judge of all the earth do right?"
          reference="Genesis 18:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that last line again. Shall not the Judge of all the earth do right?</p>
          <p>
            📌 <strong>Abraham did not know exactly how God would handle Sodom. He argued the point with God anyway, because he trusted God&apos;s character enough to appeal to it.</strong>
          </p>
          <p>
            That is the pattern for you too. You do not have to know exactly how God will judge every person who never heard the name of Jesus. You are allowed to bring Him the question, the way Abraham did.
          </p>
          <p>God is not an indifferent judge working from a rulebook He never explains. He is the Judge of all the earth, and He does right.</p>
          <p>
            ✅ <strong>Whatever God does with the person you are thinking of, it will not be careless, and it will not be unjust. It will be right, because of who He is.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Scripture Does Not Hand You, and Why That Is Okay
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now for the part that has to be said plainly.</p>
          <p>
            Scripture does not spell out a detailed formula for exactly what happens to someone who dies without ever hearing the gospel. It gives you the witness in creation, the witness in conscience, and the character of the Judge. It does not go further than that and hand you the mechanics.
          </p>
          <p>⚠️ Two easy answers show up a lot, and both of them go beyond what the text actually says.</p>
          <p>
            The first is the confident claim that everyone who never heard is simply saved anyway, since it was not their fault. That feels kind, but Scripture never actually says that, and it quietly undercuts the whole reason Jesus came and the whole reason the church was ever sent anywhere.
          </p>
          <p>
            The second is the equally confident claim that goes into precise, graphic detail about their punishment in{" "}
            <ArticleLink href="/blog/what-is-hell">hell</ArticleLink>
            , as if the person speaking had special access to information God never gave. That is not conviction. That is presumption dressed up as certainty.
          </p>
          <p>
            📌 <strong>Both of those are people filling a real silence in Scripture with their own answer, and then speaking as if God said it.</strong>
          </p>
          <p>
            The honest posture, the one Abraham himself modeled, is to hold the question with open hands. You get the character of the Judge. You do not get every detail of the verdict.
          </p>
          <p>
            💡 <strong>That is how faith works everywhere else in your life too. You trust God&apos;s character in the places you cannot see, because of what He has shown you in the places you can.</strong>
          </p>
          <p>
            None of this makes the gospel optional, or missions less urgent. If anything, it is the opposite. Paul asks a question that should sit with you here:
          </p>
        </div>
        <VerseQuote
          text="How then shall they call on him in whom they have not believed? and how shall they believe in him of whom they have not heard? and how shall they hear without a preacher?"
          reference="Romans 10:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God has not asked you to solve this question from a distance. He has asked you to go, to send, to give, to pray, so that fewer people ever have to be the subject of it again.
          </p>
          <p>
            This is not written to pile guilt on you. It is written to show you that the Great Commission is not made pointless by God&apos;s justice toward the unreached. It is made urgent by it. The uncertainty you feel about your grandfather is exactly why someone else&apos;s grandfather still needs to hear today.
          </p>
          <p>
            So here is where the whole section lands. Not a tidy formula you can repeat at a funeral. A God whose character you can actually trust, even with the one question He has not fully explained. That is enough to stand on.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧭 What To Do With This Question
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not the kind of question you solve once and file away.</p>
          <p>It tends to come back, especially around a funeral, a mission trip, or a late night with too much silence in the room.</p>
          <p>Here is how to hold it well when it does.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Bring the question to God directly, like Abraham did.</strong> You are not being irreverent by asking. Abraham argued the point with God face to face, and Scripture records it as faith, not rebellion.
          </li>
          <li>
            <strong>Resist the pull to manufacture certainty either direction.</strong> When you catch yourself confidently answering for God, in either direction, stop and hand the question back to Him.
          </li>
          <li>
            <strong>Let the question move your feet, not just your mind.</strong> The most faithful response to this question in church history has always been more missionaries, not more arguments.
          </li>
          <li>
            <strong>Support real missions with real money and real prayer.</strong> If this question genuinely bothers you, that concern has a natural next step. Give toward it, and pray by name for a people group who has not heard.
          </li>
          <li>
            <strong>Tell someone before it is too late to tell them.</strong> The ache you feel about someone in the past is a strong reason to speak up now, while you still can.
          </li>
          <li>
            <strong>Rest in what God has actually revealed about His character.</strong> Come back to Genesis 18:25 whenever the question resurfaces. You already know enough about the Judge to trust the verdict, even without every detail.
          </li>
          <li>
            <strong>Let this deepen your worship instead of your doubt.</strong> A God who takes justice this seriously, who writes His law into every conscience, is not a careless God. That is a reason to trust Him more, not less.
          </li>
          <li>
            <strong>Talk to someone if the grief underneath this question is heavy.</strong> If this question is really about grief over a specific person, that grief is real and it deserves real care. Talking to a pastor or a counselor about it is not weak faith.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses on God&apos;s Justice and the Unreached
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you want to hold onto a few verses on this, start with these four.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 18:25</h3>
        <VerseQuote
          text="Shall not the Judge of all the earth do right?"
          reference="Genesis 18:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse to keep closest.</p>
          <p>
            Abraham asked it while negotiating with God over a coming judgment he did not fully understand. He did not get a detailed explanation. He got something better: confidence in the character of the One doing the judging.
          </p>
          <p>Whenever this question about the unreached resurfaces for you, come back to this line before you come back to any theory.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 32:4</h3>
        <VerseQuote
          text="He is the Rock, his work is perfect: for all his ways are judgment: a God of truth and without iniquity, just and right is he."
          reference="Deuteronomy 32:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four claims stack up in one verse: perfect, just, true, and without iniquity.</p>
          <p>
            Moses wrote this near the end of his life, after decades of watching God handle a stubborn, wandering people. It was not theory to him. It was a conclusion drawn from a long track record.
          </p>
          <p>
            📌 <strong>You are not asked to trust a God with no track record. You are asked to trust the same God Moses watched be faithful for forty years.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Acts 17:26 and 27</h3>
        <VerseQuote
          text="And hath made of one blood all nations of men for to dwell on all the face of the earth, and hath determined the times before appointed, and the bounds of their habitation; That they should seek the Lord, if haply they might feel after him, and find him, though he be not far from every one of us:"
          reference="Acts 17:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/paul">Paul</ArticleLink>{" "}
            said this standing in front of a crowd of Greek philosophers who had never opened a page of Hebrew Scripture.
          </p>
          <p>
            He told them, plainly, that God arranged where and when every nation would live for a reason. So that they should seek the Lord.
          </p>
          <p>Even the where and the when of someone&apos;s birth sits inside God&apos;s purposes, not outside of them.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Peter 3:9</h3>
        <VerseQuote
          text="The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance."
          reference="2 Peter 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse will not tell you the mechanism for the unreached. It will tell you the heart of the Judge you are trusting with the question.</p>
          <p>
            He is not slack. He is not casual about a single soul. He is not willing that any should perish. That is the heart behind every answer Scripture has not fully spelled out for you.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Unreached
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happens to people who never heard of Jesus?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not give a full, detailed answer to this exact question. It says no one is left with zero witness of God, since creation testifies to His power and conscience carries a sense of His moral law. Beyond that, Scripture points you to trust the character of the Judge of all the earth, who Genesis 18:25 says will always do right.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it fair that some people never get the chance to hear about Jesus?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That question is really asking whether God is fair, and Scripture never portrays Him as arbitrary. Romans 1 and 2 show that everyone has some real witness, through creation and conscience, so no one is judged from a total blank. Fairness, in Scripture, is defined by the character of the Judge, who has already proven Himself just and true.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Are people who never heard the gospel automatically saved?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never states this plainly, so claiming it with confidence goes beyond what the text says. Romans consistently ties{" "}
          <ArticleLink href="/blog/how-do-you-know-you-are-saved">salvation</ArticleLink>{" "}
          to faith in Christ, and the urgency of the Great Commission throughout the New Testament only makes sense if hearing genuinely matters. The honest position is to hold this with open hands rather than teach automatic salvation as settled fact.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does this mean missions do not matter as much?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, it means the opposite. Romans 10:14 asks how anyone will believe in a Christ they have never heard of, and that question is exactly why the church keeps sending missionaries. The uncertainty around this topic is one of the strongest reasons to take sharing the gospel seriously, not a reason to relax about it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why doesn&apos;t the Bible just answer this question clearly?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture answers a great deal clearly, including who God is and how a person is saved. This particular detail, what happens case by case to someone who genuinely never heard, is left for you to trust rather than calculate. That keeps the focus where the Bible consistently puts it, on the character of God rather than a formula.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it wrong to ask God this question?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Abraham asked God almost this exact question in Genesis 18, arguing directly with Him over a coming judgment, and Scripture records it as faith, not disrespect. What matters is where you take the question, not whether you are allowed to ask it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What about babies or children who die before they can understand the gospel?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is a related but distinct question, and Scripture does not spell out a detailed answer here either. What it gives is the same anchor: a Judge described throughout Scripture as compassionate toward the weak and just in all His ways. Many Christians rest this question, too, on the character of God rather than a precise rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How should I talk about this with someone who is grieving?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gently, and without pretending to know more than Scripture actually says. Avoid confident statements in either direction, since both can wound someone who is already hurting. Point them to what is actually certain: God is good, God is just, and God has shown you enough of His character to be trusted, even here. Sometimes the most faithful thing you can say is that you are trusting Him with this one too.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this, remember these three things.</p>
          <p>
            📌 <strong>No one stands before God with zero witness.</strong> Creation testifies. Conscience testifies. Both are real, even where the gospel has never been preached.
          </p>
          <p>
            📌 <strong>Scripture does not give you a complete formula here, and that is okay.</strong> Anyone who claims full certainty either way, that everyone is automatically saved or that they can describe the details of someone&apos;s judgment, is going beyond what the text says.
          </p>
          <p>
            📌 <strong>Shall not the Judge of all the earth do right?</strong> That is the anchor. Not a mechanism you can explain at a funeral. A character you can actually trust.
          </p>
          <p>
            You came to this question worried that God might not be good. Walk away instead having seen how seriously He takes justice, how much of Himself He has already shown, and how far He has gone to make sure fewer people ever have to be the subject of this question again.
          </p>
          <p>
            One next step. Take the specific person who came to mind when you started reading, and hand them to God in prayer, honestly, the way Abraham did. Then look for one person in your own life who still has not heard, and go say something.
          </p>
          <p>You do not have to resolve this question today. You just have to trust the One who already has.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hard questions like this one get easier to carry when you are not carrying them alone, and when you actually know what Scripture says instead of guessing.
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
            Thousands of Christians are already reading this way, one day at a time. There is room for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
