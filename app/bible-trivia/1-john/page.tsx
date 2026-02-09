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
  { id: "1john1", question: "Who is traditionally identified as the author of 1 John?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "C", verse: "1 John 1:1", explanation: "The letter is traditionally attributed to the apostle John." },
  { id: "1john2", question: "1 John begins by speaking of what was from the beginning?", options: [{ label: "A", text: "The law" }, { label: "B", text: "The Word of life" }, { label: "C", text: "The gospel" }, { label: "D", text: "The promise" }], correctAnswer: "B", verse: "1 John 1:1", explanation: "John emphasizes Christ as the Word of life." },
  { id: "1john3", question: "John says the life appeared and they have seen it and?", options: [{ label: "A", text: "Believed it" }, { label: "B", text: "Touched it" }, { label: "C", text: "Testify to it" }, { label: "D", text: "Received it" }], correctAnswer: "C", verse: "1 John 1:2", explanation: "Eyewitness testimony." },
  { id: "1john4", question: "The life revealed is identified as what kind of life?", options: [{ label: "A", text: "Spiritual life" }, { label: "B", text: "Eternal life" }, { label: "C", text: "New life" }, { label: "D", text: "Resurrected life" }], correctAnswer: "B", verse: "1 John 1:2", explanation: "Eternal life in Christ." },
  { id: "1john5", question: "John writes so that believers may have fellowship with whom?", options: [{ label: "A", text: "The church" }, { label: "B", text: "One another" }, { label: "C", text: "The apostles" }, { label: "D", text: "God" }], correctAnswer: "D", verse: "1 John 1:3", explanation: "Fellowship with God." },
  { id: "1john6", question: "Fellowship with God is described as fellowship with the Father and His?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Son" }, { label: "C", text: "People" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 John 1:3", explanation: "Father and Son unity." },
  { id: "1john7", question: "John writes these things so that their joy may be?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Shared" }, { label: "C", text: "Complete" }, { label: "D", text: "Secure" }], correctAnswer: "C", verse: "1 John 1:4", explanation: "Full joy in Christ." },
  { id: "1john8", question: "God is described as light and in Him there is no?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Evil" }, { label: "C", text: "Darkness" }, { label: "D", text: "Falsehood" }], correctAnswer: "C", verse: "1 John 1:5", explanation: "God's pure nature." },
  { id: "1john9", question: "Walking in darkness while claiming fellowship makes a person a?", options: [{ label: "A", text: "Sinner" }, { label: "B", text: "Hypocrite" }, { label: "C", text: "Liar" }, { label: "D", text: "False believer" }], correctAnswer: "C", verse: "1 John 1:6", explanation: "Actions contradict claims." },
  { id: "1john10", question: "Walking in the light results in fellowship with one another and cleansing by the blood of whom?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Spirit" }, { label: "C", text: "Jesus" }, { label: "D", text: "The Son" }], correctAnswer: "D", verse: "1 John 1:7", explanation: "Cleansed by Jesus." },
  { id: "1john11", question: "If we claim to be without sin, we deceive?", options: [{ label: "A", text: "Others" }, { label: "B", text: "The church" }, { label: "C", text: "Ourselves" }, { label: "D", text: "God" }], correctAnswer: "C", verse: "1 John 1:8", explanation: "Self-deception." },
  { id: "1john12", question: "Confessing sins leads God to forgive and?", options: [{ label: "A", text: "Restore" }, { label: "B", text: "Cleanse" }, { label: "C", text: "Renew" }, { label: "D", text: "Justify" }], correctAnswer: "B", verse: "1 John 1:9", explanation: "Forgiveness and cleansing." },
  { id: "1john13", question: "Claiming never to have sinned makes God out to be a?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Liar" }, { label: "C", text: "False witness" }, { label: "D", text: "Accuser" }], correctAnswer: "B", verse: "1 John 1:10", explanation: "Denial of truth." },
  { id: "1john14", question: "John writes so believers will not sin, but if they do, they have an advocate with the Father, Jesus Christ the?", options: [{ label: "A", text: "Messiah" }, { label: "B", text: "Righteous One" }, { label: "C", text: "Son" }, { label: "D", text: "Lord" }], correctAnswer: "B", verse: "1 John 2:1", explanation: "Christ our advocate." },
  { id: "1john15", question: "Jesus is described as the atoning sacrifice for whose sins?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "The church" }, { label: "C", text: "The world" }, { label: "D", text: "Many" }], correctAnswer: "C", verse: "1 John 2:2", explanation: "Sufficient for all." },
  { id: "1john16", question: "Knowing God is evidenced by keeping His?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Commands" }, { label: "C", text: "Word" }, { label: "D", text: "Teachings" }], correctAnswer: "B", verse: "1 John 2:3", explanation: "Obedience shows faith." },
  { id: "1john17", question: "Those who claim to know God but do not obey Him are called?", options: [{ label: "A", text: "Lost" }, { label: "B", text: "Blind" }, { label: "C", text: "Liars" }, { label: "D", text: "Deceived" }], correctAnswer: "C", verse: "1 John 2:4", explanation: "Truth requires obedience." },
  { id: "1john18", question: "God's love is made complete in those who obey His?", options: [{ label: "A", text: "Commands" }, { label: "B", text: "Truth" }, { label: "C", text: "Will" }, { label: "D", text: "Word" }], correctAnswer: "D", verse: "1 John 2:5", explanation: "Love perfected through obedience." },
  { id: "1john19", question: "Whoever claims to live in Him must live as Jesus did?", options: [{ label: "A", text: "Spoke" }, { label: "B", text: "Loved" }, { label: "C", text: "Walked" }, { label: "D", text: "Taught" }], correctAnswer: "C", verse: "1 John 2:6", explanation: "Imitating Christ." },
  { id: "1john20", question: "The command to love one another is described as both old and?", options: [{ label: "A", text: "True" }, { label: "B", text: "Faithful" }, { label: "C", text: "New" }, { label: "D", text: "Living" }], correctAnswer: "C", verse: "1 John 2:7-8", explanation: "Love renewed in Christ." },
  { id: "1john21", question: "Anyone who hates a brother or sister is still in the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Darkness" }, { label: "C", text: "Flesh" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "1 John 2:9", explanation: "Hatred equals darkness." },
  { id: "1john22", question: "Those who love their brother or sister live in the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Spirit" }, { label: "C", text: "Light" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "1 John 2:10", explanation: "Love reflects light." },
  { id: "1john23", question: "Hating others blinds a person so they do not know where they are?", options: [{ label: "A", text: "Standing" }, { label: "B", text: "Going" }, { label: "C", text: "Living" }, { label: "D", text: "Falling" }], correctAnswer: "B", verse: "1 John 2:11", explanation: "Spiritual blindness." },
  { id: "1john24", question: "John addresses little children because their sins have been?", options: [{ label: "A", text: "Covered" }, { label: "B", text: "Confessed" }, { label: "C", text: "Forgiven" }, { label: "D", text: "Removed" }], correctAnswer: "C", verse: "1 John 2:12", explanation: "Forgiveness assurance." },
  { id: "1john25", question: "John writes to fathers because they know Him who is from the?", options: [{ label: "A", text: "Beginning" }, { label: "B", text: "Father" }, { label: "C", text: "Light" }, { label: "D", text: "Truth" }], correctAnswer: "A", verse: "1 John 2:13", explanation: "Mature faith." },
  { id: "1john26", question: "John writes to young men because they have overcome the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Evil one" }, { label: "C", text: "Flesh" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "1 John 2:13", explanation: "Spiritual victory." },
  { id: "1john27", question: "Believers are warned not to love the world or anything in the?", options: [{ label: "A", text: "Flesh" }, { label: "B", text: "Darkness" }, { label: "C", text: "World" }, { label: "D", text: "Life" }], correctAnswer: "C", verse: "1 John 2:15", explanation: "Worldly attachments." },
  { id: "1john28", question: "Love for the world excludes love for whom?", options: [{ label: "A", text: "Christ" }, { label: "B", text: "The Spirit" }, { label: "C", text: "The Father" }, { label: "D", text: "The church" }], correctAnswer: "C", verse: "1 John 2:15", explanation: "Divided devotion." },
  { id: "1john29", question: "The cravings of sinful man, lust of the eyes, and pride of life come from the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Devil" }, { label: "D", text: "Heart" }], correctAnswer: "A", verse: "1 John 2:16", explanation: "Worldly values." },
  { id: "1john30", question: "The world and its desires pass away, but whoever does the will of God lives?", options: [{ label: "A", text: "In peace" }, { label: "B", text: "Forever" }, { label: "C", text: "In truth" }, { label: "D", text: "In light" }], correctAnswer: "B", verse: "1 John 2:17", explanation: "Eternal life." },
  { id: "1john31", question: "John says it is the last hour because many what have come?", options: [{ label: "A", text: "False prophets" }, { label: "B", text: "Antichrists" }, { label: "C", text: "Teachers" }, { label: "D", text: "Deceivers" }], correctAnswer: "B", verse: "1 John 2:18", explanation: "Sign of the last hour." },
  { id: "1john32", question: "Those who left the believers showed they did not really belong to?", options: [{ label: "A", text: "The church" }, { label: "B", text: "The truth" }, { label: "C", text: "Us" }, { label: "D", text: "Christ" }], correctAnswer: "C", verse: "1 John 2:19", explanation: "True belonging revealed." },
  { id: "1john33", question: "Believers have an anointing from the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Father" }, { label: "C", text: "Holy One" }, { label: "D", text: "Son" }], correctAnswer: "C", verse: "1 John 2:20", explanation: "Spiritual discernment." },
  { id: "1john34", question: "John writes not because believers lack knowledge but because they know the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Gospel" }, { label: "C", text: "Light" }, { label: "D", text: "Way" }], correctAnswer: "A", verse: "1 John 2:21", explanation: "Grounded in truth." },
  { id: "1john35", question: "Who is the liar but the one who denies that Jesus is the?", options: [{ label: "A", text: "Lord" }, { label: "B", text: "Son" }, { label: "C", text: "Messiah" }, { label: "D", text: "Christ" }], correctAnswer: "D", verse: "1 John 2:22", explanation: "Core confession." },
  { id: "1john36", question: "Denying the Son means also denying the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Truth" }, { label: "C", text: "Father" }, { label: "D", text: "Gospel" }], correctAnswer: "C", verse: "1 John 2:23", explanation: "Father-Son unity." },
  { id: "1john37", question: "Remaining in what was heard from the beginning keeps believers in the Son and the Father?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Teaching" }, { label: "C", text: "Truth" }, { label: "D", text: "Word" }], correctAnswer: "D", verse: "1 John 2:24", explanation: "Abiding in truth." },
  { id: "1john38", question: "The promise Jesus made is?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Eternal life" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "1 John 2:25", explanation: "Promise of life." },
  { id: "1john39", question: "John warns believers about those trying to?", options: [{ label: "A", text: "Harm them" }, { label: "B", text: "Deceive them" }, { label: "C", text: "Confuse them" }, { label: "D", text: "Test them" }], correctAnswer: "B", verse: "1 John 2:26", explanation: "False influence." },
  { id: "1john40", question: "The anointing believers received teaches them about?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "All things" }, { label: "C", text: "Christ" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "1 John 2:27", explanation: "Spirit's guidance." },
  { id: "1john41", question: "Believers are encouraged to remain in Christ so they may be confident at His?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Coming" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Return" }], correctAnswer: "B", verse: "1 John 2:28", explanation: "Confidence in Christ." },
  { id: "1john42", question: "Everyone who does what is right is born of?", options: [{ label: "A", text: "The Spirit" }, { label: "B", text: "Faith" }, { label: "C", text: "God" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 John 2:29", explanation: "Righteous living." },
  { id: "1john43", question: "Believers are called children of God because of His great?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Love" }, { label: "C", text: "Grace" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 John 3:1", explanation: "Adopted by love." },
  { id: "1john44", question: "The reason the world does not know believers is that it did not know?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Christ" }, { label: "C", text: "God" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "1 John 3:1", explanation: "Spiritual blindness." },
  { id: "1john45", question: "When Christ appears, believers will be like Him because they will?", options: [{ label: "A", text: "Know Him" }, { label: "B", text: "Follow Him" }, { label: "C", text: "See Him" }, { label: "D", text: "Serve Him" }], correctAnswer: "C", verse: "1 John 3:2", explanation: "Transformation through vision." },
  { id: "1john46", question: "Everyone who has this hope purifies himself just as Christ is?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "Righteous" }, { label: "C", text: "Pure" }, { label: "D", text: "Perfect" }], correctAnswer: "C", verse: "1 John 3:3", explanation: "Hope produces purity." },
  { id: "1john47", question: "Sin is defined as the breaking of the?", options: [{ label: "A", text: "Commandments" }, { label: "B", text: "Law" }, { label: "C", text: "Truth" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "1 John 3:4", explanation: "Definition of sin." },
  { id: "1john48", question: "Jesus appeared to take away sins, and in Him there is no?", options: [{ label: "A", text: "Darkness" }, { label: "B", text: "Evil" }, { label: "C", text: "Sin" }, { label: "D", text: "Deceit" }], correctAnswer: "C", verse: "1 John 3:5", explanation: "Sinless Savior." },
  { id: "1john49", question: "No one who lives in Christ keeps on?", options: [{ label: "A", text: "Failing" }, { label: "B", text: "Doubting" }, { label: "C", text: "Sinning" }, { label: "D", text: "Struggling" }], correctAnswer: "C", verse: "1 John 3:6", explanation: "Habitual sin rejected." },
  { id: "1john50", question: "The one who does what is right is?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Righteous" }, { label: "C", text: "Faithful" }, { label: "D", text: "Blessed" }], correctAnswer: "B", verse: "1 John 3:7", explanation: "Righteous actions." },
  { id: "1john51", question: "The one who does what is sinful is of the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Devil" }, { label: "D", text: "Darkness" }], correctAnswer: "C", verse: "1 John 3:8", explanation: "Source of sin." },
  { id: "1john52", question: "The Son of God appeared to destroy the works of the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Devil" }, { label: "C", text: "Flesh" }, { label: "D", text: "Darkness" }], correctAnswer: "B", verse: "1 John 3:8", explanation: "Christ's mission." },
  { id: "1john53", question: "God's seed remains in those born of Him so they cannot keep on?", options: [{ label: "A", text: "Failing" }, { label: "B", text: "Sinning" }, { label: "C", text: "Falling" }, { label: "D", text: "Doubting" }], correctAnswer: "B", verse: "1 John 3:9", explanation: "New nature." },
  { id: "1john54", question: "Children of God and children of the devil are distinguished by what?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Belief" }, { label: "C", text: "Actions" }, { label: "D", text: "Knowledge" }], correctAnswer: "C", verse: "1 John 3:10", explanation: "Actions reveal identity." },
  { id: "1john55", question: "The message from the beginning is to?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Obey" }, { label: "C", text: "Love one another" }, { label: "D", text: "Remain faithful" }], correctAnswer: "C", verse: "1 John 3:11", explanation: "Core command." },
  { id: "1john56", question: "Cain murdered his brother because his own actions were evil and his brother's were?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Pure" }, { label: "C", text: "Righteous" }, { label: "D", text: "Holy" }], correctAnswer: "C", verse: "1 John 3:12", explanation: "Contrast of righteousness." },
  { id: "1john57", question: "Believers should not be surprised if the world?", options: [{ label: "A", text: "Mocks them" }, { label: "B", text: "Hates them" }, { label: "C", text: "Rejects them" }, { label: "D", text: "Opposes them" }], correctAnswer: "B", verse: "1 John 3:13", explanation: "Worldly opposition." },
  { id: "1john58", question: "Passing from death to life is evidenced by?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Obedience" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 John 3:14", explanation: "Love shows life." },
  { id: "1john59", question: "Anyone who hates a brother or sister is a?", options: [{ label: "A", text: "Liar" }, { label: "B", text: "Sinner" }, { label: "C", text: "Murderer" }, { label: "D", text: "False believer" }], correctAnswer: "C", verse: "1 John 3:15", explanation: "Strong language." },
  { id: "1john60", question: "Love is defined by Jesus laying down His life for?", options: [{ label: "A", text: "The world" }, { label: "B", text: "The church" }, { label: "C", text: "His friends" }, { label: "D", text: "Others" }], correctAnswer: "C", verse: "1 John 3:16", explanation: "Sacrificial love." },
  { id: "1john61", question: "Believers should lay down their lives for their?", options: [{ label: "A", text: "Neighbors" }, { label: "B", text: "Brothers and sisters" }, { label: "C", text: "Friends" }, { label: "D", text: "Families" }], correctAnswer: "B", verse: "1 John 3:16", explanation: "Imitating Christ." },
  { id: "1john62", question: "Seeing a brother in need but having no pity shows lack of God's?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Spirit" }, { label: "C", text: "Love" }, { label: "D", text: "Mercy" }], correctAnswer: "C", verse: "1 John 3:17", explanation: "Love in action." },
  { id: "1john63", question: "Believers are urged to love not with words or speech but with actions and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Obedience" }, { label: "D", text: "Deeds" }], correctAnswer: "B", verse: "1 John 3:18", explanation: "Genuine love." },
  { id: "1john64", question: "If hearts condemn believers, God is?", options: [{ label: "A", text: "Just" }, { label: "B", text: "Merciful" }, { label: "C", text: "Greater" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "1 John 3:20", explanation: "God knows all." },
  { id: "1john65", question: "Confidence before God comes when hearts do not?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Condemn" }, { label: "C", text: "Doubt" }, { label: "D", text: "Fail" }], correctAnswer: "B", verse: "1 John 3:21", explanation: "Clear conscience." },
  { id: "1john66", question: "God's command is to believe in the name of His Son and to?", options: [{ label: "A", text: "Obey Him" }, { label: "B", text: "Follow Him" }, { label: "C", text: "Love one another" }, { label: "D", text: "Serve Him" }], correctAnswer: "C", verse: "1 John 3:23", explanation: "Faith and love." },
  { id: "1john67", question: "Living in obedience shows that God lives in believers by the?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Spirit" }, { label: "C", text: "Word" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "1 John 3:24", explanation: "Indwelling Spirit." },
  { id: "1john68", question: "Believers are warned not to believe every spirit but to?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Test the spirits" }, { label: "C", text: "Trust God" }, { label: "D", text: "Seek truth" }], correctAnswer: "B", verse: "1 John 4:1", explanation: "Discernment needed." },
  { id: "1john69", question: "Every spirit that acknowledges Jesus Christ came in the flesh is from?", options: [{ label: "A", text: "God" }, { label: "B", text: "The Spirit" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "A", verse: "1 John 4:2", explanation: "True confession." },
  { id: "1john70", question: "The spirit that does not acknowledge Jesus is the spirit of the?", options: [{ label: "A", text: "World" }, { label: "B", text: "False prophet" }, { label: "C", text: "Antichrist" }, { label: "D", text: "Devil" }], correctAnswer: "C", verse: "1 John 4:3", explanation: "False spirit." },
  { id: "1john71", question: "Greater is He who is in believers than he who is in the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Darkness" }, { label: "D", text: "Enemy" }], correctAnswer: "A", verse: "1 John 4:4", explanation: "God's power." },
  { id: "1john72", question: "Those from the world speak from the viewpoint of the?", options: [{ label: "A", text: "Flesh" }, { label: "B", text: "World" }, { label: "C", text: "Mind" }, { label: "D", text: "Heart" }], correctAnswer: "B", verse: "1 John 4:5", explanation: "Worldly thinking." },
  { id: "1john73", question: "Whoever knows God listens to the apostles, while those not from God do not listen to?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "The Word" }, { label: "C", text: "Them" }, { label: "D", text: "Teaching" }], correctAnswer: "C", verse: "1 John 4:6", explanation: "Apostolic authority." },
  { id: "1john74", question: "Love comes from God, and everyone who loves has been born of God and?", options: [{ label: "A", text: "Knows God" }, { label: "B", text: "Follows God" }, { label: "C", text: "Believes God" }, { label: "D", text: "Serves God" }], correctAnswer: "A", verse: "1 John 4:7", explanation: "Love reflects God." },
  { id: "1john75", question: "Whoever does not love does not know God because God is?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Light" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 John 4:8", explanation: "God's nature." },
  { id: "1john76", question: "God showed His love by sending His one and only Son into the world so that we might?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Live" }, { label: "C", text: "Be saved" }, { label: "D", text: "Be forgiven" }], correctAnswer: "B", verse: "1 John 4:9", explanation: "Life through Christ." },
  { id: "1john77", question: "Love is defined not by our love for God but by His love for us in sending His Son as an atoning sacrifice for our?", options: [{ label: "A", text: "Lives" }, { label: "B", text: "Hearts" }, { label: "C", text: "Sins" }, { label: "D", text: "Souls" }], correctAnswer: "C", verse: "1 John 4:10", explanation: "God's initiative." },
  { id: "1john78", question: "Because God so loved us, we also ought to?", options: [{ label: "A", text: "Serve Him" }, { label: "B", text: "Obey Him" }, { label: "C", text: "Love one another" }, { label: "D", text: "Trust Him" }], correctAnswer: "C", verse: "1 John 4:11", explanation: "Love response." },
  { id: "1john79", question: "God lives in believers when they?", options: [{ label: "A", text: "Believe" }, { label: "B", text: "Obey" }, { label: "C", text: "Love one another" }, { label: "D", text: "Pray" }], correctAnswer: "C", verse: "1 John 4:12", explanation: "God made visible through love." },
  { id: "1john80", question: "God has given believers assurance through His?", options: [{ label: "A", text: "Word" }, { label: "B", text: "Spirit" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "1 John 4:13", explanation: "Spirit's testimony." },
  { id: "1john81", question: "Whoever acknowledges that Jesus is the Son of God lives in God and God in?", options: [{ label: "A", text: "Them" }, { label: "B", text: "Christ" }, { label: "C", text: "The church" }, { label: "D", text: "The Spirit" }], correctAnswer: "A", verse: "1 John 4:15", explanation: "Mutual abiding." },
  { id: "1john82", question: "Perfect love drives out?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Doubt" }, { label: "C", text: "Fear" }, { label: "D", text: "Shame" }], correctAnswer: "C", verse: "1 John 4:18", explanation: "Fearless love." },
  { id: "1john83", question: "Those who fear have not been made perfect in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Hope" }, { label: "C", text: "Love" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "1 John 4:18", explanation: "Love matures." },
  { id: "1john84", question: "Believers love because God first?", options: [{ label: "A", text: "Called us" }, { label: "B", text: "Saved us" }, { label: "C", text: "Loved us" }, { label: "D", text: "Chose us" }], correctAnswer: "C", verse: "1 John 4:19", explanation: "God's initiative." },
  { id: "1john85", question: "Claiming to love God while hating a brother makes one a?", options: [{ label: "A", text: "False believer" }, { label: "B", text: "Sinner" }, { label: "C", text: "Liar" }, { label: "D", text: "Hypocrite" }], correctAnswer: "C", verse: "1 John 4:20", explanation: "Contradiction." },
  { id: "1john86", question: "The command is that whoever loves God must also love their?", options: [{ label: "A", text: "Neighbor" }, { label: "B", text: "Family" }, { label: "C", text: "Brother" }, { label: "D", text: "Church" }], correctAnswer: "C", verse: "1 John 4:21", explanation: "Linked love." },
  { id: "1john87", question: "Everyone who believes Jesus is the Christ is born of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "God" }, { label: "D", text: "The Spirit" }], correctAnswer: "C", verse: "1 John 5:1", explanation: "New birth." },
  { id: "1john88", question: "Loving God includes obeying His?", options: [{ label: "A", text: "Will" }, { label: "B", text: "Commands" }, { label: "C", text: "Truth" }, { label: "D", text: "Spirit" }], correctAnswer: "B", verse: "1 John 5:3", explanation: "Love and obedience." },
  { id: "1john89", question: "God's commands are described as not being?", options: [{ label: "A", text: "Difficult" }, { label: "B", text: "Heavy" }, { label: "C", text: "Burdening" }, { label: "D", text: "Oppressive" }], correctAnswer: "C", verse: "1 John 5:3", explanation: "Grace-filled obedience." },
  { id: "1john90", question: "Faith overcomes the?", options: [{ label: "A", text: "Flesh" }, { label: "B", text: "Devil" }, { label: "C", text: "World" }, { label: "D", text: "Darkness" }], correctAnswer: "C", verse: "1 John 5:4", explanation: "Victory through faith." },
  { id: "1john91", question: "The one who overcomes the world is the one who believes Jesus is the?", options: [{ label: "A", text: "Son of God" }, { label: "B", text: "Messiah" }, { label: "C", text: "Lord" }, { label: "D", text: "Savior" }], correctAnswer: "A", verse: "1 John 5:5", explanation: "True belief." },
  { id: "1john92", question: "Jesus came by water and?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Fire" }, { label: "C", text: "Blood" }, { label: "D", text: "Power" }], correctAnswer: "C", verse: "1 John 5:6", explanation: "Testimony of Christ." },
  { id: "1john93", question: "The Spirit testifies because the Spirit is the?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Truth" }, { label: "C", text: "Witness" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "1 John 5:6", explanation: "Spirit of truth." },
  { id: "1john94", question: "There are three that testify: the Spirit, the water, and the?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Blood" }, { label: "D", text: "Word" }], correctAnswer: "C", verse: "1 John 5:8", explanation: "Unified testimony." },
  { id: "1john95", question: "God's testimony is greater than human testimony because it is about His?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Promise" }, { label: "C", text: "Son" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "1 John 5:9", explanation: "Testimony about Jesus." },
  { id: "1john96", question: "Whoever believes in the Son has this testimony where?", options: [{ label: "A", text: "In the heart" }, { label: "B", text: "Within themselves" }, { label: "C", text: "In faith" }, { label: "D", text: "In truth" }], correctAnswer: "B", verse: "1 John 5:10", explanation: "Internal witness." },
  { id: "1john97", question: "God has given believers what kind of life?", options: [{ label: "A", text: "New life" }, { label: "B", text: "Abundant life" }, { label: "C", text: "Eternal life" }, { label: "D", text: "Spiritual life" }], correctAnswer: "C", verse: "1 John 5:11", explanation: "Life in Christ." },
  { id: "1john98", question: "Whoever has the Son has?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Life" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "1 John 5:12", explanation: "Christ equals life." },
  { id: "1john99", question: "John writes so believers may know that they have?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Forgiveness" }, { label: "C", text: "Eternal life" }, { label: "D", text: "Assurance" }], correctAnswer: "C", verse: "1 John 5:13", explanation: "Assurance of life." },
  { id: "1john100", question: "John concludes by warning believers to keep themselves from?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "The world" }, { label: "C", text: "False teaching" }, { label: "D", text: "Idols" }], correctAnswer: "D", verse: "1 John 5:21", explanation: "Final warning." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstJohnTriviaPage() {
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
        
        // Fetch user's progress for 1 john questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', '1john');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: '1john' });
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
            book: '1john'
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
    if (score === 10) return "Perfect! You're a 1 John expert!";
    if (score >= 8) return "Excellent! You know 1 John well!";
    if (score >= 6) return "Good job! Keep studying 1 John!";
    if (score >= 4) return "Nice try! 1 John has much to explore!";
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
              href="/bible-trivia/1-john"
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
