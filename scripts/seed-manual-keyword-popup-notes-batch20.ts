import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Har-Megiddo",
    notes: `Har-Megiddo refers to a mountain or region linked to battle. In the Bible, it is associated with conflict and final confrontation. It carries symbolic meaning beyond geography. It represents decisive moments. It reflects large scale struggle.`,
  },
  {
    term: "Convocation",
    notes: `A convocation is a formal gathering. In the Bible, people were called together for sacred purposes. It was not casual. Convocations had structure. They reflected unity and focus.`,
  },
  {
    term: "Moon",
    notes: `The moon marks time and seasons. In the Bible, it helps track cycles. It reflects order in creation. The moon governs night light. It shows timing and rhythm.`,
  },
  {
    term: "Laws",
    notes: `Laws are rules that guide behavior. In the Bible, they define right and wrong. They create structure. Laws bring accountability. They reflect order.`,
  },
  {
    term: "Furnishings",
    notes: `Furnishings are items used in a space. In the Bible, they were part of sacred areas. Each had purpose. They were not random. Furnishings reflected function and design.`,
  },
  {
    term: "Tax",
    notes: `Tax is a required payment. In the Bible, taxes supported systems. They created obligation. Fairness mattered in collection. Taxes reflect authority and structure.`,
  },
  {
    term: "Linen",
    notes: `Linen is a type of fabric. In the Bible, it was used for garments. It often symbolized purity. Linen had specific uses. It reflected cleanliness and order.`,
  },
  {
    term: "off",
    notes: `Off means removed or separated. In the Bible, it can refer to cutting away. It shows distinction. Being off means no longer connected. It reflects change in position.`,
  },
  {
    term: "opening",
    notes: `An opening is an entrance or start. In the Bible, openings allow access. They represent opportunity. An opening leads somewhere. It reflects beginning or entry.`,
  },
  {
    term: "apart",
    notes: `Apart means set away from something. In the Bible, it often refers to being set apart for God. It creates distinction. Being apart shows identity. It reflects separation with purpose.`,
  },
  {
    term: "reading",
    notes: `Reading is the act of going through words. In the Bible, reading Scripture brings understanding. It connects people to truth. Reading requires attention. It reflects learning.`,
  },
  {
    term: "hands",
    notes: `Hands represent action and ability. In the Bible, what is done with hands matters. Hands show work and effort. They reflect responsibility. Hands reveal action.`,
  },
  {
    term: "space",
    notes: `Space is an area or place. In the Bible, space can be physical or symbolic. It allows for movement or separation. Space creates boundaries. It reflects position.`,
  },
  {
    term: "Tower",
    notes: `A tower is a tall structure. In the Bible, towers were used for protection or watch. They provided a higher view. Towers represent strength. They reflect security and awareness.`,
  },
  {
    term: "strategy",
    notes: `Strategy is a planned approach. In the Bible, strategy guided action. It required thinking ahead. Good strategy leads to success. It reflects planning.`,
  },
  {
    term: "plan",
    notes: `A plan is a prepared course of action. In the Bible, plans guide decisions. Not all plans succeed. Planning shows intention. It reflects direction.`,
  },
  {
    term: "order",
    notes: `Order is arrangement and structure. In the Bible, order prevents confusion. Everything has its place. Order creates stability. It reflects organization.`,
  },
  {
    term: "men",
    notes: `Men refers to people in a group. In the Bible, men often represented responsibility. They had roles to fulfill. Actions mattered. It reflects human responsibility.`,
  },
  {
    term: "troops",
    notes: `Troops are organized fighters. In the Bible, they moved together. They followed leadership. Troops required discipline. It reflects structure in conflict.`,
  },
  {
    term: "strengthened",
    notes: `Strengthened means made stronger. In the Bible, strength often comes from God. It builds endurance. Strengthening prepares for challenges. It reflects growth.`,
  },
  {
    term: "treaty",
    notes: `A treaty is an agreement between groups. In the Bible, treaties created peace or alliance. They carried conditions. Breaking them caused conflict. It reflects agreement.`,
  },
  {
    term: "ban",
    notes: `A ban is a restriction. In the Bible, certain things were banned. It created boundaries. Bans prevented misuse. It reflects control.`,
  },
  {
    term: "firm",
    notes: `Firm means steady and strong. In the Bible, firmness shows stability. It does not move easily. Being firm reflects confidence. It shows strength.`,
  },
  {
    term: "courageous",
    notes: `Courageous means acting with bravery. In the Bible, courage comes from trust. It faces fear. It leads to action. It reflects strength of heart.`,
  },
  {
    term: "land",
    notes: `Land is territory or ground. In the Bible, land is tied to promise. It represents inheritance. Land gives identity. It reflects possession.`,
  },
  {
    term: "cry",
    notes: `A cry is a loud expression. In the Bible, people cry out for help. It shows urgency. A cry reveals need. It reflects emotion.`,
  },
  {
    term: "still",
    notes: `Still means not moving. In the Bible, stillness brings clarity. It allows focus. Stillness reduces distraction. It reflects calm.`,
  },
  {
    term: "Complete destruction",
    notes: `Complete destruction means total removal. In the Bible, nothing is left behind. It is final. It shows judgment. It reflects absolute outcome.`,
  },
  {
    term: "Conquest campaign",
    notes: `A conquest campaign is a series of battles. In the Bible, it involved taking land. It required persistence. Campaigns lasted over time. It reflects strategy.`,
  },
  {
    term: "Cross over",
    notes: `To cross over means to move from one place to another. In the Bible, it often marks transition. It leads to something new. Crossing requires action. It reflects change.`,
  },
  {
    term: "Cut down",
    notes: `To cut down means to remove or destroy. In the Bible, it often refers to trees or enemies. It shows force. Cutting down ends something. It reflects removal.`,
  },
  {
    term: "Defensive",
    notes: `Defensive means focused on protection. In the Bible, defense prevents attack. It requires awareness. Defensive action maintains safety. It reflects caution.`,
  },
  {
    term: "Destroy utterly",
    notes: `To destroy utterly means complete destruction. In the Bible, it leaves nothing behind. It is final. It shows full judgment. It reflects total removal.`,
  },
  {
    term: "Devoted to destruction",
    notes: `Devoted to destruction means set apart to be destroyed. In the Bible, it was a specific command. It showed seriousness. Nothing was to be kept. It reflects complete separation.`,
  },
  {
    term: "Distribute",
    notes: `To distribute means to divide and give out. In the Bible, resources were shared. Distribution created balance. It required fairness. It reflects allocation.`,
  },
  {
    term: "Drive out",
    notes: `To drive out means to remove forcefully. In the Bible, people were driven out of land. It required action. Driving out changes control. It reflects removal.`,
  },
  {
    term: "Encourage",
    notes: `To encourage means to give support. In the Bible, encouragement builds strength. It helps others continue. Encouragement lifts people. It reflects care.`,
  },
  {
    term: "Encouragement",
    notes: `Encouragement is ongoing support. In the Bible, it strengthens people. It brings confidence. Encouragement helps overcome difficulty. It reflects positive influence.`,
  },
  {
    term: "Enlarge",
    notes: `To enlarge means to make bigger. In the Bible, it can refer to growth. It expands capacity. Enlarging creates increase. It reflects development.`,
  },
  {
    term: "Entrust",
    notes: `To entrust means to give responsibility. In the Bible, it involves trust. Something valuable is given. It requires faithfulness. It reflects confidence in another.`,
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
