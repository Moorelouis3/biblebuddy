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
  { id: "ephesians1", question: "Who wrote the book of Ephesians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "Ephesians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "ephesians2", question: "To whom is Ephesians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Church in Ephesus" }, { label: "C", text: "Church in Corinth" }, { label: "D", text: "Church in Philippi" }], correctAnswer: "B", verse: "Ephesians 1:1", explanation: "Addressed to believers in Ephesus." },
  { id: "ephesians3", question: "Believers are blessed with every spiritual blessing where?", options: [{ label: "A", text: "In heaven" }, { label: "B", text: "In Christ" }, { label: "C", text: "In the Spirit" }, { label: "D", text: "In faith" }], correctAnswer: "B", verse: "Ephesians 1:3", explanation: "All blessings are found in Christ." },
  { id: "ephesians4", question: "God chose believers before the foundation of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "World" }, { label: "C", text: "Law" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Ephesians 1:4", explanation: "Election before creation." },
  { id: "ephesians5", question: "Believers were chosen to be?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Holy and blameless" }, { label: "C", text: "Faithful" }, { label: "D", text: "Obedient" }], correctAnswer: "B", verse: "Ephesians 1:4", explanation: "God's purpose." },
  { id: "ephesians6", question: "Believers were predestined for?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Adoption" }, { label: "C", text: "Glory" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 1:5", explanation: "Adopted as children." },
  { id: "ephesians7", question: "Redemption comes through Christ's?", options: [{ label: "A", text: "Resurrection" }, { label: "B", text: "Blood" }, { label: "C", text: "Faith" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Ephesians 1:7", explanation: "Forgiveness through His sacrifice." },
  { id: "ephesians8", question: "God lavished grace with all?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom and understanding" }, { label: "C", text: "Faith" }, { label: "D", text: "Mercy" }], correctAnswer: "B", verse: "Ephesians 1:8", explanation: "Grace is abundant." },
  { id: "ephesians9", question: "God's plan is to unite all things in?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Christ" }, { label: "C", text: "The church" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Ephesians 1:10", explanation: "Christ-centered plan." },
  { id: "ephesians10", question: "Believers were chosen according to God's?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Purpose" }, { label: "C", text: "Grace" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 1:11", explanation: "God's sovereign will." },
  { id: "ephesians11", question: "Believers were marked with a seal, the?", options: [{ label: "A", text: "Promise" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Law" }, { label: "D", text: "Covenant" }], correctAnswer: "B", verse: "Ephesians 1:13", explanation: "Spirit as seal." },
  { id: "ephesians12", question: "The Spirit is a deposit guaranteeing?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Inheritance" }, { label: "C", text: "Grace" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "Ephesians 1:14", explanation: "Future hope." },
  { id: "ephesians13", question: "Paul prays believers receive the Spirit of?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom and revelation" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 1:17", explanation: "Knowing God." },
  { id: "ephesians14", question: "The hope believers are called to is?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "His calling" }, { label: "C", text: "Faith" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 1:18", explanation: "Hope in God's plan." },
  { id: "ephesians15", question: "God raised Christ and seated Him at His?", options: [{ label: "A", text: "Left hand" }, { label: "B", text: "Right hand" }, { label: "C", text: "Throne" }, { label: "D", text: "Presence" }], correctAnswer: "B", verse: "Ephesians 1:20", explanation: "Authority position." },
  { id: "ephesians16", question: "Christ is far above all?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Rule and authority" }, { label: "C", text: "Powers" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Ephesians 1:21", explanation: "Supreme authority." },
  { id: "ephesians17", question: "God placed all things under Christ's?", options: [{ label: "A", text: "Feet" }, { label: "B", text: "Authority" }, { label: "C", text: "Power" }, { label: "D", text: "Rule" }], correctAnswer: "A", verse: "Ephesians 1:22", explanation: "Complete authority." },
  { id: "ephesians18", question: "Christ is head over the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Church" }, { label: "C", text: "Believers" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Ephesians 1:22", explanation: "Church leadership." },
  { id: "ephesians19", question: "Believers were dead in?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Transgressions and sins" }, { label: "C", text: "Law" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 2:1", explanation: "Spiritual death." },
  { id: "ephesians20", question: "Believers followed the ways of this?", options: [{ label: "A", text: "World" }, { label: "B", text: "Age" }, { label: "C", text: "Culture" }, { label: "D", text: "System" }], correctAnswer: "A", verse: "Ephesians 2:2", explanation: "Former lifestyle." },
  { id: "ephesians21", question: "God is rich in?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Mercy" }, { label: "C", text: "Love" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Ephesians 2:4", explanation: "Merciful God." },
  { id: "ephesians22", question: "Believers are made alive with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Spirit" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 2:5", explanation: "Union with Christ." },
  { id: "ephesians23", question: "Believers are saved by?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Grace" }, { label: "C", text: "Law" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "Ephesians 2:8", explanation: "Grace alone." },
  { id: "ephesians24", question: "Salvation is through?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Faith" }, { label: "C", text: "Obedience" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Ephesians 2:8", explanation: "Faith response." },
  { id: "ephesians25", question: "Salvation is a gift from?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "Grace" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Ephesians 2:8", explanation: "Gift of God." },
  { id: "ephesians26", question: "Believers are not saved by?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Works" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Ephesians 2:9", explanation: "No boasting." },
  { id: "ephesians27", question: "Believers are God's?", options: [{ label: "A", text: "Children" }, { label: "B", text: "Handiwork" }, { label: "C", text: "Servants" }, { label: "D", text: "Creation" }], correctAnswer: "B", verse: "Ephesians 2:10", explanation: "Created in Christ." },
  { id: "ephesians28", question: "Believers were created to do?", options: [{ label: "A", text: "Good works" }, { label: "B", text: "Faithful acts" }, { label: "C", text: "Obedience" }, { label: "D", text: "Service" }], correctAnswer: "A", verse: "Ephesians 2:10", explanation: "Prepared by God." },
  { id: "ephesians29", question: "Gentiles were once?", options: [{ label: "A", text: "Included" }, { label: "B", text: "Excluded" }, { label: "C", text: "Saved" }, { label: "D", text: "Chosen" }], correctAnswer: "B", verse: "Ephesians 2:12", explanation: "Former separation." },
  { id: "ephesians30", question: "Christ brought near those who were?", options: [{ label: "A", text: "Lost" }, { label: "B", text: "Far away" }, { label: "C", text: "Excluded" }, { label: "D", text: "Unworthy" }], correctAnswer: "B", verse: "Ephesians 2:13", explanation: "Reconciliation." },
  { id: "ephesians31", question: "Christ Himself is our?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Peace" }, { label: "C", text: "Hope" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 2:14", explanation: "Unity in Christ." },
  { id: "ephesians32", question: "Christ destroyed the dividing wall of?", options: [{ label: "A", text: "Hatred" }, { label: "B", text: "Hostility" }, { label: "C", text: "Sin" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Ephesians 2:14", explanation: "Barrier removed." },
  { id: "ephesians33", question: "Christ abolished the law of?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Commandments and ordinances" }, { label: "C", text: "Faith" }, { label: "D", text: "Works" }], correctAnswer: "B", verse: "Ephesians 2:15", explanation: "New covenant." },
  { id: "ephesians34", question: "Christ created one new?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Humanity" }, { label: "C", text: "Body" }, { label: "D", text: "Covenant" }], correctAnswer: "B", verse: "Ephesians 2:15", explanation: "Unity." },
  { id: "ephesians35", question: "Both Jews and Gentiles have access to the Father through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "One Spirit" }, { label: "C", text: "Christ" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 2:18", explanation: "One Spirit access." },
  { id: "ephesians36", question: "Believers are members of?", options: [{ label: "A", text: "God's family" }, { label: "B", text: "The church" }, { label: "C", text: "The kingdom" }, { label: "D", text: "Heaven" }], correctAnswer: "A", verse: "Ephesians 2:19", explanation: "Family of God." },
  { id: "ephesians37", question: "The church is built on the foundation of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Apostles and prophets" }, { label: "C", text: "Christ" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Ephesians 2:20", explanation: "Foundation truth." },
  { id: "ephesians38", question: "The chief cornerstone is?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Paul" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Ephesians 2:20", explanation: "Christ-centered." },
  { id: "ephesians39", question: "The church grows into a holy?", options: [{ label: "A", text: "House" }, { label: "B", text: "Temple" }, { label: "C", text: "Body" }, { label: "D", text: "Family" }], correctAnswer: "B", verse: "Ephesians 2:21", explanation: "Dwelling of God." },
  { id: "ephesians40", question: "Believers are built together to become a dwelling for?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God by the Spirit" }, { label: "C", text: "The church" }, { label: "D", text: "The kingdom" }], correctAnswer: "B", verse: "Ephesians 2:22", explanation: "God's presence." },
  { id: "ephesians41", question: "Paul is a prisoner of?", options: [{ label: "A", text: "Rome" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The gospel" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 3:1", explanation: "Servant of Christ." },
  { id: "ephesians42", question: "The mystery made known is that Gentiles are?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Heirs together" }, { label: "C", text: "Included" }, { label: "D", text: "Forgiven" }], correctAnswer: "B", verse: "Ephesians 3:6", explanation: "Equal inheritance." },
  { id: "ephesians43", question: "The mystery was revealed through the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Spirit" }, { label: "C", text: "Scripture" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "Ephesians 3:5", explanation: "Spirit revelation." },
  { id: "ephesians44", question: "Paul preached the unsearchable riches of?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "Ephesians 3:8", explanation: "Christ's riches." },
  { id: "ephesians45", question: "God's wisdom is displayed through the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Law" }, { label: "C", text: "Spirit" }, { label: "D", text: "Gospel" }], correctAnswer: "A", verse: "Ephesians 3:10", explanation: "Church testimony." },
  { id: "ephesians46", question: "Believers have bold access to God through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Spirit" }, { label: "D", text: "Grace" }], correctAnswer: "A", verse: "Ephesians 3:12", explanation: "Confident access." },
  { id: "ephesians47", question: "Paul prays believers are strengthened with power through the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Spirit" }, { label: "C", text: "Church" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "Ephesians 3:16", explanation: "Inner strength." },
  { id: "ephesians48", question: "Christ dwells in hearts through?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Faith" }, { label: "C", text: "Spirit" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Ephesians 3:17", explanation: "Faith-filled hearts." },
  { id: "ephesians49", question: "Believers are rooted and established in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 3:17", explanation: "Love foundation." },
  { id: "ephesians50", question: "God is able to do immeasurably more than?", options: [{ label: "A", text: "We think" }, { label: "B", text: "All we ask or imagine" }, { label: "C", text: "We hope" }, { label: "D", text: "We believe" }], correctAnswer: "B", verse: "Ephesians 3:20", explanation: "God's power." },
  { id: "ephesians51", question: "Glory belongs to God in the church and in?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 3:21", explanation: "Eternal glory." },
  { id: "ephesians52", question: "Believers are urged to live a life worthy of their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Calling" }, { label: "C", text: "Salvation" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 4:1", explanation: "Worthy walk." },
  { id: "ephesians53", question: "Believers should be completely humble and?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Gentle" }, { label: "C", text: "Patient" }, { label: "D", text: "Kind" }], correctAnswer: "B", verse: "Ephesians 4:2", explanation: "Christlike attitude." },
  { id: "ephesians54", question: "Believers should bear with one another in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 4:2", explanation: "Unity in love." },
  { id: "ephesians55", question: "Believers should make every effort to keep the unity of the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Spirit" }, { label: "C", text: "Church" }, { label: "D", text: "Body" }], correctAnswer: "B", verse: "Ephesians 4:3", explanation: "Spirit unity." },
  { id: "ephesians56", question: "There is one?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Body" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 4:4", explanation: "Unity truth." },
  { id: "ephesians57", question: "There is one Lord, one faith, one?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Hope" }, { label: "C", text: "Baptism" }, { label: "D", text: "Church" }], correctAnswer: "C", verse: "Ephesians 4:5", explanation: "Shared faith." },
  { id: "ephesians58", question: "Grace was given to each one as Christ?", options: [{ label: "A", text: "Decided" }, { label: "B", text: "Apportioned it" }, { label: "C", text: "Promised" }, { label: "D", text: "Willed" }], correctAnswer: "B", verse: "Ephesians 4:7", explanation: "Grace gifts." },
  { id: "ephesians59", question: "Christ gave gifts to?", options: [{ label: "A", text: "All people" }, { label: "B", text: "The church" }, { label: "C", text: "Believers" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "Ephesians 4:8-11", explanation: "Church building." },
  { id: "ephesians60", question: "The purpose of gifts is to?", options: [{ label: "A", text: "Teach" }, { label: "B", text: "Equip the saints" }, { label: "C", text: "Lead" }, { label: "D", text: "Serve" }], correctAnswer: "B", verse: "Ephesians 4:12", explanation: "Ministry preparation." },
  { id: "ephesians61", question: "The goal is unity in the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Faith" }, { label: "C", text: "Church" }, { label: "D", text: "Body" }], correctAnswer: "B", verse: "Ephesians 4:13", explanation: "Unified faith." },
  { id: "ephesians62", question: "Believers should no longer be?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Infants" }, { label: "C", text: "Worldly" }, { label: "D", text: "Foolish" }], correctAnswer: "B", verse: "Ephesians 4:14", explanation: "Spiritual maturity." },
  { id: "ephesians63", question: "Speaking the truth in?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Love" }, { label: "C", text: "Faith" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ephesians 4:15", explanation: "Truth with love." },
  { id: "ephesians64", question: "The body builds itself up in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 4:16", explanation: "Love-centered growth." },
  { id: "ephesians65", question: "Believers must no longer live as the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Gentiles" }, { label: "C", text: "Unbelievers" }, { label: "D", text: "Sinners" }], correctAnswer: "B", verse: "Ephesians 4:17", explanation: "New life call." },
  { id: "ephesians66", question: "Believers are taught to put off the?", options: [{ label: "A", text: "Old self" }, { label: "B", text: "Law" }, { label: "C", text: "World" }, { label: "D", text: "Flesh" }], correctAnswer: "A", verse: "Ephesians 4:22", explanation: "Old nature removed." },
  { id: "ephesians67", question: "Believers are to be made new in the attitude of their?", options: [{ label: "A", text: "Hearts" }, { label: "B", text: "Minds" }, { label: "C", text: "Spirits" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 4:23", explanation: "Mind renewal." },
  { id: "ephesians68", question: "Believers are to put on the?", options: [{ label: "A", text: "New self" }, { label: "B", text: "Armor" }, { label: "C", text: "Faith" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "Ephesians 4:24", explanation: "New identity." },
  { id: "ephesians69", question: "Believers should put off falsehood and speak?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Grace" }, { label: "D", text: "Kindness" }], correctAnswer: "A", verse: "Ephesians 4:25", explanation: "Honesty." },
  { id: "ephesians70", question: "Do not let the sun go down while you are?", options: [{ label: "A", text: "Sad" }, { label: "B", text: "Angry" }, { label: "C", text: "Upset" }, { label: "D", text: "Hurt" }], correctAnswer: "B", verse: "Ephesians 4:26", explanation: "Anger caution." },
  { id: "ephesians71", question: "Do not give the devil a?", options: [{ label: "A", text: "Place" }, { label: "B", text: "Chance" }, { label: "C", text: "Hold" }, { label: "D", text: "Way" }], correctAnswer: "A", verse: "Ephesians 4:27", explanation: "Spiritual vigilance." },
  { id: "ephesians72", question: "Anyone who has been stealing must?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Stop stealing" }, { label: "C", text: "Give" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ephesians 4:28", explanation: "Behavior change." },
  { id: "ephesians73", question: "Believers should use words to?", options: [{ label: "A", text: "Correct" }, { label: "B", text: "Build others up" }, { label: "C", text: "Teach" }, { label: "D", text: "Convict" }], correctAnswer: "B", verse: "Ephesians 4:29", explanation: "Edifying speech." },
  { id: "ephesians74", question: "Believers should not grieve the?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Son" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Ephesians 4:30", explanation: "Spirit sensitivity." },
  { id: "ephesians75", question: "Believers are sealed for the day of?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Redemption" }, { label: "C", text: "Salvation" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "Ephesians 4:30", explanation: "Future hope." },
  { id: "ephesians76", question: "Believers should get rid of bitterness, rage, anger, and?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Malice" }, { label: "C", text: "Pride" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "Ephesians 4:31", explanation: "Old attitudes." },
  { id: "ephesians77", question: "Believers should be kind and?", options: [{ label: "A", text: "Gentle" }, { label: "B", text: "Compassionate" }, { label: "C", text: "Patient" }, { label: "D", text: "Loving" }], correctAnswer: "B", verse: "Ephesians 4:32", explanation: "Christlike behavior." },
  { id: "ephesians78", question: "Forgive as God forgave you in?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Christ" }, { label: "C", text: "Love" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 4:32", explanation: "Model forgiveness." },
  { id: "ephesians79", question: "Believers should imitate?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "Leaders" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 5:1", explanation: "Imitate God." },
  { id: "ephesians80", question: "Believers should walk in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 5:2", explanation: "Love-filled life." },
  { id: "ephesians81", question: "Christ gave Himself up as a?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Fragrant offering" }, { label: "C", text: "Gift" }, { label: "D", text: "Ransom" }], correctAnswer: "B", verse: "Ephesians 5:2", explanation: "Pleasing sacrifice." },
  { id: "ephesians82", question: "Believers should avoid sexual immorality and?", options: [{ label: "A", text: "Greed" }, { label: "B", text: "Impurity" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Ephesians 5:3", explanation: "Holy living." },
  { id: "ephesians83", question: "There should be no obscene or foolish?", options: [{ label: "A", text: "Actions" }, { label: "B", text: "Talk" }, { label: "C", text: "Thoughts" }, { label: "D", text: "Behavior" }], correctAnswer: "B", verse: "Ephesians 5:4", explanation: "Speech matters." },
  { id: "ephesians84", question: "Believers should live as children of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Light" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 5:8", explanation: "Light lifestyle." },
  { id: "ephesians85", question: "The fruit of light consists of goodness, righteousness, and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Love" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 5:9", explanation: "Light fruit." },
  { id: "ephesians86", question: "Believers should find out what pleases the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Lord" }, { label: "C", text: "Spirit" }, { label: "D", text: "Father" }], correctAnswer: "B", verse: "Ephesians 5:10", explanation: "God-centered life." },
  { id: "ephesians87", question: "Have nothing to do with the fruitless deeds of?", options: [{ label: "A", text: "Worldliness" }, { label: "B", text: "Darkness" }, { label: "C", text: "Sin" }, { label: "D", text: "Evil" }], correctAnswer: "B", verse: "Ephesians 5:11", explanation: "Reject darkness." },
  { id: "ephesians88", question: "Everything exposed by the light becomes?", options: [{ label: "A", text: "Known" }, { label: "B", text: "Visible" }, { label: "C", text: "Clear" }, { label: "D", text: "Pure" }], correctAnswer: "B", verse: "Ephesians 5:13", explanation: "Light reveals." },
  { id: "ephesians89", question: "Believers should be careful how they live, not as unwise but as?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Wise" }, { label: "C", text: "Strong" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "Ephesians 5:15", explanation: "Wise living." },
  { id: "ephesians90", question: "Make the most of every?", options: [{ label: "A", text: "Day" }, { label: "B", text: "Opportunity" }, { label: "C", text: "Moment" }, { label: "D", text: "Chance" }], correctAnswer: "B", verse: "Ephesians 5:16", explanation: "Redeeming time." },
  { id: "ephesians91", question: "Do not get drunk on wine, but be filled with the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Faith" }, { label: "C", text: "Word" }, { label: "D", text: "Truth" }], correctAnswer: "A", verse: "Ephesians 5:18", explanation: "Spirit-filled life." },
  { id: "ephesians92", question: "Believers should speak to one another with psalms, hymns, and?", options: [{ label: "A", text: "Songs" }, { label: "B", text: "Spiritual songs" }, { label: "C", text: "Praise" }, { label: "D", text: "Words" }], correctAnswer: "B", verse: "Ephesians 5:19", explanation: "Worshipful speech." },
  { id: "ephesians93", question: "Always give thanks to God the Father for?", options: [{ label: "A", text: "Many things" }, { label: "B", text: "Everything" }, { label: "C", text: "Blessings" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Ephesians 5:20", explanation: "Grateful heart." },
  { id: "ephesians94", question: "Submit to one another out of reverence for?", options: [{ label: "A", text: "God" }, { label: "B", text: "Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Ephesians 5:21", explanation: "Mutual submission." },
  { id: "ephesians95", question: "Wives are instructed to submit to their husbands as to the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Lord" }, { label: "C", text: "Church" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 5:22", explanation: "Marriage order." },
  { id: "ephesians96", question: "Husbands are commanded to love their wives as Christ loved the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Church" }, { label: "C", text: "Believers" }, { label: "D", text: "Family" }], correctAnswer: "B", verse: "Ephesians 5:25", explanation: "Sacrificial love." },
  { id: "ephesians97", question: "Christ cleanses the church by the washing with?", options: [{ label: "A", text: "Water" }, { label: "B", text: "The word" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ephesians 5:26", explanation: "Word purification." },
  { id: "ephesians98", question: "Marriage reflects the mystery of Christ and the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Church" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Believers" }], correctAnswer: "B", verse: "Ephesians 5:32", explanation: "Marriage symbolism." },
  { id: "ephesians99", question: "Children are instructed to obey their parents in the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Lord" }, { label: "C", text: "Faith" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Ephesians 6:1", explanation: "Family order." },
  { id: "ephesians100", question: "Believers are told to put on the full armor of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "Spirit" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Ephesians 6:11", explanation: "Spiritual warfare." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EphesiansTriviaPage() {
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
          .eq("book", "ephesians");

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
          book: "ephesians",
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
            book: "ephesians",
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
    if (score === 10) return "Perfect! You're an Ephesians expert!";
    if (score >= 8) return "Excellent! You know Ephesians well!";
    if (score >= 6) return "Good job! Keep studying Ephesians!";
    if (score >= 4) return "Nice try! Ephesians has much to explore!";
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
              href="/bible-trivia/ephesians"
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






