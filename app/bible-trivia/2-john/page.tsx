"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
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
    const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
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
  { id: "2john1", question: "Who is traditionally identified as the author of 2 John?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Peter" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "C", verse: "2 John 1:1", explanation: "2 John is traditionally attributed to the apostle John." },
  { id: "2john2", question: "The author refers to himself as what?", options: [{ label: "A", text: "An apostle" }, { label: "B", text: "A servant" }, { label: "C", text: "The elder" }, { label: "D", text: "A teacher" }], correctAnswer: "C", verse: "2 John 1:1", explanation: "John identifies himself as the elder." },
  { id: "2john3", question: "To whom is 2 John addressed?", options: [{ label: "A", text: "A church" }, { label: "B", text: "An elder" }, { label: "C", text: "The chosen lady and her children" }, { label: "D", text: "Believers in Asia" }], correctAnswer: "C", verse: "2 John 1:1", explanation: "The letter is addressed symbolically or personally." },
  { id: "2john4", question: "John says he loves the recipients in what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Grace" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "2 John 1:1", explanation: "Truth is central to the letter." },
  { id: "2john5", question: "Truth lives in believers and will be with them?", options: [{ label: "A", text: "Always" }, { label: "B", text: "Until the end" }, { label: "C", text: "Forever" }, { label: "D", text: "Completely" }], correctAnswer: "C", verse: "2 John 1:2", explanation: "Truth is enduring." },
  { id: "2john6", question: "Grace, mercy, and peace come from God the Father and from?", options: [{ label: "A", text: "The Spirit" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "The church" }, { label: "D", text: "The truth" }], correctAnswer: "B", verse: "2 John 1:3", explanation: "Unity of Father and Son." },
  { id: "2john7", question: "John rejoices to find some children walking in the?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Truth" }, { label: "C", text: "Way" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 John 1:4", explanation: "Truth expressed through life." },
  { id: "2john8", question: "Walking in truth is described as living according to the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Law" }, { label: "C", text: "Command" }, { label: "D", text: "Word" }], correctAnswer: "C", verse: "2 John 1:4", explanation: "Truth requires obedience." },
  { id: "2john9", question: "John reminds them of a command they had from the?", options: [{ label: "A", text: "Beginning" }, { label: "B", text: "Father" }, { label: "C", text: "Law" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "2 John 1:5", explanation: "Consistent teaching." },
  { id: "2john10", question: "The command emphasized in the letter is to?", options: [{ label: "A", text: "Believe correctly" }, { label: "B", text: "Walk humbly" }, { label: "C", text: "Love one another" }, { label: "D", text: "Obey leaders" }], correctAnswer: "C", verse: "2 John 1:5", explanation: "Love is central." },
  { id: "2john11", question: "Love is defined as walking according to God's?", options: [{ label: "A", text: "Will" }, { label: "B", text: "Commands" }, { label: "C", text: "Truth" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "2 John 1:6", explanation: "Love and obedience are linked." },
  { id: "2john12", question: "Many what have gone out into the world?", options: [{ label: "A", text: "Teachers" }, { label: "B", text: "False prophets" }, { label: "C", text: "Deceivers" }, { label: "D", text: "Antichrists" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Warning against deception." },
  { id: "2john13", question: "Deceivers deny that Jesus Christ came in the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Truth" }, { label: "C", text: "Flesh" }, { label: "D", text: "World" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Denial of incarnation." },
  { id: "2john14", question: "Such a person is described as the deceiver and the?", options: [{ label: "A", text: "False teacher" }, { label: "B", text: "Antichrist" }, { label: "C", text: "Liar" }, { label: "D", text: "Enemy" }], correctAnswer: "B", verse: "2 John 1:7", explanation: "Strong theological warning." },
  { id: "2john15", question: "Believers are warned to watch themselves so they do not lose what they have?", options: [{ label: "A", text: "Gained" }, { label: "B", text: "Learned" }, { label: "C", text: "Built" }, { label: "D", text: "Earned" }], correctAnswer: "A", verse: "2 John 1:8", explanation: "Spiritual vigilance." },
  { id: "2john16", question: "The goal is to receive a full?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Inheritance" }, { label: "C", text: "Reward" }, { label: "D", text: "Crown" }], correctAnswer: "C", verse: "2 John 1:8", explanation: "Faithfulness rewarded." },
  { id: "2john17", question: "Anyone who runs ahead and does not continue in the teaching of Christ does not have?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Life" }, { label: "C", text: "God" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Abiding in doctrine matters." },
  { id: "2john18", question: "Whoever continues in the teaching has both the Father and the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Truth" }, { label: "C", text: "Son" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Doctrinal fidelity." },
  { id: "2john19", question: "Believers are instructed not to welcome anyone who does not bring this teaching into their?", options: [{ label: "A", text: "Church" }, { label: "B", text: "House" }, { label: "C", text: "Community" }, { label: "D", text: "Fellowship" }], correctAnswer: "B", verse: "2 John 1:10", explanation: "Hospitality with discernment." },
  { id: "2john20", question: "Welcoming false teachers makes one share in their?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Sin" }, { label: "C", text: "Guilt" }, { label: "D", text: "Wicked work" }], correctAnswer: "D", verse: "2 John 1:11", explanation: "Shared responsibility." },
  { id: "2john21", question: "John says he has much to write but prefers not to use?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Ink and paper" }, { label: "C", text: "A letter" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "2 John 1:12", explanation: "Personal connection." },
  { id: "2john22", question: "John hopes to visit and talk face to face so their joy may be?", options: [{ label: "A", text: "Shared" }, { label: "B", text: "Strong" }, { label: "C", text: "Complete" }, { label: "D", text: "Full" }], correctAnswer: "D", verse: "2 John 1:12", explanation: "Joy through fellowship." },
  { id: "2john23", question: "Who sends greetings at the end of the letter?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The apostles" }, { label: "C", text: "The children of your chosen sister" }, { label: "D", text: "Believers nearby" }], correctAnswer: "C", verse: "2 John 1:13", explanation: "Closing greeting." },
  { id: "2john24", question: "A major theme of 2 John is truth and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Doctrine" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "2 John 1", explanation: "Truth and love together." },
  { id: "2john25", question: "Another key theme is guarding against false?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Beliefs" }, { label: "C", text: "Teachers" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "2 John 1:7-11", explanation: "Protection of the church." },
  { id: "2john26", question: "2 John emphasizes that love must operate within?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Truth" }, { label: "C", text: "Freedom" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 John 1:3-6", explanation: "Balanced love." },
  { id: "2john27", question: "The letter shows that truth without love becomes harsh and love without truth becomes?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "False" }, { label: "C", text: "Dangerous" }, { label: "D", text: "Meaningless" }], correctAnswer: "B", verse: "2 John theme", explanation: "Theological balance." },
  { id: "2john28", question: "2 John is one of the shortest books in the?", options: [{ label: "A", text: "Old Testament" }, { label: "B", text: "Gospels" }, { label: "C", text: "New Testament" }, { label: "D", text: "Epistles" }], correctAnswer: "C", verse: "2 John 1", explanation: "Very brief letter." },
  { id: "2john29", question: "Despite its length, 2 John strongly emphasizes doctrinal?", options: [{ label: "A", text: "Freedom" }, { label: "B", text: "Tolerance" }, { label: "C", text: "Faithfulness" }, { label: "D", text: "Unity" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Stay in Christ's teaching." },
  { id: "2john30", question: "The ultimate concern of 2 John is remaining faithful to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Tradition" }, { label: "C", text: "Christ" }, { label: "D", text: "Scripture" }], correctAnswer: "C", verse: "2 John 1", explanation: "Christ-centered faith." },
  { id: "2john31", question: "Truth in 2 John is described as something believers walk in, not just?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Know" }, { label: "C", text: "Teach" }, { label: "D", text: "Defend" }], correctAnswer: "B", verse: "2 John 1:4", explanation: "Truth is lived." },
  { id: "2john32", question: "Love in 2 John is never separated from obedience to God's?", options: [{ label: "A", text: "Commands" }, { label: "B", text: "Will" }, { label: "C", text: "Truth" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "2 John 1:6", explanation: "Obedient love." },
  { id: "2john33", question: "False teachers in 2 John specifically deny what doctrine?", options: [{ label: "A", text: "Resurrection" }, { label: "B", text: "Trinity" }, { label: "C", text: "Incarnation" }, { label: "D", text: "Atonement" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Christ in the flesh." },
  { id: "2john34", question: "John's warning shows that love does not mean?", options: [{ label: "A", text: "Kindness" }, { label: "B", text: "Compromise" }, { label: "C", text: "Patience" }, { label: "D", text: "Forgiveness" }], correctAnswer: "B", verse: "2 John 1:10-11", explanation: "No compromise with error." },
  { id: "2john35", question: "Receiving false teachers gives them legitimacy and?", options: [{ label: "A", text: "Support" }, { label: "B", text: "Authority" }, { label: "C", text: "Influence" }, { label: "D", text: "Platform" }], correctAnswer: "D", verse: "2 John 1:10", explanation: "Hospitality implies endorsement." },
  { id: "2john36", question: "John emphasizes vigilance because deception spreads through?", options: [{ label: "A", text: "Force" }, { label: "B", text: "Violence" }, { label: "C", text: "Teaching" }, { label: "D", text: "Persuasion" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Teaching shapes belief." },
  { id: "2john37", question: "The phrase \"do not run ahead\" warns against abandoning Christ's?", options: [{ label: "A", text: "Mission" }, { label: "B", text: "Example" }, { label: "C", text: "Teaching" }, { label: "D", text: "Commands" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Stay grounded." },
  { id: "2john38", question: "Remaining in Christ's teaching results in fellowship with whom?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "The apostles" }, { label: "C", text: "The Father and the Son" }, { label: "D", text: "The Spirit" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Doctrinal unity." },
  { id: "2john39", question: "2 John shows that discernment is an act of?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Judgment" }, { label: "C", text: "Love" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "2 John 1:10-11", explanation: "Protecting others." },
  { id: "2john40", question: "John's desire for face-to-face fellowship shows the value of?", options: [{ label: "A", text: "Letters" }, { label: "B", text: "Community" }, { label: "C", text: "Teaching" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 John 1:12", explanation: "Personal connection." },
  { id: "2john41", question: "Joy in 2 John is connected to shared truth and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Unity" }, { label: "C", text: "Love" }, { label: "D", text: "Obedience" }], correctAnswer: "C", verse: "2 John 1:4-6", explanation: "Relational joy." },
  { id: "2john42", question: "The structure of 2 John closely parallels which other letter?", options: [{ label: "A", text: "1 John" }, { label: "B", text: "3 John" }, { label: "C", text: "Jude" }, { label: "D", text: "James" }], correctAnswer: "A", verse: "2 John theme", explanation: "Shared themes." },
  { id: "2john43", question: "2 John teaches that hospitality should be guided by?", options: [{ label: "A", text: "Kindness" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Discernment" }, { label: "D", text: "Tradition" }], correctAnswer: "C", verse: "2 John 1:10", explanation: "Discerned hospitality." },
  { id: "2john44", question: "The letter warns that false teaching affects not just belief but?", options: [{ label: "A", text: "Behavior" }, { label: "B", text: "Community" }, { label: "C", text: "Witness" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 John theme", explanation: "Broad impact." },
  { id: "2john45", question: "Truth in 2 John is both relational and?", options: [{ label: "A", text: "Doctrinal" }, { label: "B", text: "Experiential" }, { label: "C", text: "Personal" }, { label: "D", text: "Practical" }], correctAnswer: "A", verse: "2 John 1", explanation: "Truth content matters." },
  { id: "2john46", question: "The warning against deceivers implies that error often appears?", options: [{ label: "A", text: "Obvious" }, { label: "B", text: "Harmless" }, { label: "C", text: "Subtle" }, { label: "D", text: "Aggressive" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Subtle deception." },
  { id: "2john47", question: "The phrase \"walk in truth\" implies consistency between belief and?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Teaching" }, { label: "C", text: "Lifestyle" }, { label: "D", text: "Community" }], correctAnswer: "C", verse: "2 John 1:4", explanation: "Truth lived out." },
  { id: "2john48", question: "2 John places boundaries around love to protect?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "2 John 1:7-11", explanation: "Love with truth." },
  { id: "2john49", question: "John's refusal to write everything highlights the importance of?", options: [{ label: "A", text: "Letters" }, { label: "B", text: "Presence" }, { label: "C", text: "Authority" }, { label: "D", text: "Structure" }], correctAnswer: "B", verse: "2 John 1:12", explanation: "Face-to-face ministry." },
  { id: "2john50", question: "2 John demonstrates that guarding doctrine is an act of?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Control" }, { label: "C", text: "Love" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "2 John theme", explanation: "Protecting others." },
  { id: "2john51", question: "The letter assumes that believers are capable of?", options: [{ label: "A", text: "Discernment" }, { label: "B", text: "Judgment" }, { label: "C", text: "Correction" }, { label: "D", text: "Leadership" }], correctAnswer: "A", verse: "2 John 1:8", explanation: "Spiritual maturity." },
  { id: "2john52", question: "Truth in 2 John is something that remains?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Unchanged" }, { label: "C", text: "With us" }, { label: "D", text: "Eternal" }], correctAnswer: "C", verse: "2 John 1:2", explanation: "Indwelling truth." },
  { id: "2john53", question: "John's warning implies that doctrine affects eternal?", options: [{ label: "A", text: "Reward" }, { label: "B", text: "Judgment" }, { label: "C", text: "Life" }, { label: "D", text: "Standing" }], correctAnswer: "A", verse: "2 John 1:8", explanation: "Full reward." },
  { id: "2john54", question: "2 John teaches that love must be guided by?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Experience" }, { label: "C", text: "Truth" }, { label: "D", text: "Freedom" }], correctAnswer: "C", verse: "2 John 1:6", explanation: "Truth-directed love." },
  { id: "2john55", question: "The warning against greeting false teachers emphasizes responsibility for?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Influence" }, { label: "C", text: "Speech" }, { label: "D", text: "Association" }], correctAnswer: "D", verse: "2 John 1:10-11", explanation: "Shared responsibility." },
  { id: "2john56", question: "2 John shows that not all unity is?", options: [{ label: "A", text: "Good" }, { label: "B", text: "Biblical" }, { label: "C", text: "Necessary" }, { label: "D", text: "Right" }], correctAnswer: "B", verse: "2 John theme", explanation: "Truth-based unity." },
  { id: "2john57", question: "The letter balances warmth with?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Warning" }, { label: "C", text: "Authority" }, { label: "D", text: "Discernment" }], correctAnswer: "D", verse: "2 John theme", explanation: "Loving discernment." },
  { id: "2john58", question: "2 John assumes false teaching is an ongoing?", options: [{ label: "A", text: "Threat" }, { label: "B", text: "Phase" }, { label: "C", text: "Debate" }, { label: "D", text: "Issue" }], correctAnswer: "A", verse: "2 John 1:7", explanation: "Constant vigilance." },
  { id: "2john59", question: "John's tone suggests pastoral concern more than?", options: [{ label: "A", text: "Condemnation" }, { label: "B", text: "Judgment" }, { label: "C", text: "Correction" }, { label: "D", text: "Instruction" }], correctAnswer: "A", verse: "2 John 1", explanation: "Pastoral heart." },
  { id: "2john60", question: "The letter ultimately calls believers to faithfulness in both truth and?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Obedience" }, { label: "C", text: "Love" }, { label: "D", text: "Community" }], correctAnswer: "C", verse: "2 John theme", explanation: "Truth and love together." },
  { id: "2john61", question: "2 John teaches that truth should govern who believers?", options: [{ label: "A", text: "Trust" }, { label: "B", text: "Welcome" }, { label: "C", text: "Follow" }, { label: "D", text: "Teach" }], correctAnswer: "B", verse: "2 John 1:10", explanation: "Discerned hospitality." },
  { id: "2john62", question: "John's refusal to greet false teachers highlights accountability for shared?", options: [{ label: "A", text: "Beliefs" }, { label: "B", text: "Ministry" }, { label: "C", text: "Wicked works" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "2 John 1:11", explanation: "Shared guilt." },
  { id: "2john63", question: "The letter reflects early church concern about traveling?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "Evangelists" }, { label: "C", text: "Teachers" }, { label: "D", text: "Missionaries" }], correctAnswer: "C", verse: "2 John 1:7-11", explanation: "Doctrinal protection." },
  { id: "2john64", question: "2 John demonstrates that doctrine and ethics are?", options: [{ label: "A", text: "Separate" }, { label: "B", text: "Unrelated" }, { label: "C", text: "Connected" }, { label: "D", text: "Independent" }], correctAnswer: "C", verse: "2 John theme", explanation: "Belief shapes behavior." },
  { id: "2john65", question: "The phrase \"full reward\" implies differing degrees of?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Inheritance" }, { label: "C", text: "Faith" }, { label: "D", text: "Growth" }], correctAnswer: "B", verse: "2 John 1:8", explanation: "Faithfulness rewarded." },
  { id: "2john66", question: "2 John teaches that remaining in Christ's teaching is essential for true?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Faith" }, { label: "C", text: "Fellowship" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "True fellowship." },
  { id: "2john67", question: "The letter emphasizes guarding both belief and?", options: [{ label: "A", text: "Practice" }, { label: "B", text: "Speech" }, { label: "C", text: "Community" }, { label: "D", text: "Unity" }], correctAnswer: "A", verse: "2 John theme", explanation: "Orthodoxy and orthopraxy." },
  { id: "2john68", question: "2 John shows that truth must shape even social?", options: [{ label: "A", text: "Interactions" }, { label: "B", text: "Friendships" }, { label: "C", text: "Relationships" }, { label: "D", text: "Hospitality" }], correctAnswer: "D", verse: "2 John 1:10", explanation: "Boundaries matter." },
  { id: "2john69", question: "John's closing greeting reinforces the theme of shared?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Love" }, { label: "D", text: "Community" }], correctAnswer: "D", verse: "2 John 1:13", explanation: "Family language." },
  { id: "2john70", question: "2 John is often paired with which book for similar themes?", options: [{ label: "A", text: "Jude" }, { label: "B", text: "1 John" }, { label: "C", text: "3 John" }, { label: "D", text: "Revelation" }], correctAnswer: "B", verse: "2 John theme", explanation: "Shared theology." },
  { id: "2john71", question: "The letter assumes believers are responsible for guarding their own?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Community" }, { label: "D", text: "Witness" }], correctAnswer: "B", verse: "2 John 1:8-9", explanation: "Personal responsibility." },
  { id: "2john72", question: "2 John warns that deception often masquerades as?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Freedom" }, { label: "C", text: "Truth" }, { label: "D", text: "Love" }], correctAnswer: "D", verse: "2 John theme", explanation: "False love." },
  { id: "2john73", question: "The letter demonstrates that love includes sometimes saying?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "No" }, { label: "C", text: "Wait" }, { label: "D", text: "Later" }], correctAnswer: "B", verse: "2 John 1:10", explanation: "Boundaries." },
  { id: "2john74", question: "John's emphasis on obedience reflects continuity with Jesus' teaching in?", options: [{ label: "A", text: "Matthew" }, { label: "B", text: "Luke" }, { label: "C", text: "John" }, { label: "D", text: "Mark" }], correctAnswer: "C", verse: "John 14:15", explanation: "Love and obedience." },
  { id: "2john75", question: "2 John highlights that spiritual danger often comes from?", options: [{ label: "A", text: "Outside pressure" }, { label: "B", text: "False compromise" }, { label: "C", text: "Persecution" }, { label: "D", text: "Isolation" }], correctAnswer: "B", verse: "2 John theme", explanation: "Internal threat." },
  { id: "2john76", question: "The instruction to remain in Christ's teaching implies long-term?", options: [{ label: "A", text: "Commitment" }, { label: "B", text: "Discipline" }, { label: "C", text: "Growth" }, { label: "D", text: "Faithfulness" }], correctAnswer: "D", verse: "2 John 1:9", explanation: "Endurance." },
  { id: "2john77", question: "2 John reflects a pastoral balance of encouragement and?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Discipline" }, { label: "C", text: "Warning" }, { label: "D", text: "Instruction" }], correctAnswer: "C", verse: "2 John theme", explanation: "Protective love." },
  { id: "2john78", question: "The letter reinforces that belief in Jesus' humanity is?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Foundational" }, { label: "C", text: "Secondary" }, { label: "D", text: "Cultural" }], correctAnswer: "B", verse: "2 John 1:7", explanation: "Core doctrine." },
  { id: "2john79", question: "2 John assumes doctrine directly impacts eternal?", options: [{ label: "A", text: "Security" }, { label: "B", text: "Reward" }, { label: "C", text: "Faith" }, { label: "D", text: "Life" }], correctAnswer: "B", verse: "2 John 1:8", explanation: "Reward language." },
  { id: "2john80", question: "The letter demonstrates that love must be discerning, not?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "Selective" }, { label: "C", text: "Naive" }, { label: "D", text: "Restrictive" }], correctAnswer: "C", verse: "2 John theme", explanation: "Wise love." },
  { id: "2john81", question: "2 John teaches that guarding truth protects future?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Believers" }, { label: "C", text: "Generations" }, { label: "D", text: "Churches" }], correctAnswer: "C", verse: "2 John theme", explanation: "Long-term impact." },
  { id: "2john82", question: "John's emphasis on obedience reflects continuity with which Old Testament theme?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Covenant faithfulness" }, { label: "C", text: "Law keeping" }, { label: "D", text: "Righteousness" }], correctAnswer: "B", verse: "Deuteronomy theme", explanation: "Covenant obedience." },
  { id: "2john83", question: "2 John shows that truth and love together form a?", options: [{ label: "A", text: "Foundation" }, { label: "B", text: "Boundary" }, { label: "C", text: "Witness" }, { label: "D", text: "Guardrail" }], correctAnswer: "D", verse: "2 John theme", explanation: "Protective pairing." },
  { id: "2john84", question: "The letter demonstrates that silence toward false teaching can imply?", options: [{ label: "A", text: "Ignorance" }, { label: "B", text: "Agreement" }, { label: "C", text: "Fear" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "2 John 1:10-11", explanation: "Implied endorsement." },
  { id: "2john85", question: "2 John highlights the danger of valuing peace over?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Truth" }, { label: "C", text: "Love" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 John theme", explanation: "Truth first." },
  { id: "2john86", question: "The letter affirms that doctrinal faithfulness honors both the Father and the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Church" }, { label: "C", text: "Son" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 John 1:9", explanation: "Father and Son unity." },
  { id: "2john87", question: "2 John emphasizes that Christian hospitality must never undermine?", options: [{ label: "A", text: "Community" }, { label: "B", text: "Love" }, { label: "C", text: "Truth" }, { label: "D", text: "Unity" }], correctAnswer: "C", verse: "2 John 1:10", explanation: "Truth over comfort." },
  { id: "2john88", question: "The letter reflects early church struggles with which false belief?", options: [{ label: "A", text: "Legalism" }, { label: "B", text: "Gnosticism" }, { label: "C", text: "Docetism" }, { label: "D", text: "Mysticism" }], correctAnswer: "C", verse: "2 John 1:7", explanation: "Denial of Christ's humanity." },
  { id: "2john89", question: "2 John ultimately calls believers to faithfulness in doctrine and?", options: [{ label: "A", text: "Practice" }, { label: "B", text: "Community" }, { label: "C", text: "Love" }, { label: "D", text: "Witness" }], correctAnswer: "C", verse: "2 John theme", explanation: "Love rooted in truth." },
  { id: "2john90", question: "The letter demonstrates that love sometimes requires?", options: [{ label: "A", text: "Distance" }, { label: "B", text: "Correction" }, { label: "C", text: "Boundaries" }, { label: "D", text: "Silence" }], correctAnswer: "C", verse: "2 John 1:10-11", explanation: "Healthy boundaries." },
  { id: "2john91", question: "2 John teaches that doctrine protects the church's?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Witness" }, { label: "C", text: "Faith" }, { label: "D", text: "Growth" }], correctAnswer: "B", verse: "2 John theme", explanation: "Public testimony." },
  { id: "2john92", question: "The letter reinforces that truth is not merely intellectual but?", options: [{ label: "A", text: "Relational" }, { label: "B", text: "Experiential" }, { label: "C", text: "Spiritual" }, { label: "D", text: "Practical" }], correctAnswer: "D", verse: "2 John 1:4-6", explanation: "Truth lived out." },
  { id: "2john93", question: "2 John warns that good intentions can still cause harm if they ignore?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Truth" }, { label: "C", text: "Discernment" }, { label: "D", text: "Doctrine" }], correctAnswer: "B", verse: "2 John theme", explanation: "Truth matters." },
  { id: "2john94", question: "The phrase \"walk in truth\" implies lifelong?", options: [{ label: "A", text: "Learning" }, { label: "B", text: "Faith" }, { label: "C", text: "Commitment" }, { label: "D", text: "Practice" }], correctAnswer: "D", verse: "2 John 1:4", explanation: "Ongoing obedience." },
  { id: "2john95", question: "2 John shows that doctrine is meant to protect people, not to?", options: [{ label: "A", text: "Divide" }, { label: "B", text: "Control" }, { label: "C", text: "Exclude" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "2 John theme", explanation: "Protective purpose." },
  { id: "2john96", question: "The letter underscores that faithfulness sometimes costs?", options: [{ label: "A", text: "Comfort" }, { label: "B", text: "Popularity" }, { label: "C", text: "Peace" }, { label: "D", text: "Security" }], correctAnswer: "B", verse: "2 John theme", explanation: "Unpopular truth." },
  { id: "2john97", question: "2 John affirms that remaining in Christ's teaching ensures lasting?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fellowship" }, { label: "C", text: "Faith" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "2 John 1:9", explanation: "True fellowship." },
  { id: "2john98", question: "The letter closes emphasizing relational warmth and shared?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Joy" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "2 John 1:12", explanation: "Joyful fellowship." },
  { id: "2john99", question: "2 John ultimately teaches that Christian love must always serve?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Community" }, { label: "C", text: "Truth" }, { label: "D", text: "Peace" }], correctAnswer: "C", verse: "2 John theme", explanation: "Truth first." },
  { id: "2john100", question: "The lasting message of 2 John is to walk in truth, love one another, and remain faithful to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The gospel" }, { label: "C", text: "Christ" }, { label: "D", text: "Scripture" }], correctAnswer: "C", verse: "2 John 1", explanation: "Christ-centered faith." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondJohnTriviaPage() {
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
        
        // Fetch user's progress for 2 john questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', '2john');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: '2john' });
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
            book: '2john'
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
    if (score === 10) return "Perfect! You're a 2 John expert!";
    if (score >= 8) return "Excellent! You know 2 John well!";
    if (score >= 6) return "Good job! Keep studying 2 John!";
    if (score >= 4) return "Nice try! 2 John has much to explore!";
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
              href="/bible-trivia/2-john"
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





