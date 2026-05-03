import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Honor leadership",
    notes: `Honor leadership means showing respect to those in authority. In the Bible, leaders were placed for order and direction. Honoring them was part of honoring God's structure. It did not mean they were perfect, but they were to be respected. Dishonor created division and instability. Honor reflects humility and understanding of authority.`,
  },
  {
    term: "Impatience",
    notes: `Impatience is the inability to wait. In the Bible, impatience often led to wrong decisions. People acted before God's timing. It showed lack of trust. Waiting requires faith and control. Impatience can cause people to miss what God is doing.`,
  },
  {
    term: "Intercessory prayer",
    notes: `Intercessory prayer is praying on behalf of others. In the Bible, people stood in the gap for others before God. It showed care and responsibility beyond yourself. Intercession reflects compassion and connection. It is about lifting others up, not just focusing on yourself.`,
  },
  {
    term: "Jealous spirit",
    notes: `A jealous spirit is a mindset of insecurity or possessiveness. In the Bible, it often led to conflict and division. It caused people to compare and compete. This kind of jealousy is harmful and unstable. It shows a lack of trust and contentment.`,
  },
  {
    term: "Judicial",
    notes: `Judicial refers to matters of judgment and law. In the Bible, judicial processes ensured fairness. Decisions were to be based on truth, not emotion. It created structure in handling disputes. Judicial systems protected order in the community.`,
  },
  {
    term: "Lifting hands",
    notes: `Lifting hands is a posture of prayer and worship. In the Bible, it showed surrender and dependence on God. It was a visible expression of trust. It symbolized reaching toward God. This act reflected humility and connection.`,
  },
  {
    term: "Long suffering",
    notes: `Long suffering means enduring difficulty with patience. In the Bible, it reflects God's patience with people. It is not quick to anger or give up. It requires strength and control. Long suffering allows space for growth and change.`,
  },
  {
    term: "Mediation",
    notes: `Mediation is standing between two sides to bring resolution. In the Bible, mediators helped restore relationships. They represented both sides. It showed the need for reconciliation. Mediation brings peace where there is conflict.`,
  },
  {
    term: "Meekness",
    notes: `Meekness is controlled strength. In the Bible, it is not weakness, but humility under control. A meek person does not react out of pride. They choose restraint. Meekness shows discipline and maturity.`,
  },
  {
    term: "Memorial offering",
    notes: `A memorial offering is given as a reminder. In the Bible, it pointed back to something important. It was not just about giving, but remembering. It kept focus on what God had done. It connected present actions to past truth.`,
  },
  {
    term: "Mighty works",
    notes: `Mighty works are powerful acts done by God. In the Bible, they showed His authority and power. They were visible and undeniable. Mighty works revealed who God is. They built faith and understanding.`,
  },
  {
    term: "Murmuring spirit",
    notes: `A murmuring spirit is constant complaining. In the Bible, this showed discontent and lack of trust. People complained instead of believing. It created negativity and division. Murmuring reflects a heart that is not satisfied.`,
  },
  {
    term: "Obligation",
    notes: `Obligation is a responsibility that must be fulfilled. In the Bible, people had obligations to God and others. It was not optional. Obligations created structure in relationships. They required follow through and commitment.`,
  },
  {
    term: "Obey",
    notes: `To obey means to follow instructions. In the Bible, obedience is tied to trust. It is not just hearing, but doing. Obedience brings alignment with God. It shows faith in action.`,
  },
  {
    term: "Opposition",
    notes: `Opposition is resistance against something. In the Bible, people faced opposition when following God. It tested their commitment. Opposition reveals strength and belief. It is part of growth and perseverance.`,
  },
  {
    term: "Overcome",
    notes: `To overcome means to rise above difficulty. In the Bible, overcoming is connected to faith. It is not avoiding struggle, but pushing through it. Victory comes through persistence. Overcoming shows strength and trust in God.`,
  },
  {
    term: "Perpetual",
    notes: `Perpetual means ongoing without end. In the Bible, it often refers to lasting commands or promises. It shows continuity over time. Something perpetual does not stop. It reflects consistency and endurance.`,
  },
  {
    term: "Pilgrimage",
    notes: `A pilgrimage is a journey to a sacred place. In the Bible, people traveled to worship God. These journeys had purpose and meaning. It showed dedication and effort. Pilgrimage reflects intentional pursuit of God.`,
  },
  {
    term: "Possess",
    notes: `To possess means to take hold of something. In the Bible, it often refers to taking land or promise. It required action and faith. Possession was connected to God's provision. It showed stepping into what was given.`,
  },
  {
    term: "Presence",
    notes: `Presence is being near and aware. In the Bible, God's presence changes everything. It brings guidance, peace, and sometimes fear. People responded differently when aware of it. Presence is central to relationship with God.`,
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
