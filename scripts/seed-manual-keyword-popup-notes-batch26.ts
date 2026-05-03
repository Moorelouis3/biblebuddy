import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "full armor of God",
    notes: `The full armor of God is spiritual protection given to believers. In the Bible, it includes truth, righteousness, faith, salvation, and the word of God. Each piece has a purpose. It prepares someone to stand against opposition. It reflects readiness and spiritual defense.`,
  },
  {
    term: "gehenna",
    notes: `Gehenna refers to a place of judgment. In the Bible, it is used to describe destruction and separation. It carries strong warning. It reflects consequence of wrongdoing. It shows seriousness of judgment.`,
  },
  {
    term: "gift of God",
    notes: `The gift of God is something given freely. In the Bible, it reflects grace, not earning. It cannot be bought. It shows God's generosity. It reflects undeserved favor.`,
  },
  {
    term: "gospel of peace",
    notes: `The gospel of peace is the message that brings reconciliation. In the Bible, it restores relationship with God. It replaces conflict with peace. It brings stability. It reflects harmony.`,
  },
  {
    term: "gospel of the kingdom",
    notes: `The gospel of the kingdom announces God's rule. In the Bible, it shows His authority. It calls people to respond. It brings transformation. It reflects divine government.`,
  },
  {
    term: "high places",
    notes: `High places were elevated areas used for worship. In the Bible, they were often used incorrectly. They represented misplaced devotion. They drew people away from truth. It reflects wrong worship.`,
  },
  {
    term: "image of the invisible God",
    notes: `This phrase shows visible representation of God. In the Bible, it refers to revealing what cannot be seen. It connects the unseen with the seen. It reflects understanding of God. It shows divine expression.`,
  },
  {
    term: "indescribable gift",
    notes: `The indescribable gift is beyond explanation. In the Bible, it refers to something so valuable it cannot be fully described. It shows overwhelming value. It reflects deep gratitude. It points to something greater than words.`,
  },
  {
    term: "jot and tittle",
    notes: `Jot and tittle refer to small details in writing. In the Bible, they show that nothing is overlooked. Every detail matters. It reflects precision. It shows completeness.`,
  },
  {
    term: "joy of the Lord",
    notes: `The joy of the Lord is strength from God. In the Bible, it is not based on circumstances. It remains steady. It gives endurance. It reflects inner strength.`,
  },
  {
    term: "king of kings",
    notes: `King of Kings means highest authority. In the Bible, it shows supreme rule. All others are under Him. It reflects dominance. It shows ultimate leadership.`,
  },
  {
    term: "laborers are few",
    notes: `This phrase highlights lack of workers. In the Bible, it refers to the need for people to act. There is work to be done. Not many are willing. It reflects urgency.`,
  },
  {
    term: "latter rain",
    notes: `The latter rain comes at the end of a season. In the Bible, it represents final provision. It completes growth. It reflects timing. It shows fulfillment.`,
  },
  {
    term: "law and the prophets",
    notes: `This phrase summarizes Scripture. In the Bible, it includes instruction and message. It provides guidance. It reflects total teaching. It shows foundation of truth.`,
  },
  {
    term: "leaven of the pharisees",
    notes: `Leaven of the Pharisees represents influence. In the Bible, it often refers to hypocrisy. A little spreads quickly. It affects everything. It reflects hidden corruption.`,
  },
  {
    term: "lion of the tribe of Judah",
    notes: `This title represents strength and authority. In the Bible, it connects to kingship. It shows power. It reflects leadership. It shows identity.`,
  },
  {
    term: "man shall not live by bread alone",
    notes: `This phrase shows deeper need than food. In the Bible, life depends on more than physical things. It points to spiritual truth. It reflects dependence on God. It shows priority.`,
  },
  {
    term: "ministry of death",
    notes: `The ministry of death refers to law revealing sin. In the Bible, it shows consequence. It exposes wrongdoing. It reflects limitation of law. It shows need for grace.`,
  },
  {
    term: "oil of gladness",
    notes: `The oil of gladness represents joy. In the Bible, oil is linked to blessing. It shows celebration. It reflects happiness. It shows favor.`,
  },
  {
    term: "peace that passes understanding",
    notes: `This peace goes beyond human logic. In the Bible, it comes from God. It remains even in trouble. It reflects inner calm. It shows trust.`,
  },
  {
    term: "pearl of great price",
    notes: `This pearl represents great value. In the Bible, it shows something worth everything. It requires sacrifice. It reflects priority. It shows importance.`,
  },
  {
    term: "physician heal yourself",
    notes: `This phrase challenges credibility. In the Bible, it questions authority. It calls for proof. It reflects doubt. It shows expectation.`,
  },
  {
    term: "potsherd",
    notes: `A potsherd is a broken piece of pottery. In the Bible, it represents fragility. It shows brokenness. It reflects weakness. It shows human condition.`,
  },
  {
    term: "power of darkness",
    notes: `The power of darkness represents evil influence. In the Bible, it opposes truth. It works in hidden ways. It reflects corruption. It shows spiritual conflict.`,
  },
  {
    term: "pure religion",
    notes: `Pure religion is true practice of faith. In the Bible, it focuses on care and integrity. It is not just ritual. It reflects action. It shows sincerity.`,
  },
  {
    term: "refuge city",
    notes: `A refuge city was a place of safety. In the Bible, it protected those in danger. It allowed escape from harm. It reflected mercy. It showed protection.`,
  },
  {
    term: "refuge cities",
    notes: `Refuge cities were multiple safe places. In the Bible, they ensured access to protection. They prevented injustice. They reflected fairness. They showed provision.`,
  },
  {
    term: "renewing of your mind",
    notes: `Renewing the mind means changing thinking. In the Bible, it leads to transformation. It replaces wrong patterns. It reflects growth. It shows inner change.`,
  },
  {
    term: "robe of righteousness",
    notes: `This robe represents being made right. In the Bible, it shows covering. It reflects identity. It represents purity. It shows restoration.`,
  },
  {
    term: "rod and staff",
    notes: `The rod and staff guide and protect. In the Bible, they represent leadership. They correct and direct. They bring security. They reflect care.`,
  },
  {
    term: "schoolmaster",
    notes: `A schoolmaster guides learning. In the Bible, it refers to law teaching discipline. It prepares for growth. It reflects instruction. It shows guidance.`,
  },
  {
    term: "shield of faith",
    notes: `The shield of faith protects belief. In the Bible, it blocks attacks. It represents trust. It provides defense. It reflects security.`,
  },
  {
    term: "still small voice",
    notes: `The still small voice is quiet guidance. In the Bible, it shows God speaks gently. It requires attention. It reflects subtle direction. It shows clarity.`,
  },
  {
    term: "time of the gentiles",
    notes: `This phrase refers to a period. In the Bible, it shows inclusion of nations. It reflects timeline. It shows expansion. It marks transition.`,
  },
  {
    term: "treasure in heaven",
    notes: `Treasure in heaven is lasting value. In the Bible, it is not temporary. It reflects eternal focus. It shows priority. It represents true wealth.`,
  },
  {
    term: "tribulation saints",
    notes: `These are people enduring hardship. In the Bible, they remain faithful. They face difficulty. It reflects endurance. It shows perseverance.`,
  },
  {
    term: "true vine",
    notes: `The true vine is the source of life. In the Bible, it shows connection. Branches depend on it. It reflects relationship. It shows dependence.`,
  },
  {
    term: "washing of water by the word",
    notes: `This washing represents cleansing through truth. In the Bible, it transforms thinking. It purifies. It reflects renewal. It shows change.`,
  },
  {
    term: "wheat and tares",
    notes: `Wheat and tares grow together. In the Bible, they represent good and bad. They are separated later. It reflects judgment. It shows distinction.`,
  },
  {
    term: "white stone",
    notes: `A white stone represents acceptance. In the Bible, it shows approval. It reflects identity. It symbolizes victory. It shows recognition.`,
  },
  {
    term: "whole armor of God",
    notes: `The whole armor is full protection. In the Bible, it prepares for spiritual battle. Each part has purpose. It reflects readiness. It shows defense.`,
  },
  {
    term: "yoke is easy",
    notes: `This phrase shows light burden. In the Bible, it contrasts heavy struggle. It reflects rest. It shows relief. It points to grace.`,
  },
  {
    term: "zeal of the Lord",
    notes: `The zeal of the Lord is strong passion. In the Bible, it shows God's commitment. It drives action. It reflects intensity. It shows purpose.`,
  },
  {
    term: "Atoning",
    notes: `Atoning means covering wrongdoing. In the Bible, it restores relationship. It requires cost. It reflects reconciliation. It shows forgiveness.`,
  },
  {
    term: "Body discharge",
    notes: `Body discharge refers to impurity. In the Bible, it required cleansing. It showed need for purity. It reflects condition. It shows separation.`,
  },
  {
    term: "Boil",
    notes: `A boil is a painful swelling on the skin. In the Bible, it is often a sign of affliction or judgment. It causes discomfort and weakness. It reflects physical suffering. It shows the impact of hardship.`,
  },
  {
    term: "Burning sacrifice",
    notes: `A burning sacrifice is an offering completely consumed by fire. In the Bible, it represents total surrender to God. Nothing is held back. It shows devotion. It reflects complete dedication.`,
  },
  {
    term: "Candle",
    notes: `A candle provides light in darkness. In the Bible, it represents guidance and truth. It helps people see clearly. It reflects illumination. It shows direction.`,
  },
  {
    term: "Ceremonial",
    notes: `Ceremonial refers to formal acts of worship. In the Bible, ceremonies follow specific instructions. They are not casual. They reflect structure. They show reverence.`,
  },
  {
    term: "Ceremonial uncleanness",
    notes: `Ceremonial uncleanness is ritual impurity. In the Bible, it required cleansing before worship. It limited access to sacred spaces. It reflects separation. It shows the need for purification.`,
  },
  {
    term: "Cloven hoof",
    notes: `A cloven hoof is a divided foot in animals. In the Bible, it was used to distinguish clean from unclean animals. It showed order in dietary laws. It reflects classification. It shows distinction.`,
  },
  {
    term: "Consecrated",
    notes: `Consecrated means set apart for a sacred purpose. In the Bible, it involves dedication to God. It is not ordinary. It reflects holiness. It shows commitment.`,
  },
  {
    term: "Contamination",
    notes: `Contamination is the spreading of impurity. In the Bible, it affects cleanliness. It can spread quickly. It reflects danger. It shows need for separation.`,
  },
  {
    term: "Discharge",
    notes: `A discharge is a bodily flow. In the Bible, it made someone unclean. It required cleansing rituals. It reflects condition. It shows need for purification.`,
  },
  {
    term: "Distinction",
    notes: `Distinction means being set apart. In the Bible, it separates holy from common. It defines identity. It reflects difference. It shows clarity.`,
  },
  {
    term: "Drink offering",
    notes: `A drink offering is liquid poured out. In the Bible, it accompanies sacrifice. It shows dedication. It reflects giving. It shows devotion.`,
  },
  {
    term: "Eighth day",
    notes: `The eighth day marks a new beginning. In the Bible, it often follows completion. It represents renewal. It reflects transition. It shows continuation.`,
  },
  {
    term: "Fat",
    notes: `Fat was considered the best part of an offering. In the Bible, it was given to God. It symbolized richness. It reflects value. It shows dedication.`,
  },
  {
    term: "Festal",
    notes: `Festal refers to celebration. In the Bible, feasts marked important events. They brought people together. It reflects joy. It shows remembrance.`,
  },
  {
    term: "Fire offering",
    notes: `A fire offering is burned before God. In the Bible, it represents surrender. Fire consumes the offering. It reflects devotion. It shows sacrifice.`,
  },
  {
    term: "Forbidden",
    notes: `Forbidden means not allowed. In the Bible, it sets boundaries. Breaking it brings consequence. It reflects restriction. It shows authority.`,
  },
  {
    term: "Fringe",
    notes: `A fringe is a decorative edge. In the Bible, fringes had symbolic meaning. They reminded people of commands. It reflects identity. It shows remembrance.`,
  },
  {
    term: "Germ",
    notes: `A germ is something that spreads disease. In the Bible context, it relates to impurity. It shows contamination. It spreads quickly. It reflects danger.`,
  },
  {
    term: "Gleaming",
    notes: `Gleaming means shining brightly. In the Bible, it can describe purity or glory. It reflects brightness. It shows clarity. It represents excellence.`,
  },
  {
    term: "Holy offering",
    notes: `A holy offering is set apart for God. In the Bible, it is not ordinary. It reflects dedication. It shows reverence. It represents giving.`,
  },
  {
    term: "Holy priesthood",
    notes: `A holy priesthood is a group set apart to serve God. In the Bible, priests represent people before God. They carry responsibility. It reflects service. It shows dedication.`,
  },
  {
    term: "Issue",
    notes: `An issue is a condition or problem. In the Bible, it can refer to physical or spiritual matters. It requires attention. It reflects concern. It shows need for resolution.`,
  },
  {
    term: "Leprous",
    notes: `Leprous refers to having a skin disease. In the Bible, it caused separation. It required cleansing. It reflects impurity. It shows isolation.`,
  },
  {
    term: "Lump",
    notes: `A lump is a small mass. In the Bible, it can symbolize influence. A little can affect the whole. It reflects spread. It shows impact.`,
  },
  {
    term: "Meat offering",
    notes: `A meat offering is a grain offering. In the Bible, it represents provision. It is given to God. It reflects gratitude. It shows dedication.`,
  },
  {
    term: "Mildew",
    notes: `Mildew is a type of decay. In the Bible, it affects houses and garments. It spreads if not treated. It reflects corruption. It shows deterioration.`,
  },
  {
    term: "Ministration",
    notes: `Ministration is the act of serving. In the Bible, it refers to service in worship. It involves responsibility. It reflects dedication. It shows function.`,
  },
  {
    term: "Minister",
    notes: `A minister is one who serves. In the Bible, ministers carry out duties. They assist others. It reflects service. It shows responsibility.`,
  },
  {
    term: "Midwife",
    notes: `A midwife helps in childbirth. In the Bible, it reflects care and support. It assists new life. It shows responsibility. It reflects service.`,
  },
  {
    term: "Mold",
    notes: `Mold is a growth that causes decay. In the Bible, it required removal. It spreads over time. It reflects impurity. It shows deterioration.`,
  },
  {
    term: "Monthly feast",
    notes: `A monthly feast marked regular celebration. In the Bible, it followed cycles of time. It brought people together. It reflected rhythm. It showed remembrance.`,
  },
  {
    term: "Mourning",
    notes: `Mourning is expressing grief. In the Bible, it follows loss. It shows sorrow. It reflects emotional response. It allows healing.`,
  },
  {
    term: "New grain",
    notes: `New grain is the first harvest. In the Bible, it is offered to God. It represents provision. It reflects beginning. It shows gratitude.`,
  },
  {
    term: "Priestly",
    notes: `Priestly refers to duties of priests. In the Bible, it involves sacred service. It requires purity. It reflects responsibility. It shows dedication.`,
  },
  {
    term: "Sabbath year",
    notes: `The Sabbath year is a time of rest. In the Bible, land was not worked. It allowed recovery. It reflects trust. It shows obedience.`,
  },
  {
    term: "Sermon",
    notes: `A sermon is spoken teaching. In the Bible, it communicates truth. It guides people. It reflects instruction. It shows learning.`,
  },
  {
    term: "Sheaf",
    notes: `A sheaf is a bundle of grain. In the Bible, it represents harvest. It reflects provision. It shows gathering. It represents results.`,
  },
  {
    term: "Solemn rest",
    notes: `Solemn rest is a set time of stillness. In the Bible, it requires stopping work. It reflects reverence. It shows focus. It represents obedience.`,
  },
  {
    term: "Sprinkle",
    notes: `To sprinkle means to scatter lightly. In the Bible, it is used in cleansing rituals. It reflects purification. It shows application. It represents cleansing.`,
  },
  {
    term: "Sprinkling",
    notes: `Sprinkling is the act of applying liquid. In the Bible, it symbolizes atonement. It marks purification. It reflects cleansing. It shows ritual action.`,
  },
  {
    term: "Tassel",
    notes: `A tassel is a decorative thread. In the Bible, it reminded people of commands. It reflected identity. It showed obedience. It represented remembrance.`,
  },
  {
    term: "Trespass",
    notes: `Trespass is crossing a boundary. In the Bible, it refers to wrongdoing. It breaks rules. It reflects offense. It shows violation.`,
  },
  {
    term: "Trespass offering",
    notes: `A trespass offering addresses wrongdoing. In the Bible, it restores what was broken. It requires repayment. It reflects accountability. It shows restoration.`,
  },
  {
    term: "Uncleanness",
    notes: `Uncleanness is a state of impurity. In the Bible, it affects access to worship. It requires cleansing. It reflects separation. It shows condition.`,
  },
  {
    term: "Ash",
    notes: `Ash is what remains after burning. In the Bible, it can symbolize humility. It shows what is left. It reflects completion. It represents residue.`,
  },
  {
    term: "Atonement blood",
    notes: `Atonement blood covers sin. In the Bible, it restores relationship. It represents life given. It reflects sacrifice. It shows reconciliation.`,
  },
  {
    term: "Burning of fat",
    notes: `The burning of fat was part of offerings. In the Bible, it was given to God. It represented the best portion. It reflects value. It shows dedication.`,
  },
  {
    term: "Burning outside the camp",
    notes: `This refers to removal of impurity. In the Bible, certain things were burned outside. It separated what was unclean. It reflects cleansing. It shows removal.`,
  },
  {
    term: "Cedarwood",
    notes: `Cedarwood is a type of wood. In the Bible, it was used in cleansing rituals. It represents durability. It reflects purification. It shows strength.`,
  },
  {
    term: "Cleansed",
    notes: `Cleansed means made clean. In the Bible, it restores purity. It allows access again. It reflects renewal. It shows restoration.`,
  },
  {
    term: "Confess sin",
    notes: `To confess sin is to admit wrongdoing. In the Bible, it leads to forgiveness. It requires honesty. It reflects humility. It shows accountability.`,
  },
  {
    term: "Contagion",
    notes: `Contagion is the spread of disease. In the Bible, it represents impurity spreading. It affects others. It reflects danger. It shows need for separation.`,
  },
  {
    term: "Cutting off",
    notes: `Cutting off means removal or separation. In the Bible, it can be judgment. It shows loss of connection. It reflects consequence. It shows finality.`,
  },
  {
    term: "Dedicated",
    notes: `Dedicated means set apart for purpose. In the Bible, it reflects commitment to God. It is not ordinary. It shows devotion. It reflects focus.`,
  },
  {
    term: "Divided hoof",
    notes: `A divided hoof is a split foot. In the Bible, it distinguishes clean animals. It reflects classification. It shows separation. It represents distinction.`,
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
