import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Tob-Adonijah",
    notes: `Tob-Adonijah is a lesser known figure mentioned in genealogical or regional context. In the Bible, names like this often show up to track lineage or leadership ties. Even if there is not a full story, the name still connects to a bigger picture. People like Tob-Adonijah remind you that not every person had a spotlight moment. But they were still part of what God was doing. His name reflects that history is built through many individuals, not just the main characters.`,
  },
  {
    term: "Tubal-Cain",
    notes: `Tubal-Cain is one of the earliest recorded craftsmen in the Bible. He is known for working with bronze and iron, which means he helped develop tools and weapons. This shows that skill and innovation were present very early in human history. His role highlights how people shaped culture through their abilities. Tubal-Cain represents creativity, progress, and human advancement.`,
  },
  {
    term: "Uzzen-Sherah",
    notes: `Uzzen-Sherah appears in a genealogical context tied to the tribe of Ephraim. The name itself shows connection to a family line that continued through generations. Even though little is said, the mention still matters. It shows that every name is part of a larger story. Uzzen-Sherah reflects continuity and generational identity.`,
  },
  {
    term: "Zaphnath-Paaneah",
    notes: `Zaphnath-Paaneah is the name given to Joseph in Egypt. It was given by Pharaoh after Joseph rose to power. This name marks a major shift in Joseph's life from prisoner to ruler. It shows how identity can change depending on position and purpose. Even with a new name, Joseph still remained who God called him to be.`,
  },
  {
    term: "Abiel (Kish's father)",
    notes: `Abiel is the grandfather of King Saul. His name places him in the early royal family line of Israel. Even though he is not a main character, his position matters. Without Abiel, that line would not exist. He represents the foundation behind leadership.`,
  },
  {
    term: "Abinadab (Jesse's son)",
    notes: `Abinadab is one of David's older brothers. He was present when Samuel came to anoint a king. At first, he looked like a strong candidate. But God chose David instead. Abinadab shows that appearance is not what God looks at.`,
  },
  {
    term: "Abinoam (Barak's father)",
    notes: `Abinoam is the father of Barak, a military leader in Israel. His name connects him to a line of leadership and action. Even if he is not in the battle story, his role still matters. He raised someone who played a key role in Israel's deliverance. Abinoam reflects generational influence.`,
  },
  {
    term: "Abishai (David's nephew)",
    notes: `Abishai is one of David's most loyal warriors. He fought in battles and stayed close to David through conflict. He was bold and sometimes aggressive. But his loyalty never wavered. Abishai shows what it looks like to stand with someone no matter what.`,
  },
  {
    term: "Abishua (Aaron's grandson)",
    notes: `Abishua is part of the priestly line through Aaron. His role connects to spiritual leadership. He carried on the responsibility of the priesthood. Even without a detailed story, his position is important. Abishua represents continuation of sacred duty.`,
  },
  {
    term: "Abital (David's wife)",
    notes: `Abital is one of King David's wives. She is not heavily mentioned, but she is part of his family. Her presence shows the complexity of David's household. Even lesser mentioned people still played a role. Abital reflects the background structure of royal life.`,
  },
  {
    term: "Abiud (Jesus' ancestor)",
    notes: `Abiud is listed in the genealogy of Jesus. His name connects directly to the lineage leading to Christ. Even without a story, his position matters greatly. He is part of a line that leads to fulfillment of prophecy. Abiud represents quiet but important legacy.`,
  },
  {
    term: "Absalom (David's son)",
    notes: `Absalom is one of David's sons who rebelled against him. He tried to take the throne and turned people against David. He was known for his appearance and influence. But his pride led to downfall. Absalom shows how rebellion destroys relationships.`,
  },
  {
    term: "Achzib (place/person)",
    notes: `Achzib is both a place name and possibly connected to people. Locations in the Bible often carry meaning tied to events. Even if it seems small, it still fits into the bigger map. Places help tell the story of movement and territory. Achzib reflects how geography connects to history.`,
  },
  {
    term: "Adalia (Haman's son)",
    notes: `Adalia is one of Haman's sons in the book of Esther. He was part of the group that was judged after Haman's fall. His story shows how actions affect families. He did not escape the consequences tied to his father. Adalia reflects how judgment can extend beyond one person.`,
  },
  {
    term: "Adbeel (Ishmael's son)",
    notes: `Adbeel is one of the sons of Ishmael. His name connects to the spread of tribes outside Israel. These names show how nations formed over time. Even outside the main storyline, they matter. Adbeel reflects expansion and lineage.`,
  },
  {
    term: "Addi (Jesus' ancestor)",
    notes: `Addi is another name in the genealogy of Jesus. He represents a link in the chain leading to Christ. Even though little is said, his role is crucial. Every generation connects to the next. Addi reflects the importance of continuity.`,
  },
  {
    term: "Adlai (Shaphat's father)",
    notes: `Adlai is known as the father of Shaphat. His role is mostly genealogical. He represents a link between generations. Even without a story, his place matters. Adlai reflects how identity is passed down.`,
  },
  {
    term: "Adonijah (David's son)",
    notes: `Adonijah tried to become king before Solomon. He acted on ambition without God's direction. At first, things seemed to go his way. But his plan failed. Adonijah shows the danger of self promotion.`,
  },
  {
    term: "Adoni-Zedek (king)",
    notes: `Adoni-Zedek was a Canaanite king. He fought against Israel during conquest. He tried to resist but was defeated. His story shows that opposition could not stop God's plan. Adoni-Zedek reflects resistance against divine direction.`,
  },
  {
    term: "Agur (Lemuel's father)",
    notes: `Agur is associated with wisdom sayings. His name appears in connection to Proverbs. He reflects a voice of understanding. His words focus on humility and truth. Agur shows that wisdom can come from unexpected places.`,
  },
  {
    term: "Ahashbai (son of Ben-Geber)",
    notes: `Ahashbai is part of a family tied to administration. Names like his appear in records of leadership. They show structure in the kingdom. Even if not famous, their role mattered. Ahashbai reflects organization behind leadership.`,
  },
  {
    term: "Ahban (Abishur's son)",
    notes: `Ahban appears in genealogical records. His name connects him to a family line. These records preserve identity. They show continuity over time. Ahban reflects the importance of lineage.`,
  },
  {
    term: "Ahikam (Shaphan's son)",
    notes: `Ahikam protected the prophet Jeremiah. He stood up when others turned against truth. His actions showed courage and loyalty. He helped preserve a message from God. Ahikam reflects standing for what is right.`,
  },
  {
    term: "Ahimaaz (Zadok's son)",
    notes: `Ahimaaz was known for delivering messages quickly. He ran to bring news to King David. His speed and eagerness stand out. Even when not chosen first, he still wanted to serve. Ahimaaz reflects passion and dedication.`,
  },
  {
    term: "Ahinadab (Iddo's son)",
    notes: `Ahinadab was part of Solomon's administration. He helped manage provision for the kingdom. His role was structured and important. He ensured systems functioned properly. Ahinadab reflects responsibility behind leadership.`,
  },
  {
    term: "Ahinoam (David's wife)",
    notes: `Ahinoam was one of David's wives and the mother of Amnon. Her name shows up in the middle of David's complicated family structure. She was part of the royal household during a time of growth and tension. Even though she is not a main focus, her position mattered. Ahinoam reflects how family dynamics shaped David's story.`,
  },
  {
    term: "Ahio (Uzzah's brother)",
    notes: `Ahio helped transport the Ark of the Covenant. He walked alongside it while it was being moved. His role was close to something sacred. Even though Uzzah is remembered more, Ahio was there too. Ahio reflects how proximity to holiness still requires awareness.`,
  },
  {
    term: "Ahlai (Sheshan's daughter)",
    notes: `Ahlai is one of the few women listed in a genealogy. Her mention stands out because most names are male. She represents continuation of a family line. Her inclusion shows that every person counted. Ahlai reflects how even small mentions carry meaning.`,
  },
  {
    term: "Almodad (Joktan's son)",
    notes: `Almodad is part of the early post-flood generations. His name connects to the spread of people across the earth. These genealogies show how nations formed. Even without a story, his place matters. Almodad reflects expansion and early human history.`,
  },
  {
    term: "Amalek (Esau's grandson)",
    notes: `Amalek became the ancestor of a major enemy of Israel. His line opposed God's people repeatedly. This shows how one lineage can carry long-term impact. The Amalekites became known for hostility. Amalek reflects how conflict can pass through generations.`,
  },
  {
    term: "Amariah (Zedekiah's son)",
    notes: `Amariah is part of a royal or priestly line. His name connects him to leadership structures. Even without detail, he represents continuity. He carries forward a family legacy. Amariah reflects generational responsibility.`,
  },
  {
    term: "Amasa (Absalom's general)",
    notes: `Amasa was appointed as a military leader by Absalom. He later served under David as well. His position shifted depending on leadership. He played a role in conflict and power struggles. Amasa reflects how leadership can change quickly.`,
  },
  {
    term: "Ammihur (Ahaz's father)",
    notes: `Ammihur is a genealogical figure tied to leadership. Names like his show how lines are traced. Even without story, they matter. They connect generations together. Ammihur reflects continuity in family identity.`,
  },
  {
    term: "Ammizabad (Benaiah's son)",
    notes: `Ammizabad follows a strong warrior lineage. His father Benaiah was a known fighter. This places him in a family of strength. He represents continuation of that reputation. Ammizabad reflects inherited identity.`,
  },
  {
    term: "Amnon (David's son)",
    notes: `Amnon is known for a serious and destructive sin. His actions caused deep division in David's family. He acted on impulse without restraint. His story led to consequences that spread. Amnon reflects how one decision can damage everything.`,
  },
  {
    term: "Amoz (Isaiah's father)",
    notes: `Amoz is the father of the prophet Isaiah. His significance comes through his son's calling. He represents the background behind a major voice. Even without details, his role matters. Amoz reflects how influence can come through family.`,
  },
  {
    term: "Amram (Moses' father)",
    notes: `Amram is the father of Moses, Aaron, and Miriam. He raised a family that would shape Israel's future. His household carried leadership and calling. Even without a spotlight, his impact is massive. Amram reflects foundational influence.`,
  },
  {
    term: "Anah (Zibeon's daughter)",
    notes: `Anah is a rare female listed in genealogies. Her mention stands out in a male-dominated list. She is part of Edomite lineage. Even small mentions preserve identity. Anah reflects inclusion in the record.`,
  },
  {
    term: "Ananiah (place/priest)",
    notes: `Ananiah refers to either a location or a priestly figure. Names like this show overlap between place and people. They connect geography with identity. It reflects how records preserve context. Ananiah shows structure in history.`,
  },
  {
    term: "Antipater (Herod's father)",
    notes: `Antipater was the father of Herod the Great. He played a role in political positioning. His influence helped elevate his son. This shows how power can be passed down. Antipater reflects behind-the-scenes influence.`,
  },
  {
    term: "Aphiah (Bichri's ancestor)",
    notes: `Aphiah is part of Saul's extended family line. He connects generations leading to leadership. These names show continuity. They preserve identity across time. Aphiah reflects generational roots.`,
  },
  {
    term: "Ara (Jether's son)",
    notes: `Ara is another genealogical figure. His role is mainly to connect family lines. Even without detail, his name matters. He is part of a bigger structure. Ara reflects continuity.`,
  },
  {
    term: "Aram (Shem's son)",
    notes: `Aram is one of the sons of Shem. He becomes the ancestor of the Arameans. His name connects to an entire people group. This shows how nations begin. Aram reflects expansion from early humanity.`,
  },
  {
    term: "Aran (Seir's son)",
    notes: `Aran is part of Edomite lineage. His name connects to a tribal group. These records show family expansion. Even minor names carry identity. Aran reflects structure in lineage.`,
  },
  {
    term: "Archelaus (Herod's son)",
    notes: `Archelaus ruled after Herod the Great. His leadership was unstable and harsh. He struggled to maintain control. This led to changes in governance. Archelaus reflects flawed leadership.`,
  },
  {
    term: "Ardon (Caleb's son)",
    notes: `Ardon is part of Caleb's family. Caleb was known for faith and courage. This places Ardon in a strong legacy. Even without a story, that connection matters. Ardon reflects inherited reputation.`,
  },
  {
    term: "Aridai (Haman's son)",
    notes: `Aridai was one of Haman's sons. He was executed after Haman's downfall. His fate was tied to his father's actions. This shows generational consequence. Aridai reflects shared judgment.`,
  },
  {
    term: "Aridatha (Haman's son)",
    notes: `Aridatha is another son of Haman. He also faced the same outcome. His story shows that actions ripple outward. Family can be affected by one person's decisions. Aridatha reflects collective consequence.`,
  },
  {
    term: "Armoni (Saul's son)",
    notes: `Armoni was a son of King Saul. He was executed due to Saul's past actions. This shows how leadership choices carry weight. The consequences extended beyond Saul himself. Armoni reflects inherited outcome.`,
  },
  {
    term: "Arnan (Zerubbabel's son)",
    notes: `Arnan is part of the post-exile lineage. He connects to rebuilding after captivity. His name reflects continuation after hardship. It shows restoration over time. Arnan reflects rebuilding generations.`,
  },
  {
    term: "Arni (Rhesa's son)",
    notes: `Arni appears in the genealogy recorded in Luke's account. His name connects one generation to the next in the line leading to Jesus. Even without a personal story, his placement matters for continuity. He represents a link that keeps the lineage intact. Arni reflects how every generation carries the promise forward.`,
  },
  {
    term: "Asahel (David's nephew)",
    notes: `Asahel was one of David's nephews and a skilled warrior. He was known for his speed, able to run swiftly in battle. He pursued Abner but underestimated the danger. That decision cost him his life. Asahel reflects courage mixed with impulsiveness.`,
  },
  {
    term: "Asenath (Joseph's wife)",
    notes: `Asenath was the Egyptian wife of Joseph. She became the mother of Ephraim and Manasseh. Her life connects Egyptian culture with Israel's future. She stood alongside Joseph during his rise to power. Asenath reflects how God works across different backgrounds.`,
  },
  {
    term: "Ashkenaz (Gomer's son)",
    notes: `Ashkenaz is listed among early descendants after the flood. He became the ancestor of a people group. His name shows how nations spread over time. Even without narrative detail, his role is foundational. Ashkenaz reflects expansion of humanity.`,
  },
  {
    term: "Ashtaroth (goddess/place)",
    notes: `Ashtaroth refers to both a location and a false goddess. It represents worship outside of God's command. The name appears where idolatry influenced people. It shows how culture shaped belief systems. Ashtaroth reflects misplaced devotion.`,
  },
  {
    term: "Aspatha (Haman's son)",
    notes: `Aspatha was one of Haman's sons. He was judged after Haman's plot failed. His outcome was tied to his father's actions. This shows how consequences can affect a whole household. Aspatha reflects shared judgment.`,
  },
  {
    term: "Asshur (Shem's son)",
    notes: `Asshur was one of the sons of Shem. He became the ancestor of the Assyrian people. His name connects to a major empire in history. This shows how early families grew into nations. Asshur reflects the foundation of powerful kingdoms.`,
  },
  {
    term: "Attai (Judahite)",
    notes: `Attai appears in the genealogy of Judah's line. He is not a major figure, but his name is preserved. His inclusion shows continuity in the tribe. Each name contributes to the larger story. Attai reflects the importance of lineage.`,
  },
  {
    term: "Azaliah (Shaphan's father)",
    notes: `Azaliah is known as the father of Shaphan. Shaphan played a role in reading the Book of the Law. This connection shows how influence passes through families. Even without direct action, Azaliah's place matters. He reflects generational impact.`,
  },
  {
    term: "Azariah (king/prince)",
    notes: `Azariah is a name shared by several leaders. Some were kings, others were priests. Each carried authority and responsibility. Their actions influenced the direction of the people. Azariah reflects leadership under God's authority.`,
  },
  {
    term: "Azel (Saul's descendant)",
    notes: `Azel appears in the extended genealogy of Saul's family. His name shows the continuation of the royal line. Even after Saul, the lineage remained recorded. This preserves identity over time. Azel reflects legacy beyond leadership.`,
  },
  {
    term: "Azor (Jesus' ancestor)",
    notes: `Azor is listed in the genealogy leading to Jesus. He represents a link in the Messianic line. Even without a detailed story, his role is significant. Every generation moves the promise forward. Azor reflects quiet importance.`,
  },
  {
    term: "Azubah (Caleb's wife)",
    notes: `Azubah was one of Caleb's wives. She is part of the family that inherited land. Her role connects her to a strong legacy. Even without detailed events, she belongs in the story. Azubah reflects family structure.`,
  },
  {
    term: "Bariah (Shemaiah's son)",
    notes: `Bariah is a descendant within temple-related lineage. His name appears among those connected to service. Even minor names show organization and continuity. They reflect structured roles. Bariah represents preserved identity.`,
  },
  {
    term: "Bashan (place/king)",
    notes: `Bashan refers to a region and its ruler. It was known for strength and fertile land. The king of Bashan opposed Israel. The land became part of Israel's inheritance. Bashan reflects both opposition and provision.`,
  },
  {
    term: "Bathsheba (David's wife)",
    notes: `Bathsheba became the wife of King David. Her story begins in controversy but leads to restoration. She became the mother of Solomon. Her life shows both failure and redemption. Bathsheba reflects transformation through grace.`,
  },
  {
    term: "Bechorath (Saul's ancestor)",
    notes: `Bechorath is part of Saul's family line. His name connects generations before the monarchy. It shows how leadership roots go back. Even unseen figures shape the future. Bechorath reflects ancestral foundation.`,
  },
  {
    term: "Beeri (Hosea's father)",
    notes: `Beeri is the father of the prophet Hosea. His significance comes through his son's calling. He represents the background behind prophetic voice. Even without details, his role matters. Beeri reflects generational influence.`,
  },
  {
    term: "Ben-Abinadab (official)",
    notes: `Ben-Abinadab served as an official under Solomon. He was responsible for a specific region. His role supported the kingdom's structure. Administration was key to stability. Ben-Abinadab reflects organized leadership.`,
  },
  {
    term: "Ben-Ammi (Moabite ancestor)",
    notes: `Ben-Ammi is the ancestor of the Ammonites. His origin comes from Lot's family line. His descendants became a neighboring nation. This shows how one person can start a people group. Ben-Ammi reflects generational origin.`,
  },
  {
    term: "Ben-Deker (official)",
    notes: `Ben-Deker was another official under Solomon. He provided resources for the royal court. His role shows how systems were maintained. Even behind the scenes, leadership matters. Ben-Deker reflects provision and structure.`,
  },
  {
    term: "Ben-Geber (official)",
    notes: `Ben-Geber oversaw supplies for the kingdom. His work ensured daily needs were met. He played a part in keeping the system running. Without roles like his, leadership would fail. Ben-Geber reflects support systems.`,
  },
  {
    term: "Ben-Hadad (king)",
    notes: `Ben-Hadad was a king of Aram. He often opposed Israel in battle. His actions created ongoing conflict. He represents foreign power against God's people. Ben-Hadad reflects opposition.`,
  },
  {
    term: "Ben-Hail (official)",
    notes: `Ben-Hail is another administrative figure. His role helped manage resources and people. Even if not highlighted, his work mattered. He contributed to order. Ben-Hail reflects structure behind leadership.`,
  },
  {
    term: "Ben-Hesed (official)",
    notes: `Ben-Hesed served under Solomon as well. He was responsible for a region's provision. His work kept systems functioning smoothly. He represents consistent leadership. Ben-Hesed reflects reliability.`,
  },
  {
    term: "Ben-Oni (Benjamin)",
    notes: `Ben-Oni was the original name given to Benjamin at birth. His mother Rachel named him "son of my sorrow" during a painful moment. Jacob later changed his name to Benjamin, meaning "son of the right hand." This shift shows how identity can be redefined. Ben-Oni reflects pain turned into purpose.`,
  },
  {
    term: "Ben-Zoheth (Simeonite)",
    notes: `Ben-Zoheth is listed among the descendants of Simeon. His name connects him to a specific tribal identity. These records preserve family structure over time. Even without a story, his place matters. Ben-Zoheth reflects continuity in lineage.`,
  },
  {
    term: "Beor (Balaam's father)",
    notes: `Beor is known as the father of Balaam. Balaam becomes a complex figure tied to prophecy. Beor's mention connects him to that narrative. Even background names still matter. Beor reflects how influence passes forward.`,
  },
  {
    term: "Berodach-Baladan (king)",
    notes: `Berodach-Baladan was a king of Babylon. He reached out to King Hezekiah with interest and alliance. His actions revealed political motives. He is part of a larger global interaction. Berodach-Baladan reflects strategic leadership.`,
  },
  {
    term: "Abner",
    notes: `Abner was the commander of Saul's army. He held significant power in Israel's early monarchy. After Saul's death, he tried to maintain control. His decisions shaped political shifts. Abner reflects influence and military authority.`,
  },
  {
    term: "Aharon",
    notes: `Aharon, or Aaron, was Moses' brother. He became the first high priest of Israel. He spoke on behalf of Moses before Pharaoh. His role connected leadership with worship. Aaron reflects mediation between God and people.`,
  },
  {
    term: "Ammishaddai",
    notes: `Ammishaddai was a tribal leader during Israel's journey. He represented his people in organization and order. Leaders like him kept structure in place. His role ensured unity within the camp. Ammishaddai reflects leadership in formation.`,
  },
  {
    term: "Congregation member",
    notes: `A congregation member is part of the gathered community. In the Bible, the congregation represents collective identity. Each person contributes to the whole. Membership carries responsibility. It reflects unity and belonging.`,
  },
  {
    term: "Guardian",
    notes: `A guardian protects and watches over others. In the Bible, guardianship reflects care and responsibility. It involves awareness and action. Guardians ensure safety. It reflects protection and trust.`,
  },
  {
    term: "Head of tribe",
    notes: `The head of a tribe is a leader over a people group. In the Bible, tribes had representatives. They made decisions and guided direction. Their leadership affected many. It reflects authority and responsibility.`,
  },
  {
    term: "Korach",
    notes: `Korach led a rebellion against Moses. He challenged established authority. His actions brought serious consequences. The rebellion ended in judgment. Korach reflects pride and resistance.`,
  },
  {
    term: "Korachite",
    notes: `Korachites are descendants of Korach. Despite their ancestor's rebellion, they later served in worship. They became singers and temple workers. This shows redemption beyond failure. Korachites reflect restoration of legacy.`,
  },
  {
    term: "Levitical assistant",
    notes: `A Levitical assistant helped priests in their duties. They handled tasks in the tabernacle. Their work supported worship systems. They operated behind the scenes. It reflects service and structure.`,
  },
  {
    term: "Merarite",
    notes: `Merarites were part of the tribe of Levi. They were responsible for transporting tabernacle structures. Their role required strength and precision. They supported sacred operations. Merarites reflect responsibility in service.`,
  },
  {
    term: "Messenger",
    notes: `A messenger delivers information. In the Bible, messages often carried urgency. Messengers connected leaders and events. Accuracy was essential. It reflects communication and responsibility.`,
  },
  {
    term: "Oholiab",
    notes: `Oholiab was a skilled craftsman. He worked alongside Bezalel in building the tabernacle. His abilities were given for a purpose. He contributed to sacred construction. Oholiab reflects gifted craftsmanship.`,
  },
  {
    term: "Shelumiel",
    notes: `Shelumiel was a leader of the tribe of Simeon. He helped organize the camp during the wilderness journey. His role ensured order. Leadership like his kept structure intact. Shelumiel reflects responsibility in leadership.`,
  },
  {
    term: "Standard bearer",
    notes: `A standard bearer carried a tribal banner. In the Bible, banners identified groups. They guided movement and position. They unified people in formation. It reflects identity and order.`,
  },
  {
    term: "Ammonite",
    notes: `An Ammonite is a descendant of Ben-Ammi. They became a neighboring nation to Israel. Often they were in conflict with God's people. They represent an opposing group. Ammonites reflect tension between nations.`,
  },
  {
    term: "Ancestor",
    notes: `An ancestor is someone who comes before in a family line. In the Bible, ancestors connect generations. They carry identity forward. Their actions influence the future. It reflects legacy and origin.`,
  },
  {
    term: "Anointed",
    notes: `An anointed person is chosen and set apart by God. In the Bible, kings and priests were anointed. Oil symbolized this act. It showed divine selection. It reflects purpose and calling.`,
  },
  {
    term: "Baal worshiper",
    notes: `A Baal worshiper follows a false god. In the Bible, this was a major source of conflict. It led people away from truth. It involved practices against God's commands. It reflects misplaced devotion.`,
  },
  {
    term: "Bride",
    notes: `A bride is a woman entering marriage. In the Bible, it symbolizes covenant relationship. It reflects commitment and union. The role carries meaning beyond the event. It reflects connection and promise.`,
  },
  {
    term: "Captive",
    notes: `A captive is someone taken and held. In the Bible, captivity often followed defeat. It removed freedom. It showed loss of control. It reflects bondage and consequence.`,
  },
  {
    term: "Daughter in law",
    notes: `A daughter in law joins a family through marriage. In the Bible, she becomes part of a new household. Her role connects two families. It involves adaptation and relationship. It reflects unity and transition.`,
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
