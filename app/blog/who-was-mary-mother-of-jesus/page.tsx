import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-mary-mother-of-jesus", {
  title: "Who Was Mary, the Mother of Jesus? The Woman God Chose to Carry His Son",
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

export default function WhoWasMaryMotherOfJesusPage() {
  return (
    <BlogPostShell
      slug="who-was-mary-mother-of-jesus"
      title={<>📖 Who Was Mary, the Mother of Jesus? The Woman God Chose to Carry His Son</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>She was probably a teenager.</p>
            <p>No army, no title, no wealth.</p>
            <p>And an angel showed up and asked her to carry the Son of God in her own body.</p>
            <p>
              📌 <strong>Mary said yes before she had a single answer to how it would work or what
              it would cost her.</strong>
            </p>
            <p>Think about what that yes actually meant.</p>
            <p>An unmarried, pregnant girl in a small town where everyone would count the months.</p>
            <p>A fiance who could have walked away and been fully within his rights.</p>
            <p>Whispers she would carry for the rest of her life.</p>
            <p>And that was just the beginning of the cost.</p>
            <p>
              Years later she would stand at the foot of a cross and watch that same son die a
              criminal&apos;s death in front of her.
            </p>
            <p>
              This is the full story of Mary, the mother of Jesus, walked through in order, straight
              from Scripture. The angel&apos;s visit. Her trip to see her cousin Elizabeth. Joseph&apos;s
              fear and the angel who calmed it. The birth in Bethlehem. A warning from an old man in
              the temple that should have stopped her heart. A wedding where she pushed her son
              toward his first miracle. And the day she stood watching Him die.
            </p>
            <p>Let&apos;s meet her.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Mary Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary was a young Jewish girl, most likely still a teenager, from a small town called Nazareth in Galilee.</p>
          <p>Nazareth was not an important place. It was small enough that people from other towns joked about it.</p>
          <p>She was engaged to a man named Joseph, a carpenter, also from Nazareth.</p>
          <p>
            📌 Her family was poor. We know this because of a small detail later in her story. When
            Jesus was dedicated at the temple, Mary and Joseph offered two turtledoves, which the
            law allowed only for families who could not afford a lamb (Luke 2:24).
          </p>
          <p>So this was not a wealthy or powerful family. This was an ordinary poor family in an unimportant town.</p>
          <p>
            💡 That detail matters. God did not choose a princess or a priest&apos;s daughter to
            carry His Son into the world. He chose a poor teenage girl nobody had heard of.
          </p>
          <p>
            Her story begins in Luke chapter 1 and runs all the way through Acts chapter 1, which
            covers her entire adult life, from a teenager receiving impossible news to a grieving
            mother watching her son ascend into heaven.
          </p>
          <p>Now let&apos;s walk through what actually happened to her, in order.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Mary&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. An Angel Comes to Nazareth</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The angel Gabriel, the same angel who had already visited a priest named Zacharias, was
            sent by God to Nazareth. He came to a virgin engaged to a man named Joseph.
          </p>
        </div>
        <VerseQuote
          text="And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women."
          reference="Luke 1:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary was troubled by this. Scripture says she wondered what kind of greeting this even was.</p>
          <p>
            ⚠️ Notice her first reaction was not excitement. It was fear and confusion. That is a
            normal, human response to something this enormous, and the Bible does not hide it.
          </p>
          <p>Gabriel told her not to be afraid, and then he told her why.</p>
        </div>
        <VerseQuote
          text="And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS. He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end."
          reference="Luke 1:31 to 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary did not doubt God. But she did ask a very honest, very practical question.</p>
        </div>
        <VerseQuote
          text="Then said Mary unto the angel, How shall this be, seeing I know not a man?"
          reference="Luke 1:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ That is a fair question from a teenage girl who was not yet married. She was not
            arguing with God. She was asking how something biologically impossible could happen.
          </p>
          <p>Gabriel answered plainly. The Holy Ghost would come upon her. This would be a miracle, not a normal pregnancy.</p>
          <p>Then Mary gave the answer that changed everything.</p>
        </div>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Be it unto me according to thy word. That is one of the bravest sentences in
            the entire Bible.</strong>
          </p>
          <p>
            She had no idea yet how Joseph would react, what her neighbors would say, or what this
            child&apos;s life would eventually cost her. She said yes anyway.
          </p>
          <p>
            If fear ever makes you want to say no to something God is clearly asking of you, it can
            help to read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>
            . Mary felt it too, and she moved forward regardless.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Mary Visits Elizabeth and Sings Her Song</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gabriel had told Mary something else in that same visit. Her relative Elizabeth, who was
            considered too old to have children, was six months pregnant.
          </p>
          <p>Mary got up and traveled to the hill country to see her.</p>
          <p>
            The moment Mary greeted her, Elizabeth&apos;s baby, who would grow up to be John the
            Baptist, leaped inside her. Elizabeth was filled with the Holy Ghost and called Mary
            blessed among women.
          </p>
          <p>Mary responded with a song of praise that has been read and sung by believers for two thousand years.</p>
        </div>
        <VerseQuote
          text="And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour. For he hath regarded the low estate of his handmaiden: for, behold, from henceforth all generations shall call me blessed. For he that is mighty hath done to me great things; and holy is his name."
          reference="Luke 1:46 to 49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the second line. Mary calls God her Saviour. A woman about to give birth to
            the Savior of the world still needed saving herself. She never claimed to be sinless.
          </p>
          <p>
            📌 <strong>Notice also her low estate. She does not describe herself as important or
            deserving. She describes herself as poor and overlooked, and God still chose her.</strong>
          </p>
          <p>Mary stayed with Elizabeth about three months before returning home to Nazareth.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joseph&apos;s Fear and the Angel Who Calmed It</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            While Mary was engaged to Joseph, and before they had come together as husband and wife,
            she was found to be pregnant.
          </p>
          <p>Put yourself in Joseph&apos;s place for a moment. He knew this child was not his.</p>
          <p>
            ⚠️ In that culture, he had every legal right to publicly shame her and end the
            engagement. Under the law, unfaithfulness during an engagement was treated as serious as
            adultery.
          </p>
          <p>But Scripture tells us something important about his character first.</p>
        </div>
        <VerseQuote
          text="Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily."
          reference="Matthew 1:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He planned to quietly end things rather than expose her to public shame. Then God intervened.</p>
        </div>
        <VerseQuote
          text="But while he thought on these things, behold, the angel of the LORD appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost. And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins."
          reference="Matthew 1:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph obeyed immediately and took Mary as his wife.</p>
          <p>
            💡 Mary&apos;s yes to God required someone else to also have faith. Joseph could have
            protected himself and walked away. Instead he trusted God over his own reputation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Birth in Bethlehem and a Sword Prophesied</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A Roman census forced Joseph and Mary to travel from Nazareth to Bethlehem, the city
            where King David had come from, because Joseph belonged to David&apos;s family line.
          </p>
          <p>Mary made that long journey while, as Scripture puts it, great with child.</p>
        </div>
        <VerseQuote
          text="And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
          reference="Luke 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 No palace. No proper room. The King of kings was born in a place where animals were
            kept, because there was nowhere else for His mother to lay Him.
          </p>
          <p>
            Shepherds arrived that same night, saying angels had told them about the child. Mary
            took all of it in quietly.
          </p>
        </div>
        <VerseQuote text="But Mary kept all these things, and pondered them in her heart." reference="Luke 2:19" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 She did not fully understand everything happening around her son. She held onto it
            and thought about it, which is often exactly what faith looks like in the middle of
            something you cannot fully explain.
          </p>
          <p>
            When Jesus was dedicated at the temple, a devout old man named Simeon, who had been told
            by God he would not die before seeing the Messiah, took the child in his arms and
            praised God. Then he turned to Mary directly and said something that must have landed
            like a stone.
          </p>
        </div>
        <VerseQuote
          text="And Simeon blessed them, and said unto Mary his mother, Behold, this child is set for the fall and rising again of many in Israel; and for a sign which shall be spoken against; (Yea, a sword shall pierce through thy own soul also,) that the thoughts of many hearts may be revealed."
          reference="Luke 2:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A sword shall pierce through thy own soul also. Simeon told a brand new
            mother, while she was still holding her newborn, that watching this child&apos;s life
            unfold would one day tear her heart open.</strong>
          </p>
          <p>
            That is not a comfortable word to receive at your baby&apos;s dedication. But it was
            true, and it came true. Every mother who has ever loved a child and feared for their
            future can find something of her own story in that verse. If suffering like this
            confuses you, it may help to read{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why God allows suffering
            </ArticleLink>{" "}
            alongside Mary&apos;s story.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Twelve Years Old and Lost for Three Days</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every year Mary and Joseph traveled to Jerusalem for the Passover feast. When Jesus was
            twelve, they made the trip as usual.
          </p>
          <p>On the way home, they realized Jesus was not with the group. He had stayed behind in Jerusalem, and they had not noticed.</p>
          <p>
            ⚠️ Picture that panic. A missing twelve year old, in a large city, with no way to call
            or text anyone.
          </p>
          <p>They searched for three full days before they found him in the temple.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that after three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions."
          reference="Luke 2:46"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Mary saw him, relief and frustration came out together.</p>
        </div>
        <VerseQuote
          text="And when they saw him, they were amazed: and his mother said unto him, Son, why hast thou thus dealt with us? behold, thy father and I have sought thee sorrowing."
          reference="Luke 2:48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus answered in a way that neither of them fully understood at the time.</p>
        </div>
        <VerseQuote
          text="And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?"
          reference="Luke 2:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Even here, Mary did not have every answer. Scripture simply says she kept these
            sayings in her heart. Faith did not mean she understood everything about her son. It
            meant she kept trusting even when she did not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. A Wedding, an Empty Cup, and a Word to the Servants</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years later, Mary was a guest at a wedding in a town called Cana. Jesus and His
            disciples were also invited.
          </p>
          <p>Partway through the celebration, the wine ran out, which would have been a serious embarrassment for the family hosting.</p>
        </div>
        <VerseQuote
          text="And when they wanted wine, the mother of Jesus saith unto him, They have no wine."
          reference="John 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus answered in a way that sounds distant on the page, saying His hour had not yet come.</p>
          <p>
            📌 Mary did not argue with Him or push further. She simply turned to the servants and
            said one of the most quoted lines in her entire story.
          </p>
        </div>
        <VerseQuote text="His mother saith unto the servants, Whatsoever he saith unto you, do it." reference="John 2:5" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Whatsoever he saith unto you, do it. That sentence is not just wedding advice. It is
            Mary&apos;s entire approach to her son summed up in six words.
          </p>
          <p>
            Jesus went on to turn six large stone jars of water into wine, the first miracle Scripture
            records Him performing, and His disciples believed on Him because of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Standing at the Cross</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now come to the hardest scene in Mary&apos;s entire life.</p>
          <p>
            Years after the wedding at Cana, Mary stood near the cross where her son was being
            executed as a criminal.
          </p>
          <p>
            ⚠️ Simeon&apos;s sword had finally arrived. Everything he warned her about, decades
            earlier, was happening in front of her eyes.
          </p>
        </div>
        <VerseQuote
          text="Now there stood by the cross of Jesus his mother, and his mother's sister, Mary the wife of Cleophas, and Mary Magdalene."
          reference="John 19:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Even while He was dying, Jesus looked down and thought of His mother&apos;s future. He
            saw her standing near John, the disciple He loved.
          </p>
        </div>
        <VerseQuote
          text="When Jesus therefore saw his mother, and the disciple standing by, whom he loved, he saith unto his mother, Woman, behold thy son! Then saith he to the disciple, Behold thy mother! And from that hour that disciple took her unto his own home."
          reference="John 19:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In the middle of the worst suffering of His life, Jesus made sure His mother
            would be cared for.</strong>
          </p>
          <p>
            John took her in from that hour. Mary, who had once been told her soul would be pierced,
            watched it happen in the most public and painful way possible, and Jesus still made
            provision for her before He died.
          </p>
          <p>
            Her story does not end at the cross. After Jesus rose and ascended into heaven, Mary is
            mentioned one final time, gathered with the apostles in an upper room in Jerusalem.
          </p>
        </div>
        <VerseQuote
          text="These all continued with one accord in prayer and supplication, with the women, and Mary the mother of Jesus, and with his brethren."
          reference="Acts 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The last picture Scripture gives us of Mary is not grief. It is a woman still praying,
            still gathered with believers, still faithful, years after that first impossible yes.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Mary&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God often chooses the person nobody would expect</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary was young, poor, and from a town nobody respected.</p>
          <p>📌 God did not need status or wealth to accomplish His biggest plan. He needed a willing heart.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Saying yes to God can cost you before it blesses you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary&apos;s yes brought shame, risk, and years of grief before it brought glory.</p>
          <p>⚠️ Obedience is not a guarantee of an easy road. It is a guarantee that God is with you on the hard one.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. You can trust God without understanding everything</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Twice Scripture tells us Mary pondered things in her heart rather than fully grasping
            them. She trusted before she understood, not after.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Faithful obedience often looks small and quiet</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Whatsoever he saith unto you, do it. Mary did not perform the miracle at Cana. She simply
            pointed people toward Jesus and stepped back.
          </p>
          <p>💡 You do not have to be the one with the power. You just have to point people toward the One who has it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God sees the pain He allows in your life</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus was dying in agony, and He still stopped to arrange care for His mother. Nothing
            about her suffering was invisible to Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Faith can survive even the deepest grief</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The last picture of Mary in Scripture is not a woman broken by watching her son die. It
            is a woman still praying with the believers.
          </p>
          <p>📌 Grief and faith are not opposites. Mary carried both at once, all the way to the end of her story.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Mary&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:38</h3>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the moment Mary agreed to a plan she could not fully see the end of.</p>
          <p>She had questions answered, but not every detail of what her life was about to become.</p>
          <p>She said yes anyway, and the whole story of Jesus&apos;s birth rests on that one sentence.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 1:47</h3>
        <VerseQuote text="And my spirit hath rejoiced in God my Saviour." reference="Luke 1:47" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary calls God her Saviour in the very same breath that she is announced as the mother of the Savior.</p>
          <p>She never claimed to be above needing rescue herself.</p>
          <p>That single word tells you exactly how she saw herself before God.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 2:35</h3>
        <VerseQuote
          text="(Yea, a sword shall pierce through thy own soul also,) that the thoughts of many hearts may be revealed."
          reference="Luke 2:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Spoken over a newborn, this warning would not come true for another thirty years.</p>
          <p>It is one of the earliest prophecies in Scripture about the grief the cross would cause.</p>
          <p>Mary carried this word quietly for decades before she watched it happen.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. John 2:5</h3>
        <VerseQuote text="His mother saith unto the servants, Whatsoever he saith unto you, do it." reference="John 2:5" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>These are Mary&apos;s last recorded words in Scripture.</p>
          <p>They are not about herself at all. They point every listener straight to her son.</p>
          <p>💡 A whole life of faith can be summed up in the direction you keep pointing other people.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 19:26 and 27</h3>
        <VerseQuote
          text="When Jesus therefore saw his mother, and the disciple standing by, whom he loved, he saith unto his mother, Woman, behold thy son! Then saith he to the disciple, Behold thy mother!"
          reference="John 19:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Even while dying, Jesus thought of His mother&apos;s wellbeing after He was gone.</p>
          <p>✅ This is a promise as much as a moment. God does not forget the people you love, even in your worst hour.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Mary</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Mary a virgin when Jesus was born?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Scripture is direct about this. Luke 1:34 records Mary herself asking how she could
          conceive since she knew not a man. Matthew 1:18 says she was found with child of the Holy
          Ghost before she and Joseph came together. Matthew 1:25 adds that Joseph knew her not till
          she had brought forth her firstborn son, meaning the pregnancy itself happened without a
          human father.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Mary have other children?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture names them plainly. Mark 6:3 lists Jesus as the son of Mary and names brothers
          James, Joses, Juda, and Simon, along with unnamed sisters. Matthew 1:25 also says Joseph
          knew her not till after Jesus was born, which most readers take as a natural implication
          that they had a normal marriage afterward. Some later traditions teach that Mary remained
          a virgin her whole life, but that is not something the Bible itself states.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it true Christians pray to Mary?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some Christian traditions, including Catholic and Orthodox believers, do direct prayers to
          Mary, usually asking her to pray on their behalf. The Bible itself never instructs anyone
          to pray to Mary, and it consistently shows prayer directed to God alone. Whatever your
          own church background, that is simply what Scripture does and does not say on the matter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Mary when Jesus was born?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible never gives her age. Based on the customs of that time and place, girls were
          often engaged in their early to mid teens, so most historians estimate she was somewhere
          around fourteen to sixteen. This is a reasonable historical guess, not a number Scripture
          states.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Mary stay a virgin for her whole life?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This idea, often called perpetual virginity, comes from later church tradition rather than
          the Bible itself. Scripture describes a normal marriage between Mary and Joseph after
          Jesus was born and names several other children. Christians disagree on how to read those
          details, but they are what the text plainly says.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Mary sinless?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some traditions teach that Mary was conceived without sin, an idea called the Immaculate
          Conception. Scripture does not teach this. In Luke 1:47, Mary herself calls God her
          Saviour, which is language a person uses when they need saving, not language someone
          without sin would need.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the word Magnificat mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Magnificat is simply the Latin word for magnify, taken from the opening line of Mary&apos;s
          song in Luke 1:46, My soul doth magnify the Lord. Over time, Christians started calling her
          whole song of praise by that name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Simeon say a sword would pierce Mary&apos;s soul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Simeon was prophesying the deep grief Mary would feel watching her son suffer and die. It
          was fulfilled years later when she stood near the cross and watched Jesus be executed. It
          is one of the earliest hints in the New Testament that the Messiah&apos;s path would
          involve suffering.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Mary after Jesus rose from the dead?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture mentions her one more time, in Acts 1:14, gathered with the apostles in Jerusalem
          in prayer after Jesus ascended into heaven. The Bible does not record anything about her
          life after that point.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where was Mary from?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nazareth, a small town in the region of Galilee. It was not considered an important or
          impressive place in that time. That such an ordinary town produced the mother of the
          Messiah fits a pattern seen throughout Scripture of God working through the overlooked.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary was never given an easy road.</p>
          <p>She was asked to carry something enormous, at great personal cost, with only partial answers.</p>
          <p>She said yes anyway, kept trusting when she did not understand, and stayed faithful all the way to a cross and beyond it.</p>
          <p>
            📌 <strong>God still works this same way. He asks ordinary, overlooked people to carry
            something bigger than themselves, and He is faithful to walk with them through the
            cost.</strong>
          </p>
          <p>
            📌 <strong>Faith does not require having every answer. It requires a willing heart, the
            same one Mary offered when she said, be it unto me according to thy word.</strong>
          </p>
          <p>
            Read Luke 1 and 2 for yourself this week and sit with how young and unready she must have
            felt. If you want a simple way to start reading Scripture like this on your own, take a
            look at{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> next.
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
          description="Mary's story is one of many. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
