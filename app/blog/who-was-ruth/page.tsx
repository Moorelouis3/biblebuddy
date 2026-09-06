import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-ruth", {
  title: "Who Was Ruth in the Bible? The Widow Who Refused to Leave",
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

export default function WhoWasRuthPage() {
  return (
    <BlogPostShell
      slug="who-was-ruth"
      title={<>📖 Who Was Ruth in the Bible? The Widow Who Refused to Leave</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ruth buried her husband while she was still a young woman.</p>
            <p>Before that season of grief was even over, she had also buried her brother in law and her father in law.</p>
            <p>She was a Moabite, a foreigner from a nation east of Israel, married into a Jewish family that had moved into her country to escape a famine.</p>
            <p>
              📌 <strong>When that family fell apart around her, she had every reason to go home to her own people, her own land, and her own gods.</strong>
            </p>
            <p>Instead she chose to follow her grieving, bitter mother in law back into a foreign land, with no husband, no children, and no promise that anyone there would ever accept her.</p>
            <p>Maybe you know a smaller version of that ache.</p>
            <p>A marriage that ended. A parent you buried too soon. A plan for your life that quietly fell apart and left you standing somewhere you never wanted to be, with nothing certain in front of you.</p>
            <p>
              ❓ <strong>When everything familiar is gone, what do you actually hold onto?</strong>
            </p>
            <p>Ruth&apos;s answer to that question became one of the most quoted lines in the whole Bible, and most people who quote it at weddings have no idea what it actually cost her to say it.</p>
            <p>
              This is the full story of Ruth in the Bible, told in order, straight from the book that carries her name. Her loss. Her vow. The fields where she gleaned grain just to eat. The man named Boaz who noticed her. And the surprising place her story ends up, deep inside the family line of Jesus.
            </p>
            <p>Let&apos;s start where her story actually starts.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Ruth Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ruth was a Moabite woman, born and raised in the nation of Moab, east of Israel across the Dead Sea.</p>
          <p>
            📌 That single fact matters more than most readers realize. Moab was not part of Israel. Its people worshiped other gods, and Israelites and Moabites did not usually marry each other.
          </p>
          <p>Ruth married a man named Mahlon, the son of an Israelite couple named Elimelech and Naomi who had moved to Moab during a famine back home in Bethlehem.</p>
          <p>Her entire story is told in one short book of the Bible, the book of Ruth, which sits between Judges and 1 Samuel.</p>
          <p>
            📌 Her story is set <strong>in the days when the judges ruled</strong>, a rough and lawless period in Israel&apos;s history, somewhere around 1100 BC.
          </p>
          <p>By the time her story opens, Ruth had already lost her father in law and was about to lose her husband too.</p>
          <p>
            💡 Keep this in mind as you read: everything Ruth does in this book, she does as an outsider with nothing to gain and everything to lose.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Ruth&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A Famine, a Move, and Three Empty Chairs</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The book of Ruth opens with hunger.</p>
          <p>A famine hit Bethlehem, a town whose name literally means house of bread. There was no bread in the house of bread.</p>
        </div>
        <VerseQuote
          text="Now it came to pass in the days when the judges ruled, that there was a famine in the land. And a certain man of Bethlehemjudah went to sojourn in the country of Moab, he, and his wife, and his two sons."
          reference="Ruth 1:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That man was Elimelech. His wife was Naomi. His two sons were Mahlon and Chilion.</p>
          <p>They left the promised land and sojourned, meaning they planned to stay temporarily, in Moab.</p>
          <p>
            ⚠️ Moab was not a random choice. Genesis records that the Moabites descended from Lot, and by this point in history the two nations were often enemies, not friends.
          </p>
          <p>Then, one after another, the men of the family started dying.</p>
        </div>
        <VerseQuote
          text="And Elimelech Naomi's husband died; and she was left, and her two sons. And they took them wives of the women of Moab; the name of the one was Orpah, and the name of the other Ruth: and they dwelled there about ten years. And Mahlon and Chilion died also both of them; and the woman was left of her two sons and her husband."
          reference="Ruth 1:3 to 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three men. Three deaths. Three widows left behind: Naomi, Orpah, and Ruth.</p>
          <p>
            ⚠️ <strong>In that culture, a widow with no husband and no sons had almost no way to provide for herself.</strong> No pension. No property of her own. No safety net.
          </p>
          <p>
            Naomi&apos;s grief here echoes a question that never fully goes away for anyone who has lost someone they love. If you have ever wondered why God allows this kind of suffering in the first place,{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why God allows suffering
            </ArticleLink>{" "}
            is worth reading alongside Naomi&apos;s story.
          </p>
          <p>Ruth was young, foreign, and now completely without the husband who had connected her to this family at all.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Whither Thou Goest</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Naomi heard that the famine back home had ended and decided to return to Bethlehem.</p>
          <p>She told her two daughters in law to go back to their own mothers, their own homes, and their own gods.</p>
          <p>
            📌 <strong>Naomi was not trying to guilt them into staying. She was releasing them, plainly and kindly, to go rebuild their lives.</strong>
          </p>
          <p>Orpah kissed Naomi goodbye and went back to her people. Nobody in Scripture criticizes her for it. It was the sensible choice.</p>
          <p>Ruth did something else entirely.</p>
        </div>
        <VerseQuote
          text="And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God:"
          reference="Ruth 1:16"
        />
        <VerseQuote
          text="Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me."
          reference="Ruth 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read those two verses slowly and notice what Ruth is actually giving up.</p>
          <p>Her nation. Her family. Her gods. Her chance at remarrying inside her own culture. Her entire future, handed over on a promise with no guarantee attached.</p>
          <p>
            📌 <strong>Thy people shall be my people, and thy God my God. That is not affection talking. That is a choice made with open eyes about the cost.</strong>
          </p>
          <p>Naomi had nothing left to offer her. No husband to give her, no land, no money, no status.</p>
          <p>
            💡 Ruth was not chasing security when she said this. She was choosing loyalty over safety, and faith in a God she had not grown up worshiping over the certainty of her own people back home.
          </p>
          <p>Naomi stopped arguing once she saw Ruth was determined, and the two women traveled to Bethlehem together.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Gleaning in the Field of Boaz</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Naomi and Ruth arrived in Bethlehem with nothing. No income. No food stored up. No plan beyond survival.</p>
          <p>
            God&apos;s law had a built in provision for exactly this situation. Farmers were told not to harvest the corners of their fields or go back for grain they dropped, so the poor could come behind the reapers and gather, or glean, what was left.
          </p>
          <p>Ruth volunteered to go do this dangerous, humbling work.</p>
        </div>
        <VerseQuote
          text="And Naomi had a kinsman of her husband's, a mighty man of wealth, of the family of Elimelech; and his name was Boaz."
          reference="Ruth 2:1"
        />
        <VerseQuote
          text="And she went, and came, and gleaned in the field after the reapers: and her hap was to light on a part of the field belonging unto Boaz, who was of the kindred of Elimelech."
          reference="Ruth 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Her hap was to light on that field.</strong> That phrase describes what looked like an accident. Ruth had no idea whose field she had wandered into.
          </p>
          <p>
            💡 The narrator wants you to see something Ruth could not see yet. What felt random to her was not random to God. Boaz happened to be a relative of Elimelech, the very family Ruth had joined by marriage.
          </p>
          <p>❓ How many ordinary, unremarkable decisions in your own life might be doing something similar right now?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Blessing Under Whose Wings</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz showed up at his own field and noticed a woman he did not recognize.</p>
          <p>He asked about her, and his workers told him she was the Moabite woman who had come back with Naomi.</p>
          <p>Instead of ignoring her or sending her away, Boaz spoke directly to her, told her to keep gleaning only in his field, and made sure his young men would not bother her.</p>
          <p>Ruth was stunned that a man of his standing would even acknowledge her, a foreigner with no claim on his kindness. Boaz answered her with this:</p>
        </div>
        <VerseQuote
          text="And Boaz answered and said unto her, It hath fully been shewed me, all that thou hast done unto thy mother in law since the death of thine husband: and how thou hast left thy father and thy mother, and the land of thy nativity, and art come unto a people which thou knewest not heretofore."
          reference="Ruth 2:11"
        />
        <VerseQuote
          text="The LORD recompense thy work, and a full reward be given thee of the LORD God of Israel, under whose wings thou art come to trust."
          reference="Ruth 2:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Boaz had heard about Ruth&apos;s vow before he ever met her. Her loyalty to Naomi had already become her reputation in this town.
          </p>
          <p>
            📌 <strong>A full reward, under whose wings thou art come to trust. Boaz names exactly what Ruth had done in chapter one. She had traded her own gods and her own nation for shelter under the God of Israel.</strong>
          </p>
          <p>
            ✅ God does not miss quiet acts of loyalty done with no audience watching. Boaz became living proof that the God Ruth had chosen was already watching out for her.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. A Bold Request at the Threshing Floor</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Months passed. The barley and wheat harvests ended, and Naomi started thinking about Ruth&apos;s future.</p>
          <p>Under Israelite custom, a close relative of a dead husband could act as a kinsman redeemer, meaning he could marry the widow, buy back the family&apos;s land, and keep the dead man&apos;s name and inheritance alive. Boaz qualified as one of these relatives.</p>
          <p>Naomi gave Ruth a plan that sounds strange to modern ears but was a recognized way, in that culture, of asking a kinsman redeemer to do his duty.</p>
        </div>
        <VerseQuote
          text="Then Naomi her mother in law said unto her, My daughter, shall I not seek rest for thee, that it may be well with thee?"
          reference="Ruth 3:1"
        />
        <VerseQuote
          text="Wash thyself therefore, and anoint thee, and put thy raiment upon thee, and get thee down to the floor: but make not thyself known unto the man, until he shall have done eating and drinking."
          reference="Ruth 3:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Scripture is careful here. Ruth was not sent to seduce Boaz. She was sent to formally ask him, at night on the threshing floor where he was guarding the grain, to act as her kinsman redeemer.
          </p>
          <p>Ruth did exactly as Naomi instructed. In the middle of the night, Boaz woke up startled to find someone at his feet.</p>
        </div>
        <VerseQuote
          text="And he said, Who art thou? And she answered, I am Ruth thine handmaid: spread therefore thy skirt over thine handmaid; for thou art a near kinsman."
          reference="Ruth 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Spread thy skirt over thine handmaid was a request for protection and marriage, a picture of covering someone who has nothing of her own.</strong>
          </p>
          <p>Boaz honored her request, praised her for not chasing a younger man, and promised to settle the matter properly the very next day, since there was actually one relative closer than himself with the first right to redeem.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Redeemed at the City Gate</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The city gate was where legal and business matters were settled in front of witnesses. Boaz went there first thing in the morning.</p>
        </div>
        <VerseQuote
          text="Then went Boaz up to the gate, and sat him down there: and, behold, the kinsman of whom Boaz spake came by; unto whom he said, Ho, such a one! turn aside, sit down here. And he turned aside, and sat down."
          reference="Ruth 4:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz gathered ten elders as official witnesses and laid out the situation to the closer relative. He could buy Naomi&apos;s land, but it came with an obligation.</p>
        </div>
        <VerseQuote
          text="Then said Boaz, What day thou buyest the field of the hand of Naomi, thou must buy it also of Ruth the Moabitess, the wife of the dead, to raise up the name of the dead upon his inheritance."
          reference="Ruth 4:5"
        />
        <VerseQuote
          text="Moreover Ruth the Moabitess, the wife of Mahlon, have I purchased to be my wife, to raise up the name of the dead upon his inheritance, that the name of the dead be not cut off from among his brethren, and from the gate of his place: ye are witnesses this day."
          reference="Ruth 4:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The closer relative declined. Marrying Ruth and raising up children in a dead man&apos;s name could complicate his own family&apos;s inheritance, so he handed his right to redeem over to Boaz, right there in front of the elders.</p>
          <p>
            📌 <strong>Boaz did not have to do any of this. He chose to redeem her, in public, at real cost to himself, when he had a legal way out available to him.</strong>
          </p>
          <p>
            💡 If that pattern, someone paying a real price to redeem a person who could not save herself, sounds familiar, it should. It is the same shape as the rescue described in{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              how you know you are saved
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. A Son Named Obed, and a King Named David</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz married Ruth. What happened next reversed everything Naomi had lost in chapter one.</p>
        </div>
        <VerseQuote
          text="So Boaz took Ruth, and she was his wife: and when he went in unto her, the LORD gave her conception, and she bare a son."
          reference="Ruth 4:13"
        />
        <VerseQuote
          text="And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel."
          reference="Ruth 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The women of Bethlehem, the same town Naomi had come back to empty and bitter, gathered around her and praised God for her.</p>
          <p>They even praised Ruth by name, calling her better to Naomi than seven sons, the highest number of children a woman in that culture could hope for.</p>
        </div>
        <VerseQuote
          text="And the women her neighbours gave it a name, saying, There is a son born to Naomi; and they called his name Obed: he is the father of Jesse, the father of David."
          reference="Ruth 4:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Obed became the grandfather of King David. The Moabite widow with nothing became the great grandmother of Israel&apos;s greatest king.</strong>
          </p>
          <p>
            And the line does not stop with David. Matthew opens his gospel with a genealogy that lists Ruth by name, alongside other unexpected women in the family line that also produced{" "}
            <ArticleLink href="/blog/who-is-leah">Leah&apos;s son Judah</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse;"
          reference="Matthew 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Booz is simply the Greek spelling of Boaz.</p>
          <p>
            ✅ <strong>A foreign widow who once had nothing is named, on purpose, in the family tree of Jesus Christ.</strong>
          </p>
          <p>She never lived to see it. She just kept her vow, gleaned in a field, and made one bold request at a threshing floor at night.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Ruth&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Loyalty can outlast every reason to walk away</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Orpah&apos;s choice to go home made complete sense. Nobody would have blamed Ruth for making the same choice.</p>
          <p>📌 Ruth stayed anyway, with nothing to gain from it that she could see at the time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Small, faithful acts often go unnoticed by people and never by God</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gleaning was not glamorous work. It was hard, humbling, and easy to overlook.</p>
          <p>💡 God saw it anyway, and used it to connect Ruth to the very man who would change her whole life.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. God often works through what looks like coincidence</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Her hap was to light on the field of Boaz. That is how the book describes what happened.</p>
          <p>
            ❓ What in your own life might look like an accident but is not one at all? Sometimes the answer to fear about an unknown future is trusting that same quiet hand, which is a big part of what{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>{" "}
            covers.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Redemption always costs someone something</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz had a legal way to avoid the cost of marrying Ruth. He chose it anyway, publicly, in front of witnesses.</p>
          <p>⚠️ Real rescue is never free for the one doing the rescuing.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God uses outsiders to accomplish His biggest plans</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ruth was not born into the covenant people. She had every label a nation could put on an outsider.</p>
          <p>📌 God still wrote her name permanently into the ancestry of the Messiah.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Grief and hope can live in the same story</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Naomi came back to Bethlehem asking people to call her Mara, meaning bitter, because of everything she had lost.</p>
          <p>By the end of the same book, she is holding her own grandson. The book does not erase the grief to get there. It just keeps going.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Ruth&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Ruth 1:16 to 17</h3>
        <VerseQuote
          text="And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me."
          reference="Ruth 1:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most famous vow in the book, and one of the most famous in the entire Bible.</p>
          <p>Ruth was not promising affection. She was choosing a nation, a people, and a God, all at once, with no guarantee of anything good in return.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Ruth 2:12</h3>
        <VerseQuote
          text="The LORD recompense thy work, and a full reward be given thee of the LORD God of Israel, under whose wings thou art come to trust."
          reference="Ruth 2:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Boaz says out loud what chapter one only showed. Ruth had come under the wings, meaning the protection and care, of the God of Israel.</p>
          <p>📌 This blessing became the very thing Boaz himself helped answer.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Ruth 3:9</h3>
        <VerseQuote
          text="And he said, Who art thou? And she answered, I am Ruth thine handmaid: spread therefore thy skirt over thine handmaid; for thou art a near kinsman."
          reference="Ruth 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A humble widow asking a wealthy landowner, directly, to fulfill a legal duty toward her.</p>
          <p>💡 It took courage for Ruth to ask plainly for what she needed instead of waiting silently and hoping.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Ruth 4:14 to 15</h3>
        <VerseQuote
          text="And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel. And he shall be unto thee a restorer of thy life, and a nourisher of thine old age: for thy daughter in law, which loveth thee, which is better to thee than seven sons, hath born him."
          reference="Ruth 4:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The same town that watched Naomi return with nothing now watches her holding a grandson.</p>
          <p>✅ God restores what famine, death, and years of loss took away, even if it looks nothing like the original plan.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 1:5</h3>
        <VerseQuote
          text="And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse;"
          reference="Matthew 1:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short line in the New Testament, over a thousand years after Ruth&apos;s story ended, and her name is still there.</p>
          <p>📌 Every person who reads the opening of Matthew&apos;s gospel reads Ruth&apos;s name on the way to reading about Jesus.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Ruth</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Ruth a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. The book of Ruth presents her as a real Moabite woman living during the time of the judges,
          named alongside real places like Bethlehem and Moab. Matthew&apos;s gospel later lists her by name
          in a genealogy meant to record real, historical ancestry, not a legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does whither thou goest I will go mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is old English for wherever you go, I will go. Ruth spoke it to Naomi when Naomi urged her to
          return to her own people after her husband died. It was a full commitment to Naomi&apos;s nation,
          Naomi&apos;s God, and Naomi&apos;s future, given with nothing guaranteed in return.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a kinsman redeemer?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Under Israelite custom, a kinsman redeemer was a close male relative who could step in to buy back
          a family&apos;s land, marry a widow, and keep a dead relative&apos;s name and inheritance alive. It
          protected widows and families who had no other way to recover after a death. Boaz filled that role
          for Ruth and Naomi.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Ruth in the family line of Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Ruth 4:17 says Obed, her son with Boaz, was the father of Jesse and the grandfather of King
          David. Matthew 1:5 names Ruth directly in the genealogy that leads to Jesus. A foreign widow with
          no standing in Israel became an ancestor of the Messiah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Ruth and Boaz a love story or an arranged marriage?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was neither one, exactly. It began as a legal obligation under the kinsman redeemer custom, but
          the text shows real affection and respect growing between them along the way. Boaz praised
          Ruth&apos;s character before he ever considered marrying her, and she trusted him enough to ask him
          directly for protection.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Orpah go back but Ruth did not?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never criticizes Orpah. Going home to her own people and gods was the reasonable,
          expected choice for a widow in her position. Ruth&apos;s choice to stay was unusual precisely
          because it was not required or expected of her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Ruth was a Moabite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moab was a nation east of the Dead Sea, descended from Lot, and its people worshiped other gods
          besides the LORD. Israelites and Moabites had a strained history. Ruth&apos;s nationality is
          mentioned repeatedly in the book, which makes her acceptance into Israel, and into the ancestry of
          Jesus, even more remarkable.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was what happened at the threshing floor improper?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not describe anything improper. Ruth asked Boaz, using recognized customary language,
          to act as her kinsman redeemer. Boaz responded with respect, praised her character, and made sure
          she left before anyone could question what had happened. The scene is about a legal and moral
          request, not romance for its own sake.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Boaz?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Boaz was a wealthy landowner in Bethlehem and a relative of Naomi&apos;s late husband Elimelech.
          Scripture calls him a mighty man of wealth. He was also qualified to serve as a kinsman redeemer for
          Ruth and Naomi, and he ultimately married Ruth after a closer relative declined the role.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the main lesson of the book of Ruth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God is faithful to the loyal, the overlooked, and even the outsider, often working through
          ordinary events like a famine, a field, and a marriage. It is also a picture of redemption, someone
          paying a real price to rescue a person who could not rescue herself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How is Ruth connected to King David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ruth&apos;s son Obed was the father of Jesse, and Jesse was the father of David. That makes Ruth,
          a Moabite woman with no birthright in Israel, the great grandmother of the man who became
          Israel&apos;s greatest king.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ruth started her story with nothing. No husband, no children, no homeland, no guarantee.</p>
          <p>
            📌 <strong>She chose loyalty when leaving would have been easier, and God met that loyalty with a future she never could have planned for herself.</strong>
          </p>
          <p>
            📌 <strong>What looked like a random field turned out to be exactly where she needed to be.</strong>
          </p>
          <p>
            📌 <strong>A foreign widow became an ancestor of the King of kings.</strong>
          </p>
          <p>If your life right now feels like Ruth&apos;s opening chapter, empty, uncertain, and far from home in some way, her story is not just history.</p>
          <p>✅ It is a promise that God still works this way, in ordinary fields, through ordinary loyalty, toward an ending you cannot see yet.</p>
          <p>
            Read the book of Ruth this week. It only takes four short chapters, and if you want a simple way to start reading it well,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> is a good place to begin.
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
          description="Ruth's loyalty and faith are just one story in this 21 day study of the women who shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
