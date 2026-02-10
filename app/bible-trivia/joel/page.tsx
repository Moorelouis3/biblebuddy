"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
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
  { id: "joel1", question: "Who is the author of the book of Joel?", options: [{ label: "A", text: "Amos" }, { label: "B", text: "Joel" }, { label: "C", text: "Hosea" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "Joel 1:1", explanation: "The book is attributed to the prophet Joel." },
  { id: "joel2", question: "Whose son was Joel?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Pethuel" }, { label: "C", text: "Amoz" }, { label: "D", text: "Hilkiah" }], correctAnswer: "B", verse: "Joel 1:1", explanation: "Joel was the son of Pethuel." },
  { id: "joel3", question: "What major disaster opens the book?", options: [{ label: "A", text: "Earthquake" }, { label: "B", text: "Locust plague" }, { label: "C", text: "Famine" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Joel 1:4", explanation: "A devastating locust plague." },
  { id: "joel4", question: "What do the locusts symbolize?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Judgment" }, { label: "C", text: "Peace" }, { label: "D", text: "Harvest" }], correctAnswer: "B", verse: "Joel 1", explanation: "They represent divine judgment." },
  { id: "joel5", question: "Who is called to hear the warning?", options: [{ label: "A", text: "Children only" }, { label: "B", text: "Elders and inhabitants" }, { label: "C", text: "Priests only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Joel 1:2", explanation: "All generations are warned." },
  { id: "joel6", question: "What has never been seen before?", options: [{ label: "A", text: "Earthquake" }, { label: "B", text: "Such devastation" }, { label: "C", text: "War" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Joel 1:2", explanation: "The destruction is unprecedented." },
  { id: "joel7", question: "Who is told to wake up and weep?", options: [{ label: "A", text: "Farmers" }, { label: "B", text: "Drunkards" }, { label: "C", text: "Kings" }, { label: "D", text: "Children" }], correctAnswer: "B", verse: "Joel 1:5", explanation: "Luxury is stripped away." },
  { id: "joel8", question: "What has been cut off from the house of the Lord?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Grain and drink offerings" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Incense" }], correctAnswer: "B", verse: "Joel 1:9", explanation: "Worship is disrupted." },
  { id: "joel9", question: "Who mourns because offerings cease?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Priests" }, { label: "C", text: "Prophets" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Joel 1:9", explanation: "Priests grieve loss of worship." },
  { id: "joel10", question: "What emotions describe the land?", options: [{ label: "A", text: "Joyful" }, { label: "B", text: "Mourning" }, { label: "C", text: "Peaceful" }, { label: "D", text: "Resting" }], correctAnswer: "B", verse: "Joel 1:10", explanation: "The land itself mourns." },
  { id: "joel11", question: "What has withered?", options: [{ label: "A", text: "Olive trees" }, { label: "B", text: "Vines and fig trees" }, { label: "C", text: "Cedars" }, { label: "D", text: "Palms" }], correctAnswer: "B", verse: "Joel 1:12", explanation: "Agricultural collapse." },
  { id: "joel12", question: "Who are told to put on sackcloth?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Priests" }, { label: "C", text: "Children" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Joel 1:13", explanation: "Leaders must repent." },
  { id: "joel13", question: "What type of gathering is called?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Sacred assembly" }, { label: "C", text: "War council" }, { label: "D", text: "Celebration" }], correctAnswer: "B", verse: "Joel 1:14", explanation: "A call to repentance." },
  { id: "joel14", question: "What day is described as near?", options: [{ label: "A", text: "Day of harvest" }, { label: "B", text: "Day of the Lord" }, { label: "C", text: "Day of peace" }, { label: "D", text: "Day of exile" }], correctAnswer: "B", verse: "Joel 1:15", explanation: "The Day of the Lord approaches." },
  { id: "joel15", question: "What does the Day of the Lord bring?", options: [{ label: "A", text: "Prosperity" }, { label: "B", text: "Destruction" }, { label: "C", text: "Rest" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Joel 1:15", explanation: "It brings judgment." },
  { id: "joel16", question: "What is cut off before the people's eyes?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Food and joy" }, { label: "C", text: "Faith" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Joel 1:16", explanation: "Joy disappears." },
  { id: "joel17", question: "What groans?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "The animals" }, { label: "C", text: "The people" }, { label: "D", text: "The kings" }], correctAnswer: "B", verse: "Joel 1:18", explanation: "Even animals suffer." },
  { id: "joel18", question: "Why do animals groan?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Lack of pasture" }, { label: "C", text: "War" }, { label: "D", text: "Cold" }], correctAnswer: "B", verse: "Joel 1:18", explanation: "Resources are gone." },
  { id: "joel19", question: "What has devoured the pastures?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Locusts" }, { label: "C", text: "Flood" }, { label: "D", text: "Sword" }], correctAnswer: "A", verse: "Joel 1:19", explanation: "Fire symbolizes devastation." },
  { id: "joel20", question: "Who does Joel cry out to?", options: [{ label: "A", text: "The elders" }, { label: "B", text: "The Lord" }, { label: "C", text: "The king" }, { label: "D", text: "The people" }], correctAnswer: "B", verse: "Joel 1:19", explanation: "Joel intercedes." },
  { id: "joel21", question: "What is sounded in chapter 2?", options: [{ label: "A", text: "Trumpet" }, { label: "B", text: "Drum" }, { label: "C", text: "Flute" }, { label: "D", text: "Bell" }], correctAnswer: "A", verse: "Joel 2:1", explanation: "Warning is sounded." },
  { id: "joel22", question: "Where is the trumpet blown?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Zion" }, { label: "C", text: "Samaria" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "Joel 2:1", explanation: "Zion is warned." },
  { id: "joel23", question: "What kind of day is the Day of the Lord?", options: [{ label: "A", text: "Bright" }, { label: "B", text: "Dark and dreadful" }, { label: "C", text: "Peaceful" }, { label: "D", text: "Joyful" }], correctAnswer: "B", verse: "Joel 2:2", explanation: "A terrifying day." },
  { id: "joel24", question: "What is described like an army?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Locusts" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Joel 2:4-5", explanation: "Locusts resemble an army." },
  { id: "joel25", question: "What cannot stop this army?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "Weapons" }, { label: "C", text: "Nothing" }, { label: "D", text: "Fire" }], correctAnswer: "C", verse: "Joel 2:7-9", explanation: "God's judgment is unstoppable." },
  { id: "joel26", question: "Who leads this army?", options: [{ label: "A", text: "A king" }, { label: "B", text: "The Lord" }, { label: "C", text: "An angel" }, { label: "D", text: "Locust king" }], correctAnswer: "B", verse: "Joel 2:11", explanation: "The Lord commands judgment." },
  { id: "joel27", question: "What is the Lord's army described as?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Powerful" }, { label: "C", text: "Small" }, { label: "D", text: "Disorganized" }], correctAnswer: "B", verse: "Joel 2:11", explanation: "God's army is mighty." },
  { id: "joel28", question: "Who can endure the Day of the Lord?", options: [{ label: "A", text: "Everyone" }, { label: "B", text: "No one" }, { label: "C", text: "The righteous only" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Joel 2:11", explanation: "The day is overwhelming." },
  { id: "joel29", question: "What is God's call in response?", options: [{ label: "A", text: "Run" }, { label: "B", text: "Return to Me" }, { label: "C", text: "Fight" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Joel 2:12", explanation: "Call to repentance." },
  { id: "joel30", question: "How should the people return?", options: [{ label: "A", text: "With offerings only" }, { label: "B", text: "With all their heart" }, { label: "C", text: "With fear only" }, { label: "D", text: "With silence" }], correctAnswer: "B", verse: "Joel 2:12", explanation: "Wholehearted repentance." },
  { id: "joel31", question: "What external act is insufficient alone?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Rending garments" }, { label: "C", text: "Fasting" }, { label: "D", text: "Crying" }], correctAnswer: "B", verse: "Joel 2:13", explanation: "God desires inner repentance." },
  { id: "joel32", question: "What should be torn instead?", options: [{ label: "A", text: "Clothes" }, { label: "B", text: "Hearts" }, { label: "C", text: "Offerings" }, { label: "D", text: "Altars" }], correctAnswer: "B", verse: "Joel 2:13", explanation: "True repentance is inward." },
  { id: "joel33", question: "How is God described?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Gracious and compassionate" }, { label: "C", text: "Distant" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Joel 2:13", explanation: "God's mercy is emphasized." },
  { id: "joel34", question: "What might God relent from?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Sending calamity" }, { label: "C", text: "Speaking" }, { label: "D", text: "Judging nations" }], correctAnswer: "B", verse: "Joel 2:13-14", explanation: "God may withhold judgment." },
  { id: "joel35", question: "What group must assemble?", options: [{ label: "A", text: "Warriors" }, { label: "B", text: "All people" }, { label: "C", text: "Elders only" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Joel 2:16", explanation: "Everyone is called." },
  { id: "joel36", question: "Who should even interrupt celebrations?", options: [{ label: "A", text: "Children" }, { label: "B", text: "Bride and groom" }, { label: "C", text: "Kings" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Joel 2:16", explanation: "Repentance takes priority." },
  { id: "joel37", question: "Where do priests weep?", options: [{ label: "A", text: "At the gate" }, { label: "B", text: "Between porch and altar" }, { label: "C", text: "In the fields" }, { label: "D", text: "In homes" }], correctAnswer: "B", verse: "Joel 2:17", explanation: "Intercession at the temple." },
  { id: "joel38", question: "What do priests ask God to spare?", options: [{ label: "A", text: "The city" }, { label: "B", text: "His people" }, { label: "C", text: "The land" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Joel 2:17", explanation: "They plead for mercy." },
  { id: "joel39", question: "What motivates God's response?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Jealous love for His land" }, { label: "C", text: "Anger" }, { label: "D", text: "Obligation" }], correctAnswer: "B", verse: "Joel 2:18", explanation: "God's covenant love." },
  { id: "joel40", question: "What does God promise to restore?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Grain, wine, and oil" }, { label: "C", text: "Weapons" }, { label: "D", text: "Cities" }], correctAnswer: "B", verse: "Joel 2:19", explanation: "Material restoration." },
  { id: "joel41", question: "Who will no longer mock Israel?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "The nations" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Joel 2:19", explanation: "Shame is removed." },
  { id: "joel42", question: "What is removed far from Israel?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Northern army" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Joel 2:20", explanation: "God drives away the threat." },
  { id: "joel43", question: "Why should the land rejoice?", options: [{ label: "A", text: "Judgment ended" }, { label: "B", text: "The Lord has done great things" }, { label: "C", text: "Enemies defeated" }, { label: "D", text: "Kings returned" }], correctAnswer: "B", verse: "Joel 2:21", explanation: "God's mighty acts." },
  { id: "joel44", question: "What will the pastures do?", options: [{ label: "A", text: "Burn" }, { label: "B", text: "Become green" }, { label: "C", text: "Dry up" }, { label: "D", text: "Disappear" }], correctAnswer: "B", verse: "Joel 2:22", explanation: "Restoration of land." },
  { id: "joel45", question: "What will trees bear?", options: [{ label: "A", text: "Leaves only" }, { label: "B", text: "Fruit" }, { label: "C", text: "Nothing" }, { label: "D", text: "Ashes" }], correctAnswer: "B", verse: "Joel 2:22", explanation: "Agricultural renewal." },
  { id: "joel46", question: "What rain is promised?", options: [{ label: "A", text: "Flooding rain" }, { label: "B", text: "Autumn and spring rain" }, { label: "C", text: "Storm rain" }, { label: "D", text: "No rain" }], correctAnswer: "B", verse: "Joel 2:23", explanation: "Blessing returns." },
  { id: "joel47", question: "What will the threshing floors be filled with?", options: [{ label: "A", text: "Dust" }, { label: "B", text: "Grain" }, { label: "C", text: "Ashes" }, { label: "D", text: "Stones" }], correctAnswer: "B", verse: "Joel 2:24", explanation: "Abundance restored." },
  { id: "joel48", question: "What will overflow?", options: [{ label: "A", text: "Rivers" }, { label: "B", text: "Winepresses" }, { label: "C", text: "Streets" }, { label: "D", text: "Houses" }], correctAnswer: "B", verse: "Joel 2:24", explanation: "Overflowing blessing." },
  { id: "joel49", question: "What will God repay?", options: [{ label: "A", text: "Years of sin" }, { label: "B", text: "Years the locusts ate" }, { label: "C", text: "Exile years" }, { label: "D", text: "Lost offerings" }], correctAnswer: "B", verse: "Joel 2:25", explanation: "Restoration of loss." },
  { id: "joel50", question: "What will God's people never again experience?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Shame" }, { label: "C", text: "Hunger" }, { label: "D", text: "Loss" }], correctAnswer: "B", verse: "Joel 2:26-27", explanation: "Shame removed." },
  { id: "joel51", question: "What will people know?", options: [{ label: "A", text: "Kings rule" }, { label: "B", text: "The Lord is in Israel" }, { label: "C", text: "Peace has come" }, { label: "D", text: "Judgment ended" }], correctAnswer: "B", verse: "Joel 2:27", explanation: "God's presence affirmed." },
  { id: "joel52", question: "What phrase introduces a major promise?", options: [{ label: "A", text: "In those days" }, { label: "B", text: "Afterward" }, { label: "C", text: "Immediately" }, { label: "D", text: "Soon" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Signals future outpouring." },
  { id: "joel53", question: "What will God pour out?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "His Spirit" }, { label: "C", text: "Judgment" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Promise of the Spirit." },
  { id: "joel54", question: "On whom will the Spirit be poured?", options: [{ label: "A", text: "Priests only" }, { label: "B", text: "All people" }, { label: "C", text: "Prophets only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Universal outpouring." },
  { id: "joel55", question: "What will sons and daughters do?", options: [{ label: "A", text: "Rule" }, { label: "B", text: "Prophesy" }, { label: "C", text: "Fight" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Spirit empowers prophecy." },
  { id: "joel56", question: "What will old men dream?", options: [{ label: "A", text: "Nightmares" }, { label: "B", text: "Dreams" }, { label: "C", text: "Visions" }, { label: "D", text: "Prophecies" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Age is no barrier." },
  { id: "joel57", question: "What will young men see?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Visions" }, { label: "C", text: "Kings" }, { label: "D", text: "Signs" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "God speaks broadly." },
  { id: "joel58", question: "Who else receives the Spirit?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Servants" }, { label: "C", text: "Priests" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Joel 2:29", explanation: "Social barriers removed." },
  { id: "joel59", question: "What signs will appear?", options: [{ label: "A", text: "Rainbows" }, { label: "B", text: "Wonders in heaven and earth" }, { label: "C", text: "Earthquakes only" }, { label: "D", text: "Peace signs" }], correctAnswer: "B", verse: "Joel 2:30", explanation: "Cosmic signs." },
  { id: "joel60", question: "What will happen to the sun?", options: [{ label: "A", text: "Shine brighter" }, { label: "B", text: "Turn to darkness" }, { label: "C", text: "Disappear" }, { label: "D", text: "Remain unchanged" }], correctAnswer: "B", verse: "Joel 2:31", explanation: "Sign of the Day of the Lord." },
  { id: "joel61", question: "What will happen to the moon?", options: [{ label: "A", text: "Turn blue" }, { label: "B", text: "Turn to blood" }, { label: "C", text: "Disappear" }, { label: "D", text: "Fall" }], correctAnswer: "B", verse: "Joel 2:31", explanation: "Cosmic disturbance." },
  { id: "joel62", question: "What comes before the great Day of the Lord?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Signs and wonders" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Joel 2:30-31", explanation: "Warning signs precede the day." },
  { id: "joel63", question: "Who will be saved?", options: [{ label: "A", text: "Only Israelites" }, { label: "B", text: "Everyone who calls on the Lord" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Joel 2:32", explanation: "Salvation is available." },
  { id: "joel64", question: "Where will there be deliverance?", options: [{ label: "A", text: "Samaria" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "Babylon" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Joel 2:32", explanation: "Zion symbolizes God's refuge." },
  { id: "joel65", question: "What happens in chapter 3?", options: [{ label: "A", text: "Restoration only" }, { label: "B", text: "Judgment of nations" }, { label: "C", text: "Exile" }, { label: "D", text: "Temple rebuilding" }], correctAnswer: "B", verse: "Joel 3", explanation: "Nations are judged." },
  { id: "joel66", question: "Where are nations gathered?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Valley of Jehoshaphat" }, { label: "C", text: "Babylon" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Joel 3:2", explanation: "Place of judgment." },
  { id: "joel67", question: "Why are nations judged?", options: [{ label: "A", text: "They were weak" }, { label: "B", text: "They scattered God's people" }, { label: "C", text: "They were ignorant" }, { label: "D", text: "They refused prophets" }], correctAnswer: "B", verse: "Joel 3:2", explanation: "They harmed God's people." },
  { id: "joel68", question: "What did nations do to Israel's land?", options: [{ label: "A", text: "Protected it" }, { label: "B", text: "Divided it" }, { label: "C", text: "Blessed it" }, { label: "D", text: "Ignored it" }], correctAnswer: "B", verse: "Joel 3:2", explanation: "They exploited the land." },
  { id: "joel69", question: "What did nations do with God's people?", options: [{ label: "A", text: "Freed them" }, { label: "B", text: "Sold them" }, { label: "C", text: "Fed them" }, { label: "D", text: "Protected them" }], correctAnswer: "B", verse: "Joel 3:3", explanation: "Human trafficking condemned." },
  { id: "joel70", question: "Which nations are specifically named?", options: [{ label: "A", text: "Assyria and Babylon" }, { label: "B", text: "Tyre, Sidon, Philistia" }, { label: "C", text: "Egypt and Assyria" }, { label: "D", text: "Moab and Edom" }], correctAnswer: "B", verse: "Joel 3:4", explanation: "Neighboring nations judged." },
  { id: "joel71", question: "How will God repay the nations?", options: [{ label: "A", text: "With mercy" }, { label: "B", text: "According to their deeds" }, { label: "C", text: "With silence" }, { label: "D", text: "With delay" }], correctAnswer: "B", verse: "Joel 3:4-7", explanation: "Justice is measured." },
  { id: "joel72", question: "What command is given to the nations?", options: [{ label: "A", text: "Lay down arms" }, { label: "B", text: "Prepare for war" }, { label: "C", text: "Flee" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Joel 3:9", explanation: "Judgment confrontation." },
  { id: "joel73", question: "What tools are turned into weapons?", options: [{ label: "A", text: "Plows and pruning hooks" }, { label: "B", text: "Swords and shields" }, { label: "C", text: "Spears and bows" }, { label: "D", text: "Stones" }], correctAnswer: "A", verse: "Joel 3:10", explanation: "Reversal imagery." },
  { id: "joel74", question: "What valley is described?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Decision" }, { label: "C", text: "Hope" }, { label: "D", text: "Rest" }], correctAnswer: "B", verse: "Joel 3:14", explanation: "Valley of decision." },
  { id: "joel75", question: "What fills the valley?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Multitudes" }, { label: "C", text: "Angels" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Joel 3:14", explanation: "Many face judgment." },
  { id: "joel76", question: "What happens to sun and moon again?", options: [{ label: "A", text: "They shine" }, { label: "B", text: "They grow dark" }, { label: "C", text: "They fall" }, { label: "D", text: "They disappear" }], correctAnswer: "B", verse: "Joel 3:15", explanation: "Cosmic signs repeat." },
  { id: "joel77", question: "From where does the Lord roar?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Zion" }, { label: "C", text: "The valley" }, { label: "D", text: "The sea" }], correctAnswer: "B", verse: "Joel 3:16", explanation: "God speaks from Zion." },
  { id: "joel78", question: "What does the Lord become for His people?", options: [{ label: "A", text: "Judge only" }, { label: "B", text: "Refuge" }, { label: "C", text: "Enemy" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Joel 3:16", explanation: "Protection for God's people." },
  { id: "joel79", question: "What will Israel know?", options: [{ label: "A", text: "The nations are strong" }, { label: "B", text: "The Lord dwells in Zion" }, { label: "C", text: "Peace is temporary" }, { label: "D", text: "Judgment ended" }], correctAnswer: "B", verse: "Joel 3:17", explanation: "God's presence confirmed." },
  { id: "joel80", question: "What will Jerusalem be?", options: [{ label: "A", text: "Destroyed" }, { label: "B", text: "Holy" }, { label: "C", text: "Abandoned" }, { label: "D", text: "Conquered" }], correctAnswer: "B", verse: "Joel 3:17", explanation: "Sanctified city." },
  { id: "joel81", question: "What will drip from the mountains?", options: [{ label: "A", text: "Water" }, { label: "B", text: "New wine" }, { label: "C", text: "Blood" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Joel 3:18", explanation: "Abundant blessing." },
  { id: "joel82", question: "What will flow from the hills?", options: [{ label: "A", text: "Milk" }, { label: "B", text: "Oil" }, { label: "C", text: "Water" }, { label: "D", text: "Wine" }], correctAnswer: "A", verse: "Joel 3:18", explanation: "Provision imagery." },
  { id: "joel83", question: "What will water the Valley of Acacias?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "A fountain from the Lord" }, { label: "C", text: "River Jordan" }, { label: "D", text: "Sea" }], correctAnswer: "B", verse: "Joel 3:18", explanation: "Life-giving flow." },
  { id: "joel84", question: "What will Egypt become?", options: [{ label: "A", text: "Blessed" }, { label: "B", text: "Desolate" }, { label: "C", text: "Restored" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "Joel 3:19", explanation: "Judgment on enemies." },
  { id: "joel85", question: "Why are Egypt and Edom judged?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Violence against Judah" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Ignorance" }], correctAnswer: "B", verse: "Joel 3:19", explanation: "Violence condemned." },
  { id: "joel86", question: "What will Judah be?", options: [{ label: "A", text: "Empty" }, { label: "B", text: "Inhabited forever" }, { label: "C", text: "Forgotten" }, { label: "D", text: "Conquered" }], correctAnswer: "B", verse: "Joel 3:20", explanation: "Permanent restoration." },
  { id: "joel87", question: "What about Jerusalem?", options: [{ label: "A", text: "Temporary peace" }, { label: "B", text: "Enduring generation to generation" }, { label: "C", text: "Destruction" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Joel 3:20", explanation: "Lasting presence." },
  { id: "joel88", question: "What does God promise to avenge?", options: [{ label: "A", text: "Lost land" }, { label: "B", text: "Bloodshed" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Joel 3:21", explanation: "Justice for violence." },
  { id: "joel89", question: "Where does the Lord dwell?", options: [{ label: "A", text: "Heaven only" }, { label: "B", text: "Zion" }, { label: "C", text: "Every nation" }, { label: "D", text: "The sea" }], correctAnswer: "B", verse: "Joel 3:21", explanation: "God dwells with His people." },
  { id: "joel90", question: "What major themes define Joel?", options: [{ label: "A", text: "Law and wisdom" }, { label: "B", text: "Judgment and restoration" }, { label: "C", text: "Kingship only" }, { label: "D", text: "Exile only" }], correctAnswer: "B", verse: "Joel", explanation: "Judgment leads to renewal." },
  { id: "joel91", question: "What natural disaster opens Joel?", options: [{ label: "A", text: "Flood" }, { label: "B", text: "Locust plague" }, { label: "C", text: "Drought" }, { label: "D", text: "Earthquake" }], correctAnswer: "B", verse: "Joel 1", explanation: "Locust devastation." },
  { id: "joel92", question: "What does the locust plague foreshadow?", options: [{ label: "A", text: "Harvest" }, { label: "B", text: "Day of the Lord" }, { label: "C", text: "Peace" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Joel", explanation: "Foreshadowing judgment." },
  { id: "joel93", question: "What is central to avoiding judgment?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Repentance" }, { label: "C", text: "Offerings" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Joel 2", explanation: "Repentance is key." },
  { id: "joel94", question: "What hope is offered after repentance?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Restoration and Spirit" }, { label: "C", text: "Political power" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Joel 2", explanation: "Restoration follows repentance." },
  { id: "joel95", question: "What New Testament event quotes Joel 2?", options: [{ label: "A", text: "Crucifixion" }, { label: "B", text: "Pentecost" }, { label: "C", text: "Resurrection" }, { label: "D", text: "Ascension" }], correctAnswer: "B", verse: "Acts 2", explanation: "Peter quotes Joel at Pentecost." },
  { id: "joel96", question: "What does Joel teach about God?", options: [{ label: "A", text: "He is distant" }, { label: "B", text: "He is merciful and just" }, { label: "C", text: "He is silent" }, { label: "D", text: "He changes" }], correctAnswer: "B", verse: "Joel", explanation: "God balances justice and mercy." },
  { id: "joel97", question: "What does Joel emphasize about the Spirit?", options: [{ label: "A", text: "Limited to prophets" }, { label: "B", text: "Given to all" }, { label: "C", text: "Temporary" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Joel 2:28", explanation: "Universal outpouring." },
  { id: "joel98", question: "What final image closes Joel?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "God dwelling in Zion" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Joel 3:21", explanation: "God with His people." },
  { id: "joel99", question: "What response does Joel demand?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Return to the Lord" }, { label: "C", text: "War" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Joel", explanation: "Return is central." },
  { id: "joel100", question: "What truth anchors the book of Joel?", options: [{ label: "A", text: "Judgment ends hope" }, { label: "B", text: "God restores those who repent" }, { label: "C", text: "Nations rule forever" }, { label: "D", text: "Disaster is final" }], correctAnswer: "B", verse: "Joel", explanation: "Repentance leads to restoration." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JoelTriviaPage() {
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
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "joel");

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
          book: "joel",
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
            book: "joel",
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
    if (score === 10) return "Perfect! You're a Joel expert!";
    if (score >= 8) return "Excellent! You know Joel well!";
    if (score >= 6) return "Good job! Keep studying Joel!";
    if (score >= 4) return "Nice try! Joel has much to explore!";
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
              href="/bible-trivia/joel"
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






