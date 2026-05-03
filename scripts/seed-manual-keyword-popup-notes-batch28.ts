import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Epidemic",
    notes: `An epidemic is a widespread disease affecting many people. In the Bible, it can represent judgment or consequence. It spreads quickly across a community. It shows vulnerability. It reflects the need for protection and cleansing.`,
  },
  {
    term: "Exclusion",
    notes: `Exclusion means being kept out. In the Bible, it often relates to impurity or separation. It limits access to sacred spaces. It shows boundaries. It reflects distinction between clean and unclean.`,
  },
  {
    term: "Excrement",
    notes: `Excrement is bodily waste. In the Bible, it is associated with uncleanness. It must be handled carefully. It reflects impurity. It shows need for separation and hygiene.`,
  },
  {
    term: "Fat portions",
    notes: `Fat portions were considered the best part of an offering. In the Bible, they were given to God. They symbolized richness and value. They were not kept by the offerer. It reflects giving the best.`,
  },
  {
    term: "Fragrance",
    notes: `Fragrance is a pleasing smell. In the Bible, offerings produced fragrance before God. It symbolized acceptance. It reflected satisfaction. It shows what is pleasing.`,
  },
  {
    term: "Frost",
    notes: `Frost is a thin layer of ice. In the Bible, it shows natural conditions. It affects growth. It reflects change in season. It shows environmental impact.`,
  },
  {
    term: "Goat",
    notes: `A goat is an animal used in sacrifice. In the Bible, it represents offering and atonement. It plays a role in rituals. It reflects substitution. It shows provision.`,
  },
  {
    term: "Harvest feast",
    notes: `A harvest feast celebrates gathering crops. In the Bible, it reflects gratitude for provision. It marks completion of growth. It brings people together. It shows thankfulness.`,
  },
  {
    term: "Holy fire",
    notes: `Holy fire represents God's presence. In the Bible, it is not ordinary fire. It consumes offerings. It shows divine acceptance or judgment. It reflects power.`,
  },
  {
    term: "Holy season",
    notes: `A holy season is a set time for worship. In the Bible, it is marked by specific practices. It requires attention. It reflects sacred timing. It shows dedication.`,
  },
  {
    term: "Holy year",
    notes: `A holy year is a special period set apart. In the Bible, it includes rest and restoration. It resets cycles. It reflects obedience. It shows divine order.`,
  },
  {
    term: "Incense altar",
    notes: `The incense altar was used for burning incense. In the Bible, it symbolized prayer rising to God. It was part of worship. It required purity. It reflects connection.`,
  },
  {
    term: "Infection",
    notes: `Infection is the spread of disease. In the Bible, it caused impurity. It required separation. It reflects contamination. It shows need for cleansing.`,
  },
  {
    term: "Infestation",
    notes: `Infestation is an overwhelming presence of pests. In the Bible, it can represent judgment or decay. It spreads quickly. It affects everything. It reflects destruction.`,
  },
  {
    term: "Injustice",
    notes: `Injustice is unfair treatment. In the Bible, it is strongly condemned. It harms others. It breaks order. It reflects wrongdoing.`,
  },
  {
    term: "Inner sanctuary",
    notes: `The inner sanctuary is the most sacred space. In the Bible, it holds God's presence. Access is limited. It requires purity. It reflects holiness.`,
  },
  {
    term: "Justice law",
    notes: `Justice law defines fairness. In the Bible, it ensures right judgment. It protects people. It reflects order. It shows accountability.`,
  },
  {
    term: "Male goat",
    notes: `A male goat was used in sacrifice. In the Bible, it represents atonement. It is part of ritual practice. It reflects substitution. It shows offering.`,
  },
  {
    term: "Measuring",
    notes: `Measuring is determining size or amount. In the Bible, it ensures fairness. It creates accuracy. It reflects order. It shows precision.`,
  },
  {
    term: "Memorial portion",
    notes: `A memorial portion is set aside in offering. In the Bible, it reminds of dedication. It connects to remembrance. It reflects acknowledgment. It shows significance.`,
  },
  {
    term: "Molten image",
    notes: `A molten image is an idol made by melting metal. In the Bible, it represents false worship. It replaces truth. It reflects error. It shows idolatry.`,
  },
  {
    term: "Monthly offering",
    notes: `A monthly offering is given regularly. In the Bible, it follows set times. It shows consistency. It reflects devotion. It shows rhythm.`,
  },
  {
    term: "Mold infection",
    notes: `Mold infection is decay in material. In the Bible, it required removal. It spreads if unchecked. It reflects impurity. It shows deterioration.`,
  },
  {
    term: "Night offering",
    notes: `A night offering is given at evening. In the Bible, it completes daily worship. It shows consistency. It reflects devotion. It marks time.`,
  },
  {
    term: "Oblation",
    notes: `An oblation is an offering to God. In the Bible, it can be grain or other gifts. It reflects giving. It shows dedication. It represents worship.`,
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
