import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-judas");

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

export default function WhoWasJudasPage() {
  return (
    <BlogPostShell
      slug="who-was-judas"
      title={<>📖 Who Was Judas? How Close You Can Get and Still Miss It</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You can sit in church every week and still feel far from God.</p>
            <p>You can serve on the team, lead the small group, pray out loud, and still feel it.</p>
            <p>That quiet gap between looking close to Jesus and actually belonging to Him.</p>
            <p>
              📌 <strong>Who was Judas? He was a man who had more access to Jesus than almost
              anyone who has ever lived, and he still missed Him completely.</strong>
            </p>
            <p>Three years on the road with Jesus.</p>
            <p>Front row for every miracle. Sent out to preach. Trusted with the money.</p>
            <p>And in the end, none of it was enough.</p>
            <p>
              Most people only know him as a villain in a story, the man who sold Jesus for thirty
              coins. That picture is too small and too easy. It lets you close the book and tell
              yourself you would never do what he did.
            </p>
            <p>
              But he was not a stranger who wandered in off the street to do evil. He was a friend.
              He was inside the circle. That is exactly what makes his story worth facing honestly
              instead of filing it away as ancient history.
            </p>
            <p>
              This is the full story of Judas Iscariot, walked through in order, straight from the
              text. Who he was. What actually happened, step by step. And the uncomfortable question
              underneath it all.
            </p>
            <p>Let&apos;s look at who he really was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Judas Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas Iscariot was one of the twelve men Jesus personally chose as apostles.</p>
          <p>
            Scripture names him plainly in the list of the twelve, right alongside the others Jesus
            handpicked.
          </p>
        </div>
        <VerseQuote
          text="Simon the Canaanite, and Judas Iscariot, who also betrayed him."
          reference="Matthew 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice that detail. Even in the list of the twelve, his name already carries the ending.</p>
          <p>His father was named Simon (John 6:71).</p>
          <p>
            Most scholars believe the name Iscariot points to Kerioth, a town in Judah. If that is
            right, Judas was likely the only Judean among the twelve. The rest were from Galilee, a
            different region entirely.
          </p>
          <p>
            💡 He may have stood out from the start. Not as the villain. Just as the man who did not
            quite fit in with the group.
          </p>
          <p>He was trusted enough that the group made him their treasurer.</p>
          <p>He carried the bag. He handled the money for Jesus and the twelve.</p>
          <p>
            Think about what that trust meant in practice. The group needed food, lodging, and gifts
            for the poor as they travelled. Jesus put that responsibility in Judas&apos; hands, which
            tells you plainly that nobody around him suspected a thing for a very long time.
          </p>
          <p>
            📌 <strong>His story runs through all four Gospels and into the first chapter of Acts.</strong>
          </p>
          <p>Now here is how it actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of Judas</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Chosen Like Everyone Else</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start here, because it matters more than people realize.</p>
          <p>Jesus did not quietly keep Judas at arm&apos;s length, waiting for him to fail.</p>
          <p>He sent him out with the other eleven. Same commission. Same power.</p>
          <p>Jesus gave the twelve authority over unclean spirits and power to heal every disease.</p>
          <p>Judas got that same authority. He preached the same message the others preached.</p>
          <p>
            💡 <strong>There was no warning label on him.</strong> Nobody in that room looked at
            Judas and thought, that one is different. That one will not make it.
          </p>
          <p>He looked exactly like a disciple, because for a long time, he acted like one.</p>
          <p>He walked through towns casting out demons in Jesus&apos; name, the same as Peter did.</p>
          <p>He laid hands on the sick and watched them get up healed, the same as John did.</p>
          <p>He listened to the same parables, ate at the same fires, slept under the same stars.</p>
          <p>That should unsettle you a little. It is supposed to.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Trusted With the Money</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first crack in the text does not show up at the betrayal.</p>
          <p>It shows up months earlier, in a quiet moment nobody else seemed to catch.</p>
          <p>
            A woman named Mary poured expensive ointment on Jesus&apos; feet. Judas objected, and he
            made it sound spiritual.
          </p>
        </div>
        <VerseQuote
          text="Then saith one of his disciples, Judas Iscariot, Simon's son, which should betray him, Why was not this ointment sold for three hundred pence, and given to the poor?"
          reference="John 12:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>On the surface, that sounds reasonable. Even kind.</p>
          <p>John will not let you leave it there. He tells you exactly what was underneath it.</p>
        </div>
        <VerseQuote
          text="This he said, not that he cared for the poor; but because he was a thief, and had the bag, and bare what was put therein."
          reference="John 12:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>He was already stealing from the money bag, long before the chief priests
            ever offered him a coin.</strong>
          </p>
          <p>Nobody around him seemed to know it yet.</p>
          <p>
            That is how most big falls actually work. The betrayal in the garden did not start in the
            garden. It started in a small, private, repeated compromise that nobody else could see.
            Getting serious about{" "}
            <ArticleLink href="/blog/building-self-control">
              building self control
            </ArticleLink>{" "}
            in the small, unseen choices is not a minor side issue. It is the whole battle.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Deal With the Chief Priests</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke tells us what actually moved first, before Judas ever took a step.</p>
        </div>
        <VerseQuote
          text="Then entered Satan into Judas surnamed Iscariot, being of the number of the twelve. And he went his way, and communed with the chief priests and captains, how he might betray him unto them."
          reference="Luke 22:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Matthew gives us the plain terms of the deal.</p>
        </div>
        <VerseQuote
          text="Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver."
          reference="Matthew 26:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Thirty pieces of silver was the price the law set for a slave, not for a king
            (Exodus 21:32).
          </p>
          <p>Judas did not haggle for more. He asked what they would give, and he took it.</p>
          <p>
            The chief priests had already decided Jesus had to die (John 11:47 through 53). They just had no
            quiet way to arrest Him without a crowd gathering. Judas solved that problem for them,
            and he did it for free, almost as an afterthought to the money.
          </p>
          <p>
            📌 <strong>From that point on, he was not waiting for a chance to betray Jesus.</strong>{" "}
            He was hunting for one.
          </p>
        </div>
        <VerseQuote
          text="And from that time he sought opportunity to betray him."
          reference="Matthew 26:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A heart does not turn on God in a single moment, even when it looks that way from the
            outside. The stealing, the small lies, the quiet resentment, they build a doorway. Satan
            just walked through the one Judas had already left open. It is the same pattern Scripture
            shows in{" "}
            <ArticleLink href="/blog/who-is-jezebel">Jezebel&apos;s story</ArticleLink>, a heart
            drifting long before anyone else notices.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Last Supper and the Sop</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>At the table, Jesus already knew.</p>
          <p>
            He quoted an old Psalm about betrayal from inside the circle of trust: &quot;he that
            eateth bread with me hath lifted up his heel against me&quot; (Psalm 41:9, John 13:18).
          </p>
          <p>Then He said it plainly to the room.</p>
        </div>
        <VerseQuote
          text="And as they did eat, he said, Verily I say unto you, that one of you shall betray me."
          reference="Matthew 26:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every single one of them, sorrowful, asked the same question. Not pointing fingers.
            Asking about themselves.
          </p>
        </div>
        <VerseQuote
          text="And they were exceeding sorrowful, and began every one of them to say unto him, Lord, is it I?"
          reference="Matthew 26:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>That question should be yours too, every time you read this story.</strong> Not
            Judas, is it he. Lord, is it I?
          </p>
          <p>
            John shows us the quiet, almost tender way Jesus answered it. He gave Judas a sop, a piece
            of bread dipped in the dish, the kind of gesture a host gave to a guest of honor.
          </p>
        </div>
        <VerseQuote
          text="Jesus answered, He it is, to whom I shall give a sop, when I have dipped it. And when he had dipped the sop, he gave it to Judas Iscariot, the son of Simon."
          reference="John 13:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ Think about what that means. Jesus singled Judas out with an act of honor, at the exact
            moment He knew what Judas had already agreed to do.
          </p>
          <p>Mercy, offered straight into the middle of betrayal. And Judas took the bread anyway.</p>
        </div>
        <VerseQuote
          text="And after the sop Satan entered into him. Then said Jesus unto him, That thou doest, do quickly."
          reference="John 13:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus did not beg him to stay. He did not need to.</p>
          <p>
            Judas had already made his choice. Jesus simply released him to go do what he had decided
            to do.
          </p>
        </div>
        <VerseQuote
          text="He then having received the sop went immediately out: and it was night."
          reference="John 13:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Night, in more than one sense. He walked out of the light of that table into the dark,
            and he did it on his own two feet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Kiss in the Garden</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas led the arresting party straight to Jesus, in a garden he knew well.</p>
          <p>He had a sign ready for the soldiers, so there would be no confusion in the dark.</p>
        </div>
        <VerseQuote
          text="Now he that betrayed him gave them a sign, saying, Whomsoever I shall kiss, that same is he: hold him fast."
          reference="Matthew 26:48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A kiss on the cheek, from a student to a teacher, was an ordinary sign of respect.</p>
          <p>Judas turned it into the signal for an arrest.</p>
        </div>
        <VerseQuote
          text="And forthwith he came to Jesus, and said, Hail, master; and kissed him."
          reference="Matthew 26:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke records Jesus naming exactly what was happening, by name, out loud.</p>
        </div>
        <VerseQuote
          text="But Jesus said unto him, Judas, betrayest thou the Son of man with a kiss?"
          reference="Luke 22:48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>And then, astonishingly, this.</p>
        </div>
        <VerseQuote
          text="And Jesus said unto him, Friend, wherefore art thou come? Then came they, and laid hands on Jesus, and took him."
          reference="Matthew 26:50"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Friend.</strong> That is the word Jesus used, at the exact second the kiss
            landed on His face.
          </p>
          <p>
            Not enemy. Not traitor. Friend. The door was still open, right up to the very last
            possible second.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Remorse, Not Repentance</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Once Jesus was condemned, something broke open in Judas. He could not carry what he had
            done.
          </p>
        </div>
        <VerseQuote
          text="Then Judas, which had betrayed him, when he saw that he was condemned, repented himself, and brought again the thirty pieces of silver to the chief priests and elders, Saying, I have sinned in that I have betrayed the innocent blood."
          reference="Matthew 27:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He said the true words. &quot;I have sinned.&quot; He even named Jesus correctly,
            &quot;innocent blood.&quot; That is not nothing.
          </p>
          <p>The priests did not care.</p>
        </div>
        <VerseQuote
          text="And they said, What is that to us? see thou to that."
          reference="Matthew 27:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas had nowhere left to carry the weight. So he put it down the only way he knew.</p>
        </div>
        <VerseQuote
          text="And he cast down the pieces of silver in the temple, and departed, and went and hanged himself."
          reference="Matthew 27:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Acts fills in the grim end of that field.</p>
        </div>
        <VerseQuote
          text="Now this man purchased a field with the reward of iniquity; and falling headlong, he burst asunder in the midst, and all his bowels gushed out. And it was known unto all the dwellers at Jerusalem; insomuch as that field is called in their proper tongue, Aceldama, that is to say, The field of blood."
          reference="Acts 1:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Here is the piece of this story people miss most: Judas felt real sorrow, and
            it still destroyed him.</strong>
          </p>
          <p>
            Sorrow over sin is not the same thing as turning back to Christ. Feeling terrible is not
            the same as repenting. One leads to a changed life. The other, left alone, can lead to
            despair. Scripture is honest about exactly what{" "}
            <ArticleLink href="/blog/what-is-repentance">real repentance</ArticleLink> looks like, and
            Judas never got there.
          </p>
          <p>Compare him to Peter, in the very same week.</p>
          <p>Peter denied Jesus three times, to His face, out of fear.</p>
        </div>
        <VerseQuote
          text="And the Lord turned, and looked upon Peter. And Peter remembered the word of the Lord, how he had said unto him, Before the cock crow, thou shalt deny me thrice. And Peter went out, and wept bitterly."
          reference="Luke 22:61 and 62"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter wept bitterly too. Both men broke down. Both men had betrayed Jesus, in their own way.</p>
          <p>
            💡 <strong>The difference was not the size of the sin. It was where each man took his
            sorrow.</strong> Peter went back to the other disciples. Judas went to the priests who
            had paid him, and when they would not absolve him, he had nowhere else to go.
          </p>
          <p>
            Peter had three more years of denying, weeping, and being restored still ahead of him. He
            stood on a beach a few weeks later and heard Jesus ask him three times, &quot;lovest thou
            me?&quot; one question for each denial, and he answered yes every time.
          </p>
          <p>
            Judas never got that conversation. Not because Jesus refused it. Because Judas never went
            looking for it. That is the whole difference between the two men, laid out in one week of
            history.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The Place He Left Empty</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus had already spoken of him in solemn terms before the end even came.</p>
        </div>
        <VerseQuote
          text="While I was with them in the world, I kept them in thy name: those that thou gavest me I have kept, and none of them is lost, but the son of perdition; that the scripture might be fulfilled."
          reference="John 17:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>After it was all over, Peter stood before the believers and named what had happened plainly.</p>
        </div>
        <VerseQuote
          text="Men and brethren, this scripture must needs have been fulfilled, which the Holy Ghost by the mouth of David spake before concerning Judas, which was guide to them that took Jesus."
          reference="Acts 1:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Judas is described as a man who fell from his own calling. &quot;From which Judas by
            transgression fell, that he might go to his own place&quot; (Acts 1:25).
          </p>
          <p>
            His office did not disappear. The believers prayed, cast lots, and Matthias took his place
            among the twelve (Acts 1:26).
          </p>
          <p>
            📌 <strong>God&apos;s purpose was never dependent on Judas.</strong> His failure did not
            break the plan of God. It just meant he would have no part in finishing it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Judas&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Proximity is not the same as surrender</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas heard every sermon. Saw every miracle. Sat at the table.</p>
          <p>None of that, by itself, changed his heart.</p>
          <p>❓ Being around Jesus and belonging to Jesus are not automatically the same thing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Small compromises prepare the big one</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The betrayal did not begin in the garden. It began at the money bag.</p>
          <p>Nobody wakes up one morning and decides to sell out Jesus.</p>
          <p>⚠️ They get there one small, unseen, unaddressed choice at a time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Jesus loved him until the very last second</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The sop at the table. The word friend in the garden.</p>
          <p>Jesus never stopped offering Judas a way out.</p>
          <p>
            ✅ Whatever you have done, the door is not shut on you while there is still breath in
            your lungs.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Sorrow alone cannot save you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas felt genuine guilt. He confessed the truth out loud.</p>
          <p>He just took that sorrow to the wrong place.</p>
          <p>📌 Real repentance always runs toward Christ, not away from everyone who could help.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. You are not a puppet in someone else&apos;s script</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus knew the betrayal was coming. The scripture had spoken of it in advance.</p>
          <p>And Jesus still said, &quot;woe unto that man by whom the Son of man is betrayed&quot; (Matthew 26:24).</p>
          <p>⚠️ Knowing what you will choose does not make the choice any less yours.</p>
          <p>
            Do not hide behind the idea that you are just doing what you were always going to do
            anyway. Judas never used that excuse, and Scripture never offers it to him either.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Judas&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 26:15</h3>
        <VerseQuote
          text="And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver."
          reference="Matthew 26:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas did not get talked into this. He walked up and asked the price.</p>
          <p>Thirty pieces, the price Exodus set for a slave, not a king.</p>
          <p>📌 Sin always talks you into a bargain that is smaller than what you are actually giving up.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 13:27</h3>
        <VerseQuote
          text="And after the sop Satan entered into him. Then said Jesus unto him, That thou doest, do quickly."
          reference="John 13:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He had already agreed to the deal. This was the moment he handed the wheel over completely.</p>
          <p>💡 You do not have to be possessed by evil to start down that road. You just have to keep opening the door.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 26:24</h3>
        <VerseQuote
          text="The Son of man goeth as it is written of him: but woe unto that man by whom the Son of man is betrayed! it had been good for that man if he had not been born."
          reference="Matthew 26:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus said this out loud, at the table, before Judas had even left the room.</p>
          <p>He named the weight of it plainly, and He still did not throw Judas out.</p>
          <p>⚠️ God&apos;s plan moving forward never excuses a man from his own choices.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 22:48</h3>
        <VerseQuote
          text="But Jesus said unto him, Judas, betrayest thou the Son of man with a kiss?"
          reference="Luke 22:48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He used his name. Face to face, in the exact moment of the betrayal.</p>
          <p>📌 Jesus never stopped treating him as a person who was choosing this, not a stranger.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Acts 1:18-19</h3>
        <VerseQuote
          text="Now this man purchased a field with the reward of iniquity; and falling headlong, he burst asunder in the midst, and all his bowels gushed out."
          reference="Acts 1:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The money he took bought the field where his story ended.</p>
          <p>💡 Sin always promises a payout. It never tells you the full cost up front.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Judas</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Judas chosen by Jesus knowing he would betray Him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Jesus knew from early on that one of the twelve would betray Him, and He still chose
          Judas and sent him out to preach and heal like the rest. Scripture never hides this. Jesus&apos;
          foreknowledge did not force Judas to betray Him, and it did not stop Judas from being fully
          responsible for the choice he made.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Iscariot mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most scholars believe it points to Kerioth, a town in Judah, meaning Judas was &quot;a man
          of Kerioth.&quot; If that is correct, he was likely the only apostle from Judah rather than
          Galilee, which may have set him apart from the group even before anything went wrong.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Judas betray Jesus for only thirty pieces of silver?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not give a single motive. It shows a man already stealing from the money bag
          and already resentful enough to object to an act of worship toward Jesus. Whether it was
          greed, disappointment that Jesus would not seize political power, or both, the text leaves
          the deeper why unanswered and simply shows what he did. What it does tell us plainly is
          that he was already a thief before the offer ever came, which means greed had a long head
          start on whatever else was going on in his heart.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Judas ever really love Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He followed Him for three years, preached in His name, and was devastated enough at the end
          to take his own life. Something in him was real. But following and serving are not the same
          as surrendering your heart, and his story is the clearest warning in Scripture that the two
          can look identical from the outside for a long time. You can preach, heal, and travel with
          Jesus for years and still be unwilling to let Him own the one thing you have quietly decided
          is yours.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between Judas&apos;s sorrow and Peter&apos;s repentance?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both men wept. Both men had failed Jesus badly in the same week. Peter took his sorrow back
          to the other disciples and to Jesus Himself, and was restored. Judas took his sorrow to the
          men who had paid him, found no comfort there, and had nowhere left to turn. The sorrow was
          similar. Where each man carried it was not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the thirty pieces of silver?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judas threw the coins down in the temple before his death. The chief priests, unwilling to
          put blood money in the treasury, used it to buy a burial field for strangers, which became
          known as the field of blood. Matthew connects this to an old prophecy about thirty pieces of
          silver given for a potter&apos;s field (Matthew 27:9 and 10), the same kind of detail Scripture
          had already laid out centuries before anyone involved was born.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Judas in hell?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus called him &quot;the son of perdition&quot; and said it would have been good for him
          if he had not been born, which is sober, serious language. Scripture does not spell out a
          final verdict in those exact words, and this question deserves more than a single line, so
          read{" "}
          <ArticleLink href="/blog/what-is-hell">what the Bible actually says about hell</ArticleLink>{" "}
          for the fuller picture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who replaced Judas as the twelfth apostle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A man named Matthias. After Judas&apos;s death, the believers in Jerusalem prayed and cast
          lots between two candidates who had followed Jesus from the beginning, and Matthias was
          numbered with the eleven remaining apostles. The gap Judas left behind did not stay open.
          God simply filled it with someone willing to finish the work.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">If Jesus knew Judas would fall, was Judas ever really free to choose otherwise?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is one of the hardest questions in the whole story, and honest Christians land in
          different places on how God&apos;s knowledge and human choice fit together. What Scripture
          itself insists on is simpler: Jesus still called Judas responsible for the choice, calling
          it &quot;woe&quot; to him specifically, which means Judas was never treated as a puppet with
          no real say in the matter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jesus still call Judas &quot;friend&quot; at the arrest?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the offer of relationship never closed on Jesus&apos; side. Even as the kiss landed
          and the soldiers moved in, Jesus spoke to Judas as a person He still loved, not as an enemy
          He had written off. The door stayed open until Judas himself walked through it the other
          way.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas&apos;s story is not really about a man two thousand years ago.</p>
          <p>
            ❓ <strong>It is about how close someone can get to Jesus, and still walk away.</strong>
          </p>
          <p>He did not fall in a single moment. He drifted there, one small compromise at a time.</p>
          <p>He felt real sorrow when it was over, and the sorrow alone could not save him.</p>
          <p>And right up to the very last second, Jesus still called him friend.</p>
          <p>
            That is the part worth sitting with. Not the ending. The door that stayed open the entire
            time.
          </p>
          <p>
            📌 <strong>Being near Jesus is not the same as belonging to Him. Only you can close that
            gap.</strong>
          </p>
          <p>
            Read John 13 tonight and watch how patient Jesus was with Judas, right up until Judas
            chose to leave. Then ask yourself honestly, the same question every disciple asked at that
            table: Lord, is it I?
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
