import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Swarm",
    notes: `A swarm is a large moving group. In the Bible, swarms often refer to insects or creatures moving together. They can represent overwhelming numbers. A swarm is difficult to control. It shows intensity and movement.`,
  },
  {
    term: "Hosts",
    notes: `Hosts refer to large organized groups. In the Bible, it can mean armies or heavenly beings. It shows order and power. Hosts move with purpose. It reflects structure and authority.`,
  },
  {
    term: "Egypt",
    notes: `Egypt is a nation in the Bible. It often represents bondage or oppression. It was a place people were delivered from. Egypt shows both power and limitation. It reflects a place of testing and history.`,
  },
  {
    term: "Herald",
    notes: `A herald is a messenger. In the Bible, heralds announced important news. They spoke publicly. Their message carried authority. It reflects communication and proclamation.`,
  },
  {
    term: "Expectation",
    notes: `Expectation is looking forward to something. In the Bible, it often relates to hope or outcome. Expectation shapes attitude. It influences decisions. It reflects belief about the future.`,
  },
  {
    term: "Changer",
    notes: `A changer is someone who exchanges things. In the Bible, money changers handled currency. They played a role in trade. Changing involved value and exchange. It reflects transaction.`,
  },
  {
    term: "Place",
    notes: `A place is a location. In the Bible, places often carry meaning. They are tied to events and purpose. Where something happens matters. Place reflects setting and identity.`,
  },
  {
    term: "Birth",
    notes: `Birth is the beginning of life. In the Bible, it marks a new start. It is connected to promise and future. Birth shows continuation. It reflects beginnings.`,
  },
  {
    term: "Token",
    notes: `A token is a sign or symbol. In the Bible, tokens confirm agreements. They represent something greater. Tokens remind people of truth. They carry meaning.`,
  },
  {
    term: "Branch",
    notes: `A branch grows from a tree. In the Bible, it often represents growth or lineage. It shows connection to a source. A branch depends on the root. It reflects extension and life.`,
  },
  {
    term: "Court",
    notes: `A court is a place of judgment. In the Bible, it can also refer to temple areas. It represents authority and decision. Courts bring resolution. It reflects order.`,
  },
  {
    term: "Saints",
    notes: `Saints are people set apart. In the Bible, they belong to God. They live with purpose. Saints reflect devotion. It shows identity and calling.`,
  },
  {
    term: "Slave",
    notes: `A slave is someone under control of another. In the Bible, slavery was part of society. It also represents submission. Slavery can be physical or symbolic. It reflects authority and service.`,
  },
  {
    term: "Hyperbole",
    notes: `Hyperbole is exaggerated language. In the Bible, it is used for emphasis. It helps make a point clear. Not every statement is literal. It reflects expression.`,
  },
  {
    term: "Payment",
    notes: `Payment is giving something in return. In the Bible, it reflects exchange. It shows responsibility. Payment settles obligation. It reflects value.`,
  },
  {
    term: "Clause",
    notes: `A clause is a part of an agreement. In the Bible, covenants had clauses. Each part had meaning. Clauses defined expectations. It reflects structure.`,
  },
  {
    term: "Document",
    notes: `A document is a written record. In the Bible, documents preserved agreements. They held authority. Written records ensured accuracy. It reflects permanence.`,
  },
  {
    term: "Price",
    notes: `Price is the cost of something. In the Bible, everything of value has a cost. Price reflects worth. It requires decision. It shows value placed on something.`,
  },
  {
    term: "Theology",
    notes: `Theology is the study of God. In the Bible, it reflects understanding of truth. It shapes belief and thought. Theology guides interpretation. It reflects knowledge of God.`,
  },
  {
    term: "Impression",
    notes: `An impression is a mark or effect. In the Bible, impressions can shape understanding. They influence perception. First impressions matter. They reflect impact.`,
  },
  {
    term: "Wall",
    notes: `A wall is a structure for protection. In the Bible, walls defend cities. They create separation. Walls provide security. It reflects defense.`,
  },
  {
    term: "Ring",
    notes: `A ring is a circular object. In the Bible, rings can symbolize authority or agreement. They represent identity. Rings carry meaning. It reflects connection.`,
  },
  {
    term: "Man",
    notes: `Man refers to a human being. In the Bible, man is created by God. It reflects identity and purpose. Humans have responsibility. It shows relationship with God.`,
  },
  {
    term: "Numbers",
    notes: `Numbers represent quantity. In the Bible, numbers often carry meaning. They can symbolize patterns. Counting creates order. It reflects structure.`,
  },
  {
    term: "Showbread",
    notes: `Showbread was bread placed in the tabernacle. In the Bible, it represented God's provision. It was set before Him regularly. It showed presence and offering. It reflects ongoing connection.`,
  },
  {
    term: "Collector",
    notes: `A collector gathers items or payments. In the Bible, collectors often handled taxes. They had authority. Their role involved accountability. It reflects responsibility.`,
  },
  {
    term: "Treasury",
    notes: `A treasury is a place of stored wealth. In the Bible, it held resources. It supported operations. Treasury shows provision. It reflects management.`,
  },
  {
    term: "Meeting",
    notes: `A meeting is a gathering. In the Bible, meetings were purposeful. People came together for decisions. Meetings created unity. It reflects connection.`,
  },
  {
    term: "Floor",
    notes: `A floor is a surface area. In the Bible, it can refer to a threshing floor. It is a place of work. It separates useful from waste. It reflects process.`,
  },
  {
    term: "Ox",
    notes: `An ox is a working animal. In the Bible, it represents strength and labor. Oxen were used for farming. They show effort and service. It reflects work.`,
  },
  {
    term: "Sledge",
    notes: `A sledge is a heavy tool. In the Bible context, it can represent force. It is used for breaking or shaping. It reflects impact. It shows power in action.`,
  },
  {
    term: "Goods",
    notes: `Goods are possessions or items. In the Bible, goods reflect wealth or provision. They must be managed well. Goods show value. It reflects stewardship.`,
  },
  {
    term: "Thummim",
    notes: `Thummim was used for decision making. In the Bible, it was connected to the priesthood. It helped determine God's will. Its exact nature is unclear. It reflects guidance.`,
  },
  {
    term: "Fork",
    notes: `A fork divides or separates. In the Bible, it can refer to tools used in work. It represents division. It separates elements. It reflects process.`,
  },
  {
    term: "East",
    notes: `East is a direction. In the Bible, directions carry meaning. East can symbolize origin or movement. It shows orientation. It reflects position.`,
  },
  {
    term: "Megiddo",
    notes: `Megiddo is a location. In the Bible, it is linked to battles. It holds historical importance. It represents conflict. It reflects strategic place.`,
  },
  {
    term: "Thing",
    notes: `A thing is an object or matter. In the Bible, it refers broadly to anything. Context defines meaning. It shows general reference. It reflects subject.`,
  },
  {
    term: "Waters",
    notes: `Waters refer to bodies of water. In the Bible, they represent life and chaos. They can bring provision or danger. Water is essential. It reflects power.`,
  },
  {
    term: "System",
    notes: `A system is an organized structure. In the Bible, systems guided behavior. They created order. Systems show arrangement. It reflects function.`,
  },
  {
    term: "Naked",
    notes: `Naked means without covering. In the Bible, it can represent exposure or vulnerability. It shows lack of protection. Nakedness can reflect shame or innocence. It reveals condition.`,
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
