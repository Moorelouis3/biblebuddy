"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

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
  { id: "titus1", question: "Who wrote the book of Titus?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "Titus 1:1", explanation: "Paul identifies himself as the author." },
  { id: "titus2", question: "To whom is the book of Titus written?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Silas" }, { label: "C", text: "Titus" }, { label: "D", text: "Luke" }], correctAnswer: "C", verse: "Titus 1:4", explanation: "Titus was Paul's trusted coworker." },
  { id: "titus3", question: "Paul describes Titus as his true son in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "Titus 1:4", explanation: "Spiritual relationship." },
  { id: "titus4", question: "Paul left Titus in Crete to?", options: [{ label: "A", text: "Evangelize" }, { label: "B", text: "Appoint elders" }, { label: "C", text: "Teach doctrine" }, { label: "D", text: "Correct believers" }], correctAnswer: "B", verse: "Titus 1:5", explanation: "Church leadership structure." },
  { id: "titus5", question: "Elders must be blameless and faithful to their?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Children" }, { label: "C", text: "Wife" }, { label: "D", text: "Church" }], correctAnswer: "C", verse: "Titus 1:6", explanation: "Moral integrity." },
  { id: "titus6", question: "An elder must not be overbearing, quick-tempered, or given to?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Wine" }, { label: "C", text: "Pride" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Titus 1:7", explanation: "Self-control." },
  { id: "titus7", question: "An elder must hold firmly to the trustworthy message as it has been?", options: [{ label: "A", text: "Taught" }, { label: "B", text: "Written" }, { label: "C", text: "Delivered" }, { label: "D", text: "Received" }], correctAnswer: "A", verse: "Titus 1:9", explanation: "Sound doctrine." },
  { id: "titus8", question: "Elders are to encourage others by sound doctrine and refute those who?", options: [{ label: "A", text: "Oppose it" }, { label: "B", text: "Reject it" }, { label: "C", text: "Question it" }, { label: "D", text: "Ignore it" }], correctAnswer: "A", verse: "Titus 1:9", explanation: "Defending truth." },
  { id: "titus9", question: "Paul says there are many rebellious people, especially those of the?", options: [{ label: "A", text: "Gentiles" }, { label: "B", text: "Circumcision group" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Sadducees" }], correctAnswer: "B", verse: "Titus 1:10", explanation: "False teachers." },
  { id: "titus10", question: "False teachers were upsetting whole families by teaching things they should not for the sake of dishonest?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Influence" }, { label: "C", text: "Gain" }, { label: "D", text: "Control" }], correctAnswer: "C", verse: "Titus 1:11", explanation: "Wrong motives." },
  { id: "titus11", question: "A Cretan prophet said, 'Cretans are always liars, evil brutes, lazy gluttons.' Paul says this saying is?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Accurate" }, { label: "C", text: "Unfair" }, { label: "D", text: "False" }], correctAnswer: "B", verse: "Titus 1:12-13", explanation: "Cultural rebuke." },
  { id: "titus12", question: "Titus is told to rebuke them sharply so they will be?", options: [{ label: "A", text: "Corrected" }, { label: "B", text: "Disciplined" }, { label: "C", text: "Sound in the faith" }, { label: "D", text: "Restored" }], correctAnswer: "C", verse: "Titus 1:13", explanation: "Purpose of correction." },
  { id: "titus13", question: "Paul warns against paying attention to Jewish myths or commands of people who reject the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "Titus 1:14", explanation: "Reject false teaching." },
  { id: "titus14", question: "To the pure, all things are?", options: [{ label: "A", text: "Clean" }, { label: "B", text: "Holy" }, { label: "C", text: "Good" }, { label: "D", text: "Right" }], correctAnswer: "A", verse: "Titus 1:15", explanation: "Inner purity." },
  { id: "titus15", question: "Those who are corrupted do not believe anything is pure because both their minds and consciences are?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Defiled" }, { label: "C", text: "Hardened" }, { label: "D", text: "Seared" }], correctAnswer: "B", verse: "Titus 1:15", explanation: "Corrupted hearts." },
  { id: "titus16", question: "They claim to know God, but by their actions they?", options: [{ label: "A", text: "Disobey Him" }, { label: "B", text: "Reject Him" }, { label: "C", text: "Ignore Him" }, { label: "D", text: "Question Him" }], correctAnswer: "B", verse: "Titus 1:16", explanation: "Hypocrisy." },
  { id: "titus17", question: "Paul says such people are detestable, disobedient, and unfit for doing anything?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "Good" }, { label: "C", text: "Right" }, { label: "D", text: "Faithful" }], correctAnswer: "B", verse: "Titus 1:16", explanation: "Lack of fruit." },
  { id: "titus18", question: "Titus is instructed to teach what is in accord with?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Sound doctrine" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "Titus 2:1", explanation: "Healthy teaching." },
  { id: "titus19", question: "Older men are to be temperate, worthy of respect, self-controlled, and sound in faith, love, and?", options: [{ label: "A", text: "Patience" }, { label: "B", text: "Endurance" }, { label: "C", text: "Hope" }, { label: "D", text: "Purity" }], correctAnswer: "B", verse: "Titus 2:2", explanation: "Mature faith." },
  { id: "titus20", question: "Older women are to be reverent in the way they live, not slanderers or addicted to much?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Wine" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Comfort" }], correctAnswer: "B", verse: "Titus 2:3", explanation: "Godly conduct." },
  { id: "titus21", question: "Older women are to teach what is good so they can urge younger women to love their husbands and?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Children" }, { label: "C", text: "Homes" }, { label: "D", text: "Families" }], correctAnswer: "B", verse: "Titus 2:4", explanation: "Family discipleship." },
  { id: "titus22", question: "Young women are encouraged to be self-controlled and pure, busy at home, kind, and subject to their?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Parents" }, { label: "C", text: "Husbands" }, { label: "D", text: "Families" }], correctAnswer: "C", verse: "Titus 2:5", explanation: "Godly order." },
  { id: "titus23", question: "Young men are urged to be?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Faithful" }, { label: "C", text: "Self-controlled" }, { label: "D", text: "Bold" }], correctAnswer: "C", verse: "Titus 2:6", explanation: "Personal discipline." },
  { id: "titus24", question: "Titus himself is to set an example by doing what is?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "True" }, { label: "C", text: "Good" }, { label: "D", text: "Right" }], correctAnswer: "C", verse: "Titus 2:7", explanation: "Leadership by example." },
  { id: "titus25", question: "Teaching must show integrity, seriousness, and soundness of speech that cannot be?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Condemned" }, { label: "C", text: "Challenged" }, { label: "D", text: "Questioned" }], correctAnswer: "B", verse: "Titus 2:8", explanation: "Credible doctrine." },
  { id: "titus26", question: "Slaves are urged to be subject to their masters and try to please them in every way, not talking?", options: [{ label: "A", text: "Back" }, { label: "B", text: "Badly" }, { label: "C", text: "Against them" }, { label: "D", text: "Disrespectfully" }], correctAnswer: "A", verse: "Titus 2:9", explanation: "Respectful conduct." },
  { id: "titus27", question: "Slaves should show that they can be fully trusted so that in every way they will make the teaching about God our Savior?", options: [{ label: "A", text: "Known" }, { label: "B", text: "Honored" }, { label: "C", text: "Attractive" }, { label: "D", text: "Respected" }], correctAnswer: "C", verse: "Titus 2:10", explanation: "Living testimony." },
  { id: "titus28", question: "The grace of God has appeared that offers salvation to?", options: [{ label: "A", text: "The elect" }, { label: "B", text: "Believers" }, { label: "C", text: "All people" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "Titus 2:11", explanation: "Universal offer." },
  { id: "titus29", question: "Grace teaches believers to say 'No' to ungodliness and worldly passions and to live self-controlled, upright, and godly lives in this?", options: [{ label: "A", text: "World" }, { label: "B", text: "Age" }, { label: "C", text: "Time" }, { label: "D", text: "Life" }], correctAnswer: "B", verse: "Titus 2:12", explanation: "Present age." },
  { id: "titus30", question: "Believers are to live this way while waiting for the blessed hope-the appearing of the glory of our great God and Savior?", options: [{ label: "A", text: "Jesus Christ" }, { label: "B", text: "The Lord" }, { label: "C", text: "The Messiah" }, { label: "D", text: "God" }], correctAnswer: "A", verse: "Titus 2:13", explanation: "Hope of Christ's return." },
  { id: "titus31", question: "Jesus gave Himself to redeem us from all wickedness and to purify for Himself a people eager to do what is?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "Right" }, { label: "C", text: "Good" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "Titus 2:14", explanation: "Redemption leads to good works." },
  { id: "titus32", question: "Titus is instructed to encourage and rebuke with all?", options: [{ label: "A", text: "Patience" }, { label: "B", text: "Gentleness" }, { label: "C", text: "Authority" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "Titus 2:15", explanation: "Pastoral authority." },
  { id: "titus33", question: "Believers are to be subject to rulers and authorities and ready to do every?", options: [{ label: "A", text: "Lawful act" }, { label: "B", text: "Right thing" }, { label: "C", text: "Good work" }, { label: "D", text: "Faithful duty" }], correctAnswer: "C", verse: "Titus 3:1", explanation: "Public obedience." },
  { id: "titus34", question: "Believers are told to slander no one and to be peaceable and?", options: [{ label: "A", text: "Patient" }, { label: "B", text: "Gentle" }, { label: "C", text: "Humble" }, { label: "D", text: "Kind" }], correctAnswer: "C", verse: "Titus 3:2", explanation: "Christlike humility." },
  { id: "titus35", question: "Paul reminds believers they were once foolish, disobedient, deceived, and enslaved by passions and?", options: [{ label: "A", text: "Desires" }, { label: "B", text: "Pleasures" }, { label: "C", text: "Sins" }, { label: "D", text: "Habits" }], correctAnswer: "B", verse: "Titus 3:3", explanation: "Life before Christ." },
  { id: "titus36", question: "God saved us not because of righteous things we had done but because of His?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Love" }, { label: "C", text: "Mercy" }, { label: "D", text: "Faithfulness" }], correctAnswer: "C", verse: "Titus 3:5", explanation: "Salvation by mercy." },
  { id: "titus37", question: "God saved us through the washing of rebirth and renewal by the?", options: [{ label: "A", text: "Word" }, { label: "B", text: "Spirit" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Titus 3:5", explanation: "Work of the Holy Spirit." },
  { id: "titus38", question: "The Holy Spirit was poured out on believers generously through?", options: [{ label: "A", text: "God" }, { label: "B", text: "Grace" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Titus 3:6", explanation: "Salvation through Christ." },
  { id: "titus39", question: "Being justified by grace, believers become heirs having the hope of?", options: [{ label: "A", text: "Glory" }, { label: "B", text: "Salvation" }, { label: "C", text: "Righteousness" }, { label: "D", text: "Eternal life" }], correctAnswer: "D", verse: "Titus 3:7", explanation: "Future inheritance." },
  { id: "titus40", question: "Paul says this message is trustworthy and insists believers devote themselves to doing what is?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "Faithful" }, { label: "C", text: "Good" }, { label: "D", text: "Right" }], correctAnswer: "C", verse: "Titus 3:8", explanation: "Good works matter." },
  { id: "titus41", question: "Believers are warned to avoid foolish controversies, genealogies, and arguments about the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Church" }], correctAnswer: "A", verse: "Titus 3:9", explanation: "Avoid divisive disputes." },
  { id: "titus42", question: "Such controversies are described as unprofitable and?", options: [{ label: "A", text: "Harmful" }, { label: "B", text: "Useless" }, { label: "C", text: "Dangerous" }, { label: "D", text: "Empty" }], correctAnswer: "B", verse: "Titus 3:9", explanation: "No spiritual value." },
  { id: "titus43", question: "A divisive person should be warned how many times before being rejected?", options: [{ label: "A", text: "Once" }, { label: "B", text: "Twice" }, { label: "C", text: "Three times" }, { label: "D", text: "Four times" }], correctAnswer: "B", verse: "Titus 3:10", explanation: "Measured discipline." },
  { id: "titus44", question: "Such a person is warped, sinful, and?", options: [{ label: "A", text: "Condemned" }, { label: "B", text: "Lost" }, { label: "C", text: "Self-condemned" }, { label: "D", text: "Deceived" }], correctAnswer: "C", verse: "Titus 3:11", explanation: "Self-inflicted judgment." },
  { id: "titus45", question: "Paul plans to send either Artemas or?", options: [{ label: "A", text: "Tychicus" }, { label: "B", text: "Zenas" }, { label: "C", text: "Apollos" }, { label: "D", text: "Titus" }], correctAnswer: "A", verse: "Titus 3:12", explanation: "Ministry planning." },
  { id: "titus46", question: "Titus is urged to meet Paul at?", options: [{ label: "A", text: "Rome" }, { label: "B", text: "Ephesus" }, { label: "C", text: "Nicopolis" }, { label: "D", text: "Crete" }], correctAnswer: "C", verse: "Titus 3:12", explanation: "Mission location." },
  { id: "titus47", question: "Paul intended to spend the?", options: [{ label: "A", text: "Winter" }, { label: "B", text: "Summer" }, { label: "C", text: "Spring" }, { label: "D", text: "Fall" }], correctAnswer: "A", verse: "Titus 3:12", explanation: "Seasonal travel." },
  { id: "titus48", question: "Paul instructs Titus to help Zenas the lawyer and?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Luke" }, { label: "C", text: "Apollos" }, { label: "D", text: "Barnabas" }], correctAnswer: "C", verse: "Titus 3:13", explanation: "Supporting ministry." },
  { id: "titus49", question: "Believers should learn to devote themselves to good works to provide for urgent needs and not live?", options: [{ label: "A", text: "Selfishly" }, { label: "B", text: "Carelessly" }, { label: "C", text: "Unproductively" }, { label: "D", text: "Faithlessly" }], correctAnswer: "C", verse: "Titus 3:14", explanation: "Productive faith." },
  { id: "titus50", question: "Paul sends greetings from everyone with him and asks Titus to greet those who love them in the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Lord" }], correctAnswer: "B", verse: "Titus 3:15", explanation: "Shared faith." },
  { id: "titus51", question: "Paul closes the letter by saying grace be with?", options: [{ label: "A", text: "You" }, { label: "B", text: "Everyone" }, { label: "C", text: "You all" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "Titus 3:15", explanation: "Grace-filled ending." },
  { id: "titus52", question: "A main theme of Titus is?", options: [{ label: "A", text: "Faith alone" }, { label: "B", text: "Church order" }, { label: "C", text: "Good works flowing from grace" }, { label: "D", text: "Spiritual gifts" }], correctAnswer: "C", verse: "Titus 2-3", explanation: "Grace produces action." },
  { id: "titus53", question: "Titus emphasizes leadership that is morally?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Blameless" }, { label: "C", text: "Charismatic" }, { label: "D", text: "Experienced" }], correctAnswer: "B", verse: "Titus 1:6-9", explanation: "Character matters." },
  { id: "titus54", question: "False teachers in Crete were especially focused on?", options: [{ label: "A", text: "Greek myths" }, { label: "B", text: "Jewish myths" }, { label: "C", text: "Roman law" }, { label: "D", text: "Philosophy" }], correctAnswer: "B", verse: "Titus 1:14", explanation: "False traditions." },
  { id: "titus55", question: "Sound doctrine in Titus is meant to produce lives that make God's teaching?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Clear" }, { label: "C", text: "Attractive" }, { label: "D", text: "Convincing" }], correctAnswer: "C", verse: "Titus 2:10", explanation: "Visible testimony." },
  { id: "titus56", question: "Paul links salvation directly to God's kindness, love, and?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Mercy" }, { label: "C", text: "Power" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Titus 3:4-5", explanation: "God's mercy saves." },
  { id: "titus57", question: "The book of Titus stresses discipline in doctrine and?", options: [{ label: "A", text: "Practice" }, { label: "B", text: "Faith" }, { label: "C", text: "Leadership" }, { label: "D", text: "Speech" }], correctAnswer: "A", verse: "Titus 2", explanation: "Belief shapes behavior." },
  { id: "titus58", question: "Titus is often grouped with which letters?", options: [{ label: "A", text: "Prison Epistles" }, { label: "B", text: "General Epistles" }, { label: "C", text: "Pastoral Epistles" }, { label: "D", text: "Catholic Epistles" }], correctAnswer: "C", verse: "Titus 1-3", explanation: "Pastoral guidance." },
  { id: "titus59", question: "The pastoral epistles focus heavily on church leadership and?", options: [{ label: "A", text: "Order" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Discipline" }, { label: "D", text: "Unity" }], correctAnswer: "A", verse: "Titus 1-2", explanation: "Healthy churches." },
  { id: "titus60", question: "The lasting message of Titus is that salvation by grace should result in lives full of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Good works" }, { label: "D", text: "Obedience" }], correctAnswer: "C", verse: "Titus 3:8", explanation: "Grace transforms living." },
  { id: "titus61", question: "Titus emphasizes leadership that is not overbearing but?", options: [{ label: "A", text: "Humble" }, { label: "B", text: "Gentle" }, { label: "C", text: "Self-controlled" }, { label: "D", text: "Patient" }], correctAnswer: "C", verse: "Titus 1:7", explanation: "Self-discipline in leaders." },
  { id: "titus62", question: "Elders must love what is?", options: [{ label: "A", text: "Right" }, { label: "B", text: "True" }, { label: "C", text: "Good" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "Titus 1:8", explanation: "Moral goodness." },
  { id: "titus63", question: "Paul highlights the importance of refuting those who contradict sound?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Truth" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Titus 1:9", explanation: "Defending truth." },
  { id: "titus64", question: "Paul describes false teachers as rebellious, deceptive, and?", options: [{ label: "A", text: "Dangerous" }, { label: "B", text: "Talkers" }, { label: "C", text: "Greedy" }, { label: "D", text: "Foolish" }], correctAnswer: "B", verse: "Titus 1:10", explanation: "Empty speech." },
  { id: "titus65", question: "False teachers must be silenced because they disrupt?", options: [{ label: "A", text: "Churches" }, { label: "B", text: "Families" }, { label: "C", text: "Communities" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "Titus 1:11", explanation: "Family harm." },
  { id: "titus66", question: "Paul uses a Cretan saying to emphasize cultural?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Problems" }, { label: "C", text: "Reputation" }, { label: "D", text: "Truth" }], correctAnswer: "D", verse: "Titus 1:12-13", explanation: "Truthful rebuke." },
  { id: "titus67", question: "Correction in Titus is aimed at restoring people to sound?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Faith" }, { label: "C", text: "Living" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Titus 1:13", explanation: "Restorative discipline." },
  { id: "titus68", question: "Paul warns against human commands that turn people away from the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Church" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Titus 1:14", explanation: "Reject human traditions." },
  { id: "titus69", question: "Titus teaches that inner purity affects how one sees the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Law" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "Titus 1:15", explanation: "Heart shapes perception." },
  { id: "titus70", question: "Paul emphasizes actions as evidence of?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Salvation" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "Titus 1:16", explanation: "Faith revealed by works." },
  { id: "titus71", question: "Sound teaching in Titus is designed to shape daily?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Behavior" }, { label: "C", text: "Faith" }, { label: "D", text: "Belief" }], correctAnswer: "B", verse: "Titus 2", explanation: "Doctrine meets life." },
  { id: "titus72", question: "Paul stresses respect and self-control across all?", options: [{ label: "A", text: "Ages" }, { label: "B", text: "Families" }, { label: "C", text: "Churches" }, { label: "D", text: "Cultures" }], correctAnswer: "A", verse: "Titus 2", explanation: "Generational discipleship." },
  { id: "titus73", question: "Titus is called to model integrity in teaching and?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Conduct" }, { label: "C", text: "Leadership" }, { label: "D", text: "Doctrine" }], correctAnswer: "B", verse: "Titus 2:7", explanation: "Example matters." },
  { id: "titus74", question: "Paul links the gospel with good conduct to silence?", options: [{ label: "A", text: "Accusations" }, { label: "B", text: "Critics" }, { label: "C", text: "Opposition" }, { label: "D", text: "Enemies" }], correctAnswer: "B", verse: "Titus 2:8", explanation: "Living witness." },
  { id: "titus75", question: "Grace trains believers to live upright lives while awaiting Christ's?", options: [{ label: "A", text: "Return" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Judgment" }, { label: "D", text: "Glory" }], correctAnswer: "A", verse: "Titus 2:13", explanation: "Future hope." },
  { id: "titus76", question: "Paul connects redemption with purification for God's?", options: [{ label: "A", text: "Service" }, { label: "B", text: "People" }, { label: "C", text: "Purpose" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "Titus 2:14", explanation: "Belonging to God." },
  { id: "titus77", question: "Believers are reminded to respect governing authorities as part of their?", options: [{ label: "A", text: "Witness" }, { label: "B", text: "Faith" }, { label: "C", text: "Duty" }, { label: "D", text: "Calling" }], correctAnswer: "A", verse: "Titus 3:1", explanation: "Public testimony." },
  { id: "titus78", question: "Paul contrasts believers' past lives with God's saving?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Mercy" }, { label: "C", text: "Grace" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Titus 3:5", explanation: "Mercy saves." },
  { id: "titus79", question: "Renewal in Titus is described as an ongoing work of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Word" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Titus 3:5", explanation: "Spirit-led renewal." },
  { id: "titus80", question: "Justification in Titus leads to hope rooted in?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Eternal life" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "Titus 3:7", explanation: "Future hope." },
  { id: "titus81", question: "Paul repeatedly stresses that good works should naturally follow?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Grace" }, { label: "D", text: "Salvation" }], correctAnswer: "D", verse: "Titus 3:8", explanation: "Saved to serve." },
  { id: "titus82", question: "Titus teaches believers to avoid arguments that distract from the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Mission" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Titus 3:9", explanation: "Focus on truth." },
  { id: "titus83", question: "Paul encourages firm action toward those causing division to protect the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Doctrine" }], correctAnswer: "A", verse: "Titus 3:10", explanation: "Church health." },
  { id: "titus84", question: "Paul's travel plans reflect the organized nature of early church?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Mission" }, { label: "C", text: "Structure" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Titus 3:12", explanation: "Mission strategy." },
  { id: "titus85", question: "Supporting fellow workers financially is encouraged as part of doing?", options: [{ label: "A", text: "Good works" }, { label: "B", text: "Faith" }, { label: "C", text: "Service" }, { label: "D", text: "Ministry" }], correctAnswer: "A", verse: "Titus 3:13-14", explanation: "Active generosity." },
  { id: "titus86", question: "Paul emphasizes productivity as evidence of a healthy?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Life" }, { label: "D", text: "Ministry" }], correctAnswer: "B", verse: "Titus 3:14", explanation: "Fruitful faith." },
  { id: "titus87", question: "The closing greetings in Titus highlight Christian?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Unity" }, { label: "C", text: "Community" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Titus 3:15", explanation: "Shared fellowship." },
  { id: "titus88", question: "Titus shows that leadership is rooted more in character than?", options: [{ label: "A", text: "Ability" }, { label: "B", text: "Experience" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Authority" }], correctAnswer: "A", verse: "Titus 1", explanation: "Character first." },
  { id: "titus89", question: "Paul's instructions in Titus are meant to strengthen churches in difficult?", options: [{ label: "A", text: "Times" }, { label: "B", text: "Cultures" }, { label: "C", text: "Regions" }, { label: "D", text: "Places" }], correctAnswer: "B", verse: "Titus 1", explanation: "Cultural challenges." },
  { id: "titus90", question: "Titus teaches that doctrine and daily life must remain?", options: [{ label: "A", text: "Balanced" }, { label: "B", text: "Connected" }, { label: "C", text: "Aligned" }, { label: "D", text: "Unified" }], correctAnswer: "C", verse: "Titus 2", explanation: "Truth lived out." },
  { id: "titus91", question: "Grace in Titus is both a gift and a?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Teacher" }, { label: "C", text: "Command" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Titus 2:11-12", explanation: "Grace instructs." },
  { id: "titus92", question: "The hope in Titus is tied directly to the appearing of?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Messiah" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "The Lord" }], correctAnswer: "C", verse: "Titus 2:13", explanation: "Second coming." },
  { id: "titus93", question: "Titus emphasizes that believers belong fully to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "God" }, { label: "C", text: "Christ" }, { label: "D", text: "The kingdom" }], correctAnswer: "C", verse: "Titus 2:14", explanation: "Redeemed people." },
  { id: "titus94", question: "Paul consistently connects salvation with transformation of?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Behavior" }, { label: "C", text: "Heart" }, { label: "D", text: "Life" }], correctAnswer: "D", verse: "Titus 3", explanation: "New life." },
  { id: "titus95", question: "The structure of Titus reflects concern for healthy?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Teaching" }, { label: "C", text: "Churches" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "Titus 1-3", explanation: "Church health." },
  { id: "titus96", question: "Paul stresses that believers should be known for what?", options: [{ label: "A", text: "They say" }, { label: "B", text: "They believe" }, { label: "C", text: "They do" }, { label: "D", text: "They teach" }], correctAnswer: "C", verse: "Titus 3:8", explanation: "Faith in action." },
  { id: "titus97", question: "Titus shows that strong doctrine protects the church from?", options: [{ label: "A", text: "Division" }, { label: "B", text: "Confusion" }, { label: "C", text: "False teaching" }, { label: "D", text: "Error" }], correctAnswer: "C", verse: "Titus 1", explanation: "Doctrinal defense." },
  { id: "titus98", question: "The pastoral tone of Titus highlights Paul's concern for spiritual?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Health" }, { label: "C", text: "Maturity" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Titus 1-3", explanation: "Healthy believers." },
  { id: "titus99", question: "The message of Titus balances grace with?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Obedience" }, { label: "C", text: "Works" }, { label: "D", text: "Faithfulness" }], correctAnswer: "C", verse: "Titus 2-3", explanation: "Grace produces works." },
  { id: "titus100", question: "The lasting takeaway from Titus is that sound doctrine produces lives marked by good works, godliness, and faithfulness to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The gospel" }, { label: "C", text: "Christ" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "Titus 3:8", explanation: "Faith lived out." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TitusTriviaPage() {
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
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "titus");

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
          book: "titus",
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
            book: "titus",
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
    if (score === 10) return "Perfect! You're a Titus expert!";
    if (score >= 8) return "Excellent! You know Titus well!";
    if (score >= 6) return "Good job! Keep studying Titus!";
    if (score >= 4) return "Nice try! Titus has much to explore!";
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
              href="/bible-trivia/titus"
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






