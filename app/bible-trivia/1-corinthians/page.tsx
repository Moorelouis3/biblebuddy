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
  { id: "1corinthians1", question: "Who wrote 1 Corinthians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "1 Corinthians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "1corinthians2", question: "To whom is 1 Corinthians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Church in Corinth" }, { label: "C", text: "Church in Galatia" }, { label: "D", text: "Church in Ephesus" }], correctAnswer: "B", verse: "1 Corinthians 1:2", explanation: "Addressed to believers in Corinth." },
  { id: "1corinthians3", question: "What issue is addressed early in the letter?", options: [{ label: "A", text: "False teaching" }, { label: "B", text: "Divisions" }, { label: "C", text: "Persecution" }, { label: "D", text: "Poverty" }], correctAnswer: "B", verse: "1 Corinthians 1:10", explanation: "Unity is urged." },
  { id: "1corinthians4", question: "Who were people claiming to follow?", options: [{ label: "A", text: "Jesus only" }, { label: "B", text: "Paul, Apollos, Cephas" }, { label: "C", text: "Angels" }, { label: "D", text: "Moses" }], correctAnswer: "B", verse: "1 Corinthians 1:12", explanation: "Factionalism." },
  { id: "1corinthians5", question: "What is the message of the cross?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Foolishness to those perishing" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "1 Corinthians 1:18", explanation: "Spiritual contrast." },
  { id: "1corinthians6", question: "Christ is the power and wisdom of?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God" }, { label: "C", text: "Faith" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "1 Corinthians 1:24", explanation: "True wisdom." },
  { id: "1corinthians7", question: "God chose the foolish to?", options: [{ label: "A", text: "Lead" }, { label: "B", text: "Shame the wise" }, { label: "C", text: "Teach" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "1 Corinthians 1:27", explanation: "God's upside-down kingdom." },
  { id: "1corinthians8", question: "What should believers boast in?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "The Lord" }, { label: "C", text: "Works" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 1:31", explanation: "Glory to God alone." },
  { id: "1corinthians9", question: "What did Paul resolve to know?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Jesus Christ crucified" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 2:2", explanation: "Central message." },
  { id: "1corinthians10", question: "Paul's message relied on?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Spirit's power" }, { label: "C", text: "Miracles" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "1 Corinthians 2:4", explanation: "Power of God." },
  { id: "1corinthians11", question: "Spiritual truths are understood by?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Spirit" }, { label: "C", text: "Law" }, { label: "D", text: "Education" }], correctAnswer: "B", verse: "1 Corinthians 2:14", explanation: "Spiritual discernment." },
  { id: "1corinthians12", question: "Who is called worldly?", options: [{ label: "A", text: "Unbelievers" }, { label: "B", text: "Believers with divisions" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "1 Corinthians 3:1-3", explanation: "Immaturity." },
  { id: "1corinthians13", question: "Who planted the church?", options: [{ label: "A", text: "Apollos" }, { label: "B", text: "Paul" }, { label: "C", text: "Peter" }, { label: "D", text: "Jesus" }], correctAnswer: "B", verse: "1 Corinthians 3:6", explanation: "Foundational ministry." },
  { id: "1corinthians14", question: "Who watered it?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Apollos" }, { label: "C", text: "Peter" }, { label: "D", text: "Barnabas" }], correctAnswer: "B", verse: "1 Corinthians 3:6", explanation: "Shared work." },
  { id: "1corinthians15", question: "Who gives the growth?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "God" }, { label: "C", text: "Church" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "1 Corinthians 3:7", explanation: "God's work." },
  { id: "1corinthians16", question: "Foundation no one can lay except?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Corinthians 3:11", explanation: "Christ-centered faith." },
  { id: "1corinthians17", question: "Believers are God's?", options: [{ label: "A", text: "People" }, { label: "B", text: "Temple" }, { label: "C", text: "Servants" }, { label: "D", text: "Children" }], correctAnswer: "B", verse: "1 Corinthians 3:16", explanation: "Indwelling Spirit." },
  { id: "1corinthians18", question: "What destroys God's temple?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Division" }, { label: "C", text: "False teaching" }, { label: "D", text: "Pride" }], correctAnswer: "A", verse: "1 Corinthians 3:17", explanation: "Serious warning." },
  { id: "1corinthians19", question: "How should apostles be regarded?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Servants of Christ" }, { label: "C", text: "Rulers" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "1 Corinthians 4:1", explanation: "Humble service." },
  { id: "1corinthians20", question: "Who judges Paul?", options: [{ label: "A", text: "Church" }, { label: "B", text: "The Lord" }, { label: "C", text: "People" }, { label: "D", text: "Self" }], correctAnswer: "B", verse: "1 Corinthians 4:4", explanation: "God alone judges." },
  { id: "1corinthians21", question: "Kingdom of God is not?", options: [{ label: "A", text: "Righteousness" }, { label: "B", text: "Talk" }, { label: "C", text: "Power" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Corinthians 4:20", explanation: "Power over words." },
  { id: "1corinthians22", question: "What sin is addressed in chapter 5?", options: [{ label: "A", text: "Greed" }, { label: "B", text: "Sexual immorality" }, { label: "C", text: "Pride" }, { label: "D", text: "Idolatry" }], correctAnswer: "B", verse: "1 Corinthians 5:1", explanation: "Church discipline." },
  { id: "1corinthians23", question: "A little leaven does what?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Leavens the whole lump" }, { label: "C", text: "Purifies" }, { label: "D", text: "Strengthens" }], correctAnswer: "B", verse: "1 Corinthians 5:6", explanation: "Sin spreads." },
  { id: "1corinthians24", question: "Believers should judge?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Matters within the church" }, { label: "C", text: "The world" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "1 Corinthians 6:2", explanation: "Spiritual responsibility." },
  { id: "1corinthians25", question: "Your body is a temple of?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "God" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 6:19", explanation: "Body matters." },
  { id: "1corinthians26", question: "You were bought with a?", options: [{ label: "A", text: "Covenant" }, { label: "B", text: "Price" }, { label: "C", text: "Promise" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "1 Corinthians 6:20", explanation: "Redemption cost." },
  { id: "1corinthians27", question: "Marriage advice begins in?", options: [{ label: "A", text: "Chapter 5" }, { label: "B", text: "Chapter 7" }, { label: "C", text: "Chapter 8" }, { label: "D", text: "Chapter 9" }], correctAnswer: "B", verse: "1 Corinthians 7:1", explanation: "Practical teaching." },
  { id: "1corinthians28", question: "Each person should remain?", options: [{ label: "A", text: "Single" }, { label: "B", text: "In their calling" }, { label: "C", text: "Married" }, { label: "D", text: "Free" }], correctAnswer: "B", verse: "1 Corinthians 7:20", explanation: "Faithful living." },
  { id: "1corinthians29", question: "Food offered to idols is discussed in?", options: [{ label: "A", text: "Chapter 7" }, { label: "B", text: "Chapter 8" }, { label: "C", text: "Chapter 9" }, { label: "D", text: "Chapter 10" }], correctAnswer: "B", verse: "1 Corinthians 8:1", explanation: "Christian freedom." },
  { id: "1corinthians30", question: "Knowledge without love does what?", options: [{ label: "A", text: "Builds up" }, { label: "B", text: "Puffs up" }, { label: "C", text: "Strengthens" }, { label: "D", text: "Purifies" }], correctAnswer: "B", verse: "1 Corinthians 8:1", explanation: "Love matters most." },
  { id: "1corinthians31", question: "Love does what?", options: [{ label: "A", text: "Judges" }, { label: "B", text: "Builds up" }, { label: "C", text: "Condemns" }, { label: "D", text: "Divides" }], correctAnswer: "B", verse: "1 Corinthians 8:1", explanation: "Edification." },
  { id: "1corinthians32", question: "Paul became like what to save some?", options: [{ label: "A", text: "Gentiles" }, { label: "B", text: "All people" }, { label: "C", text: "Jews" }, { label: "D", text: "Servants" }], correctAnswer: "B", verse: "1 Corinthians 9:22", explanation: "Missional flexibility." },
  { id: "1corinthians33", question: "Paul compares faith to what sport?", options: [{ label: "A", text: "Boxing" }, { label: "B", text: "Running a race" }, { label: "C", text: "Wrestling" }, { label: "D", text: "Archery" }], correctAnswer: "B", verse: "1 Corinthians 9:24", explanation: "Discipline imagery." },
  { id: "1corinthians34", question: "The crown believers receive is?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Imperishable" }, { label: "C", text: "Silver" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "1 Corinthians 9:25", explanation: "Eternal reward." },
  { id: "1corinthians35", question: "What should believers flee?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Temptation" }, { label: "D", text: "Worldliness" }], correctAnswer: "B", verse: "1 Corinthians 10:14", explanation: "Clear command." },
  { id: "1corinthians36", question: "Everything is permissible but?", options: [{ label: "A", text: "Not lawful" }, { label: "B", text: "Not beneficial" }, { label: "C", text: "Not righteous" }, { label: "D", text: "Not wise" }], correctAnswer: "B", verse: "1 Corinthians 10:23", explanation: "Christian wisdom." },
  { id: "1corinthians37", question: "Do everything for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Glory of God" }, { label: "C", text: "Good of others" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 10:31", explanation: "God-centered life." },
  { id: "1corinthians38", question: "Head of Christ is?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "God" }, { label: "C", text: "Church" }, { label: "D", text: "Father" }], correctAnswer: "B", verse: "1 Corinthians 11:3", explanation: "Order in creation." },
  { id: "1corinthians39", question: "What ordinance is corrected in chapter 11?", options: [{ label: "A", text: "Baptism" }, { label: "B", text: "Lord's Supper" }, { label: "C", text: "Prayer" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "1 Corinthians 11:20", explanation: "Proper worship." },
  { id: "1corinthians40", question: "Unworthy participation brings?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Judgment" }, { label: "C", text: "Grace" }, { label: "D", text: "Forgiveness" }], correctAnswer: "B", verse: "1 Corinthians 11:29", explanation: "Serious warning." },
  { id: "1corinthians41", question: "Spiritual gifts come from?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Faith" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "1 Corinthians 12:4", explanation: "One Spirit." },
  { id: "1corinthians42", question: "The church is compared to a?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Body" }, { label: "C", text: "House" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "1 Corinthians 12:12", explanation: "Unity in diversity." },
  { id: "1corinthians43", question: "Who arranges the body?", options: [{ label: "A", text: "Church" }, { label: "B", text: "God" }, { label: "C", text: "Spirit" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "1 Corinthians 12:18", explanation: "Divine design." },
  { id: "1corinthians44", question: "The greatest gift is?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Love" }, { label: "D", text: "Prophecy" }], correctAnswer: "C", verse: "1 Corinthians 13:13", explanation: "Love supreme." },
  { id: "1corinthians45", question: "Love is?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Patient" }, { label: "C", text: "Jealous" }, { label: "D", text: "Proud" }], correctAnswer: "B", verse: "1 Corinthians 13:4", explanation: "Love defined." },
  { id: "1corinthians46", question: "Love never?", options: [{ label: "A", text: "Fails" }, { label: "B", text: "Ends" }, { label: "C", text: "Changes" }, { label: "D", text: "Weakens" }], correctAnswer: "A", verse: "1 Corinthians 13:8", explanation: "Enduring virtue." },
  { id: "1corinthians47", question: "Prophecy is for?", options: [{ label: "A", text: "Self" }, { label: "B", text: "Edification" }, { label: "C", text: "Judgment" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "1 Corinthians 14:3", explanation: "Building the church." },
  { id: "1corinthians48", question: "God is not a God of?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Disorder" }, { label: "C", text: "Power" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "1 Corinthians 14:33", explanation: "Order in worship." },
  { id: "1corinthians49", question: "Women were instructed to?", options: [{ label: "A", text: "Teach" }, { label: "B", text: "Remain silent in church" }, { label: "C", text: "Lead" }, { label: "D", text: "Pray only" }], correctAnswer: "B", verse: "1 Corinthians 14:34", explanation: "Cultural instruction." },
  { id: "1corinthians50", question: "Hold firmly to what?", options: [{ label: "A", text: "Law" }, { label: "B", text: "The gospel" }, { label: "C", text: "Faith" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "1 Corinthians 15:2", explanation: "Salvation message." },
  { id: "1corinthians51", question: "What is of first importance?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ died for sins" }, { label: "C", text: "Resurrection" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Corinthians 15:3", explanation: "Core gospel." },
  { id: "1corinthians52", question: "Christ was buried and?", options: [{ label: "A", text: "Ascended" }, { label: "B", text: "Raised" }, { label: "C", text: "Glorified" }, { label: "D", text: "Judged" }], correctAnswer: "B", verse: "1 Corinthians 15:4", explanation: "Resurrection truth." },
  { id: "1corinthians53", question: "Who did Christ appear to first?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "The Twelve" }, { label: "C", text: "Mary" }, { label: "D", text: "James" }], correctAnswer: "A", verse: "1 Corinthians 15:5", explanation: "Eyewitnesses." },
  { id: "1corinthians54", question: "Last enemy destroyed is?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Death" }, { label: "C", text: "Satan" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "1 Corinthians 15:26", explanation: "Final victory." },
  { id: "1corinthians55", question: "Without resurrection faith is?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Useless" }, { label: "C", text: "Incomplete" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "1 Corinthians 15:17", explanation: "Resurrection central." },
  { id: "1corinthians56", question: "Flesh and blood cannot?", options: [{ label: "A", text: "Be saved" }, { label: "B", text: "Inherit kingdom" }, { label: "C", text: "See God" }, { label: "D", text: "Enter heaven" }], correctAnswer: "B", verse: "1 Corinthians 15:50", explanation: "Transformation needed." },
  { id: "1corinthians57", question: "The perishable will put on?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Imperishable" }, { label: "C", text: "Glory" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Corinthians 15:53", explanation: "Resurrection body." },
  { id: "1corinthians58", question: "Death is swallowed up in?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Victory" }, { label: "C", text: "Life" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 15:54", explanation: "Ultimate triumph." },
  { id: "1corinthians59", question: "Be steadfast and always?", options: [{ label: "A", text: "Praying" }, { label: "B", text: "Abounding in the Lord's work" }, { label: "C", text: "Believing" }, { label: "D", text: "Serving" }], correctAnswer: "B", verse: "1 Corinthians 15:58", explanation: "Encouragement." },
  { id: "1corinthians60", question: "Your labor in the Lord is not?", options: [{ label: "A", text: "Rewarded" }, { label: "B", text: "In vain" }, { label: "C", text: "Seen" }, { label: "D", text: "Perfect" }], correctAnswer: "B", verse: "1 Corinthians 15:58", explanation: "Eternal value." },
  { id: "1corinthians61", question: "Collection was for whom?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "God's people" }, { label: "C", text: "Poor believers" }, { label: "D", text: "Church leaders" }], correctAnswer: "C", verse: "1 Corinthians 16:1", explanation: "Care for saints." },
  { id: "1corinthians62", question: "Paul planned to visit after?", options: [{ label: "A", text: "Winter" }, { label: "B", text: "Passing through Macedonia" }, { label: "C", text: "Pentecost" }, { label: "D", text: "Jerusalem" }], correctAnswer: "B", verse: "1 Corinthians 16:5", explanation: "Travel plans." },
  { id: "1corinthians63", question: "Who was Timothy?", options: [{ label: "A", text: "A teacher" }, { label: "B", text: "Paul's coworker" }, { label: "C", text: "An elder" }, { label: "D", text: "A prophet" }], correctAnswer: "B", verse: "1 Corinthians 16:10", explanation: "Trusted companion." },
  { id: "1corinthians64", question: "Be watchful, stand firm in?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Hope" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Corinthians 16:13", explanation: "Final exhortation." },
  { id: "1corinthians65", question: "Let all you do be done in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "1 Corinthians 16:14", explanation: "Love-centered life." },
  { id: "1corinthians66", question: "Who refreshed Paul's spirit?", options: [{ label: "A", text: "Apollos" }, { label: "B", text: "Stephanas" }, { label: "C", text: "Timothy" }, { label: "D", text: "Barnabas" }], correctAnswer: "B", verse: "1 Corinthians 16:18", explanation: "Faithful servants." },
  { id: "1corinthians67", question: "What final phrase closes the letter?", options: [{ label: "A", text: "Peace be with you" }, { label: "B", text: "Love of the Lord be with you" }, { label: "C", text: "Grace of the Lord Jesus" }, { label: "D", text: "Go in peace" }], correctAnswer: "C", verse: "1 Corinthians 16:23", explanation: "Grace-centered ending." },
  { id: "1corinthians68", question: "Who did Paul urge the church to recognize?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "Devoted servants" }, { label: "C", text: "Teachers" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "1 Corinthians 16:15-16", explanation: "Honoring faithful service." },
  { id: "1corinthians69", question: "Who was devoted to serving the saints?", options: [{ label: "A", text: "Apollos" }, { label: "B", text: "Stephanas" }, { label: "C", text: "Timothy" }, { label: "D", text: "Titus" }], correctAnswer: "B", verse: "1 Corinthians 16:15", explanation: "Model of service." },
  { id: "1corinthians70", question: "What attitude refreshed Paul?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Submission" }, { label: "C", text: "Encouragement" }, { label: "D", text: "Unity" }], correctAnswer: "C", verse: "1 Corinthians 16:18", explanation: "Encouragement strengthens leaders." },
  { id: "1corinthians71", question: "Who sends greetings in the letter?", options: [{ label: "A", text: "Churches of Judea" }, { label: "B", text: "Churches of Asia" }, { label: "C", text: "Churches of Galatia" }, { label: "D", text: "Churches of Rome" }], correctAnswer: "B", verse: "1 Corinthians 16:19", explanation: "Wider church connection." },
  { id: "1corinthians72", question: "Who hosted a church in their house?", options: [{ label: "A", text: "Paul and Barnabas" }, { label: "B", text: "Aquila and Priscilla" }, { label: "C", text: "Timothy and Titus" }, { label: "D", text: "Peter and John" }], correctAnswer: "B", verse: "1 Corinthians 16:19", explanation: "House church leaders." },
  { id: "1corinthians73", question: "How does Paul send his greeting?", options: [{ label: "A", text: "Through a messenger" }, { label: "B", text: "In his own hand" }, { label: "C", text: "Through Timothy" }, { label: "D", text: "By dictation" }], correctAnswer: "B", verse: "1 Corinthians 16:21", explanation: "Personal authentication." },
  { id: "1corinthians74", question: "What warning does Paul give?", options: [{ label: "A", text: "Do not fear" }, { label: "B", text: "If anyone does not love the Lord, let him be accursed" }, { label: "C", text: "Hold fast" }, { label: "D", text: "Be patient" }], correctAnswer: "B", verse: "1 Corinthians 16:22", explanation: "Serious devotion required." },
  { id: "1corinthians75", question: "What Aramaic phrase does Paul use?", options: [{ label: "A", text: "Abba" }, { label: "B", text: "Maranatha" }, { label: "C", text: "Hosanna" }, { label: "D", text: "Elohim" }], correctAnswer: "B", verse: "1 Corinthians 16:22", explanation: "Means 'Our Lord, come'." },
  { id: "1corinthians76", question: "What does Maranatha express?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Hope for Christ's return" }, { label: "C", text: "Fear" }, { label: "D", text: "Praise" }], correctAnswer: "B", verse: "1 Corinthians 16:22", explanation: "Eschatological hope." },
  { id: "1corinthians77", question: "What does Paul pronounce at the end?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Grace" }, { label: "C", text: "Law" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "1 Corinthians 16:23", explanation: "Grace-centered closing." },
  { id: "1corinthians78", question: "Whose grace is mentioned?", options: [{ label: "A", text: "God the Father" }, { label: "B", text: "The Lord Jesus" }, { label: "C", text: "The Holy Spirit" }, { label: "D", text: "The Church" }], correctAnswer: "B", verse: "1 Corinthians 16:23", explanation: "Christ's sustaining grace." },
  { id: "1corinthians79", question: "What does Paul say his love is?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "With them all in Christ" }, { label: "C", text: "Earned" }, { label: "D", text: "Limited" }], correctAnswer: "B", verse: "1 Corinthians 16:24", explanation: "Pastoral affection." },
  { id: "1corinthians80", question: "What theme dominates the letter?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Unity in Christ" }, { label: "C", text: "Persecution" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "1 Corinthians 1-16", explanation: "Call to unity and holiness." },
  { id: "1corinthians81", question: "What undermines church unity?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Pride" }, { label: "C", text: "Love" }, { label: "D", text: "Service" }], correctAnswer: "B", verse: "1 Corinthians 1:10-13", explanation: "Root of division." },
  { id: "1corinthians82", question: "What gift is emphasized above all?", options: [{ label: "A", text: "Tongues" }, { label: "B", text: "Love" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "1 Corinthians 13", explanation: "Love surpasses all gifts." },
  { id: "1corinthians83", question: "What must govern spiritual gifts?", options: [{ label: "A", text: "Order" }, { label: "B", text: "Love" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "1 Corinthians 13:1-3", explanation: "Without love, gifts are empty." },
  { id: "1corinthians84", question: "What defines true wisdom?", options: [{ label: "A", text: "Education" }, { label: "B", text: "The cross of Christ" }, { label: "C", text: "Experience" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Corinthians 1:18-25", explanation: "God's wisdom revealed." },
  { id: "1corinthians85", question: "What attitude should believers have?", options: [{ label: "A", text: "Boasting" }, { label: "B", text: "Humility" }, { label: "C", text: "Fear" }, { label: "D", text: "Independence" }], correctAnswer: "B", verse: "1 Corinthians 3:18-21", explanation: "Humility before God." },
  { id: "1corinthians86", question: "Who owns everything?", options: [{ label: "A", text: "The church" }, { label: "B", text: "God" }, { label: "C", text: "Believers" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "1 Corinthians 3:21-23", explanation: "All belongs to God." },
  { id: "1corinthians87", question: "Believers belong to?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Christ" }, { label: "C", text: "The church" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "1 Corinthians 3:23", explanation: "Christ-centered identity." },
  { id: "1corinthians88", question: "What motivates Christian discipline?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Love for Christ" }, { label: "C", text: "Obligation" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "1 Corinthians 9:19-23", explanation: "Love-driven obedience." },
  { id: "1corinthians89", question: "What example is used to warn believers?", options: [{ label: "A", text: "David" }, { label: "B", text: "Israel in the wilderness" }, { label: "C", text: "Pharaoh" }, { label: "D", text: "Solomon" }], correctAnswer: "B", verse: "1 Corinthians 10:1-11", explanation: "Learning from past failure." },
  { id: "1corinthians90", question: "What should believers do with temptation?", options: [{ label: "A", text: "Endure alone" }, { label: "B", text: "Look for God's escape" }, { label: "C", text: "Ignore it" }, { label: "D", text: "Fight harder" }], correctAnswer: "B", verse: "1 Corinthians 10:13", explanation: "God provides a way out." },
  { id: "1corinthians91", question: "Who provides the way of escape?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "Church" }, { label: "D", text: "Self-control" }], correctAnswer: "B", verse: "1 Corinthians 10:13", explanation: "God's faithfulness." },
  { id: "1corinthians92", question: "Why should believers examine themselves?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Proper participation in the Lord's Supper" }, { label: "C", text: "Salvation" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Corinthians 11:28", explanation: "Reverent worship." },
  { id: "1corinthians93", question: "What happens when the body is ignored?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Division and judgment" }, { label: "C", text: "Growth" }, { label: "D", text: "Blessing" }], correctAnswer: "B", verse: "1 Corinthians 11:29-30", explanation: "Consequences of irreverence." },
  { id: "1corinthians94", question: "What unifies the church?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "One Spirit" }, { label: "C", text: "Leadership" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "1 Corinthians 12:13", explanation: "Spirit baptism." },
  { id: "1corinthians95", question: "What is the goal of prophecy?", options: [{ label: "A", text: "Prediction" }, { label: "B", text: "Edification" }, { label: "C", text: "Correction" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "1 Corinthians 14:3", explanation: "Building the church." },
  { id: "1corinthians96", question: "Why must worship be orderly?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "God's character" }, { label: "C", text: "Leadership" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "1 Corinthians 14:33", explanation: "God is orderly." },
  { id: "1corinthians97", question: "What anchors Christian hope?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Resurrection of Christ" }, { label: "C", text: "Law" }, { label: "D", text: "Works" }], correctAnswer: "B", verse: "1 Corinthians 15", explanation: "Resurrection foundation." },
  { id: "1corinthians98", question: "What transforms believers?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Resurrection power" }, { label: "C", text: "Obedience" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "1 Corinthians 15:51-52", explanation: "Final transformation." },
  { id: "1corinthians99", question: "What attitude ends the letter?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Grace and love" }, { label: "C", text: "Judgment" }, { label: "D", text: "Warning" }], correctAnswer: "B", verse: "1 Corinthians 16:23-24", explanation: "Pastoral heart." },
  { id: "1corinthians100", question: "What is the lasting message of 1 Corinthians?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Love-centered faith" }, { label: "C", text: "Law-keeping" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "1 Corinthians 13", explanation: "Love above all." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstCorinthiansTriviaPage() {
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
          .eq("book", "1corinthians");

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
          book: "1corinthians",
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
            book: "1corinthians",
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
    if (score === 10) return "Perfect! You're a 1 Corinthians expert!";
    if (score >= 8) return "Excellent! You know 1 Corinthians well!";
    if (score >= 6) return "Good job! Keep studying 1 Corinthians!";
    if (score >= 4) return "Nice try! 1 Corinthians has much to explore!";
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
              href="/bible-trivia/1-corinthians"
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

