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
        { id: "judges71", question: "What role did Levites play?", options: [ { label: "A", text: "Kings" }, { label: "B", text: "Judges" }, { label: "C", text: "Priests" }, { label: "D", text: "Warriors" } ], correctAnswer: "C", verse: "Judges 17:7-13", explanation: "Levites served as priests and spiritual leaders in Israel. Their role was to teach God's law and lead worship." },
        { id: "judges72", question: "What does Judges reveal about Israel?", options: [ { label: "A", text: "Faithfulness" }, { label: "B", text: "Wealth" }, { label: "C", text: "Spiritual decline" }, { label: "D", text: "Unity" } ], correctAnswer: "C", verse: "Judges 2:19", explanation: "Judges reveals Israel's repeated spiritual decline and need for God's mercy. The book is a warning against forgetting the Lord." },
        { id: "judges73", question: "What pattern shows Israel’s decline?", options: [ { label: "A", text: "Obedience" }, { label: "B", text: "Repentance" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Blessing" } ], correctAnswer: "C", verse: "Judges 2:19", explanation: "Rebellion against God led to Israel's decline. Each generation turned away, showing the need for continual renewal." },
        { id: "judges74", question: "Who was the last judge mentioned?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Samson" }, { label: "C", text: "Jephthah" }, { label: "D", text: "Deborah" } ], correctAnswer: "B", verse: "Judges 16:30-31", explanation: "Samson is the last major judge in the book. His story ends the era of the judges and points to Israel's need for a king." },
        { id: "judges75", question: "How does Judges end?", options: [ { label: "A", text: "Victory" }, { label: "B", text: "Peace" }, { label: "C", text: "Chaos" }, { label: "D", text: "Coronation" } ], correctAnswer: "C", verse: "Judges 21:25", explanation: "Judges ends in chaos, with everyone doing what is right in their own eyes. The book highlights the need for godly leadership." },
        { id: "judges76", question: "What theme points to future kings?", options: [ { label: "A", text: "Law" }, { label: "B", text: "Chaos without leadership" }, { label: "C", text: "Wealth" }, { label: "D", text: "Exile" } ], correctAnswer: "B", verse: "Judges 21:25", explanation: "The repeated theme of 'no king in Israel' points forward to the coming of kings like Saul and David." },
        { id: "judges77", question: "Which judge was also a prophet?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Deborah" }, { label: "C", text: "Samson" }, { label: "D", text: "Tola" } ], correctAnswer: "B", verse: "Judges 4:4", explanation: "Deborah was both a judge and a prophetess, speaking God's word and leading Israel to victory." },
        { id: "judges78", question: "Which judge struggled with fear?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Samson" }, { label: "C", text: "Barak" }, { label: "D", text: "Jair" } ], correctAnswer: "A", verse: "Judges 6:15", explanation: "Gideon struggled with fear and doubt, but God patiently encouraged him and used him mightily." },
        { id: "judges79", question: "Which judge relied on strength?", options: [ { label: "A", text: "Deborah" }, { label: "B", text: "Gideon" }, { label: "C", text: "Samson" }, { label: "D", text: "Jephthah" } ], correctAnswer: "C", verse: "Judges 16:6-7", explanation: "Samson relied on his physical strength, but his true power came from God. Strength without obedience leads to trouble." },
        { id: "judges80", question: "What role did vows play?", options: [ { label: "A", text: "Blessings" }, { label: "B", text: "Commands" }, { label: "C", text: "Consequences" }, { label: "D", text: "Rituals" } ], correctAnswer: "C", verse: "Judges 11:30-39", explanation: "Vows in Judges often led to serious consequences, as seen in Jephthah's story. Words matter before God." },
        { id: "judges81", question: "What does Judges teach about obedience?", options: [ { label: "A", text: "Optional" }, { label: "B", text: "Rewarded" }, { label: "C", text: "Unimportant" }, { label: "D", text: "Impossible" } ], correctAnswer: "B", verse: "Judges 2:18", explanation: "Obedience to God is rewarded with peace and deliverance. Disobedience brings trouble and oppression." },
        { id: "judges82", question: "What happens when Israel cries out?", options: [ { label: "A", text: "Silence" }, { label: "B", text: "Judgment" }, { label: "C", text: "God sends deliverance" }, { label: "D", text: "Exile" } ], correctAnswer: "C", verse: "Judges 3:9,15", explanation: "Whenever Israel cried out, God raised up a deliverer. God's mercy is greater than our failures." },
        { id: "judges83", question: "Who delivered Israel from Midian?", options: [ { label: "A", text: "Samson" }, { label: "B", text: "Gideon" }, { label: "C", text: "Deborah" }, { label: "D", text: "Barak" } ], correctAnswer: "B", verse: "Judges 7:7", explanation: "Gideon delivered Israel from the Midianites with just 300 men, showing that victory belongs to God." },
        { id: "judges84", question: "Which judge showed wisdom as a woman?", options: [ { label: "A", text: "Jael" }, { label: "B", text: "Deborah" }, { label: "C", text: "Ruth" }, { label: "D", text: "Miriam" } ], correctAnswer: "B", verse: "Judges 4:4-5", explanation: "Deborah's wisdom and leadership brought peace to Israel. God uses both men and women to accomplish His will." },
        { id: "judges85", question: "What lesson comes from Samson?", options: [ { label: "A", text: "Strength saves" }, { label: "B", text: "Obedience matters" }, { label: "C", text: "Power lasts forever" }, { label: "D", text: "Vows are easy" } ], correctAnswer: "B", verse: "Judges 16:20", explanation: "Samson's downfall teaches that obedience to God is more important than strength or talent." },
        { id: "judges86", question: "What lesson comes from Gideon?", options: [ { label: "A", text: "Faith grows" }, { label: "B", text: "Fear rules" }, { label: "C", text: "Numbers matter" }, { label: "D", text: "Kingship saves" } ], correctAnswer: "A", verse: "Judges 6:36-40", explanation: "Gideon's story shows that faith can grow even in the midst of doubt and fear. God is patient with our questions." },
        { id: "judges87", question: "What lesson comes from Deborah?", options: [ { label: "A", text: "Leadership depends on gender" }, { label: "B", text: "God uses obedience" }, { label: "C", text: "War solves all" }, { label: "D", text: "Silence is strength" } ], correctAnswer: "B", verse: "Judges 4:6-9", explanation: "Deborah's obedience and courage led to victory. God honors those who trust and follow Him." },
        { id: "judges88", question: "What does Judges show about God’s patience?", options: [ { label: "A", text: "Limited" }, { label: "B", text: "Absent" }, { label: "C", text: "Enduring" }, { label: "D", text: "Unfair" } ], correctAnswer: "C", verse: "Judges 2:18", explanation: "God's patience with Israel is enduring, even when they repeatedly fail. His mercy is a constant theme in Judges." },
        { id: "judges89", question: "What does Judges warn future generations?", options: [ { label: "A", text: "Ignore law" }, { label: "B", text: "Forget history" }, { label: "C", text: "Trust God" }, { label: "D", text: "Reject leaders" } ], correctAnswer: "C", verse: "Judges 2:10", explanation: "Judges warns future generations to trust God and remember His works, lest they fall into the same patterns of sin." },
        { id: "judges90", question: "What does Judges reveal about human leadership?", options: [ { label: "A", text: "Perfect" }, { label: "B", text: "Temporary" }, { label: "C", text: "Flawed" }, { label: "D", text: "Eternal" } ], correctAnswer: "C", verse: "Judges 8:27", explanation: "Judges reveals that human leaders are flawed and temporary, but God remains faithful and sovereign." },
        { id: "judges91", question: "Why is Judges considered dark?", options: [ { label: "A", text: "Few miracles" }, { label: "B", text: "Many wars" }, { label: "C", text: "Moral decline" }, { label: "D", text: "Exile" } ], correctAnswer: "C", verse: "Judges 19:30", explanation: "Judges is considered dark because of the moral decline and violence that fill its pages. It is a warning against turning from God." },
        { id: "judges92", question: "What happens without godly leadership?", options: [ { label: "A", text: "Growth" }, { label: "B", text: "Unity" }, { label: "C", text: "Disorder" }, { label: "D", text: "Wealth" } ], correctAnswer: "C", verse: "Judges 21:25", explanation: "Without godly leadership, disorder and chaos reign. The book ends with everyone doing what is right in their own eyes." },
        { id: "judges93", question: "How does Judges connect to kings?", options: [ { label: "A", text: "Rejects kings" }, { label: "B", text: "Explains need for king" }, { label: "C", text: "Crowns king" }, { label: "D", text: "Predicts exile" } ], correctAnswer: "B", verse: "Judges 21:25", explanation: "Judges explains Israel's need for a king to provide godly leadership and unity." },
        { id: "judges94", question: "What theme repeats most?", options: [ { label: "A", text: "Faithfulness" }, { label: "B", text: "Repentance" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Prosperity" } ], correctAnswer: "C", verse: "Judges 2:19", explanation: "Rebellion is the most repeated theme in Judges. Each cycle of sin leads to oppression and the need for deliverance." },
        { id: "judges95", question: "Who delivers Israel each time?", options: [ { label: "A", text: "Kings" }, { label: "B", text: "Prophets" }, { label: "C", text: "Judges sent by God" }, { label: "D", text: "Armies" } ], correctAnswer: "C", verse: "Judges 2:16", explanation: "God sends judges to deliver Israel each time they repent. Salvation comes from God's initiative, not human effort." },
        { id: "judges96", question: "What does Judges show about grace?", options: [ { label: "A", text: "Absent" }, { label: "B", text: "Limited" }, { label: "C", text: "Repeated" }, { label: "D", text: "Ignored" } ], correctAnswer: "C", verse: "Judges 2:18", explanation: "God's grace is repeated throughout Judges, as He delivers Israel again and again despite their failures." },
        { id: "judges97", question: "What drives Israel back to God?", options: [ { label: "A", text: "Blessing" }, { label: "B", text: "Comfort" }, { label: "C", text: "Oppression" }, { label: "D", text: "Wealth" } ], correctAnswer: "C", verse: "Judges 3:9,15", explanation: "Oppression by enemies drives Israel back to God in repentance. Hardship often leads to spiritual renewal." },
        { id: "judges98", question: "What role does repentance play?", options: [ { label: "A", text: "None" }, { label: "B", text: "Rare" }, { label: "C", text: "Central" }, { label: "D", text: "Ignored" } ], correctAnswer: "C", verse: "Judges 10:10-16", explanation: "Repentance is central in Judges. When Israel repents, God responds with mercy and deliverance." },
        { id: "judges99", question: "What does Judges point toward?", options: [ { label: "A", text: "Exile" }, { label: "B", text: "Law" }, { label: "C", text: "Need for righteous king" }, { label: "D", text: "Silence" } ], correctAnswer: "C", verse: "Judges 21:25", explanation: "Judges points toward Israel's need for a righteous king who will lead them in God's ways." },
        { id: "judges100", question: "What is the ultimate message of Judges?", options: [ { label: "A", text: "Humans fail" }, { label: "B", text: "God remains faithful" }, { label: "C", text: "War is necessary" }, { label: "D", text: "Kings are evil" } ], correctAnswer: "B", verse: "Judges 2:18", explanation: "The ultimate message of Judges is that God remains faithful even when His people fail. His mercy endures forever." },
      { id: "judges51", question: "What was Samson forbidden to do?", options: [ { label: "A", text: "Eat meat" }, { label: "B", text: "Cut his hair" }, { label: "C", text: "Enter cities" }, { label: "D", text: "Speak vows" } ], correctAnswer: "B", verse: "Judges 13:5", explanation: "Samson was forbidden to cut his hair as part of his Nazarite vow. This outward sign represented his dedication to God." },
      { id: "judges52", question: "What animal did Samson kill with bare hands?", options: [ { label: "A", text: "Bear" }, { label: "B", text: "Lion" }, { label: "C", text: "Wolf" }, { label: "D", text: "Bull" } ], correctAnswer: "B", verse: "Judges 14:5-6", explanation: "Samson killed a lion with his bare hands, showing the supernatural strength God gave him for his mission." },
      { id: "judges53", question: "What did Samson pose at his wedding?", options: [ { label: "A", text: "Challenge" }, { label: "B", text: "Prayer" }, { label: "C", text: "Riddle" }, { label: "D", text: "Song" } ], correctAnswer: "C", verse: "Judges 14:12", explanation: "Samson posed a riddle to the Philistines at his wedding feast. His cleverness often led to conflict and drama." },
      { id: "judges54", question: "Who revealed Samson’s riddle?", options: [ { label: "A", text: "His friend" }, { label: "B", text: "His wife" }, { label: "C", text: "His father" }, { label: "D", text: "His enemy" } ], correctAnswer: "B", verse: "Judges 14:17", explanation: "Samson's wife revealed the answer to his riddle after much pressure. Betrayal by those close to us can bring pain and consequences." },
      { id: "judges55", question: "How did Samson catch the foxes?", options: [ { label: "A", text: "Nets" }, { label: "B", text: "Traps" }, { label: "C", text: "By hand" }, { label: "D", text: "With help" } ], correctAnswer: "C", verse: "Judges 15:4", explanation: "Samson caught 300 foxes by hand and used them to set the Philistines' fields on fire. His actions were both creative and destructive." },
      { id: "judges56", question: "What did Samson use to kill 1,000 Philistines?", options: [ { label: "A", text: "Sword" }, { label: "B", text: "Jawbone" }, { label: "C", text: "Spear" }, { label: "D", text: "Rock" } ], correctAnswer: "B", verse: "Judges 15:15", explanation: "Samson killed 1,000 Philistines with the jawbone of a donkey. God can use even the simplest tools for great victories." },
      { id: "judges57", question: "How did God help Samson when he was thirsty?", options: [ { label: "A", text: "Sent rain" }, { label: "B", text: "Provided water from rock" }, { label: "C", text: "Gave wine" }, { label: "D", text: "Sent angel" } ], correctAnswer: "B", verse: "Judges 15:18-19", explanation: "God provided water from a hollow place in the ground after Samson cried out in thirst. God cares for our needs even after victory." },
      { id: "judges58", question: "Who was Samson in love with?", options: [ { label: "A", text: "Ruth" }, { label: "B", text: "Jael" }, { label: "C", text: "Delilah" }, { label: "D", text: "Michal" } ], correctAnswer: "C", verse: "Judges 16:4", explanation: "Samson fell in love with Delilah, whose betrayal led to his downfall. Love can be powerful but also dangerous when misplaced." },
      { id: "judges59", question: "What was the source of Samson’s strength?", options: [ { label: "A", text: "Muscles" }, { label: "B", text: "Training" }, { label: "C", text: "God" }, { label: "D", text: "Armor" } ], correctAnswer: "C", verse: "Judges 16:17", explanation: "Samson's strength came from God, not just his hair. His power was a sign of God's presence and purpose in his life." },
      { id: "judges60", question: "How many times did Delilah ask his secret?", options: [ { label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "5" } ], correctAnswer: "C", verse: "Judges 16:15-16", explanation: "Delilah pressed Samson daily until he finally revealed his secret after four attempts. Persistence can wear down even the strongest." },
      { id: "judges61", question: "What happened after Samson’s hair was cut?", options: [ { label: "A", text: "He escaped" }, { label: "B", text: "Lost strength" }, { label: "C", text: "Won battle" }, { label: "D", text: "Became king" } ], correctAnswer: "B", verse: "Judges 16:19", explanation: "After his hair was cut, Samson lost his strength and was captured. Disobedience leads to loss of God's power." },
      { id: "judges62", question: "How did the Philistines punish Samson?", options: [ { label: "A", text: "Chained him" }, { label: "B", text: "Blinded him" }, { label: "C", text: "Beat him" }, { label: "D", text: "Exiled him" } ], correctAnswer: "B", verse: "Judges 16:21", explanation: "The Philistines blinded Samson and made him grind grain in prison. Sin's consequences can be severe, but God is still merciful." },
      { id: "judges63", question: "Where was Samson imprisoned?", options: [ { label: "A", text: "Gaza" }, { label: "B", text: "Ashkelon" }, { label: "C", text: "Gath" }, { label: "D", text: "Ekron" } ], correctAnswer: "A", verse: "Judges 16:21", explanation: "Samson was imprisoned in Gaza, a Philistine city. Even in defeat, God was not finished with him." },
      { id: "judges64", question: "How did Samson die?", options: [ { label: "A", text: "Old age" }, { label: "B", text: "Execution" }, { label: "C", text: "Collapsing temple" }, { label: "D", text: "Battle" } ], correctAnswer: "C", verse: "Judges 16:29-30", explanation: "Samson died by collapsing the Philistine temple, killing many enemies. His final act was one of faith and sacrifice." },
      { id: "judges65", question: "Who did Samson kill in his death?", options: [ { label: "A", text: "Soldiers" }, { label: "B", text: "Kings" }, { label: "C", text: "Philistines" }, { label: "D", text: "Judges" } ], correctAnswer: "C", verse: "Judges 16:30", explanation: "Samson killed more Philistines in his death than in his life. God can redeem even our failures for His glory." },
      { id: "judges66", question: "What phrase is repeated in Judges?", options: [ { label: "A", text: "God is faithful" }, { label: "B", text: "There was no king" }, { label: "C", text: "Israel obeyed" }, { label: "D", text: "Peace reigned" } ], correctAnswer: "B", verse: "Judges 17:6; 21:25", explanation: "The phrase 'There was no king in Israel' is repeated, highlighting the need for godly leadership and the dangers of doing what is right in one's own eyes." },
      { id: "judges67", question: "What did people do when there was no king?", options: [ { label: "A", text: "Worship idols" }, { label: "B", text: "What was right in their own eyes" }, { label: "C", text: "Followed prophets" }, { label: "D", text: "Fled the land" } ], correctAnswer: "B", verse: "Judges 21:25", explanation: "Everyone did what was right in their own eyes, leading to chaos and moral decline. God's standard is needed for true justice." },
      { id: "judges68", question: "What crime sparked civil war?", options: [ { label: "A", text: "Idolatry" }, { label: "B", text: "Murder" }, { label: "C", text: "Abuse of a concubine" }, { label: "D", text: "Theft" } ], correctAnswer: "C", verse: "Judges 19:25-30", explanation: "The abuse and death of a Levite's concubine led to outrage and civil war. Sin left unchecked destroys communities." },
      { id: "judges69", question: "Which tribe was nearly wiped out?", options: [ { label: "A", text: "Judah" }, { label: "B", text: "Levi" }, { label: "C", text: "Benjamin" }, { label: "D", text: "Dan" } ], correctAnswer: "C", verse: "Judges 20:46-48", explanation: "The tribe of Benjamin was nearly destroyed in the civil war. Division and violence among God's people bring devastation." },
      { id: "judges70", question: "How did Israel provide wives for Benjamin?", options: [ { label: "A", text: "Treaties" }, { label: "B", text: "Ransoming" }, { label: "C", text: "Festivals" }, { label: "D", text: "Kidnapping" } ], correctAnswer: "D", verse: "Judges 21:20-23", explanation: "Wives were provided for Benjamin by kidnapping women at a festival. The story shows the desperate measures taken to preserve a tribe." },
    { id: "judges31", question: "What did Gideon make that became a snare?", options: [ { label: "A", text: "An altar" }, { label: "B", text: "An ephod" }, { label: "C", text: "A crown" }, { label: "D", text: "A statue" } ], correctAnswer: "B", verse: "Judges 8:27", explanation: "Gideon made an ephod from gold, which became an object of false worship. Even good leaders can make mistakes that lead others astray." },
    { id: "judges32", question: "Who became king after Gideon?", options: [ { label: "A", text: "Saul" }, { label: "B", text: "Samson" }, { label: "C", text: "Abimelech" }, { label: "D", text: "Tola" } ], correctAnswer: "C", verse: "Judges 9:1-6", explanation: "Abimelech, Gideon's son, made himself king by violence. His story warns against seeking power for selfish reasons." },
    { id: "judges33", question: "From where did Abimelech rule?", options: [ { label: "A", text: "Hebron" }, { label: "B", text: "Bethel" }, { label: "C", text: "Shechem" }, { label: "D", text: "Shiloh" } ], correctAnswer: "C", verse: "Judges 9:6", explanation: "Abimelech ruled from Shechem, a city with a troubled history. Leadership rooted in violence brings instability." },
    { id: "judges34", question: "How did Abimelech die?", options: [ { label: "A", text: "Sword" }, { label: "B", text: "Fire" }, { label: "C", text: "Woman dropped a millstone" }, { label: "D", text: "Disease" } ], correctAnswer: "C", verse: "Judges 9:53-54", explanation: "A woman dropped a millstone on Abimelech's head, fulfilling God's judgment. Pride and cruelty lead to a tragic end." },
    { id: "judges35", question: "Which judge had many sons riding donkeys?", options: [ { label: "A", text: "Jair" }, { label: "B", text: "Ibzan" }, { label: "C", text: "Tola" }, { label: "D", text: "Elon" } ], correctAnswer: "A", verse: "Judges 10:3-4", explanation: "Jair had thirty sons who rode on thirty donkeys, symbolizing wealth and status. His leadership brought stability for a time." },
    { id: "judges36", question: "How many years did Tola judge Israel?", options: [ { label: "A", text: "10" }, { label: "B", text: "20" }, { label: "C", text: "23" }, { label: "D", text: "40" } ], correctAnswer: "C", verse: "Judges 10:2", explanation: "Tola judged Israel for twenty-three years, bringing peace after Abimelech's violence. Faithful service often goes unnoticed but is valuable to God." },
    { id: "judges37", question: "Which judge was rejected by his brothers?", options: [ { label: "A", text: "Samson" }, { label: "B", text: "Jephthah" }, { label: "C", text: "Gideon" }, { label: "D", text: "Barak" } ], correctAnswer: "B", verse: "Judges 11:1-2", explanation: "Jephthah was driven away by his brothers but later called back to lead. God can use those rejected by others for His purposes." },
    { id: "judges38", question: "Who made a rash vow involving his daughter?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Samson" }, { label: "C", text: "Jephthah" }, { label: "D", text: "Eli" } ], correctAnswer: "C", verse: "Judges 11:30-39", explanation: "Jephthah vowed to sacrifice the first thing that greeted him, which turned out to be his daughter. Rash promises can have tragic consequences." },
    { id: "judges39", question: "What was Jephthah’s vow?", options: [ { label: "A", text: "To fast" }, { label: "B", text: "To build a temple" }, { label: "C", text: "To sacrifice whoever came out first" }, { label: "D", text: "To destroy idols" } ], correctAnswer: "C", verse: "Judges 11:30-31", explanation: "Jephthah promised to sacrifice the first to greet him if God gave victory. Careless words can lead to deep regret." },
    { id: "judges40", question: "Who were Israel’s enemies during Jephthah’s time?", options: [ { label: "A", text: "Philistines" }, { label: "B", text: "Ammonites" }, { label: "C", text: "Midianites" }, { label: "D", text: "Egyptians" } ], correctAnswer: "B", verse: "Judges 10:7-9", explanation: "The Ammonites oppressed Israel during Jephthah's time. God allowed enemies to rise when Israel turned away from Him." },
    { id: "judges41", question: "Which tribe fought Jephthah afterward?", options: [ { label: "A", text: "Judah" }, { label: "B", text: "Dan" }, { label: "C", text: "Ephraim" }, { label: "D", text: "Levi" } ], correctAnswer: "C", verse: "Judges 12:1", explanation: "The tribe of Ephraim quarreled with Jephthah after his victory. Internal conflict can be as damaging as external threats." },
    { id: "judges42", question: "What word exposed the Ephraimites?", options: [ { label: "A", text: "Hallelujah" }, { label: "B", text: "Shibboleth" }, { label: "C", text: "Amen" }, { label: "D", text: "Selah" } ], correctAnswer: "B", verse: "Judges 12:6", explanation: "The word 'Shibboleth' was used to identify Ephraimites, who could not pronounce it correctly. Small differences can have big consequences." },
    { id: "judges43", question: "How many Ephraimites died?", options: [ { label: "A", text: "10,000" }, { label: "B", text: "20,000" }, { label: "C", text: "32,000" }, { label: "D", text: "42,000" } ], correctAnswer: "D", verse: "Judges 12:6", explanation: "42,000 Ephraimites died because of the conflict with Jephthah. Division among God's people leads to great loss." },
    { id: "judges44", question: "Which judge had thirty sons?", options: [ { label: "A", text: "Jair" }, { label: "B", text: "Samson" }, { label: "C", text: "Gideon" }, { label: "D", text: "Elon" } ], correctAnswer: "A", verse: "Judges 10:4", explanation: "Jair had thirty sons, symbolizing prosperity and influence. Leadership often brings blessings to families as well as challenges." },
    { id: "judges45", question: "How long did Ibzan judge Israel?", options: [ { label: "A", text: "5 years" }, { label: "B", text: "7 years" }, { label: "C", text: "8 years" }, { label: "D", text: "10 years" } ], correctAnswer: "C", verse: "Judges 12:8-9", explanation: "Ibzan judged Israel for seven years, and his large family is noted. Faithfulness in small things is honored by God." },
    { id: "judges46", question: "What region was Ibzan from?", options: [ { label: "A", text: "Bethlehem" }, { label: "B", text: "Dan" }, { label: "C", text: "Gilead" }, { label: "D", text: "Ephraim" } ], correctAnswer: "A", verse: "Judges 12:8", explanation: "Ibzan was from Bethlehem, a town later famous as the birthplace of David and Jesus. God often uses humble places for great purposes." },
    { id: "judges47", question: "Which judge is best known for strength?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Samson" }, { label: "C", text: "Barak" }, { label: "D", text: "Tola" } ], correctAnswer: "B", verse: "Judges 13:24-25", explanation: "Samson is famous for his supernatural strength, given by God. His life shows both the potential and the pitfalls of spiritual gifts." },
    { id: "judges48", question: "What tribe was Samson from?", options: [ { label: "A", text: "Judah" }, { label: "B", text: "Benjamin" }, { label: "C", text: "Dan" }, { label: "D", text: "Levi" } ], correctAnswer: "C", verse: "Judges 13:2,24", explanation: "Samson was from the tribe of Dan. God chooses leaders from every tribe and background." },
    { id: "judges49", question: "What vow was Samson under?", options: [ { label: "A", text: "Priesthood" }, { label: "B", text: "Nazarite" }, { label: "C", text: "Kingship" }, { label: "D", text: "Prophet" } ], correctAnswer: "B", verse: "Judges 13:5", explanation: "Samson was a Nazarite from birth, set apart to God. The vow included not cutting his hair, drinking wine, or touching the dead." },
    { id: "judges50", question: "Who announced Samson’s birth?", options: [ { label: "A", text: "Prophet" }, { label: "B", text: "Priest" }, { label: "C", text: "Angel of the Lord" }, { label: "D", text: "Judge" } ], correctAnswer: "C", verse: "Judges 13:3", explanation: "The angel of the Lord appeared to Samson's mother to announce his birth. God often reveals His plans in advance to those He calls." },
  { id: "judges01", question: "Who comes after Joshua as the leader of Israel?", options: [ { label: "A", text: "Moses" }, { label: "B", text: "The Judges" }, { label: "C", text: "Saul" }, { label: "D", text: "David" } ], correctAnswer: "B", verse: "Judges 2:16", explanation: "After Joshua's death, God raised up judges to lead and deliver Israel. This period shows God's faithfulness despite Israel's repeated failures." },
  { id: "judges02", question: "What book of the Bible comes directly before Judges?", options: [ { label: "A", text: "Deuteronomy" }, { label: "B", text: "Numbers" }, { label: "C", text: "Joshua" }, { label: "D", text: "Ruth" } ], correctAnswer: "C", verse: "Joshua 24:29-31", explanation: "The book of Joshua ends with the death of Joshua, and Judges begins the story of Israel after his leadership." },
  { id: "judges03", question: "What cycle repeats throughout the book of Judges?", options: [ { label: "A", text: "Blessing and prosperity" }, { label: "B", text: "Sin, oppression, repentance, deliverance" }, { label: "C", text: "War and exile" }, { label: "D", text: "Kingship and peace" } ], correctAnswer: "B", verse: "Judges 2:11-19", explanation: "Judges describes a repeated cycle: Israel sins, is oppressed, cries out, and God delivers them through a judge. This pattern reveals both human weakness and divine mercy." },
  { id: "judges04", question: "Who was the first judge mentioned in Judges?", options: [ { label: "A", text: "Deborah" }, { label: "B", text: "Gideon" }, { label: "C", text: "Othniel" }, { label: "D", text: "Samson" } ], correctAnswer: "C", verse: "Judges 3:9", explanation: "Othniel is the first judge raised up by God to deliver Israel from oppression, showing that God provides leaders in times of need." },
  { id: "judges05", question: "Which tribe failed to fully drive out the Canaanites?", options: [ { label: "A", text: "Judah" }, { label: "B", text: "Benjamin" }, { label: "C", text: "Ephraim" }, { label: "D", text: "Multiple tribes" } ], correctAnswer: "D", verse: "Judges 1:27-36", explanation: "Several tribes, including Manasseh, Ephraim, Zebulun, Asher, and Naphtali, failed to drive out the Canaanites completely, leading to ongoing trouble and compromise." },
  { id: "judges06", question: "What happened when Israel forgot the Lord?", options: [ { label: "A", text: "Peace increased" }, { label: "B", text: "They were oppressed by enemies" }, { label: "C", text: "They gained wealth" }, { label: "D", text: "They moved locations" } ], correctAnswer: "B", verse: "Judges 2:13-15", explanation: "When Israel turned away from God, He allowed their enemies to oppress them. Forgetting God always led to hardship and loss of peace." },
  { id: "judges07", question: "Who raised judges to deliver Israel?", options: [ { label: "A", text: "Moses" }, { label: "B", text: "The elders" }, { label: "C", text: "God" }, { label: "D", text: "The priests" } ], correctAnswer: "C", verse: "Judges 2:16", explanation: "God Himself raised up judges to save Israel from their enemies, showing His mercy and desire to rescue His people." },
  { id: "judges08", question: "What nation oppressed Israel before Othniel judged them?", options: [ { label: "A", text: "Philistines" }, { label: "B", text: "Midianites" }, { label: "C", text: "Moabites" }, { label: "D", text: "Mesopotamians" } ], correctAnswer: "D", verse: "Judges 3:8", explanation: "The king of Mesopotamia oppressed Israel for eight years until God raised up Othniel to deliver them. Oppression followed Israel's disobedience." },
  { id: "judges09", question: "How long did the land have rest under Othniel?", options: [ { label: "A", text: "20 years" }, { label: "B", text: "40 years" }, { label: "C", text: "10 years" }, { label: "D", text: "7 years" } ], correctAnswer: "B", verse: "Judges 3:11", explanation: "After Othniel delivered Israel, the land had rest for forty years. Obedience and deliverance brought peace and stability." },
  { id: "judges10", question: "Who was the left handed judge from Benjamin?", options: [ { label: "A", text: "Shamgar" }, { label: "B", text: "Gideon" }, { label: "C", text: "Ehud" }, { label: "D", text: "Tola" } ], correctAnswer: "C", verse: "Judges 3:15", explanation: "Ehud, a left-handed man from the tribe of Benjamin, was chosen by God to deliver Israel from the Moabites. His unique ability played a key role in God's plan." },

  { id: "judges11", question: "Which enemy king did Ehud defeat?", options: [ { label: "A", text: "Sisera" }, { label: "B", text: "Eglon" }, { label: "C", text: "Og" }, { label: "D", text: "Balak" } ], correctAnswer: "B", verse: "Judges 3:14-21", explanation: "Ehud defeated Eglon, king of Moab, by a daring act of courage. God used Ehud's unique skills to deliver Israel from oppression." },
  { id: "judges12", question: "How did Ehud assassinate King Eglon?", options: [ { label: "A", text: "With poison" }, { label: "B", text: "With a spear" }, { label: "C", text: "With a dagger" }, { label: "D", text: "With fire" } ], correctAnswer: "C", verse: "Judges 3:21-22", explanation: "Ehud used a double-edged dagger to kill Eglon. His left-handedness allowed him to conceal the weapon, showing God's creativity in deliverance." },
  { id: "judges13", question: "How many years did Moab oppress Israel?", options: [ { label: "A", text: "10" }, { label: "B", text: "12" }, { label: "C", text: "18" }, { label: "D", text: "40" } ], correctAnswer: "C", verse: "Judges 3:14", explanation: "Moab oppressed Israel for eighteen years before God raised up Ehud. Oppression lasted until the people cried out to God for help." },
  { id: "judges14", question: "Who defeated 600 Philistines with an oxgoad?", options: [ { label: "A", text: "Samson" }, { label: "B", text: "Shamgar" }, { label: "C", text: "Gideon" }, { label: "D", text: "Barak" } ], correctAnswer: "B", verse: "Judges 3:31", explanation: "Shamgar struck down 600 Philistines with an oxgoad, a farming tool. God can use anyone and anything for His purposes." },
  { id: "judges15", question: "What weapon did Shamgar use?", options: [ { label: "A", text: "Sword" }, { label: "B", text: "Spear" }, { label: "C", text: "OX goad" }, { label: "D", text: "Sling" } ], correctAnswer: "C", verse: "Judges 3:31", explanation: "The oxgoad, a simple farm implement, became a weapon in Shamgar's hand. God empowers ordinary people to do extraordinary things." },
  { id: "judges16", question: "Who was the female judge and prophetess?", options: [ { label: "A", text: "Miriam" }, { label: "B", text: "Ruth" }, { label: "C", text: "Deborah" }, { label: "D", text: "Huldah" } ], correctAnswer: "C", verse: "Judges 4:4", explanation: "Deborah was both a judge and a prophetess, leading Israel with wisdom and courage. Her story shows God values faithful leadership regardless of gender." },
  { id: "judges17", question: "Under what tree did Deborah hold court?", options: [ { label: "A", text: "Oak" }, { label: "B", text: "Palm" }, { label: "C", text: "Fig" }, { label: "D", text: "Cedar" } ], correctAnswer: "B", verse: "Judges 4:5", explanation: "Deborah held court under the Palm of Deborah, a place where people came for judgment. Her leadership brought peace and justice to Israel." },
  { id: "judges18", question: "Who commanded Israel’s army under Deborah?", options: [ { label: "A", text: "Gideon" }, { label: "B", text: "Samson" }, { label: "C", text: "Barak" }, { label: "D", text: "Jephthah" } ], correctAnswer: "C", verse: "Judges 4:6-7", explanation: "Barak was called by Deborah to lead Israel's army. Their partnership in battle highlights the importance of obedience and teamwork in God's plan." },
  { id: "judges19", question: "Which woman killed Sisera?", options: [ { label: "A", text: "Deborah" }, { label: "B", text: "Jael" }, { label: "C", text: "Delilah" }, { label: "D", text: "Rahab" } ], correctAnswer: "B", verse: "Judges 4:21", explanation: "Jael killed Sisera by driving a tent peg through his head. Her bold action fulfilled Deborah's prophecy and brought victory to Israel." },
  { id: "judges20", question: "How did Jael kill Sisera?", options: [ { label: "A", text: "Sword" }, { label: "B", text: "Arrow" }, { label: "C", text: "Tent peg" }, { label: "D", text: "Stone" } ], correctAnswer: "C", verse: "Judges 4:21", explanation: "Jael used a tent peg and hammer to kill Sisera while he slept. God used unexpected people to accomplish His deliverance." },
  { id: "judges21", question: "What song celebrates Deborah’s victory?", options: [ { label: "A", text: "Song of Moses" }, { label: "B", text: "Song of Miriam" }, { label: "C", text: "Song of Deborah" }, { label: "D", text: "Song of Hannah" } ], correctAnswer: "C", verse: "Judges 5:1-2", explanation: "The Song of Deborah celebrates the victory over Sisera. Songs in Scripture often mark God's deliverance and inspire future faith." },
  { id: "judges22", question: "Which judge was called a mighty warrior by an angel?", options: [ { label: "A", text: "Samson" }, { label: "B", text: "Gideon" }, { label: "C", text: "Jephthah" }, { label: "D", text: "Tola" } ], correctAnswer: "B", verse: "Judges 6:12", explanation: "Gideon was called a mighty warrior by the angel of the Lord, even though he felt weak. God sees potential where we see limitation." },
  { id: "judges23", question: "Who was Gideon’s father?", options: [ { label: "A", text: "Jesse" }, { label: "B", text: "Manoah" }, { label: "C", text: "Joash" }, { label: "D", text: "Abinadab" } ], correctAnswer: "C", verse: "Judges 6:11", explanation: "Joash was Gideon's father. Gideon's family background did not prevent God from using him for great things." },
  { id: "judges24", question: "Where was Gideon when the angel appeared?", options: [ { label: "A", text: "Temple" }, { label: "B", text: "Field" }, { label: "C", text: "Winepress" }, { label: "D", text: "Mountain" } ], correctAnswer: "C", verse: "Judges 6:11", explanation: "Gideon was threshing wheat in a winepress to hide from the Midianites. God meets us in our fear and calls us to courage." },
  { id: "judges25", question: "What sign did Gideon ask for?", options: [ { label: "A", text: "Fire from heaven" }, { label: "B", text: "A fleece" }, { label: "C", text: "A rainbow" }, { label: "D", text: "Thunder" } ], correctAnswer: "B", verse: "Judges 6:36-40", explanation: "Gideon asked for a sign with a fleece to confirm God's will. God is patient with our doubts and questions." },
  { id: "judges26", question: "How many men did Gideon start with?", options: [ { label: "A", text: "3,000" }, { label: "B", text: "10,000" }, { label: "C", text: "22,000" }, { label: "D", text: "32,000" } ], correctAnswer: "D", verse: "Judges 7:3", explanation: "Gideon started with 32,000 men, but God reduced the number to show that victory comes from Him, not human strength." },
  { id: "judges27", question: "How many men remained in Gideon’s army?", options: [ { label: "A", text: "500" }, { label: "B", text: "300" }, { label: "C", text: "1,000" }, { label: "D", text: "3,000" } ], correctAnswer: "B", verse: "Judges 7:6-7", explanation: "Only 300 men remained with Gideon. God delights in using small numbers to accomplish great things." },
  { id: "judges28", question: "Which enemy did Gideon defeat?", options: [ { label: "A", text: "Philistines" }, { label: "B", text: "Moabites" }, { label: "C", text: "Midianites" }, { label: "D", text: "Amorites" } ], correctAnswer: "C", verse: "Judges 7:12-25", explanation: "Gideon defeated the Midianites with God's help. The victory was miraculous and brought peace to Israel for a time." },
  { id: "judges29", question: "What unusual weapons did Gideon’s army carry?", options: [ { label: "A", text: "Bows and arrows" }, { label: "B", text: "Swords and shields" }, { label: "C", text: "Trumpets and jars" }, { label: "D", text: "Spears and nets" } ], correctAnswer: "C", verse: "Judges 7:16-20", explanation: "Gideon's men carried trumpets, empty jars, and torches. God used unconventional means to confuse and defeat the enemy." },
  { id: "judges30", question: "What did the soldiers shout?", options: [ { label: "A", text: "For Israel" }, { label: "B", text: "For the Lord and Gideon" }, { label: "C", text: "Victory is ours" }, { label: "D", text: "God saves" } ], correctAnswer: "B", verse: "Judges 7:20", explanation: "The soldiers shouted, 'A sword for the Lord and for Gideon!' Their faith and obedience brought victory against overwhelming odds." },

];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JudgesTriviaPage() {
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
        // Fetch user's progress for judges questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'judges');

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
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }
        // Insert into master_actions via server-side API (uses service role)
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'judges' });
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
            book: 'judges'
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
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions(prev => {
          const updated = [...prev];
          updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], verseText };
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
    if (score === 10) return "Perfect! You're a Judges expert!";
    if (score >= 8) return "Excellent! You know Judges well!";
    if (score >= 6) return "Good job! Keep studying Judges!";
    if (score >= 4) return "Nice try! Judges has much to explore!";
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
              href="/bible-trivia/judges"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
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
            className="text-gray-600 hover:text-gray-800 transition-all duration-300"
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
            className="relative w-full transition-transform duration-500 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
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
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
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

