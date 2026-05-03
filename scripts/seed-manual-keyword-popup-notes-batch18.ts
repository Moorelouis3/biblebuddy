import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Witnesses",
    notes: `Witnesses are people who confirm what is true. In the Bible, important matters required more than one witness. This protected against false claims. Witnesses carried responsibility for their words. Truth was established through agreement. Their testimony shaped judgment.`,
  },
  {
    term: "Status",
    notes: `Status is a person's position or standing. In the Bible, status did not determine value before God. People of different status were still accountable. It could influence how others treated someone. True worth was not based on status.`,
  },
  {
    term: "Fifties",
    notes: `Fifties refers to groups organized in units of fifty. In the Bible, people were structured into smaller groups. This created order and easier leadership. Each group had oversight. It helped manage large numbers.`,
  },
  {
    term: "Thousands",
    notes: `Thousands refers to large groupings of people. In the Bible, organization into thousands showed structure. It allowed for leadership at different levels. Large groups required order. It reflected scale and coordination.`,
  },
  {
    term: "Imagery",
    notes: `Imagery is the use of visual language. In the Bible, imagery helps explain deeper meaning. It creates understanding through pictures. Imagery makes ideas clearer. It connects concepts to experience.`,
  },
  {
    term: "Renewal",
    notes: `Renewal is making something new again. In the Bible, renewal often refers to restoration. It brings fresh strength and direction. Renewal is not just repair. It reflects change and growth.`,
  },
  {
    term: "Thorns",
    notes: `Thorns are sharp plants that cause pain. In the Bible, they often represent difficulty or consequence. They make progress harder. Thorns remind of struggle. They reflect obstacles in life.`,
  },
  {
    term: "Pattern",
    notes: `A pattern is a repeated design or way. In the Bible, patterns show consistency. They reveal how things work over time. Patterns can guide behavior. They reflect order and repetition.`,
  },
  {
    term: "Purchase",
    notes: `Purchase is obtaining something by giving value. In the Bible, it shows exchange and ownership. It reflects cost and decision. What is purchased belongs to the buyer. It shows value placed on something.`,
  },
  {
    term: "Practices",
    notes: `Practices are repeated actions or habits. In the Bible, practices shape daily life. Good practices lead to growth. They reflect what people value. Consistency forms patterns.`,
  },
  {
    term: "Interpreter",
    notes: `An interpreter explains meaning. In the Bible, interpreters helped understand messages. They made unclear things clear. Interpretation requires accuracy. It connects message to understanding.`,
  },
  {
    term: "Gate",
    notes: `A gate is an entrance point. In the Bible, gates were also places of decision. Leaders gathered there. It represented authority. What happened at the gate mattered.`,
  },
  {
    term: "Times",
    notes: `Times refer to specific periods. In the Bible, timing is important. Events happen in set times. Understanding time gives clarity. It reflects order and sequence.`,
  },
  {
    term: "Motif",
    notes: `A motif is a recurring idea. In the Bible, motifs repeat across stories. They connect different parts together. Motifs reveal deeper meaning. They show consistency in themes.`,
  },
  {
    term: "Face",
    notes: `Face represents presence or identity. In the Bible, seeking someone's face means seeking them. It reflects closeness or attention. Turning away shows distance. The face shows connection.`,
  },
  {
    term: "Booths",
    notes: `Booths are temporary shelters. In the Bible, they were used during festivals. They reminded people of past journeys. Booths symbolized dependence. They reflected temporary living.`,
  },
  {
    term: "Tabernacles",
    notes: `Tabernacles refer to dwelling places. In the Bible, it connects to God dwelling with people. It also refers to a festival. It symbolizes presence and provision. Tabernacles show closeness.`,
  },
  {
    term: "Trumpets",
    notes: `Trumpets are instruments used for signaling. In the Bible, they marked events or gatherings. They called people to action. The sound carried meaning. Trumpets showed urgency.`,
  },
  {
    term: "Weeks",
    notes: `Weeks are measured periods of time. In the Bible, weeks helped mark cycles. They structured time and events. It created rhythm in life. Weeks reflect order.`,
  },
  {
    term: "Ownership",
    notes: `Ownership is having possession of something. In the Bible, ownership also includes responsibility. What you own must be managed. It reflects value and care. Ownership connects to accountability.`,
  },
  {
    term: "Washing",
    notes: `Washing is cleaning with water. In the Bible, it symbolizes purification. It prepares people for worship. Washing represents renewal. It reflects cleansing both physically and spiritually.`,
  },
  {
    term: "Magog",
    notes: `Magog refers to a symbolic nation or group. In the Bible, it represents opposition. It appears in prophetic contexts. Magog reflects conflict on a larger scale. It shows forces against God's people.`,
  },
  {
    term: "Commission",
    notes: `A commission is an assignment or task. In the Bible, people were sent with purpose. It carried authority. A commission required action. It reflects responsibility.`,
  },
  {
    term: "Right",
    notes: `Right means what is correct or just. In the Bible, right actions align with truth. It reflects fairness and integrity. Choosing right leads to stability. It shows alignment with God.`,
  },
  {
    term: "Share",
    notes: `To share is to give part of something. In the Bible, sharing reflects generosity. It helps others. It builds community. Sharing shows care.`,
  },
  {
    term: "Holies",
    notes: `Holies refers to what is sacred. In the Bible, it describes things set apart. It reflects God's holiness. Not everything is treated the same. Holiness requires respect.`,
  },
  {
    term: "Culture",
    notes: `Culture is a way of living. In the Bible, culture influenced behavior. It shaped traditions and practices. Culture can align or conflict with truth. It reflects shared values.`,
  },
  {
    term: "Code",
    notes: `A code is a set of rules. In the Bible, codes guided behavior. They created structure. Codes defined expectations. They maintained order.`,
  },
  {
    term: "Manager",
    notes: `A manager oversees responsibility. In the Bible, managing required accountability. It involved stewardship. What is managed must be handled well. It reflects trust.`,
  },
  {
    term: "Allotment",
    notes: `An allotment is a portion given. In the Bible, land was divided by allotment. Each received a share. It created identity. It reflected distribution.`,
  },
  {
    term: "Rights",
    notes: `Rights are what someone is entitled to. In the Bible, rights were balanced with responsibility. They were not abused. Rights required fairness. They reflected justice.`,
  },
  {
    term: "Seat",
    notes: `A seat represents a position. In the Bible, it can show authority or place. Where you sit reflects status. Seats show order. They represent role.`,
  },
  {
    term: "Supper",
    notes: `Supper is a shared meal. In the Bible, meals often had meaning. They brought people together. Supper created connection. It reflected fellowship.`,
  },
  {
    term: "Waste",
    notes: `Waste is misuse or loss. In the Bible, waste shows poor stewardship. Resources should be used wisely. Waste leads to lack. It reflects carelessness.`,
  },
  {
    term: "Moses",
    notes: `Moses is a central leader in the Bible. He led people out of Egypt. He received God's law. Moses shows leadership and obedience. His role shaped history.`,
  },
  {
    term: "Scroll",
    notes: `A scroll is a written document. In the Bible, scrolls contained important writings. They preserved truth. Reading scrolls brought knowledge. They reflect recorded message.`,
  },
  {
    term: "World",
    notes: `The world is the created environment. In the Bible, it includes people and systems. It reflects both good and brokenness. The world is influenced by choices. It shows the larger setting of life.`,
  },
  {
    term: "Judah",
    notes: `Judah is a tribe and region. In the Bible, it plays a key role in history. It is connected to kingship. Judah carries significance. It reflects identity and lineage.`,
  },
  {
    term: "Den",
    notes: `A den is a hidden or enclosed space. In the Bible, it can represent danger or refuge. Dens are often associated with animals. They show concealment. It reflects hidden places.`,
  },
  {
    term: "Water",
    notes: `Water is essential for life. In the Bible, it symbolizes cleansing and renewal. It provides sustenance. Water represents life and provision. It reflects continuous need.`,
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
