import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Blessing of obedience",
    notes: `Blessing of obedience is the result of following God's commands. In the Bible, obedience leads to favor, provision, and stability. It is not random, it is directly connected. God made it clear that obedience brings life and direction. It aligns you with His will. These blessings are not just material, they are spiritual and relational. Obedience positions you for what God already wants to give.`,
  },
  {
    term: "Breaking covenant",
    notes: `Breaking covenant means violating a serious agreement with God. In the Bible, this was not just breaking rules, it was breaking relationship. It showed unfaithfulness. Covenants were binding and carried weight. Breaking them brought consequences. It revealed a heart that turned away from God. Covenant was about commitment, not convenience.`,
  },
  {
    term: "Covenant stipulation",
    notes: `Covenant stipulations are the specific terms within a covenant. In the Bible, these were the instructions people had to follow. They defined the agreement clearly. It showed that covenant was structured, not vague. Each stipulation had purpose and meaning. Following them maintained the relationship with God.`,
  },
  {
    term: "Covenant witness",
    notes: `A covenant witness is something that confirms an agreement. In the Bible, this could be a person, object, or even God Himself. It served as a reminder. It ensured that the covenant was not forgotten. Witnesses held both sides accountable. They made the agreement visible and real.`,
  },
  {
    term: "Curse of disobedience",
    notes: `The curse of disobedience is the result of turning away from God's commands. In the Bible, this brought hardship, loss, and instability. It was clearly warned beforehand. It showed that choices have consequences. Disobedience breaks alignment with God. The curse was not random, it followed direction.`,
  },
  {
    term: "Day of assembly",
    notes: `The day of assembly was a time when people gathered together. In the Bible, this was set apart for worship and hearing God's word. It was not a casual meeting, it required focus and reverence. The community came together with purpose. It strengthened unity and connection with God.`,
  },
  {
    term: "Devoted thing",
    notes: `A devoted thing was something set apart completely for God. In the Bible, it could not be taken for personal use. It belonged fully to Him. Misusing it was considered serious disobedience. It showed that some things are not meant to be touched. Devotion meant total separation for God's purpose.`,
  },
  {
    term: "Divine justice",
    notes: `Divine justice is God's perfect judgment. In the Bible, it means He responds to right and wrong fairly. Nothing is overlooked or ignored. God's justice is not biased or corrupted. It ensures that everything is ultimately made right.`,
  },
  {
    term: "Divine mercy",
    notes: `Divine mercy is God showing compassion instead of giving deserved punishment. In the Bible, mercy balances justice. It does not ignore sin, but it gives space for forgiveness. God's mercy reflects His love and patience. It gives people a chance to return.`,
  },
  {
    term: "Everlasting covenant",
    notes: `An everlasting covenant is a promise that does not end. In the Bible, God makes covenants that continue beyond generations. They are not temporary agreements. They show God's unchanging nature. What He promises, He keeps long term.`,
  },
  {
    term: "Generational blessing",
    notes: `Generational blessing is favor that continues through family lines. In the Bible, obedience could impact future generations. Blessings were not just personal, they extended forward. It showed that choices affect more than one life. Faithfulness creates lasting impact.`,
  },
  {
    term: "Generational curse",
    notes: `Generational curse is the continuation of consequences through generations. In the Bible, patterns of disobedience could affect families over time. It shows that actions have long term effects. Cycles can repeat if not addressed. Breaking them requires change and obedience.`,
  },
  {
    term: "Holy nation",
    notes: `A holy nation is a people set apart for God. In the Bible, Israel was called to be different from others. Holiness meant living according to God's standards. It showed identity and purpose. Being holy was about reflecting God to others.`,
  },
  {
    term: "Household law",
    notes: `Household law refers to rules within the family. In the Bible, families had structure and responsibility. Order started at home. These laws guided daily life and relationships. They shaped how people lived together.`,
  },
  {
    term: "Inheritance right",
    notes: `Inheritance rights determine who receives what is passed down. In the Bible, this was often tied to the firstborn. It included responsibility, not just possession. Inheritance shaped identity and future. It connected generations together.`,
  },
  {
    term: "Justice for poor",
    notes: `Justice for the poor means protecting those who are vulnerable. In the Bible, the poor were not to be ignored or exploited. Fairness applied to everyone. God's law made space for their protection. It shows that justice includes care for the weak.`,
  },
  {
    term: "Law of the king",
    notes: `The law of the king defined how a ruler should act. In the Bible, kings were not above God's law. They were held accountable. Leadership required discipline and humility. Power had limits.`,
  },
  {
    term: "Law of the priest",
    notes: `The law of the priest defined how priests served. In the Bible, their role was structured and specific. They handled sacrifices and worship. They had to follow strict guidelines. It showed that serving God required responsibility and precision.`,
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
