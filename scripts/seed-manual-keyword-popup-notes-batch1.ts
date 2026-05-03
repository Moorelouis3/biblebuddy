import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Abomination of Desolation",
    notes: `This is a moment where something extremely unholy is set up in a place that is supposed to be holy. It is not just sin, it is disrespecting God in the worst possible way. In the Bible, it is often tied to the Temple being defiled. Think of it as crossing a line that should never be crossed. Jesus talks about it as a sign of coming judgment. It is meant to wake people up, not confuse them. When you see it, it means something serious is happening spiritually.`,
  },
  {
    term: "Blood Avenger",
    notes: `A blood avenger was a person responsible for bringing justice when someone in their family was killed. This was not random revenge, it was part of the justice system back then. Life was taken seriously, and blood had a cost. God even set up cities of refuge to prevent wrongful punishment. So it was controlled, not chaos. It shows how seriously God views life. Justice mattered, but so did fairness.`,
  },
  {
    term: "Covenant Curse",
    notes: `A covenant curse is what happens when people break their agreement with God. God made promises, but they came with responsibility. If the people obeyed, they were blessed. If they turned away, consequences followed. These curses were not random, they were warnings fulfilled. It shows that God is consistent. He keeps His word on both sides. It is not just punishment, it is accountability.`,
  },
  {
    term: "Eunuch",
    notes: `A eunuch was a man who could not have children, often because of physical alteration. Many served in royal courts because they were seen as trustworthy. They did not have family ties that could distract them. In the Bible, eunuchs are also used to show that God includes everyone. Even those who felt cut off had a place with Him. It breaks the idea that only certain people belong. God looks beyond status and ability. He cares about the heart.`,
  },
  {
    term: "Honor and Shame Culture",
    notes: `This is how society functioned in biblical times. Everything was about honor or shame, not just right or wrong. Your actions reflected on your entire family. Respect, reputation, and public image mattered deeply. Shame was not just personal, it was communal. This helps explain a lot of decisions people made in the Bible. People were trying to protect honor or avoid disgrace. Understanding this changes how you read many stories.`,
  },
  {
    term: "Inheritance Allotment",
    notes: `This refers to how land and possessions were divided among families. God gave specific portions to each tribe of Israel. It was not random, it was intentional. Land meant identity, stability, and future. Losing your allotment was a big deal. It was tied to God’s promise. This shows how God provides structure and order. Everyone had a place.`,
  },
  {
    term: "Inheritance Rights",
    notes: `These are the rights someone has to receive what is passed down from their family. Usually, the firstborn son had a larger portion. This is why birthright mattered so much. It was not just money, it was responsibility and legacy. We see people fight over this in the Bible. It shaped families and nations. It also points to spiritual inheritance through God. What you receive is tied to who you belong to.`,
  },
  {
    term: "Millennium",
    notes: `This refers to a thousand year period mentioned in Revelation. It is often understood as a time when Christ reigns. Different people interpret it differently, but the core idea is rule and restoration. It represents a time of peace and authority under God. Evil is restrained during this period. It shows that God’s plan includes order and justice. It is not chaos forever. God has a timeline.`,
  },
  {
    term: "Millstone",
    notes: `A millstone was a heavy stone used to grind grain into flour. It was massive and not something you could easily move. Jesus uses it as a symbol of serious judgment. He says it would be better to have one tied around your neck than to lead others into sin. That shows how serious influence is. It is about responsibility. What you do affects others.`,
  },
  {
    term: "Nazirite",
    notes: `A Nazirite made a special vow to God for a period of time. They would not cut their hair, drink wine, or touch anything dead. It was a way of being set apart. Samson is the most famous example. This vow was about dedication and discipline. It showed outward commitment to God. It was not about perfection, but intention. Living differently for God on purpose.`,
  },
  {
    term: "New Covenant",
    notes: `The New Covenant is the promise God made through Jesus. Instead of laws written on stone, it is written on the heart. It is about relationship, not just rules. Jesus fulfilled what the old system pointed to. Forgiveness became personal and accessible. It is based on grace, not performance. God comes closer to people through this covenant. It changes everything.`,
  },
  {
    term: "New Exodus Pattern",
    notes: `This is the idea that God repeats the rescue story from Egypt in new ways. Just like He delivered Israel, He delivers people again. Jesus is seen as leading a greater exodus. Not from physical slavery, but from sin. You see patterns of wilderness, testing, and redemption. God moves in consistent ways. History is not random. It builds on itself.`,
  },
  {
    term: "Ordination",
    notes: `Ordination is when someone is set apart for a specific role in serving God. It often involves a public act or ceremony. It is not just a title, it is a responsibility. People are chosen and prepared for a purpose. In the Bible, priests and leaders were ordained. It shows that leadership is intentional. Not everyone steps into it casually. It carries weight.`,
  },
  {
    term: "Outer Court",
    notes: `The outer court was part of the Temple area where people could gather. It was more accessible than the inner sections. This is where many people would come to worship. It shows levels of closeness in the Temple system. Not everyone could go deeper. It represents access, but also limitation. God was near, but still set apart. It pointed to something greater coming.`,
  },
  {
    term: "Paradise",
    notes: `Paradise represents a place of peace and presence with God. Jesus uses the word when speaking about the afterlife. It is not just a location, it is a state of being with God. It reflects restoration and rest. The idea connects back to Eden. What was lost is being restored. It gives hope beyond this life. God’s presence is the goal.`,
  },
  {
    term: "Plunder",
    notes: `Plunder is what is taken after victory in battle. It includes goods, wealth, and possessions. In the Bible, it often follows conquest. Sometimes God allowed it, sometimes He restricted it. It tested obedience. People could not just take whatever they wanted. It showed that even victory had boundaries. Not everything gained is meant to be kept.`,
  },
  {
    term: "Price of a Slave",
    notes: `This refers to the value placed on a slave in ancient times. It shows how low human life could be valued in that system. Jesus was betrayed for this price. That connection is intentional. It highlights injustice and rejection. Something priceless was treated as cheap. It shows the depth of what Jesus endured. And how broken people can be.`,
  },
  {
    term: "Priesthood",
    notes: `The priesthood was a group set apart to serve between God and the people. They handled sacrifices and rituals. Their role was serious and structured. Not everyone could do it. They represented the people before God. It showed the need for mediation. In the New Testament, this idea expands to all believers. Access to God becomes personal.`,
  },
  {
    term: "Priestly Garments",
    notes: `These were special clothes worn by priests during their service. Every piece had meaning. Colors, materials, and design all symbolized something. It was not about fashion, it was about purpose. The garments showed holiness and separation. They reminded people that approaching God was serious. Even appearance reflected responsibility.`,
  },
  {
    term: "Redemption Clause",
    notes: `This is a provision that allows something lost to be bought back. It shows up in laws about land and people. God built restoration into the system. Loss was not always final. There was a way back. It points to the bigger idea of redemption in Christ. Being bought back and restored. Nothing is beyond recovery with God.`,
  },
  {
    term: "Redemption Document",
    notes: `This is a legal record that proves something has been redeemed or bought back. It confirmed ownership and restoration. These documents made things official. It was not just talk, it was action. In a spiritual sense, it reflects what God does for us. Redemption is not vague. It is real and complete.`,
  },
  {
    term: "Spiritist",
    notes: `A spiritist is someone who tries to communicate with spirits or the dead. The Bible strongly warns against this. It is not seen as harmless. It opens doors that should stay closed. People were told to avoid it completely. God wants people to come to Him, not other sources. It is about trust and direction.`,
  },
  {
    term: "Zealot",
    notes: `A zealot was someone extremely passionate about their beliefs, especially politically and religiously. In Jesus’ time, zealots wanted to overthrow Roman rule. They were intense and driven. One of Jesus’ disciples was called a zealot. It shows that Jesus called people from all backgrounds. Passion is not the problem. Direction is.`,
  },
  {
    term: "Beelzebul",
    notes: `Beelzebul is a name used for a high ranking demon or Satan. It represents evil authority. People accused Jesus of working through this power. That accusation was serious and wrong. Jesus flipped it and exposed their misunderstanding. It shows how people can misinterpret spiritual authority. Not everything powerful is from God. Discernment matters.`,
  },
  {
    term: "Abstain",
    notes: `To abstain means to choose not to do something. It is about self control and discipline. In the Bible, it often refers to avoiding sin. It is not just restriction, it is protection. You are choosing something better. It shows maturity and awareness. Not everything is worth engaging in.`,
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
