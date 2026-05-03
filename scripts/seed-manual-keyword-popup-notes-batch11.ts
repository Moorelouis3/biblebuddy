import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Guile",
    notes: `Guile is deception or hidden dishonesty. In the Bible, it refers to someone who speaks or acts with trickery. It is not always obvious on the surface. Guile hides truth to gain advantage. It breaks trust and damages relationships. A person without guile is honest and straightforward.`,
  },
  {
    term: "Harsh",
    notes: `Harsh means rough or severe in words or actions. In the Bible, harshness often leads to conflict. It can damage relationships and create distance. Gentleness is often shown as the better way. Harsh behavior lacks patience and understanding.`,
  },
  {
    term: "Highway",
    notes: `A highway is a clear and direct path. In the Bible, it often symbolizes a prepared way. It represents direction and access. A highway is meant to be traveled easily. It shows movement toward a destination.`,
  },
  {
    term: "Honor",
    notes: `Honor means showing respect and value. In the Bible, people are called to honor God and others. It reflects humility and recognition. Honor builds strong relationships. It shows that someone is valued.`,
  },
  {
    term: "Hope",
    notes: `Hope is confident expectation for the future. In the Bible, hope is rooted in God's promises. It is not wishful thinking. Hope gives strength during difficulty. It keeps people moving forward.`,
  },
  {
    term: "Humble",
    notes: `Humble means having a low view of oneself. In the Bible, humility is strength, not weakness. It allows someone to learn and grow. A humble person does not seek attention. Humility creates openness and wisdom.`,
  },
  {
    term: "Humiliation",
    notes: `Humiliation is being brought low or shamed. In the Bible, it can come from failure or correction. It exposes pride. Humiliation can lead to growth if responded to correctly. It shows the result of being brought down.`,
  },
  {
    term: "Increase",
    notes: `Increase means growth or multiplication. In the Bible, increase often comes from God's blessing. It can apply to resources, influence, or people. Increase shows expansion. It reflects development over time.`,
  },
  {
    term: "Indolence",
    notes: `Indolence means laziness or lack of effort. In the Bible, it is warned against. It leads to lack and missed opportunity. Indolence shows a lack of discipline. Diligence is the opposite.`,
  },
  {
    term: "Insight",
    notes: `Insight is deep understanding. In the Bible, it goes beyond surface knowledge. Insight helps people see clearly. It guides better decisions. It comes through wisdom and reflection.`,
  },
  {
    term: "Joy",
    notes: `Joy is a deep sense of gladness. In the Bible, joy is not dependent on circumstances. It comes from relationship with God. Joy gives strength and stability. It remains even during difficulty.`,
  },
  {
    term: "Justice",
    notes: `Justice is fairness in action. In the Bible, justice means treating people rightly. It protects the weak and holds people accountable. God values justice deeply. It creates order in society.`,
  },
  {
    term: "Kind",
    notes: `Kind means showing care and consideration. In the Bible, kindness reflects God's character. It is shown through actions, not just words. Kindness builds connection. It softens difficult situations.`,
  },
  {
    term: "Lack",
    notes: `Lack means not having enough. In the Bible, lack can be physical or spiritual. It creates need and dependence. It reminds people to trust God. Lack is not always permanent.`,
  },
  {
    term: "Lamp",
    notes: `A lamp provides light in darkness. In the Bible, it often represents guidance. A lamp helps people see where to go. It brings clarity. It symbolizes truth.`,
  },
  {
    term: "Law",
    notes: `Law is a set of rules or instructions. In the Bible, God's law defines right and wrong. It brings structure to life. Law creates accountability. It guides behavior.`,
  },
  {
    term: "Learning",
    notes: `Learning is gaining knowledge and understanding. In the Bible, learning is a process. It requires humility and effort. Learning leads to growth. It shapes how people think and act.`,
  },
  {
    term: "Life",
    notes: `Life is existence and being. In the Bible, life is a gift from God. It includes physical and spiritual aspects. True life is connected to God. It has purpose and direction.`,
  },
  {
    term: "Light",
    notes: `Light represents truth and clarity. In the Bible, light removes darkness. It reveals what is hidden. Light guides and protects. It symbolizes God's presence.`,
  },
  {
    term: "Lips",
    notes: `Lips represent speech. In the Bible, what comes from the lips matters. Words can build or destroy. Speech reflects what is inside. Lips should be used wisely.`,
  },
  {
    term: "Longing",
    notes: `Longing is a deep desire. In the Bible, it often points toward something meaningful. Longing can lead people toward God. It shows what the heart values. Desire shapes direction.`,
  },
  {
    term: "Loss",
    notes: `Loss is the absence of something once had. In the Bible, loss can be physical or emotional. It creates grief and reflection. Loss shows what mattered. It can lead to growth or change.`,
  },
  {
    term: "Lot",
    notes: `A lot is a portion or share. In the Bible, lots were sometimes cast to make decisions. It represented outcome or assignment. A person's lot showed their portion. It connected to direction and placement.`,
  },
  {
    term: "Lovingkindness",
    notes: `Lovingkindness is faithful love. In the Bible, it reflects God's steady care. It is not temporary or shallow. It combines love and loyalty. It shows commitment over time.`,
  },
  {
    term: "Lying",
    notes: `Lying is speaking what is not true. In the Bible, it is strongly warned against. It breaks trust and damages relationships. Truth is essential. Lying leads to harm.`,
  },
  {
    term: "Meek",
    notes: `Meek means gentle and controlled. In the Bible, it is strength under control. It is not weakness. Meek people choose restraint. It shows discipline.`,
  },
  {
    term: "Mind",
    notes: `The mind is where thoughts are formed. In the Bible, the mind shapes actions. What you think affects how you live. A focused mind brings clarity. It must be guided properly.`,
  },
  {
    term: "Mockery",
    notes: `Mockery is making fun of someone. In the Bible, it shows disrespect. It can harm and divide. Mockery reflects pride. It lacks compassion.`,
  },
  {
    term: "Mother",
    notes: `A mother is a source of care and guidance. In the Bible, mothers play an important role. They shape and teach. They provide support. Their influence is lasting.`,
  },
  {
    term: "Mouth",
    notes: `The mouth is used for speaking. In the Bible, it represents expression. Words have power. They reveal the heart. The mouth must be controlled.`,
  },
  {
    term: "Naive",
    notes: `Naive means lacking experience or awareness. In the Bible, naive people are easily misled. They need guidance and wisdom. Naivety can lead to mistakes. Growth requires learning.`,
  },
  {
    term: "Neighbor",
    notes: `A neighbor is someone near you. In the Bible, it includes more than location. It refers to how you treat others. Neighbors are to be cared for. It reflects relationships.`,
  },
  {
    term: "Net",
    notes: `A net is used to catch something. In the Bible, it can symbolize traps. People can be caught unaware. It shows danger or capture. Awareness helps avoid it.`,
  },
  {
    term: "Oil",
    notes: `Oil is used for anointing and provision. In the Bible, it represents blessing. It is also used in daily life. Oil has both practical and symbolic meaning. It shows value and purpose.`,
  },
  {
    term: "Oppression",
    notes: `Oppression is unfair treatment or control. In the Bible, it is strongly condemned. It harms the vulnerable. God opposes oppression. Justice seeks to remove it.`,
  },
  {
    term: "Partiality",
    notes: `Partiality is showing favoritism. In the Bible, it is considered wrong. Everyone is to be treated fairly. Bias leads to injustice. Fairness reflects righteousness.`,
  },
  {
    term: "Path",
    notes: `A path is a direction or way. In the Bible, it represents life choices. People are told to choose the right path. Paths lead to different outcomes. Direction matters.`,
  },
  {
    term: "Peace",
    notes: `Peace is a state of calm and stability. In the Bible, it goes beyond the absence of conflict. It includes inner rest. Peace comes from God. It brings balance and security.`,
  },
  {
    term: "Perverse",
    notes: `Perverse means twisted or corrupt. In the Bible, it refers to behavior that goes against what is right. It shows distortion of truth. Perverse actions lead to harm. It reflects a wrong direction.`,
  },
  {
    term: "Perversity",
    notes: `Perversity is ongoing corruption or distortion. In the Bible, it describes a pattern, not just one act. It shows a consistent wrong mindset. Perversity leads people away from truth. It reflects deep misalignment.`,
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
