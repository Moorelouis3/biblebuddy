import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-joseph", {
  title: "Who Was Joseph? From the Pit to the Palace",
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

export default function WhoWasJosephPage() {
  return (
    <BlogPostShell
      slug="who-was-joseph"
      title={<>📖 Who Was Joseph? From the Pit to the Palace</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody you trusted turned on you.</p>
            <p>A door you did not deserve got slammed shut anyway.</p>
            <p>And now you are sitting in a season that makes no sense, wondering if God even sees it.</p>
            <p>
              📌 <strong>That is exactly where the story of Joseph in the Bible starts. A favorite
              son, thrown in a pit by his own brothers, and sold like property.</strong>
            </p>
            <p>
              If you have ever typed &quot;who was Joseph in the Bible&quot; into your phone, you
              are probably not just curious about ancient history.
            </p>
            <p>You want to know if betrayal has to be the end of your story too.</p>
            <p>Maybe it was not brothers. Maybe it was a coworker, a friend, or someone in your own family.</p>
            <p>
              Maybe what got taken from you was not a coat. It was your reputation, your marriage,
              or years you cannot get back.
            </p>
            <p>Whatever it was, you know what it feels like to wait on a God who feels quiet.</p>
            <p>
              This is the full story, told in order, straight from Genesis. The dreams. The pit.
              Potiphar&apos;s house. The prison. The rise to power no one saw coming. The brothers who
              came back not once but twice. And the moment Joseph looked his own betrayers in the
              face and chose forgiveness instead of revenge.
            </p>
            <p>Let&apos;s walk through it together.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Joseph Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph was one of the twelve sons of Jacob, the patriarch also called Israel.</p>
          <p>
            His mother was Rachel, the wife Jacob loved most, though he had first been tricked into
            marrying her older sister <ArticleLink href="/blog/who-is-leah">Leah</ArticleLink>.
            Joseph was born to Rachel late in Jacob&apos;s life, which is why he was the favorite.
            Not because he was the youngest.
          </p>
          <p>
            📌 A lot of retellings get that wrong. Benjamin, Joseph&apos;s only full brother, was the
            actual youngest, and stayed home while the older brothers tended the flocks.
          </p>
          <p>
            Jacob had twelve sons total, born to four different women, and those twelve sons became
            the twelve tribes of Israel. That is how central this family is to the whole story of
            Scripture.
          </p>
          <p>
            This all happened in the patriarchal era, roughly the nineteenth century BC, generations
            before Israel was a nation or Moses was born. Egypt at the time was already a wealthy,
            organized kingdom, which is exactly why a famine back home could send an entire family
            there for grain.
          </p>
          <p>
            His story runs from <strong>Genesis 37</strong> through <strong>Genesis 50</strong>, which
            makes it the longest single narrative about one person in the whole book of Genesis. He
            was seventeen when it turns dark, and would not see his father again for over twenty
            years.
          </p>
          <p>💡 That is roughly a fifth of an average lifetime, spent waiting on a reunion he could not schedule.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Joseph&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Dreams That Made His Brothers Hate Him</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jacob loved Joseph more than his other sons.</p>
          <p>Scripture tells you exactly why, and exactly what he did about it.</p>
        </div>
        <VerseQuote
          text="Now Israel loved Joseph more than all his children, because he was the son of his old age: and he made him a coat of many colours. And when his brethren saw that their father loved him more than all his brethren, they hated him, and could not speak peaceably unto him."
          reference="Genesis 37:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the order. The favoritism came first. The hatred followed.</strong>
          </p>
          <p>Then Joseph made it worse. He had a dream and told it to them anyway.</p>
        </div>
        <VerseQuote
          text="And Joseph dreamed a dream, and he told it his brethren: and they hated him yet the more. And he said unto them, Hear, I pray you, this dream which I have dreamed: For, behold, we were binding sheaves in the field, and, lo, my sheaf arose, and also stood upright; and, behold, your sheaves stood round about, and made obeisance to my sheaf. And his brethren said to him, Shalt thou indeed reign over us? or shalt thou indeed have dominion over us? And they hated him yet the more for his dreams, and for his words."
          reference="Genesis 37:5 through 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then came a second dream, the sun, moon, and eleven stars bowing to him, and even his
            father rebuked him for it. Joseph was not tactful here, and that does not excuse what
            happened next, but it is part of the honest picture.
          </p>
          <p>
            ⚠️ A gift from God is not the same as permission to lord it over people. Joseph would
            need years to learn the difference.
          </p>
          <p>By the time his brothers saw him coming across the field, they had a plan.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Sold Into Slavery, Faithful in Potiphar&apos;s House</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            His brothers stripped him of his coat and threw him into an empty pit. Reuben quietly
            planned to rescue him later, but Judah had a different idea.
          </p>
          <p>They sat down to eat while their brother screamed from a hole in the ground.</p>
        </div>
        <VerseQuote
          text="Then there passed by Midianites merchantmen; and they drew and lifted up Joseph out of the pit, and sold Joseph to the Ishmeelites for twenty pieces of silver: and they brought Joseph into Egypt."
          reference="Genesis 37:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Twenty pieces of silver, not thirty. That is often confused with the thirty pieces
            Judas later took to betray Jesus, but Scripture keeps the two separate.
          </p>
          <p>Joseph ended up a slave in the house of Potiphar, an Egyptian official. And Scripture says something remarkable right in the middle of that loss.</p>
        </div>
        <VerseQuote
          text="And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian."
          reference="Genesis 39:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Not after Joseph got promoted. In the house of a slave owner. God&apos;s presence did
            not wait for his circumstances to improve. It was already there.
          </p>
          <p>Joseph rose to run Potiphar&apos;s whole household. Then it fell apart again.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Falsely Accused and Forgotten in Prison</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Potiphar&apos;s wife tried repeatedly to pull Joseph into bed with her. He refused every
            time, with no one watching but God. If you carry scars from someone else&apos;s
            wrongdoing in this exact area,{" "}
            <ArticleLink href="/blog/how-god-heals-a-lust-damaged-heart">
              God heals a lust damaged heart
            </ArticleLink>{" "}
            just like He kept Joseph&apos;s. One day she grabbed his garment as he fled, and used it
            as evidence against him.
          </p>
          <p>Joseph did nothing wrong and lost everything anyway. He was thrown into prison, and once again, Scripture repeats the same line on purpose.</p>
        </div>
        <VerseQuote
          text="But the LORD was with Joseph, and shewed him mercy, and gave him favour in the sight of the keeper of the prison."
          reference="Genesis 39:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sold unfairly, God was with him. Accused unfairly, God was with him.</p>
          <p>
            📌 <strong>God&apos;s presence was not a reward for Joseph&apos;s circumstances
            improving. It was the constant underneath every single one of them.</strong>
          </p>
          <p>
            Two of Pharaoh&apos;s officers landed in that same prison, his chief cupbearer and his
            chief baker, and both had unsettling dreams on the same night. Joseph correctly told each
            man what his dream meant. The cupbearer would be restored to his post. The baker would
            not.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass the third day, which was Pharaoh's birthday, that he made a feast unto all his servants: and he lifted up the head of the chief butler and of the chief baker among his servants. And he restored the chief butler unto his butlership again; and he gave the cup into Pharaoh's hand: But he hanged the chief baker: as Joseph had interpreted to them."
          reference="Genesis 40:20 through 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph had asked the cupbearer for one favor. Just mention me to Pharaoh.</p>
        </div>
        <VerseQuote
          text="Yet did not the chief butler remember Joseph, but forgat him."
          reference="Genesis 40:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Right answer. Right man. Forgotten anyway. Two more years would pass in that cell
            before anyone remembered him.
          </p>
          <p>
            If you have ever asked why a good and faithful season still leads to more waiting,{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why God allows suffering
            </ArticleLink>{" "}
            is a question Joseph lived inside a prison cell, not just a question he answered from a
            palace later.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. From the Prison to Pharaoh&apos;s Right Hand</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eventually Pharaoh had two troubling dreams no one could explain, and the cupbearer
            finally remembered Joseph. Pulled from prison to stand before the king, Joseph gave God
            the credit, then said what the dreams meant: seven years of plenty in Egypt, followed by
            seven years of severe famine.
          </p>
          <p>Pharaoh&apos;s response was immediate.</p>
        </div>
        <VerseQuote
          text="And Pharaoh said unto Joseph, Forasmuch as God hath shewed thee all this, there is none so discreet and wise as thou art: Thou shalt be over my house, and according unto thy word shall all my people be ruled: only in the throne will I be greater than thou."
          reference="Genesis 41:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph went from a prison cell to the most powerful man in the nation, apart from the
            king, in a single day. He was thirty years old. Thirteen years had passed since the pit.
          </p>
          <p>
            Pharaoh gave Joseph an Egyptian name and a wife named Asenath, the daughter of an Egyptian
            priest. Two sons were born to them before the famine hit, Manasseh and Ephraim, and Joseph
            named them in a way that tells you exactly where his heart was.
          </p>
          <p>
            💡 God did not rush Joseph&apos;s story to protect him from thirteen hard years. He was
            present in every one of them, working toward something Joseph could not yet see.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Two Trips to Egypt: The Silver, the Cup, and Judah&apos;s Plea</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The famine reached Canaan, and Jacob sent ten of his sons to Egypt for grain. Only
            Benjamin stayed home. Jacob was not risking his last son from Rachel on the road.
          </p>
          <p>
            The ten brothers bowed before the governor of Egypt, exactly like Joseph&apos;s teenage
            dream, not recognizing the brother they had sold. He recognized them instantly, and
            spoke to them through an interpreter as though he did not.
          </p>
          <p>
            He accused them of being spies. He held them under guard for three days, then kept Simeon
            as a hostage and sent the rest home with grain, on one condition. Bring back your youngest
            brother, or do not come back at all.
          </p>
          <p>
            Then, without telling them, Joseph had his servants slip their silver back into their own
            sacks. On the road home, one brother opened his sack to feed his donkey and found it.
          </p>
        </div>
        <VerseQuote
          text="And he said unto his brethren, My money is restored; and, lo, it is even in my sack: and their heart failed them, and they were afraid, saying one to another, What is this that God hath done unto us?"
          reference="Genesis 42:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Ten men who once sold their brother for silver were now terrified of silver showing up
            where they did not put it. Guilt reads danger into everything.
          </p>
          <p>
            Jacob refused at first to let Benjamin go. He had already lost Joseph, he said, and he
            would not lose Rachel&apos;s last son too. Reuben tried first, offering his own two sons
            as a guarantee, but Jacob still said no. Only when the famine grew worse, and Judah
            personally guaranteed Benjamin&apos;s safety with his own life, did Jacob relent. If
            handing over a child you are afraid to lose sounds familiar,{" "}
            <ArticleLink href="/blog/could-you-sacrifice-your-isaac">
              could you sacrifice your Isaac
            </ArticleLink>{" "}
            asks the same question from Abraham&apos;s side of it.
          </p>
          <p>
            The brothers returned to Egypt with Benjamin, double the money, and a gift for the
            governor. Joseph saw Benjamin, his only full brother, and had to leave the room to weep
            in private before he could compose himself and host them at a feast. He seated them in
            exact birth order, which none of them could explain.
          </p>
          <p>
            📌 <strong>Then Joseph set a final test, and it was not about money. It was about
            whether his brothers had actually changed.</strong>
          </p>
          <p>He instructed his steward to hide his own silver cup in the mouth of Benjamin&apos;s sack.</p>
        </div>
        <VerseQuote
          text="And he commanded the steward of his house, saying, Fill the men's sacks with food, as much as they can carry, and put every man's money in his sack's mouth. And put my cup, the silver cup, in the sack's mouth of the youngest, and his corn money. And he did according to the word that Joseph had spoken."
          reference="Genesis 44:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Money is not evil on its own, but watch how much of this whole episode turns on it, silver
            paid for Joseph, silver returned in secret, silver planted to test loyalty. If that theme
            catches your attention,{" "}
            <ArticleLink href="/blog/is-wanting-money-a-sin">is wanting money a sin</ArticleLink>{" "}
            is worth reading alongside this story.
          </p>
          <p>
            The brothers had barely left the city when Joseph&apos;s steward caught up with them and
            accused them of stealing the cup. They denied it so confidently that they offered death
            for whoever was guilty. The cup turned up in Benjamin&apos;s sack.
          </p>
          <p>They tore their clothes and went back to face Joseph together.</p>
          <p>
            This is the moment the entire story pivots on. Judah, the same brother who once suggested
            selling Joseph for silver, stepped forward and offered himself in Benjamin&apos;s place.
          </p>
        </div>
        <VerseQuote
          text="Now therefore, I pray thee, let thy servant abide instead of the lad a bondman to my lord; and let the lad go up with his brethren. For how shall I go up to my father, and the lad be not with me? lest peradventure I see the evil that shall come on my father."
          reference="Genesis 44:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The brother who sold Joseph into slavery now offered to become a slave
            himself, to spare his father a grief he once caused on purpose.</strong>
          </p>
          <p>💡 That is what real change looks like. Not a promise. A man willing to pay the same price he once made someone else pay.</p>
          <p>Joseph could not hold back any longer.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. &quot;I Am Joseph Your Brother&quot;</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph sent every Egyptian out of the room. Then he broke.</p>
        </div>
        <VerseQuote
          text="And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt. Now therefore be not grieved, nor angry with yourselves, that ye sold me hither: for God did send me before you to preserve life."
          reference="Genesis 45:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He wept so loudly the whole palace heard it.</p>
          <p>
            📌 <strong>He did not lead with the wrong done to him. He led with grace.</strong>
          </p>
          <p>Joseph brought his whole family, seventy people, down to Egypt to live through the famine.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. &quot;Ye Thought Evil, But God Meant It Unto Good&quot;</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Years later, Jacob died. And Joseph&apos;s brothers panicked.</p>
          <p>
            They assumed Joseph had only been kind to them because their father was alive to see
            it. Now that he was gone, fear told them the revenge they deserved was finally coming.
          </p>
          <p>They came to Joseph, bowed down, and begged for mercy.</p>
          <p>Joseph&apos;s answer is the verse the whole story has been building toward.</p>
        </div>
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what Joseph does not say. He does not say the evil never happened, or that it did not cost him something real.</p>
          <p>He holds both things at once. What you did was evil. And God used it for good.</p>
          <p>
            💡 That is not the same as saying God caused the brothers to sin. It means God is
            skilled enough to work His purposes even through what other people mean for harm.
          </p>
          <p>
            This overview only scratches the surface of Genesis 37 through 50. Inside{" "}
            <strong>Bible Buddy</strong>, you can walk through Joseph&apos;s whole life verse by
            verse, completely free.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Joseph&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God&apos;s presence is not tied to your circumstances</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Slave or prisoner, ruler or forgotten man, the LORD was with Joseph the whole time.</p>
          <p>❓ Where do you assume God is absent simply because things are hard right now?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Integrity in private seasons matters</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nobody was watching Joseph refuse Potiphar&apos;s wife except God, and he stayed faithful in a moment that cost him, long before anyone rewarded it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Testing someone is not the same as refusing to forgive them</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph did not reveal himself the moment he saw his brothers bow.</p>
          <p>He watched for proof that they had changed before he trusted them with the truth.</p>
          <p>📌 Wisdom and forgiveness can move at the same time, at different speeds.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. God can turn a person&apos;s worst instinct into its opposite</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah once suggested selling his own brother for silver.</p>
          <p>Years later he offered his own freedom to save a different brother.</p>
          <p>Nobody forced that change on him. It happened somewhere in the years no one wrote down.</p>
          <p>💡 The same man, the same family, and a completely different heart. That is what time under God can do to a person.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Forgiveness does not require pretending nothing happened</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joseph named the evil plainly, then forgave without minimizing what was done
            to him. Real forgiveness can hold both truths.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Joseph&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 39:2</h3>
        <VerseQuote
          text="And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian."
          reference="Genesis 39:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 This is stated while Joseph is still enslaved. Prosperity here is not wealth. It is God&apos;s hand on a man in a place he never chose.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 41:39 and 40</h3>
        <VerseQuote
          text="And Pharaoh said unto Joseph, Forasmuch as God hath shewed thee all this, there is none so discreet and wise as thou art: Thou shalt be over my house, and according unto thy word shall all my people be ruled: only in the throne will I be greater than thou."
          reference="Genesis 41:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Even Pharaoh could see the wisdom in Joseph came from God, not from Joseph himself. 📌
            The higher God raises you, the more clearly He deserves the credit for it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 44:33 and 34</h3>
        <VerseQuote
          text="Now therefore, I pray thee, let thy servant abide instead of the lad a bondman to my lord; and let the lad go up with his brethren. For how shall I go up to my father, and the lad be not with me? lest peradventure I see the evil that shall come on my father."
          reference="Genesis 44:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judah&apos;s plea is the turning point of the whole story.</p>
          <p>He does not defend himself. He offers himself.</p>
          <p>💡 This is the same man who once profited off his brother&apos;s suffering, now willing to suffer so his father would not have to.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 45:7 and 8</h3>
        <VerseQuote
          text="And God sent me before you to preserve you a posterity in the earth, and to save your lives by a great deliverance. So now it was not you that sent me hither, but God: and he hath made me a father to Pharaoh, and lord of all his house, and a ruler throughout all the land of Egypt."
          reference="Genesis 45:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph puts God&apos;s hand above his brothers&apos; actions, without erasing that they did act.</p>
          <p>📌 It was not you. It was God. Both sentences are true, and Joseph says both.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 50:20</h3>
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The theme verse of Genesis. Two wills, working over the same events, do not cancel
            each other out. God&apos;s purpose stands over human evil without erasing human
            responsibility for it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Joseph</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Joseph the youngest son of Jacob?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, Benjamin was. Joseph was the favorite because he was born to Rachel in Jacob&apos;s old
          age, and that favoritism, not birth order, is what stirred his brothers&apos; jealousy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the coat of many colors?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a gift from Jacob to Joseph, described in Genesis 37:3 as a coat of many colours.
          Some scholars think the Hebrew phrase describes a coat with long sleeves rather than
          multiple colors, but either reading points to the same thing. It was a mark of status, and
          his brothers had to do the hard labor while Joseph did not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many pieces of silver was Joseph sold for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Twenty, according to Genesis 37:28. That is often confused with the thirty pieces of
          silver Judas was later paid to betray Jesus, but Scripture keeps the two figures distinct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Joseph marry an Egyptian?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Pharaoh gave Joseph a wife named Asenath, the daughter of Potipherah, a priest of On,
          recorded in Genesis 41:45. Their two sons, Manasseh and Ephraim, were both later counted
          as full tribes of Israel, which is a remarkable thing for the sons of an Egyptian mother.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joseph test his brothers before revealing himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not give his private reasoning, but the test lines up with what mattered
          most to him. Had his brothers changed, or would they abandon Benjamin the way they once
          abandoned him? Judah&apos;s offer to become a slave in Benjamin&apos;s place answered that
          question, and Joseph revealed himself right after hearing it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joseph forgive his brothers?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because he saw God&apos;s hand in what they meant for evil, stated plainly in Genesis 50:20.
          Joseph never says what they did was acceptable. He says God was bigger than what they did.
          That distinction is what let him forgive without pretending nothing happened.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Joseph&apos;s family after Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob and all seventy of his family members settled in the land of Goshen in Egypt, where
          they multiplied for generations. Joseph lived to see his own great grandchildren born on his
          knees. That growing family eventually became the enslaved nation that God delivered through
          Moses in the exodus, centuries later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long was Joseph a slave and prisoner in Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          About thirteen years. Joseph was seventeen when his brothers sold him and thirty when he
          stood before Pharaoh, according to Genesis 37:2 and 41:46.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Joseph when he died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          One hundred and ten years old, according to Genesis 50:26. Before he died he made his
          family promise to carry his bones out of Egypt when God eventually brought them into the
          promised land, a promise{" "}
          <ArticleLink href="/blog/moses">Moses</ArticleLink> and Israel kept generations later
          during the exodus.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph&apos;s story is not really about a coat, or a pit, or even a throne.</p>
          <p>
            📌 <strong>It is about a God who does not waste seasons, even the ones that make no
            sense at the time. And a man who stayed faithful in a slave&apos;s house, a prison
            cell, and a palace, because his character was never up for negotiation.</strong>
          </p>
          <p>
            It is also about Judah, who took the longest road of anyone in this story, from selling
            a brother for silver to offering his own life for a different one. If a man like that
            can change, nobody reading this is stuck for good either.
          </p>
          <p>
            You may not be in a pit or a prison. But you may be in a season you did not choose and
            cannot explain. Joseph&apos;s life says that season is not empty. God is present in it,
            even now.
          </p>
          <p>
            Read Genesis 37 through 50 for yourself this week, and watch how one man&apos;s worst
            days became the very thing that saved a nation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph&apos;s full story runs fourteen chapters, from Genesis 37 to Genesis 50, and it
            rewards a slow read. If you are not sure where to start,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>{" "}
            walks you through it.
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
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
