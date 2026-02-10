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
  { id: "amos1", question: "Who is the author of the book of Amos?", options: [{ label: "A", text: "Hosea" }, { label: "B", text: "Amos" }, { label: "C", text: "Joel" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "The book is attributed to the prophet Amos." },
  { id: "amos2", question: "What was Amos's occupation?", options: [{ label: "A", text: "Priest" }, { label: "B", text: "Shepherd" }, { label: "C", text: "King" }, { label: "D", text: "Scribe" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "Amos was a shepherd." },
  { id: "amos3", question: "What else did Amos tend?", options: [{ label: "A", text: "Vineyards" }, { label: "B", text: "Sycamore figs" }, { label: "C", text: "Olive trees" }, { label: "D", text: "Wheat fields" }], correctAnswer: "B", verse: "Amos 7:14", explanation: "Amos was also a tender of sycamore figs." },
  { id: "amos4", question: "From where did Amos come?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Tekoa" }, { label: "C", text: "Samaria" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "Amos was from Tekoa." },
  { id: "amos5", question: "To which kingdom did Amos primarily prophesy?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Israel" }, { label: "C", text: "Assyria" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "Amos addressed the northern kingdom of Israel." },
  { id: "amos6", question: "During whose reign did Amos prophesy?", options: [{ label: "A", text: "David" }, { label: "B", text: "Jeroboam II" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Josiah" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "Amos prophesied during Jeroboam II's reign." },
  { id: "amos7", question: "What natural event is mentioned as a time marker?", options: [{ label: "A", text: "Flood" }, { label: "B", text: "Earthquake" }, { label: "C", text: "Drought" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Amos 1:1", explanation: "An earthquake is referenced." },
  { id: "amos8", question: "What does the Lord roar from?", options: [{ label: "A", text: "Bethel" }, { label: "B", text: "Zion" }, { label: "C", text: "Samaria" }, { label: "D", text: "Tekoa" }], correctAnswer: "B", verse: "Amos 1:2", explanation: "The Lord roars from Zion." },
  { id: "amos9", question: "What happens to the pastures?", options: [{ label: "A", text: "They flourish" }, { label: "B", text: "They mourn" }, { label: "C", text: "They flood" }, { label: "D", text: "They freeze" }], correctAnswer: "B", verse: "Amos 1:2", explanation: "The land mourns under judgment." },
  { id: "amos10", question: "What city's top withers?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Carmel" }, { label: "C", text: "Samaria" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "Amos 1:2", explanation: "Mount Carmel withers." },
  { id: "amos11", question: "How many transgressions are cited before judgment?", options: [{ label: "A", text: "Two" }, { label: "B", text: "Three, even four" }, { label: "C", text: "Seven" }, { label: "D", text: "Ten" }], correctAnswer: "B", verse: "Amos 1:3", explanation: "A repeated formula of judgment." },
  { id: "amos12", question: "Which nation is judged first?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "Damascus" }, { label: "C", text: "Judah" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Amos 1:3", explanation: "Damascus is addressed first." },
  { id: "amos13", question: "What sin is Damascus guilty of?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Cruel warfare" }, { label: "C", text: "Pride" }, { label: "D", text: "False worship" }], correctAnswer: "B", verse: "Amos 1:3", explanation: "They used brutal methods." },
  { id: "amos14", question: "Which nation sold people into slavery?", options: [{ label: "A", text: "Tyre" }, { label: "B", text: "Judah" }, { label: "C", text: "Israel" }, { label: "D", text: "Assyria" }], correctAnswer: "A", verse: "Amos 1:9", explanation: "Tyre trafficked people." },
  { id: "amos15", question: "What nation is judged for relentless anger?", options: [{ label: "A", text: "Edom" }, { label: "B", text: "Moab" }, { label: "C", text: "Philistia" }, { label: "D", text: "Judah" }], correctAnswer: "A", verse: "Amos 1:11", explanation: "Edom pursued violence." },
  { id: "amos16", question: "Which nation ripped open pregnant women?", options: [{ label: "A", text: "Ammon" }, { label: "B", text: "Moab" }, { label: "C", text: "Edom" }, { label: "D", text: "Judah" }], correctAnswer: "A", verse: "Amos 1:13", explanation: "Ammon committed atrocities." },
  { id: "amos17", question: "Which nation burned bones of a king?", options: [{ label: "A", text: "Edom" }, { label: "B", text: "Moab" }, { label: "C", text: "Tyre" }, { label: "D", text: "Philistia" }], correctAnswer: "B", verse: "Amos 2:1", explanation: "Moab desecrated remains." },
  { id: "amos18", question: "Which kingdom is judged for rejecting the law?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "Judah" }, { label: "C", text: "Assyria" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Amos 2:4", explanation: "Judah rejected God's law." },
  { id: "amos19", question: "What is Israel accused of selling?", options: [{ label: "A", text: "Land" }, { label: "B", text: "The righteous for silver" }, { label: "C", text: "Sacrifices" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Amos 2:6", explanation: "Social injustice is condemned." },
  { id: "amos20", question: "Who is trampled?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The poor" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Amos 2:7", explanation: "The poor are oppressed." },
  { id: "amos21", question: "What immoral act is condemned?", options: [{ label: "A", text: "Theft" }, { label: "B", text: "Sexual immorality" }, { label: "C", text: "Drunkenness" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Amos 2:7", explanation: "Moral corruption is exposed." },
  { id: "amos22", question: "What do Israelites drink with fines?", options: [{ label: "A", text: "Milk" }, { label: "B", text: "Wine" }, { label: "C", text: "Water" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Amos 2:8", explanation: "They profit from injustice." },
  { id: "amos23", question: "Who did God destroy before Israel?", options: [{ label: "A", text: "Philistines" }, { label: "B", text: "Amorites" }, { label: "C", text: "Moabites" }, { label: "D", text: "Edomites" }], correctAnswer: "B", verse: "Amos 2:9", explanation: "God recounts His faithfulness." },
  { id: "amos24", question: "What did God do in the wilderness?", options: [{ label: "A", text: "Abandoned Israel" }, { label: "B", text: "Led Israel" }, { label: "C", text: "Judged Israel" }, { label: "D", text: "Ignored Israel" }], correctAnswer: "B", verse: "Amos 2:10", explanation: "God led Israel faithfully." },
  { id: "amos25", question: "What role did God raise up?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Prophets" }, { label: "C", text: "Warriors" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "Amos 2:11", explanation: "God sent prophets." },
  { id: "amos26", question: "What did Israel do to the prophets?", options: [{ label: "A", text: "Honored them" }, { label: "B", text: "Silenced them" }, { label: "C", text: "Followed them" }, { label: "D", text: "Paid them" }], correctAnswer: "B", verse: "Amos 2:12", explanation: "They rejected God's messengers." },
  { id: "amos27", question: "What will fail in judgment?", options: [{ label: "A", text: "Weapons" }, { label: "B", text: "The swift and strong" }, { label: "C", text: "The weak" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "Amos 2:14-15", explanation: "No strength can save." },
  { id: "amos28", question: "What happens to the brave?", options: [{ label: "A", text: "They fight" }, { label: "B", text: "They flee naked" }, { label: "C", text: "They triumph" }, { label: "D", text: "They repent" }], correctAnswer: "B", verse: "Amos 2:16", explanation: "Judgment overwhelms." },
  { id: "amos29", question: "Who does God address in chapter 3?", options: [{ label: "A", text: "All nations" }, { label: "B", text: "The whole family of Israel" }, { label: "C", text: "Judah only" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Amos 3:1", explanation: "Israel's accountability is emphasized." },
  { id: "amos30", question: "Why is Israel punished uniquely?", options: [{ label: "A", text: "They are weakest" }, { label: "B", text: "They are chosen and known" }, { label: "C", text: "They are poorest" }, { label: "D", text: "They are surrounded" }], correctAnswer: "B", verse: "Amos 3:2", explanation: "Greater privilege brings responsibility." },
  { id: "amos31", question: "What rhetorical style fills Amos 3?", options: [{ label: "A", text: "Parables" }, { label: "B", text: "Questions" }, { label: "C", text: "Songs" }, { label: "D", text: "Proverbs" }], correctAnswer: "B", verse: "Amos 3", explanation: "A chain of cause and effect questions." },
  { id: "amos32", question: "What happens if a lion roars?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "It has prey" }, { label: "C", text: "It is afraid" }, { label: "D", text: "It sleeps" }], correctAnswer: "B", verse: "Amos 3:4", explanation: "Judgment has a cause." },
  { id: "amos33", question: "What does prophecy indicate?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "God has spoken" }, { label: "C", text: "Human opinion" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Amos 3:8", explanation: "The Lord reveals His plans." },
  { id: "amos34", question: "Who is invited to witness Israel's sin?", options: [{ label: "A", text: "Egypt and Ashdod" }, { label: "B", text: "Moab and Edom" }, { label: "C", text: "Assyria and Babylon" }, { label: "D", text: "Judah only" }], correctAnswer: "A", verse: "Amos 3:9", explanation: "Foreign nations observe injustice." },
  { id: "amos35", question: "What fills Samaria?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Violence and robbery" }, { label: "C", text: "Prayer" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Amos 3:10", explanation: "Injustice dominates." },
  { id: "amos36", question: "What will be destroyed?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "Strongholds" }, { label: "C", text: "Fields" }, { label: "D", text: "Altars only" }], correctAnswer: "B", verse: "Amos 3:11", explanation: "False security collapses." },
  { id: "amos37", question: "Which altars are cut off?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Samaria" }, { label: "D", text: "Gilgal" }], correctAnswer: "B", verse: "Amos 3:14", explanation: "False worship judged." },
  { id: "amos38", question: "What happens to winter and summer houses?", options: [{ label: "A", text: "Renovated" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Expanded" }, { label: "D", text: "Blessed" }], correctAnswer: "B", verse: "Amos 3:15", explanation: "Luxury is stripped away." },
  { id: "amos39", question: "Who are called cows of Bashan?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Wealthy women" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Amos 4:1", explanation: "Oppressive elites condemned." },
  { id: "amos40", question: "What do they demand from their husbands?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Drinks" }, { label: "C", text: "Offerings" }, { label: "D", text: "Justice" }], correctAnswer: "B", verse: "Amos 4:1", explanation: "Luxury at others' expense." },
  { id: "amos41", question: "What will happen to them?", options: [{ label: "A", text: "They repent" }, { label: "B", text: "They are taken away with hooks" }, { label: "C", text: "They rule" }, { label: "D", text: "They hide" }], correctAnswer: "B", verse: "Amos 4:2", explanation: "Humiliating exile." },
  { id: "amos42", question: "Where are people told to go and sin?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel and Gilgal" }, { label: "C", text: "Samaria" }, { label: "D", text: "Tekoa" }], correctAnswer: "B", verse: "Amos 4:4", explanation: "Ironic condemnation." },
  { id: "amos43", question: "What offerings are mocked?", options: [{ label: "A", text: "Silent offerings" }, { label: "B", text: "Showy sacrifices" }, { label: "C", text: "Grain offerings" }, { label: "D", text: "Drink offerings" }], correctAnswer: "B", verse: "Amos 4:4-5", explanation: "Empty religion." },
  { id: "amos44", question: "What phrase repeats after each warning?", options: [{ label: "A", text: "Yet you returned" }, { label: "B", text: "Yet you did not return to Me" }, { label: "C", text: "Thus says the Lord" }, { label: "D", text: "Hear this word" }], correctAnswer: "B", verse: "Amos 4", explanation: "Persistent rebellion." },
  { id: "amos45", question: "What disasters did God send?", options: [{ label: "A", text: "Plagues only" }, { label: "B", text: "Famine, drought, blight" }, { label: "C", text: "War only" }, { label: "D", text: "Floods" }], correctAnswer: "B", verse: "Amos 4:6-11", explanation: "Discipline intended to lead to repentance." },
  { id: "amos46", question: "What is Israel told to prepare for?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Meeting God" }, { label: "C", text: "War" }, { label: "D", text: "Exile only" }], correctAnswer: "B", verse: "Amos 4:12", explanation: "A sobering warning." },
  { id: "amos47", question: "How is God described?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Creator and revealer" }, { label: "C", text: "Silent" }, { label: "D", text: "Limited" }], correctAnswer: "B", verse: "Amos 4:13", explanation: "God's sovereignty affirmed." },
  { id: "amos48", question: "What does Amos take up in chapter 5?", options: [{ label: "A", text: "A lament" }, { label: "B", text: "A song of victory" }, { label: "C", text: "A parable" }, { label: "D", text: "A vision" }], correctAnswer: "A", verse: "Amos 5:1", explanation: "A funeral lament for Israel." },
  { id: "amos49", question: "How is Israel described?", options: [{ label: "A", text: "Strong nation" }, { label: "B", text: "Fallen virgin" }, { label: "C", text: "Holy people" }, { label: "D", text: "Victorious army" }], correctAnswer: "B", verse: "Amos 5:2", explanation: "A nation brought low." },
  { id: "amos50", question: "What call is repeated?", options: [{ label: "A", text: "Seek riches" }, { label: "B", text: "Seek the Lord and live" }, { label: "C", text: "Seek kings" }, { label: "D", text: "Seek peace treaties" }], correctAnswer: "B", verse: "Amos 5:4", explanation: "Life comes from seeking God." },
  { id: "amos51", question: "Which places should not be sought?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel, Gilgal, Beersheba" }, { label: "C", text: "Tekoa" }, { label: "D", text: "Zion" }], correctAnswer: "B", verse: "Amos 5:5", explanation: "False religious centers." },
  { id: "amos52", question: "What happens if the Lord breaks out like fire?", options: [{ label: "A", text: "It blesses" }, { label: "B", text: "No one can quench it" }, { label: "C", text: "It fades" }, { label: "D", text: "It purifies only" }], correctAnswer: "B", verse: "Amos 5:6", explanation: "Unstoppable judgment." },
  { id: "amos53", question: "What do people turn justice into?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Bitterness" }, { label: "C", text: "Peace" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Amos 5:7", explanation: "Justice is corrupted." },
  { id: "amos54", question: "Who made the constellations?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Amos 5:8", explanation: "God's creative power." },
  { id: "amos55", question: "What do the people hate?", options: [{ label: "A", text: "Idols" }, { label: "B", text: "The one who reproves at the gate" }, { label: "C", text: "Foreigners" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "Amos 5:10", explanation: "Truth is rejected." },
  { id: "amos56", question: "What injustice is mentioned?", options: [{ label: "A", text: "Bribery" }, { label: "B", text: "Oppressing the poor" }, { label: "C", text: "False worship" }, { label: "D", text: "Violence only" }], correctAnswer: "B", verse: "Amos 5:11", explanation: "Economic injustice." },
  { id: "amos57", question: "What houses will not be enjoyed?", options: [{ label: "A", text: "Stone houses" }, { label: "B", text: "Palaces" }, { label: "C", text: "Tents" }, { label: "D", text: "Cottages" }], correctAnswer: "A", verse: "Amos 5:11", explanation: "Ill-gotten gains fail." },
  { id: "amos58", question: "What does God know?", options: [{ label: "A", text: "Few sins" }, { label: "B", text: "Many transgressions" }, { label: "C", text: "Hidden worship" }, { label: "D", text: "Foreign plans" }], correctAnswer: "B", verse: "Amos 5:12", explanation: "Nothing is hidden from God." },
  { id: "amos59", question: "Why does the prudent keep silent?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Evil times" }, { label: "C", text: "Fear" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Amos 5:13", explanation: "Dangerous times suppress truth." },
  { id: "amos60", question: "What is God's desire?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Justice and righteousness" }, { label: "C", text: "Festivals" }, { label: "D", text: "Songs" }], correctAnswer: "B", verse: "Amos 5:24", explanation: "Justice flows like a river." },
  { id: "amos61", question: "What does God hate?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Empty festivals" }, { label: "C", text: "Fasting" }, { label: "D", text: "Offerings" }], correctAnswer: "B", verse: "Amos 5:21", explanation: "Ritual without righteousness." },
  { id: "amos62", question: "What does God refuse to accept?", options: [{ label: "A", text: "Grain offerings" }, { label: "B", text: "Showy worship" }, { label: "C", text: "Prayer" }, { label: "D", text: "Mercy" }], correctAnswer: "B", verse: "Amos 5:22", explanation: "Hypocritical worship." },
  { id: "amos63", question: "What is God tired of hearing?", options: [{ label: "A", text: "Songs" }, { label: "B", text: "Noise of songs" }, { label: "C", text: "Lament" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Amos 5:23", explanation: "Music without obedience." },
  { id: "amos64", question: "What should roll like waters?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Justice" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Amos 5:24", explanation: "Justice is central." },
  { id: "amos65", question: "What did Israel carry in the wilderness?", options: [{ label: "A", text: "The ark only" }, { label: "B", text: "Idols" }, { label: "C", text: "Offerings" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "Amos 5:26", explanation: "Idolatry persisted." },
  { id: "amos66", question: "Where will Israel be sent?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Exile beyond Damascus" }, { label: "C", text: "Judah" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Amos 5:27", explanation: "Exile is decreed." },
  { id: "amos67", question: "Who are at ease in Zion?", options: [{ label: "A", text: "The poor" }, { label: "B", text: "The complacent elite" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Amos 6:1", explanation: "Complacency condemned." },
  { id: "amos68", question: "What do they trust?", options: [{ label: "A", text: "God" }, { label: "B", text: "Their own strength" }, { label: "C", text: "The law" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Amos 6:1", explanation: "False confidence." },
  { id: "amos69", question: "What luxury items are mentioned?", options: [{ label: "A", text: "Gold crowns" }, { label: "B", text: "Ivory beds" }, { label: "C", text: "Silk robes" }, { label: "D", text: "Silver cups" }], correctAnswer: "B", verse: "Amos 6:4", explanation: "Extravagant living." },
  { id: "amos70", question: "What do they drink?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Wine by the bowlful" }, { label: "C", text: "Milk" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Amos 6:6", explanation: "Excessive indulgence." },
  { id: "amos71", question: "What do they not grieve over?", options: [{ label: "A", text: "Their sin" }, { label: "B", text: "The ruin of Joseph" }, { label: "C", text: "Their wealth" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "Amos 6:6", explanation: "Indifference to national collapse." },
  { id: "amos72", question: "What will happen to them first?", options: [{ label: "A", text: "They will prosper" }, { label: "B", text: "They will go into exile" }, { label: "C", text: "They will repent" }, { label: "D", text: "They will rule" }], correctAnswer: "B", verse: "Amos 6:7", explanation: "Judgment begins with leaders." },
  { id: "amos73", question: "What does God swear by?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "Himself" }, { label: "C", text: "The law" }, { label: "D", text: "Zion" }], correctAnswer: "B", verse: "Amos 6:8", explanation: "God's oath is certain." },
  { id: "amos74", question: "What does God detest?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Pride of Jacob" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Amos 6:8", explanation: "Pride provokes judgment." },
  { id: "amos75", question: "What vision comes first in chapter 7?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Locusts" }, { label: "C", text: "Plumb line" }, { label: "D", text: "Fruit" }], correctAnswer: "B", verse: "Amos 7:1", explanation: "Locust judgment envisioned." },
  { id: "amos76", question: "Who intercedes?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Amos" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Amos 7:2", explanation: "Amos pleads for mercy." },
  { id: "amos77", question: "What does God do after intercession?", options: [{ label: "A", text: "Proceeds" }, { label: "B", text: "Relents" }, { label: "C", text: "Punishes Amos" }, { label: "D", text: "Ignores" }], correctAnswer: "B", verse: "Amos 7:3", explanation: "Judgment delayed." },
  { id: "amos78", question: "What is the second vision?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Plumb line" }, { label: "C", text: "Basket of fruit" }, { label: "D", text: "Earthquake" }], correctAnswer: "A", verse: "Amos 7:4", explanation: "Consuming fire." },
  { id: "amos79", question: "What is the third vision?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Plumb line" }, { label: "C", text: "Locusts" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "Amos 7:7", explanation: "Measuring Israel." },
  { id: "amos80", question: "What does the plumb line show?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Israel does not measure up" }, { label: "C", text: "Peace" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Amos 7:8", explanation: "Judgment is certain." },
  { id: "amos81", question: "Who opposes Amos?", options: [{ label: "A", text: "King Jeroboam" }, { label: "B", text: "Amaziah" }, { label: "C", text: "Hosea" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "Amos 7:10", explanation: "A priest resists prophecy." },
  { id: "amos82", question: "Where is Amaziah priest?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Samaria" }, { label: "D", text: "Tekoa" }], correctAnswer: "B", verse: "Amos 7:10", explanation: "Center of false worship." },
  { id: "amos83", question: "What does Amaziah accuse Amos of?", options: [{ label: "A", text: "Blasphemy" }, { label: "B", text: "Conspiracy" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Theft" }], correctAnswer: "B", verse: "Amos 7:10", explanation: "Political threat accusation." },
  { id: "amos84", question: "What does Amaziah tell Amos to do?", options: [{ label: "A", text: "Stay" }, { label: "B", text: "Flee to Judah" }, { label: "C", text: "Repent" }, { label: "D", text: "Be silent forever" }], correctAnswer: "B", verse: "Amos 7:12", explanation: "Prophet rejected." },
  { id: "amos85", question: "How does Amos describe himself?", options: [{ label: "A", text: "A prophet's son" }, { label: "B", text: "A shepherd called by God" }, { label: "C", text: "A priest" }, { label: "D", text: "A king" }], correctAnswer: "B", verse: "Amos 7:14-15", explanation: "Called directly by God." },
  { id: "amos86", question: "What judgment is pronounced on Amaziah?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Family disgrace and exile" }, { label: "C", text: "Promotion" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Amos 7:17", explanation: "Rejection of God's word has consequences." },
  { id: "amos87", question: "What is the fourth vision?", options: [{ label: "A", text: "Plumb line" }, { label: "B", text: "Basket of ripe fruit" }, { label: "C", text: "Fire" }, { label: "D", text: "Temple collapse" }], correctAnswer: "B", verse: "Amos 8:1", explanation: "Israel is ripe for judgment." },
  { id: "amos88", question: "What does the ripe fruit symbolize?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "End has come" }, { label: "C", text: "Harvest joy" }, { label: "D", text: "Prosperity" }], correctAnswer: "B", verse: "Amos 8:2", explanation: "Time is up." },
  { id: "amos89", question: "What will happen to songs?", options: [{ label: "A", text: "Increase" }, { label: "B", text: "Turn to wailing" }, { label: "C", text: "Become prayers" }, { label: "D", text: "Cease quietly" }], correctAnswer: "B", verse: "Amos 8:3", explanation: "Joy becomes mourning." },
  { id: "amos90", question: "What economic sin is condemned?", options: [{ label: "A", text: "Debt forgiveness" }, { label: "B", text: "Cheating the poor" }, { label: "C", text: "Trade" }, { label: "D", text: "Farming" }], correctAnswer: "B", verse: "Amos 8:4-6", explanation: "Exploitation through commerce." },
  { id: "amos91", question: "What is manipulated?", options: [{ label: "A", text: "Offerings" }, { label: "B", text: "Scales and measures" }, { label: "C", text: "Law" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "Amos 8:5", explanation: "Dishonest business." },
  { id: "amos92", question: "What will God never forget?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Their deeds" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Festivals" }], correctAnswer: "B", verse: "Amos 8:7", explanation: "Accountability is sure." },
  { id: "amos93", question: "What famine will come?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Hearing the word of the Lord" }, { label: "C", text: "Water" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Amos 8:11", explanation: "Spiritual famine." },
  { id: "amos94", question: "What will people search for?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "The word of the Lord" }, { label: "C", text: "Kings" }, { label: "D", text: "Idols" }], correctAnswer: "B", verse: "Amos 8:12", explanation: "But they will not find it." },
  { id: "amos95", question: "What is the final vision?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "The Lord beside the altar" }, { label: "C", text: "New temple" }, { label: "D", text: "Harvest" }], correctAnswer: "B", verse: "Amos 9:1", explanation: "No escape from judgment." },
  { id: "amos96", question: "Can anyone hide from God?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Prophets only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Amos 9:2-4", explanation: "God's reach is total." },
  { id: "amos97", question: "What does God promise after judgment?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Restoration of David's tent" }, { label: "C", text: "End of Israel" }, { label: "D", text: "New exile" }], correctAnswer: "B", verse: "Amos 9:11", explanation: "Hope beyond judgment." },
  { id: "amos98", question: "What will be rebuilt?", options: [{ label: "A", text: "Samaria" }, { label: "B", text: "David's fallen shelter" }, { label: "C", text: "Bethel" }, { label: "D", text: "Tekoa" }], correctAnswer: "B", verse: "Amos 9:11", explanation: "Messianic hope." },
  { id: "amos99", question: "What imagery describes abundance?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Plowman overtakes reaper" }, { label: "C", text: "Drought" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Amos 9:13", explanation: "Overflowing blessing." },
  { id: "amos100", question: "How does Amos end?", options: [{ label: "A", text: "With exile" }, { label: "B", text: "With restoration and security" }, { label: "C", text: "With silence" }, { label: "D", text: "With judgment only" }], correctAnswer: "B", verse: "Amos 9:14-15", explanation: "God restores His people." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function AmosTriviaPage() {
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
          .eq("book", "amos");

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
          book: "amos",
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
            book: "amos",
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
    if (score === 10) return "Perfect! You're an Amos expert!";
    if (score >= 8) return "Excellent! You know Amos well!";
    if (score >= 6) return "Good job! Keep studying Amos!";
    if (score >= 4) return "Nice try! Amos has much to explore!";
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
              href="/bible-trivia/amos"
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






