import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-mary-magdalene", {
  title: "Who Was Mary Magdalene in the Bible? The First Person to See Jesus Risen",
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

export default function WhoWasMaryMagdalenePage() {
  return (
    <BlogPostShell
      slug="who-was-mary-magdalene"
      title={<>📖 Who Was Mary Magdalene in the Bible? The First Person to See Jesus Risen</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>For hundreds of years, one label followed her name everywhere: prostitute.</p>
            <p>Preachers said it. Paintings showed it. Movies just assumed it.</p>
            <p>
              📌 <strong>There is just one problem. The Bible never once calls Mary Magdalene a
              prostitute. Not one verse. Not one word.</strong>
            </p>
            <p>Think about carrying a reputation you never actually earned.</p>
            <p>
              People decide who you are before they ever hear your side of it. They repeat it so
              many times that it hardens into fact, even though it was never true to begin with.
            </p>
            <p>
              That is exactly what happened to Mary Magdalene. Centuries ago, a sermon mixed her up
              with a different, unnamed woman in the Gospels, and the mixup got repeated for over a
              thousand years until most people simply believed it.
            </p>
            <p>
              But the real Mary Magdalene is far more remarkable than the myth ever was. She was a
              woman Jesus healed from a terrible darkness. She stood at the cross when almost all of
              His own disciples had run away. And she was the very first person in all of human
              history that the risen Jesus appeared to.
            </p>
            <p>
              This is her real story, straight from the four Gospels, walked through in the order it
              happened. Who she actually was. What she actually did. And why the resurrection could
              not have been told the way it was without her.
            </p>
            <p>Let&apos;s clear away the myth first, then meet the real woman.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Mary Magdalene Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mary Magdalene gets her name from Magdala. Magdala was a town on the western shore of
            the Sea of Galilee, a large lake in northern Israel. In Bible times, it was known for
            fishing and for a busy trade in salted fish. Calling her Magdalene was a way of saying
            Mary of Magdala. It told people right away where she was from.
          </p>
          <p>
            Before she ever followed Jesus, something was terribly wrong in her life. Luke&apos;s
            Gospel says Jesus cast seven devils out of her (Luke 8:2). Scripture never describes
            what those years looked like from the inside, but seven is a number the Bible often uses
            for something complete or total. Whatever she was suffering, it was not a small thing.
            It had a total grip on her.
          </p>
          <p>
            After Jesus delivered her, everything changed. 📌{" "}
            <strong>
              Mary Magdalene became one of a group of women who followed Jesus and helped support
              His ministry with their own money
            </strong>{" "}
            (Luke 8:1 to 3). That detail matters. She was not a background character. She gave from
            what she had so Jesus and His disciples could keep traveling and teaching.
          </p>
          <p>
            From that point forward, her name shows up again and again across all four Gospels,
            Matthew, Mark, Luke, and John. She is named more times in the Gospels than most of the
            twelve apostles. Every single Gospel writer places her at two of the most important
            moments in the whole Bible: the crucifixion of Jesus, and the empty tomb on the morning
            He rose again.
          </p>
          <p>Now let&apos;s walk through how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Mary Magdalene&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Delivered From Seven Devils, Then Chosen to Serve</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary Magdalene&apos;s story does not start with a miracle everyone was cheering about.</p>
          <p>It starts with an ordeal.</p>
          <p>
            Luke tells us Jesus and the twelve disciples traveled through towns and villages
            preaching about the kingdom of God. A group of women traveled with them, and Luke names
            the first one as Mary Magdalene.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass afterward, that he went throughout every city and village, preaching and shewing the glad tidings of the kingdom of God: and the twelve were with him, And certain women, which had been healed of evil spirits and infirmities, Mary called Magdalene, out of whom went seven devils, And Joanna the wife of Chuza Herod's steward, and Susanna, and many others, which ministered unto him of their substance."
          reference="Luke 8:1 through 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Read that phrase again: <strong>out of whom went seven devils</strong>. That is not a
            small struggle. That describes total oppression, the kind of suffering that likely cost
            her a normal life, a normal home, maybe even a normal family.
          </p>
          <p>Jesus set her free from all of it.</p>
          <p>
            💡 Notice what she did next. She did not disappear back into an ordinary life once she
            felt better. She stayed close to Jesus and used what she had to support Him. Luke says
            these women ministered unto Him of their substance, meaning they gave their own money
            and resources to fund His ministry.
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🕊️ <strong>Mary Magdalene</strong>, healed of seven devils</li>
            <li>💰 <strong>Joanna</strong>, wife of Chuza, a steward in Herod&apos;s own household</li>
            <li>🤝 <strong>Susanna, and many others</strong>, giving from what they had</li>
          </ul>
          <p>
            📌 <strong>The woman history later slandered as immoral was actually one of the
            earliest financial supporters of Jesus&apos;s ministry on earth.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Women Who Did Not Run Away</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Fast forward roughly three years. Jesus has been arrested, beaten, and nailed to a cross outside Jerusalem.</p>
          <p>Look at who was there, and who was not.</p>
          <p>
            Nearly all of the twelve male disciples had scattered. Peter had denied even knowing
            Jesus three separate times. John was the only one of the twelve the Gospels place near
            the cross itself.
          </p>
          <p>But the women stayed.</p>
        </div>
        <VerseQuote
          text="And many women were there beholding afar off, which followed Jesus from Galilee, ministering unto him: Among which was Mary Magdalene, and Mary the mother of James and Joses, and the mother of Zebedee's children."
          reference="Matthew 27:55 and 56"
        />
        <VerseQuote
          text="There were also women looking on afar off: among whom was Mary Magdalene, and Mary the mother of James the less and of Joses, and Salome;"
          reference="Mark 15:40"
        />
        <VerseQuote
          text="Now there stood by the cross of Jesus his mother, and his mother's sister, Mary the wife of Cleophas, and Mary Magdalene."
          reference="John 19:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Three different Gospel writers, writing at different times for different readers, all
            list Mary Magdalene as present at the cross. That kind of agreement matters.
          </p>
          <p>
            ❓ Why does that matter so much? Because standing near a man being executed by Rome for
            treason was dangerous. Soldiers were right there. Anyone identified as a follower risked
            being targeted too.
          </p>
          <p>
            📌 <strong>Mary Magdalene had nothing to gain and everything to lose by standing at that
            cross, and she stood there anyway.</strong>
          </p>
          <p>
            If you have ever wondered why God so often seems to notice the person everyone else
            overlooks, <ArticleLink href="/blog/who-is-leah">Leah&apos;s story</ArticleLink> shows
            the same pattern generations earlier.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Empty Tomb and the Frantic Run for Help</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus was buried in a borrowed tomb late on a Friday. The Sabbath came and went. Very
            early on Sunday morning, while it was still dark outside, Mary Magdalene went to the
            tomb.
          </p>
        </div>
        <VerseQuote
          text="The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre, and seeth the stone taken away from the sepulchre."
          reference="John 20:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 She went first. Before the sun was even fully up, before anyone else arrived, Mary
            Magdalene was already walking to that tomb.
          </p>
          <p>
            What she found stopped her cold. The heavy stone sealing the entrance had been rolled
            away. Her first thought was not resurrection. Her first thought was theft.
          </p>
          <p>She ran.</p>
        </div>
        <VerseQuote
          text="Then she runneth, and cometh to Simon Peter, and to the other disciple, whom Jesus loved, and saith unto them, They have taken away the LORD out of the sepulchre, and we know not where they have laid him."
          reference="John 20:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice her words: we know not where they have laid him. She assumed grave robbers, or
            maybe religious leaders trying to hide His body. Resurrection was not even on her list
            of possibilities yet.
          </p>
          <p>
            She told two of Jesus&apos;s closest disciples, Peter and John. They ran to the tomb
            themselves, looked inside, saw the empty grave clothes, and went back home, still not
            fully understanding what had happened.
          </p>
          <p>Mary Magdalene did not go home.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Two Angels and a Stranger in the Garden</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Everyone else left. Mary stayed at the tomb, crying.</p>
        </div>
        <VerseQuote
          text="But Mary stood without at the sepulchre weeping: and as she wept, she stooped down, and looked into the sepulchre, And seeth two angels in white sitting, the one at the head, and the other at the feet, where the body of Jesus had lain. And they say unto her, Woman, why weepest thou? She saith unto them, Because they have taken away my LORD, and I know not where they have laid him."
          reference="John 20:11 through 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Grief does not always wait for facts. Mary was standing three feet from angels and
            could still only think about a missing body.
          </p>
          <p>Then she turned around.</p>
        </div>
        <VerseQuote
          text="And when she had thus said, she turned herself back, and saw Jesus standing, and knew not that it was Jesus. Jesus saith unto her, Woman, why weepest thou? whom seekest thou? She, supposing him to be the gardener, saith unto him, Sir, if thou have borne him hence, tell me where thou hast laid him, and I will take him away."
          reference="John 20:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ Think about that for a second. The person she was looking for was standing right in
            front of her, and she did not recognize Him.
          </p>
          <p>
            💡 A few reasons have been offered for why. Her eyes were likely full of tears. It was
            early morning light. Whatever the exact reason, grief had narrowed her vision down to
            one thing: finding a body to grieve over. She was so certain He was dead that even
            seeing Him alive did not register at first.
          </p>
          <p>
            She even offered to go carry His body away herself, a task far too heavy for one woman
            alone. That is how much she loved Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. &quot;Mary.&quot; &quot;Rabboni.&quot;</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then Jesus said one word.</p>
        </div>
        <VerseQuote text="Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master." reference="John 20:16" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 He did not need a long speech to reveal Himself. He just said her name.</p>
          <p>
            The moment she heard it, everything changed. She turned toward Him and answered with one
            word too: Rabboni. That is an Aramaic word meaning my Master or my Teacher, a term of
            deep respect and closeness.
          </p>
          <p>
            💡 Sometimes the truest recognition is not seeing a face. It is hearing your name spoken
            by the one voice you know better than any other. That same idea runs through{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">how you know you are
            saved</ArticleLink>: God calls His own by name, and they know His voice.
          </p>
          <p>Jesus then gave her a job.</p>
        </div>
        <VerseQuote
          text="Jesus saith unto her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God."
          reference="John 20:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The very first thing the risen Jesus did was send a woman to go tell His
            disciples that He was alive.</strong>
          </p>
          <p>
            He called them brethren, family language, and told her to say that His Father was now
            their Father too. This was not a small errand. She was being sent to deliver news that
            would reshape human history.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The First Person to Preach the Resurrection</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary Magdalene did exactly what she was told.</p>
        </div>
        <VerseQuote
          text="Mary Magdalene came and told the disciples that she had seen the LORD, and that he had spoken these things unto her."
          reference="John 20:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ This is the promise underneath the whole story. Jesus is alive, and He proved it first
            to a woman who had once been broken by seven devils, not to a religious leader, not to a
            king, not even to His own closest apostles.
          </p>
          <p>
            📌 <strong>This is the first recorded appearance of the resurrected Jesus to any human
            being in all of Scripture, and it happened to her.</strong>
          </p>
          <p>
            In a culture where a woman&apos;s word carried little legal weight, the risen Son of God
            chose a woman&apos;s testimony to carry the most important news that has ever been told.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Mary Magdalene&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Being delivered does not erase your past, it redirects it</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mary Magdalene never denied what she had been through. Luke&apos;s Gospel plainly names
            her history: seven devils. She did not hide it or pretend it never happened.
          </p>
          <p>
            💡 What changed was not her story, it was her direction. The same woman who had been
            enslaved by darkness became one of the people who helped fund Jesus&apos;s ministry and
            one of the first people to preach His resurrection. Whatever has held you, deliverance is
            never the end of your usefulness to God. It is often the beginning of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Faithfulness often just means staying when everyone else leaves</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Jesus was arrested, nearly all of His male disciples ran. Mary Magdalene stood at the cross anyway.</p>
          <p>
            ⚠️ She had no power to stop the crucifixion and no guarantee of safety for herself. She
            stayed simply because she loved Him. Sometimes faithfulness does not look dramatic. It
            looks like staying in the hard place when it would be easier and safer to walk away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Grief can blind you to what God is already doing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary stood inches from angels and still could not see past her sorrow. She looked directly at the risen Jesus and thought He was the gardener.</p>
          <p>
            ❓ How often does grief do the same thing to us, keeping our eyes fixed on what is lost
            instead of what God has already done? Her story is a reminder to keep looking, even
            through tears.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Jesus calls you by name before He gives you a job</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the order of events. Jesus did not hand Mary an assignment first. He spoke her
            name first. Only after she recognized His voice did He send her to tell the disciples.
          </p>
          <p>
            📌 <strong>Relationship always comes before assignment.</strong> God is not primarily
            interested in what you can do for Him. He wants you to know Him first.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God entrusts big news to unlikely people</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The resurrection is the most important event in human history, and Jesus entrusted the
            first announcement of it to a woman who once had seven devils, and whose testimony, by
            the legal standards of her day, would not even have held up in a Jewish court.
          </p>
          <p>
            ✅ That is exactly how God tends to work. He is not looking for the most impressive
            resume. He is looking for someone who will go and say what they saw.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Mary Magdalene&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 8:2</h3>
        <VerseQuote
          text="And certain women, which had been healed of evil spirits and infirmities, Mary called Magdalene, out of whom went seven devils,"
          reference="Luke 8:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the only place in the Bible that tells us what Mary Magdalene was delivered
            from. Seven devils, a picture of total oppression, not a minor struggle.
          </p>
          <p>💡 It is also the only detail Scripture gives us. There is no mention of a past sin, a scandal, or an occupation. Only a healing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 20:1</h3>
        <VerseQuote
          text="The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre, and seeth the stone taken away from the sepulchre."
          reference="John 20:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>She went while it was still dark, before anyone else had the courage or the reason to go.</p>
          <p>📌 Every Gospel account of the resurrection starts with her footsteps toward that tomb.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 20:16</h3>
        <VerseQuote text="Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master." reference="John 20:16" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One word from Jesus undid all her confusion. Her name, spoken in a voice she knew.</p>
          <p>💡 He still calls His people by name today, even in the middle of their confusion and grief.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. John 20:18</h3>
        <VerseQuote
          text="Mary Magdalene came and told the disciples that she had seen the LORD, and that he had spoken these things unto her."
          reference="John 20:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>She did not stay silent about what she had seen. She went and told the very disciples who had gone home confused hours earlier.</p>
          <p>✅ That is the pattern for every believer since: see, then tell.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Mark 16:9</h3>
        <VerseQuote
          text="Now when Jesus was risen early the first day of the week, he appeared first to Mary Magdalene, out of whom he had cast seven devils."
          reference="Mark 16:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mark states it plainly. Jesus appeared first to Mary Magdalene, and Mark ties that honor directly back to her deliverance from seven devils.</p>
          <p>
            📌 <strong>The first witness of the resurrection was a formerly demon oppressed woman,
            not a religious leader.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Mary Magdalene</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Mary Magdalene a prostitute?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Bible never makes that claim anywhere in the four Gospels. The idea comes from a
          sermon preached by Pope Gregory the Great in 591 AD, which conflated Mary Magdalene with
          the unnamed sinful woman of Luke 7 and with Mary of Bethany, the sister of Martha and
          Lazarus. Those are three separate women in the text, and none of the passages about them
          call Mary Magdalene a prostitute. The label stuck in Western tradition for over a thousand
          years anyway.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Mary Magdalene married to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          There is zero credible biblical or historical basis for that claim. It does not come from
          the Gospels. It comes from much later fringe writings and modern fiction, centuries removed
          from the actual events. The four Gospels describe Mary Magdalene as a disciple who followed
          and supported Jesus, never as His wife.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many demons did Mary Magdalene have?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 8:2 and Mark 16:9 both say seven devils. Scripture does not explain what her life
          looked like while under that oppression, only that Jesus delivered her completely from it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Mary Magdalene the first witness of the resurrection?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not give a stated reason, only the fact of it, recorded plainly in John 20
          and Mark 16:9. What stands out is the pattern it fits. Jesus repeatedly chose the
          overlooked and the unlikely to carry His most important news, and here He chose a woman in
          a culture where a woman&apos;s testimony was not even accepted as legal evidence in court.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Mary Magdalene the same person as Mary of Bethany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Mary of Bethany, the sister of Martha and Lazarus, appears in Luke 10 and John 11 and
          12, in a village near Jerusalem. Mary Magdalene is tied to Magdala, a town on the Sea of
          Galilee, far to the north. The Gospels never identify them as the same woman.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Mary Magdalene one of the twelve disciples?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, the twelve apostles named in the Gospels were all men. Mary Magdalene was part of a
          separate, wider group of women who followed Jesus and supported His ministry, mentioned by
          name in Luke 8:1 to 3. She was present at events some of the twelve missed entirely,
          including the crucifixion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Magdalene mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It simply means of Magdala, identifying her hometown. It was a fishing town on the western
          shore of the Sea of Galilee. It was not a family name or a nickname describing her
          character, just a way of saying where she was from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Mary Magdalene after the resurrection?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not tell us. Her last recorded act in the Bible is delivering the news of
          the resurrection to the disciples in John 20:18. Later church tradition offers various
          accounts of her life afterward, but none of it comes from Scripture itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Mary Magdalene sometimes called the apostle to the apostles?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Jesus personally sent her to deliver the news of His resurrection to the eleven
          remaining apostles in John 20:17 and 18. She was not one of the twelve herself, but she
          carried a message directly from the risen Christ to the men who were.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many times is Mary Magdalene mentioned in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          She is named around a dozen times across Matthew, Mark, Luke, and John, more mentions than
          most of the twelve apostles receive. Every Gospel writer includes her at the crucifixion
          and at the empty tomb, which shows how central her presence was to the earliest accounts of
          those events.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary Magdalene spent centuries known for a sin she never committed.</p>
          <p>Meanwhile, the true details of her life sat quietly in Scripture the whole time, waiting to be read.</p>
          <p>She was healed from total oppression. She gave from her own resources to support Jesus. She stayed at the cross when others fled.</p>
          <p>
            📌 <strong>And in a first century culture where a woman&apos;s testimony was not even
            legally valid in court, Jesus still chose her to be the first messenger of the
            resurrection.</strong>
          </p>
          <p>
            That single choice tells you something about how God still works. He does not need your
            reputation to be spotless before He uses you. He does not need the world&apos;s approval
            of your voice before He trusts you with His truth.
          </p>
          <p>He simply needs you to know Him, and to be willing to go and tell what you have seen.</p>
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
          description="Mary Magdalene's story is one of many. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
