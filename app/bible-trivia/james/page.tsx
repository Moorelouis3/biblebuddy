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
  { id: "james1", question: "Who is identified as the author of the book of James?", options: [{ label: "A", text: "James the son of Zebedee" }, { label: "B", text: "James the brother of Jesus" }, { label: "C", text: "James the son of Alphaeus" }, { label: "D", text: "James the cousin of Jesus" }], correctAnswer: "B", verse: "James 1:1", explanation: "Traditionally understood as Jesus' half-brother." },
  { id: "james2", question: "James addresses his letter to the twelve tribes scattered among the?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Churches" }, { label: "C", text: "Provinces" }, { label: "D", text: "Kingdoms" }], correctAnswer: "A", verse: "James 1:1", explanation: "Refers to Jewish believers in dispersion." },
  { id: "james3", question: "Believers are told to consider it pure joy whenever they face?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Persecution" }, { label: "C", text: "Trials" }, { label: "D", text: "Opposition" }], correctAnswer: "C", verse: "James 1:2", explanation: "Trials test faith." },
  { id: "james4", question: "The testing of faith produces?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Hope" }, { label: "C", text: "Perseverance" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "James 1:3", explanation: "Endurance through trials." },
  { id: "james5", question: "Perseverance must finish its work so believers may be?", options: [{ label: "A", text: "Strong" }, { label: "B", text: "Faithful" }, { label: "C", text: "Mature and complete" }, { label: "D", text: "Holy" }], correctAnswer: "C", verse: "James 1:4", explanation: "Spiritual maturity." },
  { id: "james6", question: "If any lacks wisdom, they should ask?", options: [{ label: "A", text: "Leaders" }, { label: "B", text: "God" }, { label: "C", text: "The church" }, { label: "D", text: "Teachers" }], correctAnswer: "B", verse: "James 1:5", explanation: "God gives generously." },
  { id: "james7", question: "When asking for wisdom, one must ask in?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Prayer" }, { label: "C", text: "Faith" }, { label: "D", text: "Humility" }], correctAnswer: "C", verse: "James 1:6", explanation: "No doubting." },
  { id: "james8", question: "The one who doubts is like a wave of the sea?", options: [{ label: "A", text: "Sinking" }, { label: "B", text: "Crashing" }, { label: "C", text: "Blown and tossed" }, { label: "D", text: "Restless" }], correctAnswer: "C", verse: "James 1:6", explanation: "Instability from doubt." },
  { id: "james9", question: "A double-minded person is?", options: [{ label: "A", text: "Confused" }, { label: "B", text: "Unstable" }, { label: "C", text: "Faithless" }, { label: "D", text: "Weak" }], correctAnswer: "B", verse: "James 1:8", explanation: "Lack of commitment." },
  { id: "james10", question: "Believers in humble circumstances should take pride in their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Salvation" }, { label: "C", text: "High position" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "James 1:9", explanation: "Spiritual elevation." },
  { id: "james11", question: "The rich will fade away like a?", options: [{ label: "A", text: "Shadow" }, { label: "B", text: "Mist" }, { label: "C", text: "Flower" }, { label: "D", text: "Leaf" }], correctAnswer: "C", verse: "James 1:10", explanation: "Temporary wealth." },
  { id: "james12", question: "Blessed is the one who perseveres under?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Testing" }, { label: "C", text: "Pressure" }, { label: "D", text: "Trial" }], correctAnswer: "D", verse: "James 1:12", explanation: "Reward for endurance." },
  { id: "james13", question: "Those who persevere will receive the crown of?", options: [{ label: "A", text: "Righteousness" }, { label: "B", text: "Life" }, { label: "C", text: "Glory" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "James 1:12", explanation: "Eternal reward." },
  { id: "james14", question: "God does not tempt anyone with?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Suffering" }, { label: "C", text: "Evil" }, { label: "D", text: "Pain" }], correctAnswer: "C", verse: "James 1:13", explanation: "God's holy nature." },
  { id: "james15", question: "Each person is tempted when they are dragged away by their own?", options: [{ label: "A", text: "Desires" }, { label: "B", text: "Weakness" }, { label: "C", text: "Sin" }, { label: "D", text: "Thoughts" }], correctAnswer: "A", verse: "James 1:14", explanation: "Internal temptation." },
  { id: "james16", question: "Desire gives birth to?", options: [{ label: "A", text: "Failure" }, { label: "B", text: "Sin" }, { label: "C", text: "Death" }, { label: "D", text: "Pain" }], correctAnswer: "B", verse: "James 1:15", explanation: "Progression of sin." },
  { id: "james17", question: "Every good and perfect gift comes from?", options: [{ label: "A", text: "Heaven" }, { label: "B", text: "God" }, { label: "C", text: "The Spirit" }, { label: "D", text: "Above" }], correctAnswer: "D", verse: "James 1:17", explanation: "Source of blessing." },
  { id: "james18", question: "God does not change like shifting?", options: [{ label: "A", text: "Sand" }, { label: "B", text: "Shadows" }, { label: "C", text: "Light" }, { label: "D", text: "Seasons" }], correctAnswer: "B", verse: "James 1:17", explanation: "God's constancy." },
  { id: "james19", question: "Believers are brought forth by the word of?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Faith" }, { label: "C", text: "Life" }, { label: "D", text: "Grace" }], correctAnswer: "A", verse: "James 1:18", explanation: "New birth through truth." },
  { id: "james20", question: "Everyone should be quick to listen, slow to speak, and slow to?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Anger" }, { label: "C", text: "Respond" }, { label: "D", text: "React" }], correctAnswer: "B", verse: "James 1:19", explanation: "Controlled response." },
  { id: "james21", question: "Human anger does not produce the righteousness that God?", options: [{ label: "A", text: "Requires" }, { label: "B", text: "Desires" }, { label: "C", text: "Commands" }, { label: "D", text: "Approves" }], correctAnswer: "A", verse: "James 1:20", explanation: "Righteous living." },
  { id: "james22", question: "Believers are told to get rid of moral filth and?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Arrogance" }, { label: "C", text: "Evil" }, { label: "D", text: "Wickedness" }], correctAnswer: "D", verse: "James 1:21", explanation: "Moral cleansing." },
  { id: "james23", question: "Believers must not only listen to the word but also?", options: [{ label: "A", text: "Believe it" }, { label: "B", text: "Teach it" }, { label: "C", text: "Do what it says" }, { label: "D", text: "Share it" }], correctAnswer: "C", verse: "James 1:22", explanation: "Active obedience." },
  { id: "james24", question: "Listening without doing is compared to someone who looks in a?", options: [{ label: "A", text: "Window" }, { label: "B", text: "Reflection" }, { label: "C", text: "Mirror" }, { label: "D", text: "Shadow" }], correctAnswer: "C", verse: "James 1:23", explanation: "Forgetful hearer." },
  { id: "james25", question: "The perfect law gives?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Life" }, { label: "C", text: "Freedom" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "James 1:25", explanation: "Law of liberty." },
  { id: "james26", question: "Religion God accepts as pure includes caring for?", options: [{ label: "A", text: "The poor" }, { label: "B", text: "Widows and orphans" }, { label: "C", text: "The sick" }, { label: "D", text: "The needy" }], correctAnswer: "B", verse: "James 1:27", explanation: "Compassionate faith." },
  { id: "james27", question: "True religion also includes keeping oneself from being polluted by the?", options: [{ label: "A", text: "World" }, { label: "B", text: "Flesh" }, { label: "C", text: "Enemy" }, { label: "D", text: "Culture" }], correctAnswer: "A", verse: "James 1:27", explanation: "Moral purity." },
  { id: "james28", question: "Believers are warned against showing?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Favoritism" }, { label: "C", text: "Anger" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "James 2:1", explanation: "Impartial faith." },
  { id: "james29", question: "Favoring the rich over the poor is called?", options: [{ label: "A", text: "Injustice" }, { label: "B", text: "Sin" }, { label: "C", text: "Error" }, { label: "D", text: "Evil" }], correctAnswer: "B", verse: "James 2:9", explanation: "Violation of God's law." },
  { id: "james30", question: "The royal law is to love your neighbor as?", options: [{ label: "A", text: "Family" }, { label: "B", text: "Yourself" }, { label: "C", text: "Christ loved" }, { label: "D", text: "God loves" }], correctAnswer: "B", verse: "James 2:8", explanation: "Core command." },
  { id: "james31", question: "Breaking one part of the law makes a person guilty of breaking?", options: [{ label: "A", text: "Some of it" }, { label: "B", text: "Most of it" }, { label: "C", text: "All of it" }, { label: "D", text: "The commandments" }], correctAnswer: "C", verse: "James 2:10", explanation: "Unity of the law." },
  { id: "james32", question: "Faith without works is?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Incomplete" }, { label: "C", text: "Dead" }, { label: "D", text: "False" }], correctAnswer: "C", verse: "James 2:17", explanation: "Genuine faith acts." },
  { id: "james33", question: "Even the demons believe and?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Obey" }, { label: "C", text: "Tremble" }, { label: "D", text: "Know" }], correctAnswer: "C", verse: "James 2:19", explanation: "Belief alone is insufficient." },
  { id: "james34", question: "Abraham was considered righteous for what he?", options: [{ label: "A", text: "Believed" }, { label: "B", text: "Said" }, { label: "C", text: "Did" }, { label: "D", text: "Promised" }], correctAnswer: "C", verse: "James 2:21", explanation: "Faith expressed in action." },
  { id: "james35", question: "Rahab was justified by works when she?", options: [{ label: "A", text: "Believed" }, { label: "B", text: "Hid the spies" }, { label: "C", text: "Prayed" }, { label: "D", text: "Repented" }], correctAnswer: "B", verse: "James 2:25", explanation: "Action proved faith." },
  { id: "james36", question: "The tongue is described as a?", options: [{ label: "A", text: "Weapon" }, { label: "B", text: "Fire" }, { label: "C", text: "Tool" }, { label: "D", text: "Flame" }], correctAnswer: "B", verse: "James 3:6", explanation: "Powerful and destructive." },
  { id: "james37", question: "No human being can fully tame the?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Heart" }, { label: "C", text: "Tongue" }, { label: "D", text: "Flesh" }], correctAnswer: "C", verse: "James 3:8", explanation: "Need for discipline." },
  { id: "james38", question: "Wisdom that comes from heaven is first of all?", options: [{ label: "A", text: "Pure" }, { label: "B", text: "Peace-loving" }, { label: "C", text: "Gentle" }, { label: "D", text: "Considerate" }], correctAnswer: "A", verse: "James 3:17", explanation: "Godly wisdom." },
  { id: "james39", question: "Peacemakers who sow in peace reap a harvest of?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Faith" }, { label: "C", text: "Righteousness" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "James 3:18", explanation: "Fruit of peace." },
  { id: "james40", question: "Conflicts come from desires that?", options: [{ label: "A", text: "Compete" }, { label: "B", text: "Fight within" }, { label: "C", text: "Control" }, { label: "D", text: "Rule" }], correctAnswer: "B", verse: "James 4:1", explanation: "Inner struggle." },
  { id: "james41", question: "People do not receive because they?", options: [{ label: "A", text: "Doubt" }, { label: "B", text: "Ask wrongly" }, { label: "C", text: "Ask little" }, { label: "D", text: "Are unworthy" }], correctAnswer: "B", verse: "James 4:3", explanation: "Wrong motives." },
  { id: "james42", question: "Friendship with the world is enmity toward?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "God" }, { label: "D", text: "Christ" }], correctAnswer: "C", verse: "James 4:4", explanation: "Spiritual allegiance." },
  { id: "james43", question: "God opposes the proud but gives grace to the?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Lowly" }, { label: "C", text: "Humble" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "James 4:6", explanation: "Humility rewarded." },
  { id: "james44", question: "Resist the devil and he will?", options: [{ label: "A", text: "Submit" }, { label: "B", text: "Hide" }, { label: "C", text: "Leave" }, { label: "D", text: "Flee" }], correctAnswer: "D", verse: "James 4:7", explanation: "Spiritual resistance." },
  { id: "james45", question: "Humble yourselves before the Lord and He will?", options: [{ label: "A", text: "Strengthen you" }, { label: "B", text: "Forgive you" }, { label: "C", text: "Lift you up" }, { label: "D", text: "Bless you" }], correctAnswer: "C", verse: "James 4:10", explanation: "God exalts the humble." },
  { id: "james46", question: "Anyone who speaks against a brother or sister judges the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith" }, { label: "C", text: "Truth" }, { label: "D", text: "Church" }], correctAnswer: "A", verse: "James 4:11", explanation: "Usurping God's role." },
  { id: "james47", question: "Life is described as a?", options: [{ label: "A", text: "Breath" }, { label: "B", text: "Mist" }, { label: "C", text: "Shadow" }, { label: "D", text: "Vapor" }], correctAnswer: "B", verse: "James 4:14", explanation: "Short-lived existence." },
  { id: "james48", question: "Instead of boasting, believers should say 'If it is the Lord's?'", options: [{ label: "A", text: "Time" }, { label: "B", text: "Plan" }, { label: "C", text: "Will" }, { label: "D", text: "Way" }], correctAnswer: "C", verse: "James 4:15", explanation: "Submission to God." },
  { id: "james49", question: "Anyone who knows the good they ought to do and does not do it commits?", options: [{ label: "A", text: "Error" }, { label: "B", text: "Failure" }, { label: "C", text: "Sin" }, { label: "D", text: "Neglect" }], correctAnswer: "C", verse: "James 4:17", explanation: "Sin of omission." },
  { id: "james50", question: "The rich are warned to weep because of coming?", options: [{ label: "A", text: "Loss" }, { label: "B", text: "Judgment" }, { label: "C", text: "Poverty" }, { label: "D", text: "Hardship" }], correctAnswer: "B", verse: "James 5:1", explanation: "Accountability." },
  { id: "james51", question: "The wages withheld from workers are crying out against the?", options: [{ label: "A", text: "Rich" }, { label: "B", text: "Employers" }, { label: "C", text: "Landowners" }, { label: "D", text: "Masters" }], correctAnswer: "C", verse: "James 5:4", explanation: "Economic injustice." },
  { id: "james52", question: "The cries of the harvesters have reached the ears of the Lord?", options: [{ label: "A", text: "Almighty" }, { label: "B", text: "Holy" }, { label: "C", text: "Sovereign" }, { label: "D", text: "Of Hosts" }], correctAnswer: "D", verse: "James 5:4", explanation: "God hears injustice." },
  { id: "james53", question: "Believers are told to be patient until the Lord's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Reign" }, { label: "D", text: "Kingdom" }], correctAnswer: "B", verse: "James 5:7", explanation: "Hopeful waiting." },
  { id: "james54", question: "The farmer waits patiently for the?", options: [{ label: "A", text: "Harvest" }, { label: "B", text: "Rain" }, { label: "C", text: "Growth" }, { label: "D", text: "Seed" }], correctAnswer: "A", verse: "James 5:7", explanation: "Illustration of patience." },
  { id: "james55", question: "Do not grumble against one another or you will be?", options: [{ label: "A", text: "Disciplined" }, { label: "B", text: "Judged" }, { label: "C", text: "Condemned" }, { label: "D", text: "Corrected" }], correctAnswer: "B", verse: "James 5:9", explanation: "God judges." },
  { id: "james56", question: "The prophets are examples of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Strength" }, { label: "C", text: "Patience" }, { label: "D", text: "Endurance" }], correctAnswer: "D", verse: "James 5:10", explanation: "Suffering faithfully." },
  { id: "james57", question: "Job is an example of perseverance and the Lord's?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Compassion" }, { label: "D", text: "Justice" }], correctAnswer: "C", verse: "James 5:11", explanation: "God's compassion." },
  { id: "james58", question: "Above all, believers must not?", options: [{ label: "A", text: "Lie" }, { label: "B", text: "Swear" }, { label: "C", text: "Judge" }, { label: "D", text: "Boast" }], correctAnswer: "B", verse: "James 5:12", explanation: "Simple honesty." },
  { id: "james59", question: "If anyone is in trouble, they should?", options: [{ label: "A", text: "Ask for help" }, { label: "B", text: "Wait" }, { label: "C", text: "Pray" }, { label: "D", text: "Repent" }], correctAnswer: "C", verse: "James 5:13", explanation: "Prayer response." },
  { id: "james60", question: "If anyone is happy, they should sing?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Songs" }, { label: "C", text: "Hymns" }, { label: "D", text: "Joyfully" }], correctAnswer: "A", verse: "James 5:13", explanation: "Joyful worship." },
  { id: "james61", question: "If anyone is sick, they should call the elders to?", options: [{ label: "A", text: "Visit" }, { label: "B", text: "Pray" }, { label: "C", text: "Anoint" }, { label: "D", text: "Heal" }], correctAnswer: "B", verse: "James 5:14", explanation: "Prayer of faith." },
  { id: "james62", question: "The prayer offered in faith will make the sick person?", options: [{ label: "A", text: "Whole" }, { label: "B", text: "Better" }, { label: "C", text: "Well" }, { label: "D", text: "Strong" }], correctAnswer: "C", verse: "James 5:15", explanation: "God's healing." },
  { id: "james63", question: "If they have sinned, they will be?", options: [{ label: "A", text: "Restored" }, { label: "B", text: "Forgiven" }, { label: "C", text: "Healed" }, { label: "D", text: "Corrected" }], correctAnswer: "B", verse: "James 5:15", explanation: "Forgiveness included." },
  { id: "james64", question: "Believers should confess sins to one another and?", options: [{ label: "A", text: "Fast" }, { label: "B", text: "Pray" }, { label: "C", text: "Repent" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "James 5:16", explanation: "Mutual prayer." },
  { id: "james65", question: "The prayer of a righteous person is powerful and?", options: [{ label: "A", text: "Effective" }, { label: "B", text: "Faithful" }, { label: "C", text: "Strong" }, { label: "D", text: "Mighty" }], correctAnswer: "A", verse: "James 5:16", explanation: "Effectual prayer." },
  { id: "james66", question: "Elijah prayed earnestly that it would not?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Storm" }, { label: "C", text: "Thunder" }, { label: "D", text: "Flood" }], correctAnswer: "A", verse: "James 5:17", explanation: "Power of prayer." },
  { id: "james67", question: "The rain stopped for how long?", options: [{ label: "A", text: "One year" }, { label: "B", text: "Two years" }, { label: "C", text: "Three and a half years" }, { label: "D", text: "Seven years" }], correctAnswer: "C", verse: "James 5:17", explanation: "Scriptural timeframe." },
  { id: "james68", question: "Elijah prayed again and the heavens gave?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Clouds" }, { label: "C", text: "Storms" }, { label: "D", text: "Dew" }], correctAnswer: "A", verse: "James 5:18", explanation: "Answered prayer." },
  { id: "james69", question: "Turning a sinner from the error of their way will save them from?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Sin" }, { label: "C", text: "Death" }, { label: "D", text: "Punishment" }], correctAnswer: "C", verse: "James 5:20", explanation: "Restorative action." },
  { id: "james70", question: "Restoring a sinner covers over a multitude of?", options: [{ label: "A", text: "Mistakes" }, { label: "B", text: "Wrongs" }, { label: "C", text: "Failures" }, { label: "D", text: "Sins" }], correctAnswer: "D", verse: "James 5:20", explanation: "Grace in restoration." },
  { id: "james71", question: "James emphasizes that faith must be shown by?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Works" }, { label: "C", text: "Belief" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "James 2:18", explanation: "Living faith." },
  { id: "james72", question: "James contrasts heavenly wisdom with wisdom that is earthly and?", options: [{ label: "A", text: "Natural" }, { label: "B", text: "Foolish" }, { label: "C", text: "Selfish" }, { label: "D", text: "Demonic" }], correctAnswer: "D", verse: "James 3:15", explanation: "Source matters." },
  { id: "james73", question: "Heavenly wisdom is full of mercy and good?", options: [{ label: "A", text: "Works" }, { label: "B", text: "Faith" }, { label: "C", text: "Fruit" }, { label: "D", text: "Deeds" }], correctAnswer: "C", verse: "James 3:17", explanation: "Fruitful wisdom." },
  { id: "james74", question: "James strongly warns against the misuse of the?", options: [{ label: "A", text: "Mind" }, { label: "B", text: "Heart" }, { label: "C", text: "Tongue" }, { label: "D", text: "Eyes" }], correctAnswer: "C", verse: "James 3", explanation: "Speech discipline." },
  { id: "james75", question: "James teaches that boasting about tomorrow is?", options: [{ label: "A", text: "Foolish" }, { label: "B", text: "Arrogant" }, { label: "C", text: "Evil" }, { label: "D", text: "Sinful" }], correctAnswer: "C", verse: "James 4:16", explanation: "Pride condemned." },
  { id: "james76", question: "The rich are condemned for living in?", options: [{ label: "A", text: "Luxury" }, { label: "B", text: "Pleasure" }, { label: "C", text: "Self-indulgence" }, { label: "D", text: "Comfort" }], correctAnswer: "C", verse: "James 5:5", explanation: "Self-centered living." },
  { id: "james77", question: "James calls believers to patience like a?", options: [{ label: "A", text: "Shepherd" }, { label: "B", text: "Farmer" }, { label: "C", text: "Servant" }, { label: "D", text: "Watchman" }], correctAnswer: "B", verse: "James 5:7", explanation: "Waiting for harvest." },
  { id: "james78", question: "Complaining against one another invites?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Correction" }, { label: "C", text: "Judgment" }, { label: "D", text: "Conflict" }], correctAnswer: "C", verse: "James 5:9", explanation: "God judges." },
  { id: "james79", question: "James reminds believers that suffering prophets spoke in the name of the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Covenant" }, { label: "C", text: "Lord" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "James 5:10", explanation: "Faithful obedience." },
  { id: "james80", question: "James emphasizes prayer in times of trouble, sickness, and?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Need" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "A", verse: "James 5:13", explanation: "Prayer-centered life." },
  { id: "james81", question: "Confession and prayer among believers leads to?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Healing" }, { label: "C", text: "Restoration" }, { label: "D", text: "Forgiveness" }], correctAnswer: "B", verse: "James 5:16", explanation: "Spiritual and physical healing." },
  { id: "james82", question: "James highlights Elijah to show the power of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Obedience" }, { label: "C", text: "Prayer" }, { label: "D", text: "Righteousness" }], correctAnswer: "C", verse: "James 5:17", explanation: "Effective prayer." },
  { id: "james83", question: "James stresses responsibility to help those who wander from the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Path" }], correctAnswer: "B", verse: "James 5:19", explanation: "Spiritual care." },
  { id: "james84", question: "The book of James focuses heavily on practical?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Living" }, { label: "D", text: "Teaching" }], correctAnswer: "C", verse: "James 1-5", explanation: "Faith in action." },
  { id: "james85", question: "James repeatedly links belief with?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Action" }, { label: "C", text: "Emotion" }, { label: "D", text: "Speech" }], correctAnswer: "B", verse: "James 2", explanation: "Active faith." },
  { id: "james86", question: "James challenges believers to control their?", options: [{ label: "A", text: "Thoughts" }, { label: "B", text: "Tongue" }, { label: "C", text: "Desires" }, { label: "D", text: "Actions" }], correctAnswer: "B", verse: "James 3", explanation: "Speech discipline." },
  { id: "james87", question: "James warns that unchecked desire leads to?", options: [{ label: "A", text: "Sin and death" }, { label: "B", text: "Pain" }, { label: "C", text: "Failure" }, { label: "D", text: "Loss" }], correctAnswer: "A", verse: "James 1:15", explanation: "Sin's progression." },
  { id: "james88", question: "Humility before God results in?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Blessing" }, { label: "C", text: "Exaltation" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "James 4:10", explanation: "God lifts the humble." },
  { id: "james89", question: "James teaches that wealth is?", options: [{ label: "A", text: "Evil" }, { label: "B", text: "Temporary" }, { label: "C", text: "Dangerous" }, { label: "D", text: "Unreliable" }], correctAnswer: "B", verse: "James 1:10", explanation: "Fleeting riches." },
  { id: "james90", question: "James emphasizes endurance until the Lord is?", options: [{ label: "A", text: "Glorified" }, { label: "B", text: "Revealed" }, { label: "C", text: "Near" }, { label: "D", text: "Coming" }], correctAnswer: "D", verse: "James 5:8", explanation: "Hopeful waiting." },
  { id: "james91", question: "The overall theme of James is?", options: [{ label: "A", text: "Salvation by works" }, { label: "B", text: "Faith demonstrated through action" }, { label: "C", text: "Obedience to the law" }, { label: "D", text: "Wisdom literature" }], correctAnswer: "B", verse: "James 2:17", explanation: "Faith that works." },
  { id: "james92", question: "James calls believers to integrity in?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Action" }, { label: "C", text: "Faith" }, { label: "D", text: "All areas" }], correctAnswer: "D", verse: "James 1-5", explanation: "Whole-life faith." },
  { id: "james93", question: "James highlights obedience as evidence of true?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Faith" }, { label: "D", text: "Righteousness" }], correctAnswer: "C", verse: "James 2", explanation: "Authentic belief." },
  { id: "james94", question: "James warns against arrogance in planning because life is?", options: [{ label: "A", text: "Fragile" }, { label: "B", text: "Short" }, { label: "C", text: "Uncertain" }, { label: "D", text: "Temporary" }], correctAnswer: "C", verse: "James 4:14", explanation: "Dependence on God." },
  { id: "james95", question: "James encourages believers to endure suffering with?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Joy" }, { label: "C", text: "Patience" }, { label: "D", text: "Hope" }], correctAnswer: "C", verse: "James 5:7", explanation: "Patient endurance." },
  { id: "james96", question: "James presents prayer as central to the believer's?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Faith" }, { label: "C", text: "Life" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "James 5", explanation: "Prayerful living." },
  { id: "james97", question: "James emphasizes community responsibility for spiritual?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Care" }, { label: "C", text: "Accountability" }, { label: "D", text: "Support" }], correctAnswer: "B", verse: "James 5:19-20", explanation: "Restoring others." },
  { id: "james98", question: "James teaches that obedience flows from genuine?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Belief" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Knowledge" }], correctAnswer: "A", verse: "James 2:26", explanation: "Faith alive." },
  { id: "james99", question: "The message of James strongly challenges passive?", options: [{ label: "A", text: "Belief" }, { label: "B", text: "Religion" }, { label: "C", text: "Faith" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "James 2", explanation: "Active faith required." },
  { id: "james100", question: "The book of James ends by emphasizing restoration and?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Prayer" }, { label: "C", text: "Forgiveness" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "James 5:20", explanation: "Redemptive care." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JamesTriviaPage() {
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
        
        // Fetch user's progress for james questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'james');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'james' });
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
            book: 'james'
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
    if (score === 10) return "Perfect! You're a James expert!";
    if (score >= 8) return "Excellent! You know James well!";
    if (score >= 6) return "Good job! Keep studying James!";
    if (score >= 4) return "Nice try! James has much to explore!";
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
              href="/bible-trivia/james"
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
