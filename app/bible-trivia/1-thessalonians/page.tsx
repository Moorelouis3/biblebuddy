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
  { id: "1thessalonians1", question: "Who wrote the book of 1 Thessalonians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "1 Thessalonians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "1thessalonians2", question: "Who are named alongside Paul in the greeting?", options: [{ label: "A", text: "Barnabas and Mark" }, { label: "B", text: "Silas and Timothy" }, { label: "C", text: "Luke and Titus" }, { label: "D", text: "Apollos and Priscilla" }], correctAnswer: "B", verse: "1 Thessalonians 1:1", explanation: "Silas and Timothy co-labored with Paul." },
  { id: "1thessalonians3", question: "The letter is addressed to the church in?", options: [{ label: "A", text: "Corinth" }, { label: "B", text: "Thessalonica" }, { label: "C", text: "Philippi" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "1 Thessalonians 1:1", explanation: "Written to believers in Thessalonica." },
  { id: "1thessalonians4", question: "Paul thanks God continually for the Thessalonians' work produced by?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Thessalonians 1:3", explanation: "Faith produced action." },
  { id: "1thessalonians5", question: "Paul mentions their labor prompted by?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Endurance" }], correctAnswer: "C", verse: "1 Thessalonians 1:3", explanation: "Love motivated service." },
  { id: "1thessalonians6", question: "Paul highlights their endurance inspired by?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Grace" }, { label: "C", text: "Hope in Jesus" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 Thessalonians 1:3", explanation: "Hope sustained endurance." },
  { id: "1thessalonians7", question: "The Thessalonians became imitators of the Lord in spite of severe?", options: [{ label: "A", text: "Hardship" }, { label: "B", text: "Suffering" }, { label: "C", text: "Persecution" }, { label: "D", text: "Opposition" }], correctAnswer: "B", verse: "1 Thessalonians 1:6", explanation: "Faith under suffering." },
  { id: "1thessalonians8", question: "They welcomed the message with joy given by the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Church" }, { label: "C", text: "Gospel" }, { label: "D", text: "Lord" }], correctAnswer: "A", verse: "1 Thessalonians 1:6", explanation: "Joy from the Holy Spirit." },
  { id: "1thessalonians9", question: "The Thessalonians became a model to all believers in?", options: [{ label: "A", text: "Asia" }, { label: "B", text: "Macedonia and Achaia" }, { label: "C", text: "Rome" }, { label: "D", text: "Galatia" }], correctAnswer: "B", verse: "1 Thessalonians 1:7", explanation: "Regional example." },
  { id: "1thessalonians10", question: "They turned to God from?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Idols" }, { label: "C", text: "Darkness" }, { label: "D", text: "Unbelief" }], correctAnswer: "B", verse: "1 Thessalonians 1:9", explanation: "Conversion from idolatry." },
  { id: "1thessalonians11", question: "They began to serve the living and?", options: [{ label: "A", text: "Faithful God" }, { label: "B", text: "True God" }, { label: "C", text: "Holy God" }, { label: "D", text: "Righteous God" }], correctAnswer: "B", verse: "1 Thessalonians 1:9", explanation: "True worship." },
  { id: "1thessalonians12", question: "They wait for God's Son from?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Glory" }, { label: "C", text: "The clouds" }, { label: "D", text: "Above" }], correctAnswer: "A", verse: "1 Thessalonians 1:10", explanation: "Expectation of Christ." },
  { id: "1thessalonians13", question: "God raised Jesus from the?", options: [{ label: "A", text: "Grave" }, { label: "B", text: "Dead" }, { label: "C", text: "Tomb" }, { label: "D", text: "Cross" }], correctAnswer: "B", verse: "1 Thessalonians 1:10", explanation: "Resurrection truth." },
  { id: "1thessalonians14", question: "Jesus rescues believers from the coming?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Wrath" }, { label: "C", text: "Trial" }, { label: "D", text: "Darkness" }], correctAnswer: "B", verse: "1 Thessalonians 1:10", explanation: "Deliverance through Christ." },
  { id: "1thessalonians15", question: "Paul says his visit was not a?", options: [{ label: "A", text: "Failure" }, { label: "B", text: "Mistake" }, { label: "C", text: "Waste" }, { label: "D", text: "Burden" }], correctAnswer: "A", verse: "1 Thessalonians 2:1", explanation: "Effective ministry." },
  { id: "1thessalonians16", question: "Paul and his companions suffered and were treated outrageously in?", options: [{ label: "A", text: "Athens" }, { label: "B", text: "Philippi" }, { label: "C", text: "Corinth" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "1 Thessalonians 2:2", explanation: "Past persecution." },
  { id: "1thessalonians17", question: "Paul preached the gospel with the help of?", options: [{ label: "A", text: "The church" }, { label: "B", text: "God" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Thessalonians 2:2", explanation: "God-enabled boldness." },
  { id: "1thessalonians18", question: "Paul's appeal did not come from error or?", options: [{ label: "A", text: "Deceit" }, { label: "B", text: "Pride" }, { label: "C", text: "Fear" }, { label: "D", text: "Ignorance" }], correctAnswer: "A", verse: "1 Thessalonians 2:3", explanation: "Pure motives." },
  { id: "1thessalonians19", question: "Paul was entrusted with the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Church" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Thessalonians 2:4", explanation: "Stewardship of the gospel." },
  { id: "1thessalonians20", question: "Paul sought to please God, not?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "People" }, { label: "C", text: "Rulers" }, { label: "D", text: "Authorities" }], correctAnswer: "B", verse: "1 Thessalonians 2:4", explanation: "God-centered ministry." },
  { id: "1thessalonians21", question: "Paul never used flattery or put on a mask to cover up?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Greed" }, { label: "C", text: "Fear" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "1 Thessalonians 2:5", explanation: "Integrity." },
  { id: "1thessalonians22", question: "Paul did not seek praise from?", options: [{ label: "A", text: "Churches" }, { label: "B", text: "People" }, { label: "C", text: "Leaders" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "1 Thessalonians 2:6", explanation: "Humility." },
  { id: "1thessalonians23", question: "Paul describes his care as gentle like a?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Mother" }, { label: "C", text: "Father" }, { label: "D", text: "Shepherd" }], correctAnswer: "B", verse: "1 Thessalonians 2:7", explanation: "Nurturing care." },
  { id: "1thessalonians24", question: "Paul shared not only the gospel but also his?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Time" }, { label: "C", text: "Faith" }, { label: "D", text: "Resources" }], correctAnswer: "A", verse: "1 Thessalonians 2:8", explanation: "Personal investment." },
  { id: "1thessalonians25", question: "Paul worked night and day so as not to be a?", options: [{ label: "A", text: "Distraction" }, { label: "B", text: "Burden" }, { label: "C", text: "Problem" }, { label: "D", text: "Hindrance" }], correctAnswer: "B", verse: "1 Thessalonians 2:9", explanation: "Self-supporting ministry." },
  { id: "1thessalonians26", question: "Paul's conduct was holy, righteous, and?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Blameless" }, { label: "C", text: "Pure" }, { label: "D", text: "Sincere" }], correctAnswer: "B", verse: "1 Thessalonians 2:10", explanation: "Godly example." },
  { id: "1thessalonians27", question: "Paul encouraged believers like a?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Father" }, { label: "C", text: "Leader" }, { label: "D", text: "Pastor" }], correctAnswer: "B", verse: "1 Thessalonians 2:11", explanation: "Fatherly guidance." },
  { id: "1thessalonians28", question: "Believers were encouraged to live lives worthy of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "The gospel" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "1 Thessalonians 2:12", explanation: "God-honoring life." },
  { id: "1thessalonians29", question: "The Thessalonians accepted the message as the word of?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Men" }, { label: "C", text: "God" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 Thessalonians 2:13", explanation: "Divine authority." },
  { id: "1thessalonians30", question: "Believers became imitators of God's churches in?", options: [{ label: "A", text: "Asia" }, { label: "B", text: "Judea" }, { label: "C", text: "Rome" }, { label: "D", text: "Galatia" }], correctAnswer: "B", verse: "1 Thessalonians 2:14", explanation: "Shared suffering." },
  { id: "1thessalonians31", question: "Paul says the Jews drove out the?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "Lord Jesus and the prophets" }, { label: "C", text: "Believers" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "1 Thessalonians 2:15", explanation: "Historical opposition." },
  { id: "1thessalonians32", question: "Paul wanted to visit the Thessalonians but was hindered by?", options: [{ label: "A", text: "Persecution" }, { label: "B", text: "Circumstances" }, { label: "C", text: "Satan" }, { label: "D", text: "Illness" }], correctAnswer: "C", verse: "1 Thessalonians 2:18", explanation: "Spiritual opposition." },
  { id: "1thessalonians33", question: "The Thessalonians are Paul's hope, joy, and?", options: [{ label: "A", text: "Reward" }, { label: "B", text: "Crown" }, { label: "C", text: "Glory" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Thessalonians 2:19", explanation: "Eternal reward." },
  { id: "1thessalonians34", question: "Paul sent Timothy to strengthen their?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "1 Thessalonians 3:2", explanation: "Faith encouragement." },
  { id: "1thessalonians35", question: "Believers were warned not to be unsettled by these?", options: [{ label: "A", text: "Trials" }, { label: "B", text: "Teachings" }, { label: "C", text: "Afflictions" }, { label: "D", text: "Temptations" }], correctAnswer: "C", verse: "1 Thessalonians 3:3", explanation: "Expected suffering." },
  { id: "1thessalonians36", question: "Paul sent Timothy to find out about their?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Faith" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "1 Thessalonians 3:5", explanation: "Concern for faith." },
  { id: "1thessalonians37", question: "Timothy brought good news about their faith and?", options: [{ label: "A", text: "Endurance" }, { label: "B", text: "Joy" }, { label: "C", text: "Love" }, { label: "D", text: "Service" }], correctAnswer: "C", verse: "1 Thessalonians 3:6", explanation: "Love confirmed." },
  { id: "1thessalonians38", question: "Paul was encouraged about them because of their?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Faith" }, { label: "C", text: "Witness" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "1 Thessalonians 3:7", explanation: "Faith stability." },
  { id: "1thessalonians39", question: "Paul says, \"Now we really live, since you are standing firm in the?\"", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Gospel" }, { label: "D", text: "Lord" }], correctAnswer: "D", verse: "1 Thessalonians 3:8", explanation: "Standing in the Lord." },
  { id: "1thessalonians40", question: "Paul prays to see them again and supply what is lacking in their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Love" }, { label: "D", text: "Hope" }], correctAnswer: "A", verse: "1 Thessalonians 3:10", explanation: "Faith development." },
  { id: "1thessalonians41", question: "Paul prays their love may increase for each other and for?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Everyone else" }, { label: "C", text: "The church" }, { label: "D", text: "The world" }], correctAnswer: "B", verse: "1 Thessalonians 3:12", explanation: "Expanding love." },
  { id: "1thessalonians42", question: "Paul prays their hearts be strengthened to be blameless and holy in the presence of God when Jesus comes with all His?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Saints" }, { label: "C", text: "People" }, { label: "D", text: "Followers" }], correctAnswer: "B", verse: "1 Thessalonians 3:13", explanation: "Second coming." },
  { id: "1thessalonians43", question: "Believers are instructed to live in order to?", options: [{ label: "A", text: "Grow" }, { label: "B", text: "Please God" }, { label: "C", text: "Serve others" }, { label: "D", text: "Remain faithful" }], correctAnswer: "B", verse: "1 Thessalonians 4:1", explanation: "God-pleasing life." },
  { id: "1thessalonians44", question: "God's will is for believers to be?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Sanctified" }, { label: "C", text: "Obedient" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "1 Thessalonians 4:3", explanation: "Sanctification." },
  { id: "1thessalonians45", question: "Believers are instructed to avoid?", options: [{ label: "A", text: "Greed" }, { label: "B", text: "Sexual immorality" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "1 Thessalonians 4:3", explanation: "Moral purity." },
  { id: "1thessalonians46", question: "Each believer should control their own body in a way that is holy and?", options: [{ label: "A", text: "Honorable" }, { label: "B", text: "Pure" }, { label: "C", text: "Faithful" }, { label: "D", text: "Righteous" }], correctAnswer: "A", verse: "1 Thessalonians 4:4", explanation: "Self-control." },
  { id: "1thessalonians47", question: "God did not call believers to be impure but to live a?", options: [{ label: "A", text: "Faithful life" }, { label: "B", text: "Holy life" }, { label: "C", text: "Pure life" }, { label: "D", text: "Blameless life" }], correctAnswer: "B", verse: "1 Thessalonians 4:7", explanation: "Holy calling." },
  { id: "1thessalonians48", question: "Rejecting these instructions means rejecting?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "The church" }, { label: "C", text: "God" }, { label: "D", text: "The gospel" }], correctAnswer: "C", verse: "1 Thessalonians 4:8", explanation: "Divine authority." },
  { id: "1thessalonians49", question: "God gives believers His?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Word" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Thessalonians 4:8", explanation: "Spirit empowerment." },
  { id: "1thessalonians50", question: "Believers are taught by God to?", options: [{ label: "A", text: "Serve" }, { label: "B", text: "Love one another" }, { label: "C", text: "Be faithful" }, { label: "D", text: "Obey leaders" }], correctAnswer: "B", verse: "1 Thessalonians 4:9", explanation: "God-taught love." },
  { id: "1thessalonians51", question: "Paul urges them to love each other even?", options: [{ label: "A", text: "More" }, { label: "B", text: "Deeply" }, { label: "C", text: "Faithfully" }, { label: "D", text: "Sincerely" }], correctAnswer: "A", verse: "1 Thessalonians 4:10", explanation: "Continual growth." },
  { id: "1thessalonians52", question: "Believers should make it their ambition to lead a?", options: [{ label: "A", text: "Quiet life" }, { label: "B", text: "Faithful life" }, { label: "C", text: "Holy life" }, { label: "D", text: "Righteous life" }], correctAnswer: "A", verse: "1 Thessalonians 4:11", explanation: "Peaceful living." },
  { id: "1thessalonians53", question: "Believers should work with their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hands" }, { label: "C", text: "Strength" }, { label: "D", text: "Abilities" }], correctAnswer: "B", verse: "1 Thessalonians 4:11", explanation: "Responsible work." },
  { id: "1thessalonians54", question: "Such behavior earns respect from?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Outsiders" }, { label: "C", text: "Leaders" }, { label: "D", text: "Authorities" }], correctAnswer: "B", verse: "1 Thessalonians 4:12", explanation: "Good witness." },
  { id: "1thessalonians55", question: "Paul does not want believers to be uninformed about those who?", options: [{ label: "A", text: "Suffer" }, { label: "B", text: "Have fallen asleep" }, { label: "C", text: "Are weak" }, { label: "D", text: "Have sinned" }], correctAnswer: "B", verse: "1 Thessalonians 4:13", explanation: "Teaching on death." },
  { id: "1thessalonians56", question: "Believers grieve, but not like those without?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Love" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "1 Thessalonians 4:13", explanation: "Hope-filled grief." },
  { id: "1thessalonians57", question: "God will bring with Jesus those who have fallen asleep in?", options: [{ label: "A", text: "Him" }, { label: "B", text: "Faith" }, { label: "C", text: "Christ" }, { label: "D", text: "Hope" }], correctAnswer: "A", verse: "1 Thessalonians 4:14", explanation: "Union with Christ." },
  { id: "1thessalonians58", question: "The Lord will come down from heaven with a loud command, the voice of an archangel, and the?", options: [{ label: "A", text: "Call of God" }, { label: "B", text: "Trumpet call of God" }, { label: "C", text: "Shout of victory" }, { label: "D", text: "Sound of glory" }], correctAnswer: "B", verse: "1 Thessalonians 4:16", explanation: "Second coming description." },
  { id: "1thessalonians59", question: "The dead in Christ will rise?", options: [{ label: "A", text: "Together" }, { label: "B", text: "First" }, { label: "C", text: "In glory" }, { label: "D", text: "Immediately" }], correctAnswer: "B", verse: "1 Thessalonians 4:16", explanation: "Resurrection order." },
  { id: "1thessalonians60", question: "Believers will be caught up together with them in the?", options: [{ label: "A", text: "Sky" }, { label: "B", text: "Clouds" }, { label: "C", text: "Air" }, { label: "D", text: "Heavens" }], correctAnswer: "B", verse: "1 Thessalonians 4:17", explanation: "Meeting the Lord." },
  { id: "1thessalonians61", question: "Believers will meet the Lord in the?", options: [{ label: "A", text: "Heavens" }, { label: "B", text: "Air" }, { label: "C", text: "Clouds" }, { label: "D", text: "Sky" }], correctAnswer: "B", verse: "1 Thessalonians 4:17", explanation: "Eternal meeting." },
  { id: "1thessalonians62", question: "Believers will be with the Lord?", options: [{ label: "A", text: "For a time" }, { label: "B", text: "Forever" }, { label: "C", text: "In glory" }, { label: "D", text: "In heaven" }], correctAnswer: "B", verse: "1 Thessalonians 4:17", explanation: "Eternal union." },
  { id: "1thessalonians63", question: "Believers should encourage one another with these?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Promises" }, { label: "C", text: "Truths" }, { label: "D", text: "Teachings" }], correctAnswer: "A", verse: "1 Thessalonians 4:18", explanation: "Hopeful encouragement." },
  { id: "1thessalonians64", question: "The day of the Lord will come like a?", options: [{ label: "A", text: "Storm" }, { label: "B", text: "Thief in the night" }, { label: "C", text: "Flash" }, { label: "D", text: "Surprise" }], correctAnswer: "B", verse: "1 Thessalonians 5:2", explanation: "Unexpected timing." },
  { id: "1thessalonians65", question: "While people are saying \"peace and safety,\"?", options: [{ label: "A", text: "Hope will rise" }, { label: "B", text: "Destruction will come suddenly" }, { label: "C", text: "Judgment will delay" }, { label: "D", text: "The Lord will appear" }], correctAnswer: "B", verse: "1 Thessalonians 5:3", explanation: "Sudden judgment." },
  { id: "1thessalonians66", question: "Believers are children of the?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Day" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "1 Thessalonians 5:5", explanation: "Spiritual identity." },
  { id: "1thessalonians67", question: "Believers should not sleep but be?", options: [{ label: "A", text: "Alert" }, { label: "B", text: "Watchful" }, { label: "C", text: "Sober" }, { label: "D", text: "Ready" }], correctAnswer: "C", verse: "1 Thessalonians 5:6", explanation: "Spiritual sobriety." },
  { id: "1thessalonians68", question: "The breastplate believers wear is faith and?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Love" }, { label: "C", text: "Truth" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "1 Thessalonians 5:8", explanation: "Spiritual armor." },
  { id: "1thessalonians69", question: "The helmet believers wear is the hope of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Salvation" }, { label: "C", text: "Glory" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Thessalonians 5:8", explanation: "Hope protection." },
  { id: "1thessalonians70", question: "God did not appoint believers to suffer?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Wrath" }, { label: "C", text: "Punishment" }, { label: "D", text: "Loss" }], correctAnswer: "B", verse: "1 Thessalonians 5:9", explanation: "Salvation promise." },
  { id: "1thessalonians71", question: "Believers will live together with Christ whether awake or?", options: [{ label: "A", text: "Alive" }, { label: "B", text: "Asleep" }, { label: "C", text: "Faithful" }, { label: "D", text: "Waiting" }], correctAnswer: "B", verse: "1 Thessalonians 5:10", explanation: "Life in Christ." },
  { id: "1thessalonians72", question: "Believers are instructed to build each other?", options: [{ label: "A", text: "Up" }, { label: "B", text: "Together" }, { label: "C", text: "Strong" }, { label: "D", text: "Faithful" }], correctAnswer: "A", verse: "1 Thessalonians 5:11", explanation: "Mutual encouragement." },
  { id: "1thessalonians73", question: "Believers should respect those who work hard among them and are over them in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Lord" }, { label: "C", text: "Church" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Thessalonians 5:12", explanation: "Church leadership." },
  { id: "1thessalonians74", question: "Believers should hold leaders in the highest regard in love because of their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Work" }, { label: "C", text: "Service" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "1 Thessalonians 5:13", explanation: "Respect for labor." },
  { id: "1thessalonians75", question: "Believers are urged to live in?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Peace" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Thessalonians 5:13", explanation: "Peaceful living." },
  { id: "1thessalonians76", question: "Believers should warn those who are?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Idle" }, { label: "C", text: "Fearful" }, { label: "D", text: "Doubting" }], correctAnswer: "B", verse: "1 Thessalonians 5:14", explanation: "Corrective care." },
  { id: "1thessalonians77", question: "Believers should encourage the?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Timid" }, { label: "C", text: "Fearful" }, { label: "D", text: "Needy" }], correctAnswer: "B", verse: "1 Thessalonians 5:14", explanation: "Gentle encouragement." },
  { id: "1thessalonians78", question: "Believers should help the?", options: [{ label: "A", text: "Poor" }, { label: "B", text: "Weak" }, { label: "C", text: "Needy" }, { label: "D", text: "Struggling" }], correctAnswer: "B", verse: "1 Thessalonians 5:14", explanation: "Supportive care." },
  { id: "1thessalonians79", question: "Believers should be patient with?", options: [{ label: "A", text: "Everyone" }, { label: "B", text: "Each other" }, { label: "C", text: "Leaders" }, { label: "D", text: "The weak" }], correctAnswer: "A", verse: "1 Thessalonians 5:14", explanation: "Universal patience." },
  { id: "1thessalonians80", question: "Believers should not repay wrong for?", options: [{ label: "A", text: "Wrong" }, { label: "B", text: "Evil" }, { label: "C", text: "Sin" }, { label: "D", text: "Hurt" }], correctAnswer: "A", verse: "1 Thessalonians 5:15", explanation: "Non-retaliation." },
  { id: "1thessalonians81", question: "Believers should always strive to do what is?", options: [{ label: "A", text: "Right" }, { label: "B", text: "Good" }, { label: "C", text: "Faithful" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "1 Thessalonians 5:15", explanation: "Doing good." },
  { id: "1thessalonians82", question: "Believers are commanded to rejoice?", options: [{ label: "A", text: "Often" }, { label: "B", text: "Always" }, { label: "C", text: "Daily" }, { label: "D", text: "Continually" }], correctAnswer: "B", verse: "1 Thessalonians 5:16", explanation: "Constant joy." },
  { id: "1thessalonians83", question: "Believers should pray?", options: [{ label: "A", text: "Regularly" }, { label: "B", text: "Continually" }, { label: "C", text: "Faithfully" }, { label: "D", text: "Humbly" }], correctAnswer: "B", verse: "1 Thessalonians 5:17", explanation: "Persistent prayer." },
  { id: "1thessalonians84", question: "Believers should give thanks in?", options: [{ label: "A", text: "All circumstances" }, { label: "B", text: "Good times" }, { label: "C", text: "Blessings" }, { label: "D", text: "Life" }], correctAnswer: "A", verse: "1 Thessalonians 5:18", explanation: "Grateful living." },
  { id: "1thessalonians85", question: "These instructions are God's will for believers in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The gospel" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Thessalonians 5:18", explanation: "God's will." },
  { id: "1thessalonians86", question: "Believers should not quench the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "A", verse: "1 Thessalonians 5:19", explanation: "Spirit sensitivity." },
  { id: "1thessalonians87", question: "Believers should not treat prophecies with?", options: [{ label: "A", text: "Suspicion" }, { label: "B", text: "Contempt" }, { label: "C", text: "Fear" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "1 Thessalonians 5:20", explanation: "Respect God's word." },
  { id: "1thessalonians88", question: "Believers should test everything and hold on to what is?", options: [{ label: "A", text: "True" }, { label: "B", text: "Good" }, { label: "C", text: "Right" }, { label: "D", text: "Faithful" }], correctAnswer: "B", verse: "1 Thessalonians 5:21", explanation: "Discernment." },
  { id: "1thessalonians89", question: "Believers should avoid every kind of?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Evil" }, { label: "C", text: "Wrong" }, { label: "D", text: "Corruption" }], correctAnswer: "B", verse: "1 Thessalonians 5:22", explanation: "Moral vigilance." },
  { id: "1thessalonians90", question: "Paul prays God sanctify believers through and through--spirit, soul, and?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Body" }, { label: "C", text: "Heart" }, { label: "D", text: "Life" }], correctAnswer: "B", verse: "1 Thessalonians 5:23", explanation: "Whole-person sanctification." },
  { id: "1thessalonians91", question: "God who calls believers is?", options: [{ label: "A", text: "Powerful" }, { label: "B", text: "Faithful" }, { label: "C", text: "Holy" }, { label: "D", text: "Righteous" }], correctAnswer: "B", verse: "1 Thessalonians 5:24", explanation: "God's faithfulness." },
  { id: "1thessalonians92", question: "Paul asks believers to pray for?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Us" }, { label: "C", text: "Leaders" }, { label: "D", text: "All believers" }], correctAnswer: "B", verse: "1 Thessalonians 5:25", explanation: "Mutual prayer." },
  { id: "1thessalonians93", question: "Believers are instructed to greet all God's people with a holy?", options: [{ label: "A", text: "Hug" }, { label: "B", text: "Kiss" }, { label: "C", text: "Greeting" }, { label: "D", text: "Welcome" }], correctAnswer: "B", verse: "1 Thessalonians 5:26", explanation: "Affectionate unity." },
  { id: "1thessalonians94", question: "Paul instructs the letter to be read to?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "All believers" }, { label: "C", text: "The church" }, { label: "D", text: "The elders" }], correctAnswer: "B", verse: "1 Thessalonians 5:27", explanation: "Public reading." },
  { id: "1thessalonians95", question: "The letter closes with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "1 Thessalonians 5:28", explanation: "Grace-centered ending." },
  { id: "1thessalonians96", question: "Main theme of 1 Thessalonians includes encouragement amid?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Persecution" }, { label: "C", text: "Doubt" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "1 Thessalonians 1-5", explanation: "Hope in hardship." },
  { id: "1thessalonians97", question: "A key emphasis of the letter is the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Second coming of Christ" }, { label: "C", text: "Church order" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Thessalonians 4-5", explanation: "Eschatological hope." },
  { id: "1thessalonians98", question: "Christian living in the letter is marked by faith, love, and?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Hope" }, { label: "C", text: "Endurance" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "1 Thessalonians 1:3", explanation: "Core virtues." },
  { id: "1thessalonians99", question: "Believers are encouraged to live ready for Christ's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Call" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "1 Thessalonians 5:6", explanation: "Watchful living." },
  { id: "1thessalonians100", question: "1 Thessalonians ends emphasizing grace as the foundation of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Christian life" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Thessalonians 5:28", explanation: "Grace-centered faith." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstThessaloniansTriviaPage() {
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
          .eq("book", "1thessalonians");

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
          book: "1thessalonians",
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
            book: "1thessalonians",
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
    if (score === 10) return "Perfect! You're a 1 Thessalonians expert!";
    if (score >= 8) return "Excellent! You know 1 Thessalonians well!";
    if (score >= 6) return "Good job! Keep studying 1 Thessalonians!";
    if (score >= 4) return "Nice try! 1 Thessalonians has much to explore!";
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
              href="/bible-trivia/1-thessalonians"
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

