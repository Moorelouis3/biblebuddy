import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-5-explained", {
  title: "Genesis 5 Explained: The Genealogy From Adam to Noah",
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

export default function GenesisFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-5-explained"
      title={<>📖 Genesis 5 Explained: The Genealogy From Adam to Noah</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ten names. Eight deaths. One man who never died at all.</p>
            <p>
              <strong>Genesis 5 explained</strong> is a family tree, the line from Adam down to
              Noah, and most readers skim past it looking for the next story.
            </p>
            <p>Do not skim this one.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Did people in this chapter really live over 900 years?</li>
            <li>❓ Why does one man in the list never die at all?</li>
            <li>❓ And why does the exact same word show up eight separate times?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Genesis 5 is a genealogy with a heartbeat. Underneath the names is a
              repeated word, and one man who breaks the pattern completely.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the repeated formula, the
              man who never died, the oldest person ever recorded, and the son whose name carried
              a father&apos;s hope for relief.
            </p>
            <p>A list of names has never told you this much about your own story.</p>
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
            <ArticleLink href="/blog/genesis-4-explained">Genesis 4</ArticleLink> ended with two
            very different family lines already taking shape.
          </p>
          <p>
            Cain&apos;s descendants built the first city and made music and tools, but the same
            line produced Lamech, a man who bragged about killing someone. Meanwhile Adam and Eve
            had another son, Seth, and by the end of the chapter people had started calling on the
            name of the LORD again.
          </p>
          <p>
            📌 <strong>Genesis 5 is Scripture choosing which line to follow.</strong> It opens by
            naming itself &quot;the book of the generations of Adam,&quot; then walks straight
            through Seth&apos;s family, not Cain&apos;s. Cain&apos;s line disappears from the text
            entirely after chapter four. Seth&apos;s line is the one that leads, ten generations
            later, to Noah.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Still Made in God&apos;s Likeness (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens by reaching all the way back past{" "}
            <ArticleLink href="/blog/genesis-4-explained">the murder in the last chapter</ArticleLink>
            , past the fall, back to the very beginning.
          </p>
        </div>
        <VerseQuote
          text="This is the book of the generations of Adam. In the day that God created man, in the likeness of God made he him; Male and female created he them; and blessed them, and called their name Adam, in the day when they were created."
          reference="Genesis 5:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is worth pausing on. Genesis 3 recorded the fall. Genesis 4 recorded a
            murder. And here, two chapters later, God&apos;s likeness on{" "}
            <ArticleLink href="/blog/who-was-adam">Adam</ArticleLink> is stated again, without
            qualification.</strong> Sin damaged everything, but it did not erase the image of God
            stamped into humanity at creation. That is the same truth{" "}
            <ArticleLink href="/blog/genesis-1-explained">Genesis 1</ArticleLink> already
            established, restated here as the foundation this whole genealogy stands on.
          </p>
          <p>
            Notice also that &quot;Adam&quot; names both the man and the pair together, &quot;male
            and female created he them.&quot; The name belongs to both of them from the start.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Different Kind of Likeness (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse later, the wording repeats with a small but heavy change.</p>
        </div>
        <VerseQuote
          text="And Adam lived an hundred and thirty years, and begat a son in his own likeness, after his image; and called his name Seth."
          reference="Genesis 5:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 1 says God made man in God&apos;s likeness. Verse 3 says Adam made a son in
            Adam&apos;s own likeness. Same phrase, different source.
          </p>
          <p>
            💡 Seth still carries the image of God, because every descendant of Adam does. But he
            also carries Adam&apos;s likeness now, a fallen father&apos;s nature passed down to
            every child born after Eden. Paul makes this exact link centuries later:
          </p>
        </div>
        <VerseQuote
          text="Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned... Nevertheless death reigned from Adam to Moses, even over them that had not sinned after the similitude of Adam's transgression, who is the figure of him that was to come."
          reference="Romans 5:12 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Death reigned from Adam to Moses.&quot; Genesis 5 is the receipt for that
            sentence, written out name by name.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Word That Repeats Eight Times (the whole chapter)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            From here the chapter settles into a formula, one man after another. Here is the
            pattern for Adam himself.
          </p>
        </div>
        <VerseQuote
          text="And Adam lived an hundred and thirty years, and begat a son in his own likeness, after his image; and called his name Seth: And the days of Adam after he had begotten Seth were eight hundred years: and he begat sons and daughters: And all the days that Adam lived were nine hundred and thirty years: and he died."
          reference="Genesis 5:3 to 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Lived. Begat. Lived some more. Begat sons and daughters. Then, one short sentence:{" "}
            <strong>and he died.</strong>
          </p>
          <p>
            The same closing line lands on Seth, Enos, Cainan, Mahalaleel, Jared, Methuselah, and
            Lamech. Nine hundred and thirty years for Adam. Nine hundred and twelve for Seth. Nine
            hundred and five for Enos. The numbers are staggering, and every single name still
            ends the same way.
          </p>
          <p>
            📌 <strong>Genesis 3:19 told Adam &quot;dust thou art, and unto dust shalt thou
            return.&quot; Genesis 5 is that sentence carried out, generation after generation,
            no matter how long a life lasted first.</strong>
          </p>
          <p>
            ⚠️ Long life was never the same thing as escaping the curse. It only delayed the last
            line of the verse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Enoch: The Name That Breaks the Pattern (verses 21 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven names into the list, the formula suddenly stops working the way it has every
            time before.
          </p>
        </div>
        <VerseQuote
          text="And Enoch lived sixty and five years, and begat Methuselah: And Enoch walked with God after he begat Methuselah three hundred years, and begat sons and daughters: And all the days of Enoch were three hundred sixty and five years: And Enoch walked with God: and he was not; for God took him."
          reference="Genesis 5:21 to 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            No &quot;and he died.&quot; Instead, &quot;he was not; for God took him.&quot; Enoch is
            the shortest lived man in the whole list, and the only one who never reaches the
            refrain everyone else does.
          </p>
          <p>
            📌 <strong>&quot;Walked with God&quot; is repeated twice about Enoch in these four
            verses, and Scripture uses that exact phrase about only one other man in the whole
            Bible.</strong> You can read the full picture of what that phrase means, and who else
            earns it, in{" "}
            <ArticleLink href="/blog/men-who-walked-with-god">
              every man who walked with God
            </ArticleLink>
            .
          </p>
          <p>The New Testament reaches back to confirm exactly what happened to him:</p>
        </div>
        <VerseQuote
          text="By faith Enoch was translated that he should not see death; and was not found, because God had translated him: for before his translation he had this testimony, that he pleased God."
          reference="Hebrews 11:5"
        />
        <VerseQuote
          text="And Enoch also, the seventh from Adam, prophesied of these, saying, Behold, the Lord cometh with ten thousands of his saints, To execute judgment upon all, and to convince all that are ungodly among them of all their ungodly deeds which they have ungodly committed, and of all their hard speeches which ungodly sinners have spoken against him."
          reference="Jude 1:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jude even names Enoch&apos;s place in this genealogy, &quot;the seventh from
            Adam,&quot; the same count Genesis 5 gives him. One man, in a chapter built entirely
            around death, walks straight out of it instead.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Methuselah: The Oldest Life on Record (verses 25 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Enoch&apos;s son picks up right where the pattern left off, and outlasts everyone.</p>
        </div>
        <VerseQuote
          text="And Methuselah lived an hundred eighty and seven years, and begat Lamech: And Methuselah lived after he begat Lamech seven hundred eighty and two years, and begat sons and daughters: And all the days of Methuselah were nine hundred sixty and nine years: and he died."
          reference="Genesis 5:25 to 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nine hundred sixty and nine years. No one else in Scripture reaches that number.
            Methuselah is the longest recorded human life in the Bible, and he is the son of the
            one man in this chapter who never died at all.
          </p>
          <p>
            📌 <strong>Add up every age given so far in this chapter, from Adam&apos;s hundred and
            thirty years at Seth&apos;s birth all the way through Methuselah&apos;s birth, and
            something lines up that the text never states outright.</strong> Methuselah is born
            687 years after Adam. He lives 969 years, which puts his death at year 1,656 counting
            from Adam&apos;s creation. Keep adding through Lamech and Noah using the ages given
            later in this same chapter, and Noah is 600 years old the year the flood comes:
          </p>
        </div>
        <VerseQuote text="And Noah was six hundred years old when the flood of waters was upon the earth." reference="Genesis 7:6" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Run that number back through the genealogy and it lands on year 1,656 from Adam as
            well. The same year Methuselah&apos;s life ends is the year the flood begins. Scripture
            never comments on this directly, so it cannot be called anything more than an
            observation sitting inside the numbers themselves, but it is there for anyone who adds
            them up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Name Meant to Carry Hope (verses 28 to 32)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes on Methuselah&apos;s son, and this Lamech could not be more
            different from the boasting Lamech who closed out chapter four.
          </p>
        </div>
        <VerseQuote
          text="And Lamech lived an hundred eighty and two years, and begat a son: And he called his name Noah, saying, This same shall comfort us concerning our work and toil of our hands, because of the ground which the LORD hath cursed. And Lamech lived after he begat Noah five hundred ninety and five years, and begat sons and daughters: And all the days of Lamech were seven hundred seventy and seven years: and he died. And Noah was five hundred years old: and Noah begat Shem, Ham, and Japheth."
          reference="Genesis 5:28 to 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two men named Lamech appear in back to back chapters, and they could not be
            more opposite.</strong> Cain&apos;s Lamech bragged about murder. Seth&apos;s Lamech
            names his own son out of exhaustion and hope, longing for relief from ground that has
            been hard to work since Eden was lost.
          </p>
          <p>
            Noah does not end up removing that curse. He builds an ark instead, and starts the
            human race over after the flood. But a father naming his son &quot;comfort&quot; is
            still the same longing that runs through the rest of the Bible, all the way to a
            different Son who actually does bring the rest this Lamech was hoping for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did people really live for centuries?</strong> The text states it plainly and
            repeatedly, with specific numbers for each man, not round or symbolic figures. Most
            Christians read these as literal years. A few have suggested the years might mean
            shorter units like months, but that reading breaks down fast: it would mean some of
            these men fathered children before the age of ten, which the text never treats as
            unusual. Scripture itself does not explain why lifespans were this long before the
            flood and then shrink steadily in the chapters that follow. What it does say is that
            length of life never bought anyone an exemption from &quot;and he died.&quot;
          </p>
          <p>
            <strong>Why did God take Enoch and no one else in this list?</strong> The text gives a
            reason for what made Enoch different, that he walked with God and pleased Him, but it
            never explains why that same closeness was not extended to Seth or Methuselah in the
            same way. That is a real gap between what the text says and what it leaves
            unanswered. What it does show clearly is that being taken instead of dying was tied to
            Enoch&apos;s walk with God, not to luck or timing.
          </p>
          <p>
            <strong>Does the Methuselah and flood connection mean anything?</strong> The math
            checks out from the numbers given in Genesis 5 and 7. What it means is where
            Christians differ. Some see it as a quiet picture of God&apos;s patience running out
            exactly when it was going to run out all along. Others treat it as simply how the
            genealogy happened to land, without reading a deeper message into it. The text itself
            offers the numbers and stays silent on the meaning, so certainty beyond that is
            opinion, not the text.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses From Genesis 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 5:1 and 2</h3>
        <VerseQuote
          text="This is the book of the generations of Adam. In the day that God created man, in the likeness of God made he him; Male and female created he them; and blessed them, and called their name Adam, in the day when they were created."
          reference="Genesis 5:1 and 2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The image of God restated after the fall and a murder, the foundation the rest of this
          genealogy stands on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 5:24</h3>
        <VerseQuote text="And Enoch walked with God: and he was not; for God took him." reference="Genesis 5:24" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one line in the entire chapter that refuses to end in death. A close walk with God,
          and an ending nobody else in this list gets.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 5:27</h3>
        <VerseQuote
          text="And all the days of Methuselah were nine hundred sixty and nine years: and he died."
          reference="Genesis 5:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The longest life recorded anywhere in Scripture, belonging to the son of the one man who
          never had to say this line about himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 5:29</h3>
        <VerseQuote
          text="And he called his name Noah, saying, This same shall comfort us concerning our work and toil of our hands, because of the ground which the LORD hath cursed."
          reference="Genesis 5:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A tired father naming his son out of hope for relief. The ache behind that name runs all
          the way through the rest of the Bible.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the point of Genesis 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It traces the line of Seth from Adam to Noah, keeping the promised family line separate
          from Cain&apos;s line in Genesis 4, and it shows death reigning over every name on the
          list except one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did people live so long in Genesis 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture records the ages without explaining the cause. Most readers take the numbers
          as literal years, especially since lifespans decline steadily in the generations after
          the flood, in the chapters that come later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was the oldest person in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Methuselah, at nine hundred sixty and nine years, the longest life given anywhere in
          Scripture. He was Enoch&apos;s son and Noah&apos;s grandfather.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Enoch die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 5:24 says he walked with God and God took him. Hebrews 11:5 adds that he was
          taken up without seeing death because he pleased God through faith.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it true Methuselah died the year of the flood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Adding the ages given in Genesis 5 and Genesis 7:6 puts his death in the same year the
          flood arrives. The text never comments on this directly, so it stands as an observation
          from the numbers rather than a stated claim of Scripture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Genesis 5 repeat &quot;and he died&quot; so many times?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It carries out the sentence God gave Adam in Genesis 3:19, that he would return to dust.
          Eight names in this chapter end that same way, showing the curse reaching every
          generation regardless of how long each life lasted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;walked with God&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes an ongoing, close, obedient relationship with God, not a single good
          decision. Genesis 5 uses it about Enoch specifically, marking him out from every other
          name in the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible call Noah&apos;s birth a comfort?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Lamech named him hoping for relief from the hard labor of working ground that God had
          cursed back in Genesis 3. Noah did not remove that curse, but he did carry humanity
          through the flood into a fresh start.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 5 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke&apos;s Gospel traces Jesus&apos;s genealogy back through this exact line, Noah,
          Lamech, Methuselah, Enoch, all the way to Seth and Adam, showing the promised family line
          from Genesis 5 leading straight to Christ.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does this chapter matter if it is just a list of names?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the list is not neutral. It records the weight of death on an entire family
          line, and it records the one exception to that weight, which is the closest thing to a
          preview of resurrection hope anywhere this early in the Bible.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 5 looks like a list. It reads like a sentence carried out.</p>
          <p>
            📌 <strong>Eight times this chapter says &quot;and he died,&quot; carrying out exactly
            what God told Adam back in Eden.</strong> No lifespan, however long, bought anyone a
            way around it.
          </p>
          <p>
            📌 <strong>One name breaks the pattern completely.</strong> Enoch walked with God, and
            instead of dying, he was simply taken. The rest of the chapter makes that exception
            impossible to miss.
          </p>
          <p>
            📌 <strong>Even a tired father naming his son hoped for something better than what he
            had.</strong> Lamech named Noah for comfort he never fully received. The ache in that
            name still points forward, past Noah, to the one who finally answers it.
          </p>
          <p>
            You are somewhere in a genealogy too, carrying both the image of God and the weight
            Adam passed down.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read the names in this chapter out loud, slowly, and let &quot;and he died&quot; land
            each time. Then read Enoch&apos;s line again, and let that one exception be the hope
            you carry into the next chapter.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
