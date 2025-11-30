"use client";

import Image from "next/image";
import Link from "next/link";
import { LouisAvatar } from "../../../../../../components/LouisAvatar";

// simple types for verses and sections
type Verse = {
  num: number;
  text: string;
};

type Section = {
  id: string;
  emoji: string;
  title: string;
  verses: Verse[];
};

// Matthew 1 (KJV) split into sections
const sections: Section[] = [
  {
    id: "genealogy",
    emoji: "📜",
    title: "The Genealogy of Jesus the Messiah",
    verses: [
      { num: 1, text: "The book of the generation of Jesus Christ, the son of David, the son of Abraham." },
      { num: 2, text: "Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren;" },
      { num: 3, text: "And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;" },
      { num: 4, text: "And Aram begat Aminadab; and Aminadab begat Naasson; and Naasson begat Salmon;" },
      { num: 5, text: "And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse;" },
      { num: 6, text: "And Jesse begat David the king; and David the king begat Solomon of her that had been the wife of Urias;" },
      { num: 7, text: "And Solomon begat Roboam; and Roboam begat Abia; and Abia begat Asa;" },
      { num: 8, text: "And Asa begat Josaphat; and Josaphat begat Joram; and Joram begat Ozias;" },
      { num: 9, text: "And Ozias begat Joatham; and Joatham begat Achaz; and Achaz begat Ezekias;" },
      { num: 10, text: "And Ezekias begat Manasses; and Manasses begat Amon; and Amon begat Josias;" },
      { num: 11, text: "And Josias begat Jechonias and his brethren, about the time they were carried away to Babylon:" },
      { num: 12, text: "And after they were brought to Babylon, Jechonias begat Salathiel; and Salathiel begat Zorobabel;" },
      { num: 13, text: "And Zorobabel begat Abiud; and Abiud begat Eliakim; and Eliakim begat Azor;" },
      { num: 14, text: "And Azor begat Sadoc; and Sadoc begat Achim; and Achim begat Eliud;" },
      { num: 15, text: "And Eliud begat Eleazar; and Eleazar begat Matthan; and Matthan begat Jacob;" },
      { num: 16, text: "And Jacob begat Joseph the husband of Mary, of whom was born Jesus, who is called Christ." },
      { num: 17, text: "So all the generations from Abraham to David are fourteen generations; and from David until the carrying away into Babylon are fourteen generations; and from the carrying away into Babylon unto Christ are fourteen generations." },
    ],
  },
  {
    id: "birth",
    emoji: "👶🏾",
    title: "The Conception and Birth of Jesus",
    verses: [
      { num: 18, text: "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost." },
      { num: 19, text: "Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily." },
      { num: 20, text: "But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost." },
      { num: 21, text: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins." },
      { num: 22, text: "Now all this was done, that it might be fulfilled which was spoken of the Lord by the prophet, saying," },
      { num: 23, text: "Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us." },
      { num: 24, text: "Then Joseph being raised from sleep did as the angel of the Lord had bidden him, and took unto him his wife:" },
      { num: 25, text: "And knew her not till she had brought forth her firstborn son: and he called his name JESUS." },
    ],
  },
];

export default function MatthewChapter1Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* BACK LINK */}
        <div className="mb-4 text-xs sm:text-sm text-blue-600">
          <Link href="/reading/books/matthew" className="hover:underline">
            ← Back to Matthew overview
          </Link>
        </div>

        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Matthew 1</h1>
        <p className="text-gray-700 mb-4">
          The genealogy of Jesus and the story of His birth.
        </p>

        {/* LOUIS INSTRUCTION */}
        <div className="mb-5 flex items-start gap-3">
          <LouisAvatar mood="bible" size={40} />
          <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
            <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
            <p className="mb-2 font-semibold">Now let us read Matthew chapter 1.</p>
            <p className="text-[13px] leading-relaxed whitespace-pre-line">
              Read the text slowly. No need to take notes just yet.
              
              This chapter starts with a long list of names and a lot of people like to skip it.
              
              Just take your time and get through the reading. I will explain what everything means at the end.
            </p>
          </div>
        </div>

        {/* VERSE BLOCK */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[60vh] overflow-y-auto">
          {sections.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.emoji}</span>
                <span>{section.title}</span>
              </h2>

              <div className="space-y-5">
                {section.verses.map((verse) => (
                  <p key={verse.num} className="leading-relaxed">
                    <span className="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3">
                      {verse.num.toString().padStart(2, "0")}
                    </span>
                    {verse.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CLICK TO READ NOTES CALL OUT + CLICK IMAGE */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 animate-pulse">
            <Link
              href="/reading/books/matthew/chapters/chapter1notes"
              className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:border-sky-400 hover:-translate-y-[2px] transition"
            >
              <LouisAvatar mood="wave" size={50} />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Click here to read my notes
                </p>
                <p className="text-xs text-gray-600">
                  I will walk you through Matthew 1 in simple language.
                </p>
              </div>
            </Link>

            <Image
              src="/Bible/Matthew/chapters/Chapter1/Click.png"
              alt="Next step: click the notes button"
              width={200}
              height={200}
              className="w-16 h-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
