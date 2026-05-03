import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Expel",
    notes: `To expel means to force someone out. In the Bible, people were expelled from places as judgment or removal. It changes who belongs where. Expulsion is not gentle. It reflects authority and separation.`,
  },
  {
    term: "Fall before",
    notes: `To fall before means to be defeated or submit. In the Bible, enemies often fell before others in battle. It shows loss of power. Falling reflects surrender. It marks the outcome of conflict.`,
  },
  {
    term: "Fighting men",
    notes: `Fighting men are those prepared for battle. In the Bible, they were trained and ready. They followed leadership. Their role was direct and active. It reflects readiness and strength.`,
  },
  {
    term: "Fortify",
    notes: `To fortify means to strengthen for defense. In the Bible, cities were fortified against attack. It created protection. Fortifying required preparation. It reflects security.`,
  },
  {
    term: "Gather troops",
    notes: `To gather troops means to bring forces together. In the Bible, it was done before battle. It showed preparation. Gathering created strength in numbers. It reflects organization.`,
  },
  {
    term: "Give over",
    notes: `To give over means to surrender something. In the Bible, it often refers to handing control away. It shows release. Giving over can be voluntary or forced. It reflects transfer of authority.`,
  },
  {
    term: "Hand over",
    notes: `To hand over means to transfer control. In the Bible, it often involved authority or people. It shows change in power. Handing over is intentional. It reflects responsibility shifting.`,
  },
  {
    term: "Heart strengthened",
    notes: `A heart strengthened means increased courage. In the Bible, strength often comes from God. It allows endurance. A strong heart faces difficulty. It reflects inner stability.`,
  },
  {
    term: "Honor covenant",
    notes: `To honor covenant means to keep an agreement. In the Bible, covenants were serious commitments. Honoring them showed loyalty. Breaking them brought consequences. It reflects faithfulness.`,
  },
  {
    term: "Inheritance boundary",
    notes: `An inheritance boundary defines limits of land. In the Bible, boundaries were clearly set. They protected each portion. Boundaries prevented conflict. It reflects order and ownership.`,
  },
  {
    term: "Inheritance division",
    notes: `Inheritance division is the distribution of portions. In the Bible, land was divided among people. Each received a share. Division created identity. It reflects allocation and fairness.`,
  },
  {
    term: "Keep covenant",
    notes: `To keep covenant means to remain faithful. In the Bible, it required obedience. It showed commitment. Keeping covenant maintained relationship. It reflects loyalty.`,
  },
  {
    term: "Keep law",
    notes: `To keep law means to follow instructions. In the Bible, it reflects obedience. It brings order and direction. Keeping the law requires discipline. It reflects accountability.`,
  },
  {
    term: "Land division",
    notes: `Land division is the allocation of territory. In the Bible, it was carefully planned. Each group received a portion. It established ownership. It reflects structure.`,
  },
  {
    term: "Land promise",
    notes: `A land promise is a commitment to give land. In the Bible, it was given by God. It required faith to receive. The promise guided direction. It reflects future inheritance.`,
  },
  {
    term: "Lineage",
    notes: `Lineage is a line of descent. In the Bible, lineage connects generations. It shows identity and history. It carries significance. It reflects continuity.`,
  },
  {
    term: "Loyal",
    notes: `Loyal means staying faithful. In the Bible, loyalty reflects commitment. It remains through difficulty. Loyalty builds trust. It reflects strong character.`,
  },
  {
    term: "Military",
    notes: `Military refers to organized forces. In the Bible, it was structured and directed. It required leadership. Military strength was not everything. It reflects organized power.`,
  },
  {
    term: "Military order",
    notes: `Military order is structured arrangement. In the Bible, order created discipline. It ensured effectiveness. Without order, chaos happens. It reflects control.`,
  },
  {
    term: "Military strength",
    notes: `Military strength is power in battle. In the Bible, it included numbers and skill. But true strength often came from God. It reflects capability. Strength determines outcome.`,
  },
  {
    term: "Obedient",
    notes: `Obedient means following instructions. In the Bible, obedience shows trust. It requires action. Obedience leads to stability. It reflects submission.`,
  },
  {
    term: "Overthrow enemy",
    notes: `To overthrow an enemy means to defeat completely. In the Bible, it ends opposition. It shows victory. Overthrow changes control. It reflects dominance.`,
  },
  {
    term: "Pass through",
    notes: `To pass through means to move across. In the Bible, it marks transition. It leads to new places. Passing through requires movement. It reflects change.`,
  },
  {
    term: "Peace treaty",
    notes: `A peace treaty is an agreement to stop conflict. In the Bible, it created stability. It required commitment. Breaking it caused conflict. It reflects agreement.`,
  },
  {
    term: "Persist",
    notes: `To persist means to continue. In the Bible, persistence shows determination. It overcomes difficulty. Persisting leads to results. It reflects endurance.`,
  },
  {
    term: "Possession right",
    notes: `Possession right is the claim to own something. In the Bible, it was tied to inheritance. It showed authority. Rights had to be respected. It reflects ownership.`,
  },
  {
    term: "Prepare",
    notes: `To prepare means to get ready. In the Bible, preparation comes before action. It shows wisdom. Prepared people act better. It reflects readiness.`,
  },
  {
    term: "Priestly service",
    notes: `Priestly service is work done by priests. In the Bible, it involved worship duties. It required purity. Service followed structure. It reflects dedication.`,
  },
  {
    term: "Pursuit",
    notes: `Pursuit is chasing after something. In the Bible, it shows determination. What is pursued shapes life. Pursuit requires focus. It reflects direction.`,
  },
  {
    term: "Put under ban",
    notes: `To put under ban means to set apart for destruction. In the Bible, nothing was to be kept. It showed complete removal. The ban was serious. It reflects separation.`,
  },
  {
    term: "Rebel",
    notes: `A rebel resists authority. In the Bible, rebellion leads to consequences. It shows refusal to follow. Rebels oppose direction. It reflects defiance.`,
  },
  {
    term: "Reinforce",
    notes: `To reinforce means to strengthen. In the Bible, strength is increased for stability. It adds support. Reinforcement prevents collapse. It reflects preparation.`,
  },
  {
    term: "Remain faithful",
    notes: `To remain faithful means to stay committed. In the Bible, faithfulness is consistent. It continues through difficulty. Faithfulness builds trust. It reflects loyalty.`,
  },
  {
    term: "Renew covenant",
    notes: `To renew covenant means to restore agreement. In the Bible, people recommitted to God. It refreshed relationship. Renewal brings clarity. It reflects recommitment.`,
  },
  {
    term: "Rest from war",
    notes: `Rest from war means a pause in conflict. In the Bible, it brought peace. It allowed recovery. Rest followed effort. It reflects relief.`,
  },
  {
    term: "Return to camp",
    notes: `To return to camp means to go back to base. In the Bible, it marked completion of action. It brought regrouping. Return shows movement cycle. It reflects order.`,
  },
  {
    term: "Rout",
    notes: `To rout means to defeat completely. In the Bible, enemies were scattered. It showed strong victory. Rout ends conflict quickly. It reflects dominance.`,
  },
  {
    term: "Rule over",
    notes: `To rule over means to have authority. In the Bible, rulers guided others. Authority required responsibility. Ruling affects many. It reflects leadership.`,
  },
  {
    term: "Seize",
    notes: `To seize means to take forcefully. In the Bible, it shows action. It involves control. Seizing changes possession. It reflects power.`,
  },
  {
    term: "Set up stones",
    notes: `To set up stones means to create a marker. In the Bible, stones marked events. They served as reminders. Stones held meaning. It reflects memory and testimony.`,
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
