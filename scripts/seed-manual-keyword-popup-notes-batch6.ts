import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Law of witness",
    notes: `The law of witness is the rule about giving testimony. In the Bible, truth had to be confirmed by more than one witness. This protected people from false accusations. It made sure judgment was not based on one person's word. Witnesses carried responsibility for what they said. This law shows how important truth and fairness are in justice.`,
  },
  {
    term: "Life command",
    notes: `A life command is an instruction meant to lead to life. In the Bible, God's commands were not just rules, they were guidance for living well. Following them brought stability, protection, and purpose. Ignoring them led to destruction. It shows that obedience is connected to life, not restriction.`,
  },
  {
    term: "Moral law",
    notes: `Moral law defines what is right and wrong. In the Bible, it reflects God's character and standards. It applies beyond culture or time. It guides behavior and decisions. Moral law creates accountability and direction for how people live.`,
  },
  {
    term: "National covenant",
    notes: `A national covenant is an agreement between God and a nation. In the Bible, Israel entered into covenant with God as a people. This defined their identity and responsibility. It included promises and conditions. The whole nation was accountable to it, not just individuals.`,
  },
  {
    term: "Obedient heart",
    notes: `An obedient heart is a mindset that chooses to follow God. In the Bible, obedience is not just action, it starts inside. A willing heart responds quickly and sincerely. It shows trust and humility. True obedience is not forced, it is chosen.`,
  },
  {
    term: "Public reading",
    notes: `Public reading is when Scripture is read out loud to a group. In the Bible, this helped people hear and understand God's word. Not everyone had access to written copies. It created shared understanding and accountability. Public reading made truth known to everyone.`,
  },
  {
    term: "Royal law",
    notes: `The royal law is the highest guiding principle. In the Bible, it points to loving others rightly. It reflects God's heart for relationships. This law goes beyond rules and focuses on intention. It shapes how people treat each other.`,
  },
  {
    term: "Sanctuary law",
    notes: `Sanctuary law refers to rules about sacred spaces. In the Bible, places set apart for God had specific guidelines. They were not to be treated like ordinary places. This showed respect for God's presence. It created boundaries and order in worship.`,
  },
  {
    term: "Shema",
    notes: `The Shema is a central declaration of faith. In the Bible, it calls people to hear and respond to God. It emphasizes loving God fully. It is not just words, it is a commitment. The Shema shapes identity and devotion.`,
  },
  {
    term: "Social justice",
    notes: `Social justice is fairness in how people are treated. In the Bible, it includes protecting the weak and vulnerable. It is not just personal, it is community based. Everyone is to be treated with dignity. Justice is part of God's character.`,
  },
  {
    term: "Statutory law",
    notes: `Statutory law refers to specific written rules. In the Bible, these laws gave clear instructions. They covered daily life and behavior. They were meant to be followed consistently. Statutory law created structure and clarity.`,
  },
  {
    term: "Stern warning",
    notes: `A stern warning is a serious and direct caution. In the Bible, warnings were given to prevent harm. They were not casual or soft. Ignoring them led to consequences. They showed urgency and importance.`,
  },
  {
    term: "Temple worship",
    notes: `Temple worship is how people approached God in a sacred place. In the Bible, it involved sacrifice, prayer, and ritual. It followed specific guidelines. Worship was structured and intentional. It showed reverence for God's presence.`,
  },
  {
    term: "Test of loyalty",
    notes: `A test of loyalty reveals true commitment. In the Bible, people were tested to see if they would stay faithful. These moments showed what was really in the heart. Loyalty is proven through action. Tests separate words from reality.`,
  },
  {
    term: "The Lord your God",
    notes: `"The Lord your God" is a personal way of referring to God. In the Bible, it emphasizes relationship, not distance. It shows that God is not just powerful, but connected. This phrase reminds people who they belong to. It calls for trust and obedience.`,
  },
  {
    term: "Whole heart",
    notes: `Whole heart means complete devotion. In the Bible, loving God requires everything, not just part. It is not divided or distracted. It shows sincerity and focus. A whole heart holds nothing back.`,
  },
  {
    term: "Whole soul",
    notes: `Whole soul refers to full inner commitment. In the Bible, it goes beyond actions to identity. It involves mind, will, and emotion. It shows depth of devotion. Serving God involves your entire being.`,
  },
  {
    term: "False report",
    notes: `A false report is spreading something untrue. In the Bible, this was strongly warned against. It damages trust and relationships. It can lead to injustice. Truth matters in every situation.`,
  },
  {
    term: "Fire from the Lord",
    notes: `Fire from the Lord represents God's power. In the Bible, it can mean judgment or approval. It was visible and undeniable. It showed that God was active. Fire symbolized His presence and authority.`,
  },
  {
    term: "Flock",
    notes: `A flock refers to a group of animals, usually sheep. In the Bible, it often represents people. Leaders are compared to shepherds. The flock depends on guidance and care. It shows the need for direction and protection.`,
  },
  {
    term: "Forgiving",
    notes: `Forgiving means releasing someone from a wrong. In the Bible, forgiveness reflects God's character. It is not ignoring the offense. It is choosing not to hold it against someone. Forgiveness restores relationships.`,
  },
  {
    term: "Gathering",
    notes: `A gathering is people coming together. In the Bible, gatherings were for worship, teaching, or community. They created unity and shared purpose. Being together strengthened faith. It was intentional, not random.`,
  },
  {
    term: "Glorify",
    notes: `To glorify means to honor and give credit. In the Bible, it is about recognizing God's greatness. It is shown through words and actions. Glorifying God points attention to Him. It reflects respect and acknowledgment.`,
  },
  {
    term: "Hardness of heart",
    notes: `Hardness of heart means being resistant to truth. In the Bible, it describes stubbornness and refusal to change. It blocks understanding and growth. A hard heart rejects correction. It leads to distance from God.`,
  },
  {
    term: "Healing serpent",
    notes: `The healing serpent refers to a specific event in the wilderness. In the Bible, a bronze serpent was lifted up for people to look at. Those who looked were healed. It showed faith and obedience. This event pointed to deeper spiritual truth about healing and salvation.`,
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
