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
  { id: "john1", question: "How does the Gospel of John begin?", options: [{ label: "A", text: "With a genealogy" }, { label: "B", text: "In the beginning was the Word" }, { label: "C", text: "With Jesus' birth" }, { label: "D", text: "With John the Baptist" }], correctAnswer: "B", verse: "John 1:1", explanation: "John emphasizes Jesus' divine nature." },
  { id: "john2", question: "What is the Word identified as?", options: [{ label: "A", text: "Law" }, { label: "B", text: "God" }, { label: "C", text: "Prophet" }, { label: "D", text: "Angel" }], correctAnswer: "B", verse: "John 1:1", explanation: "The Word is fully God." },
  { id: "john3", question: "Through whom were all things made?", options: [{ label: "A", text: "God the Father" }, { label: "B", text: "The Word" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "John 1:3", explanation: "Jesus as Creator." },
  { id: "john4", question: "What came through the Word?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Life" }, { label: "C", text: "Judgment" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "John 1:4", explanation: "Life and light." },
  { id: "john5", question: "Who was sent to testify about the light?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Moses" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "John 1:6-7", explanation: "Witness to the light." },
  { id: "john6", question: "Did John the Baptist claim to be the light?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "John 1:8", explanation: "He pointed to Christ." },
  { id: "john7", question: "What did the Word become?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Flesh" }, { label: "C", text: "Light" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "John 1:14", explanation: "Incarnation." },
  { id: "john8", question: "Where did the Word dwell?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Among us" }, { label: "C", text: "Heaven only" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "John 1:14", explanation: "God with humanity." },
  { id: "john9", question: "What did people receive from Christ?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Grace and truth" }, { label: "C", text: "Judgment" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "John 1:17", explanation: "New covenant." },
  { id: "john10", question: "Who came through Moses?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Law" }, { label: "C", text: "Truth" }, { label: "D", text: "Life" }], correctAnswer: "B", verse: "John 1:17", explanation: "Contrast with Christ." },
  { id: "john11", question: "Who testified 'Behold the Lamb of God'?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Andrew" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "John 1:29", explanation: "Jesus as sacrifice." },
  { id: "john12", question: "What does the Lamb of God do?", options: [{ label: "A", text: "Judge the world" }, { label: "B", text: "Take away sin" }, { label: "C", text: "Teach the law" }, { label: "D", text: "Rule Israel" }], correctAnswer: "B", verse: "John 1:29", explanation: "Atonement." },
  { id: "john13", question: "What sign identified Jesus to John?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Spirit descending" }, { label: "C", text: "Voice" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "John 1:32-33", explanation: "Divine confirmation." },
  { id: "john14", question: "Who were first disciples called?", options: [{ label: "A", text: "Peter and Andrew" }, { label: "B", text: "Andrew and another disciple" }, { label: "C", text: "James and John" }, { label: "D", text: "Philip and Nathanael" }], correctAnswer: "B", verse: "John 1:35-37", explanation: "Following Jesus." },
  { id: "john15", question: "Who brought Peter to Jesus?", options: [{ label: "A", text: "John" }, { label: "B", text: "Andrew" }, { label: "C", text: "Philip" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "John 1:41-42", explanation: "Witnessing." },
  { id: "john16", question: "What name did Jesus give Simon?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "A", verse: "John 1:42", explanation: "New identity." },
  { id: "john17", question: "Who did Jesus call next?", options: [{ label: "A", text: "Matthew" }, { label: "B", text: "Philip" }, { label: "C", text: "Thomas" }, { label: "D", text: "Andrew" }], correctAnswer: "B", verse: "John 1:43", explanation: "Expanding disciples." },
  { id: "john18", question: "Who questioned if anything good could come from Nazareth?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Nathanael" }, { label: "C", text: "Thomas" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "John 1:46", explanation: "Skepticism." },
  { id: "john19", question: "What did Jesus call Nathanael?", options: [{ label: "A", text: "Faithful servant" }, { label: "B", text: "True Israelite" }, { label: "C", text: "Teacher" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "John 1:47", explanation: "Integrity recognized." },
  { id: "john20", question: "What miracle comes next?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Water to wine" }, { label: "C", text: "Raising dead" }, { label: "D", text: "Feeding crowd" }], correctAnswer: "B", verse: "John 2:1-11", explanation: "First sign." },
  { id: "john21", question: "Where did this miracle occur?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Cana" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "John 2:1", explanation: "Wedding at Cana." },
  { id: "john22", question: "What did Jesus turn into wine?", options: [{ label: "A", text: "Juice" }, { label: "B", text: "Water" }, { label: "C", text: "Oil" }, { label: "D", text: "Milk" }], correctAnswer: "B", verse: "John 2:9", explanation: "Creative power." },
  { id: "john23", question: "What did this sign reveal?", options: [{ label: "A", text: "Law" }, { label: "B", text: "His glory" }, { label: "C", text: "Authority" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "John 2:11", explanation: "Faith inspired." },
  { id: "john24", question: "Where did Jesus go next?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Capernaum" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Galilee" }], correctAnswer: "B", verse: "John 2:12", explanation: "Traveling ministry." },
  { id: "john25", question: "What did Jesus cleanse?", options: [{ label: "A", text: "Synagogue" }, { label: "B", text: "Temple" }, { label: "C", text: "House" }, { label: "D", text: "Market" }], correctAnswer: "B", verse: "John 2:14-16", explanation: "Zeal for God." },
  { id: "john26", question: "What did Jesus drive out?", options: [{ label: "A", text: "People" }, { label: "B", text: "Money changers" }, { label: "C", text: "Animals only" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "John 2:15", explanation: "Corruption removed." },
  { id: "john27", question: "What sign did Jesus give?", options: [{ label: "A", text: "Miracle" }, { label: "B", text: "Destroy this temple" }, { label: "C", text: "Fire" }, { label: "D", text: "Healing" }], correctAnswer: "B", verse: "John 2:19", explanation: "Resurrection prophecy." },
  { id: "john28", question: "What temple was He speaking of?", options: [{ label: "A", text: "Jerusalem temple" }, { label: "B", text: "His body" }, { label: "C", text: "Heaven" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "John 2:21", explanation: "Body as temple." },
  { id: "john29", question: "Who believed after seeing signs?", options: [{ label: "A", text: "Disciples" }, { label: "B", text: "Many people" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "John 2:23", explanation: "Sign-based belief." },
  { id: "john30", question: "Why did Jesus not entrust Himself?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "He knew what was in man" }, { label: "C", text: "Timing" }, { label: "D", text: "Opposition" }], correctAnswer: "B", verse: "John 2:24-25", explanation: "Divine knowledge." },
  { id: "john31", question: "Who visited Jesus at night?", options: [{ label: "A", text: "Joseph" }, { label: "B", text: "Nicodemus" }, { label: "C", text: "Caiaphas" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "John 3:1-2", explanation: "Seeking understanding." },
  { id: "john32", question: "What group was Nicodemus part of?", options: [{ label: "A", text: "Sadducees" }, { label: "B", text: "Pharisees" }, { label: "C", text: "Essenes" }, { label: "D", text: "Zealots" }], correctAnswer: "B", verse: "John 3:1", explanation: "Religious leadership." },
  { id: "john33", question: "What must one do to see the kingdom?", options: [{ label: "A", text: "Obey law" }, { label: "B", text: "Be born again" }, { label: "C", text: "Repent publicly" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "John 3:3", explanation: "Spiritual rebirth." },
  { id: "john34", question: "What birth confused Nicodemus?", options: [{ label: "A", text: "Physical" }, { label: "B", text: "Spiritual" }, { label: "C", text: "Royal" }, { label: "D", text: "Prophetic" }], correctAnswer: "B", verse: "John 3:4", explanation: "Misunderstanding." },
  { id: "john35", question: "What is born of the Spirit?", options: [{ label: "A", text: "Flesh" }, { label: "B", text: "Spirit" }, { label: "C", text: "Mind" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "John 3:6", explanation: "Spiritual nature." },
  { id: "john36", question: "What is compared to the Spirit?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Wind" }, { label: "C", text: "Water" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "John 3:8", explanation: "Unseen movement." },
  { id: "john37", question: "What Old Testament event is referenced?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "Bronze serpent" }, { label: "C", text: "Flood" }, { label: "D", text: "Manna" }], correctAnswer: "B", verse: "John 3:14", explanation: "Foreshadowing." },
  { id: "john38", question: "Why was the Son lifted up?", options: [{ label: "A", text: "Glory" }, { label: "B", text: "So believers may have eternal life" }, { label: "C", text: "Judgment" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "John 3:15", explanation: "Salvation purpose." },
  { id: "john39", question: "Why did God give His Son?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Love for the world" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "John 3:16", explanation: "Core gospel." },
  { id: "john40", question: "Who will not perish?", options: [{ label: "A", text: "The righteous" }, { label: "B", text: "Whoever believes" }, { label: "C", text: "Israel only" }, { label: "D", text: "The faithful" }], correctAnswer: "B", verse: "John 3:16", explanation: "Universal offer." },
  { id: "john41", question: "Did Jesus come to condemn the world?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Partly" }, { label: "D", text: "Later" }], correctAnswer: "B", verse: "John 3:17", explanation: "Salvation mission." },
  { id: "john42", question: "Why are people condemned?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Unbelief" }, { label: "C", text: "Ignorance" }, { label: "D", text: "Weak faith" }], correctAnswer: "B", verse: "John 3:18", explanation: "Response to Christ." },
  { id: "john43", question: "What do people love instead of light?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Darkness" }, { label: "C", text: "Law" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "John 3:19", explanation: "Moral choice." },
  { id: "john44", question: "Who must increase?", options: [{ label: "A", text: "John" }, { label: "B", text: "Jesus" }, { label: "C", text: "Disciples" }, { label: "D", text: "Pharisees" }], correctAnswer: "B", verse: "John 3:30", explanation: "Humility." },
  { id: "john45", question: "Who must decrease?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "John" }, { label: "C", text: "Peter" }, { label: "D", text: "Crowds" }], correctAnswer: "B", verse: "John 3:30", explanation: "Servant attitude." },
  { id: "john46", question: "Where did Jesus travel next?", options: [{ label: "A", text: "Galilee" }, { label: "B", text: "Samaria" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "John 4:4", explanation: "Divine appointment." },
  { id: "john47", question: "Who did Jesus meet at the well?", options: [{ label: "A", text: "Mary" }, { label: "B", text: "Samaritan woman" }, { label: "C", text: "Martha" }, { label: "D", text: "Anna" }], correctAnswer: "B", verse: "John 4:7", explanation: "Breaking barriers." },
  { id: "john48", question: "What did Jesus ask for?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Water" }, { label: "C", text: "Help" }, { label: "D", text: "Directions" }], correctAnswer: "B", verse: "John 4:7", explanation: "Conversation begins." },
  { id: "john49", question: "What did Jesus offer?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Living water" }, { label: "C", text: "Healing" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "John 4:10", explanation: "Spiritual life." },
  { id: "john50", question: "What does living water give?", options: [{ label: "A", text: "Health" }, { label: "B", text: "Eternal life" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "John 4:14", explanation: "Satisfaction forever." },
  { id: "john51", question: "How many husbands had she had?", options: [{ label: "A", text: "3" }, { label: "B", text: "5" }, { label: "C", text: "7" }, { label: "D", text: "1" }], correctAnswer: "B", verse: "John 4:18", explanation: "Jesus' knowledge." },
  { id: "john52", question: "What did she perceive Jesus to be?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Prophet" }, { label: "C", text: "Priest" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "John 4:19", explanation: "Recognition grows." },
  { id: "john53", question: "Where did Samaritans worship?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Mount Gerizim" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Capernaum" }], correctAnswer: "B", verse: "John 4:20", explanation: "Cultural divide." },
  { id: "john54", question: "What kind of worshipers does God seek?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Spirit and truth" }, { label: "C", text: "Priests" }, { label: "D", text: "Pure" }], correctAnswer: "B", verse: "John 4:23", explanation: "True worship." },
  { id: "john55", question: "Who did Jesus say He was?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "The Messiah" }, { label: "C", text: "Teacher" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "John 4:26", explanation: "Direct revelation." },
  { id: "john56", question: "What did the woman do?", options: [{ label: "A", text: "Stay silent" }, { label: "B", text: "Tell the town" }, { label: "C", text: "Leave" }, { label: "D", text: "Follow Jesus" }], correctAnswer: "B", verse: "John 4:28-29", explanation: "Witnessing." },
  { id: "john57", question: "What did Jesus say His food was?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Do the Father's will" }, { label: "C", text: "Prayer" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "John 4:34", explanation: "Mission priority." },
  { id: "john58", question: "What is ready for harvest?", options: [{ label: "A", text: "Fields" }, { label: "B", text: "Souls" }, { label: "C", text: "Crops" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "John 4:35", explanation: "Spiritual readiness." },
  { id: "john59", question: "Who believed because of her testimony?", options: [{ label: "A", text: "Jews" }, { label: "B", text: "Samaritans" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "John 4:39", explanation: "Impact of witness." },
  { id: "john60", question: "Who did they say Jesus was?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "Savior of the world" }, { label: "C", text: "Teacher" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "John 4:42", explanation: "Universal Savior." },
  { id: "john61", question: "Where did Jesus go after Samaria?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Galilee" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "John 4:43", explanation: "Continuing ministry." },
  { id: "john62", question: "Who asked Jesus to heal his son?", options: [{ label: "A", text: "Centurion" }, { label: "B", text: "Royal official" }, { label: "C", text: "Pharisee" }, { label: "D", text: "Disciple" }], correctAnswer: "B", verse: "John 4:46-47", explanation: "Faith tested." },
  { id: "john63", question: "What did Jesus say first?", options: [{ label: "A", text: "I will come" }, { label: "B", text: "Unless you see signs" }, { label: "C", text: "Believe" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "John 4:48", explanation: "Sign-based faith challenged." },
  { id: "john64", question: "What healed the boy?", options: [{ label: "A", text: "Touch" }, { label: "B", text: "Jesus' word" }, { label: "C", text: "Prayer" }, { label: "D", text: "Water" }], correctAnswer: "B", verse: "John 4:50", explanation: "Power of word." },
  { id: "john65", question: "What did the official believe?", options: [{ label: "A", text: "Eventually" }, { label: "B", text: "Immediately" }, { label: "C", text: "Later" }, { label: "D", text: "Never" }], correctAnswer: "B", verse: "John 4:50", explanation: "Trust shown." },
  { id: "john66", question: "When was the boy healed?", options: [{ label: "A", text: "Morning" }, { label: "B", text: "Seventh hour" }, { label: "C", text: "Evening" }, { label: "D", text: "Night" }], correctAnswer: "B", verse: "John 4:52", explanation: "Confirmation." },
  { id: "john67", question: "What resulted in the household?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Belief" }, { label: "C", text: "Doubt" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "John 4:53", explanation: "Faith spreads." },
  { id: "john68", question: "Which sign number was this?", options: [{ label: "A", text: "First" }, { label: "B", text: "Second" }, { label: "C", text: "Third" }, { label: "D", text: "Fourth" }], correctAnswer: "B", verse: "John 4:54", explanation: "Structured signs." },
  { id: "john69", question: "Where did Jesus go next?", options: [{ label: "A", text: "Galilee" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "John 5:1", explanation: "Feast visit." },
  { id: "john70", question: "What pool is mentioned?", options: [{ label: "A", text: "Siloam" }, { label: "B", text: "Bethesda" }, { label: "C", text: "Jordan" }, { label: "D", text: "Gihon" }], correctAnswer: "B", verse: "John 5:2", explanation: "Place of healing." },
  { id: "john71", question: "How long had the man been ill?", options: [{ label: "A", text: "10 years" }, { label: "B", text: "38 years" }, { label: "C", text: "40 years" }, { label: "D", text: "12 years" }], correctAnswer: "B", verse: "John 5:5", explanation: "Long suffering." },
  { id: "john72", question: "What did Jesus ask him?", options: [{ label: "A", text: "Do you believe?" }, { label: "B", text: "Do you want to be healed?" }, { label: "C", text: "Why are you here?" }, { label: "D", text: "Who sinned?" }], correctAnswer: "B", verse: "John 5:6", explanation: "Personal choice." },
  { id: "john73", question: "What day was it?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Sabbath" }, { label: "C", text: "Fast day" }, { label: "D", text: "Passover" }], correctAnswer: "B", verse: "John 5:9", explanation: "Controversy arises." },
  { id: "john74", question: "What command did Jesus give?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Take your mat and walk" }, { label: "C", text: "Go home" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "John 5:8", explanation: "Authority shown." },
  { id: "john75", question: "Why were leaders upset?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Breaking Sabbath" }, { label: "C", text: "Teaching" }, { label: "D", text: "Crowds" }], correctAnswer: "B", verse: "John 5:16", explanation: "Legalism." },
  { id: "john76", question: "What did Jesus call God?", options: [{ label: "A", text: "Lord" }, { label: "B", text: "My Father" }, { label: "C", text: "Creator" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "John 5:17", explanation: "Divine sonship." },
  { id: "john77", question: "Why did they seek to kill Him?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Making Himself equal with God" }, { label: "C", text: "Crowds" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "John 5:18", explanation: "Claim of equality." },
  { id: "john78", question: "Who does the Son imitate?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "The Father" }, { label: "C", text: "Law" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "John 5:19", explanation: "Unity." },
  { id: "john79", question: "Who gives life?", options: [{ label: "A", text: "Father only" }, { label: "B", text: "The Son" }, { label: "C", text: "Spirit" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "John 5:21", explanation: "Authority to give life." },
  { id: "john80", question: "Who judges?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Prophets" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "John 5:22", explanation: "Judgment authority." },
  { id: "john81", question: "Why was authority given?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Because He is Son of Man" }, { label: "C", text: "Law" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "John 5:27", explanation: "Messianic role." },
  { id: "john82", question: "Who will hear His voice?", options: [{ label: "A", text: "Living" }, { label: "B", text: "Dead" }, { label: "C", text: "Righteous" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "John 5:28-29", explanation: "Resurrection." },
  { id: "john83", question: "What comes from evil deeds?", options: [{ label: "A", text: "Life" }, { label: "B", text: "Judgment" }, { label: "C", text: "Mercy" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "John 5:29", explanation: "Accountability." },
  { id: "john84", question: "Whose testimony matters most?", options: [{ label: "A", text: "John's" }, { label: "B", text: "The Father's" }, { label: "C", text: "Crowds" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "John 5:37", explanation: "Divine witness." },
  { id: "john85", question: "What did Scripture testify about?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Jesus" }, { label: "C", text: "Israel" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "John 5:39", explanation: "Pointing to Christ." },
  { id: "john86", question: "Why did people refuse to come?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "They loved human praise" }, { label: "C", text: "Ignorance" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "John 5:44", explanation: "Pride." },
  { id: "john87", question: "Who would accuse them?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "Moses" }, { label: "C", text: "Prophets" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "John 5:45", explanation: "Law condemns." },
  { id: "john88", question: "Who wrote about Jesus?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Moses" }, { label: "C", text: "David" }, { label: "D", text: "Elijah" }], correctAnswer: "B", verse: "John 5:46", explanation: "Messianic prophecy." },
  { id: "john89", question: "What follows in John 6?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Feeding 5000" }, { label: "C", text: "Debate" }, { label: "D", text: "Trial" }], correctAnswer: "B", verse: "John 6:1-14", explanation: "Sign miracle." },
  { id: "john90", question: "How many loaves?", options: [{ label: "A", text: "7" }, { label: "B", text: "5" }, { label: "C", text: "3" }, { label: "D", text: "10" }], correctAnswer: "B", verse: "John 6:9", explanation: "Provision." },
  { id: "john91", question: "How many fish?", options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "5" }, { label: "D", text: "7" }], correctAnswer: "B", verse: "John 6:9", explanation: "Small offering." },
  { id: "john92", question: "How many were fed?", options: [{ label: "A", text: "4000" }, { label: "B", text: "5000" }, { label: "C", text: "7000" }, { label: "D", text: "12000" }], correctAnswer: "B", verse: "John 6:10", explanation: "Abundant provision." },
  { id: "john93", question: "How many baskets remained?", options: [{ label: "A", text: "7" }, { label: "B", text: "12" }, { label: "C", text: "5" }, { label: "D", text: "10" }], correctAnswer: "B", verse: "John 6:13", explanation: "Overflow." },
  { id: "john94", question: "What did the crowd want to do?", options: [{ label: "A", text: "Leave" }, { label: "B", text: "Make Him king" }, { label: "C", text: "Arrest Him" }, { label: "D", text: "Question Him" }], correctAnswer: "B", verse: "John 6:15", explanation: "Misunderstood mission." },
  { id: "john95", question: "What did Jesus do next?", options: [{ label: "A", text: "Teach" }, { label: "B", text: "Withdraw" }, { label: "C", text: "Heal" }, { label: "D", text: "Travel" }], correctAnswer: "B", verse: "John 6:15", explanation: "Avoids political kingship." },
  { id: "john96", question: "What miracle followed at night?", options: [{ label: "A", text: "Storm calmed" }, { label: "B", text: "Walking on water" }, { label: "C", text: "Healing" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "John 6:19", explanation: "Authority over nature." },
  { id: "john97", question: "What did Jesus say?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "It is I" }, { label: "C", text: "Peace" }, { label: "D", text: "Follow Me" }], correctAnswer: "B", verse: "John 6:20", explanation: "Divine identity." },
  { id: "john98", question: "Where did the boat arrive?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Capernaum" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Bethsaida" }], correctAnswer: "B", verse: "John 6:21", explanation: "Destination reached." },
  { id: "john99", question: "What title does Jesus claim?", options: [{ label: "A", text: "Light of world" }, { label: "B", text: "Bread of life" }, { label: "C", text: "Good shepherd" }, { label: "D", text: "True vine" }], correctAnswer: "B", verse: "John 6:35", explanation: "Spiritual sustenance." },
  { id: "john100", question: "What is the main purpose of John's Gospel?", options: [{ label: "A", text: "History" }, { label: "B", text: "That you may believe" }, { label: "C", text: "Law teaching" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "John 20:31", explanation: "Faith in Christ." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JohnTriviaPage() {
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
          .eq("book", "john");

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
          book: "john",
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
            book: "john",
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
    if (score === 10) return "Perfect! You're a John expert!";
    if (score >= 8) return "Excellent! You know John well!";
    if (score >= 6) return "Good job! Keep studying John!";
    if (score >= 4) return "Nice try! John has much to explore!";
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
              href="/bible-trivia/john"
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
                  {isCorrect ? "Correct" : "Incorrect"}
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
                          <span className="ml-2 text-green-700">(correct)</span>
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
                    <p className="text-gray-500 text-sm italic mb-3">
                      Loading verse...
                    </p>
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
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

