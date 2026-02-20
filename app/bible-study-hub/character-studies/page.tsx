import Link from "next/link";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

const characters = [
  {
    href: "/bible-study-hub/character-studies/luke",
    emoji: "👤",
    name: "Luke",
    desc: "The Gentile doctor, Gospel writer, and companion of Paul."
  },
  {
    href: "/bible-study-hub/character-studies/moses",
    emoji: "🔥",
    name: "Moses",
    desc: "The man God drew out to draw His people out"
  },
  {
    href: "/bible-study-hub/character-studies/paul",
    emoji: "🧔",
    name: "Paul",
    desc: "From persecutor to missionary apostle."
  },
];

export default function CharacterStudiesPage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Character Studies</h1>
        <p className="text-gray-600 mb-8">Explore the lives of key Bible characters.</p>
        <div className="flex flex-col gap-5">
          {characters.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-xl p-6 shadow-sm border border-indigo-200 bg-indigo-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
            >
              <span className="text-3xl mt-1 select-none">{c.emoji}</span>
              <div>
                <div className="font-bold text-lg mb-1 text-indigo-900">{c.name}</div>
                <div className="text-gray-700 text-sm">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
