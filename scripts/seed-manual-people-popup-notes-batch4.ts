import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "chamberlain",
    notes: `A chamberlain is someone who serves inside a royal household. In the Bible, this role often involved managing private areas of the king's life. They had close access to authority. That meant they carried both trust and responsibility. A chamberlain reflects influence behind the scenes.`,
  },
  {
    term: "maidservant",
    notes: `A maidservant is a female servant in a household. In the Bible, maidservants often supported daily life and family structure. They worked closely within the home. Their role was not always visible, but still important. A maidservant reflects service within family systems.`,
  },
  {
    term: "queen",
    notes: `A queen is a female ruler or wife of a king. In the Bible, queens held influence through position. Some used it for good, others for harm. Their decisions could affect entire nations. A queen reflects power through proximity to authority.`,
  },
  {
    term: "convert",
    notes: `A convert is someone who changes belief or identity. In the Bible, converts joined Israel's faith and practices. They chose to follow something new. This required leaving old ways behind. A convert reflects intentional transformation.`,
  },
  {
    term: "friend",
    notes: `A friend is someone who stands with you. In the Bible, friendship involves loyalty and truth. Real friends support and correct when needed. They are present in both good and bad times. A friend reflects connection built on trust.`,
  },
  {
    term: "opposer",
    notes: `An opposer is someone who resists or stands against. In the Bible, opposers challenge truth or leadership. They create tension and conflict. Sometimes they are wrong, sometimes they test growth. An opposer reflects resistance that must be faced.`,
  },
  {
    term: "rebel",
    notes: `A rebel resists authority on purpose. In the Bible, rebellion often leads to consequences. It is not accidental, it is intentional. Rebels refuse to submit. A rebel reflects pride and defiance.`,
  },
  {
    term: "spy",
    notes: `A spy gathers information secretly. In the Bible, spies were sent to explore land or enemies. Their reports influenced decisions. Some acted with faith, others with fear. A spy reflects hidden observation with impact.`,
  },
  {
    term: "Adullam king",
    notes: `The king of Adullam was one of the rulers defeated by Joshua. He was part of the coalition resisting Israel. His power did not last. He fell during the conquest of the land. He reflects opposition that could not stand.`,
  },
  {
    term: "Ai king",
    notes: `The king of Ai ruled a city conquered by Israel. At first, Israel failed against him due to disobedience. Later, they returned and defeated him. His story is tied to both failure and victory. He reflects how outcomes change based on obedience.`,
  },
  {
    term: "Amorite king",
    notes: `Amorite kings ruled powerful cities in Canaan. They often stood against Israel during conquest. Some joined together to fight. Despite their strength, they were defeated. They reflect strong opposition that still falls.`,
  },
  {
    term: "Anak",
    notes: `Anak is known as the ancestor of giants. His descendants were feared by Israel. They represented physical strength and intimidation. Their presence caused doubt among the people. Anak reflects fear based on what is seen.`,
  },
  {
    term: "Armed men",
    notes: `Armed men are those prepared for battle. In the Bible, they followed leadership into conflict. They were trained and ready. Their role required discipline and courage. Armed men reflect readiness for action.`,
  },
  {
    term: "Army captain",
    notes: `An army captain leads soldiers in battle. In the Bible, captains carried authority under higher command. They gave direction during conflict. Their decisions affected outcomes. A captain reflects leadership under pressure.`,
  },
  {
    term: "Captain of the Lords army",
    notes: `This is a divine figure who leads heavenly forces. He appeared to Joshua before battle. His presence showed that God was in control. He did not answer to Joshua but to God. He reflects authority beyond human leadership.`,
  },
  {
    term: "Citizen",
    notes: `A citizen belongs to a city or nation. In the Bible, citizenship connects identity and responsibility. It determines where someone belongs. Citizens are part of a larger system. A citizen reflects belonging within a structure.`,
  },
  {
    term: "City elder",
    notes: `A city elder is a leader in the community. In the Bible, elders made decisions at the city gate. They handled disputes and guidance. Their role required wisdom. A city elder reflects local authority and judgment.`,
  },
  {
    term: "Conqueror",
    notes: `A conqueror defeats and takes control. In the Bible, conquerors claimed land and power. Victory often required both strength and obedience. Not all conquerors acted rightly. A conqueror reflects dominance through victory.`,
  },
  {
    term: "Cursed man",
    notes: `A cursed man is under judgment. In the Bible, a curse follows disobedience. It brings consequence and loss. It reflects separation from blessing. A cursed man shows the result of wrong choices.`,
  },
  {
    term: "Executioner",
    notes: `An executioner carries out judgment. In the Bible, this role enforces consequences. It is direct and final. It reflects authority being carried out. An executioner shows the weight of justice.`,
  },
  {
    term: "Gibeonite",
    notes: `A Gibeonite is a person from Gibeon. They made a deceptive treaty with Israel. They avoided destruction through strategy. They later served in labor roles. Gibeonites reflect survival through cleverness.`,
  },
  {
    term: "Gibeonite leaders",
    notes: `Gibeonite leaders negotiated with Israel. They used deception to secure peace. Their decision protected their people. They accepted long-term servitude. They reflect strategic leadership under pressure.`,
  },
  {
    term: "Gibeonite elders",
    notes: `Gibeonite elders represented the people. They made decisions on behalf of the group. They agreed to a treaty for survival. Their actions affected generations. They reflect responsibility in leadership.`,
  },
  {
    term: "Inhabitant",
    notes: `An inhabitant is someone who lives in a place. In the Bible, inhabitants are tied to land and identity. They can be part of a nation or city. Their presence defines the region. An inhabitant reflects belonging to a location.`,
  },
  {
    term: "Jericho king",
    notes: `The king of Jericho ruled a fortified city. His city fell when Israel obeyed God's command. The walls collapsed unexpectedly. His power did not protect him. He reflects how strength fails against God's will.`,
  },
  {
    term: "King of Arad",
    notes: `The king of Arad ruled a southern Canaanite city. He attacked Israel early during their journey. At first, he had success against them. Later, Israel returned and defeated him. He reflects early opposition that does not last.`,
  },
  {
    term: "King of Debir",
    notes: `The king of Debir was one of the rulers in Canaan. His city was captured during Israel's conquest. He was part of a group resisting Israel's advance. Despite defenses, he was defeated. He reflects resistance that eventually falls.`,
  },
  {
    term: "King of Eglon",
    notes: `The king of Eglon ruled one of the Amorite cities. He joined forces against Israel. His city was overtaken during battle. His defeat marked progress in conquest. He reflects coordinated opposition that fails.`,
  },
  {
    term: "King of Gezer",
    notes: `The king of Gezer came to support another city under attack. He attempted to defend the region. However, he was defeated by Israel. His involvement shows alliances between cities. He reflects how support systems can still collapse.`,
  },
  {
    term: "King of Hazor",
    notes: `The king of Hazor led a large northern coalition. He gathered multiple kings to fight Israel. His city was one of the strongest in the region. Even so, he was defeated and his city burned. He reflects major power that could not stand.`,
  },
  {
    term: "King of Hebron",
    notes: `The king of Hebron ruled a significant city in Canaan. He joined in resistance against Israel. His city was eventually taken. His defeat marked progress in securing the land. He reflects fallen leadership in conquest.`,
  },
  {
    term: "King of Jerusalem",
    notes: `The king of Jerusalem resisted Israel during early conquest. He formed alliances to defend his territory. Despite effort, he was defeated. His fall showed shifting control in the land. He reflects authority that could not hold.`,
  },
  {
    term: "King of Lachish",
    notes: `The king of Lachish ruled a fortified city. Lachish was known for strong defenses. Israel laid siege and eventually took it. His defeat showed persistence in battle. He reflects strongholds that still fall.`,
  },
  {
    term: "King of Libnah",
    notes: `The king of Libnah led another resisting city. He stood against Israel's advance. His city was captured after battle. His defeat contributed to broader conquest. He reflects continued resistance losing ground.`,
  },
  {
    term: "King of Madon",
    notes: `The king of Madon joined a northern coalition. He fought alongside other kings against Israel. Despite numbers, the coalition failed. His defeat shows unity without direction fails. He reflects alliance without lasting strength.`,
  },
  {
    term: "King of Makkedah",
    notes: `The king of Makkedah was part of a group hiding from Israel. He fled after losing battle. He was later captured and judged. His story shows temporary escape does not last. He reflects delayed consequence.`,
  },
  {
    term: "King of Shimron",
    notes: `The king of Shimron joined northern forces. He resisted Israel with others. Despite effort, he was defeated. His fall contributed to regional change. He reflects collective resistance failing.`,
  },
  {
    term: "King of Taanach",
    notes: `The king of Taanach ruled a strategic location. His city was eventually defeated by Israel. It marked progress in territorial control. His leadership ended in defeat. He reflects control that could not be maintained.`,
  },
  {
    term: "King of Tirzah",
    notes: `The king of Tirzah ruled an important city. Tirzah later became a royal capital. His defeat helped shape future leadership centers. His fall marked transition. He reflects shifting power structures.`,
  },
  {
    term: "King of Yokneam",
    notes: `The king of Yokneam ruled near Mount Carmel. His city was part of Israel's conquest path. He was defeated along with others. His fall contributed to territorial gain. He reflects resistance that was overcome.`,
  },
  {
    term: "Military commander",
    notes: `A military commander leads troops in battle. In the Bible, commanders direct strategy and movement. They hold authority under higher leadership. Their decisions affect outcomes. They reflect structured leadership in conflict.`,
  },
  {
    term: "Abinadab (son of Jesse)",
    notes: `Abinadab was one of David's older brothers. He was present when Samuel came to anoint a king. At first, he looked like a strong choice. But God chose David instead. He reflects how appearance does not determine calling.`,
  },
  {
    term: "Abinadab (son of Saul)",
    notes: `Abinadab was one of Saul's sons. He fought alongside his father in battle. He died in the same conflict where Saul fell. His life ended during a major turning point. He reflects loyalty within a falling house.`,
  },
  {
    term: "Ahiah",
    notes: `Ahiah is a name used for several individuals. Some were priests, others prophets. The name connects to spiritual roles. Each carried responsibility in their context. Ahiah reflects leadership tied to God's service.`,
  },
  {
    term: "Ahinoam (wife of Saul)",
    notes: `Ahinoam was the wife of King Saul. She was part of Israel's first royal household. Her position connected her to leadership. Even without detail, her role mattered. She reflects influence through marriage to authority.`,
  },
  {
    term: "Ahinoam (wife of David)",
    notes: `Ahinoam was one of David's wives. She was the mother of Amnon. Her presence is part of David's complex family. She lived during a time of growth and conflict. She reflects family structure within leadership.`,
  },
  {
    term: "Amalekite (messenger)",
    notes: `This Amalekite claimed to have killed Saul. He brought news to David expecting reward. Instead, he was judged for his claim. His story shows misunderstanding of honor. He reflects false expectation of approval.`,
  },
  {
    term: "Amorites",
    notes: `The Amorites were a major people group in Canaan. They occupied land before Israel arrived. They often resisted Israel's presence. Their cities were strong and established. They reflect entrenched opposition.`,
  },
  {
    term: "Ark keeper",
    notes: `An ark keeper was responsible for the Ark of the Covenant. This role required great care and respect. The Ark represented God's presence. Handling it incorrectly brought consequence. An ark keeper reflects responsibility toward sacred things.`,
  },
  {
    term: "Armor bearer (David)",
    notes: `David's armor bearer supported him in battle. He stayed close and assisted when needed. This role required loyalty and readiness. He acted behind the scenes. He reflects support within leadership.`,
  },
  {
    term: "Armor bearer (Saul)",
    notes: `Saul's armor bearer stayed close to him in battle. He carried Saul's weapons and supported him directly. When Saul was wounded, the armor bearer faced a hard choice. He refused to harm the king, even at Saul's request. He reflects loyalty even in a collapsing situation.`,
  },
  {
    term: "Ashurites",
    notes: `The Ashurites were a people group connected to Asshur. They formed part of the broader Assyrian influence. Their identity came from early tribal expansion. They were known among surrounding nations. Ashurites reflect the spread of ancient peoples.`,
  },
  {
    term: "Benjamites",
    notes: `The Benjamites were from the tribe of Benjamin. They were known for skill in battle, especially with weapons. Many were fierce and precise fighters. Their tribe played a major role in Israel's history. Benjamites reflect strength combined with identity.`,
  },
  {
    term: "Bodyguard",
    notes: `A bodyguard protects a leader from harm. In the Bible, bodyguards stayed close to kings. They were trusted with safety. Their role required alertness and loyalty. A bodyguard reflects protection in leadership.`,
  },
  {
    term: "Captain of thousands",
    notes: `A captain of thousands led large groups of soldiers. In the Bible, this was a high-ranking position. He was responsible for order and strategy. His leadership affected many lives. He reflects structured authority in battle.`,
  },
  {
    term: "Captain of the guard",
    notes: `The captain of the guard oversaw royal protection. He controlled security around the king. He often carried out orders directly. His role held both power and responsibility. He reflects enforcement of authority.`,
  },
  {
    term: "Cherethites",
    notes: `The Cherethites were an elite group serving David. They acted as bodyguards and warriors. They were loyal to David personally. Their presence strengthened his rule. Cherethites reflect specialized loyalty.`,
  },
  {
    term: "Cushite",
    notes: `A Cushite is someone from the region of Cush. In the Bible, Cushites appear in various roles. They were part of international interaction. Some served as messengers or soldiers. A Cushite reflects diversity among people groups.`,
  },
  {
    term: "Doeg the Edomite",
    notes: `Doeg was an Edomite serving under Saul. He reported David's actions to Saul. He later carried out violent orders. His actions caused major harm. Doeg reflects betrayal driven by loyalty to power.`,
  },
  {
    term: "Edomites",
    notes: `Edomites descended from Esau. They lived near Israel and often opposed them. Their relationship with Israel was tense. They had their own leadership structure. Edomites reflect ongoing national conflict.`,
  },
  {
    term: "Elders of Israel",
    notes: `The elders of Israel were leaders of the people. They made decisions and guided direction. They represented the community. Their role required wisdom and fairness. They reflect shared leadership.`,
  },
  {
    term: "Eliahba",
    notes: `Eliahba is listed among David's mighty men. He stood among those loyal to David. His presence shows strength and commitment. Even without a full story, his role is clear. Eliahba reflects faithful support.`,
  },
  {
    term: "Elihu",
    notes: `Elihu appears in the book of Job. He speaks after Job's friends. His perspective challenges both sides. He focuses on God's authority. Elihu reflects bold expression of belief.`,
  },
  {
    term: "Elisha (reference)",
    notes: `Elisha was a prophet who followed Elijah. He performed many miracles. He guided people through difficult times. His role continued prophetic work. Elisha reflects continuation of spiritual authority.`,
  },
  {
    term: "Elkanah (ancestor)",
    notes: `Elkanah is a name tied to multiple individuals. Some were ancestors in priestly or prophetic lines. The name connects to heritage and family identity. Even without detail, the role matters. Elkanah reflects generational connection.`,
  },
  {
    term: "Ephraimites",
    notes: `Ephraimites belonged to the tribe of Ephraim. They were one of the leading tribes in Israel. Their influence was strong in the northern kingdom. They played key roles in conflict and leadership. Ephraimites reflect tribal strength.`,
  },
  {
    term: "Ephod bearer",
    notes: `An ephod bearer handled a priestly garment. The ephod was used for guidance and inquiry. This role connected to spiritual decisions. It required responsibility and care. An ephod bearer reflects handling sacred items.`,
  },
  {
    term: "Garrison commander",
    notes: `A garrison commander led a stationed military group. He was responsible for defense in a location. His role required strategy and readiness. He maintained control over troops. He reflects organized military leadership.`,
  },
  {
    term: "Giant (Goliath)",
    notes: `Goliath was a Philistine warrior known for size and strength. He challenged Israel openly. His presence caused fear among the people. He was defeated by David. Goliath reflects visible intimidation that can be overcome.`,
  },
  {
    term: "Jonathan’s armor bearer",
    notes: `Jonathan's armor bearer stayed loyal in battle. He followed Jonathan even into risky situations. He trusted Jonathan's faith. Together they acted boldly. He reflects loyalty and shared courage.`,
  },
  {
    term: "Mighty men",
    notes: `The mighty men were David's strongest warriors. They fought in difficult battles. Their loyalty to David was clear. They performed extraordinary acts. They reflect commitment under pressure.`,
  },
  {
    term: "Obed-edom (reference)",
    notes: `Obed-edom housed the Ark of the Covenant. His household was blessed during that time. He treated the Ark with respect. His experience showed the presence of God brings blessing. Obed-edom reflects honor toward sacred things.`,
  },
  {
    term: "Philistine commanders",
    notes: `Philistine commanders led their armies. They directed battles against Israel. They held authority within their forces. Their decisions shaped conflict outcomes. They reflect organized opposition.`,
  },
  {
    term: "Philistines",
    notes: `The Philistines were a major enemy of Israel. They lived along the coast. They were strong in warfare and culture. They often clashed with Israel. Philistines reflect consistent external pressure.`,
  },
  {
    term: "Saul’s servant",
    notes: `Saul's servant assisted him in daily matters. He helped guide Saul toward Samuel. His advice led to a key encounter. Even small roles can influence big outcomes. He reflects quiet but important influence.`,
  },
  {
    term: "Servant girl",
    notes: `A servant girl worked within a household structure. In the Bible, servant girls often witnessed key moments. They were not in authority, but still present. Their words or actions sometimes revealed truth. A servant girl reflects overlooked voices that still matter.`,
  },
  {
    term: "Shimei (possible minor reference)",
    notes: `Shimei is known for speaking against David during conflict. He openly cursed David while he was fleeing. Later, his actions were remembered and addressed. His words showed boldness without wisdom. Shimei reflects how speech can carry long consequences.`,
  },
  {
    term: "Sons of Belial",
    notes: `The sons of Belial were known for wicked behavior. They acted without respect for authority or truth. Their actions brought harm to others. They rejected what was right. They reflect deliberate corruption.`,
  },
  {
    term: "Sons of Eli (Hophni and Phinehas)",
    notes: `Hophni and Phinehas were priests who acted corruptly. They abused their position for personal gain. They ignored the responsibility of their role. Their actions led to judgment on their family. They reflect misuse of spiritual authority.`,
  },
  {
    term: "Sons of Jesse",
    notes: `The sons of Jesse were David's brothers. They were present when Samuel came to anoint a king. They appeared strong but were not chosen. David, the youngest, was selected instead. They reflect how appearance does not determine calling.`,
  },
  {
    term: "Sons of Saul",
    notes: `Saul's sons were part of Israel's first royal family. They fought alongside him in battle. Their lives were tied to Saul's leadership. They experienced the consequences of his decisions. They reflect how leadership affects family outcomes.`,
  },
  {
    term: "Squire",
    notes: `A squire assists a warrior in battle. In the Bible, this role is similar to an armor bearer. They stay close to their leader. They support directly during conflict. A squire reflects loyalty in action.`,
  },
  {
    term: "Temple servant",
    notes: `Temple servants supported worship activities. They handled tasks that kept the system running. Their work was not always visible. But it was necessary for structure. A temple servant reflects service behind the scenes.`,
  },
  {
    term: "Woman at Endor",
    notes: `The woman at Endor was a medium. She was asked to call up a spirit for Saul. Her actions went against God's command. This moment showed Saul's desperation. She reflects seeking answers in the wrong place.`,
  },
  {
    term: "Young armor bearer",
    notes: `A young armor bearer supported a warrior in training. He followed closely in battle situations. He learned through observation and action. His role required courage early on. He reflects growth through responsibility.`,
  },
  {
    term: "Ziphites",
    notes: `The Ziphites were people from the region of Ziph. They reported David's location to Saul. Their actions put David in danger. They chose alignment with power over loyalty. The Ziphites reflect betrayal for advantage.`,
  },
  {
    term: "Ammonites",
    notes: `The Ammonites descended from Ben-Ammi. They were often in conflict with Israel. Their actions created ongoing tension. They had their own identity and leadership. Ammonites reflect neighboring opposition.`,
  },
  {
    term: "Ish-bosheth",
    notes: `Ish-bosheth was a son of Saul who became king. His rule was supported by Abner. He struggled to maintain authority. His reign ended in weakness and division. He reflects unstable leadership after transition.`,
  },
  {
    term: "Israelites",
    notes: `The Israelites are the descendants of Jacob. They formed the nation of Israel. They were chosen for covenant relationship. Their history includes both obedience and failure. They reflect identity tied to promise.`,
  },
  {
    term: "Soldier",
    notes: `A soldier fights under command. In the Bible, soldiers followed orders in battle. They required discipline and strength. Their role involved risk. A soldier reflects action under authority.`,
  },
  {
    term: "Young man (messenger)",
    notes: `A young man often carried messages between leaders. In the Bible, messengers moved quickly with important information. Their role required accuracy. Even simple delivery could change outcomes. He reflects responsibility in communication.`,
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

  for (const item of PEOPLE_NOTES) {
    const normalized = item.term.toLowerCase().trim().replace(/\s+/g, " ");
    const notesText = extractCompactPopupMeaning("people", item.notes);

    const { error } = await supabase
      .from("bible_people_notes")
      .upsert(
        {
          person_name: normalized,
          notes_text: notesText,
        },
        { onConflict: "person_name" }
      );

    if (error) {
      throw new Error(`Failed for ${item.term}: ${error.message}`);
    }
  }

  console.log(`Seeded ${PEOPLE_NOTES.length} manual people popup notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
