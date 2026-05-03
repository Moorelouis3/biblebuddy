import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Memory",
    notes: `Memory is the ability to remember what has happened. In the Bible, remembering is important for staying grounded in truth. It helps people not forget what God has done. Memory shapes how people respond in the present. Forgetting can lead to repeating mistakes. Strong memory keeps truth active in your life.`,
  },
  {
    term: "Misery",
    notes: `Misery is deep suffering or distress. In the Bible, misery often comes from hardship or poor choices. It reflects a state of pain and struggle. Misery can lead people to seek change. It shows the weight of difficult circumstances.`,
  },
  {
    term: "Money",
    notes: `Money is a form of exchange. In the Bible, money is not evil, but it can be misused. It reveals priorities and values. Money must be handled wisely. It should not control a person.`,
  },
  {
    term: "Night",
    notes: `Night is a time of darkness. In the Bible, it can represent uncertainty or danger. It is also a time of rest. Night contrasts with light. It shows transition and timing.`,
  },
  {
    term: "Nourishment",
    notes: `Nourishment is what sustains growth. In the Bible, it applies to both body and spirit. It provides strength and energy. Without nourishment, growth stops. It shows the need for consistent supply.`,
  },
  {
    term: "Offense",
    notes: `An offense is something that causes hurt or wrongdoing. In the Bible, offenses can damage relationships. They require response or resolution. Ignoring offense can lead to conflict. Dealing with it brings clarity.`,
  },
  {
    term: "Opportunity",
    notes: `Opportunity is a chance to act. In the Bible, opportunities are moments to make choices. They do not last forever. Recognizing them requires awareness. Taking opportunity leads to growth.`,
  },
  {
    term: "Outcome",
    notes: `Outcome is the result of actions. In the Bible, outcomes reflect decisions made. What is done leads somewhere. Outcomes show consequences. They reveal direction.`,
  },
  {
    term: "Overflow",
    notes: `Overflow is having more than enough. In the Bible, it reflects abundance. It goes beyond basic need. Overflow can be shared with others. It shows provision and increase.`,
  },
  {
    term: "Pain",
    notes: `Pain is physical or emotional suffering. In the Bible, pain is part of life. It reveals areas that need attention. Pain can lead to growth. It is not meaningless.`,
  },
  {
    term: "Penalty",
    notes: `Penalty is a consequence for wrongdoing. In the Bible, penalties enforce justice. They show accountability. Actions have results. Penalty maintains order.`,
  },
  {
    term: "Peril",
    notes: `Peril is serious danger. In the Bible, peril requires awareness. It can come suddenly. Avoiding peril requires wisdom. It shows vulnerability.`,
  },
  {
    term: "Pleasure",
    notes: `Pleasure is enjoyment or satisfaction. In the Bible, pleasure is not always wrong. But it can become harmful if uncontrolled. It must be balanced with wisdom. Pleasure should not replace truth.`,
  },
  {
    term: "Plot",
    notes: `A plot is a planned action. In the Bible, plots can be good or evil. They involve intention. Some plots are hidden. They show strategic thinking.`,
  },
  {
    term: "Purpose",
    notes: `Purpose is the reason something exists. In the Bible, purpose is connected to God's plan. Living with purpose brings direction. Without it, people drift. Purpose gives meaning to actions.`,
  },
  {
    term: "Quiet",
    notes: `Quiet is a state of calm. In the Bible, quietness allows reflection. It creates space to think clearly. Noise can distract. Quiet brings focus.`,
  },
  {
    term: "Rage",
    notes: `Rage is intense anger. In the Bible, uncontrolled anger leads to harm. Rage can damage relationships. It lacks restraint. Control is necessary.`,
  },
  {
    term: "Rebellion",
    notes: `Rebellion is resisting authority. In the Bible, it often refers to turning away from God. It is deliberate disobedience. Rebellion brings consequences. It reflects a resistant heart.`,
  },
  {
    term: "Regret",
    notes: `Regret is sorrow over past actions. In the Bible, regret can lead to change. It shows awareness of mistakes. Regret is not the end. It can lead to growth.`,
  },
  {
    term: "Rejoice",
    notes: `To rejoice is to express joy. In the Bible, rejoicing is encouraged. It reflects gratitude and trust. Rejoicing lifts the spirit. It focuses on what is good.`,
  },
  {
    term: "Reputation",
    notes: `Reputation is how others see you. In the Bible, it is shaped by actions. A good reputation builds trust. It reflects character. It must be maintained.`,
  },
  {
    term: "Request",
    notes: `A request is asking for something. In the Bible, people bring requests to God. It shows dependence. Requests require humility. They express need.`,
  },
  {
    term: "Respect",
    notes: `Respect is showing value to others. In the Bible, respect maintains order. It reflects humility. Respect builds relationships. It shows awareness of others.`,
  },
  {
    term: "Restraint",
    notes: `Restraint is self control. In the Bible, restraint prevents harm. It controls emotions and actions. Without restraint, problems grow. It reflects discipline.`,
  },
  {
    term: "Risk",
    notes: `Risk is exposure to danger. In the Bible, risks are sometimes necessary. They require wisdom. Not all risks are wise. Discernment is needed.`,
  },
  {
    term: "Safety",
    notes: `Safety is protection from harm. In the Bible, safety is often found in God. It brings peace and security. Safety allows stability. It reflects protection.`,
  },
  {
    term: "Scheme",
    notes: `A scheme is a planned action, often hidden. In the Bible, schemes can be deceptive. They involve strategy. Not all schemes are good. They require awareness to recognize.`,
  },
  {
    term: "Secret",
    notes: `A secret is something hidden. In the Bible, secrets can be revealed. Hidden things do not always stay hidden. Secrets carry weight. They require careful handling.`,
  },
  {
    term: "Security",
    notes: `Security is a sense of safety and stability. In the Bible, true security comes from God. It is not based on circumstances. Security brings confidence. It reflects trust.`,
  },
  {
    term: "Sense",
    notes: `Sense is understanding or awareness. In the Bible, sense helps guide decisions. It allows clear thinking. Lack of sense leads to mistakes. It reflects wisdom.`,
  },
  {
    term: "Servant",
    notes: `A servant is someone who serves others. In the Bible, serving is a valued role. It requires humility. A servant acts for others. It reflects dedication.`,
  },
  {
    term: "Shadow",
    notes: `A shadow is a dark area caused by light being blocked. In the Bible, it can represent protection or uncertainty. Shadows show presence of something greater. They can provide covering. They reflect closeness.`,
  },
  {
    term: "Silence",
    notes: `Silence is the absence of sound. In the Bible, silence can be meaningful. It allows reflection. Not every moment needs words. Silence brings focus.`,
  },
  {
    term: "Stability",
    notes: `Stability is being steady and secure. In the Bible, stability comes from strong foundation. It prevents collapse. Stable people endure challenges. It reflects consistency.`,
  },
  {
    term: "Step",
    notes: `A step is a single movement forward. In the Bible, steps represent progress. Each step leads somewhere. Small actions matter. Steps build direction.`,
  },
  {
    term: "Strength",
    notes: `Strength is power or ability. In the Bible, true strength comes from God. It is not just physical. Strength helps endure difficulty. It reflects capability.`,
  },
  {
    term: "Success",
    notes: `Success is achieving a desired outcome. In the Bible, success is tied to obedience. It is not just external results. True success aligns with purpose. It reflects right direction.`,
  },
  {
    term: "Support",
    notes: `Support is helping or holding something up. In the Bible, people are called to support each other. It provides strength. Support builds unity. It reflects care.`,
  },
  {
    term: "Temper",
    notes: `Temper is emotional control. In the Bible, controlling temper is important. Uncontrolled anger leads to harm. Temper shows discipline. It reflects inner condition.`,
  },
  {
    term: "Test",
    notes: `A test is a trial or challenge. In the Bible, tests reveal what is inside. They show strength or weakness. Tests are not random. They lead to growth.`,
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
