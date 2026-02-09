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
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "jude1", question: "Who is traditionally identified as the author of Jude?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "James" }, { label: "C", text: "Jude" }, { label: "D", text: "Peter" }], correctAnswer: "C", verse: "Jude 1:1", explanation: "The letter is attributed to Jude." },
  { id: "jude2", question: "Jude identifies himself as a servant of Jesus Christ and brother of whom?", options: [{ label: "A", text: "John" }, { label: "B", text: "Peter" }, { label: "C", text: "James" }, { label: "D", text: "Paul" }], correctAnswer: "C", verse: "Jude 1:1", explanation: "Jude is the brother of James." },
  { id: "jude3", question: "Jude originally intended to write about the salvation they share but instead felt compelled to urge believers to?", options: [{ label: "A", text: "Stand firm" }, { label: "B", text: "Contend for the faith" }, { label: "C", text: "Love one another" }, { label: "D", text: "Remain faithful" }], correctAnswer: "B", verse: "Jude 1:3", explanation: "The core purpose of the letter." },
  { id: "jude4", question: "The faith believers are to contend for was entrusted to God's holy people once for all?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Partially" }, { label: "D", text: "Gradually" }], correctAnswer: "A", verse: "Jude 1:3", explanation: "The faith is complete and final." },
  { id: "jude5", question: "Jude warns that certain people have secretly slipped into the church and distort the grace of God into?", options: [{ label: "A", text: "False teaching" }, { label: "B", text: "Legalism" }, { label: "C", text: "A license for immorality" }, { label: "D", text: "Tradition" }], correctAnswer: "C", verse: "Jude 1:4", explanation: "Grace abused." },
  { id: "jude6", question: "These people deny Jesus Christ as?", options: [{ label: "A", text: "Savior" }, { label: "B", text: "Teacher" }, { label: "C", text: "Our only Sovereign and Lord" }, { label: "D", text: "Prophet" }], correctAnswer: "C", verse: "Jude 1:4", explanation: "Denial of Christ's authority." },
  { id: "jude7", question: "Jude reminds readers that the Lord delivered His people out of Egypt but later destroyed those who did not?", options: [{ label: "A", text: "Obey" }, { label: "B", text: "Believe" }, { label: "C", text: "Follow" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Jude 1:5", explanation: "Faith required." },
  { id: "jude8", question: "Which beings did not keep their positions of authority?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Angels" }, { label: "C", text: "Kings" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "Jude 1:6", explanation: "Rebellious angels." },
  { id: "jude9", question: "These angels are kept in darkness, bound with everlasting chains for judgment on the?", options: [{ label: "A", text: "Last day" }, { label: "B", text: "Day of wrath" }, { label: "C", text: "Great Day" }, { label: "D", text: "Final judgment" }], correctAnswer: "C", verse: "Jude 1:6", explanation: "Future judgment." },
  { id: "jude10", question: "Which cities are used as examples of punishment by eternal fire?", options: [{ label: "A", text: "Nineveh and Babylon" }, { label: "B", text: "Jericho and Ai" }, { label: "C", text: "Sodom and Gomorrah" }, { label: "D", text: "Tyre and Sidon" }], correctAnswer: "C", verse: "Jude 1:7", explanation: "Judgment for immorality." },
  { id: "jude11", question: "The people Jude warns about follow the way of?", options: [{ label: "A", text: "Abel" }, { label: "B", text: "Cain" }, { label: "C", text: "Moses" }, { label: "D", text: "David" }], correctAnswer: "B", verse: "Jude 1:11", explanation: "Rebellion and hatred." },
  { id: "jude12", question: "They rush for profit into the error of?", options: [{ label: "A", text: "Ahab" }, { label: "B", text: "Jezebel" }, { label: "C", text: "Balaam" }, { label: "D", text: "Saul" }], correctAnswer: "C", verse: "Jude 1:11", explanation: "Greed-driven corruption." },
  { id: "jude13", question: "They are destroyed in Korah's?", options: [{ label: "A", text: "Rebellion" }, { label: "B", text: "Sin" }, { label: "C", text: "Pride" }, { label: "D", text: "Error" }], correctAnswer: "A", verse: "Jude 1:11", explanation: "Authority rejection." },
  { id: "jude14", question: "Jude describes false teachers as blemishes at your?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Prayer meetings" }, { label: "C", text: "Love feasts" }, { label: "D", text: "Gatherings" }], correctAnswer: "C", verse: "Jude 1:12", explanation: "Corrupt influence." },
  { id: "jude15", question: "These people are shepherds who feed only?", options: [{ label: "A", text: "Others" }, { label: "B", text: "The flock" }, { label: "C", text: "Themselves" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "Jude 1:12", explanation: "Self-centered leadership." },
  { id: "jude16", question: "Jude compares them to clouds without?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Direction" }, { label: "C", text: "Power" }, { label: "D", text: "Light" }], correctAnswer: "A", verse: "Jude 1:12", explanation: "Empty promises." },
  { id: "jude17", question: "They are autumn trees without fruit, uprooted and?", options: [{ label: "A", text: "Burned" }, { label: "B", text: "Dead" }, { label: "C", text: "Condemned" }, { label: "D", text: "Destroyed" }], correctAnswer: "B", verse: "Jude 1:12", explanation: "Spiritual death." },
  { id: "jude18", question: "Jude compares them to wild waves of the sea, foaming up their?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Pride" }, { label: "C", text: "Shame" }, { label: "D", text: "Sin" }], correctAnswer: "C", verse: "Jude 1:13", explanation: "Shameless behavior." },
  { id: "jude19", question: "They are wandering stars, for whom blackest darkness is reserved?", options: [{ label: "A", text: "Forever" }, { label: "B", text: "Temporarily" }, { label: "C", text: "Briefly" }, { label: "D", text: "Until judgment" }], correctAnswer: "A", verse: "Jude 1:13", explanation: "Eternal judgment." },
  { id: "jude20", question: "Which Old Testament figure is quoted as prophesying judgment?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Moses" }, { label: "C", text: "Enoch" }, { label: "D", text: "Isaiah" }], correctAnswer: "C", verse: "Jude 1:14", explanation: "Enoch's prophecy." },
  { id: "jude21", question: "Enoch lived in which generation from Adam?", options: [{ label: "A", text: "Third" }, { label: "B", text: "Fifth" }, { label: "C", text: "Seventh" }, { label: "D", text: "Tenth" }], correctAnswer: "C", verse: "Jude 1:14", explanation: "Seventh from Adam." },
  { id: "jude22", question: "The Lord comes with thousands upon thousands of His holy ones to?", options: [{ label: "A", text: "Bless" }, { label: "B", text: "Teach" }, { label: "C", text: "Judge" }, { label: "D", text: "Save" }], correctAnswer: "C", verse: "Jude 1:15", explanation: "Judgment theme." },
  { id: "jude23", question: "False teachers are described as grumblers and?", options: [{ label: "A", text: "Complaining" }, { label: "B", text: "Faultfinders" }, { label: "C", text: "Deceivers" }, { label: "D", text: "Liars" }], correctAnswer: "B", verse: "Jude 1:16", explanation: "Discontented." },
  { id: "jude24", question: "They follow their own evil desires and boast about themselves while flattering others for?", options: [{ label: "A", text: "Fame" }, { label: "B", text: "Influence" }, { label: "C", text: "Advantage" }, { label: "D", text: "Profit" }], correctAnswer: "C", verse: "Jude 1:16", explanation: "Manipulative behavior." },
  { id: "jude25", question: "Jude reminds believers of what was foretold by the apostles of our Lord Jesus Christ?", options: [{ label: "A", text: "False teachers would come" }, { label: "B", text: "Persecution" }, { label: "C", text: "Judgment day" }, { label: "D", text: "The end times" }], correctAnswer: "A", verse: "Jude 1:17-18", explanation: "Apostolic warning." },
  { id: "jude26", question: "In the last times there will be scoffers who follow their own ungodly?", options: [{ label: "A", text: "Ways" }, { label: "B", text: "Desires" }, { label: "C", text: "Teachings" }, { label: "D", text: "Plans" }], correctAnswer: "B", verse: "Jude 1:18", explanation: "Ungodly desires." },
  { id: "jude27", question: "These people divide you and follow mere natural instincts, not having the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Spirit" }, { label: "C", text: "Faith" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Jude 1:19", explanation: "Spiritless." },
  { id: "jude28", question: "Believers are urged to build themselves up in their most holy?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Love" }, { label: "C", text: "Faith" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "Jude 1:20", explanation: "Spiritual growth." },
  { id: "jude29", question: "Believers are instructed to pray in the?", options: [{ label: "A", text: "Name of Jesus" }, { label: "B", text: "Spirit" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Jude 1:20", explanation: "Spirit-led prayer." },
  { id: "jude30", question: "Jude tells believers to keep themselves in God's?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Truth" }, { label: "C", text: "Love" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Jude 1:21", explanation: "Remain in God's love." },
  { id: "jude31", question: "Believers are to wait for the mercy of our Lord Jesus Christ to bring them to?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Eternal life" }, { label: "C", text: "Glory" }, { label: "D", text: "The kingdom" }], correctAnswer: "B", verse: "Jude 1:21", explanation: "Future hope." },
  { id: "jude32", question: "Jude instructs believers to be merciful to those who?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Doubt" }, { label: "C", text: "Err" }, { label: "D", text: "Question" }], correctAnswer: "B", verse: "Jude 1:22", explanation: "Gentle correction." },
  { id: "jude33", question: "Some are saved by snatching them from the?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Pit" }, { label: "C", text: "Darkness" }, { label: "D", text: "Judgment" }], correctAnswer: "A", verse: "Jude 1:23", explanation: "Urgent rescue." },
  { id: "jude34", question: "Believers should show mercy mixed with?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Fear" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Jude 1:23", explanation: "Careful mercy." },
  { id: "jude35", question: "Jude warns believers to hate even the clothing stained by?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Corruption" }, { label: "C", text: "The flesh" }, { label: "D", text: "Evil" }], correctAnswer: "C", verse: "Jude 1:23", explanation: "Avoid contamination." },
  { id: "jude36", question: "Jude closes the letter with a doxology praising God who is able to?", options: [{ label: "A", text: "Save completely" }, { label: "B", text: "Keep you from stumbling" }, { label: "C", text: "Judge the wicked" }, { label: "D", text: "Restore Israel" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "God's preserving power." },
  { id: "jude37", question: "God is able to present believers before His glorious presence without?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Fault" }, { label: "C", text: "Blame" }, { label: "D", text: "Condemnation" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "Blameless presentation." },
  { id: "jude38", question: "This presentation is accompanied by great?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Joy" }, { label: "C", text: "Glory" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "Joyful salvation." },
  { id: "jude39", question: "Jude declares glory, majesty, power, and authority belong to God through?", options: [{ label: "A", text: "The Spirit" }, { label: "B", text: "The church" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Jude 1:25", explanation: "Christ-centered praise." },
  { id: "jude40", question: "God's authority existed before all ages, now, and?", options: [{ label: "A", text: "At judgment" }, { label: "B", text: "Forevermore" }, { label: "C", text: "Until the end" }, { label: "D", text: "In glory" }], correctAnswer: "B", verse: "Jude 1:25", explanation: "Eternal sovereignty." },
  { id: "jude41", question: "A central theme of Jude is the danger of?", options: [{ label: "A", text: "Persecution" }, { label: "B", text: "False teachers" }, { label: "C", text: "Legalism" }, { label: "D", text: "Division" }], correctAnswer: "B", verse: "Jude 1", explanation: "Warning against corruption." },
  { id: "jude42", question: "Jude emphasizes that grace should lead to holiness, not?", options: [{ label: "A", text: "Legalism" }, { label: "B", text: "Pride" }, { label: "C", text: "License" }, { label: "D", text: "Tradition" }], correctAnswer: "C", verse: "Jude 1:4", explanation: "Grace misused." },
  { id: "jude43", question: "Jude's examples from the Old Testament emphasize God's consistent?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Judgment" }, { label: "C", text: "Faithfulness" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "Jude 1:5-7", explanation: "Judgment theme." },
  { id: "jude44", question: "Jude teaches that rebellion against authority leads to?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Loss" }, { label: "C", text: "Destruction" }, { label: "D", text: "Division" }], correctAnswer: "C", verse: "Jude 1:6,11", explanation: "Serious consequences." },
  { id: "jude45", question: "Jude warns against leaders who serve themselves rather than?", options: [{ label: "A", text: "God" }, { label: "B", text: "The church" }, { label: "C", text: "Truth" }, { label: "D", text: "Others" }], correctAnswer: "D", verse: "Jude 1:12", explanation: "Self-serving leadership." },
  { id: "jude46", question: "The metaphors Jude uses emphasize emptiness and?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Chaos" }, { label: "C", text: "Fruitlessness" }, { label: "D", text: "Deception" }], correctAnswer: "C", verse: "Jude 1:12-13", explanation: "No spiritual fruit." },
  { id: "jude47", question: "Jude's quotation of Enoch emphasizes certainty of?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Judgment" }, { label: "C", text: "Grace" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Jude 1:14-15", explanation: "Judgment is coming." },
  { id: "jude48", question: "False teachers are described as boasting and?", options: [{ label: "A", text: "Arguing" }, { label: "B", text: "Grumbling" }, { label: "C", text: "Flattering" }, { label: "D", text: "Manipulating" }], correctAnswer: "C", verse: "Jude 1:16", explanation: "Manipulative flattery." },
  { id: "jude49", question: "Jude calls believers to remember the words spoken beforehand by the?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Angels" }, { label: "C", text: "Apostles" }, { label: "D", text: "Teachers" }], correctAnswer: "C", verse: "Jude 1:17", explanation: "Apostolic authority." },
  { id: "jude50", question: "Scoffers follow ungodly desires and appear in the?", options: [{ label: "A", text: "End times" }, { label: "B", text: "Last times" }, { label: "C", text: "Final days" }, { label: "D", text: "Latter years" }], correctAnswer: "B", verse: "Jude 1:18", explanation: "Last times warning." },
  { id: "jude51", question: "False teachers cause divisions and are described as worldly and?", options: [{ label: "A", text: "Immoral" }, { label: "B", text: "Arrogant" }, { label: "C", text: "Spiritless" }, { label: "D", text: "Faithless" }], correctAnswer: "C", verse: "Jude 1:19", explanation: "Lack the Spirit." },
  { id: "jude52", question: "Believers are instructed to build themselves up through?", options: [{ label: "A", text: "Study" }, { label: "B", text: "Prayer" }, { label: "C", text: "Faith" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "Jude 1:20", explanation: "Spiritual growth." },
  { id: "jude53", question: "Praying in the Spirit implies dependence on?", options: [{ label: "A", text: "God's power" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Wisdom" }], correctAnswer: "A", verse: "Jude 1:20", explanation: "Spirit-led prayer." },
  { id: "jude54", question: "Keeping oneself in God's love involves waiting for Christ's?", options: [{ label: "A", text: "Return" }, { label: "B", text: "Mercy" }, { label: "C", text: "Judgment" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Jude 1:21", explanation: "Mercy-focused hope." },
  { id: "jude55", question: "Jude balances firmness with?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Patience" }, { label: "C", text: "Love" }, { label: "D", text: "Wisdom" }], correctAnswer: "A", verse: "Jude 1:22-23", explanation: "Merciful engagement." },
  { id: "jude56", question: "Snatching others from the fire implies urgency in?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Correction" }, { label: "C", text: "Rescue" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "Jude 1:23", explanation: "Urgent salvation." },
  { id: "jude57", question: "Mercy mixed with fear highlights the danger of?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Sin's influence" }, { label: "C", text: "False teaching" }, { label: "D", text: "Disobedience" }], correctAnswer: "B", verse: "Jude 1:23", explanation: "Sin contaminates." },
  { id: "jude58", question: "Jude's doxology emphasizes God's ability to?", options: [{ label: "A", text: "Save Israel" }, { label: "B", text: "Judge the wicked" }, { label: "C", text: "Preserve believers" }, { label: "D", text: "Destroy evil" }], correctAnswer: "C", verse: "Jude 1:24", explanation: "God keeps believers." },
  { id: "jude59", question: "Being presented without fault reflects God's?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Grace" }, { label: "C", text: "Faithfulness" }, { label: "D", text: "Holiness" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "Grace-centered salvation." },
  { id: "jude60", question: "Jude ends his letter focusing believers on God's eternal?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Authority" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Jude 1:25", explanation: "God reigns forever." },
  { id: "jude61", question: "Jude teaches that false teaching often enters the church?", options: [{ label: "A", text: "Openly" }, { label: "B", text: "Forcefully" }, { label: "C", text: "Secretly" }, { label: "D", text: "Publicly" }], correctAnswer: "C", verse: "Jude 1:4", explanation: "Hidden infiltration." },
  { id: "jude62", question: "Jude emphasizes contending for the faith because it is?", options: [{ label: "A", text: "Fragile" }, { label: "B", text: "Under attack" }, { label: "C", text: "Complete" }, { label: "D", text: "Ancient" }], correctAnswer: "C", verse: "Jude 1:3", explanation: "Once for all delivered." },
  { id: "jude63", question: "The letter of Jude closely parallels which other New Testament book?", options: [{ label: "A", text: "James" }, { label: "B", text: "1 Peter" }, { label: "C", text: "2 Peter" }, { label: "D", text: "Hebrews" }], correctAnswer: "C", verse: "Jude theme", explanation: "Shared warnings." },
  { id: "jude64", question: "Jude's use of Old Testament examples reinforces the continuity of God's?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Character" }, { label: "C", text: "Law" }, { label: "D", text: "Promises" }], correctAnswer: "B", verse: "Jude 1:5-7", explanation: "Consistent justice." },
  { id: "jude65", question: "Jude shows that judgment is certain for those who?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Doubt" }, { label: "C", text: "Reject authority" }, { label: "D", text: "Question faith" }], correctAnswer: "C", verse: "Jude 1:6,11", explanation: "Authority matters." },
  { id: "jude66", question: "The metaphors Jude uses emphasize instability and lack of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Fruit" }, { label: "C", text: "Truth" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Jude 1:12-13", explanation: "No fruit." },
  { id: "jude67", question: "Jude's reference to Enoch highlights awareness of?", options: [{ label: "A", text: "Jewish tradition" }, { label: "B", text: "Apocrypha" }, { label: "C", text: "Scripture" }, { label: "D", text: "Prophecy" }], correctAnswer: "A", verse: "Jude 1:14", explanation: "Jewish tradition usage." },
  { id: "jude68", question: "False teachers are motivated by selfish ambition rather than?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Love" }, { label: "C", text: "Faith" }, { label: "D", text: "Godliness" }], correctAnswer: "D", verse: "Jude 1:16", explanation: "Ungodly motives." },
  { id: "jude69", question: "Jude encourages believers to rely on apostolic?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Teaching" }, { label: "C", text: "Authority" }, { label: "D", text: "Memory" }], correctAnswer: "B", verse: "Jude 1:17", explanation: "Apostolic teaching." },
  { id: "jude70", question: "Scoffers are described as following ungodly desires rather than God's?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Truth" }, { label: "C", text: "Will" }, { label: "D", text: "Command" }], correctAnswer: "C", verse: "Jude 1:18", explanation: "Self-willed." },
  { id: "jude71", question: "False teachers divide the church because they lack the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Law" }], correctAnswer: "A", verse: "Jude 1:19", explanation: "Spiritless division." },
  { id: "jude72", question: "Jude emphasizes spiritual growth through faith and?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Prayer" }, { label: "D", text: "Service" }], correctAnswer: "C", verse: "Jude 1:20", explanation: "Prayerful growth." },
  { id: "jude73", question: "Keeping oneself in God's love implies active?", options: [{ label: "A", text: "Effort" }, { label: "B", text: "Dependence" }, { label: "C", text: "Obedience" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Jude 1:21", explanation: "Dependent trust." },
  { id: "jude74", question: "Jude balances mercy with caution to avoid?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Compromise" }, { label: "C", text: "Conflict" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Jude 1:22-23", explanation: "No compromise." },
  { id: "jude75", question: "The doxology affirms God's ability to keep believers from?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Judgment" }, { label: "C", text: "Stumbling" }, { label: "D", text: "Failure" }], correctAnswer: "C", verse: "Jude 1:24", explanation: "Divine preservation." },
  { id: "jude76", question: "Jude's doxology emphasizes joy in God's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Salvation" }, { label: "C", text: "Grace" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "Joyful salvation." },
  { id: "jude77", question: "Jude directs all glory and authority to God through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "The Spirit" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "Jude 1:25", explanation: "Christ-centered." },
  { id: "jude78", question: "Jude's closing emphasizes God's authority across all?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Ages" }, { label: "C", text: "Nations" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Jude 1:25", explanation: "Eternal reign." },
  { id: "jude79", question: "The letter of Jude encourages vigilance because danger comes from?", options: [{ label: "A", text: "Outside the church" }, { label: "B", text: "Within the church" }, { label: "C", text: "False religions" }, { label: "D", text: "Persecution" }], correctAnswer: "B", verse: "Jude 1:4", explanation: "Internal threat." },
  { id: "jude80", question: "Jude teaches that true faith produces?", options: [{ label: "A", text: "Freedom" }, { label: "B", text: "Holiness" }, { label: "C", text: "Tolerance" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "Jude theme", explanation: "Faithful living." },
  { id: "jude81", question: "Jude's warning shows that doctrine and behavior are?", options: [{ label: "A", text: "Separate" }, { label: "B", text: "Related" }, { label: "C", text: "Independent" }, { label: "D", text: "Optional" }], correctAnswer: "B", verse: "Jude theme", explanation: "Belief shapes life." },
  { id: "jude82", question: "Jude stresses remembering apostolic teaching to remain?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Alert" }, { label: "C", text: "Grounded" }, { label: "D", text: "Prepared" }], correctAnswer: "C", verse: "Jude 1:17", explanation: "Stay grounded." },
  { id: "jude83", question: "The letter emphasizes spiritual maturity through building up faith and?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Truth" }, { label: "C", text: "Prayer" }, { label: "D", text: "Knowledge" }], correctAnswer: "C", verse: "Jude 1:20", explanation: "Prayer-centered growth." },
  { id: "jude84", question: "Jude's call to mercy shows that correction should be done with?", options: [{ label: "A", text: "Firmness" }, { label: "B", text: "Fear" }, { label: "C", text: "Compassion" }, { label: "D", text: "Authority" }], correctAnswer: "C", verse: "Jude 1:22", explanation: "Compassionate correction." },
  { id: "jude85", question: "Jude warns believers to hate sin without hating?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "People" }, { label: "C", text: "Authority" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "Jude 1:23", explanation: "Love people, hate sin." },
  { id: "jude86", question: "The doxology assures believers that God is able to complete their?", options: [{ label: "A", text: "Mission" }, { label: "B", text: "Faith" }, { label: "C", text: "Salvation" }, { label: "D", text: "Journey" }], correctAnswer: "C", verse: "Jude 1:24", explanation: "Salvation assured." },
  { id: "jude87", question: "Jude's theology highlights God's power and believer's?", options: [{ label: "A", text: "Responsibility" }, { label: "B", text: "Dependence" }, { label: "C", text: "Obedience" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Jude theme", explanation: "Dependence on God." },
  { id: "jude88", question: "Jude teaches that false teaching often appeals to?", options: [{ label: "A", text: "Logic" }, { label: "B", text: "Emotion" }, { label: "C", text: "Desire" }, { label: "D", text: "Tradition" }], correctAnswer: "C", verse: "Jude 1:16", explanation: "Appeals to desire." },
  { id: "jude89", question: "Jude calls believers to active faith, not passive?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Waiting" }, { label: "C", text: "Observation" }, { label: "D", text: "Endurance" }], correctAnswer: "C", verse: "Jude 1:3", explanation: "Active contending." },
  { id: "jude90", question: "The letter shows that love without truth becomes?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Dangerous" }, { label: "C", text: "False" }, { label: "D", text: "Meaningless" }], correctAnswer: "C", verse: "Jude theme", explanation: "Truth matters." },
  { id: "jude91", question: "Jude demonstrates that faithfulness sometimes requires?", options: [{ label: "A", text: "Conflict" }, { label: "B", text: "Separation" }, { label: "C", text: "Courage" }, { label: "D", text: "Endurance" }], correctAnswer: "C", verse: "Jude 1:3", explanation: "Courage to contend." },
  { id: "jude92", question: "Jude's letter encourages believers to rely on God's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Power" }, { label: "C", text: "Grace" }, { label: "D", text: "Authority" }], correctAnswer: "C", verse: "Jude 1:24", explanation: "Grace sustains." },
  { id: "jude93", question: "The letter emphasizes vigilance until Christ's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Reign" }], correctAnswer: "B", verse: "Jude theme", explanation: "Watchful waiting." },
  { id: "jude94", question: "Jude's warnings are meant to protect the church's?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Purity" }, { label: "D", text: "Mission" }], correctAnswer: "C", verse: "Jude theme", explanation: "Church purity." },
  { id: "jude95", question: "Jude teaches that God's judgment and mercy are both expressions of His?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Power" }, { label: "C", text: "Character" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "Jude theme", explanation: "God's character." },
  { id: "jude96", question: "The letter emphasizes spiritual alertness in response to?", options: [{ label: "A", text: "Persecution" }, { label: "B", text: "False teaching" }, { label: "C", text: "Suffering" }, { label: "D", text: "Hardship" }], correctAnswer: "B", verse: "Jude 1", explanation: "Primary threat." },
  { id: "jude97", question: "Jude's closing praise shifts focus from human failure to God's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Power" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "Jude 1:24", explanation: "God keeps believers." },
  { id: "jude98", question: "Jude ultimately points believers toward hope rooted in?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Faith" }, { label: "C", text: "God" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "Jude 1:24-25", explanation: "Hope in God." },
  { id: "jude99", question: "The final tone of Jude is one of warning mixed with?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Judgment" }, { label: "C", text: "Hope" }, { label: "D", text: "Correction" }], correctAnswer: "C", verse: "Jude theme", explanation: "Hopeful assurance." },
  { id: "jude100", question: "The lasting message of Jude is to contend for the faith, reject false teaching, and trust God to?", options: [{ label: "A", text: "Judge the wicked" }, { label: "B", text: "Save the church" }, { label: "C", text: "Keep believers secure" }, { label: "D", text: "Destroy evil" }], correctAnswer: "C", verse: "Jude 1:24", explanation: "God preserves His people." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JudeTriviaPage() {
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

        // Fetch user's progress for jude questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "jude");

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
          book: "jude",
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
            book: "jude",
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
    if (score === 10) return "Perfect! You're a Jude expert!";
    if (score >= 8) return "Excellent! You know Jude well!";
    if (score >= 6) return "Good job! Keep studying Jude!";
    if (score >= 4) return "Nice try! Jude has much to explore!";
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
              href="/bible-trivia/jude"
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
