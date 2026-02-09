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
  { id: "mark1", question: "Who is traditionally credited as the author of the Gospel of Mark?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Mark" }, { label: "C", text: "Luke" }, { label: "D", text: "Matthew" }], correctAnswer: "B", verse: "Mark 1:1", explanation: "John Mark is traditionally recognized as the author." },
  { id: "mark2", question: "How does Mark describe Jesus in the opening verse?", options: [{ label: "A", text: "Son of David" }, { label: "B", text: "Son of God" }, { label: "C", text: "Teacher" }, { label: "D", text: "Messiah only" }], correctAnswer: "B", verse: "Mark 1:1", explanation: "Mark emphasizes Jesus' divine identity." },
  { id: "mark3", question: "Who prepares the way for the Lord?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Moses" }], correctAnswer: "B", verse: "Mark 1:2-4", explanation: "John fulfills prophetic preparation." },
  { id: "mark4", question: "Where did John the Baptist preach?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Synagogues" }, { label: "D", text: "Cities" }], correctAnswer: "B", verse: "Mark 1:4", explanation: "A place of repentance." },
  { id: "mark5", question: "What did John preach?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Repentance" }, { label: "C", text: "Love" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Mark 1:4", explanation: "Preparation for forgiveness." },
  { id: "mark6", question: "What did John wear?", options: [{ label: "A", text: "Linen robes" }, { label: "B", text: "Camel's hair" }, { label: "C", text: "Priestly garments" }, { label: "D", text: "Royal clothing" }], correctAnswer: "B", verse: "Mark 1:6", explanation: "Prophetic appearance." },
  { id: "mark7", question: "What did John eat?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Locusts and honey" }, { label: "C", text: "Fruit" }, { label: "D", text: "Fish" }], correctAnswer: "B", verse: "Mark 1:6", explanation: "Simple lifestyle." },
  { id: "mark8", question: "Who did John say was greater than him?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Jesus" }, { label: "C", text: "Moses" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Mark 1:7", explanation: "John points to Christ." },
  { id: "mark9", question: "What did John say Jesus would baptize with?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Fire" }, { label: "C", text: "The Holy Spirit" }, { label: "D", text: "Oil" }], correctAnswer: "C", verse: "Mark 1:8", explanation: "Spiritual baptism." },
  { id: "mark10", question: "Where was Jesus baptized?", options: [{ label: "A", text: "Sea of Galilee" }, { label: "B", text: "Jordan River" }, { label: "C", text: "Temple pool" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "Mark 1:9", explanation: "Public identification." },
  { id: "mark11", question: "What happened when Jesus was baptized?", options: [{ label: "A", text: "Fire descended" }, { label: "B", text: "Heaven opened" }, { label: "C", text: "Earth shook" }, { label: "D", text: "Angels sang" }], correctAnswer: "B", verse: "Mark 1:10", explanation: "Divine affirmation." },
  { id: "mark12", question: "What descended on Jesus?", options: [{ label: "A", text: "Angel" }, { label: "B", text: "Holy Spirit like a dove" }, { label: "C", text: "Fire" }, { label: "D", text: "Cloud" }], correctAnswer: "B", verse: "Mark 1:10", explanation: "Spirit's presence." },
  { id: "mark13", question: "What did the voice from heaven say?", options: [{ label: "A", text: "Fear not" }, { label: "B", text: "You are My beloved Son" }, { label: "C", text: "This is the King" }, { label: "D", text: "Follow Him" }], correctAnswer: "B", verse: "Mark 1:11", explanation: "God affirms Jesus." },
  { id: "mark14", question: "Where was Jesus sent after baptism?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Wilderness" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Sea" }], correctAnswer: "B", verse: "Mark 1:12", explanation: "Testing begins." },
  { id: "mark15", question: "Who drove Jesus into the wilderness?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The Spirit" }, { label: "C", text: "John" }, { label: "D", text: "Disciples" }], correctAnswer: "B", verse: "Mark 1:12", explanation: "Spirit-led testing." },
  { id: "mark16", question: "How long was Jesus tempted?", options: [{ label: "A", text: "30 days" }, { label: "B", text: "40 days" }, { label: "C", text: "7 days" }, { label: "D", text: "12 days" }], correctAnswer: "B", verse: "Mark 1:13", explanation: "Biblical testing period." },
  { id: "mark17", question: "Who tempted Jesus?", options: [{ label: "A", text: "Pharisees" }, { label: "B", text: "Satan" }, { label: "C", text: "Herod" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Mark 1:13", explanation: "Spiritual confrontation." },
  { id: "mark18", question: "Who ministered to Jesus?", options: [{ label: "A", text: "Disciples" }, { label: "B", text: "Angels" }, { label: "C", text: "Crowds" }, { label: "D", text: "John" }], correctAnswer: "B", verse: "Mark 1:13", explanation: "Divine care." },
  { id: "mark19", question: "Where did Jesus begin preaching?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Galilee" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Bethlehem" }], correctAnswer: "B", verse: "Mark 1:14", explanation: "Mission begins." },
  { id: "mark20", question: "What message did Jesus preach?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Repent and believe the gospel" }, { label: "C", text: "Follow Me" }, { label: "D", text: "Fear God" }], correctAnswer: "B", verse: "Mark 1:15", explanation: "Kingdom proclamation." },
  { id: "mark21", question: "Who were the first disciples called?", options: [{ label: "A", text: "James and John" }, { label: "B", text: "Simon and Andrew" }, { label: "C", text: "Matthew and Philip" }, { label: "D", text: "Thomas and Bartholomew" }], correctAnswer: "B", verse: "Mark 1:16-17", explanation: "Fishermen called." },
  { id: "mark22", question: "What did Jesus promise to make them?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "Fishers of men" }, { label: "C", text: "Teachers" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Mark 1:17", explanation: "Mission defined." },
  { id: "mark23", question: "What did they leave immediately?", options: [{ label: "A", text: "Families" }, { label: "B", text: "Nets" }, { label: "C", text: "Boats" }, { label: "D", text: "Homes" }], correctAnswer: "B", verse: "Mark 1:18", explanation: "Immediate obedience." },
  { id: "mark24", question: "Where did Jesus teach with authority?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Synagogue" }, { label: "C", text: "Mountain" }, { label: "D", text: "House" }], correctAnswer: "B", verse: "Mark 1:21-22", explanation: "Authority recognized." },
  { id: "mark25", question: "What astonished the people?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "His teaching authority" }, { label: "C", text: "Parables" }, { label: "D", text: "Tone" }], correctAnswer: "B", verse: "Mark 1:22", explanation: "Not like scribes." },
  { id: "mark26", question: "Who did Jesus cast out in the synagogue?", options: [{ label: "A", text: "Leper" }, { label: "B", text: "Unclean spirit" }, { label: "C", text: "Pharisee" }, { label: "D", text: "Scribe" }], correctAnswer: "B", verse: "Mark 1:23-26", explanation: "Spiritual authority." },
  { id: "mark27", question: "What did the demon call Jesus?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Holy One of God" }, { label: "C", text: "King" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "Mark 1:24", explanation: "Recognition of identity." },
  { id: "mark28", question: "What command did Jesus give the demon?", options: [{ label: "A", text: "Be silent" }, { label: "B", text: "Come out" }, { label: "C", text: "Repent" }, { label: "D", text: "Leave now" }], correctAnswer: "B", verse: "Mark 1:25", explanation: "Authority demonstrated." },
  { id: "mark29", question: "What spread quickly?", options: [{ label: "A", text: "Opposition" }, { label: "B", text: "Jesus' fame" }, { label: "C", text: "Fear" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Mark 1:28", explanation: "Impact grows." },
  { id: "mark30", question: "Whose mother-in-law did Jesus heal?", options: [{ label: "A", text: "James" }, { label: "B", text: "Peter" }, { label: "C", text: "John" }, { label: "D", text: "Andrew" }], correctAnswer: "B", verse: "Mark 1:30", explanation: "Compassion shown." },
  { id: "mark31", question: "What illness did Peter's mother-in-law have?", options: [{ label: "A", text: "Leprosy" }, { label: "B", text: "Fever" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Blindness" }], correctAnswer: "B", verse: "Mark 1:30", explanation: "Immediate healing." },
  { id: "mark32", question: "What did she do after being healed?", options: [{ label: "A", text: "Rested" }, { label: "B", text: "Served them" }, { label: "C", text: "Prayed" }, { label: "D", text: "Left" }], correctAnswer: "B", verse: "Mark 1:31", explanation: "Response of service." },
  { id: "mark33", question: "When did people bring the sick?", options: [{ label: "A", text: "Morning" }, { label: "B", text: "Evening" }, { label: "C", text: "Midday" }, { label: "D", text: "Night" }], correctAnswer: "B", verse: "Mark 1:32", explanation: "After Sabbath." },
  { id: "mark34", question: "What did Jesus not allow demons to do?", options: [{ label: "A", text: "Speak" }, { label: "B", text: "Leave" }, { label: "C", text: "Follow" }, { label: "D", text: "Enter pigs" }], correctAnswer: "A", verse: "Mark 1:34", explanation: "Controlled revelation." },
  { id: "mark35", question: "Where did Jesus pray early in the morning?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Solitary place" }, { label: "C", text: "Synagogue" }, { label: "D", text: "House" }], correctAnswer: "B", verse: "Mark 1:35", explanation: "Private prayer." },
  { id: "mark36", question: "Who looked for Jesus?", options: [{ label: "A", text: "Crowds" }, { label: "B", text: "Simon and companions" }, { label: "C", text: "Pharisees" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Mark 1:36", explanation: "Ministry pressure." },
  { id: "mark37", question: "Why did Jesus say He came?", options: [{ label: "A", text: "To heal" }, { label: "B", text: "To preach" }, { label: "C", text: "To judge" }, { label: "D", text: "To rule" }], correctAnswer: "B", verse: "Mark 1:38", explanation: "Mission focus." },
  { id: "mark38", question: "What did Jesus heal next?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Leprosy" }, { label: "C", text: "Paralysis" }, { label: "D", text: "Fever" }], correctAnswer: "B", verse: "Mark 1:40-42", explanation: "Compassion breaks barriers." },
  { id: "mark39", question: "What moved Jesus to heal the leper?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Compassion" }, { label: "C", text: "Command" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Mark 1:41", explanation: "Mercy-driven." },
  { id: "mark40", question: "What instruction did Jesus give the healed leper?", options: [{ label: "A", text: "Tell everyone" }, { label: "B", text: "Tell no one" }, { label: "C", text: "Leave town" }, { label: "D", text: "Return home" }], correctAnswer: "B", verse: "Mark 1:44", explanation: "Messianic secrecy." },
  { id: "mark41", question: "What happened when the man spoke anyway?", options: [{ label: "A", text: "Jesus praised him" }, { label: "B", text: "Jesus could not enter towns openly" }, { label: "C", text: "Crowds left" }, { label: "D", text: "Opposition stopped" }], correctAnswer: "B", verse: "Mark 1:45", explanation: "Ministry complications." },
  { id: "mark42", question: "Where was the paralyzed man lowered from?", options: [{ label: "A", text: "Window" }, { label: "B", text: "Roof" }, { label: "C", text: "Door" }, { label: "D", text: "Stairs" }], correctAnswer: "B", verse: "Mark 2:4", explanation: "Faith demonstrated." },
  { id: "mark43", question: "What did Jesus see first?", options: [{ label: "A", text: "Their sickness" }, { label: "B", text: "Their faith" }, { label: "C", text: "Their fear" }, { label: "D", text: "Their need" }], correctAnswer: "B", verse: "Mark 2:5", explanation: "Faith matters." },
  { id: "mark44", question: "What did Jesus forgive first?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Sins" }, { label: "C", text: "Pain" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "Mark 2:5", explanation: "Spiritual priority." },
  { id: "mark45", question: "Who accused Jesus of blasphemy?", options: [{ label: "A", text: "Crowds" }, { label: "B", text: "Scribes" }, { label: "C", text: "Romans" }, { label: "D", text: "Disciples" }], correctAnswer: "B", verse: "Mark 2:6-7", explanation: "Religious opposition." },
  { id: "mark46", question: "What proved Jesus' authority?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Healing the man" }, { label: "C", text: "Prayer" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "Mark 2:10-12", explanation: "Visible sign." },
  { id: "mark47", question: "Who did Jesus call from a tax booth?", options: [{ label: "A", text: "Zacchaeus" }, { label: "B", text: "Levi" }, { label: "C", text: "Matthew" }, { label: "D", text: "Philip" }], correctAnswer: "B", verse: "Mark 2:14", explanation: "Radical grace." },
  { id: "mark48", question: "Who did Jesus eat with?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Tax collectors and sinners" }, { label: "C", text: "Kings" }, { label: "D", text: "Romans" }], correctAnswer: "B", verse: "Mark 2:15", explanation: "Grace extended." },
  { id: "mark49", question: "What metaphor did Jesus use?", options: [{ label: "A", text: "Doctor" }, { label: "B", text: "Physician" }, { label: "C", text: "Shepherd" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Mark 2:17", explanation: "Healers seek the sick." },
  { id: "mark50", question: "What practice is questioned next?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Fasting" }, { label: "C", text: "Giving" }, { label: "D", text: "Sabbath" }], correctAnswer: "B", verse: "Mark 2:18", explanation: "New covenant teaching." },
  { id: "mark51", question: "What image does Jesus use?", options: [{ label: "A", text: "Wedding" }, { label: "B", text: "Bridegroom" }, { label: "C", text: "Harvest" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "Mark 2:19", explanation: "Presence brings joy." },
  { id: "mark52", question: "What happens when the bridegroom leaves?", options: [{ label: "A", text: "Joy increases" }, { label: "B", text: "They will fast" }, { label: "C", text: "Celebration" }, { label: "D", text: "Rest" }], correctAnswer: "B", verse: "Mark 2:20", explanation: "Future sorrow." },
  { id: "mark53", question: "What cannot be put on an old garment?", options: [{ label: "A", text: "New cloth" }, { label: "B", text: "New patch" }, { label: "C", text: "Old patch" }, { label: "D", text: "Thread" }], correctAnswer: "B", verse: "Mark 2:21", explanation: "New covenant imagery." },
  { id: "mark54", question: "What cannot be put into old wineskins?", options: [{ label: "A", text: "Oil" }, { label: "B", text: "New wine" }, { label: "C", text: "Water" }, { label: "D", text: "Vinegar" }], correctAnswer: "B", verse: "Mark 2:22", explanation: "Transformation required." },
  { id: "mark55", question: "What day caused controversy?", options: [{ label: "A", text: "Festival" }, { label: "B", text: "Sabbath" }, { label: "C", text: "Passover" }, { label: "D", text: "Fast day" }], correctAnswer: "B", verse: "Mark 2:23", explanation: "Law interpretation." },
  { id: "mark56", question: "What did disciples do on the Sabbath?", options: [{ label: "A", text: "Heal" }, { label: "B", text: "Pick grain" }, { label: "C", text: "Travel" }, { label: "D", text: "Teach" }], correctAnswer: "B", verse: "Mark 2:23", explanation: "Accusation arises." },
  { id: "mark57", question: "Who did Jesus reference as precedent?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "David" }, { label: "C", text: "Elijah" }, { label: "D", text: "Solomon" }], correctAnswer: "B", verse: "Mark 2:25", explanation: "Mercy over ritual." },
  { id: "mark58", question: "What statement did Jesus make?", options: [{ label: "A", text: "Law is supreme" }, { label: "B", text: "Sabbath was made for man" }, { label: "C", text: "Man serves the law" }, { label: "D", text: "Rules cannot change" }], correctAnswer: "B", verse: "Mark 2:27", explanation: "Human-centered law." },
  { id: "mark59", question: "Who is Lord of the Sabbath?", options: [{ label: "A", text: "David" }, { label: "B", text: "Jesus" }, { label: "C", text: "Moses" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Mark 2:28", explanation: "Divine authority." },
  { id: "mark60", question: "What emotion filled Jesus toward hard hearts?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Anger and grief" }, { label: "C", text: "Joy" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Mark 3:5", explanation: "Compassion mixed with anger." },
  { id: "mark61", question: "What miracle occurs in Mark 3?", options: [{ label: "A", text: "Blind healed" }, { label: "B", text: "Withered hand restored" }, { label: "C", text: "Storm calmed" }, { label: "D", text: "Leper healed" }], correctAnswer: "B", verse: "Mark 3:1-5", explanation: "Authority over Sabbath." },
  { id: "mark62", question: "Who plotted against Jesus?", options: [{ label: "A", text: "Crowds" }, { label: "B", text: "Pharisees and Herodians" }, { label: "C", text: "Romans" }, { label: "D", text: "Sadducees" }], correctAnswer: "B", verse: "Mark 3:6", explanation: "Early opposition." },
  { id: "mark63", question: "What followed Jesus?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Great crowds" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Mark 3:7-8", explanation: "Growing influence." },
  { id: "mark64", question: "How many apostles were appointed?", options: [{ label: "A", text: "10" }, { label: "B", text: "12" }, { label: "C", text: "7" }, { label: "D", text: "70" }], correctAnswer: "B", verse: "Mark 3:14", explanation: "Symbolic number." },
  { id: "mark65", question: "Why were the apostles appointed?", options: [{ label: "A", text: "To rule" }, { label: "B", text: "To be with Him and preach" }, { label: "C", text: "To heal only" }, { label: "D", text: "To judge" }], correctAnswer: "B", verse: "Mark 3:14-15", explanation: "Relationship and mission." },
  { id: "mark66", question: "What accusation was made about Jesus?", options: [{ label: "A", text: "False prophet" }, { label: "B", text: "He has Beelzebul" }, { label: "C", text: "Lawbreaker" }, { label: "D", text: "Blasphemer" }], correctAnswer: "B", verse: "Mark 3:22", explanation: "Demonic accusation." },
  { id: "mark67", question: "What cannot stand?", options: [{ label: "A", text: "Kingdom divided against itself" }, { label: "B", text: "Strong house" }, { label: "C", text: "Temple" }, { label: "D", text: "Law" }], correctAnswer: "A", verse: "Mark 3:24", explanation: "Logical defense." },
  { id: "mark68", question: "Who must be bound first?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Strong man" }, { label: "C", text: "Enemy" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Mark 3:27", explanation: "Authority over Satan." },
  { id: "mark69", question: "What sin is unforgivable?", options: [{ label: "A", text: "Murder" }, { label: "B", text: "Blasphemy against the Holy Spirit" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Adultery" }], correctAnswer: "B", verse: "Mark 3:29", explanation: "Hard-hearted rejection." },
  { id: "mark70", question: "Who does Jesus say is His family?", options: [{ label: "A", text: "Relatives" }, { label: "B", text: "Those who do God's will" }, { label: "C", text: "Disciples only" }, { label: "D", text: "Crowds" }], correctAnswer: "B", verse: "Mark 3:35", explanation: "Spiritual family." },
  { id: "mark71", question: "What teaching method dominates Mark 4?", options: [{ label: "A", text: "Commands" }, { label: "B", text: "Parables" }, { label: "C", text: "Debates" }, { label: "D", text: "Miracles" }], correctAnswer: "B", verse: "Mark 4", explanation: "Kingdom revealed." },
  { id: "mark72", question: "What parable is taught first?", options: [{ label: "A", text: "Mustard seed" }, { label: "B", text: "Sower" }, { label: "C", text: "Lamp" }, { label: "D", text: "Harvest" }], correctAnswer: "B", verse: "Mark 4:3", explanation: "Hearing matters." },
  { id: "mark73", question: "What do seeds represent?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Word of God" }, { label: "C", text: "People" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "Mark 4:14", explanation: "Spiritual truth." },
  { id: "mark74", question: "Why does Jesus use parables?", options: [{ label: "A", text: "Confuse" }, { label: "B", text: "Reveal and conceal" }, { label: "C", text: "Entertain" }, { label: "D", text: "Teach children" }], correctAnswer: "B", verse: "Mark 4:11-12", explanation: "Heart posture matters." },
  { id: "mark75", question: "What should not be hidden?", options: [{ label: "A", text: "Lamp" }, { label: "B", text: "Light" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Mark 4:22", explanation: "Revelation spreads." },
  { id: "mark76", question: "What parable shows small beginnings?", options: [{ label: "A", text: "Sower" }, { label: "B", text: "Mustard seed" }, { label: "C", text: "Harvest" }, { label: "D", text: "Lamp" }], correctAnswer: "B", verse: "Mark 4:30-32", explanation: "Kingdom growth." },
  { id: "mark77", question: "What miracle occurs crossing the sea?", options: [{ label: "A", text: "Walking on water" }, { label: "B", text: "Storm calmed" }, { label: "C", text: "Fish caught" }, { label: "D", text: "Demons cast out" }], correctAnswer: "B", verse: "Mark 4:39", explanation: "Authority over nature." },
  { id: "mark78", question: "What did Jesus ask the disciples?", options: [{ label: "A", text: "Why fear?" }, { label: "B", text: "Where is your faith?" }, { label: "C", text: "Do you believe?" }, { label: "D", text: "Why doubt?" }], correctAnswer: "B", verse: "Mark 4:40", explanation: "Faith challenge." },
  { id: "mark79", question: "Who did they say Jesus was?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Who is this?" }, { label: "C", text: "Prophet" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Mark 4:41", explanation: "Awe and fear." },
  { id: "mark80", question: "Who did Jesus meet in Gerasenes?", options: [{ label: "A", text: "Blind man" }, { label: "B", text: "Demon-possessed man" }, { label: "C", text: "Leper" }, { label: "D", text: "Centurion" }], correctAnswer: "B", verse: "Mark 5:1-2", explanation: "Spiritual confrontation." },
  { id: "mark81", question: "What was the demon's name?", options: [{ label: "A", text: "Beelzebul" }, { label: "B", text: "Legion" }, { label: "C", text: "Satan" }, { label: "D", text: "Abaddon" }], correctAnswer: "B", verse: "Mark 5:9", explanation: "Many demons." },
  { id: "mark82", question: "What did demons enter?", options: [{ label: "A", text: "Goats" }, { label: "B", text: "Pigs" }, { label: "C", text: "Sheep" }, { label: "D", text: "Cows" }], correctAnswer: "B", verse: "Mark 5:13", explanation: "Power displayed." },
  { id: "mark83", question: "How did the people respond?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Fear and rejection" }, { label: "C", text: "Joy" }, { label: "D", text: "Curiosity" }], correctAnswer: "B", verse: "Mark 5:17", explanation: "Fear of change." },
  { id: "mark84", question: "What did Jesus tell the healed man to do?", options: [{ label: "A", text: "Follow Him" }, { label: "B", text: "Tell what God had done" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Return home" }], correctAnswer: "B", verse: "Mark 5:19", explanation: "Witness commanded." },
  { id: "mark85", question: "Who asked Jesus to heal his daughter?", options: [{ label: "A", text: "Centurion" }, { label: "B", text: "Jairus" }, { label: "C", text: "Peter" }, { label: "D", text: "Nicodemus" }], correctAnswer: "B", verse: "Mark 5:22-23", explanation: "Desperate faith." },
  { id: "mark86", question: "What interrupted the journey?", options: [{ label: "A", text: "Storm" }, { label: "B", text: "Woman with bleeding" }, { label: "C", text: "Crowd fight" }, { label: "D", text: "Pharisees" }], correctAnswer: "B", verse: "Mark 5:25", explanation: "Faith encounter." },
  { id: "mark87", question: "How long had she been bleeding?", options: [{ label: "A", text: "7 years" }, { label: "B", text: "12 years" }, { label: "C", text: "10 years" }, { label: "D", text: "40 years" }], correctAnswer: "B", verse: "Mark 5:25", explanation: "Long suffering." },
  { id: "mark88", question: "What healed her?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Touching Jesus' garment" }, { label: "C", text: "Faith alone" }, { label: "D", text: "Command" }], correctAnswer: "B", verse: "Mark 5:27-29", explanation: "Faith expressed." },
  { id: "mark89", question: "What did Jesus say healed her?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Faith" }, { label: "C", text: "Touch" }, { label: "D", text: "Mercy" }], correctAnswer: "B", verse: "Mark 5:34", explanation: "Faith affirmed." },
  { id: "mark90", question: "What news came from Jairus' house?", options: [{ label: "A", text: "She was healed" }, { label: "B", text: "She died" }, { label: "C", text: "She slept" }, { label: "D", text: "She recovered" }], correctAnswer: "B", verse: "Mark 5:35", explanation: "Crisis deepens." },
  { id: "mark91", question: "What did Jesus say in response?", options: [{ label: "A", text: "Prepare" }, { label: "B", text: "Do not fear, only believe" }, { label: "C", text: "Wait" }, { label: "D", text: "Pray" }], correctAnswer: "B", verse: "Mark 5:36", explanation: "Faith over fear." },
  { id: "mark92", question: "Who went with Jesus?", options: [{ label: "A", text: "All disciples" }, { label: "B", text: "Peter, James, John" }, { label: "C", text: "Crowds" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Mark 5:37", explanation: "Inner circle." },
  { id: "mark93", question: "What did Jesus say the girl was doing?", options: [{ label: "A", text: "Dead" }, { label: "B", text: "Sleeping" }, { label: "C", text: "Resting" }, { label: "D", text: "Unconscious" }], correctAnswer: "B", verse: "Mark 5:39", explanation: "Authority over death." },
  { id: "mark94", question: "What words did Jesus speak to her?", options: [{ label: "A", text: "Rise up" }, { label: "B", text: "Talitha koum" }, { label: "C", text: "Be healed" }, { label: "D", text: "Live" }], correctAnswer: "B", verse: "Mark 5:41", explanation: "Aramaic command." },
  { id: "mark95", question: "What was the girl's age?", options: [{ label: "A", text: "7" }, { label: "B", text: "12" }, { label: "C", text: "10" }, { label: "D", text: "14" }], correctAnswer: "B", verse: "Mark 5:42", explanation: "Detail noted." },
  { id: "mark96", question: "What reaction followed?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Great amazement" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Mark 5:42", explanation: "Astonishment." },
  { id: "mark97", question: "What did Jesus instruct them?", options: [{ label: "A", text: "Tell everyone" }, { label: "B", text: "Tell no one" }, { label: "C", text: "Pray" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "Mark 5:43", explanation: "Messianic secrecy." },
  { id: "mark98", question: "What else did Jesus say to do?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Give her food" }, { label: "C", text: "Send her home" }, { label: "D", text: "Celebrate" }], correctAnswer: "B", verse: "Mark 5:43", explanation: "Compassion continues." },
  { id: "mark99", question: "What theme dominates Mark so far?", options: [{ label: "A", text: "Teaching" }, { label: "B", text: "Authority and action" }, { label: "C", text: "Debate" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Mark", explanation: "Fast-paced gospel." },
  { id: "mark100", question: "Overall, Mark presents Jesus primarily as?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Suffering servant with authority" }, { label: "C", text: "Political king" }, { label: "D", text: "Philosopher" }], correctAnswer: "B", verse: "Mark", explanation: "Servant Messiah." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MarkTriviaPage() {
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
          .eq("book", "mark");

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
          book: "mark",
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
            book: "mark",
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
    if (score === 10) return "Perfect! You're a Mark expert!";
    if (score >= 8) return "Excellent! You know Mark well!";
    if (score >= 6) return "Good job! Keep studying Mark!";
    if (score >= 4) return "Nice try! Mark has much to explore!";
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
              href="/bible-trivia/mark"
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

