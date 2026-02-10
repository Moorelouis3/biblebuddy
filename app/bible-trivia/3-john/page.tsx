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
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "3john1", question: "Who is traditionally identified as the author of 3 John?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Peter" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "C", verse: "3 John 1:1", explanation: "3 John is traditionally attributed to the apostle John." },
  { id: "3john2", question: "The author refers to himself as what?", options: [{ label: "A", text: "An apostle" }, { label: "B", text: "A servant" }, { label: "C", text: "The elder" }, { label: "D", text: "A teacher" }], correctAnswer: "C", verse: "3 John 1:1", explanation: "John identifies himself as the elder." },
  { id: "3john3", question: "To whom is 3 John addressed?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Gaius" }, { label: "C", text: "Diotrephes" }, { label: "D", text: "Demetrius" }], correctAnswer: "B", verse: "3 John 1:1", explanation: "The letter is written to Gaius." },
  { id: "3john4", question: "John says he loves Gaius in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Spirit" }, { label: "C", text: "Truth" }, { label: "D", text: "Lord" }], correctAnswer: "C", verse: "3 John 1:1", explanation: "Truth is central to John's letters." },
  { id: "3john5", question: "John prays that Gaius may enjoy good health and that all may go well with him, even as his?", options: [{ label: "A", text: "Faith grows" }, { label: "B", text: "Soul prospers" }, { label: "C", text: "Works continue" }, { label: "D", text: "Life improves" }], correctAnswer: "B", verse: "3 John 1:2", explanation: "Spiritual health is emphasized." },
  { id: "3john6", question: "John rejoices greatly when believers testify about Gaius's?", options: [{ label: "A", text: "Generosity" }, { label: "B", text: "Leadership" }, { label: "C", text: "Faithfulness to the truth" }, { label: "D", text: "Hospitality" }], correctAnswer: "C", verse: "3 John 1:3", explanation: "Faithfulness to truth." },
  { id: "3john7", question: "Walking in the truth is described as bringing John great?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Joy" }, { label: "C", text: "Comfort" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "3 John 1:4", explanation: "Joy rooted in truth." },
  { id: "3john8", question: "John says he has no greater joy than to hear that his children are walking in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Way" }, { label: "C", text: "Truth" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "3 John 1:4", explanation: "Truth lived out." },
  { id: "3john9", question: "Gaius is praised for showing faithfulness in what he does for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Brothers and sisters" }, { label: "C", text: "Leaders" }, { label: "D", text: "Missionaries" }], correctAnswer: "B", verse: "3 John 1:5", explanation: "Faithful service." },
  { id: "3john10", question: "Some of those helped by Gaius were strangers, meaning they were?", options: [{ label: "A", text: "Unknown personally" }, { label: "B", text: "From another church" }, { label: "C", text: "Traveling teachers" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John 1:5", explanation: "Hospitality to believers." },
  { id: "3john11", question: "These brothers testified to Gaius's love before the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Apostles" }, { label: "C", text: "Elders" }, { label: "D", text: "Believers" }], correctAnswer: "A", verse: "3 John 1:6", explanation: "Public testimony." },
  { id: "3john12", question: "John encourages Gaius to send them on their way in a manner worthy of?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The gospel" }, { label: "C", text: "God" }, { label: "D", text: "The truth" }], correctAnswer: "C", verse: "3 John 1:6", explanation: "God-honoring support." },
  { id: "3john13", question: "The traveling teachers went out for the sake of the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Name" }, { label: "C", text: "Gospel" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "3 John 1:7", explanation: "For Christ's name." },
  { id: "3john14", question: "They accepted nothing from the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Jews" }, { label: "C", text: "Gentiles" }, { label: "D", text: "Unbelievers" }], correctAnswer: "C", verse: "3 John 1:7", explanation: "Dependence on believers." },
  { id: "3john15", question: "Believers are urged to support such people so they may work together for the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Church" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "3 John 1:8", explanation: "Partners in truth." },
  { id: "3john16", question: "John mentions that he wrote to the church, but who loves to be first?", options: [{ label: "A", text: "Gaius" }, { label: "B", text: "Demetrius" }, { label: "C", text: "Diotrephes" }, { label: "D", text: "The elders" }], correctAnswer: "C", verse: "3 John 1:9", explanation: "Diotrephes is criticized." },
  { id: "3john17", question: "Diotrephes refuses to welcome the?", options: [{ label: "A", text: "Poor" }, { label: "B", text: "Apostles" }, { label: "C", text: "Brothers" }, { label: "D", text: "Traveling teachers" }], correctAnswer: "D", verse: "3 John 1:10", explanation: "Lack of hospitality." },
  { id: "3john18", question: "Diotrephes also spreads malicious nonsense about?", options: [{ label: "A", text: "The church" }, { label: "B", text: "John" }, { label: "C", text: "Gaius" }, { label: "D", text: "The elders" }], correctAnswer: "B", verse: "3 John 1:10", explanation: "Abusive speech." },
  { id: "3john19", question: "Those who want to welcome the brothers are put out of the?", options: [{ label: "A", text: "Fellowship" }, { label: "B", text: "Community" }, { label: "C", text: "Church" }, { label: "D", text: "Assembly" }], correctAnswer: "C", verse: "3 John 1:10", explanation: "Authoritarian control." },
  { id: "3john20", question: "John tells Gaius not to imitate what is evil but what is?", options: [{ label: "A", text: "Right" }, { label: "B", text: "True" }, { label: "C", text: "Faithful" }, { label: "D", text: "Good" }], correctAnswer: "D", verse: "3 John 1:11", explanation: "Imitate good." },
  { id: "3john21", question: "Anyone who does what is good is from?", options: [{ label: "A", text: "The church" }, { label: "B", text: "God" }, { label: "C", text: "The truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "3 John 1:11", explanation: "Evidence of belonging." },
  { id: "3john22", question: "Anyone who does what is evil has not?", options: [{ label: "A", text: "Believed" }, { label: "B", text: "Learned" }, { label: "C", text: "Seen God" }, { label: "D", text: "Obeyed" }], correctAnswer: "C", verse: "3 John 1:11", explanation: "Spiritual blindness." },
  { id: "3john23", question: "Who is well spoken of by everyone and by the truth itself?", options: [{ label: "A", text: "Gaius" }, { label: "B", text: "John" }, { label: "C", text: "Diotrephes" }, { label: "D", text: "Demetrius" }], correctAnswer: "D", verse: "3 John 1:12", explanation: "Good reputation." },
  { id: "3john24", question: "John adds his own testimony about whom?", options: [{ label: "A", text: "Gaius" }, { label: "B", text: "Demetrius" }, { label: "C", text: "The elders" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "3 John 1:12", explanation: "Affirmation of character." },
  { id: "3john25", question: "John says he has much to write but does not want to use?", options: [{ label: "A", text: "Harsh words" }, { label: "B", text: "Authority" }, { label: "C", text: "Ink and pen" }, { label: "D", text: "A letter" }], correctAnswer: "C", verse: "3 John 1:13", explanation: "Prefers personal visit." },
  { id: "3john26", question: "John hopes to see Gaius soon and speak face to?", options: [{ label: "A", text: "Face" }, { label: "B", text: "Heart" }, { label: "C", text: "Mind" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "3 John 1:14", explanation: "Personal fellowship." },
  { id: "3john27", question: "John closes the letter wishing peace to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "You" }, { label: "C", text: "All believers" }, { label: "D", text: "The elders" }], correctAnswer: "B", verse: "3 John 1:15", explanation: "Personal blessing." },
  { id: "3john28", question: "Friends send greetings, and Gaius is told to greet the friends by?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Name" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "3 John 1:15", explanation: "Personal relationships." },
  { id: "3john29", question: "A major theme of 3 John is Christian?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Hospitality" }, { label: "C", text: "Doctrine" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "3 John 1", explanation: "Support for believers." },
  { id: "3john30", question: "Another key theme is truth expressed through?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Teaching" }, { label: "C", text: "Action" }, { label: "D", text: "Belief" }], correctAnswer: "C", verse: "3 John 1:3-6", explanation: "Truth lived out." },
  { id: "3john31", question: "3 John contrasts two types of leadership through Gaius and?", options: [{ label: "A", text: "Demetrius" }, { label: "B", text: "John" }, { label: "C", text: "Diotrephes" }, { label: "D", text: "The elders" }], correctAnswer: "C", verse: "3 John 1:9-10", explanation: "Positive vs negative leadership." },
  { id: "3john32", question: "Gaius represents leadership marked by humility and?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Hospitality" }, { label: "C", text: "Discipline" }, { label: "D", text: "Structure" }], correctAnswer: "B", verse: "3 John 1:5-8", explanation: "Servant-hearted leadership." },
  { id: "3john33", question: "Diotrephes represents leadership driven by?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pride" }, { label: "C", text: "Ignorance" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "3 John 1:9", explanation: "Loves to be first." },
  { id: "3john34", question: "John's response to Diotrephes shows that unhealthy leadership must be?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Tolerated" }, { label: "C", text: "Confronted" }, { label: "D", text: "Removed" }], correctAnswer: "C", verse: "3 John 1:10", explanation: "Accountability matters." },
  { id: "3john35", question: "The letter shows that authority in the church is meant to serve the?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Mission" }, { label: "C", text: "People" }, { label: "D", text: "Structure" }], correctAnswer: "B", verse: "3 John theme", explanation: "Mission-focused leadership." },
  { id: "3john36", question: "Supporting traveling teachers makes believers coworkers for the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Church" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "3 John 1:8", explanation: "Shared mission." },
  { id: "3john37", question: "3 John shows that truth must be paired with?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Love" }, { label: "C", text: "Action" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "3 John 1:3-6", explanation: "Truth in action." },
  { id: "3john38", question: "John's joy is rooted in spiritual fruit, not?", options: [{ label: "A", text: "Numbers" }, { label: "B", text: "Reputation" }, { label: "C", text: "Position" }, { label: "D", text: "Comfort" }], correctAnswer: "A", verse: "3 John 1:4", explanation: "Spiritual focus." },
  { id: "3john39", question: "3 John highlights that hospitality is a form of?", options: [{ label: "A", text: "Kindness" }, { label: "B", text: "Love" }, { label: "C", text: "Ministry" }, { label: "D", text: "Service" }], correctAnswer: "C", verse: "3 John 1:5-8", explanation: "Missional hospitality." },
  { id: "3john40", question: "The rejection of traveling teachers undermines the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Mission" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "3 John 1:9-10", explanation: "Hinders the gospel." },
  { id: "3john41", question: "3 John teaches that ambition in leadership becomes dangerous when it seeks?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Recognition" }, { label: "C", text: "Power" }, { label: "D", text: "Status" }], correctAnswer: "D", verse: "3 John 1:9", explanation: "Loves to be first." },
  { id: "3john42", question: "John's instruction to imitate good reflects a call to?", options: [{ label: "A", text: "Discernment" }, { label: "B", text: "Obedience" }, { label: "C", text: "Holiness" }, { label: "D", text: "Example" }], correctAnswer: "D", verse: "3 John 1:11", explanation: "Follow godly examples." },
  { id: "3john43", question: "3 John reinforces that behavior reveals one's?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Character" }, { label: "C", text: "Faith" }, { label: "D", text: "Identity" }], correctAnswer: "D", verse: "3 John 1:11", explanation: "From God or not." },
  { id: "3john44", question: "Demetrius is presented as an example of someone whose life aligns with the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "3 John 1:12", explanation: "Truth affirmed." },
  { id: "3john45", question: "John's personal testimony adds?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Weight" }, { label: "C", text: "Clarity" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "3 John 1:12", explanation: "Apostolic affirmation." },
  { id: "3john46", question: "3 John shows that letters were often supplemented by?", options: [{ label: "A", text: "Messengers" }, { label: "B", text: "Visits" }, { label: "C", text: "Reports" }, { label: "D", text: "Testimonies" }], correctAnswer: "B", verse: "3 John 1:13-14", explanation: "Face-to-face ministry." },
  { id: "3john47", question: "Peace in 3 John is connected to healthy?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Relationships" }, { label: "C", text: "Leadership" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "3 John 1:15", explanation: "Relational peace." },
  { id: "3john48", question: "Calling fellow believers friends highlights?", options: [{ label: "A", text: "Equality" }, { label: "B", text: "Affection" }, { label: "C", text: "Community" }, { label: "D", text: "Unity" }], correctAnswer: "C", verse: "3 John 1:15", explanation: "Relational closeness." },
  { id: "3john49", question: "3 John assumes that truth is something that can be?", options: [{ label: "A", text: "Testified to" }, { label: "B", text: "Observed" }, { label: "C", text: "Confirmed" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John 1:3-6", explanation: "Visible truth." },
  { id: "3john50", question: "The letter highlights that refusing accountability leads to?", options: [{ label: "A", text: "Division" }, { label: "B", text: "Pride" }, { label: "C", text: "Isolation" }, { label: "D", text: "Disorder" }], correctAnswer: "A", verse: "3 John 1:9-10", explanation: "Church division." },
  { id: "3john51", question: "3 John teaches that authority should never suppress?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Service" }, { label: "D", text: "Hospitality" }], correctAnswer: "D", verse: "3 John 1:9-10", explanation: "Welcoming believers." },
  { id: "3john52", question: "Gaius's example shows that faithfulness often happens in?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Public ministry" }, { label: "C", text: "Everyday actions" }, { label: "D", text: "Teaching" }], correctAnswer: "C", verse: "3 John 1:5", explanation: "Faith lived daily." },
  { id: "3john53", question: "3 John demonstrates that doctrine must shape?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Belief" }, { label: "C", text: "Practice" }, { label: "D", text: "Leadership" }], correctAnswer: "C", verse: "3 John theme", explanation: "Practice matters." },
  { id: "3john54", question: "The letter shows that love for the truth leads to?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Action" }, { label: "C", text: "Hospitality" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "3 John 1:3-6", explanation: "Truth in action." },
  { id: "3john55", question: "3 John warns that unchecked pride damages the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Mission" }, { label: "C", text: "Community" }, { label: "D", text: "Witness" }], correctAnswer: "A", verse: "3 John 1:9-10", explanation: "Church harm." },
  { id: "3john56", question: "John's willingness to confront Diotrephes shows pastoral?", options: [{ label: "A", text: "Boldness" }, { label: "B", text: "Authority" }, { label: "C", text: "Care" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "3 John 1:10", explanation: "Protective care." },
  { id: "3john57", question: "3 John reveals that mission work in the early church relied on?", options: [{ label: "A", text: "Church funding" }, { label: "B", text: "Hospitality" }, { label: "C", text: "Apostles" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "3 John 1:5-8", explanation: "Support networks." },
  { id: "3john58", question: "The contrast between Gaius and Diotrephes highlights the difference between?", options: [{ label: "A", text: "Authority and service" }, { label: "B", text: "Truth and error" }, { label: "C", text: "Leadership and control" }, { label: "D", text: "Faith and works" }], correctAnswer: "C", verse: "3 John theme", explanation: "Control vs service." },
  { id: "3john59", question: "3 John emphasizes that Christian leaders must be accountable to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Truth" }, { label: "C", text: "The apostles" }, { label: "D", text: "God" }], correctAnswer: "B", verse: "3 John theme", explanation: "Truth accountability." },
  { id: "3john60", question: "The overall tone of 3 John combines encouragement with?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Warning" }, { label: "C", text: "Instruction" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "3 John 1", explanation: "Balanced tone." },
  { id: "3john61", question: "3 John shows that walking in truth affects personal?", options: [{ label: "A", text: "Reputation" }, { label: "B", text: "Relationships" }, { label: "C", text: "Faith" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "3 John 1:3-4", explanation: "Relational impact." },
  { id: "3john62", question: "The phrase \"for the sake of the Name\" refers to devotion to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The gospel" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "3 John 1:7", explanation: "Christ-centered mission." },
  { id: "3john63", question: "3 John teaches that supporting missionaries is participation in?", options: [{ label: "A", text: "Evangelism" }, { label: "B", text: "Truth" }, { label: "C", text: "Ministry" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John 1:8", explanation: "Shared mission." },
  { id: "3john64", question: "Diotrephes's refusal to welcome others shows misuse of?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Authority" }, { label: "C", text: "Influence" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "3 John 1:9-10", explanation: "Authoritarian leadership." },
  { id: "3john65", question: "3 John highlights that leadership driven by pride results in?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Division" }, { label: "C", text: "Fear" }, { label: "D", text: "Abuse" }], correctAnswer: "B", verse: "3 John 1:9-10", explanation: "Divisive outcomes." },
  { id: "3john66", question: "John's desire to visit personally shows the importance of?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Community" }, { label: "C", text: "Correction" }, { label: "D", text: "Structure" }], correctAnswer: "B", verse: "3 John 1:14", explanation: "Relational ministry." },
  { id: "3john67", question: "3 John emphasizes that truth should be affirmed by both words and?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Action" }, { label: "C", text: "Faith" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "3 John 1:3-6", explanation: "Truth lived." },
  { id: "3john68", question: "The letter shows that conflict in the church often arises from?", options: [{ label: "A", text: "False doctrine" }, { label: "B", text: "Pride" }, { label: "C", text: "Miscommunication" }, { label: "D", text: "Leadership struggles" }], correctAnswer: "B", verse: "3 John 1:9", explanation: "Root cause." },
  { id: "3john69", question: "3 John assumes that truth is observable through?", options: [{ label: "A", text: "Confession" }, { label: "B", text: "Behavior" }, { label: "C", text: "Belief" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "3 John 1:3-6", explanation: "Visible faith." },
  { id: "3john70", question: "The letter encourages believers to support ministry without seeking?", options: [{ label: "A", text: "Reward" }, { label: "B", text: "Recognition" }, { label: "C", text: "Control" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "3 John theme", explanation: "Selfless service." },
  { id: "3john71", question: "3 John teaches that faithful believers may be opposed by?", options: [{ label: "A", text: "Unbelievers" }, { label: "B", text: "Leaders" }, { label: "C", text: "Other Christians" }, { label: "D", text: "False teachers" }], correctAnswer: "C", verse: "3 John 1:9-10", explanation: "Internal conflict." },
  { id: "3john72", question: "John's praise of Gaius highlights the value of quiet, consistent?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Leadership" }, { label: "C", text: "Service" }, { label: "D", text: "Teaching" }], correctAnswer: "C", verse: "3 John 1:5-6", explanation: "Faithful service." },
  { id: "3john73", question: "3 John shows that not all authority in the church is?", options: [{ label: "A", text: "Biblical" }, { label: "B", text: "Healthy" }, { label: "C", text: "Godly" }, { label: "D", text: "Right" }], correctAnswer: "B", verse: "3 John 1:9-10", explanation: "Unhealthy leadership." },
  { id: "3john74", question: "The contrast in 3 John encourages believers to evaluate leaders by their?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Authority" }, { label: "C", text: "Fruit" }, { label: "D", text: "Position" }], correctAnswer: "C", verse: "3 John theme", explanation: "Fruit reveals character." },
  { id: "3john75", question: "3 John affirms that hospitality advances the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Mission" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "3 John 1:5-8", explanation: "Missional support." },
  { id: "3john76", question: "John's instruction to imitate good reflects biblical discipleship through?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Modeling" }, { label: "C", text: "Correction" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "3 John 1:11", explanation: "Learning by example." },
  { id: "3john77", question: "3 John demonstrates that truth must guide both belief and?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Action" }, { label: "C", text: "Community" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "3 John theme", explanation: "Truth lived out." },
  { id: "3john78", question: "The letter shows that church conflict often involves questions of?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Authority" }, { label: "C", text: "Hospitality" }, { label: "D", text: "Control" }], correctAnswer: "D", verse: "3 John 1:9-10", explanation: "Control issues." },
  { id: "3john79", question: "3 John encourages believers to side with truth even when it is?", options: [{ label: "A", text: "Costly" }, { label: "B", text: "Unpopular" }, { label: "C", text: "Difficult" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John theme", explanation: "Faithful courage." },
  { id: "3john80", question: "The letter emphasizes that true leadership promotes?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Growth" }, { label: "C", text: "Service" }, { label: "D", text: "Order" }], correctAnswer: "C", verse: "3 John theme", explanation: "Servant leadership." },
  { id: "3john81", question: "3 John shows that unity without truth becomes?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "False" }, { label: "C", text: "Dangerous" }, { label: "D", text: "Meaningless" }], correctAnswer: "B", verse: "3 John theme", explanation: "Truth-based unity." },
  { id: "3john82", question: "The letter highlights that supporting missionaries strengthens the church's?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Mission" }, { label: "C", text: "Witness" }, { label: "D", text: "Growth" }], correctAnswer: "C", verse: "3 John 1:8", explanation: "Public witness." },
  { id: "3john83", question: "3 John teaches that pride-driven leadership isolates rather than?", options: [{ label: "A", text: "Builds" }, { label: "B", text: "Unites" }, { label: "C", text: "Serves" }, { label: "D", text: "Teaches" }], correctAnswer: "B", verse: "3 John 1:9-10", explanation: "Isolation through pride." },
  { id: "3john84", question: "John's encouragement of Gaius shows that faithfulness is often?", options: [{ label: "A", text: "Public" }, { label: "B", text: "Visible" }, { label: "C", text: "Recognized" }, { label: "D", text: "Affirmed" }], correctAnswer: "D", verse: "3 John 1:3-6", explanation: "Encouragement matters." },
  { id: "3john85", question: "3 John reflects early church dependence on personal?", options: [{ label: "A", text: "Networks" }, { label: "B", text: "Leadership" }, { label: "C", text: "Authority" }, { label: "D", text: "Teaching" }], correctAnswer: "A", verse: "3 John 1:5-8", explanation: "Relational networks." },
  { id: "3john86", question: "The letter suggests that truth is best protected through?", options: [{ label: "A", text: "Structure" }, { label: "B", text: "Rules" }, { label: "C", text: "Faithful people" }, { label: "D", text: "Leadership" }], correctAnswer: "C", verse: "3 John theme", explanation: "Faithful lives." },
  { id: "3john87", question: "3 John affirms that church discipline sometimes involves?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Exposure" }, { label: "C", text: "Confrontation" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John 1:9-10", explanation: "Protective discipline." },
  { id: "3john88", question: "The letter teaches that love for the truth results in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Action" }, { label: "C", text: "Hospitality" }, { label: "D", text: "Service" }], correctAnswer: "B", verse: "3 John 1:3-6", explanation: "Truth expressed." },
  { id: "3john89", question: "3 John demonstrates that ministry success is measured by?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Numbers" }, { label: "C", text: "Faithfulness" }, { label: "D", text: "Influence" }], correctAnswer: "C", verse: "3 John 1:3-4", explanation: "Faithfulness matters." },
  { id: "3john90", question: "The letter warns that control-oriented leadership suppresses?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Love" }, { label: "C", text: "Mission" }, { label: "D", text: "Service" }], correctAnswer: "D", verse: "3 John 1:9-10", explanation: "Blocks service." },
  { id: "3john91", question: "3 John encourages believers to align themselves with what is?", options: [{ label: "A", text: "True" }, { label: "B", text: "Good" }, { label: "C", text: "Faithful" }, { label: "D", text: "Right" }], correctAnswer: "B", verse: "3 John 1:11", explanation: "Imitate good." },
  { id: "3john92", question: "The letter shows that Christian community thrives on mutual?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Support" }, { label: "C", text: "Hospitality" }, { label: "D", text: "Trust" }], correctAnswer: "B", verse: "3 John 1:5-8", explanation: "Supporting one another." },
  { id: "3john93", question: "3 John reveals that opposition can arise even within faithful?", options: [{ label: "A", text: "Churches" }, { label: "B", text: "Leaders" }, { label: "C", text: "Communities" }, { label: "D", text: "Families" }], correctAnswer: "A", verse: "3 John 1:9-10", explanation: "Internal opposition." },
  { id: "3john94", question: "The letter emphasizes discernment in following?", options: [{ label: "A", text: "Teachers" }, { label: "B", text: "Leaders" }, { label: "C", text: "Examples" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "3 John 1:11", explanation: "Choose good models." },
  { id: "3john95", question: "3 John underscores that faithfulness often involves unseen?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Service" }, { label: "C", text: "Support" }, { label: "D", text: "Commitment" }], correctAnswer: "B", verse: "3 John 1:5", explanation: "Hidden service." },
  { id: "3john96", question: "The letter highlights that leadership without love becomes?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Controlling" }, { label: "C", text: "Damaging" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "3 John theme", explanation: "Unloving leadership." },
  { id: "3john97", question: "3 John affirms that truth is best preserved through faithful?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Living" }, { label: "C", text: "Leadership" }, { label: "D", text: "Structure" }], correctAnswer: "B", verse: "3 John theme", explanation: "Lived truth." },
  { id: "3john98", question: "The letter closes emphasizing peace rooted in healthy?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Community" }, { label: "C", text: "Leadership" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "3 John 1:15", explanation: "Relational peace." },
  { id: "3john99", question: "3 John ultimately teaches that truth, love, and hospitality must work?", options: [{ label: "A", text: "Together" }, { label: "B", text: "Carefully" }, { label: "C", text: "Faithfully" }, { label: "D", text: "Wisely" }], correctAnswer: "A", verse: "3 John theme", explanation: "Integrated faith." },
  { id: "3john100", question: "The lasting message of 3 John is to support faithful ministry, reject prideful leadership, and walk in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "3 John 1", explanation: "Truth-centered living." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ThirdJohnTriviaPage() {
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

        // Fetch user's progress for 3 john questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "3john");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        // If no questions left, show all questions (allow review)
        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

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
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        // Get username
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

        // Insert into master_actions via server-side API (uses service role)
        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect,
          book: "3john",
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
            isCorrect,
            book: "3john",
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
    if (score === 10) return "Perfect! You're a 3 John expert!";
    if (score >= 8) return "Excellent! You know 3 John well!";
    if (score >= 6) return "Good job! Keep studying 3 John!";
    if (score >= 4) return "Nice try! 3 John has much to explore!";
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
              href="/bible-trivia/3-john"
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





