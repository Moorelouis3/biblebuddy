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
  { id: "1chronicles1", question: "What does 1 Chronicles begin with?", options: [{ label: "A", text: "Creation account" }, { label: "B", text: "Genealogies from Adam" }, { label: "C", text: "David's reign" }, { label: "D", text: "Israel's exile" }], correctAnswer: "B", verse: "1 Chronicles 1:1", explanation: "1 Chronicles opens with genealogies to show God's plan through history." },
  { id: "1chronicles2", question: "Who is listed first in the genealogies?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Noah" }, { label: "C", text: "Adam" }, { label: "D", text: "Seth" }], correctAnswer: "C", verse: "1 Chronicles 1:1", explanation: "The genealogy begins with Adam to show humanity's origin." },
  { id: "1chronicles3", question: "Which line is emphasized throughout the genealogies?", options: [{ label: "A", text: "Saul's line" }, { label: "B", text: "Levi's line" }, { label: "C", text: "David's line" }, { label: "D", text: "Joseph's line" }], correctAnswer: "C", verse: "1 Chronicles 2-3", explanation: "David's lineage is central to God's covenant." },
  { id: "1chronicles4", question: "Which tribe receives special focus early in the book?", options: [{ label: "A", text: "Benjamin" }, { label: "B", text: "Judah" }, { label: "C", text: "Ephraim" }, { label: "D", text: "Dan" }], correctAnswer: "B", verse: "1 Chronicles 2:3", explanation: "Judah is highlighted because of the royal line." },
  { id: "1chronicles5", question: "Who is known for praying for blessing and expansion?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Jabez" }, { label: "D", text: "Asa" }], correctAnswer: "C", verse: "1 Chronicles 4:10", explanation: "Jabez prayed boldly and God granted his request." },
  { id: "1chronicles6", question: "Which tribe was set apart for priestly duties?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Levi" }, { label: "C", text: "Benjamin" }, { label: "D", text: "Ephraim" }], correctAnswer: "B", verse: "1 Chronicles 6:1", explanation: "The Levites were chosen to serve in worship." },
  { id: "1chronicles7", question: "Which king is repeatedly contrasted with David?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Saul" }, { label: "C", text: "Ahab" }, { label: "D", text: "Jeroboam" }], correctAnswer: "B", verse: "1 Chronicles 10", explanation: "Saul's failure sets the stage for David." },
  { id: "1chronicles8", question: "What caused Saul's death?", options: [{ label: "A", text: "Assassination" }, { label: "B", text: "Disease" }, { label: "C", text: "Unfaithfulness to the Lord" }, { label: "D", text: "Old age" }], correctAnswer: "C", verse: "1 Chronicles 10:13", explanation: "Saul died because of disobedience." },
  { id: "1chronicles9", question: "Who became king after Saul?", options: [{ label: "A", text: "Jonathan" }, { label: "B", text: "Ish-bosheth" }, { label: "C", text: "David" }, { label: "D", text: "Abner" }], correctAnswer: "C", verse: "1 Chronicles 11:1-3", explanation: "David was chosen by God." },
  { id: "1chronicles10", question: "Where was David first anointed king over all Israel?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Hebron" }, { label: "C", text: "Bethlehem" }, { label: "D", text: "Shiloh" }], correctAnswer: "B", verse: "1 Chronicles 11:3", explanation: "Hebron was David's first capital." },
  { id: "1chronicles11", question: "What city did David capture and make his capital?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Bethel" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Gilgal" }], correctAnswer: "C", verse: "1 Chronicles 11:4-5", explanation: "Jerusalem became the city of David." },
  { id: "1chronicles12", question: "Who supported David during his rise?", options: [{ label: "A", text: "Philistines" }, { label: "B", text: "Mighty warriors" }, { label: "C", text: "Egyptians" }, { label: "D", text: "Moabites" }], correctAnswer: "B", verse: "1 Chronicles 11:10", explanation: "God surrounded David with loyal men." },
  { id: "1chronicles13", question: "What sacred object did David want to bring to Jerusalem?", options: [{ label: "A", text: "Altar" }, { label: "B", text: "Scroll" }, { label: "C", text: "Ark of the Covenant" }, { label: "D", text: "Lampstand" }], correctAnswer: "C", verse: "1 Chronicles 13:3", explanation: "The Ark symbolized God's presence." },
  { id: "1chronicles14", question: "What mistake was made while moving the Ark?", options: [{ label: "A", text: "Wrong location" }, { label: "B", text: "Wrong timing" }, { label: "C", text: "Wrong method" }, { label: "D", text: "Wrong priests" }], correctAnswer: "C", verse: "1 Chronicles 13:7-10", explanation: "God required obedience in worship." },
  { id: "1chronicles15", question: "Who died when touching the Ark?", options: [{ label: "A", text: "Obed" }, { label: "B", text: "Uzzah" }, { label: "C", text: "Ahijah" }, { label: "D", text: "Abiathar" }], correctAnswer: "B", verse: "1 Chronicles 13:9-10", explanation: "God is holy and must be approached correctly." },
  { id: "1chronicles16", question: "How was the Ark properly transported later?", options: [{ label: "A", text: "On a cart" }, { label: "B", text: "By priests carrying it" }, { label: "C", text: "On animals" }, { label: "D", text: "By king" }], correctAnswer: "B", verse: "1 Chronicles 15:15", explanation: "Obedience brought blessing." },
  { id: "1chronicles17", question: "What did David do when the Ark arrived?", options: [{ label: "A", text: "Fast" }, { label: "B", text: "Dance and worship" }, { label: "C", text: "Pray silently" }, { label: "D", text: "Build altar" }], correctAnswer: "B", verse: "1 Chronicles 15:29", explanation: "David worshiped freely before the Lord." },
  { id: "1chronicles18", question: "Who criticized David for worshiping?", options: [{ label: "A", text: "Bathsheba" }, { label: "B", text: "Abigail" }, { label: "C", text: "Michal" }, { label: "D", text: "Tamar" }], correctAnswer: "C", verse: "1 Chronicles 15:29", explanation: "Michal despised David's worship." },
  { id: "1chronicles19", question: "What covenant did God make with David?", options: [{ label: "A", text: "Land covenant" }, { label: "B", text: "Eternal kingship" }, { label: "C", text: "Priestly covenant" }, { label: "D", text: "Mosaic covenant" }], correctAnswer: "B", verse: "1 Chronicles 17:11-14", explanation: "God promised an everlasting dynasty." },
  { id: "1chronicles20", question: "Who was promised to build the temple?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Nathan" }, { label: "D", text: "Asaph" }], correctAnswer: "B", verse: "1 Chronicles 17:12", explanation: "Solomon would build God's house." },
  { id: "1chronicles21", question: "Why was David not allowed to build the temple?", options: [{ label: "A", text: "He lacked resources" }, { label: "B", text: "He sinned greatly" }, { label: "C", text: "He was a man of war" }, { label: "D", text: "God changed plans" }], correctAnswer: "C", verse: "1 Chronicles 22:8", explanation: "David shed much blood." },
  { id: "1chronicles22", question: "What victories did God give David?", options: [{ label: "A", text: "Few battles" }, { label: "B", text: "Many surrounding nations" }, { label: "C", text: "Only Israel" }, { label: "D", text: "None" }], correctAnswer: "B", verse: "1 Chronicles 18", explanation: "God established David's kingdom." },
  { id: "1chronicles23", question: "What sin did David commit by numbering Israel?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Pride" }, { label: "C", text: "Greed" }, { label: "D", text: "Violence" }], correctAnswer: "B", verse: "1 Chronicles 21:1", explanation: "Pride led David to rely on numbers." },
  { id: "1chronicles24", question: "Who warned David against the census?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Joab" }, { label: "C", text: "Gad" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "1 Chronicles 21:6", explanation: "Joab recognized the danger." },
  { id: "1chronicles25", question: "What judgment followed the census?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Plague" }, { label: "C", text: "Exile" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "1 Chronicles 21:14", explanation: "Plague struck Israel." },
  { id: "1chronicles26", question: "Where did David build an altar after the plague?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Threshing floor of Ornan" }, { label: "C", text: "Shiloh" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "1 Chronicles 21:18", explanation: "This site became the temple location." },
  { id: "1chronicles27", question: "What did God send to stop the plague?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Fire from heaven" }, { label: "C", text: "Angel" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "1 Chronicles 21:26", explanation: "God accepted David's sacrifice." },
  { id: "1chronicles28", question: "What preparations did David make for the temple?", options: [{ label: "A", text: "None" }, { label: "B", text: "Collected materials" }, { label: "C", text: "Built part" }, { label: "D", text: "Trained soldiers" }], correctAnswer: "B", verse: "1 Chronicles 22:5", explanation: "David prepared abundantly." },
  { id: "1chronicles29", question: "Who did David publicly charge to build the temple?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Solomon" }, { label: "C", text: "Priests" }, { label: "D", text: "Levites" }], correctAnswer: "B", verse: "1 Chronicles 22:6", explanation: "Solomon was appointed by God." },
  { id: "1chronicles30", question: "What theme dominates 1 Chronicles?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Temple worship" }, { label: "C", text: "Davidic covenant" }, { label: "D", text: "Prophecy" }], correctAnswer: "C", verse: "1 Chronicles 17", explanation: "God's promise to David is central." },
  { id: "1chronicles31", question: "What role did Levites have?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Warriors" }, { label: "C", text: "Temple service" }, { label: "D", text: "Judges" }], correctAnswer: "C", verse: "1 Chronicles 23:4-5", explanation: "Levites served in worship." },
  { id: "1chronicles32", question: "Who organized musicians for worship?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "David" }, { label: "C", text: "Samuel" }, { label: "D", text: "Nathan" }], correctAnswer: "B", verse: "1 Chronicles 25:1", explanation: "David valued worship." },
  { id: "1chronicles33", question: "What instruments were used in worship?", options: [{ label: "A", text: "Only trumpets" }, { label: "B", text: "Harps, lyres, cymbals" }, { label: "C", text: "Drums" }, { label: "D", text: "Flutes" }], correctAnswer: "B", verse: "1 Chronicles 25:1", explanation: "Music honored God." },
  { id: "1chronicles34", question: "Who guarded the temple gates?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Levites" }, { label: "C", text: "Soldiers" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "1 Chronicles 26:1", explanation: "Gatekeepers protected worship." },
  { id: "1chronicles35", question: "What did David organize militarily?", options: [{ label: "A", text: "Navy" }, { label: "B", text: "Army divisions" }, { label: "C", text: "Foreign troops" }, { label: "D", text: "Mercenaries" }], correctAnswer: "B", verse: "1 Chronicles 27", explanation: "Order strengthened Israel." },
  { id: "1chronicles36", question: "Who anointed Solomon king?", options: [{ label: "A", text: "Nathan" }, { label: "B", text: "Zadok" }, { label: "C", text: "Priests and people" }, { label: "D", text: "David alone" }], correctAnswer: "C", verse: "1 Chronicles 29:22", explanation: "Solomon was publicly confirmed." },
  { id: "1chronicles37", question: "What did David pray before his death?", options: [{ label: "A", text: "For victory" }, { label: "B", text: "For wealth" }, { label: "C", text: "Praise and thanksgiving" }, { label: "D", text: "For revenge" }], correctAnswer: "C", verse: "1 Chronicles 29:10-13", explanation: "David exalted God." },
  { id: "1chronicles38", question: "What did David acknowledge about power?", options: [{ label: "A", text: "It comes from kings" }, { label: "B", text: "It comes from God" }, { label: "C", text: "It comes from wealth" }, { label: "D", text: "It comes from armies" }], correctAnswer: "B", verse: "1 Chronicles 29:12", explanation: "God is sovereign." },
  { id: "1chronicles39", question: "How did the people respond to David's leadership?", options: [{ label: "A", text: "Rebellion" }, { label: "B", text: "Joyful giving" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "1 Chronicles 29:9", explanation: "They gave willingly." },
  { id: "1chronicles40", question: "Who succeeded David?", options: [{ label: "A", text: "Absalom" }, { label: "B", text: "Adonijah" }, { label: "C", text: "Solomon" }, { label: "D", text: "Nathan" }], correctAnswer: "C", verse: "1 Chronicles 29:23", explanation: "Solomon ruled after David." },
  { id: "1chronicles41", question: "How is David portrayed compared to Samuel and Kings?", options: [{ label: "A", text: "More flawed" }, { label: "B", text: "Focused on worship" }, { label: "C", text: "Less important" }, { label: "D", text: "Ignored" }], correctAnswer: "B", verse: "1 Chronicles overall", explanation: "Chronicles highlights David's devotion." },
  { id: "1chronicles42", question: "What is largely omitted from David's story?", options: [{ label: "A", text: "Battles" }, { label: "B", text: "Sin with Bathsheba" }, { label: "C", text: "Covenant" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "1 Chronicles overview", explanation: "Chronicles emphasizes hope." },
  { id: "1chronicles43", question: "Why were genealogies important to returning exiles?", options: [{ label: "A", text: "Land ownership" }, { label: "B", text: "Identity and calling" }, { label: "C", text: "Military rank" }, { label: "D", text: "Taxes" }], correctAnswer: "B", verse: "1 Chronicles 1-9", explanation: "They reminded Israel who they were." },
  { id: "1chronicles44", question: "Which tribe retained kingship?", options: [{ label: "A", text: "Levi" }, { label: "B", text: "Judah" }, { label: "C", text: "Benjamin" }, { label: "D", text: "Ephraim" }], correctAnswer: "B", verse: "1 Chronicles 5:2", explanation: "Judah produced kings." },
  { id: "1chronicles45", question: "Who was chief among David's mighty men?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Jashobeam" }, { label: "C", text: "Benaiah" }, { label: "D", text: "Abishai" }], correctAnswer: "B", verse: "1 Chronicles 11:11", explanation: "God empowered warriors." },
  { id: "1chronicles46", question: "What united the tribes under David?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Shared purpose" }, { label: "C", text: "Force" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "1 Chronicles 12:38", explanation: "Unity came from God." },
  { id: "1chronicles47", question: "What did God promise David's son?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Eternal throne" }, { label: "C", text: "Peace" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "1 Chronicles 17:14", explanation: "Messianic promise." },
  { id: "1chronicles48", question: "What does the Ark represent?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Kingship" }, { label: "C", text: "God's presence" }, { label: "D", text: "Sacrifice" }], correctAnswer: "C", verse: "1 Chronicles 13-15", explanation: "God dwelt among His people." },
  { id: "1chronicles49", question: "What lesson came from Uzzah's death?", options: [{ label: "A", text: "Fear worship" }, { label: "B", text: "God ignores mistakes" }, { label: "C", text: "Holiness matters" }, { label: "D", text: "Avoid the Ark" }], correctAnswer: "C", verse: "1 Chronicles 13", explanation: "God is holy." },
  { id: "1chronicles50", question: "What did David value most?", options: [{ label: "A", text: "Military strength" }, { label: "B", text: "Worship and obedience" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Chronicles overall", explanation: "Worship defined David." },
  { id: "1chronicles51", question: "Why was Solomon suited to build the temple?", options: [{ label: "A", text: "He was wealthy" }, { label: "B", text: "He was peaceful" }, { label: "C", text: "He was older" }, { label: "D", text: "He was stronger" }], correctAnswer: "B", verse: "1 Chronicles 22:9", explanation: "Peace marked Solomon's reign." },
  { id: "1chronicles52", question: "What did David give for the temple?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Personal wealth" }, { label: "C", text: "Taxes" }, { label: "D", text: "Land" }], correctAnswer: "B", verse: "1 Chronicles 29:3", explanation: "David gave sacrificially." },
  { id: "1chronicles53", question: "What attitude pleased God?", options: [{ label: "A", text: "Obligation" }, { label: "B", text: "Joyful giving" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "1 Chronicles 29:9", explanation: "God loves willing hearts." },
  { id: "1chronicles54", question: "What does David call God?", options: [{ label: "A", text: "King only" }, { label: "B", text: "God of Israel" }, { label: "C", text: "Lord over all" }, { label: "D", text: "Judge" }], correctAnswer: "C", verse: "1 Chronicles 29:11", explanation: "God reigns supreme." },
  { id: "1chronicles55", question: "What did David ask for Solomon?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Long life" }, { label: "C", text: "Wholehearted devotion" }, { label: "D", text: "Military success" }], correctAnswer: "C", verse: "1 Chronicles 29:19", explanation: "Faithfulness mattered most." },
  { id: "1chronicles56", question: "How did Solomon begin his reign?", options: [{ label: "A", text: "Weakly" }, { label: "B", text: "In rebellion" }, { label: "C", text: "Strongly supported" }, { label: "D", text: "In secret" }], correctAnswer: "C", verse: "1 Chronicles 29:25", explanation: "God exalted Solomon." },
  { id: "1chronicles57", question: "What audience was Chronicles written for?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Exiles returning" }, { label: "C", text: "Priests only" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "1 Chronicles context", explanation: "It restored identity and hope." },
  { id: "1chronicles58", question: "What is emphasized more than failure?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "War" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "1 Chronicles overview", explanation: "Hope dominates Chronicles." },
  { id: "1chronicles59", question: "What does God's covenant show?", options: [{ label: "A", text: "Change" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Judgment only" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "God keeps promises." },
  { id: "1chronicles60", question: "What central message does 1 Chronicles teach?", options: [{ label: "A", text: "Kings fail" }, { label: "B", text: "God is faithful to His covenant" }, { label: "C", text: "Worship is optional" }, { label: "D", text: "Temple saves" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "God's promises endure." },
  { id: "1chronicles61", question: "What connects genealogies to worship?", options: [{ label: "A", text: "Land" }, { label: "B", text: "Calling" }, { label: "C", text: "Kingship" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "1 Chronicles 1-9", explanation: "Identity shaped worship." },
  { id: "1chronicles62", question: "Who ensured proper worship practices?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Levites" }, { label: "C", text: "Prophets" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "1 Chronicles 23-26", explanation: "Levites served God's house." },
  { id: "1chronicles63", question: "What separated David from Saul?", options: [{ label: "A", text: "Skill" }, { label: "B", text: "Appearance" }, { label: "C", text: "Heart for God" }, { label: "D", text: "Army size" }], correctAnswer: "C", verse: "1 Chronicles 10-11", explanation: "God values the heart." },
  { id: "1chronicles64", question: "Why is worship central in Chronicles?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "God's presence" }, { label: "C", text: "Culture" }, { label: "D", text: "Politics" }], correctAnswer: "B", verse: "1 Chronicles 13-16", explanation: "God dwells with His people." },
  { id: "1chronicles65", question: "What mistake did David learn from?", options: [{ label: "A", text: "Battles" }, { label: "B", text: "Moving the Ark incorrectly" }, { label: "C", text: "Building palace" }, { label: "D", text: "Census only" }], correctAnswer: "B", verse: "1 Chronicles 15", explanation: "Obedience matters." },
  { id: "1chronicles66", question: "What did repentance restore?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Relationship with God" }, { label: "C", text: "Kingdom size" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "1 Chronicles 21", explanation: "God restores the repentant." },
  { id: "1chronicles67", question: "Why was Ornan's threshing floor important?", options: [{ label: "A", text: "Battle site" }, { label: "B", text: "Temple site" }, { label: "C", text: "Market" }, { label: "D", text: "Palace" }], correctAnswer: "B", verse: "1 Chronicles 21:18", explanation: "It became the temple location." },
  { id: "1chronicles68", question: "What did David refuse to offer?", options: [{ label: "A", text: "Free sacrifice" }, { label: "B", text: "Cheap offering" }, { label: "C", text: "Forced worship" }, { label: "D", text: "Animal sacrifice" }], correctAnswer: "B", verse: "1 Chronicles 21:24", explanation: "True worship costs something." },
  { id: "1chronicles69", question: "What defined David's leadership?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Humility before God" }, { label: "C", text: "Fear" }, { label: "D", text: "Harshness" }], correctAnswer: "B", verse: "1 Chronicles 29", explanation: "David acknowledged God." },
  { id: "1chronicles70", question: "Why list military divisions?", options: [{ label: "A", text: "Show strength" }, { label: "B", text: "Show organization" }, { label: "C", text: "Promote war" }, { label: "D", text: "Fear enemies" }], correctAnswer: "B", verse: "1 Chronicles 27", explanation: "Order reflected wisdom." },
  { id: "1chronicles71", question: "What sustained Israel's hope?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "God's promises" }, { label: "C", text: "Temple" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "God's covenant endured." },
  { id: "1chronicles72", question: "What lesson does David's census teach?", options: [{ label: "A", text: "Count resources" }, { label: "B", text: "Trust God" }, { label: "C", text: "Fear enemies" }, { label: "D", text: "Expand army" }], correctAnswer: "B", verse: "1 Chronicles 21", explanation: "Faith over numbers." },
  { id: "1chronicles73", question: "Why was Solomon publicly crowned?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "Unity" }, { label: "C", text: "Fear" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "1 Chronicles 29:22", explanation: "Unity strengthened leadership." },
  { id: "1chronicles74", question: "What was David's final act?", options: [{ label: "A", text: "Battle" }, { label: "B", text: "Prayer and blessing" }, { label: "C", text: "Reform" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "1 Chronicles 29", explanation: "David ended in worship." },
  { id: "1chronicles75", question: "What model does David provide?", options: [{ label: "A", text: "Perfect king" }, { label: "B", text: "Repentant worshiper" }, { label: "C", text: "Political leader" }, { label: "D", text: "Warrior only" }], correctAnswer: "B", verse: "1 Chronicles overall", explanation: "David's heart mattered." },
  { id: "1chronicles76", question: "What does Solomon's rise show?", options: [{ label: "A", text: "Chance" }, { label: "B", text: "God's plan" }, { label: "C", text: "Human ambition" }, { label: "D", text: "Luck" }], correctAnswer: "B", verse: "1 Chronicles 29", explanation: "God establishes leaders." },
  { id: "1chronicles77", question: "Why emphasize worship roles?", options: [{ label: "A", text: "Control people" }, { label: "B", text: "Maintain holiness" }, { label: "C", text: "Increase wealth" }, { label: "D", text: "Entertain" }], correctAnswer: "B", verse: "1 Chronicles 23-26", explanation: "God desires ordered worship." },
  { id: "1chronicles78", question: "What did musicians do?", options: [{ label: "A", text: "Entertain" }, { label: "B", text: "Prophesy through music" }, { label: "C", text: "Guard gates" }, { label: "D", text: "Teach law" }], correctAnswer: "B", verse: "1 Chronicles 25:1", explanation: "Music was spiritual." },
  { id: "1chronicles79", question: "What does joyful giving reflect?", options: [{ label: "A", text: "Obligation" }, { label: "B", text: "Trust in God" }, { label: "C", text: "Fear" }, { label: "D", text: "Status" }], correctAnswer: "B", verse: "1 Chronicles 29:9", explanation: "Joy flows from faith." },
  { id: "1chronicles80", question: "What is God described as?", options: [{ label: "A", text: "King of Israel only" }, { label: "B", text: "Ruler of all" }, { label: "C", text: "Warrior" }, { label: "D", text: "Judge only" }], correctAnswer: "B", verse: "1 Chronicles 29:11", explanation: "God reigns over everything." },
  { id: "1chronicles81", question: "Why preserve David's story?", options: [{ label: "A", text: "History" }, { label: "B", text: "Messianic hope" }, { label: "C", text: "Politics" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "Messiah comes through David." },
  { id: "1chronicles82", question: "What did God value more than sacrifice?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Obedience" }, { label: "C", text: "Music" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "1 Chronicles themes", explanation: "God desires the heart." },
  { id: "1chronicles83", question: "Why was Chronicles hopeful?", options: [{ label: "A", text: "Ignored sin" }, { label: "B", text: "Focused on restoration" }, { label: "C", text: "Removed law" }, { label: "D", text: "Denied exile" }], correctAnswer: "B", verse: "1 Chronicles overview", explanation: "Hope for the future." },
  { id: "1chronicles84", question: "What does temple preparation show?", options: [{ label: "A", text: "Human strength" }, { label: "B", text: "Long-term faithfulness" }, { label: "C", text: "Political power" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "1 Chronicles 22", explanation: "Faith plans ahead." },
  { id: "1chronicles85", question: "What unified Israel under David?", options: [{ label: "A", text: "Force" }, { label: "B", text: "Shared worship" }, { label: "C", text: "Fear" }, { label: "D", text: "Taxes" }], correctAnswer: "B", verse: "1 Chronicles 16", explanation: "Worship brought unity." },
  { id: "1chronicles86", question: "Why were roles clearly assigned?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Order" }, { label: "C", text: "Status" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "1 Chronicles 23-27", explanation: "Order honors God." },
  { id: "1chronicles87", question: "What does David's generosity teach?", options: [{ label: "A", text: "Give reluctantly" }, { label: "B", text: "Give sacrificially" }, { label: "C", text: "Give publicly" }, { label: "D", text: "Give sparingly" }], correctAnswer: "B", verse: "1 Chronicles 29:3", explanation: "True giving costs something." },
  { id: "1chronicles88", question: "What marked Solomon's acceptance?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Public support" }, { label: "C", text: "Secret anointing" }, { label: "D", text: "Military victory" }], correctAnswer: "B", verse: "1 Chronicles 29:23-25", explanation: "God exalted Solomon." },
  { id: "1chronicles89", question: "Why emphasize lineage?", options: [{ label: "A", text: "Control" }, { label: "B", text: "God's plan through generations" }, { label: "C", text: "Politics" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "1 Chronicles 1-9", explanation: "God works through history." },
  { id: "1chronicles90", question: "What does worship reveal?", options: [{ label: "A", text: "Culture" }, { label: "B", text: "God's presence" }, { label: "C", text: "Power" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "1 Chronicles 16", explanation: "God dwells with His people." },
  { id: "1chronicles91", question: "What distinguishes faithful leaders?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Dependence on God" }, { label: "C", text: "Strategy" }, { label: "D", text: "Popularity" }], correctAnswer: "B", verse: "1 Chronicles themes", explanation: "Trust defines leadership." },
  { id: "1chronicles92", question: "What did David model in failure?", options: [{ label: "A", text: "Denial" }, { label: "B", text: "Repentance" }, { label: "C", text: "Excuses" }, { label: "D", text: "Blame" }], correctAnswer: "B", verse: "1 Chronicles 21", explanation: "Repentance restores relationship." },
  { id: "1chronicles93", question: "What future hope is implied?", options: [{ label: "A", text: "Another king" }, { label: "B", text: "Messiah" }, { label: "C", text: "Temple forever" }, { label: "D", text: "Military power" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "Messianic promise remains." },
  { id: "1chronicles94", question: "Why focus on David not Saul?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "God's choice" }, { label: "C", text: "Popularity" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "1 Chronicles 10-11", explanation: "God chooses the faithful." },
  { id: "1chronicles95", question: "What does obedience bring?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Blessing" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Chronicles themes", explanation: "Blessing follows obedience." },
  { id: "1chronicles96", question: "What does worship cost?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Something valuable" }, { label: "C", text: "Time only" }, { label: "D", text: "Words" }], correctAnswer: "B", verse: "1 Chronicles 21:24", explanation: "True worship is costly." },
  { id: "1chronicles97", question: "Why highlight preparation over completion?", options: [{ label: "A", text: "David failed" }, { label: "B", text: "Faithfulness matters" }, { label: "C", text: "Temple unimportant" }, { label: "D", text: "Solomon unready" }], correctAnswer: "B", verse: "1 Chronicles 22", explanation: "Faith prepares future generations." },
  { id: "1chronicles98", question: "What does God's faithfulness overcome?", options: [{ label: "A", text: "Human failure" }, { label: "B", text: "Time" }, { label: "C", text: "Distance" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "1 Chronicles overall", explanation: "God remains faithful." },
  { id: "1chronicles99", question: "What lasting truth closes the book?", options: [{ label: "A", text: "Kings rise and fall" }, { label: "B", text: "God reigns forever" }, { label: "C", text: "Temple saves" }, { label: "D", text: "Israel failed" }], correctAnswer: "B", verse: "1 Chronicles 29", explanation: "God's kingdom endures." },
  { id: "1chronicles100", question: "What is the ultimate message of 1 Chronicles?", options: [{ label: "A", text: "History lesson" }, { label: "B", text: "God's covenant faithfulness" }, { label: "C", text: "Political strategy" }, { label: "D", text: "Military power" }], correctAnswer: "B", verse: "1 Chronicles 17", explanation: "God keeps His promises." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstChroniclesTriviaPage() {
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
          .eq("book", "1chronicles");

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
          book: "1chronicles",
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
            book: "1chronicles",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Failed to record trivia answer:",
            response.status,
            errorText
          );
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
              trivia_questions_answered:
                (currentStats.trivia_questions_answered || 0) + 1,
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
    if (score === 10) return "Perfect! You're a 1 Chronicles expert!";
    if (score >= 8) return "Excellent! You know 1 Chronicles well!";
    if (score >= 6) return "Good job! Keep studying 1 Chronicles!";
    if (score >= 4) return "Nice try! 1 Chronicles has much to explore!";
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
              href="/bible-trivia/1-chronicles"
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
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
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
