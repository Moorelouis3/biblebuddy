import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Settlement",
    notes: `A settlement is a place where people live. In the Bible, settlements marked stability after movement. They showed that a journey had reached a point of rest. Settlements created structure for daily life. It reflects belonging and establishment.`,
  },
  {
    term: "Shout",
    notes: `A shout is a loud expression. In the Bible, shouting often marked victory or command. It showed unity and energy. A shout carried power. It reflects strong emotion and action.`,
  },
  {
    term: "Show mercy",
    notes: `To show mercy means to give compassion instead of punishment. In the Bible, mercy reflects God's character. It goes beyond fairness. Showing mercy restores relationships. It reflects kindness and restraint.`,
  },
  {
    term: "Signal horn",
    notes: `A signal horn is used to communicate over distance. In the Bible, it gave direction or warning. The sound carried meaning. It required response. It reflects communication and urgency.`,
  },
  {
    term: "Stand firm",
    notes: `To stand firm means to remain steady. In the Bible, it shows strength in pressure. It resists movement or compromise. Standing firm requires conviction. It reflects stability.`,
  },
  {
    term: "Strong",
    notes: `Strong means having power or ability. In the Bible, strength often comes from God. It allows endurance. Strength supports action. It reflects capability.`,
  },
  {
    term: "Strong and courageous",
    notes: `Strong and courageous means bold and steady. In the Bible, it is a repeated command. It combines strength with action. Fear does not stop movement. It reflects confidence in God.`,
  },
  {
    term: "Submit",
    notes: `To submit means to yield to authority. In the Bible, submission reflects humility. It requires trust. Submitting creates order. It reflects alignment.`,
  },
  {
    term: "Take land",
    notes: `To take land means to claim territory. In the Bible, it often follows promise. It requires action. Taking land changes ownership. It reflects fulfillment.`,
  },
  {
    term: "Take spoil",
    notes: `To take spoil means to collect goods after victory. In the Bible, it followed battle. It showed gain. Spoil reflected outcome. It required control.`,
  },
  {
    term: "Take the city",
    notes: `To take the city means to capture it. In the Bible, it shows conquest. It requires strategy and strength. Taking a city changes control. It reflects victory.`,
  },
  {
    term: "Test loyalty",
    notes: `To test loyalty means to examine commitment. In the Bible, loyalty is proven through action. Tests reveal truth. They show where someone stands. It reflects faithfulness.`,
  },
  {
    term: "Territory",
    notes: `Territory is land under control. In the Bible, territory defined identity. It showed ownership. Territory required protection. It reflects possession.`,
  },
  {
    term: "Triumph",
    notes: `Triumph is victory after struggle. In the Bible, it reflects success. It follows persistence. Triumph shows overcoming. It reflects achievement.`,
  },
  {
    term: "Victory cry",
    notes: `A victory cry is a shout after winning. In the Bible, it showed celebration. It expressed success. Victory cries united people. It reflects triumph.`,
  },
  {
    term: "War cry",
    notes: `A war cry is a shout before battle. In the Bible, it prepared people for action. It built courage. War cries created unity. It reflects readiness.`,
  },
  {
    term: "Warrior spirit",
    notes: `Warrior spirit is a mindset of readiness. In the Bible, it reflects courage and strength. It faces challenges directly. It does not retreat easily. It reflects determination.`,
  },
  {
    term: "Covenant oath",
    notes: `A covenant oath is a serious promise. In the Bible, it confirmed agreement. It was binding. Breaking it brought consequences. It reflects commitment.`,
  },
  {
    term: "Covenant sign",
    notes: `A covenant sign is a symbol of agreement. In the Bible, it reminded people of the covenant. It was visible. It confirmed the relationship. It reflects identity.`,
  },
  {
    term: "Covenant stone",
    notes: `A covenant stone is a marker of agreement. In the Bible, stones were set as witnesses. They reminded people of promises. They marked important events. It reflects remembrance.`,
  },
  {
    term: "Divine command",
    notes: `A divine command is instruction from God. In the Bible, it carries authority. It is not optional. Following it leads to order. It reflects direction.`,
  },
  {
    term: "Divine promise",
    notes: `A divine promise is a commitment from God. In the Bible, it is reliable. It may take time. Promises guide hope. It reflects faithfulness.`,
  },
  {
    term: "Divine strength",
    notes: `Divine strength comes from God. In the Bible, it supports people beyond ability. It enables action. It sustains through difficulty. It reflects power.`,
  },
  {
    term: "Encamp before",
    notes: `To encamp before means to set camp in front of something. In the Bible, it prepared for action. It showed positioning. Encamping created readiness. It reflects planning.`,
  },
  {
    term: "Faith in promise",
    notes: `Faith in promise is trusting what was said. In the Bible, it requires belief without full proof. Faith drives action. It holds onto expectation. It reflects trust.`,
  },
  {
    term: "Fulfill",
    notes: `To fulfill means to complete something. In the Bible, it refers to promises or commands. Fulfillment brings closure. It shows completion. It reflects accomplishment.`,
  },
  {
    term: "Fulfillment",
    notes: `Fulfillment is the result of completion. In the Bible, it shows promises realized. It confirms what was expected. Fulfillment brings clarity. It reflects completion.`,
  },
  {
    term: "Generational promise",
    notes: `A generational promise extends across time. In the Bible, it affects future generations. It connects past and future. Promises continue beyond one life. It reflects continuity.`,
  },
  {
    term: "Holy war",
    notes: `Holy war is conflict tied to divine command. In the Bible, it was directed by God. It followed specific instructions. It was not random. It reflects judgment and purpose.`,
  },
  {
    term: "Justice of God",
    notes: `The justice of God is perfect fairness. In the Bible, God judges rightly. Nothing is overlooked. Justice maintains order. It reflects righteousness.`,
  },
  {
    term: "Keep charge",
    notes: `To keep charge means to guard responsibility. In the Bible, it involves duty. It requires attention. Keeping charge prevents failure. It reflects accountability.`,
  },
  {
    term: "Mighty act",
    notes: `A mighty act is a powerful deed. In the Bible, it shows God's power. It is visible and strong. Mighty acts build faith. It reflects authority.`,
  },
  {
    term: "Overcome fear",
    notes: `To overcome fear means to move past it. In the Bible, fear is faced with trust. It does not control action. Overcoming fear builds strength. It reflects courage.`,
  },
  {
    term: "Possession of land",
    notes: `Possession of land is taking ownership. In the Bible, it follows promise. It requires action. Possession creates stability. It reflects fulfillment.`,
  },
  {
    term: "Promise fulfilled",
    notes: `A promise fulfilled is a commitment completed. In the Bible, it confirms trust. It shows reliability. Fulfillment removes doubt. It reflects faithfulness.`,
  },
  {
    term: "Remembrance stones",
    notes: `Remembrance stones are markers of events. In the Bible, they reminded people of God's acts. They preserved memory. Stones carried meaning. It reflects testimony.`,
  },
  {
    term: "Sacred oath",
    notes: `A sacred oath is a serious promise. In the Bible, it is made before God. It carries weight. Breaking it has consequences. It reflects commitment.`,
  },
  {
    term: "Serve the Lord",
    notes: `To serve the Lord means to follow God. In the Bible, it involves obedience. Service requires action. It reflects dedication. Serving shows loyalty.`,
  },
  {
    term: "Settlement promise",
    notes: `A settlement promise is a commitment to establish. In the Bible, it relates to land and rest. It gives direction. It ensures stability. It reflects fulfillment.`,
  },
  {
    term: "Stand still",
    notes: `To stand still means to stop moving. In the Bible, it often means to wait. It allows clarity. Stillness shows trust. It reflects patience.`,
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
