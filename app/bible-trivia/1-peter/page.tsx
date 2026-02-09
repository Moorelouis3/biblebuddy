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
  { id: "1peter1", question: "Who is identified as the author of 1 Peter?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "John" }, { label: "C", text: "Peter" }, { label: "D", text: "James" }], correctAnswer: "C", verse: "1 Peter 1:1", explanation: "The letter opens identifying Peter as the author." },
  { id: "1peter2", question: "Peter addresses his letter to God's elect who are exiles scattered in?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Asia Minor" }, { label: "C", text: "Rome" }, { label: "D", text: "Galilee" }], correctAnswer: "B", verse: "1 Peter 1:1", explanation: "Regions listed are in Asia Minor." },
  { id: "1peter3", question: "Believers have been chosen according to the foreknowledge of?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "The Spirit" }, { label: "C", text: "God the Father" }, { label: "D", text: "The Word" }], correctAnswer: "C", verse: "1 Peter 1:2", explanation: "Election by God the Father." },
  { id: "1peter4", question: "Believers are sanctified through the work of the?", options: [{ label: "A", text: "Word" }, { label: "B", text: "Law" }, { label: "C", text: "Spirit" }, { label: "D", text: "Church" }], correctAnswer: "C", verse: "1 Peter 1:2", explanation: "Sanctification by the Spirit." },
  { id: "1peter5", question: "God has given believers new birth into a living?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Promise" }, { label: "C", text: "Hope" }, { label: "D", text: "Covenant" }], correctAnswer: "C", verse: "1 Peter 1:3", explanation: "Living hope through resurrection." },
  { id: "1peter6", question: "This living hope comes through the resurrection of Jesus Christ from the?", options: [{ label: "A", text: "Grave" }, { label: "B", text: "Dead" }, { label: "C", text: "Tomb" }, { label: "D", text: "Earth" }], correctAnswer: "B", verse: "1 Peter 1:3", explanation: "Resurrection foundation." },
  { id: "1peter7", question: "Believers have an inheritance that can never perish, spoil, or?", options: [{ label: "A", text: "Fade" }, { label: "B", text: "Fail" }, { label: "C", text: "Change" }, { label: "D", text: "End" }], correctAnswer: "A", verse: "1 Peter 1:4", explanation: "Eternal inheritance." },
  { id: "1peter8", question: "This inheritance is kept in heaven for?", options: [{ label: "A", text: "The faithful" }, { label: "B", text: "Believers" }, { label: "C", text: "You" }, { label: "D", text: "The elect" }], correctAnswer: "C", verse: "1 Peter 1:4", explanation: "Personal assurance." },
  { id: "1peter9", question: "Believers are shielded by God's power through?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Prayer" }, { label: "D", text: "Grace" }], correctAnswer: "B", verse: "1 Peter 1:5", explanation: "Faith protects believers." },
  { id: "1peter10", question: "Though tested by trials, believers rejoice because their faith is of greater worth than?", options: [{ label: "A", text: "Silver" }, { label: "B", text: "Treasure" }, { label: "C", text: "Gold" }, { label: "D", text: "Riches" }], correctAnswer: "C", verse: "1 Peter 1:7", explanation: "Faith is precious." },
  { id: "1peter11", question: "The goal of faith is the salvation of?", options: [{ label: "A", text: "The soul" }, { label: "B", text: "The body" }, { label: "C", text: "The spirit" }, { label: "D", text: "The mind" }], correctAnswer: "A", verse: "1 Peter 1:9", explanation: "Salvation focus." },
  { id: "1peter12", question: "The prophets searched intently about the grace that was to?", options: [{ label: "A", text: "Come" }, { label: "B", text: "Remain" }, { label: "C", text: "Grow" }, { label: "D", text: "Appear" }], correctAnswer: "A", verse: "1 Peter 1:10", explanation: "Future grace." },
  { id: "1peter13", question: "The prophets predicted the sufferings of Christ and the?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Glories" }, { label: "D", text: "Resurrection" }], correctAnswer: "C", verse: "1 Peter 1:11", explanation: "Suffering then glory." },
  { id: "1peter14", question: "Believers are instructed to prepare their minds for?", options: [{ label: "A", text: "Battle" }, { label: "B", text: "Action" }, { label: "C", text: "Faith" }, { label: "D", text: "Endurance" }], correctAnswer: "B", verse: "1 Peter 1:13", explanation: "Mental readiness." },
  { id: "1peter15", question: "Believers are called to be holy in?", options: [{ label: "A", text: "Thought" }, { label: "B", text: "Speech" }, { label: "C", text: "Conduct" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "1 Peter 1:15", explanation: "Holy living." },
  { id: "1peter16", question: "Believers should live in reverent fear during their time as?", options: [{ label: "A", text: "Servants" }, { label: "B", text: "Pilgrims" }, { label: "C", text: "Strangers" }, { label: "D", text: "Foreigners" }], correctAnswer: "D", verse: "1 Peter 1:17", explanation: "Temporary residence." },
  { id: "1peter17", question: "Believers were redeemed not with silver or gold but with the precious?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Blood" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "1 Peter 1:18-19", explanation: "Christ's blood." },
  { id: "1peter18", question: "Christ is described as a lamb without?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Blemish" }, { label: "C", text: "Fault" }, { label: "D", text: "Defect" }], correctAnswer: "B", verse: "1 Peter 1:19", explanation: "Perfect sacrifice." },
  { id: "1peter19", question: "Believers have purified themselves by obeying the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Commandments" }, { label: "C", text: "Truth" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "1 Peter 1:22", explanation: "Obedience to truth." },
  { id: "1peter20", question: "Believers are born again through the living and enduring word of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "God" }, { label: "C", text: "Christ" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 Peter 1:23", explanation: "New birth through God's word." },
  { id: "1peter21", question: "All people are like grass, and their glory is like the flowers of the?", options: [{ label: "A", text: "Field" }, { label: "B", text: "Earth" }, { label: "C", text: "Meadow" }, { label: "D", text: "Valley" }], correctAnswer: "A", verse: "1 Peter 1:24", explanation: "Human frailty." },
  { id: "1peter22", question: "The word of the Lord endures?", options: [{ label: "A", text: "Long" }, { label: "B", text: "Forever" }, { label: "C", text: "Always" }, { label: "D", text: "Eternally" }], correctAnswer: "B", verse: "1 Peter 1:25", explanation: "Enduring word." },
  { id: "1peter23", question: "Believers are encouraged to crave pure spiritual?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Bread" }, { label: "C", text: "Milk" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 Peter 2:2", explanation: "Growth nourishment." },
  { id: "1peter24", question: "Christ is described as a living?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Cornerstone" }, { label: "C", text: "Stone" }, { label: "D", text: "Rock" }], correctAnswer: "C", verse: "1 Peter 2:4", explanation: "Living stone imagery." },
  { id: "1peter25", question: "Believers are being built into a spiritual?", options: [{ label: "A", text: "Body" }, { label: "B", text: "House" }, { label: "C", text: "Temple" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "1 Peter 2:5", explanation: "Spiritual house." },
  { id: "1peter26", question: "Believers are called a chosen people, a royal?", options: [{ label: "A", text: "Nation" }, { label: "B", text: "Family" }, { label: "C", text: "Priesthood" }, { label: "D", text: "Kingdom" }], correctAnswer: "C", verse: "1 Peter 2:9", explanation: "Priestly identity." },
  { id: "1peter27", question: "Believers are a holy nation and God's special?", options: [{ label: "A", text: "Possession" }, { label: "B", text: "People" }, { label: "C", text: "Inheritance" }, { label: "D", text: "Family" }], correctAnswer: "A", verse: "1 Peter 2:9", explanation: "God's ownership." },
  { id: "1peter28", question: "Believers should live such good lives that others may see their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Conduct" }, { label: "C", text: "Works" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "1 Peter 2:12", explanation: "Witness through actions." },
  { id: "1peter29", question: "Believers are instructed to submit to every human?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Institution" }, { label: "C", text: "Leader" }, { label: "D", text: "Government" }], correctAnswer: "B", verse: "1 Peter 2:13", explanation: "Order and submission." },
  { id: "1peter30", question: "Slaves are instructed to submit even to masters who are?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "Cruel" }, { label: "C", text: "Unjust" }, { label: "D", text: "Strict" }], correctAnswer: "C", verse: "1 Peter 2:18", explanation: "Enduring unjust suffering." },
  { id: "1peter31", question: "Christ suffered leaving believers an?", options: [{ label: "A", text: "Instruction" }, { label: "B", text: "Command" }, { label: "C", text: "Example" }, { label: "D", text: "Path" }], correctAnswer: "C", verse: "1 Peter 2:21", explanation: "Follow His steps." },
  { id: "1peter32", question: "Christ committed no sin and no deceit was found in His?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Actions" }, { label: "C", text: "Speech" }, { label: "D", text: "Mouth" }], correctAnswer: "D", verse: "1 Peter 2:22", explanation: "Sinless Messiah." },
  { id: "1peter33", question: "Christ bore our sins in His body on the?", options: [{ label: "A", text: "Cross" }, { label: "B", text: "Tree" }, { label: "C", text: "Altar" }, { label: "D", text: "Wood" }], correctAnswer: "B", verse: "1 Peter 2:24", explanation: "Isaiah imagery." },
  { id: "1peter34", question: "By Christ's wounds, believers have been?", options: [{ label: "A", text: "Forgiven" }, { label: "B", text: "Restored" }, { label: "C", text: "Healed" }, { label: "D", text: "Saved" }], correctAnswer: "C", verse: "1 Peter 2:24", explanation: "Healing language." },
  { id: "1peter35", question: "Believers were like sheep going astray but have now returned to the Shepherd and Overseer of their?", options: [{ label: "A", text: "Lives" }, { label: "B", text: "Faith" }, { label: "C", text: "Souls" }, { label: "D", text: "Hearts" }], correctAnswer: "C", verse: "1 Peter 2:25", explanation: "Shepherd care." },
  { id: "1peter36", question: "Wives are instructed to submit to their?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Husbands" }, { label: "C", text: "Families" }, { label: "D", text: "Homes" }], correctAnswer: "B", verse: "1 Peter 3:1", explanation: "Marriage instruction." },
  { id: "1peter37", question: "A wife's beauty should be that of the inner self, the unfading beauty of a gentle and?", options: [{ label: "A", text: "Quiet spirit" }, { label: "B", text: "Faithful heart" }, { label: "C", text: "Humble soul" }, { label: "D", text: "Pure mind" }], correctAnswer: "A", verse: "1 Peter 3:4", explanation: "Inner character." },
  { id: "1peter38", question: "Husbands are instructed to treat their wives with?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Understanding" }, { label: "C", text: "Honor" }, { label: "D", text: "Care" }], correctAnswer: "B", verse: "1 Peter 3:7", explanation: "Considerate leadership." },
  { id: "1peter39", question: "Believers are called to live in harmony, be sympathetic, love one another, be compassionate and?", options: [{ label: "A", text: "Kind" }, { label: "B", text: "Faithful" }, { label: "C", text: "Humble" }, { label: "D", text: "Gentle" }], correctAnswer: "C", verse: "1 Peter 3:8", explanation: "Christlike unity." },
  { id: "1peter40", question: "Believers should not repay evil with evil but with?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Patience" }, { label: "C", text: "Blessing" }, { label: "D", text: "Silence" }], correctAnswer: "C", verse: "1 Peter 3:9", explanation: "Blessing response." },
  { id: "1peter41", question: "Whoever wants to love life must keep their tongue from?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Evil" }, { label: "C", text: "Deceit" }, { label: "D", text: "Pride" }], correctAnswer: "C", verse: "1 Peter 3:10", explanation: "Speech control." },
  { id: "1peter42", question: "The eyes of the Lord are on the?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Humble" }, { label: "C", text: "Righteous" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "1 Peter 3:12", explanation: "God's attention." },
  { id: "1peter43", question: "If believers suffer for doing good, they are?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Blessed" }, { label: "C", text: "Honored" }, { label: "D", text: "Approved" }], correctAnswer: "B", verse: "1 Peter 3:14", explanation: "Blessing in suffering." },
  { id: "1peter44", question: "Believers should always be prepared to give an answer for the hope that they?", options: [{ label: "A", text: "Know" }, { label: "B", text: "Believe" }, { label: "C", text: "Have" }, { label: "D", text: "Live" }], correctAnswer: "C", verse: "1 Peter 3:15", explanation: "Defending hope." },
  { id: "1peter45", question: "This defense should be given with gentleness and?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Love" }, { label: "C", text: "Patience" }, { label: "D", text: "Wisdom" }], correctAnswer: "A", verse: "1 Peter 3:15", explanation: "Christlike response." },
  { id: "1peter46", question: "Christ suffered once for sins, the righteous for the?", options: [{ label: "A", text: "Guilty" }, { label: "B", text: "Unfaithful" }, { label: "C", text: "Unrighteous" }, { label: "D", text: "Lost" }], correctAnswer: "C", verse: "1 Peter 3:18", explanation: "Substitutionary suffering." },
  { id: "1peter47", question: "Christ was made alive in the?", options: [{ label: "A", text: "Body" }, { label: "B", text: "Spirit" }, { label: "C", text: "Flesh" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 Peter 3:18", explanation: "Resurrection emphasis." },
  { id: "1peter48", question: "Baptism saves not by removal of dirt but as a pledge of a clear?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Soul" }, { label: "C", text: "Conscience" }, { label: "D", text: "Heart" }], correctAnswer: "C", verse: "1 Peter 3:21", explanation: "Spiritual significance." },
  { id: "1peter49", question: "Christ has gone into heaven and is at God's?", options: [{ label: "A", text: "Presence" }, { label: "B", text: "Side" }, { label: "C", text: "Right hand" }, { label: "D", text: "Throne" }], correctAnswer: "C", verse: "1 Peter 3:22", explanation: "Exalted position." },
  { id: "1peter50", question: "Believers are encouraged to arm themselves with the same attitude as?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "The apostles" }, { label: "C", text: "The prophets" }, { label: "D", text: "The faithful" }], correctAnswer: "A", verse: "1 Peter 4:1", explanation: "Christlike mindset." },
  { id: "1peter51", question: "Believers should live the rest of their earthly lives not for human desires but for the?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "Purpose" }, { label: "C", text: "Will of God" }, { label: "D", text: "Glory" }], correctAnswer: "C", verse: "1 Peter 4:2", explanation: "God-centered living." },
  { id: "1peter52", question: "The end of all things is?", options: [{ label: "A", text: "Certain" }, { label: "B", text: "Near" }, { label: "C", text: "Coming" }, { label: "D", text: "Approaching" }], correctAnswer: "B", verse: "1 Peter 4:7", explanation: "Urgency of life." },
  { id: "1peter53", question: "Believers should be alert and sober-minded so that they may?", options: [{ label: "A", text: "Endure" }, { label: "B", text: "Pray" }, { label: "C", text: "Stand" }, { label: "D", text: "Watch" }], correctAnswer: "B", verse: "1 Peter 4:7", explanation: "Prayer readiness." },
  { id: "1peter54", question: "Above all, believers should love each other?", options: [{ label: "A", text: "Sincerely" }, { label: "B", text: "Faithfully" }, { label: "C", text: "Deeply" }, { label: "D", text: "Constantly" }], correctAnswer: "C", verse: "1 Peter 4:8", explanation: "Deep love." },
  { id: "1peter55", question: "Love covers over a multitude of?", options: [{ label: "A", text: "Wrongs" }, { label: "B", text: "Mistakes" }, { label: "C", text: "Failures" }, { label: "D", text: "Sins" }], correctAnswer: "D", verse: "1 Peter 4:8", explanation: "Forgiving love." },
  { id: "1peter56", question: "Believers should offer hospitality without?", options: [{ label: "A", text: "Complaint" }, { label: "B", text: "Grumbling" }, { label: "C", text: "Hesitation" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "1 Peter 4:9", explanation: "Joyful hospitality." },
  { id: "1peter57", question: "Each believer should use whatever gift they have received to?", options: [{ label: "A", text: "Serve others" }, { label: "B", text: "Build faith" }, { label: "C", text: "Honor leaders" }, { label: "D", text: "Glorify God" }], correctAnswer: "A", verse: "1 Peter 4:10", explanation: "Stewardship." },
  { id: "1peter58", question: "Those who speak should do so as speaking the very words of?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "God" }, { label: "C", text: "Scripture" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 Peter 4:11", explanation: "God-centered speech." },
  { id: "1peter59", question: "If anyone serves, they should do so with the strength God?", options: [{ label: "A", text: "Provides" }, { label: "B", text: "Supplies" }, { label: "C", text: "Gives" }, { label: "D", text: "Allows" }], correctAnswer: "A", verse: "1 Peter 4:11", explanation: "God's power." },
  { id: "1peter60", question: "Believers should not be surprised at the fiery ordeal that has come to test them as though something?", options: [{ label: "A", text: "Unexpected" }, { label: "B", text: "Unusual" }, { label: "C", text: "Strange" }, { label: "D", text: "Evil" }], correctAnswer: "C", verse: "1 Peter 4:12", explanation: "Normal suffering." },
  { id: "1peter61", question: "Believers rejoice in suffering because they participate in the sufferings of?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Christ" }, { label: "C", text: "The apostles" }, { label: "D", text: "The faithful" }], correctAnswer: "B", verse: "1 Peter 4:13", explanation: "Sharing Christ's suffering." },
  { id: "1peter62", question: "If believers are insulted because of the name of Christ, they are?", options: [{ label: "A", text: "Honored" }, { label: "B", text: "Blessed" }, { label: "C", text: "Faithful" }, { label: "D", text: "Approved" }], correctAnswer: "B", verse: "1 Peter 4:14", explanation: "Blessing in persecution." },
  { id: "1peter63", question: "Believers should not suffer as a murderer, thief, criminal, or?", options: [{ label: "A", text: "Liar" }, { label: "B", text: "Evildoer" }, { label: "C", text: "Busybody" }, { label: "D", text: "Sinner" }], correctAnswer: "C", verse: "1 Peter 4:15", explanation: "Improper behavior." },
  { id: "1peter64", question: "If anyone suffers as a Christian, they should not be ashamed but should?", options: [{ label: "A", text: "Endure" }, { label: "B", text: "Rejoice" }, { label: "C", text: "Praise God" }, { label: "D", text: "Remain faithful" }], correctAnswer: "C", verse: "1 Peter 4:16", explanation: "Glorifying God." },
  { id: "1peter65", question: "Judgment begins with the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Church" }, { label: "C", text: "Household of God" }, { label: "D", text: "Unbelievers" }], correctAnswer: "C", verse: "1 Peter 4:17", explanation: "God's people first." },
  { id: "1peter66", question: "Those who suffer according to God's will should commit themselves to their faithful?", options: [{ label: "A", text: "Creator" }, { label: "B", text: "Redeemer" }, { label: "C", text: "Savior" }, { label: "D", text: "Father" }], correctAnswer: "A", verse: "1 Peter 4:19", explanation: "Trust in God." },
  { id: "1peter67", question: "Peter exhorts elders to be?", options: [{ label: "A", text: "Strong leaders" }, { label: "B", text: "Shepherds" }, { label: "C", text: "Teachers" }, { label: "D", text: "Examples" }], correctAnswer: "B", verse: "1 Peter 5:2", explanation: "Shepherding role." },
  { id: "1peter68", question: "Elders should serve not under compulsion but?", options: [{ label: "A", text: "Willingly" }, { label: "B", text: "Faithfully" }, { label: "C", text: "Joyfully" }, { label: "D", text: "Humbly" }], correctAnswer: "A", verse: "1 Peter 5:2", explanation: "Voluntary service." },
  { id: "1peter69", question: "Elders should not pursue dishonest gain but be?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Humble" }, { label: "C", text: "Eager" }, { label: "D", text: "Content" }], correctAnswer: "C", verse: "1 Peter 5:2", explanation: "Right motivation." },
  { id: "1peter70", question: "Believers should clothe themselves with?", options: [{ label: "A", text: "Kindness" }, { label: "B", text: "Humility" }, { label: "C", text: "Faith" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "1 Peter 5:5", explanation: "Humble attitude." },
  { id: "1peter71", question: "God opposes the proud but shows favor to the?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Humble" }, { label: "C", text: "Righteous" }, { label: "D", text: "Obedient" }], correctAnswer: "B", verse: "1 Peter 5:5", explanation: "Grace to the humble." },
  { id: "1peter72", question: "Believers should cast all their anxiety on God because He?", options: [{ label: "A", text: "Is powerful" }, { label: "B", text: "Is faithful" }, { label: "C", text: "Cares for you" }, { label: "D", text: "Is near" }], correctAnswer: "C", verse: "1 Peter 5:7", explanation: "God's care." },
  { id: "1peter73", question: "The devil is described as a roaring?", options: [{ label: "A", text: "Beast" }, { label: "B", text: "Lion" }, { label: "C", text: "Wolf" }, { label: "D", text: "Serpent" }], correctAnswer: "B", verse: "1 Peter 5:8", explanation: "Threat imagery." },
  { id: "1peter74", question: "Believers are urged to resist the devil, standing firm in the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Word" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "1 Peter 5:9", explanation: "Faith resistance." },
  { id: "1peter75", question: "After suffering a little while, God will restore, confirm, strengthen, and?", options: [{ label: "A", text: "Establish" }, { label: "B", text: "Renew" }, { label: "C", text: "Bless" }, { label: "D", text: "Protect" }], correctAnswer: "A", verse: "1 Peter 5:10", explanation: "God's restoration." },
  { id: "1peter76", question: "Peter states that the purpose of his letter is to encourage believers and testify that this is the true?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Grace" }, { label: "C", text: "Hope" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "1 Peter 5:12", explanation: "True grace of God." },
  { id: "1peter77", question: "Peter sends greetings from she who is in?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Rome" }, { label: "C", text: "Babylon" }, { label: "D", text: "Antioch" }], correctAnswer: "C", verse: "1 Peter 5:13", explanation: "Symbolic reference." },
  { id: "1peter78", question: "Peter also sends greetings from?", options: [{ label: "A", text: "Luke" }, { label: "B", text: "Paul" }, { label: "C", text: "Silas" }, { label: "D", text: "Mark" }], correctAnswer: "D", verse: "1 Peter 5:13", explanation: "Mark's presence." },
  { id: "1peter79", question: "Believers are instructed to greet one another with a kiss of?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Peace" }, { label: "C", text: "Unity" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "1 Peter 5:14", explanation: "Affectionate greeting." },
  { id: "1peter80", question: "Peter ends his letter by wishing peace to all who are in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Christ" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "1 Peter 5:14", explanation: "Peace in Christ." },
  { id: "1peter81", question: "A major theme of 1 Peter is?", options: [{ label: "A", text: "Church order" }, { label: "B", text: "Suffering and hope" }, { label: "C", text: "Faith and works" }, { label: "D", text: "Salvation by grace" }], correctAnswer: "B", verse: "1 Peter 1-5", explanation: "Hope amid suffering." },
  { id: "1peter82", question: "Peter encourages believers to live as?", options: [{ label: "A", text: "Citizens" }, { label: "B", text: "Pilgrims" }, { label: "C", text: "Warriors" }, { label: "D", text: "Servants" }], correctAnswer: "B", verse: "1 Peter 2:11", explanation: "Temporary residents." },
  { id: "1peter83", question: "Peter emphasizes holiness in response to God's?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Grace" }, { label: "C", text: "Law" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "1 Peter 1:13-16", explanation: "Grace-driven holiness." },
  { id: "1peter84", question: "Peter connects suffering with future?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Reward" }, { label: "C", text: "Glory" }, { label: "D", text: "Peace" }], correctAnswer: "C", verse: "1 Peter 5:10", explanation: "Glory after suffering." },
  { id: "1peter85", question: "Peter calls believers to humility because God gives grace to the?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Weak" }, { label: "C", text: "Humble" }, { label: "D", text: "Obedient" }], correctAnswer: "C", verse: "1 Peter 5:5", explanation: "Grace principle." },
  { id: "1peter86", question: "Peter presents Christ as the ultimate?", options: [{ label: "A", text: "Example" }, { label: "B", text: "Leader" }, { label: "C", text: "Teacher" }, { label: "D", text: "Shepherd" }], correctAnswer: "A", verse: "1 Peter 2:21", explanation: "Model of suffering." },
  { id: "1peter87", question: "Peter emphasizes submission to authorities as a witness to?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "God" }, { label: "D", text: "Christ" }], correctAnswer: "C", verse: "1 Peter 2:15", explanation: "God-honoring conduct." },
  { id: "1peter88", question: "Peter teaches that believers are called out of darkness into God's?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Grace" }, { label: "C", text: "Light" }, { label: "D", text: "Kingdom" }], correctAnswer: "C", verse: "1 Peter 2:9", explanation: "Transformation imagery." },
  { id: "1peter89", question: "Peter encourages believers to respond to suffering with?", options: [{ label: "A", text: "Endurance" }, { label: "B", text: "Joy" }, { label: "C", text: "Hope" }, { label: "D", text: "Faithfulness" }], correctAnswer: "D", verse: "1 Peter 4:19", explanation: "Faithful endurance." },
  { id: "1peter90", question: "Peter stresses spiritual growth through the word as essential for?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Faith" }, { label: "C", text: "Maturity" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "1 Peter 2:2", explanation: "Growth focus." },
  { id: "1peter91", question: "Peter warns believers to remain alert because the devil seeks to?", options: [{ label: "A", text: "Deceive" }, { label: "B", text: "Tempt" }, { label: "C", text: "Destroy" }, { label: "D", text: "Devour" }], correctAnswer: "D", verse: "1 Peter 5:8", explanation: "Spiritual danger." },
  { id: "1peter92", question: "Peter encourages resistance to the devil by standing firm in the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Word" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "D", verse: "1 Peter 5:9", explanation: "Faith defense." },
  { id: "1peter93", question: "Peter reminds believers that the same kinds of sufferings are being experienced by believers throughout the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Church" }, { label: "C", text: "Nations" }, { label: "D", text: "Earth" }], correctAnswer: "A", verse: "1 Peter 5:9", explanation: "Shared suffering." },
  { id: "1peter94", question: "Peter reassures believers that God will Himself restore them after they have suffered?", options: [{ label: "A", text: "Greatly" }, { label: "B", text: "Briefly" }, { label: "C", text: "Faithfully" }, { label: "D", text: "Eternally" }], correctAnswer: "B", verse: "1 Peter 5:10", explanation: "Temporary suffering." },
  { id: "1peter95", question: "Peter attributes eternal dominion to God?", options: [{ label: "A", text: "Forever" }, { label: "B", text: "Always" }, { label: "C", text: "Eternally" }, { label: "D", text: "Without end" }], correctAnswer: "A", verse: "1 Peter 5:11", explanation: "God's sovereignty." },
  { id: "1peter96", question: "Peter describes believers as strangers because their true citizenship is?", options: [{ label: "A", text: "Spiritual" }, { label: "B", text: "Heavenly" }, { label: "C", text: "Eternal" }, { label: "D", text: "Divine" }], correctAnswer: "B", verse: "1 Peter 1:4", explanation: "Heavenly inheritance." },
  { id: "1peter97", question: "Peter repeatedly encourages believers to respond to hostility with?", options: [{ label: "A", text: "Patience" }, { label: "B", text: "Submission" }, { label: "C", text: "Good deeds" }, { label: "D", text: "Silence" }], correctAnswer: "C", verse: "1 Peter 2:12", explanation: "Good witness." },
  { id: "1peter98", question: "Peter teaches that suffering for doing good is preferable to suffering for doing?", options: [{ label: "A", text: "Wrong" }, { label: "B", text: "Evil" }, { label: "C", text: "Sin" }, { label: "D", text: "Harm" }], correctAnswer: "B", verse: "1 Peter 3:17", explanation: "Righteous suffering." },
  { id: "1peter99", question: "Peter's message consistently links hope with?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Faith" }, { label: "C", text: "Suffering" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "1 Peter 1-5", explanation: "Hope amid trials." },
  { id: "1peter100", question: "The overall message of 1 Peter is to stand firm in the true?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Grace" }, { label: "C", text: "Hope" }, { label: "D", text: "Gospel" }], correctAnswer: "B", verse: "1 Peter 5:12", explanation: "Stand firm in grace." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstPeterTriviaPage() {
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
        
        // Fetch user's progress for 1 peter questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', '1peter');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: '1peter' });
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
            book: '1peter'
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
    if (score === 10) return "Perfect! You're a 1 Peter expert!";
    if (score >= 8) return "Excellent! You know 1 Peter well!";
    if (score >= 6) return "Good job! Keep studying 1 Peter!";
    if (score >= 4) return "Nice try! 1 Peter has much to explore!";
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
              href="/bible-trivia/1-peter"
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
