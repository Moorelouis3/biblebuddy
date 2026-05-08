import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Sadoc",
    notes: `Sadoc, also known as Zadok, was a priest during the time of David and Solomon. He remained loyal to David when others turned away. Later, he supported Solomon becoming king. Because of his faithfulness, his priestly line continued. Sadoc reflects loyalty that leads to long-term impact.`,
  },
  {
    term: "Sargon",
    notes: `Sargon was a king of Assyria. He ruled during a time when Assyria was a major power. His leadership expanded influence across regions. He represents strong political authority. Sargon reflects rising empires shaping history.`,
  },
  {
    term: "Seir",
    notes: `Seir is both a person and a region name. He is connected to the land of Edom. His descendants lived in mountainous territory. The name ties people to geography. Seir reflects identity linked to land.`,
  },
  {
    term: "Seorim",
    notes: `Seorim was part of a priestly division. He served within the temple rotation system. His role helped maintain order in worship. Even small roles mattered in structure. Seorim reflects organized service.`,
  },
  {
    term: "Shammai",
    notes: `Shammai is a name used for multiple figures. Some were leaders, others teachers. The name appears across generations. Each carried influence in their context. Shammai reflects recurring identity across time.`,
  },
  {
    term: "Shavsha",
    notes: `Shavsha served as a royal scribe. He recorded decisions and important events. His role ensured accuracy in leadership. Even behind the scenes, he had impact. Shavsha reflects importance of documentation.`,
  },
  {
    term: "Shear-Jashub",
    notes: `Shear-Jashub was the son of Isaiah. His name means "a remnant will return." He was a living sign of prophecy. His identity carried a message. He reflects how God uses names as signs.`,
  },
  {
    term: "Shelemiah",
    notes: `Shelemiah appears in various contexts in the Bible. Some were priests, others officials. The name connects to leadership roles. Even without detail, it carries structure. Shelemiah reflects responsibility within systems.`,
  },
  {
    term: "Shelomith",
    notes: `Shelomith is a name given to both men and women. It appears in priestly and tribal records. The name connects to peace and completeness. Each person carried a role in their context. Shelomith reflects identity tied to meaning.`,
  },
  {
    term: "Shemariah",
    notes: `Shemariah appears among leaders and descendants. His name connects to obedience and hearing. He is part of structured lineage records. Even without a story, his place matters. Shemariah reflects continuity in leadership lines.`,
  },
  {
    term: "Shethar-Boznai",
    notes: `Shethar-Boznai was an official during the Persian period. He opposed the rebuilding of Jerusalem. He questioned the authority behind the work. His actions slowed progress. He reflects resistance to restoration.`,
  },
  {
    term: "Shimri",
    notes: `Shimri appears in genealogical records. His name connects him to tribal identity. Even minor figures are preserved in Scripture. They contribute to the larger story. Shimri reflects continuity through generations.`,
  },
  {
    term: "Shiza",
    notes: `Shiza is a lesser known figure in genealogies. His name connects him to a family line. Even without events, he is recorded. This shows the value of every name. Shiza reflects quiet inclusion in history.`,
  },
  {
    term: "Simon Magus",
    notes: `Simon Magus practiced magic and sought power. He was amazed by the apostles' authority. He tried to buy spiritual power. His heart was corrected strongly. Simon reflects misunderstanding true authority.`,
  },
  {
    term: "Sippai",
    notes: `Sippai was a Philistine giant. He fought against Israel during David's time. He was eventually defeated by one of David's warriors. His size did not guarantee victory. Sippai reflects visible strength that still falls.`,
  },
  {
    term: "Sucathites",
    notes: `The Sucathites were a group of people. They are listed among families connected to work and service. Their identity comes through association. Even group names matter in Scripture. Sucathites reflect collective identity.`,
  },
  {
    term: "Tiberius",
    notes: `Tiberius was a Roman emperor. He ruled during the time of Jesus. His authority shaped the political environment. He represents the Roman system of power. Tiberius reflects global authority over the region.`,
  },
  {
    term: "Tiglath-Pileser",
    notes: `Tiglath-Pileser was a king of Assyria. He expanded his empire aggressively. He played a role in Israel's captivity. His power affected multiple nations. He reflects dominance through conquest.`,
  },
  {
    term: "Tilgath-Pilneser",
    notes: `Tilgath-Pilneser is another name for Tiglath-Pileser. Different spellings reflect translation variations. He is the same powerful Assyrian ruler. His actions impacted Israel deeply. He reflects the same imperial authority.`,
  },
  {
    term: "Tiras",
    notes: `Tiras is one of the sons of Japheth. He became the ancestor of a people group. His name connects to early population spread. Even without a story, he matters. Tiras reflects expansion of humanity.`,
  },
  {
    term: "Tob-Adonijah",
    notes: `Tob-Adonijah is a lesser known figure tied to regional identity. His name appears within a broader structure. Even without detail, he is part of the record. His presence connects to a larger system. Tob-Adonijah reflects inclusion in history.`,
  },
  {
    term: "Tobijah",
    notes: `Tobijah opposed the rebuilding of Jerusalem. He mocked and resisted the work. His influence tried to discourage progress. Despite his efforts, the work continued. Tobijah reflects opposition to restoration.`,
  },
  {
    term: "Zebul",
    notes: `Zebul served as a leader within Shechem. He opposed rebellion within the city. His actions helped restore order. He supported rightful authority. Zebul reflects standing against internal chaos.`,
  },
  {
    term: "Zephon",
    notes: `Zephon is a descendant of Gad. His name appears in tribal genealogies. He represents continuation within Israel. Even minor names carry identity. Zephon reflects generational structure.`,
  },
  {
    term: "Zeri",
    notes: `Zeri is part of the Levitical line. His name appears among temple musicians. He contributed to worship through music. Even support roles mattered. Zeri reflects structured worship service.`,
  },
  {
    term: "Zerubbabel",
    notes: `Zerubbabel was a key leader after the exile. He helped lead the return of the people to Jerusalem. He oversaw the rebuilding of the temple foundation. His role connected past promises to present action. Zerubbabel reflects rebuilding after loss.`,
  },
  {
    term: "Zinri",
    notes: `Zinri appears in genealogical records. His name connects to a family line within Israel. Even without a story, his identity is preserved. He contributes to the larger structure. Zinri reflects continuity through generations.`,
  },
  {
    term: "Abihail (Esther's father)",
    notes: `Abihail was the father of Queen Esther. His name connects him to her story of courage. Even though he is not central, his role matters. He represents the family Esther came from. Abihail reflects influence through lineage.`,
  },
  {
    term: "Abihu (Aaron's son)",
    notes: `Abihu was one of Aaron's sons and a priest. He offered unauthorized fire before God. His action showed a lack of reverence. He faced immediate judgment. Abihu reflects the danger of careless worship.`,
  },
  {
    term: "Agrippa I (Herod)",
    notes: `Agrippa I was a ruler under Roman authority. He persecuted early believers. He acted with pride and accepted praise as a god. His life ended suddenly as judgment. Agrippa reflects power misused.`,
  },
  {
    term: "Agrippa II (Herod)",
    notes: `Agrippa II ruled during Paul's time. He listened to Paul's defense of faith. He understood the message but did not fully commit. His position placed him close to truth. Agrippa reflects awareness without decision.`,
  },
  {
    term: "Aharah (Benjaminite)",
    notes: `Aharah is part of the tribe of Benjamin. His name appears in genealogical records. He represents continuation of a tribe. Even without detail, he matters. Aharah reflects identity through lineage.`,
  },
  {
    term: "Ahumai (Judahite)",
    notes: `Ahumai is listed among Judah's descendants. His name connects him to a larger family structure. These records preserve identity. Even small names have value. Ahumai reflects generational continuity.`,
  },
  {
    term: "Ahuzam (Judahite)",
    notes: `Ahuzam appears within Judah's genealogical line. His presence links him to a tribe of leadership. Even without a story, his place matters. He is part of a broader system. Ahuzam reflects preserved identity.`,
  },
  {
    term: "Asahiah (servant)",
    notes: `Asahiah served in a supporting role under leadership. He was involved in carrying out responsibilities. His work helped maintain structure. Even without prominence, he was needed. Asahiah reflects faithful service.`,
  },
  {
    term: "Azrikam (Benjaminite)",
    notes: `Azrikam is part of the tribe of Benjamin. He is connected to leadership and structure. His name appears in genealogical lists. These records preserve continuity. Azrikam reflects identity through tribe.`,
  },
  {
    term: "Bernice (sister)",
    notes: `Bernice was the sister of Agrippa II. She appeared alongside him in political settings. She witnessed Paul's defense. Her position placed her near major events. Bernice reflects influence through association.`,
  },
  {
    term: "Debtor",
    notes: `A debtor owes something to another. In the Bible, debt reflects obligation. It creates responsibility. Debt must be addressed or resolved. A debtor reflects accountability.`,
  },
  {
    term: "Edomite",
    notes: `An Edomite is a descendant of Esau. They lived in the region of Edom. They often had conflict with Israel. Their identity came from lineage. An Edomite reflects neighboring opposition.`,
  },
  {
    term: "False prophet",
    notes: `A false prophet speaks untrue messages. In the Bible, they claim authority without truth. They mislead people. Their influence can be dangerous. A false prophet reflects deception.`,
  },
  {
    term: "Fatherless",
    notes: `The fatherless are those without a father. In the Bible, they are protected and cared for. They are vulnerable in society. God shows concern for them. The fatherless reflect need for justice.`,
  },
  {
    term: "Foreigner within your gates",
    notes: `This refers to a non-native living among the people. In the Bible, they were to be treated fairly. They lived under the same laws. They were included in community life. They reflect inclusion and responsibility.`,
  },
  {
    term: "Governor",
    notes: `A governor oversees a region. In the Bible, governors enforced authority. They managed people and resources. Their role required leadership. A governor reflects administrative power.`,
  },
  {
    term: "Lawgiver",
    notes: `A lawgiver establishes rules. In the Bible, God is the ultimate lawgiver. Others carried out His laws. They defined right and wrong. A lawgiver reflects authority in instruction.`,
  },
  {
    term: "Orphan",
    notes: `An orphan has lost both parents. In the Bible, they are vulnerable. They are to be protected. Their situation calls for compassion. An orphan reflects need for care.`,
  },
  {
    term: "Tribe",
    notes: `A tribe is a group connected by lineage. In the Bible, tribes formed the nation of Israel. Each had its own identity. They shared a common origin. A tribe reflects organized family structure.`,
  },
  {
    term: "Tribal leader",
    notes: `A tribal leader represents a group. In the Bible, they guided their people. They made decisions on behalf of others. Their leadership affected outcomes. They reflect responsibility within a tribe.`,
  },
  {
    term: "Witness",
    notes: `A witness confirms what is true. In the Bible, witnesses are essential for judgment. They establish facts. Their words carry weight. A witness reflects truth and accountability.`,
  },
  {
    term: "Bethuel (Laban's father)",
    notes: `Bethuel was the father of Laban and Rebekah. He connects to Abraham's extended family. His household played a role in Isaac's marriage. Even without many details, he is important. Bethuel reflects family connection in covenant history.`,
  },
  {
    term: "Bildad (Shuhite)",
    notes: `Bildad was one of Job's friends. He spoke during Job's suffering. His words focused on justice and tradition. He misunderstood Job's situation. Bildad reflects limited understanding in hardship.`,
  },
  {
    term: "Bilgah (priest)",
    notes: `Bilgah was part of a priestly division serving in the temple. His group followed a rotation system for worship duties. Their service kept the structure of worship consistent. Each division had a set time to serve. Bilgah reflects order and discipline in priestly service.`,
  },
  {
    term: "Bilhah (maidservant)",
    notes: `Bilhah was Rachel's maidservant. She was given to Jacob and bore children on Rachel's behalf. Her life shows how family roles could be complex. She became part of the lineage of Israel. Bilhah reflects how even secondary roles shaped the future.`,
  },
  {
    term: "Binea (Saul's descendant)",
    notes: `Binea appears in the genealogy of Saul's line. His name shows continuation after Saul's reign. Even after leadership changes, the family line remained. These records preserve identity over time. Binea reflects legacy beyond power.`,
  },
  {
    term: "Boaz (kinsman-redeemer)",
    notes: `Boaz was a relative of Naomi's family. He acted as a kinsman-redeemer for Ruth. His actions restored inheritance and security. He showed kindness and responsibility. Boaz reflects redemption through obedience and care.`,
  },
  {
    term: "Buz (Nahor's son)",
    notes: `Buz was a son of Nahor, Abraham's brother. His name connects to extended family lines. These genealogies show expansion beyond Israel. Even distant relatives are recorded. Buz reflects growth of family networks.`,
  },
  {
    term: "Buzi (Ezekiel's father)",
    notes: `Buzi was the father of the prophet Ezekiel. His name connects him to a prophetic calling. Even though he is not the focus, his role matters. He represents the background behind a major prophet. Buzi reflects generational influence in spiritual roles.`,
  },
  {
    term: "Cain (Adam's son)",
    notes: `Cain was the first son of Adam and Eve. He became known for killing his brother Abel. His actions introduced violence into human history. He was marked and sent away. Cain reflects how jealousy can lead to destruction.`,
  },
  {
    term: "Canaan (Ham's son)",
    notes: `Canaan was the son of Ham and grandson of Noah. His name became associated with a region and people group. His descendants inhabited the Promised Land. They later came into conflict with Israel. Canaan reflects the origin of a major territory.`,
  },
  {
    term: "Chileab (David's son)",
    notes: `Chileab was one of David's sons. He is not mentioned much beyond his name. His presence shows the size of David's family. Even less-known sons are recorded. Chileab reflects inclusion within royal lineage.`,
  },
  {
    term: "Chilion (Elimelech's son)",
    notes: `Chilion was the son of Elimelech and Naomi. He moved to Moab during a famine. He later died there. His death contributed to Naomi's loss. Chilion reflects the impact of hardship on families.`,
  },
  {
    term: "Chimham (Barzillai's son)",
    notes: `Chimham was the son of Barzillai. Barzillai supported David during his escape. Chimham was honored because of his father's loyalty. He received a place near the king. Chimham reflects how loyalty is rewarded across generations.`,
  },
  {
    term: "Chloe (woman)",
    notes: `Chloe is mentioned in the New Testament. People from her household reported issues in the church. Her name is connected to communication and awareness. She represents connection within the early church. Chloe reflects influence through community ties.`,
  },
  {
    term: "Cosam (Jesus' ancestor)",
    notes: `Cosam is listed in the genealogy of Jesus. His name connects one generation to another. Even without a story, his role is important. Each name builds toward fulfillment. Cosam reflects continuity in the Messianic line.`,
  },
  {
    term: "Cush (Ham's son)",
    notes: `Cush was a son of Ham. He became the ancestor of a large people group. His descendants lived in regions south of Egypt. His name connects to geography and identity. Cush reflects early expansion of nations.`,
  },
  {
    term: "Cushan-Rishathaim (king)",
    notes: `Cushan-Rishathaim was a king who oppressed Israel. His rule lasted several years during the Judges period. He held power until Israel cried out for help. God raised a deliverer to defeat him. He reflects oppression followed by rescue.`,
  },
  {
    term: "Dalphon (Haman's son)",
    notes: `Dalphon was one of Haman's sons. He was executed after Haman's downfall. His fate was tied to his father's actions. This shows how consequences spread through families. Dalphon reflects shared judgment.`,
  },
  {
    term: "Dedan (Cush's son)",
    notes: `Dedan is a descendant of Cush. His name connects to a trading people group. Dedanites were known for commerce. His lineage spread into economic influence. Dedan reflects expansion into trade.`,
  },
  {
    term: "Dedan (Raamah's son)",
    notes: `This Dedan comes through a different branch of the family. He also connects to a people group. The repeated name shows overlap in lineage. Multiple lines carried similar identities. Dedan reflects layered family structures.`,
  },
  {
    term: "Diblaim (Gomer's father)",
    notes: `Diblaim is known as the father of Gomer. Gomer was the wife of the prophet Hosea. Her life carried symbolic meaning. This places Diblaim within a prophetic context. Diblaim reflects connection to a message-driven story.`,
  },
  {
    term: "Dibri (Danite)",
    notes: `Dibri is part of the tribe of Dan. He is known through a legal situation involving his family. His name appears in a moment of judgment. It connects to accountability. Dibri reflects responsibility within a community.`,
  },
  {
    term: "Diklah (Joktan's son)",
    notes: `Diklah is part of Joktan's lineage. His name connects to early population spread. These genealogies show growth of nations. Even without detail, identity is preserved. Diklah reflects expansion from one family.`,
  },
  {
    term: "Dinah (Jacob's daughter)",
    notes: `Dinah was the daughter of Jacob and Leah. Her story involved conflict with the people of Shechem. This led to a violent response from her brothers. Her experience impacted the entire family. Dinah reflects how personal events affect communities.`,
  },
  {
    term: "Dodavah (Mareshah's father)",
    notes: `Dodavah is connected to a prophetic moment. His son delivered a message of warning. This places him within a line tied to truth. Even indirectly, his role matters. Dodavah reflects generational connection to prophecy.`,
  },
  {
    term: "Dositheus (general)",
    notes: `Dositheus is referenced in historical accounts as a leader. He represents military authority outside biblical central figures. His name appears in extended traditions. He reflects leadership within broader history. Dositheus shows how influence extends beyond Scripture's main focus.`,
  },
  {
    term: "Dumah (Ishmael's son)",
    notes: `Dumah is one of Ishmael's sons. His name connects to a tribe or region. This shows the spread of Ishmael's descendants. Even without detail, the identity remains. Dumah reflects expansion of a lineage.`,
  },
  {
    term: "Ebal (Joktan's son)",
    notes: `Ebal is listed among the descendants of Joktan. His name connects to early generations after the flood. These genealogies show how families spread into nations. Even without a story, his place matters. Ebal reflects the expansion of humanity through lineage.`,
  },
  {
    term: "Ebed-Melech (eunuch)",
    notes: `Ebed-Melech served in the royal court as an official. He showed courage by rescuing Jeremiah from a pit. He acted when others stayed silent. His decision saved a prophet's life. Ebed-Melech reflects bold compassion in difficult situations.`,
  },
  {
    term: "Eder (Beriah's son)",
    notes: `Eder is part of a genealogical line in Israel. His name connects him to tribal identity. These records preserve family connections. Even without detail, he belongs in the story. Eder reflects continuity across generations.`,
  },
  {
    term: "Eglah (David's wife)",
    notes: `Eglah was one of King David's wives. She is part of his growing household. Her role contributes to the structure of his family. Even without a detailed story, her place matters. Eglah reflects inclusion within royal life.`,
  },
  {
    term: "Eleasah (Saul's descendant)",
    notes: `Eleasah appears in the genealogy of Saul's family. His name shows continuation beyond Saul's reign. These records preserve identity after leadership changes. He connects past to future generations. Eleasah reflects legacy beyond power.`,
  },
  {
    term: "Eleazar (Aaron's son)",
    notes: `Eleazar was the son of Aaron and became high priest. He took on leadership after his father. His role involved sacred responsibilities. He helped guide Israel spiritually. Eleazar reflects continuation of priestly authority.`,
  },
  {
    term: "Eli (priest)",
    notes: `Eli was a priest and judge in Israel. He oversaw the temple during a time of decline. His sons acted corruptly under his leadership. He struggled to correct them. Eli reflects leadership weakened by inaction.`,
  },
  {
    term: "Eliadah (Rezon's father)",
    notes: `Eliadah is known as the father of Rezon. Rezon later became an enemy of Israel. This connection shows how lineage affects outcomes. Even indirect roles carry weight. Eliadah reflects influence through family lines.`,
  },
  {
    term: "Eliakim (Hezekiah's steward)",
    notes: `Eliakim served as a trusted official under King Hezekiah. He managed important responsibilities within the kingdom. He handled communication with foreign leaders. His role required wisdom and composure. Eliakim reflects reliable leadership under pressure.`,
  },
  {
    term: "Eliam (Ahithophel's son)",
    notes: `Eliam is connected to both David and Ahithophel. He was part of a family tied to major events. His name links different parts of the story. Even without focus, his role matters. Eliam reflects connection between key figures.`,
  },
  {
    term: "Eliezer (Abraham's servant)",
    notes: `Eliezer was Abraham's trusted servant. He was sent to find a wife for Isaac. He acted with faith and careful judgment. His decisions shaped the future family line. Eliezer reflects faithful responsibility.`,
  },
  {
    term: "Elijah (prophet)",
    notes: `Elijah was a powerful prophet in Israel. He confronted false worship and stood alone at times. He called down fire from heaven. His life showed bold obedience. Elijah reflects fearless devotion to God.`,
  },
  {
    term: "Elimelech (Naomi's husband)",
    notes: `Elimelech left Bethlehem during famine. He moved his family to Moab. His decision led to unexpected loss. His death changed Naomi's life completely. Elimelech reflects choices made during hardship.`,
  },
  {
    term: "Naomi",
    notes: `Naomi experienced loss and hardship. She lost her husband and sons in a foreign land. Despite pain, she returned home. Her story turned from bitterness to restoration. Naomi reflects resilience through suffering.`,
  },
  {
    term: "Eliphelet (David's son)",
    notes: `Eliphelet was one of David's sons. He is part of the extended royal family. His name appears in genealogical lists. Even without a story, his place matters. Eliphelet reflects continuation of David's line.`,
  },
  {
    term: "Elishama (David's son)",
    notes: `Elishama is another son of David. He belonged to the royal household in Jerusalem. His presence shows the size of David's family. Even minor names contribute to the whole. Elishama reflects family expansion.`,
  },
  {
    term: "Elisheba (Aaron's wife)",
    notes: `Elisheba was the wife of Aaron. She belonged to a respected family line. Her marriage connected priestly leadership. She was part of the foundation of the priesthood. Elisheba reflects support within sacred leadership.`,
  },
  {
    term: "Elishua (David's son)",
    notes: `Elishua was one of David's sons born in Jerusalem. He represents the growth of David's household. His name appears in royal genealogy. Even without a story, he is included. Elishua reflects continuation of lineage.`,
  },
  {
    term: "Elkanah (Samuel's father)",
    notes: `Elkanah was the father of the prophet Samuel. He faithfully worshiped despite family challenges. His household became part of a major transition in Israel. He supported Samuel's calling. Elkanah reflects faithfulness in family leadership.`,
  },
  {
    term: "Elmodam (Jesus' ancestor)",
    notes: `Elmodam is listed in the genealogy of Jesus. His name connects one generation to the next. Even without detail, his role is essential. Each name builds toward fulfillment. Elmodam reflects quiet importance in the lineage.`,
  },
  {
    term: "Elnam (Esli's son)",
    notes: `Elnam appears in the genealogy of Jesus. His name connects to the Messianic line. He is part of a long chain of generations. Even without story, his role matters. Elnam reflects continuity toward fulfillment.`,
  },
  {
    term: "Elpalet (David's son)",
    notes: `Elpalet is another son of David. He is part of the royal lineage. His name is recorded among many sons. Even lesser-known figures are included. Elpalet reflects preservation of identity.`,
  },
  {
    term: "Elpelet (David's son)",
    notes: `Elpelet appears in David's family list. He shares a similar name with Elpalet. His presence shows repetition in naming. Even with little detail, he is remembered. Elpelet reflects inclusion within lineage.`,
  },
  {
    term: "Elymas (Bar-Jesus)",
    notes: `Elymas was a sorcerer who opposed truth. He tried to turn people away from the message. He resisted what was being taught. He was confronted and corrected. Elymas reflects opposition through deception.`,
  },
  {
    term: "Ephah (Caleb's concubine)",
    notes: `Ephah was a concubine of Caleb. She bore children who became part of his line. Her role contributed to the expansion of the family. Even secondary roles shaped the future. Ephah reflects how lineage grows through many connections.`,
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
