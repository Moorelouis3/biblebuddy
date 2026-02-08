"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { logActionToMasterActions } from "@/lib/actionRecorder";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

async function fetchVerseText(reference: string): Promise<string> {
  try {
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, "+");
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "proverbs1", question: "What is the main purpose of Proverbs?", options: [{ label: "A", text: "History" }, { label: "B", text: "Wisdom and instruction" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Proverbs 1:2", explanation: "Proverbs teaches wisdom for daily life." },
  { id: "proverbs2", question: "What is the fear of the Lord?", options: [{ label: "A", text: "The end of wisdom" }, { label: "B", text: "The beginning of knowledge" }, { label: "C", text: "A weakness" }, { label: "D", text: "Optional" }], correctAnswer: "B", verse: "Proverbs 1:7", explanation: "True knowledge begins with reverence for God." },
  { id: "proverbs3", question: "Who primarily wrote Proverbs?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Moses" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Proverbs 1:1", explanation: "Solomon authored most of Proverbs." },
  { id: "proverbs4", question: "What do fools despise?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Wisdom and discipline" }, { label: "C", text: "Strength" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Proverbs 1:7", explanation: "Fools reject instruction." },
  { id: "proverbs5", question: "What does Proverbs warn against repeatedly?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Laziness" }, { label: "C", text: "Immorality" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Proverbs 1-9", explanation: "Proverbs addresses many life dangers." },
  { id: "proverbs6", question: "Who is warned against in Proverbs 1?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Sinners who entice" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Proverbs 1:10", explanation: "Wisdom avoids evil companions." },
  { id: "proverbs7", question: "What path leads to life?", options: [{ label: "A", text: "Pleasure" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 2:6", explanation: "Wisdom comes from the Lord." },
  { id: "proverbs8", question: "What does wisdom offer?", options: [{ label: "A", text: "Wealth only" }, { label: "B", text: "Protection and understanding" }, { label: "C", text: "Power" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Proverbs 2:11", explanation: "Wisdom guards those who seek it." },
  { id: "proverbs9", question: "What does trusting in the Lord lead to?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Straight paths" }, { label: "C", text: "Wealth" }, { label: "D", text: "Ease" }], correctAnswer: "B", verse: "Proverbs 3:5-6", explanation: "Trusting God directs life." },
  { id: "proverbs10", question: "What should not be leaned on?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Understanding" }, { label: "C", text: "Your own understanding" }, { label: "D", text: "Instruction" }], correctAnswer: "C", verse: "Proverbs 3:5", explanation: "Human understanding is limited." },
  { id: "proverbs11", question: "What does the Lord discipline?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "Those He loves" }, { label: "C", text: "The foolish" }, { label: "D", text: "The weak" }], correctAnswer: "B", verse: "Proverbs 3:12", explanation: "Discipline reflects love." },
  { id: "proverbs12", question: "What is more valuable than riches?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Power" }, { label: "D", text: "Influence" }], correctAnswer: "B", verse: "Proverbs 3:15", explanation: "Wisdom surpasses wealth." },
  { id: "proverbs13", question: "What does wisdom cry out in?", options: [{ label: "A", text: "Secret" }, { label: "B", text: "Public places" }, { label: "C", text: "Temples" }, { label: "D", text: "Houses" }], correctAnswer: "B", verse: "Proverbs 1:20", explanation: "Wisdom is accessible to all." },
  { id: "proverbs14", question: "What leads to death?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "A way that seems right to a man" }, { label: "C", text: "Discipline" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Proverbs 14:12", explanation: "Human judgment can mislead." },
  { id: "proverbs15", question: "What turns away wrath?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "A gentle answer" }, { label: "C", text: "Strength" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Gentleness defuses conflict." },
  { id: "proverbs16", question: "What does pride come before?", options: [{ label: "A", text: "Honor" }, { label: "B", text: "Fall" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Proverbs 16:18", explanation: "Pride leads to downfall." },
  { id: "proverbs17", question: "What commits plans successfully?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "The Lord" }, { label: "C", text: "Strength" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 16:3", explanation: "God establishes plans." },
  { id: "proverbs18", question: "What is life and death in the power of?", options: [{ label: "A", text: "Actions" }, { label: "B", text: "The tongue" }, { label: "C", text: "The heart" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Proverbs 18:21", explanation: "Words carry great power." },
  { id: "proverbs19", question: "What does a soft tongue break?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "A bone" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 25:15", explanation: "Gentle words influence deeply." },
  { id: "proverbs20", question: "What does the Lord detest?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Dishonest scales" }, { label: "C", text: "Silence" }, { label: "D", text: "Questions" }], correctAnswer: "B", verse: "Proverbs 11:1", explanation: "God values honesty." },
  { id: "proverbs21", question: "What is better than sacrifice?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Obedience" }, { label: "C", text: "Justice and righteousness" }, { label: "D", text: "Fasting" }], correctAnswer: "C", verse: "Proverbs 21:3", explanation: "God desires righteous living." },
  { id: "proverbs22", question: "What should guard the heart?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Diligence" }, { label: "C", text: "Everything else" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "Proverbs 4:23", explanation: "The heart directs life." },
  { id: "proverbs23", question: "What kind of friend loves at all times?", options: [{ label: "A", text: "Wise" }, { label: "B", text: "Faithful" }, { label: "C", text: "Rich" }, { label: "D", text: "Powerful" }], correctAnswer: "B", verse: "Proverbs 17:17", explanation: "True friendship is constant." },
  { id: "proverbs24", question: "What should be trained up?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Children" }, { label: "C", text: "Warriors" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Proverbs 22:6", explanation: "Early instruction shapes life." },
  { id: "proverbs25", question: "What does laziness lead to?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Poverty" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 10:4", explanation: "Diligence brings provision." },
  { id: "proverbs26", question: "What does iron sharpen?", options: [{ label: "A", text: "Steel" }, { label: "B", text: "Iron" }, { label: "C", text: "Stone" }, { label: "D", text: "Gold" }], correctAnswer: "B", verse: "Proverbs 27:17", explanation: "People sharpen one another." },
  { id: "proverbs27", question: "What should not be boasted about?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Tomorrow" }, { label: "C", text: "Strength" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Proverbs 27:1", explanation: "Life is uncertain." },
  { id: "proverbs28", question: "What does confession bring?", options: [{ label: "A", text: "Shame" }, { label: "B", text: "Mercy" }, { label: "C", text: "Punishment" }, { label: "D", text: "Loss" }], correctAnswer: "B", verse: "Proverbs 28:13", explanation: "Repentance leads to mercy." },
  { id: "proverbs29", question: "What exalts a nation?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Power" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Proverbs 14:34", explanation: "Righteousness lifts a people." },
  { id: "proverbs30", question: "What brings ruin to a city?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Pride" }, { label: "C", text: "Peace" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "Proverbs 11:11", explanation: "Pride destroys communities." },
  { id: "proverbs31", question: "What does a wise son bring?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Joy to his father" }, { label: "C", text: "Power" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Proverbs 10:1", explanation: "Wisdom blesses families." },
  { id: "proverbs32", question: "What does hatred stir up?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Conflict" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Proverbs 10:12", explanation: "Hatred breeds strife." },
  { id: "proverbs33", question: "What covers all wrongs?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Love" }, { label: "C", text: "Truth" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Proverbs 10:12", explanation: "Love restores relationships." },
  { id: "proverbs34", question: "What guards knowledge?", options: [{ label: "A", text: "The wise" }, { label: "B", text: "The tongue" }, { label: "C", text: "The heart" }, { label: "D", text: "Discipline" }], correctAnswer: "A", verse: "Proverbs 10:14", explanation: "Wisdom preserves understanding." },
  { id: "proverbs35", question: "What refreshes others?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Generosity" }, { label: "C", text: "Silence" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 11:25", explanation: "Giving blesses both giver and receiver." },
  { id: "proverbs36", question: "What finds favor with the Lord?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Honesty" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 12:22", explanation: "Truthfulness pleases God." },
  { id: "proverbs37", question: "What brings healing?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Gentle words" }, { label: "C", text: "Discipline" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 15:4", explanation: "Words can heal or harm." },
  { id: "proverbs38", question: "What makes plans succeed?", options: [{ label: "A", text: "Speed" }, { label: "B", text: "Counsel" }, { label: "C", text: "Power" }, { label: "D", text: "Money" }], correctAnswer: "B", verse: "Proverbs 20:18", explanation: "Wise counsel brings success." },
  { id: "proverbs39", question: "What does humility bring?", options: [{ label: "A", text: "Shame" }, { label: "B", text: "Honor" }, { label: "C", text: "Fear" }, { label: "D", text: "Loss" }], correctAnswer: "B", verse: "Proverbs 22:4", explanation: "Humility leads to honor." },
  { id: "proverbs40", question: "What keeps anger under control?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Patience" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Proverbs 14:29", explanation: "Patience reflects wisdom." },
  { id: "proverbs41", question: "What should be avoided?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Bad company" }, { label: "C", text: "Discipline" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Proverbs 13:20", explanation: "Companions influence character." },
  { id: "proverbs42", question: "What does a cheerful heart do?", options: [{ label: "A", text: "Bring strength" }, { label: "B", text: "Heal like medicine" }, { label: "C", text: "Cause pride" }, { label: "D", text: "Bring wealth" }], correctAnswer: "B", verse: "Proverbs 17:22", explanation: "Joy benefits the soul." },
  { id: "proverbs43", question: "What does discipline produce?", options: [{ label: "A", text: "Pain only" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Fear" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Proverbs 29:15", explanation: "Correction shapes wisdom." },
  { id: "proverbs44", question: "What leads to security?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 12:3", explanation: "Righteousness brings stability." },
  { id: "proverbs45", question: "What should be slow?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Anger" }, { label: "C", text: "Work" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Proverbs 16:32", explanation: "Self-control reflects wisdom." },
  { id: "proverbs46", question: "What does diligence lead to?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Prosperity" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Proverbs 12:24", explanation: "Hard work brings reward." },
  { id: "proverbs47", question: "What should be avoided in speech?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Harsh words" }, { label: "C", text: "Correction" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Harsh words stir anger." },
  { id: "proverbs48", question: "What is better than silver?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Power" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Proverbs 8:10", explanation: "Wisdom outweighs riches." },
  { id: "proverbs49", question: "What keeps a person safe?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Integrity" }, { label: "C", text: "Strength" }, { label: "D", text: "Influence" }], correctAnswer: "B", verse: "Proverbs 10:9", explanation: "Integrity provides security." },
  { id: "proverbs50", question: "What ruins relationships?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Gossip" }, { label: "C", text: "Correction" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 16:28", explanation: "Gossip divides friends." },
  { id: "proverbs51", question: "What should be guarded?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Heart" }, { label: "C", text: "Mind" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 4:23", explanation: "The heart directs life." },
  { id: "proverbs52", question: "What is the result of humility?", options: [{ label: "A", text: "Loss" }, { label: "B", text: "Honor" }, { label: "C", text: "Fear" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Proverbs 18:12", explanation: "Humility leads to honor." },
  { id: "proverbs53", question: "What does wisdom protect from?", options: [{ label: "A", text: "Pain" }, { label: "B", text: "Evil paths" }, { label: "C", text: "Enemies" }, { label: "D", text: "Hardship" }], correctAnswer: "B", verse: "Proverbs 2:12", explanation: "Wisdom guards moral direction." },
  { id: "proverbs54", question: "What brings stability?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Power" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 10:25", explanation: "Righteousness endures." },
  { id: "proverbs55", question: "What leads to conflict?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Pride" }, { label: "C", text: "Patience" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Proverbs 13:10", explanation: "Pride breeds strife." },
  { id: "proverbs56", question: "What should guide speech?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Strength" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 15:2", explanation: "Wise words bring understanding." },
  { id: "proverbs57", question: "What brings joy?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "A good word" }, { label: "C", text: "Power" }, { label: "D", text: "Success" }], correctAnswer: "B", verse: "Proverbs 12:25", explanation: "Encouragement lifts hearts." },
  { id: "proverbs58", question: "What is better than riches?", options: [{ label: "A", text: "Power" }, { label: "B", text: "A good name" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Proverbs 22:1", explanation: "Character outweighs wealth." },
  { id: "proverbs59", question: "What brings destruction?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Arrogance" }, { label: "C", text: "Patience" }, { label: "D", text: "Humility" }], correctAnswer: "B", verse: "Proverbs 16:18", explanation: "Arrogance leads to ruin." },
  { id: "proverbs60", question: "What should be avoided?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Hasty speech" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Proverbs 29:20", explanation: "Rash words cause trouble." },
  { id: "proverbs61", question: "What does generosity bring?", options: [{ label: "A", text: "Loss" }, { label: "B", text: "Blessing" }, { label: "C", text: "Fear" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Proverbs 11:25", explanation: "Generosity refreshes others." },
  { id: "proverbs62", question: "What does patience show?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Great understanding" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 14:29", explanation: "Patience reflects wisdom." },
  { id: "proverbs63", question: "What leads to ruin?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Laziness" }, { label: "C", text: "Discipline" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Proverbs 24:30-34", explanation: "Neglect brings loss." },
  { id: "proverbs64", question: "What brings honor?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Humility" }, { label: "C", text: "Power" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 29:23", explanation: "Humility precedes honor." },
  { id: "proverbs65", question: "What does wisdom build?", options: [{ label: "A", text: "Cities" }, { label: "B", text: "A house" }, { label: "C", text: "Empires" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 24:3", explanation: "Wisdom establishes households." },
  { id: "proverbs66", question: "What brings peace?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Gentle speech" }, { label: "C", text: "Strength" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Gentleness calms conflict." },
  { id: "proverbs67", question: "What does discipline show?", options: [{ label: "A", text: "Hatred" }, { label: "B", text: "Love" }, { label: "C", text: "Weakness" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Proverbs 13:24", explanation: "Correction reflects care." },
  { id: "proverbs68", question: "What guards against evil?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Proverbs 2:11", explanation: "Wisdom protects." },
  { id: "proverbs69", question: "What leads to life?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Wealth" }, { label: "D", text: "Pleasure" }], correctAnswer: "B", verse: "Proverbs 11:19", explanation: "Righteous living leads to life." },
  { id: "proverbs70", question: "What ruins friendships?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Gossip" }, { label: "C", text: "Correction" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Proverbs 16:28", explanation: "Gossip divides." },
  { id: "proverbs71", question: "What brings confidence?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Fear of the Lord" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 14:26", explanation: "Reverence gives security." },
  { id: "proverbs72", question: "What leads to wisdom?", options: [{ label: "A", text: "Experience" }, { label: "B", text: "Instruction" }, { label: "C", text: "Correction" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Proverbs 1-9", explanation: "Wisdom grows through discipline." },
  { id: "proverbs73", question: "What is better than strength?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Self-control" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Proverbs 16:32", explanation: "Self-control reflects wisdom." },
  { id: "proverbs74", question: "What should guide decisions?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Speed" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 3:5-6", explanation: "Wisdom directs paths." },
  { id: "proverbs75", question: "What brings stability to a family?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Power" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 14:11", explanation: "Righteousness builds homes." },
  { id: "proverbs76", question: "What should be avoided?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Pride" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Proverbs 16:18", explanation: "Pride leads to destruction." },
  { id: "proverbs77", question: "What brings healing?", options: [{ label: "A", text: "Medicine" }, { label: "B", text: "Kind words" }, { label: "C", text: "Silence" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 16:24", explanation: "Kind words heal." },
  { id: "proverbs78", question: "What protects a person?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Integrity" }, { label: "C", text: "Strength" }, { label: "D", text: "Influence" }], correctAnswer: "B", verse: "Proverbs 10:9", explanation: "Integrity brings security." },
  { id: "proverbs79", question: "What should be pursued?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Proverbs 4:7", explanation: "Wisdom is supreme." },
  { id: "proverbs80", question: "What brings peace?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Gentle speech" }, { label: "C", text: "Strength" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Gentle words calm anger." },
  { id: "proverbs81", question: "What leads to prosperity?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Diligence" }, { label: "C", text: "Power" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Proverbs 12:24", explanation: "Hard work brings reward." },
  { id: "proverbs82", question: "What should be avoided?", options: [{ label: "A", text: "Instruction" }, { label: "B", text: "Gossip" }, { label: "C", text: "Correction" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Proverbs 20:19", explanation: "Gossip causes harm." },
  { id: "proverbs83", question: "What gives life?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Strength" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 12:28", explanation: "Righteous paths lead to life." },
  { id: "proverbs84", question: "What does wisdom protect from?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "Moral failure" }, { label: "C", text: "Hardship" }, { label: "D", text: "Pain" }], correctAnswer: "B", verse: "Proverbs 2:12", explanation: "Wisdom guards behavior." },
  { id: "proverbs85", question: "What brings honor?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Humility" }, { label: "C", text: "Power" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Proverbs 18:12", explanation: "Humility precedes honor." },
  { id: "proverbs86", question: "What should be valued above riches?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Fame" }, { label: "D", text: "Pleasure" }], correctAnswer: "B", verse: "Proverbs 3:15", explanation: "Wisdom surpasses riches." },
  { id: "proverbs87", question: "What brings destruction?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Arrogance" }, { label: "C", text: "Patience" }, { label: "D", text: "Humility" }], correctAnswer: "B", verse: "Proverbs 16:18", explanation: "Arrogance leads to downfall." },
  { id: "proverbs88", question: "What leads to peace?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Gentle words" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Gentleness calms conflict." },
  { id: "proverbs89", question: "What protects relationships?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Love" }, { label: "C", text: "Silence" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Proverbs 10:12", explanation: "Love covers offenses." },
  { id: "proverbs90", question: "What does wisdom lead to?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Life" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 4:13", explanation: "Wisdom preserves life." },
  { id: "proverbs91", question: "What should be avoided?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Pride" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Proverbs 16:18", explanation: "Pride leads to ruin." },
  { id: "proverbs92", question: "What brings success?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "God's direction" }, { label: "C", text: "Strength" }, { label: "D", text: "Speed" }], correctAnswer: "B", verse: "Proverbs 16:3", explanation: "God establishes plans." },
  { id: "proverbs93", question: "What is better than gold?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Fame" }, { label: "D", text: "Pleasure" }], correctAnswer: "B", verse: "Proverbs 8:19", explanation: "Wisdom surpasses riches." },
  { id: "proverbs94", question: "What does righteousness bring?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Life" }, { label: "C", text: "Loss" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Proverbs 11:19", explanation: "Righteousness leads to life." },
  { id: "proverbs95", question: "What ruins communities?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Pride" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Humility" }], correctAnswer: "B", verse: "Proverbs 11:11", explanation: "Pride brings destruction." },
  { id: "proverbs96", question: "What does wisdom protect?", options: [{ label: "A", text: "Money" }, { label: "B", text: "Life" }, { label: "C", text: "Reputation" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 4:6", explanation: "Wisdom preserves life." },
  { id: "proverbs97", question: "What brings peace?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Gentleness" }, { label: "C", text: "Wealth" }, { label: "D", text: "Speed" }], correctAnswer: "B", verse: "Proverbs 15:1", explanation: "Gentle answers calm anger." },
  { id: "proverbs98", question: "What should be valued?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Fame" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Proverbs 4:7", explanation: "Wisdom is supreme." },
  { id: "proverbs99", question: "What brings stability?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Power" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Proverbs 12:3", explanation: "Righteousness endures." },
  { id: "proverbs100", question: "What does wisdom ultimately give?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Life" }, { label: "C", text: "Wealth" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Proverbs 3:18", explanation: "Wisdom leads to life." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ProverbsTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "proverbs");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;

    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }

        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect: correct,
          book: "proverbs",
        });
        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect: correct,
            book: "proverbs",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1,
            })
            .eq("user_id", userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = {
            ...updated[currentQuestionIndex],
            verseText,
          };
          return updated;
        });
      } catch (error) {
        console.error("Error fetching verse text:", error);
      } finally {
        setLoadingVerseText(false);
      }
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Proverbs expert!";
    if (score >= 8) return "Excellent! You know Proverbs well!";
    if (score >= 6) return "Good job! Keep studying Proverbs!";
    if (score >= 4) return "Nice try! Proverbs has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / 10
            </p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/proverbs"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600 flex gap-8">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold">Score: {correctCount}</span>
          </div>
        </div>

        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={!!selectedAnswer}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold text-gray-700">
                      {option.label}. {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 rounded-lg ${
                        option.label === currentQuestion.correctAnswer
                          ? "bg-green-100 border-2 border-green-400"
                          : option.label === selectedAnswer && !isCorrect
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-gray-700">
                        {option.label}. {option.text}
                        {option.label === currentQuestion.correctAnswer && (
                          <span className="ml-2 text-green-700">✓</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentQuestion.verse}
                  </p>
                  {loadingVerseText ? (
                    <p className="text-gray-500 text-sm italic mb-3">Loading verse...</p>
                  ) : currentQuestion.verseText ? (
                    <p className="text-gray-800 text-sm leading-relaxed mb-3 italic">
                      "{currentQuestion.verseText}"
                    </p>
                  ) : null}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
