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
  { id: "galatians1", question: "Who wrote the book of Galatians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "James" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Galatians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "galatians2", question: "To whom is Galatians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Churches in Galatia" }, { label: "C", text: "Church in Corinth" }, { label: "D", text: "Church in Ephesus" }], correctAnswer: "B", verse: "Galatians 1:2", explanation: "Addressed to multiple churches in Galatia." },
  { id: "galatians3", question: "Paul expresses amazement that they are?", options: [{ label: "A", text: "Growing slowly" }, { label: "B", text: "Turning to a different gospel" }, { label: "C", text: "Weak in faith" }, { label: "D", text: "Divided" }], correctAnswer: "B", verse: "Galatians 1:6", explanation: "Warning against false gospel." },
  { id: "galatians4", question: "Paul says there is?", options: [{ label: "A", text: "Another gospel" }, { label: "B", text: "No other gospel" }, { label: "C", text: "Many gospels" }, { label: "D", text: "Hidden gospel" }], correctAnswer: "B", verse: "Galatians 1:7", explanation: "Only one true gospel." },
  { id: "galatians5", question: "Anyone preaching a different gospel should be?", options: [{ label: "A", text: "Corrected" }, { label: "B", text: "Ignored" }, { label: "C", text: "Accursed" }, { label: "D", text: "Forgiven" }], correctAnswer: "C", verse: "Galatians 1:8", explanation: "Strong warning." },
  { id: "galatians6", question: "Paul received his gospel by?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Revelation of Jesus Christ" }, { label: "C", text: "Apostles" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "Galatians 1:12", explanation: "Divine revelation." },
  { id: "galatians7", question: "Paul previously persecuted the?", options: [{ label: "A", text: "Romans" }, { label: "B", text: "Church of God" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Gentiles" }], correctAnswer: "B", verse: "Galatians 1:13", explanation: "His former life." },
  { id: "galatians8", question: "God set Paul apart from?", options: [{ label: "A", text: "Birth" }, { label: "B", text: "His mother's womb" }, { label: "C", text: "Conversion" }, { label: "D", text: "Ministry" }], correctAnswer: "B", verse: "Galatians 1:15", explanation: "Divine calling." },
  { id: "galatians9", question: "Paul first went to?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Arabia" }, { label: "C", text: "Rome" }, { label: "D", text: "Antioch" }], correctAnswer: "B", verse: "Galatians 1:17", explanation: "Early ministry." },
  { id: "galatians10", question: "Who did Paul meet in Jerusalem?", options: [{ label: "A", text: "John" }, { label: "B", text: "Peter" }, { label: "C", text: "James" }, { label: "D", text: "Barnabas" }], correctAnswer: "B", verse: "Galatians 1:18", explanation: "Early apostolic contact." },
  { id: "galatians11", question: "Who is called the Lord's brother?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "James" }, { label: "C", text: "John" }, { label: "D", text: "Jude" }], correctAnswer: "B", verse: "Galatians 1:19", explanation: "Leader in Jerusalem." },
  { id: "galatians12", question: "False believers tried to?", options: [{ label: "A", text: "Teach grace" }, { label: "B", text: "Spy on freedom" }, { label: "C", text: "Encourage faith" }, { label: "D", text: "Unite churches" }], correctAnswer: "B", verse: "Galatians 2:4", explanation: "Threat to freedom." },
  { id: "galatians13", question: "Titus was not compelled to be?", options: [{ label: "A", text: "Baptized" }, { label: "B", text: "Circumcised" }, { label: "C", text: "Trained" }, { label: "D", text: "Sent" }], correctAnswer: "B", verse: "Galatians 2:3", explanation: "Gentile freedom." },
  { id: "galatians14", question: "Paul opposed Peter because he?", options: [{ label: "A", text: "Taught wrongly" }, { label: "B", text: "Was hypocritical" }, { label: "C", text: "Denied Christ" }, { label: "D", text: "Rejected Gentiles" }], correctAnswer: "B", verse: "Galatians 2:11-13", explanation: "Public correction." },
  { id: "galatians15", question: "A person is justified by?", options: [{ label: "A", text: "Works of the law" }, { label: "B", text: "Faith in Jesus Christ" }, { label: "C", text: "Obedience" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Galatians 2:16", explanation: "Core doctrine." },
  { id: "galatians16", question: "Paul says he was crucified with?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Christ" }, { label: "C", text: "Sin" }, { label: "D", text: "World" }], correctAnswer: "B", verse: "Galatians 2:20", explanation: "Union with Christ." },
  { id: "galatians17", question: "Christ lives in Paul through?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Faith" }, { label: "C", text: "Grace" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Galatians 2:20", explanation: "Life of faith." },
  { id: "galatians18", question: "If righteousness came by the law, Christ?", options: [{ label: "A", text: "Failed" }, { label: "B", text: "Died for nothing" }, { label: "C", text: "Suffered" }, { label: "D", text: "Reigned" }], correctAnswer: "B", verse: "Galatians 2:21", explanation: "Law cannot save." },
  { id: "galatians19", question: "Who bewitched the Galatians?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "False teachers" }, { label: "C", text: "Satan" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Galatians 3:1", explanation: "False influence." },
  { id: "galatians20", question: "They received the Spirit by?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Faith" }, { label: "C", text: "Law" }, { label: "D", text: "Circumcision" }], correctAnswer: "B", verse: "Galatians 3:2", explanation: "Spirit through faith." },
  { id: "galatians21", question: "Abraham believed God and it was credited as?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Faith" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 3:6", explanation: "Justification by faith." },
  { id: "galatians22", question: "Those of faith are children of?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Abraham" }, { label: "C", text: "Israel" }, { label: "D", text: "David" }], correctAnswer: "B", verse: "Galatians 3:7", explanation: "Spiritual lineage." },
  { id: "galatians23", question: "The law brings a?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Curse" }, { label: "C", text: "Promise" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "Galatians 3:10", explanation: "Law exposes sin." },
  { id: "galatians24", question: "Christ redeemed us from the curse by becoming a?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Curse" }, { label: "C", text: "Mediator" }, { label: "D", text: "Priest" }], correctAnswer: "B", verse: "Galatians 3:13", explanation: "Redemption." },
  { id: "galatians25", question: "The promise came before the law by?", options: [{ label: "A", text: "30 years" }, { label: "B", text: "430 years" }, { label: "C", text: "100 years" }, { label: "D", text: "1000 years" }], correctAnswer: "B", verse: "Galatians 3:17", explanation: "Promise precedes law." },
  { id: "galatians26", question: "The law was added because of?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Transgressions" }, { label: "C", text: "Faith" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Galatians 3:19", explanation: "Purpose of the law." },
  { id: "galatians27", question: "The law was our guardian until?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Galatians 3:24", explanation: "Temporary role." },
  { id: "galatians28", question: "In Christ there is neither Jew nor?", options: [{ label: "A", text: "Roman" }, { label: "B", text: "Gentile" }, { label: "C", text: "Greek" }, { label: "D", text: "Slave" }], correctAnswer: "C", verse: "Galatians 3:28", explanation: "Unity in Christ." },
  { id: "galatians29", question: "All are one in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "Grace" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Galatians 3:28", explanation: "Spiritual equality." },
  { id: "galatians30", question: "If you belong to Christ, you are?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Abraham's offspring" }, { label: "C", text: "Free" }, { label: "D", text: "Chosen" }], correctAnswer: "B", verse: "Galatians 3:29", explanation: "Heirs of the promise." },
  { id: "galatians31", question: "An heir is subject to guardians until?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "The set time" }, { label: "C", text: "Maturity" }, { label: "D", text: "Freedom" }], correctAnswer: "B", verse: "Galatians 4:2", explanation: "Illustration of law." },
  { id: "galatians32", question: "God sent His Son born of?", options: [{ label: "A", text: "The Spirit" }, { label: "B", text: "A woman" }, { label: "C", text: "Grace" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Galatians 4:4", explanation: "Incarnation." },
  { id: "galatians33", question: "God sent His Son to redeem those under?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Law" }, { label: "C", text: "Curse" }, { label: "D", text: "Bondage" }], correctAnswer: "B", verse: "Galatians 4:5", explanation: "Redemption from law." },
  { id: "galatians34", question: "Believers receive the Spirit crying?", options: [{ label: "A", text: "Lord" }, { label: "B", text: "Abba Father" }, { label: "C", text: "Holy God" }, { label: "D", text: "Jesus" }], correctAnswer: "B", verse: "Galatians 4:6", explanation: "Adoption." },
  { id: "galatians35", question: "You are no longer a slave but a?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Son" }, { label: "C", text: "Heir" }, { label: "D", text: "Disciple" }], correctAnswer: "B", verse: "Galatians 4:7", explanation: "New identity." },
  { id: "galatians36", question: "Paul is concerned they are turning back to?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Weak and worthless principles" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Galatians 4:9", explanation: "Warning." },
  { id: "galatians37", question: "Observing days and months worries?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "James" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Galatians 4:10-11", explanation: "Legalism concern." },
  { id: "galatians38", question: "Paul reminds them they welcomed him as?", options: [{ label: "A", text: "A teacher" }, { label: "B", text: "An angel of God" }, { label: "C", text: "A prophet" }, { label: "D", text: "A leader" }], correctAnswer: "B", verse: "Galatians 4:14", explanation: "Past affection." },
  { id: "galatians39", question: "Paul likens himself to a mother in?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Labor pains" }, { label: "C", text: "Teaching" }, { label: "D", text: "Discipline" }], correctAnswer: "B", verse: "Galatians 4:19", explanation: "Pastoral care." },
  { id: "galatians40", question: "Which woman represents slavery?", options: [{ label: "A", text: "Sarah" }, { label: "B", text: "Hagar" }, { label: "C", text: "Rebecca" }, { label: "D", text: "Leah" }], correctAnswer: "B", verse: "Galatians 4:24", explanation: "Allegory." },
  { id: "galatians41", question: "Which woman represents freedom?", options: [{ label: "A", text: "Hagar" }, { label: "B", text: "Sarah" }, { label: "C", text: "Rachel" }, { label: "D", text: "Miriam" }], correctAnswer: "B", verse: "Galatians 4:26", explanation: "Promise." },
  { id: "galatians42", question: "Believers are children of the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Promise" }, { label: "C", text: "Covenant" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Galatians 4:28", explanation: "Isaac parallel." },
  { id: "galatians43", question: "What must be done with the slave woman?", options: [{ label: "A", text: "Keep her" }, { label: "B", text: "Cast her out" }, { label: "C", text: "Free her" }, { label: "D", text: "Honor her" }], correctAnswer: "B", verse: "Galatians 4:30", explanation: "Law removed." },
  { id: "galatians44", question: "Christ set us free for?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Freedom" }, { label: "C", text: "Faith" }, { label: "D", text: "Service" }], correctAnswer: "B", verse: "Galatians 5:1", explanation: "Freedom purpose." },
  { id: "galatians45", question: "Those who accept circumcision must obey?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Whole law" }, { label: "C", text: "Faith" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Galatians 5:3", explanation: "Law obligation." },
  { id: "galatians46", question: "Trying to be justified by law cuts you off from?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "Promise" }], correctAnswer: "B", verse: "Galatians 5:4", explanation: "Serious warning." },
  { id: "galatians47", question: "The only thing that counts is faith working through?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Love" }, { label: "C", text: "Hope" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 5:6", explanation: "Faith expressed." },
  { id: "galatians48", question: "A little yeast does what?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Leavens the whole batch" }, { label: "C", text: "Purifies" }, { label: "D", text: "Strengthens" }], correctAnswer: "B", verse: "Galatians 5:9", explanation: "Influence spreads." },
  { id: "galatians49", question: "Believers were called to be?", options: [{ label: "A", text: "Obedient" }, { label: "B", text: "Free" }, { label: "C", text: "Holy" }, { label: "D", text: "Faithful" }], correctAnswer: "B", verse: "Galatians 5:13", explanation: "Freedom call." },
  { id: "galatians50", question: "Freedom should not be used to?", options: [{ label: "A", text: "Serve others" }, { label: "B", text: "Indulge the flesh" }, { label: "C", text: "Love" }, { label: "D", text: "Grow" }], correctAnswer: "B", verse: "Galatians 5:13", explanation: "Proper use of freedom." },
  { id: "galatians51", question: "The whole law is fulfilled in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love your neighbor" }, { label: "C", text: "Obedience" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Galatians 5:14", explanation: "Law summarized." },
  { id: "galatians52", question: "If you bite and devour one another you will?", options: [{ label: "A", text: "Win" }, { label: "B", text: "Destroy each other" }, { label: "C", text: "Grow" }, { label: "D", text: "Divide" }], correctAnswer: "B", verse: "Galatians 5:15", explanation: "Warning." },
  { id: "galatians53", question: "Walk by the Spirit and you will not gratify?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Desires of the flesh" }, { label: "C", text: "Law" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Galatians 5:16", explanation: "Spirit-led life." },
  { id: "galatians54", question: "The flesh and Spirit are?", options: [{ label: "A", text: "Aligned" }, { label: "B", text: "In conflict" }, { label: "C", text: "Equal" }, { label: "D", text: "Unified" }], correctAnswer: "B", verse: "Galatians 5:17", explanation: "Internal struggle." },
  { id: "galatians55", question: "Those led by the Spirit are not under the?", options: [{ label: "A", text: "Promise" }, { label: "B", text: "Law" }, { label: "C", text: "Curse" }, { label: "D", text: "World" }], correctAnswer: "B", verse: "Galatians 5:18", explanation: "Freedom from law." },
  { id: "galatians56", question: "Which is NOT a work of the flesh?", options: [{ label: "A", text: "Jealousy" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Peace" }, { label: "D", text: "Hatred" }], correctAnswer: "C", verse: "Galatians 5:19-21", explanation: "Peace is fruit." },
  { id: "galatians57", question: "Those who live like this will not inherit?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Kingdom of God" }, { label: "C", text: "Faith" }, { label: "D", text: "Freedom" }], correctAnswer: "B", verse: "Galatians 5:21", explanation: "Serious warning." },
  { id: "galatians58", question: "The fruit of the Spirit begins with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Joy" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Galatians 5:22", explanation: "Primary fruit." },
  { id: "galatians59", question: "Which is NOT fruit of the Spirit?", options: [{ label: "A", text: "Self-control" }, { label: "B", text: "Patience" }, { label: "C", text: "Anger" }, { label: "D", text: "Kindness" }], correctAnswer: "C", verse: "Galatians 5:22-23", explanation: "Contrast." },
  { id: "galatians60", question: "Against such things there is no?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Law" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Galatians 5:23", explanation: "Fruit fulfills law." },
  { id: "galatians61", question: "Those who belong to Christ have crucified the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Law" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Galatians 5:24", explanation: "New life." },
  { id: "galatians62", question: "If we live by the Spirit, let us?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Keep in step with the Spirit" }, { label: "C", text: "Obey" }, { label: "D", text: "Serve" }], correctAnswer: "B", verse: "Galatians 5:25", explanation: "Daily walk." },
  { id: "galatians63", question: "Believers should not become?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Conceited" }, { label: "C", text: "Faithful" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Galatians 5:26", explanation: "Humility." },
  { id: "galatians64", question: "If someone is caught in sin, restore them with?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Gentleness" }, { label: "C", text: "Discipline" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Galatians 6:1", explanation: "Spirit-led restoration." },
  { id: "galatians65", question: "Carry one another's?", options: [{ label: "A", text: "Sins" }, { label: "B", text: "Burdens" }, { label: "C", text: "Faith" }, { label: "D", text: "Needs" }], correctAnswer: "B", verse: "Galatians 6:2", explanation: "Law of Christ." },
  { id: "galatians66", question: "Each should test their own?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Actions" }, { label: "C", text: "Words" }, { label: "D", text: "Beliefs" }], correctAnswer: "B", verse: "Galatians 6:4", explanation: "Personal responsibility." },
  { id: "galatians67", question: "Each will carry their own?", options: [{ label: "A", text: "Burden" }, { label: "B", text: "Load" }, { label: "C", text: "Sin" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Galatians 6:5", explanation: "Accountability." },
  { id: "galatians68", question: "A person reaps what they?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Sow" }, { label: "C", text: "Desire" }, { label: "D", text: "Choose" }], correctAnswer: "B", verse: "Galatians 6:7", explanation: "Spiritual principle." },
  { id: "galatians69", question: "Sowing to the flesh results in?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Corruption" }, { label: "C", text: "Freedom" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Galatians 6:8", explanation: "Consequence." },
  { id: "galatians70", question: "Sowing to the Spirit results in?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Eternal life" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Galatians 6:8", explanation: "Life outcome." },
  { id: "galatians71", question: "Believers should not grow weary of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Doing good" }, { label: "C", text: "Serving" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 6:9", explanation: "Perseverance." },
  { id: "galatians72", question: "We should do good especially to?", options: [{ label: "A", text: "The poor" }, { label: "B", text: "Believers" }, { label: "C", text: "Leaders" }, { label: "D", text: "Neighbors" }], correctAnswer: "B", verse: "Galatians 6:10", explanation: "Priority care." },
  { id: "galatians73", question: "Paul writes with?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Large letters" }, { label: "C", text: "Bold words" }, { label: "D", text: "Care" }], correctAnswer: "B", verse: "Galatians 6:11", explanation: "Personal emphasis." },
  { id: "galatians74", question: "False teachers want to avoid persecution for?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Cross of Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Galatians 6:12", explanation: "Motivation exposed." },
  { id: "galatians75", question: "Paul boasts only in the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Cross of our Lord Jesus Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Galatians 6:14", explanation: "True boasting." },
  { id: "galatians76", question: "The world has been crucified to Paul and he to the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "World" }, { label: "C", text: "Flesh" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Galatians 6:14", explanation: "New allegiance." },
  { id: "galatians77", question: "Neither circumcision nor uncircumcision means anything but?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "New creation" }, { label: "C", text: "Grace" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 6:15", explanation: "Identity in Christ." },
  { id: "galatians78", question: "Peace and mercy are upon?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The Israel of God" }, { label: "C", text: "Believers" }, { label: "D", text: "The faithful" }], correctAnswer: "B", verse: "Galatians 6:16", explanation: "Blessing." },
  { id: "galatians79", question: "Paul bears marks of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Jesus" }, { label: "C", text: "Suffering" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 6:17", explanation: "Suffering for Christ." },
  { id: "galatians80", question: "Paul asks that no one cause him?", options: [{ label: "A", text: "Pain" }, { label: "B", text: "Trouble" }, { label: "C", text: "Doubt" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Galatians 6:17", explanation: "Final appeal." },
  { id: "galatians81", question: "The grace of Jesus be with your?", options: [{ label: "A", text: "Hearts" }, { label: "B", text: "Spirit" }, { label: "C", text: "Faith" }, { label: "D", text: "Lives" }], correctAnswer: "B", verse: "Galatians 6:18", explanation: "Closing blessing." },
  { id: "galatians82", question: "Main theme of Galatians is?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Justification by faith" }, { label: "C", text: "Obedience" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "Galatians 1-6", explanation: "Salvation by faith alone." },
  { id: "galatians83", question: "Freedom in Christ opposes?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Legalism" }, { label: "C", text: "Grace" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Galatians 5:1", explanation: "Core tension." },
  { id: "galatians84", question: "The Spirit produces?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Fruit" }, { label: "C", text: "Law" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Galatians 5:22", explanation: "Inner change." },
  { id: "galatians85", question: "The law cannot give?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Life" }, { label: "C", text: "Hope" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Galatians 3:21", explanation: "Law's limitation." },
  { id: "galatians86", question: "The gospel Paul preached came from?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Scripture" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Galatians 1:12", explanation: "Divine origin." },
  { id: "galatians87", question: "Believers are justified apart from?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Works of the law" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Galatians 2:16", explanation: "Faith alone." },
  { id: "galatians88", question: "Paul's concern was truth of the gospel being?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Preserved" }, { label: "C", text: "Expanded" }, { label: "D", text: "Changed" }], correctAnswer: "B", verse: "Galatians 2:5", explanation: "Gospel purity." },
  { id: "galatians89", question: "The Spirit comes by?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Hearing with faith" }, { label: "C", text: "Works" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 3:2", explanation: "Faith response." },
  { id: "galatians90", question: "Christians are heirs according to the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Promise" }, { label: "C", text: "Covenant" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Galatians 3:29", explanation: "Inheritance." },
  { id: "galatians91", question: "Legalism enslaves rather than?", options: [{ label: "A", text: "Heals" }, { label: "B", text: "Frees" }, { label: "C", text: "Saves" }, { label: "D", text: "Builds" }], correctAnswer: "B", verse: "Galatians 5:1", explanation: "Contrast." },
  { id: "galatians92", question: "Christian freedom expresses itself through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Galatians 5:13", explanation: "Proper freedom." },
  { id: "galatians93", question: "Walking by the Spirit prevents?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Gratifying the flesh" }, { label: "C", text: "Fear" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "Galatians 5:16", explanation: "Spirit-led life." },
  { id: "galatians94", question: "Restoring a sinner requires watching yourself to avoid?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Temptation" }, { label: "C", text: "Sin" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Galatians 6:1", explanation: "Humility." },
  { id: "galatians95", question: "God cannot be?", options: [{ label: "A", text: "Mocked" }, { label: "B", text: "Questioned" }, { label: "C", text: "Doubted" }, { label: "D", text: "Denied" }], correctAnswer: "A", verse: "Galatians 6:7", explanation: "Divine justice." },
  { id: "galatians96", question: "Perseverance leads to a harvest if we do not?", options: [{ label: "A", text: "Fail" }, { label: "B", text: "Give up" }, { label: "C", text: "Sin" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Galatians 6:9", explanation: "Encouragement." },
  { id: "galatians97", question: "Paul's authority is rooted in?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "The gospel" }, { label: "C", text: "Faith" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Galatians 1:11-12", explanation: "Gospel truth." },
  { id: "galatians98", question: "The cross separates believers from the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "World" }, { label: "C", text: "Flesh" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "Galatians 6:14", explanation: "New identity." },
  { id: "galatians99", question: "True Christianity produces a?", options: [{ label: "A", text: "Religious system" }, { label: "B", text: "New creation" }, { label: "C", text: "Law-abiding life" }, { label: "D", text: "Moral code" }], correctAnswer: "B", verse: "Galatians 6:15", explanation: "Transformation." },
  { id: "galatians100", question: "The final message of Galatians emphasizes?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Grace and freedom in Christ" }, { label: "C", text: "Obedience" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "Galatians 6:18", explanation: "Grace-centered faith." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalatiansTriviaPage() {
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
          .eq("book", "galatians");

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
          book: "galatians",
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
            book: "galatians",
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
    if (score === 10) return "Perfect! You're a Galatians expert!";
    if (score >= 8) return "Excellent! You know Galatians well!";
    if (score >= 6) return "Good job! Keep studying Galatians!";
    if (score >= 4) return "Nice try! Galatians has much to explore!";
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
              href="/bible-trivia/galatians"
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

