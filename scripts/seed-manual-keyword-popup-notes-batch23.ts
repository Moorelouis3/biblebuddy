import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Stone memorial",
    notes: `A stone memorial is a physical marker set up to remember an event. In the Bible, stones were often placed after something important happened so people would not forget. They helped future generations understand what God had done. These stones were not just decoration, they carried meaning and purpose. They told a story without words. A stone memorial keeps memory alive over time. It reflects remembrance, testimony, and connection to the past.`,
  },
  {
    term: "Trust in the Lord",
    notes: `Trust in the Lord means relying fully on God instead of yourself. In the Bible, trust is not partial, it requires complete confidence in His direction and timing. It means believing even when things do not make sense. Trust replaces fear with faith. It shapes decisions and actions. When someone trusts God, they do not depend on their own understanding. It reflects faith, surrender, and stability.`,
  },
  {
    term: "Victory through obedience",
    notes: `Victory through obedience means success comes from following God's commands. In the Bible, obedience leads to outcomes that go beyond human strength. It shows that alignment with God matters more than ability. People who obey see results that are not just natural. It reflects trust and discipline. Victory is not random, it is connected to faithfulness. It shows that obedience produces results.`,
  },
  {
    term: "Witness stone",
    notes: `A witness stone is a marker that confirms something important. In the Bible, stones were set up to testify to agreements or events. They stood as silent witnesses. They reminded people of what had been said or done. A witness stone holds accountability over time. It reflects truth, memory, and confirmation.`,
  },
  {
    term: "Adhere",
    notes: `To adhere means to stay firmly connected to something. In the Bible, it refers to staying committed to God or truth. It requires consistency and focus. Adhering is not temporary, it is ongoing. It shows loyalty. It reflects discipline and commitment. Staying attached shows strength in belief.`,
  },
  {
    term: "Agreement",
    notes: `An agreement is a shared understanding between people. In the Bible, agreements were serious and often binding. They required both sides to commit. Breaking an agreement had consequences. It affected trust. Agreements reflect unity and shared responsibility. They show connection between people.`,
  },
  {
    term: "Almighty",
    notes: `Almighty refers to unlimited power and authority. In the Bible, it describes God as having complete control over everything. Nothing is beyond Him. His power is not limited or challenged. The word shows strength, authority, and sovereignty. It reflects total power.`,
  },
  {
    term: "Amazement",
    notes: `Amazement is a deep sense of wonder and surprise. In the Bible, people were amazed when they saw powerful acts. It stopped normal thinking. It caused people to recognize something greater than themselves. Amazement leads to attention and reflection. It reflects awe and recognition.`,
  },
  {
    term: "Ambition",
    notes: `Ambition is the desire to achieve something. In the Bible, ambition can be positive or negative depending on its direction. It must be guided. Uncontrolled ambition can lead to pride. Right ambition leads to growth and purpose. It reflects desire and motivation.`,
  },
  {
    term: "Apparel",
    notes: `Apparel is clothing or what someone wears. In the Bible, clothing can represent identity, status, or condition. It is not just physical. Garments sometimes carried symbolic meaning. Apparel reflects outward appearance but can point to deeper truth.`,
  },
  {
    term: "Appeal",
    notes: `An appeal is a request made for change or help. In the Bible, people appealed to authority for justice or mercy. It shows dependence. Appeals are made when someone cannot fix something alone. It reflects humility and need for intervention.`,
  },
  {
    term: "Appointed",
    notes: `Appointed means chosen for a specific role. In the Bible, appointments were not random, they were intentional. Being appointed carried responsibility. It reflects purpose and assignment.`,
  },
  {
    term: "Awake",
    notes: `To be awake means to be alert and aware. In the Bible, it can refer to spiritual awareness. Being awake means paying attention. It reflects readiness and focus.`,
  },
  {
    term: "Awaken",
    notes: `To awaken means to be brought into awareness. In the Bible, awakening often leads to change. It moves someone from passivity to action. It reflects realization and clarity.`,
  },
  {
    term: "Beasts of the field",
    notes: `Beasts of the field are animals living in nature. In the Bible, they represent part of creation. They exist under God's order. They reflect the natural world.`,
  },
  {
    term: "Beget",
    notes: `To beget means to produce offspring. In the Bible, it connects generations together. It shows lineage and continuation. It reflects the passing of life forward.`,
  },
  {
    term: "Believe",
    notes: `To believe means to accept something as true. In the Bible, belief is tied to trust in God. Belief shapes actions. It reflects faith and confidence.`,
  },
  {
    term: "Bow",
    notes: `To bow means to lower yourself. In the Bible, it shows respect or submission. It acknowledges authority. It reflects humility.`,
  },
  {
    term: "Breath",
    notes: `Breath is the source of life. In the Bible, life begins with breath. It connects existence to God. It reflects living presence.`,
  },
  {
    term: "Build",
    notes: `To build means to create or establish. In the Bible, building requires effort and intention. It forms structure and stability. It reflects growth and development.`,
  },
  {
    term: "Carcass",
    notes: `A carcass is a dead body. In the Bible, it represents death and decay. It is something to avoid. It reflects lifelessness.`,
  },
  {
    term: "Cattle",
    notes: `Cattle are animals used for work or food. In the Bible, they represent wealth and provision. They require care and management. It reflects resources and livelihood.`,
  },
  {
    term: "Cave",
    notes: `A cave is a hidden or enclosed place. In the Bible, it can serve as refuge or danger. It provides shelter. It reflects concealment.`,
  },
  {
    term: "Ceremony",
    notes: `A ceremony is a formal event. In the Bible, ceremonies carried meaning. They followed structure and purpose. It reflects tradition and significance.`,
  },
  {
    term: "Childbearing",
    notes: `Childbearing is bringing new life. In the Bible, it is tied to promise and continuation. It reflects growth of generations. It shows the beginning of life.`,
  },
  {
    term: "Cling",
    notes: `To cling means to hold tightly. In the Bible, it shows strong attachment and commitment. Clinging reflects loyalty. It shows unwillingness to let go.`,
  },
  {
    term: "Clothe",
    notes: `To clothe means to cover someone. In the Bible, it can represent provision and care. Clothing protects and identifies. It reflects covering and dignity.`,
  },
  {
    term: "Clothing",
    notes: `Clothing is what people wear. In the Bible, it can symbolize identity or condition. Garments sometimes carry deeper meaning. It reflects outward expression.`,
  },
  {
    term: "Commit",
    notes: `To commit means to give fully. In the Bible, commitment shows dedication. It requires intention and consistency. It reflects loyalty and purpose.`,
  },
  {
    term: "Conceal",
    notes: `To conceal means to hide something. In the Bible, hidden things may be revealed later. Concealment can protect or deceive. It reflects secrecy.`,
  },
  {
    term: "Conceive",
    notes: `To conceive means to begin life. In the Bible, it marks the start of something new. It reflects creation. It shows beginning.`,
  },
  {
    term: "Condemn",
    notes: `To condemn means to declare wrong. In the Bible, it reflects judgment. It carries consequence. It reflects accountability.`,
  },
  {
    term: "Contract",
    notes: `A contract is a binding agreement. In the Bible, agreements were serious commitments. They required responsibility. It reflects obligation.`,
  },
  {
    term: "Create",
    notes: `To create means to bring something into existence. In the Bible, creation comes from God. It shows power and origin. It reflects beginning.`,
  },
  {
    term: "Creature",
    notes: `A creature is a living being. In the Bible, all creatures are created. They have purpose. It reflects life.`,
  },
  {
    term: "Cultivate",
    notes: `To cultivate means to develop or grow something. In the Bible, it often refers to land. It requires effort. It reflects growth and care.`,
  },
  {
    term: "Dawn",
    notes: `Dawn is the beginning of the day. In the Bible, it represents new beginnings. It brings light after darkness. It reflects renewal.`,
  },
  {
    term: "Deception",
    notes: `Deception is misleading someone. In the Bible, it leads people away from truth. It hides reality. It reflects dishonesty.`,
  },
  {
    term: "Deep",
    notes: `Deep refers to great depth. In the Bible, it can represent mystery or complexity. It shows hidden things. It reflects depth of meaning.`,
  },
  {
    term: "Embrace",
    notes: `To embrace means to accept or hold closely. In the Bible, it reflects acceptance and connection. It shows closeness. It reflects relationship.`,
  },
  {
    term: "Endure",
    notes: `To endure means to continue through difficulty. In the Bible, endurance builds strength. It requires patience. It reflects perseverance.`,
  },
  {
    term: "Everlasting",
    notes: `Everlasting means without end. In the Bible, it describes God's nature. It continues forever. It reflects permanence.`,
  },
  {
    term: "Exceed",
    notes: `To exceed means to go beyond. In the Bible, it shows increase or abundance. It surpasses limits. It reflects growth.`,
  },
  {
    term: "Exist",
    notes: `To exist means to be present. In the Bible, existence comes from God. It reflects life. It shows being.`,
  },
  {
    term: "Expanse",
    notes: `An expanse is a wide space. In the Bible, it refers to the sky. It separates areas. It reflects creation.`,
  },
  {
    term: "Fertile",
    notes: `Fertile means able to produce. In the Bible, it refers to land or life. It brings growth. It reflects productivity.`,
  },
  {
    term: "Fertility",
    notes: `Fertility is the ability to produce life. In the Bible, it is seen as a blessing. It reflects increase. It shows growth.`,
  },
  {
    term: "Flourish",
    notes: `To flourish means to grow strongly. In the Bible, it reflects success and health. It shows development. It reflects thriving.`,
  },
  {
    term: "Forbear",
    notes: `To forbear means to hold back. In the Bible, it reflects patience. It avoids reaction. It shows control.`,
  },
  {
    term: "Forget",
    notes: `To forget means to lose memory. In the Bible, forgetting truth leads to error. It reflects neglect. It shows loss of awareness.`,
  },
  {
    term: "Garment",
    notes: `A garment is clothing worn on the body. In the Bible, garments often symbolize identity or condition. They can represent status or change. It reflects covering and expression.`,
  },
  {
    term: "Give",
    notes: `To give means to offer something freely. In the Bible, giving reflects generosity. It requires willingness. It shows care and provision.`,
  },
  {
    term: "Govern",
    notes: `To govern means to lead or rule. In the Bible, leadership requires wisdom. It reflects authority. It shows responsibility.`,
  },
  {
    term: "Grave",
    notes: `A grave is a place of burial. In the Bible, it represents death. It marks the end of life. It reflects finality.`,
  },
  {
    term: "Ground",
    notes: `Ground is the earth or soil. In the Bible, it is where life grows. It reflects foundation. It shows origin.`,
  },
  {
    term: "Heir",
    notes: `An heir receives what is passed down. In the Bible, it connects to inheritance. It reflects continuation. It shows future promise.`,
  },
  {
    term: "Husband",
    notes: `A husband is a partner in marriage. In the Bible, it reflects responsibility and leadership. It requires commitment. It shows relationship.`,
  },
  {
    term: "Immortality",
    notes: `Immortality means not dying. In the Bible, it connects to eternal life. It reflects permanence. It shows continuation.`,
  },
  {
    term: "Legacy",
    notes: `Legacy is what is left behind. In the Bible, actions affect future generations. It reflects lasting impact. It shows continuation.`,
  },
  {
    term: "Live",
    notes: `To live means to exist actively. In the Bible, life has purpose. It reflects connection to God. It shows ongoing activity.`,
  },
  {
    term: "Longevity",
    notes: `Longevity is long duration of life. In the Bible, it is often seen as a blessing. It reflects stability. It shows endurance.`,
  },
  {
    term: "Male",
    notes: `Male refers to gender identity. In the Bible, it connects to roles and structure. It reflects distinction. It shows identity.`,
  },
  {
    term: "Marriage",
    notes: `Marriage is a covenant relationship. In the Bible, it reflects unity and commitment. It requires loyalty. It shows partnership.`,
  },
  {
    term: "Multiply",
    notes: `To multiply means to increase. In the Bible, it reflects growth and expansion. It shows blessing. It represents increase.`,
  },
  {
    term: "Murder",
    notes: `Murder is taking life unjustly. In the Bible, it is strongly condemned. It reflects violence. It shows wrongdoing.`,
  },
  {
    term: "Pasture",
    notes: `A pasture is land for feeding animals. In the Bible, it represents provision. It shows care. It reflects sustenance.`,
  },
  {
    term: "Pervert",
    notes: `To pervert means to distort truth. In the Bible, it leads to error. It reflects corruption. It shows wrong direction.`,
  },
  {
    term: "Plant",
    notes: `To plant means to place something for growth. In the Bible, it reflects beginnings. It requires time. It shows development.`,
  },
  {
    term: "Reap",
    notes: `To reap means to gather results. In the Bible, it follows sowing. It reflects outcome. It shows consequence.`,
  },
  {
    term: "Reject",
    notes: `To reject means to refuse something. In the Bible, it shows decision. It reflects separation. It shows turning away.`,
  },
  {
    term: "Reproach",
    notes: `Reproach is shame or disgrace. In the Bible, it affects reputation. It reflects dishonor. It shows consequence.`,
  },
  {
    term: "Restrain",
    notes: `To restrain means to hold back. In the Bible, it reflects self control. It prevents harm. It shows discipline.`,
  },
  {
    term: "Rise",
    notes: `To rise means to go upward. In the Bible, it can mean standing or beginning. It reflects movement. It shows change.`,
  },
  {
    term: "Separate",
    notes: `To separate means to divide. In the Bible, it creates distinction. It reflects identity. It shows difference.`,
  },
  {
    term: "Sisterhood",
    notes: `Sisterhood is unity among women. In the Bible, it reflects connection and support. It shows relationship. It reflects shared identity.`,
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
