import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Pledge",
    notes: `A pledge is a promise or guarantee. In the Bible, a pledge often involved giving something as security. It showed commitment and responsibility. Breaking a pledge damaged trust. It was not meant to be taken lightly. A pledge reflected integrity and accountability.`,
  },
  {
    term: "Planning",
    notes: `Planning is preparing ahead of time. In the Bible, wise people plan carefully. It shows foresight and understanding. Planning helps avoid problems. It creates direction and purpose. Good planning reflects wisdom, not control.`,
  },
  {
    term: "Poor",
    notes: `The poor are those lacking resources. In the Bible, the poor are to be cared for and protected. They are not to be ignored or exploited. God shows concern for them. Helping the poor reflects compassion.`,
  },
  {
    term: "Poverty",
    notes: `Poverty is a state of lack. In the Bible, it can result from circumstances or choices. It creates need and vulnerability. People were called to respond with care. Poverty reveals dependence and need for support.`,
  },
  {
    term: "Precept",
    notes: `A precept is a guiding instruction. In the Bible, precepts are specific teachings from God. They provide direction for living. Precepts are meant to be followed. They shape behavior and understanding.`,
  },
  {
    term: "Preparation",
    notes: `Preparation is getting ready ahead of time. In the Bible, preparation is often necessary before action. It shows wisdom and readiness. Being prepared prevents failure. Preparation leads to better outcomes.`,
  },
  {
    term: "Profit",
    notes: `Profit is gain or benefit. In the Bible, not all profit is good. Some gain can come at a cost. True profit aligns with what is right. It requires wisdom to understand value.`,
  },
  {
    term: "Promise",
    notes: `A promise is a commitment to do something. In the Bible, God's promises are reliable. People are also expected to keep their promises. A promise builds trust. Breaking it damages relationships.`,
  },
  {
    term: "Prosperity",
    notes: `Prosperity is a state of success or well being. In the Bible, it is not just material wealth. It includes stability and peace. True prosperity comes from God. It reflects alignment with His ways.`,
  },
  {
    term: "Prudence",
    notes: `Prudence is careful and wise thinking. In the Bible, prudent people avoid danger. They think before acting. Prudence brings protection. It shows awareness and discipline.`,
  },
  {
    term: "Punishment",
    notes: `Punishment is a consequence for wrongdoing. In the Bible, it reflects justice. It is not random or unfair. Punishment corrects behavior. It shows that actions matter.`,
  },
  {
    term: "Quarrel",
    notes: `A quarrel is an argument or conflict. In the Bible, quarrels are often unnecessary. They create division. Avoiding quarrels shows wisdom. Peace is valued over conflict.`,
  },
  {
    term: "Recompense",
    notes: `Recompense is repayment for actions. In the Bible, it can be positive or negative. It reflects justice and balance. What is done returns in some form. Recompense completes the outcome.`,
  },
  {
    term: "Riches",
    notes: `Riches are wealth or abundance. In the Bible, riches are not the ultimate goal. They can be a blessing or a distraction. True value goes beyond money. Riches require responsibility.`,
  },
  {
    term: "Righteous",
    notes: `Righteous means living rightly. In the Bible, it reflects alignment with God's standards. It is shown through actions. Righteousness builds trust and stability. It reflects integrity.`,
  },
  {
    term: "Road",
    notes: `A road is a path or way to travel. In the Bible, it represents direction in life. Different roads lead to different outcomes. Choosing the right road matters. It reflects decision and movement.`,
  },
  {
    term: "Scoffer",
    notes: `A scoffer is someone who mocks truth. In the Bible, scoffers reject wisdom. They make fun of what is right. They resist correction. Scoffing leads to downfall.`,
  },
  {
    term: "Scorner",
    notes: `A scorner is similar to a scoffer. In the Bible, they show contempt for truth. They reject instruction. They spread negativity. Scorners resist growth.`,
  },
  {
    term: "Seduction",
    notes: `Seduction is leading someone into wrongdoing. In the Bible, it often refers to temptation. It appeals to desire. Seduction pulls people away from truth. It requires awareness to resist.`,
  },
  {
    term: "Sensual",
    notes: `Sensual refers to living by physical desire. In the Bible, it is often contrasted with discipline. It focuses on immediate satisfaction. Sensual living lacks control. It leads away from wisdom.`,
  },
  {
    term: "Shield",
    notes: `A shield is protection from harm. In the Bible, God is described as a shield. It blocks danger and attack. It represents security. A shield provides defense.`,
  },
  {
    term: "Simple",
    notes: `Simple refers to someone inexperienced. In the Bible, simple people lack understanding. They are easily influenced. They need guidance. Growth brings wisdom.`,
  },
  {
    term: "Smooth",
    notes: `Smooth refers to something pleasing or easy sounding. In the Bible, smooth words can be deceptive. They may hide truth. Not everything smooth is good. Discernment is needed.`,
  },
  {
    term: "Sorrow",
    notes: `Sorrow is deep sadness. In the Bible, sorrow comes from loss or pain. It is a real experience. Sorrow can lead to reflection. God meets people in sorrow.`,
  },
  {
    term: "Soul",
    notes: `The soul is the inner being. In the Bible, it represents life and identity. It goes beyond the physical body. The soul connects to God. It reflects who a person truly is.`,
  },
  {
    term: "Spirit",
    notes: `The spirit is the inner life force. In the Bible, it relates to connection with God. It influences thoughts and actions. The spirit shapes direction. It reflects inner condition.`,
  },
  {
    term: "Storehouse",
    notes: `A storehouse is a place of storage. In the Bible, it represents provision and supply. It holds resources for future use. A storehouse shows preparation. It reflects planning and provision.`,
  },
  {
    term: "Strong Tower",
    notes: `A strong tower is a place of safety. In the Bible, God is compared to a strong tower. It provides protection and refuge. People run to it for security. It represents strength and safety.`,
  },
  {
    term: "Stubborn",
    notes: `Stubborn means refusing to change. In the Bible, stubbornness resists correction. It shows pride. Stubborn people reject wisdom. It leads to negative outcomes.`,
  },
  {
    term: "Talebearer",
    notes: `A talebearer spreads stories about others. In the Bible, this causes division. It damages trust. Talebearing spreads conflict. It should be avoided.`,
  },
  {
    term: "Teaching",
    notes: `Teaching is sharing knowledge. In the Bible, it guides understanding. It shapes behavior. Good teaching leads to growth. It influences others deeply.`,
  },
  {
    term: "Temperate",
    notes: `Temperate means self controlled. In the Bible, it reflects discipline. It avoids excess. Temperance brings balance. It shows maturity.`,
  },
  {
    term: "Toil",
    notes: `Toil is hard work. In the Bible, it often comes with effort and struggle. It produces results over time. Toil requires endurance. It reflects persistence.`,
  },
  {
    term: "Trap",
    notes: `A trap is something that catches unexpectedly. In the Bible, it represents danger. People can fall into traps unknowingly. Awareness helps avoid them. Traps lead to harm.`,
  },
  {
    term: "Treacherous",
    notes: `Treacherous means untrustworthy or deceitful. In the Bible, it refers to betrayal. Treacherous people cannot be relied on. They break trust. It leads to harm in relationships.`,
  },
  {
    term: "Treasure",
    notes: `Treasure is something valuable. In the Bible, it can be material or spiritual. True treasure is lasting. It reflects what a person values. Treasure shapes focus.`,
  },
  {
    term: "Uprightness",
    notes: `Uprightness means living with integrity. In the Bible, it reflects honesty and righteousness. It shows consistency. Upright people can be trusted. It leads to stability.`,
  },
  {
    term: "Vain",
    notes: `Vain means empty or without value. In the Bible, vain actions have no lasting purpose. They focus on appearance over substance. Vanity leads to emptiness. True value is found in what matters.`,
  },
  {
    term: "Verdict",
    notes: `A verdict is a final decision. In the Bible, verdicts come from judgment. They determine outcome. Verdicts carry authority. They bring closure.`,
  },
  {
    term: "Violence",
    notes: `Violence is harmful force. In the Bible, it is often condemned. It destroys peace and order. Violence causes suffering. It reflects a lack of control.`,
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
