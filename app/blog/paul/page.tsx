import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import Image from "next/image";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("paul");

export default function PaulCharacterStudyPage() {
  return (
    <BibleStudyHubArticleLayout>
      <article className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Image
            src="/Paulbanner.png"
            alt="Paul Character Study Banner"
            width={1200}
            height={600}
            className="rounded-xl shadow-sm w-full h-auto object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">Paul</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">From Persecutor to Preacher</h2>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Before he became the Apostle Paul, he was known as Saul.</h3>
          <p className="mb-4">Not a seeker.<br/>Not curious.<br/>Not confused.</p>
          <p className="mb-4">He was a violent enemy of the Church.</p>
          <p className="mb-4">And yet one encounter with the risen Christ changed everything.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul Didn’t Become an Apostle the Traditional Way</h2>
          <p className="mb-4">He wasn’t one of the 12 disciples.</p>
          <p className="mb-4">He didn’t walk with Jesus in Galilee.</p>
          <p className="mb-4">He didn’t hear the Sermon on the Mount in person.</p>
          <p className="mb-4">Instead — Jesus personally appeared to him after the resurrection.</p>
          <p className="mb-4">📖 Acts 9:3–6</p>
          <p className="mb-4">That’s what makes Paul unique.<br/>His apostleship wasn’t secondhand.<br/>It was commissioned directly by the risen Christ.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul Before Jesus: Saul of Tarsus 😡</h2>
          <p className="mb-4">Saul wasn’t spiritually lazy.<br/>He was spiritually intense.</p>
          <p className="mb-4">🔥 Born in Tarsus — a major intellectual city in the Roman Empire<br/>🔥 Raised as a strict Pharisee (📖 Philippians 3:5–6)<br/>🔥 Trained under Gamaliel — one of the most respected Jewish teachers (📖 Acts 22:3)<br/>🔥 Fluent in Hebrew tradition and Greek culture<br/>🔥 A Roman citizen by birth</p>
          <p className="mb-4">He was educated.<br/>Disciplined.<br/>Devout.</p>
          <p className="mb-4">And completely convinced Christians were dangerous heretics.</p>
          <p className="mb-4">Saul viewed followers of Jesus as a threat to Judaism.<br/>He hunted them.<br/>He imprisoned them.<br/>He approved of their executions.</p>
          <p className="mb-4">📖 Acts 7:57–60 — Stephen’s stoning<br/>📖 Acts 8:1–3 — Saul ravaged the church</p>
          <p className="mb-4">Saul believed he was protecting God’s honor.<br/>But in reality, he was opposing God’s Messiah.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">The Damascus Road Encounter 🔥</h2>
          <p className="mb-4">Everything changed in Acts 9.</p>
          <p className="mb-4">While traveling to Damascus to arrest more believers, a light from heaven stopped him.</p>
          <p className="mb-4">📖 Acts 9:3–6</p>
          <p className="mb-4">⚡ A bright light flashed.<br/>⚡ Saul fell to the ground.<br/>⚡ A voice spoke: “Saul, Saul, why are you persecuting Me?”<br/>⚡ Saul asked, “Who are You, Lord?”<br/>⚡ The answer: “I am Jesus, whom you are persecuting.”</p>
          <p className="mb-4">Notice something important.<br/>Jesus didn’t say,<br/>“Why are you persecuting My people?”<br/>He said,<br/>“Why are you persecuting Me?”<br/>To attack the Church is to attack Christ.</p>
          <p className="mb-4">Saul was struck blind for three days.<br/>He had to be led by hand into Damascus.<br/>The proud Pharisee who once dragged Christians now had to be guided like a child.</p>
          <p className="mb-4">This was not a dream.<br/>Not a hallucination.<br/>Not emotional guilt.<br/>It was a direct appearance of the risen, glorified Christ.</p>
          <p className="mb-4">That is why Paul could later defend his apostleship.<br/>Jesus Himself called him.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">After the Encounter: A Brand New Man 🕊️</h2>
          <p className="mb-4">God sent Ananias to him.<br/>📖 Acts 9:10–18</p>
          <p className="mb-4">Ananias laid hands on him.<br/>Saul’s sight was restored.<br/>And immediately:</p>
          <p className="mb-4">🔥 He was baptized.<br/>🔥 He began preaching that Jesus is the Son of God (📖 Acts 9:20–22).</p>
          <p className="mb-4">The man who once destroyed the message now proclaimed it.<br/>People were shocked.<br/>Jewish leaders turned against him.<br/>He had to escape Damascus by being lowered in a basket through a wall.</p>
          <p className="mb-4">Grace had changed him — but it didn’t remove opposition.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">The Hidden Years ⏳ (Galatians 1:17–18)</h2>
          <p className="mb-4">Most people skip this part.<br/>But it matters.</p>
          <p className="mb-4">After his conversion, Saul did not immediately launch into public ministry.<br/>📖 Galatians 1:17–18</p>
          <p className="mb-4">He spent three years in Arabia.<br/>Alone.<br/>Relearning Scripture.<br/>Reprocessing the Law.<br/>Seeing Christ in the Old Testament.</p>
          <p className="mb-4">The man trained under Gamaliel now sat under the teaching of the Holy Spirit.<br/>Those years were preparation.<br/>God often prepares before He promotes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul’s Apostolic Authority ✈️</h2>
          <p className="mb-4">Paul wasn’t self-appointed.<br/>📖 Galatians 1:11–12</p>
          <p className="mb-4">He makes it clear:<br/>The Gospel he preached came by revelation of Jesus Christ.</p>
          <p className="mb-4">In nearly every letter he writes:<br/>“Paul, an apostle of Christ Jesus…”<br/>📖 Romans 1:1<br/>📖 Galatians 1:1</p>
          <p className="mb-4">Critics questioned him.<br/>But Paul stood firm.<br/>Because he knew who called him.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Mission to the Nations 🌍</h2>
          <p className="mb-4">Paul became the apostle to the Gentiles.<br/>His background made him uniquely equipped:</p>
          <p className="mb-4">🔥 Jewish by heritage<br/>🔥 Roman by citizenship<br/>🔥 Educated in Greek culture<br/>🔥 Trained in Scripture</p>
          <p className="mb-4">He traveled across the Roman Empire:</p>
          <p className="mb-4">📍 Antioch<br/>📍 Corinth<br/>📍 Philippi<br/>📍 Thessalonica<br/>📍 Ephesus<br/>📍 Rome</p>
          <p className="mb-4">He endured:</p>
          <p className="mb-4">🔥 Beatings<br/>🔥 Imprisonment<br/>🔥 Shipwreck (📖 Acts 27)<br/>🔥 Being stoned and left for dead (📖 Acts 14:19)</p>
          <p className="mb-4">And yet he kept going.</p>
          <p className="mb-4">Why?</p>
          <p className="mb-4">📖 Philippians 1:21<br/>“To live is Christ, to die is gain.”</p>
          <p className="mb-4">His life had one purpose.<br/>Christ.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul’s Letters: Half the New Testament 📬</h2>
          <p className="mb-4">Paul didn’t sit down to “write the Bible.”<br/>He wrote letters to real churches dealing with real problems.<br/>But those letters were Spirit-inspired.<br/>📖 2 Timothy 3:16</p>
          <p className="mb-4">📝 Romans — Salvation by faith alone<br/>📝 1 & 2 Corinthians — Church correction and spiritual gifts<br/>📝 Galatians — Grace versus the Law<br/>📝 Ephesians — Identity in Christ<br/>📝 Philippians — Joy in suffering<br/>📝 Colossians — The supremacy of Christ<br/>📝 1 & 2 Thessalonians — The return of Jesus<br/>📝 1 & 2 Timothy, Titus — Church leadership<br/>📝 Philemon — Forgiveness and reconciliation</p>
          <p className="mb-4">By the 2nd century, his letters were circulating throughout the Christian world.<br/>When the New Testament was compiled, 13 books bore his name.<br/>The former persecutor became one of Christianity’s strongest theological voices.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul’s Weakness and Humility</h2>
          <p className="mb-4">Paul never forgot who he used to be.</p>
          <p className="mb-4">📖 1 Corinthians 15:9 — “The least of the apostles.”<br/>📖 1 Timothy 1:15 — “Chief of sinners.”<br/>📖 2 Corinthians 12:9 — “My grace is sufficient for you.”</p>
          <p className="mb-4">He understood grace because he knew what he had been saved from.<br/>His theology was not academic theory.<br/>It was personal transformation.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Paul’s Legacy 💥</h2>
          <p className="mb-4">From murderer to missionary.<br/>From legalist to preacher of grace.<br/>From enemy of Jesus to servant of Christ.</p>
          <p className="mb-4">Paul’s life proves one undeniable truth:</p>
          <p className="mb-4">No one is too far gone.</p>
          <p className="mb-4">📖 2 Corinthians 5:17<br/>“If anyone is in Christ, he is a new creation…”</p>
          <p className="mb-4">Paul was not cleaned up.<br/>He was made new.</p>
        </section>
      {/* Reflection Section */}
      <div className="mt-8 mb-4 flex flex-col items-center">
        <hr className="w-2/3 mb-2 border-blue-200" />
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1">Reflection Question</h2>
        <div className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-1">
          Does Paul's story change the way you think about God's grace?
        </div>
        <div className="text-sm italic text-gray-500 text-center mt-0 mb-0">
          Share your thoughts below and join the conversation.
        </div>
      </div>
      {/* CommentSection wrapper with minimal top margin */}
      <div className="mt-2">
        {/* CommentSection is rendered by layout, so nothing else needed here */}
      </div>
      </article>
    </BibleStudyHubArticleLayout>
  );
}
