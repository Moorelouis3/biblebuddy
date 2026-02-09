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
  { id: "2timothy1", question: "Who wrote the book of 2 Timothy?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "2 Timothy 1:1", explanation: "Paul identifies himself as the author." },
  { id: "2timothy2", question: "To whom is 2 Timothy written?", options: [{ label: "A", text: "Titus" }, { label: "B", text: "Timothy" }, { label: "C", text: "Silas" }, { label: "D", text: "Mark" }], correctAnswer: "B", verse: "2 Timothy 1:2", explanation: "Timothy was Paul's spiritual son." },
  { id: "2timothy3", question: "Paul calls Timothy his dear?", options: [{ label: "A", text: "Brother" }, { label: "B", text: "Servant" }, { label: "C", text: "Son" }, { label: "D", text: "Friend" }], correctAnswer: "C", verse: "2 Timothy 1:2", explanation: "Close spiritual relationship." },
  { id: "2timothy4", question: "Paul thanks God as he remembers Timothy in his?", options: [{ label: "A", text: "Letters" }, { label: "B", text: "Prayers" }, { label: "C", text: "Thoughts" }, { label: "D", text: "Journeys" }], correctAnswer: "B", verse: "2 Timothy 1:3", explanation: "Faithful prayer." },
  { id: "2timothy5", question: "Paul recalls Timothy's sincere faith that first lived in his grandmother?", options: [{ label: "A", text: "Hannah" }, { label: "B", text: "Lois" }, { label: "C", text: "Eunice" }, { label: "D", text: "Deborah" }], correctAnswer: "B", verse: "2 Timothy 1:5", explanation: "Faith heritage." },
  { id: "2timothy6", question: "Timothy's mother was named?", options: [{ label: "A", text: "Martha" }, { label: "B", text: "Mary" }, { label: "C", text: "Eunice" }, { label: "D", text: "Priscilla" }], correctAnswer: "C", verse: "2 Timothy 1:5", explanation: "Faith passed down." },
  { id: "2timothy7", question: "Paul urges Timothy to fan into flame the gift of?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Leadership" }, { label: "C", text: "God" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Timothy 1:6", explanation: "Spiritual renewal." },
  { id: "2timothy8", question: "God gave us a spirit not of fear but of power, love, and?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Self-discipline" }, { label: "C", text: "Faith" }, { label: "D", text: "Boldness" }], correctAnswer: "B", verse: "2 Timothy 1:7", explanation: "Spirit-empowered living." },
  { id: "2timothy9", question: "Timothy is urged not to be ashamed of the testimony about?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "The church" }, { label: "C", text: "The Lord" }, { label: "D", text: "The gospel" }], correctAnswer: "C", verse: "2 Timothy 1:8", explanation: "Bold faith." },
  { id: "2timothy10", question: "Paul is suffering for the gospel but says he is not?", options: [{ label: "A", text: "Afraid" }, { label: "B", text: "Ashamed" }, { label: "C", text: "Worried" }, { label: "D", text: "Discouraged" }], correctAnswer: "B", verse: "2 Timothy 1:12", explanation: "Confidence in Christ." },
  { id: "2timothy11", question: "Paul knows whom he has?", options: [{ label: "A", text: "Served" }, { label: "B", text: "Believed" }, { label: "C", text: "Trusted" }, { label: "D", text: "Followed" }], correctAnswer: "B", verse: "2 Timothy 1:12", explanation: "Assurance of faith." },
  { id: "2timothy12", question: "Paul is convinced God is able to guard what he has entrusted until that?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Day" }, { label: "C", text: "Hour" }, { label: "D", text: "Moment" }], correctAnswer: "B", verse: "2 Timothy 1:12", explanation: "Eternal security." },
  { id: "2timothy13", question: "Timothy is told to keep the pattern of sound teaching with faith and love in?", options: [{ label: "A", text: "God" }, { label: "B", text: "Truth" }, { label: "C", text: "Christ Jesus" }, { label: "D", text: "The Spirit" }], correctAnswer: "C", verse: "2 Timothy 1:13", explanation: "Christ-centered doctrine." },
  { id: "2timothy14", question: "Timothy is to guard the good deposit through the Holy Spirit who lives in?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "The church" }, { label: "C", text: "Us" }, { label: "D", text: "Paul" }], correctAnswer: "C", verse: "2 Timothy 1:14", explanation: "Spirit empowerment." },
  { id: "2timothy15", question: "Everyone in the province of Asia deserted Paul, including?", options: [{ label: "A", text: "Demas" }, { label: "B", text: "Phygelus and Hermogenes" }, { label: "C", text: "Alexander" }, { label: "D", text: "Hymenaeus" }], correctAnswer: "B", verse: "2 Timothy 1:15", explanation: "Painful abandonment." },
  { id: "2timothy16", question: "Who often refreshed Paul and was not ashamed of his chains?", options: [{ label: "A", text: "Tychicus" }, { label: "B", text: "Luke" }, { label: "C", text: "Onesiphorus" }, { label: "D", text: "Mark" }], correctAnswer: "C", verse: "2 Timothy 1:16", explanation: "Faithful loyalty." },
  { id: "2timothy17", question: "Onesiphorus searched hard for Paul when he was in?", options: [{ label: "A", text: "Ephesus" }, { label: "B", text: "Rome" }, { label: "C", text: "Corinth" }, { label: "D", text: "Philippi" }], correctAnswer: "B", verse: "2 Timothy 1:17", explanation: "Faithful service." },
  { id: "2timothy18", question: "Paul prays Onesiphorus may find mercy from the Lord on that?", options: [{ label: "A", text: "Day" }, { label: "B", text: "Hour" }, { label: "C", text: "Time" }, { label: "D", text: "Judgment" }], correctAnswer: "A", verse: "2 Timothy 1:18", explanation: "Future hope." },
  { id: "2timothy19", question: "Paul tells Timothy to be strong in the grace that is in?", options: [{ label: "A", text: "God" }, { label: "B", text: "Truth" }, { label: "C", text: "Christ Jesus" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Timothy 2:1", explanation: "Strength through grace." },
  { id: "2timothy20", question: "What Timothy has heard he should entrust to reliable people who will also be qualified to?", options: [{ label: "A", text: "Lead" }, { label: "B", text: "Teach" }, { label: "C", text: "Serve" }, { label: "D", text: "Preach" }], correctAnswer: "B", verse: "2 Timothy 2:2", explanation: "Multiplying disciples." },
  { id: "2timothy21", question: "Paul tells Timothy to endure hardship like a good?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Leader" }, { label: "C", text: "Soldier" }, { label: "D", text: "Teacher" }], correctAnswer: "C", verse: "2 Timothy 2:3", explanation: "Spiritual endurance." },
  { id: "2timothy22", question: "A soldier does not get entangled in civilian affairs but seeks to please his?", options: [{ label: "A", text: "Leader" }, { label: "B", text: "Commander" }, { label: "C", text: "Officer" }, { label: "D", text: "Master" }], correctAnswer: "B", verse: "2 Timothy 2:4", explanation: "Focused service." },
  { id: "2timothy23", question: "An athlete does not receive the victor's crown unless he competes according to the?", options: [{ label: "A", text: "Rules" }, { label: "B", text: "Law" }, { label: "C", text: "Game" }, { label: "D", text: "Standard" }], correctAnswer: "A", verse: "2 Timothy 2:5", explanation: "Discipline required." },
  { id: "2timothy24", question: "The hardworking farmer should be the first to receive a share of the?", options: [{ label: "A", text: "Harvest" }, { label: "B", text: "Crop" }, { label: "C", text: "Fruit" }, { label: "D", text: "Field" }], correctAnswer: "A", verse: "2 Timothy 2:6", explanation: "Reward for labor." },
  { id: "2timothy25", question: "Paul tells Timothy to reflect on what he is saying, for the Lord will give him?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Understanding" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Insight" }], correctAnswer: "B", verse: "2 Timothy 2:7", explanation: "Divine understanding." },
  { id: "2timothy26", question: "Timothy is urged to remember Jesus Christ, raised from the dead, descended from?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "David" }, { label: "C", text: "Jacob" }, { label: "D", text: "Judah" }], correctAnswer: "B", verse: "2 Timothy 2:8", explanation: "Messianic lineage." },
  { id: "2timothy27", question: "Paul says he is suffering to the point of being chained like a?", options: [{ label: "A", text: "Criminal" }, { label: "B", text: "Slave" }, { label: "C", text: "Prisoner" }, { label: "D", text: "Rebel" }], correctAnswer: "A", verse: "2 Timothy 2:9", explanation: "Suffering for the gospel." },
  { id: "2timothy28", question: "Paul endures everything for the sake of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Elect" }, { label: "C", text: "Believers" }, { label: "D", text: "Faithful" }], correctAnswer: "B", verse: "2 Timothy 2:10", explanation: "Gospel mission." },
  { id: "2timothy29", question: "If we died with Christ, we will also?", options: [{ label: "A", text: "Rise" }, { label: "B", text: "Reign" }, { label: "C", text: "Live with Him" }, { label: "D", text: "Serve Him" }], correctAnswer: "C", verse: "2 Timothy 2:11", explanation: "Union with Christ." },
  { id: "2timothy30", question: "If we endure, we will also?", options: [{ label: "A", text: "Be saved" }, { label: "B", text: "Be crowned" }, { label: "C", text: "Reign with Him" }, { label: "D", text: "Be honored" }], correctAnswer: "C", verse: "2 Timothy 2:12", explanation: "Reward for endurance." },
  { id: "2timothy31", question: "If we disown Christ, He will?", options: [{ label: "A", text: "Forgive us" }, { label: "B", text: "Restore us" }, { label: "C", text: "Disown us" }, { label: "D", text: "Judge us" }], correctAnswer: "C", verse: "2 Timothy 2:12", explanation: "Serious warning." },
  { id: "2timothy32", question: "If we are faithless, Christ remains faithful because He cannot?", options: [{ label: "A", text: "Fail" }, { label: "B", text: "Lie" }, { label: "C", text: "Deny Himself" }, { label: "D", text: "Change" }], correctAnswer: "C", verse: "2 Timothy 2:13", explanation: "God's faithfulness." },
  { id: "2timothy33", question: "Timothy is warned to avoid quarreling about words because it is of no value and only?", options: [{ label: "A", text: "Confuses" }, { label: "B", text: "Ruins" }, { label: "C", text: "Distracts" }, { label: "D", text: "Divides" }], correctAnswer: "B", verse: "2 Timothy 2:14", explanation: "Fruitless debate." },
  { id: "2timothy34", question: "Timothy is urged to present himself to God as one approved, a worker who does not need to be?", options: [{ label: "A", text: "Ashamed" }, { label: "B", text: "Corrected" }, { label: "C", text: "Rebuked" }, { label: "D", text: "Tested" }], correctAnswer: "A", verse: "2 Timothy 2:15", explanation: "Faithful service." },
  { id: "2timothy35", question: "Timothy must correctly handle the word of?", options: [{ label: "A", text: "God" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "2 Timothy 2:15", explanation: "Sound doctrine." },
  { id: "2timothy36", question: "Timothy is told to avoid godless chatter because it leads people into more and more?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Sin" }, { label: "C", text: "Ungodliness" }, { label: "D", text: "Error" }], correctAnswer: "C", verse: "2 Timothy 2:16", explanation: "Spiritual danger." },
  { id: "2timothy37", question: "Paul compares false teaching to a disease that spreads like?", options: [{ label: "A", text: "Leprosy" }, { label: "B", text: "Gangrene" }, { label: "C", text: "Cancer" }, { label: "D", text: "Plague" }], correctAnswer: "B", verse: "2 Timothy 2:17", explanation: "Destructive influence." },
  { id: "2timothy38", question: "Hymenaeus and Philetus claimed the resurrection had already?", options: [{ label: "A", text: "Begun" }, { label: "B", text: "Passed" }, { label: "C", text: "Happened" }, { label: "D", text: "Ended" }], correctAnswer: "C", verse: "2 Timothy 2:18", explanation: "False doctrine." },
  { id: "2timothy39", question: "God's solid foundation stands firm, sealed with the inscription: The Lord knows those who are?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "His" }, { label: "C", text: "Righteous" }, { label: "D", text: "Chosen" }], correctAnswer: "B", verse: "2 Timothy 2:19", explanation: "Divine ownership." },
  { id: "2timothy40", question: "Everyone who confesses the name of the Lord must turn away from?", options: [{ label: "A", text: "Error" }, { label: "B", text: "Sin" }, { label: "C", text: "Wickedness" }, { label: "D", text: "Evil" }], correctAnswer: "C", verse: "2 Timothy 2:19", explanation: "Holy living." },
  { id: "2timothy41", question: "In a large house there are articles not only of gold and silver but also of?", options: [{ label: "A", text: "Stone and clay" }, { label: "B", text: "Wood and clay" }, { label: "C", text: "Iron and bronze" }, { label: "D", text: "Copper and stone" }], correctAnswer: "B", verse: "2 Timothy 2:20", explanation: "Vessels of honor." },
  { id: "2timothy42", question: "Those who cleanse themselves will be instruments for special purposes, made holy, useful to the Master and prepared for every?", options: [{ label: "A", text: "Service" }, { label: "B", text: "Calling" }, { label: "C", text: "Task" }, { label: "D", text: "Good work" }], correctAnswer: "D", verse: "2 Timothy 2:21", explanation: "Godly usefulness." },
  { id: "2timothy43", question: "Timothy is told to flee youthful passions and pursue righteousness, faith, love, and?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Patience" }, { label: "C", text: "Humility" }, { label: "D", text: "Gentleness" }], correctAnswer: "A", verse: "2 Timothy 2:22", explanation: "Holy pursuits." },
  { id: "2timothy44", question: "The Lord's servant must not be quarrelsome but must be kind to everyone, able to teach, and not?", options: [{ label: "A", text: "Angry" }, { label: "B", text: "Harsh" }, { label: "C", text: "Resentful" }, { label: "D", text: "Violent" }], correctAnswer: "A", verse: "2 Timothy 2:24", explanation: "Christlike conduct." },
  { id: "2timothy45", question: "Opponents must be gently instructed in the hope that God will grant them?", options: [{ label: "A", text: "Forgiveness" }, { label: "B", text: "Repentance" }, { label: "C", text: "Mercy" }, { label: "D", text: "Understanding" }], correctAnswer: "B", verse: "2 Timothy 2:25", explanation: "Restoration goal." },
  { id: "2timothy46", question: "Paul warns that in the last days there will be times of great?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Persecution" }, { label: "C", text: "Difficulty" }, { label: "D", text: "Confusion" }], correctAnswer: "C", verse: "2 Timothy 3:1", explanation: "End-times warning." },
  { id: "2timothy47", question: "People will be lovers of themselves, lovers of money, boastful, proud, abusive, disobedient to their parents, ungrateful, and?", options: [{ label: "A", text: "Unholy" }, { label: "B", text: "Unfaithful" }, { label: "C", text: "Unkind" }, { label: "D", text: "Unjust" }], correctAnswer: "A", verse: "2 Timothy 3:2", explanation: "Moral decay." },
  { id: "2timothy48", question: "They will have a form of godliness but deny its?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Power" }, { label: "C", text: "Authority" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "2 Timothy 3:5", explanation: "False religion." },
  { id: "2timothy49", question: "Paul says to have nothing to do with such?", options: [{ label: "A", text: "People" }, { label: "B", text: "Teachers" }, { label: "C", text: "Practices" }, { label: "D", text: "Beliefs" }], correctAnswer: "A", verse: "2 Timothy 3:5", explanation: "Separation from error." },
  { id: "2timothy50", question: "Paul compares false teachers to Jannes and Jambres who opposed?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Moses" }, { label: "C", text: "Aaron" }, { label: "D", text: "Joshua" }], correctAnswer: "B", verse: "2 Timothy 3:8", explanation: "Old Testament reference." },
  { id: "2timothy51", question: "Their folly will be clear to everyone just as it was with?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "The Egyptians" }, { label: "C", text: "Those men" }, { label: "D", text: "The sorcerers" }], correctAnswer: "C", verse: "2 Timothy 3:9", explanation: "Truth exposed." },
  { id: "2timothy52", question: "Timothy has closely followed Paul's teaching, conduct, purpose, faith, patience, love, endurance, persecutions, and?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Trials" }, { label: "C", text: "Hardships" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "2 Timothy 3:10-11", explanation: "Faithful example." },
  { id: "2timothy53", question: "Everyone who wants to live a godly life in Christ Jesus will be?", options: [{ label: "A", text: "Rewarded" }, { label: "B", text: "Blessed" }, { label: "C", text: "Persecuted" }, { label: "D", text: "Opposed" }], correctAnswer: "C", verse: "2 Timothy 3:12", explanation: "Cost of discipleship." },
  { id: "2timothy54", question: "Evil people and impostors will go from bad to worse, deceiving and being?", options: [{ label: "A", text: "Deceived" }, { label: "B", text: "Judged" }, { label: "C", text: "Exposed" }, { label: "D", text: "Condemned" }], correctAnswer: "A", verse: "2 Timothy 3:13", explanation: "Spiritual deception." },
  { id: "2timothy55", question: "Timothy is told to continue in what he has learned and has become convinced of, knowing from whom he learned it and that from infancy he has known the holy?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Scriptures" }, { label: "C", text: "Word" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "2 Timothy 3:15", explanation: "Scriptural foundation." },
  { id: "2timothy56", question: "The Scriptures are able to make one wise for salvation through faith in?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Word" }, { label: "C", text: "Christ Jesus" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Timothy 3:15", explanation: "Salvation in Christ." },
  { id: "2timothy57", question: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting, and?", options: [{ label: "A", text: "Training in righteousness" }, { label: "B", text: "Encouragement" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "2 Timothy 3:16", explanation: "Purpose of Scripture." },
  { id: "2timothy58", question: "Scripture equips the servant of God for every?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Ministry" }, { label: "C", text: "Good work" }, { label: "D", text: "Task" }], correctAnswer: "C", verse: "2 Timothy 3:17", explanation: "Complete preparation." },
  { id: "2timothy59", question: "Paul charges Timothy in the presence of God and Christ Jesus, who will judge the living and the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Dead" }, { label: "C", text: "Church" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "2 Timothy 4:1", explanation: "Final judgment." },
  { id: "2timothy60", question: "Timothy is commanded to preach the word and be prepared in season and out of?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Season" }, { label: "C", text: "Opportunity" }, { label: "D", text: "Context" }], correctAnswer: "B", verse: "2 Timothy 4:2", explanation: "Urgency of preaching." },
  { id: "2timothy61", question: "Timothy is told to correct, rebuke, and encourage with great patience and careful?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Instruction" }, { label: "C", text: "Discipline" }, { label: "D", text: "Wisdom" }], correctAnswer: "A", verse: "2 Timothy 4:2", explanation: "Balanced ministry." },
  { id: "2timothy62", question: "People will not put up with sound doctrine but will gather teachers to suit their own?", options: [{ label: "A", text: "Beliefs" }, { label: "B", text: "Desires" }, { label: "C", text: "Opinions" }, { label: "D", text: "Needs" }], correctAnswer: "B", verse: "2 Timothy 4:3", explanation: "Self-centered teaching." },
  { id: "2timothy63", question: "They will turn their ears away from the truth and turn aside to?", options: [{ label: "A", text: "False teachings" }, { label: "B", text: "Myths" }, { label: "C", text: "Lies" }, { label: "D", text: "Stories" }], correctAnswer: "B", verse: "2 Timothy 4:4", explanation: "Rejection of truth." },
  { id: "2timothy64", question: "Timothy is told to keep his head in all situations, endure hardship, do the work of an?", options: [{ label: "A", text: "Apostle" }, { label: "B", text: "Teacher" }, { label: "C", text: "Evangelist" }, { label: "D", text: "Overseer" }], correctAnswer: "C", verse: "2 Timothy 4:5", explanation: "Faithful ministry." },
  { id: "2timothy65", question: "Paul says he is already being poured out like a?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Offering" }, { label: "C", text: "Drink offering" }, { label: "D", text: "Lamb" }], correctAnswer: "C", verse: "2 Timothy 4:6", explanation: "Life poured out." },
  { id: "2timothy66", question: "Paul says the time for his departure is?", options: [{ label: "A", text: "Soon" }, { label: "B", text: "Near" }, { label: "C", text: "At hand" }, { label: "D", text: "Coming" }], correctAnswer: "C", verse: "2 Timothy 4:6", explanation: "Approaching death." },
  { id: "2timothy67", question: "Paul says he has fought the good fight, finished the race, and kept the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Gospel" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "2 Timothy 4:7", explanation: "Faithful perseverance." },
  { id: "2timothy68", question: "A crown of righteousness is in store for Paul, which the Lord will award on that?", options: [{ label: "A", text: "Day" }, { label: "B", text: "Time" }, { label: "C", text: "Hour" }, { label: "D", text: "Judgment" }], correctAnswer: "A", verse: "2 Timothy 4:8", explanation: "Future reward." },
  { id: "2timothy69", question: "This crown will also be given to all who have longed for Christ's?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "Return" }, { label: "C", text: "Glory" }, { label: "D", text: "Appearing" }], correctAnswer: "D", verse: "2 Timothy 4:8", explanation: "Hope of Christ." },
  { id: "2timothy70", question: "Who deserted Paul because he loved this world?", options: [{ label: "A", text: "Crescens" }, { label: "B", text: "Demas" }, { label: "C", text: "Titus" }, { label: "D", text: "Alexander" }], correctAnswer: "B", verse: "2 Timothy 4:10", explanation: "Worldly attachment." },
  { id: "2timothy71", question: "Crescens went to?", options: [{ label: "A", text: "Galatia" }, { label: "B", text: "Rome" }, { label: "C", text: "Asia" }, { label: "D", text: "Macedonia" }], correctAnswer: "A", verse: "2 Timothy 4:10", explanation: "Mission assignment." },
  { id: "2timothy72", question: "Titus went to?", options: [{ label: "A", text: "Crete" }, { label: "B", text: "Dalmatia" }, { label: "C", text: "Corinth" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "2 Timothy 4:10", explanation: "Mission field." },
  { id: "2timothy73", question: "Who alone was with Paul at the end?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Mark" }, { label: "C", text: "Luke" }, { label: "D", text: "Tychicus" }], correctAnswer: "C", verse: "2 Timothy 4:11", explanation: "Faithful companion." },
  { id: "2timothy74", question: "Paul asks Timothy to bring Mark because he is helpful in?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Service" }, { label: "C", text: "Ministry" }, { label: "D", text: "Teaching" }], correctAnswer: "C", verse: "2 Timothy 4:11", explanation: "Restored usefulness." },
  { id: "2timothy75", question: "Paul sent Tychicus to?", options: [{ label: "A", text: "Crete" }, { label: "B", text: "Ephesus" }, { label: "C", text: "Rome" }, { label: "D", text: "Corinth" }], correctAnswer: "B", verse: "2 Timothy 4:12", explanation: "Mission movement." },
  { id: "2timothy76", question: "Paul asks Timothy to bring the cloak left with Carpus at?", options: [{ label: "A", text: "Troas" }, { label: "B", text: "Philippi" }, { label: "C", text: "Corinth" }, { label: "D", text: "Colossae" }], correctAnswer: "A", verse: "2 Timothy 4:13", explanation: "Personal request." },
  { id: "2timothy77", question: "Paul also asks for the scrolls, especially the?", options: [{ label: "A", text: "Letters" }, { label: "B", text: "Books" }, { label: "C", text: "Parchments" }, { label: "D", text: "Writings" }], correctAnswer: "C", verse: "2 Timothy 4:13", explanation: "Scriptural devotion." },
  { id: "2timothy78", question: "Alexander the metalworker did Paul a great deal of?", options: [{ label: "A", text: "Harm" }, { label: "B", text: "Damage" }, { label: "C", text: "Opposition" }, { label: "D", text: "Trouble" }], correctAnswer: "A", verse: "2 Timothy 4:14", explanation: "Hostile opposition." },
  { id: "2timothy79", question: "Paul says the Lord will repay Alexander for what he has?", options: [{ label: "A", text: "Done" }, { label: "B", text: "Caused" }, { label: "C", text: "Spoken" }, { label: "D", text: "Planned" }], correctAnswer: "A", verse: "2 Timothy 4:14", explanation: "Divine justice." },
  { id: "2timothy80", question: "At Paul's first defense, no one came to his support, but everyone?", options: [{ label: "A", text: "Denied him" }, { label: "B", text: "Abandoned him" }, { label: "C", text: "Rejected him" }, { label: "D", text: "Left him" }], correctAnswer: "B", verse: "2 Timothy 4:16", explanation: "Lonely trial." },
  { id: "2timothy81", question: "Paul prays that it may not be held against?", options: [{ label: "A", text: "Them" }, { label: "B", text: "Anyone" }, { label: "C", text: "Believers" }, { label: "D", text: "Others" }], correctAnswer: "A", verse: "2 Timothy 4:16", explanation: "Forgiving spirit." },
  { id: "2timothy82", question: "The Lord stood at Paul's side and gave him strength so that through him the message might be fully?", options: [{ label: "A", text: "Preached" }, { label: "B", text: "Proclaimed" }, { label: "C", text: "Declared" }, { label: "D", text: "Known" }], correctAnswer: "B", verse: "2 Timothy 4:17", explanation: "God's faithfulness." },
  { id: "2timothy83", question: "Paul was delivered from the mouth of the?", options: [{ label: "A", text: "Enemy" }, { label: "B", text: "Beast" }, { label: "C", text: "Lion" }, { label: "D", text: "Dragon" }], correctAnswer: "C", verse: "2 Timothy 4:17", explanation: "Divine rescue." },
  { id: "2timothy84", question: "The Lord will rescue Paul from every evil attack and bring him safely to His?", options: [{ label: "A", text: "Presence" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Glory" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "2 Timothy 4:18", explanation: "Eternal hope." },
  { id: "2timothy85", question: "Paul gives greetings to Priscilla, Aquila, and the household of?", options: [{ label: "A", text: "Stephanas" }, { label: "B", text: "Onesiphorus" }, { label: "C", text: "Philemon" }, { label: "D", text: "Lydia" }], correctAnswer: "B", verse: "2 Timothy 4:19", explanation: "Faithful family." },
  { id: "2timothy86", question: "Erastus stayed in?", options: [{ label: "A", text: "Ephesus" }, { label: "B", text: "Rome" }, { label: "C", text: "Corinth" }, { label: "D", text: "Troas" }], correctAnswer: "C", verse: "2 Timothy 4:20", explanation: "Mission details." },
  { id: "2timothy87", question: "Trophimus was left sick in?", options: [{ label: "A", text: "Miletus" }, { label: "B", text: "Troas" }, { label: "C", text: "Ephesus" }, { label: "D", text: "Philippi" }], correctAnswer: "A", verse: "2 Timothy 4:20", explanation: "Human limitation." },
  { id: "2timothy88", question: "Paul urges Timothy to come before?", options: [{ label: "A", text: "Winter" }, { label: "B", text: "Spring" }, { label: "C", text: "Summer" }, { label: "D", text: "Passover" }], correctAnswer: "A", verse: "2 Timothy 4:21", explanation: "Urgent request." },
  { id: "2timothy89", question: "Who sends greetings to Timothy?", options: [{ label: "A", text: "Eubulus" }, { label: "B", text: "Pudens" }, { label: "C", text: "Linus" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Timothy 4:21", explanation: "Community support." },
  { id: "2timothy90", question: "Paul's final prayer is that the Lord be with Timothy's?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Heart" }, { label: "C", text: "Spirit" }, { label: "D", text: "Life" }], correctAnswer: "C", verse: "2 Timothy 4:22", explanation: "Spiritual blessing." },
  { id: "2timothy91", question: "Paul ends the letter by saying grace be with?", options: [{ label: "A", text: "You" }, { label: "B", text: "All of you" }, { label: "C", text: "Believers" }, { label: "D", text: "The church" }], correctAnswer: "B", verse: "2 Timothy 4:22", explanation: "Grace-filled close." },
  { id: "2timothy92", question: "2 Timothy is often considered Paul's final?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Sermon" }, { label: "C", text: "Prayer" }, { label: "D", text: "Letter" }], correctAnswer: "D", verse: "2 Timothy 4", explanation: "Final epistle." },
  { id: "2timothy93", question: "A major theme of 2 Timothy is faithfulness amid?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Growth" }, { label: "C", text: "Suffering" }, { label: "D", text: "Prosperity" }], correctAnswer: "C", verse: "2 Timothy 1-4", explanation: "Endurance theme." },
  { id: "2timothy94", question: "Paul repeatedly encourages Timothy not to be?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Afraid" }, { label: "C", text: "Ashamed" }, { label: "D", text: "Silent" }], correctAnswer: "C", verse: "2 Timothy 1:8", explanation: "Bold faith." },
  { id: "2timothy95", question: "A key focus of the letter is guarding sound?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Doctrine" }, { label: "C", text: "Faith" }, { label: "D", text: "Belief" }], correctAnswer: "B", verse: "2 Timothy 1:13", explanation: "Doctrinal purity." },
  { id: "2timothy96", question: "Paul emphasizes perseverance by using metaphors of a soldier, athlete, and?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Teacher" }, { label: "C", text: "Farmer" }, { label: "D", text: "Builder" }], correctAnswer: "C", verse: "2 Timothy 2:3-6", explanation: "Illustrations of endurance." },
  { id: "2timothy97", question: "Paul teaches that Scripture is inspired by?", options: [{ label: "A", text: "Men" }, { label: "B", text: "God" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "2 Timothy 3:16", explanation: "Divine inspiration." },
  { id: "2timothy98", question: "Paul's life demonstrates finishing well despite?", options: [{ label: "A", text: "Failure" }, { label: "B", text: "Opposition" }, { label: "C", text: "Abandonment" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Timothy 4", explanation: "Faithful finish." },
  { id: "2timothy99", question: "Paul's confidence rests in the Lord's righteous?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Reward" }, { label: "C", text: "Justice" }, { label: "D", text: "Promise" }], correctAnswer: "A", verse: "2 Timothy 4:8", explanation: "Trust in God." },
  { id: "2timothy100", question: "The lasting message of 2 Timothy is to remain faithful to Christ, guard the gospel, and endure to the?", options: [{ label: "A", text: "End" }, { label: "B", text: "Finish" }, { label: "C", text: "Crown" }, { label: "D", text: "Reward" }], correctAnswer: "A", verse: "2 Timothy 4:7-8", explanation: "Faithful endurance." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondTimothyTriviaPage() {
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
          .eq("book", "2timothy");

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
          book: "2timothy",
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
            book: "2timothy",
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
    if (score === 10) return "Perfect! You're a 2 Timothy expert!";
    if (score >= 8) return "Excellent! You know 2 Timothy well!";
    if (score >= 6) return "Good job! Keep studying 2 Timothy!";
    if (score >= 4) return "Nice try! 2 Timothy has much to explore!";
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
              href="/bible-trivia/2-timothy"
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

