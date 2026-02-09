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
  { id: "2peter1", question: "Who is identified as the author of 2 Peter?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "James" }, { label: "C", text: "Simon Peter" }, { label: "D", text: "John" }], correctAnswer: "C", verse: "2 Peter 1:1", explanation: "The letter opens identifying Simon Peter as the author." },
  { id: "2peter2", question: "Peter describes himself as a servant and apostle of whom?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Messiah" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "The Lord" }], correctAnswer: "C", verse: "2 Peter 1:1", explanation: "Peter affirms his authority in Christ." },
  { id: "2peter3", question: "Grace and peace are multiplied through knowledge of God and whom?", options: [{ label: "A", text: "The Spirit" }, { label: "B", text: "The Word" }, { label: "C", text: "Jesus our Lord" }, { label: "D", text: "The Father" }], correctAnswer: "C", verse: "2 Peter 1:2", explanation: "Knowing Christ deepens grace." },
  { id: "2peter4", question: "God's divine power has given believers everything needed for what?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "A godly life" }, { label: "C", text: "Faith" }, { label: "D", text: "Righteousness" }], correctAnswer: "B", verse: "2 Peter 1:3", explanation: "God supplies what believers need." },
  { id: "2peter5", question: "Believers are called by God's own glory and what?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Power" }, { label: "C", text: "Goodness" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Peter 1:3", explanation: "God's goodness draws believers." },
  { id: "2peter6", question: "God's promises enable believers to participate in what?", options: [{ label: "A", text: "Eternal life" }, { label: "B", text: "Divine nature" }, { label: "C", text: "Spiritual gifts" }, { label: "D", text: "Heavenly calling" }], correctAnswer: "B", verse: "2 Peter 1:4", explanation: "Transformation through God's promises." },
  { id: "2peter7", question: "Believers escape corruption caused by what?", options: [{ label: "A", text: "Sinful people" }, { label: "B", text: "Evil desires" }, { label: "C", text: "False teaching" }, { label: "D", text: "The world" }], correctAnswer: "B", verse: "2 Peter 1:4", explanation: "Sinful desires corrupt life." },
  { id: "2peter8", question: "Peter urges believers to add what to their faith?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Goodness" }, { label: "C", text: "Love" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Peter 1:5", explanation: "Moral excellence matters." },
  { id: "2peter9", question: "To goodness believers should add what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Self-control" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Perseverance" }], correctAnswer: "C", verse: "2 Peter 1:5", explanation: "Growing in understanding." },
  { id: "2peter10", question: "To knowledge believers should add what?", options: [{ label: "A", text: "Self-control" }, { label: "B", text: "Love" }, { label: "C", text: "Faith" }, { label: "D", text: "Goodness" }], correctAnswer: "A", verse: "2 Peter 1:6", explanation: "Discipline follows knowledge." },
  { id: "2peter11", question: "To self-control believers should add what?", options: [{ label: "A", text: "Godliness" }, { label: "B", text: "Faith" }, { label: "C", text: "Perseverance" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "2 Peter 1:6", explanation: "Endurance in faith." },
  { id: "2peter12", question: "To perseverance believers should add what?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Godliness" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Peter 1:6", explanation: "God-centered life." },
  { id: "2peter13", question: "To godliness believers should add what?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Mutual affection" }, { label: "C", text: "Faith" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "2 Peter 1:7", explanation: "Brotherly kindness." },
  { id: "2peter14", question: "To mutual affection believers should add what?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Peter 1:7", explanation: "Agape love." },
  { id: "2peter15", question: "If these qualities increase, believers will be effective and what?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Fruitful" }, { label: "C", text: "Faithful" }, { label: "D", text: "Mature" }], correctAnswer: "B", verse: "2 Peter 1:8", explanation: "Productive faith." },
  { id: "2peter16", question: "Those lacking these qualities are blind and have forgotten they were what?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Chosen" }, { label: "C", text: "Cleansed" }, { label: "D", text: "Called" }], correctAnswer: "C", verse: "2 Peter 1:9", explanation: "Forgotten cleansing." },
  { id: "2peter17", question: "Believers are urged to confirm their calling and what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Election" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "2 Peter 1:10", explanation: "Assurance through growth." },
  { id: "2peter18", question: "Practicing these qualities keeps believers from what?", options: [{ label: "A", text: "Failing" }, { label: "B", text: "Falling" }, { label: "C", text: "Doubting" }, { label: "D", text: "Sinning" }], correctAnswer: "B", verse: "2 Peter 1:10", explanation: "Stability in faith." },
  { id: "2peter19", question: "Believers receive a rich welcome into the eternal kingdom of Jesus Christ our what?", options: [{ label: "A", text: "King" }, { label: "B", text: "Savior" }, { label: "C", text: "Lord" }, { label: "D", text: "Messiah" }], correctAnswer: "B", verse: "2 Peter 1:11", explanation: "Eternal inheritance." },
  { id: "2peter20", question: "Peter says he will always remind believers of these things even though they already what?", options: [{ label: "A", text: "Practice them" }, { label: "B", text: "Understand them" }, { label: "C", text: "Know them" }, { label: "D", text: "Believe them" }], correctAnswer: "C", verse: "2 Peter 1:12", explanation: "Reminder ministry." },
  { id: "2peter21", question: "Peter refers to his body as a what?", options: [{ label: "A", text: "House" }, { label: "B", text: "Tent" }, { label: "C", text: "Vessel" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "2 Peter 1:13", explanation: "Temporary life." },
  { id: "2peter22", question: "Peter knows he will soon put aside his what?", options: [{ label: "A", text: "Ministry" }, { label: "B", text: "Body" }, { label: "C", text: "Tent" }, { label: "D", text: "Work" }], correctAnswer: "C", verse: "2 Peter 1:14", explanation: "Impending death." },
  { id: "2peter23", question: "Peter wants believers to recall his teaching after his what?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Passing" }, { label: "C", text: "Departure" }, { label: "D", text: "Absence" }], correctAnswer: "C", verse: "2 Peter 1:15", explanation: "Lasting reminder." },
  { id: "2peter24", question: "Peter says he did not follow cleverly devised what?", options: [{ label: "A", text: "Ideas" }, { label: "B", text: "Stories" }, { label: "C", text: "Plans" }, { label: "D", text: "Myths" }], correctAnswer: "D", verse: "2 Peter 1:16", explanation: "Truthful testimony." },
  { id: "2peter25", question: "Peter was an eyewitness of Christ's what?", options: [{ label: "A", text: "Resurrection" }, { label: "B", text: "Miracles" }, { label: "C", text: "Glory" }, { label: "D", text: "Suffering" }], correctAnswer: "C", verse: "2 Peter 1:16", explanation: "Transfiguration." },
  { id: "2peter26", question: "A voice from heaven declared Jesus as God's what?", options: [{ label: "A", text: "Chosen One" }, { label: "B", text: "Son" }, { label: "C", text: "Beloved Son" }, { label: "D", text: "Servant" }], correctAnswer: "C", verse: "2 Peter 1:17", explanation: "Divine approval." },
  { id: "2peter27", question: "Peter says the prophetic message is completely what?", options: [{ label: "A", text: "True" }, { label: "B", text: "Reliable" }, { label: "C", text: "Perfect" }, { label: "D", text: "Clear" }], correctAnswer: "B", verse: "2 Peter 1:19", explanation: "Scripture trustworthy." },
  { id: "2peter28", question: "Prophecy is compared to a light shining in a what?", options: [{ label: "A", text: "Dark place" }, { label: "B", text: "Hidden room" }, { label: "C", text: "Cloudy sky" }, { label: "D", text: "Night land" }], correctAnswer: "A", verse: "2 Peter 1:19", explanation: "Guiding truth." },
  { id: "2peter29", question: "No prophecy came by the prophet's own what?", options: [{ label: "A", text: "Understanding" }, { label: "B", text: "Will" }, { label: "C", text: "Interpretation" }, { label: "D", text: "Knowledge" }], correctAnswer: "C", verse: "2 Peter 1:20", explanation: "Divine origin." },
  { id: "2peter30", question: "Prophets spoke from God as they were carried along by whom?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The Spirit" }, { label: "C", text: "The Word" }, { label: "D", text: "God" }], correctAnswer: "B", verse: "2 Peter 1:21", explanation: "Holy Spirit inspiration." },
  { id: "2peter31", question: "Peter warns that false teachers will secretly introduce destructive what?", options: [{ label: "A", text: "Practices" }, { label: "B", text: "Heresies" }, { label: "C", text: "Ideas" }, { label: "D", text: "Beliefs" }], correctAnswer: "B", verse: "2 Peter 2:1", explanation: "False doctrine danger." },
  { id: "2peter32", question: "These teachers deny the sovereign what?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "Master" }, { label: "D", text: "Lord" }], correctAnswer: "C", verse: "2 Peter 2:1", explanation: "Rejecting authority." },
  { id: "2peter33", question: "Many will follow their depraved conduct bringing the way of truth into what?", options: [{ label: "A", text: "Disgrace" }, { label: "B", text: "Mockery" }, { label: "C", text: "Disrepute" }, { label: "D", text: "Shame" }], correctAnswer: "C", verse: "2 Peter 2:2", explanation: "Truth dishonored." },
  { id: "2peter34", question: "False teachers exploit believers with fabricated what?", options: [{ label: "A", text: "Promises" }, { label: "B", text: "Stories" }, { label: "C", text: "Words" }, { label: "D", text: "Teachings" }], correctAnswer: "C", verse: "2 Peter 2:3", explanation: "Manipulative speech." },
  { id: "2peter35", question: "God did not spare angels when they what?", options: [{ label: "A", text: "Fell" }, { label: "B", text: "Sinned" }, { label: "C", text: "Rebelled" }, { label: "D", text: "Disobeyed" }], correctAnswer: "B", verse: "2 Peter 2:4", explanation: "Judgment on angels." },
  { id: "2peter36", question: "God spared Noah, a preacher of what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Judgment" }, { label: "C", text: "Righteousness" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Peter 2:5", explanation: "Righteous witness." },
  { id: "2peter37", question: "God condemned Sodom and Gomorrah as an example for the what?", options: [{ label: "A", text: "Wicked" }, { label: "B", text: "Ungodly" }, { label: "C", text: "Unfaithful" }, { label: "D", text: "Lawless" }], correctAnswer: "B", verse: "2 Peter 2:6", explanation: "Warning example." },
  { id: "2peter38", question: "Lot was distressed by the depraved conduct of the what?", options: [{ label: "A", text: "Wicked" }, { label: "B", text: "Lawless" }, { label: "C", text: "Ungodly" }, { label: "D", text: "Sinners" }], correctAnswer: "B", verse: "2 Peter 2:7", explanation: "Moral grief." },
  { id: "2peter39", question: "The Lord knows how to rescue the godly from trials and hold the unrighteous for punishment on the day of what?", options: [{ label: "A", text: "Wrath" }, { label: "B", text: "Judgment" }, { label: "C", text: "Justice" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "2 Peter 2:9", explanation: "God's justice." },
  { id: "2peter40", question: "False teachers follow corrupt desire and despise what?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Authority" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "2 Peter 2:10", explanation: "Rebellion." },
  { id: "2peter41", question: "False teachers are described as bold and what?", options: [{ label: "A", text: "Proud" }, { label: "B", text: "Arrogant" }, { label: "C", text: "Fearless" }, { label: "D", text: "Defiant" }], correctAnswer: "B", verse: "2 Peter 2:10", explanation: "Arrogant attitude." },
  { id: "2peter42", question: "Unlike angels, false teachers slander celestial beings without what?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Fear" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "2 Peter 2:11", explanation: "Lack of reverence." },
  { id: "2peter43", question: "False teachers are compared to unreasoning animals born to be what?", options: [{ label: "A", text: "Judged" }, { label: "B", text: "Captured" }, { label: "C", text: "Destroyed" }, { label: "D", text: "Condemned" }], correctAnswer: "C", verse: "2 Peter 2:12", explanation: "Harsh imagery." },
  { id: "2peter44", question: "They are blots and blemishes while feasting with whom?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Churches" }, { label: "C", text: "You" }, { label: "D", text: "Others" }], correctAnswer: "C", verse: "2 Peter 2:13", explanation: "Corrupt influence." },
  { id: "2peter45", question: "They never stop what?", options: [{ label: "A", text: "Deceiving" }, { label: "B", text: "Sinning" }, { label: "C", text: "Lying" }, { label: "D", text: "Tempting" }], correctAnswer: "B", verse: "2 Peter 2:14", explanation: "Persistent sin." },
  { id: "2peter46", question: "False teachers entice those who are just escaping from people living in what?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Error" }, { label: "C", text: "Darkness" }, { label: "D", text: "Deception" }], correctAnswer: "B", verse: "2 Peter 2:18", explanation: "Danger to new believers." },
  { id: "2peter47", question: "They promise freedom while being slaves of what?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Desire" }, { label: "C", text: "Corruption" }, { label: "D", text: "Flesh" }], correctAnswer: "C", verse: "2 Peter 2:19", explanation: "False freedom." },
  { id: "2peter48", question: "People are slaves to whatever has what them?", options: [{ label: "A", text: "Controlled" }, { label: "B", text: "Overcome" }, { label: "C", text: "Mastered" }, { label: "D", text: "Ruled" }], correctAnswer: "C", verse: "2 Peter 2:19", explanation: "Spiritual bondage." },
  { id: "2peter49", question: "Returning to sin is compared to a dog returning to its what?", options: [{ label: "A", text: "Mess" }, { label: "B", text: "Vomit" }, { label: "C", text: "Food" }, { label: "D", text: "Kennel" }], correctAnswer: "B", verse: "2 Peter 2:22", explanation: "Graphic warning." },
  { id: "2peter50", question: "It would be better not to have known the way of what?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Righteousness" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "2 Peter 2:21", explanation: "Serious accountability." },
  { id: "2peter51", question: "Peter writes to stimulate wholesome thinking by way of what?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Reminder" }, { label: "C", text: "Correction" }, { label: "D", text: "Encouragement" }], correctAnswer: "B", verse: "2 Peter 3:1", explanation: "Reminder purpose." },
  { id: "2peter52", question: "Scoffers will come in the last days following their own what?", options: [{ label: "A", text: "Ways" }, { label: "B", text: "Beliefs" }, { label: "C", text: "Desires" }, { label: "D", text: "Plans" }], correctAnswer: "C", verse: "2 Peter 3:3", explanation: "Self-centered living." },
  { id: "2peter53", question: "Scoffers question the promise of Christ's what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "2 Peter 3:4", explanation: "Doubt of second coming." },
  { id: "2peter54", question: "The world was formed by God's what?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Will" }, { label: "C", text: "Word" }, { label: "D", text: "Command" }], correctAnswer: "C", verse: "2 Peter 3:5", explanation: "Creation by word." },
  { id: "2peter55", question: "The ancient world was destroyed by what?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Judgment" }, { label: "C", text: "Flood" }, { label: "D", text: "Wrath" }], correctAnswer: "C", verse: "2 Peter 3:6", explanation: "Flood judgment." },
  { id: "2peter56", question: "The present heavens and earth are reserved for what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Fire" }, { label: "C", text: "Renewal" }, { label: "D", text: "Destruction" }], correctAnswer: "B", verse: "2 Peter 3:7", explanation: "Future judgment." },
  { id: "2peter57", question: "With the Lord one day is like how many years?", options: [{ label: "A", text: "Ten" }, { label: "B", text: "A hundred" }, { label: "C", text: "A thousand" }, { label: "D", text: "Forever" }], correctAnswer: "C", verse: "2 Peter 3:8", explanation: "God's perspective." },
  { id: "2peter58", question: "The Lord is patient, not wanting anyone to do what?", options: [{ label: "A", text: "Fail" }, { label: "B", text: "Suffer" }, { label: "C", text: "Perish" }, { label: "D", text: "Fall" }], correctAnswer: "C", verse: "2 Peter 3:9", explanation: "Time for repentance." },
  { id: "2peter59", question: "The day of the Lord will come like a what?", options: [{ label: "A", text: "Storm" }, { label: "B", text: "Fire" }, { label: "C", text: "Flood" }, { label: "D", text: "Thief" }], correctAnswer: "D", verse: "2 Peter 3:10", explanation: "Sudden arrival." },
  { id: "2peter60", question: "Believers should live holy and what lives?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Righteous" }, { label: "C", text: "Godly" }, { label: "D", text: "Blameless" }], correctAnswer: "C", verse: "2 Peter 3:11", explanation: "God-centered living." },
  { id: "2peter61", question: "Believers look forward to a new heaven and new earth where righteousness does what?", options: [{ label: "A", text: "Rules" }, { label: "B", text: "Lives" }, { label: "C", text: "Dwells" }, { label: "D", text: "Reigns" }], correctAnswer: "C", verse: "2 Peter 3:13", explanation: "Righteous dwelling." },
  { id: "2peter62", question: "Believers should be found spotless, blameless, and at what?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Peace" }, { label: "C", text: "Hope" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Peter 3:14", explanation: "Peaceful readiness." },
  { id: "2peter63", question: "Peter says Paul's letters contain things hard to what?", options: [{ label: "A", text: "Accept" }, { label: "B", text: "Explain" }, { label: "C", text: "Understand" }, { label: "D", text: "Believe" }], correctAnswer: "C", verse: "2 Peter 3:16", explanation: "Scriptural depth." },
  { id: "2peter64", question: "Unstable people distort Scripture to their own what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Condemnation" }, { label: "C", text: "Destruction" }, { label: "D", text: "Punishment" }], correctAnswer: "C", verse: "2 Peter 3:16", explanation: "Serious warning." },
  { id: "2peter65", question: "Believers are warned not to be carried away by the error of the what?", options: [{ label: "A", text: "Wicked" }, { label: "B", text: "Ungodly" }, { label: "C", text: "Lawless" }, { label: "D", text: "False" }], correctAnswer: "C", verse: "2 Peter 3:17", explanation: "Spiritual vigilance." },
  { id: "2peter66", question: "Believers should grow in grace and knowledge of Jesus Christ our what?", options: [{ label: "A", text: "King" }, { label: "B", text: "Lord and Savior" }, { label: "C", text: "Redeemer" }, { label: "D", text: "Messiah" }], correctAnswer: "B", verse: "2 Peter 3:18", explanation: "Balanced growth." },
  { id: "2peter67", question: "Peter gives glory to Christ both now and to the day of what?", options: [{ label: "A", text: "Return" }, { label: "B", text: "Judgment" }, { label: "C", text: "Eternity" }, { label: "D", text: "Glory" }], correctAnswer: "C", verse: "2 Peter 3:18", explanation: "Eternal praise." },
  { id: "2peter68", question: "A central theme of 2 Peter is warning against what?", options: [{ label: "A", text: "Persecution" }, { label: "B", text: "False teaching" }, { label: "C", text: "Complacency" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "2 Peter 2", explanation: "Doctrinal vigilance." },
  { id: "2peter69", question: "Peter emphasizes growth as evidence of true what?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Faith" }, { label: "C", text: "Grace" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Peter 1", explanation: "Living faith." },
  { id: "2peter70", question: "Peter links Scripture's authority to its what?", options: [{ label: "A", text: "Accuracy" }, { label: "B", text: "Consistency" }, { label: "C", text: "Divine origin" }, { label: "D", text: "Power" }], correctAnswer: "C", verse: "2 Peter 1:21", explanation: "God-inspired Scripture." },
  { id: "2peter71", question: "False teachers are motivated by what?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Greed" }, { label: "C", text: "Pride" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "2 Peter 2:3", explanation: "Financial exploitation." },
  { id: "2peter72", question: "Peter uses past judgments to show God's ability to do what?", options: [{ label: "A", text: "Save" }, { label: "B", text: "Judge" }, { label: "C", text: "Restore" }, { label: "D", text: "Protect" }], correctAnswer: "B", verse: "2 Peter 2-3", explanation: "God's justice." },
  { id: "2peter73", question: "Peter urges believers to live in expectation of Christ's what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "2 Peter 3", explanation: "Second coming." },
  { id: "2peter74", question: "The delay of Christ's return is explained as God's what?", options: [{ label: "A", text: "Plan" }, { label: "B", text: "Mercy" }, { label: "C", text: "Patience" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "2 Peter 3:9", explanation: "Time for repentance." },
  { id: "2peter75", question: "Everything will ultimately be what?", options: [{ label: "A", text: "Judged" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Renewed" }, { label: "D", text: "Tested" }], correctAnswer: "B", verse: "2 Peter 3:10", explanation: "Temporary world." },
  { id: "2peter76", question: "Believers are encouraged to be diligent and what?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Watchful" }, { label: "C", text: "Blameless" }, { label: "D", text: "Strong" }], correctAnswer: "C", verse: "2 Peter 3:14", explanation: "Moral diligence." },
  { id: "2peter77", question: "Peter refers to Paul as a beloved what?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Brother" }, { label: "C", text: "Apostle" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "2 Peter 3:15", explanation: "Apostolic unity." },
  { id: "2peter78", question: "Believers should guard themselves so they do not fall from their secure what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Standing" }, { label: "C", text: "Position" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Peter 3:17", explanation: "Spiritual stability." },
  { id: "2peter79", question: "Peter's final command is to grow in grace and what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Peter 3:18", explanation: "Balanced growth." },
  { id: "2peter80", question: "Peter attributes eternal glory to Jesus Christ now and forever, ending with what word?", options: [{ label: "A", text: "Amen" }, { label: "B", text: "So be it" }, { label: "C", text: "Hallelujah" }, { label: "D", text: "Praise" }], correctAnswer: "A", verse: "2 Peter 3:18", explanation: "Formal conclusion." },
  { id: "2peter81", question: "The purpose of 2 Peter includes strengthening believers against doctrinal what?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Error" }, { label: "C", text: "Division" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "2 Peter 2", explanation: "Protecting truth." },
  { id: "2peter82", question: "Peter emphasizes remembrance to guard believers from spiritual what?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Drift" }, { label: "C", text: "Failure" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "2 Peter 1:12", explanation: "Staying grounded." },
  { id: "2peter83", question: "Peter contrasts false teachers with righteous examples like whom?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Noah" }, { label: "C", text: "Moses" }, { label: "D", text: "David" }], correctAnswer: "B", verse: "2 Peter 2:5", explanation: "Righteous remnant." },
  { id: "2peter84", question: "Peter connects hope with expectation of a righteous what?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "World" }, { label: "C", text: "Earth" }, { label: "D", text: "Future" }], correctAnswer: "C", verse: "2 Peter 3:13", explanation: "New creation." },
  { id: "2peter85", question: "Peter repeatedly calls believers to spiritual what?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Discipline" }, { label: "C", text: "Watchfulness" }, { label: "D", text: "Strength" }], correctAnswer: "A", verse: "2 Peter 1", explanation: "Growing faith." },
  { id: "2peter86", question: "False teachers distort truth for their own what?", options: [{ label: "A", text: "Gain" }, { label: "B", text: "Power" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Control" }], correctAnswer: "A", verse: "2 Peter 2:3", explanation: "Greed motive." },
  { id: "2peter87", question: "Peter emphasizes that Scripture originates from whom?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Apostles" }, { label: "C", text: "God" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "2 Peter 1:21", explanation: "Divine inspiration." },
  { id: "2peter88", question: "The certainty of judgment motivates believers toward what?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Holiness" }, { label: "C", text: "Obedience" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "2 Peter 3:11", explanation: "Holy living." },
  { id: "2peter89", question: "Peter warns believers to stay alert because error can cause spiritual what?", options: [{ label: "A", text: "Loss" }, { label: "B", text: "Drift" }, { label: "C", text: "Collapse" }, { label: "D", text: "Blindness" }], correctAnswer: "B", verse: "2 Peter 3:17", explanation: "Vigilance required." },
  { id: "2peter90", question: "Peter's closing focus is growth, knowledge, and steadfast what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Truth" }, { label: "D", text: "Grace" }], correctAnswer: "D", verse: "2 Peter 3:18", explanation: "Living in grace." },
  { id: "2peter91", question: "2 Peter strongly affirms the reliability of what?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Experience" }, { label: "C", text: "Scripture" }, { label: "D", text: "Vision" }], correctAnswer: "C", verse: "2 Peter 1", explanation: "Scriptural authority." },
  { id: "2peter92", question: "Peter encourages believers to remain stable amid false what?", options: [{ label: "A", text: "Beliefs" }, { label: "B", text: "Teachers" }, { label: "C", text: "Doctrines" }, { label: "D", text: "Influences" }], correctAnswer: "B", verse: "2 Peter 2", explanation: "False teacher warning." },
  { id: "2peter93", question: "Peter uses past examples to demonstrate God's consistency in what?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Judgment" }, { label: "C", text: "Grace" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "2 Peter 2-3", explanation: "Consistent justice." },
  { id: "2peter94", question: "Peter's letter balances warning with encouragement toward what?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Hope" }, { label: "C", text: "Faith" }, { label: "D", text: "Holiness" }], correctAnswer: "A", verse: "2 Peter 1-3", explanation: "Balanced message." },
  { id: "2peter95", question: "Believers are reminded that God's timing differs from what?", options: [{ label: "A", text: "Human plans" }, { label: "B", text: "Human expectations" }, { label: "C", text: "Human logic" }, { label: "D", text: "Human wisdom" }], correctAnswer: "B", verse: "2 Peter 3:8", explanation: "Divine perspective." },
  { id: "2peter96", question: "Peter emphasizes perseverance until Christ's what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Return" }, { label: "D", text: "Glory" }], correctAnswer: "C", verse: "2 Peter 3", explanation: "Awaiting Christ." },
  { id: "2peter97", question: "The expectation of a new creation motivates believers toward what kind of life?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Holy" }, { label: "C", text: "Disciplined" }, { label: "D", text: "Obedient" }], correctAnswer: "B", verse: "2 Peter 3:11", explanation: "Holy living." },
  { id: "2peter98", question: "Peter's teaching highlights accountability for those who distort what?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Scripture" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Peter 3:16", explanation: "Serious warning." },
  { id: "2peter99", question: "The overarching warning of 2 Peter is against spiritual complacency and what?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "False teaching" }, { label: "C", text: "Sin" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "2 Peter 2-3", explanation: "Core danger." },
  { id: "2peter100", question: "The final call of 2 Peter is to grow in Christ and remain steadfast until His what?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "2 Peter 3:18", explanation: "Faithful perseverance." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondPeterTriviaPage() {
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
        
        // Fetch user's progress for 2 peter questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', '2peter');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: '2peter' });
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
            book: '2peter'
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
    if (score === 10) return "Perfect! You're a 2 Peter expert!";
    if (score >= 8) return "Excellent! You know 2 Peter well!";
    if (score >= 6) return "Good job! Keep studying 2 Peter!";
    if (score >= 4) return "Nice try! 2 Peter has much to explore!";
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
              href="/bible-trivia/2-peter"
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
