import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PLACE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Store cities",
    notes: `Store cities were built to hold supplies and resources. In the Bible, they were constructed during times of strong rule, especially in Egypt. They stored grain, goods, and materials for later use. These cities supported large systems of control and survival. They reflect preparation, planning, and centralized power.`,
  },
  {
    term: "Stronghold",
    notes: `A stronghold is a fortified place for defense. In the Bible, it provided safety during attack or conflict. Leaders often used strongholds to maintain control. They were difficult to enter or defeat. A stronghold reflects protection through strength.`,
  },
  {
    term: "Territory",
    notes: `Territory is land controlled by a group or nation. In the Bible, territory defined identity and inheritance. Each tribe was given a specific portion. Holding territory required obedience and defense. It reflects ownership and belonging.`,
  },
  {
    term: "Wadi",
    notes: `A wadi is a dry riverbed that fills with water after rain. In the Bible, wadis could be dangerous or life-giving. They were unpredictable in dry regions. People depended on them for water at times. A wadi reflects provision that comes suddenly.`,
  },
  {
    term: "Walled city",
    notes: `A walled city is surrounded by protective walls. In the Bible, walls provided defense against enemies. They symbolized strength and security. Breaking through walls meant major victory. A walled city reflects protection and control.`,
  },
  {
    term: "Wasteland",
    notes: `A wasteland is dry, unproductive land. In the Bible, it often represents judgment or desolation. Nothing grows easily there. It can result from destruction or neglect. A wasteland reflects loss and emptiness.`,
  },
  {
    term: "Water source",
    notes: `A water source is any place where water is found. In the Bible, water determined where people could live. Without it, survival was impossible. It was highly valued and protected. A water source reflects life and necessity.`,
  },
  {
    term: "Wells",
    notes: `Wells are dug sources of water. In the Bible, wells were central to daily life. They were places of gathering and meeting. Conflicts sometimes happened over them. Wells reflect provision and connection.`,
  },
  {
    term: "Wilderness of Etham",
    notes: `The wilderness of Etham was part of Israel's journey. It marked a transition from Egypt into the desert. The environment was harsh and unfamiliar. It tested trust and endurance. Etham reflects the beginning of dependence on God.`,
  },
  {
    term: "Altar of Burnt Offering",
    notes: `The altar of burnt offering was used for sacrifices. In the Bible, offerings were burned completely on it. It symbolized surrender and devotion. It stood at the center of worship activity. It reflects giving fully to God.`,
  },
  {
    term: "Altar of Incense",
    notes: `The altar of incense was used for burning incense. In the Bible, incense symbolized prayer rising to God. It was placed inside the tabernacle. Only specific people could use it. It reflects connection through prayer.`,
  },
  {
    term: "Assembly place",
    notes: `An assembly place is where people gather. In the Bible, assemblies were for worship or decisions. They brought unity to the community. Important moments happened there. It reflects shared purpose.`,
  },
  {
    term: "Court",
    notes: `A court is an open area near a sacred place. In the Bible, it was part of the tabernacle or temple. People entered the court before going deeper. It served as a place of preparation. It reflects access to worship.`,
  },
  {
    term: "Court of the tabernacle",
    notes: `The court of the tabernacle surrounded the sacred structure. It was where sacrifices were offered. It separated common space from holy space. People gathered there for worship. It reflects structured approach to God.`,
  },
  {
    term: "Entrance of the tent",
    notes: `The entrance of the tent marked entry into sacred space. In the Bible, people approached it with respect. It was where communication with God began. Not everyone could go further inside. It reflects the beginning of access.`,
  },
  {
    term: "Entrance of the tent of meeting",
    notes: `This entrance was a specific place of encounter. In the Bible, leaders met God there. It was a point of communication and decision. Approaching it required preparation. It reflects connection between God and people.`,
  },
  {
    term: "Inner sanctuary",
    notes: `The inner sanctuary was the most sacred area. In the Bible, it held God's presence. Only the high priest could enter. It represented ultimate holiness. It reflects closeness to God.`,
  },
  {
    term: "Outer court",
    notes: `The outer court was the first level of entry. In the Bible, it was accessible to the people. It prepared them for deeper worship. It was a place of gathering. It reflects beginning stages of approach.`,
  },
  {
    term: "Outside the camp",
    notes: `Outside the camp was beyond the community boundary. In the Bible, unclean things were taken there. It separated impurity from the people. It was a place of removal. It reflects separation for protection.`,
  },
  {
    term: "Tabernacle court",
    notes: `The tabernacle court surrounded the tent. It was where sacrifices were made. It created structure in worship. It defined sacred space. It reflects order in approach.`,
  },
  {
    term: "Threshold",
    notes: `A threshold is the entrance point of a structure. In the Bible, crossing it often had meaning. It marked transition from outside to inside. It could represent change in status. It reflects movement into something new.`,
  },
  {
    term: "Ar",
    notes: `Ar was a city of Moab. It served as a central location in the region. The city connected to surrounding territory. It was known among neighboring nations. Ar reflects identity within Moab.`,
  },
  {
    term: "Bene Jaakan",
    notes: `Bene Jaakan was a campsite during Israel's journey. It marked one of the stops in the wilderness. Each stop showed progress through the desert. Even temporary places mattered. It reflects movement through stages.`,
  },
  {
    term: "Border of Edom",
    notes: `The border of Edom marked the edge of that land. In the Bible, it separated Edom from other territories. Israel traveled near this boundary. Borders defined identity and control. It reflects division between nations.`,
  },
  {
    term: "Border of Moab",
    notes: `The border of Moab defined its territory. In the Bible, Israel passed near this region. It marked a limit of control. Borders shaped movement and decisions. It reflects separation and identity.`,
  },
  {
    term: "Brook Zered",
    notes: `The Brook Zered was a small stream marking a boundary. In the Bible, Israel crossed it during their wilderness journey. It signaled the end of a long period of wandering. Crossing it represented progress into a new phase. The Brook Zered reflects transition after endurance.`,
  },
  {
    term: "Camp by the Jordan",
    notes: `This camp was set near the Jordan River. In the Bible, it marked preparation before entering the land. The people paused there before a major crossing. It was a moment of anticipation and readiness. The camp reflects preparation before promise.`,
  },
  {
    term: "City of refuge",
    notes: `A city of refuge was a place of safety. In the Bible, it protected those who caused accidental harm. It prevented immediate revenge. It allowed time for fair judgment. It reflects mercy within justice.`,
  },
  {
    term: "Desert of Kedemoth",
    notes: `The Desert of Kedemoth was part of the wilderness region. In the Bible, it was connected to Israel's journey. It marked another stage in their travel. The land was dry and challenging. Kedemoth reflects endurance through difficult terrain.`,
  },
  {
    term: "Desert of Moab",
    notes: `The Desert of Moab lay east of the Jordan. It was where Israel camped before entering the land. Important final instructions were given there. The place marked the end of the journey. It reflects preparation before fulfillment.`,
  },
  {
    term: "Desert of Paran",
    notes: `The Desert of Paran was a large wilderness region. In the Bible, it was where Israel wandered for years. Spies were sent from this area. It became a place of testing and delay. Paran reflects consequences of doubt.`,
  },
  {
    term: "Desert of Zin",
    notes: `The Desert of Zin was another wilderness location. It is where the people struggled with lack of water. This led to conflict and testing. God still provided in that place. Zin reflects challenge mixed with provision.`,
  },
  {
    term: "Edom",
    notes: `Edom was a land settled by Esau's descendants. It lay south of the Dead Sea. Edom often resisted Israel's movement. Its territory was rugged and difficult. Edom reflects tension between related nations.`,
  },
  {
    term: "Hor",
    notes: `Mount Hor was a mountain where Aaron died. It marked a significant moment in leadership transition. The people mourned there. It became a place of remembrance. Hor reflects change in leadership.`,
  },
  {
    term: "Land of Bashan",
    notes: `Bashan was a fertile and powerful region. It was known for strong cities and large people. Israel conquered it during expansion. It became part of their inheritance. Bashan reflects strength turned into possession.`,
  },
  {
    term: "Land of Edom",
    notes: `The land of Edom belonged to Esau's descendants. It was separate from Israel's inheritance. Travel through it was restricted. Its terrain was mountainous and difficult. Edom reflects boundaries between related people.`,
  },
  {
    term: "Land of Moab",
    notes: `The land of Moab lay east of the Jordan. It was inhabited by descendants of Lot. Israel camped near it before entering the land. It became a place of interaction and warning. Moab reflects proximity without full alignment.`,
  },
  {
    term: "Livnah",
    notes: `Livnah was a city conquered by Israel. It became part of their territory. The city had previously resisted control. Its fall marked progress in conquest. Livnah reflects captured strongholds.`,
  },
  {
    term: "Medeba",
    notes: `Medeba was a city in Moabite territory. It was known as a strategic location. Control over it shifted between nations. It represented contested ground. Medeba reflects changing authority.`,
  },
  {
    term: "Mountains of Abarim",
    notes: `The mountains of Abarim overlook the Jordan Valley. Moses viewed the Promised Land from there. It marked the end of his journey. The location carried both hope and closure. Abarim reflects vision without entry.`,
  },
  {
    term: "Nahaliel",
    notes: `Nahaliel was a stopping place in Israel's journey. It marked another stage of movement. Even brief stops were recorded. Each location mattered in the path forward. Nahaliel reflects progress through steps.`,
  },
  {
    term: "Peor",
    notes: `Peor was a mountain or region in Moab. It became associated with idolatry. Israel was led into sin there. The place carried lasting warning. Peor reflects danger of compromise.`,
  },
  {
    term: "Plain of Moab",
    notes: `The plain of Moab was where Israel camped before crossing. It became a place of final preparation. Important teachings were given there. The land overlooked the Jordan. It reflects readiness before fulfillment.`,
  },
  {
    term: "Rimmon Perez",
    notes: `Rimmon Perez was a campsite in the wilderness. It marked a stage in Israel's journey. Even temporary places were recorded. They show movement over time. Rimmon Perez reflects progression through stages.`,
  },
  {
    term: "Taberah",
    notes: `Taberah was a place where fire broke out among the people. It came as a response to complaint. The name means 'burning.' It became a warning site. Taberah reflects consequence of discontent.`,
  },
  {
    term: "Valley of Arnon",
    notes: `The Valley of Arnon marked a major boundary. It separated Moab from Amorite land. Israel crossed it during expansion. It defined movement between territories. Arnon reflects crossing into new ground.`,
  },
  {
    term: "Valley of Zered",
    notes: `The Valley of Zered marked the end of wandering. It represented a shift in time and progress. Crossing it meant leaving a generation behind. It was both physical and symbolic. Zered reflects transition after waiting.`,
  },
  {
    term: "Wilderness of Moab",
    notes: `The wilderness of Moab was near the Jordan River. It was where Israel prepared to enter the land. The environment was still harsh but hopeful. Final instructions were given there. It reflects nearing fulfillment.`,
  },
  {
    term: "Zalmonah",
    notes: `Zalmonah was another wilderness campsite. It marked a step in Israel's journey. Each stop carried its own moment. Even small places mattered in the path. Zalmonah reflects movement through stages.`,
  },
  {
    term: "Zared",
    notes: `Zared is another form of Zered. It refers to the same valley crossing. It marked a transition in the journey. It shows how names can vary but meaning stays. Zared reflects the same moment of change.`,
  },
  {
    term: "Og’s territory",
    notes: `Og's territory was the land ruled by King Og of Bashan. It was known for strong cities and powerful inhabitants. Israel defeated Og and took control of this region. The land became part of their inheritance. It reflects victory over strong opposition.`,
  },
  {
    term: "Sihon’s territory",
    notes: `Sihon's territory belonged to the Amorite king Sihon. Israel defeated him before crossing the Jordan. This marked one of their first major victories. His land was taken and redistributed. It reflects early possession of promised land.`,
  },
  {
    term: "Achor Valley",
    notes: `The Valley of Achor became a place of trouble. It is where Achan was judged for disobedience. The event brought a pause in Israel's progress. Later, the place became associated with hope. It reflects failure that leads to restoration.`,
  },
  {
    term: "Anak",
    notes: `Anak refers to a region tied to the Anakim giants. The area was known for its intimidating inhabitants. Israel initially feared entering it. Later, it was conquered. It reflects fear that must be overcome.`,
  },
  {
    term: "Baalah",
    notes: `Baalah is a place associated with boundaries in Judah. It marked part of territorial division. Names like this defined land ownership. It connected geography with identity. Baalah reflects defined inheritance.`,
  },
  {
    term: "Cave of Makkedah",
    notes: `The Cave of Makkedah is where defeated kings hid. They tried to escape after losing battle. They were later captured and judged. The cave became a place of final outcome. It reflects temporary hiding before judgment.`,
  },
  {
    term: "Ezion",
    notes: `Ezion is a place near the Red Sea. It was associated with travel and trade. Its location made it significant for movement. It connected land routes with water access. Ezion reflects strategic positioning.`,
  },
  {
    term: "Kiriath Baal",
    notes: `Kiriath Baal is another name for a location tied to Baal worship. It later became associated with Israel's territory. The name shows its past influence. The place changed over time. It reflects transformation of identity.`,
  },
  {
    term: "Kiriath Jearim",
    notes: `Kiriath Jearim was a city where the Ark stayed for a time. It became a place of temporary rest for the Ark. The people there were trusted with it. The city held importance in Israel's worship history. It reflects responsibility toward sacred things.`,
  },
  {
    term: "Kiriath Sepher",
    notes: `Kiriath Sepher was a Canaanite city later conquered. Its name means 'city of books.' It represented knowledge and culture. After conquest, it became part of Israel. It reflects transformation of influence.`,
  },
  {
    term: "Lachish",
    notes: `Lachish was a major fortified city. It was known for its strong defenses. Israel laid siege and eventually took it. Its fall marked progress in conquest. Lachish reflects strongholds that can be broken.`,
  },
  {
    term: "Land of the Hittites",
    notes: `This land belonged to the Hittite people. They were one of the groups living in Canaan. Their culture and cities were well established. Israel eventually took portions of this land. It reflects established systems before change.`,
  },
  {
    term: "Mearah",
    notes: `Mearah is a lesser-known location in the land. It appears in connection with territory descriptions. Even smaller places were recorded carefully. They helped define boundaries. Mearah reflects detailed mapping of land.`,
  },
  {
    term: "Mount Halak",
    notes: `Mount Halak marked a southern boundary. It defined limits of Israel's conquest. Mountains often served as natural borders. Its position showed the extent of expansion. Halak reflects defined limits.`,
  },
  {
    term: "Mount Hebron",
    notes: `Mount Hebron is part of a region tied to the city of Hebron. It became part of Judah's inheritance. The area held historical significance. It was connected to key figures like Abraham. It reflects legacy tied to place.`,
  },
  {
    term: "Mountains of Israel",
    notes: `The mountains of Israel refer to central highlands. They became the core region of settlement. These areas provided defense and identity. They were tied to tribal living. They reflect the heart of the land.`,
  },
  {
    term: "Mountains of Judah",
    notes: `The mountains of Judah formed a southern region. They were rugged and difficult to cross. This area became central to Judah's identity. Many key events took place there. They reflect strength through terrain.`,
  },
  {
    term: "Nahal",
    notes: `A nahal is a stream or riverbed. It can be dry or flowing depending on season. These features shaped travel routes. They provided water when active. Nahal reflects seasonal provision.`,
  },
  {
    term: "Plain of Sharon",
    notes: `The Plain of Sharon is a fertile coastal region. It was known for agriculture and beauty. The land supported growth and grazing. It became a symbol of abundance. Sharon reflects natural richness.`,
  },
  {
    term: "Taanach",
    notes: `Taanach was a city in northern Israel. It played a role in military campaigns. The location was strategic. Control of it shifted over time. Taanach reflects contested territory.`,
  },
  {
    term: "Valley of Aijalon",
    notes: `The Valley of Aijalon was a key battle location. It was a route for movement and conflict. Joshua fought there during conquest. The land shaped military outcomes. It reflects terrain influencing victory.`,
  },
  {
    term: "Baale Judah",
    notes: `Baale Judah is another name tied to a location in Judah. It was connected to the movement of the Ark. The place became part of a sacred journey. Its identity shifted over time. It reflects changing purpose.`,
  },
  {
    term: "Beth-car",
    notes: `Beth-car is a location tied to a victory over the Philistines. It marked a point of defeat for Israel's enemies. The name became associated with that moment. It represents turning points in battle. Beth-car reflects victory tied to place.`,
  },
  {
    term: "City of David (reference stage)",
    notes: `The City of David refers to Jerusalem under David's rule. It became the political and spiritual center. David established it as his capital. The city carried both authority and identity. It reflects leadership shaping location.`,
  },
  {
    term: "Country of the Philistines",
    notes: `This country was along the coastal region. It belonged to Israel's frequent enemies. The Philistines were strong in warfare. Their land represented opposition. It reflects external pressure on Israel.`,
  },
  {
    term: "Dead Sea (Salt Sea reference)",
    notes: `The Dead Sea, also called the Salt Sea, is a body of water with very high salt content. In the Bible, it marks a boundary in the land of Israel. Nothing easily lives in it, which makes it unique. It is tied to the region where Sodom and Gomorrah once stood. The Dead Sea reflects both judgment and a fixed boundary.`,
  },
  {
    term: "En-dor",
    notes: `En-dor was a small village in northern Israel. It is known as the place where Saul consulted a medium. This moment showed his desperation and fear. The village became associated with that event. En-dor reflects seeking answers in the wrong place.`,
  },
  {
    term: "Gebea",
    notes: `Gebea, often spelled Gibeah, was a city in Benjamin's territory. It became the home of King Saul. The city is tied to both leadership and conflict. Events there exposed moral failure within Israel. Gebea reflects how a place can carry both authority and corruption.`,
  },
  {
    term: "Goshen (reference)",
    notes: `Goshen was the region where Israel lived in Egypt. It was fertile and suitable for livestock. The people grew and multiplied there. It provided separation from Egyptian society. Goshen reflects provision within a foreign land.`,
  },
  {
    term: "Hill country of Ephraim",
    notes: `This hill country was part of central Israel. It became home to the tribe of Ephraim. The terrain made travel difficult but provided defense. Many key figures lived in this region. It reflects strength shaped by environment.`,
  },
  {
    term: "Jerusalem (future reference context)",
    notes: `Jerusalem later became the central city of Israel. It served as both political and spiritual capital. Many key events in Scripture took place there. The city grew in importance over time. Jerusalem reflects the center of identity and worship.`,
  },
  {
    term: "Land of Israel",
    notes: `The land of Israel is the promised territory given by God. It was divided among the tribes. Possessing it required obedience and faith. It became the home of God's people. The land reflects fulfillment of promise.`,
  },
  {
    term: "Land of the Philistines",
    notes: `This land belonged to the Philistine people. It lay along the Mediterranean coast. The Philistines often opposed Israel. Their territory was strong and established. It reflects constant external opposition.`,
  },
  {
    term: "Lebanon (reference)",
    notes: `Lebanon is known for its tall cedar trees. In the Bible, its wood was used for building. The region symbolized strength and beauty. It was valued for its resources. Lebanon reflects natural richness and stability.`,
  },
  {
    term: "Mount Zion (reference trajectory)",
    notes: `Mount Zion is associated with Jerusalem. It became a symbol of God's dwelling place. The name carries both physical and spiritual meaning. It represents God's presence among His people. Mount Zion reflects identity tied to worship.`,
  },
  {
    term: "Red Sea (reference tradition)",
    notes: `The Red Sea is where Israel crossed out of Egypt. God parted the waters for them. It marked a major moment of deliverance. The event showed God's power clearly. The Red Sea reflects rescue from bondage.`,
  },
  {
    term: "Zoar (reference tradition)",
    notes: `Zoar was a small city spared during judgment. Lot fled there when Sodom was destroyed. It became a temporary place of safety. The city represents mercy in a moment of destruction. Zoar reflects escape through grace.`,
  },
  {
    term: "Beth-shan",
    notes: `Beth-shan was a strategic city in northern Israel. It was located in a fertile valley. The city changed control over time. It held both military and economic importance. Beth-shan reflects strength tied to location.`,
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
