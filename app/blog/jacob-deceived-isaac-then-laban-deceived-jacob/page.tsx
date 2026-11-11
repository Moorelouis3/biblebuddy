import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("jacob-deceived-isaac-then-laban-deceived-jacob");

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

export default function JacobDeceivedIsaacThenLabanDeceivedJacobPage() {
  return (
    <BlogPostShell
      slug="jacob-deceived-isaac-then-laban-deceived-jacob"
      title={<>Jacob Deceived Isaac — Then Laban Deceived Jacob</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p><strong>Jacob Deceived Isaac — Then Laban Deceived Jacob</strong></p>
            <p>🤯 Jacob once pretended to be his older brother to receive a blessing.</p>
          </div>
        </>
      }
    >
      <div className="space-y-5 text-lg leading-8 text-slate-700">
        <p>Years later, somebody tricked Jacob by giving him the OLDER SISTER instead of the younger one.</p>
        <p>BRO.</p>
        <p>When I connected Genesis 27 and Genesis 29, I had to stop reading.</p>
        <p>Let me show you what I mean.</p>
        <p>Jacob and Esau are twins.</p>
        <p>But Esau is born first.</p>
        <p>That matters because the firstborn son held a special place in the family.</p>
        <p>Earlier, in Genesis 25, Esau had sold Jacob his birthright for bread and lentil stew.</p>
        <p>But in Genesis 27, the story goes further.</p>
        <p>Isaac is old, and his eyesight is failing.</p>
        <p>He intends to bless Esau.</p>
        <p>Rebekah hears about it and helps Jacob deceive his father.</p>
        <p>Jacob wears Esau&apos;s clothes.</p>
        <p>He covers his hands and neck with goatskins.</p>
        <p>Then he goes to Isaac pretending to be Esau.</p>
        <ul className="mt-5 space-y-2 text-lg leading-8 text-slate-700">
          <li>👕 His brother&apos;s clothes.</li>
          <li>🐐 Goatskins to imitate his brother&apos;s hair.</li>
          <li>🗣️ Words meant to fool his father.</li>
        </ul>
        <p>And Isaac gives him the blessing.</p>
        <p>When Esau discovers what happened, he&apos;s furious and plans to kill Jacob.</p>
        <p>So Jacob leaves home.</p>
        <p>Fast forward to Genesis 29.</p>
        <p>Jacob arrives near his uncle Laban&apos;s household and meets Rachel.</p>
        <p>He loves her and agrees to work seven years so he can marry her.</p>
        <p>SEVEN YEARS.</p>
        <ul className="mt-5 space-y-2 text-lg leading-8 text-slate-700">
          <li>🐑 Seven years caring for flocks.</li>
          <li>☀️ Seven years of labor.</li>
          <li>❤️ Seven years waiting for Rachel.</li>
        </ul>
        <p>Genesis says the years seemed like only a few days because of his love for her.</p>
        <p>Then the wedding comes.</p>
        <p>And Laban gives Jacob Leah instead.</p>
        <p>Rachel&apos;s OLDER sister.</p>
        <p>Jacob discovers the deception the next morning.</p>
        <p>He confronts Laban.</p>
        <VerseQuote text="“Why then hast thou beguiled me?”" reference="Genesis 29:25" />
        <p>WAIT A MINUTE. 🤯</p>
        <p>Jacob is asking why somebody deceived HIM.</p>
        <p>The man who tricked his own father now knows what it&apos;s like to be on the receiving end.</p>
        <p>But here&apos;s the detail that makes the connection even stronger.</p>
        <p>Laban says it isn&apos;t their custom to give the younger daughter before the firstborn.</p>
        <p><strong>THE FIRSTBORN.</strong></p>
        <p>In Genesis 27, Jacob the younger brother took the place of Esau, the older brother.</p>
        <p>In Genesis 29, Laban uses the older sister&apos;s place to explain why Jacob didn&apos;t receive the younger sister.</p>
        <ul className="mt-5 space-y-2 text-lg leading-8 text-slate-700">
          <li>👦 Younger brother takes older brother&apos;s place.</li>
          <li>👰 Older sister takes younger sister&apos;s place.</li>
          <li>🎭 Deception appears in BOTH stories.</li>
        </ul>
        <p>Now, Genesis doesn&apos;t explicitly say God arranged Laban&apos;s deception as punishment for Jacob&apos;s earlier sin.</p>
        <p>So I don&apos;t want to claim something the passage doesn&apos;t state.</p>
        <p>But the literary parallel is hard to miss.</p>
        <p>And it makes me think about how people can understand an experience differently once they&apos;re on the other side of it.</p>
        <p>Jacob knew how to deceive.</p>
        <p>Now Jacob knew what it felt like to be deceived.</p>
        <p>And remember: God had already spoken His covenant promises to Jacob in Genesis 28.</p>
        <p>God&apos;s purpose for Jacob didn&apos;t mean Jacob&apos;s character was perfect.</p>
        <p>There were still difficult years ahead.</p>
        <p>Still consequences.</p>
        <p>Still growth.</p>
        <p>That&apos;s one thing I love about these stories.</p>
        <p>The Bible doesn&apos;t pretend the people God works through are flawless.</p>
        <p>It shows us complicated people, hard choices, and a God who continues His purposes through their lives.</p>
        <p><strong>Have you ever experienced something that made you reconsider the way you&apos;d treated somebody else?</strong></p>
        <div className="mt-12 rounded-2xl border border-[#d7e5ff] bg-[#f7faff] px-6 py-6">
          <p className="text-lg font-bold text-slate-900">Keep studying with Bible Buddy</p>
          <p className="mt-2">
            Read the Bible and actually understand what you&apos;re reading, one chapter at a time.
          </p>
          <p className="mt-3">
            <Link
              href="https://apps.apple.com/app/id6822155944"
              className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]"
            >
              Download Bible Buddy free
            </Link>
          </p>
        </div>
      </div>
    </BlogPostShell>
  );
}
