import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Presumptuous sin",
    notes: `Presumptuous sin is acting with arrogance, knowing something is wrong but doing it anyway. In the Bible, this kind of sin is not accidental. It is intentional and bold. It shows a lack of respect for God's authority. Presumptuous sin is rooted in pride and self confidence. It ignores warning and correction. This kind of sin carries serious weight because it is done knowingly.`,
  },
  {
    term: "Protection",
    notes: `Protection is being guarded from harm. In the Bible, God is often described as a protector. He shields people from danger both physically and spiritually. Protection does not mean there are no problems. It means you are not left alone in them. God's protection brings security and peace.`,
  },
  {
    term: "Provision",
    notes: `Provision is having what you need supplied. In the Bible, God is the one who provides. He meets needs, not always wants. Provision requires trust, especially when things are uncertain. It shows that God is aware and involved. What He provides is enough for the moment.`,
  },
  {
    term: "Refinement",
    notes: `Refinement is the process of being purified. In the Bible, it is often compared to metal being refined by fire. Pressure and difficulty remove what does not belong. It is not comfortable, but it has purpose. Refinement shapes character and faith. It produces something stronger and cleaner.`,
  },
  {
    term: "Resistance",
    notes: `Resistance is standing against something. In the Bible, people are called to resist sin and evil. It requires awareness and discipline. Resistance is not passive, it is active. It shows strength and conviction. Standing firm prevents being pulled in the wrong direction.`,
  },
  {
    term: "Restoration",
    notes: `Restoration is bringing something back to its original state. In the Bible, God restores what is broken or lost. It is more than repair, it is renewal. Restoration brings healing and hope. It shows that failure is not final. God can rebuild what was damaged.`,
  },
  {
    term: "Reverent fear",
    notes: `Reverent fear is deep respect for God. It is not terror, but awareness of His authority. In the Bible, it leads to wisdom and obedience. It recognizes who God is. Reverent fear brings humility. It keeps people aligned with truth.`,
  },
  {
    term: "Sacred duty",
    notes: `Sacred duty is a responsibility connected to God. In the Bible, certain roles and actions were set apart. These duties were not casual. They required seriousness and focus. Sacred duty showed commitment to God. It was about serving with intention.`,
  },
  {
    term: "Sacred service",
    notes: `Sacred service is work done for God. In the Bible, this included priestly and spiritual roles. It was not treated like ordinary work. It required purity and obedience. Sacred service reflected devotion. It showed dedication to God's purpose.`,
  },
  {
    term: "Sacred space",
    notes: `Sacred space is a place set apart for God. In the Bible, places like the temple were considered holy. They were not to be treated casually. Sacred space required respect. It represented God's presence. It reminded people of His holiness.`,
  },
  {
    term: "Sanctified",
    notes: `Sanctified means being set apart for God. In the Bible, it refers to being made holy. It is both a position and a process. Something sanctified is not ordinary. It belongs to God's purpose. Sanctification involves change and growth.`,
  },
  {
    term: "Separation",
    notes: `Separation means being set apart from something. In the Bible, people were called to separate from sin. It created a difference between holy and unholy. Separation is about identity and direction. It requires intentional choices. It protects what is set apart.`,
  },
  {
    term: "Signal",
    notes: `A signal is something that points to a message. In the Bible, signs were used to communicate meaning. They were not random, they had purpose. Signals helped people understand what was happening. They pointed to something greater. They required attention to be understood.`,
  },
  {
    term: "Solemn oath",
    notes: `A solemn oath is a serious promise. In the Bible, oaths were not taken lightly. They were binding and meaningful. Breaking an oath had consequences. It showed commitment and integrity. Words spoken carried weight.`,
  },
  {
    term: "Tabernacle service",
    notes: `Tabernacle service refers to worship in the tabernacle. In the Bible, this included sacrifices and rituals. It followed strict instructions. Service was structured and intentional. It showed reverence for God's presence. It was a central part of worship.`,
  },
  {
    term: "Tempt",
    notes: `To tempt is to draw someone toward wrongdoing. In the Bible, temptation tests choices and desires. It is not the same as sin, but it leads toward it. Temptation reveals what is inside. Resisting it builds strength. Giving in leads to consequences.`,
  },
  {
    term: "Terror",
    notes: `Terror is intense fear. In the Bible, it can come from judgment or overwhelming events. It shows the seriousness of certain situations. Terror can shake people deeply. It is not casual fear. It reflects something powerful and urgent.`,
  },
  {
    term: "Thank offering",
    notes: `A thank offering is given out of gratitude. In the Bible, it was a way to acknowledge God's provision. It was not forced, but voluntary. It showed appreciation and recognition. Giving thanks was expressed through action. It reflected a grateful heart.`,
  },
  {
    term: "Unbelief",
    notes: `Unbelief is a refusal to trust God. In the Bible, it blocks growth and progress. It is not just doubt, it is rejection. Unbelief keeps people from receiving what is promised. It shows where trust is missing. Faith cannot grow where unbelief remains.`,
  },
  {
    term: "Unfaithful",
    notes: `Unfaithful means not staying loyal. In the Bible, it often refers to breaking commitment with God. It shows inconsistency and betrayal. Unfaithfulness damages relationships. It reflects a divided heart. Faithfulness is required for trust to remain.`,
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
