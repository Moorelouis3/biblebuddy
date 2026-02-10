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
  { id: "philippians1", question: "Who wrote the book of Philippians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "Philippians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "philippians2", question: "To whom is Philippians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Church in Philippi" }, { label: "C", text: "Church in Corinth" }, { label: "D", text: "Church in Thessalonica" }], correctAnswer: "B", verse: "Philippians 1:1", explanation: "Addressed to believers in Philippi." },
  { id: "philippians3", question: "Paul writes Philippians while he is?", options: [{ label: "A", text: "Traveling" }, { label: "B", text: "Imprisoned" }, { label: "C", text: "Preaching freely" }, { label: "D", text: "In hiding" }], correctAnswer: "B", verse: "Philippians 1:7", explanation: "Written during imprisonment." },
  { id: "philippians4", question: "Paul thanks God every time he remembers the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Philippians" }, { label: "C", text: "Apostles" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "Philippians 1:3", explanation: "Affection for the church." },
  { id: "philippians5", question: "Paul prays that their love may abound in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Knowledge and depth of insight" }, { label: "C", text: "Grace" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Philippians 1:9", explanation: "Growing discernment." },
  { id: "philippians6", question: "He who began a good work will?", options: [{ label: "A", text: "Bless it" }, { label: "B", text: "Carry it on to completion" }, { label: "C", text: "Reward it" }, { label: "D", text: "Test it" }], correctAnswer: "B", verse: "Philippians 1:6", explanation: "God completes His work." },
  { id: "philippians7", question: "Paul’s imprisonment has served to advance the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Gospel" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philippians 1:12", explanation: "God uses hardship." },
  { id: "philippians8", question: "Paul says to live is Christ and to die is?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Gain" }, { label: "C", text: "Hope" }, { label: "D", text: "Rest" }], correctAnswer: "B", verse: "Philippians 1:21", explanation: "Christ-centered life." },
  { id: "philippians9", question: "Paul desires to depart and be with?", options: [{ label: "A", text: "God" }, { label: "B", text: "Christ" }, { label: "C", text: "Heaven" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Philippians 1:23", explanation: "Eternal hope." },
  { id: "philippians10", question: "Believers should conduct themselves in a manner worthy of the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Church" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "Philippians 1:27", explanation: "Gospel-centered life." },
  { id: "philippians11", question: "Believers should stand firm in one?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Spirit" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Philippians 1:27", explanation: "Unity." },
  { id: "philippians12", question: "Paul urges believers to be of the same?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Mind" }, { label: "C", text: "Spirit" }, { label: "D", text: "Purpose" }], correctAnswer: "B", verse: "Philippians 2:2", explanation: "Unity in mindset." },
  { id: "philippians13", question: "Believers should do nothing out of selfish?", options: [{ label: "A", text: "Ambition" }, { label: "B", text: "Pride" }, { label: "C", text: "Desire" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "Philippians 2:3", explanation: "Humility." },
  { id: "philippians14", question: "In humility, value others above?", options: [{ label: "A", text: "Family" }, { label: "B", text: "Yourselves" }, { label: "C", text: "Friends" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "Philippians 2:3", explanation: "Christlike attitude." },
  { id: "philippians15", question: "Believers should have the same mindset as?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The apostles" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "Philippians 2:5", explanation: "Model of humility." },
  { id: "philippians16", question: "Christ did not consider equality with God something to be?", options: [{ label: "A", text: "Achieved" }, { label: "B", text: "Used to His advantage" }, { label: "C", text: "Claimed" }, { label: "D", text: "Defended" }], correctAnswer: "B", verse: "Philippians 2:6", explanation: "Self-emptying." },
  { id: "philippians17", question: "Christ took the form of a?", options: [{ label: "A", text: "Man" }, { label: "B", text: "Servant" }, { label: "C", text: "Human" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "Philippians 2:7", explanation: "Servanthood." },
  { id: "philippians18", question: "Christ humbled Himself by becoming obedient to death, even death on a?", options: [{ label: "A", text: "Tree" }, { label: "B", text: "Cross" }, { label: "C", text: "Stake" }, { label: "D", text: "Hill" }], correctAnswer: "B", verse: "Philippians 2:8", explanation: "Ultimate obedience." },
  { id: "philippians19", question: "God exalted Christ and gave Him the name above every?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Name" }, { label: "C", text: "Authority" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Philippians 2:9", explanation: "Supreme name." },
  { id: "philippians20", question: "Every knee will bow at the name of?", options: [{ label: "A", text: "God" }, { label: "B", text: "Jesus" }, { label: "C", text: "Christ" }, { label: "D", text: "The Lord" }], correctAnswer: "B", verse: "Philippians 2:10", explanation: "Universal lordship." },
  { id: "philippians21", question: "Every tongue will confess that Jesus Christ is?", options: [{ label: "A", text: "King" }, { label: "B", text: "Lord" }, { label: "C", text: "Savior" }, { label: "D", text: "God" }], correctAnswer: "B", verse: "Philippians 2:11", explanation: "Lordship confessed." },
  { id: "philippians22", question: "Believers are to work out their salvation with fear and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Trembling" }, { label: "C", text: "Hope" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Philippians 2:12", explanation: "Reverent obedience." },
  { id: "philippians23", question: "It is God who works in you to will and to?", options: [{ label: "A", text: "Serve" }, { label: "B", text: "Act" }, { label: "C", text: "Believe" }, { label: "D", text: "Obey" }], correctAnswer: "B", verse: "Philippians 2:13", explanation: "God’s work within." },
  { id: "philippians24", question: "Believers should do everything without?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Complaining or arguing" }, { label: "C", text: "Pride" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "Philippians 2:14", explanation: "Gracious living." },
  { id: "philippians25", question: "Believers shine like?", options: [{ label: "A", text: "Lights" }, { label: "B", text: "Stars" }, { label: "C", text: "Torches" }, { label: "D", text: "Lamps" }], correctAnswer: "A", verse: "Philippians 2:15", explanation: "Witness to the world." },
  { id: "philippians26", question: "Paul hopes to send?", options: [{ label: "A", text: "Titus" }, { label: "B", text: "Timothy" }, { label: "C", text: "Barnabas" }, { label: "D", text: "Silas" }], correctAnswer: "B", verse: "Philippians 2:19", explanation: "Trusted companion." },
  { id: "philippians27", question: "Paul describes Timothy as having a genuine concern for?", options: [{ label: "A", text: "The gospel" }, { label: "B", text: "Their welfare" }, { label: "C", text: "The church" }, { label: "D", text: "His mission" }], correctAnswer: "B", verse: "Philippians 2:20", explanation: "Pastoral care." },
  { id: "philippians28", question: "Paul also sends?", options: [{ label: "A", text: "Luke" }, { label: "B", text: "Epaphroditus" }, { label: "C", text: "Silas" }, { label: "D", text: "Titus" }], correctAnswer: "B", verse: "Philippians 2:25", explanation: "Faithful servant." },
  { id: "philippians29", question: "Epaphroditus nearly died for the work of?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Christ" }, { label: "C", text: "The gospel" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Philippians 2:30", explanation: "Sacrificial service." },
  { id: "philippians30", question: "Paul urges believers to rejoice in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Lord" }, { label: "C", text: "Gospel" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Philippians 3:1", explanation: "Joy in the Lord." },
  { id: "philippians31", question: "Paul warns against dogs, evildoers, and those who mutilate the?", options: [{ label: "A", text: "Body" }, { label: "B", text: "Flesh" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philippians 3:2", explanation: "False teachers." },
  { id: "philippians32", question: "True circumcision worships by the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Spirit of God" }, { label: "C", text: "Faith" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Philippians 3:3", explanation: "Spiritual worship." },
  { id: "philippians33", question: "Paul counts his former credentials as?", options: [{ label: "A", text: "Important" }, { label: "B", text: "Loss" }, { label: "C", text: "Gain" }, { label: "D", text: "Secondary" }], correctAnswer: "B", verse: "Philippians 3:7", explanation: "Christ above all." },
  { id: "philippians34", question: "Paul considers everything garbage compared to knowing?", options: [{ label: "A", text: "God" }, { label: "B", text: "Christ" }, { label: "C", text: "The truth" }, { label: "D", text: "The gospel" }], correctAnswer: "B", verse: "Philippians 3:8", explanation: "Supreme value." },
  { id: "philippians35", question: "Righteousness comes through?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith in Christ" }, { label: "C", text: "Works" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Philippians 3:9", explanation: "Justification by faith." },
  { id: "philippians36", question: "Paul wants to know Christ and the power of His?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Resurrection" }, { label: "C", text: "Spirit" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Philippians 3:10", explanation: "Resurrection power." },
  { id: "philippians37", question: "Paul presses on toward the?", options: [{ label: "A", text: "Prize" }, { label: "B", text: "Goal" }, { label: "C", text: "Finish" }, { label: "D", text: "Crown" }], correctAnswer: "B", verse: "Philippians 3:14", explanation: "Spiritual pursuit." },
  { id: "philippians38", question: "The prize is the upward call of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God in Christ Jesus" }, { label: "C", text: "Salvation" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Philippians 3:14", explanation: "Heavenly calling." },
  { id: "philippians39", question: "Paul encourages believers to follow his?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Example" }, { label: "C", text: "Teaching" }, { label: "D", text: "Life" }], correctAnswer: "B", verse: "Philippians 3:17", explanation: "Imitation." },
  { id: "philippians40", question: "Many live as enemies of the cross with their god being their?", options: [{ label: "A", text: "Heart" }, { label: "B", text: "Stomach" }, { label: "C", text: "Mind" }, { label: "D", text: "Desire" }], correctAnswer: "B", verse: "Philippians 3:19", explanation: "Earthly focus." },
  { id: "philippians41", question: "Believers’ citizenship is in?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Christ" }, { label: "C", text: "The kingdom" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "Philippians 3:20", explanation: "Heavenly identity." },
  { id: "philippians42", question: "Christ will transform our lowly bodies to be like His?", options: [{ label: "A", text: "Perfect body" }, { label: "B", text: "Glorious body" }, { label: "C", text: "Eternal body" }, { label: "D", text: "Spiritual body" }], correctAnswer: "B", verse: "Philippians 3:21", explanation: "Future transformation." },
  { id: "philippians43", question: "Paul urges Euodia and Syntyche to?", options: [{ label: "A", text: "Serve" }, { label: "B", text: "Agree in the Lord" }, { label: "C", text: "Repent" }, { label: "D", text: "Forgive" }], correctAnswer: "B", verse: "Philippians 4:2", explanation: "Unity call." },
  { id: "philippians44", question: "Believers are commanded to rejoice in the Lord?", options: [{ label: "A", text: "Always" }, { label: "B", text: "Often" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Daily" }], correctAnswer: "A", verse: "Philippians 4:4", explanation: "Constant joy." },
  { id: "philippians45", question: "The Lord is?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Near" }, { label: "C", text: "Powerful" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "Philippians 4:5", explanation: "God’s closeness." },
  { id: "philippians46", question: "Believers should not be anxious about?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Anything" }, { label: "C", text: "Life" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philippians 4:6", explanation: "Freedom from anxiety." },
  { id: "philippians47", question: "Prayer should include petition and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Thanksgiving" }, { label: "C", text: "Hope" }, { label: "D", text: "Confession" }], correctAnswer: "B", verse: "Philippians 4:6", explanation: "Thankful prayer." },
  { id: "philippians48", question: "God’s peace transcends all?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Understanding" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Thought" }], correctAnswer: "B", verse: "Philippians 4:7", explanation: "Divine peace." },
  { id: "philippians49", question: "The peace of God will guard hearts and?", options: [{ label: "A", text: "Lives" }, { label: "B", text: "Minds" }, { label: "C", text: "Faith" }, { label: "D", text: "Thoughts" }], correctAnswer: "B", verse: "Philippians 4:7", explanation: "Inner protection." },
  { id: "philippians50", question: "Believers should think about whatever is true, noble, right, pure, lovely, admirable, excellent, or?", options: [{ label: "A", text: "Praiseworthy" }, { label: "B", text: "Faithful" }, { label: "C", text: "Holy" }, { label: "D", text: "Good" }], correctAnswer: "A", verse: "Philippians 4:8", explanation: "Christlike thinking." },
  { id: "philippians51", question: "Paul learned to be content in every?", options: [{ label: "A", text: "Situation" }, { label: "B", text: "Season" }, { label: "C", text: "Trial" }, { label: "D", text: "Moment" }], correctAnswer: "A", verse: "Philippians 4:11", explanation: "Contentment." },
  { id: "philippians52", question: "Paul knows how to live in need and in?", options: [{ label: "A", text: "Abundance" }, { label: "B", text: "Plenty" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Wealth" }], correctAnswer: "A", verse: "Philippians 4:12", explanation: "Life balance." },
  { id: "philippians53", question: "Paul can do all things through Christ who?", options: [{ label: "A", text: "Saves" }, { label: "B", text: "Strengthens him" }, { label: "C", text: "Calls him" }, { label: "D", text: "Guides him" }], correctAnswer: "B", verse: "Philippians 4:13", explanation: "Strength in Christ." },
  { id: "philippians54", question: "The Philippians shared in Paul’s?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Troubles" }, { label: "C", text: "Faith" }, { label: "D", text: "Mission" }], correctAnswer: "B", verse: "Philippians 4:14", explanation: "Partnership." },
  { id: "philippians55", question: "Their gift was a fragrant offering pleasing to?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "God" }, { label: "C", text: "The church" }, { label: "D", text: "Christ" }], correctAnswer: "B", verse: "Philippians 4:18", explanation: "God-honoring giving." },
  { id: "philippians56", question: "God will meet all your needs according to His?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Riches in glory" }, { label: "C", text: "Power" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Philippians 4:19", explanation: "God’s provision." },
  { id: "philippians57", question: "Glory belongs to God our Father for?", options: [{ label: "A", text: "Eternity" }, { label: "B", text: "Ever and ever" }, { label: "C", text: "All time" }, { label: "D", text: "Always" }], correctAnswer: "B", verse: "Philippians 4:20", explanation: "Eternal praise." },
  { id: "philippians58", question: "Paul sends greetings from believers in?", options: [{ label: "A", text: "Rome" }, { label: "B", text: "Caesar’s household" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "Philippians 4:22", explanation: "Gospel reach." },
  { id: "philippians59", question: "The final blessing mentions the grace of?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Lord Jesus Christ" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philippians 4:23", explanation: "Grace-centered ending." },
  { id: "philippians60", question: "Main theme of Philippians is?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Joy in Christ" }, { label: "C", text: "Obedience" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "Philippians 1-4", explanation: "Joy despite circumstances." },
  { id: "philippians61", question: "Joy in Philippians is rooted in?", options: [{ label: "A", text: "Circumstances" }, { label: "B", text: "Christ" }, { label: "C", text: "Success" }, { label: "D", text: "Freedom" }], correctAnswer: "B", verse: "Philippians 1:21", explanation: "Christ-centered joy." },
  { id: "philippians62", question: "Humility in Philippians is modeled by?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Christ" }, { label: "C", text: "Timothy" }, { label: "D", text: "Epaphroditus" }], correctAnswer: "B", verse: "Philippians 2:5-8", explanation: "Christ’s example." },
  { id: "philippians63", question: "Christian unity requires the same?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Mindset" }, { label: "C", text: "Calling" }, { label: "D", text: "Mission" }], correctAnswer: "B", verse: "Philippians 2:2", explanation: "Unity of mind." },
  { id: "philippians64", question: "True righteousness comes through?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith in Christ" }, { label: "C", text: "Works" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Philippians 3:9", explanation: "Faith righteousness." },
  { id: "philippians65", question: "Paul’s goal is to know Christ more fully through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Suffering and resurrection" }, { label: "C", text: "Obedience" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Philippians 3:10", explanation: "Deeper knowledge." },
  { id: "philippians66", question: "Mature believers should have this?", options: [{ label: "A", text: "Understanding" }, { label: "B", text: "View" }, { label: "C", text: "Mindset" }, { label: "D", text: "Calling" }], correctAnswer: "C", verse: "Philippians 3:15", explanation: "Spiritual maturity." },
  { id: "philippians67", question: "Believers are encouraged to stand firm in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Lord" }, { label: "C", text: "Spirit" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "Philippians 4:1", explanation: "Perseverance." },
  { id: "philippians68", question: "Rejoicing in the Lord combats?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Anxiety" }, { label: "C", text: "Doubt" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Philippians 4:6", explanation: "Joy over anxiety." },
  { id: "philippians69", question: "Peace replaces anxiety when believers pray with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Thanksgiving" }, { label: "C", text: "Hope" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "Philippians 4:6", explanation: "Thankful prayer." },
  { id: "philippians70", question: "Christ strengthens believers to endure?", options: [{ label: "A", text: "Everything" }, { label: "B", text: "All circumstances" }, { label: "C", text: "Suffering" }, { label: "D", text: "Trials" }], correctAnswer: "B", verse: "Philippians 4:13", explanation: "Enduring strength." },
  { id: "philippians71", question: "Giving is described as an act of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Worship" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Service" }], correctAnswer: "C", verse: "Philippians 4:18", explanation: "Spiritual sacrifice." },
  { id: "philippians72", question: "God’s provision reflects His?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Glory" }, { label: "C", text: "Riches" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "Philippians 4:19", explanation: "Abundant supply." },
  { id: "philippians73", question: "Joy in Philippians is commanded despite?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Suffering" }, { label: "C", text: "Fear" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Philippians 1:18", explanation: "Joy beyond pain." },
  { id: "philippians74", question: "Christian humility involves valuing others as?", options: [{ label: "A", text: "Equal" }, { label: "B", text: "More important" }, { label: "C", text: "Faithful" }, { label: "D", text: "Trusted" }], correctAnswer: "B", verse: "Philippians 2:3", explanation: "Selfless love." },
  { id: "philippians75", question: "Christ’s obedience resulted in?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Exaltation" }, { label: "C", text: "Resurrection" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Philippians 2:9", explanation: "Rewarded humility." },
  { id: "philippians76", question: "Christian maturity involves pressing forward, not?", options: [{ label: "A", text: "Stopping" }, { label: "B", text: "Looking back" }, { label: "C", text: "Failing" }, { label: "D", text: "Pausing" }], correctAnswer: "B", verse: "Philippians 3:13", explanation: "Forward focus." },
  { id: "philippians77", question: "Heavenly citizenship shapes believers'?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Conduct" }, { label: "C", text: "Hope" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "Philippians 3:20", explanation: "Kingdom living." },
  { id: "philippians78", question: "Christian peace guards both heart and?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Mind" }, { label: "C", text: "Faith" }, { label: "D", text: "Soul" }], correctAnswer: "B", verse: "Philippians 4:7", explanation: "Inner peace." },
  { id: "philippians79", question: "Christian thinking shapes?", options: [{ label: "A", text: "Behavior" }, { label: "B", text: "Faith" }, { label: "C", text: "Speech" }, { label: "D", text: "Hope" }], correctAnswer: "A", verse: "Philippians 4:8-9", explanation: "Thought life." },
  { id: "philippians80", question: "Contentment comes from dependence on?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Prayer" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Philippians 4:13", explanation: "Christ-sufficiency." },
  { id: "philippians81", question: "Christian generosity is pleasing to?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "God" }, { label: "C", text: "Church" }, { label: "D", text: "Christ" }], correctAnswer: "B", verse: "Philippians 4:18", explanation: "God-honoring gifts." },
  { id: "philippians82", question: "Philippians emphasizes joy as a?", options: [{ label: "A", text: "Feeling" }, { label: "B", text: "Choice rooted in Christ" }, { label: "C", text: "Reaction" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "Philippians 4:4", explanation: "Joyful discipline." },
  { id: "philippians83", question: "Partnership in Philippians refers to partnership in the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Gospel" }, { label: "C", text: "Faith" }, { label: "D", text: "Mission" }], correctAnswer: "B", verse: "Philippians 1:5", explanation: "Shared mission." },
  { id: "philippians84", question: "Christian unity is rooted in shared?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Mindset" }, { label: "C", text: "Mission" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "Philippians 2:2", explanation: "Unified thinking." },
  { id: "philippians85", question: "Paul’s suffering demonstrates trust in?", options: [{ label: "A", text: "God’s plan" }, { label: "B", text: "The gospel" }, { label: "C", text: "Christ" }, { label: "D", text: "Grace" }], correctAnswer: "A", verse: "Philippians 1:12", explanation: "Purpose in suffering." },
  { id: "philippians86", question: "Christian obedience flows from?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God’s work within" }, { label: "C", text: "Faith" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Philippians 2:13", explanation: "God-powered obedience." },
  { id: "philippians87", question: "Christian joy strengthens witness in a?", options: [{ label: "A", text: "Dark world" }, { label: "B", text: "Broken world" }, { label: "C", text: "Sinful world" }, { label: "D", text: "Fallen world" }], correctAnswer: "A", verse: "Philippians 2:15", explanation: "Light in darkness." },
  { id: "philippians88", question: "The ultimate goal of Christian life is?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Knowing Christ" }, { label: "C", text: "Salvation" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Philippians 3:8", explanation: "Supreme goal." },
  { id: "philippians89", question: "Christian hope is anchored in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Heavenly citizenship" }, { label: "C", text: "Grace" }, { label: "D", text: "Christ" }], correctAnswer: "B", verse: "Philippians 3:20", explanation: "Future focus." },
  { id: "philippians90", question: "Paul’s confidence rests in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God’s faithfulness" }, { label: "C", text: "Grace" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "Philippians 1:6", explanation: "God completes His work." },
  { id: "philippians91", question: "Christian peace protects against?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Anxiety" }, { label: "C", text: "Doubt" }, { label: "D", text: "Temptation" }], correctAnswer: "B", verse: "Philippians 4:6-7", explanation: "Peace over worry." },
  { id: "philippians92", question: "Christian contentment is learned through?", options: [{ label: "A", text: "Experience" }, { label: "B", text: "Dependence on Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Philippians 4:11-13", explanation: "Christ-centered life." },
  { id: "philippians93", question: "The Philippians’ generosity reflects their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Partnership" }, { label: "C", text: "Love" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Philippians 4:15", explanation: "Gospel partnership." },
  { id: "philippians94", question: "Christian maturity avoids reliance on?", options: [{ label: "A", text: "Feelings" }, { label: "B", text: "Past achievements" }, { label: "C", text: "Works" }, { label: "D", text: "Success" }], correctAnswer: "B", verse: "Philippians 3:13", explanation: "Forward focus." },
  { id: "philippians95", question: "Christian unity requires humility and?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Service" }, { label: "C", text: "Faith" }, { label: "D", text: "Peace" }], correctAnswer: "A", verse: "Philippians 2:3-4", explanation: "Relational harmony." },
  { id: "philippians96", question: "Christian obedience produces a powerful?", options: [{ label: "A", text: "Witness" }, { label: "B", text: "Testimony" }, { label: "C", text: "Faith" }, { label: "D", text: "Calling" }], correctAnswer: "A", verse: "Philippians 2:15", explanation: "Shining example." },
  { id: "philippians97", question: "Philippians encourages believers to rejoice because Christ is?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Exalted" }, { label: "C", text: "Near" }, { label: "D", text: "Lord" }], correctAnswer: "C", verse: "Philippians 4:5", explanation: "The Lord is near." },
  { id: "philippians98", question: "Christian generosity leads to?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "God’s pleasure" }, { label: "C", text: "Provision" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "Philippians 4:18", explanation: "God delights in giving." },
  { id: "philippians99", question: "The central message of Philippians is living with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Joy in Christ" }, { label: "C", text: "Peace" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Philippians 1-4", explanation: "Joy-filled life." },
  { id: "philippians100", question: "Philippians ends with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Philippians 4:23", explanation: "Grace-centered ending." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PhilippiansTriviaPage() {
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
          .eq("book", "philippians");

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
          book: "philippians",
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
            book: "philippians",
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
    if (score === 10) return "Perfect! You're a Philippians expert!";
    if (score >= 8) return "Excellent! You know Philippians well!";
    if (score >= 6) return "Good job! Keep studying Philippians!";
    if (score >= 4) return "Nice try! Philippians has much to explore!";
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
              href="/bible-trivia/philippians"
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







