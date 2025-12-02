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

// Matthew 2 split into sections
const sections: Section[] = [
  {
    id: "magi",
    emoji: "⭐",
    title: "The Visit of the Magi",
    verses: [
      {
        num: 1,
        text:
          "Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, wise men from the east came to Jerusalem,",
      },
      {
        num: 2,
        text:
          "saying, Where is he that is born King of the Jews For we saw his star in the east, and are come to worship him.",
      },
      {
        num: 3,
        text:
          "And when Herod the king heard it, he was troubled, and all Jerusalem with him.",
      },
      {
        num: 4,
        text:
          "And gathering together all the chief priests and scribes of the people, he inquired of them where the Christ should be born.",
      },
      {
        num: 5,
        text:
          "And they said unto him, In Bethlehem of Judaea, for thus it is written through the prophet,",
      },
      {
        num: 6,
        text:
          "And thou Bethlehem, land of Judah, art in no wise least among the princes of Judah, for out of thee shall come forth a governor, who shall be shepherd of my people Israel.",
      },
      {
        num: 7,
        text:
          "Then Herod privily called the wise men, and learned of them exactly what time the star appeared.",
      },
      {
        num: 8,
        text:
          "And he sent them to Bethlehem, and said, Go and search out exactly concerning the young child, and when ye have found him, bring me word, that I also may come and worship him.",
      },
      {
        num: 9,
        text:
          "And they, having heard the king, went their way, and lo, the star which they saw in the east went before them, till it came and stood over where the young child was.",
      },
      {
        num: 10,
        text:
          "And when they saw the star, they rejoiced with exceeding great joy.",
      },
      {
        num: 11,
        text:
          "And they came into the house and saw the young child with Mary his mother, and they fell down and worshipped him, and opening their treasures they offered unto him gifts, gold and frankincense and myrrh.",
      },
      {
        num: 12,
        text:
          "And being warned of God in a dream that they should not return to Herod, they departed into their own country another way.",
      },
    ],
  },
  {
    id: "flight",
    emoji: "🛡️",
    title: "The Flight to Egypt",
    verses: [
      {
        num: 13,
        text:
          "Now when they were departed, behold, an angel of the Lord appeareth to Joseph in a dream, saying, Arise and take the young child and his mother, and flee into Egypt, and be thou there until I tell thee, for Herod will seek the young child to destroy him.",
      },
      {
        num: 14,
        text:
          "And he arose and took the young child and his mother by night, and departed into Egypt,",
      },
      {
        num: 15,
        text:
          "and was there until the death of Herod, that it might be fulfilled which was spoken by the Lord through the prophet, saying, Out of Egypt did I call my son.",
      },
    ],
  },
  {
    id: "slaughter",
    emoji: "💔",
    title: "Herod Slaughters the Babies",
    verses: [
      {
        num: 16,
        text:
          "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the male children that were in Bethlehem, and in all the borders thereof, from two years old and under, according to the time which he had exactly learned of the wise men.",
      },
      {
        num: 17,
        text:
          "Then was fulfilled that which was spoken through Jeremiah the prophet, saying,",
      },
      {
        num: 18,
        text:
          "A voice was heard in Ramah, weeping and great mourning, Rachel weeping for her children, and she would not be comforted, because they are not.",
      },
    ],
  },
  {
    id: "return",
    emoji: "🏡",
    title: "The Return to Nazareth",
    verses: [
      {
        num: 19,
        text:
          "But when Herod was dead, behold, an angel of the Lord appeareth in a dream to Joseph in Egypt,",
      },
      {
        num: 20,
        text:
          "saying, Arise and take the young child and his mother, and go into the land of Israel, for they are dead that sought the young child’s life.",
      },
      {
        num: 21,
        text:
          "And he arose and took the young child and his mother, and came into the land of Israel.",
      },
      {
        num: 22,
        text:
          "But when he heard that Archelaus was reigning over Judaea in the room of his father Herod, he was afraid to go thither, and being warned of God in a dream, he withdrew into the parts of Galilee,",
      },
      {
        num: 23,
        text:
          "and came and dwelt in a city called Nazareth, that it might be fulfilled which was spoken through the prophets, that he should be called a Nazarene.",
      },
    ],
  },
];

export default function MatthewChapter2Page() {
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
        <h1 className="text-3xl font-bold mb-1">Matthew 2</h1>
        <p className="text-gray-700 mb-4">
          The visit of the wise men, the escape to Egypt, and the return to
          Nazareth.
        </p>

        {/* LOUIS INSTRUCTION */}
        <div className="mb-5 flex items-start gap-3">
          <LouisAvatar mood="bible" size={40} />
          <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
            <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
            <p className="mb-2 font-semibold">Now let us read Matthew chapter 2.</p>
            <p className="text-[13px] leading-relaxed whitespace-pre-line">
              Read the text slowly. No need to take notes just yet.
              
              This chapter shows what happened after Jesus was born, including
              the wise men, Herod, and the family’s escape to Egypt.
              
              Just take your time and get through the reading. I will explain
              what everything means at the end.
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
              href="/reading/books/matthew/chapters/chapter2notes"
              className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:border-sky-400 hover:-translate-y-[2px] transition"
            >
              <LouisAvatar mood="wave" size={50} />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Click here to read my notes
                </p>
                <p className="text-xs text-gray-600">
                  I will walk you through Matthew 2 in simple language.
                </p>
              </div>
            </Link>

            <Image
              src="/Bible/Matthew/chapters/Chapter2/Click.png"
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
