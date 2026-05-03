import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Unity",
    notes: `Unity is being together in purpose and direction. In the Bible, unity is not about everyone being the same, but being aligned. It requires humility and cooperation. It brings strength and stability to a group. Division weakens, but unity builds. Unity reflects God's design for people living together. It requires effort, patience, and understanding. True unity keeps people moving in the same direction.`,
  },
  {
    term: "Unlawful",
    notes: `Unlawful means going against what is commanded or permitted. In the Bible, unlawful actions broke God's law. They were not just mistakes, but violations. These actions brought consequences. Unlawful behavior showed disregard for boundaries. It created disorder and injustice. Following the law maintained structure and accountability.`,
  },
  {
    term: "Unrest",
    notes: `Unrest is a state of disturbance or lack of peace. In the Bible, unrest often came from disobedience or conflict. It showed that something was not right. Unrest affects both individuals and communities. It creates tension and instability. Peace comes when things are brought back into order.`,
  },
  {
    term: "Victory",
    notes: `Victory is overcoming opposition or struggle. In the Bible, victory often came through God's power, not human strength. It showed that trust in God leads to success. Victory is not just physical, but spiritual. It reflects perseverance and faith. Winning is tied to alignment with God.`,
  },
  {
    term: "Whispering",
    notes: `Whispering is speaking quietly, often to hide something. In the Bible, it can refer to gossip or secret talk. It spreads information in a hidden way. Whispering can damage trust and relationships. It often carries negativity or division. Words spoken in secret still have impact.`,
  },
  {
    term: "Wonder",
    notes: `Wonder is a sense of awe and amazement. In the Bible, wonders are often acts of God that reveal His power. They cause people to pause and recognize something greater. Wonder leads to respect and attention. It points beyond the moment. It reminds people of God's presence and ability.`,
  },
  {
    term: "Year of wandering",
    notes: `The year of wandering refers to a period of movement without settling. In the Bible, it reflects seasons of testing and waiting. People were not yet where they were meant to be. Wandering was not purposeless, it was preparation. It shaped character and dependence on God. Movement without arrival still had meaning.`,
  },
  {
    term: "Atonement money",
    notes: `Atonement money was a payment made as part of accountability. In the Bible, it symbolized covering or responsibility. It showed that actions carried cost. This payment connected people to the idea of atonement. It was not just financial, but symbolic. It reflected the seriousness of sin and responsibility.`,
  },
  {
    term: "Atonement ritual",
    notes: `An atonement ritual was a process to deal with sin. In the Bible, it involved specific actions and sacrifices. It showed that sin had to be addressed, not ignored. The ritual created a way for restoration. It pointed to deeper spiritual meaning. Atonement brought reconciliation with God.`,
  },
  {
    term: "Burning incense",
    notes: `Burning incense was part of worship. In the Bible, it symbolized prayer rising to God. It was done in a specific and sacred way. The scent represented something pleasing. It created a sense of reverence. This act connected physical action to spiritual meaning.`,
  },
  {
    term: "Cleansing water",
    notes: `Cleansing water was used for purification. In the Bible, it removed impurity in a symbolic way. It showed the need for being made clean. Water represented renewal and preparation. It was part of becoming acceptable before God. Cleansing pointed to deeper spiritual cleansing.`,
  },
  {
    term: "Communal offering",
    notes: `A communal offering was given on behalf of a group. In the Bible, it represented the people as a whole. It showed shared responsibility. The community approached God together. It strengthened unity and connection. It reflected collective worship.`,
  },
  {
    term: "Evening offering",
    notes: `The evening offering was a regular sacrifice given at the end of the day. In the Bible, it created a rhythm of worship. It reminded people to stay connected to God daily. It was consistent and structured. This offering marked time and devotion. It showed ongoing commitment.`,
  },
  {
    term: "First generation",
    notes: `The first generation refers to the original group in a sequence. In the Bible, it often describes those who first received a promise or command. Their actions affected what came after. They set patterns for future generations. Success or failure carried forward. It shows the importance of beginnings.`,
  },
  {
    term: "First census",
    notes: `The first census was a counting of people. In the Bible, it was used to organize and prepare. It helped structure the community. Numbers mattered for planning and leadership. It showed awareness of the people. Counting created order and clarity.`,
  },
  {
    term: "Freewill vow",
    notes: `A freewill vow is a promise made by choice. In the Bible, it was not required but voluntary. It showed personal commitment. Once made, it had to be kept. It reflected sincerity and intention. Choosing to commit carried responsibility.`,
  },
  {
    term: "Guilt payment",
    notes: `Guilt payment was compensation for wrongdoing. In the Bible, it required restoring what was damaged. It showed accountability. The payment addressed the offense directly. It was not just symbolic, but practical. It helped repair what was broken.`,
  },
  {
    term: "Heave portion",
    notes: `The heave portion was a part of an offering lifted up. In the Bible, it was set aside for a specific purpose. It represented giving back to God. This portion was not kept by the giver. It showed dedication and acknowledgment. It reflected order in offerings.`,
  },
  {
    term: "Holy incense",
    notes: `Holy incense was incense set apart for sacred use. In the Bible, it was made according to specific instructions. It was not to be used for anything else. It represented purity in worship. This incense was unique and intentional. It showed respect for what was holy.`,
  },
  {
    term: "Holy portion",
    notes: `A holy portion is something set apart for God. In the Bible, it was not treated as ordinary. It belonged to a specific purpose. This portion was reserved and protected. It showed separation and dedication. Holiness required distinction.`,
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
