import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PLACE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "country of Moab",
    notes: `The country of Moab was a region east of the Dead Sea. It was known as the homeland of the Moabites, descendants of Lot. This land often interacted with Israel through both conflict and connection. It also became a place of refuge during famine. Moab reflects both distance from and connection to Israel's story.`,
  },
  {
    term: "fields of Boaz",
    notes: `The fields of Boaz were farmland near Bethlehem. This is where Ruth gathered grain during harvest season. It became the setting for a key moment of provision and relationship. The field represents both survival and opportunity. It reflects how everyday places can carry life-changing events.`,
  },
  {
    term: "fields of Bethlehem",
    notes: `The fields of Bethlehem were open farmland surrounding the town. They were used for growing crops and grazing animals. These fields supported the daily life of the community. They were places of work, provision, and routine. They reflect the foundation of rural life.`,
  },
  {
    term: "gate of Bethlehem",
    notes: `The gate of Bethlehem was the main entrance to the town. It was also a place where leaders gathered to make decisions. Legal matters and agreements were handled there publicly. The gate represented authority and community structure. It reflects where daily life meets leadership.`,
  },
  {
    term: "house of Elimelech",
    notes: `The house of Elimelech refers to his family and household. It represents both his physical home and his family identity. This household faced famine and loss. It became central to Naomi and Ruth's story. It reflects how family spaces carry deep personal history.`,
  },
  {
    term: "household",
    notes: `A household includes everyone living under one roof. In the Bible, it often includes family and servants. It is the center of daily life and responsibility. Households carried identity and structure. They reflect the basic unit of society.`,
  },
  {
    term: "land of Judah",
    notes: `The land of Judah was a southern region of Israel. It became the territory of the tribe of Judah. Many key events in biblical history happened there. It included cities like Bethlehem and Jerusalem. Judah reflects leadership and covenant identity.`,
  },
  {
    term: "threshing floor",
    notes: `A threshing floor was a flat area used to separate grain. It was a place where harvest was processed. It often became a setting for important encounters. Threshing involved effort and transformation. It reflects separation of what is useful from what is not.`,
  },
  {
    term: "town",
    notes: `A town is a small community of people. In the Bible, towns were centers of daily life. They included homes, markets, and gathering places. Towns were less complex than cities but still structured. They reflect shared living and connection.`,
  },
  {
    term: "Abel-Carmel",
    notes: `Abel-Carmel was a location in Judah's territory. It was associated with rural and agricultural life. The area supported farming and livestock. It formed part of the tribe's inheritance. It reflects provision through land.`,
  },
  {
    term: "Ajalon Valley",
    notes: `The Ajalon Valley was a wide valley in central Israel. It served as a strategic route for travel and battle. Armies often moved through this area. Its geography made it important for defense. It reflects how land shapes conflict.`,
  },
  {
    term: "Ashteroth Karnaim",
    notes: `Ashteroth Karnaim was a city in Bashan. It was associated with ancient kings and strongholds. The city was part of early regional conflicts. Its name connects to both place and power. It reflects established centers of authority.`,
  },
  {
    term: "Bitumen pits",
    notes: `Bitumen pits were natural tar pits in the ground. They were found in the region near the Dead Sea. These pits were dangerous and could trap people. They were mentioned during battle scenes. They reflect natural hazards within the land.`,
  },
  {
    term: "Brook",
    notes: `A brook is a small flowing stream. In the Bible, brooks provided water for travel and survival. They often marked boundaries or resting points. Water sources were essential in dry regions. A brook reflects life through provision.`,
  },
  {
    term: "Burning plain",
    notes: `The burning plain refers to a region affected by destruction. It is associated with judgment and fire. This land became barren and lifeless. It stands as a warning of consequence. It reflects the result of complete devastation.`,
  },
  {
    term: "City",
    notes: `A city is a large, organized settlement. In the Bible, cities were centers of power and culture. They often had walls and leadership structures. Cities could be places of safety or corruption. They reflect concentrated human activity.`,
  },
  {
    term: "City gate",
    notes: `The city gate was the main entrance and meeting place. Leaders gathered there to make decisions. Legal matters were handled publicly at the gate. It was a place of authority and communication. It reflects the center of civic life.`,
  },
  {
    term: "Country",
    notes: `A country is a broad region or territory. In the Bible, countries were tied to specific nations. They held cultural and political identity. Boundaries defined influence and control. A country reflects organized land ownership.`,
  },
  {
    term: "East",
    notes: `The east is a direction often tied to movement. In the Bible, moving east sometimes symbolized separation. It could represent distance from a starting point. Direction often carried meaning. East reflects transition and movement.`,
  },
  {
    term: "East of Eden",
    notes: `East of Eden is where Cain settled after being sent away. It represents separation from God's original place. This location marked a new beginning under consequence. It shows movement away from perfection. It reflects distance from original design.`,
  },
  {
    term: "East of Jordan",
    notes: `East of the Jordan refers to land across the river. This region was settled by certain tribes of Israel. It was separate but still connected to the nation. Geography created both distance and identity. It reflects division within unity.`,
  },
  {
    term: "Ellasar",
    notes: `Ellasar was an ancient kingdom mentioned in early battles. It was ruled by one of the coalition kings. Its exact location is uncertain. It represents part of a larger political system. Ellasar reflects early regional alliances.`,
  },
  {
    term: "Ephrathah",
    notes: `Ephrathah is another name for Bethlehem. It is connected to lineage and prophecy. Important figures came from this place. It carries both historical and symbolic meaning. Ephrathah reflects identity tied to promise.`,
  },
  {
    term: "Euphrates",
    notes: `The Euphrates is a major river in the ancient world. It marked one of the boundaries of promised land. The river supported life and travel. It was central to multiple civilizations. Euphrates reflects provision and boundary.`,
  },
  {
    term: "Field of Ephron",
    notes: `The field of Ephron was purchased by Abraham. It became a burial place for his family. This marked one of the first land ownership moments. It showed a permanent claim in the land. It reflects possession tied to promise.`,
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

  for (const item of PLACE_NOTES) {
    const normalized = item.term.toLowerCase().trim().replace(/\s+/g, "_");
    const notesText = extractCompactPopupMeaning("places", item.notes);

    const { error } = await supabase
      .from("places_in_the_bible_notes")
      .upsert(
        {
          place: item.term,
          normalized_place: normalized,
          notes_text: notesText,
        },
        { onConflict: "normalized_place" }
      );

    if (error) {
      throw new Error(`Failed for ${item.term}: ${error.message}`);
    }
  }

  console.log(`Seeded ${PLACE_NOTES.length} manual place popup notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
