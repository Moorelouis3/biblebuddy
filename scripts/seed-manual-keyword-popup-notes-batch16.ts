import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Thought",
    notes: `Thought is what forms in the mind. In the Bible, thoughts influence actions and direction. What you think shapes how you live. Thoughts can be good or harmful. They must be guided carefully. Right thinking leads to right living.`,
  },
  {
    term: "Threat",
    notes: `A threat is a warning of harm. In the Bible, threats often created fear or pressure. They tested trust and courage. Not every threat should control decisions. Responding wisely is important.`,
  },
  {
    term: "Time",
    notes: `Time is the measure of moments. In the Bible, time is purposeful and ordered. It is not random. How time is used matters. It reflects priorities and direction.`,
  },
  {
    term: "Trade",
    notes: `Trade is the exchange of goods. In the Bible, it required fairness and honesty. Trade built relationships between people. Dishonest trade was condemned. It reflects integrity in dealings.`,
  },
  {
    term: "Trouble",
    notes: `Trouble is difficulty or distress. In the Bible, trouble is part of life. It tests faith and endurance. Trouble can lead to growth. It reveals strength and weakness.`,
  },
  {
    term: "Trust",
    notes: `Trust is relying on someone. In the Bible, trust is placed in God. It requires faith and confidence. Trust shapes decisions. Without trust, fear takes over.`,
  },
  {
    term: "Vanity",
    notes: `Vanity is emptiness or lack of value. In the Bible, vain things have no lasting meaning. They focus on appearance over truth. Vanity leads to emptiness. True value is found in what lasts.`,
  },
  {
    term: "Vision",
    notes: `Vision is seeing what is ahead. In the Bible, vision can be guidance from God. It gives direction and clarity. Vision helps people move forward. It shows purpose.`,
  },
  {
    term: "Voice",
    notes: `Voice is the expression of speech. In the Bible, God's voice brings direction. Listening to the right voice matters. Voices influence decisions. They carry authority and meaning.`,
  },
  {
    term: "Work",
    notes: `Work is effort put into action. In the Bible, work is part of life. It produces results. Work requires discipline. It reflects responsibility.`,
  },
  {
    term: "Youth",
    notes: `Youth is the stage of being young. In the Bible, youth is a time of learning. It shapes future direction. Young people still have responsibility. It is a time of growth.`,
  },
  {
    term: "Appoint",
    notes: `To appoint means to assign a role. In the Bible, people were appointed to positions. It showed authority and purpose. Appointments were intentional. They carried responsibility.`,
  },
  {
    term: "Armed",
    notes: `Armed means prepared for battle. In the Bible, being armed showed readiness. It was not just physical. Preparation mattered. It reflected awareness of danger.`,
  },
  {
    term: "Army",
    notes: `An army is a group organized for battle. In the Bible, armies represented strength and conflict. They required leadership and order. Victory did not always depend on size. God's role was central.`,
  },
  {
    term: "Assign",
    notes: `To assign means to give a task or role. In the Bible, assignments were purposeful. Each person had a role. It created structure. Assignment required responsibility.`,
  },
  {
    term: "Bravery",
    notes: `Bravery is acting despite fear. In the Bible, bravery comes from trust in God. It is not the absence of fear. It shows courage. Bravery leads to action.`,
  },
  {
    term: "Brethren",
    notes: `Brethren refers to brothers or close community. In the Bible, it includes people connected by faith. It shows unity and relationship. Brethren support each other. It reflects belonging.`,
  },
  {
    term: "Captain",
    notes: `A captain is a leader over others. In the Bible, captains led groups in battle. They gave direction. Leadership carried responsibility. A captain influenced outcomes.`,
  },
  {
    term: "City gate",
    notes: `The city gate was the place of entry. In the Bible, it was also where decisions were made. Leaders gathered there. It was a place of authority. What happened there affected the city.`,
  },
  {
    term: "Conquer",
    notes: `To conquer means to overcome completely. In the Bible, conquest required strength and strategy. Victory was often tied to God's help. Conquering showed dominance. It led to possession.`,
  },
  {
    term: "Conquest",
    notes: `Conquest is the act of taking control. In the Bible, it often involved land and territory. It required action and persistence. Conquest changed ownership. It showed fulfillment of promise.`,
  },
  {
    term: "Defeat",
    notes: `Defeat is losing a battle. In the Bible, defeat revealed weakness or disobedience. It was not always final. Defeat could lead to learning. It showed need for change.`,
  },
  {
    term: "Dispossess",
    notes: `To dispossess means to remove someone from their place. In the Bible, it often referred to taking land. It changed control and ownership. It required authority. It showed transition.`,
  },
  {
    term: "Exterminate",
    notes: `To exterminate means to completely destroy. In the Bible, it was used in judgment contexts. It showed total removal. It was serious and final. It reflected complete action.`,
  },
  {
    term: "Fierce",
    notes: `Fierce means intense and strong. In the Bible, it often describes battle or emotion. Fierceness shows power. It can be controlled or destructive. It reflects intensity.`,
  },
  {
    term: "Fight",
    notes: `To fight is to engage in conflict. In the Bible, fights could be physical or spiritual. It required strength and strategy. Not every fight should be taken. Fighting shows resistance.`,
  },
  {
    term: "Fortified",
    notes: `Fortified means strengthened for protection. In the Bible, cities were fortified against attack. It created defense. Fortification showed preparation. It provided security.`,
  },
  {
    term: "Fury",
    notes: `Fury is intense anger. In the Bible, fury can lead to destruction. It is powerful and dangerous. Fury lacks control. It must be restrained.`,
  },
  {
    term: "Good courage",
    notes: `Good courage is strong confidence. In the Bible, it comes from trusting God. It allows people to act boldly. Courage is strengthened through faith. It leads to action.`,
  },
  {
    term: "Grasp",
    notes: `To grasp means to take hold of something. In the Bible, it can be physical or mental. Grasping shows understanding or possession. It requires effort. It reflects control.`,
  },
  {
    term: "Haste",
    notes: `Haste is acting quickly without thinking. In the Bible, haste often leads to mistakes. It lacks wisdom. Patience is better. Haste can bring regret.`,
  },
  {
    term: "Heritage portion",
    notes: `A heritage portion is what is passed down. In the Bible, it often refers to land or blessing. It connects generations. It carries value and responsibility. It shows inheritance.`,
  },
  {
    term: "Inherit",
    notes: `To inherit means to receive something passed down. In the Bible, inheritance connects to promise. It is not always earned. It is received. It shapes identity.`,
  },
  {
    term: "Mighty",
    notes: `Mighty means strong and powerful. In the Bible, it often describes God or warriors. It reflects ability and strength. Might brings impact. It shows power.`,
  },
  {
    term: "Pursue",
    notes: `To pursue means to chase after something. In the Bible, pursuit can be good or bad. It shows focus and determination. What you pursue shapes your life. Direction matters.`,
  },
  {
    term: "Put to death",
    notes: `To put to death means to end life. In the Bible, it was part of judgment. It showed seriousness of sin. It was not taken lightly. It reflects consequence.`,
  },
  {
    term: "Remain",
    notes: `To remain means to stay in place. In the Bible, remaining shows stability. It reflects consistency. Not everything changes. Remaining shows endurance.`,
  },
  {
    term: "Slay",
    notes: `To slay means to kill in battle. In the Bible, it often describes warfare. It shows victory or judgment. It is direct and forceful. It reflects conflict.`,
  },
  {
    term: "Summon",
    notes: `To summon means to call someone forward. In the Bible, it shows authority. People respond when summoned. It requires attention. It reflects command.`,
  },
  {
    term: "Swear",
    notes: `To swear means to make a serious promise. In the Bible, it involves commitment. It is not to be done lightly. Breaking it brings consequences. It reflects integrity.`,
  },
];

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const item of KEYWORD_NOTES) {
    const normalized = item.term.toLowerCase().trim().replace(/\s+/g, " ");
    const notesText = extractCompactPopupMeaning("keywords", item.notes);

    const { error } = await supabase
      .from("keywords_in_the_bible")
      .upsert(
        {
          keyword: normalized,
          notes_text: notesText,
        },
        { onConflict: "keyword" }
      );

    if (error) {
      throw new Error(`Failed for ${item.term}: ${error.message}`);
    }
  }

  console.log(`Seeded ${KEYWORD_NOTES.length} manual keyword popup notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
