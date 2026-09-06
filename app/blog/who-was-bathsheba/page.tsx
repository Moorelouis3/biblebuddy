import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-bathsheba", {
  title: "Who Was Bathsheba in the Bible? The Woman a King Killed For",
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

export default function WhoWasBathshebaPage() {
  return (
    <BlogPostShell
      slug="who-was-bathsheba"
      title={<>📖 Who Was Bathsheba in the Bible? The Woman a King Killed For</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One man in this story had an army, a palace, and total power.</p>
            <p>The other person in this story had a rooftop, a husband away at war, and no power at all.</p>
            <p>Guess which one still gets blamed the most today.</p>
            <p>
              📌 <strong>Bathsheba lost her privacy, then her husband, then her first child, and she
              is still, thousands of years later, treated by many readers as if she caused her own
              tragedy.</strong>
            </p>
            <p>Maybe you know what it feels like to have someone with power over you make a choice about your life.</p>
            <p>A boss. A parent. Someone in charge who could hurt you either way, whether you said yes or said no.</p>
            <p>You know the specific fear of having no real option, and then carrying the blame anyway when it all goes wrong.</p>
            <p>That is the world Bathsheba lived inside the day a king sent for her.</p>
            <p>
              This is the full story of Bathsheba in the Bible, walked through in order, straight from
              the text. What David did. What it cost Uriah. What it cost her son. And what she went on
              to do, years later, when her voice finally mattered.
            </p>
            <p>Let&apos;s start with who she was before any of it happened.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Bathsheba Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Bathsheba was the daughter of Eliam and the wife of Uriah the Hittite.</p>
          <p>
            A Hittite was a person from a nearby ancient people group. Uriah had joined Israel and
            served King David loyally, which makes what happens to him even harder to read.
          </p>
          <p>
            📌 Uriah was not some random soldier. He was one of David&apos;s most trusted fighters,
            counted among an elite group known as David&apos;s mighty men.
          </p>
        </div>
        <VerseQuote text="Uriah the Hittite: thirty and seven in all." reference="2 Samuel 23:39" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That short line closes out a whole roll call of David&apos;s bravest warriors. Uriah is
            named last, but he is named. He belonged.
          </p>
          <p>Bathsheba&apos;s story runs through two seasons of Scripture, separated by years.</p>
          <p>
            💡 First comes 2 Samuel 11 and 12, when she is young, married, and pulled into David&apos;s
            sin. Then, decades later, she appears again in 1 Kings 1 and 2, no longer a young wife but a
            mother fighting to protect her son&apos;s future.
          </p>
          <p>Now here is how her life actually unfolded.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Bathsheba&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What David Saw From the Roof</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The story opens with a detail that matters more than it looks. Spring was the season when
            kings led their armies out to war. That was the job.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, after the year was expired, at the time when kings go forth to battle, that David sent Joab, and his servants with him, and all Israel; and they destroyed the children of Ammon, and besieged Rabbah. But David tarried still at Jerusalem."
          reference="2 Samuel 11:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Everyone who was supposed to be at war was at war. Except the king.</strong>
          </p>
          <p>
            David stayed behind in Jerusalem while his men, including Uriah, risked their lives in
            battle for him. One evening, while his army fought, David got up from a nap and went out on
            his rooftop.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass in an eveningtide, that David arose from off his bed, and walked upon the roof of the king’s house: and from the roof he saw a woman washing herself; and the woman was very beautiful to look upon."
          reference="2 Samuel 11:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Because of how homes were built at the time, a rooftop like David&apos;s would have looked
            down over the houses below. He was not where he should have been, and from there he saw a
            woman he should never have looked at twice.
          </p>
          <p>He asked who she was. His servants already had the answer ready.</p>
        </div>
        <VerseQuote
          text="And David sent and enquired after the woman. And one said, Is not this Bathsheba, the daughter of Eliam, the wife of Uriah the Hittite? And David sent messengers, and took her; and she came in unto him, and he lay with her; for she was purified from her uncleanness: and she returned unto her house."
          reference="2 Samuel 11:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice that the answer told David everything he needed to know to stop. She had a father.
            She had a husband. She had a name. He kept going anyway.
          </p>
          <p>
            📌 <strong>David sent messengers and took her. That is the exact wording. This was not a
            date. It was a summons from the most powerful man in the nation.</strong>
          </p>
          <p>
            ❓ What choice does a subject really have when the king&apos;s messengers arrive at her
            door? In that culture, a king&apos;s word was close to law, and refusing him could cost a
            person everything, even their life. Scripture does not record Bathsheba saying yes to any
            of this. It records David sending, and David taking.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Cover Up That Failed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Bathsheba became pregnant. She sent word to David, and that single sentence in Genesis</p>
          <p>changed the direction of everything that followed.</p>
          <p>
            David&apos;s first move was not honesty. It was damage control. He called Uriah home from
            the war, hoping he would go spend the night with his wife so the timing of the child would
            look normal.
          </p>
        </div>
        <VerseQuote
          text="And David said to Uriah, Go down to thy house, and wash thy feet. And Uriah departed out of the king’s house, and there followed him a mess of meat from the king. But Uriah slept at the door of the king’s house with all the servants of his lord, and went not down to his house."
          reference="2 Samuel 11:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Uriah would not go home while his fellow soldiers were still camped out in the field.</p>
        </div>
        <VerseQuote
          text="And Uriah said unto David, The ark, and Israel, and Judah, abide in tents; and my lord Joab, and the servants of my lord, are encamped in the open fields; shall I then go into mine house, to eat and to drink, and to lie with my wife? as thou livest, and as thy soul liveth, I will not do this thing."
          reference="2 Samuel 11:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Read that carefully. A soldier who was not even at the palace shows more honor
            than the king who summoned him.</strong>
          </p>
          <p>Uriah would not enjoy comfort while his brothers were suffering. David tried a second plan.</p>
        </div>
        <VerseQuote
          text="And when David had called him, he did eat and drink before him; and he made him drunk: and at even he went out to lie on his bed with the servants of his lord, but went not down to his house."
          reference="2 Samuel 11:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ David got a loyal man drunk, trying to loosen his judgment enough to erase the evidence
            of his own sin. It still did not work. Uriah&apos;s integrity held even when he was not
            sober.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. A Letter That Became a Death Sentence</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When the cover up failed, David chose murder instead of the truth.</p>
        </div>
        <VerseQuote
          text="And it came to pass in the morning, that David wrote a letter to Joab, and sent it by the hand of Uriah. And he wrote in the letter, saying, Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die."
          reference="2 Samuel 11:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>David handed Uriah the order for his own death and sent him to carry it himself.
            Uriah never knew what the letter said.</strong>
          </p>
          <p>
            Joab followed the order. He placed Uriah where the fighting was worst, and the other
            soldiers pulled back around him.
          </p>
        </div>
        <VerseQuote
          text="And the men of the city went out, and fought with Joab: and there fell some of the people of the servants of David; and Uriah the Hittite died also."
          reference="2 Samuel 11:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Other soldiers died that day too, ordinary men with no part in David&apos;s sin, killed so
            one murder could be hidden inside a battle report. Uriah, a man who had refused every
            comfort out of loyalty to his king, was killed by that same king&apos;s command.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Widow, Then a Verdict From Heaven</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            News came back to Bathsheba the way it comes to every widow. Someone told her the man she
            married was not coming home.
          </p>
        </div>
        <VerseQuote
          text="And when the wife of Uriah heard that Uriah her husband was dead, she mourned for her husband. And when the mourning was past, David sent and fetched her to his house, and she became his wife, and bare him a son. But the thing that David had done displeased the LORD."
          reference="2 Samuel 11:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the last sentence. Not the thing that Bathsheba had done. The thing that
            David had done.</strong>
          </p>
          <p>
            Scripture is precise about whose sin this was. David took her, David tried to hide it,
            David ordered Uriah&apos;s death, and it is David&apos;s action that the verse says
            displeased the LORD. She mourned a real husband. He arranged a convenient marriage.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Prophet Who Said Thou Art the Man</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God did not let it stay quiet. He sent a prophet named Nathan to confront the king face to
            face. Nathan did not walk in and accuse David directly. He told a story first.
          </p>
        </div>
        <VerseQuote
          text="And the LORD sent Nathan unto David. And he came unto him, and said unto him, There were two men in one city; the one rich, and the other poor. The rich man had exceeding many flocks and herds: But the poor man had nothing, save one little ewe lamb, which he had bought and nourished up: and it grew up together with him, and with his children; it did eat of his own meat, and drank of his own cup, and lay in his bosom, and was unto him as a daughter. And there came a traveller unto the rich man, and he spared to take of his own flock and of his own herd, to dress for the wayfaring man that was come unto him; but took the poor man’s lamb, and dressed it for the man that was come to him."
          reference="2 Samuel 12:1 through 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David was furious at the rich man in the story and declared he deserved to die. Then Nathan
            said the four words that ended the disguise.
          </p>
        </div>
        <VerseQuote
          text="And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul;"
          reference="2 Samuel 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Thou art the man. Not Bathsheba. David.</strong> The prophet named the sin, and
            he named the sinner, and it was the king every time.
          </p>
          <p>
            💡 It is worth pausing on Nathan himself for a moment. He risked his own life to say this to
            a king who had just proven he would kill a loyal soldier to protect himself. Speaking truth
            to power always costs something, and Nathan paid it anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. A Son Dies, and a Son Named Solomon Is Born</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nathan told David that, because of this sin, the child born to him and Bathsheba would not
            live.
          </p>
        </div>
        <VerseQuote
          text="And Nathan departed unto his house. And the LORD struck the child that Uriah’s wife bare unto David, and it was very sick."
          reference="2 Samuel 12:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David fasted and lay on the ground all night begging God for the child&apos;s life. His own
            servants could not get him up off the floor. On the seventh day, the baby died.
          </p>
          <p>
            ⚠️ Whatever anyone thinks about who sinned in this story, the baby did not. A child died
            because of choices he had no part in making. Bathsheba buried a son she never got to raise,
            grieving as any mother would.
          </p>
          <p>
            If you have ever wondered why a painful consequence lands on someone who did not deserve
            it, this part of Bathsheba&apos;s story sits inside that same hard question that{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why does God allow suffering
            </ArticleLink>{" "}
            wrestles with directly.
          </p>
          <p>Later, David comforted his wife, and God gave them another son.</p>
        </div>
        <VerseQuote
          text="And David comforted Bathsheba his wife, and went in unto her, and lay with her: and she bare a son, and he called his name Solomon: and the LORD loved him. And he sent by the hand of Nathan the prophet; and he called his name Jedidiah, because of the LORD."
          reference="2 Samuel 12:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The LORD loved him.</strong> That line is worth sitting with. God did not walk
            away from this family after judging the sin. He kept working inside the wreckage David had
            caused, and He set His love on the very child born out of it.
          </p>
          <p>
            Nathan even gave Solomon a second name, Jedidiah, which means beloved of the LORD. Grace
            showed up again, right in the middle of grief.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The Widow Who Spoke Up for Her Son</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years passed. Bathsheba is not mentioned again until David is old and dying. His son
            Adonijah tried to seize the throne for himself, going around David&apos;s promise that
            Solomon would be king. This time, Bathsheba was not summoned. She walked in.
          </p>
        </div>
        <VerseQuote
          text="And Bathsheba went in unto the king into the chamber: and the king was very old; and Abishag the Shunammite ministered unto the king. And Bathsheba bowed, and did obeisance unto the king. And the king said, What wouldest thou? And she said unto him, My lord, thou swarest by the LORD thy God unto thine handmaid, saying, Assuredly Solomon thy son shall reign after me, and he shall sit upon my throne."
          reference="1 Kings 1:15 through 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The woman who had no voice when David first sent for her now stood in front of
            him and reminded him of his own promise.</strong>
          </p>
          <p>
            Nathan the same prophet who once confronted David over Uriah backed her up, coming in right
            behind her to confirm the same urgent message. Between the two of them, David acted.
          </p>
        </div>
        <VerseQuote
          text="And the king sware, and said, As the LORD liveth, that hath redeemed my soul out of all distress, Even as I sware unto thee by the LORD God of Israel, saying, Assuredly Solomon thy son shall reign after me, and he shall sit upon my throne in my stead; even so will I certainly do this day."
          reference="1 Kings 1:29 and 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Solomon became king because his mother stood up and used the one voice she finally had.
            That is a very different picture than the silent young woman David sent for on a rooftop
            years earlier.
          </p>
          <p>
            And there is one more detail worth knowing. When Matthew opens the New Testament with the
            genealogy of Jesus, Bathsheba is in it, though her own name is not the one he uses.
          </p>
        </div>
        <VerseQuote
          text="And Jesse begat David the king; and David the king begat Solomon of her that had been the wife of Urias;"
          reference="Matthew 1:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Matthew calls her her that had been the wife of Urias. Many readers believe that phrase
            is not an accident. It quietly points a finger straight back at what David did to Uriah,
            even inside the family record of the Messiah.
          </p>
          <p>
            ✅ <strong>The Savior of the world traces His family line through this exact story of abuse
            and grief. Grace did not skip over what happened to Bathsheba. It ran directly through it.</strong>
          </p>
          <p>
            Her line eventually produces the King every other king in Scripture is measured against, the
            same hope that <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              how do you know you are saved
            </ArticleLink>{" "}
            points people back to today.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Bathsheba&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Power without accountability always finds a victim</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David had an army, a palace, and no one to say no to him.</p>
          <p>
            ⚠️ Uriah paid with his life. Bathsheba paid with her husband, her son, and her privacy. The
            person with the most power in the story caused the most damage, and carried it the most
            lightly, until Nathan showed up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. God does not measure blame by who has less power</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture says plainly that the thing David had done displeased the LORD.</p>
          <p>
            📌 It does not put that weight on Bathsheba. When you read this story, notice who Scripture
            actually holds responsible, and let that shape how you read stories like it today.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Silence about sin never makes it go away</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David tried two cover up plans and a murder before anyone confronted him.</p>
          <p>None of it erased what he had done. It only spread the damage further, to Uriah, to the child, to the men who died beside him in battle.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Speaking truth to power takes real courage</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nathan walked into a killer&apos;s throne room and told him the truth to his face.</p>
          <p>
            💡 He did it with wisdom, using a story to open David&apos;s eyes before naming his sin
            directly. Truth and wisdom are not opposites. They work best together.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. A painful season is not always the whole story</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The worst chapter of Bathsheba&apos;s life was not the last one.</p>
          <p>
            ✅ Years later she stood in a palace and helped decide who would rule a nation, and her son
            became the wisest king Israel ever had. God kept working long after the worst day was over.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Bathsheba&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 11:27</h3>
        <VerseQuote
          text="And when the mourning was past, David sent and fetched her to his house, and she became his wife, and bare him a son. But the thing that David had done displeased the LORD."
          reference="2 Samuel 11:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse settles the question of blame before the story even gets to Nathan.</p>
          <p>📌 The thing that David had done. Not Bathsheba. God&apos;s own verdict names the guilty party plainly.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 12:7</h3>
        <VerseQuote
          text="And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul;"
          reference="2 Samuel 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four words that cut through every excuse David could have made.</p>
          <p>
            💡 God had given David everything, a kingdom, a rescue from his enemies, a purpose. Nathan
            reminds him of that gift right before naming what he had done with it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 12:24</h3>
        <VerseQuote
          text="And David comforted Bathsheba his wife, and went in unto her, and lay with her: and she bare a son, and he called his name Solomon: and the LORD loved him."
          reference="2 Samuel 12:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>After grief this deep, God still moved toward this family instead of away from it.</p>
          <p>✅ The LORD loved him is one of the clearest promises in the whole story. Grace reached the exact place the sin had touched.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Kings 1:17</h3>
        <VerseQuote
          text="And she said unto him, My lord, thou swarest by the LORD thy God unto thine handmaid, saying, Assuredly Solomon thy son shall reign after me, and he shall sit upon my throne."
          reference="1 Kings 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Decades after the rooftop, this is Bathsheba speaking with her own voice, in her own words.</p>
          <p>📌 The woman who once had no say in what happened to her now shapes the future of a kingdom by simply telling the truth.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 1:6</h3>
        <VerseQuote
          text="And Jesse begat David the king; and David the king begat Solomon of her that had been the wife of Urias;"
          reference="Matthew 1:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The only place in Jesus&apos; genealogy where a woman is named by her first husband instead of her own name.</p>
          <p>💡 Many readers see that phrase as Matthew quietly pointing back at Uriah, refusing to let the record forget what was done to him even while telling the story of the Messiah&apos;s family line.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Bathsheba</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Bathsheba a victim or did she sin too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture places the blame for this story on David, not on her. She had no army, no throne,
          and no realistic way to refuse a king who sent messengers to her home. 2 Samuel 11:27 says
          plainly that the thing David had done displeased the LORD. Nathan&apos;s confrontation is
          aimed entirely at David, not at her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Bathsheba have a choice when David sent for her?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not describe her agreeing to anything. It says David sent messengers and took
          her. In that culture, refusing a king&apos;s summons could put a person&apos;s life and
          family at risk. She was a subject with no real power against the most powerful man in the
          nation, and the Bible never suggests otherwise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the child David and Bathsheba had?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nathan told David that, because of his sin, the son born from that first union would die.
          David fasted and prayed for seven days, but on the seventh day the child died. Bathsheba
          grieved a baby who never did anything to deserve that loss.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Bathsheba in the family line of Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Matthew 1:6 names her, though he calls her her that had been the wife of Urias rather
          than using her own name. Her son Solomon continues the royal line that eventually leads to
          Jesus, born a king in the line of David.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Uriah the Hittite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Uriah was Bathsheba&apos;s husband and one of David&apos;s thirty mighty men, an elite group
          of his most loyal soldiers. He refused every comfort David offered him while his fellow
          soldiers were still at war, and David eventually had him placed where the fighting was
          worst so he would be killed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did David face any consequences for what he did?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Nathan told him the sword would never leave his household, and his family suffered
          deep turmoil afterward, including the death of his infant son. David also wrote Psalm 51 as
          a prayer of repentance after being confronted, showing genuine sorrow for what he had done.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Thou art the man mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nathan told David a story about a rich man who stole a poor man&apos;s only lamb. David was
          outraged and demanded justice, not realizing the story described his own sin against Uriah.
          Thou art the man was Nathan revealing that David himself was the guilty party he had just
          condemned.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Bathsheba when this happened?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never gives her age. She was already married to Uriah, so she was an adult woman
          with her own household, not a child. Beyond that, the Bible simply does not say, and any
          specific number offered elsewhere is guesswork.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Matthew call her the wife of Urias instead of Bathsheba?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew could easily have used her name, since he names the other women in the genealogy
          directly. Many readers believe leaving Urias in the sentence was deliberate, a quiet way of
          keeping Uriah&apos;s memory attached to the story instead of letting his death fade out of the
          record.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Bathsheba&apos;s life as queen mother?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          By 1 Kings 1, Bathsheba is no longer a woman things happen to. She walks into the king&apos;s
          chamber on her own, states the truth plainly, and helps secure her son&apos;s future. Her
          story shows that a painful beginning does not have to be the end of a person&apos;s influence
          or voice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Bathsheba did not choose any of what happened to her on that rooftop or in the months that followed.</p>
          <p>David chose it. He chose it again when he tried to hide it, and again when he had Uriah killed.</p>
          <p>
            📌 <strong>Scripture is clear about whose sin this was, and it is time readers were just as
            clear.</strong>
          </p>
          <p>
            📌 <strong>God did not abandon this family after judging the sin. He kept loving Solomon, and He wrote Bathsheba into the family line of the Messiah.</strong>
          </p>
          <p>
            ✅ <strong>Whatever was done to you by someone with power over you, it does not define your worth, and it is not the end of your story.</strong>
          </p>
          <p>If you carry a memory like Bathsheba&apos;s, one where someone else&apos;s choice cost you something you can never get back, you are not required to carry the blame for it too.</p>
          <p>Read 2 Samuel 11 and 12 for yourself this week, slowly, and notice every place Scripture names David and not her.</p>
          <p>Then read 1 Kings 1 and watch the same woman walk into a room and use her voice.</p>
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
          description="Bathsheba's story is one of many. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
