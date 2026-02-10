"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
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
  { id: "psalm1", question: "What does Psalm 1 contrast?", options: [{ label: "A", text: "Kings and prophets" }, { label: "B", text: "The righteous and the wicked" }, { label: "C", text: "Law and grace" }, { label: "D", text: "Israel and nations" }], correctAnswer: "B", verse: "Psalm 1:1", explanation: "Psalm 1 contrasts two paths." },
  { id: "psalm2", question: "What brings blessing in Psalm 1?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Meditating on the law" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Psalm 1:2", explanation: "Delighting in God's law brings blessing." },
  { id: "psalm3", question: "What are the wicked compared to?", options: [{ label: "A", text: "Trees" }, { label: "B", text: "Chaff" }, { label: "C", text: "Stone" }, { label: "D", text: "Dust" }], correctAnswer: "B", verse: "Psalm 1:4", explanation: "The wicked are unstable like chaff." },
  { id: "psalm4", question: "Who wrote many of the Psalms?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Moses" }, { label: "C", text: "David" }, { label: "D", text: "Isaiah" }], correctAnswer: "C", verse: "Psalm titles", explanation: "David authored many psalms." },
  { id: "psalm5", question: "What do the nations do in Psalm 2?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Plot rebellion" }, { label: "C", text: "Repent" }, { label: "D", text: "Pray" }], correctAnswer: "B", verse: "Psalm 2:1", explanation: "The nations rage against God." },
  { id: "psalm6", question: "Who laughs at the rebellion of nations?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The king" }, { label: "C", text: "The Lord" }, { label: "D", text: "Prophets" }], correctAnswer: "C", verse: "Psalm 2:4", explanation: "God reigns sovereignly." },
  { id: "psalm7", question: "Who is declared God's Son in Psalm 2?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "The anointed king" }, { label: "D", text: "Israel" }], correctAnswer: "C", verse: "Psalm 2:7", explanation: "Psalm 2 is messianic." },
  { id: "psalm8", question: "What does Psalm 3 focus on?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Deliverance from enemies" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 3", explanation: "David cries out during distress." },
  { id: "psalm9", question: "Who shields David in Psalm 3?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The army" }, { label: "C", text: "The Lord" }, { label: "D", text: "Friends" }], correctAnswer: "C", verse: "Psalm 3:3", explanation: "God is David's shield." },
  { id: "psalm10", question: "What does David do in Psalm 4?", options: [{ label: "A", text: "Complains" }, { label: "B", text: "Prays and rests" }, { label: "C", text: "Fights" }, { label: "D", text: "Runs" }], correctAnswer: "B", verse: "Psalm 4", explanation: "David trusts God and sleeps in peace." },
  { id: "psalm11", question: "What does Psalm 5 emphasize?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "God hears prayer" }, { label: "C", text: "Warfare" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 5:3", explanation: "God listens to the righteous." },
  { id: "psalm12", question: "What does Psalm 6 express?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Lament and repentance" }, { label: "C", text: "Victory" }, { label: "D", text: "Instruction" }], correctAnswer: "B", verse: "Psalm 6", explanation: "David pleads for mercy." },
  { id: "psalm13", question: "What question repeats in Psalm 13?", options: [{ label: "A", text: "Why me?" }, { label: "B", text: "How long?" }, { label: "C", text: "Where are you?" }, { label: "D", text: "Who sinned?" }], correctAnswer: "B", verse: "Psalm 13:1", explanation: "David asks how long suffering will last." },
  { id: "psalm14", question: "What does the fool say?", options: [{ label: "A", text: "God is silent" }, { label: "B", text: "There is no God" }, { label: "C", text: "God is cruel" }, { label: "D", text: "God is far" }], correctAnswer: "B", verse: "Psalm 14:1", explanation: "Denial of God defines folly." },
  { id: "psalm15", question: "Who may dwell with the Lord?", options: [{ label: "A", text: "The rich" }, { label: "B", text: "The righteous" }, { label: "C", text: "The strong" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Psalm 15", explanation: "Integrity defines God's people." },
  { id: "psalm16", question: "What does Psalm 16 celebrate?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Security in God" }, { label: "C", text: "Victory" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Psalm 16:1", explanation: "God is a refuge." },
  { id: "psalm17", question: "What does David ask for in Psalm 17?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Protection" }, { label: "C", text: "Wealth" }, { label: "D", text: "Revenge" }], correctAnswer: "B", verse: "Psalm 17", explanation: "David seeks God's defense." },
  { id: "psalm18", question: "What does Psalm 18 praise?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Deliverance from enemies" }, { label: "C", text: "Temple worship" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 18", explanation: "God rescues David." },
  { id: "psalm19", question: "What declares God's glory in Psalm 19?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "The heavens" }, { label: "C", text: "The law" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Psalm 19:1", explanation: "Creation reveals God." },
  { id: "psalm20", question: "What does Psalm 19 also praise?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "The law of the Lord" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Psalm 19:7", explanation: "God's law revives the soul." },
  { id: "psalm21", question: "What does Psalm 20 focus on?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Victory in battle" }, { label: "C", text: "Repentance" }, { label: "D", text: "Instruction" }], correctAnswer: "B", verse: "Psalm 20", explanation: "Trust in God for victory." },
  { id: "psalm22", question: "What famous cry opens Psalm 22?", options: [{ label: "A", text: "Hear me Lord" }, { label: "B", text: "Why have you forsaken me?" }, { label: "C", text: "Save me" }, { label: "D", text: "I trust you" }], correctAnswer: "B", verse: "Psalm 22:1", explanation: "A psalm of suffering." },
  { id: "psalm23", question: "Who is the shepherd in Psalm 23?", options: [{ label: "A", text: "David" }, { label: "B", text: "The Lord" }, { label: "C", text: "Israel" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Psalm 23:1", explanation: "The Lord shepherds His people." },
  { id: "psalm24", question: "What belongs to the Lord in Psalm 24?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "The earth and everything in it" }, { label: "C", text: "The temple" }, { label: "D", text: "The heavens only" }], correctAnswer: "B", verse: "Psalm 24:1", explanation: "God owns all creation." },
  { id: "psalm25", question: "What theme dominates Psalm 25?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Guidance and forgiveness" }, { label: "C", text: "Victory" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 25", explanation: "David seeks God's guidance." },
  { id: "psalm26", question: "What does David claim in Psalm 26?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Integrity" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Royal authority" }], correctAnswer: "B", verse: "Psalm 26:1", explanation: "David walks in integrity." },
  { id: "psalm27", question: "Who is David's light and salvation?", options: [{ label: "A", text: "The army" }, { label: "B", text: "The Lord" }, { label: "C", text: "The law" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Psalm 27:1", explanation: "The Lord is David's confidence." },
  { id: "psalm28", question: "What does Psalm 27 encourage?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Waiting on the Lord" }, { label: "C", text: "Action" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Psalm 27:14", explanation: "Wait on the Lord." },
  { id: "psalm29", question: "What does Psalm 28 express?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "A cry for help" }, { label: "C", text: "Law" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Psalm 28", explanation: "David seeks God's help." },
  { id: "psalm30", question: "What does Psalm 29 describe?", options: [{ label: "A", text: "God's law" }, { label: "B", text: "God's voice and power" }, { label: "C", text: "Repentance" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Psalm 29", explanation: "God's voice is powerful." },
  { id: "psalm31", question: "What does David entrust to God in Psalm 31?", options: [{ label: "A", text: "His future" }, { label: "B", text: "His spirit" }, { label: "C", text: "His kingdom" }, { label: "D", text: "His wealth" }], correctAnswer: "B", verse: "Psalm 31:5", explanation: "David commits his life to God." },
  { id: "psalm32", question: "What brings happiness in Psalm 32?", options: [{ label: "A", text: "Success" }, { label: "B", text: "Forgiveness of sin" }, { label: "C", text: "Power" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Psalm 32:1", explanation: "Forgiven sin brings joy." },
  { id: "psalm33", question: "What does Psalm 33 call people to do?", options: [{ label: "A", text: "Fear kings" }, { label: "B", text: "Praise the Lord" }, { label: "C", text: "Obey the law" }, { label: "D", text: "Seek wisdom" }], correctAnswer: "B", verse: "Psalm 33:1", explanation: "Praise flows from God's faithfulness." },
  { id: "psalm34", question: "What does Psalm 34 encourage?", options: [{ label: "A", text: "Taste and see that the Lord is good" }, { label: "B", text: "Fear enemies" }, { label: "C", text: "Trust wealth" }, { label: "D", text: "Seek power" }], correctAnswer: "A", verse: "Psalm 34:8", explanation: "God's goodness is experienced personally." },
  { id: "psalm35", question: "What does David ask for in Psalm 35?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Deliverance from enemies" }, { label: "C", text: "Forgiveness" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Psalm 35", explanation: "David seeks God's defense." },
  { id: "psalm36", question: "What does Psalm 36 contrast?", options: [{ label: "A", text: "Heaven and earth" }, { label: "B", text: "Human wickedness and God's love" }, { label: "C", text: "Law and grace" }, { label: "D", text: "Kings and prophets" }], correctAnswer: "B", verse: "Psalm 36", explanation: "God's love surpasses human sin." },
  { id: "psalm37", question: "What does Psalm 37 warn against?", options: [{ label: "A", text: "Fear of God" }, { label: "B", text: "Fretting over the wicked" }, { label: "C", text: "Obedience" }, { label: "D", text: "Patience" }], correctAnswer: "B", verse: "Psalm 37:1", explanation: "Do not envy evildoers." },
  { id: "psalm38", question: "What theme dominates Psalm 38?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Confession and suffering" }, { label: "C", text: "Victory" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Psalm 38", explanation: "David confesses his sin." },
  { id: "psalm39", question: "What does David reflect on in Psalm 39?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "The brevity of life" }, { label: "C", text: "Kingship" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 39", explanation: "Life is fleeting." },
  { id: "psalm40", question: "What does Psalm 40 celebrate?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Deliverance and obedience" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 40", explanation: "Obedience matters more than sacrifice." },
  { id: "psalm41", question: "Who is blessed in Psalm 41?", options: [{ label: "A", text: "The wealthy" }, { label: "B", text: "Those who care for the poor" }, { label: "C", text: "The strong" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Psalm 41:1", explanation: "Care for the needy pleases God." },
  { id: "psalm42", question: "What image describes longing for God?", options: [{ label: "A", text: "A bird" }, { label: "B", text: "A deer for water" }, { label: "C", text: "A child" }, { label: "D", text: "A shepherd" }], correctAnswer: "B", verse: "Psalm 42:1", explanation: "Deep thirst for God." },
  { id: "psalm43", question: "What refrain appears in Psalms 42-43?", options: [{ label: "A", text: "Praise the Lord" }, { label: "B", text: "Why are you downcast, O my soul?" }, { label: "C", text: "Trust the law" }, { label: "D", text: "God is king" }], correctAnswer: "B", verse: "Psalm 42:5", explanation: "Hope in God is reaffirmed." },
  { id: "psalm44", question: "What does Psalm 44 recount?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Past victories and present defeat" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 44", explanation: "A national lament." },
  { id: "psalm45", question: "What is Psalm 45 primarily?", options: [{ label: "A", text: "A lament" }, { label: "B", text: "A royal wedding song" }, { label: "C", text: "A confession" }, { label: "D", text: "A prayer" }], correctAnswer: "B", verse: "Psalm 45", explanation: "Celebrates the king." },
  { id: "psalm46", question: "What famous phrase appears in Psalm 46?", options: [{ label: "A", text: "The Lord is my shepherd" }, { label: "B", text: "Be still and know that I am God" }, { label: "C", text: "Taste and see" }, { label: "D", text: "The earth is the Lord's" }], correctAnswer: "B", verse: "Psalm 46:10", explanation: "God reigns over all." },
  { id: "psalm47", question: "What does Psalm 47 call nations to do?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Clap and praise God" }, { label: "C", text: "Fear Israel" }, { label: "D", text: "Submit to kings" }], correctAnswer: "B", verse: "Psalm 47:1", explanation: "God is king over all nations." },
  { id: "psalm48", question: "What city is praised in Psalm 48?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Samaria" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Psalm 48", explanation: "God's city is exalted." },
  { id: "psalm49", question: "What does Psalm 49 warn about?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "Trusting in riches" }, { label: "C", text: "Kings" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Psalm 49", explanation: "Wealth cannot save." },
  { id: "psalm50", question: "What does Psalm 50 emphasize?", options: [{ label: "A", text: "Sacrifice alone" }, { label: "B", text: "True worship and obedience" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 50", explanation: "God desires sincere worship." },
  { id: "psalm51", question: "What is Psalm 51?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "A confession of sin" }, { label: "C", text: "A victory song" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Psalm 51", explanation: "David repents after sin." },
  { id: "psalm52", question: "What does Psalm 52 condemn?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Boasting in evil" }, { label: "C", text: "Weakness" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Psalm 52", explanation: "Evil pride is rebuked." },
  { id: "psalm53", question: "What repeats from Psalm 14 in Psalm 53?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "The fool says there is no God" }, { label: "C", text: "Victory" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 53:1", explanation: "Human folly is repeated." },
  { id: "psalm54", question: "What does Psalm 54 ask for?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Deliverance" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Psalm 54", explanation: "A cry for help." },
  { id: "psalm55", question: "What emotion dominates Psalm 55?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Betrayal and distress" }, { label: "C", text: "Peace" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "Psalm 55", explanation: "David grieves betrayal." },
  { id: "psalm56", question: "What does David choose over fear?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Trust in God" }, { label: "C", text: "Escape" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Psalm 56:3", explanation: "Trust replaces fear." },
  { id: "psalm57", question: "Where does David seek refuge?", options: [{ label: "A", text: "In the cave" }, { label: "B", text: "Under God's wings" }, { label: "C", text: "In the city" }, { label: "D", text: "With friends" }], correctAnswer: "B", verse: "Psalm 57:1", explanation: "God is a refuge." },
  { id: "psalm58", question: "What does Psalm 58 address?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Injustice of rulers" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 58", explanation: "Corrupt judges are condemned." },
  { id: "psalm59", question: "What does Psalm 59 ask God to do?", options: [{ label: "A", text: "Forgive" }, { label: "B", text: "Deliver from enemies" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Judge Israel" }], correctAnswer: "B", verse: "Psalm 59", explanation: "God is asked to rescue." },
  { id: "psalm60", question: "What does Psalm 60 reflect?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "National defeat and hope" }, { label: "C", text: "Creation" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 60", explanation: "Hope after defeat." },
  { id: "psalm61", question: "What does David ask for in Psalm 61?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Refuge and protection" }, { label: "C", text: "Victory" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Psalm 61", explanation: "God is a strong tower." },
  { id: "psalm62", question: "In whom does David find rest?", options: [{ label: "A", text: "The army" }, { label: "B", text: "God alone" }, { label: "C", text: "Friends" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Psalm 62:1", explanation: "Rest comes from God alone." },
  { id: "psalm63", question: "What does David thirst for?", options: [{ label: "A", text: "Water" }, { label: "B", text: "God" }, { label: "C", text: "Justice" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Psalm 63:1", explanation: "A deep longing for God." },
  { id: "psalm64", question: "What does Psalm 64 ask God to do?", options: [{ label: "A", text: "Judge enemies" }, { label: "B", text: "Forgive" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Bless the wicked" }], correctAnswer: "A", verse: "Psalm 64", explanation: "God is asked to act against evil." },
  { id: "psalm65", question: "What does Psalm 65 celebrate?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "God's provision and creation" }, { label: "C", text: "Law" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Psalm 65", explanation: "God provides abundantly." },
  { id: "psalm66", question: "What does Psalm 66 call all the earth to do?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Praise God" }, { label: "C", text: "Repent" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Psalm 66:1", explanation: "Universal praise is called for." },
  { id: "psalm67", question: "What is the purpose of God's blessing in Psalm 67?", options: [{ label: "A", text: "Comfort Israel" }, { label: "B", text: "So nations know God" }, { label: "C", text: "Increase wealth" }, { label: "D", text: "Defeat enemies" }], correctAnswer: "B", verse: "Psalm 67:2", explanation: "Blessing spreads God's fame." },
  { id: "psalm68", question: "What does Psalm 68 celebrate?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "God's victory and reign" }, { label: "C", text: "Law" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Psalm 68", explanation: "God triumphs." },
  { id: "psalm69", question: "What emotion dominates Psalm 69?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Deep distress" }, { label: "C", text: "Peace" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "Psalm 69", explanation: "A cry from suffering." },
  { id: "psalm70", question: "What is Psalm 70?", options: [{ label: "A", text: "A praise song" }, { label: "B", text: "A plea for quick help" }, { label: "C", text: "A teaching" }, { label: "D", text: "A prophecy" }], correctAnswer: "B", verse: "Psalm 70", explanation: "Urgent prayer for deliverance." },
  { id: "psalm71", question: "What does Psalm 71 emphasize?", options: [{ label: "A", text: "Youth" }, { label: "B", text: "Lifelong trust in God" }, { label: "C", text: "Victory" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 71", explanation: "Trust in God from youth to old age." },
  { id: "psalm72", question: "Who is Psalm 72 associated with?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Moses" }, { label: "D", text: "Asaph" }], correctAnswer: "B", verse: "Psalm 72", explanation: "A prayer for Solomon's reign." },
  { id: "psalm73", question: "What problem troubles the psalmist?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "Prosperity of the wicked" }, { label: "C", text: "Illness" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Psalm 73", explanation: "Why the wicked prosper." },
  { id: "psalm74", question: "What does Psalm 74 lament?", options: [{ label: "A", text: "Personal sin" }, { label: "B", text: "Destruction of the sanctuary" }, { label: "C", text: "Exile" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 74", explanation: "National lament." },
  { id: "psalm75", question: "Who controls exaltation?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "God" }, { label: "C", text: "The army" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Psalm 75:6-7", explanation: "God raises and lowers." },
  { id: "psalm76", question: "What does Psalm 76 declare?", options: [{ label: "A", text: "God's silence" }, { label: "B", text: "God's power in judgment" }, { label: "C", text: "Law" }, { label: "D", text: "Creation" }], correctAnswer: "B", verse: "Psalm 76", explanation: "God defeats enemies." },
  { id: "psalm77", question: "What does the psalmist remember for comfort?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "God's past deeds" }, { label: "C", text: "Law" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Psalm 77", explanation: "Remembering God brings hope." },
  { id: "psalm78", question: "What does Psalm 78 recount?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "Israel's history" }, { label: "C", text: "Kingship" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 78", explanation: "A historical psalm." },
  { id: "psalm79", question: "What does Psalm 79 lament?", options: [{ label: "A", text: "Personal sin" }, { label: "B", text: "Jerusalem's destruction" }, { label: "C", text: "Exile" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 79", explanation: "A communal lament." },
  { id: "psalm80", question: "What title is given to God?", options: [{ label: "A", text: "King of kings" }, { label: "B", text: "Shepherd of Israel" }, { label: "C", text: "Creator" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Psalm 80:1", explanation: "God shepherds His people." },
  { id: "psalm81", question: "What does Psalm 81 call Israel to do?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Listen to God" }, { label: "C", text: "Fast" }, { label: "D", text: "Fight" }], correctAnswer: "B", verse: "Psalm 81", explanation: "Obedience brings blessing." },
  { id: "psalm82", question: "Who does God judge in Psalm 82?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Unjust rulers" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Psalm 82", explanation: "God condemns injustice." },
  { id: "psalm83", question: "What does Psalm 83 ask God to do?", options: [{ label: "A", text: "Remain silent" }, { label: "B", text: "Defeat enemies" }, { label: "C", text: "Forgive" }, { label: "D", text: "Bless nations" }], correctAnswer: "B", verse: "Psalm 83", explanation: "A plea for deliverance." },
  { id: "psalm84", question: "What does Psalm 84 express?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Love for God's dwelling" }, { label: "C", text: "Anger" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Psalm 84", explanation: "Longing for God's presence." },
  { id: "psalm85", question: "What does Psalm 85 pray for?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Restoration" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Psalm 85", explanation: "Hope for renewal." },
  { id: "psalm86", question: "What does David ask for in Psalm 86?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Mercy and guidance" }, { label: "C", text: "Victory" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Psalm 86", explanation: "A humble prayer." },
  { id: "psalm87", question: "What city is celebrated in Psalm 87?", options: [{ label: "A", text: "Bethlehem" }, { label: "B", text: "Zion" }, { label: "C", text: "Samaria" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Psalm 87", explanation: "Zion is exalted." },
  { id: "psalm88", question: "What is unique about Psalm 88?", options: [{ label: "A", text: "Ends in praise" }, { label: "B", text: "Contains no resolution" }, { label: "C", text: "Celebrates victory" }, { label: "D", text: "Focuses on law" }], correctAnswer: "B", verse: "Psalm 88", explanation: "A dark lament." },
  { id: "psalm89", question: "What covenant is remembered?", options: [{ label: "A", text: "Abrahamic" }, { label: "B", text: "Davidic" }, { label: "C", text: "Mosaic" }, { label: "D", text: "Noahic" }], correctAnswer: "B", verse: "Psalm 89", explanation: "God's promise to David." },
  { id: "psalm90", question: "Who wrote Psalm 90?", options: [{ label: "A", text: "David" }, { label: "B", text: "Moses" }, { label: "C", text: "Solomon" }, { label: "D", text: "Asaph" }], correctAnswer: "B", verse: "Psalm 90", explanation: "A prayer of Moses." },
  { id: "psalm91", question: "What does Psalm 91 emphasize?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "God's protection" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Psalm 91", explanation: "God shelters His people." },
  { id: "psalm92", question: "What is Psalm 92?", options: [{ label: "A", text: "A lament" }, { label: "B", text: "A Sabbath song" }, { label: "C", text: "A confession" }, { label: "D", text: "A prophecy" }], correctAnswer: "B", verse: "Psalm 92", explanation: "Praise for God's works." },
  { id: "psalm93", question: "What does Psalm 93 declare?", options: [{ label: "A", text: "God is silent" }, { label: "B", text: "The Lord reigns" }, { label: "C", text: "Law is supreme" }, { label: "D", text: "Israel reigns" }], correctAnswer: "B", verse: "Psalm 93", explanation: "God reigns eternally." },
  { id: "psalm94", question: "What does Psalm 94 call God?", options: [{ label: "A", text: "Shepherd" }, { label: "B", text: "God of vengeance" }, { label: "C", text: "King" }, { label: "D", text: "Creator" }], correctAnswer: "B", verse: "Psalm 94:1", explanation: "God brings justice." },
  { id: "psalm95", question: "What does Psalm 95 warn against?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Hardening the heart" }, { label: "C", text: "Silence" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Psalm 95:8", explanation: "Do not harden your heart." },
  { id: "psalm96", question: "What does Psalm 96 call nations to do?", options: [{ label: "A", text: "Fear Israel" }, { label: "B", text: "Sing to the Lord" }, { label: "C", text: "Submit to kings" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Psalm 96:1", explanation: "A global call to worship." },
  { id: "psalm97", question: "What does Psalm 97 declare?", options: [{ label: "A", text: "Law is supreme" }, { label: "B", text: "The Lord reigns" }, { label: "C", text: "Kings rule" }, { label: "D", text: "Israel is powerful" }], correctAnswer: "B", verse: "Psalm 97:1", explanation: "God reigns over all." },
  { id: "psalm98", question: "Why sing a new song?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "God has done marvelous things" }, { label: "C", text: "Victory in war" }, { label: "D", text: "Law obedience" }], correctAnswer: "B", verse: "Psalm 98:1", explanation: "God's salvation is celebrated." },
  { id: "psalm99", question: "What does Psalm 99 emphasize?", options: [{ label: "A", text: "God's holiness" }, { label: "B", text: "Human wisdom" }, { label: "C", text: "Kingship of Israel" }, { label: "D", text: "Law" }], correctAnswer: "A", verse: "Psalm 99", explanation: "Holy is the Lord." },
  { id: "psalm100", question: "What does Psalm 100 call people to do?", options: [{ label: "A", text: "Fear God" }, { label: "B", text: "Worship with joy" }, { label: "C", text: "Fast" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Psalm 100", explanation: "Joyful worship is commanded." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PsalmsTriviaPage() {
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
          .eq("book", "psalms");

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
          book: "psalms",
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
            book: "psalms",
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
    if (score === 10) return "Perfect! You're a Psalms expert!";
    if (score >= 8) return "Excellent! You know Psalms well!";
    if (score >= 6) return "Good job! Keep studying Psalms!";
    if (score >= 4) return "Nice try! Psalms has much to explore!";
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
              href="/bible-trivia/psalms"
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






