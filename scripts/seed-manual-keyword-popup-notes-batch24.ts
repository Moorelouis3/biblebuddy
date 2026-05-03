import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Sleep",
    notes: `Sleep is a state of rest where the body and mind pause. In the Bible, sleep can represent physical rest or spiritual unawareness. It restores strength but can also symbolize neglect. Too much sleep can lead to laziness, while proper rest brings renewal. Sleep reflects both need and balance. It shows dependence on restoration.`,
  },
  {
    term: "Sojourn",
    notes: `To sojourn means to live temporarily in a place. In the Bible, people often sojourned as strangers. It showed that life in certain places was not permanent. Sojourning required humility and dependence. It reflects movement and temporary dwelling.`,
  },
  {
    term: "Sow",
    notes: `To sow means to plant seeds. In the Bible, sowing represents actions that produce results later. What is planted determines what will grow. Sowing reflects investment and future outcome.`,
  },
  {
    term: "Suffer",
    notes: `To suffer means to endure pain or hardship. In the Bible, suffering is part of life and growth. It tests faith and builds endurance. Suffering is not meaningless. It reflects process and development.`,
  },
  {
    term: "Sweat",
    notes: `Sweat is the result of hard work. In the Bible, it represents effort and labor. Work requires energy and persistence. Sweat reflects the cost of provision.`,
  },
  {
    term: "Tremble",
    notes: `To tremble means to shake with fear or awe. In the Bible, it can happen in response to God's presence. It reflects recognition of power. Trembling shows humility and awareness.`,
  },
  {
    term: "Wander",
    notes: `To wander means to move without clear direction. In the Bible, wandering often shows lack of stability. It can be a time of testing. Wandering reflects uncertainty and searching.`,
  },
  {
    term: "Weep",
    notes: `To weep means to cry deeply. In the Bible, it shows sorrow or emotional release. Weeping reflects pain and honesty. It can lead to healing.`,
  },
  {
    term: "Wild",
    notes: `Wild means untamed or uncontrolled. In the Bible, it often refers to nature or behavior. Wildness shows lack of restraint. It reflects freedom without order.`,
  },
  {
    term: "Woman",
    notes: `A woman is a female human. In the Bible, women play important roles in family and society. They contribute to life, growth, and community. It reflects identity and purpose.`,
  },
  {
    term: "Womb",
    notes: `The womb is where life begins. In the Bible, it represents creation and origin. It shows the start of life. The womb reflects growth and beginning.`,
  },
  {
    term: "Yearn",
    notes: `To yearn means to deeply desire something. In the Bible, it often reflects longing for God or purpose. It shows strong inner desire. Yearning shapes direction.`,
  },
  {
    term: "Yield",
    notes: `To yield means to give way or produce. In the Bible, it can refer to harvest or submission. Yielding reflects response to effort or authority. It shows result and surrender.`,
  },
  {
    term: "Adorn",
    notes: `To adorn means to decorate or enhance. In the Bible, it can refer to outward or inward beauty. Adornment reflects value and attention. It shows presentation and expression.`,
  },
  {
    term: "Altar of Burnt Offering",
    notes: `The altar of burnt offering was a place for sacrifice. In the Bible, offerings were burned completely to God. It represented surrender and devotion. The altar was central to worship.`,
  },
  {
    term: "Ambassador",
    notes: `An ambassador represents another authority. In the Bible, it can refer to someone sent with a message. They speak on behalf of another. It reflects representation and responsibility.`,
  },
  {
    term: "Basin",
    notes: `A basin is a container for water. In the Bible, it was used for washing and cleansing. It symbolized purification. The basin reflects preparation.`,
  },
  {
    term: "Book of the Covenant",
    notes: `The Book of the Covenant contains laws and agreements. In the Bible, it defined expectations between God and people. It carried authority. It reflects structure and relationship.`,
  },
  {
    term: "Breastpiece",
    notes: `The breastpiece was part of priestly clothing. In the Bible, it held significance and symbols. It represented responsibility. It reflects sacred function.`,
  },
  {
    term: "Burning Bush",
    notes: `The burning bush was a sign of God's presence. In the Bible, it burned without being consumed. It showed divine power. It reflects revelation and calling.`,
  },
  {
    term: "Calf",
    notes: `A calf is a young animal. In the Bible, it could be used for sacrifice. It also symbolized idolatry in some cases. It reflects provision or misuse.`,
  },
  {
    term: "Chain",
    notes: `A chain is something that binds or connects. In the Bible, it can represent restriction or strength. Chains limit movement. It reflects control or connection.`,
  },
  {
    term: "Consumed",
    notes: `Consumed means completely used up. In the Bible, fire often consumes. It shows total destruction. It reflects completeness.`,
  },
  {
    term: "Craft",
    notes: `Craft is skillful work. In the Bible, it involves creating things. Craft requires ability and precision. It reflects skill and effort.`,
  },
  {
    term: "Craftsman",
    notes: `A craftsman is someone skilled in making things. In the Bible, craftsmen built important structures. They used their skill with purpose. It reflects ability and creation.`,
  },
  {
    term: "Destroyer",
    notes: `A destroyer is one who brings destruction. In the Bible, it can refer to judgment. It shows removal or ending. It reflects power to destroy.`,
  },
  {
    term: "alliance",
    notes: `An alliance is a partnership between groups. In the Bible, alliances could bring strength or compromise. They required agreement. It reflects cooperation.`,
  },
  {
    term: "axe",
    notes: `An axe is a cutting tool. In the Bible, it represents action or judgment. It cuts down what stands. It reflects removal.`,
  },
  {
    term: "banished",
    notes: `Banished means sent away. In the Bible, it reflects separation. It removes someone from a place. It shows consequence.`,
  },
  {
    term: "blind",
    notes: `Blind means unable to see. In the Bible, it can be physical or spiritual. Blindness prevents understanding. It reflects lack of clarity.`,
  },
  {
    term: "capture",
    notes: `To capture means to take control. In the Bible, it often happens in battle. It shows victory. It reflects control over others.`,
  },
  {
    term: "carved image",
    notes: `A carved image is an idol. In the Bible, it represents false worship. It is made by human hands. It reflects misplaced devotion.`,
  },
  {
    term: "cast down",
    notes: `To cast down means to throw down. In the Bible, it shows defeat or removal. It lowers position. It reflects loss of power.`,
  },
  {
    term: "child sacrifice",
    notes: `Child sacrifice is offering a child in worship. In the Bible, it is strongly condemned. It reflects extreme wrongdoing. It shows corruption.`,
  },
  {
    term: "choose",
    notes: `To choose means to select. In the Bible, choices shape direction. Each choice has consequences. It reflects decision making.`,
  },
  {
    term: "clan",
    notes: `A clan is a family group. In the Bible, clans form structure. They connect people. It reflects identity.`,
  },
  {
    term: "commitment",
    notes: `Commitment is staying dedicated. In the Bible, it reflects loyalty. It requires consistency. It shows faithfulness.`,
  },
  {
    term: "cry out",
    notes: `To cry out means to call loudly. In the Bible, people cry out for help. It shows urgency. It reflects need.`,
  },
  {
    term: "dagger",
    notes: `A dagger is a short weapon. In the Bible, it represents close combat. It is direct and sharp. It reflects precision.`,
  },
  {
    term: "devastation",
    notes: `Devastation is complete destruction. In the Bible, it follows judgment or war. It leaves nothing intact. It reflects loss.`,
  },
  {
    term: "faithless",
    notes: `Faithless means lacking trust. In the Bible, it reflects disobedience. It blocks growth. It shows doubt.`,
  },
  {
    term: "family",
    notes: `Family is a group connected by relationship. In the Bible, it forms the foundation of society. It provides support. It reflects connection.`,
  },
  {
    term: "father's house",
    notes: `A father's house is a family unit. In the Bible, it represents heritage. It connects generations. It reflects identity.`,
  },
  {
    term: "flame",
    notes: `A flame is burning fire. In the Bible, it represents power or presence. It can purify or destroy. It reflects energy.`,
  },
  {
    term: "follow",
    notes: `To follow means to go after. In the Bible, it reflects obedience. It requires direction. It shows alignment.`,
  },
  {
    term: "freedom",
    notes: `Freedom is being without bondage. In the Bible, it comes from God. It allows movement and choice. It reflects release.`,
  },
  {
    term: "grind",
    notes: `To grind means to crush into pieces. In the Bible, it relates to work or judgment. It breaks things down. It reflects process.`,
  },
  {
    term: "hardness",
    notes: `Hardness means resistance. In the Bible, it often refers to the heart. It prevents change. It reflects stubbornness.`,
  },
  {
    term: "hidden",
    notes: `Hidden means not visible. In the Bible, hidden things may be revealed. It reflects secrecy. It shows concealment.`,
  },
  {
    term: "hill country",
    notes: `Hill country is elevated land. In the Bible, it often has strategic value. It provides vantage points. It reflects terrain.`,
  },
  {
    term: "iron",
    notes: `Iron is a strong metal. In the Bible, it represents strength. It is used for tools and weapons. It reflects durability.`,
  },
  {
    term: "knife",
    notes: `A knife is a cutting tool. In the Bible, it is used in sacrifice. It represents action. It reflects precision.`,
  },
  {
    term: "lead",
    notes: `To lead means to guide. In the Bible, leaders direct others. It requires responsibility. It reflects direction.`,
  },
  {
    term: "levy",
    notes: `A levy is a forced contribution. In the Bible, it can refer to labor or tax. It creates obligation. It reflects authority.`,
  },
  {
    term: "lie in wait",
    notes: `To lie in wait means to hide and wait to attack. In the Bible, it shows strategy. It involves patience. It reflects planning.`,
  },
  {
    term: "mountain pass",
    notes: `A mountain pass is a narrow path. In the Bible, it has strategic importance. It controls movement. It reflects access.`,
  },
  {
    term: "pagan",
    notes: `A pagan is one who follows other gods. In the Bible, it reflects outside belief. It shows difference in worship. It reflects contrast.`,
  },
  {
    term: "people",
    notes: `People refers to a group of individuals. In the Bible, people form nations. They have shared identity. It reflects community.`,
  },
  {
    term: "pillage",
    notes: `To pillage means to take goods by force. In the Bible, it follows conquest. It reflects gain through conflict. It shows loss for others.`,
  },
  {
    term: "provoke",
    notes: `To provoke means to stir up reaction. In the Bible, it often leads to anger. It causes response. It reflects influence.`,
  },
  {
    term: "raise up",
    notes: `To raise up means to lift or establish. In the Bible, it can refer to leaders. It shows elevation. It reflects growth.`,
  },
  {
    term: "revenge",
    notes: `Revenge is returning harm. In the Bible, it is discouraged. It leads to more conflict. It reflects anger.`,
  },
  {
    term: "rob",
    notes: `To rob means to take by force. In the Bible, it is wrongdoing. It reflects injustice. It shows theft.`,
  },
  {
    term: "save",
    notes: `To save means to rescue. In the Bible, it reflects deliverance. It brings safety. It shows protection.`,
  },
  {
    term: "seek",
    notes: `To seek means to search for. In the Bible, seeking leads to finding. It shows desire. It reflects pursuit.`,
  },
  {
    term: "servitude",
    notes: `Servitude is a state of serving. In the Bible, it can be forced or chosen. It reflects submission. It shows condition.`,
  },
  {
    term: "sister",
    notes: `A sister is a female sibling. In the Bible, it can also mean close relation. It reflects connection. It shows family bond.`,
  },
  {
    term: "slavery",
    notes: `Slavery is forced service. In the Bible, it was part of society. It reflects control. It shows lack of freedom.`,
  },
  {
    term: "sling",
    notes: `A sling is a weapon used to throw stones. In the Bible, it shows skill in battle. It reflects precision. It shows simple strength.`,
  },
  {
    term: "soldier",
    notes: `A soldier is one who fights. In the Bible, soldiers represent action. They follow orders. It reflects discipline.`,
  },
  {
    term: "song",
    notes: `A song is a form of expression. In the Bible, songs express praise or emotion. They communicate truth. It reflects feeling.`,
  },
  {
    term: "spear",
    notes: `A spear is a weapon used in battle. In the Bible, it represents combat. It reflects strength. It shows conflict.`,
  },
  {
    term: "strike",
    notes: `To strike means to hit. In the Bible, it can represent judgment. It shows action. It reflects force.`,
  },
  {
    term: "tear down",
    notes: `To tear down means to destroy. In the Bible, it removes what stands. It reflects change. It shows removal.`,
  },
  {
    term: "tent",
    notes: `A tent is a temporary shelter. In the Bible, it reflects movement. It shows temporary living. It reflects journey.`,
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

