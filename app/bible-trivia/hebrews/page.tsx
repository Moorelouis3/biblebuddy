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
  { id: "hebrews1", question: "Who is traditionally considered the author of Hebrews?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Peter" }, { label: "C", text: "Unknown" }, { label: "D", text: "Luke" }], correctAnswer: "C", verse: "Hebrews 1:1", explanation: "The author is not explicitly named in the text." },
  { id: "hebrews2", question: "How did God speak in the past to the ancestors?", options: [{ label: "A", text: "Through angels" }, { label: "B", text: "Through prophets" }, { label: "C", text: "Through kings" }, { label: "D", text: "Through priests" }], correctAnswer: "B", verse: "Hebrews 1:1", explanation: "God spoke through the prophets in many ways." },
  { id: "hebrews3", question: "In these last days, God has spoken through?", options: [{ label: "A", text: "The Law" }, { label: "B", text: "The Spirit" }, { label: "C", text: "His Son" }, { label: "D", text: "Angels" }], correctAnswer: "C", verse: "Hebrews 1:2", explanation: "Jesus is the final revelation of God." },
  { id: "hebrews4", question: "The Son is described as the radiance of God's?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Glory" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Holiness" }], correctAnswer: "B", verse: "Hebrews 1:3", explanation: "Christ reflects God's glory." },
  { id: "hebrews5", question: "After making purification for sins, Jesus sat down at the?", options: [{ label: "A", text: "Left hand of God" }, { label: "B", text: "Feet of God" }, { label: "C", text: "Right hand of God" }, { label: "D", text: "Center of heaven" }], correctAnswer: "C", verse: "Hebrews 1:3", explanation: "Sitting signifies completed work." },
  { id: "hebrews6", question: "Jesus is superior to which beings in Hebrews 1?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Angels" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Hebrews 1:4", explanation: "Christ is greater than angels." },
  { id: "hebrews7", question: "God never said to an angel, 'You are my?'", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Messenger" }, { label: "C", text: "Son" }, { label: "D", text: "Chosen one" }], correctAnswer: "C", verse: "Hebrews 1:5", explanation: "Jesus uniquely is God's Son." },
  { id: "hebrews8", question: "Angels are described as?", options: [{ label: "A", text: "Rulers" }, { label: "B", text: "Flames of fire" }, { label: "C", text: "Judges" }, { label: "D", text: "Creators" }], correctAnswer: "B", verse: "Hebrews 1:7", explanation: "Angels serve God." },
  { id: "hebrews9", question: "God says the Son's throne will last?", options: [{ label: "A", text: "For generations" }, { label: "B", text: "Until judgment" }, { label: "C", text: "Forever" }, { label: "D", text: "For a season" }], correctAnswer: "C", verse: "Hebrews 1:8", explanation: "Christ's reign is eternal." },
  { id: "hebrews10", question: "The Son loves righteousness and hates?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Evil" }, { label: "C", text: "Darkness" }, { label: "D", text: "Wickedness" }], correctAnswer: "D", verse: "Hebrews 1:9", explanation: "Moral perfection of Christ." },
  { id: "hebrews11", question: "Believers are warned not to drift away from what they have?", options: [{ label: "A", text: "Learned" }, { label: "B", text: "Believed" }, { label: "C", text: "Heard" }, { label: "D", text: "Received" }], correctAnswer: "C", verse: "Hebrews 2:1", explanation: "Pay careful attention." },
  { id: "hebrews12", question: "The message declared by angels was?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Binding" }, { label: "C", text: "Temporary" }, { label: "D", text: "Symbolic" }], correctAnswer: "B", verse: "Hebrews 2:2", explanation: "Disobedience had consequences." },
  { id: "hebrews13", question: "How will we escape if we ignore such a great?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Message" }, { label: "C", text: "Salvation" }, { label: "D", text: "Covenant" }], correctAnswer: "C", verse: "Hebrews 2:3", explanation: "Salvation must not be neglected." },
  { id: "hebrews14", question: "Jesus was made lower than the angels for a little?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Season" }, { label: "C", text: "While" }, { label: "D", text: "Moment" }], correctAnswer: "A", verse: "Hebrews 2:9", explanation: "Refers to incarnation." },
  { id: "hebrews15", question: "Jesus tasted death for?", options: [{ label: "A", text: "Many" }, { label: "B", text: "Israel" }, { label: "C", text: "The church" }, { label: "D", text: "Everyone" }], correctAnswer: "D", verse: "Hebrews 2:9", explanation: "Universal scope of Christ's death." },
  { id: "hebrews16", question: "Jesus is not ashamed to call believers?", options: [{ label: "A", text: "Friends" }, { label: "B", text: "Saints" }, { label: "C", text: "Brothers and sisters" }, { label: "D", text: "Servants" }], correctAnswer: "C", verse: "Hebrews 2:11", explanation: "Shared humanity." },
  { id: "hebrews17", question: "Jesus shared in humanity to destroy the one who holds the power of?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Death" }, { label: "C", text: "Fear" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Hebrews 2:14", explanation: "Defeating the devil." },
  { id: "hebrews18", question: "Jesus helps the descendants of?", options: [{ label: "A", text: "Adam" }, { label: "B", text: "David" }, { label: "C", text: "Abraham" }, { label: "D", text: "Moses" }], correctAnswer: "C", verse: "Hebrews 2:16", explanation: "Promise lineage." },
  { id: "hebrews19", question: "Jesus became a merciful and faithful?", options: [{ label: "A", text: "King" }, { label: "B", text: "Prophet" }, { label: "C", text: "High priest" }, { label: "D", text: "Servant" }], correctAnswer: "C", verse: "Hebrews 2:17", explanation: "Priestly role." },
  { id: "hebrews20", question: "Because Jesus suffered, He is able to help those who are?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Tempted" }, { label: "C", text: "Sinning" }, { label: "D", text: "Lost" }], correctAnswer: "B", verse: "Hebrews 2:18", explanation: "Empathetic help." },
  { id: "hebrews21", question: "Jesus is considered worthy of greater honor than?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Abraham" }, { label: "C", text: "Moses" }, { label: "D", text: "David" }], correctAnswer: "C", verse: "Hebrews 3:3", explanation: "Builder vs. servant." },
  { id: "hebrews22", question: "Moses was faithful as a servant in God's?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "House" }, { label: "C", text: "Law" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Hebrews 3:5", explanation: "House imagery." },
  { id: "hebrews23", question: "Believers are warned not to harden their hearts as in the?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Captivity" }, { label: "D", text: "Flood" }], correctAnswer: "B", verse: "Hebrews 3:8", explanation: "Israel's rebellion." },
  { id: "hebrews24", question: "Those who rebelled in the wilderness were unable to enter?", options: [{ label: "A", text: "The land" }, { label: "B", text: "The city" }, { label: "C", text: "God's rest" }, { label: "D", text: "The promise" }], correctAnswer: "C", verse: "Hebrews 3:19", explanation: "Unbelief blocks rest." },
  { id: "hebrews25", question: "God's rest is still available?", options: [{ label: "A", text: "No" }, { label: "B", text: "For some" }, { label: "C", text: "Today" }, { label: "D", text: "Later" }], correctAnswer: "C", verse: "Hebrews 4:7", explanation: "Ongoing invitation." },
  { id: "hebrews26", question: "The word of God is described as living and?", options: [{ label: "A", text: "Active" }, { label: "B", text: "Sharp" }, { label: "C", text: "Powerful" }, { label: "D", text: "Holy" }], correctAnswer: "A", verse: "Hebrews 4:12", explanation: "Dynamic Word." },
  { id: "hebrews27", question: "God's word judges the thoughts and?", options: [{ label: "A", text: "Actions" }, { label: "B", text: "Motives" }, { label: "C", text: "Attitudes" }, { label: "D", text: "Intentions" }], correctAnswer: "D", verse: "Hebrews 4:12", explanation: "Inner discernment." },
  { id: "hebrews28", question: "Believers are encouraged to approach God's throne of grace with?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Confidence" }, { label: "C", text: "Humility" }, { label: "D", text: "Reverence" }], correctAnswer: "B", verse: "Hebrews 4:16", explanation: "Access through Christ." },
  { id: "hebrews29", question: "Every high priest is selected from among the?", options: [{ label: "A", text: "Levites" }, { label: "B", text: "People" }, { label: "C", text: "Faithful" }, { label: "D", text: "Israelites" }], correctAnswer: "B", verse: "Hebrews 5:1", explanation: "Representative role." },
  { id: "hebrews30", question: "Jesus learned obedience through what He?", options: [{ label: "A", text: "Taught" }, { label: "B", text: "Prayed" }, { label: "C", text: "Suffered" }, { label: "D", text: "Endured" }], correctAnswer: "C", verse: "Hebrews 5:8", explanation: "Suffering shaped obedience." },
  { id: "hebrews31", question: "Jesus was designated by God as high priest in the order of?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Levi" }, { label: "C", text: "Melchizedek" }, { label: "D", text: "Zadok" }], correctAnswer: "C", verse: "Hebrews 5:10", explanation: "Different priesthood." },
  { id: "hebrews32", question: "The audience is rebuked for still needing?", options: [{ label: "A", text: "Milk" }, { label: "B", text: "Teaching" }, { label: "C", text: "Guidance" }, { label: "D", text: "Correction" }], correctAnswer: "A", verse: "Hebrews 5:12", explanation: "Spiritual immaturity." },
  { id: "hebrews33", question: "Solid food is for the?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Wise" }, { label: "C", text: "Mature" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "Hebrews 5:14", explanation: "Mature believers." },
  { id: "hebrews34", question: "Believers are urged to move beyond elementary teachings about?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "The law" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "Hebrews 6:1", explanation: "Grow toward maturity." },
  { id: "hebrews35", question: "It is impossible to renew to repentance those who?", options: [{ label: "A", text: "Doubt" }, { label: "B", text: "Fall away" }, { label: "C", text: "Sin" }, { label: "D", text: "Struggle" }], correctAnswer: "B", verse: "Hebrews 6:6", explanation: "Severe warning." },
  { id: "hebrews36", question: "God's promise to Abraham was confirmed by an?", options: [{ label: "A", text: "Angel" }, { label: "B", text: "Covenant" }, { label: "C", text: "Oath" }, { label: "D", text: "Sign" }], correctAnswer: "C", verse: "Hebrews 6:17", explanation: "God's unchangeable purpose." },
  { id: "hebrews37", question: "Hope is described as an anchor for the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Church" }, { label: "C", text: "Soul" }, { label: "D", text: "Mind" }], correctAnswer: "C", verse: "Hebrews 6:19", explanation: "Secure hope." },
  { id: "hebrews38", question: "Jesus entered the inner sanctuary as a?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Mediator" }, { label: "C", text: "Forerunner" }, { label: "D", text: "King" }], correctAnswer: "C", verse: "Hebrews 6:20", explanation: "Opening the way." },
  { id: "hebrews39", question: "Melchizedek was king of?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Salem" }, { label: "C", text: "Zion" }, { label: "D", text: "Judah" }], correctAnswer: "B", verse: "Hebrews 7:1", explanation: "Ancient priest-king." },
  { id: "hebrews40", question: "Abraham gave Melchizedek a tenth of?", options: [{ label: "A", text: "His wealth" }, { label: "B", text: "His possessions" }, { label: "C", text: "The spoils" }, { label: "D", text: "His harvest" }], correctAnswer: "C", verse: "Hebrews 7:2", explanation: "Tithe of victory spoils." },
  { id: "hebrews41", question: "Melchizedek's name means king of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Salvation" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Hebrews 7:2", explanation: "Name meaning." },
  { id: "hebrews42", question: "Jesus' priesthood is permanent because He lives?", options: [{ label: "A", text: "Forever" }, { label: "B", text: "By faith" }, { label: "C", text: "In heaven" }, { label: "D", text: "By promise" }], correctAnswer: "A", verse: "Hebrews 7:24", explanation: "Eternal priesthood." },
  { id: "hebrews43", question: "Jesus is able to save completely those who come to God through Him because He always lives to?", options: [{ label: "A", text: "Rule" }, { label: "B", text: "Intercede" }, { label: "C", text: "Teach" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Hebrews 7:25", explanation: "Ongoing intercession." },
  { id: "hebrews44", question: "Jesus is described as holy, blameless, pure, and set apart from?", options: [{ label: "A", text: "The world" }, { label: "B", text: "The law" }, { label: "C", text: "Sinners" }, { label: "D", text: "Creation" }], correctAnswer: "C", verse: "Hebrews 7:26", explanation: "Sinless high priest." },
  { id: "hebrews45", question: "The law appoints high priests who are?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Faithful" }, { label: "C", text: "Chosen" }, { label: "D", text: "Holy" }], correctAnswer: "A", verse: "Hebrews 7:28", explanation: "Human weakness." },
  { id: "hebrews46", question: "The main point of Hebrews is that we have a high priest who sat down at the right hand of the throne of the Majesty in?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Glory" }, { label: "C", text: "Power" }, { label: "D", text: "Authority" }], correctAnswer: "A", verse: "Hebrews 8:1", explanation: "Heavenly priesthood." },
  { id: "hebrews47", question: "Jesus serves in the?", options: [{ label: "A", text: "Earthly sanctuary" }, { label: "B", text: "True tabernacle" }, { label: "C", text: "Temple" }, { label: "D", text: "Holy place" }], correctAnswer: "B", verse: "Hebrews 8:2", explanation: "Heavenly reality." },
  { id: "hebrews48", question: "The old covenant is described as?", options: [{ label: "A", text: "Eternal" }, { label: "B", text: "Faultless" }, { label: "C", text: "Obsolete" }, { label: "D", text: "Perfect" }], correctAnswer: "C", verse: "Hebrews 8:13", explanation: "Replaced by new covenant." },
  { id: "hebrews49", question: "God promises to write His laws on people's?", options: [{ label: "A", text: "Minds and hearts" }, { label: "B", text: "Tablets" }, { label: "C", text: "Scrolls" }, { label: "D", text: "Souls" }], correctAnswer: "A", verse: "Hebrews 8:10", explanation: "Internal transformation." },
  { id: "hebrews50", question: "Under the new covenant, sins are remembered?", options: [{ label: "A", text: "Forever" }, { label: "B", text: "Until judgment" }, { label: "C", text: "No more" }, { label: "D", text: "Partially" }], correctAnswer: "C", verse: "Hebrews 8:12", explanation: "Complete forgiveness." },
  { id: "hebrews51", question: "The earthly tabernacle had regulations for?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Worship" }, { label: "C", text: "Offerings" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Hebrews 9:1", explanation: "Structured worship." },
  { id: "hebrews52", question: "Only the high priest entered the Most Holy Place and only once a?", options: [{ label: "A", text: "Month" }, { label: "B", text: "Year" }, { label: "C", text: "Lifetime" }, { label: "D", text: "Festival" }], correctAnswer: "B", verse: "Hebrews 9:7", explanation: "Day of Atonement." },
  { id: "hebrews53", question: "Christ entered the Most Holy Place with His own?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Blood" }, { label: "C", text: "Spirit" }, { label: "D", text: "Body" }], correctAnswer: "B", verse: "Hebrews 9:12", explanation: "Perfect sacrifice." },
  { id: "hebrews54", question: "The blood of Christ cleanses our?", options: [{ label: "A", text: "Minds" }, { label: "B", text: "Souls" }, { label: "C", text: "Consciences" }, { label: "D", text: "Hearts" }], correctAnswer: "C", verse: "Hebrews 9:14", explanation: "Inner cleansing." },
  { id: "hebrews55", question: "Christ is the mediator of a new?", options: [{ label: "A", text: "Promise" }, { label: "B", text: "Law" }, { label: "C", text: "Covenant" }, { label: "D", text: "Testament" }], correctAnswer: "C", verse: "Hebrews 9:15", explanation: "Better covenant." },
  { id: "hebrews56", question: "Without the shedding of blood there is no?", options: [{ label: "A", text: "Forgiveness" }, { label: "B", text: "Salvation" }, { label: "C", text: "Cleansing" }, { label: "D", text: "Atonement" }], correctAnswer: "A", verse: "Hebrews 9:22", explanation: "Sacrificial principle." },
  { id: "hebrews57", question: "Christ was sacrificed once to take away the sins of?", options: [{ label: "A", text: "Many" }, { label: "B", text: "All" }, { label: "C", text: "Israel" }, { label: "D", text: "Believers" }], correctAnswer: "A", verse: "Hebrews 9:28", explanation: "Sufficient sacrifice." },
  { id: "hebrews58", question: "The law is only a shadow of the good things that are?", options: [{ label: "A", text: "Coming" }, { label: "B", text: "Gone" }, { label: "C", text: "Hidden" }, { label: "D", text: "Promised" }], correctAnswer: "A", verse: "Hebrews 10:1", explanation: "Shadow vs. reality." },
  { id: "hebrews59", question: "Sacrifices could never make perfect those who?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Draw near" }, { label: "C", text: "Obey" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Hebrews 10:1", explanation: "Incomplete system." },
  { id: "hebrews60", question: "Christ came to do God's?", options: [{ label: "A", text: "Command" }, { label: "B", text: "Law" }, { label: "C", text: "Will" }, { label: "D", text: "Purpose" }], correctAnswer: "C", verse: "Hebrews 10:7", explanation: "Obedient sacrifice." },
  { id: "hebrews61", question: "By one sacrifice Jesus has made perfect forever those who are being?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Justified" }, { label: "C", text: "Sanctified" }, { label: "D", text: "Redeemed" }], correctAnswer: "C", verse: "Hebrews 10:14", explanation: "Ongoing sanctification." },
  { id: "hebrews62", question: "Believers are encouraged to draw near to God's throne with a sincere heart and full assurance of?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Hebrews 10:22", explanation: "Faith confidence." },
  { id: "hebrews63", question: "Believers should consider how to spur one another toward love and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Unity" }, { label: "C", text: "Good deeds" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "Hebrews 10:24", explanation: "Community encouragement." },
  { id: "hebrews64", question: "Believers are warned against deliberately continuing to?", options: [{ label: "A", text: "Doubt" }, { label: "B", text: "Sin" }, { label: "C", text: "Struggle" }, { label: "D", text: "Question" }], correctAnswer: "B", verse: "Hebrews 10:26", explanation: "Serious warning." },
  { id: "hebrews65", question: "The righteous will live by?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Obedience" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "Hebrews 10:38", explanation: "Faith-centered life." },
  { id: "hebrews66", question: "Faith is confidence in what we?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Know" }, { label: "C", text: "Hope for" }, { label: "D", text: "Trust" }], correctAnswer: "C", verse: "Hebrews 11:1", explanation: "Definition of faith." },
  { id: "hebrews67", question: "By faith we understand that the universe was formed at God's?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Command" }, { label: "C", text: "Will" }, { label: "D", text: "Word" }], correctAnswer: "D", verse: "Hebrews 11:3", explanation: "Creation by word." },
  { id: "hebrews68", question: "Abel offered God a better sacrifice than?", options: [{ label: "A", text: "Seth" }, { label: "B", text: "Cain" }, { label: "C", text: "Noah" }, { label: "D", text: "Adam" }], correctAnswer: "B", verse: "Hebrews 11:4", explanation: "Faithful offering." },
  { id: "hebrews69", question: "Enoch did not experience death because?", options: [{ label: "A", text: "He was righteous" }, { label: "B", text: "God took him" }, { label: "C", text: "He was obedient" }, { label: "D", text: "He pleased God" }], correctAnswer: "B", verse: "Hebrews 11:5", explanation: "Taken by God." },
  { id: "hebrews70", question: "Without faith it is impossible to?", options: [{ label: "A", text: "Obey God" }, { label: "B", text: "Please God" }, { label: "C", text: "Know God" }, { label: "D", text: "Serve God" }], correctAnswer: "B", verse: "Hebrews 11:6", explanation: "Faith required." },
  { id: "hebrews71", question: "Noah built the ark out of?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Obedience" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "Hebrews 11:7", explanation: "Faith-driven obedience." },
  { id: "hebrews72", question: "Abraham obeyed when he was called to go to a place he would later receive as an?", options: [{ label: "A", text: "Inheritance" }, { label: "B", text: "Reward" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Promise" }], correctAnswer: "A", verse: "Hebrews 11:8", explanation: "Faith journey." },
  { id: "hebrews73", question: "Abraham was looking forward to a city with?", options: [{ label: "A", text: "Foundations" }, { label: "B", text: "Walls" }, { label: "C", text: "Glory" }, { label: "D", text: "Light" }], correctAnswer: "A", verse: "Hebrews 11:10", explanation: "Eternal city." },
  { id: "hebrews74", question: "Sarah was enabled to bear children because she considered God?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Powerful" }, { label: "C", text: "Merciful" }, { label: "D", text: "True" }], correctAnswer: "A", verse: "Hebrews 11:11", explanation: "Trust in God." },
  { id: "hebrews75", question: "These heroes of faith were still living by faith when they?", options: [{ label: "A", text: "Succeeded" }, { label: "B", text: "Died" }, { label: "C", text: "Conquered" }, { label: "D", text: "Endured" }], correctAnswer: "B", verse: "Hebrews 11:13", explanation: "Faith to the end." },
  { id: "hebrews76", question: "Moses chose to be mistreated with God's people rather than enjoy the fleeting pleasures of?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wealth" }, { label: "C", text: "Sin" }, { label: "D", text: "Egypt" }], correctAnswer: "C", verse: "Hebrews 11:25", explanation: "Eternal over temporary." },
  { id: "hebrews77", question: "By faith the Israelites passed through the Red Sea as on?", options: [{ label: "A", text: "Holy ground" }, { label: "B", text: "Dry land" }, { label: "C", text: "Open path" }, { label: "D", text: "Safe ground" }], correctAnswer: "B", verse: "Hebrews 11:29", explanation: "Miraculous deliverance." },
  { id: "hebrews78", question: "The walls of Jericho fell after the people marched around them for?", options: [{ label: "A", text: "Three days" }, { label: "B", text: "Seven days" }, { label: "C", text: "Ten days" }, { label: "D", text: "One day" }], correctAnswer: "B", verse: "Hebrews 11:30", explanation: "Faithful obedience." },
  { id: "hebrews79", question: "Rahab was not killed because she welcomed the spies with?", options: [{ label: "A", text: "Kindness" }, { label: "B", text: "Faith" }, { label: "C", text: "Peace" }, { label: "D", text: "Trust" }], correctAnswer: "B", verse: "Hebrews 11:31", explanation: "Faith expressed in action." },
  { id: "hebrews80", question: "The author lists Gideon, Barak, Samson, Jephthah, David, Samuel, and the?", options: [{ label: "A", text: "Judges" }, { label: "B", text: "Kings" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "C", verse: "Hebrews 11:32", explanation: "Heroes of faith." },
  { id: "hebrews81", question: "These heroes conquered kingdoms, administered justice, and gained what was?", options: [{ label: "A", text: "Promised" }, { label: "B", text: "Hoped for" }, { label: "C", text: "Expected" }, { label: "D", text: "Given" }], correctAnswer: "A", verse: "Hebrews 11:33", explanation: "God's promises fulfilled." },
  { id: "hebrews82", question: "Others faced mocking, flogging, chains, and?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Imprisonment" }, { label: "C", text: "Death" }, { label: "D", text: "Torture" }], correctAnswer: "B", verse: "Hebrews 11:36", explanation: "Persecution endured." },
  { id: "hebrews83", question: "The world was not worthy of them, according to?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "The prophets" }, { label: "C", text: "Scripture" }, { label: "D", text: "God" }], correctAnswer: "C", verse: "Hebrews 11:38", explanation: "God's evaluation." },
  { id: "hebrews84", question: "These were commended for their faith but did not receive what was?", options: [{ label: "A", text: "Expected" }, { label: "B", text: "Promised" }, { label: "C", text: "Earned" }, { label: "D", text: "Given" }], correctAnswer: "B", verse: "Hebrews 11:39", explanation: "Promise fulfilled later." },
  { id: "hebrews85", question: "Believers are surrounded by a great cloud of?", options: [{ label: "A", text: "Saints" }, { label: "B", text: "Angels" }, { label: "C", text: "Witnesses" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "Hebrews 12:1", explanation: "Encouraging examples." },
  { id: "hebrews86", question: "Believers are urged to fix their eyes on?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Jesus" }, { label: "D", text: "The cross" }], correctAnswer: "C", verse: "Hebrews 12:2", explanation: "Focus on Christ." },
  { id: "hebrews87", question: "Jesus endured the cross for the joy set before Him and sat down at the right hand of the throne of?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Grace" }, { label: "C", text: "God" }, { label: "D", text: "Heaven" }], correctAnswer: "C", verse: "Hebrews 12:2", explanation: "Victorious completion." },
  { id: "hebrews88", question: "God disciplines those He?", options: [{ label: "A", text: "Corrects" }, { label: "B", text: "Loves" }, { label: "C", text: "Calls" }, { label: "D", text: "Chooses" }], correctAnswer: "B", verse: "Hebrews 12:6", explanation: "Discipline as love." },
  { id: "hebrews89", question: "Discipline produces a harvest of?", options: [{ label: "A", text: "Peace and righteousness" }, { label: "B", text: "Holiness and joy" }, { label: "C", text: "Faith and hope" }, { label: "D", text: "Strength and wisdom" }], correctAnswer: "A", verse: "Hebrews 12:11", explanation: "Positive outcome." },
  { id: "hebrews90", question: "Believers are warned not to refuse Him who?", options: [{ label: "A", text: "Calls" }, { label: "B", text: "Commands" }, { label: "C", text: "Speaks" }, { label: "D", text: "Judges" }], correctAnswer: "C", verse: "Hebrews 12:25", explanation: "Listen to God." },
  { id: "hebrews91", question: "God's kingdom is described as?", options: [{ label: "A", text: "Eternal" }, { label: "B", text: "Unshakable" }, { label: "C", text: "Holy" }, { label: "D", text: "Glorious" }], correctAnswer: "B", verse: "Hebrews 12:28", explanation: "Secure kingdom." },
  { id: "hebrews92", question: "Believers are encouraged to keep on loving one another as?", options: [{ label: "A", text: "Friends" }, { label: "B", text: "Family" }, { label: "C", text: "Brothers and sisters" }, { label: "D", text: "Saints" }], correctAnswer: "C", verse: "Hebrews 13:1", explanation: "Family love." },
  { id: "hebrews93", question: "Some have entertained angels without?", options: [{ label: "A", text: "Knowing it" }, { label: "B", text: "Seeing them" }, { label: "C", text: "Realizing it" }, { label: "D", text: "Understanding" }], correctAnswer: "A", verse: "Hebrews 13:2", explanation: "Hospitality reminder." },
  { id: "hebrews94", question: "Marriage should be honored by?", options: [{ label: "A", text: "All" }, { label: "B", text: "Believers" }, { label: "C", text: "Couples" }, { label: "D", text: "Leaders" }], correctAnswer: "A", verse: "Hebrews 13:4", explanation: "Moral purity." },
  { id: "hebrews95", question: "Keep your lives free from the love of?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Money" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Hebrews 13:5", explanation: "Contentment." },
  { id: "hebrews96", question: "Jesus Christ is the same yesterday, today, and?", options: [{ label: "A", text: "Forever" }, { label: "B", text: "Always" }, { label: "C", text: "Eternally" }, { label: "D", text: "Unchanging" }], correctAnswer: "A", verse: "Hebrews 13:8", explanation: "Christ's consistency." },
  { id: "hebrews97", question: "Believers are encouraged to offer a sacrifice of?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Prayer" }, { label: "C", text: "Worship" }, { label: "D", text: "Service" }], correctAnswer: "A", verse: "Hebrews 13:15", explanation: "Thankful worship." },
  { id: "hebrews98", question: "Do not forget to do good and share with others, for with such sacrifices God is?", options: [{ label: "A", text: "Honored" }, { label: "B", text: "Pleased" }, { label: "C", text: "Glorified" }, { label: "D", text: "Satisfied" }], correctAnswer: "B", verse: "Hebrews 13:16", explanation: "Practical faith." },
  { id: "hebrews99", question: "The God of peace brought back from the dead our Lord?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "Christ" }, { label: "C", text: "The great Shepherd" }, { label: "D", text: "The Savior" }], correctAnswer: "C", verse: "Hebrews 13:20", explanation: "Shepherd imagery." },
  { id: "hebrews100", question: "The letter of Hebrews closes with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Faith" }, { label: "C", text: "Grace" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "Hebrews 13:25", explanation: "Grace-centered ending." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HebrewsTriviaPage() {
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
        
        // Fetch user's progress for hebrews questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'hebrews');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'hebrews' });
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
            book: 'hebrews'
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
    if (score === 10) return "Perfect! You're a Hebrews expert!";
    if (score >= 8) return "Excellent! You know Hebrews well!";
    if (score >= 6) return "Good job! Keep studying Hebrews!";
    if (score >= 4) return "Nice try! Hebrews has much to explore!";
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
              href="/bible-trivia/hebrews"
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
