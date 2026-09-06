import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-rahab", {
  title: "Who Was Rahab in the Bible? The Harlot in the Family Line of Jesus",
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

export default function WhoWasRahabPage() {
  return (
    <BlogPostShell
      slug="who-was-rahab"
      title={<>📖 Who Was Rahab in the Bible? The Harlot in the Family Line of Jesus</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Every city has someone people talk about in whispers.</p>
            <p>Someone whose past follows her every time she walks outside.</p>
            <p>In Jericho, that woman was Rahab.</p>
            <p>
              She ran an inn built right into the city wall, the kind of place respectable people
              avoided in daylight. Scripture calls her a harlot, plainly, without softening the
              word one bit.
            </p>
            <p>
              📌 <strong>Then one night, two strangers knocked on her door, and Rahab made one
              brave choice that changed the entire direction of her life.</strong>
            </p>
            <p>
              That single choice pulled her out of a doomed city, into the nation of Israel, and
              eventually into the family line of the Messiah Himself.
            </p>
            <p>Maybe you know what it feels like to believe your past has already decided your future.</p>
            <p>A mistake everyone remembers. A label that follows you into every new room.</p>
            <p>You wonder if God could really use someone like you.</p>
            <p>
              ❓ If God can use a woman with Rahab&apos;s reputation to help save His people and
              shape the line of Jesus, what does that say about the story He wants to write with
              your life?
            </p>
            <p>
              This is the full story of Rahab in the Bible, told in order from Joshua 2 all the way
              through the New Testament. Who she was, what she risked, and why her name still shows
              up three more times after her own story in Joshua ends.
            </p>
            <p>Let&apos;s start with who she actually was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Rahab Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab lived in Jericho, an ancient walled city in Canaan, the land Israel was about to
            enter. Canaan was not part of Israel yet. Other nations lived there, and the people of
            Jericho did not worship the LORD.
          </p>
          <p>
            Rahab ran a house built into the city wall itself. Many Bible teachers believe it
            worked as an inn where travelers could pay to stay the night, and Scripture describes
            her plainly as a harlot, a woman who sold herself for sex.
          </p>
          <p>
            📌 Her story is told in two chapters, <strong>Joshua 2 and Joshua 6</strong>, right at
            the start of Israel&apos;s entry into the promised land.
          </p>
          <p>
            Joshua, the leader who took over after{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> died, sent two spies into Jericho to
            look over the city before Israel attacked it. Of everywhere in the city they could have
            gone, those two men ended up staying at Rahab&apos;s house.
          </p>
          <p>
            💡 Nobody chose Rahab&apos;s line of work for her by accident. In that culture, a woman
            with no husband and no father to protect her often had very few ways to survive.
            Scripture never excuses what she did. It also never pretends her story stops there.
          </p>
          <p>Now here is how it actually happened.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Rahab&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Two Spies at Rahab&apos;s Door</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joshua sent two men out from the Israelite camp at Shittim to scout Jericho before the
            attack. They needed a place to stay without drawing attention.
          </p>
        </div>
        <VerseQuote
          text="And Joshua the son of Nun sent out of Shittim two men to spy secretly, saying, Go view the land, even Jericho. And they went, and came into an harlot's house, named Rahab, and lodged there."
          reference="Joshua 2:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Scripture never explains why they picked her house. An inn built into the wall was a
            natural place for strangers to blend in and stay unnoticed.
          </p>
          <p>
            📌 <strong>Whatever their reason for choosing it, God was already setting something up
            far bigger than a scouting trip.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Knock, a Lie, and a Roof Full of Flax</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Word got back to the king of Jericho that Israelite spies were inside the city, staying
            at Rahab&apos;s house. His men came straight to her door.
          </p>
        </div>
        <VerseQuote
          text="And the king of Jericho sent unto Rahab, saying, Bring forth the men that are come to thee, which are entered into thine house: for they be come to search out all the country."
          reference="Joshua 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rahab had already hidden the two men. She lied straight to the king&apos;s messengers.</p>
        </div>
        <VerseQuote
          text="And the woman took the two men, and hid them, and said thus, There came men unto me, but I wist not whence they were:"
          reference="Joshua 2:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice this plainly. Rahab lied. Scripture records it honestly and does not hide
            that it happened.
          </p>
          <p>
            While the king&apos;s men chased after the spies toward the Jordan River, the two men
            were actually hidden on Rahab&apos;s own roof, under stalks of flax laid out to dry.
          </p>
        </div>
        <VerseQuote
          text="But she had brought them up to the roof of the house, and hid them with the stalks of flax, which she had laid in order upon the roof."
          reference="Joshua 2:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Roofs in that culture were flat and used for storage and work, so flax drying in the
            sun would not have looked out of place at all. It was a simple, ordinary looking hiding
            spot.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Rahab&apos;s Confession of Faith</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Once the danger passed, Rahab climbed up to talk with the two men on her roof. What she
            said next is remarkable. She had never worshipped the LORD in her life, but she already
            believed in Him.
          </p>
        </div>
        <VerseQuote
          text="And she said unto the men, I know that the LORD hath given you the land, and that your terror is fallen upon us, and that all the inhabitants of the land faint because of you. For we have heard how the LORD dried up the water of the Red sea for you, when ye came out of Egypt; and what ye did unto the two kings of the Amorites, that were on the other side Jordan, Sihon and Og, whom ye utterly destroyed. And as soon as we had heard these things, our hearts did melt, neither did there remain any more courage in any man, because of you: for the LORD your God, he is God in heaven above, and in earth beneath."
          reference="Joshua 2:9, 10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Read that last line again. The LORD your God, he is God in heaven above, and
            in earth beneath.</strong> A pagan woman in a pagan city said that about Israel&apos;s
            God before a single Israelite soldier had even crossed the Jordan River.
          </p>
          <p>
            ✅ She had heard about the Red Sea crossing, about forty years earlier, and about two
            recent victories over enemy kings. She never saw any of it happen with her own eyes.
            She only heard about it, and she believed anyway.
          </p>
          <p>
            💡 Faith like Rahab&apos;s is not measured by how much you have seen. It is measured by
            what you do with what you have heard. If fear is the thing keeping you from acting on
            what you believe, {" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">what the Bible says
            about fear</ArticleLink> is worth reading right after this one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Bargain for Her Family&apos;s Life</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab did not just confess faith with her mouth. She acted on it, and she asked for one
            thing in return for what she had already risked.
          </p>
        </div>
        <VerseQuote
          text="Now therefore, I pray you, swear unto me by the LORD, since I have shewed you kindness, that ye will also shew kindness unto my father's house, and give me a true token: And that ye will save alive my father, and my mother, and my brethren, and my sisters, and all that they have, and deliver our lives from death."
          reference="Joshua 2:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>She was not thinking only of herself.</strong> She asked for her father, her
            mother, her brothers, and her sisters, along with everyone who belonged to them.
          </p>
          <p>
            💡 Real faith tends to reach past the person who has it. Rahab believed enough in what
            was coming that she wanted her whole family covered by it, not just herself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Scarlet Cord in the Window</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The spies agreed, on one condition, and made her swear an oath first.</p>
        </div>
        <VerseQuote
          text="And the men answered her, Our life for yours, if ye utter not this our business. And it shall be, when the LORD hath given us the land, that we will deal kindly and truly with thee."
          reference="Joshua 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>They gave her one clear instruction to follow when the attack came.</p>
        </div>
        <VerseQuote
          text="Behold, when we come into the land, thou shalt bind this line of scarlet thread in the window which thou didst let us down by: and thou shalt bring thy father, and thy mother, and thy brethren, and all thy father's household, home unto thee."
          reference="Joshua 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A scarlet cord hanging in her window would mark her house so the Israelite army knew to
            pass over it and spare everyone inside. Rahab did exactly what she was told.
          </p>
        </div>
        <VerseQuote
          text="And she said, According unto your words, so be it. And she sent them away, and they departed: and she bound the scarlet line in the window."
          reference="Joshua 2:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A popular tradition connects that scarlet cord to the blood painted on the doorposts at
            the first Passover in Egypt, both signs marking who would be spared when judgment
            arrived. Scripture never actually states that connection anywhere in the text, so hold
            that comparison loosely. What is written plainly is enough on its own: one cord in one
            window, tied by one woman&apos;s obedience.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Walls Fall and Rahab Walks Out Free</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Weeks later, Israel marched around Jericho for seven days, and on the seventh day the
            walls fell flat. Before the destruction began, Joshua kept the promise made in Rahab&apos;s
            house.
          </p>
        </div>
        <VerseQuote
          text="And the young men that were spies went in, and brought out Rahab, and her father, and her mother, and her brethren, and all that she had; and they brought out all her kindred, and left them without the camp of Israel."
          reference="Joshua 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every single person in Rahab&apos;s house survived while the rest of the city was
            destroyed. Not because of anything they did that day. Because of a scarlet cord tied in
            one window, weeks earlier.
          </p>
        </div>
        <VerseQuote
          text="And Joshua saved Rahab the harlot alive, and her father's household, and all that she had; and she dwelleth in Israel even unto this day; because she hid the messengers, which Joshua sent to spy out Jericho."
          reference="Joshua 6:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>She dwelleth in Israel even unto this day.</strong> The outsider from a
            doomed city became a permanent part of God&apos;s own people. Her past did not follow
            her into her new life. Her faith did.
          </p>
          <p>
            Like <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>, another woman whose life
            looked overlooked from the outside, Rahab ended up written straight into the story God
            was building toward the Messiah.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Rahab in the New Testament</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab&apos;s story does not end in the book of Joshua. Three New Testament writers bring
            her back up, well over a thousand years later.
          </p>
        </div>
        <VerseQuote
          text="By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace."
          reference="Hebrews 11:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hebrews 11 lists Rahab in the great chapter on faith, right alongside Abraham, Moses,
            and Noah.
          </p>
          <p>
            📌 <strong>Out of everyone in Israel&apos;s long history, the writer of Hebrews picked a
            Canaanite harlot to prove that faith is what saves a person.</strong>
          </p>
        </div>
        <VerseQuote
          text="Likewise also was not Rahab the harlot justified by works, when she had received the messengers, and had sent them out another way?"
          reference="James 2:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            James makes an important point right alongside what Hebrews already said. Faith without
            action is not real faith. Rahab did not just believe something quietly in her heart. She
            hid two spies, lied to protect them, and hung a scarlet cord in her own window.
          </p>
          <p>
            💡 Her actions were the proof that her faith was real. If you want to understand how
            faith and salvation fit together, {" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">how do you know you are
            saved</ArticleLink> walks through that question directly.
          </p>
        </div>
        <VerseQuote
          text="And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse;"
          reference="Matthew 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The King James Version spells her name Rachab here and calls her son Booz, the same man
            most readers know as Boaz. This is the same Rahab from Jericho. Boaz later married Ruth,
            and their family line ran straight through King David and on to Jesus.
          </p>
          <p>
            ✅ <strong>The woman with Jericho&apos;s most shameful reputation became an ancestor of
            the Messiah Himself.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Rahab&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Your past does not disqualify you from God&apos;s plan</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab was a Canaanite, an outsider to God&apos;s people, and a woman whose profession
            was considered shameful even in her own city. None of that stopped God from using her.
          </p>
          <p>
            📌 <strong>If God could write Rahab into the family line of Jesus, your past is not the
            wall you think it is.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Faith has to move, or it is not really faith</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab did not just believe something true about God. She acted on it, at real risk to
            her own life. James points to her as proof that faith with no action attached to it is
            not the kind of faith Scripture is describing.
          </p>
          <p>
            ⚠️ Agreeing with the right things about God and never once acting on them is not what
            the Bible calls faith.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. God rewards small, risky obedience</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab did not do anything huge by the world&apos;s standards. She hid two men, told a
            lie to protect them, and tied a cord in a window. Each step was small, but each one was
            risky.
          </p>
          <p>✅ God did not ask Rahab for a spotless life. He asked for one brave choice, and she gave it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. One person&apos;s faith can save a whole family</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rahab asked for her father, her mother, her brothers, and her sisters to be spared, and
            every single one of them was.
          </p>
          <p>
            💡 Her faith did not only save herself. It reached backward into her family and pulled
            them out with her.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God&apos;s story is bigger than the reputation people give you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jericho knew Rahab as the harlot. The Bible calls her that too, honestly, without ever
            hiding it. But Hebrews calls her a woman of faith, and Matthew calls her the mother of
            Boaz.
          </p>
          <p>
            📌 <strong>The label people put on you is not the last word God gets to write about
            your life.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Rahab&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 2:11</h3>
        <VerseQuote
          text="And as soon as we had heard these things, our hearts did melt, neither did there remain any more courage in any man, because of you: for the LORD your God, he is God in heaven above, and in earth beneath."
          reference="Joshua 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the clearest statement of faith spoken by anyone in the whole book of Joshua.</p>
          <p>A woman who had never worshipped the LORD said it before a single Israelite entered the land.</p>
          <p>💡 Faith is not reserved for people who grew up around it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 6:25</h3>
        <VerseQuote
          text="And Joshua saved Rahab the harlot alive, and her father's household, and all that she had; and she dwelleth in Israel even unto this day; because she hid the messengers, which Joshua sent to spy out Jericho."
          reference="Joshua 6:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the Bible still calls her the harlot here, right in the same sentence where she is saved.</p>
          <p>📌 Scripture never hides her past to make her rescue look cleaner. It shows both at once.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Hebrews 11:31</h3>
        <VerseQuote
          text="By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace."
          reference="Hebrews 11:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Written over a thousand years after Jericho fell.</p>
          <p>Her name still opens with the same word Jericho used against her, harlot, right next to the word faith.</p>
          <p>💡 God is not embarrassed by your history when your faith is real.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. James 2:25</h3>
        <VerseQuote
          text="Likewise also was not Rahab the harlot justified by works, when she had received the messengers, and had sent them out another way?"
          reference="James 2:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>James asks it as a question because the answer is obvious to anyone who knows the story.</p>
          <p>📌 What she believed and what she did were never two separate things.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 1:5</h3>
        <VerseQuote
          text="And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse;"
          reference="Matthew 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short line in a long list of names.</p>
          <p>It quietly places Rahab in the direct family line of Jesus Christ.</p>
          <p>✅ God does not just forgive the past. He sometimes builds His future right out of it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Rahab</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Rahab really a prostitute?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Joshua 2:1 calls her a harlot in plain language, and Hebrews 11:31 and James 2:25
          both use the same word centuries later. Scripture never tries to soften or hide this fact
          about her past.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God choose to use a harlot?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never explains God&apos;s reasoning directly, but the pattern shows up again and
          again in the Bible. God consistently chooses people the world would never pick, so that
          what happens next is clearly His doing, not theirs. Rahab&apos;s changed life points
          straight back to God, not to her own record.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How could God use someone with Rahab&apos;s past?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God did not use Rahab because of her past. He used her because of the faith she showed in
          the moment the spies arrived at her door. The Bible measures her by what she believed and
          did once that moment came, not by everything that came before it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the scarlet cord in Rahab&apos;s story?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a length of scarlet thread the spies told Rahab to tie in her window. It marked her
          house so the Israelite army would know to spare everyone inside once Jericho fell. Some
          readers connect it to the blood on the doorposts at the first Passover, but Scripture
          never states that connection directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Rahab in the genealogy of Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Matthew 1:5 names her, spelled Rachab in the King James Version, as the mother of
          Boaz. Boaz married Ruth, and their family line runs through King David straight to Jesus.
          She is one of only a few women named in that whole genealogy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Rahab lie, and was that okay with God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, she lied to the king&apos;s men about the spies. Scripture records the lie honestly
          and never pretends it did not happen. It also never says God approved of the lie itself.
          What Hebrews and James praise is her faith and her courage to protect God&apos;s people,
          not the method she chose to do it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Rahab after Jericho fell?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:25 says she and her family were brought out safely and she lived among the
          Israelites from then on. Matthew&apos;s genealogy shows her as the mother of Boaz, which
          means she became a permanent part of God&apos;s people and eventually part of David&apos;s
          own family tree.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who did Rahab marry?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not say directly, but Matthew 1:5 names Boaz as her son, which means she
          married an Israelite man at some point after Jericho fell. Some later Jewish writings name
          her husband as Salmon, one of the men in that same genealogy, though Scripture itself never
          spells this out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between how Hebrews and James describe Rahab&apos;s faith?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 11:31 praises her faith itself, the belief that saved her from destruction. James
          2:25 praises the actions that came out of that faith, hiding the spies and sending them out
          safely. Together the two verses show the same truth from two angles. Real faith believes,
          and real faith acts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Rahab today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God is not looking for a clean record before He uses someone. He is looking for faith
          that is willing to act, even when it is risky and even when your past looks nothing like
          it should. Rahab is proof that one honest, brave choice can change the entire direction of
          a life.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rahab started her story as the woman with the worst reputation in Jericho.</p>
          <p>She ends it named in the New Testament three more times, and written permanently into the family line of Jesus.</p>
          <p>
            📌 <strong>Her past did not disqualify her.</strong>
          </p>
          <p>
            📌 <strong>Her faith did not stay quiet. It moved her to act, at real risk to her own
            life.</strong>
          </p>
          <p>
            📌 <strong>God took one brave choice and used it to help shape the story of the
            Messiah.</strong>
          </p>
          <p>
            If you have ever felt like your history has already decided what God can do with you,
            read Joshua 2 tonight. Watch how God moves toward a woman nobody in her own city would
            have chosen.
          </p>
          <p>
            He is not asking you for a spotless past. He is asking for the same thing He asked of
            Rahab. One honest, brave step of faith, right where you are.
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
          description="Rahab's story shows that God can use anyone who takes one brave step of faith. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
