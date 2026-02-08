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
  { id: "micah1", question: "Who is the author of the book of Micah?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Micah" }, { label: "C", text: "Amos" }, { label: "D", text: "Nahum" }], correctAnswer: "B", verse: "Micah 1:1", explanation: "The book is attributed to the prophet Micah." },
  { id: "micah2", question: "From where did Micah come?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Moresheth" }, { label: "C", text: "Samaria" }, { label: "D", text: "Tekoa" }], correctAnswer: "B", verse: "Micah 1:1", explanation: "Micah was from Moresheth." },
  { id: "micah3", question: "During whose reigns did Micah prophesy?", options: [{ label: "A", text: "David and Solomon" }, { label: "B", text: "Jotham, Ahaz, and Hezekiah" }, { label: "C", text: "Jeroboam II only" }, { label: "D", text: "Josiah only" }], correctAnswer: "B", verse: "Micah 1:1", explanation: "Micah prophesied during three kings' reigns." },
  { id: "micah4", question: "Which kingdoms does Micah address?", options: [{ label: "A", text: "Judah only" }, { label: "B", text: "Israel and Judah" }, { label: "C", text: "Assyria only" }, { label: "D", text: "Babylon only" }], correctAnswer: "B", verse: "Micah 1:1", explanation: "Micah speaks to both kingdoms." },
  { id: "micah5", question: "What is the main accusation in Micah 1?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Rebellion against the Lord" }, { label: "C", text: "Military weakness" }, { label: "D", text: "False alliances" }], correctAnswer: "B", verse: "Micah 1:5", explanation: "Israel's rebellion is central." },
  { id: "micah6", question: "Which cities symbolize Israel's sin?", options: [{ label: "A", text: "Jerusalem and Samaria" }, { label: "B", text: "Bethel and Gilgal" }, { label: "C", text: "Nineveh and Babylon" }, { label: "D", text: "Tekoa and Moresheth" }], correctAnswer: "A", verse: "Micah 1:5", explanation: "Samaria and Jerusalem represent corruption." },
  { id: "micah7", question: "How is the Lord described as coming?", options: [{ label: "A", text: "Quietly" }, { label: "B", text: "In judgment" }, { label: "C", text: "As a shepherd" }, { label: "D", text: "As a king" }], correctAnswer: "B", verse: "Micah 1:3-4", explanation: "The Lord comes in judgment." },
  { id: "micah8", question: "What happens to the mountains?", options: [{ label: "A", text: "They flourish" }, { label: "B", text: "They melt" }, { label: "C", text: "They rise" }, { label: "D", text: "They freeze" }], correctAnswer: "B", verse: "Micah 1:4", explanation: "Creation responds to God's presence." },
  { id: "micah9", question: "What happens to valleys?", options: [{ label: "A", text: "They fill with water" }, { label: "B", text: "They split apart" }, { label: "C", text: "They bloom" }, { label: "D", text: "They are ignored" }], correctAnswer: "B", verse: "Micah 1:4", explanation: "Judgment imagery." },
  { id: "micah10", question: "Why does Micah mourn?", options: [{ label: "A", text: "Personal loss" }, { label: "B", text: "Israel's incurable wound" }, { label: "C", text: "War" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Micah 1:8-9", explanation: "Sin has deep consequences." },
  { id: "micah11", question: "Which city's wound reaches Judah?", options: [{ label: "A", text: "Nineveh" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Lachish" }], correctAnswer: "C", verse: "Micah 1:9", explanation: "Samaria's sin spreads." },
  { id: "micah12", question: "Which city is called the beginning of sin?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Lachish" }, { label: "C", text: "Moresheth" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Micah 1:13", explanation: "Lachish led Judah into sin." },
  { id: "micah13", question: "What does Micah warn cities to do?", options: [{ label: "A", text: "Prepare for battle" }, { label: "B", text: "Prepare for exile" }, { label: "C", text: "Celebrate" }, { label: "D", text: "Ignore warnings" }], correctAnswer: "B", verse: "Micah 1:10-16", explanation: "Exile is coming." },
  { id: "micah14", question: "What is condemned in Micah 2?", options: [{ label: "A", text: "False worship" }, { label: "B", text: "Oppressing the poor" }, { label: "C", text: "Military failure" }, { label: "D", text: "Foreign alliances" }], correctAnswer: "B", verse: "Micah 2:1-2", explanation: "Social injustice is condemned." },
  { id: "micah15", question: "When do the wicked plan evil?", options: [{ label: "A", text: "At night" }, { label: "B", text: "On their beds" }, { label: "C", text: "In secret temples" }, { label: "D", text: "At the gates" }], correctAnswer: "B", verse: "Micah 2:1", explanation: "Premeditated injustice." },
  { id: "micah16", question: "What do they covet?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Fields and houses" }, { label: "C", text: "Peace" }, { label: "D", text: "Children" }], correctAnswer: "B", verse: "Micah 2:2", explanation: "Greed drives oppression." },
  { id: "micah17", question: "Who suffers from this injustice?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Families" }, { label: "C", text: "Priests" }, { label: "D", text: "Foreigners" }], correctAnswer: "B", verse: "Micah 2:2", explanation: "Families are displaced." },
  { id: "micah18", question: "What does God plan in response?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Disaster" }, { label: "C", text: "Silence" }, { label: "D", text: "Delay" }], correctAnswer: "B", verse: "Micah 2:3", explanation: "Judgment fits the crime." },
  { id: "micah19", question: "What will people no longer do proudly?", options: [{ label: "A", text: "Walk" }, { label: "B", text: "Boast" }, { label: "C", text: "Trade" }, { label: "D", text: "Pray" }], correctAnswer: "B", verse: "Micah 2:3", explanation: "Pride is humbled." },
  { id: "micah20", question: "What will be taken away?", options: [{ label: "A", text: "Wives" }, { label: "B", text: "Land" }, { label: "C", text: "Children" }, { label: "D", text: "Temples" }], correctAnswer: "B", verse: "Micah 2:4", explanation: "Land injustice is reversed." },
  { id: "micah21", question: "What do false prophets say?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Do not prophesy" }, { label: "C", text: "Judgment is near" }, { label: "D", text: "Fear the Lord" }], correctAnswer: "B", verse: "Micah 2:6", explanation: "They reject true warnings." },
  { id: "micah22", question: "What do people want to hear?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Pleasant lies" }, { label: "C", text: "Silence" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Micah 2:11", explanation: "False comfort." },
  { id: "micah23", question: "What hope appears in Micah 2?", options: [{ label: "A", text: "A remnant" }, { label: "B", text: "A new king" }, { label: "C", text: "A new temple" }, { label: "D", text: "Foreign alliance" }], correctAnswer: "A", verse: "Micah 2:12", explanation: "God preserves a remnant." },
  { id: "micah24", question: "How is the remnant described?", options: [{ label: "A", text: "Like warriors" }, { label: "B", text: "Like sheep" }, { label: "C", text: "Like fire" }, { label: "D", text: "Like stone" }], correctAnswer: "B", verse: "Micah 2:12", explanation: "God gathers His people." },
  { id: "micah25", question: "Who leads the remnant?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "Micah 2:13", explanation: "The Lord goes before them." },
  { id: "micah26", question: "Who is condemned in Micah 3?", options: [{ label: "A", text: "Farmers" }, { label: "B", text: "Leaders and rulers" }, { label: "C", text: "Foreigners" }, { label: "D", text: "Children" }], correctAnswer: "B", verse: "Micah 3:1", explanation: "Leadership corruption." },
  { id: "micah27", question: "What should leaders know?", options: [{ label: "A", text: "War" }, { label: "B", text: "Justice" }, { label: "C", text: "Trade" }, { label: "D", text: "Farming" }], correctAnswer: "B", verse: "Micah 3:1", explanation: "Justice is their duty." },
  { id: "micah28", question: "How are corrupt leaders described?", options: [{ label: "A", text: "Shepherds" }, { label: "B", text: "Cannibals" }, { label: "C", text: "Builders" }, { label: "D", text: "Teachers" }], correctAnswer: "B", verse: "Micah 3:2-3", explanation: "Graphic imagery of exploitation." },
  { id: "micah29", question: "What will God do to these leaders?", options: [{ label: "A", text: "Bless them" }, { label: "B", text: "Hide His face" }, { label: "C", text: "Reward them" }, { label: "D", text: "Promote them" }], correctAnswer: "B", verse: "Micah 3:4", explanation: "No answer in time of judgment." },
  { id: "micah30", question: "What do false prophets do for money?", options: [{ label: "A", text: "Speak peace" }, { label: "B", text: "Declare war" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Repent" }], correctAnswer: "A", verse: "Micah 3:5", explanation: "They sell prophecy." },
  { id: "micah31", question: "What happens to prophets without food?", options: [{ label: "A", text: "They repent" }, { label: "B", text: "They declare war" }, { label: "C", text: "They pray" }, { label: "D", text: "They flee" }], correctAnswer: "B", verse: "Micah 3:5", explanation: "They manipulate messages." },
  { id: "micah32", question: "What judgment comes upon prophets?", options: [{ label: "A", text: "Honor" }, { label: "B", text: "Darkness and shame" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Micah 3:6-7", explanation: "False vision exposed." },
  { id: "micah33", question: "How does Micah describe himself?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Filled with the Spirit" }, { label: "C", text: "Untrained" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Micah 3:8", explanation: "Empowered by God." },
  { id: "micah34", question: "What is Micah empowered to declare?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Sin and rebellion" }, { label: "C", text: "Peace" }, { label: "D", text: "Prosperity" }], correctAnswer: "B", verse: "Micah 3:8", explanation: "Truthful confrontation." },
  { id: "micah35", question: "What will happen to Zion?", options: [{ label: "A", text: "Exalted forever" }, { label: "B", text: "Plowed like a field" }, { label: "C", text: "Ignored" }, { label: "D", text: "Blessed" }], correctAnswer: "B", verse: "Micah 3:12", explanation: "Jerusalem judged." },
  { id: "micah36", question: "What will Jerusalem become?", options: [{ label: "A", text: "A palace" }, { label: "B", text: "A heap of ruins" }, { label: "C", text: "A fortress" }, { label: "D", text: "A refuge" }], correctAnswer: "B", verse: "Micah 3:12", explanation: "Complete devastation." },
  { id: "micah37", question: "What future hope appears in Micah 4?", options: [{ label: "A", text: "War" }, { label: "B", text: "Restoration of Zion" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Micah 4:1", explanation: "Hope beyond judgment." },
  { id: "micah38", question: "What will be established in the last days?", options: [{ label: "A", text: "Kingdoms" }, { label: "B", text: "The mountain of the Lord" }, { label: "C", text: "Empires" }, { label: "D", text: "Armies" }], correctAnswer: "B", verse: "Micah 4:1", explanation: "God's rule exalted." },
  { id: "micah39", question: "Who will stream to it?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "Many nations" }, { label: "C", text: "Priests only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Micah 4:2", explanation: "Universal worship." },
  { id: "micah40", question: "What will people say?", options: [{ label: "A", text: "Let us fight" }, { label: "B", text: "Let us go up to the Lord" }, { label: "C", text: "Let us flee" }, { label: "D", text: "Let us trade" }], correctAnswer: "B", verse: "Micah 4:2", explanation: "Desire to learn God's ways." },
  { id: "micah41", question: "What will God teach them?", options: [{ label: "A", text: "War" }, { label: "B", text: "His ways" }, { label: "C", text: "Trade" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Micah 4:2", explanation: "Instruction from the Lord." },
  { id: "micah42", question: "What will swords be turned into?", options: [{ label: "A", text: "Shields" }, { label: "B", text: "Plowshares" }, { label: "C", text: "Crowns" }, { label: "D", text: "Altars" }], correctAnswer: "B", verse: "Micah 4:3", explanation: "Peace replaces war." },
  { id: "micah43", question: "What will spears become?", options: [{ label: "A", text: "Knives" }, { label: "B", text: "Pruning hooks" }, { label: "C", text: "Chains" }, { label: "D", text: "Stones" }], correctAnswer: "B", verse: "Micah 4:3", explanation: "Tools of cultivation." },
  { id: "micah44", question: "What will nations no longer do?", options: [{ label: "A", text: "Trade" }, { label: "B", text: "Learn war" }, { label: "C", text: "Pray" }, { label: "D", text: "Gather" }], correctAnswer: "B", verse: "Micah 4:3", explanation: "End of warfare." },
  { id: "micah45", question: "What imagery describes peace?", options: [{ label: "A", text: "Under fig trees" }, { label: "B", text: "Behind walls" }, { label: "C", text: "On thrones" }, { label: "D", text: "In caves" }], correctAnswer: "A", verse: "Micah 4:4", explanation: "Security and rest." },
  { id: "micah46", question: "Who makes this promise?", options: [{ label: "A", text: "Micah" }, { label: "B", text: "The Lord Almighty" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Micah 4:4", explanation: "God's authority." },
  { id: "micah47", question: "What will God gather?", options: [{ label: "A", text: "The strong only" }, { label: "B", text: "The lame and exiled" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Micah 4:6", explanation: "Compassionate restoration." },
  { id: "micah48", question: "What will the Lord do with the remnant?", options: [{ label: "A", text: "Destroy them" }, { label: "B", text: "Make them a strong nation" }, { label: "C", text: "Scatter them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Micah 4:7", explanation: "God strengthens the remnant." },
  { id: "micah49", question: "Who will rule over them?", options: [{ label: "A", text: "David" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Micah 4:7", explanation: "God reigns." },
  { id: "micah50", question: "What does Micah 4 compare Zion's pain to?", options: [{ label: "A", text: "War" }, { label: "B", text: "Labor pains" }, { label: "C", text: "Famine" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Micah 4:9-10", explanation: "Pain precedes restoration." },
  { id: "micah51", question: "Where will Judah go before rescue?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Micah 4:10", explanation: "Exile comes first." },
  { id: "micah52", question: "What will happen after exile?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Redemption" }, { label: "C", text: "Destruction" }, { label: "D", text: "Forgetfulness" }], correctAnswer: "B", verse: "Micah 4:10", explanation: "God will redeem." },
  { id: "micah53", question: "Who gathers against Zion?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Many nations" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings of Judah" }], correctAnswer: "B", verse: "Micah 4:11", explanation: "Opposition rises." },
  { id: "micah54", question: "What do these nations not understand?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "The Lord's plan" }, { label: "C", text: "War" }, { label: "D", text: "Trade" }], correctAnswer: "B", verse: "Micah 4:12", explanation: "God's purposes are hidden." },
  { id: "micah55", question: "What imagery is used for nations?", options: [{ label: "A", text: "Sheep" }, { label: "B", text: "Sheaves for threshing" }, { label: "C", text: "Stones" }, { label: "D", text: "Waves" }], correctAnswer: "B", verse: "Micah 4:12-13", explanation: "Judgment imagery." },
  { id: "micah56", question: "What will Zion do to them?", options: [{ label: "A", text: "Flee" }, { label: "B", text: "Thresh them" }, { label: "C", text: "Serve them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Micah 4:13", explanation: "Victory through God." },
  { id: "micah57", question: "Who gives Zion strength?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Armies" }], correctAnswer: "B", verse: "Micah 4:13", explanation: "God empowers His people." },
  { id: "micah58", question: "What will be devoted to the Lord?", options: [{ label: "A", text: "Weapons" }, { label: "B", text: "Spoils" }, { label: "C", text: "Cities" }, { label: "D", text: "Land" }], correctAnswer: "B", verse: "Micah 4:13", explanation: "God receives the glory." },
  { id: "micah59", question: "What happens to Israel's ruler in Micah 5?", options: [{ label: "A", text: "Crowned" }, { label: "B", text: "Struck on the cheek" }, { label: "C", text: "Exalted" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Micah 5:1", explanation: "Humiliation precedes hope." },
  { id: "micah60", question: "From where will a ruler come?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethlehem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Micah 5:2", explanation: "Messianic prophecy." },
  { id: "micah61", question: "How is Bethlehem described?", options: [{ label: "A", text: "Great city" }, { label: "B", text: "Small among clans" }, { label: "C", text: "Capital" }, { label: "D", text: "Fortress" }], correctAnswer: "B", verse: "Micah 5:2", explanation: "Small but significant." },
  { id: "micah62", question: "What is said about the ruler's origins?", options: [{ label: "A", text: "Recent" }, { label: "B", text: "From ancient times" }, { label: "C", text: "Unknown" }, { label: "D", text: "Human only" }], correctAnswer: "B", verse: "Micah 5:2", explanation: "Eternal significance." },
  { id: "micah63", question: "What will this ruler do?", options: [{ label: "A", text: "Rule harshly" }, { label: "B", text: "Shepherd his flock" }, { label: "C", text: "Build temples" }, { label: "D", text: "Collect taxes" }], correctAnswer: "B", verse: "Micah 5:4", explanation: "A shepherd-king." },
  { id: "micah64", question: "In whose strength will he stand?", options: [{ label: "A", text: "His own" }, { label: "B", text: "The Lord's" }, { label: "C", text: "Armies" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Micah 5:4", explanation: "Divine authority." },
  { id: "micah65", question: "What will his greatness reach?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "Ends of the earth" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Judah" }], correctAnswer: "B", verse: "Micah 5:4", explanation: "Global reign." },
  { id: "micah66", question: "What will he be?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Peace" }, { label: "C", text: "Warrior" }, { label: "D", text: "Priest" }], correctAnswer: "B", verse: "Micah 5:5", explanation: "He is peace." },
  { id: "micah67", question: "What enemy is mentioned?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Assyria" }, { label: "C", text: "Egypt" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Micah 5:5", explanation: "Assyrian threat." },
  { id: "micah68", question: "How is the remnant described among nations?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Like dew from the Lord" }, { label: "C", text: "Hidden" }, { label: "D", text: "Scattered" }], correctAnswer: "B", verse: "Micah 5:7", explanation: "Blessing to others." },
  { id: "micah69", question: "What else is the remnant compared to?", options: [{ label: "A", text: "Lambs" }, { label: "B", text: "Lion among beasts" }, { label: "C", text: "Waves" }, { label: "D", text: "Stones" }], correctAnswer: "B", verse: "Micah 5:8", explanation: "Strength and authority." },
  { id: "micah70", question: "What will God cut off?", options: [{ label: "A", text: "Fields" }, { label: "B", text: "Horses and chariots" }, { label: "C", text: "People" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Micah 5:10", explanation: "End of military reliance." },
  { id: "micah71", question: "What else will God destroy?", options: [{ label: "A", text: "Altars" }, { label: "B", text: "Cities" }, { label: "C", text: "False worship" }, { label: "D", text: "Harvests" }], correctAnswer: "C", verse: "Micah 5:12-14", explanation: "Purification." },
  { id: "micah72", question: "What does God promise to do to nations?", options: [{ label: "A", text: "Ignore" }, { label: "B", text: "Take vengeance" }, { label: "C", text: "Bless" }, { label: "D", text: "Adopt" }], correctAnswer: "B", verse: "Micah 5:15", explanation: "Justice executed." },
  { id: "micah73", question: "What courtroom scene begins Micah 6?", options: [{ label: "A", text: "Trial of Israel" }, { label: "B", text: "The Lord's lawsuit" }, { label: "C", text: "Kings' judgment" }, { label: "D", text: "Prophets' debate" }], correctAnswer: "B", verse: "Micah 6:1-2", explanation: "Covenant lawsuit." },
  { id: "micah74", question: "Who are witnesses?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Mountains" }, { label: "C", text: "Kings" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Micah 6:2", explanation: "Creation bears witness." },
  { id: "micah75", question: "What does God ask His people?", options: [{ label: "A", text: "What have I done to you?" }, { label: "B", text: "Why did you flee?" }, { label: "C", text: "Will you obey?" }, { label: "D", text: "Who will save you?" }], correctAnswer: "A", verse: "Micah 6:3", explanation: "God appeals to His faithfulness." },
  { id: "micah76", question: "What past deliverance is recalled?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Exodus from Egypt" }, { label: "C", text: "Return from Babylon" }, { label: "D", text: "Assyrian defeat" }], correctAnswer: "B", verse: "Micah 6:4", explanation: "God's saving acts remembered." },
  { id: "micah77", question: "Which leaders are mentioned?", options: [{ label: "A", text: "David and Solomon" }, { label: "B", text: "Moses, Aaron, Miriam" }, { label: "C", text: "Isaiah and Jeremiah" }, { label: "D", text: "Samuel and Saul" }], correctAnswer: "B", verse: "Micah 6:4", explanation: "God's appointed leaders." },
  { id: "micah78", question: "What question about offerings is asked?", options: [{ label: "A", text: "How many?" }, { label: "B", text: "What pleases the Lord?" }, { label: "C", text: "Who offers?" }, { label: "D", text: "Where to offer?" }], correctAnswer: "B", verse: "Micah 6:6", explanation: "True worship questioned." },
  { id: "micah79", question: "Are extravagant sacrifices sufficient?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Only for kings" }], correctAnswer: "B", verse: "Micah 6:7", explanation: "God desires more." },
  { id: "micah80", question: "What does the Lord require?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Act justly, love mercy, walk humbly" }, { label: "C", text: "Fasting" }, { label: "D", text: "Pilgrimage" }], correctAnswer: "B", verse: "Micah 6:8", explanation: "Core ethical command." },
  { id: "micah81", question: "What sins are condemned in Micah 6?", options: [{ label: "A", text: "False weights" }, { label: "B", text: "Violence and deceit" }, { label: "C", text: "Idolatry" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Micah 6:10-12", explanation: "Comprehensive corruption." },
  { id: "micah82", question: "What punishment is described?", options: [{ label: "A", text: "Prosperity" }, { label: "B", text: "Hunger without satisfaction" }, { label: "C", text: "Peace" }, { label: "D", text: "Rest" }], correctAnswer: "B", verse: "Micah 6:14", explanation: "Consequences fit the sin." },
  { id: "micah83", question: "What will planting not produce?", options: [{ label: "A", text: "Fruit" }, { label: "B", text: "Harvest" }, { label: "C", text: "Oil and wine" }, { label: "D", text: "Seed" }], correctAnswer: "C", verse: "Micah 6:15", explanation: "Futility of injustice." },
  { id: "micah84", question: "Whose practices are followed?", options: [{ label: "A", text: "David" }, { label: "B", text: "Omri and Ahab" }, { label: "C", text: "Moses" }, { label: "D", text: "Samuel" }], correctAnswer: "B", verse: "Micah 6:16", explanation: "Wicked kings' legacy." },
  { id: "micah85", question: "What does Micah lament in chapter 7?", options: [{ label: "A", text: "No harvest" }, { label: "B", text: "Lack of godly people" }, { label: "C", text: "War" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Micah 7:1-2", explanation: "Moral decay." },
  { id: "micah86", question: "Who cannot be trusted?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Friends and family" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Micah 7:5-6", explanation: "Total breakdown of trust." },
  { id: "micah87", question: "Where does Micah place his hope?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Allies" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Micah 7:7", explanation: "Hope in God alone." },
  { id: "micah88", question: "What does Micah say when he falls?", options: [{ label: "A", text: "I am finished" }, { label: "B", text: "I will rise" }, { label: "C", text: "I am cursed" }, { label: "D", text: "I will flee" }], correctAnswer: "B", verse: "Micah 7:8", explanation: "Confidence in restoration." },
  { id: "micah89", question: "Who will be Micah's light?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Micah 7:8", explanation: "God is his light." },
  { id: "micah90", question: "What will happen to Micah's enemy?", options: [{ label: "A", text: "They rule" }, { label: "B", text: "They are shamed" }, { label: "C", text: "They escape" }, { label: "D", text: "They repent" }], correctAnswer: "B", verse: "Micah 7:10", explanation: "Justice prevails." },
  { id: "micah91", question: "What future is promised for Israel?", options: [{ label: "A", text: "Permanent exile" }, { label: "B", text: "Rebuilding and restoration" }, { label: "C", text: "Silence" }, { label: "D", text: "Foreign rule" }], correctAnswer: "B", verse: "Micah 7:11-12", explanation: "Hopeful future." },
  { id: "micah92", question: "How will nations respond?", options: [{ label: "A", text: "Mock" }, { label: "B", text: "Fear the Lord" }, { label: "C", text: "Attack" }, { label: "D", text: "Ignore" }], correctAnswer: "B", verse: "Micah 7:16-17", explanation: "God's power recognized." },
  { id: "micah93", question: "What does God do with iniquity?", options: [{ label: "A", text: "Remembers forever" }, { label: "B", text: "Forgives" }, { label: "C", text: "Ignores" }, { label: "D", text: "Rewards" }], correctAnswer: "B", verse: "Micah 7:18", explanation: "God delights in mercy." },
  { id: "micah94", question: "How is God described?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Compassionate" }, { label: "C", text: "Distant" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Micah 7:18", explanation: "God's mercy emphasized." },
  { id: "micah95", question: "What does God do with sins?", options: [{ label: "A", text: "Counts them" }, { label: "B", text: "Casts them into the sea" }, { label: "C", text: "Displays them" }, { label: "D", text: "Rewards them" }], correctAnswer: "B", verse: "Micah 7:19", explanation: "Complete forgiveness." },
  { id: "micah96", question: "What covenant is remembered?", options: [{ label: "A", text: "Sinai" }, { label: "B", text: "Abrahamic" }, { label: "C", text: "Davidic" }, { label: "D", text: "New" }], correctAnswer: "B", verse: "Micah 7:20", explanation: "Promise to Abraham." },
  { id: "micah97", question: "To whom were promises sworn?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Abraham" }, { label: "C", text: "David" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Micah 7:20", explanation: "Faithful covenant." },
  { id: "micah98", question: "What is the dominant theme of Micah?", options: [{ label: "A", text: "War" }, { label: "B", text: "Justice and mercy" }, { label: "C", text: "Kingship" }, { label: "D", text: "Exile only" }], correctAnswer: "B", verse: "Micah", explanation: "Justice balanced with mercy." },
  { id: "micah99", question: "What balance does Micah emphasize?", options: [{ label: "A", text: "Power and wealth" }, { label: "B", text: "Judgment and hope" }, { label: "C", text: "Law and ritual" }, { label: "D", text: "Fear and silence" }], correctAnswer: "B", verse: "Micah", explanation: "Judgment leads to restoration." },
  { id: "micah100", question: "How does Micah ultimately portray God?", options: [{ label: "A", text: "Only judge" }, { label: "B", text: "Just and merciful" }, { label: "C", text: "Distant ruler" }, { label: "D", text: "Silent observer" }], correctAnswer: "B", verse: "Micah 7:18-20", explanation: "God judges yet restores." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MicahTriviaPage() {
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
          .eq("book", "micah");

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
          book: "micah",
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
            book: "micah",
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
    if (score === 10) return "Perfect! You're a Micah expert!";
    if (score >= 8) return "Excellent! You know Micah well!";
    if (score >= 6) return "Good job! Keep studying Micah!";
    if (score >= 4) return "Nice try! Micah has much to explore!";
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
              href="/bible-trivia/micah"
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
