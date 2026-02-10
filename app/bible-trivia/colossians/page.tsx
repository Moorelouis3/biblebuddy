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
  { id: "colossians1", question: "Who wrote the book of Colossians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "Colossians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "colossians2", question: "To whom is Colossians written?", options: [{ label: "A", text: "Church in Rome" }, { label: "B", text: "Church in Colossae" }, { label: "C", text: "Church in Corinth" }, { label: "D", text: "Church in Ephesus" }], correctAnswer: "B", verse: "Colossians 1:2", explanation: "Addressed to believers in Colossae." },
  { id: "colossians3", question: "Paul thanks God for the Colossians' faith in?", options: [{ label: "A", text: "God" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The Spirit" }, { label: "D", text: "The gospel" }], correctAnswer: "B", verse: "Colossians 1:4", explanation: "Faith centered on Christ." },
  { id: "colossians4", question: "The Colossians' faith produces love for all the?", options: [{ label: "A", text: "People" }, { label: "B", text: "Saints" }, { label: "C", text: "Believers" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Colossians 1:4", explanation: "Faith expressed in love." },
  { id: "colossians5", question: "Their faith and love spring from the hope stored up in?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "Heaven" }, { label: "C", text: "The gospel" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Colossians 1:5", explanation: "Hope rooted in heaven." },
  { id: "colossians6", question: "The gospel is bearing fruit and growing throughout the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "World" }, { label: "C", text: "Region" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 1:6", explanation: "Global impact." },
  { id: "colossians7", question: "Who taught the Colossians the gospel?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Epaphras" }, { label: "C", text: "Timothy" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "Colossians 1:7", explanation: "Faithful servant." },
  { id: "colossians8", question: "Paul prays that they be filled with the knowledge of God's?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Will" }, { label: "C", text: "Grace" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Colossians 1:9", explanation: "Spiritual understanding." },
  { id: "colossians9", question: "Paul prays they live a life worthy of the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Lord" }, { label: "C", text: "Calling" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 1:10", explanation: "Christ-honoring life." },
  { id: "colossians10", question: "Believers are strengthened with all power according to God's?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Glorious might" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 1:11", explanation: "Divine strength." },
  { id: "colossians11", question: "God has rescued believers from the dominion of?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Darkness" }, { label: "C", text: "Death" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Colossians 1:13", explanation: "Deliverance." },
  { id: "colossians12", question: "God brought believers into the kingdom of His?", options: [{ label: "A", text: "Son" }, { label: "B", text: "Light" }, { label: "C", text: "Spirit" }, { label: "D", text: "Glory" }], correctAnswer: "A", verse: "Colossians 1:13", explanation: "Kingdom transfer." },
  { id: "colossians13", question: "In Christ we have redemption, the forgiveness of?", options: [{ label: "A", text: "Sins" }, { label: "B", text: "Transgressions" }, { label: "C", text: "Debts" }, { label: "D", text: "Failures" }], correctAnswer: "A", verse: "Colossians 1:14", explanation: "Forgiveness through Christ." },
  { id: "colossians14", question: "Christ is the image of the?", options: [{ label: "A", text: "Living God" }, { label: "B", text: "Invisible God" }, { label: "C", text: "Holy God" }, { label: "D", text: "Eternal God" }], correctAnswer: "B", verse: "Colossians 1:15", explanation: "Revelation of God." },
  { id: "colossians15", question: "Christ is the firstborn over all?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Creation" }, { label: "C", text: "Believers" }, { label: "D", text: "Powers" }], correctAnswer: "B", verse: "Colossians 1:15", explanation: "Supremacy of Christ." },
  { id: "colossians16", question: "All things were created by Christ and for?", options: [{ label: "A", text: "God" }, { label: "B", text: "Him" }, { label: "C", text: "The church" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Colossians 1:16", explanation: "Christ-centered creation." },
  { id: "colossians17", question: "Christ holds all things?", options: [{ label: "A", text: "Together" }, { label: "B", text: "Firm" }, { label: "C", text: "In place" }, { label: "D", text: "Secure" }], correctAnswer: "A", verse: "Colossians 1:17", explanation: "Sustaining power." },
  { id: "colossians18", question: "Christ is the head of the?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "Church" }, { label: "C", text: "World" }, { label: "D", text: "Believers" }], correctAnswer: "B", verse: "Colossians 1:18", explanation: "Church authority." },
  { id: "colossians19", question: "Christ is the beginning and firstborn from the?", options: [{ label: "A", text: "Dead" }, { label: "B", text: "Grave" }, { label: "C", text: "Resurrection" }, { label: "D", text: "Tomb" }], correctAnswer: "A", verse: "Colossians 1:18", explanation: "Resurrection priority." },
  { id: "colossians20", question: "God was pleased to have all His fullness dwell in?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "The Spirit" }, { label: "C", text: "Heaven" }, { label: "D", text: "The church" }], correctAnswer: "A", verse: "Colossians 1:19", explanation: "Divine fullness." },
  { id: "colossians21", question: "God reconciled all things through the blood of the?", options: [{ label: "A", text: "Lamb" }, { label: "B", text: "Cross" }, { label: "C", text: "Covenant" }, { label: "D", text: "Son" }], correctAnswer: "B", verse: "Colossians 1:20", explanation: "Peace through the cross." },
  { id: "colossians22", question: "Believers were once alienated and enemies in their?", options: [{ label: "A", text: "Actions" }, { label: "B", text: "Minds" }, { label: "C", text: "Hearts" }, { label: "D", text: "Ways" }], correctAnswer: "B", verse: "Colossians 1:21", explanation: "Mental hostility." },
  { id: "colossians23", question: "Christ reconciled believers by His physical body through?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Death" }, { label: "C", text: "Blood" }, { label: "D", text: "Resurrection" }], correctAnswer: "B", verse: "Colossians 1:22", explanation: "Reconciliation accomplished." },
  { id: "colossians24", question: "Believers must continue in the faith, established and?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Firm" }, { label: "C", text: "Faithful" }, { label: "D", text: "Grounded" }], correctAnswer: "D", verse: "Colossians 1:23", explanation: "Steadfast faith." },
  { id: "colossians25", question: "Paul became a servant of the gospel by the commission God gave him to present the word of God in its?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Power" }, { label: "C", text: "Fullness" }, { label: "D", text: "Authority" }], correctAnswer: "C", verse: "Colossians 1:25", explanation: "Complete message." },
  { id: "colossians26", question: "The mystery revealed is Christ in you, the hope of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Salvation" }, { label: "C", text: "Glory" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "Colossians 1:27", explanation: "Indwelling Christ." },
  { id: "colossians27", question: "Paul's goal is to present everyone fully mature in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Truth" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Colossians 1:28", explanation: "Spiritual maturity." },
  { id: "colossians28", question: "Paul struggles with all the energy Christ so powerfully works in?", options: [{ label: "A", text: "Him" }, { label: "B", text: "The church" }, { label: "C", text: "Believers" }, { label: "D", text: "The Spirit" }], correctAnswer: "A", verse: "Colossians 1:29", explanation: "Christ's power." },
  { id: "colossians29", question: "Paul wants their hearts encouraged and united in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Truth" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Colossians 2:2", explanation: "Unity in love." },
  { id: "colossians30", question: "In Christ are hidden all the treasures of wisdom and?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Truth" }, { label: "C", text: "Understanding" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Colossians 2:3", explanation: "Christ's sufficiency." },
  { id: "colossians31", question: "Paul warns believers not to be deceived by fine-sounding?", options: [{ label: "A", text: "Teachings" }, { label: "B", text: "Arguments" }, { label: "C", text: "Words" }, { label: "D", text: "Philosophies" }], correctAnswer: "B", verse: "Colossians 2:4", explanation: "Deceptive reasoning." },
  { id: "colossians32", question: "Believers should continue to live their lives in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Colossians 2:6", explanation: "Christ-centered life." },
  { id: "colossians33", question: "Believers should be rooted and built up in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Truth" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Colossians 2:7", explanation: "Firm foundation." },
  { id: "colossians34", question: "Paul warns against hollow and deceptive philosophy based on?", options: [{ label: "A", text: "Scripture" }, { label: "B", text: "Human tradition" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 2:8", explanation: "Human ideas." },
  { id: "colossians35", question: "In Christ all the fullness of deity lives in?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Bodily form" }, { label: "C", text: "Spirit" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Colossians 2:9", explanation: "Full deity." },
  { id: "colossians36", question: "Believers have been brought to fullness in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Colossians 2:10", explanation: "Complete in Christ." },
  { id: "colossians37", question: "Christ is the head over every power and?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Rule" }, { label: "D", text: "Spirit" }], correctAnswer: "A", verse: "Colossians 2:10", explanation: "Supreme authority." },
  { id: "colossians38", question: "Believers were circumcised with a circumcision not performed by?", options: [{ label: "A", text: "Men" }, { label: "B", text: "Hands" }, { label: "C", text: "The law" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Colossians 2:11", explanation: "Spiritual circumcision." },
  { id: "colossians39", question: "Believers were buried with Christ in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Baptism" }, { label: "C", text: "Death" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Colossians 2:12", explanation: "Union with Christ." },
  { id: "colossians40", question: "God made believers alive with Christ by forgiving all their?", options: [{ label: "A", text: "Debts" }, { label: "B", text: "Sins" }, { label: "C", text: "Transgressions" }, { label: "D", text: "Failures" }], correctAnswer: "B", verse: "Colossians 2:13", explanation: "Forgiveness." },
  { id: "colossians41", question: "The written code that stood against us was nailed to the?", options: [{ label: "A", text: "Tree" }, { label: "B", text: "Cross" }, { label: "C", text: "Altar" }, { label: "D", text: "Grave" }], correctAnswer: "B", verse: "Colossians 2:14", explanation: "Debt canceled." },
  { id: "colossians42", question: "Christ disarmed the powers and authorities and made a public?", options: [{ label: "A", text: "Display" }, { label: "B", text: "Spectacle" }, { label: "C", text: "Example" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Colossians 2:15", explanation: "Triumph over evil." },
  { id: "colossians43", question: "Believers should not let anyone judge them by what they eat or?", options: [{ label: "A", text: "Drink" }, { label: "B", text: "Wear" }, { label: "C", text: "Say" }, { label: "D", text: "Do" }], correctAnswer: "A", verse: "Colossians 2:16", explanation: "Freedom in Christ." },
  { id: "colossians44", question: "These regulations are a shadow of the things that were to come; the reality is found in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Colossians 2:17", explanation: "Christ is the substance." },
  { id: "colossians45", question: "False teachers delight in false humility and the worship of?", options: [{ label: "A", text: "Saints" }, { label: "B", text: "Angels" }, { label: "C", text: "Spirits" }, { label: "D", text: "Idols" }], correctAnswer: "B", verse: "Colossians 2:18", explanation: "False spirituality." },
  { id: "colossians46", question: "Such people have lost connection with the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Head" }, { label: "C", text: "Faith" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Colossians 2:19", explanation: "Disconnected from Christ." },
  { id: "colossians47", question: "Believers died with Christ to the basic principles of the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Law" }, { label: "C", text: "Flesh" }, { label: "D", text: "Sin" }], correctAnswer: "A", verse: "Colossians 2:20", explanation: "Freedom from worldly rules." },
  { id: "colossians48", question: "Human regulations lack any value in restraining?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Sensual indulgence" }, { label: "C", text: "Pride" }, { label: "D", text: "Desire" }], correctAnswer: "B", verse: "Colossians 2:23", explanation: "False discipline." },
  { id: "colossians49", question: "Believers are instructed to set their hearts on things?", options: [{ label: "A", text: "Above" }, { label: "B", text: "Holy" }, { label: "C", text: "Spiritual" }, { label: "D", text: "Eternal" }], correctAnswer: "A", verse: "Colossians 3:1", explanation: "Heavenly focus." },
  { id: "colossians50", question: "Believers' lives are hidden with Christ in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Colossians 3:3", explanation: "Secure identity." },
  { id: "colossians51", question: "When Christ appears, believers will appear with Him in?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Glory" }, { label: "C", text: "Heaven" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Colossians 3:4", explanation: "Future glory." },
  { id: "colossians52", question: "Believers are told to put to death earthly?", options: [{ label: "A", text: "Passions" }, { label: "B", text: "Nature" }, { label: "C", text: "Desires" }, { label: "D", text: "Ways" }], correctAnswer: "B", verse: "Colossians 3:5", explanation: "Old nature." },
  { id: "colossians53", question: "Greed is described as?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Evil" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Colossians 3:5", explanation: "False worship." },
  { id: "colossians54", question: "Because of these sins, the wrath of God is coming on the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Disobedient" }, { label: "C", text: "Ungodly" }, { label: "D", text: "Wicked" }], correctAnswer: "B", verse: "Colossians 3:6", explanation: "Judgment warning." },
  { id: "colossians55", question: "Believers once walked in these ways but must now put them all away including anger, rage, and?", options: [{ label: "A", text: "Malice" }, { label: "B", text: "Greed" }, { label: "C", text: "Hatred" }, { label: "D", text: "Pride" }], correctAnswer: "A", verse: "Colossians 3:8", explanation: "Old behaviors." },
  { id: "colossians56", question: "Believers should not lie to one another since they have taken off the?", options: [{ label: "A", text: "Old self" }, { label: "B", text: "Flesh" }, { label: "C", text: "Sin" }, { label: "D", text: "World" }], correctAnswer: "A", verse: "Colossians 3:9", explanation: "New identity." },
  { id: "colossians57", question: "The new self is being renewed in knowledge in the image of its?", options: [{ label: "A", text: "Creator" }, { label: "B", text: "Lord" }, { label: "C", text: "Father" }, { label: "D", text: "God" }], correctAnswer: "A", verse: "Colossians 3:10", explanation: "Image restoration." },
  { id: "colossians58", question: "In Christ there is no Greek or Jew, slave or free, but Christ is all and is in?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Everyone" }, { label: "C", text: "Us" }, { label: "D", text: "All" }], correctAnswer: "D", verse: "Colossians 3:11", explanation: "Christ-centered unity." },
  { id: "colossians59", question: "Believers should clothe themselves with compassion, kindness, humility, gentleness, and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Patience" }, { label: "C", text: "Love" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Colossians 3:12", explanation: "Christlike virtues." },
  { id: "colossians60", question: "Above all, believers should put on?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Colossians 3:14", explanation: "Perfect bond." },
  { id: "colossians61", question: "Love binds everything together in perfect?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Harmony" }, { label: "C", text: "Peace" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 3:14", explanation: "Complete harmony." },
  { id: "colossians62", question: "Let the peace of Christ rule in your?", options: [{ label: "A", text: "Minds" }, { label: "B", text: "Hearts" }, { label: "C", text: "Lives" }, { label: "D", text: "Souls" }], correctAnswer: "B", verse: "Colossians 3:15", explanation: "Inner peace." },
  { id: "colossians63", question: "Believers are called to be?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Thankful" }, { label: "C", text: "Humble" }, { label: "D", text: "Obedient" }], correctAnswer: "B", verse: "Colossians 3:15", explanation: "Grateful hearts." },
  { id: "colossians64", question: "Let the word of Christ dwell in you?", options: [{ label: "A", text: "Fully" }, { label: "B", text: "Richly" }, { label: "C", text: "Deeply" }, { label: "D", text: "Powerfully" }], correctAnswer: "B", verse: "Colossians 3:16", explanation: "Scripture saturation." },
  { id: "colossians65", question: "Believers teach and admonish one another with all?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 3:16", explanation: "Wise instruction." },
  { id: "colossians66", question: "Believers sing psalms, hymns, and spiritual songs with gratitude in their?", options: [{ label: "A", text: "Minds" }, { label: "B", text: "Hearts" }, { label: "C", text: "Spirits" }, { label: "D", text: "Souls" }], correctAnswer: "B", verse: "Colossians 3:16", explanation: "Heartfelt worship." },
  { id: "colossians67", question: "Whatever believers do should be done in the name of the?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Lord Jesus" }, { label: "C", text: "Spirit" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "Colossians 3:17", explanation: "Christ-centered living." },
  { id: "colossians68", question: "Wives are instructed to submit to their husbands as is fitting in the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Lord" }, { label: "C", text: "Church" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "Colossians 3:18", explanation: "Family order." },
  { id: "colossians69", question: "Husbands are commanded to love their wives and not be?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Angry" }, { label: "C", text: "Strict" }, { label: "D", text: "Distant" }], correctAnswer: "A", verse: "Colossians 3:19", explanation: "Gentle leadership." },
  { id: "colossians70", question: "Children are instructed to obey their parents in?", options: [{ label: "A", text: "Everything" }, { label: "B", text: "All things" }, { label: "C", text: "The Lord" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "Colossians 3:20", explanation: "Obedience." },
  { id: "colossians71", question: "Fathers should not embitter their children, or they will become?", options: [{ label: "A", text: "Fearful" }, { label: "B", text: "Discouraged" }, { label: "C", text: "Angry" }, { label: "D", text: "Weak" }], correctAnswer: "B", verse: "Colossians 3:21", explanation: "Encouraging parenting." },
  { id: "colossians72", question: "Slaves are instructed to obey their earthly masters with?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Sincerity of heart" }, { label: "C", text: "Faith" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Colossians 3:22", explanation: "Sincere service." },
  { id: "colossians73", question: "Believers should work as if working for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Lord" }, { label: "C", text: "Master" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Colossians 3:23", explanation: "Work as worship." },
  { id: "colossians74", question: "Believers will receive an inheritance from the?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Lord" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Heaven" }], correctAnswer: "B", verse: "Colossians 3:24", explanation: "Heavenly reward." },
  { id: "colossians75", question: "Anyone who does wrong will be repaid for their?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Wrongs" }, { label: "C", text: "Actions" }, { label: "D", text: "Deeds" }], correctAnswer: "B", verse: "Colossians 3:25", explanation: "Impartial justice." },
  { id: "colossians76", question: "Masters are instructed to provide their slaves with what is right and?", options: [{ label: "A", text: "Fair" }, { label: "B", text: "Just" }, { label: "C", text: "Good" }, { label: "D", text: "Equal" }], correctAnswer: "A", verse: "Colossians 4:1", explanation: "Fair treatment." },
  { id: "colossians77", question: "Believers are instructed to devote themselves to?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Prayer" }, { label: "C", text: "Service" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Colossians 4:2", explanation: "Prayerful life." },
  { id: "colossians78", question: "Believers should be watchful and?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Thankful" }, { label: "C", text: "Alert" }, { label: "D", text: "Careful" }], correctAnswer: "B", verse: "Colossians 4:2", explanation: "Grateful prayer." },
  { id: "colossians79", question: "Paul asks for prayer that God may open a door for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Message" }, { label: "C", text: "Gospel" }, { label: "D", text: "Word" }], correctAnswer: "D", verse: "Colossians 4:3", explanation: "Proclaiming Christ." },
  { id: "colossians80", question: "Believers should be wise in the way they act toward?", options: [{ label: "A", text: "Each other" }, { label: "B", text: "Outsiders" }, { label: "C", text: "Leaders" }, { label: "D", text: "Strangers" }], correctAnswer: "B", verse: "Colossians 4:5", explanation: "Wise witness." },
  { id: "colossians81", question: "Believers should let their conversation be always full of?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Grace" }, { label: "C", text: "Faith" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Colossians 4:6", explanation: "Gracious speech." },
  { id: "colossians82", question: "Paul sends news through?", options: [{ label: "A", text: "Luke" }, { label: "B", text: "Tychicus" }, { label: "C", text: "Timothy" }, { label: "D", text: "Mark" }], correctAnswer: "B", verse: "Colossians 4:7", explanation: "Faithful messenger." },
  { id: "colossians83", question: "Onesimus is described as a faithful and dear?", options: [{ label: "A", text: "Brother" }, { label: "B", text: "Servant" }, { label: "C", text: "Worker" }, { label: "D", text: "Friend" }], correctAnswer: "A", verse: "Colossians 4:9", explanation: "Restored relationship." },
  { id: "colossians84", question: "Aristarchus, Mark, and Justus are described as fellow workers for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Kingdom of God" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 4:11", explanation: "Kingdom service." },
  { id: "colossians85", question: "Epaphras always wrestles in prayer for the Colossians to stand firm in all the will of?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "God" }, { label: "C", text: "The Lord" }, { label: "D", text: "The Spirit" }], correctAnswer: "B", verse: "Colossians 4:12", explanation: "Prayerful concern." },
  { id: "colossians86", question: "Paul mentions Luke the?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Physician" }, { label: "C", text: "Evangelist" }, { label: "D", text: "Apostle" }], correctAnswer: "B", verse: "Colossians 4:14", explanation: "Beloved doctor." },
  { id: "colossians87", question: "Paul instructs the letter to be read also in the church of?", options: [{ label: "A", text: "Ephesus" }, { label: "B", text: "Laodicea" }, { label: "C", text: "Hierapolis" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "Colossians 4:16", explanation: "Shared instruction." },
  { id: "colossians88", question: "Archippus is instructed to complete the ministry he received in the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Lord" }, { label: "C", text: "Faith" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "Colossians 4:17", explanation: "Faithful service." },
  { id: "colossians89", question: "Paul asks them to remember his?", options: [{ label: "A", text: "Chains" }, { label: "B", text: "Suffering" }, { label: "C", text: "Work" }, { label: "D", text: "Mission" }], correctAnswer: "A", verse: "Colossians 4:18", explanation: "Imprisonment." },
  { id: "colossians90", question: "The letter closes with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Faith" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "Colossians 4:18", explanation: "Grace-filled ending." },
  { id: "colossians91", question: "Main theme of Colossians is the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Supremacy of Christ" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 1-4", explanation: "Christ above all." },
  { id: "colossians92", question: "Colossians emphasizes Christ as fully?", options: [{ label: "A", text: "Human" }, { label: "B", text: "Divine" }, { label: "C", text: "God" }, { label: "D", text: "Powerful" }], correctAnswer: "B", verse: "Colossians 2:9", explanation: "Full deity." },
  { id: "colossians93", question: "Believers are complete in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Grace" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Colossians 2:10", explanation: "No lack in Christ." },
  { id: "colossians94", question: "Colossians warns against adding human rules to?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "The gospel" }, { label: "C", text: "Salvation" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Colossians 2:20-23", explanation: "False teaching." },
  { id: "colossians95", question: "Christian living flows from a focus on things?", options: [{ label: "A", text: "Above" }, { label: "B", text: "Holy" }, { label: "C", text: "Spiritual" }, { label: "D", text: "Eternal" }], correctAnswer: "A", verse: "Colossians 3:1", explanation: "Heavenly mindset." },
  { id: "colossians96", question: "Christian identity is rooted in being raised with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "Colossians 3:1", explanation: "Resurrected life." },
  { id: "colossians97", question: "Christian unity is centered on?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Christ" }, { label: "C", text: "Faith" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Colossians 3:11", explanation: "Christ-centered unity." },
  { id: "colossians98", question: "Christian households are shaped by submission to the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Lord" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Colossians 3:18", explanation: "Lordship of Christ." },
  { id: "colossians99", question: "Christian work should be done with sincerity as serving the?", options: [{ label: "A", text: "Master" }, { label: "B", text: "Lord" }, { label: "C", text: "Church" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Colossians 3:23", explanation: "Work as worship." },
  { id: "colossians100", question: "Colossians ends emphasizing grace as the foundation of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Christian life" }, { label: "C", text: "Faith" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "Colossians 4:18", explanation: "Grace-filled living." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ColossiansTriviaPage() {
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
          .eq("book", "colossians");

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
          book: "colossians",
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
            book: "colossians",
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
    if (score === 10) return "Perfect! You're a Colossians expert!";
    if (score >= 8) return "Excellent! You know Colossians well!";
    if (score >= 6) return "Good job! Keep studying Colossians!";
    if (score >= 4) return "Nice try! Colossians has much to explore!";
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
              href="/bible-trivia/colossians"
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






