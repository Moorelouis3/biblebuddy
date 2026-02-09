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
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
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
  { id: "jeremiah1", question: "Who is the prophet of the book of Jeremiah?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Jeremiah" }, { label: "C", text: "Ezekiel" }, { label: "D", text: "Daniel" }], correctAnswer: "B", verse: "Jeremiah 1:1", explanation: "Jeremiah is the prophet called by God." },
  { id: "jeremiah2", question: "From what town did Jeremiah come?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Anathoth" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Hebron" }], correctAnswer: "B", verse: "Jeremiah 1:1", explanation: "Jeremiah was from Anathoth." },
  { id: "jeremiah3", question: "Before Jeremiah was formed, what did God do?", options: [{ label: "A", text: "Tested him" }, { label: "B", text: "Knew him" }, { label: "C", text: "Rejected him" }, { label: "D", text: "Hid him" }], correctAnswer: "B", verse: "Jeremiah 1:5", explanation: "God knew Jeremiah before birth." },
  { id: "jeremiah4", question: "What did God appoint Jeremiah to be?", options: [{ label: "A", text: "A priest" }, { label: "B", text: "A king" }, { label: "C", text: "A prophet to the nations" }, { label: "D", text: "A judge" }], correctAnswer: "C", verse: "Jeremiah 1:5", explanation: "Jeremiah's mission extended to nations." },
  { id: "jeremiah5", question: "What was Jeremiah's initial response to God's call?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fear and hesitation" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jeremiah 1:6", explanation: "Jeremiah felt inadequate." },
  { id: "jeremiah6", question: "What did God touch to empower Jeremiah?", options: [{ label: "A", text: "His heart" }, { label: "B", text: "His lips" }, { label: "C", text: "His hands" }, { label: "D", text: "His head" }], correctAnswer: "B", verse: "Jeremiah 1:9", explanation: "God put His words in Jeremiah's mouth." },
  { id: "jeremiah7", question: "What two things was Jeremiah appointed to do?", options: [{ label: "A", text: "Teach and heal" }, { label: "B", text: "Build and plant" }, { label: "C", text: "Uproot and tear down" }, { label: "D", text: "Rule and judge" }], correctAnswer: "C", verse: "Jeremiah 1:10", explanation: "Jeremiah's role involved judgment." },
  { id: "jeremiah8", question: "What vision did Jeremiah see first?", options: [{ label: "A", text: "A burning bush" }, { label: "B", text: "An almond branch" }, { label: "C", text: "A boiling pot" }, { label: "D", text: "Dry bones" }], correctAnswer: "B", verse: "Jeremiah 1:11", explanation: "The almond branch symbolized readiness." },
  { id: "jeremiah9", question: "What did the boiling pot symbolize?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Judgment from the north" }, { label: "C", text: "Peace" }, { label: "D", text: "Revival" }], correctAnswer: "B", verse: "Jeremiah 1:13-14", explanation: "Judgment was coming from the north." },
  { id: "jeremiah10", question: "What sin dominates Judah's condition?", options: [{ label: "A", text: "Ignorance" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Silence" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Jeremiah 2", explanation: "Judah abandoned God for idols." },
  { id: "jeremiah11", question: "What metaphor is used for Israel's faithfulness?", options: [{ label: "A", text: "A bride" }, { label: "B", text: "A vine" }, { label: "C", text: "A sheep" }, { label: "D", text: "A wall" }], correctAnswer: "A", verse: "Jeremiah 2:2", explanation: "Israel is described as an unfaithful bride." },
  { id: "jeremiah12", question: "What does God accuse Israel of doing?", options: [{ label: "A", text: "Abandoning wisdom" }, { label: "B", text: "Forsaking the living water" }, { label: "C", text: "Breaking the law" }, { label: "D", text: "Ignoring prophets" }], correctAnswer: "B", verse: "Jeremiah 2:13", explanation: "Israel rejected God for broken cisterns." },
  { id: "jeremiah13", question: "What is compared to a broken cistern?", options: [{ label: "A", text: "Idols" }, { label: "B", text: "Kings" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "A", verse: "Jeremiah 2:13", explanation: "Idols cannot satisfy." },
  { id: "jeremiah14", question: "What does Jeremiah call Judah to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Repent" }, { label: "C", text: "Flee" }, { label: "D", text: "Celebrate" }], correctAnswer: "B", verse: "Jeremiah 3:12", explanation: "God calls for repentance." },
  { id: "jeremiah15", question: "What image is used for stubborn hearts?", options: [{ label: "A", text: "Stone" }, { label: "B", text: "Iron" }, { label: "C", text: "Bronze" }, { label: "D", text: "Clay" }], correctAnswer: "A", verse: "Jeremiah 3:17", explanation: "Hard hearts resist God." },
  { id: "jeremiah16", question: "What sermon does Jeremiah preach at the temple?", options: [{ label: "A", text: "Peace sermon" }, { label: "B", text: "Temple sermon" }, { label: "C", text: "Judgment sermon" }, { label: "D", text: "Covenant sermon" }], correctAnswer: "B", verse: "Jeremiah 7", explanation: "Jeremiah warns against false trust." },
  { id: "jeremiah17", question: "What phrase did the people falsely trust?", options: [{ label: "A", text: "God is love" }, { label: "B", text: "The temple of the Lord" }, { label: "C", text: "Peace, peace" }, { label: "D", text: "We are chosen" }], correctAnswer: "B", verse: "Jeremiah 7:4", explanation: "The people trusted buildings, not God." },
  { id: "jeremiah18", question: "What does God desire instead of sacrifice?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Obedience" }, { label: "C", text: "Praise" }, { label: "D", text: "Offerings" }], correctAnswer: "B", verse: "Jeremiah 7:23", explanation: "God desires obedience." },
  { id: "jeremiah19", question: "What object does Jeremiah break?", options: [{ label: "A", text: "A jar" }, { label: "B", text: "A potter's jar" }, { label: "C", text: "A staff" }, { label: "D", text: "A stone" }], correctAnswer: "B", verse: "Jeremiah 19:10", explanation: "The jar symbolized coming destruction." },
  { id: "jeremiah20", question: "Who persecutes Jeremiah?", options: [{ label: "A", text: "The king" }, { label: "B", text: "The priest Pashhur" }, { label: "C", text: "Babylonians" }, { label: "D", text: "False prophets" }], correctAnswer: "B", verse: "Jeremiah 20:1-2", explanation: "Jeremiah suffers for obedience." },
  { id: "jeremiah21", question: "What emotion does Jeremiah express?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Despair" }, { label: "C", text: "Pride" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "Jeremiah 20:14-18", explanation: "Jeremiah laments his suffering." },
  { id: "jeremiah22", question: "What metaphor is used in Jeremiah 18?", options: [{ label: "A", text: "Shepherd" }, { label: "B", text: "Potter and clay" }, { label: "C", text: "Vine" }, { label: "D", text: "Tree" }], correctAnswer: "B", verse: "Jeremiah 18:6", explanation: "God shapes nations like clay." },
  { id: "jeremiah23", question: "What determines the clay's outcome?", options: [{ label: "A", text: "Chance" }, { label: "B", text: "The potter" }, { label: "C", text: "Time" }, { label: "D", text: "The clay" }], correctAnswer: "B", verse: "Jeremiah 18:6", explanation: "God is sovereign." },
  { id: "jeremiah24", question: "What kind of shepherds does God condemn?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "False" }, { label: "C", text: "Weak" }, { label: "D", text: "Foreign" }], correctAnswer: "B", verse: "Jeremiah 23:1", explanation: "False leaders mislead the people." },
  { id: "jeremiah25", question: "What does God promise to raise up?", options: [{ label: "A", text: "A warrior" }, { label: "B", text: "A righteous Branch" }, { label: "C", text: "A prophet" }, { label: "D", text: "A judge" }], correctAnswer: "B", verse: "Jeremiah 23:5", explanation: "The Messiah is promised." },
  { id: "jeremiah26", question: "What will the righteous Branch do?", options: [{ label: "A", text: "Rule wisely" }, { label: "B", text: "Fight enemies" }, { label: "C", text: "Build temples" }, { label: "D", text: "Judge angels" }], correctAnswer: "A", verse: "Jeremiah 23:5", explanation: "He will reign with justice." },
  { id: "jeremiah27", question: "What is the name given to the Branch?", options: [{ label: "A", text: "Prince of Peace" }, { label: "B", text: "The Lord Our Righteousness" }, { label: "C", text: "Immanuel" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "Jeremiah 23:6", explanation: "The Messiah brings righteousness." },
  { id: "jeremiah28", question: "What does God say about false prophets?", options: [{ label: "A", text: "They are harmless" }, { label: "B", text: "They speak lies" }, { label: "C", text: "They are mistaken" }, { label: "D", text: "They mean well" }], correctAnswer: "B", verse: "Jeremiah 23:16", explanation: "False prophets deceive." },
  { id: "jeremiah29", question: "What is God's word compared to?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Fire and a hammer" }, { label: "C", text: "Wind" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Jeremiah 23:29", explanation: "God's word is powerful." },
  { id: "jeremiah30", question: "What judgment is pronounced on Judah?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Exile to Babylon" }, { label: "C", text: "Civil war" }, { label: "D", text: "Plague" }], correctAnswer: "B", verse: "Jeremiah 25:11", explanation: "Judah will be exiled for 70 years." },
  { id: "jeremiah31", question: "How long will the exile last?", options: [{ label: "A", text: "40 years" }, { label: "B", text: "50 years" }, { label: "C", text: "70 years" }, { label: "D", text: "100 years" }], correctAnswer: "C", verse: "Jeremiah 25:11", explanation: "God sets a fixed period." },
  { id: "jeremiah32", question: "What does Jeremiah write to the exiles?", options: [{ label: "A", text: "Warnings" }, { label: "B", text: "A letter of instruction" }, { label: "C", text: "A prophecy of doom" }, { label: "D", text: "A psalm" }], correctAnswer: "B", verse: "Jeremiah 29:1", explanation: "Jeremiah writes to Babylonian exiles." },
  { id: "jeremiah33", question: "What does God tell the exiles to do?", options: [{ label: "A", text: "Rebel" }, { label: "B", text: "Settle and seek peace" }, { label: "C", text: "Escape" }, { label: "D", text: "Fast continually" }], correctAnswer: "B", verse: "Jeremiah 29:7", explanation: "God calls for patience." },
  { id: "jeremiah34", question: "What promise is found in Jeremiah 29:11?", options: [{ label: "A", text: "Immediate rescue" }, { label: "B", text: "Hope and a future" }, { label: "C", text: "Military victory" }, { label: "D", text: "New king" }], correctAnswer: "B", verse: "Jeremiah 29:11", explanation: "God promises hope." },
  { id: "jeremiah35", question: "What kind of covenant is promised?", options: [{ label: "A", text: "Old covenant" }, { label: "B", text: "New covenant" }, { label: "C", text: "Temporary covenant" }, { label: "D", text: "Conditional covenant" }], correctAnswer: "B", verse: "Jeremiah 31:31", explanation: "God promises a new covenant." },
  { id: "jeremiah36", question: "Where will God write His law?", options: [{ label: "A", text: "Stone tablets" }, { label: "B", text: "The heart" }, { label: "C", text: "Scrolls" }, { label: "D", text: "Temple walls" }], correctAnswer: "B", verse: "Jeremiah 31:33", explanation: "The law will be internal." },
  { id: "jeremiah37", question: "What will people no longer need?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Teaching to know the Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Jeremiah 31:34", explanation: "All will know the Lord." },
  { id: "jeremiah38", question: "What will God forgive?", options: [{ label: "A", text: "Mistakes" }, { label: "B", text: "Iniquity" }, { label: "C", text: "Weakness" }, { label: "D", text: "Ignorance" }], correctAnswer: "B", verse: "Jeremiah 31:34", explanation: "God forgives sin." },
  { id: "jeremiah39", question: "What symbolic purchase does Jeremiah make?", options: [{ label: "A", text: "A house" }, { label: "B", text: "A field" }, { label: "C", text: "A vineyard" }, { label: "D", text: "A well" }], correctAnswer: "B", verse: "Jeremiah 32:9", explanation: "The purchase symbolized future restoration." },
  { id: "jeremiah40", question: "Why does Jeremiah buy the field?", options: [{ label: "A", text: "Investment" }, { label: "B", text: "Hope in restoration" }, { label: "C", text: "Obedience to law" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Jeremiah 32:15", explanation: "Land will be possessed again." },
  { id: "jeremiah41", question: "What does God affirm about Himself?", options: [{ label: "A", text: "He is limited" }, { label: "B", text: "Nothing is too hard for Him" }, { label: "C", text: "He changes" }, { label: "D", text: "He forgets" }], correctAnswer: "B", verse: "Jeremiah 32:27", explanation: "God is omnipotent." },
  { id: "jeremiah42", question: "What city will be restored?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Jeremiah 33:6-7", explanation: "God promises restoration." },
  { id: "jeremiah43", question: "What returns to David's line?", options: [{ label: "A", text: "A throne" }, { label: "B", text: "A shepherd" }, { label: "C", text: "A priest" }, { label: "D", text: "A prophet" }], correctAnswer: "A", verse: "Jeremiah 33:17", explanation: "God keeps His covenant." },
  { id: "jeremiah44", question: "Who burns Jeremiah's scroll?", options: [{ label: "A", text: "Zedekiah" }, { label: "B", text: "Jehoiakim" }, { label: "C", text: "Nebuchadnezzar" }, { label: "D", text: "Jeconiah" }], correctAnswer: "B", verse: "Jeremiah 36:23", explanation: "The king rejects God's word." },
  { id: "jeremiah45", question: "What does Jeremiah do after the scroll is burned?", options: [{ label: "A", text: "Stop preaching" }, { label: "B", text: "Rewrite it" }, { label: "C", text: "Hide" }, { label: "D", text: "Leave Judah" }], correctAnswer: "B", verse: "Jeremiah 36:28", explanation: "God's word cannot be destroyed." },
  { id: "jeremiah46", question: "Where is Jeremiah imprisoned?", options: [{ label: "A", text: "The palace" }, { label: "B", text: "A cistern" }, { label: "C", text: "Babylon" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Jeremiah 38:6", explanation: "Jeremiah suffers for truth." },
  { id: "jeremiah47", question: "Who rescues Jeremiah from the cistern?", options: [{ label: "A", text: "The king" }, { label: "B", text: "Ebed-Melek" }, { label: "C", text: "Baruch" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Jeremiah 38:7-13", explanation: "God uses a foreigner to save Jeremiah." },
  { id: "jeremiah48", question: "Which king rules during Jerusalem's fall?", options: [{ label: "A", text: "Jehoiakim" }, { label: "B", text: "Zedekiah" }, { label: "C", text: "Josiah" }, { label: "D", text: "Manasseh" }], correctAnswer: "B", verse: "Jeremiah 39", explanation: "Zedekiah witnesses the fall." },
  { id: "jeremiah49", question: "What happens to Jerusalem?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Destruction" }, { label: "C", text: "Expansion" }, { label: "D", text: "Revival" }], correctAnswer: "B", verse: "Jeremiah 39", explanation: "Judgment is fulfilled." },
  { id: "jeremiah50", question: "What happens to Zedekiah?", options: [{ label: "A", text: "Killed" }, { label: "B", text: "Blinded and exiled" }, { label: "C", text: "Escapes" }, { label: "D", text: "Converted" }], correctAnswer: "B", verse: "Jeremiah 39:7", explanation: "Zedekiah is punished." },
  { id: "jeremiah51", question: "Where does Jeremiah remain after Jerusalem falls?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Judah" }, { label: "C", text: "Egypt" }, { label: "D", text: "Assyria" }], correctAnswer: "B", verse: "Jeremiah 40", explanation: "Jeremiah stays with the remnant." },
  { id: "jeremiah52", question: "Who is appointed governor over Judah?", options: [{ label: "A", text: "Gedaliah" }, { label: "B", text: "Baruch" }, { label: "C", text: "Jeremiah" }, { label: "D", text: "Zedekiah" }], correctAnswer: "A", verse: "Jeremiah 40:5", explanation: "Gedaliah governs under Babylon." },
  { id: "jeremiah53", question: "What happens to Gedaliah?", options: [{ label: "A", text: "Promoted" }, { label: "B", text: "Assassinated" }, { label: "C", text: "Exiled" }, { label: "D", text: "Converted" }], correctAnswer: "B", verse: "Jeremiah 41:2", explanation: "Instability continues." },
  { id: "jeremiah54", question: "Where do the people flee?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Egypt" }, { label: "C", text: "Assyria" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Jeremiah 42-43", explanation: "They disobey God's warning." },
  { id: "jeremiah55", question: "What does Jeremiah warn about Egypt?", options: [{ label: "A", text: "Safety" }, { label: "B", text: "Judgment" }, { label: "C", text: "Peace" }, { label: "D", text: "Protection" }], correctAnswer: "B", verse: "Jeremiah 43:11", explanation: "Egypt will fall too." },
  { id: "jeremiah56", question: "What is Jeremiah forced to do?", options: [{ label: "A", text: "Stop prophesying" }, { label: "B", text: "Go to Egypt" }, { label: "C", text: "Hide" }, { label: "D", text: "Serve Babylon" }], correctAnswer: "B", verse: "Jeremiah 43:6-7", explanation: "Jeremiah is taken to Egypt." },
  { id: "jeremiah57", question: "What does Jeremiah prophesy against?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Moab" }, { label: "C", text: "Ammon" }, { label: "D", text: "All nations" }], correctAnswer: "D", verse: "Jeremiah 46-51", explanation: "God judges the nations." },
  { id: "jeremiah58", question: "What nation receives extensive judgment?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Assyria" }, { label: "C", text: "Babylon" }, { label: "D", text: "Moab" }], correctAnswer: "C", verse: "Jeremiah 50-51", explanation: "Babylon will fall." },
  { id: "jeremiah59", question: "What does Jeremiah do with the scroll about Babylon?", options: [{ label: "A", text: "Burns it" }, { label: "B", text: "Throws it into the Euphrates" }, { label: "C", text: "Hides it" }, { label: "D", text: "Reads it publicly" }], correctAnswer: "B", verse: "Jeremiah 51:63", explanation: "Babylon's fall is sealed." },
  { id: "jeremiah60", question: "What does the sinking scroll symbolize?", options: [{ label: "A", text: "Jerusalem's fall" }, { label: "B", text: "Babylon's fall" }, { label: "C", text: "Exile" }, { label: "D", text: "Restoration" }], correctAnswer: "B", verse: "Jeremiah 51:64", explanation: "Babylon will sink." },
  { id: "jeremiah61", question: "What final event is recorded in Jeremiah 52?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Jerusalem's destruction" }, { label: "C", text: "Return from exile" }, { label: "D", text: "New covenant" }], correctAnswer: "B", verse: "Jeremiah 52", explanation: "The book closes with judgment fulfilled." },
  { id: "jeremiah62", question: "Who is released from prison in Babylon?", options: [{ label: "A", text: "Zedekiah" }, { label: "B", text: "Jehoiachin" }, { label: "C", text: "Jeremiah" }, { label: "D", text: "Gedaliah" }], correctAnswer: "B", verse: "Jeremiah 52:31", explanation: "Jehoiachin is shown favor." },
  { id: "jeremiah63", question: "What does Jehoiachin's release symbolize?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Hope" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Jeremiah 52:31-34", explanation: "Hope remains." },
  { id: "jeremiah64", question: "What is Jeremiah often called?", options: [{ label: "A", text: "The joyful prophet" }, { label: "B", text: "The weeping prophet" }, { label: "C", text: "The silent prophet" }, { label: "D", text: "The warrior prophet" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Jeremiah mourns Judah's fate." },
  { id: "jeremiah65", question: "What dominates Jeremiah's ministry?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Suffering" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Faithfulness brings suffering." },
  { id: "jeremiah66", question: "What theme balances judgment?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Hope" }, { label: "C", text: "Law" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Jeremiah 29-33", explanation: "Hope follows judgment." },
  { id: "jeremiah67", question: "What reveals God's patience?", options: [{ label: "A", text: "Immediate exile" }, { label: "B", text: "Repeated warnings" }, { label: "C", text: "Silence" }, { label: "D", text: "Destruction" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God warns repeatedly." },
  { id: "jeremiah68", question: "What does Jeremiah show about obedience?", options: [{ label: "A", text: "It brings ease" }, { label: "B", text: "It brings suffering" }, { label: "C", text: "It brings wealth" }, { label: "D", text: "It brings power" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Obedience can be costly." },
  { id: "jeremiah69", question: "What cannot be destroyed?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "God's word" }, { label: "C", text: "Nations" }, { label: "D", text: "Temples" }], correctAnswer: "B", verse: "Jeremiah 36", explanation: "God's word endures." },
  { id: "jeremiah70", question: "What does Jeremiah emphasize about God?", options: [{ label: "A", text: "Harshness" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Distance" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God remains faithful." },
  { id: "jeremiah71", question: "What role do false prophets play?", options: [{ label: "A", text: "Encouraging repentance" }, { label: "B", text: "Spreading lies" }, { label: "C", text: "Teaching truth" }, { label: "D", text: "Remaining silent" }], correctAnswer: "B", verse: "Jeremiah 23", explanation: "False prophets deceive." },
  { id: "jeremiah72", question: "What does Jeremiah warn against trusting?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Human strength" }, { label: "C", text: "God" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Jeremiah 17:5", explanation: "Trusting humans brings curse." },
  { id: "jeremiah73", question: "What brings blessing?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Trusting the Lord" }, { label: "C", text: "Power" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Jeremiah 17:7", explanation: "Trusting God brings blessing." },
  { id: "jeremiah74", question: "What is the heart described as?", options: [{ label: "A", text: "Pure" }, { label: "B", text: "Deceitful" }, { label: "C", text: "Strong" }, { label: "D", text: "Wise" }], correctAnswer: "B", verse: "Jeremiah 17:9", explanation: "The human heart is deceitful." },
  { id: "jeremiah75", question: "Who searches the heart?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "The Lord" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Jeremiah 17:10", explanation: "God judges justly." },
  { id: "jeremiah76", question: "What does Jeremiah emphasize about repentance?", options: [{ label: "A", text: "It is optional" }, { label: "B", text: "It is urgent" }, { label: "C", text: "It is symbolic" }, { label: "D", text: "It is delayed" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Repentance must not be delayed." },
  { id: "jeremiah77", question: "What image shows Israel's stubbornness?", options: [{ label: "A", text: "Iron sinew" }, { label: "B", text: "Stiff neck" }, { label: "C", text: "Hard clay" }, { label: "D", text: "Dry bones" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Israel is stubborn." },
  { id: "jeremiah78", question: "What promise sustains hope?", options: [{ label: "A", text: "Return from exile" }, { label: "B", text: "New covenant" }, { label: "C", text: "New king" }, { label: "D", text: "New law" }], correctAnswer: "B", verse: "Jeremiah 31", explanation: "The new covenant brings hope." },
  { id: "jeremiah79", question: "What is written on hearts?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "God's law" }, { label: "C", text: "Promises" }, { label: "D", text: "Names" }], correctAnswer: "B", verse: "Jeremiah 31:33", explanation: "God's law becomes internal." },
  { id: "jeremiah80", question: "What does Jeremiah teach about God's mercy?", options: [{ label: "A", text: "It is limited" }, { label: "B", text: "It endures" }, { label: "C", text: "It fades" }, { label: "D", text: "It is selective" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's mercy endures." },
  { id: "jeremiah81", question: "What remains after judgment?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Hope" }, { label: "C", text: "Fear" }, { label: "D", text: "Despair" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Hope remains." },
  { id: "jeremiah82", question: "What does Jeremiah reveal about leadership?", options: [{ label: "A", text: "It is safe" }, { label: "B", text: "It is accountable" }, { label: "C", text: "It is powerful" }, { label: "D", text: "It is protected" }], correctAnswer: "B", verse: "Jeremiah 23", explanation: "Leaders are accountable." },
  { id: "jeremiah83", question: "What is God faithful to?", options: [{ label: "A", text: "Human plans" }, { label: "B", text: "His covenant" }, { label: "C", text: "Kings" }, { label: "D", text: "Temples" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God keeps His covenant." },
  { id: "jeremiah84", question: "What shows God's sovereignty?", options: [{ label: "A", text: "Nations rising and falling" }, { label: "B", text: "Temple rituals" }, { label: "C", text: "Kings' decisions" }, { label: "D", text: "Priests" }], correctAnswer: "A", verse: "Jeremiah", explanation: "God rules over nations." },
  { id: "jeremiah85", question: "What message dominates Jeremiah?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Judgment with hope" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Judgment is paired with hope." },
  { id: "jeremiah86", question: "What does Jeremiah show about calling?", options: [{ label: "A", text: "It brings honor" }, { label: "B", text: "It requires endurance" }, { label: "C", text: "It is easy" }, { label: "D", text: "It brings wealth" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Calling requires endurance." },
  { id: "jeremiah87", question: "What remains central to God's plan?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Redemption" }, { label: "C", text: "Law" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's plan is redemptive." },
  { id: "jeremiah88", question: "What does Jeremiah teach about obedience?", options: [{ label: "A", text: "It guarantees comfort" }, { label: "B", text: "It may bring suffering" }, { label: "C", text: "It brings power" }, { label: "D", text: "It avoids pain" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Obedience can be costly." },
  { id: "jeremiah89", question: "What ultimately triumphs?", options: [{ label: "A", text: "Empires" }, { label: "B", text: "God's purposes" }, { label: "C", text: "Kings" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's purposes prevail." },
  { id: "jeremiah90", question: "What hope does Jeremiah point to?", options: [{ label: "A", text: "Immediate peace" }, { label: "B", text: "Future restoration" }, { label: "C", text: "Political change" }, { label: "D", text: "Military strength" }], correctAnswer: "B", verse: "Jeremiah 30-33", explanation: "Hope lies in restoration." },
  { id: "jeremiah91", question: "What does Jeremiah reveal about God's love?", options: [{ label: "A", text: "It fades" }, { label: "B", text: "It is steadfast" }, { label: "C", text: "It is conditional" }, { label: "D", text: "It is hidden" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's love endures." },
  { id: "jeremiah92", question: "What image best describes Jeremiah's ministry?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Tears" }, { label: "C", text: "Silence" }, { label: "D", text: "Celebration" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Jeremiah weeps for his people." },
  { id: "jeremiah93", question: "What remains after exile?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Hope" }, { label: "C", text: "Silence" }, { label: "D", text: "Idolatry" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Hope survives exile." },
  { id: "jeremiah94", question: "What does Jeremiah affirm about God's plans?", options: [{ label: "A", text: "They fail" }, { label: "B", text: "They succeed" }, { label: "C", text: "They change" }, { label: "D", text: "They weaken" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's plans succeed." },
  { id: "jeremiah95", question: "What is God's ultimate goal?", options: [{ label: "A", text: "Judgment only" }, { label: "B", text: "Restoration" }, { label: "C", text: "Power" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God restores His people." },
  { id: "jeremiah96", question: "What endures beyond exile?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "God's covenant" }, { label: "C", text: "Cities" }, { label: "D", text: "Empires" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God's covenant endures." },
  { id: "jeremiah97", question: "What does Jeremiah reveal about faithfulness?", options: [{ label: "A", text: "It is rewarded immediately" }, { label: "B", text: "It may be costly" }, { label: "C", text: "It is easy" }, { label: "D", text: "It is optional" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Faithfulness can be costly." },
  { id: "jeremiah98", question: "What remains central to Jeremiah's message?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God's faithfulness" }, { label: "C", text: "Kingship" }, { label: "D", text: "Temples" }], correctAnswer: "B", verse: "Jeremiah", explanation: "God is faithful." },
  { id: "jeremiah99", question: "What does Jeremiah point forward to?", options: [{ label: "A", text: "A new king" }, { label: "B", text: "A renewed relationship with God" }, { label: "C", text: "A rebuilt temple" }, { label: "D", text: "A new city" }], correctAnswer: "B", verse: "Jeremiah 31", explanation: "The new covenant restores relationship." },
  { id: "jeremiah100", question: "What final note closes Jeremiah?", options: [{ label: "A", text: "Despair" }, { label: "B", text: "Hope beyond judgment" }, { label: "C", text: "Silence" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Jeremiah", explanation: "Hope remains after judgment." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JeremiahTriviaPage() {
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
          .eq("book", "jeremiah");

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
          book: "jeremiah",
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
            book: "jeremiah",
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
    if (score === 10) return "Perfect! You're a Jeremiah expert!";
    if (score >= 8) return "Excellent! You know Jeremiah well!";
    if (score >= 6) return "Good job! Keep studying Jeremiah!";
    if (score >= 4) return "Nice try! Jeremiah has much to explore!";
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
              href="/bible-trivia/jeremiah"
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

