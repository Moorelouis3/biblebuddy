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
  { id: "2samuel1", question: "Who reported Saul's death to David?", options: [{ label: "A", text: "A Philistine" }, { label: "B", text: "An Amalekite" }, { label: "C", text: "A Benjamite" }, { label: "D", text: "A messenger from Jabesh" }], correctAnswer: "B", verse: "2 Samuel 1:2-3", explanation: "The Amalekite claimed responsibility for Saul's death. His story was false and self serving. God values truth over gain." },
  { id: "2samuel2", question: "How did David respond to news of Saul's death?", options: [{ label: "A", text: "He celebrated" }, { label: "B", text: "He mourned and fasted" }, { label: "C", text: "He attacked Israel" }, { label: "D", text: "He claimed the throne" }], correctAnswer: "B", verse: "2 Samuel 1:12", explanation: "David honored Saul despite conflict. Grief reflected respect for God's anointed." },
  { id: "2samuel3", question: "What did David do to the Amalekite who claimed to kill Saul?", options: [{ label: "A", text: "Rewarded him" }, { label: "B", text: "Banished him" }, { label: "C", text: "Executed him" }, { label: "D", text: "Imprisoned him" }], correctAnswer: "C", verse: "2 Samuel 1:15", explanation: "David upheld justice. Touching the Lord's anointed brought consequences." },
  { id: "2samuel4", question: "Over which tribe did David first reign as king?", options: [{ label: "A", text: "All Israel" }, { label: "B", text: "Judah" }, { label: "C", text: "Benjamin" }, { label: "D", text: "Ephraim" }], correctAnswer: "B", verse: "2 Samuel 2:4", explanation: "David was first crowned over Judah. God's promises unfold in stages." },
  { id: "2samuel5", question: "Who was made king over Israel in opposition to David?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "Jonathan" }, { label: "C", text: "Ish-bosheth" }, { label: "D", text: "Abner" }], correctAnswer: "C", verse: "2 Samuel 2:8", explanation: "Ish-bosheth ruled under Abner's influence. Political power without God's favor is unstable." },
  { id: "2samuel6", question: "Who was the commander of Saul's army?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abishai" }, { label: "C", text: "Abner" }, { label: "D", text: "Benaiah" }], correctAnswer: "C", verse: "2 Samuel 2:8", explanation: "Abner held significant power. Human authority often resists God's plan." },
  { id: "2samuel7", question: "What eventually weakened Ish-bosheth's rule?", options: [{ label: "A", text: "David's army" }, { label: "B", text: "Abner's defection" }, { label: "C", text: "Famine" }, { label: "D", text: "Civil revolt" }], correctAnswer: "B", verse: "2 Samuel 3:6-7", explanation: "When Abner left Ish-bosheth, his rule collapsed. Power built on people is fragile." },
  { id: "2samuel8", question: "Who killed Abner?", options: [{ label: "A", text: "David" }, { label: "B", text: "Joab" }, { label: "C", text: "Ish-bosheth" }, { label: "D", text: "Benaiah" }], correctAnswer: "B", verse: "2 Samuel 3:27", explanation: "Joab acted in revenge. Personal vengeance disrupts justice." },
  { id: "2samuel9", question: "How did David respond to Abner's death?", options: [{ label: "A", text: "He approved it" }, { label: "B", text: "He ignored it" }, { label: "C", text: "He mourned publicly" }, { label: "D", text: "He punished Joab" }], correctAnswer: "C", verse: "2 Samuel 3:31", explanation: "David distanced himself from injustice. Righteous leadership rejects wrongdoing." },
  { id: "2samuel10", question: "Who assassinated Ish-bosheth?", options: [{ label: "A", text: "Joab and Abishai" }, { label: "B", text: "Rechab and Baanah" }, { label: "C", text: "Abner" }, { label: "D", text: "David's men" }], correctAnswer: "B", verse: "2 Samuel 4:5", explanation: "Murder disguised as loyalty still brings judgment." },
  { id: "2samuel11", question: "What did David do to Ish-bosheth's killers?", options: [{ label: "A", text: "Rewarded them" }, { label: "B", text: "Forgave them" }, { label: "C", text: "Executed them" }, { label: "D", text: "Banished them" }], correctAnswer: "C", verse: "2 Samuel 4:12", explanation: "David upheld justice again. God's kingdom is not built through evil." },
  { id: "2samuel12", question: "Where was David anointed king over all Israel?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Gilgal" }, { label: "D", text: "Bethlehem" }], correctAnswer: "A", verse: "2 Samuel 5:3", explanation: "David's rule expanded in God's timing. Unity followed patience." },
  { id: "2samuel13", question: "What city did David capture and make his capital?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Bethel" }, { label: "D", text: "Shiloh" }], correctAnswer: "B", verse: "2 Samuel 5:7", explanation: "Jerusalem became the political and spiritual center of Israel." },
  { id: "2samuel14", question: "Who helped David capture Jerusalem?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abishai" }, { label: "C", text: "Benaiah" }, { label: "D", text: "Nathan" }], correctAnswer: "A", verse: "2 Samuel 5:8", explanation: "Joab gained prominence through bravery. Leadership often emerges through action." },
  { id: "2samuel15", question: "What symbolized God's presence brought to Jerusalem?", options: [{ label: "A", text: "The altar" }, { label: "B", text: "The ark" }, { label: "C", text: "The temple" }, { label: "D", text: "The priesthood" }], correctAnswer: "B", verse: "2 Samuel 6:12", explanation: "The ark represented God's presence among His people." },
  { id: "2samuel16", question: "Who died when touching the ark improperly?", options: [{ label: "A", text: "Uzzah" }, { label: "B", text: "Obed" }, { label: "C", text: "Abiathar" }, { label: "D", text: "Eleazar" }], correctAnswer: "A", verse: "2 Samuel 6:7", explanation: "God's holiness demands reverence. Good intentions do not excuse disobedience." },
  { id: "2samuel17", question: "Who housed the ark after Uzzah's death?", options: [{ label: "A", text: "David" }, { label: "B", text: "Obed-edom" }, { label: "C", text: "Abiathar" }, { label: "D", text: "Joab" }], correctAnswer: "B", verse: "2 Samuel 6:10", explanation: "God blessed Obed-edom's household. God's presence brings blessing." },
  { id: "2samuel18", question: "How did David celebrate when the ark entered Jerusalem?", options: [{ label: "A", text: "In silence" }, { label: "B", text: "With sacrifices and dancing" }, { label: "C", text: "With prayer only" }, { label: "D", text: "With fasting" }], correctAnswer: "B", verse: "2 Samuel 6:14", explanation: "David worshiped freely before the Lord. Joyful worship honors God." },
  { id: "2samuel19", question: "Who despised David's worship?", options: [{ label: "A", text: "Abigail" }, { label: "B", text: "Michal" }, { label: "C", text: "Bathsheba" }, { label: "D", text: "Abishai" }], correctAnswer: "B", verse: "2 Samuel 6:16", explanation: "Pride resists humility in worship." },
  { id: "2samuel20", question: "What promise did God make to David?", options: [{ label: "A", text: "Land expansion" }, { label: "B", text: "A lasting dynasty" }, { label: "C", text: "Personal wealth" }, { label: "D", text: "A temple immediately" }], correctAnswer: "B", verse: "2 Samuel 7:16", explanation: "God promised David an eternal kingdom. God's covenant shapes history." },
  { id: "2samuel21", question: "Who delivered God's covenant promise to David?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Gad" }, { label: "C", text: "Nathan" }, { label: "D", text: "Abiathar" }], correctAnswer: "C", verse: "2 Samuel 7:4-5", explanation: "Nathan spoke God's word faithfully. God reveals His plans through prophets." },
  { id: "2samuel22", question: "What did David want to build for God?", options: [{ label: "A", text: "An altar" }, { label: "B", text: "A city" }, { label: "C", text: "A temple" }, { label: "D", text: "A wall" }], correctAnswer: "C", verse: "2 Samuel 7:2", explanation: "David desired to honor God. God redirected the plan according to His timing." },
  { id: "2samuel23", question: "Why was David not chosen to build the temple?", options: [{ label: "A", text: "He lacked resources" }, { label: "B", text: "He was not holy" }, { label: "C", text: "He had shed much blood" }, { label: "D", text: "He refused God" }], correctAnswer: "C", verse: "2 Samuel 7:13", explanation: "God assigns different roles. Obedience matters more than accomplishment." },
  { id: "2samuel24", question: "What characterized David's reign over Israel?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Justice and righteousness" }, { label: "C", text: "Oppression" }, { label: "D", text: "Isolation" }], correctAnswer: "B", verse: "2 Samuel 8:15", explanation: "Godly leadership reflects justice and righteousness." },
  { id: "2samuel25", question: "Who showed kindness to Mephibosheth?", options: [{ label: "A", text: "Jonathan" }, { label: "B", text: "David" }, { label: "C", text: "Saul" }, { label: "D", text: "Joab" }], correctAnswer: "B", verse: "2 Samuel 9:7", explanation: "David honored his covenant with Jonathan. Mercy reflects God's heart." },
  { id: "2samuel26", question: "Who was Mephibosheth?", options: [{ label: "A", text: "Saul's son" }, { label: "B", text: "Jonathan's son" }, { label: "C", text: "David's son" }, { label: "D", text: "Abner's son" }], correctAnswer: "B", verse: "2 Samuel 9:6", explanation: "David extended grace to Jonathan's household." },
  { id: "2samuel27", question: "What physical condition did Mephibosheth have?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Lameness in both feet" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Leprosy" }], correctAnswer: "B", verse: "2 Samuel 9:3", explanation: "David's kindness was not conditional. Grace covers weakness." },
  { id: "2samuel28", question: "Which nation did David defeat repeatedly?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Philistines" }, { label: "C", text: "Ammonites" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Samuel 8", explanation: "God gave David victory on every side." },
  { id: "2samuel29", question: "What mistake did David make during the Ammonite war?", options: [{ label: "A", text: "He retreated" }, { label: "B", text: "He stayed in Jerusalem" }, { label: "C", text: "He ignored Nathan" }, { label: "D", text: "He lost faith" }], correctAnswer: "B", verse: "2 Samuel 11:1", explanation: "Idleness led to temptation. Spiritual danger often begins with disengagement." },
  { id: "2samuel30", question: "Whom did David see bathing from the rooftop?", options: [{ label: "A", text: "Michal" }, { label: "B", text: "Abigail" }, { label: "C", text: "Bathsheba" }, { label: "D", text: "Tamar" }], correctAnswer: "C", verse: "2 Samuel 11:2", explanation: "This moment marked David's greatest moral failure. Sin begins with unchecked desire." },
  { id: "2samuel31", question: "Who was Bathsheba's husband?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Uriah the Hittite" }, { label: "C", text: "Abishai" }, { label: "D", text: "Benaiah" }], correctAnswer: "B", verse: "2 Samuel 11:3", explanation: "Uriah was a faithful soldier. David's sin violated trust and loyalty." },
  { id: "2samuel32", question: "How did David try to hide Bathsheba's pregnancy?", options: [{ label: "A", text: "He denied it" }, { label: "B", text: "He sent Uriah home" }, { label: "C", text: "He blamed Joab" }, { label: "D", text: "He fled Jerusalem" }], correctAnswer: "B", verse: "2 Samuel 11:8", explanation: "Sin leads to further deception. Covering sin compounds guilt." },
  { id: "2samuel33", question: "Why did Uriah refuse to go home?", options: [{ label: "A", text: "He suspected David" }, { label: "B", text: "He was angry" }, { label: "C", text: "He honored the battlefield code" }, { label: "D", text: "He was sick" }], correctAnswer: "C", verse: "2 Samuel 11:11", explanation: "Uriah showed integrity. His righteousness highlighted David's failure." },
  { id: "2samuel34", question: "How did David arrange Uriah's death?", options: [{ label: "A", text: "Direct execution" }, { label: "B", text: "Poison" }, { label: "C", text: "Frontline battle placement" }, { label: "D", text: "Assassination" }], correctAnswer: "C", verse: "2 Samuel 11:15", explanation: "David abused authority to hide sin. Power does not remove accountability." },
  { id: "2samuel35", question: "Who confronted David about his sin?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Nathan" }, { label: "D", text: "Gad" }], correctAnswer: "C", verse: "2 Samuel 12:7", explanation: "God sent correction through a prophet. Accountability restores truth." },
  { id: "2samuel36", question: "What parable did Nathan use?", options: [{ label: "A", text: "Lost coin" }, { label: "B", text: "Poor man's lamb" }, { label: "C", text: "Vineyard" }, { label: "D", text: "Prodigal son" }], correctAnswer: "B", verse: "2 Samuel 12:1-4", explanation: "The parable exposed David's injustice. Truth often confronts indirectly." },
  { id: "2samuel37", question: "What did David say after being confronted?", options: [{ label: "A", text: "I am innocent" }, { label: "B", text: "I will fix it" }, { label: "C", text: "I have sinned against the Lord" }, { label: "D", text: "Blame Bathsheba" }], correctAnswer: "C", verse: "2 Samuel 12:13", explanation: "Confession marked David's repentance. God responds to humility." },
  { id: "2samuel38", question: "What consequence did Nathan announce?", options: [{ label: "A", text: "Loss of throne" }, { label: "B", text: "Death of the child" }, { label: "C", text: "Exile" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "2 Samuel 12:14", explanation: "Sin has consequences even when forgiven." },
  { id: "2samuel39", question: "How did David respond when the child died?", options: [{ label: "A", text: "He rebelled" }, { label: "B", text: "He fasted longer" }, { label: "C", text: "He worshiped God" }, { label: "D", text: "He fled" }], correctAnswer: "C", verse: "2 Samuel 12:20", explanation: "David trusted God's judgment. Worship followed grief." },
  { id: "2samuel40", question: "Who was born to David and Bathsheba afterward?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Solomon" }, { label: "C", text: "Absalom" }, { label: "D", text: "Adonijah" }], correctAnswer: "B", verse: "2 Samuel 12:24", explanation: "God brought redemption after repentance." },
  { id: "2samuel41", question: "Which son of David raped Tamar?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Adonijah" }, { label: "C", text: "Amnon" }, { label: "D", text: "Absalom" }], correctAnswer: "C", verse: "2 Samuel 13:14", explanation: "Unchecked sin destroyed family trust." },
  { id: "2samuel42", question: "Who was Tamar's full brother?", options: [{ label: "A", text: "Amnon" }, { label: "B", text: "Absalom" }, { label: "C", text: "Solomon" }, { label: "D", text: "Adonijah" }], correctAnswer: "B", verse: "2 Samuel 13:20", explanation: "Absalom carried bitterness after injustice." },
  { id: "2samuel43", question: "What did Absalom eventually do to Amnon?", options: [{ label: "A", text: "Forgave him" }, { label: "B", text: "Exiled him" }, { label: "C", text: "Killed him" }, { label: "D", text: "Reported him" }], correctAnswer: "C", verse: "2 Samuel 13:29", explanation: "Revenge multiplied sin. Violence never heals injustice." },
  { id: "2samuel44", question: "Where did Absalom flee after killing Amnon?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Geshur" }, { label: "C", text: "Hebron" }, { label: "D", text: "Ziklag" }], correctAnswer: "B", verse: "2 Samuel 13:37", explanation: "Avoiding accountability deepens rebellion." },
  { id: "2samuel45", question: "Who helped bring Absalom back to Jerusalem?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Joab" }, { label: "C", text: "Abiathar" }, { label: "D", text: "Benaiah" }], correctAnswer: "B", verse: "2 Samuel 14:1", explanation: "Joab orchestrated reconciliation without repentance." },
  { id: "2samuel46", question: "How long did Absalom live in Jerusalem without seeing David?", options: [{ label: "A", text: "One year" }, { label: "B", text: "Two years" }, { label: "C", text: "Three years" }, { label: "D", text: "Five years" }], correctAnswer: "B", verse: "2 Samuel 14:28", explanation: "Unresolved tension allowed bitterness to grow." },
  { id: "2samuel47", question: "How did Absalom gain the people's loyalty?", options: [{ label: "A", text: "Military victories" }, { label: "B", text: "Gifts" }, { label: "C", text: "Undermining David publicly" }, { label: "D", text: "Prophetic words" }], correctAnswer: "C", verse: "2 Samuel 15:6", explanation: "Manipulation masquerading as concern steals hearts." },
  { id: "2samuel48", question: "Where did Absalom declare himself king?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Hebron" }, { label: "C", text: "Bethel" }, { label: "D", text: "Gilgal" }], correctAnswer: "B", verse: "2 Samuel 15:10", explanation: "Absalom used symbolic locations to legitimize rebellion." },
  { id: "2samuel49", question: "Who betrayed David by supporting Absalom?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Ahithophel" }, { label: "D", text: "Zadok" }], correctAnswer: "C", verse: "2 Samuel 15:12", explanation: "Wise counsel without loyalty becomes dangerous." },
  { id: "2samuel50", question: "What did David do when fleeing Jerusalem?", options: [{ label: "A", text: "Fought back" }, { label: "B", text: "Prayed and trusted God" }, { label: "C", text: "Cursed Absalom" }, { label: "D", text: "Abandoned Israel" }], correctAnswer: "B", verse: "2 Samuel 15:25-26", explanation: "David surrendered the outcome to God." },
  { id: "2samuel51", question: "Who remained loyal to David during Absalom's rebellion?", options: [{ label: "A", text: "Shimei" }, { label: "B", text: "Zadok" }, { label: "C", text: "Ahithophel" }, { label: "D", text: "Absalom" }], correctAnswer: "B", verse: "2 Samuel 15:24", explanation: "Faithful priests supported God's anointed." },
  { id: "2samuel52", question: "Who cursed David as he fled?", options: [{ label: "A", text: "Shimei" }, { label: "B", text: "Joab" }, { label: "C", text: "Absalom" }, { label: "D", text: "Abiathar" }], correctAnswer: "A", verse: "2 Samuel 16:5", explanation: "David accepted humiliation as discipline from God." },
  { id: "2samuel53", question: "Why did David spare Shimei?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "God's sovereignty" }, { label: "C", text: "Political strategy" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "2 Samuel 16:10", explanation: "David trusted God's justice over revenge." },
  { id: "2samuel54", question: "What advice of Ahithophel did God frustrate?", options: [{ label: "A", text: "Immediate attack" }, { label: "B", text: "Peace treaty" }, { label: "C", text: "Delayed pursuit" }, { label: "D", text: "Public coronation" }], correctAnswer: "A", verse: "2 Samuel 17:14", explanation: "God protected David by overturning counsel." },
  { id: "2samuel55", question: "What happened to Ahithophel after his advice was rejected?", options: [{ label: "A", text: "He repented" }, { label: "B", text: "He fled" }, { label: "C", text: "He hanged himself" }, { label: "D", text: "He joined David" }], correctAnswer: "C", verse: "2 Samuel 17:23", explanation: "Pride led to despair. Wisdom without humility collapses." },
  { id: "2samuel56", question: "What instruction did David give concerning Absalom?", options: [{ label: "A", text: "Capture him alive" }, { label: "B", text: "Kill him quickly" }, { label: "C", text: "Deal gently with him" }, { label: "D", text: "Exile him" }], correctAnswer: "C", verse: "2 Samuel 18:5", explanation: "David's heart remained merciful despite betrayal." },
  { id: "2samuel57", question: "How did Absalom die?", options: [{ label: "A", text: "Poisoned" }, { label: "B", text: "Killed by Joab" }, { label: "C", text: "Battle wounds" }, { label: "D", text: "Executed by David" }], correctAnswer: "B", verse: "2 Samuel 18:14", explanation: "Rebellion ended in tragedy." },
  { id: "2samuel58", question: "What caught Absalom as he fled?", options: [{ label: "A", text: "His robe" }, { label: "B", text: "His horse" }, { label: "C", text: "His hair" }, { label: "D", text: "His armor" }], correctAnswer: "C", verse: "2 Samuel 18:9", explanation: "Pride became his downfall." },
  { id: "2samuel59", question: "How did David mourn Absalom?", options: [{ label: "A", text: "Silently" }, { label: "B", text: "With fasting" }, { label: "C", text: "With public lament" }, { label: "D", text: "With anger" }], correctAnswer: "C", verse: "2 Samuel 18:33", explanation: "David's grief revealed deep parental love." },
  { id: "2samuel60", question: "Who rebuked David for excessive mourning?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Joab" }, { label: "C", text: "Abiathar" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "2 Samuel 19:5", explanation: "Leadership requires balancing grief and responsibility." },
  { id: "2samuel61", question: "Who helped restore David as king?", options: [{ label: "A", text: "Judah alone" }, { label: "B", text: "All Israel" }, { label: "C", text: "Joab only" }, { label: "D", text: "Philistines" }], correctAnswer: "B", verse: "2 Samuel 19:14", explanation: "Reconciliation restored unity. God heals division." },
  { id: "2samuel62", question: "What did David do with Shimei after returning?", options: [{ label: "A", text: "Executed him" }, { label: "B", text: "Forgave him" }, { label: "C", text: "Imprisoned him" }, { label: "D", text: "Banished him" }], correctAnswer: "B", verse: "2 Samuel 19:23", explanation: "Mercy followed repentance." },
  { id: "2samuel63", question: "Who replaced Joab as commander?", options: [{ label: "A", text: "Abishai" }, { label: "B", text: "Amasa" }, { label: "C", text: "Benaiah" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "2 Samuel 19:13", explanation: "David sought reconciliation through leadership changes." },
  { id: "2samuel64", question: "Who rebelled after Absalom's death?", options: [{ label: "A", text: "Sheba" }, { label: "B", text: "Shimei" }, { label: "C", text: "Adonijah" }, { label: "D", text: "Amnon" }], correctAnswer: "A", verse: "2 Samuel 20:1", explanation: "Division persisted. Leadership requires vigilance." },
  { id: "2samuel65", question: "Who killed Amasa?", options: [{ label: "A", text: "David" }, { label: "B", text: "Abishai" }, { label: "C", text: "Joab" }, { label: "D", text: "Benaiah" }], correctAnswer: "C", verse: "2 Samuel 20:10", explanation: "Joab acted violently to maintain power." },
  { id: "2samuel66", question: "Where did Sheba take refuge?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Abel of Beth-maacah" }, { label: "C", text: "Hebron" }, { label: "D", text: "Gath" }], correctAnswer: "B", verse: "2 Samuel 20:14", explanation: "Rebellion always seeks hiding places." },
  { id: "2samuel67", question: "How was Sheba defeated?", options: [{ label: "A", text: "In battle" }, { label: "B", text: "Through negotiation and execution" }, { label: "C", text: "By famine" }, { label: "D", text: "By David personally" }], correctAnswer: "B", verse: "2 Samuel 20:22", explanation: "Wisdom resolved conflict without full destruction." },
  { id: "2samuel68", question: "Why did a famine come during David's reign?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Saul's sin against the Gibeonites" }, { label: "C", text: "Natural disaster" }, { label: "D", text: "Poor harvest" }], correctAnswer: "B", verse: "2 Samuel 21:1", explanation: "Unresolved injustice brings lasting consequences." },
  { id: "2samuel69", question: "What was done to appease the Gibeonites?", options: [{ label: "A", text: "Payment of gold" }, { label: "B", text: "Execution of Saul's descendants" }, { label: "C", text: "Public apology" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "2 Samuel 21:6", explanation: "Justice addressed past wrongs." },
  { id: "2samuel70", question: "Who protected Saul's descendants' bodies?", options: [{ label: "A", text: "Michal" }, { label: "B", text: "Rizpah" }, { label: "C", text: "Abigail" }, { label: "D", text: "Bathsheba" }], correctAnswer: "B", verse: "2 Samuel 21:10", explanation: "Loyal love honors even the fallen." },
  { id: "2samuel71", question: "What did David retrieve after Rizpah's vigil?", options: [{ label: "A", text: "The ark" }, { label: "B", text: "Saul and Jonathan's bones" }, { label: "C", text: "Royal armor" }, { label: "D", text: "Temple vessels" }], correctAnswer: "B", verse: "2 Samuel 21:13", explanation: "Honor restored dignity to the dead." },
  { id: "2samuel72", question: "What song does David sing in 2 Samuel 22?", options: [{ label: "A", text: "Song of Moses" }, { label: "B", text: "Song of deliverance" }, { label: "C", text: "Song of repentance" }, { label: "D", text: "Song of ascent" }], correctAnswer: "B", verse: "2 Samuel 22:1", explanation: "David praised God for rescue and faithfulness." },
  { id: "2samuel73", question: "What title is given to David's elite warriors?", options: [{ label: "A", text: "The anointed" }, { label: "B", text: "The mighty men" }, { label: "C", text: "The chosen" }, { label: "D", text: "The elders" }], correctAnswer: "B", verse: "2 Samuel 23:8", explanation: "God honors faithfulness through teamwork." },
  { id: "2samuel74", question: "Who was chief of David's mighty men?", options: [{ label: "A", text: "Eleazar" }, { label: "B", text: "Benaiah" }, { label: "C", text: "Josheb-basshebeth" }, { label: "D", text: "Abishai" }], correctAnswer: "C", verse: "2 Samuel 23:8", explanation: "God records acts of courage." },
  { id: "2samuel75", question: "What final act brought judgment near David's life?", options: [{ label: "A", text: "Adultery" }, { label: "B", text: "Census of Israel" }, { label: "C", text: "Temple delay" }, { label: "D", text: "Political alliance" }], correctAnswer: "B", verse: "2 Samuel 24:1", explanation: "Pride in numbers replaced trust in God." },
  { id: "2samuel76", question: "Who warned David against the census?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Joab" }, { label: "C", text: "Gad" }, { label: "D", text: "Abiathar" }], correctAnswer: "B", verse: "2 Samuel 24:3", explanation: "Even flawed leaders can speak truth." },
  { id: "2samuel77", question: "What consequence did God allow after the census?", options: [{ label: "A", text: "War" }, { label: "B", text: "Famine" }, { label: "C", text: "Plague" }, { label: "D", text: "Exile" }], correctAnswer: "C", verse: "2 Samuel 24:15", explanation: "God disciplines to correct, not destroy." },
  { id: "2samuel78", question: "How many died in the plague?", options: [{ label: "A", text: "7,000" }, { label: "B", text: "14,000" }, { label: "C", text: "70,000" }, { label: "D", text: "100,000" }], correctAnswer: "C", verse: "2 Samuel 24:15", explanation: "Sin's cost can be devastating." },
  { id: "2samuel79", question: "Where did David build an altar to stop the plague?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Threshing floor of Araunah" }, { label: "C", text: "Shiloh" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "2 Samuel 24:18", explanation: "Sacrifice restored fellowship." },
  { id: "2samuel80", question: "What did Araunah offer David?", options: [{ label: "A", text: "Free land" }, { label: "B", text: "Oxen and tools" }, { label: "C", text: "Gold" }, { label: "D", text: "Both A and B" }], correctAnswer: "D", verse: "2 Samuel 24:22-23", explanation: "True worship costs something." },
  { id: "2samuel81", question: "What did David insist on doing?", options: [{ label: "A", text: "Paying full price" }, { label: "B", text: "Taking it freely" }, { label: "C", text: "Building elsewhere" }, { label: "D", text: "Delaying worship" }], correctAnswer: "A", verse: "2 Samuel 24:24", explanation: "Sacrifice reflects devotion." },
  { id: "2samuel82", question: "What ended the plague?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Repentance and sacrifice" }, { label: "C", text: "Fasting" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "2 Samuel 24:25", explanation: "God responds to repentance." },
  { id: "2samuel83", question: "What does David's life ultimately show?", options: [{ label: "A", text: "Perfection" }, { label: "B", text: "Power" }, { label: "C", text: "Grace through repentance" }, { label: "D", text: "Political genius" }], correctAnswer: "C", verse: "2 Samuel 12:13", explanation: "God redeems repentant hearts." },
  { id: "2samuel84", question: "What trait marked David as king?", options: [{ label: "A", text: "Fearlessness" }, { label: "B", text: "Humility before God" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strategy" }], correctAnswer: "B", verse: "2 Samuel 7:18", explanation: "Humility sustained David's leadership." },
  { id: "2samuel85", question: "What recurring tension fills 2 Samuel?", options: [{ label: "A", text: "Foreign invasion" }, { label: "B", text: "Sin and repentance" }, { label: "C", text: "Temple building" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "2 Samuel 11-12", explanation: "God's mercy meets human failure." },
  { id: "2samuel86", question: "What role did prophets play in David's reign?", options: [{ label: "A", text: "Political advisors" }, { label: "B", text: "Moral accountability" }, { label: "C", text: "Military leaders" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "2 Samuel 12:1", explanation: "God used prophets to correct kings." },
  { id: "2samuel87", question: "What ultimately preserved David's kingdom?", options: [{ label: "A", text: "Military strength" }, { label: "B", text: "Political alliances" }, { label: "C", text: "God's covenant" }, { label: "D", text: "Public approval" }], correctAnswer: "C", verse: "2 Samuel 7:16", explanation: "God's promises do not fail." },
  { id: "2samuel88", question: "Who is the ultimate fulfillment of David's covenant?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Jesus" }, { label: "C", text: "Rehoboam" }, { label: "D", text: "Hezekiah" }], correctAnswer: "B", verse: "2 Samuel 7:12-16", explanation: "David's line points to the Messiah." },
  { id: "2samuel89", question: "What leadership failure repeated in David's family?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Lack of discipline" }, { label: "C", text: "Foreign alliances" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "2 Samuel 13", explanation: "Neglecting correction allowed sin to spread." },
  { id: "2samuel90", question: "What does Absalom's rebellion warn against?", options: [{ label: "A", text: "Ambition" }, { label: "B", text: "Pride and manipulation" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "2 Samuel 15:6", explanation: "Pride destroys families and nations." },
  { id: "2samuel91", question: "What quality did David show even in failure?", options: [{ label: "A", text: "Defensiveness" }, { label: "B", text: "Repentance" }, { label: "C", text: "Blame shifting" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "2 Samuel 12:13", explanation: "God restores repentant hearts." },
  { id: "2samuel92", question: "What does 2 Samuel teach about authority?", options: [{ label: "A", text: "Authority excuses sin" }, { label: "B", text: "Authority magnifies accountability" }, { label: "C", text: "Authority replaces obedience" }, { label: "D", text: "Authority guarantees success" }], correctAnswer: "B", verse: "2 Samuel 12:7-9", explanation: "Leadership increases responsibility before God." },
  { id: "2samuel93", question: "What sustained David through crises?", options: [{ label: "A", text: "His army" }, { label: "B", text: "Public support" }, { label: "C", text: "God's mercy" }, { label: "D", text: "Wealth" }], correctAnswer: "C", verse: "2 Samuel 22", explanation: "God's mercy endures." },
  { id: "2samuel94", question: "What does David's final altar represent?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Submission" }, { label: "C", text: "Repentance and worship" }, { label: "D", text: "Restoration of power" }], correctAnswer: "C", verse: "2 Samuel 24:25", explanation: "Worship restored peace." },
  { id: "2samuel95", question: "What theme closes 2 Samuel?", options: [{ label: "A", text: "War" }, { label: "B", text: "Judgment" }, { label: "C", text: "Grace" }, { label: "D", text: "Exile" }], correctAnswer: "C", verse: "2 Samuel 24", explanation: "Grace frames David's story." },
  { id: "2samuel96", question: "What leadership lesson dominates 2 Samuel?", options: [{ label: "A", text: "Strength wins" }, { label: "B", text: "Obedience matters" }, { label: "C", text: "Fear rules" }, { label: "D", text: "Wealth protects" }], correctAnswer: "B", verse: "2 Samuel 7:18", explanation: "God values obedience above success." },
  { id: "2samuel97", question: "What legacy did David leave?", options: [{ label: "A", text: "Political empire" }, { label: "B", text: "Messianic promise" }, { label: "C", text: "Military dominance" }, { label: "D", text: "Personal wealth" }], correctAnswer: "B", verse: "2 Samuel 7:16", explanation: "God's promise outlived David." },
  { id: "2samuel98", question: "What repeated phrase defines David's faith?", options: [{ label: "A", text: "I will fight" }, { label: "B", text: "The Lord lives" }, { label: "C", text: "I am innocent" }, { label: "D", text: "Fear not" }], correctAnswer: "B", verse: "2 Samuel 22:47", explanation: "David's faith rested in the living God." },
  { id: "2samuel99", question: "What does David's repentance model?", options: [{ label: "A", text: "Excuses" }, { label: "B", text: "Confession and humility" }, { label: "C", text: "Delay" }, { label: "D", text: "Public defense" }], correctAnswer: "B", verse: "2 Samuel 12:13", explanation: "True repentance restores fellowship." },
  { id: "2samuel100", question: "What overarching truth does 2 Samuel teach?", options: [{ label: "A", text: "Kings are flawless" }, { label: "B", text: "God redeems broken leaders" }, { label: "C", text: "Power corrupts completely" }, { label: "D", text: "Israel failed permanently" }], correctAnswer: "B", verse: "2 Samuel 7-24", explanation: "God's grace works through flawed people." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondSamuelTriviaPage() {
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
        
        // Fetch user's progress for 2 samuel questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "2samuel");

        if (error) {
          console.error("Error fetching trivia progress:", error);
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
        console.log("Making API call to record trivia answer:", { userId, questionId: currentQuestion.id, username, isCorrect, book: "2samuel" });
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
            book: "2samuel"
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();
        
        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1
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
    if (score === 10) return "Perfect! You're a 2 Samuel expert!";
    if (score >= 8) return "Excellent! You know 2 Samuel well!";
    if (score >= 6) return "Good job! Keep studying 2 Samuel!";
    if (score >= 4) return "Nice try! 2 Samuel has much to explore!";
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
              href="/bible-trivia/2-samuel"
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
