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
  { id: "ecclesiastes1", question: "Who is the author traditionally identified as?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Moses" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Ecclesiastes 1:1", explanation: "The Teacher is traditionally identified as Solomon." },
  { id: "ecclesiastes2", question: "What does the Teacher call everything under the sun?", options: [{ label: "A", text: "Blessed" }, { label: "B", text: "Meaningful" }, { label: "C", text: "Meaningless" }, { label: "D", text: "Eternal" }], correctAnswer: "C", verse: "Ecclesiastes 1:2", explanation: "Life apart from God is described as meaningless." },
  { id: "ecclesiastes3", question: "What phrase is repeated to describe life?", options: [{ label: "A", text: "Under the law" }, { label: "B", text: "Under the sun" }, { label: "C", text: "Under heaven" }, { label: "D", text: "Under judgment" }], correctAnswer: "B", verse: "Ecclesiastes 1:3", explanation: "The phrase emphasizes life viewed from a human perspective." },
  { id: "ecclesiastes4", question: "What is said to never be satisfied?", options: [{ label: "A", text: "The heart" }, { label: "B", text: "The eye" }, { label: "C", text: "The soul" }, { label: "D", text: "The mind" }], correctAnswer: "B", verse: "Ecclesiastes 1:8", explanation: "Human desire is never fully satisfied." },
  { id: "ecclesiastes5", question: "What does the Teacher say about wisdom?", options: [{ label: "A", text: "It removes sorrow" }, { label: "B", text: "It increases pain" }, { label: "C", text: "It brings wealth" }, { label: "D", text: "It ends death" }], correctAnswer: "B", verse: "Ecclesiastes 1:18", explanation: "More wisdom brings greater awareness of sorrow." },
  { id: "ecclesiastes6", question: "What experiment does the Teacher conduct?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Pleasure" }, { label: "C", text: "Fasting" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Ecclesiastes 2:1", explanation: "The Teacher tests pleasure for meaning." },
  { id: "ecclesiastes7", question: "What did the Teacher find pleasure to be?", options: [{ label: "A", text: "Lasting" }, { label: "B", text: "Fulfilling" }, { label: "C", text: "Meaningless" }, { label: "D", text: "Eternal" }], correctAnswer: "C", verse: "Ecclesiastes 2:1", explanation: "Pleasure could not give lasting meaning." },
  { id: "ecclesiastes8", question: "What activity also proved meaningless?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Work and toil" }, { label: "C", text: "Worship" }, { label: "D", text: "Giving" }], correctAnswer: "B", verse: "Ecclesiastes 2:11", explanation: "Hard work alone does not satisfy." },
  { id: "ecclesiastes9", question: "What troubled the Teacher about work?", options: [{ label: "A", text: "It was difficult" }, { label: "B", text: "It must be left to others" }, { label: "C", text: "It caused pain" }, { label: "D", text: "It was endless" }], correctAnswer: "B", verse: "Ecclesiastes 2:18", explanation: "Work is left behind after death." },
  { id: "ecclesiastes10", question: "What is described as better than one?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Two people" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "Ecclesiastes 4:9", explanation: "Companionship provides support." },
  { id: "ecclesiastes11", question: "What happens to someone who falls alone?", options: [{ label: "A", text: "They recover" }, { label: "B", text: "They struggle" }, { label: "C", text: "They succeed" }, { label: "D", text: "They rest" }], correctAnswer: "B", verse: "Ecclesiastes 4:10", explanation: "Isolation is dangerous." },
  { id: "ecclesiastes12", question: "What is not easily broken?", options: [{ label: "A", text: "A rope" }, { label: "B", text: "A cord of three strands" }, { label: "C", text: "A chain" }, { label: "D", text: "A wall" }], correctAnswer: "B", verse: "Ecclesiastes 4:12", explanation: "Unity brings strength." },
  { id: "ecclesiastes13", question: "What does the Teacher say about popularity?", options: [{ label: "A", text: "It lasts" }, { label: "B", text: "It fades" }, { label: "C", text: "It brings joy" }, { label: "D", text: "It gives wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 4:16", explanation: "Public approval is temporary." },
  { id: "ecclesiastes14", question: "How should one approach God?", options: [{ label: "A", text: "Quickly" }, { label: "B", text: "Carelessly" }, { label: "C", text: "With reverence" }, { label: "D", text: "With many words" }], correctAnswer: "C", verse: "Ecclesiastes 5:1", explanation: "God should be approached with reverence." },
  { id: "ecclesiastes15", question: "What should be few before God?", options: [{ label: "A", text: "Prayers" }, { label: "B", text: "Sacrifices" }, { label: "C", text: "Words" }, { label: "D", text: "Requests" }], correctAnswer: "C", verse: "Ecclesiastes 5:2", explanation: "Listening is better than speaking." },
  { id: "ecclesiastes16", question: "What is said about vows?", options: [{ label: "A", text: "Make many" }, { label: "B", text: "Break them easily" }, { label: "C", text: "Fulfill them" }, { label: "D", text: "Avoid them always" }], correctAnswer: "C", verse: "Ecclesiastes 5:4", explanation: "God expects vows to be kept." },
  { id: "ecclesiastes17", question: "What never satisfies the lover of money?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Riches" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Ecclesiastes 5:10", explanation: "Wealth does not satisfy." },
  { id: "ecclesiastes18", question: "What is described as a gift of God?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Enjoying work" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Ecclesiastes 5:19", explanation: "Enjoyment is a gift from God." },
  { id: "ecclesiastes19", question: "What does the Teacher observe about injustice?", options: [{ label: "A", text: "It disappears" }, { label: "B", text: "It exists in places of justice" }, { label: "C", text: "It is rare" }, { label: "D", text: "It is rewarded" }], correctAnswer: "B", verse: "Ecclesiastes 3:16", explanation: "Injustice is present even where justice should be." },
  { id: "ecclesiastes20", question: "What fate do humans and animals share?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Death" }, { label: "C", text: "Labor" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Ecclesiastes 3:19", explanation: "All living beings face death." },
  { id: "ecclesiastes21", question: "What time is appointed for everything?", options: [{ label: "A", text: "Under the sun" }, { label: "B", text: "Under heaven" }, { label: "C", text: "Under the law" }, { label: "D", text: "Under wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 3:1", explanation: "God appoints times for every activity." },
  { id: "ecclesiastes22", question: "What emotion is better than laughter?", options: [{ label: "A", text: "Sorrow" }, { label: "B", text: "Anger" }, { label: "C", text: "Silence" }, { label: "D", text: "Joy" }], correctAnswer: "A", verse: "Ecclesiastes 7:3", explanation: "Sorrow can lead to reflection." },
  { id: "ecclesiastes23", question: "What kind of rebuke is preferred?", options: [{ label: "A", text: "Harsh" }, { label: "B", text: "From the wise" }, { label: "C", text: "Public" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Ecclesiastes 7:5", explanation: "Wise correction is valuable." },
  { id: "ecclesiastes24", question: "What does patience produce?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Peace" }, { label: "C", text: "Better than pride" }, { label: "D", text: "Wealth" }], correctAnswer: "C", verse: "Ecclesiastes 7:8", explanation: "Patience is better than pride." },
  { id: "ecclesiastes25", question: "What does the Teacher warn against?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Extremes" }, { label: "C", text: "Obedience" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ecclesiastes 7:16-18", explanation: "Avoid extremes of righteousness or wickedness." },
  { id: "ecclesiastes26", question: "What is rare according to the Teacher?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "A righteous person" }, { label: "C", text: "A faithful friend" }, { label: "D", text: "A good ruler" }], correctAnswer: "B", verse: "Ecclesiastes 7:20", explanation: "No one is without sin." },
  { id: "ecclesiastes27", question: "What does wisdom protect like?", options: [{ label: "A", text: "A shield" }, { label: "B", text: "Money" }, { label: "C", text: "A wall" }, { label: "D", text: "A sword" }], correctAnswer: "B", verse: "Ecclesiastes 7:12", explanation: "Wisdom offers protection similar to money." },
  { id: "ecclesiastes28", question: "What cannot be straightened?", options: [{ label: "A", text: "The heart" }, { label: "B", text: "What God has made crooked" }, { label: "C", text: "The law" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 1:15", explanation: "Some things are beyond human control." },
  { id: "ecclesiastes29", question: "What is a burden God has laid on humanity?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Searching for meaning" }, { label: "C", text: "Worship" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 1:13", explanation: "Humanity searches for meaning." },
  { id: "ecclesiastes30", question: "What does the Teacher conclude about wisdom?", options: [{ label: "A", text: "It solves everything" }, { label: "B", text: "It has limits" }, { label: "C", text: "It removes death" }, { label: "D", text: "It ends sorrow" }], correctAnswer: "B", verse: "Ecclesiastes 7:23", explanation: "Wisdom has boundaries." },
  { id: "ecclesiastes31", question: "What does the Teacher say about rulers?", options: [{ label: "A", text: "They are wise" }, { label: "B", text: "They can act foolishly" }, { label: "C", text: "They are eternal" }, { label: "D", text: "They are just" }], correctAnswer: "B", verse: "Ecclesiastes 10:5-7", explanation: "Authority does not guarantee wisdom." },
  { id: "ecclesiastes32", question: "What does foolishness outweigh?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Honor" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "Ecclesiastes 10:1", explanation: "A little folly ruins honor." },
  { id: "ecclesiastes33", question: "What reveals a ruler's immaturity?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Indulgence" }, { label: "C", text: "Silence" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 10:16-17", explanation: "Indulgence reveals poor leadership." },
  { id: "ecclesiastes34", question: "What should be done despite uncertainty?", options: [{ label: "A", text: "Wait" }, { label: "B", text: "Invest and act" }, { label: "C", text: "Fear" }, { label: "D", text: "Remain silent" }], correctAnswer: "B", verse: "Ecclesiastes 11:1-2", explanation: "Act wisely despite uncertainty." },
  { id: "ecclesiastes35", question: "What is unpredictable?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Life outcomes" }, { label: "C", text: "God" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "Ecclesiastes 11:5-6", explanation: "Outcomes are beyond human control." },
  { id: "ecclesiastes36", question: "Who should remember their Creator?", options: [{ label: "A", text: "The elderly" }, { label: "B", text: "The young" }, { label: "C", text: "The wealthy" }, { label: "D", text: "The wise" }], correctAnswer: "B", verse: "Ecclesiastes 12:1", explanation: "Youth is the time to remember God." },
  { id: "ecclesiastes37", question: "What symbolizes aging?", options: [{ label: "A", text: "Bright lights" }, { label: "B", text: "Darkening of the sun" }, { label: "C", text: "New growth" }, { label: "D", text: "Rising stars" }], correctAnswer: "B", verse: "Ecclesiastes 12:2", explanation: "Poetic imagery describes aging." },
  { id: "ecclesiastes38", question: "What happens to the silver cord?", options: [{ label: "A", text: "Strengthens" }, { label: "B", text: "Snaps" }, { label: "C", text: "Shines" }, { label: "D", text: "Grows" }], correctAnswer: "B", verse: "Ecclesiastes 12:6", explanation: "Life eventually ends." },
  { id: "ecclesiastes39", question: "What returns to God at death?", options: [{ label: "A", text: "The body" }, { label: "B", text: "The spirit" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ecclesiastes 12:7", explanation: "The spirit returns to God." },
  { id: "ecclesiastes40", question: "What does the Teacher repeat at the end?", options: [{ label: "A", text: "Life is joyful" }, { label: "B", text: "Everything is meaningless" }, { label: "C", text: "Wisdom saves" }, { label: "D", text: "Work endures" }], correctAnswer: "B", verse: "Ecclesiastes 12:8", explanation: "The theme is restated." },
  { id: "ecclesiastes41", question: "What did the Teacher devote himself to?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Studying wisdom" }, { label: "C", text: "Worship" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Ecclesiastes 1:13", explanation: "The Teacher searched for meaning." },
  { id: "ecclesiastes42", question: "What is described as chasing the wind?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Pleasure" }, { label: "C", text: "Human effort alone" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Ecclesiastes 2:11", explanation: "Human effort alone is futile." },
  { id: "ecclesiastes43", question: "What does the Teacher enjoy?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Food and work" }, { label: "C", text: "Wealth" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Ecclesiastes 3:13", explanation: "Enjoyment is God's gift." },
  { id: "ecclesiastes44", question: "What does God do with time?", options: [{ label: "A", text: "Ignores it" }, { label: "B", text: "Makes everything beautiful" }, { label: "C", text: "Ends it" }, { label: "D", text: "Hides it" }], correctAnswer: "B", verse: "Ecclesiastes 3:11", explanation: "God's timing is perfect." },
  { id: "ecclesiastes45", question: "What has God placed in human hearts?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Eternity" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Ecclesiastes 3:11", explanation: "Humans long for eternity." },
  { id: "ecclesiastes46", question: "What does oppression cause?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Tears without comfort" }, { label: "C", text: "Justice" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Ecclesiastes 4:1", explanation: "Oppression produces sorrow." },
  { id: "ecclesiastes47", question: "What motivates much labor?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Envy" }, { label: "C", text: "Faith" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Ecclesiastes 4:4", explanation: "Envy drives much toil." },
  { id: "ecclesiastes48", question: "What is better than abundance?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Contentment" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Ecclesiastes 4:6", explanation: "Contentment is better than striving." },
  { id: "ecclesiastes49", question: "What happens to riches hoarded?", options: [{ label: "A", text: "They multiply" }, { label: "B", text: "They are lost" }, { label: "C", text: "They bring joy" }, { label: "D", text: "They last forever" }], correctAnswer: "B", verse: "Ecclesiastes 5:13-14", explanation: "Hoarded wealth can disappear." },
  { id: "ecclesiastes50", question: "What is the common destiny of all?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Death" }, { label: "C", text: "Work" }, { label: "D", text: "Pleasure" }], correctAnswer: "B", verse: "Ecclesiastes 9:2", explanation: "All share the same end." },
  { id: "ecclesiastes51", question: "What is better than the day of birth?", options: [{ label: "A", text: "Youth" }, { label: "B", text: "The day of death" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Success" }], correctAnswer: "B", verse: "Ecclesiastes 7:1", explanation: "Death brings perspective." },
  { id: "ecclesiastes52", question: "What is better than laughter?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Sorrow" }, { label: "C", text: "Joy" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Ecclesiastes 7:3", explanation: "Sorrow can lead to wisdom." },
  { id: "ecclesiastes53", question: "What makes wisdom powerful?", options: [{ label: "A", text: "Knowledge" }, { label: "B", text: "Authority" }, { label: "C", text: "Understanding" }, { label: "D", text: "Strength" }], correctAnswer: "D", verse: "Ecclesiastes 7:19", explanation: "Wisdom strengthens a person." },
  { id: "ecclesiastes54", question: "What does excessive righteousness lead to?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Destruction" }, { label: "C", text: "Joy" }, { label: "D", text: "Honor" }], correctAnswer: "B", verse: "Ecclesiastes 7:16", explanation: "Extremes are warned against." },
  { id: "ecclesiastes55", question: "What reveals foolish speech?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Many words" }, { label: "C", text: "Correction" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 5:3", explanation: "Foolishness is revealed through words." },
  { id: "ecclesiastes56", question: "What is unpredictable?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Time and chance" }, { label: "C", text: "God" }, { label: "D", text: "Death" }], correctAnswer: "B", verse: "Ecclesiastes 9:11", explanation: "Life events are uncertain." },
  { id: "ecclesiastes57", question: "What should be done while living?", options: [{ label: "A", text: "Fear death" }, { label: "B", text: "Enjoy life" }, { label: "C", text: "Avoid work" }, { label: "D", text: "Hoard wealth" }], correctAnswer: "B", verse: "Ecclesiastes 9:7", explanation: "Enjoyment is encouraged." },
  { id: "ecclesiastes58", question: "What gives advantage to the wise?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Light" }, { label: "C", text: "Power" }, { label: "D", text: "Fame" }], correctAnswer: "B", verse: "Ecclesiastes 8:1", explanation: "Wisdom brings clarity." },
  { id: "ecclesiastes59", question: "What should not be rushed?", options: [{ label: "A", text: "Speech" }, { label: "B", text: "Anger" }, { label: "C", text: "Work" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Ecclesiastes 7:9", explanation: "Quick anger leads to folly." },
  { id: "ecclesiastes60", question: "What is said about human righteousness?", options: [{ label: "A", text: "It is perfect" }, { label: "B", text: "It is incomplete" }, { label: "C", text: "It saves" }, { label: "D", text: "It is eternal" }], correctAnswer: "B", verse: "Ecclesiastes 7:20", explanation: "No one is perfectly righteous." },
  { id: "ecclesiastes61", question: "What does wisdom do for the face?", options: [{ label: "A", text: "Hardens it" }, { label: "B", text: "Brightens it" }, { label: "C", text: "Ages it" }, { label: "D", text: "Hides it" }], correctAnswer: "B", verse: "Ecclesiastes 8:1", explanation: "Wisdom brings clarity and confidence." },
  { id: "ecclesiastes62", question: "What is advised regarding kings?", options: [{ label: "A", text: "Defy them" }, { label: "B", text: "Obey them wisely" }, { label: "C", text: "Fear them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Ecclesiastes 8:2", explanation: "Wisdom guides obedience." },
  { id: "ecclesiastes63", question: "What troubles the Teacher about justice?", options: [{ label: "A", text: "It is absent" }, { label: "B", text: "It is delayed" }, { label: "C", text: "It is corrupt" }, { label: "D", text: "It is perfect" }], correctAnswer: "B", verse: "Ecclesiastes 8:11", explanation: "Delayed justice encourages evil." },
  { id: "ecclesiastes64", question: "What ultimately awaits everyone?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Judgment" }, { label: "C", text: "Rest" }, { label: "D", text: "Reward" }], correctAnswer: "B", verse: "Ecclesiastes 12:14", explanation: "God will judge every deed." },
  { id: "ecclesiastes65", question: "What does the Teacher say about the dead?", options: [{ label: "A", text: "They work" }, { label: "B", text: "They know nothing" }, { label: "C", text: "They rule" }, { label: "D", text: "They enjoy life" }], correctAnswer: "B", verse: "Ecclesiastes 9:5", explanation: "Life's activities end at death." },
  { id: "ecclesiastes66", question: "What does the Teacher say about love and hate?", options: [{ label: "A", text: "They last forever" }, { label: "B", text: "They fade in death" }, { label: "C", text: "They save" }, { label: "D", text: "They rule life" }], correctAnswer: "B", verse: "Ecclesiastes 9:6", explanation: "Earthly emotions end at death." },
  { id: "ecclesiastes67", question: "What should be done with strength?", options: [{ label: "A", text: "Save it" }, { label: "B", text: "Use it fully" }, { label: "C", text: "Hide it" }, { label: "D", text: "Boast in it" }], correctAnswer: "B", verse: "Ecclesiastes 9:10", explanation: "Work wholeheartedly while alive." },
  { id: "ecclesiastes68", question: "What does wisdom outperform?", options: [{ label: "A", text: "Weapons" }, { label: "B", text: "Strength" }, { label: "C", text: "Speed" }, { label: "D", text: "Riches" }], correctAnswer: "B", verse: "Ecclesiastes 9:16", explanation: "Wisdom is better than strength." },
  { id: "ecclesiastes69", question: "What can ruin wisdom?", options: [{ label: "A", text: "Time" }, { label: "B", text: "One foolish act" }, { label: "C", text: "Wealth" }, { label: "D", text: "Age" }], correctAnswer: "B", verse: "Ecclesiastes 9:18", explanation: "Folly undermines wisdom." },
  { id: "ecclesiastes70", question: "What spreads folly?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Careless words" }, { label: "C", text: "Correction" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 10:13", explanation: "Foolish speech multiplies trouble." },
  { id: "ecclesiastes71", question: "What reveals foolish leadership?", options: [{ label: "A", text: "Discipline" }, { label: "B", text: "Laziness" }, { label: "C", text: "Strength" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 10:18", explanation: "Neglect causes decay." },
  { id: "ecclesiastes72", question: "What should not be cursed?", options: [{ label: "A", text: "The rich" }, { label: "B", text: "The king" }, { label: "C", text: "The wise" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "Ecclesiastes 10:20", explanation: "Words carry consequences." },
  { id: "ecclesiastes73", question: "What does generosity consider?", options: [{ label: "A", text: "Risk" }, { label: "B", text: "Future return" }, { label: "C", text: "Fear" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Ecclesiastes 11:1", explanation: "Giving may yield future blessing." },
  { id: "ecclesiastes74", question: "What is uncertain?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Which effort will succeed" }, { label: "C", text: "Death" }, { label: "D", text: "God" }], correctAnswer: "B", verse: "Ecclesiastes 11:6", explanation: "Outcomes are unknown." },
  { id: "ecclesiastes75", question: "What should youth do?", options: [{ label: "A", text: "Fear joy" }, { label: "B", text: "Enjoy life responsibly" }, { label: "C", text: "Avoid work" }, { label: "D", text: "Reject wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 11:9", explanation: "Joy is permitted with accountability." },
  { id: "ecclesiastes76", question: "What follows youthful choices?", options: [{ label: "A", text: "Reward only" }, { label: "B", text: "Judgment" }, { label: "C", text: "Silence" }, { label: "D", text: "Escape" }], correctAnswer: "B", verse: "Ecclesiastes 11:9", explanation: "God will judge actions." },
  { id: "ecclesiastes77", question: "What should be removed from the heart?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Anxiety" }, { label: "C", text: "Joy" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Ecclesiastes 11:10", explanation: "Anxiety weighs down the heart." },
  { id: "ecclesiastes78", question: "What symbolizes the end of life?", options: [{ label: "A", text: "The rising sun" }, { label: "B", text: "Dust returning to earth" }, { label: "C", text: "Growing trees" }, { label: "D", text: "Flowing water" }], correctAnswer: "B", verse: "Ecclesiastes 12:7", explanation: "The body returns to dust." },
  { id: "ecclesiastes79", question: "What did the Teacher carefully arrange?", options: [{ label: "A", text: "Sacrifices" }, { label: "B", text: "Proverbs" }, { label: "C", text: "Laws" }, { label: "D", text: "Songs" }], correctAnswer: "B", verse: "Ecclesiastes 12:9", explanation: "Wisdom sayings were organized." },
  { id: "ecclesiastes80", question: "What are words of the wise compared to?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Goads" }, { label: "C", text: "Light" }, { label: "D", text: "Water" }], correctAnswer: "B", verse: "Ecclesiastes 12:11", explanation: "Wise words guide and prod." },
  { id: "ecclesiastes81", question: "What can endless study cause?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Weariness" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Ecclesiastes 12:12", explanation: "Study alone can exhaust." },
  { id: "ecclesiastes82", question: "What is the duty of all humanity?", options: [{ label: "A", text: "Work hard" }, { label: "B", text: "Fear God and keep His commandments" }, { label: "C", text: "Seek pleasure" }, { label: "D", text: "Gain wisdom" }], correctAnswer: "B", verse: "Ecclesiastes 12:13", explanation: "This is the final conclusion." },
  { id: "ecclesiastes83", question: "What will God bring into judgment?", options: [{ label: "A", text: "Public deeds" }, { label: "B", text: "Every deed" }, { label: "C", text: "Good deeds only" }, { label: "D", text: "Evil deeds only" }], correctAnswer: "B", verse: "Ecclesiastes 12:14", explanation: "Nothing escapes God's judgment." },
  { id: "ecclesiastes84", question: "What includes God's judgment?", options: [{ label: "A", text: "Actions only" }, { label: "B", text: "Hidden things" }, { label: "C", text: "Words only" }, { label: "D", text: "Thoughts only" }], correctAnswer: "B", verse: "Ecclesiastes 12:14", explanation: "Even hidden things are judged." },
  { id: "ecclesiastes85", question: "What does the book emphasize overall?", options: [{ label: "A", text: "Hopelessness" }, { label: "B", text: "Life without God is empty" }, { label: "C", text: "Wealth is supreme" }, { label: "D", text: "Wisdom saves" }], correctAnswer: "B", verse: "Ecclesiastes 1-12", explanation: "Meaning is found only with God." },
  { id: "ecclesiastes86", question: "What balances enjoyment?", options: [{ label: "A", text: "Fear of death" }, { label: "B", text: "Fear of God" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ecclesiastes 12:13", explanation: "Reverence gives perspective." },
  { id: "ecclesiastes87", question: "What theme repeats throughout the book?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Meaninglessness without God" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Ecclesiastes 1:2", explanation: "Life without God lacks meaning." },
  { id: "ecclesiastes88", question: "What perspective dominates the book?", options: [{ label: "A", text: "Heavenly" }, { label: "B", text: "Earthly" }, { label: "C", text: "Prophetic" }, { label: "D", text: "Priestly" }], correctAnswer: "B", verse: "Ecclesiastes 1:3", explanation: "Life is viewed from an earthly lens." },
  { id: "ecclesiastes89", question: "What ultimately gives meaning?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Wealth" }, { label: "C", text: "Fear of God" }, { label: "D", text: "Wisdom alone" }], correctAnswer: "C", verse: "Ecclesiastes 12:13", explanation: "Reverence for God gives meaning." },
  { id: "ecclesiastes90", question: "What does the Teacher not deny?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Pleasure" }, { label: "C", text: "Enjoyment of life" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "Ecclesiastes 9:7", explanation: "Life is to be enjoyed responsibly." },
  { id: "ecclesiastes91", question: "What frames all enjoyment?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Judgment" }, { label: "C", text: "Fear of God" }, { label: "D", text: "Work" }], correctAnswer: "C", verse: "Ecclesiastes 12:13-14", explanation: "Accountability frames joy." },
  { id: "ecclesiastes92", question: "What limits human understanding?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "God's sovereignty" }, { label: "C", text: "Work" }, { label: "D", text: "Pleasure" }], correctAnswer: "B", verse: "Ecclesiastes 3:11", explanation: "Humans cannot grasp all God does." },
  { id: "ecclesiastes93", question: "What does the Teacher repeatedly observe?", options: [{ label: "A", text: "Justice prevails" }, { label: "B", text: "Life is unfair" }, { label: "C", text: "Wisdom saves" }, { label: "D", text: "Kings are righteous" }], correctAnswer: "B", verse: "Ecclesiastes 9:11", explanation: "Life does not always reward merit." },
  { id: "ecclesiastes94", question: "What attitude is encouraged?", options: [{ label: "A", text: "Cynicism" }, { label: "B", text: "Humility" }, { label: "C", text: "Pride" }, { label: "D", text: "Fear of people" }], correctAnswer: "B", verse: "Ecclesiastes 7:18", explanation: "Humility balances life." },
  { id: "ecclesiastes95", question: "What cannot be controlled?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Time" }, { label: "C", text: "Speech" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ecclesiastes 9:12", explanation: "Timing is unpredictable." },
  { id: "ecclesiastes96", question: "What leads to contentment?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Accepting God's gifts" }, { label: "C", text: "Power" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "Ecclesiastes 5:19", explanation: "Contentment comes from God." },
  { id: "ecclesiastes97", question: "What does the Teacher not recommend?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Escaping reality" }, { label: "C", text: "Enjoyment" }, { label: "D", text: "Fear of God" }], correctAnswer: "B", verse: "Ecclesiastes 7:16-17", explanation: "Balance is key." },
  { id: "ecclesiastes98", question: "What remains after everything is considered?", options: [{ label: "A", text: "Wisdom" }, { label: "B", text: "Fear God and obey Him" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Ecclesiastes 12:13", explanation: "This is the final conclusion." },
  { id: "ecclesiastes99", question: "What gives perspective on life?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Wealth" }, { label: "D", text: "Joy" }], correctAnswer: "A", verse: "Ecclesiastes 7:2", explanation: "Death gives clarity." },
  { id: "ecclesiastes100", question: "What is the ultimate message of Ecclesiastes?", options: [{ label: "A", text: "Life is hopeless" }, { label: "B", text: "Fear God gives life meaning" }, { label: "C", text: "Wisdom saves" }, { label: "D", text: "Work defines value" }], correctAnswer: "B", verse: "Ecclesiastes 12:13-14", explanation: "Meaning is found in revering God." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EcclesiastesTriviaPage() {
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
          .eq("book", "ecclesiastes");

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
          book: "ecclesiastes",
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
            book: "ecclesiastes",
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
    if (score === 10) return "Perfect! You're an Ecclesiastes expert!";
    if (score >= 8) return "Excellent! You know Ecclesiastes well!";
    if (score >= 6) return "Good job! Keep studying Ecclesiastes!";
    if (score >= 4) return "Nice try! Ecclesiastes has much to explore!";
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
              href="/bible-trivia/ecclesiastes"
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

