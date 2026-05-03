import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Glean",
    notes: `Glean means to gather what is left behind after a harvest. In the Bible, this was allowed so the poor and needy could still have food. Farmers were told not to take everything for themselves. It created a system where people could work and still be provided for. It showed that provision was not just for the wealthy. Gleaning reflects God's heart for fairness and care for others.`,
  },
  {
    term: "Guiltless",
    notes: `Guiltless means being free from blame or wrongdoing. In the Bible, it often refers to someone who is innocent in a situation. Being declared guiltless meant no punishment was deserved. This was important in matters of justice. False accusations could not stand if someone was truly guiltless. It shows the importance of truth and fairness in judgment.`,
  },
  {
    term: "Hate",
    notes: `Hate in the Bible is more than emotion, it is a strong rejection. It can refer to turning away from something completely. Sometimes it describes rejecting sin or evil. Other times, it shows broken relationships between people. Hate leads to division and destruction. God calls people away from hatred and toward love and restoration.`,
  },
  {
    term: "Hear O Israel",
    notes: `"Hear O Israel" is a call for attention and obedience. It is not just about listening, but about responding to what God says. This phrase introduces important truth. It reminds people who God is and what He expects. It calls for focus and commitment. Hearing in this way means living out what you receive.`,
  },
  {
    term: "Help",
    notes: `Help is giving support to someone in need. In the Bible, help is often seen as strength given to those who are weak. God is described as a helper. People were also called to help each other. It is not just about feeling concern, but taking action. Help reflects care, unity, and responsibility toward others.`,
  },
  {
    term: "Idolater",
    notes: `An idolater is someone who worships something other than God. In the Bible, this includes statues, objects, or even desires placed above God. It shows misplaced loyalty. Idolatry pulls people away from truth. It replaces God with something created. An idolater chooses something temporary over what is eternal.`,
  },
  {
    term: "Jealous",
    notes: `Jealous in the Bible can mean protective, not just insecure. God is described as jealous because He desires exclusive loyalty. It is about relationship, not control. This kind of jealousy is about protecting what belongs to Him. It is not selfish, it is rightful. It shows that God takes commitment seriously.`,
  },
  {
    term: "Judge rightly",
    notes: `To judge rightly means to make fair and honest decisions. In the Bible, judgment was not based on favoritism or emotion. It required truth and wisdom. People were called to judge with integrity. Wrong judgment could harm others. Right judgment reflects justice and righteousness.`,
  },
  {
    term: "Justice system",
    notes: `The justice system is how laws are applied and enforced. In the Bible, this involved judges, elders, and clear laws. It was meant to protect fairness. Justice was not supposed to be biased. Everyone was to be treated equally. A strong justice system kept order and protected the community.`,
  },
  {
    term: "Kindness to stranger",
    notes: `Kindness to strangers means treating outsiders with care and respect. In the Bible, people were reminded that they were once strangers too. This created empathy. Strangers were not to be ignored or mistreated. They were to be protected and supported. This reflects God's heart for all people, not just insiders.`,
  },
  {
    term: "Kingship",
    notes: `Kingship refers to the role and authority of a king. In the Bible, kings were meant to lead under God's authority. They were not above the law. A good king brought justice and stability. A bad king led people away from God. Kingship shows the responsibility that comes with leadership.`,
  },
  {
    term: "Land inheritance",
    notes: `Land inheritance is the passing down of land within a family. In the Bible, land was tied to identity and promise. Each tribe had a portion given by God. It was not just property, it was part of God's plan. Losing it was a serious matter. Inheritance connected generations and maintained stability.`,
  },
  {
    term: "Liberation",
    notes: `Liberation means being set free from oppression. In the Bible, this is seen when God frees people from slavery. It is both physical and spiritual. Liberation shows God's power to restore and rescue. It brings new beginnings. It reminds people that they are not meant to stay in bondage.`,
  },
  {
    term: "Life and death",
    notes: `Life and death represent the outcomes of choices. In the Bible, people are often told to choose life by following God. Death comes through disobedience. This is not just physical, but spiritual. It reflects direction and consequence. Every choice leads somewhere, either toward life or away from it.`,
  },
  {
    term: "Listening",
    notes: `Listening is active attention, not passive hearing. In the Bible, listening to God requires response. It is not enough to hear, you must act. Listening shows humility and openness. It allows truth to shape you. Without action, listening has no real impact.`,
  },
  {
    term: "Migration",
    notes: `Migration is moving from one place to another. In the Bible, people often migrated because of famine, calling, or conflict. It was part of God's plan. Movement was not always random. It shaped history and identity. Migration shows that God works even through change and transition.`,
  },
  {
    term: "Pardon",
    notes: `A pardon is the release from punishment. In the Bible, it reflects forgiveness. Someone guilty is given mercy instead of judgment. Pardon does not mean the wrong did not happen. It means it is not held against the person. It shows grace and the possibility of restoration.`,
  },
  {
    term: "Preserve",
    notes: `To preserve means to protect and keep something safe. In the Bible, God preserves people and promises. He ensures that what matters is not lost. Preservation shows care and intention. It is not random. God's ability to preserve brings stability and hope.`,
  },
  {
    term: "Pure",
    notes: `Pure means clean and without corruption. In the Bible, purity is both physical and spiritual. It reflects integrity and sincerity. Being pure is about alignment with what is right. It is not just outward appearance. Purity shows a heart that is set on God.`,
  },
  {
    term: "Refusal",
    notes: `Refusal is choosing not to accept or do something. In the Bible, refusal can be either good or bad. It depends on what is being rejected. Refusing sin is strength. Refusing truth is rebellion. It shows that decisions shape direction.`,
  },
  {
    term: "Reign",
    notes: `To reign means to rule with authority. In the Bible, kings and God Himself reign. It shows control and leadership. Reigning involves responsibility, not just power. It reflects authority over a people or situation.`,
  },
  {
    term: "Renew",
    notes: `To renew means to make something new again. In the Bible, this often refers to restoration. God renews people, strength, and promises. Renewal brings fresh start and direction. It is not just repair, it is transformation. It shows that change is possible.`,
  },
  {
    term: "Repayment",
    notes: `Repayment is giving back what is owed. In the Bible, it reflects justice and balance. Good or bad actions are repaid. Nothing is ignored or forgotten. Repayment completes the cycle. It shows that actions have consequences.`,
  },
  {
    term: "Responsibility",
    notes: `Responsibility is being accountable for your actions. In the Bible, people were expected to own what they did. There were no excuses. Responsibility shows maturity and awareness. It connects actions to consequences.`,
  },
  {
    term: "Retribution",
    notes: `Retribution is punishment given in return for wrongdoing. In the Bible, it reflects justice, not revenge. It is measured and fair. Retribution shows that wrong actions are addressed. It maintains order and accountability.`,
  },
  {
    term: "Sacred assembly",
    notes: `A sacred assembly is a gathering set apart for God. In the Bible, people came together for worship and reflection. It was not a casual meeting. It required focus and reverence. It brought the community together before God.`,
  },
  {
    term: "Sacred offering",
    notes: `A sacred offering is something given to God. It is set apart and not treated as ordinary. Offerings showed devotion and obedience. They were given with purpose and meaning. It reflects surrender and commitment.`,
  },
  {
    term: "Serve",
    notes: `To serve means to act for the benefit of someone else. In the Bible, serving God and others is a core principle. It requires humility. Service is not about status, it is about action. It reflects love through what you do.`,
  },
  {
    term: "Shelter",
    notes: `Shelter is protection and safety. In the Bible, God is often described as a shelter. He provides security in danger. Shelter is both physical and spiritual. It represents safety, care, and covering.`,
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
