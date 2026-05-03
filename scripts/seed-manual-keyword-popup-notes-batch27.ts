import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Oil of Anointing",
    notes: `The oil of anointing is used to set someone apart. In the Bible, it marks authority or calling. It is not ordinary oil. It reflects consecration. It shows appointment.`,
  },
  {
    term: "Pilgrim Feast",
    notes: `A pilgrim feast is a gathering for worship. In the Bible, people traveled to attend. It showed commitment. It reflected unity. It marked sacred time.`,
  },
  {
    term: "Presentation",
    notes: `Presentation is bringing something forward. In the Bible, offerings are presented to God. It shows intention. It reflects giving. It shows respect.`,
  },
  {
    term: "Priestly Garment",
    notes: `Priestly garments are worn for service. In the Bible, they show role and identity. They are specific and meaningful. They reflect responsibility. They show distinction.`,
  },
  {
    term: "Profanation",
    notes: `Profanation is treating something holy as common. In the Bible, it is a serious offense. It shows disrespect. It reflects misuse. It breaks sacred boundaries.`,
  },
  {
    term: "Public Sin",
    notes: `Public sin is wrongdoing done openly. In the Bible, it affects the community. It requires correction. It reflects accountability. It shows impact beyond the individual.`,
  },
  {
    term: "Ransom Price",
    notes: `A ransom price is payment for release. In the Bible, it restores freedom. It shows cost. It reflects redemption. It brings restoration.`,
  },
  {
    term: "Reverent",
    notes: `Reverent means showing deep respect. In the Bible, it reflects attitude toward God. It requires humility. It reflects awareness. It shows honor.`,
  },
  {
    term: "Sacrificial Blood",
    notes: `Sacrificial blood represents life given. In the Bible, it covers sin. It restores relationship. It reflects atonement. It shows sacrifice.`,
  },
  {
    term: "Scalp Infection",
    notes: `A scalp infection affects the head. In the Bible, it caused uncleanness. It required examination. It reflects impurity. It shows condition.`,
  },
  {
    term: "Scaly Disease",
    notes: `Scaly disease affects the skin. In the Bible, it leads to separation. It requires cleansing. It reflects impurity. It shows isolation.`,
  },
  {
    term: "Separation Offering",
    notes: `A separation offering is given when set apart. In the Bible, it reflects dedication. It marks commitment. It shows intention. It reflects devotion.`,
  },
  {
    term: "Sinful",
    notes: `Sinful means acting against God's law. In the Bible, it separates from God. It leads to consequence. It reflects wrongdoing. It shows need for forgiveness.`,
  },
  {
    term: "Solemn Day",
    notes: `A solemn day is a serious observance. In the Bible, it requires focus and reverence. It is not casual. It reflects importance. It shows sacred timing.`,
  },
  {
    term: "Statutory",
    notes: `Statutory refers to established law. In the Bible, it defines required behavior. It creates structure. It reflects authority. It shows order.`,
  },
  {
    term: "Strain",
    notes: `Strain is pressure or stress. In the Bible, it shows difficulty. It requires endurance. It reflects challenge. It shows tension.`,
  },
  {
    term: "Tassels",
    notes: `Tassels are decorative threads. In the Bible, they remind of commands. They reflect identity. They show obedience. They represent memory.`,
  },
  {
    term: "Thanksgiving Offering",
    notes: `A thanksgiving offering expresses gratitude. In the Bible, it is given willingly. It reflects appreciation. It shows joy. It represents thankfulness.`,
  },
  {
    term: "Trespass Guilt",
    notes: `Trespass guilt comes from wrongdoing. In the Bible, it requires correction. It reflects responsibility. It shows consequence. It leads to restoration.`,
  },
  {
    term: "Unblemished",
    notes: `Unblemished means without defect. In the Bible, offerings must be perfect. It reflects purity. It shows quality. It represents worth.`,
  },
  {
    term: "Uncovered",
    notes: `Uncovered means exposed. In the Bible, it can represent vulnerability. It shows lack of protection. It reflects openness. It shows condition.`,
  },
  {
    term: "Votive",
    notes: `A votive offering is given after a vow. In the Bible, it fulfills commitment. It reflects dedication. It shows follow-through. It represents faithfulness.`,
  },
  {
    term: "Wash Basin",
    notes: `A wash basin is used for cleansing. In the Bible, it prepares for service. It reflects purification. It shows readiness. It represents cleansing.`,
  },
  {
    term: "Yearly Atonement",
    notes: `Yearly atonement is a regular cleansing. In the Bible, it covers sin annually. It restores relationship. It reflects mercy. It shows renewal.`,
  },
  {
    term: "Animal Sacrifice",
    notes: `Animal sacrifice is offering life. In the Bible, it represents substitution. It covers sin. It reflects cost. It shows devotion.`,
  },
  {
    term: "Atonement Day",
    notes: `Atonement day is a set time for covering sin. In the Bible, it was observed once a year. It involved sacrifice and cleansing. It restored relationship with God. It reflects mercy and renewal.`,
  },
  {
    term: "Atonement Ritual Blood",
    notes: `Atonement ritual blood represents life given for cleansing. In the Bible, it was applied in specific ways. It symbolized covering for sin. It restored access to God. It reflects sacrifice and purification.`,
  },
  {
    term: "Burnt Sacrifice",
    notes: `A burnt sacrifice is completely consumed by fire. In the Bible, nothing is held back. It represents total surrender. It shows full dedication. It reflects devotion.`,
  },
  {
    term: "Ceremonial Purity",
    notes: `Ceremonial purity is being clean for worship. In the Bible, it allows access to sacred space. It follows specific guidelines. It reflects separation. It shows readiness.`,
  },
  {
    term: "Clean Animal",
    notes: `A clean animal is acceptable for use. In the Bible, it could be eaten or offered. It met certain standards. It reflects distinction. It shows classification.`,
  },
  {
    term: "Cleansing Ritual",
    notes: `A cleansing ritual removes impurity. In the Bible, it restores purity. It prepares for worship. It reflects renewal. It shows transformation.`,
  },
  {
    term: "Defiled",
    notes: `Defiled means made unclean. In the Bible, it affects holiness. It separates from God. It reflects impurity. It shows corruption.`,
  },
  {
    term: "Fellowship Meal",
    notes: `A fellowship meal is shared together. In the Bible, it represents unity and peace. It connects people. It reflects relationship. It shows community.`,
  },
  {
    term: "Holy Altar",
    notes: `A holy altar is a place for sacrifice. In the Bible, it is set apart for God. It is not ordinary. It reflects worship. It shows dedication.`,
  },
  {
    term: "Holy Garment",
    notes: `A holy garment is clothing set apart. In the Bible, it is worn for service. It reflects purity. It shows identity. It represents sacred role.`,
  },
  {
    term: "Holy Sacrifice",
    notes: `A holy sacrifice is given to God. In the Bible, it must be pure. It reflects dedication. It shows obedience. It represents offering.`,
  },
  {
    term: "Holy Worship",
    notes: `Holy worship is reverent devotion. In the Bible, it follows God's instruction. It is not casual. It reflects honor. It shows focus on God.`,
  },
  {
    term: "Impure",
    notes: `Impure means unclean. In the Bible, it prevents access to sacred things. It requires cleansing. It reflects separation. It shows condition.`,
  },
  {
    term: "Impurity Ritual",
    notes: `An impurity ritual deals with uncleanness. In the Bible, it restores purity. It follows specific steps. It reflects cleansing. It shows process.`,
  },
  {
    term: "Inner Court",
    notes: `The inner court is a restricted area. In the Bible, it is closer to the sanctuary. It limits access. It reflects holiness. It shows separation.`,
  },
  {
    term: "Levitical Code",
    notes: `The Levitical code contains laws for living. In the Bible, it defines purity and sacrifice. It guides behavior. It reflects structure. It shows order.`,
  },
  {
    term: "Living Sacrifice",
    notes: `A living sacrifice is ongoing devotion. In the Bible, it is not a one-time act. It reflects daily commitment. It shows dedication. It represents surrender.`,
  },
  {
    term: "Offer Sacrifice",
    notes: `To offer sacrifice is to give something to God. In the Bible, it shows devotion. It involves cost. It reflects worship. It shows obedience.`,
  },
  {
    term: "Offering Ritual",
    notes: `An offering ritual is a structured act. In the Bible, it follows specific instructions. It shows reverence. It reflects order. It represents devotion.`,
  },
  {
    term: "Purification Ritual",
    notes: `A purification ritual removes uncleanness. In the Bible, it prepares people for worship. It restores access. It reflects cleansing. It shows renewal.`,
  },
  {
    term: "Sacred Bread",
    notes: `Sacred bread is set apart for God. In the Bible, it was placed in the sanctuary. It represents provision. It reflects presence. It shows dedication.`,
  },
  {
    term: "Sacred Incense",
    notes: `Sacred incense is used in worship. In the Bible, it represents prayer. It rises upward. It reflects connection. It shows devotion.`,
  },
  {
    term: "Sacred Oil",
    notes: `Sacred oil is used for anointing. In the Bible, it sets people apart. It reflects consecration. It shows authority. It represents calling.`,
  },
  {
    term: "Sacred Statute",
    notes: `A sacred statute is a lasting command. In the Bible, it must be followed. It reflects authority. It shows consistency. It represents order.`,
  },
  {
    term: "Sacrificial Animal",
    notes: `A sacrificial animal is given in offering. In the Bible, it represents substitution. It must be without defect. It reflects cost. It shows devotion.`,
  },
  {
    term: "Sacrificial Fire",
    notes: `Sacrificial fire consumes offerings. In the Bible, it shows acceptance. It transforms what is given. It reflects power. It shows divine presence.`,
  },
  {
    term: "Sacrificial Law",
    notes: `Sacrificial law defines offerings. In the Bible, it gives structure. It shows what is required. It reflects order. It represents instruction.`,
  },
  {
    term: "Sacrificial Ritual",
    notes: `A sacrificial ritual is a formal act of offering. In the Bible, it follows set patterns. It shows reverence. It reflects devotion. It represents worship.`,
  },
  {
    term: "Seasonal Feast",
    notes: `A seasonal feast marks time of year. In the Bible, it celebrates provision. It reflects cycles. It shows gratitude. It represents remembrance.`,
  },
  {
    term: "Solemn Convocation",
    notes: `A solemn convocation is a sacred gathering. In the Bible, it requires seriousness. It is not casual. It reflects unity. It shows reverence.`,
  },
  {
    term: "Temple Altar",
    notes: `The temple altar is used for sacrifice. In the Bible, it is central to worship. It receives offerings. It reflects dedication. It shows connection.`,
  },
  {
    term: "Temple Incense",
    notes: `Temple incense is burned in worship. In the Bible, it represents prayer. It rises upward. It reflects devotion. It shows communication with God.`,
  },
  {
    term: "Temple Ritual",
    notes: `A temple ritual is a structured act. In the Bible, it follows specific rules. It reflects order. It shows reverence. It represents worship.`,
  },
  {
    term: "Temple Veil",
    notes: `The temple veil separates spaces. In the Bible, it marks sacred boundaries. It limits access. It reflects holiness. It shows separation.`,
  },
  {
    term: "Unclean Animal",
    notes: `An unclean animal is not acceptable. In the Bible, it cannot be eaten or offered. It reflects distinction. It shows classification. It represents separation.`,
  },
  {
    term: "Unclean Food",
    notes: `Unclean food is not permitted. In the Bible, it violates dietary laws. It reflects impurity. It shows restriction. It represents obedience.`,
  },
  {
    term: "Unclean Thing",
    notes: `An unclean thing is anything impure. In the Bible, it separates from holiness. It requires avoidance. It reflects condition. It shows distinction.`,
  },
  {
    term: "Uncleanliness",
    notes: `Uncleanliness is a state of impurity. In the Bible, it affects access to worship. It requires cleansing. It reflects separation. It shows need for restoration.`,
  },
  {
    term: "Washing Ritual",
    notes: `A washing ritual cleanses impurity. In the Bible, it prepares for worship. It restores purity. It reflects renewal. It shows readiness.`,
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
