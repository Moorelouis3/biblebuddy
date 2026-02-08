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
  { id: "1samuel1", question: "Who was the mother of Samuel?", options: [{ label: "A", text: "Peninnah" }, { label: "B", text: "Hannah" }, { label: "C", text: "Ruth" }, { label: "D", text: "Abigail" }], correctAnswer: "B", verse: "1 Samuel 1:2", explanation: "Hannah was barren and deeply distressed. She brought her pain honestly before God. God heard her prayer. Samuel was born from faith and surrender." },
  { id: "1samuel2", question: "Why was Hannah deeply distressed?", options: [{ label: "A", text: "She was poor" }, { label: "B", text: "She was mocked by Peninnah" }, { label: "C", text: "Her husband left her" }, { label: "D", text: "She feared Eli" }], correctAnswer: "B", verse: "1 Samuel 1:6", explanation: "Peninnah provoked Hannah continually. The pain was personal and repeated. Hannah turned suffering into prayer. God listens to the brokenhearted." },
  { id: "1samuel3", question: "What vow did Hannah make to the Lord?", options: [{ label: "A", text: "To build an altar" }, { label: "B", text: "To dedicate her son to the Lord" }, { label: "C", text: "To leave Israel" }, { label: "D", text: "To give silver" }], correctAnswer: "B", verse: "1 Samuel 1:11", explanation: "Hannah promised to give her son to God. Her prayer was surrendered not selfish. Faith releases control. God honors obedience." },
  { id: "1samuel4", question: "Who was the priest at Shiloh during Samuel's birth?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Aaron" }, { label: "C", text: "Eli" }, { label: "D", text: "Abiathar" }], correctAnswer: "C", verse: "1 Samuel 1:9", explanation: "Eli served as priest and judge. His leadership was compromised. God was preparing new leadership through Samuel." },
  { id: "1samuel5", question: "How did Eli initially interpret Hannah's prayer?", options: [{ label: "A", text: "As prophecy" }, { label: "B", text: "As rebellion" }, { label: "C", text: "As drunkenness" }, { label: "D", text: "As faithfulness" }], correctAnswer: "C", verse: "1 Samuel 1:13", explanation: "Eli misjudged Hannah's silent prayer. External appearances can deceive. God sees the heart. Hannah responded humbly." },
  { id: "1samuel6", question: "What name did Hannah give her son?", options: [{ label: "A", text: "David" }, { label: "B", text: "Saul" }, { label: "C", text: "Samuel" }, { label: "D", text: "Jonathan" }], correctAnswer: "C", verse: "1 Samuel 1:20", explanation: "Samuel means heard by God. His name reflected answered prayer. God responds to faith. Samuel would shape Israel's future." },
  { id: "1samuel7", question: "Where did Hannah bring Samuel after he was weaned?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Shiloh" }, { label: "D", text: "Gilgal" }], correctAnswer: "C", verse: "1 Samuel 1:24", explanation: "Shiloh was Israel's center of worship. Hannah kept her vow. Faith follows through. Samuel served the Lord early." },
  { id: "1samuel8", question: "What garment did Hannah make for Samuel each year?", options: [{ label: "A", text: "Robe" }, { label: "B", text: "Ephod" }, { label: "C", text: "Tunic" }, { label: "D", text: "Cloak" }], correctAnswer: "C", verse: "1 Samuel 2:19", explanation: "The tunic symbolized care and faithfulness. Hannah stayed involved. God blesses consistent obedience." },
  { id: "1samuel9", question: "Who were Eli's sons?", options: [{ label: "A", text: "Nadab and Abihu" }, { label: "B", text: "Hophni and Phinehas" }, { label: "C", text: "Saul and Jonathan" }, { label: "D", text: "Abner and Joab" }], correctAnswer: "B", verse: "1 Samuel 2:12", explanation: "Eli's sons abused their priestly role. Position without obedience leads to judgment. God does not overlook corruption." },
  { id: "1samuel10", question: "What was said about Eli's sons?", options: [{ label: "A", text: "They feared God" }, { label: "B", text: "They were wise leaders" }, { label: "C", text: "They did not know the Lord" }, { label: "D", text: "They repented" }], correctAnswer: "C", verse: "1 Samuel 2:12", explanation: "Serving God's house without knowing God leads to destruction. God desires obedience not title." },
  { id: "1samuel11", question: "Who called Samuel during the night?", options: [{ label: "A", text: "Eli" }, { label: "B", text: "An angel" }, { label: "C", text: "The Lord" }, { label: "D", text: "A prophet" }], correctAnswer: "C", verse: "1 Samuel 3:4", explanation: "God spoke directly to Samuel. God calls those who listen. Obedience begins with hearing." },
  { id: "1samuel12", question: "What did Eli tell Samuel to say?", options: [{ label: "A", text: "Here I am" }, { label: "B", text: "Speak Lord for your servant hears" }, { label: "C", text: "Show me a sign" }, { label: "D", text: "Forgive me" }], correctAnswer: "B", verse: "1 Samuel 3:9", explanation: "Samuel learned to listen humbly. God speaks to receptive hearts. Submission precedes calling." },
  { id: "1samuel13", question: "What judgment did God pronounce on Eli's house?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Exile" }, { label: "C", text: "End of the priestly line" }, { label: "D", text: "Loss of land" }], correctAnswer: "C", verse: "1 Samuel 3:12-13", explanation: "Eli failed to restrain his sons. Leadership carries responsibility. God restores holiness through judgment." },
  { id: "1samuel14", question: "What happened when Israel took the ark into battle?", options: [{ label: "A", text: "They won" }, { label: "B", text: "They were defeated" }, { label: "C", text: "They repented" }, { label: "D", text: "God spoke" }], correctAnswer: "B", verse: "1 Samuel 4:10", explanation: "Israel treated the ark as a charm. God cannot be manipulated. Obedience matters more than symbols." },
  { id: "1samuel15", question: "What happened to Eli when he heard the ark was captured?", options: [{ label: "A", text: "He prayed" }, { label: "B", text: "He repented" }, { label: "C", text: "He fell and died" }, { label: "D", text: "He fled" }], correctAnswer: "C", verse: "1 Samuel 4:18", explanation: "Eli fell backward and died. God's word was fulfilled. Leadership failure has consequences." },
  { id: "1samuel16", question: "Who demanded that Israel have a king?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "The elders of Israel" }, { label: "C", text: "Saul" }, { label: "D", text: "The Philistines" }], correctAnswer: "B", verse: "1 Samuel 8:5", explanation: "The people wanted to be like other nations. God allowed their request. Human desire often resists God's design." },
  { id: "1samuel17", question: "Who became Israel's first king?", options: [{ label: "A", text: "David" }, { label: "B", text: "Samuel" }, { label: "C", text: "Saul" }, { label: "D", text: "Jonathan" }], correctAnswer: "C", verse: "1 Samuel 10:1", explanation: "God granted Israel a king. Leadership would test obedience. Calling brings accountability." },
  { id: "1samuel18", question: "From which tribe was Saul?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Benjamin" }, { label: "C", text: "Levi" }, { label: "D", text: "Ephraim" }], correctAnswer: "B", verse: "1 Samuel 9:21", explanation: "Benjamin was the smallest tribe. God often chooses the unexpected. Humility matters." },
  { id: "1samuel19", question: "Who anointed Saul as king?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Eli" }, { label: "C", text: "Samuel" }, { label: "D", text: "David" }], correctAnswer: "C", verse: "1 Samuel 10:1", explanation: "Samuel anointed Saul by God's command. Anointing brings responsibility." },
  { id: "1samuel20", question: "Why was Saul rejected as king?", options: [{ label: "A", text: "He lost battles" }, { label: "B", text: "He feared the people" }, { label: "C", text: "He disobeyed God" }, { label: "D", text: "He lacked strength" }], correctAnswer: "C", verse: "1 Samuel 15:23", explanation: "Obedience is better than sacrifice. Saul chose his way over God's. Disobedience cost him the kingdom." },
  { id: "1samuel21", question: "Where was David when Samuel came to anoint him?", options: [{ label: "A", text: "In Jerusalem" }, { label: "B", text: "In the fields tending sheep" }, { label: "C", text: "At the temple" }, { label: "D", text: "In Saul's court" }], correctAnswer: "B", verse: "1 Samuel 16:11", explanation: "David was overlooked and serving quietly. God values faithfulness in obscurity." },
  { id: "1samuel22", question: "What came upon David after he was anointed?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "The Spirit of the Lord" }, { label: "C", text: "Fear" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "1 Samuel 16:13", explanation: "The Spirit empowered David. God equips those He calls." },
  { id: "1samuel23", question: "What departed from Saul after David was anointed?", options: [{ label: "A", text: "His army" }, { label: "B", text: "The Spirit of the Lord" }, { label: "C", text: "His crown" }, { label: "D", text: "His wisdom" }], correctAnswer: "B", verse: "1 Samuel 16:14", explanation: "Saul lost God's Spirit through disobedience. Leadership without obedience leads to loss." },
  { id: "1samuel24", question: "What instrument did David play to soothe Saul?", options: [{ label: "A", text: "Flute" }, { label: "B", text: "Lyre" }, { label: "C", text: "Trumpet" }, { label: "D", text: "Drum" }], correctAnswer: "B", verse: "1 Samuel 16:23", explanation: "David's gift brought relief. God uses faithfulness to open doors." },
  { id: "1samuel25", question: "Who challenged Israel from the Philistine camp?", options: [{ label: "A", text: "Abner" }, { label: "B", text: "Saul" }, { label: "C", text: "Goliath" }, { label: "D", text: "Achish" }], correctAnswer: "C", verse: "1 Samuel 17:4", explanation: "Goliath mocked Israel and their God. Fear spread through intimidation." },
  { id: "1samuel26", question: "Why did David visit the battlefield?", options: [{ label: "A", text: "To fight" }, { label: "B", text: "To bring food to his brothers" }, { label: "C", text: "To spy" }, { label: "D", text: "To meet Saul" }], correctAnswer: "B", verse: "1 Samuel 17:17", explanation: "David was serving faithfully. God often uses ordinary obedience." },
  { id: "1samuel27", question: "What angered David about Goliath's words?", options: [{ label: "A", text: "Personal insults" }, { label: "B", text: "Defying the living God" }, { label: "C", text: "Threats to Saul" }, { label: "D", text: "Mocking Israel" }], correctAnswer: "B", verse: "1 Samuel 17:26", explanation: "David cared about God's honor. True faith is driven by devotion." },
  { id: "1samuel28", question: "What weapon did David refuse from Saul?", options: [{ label: "A", text: "Helmet" }, { label: "B", text: "Shield" }, { label: "C", text: "Armor" }, { label: "D", text: "Sword" }], correctAnswer: "C", verse: "1 Samuel 17:39", explanation: "David trusted God not equipment. Faith does not rely on human strength." },
  { id: "1samuel29", question: "What did David take to fight Goliath?", options: [{ label: "A", text: "A spear" }, { label: "B", text: "Five smooth stones" }, { label: "C", text: "A sword" }, { label: "D", text: "A bow" }], correctAnswer: "B", verse: "1 Samuel 17:40", explanation: "David prepared wisely while trusting God. Faith and preparation work together." },
  { id: "1samuel30", question: "How did David defeat Goliath?", options: [{ label: "A", text: "With a sword" }, { label: "B", text: "With a spear" }, { label: "C", text: "With a sling and stone" }, { label: "D", text: "With arrows" }], correctAnswer: "C", verse: "1 Samuel 17:50", explanation: "God used David's faith to bring victory. The battle belonged to the Lord." },
  { id: "1samuel31", question: "What did the Philistines do after Goliath was defeated?", options: [{ label: "A", text: "They attacked harder" }, { label: "B", text: "They surrendered" }, { label: "C", text: "They fled" }, { label: "D", text: "They captured David" }], correctAnswer: "C", verse: "1 Samuel 17:51", explanation: "Fear shifted instantly. God can change the momentum in a moment. Victory belongs to the Lord." },
  { id: "1samuel32", question: "Whose soul was knit to David after Goliath's defeat?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Saul" }, { label: "C", text: "Jonathan" }, { label: "D", text: "Abner" }], correctAnswer: "C", verse: "1 Samuel 18:1", explanation: "Jonathan recognized God's hand on David. Godly friendships are rooted in faith and humility." },
  { id: "1samuel33", question: "What covenant did Jonathan make with David?", options: [{ label: "A", text: "A military alliance" }, { label: "B", text: "A covenant of friendship" }, { label: "C", text: "A royal succession pact" }, { label: "D", text: "A peace treaty" }], correctAnswer: "B", verse: "1 Samuel 18:3", explanation: "Their covenant was built on loyalty and faith. True friendship honors God's purposes." },
  { id: "1samuel34", question: "What did Jonathan give David as part of the covenant?", options: [{ label: "A", text: "Gold and silver" }, { label: "B", text: "Land" }, { label: "C", text: "His robe and weapons" }, { label: "D", text: "A crown" }], correctAnswer: "C", verse: "1 Samuel 18:4", explanation: "Jonathan surrendered symbols of status. Godly love sacrifices personal ambition." },
  { id: "1samuel35", question: "Why did Saul begin to fear David?", options: [{ label: "A", text: "David challenged him" }, { label: "B", text: "David was anointed king" }, { label: "C", text: "The Lord was with David" }, { label: "D", text: "The army supported David" }], correctAnswer: "C", verse: "1 Samuel 18:12", explanation: "God's presence was evident in David. Obedience brings favor that others can see." },
  { id: "1samuel36", question: "What song caused Saul to become jealous?", options: [{ label: "A", text: "David has become king" }, { label: "B", text: "Saul has slain thousands and David ten thousands" }, { label: "C", text: "The Lord has chosen David" }, { label: "D", text: "Israel is victorious" }], correctAnswer: "B", verse: "1 Samuel 18:7", explanation: "Comparison fueled Saul's jealousy. Pride distorts perspective and leads to fear." },
  { id: "1samuel37", question: "What weapon did Saul throw at David?", options: [{ label: "A", text: "Sword" }, { label: "B", text: "Stone" }, { label: "C", text: "Spear" }, { label: "D", text: "Shield" }], correctAnswer: "C", verse: "1 Samuel 18:11", explanation: "Saul acted out of anger and fear. Jealousy leads to violence. God protected David." },
  { id: "1samuel38", question: "Who helped David escape Saul by lowering him through a window?", options: [{ label: "A", text: "Jonathan" }, { label: "B", text: "Samuel" }, { label: "C", text: "Michal" }, { label: "D", text: "Abner" }], correctAnswer: "C", verse: "1 Samuel 19:12", explanation: "Michal acted courageously. God uses unexpected people to protect His servants." },
  { id: "1samuel39", question: "Where did David flee to after escaping Saul?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Ramah" }, { label: "C", text: "Hebron" }, { label: "D", text: "Gibeah" }], correctAnswer: "B", verse: "1 Samuel 19:18", explanation: "David sought refuge with Samuel. God provides safe places in seasons of danger." },
  { id: "1samuel40", question: "What repeatedly stopped Saul's messengers from capturing David?", options: [{ label: "A", text: "David's army" }, { label: "B", text: "Jonathan's warning" }, { label: "C", text: "The Spirit of God" }, { label: "D", text: "Nightfall" }], correctAnswer: "C", verse: "1 Samuel 19:20", explanation: "God intervened directly. Human plans cannot override God's protection." },
  { id: "1samuel41", question: "What did Jonathan warn David about?", options: [{ label: "A", text: "A Philistine attack" }, { label: "B", text: "Saul's intent to kill him" }, { label: "C", text: "Samuel's death" }, { label: "D", text: "A famine" }], correctAnswer: "B", verse: "1 Samuel 20:33", explanation: "Jonathan chose truth over comfort. Righteous loyalty honors God." },
  { id: "1samuel42", question: "What signal did Jonathan use to warn David?", options: [{ label: "A", text: "A letter" }, { label: "B", text: "A trumpet" }, { label: "C", text: "Arrows" }, { label: "D", text: "A fire" }], correctAnswer: "C", verse: "1 Samuel 20:36-37", explanation: "The arrows confirmed danger. God provides clarity when decisions matter most." },
  { id: "1samuel43", question: "Where did David hide while Jonathan tested Saul?", options: [{ label: "A", text: "A cave" }, { label: "B", text: "A field" }, { label: "C", text: "The city gate" }, { label: "D", text: "A forest" }], correctAnswer: "B", verse: "1 Samuel 20:19", explanation: "David waited patiently. Trust often requires stillness." },
  { id: "1samuel44", question: "What covenant did Jonathan and David renew before parting?", options: [{ label: "A", text: "Military alliance" }, { label: "B", text: "Friendship before the Lord" }, { label: "C", text: "Royal succession" }, { label: "D", text: "Peace treaty" }], correctAnswer: "B", verse: "1 Samuel 20:42", explanation: "Their bond was rooted in God. Faithful friendship honors the Lord." },
  { id: "1samuel45", question: "Who gave David the consecrated bread?", options: [{ label: "A", text: "Eli" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Ahimelech" }, { label: "D", text: "Samuel" }], correctAnswer: "C", verse: "1 Samuel 21:6", explanation: "God provided for David's need. Mercy outweighs ritual." },
  { id: "1samuel46", question: "Where did David flee after leaving Nob?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Gath" }, { label: "C", text: "Hebron" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "1 Samuel 21:10", explanation: "David fled to enemy territory. Desperation tests faith and trust." },
  { id: "1samuel47", question: "What did David pretend while in Gath?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Madness" }, { label: "C", text: "Illness" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "1 Samuel 21:13", explanation: "David humbled himself to escape danger. God delivers in unexpected ways." },
  { id: "1samuel48", question: "Where did David hide after leaving Gath?", options: [{ label: "A", text: "Forest of Hereth" }, { label: "B", text: "Cave of Adullam" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Gilgal" }], correctAnswer: "B", verse: "1 Samuel 22:1", explanation: "God began building David's leadership in hardship. Caves prepare kings." },
  { id: "1samuel49", question: "Who gathered to David at the cave of Adullam?", options: [{ label: "A", text: "The wealthy" }, { label: "B", text: "The distressed and indebted" }, { label: "C", text: "The priests only" }, { label: "D", text: "Philistine soldiers" }], correctAnswer: "B", verse: "1 Samuel 22:2", explanation: "God builds strength from broken people. Leadership begins with compassion." },
  { id: "1samuel50", question: "How many men initially gathered to David?", options: [{ label: "A", text: "100" }, { label: "B", text: "200" }, { label: "C", text: "400" }, { label: "D", text: "600" }], correctAnswer: "C", verse: "1 Samuel 22:2", explanation: "God formed a community around David. Faithful leadership draws people over time." },
  { id: "1samuel51", question: "Who accused the priests of Nob before Saul?", options: [{ label: "A", text: "Abner" }, { label: "B", text: "Doeg the Edomite" }, { label: "C", text: "Jonathan" }, { label: "D", text: "Achish" }], correctAnswer: "B", verse: "1 Samuel 22:9", explanation: "Doeg acted out of ambition. Evil often thrives through willing informants." },
  { id: "1samuel52", question: "What happened to the priests of Nob?", options: [{ label: "A", text: "They fled" }, { label: "B", text: "They were imprisoned" }, { label: "C", text: "They were killed" }, { label: "D", text: "They repented" }], correctAnswer: "C", verse: "1 Samuel 22:18", explanation: "Saul's rage led to injustice. Disobedience produces destruction." },
  { id: "1samuel53", question: "Who escaped the slaughter at Nob?", options: [{ label: "A", text: "Ahimelech" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Eli" }, { label: "D", text: "Samuel" }], correctAnswer: "B", verse: "1 Samuel 22:20", explanation: "Abiathar fled to David. God preserved a remnant." },
  { id: "1samuel54", question: "What city did David rescue from the Philistines?", options: [{ label: "A", text: "Ziklag" }, { label: "B", text: "Keilah" }, { label: "C", text: "Gibeah" }, { label: "D", text: "Hebron" }], correctAnswer: "B", verse: "1 Samuel 23:5", explanation: "David sought God before acting. Obedience brought victory." },
  { id: "1samuel55", question: "Why did David flee Keilah?", options: [{ label: "A", text: "Lack of supplies" }, { label: "B", text: "God warned Saul would capture him" }, { label: "C", text: "The Philistines returned" }, { label: "D", text: "Jonathan told him to leave" }], correctAnswer: "B", verse: "1 Samuel 23:12", explanation: "God revealed hidden danger. Wisdom listens before acting." },
  { id: "1samuel56", question: "Who strengthened David's hand in God?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Jonathan" }, { label: "D", text: "Gad" }], correctAnswer: "C", verse: "1 Samuel 23:16", explanation: "Jonathan encouraged David spiritually. Godly friends point us back to God." },
  { id: "1samuel57", question: "What did the Ziphites do regarding David?", options: [{ label: "A", text: "Protected him" }, { label: "B", text: "Ignored him" }, { label: "C", text: "Betrayed his location to Saul" }, { label: "D", text: "Joined his army" }], correctAnswer: "C", verse: "1 Samuel 23:19", explanation: "Betrayal came from within Israel. God's servants face opposition." },
  { id: "1samuel58", question: "What saved David from Saul in the wilderness of Maon?", options: [{ label: "A", text: "Nightfall" }, { label: "B", text: "A Philistine invasion" }, { label: "C", text: "Jonathan's warning" }, { label: "D", text: "A storm" }], correctAnswer: "B", verse: "1 Samuel 23:27", explanation: "God intervened through unexpected events. Timing belongs to the Lord." },
  { id: "1samuel59", question: "Where did David hide after escaping Saul again?", options: [{ label: "A", text: "Cave of Adullam" }, { label: "B", text: "Wilderness of En Gedi" }, { label: "C", text: "Ziklag" }, { label: "D", text: "Hebron" }], correctAnswer: "B", verse: "1 Samuel 24:1", explanation: "David remained in hiding. Waiting seasons shape character." },
  { id: "1samuel60", question: "What did David cut off Saul's robe?", options: [{ label: "A", text: "Sleeve" }, { label: "B", text: "Hem" }, { label: "C", text: "Collar" }, { label: "D", text: "Belt" }], correctAnswer: "B", verse: "1 Samuel 24:4", explanation: "David spared Saul's life. Respect for God's anointed reflects true obedience." },
  { id: "1samuel61", question: "How did David react after cutting Saul's robe?", options: [{ label: "A", text: "He celebrated" }, { label: "B", text: "He feared Saul" }, { label: "C", text: "His heart struck him" }, { label: "D", text: "He fled immediately" }], correctAnswer: "C", verse: "1 Samuel 24:5", explanation: "David felt convicted for dishonoring Saul. A sensitive conscience reflects godly character. Integrity matters even in secret." },
  { id: "1samuel62", question: "What did David call Saul when addressing him?", options: [{ label: "A", text: "Enemy" }, { label: "B", text: "My lord the king" }, { label: "C", text: "Brother" }, { label: "D", text: "False king" }], correctAnswer: "B", verse: "1 Samuel 24:8", explanation: "David honored Saul's position despite injustice. Respect for God's authority reveals humility." },
  { id: "1samuel63", question: "What did Saul do after David spared his life?", options: [{ label: "A", text: "Attacked again" }, { label: "B", text: "Repented and wept" }, { label: "C", text: "Imprisoned David" }, { label: "D", text: "Fled Israel" }], correctAnswer: "B", verse: "1 Samuel 24:16", explanation: "Saul was emotionally moved but not transformed. Remorse without repentance leads to repeated failure." },
  { id: "1samuel64", question: "Who died at the beginning of 1 Samuel 25?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "Jonathan" }, { label: "C", text: "Samuel" }, { label: "D", text: "Abiathar" }], correctAnswer: "C", verse: "1 Samuel 25:1", explanation: "Samuel's death marked the end of an era. God's purposes continue beyond human leaders." },
  { id: "1samuel65", question: "Who was the wealthy but harsh man David encountered?", options: [{ label: "A", text: "Doeg" }, { label: "B", text: "Abner" }, { label: "C", text: "Nabal" }, { label: "D", text: "Achish" }], correctAnswer: "C", verse: "1 Samuel 25:3", explanation: "Nabal acted foolishly and arrogantly. Wealth without wisdom leads to ruin." },
  { id: "1samuel66", question: "Who was Nabal's wise wife?", options: [{ label: "A", text: "Michal" }, { label: "B", text: "Abigail" }, { label: "C", text: "Ruth" }, { label: "D", text: "Hannah" }], correctAnswer: "B", verse: "1 Samuel 25:3", explanation: "Abigail acted with wisdom and humility. God uses discernment to prevent destruction." },
  { id: "1samuel67", question: "Why did David initially plan to attack Nabal?", options: [{ label: "A", text: "Nabal insulted God" }, { label: "B", text: "Nabal refused to help David's men" }, { label: "C", text: "Nabal betrayed Saul" }, { label: "D", text: "Nabal stole livestock" }], correctAnswer: "B", verse: "1 Samuel 25:10-11", explanation: "David reacted in anger. Even faithful leaders must guard against impulsive decisions." },
  { id: "1samuel68", question: "What stopped David from taking revenge on Nabal?", options: [{ label: "A", text: "Saul's army" }, { label: "B", text: "Jonathan's warning" }, { label: "C", text: "Abigail's intervention" }, { label: "D", text: "A storm" }], correctAnswer: "C", verse: "1 Samuel 25:32-33", explanation: "Abigail's wisdom restrained David. God often uses others to redirect us from sin." },
  { id: "1samuel69", question: "What happened to Nabal after Abigail told him the truth?", options: [{ label: "A", text: "He repented" }, { label: "B", text: "He fled" }, { label: "C", text: "His heart failed and he died" }, { label: "D", text: "He attacked David" }], correctAnswer: "C", verse: "1 Samuel 25:37-38", explanation: "God judged Nabal directly. Vengeance belongs to the Lord." },
  { id: "1samuel70", question: "Who did David marry after Nabal's death?", options: [{ label: "A", text: "Michal" }, { label: "B", text: "Abigail" }, { label: "C", text: "Ahinoam" }, { label: "D", text: "Bathsheba" }], correctAnswer: "B", verse: "1 Samuel 25:39-42", explanation: "David recognized Abigail's wisdom. God honored her discernment." },
  { id: "1samuel71", question: "How many times did David spare Saul's life?", options: [{ label: "A", text: "Once" }, { label: "B", text: "Twice" }, { label: "C", text: "Three times" }, { label: "D", text: "Never" }], correctAnswer: "B", verse: "1 Samuel 26:12", explanation: "David consistently refused to harm Saul. Trusting God requires patience." },
  { id: "1samuel72", question: "What did David take from Saul while he slept in the camp?", options: [{ label: "A", text: "His sword" }, { label: "B", text: "His crown" }, { label: "C", text: "His spear and water jug" }, { label: "D", text: "His armor" }], correctAnswer: "C", verse: "1 Samuel 26:12", explanation: "David proved his restraint. God values mercy over revenge." },
  { id: "1samuel73", question: "Who accompanied David into Saul's camp?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Abishai" }, { label: "D", text: "Jonathan" }], correctAnswer: "C", verse: "1 Samuel 26:6", explanation: "Abishai offered to kill Saul. David chose righteousness instead." },
  { id: "1samuel74", question: "What reason did David give for not killing Saul?", options: [{ label: "A", text: "Fear of punishment" }, { label: "B", text: "Lack of opportunity" }, { label: "C", text: "Saul was the Lord's anointed" }, { label: "D", text: "Jonathan's request" }], correctAnswer: "C", verse: "1 Samuel 26:9", explanation: "David trusted God's timing. Respect for God's anointing reflects faith." },
  { id: "1samuel75", question: "Where did David seek refuge among the Philistines?", options: [{ label: "A", text: "Ashdod" }, { label: "B", text: "Gaza" }, { label: "C", text: "Gath" }, { label: "D", text: "Ekron" }], correctAnswer: "C", verse: "1 Samuel 27:2", explanation: "David sought safety outside Israel. Fear can influence even faithful leaders." },
  { id: "1samuel76", question: "What city did Achish give David to live in?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Ziklag" }, { label: "C", text: "Keilah" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "1 Samuel 27:6", explanation: "Ziklag became David's base. God works even through imperfect decisions." },
  { id: "1samuel77", question: "Who gathered to David while he lived in Ziklag?", options: [{ label: "A", text: "Philistine soldiers" }, { label: "B", text: "Faithful followers" }, { label: "C", text: "Priests only" }, { label: "D", text: "Israelite elders" }], correctAnswer: "B", verse: "1 Samuel 27:2", explanation: "God continued building David's leadership. Faithful people follow faithful leaders." },
  { id: "1samuel78", question: "Why did the Philistine commanders distrust David?", options: [{ label: "A", text: "He was wealthy" }, { label: "B", text: "He was an Israelite" }, { label: "C", text: "He challenged Achish" }, { label: "D", text: "He refused battle" }], correctAnswer: "B", verse: "1 Samuel 29:3", explanation: "David's past victories made him suspect. God protected him from compromise." },
  { id: "1samuel79", question: "What happened to Ziklag while David was away?", options: [{ label: "A", text: "It prospered" }, { label: "B", text: "It was destroyed by Amalekites" }, { label: "C", text: "It was captured by Saul" }, { label: "D", text: "It was abandoned" }], correctAnswer: "B", verse: "1 Samuel 30:1", explanation: "David faced severe loss. Crisis reveals where trust is placed." },
  { id: "1samuel80", question: "How did David respond after Ziklag was destroyed?", options: [{ label: "A", text: "He blamed his men" }, { label: "B", text: "He fled" }, { label: "C", text: "He strengthened himself in the Lord" }, { label: "D", text: "He surrendered" }], correctAnswer: "C", verse: "1 Samuel 30:6", explanation: "David turned to God in distress. Strength flows from reliance on the Lord." },
  { id: "1samuel81", question: "Who did David consult before pursuing the Amalekites?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Samuel" }, { label: "C", text: "Abiathar the priest" }, { label: "D", text: "Achish" }], correctAnswer: "C", verse: "1 Samuel 30:7-8", explanation: "David sought God's guidance. Wisdom begins with prayer." },
  { id: "1samuel82", question: "What promise did God give David about the pursuit?", options: [{ label: "A", text: "Partial victory" }, { label: "B", text: "Escape" }, { label: "C", text: "Complete recovery" }, { label: "D", text: "Long delay" }], correctAnswer: "C", verse: "1 Samuel 30:8", explanation: "God promised full restoration. Obedience leads to recovery." },
  { id: "1samuel83", question: "How many of David's men stayed behind at the brook Besor?", options: [{ label: "A", text: "100" }, { label: "B", text: "200" }, { label: "C", text: "300" }, { label: "D", text: "400" }], correctAnswer: "B", verse: "1 Samuel 30:10", explanation: "Not everyone could continue. God values those who support as well as those who fight." },
  { id: "1samuel84", question: "What did David decide about sharing the recovered plunder?", options: [{ label: "A", text: "Only fighters receive it" }, { label: "B", text: "Only leaders receive it" }, { label: "C", text: "Everyone shares equally" }, { label: "D", text: "It belonged to David alone" }], correctAnswer: "C", verse: "1 Samuel 30:24", explanation: "David established unity and fairness. God's rewards are shared." },
  { id: "1samuel85", question: "Who was killed in battle against the Philistines?", options: [{ label: "A", text: "David" }, { label: "B", text: "Jonathan" }, { label: "C", text: "Abner" }, { label: "D", text: "Achish" }], correctAnswer: "B", verse: "1 Samuel 31:2", explanation: "Jonathan died faithfully in battle. Righteous men may fall, but God's plan continues." },
  { id: "1samuel86", question: "How did Saul die?", options: [{ label: "A", text: "Killed by David" }, { label: "B", text: "Captured alive" }, { label: "C", text: "Fell on his own sword" }, { label: "D", text: "Executed by Philistines" }], correctAnswer: "C", verse: "1 Samuel 31:4", explanation: "Saul's life ended tragically. Disobedience led to downfall." },
  { id: "1samuel87", question: "What did the Philistines do with Saul's body?", options: [{ label: "A", text: "Buried it honorably" }, { label: "B", text: "Burned it" }, { label: "C", text: "Displayed it on the wall of Beth-shan" }, { label: "D", text: "Returned it to Israel" }], correctAnswer: "C", verse: "1 Samuel 31:10", explanation: "The Philistines mocked Israel's defeat. God's people faced deep loss." },
  { id: "1samuel88", question: "Who retrieved Saul's body from Beth-shan?", options: [{ label: "A", text: "David's men" }, { label: "B", text: "Men of Jabesh-gilead" }, { label: "C", text: "The priests" }, { label: "D", text: "Jonathan's armor-bearer" }], correctAnswer: "B", verse: "1 Samuel 31:11-12", explanation: "The men honored Saul for past deliverance. Loyalty remembers earlier grace." },
  { id: "1samuel89", question: "What did the men of Jabesh-gilead do after retrieving the bodies?", options: [{ label: "A", text: "Buried them immediately" }, { label: "B", text: "Burned them and buried the bones" }, { label: "C", text: "Displayed them publicly" }, { label: "D", text: "Returned them to David" }], correctAnswer: "B", verse: "1 Samuel 31:12-13", explanation: "They showed respect and mourning. Honor can exist even in failure." },
  { id: "1samuel90", question: "How long did the men of Jabesh-gilead fast for Saul?", options: [{ label: "A", text: "Three days" }, { label: "B", text: "Seven days" }, { label: "C", text: "Fourteen days" }, { label: "D", text: "Thirty days" }], correctAnswer: "B", verse: "1 Samuel 31:13", explanation: "Their fasting reflected grief and respect. Mourning has a place in God's people." },
  { id: "1samuel91", question: "Which book immediately follows 1 Samuel?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Judges" }, { label: "C", text: "2 Samuel" }, { label: "D", text: "Chronicles" }], correctAnswer: "C", verse: "2 Samuel 1:1", explanation: "The narrative continues seamlessly. God's story moves forward through generations." },
  { id: "1samuel92", question: "What major theme dominates 1 Samuel?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Transition from judges to kings" }, { label: "C", text: "Temple construction" }, { label: "D", text: "Division of Israel" }], correctAnswer: "B", verse: "1 Samuel 8:7", explanation: "Israel moved from judges to monarchy. God remained sovereign through change." },
  { id: "1samuel93", question: "Which figure bridges the period of judges and kings?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "David" }, { label: "C", text: "Samuel" }, { label: "D", text: "Eli" }], correctAnswer: "C", verse: "1 Samuel 7:15", explanation: "Samuel served as prophet, priest, and judge. God used him to guide transition." },
  { id: "1samuel94", question: "What quality most distinguished David from Saul?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Intelligence" }, { label: "C", text: "A heart after God" }, { label: "D", text: "Military skill" }], correctAnswer: "C", verse: "1 Samuel 13:14", explanation: "God values the heart above ability. Faithfulness matters more than talent." },
  { id: "1samuel95", question: "What repeatedly protected David from Saul?", options: [{ label: "A", text: "His army" }, { label: "B", text: "His speed" }, { label: "C", text: "God's providence" }, { label: "D", text: "Philistine alliances" }], correctAnswer: "C", verse: "1 Samuel 23:14", explanation: "God preserved David repeatedly. No plan can overcome God's will." },
  { id: "1samuel96", question: "What lesson does Saul's life most clearly demonstrate?", options: [{ label: "A", text: "Leadership brings wealth" }, { label: "B", text: "Obedience matters more than sacrifice" }, { label: "C", text: "Power guarantees success" }, { label: "D", text: "Fear strengthens leadership" }], correctAnswer: "B", verse: "1 Samuel 15:22", explanation: "Saul's downfall came from disobedience. God desires obedience above ritual." },
  { id: "1samuel97", question: "What role did fear play in Saul's decisions?", options: [{ label: "A", text: "It strengthened him" }, { label: "B", text: "It caused impatience and disobedience" }, { label: "C", text: "It led to repentance" }, { label: "D", text: "It brought wisdom" }], correctAnswer: "B", verse: "1 Samuel 15:24", explanation: "Fear led Saul to compromise. Trusting people instead of God leads to failure." },
  { id: "1samuel98", question: "What does David's patience toward Saul demonstrate?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Strategy" }, { label: "C", text: "Trust in God's timing" }, { label: "D", text: "Fear of punishment" }], correctAnswer: "C", verse: "1 Samuel 26:10", explanation: "David trusted God to act. Waiting reflects faith." },
  { id: "1samuel99", question: "What repeated phrase summarizes God's guidance in 1 Samuel?", options: [{ label: "A", text: "The Lord remembered" }, { label: "B", text: "The Lord regretted" }, { label: "C", text: "The Lord was with him" }, { label: "D", text: "The Lord departed" }], correctAnswer: "C", verse: "1 Samuel 18:14", explanation: "God's presence marked David's life. Success flows from God's favor." },
  { id: "1samuel100", question: "What overarching truth does 1 Samuel teach about leadership?", options: [{ label: "A", text: "Leadership is inherited" }, { label: "B", text: "Leadership depends on popularity" }, { label: "C", text: "Leadership requires obedience to God" }, { label: "D", text: "Leadership guarantees peace" }], correctAnswer: "C", verse: "1 Samuel 15:22", explanation: "God values obedience above position. Faithful leadership flows from submission to God." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstSamuelTriviaPage() {
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
        
        // Fetch user's progress for 1 samuel questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "1samuel");

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
        console.log("Making API call to record trivia answer:", { userId, questionId: currentQuestion.id, username, isCorrect, book: "1samuel" });
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
            book: "1samuel"
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
    if (score === 10) return "Perfect! You're a 1 Samuel expert!";
    if (score >= 8) return "Excellent! You know 1 Samuel well!";
    if (score >= 6) return "Good job! Keep studying 1 Samuel!";
    if (score >= 4) return "Nice try! 1 Samuel has much to explore!";
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
              href="/bible-trivia/1-samuel"
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
