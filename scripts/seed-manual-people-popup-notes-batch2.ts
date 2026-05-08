import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Abijah (daughter of Zechariah)",
    notes: `Abijah is identified as the daughter of Zechariah, placing her within a priestly or prophetic family line. Her name connects her to a household that had spiritual responsibility and influence. Even though she is not given a full story, her placement matters. She represents how families carried roles tied to worship and leadership. Abijah reflects how identity is often shaped by the household you come from.`,
  },
  {
    term: "Adin",
    notes: `Adin is listed among those who returned from exile. He represents a group that came back to rebuild after captivity. This shows commitment to restoration and identity. Returning was not easy, it required leaving what was familiar. Adin reflects people who chose rebuilding over comfort.`,
  },
  {
    term: "Adoniram",
    notes: `Adoniram was in charge of forced labor under Solomon. His role involved overseeing large-scale work projects. He held authority over people and systems. This position required organization and control. Adoniram reflects the structure behind kingdom building.`,
  },
  {
    term: "Adoni-Zedek",
    notes: `Adoni-Zedek was a Canaanite king who fought against Israel. He tried to unite other kings to resist conquest. Despite his effort, he was defeated. His story shows resistance against what God had already declared. Adoni-Zedek reflects opposition that cannot stand long term.`,
  },
  {
    term: "Ahban",
    notes: `Ahban appears in genealogical records connected to Judah. His role is mainly to link family generations together. Even without a story, his name holds a place. Genealogies preserve identity across time. Ahban reflects how every person contributes to a larger legacy.`,
  },
  {
    term: "Ahilud",
    notes: `Ahilud is known as the father of a royal recorder. This connects him to the administrative side of leadership. His family line was tied to communication and record keeping. That role helped preserve history and decisions. Ahilud reflects the importance of structure behind leadership.`,
  },
  {
    term: "Ahitub",
    notes: `Ahitub is part of the priestly lineage descending from Aaron. His role is tied to spiritual leadership and service. Even if not directly active in events, his position matters. Priestly lines carried responsibility across generations. Ahitub reflects continuity in sacred roles.`,
  },
  {
    term: "Alexander (high priest family)",
    notes: `Alexander is mentioned as part of a high priestly family. This places him within a group that held religious authority. His environment was one of influence and responsibility. He represents connection to leadership structures. Alexander reflects how position can shape perspective.`,
  },
  {
    term: "Ammon",
    notes: `Ammon is both a person and a nation descended from Lot. His descendants became known as the Ammonites. They often opposed Israel throughout history. This shows how one origin can shape long-term identity. Ammon reflects how nations develop from single beginnings.`,
  },
  {
    term: "Ananias (Sapphira's husband)",
    notes: `Ananias is known for lying about an offering. He and his wife tried to appear more generous than they were. His actions were deliberate, not accidental. He was judged immediately for his deception. Ananias reflects the danger of pretending in spiritual matters.`,
  },
  {
    term: "Anathothite",
    notes: `Anathothite refers to someone from the town of Anathoth. This town was known as a priestly location. People from there often had connections to temple service. Location carried identity and expectation. Anathothite reflects how place influences role.`,
  },
  {
    term: "Aram",
    notes: `Aram is one of the sons of Shem. He became the ancestor of the Aramean people. His name is tied to a large regional group. This shows how early figures shaped entire nations. Aram reflects expansion from a single family line.`,
  },
  {
    term: "Arba",
    notes: `Arba is known as the father of Anak. His descendants were known as giants in the land. His name is connected to strength and intimidation. He represents a lineage that caused fear. Arba reflects how reputation can shape perception.`,
  },
  {
    term: "Ardon",
    notes: `Ardon is listed as a son of Caleb. Caleb was known for faith and courage. Being in that family line carried meaning. Even without detail, that connection matters. Ardon reflects inherited legacy.`,
  },
  {
    term: "Asshurim",
    notes: `Asshurim is a group descended from Abraham. Their name reflects expansion of his lineage. They became part of the broader tribal structure. These names show how families spread into nations. Asshurim reflects generational multiplication.`,
  },
  {
    term: "Baal",
    notes: `Baal is a false god worshiped by surrounding nations. He became a major source of conflict for Israel. Worship of Baal often involved immoral practices. People were repeatedly drawn toward it. Baal reflects the pull of false systems.`,
  },
  {
    term: "Baal-Berith",
    notes: `Baal-Berith was worshiped as a covenant god. People turned to him instead of the true God. This shows how easily covenant can be distorted. False worship can look structured but still be wrong. Baal-Berith reflects misdirected loyalty.`,
  },
  {
    term: "Baal-Hanan",
    notes: `Baal-Hanan was a king in Edom. He ruled before Israel established its monarchy. His name reflects leadership in a neighboring nation. He represents political structure outside Israel. Baal-Hanan reflects external authority systems.`,
  },
  {
    term: "Baal-Peor",
    notes: `Baal-Peor is associated with idolatry and immorality. Israel fell into sin through this influence. It involved both worship and behavior. This event had serious consequences. Baal-Peor reflects how compromise leads to downfall.`,
  },
  {
    term: "Ben-Abinadab",
    notes: `Ben-Abinadab served under King Solomon. He managed a specific region's resources. His role supported the royal system. Without roles like his, the system would fail. Ben-Abinadab reflects structured leadership.`,
  },
  {
    term: "Ben-Ammi",
    notes: `Ben-Ammi is the ancestor of the Ammonites. He was born from Lot's line. His descendants became a separate nation. This shows how one life can shape many. Ben-Ammi reflects origin of identity.`,
  },
  {
    term: "Ben-Deker",
    notes: `Ben-Deker was one of Solomon's officials. He oversaw provision for the kingdom. His work was behind the scenes but essential. He helped maintain stability. Ben-Deker reflects support roles in leadership.`,
  },
  {
    term: "Ben-Hadad",
    notes: `Ben-Hadad was a king of Aram. He fought against Israel multiple times. His presence created ongoing tension. He represents opposition from outside nations. Ben-Hadad reflects external pressure.`,
  },
  {
    term: "Ben-Hail",
    notes: `Ben-Hail served in Solomon's administration. His role contributed to the system's function. Even without detailed stories, his work mattered. He helped maintain order. Ben-Hail reflects quiet responsibility.`,
  },
  {
    term: "Ben-Hesed",
    notes: `Ben-Hesed was another regional official. He provided resources for the royal court. His role ensured provision was consistent. He worked within a structured system. Ben-Hesed reflects reliability in leadership.`,
  },
  {
    term: "Ben-Hur",
    notes: `Ben-Hur served as one of Solomon's regional officials. He was responsible for overseeing a specific territory. His role involved making sure resources were provided consistently. Even though he is not a major character, his position mattered. Ben-Hur reflects how systems depend on reliable leadership.`,
  },
  {
    term: "Ben-Oni",
    notes: `Ben-Oni was the name Rachel gave to her son at birth. It meant "son of my sorrow" because she died giving birth. Jacob later changed his name to Benjamin. This shows how identity can shift over time. Ben-Oni reflects pain being transformed into purpose.`,
  },
  {
    term: "Berodach-Baladan",
    notes: `Berodach-Baladan was a king of Babylon. He reached out to King Hezekiah with interest and political intent. His actions exposed Hezekiah's pride when he showed his treasures. This moment led to future consequences. Berodach-Baladan reflects how outside influence can test character.`,
  },
  {
    term: "Bohan",
    notes: `Bohan is known as a landmark name tied to territory boundaries. His name marks a specific point in the land. Even without a personal story, it holds significance. It helps define space and inheritance. Bohan reflects how names can anchor geography.`,
  },
  {
    term: "Casuph",
    notes: `Casuph is mentioned among returning exiles. His name connects to a group coming back to rebuild. Returning required leaving comfort behind. It showed commitment to restoration. Casuph reflects those who chose rebuilding over ease.`,
  },
  {
    term: "Chelub",
    notes: `Chelub appears in genealogical records within Judah's line. His name contributes to the continuation of a tribe. Even small mentions preserve identity. He represents a link in a larger chain. Chelub reflects generational continuity.`,
  },
  {
    term: "Chenaanah",
    notes: `Chenaanah is associated with false prophecy. He spoke words that aligned with what people wanted to hear. This made him popular but not truthful. His role shows how influence can mislead. Chenaanah reflects the danger of choosing approval over truth.`,
  },
  {
    term: "Cushan-Rishathaim",
    notes: `Cushan-Rishathaim was a king who oppressed Israel. His rule brought suffering during the time of Judges. He held power for a period before being defeated. His story shows cycles of oppression and deliverance. Cushan-Rishathaim reflects consequences of disobedience.`,
  },
  {
    term: "Cuthah",
    notes: `Cuthah refers to a place tied to foreign settlers. People from this region were brought into Samaria. They brought different beliefs with them. This influenced the culture of the land. Cuthah reflects mixture of traditions and belief systems.`,
  },
  {
    term: "Dathan",
    notes: `Dathan was one of the leaders who rebelled against Moses. He challenged the authority that God had established. His rebellion was not quiet, it was public. He faced immediate judgment for his actions. Dathan reflects what happens when pride leads to resistance.`,
  },
  {
    term: "Dodavah",
    notes: `Dodavah was a prophet who spoke against King Jehoshaphat. He warned that the king's alliance was wrong. His message was not popular but it was true. He stood firm even when it was uncomfortable. Dodavah reflects courage in speaking truth.`,
  },
  {
    term: "Dumah",
    notes: `Dumah is a descendant of Ishmael and also a region name. It connects to early tribal expansion. Names like this show how people groups developed. Even without detailed stories, they matter. Dumah reflects the spread of nations.`,
  },
  {
    term: "Ebed (Gaal's father)",
    notes: `Ebed is known as the father of Gaal. His name is connected to a rebellion against leadership. Even though he is not central, his family line is. This shows how influence passes down. Ebed reflects generational impact in conflict.`,
  },
  {
    term: "Elijah",
    notes: `Elijah is one of the most powerful prophets in the Bible. He confronted false worship and stood against kings. He called down fire and showed God's authority clearly. His life was bold and direct. Elijah reflects fearless commitment to truth.`,
  },
  {
    term: "Elishua",
    notes: `Elishua is one of King David's sons. He was part of the growing royal family in Jerusalem. Even without a detailed story, his place matters. He represents continuation of David's line. Elishua reflects family expansion in leadership.`,
  },
  {
    term: "Enan",
    notes: `Enan is known as the father of a tribal leader. His name connects to organization in the wilderness. Leadership often came through family lines. Even indirect roles carried weight. Enan reflects influence behind leadership.`,
  },
  {
    term: "Eran",
    notes: `Eran is a descendant of Ephraim. His name appears in tribal records. It connects to the growth of a people group. These records preserve identity. Eran reflects generational expansion.`,
  },
  {
    term: "Eshcol",
    notes: `Eshcol was an ally of Abraham. He joined Abraham in battle and supported him. His name is also tied to a fertile valley. He represents partnership and alliance. Eshcol reflects strength through cooperation.`,
  },
  {
    term: "Evil-Merodach",
    notes: `Evil-Merodach was a Babylonian king. He showed kindness by releasing King Jehoiachin. His decision changed the condition of a captive king. Even small actions can shift outcomes. Evil-Merodach reflects unexpected mercy.`,
  },
  {
    term: "Gaba",
    notes: `Gaba is associated with a place or family name. It connects to territorial identity. Locations in the Bible often hold meaning. They mark where events happened. Gaba reflects the importance of place.`,
  },
  {
    term: "Gamul",
    notes: `Gamul was part of a priestly division. He served in temple rotation. His role helped maintain worship structure. Even smaller roles were essential. Gamul reflects order in service.`,
  },
  {
    term: "Gatam",
    notes: `Gatam is part of the Edomite lineage. He is connected to the descendants of Esau. His name reflects expansion of that line. These names preserve history. Gatam reflects generational identity.`,
  },
  {
    term: "Gur-Baal",
    notes: `Gur-Baal is a region mentioned in connection with conflict. It was defeated during a king's campaign. The place represents opposition that was overcome. It shows how land and power were connected. Gur-Baal reflects territorial conflict.`,
  },
  {
    term: "Haddad",
    notes: `Haddad was an Edomite leader who opposed Israel. He fled and later returned with intent to resist. His story shows persistence in opposition. He represents ongoing resistance. Haddad reflects long-term conflict.`,
  },
  {
    term: "Harum",
    notes: `Harum is a lesser known name in genealogical records. His mention connects him to a larger family structure. Even without detail, his name is preserved. This shows that every person is counted. Harum reflects quiet inclusion in history.`,
  },
  {
    term: "Hazael",
    notes: `Hazael became king of Aram after taking power. He was known for being aggressive toward Israel. His actions brought pressure and conflict over time. He ruled with strength but also with harshness. Hazael reflects how power can be used destructively.`,
  },
  {
    term: "Hepher",
    notes: `Hepher is a name tied to tribal inheritance. His descendants received land as part of Israel's division. This connects him to identity and territory. Even without a story, his place matters. Hepher reflects how land and lineage connect.`,
  },
  {
    term: "Herod",
    notes: `Herod was a ruler during the time of Jesus' birth. He held power under Roman authority. He was known for fear and control, even killing children to protect his throne. His leadership was driven by insecurity. Herod reflects how power without trust leads to destruction.`,
  },
  {
    term: "Heth",
    notes: `Heth is an ancestor of the Hittites. His descendants became a known people group in Canaan. This shows how one name can lead to a nation. Heth represents early expansion of families. He reflects the beginnings of cultural identity.`,
  },
  {
    term: "Hiel",
    notes: `Hiel rebuilt the city of Jericho. He ignored the warning that rebuilding it would bring loss. As a result, he lost his sons. His story shows the cost of ignoring truth. Hiel reflects the consequences of disobedience.`,
  },
  {
    term: "Ibri",
    notes: `Ibri appears in genealogical records. His name connects him to a family line. Even without details, his role matters. He is part of a larger structure. Ibri reflects the importance of lineage.`,
  },
  {
    term: "Irnahash",
    notes: `Irnahash is a lesser known name in Judah's genealogy. His mention preserves his place in history. Even without a story, he belongs in the record. He connects generations together. Irnahash reflects quiet continuity.`,
  },
  {
    term: "Ishbi-Benob",
    notes: `Ishbi-Benob was a giant warrior. He attempted to kill David in battle. He represented physical strength and threat. But he was defeated. Ishbi-Benob reflects that even strong opposition can fall.`,
  },
  {
    term: "Ishpah",
    notes: `Ishpah is part of Benjamin's lineage. His name connects to a tribe and identity. These genealogies preserve structure. Even without narrative, they matter. Ishpah reflects generational connection.`,
  },
  {
    term: "Ishui",
    notes: `Ishui was one of Saul's sons. He belonged to the early royal family. His life connects to the rise of Israel's monarchy. Even without major events, his position matters. Ishui reflects being part of a significant moment in history.`,
  },
  {
    term: "Jaazaniah",
    notes: `Jaazaniah was involved in practices that went against God. He appears in a vision connected to hidden idolatry. His actions showed that corruption can exist beneath the surface. He was part of leadership yet still misled. Jaazaniah reflects hidden compromise.`,
  },
  {
    term: "Jacob",
    notes: `Jacob is one of the central patriarchs of Israel. He was later renamed Israel after wrestling with God. His life included struggle, growth, and transformation. He became the father of the twelve tribes. Jacob reflects change through encounter with God.`,
  },
  {
    term: "Jahaziel",
    notes: `Jahaziel was a prophet who encouraged trust in God. He spoke during a moment of fear before battle. His message was clear: God would fight for them. He helped shift focus from fear to faith. Jahaziel reflects confidence in God's power.`,
  },
  {
    term: "Jahdiel",
    notes: `Jahdiel was a leader among the tribe of Gad. He helped organize and guide his people. Leadership required both strength and responsibility. Even without detailed actions, his role mattered. Jahdiel reflects structured tribal leadership.`,
  },
  {
    term: "Jalam",
    notes: `Jalam is a descendant of Esau. His name connects to the Edomite lineage. These lines show how nations formed. Even without story, identity is preserved. Jalam reflects expansion of a family line.`,
  },
  {
    term: "Jarha",
    notes: `Jarha was an Egyptian servant who became part of Judah's family. He married into the household and continued the line. His story shows movement between cultures. He became part of something larger. Jarha reflects inclusion beyond origin.`,
  },
  {
    term: "Jashar",
    notes: `Jashar is referenced as part of an ancient book. It was a source of poetic or historical record. Its mention shows that other writings existed. Even if not preserved, it mattered at the time. Jashar reflects lost records of history.`,
  },
  {
    term: "Jashubi-Lehem",
    notes: `Jashubi-Lehem is a rare and obscure name. It appears in genealogical listings. Even uncommon names are recorded. This shows the importance of identity. Jashubi-Lehem reflects preservation of lineage.`,
  },
  {
    term: "Jerijah",
    notes: `Jerijah was a Levite in charge of responsibilities. He oversaw duties related to temple service. His role required organization and trust. He helped maintain structure. Jerijah reflects leadership in service.`,
  },
  {
    term: "Jesse",
    notes: `Jesse is the father of King David. He lived in Bethlehem and raised a large family. David was the youngest and least expected. Jesse's household became central to Israel's future. Jesse reflects how greatness can come from unexpected places.`,
  },
  {
    term: "Jezebel",
    notes: `Jezebel was a queen who promoted Baal worship. She influenced her husband Ahab toward evil. She opposed God's prophets. Her actions led to judgment. Jezebel reflects manipulation and corruption in leadership.`,
  },
  {
    term: "Jezrahiah",
    notes: `Jezrahiah is a leader among returning exiles. He helped guide people back into the land. His role supported restoration. Even lesser-known leaders played a part. Jezrahiah reflects rebuilding leadership.`,
  },
  {
    term: "Joha",
    notes: `Joha appears in the tribe of Benjamin. His name connects him to a larger family group. Even without detail, he holds a place. He contributes to continuity. Joha reflects identity through lineage.`,
  },
  {
    term: "John the Baptist",
    notes: `John the Baptist prepared the way for Jesus. He called people to repentance. He lived simply and spoke boldly. He pointed others away from himself toward Christ. John reflects clarity of purpose and humility.`,
  },
  {
    term: "Joiakim",
    notes: `Joiakim served as a high priest after exile. He helped restore religious structure. His leadership connected past and future. He maintained order in worship. Joiakim reflects restoration of spiritual leadership.`,
  },
  {
    term: "Joiarib",
    notes: `Joiarib was part of a priestly division serving in the temple. His role was scheduled within a rotation system. This structure kept worship consistent and organized. Even though he is not a major figure, his position mattered. Joiarib reflects order and discipline in spiritual service.`,
  },
  {
    term: "Joshaviah",
    notes: `Joshaviah appears in genealogical records within Israel. His name connects him to a tribal family line. Even without a story, his inclusion is intentional. He represents continuity across generations. Joshaviah reflects the importance of preserving identity.`,
  },
  {
    term: "Joshua",
    notes: `Joshua was the leader who succeeded Moses. He led Israel into the Promised Land. His leadership required courage and obedience. He followed God's direction closely. Joshua reflects faith in action and strong leadership.`,
  },
  {
    term: "Karkas",
    notes: `Karkas was an official in the Persian royal court. He served under King Xerxes during Esther's time. His role was part of a structured system. Even small officials contributed to larger events. Karkas reflects how minor roles still matter in big moments.`,
  },
  {
    term: "Keren-Happuch",
    notes: `Keren-Happuch was one of Job's daughters. She was born after Job's restoration. Her name reflects beauty and blessing. She represents the new season after suffering. Keren-Happuch reflects restoration and renewed favor.`,
  },
  {
    term: "Lebaoth",
    notes: `Lebaoth is a place name within Judah's territory. It marks a location tied to inheritance. Places like this define boundaries and identity. Even without events, they matter geographically. Lebaoth reflects how land connects to belonging.`,
  },
  {
    term: "Lo-Ammi",
    notes: `Lo-Ammi means "not my people." It was a symbolic name given through prophecy. It represented broken relationship with God. The name carried a strong message. Lo-Ammi reflects separation caused by disobedience.`,
  },
  {
    term: "Lo-Ruhamah",
    notes: `Lo-Ruhamah means "no mercy." It was another symbolic prophetic name. It showed a season where compassion was withdrawn. The name carried weight and warning. Lo-Ruhamah reflects the seriousness of rejection.`,
  },
  {
    term: "Lud",
    notes: `Lud is a descendant of Shem. His name connects to the formation of early nations. He represents the spread of people groups. Even without a detailed story, his role is foundational. Lud reflects expansion of humanity.`,
  },
  {
    term: "Maaseiah",
    notes: `Maaseiah is a common name among priests and leaders. Several individuals carried this name across different roles. It appears in both leadership and service contexts. This shows how names repeat across generations. Maaseiah reflects shared identity across different roles.`,
  },
  {
    term: "Magor-Missabib",
    notes: `Magor-Missabib means "terror on every side." It was a symbolic name given by the prophet Jeremiah. It described a condition of fear and judgment. The name itself carried a message. Magor-Missabib reflects the weight of prophetic warning.`,
  },
  {
    term: "Maher-Shalal-Hash-Baz",
    notes: `Maher-Shalal-Hash-Baz was the son of Isaiah. His name was a prophetic message meaning quick judgment. It symbolized coming events. Even his name carried meaning. He reflects how God uses signs to communicate.`,
  },
  {
    term: "Merib-Baal",
    notes: `Merib-Baal is another name for Mephibosheth. He was the son of Jonathan. He lived with a disability but was shown kindness by David. His life reflects restoration despite weakness. Merib-Baal shows grace extended beyond expectation.`,
  },
  {
    term: "Merodach-Baladan",
    notes: `Merodach-Baladan was a king of Babylon. He reached out to Judah during Hezekiah's reign. His visit exposed pride in Hezekiah. It led to future consequences. Merodach-Baladan reflects how outside attention can test integrity.`,
  },
  {
    term: "Ner",
    notes: `Ner was the father of Abner and part of Saul's family. He connects directly to Israel's early monarchy. His lineage played a role in leadership structure. Even if not central, his influence is clear. Ner reflects the roots behind authority.`,
  },
  {
    term: "Nergal-Sharezer",
    notes: `Nergal-Sharezer was a Babylonian official. He was present during the fall of Jerusalem. His role shows involvement in major events. Foreign leaders shaped outcomes as well. Nergal-Sharezer reflects external power in judgment.`,
  },
  {
    term: "On",
    notes: `On is an Egyptian city, also known as Heliopolis. It was a center of influence and culture. Joseph's wife came from this region. It connects Egypt to Israel's story. On reflects cultural interaction.`,
  },
  {
    term: "Parnach",
    notes: `Parnach was the father of a tribal leader. His name appears during land division. It connects him to inheritance structure. Even indirect roles carry meaning. Parnach reflects background influence.`,
  },
  {
    term: "Pasach",
    notes: `Pasach appears in Judah's genealogical line. His name connects to a broader family structure. These names preserve identity across time. Even without events, they matter. Pasach reflects continuity in lineage.`,
  },
  {
    term: "Paul",
    notes: `Paul was a major apostle in the New Testament. He spread the message beyond Israel. He traveled extensively and wrote many letters. His life shifted from opposition to leadership. Paul reflects transformation and mission.`,
  },
  {
    term: "Pinon",
    notes: `Pinon was an Edomite chief. He belonged to the descendants of Esau. His role shows leadership in another nation. He represents structure outside Israel. Pinon reflects parallel leadership systems.`,
  },
  {
    term: "Pul",
    notes: `Pul was a king of Assyria. He is also known as Tiglath-Pileser. He played a role in Israel's captivity. His power affected the region. Pul reflects the rise of empires.`,
  },
  {
    term: "Queen of Sheba",
    notes: `The Queen of Sheba visited Solomon. She came to test his wisdom. She was impressed by what she saw. Her visit showed global recognition. She reflects curiosity and pursuit of wisdom.`,
  },
  {
    term: "Rezon",
    notes: `Rezon became an adversary to Israel. He established control in Damascus. He opposed Solomon's reign. His actions created ongoing tension. Rezon reflects resistance from surrounding powers.`,
  },
  {
    term: "Romamti-Ezer",
    notes: `Romamti-Ezer was a musician in temple service. He served under the leadership of Asaph. His role contributed to worship. Even musicians had structured responsibility. Romamti-Ezer reflects organized worship roles.`,
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
