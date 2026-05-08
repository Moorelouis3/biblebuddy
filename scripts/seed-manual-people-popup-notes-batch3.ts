import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Epher (Midianite)",
    notes: `Epher is listed as a Midianite figure connected to Abraham's extended family. His name ties into the descendants of Midian, who came from Abraham through Keturah. Even though he is not central, he represents the spread of Abraham's lineage beyond Israel. Midianite lines often interacted with Israel in both positive and negative ways. Epher reflects how one family expanded into multiple nations.`,
  },
  {
    term: "Er (Judah's son)",
    notes: `Er was the firstborn son of Judah. He is known for doing what was considered wicked before God. Because of this, his life was cut short. His story is brief but serious. Er reflects how personal actions can bring immediate consequence.`,
  },
  {
    term: "Eshcol (Anak's brother)",
    notes: `Eshcol is associated with the family of Anak, known for giants. He represents strength and physical dominance in the land. This lineage caused fear among the Israelites. His name is tied to a region as well. Eshcol reflects how reputation can influence perception.`,
  },
  {
    term: "Eshkalon (place)",
    notes: `Eshkalon is a major Philistine city. It was known as a center of power and culture. The city often stood in opposition to Israel. It played a role in conflict throughout history. Eshkalon reflects strongholds outside of God's people.`,
  },
  {
    term: "Eshtemoa (Caleb's son)",
    notes: `Eshtemoa is listed among the descendants of Caleb. Caleb was known for faith and courage. Being in that line connects him to strength and obedience. Even without a story, the lineage matters. Eshtemoa reflects inherited legacy.`,
  },
  {
    term: "Esther (queen)",
    notes: `Esther became queen in Persia during a critical time. She used her position to save her people from destruction. Her courage required risk and timing. She stepped forward when it mattered most. Esther reflects boldness combined with wisdom.`,
  },
  {
    term: "Eunice (Timothy's mother)",
    notes: `Eunice was the mother of Timothy. She raised him with strong faith and teaching. Her influence shaped his future ministry. Even though she is not in the spotlight, her role is clear. Eunice reflects the power of consistent influence at home.`,
  },
  {
    term: "Evil-Merodach (king)",
    notes: `Evil-Merodach was a Babylonian king. He released King Jehoiachin from prison. This act showed unexpected mercy. His decision changed someone's life condition. He reflects how even powerful rulers can show compassion.`,
  },
  {
    term: "Gatam (Eliphaz's son)",
    notes: `Gatam is part of the Edomite lineage. He is connected to Eliphaz, a descendant of Esau. His name represents expansion of that family line. Even without story, he connects to a nation. Gatam reflects generational spread.`,
  },
  {
    term: "Genubath (Hadad's son)",
    notes: `Genubath was the son of Hadad in Egypt. He was raised within Pharaoh's household. This placed him between two cultures. His life shows how identity can be shaped by environment. Genubath reflects influence through upbringing.`,
  },
  {
    term: "Giddalti (musician)",
    notes: `Giddalti was one of the temple musicians. He served in organized worship under leadership. Music played a structured role in worship. His skill contributed to the atmosphere of devotion. Giddalti reflects worship through ability.`,
  },
  {
    term: "Ginath (Tibni's father)",
    notes: `Ginath is known as the father of Tibni. Tibni competed for kingship in Israel. This places Ginath in a politically connected family. Even indirectly, his role mattered. Ginath reflects how family ties influence leadership.`,
  },
  {
    term: "Gomer (Japheth's son)",
    notes: `Gomer is one of the sons of Japheth. He became the ancestor of a large people group. His lineage spread into distant regions. This shows how early generations expanded outward. Gomer reflects the origins of nations.`,
  },
  {
    term: "Gur-Baal (place)",
    notes: `Gur-Baal is a location mentioned during conflict. It was defeated during a king's campaign. This shows how territory shifted over time. Places often represent moments of victory. Gur-Baal reflects land tied to conquest.`,
  },
  {
    term: "Hadoram (Joktan's son)",
    notes: `Hadoram is part of Joktan's descendants. His name connects to early population spread. These lines show how nations developed. Even without a story, identity is preserved. Hadoram reflects generational expansion.`,
  },
  {
    term: "Hagab (servant)",
    notes: `Hagab is listed among temple servants. These servants supported worship and daily operations. They were not in leadership, but still essential. Their work helped everything function. Hagab reflects service behind the scenes.`,
  },
  {
    term: "Haggiah (Merarite)",
    notes: `Haggiah belonged to the Merarite division of Levites. This group handled structural parts of the tabernacle. Their work required strength and precision. They supported sacred operations. Haggiah reflects responsibility in service roles.`,
  },
  {
    term: "Ham (Noah's son)",
    notes: `Ham was one of Noah's sons. He became the ancestor of several nations. His actions after the flood caused tension. His line played a major role in history. Ham reflects how early actions affect generations.`,
  },
  {
    term: "Hammedatha (Haman's father)",
    notes: `Hammedatha was the father of Haman. His name connects to a family that opposed Israel. Even if not directly active, his lineage mattered. His family became known for conflict. Hammedatha reflects inherited influence.`,
  },
  {
    term: "Hamul (Judah's son)",
    notes: `Hamul was a descendant of Judah. His name appears in genealogical records. He represents continuation of the tribe. These records preserve identity over time. Hamul reflects generational continuity.`,
  },
  {
    term: "Hamutal (king's mother)",
    notes: `Hamutal was the mother of two kings of Judah. Her position placed her close to power. She influenced royal lineage. Even without recorded actions, her role mattered. Hamutal reflects influence through position.`,
  },
  {
    term: "Hanameel (Jeremiah's cousin)",
    notes: `Hanameel sold land to Jeremiah during crisis. This act was symbolic of future restoration. Even in loss, it pointed toward hope. His interaction carried prophetic meaning. Hanameel reflects faith during uncertainty.`,
  },
  {
    term: "Haran (Terah's son)",
    notes: `Haran was the brother of Abraham. He died before his father. His son Lot continued the line. His early death shaped the family path. Haran reflects how absence still influences direction.`,
  },
  {
    term: "Harhas (Shallum's grandfather)",
    notes: `Harhas is part of a priestly lineage. His name connects to temple service. Even without story, his position matters. He is part of a chain of responsibility. Harhas reflects continuity in leadership.`,
  },
  {
    term: "Haroeh (Caleb's son)",
    notes: `Haroeh is listed among Caleb's descendants. Caleb was known for strong faith. This connection places Haroeh in a respected line. Even without detail, the lineage matters. Haroeh reflects inherited identity.`,
  },
  {
    term: "Haruz (king's grandfather)",
    notes: `Haruz is mentioned as an ancestor within a royal line. His connection to a king places him close to authority. Even without a detailed story, his role supports leadership lineage. Family lines often shaped who rose to power. Haruz reflects influence through ancestry.`,
  },
  {
    term: "Hashubah (Jeconiah's son)",
    notes: `Hashubah is part of the royal family after exile. His name appears in the line of Jeconiah. This connects him to restoration after captivity. Even without narrative detail, his place matters. Hashubah reflects rebuilding generations.`,
  },
  {
    term: "Hathath (Caleb's son)",
    notes: `Hathath is listed among Caleb's descendants. Caleb's family was known for faith and courage. This connection carries weight even without a story. His name continues that legacy. Hathath reflects inherited strength.`,
  },
  {
    term: "Havilah (Cush's son)",
    notes: `Havilah is one of the early descendants after the flood. His name is tied to a region known for resources. It shows how geography and people connect. His lineage expanded outward. Havilah reflects early settlement and spread.`,
  },
  {
    term: "Hazarmaveth (Joktan's son)",
    notes: `Hazarmaveth belongs to the line of Joktan. His name is linked to early tribal expansion. These genealogies show how nations formed. Even without a story, identity is preserved. Hazarmaveth reflects generational growth.`,
  },
  {
    term: "Hazo (Nahor's son)",
    notes: `Hazo is part of Abraham's extended family. His name connects to Nahor's lineage. This shows how Abraham's family spread beyond Israel. Each name adds to the wider picture. Hazo reflects family expansion.`,
  },
  {
    term: "Heber (Joktan's son)",
    notes: `Heber is another descendant of Joktan. His name contributes to early population growth. Genealogies like this track identity over time. Even small mentions carry meaning. Heber reflects continuity.`,
  },
  {
    term: "Hen (Zechariah's son)",
    notes: `Hen is associated with a priestly or prophetic line. His name appears in connection with temple roles. Even without detail, his position is important. He represents continuity in spiritual service. Hen reflects generational responsibility.`,
  },
  {
    term: "Hepher (Manassite)",
    notes: `Hepher is connected to the tribe of Manasseh. His descendants received land as inheritance. His name ties to identity and territory. Family lines determined placement. Hepher reflects tribal structure.`,
  },
  {
    term: "Hephzibah (Hezekiah's mother)",
    notes: `Hephzibah was the mother of King Hezekiah. Her position places her in royal influence. She is part of a line connected to reform. Even without a story, her role matters. Hephzibah reflects influence through family.`,
  },
  {
    term: "Hesed (Ben-Zoheth's father)",
    notes: `Hesed is part of a genealogical line. He is known through his son's placement. These records preserve family connections. Even background figures are remembered. Hesed reflects continuity in lineage.`,
  },
  {
    term: "Heth (Canaan's son)",
    notes: `Heth is one of the sons of Canaan. He became the ancestor of the Hittites. His line played a major role in the land. This shows how nations formed from individuals. Heth reflects the origin of people groups.`,
  },
  {
    term: "Hezro (Carmelite)",
    notes: `Hezro is listed among David's mighty men. He belonged to the Carmel region. His role involved loyalty and battle. He stood with David in conflict. Hezro reflects strength and allegiance.`,
  },
  {
    term: "Hizkiah (Azariah's son)",
    notes: `Hizkiah appears in genealogical records. His name connects him to a leadership line. Even without events, his place matters. He represents continuity in family structure. Hizkiah reflects inherited identity.`,
  },
  {
    term: "Hodiah (Caleb's wife)",
    notes: `Hodiah is listed as part of Caleb's family. She connects to a strong and faithful lineage. Her role supports family structure. Even without detail, she belongs in the story. Hodiah reflects connection within a household.`,
  },
  {
    term: "Hoglah (Zelophehad's daughter)",
    notes: `Hoglah is one of Zelophehad's daughters. She helped secure inheritance rights for women. Her situation changed how laws were applied. She stood in a moment of transition. Hoglah reflects courage in legal identity.`,
  },
  {
    term: "Hophni (Eli's son)",
    notes: `Hophni was a priest but acted corruptly. He misused his position for personal gain. His actions brought judgment on his family. He ignored the responsibility of his role. Hophni reflects the danger of abusing authority.`,
  },
  {
    term: "Hur (Moses' assistant)",
    notes: `Hur supported Moses during key moments. He helped hold Moses' hands during battle. His role was steady and supportive. Even without leading, he made impact. Hur reflects strength through support.`,
  },
  {
    term: "Abide",
    notes: `Abide refers to someone who remains or stays. In the Bible, it reflects staying connected. It requires consistency. Remaining brings stability. It reflects commitment over time.`,
  },
  {
    term: "Abram",
    notes: `Abram is the original name of Abraham. He was called to leave his homeland. He trusted God's promise without full understanding. His journey shaped the future of Israel. Abram reflects faith before fulfillment.`,
  },
  {
    term: "Abram's servant",
    notes: `Abram's servant helped carry out his instructions. He acted on behalf of his master. His loyalty was essential. He followed directions with care. He reflects faithful service.`,
  },
  {
    term: "Abram's wife",
    notes: `Abram's wife is Sarai, later called Sarah. She walked with Abram through his journey. Her story includes both doubt and promise. She became part of the covenant story. She reflects growth through waiting.`,
  },
  {
    term: "Admah",
    notes: `Admah was one of the cities destroyed. It was judged alongside Sodom and Gomorrah. Its name is tied to destruction. It shows consequence of corruption. Admah reflects the result of widespread sin.`,
  },
  {
    term: "Arvad",
    notes: `Arvad was a coastal city and people group. It was known for seafaring strength. Its people were skilled in navigation. It played a role in trade and defense. Arvad reflects strength through location.`,
  },
  {
    term: "Beulah",
    notes: `Beulah means "married" or "belonging." It represents restoration and connection. The name reflects a renewed relationship. It shows transition from loss to belonging. Beulah reflects restored identity.`,
  },
  {
    term: "Chamor",
    notes: `Chamor was the father of Shechem and a local ruler. He negotiated with Jacob's family after a conflict involving his son. His approach tried to create peace through agreement. However, the situation ended in violence. Chamor reflects how compromise without wisdom can fail.`,
  },
  {
    term: "Chedorlaomer",
    notes: `Chedorlaomer was a powerful king who led a coalition of rulers. He dominated surrounding nations and demanded tribute. His campaign brought conflict into Abraham's story. Abraham eventually defeated him in battle. Chedorlaomer reflects temporary power that can still fall.`,
  },
  {
    term: "Dodanim",
    notes: `Dodanim is listed among early descendants of Japheth. His name connects to a distant people group. These genealogies show how nations spread out. Even without detail, the name holds a place. Dodanim reflects expansion from one family into many.`,
  },
  {
    term: "Hivite",
    notes: `A Hivite was part of a Canaanite people group. They lived in the land before Israel arrived. Some interacted with Israel through deception or alliance. They represent cultures already established in the land. Hivites reflect competing belief systems and influence.`,
  },
  {
    term: "Malkiel",
    notes: `Malkiel is a descendant of Asher. His name appears in tribal genealogies. He represents continuation within Israel's structure. Even without a story, his place is preserved. Malkiel reflects identity through family lines.`,
  },
  {
    term: "Salah",
    notes: `Salah is part of the line from Shem to Abraham. He connects early generations after the flood. His role is to carry the lineage forward. Even without events, his placement matters. Salah reflects continuity of the promise line.`,
  },
  {
    term: "Shechem",
    notes: `Shechem was both a person and a city name. As a person, he was involved in a major conflict with Jacob's family. As a place, it became an important location in Israel. His story involves relationships and consequences. Shechem reflects how actions can shape legacy.`,
  },
  {
    term: "Tyrus",
    notes: `Tyrus, or Tyre, was a powerful coastal city. It was known for trade, wealth, and influence. Its leaders often showed pride in their strength. The city interacted with Israel throughout history. Tyrus reflects prosperity mixed with arrogance.`,
  },
  {
    term: "Amalekite",
    notes: `An Amalekite is a descendant of Amalek. This group became a persistent enemy of Israel. They attacked without warning or fairness. Their actions created long-term conflict. Amalekites reflect opposition that returns repeatedly.`,
  },
  {
    term: "Angel of God",
    notes: `An angel of God is a messenger sent by Him. Angels deliver instructions, warnings, or guidance. They appear at key moments in the Bible. Their presence shows divine involvement. They reflect communication from heaven.`,
  },
  {
    term: "Angel of the Lord",
    notes: `The Angel of the Lord is a unique figure. He often speaks directly as God would. His appearances carry authority and power. People respond with reverence. He reflects direct divine presence.`,
  },
  {
    term: "Artisan",
    notes: `An artisan is someone skilled in making things. In the Bible, artisans built sacred objects. Their work required precision and care. They used their skill for a purpose. Artisans reflect creativity with intention.`,
  },
  {
    term: "Assembly",
    notes: `An assembly is a gathered group of people. In the Bible, assemblies met for worship or decisions. They created unity and shared purpose. Each person contributed to the whole. Assembly reflects community and connection.`,
  },
  {
    term: "Bondservant",
    notes: `A bondservant is someone who serves by obligation or choice. In the Bible, this role involved loyalty and responsibility. Some remained servants by commitment. It showed dedication beyond force. A bondservant reflects chosen service.`,
  },
  {
    term: "Brickmaker",
    notes: `A brickmaker produces building materials. In the Bible, Israelites were forced into this labor in Egypt. It was difficult and demanding work. It showed oppression under authority. Brickmakers reflect labor under pressure.`,
  },
  {
    term: "Captain",
    notes: `A captain is a leader in battle. In the Bible, captains directed troops. Their decisions affected outcomes. They held authority in conflict. A captain reflects leadership in action.`,
  },
  {
    term: "Child",
    notes: `A child represents youth and development. In the Bible, children are part of future generations. They require guidance and care. They carry potential. A child reflects beginning and growth.`,
  },
  {
    term: "Commander",
    notes: `A commander gives orders and leads others. In the Bible, commanders directed military action. They were responsible for strategy. Their leadership influenced results. A commander reflects authority in conflict.`,
  },
  {
    term: "Congregation",
    notes: `The congregation is the gathered people of Israel. In the Bible, it represents the whole community. It comes together for worship and decisions. Each person is part of the whole. The congregation reflects unity and identity.`,
  },
  {
    term: "Craftsman",
    notes: `A craftsman is skilled in building or creating. In the Bible, craftsmen made sacred objects. Their work required precision. They contributed to worship systems. A craftsman reflects skill used with purpose.`,
  },
  {
    term: "Daughter of Pharaoh",
    notes: `The daughter of Pharaoh rescued Moses as a baby. She raised him within the royal household. Her decision changed Moses' future. She showed compassion in a risky situation. She reflects unexpected kindness in power.`,
  },
  {
    term: "Descendant",
    notes: `A descendant is someone who comes after in a family line. In the Bible, descendants carry identity forward. They connect past to future. Each generation continues the story. Descendants reflect ongoing legacy.`,
  },
  {
    term: "Diviner",
    notes: `A diviner seeks knowledge through forbidden means. In the Bible, this practice is rejected. It relies on sources outside of God. It leads people away from truth. A diviner reflects misplaced reliance.`,
  },
  {
    term: "Egyptian",
    notes: `An Egyptian is someone from Egypt. In the Bible, Egypt represents both refuge and oppression. Egyptians interacted closely with Israel. Their culture influenced surrounding regions. An Egyptian reflects external influence.`,
  },
  {
    term: "Egyptian taskmaster",
    notes: `An Egyptian taskmaster controlled Israelite labor. They enforced harsh work conditions. Their role represented oppression. They demanded production without mercy. Taskmasters reflect forced authority.`,
  },
  {
    term: "Enemy",
    notes: `An enemy is someone who stands against you. In the Bible, enemies often oppose God's people or His plans. They create pressure, conflict, and testing. Not every enemy is physical, some are spiritual or internal. How you respond to an enemy reveals your character. An enemy reflects opposition that must be faced or overcome.`,
  },
  {
    term: "Enslaved person",
    notes: `An enslaved person is someone living under forced control. In the Bible, slavery was often tied to oppression and hardship. Enslaved people had limited freedom and heavy burdens. Their situation showed dependence on deliverance. God's interventions often focused on freeing the enslaved. An enslaved person reflects the need for liberation and justice.`,
  },
  {
    term: "Firstborn",
    notes: `The firstborn is the oldest child in a family. In the Bible, this role carried special responsibility and inheritance. The firstborn often received a double portion. They represented the continuation of the family line. Their position held both honor and expectation. The firstborn reflects leadership within the family structure.`,
  },
  {
    term: "Foreman",
    notes: `A foreman supervises work and labor. In the Bible, foremen were placed over groups to enforce tasks. They acted as middle leaders between rulers and workers. Their role could be difficult, especially under harsh authority. They were responsible for results and discipline. A foreman reflects leadership under pressure.`,
  },
  {
    term: "Gershonite",
    notes: `A Gershonite is a member of the Levite clan of Gershon. In the Bible, they were responsible for transporting tabernacle coverings. Their work was specific and structured. They operated as part of a larger system of service. Each group had a defined role. Gershonites reflect organized service within worship.`,
  },
  {
    term: "Guard",
    notes: `A guard protects and watches over something. In the Bible, guards were assigned to protect people, places, or objects. They stood in position to prevent danger or intrusion. Their role required alertness and discipline. A guard's presence provided security. A guard reflects vigilance and responsibility.`,
  },
  {
    term: "Hebrew",
    notes: `A Hebrew is a member of the people of Israel. In the Bible, the term identifies those descended from Abraham. It connects to language, culture, and covenant identity. Hebrews were set apart from surrounding nations. Their identity carried responsibility. A Hebrew reflects belonging to God's chosen people.`,
  },
  {
    term: "High priest",
    notes: `The high priest was the top spiritual leader in Israel. In the Bible, he represented the people before God. He entered the most holy place on behalf of the nation. His role required strict obedience and purity. He carried heavy responsibility. The high priest reflects mediation between God and people.`,
  },
  {
    term: "Infant",
    notes: `An infant is a very young child. In the Bible, infants represent new life and vulnerability. They depend completely on others for care. Their lives often marked beginnings or transitions. They reflect innocence and potential. An infant shows the start of growth and development.`,
  },
  {
    term: "Intercessor",
    notes: `An intercessor stands between others and God. In the Bible, intercessors pray or act on behalf of others. They carry responsibility beyond themselves. They seek mercy or help for someone else. Intercession requires compassion and faith. An intercessor reflects standing in the gap.`,
  },
  {
    term: "Israelite",
    notes: `An Israelite is a member of the nation of Israel. In the Bible, Israelites are descendants of Jacob. They are connected by covenant and law. Their identity shaped their responsibilities. They were called to live differently from other nations. An Israelite reflects covenant identity and purpose.`,
  },
  {
    term: "Kohathite",
    notes: `A Kohathite is a Levite from the family of Kohath. In the Bible, they carried the most sacred objects of the tabernacle. Their role required precision and reverence. They could not treat holy things casually. They worked closely with priests. Kohathites reflect responsibility for sacred duties.`,
  },
  {
    term: "King of Egypt",
    notes: `The king of Egypt is commonly referred to as Pharaoh. In the Bible, he held absolute authority over the land. He controlled resources and people. At times, he resisted God's commands. His decisions affected entire nations. The king of Egypt reflects earthly power confronting divine authority.`,
  },
  {
    term: "Levite",
    notes: `A Levite is a member of the tribe of Levi. In the Bible, Levites were set apart for service. They did not receive land like other tribes. Their role focused on worship and support. They helped maintain spiritual structure. A Levite reflects dedication to service.`,
  },
  {
    term: "Levitical priest",
    notes: `A Levitical priest is a Levite serving in priesthood. In the Bible, priests performed sacrifices and rituals. They represented the people before God. Their role required holiness and discipline. They followed strict instructions. A Levitical priest reflects structured worship leadership.`,
  },
  {
    term: "Libnite",
    notes: `A Libnite is a member of a Levitical family line. In the Bible, Libnites belonged to the tribe of Levi. They were part of organized service groups. Their identity came through lineage. They supported temple functions. Libnites reflect structured family roles in service.`,
  },
  {
    term: "Magician",
    notes: `A magician practiced signs and wonders apart from God. In the Bible, magicians appeared in Egypt. They tried to imitate God's power. Their abilities were limited compared to God. They represented false power. A magician reflects imitation without true authority.`,
  },
  {
    term: "Mediator",
    notes: `A mediator stands between two parties. In the Bible, mediators help bring agreement or peace. They communicate between both sides. Their role requires trust. They aim to restore connection. A mediator reflects reconciliation.`,
  },
  {
    term: "Merchant",
    notes: `A merchant trades goods for profit. In the Bible, merchants traveled and exchanged items. Their work connected regions and people. They depended on fairness and value. Trade required wisdom. A merchant reflects movement of resources and economy.`,
  },
  {
    term: "Midianite",
    notes: `A Midianite is a descendant of Midian. In the Bible, they interacted with Israel in different ways. Sometimes they were allies, sometimes enemies. They lived in surrounding regions. Their identity came from Abraham's line. A Midianite reflects complex relationships between nations.`,
  },
  {
    term: "Neighbor",
    notes: `A neighbor is someone near you. In the Bible, the idea goes beyond location. It includes how you treat others. Neighbors are to be cared for and respected. The concept shapes relationships. A neighbor reflects responsibility toward others.`,
  },
  {
    term: "Nephew",
    notes: `A nephew is a brother's or sister's son. In the Bible, nephews often appear in extended family stories. They are part of the larger household structure. Their role connects generations. Family ties carried importance. A nephew reflects extended family connection.`,
  },
  {
    term: "Noble",
    notes: `A noble is a person of high status or influence. In the Bible, nobles held authority in society. They often advised kings or led people. Their actions affected others. Position required responsibility. A noble reflects leadership within social structure.`,
  },
  {
    term: "Officer",
    notes: `An officer is someone with authority under leadership. In the Bible, officers managed tasks and people. They enforced orders. Their role required discipline. They connected leadership with action. An officer reflects organized authority.`,
  },
  {
    term: "Pharaoh's daughter",
    notes: `Pharaoh's daughter rescued Moses as a baby. She chose compassion over fear. Her decision changed the future of Israel. She raised Moses in the palace. She acted with courage in a risky moment. Pharaoh's daughter reflects unexpected mercy and influence.`,
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
