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
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "revelation1", question: "Who received the revelation of Jesus Christ?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "Peter" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "C", verse: "Revelation 1:1", explanation: "John received the revelation while exiled on Patmos." },
  { id: "revelation2", question: "The revelation was given to show God's servants what must soon?", options: [{ label: "A", text: "End" }, { label: "B", text: "Happen" }, { label: "C", text: "Change" }, { label: "D", text: "Begin" }], correctAnswer: "B", verse: "Revelation 1:1", explanation: "Future events revealed." },
  { id: "revelation3", question: "John was on which island when he received the vision?", options: [{ label: "A", text: "Cyprus" }, { label: "B", text: "Crete" }, { label: "C", text: "Patmos" }, { label: "D", text: "Malta" }], correctAnswer: "C", verse: "Revelation 1:9", explanation: "Island of exile." },
  { id: "revelation4", question: "John was on Patmos because of the word of God and the testimony of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Jesus" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "Revelation 1:9", explanation: "Faithful witness." },
  { id: "revelation5", question: "John was in the Spirit on which day?", options: [{ label: "A", text: "Sabbath" }, { label: "B", text: "Day of Atonement" }, { label: "C", text: "The Lord's Day" }, { label: "D", text: "Pentecost" }], correctAnswer: "C", verse: "Revelation 1:10", explanation: "Worship context." },
  { id: "revelation6", question: "John heard a loud voice like a?", options: [{ label: "A", text: "Trumpet" }, { label: "B", text: "Thunder" }, { label: "C", text: "Wind" }, { label: "D", text: "Roar" }], correctAnswer: "A", verse: "Revelation 1:10", explanation: "Clear and commanding." },
  { id: "revelation7", question: "How many churches did John receive messages for?", options: [{ label: "A", text: "Five" }, { label: "B", text: "Seven" }, { label: "C", text: "Ten" }, { label: "D", text: "Twelve" }], correctAnswer: "B", verse: "Revelation 1:11", explanation: "Seven churches." },
  { id: "revelation8", question: "Which church is listed first?", options: [{ label: "A", text: "Smyrna" }, { label: "B", text: "Pergamum" }, { label: "C", text: "Ephesus" }, { label: "D", text: "Laodicea" }], correctAnswer: "C", verse: "Revelation 1:11", explanation: "Ephesus first." },
  { id: "revelation9", question: "John saw seven golden?", options: [{ label: "A", text: "Crowns" }, { label: "B", text: "Stars" }, { label: "C", text: "Lamps" }, { label: "D", text: "Lampstands" }], correctAnswer: "D", verse: "Revelation 1:12", explanation: "Church symbolism." },
  { id: "revelation10", question: "Who was standing among the lampstands?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "The Son of Man" }, { label: "C", text: "A prophet" }, { label: "D", text: "An elder" }], correctAnswer: "B", verse: "Revelation 1:13", explanation: "Christ's presence." },
  { id: "revelation11", question: "The Son of Man was dressed in a robe reaching down to His?", options: [{ label: "A", text: "Feet" }, { label: "B", text: "Knees" }, { label: "C", text: "Ankles" }, { label: "D", text: "Waist" }], correctAnswer: "A", verse: "Revelation 1:13", explanation: "Priestly image." },
  { id: "revelation12", question: "His hair was white like wool, as white as?", options: [{ label: "A", text: "Milk" }, { label: "B", text: "Snow" }, { label: "C", text: "Clouds" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "Revelation 1:14", explanation: "Purity and wisdom." },
  { id: "revelation13", question: "His eyes were like blazing?", options: [{ label: "A", text: "Stars" }, { label: "B", text: "Fire" }, { label: "C", text: "Light" }, { label: "D", text: "Lightning" }], correctAnswer: "B", verse: "Revelation 1:14", explanation: "Piercing judgment." },
  { id: "revelation14", question: "Out of His mouth came a sharp?", options: [{ label: "A", text: "Spear" }, { label: "B", text: "Sword" }, { label: "C", text: "Flame" }, { label: "D", text: "Arrow" }], correctAnswer: "B", verse: "Revelation 1:16", explanation: "Word of judgment." },
  { id: "revelation15", question: "John fell at His feet as though?", options: [{ label: "A", text: "Afraid" }, { label: "B", text: "Dead" }, { label: "C", text: "Weak" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Revelation 1:17", explanation: "Overwhelmed response." },
  { id: "revelation16", question: "Jesus said He is the First and the?", options: [{ label: "A", text: "Last" }, { label: "B", text: "King" }, { label: "C", text: "Judge" }, { label: "D", text: "Light" }], correctAnswer: "A", verse: "Revelation 1:17", explanation: "Eternal authority." },
  { id: "revelation17", question: "Jesus holds the keys of death and?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Hell" }, { label: "C", text: "Hades" }, { label: "D", text: "The grave" }], correctAnswer: "C", verse: "Revelation 1:18", explanation: "Authority over death." },
  { id: "revelation18", question: "The seven stars represent the angels of the?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Churches" }, { label: "C", text: "Heavens" }, { label: "D", text: "Saints" }], correctAnswer: "B", verse: "Revelation 1:20", explanation: "Church leadership." },
  { id: "revelation19", question: "The lampstands represent the?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Apostles" }, { label: "C", text: "Churches" }, { label: "D", text: "Witnesses" }], correctAnswer: "C", verse: "Revelation 1:20", explanation: "Church symbolism." },
  { id: "revelation20", question: "Which church is praised for hard work but rebuked for losing its first love?", options: [{ label: "A", text: "Ephesus" }, { label: "B", text: "Smyrna" }, { label: "C", text: "Thyatira" }, { label: "D", text: "Laodicea" }], correctAnswer: "A", verse: "Revelation 2:4", explanation: "Love diminished." },
  { id: "revelation21", question: "Which church faced persecution but received no rebuke?", options: [{ label: "A", text: "Pergamum" }, { label: "B", text: "Smyrna" }, { label: "C", text: "Sardis" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "Revelation 2:8-9", explanation: "Faithful suffering." },
  { id: "revelation22", question: "Which church tolerated the teaching of Balaam?", options: [{ label: "A", text: "Thyatira" }, { label: "B", text: "Pergamum" }, { label: "C", text: "Sardis" }, { label: "D", text: "Philadelphia" }], correctAnswer: "B", verse: "Revelation 2:14", explanation: "False teaching." },
  { id: "revelation23", question: "Which church was accused of tolerating Jezebel?", options: [{ label: "A", text: "Thyatira" }, { label: "B", text: "Smyrna" }, { label: "C", text: "Laodicea" }, { label: "D", text: "Ephesus" }], correctAnswer: "A", verse: "Revelation 2:20", explanation: "False prophecy." },
  { id: "revelation24", question: "Which church had a reputation of being alive but was dead?", options: [{ label: "A", text: "Sardis" }, { label: "B", text: "Philadelphia" }, { label: "C", text: "Pergamum" }, { label: "D", text: "Ephesus" }], correctAnswer: "A", verse: "Revelation 3:1", explanation: "Spiritual death." },
  { id: "revelation25", question: "Which church had little strength but kept God's word?", options: [{ label: "A", text: "Philadelphia" }, { label: "B", text: "Laodicea" }, { label: "C", text: "Smyrna" }, { label: "D", text: "Thyatira" }], correctAnswer: "A", verse: "Revelation 3:8", explanation: "Faithful obedience." },
  { id: "revelation26", question: "Which church was lukewarm?", options: [{ label: "A", text: "Ephesus" }, { label: "B", text: "Laodicea" }, { label: "C", text: "Sardis" }, { label: "D", text: "Pergamum" }], correctAnswer: "B", verse: "Revelation 3:16", explanation: "Spiritual complacency." },
  { id: "revelation27", question: "Jesus stands at the door and?", options: [{ label: "A", text: "Calls" }, { label: "B", text: "Waits" }, { label: "C", text: "Knocks" }, { label: "D", text: "Speaks" }], correctAnswer: "C", verse: "Revelation 3:20", explanation: "Invitation to fellowship." },
  { id: "revelation28", question: "Those who overcome will sit with Christ on His?", options: [{ label: "A", text: "Judgment seat" }, { label: "B", text: "Throne" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Right hand" }], correctAnswer: "B", verse: "Revelation 3:21", explanation: "Shared reign." },
  { id: "revelation29", question: "John saw a door standing open in?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "The temple" }, { label: "D", text: "The clouds" }], correctAnswer: "A", verse: "Revelation 4:1", explanation: "Heavenly vision." },
  { id: "revelation30", question: "Around God's throne were how many other thrones?", options: [{ label: "A", text: "12" }, { label: "B", text: "24" }, { label: "C", text: "7" }, { label: "D", text: "10" }], correctAnswer: "B", verse: "Revelation 4:4", explanation: "Heavenly elders." },
  { id: "revelation31", question: "How many living creatures surround God's throne?", options: [{ label: "A", text: "2" }, { label: "B", text: "4" }, { label: "C", text: "6" }, { label: "D", text: "12" }], correctAnswer: "B", verse: "Revelation 4:6", explanation: "Heavenly beings." },
  { id: "revelation32", question: "The living creatures never stop saying?", options: [{ label: "A", text: "Worthy is the Lamb" }, { label: "B", text: "Holy, holy, holy" }, { label: "C", text: "Praise the Lord" }, { label: "D", text: "Glory to God" }], correctAnswer: "B", verse: "Revelation 4:8", explanation: "God's holiness." },
  { id: "revelation33", question: "Who was found worthy to open the scroll?", options: [{ label: "A", text: "An angel" }, { label: "B", text: "A prophet" }, { label: "C", text: "The Lamb" }, { label: "D", text: "An elder" }], correctAnswer: "C", verse: "Revelation 5:9", explanation: "Jesus alone." },
  { id: "revelation34", question: "The Lamb appeared as though it had been?", options: [{ label: "A", text: "Killed" }, { label: "B", text: "Wounded" }, { label: "C", text: "Slain" }, { label: "D", text: "Broken" }], correctAnswer: "C", verse: "Revelation 5:6", explanation: "Sacrificial imagery." },
  { id: "revelation35", question: "How many seals were on the scroll?", options: [{ label: "A", text: "3" }, { label: "B", text: "7" }, { label: "C", text: "10" }, { label: "D", text: "12" }], correctAnswer: "B", verse: "Revelation 5:1", explanation: "Complete judgment." },
  { id: "revelation36", question: "The first seal released a rider on a?", options: [{ label: "A", text: "Red horse" }, { label: "B", text: "White horse" }, { label: "C", text: "Black horse" }, { label: "D", text: "Pale horse" }], correctAnswer: "B", verse: "Revelation 6:2", explanation: "Conquest." },
  { id: "revelation37", question: "The second seal released a rider on a?", options: [{ label: "A", text: "White horse" }, { label: "B", text: "Black horse" }, { label: "C", text: "Red horse" }, { label: "D", text: "Pale horse" }], correctAnswer: "C", verse: "Revelation 6:4", explanation: "War." },
  { id: "revelation38", question: "The third seal released a rider on a?", options: [{ label: "A", text: "Black horse" }, { label: "B", text: "White horse" }, { label: "C", text: "Red horse" }, { label: "D", text: "Pale horse" }], correctAnswer: "A", verse: "Revelation 6:5", explanation: "Famine." },
  { id: "revelation39", question: "The fourth seal released a rider named?", options: [{ label: "A", text: "War" }, { label: "B", text: "Death" }, { label: "C", text: "Plague" }, { label: "D", text: "Destruction" }], correctAnswer: "B", verse: "Revelation 6:8", explanation: "Death follows." },
  { id: "revelation40", question: "The fifth seal revealed the souls of those slain for?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "The word of God" }, { label: "D", text: "The law" }], correctAnswer: "C", verse: "Revelation 6:9", explanation: "Martyrs." },
  { id: "revelation41", question: "The sixth seal caused the sun to turn?", options: [{ label: "A", text: "White" }, { label: "B", text: "Red" }, { label: "C", text: "Black" }, { label: "D", text: "Dark" }], correctAnswer: "C", verse: "Revelation 6:12", explanation: "Cosmic signs." },
  { id: "revelation42", question: "How many were sealed from the tribes of Israel?", options: [{ label: "A", text: "12,000" }, { label: "B", text: "72,000" }, { label: "C", text: "144,000" }, { label: "D", text: "100,000" }], correctAnswer: "C", verse: "Revelation 7:4", explanation: "Sealed servants." },
  { id: "revelation43", question: "The sealed servants were marked on their?", options: [{ label: "A", text: "Hands" }, { label: "B", text: "Foreheads" }, { label: "C", text: "Hearts" }, { label: "D", text: "Arms" }], correctAnswer: "B", verse: "Revelation 7:3", explanation: "God's protection." },
  { id: "revelation44", question: "A great multitude stood before the throne wearing white?", options: [{ label: "A", text: "Crowns" }, { label: "B", text: "Robes" }, { label: "C", text: "Garments" }, { label: "D", text: "Linen" }], correctAnswer: "B", verse: "Revelation 7:9", explanation: "Purity and victory." },
  { id: "revelation45", question: "The seventh seal resulted in silence in heaven for about?", options: [{ label: "A", text: "An hour" }, { label: "B", text: "A day" }, { label: "C", text: "Half an hour" }, { label: "D", text: "A moment" }], correctAnswer: "C", verse: "Revelation 8:1", explanation: "Anticipation." },
  { id: "revelation46", question: "How many trumpets were given to the angels?", options: [{ label: "A", text: "3" }, { label: "B", text: "5" }, { label: "C", text: "7" }, { label: "D", text: "10" }], correctAnswer: "C", verse: "Revelation 8:2", explanation: "Trumpet judgments." },
  { id: "revelation47", question: "The first trumpet brought hail and fire mixed with?", options: [{ label: "A", text: "Smoke" }, { label: "B", text: "Blood" }, { label: "C", text: "Ash" }, { label: "D", text: "Sulfur" }], correctAnswer: "B", verse: "Revelation 8:7", explanation: "Earthly destruction." },
  { id: "revelation48", question: "The second trumpet turned a third of the sea into?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Darkness" }, { label: "C", text: "Blood" }, { label: "D", text: "Poison" }], correctAnswer: "C", verse: "Revelation 8:8", explanation: "Sea judgment." },
  { id: "revelation49", question: "The star that fell and poisoned waters was named?", options: [{ label: "A", text: "Abaddon" }, { label: "B", text: "Wormwood" }, { label: "C", text: "Apollyon" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "Revelation 8:11", explanation: "Bitterness." },
  { id: "revelation50", question: "The fifth trumpet released locusts from the?", options: [{ label: "A", text: "Earth" }, { label: "B", text: "Sky" }, { label: "C", text: "Abyss" }, { label: "D", text: "Sea" }], correctAnswer: "C", verse: "Revelation 9:1", explanation: "Demonic judgment." },
  { id: "revelation51", question: "The locusts were allowed to torment people for how long?", options: [{ label: "A", text: "3 months" }, { label: "B", text: "1 year" }, { label: "C", text: "5 months" }, { label: "D", text: "7 months" }], correctAnswer: "C", verse: "Revelation 9:5", explanation: "Limited judgment." },
  { id: "revelation52", question: "The king over the locusts is named Abaddon and in Greek?", options: [{ label: "A", text: "Beelzebub" }, { label: "B", text: "Apollyon" }, { label: "C", text: "Satan" }, { label: "D", text: "Leviathan" }], correctAnswer: "B", verse: "Revelation 9:11", explanation: "Destroyer." },
  { id: "revelation53", question: "The sixth trumpet released four angels bound at the river?", options: [{ label: "A", text: "Jordan" }, { label: "B", text: "Euphrates" }, { label: "C", text: "Nile" }, { label: "D", text: "Tigris" }], correctAnswer: "B", verse: "Revelation 9:14", explanation: "Judgment preparation." },
  { id: "revelation54", question: "These plagues killed what fraction of mankind?", options: [{ label: "A", text: "One fourth" }, { label: "B", text: "One half" }, { label: "C", text: "One third" }, { label: "D", text: "All" }], correctAnswer: "C", verse: "Revelation 9:18", explanation: "Severe judgment." },
  { id: "revelation55", question: "Despite the plagues, people did not?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Pray" }, { label: "C", text: "Believe" }, { label: "D", text: "Obey" }], correctAnswer: "A", verse: "Revelation 9:20-21", explanation: "Hardened hearts." },
  { id: "revelation56", question: "John ate a scroll that tasted sweet like?", options: [{ label: "A", text: "Milk" }, { label: "B", text: "Honey" }, { label: "C", text: "Bread" }, { label: "D", text: "Fruit" }], correctAnswer: "B", verse: "Revelation 10:9", explanation: "God's word." },
  { id: "revelation57", question: "But the scroll turned his stomach?", options: [{ label: "A", text: "Painful" }, { label: "B", text: "Bitter" }, { label: "C", text: "Sour" }, { label: "D", text: "Burning" }], correctAnswer: "B", verse: "Revelation 10:10", explanation: "Judgment message." },
  { id: "revelation58", question: "How many witnesses prophesied in sackcloth?", options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "7" }], correctAnswer: "B", verse: "Revelation 11:3", explanation: "Two witnesses." },
  { id: "revelation59", question: "The witnesses were killed by the beast from the?", options: [{ label: "A", text: "Sea" }, { label: "B", text: "Earth" }, { label: "C", text: "Abyss" }, { label: "D", text: "Sky" }], correctAnswer: "C", verse: "Revelation 11:7", explanation: "Abyss beast." },
  { id: "revelation60", question: "After three and a half days, the breath of life from God entered the?", options: [{ label: "A", text: "Martyrs" }, { label: "B", text: "Witnesses" }, { label: "C", text: "Saints" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Revelation 11:11", explanation: "Resurrection power." },
  { id: "revelation61", question: "The seventh trumpet announced that the kingdom of the world has become the kingdom of our Lord and His?", options: [{ label: "A", text: "Messiah" }, { label: "B", text: "Christ" }, { label: "C", text: "Son" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Revelation 11:15", explanation: "Christ reigns." },
  { id: "revelation62", question: "A woman clothed with the sun gave birth to a?", options: [{ label: "A", text: "Prophet" }, { label: "B", text: "King" }, { label: "C", text: "Male child" }, { label: "D", text: "Messiah" }], correctAnswer: "C", verse: "Revelation 12:5", explanation: "Messianic imagery." },
  { id: "revelation63", question: "The dragon in Revelation is identified as?", options: [{ label: "A", text: "Death" }, { label: "B", text: "The serpent" }, { label: "C", text: "Satan" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Revelation 12:9", explanation: "Satan identified." },
  { id: "revelation64", question: "The beast from the sea had how many heads?", options: [{ label: "A", text: "3" }, { label: "B", text: "7" }, { label: "C", text: "10" }, { label: "D", text: "12" }], correctAnswer: "B", verse: "Revelation 13:1", explanation: "Symbolic power." },
  { id: "revelation65", question: "The number of the beast is?", options: [{ label: "A", text: "666" }, { label: "B", text: "777" }, { label: "C", text: "616" }, { label: "D", text: "999" }], correctAnswer: "A", verse: "Revelation 13:18", explanation: "Number of man." },
  { id: "revelation66", question: "The Lamb stood on Mount?", options: [{ label: "A", text: "Sinai" }, { label: "B", text: "Zion" }, { label: "C", text: "Olivet" }, { label: "D", text: "Carmel" }], correctAnswer: "B", verse: "Revelation 14:1", explanation: "Victory scene." },
  { id: "revelation67", question: "How many followed the Lamb?", options: [{ label: "A", text: "12,000" }, { label: "B", text: "72,000" }, { label: "C", text: "144,000" }, { label: "D", text: "A multitude" }], correctAnswer: "C", verse: "Revelation 14:1", explanation: "Redeemed group." },
  { id: "revelation68", question: "Babylon is described as the mother of?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Harlots" }, { label: "C", text: "Wickedness" }, { label: "D", text: "Idols" }], correctAnswer: "B", verse: "Revelation 17:5", explanation: "Corrupt system." },
  { id: "revelation69", question: "Babylon falls because she made nations drink the wine of her?", options: [{ label: "A", text: "Wrath" }, { label: "B", text: "Immorality" }, { label: "C", text: "Sin" }, { label: "D", text: "Corruption" }], correctAnswer: "B", verse: "Revelation 14:8", explanation: "Moral corruption." },
  { id: "revelation70", question: "Christ returns riding a?", options: [{ label: "A", text: "Chariot" }, { label: "B", text: "White horse" }, { label: "C", text: "Cloud" }, { label: "D", text: "Throne" }], correctAnswer: "B", verse: "Revelation 19:11", explanation: "Victorious return." },
  { id: "revelation71", question: "Christ is called Faithful and?", options: [{ label: "A", text: "True" }, { label: "B", text: "Mighty" }, { label: "C", text: "Holy" }, { label: "D", text: "Just" }], correctAnswer: "A", verse: "Revelation 19:11", explanation: "Trustworthy judge." },
  { id: "revelation72", question: "The beast and false prophet were thrown into the?", options: [{ label: "A", text: "Abyss" }, { label: "B", text: "Pit" }, { label: "C", text: "Lake of fire" }, { label: "D", text: "Darkness" }], correctAnswer: "C", verse: "Revelation 19:20", explanation: "Final judgment." },
  { id: "revelation73", question: "Satan was bound for how many years?", options: [{ label: "A", text: "100" }, { label: "B", text: "500" }, { label: "C", text: "1,000" }, { label: "D", text: "Forever" }], correctAnswer: "C", verse: "Revelation 20:2", explanation: "Millennium." },
  { id: "revelation74", question: "After the thousand years, Satan was released for a short?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Season" }, { label: "C", text: "Period" }, { label: "D", text: "Moment" }], correctAnswer: "A", verse: "Revelation 20:3", explanation: "Final rebellion." },
  { id: "revelation75", question: "The dead were judged according to what was written in the?", options: [{ label: "A", text: "Scrolls" }, { label: "B", text: "Books" }, { label: "C", text: "Law" }, { label: "D", text: "Records" }], correctAnswer: "B", verse: "Revelation 20:12", explanation: "Final judgment." },
  { id: "revelation76", question: "The lake of fire is called the second?", options: [{ label: "A", text: "Punishment" }, { label: "B", text: "Judgment" }, { label: "C", text: "Death" }, { label: "D", text: "Destruction" }], correctAnswer: "C", verse: "Revelation 20:14", explanation: "Eternal separation." },
  { id: "revelation77", question: "John saw a new heaven and a new?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Earth" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Creation" }], correctAnswer: "B", verse: "Revelation 21:1", explanation: "Renewed creation." },
  { id: "revelation78", question: "The holy city came down out of heaven from?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Christ" }, { label: "C", text: "God" }, { label: "D", text: "The throne" }], correctAnswer: "C", verse: "Revelation 21:2", explanation: "God's dwelling." },
  { id: "revelation79", question: "God will wipe away every?", options: [{ label: "A", text: "Pain" }, { label: "B", text: "Tear" }, { label: "C", text: "Fear" }, { label: "D", text: "Memory" }], correctAnswer: "B", verse: "Revelation 21:4", explanation: "Eternal comfort." },
  { id: "revelation80", question: "There will be no more death, mourning, crying, or?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Sin" }, { label: "C", text: "Pain" }, { label: "D", text: "Fear" }], correctAnswer: "C", verse: "Revelation 21:4", explanation: "End of pain." },
  { id: "revelation81", question: "The New Jerusalem has how many gates?", options: [{ label: "A", text: "3" }, { label: "B", text: "7" }, { label: "C", text: "10" }, { label: "D", text: "12" }], correctAnswer: "D", verse: "Revelation 21:12", explanation: "Twelve tribes." },
  { id: "revelation82", question: "The foundations of the city bear the names of the twelve?", options: [{ label: "A", text: "Tribes" }, { label: "B", text: "Elders" }, { label: "C", text: "Apostles" }, { label: "D", text: "Prophets" }], correctAnswer: "C", verse: "Revelation 21:14", explanation: "Apostolic foundation." },
  { id: "revelation83", question: "The city does not need the sun or moon because God's?", options: [{ label: "A", text: "Presence" }, { label: "B", text: "Power" }, { label: "C", text: "Glory" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "Revelation 21:23", explanation: "God's glory shines." },
  { id: "revelation84", question: "The river of the water of life flows from the?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Heaven" }, { label: "C", text: "Throne of God" }, { label: "D", text: "City" }], correctAnswer: "C", verse: "Revelation 22:1", explanation: "Life source." },
  { id: "revelation85", question: "The tree of life bears fruit how many times a year?", options: [{ label: "A", text: "Once" }, { label: "B", text: "Three" }, { label: "C", text: "Seven" }, { label: "D", text: "Twelve" }], correctAnswer: "D", verse: "Revelation 22:2", explanation: "Continual provision." },
  { id: "revelation86", question: "There will be no longer any?", options: [{ label: "A", text: "Night" }, { label: "B", text: "Temple" }, { label: "C", text: "Curse" }, { label: "D", text: "Pain" }], correctAnswer: "C", verse: "Revelation 22:3", explanation: "Curse removed." },
  { id: "revelation87", question: "Jesus says, \"Behold, I am coming?\"", options: [{ label: "A", text: "Soon" }, { label: "B", text: "Quickly" }, { label: "C", text: "Again" }, { label: "D", text: "Now" }], correctAnswer: "B", verse: "Revelation 22:12", explanation: "Imminent return." },
  { id: "revelation88", question: "Jesus is the Alpha and the?", options: [{ label: "A", text: "Omega" }, { label: "B", text: "End" }, { label: "C", text: "Beginning" }, { label: "D", text: "First" }], correctAnswer: "A", verse: "Revelation 22:13", explanation: "Complete authority." },
  { id: "revelation89", question: "Blessed are those who wash their?", options: [{ label: "A", text: "Hearts" }, { label: "B", text: "Hands" }, { label: "C", text: "Robes" }, { label: "D", text: "Souls" }], correctAnswer: "C", verse: "Revelation 22:14", explanation: "Purity." },
  { id: "revelation90", question: "Outside are dogs, sorcerers, the sexually immoral, and?", options: [{ label: "A", text: "Liars" }, { label: "B", text: "Idolaters" }, { label: "C", text: "Murderers" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Revelation 22:15", explanation: "Excluded from the city." },
  { id: "revelation91", question: "Jesus is the Root and the Offspring of?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "David" }, { label: "C", text: "Judah" }, { label: "D", text: "Israel" }], correctAnswer: "B", verse: "Revelation 22:16", explanation: "Messianic lineage." },
  { id: "revelation92", question: "The Spirit and the bride say?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Repent" }, { label: "C", text: "Come" }, { label: "D", text: "Believe" }], correctAnswer: "C", verse: "Revelation 22:17", explanation: "Invitation." },
  { id: "revelation93", question: "Anyone who adds to the prophecy will receive the?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Wrath" }, { label: "C", text: "Plagues" }, { label: "D", text: "Curse" }], correctAnswer: "C", verse: "Revelation 22:18", explanation: "Warning." },
  { id: "revelation94", question: "Anyone who takes away from the prophecy will lose their share in the?", options: [{ label: "A", text: "City" }, { label: "B", text: "Tree of life" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Book" }], correctAnswer: "B", verse: "Revelation 22:19", explanation: "Serious warning." },
  { id: "revelation95", question: "Jesus' final promise is, \"Yes, I am coming?\"", options: [{ label: "A", text: "Soon" }, { label: "B", text: "Again" }, { label: "C", text: "Quickly" }, { label: "D", text: "Now" }], correctAnswer: "C", verse: "Revelation 22:20", explanation: "Final assurance." },
  { id: "revelation96", question: "John responds, \"Amen. Come, Lord?\"", options: [{ label: "A", text: "Jesus" }, { label: "B", text: "Christ" }, { label: "C", text: "God" }, { label: "D", text: "King" }], correctAnswer: "A", verse: "Revelation 22:20", explanation: "Prayerful response." },
  { id: "revelation97", question: "The final verse speaks of the grace of the Lord Jesus being with?", options: [{ label: "A", text: "The churches" }, { label: "B", text: "The saints" }, { label: "C", text: "God's people" }, { label: "D", text: "All believers" }], correctAnswer: "C", verse: "Revelation 22:21", explanation: "Grace closing." },
  { id: "revelation98", question: "Revelation reveals Jesus primarily as?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Judge and King" }, { label: "C", text: "Prophet" }, { label: "D", text: "Priest" }], correctAnswer: "B", verse: "Revelation theme", explanation: "Reigning Christ." },
  { id: "revelation99", question: "The main purpose of Revelation is to encourage believers to?", options: [{ label: "A", text: "Fear judgment" }, { label: "B", text: "Understand symbols" }, { label: "C", text: "Remain faithful" }, { label: "D", text: "Prepare timelines" }], correctAnswer: "C", verse: "Revelation theme", explanation: "Faithfulness." },
  { id: "revelation100", question: "The final message of Revelation is that God wins and Christ reigns?", options: [{ label: "A", text: "Eventually" }, { label: "B", text: "Spiritually" }, { label: "C", text: "Eternally" }, { label: "D", text: "Temporarily" }], correctAnswer: "C", verse: "Revelation 22:5", explanation: "Eternal reign." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RevelationTriviaPage() {
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

        // Fetch user's progress for revelation questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "revelation");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        // If no questions left, show all questions (allow review)
        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

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
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        // Get username
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

        // Insert into master_actions via server-side API (uses service role)
        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect,
          book: "revelation",
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
            isCorrect,
            book: "revelation",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered:
                (currentStats.trivia_questions_answered || 0) + 1,
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
    if (score === 10) return "Perfect! You're a Revelation expert!";
    if (score >= 8) return "Excellent! You know Revelation well!";
    if (score >= 6) return "Good job! Keep studying Revelation!";
    if (score >= 4) return "Nice try! Revelation has much to explore!";
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
              href="/bible-trivia/revelation"
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
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
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
