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
  { id: "jonah1", question: "Who is the author of the book of Jonah?", options: [{ label: "A", text: "Nahum" }, { label: "B", text: "Jonah" }, { label: "C", text: "Micah" }, { label: "D", text: "Amos" }], correctAnswer: "B", verse: "Jonah 1:1", explanation: "The book centers on the prophet Jonah." },
  { id: "jonah2", question: "Who is Jonah the son of?", options: [{ label: "A", text: "Amittai" }, { label: "B", text: "Hilkiah" }, { label: "C", text: "Amoz" }, { label: "D", text: "Baruch" }], correctAnswer: "A", verse: "Jonah 1:1", explanation: "Jonah is identified as the son of Amittai." },
  { id: "jonah3", question: "Where does God tell Jonah to go?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Babylon" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Jonah 1:2", explanation: "God sends Jonah to Nineveh." },
  { id: "jonah4", question: "Why does God send Jonah to Nineveh?", options: [{ label: "A", text: "To destroy it immediately" }, { label: "B", text: "Because its wickedness came up before Him" }, { label: "C", text: "To crown a king" }, { label: "D", text: "To build a temple" }], correctAnswer: "B", verse: "Jonah 1:2", explanation: "Nineveh's wickedness required a warning." },
  { id: "jonah5", question: "Where does Jonah flee instead?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Tarshish" }, { label: "C", text: "Damascus" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Jonah 1:3", explanation: "Jonah attempts to flee from the Lord." },
  { id: "jonah6", question: "From which port does Jonah sail?", options: [{ label: "A", text: "Joppa" }, { label: "B", text: "Tyre" }, { label: "C", text: "Sidon" }, { label: "D", text: "Ashdod" }], correctAnswer: "A", verse: "Jonah 1:3", explanation: "Jonah boards a ship at Joppa." },
  { id: "jonah7", question: "What does Jonah do on the ship?", options: [{ label: "A", text: "Prays" }, { label: "B", text: "Sleeps" }, { label: "C", text: "Preaches" }, { label: "D", text: "Panics" }], correctAnswer: "B", verse: "Jonah 1:5", explanation: "Jonah sleeps during the storm." },
  { id: "jonah8", question: "What does the Lord send on the sea?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "A violent storm" }, { label: "C", text: "Darkness" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jonah 1:4", explanation: "God sends a great storm." },
  { id: "jonah9", question: "What are the sailors afraid of?", options: [{ label: "A", text: "Pirates" }, { label: "B", text: "The ship breaking apart" }, { label: "C", text: "Jonah" }, { label: "D", text: "The city" }], correctAnswer: "B", verse: "Jonah 1:4", explanation: "The storm threatens the ship." },
  { id: "jonah10", question: "What do the sailors do to lighten the ship?", options: [{ label: "A", text: "Row harder" }, { label: "B", text: "Throw cargo overboard" }, { label: "C", text: "Pray silently" }, { label: "D", text: "Sing" }], correctAnswer: "B", verse: "Jonah 1:5", explanation: "They throw cargo into the sea." },
  { id: "jonah11", question: "What does the captain ask Jonah?", options: [{ label: "A", text: "Who are you?" }, { label: "B", text: "Call on your god" }, { label: "C", text: "Where are you going?" }, { label: "D", text: "Why are you here?" }], correctAnswer: "B", verse: "Jonah 1:6", explanation: "The captain urges Jonah to pray." },
  { id: "jonah12", question: "What do the sailors cast to find the cause?", options: [{ label: "A", text: "Stones" }, { label: "B", text: "Lots" }, { label: "C", text: "Nets" }, { label: "D", text: "Coins" }], correctAnswer: "B", verse: "Jonah 1:7", explanation: "They cast lots." },
  { id: "jonah13", question: "On whom does the lot fall?", options: [{ label: "A", text: "Captain" }, { label: "B", text: "Jonah" }, { label: "C", text: "A sailor" }, { label: "D", text: "No one" }], correctAnswer: "B", verse: "Jonah 1:7", explanation: "Jonah is identified." },
  { id: "jonah14", question: "What does Jonah say he fears?", options: [{ label: "A", text: "The sea" }, { label: "B", text: "The Lord" }, { label: "C", text: "Death" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Jonah 1:9", explanation: "Jonah fears the Lord." },
  { id: "jonah15", question: "What does Jonah admit?", options: [{ label: "A", text: "He is innocent" }, { label: "B", text: "He is fleeing from the Lord" }, { label: "C", text: "He is lost" }, { label: "D", text: "He is a king" }], correctAnswer: "B", verse: "Jonah 1:10", explanation: "Jonah confesses his flight." },
  { id: "jonah16", question: "What do the sailors ask Jonah?", options: [{ label: "A", text: "How to pray" }, { label: "B", text: "What should we do to you?" }, { label: "C", text: "Where is Nineveh?" }, { label: "D", text: "Who is your God?" }], correctAnswer: "B", verse: "Jonah 1:11", explanation: "They seek a solution." },
  { id: "jonah17", question: "What does Jonah tell them to do?", options: [{ label: "A", text: "Row harder" }, { label: "B", text: "Throw him into the sea" }, { label: "C", text: "Pray more" }, { label: "D", text: "Turn back" }], correctAnswer: "B", verse: "Jonah 1:12", explanation: "Jonah offers himself." },
  { id: "jonah18", question: "What do the sailors try first?", options: [{ label: "A", text: "Throw Jonah" }, { label: "B", text: "Row back to land" }, { label: "C", text: "Abandon ship" }, { label: "D", text: "Pray to Jonah" }], correctAnswer: "B", verse: "Jonah 1:13", explanation: "They try to save him." },
  { id: "jonah19", question: "Why do they fail?", options: [{ label: "A", text: "Wind increases" }, { label: "B", text: "Sea grows violent" }, { label: "C", text: "Ship breaks" }, { label: "D", text: "Jonah resists" }], correctAnswer: "B", verse: "Jonah 1:13", explanation: "The storm intensifies." },
  { id: "jonah20", question: "What do the sailors pray before throwing Jonah?", options: [{ label: "A", text: "For victory" }, { label: "B", text: "Not to be guilty of innocent blood" }, { label: "C", text: "For wealth" }, { label: "D", text: "For land" }], correctAnswer: "B", verse: "Jonah 1:14", explanation: "They seek mercy." },
  { id: "jonah21", question: "What happens when Jonah is thrown overboard?", options: [{ label: "A", text: "Storm worsens" }, { label: "B", text: "Sea becomes calm" }, { label: "C", text: "Ship sinks" }, { label: "D", text: "Nothing changes" }], correctAnswer: "B", verse: "Jonah 1:15", explanation: "The storm stops." },
  { id: "jonah22", question: "How do the sailors respond?", options: [{ label: "A", text: "They flee" }, { label: "B", text: "They fear the Lord greatly" }, { label: "C", text: "They mock Jonah" }, { label: "D", text: "They sleep" }], correctAnswer: "B", verse: "Jonah 1:16", explanation: "They worship God." },
  { id: "jonah23", question: "What do the sailors offer?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Sacrifices and vows" }, { label: "C", text: "Money" }, { label: "D", text: "Prayers only" }], correctAnswer: "B", verse: "Jonah 1:16", explanation: "They honor the Lord." },
  { id: "jonah24", question: "What does the Lord appoint?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "A great fish" }, { label: "C", text: "A wave" }, { label: "D", text: "A storm" }], correctAnswer: "B", verse: "Jonah 1:17", explanation: "God appoints a fish." },
  { id: "jonah25", question: "How long is Jonah in the fish?", options: [{ label: "A", text: "One day" }, { label: "B", text: "Three days and nights" }, { label: "C", text: "Seven days" }, { label: "D", text: "Forty days" }], correctAnswer: "B", verse: "Jonah 1:17", explanation: "Three days and nights." },
  { id: "jonah26", question: "Where does Jonah pray from?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Inside the fish" }, { label: "C", text: "The shore" }, { label: "D", text: "Nineveh" }], correctAnswer: "B", verse: "Jonah 2:1", explanation: "Jonah prays from the fish." },
  { id: "jonah27", question: "Who hears Jonah's prayer?", options: [{ label: "A", text: "Sailors" }, { label: "B", text: "The Lord" }, { label: "C", text: "Angels" }, { label: "D", text: "Fish" }], correctAnswer: "B", verse: "Jonah 2", explanation: "God hears Jonah." },
  { id: "jonah28", question: "What imagery does Jonah use?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Depths and waters" }, { label: "C", text: "Light" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "Jonah 2", explanation: "Jonah describes drowning imagery." },
  { id: "jonah29", question: "What surrounded Jonah's head?", options: [{ label: "A", text: "Chains" }, { label: "B", text: "Seaweed" }, { label: "C", text: "Sand" }, { label: "D", text: "Ropes" }], correctAnswer: "B", verse: "Jonah 2:5", explanation: "Seaweed imagery." },
  { id: "jonah30", question: "What does Jonah remember?", options: [{ label: "A", text: "Nineveh" }, { label: "B", text: "The Lord" }, { label: "C", text: "The storm" }, { label: "D", text: "The sailors" }], correctAnswer: "B", verse: "Jonah 2:7", explanation: "Jonah turns back to God." },
  { id: "jonah31", question: "Where does Jonah's prayer go?", options: [{ label: "A", text: "The sea" }, { label: "B", text: "God's holy temple" }, { label: "C", text: "Nineveh" }, { label: "D", text: "Joppa" }], correctAnswer: "B", verse: "Jonah 2:7", explanation: "God hears from His temple." },
  { id: "jonah32", question: "What does Jonah say about idols?", options: [{ label: "A", text: "They save" }, { label: "B", text: "They forfeit grace" }, { label: "C", text: "They protect" }, { label: "D", text: "They bless" }], correctAnswer: "B", verse: "Jonah 2:8", explanation: "Idols are empty." },
  { id: "jonah33", question: "What does Jonah promise?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Thanksgiving and vows" }, { label: "C", text: "Escape" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Jonah 2:9", explanation: "Jonah vows obedience." },
  { id: "jonah34", question: "What does Jonah declare?", options: [{ label: "A", text: "Judgment is near" }, { label: "B", text: "Salvation belongs to the Lord" }, { label: "C", text: "Nineveh will fall" }, { label: "D", text: "God is distant" }], correctAnswer: "B", verse: "Jonah 2:9", explanation: "Central theme of the book." },
  { id: "jonah35", question: "What does the Lord command the fish?", options: [{ label: "A", text: "Swim away" }, { label: "B", text: "Vomit Jonah onto land" }, { label: "C", text: "Dive deeper" }, { label: "D", text: "Stay still" }], correctAnswer: "B", verse: "Jonah 2:10", explanation: "Jonah is released." },
  { id: "jonah36", question: "What comes to Jonah again?", options: [{ label: "A", text: "Storm" }, { label: "B", text: "The word of the Lord" }, { label: "C", text: "Fear" }, { label: "D", text: "Sleep" }], correctAnswer: "B", verse: "Jonah 3:1", explanation: "God gives Jonah a second chance." },
  { id: "jonah37", question: "Where is Jonah sent the second time?", options: [{ label: "A", text: "Tarshish" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Joppa" }], correctAnswer: "B", verse: "Jonah 3:2", explanation: "Same mission renewed." },
  { id: "jonah38", question: "How is Nineveh described?", options: [{ label: "A", text: "Small city" }, { label: "B", text: "Very large city" }, { label: "C", text: "Abandoned city" }, { label: "D", text: "Holy city" }], correctAnswer: "B", verse: "Jonah 3:3", explanation: "A great city." },
  { id: "jonah39", question: "How long does it take to walk across Nineveh?", options: [{ label: "A", text: "One day" }, { label: "B", text: "Three days" }, { label: "C", text: "Seven days" }, { label: "D", text: "Forty days" }], correctAnswer: "B", verse: "Jonah 3:3", explanation: "A three-day journey." },
  { id: "jonah40", question: "What message does Jonah proclaim?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Forty days until overthrow" }, { label: "C", text: "Peace" }, { label: "D", text: "Prosperity" }], correctAnswer: "B", verse: "Jonah 3:4", explanation: "Judgment warning." },
  { id: "jonah41", question: "How do the people of Nineveh respond?", options: [{ label: "A", text: "They mock" }, { label: "B", text: "They believe God" }, { label: "C", text: "They attack Jonah" }, { label: "D", text: "They ignore" }], correctAnswer: "B", verse: "Jonah 3:5", explanation: "They believe the message." },
  { id: "jonah42", question: "What do they proclaim?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Fast" }, { label: "C", text: "War" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Jonah 3:5", explanation: "A fast is declared." },
  { id: "jonah43", question: "What do the people wear?", options: [{ label: "A", text: "Robes" }, { label: "B", text: "Sackcloth" }, { label: "C", text: "Armor" }, { label: "D", text: "Crowns" }], correctAnswer: "B", verse: "Jonah 3:5", explanation: "Sign of repentance." },
  { id: "jonah44", question: "Who hears about the message?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "King of Nineveh" }, { label: "C", text: "Soldiers" }, { label: "D", text: "Merchants" }], correctAnswer: "B", verse: "Jonah 3:6", explanation: "The king responds." },
  { id: "jonah45", question: "What does the king do?", options: [{ label: "A", text: "Laughs" }, { label: "B", text: "Leaves his throne" }, { label: "C", text: "Kills Jonah" }, { label: "D", text: "Ignores" }], correctAnswer: "B", verse: "Jonah 3:6", explanation: "Humility shown." },
  { id: "jonah46", question: "What does the king cover himself with?", options: [{ label: "A", text: "Royal robes" }, { label: "B", text: "Sackcloth" }, { label: "C", text: "Ashes" }, { label: "D", text: "Chains" }], correctAnswer: "B", verse: "Jonah 3:6", explanation: "Repentance sign." },
  { id: "jonah47", question: "Where does the king sit?", options: [{ label: "A", text: "Throne" }, { label: "B", text: "Ashes" }, { label: "C", text: "Temple" }, { label: "D", text: "Gate" }], correctAnswer: "B", verse: "Jonah 3:6", explanation: "Humbling himself." },
  { id: "jonah48", question: "What decree is issued?", options: [{ label: "A", text: "Feast" }, { label: "B", text: "Everyone must fast" }, { label: "C", text: "War" }, { label: "D", text: "Celebration" }], correctAnswer: "B", verse: "Jonah 3:7", explanation: "Citywide repentance." },
  { id: "jonah49", question: "Who must not eat or drink?", options: [{ label: "A", text: "People only" }, { label: "B", text: "People and animals" }, { label: "C", text: "Priests" }, { label: "D", text: "Children" }], correctAnswer: "B", verse: "Jonah 3:7", explanation: "Total participation." },
  { id: "jonah50", question: "What must everyone do?", options: [{ label: "A", text: "Pray earnestly" }, { label: "B", text: "Sleep" }, { label: "C", text: "Travel" }, { label: "D", text: "Fight" }], correctAnswer: "A", verse: "Jonah 3:8", explanation: "Turn to God." },
  { id: "jonah51", question: "What must they turn from?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Evil ways and violence" }, { label: "C", text: "Food" }, { label: "D", text: "Travel" }], correctAnswer: "B", verse: "Jonah 3:8", explanation: "True repentance." },
  { id: "jonah52", question: "What hope does the king express?", options: [{ label: "A", text: "Certainty" }, { label: "B", text: "God may relent" }, { label: "C", text: "No chance" }, { label: "D", text: "Escape by force" }], correctAnswer: "B", verse: "Jonah 3:9", explanation: "Hope in God's mercy." },
  { id: "jonah53", question: "What does God see?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Their repentance" }, { label: "C", text: "Their wealth" }, { label: "D", text: "Their power" }], correctAnswer: "B", verse: "Jonah 3:10", explanation: "God sees their actions." },
  { id: "jonah54", question: "What does God do?", options: [{ label: "A", text: "Destroys Nineveh" }, { label: "B", text: "Relents from disaster" }, { label: "C", text: "Delays" }, { label: "D", text: "Ignores" }], correctAnswer: "B", verse: "Jonah 3:10", explanation: "God shows mercy." },
  { id: "jonah55", question: "How does Jonah feel about this?", options: [{ label: "A", text: "Joyful" }, { label: "B", text: "Angry" }, { label: "C", text: "Relieved" }, { label: "D", text: "Indifferent" }], correctAnswer: "B", verse: "Jonah 4:1", explanation: "Jonah is displeased." },
  { id: "jonah56", question: "What does Jonah pray in anger?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Complaint" }, { label: "C", text: "Confession" }, { label: "D", text: "Thanksgiving" }], correctAnswer: "B", verse: "Jonah 4:2", explanation: "Jonah complains to God." },
  { id: "jonah57", question: "What attribute of God angers Jonah?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Mercy" }, { label: "C", text: "Justice" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jonah 4:2", explanation: "God's compassion." },
  { id: "jonah58", question: "What does Jonah ask for?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Death" }, { label: "C", text: "Wealth" }, { label: "D", text: "Forgiveness" }], correctAnswer: "B", verse: "Jonah 4:3", explanation: "Jonah wants to die." },
  { id: "jonah59", question: "What question does God ask Jonah?", options: [{ label: "A", text: "Why did you flee?" }, { label: "B", text: "Is it right for you to be angry?" }, { label: "C", text: "Do you repent?" }, { label: "D", text: "Will you obey?" }], correctAnswer: "B", verse: "Jonah 4:4", explanation: "God challenges Jonah's anger." },
  { id: "jonah60", question: "Where does Jonah go to watch the city?", options: [{ label: "A", text: "Inside Nineveh" }, { label: "B", text: "East of the city" }, { label: "C", text: "West of the city" }, { label: "D", text: "North gate" }], correctAnswer: "B", verse: "Jonah 4:5", explanation: "Jonah waits outside." },
  { id: "jonah61", question: "What does Jonah build?", options: [{ label: "A", text: "House" }, { label: "B", text: "Shelter" }, { label: "C", text: "Altar" }, { label: "D", text: "Wall" }], correctAnswer: "B", verse: "Jonah 4:5", explanation: "Jonah builds a shelter." },
  { id: "jonah62", question: "What does God appoint to grow?", options: [{ label: "A", text: "Tree" }, { label: "B", text: "Plant" }, { label: "C", text: "Vine" }, { label: "D", text: "Bush" }], correctAnswer: "B", verse: "Jonah 4:6", explanation: "God appoints a plant." },
  { id: "jonah63", question: "Why does God provide the plant?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Shade" }, { label: "C", text: "Decoration" }, { label: "D", text: "Shelter for animals" }], correctAnswer: "B", verse: "Jonah 4:6", explanation: "To give Jonah shade." },
  { id: "jonah64", question: "How does Jonah feel about the plant?", options: [{ label: "A", text: "Angry" }, { label: "B", text: "Very happy" }, { label: "C", text: "Indifferent" }, { label: "D", text: "Afraid" }], correctAnswer: "B", verse: "Jonah 4:6", explanation: "Jonah is pleased." },
  { id: "jonah65", question: "What does God appoint next?", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Worm" }, { label: "C", text: "Storm" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Jonah 4:7", explanation: "The worm destroys the plant." },
  { id: "jonah66", question: "When does the worm attack?", options: [{ label: "A", text: "Night" }, { label: "B", text: "Dawn" }, { label: "C", text: "Noon" }, { label: "D", text: "Evening" }], correctAnswer: "B", verse: "Jonah 4:7", explanation: "At dawn." },
  { id: "jonah67", question: "What happens to the plant?", options: [{ label: "A", text: "Grows more" }, { label: "B", text: "Withers" }, { label: "C", text: "Moves" }, { label: "D", text: "Burns" }], correctAnswer: "B", verse: "Jonah 4:7", explanation: "The plant dies." },
  { id: "jonah68", question: "What does God send after the plant dies?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Scorching east wind" }, { label: "C", text: "Storm" }, { label: "D", text: "Fish" }], correctAnswer: "B", verse: "Jonah 4:8", explanation: "Harsh conditions." },
  { id: "jonah69", question: "What happens to Jonah?", options: [{ label: "A", text: "He sleeps" }, { label: "B", text: "He faints" }, { label: "C", text: "He runs" }, { label: "D", text: "He rejoices" }], correctAnswer: "B", verse: "Jonah 4:8", explanation: "Jonah becomes faint." },
  { id: "jonah70", question: "What does Jonah ask for again?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Death" }, { label: "C", text: "Water" }, { label: "D", text: "Shade" }], correctAnswer: "B", verse: "Jonah 4:8", explanation: "Jonah wants to die again." },
  { id: "jonah71", question: "What does God ask about the plant?", options: [{ label: "A", text: "Did you plant it?" }, { label: "B", text: "Is it right to be angry?" }, { label: "C", text: "Do you miss it?" }, { label: "D", text: "Will it grow back?" }], correctAnswer: "B", verse: "Jonah 4:9", explanation: "God confronts Jonah." },
  { id: "jonah72", question: "How does Jonah answer?", options: [{ label: "A", text: "Humbly" }, { label: "B", text: "Yes, angry enough to die" }, { label: "C", text: "Silently" }, { label: "D", text: "With repentance" }], correctAnswer: "B", verse: "Jonah 4:9", explanation: "Jonah doubles down." },
  { id: "jonah73", question: "What did Jonah not do for the plant?", options: [{ label: "A", text: "Plant it" }, { label: "B", text: "Make it grow" }, { label: "C", text: "Care for it" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Jonah 4:10", explanation: "Jonah did nothing for it." },
  { id: "jonah74", question: "How long did the plant last?", options: [{ label: "A", text: "Many years" }, { label: "B", text: "One night" }, { label: "C", text: "Three days" }, { label: "D", text: "Forty days" }], correctAnswer: "B", verse: "Jonah 4:10", explanation: "It appeared and perished quickly." },
  { id: "jonah75", question: "What city does God mention?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Babylon" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Jonah 4:11", explanation: "God points to Nineveh." },
  { id: "jonah76", question: "How many people are described as not knowing right from left?", options: [{ label: "A", text: "12,000" }, { label: "B", text: "120,000" }, { label: "C", text: "40,000" }, { label: "D", text: "70,000" }], correctAnswer: "B", verse: "Jonah 4:11", explanation: "God emphasizes their ignorance." },
  { id: "jonah77", question: "What else does God care about?", options: [{ label: "A", text: "Buildings" }, { label: "B", text: "Many animals" }, { label: "C", text: "Weapons" }, { label: "D", text: "Gold" }], correctAnswer: "B", verse: "Jonah 4:11", explanation: "God's compassion extends broadly." },
  { id: "jonah78", question: "What does Jonah never do at the end?", options: [{ label: "A", text: "Speak" }, { label: "B", text: "Repent explicitly" }, { label: "C", text: "Pray" }, { label: "D", text: "Leave" }], correctAnswer: "B", verse: "Jonah 4", explanation: "The book ends with a question." },
  { id: "jonah79", question: "How does the book of Jonah end?", options: [{ label: "A", text: "With judgment" }, { label: "B", text: "With a question from God" }, { label: "C", text: "With Jonah obeying" }, { label: "D", text: "With destruction" }], correctAnswer: "B", verse: "Jonah 4:11", explanation: "An open-ended ending." },
  { id: "jonah80", question: "What major theme does Jonah highlight?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God's mercy" }, { label: "C", text: "Kingship" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Jonah", explanation: "God's compassion is central." },
  { id: "jonah81", question: "Who receives mercy in Jonah?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "Gentiles and sailors" }, { label: "C", text: "Prophets only" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Jonah", explanation: "God's mercy is universal." },
  { id: "jonah82", question: "What does Jonah resist?", options: [{ label: "A", text: "Power" }, { label: "B", text: "God's compassion" }, { label: "C", text: "Judgment" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Jonah 4", explanation: "Jonah struggles with mercy." },
  { id: "jonah83", question: "What does Jonah reveal about prophets?", options: [{ label: "A", text: "They are perfect" }, { label: "B", text: "They can struggle with obedience" }, { label: "C", text: "They never fear" }, { label: "D", text: "They always rejoice" }], correctAnswer: "B", verse: "Jonah", explanation: "Prophets are human." },
  { id: "jonah84", question: "What lesson does the plant teach?", options: [{ label: "A", text: "Power of nature" }, { label: "B", text: "God's compassion outweighs comfort" }, { label: "C", text: "Work ethic" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "Jonah 4", explanation: "God values people over comfort." },
  { id: "jonah85", question: "What contrast is central?", options: [{ label: "A", text: "Light and dark" }, { label: "B", text: "Jonah's anger and God's mercy" }, { label: "C", text: "Sea and land" }, { label: "D", text: "Rich and poor" }], correctAnswer: "B", verse: "Jonah", explanation: "Main tension of the book." },
  { id: "jonah86", question: "What does Jonah teach about repentance?", options: [{ label: "A", text: "It is optional" }, { label: "B", text: "God responds to genuine repentance" }, { label: "C", text: "It is ritual only" }, { label: "D", text: "It is ineffective" }], correctAnswer: "B", verse: "Jonah 3", explanation: "Repentance leads to mercy." },
  { id: "jonah87", question: "What does Jonah show about God's mission?", options: [{ label: "A", text: "Only Israel matters" }, { label: "B", text: "God cares for all nations" }, { label: "C", text: "Judgment only" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jonah", explanation: "God's concern is global." },
  { id: "jonah88", question: "What happens when Jonah runs from God?", options: [{ label: "A", text: "He succeeds" }, { label: "B", text: "God pursues him" }, { label: "C", text: "Nothing" }, { label: "D", text: "He is forgotten" }], correctAnswer: "B", verse: "Jonah 1", explanation: "God pursues His prophet." },
  { id: "jonah89", question: "What does Jonah show about God's control?", options: [{ label: "A", text: "Limited" }, { label: "B", text: "Sovereign over nature" }, { label: "C", text: "Dependent" }, { label: "D", text: "Passive" }], correctAnswer: "B", verse: "Jonah", explanation: "God controls storms, fish, plants." },
  { id: "jonah90", question: "What is ironic about Jonah?", options: [{ label: "A", text: "He fears the sea" }, { label: "B", text: "He preaches repentance but resists mercy" }, { label: "C", text: "He obeys fully" }, { label: "D", text: "He loves Nineveh" }], correctAnswer: "B", verse: "Jonah", explanation: "Irony drives the story." },
  { id: "jonah91", question: "What does Jonah teach about obedience?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Delayed obedience brings hardship" }, { label: "C", text: "Unnecessary" }, { label: "D", text: "Automatic" }], correctAnswer: "B", verse: "Jonah", explanation: "Running causes consequences." },
  { id: "jonah92", question: "What does Jonah reveal about God's patience?", options: [{ label: "A", text: "Short" }, { label: "B", text: "Long-suffering" }, { label: "C", text: "Absent" }, { label: "D", text: "Selective" }], correctAnswer: "B", verse: "Jonah", explanation: "God is patient." },
  { id: "jonah93", question: "What truth does Jonah 2:9 state?", options: [{ label: "A", text: "Judgment belongs to the Lord" }, { label: "B", text: "Salvation belongs to the Lord" }, { label: "C", text: "Mercy belongs to Jonah" }, { label: "D", text: "Power belongs to kings" }], correctAnswer: "B", verse: "Jonah 2:9", explanation: "Core declaration." },
  { id: "jonah94", question: "What group repents most fully?", options: [{ label: "A", text: "Jonah" }, { label: "B", text: "Ninevites" }, { label: "C", text: "Sailors" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Jonah 3", explanation: "Citywide repentance." },
  { id: "jonah95", question: "What lesson does Jonah leave unanswered?", options: [{ label: "A", text: "Will Jonah change?" }, { label: "B", text: "Will God judge?" }, { label: "C", text: "Will Nineveh fall?" }, { label: "D", text: "Will Israel repent?" }], correctAnswer: "A", verse: "Jonah 4", explanation: "Open-ended conclusion." },
  { id: "jonah96", question: "What literary feature is Jonah known for?", options: [{ label: "A", text: "Genealogies" }, { label: "B", text: "Satire and irony" }, { label: "C", text: "Law codes" }, { label: "D", text: "Proverbs" }], correctAnswer: "B", verse: "Jonah", explanation: "Irony highlights the message." },
  { id: "jonah97", question: "What does Jonah emphasize about God?", options: [{ label: "A", text: "Harshness" }, { label: "B", text: "Compassion and mercy" }, { label: "C", text: "Distance" }, { label: "D", text: "Indifference" }], correctAnswer: "B", verse: "Jonah", explanation: "God is merciful." },
  { id: "jonah98", question: "What response does God desire?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Repentance" }, { label: "C", text: "Fear only" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Jonah 3", explanation: "Repentance leads to life." },
  { id: "jonah99", question: "What final truth does Jonah teach?", options: [{ label: "A", text: "God favors one nation" }, { label: "B", text: "God's mercy extends beyond boundaries" }, { label: "C", text: "Judgment is final always" }, { label: "D", text: "Prophets are flawless" }], correctAnswer: "B", verse: "Jonah", explanation: "God's mercy is wide." },
  { id: "jonah100", question: "What question does God leave readers with?", options: [{ label: "A", text: "Will you obey?" }, { label: "B", text: "Should I not be concerned for Nineveh?" }, { label: "C", text: "Will Jonah return?" }, { label: "D", text: "Who will judge?" }], correctAnswer: "B", verse: "Jonah 4:11", explanation: "God invites reflection on mercy." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JonahTriviaPage() {
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
          .eq("book", "jonah");

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
          book: "jonah",
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
            book: "jonah",
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
    if (score === 10) return "Perfect! You're a Jonah expert!";
    if (score >= 8) return "Excellent! You know Jonah well!";
    if (score >= 6) return "Good job! Keep studying Jonah!";
    if (score >= 4) return "Nice try! Jonah has much to explore!";
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
              href="/bible-trivia/jonah"
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

