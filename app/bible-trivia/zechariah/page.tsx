"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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
  { id: "zechariah1", question: "Who is the author of the book of Zechariah?", options: [{ label: "A", text: "Haggai" }, { label: "B", text: "Zechariah" }, { label: "C", text: "Malachi" }, { label: "D", text: "Ezra" }], correctAnswer: "B", verse: "Zechariah 1:1", explanation: "The book is attributed to the prophet Zechariah." },
  { id: "zechariah2", question: "Who was Zechariah's father?", options: [{ label: "A", text: "Iddo" }, { label: "B", text: "Berechiah" }, { label: "C", text: "Jehozadak" }, { label: "D", text: "Hilkiah" }], correctAnswer: "B", verse: "Zechariah 1:1", explanation: "Zechariah is identified as the son of Berechiah." },
  { id: "zechariah3", question: "During whose reign did Zechariah prophesy?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Artaxerxes" }, { label: "D", text: "Nebuchadnezzar" }], correctAnswer: "B", verse: "Zechariah 1:1", explanation: "Zechariah prophesied during the reign of Darius." },
  { id: "zechariah4", question: "What message opens the book?", options: [{ label: "A", text: "Comfort" }, { label: "B", text: "Return to the Lord" }, { label: "C", text: "Judgment on nations" }, { label: "D", text: "Temple rebuilding" }], correctAnswer: "B", verse: "Zechariah 1:3", explanation: "A call to repentance opens the book." },
  { id: "zechariah5", question: "What promise is attached to returning to God?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "God will return to them" }, { label: "C", text: "Peace" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Zechariah 1:3", explanation: "God promises restored relationship." },
  { id: "zechariah6", question: "Who should Israel not be like?", options: [{ label: "A", text: "Foreign nations" }, { label: "B", text: "Their ancestors" }, { label: "C", text: "The priests" }, { label: "D", text: "The kings" }], correctAnswer: "B", verse: "Zechariah 1:4", explanation: "Past disobedience is warned against." },
  { id: "zechariah7", question: "What happened to the former prophets' warnings?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Heeded" }, { label: "C", text: "Written down" }, { label: "D", text: "Forgotten immediately" }], correctAnswer: "A", verse: "Zechariah 1:4-6", explanation: "The people failed to listen." },
  { id: "zechariah8", question: "What vision appears first?", options: [{ label: "A", text: "Flying scroll" }, { label: "B", text: "Man among myrtle trees" }, { label: "C", text: "Four horns" }, { label: "D", text: "Measuring line" }], correctAnswer: "B", verse: "Zechariah 1:8", explanation: "The first night vision." },
  { id: "zechariah9", question: "What time did Zechariah receive the visions?", options: [{ label: "A", text: "Morning" }, { label: "B", text: "At night" }, { label: "C", text: "Midday" }, { label: "D", text: "Evening sacrifice" }], correctAnswer: "B", verse: "Zechariah 1:8", explanation: "The visions occurred at night." },
  { id: "zechariah10", question: "What color horses appear first?", options: [{ label: "A", text: "White" }, { label: "B", text: "Red" }, { label: "C", text: "Black" }, { label: "D", text: "Green" }], correctAnswer: "B", verse: "Zechariah 1:8", explanation: "A red horse leads the vision." },
  { id: "zechariah11", question: "What were the riders sent to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Patrol the earth" }, { label: "C", text: "Build" }, { label: "D", text: "Warn Israel" }], correctAnswer: "B", verse: "Zechariah 1:10", explanation: "They report the state of the world." },
  { id: "zechariah12", question: "What condition is the earth in?", options: [{ label: "A", text: "War" }, { label: "B", text: "Peace and quiet" }, { label: "C", text: "Chaos" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Zechariah 1:11", explanation: "Nations are at ease." },
  { id: "zechariah13", question: "How long had God been angry with Jerusalem?", options: [{ label: "A", text: "40 years" }, { label: "B", text: "70 years" }, { label: "C", text: "100 years" }, { label: "D", text: "50 years" }], correctAnswer: "B", verse: "Zechariah 1:12", explanation: "Refers to the exile period." },
  { id: "zechariah14", question: "What does God say He is returning to?", options: [{ label: "A", text: "The nations" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "The temple only" }, { label: "D", text: "The priests" }], correctAnswer: "B", verse: "Zechariah 1:16", explanation: "Restoration begins." },
  { id: "zechariah15", question: "What will be rebuilt?", options: [{ label: "A", text: "The palace" }, { label: "B", text: "The temple" }, { label: "C", text: "The wall" }, { label: "D", text: "The army" }], correctAnswer: "B", verse: "Zechariah 1:16", explanation: "Temple rebuilding promised." },
  { id: "zechariah16", question: "What vision follows?", options: [{ label: "A", text: "Flying scroll" }, { label: "B", text: "Four horns" }, { label: "C", text: "Lampstand" }, { label: "D", text: "Woman in basket" }], correctAnswer: "B", verse: "Zechariah 1:18", explanation: "Four horns symbolize oppressors." },
  { id: "zechariah17", question: "What do the four horns represent?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Nations that scattered Judah" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zechariah 1:19", explanation: "Enemy powers." },
  { id: "zechariah18", question: "What counters the horns?", options: [{ label: "A", text: "Four kings" }, { label: "B", text: "Four craftsmen" }, { label: "C", text: "Four angels" }, { label: "D", text: "Four armies" }], correctAnswer: "B", verse: "Zechariah 1:20-21", explanation: "God sends deliverers." },
  { id: "zechariah19", question: "What is the purpose of the craftsmen?", options: [{ label: "A", text: "Build" }, { label: "B", text: "Terrify and overthrow" }, { label: "C", text: "Judge Israel" }, { label: "D", text: "Protect the temple" }], correctAnswer: "B", verse: "Zechariah 1:21", explanation: "They defeat oppressors." },
  { id: "zechariah20", question: "What is seen in Zechariah 2?", options: [{ label: "A", text: "Flying scroll" }, { label: "B", text: "Man with measuring line" }, { label: "C", text: "Golden lampstand" }, { label: "D", text: "Horsemen" }], correctAnswer: "B", verse: "Zechariah 2:1", explanation: "Jerusalem's future size." },
  { id: "zechariah21", question: "Why will Jerusalem have no walls?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Because of many people and animals" }, { label: "C", text: "Enemy control" }, { label: "D", text: "Poverty" }], correctAnswer: "B", verse: "Zechariah 2:4", explanation: "Expansion and blessing." },
  { id: "zechariah22", question: "What will God be around Jerusalem?", options: [{ label: "A", text: "Stone wall" }, { label: "B", text: "Wall of fire" }, { label: "C", text: "Army" }, { label: "D", text: "River" }], correctAnswer: "B", verse: "Zechariah 2:5", explanation: "Divine protection." },
  { id: "zechariah23", question: "What will God be within Jerusalem?", options: [{ label: "A", text: "King" }, { label: "B", text: "Glory" }, { label: "C", text: "Judge" }, { label: "D", text: "Priest" }], correctAnswer: "B", verse: "Zechariah 2:5", explanation: "God's presence." },
  { id: "zechariah24", question: "Where are the people called to flee from?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Babylon" }, { label: "C", text: "Assyria" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "Zechariah 2:6", explanation: "Return from exile." },
  { id: "zechariah25", question: "Who touches God's people touches what?", options: [{ label: "A", text: "His throne" }, { label: "B", text: "The apple of His eye" }, { label: "C", text: "His law" }, { label: "D", text: "His glory" }], correctAnswer: "B", verse: "Zechariah 2:8", explanation: "God's deep protection." },
  { id: "zechariah26", question: "What will many nations do?", options: [{ label: "A", text: "Attack Jerusalem" }, { label: "B", text: "Join themselves to the Lord" }, { label: "C", text: "Mock Israel" }, { label: "D", text: "Rule Judah" }], correctAnswer: "B", verse: "Zechariah 2:11", explanation: "Global inclusion." },
  { id: "zechariah27", question: "Who will dwell among the people?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The Lord" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zechariah 2:10-11", explanation: "God's presence restored." },
  { id: "zechariah28", question: "What will the Lord inherit?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Judah as His portion" }, { label: "C", text: "Jerusalem only" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Zechariah 2:12", explanation: "Covenant language." },
  { id: "zechariah29", question: "How should all flesh respond?", options: [{ label: "A", text: "Celebrate" }, { label: "B", text: "Be silent before the Lord" }, { label: "C", text: "Fear nations" }, { label: "D", text: "Mourn" }], correctAnswer: "B", verse: "Zechariah 2:13", explanation: "Reverence before God." },
  { id: "zechariah30", question: "What chapter introduces Joshua the high priest?", options: [{ label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "5" }], correctAnswer: "B", verse: "Zechariah 3:1", explanation: "A new vision begins." },
  { id: "zechariah31", question: "Who stands accusing Joshua?", options: [{ label: "A", text: "The nations" }, { label: "B", text: "Satan" }, { label: "C", text: "The people" }, { label: "D", text: "The priests" }], correctAnswer: "B", verse: "Zechariah 3:1", explanation: "Satan acts as accuser." },
  { id: "zechariah32", question: "Who rebukes Satan?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "The Lord" }, { label: "C", text: "An angel" }, { label: "D", text: "Zechariah" }], correctAnswer: "B", verse: "Zechariah 3:2", explanation: "God defends His servant." },
  { id: "zechariah33", question: "How is Joshua clothed initially?", options: [{ label: "A", text: "Royal robes" }, { label: "B", text: "Filthy garments" }, { label: "C", text: "Priestly robes" }, { label: "D", text: "Armor" }], correctAnswer: "B", verse: "Zechariah 3:3", explanation: "Symbol of sin." },
  { id: "zechariah34", question: "What happens to Joshua's clothes?", options: [{ label: "A", text: "Burned" }, { label: "B", text: "Replaced with clean garments" }, { label: "C", text: "Left unchanged" }, { label: "D", text: "Torn" }], correctAnswer: "B", verse: "Zechariah 3:4", explanation: "Sin removed." },
  { id: "zechariah35", question: "What is placed on Joshua's head?", options: [{ label: "A", text: "Helmet" }, { label: "B", text: "Clean turban" }, { label: "C", text: "Crown" }, { label: "D", text: "Cloth" }], correctAnswer: "B", verse: "Zechariah 3:5", explanation: "Restored priesthood." },
  { id: "zechariah36", question: "What does Joshua represent?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Israel's restoration" }, { label: "C", text: "Nations" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Zechariah 3", explanation: "Cleansed leadership." },
  { id: "zechariah37", question: "What title is given to a coming figure?", options: [{ label: "A", text: "Shepherd" }, { label: "B", text: "The Branch" }, { label: "C", text: "The King" }, { label: "D", text: "The Judge" }], correctAnswer: "B", verse: "Zechariah 3:8", explanation: "Messianic reference." },
  { id: "zechariah38", question: "What is placed before Joshua?", options: [{ label: "A", text: "Scroll" }, { label: "B", text: "Stone with seven eyes" }, { label: "C", text: "Lampstand" }, { label: "D", text: "Crown" }], correctAnswer: "B", verse: "Zechariah 3:9", explanation: "Symbol of God's watchfulness." },
  { id: "zechariah39", question: "What will God remove in one day?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "The sin of the land" }, { label: "C", text: "Kings" }, { label: "D", text: "Idols" }], correctAnswer: "B", verse: "Zechariah 3:9", explanation: "Complete cleansing." },
  { id: "zechariah40", question: "What vision follows in chapter 4?", options: [{ label: "A", text: "Flying scroll" }, { label: "B", text: "Golden lampstand" }, { label: "C", text: "Chariots" }, { label: "D", text: "Woman in basket" }], correctAnswer: "B", verse: "Zechariah 4:2", explanation: "Spirit-empowered work." },
  { id: "zechariah41", question: "How many lamps are on the lampstand?", options: [{ label: "A", text: "Five" }, { label: "B", text: "Seven" }, { label: "C", text: "Ten" }, { label: "D", text: "Twelve" }], correctAnswer: "B", verse: "Zechariah 4:2", explanation: "Completeness." },
  { id: "zechariah42", question: "What are beside the lampstand?", options: [{ label: "A", text: "Two fig trees" }, { label: "B", text: "Two olive trees" }, { label: "C", text: "Two altars" }, { label: "D", text: "Two scrolls" }], correctAnswer: "B", verse: "Zechariah 4:3", explanation: "Supply of oil." },
  { id: "zechariah43", question: "What famous phrase appears here?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "Not by might nor by power" }, { label: "C", text: "Return to Me" }, { label: "D", text: "Be strong" }], correctAnswer: "B", verse: "Zechariah 4:6", explanation: "Work done by God's Spirit." },
  { id: "zechariah44", question: "Who is addressed by this message?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "The people" }, { label: "D", text: "The priests" }], correctAnswer: "B", verse: "Zechariah 4:6", explanation: "Leader of rebuilding." },
  { id: "zechariah45", question: "What will become a plain?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "The mountain before Zerubbabel" }, { label: "C", text: "The nations" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Zechariah 4:7", explanation: "Obstacles removed." },
  { id: "zechariah46", question: "Who laid the temple's foundation?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "Ezra" }, { label: "D", text: "Nehemiah" }], correctAnswer: "B", verse: "Zechariah 4:9", explanation: "Leadership confirmed." },
  { id: "zechariah47", question: "Who will complete the temple?", options: [{ label: "A", text: "The priests" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "The people" }, { label: "D", text: "The prophets" }], correctAnswer: "B", verse: "Zechariah 4:9", explanation: "God finishes what He starts." },
  { id: "zechariah48", question: "What are the seven eyes?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The eyes of the Lord" }, { label: "C", text: "Nations" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Zechariah 4:10", explanation: "God sees all." },
  { id: "zechariah49", question: "What are the two olive trees?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "The two anointed ones" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zechariah 4:14", explanation: "God's appointed leaders." },
  { id: "zechariah50", question: "What chapter introduces the flying scroll?", options: [{ label: "A", text: "4" }, { label: "B", text: "5" }, { label: "C", text: "6" }, { label: "D", text: "7" }], correctAnswer: "B", verse: "Zechariah 5:1", explanation: "Judgment vision." },
  { id: "zechariah51", question: "What does the flying scroll represent?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Curse" }, { label: "C", text: "Law" }, { label: "D", text: "Covenant" }], correctAnswer: "B", verse: "Zechariah 5:3", explanation: "Judgment on sin." },
  { id: "zechariah52", question: "Which sins are named?", options: [{ label: "A", text: "Idolatry and pride" }, { label: "B", text: "Theft and false oaths" }, { label: "C", text: "Violence and greed" }, { label: "D", text: "Fear and doubt" }], correctAnswer: "B", verse: "Zechariah 5:3-4", explanation: "Covenant violations." },
  { id: "zechariah53", question: "What happens to the sinner's house?", options: [{ label: "A", text: "Protected" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Cleansed" }, { label: "D", text: "Ignored" }], correctAnswer: "B", verse: "Zechariah 5:4", explanation: "Total judgment." },
  { id: "zechariah54", question: "What vision follows?", options: [{ label: "A", text: "Chariots" }, { label: "B", text: "Woman in a basket" }, { label: "C", text: "Lampstand" }, { label: "D", text: "Measuring line" }], correctAnswer: "B", verse: "Zechariah 5:5-7", explanation: "Wickedness personified." },
  { id: "zechariah55", question: "What is inside the basket?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "A woman representing wickedness" }, { label: "C", text: "Scroll" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Zechariah 5:7-8", explanation: "Symbol of sin." },
  { id: "zechariah56", question: "Where is wickedness taken?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Shinar" }, { label: "C", text: "Egypt" }, { label: "D", text: "Assyria" }], correctAnswer: "B", verse: "Zechariah 5:11", explanation: "Babylon region." },
  { id: "zechariah57", question: "What chapter introduces four chariots?", options: [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "7" }, { label: "D", text: "8" }], correctAnswer: "B", verse: "Zechariah 6:1", explanation: "Final night vision." },
  { id: "zechariah58", question: "What do the chariots represent?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Spirits of heaven" }, { label: "C", text: "Armies" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zechariah 6:5", explanation: "God's agents." },
  { id: "zechariah59", question: "Where do they go?", options: [{ label: "A", text: "Jerusalem only" }, { label: "B", text: "Throughout the earth" }, { label: "C", text: "Babylon" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Zechariah 6:7", explanation: "Global mission." },
  { id: "zechariah60", question: "Who receives a crown?", options: [{ label: "A", text: "Zerubbabel" }, { label: "B", text: "Joshua the high priest" }, { label: "C", text: "Zechariah" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Zechariah 6:11", explanation: "Symbolic act." },
  { id: "zechariah61", question: "What title is repeated again?", options: [{ label: "A", text: "Son of David" }, { label: "B", text: "The Branch" }, { label: "C", text: "King of kings" }, { label: "D", text: "Shepherd" }], correctAnswer: "B", verse: "Zechariah 6:12", explanation: "Messianic promise." },
  { id: "zechariah62", question: "What will the Branch do?", options: [{ label: "A", text: "Rule nations" }, { label: "B", text: "Build the temple of the Lord" }, { label: "C", text: "Destroy enemies" }, { label: "D", text: "Judge Israel" }], correctAnswer: "B", verse: "Zechariah 6:12-13", explanation: "Future fulfillment." },
  { id: "zechariah63", question: "What roles will the Branch unite?", options: [{ label: "A", text: "King and prophet" }, { label: "B", text: "Priest and king" }, { label: "C", text: "Judge and warrior" }, { label: "D", text: "Shepherd and king" }], correctAnswer: "B", verse: "Zechariah 6:13", explanation: "Priestly kingship." },
  { id: "zechariah64", question: "Who will help build the temple?", options: [{ label: "A", text: "Foreigners" }, { label: "B", text: "Those far away" }, { label: "C", text: "Priests only" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Zechariah 6:15", explanation: "Inclusive future." },
  { id: "zechariah65", question: "What determines fulfillment?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Careful obedience" }, { label: "C", text: "Time" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Zechariah 6:15", explanation: "Obedience matters." },
  { id: "zechariah66", question: "What question is asked in chapter 7?", options: [{ label: "A", text: "About rebuilding" }, { label: "B", text: "About fasting" }, { label: "C", text: "About war" }, { label: "D", text: "About kings" }], correctAnswer: "B", verse: "Zechariah 7:3", explanation: "Religious practice examined." },
  { id: "zechariah67", question: "How long had they fasted?", options: [{ label: "A", text: "40 years" }, { label: "B", text: "70 years" }, { label: "C", text: "50 years" }, { label: "D", text: "30 years" }], correctAnswer: "B", verse: "Zechariah 7:5", explanation: "Exile period." },
  { id: "zechariah68", question: "What does God question about fasting?", options: [{ label: "A", text: "Its timing" }, { label: "B", text: "Its sincerity" }, { label: "C", text: "Its duration" }, { label: "D", text: "Its cost" }], correctAnswer: "B", verse: "Zechariah 7:5-6", explanation: "Heart matters." },
  { id: "zechariah69", question: "What does God desire instead?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Justice and mercy" }, { label: "C", text: "Fasting" }, { label: "D", text: "Rituals" }], correctAnswer: "B", verse: "Zechariah 7:9", explanation: "True obedience." },
  { id: "zechariah70", question: "How did ancestors respond?", options: [{ label: "A", text: "Listened" }, { label: "B", text: "Refused to listen" }, { label: "C", text: "Repented" }, { label: "D", text: "Obeyed" }], correctAnswer: "B", verse: "Zechariah 7:11", explanation: "Stubborn hearts." },
  { id: "zechariah71", question: "What happened as a result?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Exile" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Zechariah 7:14", explanation: "Judgment followed disobedience." },
  { id: "zechariah72", question: "What tone shifts in chapter 8?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Restoration" }, { label: "C", text: "Silence" }, { label: "D", text: "Warning" }], correctAnswer: "B", verse: "Zechariah 8", explanation: "Promises of hope." },
  { id: "zechariah73", question: "What emotion does God express for Zion?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Jealous love" }, { label: "C", text: "Indifference" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Zechariah 8:2", explanation: "Passionate commitment." },
  { id: "zechariah74", question: "Who will return to dwell in Jerusalem?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Nations" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Zechariah 8:3", explanation: "God's presence restored." },
  { id: "zechariah75", question: "What will Jerusalem be called?", options: [{ label: "A", text: "City of Kings" }, { label: "B", text: "City of Truth" }, { label: "C", text: "City of Power" }, { label: "D", text: "City of Peace" }], correctAnswer: "B", verse: "Zechariah 8:3", explanation: "Faithfulness restored." },
  { id: "zechariah76", question: "Who will fill the streets?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Old men and children" }, { label: "C", text: "Priests" }, { label: "D", text: "Merchants" }], correctAnswer: "B", verse: "Zechariah 8:4-5", explanation: "Peaceful restoration." },
  { id: "zechariah77", question: "What seems marvelous?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "Restoration" }, { label: "C", text: "Judgment" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Zechariah 8:6", explanation: "Hope renewed." },
  { id: "zechariah78", question: "From where will God save His people?", options: [{ label: "A", text: "North and south" }, { label: "B", text: "East and west" }, { label: "C", text: "Babylon only" }, { label: "D", text: "Jerusalem" }], correctAnswer: "B", verse: "Zechariah 8:7", explanation: "Worldwide regathering." },
  { id: "zechariah79", question: "What relationship is restored?", options: [{ label: "A", text: "Political" }, { label: "B", text: "Covenant relationship" }, { label: "C", text: "Economic" }, { label: "D", text: "Military" }], correctAnswer: "B", verse: "Zechariah 8:8", explanation: "Faithful God." },
  { id: "zechariah80", question: "What does God encourage the people to do?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Be strong" }, { label: "C", text: "Fast" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "Zechariah 8:9", explanation: "Strength for rebuilding." },
  { id: "zechariah81", question: "What will replace former curses?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Blessing" }, { label: "C", text: "Judgment" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Zechariah 8:13", explanation: "Reversal." },
  { id: "zechariah82", question: "What are the people told not to fear?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Their past" }, { label: "C", text: "The future" }, { label: "D", text: "Enemies" }], correctAnswer: "D", verse: "Zechariah 8:15", explanation: "God's favor assured." },
  { id: "zechariah83", question: "What does God love?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Truth and peace" }, { label: "C", text: "Power" }, { label: "D", text: "Rituals" }], correctAnswer: "B", verse: "Zechariah 8:19", explanation: "Heart over ritual." },
  { id: "zechariah84", question: "What will fasting become?", options: [{ label: "A", text: "Mourning" }, { label: "B", text: "Joyful feasts" }, { label: "C", text: "Obsolete" }, { label: "D", text: "Required forever" }], correctAnswer: "B", verse: "Zechariah 8:19", explanation: "Joy replaces sorrow." },
  { id: "zechariah85", question: "What will many peoples do?", options: [{ label: "A", text: "Fight Jerusalem" }, { label: "B", text: "Seek the Lord" }, { label: "C", text: "Ignore Israel" }, { label: "D", text: "Rule nations" }], correctAnswer: "B", verse: "Zechariah 8:22", explanation: "Global worship." },
  { id: "zechariah86", question: "How many men will grab one Jew?", options: [{ label: "A", text: "Five" }, { label: "B", text: "Ten" }, { label: "C", text: "Seven" }, { label: "D", text: "Twelve" }], correctAnswer: "B", verse: "Zechariah 8:23", explanation: "Nations drawn to God." },
  { id: "zechariah87", question: "What do they want to do?", options: [{ label: "A", text: "Trade" }, { label: "B", text: "Go with you" }, { label: "C", text: "Rule" }, { label: "D", text: "Fight" }], correctAnswer: "B", verse: "Zechariah 8:23", explanation: "God's presence recognized." },
  { id: "zechariah88", question: "What phrase closes the section?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "God is with you" }, { label: "C", text: "Return to Me" }, { label: "D", text: "Be strong" }], correctAnswer: "B", verse: "Zechariah 8:23", explanation: "God among His people." },
  { id: "zechariah89", question: "What major shift occurs after chapter 8?", options: [{ label: "A", text: "Visions end" }, { label: "B", text: "Messianic prophecies increase" }, { label: "C", text: "Judgment stops" }, { label: "D", text: "Temple finished" }], correctAnswer: "B", verse: "Zechariah 9-14", explanation: "Future-focused prophecies." },
  { id: "zechariah90", question: "What animal does the coming king ride?", options: [{ label: "A", text: "Horse" }, { label: "B", text: "Donkey" }, { label: "C", text: "Camel" }, { label: "D", text: "Chariot" }], correctAnswer: "B", verse: "Zechariah 9:9", explanation: "Humble Messiah." },
  { id: "zechariah91", question: "How is the king described?", options: [{ label: "A", text: "Powerful and proud" }, { label: "B", text: "Righteous and gentle" }, { label: "C", text: "Warlike" }, { label: "D", text: "Fearsome" }], correctAnswer: "B", verse: "Zechariah 9:9", explanation: "Messianic character." },
  { id: "zechariah92", question: "What will be cut off?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Chariots and war horses" }, { label: "C", text: "Temples" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zechariah 9:10", explanation: "Peaceful reign." },
  { id: "zechariah93", question: "What will the king proclaim?", options: [{ label: "A", text: "War" }, { label: "B", text: "Peace to the nations" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Zechariah 9:10", explanation: "Universal peace." },
  { id: "zechariah94", question: "What symbolizes hope for prisoners?", options: [{ label: "A", text: "Chains" }, { label: "B", text: "Blood of the covenant" }, { label: "C", text: "Temple" }, { label: "D", text: "Wall" }], correctAnswer: "B", verse: "Zechariah 9:11", explanation: "Covenant promise." },
  { id: "zechariah95", question: "What is God called in Zechariah 9?", options: [{ label: "A", text: "King" }, { label: "B", text: "Warrior" }, { label: "C", text: "Shepherd" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Zechariah 9:14", explanation: "Divine protector." },
  { id: "zechariah96", question: "What does Zechariah emphasize about the Messiah?", options: [{ label: "A", text: "Military conquest" }, { label: "B", text: "Humility and peace" }, { label: "C", text: "Wealth" }, { label: "D", text: "Political power" }], correctAnswer: "B", verse: "Zechariah 9", explanation: "Unexpected king." },
  { id: "zechariah97", question: "What does Zechariah show about God's plan?", options: [{ label: "A", text: "Local only" }, { label: "B", text: "Global redemption" }, { label: "C", text: "Delayed forever" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Zechariah", explanation: "God's worldwide purpose." },
  { id: "zechariah98", question: "What emotion closes the book's promises?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Hope" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Zechariah", explanation: "Hopeful future." },
  { id: "zechariah99", question: "What does Zechariah teach about obedience?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential" }, { label: "C", text: "Symbolic" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Zechariah", explanation: "Covenant faithfulness." },
  { id: "zechariah100", question: "Overall, Zechariah moves from what to what?", options: [{ label: "A", text: "Judgment to silence" }, { label: "B", text: "Visions of restoration to future hope" }, { label: "C", text: "Exile to exile" }, { label: "D", text: "Fear to defeat" }], correctAnswer: "B", verse: "Zechariah", explanation: "Hope-filled prophecy." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ZechariahTriviaPage() {
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
          .eq("book", "zechariah");

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
          book: "zechariah",
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
            book: "zechariah",
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
    if (score === 10) return "Perfect! You're a Zechariah expert!";
    if (score >= 8) return "Excellent! You know Zechariah well!";
    if (score >= 6) return "Good job! Keep studying Zechariah!";
    if (score >= 4) return "Nice try! Zechariah has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">Books</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">Congrats!</div>
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
              href="/bible-trivia/zechariah"
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
            {"<- Back"}
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
                  {isCorrect ? "Correct" : "Incorrect"}
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
                          <span className="ml-2 text-green-700">(correct)</span>
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
                    <p className="text-gray-500 text-sm italic mb-3">
                      Loading verse...
                    </p>
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
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
