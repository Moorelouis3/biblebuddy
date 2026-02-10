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
  { id: "1timothy1", question: "Who wrote the book of 1 Timothy?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "1 Timothy 1:1", explanation: "Paul identifies himself as the author." },
  { id: "1timothy2", question: "To whom is 1 Timothy written?", options: [{ label: "A", text: "Titus" }, { label: "B", text: "Timothy" }, { label: "C", text: "Silas" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "1 Timothy 1:2", explanation: "Timothy was Paul's true son in the faith." },
  { id: "1timothy3", question: "Paul describes Timothy as his true son in the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Gospel" }, { label: "D", text: "Lord" }], correctAnswer: "B", verse: "1 Timothy 1:2", explanation: "Spiritual relationship." },
  { id: "1timothy4", question: "Paul urges Timothy to stay in Ephesus to command certain people not to teach?", options: [{ label: "A", text: "False doctrines" }, { label: "B", text: "Traditions" }, { label: "C", text: "Opinions" }, { label: "D", text: "Philosophies" }], correctAnswer: "A", verse: "1 Timothy 1:3", explanation: "Guarding doctrine." },
  { id: "1timothy5", question: "False teachers were devoting themselves to myths and endless?", options: [{ label: "A", text: "Questions" }, { label: "B", text: "Debates" }, { label: "C", text: "Genealogies" }, { label: "D", text: "Arguments" }], correctAnswer: "C", verse: "1 Timothy 1:4", explanation: "Distracting teachings." },
  { id: "1timothy6", question: "Such teachings promote controversies rather than God's work which is by?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Timothy 1:4", explanation: "Faith-centered work." },
  { id: "1timothy7", question: "The goal of Paul's command is love from a pure heart, a good conscience, and a sincere?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Mind" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "1 Timothy 1:5", explanation: "Right motivation." },
  { id: "1timothy8", question: "Some have departed from these and turned to?", options: [{ label: "A", text: "Falsehood" }, { label: "B", text: "Empty talk" }, { label: "C", text: "Debate" }, { label: "D", text: "Traditions" }], correctAnswer: "B", verse: "1 Timothy 1:6", explanation: "Fruitless discussion." },
  { id: "1timothy9", question: "They want to be teachers of the law but do not know what they are talking about or what they confidently?", options: [{ label: "A", text: "Claim" }, { label: "B", text: "Teach" }, { label: "C", text: "Believe" }, { label: "D", text: "Assert" }], correctAnswer: "D", verse: "1 Timothy 1:7", explanation: "False confidence." },
  { id: "1timothy10", question: "The law is good if one uses it?", options: [{ label: "A", text: "Carefully" }, { label: "B", text: "Faithfully" }, { label: "C", text: "Properly" }, { label: "D", text: "Correctly" }], correctAnswer: "C", verse: "1 Timothy 1:8", explanation: "Proper use of the law." },
  { id: "1timothy11", question: "The law is made for lawbreakers, rebels, the ungodly, and?", options: [{ label: "A", text: "Unfaithful" }, { label: "B", text: "Sinners" }, { label: "C", text: "Hypocrites" }, { label: "D", text: "Deceivers" }], correctAnswer: "B", verse: "1 Timothy 1:9", explanation: "Purpose of the law." },
  { id: "1timothy12", question: "Paul thanks Christ Jesus for giving him?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Strength" }, { label: "C", text: "Mercy" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Timothy 1:12", explanation: "Empowered ministry." },
  { id: "1timothy13", question: "Paul says he was formerly a blasphemer, persecutor, and a?", options: [{ label: "A", text: "Rebel" }, { label: "B", text: "Violent man" }, { label: "C", text: "Sinner" }, { label: "D", text: "Hypocrite" }], correctAnswer: "B", verse: "1 Timothy 1:13", explanation: "Past life." },
  { id: "1timothy14", question: "Paul received mercy because he acted in ignorance and?", options: [{ label: "A", text: "Unbelief" }, { label: "B", text: "Weakness" }, { label: "C", text: "Pride" }, { label: "D", text: "Fear" }], correctAnswer: "A", verse: "1 Timothy 1:13", explanation: "God's mercy." },
  { id: "1timothy15", question: "The grace of the Lord was poured out on Paul abundantly, along with faith and love that are in?", options: [{ label: "A", text: "God" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Timothy 1:14", explanation: "Grace in Christ." },
  { id: "1timothy16", question: "Christ Jesus came into the world to save?", options: [{ label: "A", text: "The lost" }, { label: "B", text: "Sinners" }, { label: "C", text: "The faithful" }, { label: "D", text: "The weak" }], correctAnswer: "B", verse: "1 Timothy 1:15", explanation: "Core gospel truth." },
  { id: "1timothy17", question: "Paul calls himself the worst of?", options: [{ label: "A", text: "Men" }, { label: "B", text: "Believers" }, { label: "C", text: "Sinners" }, { label: "D", text: "Persecutors" }], correctAnswer: "C", verse: "1 Timothy 1:15", explanation: "Humility." },
  { id: "1timothy18", question: "Paul received mercy so Christ Jesus might display His immense?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Grace" }, { label: "C", text: "Patience" }, { label: "D", text: "Power" }], correctAnswer: "C", verse: "1 Timothy 1:16", explanation: "Example of patience." },
  { id: "1timothy19", question: "Paul praises God as the King eternal, immortal, invisible, the only?", options: [{ label: "A", text: "Wise God" }, { label: "B", text: "True God" }, { label: "C", text: "Holy God" }, { label: "D", text: "Living God" }], correctAnswer: "A", verse: "1 Timothy 1:17", explanation: "Doxology." },
  { id: "1timothy20", question: "Paul entrusts Timothy with a charge to fight the?", options: [{ label: "A", text: "Faithful fight" }, { label: "B", text: "Good fight" }, { label: "C", text: "Spiritual fight" }, { label: "D", text: "True fight" }], correctAnswer: "B", verse: "1 Timothy 1:18", explanation: "Faithful perseverance." },
  { id: "1timothy21", question: "Timothy is to hold on to faith and a?", options: [{ label: "A", text: "Clear conscience" }, { label: "B", text: "Good conscience" }, { label: "C", text: "Pure conscience" }, { label: "D", text: "Strong conscience" }], correctAnswer: "B", verse: "1 Timothy 1:19", explanation: "Moral integrity." },
  { id: "1timothy22", question: "Some have rejected these and suffered shipwreck with regard to the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Gospel" }, { label: "D", text: "Church" }], correctAnswer: "A", verse: "1 Timothy 1:19", explanation: "Spiritual collapse." },
  { id: "1timothy23", question: "Paul mentions Hymenaeus and Alexander whom he handed over to?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Satan" }, { label: "C", text: "Discipline" }, { label: "D", text: "Correction" }], correctAnswer: "B", verse: "1 Timothy 1:20", explanation: "Severe discipline." },
  { id: "1timothy24", question: "Paul urges prayers to be made for?", options: [{ label: "A", text: "Believers only" }, { label: "B", text: "Church leaders" }, { label: "C", text: "All people" }, { label: "D", text: "The poor" }], correctAnswer: "C", verse: "1 Timothy 2:1", explanation: "Universal prayer." },
  { id: "1timothy25", question: "Paul mentions prayers, intercession, and?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Thanksgiving" }, { label: "C", text: "Worship" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "1 Timothy 2:1", explanation: "Grateful prayer." },
  { id: "1timothy26", question: "Prayer should be made for kings and all those in?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Authority" }, { label: "C", text: "Power" }, { label: "D", text: "Government" }], correctAnswer: "B", verse: "1 Timothy 2:2", explanation: "Orderly society." },
  { id: "1timothy27", question: "The goal is that believers may live peaceful and quiet lives in all godliness and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Holiness" }, { label: "C", text: "Dignity" }, { label: "D", text: "Purity" }], correctAnswer: "C", verse: "1 Timothy 2:2", explanation: "Respectable living." },
  { id: "1timothy28", question: "God wants all people to be saved and come to a knowledge of the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "1 Timothy 2:4", explanation: "God's desire." },
  { id: "1timothy29", question: "There is one God and one mediator between God and mankind, the man?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "Christ" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "The Lord" }], correctAnswer: "C", verse: "1 Timothy 2:5", explanation: "Exclusive mediator." },
  { id: "1timothy30", question: "Jesus gave Himself as a ransom for?", options: [{ label: "A", text: "Many" }, { label: "B", text: "Believers" }, { label: "C", text: "The church" }, { label: "D", text: "All people" }], correctAnswer: "D", verse: "1 Timothy 2:6", explanation: "Universal provision." },
  { id: "1timothy31", question: "Paul was appointed as a herald and an?", options: [{ label: "A", text: "Evangelist" }, { label: "B", text: "Apostle" }, { label: "C", text: "Teacher" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "1 Timothy 2:7", explanation: "Apostolic calling." },
  { id: "1timothy32", question: "Paul instructs men everywhere to pray, lifting up holy hands without anger or?", options: [{ label: "A", text: "Doubt" }, { label: "B", text: "Quarreling" }, { label: "C", text: "Fear" }, { label: "D", text: "Dispute" }], correctAnswer: "B", verse: "1 Timothy 2:8", explanation: "Peaceful prayer." },
  { id: "1timothy33", question: "Women are instructed to dress modestly with decency and?", options: [{ label: "A", text: "Self-control" }, { label: "B", text: "Humility" }, { label: "C", text: "Faith" }, { label: "D", text: "Wisdom" }], correctAnswer: "A", verse: "1 Timothy 2:9", explanation: "Modest conduct." },
  { id: "1timothy34", question: "Women should be adorned with good deeds appropriate for those who profess?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Godliness" }, { label: "C", text: "Truth" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "1 Timothy 2:10", explanation: "Godly lifestyle." },
  { id: "1timothy35", question: "A woman should learn in quietness and full?", options: [{ label: "A", text: "Humility" }, { label: "B", text: "Submission" }, { label: "C", text: "Obedience" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Timothy 2:11", explanation: "Order in teaching." },
  { id: "1timothy36", question: "Paul appeals to the order of creation beginning with?", options: [{ label: "A", text: "Eve" }, { label: "B", text: "Adam" }, { label: "C", text: "Man" }, { label: "D", text: "Woman" }], correctAnswer: "B", verse: "1 Timothy 2:13", explanation: "Creation order." },
  { id: "1timothy37", question: "Eve was deceived, not?", options: [{ label: "A", text: "Adam" }, { label: "B", text: "Man" }, { label: "C", text: "The serpent" }, { label: "D", text: "The woman" }], correctAnswer: "A", verse: "1 Timothy 2:14", explanation: "Genesis reference." },
  { id: "1timothy38", question: "Women will be saved through childbearing if they continue in faith, love, and?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Self-control" }, { label: "C", text: "Holiness" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "1 Timothy 2:15", explanation: "Persevering godliness." },
  { id: "1timothy39", question: "Whoever aspires to be an overseer desires a?", options: [{ label: "A", text: "Leadership role" }, { label: "B", text: "Noble task" }, { label: "C", text: "Spiritual office" }, { label: "D", text: "Church position" }], correctAnswer: "B", verse: "1 Timothy 3:1", explanation: "Honor of leadership." },
  { id: "1timothy40", question: "An overseer must be above reproach, faithful to his?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Family" }, { label: "C", text: "Wife" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "1 Timothy 3:2", explanation: "Moral integrity." },
  { id: "1timothy41", question: "An overseer must be temperate, self-controlled, respectable, hospitable, and able to?", options: [{ label: "A", text: "Lead" }, { label: "B", text: "Teach" }, { label: "C", text: "Serve" }, { label: "D", text: "Preach" }], correctAnswer: "B", verse: "1 Timothy 3:2", explanation: "Teaching ability." },
  { id: "1timothy42", question: "An overseer must not be given to drunkenness or be?", options: [{ label: "A", text: "Violent" }, { label: "B", text: "Proud" }, { label: "C", text: "Greedy" }, { label: "D", text: "Argumentative" }], correctAnswer: "A", verse: "1 Timothy 3:3", explanation: "Self-control." },
  { id: "1timothy43", question: "An overseer must manage his own family well and see that his children obey him with proper?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Respect" }, { label: "C", text: "Care" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "1 Timothy 3:4", explanation: "Household leadership." },
  { id: "1timothy44", question: "An overseer must not be a recent convert or he may become conceited and fall under the same judgment as the?", options: [{ label: "A", text: "Pharisees" }, { label: "B", text: "Devil" }, { label: "C", text: "False teachers" }, { label: "D", text: "Lawless" }], correctAnswer: "B", verse: "1 Timothy 3:6", explanation: "Spiritual maturity." },
  { id: "1timothy45", question: "An overseer must have a good reputation with?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Leaders" }, { label: "C", text: "Outsiders" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "1 Timothy 3:7", explanation: "Public witness." },
  { id: "1timothy46", question: "Deacons are to be worthy of respect, sincere, and not indulging in much?", options: [{ label: "A", text: "Wine" }, { label: "B", text: "Food" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Comfort" }], correctAnswer: "A", verse: "1 Timothy 3:8", explanation: "Self-control." },
  { id: "1timothy47", question: "Deacons must keep hold of the deep truths of the faith with a?", options: [{ label: "A", text: "Pure conscience" }, { label: "B", text: "Strong mind" }, { label: "C", text: "Clear heart" }, { label: "D", text: "Faithful spirit" }], correctAnswer: "A", verse: "1 Timothy 3:9", explanation: "Doctrinal integrity." },
  { id: "1timothy48", question: "Deacons must first be tested, and then if there is nothing against them, let them?", options: [{ label: "A", text: "Serve" }, { label: "B", text: "Lead" }, { label: "C", text: "Teach" }, { label: "D", text: "Preach" }], correctAnswer: "A", verse: "1 Timothy 3:10", explanation: "Proven faithfulness." },
  { id: "1timothy49", question: "Deacons' wives are to be worthy of respect, not malicious talkers, but temperate and?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Pure" }, { label: "C", text: "Godly" }, { label: "D", text: "Sincere" }], correctAnswer: "A", verse: "1 Timothy 3:11", explanation: "Trustworthy character." },
  { id: "1timothy50", question: "A deacon must be faithful to his wife and manage his children and household well, gaining an excellent standing and great assurance in the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Gospel" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Timothy 3:12-13", explanation: "Reward of service." },
  { id: "1timothy51", question: "Paul writes these instructions hoping to come to Timothy?", options: [{ label: "A", text: "Soon" }, { label: "B", text: "Quickly" }, { label: "C", text: "Shortly" }, { label: "D", text: "Briefly" }], correctAnswer: "A", verse: "1 Timothy 3:14", explanation: "Pastoral intent." },
  { id: "1timothy52", question: "Paul writes so Timothy will know how people ought to conduct themselves in God's?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "Household" }, { label: "C", text: "Church" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "1 Timothy 3:15", explanation: "Order in the church." },
  { id: "1timothy53", question: "The church is described as the pillar and foundation of the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Word" }], correctAnswer: "C", verse: "1 Timothy 3:15", explanation: "Truth upheld." },
  { id: "1timothy54", question: "Paul presents a hymn describing Christ who appeared in the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Body" }, { label: "D", text: "Form" }], correctAnswer: "B", verse: "1 Timothy 3:16", explanation: "Incarnation." },
  { id: "1timothy55", question: "Christ was vindicated by the?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Spirit" }, { label: "C", text: "Angels" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "1 Timothy 3:16", explanation: "Divine approval." },
  { id: "1timothy56", question: "Christ was seen by?", options: [{ label: "A", text: "People" }, { label: "B", text: "Apostles" }, { label: "C", text: "Angels" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "1 Timothy 3:16", explanation: "Heavenly witness." },
  { id: "1timothy57", question: "Christ was preached among the?", options: [{ label: "A", text: "Churches" }, { label: "B", text: "Gentiles" }, { label: "C", text: "Jews" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "1 Timothy 3:16", explanation: "Global mission." },
  { id: "1timothy58", question: "Christ was believed on in the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Faith" }, { label: "C", text: "Church" }, { label: "D", text: "Truth" }], correctAnswer: "A", verse: "1 Timothy 3:16", explanation: "Worldwide belief." },
  { id: "1timothy59", question: "Christ was taken up in?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Honor" }, { label: "C", text: "Glory" }, { label: "D", text: "Heaven" }], correctAnswer: "C", verse: "1 Timothy 3:16", explanation: "Ascension glory." },
  { id: "1timothy60", question: "The Spirit clearly says that in later times some will abandon the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "1 Timothy 4:1", explanation: "Warning of apostasy." },
  { id: "1timothy61", question: "People will follow deceiving spirits and things taught by?", options: [{ label: "A", text: "Men" }, { label: "B", text: "False teachers" }, { label: "C", text: "Demons" }, { label: "D", text: "Prophets" }], correctAnswer: "C", verse: "1 Timothy 4:1", explanation: "Spiritual deception." },
  { id: "1timothy62", question: "Such teachings come through hypocritical liars whose consciences have been?", options: [{ label: "A", text: "Weakened" }, { label: "B", text: "Burned" }, { label: "C", text: "Seared" }, { label: "D", text: "Hardened" }], correctAnswer: "C", verse: "1 Timothy 4:2", explanation: "Moral numbness." },
  { id: "1timothy63", question: "False teachers forbid people to marry and order them to abstain from?", options: [{ label: "A", text: "Drink" }, { label: "B", text: "Food" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Comfort" }], correctAnswer: "B", verse: "1 Timothy 4:3", explanation: "Ascetic errors." },
  { id: "1timothy64", question: "Everything God created is?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "Pure" }, { label: "C", text: "Good" }, { label: "D", text: "Perfect" }], correctAnswer: "C", verse: "1 Timothy 4:4", explanation: "Good creation." },
  { id: "1timothy65", question: "God's creation is sanctified by the word of God and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Prayer" }, { label: "C", text: "Thanksgiving" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Timothy 4:5", explanation: "Grateful prayer." },
  { id: "1timothy66", question: "Timothy will be a good minister if he points out these things and is nourished on the truths of the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Word" }, { label: "D", text: "Scriptures" }], correctAnswer: "A", verse: "1 Timothy 4:6", explanation: "Doctrinal nourishment." },
  { id: "1timothy67", question: "Timothy is told to have nothing to do with godless myths and old wives'?", options: [{ label: "A", text: "Stories" }, { label: "B", text: "Tales" }, { label: "C", text: "Fables" }, { label: "D", text: "Legends" }], correctAnswer: "C", verse: "1 Timothy 4:7", explanation: "Reject falsehood." },
  { id: "1timothy68", question: "Physical training has some value, but godliness has value for all things, holding promise for the present life and the?", options: [{ label: "A", text: "Future life" }, { label: "B", text: "Next life" }, { label: "C", text: "Life to come" }, { label: "D", text: "Eternal life" }], correctAnswer: "C", verse: "1 Timothy 4:8", explanation: "Eternal perspective." },
  { id: "1timothy69", question: "Paul says this saying is trustworthy and deserves full?", options: [{ label: "A", text: "Attention" }, { label: "B", text: "Acceptance" }, { label: "C", text: "Belief" }, { label: "D", text: "Approval" }], correctAnswer: "B", verse: "1 Timothy 4:9", explanation: "Reliable truth." },
  { id: "1timothy70", question: "God is the Savior of all people, especially of those who?", options: [{ label: "A", text: "Obey" }, { label: "B", text: "Believe" }, { label: "C", text: "Follow" }, { label: "D", text: "Trust" }], correctAnswer: "B", verse: "1 Timothy 4:10", explanation: "Faith emphasis." },
  { id: "1timothy71", question: "Timothy is told not to let anyone look down on him because he is?", options: [{ label: "A", text: "Young" }, { label: "B", text: "Inexperienced" }, { label: "C", text: "New" }, { label: "D", text: "Timid" }], correctAnswer: "A", verse: "1 Timothy 4:12", explanation: "Youthful leadership." },
  { id: "1timothy72", question: "Timothy should set an example for believers in speech, conduct, love, faith, and?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Purity" }, { label: "C", text: "Truth" }, { label: "D", text: "Service" }], correctAnswer: "B", verse: "1 Timothy 4:12", explanation: "Moral example." },
  { id: "1timothy73", question: "Timothy is urged to devote himself to the public reading of Scripture, preaching, and?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Prayer" }, { label: "C", text: "Worship" }, { label: "D", text: "Service" }], correctAnswer: "A", verse: "1 Timothy 4:13", explanation: "Ministry focus." },
  { id: "1timothy74", question: "Timothy is told not to neglect his gift which was given through prophecy with the laying on of hands of the?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "Church" }, { label: "C", text: "Elders" }, { label: "D", text: "Leaders" }], correctAnswer: "C", verse: "1 Timothy 4:14", explanation: "Spiritual gifting." },
  { id: "1timothy75", question: "Timothy is encouraged to watch his life and doctrine closely and persevere in them to save both himself and his?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Hearers" }, { label: "C", text: "Followers" }, { label: "D", text: "Believers" }], correctAnswer: "B", verse: "1 Timothy 4:16", explanation: "Faithful teaching." },
  { id: "1timothy76", question: "Older men are to be treated as?", options: [{ label: "A", text: "Teachers" }, { label: "B", text: "Fathers" }, { label: "C", text: "Leaders" }, { label: "D", text: "Elders" }], correctAnswer: "B", verse: "1 Timothy 5:1", explanation: "Respectful relationships." },
  { id: "1timothy77", question: "Younger men are to be treated as?", options: [{ label: "A", text: "Friends" }, { label: "B", text: "Brothers" }, { label: "C", text: "Believers" }, { label: "D", text: "Servants" }], correctAnswer: "B", verse: "1 Timothy 5:1", explanation: "Family language." },
  { id: "1timothy78", question: "Older women are to be treated as?", options: [{ label: "A", text: "Teachers" }, { label: "B", text: "Mothers" }, { label: "C", text: "Leaders" }, { label: "D", text: "Elders" }], correctAnswer: "B", verse: "1 Timothy 5:2", explanation: "Honor and care." },
  { id: "1timothy79", question: "Younger women are to be treated as?", options: [{ label: "A", text: "Sisters" }, { label: "B", text: "Daughters" }, { label: "C", text: "Believers" }, { label: "D", text: "Friends" }], correctAnswer: "A", verse: "1 Timothy 5:2", explanation: "Purity and respect." },
  { id: "1timothy80", question: "The church should give proper recognition to?", options: [{ label: "A", text: "Widows" }, { label: "B", text: "Orphans" }, { label: "C", text: "Poor" }, { label: "D", text: "Elders" }], correctAnswer: "A", verse: "1 Timothy 5:3", explanation: "Care for widows." },
  { id: "1timothy81", question: "A widow who is really in need puts her hope in?", options: [{ label: "A", text: "The church" }, { label: "B", text: "God" }, { label: "C", text: "Family" }, { label: "D", text: "Provision" }], correctAnswer: "B", verse: "1 Timothy 5:5", explanation: "Dependence on God." },
  { id: "1timothy82", question: "A widow who lives for pleasure is?", options: [{ label: "A", text: "Lost" }, { label: "B", text: "Dead even while alive" }, { label: "C", text: "Misguided" }, { label: "D", text: "Weak" }], correctAnswer: "B", verse: "1 Timothy 5:6", explanation: "Spiritual warning." },
  { id: "1timothy83", question: "Anyone who does not provide for their relatives has denied the faith and is worse than an?", options: [{ label: "A", text: "Unbeliever" }, { label: "B", text: "Outsider" }, { label: "C", text: "Enemy" }, { label: "D", text: "Oppressor" }], correctAnswer: "A", verse: "1 Timothy 5:8", explanation: "Family responsibility." },
  { id: "1timothy84", question: "A widow must be at least how old to be put on the list?", options: [{ label: "A", text: "50" }, { label: "B", text: "55" }, { label: "C", text: "60" }, { label: "D", text: "65" }], correctAnswer: "C", verse: "1 Timothy 5:9", explanation: "Widow qualifications." },
  { id: "1timothy85", question: "Elders who direct the affairs of the church well are worthy of double?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Honor" }, { label: "C", text: "Pay" }, { label: "D", text: "Recognition" }], correctAnswer: "B", verse: "1 Timothy 5:17", explanation: "Honor leadership." },
  { id: "1timothy86", question: "Accusations against an elder should not be entertained unless brought by two or three?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Witnesses" }, { label: "C", text: "Believers" }, { label: "D", text: "Churches" }], correctAnswer: "B", verse: "1 Timothy 5:19", explanation: "Fair judgment." },
  { id: "1timothy87", question: "Paul warns Timothy not to show favoritism or do anything out of?", options: [{ label: "A", text: "Bias" }, { label: "B", text: "Prejudice" }, { label: "C", text: "Partiality" }, { label: "D", text: "Preference" }], correctAnswer: "C", verse: "1 Timothy 5:21", explanation: "Impartial leadership." },
  { id: "1timothy88", question: "Timothy is advised to stop drinking only water and use a little?", options: [{ label: "A", text: "Juice" }, { label: "B", text: "Wine" }, { label: "C", text: "Milk" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "1 Timothy 5:23", explanation: "Practical advice." },
  { id: "1timothy89", question: "Some sins are obvious, reaching the place of judgment ahead of them, while others trail behind, just as good deeds are obvious and even those that are not cannot remain?", options: [{ label: "A", text: "Hidden" }, { label: "B", text: "Secret" }, { label: "C", text: "Unknown" }, { label: "D", text: "Unseen" }], correctAnswer: "A", verse: "1 Timothy 5:24-25", explanation: "Truth revealed." },
  { id: "1timothy90", question: "Slaves are to consider their masters worthy of full?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Honor" }, { label: "C", text: "Obedience" }, { label: "D", text: "Service" }], correctAnswer: "A", verse: "1 Timothy 6:1", explanation: "God-honoring conduct." },
  { id: "1timothy91", question: "False teachers think godliness is a means to financial?", options: [{ label: "A", text: "Gain" }, { label: "B", text: "Profit" }, { label: "C", text: "Wealth" }, { label: "D", text: "Success" }], correctAnswer: "A", verse: "1 Timothy 6:5", explanation: "Wrong motive." },
  { id: "1timothy92", question: "Godliness with contentment is great?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Wealth" }, { label: "C", text: "Gain" }, { label: "D", text: "Peace" }], correctAnswer: "C", verse: "1 Timothy 6:6", explanation: "True richness." },
  { id: "1timothy93", question: "The love of money is a root of all kinds of?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Evil" }, { label: "C", text: "Trouble" }, { label: "D", text: "Harm" }], correctAnswer: "B", verse: "1 Timothy 6:10", explanation: "Spiritual danger." },
  { id: "1timothy94", question: "Those who want to get rich fall into temptation and a?", options: [{ label: "A", text: "Trap" }, { label: "B", text: "Pit" }, { label: "C", text: "Snare" }, { label: "D", text: "Net" }], correctAnswer: "C", verse: "1 Timothy 6:9", explanation: "Spiritual warning." },
  { id: "1timothy95", question: "Timothy is told to flee from all this and pursue righteousness, godliness, faith, love, endurance, and?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Gentleness" }, { label: "C", text: "Humility" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "1 Timothy 6:11", explanation: "Christlike character." },
  { id: "1timothy96", question: "Timothy is urged to fight the good fight of the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "1 Timothy 6:12", explanation: "Faithful perseverance." },
  { id: "1timothy97", question: "God is described as the blessed and only Ruler, the King of kings and Lord of?", options: [{ label: "A", text: "Lords" }, { label: "B", text: "All" }, { label: "C", text: "Heaven" }, { label: "D", text: "Creation" }], correctAnswer: "A", verse: "1 Timothy 6:15", explanation: "Supreme authority." },
  { id: "1timothy98", question: "God alone is immortal and lives in unapproachable?", options: [{ label: "A", text: "Holiness" }, { label: "B", text: "Power" }, { label: "C", text: "Light" }, { label: "D", text: "Glory" }], correctAnswer: "C", verse: "1 Timothy 6:16", explanation: "Divine nature." },
  { id: "1timothy99", question: "The rich are commanded not to be arrogant nor to put their hope in?", options: [{ label: "A", text: "Money" }, { label: "B", text: "Wealth" }, { label: "C", text: "Riches" }, { label: "D", text: "Possessions" }], correctAnswer: "B", verse: "1 Timothy 6:17", explanation: "Proper trust." },
  { id: "1timothy100", question: "Paul urges Timothy to guard what has been entrusted to him, avoiding godless chatter and opposing ideas of what is falsely called?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Timothy 6:20", explanation: "Protect sound doctrine." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstTimothyTriviaPage() {
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
          .eq("book", "1timothy");

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
          book: "1timothy",
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
            book: "1timothy",
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
    if (score === 10) return "Perfect! You're a 1 Timothy expert!";
    if (score >= 8) return "Excellent! You know 1 Timothy well!";
    if (score >= 6) return "Good job! Keep studying 1 Timothy!";
    if (score >= 4) return "Nice try! 1 Timothy has much to explore!";
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
              href="/bible-trivia/1-timothy"
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






