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
  { id: "ezekiel1", question: "Where was Ezekiel when he received his first vision?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Babylon" }, { label: "C", text: "By the Kebar River" }, { label: "D", text: "Egypt" }], correctAnswer: "C", verse: "Ezekiel 1:1", explanation: "Ezekiel received his vision by the Kebar River." },
  { id: "ezekiel2", question: "Who was Ezekiel's father?", options: [{ label: "A", text: "Jeremiah" }, { label: "B", text: "Buzi" }, { label: "C", text: "Hilkiah" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "Ezekiel 1:3", explanation: "Buzi was Ezekiel's father." },
  { id: "ezekiel3", question: "What profession did Ezekiel have?", options: [{ label: "A", text: "King" }, { label: "B", text: "Prophet only" }, { label: "C", text: "Priest" }, { label: "D", text: "Scribe" }], correctAnswer: "C", verse: "Ezekiel 1:3", explanation: "Ezekiel was a priest." },
  { id: "ezekiel4", question: "What did Ezekiel see coming from the north?", options: [{ label: "A", text: "A firestorm" }, { label: "B", text: "A great cloud with fire" }, { label: "C", text: "An army" }, { label: "D", text: "An earthquake" }], correctAnswer: "B", verse: "Ezekiel 1:4", explanation: "A stormy wind with fire appeared." },
  { id: "ezekiel5", question: "How many living creatures did Ezekiel see?", options: [{ label: "A", text: "Two" }, { label: "B", text: "Three" }, { label: "C", text: "Four" }, { label: "D", text: "Seven" }], correctAnswer: "C", verse: "Ezekiel 1:5", explanation: "Four living creatures appeared." },
  { id: "ezekiel6", question: "How many faces did each living creature have?", options: [{ label: "A", text: "One" }, { label: "B", text: "Two" }, { label: "C", text: "Three" }, { label: "D", text: "Four" }], correctAnswer: "D", verse: "Ezekiel 1:6", explanation: "Each had four faces." },
  { id: "ezekiel7", question: "What were the faces?", options: [{ label: "A", text: "Man, lion, ox, eagle" }, { label: "B", text: "Man, horse, eagle, ox" }, { label: "C", text: "Lion, bear, eagle, ox" }, { label: "D", text: "Man, lion, wolf, eagle" }], correctAnswer: "A", verse: "Ezekiel 1:10", explanation: "The four faces symbolized creation." },
  { id: "ezekiel8", question: "What moved the living creatures?", options: [{ label: "A", text: "Wheels within wheels" }, { label: "B", text: "Wings only" }, { label: "C", text: "Fire" }, { label: "D", text: "Wind" }], correctAnswer: "A", verse: "Ezekiel 1:16", explanation: "The wheels moved with the creatures." },
  { id: "ezekiel9", question: "What was above the creatures?", options: [{ label: "A", text: "A rainbow" }, { label: "B", text: "An expanse" }, { label: "C", text: "Mountains" }, { label: "D", text: "Clouds" }], correctAnswer: "B", verse: "Ezekiel 1:22", explanation: "An expanse was above them." },
  { id: "ezekiel10", question: "What was above the expanse?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "A throne" }, { label: "C", text: "Angels" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Ezekiel 1:26", explanation: "A throne appeared above the expanse." },
  { id: "ezekiel11", question: "Who was seated on the throne?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "A man-like figure" }, { label: "C", text: "A king" }, { label: "D", text: "A prophet" }], correctAnswer: "B", verse: "Ezekiel 1:26", explanation: "The appearance resembled a man." },
  { id: "ezekiel12", question: "What surrounded the throne?", options: [{ label: "A", text: "Fire and light" }, { label: "B", text: "Darkness" }, { label: "C", text: "Clouds" }, { label: "D", text: "Smoke" }], correctAnswer: "A", verse: "Ezekiel 1:27", explanation: "Fire and brightness surrounded it." },
  { id: "ezekiel13", question: "What did Ezekiel do after seeing the vision?", options: [{ label: "A", text: "Ran away" }, { label: "B", text: "Spoke" }, { label: "C", text: "Fell facedown" }, { label: "D", text: "Cried" }], correctAnswer: "C", verse: "Ezekiel 1:28", explanation: "He fell facedown in awe." },
  { id: "ezekiel14", question: "What title does God use for Ezekiel?", options: [{ label: "A", text: "My servant" }, { label: "B", text: "Son of man" }, { label: "C", text: "Prophet" }, { label: "D", text: "Watchman" }], correctAnswer: "B", verse: "Ezekiel 2:1", explanation: "Son of man emphasizes humanity." },
  { id: "ezekiel15", question: "What was Ezekiel sent to?", options: [{ label: "A", text: "Foreign nations" }, { label: "B", text: "The exiles of Israel" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Ezekiel 2:3", explanation: "He was sent to rebellious Israel." },
  { id: "ezekiel16", question: "How does God describe Israel?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Stubborn and rebellious" }, { label: "C", text: "Righteous" }, { label: "D", text: "Humble" }], correctAnswer: "B", verse: "Ezekiel 2:3-4", explanation: "Israel is called rebellious." },
  { id: "ezekiel17", question: "What was Ezekiel warned not to fear?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "People and their words" }, { label: "C", text: "Death" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Ezekiel 2:6", explanation: "God told him not to fear people." },
  { id: "ezekiel18", question: "What was Ezekiel given to eat?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Scroll" }, { label: "C", text: "Fruit" }, { label: "D", text: "Meat" }], correctAnswer: "B", verse: "Ezekiel 2:9", explanation: "He ate a scroll." },
  { id: "ezekiel19", question: "What was written on the scroll?", options: [{ label: "A", text: "Blessings" }, { label: "B", text: "Lament and woe" }, { label: "C", text: "Promises" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Ezekiel 2:10", explanation: "The scroll contained judgment." },
  { id: "ezekiel20", question: "How did the scroll taste?", options: [{ label: "A", text: "Bitter" }, { label: "B", text: "Sweet like honey" }, { label: "C", text: "Sour" }, { label: "D", text: "Plain" }], correctAnswer: "B", verse: "Ezekiel 3:3", explanation: "God's word was sweet to him." },
  { id: "ezekiel21", question: "How long did Ezekiel sit among the exiles stunned?", options: [{ label: "A", text: "Three days" }, { label: "B", text: "Seven days" }, { label: "C", text: "Ten days" }, { label: "D", text: "Forty days" }], correctAnswer: "B", verse: "Ezekiel 3:15", explanation: "He sat stunned for seven days." },
  { id: "ezekiel22", question: "What role did God assign Ezekiel?", options: [{ label: "A", text: "King" }, { label: "B", text: "Watchman" }, { label: "C", text: "Judge" }, { label: "D", text: "Priest only" }], correctAnswer: "B", verse: "Ezekiel 3:17", explanation: "He was appointed a watchman." },
  { id: "ezekiel23", question: "What was Ezekiel responsible to do as a watchman?", options: [{ label: "A", text: "Punish sinners" }, { label: "B", text: "Warn the people" }, { label: "C", text: "Rule the people" }, { label: "D", text: "Judge disputes" }], correctAnswer: "B", verse: "Ezekiel 3:18", explanation: "He must warn the wicked." },
  { id: "ezekiel24", question: "What happened if Ezekiel failed to warn?", options: [{ label: "A", text: "He was forgiven" }, { label: "B", text: "He was blamed" }, { label: "C", text: "He was exiled" }, { label: "D", text: "Nothing" }], correctAnswer: "B", verse: "Ezekiel 3:18", explanation: "He was accountable." },
  { id: "ezekiel25", question: "What sign act did Ezekiel perform with a brick?", options: [{ label: "A", text: "Built a house" }, { label: "B", text: "Drew Jerusalem under siege" }, { label: "C", text: "Wrote laws" }, { label: "D", text: "Broke it" }], correctAnswer: "B", verse: "Ezekiel 4:1-2", explanation: "The brick symbolized Jerusalem." },
  { id: "ezekiel26", question: "How long did Ezekiel lie on his left side?", options: [{ label: "A", text: "40 days" }, { label: "B", text: "390 days" }, { label: "C", text: "70 days" }, { label: "D", text: "100 days" }], correctAnswer: "B", verse: "Ezekiel 4:5", explanation: "He bore Israel's sin symbolically." },
  { id: "ezekiel27", question: "How long did Ezekiel lie on his right side?", options: [{ label: "A", text: "40 days" }, { label: "B", text: "70 days" }, { label: "C", text: "100 days" }, { label: "D", text: "390 days" }], correctAnswer: "A", verse: "Ezekiel 4:6", explanation: "This represented Judah's sin." },
  { id: "ezekiel28", question: "What kind of bread did Ezekiel eat?", options: [{ label: "A", text: "Fine flour" }, { label: "B", text: "Mixed grain bread" }, { label: "C", text: "Barley only" }, { label: "D", text: "Unleavened bread" }], correctAnswer: "B", verse: "Ezekiel 4:9", explanation: "It symbolized scarcity." },
  { id: "ezekiel29", question: "How was the bread cooked initially?", options: [{ label: "A", text: "On wood fire" }, { label: "B", text: "On dung" }, { label: "C", text: "In oven" }, { label: "D", text: "Raw" }], correctAnswer: "B", verse: "Ezekiel 4:12", explanation: "It symbolized defilement." },
  { id: "ezekiel30", question: "What did God allow instead of human dung?", options: [{ label: "A", text: "No fire" }, { label: "B", text: "Cow dung" }, { label: "C", text: "Stone" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Ezekiel 4:15", explanation: "God showed mercy." },
  { id: "ezekiel31", question: "What did Ezekiel do with his hair?", options: [{ label: "A", text: "Shaved it" }, { label: "B", text: "Burned part, scattered part" }, { label: "C", text: "Buried it" }, { label: "D", text: "Gave it away" }], correctAnswer: "B", verse: "Ezekiel 5:1-2", explanation: "It symbolized judgment." },
  { id: "ezekiel32", question: "What did burning the hair represent?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Plague" }, { label: "C", text: "Judgment by fire" }, { label: "D", text: "Exile" }], correctAnswer: "C", verse: "Ezekiel 5:2", explanation: "Fire symbolized destruction." },
  { id: "ezekiel33", question: "What did scattering hair represent?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Exile" }, { label: "C", text: "Victory" }, { label: "D", text: "Restoration" }], correctAnswer: "B", verse: "Ezekiel 5:2", explanation: "Scattering symbolized exile." },
  { id: "ezekiel34", question: "What sin is emphasized early?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Bloodshed" }, { label: "C", text: "Pride" }, { label: "D", text: "Neglect of the poor" }], correctAnswer: "A", verse: "Ezekiel 6", explanation: "Idolatry is condemned." },
  { id: "ezekiel35", question: "Where were idols placed?", options: [{ label: "A", text: "Houses" }, { label: "B", text: "High places" }, { label: "C", text: "Fields" }, { label: "D", text: "Palaces" }], correctAnswer: "B", verse: "Ezekiel 6:3", explanation: "High places were centers of idolatry." },
  { id: "ezekiel36", question: "What would happen to the land?", options: [{ label: "A", text: "Prosper" }, { label: "B", text: "Become desolate" }, { label: "C", text: "Expand" }, { label: "D", text: "Be protected" }], correctAnswer: "B", verse: "Ezekiel 6:14", explanation: "The land would be laid waste." },
  { id: "ezekiel37", question: "What phrase announces judgment?", options: [{ label: "A", text: "Thus says the Lord" }, { label: "B", text: "Hear this" }, { label: "C", text: "Pay attention" }, { label: "D", text: "Listen closely" }], correctAnswer: "A", verse: "Ezekiel 7", explanation: "God speaks authoritatively." },
  { id: "ezekiel38", question: "What is declared to be near?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "The end" }, { label: "C", text: "Restoration" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Ezekiel 7:2", explanation: "The end is announced." },
  { id: "ezekiel39", question: "What would silver and gold not do?", options: [{ label: "A", text: "Buy food" }, { label: "B", text: "Save lives" }, { label: "C", text: "Protect from judgment" }, { label: "D", text: "Build cities" }], correctAnswer: "C", verse: "Ezekiel 7:19", explanation: "Wealth cannot save." },
  { id: "ezekiel40", question: "Where is Ezekiel taken in a vision?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "The temple" }, { label: "D", text: "A mountain" }], correctAnswer: "B", verse: "Ezekiel 8:3", explanation: "He is shown Jerusalem's sins." },
  { id: "ezekiel41", question: "What sin is shown in the temple?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Teaching" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Ezekiel 8", explanation: "Idolatry defiled the temple." },
  { id: "ezekiel42", question: "Who wept over sin?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The righteous" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Ezekiel 9:4", explanation: "The faithful grieved sin." },
  { id: "ezekiel43", question: "What marked the foreheads of the righteous?", options: [{ label: "A", text: "Ash" }, { label: "B", text: "A mark" }, { label: "C", text: "Oil" }, { label: "D", text: "Blood" }], correctAnswer: "B", verse: "Ezekiel 9:4", explanation: "They were spared judgment." },
  { id: "ezekiel44", question: "What left the temple?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "The glory of the Lord" }, { label: "C", text: "Sacrifices" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Ezekiel 10:18", explanation: "God's glory departed." },
  { id: "ezekiel45", question: "Where did the glory stop?", options: [{ label: "A", text: "The altar" }, { label: "B", text: "The east gate" }, { label: "C", text: "The city wall" }, { label: "D", text: "The palace" }], correctAnswer: "B", verse: "Ezekiel 10:19", explanation: "The glory paused at the east gate." },
  { id: "ezekiel46", question: "What symbolized judgment coming?", options: [{ label: "A", text: "A sword" }, { label: "B", text: "A scroll" }, { label: "C", text: "A trumpet" }, { label: "D", text: "Fire" }], correctAnswer: "A", verse: "Ezekiel 21", explanation: "The sword symbolized judgment." },
  { id: "ezekiel47", question: "Who was warned directly?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Jerusalem's leaders" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "Ezekiel 11", explanation: "Leaders were warned." },
  { id: "ezekiel48", question: "What promise was given?", options: [{ label: "A", text: "A new heart" }, { label: "B", text: "New land" }, { label: "C", text: "New king" }, { label: "D", text: "New law" }], correctAnswer: "A", verse: "Ezekiel 11:19", explanation: "God promised a new heart." },
  { id: "ezekiel49", question: "What would God remove?", options: [{ label: "A", text: "Heart of flesh" }, { label: "B", text: "Heart of stone" }, { label: "C", text: "Law" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "Ezekiel 11:19", explanation: "The heart of stone would be removed." },
  { id: "ezekiel50", question: "What would replace it?", options: [{ label: "A", text: "Heart of gold" }, { label: "B", text: "Heart of flesh" }, { label: "C", text: "New mind" }, { label: "D", text: "New law" }], correctAnswer: "B", verse: "Ezekiel 11:19", explanation: "A heart of flesh." },
  { id: "ezekiel51", question: "What sign act involved packing belongings?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "War" }, { label: "C", text: "Famine" }, { label: "D", text: "Restoration" }], correctAnswer: "A", verse: "Ezekiel 12", explanation: "It symbolized exile." },
  { id: "ezekiel52", question: "When did Ezekiel dig through a wall?", options: [{ label: "A", text: "Daytime" }, { label: "B", text: "Night" }, { label: "C", text: "Morning" }, { label: "D", text: "Noon" }], correctAnswer: "B", verse: "Ezekiel 12:7", explanation: "He did it at night." },
  { id: "ezekiel53", question: "What did false prophets claim?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Judgment" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "A", verse: "Ezekiel 13", explanation: "They claimed peace falsely." },
  { id: "ezekiel54", question: "What metaphor describes false prophecy?", options: [{ label: "A", text: "Broken sword" }, { label: "B", text: "Whitewashed wall" }, { label: "C", text: "Dry land" }, { label: "D", text: "False fire" }], correctAnswer: "B", verse: "Ezekiel 13:10", explanation: "Whitewashing symbolized deception." },
  { id: "ezekiel55", question: "Who was condemned alongside prophets?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "False prophetesses" }, { label: "C", text: "Soldiers" }, { label: "D", text: "Merchants" }], correctAnswer: "B", verse: "Ezekiel 13:17", explanation: "False prophetesses were condemned." },
  { id: "ezekiel56", question: "What responsibility is emphasized?", options: [{ label: "A", text: "Group guilt" }, { label: "B", text: "Personal responsibility" }, { label: "C", text: "National identity" }, { label: "D", text: "Priestly duty" }], correctAnswer: "B", verse: "Ezekiel 18", explanation: "Each person is responsible." },
  { id: "ezekiel57", question: "What proverb is corrected?", options: [{ label: "A", text: "Fathers eat grapes" }, { label: "B", text: "The soul who sins shall die" }, { label: "C", text: "Eyes for eyes" }, { label: "D", text: "Peace and safety" }], correctAnswer: "A", verse: "Ezekiel 18:2", explanation: "Each person is accountable." },
  { id: "ezekiel58", question: "What does God take no pleasure in?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Death of the wicked" }, { label: "C", text: "Judgment" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Ezekiel 18:23", explanation: "God desires repentance." },
  { id: "ezekiel59", question: "What does God call people to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Repent and live" }, { label: "C", text: "Flee" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Ezekiel 18:32", explanation: "Repentance leads to life." },
  { id: "ezekiel60", question: "What imagery describes Israel?", options: [{ label: "A", text: "A vine" }, { label: "B", text: "A lion cub" }, { label: "C", text: "A child" }, { label: "D", text: "A bride" }], correctAnswer: "B", verse: "Ezekiel 19", explanation: "Israel is described as a lion cub." },
  { id: "ezekiel61", question: "What chapter recounts Israel's history allegorically?", options: [{ label: "A", text: "Ezekiel 16" }, { label: "B", text: "Ezekiel 20" }, { label: "C", text: "Ezekiel 23" }, { label: "D", text: "Ezekiel 24" }], correctAnswer: "B", verse: "Ezekiel 20", explanation: "God recounts Israel's rebellion." },
  { id: "ezekiel62", question: "What is Israel repeatedly accused of?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Rebellion" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Ezekiel 20", explanation: "Rebellion defines their history." },
  { id: "ezekiel63", question: "What parable involves a vine?", options: [{ label: "A", text: "Ezekiel 15" }, { label: "B", text: "Ezekiel 17" }, { label: "C", text: "Ezekiel 19" }, { label: "D", text: "Ezekiel 21" }], correctAnswer: "B", verse: "Ezekiel 17", explanation: "The vine parable explains judgment." },
  { id: "ezekiel64", question: "Who breaks a covenant in Ezekiel 17?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Judah's king" }, { label: "C", text: "Egypt" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Ezekiel 17:15", explanation: "Judah's king broke covenant." },
  { id: "ezekiel65", question: "Who is judged for shepherding poorly?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Shepherds of Israel" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Ezekiel 34", explanation: "Leaders failed as shepherds." },
  { id: "ezekiel66", question: "Who promises to shepherd the people?", options: [{ label: "A", text: "David" }, { label: "B", text: "The Lord" }, { label: "C", text: "A new king" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Ezekiel 34:15", explanation: "God Himself will shepherd." },
  { id: "ezekiel67", question: "What future ruler is promised?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "David" }, { label: "C", text: "A prince" }, { label: "D", text: "Messiah" }], correctAnswer: "B", verse: "Ezekiel 34:23", explanation: "David represents a future ruler." },
  { id: "ezekiel68", question: "What valley vision is famous?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Dry bones" }, { label: "C", text: "Water" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Ezekiel 37", explanation: "The valley of dry bones." },
  { id: "ezekiel69", question: "What do the bones represent?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "House of Israel" }, { label: "C", text: "Gentiles" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Ezekiel 37:11", explanation: "They represent Israel." },
  { id: "ezekiel70", question: "What brings the bones to life?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Spirit of God" }, { label: "C", text: "Angels" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Ezekiel 37:14", explanation: "God's Spirit gives life." },
  { id: "ezekiel71", question: "What do the two sticks symbolize?", options: [{ label: "A", text: "Law and grace" }, { label: "B", text: "Judah and Israel united" }, { label: "C", text: "Priests and kings" }, { label: "D", text: "Old and new" }], correctAnswer: "B", verse: "Ezekiel 37:17", explanation: "The kingdom will be united." },
  { id: "ezekiel72", question: "Who attacks Israel in later chapters?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Gog of Magog" }, { label: "C", text: "Egypt" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Ezekiel 38", explanation: "Gog represents future enemies." },
  { id: "ezekiel73", question: "Who defeats Gog?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "The Lord" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Ezekiel 38:23", explanation: "God defeats Gog." },
  { id: "ezekiel74", question: "What dominates Ezekiel 40-48?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Future temple vision" }, { label: "C", text: "Exile" }, { label: "D", text: "Warfare" }], correctAnswer: "B", verse: "Ezekiel 40-48", explanation: "A future temple is described." },
  { id: "ezekiel75", question: "What measures the temple?", options: [{ label: "A", text: "Angel with rod" }, { label: "B", text: "King" }, { label: "C", text: "Priest" }, { label: "D", text: "Prophet" }], correctAnswer: "A", verse: "Ezekiel 40:3", explanation: "An angel measures it." },
  { id: "ezekiel76", question: "What flows from the temple?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Water" }, { label: "C", text: "Oil" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Ezekiel 47:1", explanation: "Life-giving water flows." },
  { id: "ezekiel77", question: "What happens as the water flows?", options: [{ label: "A", text: "It dries" }, { label: "B", text: "It deepens" }, { label: "C", text: "It disappears" }, { label: "D", text: "It freezes" }], correctAnswer: "B", verse: "Ezekiel 47:3-5", explanation: "The water grows deeper." },
  { id: "ezekiel78", question: "What does the water bring?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Life" }, { label: "C", text: "Judgment" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezekiel 47:9", explanation: "The water brings life." },
  { id: "ezekiel79", question: "What grows along the river?", options: [{ label: "A", text: "Vines" }, { label: "B", text: "Fruit trees" }, { label: "C", text: "Grass" }, { label: "D", text: "Flowers" }], correctAnswer: "B", verse: "Ezekiel 47:12", explanation: "Trees bear fruit monthly." },
  { id: "ezekiel80", question: "What are the leaves used for?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Healing" }, { label: "C", text: "Shade" }, { label: "D", text: "Fuel" }], correctAnswer: "B", verse: "Ezekiel 47:12", explanation: "Leaves bring healing." },
  { id: "ezekiel81", question: "How is the land divided?", options: [{ label: "A", text: "By kings" }, { label: "B", text: "By tribes" }, { label: "C", text: "By priests" }, { label: "D", text: "By cities" }], correctAnswer: "B", verse: "Ezekiel 48", explanation: "Land is divided by tribes." },
  { id: "ezekiel82", question: "What is the city called?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "The Lord is there" }, { label: "C", text: "Zion" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Ezekiel 48:35", explanation: "The city is named The Lord Is There." },
  { id: "ezekiel83", question: "What does the city name signify?", options: [{ label: "A", text: "Power" }, { label: "B", text: "God's presence" }, { label: "C", text: "Victory" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Ezekiel 48:35", explanation: "God dwells with His people." },
  { id: "ezekiel84", question: "What theme balances judgment?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Restoration" }, { label: "C", text: "Fear" }, { label: "D", text: "Loss" }], correctAnswer: "B", verse: "Ezekiel", explanation: "Restoration follows judgment." },
  { id: "ezekiel85", question: "What is God ultimately restoring?", options: [{ label: "A", text: "Land only" }, { label: "B", text: "Relationship" }, { label: "C", text: "Temple only" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Ezekiel", explanation: "God restores relationship." },
  { id: "ezekiel86", question: "What defines Ezekiel's message?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "God's sovereignty" }, { label: "C", text: "Human strength" }, { label: "D", text: "Political power" }], correctAnswer: "B", verse: "Ezekiel", explanation: "God is sovereign." },
  { id: "ezekiel87", question: "What is repeatedly emphasized?", options: [{ label: "A", text: "You will know" }, { label: "B", text: "You will forget" }, { label: "C", text: "You will conquer" }, { label: "D", text: "You will flee" }], correctAnswer: "A", verse: "Ezekiel", explanation: "You will know the Lord." },
  { id: "ezekiel88", question: "What does God desire?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Repentance" }, { label: "C", text: "Power" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezekiel 18", explanation: "God desires repentance." },
  { id: "ezekiel89", question: "What does God promise to give?", options: [{ label: "A", text: "New law" }, { label: "B", text: "New spirit" }, { label: "C", text: "New land" }, { label: "D", text: "New king" }], correctAnswer: "B", verse: "Ezekiel 36:26", explanation: "A new spirit is promised." },
  { id: "ezekiel90", question: "What is removed?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Heart of stone" }, { label: "C", text: "Temple" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Ezekiel 36:26", explanation: "The heart of stone is removed." },
  { id: "ezekiel91", question: "What replaces it?", options: [{ label: "A", text: "Heart of flesh" }, { label: "B", text: "Mind of wisdom" }, { label: "C", text: "Spirit of fear" }, { label: "D", text: "Strength" }], correctAnswer: "A", verse: "Ezekiel 36:26", explanation: "A heart of flesh is given." },
  { id: "ezekiel92", question: "Why does God act?", options: [{ label: "A", text: "For Israel's sake" }, { label: "B", text: "For His holy name" }, { label: "C", text: "For nations" }, { label: "D", text: "For kings" }], correctAnswer: "B", verse: "Ezekiel 36:22", explanation: "God acts for His name." },
  { id: "ezekiel93", question: "What will nations know?", options: [{ label: "A", text: "Israel is strong" }, { label: "B", text: "The Lord is God" }, { label: "C", text: "Kings are powerful" }, { label: "D", text: "War is over" }], correctAnswer: "B", verse: "Ezekiel 36:23", explanation: "God reveals Himself." },
  { id: "ezekiel94", question: "What defines the restored people?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Strength" }, { label: "C", text: "Power" }, { label: "D", text: "Wealth" }], correctAnswer: "A", verse: "Ezekiel 36:27", explanation: "They walk in God's ways." },
  { id: "ezekiel95", question: "What does Ezekiel emphasize about God?", options: [{ label: "A", text: "Distance" }, { label: "B", text: "Presence" }, { label: "C", text: "Silence" }, { label: "D", text: "Absence" }], correctAnswer: "B", verse: "Ezekiel", explanation: "God dwells with His people." },
  { id: "ezekiel96", question: "What is Ezekiel's final message?", options: [{ label: "A", text: "Judgment only" }, { label: "B", text: "Restoration with God present" }, { label: "C", text: "Exile forever" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezekiel 48:35", explanation: "God is with His people." },
  { id: "ezekiel97", question: "What does Ezekiel show about exile?", options: [{ label: "A", text: "It ends hope" }, { label: "B", text: "God is still present" }, { label: "C", text: "God is absent" }, { label: "D", text: "Prayer stops" }], correctAnswer: "B", verse: "Ezekiel", explanation: "God remains present." },
  { id: "ezekiel98", question: "What phrase summarizes the book?", options: [{ label: "A", text: "Fear the Lord" }, { label: "B", text: "You will know I am the Lord" }, { label: "C", text: "Return to Jerusalem" }, { label: "D", text: "Wait quietly" }], correctAnswer: "B", verse: "Ezekiel", explanation: "God reveals Himself." },
  { id: "ezekiel99", question: "What does Ezekiel teach about God's glory?", options: [{ label: "A", text: "It fades" }, { label: "B", text: "It departs and returns" }, { label: "C", text: "It is hidden" }, { label: "D", text: "It ends" }], correctAnswer: "B", verse: "Ezekiel 10, 43", explanation: "God's glory leaves and returns." },
  { id: "ezekiel100", question: "What final truth anchors Ezekiel?", options: [{ label: "A", text: "Israel's strength" }, { label: "B", text: "The Lord is there" }, { label: "C", text: "The temple stands" }, { label: "D", text: "Judgment is complete" }], correctAnswer: "B", verse: "Ezekiel 48:35", explanation: "The Lord is there." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EzekielTriviaPage() {
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
          .eq("book", "ezekiel");

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
          book: "ezekiel",
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
            book: "ezekiel",
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
    if (score === 10) return "Perfect! You're an Ezekiel expert!";
    if (score >= 8) return "Excellent! You know Ezekiel well!";
    if (score >= 6) return "Good job! Keep studying Ezekiel!";
    if (score >= 4) return "Nice try! Ezekiel has much to explore!";
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
              href="/bible-trivia/ezekiel"
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

