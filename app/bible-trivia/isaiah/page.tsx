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
  { id: "isaiah1", question: "Who is the prophet of the book of Isaiah?", options: [{ label: "A", text: "Jeremiah" }, { label: "B", text: "Isaiah" }, { label: "C", text: "Ezekiel" }, { label: "D", text: "Daniel" }], correctAnswer: "B", verse: "Isaiah 1:1", explanation: "Isaiah son of Amoz prophesied concerning Judah and Jerusalem." },
  { id: "isaiah2", question: "During whose reigns did Isaiah prophesy?", options: [{ label: "A", text: "Saul, David, Solomon" }, { label: "B", text: "Uzziah, Jotham, Ahaz, Hezekiah" }, { label: "C", text: "Ahab, Jehu, Jeroboam" }, { label: "D", text: "Nebuchadnezzar, Cyrus, Darius" }], correctAnswer: "B", verse: "Isaiah 1:1", explanation: "Isaiah ministered during four Judean kings." },
  { id: "isaiah3", question: "What does the Lord criticize Israel for in Isaiah 1?", options: [{ label: "A", text: "Lack of sacrifices" }, { label: "B", text: "Empty worship without justice" }, { label: "C", text: "Foreign alliances" }, { label: "D", text: "Military weakness" }], correctAnswer: "B", verse: "Isaiah 1:11-17", explanation: "God rejects worship without righteousness." },
  { id: "isaiah4", question: "What invitation does God give sinful people?", options: [{ label: "A", text: "Run away" }, { label: "B", text: "Come, reason together" }, { label: "C", text: "Offer more sacrifices" }, { label: "D", text: "Build the temple" }], correctAnswer: "B", verse: "Isaiah 1:18", explanation: "God invites repentance and forgiveness." },
  { id: "isaiah5", question: "What will the mountain of the Lord become?", options: [{ label: "A", text: "A fortress" }, { label: "B", text: "Chief among the mountains" }, { label: "C", text: "A battlefield" }, { label: "D", text: "A ruin" }], correctAnswer: "B", verse: "Isaiah 2:2", explanation: "God's kingdom will be exalted." },
  { id: "isaiah6", question: "What will people beat their swords into?", options: [{ label: "A", text: "Spears" }, { label: "B", text: "Plowshares" }, { label: "C", text: "Shields" }, { label: "D", text: "Crowns" }], correctAnswer: "B", verse: "Isaiah 2:4", explanation: "Peace replaces war in God's kingdom." },
  { id: "isaiah7", question: "What vision does Isaiah see in chapter 6?", options: [{ label: "A", text: "A burning bush" }, { label: "B", text: "The Lord on a throne" }, { label: "C", text: "Dry bones" }, { label: "D", text: "A ladder to heaven" }], correctAnswer: "B", verse: "Isaiah 6:1", explanation: "Isaiah sees the holy Lord enthroned." },
  { id: "isaiah8", question: "What do the seraphim cry out?", options: [{ label: "A", text: "Worthy, worthy, worthy" }, { label: "B", text: "Holy, holy, holy" }, { label: "C", text: "Glory to God" }, { label: "D", text: "Praise the Lord" }], correctAnswer: "B", verse: "Isaiah 6:3", explanation: "God's holiness fills the earth." },
  { id: "isaiah9", question: "How does Isaiah react to God's holiness?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fear and confession" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 6:5", explanation: "Isaiah confesses his unclean lips." },
  { id: "isaiah10", question: "What cleanses Isaiah's lips?", options: [{ label: "A", text: "Water" }, { label: "B", text: "A burning coal" }, { label: "C", text: "Oil" }, { label: "D", text: "Blood" }], correctAnswer: "B", verse: "Isaiah 6:6-7", explanation: "God purifies Isaiah for service." },
  { id: "isaiah11", question: "What does Isaiah say when God asks whom to send?", options: [{ label: "A", text: "Send Moses" }, { label: "B", text: "Here am I, send me" }, { label: "C", text: "Not me" }, { label: "D", text: "Send an angel" }], correctAnswer: "B", verse: "Isaiah 6:8", explanation: "Isaiah willingly responds to God's call." },
  { id: "isaiah12", question: "What sign is given to King Ahaz?", options: [{ label: "A", text: "A burning bush" }, { label: "B", text: "A virgin will conceive" }, { label: "C", text: "A falling star" }, { label: "D", text: "A parted sea" }], correctAnswer: "B", verse: "Isaiah 7:14", explanation: "The sign points to Immanuel." },
  { id: "isaiah13", question: "What does the name Immanuel mean?", options: [{ label: "A", text: "God saves" }, { label: "B", text: "God with us" }, { label: "C", text: "Prince of peace" }, { label: "D", text: "Holy one" }], correctAnswer: "B", verse: "Isaiah 7:14", explanation: "Immanuel means God is with His people." },
  { id: "isaiah14", question: "What shines in the darkness according to Isaiah 9?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Light" }, { label: "C", text: "Truth" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Isaiah 9:2", explanation: "Light represents hope and salvation." },
  { id: "isaiah15", question: "What titles are given to the promised child?", options: [{ label: "A", text: "King and Prophet" }, { label: "B", text: "Wonderful Counselor, Mighty God" }, { label: "C", text: "Priest and Judge" }, { label: "D", text: "Servant and Shepherd" }], correctAnswer: "B", verse: "Isaiah 9:6", explanation: "The Messiah's divine titles are proclaimed." },
  { id: "isaiah16", question: "What will characterize the Messiah's rule?", options: [{ label: "A", text: "Oppression" }, { label: "B", text: "Justice and righteousness" }, { label: "C", text: "Military conquest" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Isaiah 9:7", explanation: "His kingdom is just and eternal." },
  { id: "isaiah17", question: "Who is described as a shoot from Jesse?", options: [{ label: "A", text: "David" }, { label: "B", text: "The Messiah" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Isaiah 11:1", explanation: "The Messiah comes from David's line." },
  { id: "isaiah18", question: "What rests upon the shoot from Jesse?", options: [{ label: "A", text: "The law" }, { label: "B", text: "The Spirit of the Lord" }, { label: "C", text: "The crown" }, { label: "D", text: "The sword" }], correctAnswer: "B", verse: "Isaiah 11:2", explanation: "The Spirit empowers the Messiah." },
  { id: "isaiah19", question: "What animals live in peace in Isaiah 11?", options: [{ label: "A", text: "Lion and bear" }, { label: "B", text: "Wolf and lamb" }, { label: "C", text: "Eagle and dove" }, { label: "D", text: "Ox and donkey" }], correctAnswer: "B", verse: "Isaiah 11:6", explanation: "Peace marks God's restored creation." },
  { id: "isaiah20", question: "What does Isaiah warn against trusting?", options: [{ label: "A", text: "The Lord" }, { label: "B", text: "Foreign nations" }, { label: "C", text: "Repentance" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Isaiah 30:1-2", explanation: "Israel is warned not to rely on human power." },
  { id: "isaiah21", question: "Who is judged in Isaiah 13?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Israel" }], correctAnswer: "B", verse: "Isaiah 13:1", explanation: "Isaiah prophesies Babylon's downfall." },
  { id: "isaiah22", question: "What sin is emphasized in Israel?", options: [{ label: "A", text: "Idolatry only" }, { label: "B", text: "Pride" }, { label: "C", text: "Silence" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Isaiah 2:11-12", explanation: "Human pride will be humbled." },
  { id: "isaiah23", question: "What city is called the Valley of Vision?", options: [{ label: "A", text: "Samaria" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Babylon" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Isaiah 22:1", explanation: "Jerusalem is addressed prophetically." },
  { id: "isaiah24", question: "What does Isaiah describe as emptying the earth?", options: [{ label: "A", text: "Flood" }, { label: "B", text: "The Lord's judgment" }, { label: "C", text: "War" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Isaiah 24:1", explanation: "God judges the whole earth." },
  { id: "isaiah25", question: "What will God swallow up forever?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Death" }, { label: "C", text: "Pride" }, { label: "D", text: "Darkness" }], correctAnswer: "B", verse: "Isaiah 25:8", explanation: "God promises victory over death." },
  { id: "isaiah26", question: "What keeps a person in perfect peace?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Trust in the Lord" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 26:3", explanation: "Peace comes from trusting God." },
  { id: "isaiah27", question: "Who is described as a strong city?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Egypt" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Isaiah 26:1", explanation: "God is the strength of His people." },
  { id: "isaiah28", question: "What does Isaiah warn against mocking?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "God's word" }, { label: "C", text: "Kings" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Isaiah 28:14-15", explanation: "Scoffing leads to judgment." },
  { id: "isaiah29", question: "What cornerstone does God lay?", options: [{ label: "A", text: "A weak stone" }, { label: "B", text: "A tested stone" }, { label: "C", text: "A broken stone" }, { label: "D", text: "A hidden stone" }], correctAnswer: "B", verse: "Isaiah 28:16", explanation: "God provides a sure foundation." },
  { id: "isaiah30", question: "What brings salvation and strength?", options: [{ label: "A", text: "Activity" }, { label: "B", text: "Quietness and trust" }, { label: "C", text: "Military power" }, { label: "D", text: "Alliances" }], correctAnswer: "B", verse: "Isaiah 30:15", explanation: "Trusting God brings deliverance." },
  { id: "isaiah31", question: "What does Isaiah warn about relying on Egypt?", options: [{ label: "A", text: "It is wise" }, { label: "B", text: "It leads to shame" }, { label: "C", text: "It brings peace" }, { label: "D", text: "It strengthens faith" }], correctAnswer: "B", verse: "Isaiah 31:1", explanation: "Human alliances cannot save." },
  { id: "isaiah32", question: "Who will reign in righteousness?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "A king" }, { label: "C", text: "Pharaoh" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Isaiah 32:1", explanation: "A righteous king is promised." },
  { id: "isaiah33", question: "What will the Spirit bring?", options: [{ label: "A", text: "Destruction" }, { label: "B", text: "Justice and peace" }, { label: "C", text: "Fear" }, { label: "D", text: "Division" }], correctAnswer: "B", verse: "Isaiah 32:15-17", explanation: "The Spirit produces righteousness." },
  { id: "isaiah34", question: "What nation is judged in Isaiah 34?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Edom" }, { label: "C", text: "Israel" }, { label: "D", text: "Assyria" }], correctAnswer: "B", verse: "Isaiah 34:5", explanation: "Edom symbolizes God's enemies." },
  { id: "isaiah35", question: "What will the desert become?", options: [{ label: "A", text: "A wasteland" }, { label: "B", text: "A garden" }, { label: "C", text: "A city" }, { label: "D", text: "A battlefield" }], correctAnswer: "B", verse: "Isaiah 35:1", explanation: "God restores creation." },
  { id: "isaiah36", question: "Who threatens Jerusalem in Isaiah 36?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Assyria" }, { label: "C", text: "Egypt" }, { label: "D", text: "Philistia" }], correctAnswer: "B", verse: "Isaiah 36:1", explanation: "Assyria invades Judah." },
  { id: "isaiah37", question: "Which king seeks Isaiah's counsel?", options: [{ label: "A", text: "Ahaz" }, { label: "B", text: "Hezekiah" }, { label: "C", text: "Manasseh" }, { label: "D", text: "Josiah" }], correctAnswer: "B", verse: "Isaiah 37:2", explanation: "Hezekiah turns to God for help." },
  { id: "isaiah38", question: "What does God do to Assyria's army?", options: [{ label: "A", text: "Scatters it" }, { label: "B", text: "Strikes it down" }, { label: "C", text: "Enslaves it" }, { label: "D", text: "Converts it" }], correctAnswer: "B", verse: "Isaiah 37:36", explanation: "God miraculously delivers Jerusalem." },
  { id: "isaiah39", question: "What illness does Hezekiah suffer?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "A deadly boil" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Fever" }], correctAnswer: "B", verse: "Isaiah 38:1", explanation: "Hezekiah faces death." },
  { id: "isaiah40", question: "How many years are added to Hezekiah's life?", options: [{ label: "A", text: "5" }, { label: "B", text: "10" }, { label: "C", text: "15" }, { label: "D", text: "20" }], correctAnswer: "C", verse: "Isaiah 38:5", explanation: "God extends Hezekiah's life." },
  { id: "isaiah41", question: "What sign confirms Hezekiah's healing?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Shadow moves backward" }, { label: "C", text: "Fire falls" }, { label: "D", text: "Earthquake" }], correctAnswer: "B", verse: "Isaiah 38:8", explanation: "God confirms His promise." },
  { id: "isaiah42", question: "What mistake does Hezekiah make?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Showing treasures to Babylon" }, { label: "C", text: "Disobeying Isaiah" }, { label: "D", text: "Refusing prayer" }], correctAnswer: "B", verse: "Isaiah 39:2", explanation: "Pride leads to future judgment." },
  { id: "isaiah43", question: "What future judgment is announced?", options: [{ label: "A", text: "Assyria's fall" }, { label: "B", text: "Babylonian exile" }, { label: "C", text: "Egyptian invasion" }, { label: "D", text: "Civil war" }], correctAnswer: "B", verse: "Isaiah 39:6-7", explanation: "Judah will be exiled." },
  { id: "isaiah44", question: "What message begins Isaiah 40?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Comfort" }, { label: "C", text: "Warning" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 40:1", explanation: "God comforts His people." },
  { id: "isaiah45", question: "What voice cries in the wilderness?", options: [{ label: "A", text: "Prepare the way of the Lord" }, { label: "B", text: "Repent" }, { label: "C", text: "Fear God" }, { label: "D", text: "Return home" }], correctAnswer: "A", verse: "Isaiah 40:3", explanation: "The Lord's coming is announced." },
  { id: "isaiah46", question: "What is humanity compared to?", options: [{ label: "A", text: "Stone" }, { label: "B", text: "Grass" }, { label: "C", text: "Fire" }, { label: "D", text: "Water" }], correctAnswer: "B", verse: "Isaiah 40:6-7", explanation: "Human life is temporary." },
  { id: "isaiah47", question: "Who never grows weary?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Isaiah 40:28", explanation: "God's strength is limitless." },
  { id: "isaiah48", question: "What do those who hope in the Lord receive?", options: [{ label: "A", text: "Riches" }, { label: "B", text: "Renewed strength" }, { label: "C", text: "Victory" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Isaiah 40:31", explanation: "God renews His people." },
  { id: "isaiah49", question: "Who is called God's servant?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Israel" }, { label: "C", text: "Egypt" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Isaiah 41:8-9", explanation: "Israel is chosen by God." },
  { id: "isaiah50", question: "What does God promise not to do?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Forget His people" }, { label: "C", text: "Discipline" }, { label: "D", text: "Delay" }], correctAnswer: "B", verse: "Isaiah 49:15", explanation: "God's compassion is unfailing." },
  { id: "isaiah51", question: "Who is raised up as a deliverer?", options: [{ label: "A", text: "David" }, { label: "B", text: "Cyrus" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Isaiah 44:28", explanation: "Cyrus is named as God's instrument." },
  { id: "isaiah52", question: "What does God say besides Him?", options: [{ label: "A", text: "There are many gods" }, { label: "B", text: "There is no other god" }, { label: "C", text: "Angels rule" }, { label: "D", text: "Kings reign" }], correctAnswer: "B", verse: "Isaiah 45:5", explanation: "God alone is sovereign." },
  { id: "isaiah53", question: "What does God create?", options: [{ label: "A", text: "Light only" }, { label: "B", text: "Light and darkness" }, { label: "C", text: "Peace only" }, { label: "D", text: "Chaos only" }], correctAnswer: "B", verse: "Isaiah 45:7", explanation: "God is sovereign over all." },
  { id: "isaiah54", question: "What is condemned in Isaiah 46?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Fasting" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Isaiah 46:1-7", explanation: "False gods cannot save." },
  { id: "isaiah55", question: "What invitation does God give in Isaiah 55?", options: [{ label: "A", text: "Buy without money" }, { label: "B", text: "Fight for salvation" }, { label: "C", text: "Earn forgiveness" }, { label: "D", text: "Build a temple" }], correctAnswer: "A", verse: "Isaiah 55:1", explanation: "God offers free grace." },
  { id: "isaiah56", question: "What are God's thoughts compared to?", options: [{ label: "A", text: "Human plans" }, { label: "B", text: "Higher than ours" }, { label: "C", text: "Equal to ours" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Isaiah 55:8-9", explanation: "God's wisdom surpasses humanity." },
  { id: "isaiah57", question: "What never returns empty?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "God's word" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Isaiah 55:11", explanation: "God's word accomplishes His purpose." },
  { id: "isaiah58", question: "What kind of fasting does God desire?", options: [{ label: "A", text: "Silent fasting" }, { label: "B", text: "Justice and compassion" }, { label: "C", text: "Public fasting" }, { label: "D", text: "Strict fasting" }], correctAnswer: "B", verse: "Isaiah 58:6-7", explanation: "True worship includes righteousness." },
  { id: "isaiah59", question: "What separates people from God?", options: [{ label: "A", text: "Ignorance" }, { label: "B", text: "Sin" }, { label: "C", text: "Weakness" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Isaiah 59:2", explanation: "Sin creates separation." },
  { id: "isaiah60", question: "What shines on God's people?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "The glory of the Lord" }, { label: "C", text: "Judgment" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Isaiah 60:1", explanation: "God's glory rises upon His people." },
  { id: "isaiah61", question: "Who is anointed to proclaim good news?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "The Servant of the Lord" }, { label: "C", text: "Cyrus" }, { label: "D", text: "Hezekiah" }], correctAnswer: "B", verse: "Isaiah 61:1", explanation: "The anointed one brings salvation." },
  { id: "isaiah62", question: "What is proclaimed for captives?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Freedom" }, { label: "C", text: "Silence" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Isaiah 61:1", explanation: "God brings liberation." },
  { id: "isaiah63", question: "What replaces mourning?", options: [{ label: "A", text: "Ashes" }, { label: "B", text: "Joy" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 61:3", explanation: "God brings restoration." },
  { id: "isaiah64", question: "What are righteous acts compared to?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Filthy rags" }, { label: "C", text: "Precious stones" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Isaiah 64:6", explanation: "Human righteousness is insufficient." },
  { id: "isaiah65", question: "What does God promise to create?", options: [{ label: "A", text: "A new temple" }, { label: "B", text: "New heavens and a new earth" }, { label: "C", text: "A new kingdom" }, { label: "D", text: "A new law" }], correctAnswer: "B", verse: "Isaiah 65:17", explanation: "God promises renewal." },
  { id: "isaiah66", question: "What will no longer be heard?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Weeping" }, { label: "C", text: "Prayer" }, { label: "D", text: "Laughter" }], correctAnswer: "B", verse: "Isaiah 65:19", explanation: "Sorrow is removed." },
  { id: "isaiah67", question: "What animal imagery returns in peace?", options: [{ label: "A", text: "Lion and ox" }, { label: "B", text: "Wolf and lamb" }, { label: "C", text: "Bear and goat" }, { label: "D", text: "Eagle and dove" }], correctAnswer: "B", verse: "Isaiah 65:25", explanation: "Peace marks the new creation." },
  { id: "isaiah68", question: "What does God look upon?", options: [{ label: "A", text: "The powerful" }, { label: "B", text: "The humble and contrite" }, { label: "C", text: "The wealthy" }, { label: "D", text: "The learned" }], correctAnswer: "B", verse: "Isaiah 66:2", explanation: "God values humility." },
  { id: "isaiah69", question: "What does God reject?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Hypocritical sacrifice" }, { label: "C", text: "Praise" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Isaiah 66:3", explanation: "God desires sincere worship." },
  { id: "isaiah70", question: "Who will see God's glory?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "All nations" }, { label: "C", text: "Kings only" }, { label: "D", text: "Prophets only" }], correctAnswer: "B", verse: "Isaiah 66:18", explanation: "God's glory is revealed to all." },
  { id: "isaiah71", question: "What is Isaiah often called?", options: [{ label: "A", text: "The prophet of doom" }, { label: "B", text: "The evangelical prophet" }, { label: "C", text: "The silent prophet" }, { label: "D", text: "The minor prophet" }], correctAnswer: "B", verse: "Isaiah", explanation: "Isaiah clearly proclaims the Messiah." },
  { id: "isaiah72", question: "What theme dominates Isaiah?", options: [{ label: "A", text: "Law only" }, { label: "B", text: "Judgment and hope" }, { label: "C", text: "Silence" }, { label: "D", text: "History only" }], correctAnswer: "B", verse: "Isaiah", explanation: "Judgment is paired with redemption." },
  { id: "isaiah73", question: "What reveals God's sovereignty?", options: [{ label: "A", text: "Idols" }, { label: "B", text: "Prophecy" }, { label: "C", text: "Kings" }, { label: "D", text: "Armies" }], correctAnswer: "B", verse: "Isaiah 41:21-23", explanation: "God declares the future." },
  { id: "isaiah74", question: "What is God compared to?", options: [{ label: "A", text: "A rock" }, { label: "B", text: "A shepherd" }, { label: "C", text: "A warrior" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Isaiah", explanation: "Multiple images describe God." },
  { id: "isaiah75", question: "What cannot save?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Idols" }, { label: "C", text: "Repentance" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Isaiah 44:9-20", explanation: "Idols are powerless." },
  { id: "isaiah76", question: "What is God's servant called to do?", options: [{ label: "A", text: "Destroy nations" }, { label: "B", text: "Bring justice" }, { label: "C", text: "Build temples" }, { label: "D", text: "Rule militarily" }], correctAnswer: "B", verse: "Isaiah 42:1", explanation: "The servant brings justice." },
  { id: "isaiah77", question: "How will the servant act?", options: [{ label: "A", text: "With violence" }, { label: "B", text: "With gentleness" }, { label: "C", text: "With fear" }, { label: "D", text: "With pride" }], correctAnswer: "B", verse: "Isaiah 42:2-3", explanation: "The servant is humble." },
  { id: "isaiah78", question: "What does God promise Israel?", options: [{ label: "A", text: "Abandonment" }, { label: "B", text: "Redemption" }, { label: "C", text: "Exile forever" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 43:1", explanation: "God redeems His people." },
  { id: "isaiah79", question: "What does God say not to remember?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Former things" }, { label: "C", text: "Judgment" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Isaiah 43:18", explanation: "God is doing a new thing." },
  { id: "isaiah80", question: "What new thing does God promise?", options: [{ label: "A", text: "A king" }, { label: "B", text: "A way in the wilderness" }, { label: "C", text: "A law" }, { label: "D", text: "A city" }], correctAnswer: "B", verse: "Isaiah 43:19", explanation: "God brings renewal." },
  { id: "isaiah81", question: "What does God declare Himself to be?", options: [{ label: "A", text: "A helper" }, { label: "B", text: "The only Savior" }, { label: "C", text: "A judge only" }, { label: "D", text: "A king only" }], correctAnswer: "B", verse: "Isaiah 43:11", explanation: "Salvation belongs to the Lord." },
  { id: "isaiah82", question: "What does God blot out?", options: [{ label: "A", text: "Names" }, { label: "B", text: "Transgressions" }, { label: "C", text: "Promises" }, { label: "D", text: "Laws" }], correctAnswer: "B", verse: "Isaiah 43:25", explanation: "God forgives sins." },
  { id: "isaiah83", question: "What is God's word compared to?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Rain and snow" }, { label: "C", text: "A sword" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Isaiah 55:10-11", explanation: "God's word brings life." },
  { id: "isaiah84", question: "What is offered freely?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Strength" }, { label: "C", text: "Honor" }, { label: "D", text: "Victory" }], correctAnswer: "A", verse: "Isaiah 55:1", explanation: "God's grace is free." },
  { id: "isaiah85", question: "What replaces thorns?", options: [{ label: "A", text: "Flowers" }, { label: "B", text: "Trees" }, { label: "C", text: "Briers" }, { label: "D", text: "Grass" }], correctAnswer: "B", verse: "Isaiah 55:13", explanation: "God reverses the curse." },
  { id: "isaiah86", question: "What is the role of the watchmen?", options: [{ label: "A", text: "Sleep" }, { label: "B", text: "Pray continually" }, { label: "C", text: "Fight" }, { label: "D", text: "Rule" }], correctAnswer: "B", verse: "Isaiah 62:6-7", explanation: "They intercede without rest." },
  { id: "isaiah87", question: "What name is given to God's people?", options: [{ label: "A", text: "Forsaken" }, { label: "B", text: "Delight is in her" }, { label: "C", text: "Broken" }, { label: "D", text: "Scattered" }], correctAnswer: "B", verse: "Isaiah 62:4", explanation: "God delights in His people." },
  { id: "isaiah88", question: "What garment is given instead of despair?", options: [{ label: "A", text: "Armor" }, { label: "B", text: "Praise" }, { label: "C", text: "Strength" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Isaiah 61:3", explanation: "Praise replaces mourning." },
  { id: "isaiah89", question: "What is God's throne?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Heaven" }, { label: "C", text: "The temple" }, { label: "D", text: "Zion" }], correctAnswer: "B", verse: "Isaiah 66:1", explanation: "God reigns supreme." },
  { id: "isaiah90", question: "What is God's footstool?", options: [{ label: "A", text: "Zion" }, { label: "B", text: "The earth" }, { label: "C", text: "The temple" }, { label: "D", text: "Jerusalem" }], correctAnswer: "B", verse: "Isaiah 66:1", explanation: "Creation belongs to God." },
  { id: "isaiah91", question: "What kind of heart does God favor?", options: [{ label: "A", text: "Proud" }, { label: "B", text: "Humble" }, { label: "C", text: "Powerful" }, { label: "D", text: "Wealthy" }], correctAnswer: "B", verse: "Isaiah 66:2", explanation: "God honors humility." },
  { id: "isaiah92", question: "What will endure forever?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "God's word" }, { label: "C", text: "Kings" }, { label: "D", text: "Cities" }], correctAnswer: "B", verse: "Isaiah 40:8", explanation: "God's word is eternal." },
  { id: "isaiah93", question: "What defines true worship?", options: [{ label: "A", text: "Rituals" }, { label: "B", text: "Obedience and humility" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Music" }], correctAnswer: "B", verse: "Isaiah 58", explanation: "Worship flows from righteousness." },
  { id: "isaiah94", question: "What is God's ultimate plan?", options: [{ label: "A", text: "Destruction" }, { label: "B", text: "Redemption" }, { label: "C", text: "Silence" }, { label: "D", text: "Judgment only" }], correctAnswer: "B", verse: "Isaiah", explanation: "Redemption anchors the book." },
  { id: "isaiah95", question: "What fills the earth?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "The knowledge of the Lord" }, { label: "C", text: "Judgment" }, { label: "D", text: "Darkness" }], correctAnswer: "B", verse: "Isaiah 11:9", explanation: "God's knowledge spreads globally." },
  { id: "isaiah96", question: "What is central to Isaiah's message?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Holiness of God" }, { label: "C", text: "Wealth" }, { label: "D", text: "Politics" }], correctAnswer: "B", verse: "Isaiah 6", explanation: "God's holiness shapes everything." },
  { id: "isaiah97", question: "What does Isaiah balance?", options: [{ label: "A", text: "Fear and joy" }, { label: "B", text: "Judgment and hope" }, { label: "C", text: "Law and wisdom" }, { label: "D", text: "Kings and prophets" }], correctAnswer: "B", verse: "Isaiah", explanation: "Hope follows judgment." },
  { id: "isaiah98", question: "What is promised to the faithful?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Restoration" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Isaiah 60-62", explanation: "God restores His people." },
  { id: "isaiah99", question: "What defines God's covenant faithfulness?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Grace" }, { label: "C", text: "Strength" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Isaiah 54:10", explanation: "God's love does not fail." },
  { id: "isaiah100", question: "What is the lasting hope in Isaiah?", options: [{ label: "A", text: "Human kings" }, { label: "B", text: "The coming Messiah" }, { label: "C", text: "Military victory" }, { label: "D", text: "Political peace" }], correctAnswer: "B", verse: "Isaiah 9, 11, 53", explanation: "The Messiah is Isaiah's ultimate hope." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function IsaiahTriviaPage() {
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
          .eq("book", "isaiah");

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
          book: "isaiah",
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
            book: "isaiah",
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
    if (score === 10) return "Perfect! You're an Isaiah expert!";
    if (score >= 8) return "Excellent! You know Isaiah well!";
    if (score >= 6) return "Good job! Keep studying Isaiah!";
    if (score >= 4) return "Nice try! Isaiah has much to explore!";
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
              href="/bible-trivia/isaiah"
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
