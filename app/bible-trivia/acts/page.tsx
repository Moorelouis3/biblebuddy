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
  { id: "acts1", question: "Who wrote the book of Acts?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Luke" }, { label: "C", text: "Peter" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Acts 1:1", explanation: "Acts continues Luke's Gospel." },
  { id: "acts2", question: "To whom is Acts addressed?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Theophilus" }, { label: "C", text: "Peter" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "Acts 1:1", explanation: "Same recipient as Luke." },
  { id: "acts3", question: "What did Jesus promise before ascending?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Power from the Holy Spirit" }, { label: "C", text: "Judgment" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Acts 1:8", explanation: "Empowerment for mission." },
  { id: "acts4", question: "Where were the disciples told to wait?", options: [{ label: "A", text: "Galilee" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "Acts 1:4", explanation: "Promise fulfilled there." },
  { id: "acts5", question: "What happened to Jesus?", options: [{ label: "A", text: "He disappeared" }, { label: "B", text: "He ascended" }, { label: "C", text: "He rested" }, { label: "D", text: "He traveled" }], correctAnswer: "B", verse: "Acts 1:9", explanation: "Ascension witnessed." },
  { id: "acts6", question: "How many apostles were present?", options: [{ label: "A", text: "10" }, { label: "B", text: "11" }, { label: "C", text: "12" }, { label: "D", text: "70" }], correctAnswer: "B", verse: "Acts 1:13", explanation: "Judas absent." },
  { id: "acts7", question: "Who needed replacing?", options: [{ label: "A", text: "James" }, { label: "B", text: "Judas" }, { label: "C", text: "Peter" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Acts 1:16-17", explanation: "Apostolic role vacant." },
  { id: "acts8", question: "How was Matthias chosen?", options: [{ label: "A", text: "Vote" }, { label: "B", text: "Casting lots" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Appointment" }], correctAnswer: "B", verse: "Acts 1:26", explanation: "God's choice sought." },
  { id: "acts9", question: "What feast was occurring in Acts 2?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "Pentecost" }, { label: "C", text: "Tabernacles" }, { label: "D", text: "Purim" }], correctAnswer: "B", verse: "Acts 2:1", explanation: "Jewish feast day." },
  { id: "acts10", question: "What appeared on the disciples?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Tongues of fire" }, { label: "C", text: "Clouds" }, { label: "D", text: "Wind only" }], correctAnswer: "B", verse: "Acts 2:3", explanation: "Spirit manifestation." },
  { id: "acts11", question: "What filled the house?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Wind" }, { label: "C", text: "Smoke" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Acts 2:2", explanation: "Powerful sign." },
  { id: "acts12", question: "What happened to the disciples?", options: [{ label: "A", text: "They slept" }, { label: "B", text: "They spoke other languages" }, { label: "C", text: "They fled" }, { label: "D", text: "They prayed" }], correctAnswer: "B", verse: "Acts 2:4", explanation: "Gift of tongues." },
  { id: "acts13", question: "Who heard the message?", options: [{ label: "A", text: "Only Jews" }, { label: "B", text: "People from many nations" }, { label: "C", text: "Romans" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Acts 2:5-11", explanation: "Global audience." },
  { id: "acts14", question: "What did some accuse them of?", options: [{ label: "A", text: "Blasphemy" }, { label: "B", text: "Being drunk" }, { label: "C", text: "Madness" }, { label: "D", text: "Sorcery" }], correctAnswer: "B", verse: "Acts 2:13", explanation: "Misinterpretation." },
  { id: "acts15", question: "Who preached first?", options: [{ label: "A", text: "John" }, { label: "B", text: "Peter" }, { label: "C", text: "James" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Acts 2:14", explanation: "Leadership shown." },
  { id: "acts16", question: "Which prophet did Peter quote?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Joel" }, { label: "C", text: "Jeremiah" }, { label: "D", text: "Ezekiel" }], correctAnswer: "B", verse: "Acts 2:16", explanation: "Prophecy fulfilled." },
  { id: "acts17", question: "Who did Peter proclaim?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Jesus" }, { label: "C", text: "David" }, { label: "D", text: "Abraham" }], correctAnswer: "B", verse: "Acts 2:22", explanation: "Christ-centered message." },
  { id: "acts18", question: "What did God do to Jesus?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Raise Him from the dead" }, { label: "C", text: "Exalt Him" }, { label: "D", text: "Test Him" }], correctAnswer: "B", verse: "Acts 2:24", explanation: "Resurrection." },
  { id: "acts19", question: "Who did Peter say they crucified?", options: [{ label: "A", text: "A prophet" }, { label: "B", text: "The Messiah" }, { label: "C", text: "A criminal" }, { label: "D", text: "A teacher" }], correctAnswer: "B", verse: "Acts 2:36", explanation: "Conviction message." },
  { id: "acts20", question: "What question did the crowd ask?", options: [{ label: "A", text: "Who are you?" }, { label: "B", text: "What shall we do?" }, { label: "C", text: "Why?" }, { label: "D", text: "Where?" }], correctAnswer: "B", verse: "Acts 2:37", explanation: "Repentance response." },
  { id: "acts21", question: "What did Peter command?", options: [{ label: "A", text: "Fast" }, { label: "B", text: "Repent and be baptized" }, { label: "C", text: "Pray" }, { label: "D", text: "Give money" }], correctAnswer: "B", verse: "Acts 2:38", explanation: "Salvation response." },
  { id: "acts22", question: "What gift was promised?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Peace" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Acts 2:38", explanation: "Spirit for believers." },
  { id: "acts23", question: "Who was the promise for?", options: [{ label: "A", text: "Jews only" }, { label: "B", text: "All who are far off" }, { label: "C", text: "Priests" }, { label: "D", text: "Apostles" }], correctAnswer: "B", verse: "Acts 2:39", explanation: "Inclusive gospel." },
  { id: "acts24", question: "How many were added?", options: [{ label: "A", text: "500" }, { label: "B", text: "3,000" }, { label: "C", text: "1,000" }, { label: "D", text: "5,000" }], correctAnswer: "B", verse: "Acts 2:41", explanation: "Church growth." },
  { id: "acts25", question: "What did believers devote themselves to?", options: [{ label: "A", text: "Prayer only" }, { label: "B", text: "Teaching, fellowship, breaking bread, prayer" }, { label: "C", text: "Worship" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Acts 2:42", explanation: "Early church life." },
  { id: "acts26", question: "What characterized the church?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Unity" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Acts 2:44", explanation: "Shared life." },
  { id: "acts27", question: "What did they share?", options: [{ label: "A", text: "Food only" }, { label: "B", text: "Possessions" }, { label: "C", text: "Money" }, { label: "D", text: "Homes" }], correctAnswer: "B", verse: "Acts 2:45", explanation: "Generosity." },
  { id: "acts28", question: "Where did they meet?", options: [{ label: "A", text: "Temple and homes" }, { label: "B", text: "Only temple" }, { label: "C", text: "Only homes" }, { label: "D", text: "Synagogues" }], correctAnswer: "A", verse: "Acts 2:46", explanation: "Public and private worship." },
  { id: "acts29", question: "What attitude did they have?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Joy" }, { label: "C", text: "Anger" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Acts 2:46-47", explanation: "Joyful faith." },
  { id: "acts30", question: "Who added to their number?", options: [{ label: "A", text: "Apostles" }, { label: "B", text: "The Lord" }, { label: "C", text: "Crowds" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Acts 2:47", explanation: "God gives growth." },
  { id: "acts31", question: "Who went to the temple to pray?", options: [{ label: "A", text: "James and John" }, { label: "B", text: "Peter and John" }, { label: "C", text: "Paul and Barnabas" }, { label: "D", text: "Stephen and Philip" }], correctAnswer: "B", verse: "Acts 3:1", explanation: "Apostolic ministry." },
  { id: "acts32", question: "Who was at the gate?", options: [{ label: "A", text: "Blind man" }, { label: "B", text: "Lame man" }, { label: "C", text: "Leper" }, { label: "D", text: "Beggar" }], correctAnswer: "B", verse: "Acts 3:2", explanation: "Daily suffering." },
  { id: "acts33", question: "Which gate?", options: [{ label: "A", text: "East" }, { label: "B", text: "Beautiful" }, { label: "C", text: "Golden" }, { label: "D", text: "Inner" }], correctAnswer: "B", verse: "Acts 3:2", explanation: "Temple gate." },
  { id: "acts34", question: "What did Peter say he lacked?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Silver and gold" }, { label: "C", text: "Power" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Acts 3:6", explanation: "True riches." },
  { id: "acts35", question: "In whose name was healing given?", options: [{ label: "A", text: "God" }, { label: "B", text: "Jesus Christ" }, { label: "C", text: "Peter" }, { label: "D", text: "Holy Spirit" }], correctAnswer: "B", verse: "Acts 3:6", explanation: "Authority of Jesus." },
  { id: "acts36", question: "What did the man do?", options: [{ label: "A", text: "Walked slowly" }, { label: "B", text: "Leaped and praised God" }, { label: "C", text: "Cried" }, { label: "D", text: "Ran home" }], correctAnswer: "B", verse: "Acts 3:8", explanation: "Visible miracle." },
  { id: "acts37", question: "Where did the crowd gather?", options: [{ label: "A", text: "Courtyard" }, { label: "B", text: "Solomon's Portico" }, { label: "C", text: "Gate" }, { label: "D", text: "Synagogue" }], correctAnswer: "B", verse: "Acts 3:11", explanation: "Public attention." },
  { id: "acts38", question: "Who did Peter say healed the man?", options: [{ label: "A", text: "God of Abraham" }, { label: "B", text: "Jesus" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Acts 3:16", explanation: "Faith in Jesus' name." },
  { id: "acts39", question: "What did Peter call Jesus?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "Author of life" }, { label: "C", text: "Teacher" }, { label: "D", text: "Rabbi" }], correctAnswer: "B", verse: "Acts 3:15", explanation: "Divine role." },
  { id: "acts40", question: "What did Peter urge them to do?", options: [{ label: "A", text: "Believe only" }, { label: "B", text: "Repent" }, { label: "C", text: "Pray" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Acts 3:19", explanation: "Call to repentance." },
  { id: "acts41", question: "What would repentance bring?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Refreshing" }, { label: "C", text: "Healing" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Acts 3:19", explanation: "Spiritual renewal." },
  { id: "acts42", question: "Who did Moses predict?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "A prophet like him" }, { label: "C", text: "Messiah" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Acts 3:22", explanation: "Jesus foretold." },
  { id: "acts43", question: "Who were arrested?", options: [{ label: "A", text: "Peter and John" }, { label: "B", text: "All apostles" }, { label: "C", text: "Stephen" }, { label: "D", text: "Paul" }], correctAnswer: "A", verse: "Acts 4:3", explanation: "Opposition begins." },
  { id: "acts44", question: "Why were they arrested?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Teaching resurrection" }, { label: "C", text: "Temple disruption" }, { label: "D", text: "Blasphemy" }], correctAnswer: "B", verse: "Acts 4:2", explanation: "Resurrection message." },
  { id: "acts45", question: "How many believed now?", options: [{ label: "A", text: "3000" }, { label: "B", text: "5000" }, { label: "C", text: "7000" }, { label: "D", text: "10000" }], correctAnswer: "B", verse: "Acts 4:4", explanation: "Continued growth." },
  { id: "acts46", question: "Who questioned them?", options: [{ label: "A", text: "Pilate" }, { label: "B", text: "Rulers and elders" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Acts 4:5-6", explanation: "Religious authority." },
  { id: "acts47", question: "By what power was the man healed?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Name of Jesus" }, { label: "C", text: "Prayer" }, { label: "D", text: "Holy Spirit" }], correctAnswer: "B", verse: "Acts 4:10", explanation: "Jesus' authority." },
  { id: "acts48", question: "What did leaders notice?", options: [{ label: "A", text: "Education" }, { label: "B", text: "Boldness" }, { label: "C", text: "Fear" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Acts 4:13", explanation: "Spirit-filled courage." },
  { id: "acts49", question: "What amazed them?", options: [{ label: "A", text: "Miracle" }, { label: "B", text: "They had been with Jesus" }, { label: "C", text: "Numbers" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Acts 4:13", explanation: "Transformation." },
  { id: "acts50", question: "What command was given?", options: [{ label: "A", text: "Stop healing" }, { label: "B", text: "Stop speaking in Jesus' name" }, { label: "C", text: "Leave Jerusalem" }, { label: "D", text: "Submit" }], correctAnswer: "B", verse: "Acts 4:18", explanation: "Attempted suppression." },
  { id: "acts51", question: "What was their response?", options: [{ label: "A", text: "Obey" }, { label: "B", text: "We must obey God" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Flee" }], correctAnswer: "B", verse: "Acts 4:19-20", explanation: "God over men." },
  { id: "acts52", question: "What did they pray for?", options: [{ label: "A", text: "Safety" }, { label: "B", text: "Boldness" }, { label: "C", text: "Deliverance" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Acts 4:29", explanation: "Courage in witness." },
  { id: "acts53", question: "What shook the place?", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Earthquake" }, { label: "C", text: "Fire" }, { label: "D", text: "Voices" }], correctAnswer: "B", verse: "Acts 4:31", explanation: "God's response." },
  { id: "acts54", question: "What filled them again?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Fear" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Acts 4:31", explanation: "Continual empowerment." },
  { id: "acts55", question: "How did believers live?", options: [{ label: "A", text: "Separately" }, { label: "B", text: "One heart and mind" }, { label: "C", text: "Secretly" }, { label: "D", text: "Quietly" }], correctAnswer: "B", verse: "Acts 4:32", explanation: "Unity." },
  { id: "acts56", question: "Who sold land?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Barnabas" }, { label: "C", text: "Stephen" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "Acts 4:36-37", explanation: "Generosity." },
  { id: "acts57", question: "What was Barnabas' name meaning?", options: [{ label: "A", text: "Son of power" }, { label: "B", text: "Son of encouragement" }, { label: "C", text: "Son of faith" }, { label: "D", text: "Son of peace" }], correctAnswer: "B", verse: "Acts 4:36", explanation: "Character shown." },
  { id: "acts58", question: "Who lied to the apostles?", options: [{ label: "A", text: "Simon" }, { label: "B", text: "Ananias" }, { label: "C", text: "Stephen" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "Acts 5:1-2", explanation: "Deception." },
  { id: "acts59", question: "Who was his wife?", options: [{ label: "A", text: "Mary" }, { label: "B", text: "Sapphira" }, { label: "C", text: "Anna" }, { label: "D", text: "Martha" }], correctAnswer: "B", verse: "Acts 5:1", explanation: "Shared lie." },
  { id: "acts60", question: "Who did they lie to?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Church" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Acts 5:3", explanation: "Sin against God." },
  { id: "acts61", question: "What happened to Ananias?", options: [{ label: "A", text: "He repented" }, { label: "B", text: "He died" }, { label: "C", text: "He fled" }, { label: "D", text: "He was forgiven" }], correctAnswer: "B", verse: "Acts 5:5", explanation: "Immediate judgment." },
  { id: "acts62", question: "What happened to Sapphira?", options: [{ label: "A", text: "She repented" }, { label: "B", text: "She died" }, { label: "C", text: "She confessed" }, { label: "D", text: "She fled" }], correctAnswer: "B", verse: "Acts 5:10", explanation: "Serious holiness." },
  { id: "acts63", question: "What filled the church?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fear" }, { label: "C", text: "Anger" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Acts 5:11", explanation: "Reverence for God." },
  { id: "acts64", question: "Where did signs occur?", options: [{ label: "A", text: "Homes" }, { label: "B", text: "Solomon's Portico" }, { label: "C", text: "Synagogues" }, { label: "D", text: "Market" }], correctAnswer: "B", verse: "Acts 5:12", explanation: "Public witness." },
  { id: "acts65", question: "What happened to the sick?", options: [{ label: "A", text: "Some healed" }, { label: "B", text: "All were healed" }, { label: "C", text: "Few healed" }, { label: "D", text: "None healed" }], correctAnswer: "B", verse: "Acts 5:16", explanation: "God's power." },
  { id: "acts66", question: "Who arrested the apostles again?", options: [{ label: "A", text: "Romans" }, { label: "B", text: "High priest" }, { label: "C", text: "Sadducees" }, { label: "D", text: "Pharisees" }], correctAnswer: "C", verse: "Acts 5:17-18", explanation: "Jealous opposition." },
  { id: "acts67", question: "Who freed them?", options: [{ label: "A", text: "Crowd" }, { label: "B", text: "Angel of the Lord" }, { label: "C", text: "Peter" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Acts 5:19", explanation: "Divine rescue." },
  { id: "acts68", question: "What were they told to do?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Preach" }, { label: "C", text: "Leave city" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "Acts 5:20", explanation: "Continue mission." },
  { id: "acts69", question: "Who advised restraint?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Gamaliel" }, { label: "C", text: "Caiaphas" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Acts 5:34", explanation: "Wise counsel." },
  { id: "acts70", question: "What warning did Gamaliel give?", options: [{ label: "A", text: "Punish them" }, { label: "B", text: "Don't fight God" }, { label: "C", text: "Imprison them" }, { label: "D", text: "Exile them" }], correctAnswer: "B", verse: "Acts 5:39", explanation: "God's sovereignty." },
  { id: "acts71", question: "What punishment followed?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Beating" }, { label: "C", text: "Exile" }, { label: "D", text: "Fines" }], correctAnswer: "B", verse: "Acts 5:40", explanation: "Suffering endured." },
  { id: "acts72", question: "How did apostles respond?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Rejoicing" }, { label: "C", text: "Silence" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Acts 5:41", explanation: "Joy in suffering." },
  { id: "acts73", question: "What continued daily?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Teaching Jesus" }, { label: "C", text: "Healing" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Acts 5:42", explanation: "Faithfulness." },
  { id: "acts74", question: "What problem arose in Acts 6?", options: [{ label: "A", text: "False teaching" }, { label: "B", text: "Food distribution" }, { label: "C", text: "Persecution" }, { label: "D", text: "Division" }], correctAnswer: "B", verse: "Acts 6:1", explanation: "Practical issue." },
  { id: "acts75", question: "Who were overlooked?", options: [{ label: "A", text: "Jews" }, { label: "B", text: "Greek widows" }, { label: "C", text: "Poor" }, { label: "D", text: "Orphans" }], correctAnswer: "B", verse: "Acts 6:1", explanation: "Cultural tension." },
  { id: "acts76", question: "What solution was chosen?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Choose seven men" }, { label: "C", text: "New rules" }, { label: "D", text: "Rebuke" }], correctAnswer: "B", verse: "Acts 6:3", explanation: "Delegation." },
  { id: "acts77", question: "What qualities were required?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Full of Spirit and wisdom" }, { label: "C", text: "Education" }, { label: "D", text: "Age" }], correctAnswer: "B", verse: "Acts 6:3", explanation: "Character matters." },
  { id: "acts78", question: "Who was one of the seven?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Stephen" }, { label: "C", text: "Barnabas" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "Acts 6:5", explanation: "Key figure." },
  { id: "acts79", question: "What happened to the word of God?", options: [{ label: "A", text: "Slowed" }, { label: "B", text: "Spread" }, { label: "C", text: "Stopped" }, { label: "D", text: "Changed" }], correctAnswer: "B", verse: "Acts 6:7", explanation: "Growth continues." },
  { id: "acts80", question: "Who opposed Stephen?", options: [{ label: "A", text: "Romans" }, { label: "B", text: "Synagogue leaders" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Sadducees" }], correctAnswer: "B", verse: "Acts 6:9", explanation: "Resistance." },
  { id: "acts81", question: "What could they not withstand?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom and Spirit" }, { label: "C", text: "Signs" }, { label: "D", text: "Teaching" }], correctAnswer: "B", verse: "Acts 6:10", explanation: "Spirit-led speech." },
  { id: "acts82", question: "What accusation was made?", options: [{ label: "A", text: "Blasphemy" }, { label: "B", text: "False teaching" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Witchcraft" }], correctAnswer: "A", verse: "Acts 6:11", explanation: "False charges." },
  { id: "acts83", question: "Where was Stephen brought?", options: [{ label: "A", text: "Prison" }, { label: "B", text: "Sanhedrin" }, { label: "C", text: "Temple" }, { label: "D", text: "Court" }], correctAnswer: "B", verse: "Acts 6:12", explanation: "Trial begins." },
  { id: "acts84", question: "What did his face look like?", options: [{ label: "A", text: "Angry" }, { label: "B", text: "Face of an angel" }, { label: "C", text: "Fearful" }, { label: "D", text: "Shining" }], correctAnswer: "B", verse: "Acts 6:15", explanation: "God's presence." },
  { id: "acts85", question: "Who gave the longest speech in Acts?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Stephen" }, { label: "C", text: "Paul" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "Acts 7", explanation: "Historical defense." },
  { id: "acts86", question: "Who did Stephen accuse?", options: [{ label: "A", text: "Romans" }, { label: "B", text: "Israel's leaders" }, { label: "C", text: "Gentiles" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Acts 7:51", explanation: "Heart conviction." },
  { id: "acts87", question: "What did Stephen see?", options: [{ label: "A", text: "Angel" }, { label: "B", text: "Jesus standing" }, { label: "C", text: "Heaven closed" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Acts 7:56", explanation: "Heavenly vision." },
  { id: "acts88", question: "How did Stephen die?", options: [{ label: "A", text: "Beheading" }, { label: "B", text: "Stoning" }, { label: "C", text: "Crucifixion" }, { label: "D", text: "Burning" }], correctAnswer: "B", verse: "Acts 7:58-59", explanation: "First martyr." },
  { id: "acts89", question: "Who approved his death?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Saul" }, { label: "C", text: "Herod" }, { label: "D", text: "Pilate" }], correctAnswer: "B", verse: "Acts 8:1", explanation: "Future apostle." },
  { id: "acts90", question: "What followed Stephen's death?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Great persecution" }, { label: "C", text: "Silence" }, { label: "D", text: "Revival" }], correctAnswer: "B", verse: "Acts 8:1", explanation: "Church scattered." },
  { id: "acts91", question: "Where did believers go?", options: [{ label: "A", text: "Rome" }, { label: "B", text: "Judea and Samaria" }, { label: "C", text: "Galilee" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Acts 8:1", explanation: "Mission expands." },
  { id: "acts92", question: "Who preached in Samaria?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Philip" }, { label: "C", text: "John" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Acts 8:5", explanation: "Evangelism continues." },
  { id: "acts93", question: "What accompanied preaching?", options: [{ label: "A", text: "Signs" }, { label: "B", text: "Miracles" }, { label: "C", text: "Both" }, { label: "D", text: "None" }], correctAnswer: "C", verse: "Acts 8:6-7", explanation: "Powerful witness." },
  { id: "acts94", question: "Who practiced sorcery?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "Simon" }, { label: "C", text: "Philip" }, { label: "D", text: "Stephen" }], correctAnswer: "B", verse: "Acts 8:9", explanation: "False power." },
  { id: "acts95", question: "What did Simon want?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Holy Spirit power" }, { label: "C", text: "Authority" }, { label: "D", text: "Money" }], correctAnswer: "B", verse: "Acts 8:18-19", explanation: "Wrong motives." },
  { id: "acts96", question: "What did Peter say to Simon?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Your money perish" }, { label: "C", text: "Leave" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "Acts 8:20", explanation: "God's gift not for sale." },
  { id: "acts97", question: "Who was Philip sent to?", options: [{ label: "A", text: "Roman" }, { label: "B", text: "Ethiopian eunuch" }, { label: "C", text: "Jew" }, { label: "D", text: "Samaritan" }], correctAnswer: "B", verse: "Acts 8:26-27", explanation: "Divine appointment." },
  { id: "acts98", question: "What was he reading?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Isaiah" }, { label: "C", text: "Psalms" }, { label: "D", text: "Genesis" }], correctAnswer: "B", verse: "Acts 8:28", explanation: "Messianic prophecy." },
  { id: "acts99", question: "What did Philip explain?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Jesus" }, { label: "C", text: "Law" }, { label: "D", text: "History" }], correctAnswer: "B", verse: "Acts 8:35", explanation: "Gospel clarity." },
  { id: "acts100", question: "What happened after baptism?", options: [{ label: "A", text: "Philip stayed" }, { label: "B", text: "Philip was taken away" }, { label: "C", text: "Eunuch preached" }, { label: "D", text: "Crowd gathered" }], correctAnswer: "B", verse: "Acts 8:39-40", explanation: "Spirit-led movement." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ActsTriviaPage() {
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
          .eq("book", "acts");

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
          book: "acts",
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
            book: "acts",
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
    if (score === 10) return "Perfect! You're an Acts expert!";
    if (score >= 8) return "Excellent! You know Acts well!";
    if (score >= 6) return "Good job! Keep studying Acts!";
    if (score >= 4) return "Nice try! Acts has much to explore!";
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
              href="/bible-trivia/acts"
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

