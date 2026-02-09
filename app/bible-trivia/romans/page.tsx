"use client";

import { useEffect, useState } from "react";
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
  { id: "romans1", question: "Who wrote the book of Romans?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "James" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Romans 1:1", explanation: "Paul identifies himself as the author." },
  { id: "romans2", question: "To whom is Romans written?", options: [{ label: "A", text: "Church in Corinth" }, { label: "B", text: "Believers in Rome" }, { label: "C", text: "Church in Galatia" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "Romans 1:7", explanation: "Addressed to saints in Rome." },
  { id: "romans3", question: "What is Paul set apart for?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "The gospel of God" }, { label: "C", text: "Apostleship" }, { label: "D", text: "Writing" }], correctAnswer: "B", verse: "Romans 1:1", explanation: "Paul's mission focus." },
  { id: "romans4", question: "The gospel concerns whom?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Israel" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "Romans 1:3", explanation: "Christ-centered message." },
  { id: "romans5", question: "Jesus was descended from whom?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "David" }, { label: "C", text: "Moses" }, { label: "D", text: "Adam" }], correctAnswer: "B", verse: "Romans 1:3", explanation: "Messianic lineage." },
  { id: "romans6", question: "What declared Jesus the Son of God?", options: [{ label: "A", text: "Birth" }, { label: "B", text: "Resurrection" }, { label: "C", text: "Miracles" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Romans 1:4", explanation: "Power shown in resurrection." },
  { id: "romans7", question: "What does Paul thank God for?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Their faith" }, { label: "C", text: "Obedience" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "Romans 1:8", explanation: "Faith known everywhere." },
  { id: "romans8", question: "What does Paul desire to impart?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Spiritual gift" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "Romans 1:11", explanation: "Mutual encouragement." },
  { id: "romans9", question: "Paul is obligated to whom?", options: [{ label: "A", text: "Jews only" }, { label: "B", text: "Both Greeks and barbarians" }, { label: "C", text: "Romans" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "Romans 1:14", explanation: "Universal mission." },
  { id: "romans10", question: "Paul is not ashamed of what?", options: [{ label: "A", text: "His past" }, { label: "B", text: "The gospel" }, { label: "C", text: "The law" }, { label: "D", text: "Suffering" }], correctAnswer: "B", verse: "Romans 1:16", explanation: "Gospel power." },
  { id: "romans11", question: "The gospel is the power of God for?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Salvation" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Romans 1:16", explanation: "Saving power." },
  { id: "romans12", question: "Salvation is for who?", options: [{ label: "A", text: "Jews only" }, { label: "B", text: "Everyone who believes" }, { label: "C", text: "Gentiles only" }, { label: "D", text: "The righteous" }], correctAnswer: "B", verse: "Romans 1:16", explanation: "Faith-based salvation." },
  { id: "romans13", question: "What is revealed in the gospel?", options: [{ label: "A", text: "God's law" }, { label: "B", text: "God's righteousness" }, { label: "C", text: "Judgment" }, { label: "D", text: "Wrath" }], correctAnswer: "B", verse: "Romans 1:17", explanation: "Righteousness by faith." },
  { id: "romans14", question: "The righteous shall live by?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Faith" }, { label: "C", text: "Law" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Romans 1:17", explanation: "Habakkuk quoted." },
  { id: "romans15", question: "What is revealed against ungodliness?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Wrath of God" }, { label: "C", text: "Judgment day" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Romans 1:18", explanation: "God's righteous response." },
  { id: "romans16", question: "What is clearly seen through creation?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God's power and nature" }, { label: "C", text: "Salvation" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Romans 1:20", explanation: "General revelation." },
  { id: "romans17", question: "Why are people without excuse?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God is evident" }, { label: "C", text: "Prophets" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "Romans 1:20", explanation: "Creation testifies." },
  { id: "romans18", question: "What did people exchange?", options: [{ label: "A", text: "Law for grace" }, { label: "B", text: "Truth for a lie" }, { label: "C", text: "Faith for works" }, { label: "D", text: "Light for law" }], correctAnswer: "B", verse: "Romans 1:25", explanation: "Idolatry." },
  { id: "romans19", question: "What did God give them over to?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Their desires" }, { label: "C", text: "Law" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Romans 1:24", explanation: "Consequences of sin." },
  { id: "romans20", question: "What was darkened?", options: [{ label: "A", text: "Heart" }, { label: "B", text: "Mind" }, { label: "C", text: "Spirit" }, { label: "D", text: "Soul" }], correctAnswer: "A", verse: "Romans 1:21", explanation: "Spiritual blindness." },
  { id: "romans21", question: "What did they claim to be?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Wise" }, { label: "C", text: "Righteous" }, { label: "D", text: "Spiritual" }], correctAnswer: "B", verse: "Romans 1:22", explanation: "False wisdom." },
  { id: "romans22", question: "What did they become?", options: [{ label: "A", text: "Lost" }, { label: "B", text: "Fools" }, { label: "C", text: "Blind" }, { label: "D", text: "Weak" }], correctAnswer: "B", verse: "Romans 1:22", explanation: "Result of pride." },
  { id: "romans23", question: "What did they worship?", options: [{ label: "A", text: "God" }, { label: "B", text: "Created things" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Romans 1:25", explanation: "Idolatry." },
  { id: "romans24", question: "Who is blessed forever?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "The Creator" }, { label: "C", text: "Israel" }, { label: "D", text: "Humanity" }], correctAnswer: "B", verse: "Romans 1:25", explanation: "God alone worthy." },
  { id: "romans25", question: "What filled people?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "All unrighteousness" }, { label: "C", text: "Fear" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Romans 1:29", explanation: "Catalog of sins." },
  { id: "romans26", question: "What attitude did they have?", options: [{ label: "A", text: "Repentant" }, { label: "B", text: "Approval of sin" }, { label: "C", text: "Humility" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Romans 1:32", explanation: "Moral corruption." },
  { id: "romans27", question: "Who judges others?", options: [{ label: "A", text: "God" }, { label: "B", text: "Those who practice the same things" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Romans 2:1", explanation: "Hypocrisy exposed." },
  { id: "romans28", question: "God's kindness leads to?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Repentance" }, { label: "C", text: "Salvation" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 2:4", explanation: "Purpose of mercy." },
  { id: "romans29", question: "God judges according to?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Deeds" }, { label: "C", text: "Law" }, { label: "D", text: "Heritage" }], correctAnswer: "B", verse: "Romans 2:6", explanation: "Righteous judgment." },
  { id: "romans30", question: "Who will receive eternal life?", options: [{ label: "A", text: "Law keepers" }, { label: "B", text: "Those who persist in doing good" }, { label: "C", text: "Israel" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Romans 2:7", explanation: "Perseverance described." },
  { id: "romans31", question: "God shows no?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Favoritism" }, { label: "C", text: "Judgment" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "Romans 2:11", explanation: "Impartial God." },
  { id: "romans32", question: "Who will be judged by the law?", options: [{ label: "A", text: "Gentiles" }, { label: "B", text: "Those under the law" }, { label: "C", text: "Believers" }, { label: "D", text: "Everyone" }], correctAnswer: "B", verse: "Romans 2:12", explanation: "Accountability." },
  { id: "romans33", question: "Who do what the law requires?", options: [{ label: "A", text: "Jews" }, { label: "B", text: "Gentiles by nature" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Romans 2:14", explanation: "Law written on hearts." },
  { id: "romans34", question: "What bears witness?", options: [{ label: "A", text: "Scripture" }, { label: "B", text: "Conscience" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 2:15", explanation: "Moral awareness." },
  { id: "romans35", question: "Who judges secrets?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Romans 2:16", explanation: "Christ as judge." },
  { id: "romans36", question: "Who relies on the law?", options: [{ label: "A", text: "Gentiles" }, { label: "B", text: "Jews" }, { label: "C", text: "Christians" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Romans 2:17", explanation: "Jewish confidence." },
  { id: "romans37", question: "What do they boast in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "Law" }, { label: "D", text: "Works" }], correctAnswer: "B", verse: "Romans 2:17", explanation: "Religious pride." },
  { id: "romans38", question: "What dishonors God?", options: [{ label: "A", text: "Ignorance" }, { label: "B", text: "Breaking the law" }, { label: "C", text: "Doubt" }, { label: "D", text: "Weak faith" }], correctAnswer: "B", verse: "Romans 2:23", explanation: "Hypocrisy." },
  { id: "romans39", question: "God's name is blasphemed among?", options: [{ label: "A", text: "Jews" }, { label: "B", text: "Gentiles" }, { label: "C", text: "Romans" }, { label: "D", text: "Believers" }], correctAnswer: "B", verse: "Romans 2:24", explanation: "Bad witness." },
  { id: "romans40", question: "True circumcision is of the?", options: [{ label: "A", text: "Flesh" }, { label: "B", text: "Heart" }, { label: "C", text: "Law" }, { label: "D", text: "Spirit only" }], correctAnswer: "B", verse: "Romans 2:29", explanation: "Inner transformation." },
  { id: "romans41", question: "What advantage has the Jew?", options: [{ label: "A", text: "None" }, { label: "B", text: "Much in every way" }, { label: "C", text: "Salvation" }, { label: "D", text: "Law only" }], correctAnswer: "B", verse: "Romans 3:1-2", explanation: "Entrusted with God's words." },
  { id: "romans42", question: "What were they entrusted with?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Oracles of God" }, { label: "C", text: "Temple" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Romans 3:2", explanation: "Scripture." },
  { id: "romans43", question: "Is God unjust to judge?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Romans 3:6", explanation: "God is righteous." },
  { id: "romans44", question: "Who is righteous?", options: [{ label: "A", text: "Many" }, { label: "B", text: "No one" }, { label: "C", text: "The law keeper" }, { label: "D", text: "The Jew" }], correctAnswer: "B", verse: "Romans 3:10", explanation: "Universal sin." },
  { id: "romans45", question: "All have done what?", options: [{ label: "A", text: "Good" }, { label: "B", text: "Sinned" }, { label: "C", text: "Believed" }, { label: "D", text: "Repented" }], correctAnswer: "B", verse: "Romans 3:23", explanation: "Human condition." },
  { id: "romans46", question: "All fall short of?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Glory of God" }, { label: "C", text: "Grace" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 3:23", explanation: "Sin's effect." },
  { id: "romans47", question: "Justification is by?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Grace" }, { label: "C", text: "Law" }, { label: "D", text: "Heritage" }], correctAnswer: "B", verse: "Romans 3:24", explanation: "Free gift." },
  { id: "romans48", question: "Through what?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Redemption in Christ" }, { label: "C", text: "Law keeping" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Romans 3:24", explanation: "Christ's work." },
  { id: "romans49", question: "God presented Christ as?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Sacrifice of atonement" }, { label: "C", text: "Judge" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "Romans 3:25", explanation: "Propitiation." },
  { id: "romans50", question: "Boasting is?", options: [{ label: "A", text: "Allowed" }, { label: "B", text: "Excluded" }, { label: "C", text: "Encouraged" }, { label: "D", text: "Required" }], correctAnswer: "B", verse: "Romans 3:27", explanation: "Grace eliminates pride." },
  { id: "romans51", question: "Justification is by faith apart from?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Works of the law" }, { label: "C", text: "Obedience" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Romans 3:28", explanation: "Faith alone." },
  { id: "romans52", question: "Is God God of Jews only?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Romans 3:29", explanation: "God of all." },
  { id: "romans53", question: "God will justify whom?", options: [{ label: "A", text: "Circumcised only" }, { label: "B", text: "Both Jews and Gentiles" }, { label: "C", text: "Faithful" }, { label: "D", text: "Israel" }], correctAnswer: "B", verse: "Romans 3:30", explanation: "One God." },
  { id: "romans54", question: "Does faith nullify the law?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Partially" }, { label: "D", text: "Eventually" }], correctAnswer: "B", verse: "Romans 3:31", explanation: "Law upheld." },
  { id: "romans55", question: "Who is used as example of faith?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Abraham" }, { label: "C", text: "David" }, { label: "D", text: "Noah" }], correctAnswer: "B", verse: "Romans 4:1-3", explanation: "Faith credited." },
  { id: "romans56", question: "What was credited to Abraham?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Law" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Romans 4:3", explanation: "By faith." },
  { id: "romans57", question: "Was this before circumcision?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "After" }, { label: "D", text: "Unclear" }], correctAnswer: "A", verse: "Romans 4:10", explanation: "Faith precedes ritual." },
  { id: "romans58", question: "Abraham is father of whom?", options: [{ label: "A", text: "Jews only" }, { label: "B", text: "All who believe" }, { label: "C", text: "Gentiles only" }, { label: "D", text: "Israel" }], correctAnswer: "B", verse: "Romans 4:11", explanation: "Universal faith." },
  { id: "romans59", question: "Promise came through?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith" }, { label: "C", text: "Works" }, { label: "D", text: "Circumcision" }], correctAnswer: "B", verse: "Romans 4:13", explanation: "Faith-based promise." },
  { id: "romans60", question: "Faith gives glory to?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "God" }, { label: "C", text: "Law" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Romans 4:20", explanation: "God-centered faith." },
  { id: "romans61", question: "Faith was credited for whose sake?", options: [{ label: "A", text: "Abraham only" }, { label: "B", text: "Us also" }, { label: "C", text: "Jews" }, { label: "D", text: "Gentiles" }], correctAnswer: "B", verse: "Romans 4:23-24", explanation: "Applied to believers." },
  { id: "romans62", question: "Justified by faith, we have?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Peace with God" }, { label: "C", text: "Salvation" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Romans 5:1", explanation: "Reconciliation." },
  { id: "romans63", question: "Through whom is peace?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Romans 5:1", explanation: "Mediator." },
  { id: "romans64", question: "Grace gives access to?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Hope" }, { label: "C", text: "God's presence" }, { label: "D", text: "Joy" }], correctAnswer: "C", verse: "Romans 5:2", explanation: "Standing in grace." },
  { id: "romans65", question: "Suffering produces?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Perseverance" }, { label: "C", text: "Joy" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Romans 5:3", explanation: "Spiritual growth." },
  { id: "romans66", question: "Perseverance produces?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Character" }, { label: "C", text: "Faith" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Romans 5:4", explanation: "Mature faith." },
  { id: "romans67", question: "Hope does not?", options: [{ label: "A", text: "Save" }, { label: "B", text: "Disappoint" }, { label: "C", text: "Fail" }, { label: "D", text: "Change" }], correctAnswer: "B", verse: "Romans 5:5", explanation: "Assured hope." },
  { id: "romans68", question: "God demonstrated His love by?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Christ dying for sinners" }, { label: "C", text: "Law" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Romans 5:8", explanation: "Sacrificial love." },
  { id: "romans69", question: "We were enemies but now?", options: [{ label: "A", text: "Forgiven" }, { label: "B", text: "Reconciled" }, { label: "C", text: "Saved" }, { label: "D", text: "Justified" }], correctAnswer: "B", verse: "Romans 5:10", explanation: "Restored relationship." },
  { id: "romans70", question: "Sin entered through whom?", options: [{ label: "A", text: "Eve" }, { label: "B", text: "Adam" }, { label: "C", text: "Satan" }, { label: "D", text: "Cain" }], correctAnswer: "B", verse: "Romans 5:12", explanation: "Original sin." },
  { id: "romans71", question: "Death spread to all because?", options: [{ label: "A", text: "Law" }, { label: "B", text: "All sinned" }, { label: "C", text: "Adam sinned" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Romans 5:12", explanation: "Universal sin." },
  { id: "romans72", question: "Gift is not like the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Trespass" }, { label: "C", text: "Judgment" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Romans 5:15", explanation: "Grace exceeds sin." },
  { id: "romans73", question: "Grace reigns through?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Faith" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Romans 5:21", explanation: "Reign of grace." },
  { id: "romans74", question: "Should we continue in sin?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Romans 6:1-2", explanation: "Dead to sin." },
  { id: "romans75", question: "We were baptized into?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ's death" }, { label: "C", text: "Church" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Romans 6:3", explanation: "Union with Christ." },
  { id: "romans76", question: "Old self was?", options: [{ label: "A", text: "Renewed" }, { label: "B", text: "Crucified" }, { label: "C", text: "Forgiven" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Romans 6:6", explanation: "Freedom from sin." },
  { id: "romans77", question: "Sin shall not be your?", options: [{ label: "A", text: "Friend" }, { label: "B", text: "Master" }, { label: "C", text: "Judge" }, { label: "D", text: "Burden" }], correctAnswer: "B", verse: "Romans 6:14", explanation: "New lordship." },
  { id: "romans78", question: "Wages of sin are?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Death" }, { label: "C", text: "Suffering" }, { label: "D", text: "Wrath" }], correctAnswer: "B", verse: "Romans 6:23", explanation: "Outcome of sin." },
  { id: "romans79", question: "Gift of God is?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Eternal life" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Romans 6:23", explanation: "Free gift." },
  { id: "romans80", question: "Through whom?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Romans 6:23", explanation: "Christ-centered." },
  { id: "romans81", question: "Law has authority while?", options: [{ label: "A", text: "Alive" }, { label: "B", text: "Living" }, { label: "C", text: "Under law" }, { label: "D", text: "Dead" }], correctAnswer: "A", verse: "Romans 7:1", explanation: "Legal principle." },
  { id: "romans82", question: "We died to the law through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Body of Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Romans 7:4", explanation: "New relationship." },
  { id: "romans83", question: "Law is?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Holy" }, { label: "C", text: "Death" }, { label: "D", text: "Weak" }], correctAnswer: "B", verse: "Romans 7:12", explanation: "Law's goodness." },
  { id: "romans84", question: "What does Paul struggle with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Doing good" }, { label: "C", text: "Understanding" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Romans 7:15", explanation: "Inner conflict." },
  { id: "romans85", question: "Who will rescue him?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 7:25", explanation: "Deliverance found." },
  { id: "romans86", question: "There is now no?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Condemnation" }, { label: "C", text: "Judgment" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Romans 8:1", explanation: "Freedom in Christ." },
  { id: "romans87", question: "Who sets free?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Spirit" }, { label: "C", text: "Grace" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 8:2", explanation: "Spirit's work." },
  { id: "romans88", question: "Mind set on flesh leads to?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Death" }, { label: "C", text: "Fear" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Romans 8:6", explanation: "Spiritual contrast." },
  { id: "romans89", question: "Mind set on Spirit leads to?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Life and peace" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Romans 8:6", explanation: "Spirit-filled life." },
  { id: "romans90", question: "Who lives in believers?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "Spirit of God" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 8:9", explanation: "Indwelling Spirit." },
  { id: "romans91", question: "Believers are children of?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God" }, { label: "C", text: "Promise" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Romans 8:16", explanation: "Adoption." },
  { id: "romans92", question: "Creation waits for?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Revelation of God's children" }, { label: "C", text: "Restoration" }, { label: "D", text: "End" }], correctAnswer: "B", verse: "Romans 8:19", explanation: "Future hope." },
  { id: "romans93", question: "All things work together for?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Good" }, { label: "C", text: "Faith" }, { label: "D", text: "Purpose" }], correctAnswer: "B", verse: "Romans 8:28", explanation: "God's sovereignty." },
  { id: "romans94", question: "Who are called?", options: [{ label: "A", text: "Everyone" }, { label: "B", text: "According to His purpose" }, { label: "C", text: "Faithful" }, { label: "D", text: "Israel" }], correctAnswer: "B", verse: "Romans 8:28", explanation: "Divine calling." },
  { id: "romans95", question: "Whom God foreknew He also?", options: [{ label: "A", text: "Justified" }, { label: "B", text: "Predestined" }, { label: "C", text: "Called" }, { label: "D", text: "Saved" }], correctAnswer: "B", verse: "Romans 8:29", explanation: "God's plan." },
  { id: "romans96", question: "Who can be against us?", options: [{ label: "A", text: "Many" }, { label: "B", text: "No one" }, { label: "C", text: "Satan" }, { label: "D", text: "World" }], correctAnswer: "B", verse: "Romans 8:31", explanation: "God's victory." },
  { id: "romans97", question: "Who did God not spare?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "His own Son" }, { label: "C", text: "Angels" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Romans 8:32", explanation: "Ultimate sacrifice." },
  { id: "romans98", question: "Who intercedes for us?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "Angels" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Romans 8:34", explanation: "Ongoing advocacy." },
  { id: "romans99", question: "What cannot separate us?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Love of God" }, { label: "C", text: "Law" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Romans 8:39", explanation: "Secure love." },
  { id: "romans100", question: "Where is this love found?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ Jesus our Lord" }, { label: "C", text: "Grace" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Romans 8:39", explanation: "Union with Christ." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RomansTriviaPage() {
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
          .eq("book", "romans");

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
          book: "romans",
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
            book: "romans",
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
    if (score === 10) return "Perfect! You're a Romans expert!";
    if (score >= 8) return "Excellent! You know Romans well!";
    if (score >= 6) return "Good job! Keep studying Romans!";
    if (score >= 4) return "Nice try! Romans has much to explore!";
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
              href="/bible-trivia/romans"
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

