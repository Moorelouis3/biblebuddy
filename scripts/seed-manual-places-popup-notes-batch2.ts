import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PLACE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Field of Zoar",
    notes: `The field of Zoar refers to land near the small city of Zoar. Zoar was one of the places spared during the destruction of Sodom. The surrounding fields supported survival and movement. This area became a place of refuge for a moment. It reflects escape in the middle of judgment.`,
  },
  {
    term: "Fertile plain",
    notes: `A fertile plain is land rich for growth. In the Bible, these areas supported crops and livestock. They were often desired because of their productivity. Such land attracted settlement and conflict. It reflects provision that also brings decision.`,
  },
  {
    term: "Fountain",
    notes: `A fountain is a natural spring of water. In the Bible, fountains were essential for life. They provided a steady source of water. People gathered and settled near them. A fountain reflects life through constant provision.`,
  },
  {
    term: "Garden",
    notes: `A garden is a cultivated place of growth. In the Bible, it represents beauty and care. The Garden of Eden is the first example. Gardens require attention and maintenance. They reflect ordered life and provision.`,
  },
  {
    term: "Gathering of waters",
    notes: `The gathering of waters refers to seas and oceans. In creation, waters were brought together into one place. This separated land from sea. It formed the structure of the earth. It reflects order established from chaos.`,
  },
  {
    term: "Goiim",
    notes: `Goiim refers to nations or peoples. In the Bible, it often describes non-Israelite groups. It can also refer to a specific region. The term highlights distinction between peoples. Goiim reflects identity among nations.`,
  },
  {
    term: "Great Sea",
    notes: `The Great Sea refers to the Mediterranean Sea. It was a major boundary for Israel. It supported trade and travel. Its size made it significant geographically. It reflects vastness and connection to other lands.`,
  },
  {
    term: "Ground",
    notes: `The ground is the surface of the earth. In the Bible, it is where people live and work. It produces food but also reflects curse after the fall. The ground requires effort to yield results. It reflects both provision and struggle.`,
  },
  {
    term: "Hill",
    notes: `A hill is a raised area of land. In the Bible, hills were used for settlements or worship. They provided visibility and defense. Hills often became significant locations. They reflect elevation and perspective.`,
  },
  {
    term: "Hill country",
    notes: `Hill country is a region filled with hills and valleys. In the Bible, it was often harder to travel through. It provided natural defense. People settled there for protection. It reflects terrain shaping lifestyle.`,
  },
  {
    term: "House",
    notes: `A house is a place of living. In the Bible, it also represents family and legacy. A house is more than structure. It holds identity and relationship. It reflects belonging and stability.`,
  },
  {
    term: "Jordan Valley",
    notes: `The Jordan Valley runs along the Jordan River. It is a fertile and important region. It played a role in Israel's journey. Crossing it marked transition into the land. It reflects movement and promise.`,
  },
  {
    term: "Kedem",
    notes: `Kedem refers to the east or ancient regions. It is tied to early settlements and movement. The term can describe direction or people. It connects to origins in Scripture. Kedem reflects beginnings and movement eastward.`,
  },
  {
    term: "Kiriath Arba",
    notes: `Kiriath Arba is another name for Hebron. It was associated with giants in the land. The city later became part of Israel's inheritance. It held both fear and promise. It reflects transformation of territory.`,
  },
  {
    term: "Land",
    notes: `Land represents territory and inheritance. In the Bible, land is tied to God's promises. It defines identity for a people. Possessing land required obedience. It reflects belonging and fulfillment.`,
  },
  {
    term: "Land of Egypt",
    notes: `The land of Egypt was a powerful nation. It was a place of both refuge and oppression. Israel lived there before being delivered. Egypt shaped a major part of their history. It reflects both provision and bondage.`,
  },
  {
    term: "Land of Nod",
    notes: `The land of Nod is where Cain settled. It represents life after exile. This place is connected to wandering. It shows separation from God's presence. It reflects consequence and distance.`,
  },
  {
    term: "Land of Shinar",
    notes: `The land of Shinar is associated with Babylon. It was a place of early civilization and pride. The Tower of Babel was built there. It represents human ambition. Shinar reflects organized rebellion.`,
  },
  {
    term: "Land of the East",
    notes: `The land of the East refers to regions beyond Israel. It includes various tribes and cultures. These areas were often seen as distant. They represent outside influence. It reflects broader world context.`,
  },
  {
    term: "Lebanon",
    notes: `Lebanon is known for its tall cedar trees. It was a region of beauty and strength. Its resources were used in building projects. It became a symbol of greatness. Lebanon reflects natural richness.`,
  },
  {
    term: "Meadow",
    notes: `A meadow is an open grassy area. In the Bible, it supports grazing animals. It is a place of provision and calm. Meadows represent simplicity. They reflect peaceful environments.`,
  },
  {
    term: "Migdol",
    notes: `Migdol was a location near Egypt. It is mentioned during Israel's journey. It marked part of their route. The place connected to movement and transition. Migdol reflects steps in a journey.`,
  },
  {
    term: "Mountain",
    notes: `A mountain is a high elevation of land. In the Bible, mountains are places of encounter. Important events often happened there. They represent closeness to God. Mountains reflect elevation and significance.`,
  },
  {
    term: "Mountain east of Bethel",
    notes: `This mountain was near Bethel. It was a place where Abraham camped. It became associated with worship. It connected to early faith moments. It reflects beginnings in relationship with God.`,
  },
  {
    term: "Mountains of Ararat",
    notes: `The mountains of Ararat are where Noah's ark rested. They mark the end of the flood. This location represents a new beginning. Life restarted from this point. Ararat reflects restoration after judgment.`,
  },
  {
    term: "Mountains of the East",
    notes: `The mountains of the East refer to regions beyond Israel. In the Bible, people often traveled or settled there. These mountains created natural boundaries. They were harder to cross and control. They reflect distance and separation from the main land.`,
  },
  {
    term: "Nahal Eshcol",
    notes: `Nahal Eshcol is a valley known for its fruit. Spies from Israel gathered grapes there. The land showed strong signs of abundance. It became proof of what was promised. It reflects visible evidence of blessing.`,
  },
  {
    term: "North",
    notes: `The north is a direction often tied to danger. In the Bible, enemies frequently came from the north. It represented threat and invasion. Direction carried meaning beyond geography. North reflects incoming pressure.`,
  },
  {
    term: "Oak grove",
    notes: `An oak grove is a cluster of oak trees. In the Bible, such places were used for gathering. They could also become sites of worship. Some were used rightly, others wrongly. They reflect natural spaces tied to spiritual activity.`,
  },
  {
    term: "Oak of Mamre",
    notes: `The oak of Mamre was near Hebron. Abraham lived and met God there. It became a place of encounter. Important conversations happened at this location. It reflects meeting God in everyday places.`,
  },
  {
    term: "Pasture",
    notes: `A pasture is land used for grazing animals. In the Bible, it represents provision and care. Shepherds depended on pasture for survival. Healthy pasture meant strong flocks. It reflects ongoing provision.`,
  },
  {
    term: "Pishon",
    notes: `Pishon is one of the rivers in Eden. It flowed through a land rich in resources. The river connects to the origin of life. It shows how water shaped early creation. Pishon reflects abundance at the beginning.`,
  },
  {
    term: "Plain",
    notes: `A plain is a flat, open area. In the Bible, plains allowed movement and settlement. They were often used for agriculture. They could also be places of conflict. A plain reflects openness and exposure.`,
  },
  {
    term: "Plain of Jordan",
    notes: `The plain of the Jordan was fertile land. Lot chose this area because it looked rich. It appeared desirable but had hidden problems. The choice led to consequences. It reflects decisions based on appearance.`,
  },
  {
    term: "Plain of Mamre",
    notes: `The plain of Mamre was near Abraham's dwelling. It became a place of rest and interaction. God visited Abraham there. It was both ordinary and significant. It reflects meeting God in normal places.`,
  },
  {
    term: "Rephaim Valley",
    notes: `The Rephaim Valley was near Jerusalem. It was associated with giants and battles. Many conflicts happened in this area. Its history involved both fear and victory. It reflects places marked by struggle.`,
  },
  {
    term: "Resen",
    notes: `Resen was a city built between major locations. It connected larger centers like Nineveh. The city formed part of a larger network. It shows expansion of early empires. Resen reflects development between major powers.`,
  },
  {
    term: "Sea",
    notes: `The sea represents large bodies of water. In the Bible, it can symbolize chaos or depth. It is powerful and unpredictable. Yet it is also part of creation. The sea reflects both danger and vastness.`,
  },
  {
    term: "Seir",
    notes: `Seir is a mountainous region associated with Edom. It became the dwelling place of Esau's descendants. The land shaped their identity. It was rugged and difficult terrain. Seir reflects identity tied to geography.`,
  },
  {
    term: "South",
    notes: `The south is a direction tied to dry regions. In the Bible, it often refers to desert areas. It can represent movement away from central land. Direction carries both physical and symbolic meaning. South reflects dryness and distance.`,
  },
  {
    term: "Spring",
    notes: `A spring is a natural source of water. In the Bible, it provides life and refreshment. Springs were essential for survival. People settled near them. It reflects constant provision.`,
  },
  {
    term: "Ur of the Chaldeans",
    notes: `Ur was Abraham's original home. It was a developed city with culture and structure. God called Abraham to leave it behind. This marked the beginning of his journey. Ur reflects leaving comfort for calling.`,
  },
  {
    term: "Well of oath",
    notes: `The well of oath was a place of agreement. It marked a covenant between people. Water sources often became meeting points. This well represented trust and promise. It reflects agreements tied to provision.`,
  },
  {
    term: "Alush",
    notes: `Alush was a campsite during Israel's journey. It marked one of the many stops in the wilderness. Each location showed movement forward. Even small stops mattered. Alush reflects progress through stages.`,
  },
  {
    term: "Baal Zephon",
    notes: `Baal Zephon was near the Red Sea crossing. It marked where Israel camped before escape. The location seemed trapped, but it wasn't. God acted in that moment. It reflects tension before breakthrough.`,
  },
  {
    term: "Bitter waters",
    notes: `Bitter waters were found at Marah. The water was not drinkable at first. God made it sweet. This moment tested the people. It reflects transformation of hardship.`,
  },
  {
    term: "Camp",
    notes: `A camp is a temporary living place. In the Bible, Israel camped during their journey. Camps moved as they traveled. They required organization and order. A camp reflects temporary stability.`,
  },
  {
    term: "Camp by the sea",
    notes: `This camp was near the Red Sea. It seemed like a trapped position. There was no clear escape. God created a path forward. It reflects pressure before deliverance.`,
  },
  {
    term: "City of Pithom",
    notes: `Pithom was one of the cities built by Israel in Egypt. They worked under forced labor. The city represented oppression. It showed the burden placed on them. Pithom reflects enforced labor systems.`,
  },
  {
    term: "City of Raamses",
    notes: `Raamses was another city built during Israel's slavery. It symbolized Egypt's control over them. The work was hard and unrelenting. It became a reminder of bondage. Raamses reflects oppression through structure.`,
  },
  {
    term: "Coast",
    notes: `A coast is the land along the edge of the sea. In the Bible, coastal areas were centers of trade and travel. People moved goods and ideas through these regions. They connected different cultures together. The coast reflects access to the wider world.`,
  },
  {
    term: "Desert of Shur",
    notes: `The Desert of Shur lies east of Egypt. It was one of the first places Israel entered after leaving Egypt. The environment was harsh and dry. It tested the people's endurance and trust. Shur reflects early stages of transition and dependence.`,
  },
  {
    term: "Desert of Sin",
    notes: `The Desert of Sin was part of Israel's wilderness journey. It is where the people complained about lack of food. God provided manna there. The location became tied to testing and provision. It reflects need met through dependence.`,
  },
  {
    term: "Desert of Sinai",
    notes: `The Desert of Sinai is where Israel stayed for a long time. It was the place where God gave the law. The people were shaped there as a nation. It was both a place of testing and formation. Sinai reflects transformation through time and obedience.`,
  },
  {
    term: "East wind",
    notes: `The east wind is a strong wind from the desert. In the Bible, it is often used by God for specific purposes. It can bring destruction or change. The wind is powerful and direct. It reflects force used for a purpose.`,
  },
  {
    term: "Encampment",
    notes: `An encampment is a place where people set up camp. In the Bible, Israel had many encampments in the wilderness. Each one marked a step in the journey. They required structure and movement. Encampments reflect progress through stages.`,
  },
  {
    term: "Fortress",
    notes: `A fortress is a strong defensive structure. In the Bible, fortresses protected cities and leaders. They were built to resist attack. Their strength gave confidence to those inside. A fortress reflects security through strength.`,
  },
  {
    term: "Frontier",
    notes: `A frontier is the edge of a territory. In the Bible, it marked the limits of land. Frontiers were often contested areas. They represented expansion or defense. A frontier reflects boundaries and growth.`,
  },
  {
    term: "Gulf",
    notes: `A gulf is a body of water extending into land. In the Bible, gulfs shaped travel routes. They could act as barriers or pathways. Waterways affected movement and trade. A gulf reflects natural division and connection.`,
  },
  {
    term: "Harbor",
    notes: `A harbor is a safe place for ships. In the Bible, harbors provided rest during travel. They protected from storms. They allowed movement between regions. A harbor reflects safety during transition.`,
  },
  {
    term: "House of bondage",
    notes: `The house of bondage refers to Egypt. It represents the place of slavery for Israel. It is remembered as a time of suffering. God brought the people out from it. It reflects oppression and eventual deliverance.`,
  },
  {
    term: "Land of Goshen",
    notes: `Goshen was where Israel lived in Egypt. It was a fertile area suitable for livestock. They were separate from Egyptians there. It allowed them to grow as a people. Goshen reflects provision within a foreign land.`,
  },
  {
    term: "Land of Midian",
    notes: `Midian is a region east of Egypt. Moses fled there before returning to Egypt. It became a place of refuge and preparation. Life there shaped his calling. Midian reflects growth in hidden seasons.`,
  },
  {
    term: "Midian",
    notes: `Midian refers both to a place and a people. It is connected to descendants of Abraham. The Midianites interacted with Israel in different ways. Sometimes they were allies, sometimes enemies. Midian reflects complex relationships between nations.`,
  },
  {
    term: "Mountain of God",
    notes: `The mountain of God refers to Mount Sinai. It is where Moses encountered God. The law was given there. It was a place of divine presence. It reflects direct encounter with God.`,
  },
  {
    term: "Oasis",
    notes: `An oasis is a place of water in the desert. In the Bible, it represents relief in hardship. It provides life where there is none. Travelers depend on it. An oasis reflects refreshment in difficult seasons.`,
  },
  {
    term: "Pi Hahiroth",
    notes: `Pi Hahiroth was a location near the Red Sea. Israel camped there before crossing. It seemed like a trapped position. But it led to a breakthrough moment. It reflects tension before deliverance.`,
  },
  {
    term: "Pillar of cloud",
    notes: `The pillar of cloud guided Israel during the day. It showed God's presence with them. It moved ahead to lead the way. It provided covering and direction. It reflects guidance and protection.`,
  },
  {
    term: "Pillar of fire",
    notes: `The pillar of fire guided Israel at night. It gave light in darkness. It showed God's presence clearly. It allowed movement even without daylight. It reflects guidance through uncertainty.`,
  },
  {
    term: "Ridge",
    notes: `A ridge is a narrow elevated landform. In the Bible, it can provide strategic advantage. It gives a higher view of surroundings. It can be used for defense. A ridge reflects position and perspective.`,
  },
  {
    term: "Royal house",
    notes: `A royal house is the family of a king. In the Bible, it represents leadership and authority. It carries influence across generations. The actions of one affect the whole house. It reflects power through family structure.`,
  },
  {
    term: "Sanctuary",
    notes: `A sanctuary is a sacred place of worship. In the Bible, it is where God's presence is honored. It requires purity and respect. It separates holy from common. A sanctuary reflects closeness to God.`,
  },
  {
    term: "Sea shore",
    notes: `The sea shore is where land meets water. In the Bible, it is often a place of gathering or movement. It can mark boundaries or transitions. People often paused at the shore. It reflects edge between stability and change.`,
  },
  {
    term: "Settlement",
    notes: `A settlement is a place where people establish themselves. In the Bible, settlements mark the end of wandering. They create stability and structure. People build lives there. A settlement reflects established identity.`,
  },
  {
    term: "Shore",
    notes: `A shore is the edge of a body of water. In the Bible, it marks the boundary between land and sea. It can represent arrival or departure. It is a place of transition. A shore reflects movement between stages.`,
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
