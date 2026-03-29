// Script to seed "The Obedience of Abraham" devotional with all 21 days
// Run with: npx tsx scripts/seed-obedience-of-abraham.ts
console.log("Executing: scripts/seed-obedience-of-abraham.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseBibleReading(reference: string): { book: string; chapter: number } {
  const match = reference.match(/^(\d+\s+)?([A-Za-z]+)\s+(\d+)/);
  if (match) {
    const book = match[1] ? `${match[1].trim()} ${match[2]}` : match[2];
    const chapter = parseInt(match[3], 10);
    return { book: book.trim(), chapter };
  }
  return { book: "Genesis", chapter: 11 };
}

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const devotionalDays: DevotionalDay[] = [
  {
    day_number: 1,
    day_title: "A Family on the Move",
    bible_reading_reference: "Genesis 11",
    devotional_text: `Before Abraham is the father of faith, he is Abram in a family line already carrying grief, movement, and unfinished roads.

Genesis 11 narrows from the story of Babel into Terah's household. They leave Ur, start toward Canaan, and settle in Haran. That stop matters. The story begins in an in-between place.

Abram's calling does not start in a perfect moment. It starts in ordinary family history with loss, movement, and a sense that something is still unfinished. Many lives with God begin that way. The heart knows there has to be more, but the next step has not been fully spoken yet.

This is the opening tone of Abraham's life. He will be a man called to leave what is familiar, trust what he cannot fully see, and keep moving when the future is still forming. Before he becomes a great example of obedience, he is simply standing in an unfinished story that God is about to enter.`,
    reflection_question: "Where do you feel like your life is in an unfinished place that God may still speak into?",
  },
  {
    day_number: 2,
    day_title: "Go to the Land I Will Show You",
    bible_reading_reference: "Genesis 12",
    devotional_text: `Genesis 12 is where Abraham's life truly begins to move.

God tells Abram to leave his country, his people, and his father's house and go to a land He will show him. That command is sharp because God gives a calling before giving the full map. Abram has to move on a word.

And the promise attached to the command is massive. God will make him into a great nation, bless him, and use him to bless the families of the earth. The assignment is personal, but the reach is global.

Abram goes. That is the point. He does not wait until every detail is solved. Real obedience often starts there. You obey what God has said even while much of the road is still hidden.`,
    reflection_question: "What step has God already made clear that you may be overthinking instead of obeying?",
  },
  {
    day_number: 3,
    day_title: "Trusting God Enough to Let Go",
    bible_reading_reference: "Genesis 13",
    devotional_text: `Genesis 13 shows that obedience is not only about dramatic departures. It is also about how you handle tension when blessing creates pressure.

Abram and Lot have grown so much that the land cannot easily support both households together. Conflict rises. Abram responds with peace and humility, letting Lot choose first.

That is a strong moment in Abraham's story. He does not grab because he trusts. He believes that if God promised him a future, he does not have to act selfish to secure it.

Then after Lot separates, God tells Abram to look in every direction and reminds him of the land that will belong to his offspring. First comes the surrender, then comes the wider promise. That pattern still matters.`,
    reflection_question: "When relationships get tense, do you trust God enough to choose peace over grasping?",
  },
  {
    day_number: 4,
    day_title: "Courage for Family",
    bible_reading_reference: "Genesis 14",
    devotional_text: `Genesis 14 feels like Abraham's life suddenly becoming an action scene. Kings go to war, Lot is captured, and Abram rises to rescue him.

This chapter shows a side of Abraham people sometimes forget. He is not only a quiet man hearing promises. He is also brave. He gathers trained men, moves with courage, and fights to bring family back.

Then after the rescue comes blessing through Melchizedek. That matters because Abraham's strength is not meant to become pride. Victory still has to stay under God.

So this chapter pushes the story forward in a beautiful way. Abraham learns that obedience may call for movement, surrender, or battle depending on the moment. A faithful life is not passive. It is responsive to what God puts in front of it.`,
    reflection_question: "Where might God be asking you to act with courage instead of standing at a distance?",
  },
  {
    day_number: 5,
    day_title: "Looking at the Stars",
    bible_reading_reference: "Genesis 15",
    devotional_text: `Genesis 15 opens with God telling Abram not to be afraid, which means fear is still real in him even after major victories.

He also feels the ache of delay. The promised offspring has still not come. Then God brings him outside and tells him to look at the stars. "So shall your offspring be."

This is one of the deepest moments in Abraham's whole life because he believes the Lord, and it is counted to him as righteousness. He is not declared righteous because he has already seen everything happen. He is declared righteous because he trusts God's word.

This chapter lets you feel the inside of obedience. Abraham is not beyond fear. He is not living in easy certainty. He is learning to believe that God's promise is stronger than his barren reality.`,
    reflection_question: "What promise of God feels hardest to hold onto because the current facts look so different?",
  },
  {
    day_number: 6,
    day_title: "When Waiting Gets Dangerous",
    bible_reading_reference: "Genesis 16",
    devotional_text: `Genesis 16 is painful because waiting begins to turn into human control.

Sarai gives Hagar to Abram in an attempt to force the promise. What looks practical becomes deeply messy. Conception comes, but peace leaves. Jealousy, hurt, and strain fill the house.

This chapter matters because Abraham's story is honest. He is a man of faith, but he is still vulnerable to impatience. He can hear God one day and then slip into fleshly logic the next.

Delayed promise always carries this temptation: to help God in a way God never asked for. This chapter stands as a warning that not every way forward is God's way, even if it seems to get results fast.`,
    reflection_question: "Where are you tempted to rush what God told you to trust Him with?",
  },
  {
    day_number: 7,
    day_title: "Covenant and New Names",
    bible_reading_reference: "Genesis 17",
    devotional_text: `Genesis 17 feels like covenant spoken with fresh weight.

Abram becomes Abraham. Sarai becomes Sarah. God speaks again about descendants, kings, nations, and the covenant that will stand through generations. Identity changes because the promise is being named more clearly.

Then comes the sign of covenant. This is not casual religion. God is marking Abraham's life in a way that says this relationship is holy, costly, and set apart.

Abraham still laughs when he hears the promise of a son through Sarah. That detail keeps the chapter human. Holy covenant is being spoken over a man who is still trying to grasp how impossible it all sounds.`,
    reflection_question: "Can you receive what God says about your future even when it feels too large to make sense?",
  },
  {
    day_number: 8,
    day_title: "The God Who Draws Near",
    bible_reading_reference: "Genesis 18",
    devotional_text: `Genesis 18 shows Abraham in one of his strongest lights.

He welcomes the visitors with humility and urgency. He honors them well. Then the promise of Isaac is spoken again, and Sarah laughs. But the chapter keeps going, and that is where it gets even richer.

God lets Abraham into the conversation about Sodom. Abraham stands there asking bold questions about justice and mercy. He is reverent, but he is not silent. He cares about what God cares about.

That matters because Abraham is not only a servant receiving orders. He is a man being drawn into friendship with God. Obedience is deepening into closeness, not just performance.`,
    reflection_question: "Do you still believe God wants closeness with you, not just outward obedience from you?",
  },
  {
    day_number: 9,
    day_title: "Mercy and Judgment",
    bible_reading_reference: "Genesis 19",
    devotional_text: `Genesis 19 is one of the darkest chapters around Abraham's life, and it adds real weight to the story.

Judgment falls on Sodom, while Lot is rescued by mercy. The chapter is filled with urgency, warning, consequence, and sorrow.

Even though Abraham is not centered in every scene, this chapter matters to his journey because it reveals the full character of the God he follows. The Lord of promise is also holy in judgment.

That is important. A real walk with God has to hold both truths. He is merciful, and He is holy. Obedience grows stronger when we stop trying to shape God into someone smaller than He really is.`,
    reflection_question: "How does remembering God's holiness change the way you think about obedience?",
  },
  {
    day_number: 10,
    day_title: "Old Fears Return",
    bible_reading_reference: "Genesis 20",
    devotional_text: `Genesis 20 is uncomfortable because Abraham repeats an old failure.

Again he calls Sarah his sister. Again fear bends the truth. Again other people are put at risk because Abraham is trying to preserve himself.

This chapter is valuable because it refuses to fake growth. Abraham has walked with God, built altars, received covenant promises, and interceded for cities. And still he has weak spots.

That is a sobering and hopeful truth at once. Growth can be real while certain fears still need deeper healing. Abraham still needs grace, correction, and the faithfulness of God to cover what he cannot yet consistently carry alone.`,
    reflection_question: "What fear keeps showing back up in your life even after God has already helped you with it before?",
  },
  {
    day_number: 11,
    day_title: "Isaac at Last",
    bible_reading_reference: "Genesis 21",
    devotional_text: `Genesis 21 carries years of waiting inside one birth cry.

Isaac is finally born. Sarah laughs a new kind of laugh now, not disbelief but joy. God has done exactly what He promised, even though it took far longer than human timelines would have chosen.

Still, the chapter is not simple all the way through. Hagar and Ishmael are sent away, and the story holds both celebration and pain together. That realism matters. Fulfillment does not erase every wound around it.

This day is powerful because it proves God's word survives delay. The promise did not die in the waiting years. God was still faithful all along.`,
    reflection_question: "Where do you need to remember that God's delay is not the same as God's denial?",
  },
  {
    day_number: 12,
    day_title: "Take Your Son",
    bible_reading_reference: "Genesis 22",
    devotional_text: `Genesis 22 is the deepest test of Abraham's obedience.

God tells him to take Isaac, the promised son, and offer him on the mountain. The command lands with terrible weight because Isaac is not just his child. Isaac is the future Abraham waited decades to hold.

This chapter is cinematic and quiet at the same time. Early rising. Wood carried. The long walk. Isaac asking where the lamb is. Abraham answering, "God will provide."

This is obedience at a very deep level. It is one thing to trust God while waiting for the promise. It is another thing to trust God when He asks you to place the promise back in His hands.`,
    reflection_question: "What promise or gift would be hardest for you to surrender back to God if He asked for that kind of trust?",
  },
  {
    day_number: 13,
    day_title: "The Lord Will Provide",
    bible_reading_reference: "Genesis 22",
    devotional_text: `The same chapter that tests Abraham also reveals God's provision.

At the very last moment, the angel stops Abraham. A ram is provided. Isaac is spared. Abraham names the place, "The Lord Will Provide."

That moment matters because it shows the heart of God. He was not destroying the promise. He was drawing out Abraham's trust and revealing His own faithfulness at the point of deepest surrender.

Obedience climbed the mountain in pain, but provision met Abraham on the mountain in mercy. That is a lesson many believers learn slowly. Surrender does not outrun the goodness of God. He is still who He says He is when the test feels hardest.`,
    reflection_question: "Where have you seen God provide only after you truly surrendered control?",
  },
  {
    day_number: 14,
    day_title: "Grief in the Land of Promise",
    bible_reading_reference: "Genesis 23",
    devotional_text: `Genesis 23 slows the story with grief.

Sarah dies, and Abraham mourns her. After all the movement, covenant, laughter, and promise, the chapter pauses in loss. Abraham buys a burial place in the land God promised him.

That detail is powerful. He has walked with promise for years, yet the first clear piece of land he owns is a grave. Faith does not remove sorrow. It walks through sorrow with hope still alive.

This chapter gives Abraham's life emotional maturity. He is not floating above pain because he is a man of faith. He is carrying grief in the same land where God said the future would grow.`,
    reflection_question: "How do you hold grief and hope together when both are present at the same time?",
  },
  {
    day_number: 15,
    day_title: "Thinking Beyond Himself",
    bible_reading_reference: "Genesis 24",
    devotional_text: `Genesis 24 shows Abraham thinking about covenant beyond his own lifetime.

He sends his servant to find a wife for Isaac, and the chapter unfolds with prayer, guidance, timing, and clear providence. Rebekah's arrival feels carefully arranged by God.

What is beautiful here is Abraham's maturity. He is no longer only carrying his own next step. He is stewarding the future of the promise through the next generation.

That is part of what obedience becomes over time. It grows from your personal yes into the shaping of what comes after you. Abraham's life is now leaving tracks for others to walk in.`,
    reflection_question: "Are you thinking only about your own next step, or also about what faithfulness leaves for the people after you?",
  },
  {
    day_number: 16,
    day_title: "Full of Years",
    bible_reading_reference: "Genesis 25",
    devotional_text: `Genesis 25 closes Abraham's life with quiet weight.

He dies old and full of years. That does not mean every chapter was easy. It means the life was full. Full of promise, failure, courage, laughter, covenant, waiting, surrender, grief, and mercy.

He does not see every final detail of what God promised, but the covenant is still moving after him. That is a huge part of the lesson. A faithful life is not measured only by what you get to hold before you die. It is measured by whether you walked with God in a way that kept the promise moving forward.

Abraham's ending is not flashy, but it is honorable. His life was real, surrendered, and deeply used by God.`,
    reflection_question: "What would you want the words 'full of years' to mean about the way you lived?",
  },
  {
    day_number: 17,
    day_title: "By Faith He Went",
    bible_reading_reference: "Hebrews 11",
    devotional_text: `Hebrews 11 steps back and shows how heaven reads Abraham's life.

By faith he went when called. By faith he lived in tents. By faith Sarah conceived. By faith he offered Isaac. The chapter gathers the whole story and tells you what defined it.

Trust defined it.

Abraham lived like a stranger because he was looking for a city whose builder and maker is God. That means his obedience was always tied to something bigger than land, family growth, or earthly security. His life was being pulled by a future only God could fully see.

This chapter helps explain why Abraham still matters so much. His life was not random religious effort. It was faith moving on God's word again and again.`,
    reflection_question: "What would change if you really lived like your deepest home is still ahead with God?",
  },
  {
    day_number: 18,
    day_title: "Believing the God Who Gives Life",
    bible_reading_reference: "Romans 4",
    devotional_text: `Romans 4 brings Abraham's story right into the center of the gospel.

Paul points to Abraham as the picture of righteousness through faith. He believed in the God who gives life to the dead and calls into being things that were not.

That sentence sounds like Abraham's whole life. Barren places. Delayed promises. Impossible timing. And still God speaking life.

This chapter matters because it keeps the focus clear. Abraham's obedience mattered, but underneath it all was trust. He did not stand righteous before God by achievement. He stood by believing God's word.`,
    reflection_question: "Where are you still tempted to earn what God only gives through faith?",
  },
  {
    day_number: 19,
    day_title: "Faith That Moves",
    bible_reading_reference: "James 2",
    devotional_text: `James 2 shows the other side of Abraham's story. His faith was not invisible. It moved. It obeyed. It acted.

The chapter points back to Isaac on the altar and says Abraham's faith was shown through obedience. Then comes one of the most beautiful lines about him: he was called God's friend.

That title says so much. Abraham was not simply performing religious duty. He was walking with God in a real relationship that carried trust, reverence, honesty, and movement.

This chapter gives needed balance. Real faith is not empty language. It gets up. It leaves. It trusts. It surrenders. Abraham's life shows that clearly.`,
    reflection_question: "Would someone looking at your life see faith that actually moves, or mostly words that sound spiritual?",
  },
  {
    day_number: 20,
    day_title: "Blessing Beyond His Lifetime",
    bible_reading_reference: "Galatians 3",
    devotional_text: `Galatians 3 widens Abraham's story all the way out.

The promise to Abraham was never meant to stop with Abraham. Through him blessing would move outward to the nations, and the larger redemptive story would keep unfolding.

That means Abraham's personal obedience had a reach far beyond what he could measure when he first stepped away from home. His yes mattered more than he knew.

That should encourage anyone who feels like quiet faithfulness is too small to matter. God can attach a much larger future to one sincere act of obedience than we can see at the time.`,
    reflection_question: "What if your obedience to God is reaching farther than you can currently measure?",
  },
  {
    day_number: 21,
    day_title: "A Life Marked by Obedience",
    bible_reading_reference: "Genesis 12",
    devotional_text: `When you look back across Abraham's life, one thing stands out: he kept walking.

He left home. He built altars. He stumbled in fear. He waited through silence. He believed under the stars. He laughed at impossible promises. He held Isaac. He climbed the mountain. He buried Sarah. He died still trusting.

That is why the title fits so well. The obedience of Abraham was not one dramatic moment. It was a life shaped by saying yes to God again and again through change, delay, grief, blessing, covenant, and surrender.

Abraham was not perfect, but he was faithful in the deeper direction of his life. He kept returning to trust. He kept moving when God spoke. That is the invitation his story leaves with us now.`,
    reflection_question: "What would it look like for your life to be marked by long obedience instead of only short emotional moments?",
  },
];

const cinematicExpansions: Record<number, string> = {
  1: `Genesis 11 feels like the camera settling down after Babel and landing on one family carrying loss and unfinished movement. Terah starts toward Canaan and stops. The road has begun, but the journey is not complete.

That makes this a strong opening chapter for Abraham's life. Before God speaks directly, the setting already feels like a story waiting for a voice to redirect it.`,
  2: `Genesis 12 has the force of a first episode turning point. God speaks, Abram leaves, and everything familiar is suddenly behind him.

Altars begin appearing in the chapter because Abraham's life is now becoming a trail of places where God spoke and Abraham responded.`,
  3: `Genesis 13 works because the tension is small enough to feel human but big enough to reveal character. Land pressure, family strain, and the chance to grab first all stand in front of Abram.

He lets go of the better-looking option and then hears God's promise again. The chapter quietly teaches that surrender can make room for clearer vision.`,
  4: `Genesis 14 is the battle chapter. Abraham is suddenly chasing kings, rescuing Lot, and walking back with victory in his hands.

Then Melchizedek appears and shifts the atmosphere from war to blessing. That turn matters. Abraham can fight hard without forgetting where the true blessing comes from.`,
  5: `Genesis 15 is cinematic in a quieter way. Night sky, deep questions, a childless man, and a promise too large to count.

The stars become the backdrop for one of the most important sentences in Scripture. Abraham believes God in the dark before he can hold the answer in daylight.`,
  6: `Genesis 16 hurts because you can feel how impatience starts sounding reasonable. The years are passing, the promise is still waiting, and the house reaches for a solution.

But the chapter proves that a fast human answer can create a long human wound.`,
  7: `Genesis 17 sounds like covenant thunder. Names change. Futures are renamed. The promise is spoken with fresh force.

And right in the middle of all that holy weight, Abraham laughs. That detail makes the chapter feel alive. He is hearing the impossible and trying to breathe at the same time.`,
  8: `Genesis 18 moves from hospitality to prophecy to intercession. Abraham runs to serve, then stands still enough to speak with God about the fate of a city.

This is one of the richest chapters in his life because it shows closeness with God in action, not just obedience from a distance.`,
  9: `Genesis 19 burns with urgency. Escape, warning, judgment, loss. The chapter shows that Abraham's God is not soft toward evil and not careless with rescue.

That weight is part of Abraham's formation too. He is learning the full seriousness of the God he walks with.`,
  10: `Genesis 20 is hard to watch because the old fear comes back wearing familiar clothes. Abraham bends the truth again and puts others at risk again.

That repetition matters. Sanctification is real, but some fears have to be surrendered deeper than once.`,
  11: `Genesis 21 feels like years of tension breaking open in one chapter. Isaac arrives, laughter changes its meaning, and joy finally enters the house through the promise itself.

But the chapter still carries tears too. That mix of joy and pain keeps the story honest.`,
  12: `Genesis 22 slows down almost unbearably. Morning light, wood, mountain, silence, a son asking questions, a father carrying faith and pain together.

The chapter is written so you feel every step Abraham takes up that hill.`,
  13: `Then Genesis 22 turns from test to provision. The knife is stopped. The ram appears. The mountain becomes a place with a name.

That scene lands so hard because surrender went all the way down before mercy came all the way in.`,
  14: `Genesis 23 gives Abraham one of the quietest, saddest scenes in his life. Sarah dies, and the man of promise stands in a burial negotiation.

It is a deeply human chapter. Faith is not canceling grief. Faith is carrying grief in the same land where hope still lives.`,
  15: `Genesis 24 is long because it is careful. Abraham is no longer just obeying for himself. He is guarding what comes next through Isaac.

Prayer, timing, and providence guide the whole scene until Rebekah arrives like a quiet answer to a big future question.`,
  16: `Genesis 25 closes Abraham's life with calm dignity. The movement is over. The waiting is over. The old man dies, but the promise does not.

That is what gives the chapter strength. Abraham's life ends, but the covenant keeps breathing after him.`,
  17: `Hebrews 11 pulls the camera back and shows the invisible backbone of the story. Abraham walked, lived in tents, waited, and offered because he trusted.

The chapter gives language to what was happening underneath all the Genesis scenes: faith was carrying the whole journey.`,
  18: `Romans 4 makes Abraham feel close to every believer now. His story becomes a living picture of trusting the God who creates life where none seems possible.

That is why the chapter feels so strong. Abraham's impossible story becomes a doorway for our own faith.`,
  19: `James 2 tightens the picture. Abraham did not merely say he believed. He moved like he believed.

And then the title lands: friend of God. That makes his obedience feel warm, relational, and alive rather than mechanical.`,
  20: `Galatians 3 opens Abraham's story outward until you can see nations inside it. His life was never only about his own future. God attached global blessing to one man's obedience.

That is the kind of scale only God can hide inside a single yes.`,
  21: `Coming back to Genesis 12 at the end makes the whole devotional feel complete. The man who first walked away from home on a word became the man whose obedience still teaches the world.

That is the final image Abraham leaves behind: not flawless strength, but faithful movement with God.`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  devotional_text: [day.devotional_text, cinematicExpansions[day.day_number] ?? null]
    .filter(Boolean)
    .join("\n\n"),
}));

async function main() {
  console.log("Starting to seed 'The Obedience of Abraham' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Obedience of Abraham",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through the life of Abraham, from the first call to leave home to the mountain of surrender, the birth of Isaac, and the lasting legacy of a life that kept walking in obedience.",
      total_days: 21,
  };

  try {
    const { data: existingDevotional, error: existingError } = await supabase
      .from("devotionals")
      .select("id")
      .eq("title", devotionalPayload.title)
      .maybeSingle();

    if (existingError) {
      console.error("Failed to check for existing devotional:", existingError);
      process.exit(1);
    }

    if (existingDevotional?.id) {
      devotionalId = existingDevotional.id;
      const { error: updateError } = await supabase
        .from("devotionals")
        .update(devotionalPayload)
        .eq("id", devotionalId);

      if (updateError) {
        console.error("Failed to update existing devotional:", updateError);
        process.exit(1);
      }

      const { error: deleteDaysError } = await supabase
        .from("devotional_days")
        .delete()
        .eq("devotional_id", devotionalId);

      if (deleteDaysError) {
        console.error("Failed to clear existing devotional days:", deleteDaysError);
        process.exit(1);
      }

      console.log(`Refreshing existing devotional with ID: ${devotionalId}`);
    } else {
      const { data, error } = await supabase
        .from("devotionals")
        .insert(devotionalPayload)
        .select("id")
        .single();

      if (error || !data?.id) {
        console.error("Failed to insert devotional:", error);
        process.exit(1);
      }

      devotionalId = data.id;
      console.log(`Devotional created with ID: ${devotionalId}`);
    }
  } catch (err) {
    console.error("Unexpected error inserting devotional:", err);
    process.exit(1);
  }

  for (const day of finalDevotionalDays) {
    const parsed = parseBibleReading(day.bible_reading_reference);
    const { error } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: day.day_number,
      day_title: day.day_title,
      devotional_text: day.devotional_text,
      bible_reading_book: parsed.book,
      bible_reading_chapter: parsed.chapter,
      reflection_question: day.reflection_question,
    });

    if (error) {
      console.error(`Failed to insert Day ${day.day_number} (${day.day_title}):`, error);
      process.exit(1);
    }
  }

  console.log("\nDone! 'The Obedience of Abraham' devotional is ready.");
}

main().catch(console.error);
