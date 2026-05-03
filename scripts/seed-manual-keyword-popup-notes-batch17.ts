import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Sword",
    notes: `A sword is a weapon used in battle. In the Bible, it represents both physical warfare and authority. It can also symbolize judgment. The sword shows power and action. It is used to defend or attack. It reflects conflict and decision.`,
  },
  {
    term: "Take possession",
    notes: `To take possession means to claim something. In the Bible, it often refers to land given by God. It required action and obedience. Possession was not automatic. It showed stepping into what was promised.`,
  },
  {
    term: "Valiant",
    notes: `Valiant means brave and courageous. In the Bible, valiant people faced danger with strength. They acted despite fear. Valor showed commitment. It reflected courage in action.`,
  },
  {
    term: "Alarm",
    notes: `An alarm is a signal of warning. In the Bible, alarms were used to alert people. They called attention quickly. They signaled danger or action. Alarms required response.`,
  },
  {
    term: "Ambush strategy",
    notes: `An ambush strategy is a hidden attack plan. In the Bible, it involved surprise and timing. It required planning and patience. Ambushes caught enemies off guard. It shows strategy in conflict.`,
  },
  {
    term: "Annihilate",
    notes: `To annihilate means to destroy completely. In the Bible, it often refers to total judgment. Nothing is left behind. It is final and absolute. It reflects complete removal.`,
  },
  {
    term: "Appointment",
    notes: `An appointment is being placed in a position. In the Bible, roles were assigned with purpose. It showed authority and responsibility. Appointments were intentional. They required accountability.`,
  },
  {
    term: "Army division",
    notes: `An army division is a group within a larger army. In the Bible, divisions helped organize forces. It created structure in battle. Each division had a role. Order increased effectiveness.`,
  },
  {
    term: "Assign inheritance",
    notes: `To assign inheritance means to distribute what is given. In the Bible, land and blessing were assigned. It followed specific order. It connected families to their portion. Assignment created identity and responsibility.`,
  },
  {
    term: "Battle plan",
    notes: `A battle plan is a strategy for conflict. In the Bible, plans guided how battles were fought. It required wisdom and preparation. Not all plans succeeded. Strategy shaped outcomes.`,
  },
  {
    term: "Blazing",
    notes: `Blazing refers to intense fire or heat. In the Bible, it can represent destruction or power. Fire spreads quickly. It consumes what is in its path. Blazing shows intensity.`,
  },
  {
    term: "Blockade",
    notes: `A blockade is stopping movement or access. In the Bible, it was used to weaken enemies. It cut off supply and escape. Blockades created pressure. It shows control over movement.`,
  },
  {
    term: "Bravery in battle",
    notes: `Bravery in battle is courage during conflict. In the Bible, it showed trust and strength. Fear was present but not controlling. Bravery led to action. It reflects courage under pressure.`,
  },
  {
    term: "Break through",
    notes: `To break through means to push past resistance. In the Bible, it shows overcoming obstacles. It requires strength and persistence. Breakthrough changes the situation. It reflects victory in motion.`,
  },
  {
    term: "Burn with fire",
    notes: `To burn with fire means complete destruction. In the Bible, it often follows judgment. Fire consumes fully. It leaves nothing behind. It reflects total removal.`,
  },
  {
    term: "Camp order",
    notes: `Camp order is the arrangement of people. In the Bible, camps were organized carefully. Each group had a place. Order prevented confusion. It showed structure and discipline.`,
  },
  {
    term: "Campaign",
    notes: `A campaign is a series of actions in war. In the Bible, campaigns involved multiple battles. They required planning over time. Campaigns showed persistence. They reflected long term effort.`,
  },
  {
    term: "Charge forward",
    notes: `To charge forward means to move quickly into action. In the Bible, it shows bold movement in battle. It requires courage. Charging shows commitment. It reflects aggressive action.`,
  },
  {
    term: "City wall",
    notes: `A city wall is a structure for protection. In the Bible, walls defended cities from attack. They created security. Strong walls meant safety. They reflected preparation.`,
  },
  {
    term: "Clash",
    notes: `A clash is a direct conflict. In the Bible, clashes happened in battle. It involved force and opposition. Clashes were intense. They showed confrontation.`,
  },
  {
    term: "Officer",
    notes: `An officer is someone with authority. In the Bible, officers helped lead and organize. They carried responsibility. They gave direction. They supported leadership.`,
  },
  {
    term: "Commanding officer",
    notes: `A commanding officer leads others in authority. In the Bible, they directed action in battle. Their decisions affected outcomes. Leadership required wisdom. Command brought order.`,
  },
  {
    term: "Language",
    notes: `Language is a system of communication. In the Bible, language connects people. It can also divide when different. Words carry meaning and influence. Language shapes understanding.`,
  },
  {
    term: "Lord",
    notes: `Lord refers to one with authority. In the Bible, it is often used for God. It shows control and power. Acknowledging the Lord shows submission. It reflects relationship and authority.`,
  },
  {
    term: "Bearer",
    notes: `A bearer is one who carries something. In the Bible, it can refer to responsibility or role. What is carried matters. Bearers have purpose. It reflects duty.`,
  },
  {
    term: "God",
    notes: `God is the supreme authority. In the Bible, He is creator and ruler. Everything comes from Him. He defines truth and order. God is central to all things.`,
  },
  {
    term: "Cover",
    notes: `Cover means to protect or hide. In the Bible, covering can be protection. It shields from harm. It also represents care. Covering provides security.`,
  },
  {
    term: "Line",
    notes: `A line is a boundary or connection. In the Bible, it can represent order. Lines define structure. They separate or connect. It reflects direction.`,
  },
  {
    term: "Ram",
    notes: `A ram is an animal often used in sacrifice. In the Bible, it represents offering. It was part of worship. Rams had symbolic meaning. They reflected substitution.`,
  },
  {
    term: "Prey",
    notes: `Prey is something hunted. In the Bible, it represents vulnerability. Prey is targeted and pursued. It shows weakness. It reflects danger.`,
  },
  {
    term: "Avenger",
    notes: `An avenger brings justice. In the Bible, it often refers to someone responding to wrongdoing. It shows accountability. Justice is carried out. It reflects consequence.`,
  },
  {
    term: "Ritual",
    notes: `A ritual is a repeated sacred act. In the Bible, rituals were structured. They had meaning and purpose. They guided worship. Ritual reflects order.`,
  },
  {
    term: "Down",
    notes: `Down refers to falling or lowering. In the Bible, it can show defeat. It reflects loss of position. Down shows decline. It represents change in state.`,
  },
  {
    term: "Breaking",
    notes: `Breaking means being shattered or stopped. In the Bible, it can refer to defeat or change. Breaking shows disruption. It ends what was stable. It reflects transition.`,
  },
  {
    term: "Driver",
    notes: `A driver is one who directs movement. In the Bible, it can refer to control. Drivers influence direction. They guide outcomes. It reflects leadership in motion.`,
  },
  {
    term: "Corps",
    notes: `A corps is a group organized for a purpose. In the Bible, groups worked together in unity. Each had a role. Corps show structure. It reflects teamwork.`,
  },
  {
    term: "Cupbearer",
    notes: `A cupbearer served a king by testing drinks. In the Bible, it was a trusted role. It involved responsibility and risk. Trust was essential. It reflected close service.`,
  },
  {
    term: "Israel",
    notes: `Israel refers to God's chosen people. In the Bible, it is both a person and a nation. It carries identity and promise. Israel plays a central role. It reflects relationship with God.`,
  },
  {
    term: "One",
    notes: `One represents unity or singularity. In the Bible, it often shows oneness. It reflects unity and focus. Being one means not divided. It shows completeness.`,
  },
  {
    term: "Fortifications",
    notes: `Fortifications are structures built for defense. In the Bible, they protected cities. They made attacks harder. Fortifications showed preparation. They reflect security and strength.`,
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
