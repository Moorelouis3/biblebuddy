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
  { id: "daniel1", question: "In what year was Daniel taken into exile?", options: [{ label: "A", text: "605 BC" }, { label: "B", text: "586 BC" }, { label: "C", text: "722 BC" }, { label: "D", text: "539 BC" }], correctAnswer: "A", verse: "Daniel 1:1", explanation: "Daniel was taken during the first Babylonian exile." },
  { id: "daniel2", question: "Who was king of Babylon when Daniel was exiled?", options: [{ label: "A", text: "Belshazzar" }, { label: "B", text: "Darius" }, { label: "C", text: "Nebuchadnezzar" }, { label: "D", text: "Cyrus" }], correctAnswer: "C", verse: "Daniel 1:1", explanation: "Nebuchadnezzar ruled Babylon at the time." },
  { id: "daniel3", question: "What tribe was Daniel from?", options: [{ label: "A", text: "Levi" }, { label: "B", text: "Benjamin" }, { label: "C", text: "Judah" }, { label: "D", text: "Ephraim" }], correctAnswer: "C", verse: "Daniel 1:6", explanation: "Daniel was from the tribe of Judah." },
  { id: "daniel4", question: "What new name was Daniel given?", options: [{ label: "A", text: "Shadrach" }, { label: "B", text: "Belteshazzar" }, { label: "C", text: "Meshach" }, { label: "D", text: "Abednego" }], correctAnswer: "B", verse: "Daniel 1:7", explanation: "Daniel was renamed Belteshazzar." },
  { id: "daniel5", question: "What food did Daniel refuse?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Vegetables" }, { label: "C", text: "King's food and wine" }, { label: "D", text: "Meat" }], correctAnswer: "C", verse: "Daniel 1:8", explanation: "Daniel refused to defile himself." },
  { id: "daniel6", question: "What test did Daniel propose?", options: [{ label: "A", text: "Prayer test" }, { label: "B", text: "Ten-day diet" }, { label: "C", text: "Fasting" }, { label: "D", text: "Wisdom contest" }], correctAnswer: "B", verse: "Daniel 1:12", explanation: "A ten-day test proved God's favor." },
  { id: "daniel7", question: "What was the result of the test?", options: [{ label: "A", text: "They were weaker" }, { label: "B", text: "They were healthier" }, { label: "C", text: "They were punished" }, { label: "D", text: "They were ignored" }], correctAnswer: "B", verse: "Daniel 1:15", explanation: "God honored obedience." },
  { id: "daniel8", question: "What gift did God give Daniel?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Understanding visions and dreams" }, { label: "C", text: "Wealth" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Daniel 1:17", explanation: "Daniel received insight into visions." },
  { id: "daniel9", question: "What troubled King Nebuchadnezzar?", options: [{ label: "A", text: "A famine" }, { label: "B", text: "A dream" }, { label: "C", text: "A rebellion" }, { label: "D", text: "A plague" }], correctAnswer: "B", verse: "Daniel 2:1", explanation: "The king was disturbed by a dream." },
  { id: "daniel10", question: "What did the king demand from his wise men?", options: [{ label: "A", text: "Interpret the dream only" }, { label: "B", text: "Tell the dream and interpret it" }, { label: "C", text: "Pray for him" }, { label: "D", text: "Offer sacrifices" }], correctAnswer: "B", verse: "Daniel 2:5", explanation: "They had to tell the dream itself." },
  { id: "daniel11", question: "Who revealed the dream to Daniel?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "God" }, { label: "C", text: "A prophet" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Daniel 2:19", explanation: "God revealed the mystery." },
  { id: "daniel12", question: "What did the dream statue represent?", options: [{ label: "A", text: "One kingdom" }, { label: "B", text: "Four kingdoms" }, { label: "C", text: "Israel only" }, { label: "D", text: "Babylon only" }], correctAnswer: "B", verse: "Daniel 2:31-45", explanation: "The statue symbolized successive kingdoms." },
  { id: "daniel13", question: "What was the head of the statue made of?", options: [{ label: "A", text: "Silver" }, { label: "B", text: "Gold" }, { label: "C", text: "Bronze" }, { label: "D", text: "Iron" }], correctAnswer: "B", verse: "Daniel 2:32", explanation: "Gold represented Babylon." },
  { id: "daniel14", question: "What destroyed the statue?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "A stone not cut by human hands" }, { label: "C", text: "Water" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "Daniel 2:34", explanation: "God's kingdom destroys earthly kingdoms." },
  { id: "daniel15", question: "How did Nebuchadnezzar respond to Daniel?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Worship" }, { label: "C", text: "Dismissal" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Daniel 2:46", explanation: "The king honored Daniel's God." },
  { id: "daniel16", question: "What position was Daniel given?", options: [{ label: "A", text: "Soldier" }, { label: "B", text: "Ruler over Babylon's province" }, { label: "C", text: "Priest" }, { label: "D", text: "Scribe" }], correctAnswer: "B", verse: "Daniel 2:48", explanation: "Daniel was promoted." },
  { id: "daniel17", question: "What did Nebuchadnezzar build?", options: [{ label: "A", text: "A temple" }, { label: "B", text: "A golden image" }, { label: "C", text: "A palace" }, { label: "D", text: "A wall" }], correctAnswer: "B", verse: "Daniel 3:1", explanation: "The king built a golden image." },
  { id: "daniel18", question: "What was required when music played?", options: [{ label: "A", text: "Sing" }, { label: "B", text: "Bow to the image" }, { label: "C", text: "Pray" }, { label: "D", text: "Leave" }], correctAnswer: "B", verse: "Daniel 3:5", explanation: "Worship of the image was demanded." },
  { id: "daniel19", question: "Who refused to bow?", options: [{ label: "A", text: "Daniel only" }, { label: "B", text: "Shadrach, Meshach, and Abednego" }, { label: "C", text: "The priests" }, { label: "D", text: "The wise men" }], correctAnswer: "B", verse: "Daniel 3:12", explanation: "They refused idolatry." },
  { id: "daniel20", question: "What punishment was threatened?", options: [{ label: "A", text: "Beheading" }, { label: "B", text: "Fiery furnace" }, { label: "C", text: "Exile" }, { label: "D", text: "Prison" }], correctAnswer: "B", verse: "Daniel 3:6", explanation: "Fire awaited those who refused." },
  { id: "daniel21", question: "How hot was the furnace?", options: [{ label: "A", text: "Normal heat" }, { label: "B", text: "Seven times hotter" }, { label: "C", text: "Ten times hotter" }, { label: "D", text: "Unspecified" }], correctAnswer: "B", verse: "Daniel 3:19", explanation: "The furnace was overheated." },
  { id: "daniel22", question: "What happened to the soldiers who threw them in?", options: [{ label: "A", text: "They survived" }, { label: "B", text: "They burned to death" }, { label: "C", text: "They fled" }, { label: "D", text: "They were spared" }], correctAnswer: "B", verse: "Daniel 3:22", explanation: "The heat killed the soldiers." },
  { id: "daniel23", question: "How many men did the king see in the fire?", options: [{ label: "A", text: "Three" }, { label: "B", text: "Four" }, { label: "C", text: "Five" }, { label: "D", text: "Seven" }], correctAnswer: "B", verse: "Daniel 3:25", explanation: "A fourth appeared with them." },
  { id: "daniel24", question: "Who did the fourth man resemble?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "A son of the gods" }, { label: "C", text: "A prophet" }, { label: "D", text: "A king" }], correctAnswer: "B", verse: "Daniel 3:25", explanation: "God was present in the fire." },
  { id: "daniel25", question: "What was not harmed?", options: [{ label: "A", text: "Their hair" }, { label: "B", text: "Their clothes" }, { label: "C", text: "Their bodies" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Daniel 3:27", explanation: "They were fully protected." },
  { id: "daniel26", question: "What did the king decree afterward?", options: [{ label: "A", text: "Worship the image" }, { label: "B", text: "Honor their God" }, { label: "C", text: "Punish rebels" }, { label: "D", text: "Exile Israel" }], correctAnswer: "B", verse: "Daniel 3:29", explanation: "God was honored." },
  { id: "daniel27", question: "What dream did Nebuchadnezzar later have?", options: [{ label: "A", text: "A statue" }, { label: "B", text: "A tree" }, { label: "C", text: "A beast" }, { label: "D", text: "A river" }], correctAnswer: "B", verse: "Daniel 4:10", explanation: "The dream involved a great tree." },
  { id: "daniel28", question: "What happened to the tree?", options: [{ label: "A", text: "It grew" }, { label: "B", text: "It was cut down" }, { label: "C", text: "It burned" }, { label: "D", text: "It withered" }], correctAnswer: "B", verse: "Daniel 4:14", explanation: "The tree symbolized judgment." },
  { id: "daniel29", question: "Who did the tree represent?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Nebuchadnezzar" }, { label: "C", text: "Israel" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "Daniel 4:22", explanation: "The king himself." },
  { id: "daniel30", question: "What punishment came upon Nebuchadnezzar?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Madness" }, { label: "C", text: "Exile" }, { label: "D", text: "Blindness" }], correctAnswer: "B", verse: "Daniel 4:33", explanation: "He lived like an animal." },
  { id: "daniel31", question: "How long did Nebuchadnezzar's madness last?", options: [{ label: "A", text: "One year" }, { label: "B", text: "Three years" }, { label: "C", text: "Seven periods of time" }, { label: "D", text: "Ten years" }], correctAnswer: "C", verse: "Daniel 4:32", explanation: "Seven periods passed." },
  { id: "daniel32", question: "What restored Nebuchadnezzar?", options: [{ label: "A", text: "Medicine" }, { label: "B", text: "Humility before God" }, { label: "C", text: "Prayer" }, { label: "D", text: "Daniel's advice" }], correctAnswer: "B", verse: "Daniel 4:34", explanation: "He humbled himself." },
  { id: "daniel33", question: "Who became king after Nebuchadnezzar?", options: [{ label: "A", text: "Darius" }, { label: "B", text: "Belshazzar" }, { label: "C", text: "Cyrus" }, { label: "D", text: "Xerxes" }], correctAnswer: "B", verse: "Daniel 5:1", explanation: "Belshazzar ruled next." },
  { id: "daniel34", question: "What sacred items were misused?", options: [{ label: "A", text: "Scrolls" }, { label: "B", text: "Temple vessels" }, { label: "C", text: "Crowns" }, { label: "D", text: "Altars" }], correctAnswer: "B", verse: "Daniel 5:2", explanation: "Holy vessels were profaned." },
  { id: "daniel35", question: "What appeared on the wall?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "A hand writing" }, { label: "C", text: "Blood" }, { label: "D", text: "Symbols" }], correctAnswer: "B", verse: "Daniel 5:5", explanation: "The hand wrote judgment." },
  { id: "daniel36", question: "What words were written?", options: [{ label: "A", text: "Faith and hope" }, { label: "B", text: "Mene, Mene, Tekel, Parsin" }, { label: "C", text: "Repent now" }, { label: "D", text: "God is great" }], correctAnswer: "B", verse: "Daniel 5:25", explanation: "The words declared judgment." },
  { id: "daniel37", question: "Who interpreted the writing?", options: [{ label: "A", text: "Astrologers" }, { label: "B", text: "Daniel" }, { label: "C", text: "Priests" }, { label: "D", text: "Wise men" }], correctAnswer: "B", verse: "Daniel 5:26", explanation: "Daniel explained the message." },
  { id: "daniel38", question: "What did Mene mean?", options: [{ label: "A", text: "Blessed" }, { label: "B", text: "Numbered" }, { label: "C", text: "Divided" }, { label: "D", text: "Finished" }], correctAnswer: "B", verse: "Daniel 5:26", explanation: "God numbered the kingdom." },
  { id: "daniel39", question: "What happened that night?", options: [{ label: "A", text: "Repentance" }, { label: "B", text: "Belshazzar was killed" }, { label: "C", text: "Daniel fled" }, { label: "D", text: "Peace declared" }], correctAnswer: "B", verse: "Daniel 5:30", explanation: "Judgment fell immediately." },
  { id: "daniel40", question: "Who took over the kingdom?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius the Mede" }, { label: "C", text: "Nebuchadnezzar" }, { label: "D", text: "Xerxes" }], correctAnswer: "B", verse: "Daniel 5:31", explanation: "Darius took control." },
  { id: "daniel41", question: "What position did Daniel hold?", options: [{ label: "A", text: "General" }, { label: "B", text: "One of three administrators" }, { label: "C", text: "Priest" }, { label: "D", text: "Governor" }], correctAnswer: "B", verse: "Daniel 6:2", explanation: "Daniel was highly placed." },
  { id: "daniel42", question: "Why were officials jealous?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Favor with the king" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Daniel 6:3", explanation: "Daniel was favored." },
  { id: "daniel43", question: "What law was passed?", options: [{ label: "A", text: "No fasting" }, { label: "B", text: "No prayer to anyone but the king" }, { label: "C", text: "Worship idols" }, { label: "D", text: "Destroy temples" }], correctAnswer: "B", verse: "Daniel 6:7", explanation: "Prayer was restricted." },
  { id: "daniel44", question: "What did Daniel do anyway?", options: [{ label: "A", text: "Fled" }, { label: "B", text: "Prayed openly" }, { label: "C", text: "Stopped praying" }, { label: "D", text: "Argued" }], correctAnswer: "B", verse: "Daniel 6:10", explanation: "Daniel remained faithful." },
  { id: "daniel45", question: "What punishment followed?", options: [{ label: "A", text: "Prison" }, { label: "B", text: "Lion's den" }, { label: "C", text: "Exile" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "Daniel 6:16", explanation: "Daniel was thrown into the lions' den." },
  { id: "daniel46", question: "Who shut the lions' mouths?", options: [{ label: "A", text: "Daniel" }, { label: "B", text: "An angel" }, { label: "C", text: "The king" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Daniel 6:22", explanation: "God sent an angel." },
  { id: "daniel47", question: "What happened to Daniel's accusers?", options: [{ label: "A", text: "They were forgiven" }, { label: "B", text: "They were thrown to lions" }, { label: "C", text: "They fled" }, { label: "D", text: "They repented" }], correctAnswer: "B", verse: "Daniel 6:24", explanation: "Justice followed." },
  { id: "daniel48", question: "What did the king proclaim?", options: [{ label: "A", text: "Fear Daniel" }, { label: "B", text: "Honor Daniel's God" }, { label: "C", text: "Destroy idols" }, { label: "D", text: "Worship angels" }], correctAnswer: "B", verse: "Daniel 6:26", explanation: "God was honored." },
  { id: "daniel49", question: "What vision did Daniel have in chapter 7?", options: [{ label: "A", text: "Statue" }, { label: "B", text: "Four beasts" }, { label: "C", text: "Tree" }, { label: "D", text: "River" }], correctAnswer: "B", verse: "Daniel 7:3", explanation: "Four beasts rose from the sea." },
  { id: "daniel50", question: "What did the beasts represent?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Kingdoms" }, { label: "C", text: "Tribes" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Daniel 7:17", explanation: "They symbolized kingdoms." },
  { id: "daniel51", question: "Who is the Ancient of Days?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "God" }, { label: "C", text: "A king" }, { label: "D", text: "A prophet" }], correctAnswer: "B", verse: "Daniel 7:9", explanation: "God sits in judgment." },
  { id: "daniel52", question: "Who comes with the clouds?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "One like a son of man" }, { label: "C", text: "A beast" }, { label: "D", text: "A king" }], correctAnswer: "B", verse: "Daniel 7:13", explanation: "A messianic figure." },
  { id: "daniel53", question: "What is given to the Son of Man?", options: [{ label: "A", text: "A sword" }, { label: "B", text: "Everlasting dominion" }, { label: "C", text: "A crown only" }, { label: "D", text: "A city" }], correctAnswer: "B", verse: "Daniel 7:14", explanation: "An eternal kingdom." },
  { id: "daniel54", question: "What animal represents the Medo-Persian empire?", options: [{ label: "A", text: "Lion" }, { label: "B", text: "Bear" }, { label: "C", text: "Leopard" }, { label: "D", text: "Beast with horns" }], correctAnswer: "B", verse: "Daniel 7:5", explanation: "The bear symbolized Medo-Persia." },
  { id: "daniel55", question: "What animal represents Greece?", options: [{ label: "A", text: "Bear" }, { label: "B", text: "Leopard" }, { label: "C", text: "Lion" }, { label: "D", text: "Ram" }], correctAnswer: "B", verse: "Daniel 7:6", explanation: "The leopard symbolized Greece." },
  { id: "daniel56", question: "What did the final beast have?", options: [{ label: "A", text: "Four wings" }, { label: "B", text: "Ten horns" }, { label: "C", text: "Two heads" }, { label: "D", text: "Iron claws" }], correctAnswer: "B", verse: "Daniel 7:7", explanation: "Ten horns symbolized power." },
  { id: "daniel57", question: "What did Daniel feel after the vision?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Trouble" }, { label: "C", text: "Confidence" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Daniel 7:15", explanation: "The vision troubled him." },
  { id: "daniel58", question: "What animal appears in chapter 8?", options: [{ label: "A", text: "Bear" }, { label: "B", text: "Ram" }, { label: "C", text: "Lion" }, { label: "D", text: "Serpent" }], correctAnswer: "B", verse: "Daniel 8:3", explanation: "A ram appears." },
  { id: "daniel59", question: "What animal defeats the ram?", options: [{ label: "A", text: "Lion" }, { label: "B", text: "Goat" }, { label: "C", text: "Bear" }, { label: "D", text: "Beast" }], correctAnswer: "B", verse: "Daniel 8:5", explanation: "The goat represents Greece." },
  { id: "daniel60", question: "Who explains the vision to Daniel?", options: [{ label: "A", text: "Michael" }, { label: "B", text: "Gabriel" }, { label: "C", text: "An angel" }, { label: "D", text: "A prophet" }], correctAnswer: "B", verse: "Daniel 8:16", explanation: "Gabriel explains the vision." },
  { id: "daniel61", question: "What was Daniel studying that led him to pray?", options: [{ label: "A", text: "Visions" }, { label: "B", text: "Jeremiah's writings" }, { label: "C", text: "The law" }, { label: "D", text: "History" }], correctAnswer: "B", verse: "Daniel 9:2", explanation: "Daniel studied Jeremiah's prophecy." },
  { id: "daniel62", question: "How long was the exile prophesied?", options: [{ label: "A", text: "40 years" }, { label: "B", text: "70 years" }, { label: "C", text: "100 years" }, { label: "D", text: "490 years" }], correctAnswer: "B", verse: "Daniel 9:2", explanation: "Jeremiah foretold 70 years." },
  { id: "daniel63", question: "What did Daniel do in response?", options: [{ label: "A", text: "Fast and pray" }, { label: "B", text: "Celebrate" }, { label: "C", text: "Travel" }, { label: "D", text: "Teach" }], correctAnswer: "A", verse: "Daniel 9:3", explanation: "Daniel sought God in prayer." },
  { id: "daniel64", question: "What does Daniel confess?", options: [{ label: "A", text: "Personal sin only" }, { label: "B", text: "Israel's sin" }, { label: "C", text: "Babylon's sin" }, { label: "D", text: "The king's sin" }], correctAnswer: "B", verse: "Daniel 9", explanation: "He confesses national sin." },
  { id: "daniel65", question: "Who brings Daniel understanding?", options: [{ label: "A", text: "Michael" }, { label: "B", text: "Gabriel" }, { label: "C", text: "An elder" }, { label: "D", text: "A prophet" }], correctAnswer: "B", verse: "Daniel 9:21", explanation: "Gabriel brings insight." },
  { id: "daniel66", question: "What prophecy is given?", options: [{ label: "A", text: "Seventy weeks" }, { label: "B", text: "Four beasts" }, { label: "C", text: "Dry bones" }, { label: "D", text: "End of exile" }], correctAnswer: "A", verse: "Daniel 9:24", explanation: "The seventy weeks prophecy." },
  { id: "daniel67", question: "What vision appears in chapter 10?", options: [{ label: "A", text: "A beast" }, { label: "B", text: "A glorious man" }, { label: "C", text: "A throne" }, { label: "D", text: "A river" }], correctAnswer: "B", verse: "Daniel 10:5", explanation: "A radiant being appears." },
  { id: "daniel68", question: "How does Daniel react?", options: [{ label: "A", text: "Speaks" }, { label: "B", text: "Falls weak" }, { label: "C", text: "Runs" }, { label: "D", text: "Worships" }], correctAnswer: "B", verse: "Daniel 10:8", explanation: "Daniel loses strength." },
  { id: "daniel69", question: "Who helped the messenger?", options: [{ label: "A", text: "Gabriel" }, { label: "B", text: "Michael" }, { label: "C", text: "Daniel" }, { label: "D", text: "An angel" }], correctAnswer: "B", verse: "Daniel 10:13", explanation: "Michael assisted." },
  { id: "daniel70", question: "What conflict delayed the messenger?", options: [{ label: "A", text: "War" }, { label: "B", text: "Prince of Persia" }, { label: "C", text: "Famine" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Daniel 10:13", explanation: "Spiritual opposition." },
  { id: "daniel71", question: "What chapters contain detailed future prophecy?", options: [{ label: "A", text: "1-3" }, { label: "B", text: "7-12" }, { label: "C", text: "4-6" }, { label: "D", text: "9 only" }], correctAnswer: "B", verse: "Daniel 7-12", explanation: "Apocalyptic visions dominate." },
  { id: "daniel72", question: "Who is described as a protector of Israel?", options: [{ label: "A", text: "Gabriel" }, { label: "B", text: "Michael" }, { label: "C", text: "Daniel" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Daniel 12:1", explanation: "Michael protects Israel." },
  { id: "daniel73", question: "What happens to many who sleep in the dust?", options: [{ label: "A", text: "They remain asleep" }, { label: "B", text: "They awaken" }, { label: "C", text: "They vanish" }, { label: "D", text: "They repent" }], correctAnswer: "B", verse: "Daniel 12:2", explanation: "Resurrection is described." },
  { id: "daniel74", question: "What two destinies are mentioned?", options: [{ label: "A", text: "Wealth and poverty" }, { label: "B", text: "Life and shame" }, { label: "C", text: "Peace and war" }, { label: "D", text: "Earth and heaven" }], correctAnswer: "B", verse: "Daniel 12:2", explanation: "Eternal destinies." },
  { id: "daniel75", question: "Who will shine like stars?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The wise" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Daniel 12:3", explanation: "The righteous shine." },
  { id: "daniel76", question: "What is Daniel told to do with the prophecy?", options: [{ label: "A", text: "Publish it" }, { label: "B", text: "Seal it" }, { label: "C", text: "Destroy it" }, { label: "D", text: "Explain it" }], correctAnswer: "B", verse: "Daniel 12:4", explanation: "The words are sealed." },
  { id: "daniel77", question: "What will increase at the end?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Power" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Daniel 12:4", explanation: "Knowledge will increase." },
  { id: "daniel78", question: "What question is asked about the end?", options: [{ label: "A", text: "Who will rule?" }, { label: "B", text: "How long?" }, { label: "C", text: "Where?" }, { label: "D", text: "Why?" }], correctAnswer: "B", verse: "Daniel 12:6", explanation: "The timing is questioned." },
  { id: "daniel79", question: "What answer is given?", options: [{ label: "A", text: "Immediate" }, { label: "B", text: "A time, times, and half a time" }, { label: "C", text: "Seventy years" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Daniel 12:7", explanation: "Symbolic time." },
  { id: "daniel80", question: "What is Daniel told about understanding?", options: [{ label: "A", text: "You will understand fully" }, { label: "B", text: "You will not understand" }, { label: "C", text: "Explain it now" }, { label: "D", text: "Forget it" }], correctAnswer: "B", verse: "Daniel 12:8-9", explanation: "Understanding is limited." },
  { id: "daniel81", question: "What will purify the people?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Trials" }, { label: "C", text: "Wealth" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Daniel 12:10", explanation: "Trials refine." },
  { id: "daniel82", question: "Who will not understand?", options: [{ label: "A", text: "The righteous" }, { label: "B", text: "The wicked" }, { label: "C", text: "The wise" }, { label: "D", text: "The angels" }], correctAnswer: "B", verse: "Daniel 12:10", explanation: "The wicked will not understand." },
  { id: "daniel83", question: "What time period is mentioned?", options: [{ label: "A", text: "1290 days" }, { label: "B", text: "1000 days" }, { label: "C", text: "365 days" }, { label: "D", text: "490 days" }], correctAnswer: "A", verse: "Daniel 12:11", explanation: "A prophetic number." },
  { id: "daniel84", question: "What blessing is given?", options: [{ label: "A", text: "To those who flee" }, { label: "B", text: "To those who wait" }, { label: "C", text: "To kings" }, { label: "D", text: "To warriors" }], correctAnswer: "B", verse: "Daniel 12:12", explanation: "Blessed are those who wait." },
  { id: "daniel85", question: "What is Daniel told to do?", options: [{ label: "A", text: "Keep preaching" }, { label: "B", text: "Go your way" }, { label: "C", text: "Write more" }, { label: "D", text: "Warn Israel" }], correctAnswer: "B", verse: "Daniel 12:13", explanation: "Daniel is told to rest." },
  { id: "daniel86", question: "What is promised to Daniel?", options: [{ label: "A", text: "A crown" }, { label: "B", text: "Rest and inheritance" }, { label: "C", text: "Power" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Daniel 12:13", explanation: "Daniel will rise to receive his inheritance." },
  { id: "daniel87", question: "What theme dominates Daniel?", options: [{ label: "A", text: "Human power" }, { label: "B", text: "God's sovereignty" }, { label: "C", text: "War" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Daniel", explanation: "God rules over all kingdoms." },
  { id: "daniel88", question: "What does Daniel show about exile?", options: [{ label: "A", text: "God abandons His people" }, { label: "B", text: "God remains in control" }, { label: "C", text: "Faith is impossible" }, { label: "D", text: "Hope is gone" }], correctAnswer: "B", verse: "Daniel", explanation: "God is sovereign in exile." },
  { id: "daniel89", question: "What character trait defines Daniel?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Daniel", explanation: "Daniel remained faithful." },
  { id: "daniel90", question: "What does Daniel refuse repeatedly?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Daniel", explanation: "He refuses to compromise." },
  { id: "daniel91", question: "What do dreams and visions reveal?", options: [{ label: "A", text: "Human plans" }, { label: "B", text: "God's plans" }, { label: "C", text: "Kings' fears" }, { label: "D", text: "Prophets' thoughts" }], correctAnswer: "B", verse: "Daniel", explanation: "God reveals His plans." },
  { id: "daniel92", question: "What kingdom ultimately prevails?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "God's kingdom" }, { label: "C", text: "Persia" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "Daniel 2:44", explanation: "God's kingdom is eternal." },
  { id: "daniel93", question: "What does Daniel teach about prayer?", options: [{ label: "A", text: "It is optional" }, { label: "B", text: "It is powerful" }, { label: "C", text: "It should be hidden" }, { label: "D", text: "It is dangerous" }], correctAnswer: "B", verse: "Daniel 6", explanation: "Prayer brings deliverance." },
  { id: "daniel94", question: "What protects Daniel in danger?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "God's power" }, { label: "C", text: "Angels" }, { label: "D", text: "Friends" }], correctAnswer: "B", verse: "Daniel", explanation: "God protects His servant." },
  { id: "daniel95", question: "What does Daniel reveal about faith?", options: [{ label: "A", text: "It avoids suffering" }, { label: "B", text: "It endures suffering" }, { label: "C", text: "It guarantees safety" }, { label: "D", text: "It removes trials" }], correctAnswer: "B", verse: "Daniel", explanation: "Faith remains through trials." },
  { id: "daniel96", question: "What role do angels play?", options: [{ label: "A", text: "Ignore events" }, { label: "B", text: "Deliver messages" }, { label: "C", text: "Rule kingdoms" }, { label: "D", text: "Replace kings" }], correctAnswer: "B", verse: "Daniel", explanation: "Angels deliver God's messages." },
  { id: "daniel97", question: "What is emphasized about history?", options: [{ label: "A", text: "It is random" }, { label: "B", text: "It is under God's control" }, { label: "C", text: "It repeats endlessly" }, { label: "D", text: "It favors kings" }], correctAnswer: "B", verse: "Daniel", explanation: "God directs history." },
  { id: "daniel98", question: "What encourages believers facing oppression?", options: [{ label: "A", text: "Escape" }, { label: "B", text: "God's ultimate victory" }, { label: "C", text: "Revenge" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Daniel", explanation: "God will triumph." },
  { id: "daniel99", question: "What final hope is given?", options: [{ label: "A", text: "Political freedom" }, { label: "B", text: "Resurrection" }, { label: "C", text: "Wealth" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Daniel 12", explanation: "Resurrection is promised." },
  { id: "daniel100", question: "What final truth anchors Daniel?", options: [{ label: "A", text: "Kings rise and fall" }, { label: "B", text: "The Lord reigns forever" }, { label: "C", text: "Israel will rule" }, { label: "D", text: "Prophecy ends" }], correctAnswer: "B", verse: "Daniel", explanation: "God reigns eternally." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DanielTriviaPage() {
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
          .eq("book", "daniel");

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
          book: "daniel",
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
            book: "daniel",
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
    if (score === 10) return "Perfect! You're a Daniel expert!";
    if (score >= 8) return "Excellent! You know Daniel well!";
    if (score >= 6) return "Good job! Keep studying Daniel!";
    if (score >= 4) return "Nice try! Daniel has much to explore!";
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
              href="/bible-trivia/daniel"
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
