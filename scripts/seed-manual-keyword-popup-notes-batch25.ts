import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "father’s house",
    notes: `A father’s house represents family, origin, and identity. In the Bible, it often refers to lineage and belonging within a household structure. It is where values, authority, and inheritance begin. Leaving or returning to a father’s house carries meaning. It reflects heritage, covering, and foundation.`,
  },
  {
    term: "tumult",
    notes: `Tumult is loud confusion or disorder. In the Bible, it often describes chaos in crowds or battle. It shows lack of control and stability. Tumult can come from fear or conflict. It reflects unrest and disturbance.`,
  },
  {
    term: "turn away",
    notes: `To turn away means to reject or leave something behind. In the Bible, it often refers to turning from God or truth. It shows a shift in direction. Turning away has consequences. It reflects decision and separation.`,
  },
  {
    term: "village",
    notes: `A village is a small community. In the Bible, villages were places of daily life and interaction. They were less structured than cities. Villages reflect simplicity and connection. They show community living.`,
  },
  {
    term: "warrior",
    notes: `A warrior is someone trained for battle. In the Bible, warriors show strength, courage, and discipline. They act under leadership. Warriors face danger directly. It reflects readiness and action.`,
  },
  {
    term: "Enslavement",
    notes: `Enslavement is being forced into service. In the Bible, it represents oppression and lack of freedom. People were bound under control. Enslavement shows loss of choice. It reflects bondage and hardship.`,
  },
  {
    term: "Hand of God",
    notes: `The hand of God represents His power and action. In the Bible, it shows God actively working. It can bring blessing or judgment. The hand moves with purpose. It reflects authority and intervention.`,
  },
  {
    term: "Holy Ground",
    notes: `Holy ground is a place set apart for God. In the Bible, it requires reverence and awareness. It is not treated like ordinary space. God’s presence makes it holy. It reflects sacredness and respect.`,
  },
  {
    term: "Liberate",
    notes: `To liberate means to set free. In the Bible, liberation comes from God’s power. It removes oppression. It restores freedom. It reflects deliverance.`,
  },
  {
    term: "Locust",
    notes: `A locust is an insect that moves in swarms. In the Bible, locusts often represent destruction. They consume everything in their path. They show overwhelming force. It reflects judgment or devastation.`,
  },
  {
    term: "Mantle",
    notes: `A mantle is a covering or cloak. In the Bible, it can symbolize authority or calling. Passing a mantle represents transfer of role. It carries meaning beyond clothing. It reflects identity and responsibility.`,
  },
  {
    term: "Midnight",
    notes: `Midnight is the middle of the night. In the Bible, it often marks significant moments. It represents darkness or transition. Important events can happen suddenly. It reflects timing and turning points.`,
  },
  {
    term: "Pillar of Cloud",
    notes: `The pillar of cloud guided people by day. In the Bible, it showed God’s presence and direction. It provided covering and guidance. The cloud moved with purpose. It reflects leadership and protection.`,
  },
  {
    term: "Pillar of Fire",
    notes: `The pillar of fire guided people at night. In the Bible, it gave light in darkness. It showed God’s presence clearly. It brought direction when vision was limited. It reflects guidance and power.`,
  },
  {
    term: "Polished",
    notes: `Polished means refined and smooth. In the Bible, it reflects preparation and improvement. Something polished has been worked on. It shows effort and care. It reflects readiness and quality.`,
  },
  {
    term: "Refine",
    notes: `To refine means to purify. In the Bible, it is like removing impurities from metal. It involves pressure and heat. Refining produces something better. It reflects growth through testing.`,
  },
  {
    term: "Refiner",
    notes: `A refiner is one who purifies. In the Bible, God is described as a refiner. He removes what does not belong. Refining takes time and process. It reflects transformation.`,
  },
  {
    term: "Solemn",
    notes: `Solemn means serious and respectful. In the Bible, solemn moments are set apart. They require focus and reverence. It is not casual. It reflects importance.`,
  },
  {
    term: "Stone Tablets",
    notes: `Stone tablets were used to record law. In the Bible, they held God’s commands. They were durable and lasting. They showed permanence. It reflects authority and truth.`,
  },
  {
    term: "Thunder",
    notes: `Thunder is a loud sound from the sky. In the Bible, it often represents God’s voice or power. It creates fear and attention. Thunder is not quiet or subtle. It reflects authority and presence.`,
  },
  {
    term: "Vestment",
    notes: `A vestment is a special garment. In the Bible, priests wore specific clothing. It showed their role. It was not ordinary clothing. It reflects function and identity.`,
  },
  {
    term: "Wages",
    notes: `Wages are payment for work. In the Bible, they reflect what is earned. Work produces return. Wages show value of effort. It reflects exchange and outcome.`,
  },
  {
    term: "Workmanship",
    notes: `Workmanship is the quality of work. In the Bible, it reflects skill and design. Good workmanship shows care. It represents effort and ability. It reflects creation.`,
  },
  {
    term: "Zealous",
    notes: `Zealous means full of passion. In the Bible, it can be positive or negative. It shows strong commitment. Zeal drives action. It reflects intensity.`,
  },
  {
    term: "Ancestral",
    notes: `Ancestral refers to past generations. In the Bible, it connects people to their roots. It shows lineage. It carries identity. It reflects heritage.`,
  },
  {
    term: "Completion",
    notes: `Completion means finishing something fully. In the Bible, it reflects fulfillment of purpose. Nothing is left undone. It brings closure. It reflects accomplishment.`,
  },
  {
    term: "Craftsmanship",
    notes: `Craftsmanship is skilled creation. In the Bible, it reflects careful work. It shows ability and precision. It requires effort. It reflects excellence.`,
  },
  {
    term: "Crush",
    notes: `To crush means to break under pressure. In the Bible, it shows destruction or defeat. It can be forceful and final. Crushing removes resistance. It reflects power.`,
  },
  {
    term: "Drought",
    notes: `Drought is lack of rain. In the Bible, it brings hardship. It affects survival. Drought shows dependence on provision. It reflects scarcity.`,
  },
  {
    term: "Dwelling Place",
    notes: `A dwelling place is where someone lives. In the Bible, it can refer to God’s presence. It shows belonging. It creates stability. It reflects habitation.`,
  },
  {
    term: "Glorious",
    notes: `Glorious means full of splendor. In the Bible, it describes God’s nature. It is radiant and powerful. Glory draws attention. It reflects greatness.`,
  },
  {
    term: "Hearing",
    notes: `Hearing is receiving sound or message. In the Bible, hearing requires response. It connects to obedience. It reflects understanding. It shapes action.`,
  },
  {
    term: "Lawsuit",
    notes: `A lawsuit is a legal dispute. In the Bible, it represents judgment. It involves accusation and defense. It reflects justice. It shows accountability.`,
  },
  {
    term: "Majesty",
    notes: `Majesty is greatness in authority. In the Bible, it describes God’s presence. It commands respect. It reflects power. It shows honor.`,
  },
  {
    term: "Patriarchal",
    notes: `Patriarchal refers to father-led structure. In the Bible, families were often organized this way. It shaped authority. It reflects leadership roles. It shows order.`,
  },
  {
    term: "Powerful",
    notes: `Powerful means having strength or influence. In the Bible, power often comes from God. It produces results. It reflects ability. It shows impact.`,
  },
  {
    term: "Protect",
    notes: `To protect means to guard from harm. In the Bible, God protects His people. Protection brings safety. It prevents damage. It reflects care.`,
  },
  {
    term: "Reveal",
    notes: `To reveal means to make known. In the Bible, truth is revealed over time. Hidden things become clear. Revelation brings understanding. It reflects clarity.`,
  },
  {
    term: "Splendor",
    notes: `Splendor is great beauty or brilliance. In the Bible, it describes glory. It draws attention. It reflects excellence. It shows magnificence.`,
  },
  {
    term: "Tabernacle Veil",
    notes: `The tabernacle veil separated spaces. In the Bible, it divided holy from most holy. It showed limited access. It reflected God’s holiness. It showed separation.`,
  },
  {
    term: "Victory Song",
    notes: `A victory song celebrates success. In the Bible, people sang after deliverance. It expresses gratitude. It reflects triumph. It shows joy.`,
  },
  {
    term: "Visitation",
    notes: `Visitation is when God comes near. In the Bible, it can bring blessing or judgment. It shows divine involvement. It reflects presence. It marks important moments.`,
  },
  {
    term: "Wash",
    notes: `To wash means to clean. In the Bible, it symbolizes purification. It prepares for worship. It reflects renewal. It shows cleansing.`,
  },
  {
    term: "Wonderworking",
    notes: `Wonderworking means performing miracles. In the Bible, it shows God’s power. It amazes people. It reflects divine action. It confirms authority.`,
  },
  {
    term: "Year of Freedom",
    notes: `The year of freedom released people from bondage. In the Bible, it restored balance. It gave new beginnings. It reflected mercy. It showed reset.`,
  },
  {
    term: "atoning sacrifice",
    notes: `An atoning sacrifice covers sin. In the Bible, it restores relationship with God. It involves cost. It reflects mercy and justice. It shows reconciliation.`,
  },
  {
    term: "beatitudes",
    notes: `Beatitudes are blessings spoken by Jesus. In the Bible, they describe attitudes of the heart. They redefine success. They reflect spiritual truth. They show kingdom values.`,
  },
  {
    term: "book of the law",
    notes: `The Book of the Law contains God’s commands. In the Bible, it guided behavior. It carried authority. It reflects instruction. It shows direction.`,
  },
  {
    term: "book of life",
    notes: `The Book of Life records names. In the Bible, it represents belonging to God. It reflects eternal identity. It shows inclusion. It connects to destiny.`,
  },
  {
    term: "chief cornerstone",
    notes: `The chief cornerstone is the foundation stone. In the Bible, it represents Christ. Everything is built on it. It holds structure together. It reflects foundation.`,
  },
  {
    term: "cloud by day",
    notes: `The cloud by day guided people in the wilderness. In the Bible, it showed God’s presence and direction. It moved ahead of them. It provided covering and guidance. It reflects leadership and protection.`,
  },
  {
    term: "courtyard",
    notes: `A courtyard is an open area within a structure. In the Bible, it was part of the temple or tabernacle. People gathered there for worship. It connected outer space to sacred areas. It reflects access and preparation.`,
  },
  {
    term: "covenant faithfulness",
    notes: `Covenant faithfulness is staying true to an agreement. In the Bible, it reflects God’s consistency. People were also called to remain faithful. It requires commitment over time. It reflects loyalty and trust.`,
  },
  {
    term: "days of unleavened bread",
    notes: `These were specific festival days. In the Bible, they marked remembrance of deliverance. Leaven was removed as a symbol. It represented purity and separation. It reflects remembrance and obedience.`,
  },
  {
    term: "fellowship offering",
    notes: `A fellowship offering was a shared sacrifice. In the Bible, it symbolized peace and connection. Part was given to God and part shared. It created unity. It reflects relationship and gratitude.`,
  },
  {
    term: "golden calf",
    notes: `The golden calf was an idol. In the Bible, it represented false worship. People turned to it instead of God. It showed disobedience. It reflects misplaced devotion.`,
  },
  {
    term: "good shepherd",
    notes: `The good shepherd cares for the flock. In the Bible, it represents guidance and protection. A shepherd leads and provides. It reflects care and responsibility. It shows leadership with compassion.`,
  },
  {
    term: "great high priest",
    notes: `The great high priest represents the people before God. In the Bible, this role carried authority and responsibility. He entered sacred spaces. He made atonement. It reflects mediation and service.`,
  },
  {
    term: "holies of holies",
    notes: `The holies of holies was the most sacred place. In the Bible, it was where God’s presence was. Only the high priest could enter. It showed separation and holiness. It reflects divine presence.`,
  },
  {
    term: "house of prayer",
    notes: `The house of prayer is a place for worship. In the Bible, it was dedicated to communication with God. It required reverence. It brought people together. It reflects devotion.`,
  },
  {
    term: "indwelling",
    notes: `Indwelling means God living within. In the Bible, it reflects close relationship. It changes the inner life. It brings guidance. It reflects presence.`,
  },
  {
    term: "living hope",
    notes: `Living hope is active expectation. In the Bible, it is not passive. It continues through difficulty. It gives strength. It reflects confidence in God.`,
  },
  {
    term: "longsuffering",
    notes: `Longsuffering is patience over time. In the Bible, it reflects endurance with others. It does not give up quickly. It shows restraint. It reflects patience.`,
  },
  {
    term: "lord of lords",
    notes: `Lord of Lords means highest authority. In the Bible, it refers to God above all. It shows complete power. Nothing is higher. It reflects supremacy.`,
  },
  {
    term: "man of lawlessness",
    notes: `The man of lawlessness represents rebellion. In the Bible, it shows opposition to God. It rejects truth. It leads others astray. It reflects defiance.`,
  },
  {
    term: "ministry of reconciliation",
    notes: `This ministry restores relationships. In the Bible, it brings people back to God. It involves forgiveness. It requires action. It reflects restoration.`,
  },
  {
    term: "passion week",
    notes: `Passion week marks the final days before crucifixion. In the Bible, it includes key events. It leads to sacrifice and resurrection. It shows purpose. It reflects fulfillment.`,
  },
  {
    term: "promised land",
    notes: `The promised land was given by God. In the Bible, it represented inheritance. It required faith to receive. It brought fulfillment. It reflects promise.`,
  },
  {
    term: "prophet like Moses",
    notes: `A prophet like Moses was promised. In the Bible, it pointed forward. It showed continuation of leadership. It brought guidance. It reflects expectation.`,
  },
  {
    term: "pure in heart",
    notes: `Pure in heart means inner cleanliness. In the Bible, it reflects sincerity. It is not just outward. It shows true intention. It reflects integrity.`,
  },
  {
    term: "red sea",
    notes: `The Red Sea was a place of deliverance. In the Bible, it parted for escape. It showed God’s power. It created a path. It reflects salvation.`,
  },
  {
    term: "resurrection of the dead",
    notes: `Resurrection means rising again. In the Bible, it shows victory over death. It brings hope. It changes final outcomes. It reflects life beyond death.`,
  },
  {
    term: "river of life",
    notes: `The river of life represents ongoing provision. In the Bible, it gives life and renewal. It flows continuously. It sustains everything. It reflects abundance.`,
  },
  {
    term: "root of Jesse",
    notes: `The root of Jesse represents lineage. In the Bible, it connects to kingship. It shows origin. It carries promise. It reflects heritage.`,
  },
  {
    term: "sabbath rest",
    notes: `Sabbath rest is a set time of stopping work. In the Bible, it reflects trust in God. It restores strength. It creates balance. It reflects obedience.`,
  },
  {
    term: "scroll of the prophet Isaiah",
    notes: `This scroll contained prophetic writings. In the Bible, it was read publicly. It revealed truth and direction. It carried authority. It reflects recorded message.`,
  },
  {
    term: "second death",
    notes: `The second death is final separation. In the Bible, it goes beyond physical death. It reflects judgment. It is final. It shows consequence.`,
  },
  {
    term: "seed of Abraham",
    notes: `The seed of Abraham refers to descendants. In the Bible, it connects to promise. It shows continuation. It reflects inheritance. It carries identity.`,
  },
  {
    term: "seed of the woman",
    notes: `The seed of the woman points to future victory. In the Bible, it represents overcoming evil. It carries promise. It reflects redemption. It shows hope.`,
  },
  {
    term: "sermon on the mount",
    notes: `This sermon contains key teachings. In the Bible, it defines kingdom values. It shapes behavior. It challenges thinking. It reflects truth.`,
  },
  {
    term: "shofar",
    notes: `The shofar is a ram’s horn trumpet. In the Bible, it signals important events. It calls people to action. It marks sacred moments. It reflects alertness.`,
  },
  {
    term: "spiritual gifts",
    notes: `Spiritual gifts are abilities given by God. In the Bible, they are used to serve others. They are not for personal gain. They build community. It reflects purpose.`,
  },
  {
    term: "tabernacle of meeting",
    notes: `The tabernacle of meeting was a place of encounter. In the Bible, God met people there. It was central to worship. It required preparation. It reflects presence.`,
  },
  {
    term: "temple curtain",
    notes: `The temple curtain separated spaces. In the Bible, it marked access limits. It showed division. It symbolized holiness. It reflects separation.`,
  },
  {
    term: "throne of grace",
    notes: `The throne of grace represents access to God. In the Bible, it invites approach. It shows mercy. It provides help. It reflects relationship.`,
  },
  {
    term: "tree of life",
    notes: `The tree of life represents eternal life. In the Bible, it gives life continually. It connects to creation. It shows provision. It reflects life source.`,
  },
  {
    term: "voice crying in the wilderness",
    notes: `This voice calls for preparation. In the Bible, it announces change. It prepares people for what is coming. It reflects urgency. It shows direction.`,
  },
  {
    term: "washing of regeneration",
    notes: `This washing represents renewal. In the Bible, it reflects inner change. It is not just physical. It shows transformation. It reflects new life.`,
  },
  {
    term: "white robe",
    notes: `A white robe symbolizes purity. In the Bible, it reflects righteousness. It shows cleansing. It represents identity. It reflects holiness.`,
  },
  {
    term: "word became flesh",
    notes: `This refers to God becoming human. In the Bible, it shows connection to humanity. It reveals truth in form. It reflects presence. It shows incarnation.`,
  },
  {
    term: "wrath of God",
    notes: `The wrath of God is His response to wrongdoing. In the Bible, it reflects justice. It is not uncontrolled. It shows accountability. It reflects righteousness.`,
  },
  {
    term: "yoke of slavery",
    notes: `A yoke of slavery represents burden. In the Bible, it shows oppression. It restricts freedom. It weighs heavily. It reflects bondage.`,
  },
  {
    term: "alpha and omega",
    notes: `Alpha and Omega means beginning and end. In the Bible, it refers to God’s completeness. Nothing is outside Him. It reflects eternity. It shows total authority.`,
  },
  {
    term: "book of remembrance",
    notes: `This book records actions. In the Bible, it preserves memory. Nothing is forgotten. It reflects accountability. It shows record.`,
  },
  {
    term: "captain of the Lord's host",
    notes: `This captain leads divine armies. In the Bible, it represents authority. It shows leadership in battle. It reflects power. It shows command.`,
  },
  {
    term: "carnal mind",
    notes: `The carnal mind focuses on fleshly thinking. In the Bible, it opposes spiritual truth. It leads away from God. It reflects wrong focus. It shows conflict.`,
  },
  {
    term: "communion",
    notes: `Communion is shared participation. In the Bible, it represents connection. It brings unity. It reflects relationship. It shows fellowship.`,
  },
  {
    term: "faith comes by hearing",
    notes: `Faith grows through hearing truth. In the Bible, listening leads to belief. It requires attention. It reflects growth. It shows connection between hearing and faith.`,
  },
  {
    term: "faith without works",
    notes: `Faith without works is incomplete. In the Bible, belief must be shown in action. Words alone are not enough. It reflects real commitment. It shows living faith.`,
  },
  {
    term: "former rain",
    notes: `Former rain is early rain. In the Bible, it prepares the ground. It starts growth. It reflects provision. It shows beginning of increase.`,
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
