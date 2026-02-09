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
  { id: "luke1", question: "Who wrote the Gospel of Luke?", options: [{ label: "A", text: "Matthew" }, { label: "B", text: "Luke" }, { label: "C", text: "Mark" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Luke 1:1-4", explanation: "Luke carefully investigated eyewitness accounts." },
  { id: "luke2", question: "To whom is Luke addressed?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Theophilus" }, { label: "C", text: "Timothy" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "Luke 1:3", explanation: "Luke writes an orderly account." },
  { id: "luke3", question: "Who was a priest in Luke 1?", options: [{ label: "A", text: "Joseph" }, { label: "B", text: "Zechariah" }, { label: "C", text: "Simeon" }, { label: "D", text: "Eli" }], correctAnswer: "B", verse: "Luke 1:5", explanation: "Zechariah served in the temple." },
  { id: "luke4", question: "Who was Zechariah's wife?", options: [{ label: "A", text: "Mary" }, { label: "B", text: "Elizabeth" }, { label: "C", text: "Anna" }, { label: "D", text: "Martha" }], correctAnswer: "B", verse: "Luke 1:5", explanation: "Elizabeth was righteous." },
  { id: "luke5", question: "Why had they no children?", options: [{ label: "A", text: "Choice" }, { label: "B", text: "Elizabeth was barren" }, { label: "C", text: "Separated" }, { label: "D", text: "Illness" }], correctAnswer: "B", verse: "Luke 1:7", explanation: "A long-standing sorrow." },
  { id: "luke6", question: "Who appeared to Zechariah?", options: [{ label: "A", text: "Michael" }, { label: "B", text: "Gabriel" }, { label: "C", text: "Angel of death" }, { label: "D", text: "Elijah" }], correctAnswer: "B", verse: "Luke 1:19", explanation: "Gabriel delivers God's message." },
  { id: "luke7", question: "What child was promised?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "John" }, { label: "C", text: "Samuel" }, { label: "D", text: "Isaac" }], correctAnswer: "B", verse: "Luke 1:13", explanation: "John would prepare the way." },
  { id: "luke8", question: "Why was Zechariah struck mute?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Unbelief" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence vow" }], correctAnswer: "B", verse: "Luke 1:20", explanation: "Doubt delayed speech." },
  { id: "luke9", question: "Who was visited next by Gabriel?", options: [{ label: "A", text: "Elizabeth" }, { label: "B", text: "Mary" }, { label: "C", text: "Anna" }, { label: "D", text: "Martha" }], correctAnswer: "B", verse: "Luke 1:26-27", explanation: "Announcement of Jesus." },
  { id: "luke10", question: "Where did Mary live?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Nazareth" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Capernaum" }], correctAnswer: "B", verse: "Luke 1:26", explanation: "Humble origins." },
  { id: "luke11", question: "What was Mary told her child would be called?", options: [{ label: "A", text: "Immanuel" }, { label: "B", text: "Jesus" }, { label: "C", text: "Messiah" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Luke 1:31", explanation: "Name given by God." },
  { id: "luke12", question: "What did Mary question?", options: [{ label: "A", text: "Purpose" }, { label: "B", text: "How it would happen" }, { label: "C", text: "Timing" }, { label: "D", text: "Location" }], correctAnswer: "B", verse: "Luke 1:34", explanation: "Faith seeks understanding." },
  { id: "luke13", question: "What would overshadow Mary?", options: [{ label: "A", text: "Angel" }, { label: "B", text: "Holy Spirit" }, { label: "C", text: "Cloud" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Luke 1:35", explanation: "Divine conception." },
  { id: "luke14", question: "How did Mary respond?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Submission" }, { label: "C", text: "Doubt" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Luke 1:38", explanation: "Faithful obedience." },
  { id: "luke15", question: "Who did Mary visit?", options: [{ label: "A", text: "Anna" }, { label: "B", text: "Elizabeth" }, { label: "C", text: "Martha" }, { label: "D", text: "Ruth" }], correctAnswer: "B", verse: "Luke 1:39-40", explanation: "Shared faith." },
  { id: "luke16", question: "What happened when Mary greeted Elizabeth?", options: [{ label: "A", text: "Angel appeared" }, { label: "B", text: "Baby leaped" }, { label: "C", text: "Silence" }, { label: "D", text: "Prayer began" }], correctAnswer: "B", verse: "Luke 1:41", explanation: "Spirit-filled response." },
  { id: "luke17", question: "What is Mary's song called?", options: [{ label: "A", text: "Hosanna" }, { label: "B", text: "Magnificat" }, { label: "C", text: "Gloria" }, { label: "D", text: "Benedictus" }], correctAnswer: "B", verse: "Luke 1:46-55", explanation: "Praise to God." },
  { id: "luke18", question: "What did God show the proud?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Scattering" }, { label: "C", text: "Blessing" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Luke 1:51", explanation: "Reversal theme." },
  { id: "luke19", question: "Who was born next?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "John" }, { label: "C", text: "Samuel" }, { label: "D", text: "Isaac" }], correctAnswer: "B", verse: "Luke 1:57", explanation: "Promise fulfilled." },
  { id: "luke20", question: "What name was given to the child?", options: [{ label: "A", text: "Zechariah" }, { label: "B", text: "John" }, { label: "C", text: "Joseph" }, { label: "D", text: "Elijah" }], correctAnswer: "B", verse: "Luke 1:63", explanation: "Obedience restores speech." },
  { id: "luke21", question: "What happened to Zechariah's speech?", options: [{ label: "A", text: "Stayed mute" }, { label: "B", text: "Returned" }, { label: "C", text: "Changed" }, { label: "D", text: "Delayed" }], correctAnswer: "B", verse: "Luke 1:64", explanation: "Faith restored." },
  { id: "luke22", question: "What is Zechariah's prophecy called?", options: [{ label: "A", text: "Magnificat" }, { label: "B", text: "Benedictus" }, { label: "C", text: "Hosanna" }, { label: "D", text: "Gloria" }], correctAnswer: "B", verse: "Luke 1:68-79", explanation: "Prophetic praise." },
  { id: "luke23", question: "Who ruled during Jesus' birth?", options: [{ label: "A", text: "Herod" }, { label: "B", text: "Caesar Augustus" }, { label: "C", text: "Pilate" }, { label: "D", text: "Tiberius" }], correctAnswer: "B", verse: "Luke 2:1", explanation: "Roman census." },
  { id: "luke24", question: "Why did Joseph go to Bethlehem?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Census" }, { label: "C", text: "Work" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "Luke 2:4", explanation: "Obedience to decree." },
  { id: "luke25", question: "Where was Jesus born?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Bethlehem" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Galilee" }], correctAnswer: "B", verse: "Luke 2:7", explanation: "Prophecy fulfilled." },
  { id: "luke26", question: "Where was Jesus laid?", options: [{ label: "A", text: "Crib" }, { label: "B", text: "Manger" }, { label: "C", text: "Bed" }, { label: "D", text: "Altar" }], correctAnswer: "B", verse: "Luke 2:7", explanation: "Humble beginning." },
  { id: "luke27", question: "Who first heard the announcement?", options: [{ label: "A", text: "Magi" }, { label: "B", text: "Shepherds" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Luke 2:8-9", explanation: "Good news for all." },
  { id: "luke28", question: "What did the angels proclaim?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Peace and glory" }, { label: "C", text: "Law" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Luke 2:14", explanation: "Heavenly praise." },
  { id: "luke29", question: "What did the shepherds do?", options: [{ label: "A", text: "Stayed" }, { label: "B", text: "Went to see Jesus" }, { label: "C", text: "Returned home" }, { label: "D", text: "Told priests" }], correctAnswer: "B", verse: "Luke 2:15-16", explanation: "Faith in action." },
  { id: "luke30", question: "What did Mary do with these events?", options: [{ label: "A", text: "Forgot" }, { label: "B", text: "Treasured them" }, { label: "C", text: "Wrote them" }, { label: "D", text: "Shared them" }], correctAnswer: "B", verse: "Luke 2:19", explanation: "Reflective faith." },
  { id: "luke31", question: "When was Jesus circumcised?", options: [{ label: "A", text: "Birth" }, { label: "B", text: "Eight days" }, { label: "C", text: "Twelve days" }, { label: "D", text: "Forty days" }], correctAnswer: "B", verse: "Luke 2:21", explanation: "Obedience to the Law." },
  { id: "luke32", question: "Who recognized Jesus in the temple?", options: [{ label: "A", text: "Nicodemus" }, { label: "B", text: "Simeon" }, { label: "C", text: "Gamaliel" }, { label: "D", text: "Zacharias" }], correctAnswer: "B", verse: "Luke 2:25-26", explanation: "Spirit-led recognition." },
  { id: "luke33", question: "What title did Simeon give Jesus?", options: [{ label: "A", text: "King" }, { label: "B", text: "Light for the Gentiles" }, { label: "C", text: "Prophet" }, { label: "D", text: "Teacher" }], correctAnswer: "B", verse: "Luke 2:32", explanation: "Universal salvation." },
  { id: "luke34", question: "Who else testified about Jesus?", options: [{ label: "A", text: "Mary" }, { label: "B", text: "Anna" }, { label: "C", text: "Elizabeth" }, { label: "D", text: "Martha" }], correctAnswer: "B", verse: "Luke 2:36-38", explanation: "Faithful worshiper." },
  { id: "luke35", question: "Where did Jesus grow up?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Nazareth" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Capernaum" }], correctAnswer: "B", verse: "Luke 2:39-40", explanation: "Humble upbringing." },
  { id: "luke36", question: "How old was Jesus at the temple visit?", options: [{ label: "A", text: "10" }, { label: "B", text: "12" }, { label: "C", text: "15" }, { label: "D", text: "18" }], correctAnswer: "B", verse: "Luke 2:42", explanation: "Coming of age." },
  { id: "luke37", question: "What amazed the teachers?", options: [{ label: "A", text: "His strength" }, { label: "B", text: "His understanding" }, { label: "C", text: "His authority" }, { label: "D", text: "His miracles" }], correctAnswer: "B", verse: "Luke 2:47", explanation: "Wisdom beyond years." },
  { id: "luke38", question: "What did Jesus say about His presence?", options: [{ label: "A", text: "I was lost" }, { label: "B", text: "In My Father's house" }, { label: "C", text: "Teaching" }, { label: "D", text: "Learning" }], correctAnswer: "B", verse: "Luke 2:49", explanation: "Divine awareness." },
  { id: "luke39", question: "How did Jesus grow?", options: [{ label: "A", text: "Only spiritually" }, { label: "B", text: "In wisdom and stature" }, { label: "C", text: "In power" }, { label: "D", text: "In knowledge only" }], correctAnswer: "B", verse: "Luke 2:52", explanation: "Balanced growth." },
  { id: "luke40", question: "Who began preaching in Luke 3?", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Peter" }, { label: "D", text: "Paul" }], correctAnswer: "B", verse: "Luke 3:2-3", explanation: "Call to repentance." },
  { id: "luke41", question: "What did John call the crowd?", options: [{ label: "A", text: "Sheep" }, { label: "B", text: "Brood of vipers" }, { label: "C", text: "Believers" }, { label: "D", text: "Friends" }], correctAnswer: "B", verse: "Luke 3:7", explanation: "Strong warning." },
  { id: "luke42", question: "What fruit was demanded?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Repentance" }, { label: "C", text: "Works" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Luke 3:8", explanation: "Genuine change." },
  { id: "luke43", question: "What should tax collectors do?", options: [{ label: "A", text: "Quit" }, { label: "B", text: "Collect no more than required" }, { label: "C", text: "Give away money" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Luke 3:13", explanation: "Ethical repentance." },
  { id: "luke44", question: "What should soldiers do?", options: [{ label: "A", text: "Leave service" }, { label: "B", text: "Be content" }, { label: "C", text: "Fast" }, { label: "D", text: "Pray" }], correctAnswer: "B", verse: "Luke 3:14", explanation: "Practical obedience." },
  { id: "luke45", question: "Who did John say was coming?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "One mightier" }, { label: "C", text: "King" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Luke 3:16", explanation: "Messianic expectation." },
  { id: "luke46", question: "What would Jesus baptize with?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Holy Spirit and fire" }, { label: "C", text: "Oil" }, { label: "D", text: "Blood" }], correctAnswer: "B", verse: "Luke 3:16", explanation: "Spiritual transformation." },
  { id: "luke47", question: "Who imprisoned John?", options: [{ label: "A", text: "Pilate" }, { label: "B", text: "Herod" }, { label: "C", text: "Caesar" }, { label: "D", text: "Pharisees" }], correctAnswer: "B", verse: "Luke 3:19-20", explanation: "Prophetic cost." },
  { id: "luke48", question: "What happened at Jesus' baptism?", options: [{ label: "A", text: "Fire fell" }, { label: "B", text: "Spirit descended" }, { label: "C", text: "Earth shook" }, { label: "D", text: "Storm calmed" }], correctAnswer: "B", verse: "Luke 3:21-22", explanation: "Divine affirmation." },
  { id: "luke49", question: "What did the voice say?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "You are My beloved Son" }, { label: "C", text: "Follow Him" }, { label: "D", text: "Be holy" }], correctAnswer: "B", verse: "Luke 3:22", explanation: "God's approval." },
  { id: "luke50", question: "How old was Jesus when He began ministry?", options: [{ label: "A", text: "25" }, { label: "B", text: "30" }, { label: "C", text: "33" }, { label: "D", text: "40" }], correctAnswer: "B", verse: "Luke 3:23", explanation: "Priestly age." },
  { id: "luke51", question: "What genealogy does Luke trace?", options: [{ label: "A", text: "To Abraham" }, { label: "B", text: "To Adam" }, { label: "C", text: "To Moses" }, { label: "D", text: "To David only" }], correctAnswer: "B", verse: "Luke 3:38", explanation: "Universal humanity." },
  { id: "luke52", question: "Where was Jesus led after baptism?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Sea" }], correctAnswer: "B", verse: "Luke 4:1", explanation: "Testing begins." },
  { id: "luke53", question: "How long did Jesus fast?", options: [{ label: "A", text: "7 days" }, { label: "B", text: "40 days" }, { label: "C", text: "30 days" }, { label: "D", text: "12 days" }], correctAnswer: "B", verse: "Luke 4:2", explanation: "Period of testing." },
  { id: "luke54", question: "Who tempted Jesus?", options: [{ label: "A", text: "Demons" }, { label: "B", text: "The devil" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Herod" }], correctAnswer: "B", verse: "Luke 4:2", explanation: "Spiritual confrontation." },
  { id: "luke55", question: "What was the first temptation?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Turn stones to bread" }, { label: "C", text: "Jump from temple" }, { label: "D", text: "Worship Satan" }], correctAnswer: "B", verse: "Luke 4:3", explanation: "Physical need tested." },
  { id: "luke56", question: "How did Jesus respond?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Scripture" }, { label: "C", text: "Prayer" }, { label: "D", text: "Angels" }], correctAnswer: "B", verse: "Luke 4:4", explanation: "Word of God." },
  { id: "luke57", question: "What did Satan offer?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Kingdoms" }, { label: "C", text: "Peace" }, { label: "D", text: "Safety" }], correctAnswer: "B", verse: "Luke 4:5-6", explanation: "False shortcut." },
  { id: "luke58", question: "What ended the temptations?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Scripture command" }, { label: "C", text: "Angels" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "Luke 4:12-13", explanation: "Authority asserted." },
  { id: "luke59", question: "Where did Jesus return?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Galilee" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "Luke 4:14", explanation: "Power of the Spirit." },
  { id: "luke60", question: "What was Jesus known for early?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Teaching" }, { label: "C", text: "Debate" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Luke 4:15", explanation: "Public ministry." },
  { id: "luke61", question: "Where did Jesus read Scripture?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Synagogue" }, { label: "C", text: "Home" }, { label: "D", text: "Mountain" }], correctAnswer: "B", verse: "Luke 4:16", explanation: "Sabbath teaching." },
  { id: "luke62", question: "What prophet did Jesus read from?", options: [{ label: "A", text: "Jeremiah" }, { label: "B", text: "Isaiah" }, { label: "C", text: "Ezekiel" }, { label: "D", text: "Daniel" }], correctAnswer: "B", verse: "Luke 4:17", explanation: "Messianic prophecy." },
  { id: "luke63", question: "What did Jesus declare fulfilled?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Scripture" }, { label: "C", text: "Temple" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Luke 4:21", explanation: "Messiah revealed." },
  { id: "luke64", question: "How did people initially respond?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Amazement" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Luke 4:22", explanation: "Grace-filled words." },
  { id: "luke65", question: "What changed their reaction?", options: [{ label: "A", text: "Miracle" }, { label: "B", text: "Familiarity" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Luke 4:23-24", explanation: "Offense at familiarity." },
  { id: "luke66", question: "What did the crowd attempt?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Kill Jesus" }, { label: "C", text: "Arrest Him" }, { label: "D", text: "Question Him" }], correctAnswer: "B", verse: "Luke 4:29", explanation: "Rejection at Nazareth." },
  { id: "luke67", question: "How did Jesus escape?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Passed through crowd" }, { label: "C", text: "Ran" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Luke 4:30", explanation: "Divine protection." },
  { id: "luke68", question: "Where did Jesus teach next?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Capernaum" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "Luke 4:31", explanation: "Galilean ministry." },
  { id: "luke69", question: "What amazed people again?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "Authority" }, { label: "C", text: "Parables" }, { label: "D", text: "Tone" }], correctAnswer: "B", verse: "Luke 4:32", explanation: "Divine authority." },
  { id: "luke70", question: "Who did Jesus cast out?", options: [{ label: "A", text: "Leper" }, { label: "B", text: "Demon" }, { label: "C", text: "Pharisee" }, { label: "D", text: "Soldier" }], correctAnswer: "B", verse: "Luke 4:33-35", explanation: "Spiritual power." },
  { id: "luke71", question: "What did the demon call Jesus?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Holy One of God" }, { label: "C", text: "Prophet" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Luke 4:34", explanation: "True identity known." },
  { id: "luke72", question: "What spread quickly?", options: [{ label: "A", text: "Opposition" }, { label: "B", text: "His fame" }, { label: "C", text: "Fear" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Luke 4:37", explanation: "Growing influence." },
  { id: "luke73", question: "Whose mother-in-law was healed?", options: [{ label: "A", text: "James" }, { label: "B", text: "Simon Peter" }, { label: "C", text: "John" }, { label: "D", text: "Andrew" }], correctAnswer: "B", verse: "Luke 4:38-39", explanation: "Compassion shown." },
  { id: "luke74", question: "When did Jesus heal many?", options: [{ label: "A", text: "Morning" }, { label: "B", text: "At sunset" }, { label: "C", text: "Midday" }, { label: "D", text: "Night" }], correctAnswer: "B", verse: "Luke 4:40", explanation: "Sabbath ended." },
  { id: "luke75", question: "What did demons know?", options: [{ label: "A", text: "Law" }, { label: "B", text: "He was the Christ" }, { label: "C", text: "Timing" }, { label: "D", text: "Future" }], correctAnswer: "B", verse: "Luke 4:41", explanation: "Messianic identity." },
  { id: "luke76", question: "Where did Jesus withdraw to pray?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Solitary place" }, { label: "C", text: "Mountain" }, { label: "D", text: "House" }], correctAnswer: "B", verse: "Luke 4:42", explanation: "Prayer priority." },
  { id: "luke77", question: "Why did Jesus say He was sent?", options: [{ label: "A", text: "Heal" }, { label: "B", text: "Preach the kingdom" }, { label: "C", text: "Judge" }, { label: "D", text: "Rule" }], correctAnswer: "B", verse: "Luke 4:43", explanation: "Mission clarity." },
  { id: "luke78", question: "What miracle followed at the lake?", options: [{ label: "A", text: "Walking on water" }, { label: "B", text: "Huge catch of fish" }, { label: "C", text: "Storm calmed" }, { label: "D", text: "Healing" }], correctAnswer: "B", verse: "Luke 5:6", explanation: "Call of disciples." },
  { id: "luke79", question: "Who felt unworthy?", options: [{ label: "A", text: "James" }, { label: "B", text: "Peter" }, { label: "C", text: "John" }, { label: "D", text: "Andrew" }], correctAnswer: "B", verse: "Luke 5:8", explanation: "Conviction." },
  { id: "luke80", question: "What did Jesus say Peter would become?", options: [{ label: "A", text: "Leader" }, { label: "B", text: "Catcher of people" }, { label: "C", text: "Teacher" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "Luke 5:10", explanation: "New mission." },
  { id: "luke81", question: "What did they leave behind?", options: [{ label: "A", text: "Families" }, { label: "B", text: "Everything" }, { label: "C", text: "Boats" }, { label: "D", text: "Homes" }], correctAnswer: "B", verse: "Luke 5:11", explanation: "Total commitment." },
  { id: "luke82", question: "Who did Jesus heal next?", options: [{ label: "A", text: "Blind man" }, { label: "B", text: "Leper" }, { label: "C", text: "Child" }, { label: "D", text: "Woman" }], correctAnswer: "B", verse: "Luke 5:12-13", explanation: "Compassion breaks barriers." },
  { id: "luke83", question: "What did Jesus often do?", options: [{ label: "A", text: "Teach" }, { label: "B", text: "Withdraw to pray" }, { label: "C", text: "Travel" }, { label: "D", text: "Heal" }], correctAnswer: "B", verse: "Luke 5:16", explanation: "Prayer rhythm." },
  { id: "luke84", question: "What was lowered through the roof?", options: [{ label: "A", text: "Child" }, { label: "B", text: "Paralyzed man" }, { label: "C", text: "Bed" }, { label: "D", text: "Offering" }], correctAnswer: "B", verse: "Luke 5:18-19", explanation: "Faith persistence." },
  { id: "luke85", question: "What did Jesus forgive first?", options: [{ label: "A", text: "Pain" }, { label: "B", text: "Sins" }, { label: "C", text: "Fear" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "Luke 5:20", explanation: "Spiritual priority." },
  { id: "luke86", question: "Who questioned Jesus?", options: [{ label: "A", text: "Crowds" }, { label: "B", text: "Pharisees and teachers" }, { label: "C", text: "Romans" }, { label: "D", text: "Disciples" }], correctAnswer: "B", verse: "Luke 5:21", explanation: "Religious opposition." },
  { id: "luke87", question: "What proved Jesus' authority?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Healing" }, { label: "C", text: "Prayer" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Luke 5:24-25", explanation: "Visible sign." },
  { id: "luke88", question: "Who was called next?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Levi" }, { label: "C", text: "Zacchaeus" }, { label: "D", text: "Matthew" }], correctAnswer: "B", verse: "Luke 5:27", explanation: "Grace for outcasts." },
  { id: "luke89", question: "What did Levi do?", options: [{ label: "A", text: "Delayed" }, { label: "B", text: "Left everything" }, { label: "C", text: "Questioned" }, { label: "D", text: "Refused" }], correctAnswer: "B", verse: "Luke 5:28", explanation: "Immediate obedience." },
  { id: "luke90", question: "Who did Jesus eat with?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Tax collectors and sinners" }, { label: "C", text: "Romans" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Luke 5:29-30", explanation: "Mission to the lost." },
  { id: "luke91", question: "What metaphor did Jesus use?", options: [{ label: "A", text: "Shepherd" }, { label: "B", text: "Physician" }, { label: "C", text: "Farmer" }, { label: "D", text: "Builder" }], correctAnswer: "B", verse: "Luke 5:31", explanation: "Healing sinners." },
  { id: "luke92", question: "What practice was questioned?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Fasting" }, { label: "C", text: "Giving" }, { label: "D", text: "Sabbath" }], correctAnswer: "B", verse: "Luke 5:33", explanation: "New covenant teaching." },
  { id: "luke93", question: "What image did Jesus use?", options: [{ label: "A", text: "Harvest" }, { label: "B", text: "Bridegroom" }, { label: "C", text: "Temple" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Luke 5:34", explanation: "Joy in His presence." },
  { id: "luke94", question: "What cannot be patched?", options: [{ label: "A", text: "Old garment" }, { label: "B", text: "New with old" }, { label: "C", text: "Law" }, { label: "D", text: "Heart" }], correctAnswer: "B", verse: "Luke 5:36", explanation: "New covenant." },
  { id: "luke95", question: "What cannot hold new wine?", options: [{ label: "A", text: "Cup" }, { label: "B", text: "Old wineskins" }, { label: "C", text: "Jar" }, { label: "D", text: "Skin" }], correctAnswer: "B", verse: "Luke 5:37", explanation: "Transformation needed." },
  { id: "luke96", question: "What is better, according to some?", options: [{ label: "A", text: "New wine" }, { label: "B", text: "Old wine" }, { label: "C", text: "Water" }, { label: "D", text: "Oil" }], correctAnswer: "B", verse: "Luke 5:39", explanation: "Resistance to change." },
  { id: "luke97", question: "What day caused controversy next?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Sabbath" }, { label: "C", text: "Fast day" }, { label: "D", text: "Passover" }], correctAnswer: "B", verse: "Luke 6:1", explanation: "Law interpretation." },
  { id: "luke98", question: "What did disciples do?", options: [{ label: "A", text: "Heal" }, { label: "B", text: "Pick grain" }, { label: "C", text: "Travel" }, { label: "D", text: "Teach" }], correctAnswer: "B", verse: "Luke 6:1", explanation: "Accusation arises." },
  { id: "luke99", question: "Who is Lord of the Sabbath?", options: [{ label: "A", text: "David" }, { label: "B", text: "Son of Man" }, { label: "C", text: "Moses" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Luke 6:5", explanation: "Jesus' authority." },
  { id: "luke100", question: "What theme dominates Luke?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Compassion and salvation for all" }, { label: "C", text: "Law" }, { label: "D", text: "Conflict" }], correctAnswer: "B", verse: "Luke", explanation: "Good news for everyone." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function LukeTriviaPage() {
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
          .eq("book", "luke");

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
          book: "luke",
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
            book: "luke",
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
    if (score === 10) return "Perfect! You're a Luke expert!";
    if (score >= 8) return "Excellent! You know Luke well!";
    if (score >= 6) return "Good job! Keep studying Luke!";
    if (score >= 4) return "Nice try! Luke has much to explore!";
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
              href="/bible-trivia/luke"
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

