"use client";

import { useState, useEffect } from "react";
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
    if (!response.ok) throw new Error('Failed to fetch verse');
    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error fetching verse:', error);
    return '';
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "exodus01", question: "Who was the leader God chose to deliver Israel from Egypt?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Joseph" }, { label: "C", text: "Moses" }, { label: "D", text: "Joshua" }], correctAnswer: "C", verse: "Exodus 3:10", explanation: "God called Moses to lead His people out of slavery." },
  { id: "exodus02", question: "What sign did God give Moses at the burning bush?", options: [{ label: "A", text: "Fire from heaven" }, { label: "B", text: "A rod turning into a serpent" }, { label: "C", text: "Water turning to blood" }, { label: "D", text: "The bush burned but was not consumed" }], correctAnswer: "D", verse: "Exodus 3:2", explanation: "The burning bush showed God's holy presence." },
  { id: "exodus03", question: "What name did God reveal to Moses?", options: [{ label: "A", text: "El Shaddai" }, { label: "B", text: "I AM WHO I AM" }, { label: "C", text: "Yahweh Sabaoth" }, { label: "D", text: "Adonai" }], correctAnswer: "B", verse: "Exodus 3:14", explanation: "God revealed His eternal, self-existent nature." },
  { id: "exodus04", question: "Who was Moses' spokesman before Pharaoh?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Hur" }, { label: "C", text: "Aaron" }, { label: "D", text: "Caleb" }], correctAnswer: "C", verse: "Exodus 4:14–16", explanation: "Aaron spoke on Moses' behalf." },
  { id: "exodus05", question: "How many plagues did God send on Egypt?", options: [{ label: "A", text: "7" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "3" }], correctAnswer: "B", verse: "Exodus 7–12", explanation: "The ten plagues displayed God's power." },
  { id: "exodus06", question: "Which plague caused darkness over Egypt?", options: [{ label: "A", text: "Locusts" }, { label: "B", text: "Hail" }, { label: "C", text: "Darkness" }, { label: "D", text: "Frogs" }], correctAnswer: "C", verse: "Exodus 10:21", explanation: "Darkness covered Egypt for three days." },
  { id: "exodus07", question: "What was the final plague?", options: [{ label: "A", text: "Death of livestock" }, { label: "B", text: "Death of firstborn" }, { label: "C", text: "Hail" }, { label: "D", text: "Boils" }], correctAnswer: "B", verse: "Exodus 12:29", explanation: "The death of the firstborn led Pharaoh to release Israel." },
  { id: "exodus08", question: "What protected Israel during the final plague?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Blood on the doorposts" }, { label: "C", text: "Fasting" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Exodus 12:7", explanation: "The blood marked obedience and faith." },
  { id: "exodus09", question: "What feast commemorates Israel's deliverance?", options: [{ label: "A", text: "Pentecost" }, { label: "B", text: "Passover" }, { label: "C", text: "Tabernacles" }, { label: "D", text: "Purim" }], correctAnswer: "B", verse: "Exodus 12:14", explanation: "Passover remembers God's deliverance." },
  { id: "exodus10", question: "What body of water did Israel cross?", options: [{ label: "A", text: "Jordan River" }, { label: "B", text: "Nile River" }, { label: "C", text: "Red Sea" }, { label: "D", text: "Dead Sea" }], correctAnswer: "C", verse: "Exodus 14:21", explanation: "God parted the Red Sea." },
  { id: "exodus11", question: "What happened to Pharaoh's army?", options: [{ label: "A", text: "They retreated" }, { label: "B", text: "They surrendered" }, { label: "C", text: "They drowned" }, { label: "D", text: "They escaped" }], correctAnswer: "C", verse: "Exodus 14:28", explanation: "The sea returned and destroyed them." },
  { id: "exodus12", question: "What did God provide in the wilderness for food?", options: [{ label: "A", text: "Quail only" }, { label: "B", text: "Bread from Egypt" }, { label: "C", text: "Manna" }, { label: "D", text: "Fish" }], correctAnswer: "C", verse: "Exodus 16:15", explanation: "Manna came daily from heaven." },
  { id: "exodus13", question: "How often did God provide manna?", options: [{ label: "A", text: "Weekly" }, { label: "B", text: "Monthly" }, { label: "C", text: "Daily" }, { label: "D", text: "Yearly" }], correctAnswer: "C", verse: "Exodus 16:4", explanation: "Israel learned daily dependence on God." },
  { id: "exodus14", question: "Where did Moses receive the Ten Commandments?", options: [{ label: "A", text: "Mount Zion" }, { label: "B", text: "Mount Carmel" }, { label: "C", text: "Mount Sinai" }, { label: "D", text: "Mount Nebo" }], correctAnswer: "C", verse: "Exodus 19:20", explanation: "God revealed His law on Sinai." },
  { id: "exodus15", question: "How many commandments did God give?", options: [{ label: "A", text: "7" }, { label: "B", text: "12" }, { label: "C", text: "10" }, { label: "D", text: "5" }], correctAnswer: "C", verse: "Exodus 20:1–17", explanation: "The Ten Commandments form God's moral law." },
  { id: "exodus16", question: "What idol did Israel make while Moses was on the mountain?", options: [{ label: "A", text: "Golden calf" }, { label: "B", text: "Bronze serpent" }, { label: "C", text: "Stone idol" }, { label: "D", text: "Golden eagle" }], correctAnswer: "A", verse: "Exodus 32:4", explanation: "Israel sinned by worshiping the calf." },
  { id: "exodus17", question: "Who helped hold up Moses' hands during battle?", options: [{ label: "A", text: "Joshua and Caleb" }, { label: "B", text: "Aaron and Hur" }, { label: "C", text: "Elders" }, { label: "D", text: "Levites" }], correctAnswer: "B", verse: "Exodus 17:12", explanation: "Victory depended on God's strength." },
  { id: "exodus18", question: "Who advised Moses to delegate leadership?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Joshua" }, { label: "C", text: "Jethro" }, { label: "D", text: "Hur" }], correctAnswer: "C", verse: "Exodus 18:17–18", explanation: "Jethro gave wise counsel." },
  { id: "exodus19", question: "What tribe was set apart for priesthood?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Levi" }, { label: "C", text: "Benjamin" }, { label: "D", text: "Joseph" }], correctAnswer: "B", verse: "Exodus 32:26", explanation: "The Levites were chosen for service." },
  { id: "exodus20", question: "What structure symbolized God's dwelling?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Tabernacle" }, { label: "C", text: "Altar" }, { label: "D", text: "Ark" }], correctAnswer: "B", verse: "Exodus 25:8", explanation: "God dwelt among His people." },
  { id: "exodus21", question: "What covered the tabernacle?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Cloud and glory" }, { label: "C", text: "Smoke" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Exodus 40:34", explanation: "God's glory filled it." },
  { id: "exodus22", question: "What guided Israel by night?", options: [{ label: "A", text: "Stars" }, { label: "B", text: "Fire" }, { label: "C", text: "Moon" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Exodus 13:21", explanation: "God led them day and night." },
  { id: "exodus23", question: "What guided Israel by day?", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Cloud" }, { label: "C", text: "Sun" }, { label: "D", text: "Smoke" }], correctAnswer: "B", verse: "Exodus 13:21", explanation: "The pillar of cloud guided them." },
  { id: "exodus24", question: "What was inside the Ark of the Covenant?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Manna" }, { label: "C", text: "Tablets of the law" }, { label: "D", text: "Scrolls" }], correctAnswer: "C", verse: "Exodus 25:16", explanation: "The tablets represented God's covenant." },
  { id: "exodus25", question: "Who crafted the tabernacle?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Bezalel" }, { label: "C", text: "Moses" }, { label: "D", text: "Joshua" }], correctAnswer: "B", verse: "Exodus 31:2", explanation: "God gifted Bezalel with skill." },
  { id: "exodus26", question: "What happened when Moses came down the mountain?", options: [{ label: "A", text: "He rejoiced" }, { label: "B", text: "He broke the tablets" }, { label: "C", text: "He prayed" }, { label: "D", text: "He fasted" }], correctAnswer: "B", verse: "Exodus 32:19", explanation: "The broken tablets showed covenant broken." },
  { id: "exodus27", question: "How long was Moses on Mount Sinai?", options: [{ label: "A", text: "7 days" }, { label: "B", text: "30 days" }, { label: "C", text: "40 days" }, { label: "D", text: "70 days" }], correctAnswer: "C", verse: "Exodus 24:18", explanation: "Forty days marked testing and revelation." },
  { id: "exodus28", question: "What did God proclaim about Himself to Moses?", options: [{ label: "A", text: "Powerful" }, { label: "B", text: "Merciful and gracious" }, { label: "C", text: "Strict" }, { label: "D", text: "Distant" }], correctAnswer: "B", verse: "Exodus 34:6", explanation: "God revealed His compassionate nature." },
  { id: "exodus29", question: "What happened to Moses' face after meeting God?", options: [{ label: "A", text: "It burned" }, { label: "B", text: "It shone" }, { label: "C", text: "It aged" }, { label: "D", text: "It darkened" }], correctAnswer: "B", verse: "Exodus 34:29", explanation: "God's glory reflected on Moses." },
  { id: "exodus30", question: "How does Exodus end?", options: [{ label: "A", text: "Crossing Jordan" }, { label: "B", text: "Entering Canaan" }, { label: "C", text: "God filling the tabernacle" }, { label: "D", text: "Death of Moses" }], correctAnswer: "C", verse: "Exodus 40:34", explanation: "God dwelled among His people." },
  { id: "exodus31", question: "What was the first plague God sent to Egypt?", options: [{ label: "A", text: "Darkness" }, { label: "B", text: "Blood" }, { label: "C", text: "Hail" }, { label: "D", text: "Locusts" }], correctAnswer: "B", verse: "Exodus 7:20", explanation: "The first plague turned the waters into blood." },
  { id: "exodus32", question: "What was one of the signs and wonders Moses performed?", options: [{ label: "A", text: "Raising the dead" }, { label: "B", text: "Moses' staff turning into a serpent" }, { label: "C", text: "Parting clouds" }, { label: "D", text: "Creating water from rocks" }], correctAnswer: "B", verse: "Exodus 4:3", explanation: "Moses' staff became a serpent as a sign to Pharaoh." },
  { id: "exodus33", question: "What was the land of Egypt plagued with before the darkness?", options: [{ label: "A", text: "Hail" }, { label: "B", text: "Locust swarms" }, { label: "C", text: "Boils" }, { label: "D", text: "Lice" }], correctAnswer: "A", verse: "Exodus 9:23", explanation: "Hail destroyed crops and livestock in Egypt." },
  { id: "exodus34", question: "How many days did the Israelites wander in the wilderness?", options: [{ label: "A", text: "20 years" }, { label: "B", text: "40 years" }, { label: "C", text: "50 years" }, { label: "D", text: "30 years" }], correctAnswer: "B", verse: "Numbers 14:33", explanation: "Israel wandered 40 years for disobedience." },
  { id: "exodus35", question: "What did God give Israel at Marah in the wilderness?", options: [{ label: "A", text: "Water from a rock" }, { label: "B", text: "Bitter water made sweet" }, { label: "C", text: "Fish and bread" }, { label: "D", text: "Manna and quail" }], correctAnswer: "B", verse: "Exodus 15:25", explanation: "God made bitter water sweet for Israel." },
  { id: "exodus36", question: "What was the first commandment in the Ten Commandments?", options: [{ label: "A", text: "Honor your parents" }, { label: "B", text: "You shall have no other gods before Me" }, { label: "C", text: "Do not steal" }, { label: "D", text: "Do not commit adultery" }], correctAnswer: "B", verse: "Exodus 20:3", explanation: "God demanded exclusive worship and allegiance." },
  { id: "exodus37", question: "What did God command Israel to do on the seventh day?", options: [{ label: "A", text: "Fast and pray" }, { label: "B", text: "Work extra hard" }, { label: "C", text: "Rest and sanctify it" }, { label: "D", text: "Offer sacrifices" }], correctAnswer: "C", verse: "Exodus 20:8-10", explanation: "The Sabbath was set apart as a day of rest." },
  { id: "exodus38", question: "What material was the Ark of the Covenant made of?", options: [{ label: "A", text: "Wood" }, { label: "B", text: "Bronze" }, { label: "C", text: "Acacia wood overlaid with gold" }, { label: "D", text: "Silver" }], correctAnswer: "C", verse: "Exodus 25:10-11", explanation: "The Ark was made of acacia wood and covered in gold." },
  { id: "exodus39", question: "What was placed on top of the Ark of the Covenant?", options: [{ label: "A", text: "A crown" }, { label: "B", text: "The mercy seat" }, { label: "C", text: "A lamp" }, { label: "D", text: "Incense" }], correctAnswer: "B", verse: "Exodus 25:17", explanation: "The mercy seat was where God's presence dwelt." },
  { id: "exodus40", question: "How many sons did Levi have according to Exodus?", options: [{ label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "5" }], correctAnswer: "B", verse: "Exodus 6:16", explanation: "Levi had three sons: Gershon, Kohath, and Merari." },
  { id: "exodus41", question: "What did God require as a remembrance of deliverance?", options: [{ label: "A", text: "A weekly fast" }, { label: "B", text: "Annual feast of Passover" }, { label: "C", text: "Daily prayers" }, { label: "D", text: "Pilgrimages" }], correctAnswer: "B", verse: "Exodus 12:14", explanation: "Passover became an eternal statute." },
  { id: "exodus42", question: "What were the names of Moses' parents?", options: [{ label: "A", text: "Jacob and Leah" }, { label: "B", text: "Amram and Jochebed" }, { label: "C", text: "Kohath and Levannah" }, { label: "D", text: "Levi and Dinah" }], correctAnswer: "B", verse: "Exodus 6:20", explanation: "Moses was born to Amram and Jochebed." },
  { id: "exodus43", question: "What did the golden calf represent to Israel?", options: [{ label: "A", text: "A true god" }, { label: "B", text: "A false god modeled after Egyptian worship" }, { label: "C", text: "Wealth and prosperity" }, { label: "D", text: "A symbol of freedom" }], correctAnswer: "B", verse: "Exodus 32:8", explanation: "Israel turned to idolatry while Moses was on the mountain." },
  { id: "exodus44", question: "What did Moses do when he saw the golden calf?", options: [{ label: "A", text: "Prayed for Israel" }, { label: "B", text: "Broke the tablets and destroyed the calf" }, { label: "C", text: "Fled into the wilderness" }, { label: "D", text: "Wept silently" }], correctAnswer: "B", verse: "Exodus 32:19", explanation: "Moses' anger expressed God's judgment on sin." },
  { id: "exodus45", question: "How did God identify Himself to Moses at the burning bush?", options: [{ label: "A", text: "As the God of power" }, { label: "B", text: "As the God of Abraham, Isaac, and Jacob" }, { label: "C", text: "As the God of nature" }, { label: "D", text: "As the God of war" }], correctAnswer: "B", verse: "Exodus 3:6", explanation: "God connected Himself to the patriarchal covenant." },
  { id: "exodus46", question: "What was the purpose of the pillar of cloud and fire?", options: [{ label: "A", text: "For warmth" }, { label: "B", text: "For decoration" }, { label: "C", text: "To guide and protect Israel" }, { label: "D", text: "To frighten enemies" }], correctAnswer: "C", verse: "Exodus 13:21", explanation: "God's presence literally led and protected His people." },
  { id: "exodus47", question: "What happened at the Red Sea when Israel reached it?", options: [{ label: "A", text: "It froze over" }, { label: "B", text: "God parted the waters" }, { label: "C", text: "Ships appeared to transport them" }, { label: "D", text: "A bridge miraculously formed" }], correctAnswer: "B", verse: "Exodus 14:21", explanation: "God parted the sea with a strong east wind." },
  { id: "exodus48", question: "What instructions did God give about the Passover lamb?", options: [{ label: "A", text: "Any animal could be used" }, { label: "B", text: "It must be a year-old male without blemish" }, { label: "C", text: "It must be offered at the temple" }, { label: "D", text: "It must be burned completely" }], correctAnswer: "B", verse: "Exodus 12:5", explanation: "The lamb had to be perfect, symbolizing Christ." },
  { id: "exodus49", question: "Why did God harden Pharaoh's heart?", options: [{ label: "A", text: "To punish him" }, { label: "B", text: "To demonstrate God's power and judgment" }, { label: "C", text: "To extend Israel's slavery" }, { label: "D", text: "To test Pharaoh's faith" }], correctAnswer: "B", verse: "Exodus 7:3-4", explanation: "God's hardening displayed His power to all Egypt." },
  { id: "exodus50", question: "What was the Day of Atonement foreshadowed in Exodus?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "The blood sacrifice for sin" }, { label: "C", text: "The tabernacle dedication" }, { label: "D", text: "The Festival of Weeks" }], correctAnswer: "B", verse: "Exodus 12:13", explanation: "The blood covenant pointed to Christ's sacrifice." },
  { id: "exodus51", question: "What materials were used to build the tabernacle?", options: [{ label: "A", text: "Stone and bronze" }, { label: "B", text: "Acacia wood, gold, silver, and fine linen" }, { label: "C", text: "Marble and cedar" }, { label: "D", text: "Stone and wood" }], correctAnswer: "B", verse: "Exodus 35:5-9", explanation: "The materials were precious and symbolic." },
  { id: "exodus52", question: "Who was appointed as the first high priest?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Bezalel" }, { label: "C", text: "Aaron" }, { label: "D", text: "Nadab" }], correctAnswer: "C", verse: "Exodus 28:1", explanation: "Aaron served as high priest for Israel." },
  { id: "exodus53", question: "What did the priestly breastplate contain?", options: [{ label: "A", text: "The Ten Commandments" }, { label: "B", text: "Twelve precious stones representing the tribes" }, { label: "C", text: "Gold and silver only" }, { label: "D", text: "Incense and spices" }], correctAnswer: "B", verse: "Exodus 28:21", explanation: "Each tribe was represented on the breastplate." },
  { id: "exodus54", question: "What was the purpose of the bronze serpent mentioned in Exodus?", options: [{ label: "A", text: "To heal snake bites in the wilderness" }, { label: "B", text: "As a symbol of judgment" }, { label: "C", text: "To be worshipped" }, { label: "D", text: "To protect the camp" }], correctAnswer: "A", verse: "Numbers 21:8-9", explanation: "Those who looked upon it were healed." },
  { id: "exodus55", question: "What was the wilderness called where Israel wandered?", options: [{ label: "A", text: "Desert of Judah" }, { label: "B", text: "Wilderness of Sin" }, { label: "C", text: "Wilderness of Zin" }, { label: "D", text: "Negev" }], correctAnswer: "B", verse: "Exodus 16:1", explanation: "Israel experienced tests of faith in the wilderness." },
  { id: "exodus56", question: "What was the significance of Egypt losing its firstborn?", options: [{ label: "A", text: "Economic loss" }, { label: "B", text: "Judgment on Egypt's gods and people" }, { label: "C", text: "Just retribution for enslaving Israel" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Exodus 12:29", explanation: "The plague demonstrated God's sovereignty." },
  { id: "exodus57", question: "What did the cloud by day and fire by night symbolize?", options: [{ label: "A", text: "God's constant presence" }, { label: "B", text: "Judgment and blessing" }, { label: "C", text: "Provision and protection" }, { label: "D", text: "God's direction and comfort" }], correctAnswer: "A", verse: "Exodus 13:21-22", explanation: "God was with Israel every moment." },
  { id: "exodus58", question: "What law was given at Sinai regarding the Sabbath?", options: [{ label: "A", text: "Work six days, rest on the seventh" }, { label: "B", text: "Rest was optional" }, { label: "C", text: "Only priests could rest" }, { label: "D", text: "No work on any day" }], correctAnswer: "A", verse: "Exodus 34:21", explanation: "The Sabbath law commanded regular rest." },
  { id: "exodus59", question: "How did God provide water in the wilderness?", options: [{ label: "A", text: "Wells appeared naturally" }, { label: "B", text: "God struck a rock with Moses' staff" }, { label: "C", text: "Rain fell regularly" }, { label: "D", text: "Water was carried from Egypt" }], correctAnswer: "B", verse: "Exodus 17:6", explanation: "God miraculously provided water from the rock." },
  { id: "exodus60", question: "What was Israel's initial reaction to leaving Egypt?", options: [{ label: "A", text: "Fear and doubt" }, { label: "B", text: "Joy and worship" }, { label: "C", text: "Both joy and fear" }, { label: "D", text: "Indifference" }], correctAnswer: "C", verse: "Exodus 14:10-12", explanation: "Israel's faith wavered when they saw the army." },
  { id: "exodus61", question: "What did Moses use to perform miracles before Pharaoh?", options: [{ label: "A", text: "His staff" }, { label: "B", text: "Aaron's staff" }, { label: "C", text: "His hands" }, { label: "D", text: "Words alone" }], correctAnswer: "A", verse: "Exodus 7:17", explanation: "God's power worked through Moses' staff." },
  { id: "exodus62", question: "What happened when the plague of frogs came?", options: [{ label: "A", text: "Frogs covered the land" }, { label: "B", text: "Only water sources had frogs" }, { label: "C", text: "Frogs were harmless" }, { label: "D", text: "Frogs only affected priests" }], correctAnswer: "A", verse: "Exodus 8:6", explanation: "Frogs covered the houses and courtyards of Egypt." },
  { id: "exodus63", question: "What was the purpose of the tabernacle?", options: [{ label: "A", text: "A place for God to dwell among His people" }, { label: "B", text: "A meeting place for leaders" }, { label: "C", text: "A storehouse for supplies" }, { label: "D", text: "A fortress for protection" }], correctAnswer: "A", verse: "Exodus 25:8", explanation: "The tabernacle was God's earthly home." },
  { id: "exodus64", question: "How were the Ten Commandments written?", options: [{ label: "A", text: "On parchment by Moses" }, { label: "B", text: "On stone tablets by God's finger" }, { label: "C", text: "On wood by craftsmen" }, { label: "D", text: "On cloth by priests" }], correctAnswer: "B", verse: "Exodus 31:18", explanation: "God wrote the law with His own finger." },
  { id: "exodus65", question: "What was the Golden Calf incident a result of?", options: [{ label: "A", text: "Aaron's leadership failure" }, { label: "B", text: "Israel's impatience and idolatry" }, { label: "C", text: "Egyptian influence" }, { label: "D", text: "Demonic possession" }], correctAnswer: "B", verse: "Exodus 32:1-4", explanation: "Israel forgot God while Moses received the law." },
  { id: "exodus66", question: "How many people left Egypt during the exodus?", options: [{ label: "A", text: "About 600,000 men plus women and children" }, { label: "B", text: "About 2 million total" }, { label: "C", text: "About 100,000" }, { label: "D", text: "Number not specified" }], correctAnswer: "A", verse: "Exodus 12:37", explanation: "A large multitude left Egypt together." },
  { id: "exodus67", question: "What was the purpose of the wave sheaf offering?", options: [{ label: "A", text: "To ensure a good harvest" }, { label: "B", text: "To dedicate the firstfruits to God" }, { label: "C", text: "To appease the gods" }, { label: "D", text: "To celebrate spring" }], correctAnswer: "B", verse: "Exodus 23:16", explanation: "Firstfruits were dedicated to the Lord." },
  { id: "exodus68", question: "What was the structure of the tabernacle's outer court?", options: [{ label: "A", text: "A simple tent" }, { label: "B", text: "An enclosed rectangle with the altar and laver" }, { label: "C", text: "A circular formation" }, { label: "D", text: "Multiple buildings" }], correctAnswer: "B", verse: "Exodus 27:9-18", explanation: "The outer court contained the altar and wash basin." },
  { id: "exodus69", question: "How did the plagues culminate in Israel's liberation?", options: [{ label: "A", text: "Pharaoh willingly released Israel" }, { label: "B", text: "Israel escaped during a plague" }, { label: "C", text: "Pharaoh sent Israel away after the death of the firstborn" }, { label: "D", text: "Moses led a rebellion" }], correctAnswer: "C", verse: "Exodus 12:31-32", explanation: "Pharaoh finally released Israel after losing his son." },
  { id: "exodus70", question: "What was the significance of the Passover meal?", options: [{ label: "A", text: "Commemoration of deliverance" }, { label: "B", text: "Preparation for wandering" }, { label: "C", text: "Fellowship meal" }, { label: "D", text: "Religious duty only" }], correctAnswer: "A", verse: "Exodus 12:26-27", explanation: "Passover was a memorial of God's salvation." },
  { id: "exodus71", question: "What happened when Israel complained about food?", options: [{ label: "A", text: "God ignored them" }, { label: "B", text: "God provided manna and quail" }, { label: "C", text: "They were punished severely" }, { label: "D", text: "Moses resigned" }], correctAnswer: "B", verse: "Exodus 16:1-12", explanation: "God met Israel's needs with miraculous provision." },
  { id: "exodus72", question: "What was the covenant at Sinai based upon?", options: [{ label: "A", text: "Mutual agreement" }, { label: "B", text: "God's grace and Israel's obedience" }, { label: "C", text: "Military strength" }, { label: "D", text: "Economic exchange" }], correctAnswer: "B", verse: "Exodus 19:5-6", explanation: "The covenant promised blessing for obedience." },
  { id: "exodus73", question: "What was the role of the priesthood in Israel?", options: [{ label: "A", text: "To rule over the people" }, { label: "B", text: "To mediate between God and the people" }, { label: "C", text: "To lead military campaigns" }, { label: "D", text: "To collect taxes" }], correctAnswer: "B", verse: "Exodus 28:1", explanation: "Priests represented God and the people." },
  { id: "exodus74", question: "How did Israel obtain wealth to leave Egypt?", options: [{ label: "A", text: "They stole it" }, { label: "B", text: "Egyptians gave them gold and silver" }, { label: "C", text: "They found it in the desert" }, { label: "D", text: "God created it miraculously" }], correctAnswer: "B", verse: "Exodus 12:35-36", explanation: "Egyptians gave Israel treasure as they left." },
  { id: "exodus75", question: "What was the promise God made to Israel at the exodus?", options: [{ label: "A", text: "Permanent rest" }, { label: "B", text: "Comfort and safety" }, { label: "C", text: "A land of their own" }, { label: "D", text: "Wealth and power" }], correctAnswer: "C", verse: "Exodus 3:17", explanation: "God promised the land of Canaan to Israel." },
  { id: "exodus76", question: "How did God communicate with Moses most often?", options: [{ label: "A", text: "Through visions" }, { label: "B", text: "Face to face" }, { label: "C", text: "Through dreams" }, { label: "D", text: "Through priests" }], correctAnswer: "B", verse: "Exodus 33:11", explanation: "God spoke to Moses directly and openly." },
  { id: "exodus77", question: "What was the purpose of the bronze laver in the tabernacle?", options: [{ label: "A", text: "For cooking" }, { label: "B", text: "For washing before worship" }, { label: "C", text: "For drinking" }, { label: "D", text: "For healing" }], correctAnswer: "B", verse: "Exodus 30:18-21", explanation: "The laver symbolized cleansing for worship." },
  { id: "exodus78", question: "What was the significance of the blood covenant?", options: [{ label: "A", text: "It sealed the covenant with God" }, { label: "B", text: "It protected from death" }, { label: "C", text: "It was purely ceremonial" }, { label: "D", text: "It had no real meaning" }], correctAnswer: "A", verse: "Exodus 24:8", explanation: "Blood sealed God's covenant promise." },
  { id: "exodus79", question: "How did God protect Israel during the exodus?", options: [{ label: "A", text: "With angels" }, { label: "B", text: "With the pillar of cloud and fire" }, { label: "C", text: "With miracles and plagues" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Exodus 14:19-20", explanation: "God protected Israel through multiple means." },
  { id: "exodus80", question: "What was the consequence of breaking the Sabbath law?", options: [{ label: "A", text: "A warning" }, { label: "B", text: "Death penalty" }, { label: "C", text: "Fines only" }, { label: "D", text: "Excommunication" }], correctAnswer: "B", verse: "Exodus 31:14-15", explanation: "Sabbath violation was a serious offense." },
  { id: "exodus81", question: "What happened to those who rejected God's covenant?", options: [{ label: "A", text: "They were blessed anyway" }, { label: "B", text: "They faced punishment and death" }, { label: "C", text: "They were forgiven automatically" }, { label: "D", text: "Nothing happened" }], correctAnswer: "B", verse: "Exodus 32:33-35", explanation: "Breaking covenant had serious consequences." },
  { id: "exodus82", question: "How long did it take God to create the world according to Exodus?", options: [{ label: "A", text: "Not mentioned" }, { label: "B", text: "Six days" }, { label: "C", text: "Forty days" }, { label: "D", text: "Unspecified time" }], correctAnswer: "B", verse: "Exodus 20:11", explanation: "God worked six days and rested on the seventh." },
  { id: "exodus83", question: "What was the primary purpose of the commandments?", options: [{ label: "A", text: "To save people" }, { label: "B", text: "To show God's standard and reveal sin" }, { label: "C", text: "To ensure prosperity" }, { label: "D", text: "To gain power" }], correctAnswer: "B", verse: "Exodus 20:1-17", explanation: "The Law revealed God's holy standard." },
  { id: "exodus84", question: "How did the Israelites respond to the Law at Sinai?", options: [{ label: "A", text: "They rejected it" }, { label: "B", text: "They agreed to obey it" }, { label: "C", text: "They ignored it" }, { label: "D", text: "They asked for modifications" }], correctAnswer: "B", verse: "Exodus 24:3", explanation: "Israel committed to obey God's covenant." },
  { id: "exodus85", question: "What was the role of Aaron in the priesthood?", options: [{ label: "A", text: "Assistant to Moses only" }, { label: "B", text: "High priest with specific duties" }, { label: "C", text: "Military leader" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Exodus 28:1", explanation: "Aaron was appointed as high priest." },
  { id: "exodus86", question: "What was the purpose of the anointing oil?", options: [{ label: "A", text: "For healing illnesses" }, { label: "B", text: "To consecrate priests and objects" }, { label: "C", text: "For perfume" }, { label: "D", text: "To protect from insects" }], correctAnswer: "B", verse: "Exodus 30:22-33", explanation: "Oil sanctified people and objects for God's service." },
  { id: "exodus87", question: "What was the purpose of the incense in the tabernacle?", options: [{ label: "A", text: "For pleasant aroma" }, { label: "B", text: "To represent prayers rising to heaven" }, { label: "C", text: "For medicinal purposes" }, { label: "D", text: "To mask odors" }], correctAnswer: "B", verse: "Exodus 30:34-38", explanation: "Incense symbolized the prayers of God's people." },
  { id: "exodus88", question: "How did God provide light in the tabernacle?", options: [{ label: "A", text: "Natural sunlight" }, { label: "B", text: "The menorah with seven lamps" }, { label: "C", text: "Fire" }, { label: "D", text: "Candles only" }], correctAnswer: "B", verse: "Exodus 25:31-37", explanation: "The menorah provided light in the holy place." },
  { id: "exodus89", question: "What was kept in the Holy of Holies?", options: [{ label: "A", text: "Treasure and gold" }, { label: "B", text: "The Ark of the Covenant" }, { label: "C", text: "Priestly garments" }, { label: "D", text: "Scrolls and records" }], correctAnswer: "B", verse: "Exodus 25:16", explanation: "The Ark was the most sacred object in Israel." },
  { id: "exodus90", question: "What was the significance of the showbread in the tabernacle?", options: [{ label: "A", text: "Food for the priests only" }, { label: "B", text: "Represented God's provision for His people" }, { label: "C", text: "An offering to idols" }, { label: "D", text: "A ceremonial decoration" }], correctAnswer: "B", verse: "Exodus 25:30", explanation: "The bread symbolized God's constant care." },
  { id: "exodus91", question: "How were the tribes of Israel arranged around the tabernacle?", options: [{ label: "A", text: "Randomly" }, { label: "B", text: "In a specific order with the Levites in the center" }, { label: "C", text: "North to south only" }, { label: "D", text: "Based on age" }], correctAnswer: "B", verse: "Numbers 2:1-34", explanation: "The arrangement was orderly and purposeful." },
  { id: "exodus92", question: "What was the significance of the Feast of Unleavened Bread?", options: [{ label: "A", text: "A harvest festival" }, { label: "B", text: "Commemoration of hasty departure from Egypt" }, { label: "C", text: "Purity and separation from sin" }, { label: "D", text: "Both B and C" }], correctAnswer: "D", verse: "Exodus 12:17", explanation: "Unleavened bread symbolized purity and haste." },
  { id: "exodus93", question: "What was the purpose of the sin offering in Exodus?", options: [{ label: "A", text: "To purchase forgiveness" }, { label: "B", text: "To atone for unintentional sins" }, { label: "C", text: "To punish the sinner" }, { label: "D", text: "To please God with a gift" }], correctAnswer: "B", verse: "Exodus 29:36", explanation: "The sin offering made atonement for sins." },
  { id: "exodus94", question: "How was Moses' authority validated to the people?", options: [{ label: "A", text: "Through credentials" }, { label: "B", text: "Through signs and wonders" }, { label: "C", text: "Through education" }, { label: "D", text: "Through birth" }], correctAnswer: "B", verse: "Exodus 4:1-17", explanation: "God's miracles confirmed Moses' divine calling." },
  { id: "exodus95", question: "What was the ultimate goal of the exodus?", options: [{ label: "A", text: "Escape from slavery" }, { label: "B", text: "Worship God freely" }, { label: "C", text: "Reach Canaan" }, { label: "D", text: "Establish a kingdom" }], correctAnswer: "B", verse: "Exodus 7:16", explanation: "The primary purpose was freedom to worship." },
  { id: "exodus96", question: "What was the covenant at Sinai called?", options: [{ label: "A", text: "The Abrahamic Covenant" }, { label: "B", text: "The Mosaic Covenant" }, { label: "C", text: "The New Covenant" }, { label: "D", text: "The Davidic Covenant" }], correctAnswer: "B", verse: "Exodus 19:5-8", explanation: "God's covenant with Israel at Sinai." },
  { id: "exodus97", question: "How did God punish those who made the golden calf?", options: [{ label: "A", text: "Immediate death" }, { label: "B", text: "Plague and removal of blessings" }, { label: "C", text: "Exile" }, { label: "D", text: "Loss of the law" }], correctAnswer: "B", verse: "Exodus 32:35", explanation: "God sent a plague on those who sinned." },
  { id: "exodus98", question: "What was the purpose of God's commandment to sanctify the firstborn?", options: [{ label: "A", text: "To show ownership" }, { label: "B", text: "For genealogical records" }, { label: "C", text: "As a memorial of God's plague on Egypt" }, { label: "D", text: "For population control" }], correctAnswer: "C", verse: "Exodus 13:2", explanation: "The firstborn were consecrated as a reminder." },
  { id: "exodus99", question: "What was Israel's status after leaving Egypt?", options: [{ label: "A", text: "A free nation" }, { label: "B", text: "God's treasured possession and holy nation" }, { label: "C", text: "A military power" }, { label: "D", text: "Wanderers without direction" }], correctAnswer: "B", verse: "Exodus 19:5-6", explanation: "Israel became God's special covenant people." },
  { id: "exodus100", question: "What is the overarching theme of Exodus?", options: [{ label: "A", text: "God's judgment" }, { label: "B", text: "God's redemption and deliverance of His people" }, { label: "C", text: "Human achievement" }, { label: "D", text: "Political freedom" }], correctAnswer: "B", verse: "Exodus 1:1-40:38", explanation: "Exodus demonstrates God's saving power and covenant faithfulness." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ExodusTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loadingVerseText, setLoadingVerseText] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Fetch user's progress for exodus questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'exodus');

        if (error) {
          console.error('Error fetching trivia progress:', error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter(p => p.is_correct)
            .map(p => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(q => !answeredCorrectly.has(q.id));
        
        // If no questions left, show all questions (allow review)
        const questionsToUse = availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;
        
        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        // No user logged in, show random questions
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

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

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Track trivia question answered
    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        // Insert into master_actions via server-side API (uses service role)
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'exodus' });
        const response = await fetch('/api/trivia-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: 'exodus'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to record trivia answer:', response.status, errorText);
        } else {
          console.log('Successfully recorded trivia answer');
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from('profile_stats')
          .select('trivia_questions_answered')
          .eq('user_id', userId)
          .single();
        
        if (currentStats) {
          await supabase
            .from('profile_stats')
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1
            })
            .eq('user_id', userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      const verseText = await fetchVerseText(currentQuestion.verse);
      setQuestions(prev => {
        const updated = [...prev];
        updated[currentQuestionIndex] = {
          ...updated[currentQuestionIndex],
          verseText
        };
        return updated;
      });
      setLoadingVerseText(false);
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're an Exodus expert!";
    if (score >= 8) return "Excellent! You know Exodus well!";
    if (score >= 6) return "Good job! Keep studying Exodus!";
    if (score >= 4) return "Nice try! Exodus has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
              href="/bible-trivia/exodus"
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

        <div style={{ perspective: "1000px", height: "600px" }}>
          <div
            style={{
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              width: "100%",
              height: "100%"
            }}
          >
            {/* Front of Card */}
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
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

            {/* Back of Card */}
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
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

