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
  { id: "matthew1", question: "Who is the author of the Gospel of Matthew?", options: [{ label: "A", text: "Mark" }, { label: "B", text: "Matthew" }, { label: "C", text: "Luke" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Matthew 1:1", explanation: "Matthew, also called Levi, is traditionally credited as the author." },
  { id: "matthew2", question: "How does Matthew describe Jesus in the opening verse?", options: [{ label: "A", text: "Son of God" }, { label: "B", text: "Son of David, Son of Abraham" }, { label: "C", text: "King of Israel" }, { label: "D", text: "Messiah only" }], correctAnswer: "B", verse: "Matthew 1:1", explanation: "Matthew ties Jesus to Jewish lineage." },
  { id: "matthew3", question: "How many generations are listed from Abraham to David?", options: [{ label: "A", text: "10" }, { label: "B", text: "14" }, { label: "C", text: "12" }, { label: "D", text: "7" }], correctAnswer: "B", verse: "Matthew 1:17", explanation: "Matthew structures the genealogy in groups of fourteen." },
  { id: "matthew4", question: "Who was Jesus' mother?", options: [{ label: "A", text: "Elizabeth" }, { label: "B", text: "Mary" }, { label: "C", text: "Anna" }, { label: "D", text: "Martha" }], correctAnswer: "B", verse: "Matthew 1:16", explanation: "Mary conceived by the Holy Spirit." },
  { id: "matthew5", question: "Who was engaged to Mary?", options: [{ label: "A", text: "Joseph" }, { label: "B", text: "Zechariah" }, { label: "C", text: "Simeon" }, { label: "D", text: "John" }], correctAnswer: "A", verse: "Matthew 1:18", explanation: "Joseph is described as righteous." },
  { id: "matthew6", question: "Why did Joseph plan to divorce Mary quietly?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Righteousness and mercy" }, { label: "C", text: "Anger" }, { label: "D", text: "Command" }], correctAnswer: "B", verse: "Matthew 1:19", explanation: "Joseph sought to act compassionately." },
  { id: "matthew7", question: "Who appeared to Joseph in a dream?", options: [{ label: "A", text: "Gabriel" }, { label: "B", text: "An angel of the Lord" }, { label: "C", text: "Jesus" }, { label: "D", text: "Moses" }], correctAnswer: "B", verse: "Matthew 1:20", explanation: "God reassured Joseph." },
  { id: "matthew8", question: "What name was the child commanded to be given?", options: [{ label: "A", text: "Immanuel" }, { label: "B", text: "Jesus" }, { label: "C", text: "Messiah" }, { label: "D", text: "Joshua" }], correctAnswer: "B", verse: "Matthew 1:21", explanation: "Jesus means 'The Lord saves'." },
  { id: "matthew9", question: "What does the name Immanuel mean?", options: [{ label: "A", text: "King of kings" }, { label: "B", text: "God with us" }, { label: "C", text: "Son of David" }, { label: "D", text: "Prince of Peace" }], correctAnswer: "B", verse: "Matthew 1:23", explanation: "Fulfillment of prophecy." },
  { id: "matthew10", question: "Who visited Jesus after His birth?", options: [{ label: "A", text: "Shepherds" }, { label: "B", text: "Magi" }, { label: "C", text: "Priests" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Matthew 2:1", explanation: "Wise men from the east." },
  { id: "matthew11", question: "Which king ruled when Jesus was born?", options: [{ label: "A", text: "Caesar Augustus" }, { label: "B", text: "Herod" }, { label: "C", text: "Pilate" }, { label: "D", text: "Archelaus" }], correctAnswer: "B", verse: "Matthew 2:1", explanation: "Herod the Great." },
  { id: "matthew12", question: "What sign guided the Magi?", options: [{ label: "A", text: "Dream" }, { label: "B", text: "Star" }, { label: "C", text: "Angel" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "Matthew 2:2", explanation: "The star announced the King." },
  { id: "matthew13", question: "Where was the Messiah prophesied to be born?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Bethlehem" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Galilee" }], correctAnswer: "B", verse: "Matthew 2:5-6", explanation: "Fulfillment of Micah's prophecy." },
  { id: "matthew14", question: "What gifts did the Magi bring?", options: [{ label: "A", text: "Gold, silver, bronze" }, { label: "B", text: "Gold, frankincense, myrrh" }, { label: "C", text: "Spices and cloth" }, { label: "D", text: "Coins" }], correctAnswer: "B", verse: "Matthew 2:11", explanation: "Symbolic gifts." },
  { id: "matthew15", question: "How was Joseph warned to flee?", options: [{ label: "A", text: "Angel in a dream" }, { label: "B", text: "Prophet" }, { label: "C", text: "Vision" }, { label: "D", text: "Star" }], correctAnswer: "A", verse: "Matthew 2:13", explanation: "God protects Jesus." },
  { id: "matthew16", question: "Where did Joseph take his family?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Egypt" }, { label: "C", text: "Bethlehem" }, { label: "D", text: "Jerusalem" }], correctAnswer: "B", verse: "Matthew 2:14", explanation: "Fulfillment of prophecy." },
  { id: "matthew17", question: "Why did Herod kill the children?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Fear of losing power" }, { label: "C", text: "Command from Rome" }, { label: "D", text: "Jealousy of Magi" }], correctAnswer: "B", verse: "Matthew 2:16", explanation: "Threat to his throne." },
  { id: "matthew18", question: "What prophecy is fulfilled by the massacre?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Jeremiah" }, { label: "C", text: "Ezekiel" }, { label: "D", text: "Daniel" }], correctAnswer: "B", verse: "Matthew 2:17-18", explanation: "Rachel weeping." },
  { id: "matthew19", question: "Where did Jesus grow up?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Nazareth" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Capernaum" }], correctAnswer: "B", verse: "Matthew 2:23", explanation: "Called a Nazarene." },
  { id: "matthew20", question: "Who began preaching in Matthew 3?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Peter" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "Matthew 3:1", explanation: "The forerunner appears." },
  { id: "matthew21", question: "What was John's message?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Repent" }, { label: "C", text: "Believe" }, { label: "D", text: "Follow me" }], correctAnswer: "B", verse: "Matthew 3:2", explanation: "Prepare the way." },
  { id: "matthew22", question: "Where did John preach?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Synagogues" }, { label: "D", text: "Palace" }], correctAnswer: "B", verse: "Matthew 3:1", explanation: "Prophetic setting." },
  { id: "matthew23", question: "What did John wear?", options: [{ label: "A", text: "Priestly robes" }, { label: "B", text: "Camel's hair" }, { label: "C", text: "Royal garments" }, { label: "D", text: "Linen" }], correctAnswer: "B", verse: "Matthew 3:4", explanation: "Prophetic appearance." },
  { id: "matthew24", question: "What did John eat?", options: [{ label: "A", text: "Fish and bread" }, { label: "B", text: "Locusts and honey" }, { label: "C", text: "Grain" }, { label: "D", text: "Fruit" }], correctAnswer: "B", verse: "Matthew 3:4", explanation: "Simple living." },
  { id: "matthew25", question: "What rite did John perform?", options: [{ label: "A", text: "Circumcision" }, { label: "B", text: "Baptism" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Matthew 3:6", explanation: "Baptism of repentance." },
  { id: "matthew26", question: "Who came to John to be baptized?", options: [{ label: "A", text: "Herod" }, { label: "B", text: "Jesus" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Matthew 3:13", explanation: "Jesus identifies with sinners." },
  { id: "matthew27", question: "Why did John hesitate to baptize Jesus?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Unworthiness" }, { label: "C", text: "Confusion" }, { label: "D", text: "Command" }], correctAnswer: "B", verse: "Matthew 3:14", explanation: "Jesus was sinless." },
  { id: "matthew28", question: "What happened when Jesus was baptized?", options: [{ label: "A", text: "Fire fell" }, { label: "B", text: "Heaven opened" }, { label: "C", text: "Earth shook" }, { label: "D", text: "Angels sang" }], correctAnswer: "B", verse: "Matthew 3:16", explanation: "Divine affirmation." },
  { id: "matthew29", question: "What descended like a dove?", options: [{ label: "A", text: "Angel" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Fire" }, { label: "D", text: "Cloud" }], correctAnswer: "B", verse: "Matthew 3:16", explanation: "Spirit's presence." },
  { id: "matthew30", question: "What did the voice from heaven say?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "This is My beloved Son" }, { label: "C", text: "Follow Him" }, { label: "D", text: "He is king" }], correctAnswer: "B", verse: "Matthew 3:17", explanation: "God affirms Jesus." },
  { id: "matthew31", question: "Where was Jesus led after His baptism?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Sea" }], correctAnswer: "B", verse: "Matthew 4:1", explanation: "Testing begins." },
  { id: "matthew32", question: "Who led Jesus into the wilderness?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The Spirit" }, { label: "C", text: "John" }, { label: "D", text: "Disciples" }], correctAnswer: "B", verse: "Matthew 4:1", explanation: "Spirit-led testing." },
  { id: "matthew33", question: "How long did Jesus fast?", options: [{ label: "A", text: "30 days" }, { label: "B", text: "40 days" }, { label: "C", text: "7 days" }, { label: "D", text: "12 days" }], correctAnswer: "B", verse: "Matthew 4:2", explanation: "Biblical testing period." },
  { id: "matthew34", question: "Who tempted Jesus?", options: [{ label: "A", text: "Pharisees" }, { label: "B", text: "The devil" }, { label: "C", text: "Herod" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Matthew 4:1", explanation: "Spiritual confrontation." },
  { id: "matthew35", question: "What was the first temptation?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Turn stones to bread" }, { label: "C", text: "Jump from temple" }, { label: "D", text: "Worship Satan" }], correctAnswer: "B", verse: "Matthew 4:3", explanation: "Physical need." },
  { id: "matthew36", question: "How did Jesus respond?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Scripture" }, { label: "C", text: "Silence" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Matthew 4:4", explanation: "Word of God." },
  { id: "matthew37", question: "Where did Satan take Jesus next?", options: [{ label: "A", text: "Mountain" }, { label: "B", text: "Holy city" }, { label: "C", text: "Sea" }, { label: "D", text: "Desert" }], correctAnswer: "B", verse: "Matthew 4:5", explanation: "Temple temptation." },
  { id: "matthew38", question: "What did Satan quote?", options: [{ label: "A", text: "Prophecy" }, { label: "B", text: "Scripture" }, { label: "C", text: "Law" }, { label: "D", text: "Vision" }], correctAnswer: "B", verse: "Matthew 4:6", explanation: "Scripture misused." },
  { id: "matthew39", question: "What was the final temptation?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Worship Satan" }, { label: "C", text: "Test God" }, { label: "D", text: "Escape suffering" }], correctAnswer: "B", verse: "Matthew 4:9", explanation: "Authority exchange." },
  { id: "matthew40", question: "What command ended the temptation?", options: [{ label: "A", text: "Be silent" }, { label: "B", text: "Away from me" }, { label: "C", text: "Repent" }, { label: "D", text: "Go home" }], correctAnswer: "B", verse: "Matthew 4:10", explanation: "Jesus asserts authority." },
  { id: "matthew41", question: "Who came to minister to Jesus?", options: [{ label: "A", text: "Disciples" }, { label: "B", text: "Angels" }, { label: "C", text: "Crowds" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Matthew 4:11", explanation: "Divine care." },
  { id: "matthew42", question: "Where did Jesus begin His ministry?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Galilee" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "Matthew 4:12", explanation: "Fulfillment of prophecy." },
  { id: "matthew43", question: "What was Jesus' message?", options: [{ label: "A", text: "Love one another" }, { label: "B", text: "Repent, the kingdom is near" }, { label: "C", text: "Follow Me" }, { label: "D", text: "Fear God" }], correctAnswer: "B", verse: "Matthew 4:17", explanation: "Kingdom proclamation." },
  { id: "matthew44", question: "Who were the first disciples called?", options: [{ label: "A", text: "James and John" }, { label: "B", text: "Peter and Andrew" }, { label: "C", text: "Matthew and Philip" }, { label: "D", text: "Thomas and Bartholomew" }], correctAnswer: "B", verse: "Matthew 4:18", explanation: "Fishermen called." },
  { id: "matthew45", question: "What did Jesus promise to make them?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Fishers of men" }, { label: "C", text: "Teachers" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Matthew 4:19", explanation: "Mission defined." },
  { id: "matthew46", question: "What did they leave immediately?", options: [{ label: "A", text: "Families" }, { label: "B", text: "Nets" }, { label: "C", text: "Boats" }, { label: "D", text: "Homes" }], correctAnswer: "B", verse: "Matthew 4:20", explanation: "Immediate obedience." },
  { id: "matthew47", question: "What did Jesus teach in synagogues?", options: [{ label: "A", text: "Law only" }, { label: "B", text: "Good news of the kingdom" }, { label: "C", text: "Traditions" }, { label: "D", text: "History" }], correctAnswer: "B", verse: "Matthew 4:23", explanation: "Kingdom focus." },
  { id: "matthew48", question: "What followed Jesus?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Large crowds" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Matthew 4:25", explanation: "Widespread impact." },
  { id: "matthew49", question: "Where does the Sermon on the Mount begin?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Mountain" }, { label: "C", text: "Sea" }, { label: "D", text: "House" }], correctAnswer: "B", verse: "Matthew 5:1", explanation: "Teaching moment." },
  { id: "matthew50", question: "Who did Jesus primarily address?", options: [{ label: "A", text: "Pharisees" }, { label: "B", text: "Disciples" }, { label: "C", text: "Crowds" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Matthew 5:1-2", explanation: "Discipleship teaching." },
  { id: "matthew51", question: "What are the blessed called?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Poor in spirit" }, { label: "C", text: "Strong" }, { label: "D", text: "Wise" }], correctAnswer: "B", verse: "Matthew 5:3", explanation: "Kingdom values." },
  { id: "matthew52", question: "What is promised to those who mourn?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Comfort" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Matthew 5:4", explanation: "God's comfort." },
  { id: "matthew53", question: "Who will inherit the earth?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Meek" }, { label: "C", text: "Rich" }, { label: "D", text: "Wise" }], correctAnswer: "B", verse: "Matthew 5:5", explanation: "Countercultural promise." },
  { id: "matthew54", question: "Who will be filled?", options: [{ label: "A", text: "The wealthy" }, { label: "B", text: "Those who hunger for righteousness" }, { label: "C", text: "The powerful" }, { label: "D", text: "The learned" }], correctAnswer: "B", verse: "Matthew 5:6", explanation: "Spiritual desire." },
  { id: "matthew55", question: "Who will receive mercy?", options: [{ label: "A", text: "Judges" }, { label: "B", text: "The merciful" }, { label: "C", text: "Kings" }, { label: "D", text: "Teachers" }], correctAnswer: "B", verse: "Matthew 5:7", explanation: "Reciprocal mercy." },
  { id: "matthew56", question: "Who will see God?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Pure in heart" }, { label: "C", text: "Strong" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Matthew 5:8", explanation: "Inner purity." },
  { id: "matthew57", question: "Who are called children of God?", options: [{ label: "A", text: "Righteous" }, { label: "B", text: "Peacemakers" }, { label: "C", text: "Poor" }, { label: "D", text: "Teachers" }], correctAnswer: "B", verse: "Matthew 5:9", explanation: "Peace reflects God." },
  { id: "matthew58", question: "Why are some persecuted?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Power" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "Matthew 5:10", explanation: "Faithfulness brings opposition." },
  { id: "matthew59", question: "What are disciples called?", options: [{ label: "A", text: "Light and salt" }, { label: "B", text: "Servants" }, { label: "C", text: "Warriors" }, { label: "D", text: "Kings" }], correctAnswer: "A", verse: "Matthew 5:13-14", explanation: "Influence in the world." },
  { id: "matthew60", question: "What should shine before others?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Good works" }, { label: "C", text: "Knowledge" }, { label: "D", text: "Speech" }], correctAnswer: "B", verse: "Matthew 5:16", explanation: "Glorify God." },
  { id: "matthew61", question: "Did Jesus come to abolish the Law?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No, to fulfill it" }, { label: "C", text: "Partially" }, { label: "D", text: "Only traditions" }], correctAnswer: "B", verse: "Matthew 5:17", explanation: "Fulfillment, not removal." },
  { id: "matthew62", question: "What must exceed the Pharisees?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Righteousness" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Matthew 5:20", explanation: "Heart righteousness." },
  { id: "matthew63", question: "What emotion equals murder?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Anger" }, { label: "C", text: "Jealousy" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Matthew 5:22", explanation: "Heart-level sin." },
  { id: "matthew64", question: "What is better than offering a gift?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Reconciliation" }, { label: "C", text: "Fasting" }, { label: "D", text: "Giving" }], correctAnswer: "B", verse: "Matthew 5:23-24", explanation: "Right relationships matter." },
  { id: "matthew65", question: "What sin is addressed next?", options: [{ label: "A", text: "Theft" }, { label: "B", text: "Adultery" }, { label: "C", text: "Lying" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "Matthew 5:27", explanation: "Inner purity." },
  { id: "matthew66", question: "What equals adultery?", options: [{ label: "A", text: "Touch" }, { label: "B", text: "Lustful look" }, { label: "C", text: "Desire" }, { label: "D", text: "Thought" }], correctAnswer: "B", verse: "Matthew 5:28", explanation: "Heart intent." },
  { id: "matthew67", question: "What does Jesus teach about oaths?", options: [{ label: "A", text: "Use wisely" }, { label: "B", text: "Let your yes be yes" }, { label: "C", text: "Swear often" }, { label: "D", text: "Avoid God's name" }], correctAnswer: "B", verse: "Matthew 5:37", explanation: "Truthfulness." },
  { id: "matthew68", question: "How should disciples respond to enemies?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Love them" }, { label: "C", text: "Avoid them" }, { label: "D", text: "Judge them" }], correctAnswer: "B", verse: "Matthew 5:44", explanation: "Radical love." },
  { id: "matthew69", question: "What standard is given?", options: [{ label: "A", text: "Be strong" }, { label: "B", text: "Be perfect as your Father" }, { label: "C", text: "Be wise" }, { label: "D", text: "Be holy only" }], correctAnswer: "B", verse: "Matthew 5:48", explanation: "God-like character." },
  { id: "matthew70", question: "What chapter teaches about prayer?", options: [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "7" }, { label: "D", text: "8" }], correctAnswer: "B", verse: "Matthew 6", explanation: "Spiritual disciplines." },
  { id: "matthew71", question: "What prayer does Jesus teach?", options: [{ label: "A", text: "Temple prayer" }, { label: "B", text: "The Lord's Prayer" }, { label: "C", text: "David's prayer" }, { label: "D", text: "Prophetic prayer" }], correctAnswer: "B", verse: "Matthew 6:9", explanation: "Model prayer." },
  { id: "matthew72", question: "What should not be stored up?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Treasures on earth" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "Matthew 6:19", explanation: "Eternal focus." },
  { id: "matthew73", question: "Where should treasures be stored?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Heaven" }, { label: "C", text: "Home" }, { label: "D", text: "Community" }], correctAnswer: "B", verse: "Matthew 6:20", explanation: "Eternal investment." },
  { id: "matthew74", question: "Who cannot be served together?", options: [{ label: "A", text: "God and people" }, { label: "B", text: "God and money" }, { label: "C", text: "Faith and works" }, { label: "D", text: "Law and grace" }], correctAnswer: "B", verse: "Matthew 6:24", explanation: "Exclusive devotion." },
  { id: "matthew75", question: "What should disciples not worry about?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Tomorrow" }, { label: "C", text: "Prayer" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Matthew 6:34", explanation: "Trust God daily." },
  { id: "matthew76", question: "What chapter includes 'Ask, seek, knock'?", options: [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "7" }, { label: "D", text: "8" }], correctAnswer: "C", verse: "Matthew 7:7", explanation: "Persistent prayer." },
  { id: "matthew77", question: "How should others be treated?", options: [{ label: "A", text: "With caution" }, { label: "B", text: "As you want to be treated" }, { label: "C", text: "With authority" }, { label: "D", text: "With distance" }], correctAnswer: "B", verse: "Matthew 7:12", explanation: "Golden Rule." },
  { id: "matthew78", question: "Which gate leads to life?", options: [{ label: "A", text: "Wide" }, { label: "B", text: "Narrow" }, { label: "C", text: "Popular" }, { label: "D", text: "Easy" }], correctAnswer: "B", verse: "Matthew 7:14", explanation: "True discipleship." },
  { id: "matthew79", question: "How are false prophets recognized?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Fruits" }, { label: "C", text: "Clothing" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Matthew 7:16", explanation: "Actions reveal truth." },
  { id: "matthew80", question: "Who enters the kingdom?", options: [{ label: "A", text: "Those who say Lord" }, { label: "B", text: "Those who do God's will" }, { label: "C", text: "Teachers" }, { label: "D", text: "Miracle workers" }], correctAnswer: "B", verse: "Matthew 7:21", explanation: "Obedience matters." },
  { id: "matthew81", question: "What foundation lasts?", options: [{ label: "A", text: "Sand" }, { label: "B", text: "Rock" }, { label: "C", text: "Wood" }, { label: "D", text: "Clay" }], correctAnswer: "B", verse: "Matthew 7:24", explanation: "Hearing and doing." },
  { id: "matthew82", question: "How did crowds react to Jesus' teaching?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Amazement" }, { label: "C", text: "Fear" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Matthew 7:28", explanation: "Authority recognized." },
  { id: "matthew83", question: "Why were they amazed?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "Authority" }, { label: "C", text: "Stories" }, { label: "D", text: "Tone" }], correctAnswer: "B", verse: "Matthew 7:29", explanation: "Not like scribes." },
  { id: "matthew84", question: "What follows the sermon?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "Parables" }, { label: "C", text: "Conflict" }, { label: "D", text: "Travel" }], correctAnswer: "A", verse: "Matthew 8", explanation: "Authority demonstrated." },
  { id: "matthew85", question: "What disease is healed first?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Leprosy" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Fever" }], correctAnswer: "B", verse: "Matthew 8:2-3", explanation: "Compassion shown." },
  { id: "matthew86", question: "What does Jesus value in the centurion?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Faith" }, { label: "C", text: "Rank" }, { label: "D", text: "Kindness" }], correctAnswer: "B", verse: "Matthew 8:10", explanation: "Great faith praised." },
  { id: "matthew87", question: "What calms the storm?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Jesus' command" }, { label: "C", text: "Faith" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Matthew 8:26", explanation: "Authority over nature." },
  { id: "matthew88", question: "What do demons recognize Jesus as?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "Son of God" }, { label: "C", text: "Teacher" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Matthew 8:29", explanation: "Spiritual authority." },
  { id: "matthew89", question: "What animal do demons enter?", options: [{ label: "A", text: "Goats" }, { label: "B", text: "Pigs" }, { label: "C", text: "Sheep" }, { label: "D", text: "Cows" }], correctAnswer: "B", verse: "Matthew 8:32", explanation: "Demonstrates power." },
  { id: "matthew90", question: "How do people respond?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Fear and rejection" }, { label: "C", text: "Joy" }, { label: "D", text: "Curiosity" }], correctAnswer: "B", verse: "Matthew 8:34", explanation: "Power unsettles." },
  { id: "matthew91", question: "What does Jesus forgive first?", options: [{ label: "A", text: "Sickness" }, { label: "B", text: "Sins" }, { label: "C", text: "Doubts" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Matthew 9:2", explanation: "Spiritual priority." },
  { id: "matthew92", question: "Who questions Jesus' authority?", options: [{ label: "A", text: "Disciples" }, { label: "B", text: "Scribes" }, { label: "C", text: "Crowds" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Matthew 9:3", explanation: "Religious opposition." },
  { id: "matthew93", question: "What proves Jesus' authority?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Healing" }, { label: "C", text: "Genealogy" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Matthew 9:6", explanation: "Visible sign." },
  { id: "matthew94", question: "Who is called from the tax booth?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Matthew" }, { label: "C", text: "Zacchaeus" }, { label: "D", text: "Levi" }], correctAnswer: "B", verse: "Matthew 9:9", explanation: "Author's calling." },
  { id: "matthew95", question: "Who does Jesus eat with?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Tax collectors and sinners" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Matthew 9:10", explanation: "Grace extended." },
  { id: "matthew96", question: "What does Jesus desire?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Mercy" }, { label: "C", text: "Law" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Matthew 9:13", explanation: "Heart over ritual." },
  { id: "matthew97", question: "What metaphor describes disciples?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Harvest workers" }, { label: "C", text: "Kings" }, { label: "D", text: "Builders" }], correctAnswer: "B", verse: "Matthew 9:37", explanation: "Mission field." },
  { id: "matthew98", question: "What is plentiful?", options: [{ label: "A", text: "Teachers" }, { label: "B", text: "Harvest" }, { label: "C", text: "Resources" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Matthew 9:37", explanation: "People ready." },
  { id: "matthew99", question: "What is lacking?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Workers" }, { label: "C", text: "Money" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "Matthew 9:37", explanation: "Need for laborers." },
  { id: "matthew100", question: "What does Jesus instruct to pray for?", options: [{ label: "A", text: "Power" }, { label: "B", text: "More workers" }, { label: "C", text: "Protection" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Matthew 9:38", explanation: "Mission focus." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MatthewTriviaPage() {
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
          .eq("book", "matthew");

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
          book: "matthew",
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
            book: "matthew",
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
    if (score === 10) return "Perfect! You're a Matthew expert!";
    if (score >= 8) return "Excellent! You know Matthew well!";
    if (score >= 6) return "Good job! Keep studying Matthew!";
    if (score >= 4) return "Nice try! Matthew has much to explore!";
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
              href="/bible-trivia/matthew"
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






