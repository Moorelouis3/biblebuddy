import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Holy ritual",
    notes: `Holy ritual is a structured act set apart for worship. In the Bible, rituals followed specific instructions and were not done casually. They helped people approach God with reverence. Every action had meaning and purpose. Rituals created order in worship. They reminded people that God is holy and must be approached rightly.`,
  },
  {
    term: "Holy trumpet",
    notes: `A holy trumpet was used for sacred purposes. In the Bible, trumpets signaled gatherings, movement, or important moments. They were not just instruments, but tools of communication. They marked times of worship and action. The sound carried meaning and direction. It showed that even sound could be set apart for God.`,
  },
  {
    term: "Levite duty",
    notes: `Levite duty refers to the responsibilities of the Levites. In the Bible, they were set apart to serve in the tabernacle. They handled sacred tasks. Their work was structured and specific. They supported the priesthood. Levite duty required discipline and commitment.`,
  },
  {
    term: "Life blood",
    notes: `Life blood represents the source of life. In the Bible, blood was closely connected to life itself. It was treated with seriousness. It was used in sacrifice and atonement. Life blood showed that life has value. It could not be treated casually.`,
  },
  {
    term: "Morning offering",
    notes: `The morning offering was a daily sacrifice. In the Bible, it started the day with worship. It created a rhythm of devotion. It reminded people to focus on God first. It was consistent and intentional. This offering showed daily commitment.`,
  },
  {
    term: "Offerer",
    notes: `The offerer is the person bringing a sacrifice. In the Bible, the offerer had responsibility in the process. It was not just the priest's role. They were involved in presenting the offering. It showed personal accountability. Worship required participation, not just observation.`,
  },
  {
    term: "Offering by fire",
    notes: `An offering by fire was burned on the altar. In the Bible, it symbolized giving something completely to God. Fire represented transformation and surrender. Nothing was held back. It showed full devotion.`,
  },
  {
    term: "Priestly blessing",
    notes: `The priestly blessing was spoken over the people. In the Bible, priests declared God's favor and protection. It was not just words, but a meaningful act. It reminded people of God's care. Blessing connected the people to God.`,
  },
  {
    term: "Purification water",
    notes: `Purification water was used for cleansing. In the Bible, it removed impurity in a symbolic way. It prepared people for worship. Water represented renewal. It showed the need to be clean before God.`,
  },
  {
    term: "Red heifer",
    notes: `The red heifer was part of a specific purification process. In the Bible, it was used in a unique ritual for cleansing. Its ashes were mixed with water. It dealt with impurity in a detailed way. This process showed how seriously purity was taken.`,
  },
  {
    term: "Sacred inheritance",
    notes: `Sacred inheritance is something passed down that belongs to God. In the Bible, it was not just property, but purpose. It connected generations. It carried responsibility. It showed that what is given must be honored.`,
  },
  {
    term: "Sacred tent",
    notes: `The sacred tent refers to the tabernacle. In the Bible, it was where God's presence dwelled among the people. It was carefully constructed. It was not treated as ordinary space. It represented closeness to God.`,
  },
  {
    term: "Sanctuary veil",
    notes: `The sanctuary veil separated spaces in the tabernacle. In the Bible, it divided the holy from the most holy place. It showed that access to God was limited. The veil represented separation. It emphasized God's holiness.`,
  },
  {
    term: "Second generation",
    notes: `The second generation refers to those who came after the first group. In the Bible, they often carried forward what was started. They had a new opportunity to respond. Their actions shaped the future. It showed that history continues through people.`,
  },
  {
    term: "Separation vow",
    notes: `A separation vow is a commitment to be set apart. In the Bible, it involved specific actions and restrictions. It showed dedication to God. It required discipline. Separation created distinction.`,
  },
  {
    term: "Silver trumpets",
    notes: `Silver trumpets were used for communication. In the Bible, they signaled movement, assembly, or war. They were made for specific use. Their sound carried meaning. They guided the people's actions.`,
  },
  {
    term: "Sin of rebellion",
    notes: `Sin of rebellion is deliberate disobedience. In the Bible, it is rejecting authority knowingly. It is not accidental. Rebellion shows resistance to God. It carries serious consequences.`,
  },
  {
    term: "Solemn feast",
    notes: `A solemn feast is a set time of gathering. In the Bible, it was marked by seriousness and purpose. It was not just celebration, but reflection. People came together intentionally. It created shared focus on God.`,
  },
  {
    term: "Spirit of jealousy",
    notes: `A spirit of jealousy refers to suspicion or insecurity. In the Bible, it is connected to testing loyalty. It reveals hidden concerns. Jealousy can lead to conflict. It shows instability in trust.`,
  },
  {
    term: "Sprinkled blood",
    notes: `Sprinkled blood was part of ritual cleansing. In the Bible, it symbolized atonement. It showed that sin had to be addressed. Blood represented life. Sprinkling marked purification.`,
  },
  {
    term: "Tabernacle court",
    notes: `The tabernacle court was the outer area of the tabernacle. In the Bible, people entered this space for worship. It was accessible but still sacred. It connected people to the inner areas. It showed levels of approach to God.`,
  },
  {
    term: "Temple service",
    notes: `Temple service refers to activities in worship. In the Bible, it included sacrifice, prayer, and duties. It followed structure and order. Service was not casual. It reflected devotion and discipline.`,
  },
  {
    term: "Tenth portion",
    notes: `The tenth portion refers to giving one tenth. In the Bible, it was part of giving back to God. It showed trust and obedience. It supported the community. It reflected acknowledgment of provision.`,
  },
  {
    term: "Trumpet blast",
    notes: `A trumpet blast was a loud signal. In the Bible, it marked important moments. It called people to attention. It signaled action or gathering. It carried urgency and meaning.`,
  },
  {
    term: "Unintentional sin",
    notes: `Unintentional sin is wrongdoing done without awareness. In the Bible, it was still taken seriously. There were ways to deal with it. It showed that even unknown actions matter. It required correction and cleansing.`,
  },
  {
    term: "Water from rock",
    notes: `Water from rock refers to God providing in an impossible way. In the Bible, water came from a rock in the wilderness. It showed God's power and provision. It met a real need. It reminded people to trust Him.`,
  },
  {
    term: "Wave offering",
    notes: `A wave offering was lifted and presented before God. In the Bible, it symbolized giving something back. It was a physical act with meaning. It showed acknowledgment of God's provision. It was part of structured worship.`,
  },
  {
    term: "Foolish",
    notes: `Foolish means lacking wisdom. In the Bible, foolishness is ignoring truth. It leads to poor decisions. It shows lack of understanding. Foolish actions bring negative results.`,
  },
  {
    term: "Fountain",
    notes: `A fountain is a source of flowing water. In the Bible, it represents life and renewal. It shows continuous provision. A fountain does not run dry easily. It symbolizes something that gives life.`,
  },
  {
    term: "Friend",
    notes: `A friend is someone you trust and connect with. In the Bible, friendship is built on loyalty and honesty. A true friend supports and corrects. It is not based on convenience. Friendship reflects care and commitment.`,
  },
  {
    term: "Fruit",
    notes: `Fruit represents results or outcomes. In the Bible, it shows what comes from a person's life. Good fruit reflects good character. Bad fruit shows problems within. Fruit reveals what is really inside.`,
  },
  {
    term: "Gain",
    notes: `Gain is what is received or achieved. In the Bible, not all gain is good. Some gain comes at a cost. It requires wisdom to understand value. True gain aligns with God's purpose.`,
  },
  {
    term: "Garland",
    notes: `A garland is a decorative crown or wreath. In the Bible, it can symbolize honor or victory. It represents recognition. It is given as a sign of value. Garlands reflect achievement or blessing.`,
  },
  {
    term: "Generations",
    notes: `Generations refer to people across time. In the Bible, actions affect future generations. Patterns can continue forward. It shows connection between past and future. Generations carry legacy.`,
  },
  {
    term: "Generous",
    notes: `Generous means giving freely. In the Bible, generosity reflects trust in God. It is not forced. It helps others and builds community. Generosity shows a giving heart.`,
  },
  {
    term: "Glutton",
    notes: `A glutton is someone who overindulges. In the Bible, this shows lack of control. It is not just about food, but excess. It reflects imbalance. Self control is valued instead.`,
  },
  {
    term: "Gossip",
    notes: `Gossip is spreading information unnecessarily. In the Bible, it damages trust and relationships. It often distorts truth. Gossip creates division. Words should be used carefully.`,
  },
  {
    term: "Greedy",
    notes: `Greedy means always wanting more. In the Bible, greed shows lack of contentment. It focuses on self gain. It can lead to harmful choices. Contentment is the opposite of greed.`,
  },
  {
    term: "Grief",
    notes: `Grief is deep sorrow. In the Bible, people experienced grief in loss. It is a real and human response. Grief shows the weight of relationships. God meets people in their grief.`,
  },
  {
    term: "Guidance",
    notes: `Guidance is direction given for a path. In the Bible, God provides guidance. It helps people make decisions. Guidance requires listening and trust. It leads to the right direction.`,
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
