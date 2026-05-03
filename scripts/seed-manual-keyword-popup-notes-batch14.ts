import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Dream",
    notes: `A dream is a vision experienced during sleep. In the Bible, dreams were sometimes used to communicate messages. They could carry meaning or direction. Not every dream had significance, but some revealed truth. Dreams required interpretation. They showed that communication could come in different ways.`,
  },
  {
    term: "Duty",
    notes: `Duty is a responsibility that must be fulfilled. In the Bible, duty was tied to roles and expectations. It was not optional. Fulfilling duty showed discipline and commitment. Ignoring duty led to disorder. Duty reflects accountability.`,
  },
  {
    term: "Escape",
    notes: `Escape is getting away from danger. In the Bible, escape often came through God's help. It showed deliverance from harm. Escape required awareness and action. It reflects protection and rescue.`,
  },
  {
    term: "Establish",
    notes: `To establish means to set something firmly in place. In the Bible, God establishes people, plans, and promises. It creates stability and permanence. What is established remains steady. It reflects strength and foundation.`,
  },
  {
    term: "Example",
    notes: `An example is something that shows how to act. In the Bible, people are called to set good examples. Actions influence others. Examples teach without words. They shape behavior and direction.`,
  },
  {
    term: "Examination",
    notes: `Examination is careful evaluation. In the Bible, people are called to examine themselves. It reveals truth and condition. Examination brings awareness. It leads to correction and growth.`,
  },
  {
    term: "Excellence",
    notes: `Excellence is doing something at a high level. In the Bible, it reflects effort and quality. Excellence honors what is being done. It requires discipline. It shows commitment to doing things well.`,
  },
  {
    term: "Excuse",
    notes: `An excuse is a reason given to avoid responsibility. In the Bible, excuses are often rejected. They prevent growth and accountability. Excuses hide the truth. Taking responsibility is the better path.`,
  },
  {
    term: "Failure",
    notes: `Failure is not succeeding in something. In the Bible, failure is not the end. It reveals weakness or mistake. Failure can lead to learning. Growth often follows failure.`,
  },
  {
    term: "Favor",
    notes: `Favor is approval or support. In the Bible, favor often comes from God. It brings opportunity and blessing. Favor is not always earned. It reflects God's kindness.`,
  },
  {
    term: "Flattery",
    notes: `Flattery is excessive or false praise. In the Bible, it is often used for manipulation. It sounds good but lacks truth. Flattery hides real intentions. It should be recognized and avoided.`,
  },
  {
    term: "Food",
    notes: `Food is what sustains life. In the Bible, it represents provision. God provides what is needed. Food is both physical and symbolic. It shows dependence on provision.`,
  },
  {
    term: "Form",
    notes: `Form is shape or structure. In the Bible, it can refer to outward appearance. Form alone does not define truth. What is inside matters more. Form without substance is empty.`,
  },
  {
    term: "Future",
    notes: `The future is what is ahead. In the Bible, the future is connected to God's plan. It is not fully known. Trust is required. The future holds purpose and direction.`,
  },
  {
    term: "Gift",
    notes: `A gift is something given freely. In the Bible, gifts reflect generosity. They are not earned. Gifts show care and intention. They create connection between people.`,
  },
  {
    term: "Gladness",
    notes: `Gladness is a feeling of joy. In the Bible, it reflects inner happiness. Gladness comes from good things or truth. It lifts the spirit. It shows contentment.`,
  },
  {
    term: "Good",
    notes: `Good means what is right or beneficial. In the Bible, goodness reflects God's nature. It is shown through actions. Good brings positive results. It aligns with truth.`,
  },
  {
    term: "Greed",
    notes: `Greed is the desire for more. In the Bible, greed is warned against. It leads to selfishness. Greed ignores contentment. It creates imbalance.`,
  },
  {
    term: "Habit",
    notes: `A habit is repeated behavior. In the Bible, habits shape life direction. Good habits lead to growth. Bad habits lead to problems. Consistency forms patterns.`,
  },
  {
    term: "Hand",
    notes: `The hand represents action or power. In the Bible, it often symbolizes ability. What is done by the hand matters. It reflects effort and work. Hands show what a person does.`,
  },
  {
    term: "Hardship",
    notes: `Hardship is difficulty or struggle. In the Bible, hardship tests faith. It reveals strength and weakness. Hardship has purpose. It can lead to growth.`,
  },
  {
    term: "Hatred",
    notes: `Hatred is strong dislike or rejection. In the Bible, it leads to conflict. It damages relationships. Hatred opposes love. It brings division.`,
  },
  {
    term: "Hunger",
    notes: `Hunger is the need for food. In the Bible, it can also represent desire. It shows dependence. Hunger drives action. It reflects need and longing.`,
  },
  {
    term: "Hypocrisy",
    notes: `Hypocrisy is pretending to be something you are not. In the Bible, it is strongly condemned. It shows inconsistency. Actions do not match words. It breaks trust.`,
  },
  {
    term: "Ignorance",
    notes: `Ignorance is lack of knowledge. In the Bible, it can lead to mistakes. It is not always intentional. Learning removes ignorance. Understanding brings clarity.`,
  },
  {
    term: "Impulse",
    notes: `Impulse is acting without thinking. In the Bible, impulsive actions lead to problems. They lack wisdom. Control prevents mistakes. Impulse must be managed.`,
  },
  {
    term: "Incline",
    notes: `To incline means to lean toward something. In the Bible, it refers to directing attention. It shows focus and intention. Where you incline matters. It shapes decisions.`,
  },
  {
    term: "Innocent",
    notes: `Innocent means free from wrongdoing. In the Bible, innocence must be protected. False accusations are serious. Innocence reflects purity. It shows lack of guilt.`,
  },
  {
    term: "Intelligence",
    notes: `Intelligence is the ability to understand. In the Bible, it connects to wisdom. It helps in decision making. Intelligence requires application. It is not just knowledge.`,
  },
  {
    term: "King",
    notes: `A king is a ruler with authority. In the Bible, kings were accountable to God. They led nations. Their actions affected many people. Leadership carried responsibility.`,
  },
  {
    term: "Labor",
    notes: `Labor is work or effort. In the Bible, labor produces results. It requires persistence. Work is part of life. Labor leads to provision.`,
  },
  {
    term: "Lazy",
    notes: `Lazy means unwilling to work. In the Bible, laziness leads to lack. It shows lack of discipline. Effort is necessary for growth. Laziness creates problems.`,
  },
  {
    term: "Leadership",
    notes: `Leadership is guiding others. In the Bible, leaders are responsible for direction. They influence people. Good leadership requires wisdom. It carries accountability.`,
  },
  {
    term: "Length",
    notes: `Length refers to duration or extent. In the Bible, it can describe time or measure. Length shows how long something lasts. It reflects continuation. It connects to endurance.`,
  },
  {
    term: "Limit",
    notes: `A limit is a boundary or restriction. In the Bible, limits create order. They define what is allowed. Limits protect from harm. They show structure.`,
  },
  {
    term: "Love",
    notes: `Love is deep care and commitment. In the Bible, it is central to all relationships. Love goes beyond feeling. It is shown through action. It reflects God's nature.`,
  },
  {
    term: "Loyalty",
    notes: `Loyalty is staying faithful. In the Bible, loyalty reflects commitment. It builds trust over time. It remains through difficulty. Loyalty shows true character.`,
  },
  {
    term: "Madness",
    notes: `Madness is lack of control or reason. In the Bible, it can describe foolish behavior. It leads to poor decisions. Madness brings confusion. It reflects disorder.`,
  },
  {
    term: "Malice",
    notes: `Malice is the desire to harm. In the Bible, it is condemned. It shows hatred and intention. Malice damages others. It reflects a wrong heart.`,
  },
  {
    term: "Master",
    notes: `A master is someone with authority over others. In the Bible, it refers to leadership or control. A master has responsibility. Authority must be used rightly. It reflects structure and order.`,
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
