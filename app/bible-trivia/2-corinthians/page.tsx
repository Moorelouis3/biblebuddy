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
  { id: "2corinthians1", question: "Who wrote 2 Corinthians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "2 Corinthians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "2corinthians2", question: "To whom is 2 Corinthians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Church in Corinth" }, { label: "C", text: "Church in Galatia" }, { label: "D", text: "Church in Ephesus" }], correctAnswer: "B", verse: "2 Corinthians 1:1", explanation: "Addressed to the Corinthian believers." },
  { id: "2corinthians3", question: "Paul calls God the Father of?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Compassion" }, { label: "C", text: "Comfort" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Corinthians 1:3", explanation: "God comforts His people." },
  { id: "2corinthians4", question: "Why does God comfort us?", options: [{ label: "A", text: "For peace" }, { label: "B", text: "So we can comfort others" }, { label: "C", text: "For joy" }, { label: "D", text: "For strength" }], correctAnswer: "B", verse: "2 Corinthians 1:4", explanation: "Comfort is meant to be shared." },
  { id: "2corinthians5", question: "Paul says suffering increases?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Comfort in Christ" }, { label: "C", text: "Weakness" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "2 Corinthians 1:5", explanation: "Christ's comfort abounds." },
  { id: "2corinthians6", question: "What did Paul rely on instead of himself?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "God who raises the dead" }, { label: "C", text: "Faith" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "2 Corinthians 1:9", explanation: "Dependence on God." },
  { id: "2corinthians7", question: "Paul says his conscience testifies to?", options: [{ label: "A", text: "Holiness and sincerity" }, { label: "B", text: "Faith and hope" }, { label: "C", text: "Obedience" }, { label: "D", text: "Love" }], correctAnswer: "A", verse: "2 Corinthians 1:12", explanation: "Integrity in ministry." },
  { id: "2corinthians8", question: "Why did Paul delay visiting Corinth?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "To spare them" }, { label: "C", text: "Travel issues" }, { label: "D", text: "Persecution" }], correctAnswer: "B", verse: "2 Corinthians 1:23", explanation: "Pastoral concern." },
  { id: "2corinthians9", question: "What should be done with the repentant offender?", options: [{ label: "A", text: "Ignore" }, { label: "B", text: "Forgive and comfort" }, { label: "C", text: "Remove" }, { label: "D", text: "Punish further" }], correctAnswer: "B", verse: "2 Corinthians 2:7", explanation: "Restoration matters." },
  { id: "2corinthians10", question: "Why should forgiveness be extended?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "So Satan does not outwit us" }, { label: "C", text: "Unity" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "2 Corinthians 2:11", explanation: "Spiritual awareness." },
  { id: "2corinthians11", question: "Paul describes believers as a?", options: [{ label: "A", text: "Letter" }, { label: "B", text: "Temple" }, { label: "C", text: "Body" }, { label: "D", text: "Sacrifice" }], correctAnswer: "A", verse: "2 Corinthians 3:2", explanation: "Lives testify to Christ." },
  { id: "2corinthians12", question: "The letter is written by?", options: [{ label: "A", text: "Ink" }, { label: "B", text: "Spirit of the living God" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 3:3", explanation: "Spirit-written hearts." },
  { id: "2corinthians13", question: "The new covenant is of the?", options: [{ label: "A", text: "Letter" }, { label: "B", text: "Spirit" }, { label: "C", text: "Law" }, { label: "D", text: "Works" }], correctAnswer: "B", verse: "2 Corinthians 3:6", explanation: "Life-giving Spirit." },
  { id: "2corinthians14", question: "The letter kills but the Spirit gives?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Life" }, { label: "C", text: "Hope" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "2 Corinthians 3:6", explanation: "Contrast of covenants." },
  { id: "2corinthians15", question: "Where the Spirit of the Lord is, there is?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Freedom" }, { label: "C", text: "Truth" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "2 Corinthians 3:17", explanation: "Spiritual freedom." },
  { id: "2corinthians16", question: "Believers are being transformed into?", options: [{ label: "A", text: "Holiness" }, { label: "B", text: "Christ's image" }, { label: "C", text: "Righteousness" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 3:18", explanation: "Ongoing transformation." },
  { id: "2corinthians17", question: "Paul does not lose heart because?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Mercy received" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Corinthians 4:1", explanation: "God's mercy sustains." },
  { id: "2corinthians18", question: "The god of this age has blinded?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Unbelievers" }, { label: "C", text: "Israel" }, { label: "D", text: "Gentiles" }], correctAnswer: "B", verse: "2 Corinthians 4:4", explanation: "Spiritual blindness." },
  { id: "2corinthians19", question: "What shines in hearts?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Light of God's glory" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "2 Corinthians 4:6", explanation: "Divine illumination." },
  { id: "2corinthians20", question: "Treasure is in jars of?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Clay" }, { label: "C", text: "Silver" }, { label: "D", text: "Stone" }], correctAnswer: "B", verse: "2 Corinthians 4:7", explanation: "God's power, human weakness." },
  { id: "2corinthians21", question: "We are hard pressed but not?", options: [{ label: "A", text: "Crushed" }, { label: "B", text: "Defeated" }, { label: "C", text: "Lost" }, { label: "D", text: "Broken" }], correctAnswer: "A", verse: "2 Corinthians 4:8", explanation: "Resilience in Christ." },
  { id: "2corinthians22", question: "Outer self is wasting away but?", options: [{ label: "A", text: "Spirit grows" }, { label: "B", text: "Inner self renewed" }, { label: "C", text: "Faith increases" }, { label: "D", text: "Hope remains" }], correctAnswer: "B", verse: "2 Corinthians 4:16", explanation: "Inner renewal." },
  { id: "2corinthians23", question: "Our troubles are described as?", options: [{ label: "A", text: "Heavy" }, { label: "B", text: "Light and momentary" }, { label: "C", text: "Painful" }, { label: "D", text: "Unbearable" }], correctAnswer: "B", verse: "2 Corinthians 4:17", explanation: "Eternal perspective." },
  { id: "2corinthians24", question: "We fix our eyes on what is?", options: [{ label: "A", text: "Seen" }, { label: "B", text: "Unseen" }, { label: "C", text: "Temporary" }, { label: "D", text: "Physical" }], correctAnswer: "B", verse: "2 Corinthians 4:18", explanation: "Eternal focus." },
  { id: "2corinthians25", question: "Earthly body is compared to a?", options: [{ label: "A", text: "House" }, { label: "B", text: "Tent" }, { label: "C", text: "Temple" }, { label: "D", text: "Vessel" }], correctAnswer: "B", verse: "2 Corinthians 5:1", explanation: "Temporary dwelling." },
  { id: "2corinthians26", question: "Believers long to be clothed with?", options: [{ label: "A", text: "Righteousness" }, { label: "B", text: "Heavenly dwelling" }, { label: "C", text: "Faith" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "2 Corinthians 5:2", explanation: "Future hope." },
  { id: "2corinthians27", question: "We live by faith, not by?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Sight" }, { label: "C", text: "Works" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "2 Corinthians 5:7", explanation: "Faith-centered life." },
  { id: "2corinthians28", question: "We aim to please?", options: [{ label: "A", text: "People" }, { label: "B", text: "The Lord" }, { label: "C", text: "Church" }, { label: "D", text: "Self" }], correctAnswer: "B", verse: "2 Corinthians 5:9", explanation: "God-focused motivation." },
  { id: "2corinthians29", question: "Everyone will appear before?", options: [{ label: "A", text: "God's throne" }, { label: "B", text: "Judgment seat of Christ" }, { label: "C", text: "Angels" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "2 Corinthians 5:10", explanation: "Accountability." },
  { id: "2corinthians30", question: "Christ's love compels us because?", options: [{ label: "A", text: "He taught" }, { label: "B", text: "He died for all" }, { label: "C", text: "He reigns" }, { label: "D", text: "He saves" }], correctAnswer: "B", verse: "2 Corinthians 5:14", explanation: "Sacrificial love." },
  { id: "2corinthians31", question: "If anyone is in Christ, they are?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "A new creation" }, { label: "C", text: "Righteous" }, { label: "D", text: "Forgiven" }], correctAnswer: "B", verse: "2 Corinthians 5:17", explanation: "Transformation in Christ." },
  { id: "2corinthians32", question: "God reconciled us to Himself through?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "2 Corinthians 5:18", explanation: "Reconciliation." },
  { id: "2corinthians33", question: "Believers are ambassadors for?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Christ" }, { label: "C", text: "God" }, { label: "D", text: "The kingdom" }], correctAnswer: "B", verse: "2 Corinthians 5:20", explanation: "Representing Christ." },
  { id: "2corinthians34", question: "God made Him who knew no sin to?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Be sin for us" }, { label: "C", text: "Teach" }, { label: "D", text: "Reign" }], correctAnswer: "B", verse: "2 Corinthians 5:21", explanation: "Great exchange." },
  { id: "2corinthians35", question: "Now is the day of?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Salvation" }, { label: "C", text: "Grace" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Corinthians 6:2", explanation: "Urgency." },
  { id: "2corinthians36", question: "Paul describes hardships including?", options: [{ label: "A", text: "Comfort" }, { label: "B", text: "Imprisonments" }, { label: "C", text: "Joy" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "2 Corinthians 6:4-5", explanation: "Suffering ministry." },
  { id: "2corinthians37", question: "Believers are called to be?", options: [{ label: "A", text: "Separate" }, { label: "B", text: "United with unbelievers" }, { label: "C", text: "Silent" }, { label: "D", text: "Hidden" }], correctAnswer: "A", verse: "2 Corinthians 6:17", explanation: "Holiness call." },
  { id: "2corinthians38", question: "What has no partnership with darkness?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Light" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Corinthians 6:14", explanation: "Spiritual contrast." },
  { id: "2corinthians39", question: "Believers are the temple of?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "The living God" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 6:16", explanation: "God's dwelling." },
  { id: "2corinthians40", question: "God promises to be a?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Father" }, { label: "C", text: "King" }, { label: "D", text: "Shepherd" }], correctAnswer: "B", verse: "2 Corinthians 6:18", explanation: "Relational promise." },
  { id: "2corinthians41", question: "What leads to repentance?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Godly sorrow" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "2 Corinthians 7:10", explanation: "Healthy sorrow." },
  { id: "2corinthians42", question: "Worldly sorrow leads to?", options: [{ label: "A", text: "Repentance" }, { label: "B", text: "Death" }, { label: "C", text: "Fear" }, { label: "D", text: "Condemnation" }], correctAnswer: "B", verse: "2 Corinthians 7:10", explanation: "Destructive sorrow." },
  { id: "2corinthians43", question: "Who brought Paul comfort?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Titus" }, { label: "C", text: "Barnabas" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "2 Corinthians 7:6", explanation: "Encouraging report." },
  { id: "2corinthians44", question: "The Corinthians responded with?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Obedience" }, { label: "C", text: "Repentance" }, { label: "D", text: "Joy" }], correctAnswer: "C", verse: "2 Corinthians 7:9", explanation: "Godly response." },
  { id: "2corinthians45", question: "Which churches are praised for generosity?", options: [{ label: "A", text: "Corinthian" }, { label: "B", text: "Macedonian" }, { label: "C", text: "Roman" }, { label: "D", text: "Galatian" }], correctAnswer: "B", verse: "2 Corinthians 8:1-2", explanation: "Joyful giving." },
  { id: "2corinthians46", question: "Giving should be according to?", options: [{ label: "A", text: "Need" }, { label: "B", text: "What one has" }, { label: "C", text: "Obligation" }, { label: "D", text: "Command" }], correctAnswer: "B", verse: "2 Corinthians 8:12", explanation: "Proportional giving." },
  { id: "2corinthians47", question: "Christ became poor so that?", options: [{ label: "A", text: "He could suffer" }, { label: "B", text: "We might become rich" }, { label: "C", text: "We could serve" }, { label: "D", text: "He could save" }], correctAnswer: "B", verse: "2 Corinthians 8:9", explanation: "Grace-filled exchange." },
  { id: "2corinthians48", question: "God loves a cheerful?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Giver" }, { label: "C", text: "Heart" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "2 Corinthians 9:7", explanation: "Joyful generosity." },
  { id: "2corinthians49", question: "God is able to make all?", options: [{ label: "A", text: "Things new" }, { label: "B", text: "Grace abound" }, { label: "C", text: "Faith strong" }, { label: "D", text: "Works prosper" }], correctAnswer: "B", verse: "2 Corinthians 9:8", explanation: "Abundant grace." },
  { id: "2corinthians50", question: "Giving results in?", options: [{ label: "A", text: "Blessings" }, { label: "B", text: "Thanksgiving to God" }, { label: "C", text: "Honor" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "2 Corinthians 9:11-12", explanation: "Glory to God." },
  { id: "2corinthians51", question: "Paul's weapons are not?", options: [{ label: "A", text: "Effective" }, { label: "B", text: "Of the world" }, { label: "C", text: "Powerful" }, { label: "D", text: "Spiritual" }], correctAnswer: "B", verse: "2 Corinthians 10:4", explanation: "Spiritual warfare." },
  { id: "2corinthians52", question: "These weapons demolish?", options: [{ label: "A", text: "Strongholds" }, { label: "B", text: "Walls" }, { label: "C", text: "Enemies" }, { label: "D", text: "Fear" }], correctAnswer: "A", verse: "2 Corinthians 10:4", explanation: "Spiritual victory." },
  { id: "2corinthians53", question: "Paul boasts in?", options: [{ label: "A", text: "Power" }, { label: "B", text: "The Lord" }, { label: "C", text: "Achievements" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Corinthians 10:17", explanation: "God-centered boasting." },
  { id: "2corinthians54", question: "Paul fears the church may be led astray like?", options: [{ label: "A", text: "Adam" }, { label: "B", text: "Eve" }, { label: "C", text: "Israel" }, { label: "D", text: "Cain" }], correctAnswer: "B", verse: "2 Corinthians 11:3", explanation: "Deception warning." },
  { id: "2corinthians55", question: "Satan masquerades as an?", options: [{ label: "A", text: "Angel of light" }, { label: "B", text: "Apostle" }, { label: "C", text: "Teacher" }, { label: "D", text: "Prophet" }], correctAnswer: "A", verse: "2 Corinthians 11:14", explanation: "False appearance." },
  { id: "2corinthians56", question: "Paul boasts in his?", options: [{ label: "A", text: "Success" }, { label: "B", text: "Weaknesses" }, { label: "C", text: "Faith" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Corinthians 11:30", explanation: "Strength in weakness." },
  { id: "2corinthians57", question: "Paul was caught up to the?", options: [{ label: "A", text: "Second heaven" }, { label: "B", text: "Third heaven" }, { label: "C", text: "Presence of God" }, { label: "D", text: "Spirit realm" }], correctAnswer: "B", verse: "2 Corinthians 12:2", explanation: "Heavenly vision." },
  { id: "2corinthians58", question: "Paul received a thorn in the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Flesh" }, { label: "C", text: "Body" }, { label: "D", text: "Mind" }], correctAnswer: "B", verse: "2 Corinthians 12:7", explanation: "Humbling weakness." },
  { id: "2corinthians59", question: "Paul asked for its removal how many times?", options: [{ label: "A", text: "Once" }, { label: "B", text: "Three times" }, { label: "C", text: "Seven times" }, { label: "D", text: "Many times" }], correctAnswer: "B", verse: "2 Corinthians 12:8", explanation: "Persistent prayer." },
  { id: "2corinthians60", question: "God's grace is sufficient because His power is made perfect in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Weakness" }, { label: "C", text: "Strength" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "2 Corinthians 12:9", explanation: "Strength through weakness." },
  { id: "2corinthians61", question: "Paul delights in?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Weaknesses" }, { label: "C", text: "Success" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Corinthians 12:10", explanation: "Christ's power rests on him." },
  { id: "2corinthians62", question: "When Paul is weak, he is?", options: [{ label: "A", text: "Defeated" }, { label: "B", text: "Strong" }, { label: "C", text: "Faithful" }, { label: "D", text: "Patient" }], correctAnswer: "B", verse: "2 Corinthians 12:10", explanation: "Paradox of strength." },
  { id: "2corinthians63", question: "Paul says signs of an apostle include?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Signs and wonders" }, { label: "C", text: "Authority" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 12:12", explanation: "Apostolic validation." },
  { id: "2corinthians64", question: "Paul seeks not their possessions but?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Them" }, { label: "C", text: "Support" }, { label: "D", text: "Respect" }], correctAnswer: "B", verse: "2 Corinthians 12:14", explanation: "Pastoral love." },
  { id: "2corinthians65", question: "Children should not save up for?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Their parents" }, { label: "C", text: "The poor" }, { label: "D", text: "The future" }], correctAnswer: "B", verse: "2 Corinthians 12:14", explanation: "Family principle." },
  { id: "2corinthians66", question: "Paul fears he may find?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Quarreling and jealousy" }, { label: "C", text: "Peace" }, { label: "D", text: "Growth" }], correctAnswer: "B", verse: "2 Corinthians 12:20", explanation: "Concern for unity." },
  { id: "2corinthians67", question: "Paul warns he will not spare those who?", options: [{ label: "A", text: "Question him" }, { label: "B", text: "Persist in sin" }, { label: "C", text: "Doubt" }, { label: "D", text: "Disagree" }], correctAnswer: "B", verse: "2 Corinthians 13:2", explanation: "Call to repentance." },
  { id: "2corinthians68", question: "Believers are told to examine?", options: [{ label: "A", text: "Their works" }, { label: "B", text: "Themselves" }, { label: "C", text: "Others" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 13:5", explanation: "Self-examination." },
  { id: "2corinthians69", question: "Christ lives in you unless?", options: [{ label: "A", text: "You fail the test" }, { label: "B", text: "You sin" }, { label: "C", text: "You doubt" }, { label: "D", text: "You fear" }], correctAnswer: "A", verse: "2 Corinthians 13:5", explanation: "Authentic faith." },
  { id: "2corinthians70", question: "Paul prays they will do?", options: [{ label: "A", text: "Good" }, { label: "B", text: "What is right" }, { label: "C", text: "Believe" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "2 Corinthians 13:7", explanation: "Spiritual maturity." },
  { id: "2corinthians71", question: "Paul rejoices when he is?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Weak and they are strong" }, { label: "C", text: "Praised" }, { label: "D", text: "Honored" }], correctAnswer: "B", verse: "2 Corinthians 13:9", explanation: "Selfless leadership." },
  { id: "2corinthians72", question: "Paul writes to avoid being?", options: [{ label: "A", text: "Judged" }, { label: "B", text: "Harsh when present" }, { label: "C", text: "Rejected" }, { label: "D", text: "Misunderstood" }], correctAnswer: "B", verse: "2 Corinthians 13:10", explanation: "Purpose of correction." },
  { id: "2corinthians73", question: "Final exhortation includes?", options: [{ label: "A", text: "Be joyful" }, { label: "B", text: "Aim for restoration" }, { label: "C", text: "Be silent" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "2 Corinthians 13:11", explanation: "Healing community." },
  { id: "2corinthians74", question: "Believers are encouraged to?", options: [{ label: "A", text: "Argue" }, { label: "B", text: "Live in peace" }, { label: "C", text: "Separate" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "2 Corinthians 13:11", explanation: "Unity and peace." },
  { id: "2corinthians75", question: "Paul instructs them to greet one another with?", options: [{ label: "A", text: "Handshake" }, { label: "B", text: "Holy kiss" }, { label: "C", text: "Blessing" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "2 Corinthians 13:12", explanation: "Cultural greeting." },
  { id: "2corinthians76", question: "Who sends greetings?", options: [{ label: "A", text: "The apostles" }, { label: "B", text: "All the saints" }, { label: "C", text: "Church leaders" }, { label: "D", text: "Paul alone" }], correctAnswer: "B", verse: "2 Corinthians 13:13", explanation: "Unity of believers." },
  { id: "2corinthians77", question: "Which three are mentioned together in the blessing?", options: [{ label: "A", text: "Faith, hope, love" }, { label: "B", text: "Father, Son, Spirit" }, { label: "C", text: "Grace, love, fellowship" }, { label: "D", text: "Law, grace, faith" }], correctAnswer: "C", verse: "2 Corinthians 13:14", explanation: "Trinitarian blessing." },
  { id: "2corinthians78", question: "Grace is from whom?", options: [{ label: "A", text: "God the Father" }, { label: "B", text: "The Lord Jesus Christ" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "2 Corinthians 13:14", explanation: "Christ's grace." },
  { id: "2corinthians79", question: "Love is from?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "Spirit" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "2 Corinthians 13:14", explanation: "God's love." },
  { id: "2corinthians80", question: "Fellowship is with?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "The Holy Spirit" }, { label: "C", text: "Christ" }, { label: "D", text: "God" }], correctAnswer: "B", verse: "2 Corinthians 13:14", explanation: "Spirit's presence." },
  { id: "2corinthians81", question: "What theme dominates 2 Corinthians?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Strength in weakness" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "2 Corinthians 1-13", explanation: "God's power in weakness." },
  { id: "2corinthians82", question: "Paul defends his?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Apostleship" }, { label: "C", text: "Teaching" }, { label: "D", text: "Character" }], correctAnswer: "B", verse: "2 Corinthians 10-13", explanation: "Legitimacy questioned." },
  { id: "2corinthians83", question: "True ministry is marked by?", options: [{ label: "A", text: "Success" }, { label: "B", text: "Suffering and faithfulness" }, { label: "C", text: "Power" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Corinthians 4-6", explanation: "Faithful endurance." },
  { id: "2corinthians84", question: "God's power is shown through?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Weakness" }, { label: "C", text: "Strength" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Corinthians 12:9", explanation: "Core message." },
  { id: "2corinthians85", question: "Believers are reconciled to?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "The church" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "2 Corinthians 5:18", explanation: "Restored relationship." },
  { id: "2corinthians86", question: "Believers are entrusted with the message of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Reconciliation" }, { label: "C", text: "Grace" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "2 Corinthians 5:19", explanation: "Gospel mission." },
  { id: "2corinthians87", question: "Paul urges believers not to receive grace in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Vain" }, { label: "C", text: "Sin" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "2 Corinthians 6:1", explanation: "Grace must be lived out." },
  { id: "2corinthians88", question: "God's promises are?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "Yes in Christ" }, { label: "C", text: "Uncertain" }, { label: "D", text: "Delayed" }], correctAnswer: "B", verse: "2 Corinthians 1:20", explanation: "Certainty in Christ." },
  { id: "2corinthians89", question: "God anointed us and set His?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Seal" }, { label: "C", text: "Spirit" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "2 Corinthians 1:22", explanation: "Ownership and security." },
  { id: "2corinthians90", question: "The Spirit is a deposit guaranteeing?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "What is to come" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Corinthians 1:22", explanation: "Future inheritance." },
  { id: "2corinthians91", question: "Paul speaks plainly, not with?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Cunning" }, { label: "C", text: "Deception" }, { label: "D", text: "Worldly wisdom" }], correctAnswer: "D", verse: "2 Corinthians 1:12", explanation: "Integrity." },
  { id: "2corinthians92", question: "Believers walk by faith, not by?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Sight" }, { label: "C", text: "Law" }, { label: "D", text: "Feeling" }], correctAnswer: "B", verse: "2 Corinthians 5:7", explanation: "Faith-based living." },
  { id: "2corinthians93", question: "Paul urges generosity without?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Reluctance" }, { label: "C", text: "Planning" }, { label: "D", text: "Purpose" }], correctAnswer: "B", verse: "2 Corinthians 9:7", explanation: "Willing hearts." },
  { id: "2corinthians94", question: "God supplies seed to?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "The sower" }, { label: "C", text: "The church" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "2 Corinthians 9:10", explanation: "God provides." },
  { id: "2corinthians95", question: "The ministry of the Spirit is one of?", options: [{ label: "A", text: "Condemnation" }, { label: "B", text: "Glory" }, { label: "C", text: "Law" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "2 Corinthians 3:8", explanation: "Surpassing glory." },
  { id: "2corinthians96", question: "Believers reflect the Lord's glory with?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Unveiled faces" }, { label: "C", text: "Boldness" }, { label: "D", text: "Humility" }], correctAnswer: "B", verse: "2 Corinthians 3:18", explanation: "Open transformation." },
  { id: "2corinthians97", question: "Paul's ministry aims to commend?", options: [{ label: "A", text: "Himself" }, { label: "B", text: "The truth" }, { label: "C", text: "The gospel" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Corinthians 4:2", explanation: "Gospel-centered." },
  { id: "2corinthians98", question: "Suffering produces an eternal?", options: [{ label: "A", text: "Reward" }, { label: "B", text: "Glory" }, { label: "C", text: "Hope" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Corinthians 4:17", explanation: "Eternal perspective." },
  { id: "2corinthians99", question: "Paul's joy is complete when?", options: [{ label: "A", text: "He is honored" }, { label: "B", text: "The church walks in truth" }, { label: "C", text: "They repent" }, { label: "D", text: "They obey" }], correctAnswer: "C", verse: "2 Corinthians 7:9", explanation: "Repentance restores joy." },
  { id: "2corinthians100", question: "The final blessing emphasizes?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Grace, love, and fellowship" }, { label: "C", text: "Faith and hope" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "2 Corinthians 13:14", explanation: "Trinitarian blessing." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondCorinthiansTriviaPage() {
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
          .eq("book", "2corinthians");

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
          book: "2corinthians",
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
            book: "2corinthians",
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
    if (score === 10) return "Perfect! You're a 2 Corinthians expert!";
    if (score >= 8) return "Excellent! You know 2 Corinthians well!";
    if (score >= 6) return "Good job! Keep studying 2 Corinthians!";
    if (score >= 4) return "Nice try! 2 Corinthians has much to explore!";
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
              href="/bible-trivia/2-corinthians"
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

