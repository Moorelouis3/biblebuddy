import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Vine",
    notes: `A vine is a plant that grows and produces fruit. In the Bible, it often represents life and connection. People are compared to branches connected to a vine. The vine is the source of growth. Without connection, nothing can grow. It shows dependence and relationship.`,
  },
  {
    term: "Walk",
    notes: `Walk refers to how someone lives their life. In the Bible, it is not just physical movement. It represents daily behavior. How you walk shows your direction. It reflects your choices. Walking rightly leads to good outcomes.`,
  },
  {
    term: "Way",
    notes: `The way is a path or direction. In the Bible, it represents a lifestyle or approach to life. Different ways lead to different outcomes. Choosing the right way matters. It shows direction and purpose.`,
  },
  {
    term: "Wealth",
    notes: `Wealth is having abundance or resources. In the Bible, wealth is not always a sign of blessing. It can be used well or misused. True value is not just in possessions. Wealth requires wisdom.`,
  },
  {
    term: "Weights",
    notes: `Weights were used for measuring. In the Bible, they represent fairness in trade. Dishonest weights were condemned. Accurate measurement showed integrity. It reflects fairness in dealings.`,
  },
  {
    term: "Wickedness",
    notes: `Wickedness is deep wrongdoing. In the Bible, it goes beyond simple mistakes. It shows a pattern of evil behavior. Wickedness leads to destruction. It reflects a heart turned away from God.`,
  },
  {
    term: "Wife",
    notes: `A wife is a partner in marriage. In the Bible, marriage is a covenant relationship. A wife plays a vital role in the household. It is built on commitment and unity. This relationship reflects partnership and support.`,
  },
  {
    term: "Adversity",
    notes: `Adversity is hardship or difficulty. In the Bible, adversity tests character. It reveals strength and weakness. Adversity is not meaningless. It can lead to growth.`,
  },
  {
    term: "Banquet",
    notes: `A banquet is a large meal or feast. In the Bible, it often represents celebration or blessing. It brings people together. Banquets mark important moments. They symbolize abundance and joy.`,
  },
  {
    term: "Better",
    notes: `Better refers to something of greater value. In the Bible, it often compares wisdom to wealth. Not everything that looks good is better. True value must be understood. Better choices lead to better outcomes.`,
  },
  {
    term: "Blindness",
    notes: `Blindness is the inability to see. In the Bible, it can be physical or spiritual. Spiritual blindness is lack of understanding. It prevents people from seeing truth. Clarity comes through awareness.`,
  },
  {
    term: "Bloodshed",
    notes: `Bloodshed is the taking of life. In the Bible, it is taken very seriously. It represents violence and injustice. Bloodshed brings consequences. Life is valuable and not to be taken lightly.`,
  },
  {
    term: "Boldness",
    notes: `Boldness is confidence in action. In the Bible, it often comes from trust in God. Boldness is not arrogance. It allows people to act without fear. It reflects courage and faith.`,
  },
  {
    term: "Boundary",
    notes: `A boundary is a limit or line. In the Bible, boundaries create order. They define what is allowed. Crossing boundaries brings consequences. They protect what is important.`,
  },
  {
    term: "Careless",
    notes: `Careless means lacking attention or concern. In the Bible, careless actions lead to problems. It shows lack of responsibility. Carelessness can cause harm. Attention prevents mistakes.`,
  },
  {
    term: "Chamber",
    notes: `A chamber is a private room. In the Bible, it can represent privacy or secrecy. Important moments often happen in private spaces. It shows separation from public life. Chambers can be places of rest or decision.`,
  },
  {
    term: "Choice",
    notes: `Choice is selecting between options. In the Bible, choices shape direction. Every decision has consequences. People are responsible for their choices. Choosing wisely leads to life.`,
  },
  {
    term: "Clarity",
    notes: `Clarity is clear understanding. In the Bible, clarity comes from truth. It removes confusion. Clear thinking leads to better decisions. Clarity brings direction.`,
  },
  {
    term: "Clever",
    notes: `Clever means quick thinking or skillful. In the Bible, cleverness can be good or harmful. It depends on how it is used. Clever people can solve problems. But it can also be used for deception.`,
  },
  {
    term: "Collapse",
    notes: `Collapse is falling apart suddenly. In the Bible, collapse often follows weakness or failure. It shows instability. What is not strong will fall. Collapse is the result of poor foundation.`,
  },
  {
    term: "Comfort",
    notes: `Comfort is a state of ease or relief. In the Bible, comfort often comes from God. It helps people in difficult times. Comfort restores strength. It brings peace and reassurance.`,
  },
  {
    term: "Complaint",
    notes: `A complaint is expressing dissatisfaction. In the Bible, constant complaining shows discontent. It reflects lack of trust. Complaints can create negativity. Gratitude is the opposite.`,
  },
  {
    term: "Conflict",
    notes: `Conflict is disagreement or struggle. In the Bible, conflict can arise from pride or misunderstanding. It creates division. Resolving conflict requires wisdom. Peace is preferred over conflict.`,
  },
  {
    term: "Confusion",
    notes: `Confusion is lack of understanding. In the Bible, confusion creates disorder. It prevents clear thinking. Truth brings clarity. Confusion leads to mistakes.`,
  },
  {
    term: "Conscience",
    notes: `Conscience is inner awareness of right and wrong. In the Bible, it guides decisions. A clear conscience brings peace. A troubled conscience brings conviction. It reflects inner condition.`,
  },
  {
    term: "Control",
    notes: `Control is having power over something. In the Bible, self control is valued. Lack of control leads to problems. Control brings stability. It reflects discipline.`,
  },
  {
    term: "Crafty",
    notes: `Crafty means skillful but often deceptive. In the Bible, it can refer to manipulation. It hides true intentions. Craftiness is not always honest. It requires discernment to recognize.`,
  },
  {
    term: "Creditor",
    notes: `A creditor is someone who lends. In the Bible, creditors had authority over debtors. This created obligation. Fairness was required in lending. It shows financial responsibility.`,
  },
  {
    term: "Crime",
    notes: `Crime is breaking the law. In the Bible, it involves wrongdoing against others. Crime brings consequences. It disrupts order. Justice responds to crime.`,
  },
  {
    term: "Cruel",
    notes: `Cruel means causing harm without care. In the Bible, cruelty is condemned. It shows lack of compassion. Cruel actions damage others. Kindness is the opposite.`,
  },
  {
    term: "Damage",
    notes: `Damage is harm or loss. In the Bible, damage often requires restoration. It affects people and property. Damage must be addressed. It shows the impact of actions.`,
  },
  {
    term: "Danger",
    notes: `Danger is risk of harm. In the Bible, danger requires awareness. Ignoring danger leads to trouble. Wisdom avoids unnecessary risk. Protection is needed in danger.`,
  },
  {
    term: "Day",
    notes: `A day is a period of time. In the Bible, days often mark events. They show timing and sequence. Each day has purpose. Time matters in God's plan.`,
  },
  {
    term: "Decision",
    notes: `A decision is making a choice. In the Bible, decisions shape outcomes. They reflect priorities. Wise decisions lead to life. Every decision carries weight.`,
  },
  {
    term: "Defense",
    notes: `Defense is protection against attack. In the Bible, God is often a defense. It guards against harm. Defense provides security. It reflects protection and strength.`,
  },
  {
    term: "Delay",
    notes: `Delay is a pause or waiting period. In the Bible, delays test patience. They are not always denial. Delay can have purpose. Waiting builds trust.`,
  },
  {
    term: "Device",
    notes: `A device is a plan or scheme. In the Bible, it can be used for good or evil. Devices often involve strategy. Some devices are deceptive. It shows intentional thinking.`,
  },
  {
    term: "Dishonor",
    notes: `Dishonor is showing disrespect. In the Bible, dishonor breaks relationships. It reflects lack of value. Dishonor leads to consequences. Honor is the opposite.`,
  },
  {
    term: "Dispute",
    notes: `A dispute is a disagreement. In the Bible, disputes needed resolution. They could lead to conflict. Wisdom helps settle disputes. Peace is the goal.`,
  },
  {
    term: "Division",
    notes: `Division is separation between people. In the Bible, division weakens unity. It often comes from pride or conflict. Division creates instability. Unity brings strength.`,
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
