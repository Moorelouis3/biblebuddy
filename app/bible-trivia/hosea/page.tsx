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
  { id: "hosea1", question: "Who is the author of the book of Hosea?", options: [{ label: "A", text: "Amos" }, { label: "B", text: "Hosea" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "Hosea 1:1", explanation: "The book is attributed to the prophet Hosea." },
  { id: "hosea2", question: "During whose reign did Hosea prophesy?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Jeroboam II" }, { label: "D", text: "Ahab" }], correctAnswer: "C", verse: "Hosea 1:1", explanation: "Hosea prophesied during Jeroboam II's reign." },
  { id: "hosea3", question: "To which kingdom did Hosea primarily minister?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Israel" }, { label: "C", text: "Babylon" }, { label: "D", text: "Assyria" }], correctAnswer: "B", verse: "Hosea 1:1", explanation: "Hosea ministered to the northern kingdom, Israel." },
  { id: "hosea4", question: "What unusual command did God give Hosea?", options: [{ label: "A", text: "Build a temple" }, { label: "B", text: "Marry a promiscuous woman" }, { label: "C", text: "Leave Israel" }, { label: "D", text: "Confront the king" }], correctAnswer: "B", verse: "Hosea 1:2", explanation: "Hosea's marriage symbolized Israel's unfaithfulness." },
  { id: "hosea5", question: "What was the name of Hosea's wife?", options: [{ label: "A", text: "Ruth" }, { label: "B", text: "Gomer" }, { label: "C", text: "Deborah" }, { label: "D", text: "Hannah" }], correctAnswer: "B", verse: "Hosea 1:3", explanation: "Hosea married Gomer." },
  { id: "hosea6", question: "What did Gomer represent symbolically?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Israel's unfaithfulness" }, { label: "C", text: "The nations" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Hosea 1", explanation: "Gomer symbolized Israel's spiritual adultery." },
  { id: "hosea7", question: "What was the name of Hosea's first son?", options: [{ label: "A", text: "Lo-Ammi" }, { label: "B", text: "Jezreel" }, { label: "C", text: "Ephraim" }, { label: "D", text: "Hoshea" }], correctAnswer: "B", verse: "Hosea 1:4", explanation: "Jezreel symbolized judgment." },
  { id: "hosea8", question: "What did the name Jezreel signify?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Judgment on Israel" }, { label: "C", text: "Restoration" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Hosea 1:4-5", explanation: "It pointed to coming judgment." },
  { id: "hosea9", question: "What was the name of Hosea's daughter?", options: [{ label: "A", text: "Lo-Ruhamah" }, { label: "B", text: "Noemi" }, { label: "C", text: "Tamar" }, { label: "D", text: "Dinah" }], correctAnswer: "A", verse: "Hosea 1:6", explanation: "Lo-Ruhamah means 'not loved.'" },
  { id: "hosea10", question: "What did Lo-Ruhamah mean?", options: [{ label: "A", text: "God saves" }, { label: "B", text: "Not shown mercy" }, { label: "C", text: "Chosen one" }, { label: "D", text: "Restored" }], correctAnswer: "B", verse: "Hosea 1:6", explanation: "It symbolized withdrawn mercy." },
  { id: "hosea11", question: "What was the name of Hosea's second son?", options: [{ label: "A", text: "Jezreel" }, { label: "B", text: "Lo-Ammi" }, { label: "C", text: "Amos" }, { label: "D", text: "Judah" }], correctAnswer: "B", verse: "Hosea 1:8-9", explanation: "Lo-Ammi means 'not my people.'" },
  { id: "hosea12", question: "What did Lo-Ammi signify?", options: [{ label: "A", text: "Chosen people" }, { label: "B", text: "Rejected people" }, { label: "C", text: "Faithful people" }, { label: "D", text: "Holy people" }], correctAnswer: "B", verse: "Hosea 1:9", explanation: "It symbolized broken covenant." },
  { id: "hosea13", question: "What promise follows judgment?", options: [{ label: "A", text: "Total destruction" }, { label: "B", text: "Future restoration" }, { label: "C", text: "Exile only" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Hosea 1:10", explanation: "God promises restoration." },
  { id: "hosea14", question: "What will Israel be called again?", options: [{ label: "A", text: "Not loved" }, { label: "B", text: "Children of the living God" }, { label: "C", text: "Lost people" }, { label: "D", text: "Rejected nation" }], correctAnswer: "B", verse: "Hosea 1:10", explanation: "God restores identity." },
  { id: "hosea15", question: "What does Hosea 2 describe?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Israel's unfaithfulness" }, { label: "C", text: "Temple worship" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Hosea 2", explanation: "Israel's spiritual adultery is exposed." },
  { id: "hosea16", question: "What did Israel pursue instead of God?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Other lovers" }, { label: "C", text: "Justice" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Hosea 2:5", explanation: "Idolatry is described as adultery." },
  { id: "hosea17", question: "What did Israel attribute blessings to?", options: [{ label: "A", text: "God" }, { label: "B", text: "Baal" }, { label: "C", text: "Kings" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Hosea 2:8", explanation: "Israel credited idols for blessings." },
  { id: "hosea18", question: "What would God remove?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Her celebrations" }, { label: "C", text: "The covenant" }, { label: "D", text: "The prophets" }], correctAnswer: "B", verse: "Hosea 2:11", explanation: "Joy would cease." },
  { id: "hosea19", question: "What place becomes a door of hope?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Valley of Achor" }, { label: "C", text: "Samaria" }, { label: "D", text: "Zion" }], correctAnswer: "B", verse: "Hosea 2:15", explanation: "God turns trouble into hope." },
  { id: "hosea20", question: "What new relationship is promised?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Husband" }, { label: "C", text: "Judge" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Hosea 2:16", explanation: "God restores intimacy." },
  { id: "hosea21", question: "What will God betroth Israel with?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Righteousness and love" }, { label: "C", text: "Fear" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Hosea 2:19", explanation: "Covenant love is renewed." },
  { id: "hosea22", question: "What happens to Lo-Ammi?", options: [{ label: "A", text: "Destroyed" }, { label: "B", text: "Called My People" }, { label: "C", text: "Exiled forever" }, { label: "D", text: "Forgotten" }], correctAnswer: "B", verse: "Hosea 2:23", explanation: "Identity is restored." },
  { id: "hosea23", question: "What does God command Hosea again?", options: [{ label: "A", text: "Leave Israel" }, { label: "B", text: "Love his wife again" }, { label: "C", text: "Prophesy to Judah" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Hosea 3:1", explanation: "Hosea redeems Gomer." },
  { id: "hosea24", question: "What does Hosea do for Gomer?", options: [{ label: "A", text: "Divorces her" }, { label: "B", text: "Buys her back" }, { label: "C", text: "Punishes her" }, { label: "D", text: "Ignores her" }], correctAnswer: "B", verse: "Hosea 3:2", explanation: "Redemption mirrors God's love." },
  { id: "hosea25", question: "What does this redemption symbolize?", options: [{ label: "A", text: "Israel's strength" }, { label: "B", text: "God's faithful love" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law keeping" }], correctAnswer: "B", verse: "Hosea 3", explanation: "God redeems His people." },
  { id: "hosea26", question: "What will Israel lack for many days?", options: [{ label: "A", text: "Food" }, { label: "B", text: "King and sacrifice" }, { label: "C", text: "Land" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Hosea 3:4", explanation: "A time of discipline." },
  { id: "hosea27", question: "What will Israel seek afterward?", options: [{ label: "A", text: "Idols" }, { label: "B", text: "The Lord and Davidic king" }, { label: "C", text: "Power" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Hosea 3:5", explanation: "Restoration includes rightful king." },
  { id: "hosea28", question: "What does Hosea 4 accuse Israel of lacking?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Knowledge of God" }, { label: "C", text: "Strength" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "Hosea 4:1", explanation: "Ignorance of God is condemned." },
  { id: "hosea29", question: "Who is blamed for leading people astray?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Priests" }, { label: "C", text: "Prophets" }, { label: "D", text: "Foreigners" }], correctAnswer: "B", verse: "Hosea 4:6", explanation: "Corrupt priests failed the people." },
  { id: "hosea30", question: "What increases as priests increase?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Sin" }, { label: "C", text: "Blessing" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Hosea 4:7", explanation: "Leadership corruption grows." },
  { id: "hosea31", question: "What sin is repeatedly condemned?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Fasting" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Hosea 4-5", explanation: "Idolatry dominates Israel's sin." },
  { id: "hosea32", question: "What animal imagery is used for Israel?", options: [{ label: "A", text: "Lion" }, { label: "B", text: "Stubborn heifer" }, { label: "C", text: "Sheep" }, { label: "D", text: "Dove" }], correctAnswer: "B", verse: "Hosea 4:16", explanation: "Israel is stubborn." },
  { id: "hosea33", question: "What happens when Israel seeks help from Assyria?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Shame" }, { label: "C", text: "Victory" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Hosea 5:13", explanation: "Foreign alliances fail." },
  { id: "hosea34", question: "What does God desire instead of sacrifice?", options: [{ label: "A", text: "Offerings" }, { label: "B", text: "Mercy" }, { label: "C", text: "Fasting" }, { label: "D", text: "Rituals" }], correctAnswer: "B", verse: "Hosea 6:6", explanation: "God desires loyal love." },
  { id: "hosea35", question: "What is Israel's repentance compared to?", options: [{ label: "A", text: "Deep roots" }, { label: "B", text: "Morning mist" }, { label: "C", text: "Strong fire" }, { label: "D", text: "Solid rock" }], correctAnswer: "B", verse: "Hosea 6:4", explanation: "Repentance is shallow." },
  { id: "hosea36", question: "What covenant did Israel break?", options: [{ label: "A", text: "Davidic" }, { label: "B", text: "Mosaic" }, { label: "C", text: "Human covenant" }, { label: "D", text: "Foreign treaties" }], correctAnswer: "B", verse: "Hosea 6:7", explanation: "Israel broke God's covenant." },
  { id: "hosea37", question: "What metaphor describes Israel's heart?", options: [{ label: "A", text: "Pure" }, { label: "B", text: "Heated oven" }, { label: "C", text: "Strong stone" }, { label: "D", text: "Gentle lamb" }], correctAnswer: "B", verse: "Hosea 7:4", explanation: "Passion burns uncontrolled." },
  { id: "hosea38", question: "What animal symbolizes Israel's foolishness?", options: [{ label: "A", text: "Lion" }, { label: "B", text: "Dove" }, { label: "C", text: "Bear" }, { label: "D", text: "Fox" }], correctAnswer: "B", verse: "Hosea 7:11", explanation: "Israel is like a silly dove." },
  { id: "hosea39", question: "What has Israel mixed with?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "The nations" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Hosea 7:8", explanation: "Compromise weakens Israel." },
  { id: "hosea40", question: "What image describes Israel's condition?", options: [{ label: "A", text: "Strong cake" }, { label: "B", text: "Half-baked cake" }, { label: "C", text: "Burnt offering" }, { label: "D", text: "Fresh bread" }], correctAnswer: "B", verse: "Hosea 7:8", explanation: "Incomplete devotion." },
  { id: "hosea41", question: "What is about to come like an eagle?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Judgment" }, { label: "C", text: "Peace" }, { label: "D", text: "Restoration" }], correctAnswer: "B", verse: "Hosea 8:1", explanation: "Judgment approaches swiftly." },
  { id: "hosea42", question: "Why does judgment come?", options: [{ label: "A", text: "Lack of strength" }, { label: "B", text: "Breaking God's covenant" }, { label: "C", text: "Foreign attacks" }, { label: "D", text: "Poverty" }], correctAnswer: "B", verse: "Hosea 8:1", explanation: "Covenant violation." },
  { id: "hosea43", question: "What does Israel cry out?", options: [{ label: "A", text: "Help" }, { label: "B", text: "My God, we know you" }, { label: "C", text: "Mercy" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Hosea 8:2", explanation: "Words without obedience." },
  { id: "hosea44", question: "What has Israel rejected?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "What is good" }, { label: "C", text: "The prophets" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Hosea 8:3", explanation: "They reject righteousness." },
  { id: "hosea45", question: "What does Israel sow?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "The wind" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Hosea 8:7", explanation: "Actions bring consequences." },
  { id: "hosea46", question: "What will Israel reap?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "The whirlwind" }, { label: "C", text: "Joy" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Hosea 8:7", explanation: "Judgment follows sin." },
  { id: "hosea47", question: "What false security did Israel trust?", options: [{ label: "A", text: "God" }, { label: "B", text: "Foreign alliances" }, { label: "C", text: "Prayer" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Hosea 8-9", explanation: "Trust misplaced." },
  { id: "hosea48", question: "What joy will cease?", options: [{ label: "A", text: "Harvest joy" }, { label: "B", text: "Festival joy" }, { label: "C", text: "Worship joy" }, { label: "D", text: "All joy" }], correctAnswer: "B", verse: "Hosea 9:1", explanation: "Festivals will end." },
  { id: "hosea49", question: "Where will Israel return?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Egypt" }, { label: "C", text: "Judah" }, { label: "D", text: "Jerusalem" }], correctAnswer: "B", verse: "Hosea 9:3", explanation: "Symbolic return to bondage." },
  { id: "hosea50", question: "What happens to Israel's glory?", options: [{ label: "A", text: "Increases" }, { label: "B", text: "Flies away" }, { label: "C", text: "Strengthens" }, { label: "D", text: "Remains" }], correctAnswer: "B", verse: "Hosea 9:11", explanation: "Glory departs." },
  { id: "hosea51", question: "What is God's response to continued sin?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Judgment mixed with sorrow" }, { label: "C", text: "Immediate destruction" }, { label: "D", text: "Approval" }], correctAnswer: "B", verse: "Hosea 9-10", explanation: "God grieves over judgment." },
  { id: "hosea52", question: "What imagery describes Israel as a nation?", options: [{ label: "A", text: "Dead tree" }, { label: "B", text: "Luxuriant vine" }, { label: "C", text: "Strong tower" }, { label: "D", text: "Still water" }], correctAnswer: "B", verse: "Hosea 10:1", explanation: "Prosperity led to idolatry." },
  { id: "hosea53", question: "What did prosperity produce?", options: [{ label: "A", text: "Humility" }, { label: "B", text: "More altars to idols" }, { label: "C", text: "Obedience" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Hosea 10:1", explanation: "Wealth increased idolatry." },
  { id: "hosea54", question: "What does God desire Israel to do?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Break up fallow ground" }, { label: "C", text: "Flee" }, { label: "D", text: "Build altars" }], correctAnswer: "B", verse: "Hosea 10:12", explanation: "Repentance is called for." },
  { id: "hosea55", question: "What metaphor describes sowing righteousness?", options: [{ label: "A", text: "Planting seeds" }, { label: "B", text: "Harvesting mercy" }, { label: "C", text: "Breaking chains" }, { label: "D", text: "Burning chaff" }], correctAnswer: "B", verse: "Hosea 10:12", explanation: "Righteousness brings mercy." },
  { id: "hosea56", question: "What historical event is recalled?", options: [{ label: "A", text: "Exodus" }, { label: "B", text: "Gibeah's sin" }, { label: "C", text: "Flood" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Hosea 10:9", explanation: "Past sin repeated." },
  { id: "hosea57", question: "What will war destroy?", options: [{ label: "A", text: "Cities" }, { label: "B", text: "Strongholds" }, { label: "C", text: "Kings" }, { label: "D", text: "Fields" }], correctAnswer: "B", verse: "Hosea 10:14", explanation: "False security collapses." },
  { id: "hosea58", question: "What causes Israel's downfall?", options: [{ label: "A", text: "Weak armies" }, { label: "B", text: "Trust in their own way" }, { label: "C", text: "Famine" }, { label: "D", text: "Foreign kings" }], correctAnswer: "B", verse: "Hosea 10:13", explanation: "Self-reliance fails." },
  { id: "hosea59", question: "What will happen to the king of Israel?", options: [{ label: "A", text: "Restored" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Exiled" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Hosea 10:15", explanation: "Leadership falls." },
  { id: "hosea60", question: "What tone begins to shift in chapter 11?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Compassion" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Hosea 11", explanation: "God's love is emphasized." },
  { id: "hosea61", question: "How does God describe Israel in Hosea 11?", options: [{ label: "A", text: "A servant" }, { label: "B", text: "A child" }, { label: "C", text: "A stranger" }, { label: "D", text: "An enemy" }], correctAnswer: "B", verse: "Hosea 11:1", explanation: "God loves Israel as a child." },
  { id: "hosea62", question: "What did God do when Israel was young?", options: [{ label: "A", text: "Abandoned them" }, { label: "B", text: "Called them out of Egypt" }, { label: "C", text: "Punished them" }, { label: "D", text: "Ignored them" }], correctAnswer: "B", verse: "Hosea 11:1", explanation: "Reference to the Exodus." },
  { id: "hosea63", question: "What did Israel do despite God's care?", options: [{ label: "A", text: "Trusted God" }, { label: "B", text: "Turned to Baals" }, { label: "C", text: "Repented" }, { label: "D", text: "Obeyed fully" }], correctAnswer: "B", verse: "Hosea 11:2", explanation: "They turned to idols." },
  { id: "hosea64", question: "What imagery describes God's care?", options: [{ label: "A", text: "King ruling" }, { label: "B", text: "Parent teaching a child" }, { label: "C", text: "Judge sentencing" }, { label: "D", text: "Warrior fighting" }], correctAnswer: "B", verse: "Hosea 11:3-4", explanation: "Gentle parental care." },
  { id: "hosea65", question: "Why will Israel return to bondage?", options: [{ label: "A", text: "God forgot them" }, { label: "B", text: "They refused to repent" }, { label: "C", text: "They were weak" }, { label: "D", text: "Assyria demanded it" }], correctAnswer: "B", verse: "Hosea 11:5", explanation: "Refusal to repent leads to judgment." },
  { id: "hosea66", question: "What struggle does God express?", options: [{ label: "A", text: "Indifference" }, { label: "B", text: "Inner compassion" }, { label: "C", text: "Anger only" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Hosea 11:8", explanation: "God's compassion is stirred." },
  { id: "hosea67", question: "What does God decide not to do?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Completely destroy Israel" }, { label: "C", text: "Discipline" }, { label: "D", text: "Speak" }], correctAnswer: "B", verse: "Hosea 11:9", explanation: "Mercy restrains judgment." },
  { id: "hosea68", question: "Why does God show restraint?", options: [{ label: "A", text: "Israel deserves it" }, { label: "B", text: "God is holy and not human" }, { label: "C", text: "Fear of nations" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Hosea 11:9", explanation: "God's holiness guides mercy." },
  { id: "hosea69", question: "What will God's people eventually do?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Follow the Lord" }, { label: "C", text: "Worship idols" }, { label: "D", text: "Scatter forever" }], correctAnswer: "B", verse: "Hosea 11:10", explanation: "Future restoration promised." },
  { id: "hosea70", question: "What animal imagery describes God's call?", options: [{ label: "A", text: "Lamb" }, { label: "B", text: "Roaring lion" }, { label: "C", text: "Dove" }, { label: "D", text: "Ox" }], correctAnswer: "B", verse: "Hosea 11:10", explanation: "God's powerful call gathers His people." },
  { id: "hosea71", question: "What returns alongside Israel?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Trembling" }, { label: "C", text: "Pride" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Hosea 11:11", explanation: "Reverent return." },
  { id: "hosea72", question: "What accusation continues in chapter 12?", options: [{ label: "A", text: "Poverty" }, { label: "B", text: "Deceit" }, { label: "C", text: "Weakness" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Hosea 12:1", explanation: "Israel is deceitful." },
  { id: "hosea73", question: "Which patriarch is referenced?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Jacob" }, { label: "C", text: "Isaac" }, { label: "D", text: "Joseph" }], correctAnswer: "B", verse: "Hosea 12:3", explanation: "Jacob's story is recalled." },
  { id: "hosea74", question: "What did Jacob do at Bethel?", options: [{ label: "A", text: "Built an altar" }, { label: "B", text: "Wrestled with God" }, { label: "C", text: "Fled" }, { label: "D", text: "Sinned" }], correctAnswer: "B", verse: "Hosea 12:4", explanation: "Jacob wrestled and sought blessing." },
  { id: "hosea75", question: "What does God desire from Israel?", options: [{ label: "A", text: "Sacrifices" }, { label: "B", text: "Return and faithfulness" }, { label: "C", text: "Offerings" }, { label: "D", text: "Ritual purity" }], correctAnswer: "B", verse: "Hosea 12:6", explanation: "Return to the Lord." },
  { id: "hosea76", question: "What does Ephraim boast about?", options: [{ label: "A", text: "God's mercy" }, { label: "B", text: "Wealth" }, { label: "C", text: "Faithfulness" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Hosea 12:8", explanation: "Wealth creates false security." },
  { id: "hosea77", question: "What did God do through prophets?", options: [{ label: "A", text: "Ignored Israel" }, { label: "B", text: "Warned Israel" }, { label: "C", text: "Destroyed Israel" }, { label: "D", text: "Abandoned Israel" }], correctAnswer: "B", verse: "Hosea 12:10", explanation: "God warned repeatedly." },
  { id: "hosea78", question: "What sin is repeated in chapter 13?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Silence" }, { label: "D", text: "Ignorance" }], correctAnswer: "B", verse: "Hosea 13", explanation: "Idolatry leads to downfall." },
  { id: "hosea79", question: "What happens when Ephraim speaks?", options: [{ label: "A", text: "People listen" }, { label: "B", text: "Terror follows" }, { label: "C", text: "Blessing flows" }, { label: "D", text: "Peace comes" }], correctAnswer: "B", verse: "Hosea 13:1", explanation: "Authority corrupted." },
  { id: "hosea80", question: "What image describes fleeting idols?", options: [{ label: "A", text: "Stone" }, { label: "B", text: "Morning cloud" }, { label: "C", text: "Iron" }, { label: "D", text: "Mountain" }], correctAnswer: "B", verse: "Hosea 13:3", explanation: "Idols are temporary." },
  { id: "hosea81", question: "Who alone is Israel's savior?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Hosea 13:4", explanation: "God alone saves." },
  { id: "hosea82", question: "What happens when Israel is fed?", options: [{ label: "A", text: "They worship" }, { label: "B", text: "They become proud" }, { label: "C", text: "They repent" }, { label: "D", text: "They obey" }], correctAnswer: "B", verse: "Hosea 13:6", explanation: "Prosperity leads to pride." },
  { id: "hosea83", question: "What animal imagery describes God's judgment?", options: [{ label: "A", text: "Lamb" }, { label: "B", text: "Lion and bear" }, { label: "C", text: "Dove" }, { label: "D", text: "Ox" }], correctAnswer: "B", verse: "Hosea 13:7-8", explanation: "Judgment is fierce." },
  { id: "hosea84", question: "What is Israel's problem?", options: [{ label: "A", text: "God abandoned them" }, { label: "B", text: "They are against their helper" }, { label: "C", text: "They lack kings" }, { label: "D", text: "They lack strength" }], correctAnswer: "B", verse: "Hosea 13:9", explanation: "Self-destruction through rebellion." },
  { id: "hosea85", question: "What question does God ask about the king?", options: [{ label: "A", text: "Where is your king?" }, { label: "B", text: "Who is your king?" }, { label: "C", text: "Why do you trust kings?" }, { label: "D", text: "Will the king save you?" }], correctAnswer: "A", verse: "Hosea 13:10", explanation: "False reliance exposed." },
  { id: "hosea86", question: "What power will God redeem from?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Death" }, { label: "C", text: "Assyria" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Hosea 13:14", explanation: "Victory over death promised." },
  { id: "hosea87", question: "What does God challenge?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Death and grave" }, { label: "C", text: "Kings" }, { label: "D", text: "Idols" }], correctAnswer: "B", verse: "Hosea 13:14", explanation: "God's power over death." },
  { id: "hosea88", question: "What does Hosea 14 call Israel to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Return to the Lord" }, { label: "C", text: "Hide" }, { label: "D", text: "Mourn" }], correctAnswer: "B", verse: "Hosea 14:1", explanation: "Final call to repentance." },
  { id: "hosea89", question: "What should Israel bring?", options: [{ label: "A", text: "Sacrifices" }, { label: "B", text: "Words of repentance" }, { label: "C", text: "Offerings" }, { label: "D", text: "Animals" }], correctAnswer: "B", verse: "Hosea 14:2", explanation: "Heartfelt repentance." },
  { id: "hosea90", question: "What will God heal?", options: [{ label: "A", text: "Land" }, { label: "B", text: "Waywardness" }, { label: "C", text: "Cities" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Hosea 14:4", explanation: "God heals rebellion." },
  { id: "hosea91", question: "How will God love Israel?", options: [{ label: "A", text: "Conditionally" }, { label: "B", text: "Freely" }, { label: "C", text: "Temporarily" }, { label: "D", text: "Cautiously" }], correctAnswer: "B", verse: "Hosea 14:4", explanation: "Grace is freely given." },
  { id: "hosea92", question: "What imagery describes restoration?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Dew" }, { label: "C", text: "Storm" }, { label: "D", text: "Earthquake" }], correctAnswer: "B", verse: "Hosea 14:5", explanation: "Gentle renewal." },
  { id: "hosea93", question: "What will Israel flourish like?", options: [{ label: "A", text: "Grass" }, { label: "B", text: "Lily and olive tree" }, { label: "C", text: "Cedars only" }, { label: "D", text: "Vine only" }], correctAnswer: "B", verse: "Hosea 14:5-6", explanation: "Growth and stability." },
  { id: "hosea94", question: "What will replace idolatry?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Law" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Hosea 14:8", explanation: "Exclusive devotion restored." },
  { id: "hosea95", question: "Who provides fruit for Israel?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "The land" }, { label: "D", text: "The people" }], correctAnswer: "B", verse: "Hosea 14:8", explanation: "God is the source." },
  { id: "hosea96", question: "Who will understand these things?", options: [{ label: "A", text: "The proud" }, { label: "B", text: "The wise" }, { label: "C", text: "The kings" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Hosea 14:9", explanation: "Wisdom discerns God's ways." },
  { id: "hosea97", question: "How are the ways of the Lord described?", options: [{ label: "A", text: "Hidden" }, { label: "B", text: "Right" }, { label: "C", text: "Harsh" }, { label: "D", text: "Confusing" }], correctAnswer: "B", verse: "Hosea 14:9", explanation: "God's ways are just." },
  { id: "hosea98", question: "Who walks in God's ways?", options: [{ label: "A", text: "The wicked" }, { label: "B", text: "The righteous" }, { label: "C", text: "The proud" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Hosea 14:9", explanation: "Righteous follow God." },
  { id: "hosea99", question: "What happens to transgressors?", options: [{ label: "A", text: "They flourish" }, { label: "B", text: "They stumble" }, { label: "C", text: "They rule" }, { label: "D", text: "They repent automatically" }], correctAnswer: "B", verse: "Hosea 14:9", explanation: "Sin leads to downfall." },
  { id: "hosea100", question: "What final theme anchors Hosea?", options: [{ label: "A", text: "Judgment only" }, { label: "B", text: "Faithful love despite unfaithfulness" }, { label: "C", text: "Law keeping" }, { label: "D", text: "National power" }], correctAnswer: "B", verse: "Hosea", explanation: "God's steadfast love endures." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HoseaTriviaPage() {
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
          .eq("book", "hosea");

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
          book: "hosea",
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
            book: "hosea",
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
    if (score === 10) return "Perfect! You're a Hosea expert!";
    if (score >= 8) return "Excellent! You know Hosea well!";
    if (score >= 6) return "Good job! Keep studying Hosea!";
    if (score >= 4) return "Nice try! Hosea has much to explore!";
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
              href="/bible-trivia/hosea"
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
