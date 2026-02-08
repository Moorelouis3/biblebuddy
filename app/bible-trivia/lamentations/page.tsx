"use client";

import { useEffect, useState } from "react";
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

async function fetchVerseText(reference: string): Promise<string> {
  try {
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, "+");
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
  { id: "lamentations1", question: "Who is traditionally credited as the author of Lamentations?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Jeremiah" }, { label: "C", text: "Ezekiel" }, { label: "D", text: "Daniel" }], correctAnswer: "B", verse: "Lamentations 1", explanation: "Jeremiah is traditionally identified as the author." },
  { id: "lamentations2", question: "What event is lamented throughout the book?", options: [{ label: "A", text: "Assyrian invasion" }, { label: "B", text: "Fall of Jerusalem" }, { label: "C", text: "Exodus" }, { label: "D", text: "Temple dedication" }], correctAnswer: "B", verse: "Lamentations 1", explanation: "The book mourns Jerusalem's destruction." },
  { id: "lamentations3", question: "How many chapters are in Lamentations?", options: [{ label: "A", text: "3" }, { label: "B", text: "4" }, { label: "C", text: "5" }, { label: "D", text: "6" }], correctAnswer: "C", verse: "Lamentations", explanation: "Lamentations has five chapters." },
  { id: "lamentations4", question: "What literary style dominates Lamentations?", options: [{ label: "A", text: "Narrative" }, { label: "B", text: "Acrostic poetry" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Lamentations 1-4", explanation: "The first four chapters are acrostic poems." },
  { id: "lamentations5", question: "How is Jerusalem personified?", options: [{ label: "A", text: "A queen" }, { label: "B", text: "A widow" }, { label: "C", text: "A servant" }, { label: "D", text: "A child" }], correctAnswer: "B", verse: "Lamentations 1:1", explanation: "Jerusalem is portrayed as a grieving widow." },
  { id: "lamentations6", question: "What has Jerusalem lost?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Her people" }, { label: "C", text: "Her allies" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Lamentations 1", explanation: "Jerusalem's loss is total." },
  { id: "lamentations7", question: "Who is acknowledged as causing Jerusalem's suffering?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "The Lord" }, { label: "C", text: "False prophets" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Lamentations 1:12", explanation: "God's judgment is acknowledged." },
  { id: "lamentations8", question: "Why did Jerusalem suffer?", options: [{ label: "A", text: "Weak defenses" }, { label: "B", text: "Great sin" }, { label: "C", text: "Poor leadership" }, { label: "D", text: "Bad alliances" }], correctAnswer: "B", verse: "Lamentations 1:5", explanation: "Sin brought judgment." },
  { id: "lamentations9", question: "What emotion dominates chapter 1?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Grief" }, { label: "C", text: "Hope" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Lamentations 1", explanation: "Grief fills the chapter." },
  { id: "lamentations10", question: "Who has become Jerusalem's enemy?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "Lamentations 1:5", explanation: "Babylon conquered Jerusalem." },
  { id: "lamentations11", question: "What has happened to the temple?", options: [{ label: "A", text: "Expanded" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Abandoned" }, { label: "D", text: "Rebuilt" }], correctAnswer: "B", verse: "Lamentations 2:7", explanation: "The temple was destroyed." },
  { id: "lamentations12", question: "What does God pour out in His anger?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Judgment" }, { label: "C", text: "Wrath" }, { label: "D", text: "Plague" }], correctAnswer: "C", verse: "Lamentations 2:4", explanation: "God's wrath is described vividly." },
  { id: "lamentations13", question: "What happened to Jerusalem's walls?", options: [{ label: "A", text: "Strengthened" }, { label: "B", text: "Torn down" }, { label: "C", text: "Ignored" }, { label: "D", text: "Expanded" }], correctAnswer: "B", verse: "Lamentations 2:8", explanation: "The walls fell." },
  { id: "lamentations14", question: "Who failed to warn Jerusalem properly?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "False prophets" }, { label: "C", text: "Kings" }, { label: "D", text: "Elders" }], correctAnswer: "B", verse: "Lamentations 2:14", explanation: "False prophets gave false hope." },
  { id: "lamentations15", question: "What are children crying for?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Food" }, { label: "C", text: "Comfort" }, { label: "D", text: "Safety" }], correctAnswer: "B", verse: "Lamentations 2:11-12", explanation: "Famine devastates the city." },
  { id: "lamentations16", question: "What does the author call Jerusalem to do?", options: [{ label: "A", text: "Rebuild" }, { label: "B", text: "Cry out to the Lord" }, { label: "C", text: "Flee" }, { label: "D", text: "Fight back" }], correctAnswer: "B", verse: "Lamentations 2:18-19", explanation: "Prayer is urged." },
  { id: "lamentations17", question: "What chapter shifts toward personal suffering?", options: [{ label: "A", text: "Chapter 1" }, { label: "B", text: "Chapter 2" }, { label: "C", text: "Chapter 3" }, { label: "D", text: "Chapter 4" }], correctAnswer: "C", verse: "Lamentations 3", explanation: "Chapter 3 focuses on individual lament." },
  { id: "lamentations18", question: "What image describes suffering in chapter 3?", options: [{ label: "A", text: "Broken bones" }, { label: "B", text: "Darkness and chains" }, { label: "C", text: "Storm and flood" }, { label: "D", text: "Fire and smoke" }], correctAnswer: "B", verse: "Lamentations 3:1-7", explanation: "Suffering is deeply personal." },
  { id: "lamentations19", question: "What phrase marks a turning point in chapter 3?", options: [{ label: "A", text: "I am forgotten" }, { label: "B", text: "Yet this I call to mind" }, { label: "C", text: "The city has fallen" }, { label: "D", text: "God is silent" }], correctAnswer: "B", verse: "Lamentations 3:21", explanation: "Hope enters the lament." },
  { id: "lamentations20", question: "What is new every morning?", options: [{ label: "A", text: "Mercy" }, { label: "B", text: "Strength" }, { label: "C", text: "Joy" }, { label: "D", text: "Deliverance" }], correctAnswer: "A", verse: "Lamentations 3:23", explanation: "God's mercies renew daily." },
  { id: "lamentations21", question: "What attribute of God is declared great?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Justice" }, { label: "D", text: "Holiness" }], correctAnswer: "B", verse: "Lamentations 3:23", explanation: "God's faithfulness remains." },
  { id: "lamentations22", question: "What does the author say is good?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Waiting quietly for salvation" }, { label: "C", text: "Strength" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Lamentations 3:26", explanation: "Waiting on God is good." },
  { id: "lamentations23", question: "What does God not do willingly?", options: [{ label: "A", text: "Forgive" }, { label: "B", text: "Afflict" }, { label: "C", text: "Judge" }, { label: "D", text: "Test" }], correctAnswer: "B", verse: "Lamentations 3:33", explanation: "God does not delight in affliction." },
  { id: "lamentations24", question: "What should people examine?", options: [{ label: "A", text: "Their enemies" }, { label: "B", text: "Their ways" }, { label: "C", text: "Their strength" }, { label: "D", text: "Their future" }], correctAnswer: "B", verse: "Lamentations 3:40", explanation: "Self-examination leads to repentance." },
  { id: "lamentations25", question: "What are people urged to lift up?", options: [{ label: "A", text: "Voices" }, { label: "B", text: "Hands and hearts" }, { label: "C", text: "Weapons" }, { label: "D", text: "Eyes" }], correctAnswer: "B", verse: "Lamentations 3:41", explanation: "Prayer involves heart and action." },
  { id: "lamentations26", question: "What does the author recall God has done?", options: [{ label: "A", text: "Ignored prayer" }, { label: "B", text: "Redeemed life from the pit" }, { label: "C", text: "Hidden Himself" }, { label: "D", text: "Destroyed hope" }], correctAnswer: "B", verse: "Lamentations 3:58", explanation: "God rescues." },
  { id: "lamentations27", question: "What emotion dominates chapter 4?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Shock" }, { label: "C", text: "Praise" }, { label: "D", text: "Confidence" }], correctAnswer: "B", verse: "Lamentations 4", explanation: "The devastation is shocking." },
  { id: "lamentations28", question: "What has happened to precious gold?", options: [{ label: "A", text: "Refined" }, { label: "B", text: "Dimmed" }, { label: "C", text: "Hidden" }, { label: "D", text: "Melted" }], correctAnswer: "B", verse: "Lamentations 4:1", explanation: "Glory has faded." },
  { id: "lamentations29", question: "Who suffers along with the people?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Priests and prophets" }, { label: "C", text: "Foreigners" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "Lamentations 4:13", explanation: "Leaders share guilt." },
  { id: "lamentations30", question: "What was worse than famine?", options: [{ label: "A", text: "Sword" }, { label: "B", text: "Pestilence" }, { label: "C", text: "Starvation during siege" }, { label: "D", text: "Exile" }], correctAnswer: "C", verse: "Lamentations 4:9", explanation: "The siege caused extreme suffering." },
  { id: "lamentations31", question: "What shocking act is described in chapter 4?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Cannibalism" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Blasphemy" }], correctAnswer: "B", verse: "Lamentations 4:10", explanation: "The famine drove extreme acts." },
  { id: "lamentations32", question: "Who is blamed for misleading the people?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "False prophets" }, { label: "C", text: "Babylon" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Lamentations 4:13", explanation: "False prophets failed the people." },
  { id: "lamentations33", question: "What happened to the king of Judah?", options: [{ label: "A", text: "Escaped" }, { label: "B", text: "Captured" }, { label: "C", text: "Killed" }, { label: "D", text: "Converted" }], correctAnswer: "B", verse: "Lamentations 4:20", explanation: "The king was captured." },
  { id: "lamentations34", question: "Which nation is warned to rejoice only briefly?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Edom" }, { label: "C", text: "Assyria" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Lamentations 4:21", explanation: "Edom's judgment will come." },
  { id: "lamentations35", question: "What will come to an end?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Punishment" }, { label: "C", text: "Prayer" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Lamentations 4:22", explanation: "Punishment will not last forever." },
  { id: "lamentations36", question: "What type of chapter is chapter 5?", options: [{ label: "A", text: "Acrostic" }, { label: "B", text: "Prayer" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Narrative" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "Chapter 5 is a communal prayer." },
  { id: "lamentations37", question: "What does chapter 5 lack compared to earlier chapters?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Acrostic structure" }, { label: "C", text: "Prayer" }, { label: "D", text: "Confession" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "It is not an acrostic." },
  { id: "lamentations38", question: "What does the community ask God to do?", options: [{ label: "A", text: "Destroy enemies" }, { label: "B", text: "Remember them" }, { label: "C", text: "Forget them" }, { label: "D", text: "Bless Babylon" }], correctAnswer: "B", verse: "Lamentations 5:1", explanation: "They ask God to remember their suffering." },
  { id: "lamentations39", question: "What has been lost according to chapter 5?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Inheritance" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Lamentations 5:2", explanation: "The inheritance is gone." },
  { id: "lamentations40", question: "Who rules over the people now?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Foreigners" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Lamentations 5:8", explanation: "Foreign rulers dominate." },
  { id: "lamentations41", question: "What has ceased?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Joy" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "Lamentations 5:15", explanation: "Joy has turned to mourning." },
  { id: "lamentations42", question: "What has fallen from the head?", options: [{ label: "A", text: "Crown" }, { label: "B", text: "Ashes" }, { label: "C", text: "Oil" }, { label: "D", text: "Helmet" }], correctAnswer: "A", verse: "Lamentations 5:16", explanation: "The crown symbolizes lost glory." },
  { id: "lamentations43", question: "What confession is made?", options: [{ label: "A", text: "We are weak" }, { label: "B", text: "We have sinned" }, { label: "C", text: "We are forgotten" }, { label: "D", text: "We are lost" }], correctAnswer: "B", verse: "Lamentations 5:16", explanation: "Sin is acknowledged." },
  { id: "lamentations44", question: "What physical state is described?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Faint hearts and dim eyes" }, { label: "C", text: "Healing" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Lamentations 5:17", explanation: "Grief affects body and soul." },
  { id: "lamentations45", question: "What place lies desolate?", options: [{ label: "A", text: "The palace" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "The fields" }, { label: "D", text: "The market" }], correctAnswer: "B", verse: "Lamentations 5:18", explanation: "Zion is deserted." },
  { id: "lamentations46", question: "What animals roam the ruins?", options: [{ label: "A", text: "Lions" }, { label: "B", text: "Foxes" }, { label: "C", text: "Dogs" }, { label: "D", text: "Birds" }], correctAnswer: "B", verse: "Lamentations 5:18", explanation: "Foxes symbolize desolation." },
  { id: "lamentations47", question: "What truth is affirmed about God?", options: [{ label: "A", text: "He changes" }, { label: "B", text: "He reigns forever" }, { label: "C", text: "He is silent" }, { label: "D", text: "He forgets" }], correctAnswer: "B", verse: "Lamentations 5:19", explanation: "God's rule endures." },
  { id: "lamentations48", question: "What question closes the book?", options: [{ label: "A", text: "Will you forgive?" }, { label: "B", text: "Why have you forgotten us?" }, { label: "C", text: "When will we return?" }, { label: "D", text: "Who will save us?" }], correctAnswer: "B", verse: "Lamentations 5:20", explanation: "The book ends with a question." },
  { id: "lamentations49", question: "What does the community ask for?", options: [{ label: "A", text: "Revenge" }, { label: "B", text: "Restoration" }, { label: "C", text: "Escape" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Lamentations 5:21", explanation: "They seek restoration." },
  { id: "lamentations50", question: "What is requested so hearts may return?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Renewal" }, { label: "C", text: "Forgiveness" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "Lamentations 5:21", explanation: "Renewal leads to return." },
  { id: "lamentations51", question: "What uncertainty ends the prayer?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Rejection" }, { label: "C", text: "Peace" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Lamentations 5:22", explanation: "The ending is unresolved." },
  { id: "lamentations52", question: "What theme dominates Lamentations?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Grief" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Lamentations", explanation: "Grief fills the book." },
  { id: "lamentations53", question: "What balances grief in the book?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Hope" }, { label: "C", text: "Power" }, { label: "D", text: "Justice" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "Hope emerges in chapter 3." },
  { id: "lamentations54", question: "What does suffering lead the people to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Repent" }, { label: "C", text: "Hide" }, { label: "D", text: "Forget God" }], correctAnswer: "B", verse: "Lamentations", explanation: "Suffering leads to repentance." },
  { id: "lamentations55", question: "What does the book teach about God's character?", options: [{ label: "A", text: "He is harsh" }, { label: "B", text: "He is faithful" }, { label: "C", text: "He is distant" }, { label: "D", text: "He is unpredictable" }], correctAnswer: "B", verse: "Lamentations 3:22-23", explanation: "God remains faithful." },
  { id: "lamentations56", question: "What does God not abandon completely?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "His people" }, { label: "C", text: "The law" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Lamentations 3:31", explanation: "God does not reject forever." },
  { id: "lamentations57", question: "What does lament allow?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Honest prayer" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Escape" }], correctAnswer: "B", verse: "Lamentations", explanation: "Lament gives voice to grief." },
  { id: "lamentations58", question: "What does the book affirm about suffering?", options: [{ label: "A", text: "It is meaningless" }, { label: "B", text: "It is acknowledged by God" }, { label: "C", text: "It is hidden" }, { label: "D", text: "It is ignored" }], correctAnswer: "B", verse: "Lamentations", explanation: "God hears suffering." },
  { id: "lamentations59", question: "What does the unresolved ending reflect?", options: [{ label: "A", text: "Failure" }, { label: "B", text: "Ongoing waiting" }, { label: "C", text: "Victory" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "Waiting continues." },
  { id: "lamentations60", question: "What is the ultimate posture encouraged?", options: [{ label: "A", text: "Revenge" }, { label: "B", text: "Hopeful dependence on God" }, { label: "C", text: "Withdrawal" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Lamentations", explanation: "Hope remains in God." },
  { id: "lamentations61", question: "What does Lamentations show about prayer?", options: [{ label: "A", text: "It must be joyful" }, { label: "B", text: "It can include grief" }, { label: "C", text: "It must be formal" }, { label: "D", text: "It must be brief" }], correctAnswer: "B", verse: "Lamentations", explanation: "Prayer can express sorrow." },
  { id: "lamentations62", question: "What does chapter 3 emphasize?", options: [{ label: "A", text: "Despair only" }, { label: "B", text: "Hope within suffering" }, { label: "C", text: "Victory" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "Hope breaks through suffering." },
  { id: "lamentations63", question: "What is remembered to restore hope?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "God's mercies" }, { label: "C", text: "Past victories" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Lamentations 3:22-23", explanation: "Remembering mercy restores hope." },
  { id: "lamentations64", question: "What does God's compassion do?", options: [{ label: "A", text: "Fails" }, { label: "B", text: "Never ends" }, { label: "C", text: "Weakens" }, { label: "D", text: "Changes" }], correctAnswer: "B", verse: "Lamentations 3:22", explanation: "God's compassion endures." },
  { id: "lamentations65", question: "What does the book teach about discipline?", options: [{ label: "A", text: "It is pointless" }, { label: "B", text: "It comes from love" }, { label: "C", text: "It is random" }, { label: "D", text: "It is permanent" }], correctAnswer: "B", verse: "Lamentations 3:33", explanation: "Discipline is not from cruelty." },
  { id: "lamentations66", question: "What role does memory play?", options: [{ label: "A", text: "It traps people" }, { label: "B", text: "It fuels hope" }, { label: "C", text: "It causes anger" }, { label: "D", text: "It brings fear" }], correctAnswer: "B", verse: "Lamentations 3:21", explanation: "Remembering God brings hope." },
  { id: "lamentations67", question: "What does lament prevent?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Denial" }, { label: "C", text: "Prayer" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "Lamentations", explanation: "Lament faces pain honestly." },
  { id: "lamentations68", question: "What does God remain despite judgment?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Sovereign" }, { label: "C", text: "Silent" }, { label: "D", text: "Absent" }], correctAnswer: "B", verse: "Lamentations 5:19", explanation: "God reigns forever." },
  { id: "lamentations69", question: "What does the book encourage after loss?", options: [{ label: "A", text: "Withdrawal" }, { label: "B", text: "Returning to God" }, { label: "C", text: "Revenge" }, { label: "D", text: "Forgetfulness" }], correctAnswer: "B", verse: "Lamentations 3:40", explanation: "Return to the Lord." },
  { id: "lamentations70", question: "What posture does the book model?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Humility" }, { label: "C", text: "Defiance" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Lamentations", explanation: "Humility before God." },
  { id: "lamentations71", question: "What is acknowledged openly?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Sin" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Lamentations 5:16", explanation: "Sin is confessed." },
  { id: "lamentations72", question: "What does the book avoid?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Easy answers" }, { label: "C", text: "Prayer" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Lamentations", explanation: "Pain is not simplified." },
  { id: "lamentations73", question: "What kind of hope is presented?", options: [{ label: "A", text: "Quick" }, { label: "B", text: "Enduring" }, { label: "C", text: "Temporary" }, { label: "D", text: "Political" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "Hope endures suffering." },
  { id: "lamentations74", question: "What does suffering invite?", options: [{ label: "A", text: "Isolation" }, { label: "B", text: "Reflection" }, { label: "C", text: "Anger" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Lamentations", explanation: "Reflection leads to repentance." },
  { id: "lamentations75", question: "What does God still hear?", options: [{ label: "A", text: "Praise only" }, { label: "B", text: "Cries of pain" }, { label: "C", text: "Silence" }, { label: "D", text: "Songs" }], correctAnswer: "B", verse: "Lamentations", explanation: "God hears cries." },
  { id: "lamentations76", question: "What remains possible after devastation?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Victory" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Lamentations 5:21", explanation: "Restoration is sought." },
  { id: "lamentations77", question: "What does the unresolved ending teach?", options: [{ label: "A", text: "Despair" }, { label: "B", text: "Waiting faith" }, { label: "C", text: "Certainty" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "Faith waits." },
  { id: "lamentations78", question: "What does the book legitimize?", options: [{ label: "A", text: "Doubt" }, { label: "B", text: "Grief in faith" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Lamentations", explanation: "Grief and faith coexist." },
  { id: "lamentations79", question: "What remains the foundation?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "God's character" }, { label: "C", text: "Kings" }, { label: "D", text: "Land" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "God's character sustains hope." },
  { id: "lamentations80", question: "What does lament ultimately lead toward?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Prayerful trust" }, { label: "C", text: "Anger" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "Lamentations", explanation: "Trust emerges through prayer." },
  { id: "lamentations81", question: "What does the book teach about God's rule?", options: [{ label: "A", text: "It ends" }, { label: "B", text: "It endures forever" }, { label: "C", text: "It changes" }, { label: "D", text: "It weakens" }], correctAnswer: "B", verse: "Lamentations 5:19", explanation: "God reigns eternally." },
  { id: "lamentations82", question: "What emotion is given space?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Sorrow" }, { label: "C", text: "Confidence" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Lamentations", explanation: "Sorrow is expressed openly." },
  { id: "lamentations83", question: "What is never denied?", options: [{ label: "A", text: "God's power" }, { label: "B", text: "Human pain" }, { label: "C", text: "Hope" }, { label: "D", text: "Justice" }], correctAnswer: "B", verse: "Lamentations", explanation: "Pain is acknowledged." },
  { id: "lamentations84", question: "What holds suffering and hope together?", options: [{ label: "A", text: "Memory" }, { label: "B", text: "God's mercy" }, { label: "C", text: "Prayer" }, { label: "D", text: "Community" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "Mercy bridges pain and hope." },
  { id: "lamentations85", question: "What does the book encourage amid ruin?", options: [{ label: "A", text: "Escape" }, { label: "B", text: "Turning back to God" }, { label: "C", text: "Revenge" }, { label: "D", text: "Forgetfulness" }], correctAnswer: "B", verse: "Lamentations 3:40", explanation: "Return to the Lord." },
  { id: "lamentations86", question: "What kind of faith is modeled?", options: [{ label: "A", text: "Triumphant" }, { label: "B", text: "Honest and waiting" }, { label: "C", text: "Doubtful" }, { label: "D", text: "Fearful" }], correctAnswer: "B", verse: "Lamentations", explanation: "Faith waits honestly." },
  { id: "lamentations87", question: "What remains even without answers?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Joy" }, { label: "C", text: "Victory" }, { label: "D", text: "Strength" }], correctAnswer: "A", verse: "Lamentations 3", explanation: "Hope persists." },
  { id: "lamentations88", question: "What does the book affirm about God?", options: [{ label: "A", text: "He abandons forever" }, { label: "B", text: "He remains faithful" }, { label: "C", text: "He is unpredictable" }, { label: "D", text: "He is silent" }], correctAnswer: "B", verse: "Lamentations 3:22-23", explanation: "God's faithfulness endures." },
  { id: "lamentations89", question: "What does lament ultimately seek?", options: [{ label: "A", text: "Answers" }, { label: "B", text: "God Himself" }, { label: "C", text: "Justice" }, { label: "D", text: "Relief" }], correctAnswer: "B", verse: "Lamentations", explanation: "God is the ultimate hope." },
  { id: "lamentations90", question: "What kind of ending does Lamentations have?", options: [{ label: "A", text: "Triumphant" }, { label: "B", text: "Open-ended" }, { label: "C", text: "Victorious" }, { label: "D", text: "Resolved" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "The ending remains open." },
  { id: "lamentations91", question: "What does the open ending invite?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Continued prayer" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "Lamentations 5", explanation: "Prayer continues." },
  { id: "lamentations92", question: "What does the book teach about faith?", options: [{ label: "A", text: "It removes pain" }, { label: "B", text: "It walks through pain" }, { label: "C", text: "It ignores pain" }, { label: "D", text: "It denies pain" }], correctAnswer: "B", verse: "Lamentations", explanation: "Faith endures pain." },
  { id: "lamentations93", question: "What is central despite devastation?", options: [{ label: "A", text: "The city" }, { label: "B", text: "God's mercy" }, { label: "C", text: "The temple" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Lamentations 3", explanation: "Mercy remains central." },
  { id: "lamentations94", question: "What posture does the book model toward God?", options: [{ label: "A", text: "Accusation" }, { label: "B", text: "Dependence" }, { label: "C", text: "Distance" }, { label: "D", text: "Indifference" }], correctAnswer: "B", verse: "Lamentations", explanation: "Dependence on God." },
  { id: "lamentations95", question: "What does lament preserve?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Relationship with God" }, { label: "C", text: "Culture" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Lamentations", explanation: "Relationship remains." },
  { id: "lamentations96", question: "What does the book show about honesty?", options: [{ label: "A", text: "It is dangerous" }, { label: "B", text: "It is welcomed by God" }, { label: "C", text: "It is sinful" }, { label: "D", text: "It is weak" }], correctAnswer: "B", verse: "Lamentations", explanation: "God welcomes honest prayer." },
  { id: "lamentations97", question: "What survives destruction?", options: [{ label: "A", text: "Buildings" }, { label: "B", text: "Faith" }, { label: "C", text: "Kings" }, { label: "D", text: "Empires" }], correctAnswer: "B", verse: "Lamentations", explanation: "Faith survives." },
  { id: "lamentations98", question: "What does Lamentations ultimately affirm?", options: [{ label: "A", text: "Human strength" }, { label: "B", text: "God's steadfast love" }, { label: "C", text: "Justice alone" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Lamentations 3:22", explanation: "God's love endures." },
  { id: "lamentations99", question: "What kind of hope remains?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "Covenant-based" }, { label: "C", text: "Political" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Lamentations", explanation: "Hope rests on God's covenant." },
  { id: "lamentations100", question: "What final truth anchors the book?", options: [{ label: "A", text: "The city will rise" }, { label: "B", text: "The Lord reigns forever" }, { label: "C", text: "Exile will end" }, { label: "D", text: "Judgment is final" }], correctAnswer: "B", verse: "Lamentations 5:19", explanation: "God reigns forever." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function LamentationsTriviaPage() {
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
          .eq("book", "lamentations");

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
          book: "lamentations",
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
            book: "lamentations",
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
    if (score === 10) return "Perfect! You're a Lamentations expert!";
    if (score >= 8) return "Excellent! You know Lamentations well!";
    if (score >= 6) return "Good job! Keep studying Lamentations!";
    if (score >= 4) return "Nice try! Lamentations has much to explore!";
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
              href="/bible-trivia/lamentations"
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
