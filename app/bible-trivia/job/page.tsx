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
  { id: "job1", question: "Who is the main character of the book of Job?", options: [{ label: "A", text: "Eliphaz" }, { label: "B", text: "Job" }, { label: "C", text: "Elihu" }, { label: "D", text: "Bildad" }], correctAnswer: "B", verse: "Job 1:1", explanation: "Job is introduced as the central figure." },
  { id: "job2", question: "Where did Job live?", options: [{ label: "A", text: "Canaan" }, { label: "B", text: "Uz" }, { label: "C", text: "Egypt" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Job 1:1", explanation: "Job lived in the land of Uz." },
  { id: "job3", question: "How is Job described at the start?", options: [{ label: "A", text: "Rich and powerful" }, { label: "B", text: "Blameless and upright" }, { label: "C", text: "Wise and strong" }, { label: "D", text: "Feared by kings" }], correctAnswer: "B", verse: "Job 1:1", explanation: "Job feared God and turned from evil." },
  { id: "job4", question: "How many sons did Job have?", options: [{ label: "A", text: "3" }, { label: "B", text: "7" }, { label: "C", text: "10" }, { label: "D", text: "12" }], correctAnswer: "B", verse: "Job 1:2", explanation: "Job had seven sons." },
  { id: "job5", question: "How many daughters did Job have?", options: [{ label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "5" }, { label: "D", text: "7" }], correctAnswer: "B", verse: "Job 1:2", explanation: "Job had three daughters." },
  { id: "job6", question: "What did Job regularly do for his children?", options: [{ label: "A", text: "Feasts" }, { label: "B", text: "Sacrifices" }, { label: "C", text: "Teaching" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Job 1:5", explanation: "Job offered sacrifices on their behalf." },
  { id: "job7", question: "Who appeared before God in Job 1?", options: [{ label: "A", text: "Angels only" }, { label: "B", text: "Prophets" }, { label: "C", text: "Satan" }, { label: "D", text: "Priests" }], correctAnswer: "C", verse: "Job 1:6", explanation: "Satan came among the sons of God." },
  { id: "job8", question: "What question did God ask Satan about Job?", options: [{ label: "A", text: "Why does he suffer?" }, { label: "B", text: "Have you considered my servant Job?" }, { label: "C", text: "Will he curse me?" }, { label: "D", text: "Is he faithful?" }], correctAnswer: "B", verse: "Job 1:8", explanation: "God highlighted Job's faithfulness." },
  { id: "job9", question: "What accusation did Satan make?", options: [{ label: "A", text: "Job is sinful" }, { label: "B", text: "Job fears God for nothing" }, { label: "C", text: "Job is weak" }, { label: "D", text: "Job is proud" }], correctAnswer: "B", verse: "Job 1:9", explanation: "Satan questioned Job's motives." },
  { id: "job10", question: "What was Satan allowed to take first?", options: [{ label: "A", text: "Job's health" }, { label: "B", text: "Job's children and possessions" }, { label: "C", text: "Job's wife" }, { label: "D", text: "Job's faith" }], correctAnswer: "B", verse: "Job 1:12-19", explanation: "Job lost wealth and children." },
  { id: "job11", question: "How did Job respond to his losses?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Worship" }, { label: "C", text: "Silence" }, { label: "D", text: "Complaint" }], correctAnswer: "B", verse: "Job 1:20", explanation: "Job worshiped God." },
  { id: "job12", question: "What did Job say about the Lord?", options: [{ label: "A", text: "The Lord is cruel" }, { label: "B", text: "The Lord gives and takes away" }, { label: "C", text: "The Lord abandoned me" }, { label: "D", text: "The Lord is distant" }], correctAnswer: "B", verse: "Job 1:21", explanation: "Job acknowledged God's sovereignty." },
  { id: "job13", question: "Did Job sin with his words?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Later" }, { label: "D", text: "Sometimes" }], correctAnswer: "B", verse: "Job 1:22", explanation: "Job did not sin." },
  { id: "job14", question: "What affliction was Job given next?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Painful sores" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Fever" }], correctAnswer: "B", verse: "Job 2:7", explanation: "Job was struck with sores." },
  { id: "job15", question: "Where did Job sit in his suffering?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "City gate" }, { label: "C", text: "Ash heap" }, { label: "D", text: "House" }], correctAnswer: "C", verse: "Job 2:8", explanation: "Job sat among ashes." },
  { id: "job16", question: "What advice did Job's wife give?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Curse God and die" }, { label: "C", text: "Seek help" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Job 2:9", explanation: "She urged him to curse God." },
  { id: "job17", question: "How did Job respond to his wife?", options: [{ label: "A", text: "Agreed" }, { label: "B", text: "Rebuked her" }, { label: "C", text: "Ignored her" }, { label: "D", text: "Left her" }], correctAnswer: "B", verse: "Job 2:10", explanation: "Job upheld faith." },
  { id: "job18", question: "Who came to comfort Job?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Three friends" }, { label: "C", text: "Family" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Job 2:11", explanation: "Three friends visited him." },
  { id: "job19", question: "How long did they sit silently?", options: [{ label: "A", text: "One day" }, { label: "B", text: "Three days" }, { label: "C", text: "Seven days" }, { label: "D", text: "Ten days" }], correctAnswer: "C", verse: "Job 2:13", explanation: "They sat in silence seven days." },
  { id: "job20", question: "What did Job curse in chapter 3?", options: [{ label: "A", text: "God" }, { label: "B", text: "His friends" }, { label: "C", text: "The day of his birth" }, { label: "D", text: "Satan" }], correctAnswer: "C", verse: "Job 3:1", explanation: "Job cursed the day he was born." },
  { id: "job21", question: "Who spoke first among the friends?", options: [{ label: "A", text: "Bildad" }, { label: "B", text: "Zophar" }, { label: "C", text: "Eliphaz" }, { label: "D", text: "Elihu" }], correctAnswer: "C", verse: "Job 4:1", explanation: "Eliphaz spoke first." },
  { id: "job22", question: "What did Eliphaz imply?", options: [{ label: "A", text: "Suffering is random" }, { label: "B", text: "Job must have sinned" }, { label: "C", text: "God is unjust" }, { label: "D", text: "Satan is powerful" }], correctAnswer: "B", verse: "Job 4-5", explanation: "Eliphaz believed suffering comes from sin." },
  { id: "job23", question: "How did Job view his suffering?", options: [{ label: "A", text: "Deserved" }, { label: "B", text: "Unexplained" }, { label: "C", text: "Punishment" }, { label: "D", text: "Temporary only" }], correctAnswer: "B", verse: "Job 6-7", explanation: "Job did not understand why." },
  { id: "job24", question: "Who spoke second?", options: [{ label: "A", text: "Eliphaz" }, { label: "B", text: "Zophar" }, { label: "C", text: "Bildad" }, { label: "D", text: "Elihu" }], correctAnswer: "C", verse: "Job 8:1", explanation: "Bildad spoke second." },
  { id: "job25", question: "What did Bildad emphasize?", options: [{ label: "A", text: "God's mercy" }, { label: "B", text: "God's justice" }, { label: "C", text: "God's silence" }, { label: "D", text: "Human wisdom" }], correctAnswer: "B", verse: "Job 8", explanation: "Bildad stressed divine justice." },
  { id: "job26", question: "Who spoke third?", options: [{ label: "A", text: "Zophar" }, { label: "B", text: "Bildad" }, { label: "C", text: "Eliphaz" }, { label: "D", text: "Elihu" }], correctAnswer: "A", verse: "Job 11:1", explanation: "Zophar spoke third." },
  { id: "job27", question: "What was Zophar's tone?", options: [{ label: "A", text: "Gentle" }, { label: "B", text: "Harsh" }, { label: "C", text: "Hopeful" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Job 11", explanation: "Zophar was blunt and harsh." },
  { id: "job28", question: "What did all three friends assume?", options: [{ label: "A", text: "God is silent" }, { label: "B", text: "Suffering equals sin" }, { label: "C", text: "Job is innocent" }, { label: "D", text: "Satan is to blame" }], correctAnswer: "B", verse: "Job 4-11", explanation: "They believed suffering was punishment." },
  { id: "job29", question: "How did Job maintain his stance?", options: [{ label: "A", text: "Confession" }, { label: "B", text: "Claiming innocence" }, { label: "C", text: "Silence" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Job 6-7", explanation: "Job insisted he had not sinned." },
  { id: "job30", question: "What theme dominates early Job?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Unexplained suffering" }, { label: "C", text: "Kingship" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "Job overview", explanation: "The book wrestles with suffering." },
  { id: "job31", question: "What does Job long for repeatedly?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Death" }, { label: "C", text: "Vindication" }, { label: "D", text: "Revenge" }], correctAnswer: "C", verse: "Job 13:3", explanation: "Job wanted to present his case." },
  { id: "job32", question: "What does Job believe about God?", options: [{ label: "A", text: "God is unjust" }, { label: "B", text: "God is sovereign" }, { label: "C", text: "God abandoned him" }, { label: "D", text: "God is cruel" }], correctAnswer: "B", verse: "Job 13:15", explanation: "Job trusted God despite pain." },
  { id: "job33", question: "What famous declaration does Job make?", options: [{ label: "A", text: "I am innocent" }, { label: "B", text: "Though He slay me, I will hope in Him" }, { label: "C", text: "God has forgotten me" }, { label: "D", text: "Life is meaningless" }], correctAnswer: "B", verse: "Job 13:15", explanation: "Job clung to faith." },
  { id: "job34", question: "What does Job desire from God?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "An explanation" }, { label: "C", text: "Punishment" }, { label: "D", text: "Death only" }], correctAnswer: "B", verse: "Job 14", explanation: "Job wants answers." },
  { id: "job35", question: "What metaphor does Job use for life?", options: [{ label: "A", text: "A mountain" }, { label: "B", text: "A shadow" }, { label: "C", text: "A journey" }, { label: "D", text: "A battle" }], correctAnswer: "B", verse: "Job 14:2", explanation: "Life is fleeting like a shadow." },
  { id: "job36", question: "What hope does Job express about death?", options: [{ label: "A", text: "No hope" }, { label: "B", text: "Resurrection" }, { label: "C", text: "Reincarnation" }, { label: "D", text: "Oblivion" }], correctAnswer: "B", verse: "Job 14:14", explanation: "Job wonders about life after death." },
  { id: "job37", question: "Who begins a second round of speeches?", options: [{ label: "A", text: "Bildad" }, { label: "B", text: "Zophar" }, { label: "C", text: "Eliphaz" }, { label: "D", text: "Elihu" }], correctAnswer: "C", verse: "Job 15:1", explanation: "Eliphaz speaks again." },
  { id: "job38", question: "How does Eliphaz's tone change?", options: [{ label: "A", text: "More gentle" }, { label: "B", text: "More accusatory" }, { label: "C", text: "Hopeful" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Job 15", explanation: "He becomes more harsh." },
  { id: "job39", question: "What does Job continue to deny?", options: [{ label: "A", text: "God's power" }, { label: "B", text: "Hidden sin" }, { label: "C", text: "Death" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Job 16", explanation: "Job denies secret sin." },
  { id: "job40", question: "Who does Job describe as his witness?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "God in heaven" }, { label: "C", text: "Friends" }, { label: "D", text: "Family" }], correctAnswer: "B", verse: "Job 16:19", explanation: "Job trusts God as his witness." },
  { id: "job41", question: "What famous statement about a redeemer does Job make?", options: [{ label: "A", text: "I will be avenged" }, { label: "B", text: "I know that my Redeemer lives" }, { label: "C", text: "God has left me" }, { label: "D", text: "Death is the end" }], correctAnswer: "B", verse: "Job 19:25", explanation: "Job expresses hope in a Redeemer." },
  { id: "job42", question: "Who does Job accuse of wronging him?", options: [{ label: "A", text: "Satan" }, { label: "B", text: "God" }, { label: "C", text: "Friends" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Job 19:22", explanation: "Job feels afflicted by God." },
  { id: "job43", question: "What does Job desire to do with his words?", options: [{ label: "A", text: "Forget them" }, { label: "B", text: "Have them written down" }, { label: "C", text: "Speak privately" }, { label: "D", text: "Burn them" }], correctAnswer: "B", verse: "Job 19:23-24", explanation: "Job wants his testimony preserved." },
  { id: "job44", question: "What do the friends fail to do?", options: [{ label: "A", text: "Speak" }, { label: "B", text: "Comfort" }, { label: "C", text: "Pray" }, { label: "D", text: "Listen" }], correctAnswer: "B", verse: "Job 16:2", explanation: "They are miserable comforters." },
  { id: "job45", question: "What cycle repeats throughout Job?", options: [{ label: "A", text: "Prayer and fasting" }, { label: "B", text: "Accusation and defense" }, { label: "C", text: "Dreams and visions" }, { label: "D", text: "Wars" }], correctAnswer: "B", verse: "Job 4-27", explanation: "The dialogue cycles repeat." },
  { id: "job46", question: "What does Job maintain about justice?", options: [{ label: "A", text: "God is unjust" }, { label: "B", text: "The wicked often prosper" }, { label: "C", text: "Only righteous prosper" }, { label: "D", text: "Justice is immediate" }], correctAnswer: "B", verse: "Job 21", explanation: "Job challenges traditional views." },
  { id: "job47", question: "Who speaks least among the friends?", options: [{ label: "A", text: "Eliphaz" }, { label: "B", text: "Bildad" }, { label: "C", text: "Zophar" }, { label: "D", text: "Elihu" }], correctAnswer: "B", verse: "Job 25", explanation: "Bildad's final speech is short." },
  { id: "job48", question: "What chapter praises wisdom?", options: [{ label: "A", text: "Job 19" }, { label: "B", text: "Job 28" }, { label: "C", text: "Job 31" }, { label: "D", text: "Job 33" }], correctAnswer: "B", verse: "Job 28", explanation: "Wisdom comes from God." },
  { id: "job49", question: "What is wisdom defined as?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Fear of the Lord" }, { label: "C", text: "Experience" }, { label: "D", text: "Understanding" }], correctAnswer: "B", verse: "Job 28:28", explanation: "Fear of the Lord is wisdom." },
  { id: "job50", question: "What does Job recount in chapters 29-31?", options: [{ label: "A", text: "Future hope" }, { label: "B", text: "Past blessings and integrity" }, { label: "C", text: "Dreams" }, { label: "D", text: "Laws" }], correctAnswer: "B", verse: "Job 29-31", explanation: "Job defends his integrity." },
  { id: "job51", question: "What oath does Job make in chapter 31?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Self-curse if guilty" }, { label: "C", text: "Allegiance" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Job 31", explanation: "Job calls judgment if he sinned." },
  { id: "job52", question: "Who appears after the three friends stop?", options: [{ label: "A", text: "God" }, { label: "B", text: "An angel" }, { label: "C", text: "Elihu" }, { label: "D", text: "A prophet" }], correctAnswer: "C", verse: "Job 32:1-2", explanation: "Elihu enters the dialogue." },
  { id: "job53", question: "Why was Elihu angry?", options: [{ label: "A", text: "Job cursed God" }, { label: "B", text: "Job justified himself and friends failed" }, { label: "C", text: "God was silent" }, { label: "D", text: "Satan lied" }], correctAnswer: "B", verse: "Job 32:2-3", explanation: "Both sides were wrong." },
  { id: "job54", question: "What does Elihu emphasize?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "God's discipline" }, { label: "C", text: "Human wisdom" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "Job 33", explanation: "Suffering can be corrective." },
  { id: "job55", question: "How does Elihu view God?", options: [{ label: "A", text: "Unjust" }, { label: "B", text: "Just and patient" }, { label: "C", text: "Distant" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Job 34", explanation: "God does no wrong." },
  { id: "job56", question: "What does Elihu claim about God speaking?", options: [{ label: "A", text: "God never speaks" }, { label: "B", text: "God speaks in many ways" }, { label: "C", text: "God speaks only once" }, { label: "D", text: "God speaks through dreams only" }], correctAnswer: "B", verse: "Job 33:14", explanation: "God speaks in multiple ways." },
  { id: "job57", question: "What natural phenomena does Elihu mention?", options: [{ label: "A", text: "Earthquakes" }, { label: "B", text: "Storms" }, { label: "C", text: "Fire" }, { label: "D", text: "Floods" }], correctAnswer: "B", verse: "Job 36-37", explanation: "Storm imagery introduces God's speech." },
  { id: "job58", question: "Who speaks after Elihu?", options: [{ label: "A", text: "Eliphaz" }, { label: "B", text: "Job" }, { label: "C", text: "God" }, { label: "D", text: "An angel" }], correctAnswer: "C", verse: "Job 38:1", explanation: "God speaks from the whirlwind." },
  { id: "job59", question: "What does God question Job about?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Creation" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Job 38-39", explanation: "God questions Job about creation." },
  { id: "job60", question: "What is God's purpose in questioning Job?", options: [{ label: "A", text: "To accuse" }, { label: "B", text: "To humble and teach" }, { label: "C", text: "To punish" }, { label: "D", text: "To condemn" }], correctAnswer: "B", verse: "Job 38-41", explanation: "God reveals His greatness." },
  { id: "job61", question: "How does Job respond to God's questions?", options: [{ label: "A", text: "Argues" }, { label: "B", text: "Remains silent" }, { label: "C", text: "Repents" }, { label: "D", text: "Defends himself" }], correctAnswer: "B", verse: "Job 40:4-5", explanation: "Job places his hand over his mouth." },
  { id: "job62", question: "What creatures does God describe?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Behemoth and Leviathan" }, { label: "C", text: "Seraphim" }, { label: "D", text: "Dragons" }], correctAnswer: "B", verse: "Job 40-41", explanation: "God displays His power." },
  { id: "job63", question: "What does God prove through creation?", options: [{ label: "A", text: "Human weakness" }, { label: "B", text: "Divine wisdom" }, { label: "C", text: "Judgment" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Job 38-41", explanation: "God alone governs creation." },
  { id: "job64", question: "What realization does Job come to?", options: [{ label: "A", text: "He was sinful" }, { label: "B", text: "He spoke without knowledge" }, { label: "C", text: "God abandoned him" }, { label: "D", text: "Friends were right" }], correctAnswer: "B", verse: "Job 42:3", explanation: "Job recognizes his limits." },
  { id: "job65", question: "What does Job do in response?", options: [{ label: "A", text: "Defends himself" }, { label: "B", text: "Repents in dust and ashes" }, { label: "C", text: "Complains" }, { label: "D", text: "Leaves" }], correctAnswer: "B", verse: "Job 42:6", explanation: "Job humbles himself." },
  { id: "job66", question: "Who does God rebuke?", options: [{ label: "A", text: "Job" }, { label: "B", text: "Job's wife" }, { label: "C", text: "The three friends" }, { label: "D", text: "Elihu" }], correctAnswer: "C", verse: "Job 42:7", explanation: "They misrepresented God." },
  { id: "job67", question: "What must the friends do?", options: [{ label: "A", text: "Repent privately" }, { label: "B", text: "Offer sacrifices" }, { label: "C", text: "Fast" }, { label: "D", text: "Leave Job" }], correctAnswer: "B", verse: "Job 42:8", explanation: "Sacrifices were required." },
  { id: "job68", question: "Who prays for the friends?", options: [{ label: "A", text: "Elihu" }, { label: "B", text: "Job" }, { label: "C", text: "Priests" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Job 42:10", explanation: "Job intercedes for them." },
  { id: "job69", question: "When is Job restored?", options: [{ label: "A", text: "After repentance" }, { label: "B", text: "After praying for friends" }, { label: "C", text: "After suffering ends" }, { label: "D", text: "Immediately" }], correctAnswer: "B", verse: "Job 42:10", explanation: "Restoration follows intercession." },
  { id: "job70", question: "How does God restore Job?", options: [{ label: "A", text: "Same as before" }, { label: "B", text: "Double what he had" }, { label: "C", text: "Partially" }, { label: "D", text: "Only spiritually" }], correctAnswer: "B", verse: "Job 42:10", explanation: "Job receives double." },
  { id: "job71", question: "How many sons does Job have afterward?", options: [{ label: "A", text: "7" }, { label: "B", text: "10" }, { label: "C", text: "14" }, { label: "D", text: "3" }], correctAnswer: "A", verse: "Job 42:13", explanation: "Seven sons again." },
  { id: "job72", question: "How many daughters does Job have afterward?", options: [{ label: "A", text: "3" }, { label: "B", text: "6" }, { label: "C", text: "7" }, { label: "D", text: "10" }], correctAnswer: "A", verse: "Job 42:13", explanation: "Three daughters again." },
  { id: "job73", question: "What is noted about Job's daughters?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Beauty" }, { label: "C", text: "Strength" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Job 42:15", explanation: "They were the most beautiful." },
  { id: "job74", question: "What unusual inheritance did they receive?", options: [{ label: "A", text: "Land" }, { label: "B", text: "Money" }, { label: "C", text: "Inheritance with brothers" }, { label: "D", text: "No inheritance" }], correctAnswer: "C", verse: "Job 42:15", explanation: "They inherited alongside brothers." },
  { id: "job75", question: "How long did Job live after?", options: [{ label: "A", text: "70 years" }, { label: "B", text: "120 years" }, { label: "C", text: "140 years" }, { label: "D", text: "200 years" }], correctAnswer: "C", verse: "Job 42:16", explanation: "Job lived 140 more years." },
  { id: "job76", question: "What did Job see?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Four generations" }, { label: "C", text: "Prophets" }, { label: "D", text: "Wars" }], correctAnswer: "B", verse: "Job 42:16", explanation: "He saw four generations." },
  { id: "job77", question: "How does Job die?", options: [{ label: "A", text: "In battle" }, { label: "B", text: "Suddenly" }, { label: "C", text: "Old and full of days" }, { label: "D", text: "In poverty" }], correctAnswer: "C", verse: "Job 42:17", explanation: "Job dies blessed." },
  { id: "job78", question: "What does Job teach about suffering?", options: [{ label: "A", text: "Always punishment" }, { label: "B", text: "Always random" }, { label: "C", text: "Not always deserved" }, { label: "D", text: "Always explained" }], correctAnswer: "C", verse: "Job overview", explanation: "Suffering isn't always punishment." },
  { id: "job79", question: "What does Job teach about God?", options: [{ label: "A", text: "God is distant" }, { label: "B", text: "God is sovereign" }, { label: "C", text: "God is cruel" }, { label: "D", text: "God is silent" }], correctAnswer: "B", verse: "Job 38-42", explanation: "God reigns over all." },
  { id: "job80", question: "What does Job reveal about human wisdom?", options: [{ label: "A", text: "It is sufficient" }, { label: "B", text: "It is limited" }, { label: "C", text: "It is superior" }, { label: "D", text: "It replaces God" }], correctAnswer: "B", verse: "Job 28", explanation: "Human wisdom has limits." },
  { id: "job81", question: "What role does faith play in Job?", options: [{ label: "A", text: "Reward-based" }, { label: "B", text: "Tested through suffering" }, { label: "C", text: "Optional" }, { label: "D", text: "Guaranteed comfort" }], correctAnswer: "B", verse: "Job overview", explanation: "Faith is tested." },
  { id: "job82", question: "What does Job show about silence?", options: [{ label: "A", text: "It equals faith" }, { label: "B", text: "It can be wise" }, { label: "C", text: "It solves suffering" }, { label: "D", text: "It avoids pain" }], correctAnswer: "B", verse: "Job 40:4", explanation: "Silence before God is humility." },
  { id: "job83", question: "What does Job teach about friends?", options: [{ label: "A", text: "Always helpful" }, { label: "B", text: "Can wound deeply" }, { label: "C", text: "Know everything" }, { label: "D", text: "Replace God" }], correctAnswer: "B", verse: "Job 16:2", explanation: "Friends can harm with words." },
  { id: "job84", question: "What restores Job fully?", options: [{ label: "A", text: "Answers" }, { label: "B", text: "Encounter with God" }, { label: "C", text: "Wealth" }, { label: "D", text: "Justice" }], correctAnswer: "B", verse: "Job 42", explanation: "Seeing God changes Job." },
  { id: "job85", question: "What does God never explain?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "The reason for suffering" }, { label: "C", text: "Justice" }, { label: "D", text: "Mercy" }], correctAnswer: "B", verse: "Job overview", explanation: "God doesn't explain the why." },
  { id: "job86", question: "What does Job's story emphasize?", options: [{ label: "A", text: "Comfort" }, { label: "B", text: "Trust without answers" }, { label: "C", text: "Victory" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "Job overview", explanation: "Trust remains central." },
  { id: "job87", question: "What does Job teach about righteousness?", options: [{ label: "A", text: "Prevents suffering" }, { label: "B", text: "Guarantees blessing" }, { label: "C", text: "Does not exempt pain" }, { label: "D", text: "Is irrelevant" }], correctAnswer: "C", verse: "Job overview", explanation: "Righteous people still suffer." },
  { id: "job88", question: "What does Job show about prayer?", options: [{ label: "A", text: "Always answered immediately" }, { label: "B", text: "Can include lament" }, { label: "C", text: "Should be silent" }, { label: "D", text: "Avoid questions" }], correctAnswer: "B", verse: "Job 3-42", explanation: "Lament is part of faith." },
  { id: "job89", question: "What does Job ultimately affirm?", options: [{ label: "A", text: "Human justice" }, { label: "B", text: "God's wisdom" }, { label: "C", text: "Personal innocence" }, { label: "D", text: "Reward system" }], correctAnswer: "B", verse: "Job 42:2", explanation: "God's wisdom is supreme." },
  { id: "job90", question: "What does Job teach about repentance?", options: [{ label: "A", text: "Always from sin" }, { label: "B", text: "From misunderstanding" }, { label: "C", text: "Unnecessary" }, { label: "D", text: "Forced" }], correctAnswer: "B", verse: "Job 42:6", explanation: "Job repents of speaking wrongly." },
  { id: "job91", question: "What is Job's final state?", options: [{ label: "A", text: "Broken" }, { label: "B", text: "Restored and blessed" }, { label: "C", text: "Silent" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Job 42:17", explanation: "God restores Job." },
  { id: "job92", question: "What does Job show about God's timing?", options: [{ label: "A", text: "Immediate" }, { label: "B", text: "Perfect but slow" }, { label: "C", text: "Random" }, { label: "D", text: "Harsh" }], correctAnswer: "B", verse: "Job overview", explanation: "God's timing is perfect." },
  { id: "job93", question: "What does Job say he once heard but now sees?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "God Himself" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Job 42:5", explanation: "Encounter replaces hearsay." },
  { id: "job94", question: "What does Job emphasize over explanations?", options: [{ label: "A", text: "Answers" }, { label: "B", text: "Relationship with God" }, { label: "C", text: "Justice" }, { label: "D", text: "Comfort" }], correctAnswer: "B", verse: "Job 42", explanation: "Knowing God matters most." },
  { id: "job95", question: "Why is Job wisdom literature?", options: [{ label: "A", text: "Poetry" }, { label: "B", text: "Explores deep life questions" }, { label: "C", text: "Law teaching" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "Job genre", explanation: "It wrestles with meaning and suffering." },
  { id: "job96", question: "What question dominates Job?", options: [{ label: "A", text: "Who is king?" }, { label: "B", text: "Why do the righteous suffer?" }, { label: "C", text: "How to win wars?" }, { label: "D", text: "When is judgment?" }], correctAnswer: "B", verse: "Job overview", explanation: "The central question of the book." },
  { id: "job97", question: "What does Job teach about God's power?", options: [{ label: "A", text: "Limited" }, { label: "B", text: "Unmatched" }, { label: "C", text: "Shared" }, { label: "D", text: "Hidden forever" }], correctAnswer: "B", verse: "Job 38-41", explanation: "God's power is unmatched." },
  { id: "job98", question: "What does Job reveal about humility?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential before God" }, { label: "C", text: "Weakness" }, { label: "D", text: "Avoidable" }], correctAnswer: "B", verse: "Job 42", explanation: "Humility is essential." },
  { id: "job99", question: "What is Job's ultimate testimony?", options: [{ label: "A", text: "Life is cruel" }, { label: "B", text: "God is worthy of trust" }, { label: "C", text: "Suffering is pointless" }, { label: "D", text: "Justice always immediate" }], correctAnswer: "B", verse: "Job overview", explanation: "God remains trustworthy." },
  { id: "job100", question: "What is the final message of Job?", options: [{ label: "A", text: "Seek answers" }, { label: "B", text: "Trust God even without answers" }, { label: "C", text: "Avoid suffering" }, { label: "D", text: "Fear Satan" }], correctAnswer: "B", verse: "Job overview", explanation: "Faith does not depend on explanations." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JobTriviaPage() {
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
          .eq("book", "job");

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
          book: "job",
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
            book: "job",
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
    if (score === 10) return "Perfect! You're a Job expert!";
    if (score >= 8) return "Excellent! You know Job well!";
    if (score >= 6) return "Good job! Keep studying Job!";
    if (score >= 4) return "Nice try! Job has much to explore!";
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
              href="/bible-trivia/job"
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
