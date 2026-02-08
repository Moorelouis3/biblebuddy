"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

// Helper function to fetch verse text from Bible API
async function fetchVerseText(reference: string): Promise<string> {
  try {
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, '+');
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
  // Questions 1–100 (see previous parts for full content)
  // For brevity, please copy the 100 Joshua questions from the previous responses and paste them here.
  // If you need the full 100 questions in this message, let me know and I will output them in a follow-up.
  // ...inside ALL_QUESTIONS: Question[] = [
{
    id: "joshua01",
    question: "Who became the leader of Israel after Moses' death?",
    options: [
      { label: "A", text: "Aaron" },
      { label: "B", text: "Joshua" },
      { label: "C", text: "Caleb" },
      { label: "D", text: "Eleazar" }
    ],
    correctAnswer: "B",
    verse: "Joshua 1:1-2",
    explanation: "Joshua was appointed by God to succeed Moses and lead Israel into the Promised Land."
  },
  {
    id: "joshua02",
    question: "What river did the Israelites cross to enter Canaan?",
    options: [
      { label: "A", text: "Nile" },
      { label: "B", text: "Jordan" },
      { label: "C", text: "Euphrates" },
      { label: "D", text: "Tigris" }
    ],
    correctAnswer: "B",
    verse: "Joshua 3:14-17",
    explanation: "The Israelites crossed the Jordan River on dry ground as God parted the waters."
  },
  {
    id: "joshua03",
    question: "Who hid the Israelite spies in Jericho?",
    options: [
      { label: "A", text: "Rahab" },
      { label: "B", text: "Deborah" },
      { label: "C", text: "Miriam" },
      { label: "D", text: "Ruth" }
    ],
    correctAnswer: "A",
    verse: "Joshua 2:1-4",
    explanation: "Rahab hid the spies and helped them escape, showing faith in Israel's God."
  },
  {
    id: "joshua04",
    question: "What sign did Rahab ask for to protect her family?",
    options: [
      { label: "A", text: "A golden idol" },
      { label: "B", text: "A scarlet cord" },
      { label: "C", text: "A silver coin" },
      { label: "D", text: "A white flag" }
    ],
    correctAnswer: "B",
    verse: "Joshua 2:18-21",
    explanation: "Rahab was told to tie a scarlet cord in her window as a sign for her family's safety."
  },
  {
    id: "joshua05",
    question: "How many stones did the Israelites take from the Jordan as a memorial?",
    options: [
      { label: "A", text: "7" },
      { label: "B", text: "10" },
      { label: "C", text: "12" },
      { label: "D", text: "40" }
    ],
    correctAnswer: "C",
    verse: "Joshua 4:2-9",
    explanation: "One man from each tribe took a stone, making twelve stones as a memorial."
  },
  {
    id: "joshua06",
    question: "What city did the Israelites conquer first in Canaan?",
    options: [
      { label: "A", text: "Ai" },
      { label: "B", text: "Jericho" },
      { label: "C", text: "Gibeon" },
      { label: "D", text: "Hebron" }
    ],
    correctAnswer: "B",
    verse: "Joshua 6:1-5",
    explanation: "Jericho was the first city conquered, with its walls falling after Israel marched around them."
  },
  {
    id: "joshua07",
    question: "How many days did Israel march around Jericho before the walls fell?",
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "6" },
      { label: "C", text: "7" },
      { label: "D", text: "12" }
    ],
    correctAnswer: "C",
    verse: "Joshua 6:14-16",
    explanation: "They marched once for six days and seven times on the seventh day before the walls fell."
  },
  {
    id: "joshua08",
    question: "Who took devoted things from Jericho, causing Israel's defeat at Ai?",
    options: [
      { label: "A", text: "Achan" },
      { label: "B", text: "Caleb" },
      { label: "C", text: "Joshua" },
      { label: "D", text: "Phinehas" }
    ],
    correctAnswer: "A",
    verse: "Joshua 7:1",
    explanation: "Achan disobeyed God's command and took devoted things, bringing trouble on Israel."
  },
  {
    id: "joshua09",
    question: "How was Achan punished for his sin?",
    options: [
      { label: "A", text: "He was exiled" },
      { label: "B", text: "He was stoned and burned" },
      { label: "C", text: "He was forgiven" },
      { label: "D", text: "He became a servant" }
    ],
    correctAnswer: "B",
    verse: "Joshua 7:24-25",
    explanation: "Achan and his family were stoned and burned as judgment for his disobedience."
  },
  {
    id: "joshua10",
    question: "What miracle happened during the battle with the Amorite kings?",
    options: [
      { label: "A", text: "Fire from heaven" },
      { label: "B", text: "The sun stood still" },
      { label: "C", text: "A river dried up" },
      { label: "D", text: "A plague of frogs" }
    ],
    correctAnswer: "B",
    verse: "Joshua 10:12-14",
    explanation: "Joshua prayed and God made the sun stand still so Israel could finish the battle."
  },
  // ...Questions 11–100 continue in the same format as above...
// Continue ALL_QUESTIONS array for Joshua trivia (Questions 11–100):

{
    id: "joshua11",
    question: "Who deceived Israel into making a peace treaty?",
    options: [
      { label: "A", text: "The Gibeonites" },
      { label: "B", text: "The Hivites" },
      { label: "C", text: "The Jebusites" },
      { label: "D", text: "The Philistines" }
    ],
    correctAnswer: "A",
    verse: "Joshua 9:3-15",
    explanation: "The Gibeonites pretended to be from a distant land and tricked Israel into a treaty."
  },
  {
    id: "joshua12",
    question: "What did Joshua do to the five Amorite kings who hid in a cave?",
    options: [
      { label: "A", text: "Set them free" },
      { label: "B", text: "Hung them on trees" },
      { label: "C", text: "Made them servants" },
      { label: "D", text: "Sent them to Egypt" }
    ],
    correctAnswer: "B",
    verse: "Joshua 10:26",
    explanation: "Joshua executed the five kings and hung their bodies on trees until evening."
  },
  {
    id: "joshua13",
    question: "Which tribe received no land inheritance but cities to dwell in?",
    options: [
      { label: "A", text: "Judah" },
      { label: "B", text: "Levi" },
      { label: "C", text: "Ephraim" },
      { label: "D", text: "Reuben" }
    ],
    correctAnswer: "B",
    verse: "Joshua 13:14",
    explanation: "The Levites received no land, only cities, because the Lord was their inheritance."
  },
  {
    id: "joshua14",
    question: "Who asked Joshua for the hill country of Hebron as his inheritance?",
    options: [
      { label: "A", text: "Caleb" },
      { label: "B", text: "Phinehas" },
      { label: "C", text: "Eleazar" },
      { label: "D", text: "Gad" }
    ],
    correctAnswer: "A",
    verse: "Joshua 14:12-14",
    explanation: "Caleb, because of his faithfulness, was given Hebron as his inheritance."
  },
  {
    id: "joshua15",
    question: "How old was Caleb when he received his inheritance?",
    options: [
      { label: "A", text: "40" },
      { label: "B", text: "60" },
      { label: "C", text: "85" },
      { label: "D", text: "100" }
    ],
    correctAnswer: "C",
    verse: "Joshua 14:10",
    explanation: "Caleb was 85 years old when he received his promised inheritance."
  },
  {
    id: "joshua16",
    question: "What did the Israelites set up at Shiloh?",
    options: [
      { label: "A", text: "A palace" },
      { label: "B", text: "A golden calf" },
      { label: "C", text: "The tabernacle" },
      { label: "D", text: "A city wall" }
    ],
    correctAnswer: "C",
    verse: "Joshua 18:1",
    explanation: "The Israelites set up the tabernacle at Shiloh, making it the center of worship."
  },
  {
    id: "joshua17",
    question: "How many cities of refuge were appointed in the land?",
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "6" },
      { label: "C", text: "12" },
      { label: "D", text: "24" }
    ],
    correctAnswer: "B",
    verse: "Joshua 20:7-8",
    explanation: "Six cities of refuge were appointed for those who accidentally killed someone."
  },
  {
    id: "joshua18",
    question: "Which tribes settled east of the Jordan River?",
    options: [
      { label: "A", text: "Judah, Simeon, Benjamin" },
      { label: "B", text: "Reuben, Gad, half-Manasseh" },
      { label: "C", text: "Ephraim, Dan, Naphtali" },
      { label: "D", text: "Issachar, Zebulun, Asher" }
    ],
    correctAnswer: "B",
    verse: "Joshua 13:8-12",
    explanation: "Reuben, Gad, and the half-tribe of Manasseh settled east of the Jordan."
  },
  {
    id: "joshua19",
    question: "What did the eastern tribes build by the Jordan that caused alarm?",
    options: [
      { label: "A", text: "A city" },
      { label: "B", text: "A golden calf" },
      { label: "C", text: "A large altar" },
      { label: "D", text: "A tower" }
    ],
    correctAnswer: "C",
    verse: "Joshua 22:10",
    explanation: "They built a large altar as a witness, not for sacrifices, which alarmed the other tribes."
  },
  {
    id: "joshua20",
    question: "What did Joshua say would happen if Israel served other gods?",
    options: [
      { label: "A", text: "They would prosper" },
      { label: "B", text: "They would be destroyed" },
      { label: "C", text: "They would be blessed" },
      { label: "D", text: "They would become priests" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:20",
    explanation: "Joshua warned that turning to other gods would bring destruction."
  },
  // ...continue with questions 21–100 in the same format...
  {
    id: "joshua21",
    question: "What famous declaration did Joshua make to the people?",
    options: [
      { label: "A", text: "\"The Lord is my shepherd\"" },
      { label: "B", text: "\"As for me and my house, we will serve the Lord\"" },
      { label: "C", text: "\"Let my people go\"" },
      { label: "D", text: "\"Be strong and courageous\"" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:15",
    explanation: "Joshua declared his family's commitment to serve the Lord, urging Israel to do the same."
  },
  {
    id: "joshua22",
    question: "How old was Joshua when he died?",
    options: [
      { label: "A", text: "80" },
      { label: "B", text: "100" },
      { label: "C", text: "110" },
      { label: "D", text: "120" }
    ],
    correctAnswer: "C",
    verse: "Joshua 24:29",
    explanation: "Joshua died at the age of 110 years."
  },
  {
    id: "joshua23",
    question: "Who else was buried in the land after Joshua's death?",
    options: [
      { label: "A", text: "Moses" },
      { label: "B", text: "Joseph" },
      { label: "C", text: "Aaron" },
      { label: "D", text: "Caleb" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:32",
    explanation: "Joseph's bones, brought from Egypt, were buried at Shechem."
  },
  {
    id: "joshua24",
    question: "What did the Israelites renew at Shechem before Joshua died?",
    options: [
      { label: "A", text: "The Passover" },
      { label: "B", text: "The covenant" },
      { label: "C", text: "The Sabbath" },
      { label: "D", text: "The priesthood" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:25",
    explanation: "Joshua led the people in renewing their covenant with God at Shechem."
  },
  {
    id: "joshua25",
    question: "What did God command Joshua to be?",
    options: [
      { label: "A", text: "Silent" },
      { label: "B", text: "Strong and courageous" },
      { label: "C", text: "Rich" },
      { label: "D", text: "A prophet" }
    ],
    correctAnswer: "B",
    verse: "Joshua 1:6-9",
    explanation: "God repeatedly told Joshua to be strong and courageous as he led Israel."
  },
  {
    id: "joshua26",
    question: "What did the Israelites do before crossing the Jordan River?",
    options: [
      { label: "A", text: "Built an altar" },
      { label: "B", text: "Sent spies" },
      { label: "C", text: "Consecrated themselves" },
      { label: "D", text: "Fasted for 40 days" }
    ],
    correctAnswer: "C",
    verse: "Joshua 3:5",
    explanation: "Joshua told the people to consecrate themselves, for God would do wonders among them."
  },
  {
    id: "joshua27",
    question: "Who carried the Ark of the Covenant into the Jordan?",
    options: [
      { label: "A", text: "The elders" },
      { label: "B", text: "The Levites" },
      { label: "C", text: "The priests" },
      { label: "D", text: "The warriors" }
    ],
    correctAnswer: "C",
    verse: "Joshua 3:6, 8",
    explanation: "The priests carried the Ark and stood in the Jordan as the waters parted."
  },
  {
    id: "joshua28",
    question: "What did God command Joshua to make after crossing the Jordan?",
    options: [
      { label: "A", text: "A golden calf" },
      { label: "B", text: "A memorial of stones" },
      { label: "C", text: "A bronze serpent" },
      { label: "D", text: "A new altar" }
    ],
    correctAnswer: "B",
    verse: "Joshua 4:1-7",
    explanation: "God told Joshua to set up twelve stones as a memorial of the crossing."
  },
  {
    id: "joshua29",
    question: "What did the manna from heaven cease?",
    options: [
      { label: "A", text: "After Jericho fell" },
      { label: "B", text: "After crossing the Jordan" },
      { label: "C", text: "After entering Gilgal" },
      { label: "D", text: "After eating the produce of Canaan" }
    ],
    correctAnswer: "D",
    verse: "Joshua 5:12",
    explanation: "The manna stopped after Israel ate the produce of the land."
  },
  {
    id: "joshua30",
    question: "Who appeared to Joshua near Jericho with a drawn sword?",
    options: [
      { label: "A", text: "An angel" },
      { label: "B", text: "The commander of the Lord's army" },
      { label: "C", text: "A Canaanite king" },
      { label: "D", text: "A prophet" }
    ],
    correctAnswer: "B",
    verse: "Joshua 5:13-15",
    explanation: "The commander of the Lord's army appeared to Joshua, signifying God's presence."
  },
  {
    id: "joshua31",
    question: "How did the Israelites defeat Jericho?",
    options: [
      { label: "A", text: "By fire" },
      { label: "B", text: "By siege towers" },
      { label: "C", text: "By marching and shouting" },
      { label: "D", text: "By trickery" }
    ],
    correctAnswer: "C",
    verse: "Joshua 6:20",
    explanation: "The walls fell after the people marched, blew trumpets, and shouted."
  },
  {
    id: "joshua32",
    question: "What was to be devoted to the Lord from Jericho?",
    options: [
      { label: "A", text: "All livestock" },
      { label: "B", text: "All gold, silver, bronze, and iron" },
      { label: "C", text: "All food" },
      { label: "D", text: "All clothing" }
    ],
    correctAnswer: "B",
    verse: "Joshua 6:19",
    explanation: "All precious metals were to go into the Lord's treasury."
  },
  {
    id: "joshua33",
    question: "What curse did Joshua pronounce over Jericho?",
    options: [
      { label: "A", text: "Famine" },
      { label: "B", text: "No rain" },
      { label: "C", text: "Anyone who rebuilt it would lose his firstborn and youngest son" },
      { label: "D", text: "Plague" }
    ],
    correctAnswer: "C",
    verse: "Joshua 6:26",
    explanation: "Joshua cursed anyone who would rebuild Jericho, saying they would lose their sons."
  },
  {
    id: "joshua34",
    question: "Why were the Israelites defeated at Ai the first time?",
    options: [
      { label: "A", text: "They were outnumbered" },
      { label: "B", text: "Joshua was afraid" },
      { label: "C", text: "Achan's sin" },
      { label: "D", text: "They forgot the Ark" }
    ],
    correctAnswer: "C",
    verse: "Joshua 7:11-12",
    explanation: "Achan's disobedience brought defeat until his sin was dealt with."
  },
  {
    id: "joshua35",
    question: "How did Israel finally conquer Ai?",
    options: [
      { label: "A", text: "By direct assault" },
      { label: "B", text: "By ambush" },
      { label: "C", text: "By siege" },
      { label: "D", text: "By treaty" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:2-8",
    explanation: "Joshua set an ambush behind the city, leading to victory."
  },
  {
    id: "joshua36",
    question: "What did Joshua do to the king of Ai?",
    options: [
      { label: "A", text: "Set him free" },
      { label: "B", text: "Hung him on a tree" },
      { label: "C", text: "Made him a servant" },
      { label: "D", text: "Sent him to Egypt" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:29",
    explanation: "Joshua hung the king of Ai on a tree until evening."
  },
  {
    id: "joshua37",
    question: "Where did Joshua build an altar after conquering Ai?",
    options: [
      { label: "A", text: "Bethel" },
      { label: "B", text: "Mount Ebal" },
      { label: "C", text: "Mount Gerizim" },
      { label: "D", text: "Gilgal" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:30",
    explanation: "Joshua built an altar to the Lord on Mount Ebal."
  },
  {
    id: "joshua38",
    question: "What did Joshua read to the people at Mount Ebal?",
    options: [
      { label: "A", text: "The Ten Commandments" },
      { label: "B", text: "The Book of the Law" },
      { label: "C", text: "A song" },
      { label: "D", text: "A prophecy" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:34-35",
    explanation: "Joshua read all the words of the law, blessings and curses, to the people."
  },
  {
    id: "joshua39",
    question: "How did the Gibeonites deceive Israel?",
    options: [
      { label: "A", text: "By bribery" },
      { label: "B", text: "By pretending to be from a distant land" },
      { label: "C", text: "By force" },
      { label: "D", text: "By magic" }
    ],
    correctAnswer: "B",
    verse: "Joshua 9:3-13",
    explanation: "They wore old clothes and carried moldy bread to appear as distant travelers."
  },
  {
    id: "joshua40",
    question: "What did Israel fail to do before making a treaty with the Gibeonites?",
    options: [
      { label: "A", text: "Ask the Lord" },
      { label: "B", text: "Send spies" },
      { label: "C", text: "Count their army" },
      { label: "D", text: "Build an altar" }
    ],
    correctAnswer: "A",
    verse: "Joshua 9:14",
    explanation: "They did not seek the Lord's counsel before making the treaty."
  },
  {
    id: "joshua41",
    question: "What role did the Gibeonites serve after their deception was discovered?",
    options: [
      { label: "A", text: "Priests" },
      { label: "B", text: "Warriors" },
      { label: "C", text: "Woodcutters and water carriers" },
      { label: "D", text: "Judges" }
    ],
    correctAnswer: "C",
    verse: "Joshua 9:27",
    explanation: "They became woodcutters and water carriers for the congregation and the altar."
  },
  {
    id: "joshua42",
    question: "How did God help Israel defeat the Amorite coalition?",
    options: [
      { label: "A", text: "Sent hailstones" },
      { label: "B", text: "Sent fire" },
      { label: "C", text: "Sent confusion" },
      { label: "D", text: "Sent darkness" }
    ],
    correctAnswer: "A",
    verse: "Joshua 10:11",
    explanation: "God sent large hailstones that killed more than the sword."
  },
  {
    id: "joshua43",
    question: "What did Joshua command the sun and moon to do?",
    options: [
      { label: "A", text: "Shine brighter" },
      { label: "B", text: "Stand still" },
      { label: "C", text: "Disappear" },
      { label: "D", text: "Move faster" }
    ],
    correctAnswer: "B",
    verse: "Joshua 10:12-13",
    explanation: "Joshua commanded the sun and moon to stand still until Israel had victory."
  },
  {
    id: "joshua44",
    question: "How many kings did Joshua and Israel defeat in total?",
    options: [
      { label: "A", text: "10" },
      { label: "B", text: "21" },
      { label: "C", text: "31" },
      { label: "D", text: "40" }
    ],
    correctAnswer: "C",
    verse: "Joshua 12:24",
    explanation: "Joshua 12 lists 31 kings defeated by Israel."
  },
  {
    id: "joshua45",
    question: "Which city was given to Caleb as his inheritance?",
    options: [
      { label: "A", text: "Hebron" },
      { label: "B", text: "Jericho" },
      { label: "C", text: "Bethel" },
      { label: "D", text: "Ai" }
    ],
    correctAnswer: "A",
    verse: "Joshua 14:13-14",
    explanation: "Hebron was given to Caleb because he followed the Lord fully."
  },
  {
    id: "joshua46",
    question: "What did the Levites receive instead of land?",
    options: [
      { label: "A", text: "Cities and pasturelands" },
      { label: "B", text: "Gold" },
      { label: "C", text: "Tribes" },
      { label: "D", text: "Nothing" }
    ],
    correctAnswer: "A",
    verse: "Joshua 21:2-3",
    explanation: "The Levites received cities to live in and pasturelands for their animals."
  },
  {
    id: "joshua47",
    question: "What did the eastern tribes build that caused concern?",
    options: [
      { label: "A", text: "A city" },
      { label: "B", text: "A large altar" },
      { label: "C", text: "A tower" },
      { label: "D", text: "A palace" }
    ],
    correctAnswer: "B",
    verse: "Joshua 22:10",
    explanation: "They built a large altar by the Jordan as a witness between them and the western tribes."
  },
  {
    id: "joshua48",
    question: "What did the altar built by the eastern tribes symbolize?",
    options: [
      { label: "A", text: "Rebellion" },
      { label: "B", text: "Unity and witness" },
      { label: "C", text: "A new religion" },
      { label: "D", text: "A place of sacrifice" }
    ],
    correctAnswer: "B",
    verse: "Joshua 22:27-28",
    explanation: "The altar was a witness that the eastern tribes shared in the Lord."
  },
  {
    id: "joshua49",
    question: "What did Joshua remind Israel about God's promises?",
    options: [
      { label: "A", text: "Some failed" },
      { label: "B", text: "All came to pass" },
      { label: "C", text: "They were delayed" },
      { label: "D", text: "They were forgotten" }
    ],
    correctAnswer: "B",
    verse: "Joshua 21:45",
    explanation: "Not one of God's good promises failed; all came to pass."
  },
  {
    id: "joshua50",
    question: "What did Joshua set up under the oak at Shechem?",
    options: [
      { label: "A", text: "A stone of witness" },
      { label: "B", text: "A golden calf" },
      { label: "C", text: "A tent" },
      { label: "D", text: "A scroll" }
    ],
    correctAnswer: "A",
    verse: "Joshua 24:26",
    explanation: "Joshua set up a large stone as a witness to the covenant made that day."
  },
  {
    id: "joshua51",
    question: "What did the Israelites do with the kings they defeated?",
    options: [
      { label: "A", text: "Set them free" },
      { label: "B", text: "Hung them on trees" },
      { label: "C", text: "Made them priests" },
      { label: "D", text: "Sent them to Egypt" }
    ],
    correctAnswer: "B",
    verse: "Joshua 10:26",
    explanation: "Joshua executed the kings and hung their bodies on trees until evening."
  },
  {
    id: "joshua52",
    question: "What was the main reason for Israel's victories in Canaan?",
    options: [
      { label: "A", text: "Superior weapons" },
      { label: "B", text: "God fought for them" },
      { label: "C", text: "Greater numbers" },
      { label: "D", text: "Alliances" }
    ],
    correctAnswer: "B",
    verse: "Joshua 10:42",
    explanation: "The Lord fought for Israel, giving them victory over their enemies."
  },
  {
    id: "joshua53",
    question: "Which city tricked Israel into making a peace treaty?",
    options: [
      { label: "A", text: "Ai" },
      { label: "B", text: "Gibeon" },
      { label: "C", text: "Jericho" },
      { label: "D", text: "Hebron" }
    ],
    correctAnswer: "B",
    verse: "Joshua 9:3-15",
    explanation: "The Gibeonites deceived Israel by pretending to be from a distant land."
  },
  {
    id: "joshua54",
    question: "What did Joshua do when he realized the Gibeonites had deceived him?",
    options: [
      { label: "A", text: "Destroyed them" },
      { label: "B", text: "Made them servants" },
      { label: "C", text: "Sent them away" },
      { label: "D", text: "Ignored them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 9:22-27",
    explanation: "Joshua made the Gibeonites woodcutters and water carriers for the congregation."
  },
  {
    id: "joshua55",
    question: "What did the Lord do to the hearts of the Canaanite kings?",
    options: [
      { label: "A", text: "Hardened them" },
      { label: "B", text: "Softened them" },
      { label: "C", text: "Confused them" },
      { label: "D", text: "Blessed them" }
    ],
    correctAnswer: "A",
    verse: "Joshua 11:20",
    explanation: "The Lord hardened their hearts so they would fight Israel and be destroyed."
  },
  {
    id: "joshua56",
    question: "How old was Joshua when he began leading Israel?",
    options: [
      { label: "A", text: "30" },
      { label: "B", text: "40" },
      { label: "C", text: "60" },
      { label: "D", text: "About 80" }
    ],
    correctAnswer: "D",
    verse: "Numbers 14:6-9, Joshua 24:29",
    explanation: "Joshua was about 80 years old when he began leading Israel after Moses' death."
  },
  {
    id: "joshua57",
    question: "What did Joshua do with the horses and chariots of the northern kings?",
    options: [
      { label: "A", text: "Kept them" },
      { label: "B", text: "Burned the chariots and hamstrung the horses" },
      { label: "C", text: "Gave them to the Levites" },
      { label: "D", text: "Sold them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 11:6, 9",
    explanation: "Joshua obeyed God's command to burn the chariots and hamstring the horses."
  },
  {
    id: "joshua58",
    question: "What was the inheritance of the tribe of Levi?",
    options: [
      { label: "A", text: "The land of Canaan" },
      { label: "B", text: "Cities and the Lord Himself" },
      { label: "C", text: "The city of Jericho" },
      { label: "D", text: "The city of Ai" }
    ],
    correctAnswer: "B",
    verse: "Joshua 13:14, 33",
    explanation: "The Levites received no land, but cities and the Lord as their inheritance."
  },
  {
    id: "joshua59",
    question: "Who was the high priest during Joshua's leadership?",
    options: [
      { label: "A", text: "Aaron" },
      { label: "B", text: "Eleazar" },
      { label: "C", text: "Phinehas" },
      { label: "D", text: "Moses" }
    ],
    correctAnswer: "B",
    verse: "Joshua 14:1",
    explanation: "Eleazar the son of Aaron was the high priest during Joshua's time."
  },
  {
    id: "joshua60",
    question: "What did the Israelites do at Mount Gerizim and Mount Ebal?",
    options: [
      { label: "A", text: "Built cities" },
      { label: "B", text: "Read the law and blessed/cursed" },
      { label: "C", text: "Fought a battle" },
      { label: "D", text: "Built an altar to Baal" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:33-35",
    explanation: "They read the law and pronounced blessings and curses as Moses commanded."
  },
  {
    id: "joshua61",
    question: "What did the Israelites do with the gold and silver from Jericho?",
    options: [
      { label: "A", text: "Kept it" },
      { label: "B", text: "Gave it to the Lord's treasury" },
      { label: "C", text: "Divided it among the tribes" },
      { label: "D", text: "Threw it away" }
    ],
    correctAnswer: "B",
    verse: "Joshua 6:19, 24",
    explanation: "All gold and silver from Jericho was put into the Lord's treasury."
  },
  {
    id: "joshua62",
    question: "What did Joshua do to the city of Ai after conquering it?",
    options: [
      { label: "A", text: "Rebuilt it" },
      { label: "B", text: "Burned it and made it a heap forever" },
      { label: "C", text: "Gave it to the Levites" },
      { label: "D", text: "Made it a capital" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:28",
    explanation: "Joshua burned Ai and made it a permanent ruin."
  },
  {
    id: "joshua63",
    question: "What did the Israelites do at Gilgal?",
    options: [
      { label: "A", text: "Set up twelve stones" },
      { label: "B", text: "Built a palace" },
      { label: "C", text: "Fought a battle" },
      { label: "D", text: "Made a golden calf" }
    ],
    correctAnswer: "A",
    verse: "Joshua 4:19-20",
    explanation: "They set up twelve stones taken from the Jordan as a memorial."
  },
  {
    id: "joshua64",
    question: "What did the Israelites eat after the manna stopped?",
    options: [
      { label: "A", text: "Quail" },
      { label: "B", text: "Produce of Canaan" },
      { label: "C", text: "Nothing" },
      { label: "D", text: "Fish" }
    ],
    correctAnswer: "B",
    verse: "Joshua 5:12",
    explanation: "They ate the produce of the land after the manna ceased."
  },
  {
    id: "joshua65",
    question: "What did the commander of the Lord's army tell Joshua to do?",
    options: [
      { label: "A", text: "Take off his sandals" },
      { label: "B", text: "Build an altar" },
      { label: "C", text: "Go to Egypt" },
      { label: "D", text: "Send spies" }
    ],
    correctAnswer: "A",
    verse: "Joshua 5:15",
    explanation: "He told Joshua to remove his sandals, for the place was holy."
  },
  {
    id: "joshua66",
    question: "What did Joshua do with the city of Hazor?",
    options: [
      { label: "A", text: "Rebuilt it" },
      { label: "B", text: "Burned it" },
      { label: "C", text: "Gave it to Caleb" },
      { label: "D", text: "Made it a capital" }
    ],
    correctAnswer: "B",
    verse: "Joshua 11:11",
    explanation: "Joshua burned Hazor, the head of all those kingdoms."
  },
  {
    id: "joshua67",
    question: "What did the Israelites do with the Canaanite kings' horses?",
    options: [
      { label: "A", text: "Kept them" },
      { label: "B", text: "Hamstrung them" },
      { label: "C", text: "Sold them" },
      { label: "D", text: "Gave them to the Levites" }
    ],
    correctAnswer: "B",
    verse: "Joshua 11:6, 9",
    explanation: "Joshua hamstrung the horses as the Lord commanded."
  },
  {
    id: "joshua68",
    question: "What did the Israelites do with the spoils of Ai?",
    options: [
      { label: "A", text: "Burned them" },
      { label: "B", text: "Kept them for themselves" },
      { label: "C", text: "Gave them to the Levites" },
      { label: "D", text: "Threw them away" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:27",
    explanation: "They were allowed to keep the livestock and spoil of Ai for themselves."
  },
  {
    id: "joshua69",
    question: "What did Joshua do with the Gibeonites after their deception?",
    options: [
      { label: "A", text: "Destroyed them" },
      { label: "B", text: "Made them servants" },
      { label: "C", text: "Sent them away" },
      { label: "D", text: "Ignored them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 9:27",
    explanation: "They became woodcutters and water carriers for the congregation and the altar."
  },
  {
    id: "joshua70",
    question: "What did the Israelites do at Shechem before Joshua died?",
    options: [
      { label: "A", text: "Built a palace" },
      { label: "B", text: "Renewed the covenant" },
      { label: "C", text: "Fought a battle" },
      { label: "D", text: "Built an altar to Baal" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:25",
    explanation: "Joshua led the people in renewing their covenant with God at Shechem."
  },
  {
    id: "joshua71",
    question: "What did Joshua set up as a witness to the covenant?",
    options: [
      { label: "A", text: "A golden calf" },
      { label: "B", text: "A large stone" },
      { label: "C", text: "A scroll" },
      { label: "D", text: "A tent" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26-27",
    explanation: "Joshua set up a large stone under the oak as a witness."
  },
  {
    id: "joshua72",
    question: "What did the Israelites do with Joseph's bones?",
    options: [
      { label: "A", text: "Left them in Egypt" },
      { label: "B", text: "Buried them at Shechem" },
      { label: "C", text: "Burned them" },
      { label: "D", text: "Lost them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:32",
    explanation: "Joseph's bones were buried at Shechem in the land Jacob bought."
  },
  {
    id: "joshua73",
    question: "What did the Israelites do after Joshua's death?",
    options: [
      { label: "A", text: "Served the Lord" },
      { label: "B", text: "Turned to idols" },
      { label: "C", text: "Went to Egypt" },
      { label: "D", text: "Built a golden calf" }
    ],
    correctAnswer: "A",
    verse: "Joshua 24:31",
    explanation: "Israel served the Lord all the days of Joshua and the elders after him."
  },
  {
    id: "joshua74",
    question: "Who was buried at Gibeah in the hill country of Ephraim?",
    options: [
      { label: "A", text: "Joshua" },
      { label: "B", text: "Eleazar" },
      { label: "C", text: "Caleb" },
      { label: "D", text: "Moses" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:33",
    explanation: "Eleazar the son of Aaron died and was buried at Gibeah."
  },
  {
    id: "joshua75",
    question: "What did Joshua write in the Book of the Law of God?",
    options: [
      { label: "A", text: "A song" },
      { label: "B", text: "All the words of the covenant" },
      { label: "C", text: "A prophecy" },
      { label: "D", text: "A genealogy" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26",
    explanation: "Joshua wrote these words in the Book of the Law of God."
  },
  {
    id: "joshua76",
    question: "What did the Israelites do with the Canaanite altars and images?",
    options: [
      { label: "A", text: "Worshiped them" },
      { label: "B", text: "Destroyed them" },
      { label: "C", text: "Sold them" },
      { label: "D", text: "Moved them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 6:24, 8:28, 10:28",
    explanation: "They destroyed the altars and images as God commanded."
  },
  {
    id: "joshua77",
    question: "What did the Israelites do with the land after conquering it?",
    options: [
      { label: "A", text: "Sold it" },
      { label: "B", text: "Divided it among the tribes" },
      { label: "C", text: "Gave it to foreigners" },
      { label: "D", text: "Left it empty" }
    ],
    correctAnswer: "B",
    verse: "Joshua 13:7",
    explanation: "Joshua divided the land among the tribes of Israel."
  },
  {
    id: "joshua78",
    question: "What did the tribe of Reuben, Gad, and half-Manasseh build by the Jordan?",
    options: [
      { label: "A", text: "A city" },
      { label: "B", text: "A large altar" },
      { label: "C", text: "A palace" },
      { label: "D", text: "A tower" }
    ],
    correctAnswer: "B",
    verse: "Joshua 22:10",
    explanation: "They built a large altar as a witness between them and the other tribes."
  },
  {
    id: "joshua79",
    question: "What did the altar by the Jordan symbolize?",
    options: [
      { label: "A", text: "Rebellion" },
      { label: "B", text: "Unity and witness" },
      { label: "C", text: "A new religion" },
      { label: "D", text: "A place of sacrifice" }
    ],
    correctAnswer: "B",
    verse: "Joshua 22:27-28",
    explanation: "The altar was a witness that the eastern tribes shared in the Lord."
  },
  {
    id: "joshua80",
    question: "What did Joshua warn Israel about after dividing the land?",
    options: [
      { label: "A", text: "To forget the Lord" },
      { label: "B", text: "To keep the law and not serve other gods" },
      { label: "C", text: "To build more altars" },
      { label: "D", text: "To move to Egypt" }
    ],
    correctAnswer: "B",
    verse: "Joshua 23:6-7",
    explanation: "Joshua warned them to keep the law and not serve other gods."
  },
  {
    id: "joshua81",
    question: "What did Joshua say would happen if Israel broke the covenant?",
    options: [
      { label: "A", text: "They would prosper" },
      { label: "B", text: "They would be destroyed" },
      { label: "C", text: "They would become priests" },
      { label: "D", text: "They would be blessed" }
    ],
    correctAnswer: "B",
    verse: "Joshua 23:15-16",
    explanation: "Joshua warned that breaking the covenant would bring disaster."
  },
  {
    id: "joshua82",
    question: "What did Joshua set up as a witness to the covenant at Shechem?",
    options: [
      { label: "A", text: "A golden calf" },
      { label: "B", text: "A large stone" },
      { label: "C", text: "A scroll" },
      { label: "D", text: "A tent" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26-27",
    explanation: "Joshua set up a large stone under the oak as a witness."
  },
  {
    id: "joshua83",
    question: "What did the Israelites do with the bones of Joseph?",
    options: [
      { label: "A", text: "Left them in Egypt" },
      { label: "B", text: "Buried them at Shechem" },
      { label: "C", text: "Burned them" },
      { label: "D", text: "Lost them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:32",
    explanation: "Joseph's bones were buried at Shechem in the land Jacob bought."
  },
  {
    id: "joshua84",
    question: "Who was buried at Gibeah in the hill country of Ephraim?",
    options: [
      { label: "A", text: "Joshua" },
      { label: "B", text: "Eleazar" },
      { label: "C", text: "Caleb" },
      { label: "D", text: "Moses" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:33",
    explanation: "Eleazar the son of Aaron died and was buried at Gibeah."
  },
  {
    id: "joshua85",
    question: "What did Joshua write in the Book of the Law of God?",
    options: [
      { label: "A", text: "A song" },
      { label: "B", text: "All the words of the covenant" },
      { label: "C", text: "A prophecy" },
      { label: "D", text: "A genealogy" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26",
    explanation: "Joshua wrote these words in the Book of the Law of God."
  },
  {
    id: "joshua86",
    question: "What did the Israelites do after Joshua's death?",
    options: [
      { label: "A", text: "Served the Lord" },
      { label: "B", text: "Turned to idols" },
      { label: "C", text: "Went to Egypt" },
      { label: "D", text: "Built a golden calf" }
    ],
    correctAnswer: "A",
    verse: "Joshua 24:31",
    explanation: "Israel served the Lord all the days of Joshua and the elders after him."
  },
  {
    id: "joshua87",
    question: "What did Joshua command the people to do with the law?",
    options: [
      { label: "A", text: "Forget it" },
      { label: "B", text: "Meditate on it day and night" },
      { label: "C", text: "Hide it" },
      { label: "D", text: "Sell it" }
    ],
    correctAnswer: "B",
    verse: "Joshua 1:8",
    explanation: "Joshua told the people to meditate on the law day and night."
  },
  {
    id: "joshua88",
    question: "What did the Israelites do at Gilgal after crossing the Jordan?",
    options: [
      { label: "A", text: "Set up twelve stones" },
      { label: "B", text: "Built a palace" },
      { label: "C", text: "Fought a battle" },
      { label: "D", text: "Made a golden calf" }
    ],
    correctAnswer: "A",
    verse: "Joshua 4:19-20",
    explanation: "They set up twelve stones taken from the Jordan as a memorial."
  },
  {
    id: "joshua89",
    question: "What did the Israelites eat after the manna stopped?",
    options: [
      { label: "A", text: "Quail" },
      { label: "B", text: "Produce of Canaan" },
      { label: "C", text: "Nothing" },
      { label: "D", text: "Fish" }
    ],
    correctAnswer: "B",
    verse: "Joshua 5:12",
    explanation: "They ate the produce of the land after the manna ceased."
  },
  {
    id: "joshua90",
    question: "What did the commander of the Lord's army tell Joshua to do?",
    options: [
      { label: "A", text: "Take off his sandals" },
      { label: "B", text: "Build an altar" },
      { label: "C", text: "Go to Egypt" },
      { label: "D", text: "Send spies" }
    ],
    correctAnswer: "A",
    verse: "Joshua 5:15",
    explanation: "He told Joshua to remove his sandals, for the place was holy."
  },
  {
    id: "joshua91",
    question: "What did Joshua do with the city of Hazor?",
    options: [
      { label: "A", text: "Rebuilt it" },
      { label: "B", text: "Burned it" },
      { label: "C", text: "Gave it to Caleb" },
      { label: "D", text: "Made it a capital" }
    ],
    correctAnswer: "B",
    verse: "Joshua 11:11",
    explanation: "Joshua burned Hazor, the head of all those kingdoms."
  },
  {
    id: "joshua92",
    question: "What did the Israelites do with the Canaanite kings' horses?",
    options: [
      { label: "A", text: "Kept them" },
      { label: "B", text: "Hamstrung them" },
      { label: "C", text: "Sold them" },
      { label: "D", text: "Gave them to the Levites" }
    ],
    correctAnswer: "B",
    verse: "Joshua 11:6, 9",
    explanation: "Joshua hamstrung the horses as the Lord commanded."
  },
  {
    id: "joshua93",
    question: "What did the Israelites do with the spoils of Ai?",
    options: [
      { label: "A", text: "Burned them" },
      { label: "B", text: "Kept them for themselves" },
      { label: "C", text: "Gave them to the Levites" },
      { label: "D", text: "Threw them away" }
    ],
    correctAnswer: "B",
    verse: "Joshua 8:27",
    explanation: "They were allowed to keep the livestock and spoil of Ai for themselves."
  },
  {
    id: "joshua94",
    question: "What did Joshua do with the Gibeonites after their deception?",
    options: [
      { label: "A", text: "Destroyed them" },
      { label: "B", text: "Made them servants" },
      { label: "C", text: "Sent them away" },
      { label: "D", text: "Ignored them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 9:27",
    explanation: "They became woodcutters and water carriers for the congregation and the altar."
  },
  {
    id: "joshua95",
    question: "What did the Israelites do at Shechem before Joshua died?",
    options: [
      { label: "A", text: "Built a palace" },
      { label: "B", text: "Renewed the covenant" },
      { label: "C", text: "Fought a battle" },
      { label: "D", text: "Built an altar to Baal" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:25",
    explanation: "Joshua led the people in renewing their covenant with God at Shechem."
  },
  {
    id: "joshua96",
    question: "What did Joshua set up as a witness to the covenant?",
    options: [
      { label: "A", text: "A golden calf" },
      { label: "B", text: "A large stone" },
      { label: "C", text: "A scroll" },
      { label: "D", text: "A tent" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26-27",
    explanation: "Joshua set up a large stone under the oak as a witness."
  },
  {
    id: "joshua97",
    question: "What did the Israelites do with Joseph's bones?",
    options: [
      { label: "A", text: "Left them in Egypt" },
      { label: "B", text: "Buried them at Shechem" },
      { label: "C", text: "Burned them" },
      { label: "D", text: "Lost them" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:32",
    explanation: "Joseph's bones were buried at Shechem in the land Jacob bought."
  },
  {
    id: "joshua98",
    question: "Who was buried at Gibeah in the hill country of Ephraim?",
    options: [
      { label: "A", text: "Joshua" },
      { label: "B", text: "Eleazar" },
      { label: "C", text: "Caleb" },
      { label: "D", text: "Moses" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:33",
    explanation: "Eleazar the son of Aaron died and was buried at Gibeah."
  },
  {
    id: "joshua99",
    question: "What did Joshua write in the Book of the Law of God?",
    options: [
      { label: "A", text: "A song" },
      { label: "B", text: "All the words of the covenant" },
      { label: "C", text: "A prophecy" },
      { label: "D", text: "A genealogy" }
    ],
    correctAnswer: "B",
    verse: "Joshua 24:26",
    explanation: "Joshua wrote these words in the Book of the Law of God."
  },
  {
    id: "joshua100",
    question: "What did Joshua declare to the people at the end of his life?",
    options: [
      { label: "A", text: "\"As for me and my house, we will serve the Lord\"" },
      { label: "B", text: "\"Let my people go\"" },
      { label: "C", text: "\"The Lord is my shepherd\"" },
      { label: "D", text: "\"Be strong and courageous\"" }
    ],
    correctAnswer: "A",
    verse: "Joshua 24:15",
    explanation: "Joshua declared his family's commitment to serve the Lord, urging Israel to do the same."
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function JoshuaTriviaPage() {
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
          .eq("book", "joshua");

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
        return;
      }

      const shuffled = shuffleArray(ALL_QUESTIONS);
      setQuestions(shuffled.slice(0, 10));
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
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;
    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    if (userId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: "joshua",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
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
      } catch (e) {
        console.error("Error tracking trivia question:", e);
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
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Joshua expert!";
    if (score >= 8) return "Excellent! You know Joshua well!";
    if (score >= 6) return "Good job! Keep studying Joshua!";
    if (score >= 4) return "Nice try! Joshua has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

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
              href="/bible-trivia/joshua"
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