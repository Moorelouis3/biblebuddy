"use client";

import { useRef } from "react";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import { BIBLE_YEAR_GENESIS_WEB_VERSES } from "../lib/bibleYearGenesisVerses";
import type { BibleYearDeepStudySection } from "../lib/bibleYearDayOneDeepStudy";

type BibleYearDeepStudySectionCardsProps = {
  sections: BibleYearDeepStudySection[];
  activeReference: string | null;
  onActiveReferenceChange: (reference: string | null) => void;
  onSectionOpen?: (section: BibleYearDeepStudySection) => void;
  intro?: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
    callout?: string;
  };
  closing?: {
    title: string;
    paragraphs: string[];
    prayerTitle?: string;
    prayer?: string;
  };
  topId?: string;
  className?: string;
};

const bibleReferenceLinePattern =
  /^\s*(?:[-*]\s*)?(?:>\s*)?(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}]\s*)?(?:\*\*)?(?:[1-3]\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+\d+:\d+(?:\s*(?:-|to)\s*\d+)?/u;

function getHeadingText(line: string) {
  return line.replace(/^#{1,6}\s+/, "").replace(/[*_`]/g, "").trim();
}

function normalizeReferenceText(value: string) {
  return value.replace(/\s+/g, " ").replace(/\s+to\s+/gi, "-").replace(/\s*-\s*/g, "-").trim().toLowerCase();
}

function normalizeHeadingText(value: string) {
  return value
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu, "")
    .replace(/[^\p{L}\p{N}: -]+/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function addBlankLineBetweenVerseBlocks(markdown: string) {
  const output: string[] = [];

  for (const line of markdown.split("\n")) {
    const previousLine = output[output.length - 1] ?? "";
    if (bibleReferenceLinePattern.test(line) && previousLine.trim() !== "") {
      output.push("");
    }
    output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const bibleYearGenesisStudyGuides: Record<number, {
  map: string[];
  phrases: Array<[string, string]>;
  culture: string;
  connections: string;
  takeaway: string;
}> = {
  11: {
    map: [
      "🏙️ Babel shows humanity using unity to resist God's command.",
      "🗣️ Language is confused so rebellion cannot keep organizing itself unchecked.",
      "🌱 Shem's family line narrows the story toward Abram.",
      "🛑 Sarai's barrenness shows the promise will need God's power from the beginning.",
    ],
    phrases: [
      ["let us make a name", "Babel is about identity without surrender. The people want greatness apart from receiving it from God."],
      ["lest we be scattered", "This resists God's creation command to fill the earth. Their fear of scattering becomes disobedience."],
      ["Sarai was barren", "Genesis places impossibility in front of the promise before the promise is even spoken clearly."],
    ],
    culture: "Ancient cities and towers were public signs of power, security, religion, and reputation. Babel is not condemned because building is evil, but because the project is organized pride against God's command.",
    connections: "Babel prepares the contrast with Abraham: Babel says, 'Let us make a name,' while God says to Abram, 'I will make your name great.' The scattering of nations also looks ahead to God's plan to bless all nations through Abraham.",
    takeaway: "Genesis 11 teaches that human pride scatters, but God's promise begins a rescue that will reach the scattered nations.",
  },
  12: {
    map: [
      "📣 God calls Abram to leave country, family, and familiar security.",
      "✨ God promises land, descendants, a great name, blessing, and blessing for all families.",
      "🔥 Abram builds altars as he moves through the land.",
      "⚠️ Famine exposes fear, and Abram's Egypt failure threatens Sarai and the promise.",
    ],
    phrases: [
      ["go from your country", "God's call asks Abram to release the normal anchors of ancient identity: land, kinship, inheritance, and protection."],
      ["all the families of the earth", "The promise is never only private. God blesses Abram so blessing can move outward to the nations."],
      ["there was a famine", "The first major test after obedience is pressure. Faith does not remove hardship."],
    ],
    culture: "In the ancient world, leaving one's father's house meant leaving legal protection, economic stability, and social identity. Abram's obedience is costly because family and land were survival structures.",
    connections: "Genesis 12 is a backbone passage for the rest of Scripture. Israel's story, the land promise, the covenant line, and the New Testament blessing of the nations all reach back here.",
    takeaway: "Genesis 12 shows that faith begins by trusting God's promise more than visible security, even when fear still has to be confronted.",
  },
  13: {
    map: [
      "↩️ Abram returns from Egypt and comes back to the altar.",
      "⚖️ Blessing creates practical pressure between Abram and Lot.",
      "👀 Lot chooses by sight, moving toward Sodom.",
      "✨ God repeats the land and offspring promise after Abram releases control.",
    ],
    phrases: [
      ["to the place of the altar", "Abram returns to worship after failure. The altar marks restored dependence on God."],
      ["the land could not bear them", "God's blessing creates a real-life problem that requires wisdom, humility, and peace."],
      ["Lot lifted up his eyes", "Lot evaluates by appearance. Genesis warns that what looks fruitful can still be spiritually dangerous."],
    ],
    culture: "Herds needed water and grazing space. Land conflict was not abstract; it threatened survival. Abram's willingness to let Lot choose first is a costly act of trust.",
    connections: "Lot's movement toward Sodom sets up Genesis 14 and 19. Abram's lifted eyes after Lot leaves contrasts human sight with promise-shaped sight.",
    takeaway: "Genesis 13 teaches that faith can release control because God's promise is stronger than the part we can grab for ourselves.",
  },
  14: {
    map: [
      "⚔️ Regional war reaches Sodom and Lot is captured.",
      "🛡️ Abram rescues Lot with courage and responsibility.",
      "👑 Melchizedek blesses Abram and gives glory to God Most High.",
      "✋ Abram refuses Sodom's reward so corrupt power cannot claim his blessing.",
    ],
    phrases: [
      ["Lot also", "Lot is swept into Sodom's trouble because of where he settled. Nearness has consequences."],
      ["God Most High", "Melchizedek names the true source of Abram's victory: the God who owns heaven and earth."],
      ["I have lifted my hand to the LORD", "Abram's refusal is an oath of loyalty. He will not let Sodom define his success."],
    ],
    culture: "Ancient warfare often involved taking goods and people. Victorious kings gained wealth and reputation. Abram's refusal of Sodom's goods is a moral and spiritual boundary.",
    connections: "Melchizedek later becomes important in Psalm 110 and Hebrews, where his king-priest role helps explain Christ's priesthood.",
    takeaway: "Genesis 14 shows that faith acts courageously, worships after victory, and rejects blessings tied to corrupt sources.",
  },
  15: {
    map: [
      "⭐ God speaks to Abram's fear and calls Himself Abram's shield and reward.",
      "💬 Abram honestly asks how the promise will happen without a son.",
      "✅ Abram believes the LORD, and it is counted to him as righteousness.",
      "🔥 God confirms the promise with covenant, taking the weight on Himself.",
    ],
    phrases: [
      ["fear not", "Abram has just refused Sodom's reward and still feels vulnerable. God addresses the fear underneath faith."],
      ["he believed the LORD", "Abram trusts God's word before he sees the fulfillment. Faith receives what God promises."],
      ["smoking fire pot and flaming torch", "God alone passes between the pieces, showing the covenant rests on His faithfulness."],
    ],
    culture: "Cutting animals in a covenant ceremony symbolized the seriousness of the oath. Passing between the pieces represented covenant commitment with life-and-death weight.",
    connections: "Genesis 15:6 becomes central in Romans and Galatians for explaining righteousness by faith. The covenant also looks forward to Israel's slavery, exodus, and land promise.",
    takeaway: "Genesis 15 teaches that covenant confidence comes from God's promise and faithfulness, not human ability to produce the future.",
  },
  16: {
    map: [
      "⏳ Sarai and Abram try to force the promise through Hagar.",
      "💔 The shortcut creates rivalry, pain, and mistreatment.",
      "👁️ God finds Hagar in the wilderness and speaks to her future.",
      "💧 Hagar names the LORD as the God who sees.",
    ],
    phrases: [
      ["Sarai had borne him no children", "The delay is real. Genesis does not minimize the emotional pressure of waiting."],
      ["the angel of the LORD found her", "Hagar does not find God first. God finds the wounded person in the wilderness."],
      ["You are a God of seeing", "Hagar's confession shows that God notices the person others have used, blamed, or pushed away."],
    ],
    culture: "Using a servant as a surrogate heir was known in the ancient world, but Genesis shows the spiritual and relational damage of trying to secure God's promise through human control.",
    connections: "Hagar's wilderness meeting anticipates later wilderness mercy. Ishmael's name means God hears, connecting his identity to God's attention to suffering.",
    takeaway: "Genesis 16 teaches that human shortcuts wound people, but God still sees and speaks to those wounded by someone else's failure.",
  },
  17: {
    map: [
      "👑 Abram and Sarai receive new names tied to God's promise.",
      "🕊️ Circumcision becomes the sign of the covenant.",
      "✨ God names Isaac before he is born.",
      "👣 Abraham responds with immediate obedience.",
    ],
    phrases: [
      ["walk before me, and be blameless", "Covenant promise calls for a whole-life response, not passive belief."],
      ["Abraham", "The new name means father of a multitude. God names him by promise before the visible evidence arrives."],
      ["my covenant I will establish with Isaac", "God blesses Ishmael, but the covenant line is specifically carried through Isaac."],
    ],
    culture: "Names carried identity and destiny. Circumcision marked the covenant family physically, personally, and generationally.",
    connections: "Genesis 17 shapes later Israelite identity and covenant language. The New Testament later discusses circumcision in relation to faith, covenant belonging, and the heart.",
    takeaway: "Genesis 17 teaches that God names, marks, and leads His covenant people according to promise before the promise is fully visible.",
  },
  18: {
    map: [
      "⛺ Abraham welcomes mysterious visitors near his tent.",
      "✨ Sarah hears the promise again and laughs at the impossibility.",
      "⚖️ The LORD reveals judgment concerning Sodom.",
      "🙏 Abraham intercedes while trusting the Judge of all the earth.",
    ],
    phrases: [
      ["Is anything too hard for the LORD?", "This question interprets the whole promise. Human impossibility is not divine impossibility."],
      ["the cry of Sodom and Gomorrah", "Judgment is connected to real evil and the cry that has reached God."],
      ["Shall not the Judge of all the earth do what is just?", "Abraham's prayer rests on God's character: justice and mercy belong together in Him."],
    ],
    culture: "Hospitality in the ancient Near East was serious social duty, especially in a tent culture where travelers depended on welcome and protection.",
    connections: "Sarah's promised child connects back to Genesis 17 and forward to Isaac's birth in Genesis 21. Abraham's intercession anticipates later biblical patterns of standing before God for others.",
    takeaway: "Genesis 18 teaches that God's promise is stronger than impossibility and His justice is never careless.",
  },
  19: {
    map: [
      "⚠️ Sodom's violence exposes the city's corruption.",
      "🤲 Lot hesitates, but mercy pulls him out.",
      "🔥 Judgment falls on Sodom and Gomorrah.",
      "💔 Lot's family carries deep damage even after escape.",
    ],
    phrases: [
      ["Lot sat in the gate", "Lot is no longer only near Sodom. The gate suggests public involvement and settled attachment."],
      ["he lingered", "Lot knows judgment is coming, but his heart is still slow to leave."],
      ["the LORD being merciful to him", "Lot's rescue is not because he is impressive. Mercy takes him by the hand."],
    ],
    culture: "The city gate was a place of public life, legal decisions, and leadership. Lot's position shows how deeply he has settled into Sodom's world.",
    connections: "Sodom becomes a later biblical symbol of severe corruption and judgment. Lot's rescue also shows God's mercy remembering Abraham.",
    takeaway: "Genesis 19 warns that compromise can deeply wound a family, while also showing that God's mercy can rescue even hesitant people.",
  },
  20: {
    map: [
      "🛡️ Abraham repeats the Sarah-as-sister fear pattern.",
      "🌙 God warns Abimelech in a dream.",
      "🧭 Abraham's weakness threatens the promise again.",
      "🙏 God protects Sarah before Isaac's birth.",
    ],
    phrases: [
      ["She is my sister", "This repeated half-truth shows fear that has not been fully healed in Abraham."],
      ["you are a dead man", "God confronts Abimelech because the covenant promise and Sarah's protection are serious."],
      ["God healed Abimelech", "The chapter ends with restoration after God exposes the danger."],
    ],
    culture: "Marriage alliances and royal households carried political and social power. Sarah being taken into a king's house would endanger the clarity of the promised line.",
    connections: "Genesis 20 echoes Genesis 12, showing repeated fear. It also prepares Genesis 21, where Isaac is finally born through Sarah.",
    takeaway: "Genesis 20 teaches that God's promise is stronger than Abraham's fear, but repeated fear still creates real danger.",
  },
  21: {
    map: [
      "👶 Isaac is born exactly as God promised.",
      "😂 Sarah's laughter turns from disbelief into joy.",
      "💧 God hears Hagar and Ishmael in the wilderness.",
      "🌳 Abraham worships the everlasting God at Beersheba.",
    ],
    phrases: [
      ["as he had said", "The chapter emphasizes that Isaac's birth happens because God keeps His exact word."],
      ["God heard the voice of the boy", "Ishmael's story is not ignored. God hears and provides in the wilderness."],
      ["Everlasting God", "Abraham worships the God whose faithfulness outlasts human generations."],
    ],
    culture: "Weaning feasts celebrated a child's survival beyond the most fragile early years. Wells were essential for life and could become covenant boundary markers.",
    connections: "Isaac's birth fulfills Genesis 17-18. Hagar's second wilderness scene echoes Genesis 16 and confirms God's care for Ishmael.",
    takeaway: "Genesis 21 teaches that God keeps His promise at the appointed time and still hears people outside the center of the covenant line.",
  },
  22: {
    map: [
      "⛰️ God tests Abraham concerning Isaac.",
      "🪵 Abraham and Isaac walk toward Moriah together.",
      "🐏 The LORD provides a ram in Isaac's place.",
      "✨ The promise is reaffirmed after the test.",
    ],
    phrases: [
      ["your son, your only son Isaac, whom you love", "The wording slows the reader down to feel the weight of the test."],
      ["God will provide for himself the lamb", "Abraham's answer becomes the heart of the chapter: provision must come from God."],
      ["The LORD will provide", "The place is named by God's provision, not Abraham's achievement."],
    ],
    culture: "Firstborn sons carried family future, inheritance, and hope. The test touches the most precious visible sign of the promise.",
    connections: "Mount Moriah and the provided substitute become major biblical patterns of sacrifice, provision, and trust. Christian readers often see deep foreshadowing of the beloved Son and substitution.",
    takeaway: "Genesis 22 teaches that faith entrusts even the promise back to the God who gave it, because the LORD provides.",
  },
  23: {
    map: [
      "🪨 Sarah dies in the land of Canaan.",
      "💔 Abraham mourns honestly.",
      "📜 Abraham purchases the cave of Machpelah.",
      "🗺️ The first owned piece of promised land is a burial place.",
    ],
    phrases: [
      ["Abraham came to mourn", "Faith does not erase grief. Abraham's mourning is part of the covenant story."],
      ["I am a sojourner and foreigner", "Abraham still lives as a resident alien in the land God promised."],
      ["for the full price", "Abraham secures the burial place publicly and legally."],
    ],
    culture: "Burial land mattered because it tied family memory, honor, and future hope to a place. Public negotiation at the city gate made the purchase legally witnessed.",
    connections: "Machpelah becomes the family burial place for the patriarchs and matriarchs, anchoring the promise physically in Canaan.",
    takeaway: "Genesis 23 teaches that God's promise keeps moving even through grief, and faith can act with hope while mourning.",
  },
  24: {
    map: [
      "💍 Abraham sends his servant to find a wife for Isaac.",
      "🙏 The servant prays for guidance at the well.",
      "💧 Rebekah shows generosity and courage.",
      "🏠 Isaac receives Rebekah, and the next generation of promise begins.",
    ],
    phrases: [
      ["the LORD had blessed Abraham in all things", "The search for Rebekah happens under the shadow of God's long faithfulness."],
      ["by this I shall know", "The servant asks for guidance tied to character, not only convenience."],
      ["I will go", "Rebekah responds with courageous willingness, echoing Abraham's earlier leaving by faith."],
    ],
    culture: "Marriage negotiations involved family, kinship, gifts, travel, and household continuity. Wells were natural meeting places because they gathered people, work, hospitality, and provision.",
    connections: "Rebekah's willingness connects Abraham's call to the next generation. Isaac and Rebekah carry the covenant story forward into Genesis 25.",
    takeaway: "Genesis 24 teaches that God's guidance often appears through prayer, providence, character, and willing obedience.",
  },
};

function getStudyGuideMarkdown(reference: string) {
  const match = reference.match(/^Genesis\s+(\d+):/i);
  const chapter = match ? Number(match[1]) : 0;
  const guide = bibleYearGenesisStudyGuides[chapter];
  if (!guide) return "";

  const phraseLines = guide.phrases
    .map(([phrase, explanation]) => `### "${phrase}"\n\n${explanation}`)
    .join("\n\n");

  return `## 🧭 Chapter Map

${guide.map.map((item) => `- ${item}`).join("\n")}

## 🔎 Phrases To Notice

${phraseLines}

## 🏺 History And Culture

${guide.culture}

## 🔗 Bible Connections

${guide.connections}

## 🙏 What This Teaches Us

${guide.takeaway}`;
}

function buildFullGenesisVerseBlock(reference: string) {
  const match = reference.match(/^Genesis\s+(\d+):(\d+)(?:\s*-\s*(\d+))?$/i);
  if (!match) return null;

  const chapter = Number(match[1]);
  const startVerse = Number(match[2]);
  const endVerse = Number(match[3] || match[2]);
  if (!Number.isFinite(chapter) || !Number.isFinite(startVerse) || !Number.isFinite(endVerse)) return null;

  const verses = (BIBLE_YEAR_GENESIS_WEB_VERSES[chapter] || []).filter(
    (verse) => verse.verse >= startVerse && verse.verse <= endVerse,
  );
  if (!verses.length) return null;

  return verses
    .map((verse) => `> 📖 **${verse.verse}** ${verse.text}`)
    .join("\n>\n\n");
}

function replaceOpeningVerseExcerpt(lines: string[], reference: string) {
  const fullVerseBlock = buildFullGenesisVerseBlock(reference);
  if (!fullVerseBlock) return lines;

  let cursor = 0;
  while (lines[cursor]?.trim() === "") cursor += 1;
  if (!lines[cursor]?.trim().startsWith(">")) return lines;

  while (cursor < lines.length && (lines[cursor]?.trim() === "" || lines[cursor]?.trim().startsWith(">"))) {
    cursor += 1;
  }

  return [fullVerseBlock, "", ...lines.slice(cursor)];
}

function prepareOpenSectionMarkdown(markdown: string, reference: string, title: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  while (lines[0]?.trim() === "") lines.shift();

  const firstHeading = lines[0];
  if (/^#{1,6}\s+/.test(firstHeading ?? "") && normalizeReferenceText(getHeadingText(firstHeading)) === normalizeReferenceText(reference)) {
    lines.shift();
    while (lines[0]?.trim() === "") lines.shift();
  }

  const nextHeading = lines[0];
  if (/^#{1,6}\s+/.test(nextHeading ?? "") && normalizeHeadingText(getHeadingText(nextHeading)) === normalizeHeadingText(title)) {
    lines.shift();
    while (lines[0]?.trim() === "") lines.shift();
  }

  const prepared = addBlankLineBetweenVerseBlocks(replaceOpeningVerseExcerpt(lines, reference).join("\n"));
  const studyGuide = getStudyGuideMarkdown(reference);
  if (!studyGuide || prepared.includes("## 🧭 Chapter Map")) return prepared;

  const preparedLines = prepared.split("\n");
  let insertIndex = 0;
  while (insertIndex < preparedLines.length && (preparedLines[insertIndex]?.trim() === "" || preparedLines[insertIndex]?.trim().startsWith(">"))) {
    insertIndex += 1;
  }

  return [
    ...preparedLines.slice(0, insertIndex),
    "",
    studyGuide,
    "",
    ...preparedLines.slice(insertIndex),
  ].join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export default function BibleYearDeepStudySectionCards({
  sections,
  activeReference,
  onActiveReferenceChange,
  onSectionOpen,
  intro,
  closing,
  topId,
  className = "",
}: BibleYearDeepStudySectionCardsProps) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function openSection(section: BibleYearDeepStudySection) {
    const reference = section.reference;
    const nextReference = activeReference === reference ? null : reference;
    onActiveReferenceChange(nextReference);
    if (!nextReference) return;
    onSectionOpen?.(section);
    if (typeof window === "undefined") return;
    window.setTimeout(() => {
      cardRefs.current[nextReference]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <div className={className}>
      <span id={topId} className="block h-0" aria-hidden="true" />

      {intro ? (
        <section className="mb-4 rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_7%,var(--bb-card,#ffffff))] px-4 py-4 text-[var(--bb-text-primary,#111827)]">
          {intro.eyebrow ? (
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{intro.eyebrow}</p>
          ) : null}
          <h3 className="mt-2 text-xl font-black leading-tight">{intro.title}</h3>
          <div className="mt-3 space-y-3">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">
                {paragraph}
              </p>
            ))}
          </div>
          {intro.callout ? (
            <p className="mt-4 border-l-4 border-[var(--bb-accent,#f6b44b)] pl-3 text-sm font-black leading-6 text-[var(--bb-text-primary,#111827)]">
              {intro.callout}
            </p>
          ) : null}
        </section>
      ) : null}

      <div className="grid gap-2">
        {sections.map((section, index) => {
          const isOpen = activeReference === section.reference;
          const shouldPrompt = !activeReference && index === 0;
          return (
            <div
              key={`bible-year-deep-study-${section.reference}`}
              ref={(node) => {
                cardRefs.current[section.reference] = node;
              }}
            >
              <button
                type="button"
                onClick={() => openSection(section)}
                className={`flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-3 text-left transition sm:gap-3 sm:px-3 ${
                  isOpen
                    ? "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card,#ffffff))]"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] hover:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_7%,var(--bb-card,#ffffff))]"
                } ${shouldPrompt ? "bible-year-first-deep-note-prompt" : ""}`}
                aria-expanded={isOpen}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-lg">
                  {section.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black leading-tight text-[var(--bb-text-primary,#111827)]">{section.reference}</span>
                  <span className="mt-0.5 block text-xs font-black leading-5 text-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_58%,var(--bb-text-secondary,#4b5563))]">{section.title}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{section.summary}</span>
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 shrink-0 text-[var(--bb-accent,#f6b44b)] transition ${isOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {isOpen ? (
                <div className="bible-year-deep-note-open mt-2 bg-[var(--bb-card,#ffffff)] px-0 py-3 text-[var(--bb-text-primary,#111827)] sm:mt-3 sm:rounded-[24px] sm:border sm:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,var(--bb-card-border,#dbe7f4))] sm:bg-[var(--bb-card,#ffffff)] sm:px-3 sm:py-4">
                  <ChapterNotesMarkdown compactMobile>{prepareOpenSectionMarkdown(section.markdown, section.reference, section.title)}</ChapterNotesMarkdown>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {closing ? (
        <section className="mt-4 rounded-[22px] border border-[color-mix(in_srgb,var(--bb-success,#16a34a)_20%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-success,#16a34a)_7%,var(--bb-card,#ffffff))] px-4 py-4 text-[var(--bb-text-primary,#111827)]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-success,#16a34a)]">Closing</p>
          <h3 className="mt-2 text-xl font-black leading-tight">{closing.title}</h3>
          <div className="mt-3 space-y-3">
            {closing.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">
                {paragraph}
              </p>
            ))}
          </div>
          {closing.prayer ? (
            <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--bb-success,#16a34a)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-success,#16a34a)]">
                {closing.prayerTitle || "Prayer"}
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">{closing.prayer}</p>
            </div>
          ) : null}
        </section>
      ) : null}
      <style jsx>{`
        @keyframes bible-year-first-deep-note-nudge {
          0%,
          100% {
            transform: translateX(0) scale(1);
            box-shadow: 0 0 0 color-mix(in srgb, var(--bb-accent, #f6b44b) 0%, transparent);
          }
          12% {
            transform: translateX(-2px) scale(1.01);
          }
          24% {
            transform: translateX(2px) scale(1.01);
          }
          36% {
            transform: translateX(-1px) scale(1.01);
          }
          48% {
            transform: translateX(1px) scale(1.01);
            box-shadow: 0 0 24px color-mix(in srgb, var(--bb-accent, #f6b44b) 28%, transparent);
          }
        }

        .bible-year-first-deep-note-prompt {
          animation: bible-year-first-deep-note-nudge 1.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
