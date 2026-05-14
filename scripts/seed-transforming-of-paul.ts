// Script to seed "The Transforming of Paul" devotional with all 21 days
// Run with: npx tsx scripts/seed-transforming-of-paul.ts
console.log("Executing: scripts/seed-transforming-of-paul.ts");

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
  return { book: "Acts", chapter: 7 };
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
    day_title: "Standing at Stephen's Death",
    bible_reading_reference: "Acts 7",
    devotional_text: `Paul's story begins before he is Paul. It begins as Saul, and it begins in a dark scene.

Acts 7 ends with Stephen being stoned while Saul stands there approving it. That matters because Paul's story does not start with soft light and easy innocence. It starts with religious certainty turned violent.

Saul believes he is protecting truth. He believes he is defending God. That is what makes this opening so serious. A person can be deeply sincere and still be deeply wrong.

This is the first frame of the devotional for a reason. Paul's later transformation only makes sense when you feel how far off he really was in the beginning.`,
    reflection_question: "Where might you be convinced you are right while still needing God to search your heart more deeply?",
  },
  {
    day_number: 2,
    day_title: "Breathing Threats",
    bible_reading_reference: "Acts 8",
    devotional_text: `Acts 8 shows Saul in motion, and it is not pretty.

The church is scattered. Homes are invaded. Men and women are dragged away. Saul is not passive in the story. He is driving the pressure forward with real force.

This chapter matters because it gives weight to his future conversion. Saul is not a little lost. He is violently committed to the wrong mission. He is using passion, intelligence, and zeal in a direction that wounds the very body of Christ.

That is part of what makes grace so shocking later. Jesus does not save a mildly confused man. He stops a dangerous one.`,
    reflection_question: "What parts of your passion still need to be brought under the control of Jesus instead of just the force of your personality?",
  },
  {
    day_number: 3,
    day_title: "The Road to Damascus",
    bible_reading_reference: "Acts 9",
    devotional_text: `Acts 9 is one of the great turning points in the whole Bible.

Saul is traveling with authority and anger when heaven interrupts him. Light flashes. He falls. A voice speaks his name. "Saul, Saul, why are you persecuting Me?"

That line is everything. Jesus takes the persecution of His people personally. Saul thought he was attacking a movement. He discovers he has been resisting the risen Christ.

In a moment, the hunter becomes blind, weak, and led by the hand. That is how radical real transformation can be. One encounter with Jesus can break the entire direction of a life.`,
    reflection_question: "What would have to change in you if Jesus interrupted your plans instead of simply blessing them?",
  },
  {
    day_number: 4,
    day_title: "Three Days in the Dark",
    bible_reading_reference: "Acts 9",
    devotional_text: `After the light comes the dark.

Saul cannot see. He does not eat. He does not drink. The man who came to Damascus in control now sits in silence and blindness. Those three days matter. They are not empty waiting. They are the collapse of an old identity.

Then Ananias enters the story. A believer Saul would have once terrified is now the one sent to pray for him. That is grace in action. God uses a brother from the very people Saul attacked to help begin Saul's new life.

Scales fall. Sight returns. Baptism follows. This is transformation with real cost. Saul does not get a small improvement. He gets a new life.`,
    reflection_question: "Has God ever had to strip away your confidence before you were finally ready to see clearly?",
  },
  {
    day_number: 5,
    day_title: "The Church Doesn't Trust Him Yet",
    bible_reading_reference: "Acts 9",
    devotional_text: `One of the most human parts of Saul's story comes right after his conversion. The church does not know what to do with him.

That makes sense. People know his name for the wrong reasons. Fear does not vanish just because a testimony is real. Sometimes trust takes time.

Barnabas becomes a mercy here. He takes Saul, vouches for him, and helps bridge the gap between his violent past and his new present.

This chapter pushes the story forward in an important way. Transformation may happen in a moment with Jesus, but other people may need time to catch up to what God has done in you.`,
    reflection_question: "Are you patient enough to let God rebuild trust over time instead of demanding instant acceptance?",
  },
  {
    day_number: 6,
    day_title: "Set Apart for the Work",
    bible_reading_reference: "Acts 13",
    devotional_text: `Acts 13 is where the missionary story of Paul truly opens wide.

In Antioch, while the leaders worship and fast, the Holy Spirit says, "Set apart for Me Barnabas and Saul." That line matters. Paul's ministry is not self-appointed. It is Spirit-sent.

Then the road starts moving. Cyprus. Opposition. A false prophet. A governor listening. Paul's voice getting bolder. You can feel the story changing. He is no longer only a converted man with a testimony. He is becoming an apostle carrying the gospel into hard places.

Calling often gets clearer while you move. Acts 13 has that feeling all over it.`,
    reflection_question: "What has God already set apart in your life that needs less hesitation and more obedience?",
  },
  {
    day_number: 7,
    day_title: "Driven Out but Still Moving",
    bible_reading_reference: "Acts 14",
    devotional_text: `Acts 14 feels like one long lesson in endurance.

Paul and Barnabas preach, divide cities, flee threats, heal a crippled man, get mistaken for gods, and then watch the crowd turn violent. Paul is stoned and left for dead.

That is one of the strongest moments in his whole life. The chapter refuses to romanticize ministry. Real calling can leave you bleeding in the dust while the mission still has more road ahead.

And yet Paul gets up and keeps moving. That is the transforming of Paul too. The man who once used pain against believers now carries pain for the name of Jesus.`,
    reflection_question: "When obedience gets painful, do you start backing away, or do you keep moving with God?",
  },
  {
    day_number: 8,
    day_title: "The Fight for Grace",
    bible_reading_reference: "Acts 15",
    devotional_text: `Acts 15 is not a miracle chapter. It is a doctrine chapter, and it still feels dramatic.

The question is huge: do Gentile believers have to carry the full weight of Jewish law to truly belong? Paul fights here because the gospel itself is at stake.

This matters for understanding Paul's life. He is not only courageous in travel and suffering. He is courageous in truth. He will not let people turn grace into something that has to be earned.

The transforming of Paul includes this too. The old Pharisee who once built walls is now helping defend the open door of grace for the nations.`,
    reflection_question: "Do you live like grace is truly a gift, or do you keep slipping back into trying to earn what Jesus already gave?",
  },
  {
    day_number: 9,
    day_title: "Singing in the Prison",
    bible_reading_reference: "Acts 16",
    devotional_text: `Acts 16 has one of the most cinematic prison scenes in Scripture.

Lydia is saved. A slave girl is delivered. Then Paul and Silas are beaten, chained, and thrown into the inner cell. At midnight, instead of collapsing into bitterness, they sing.

Then the earthquake hits. Doors open. Chains break. The jailer wakes up in terror and is about to kill himself when Paul stops him. By the end of the night, the jailer and his household are baptized.

This is Paul's story in one chapter: suffering, worship, power, mercy, and gospel movement all colliding in the dark.`,
    reflection_question: "What comes out of you under pressure first, panic or worship?",
  },
  {
    day_number: 10,
    day_title: "Reasoning in Athens",
    bible_reading_reference: "Acts 17",
    devotional_text: `Acts 17 shows Paul in a totally different setting. No prison this time. Now he is standing in Athens surrounded by idols, thinkers, and public argument.

Paul's spirit is provoked by what he sees, but he does not just shout at the city. He reasons. He observes. He speaks into their world with truth strong enough to challenge it.

Then comes Mars Hill, one of the most famous speeches in the New Testament. Paul starts where they are and then leads them to the God they do not know.

This chapter matters because Paul is not one-dimensional. He can endure pain, and he can think deeply. He can suffer in the dust, and he can preach in the center of ideas.`,
    reflection_question: "Can you speak truth into the culture around you without losing either courage or clarity?",
  },
  {
    day_number: 11,
    day_title: "Do Not Be Afraid",
    bible_reading_reference: "Acts 18",
    devotional_text: `Acts 18 lets you see Paul in another very human moment. The Lord tells him in a vision, "Do not be afraid."

That matters because it means fear was real. Paul is bold, but he is not superhuman. He still needs Jesus to steady him.

This chapter also shows the beauty of partnership. Aquila and Priscilla appear. Ministry keeps growing through shared labor, not solo greatness.

Paul's life is being transformed into something stronger than personal talent. He is becoming a man who keeps going because God keeps speaking into his weakness.`,
    reflection_question: "Where do you need to hear Jesus say, 'Do not be afraid,' instead of pretending fear is not there?",
  },
  {
    day_number: 12,
    day_title: "Revival in Ephesus",
    bible_reading_reference: "Acts 19",
    devotional_text: `Acts 19 feels explosive. The Spirit moves. People are baptized. Miracles happen. Evil spirits are confronted. Books of sorcery are burned.

Ephesus does not stay quiet when the gospel gets real. Trade gets threatened. Idols get challenged. The city begins to shake because Jesus is not being added as one more idea. He is overturning old powers.

This chapter is important because it shows what happens when the message Paul carries hits a city at the level of worship, money, fear, and spiritual darkness.

Transformation in Paul is now producing transformation around Paul.`,
    reflection_question: "If Jesus fully took over your habits and loyalties, what old things would have to burn out of your life?",
  },
  {
    day_number: 13,
    day_title: "You Will See My Face No More",
    bible_reading_reference: "Acts 20",
    devotional_text: `Acts 20 carries a different kind of weight. It is less about action and more about heart.

Paul speaks to the Ephesian elders and you can feel the tears in the chapter. He reminds them how he lived among them, how he preached, how he warned, how he served, how he did not shrink back.

Then he says they will not see his face again. That line lands hard because Paul's ministry was never cold. He did not only deliver content. He poured out his life.

This chapter shows the tenderness inside his strength. Paul's courage is real, but so is his love for the people he shepherded.`,
    reflection_question: "Are you only trying to say true things, or are you actually pouring your heart into the people God gave you?",
  },
  {
    day_number: 14,
    day_title: "Bound for Jerusalem",
    bible_reading_reference: "Acts 21",
    devotional_text: `Acts 21 is full of warning. People plead with Paul not to go to Jerusalem. Prophecy says chains are waiting. Tears fill the road.

And yet Paul keeps going.

This chapter is pure calling. Paul is not rushing toward pain because he likes pain. He is walking toward obedience because he knows the Spirit has made the path clear even though the path is costly.

That is one of the strongest marks of his transformed life. He used to rush with violent certainty toward the wrong mission. Now he walks with surrendered certainty toward the right one.`,
    reflection_question: "What if obedience does not lead away from hardship, but straight through it?",
  },
  {
    day_number: 15,
    day_title: "His Story Before the Crowd",
    bible_reading_reference: "Acts 22",
    devotional_text: `Acts 22 is Paul's testimony chapter, and it hits differently because he is telling his story while under threat.

He does not hide what he was. He says it plainly. He persecuted believers. He chased them. He approved violence. Then he tells the Damascus road story again.

That matters because Paul never outgrows amazement at grace. He does not move on from the fact that Jesus met him when he was still His enemy.

This chapter shows the power of a redeemed testimony. Paul uses the worst part of his past as proof of how strong the mercy of Jesus really is.`,
    reflection_question: "Do you let your testimony show people how strong Jesus is, or do you still try to hide what He brought you out of?",
  },
  {
    day_number: 16,
    day_title: "Take Courage",
    bible_reading_reference: "Acts 23",
    devotional_text: `Acts 23 feels tense from start to finish. Paul stands before councils, faces plots, and learns that men are waiting to kill him.

Then, in the middle of that pressure, the Lord stands by him and says, "Take courage."

That line matters so much. Paul is not carrying himself alone. Jesus is not watching from a distance. He is near in the pressure, near in the threats, near in the uncertainty.

Transformation is not only about what changed in Paul. It is also about who keeps standing with Paul now.`,
    reflection_question: "What changes when you remember Jesus is with you in the pressure, not just waiting at the end of it?",
  },
  {
    day_number: 17,
    day_title: "Two Years Waiting",
    bible_reading_reference: "Acts 24",
    devotional_text: `Acts 24 is one of those chapters that can feel slow until you realize how heavy it really is. Paul is stuck. Accused. Delayed. Left waiting.

Felix listens but does not act with integrity. Politics, fear, and convenience keep justice from moving. Paul sits in that space for two years.

This matters because Paul's life is not only big speeches and fast mission travel. It also includes long waiting where faithfulness looks like not losing heart in a locked season.

Some chapters of calling are not about movement at all. They are about remaining steady while time stretches out.`,
    reflection_question: "How do you respond when God's will includes waiting longer than feels fair?",
  },
  {
    day_number: 18,
    day_title: "Almost Persuaded",
    bible_reading_reference: "Acts 26",
    devotional_text: `Acts 26 gives Paul another chance to tell the story, this time before kings and rulers.

He speaks about his past, about the heavenly vision, about the resurrection, and about why he now preaches repentance and light. Festus thinks he is mad. Agrippa says, "Almost you persuade me."

That line is haunting. Almost is still not yes.

This chapter feels like Paul standing in full clarity. He is not confused about why he lives the way he lives now. He knows exactly who changed him and exactly what message he was given to carry.`,
    reflection_question: "Is there any area where you are still 'almost' surrendered instead of fully obedient?",
  },
  {
    day_number: 19,
    day_title: "The Storm and the Shipwreck",
    bible_reading_reference: "Acts 27",
    devotional_text: `Acts 27 is full drama. Wind. Panic. Cargo thrown overboard. Crew losing hope. A ship getting torn apart by the sea.

And right in the middle of all that chaos, Paul is steady. Not because the storm is small, but because God spoke in the storm.

This chapter shows how deeply transformed Paul really is. The man who once made others tremble now becomes calm in disaster, strong in leadership, and full of faith when everyone else is breaking.

His confidence is not in the ship. It is in the God who already told him how the story would go.`,
    reflection_question: "When everything around you feels unstable, what are you actually trusting to hold you steady?",
  },
  {
    day_number: 20,
    day_title: "Still Preaching in Chains",
    bible_reading_reference: "Acts 28",
    devotional_text: `Acts 28 closes the book of Acts in a way that almost feels unfinished on purpose.

Paul survives the snakebite. He reaches Rome. He teaches. He welcomes people. He preaches the kingdom of God and the Lord Jesus Christ with boldness, even while living under restriction.

That ending says something powerful. Chains did not stop the gospel. Delay did not stop the gospel. Rome did not stop the gospel.

Paul's life is now defined by one deep line: no matter what happens to me, Jesus is still worth proclaiming.`,
    reflection_question: "What would it look like for you to stay faithful even if life no longer looked free or easy?",
  },
  {
    day_number: 21,
    day_title: "I Have Finished the Race",
    bible_reading_reference: "2 Timothy 4",
    devotional_text: `2 Timothy 4 feels like the final scene.

Paul writes as an older man near the end. Some people have left. The pressure is real. Death is close enough to feel. And still he says, "I have fought the good fight, I have finished the race, I have kept the faith."

That is the transforming of Paul in one line. The persecutor became a preacher. The violent man became a father in the faith. The destroyer of the church became one of its strongest servants.

His story ends the way transformed lives are meant to end: not in self-glory, but in faithfulness to Jesus all the way through.`,
    reflection_question: "If your life ended with the words 'they kept the faith,' what would need to stay true between now and then?",
  },
];

const cinematicExpansions: Record<number, string> = {
  1: `Acts 7 ends with stones flying and Saul standing there cold enough to approve it. That first image matters because the future apostle begins as a man unmoved by mercy and convinced his violence is righteous.`,
  2: `Acts 8 makes Saul feel dangerous. He is entering homes, dragging people out, and helping drive fear through the church. Grace will have to be strong to reach a man like this.`,
  3: `The Damascus road is all interruption. Light, voice, ground, blindness, silence. The whole direction of Saul's life gets broken in a single moment by the risen Jesus.`,
  4: `Three blind days in Damascus feel like a burial of the old Saul. Then Ananias walks in with courage and grace, and the man who terrified the church is received by the church.`,
  5: `When Barnabas takes Saul by the hand of reputation and says, in effect, he is real, trust begins to rebuild. God often uses one faithful bridge person to steady a changed life.`,
  6: `Acts 13 feels like Paul stepping fully into the role heaven had marked for him. The room in Antioch prays, the Spirit speaks, and the road opens out toward nations.`,
  7: `In Acts 14 Paul is stoned hard enough to be left for dead and still gets back up into the mission. The chapter feels dusty, violent, and full of stubborn faith.`,
  8: `Acts 15 is a battle of a different kind. Words, truth, doctrine, and the future of grace are on the line. Paul fights here because the gospel is worth defending clearly.`,
  9: `The midnight prison scene in Acts 16 is unforgettable because worship rises in the dark before the earthquake ever comes. Paul does not wait for freedom to start praising.`,
  10: `Acts 17 gives Paul the city of ideas and idols. He looks around, understands the room, and then speaks Jesus into a culture that thinks it already knows enough.`,
  11: `The vision in Acts 18 matters because it reminds you bold people still need God to steady them. Courage is not the absence of fear. It is fear answered by the voice of Jesus.`,
  12: `Acts 19 feels like spiritual power colliding with a whole city's economy and worship system. The gospel is not staying private anymore. It is shaking public life.`,
  13: `By Acts 20, Paul's tears show as much of his transformation as his sermons do. He loves the people, not just the mission statistics.`,
  14: `Acts 21 is full of farewells, warnings, and that heavy feeling that chains are coming. Paul keeps walking anyway.`,
  15: `Acts 22 turns Paul's past into a weapon for truth. He does not hide the old Saul because the old Saul makes the mercy of Jesus shine brighter.`,
  16: `When Jesus says "Take courage" in Acts 23, it lands like strength dropped straight into a hunted man's chest. Paul's life keeps moving because Christ keeps standing near him.`,
  17: `Acts 24 is quiet pressure. Prison walls, delayed justice, rulers who hesitate, and a servant of God learning how to stay faithful in a slowed-down chapter.`,
  18: `The kings in Acts 26 hear a man who knows exactly who he used to be and exactly who met him on the road. Paul's clarity is part of the transformation too.`,
  19: `Acts 27 is one storm after another until the ship itself is breaking apart. Yet Paul becomes one of the calmest men on the sea because God has already spoken.`,
  20: `Acts 28 closes with Paul still receiving people and still preaching. That is the power of a transformed life: even chains become platforms.`,
  21: `2 Timothy 4 sounds like a man finishing tired but clear, wounded but steady, abandoned by some but held by Christ. That is a strong ending for a once-violent life remade by grace.`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  devotional_text: [day.devotional_text, cinematicExpansions[day.day_number] ?? null]
    .filter(Boolean)
    .join("\n\n"),
}));

async function main() {
  console.log("Starting to seed 'The Transforming of Paul' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Transforming of Paul",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through the life of Paul, from Saul the persecutor to Paul the apostle, following the road of conversion, mission, suffering, letters, and final faithfulness.",
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

  console.log("\nDone! 'The Transforming of Paul' devotional is ready.");
}

main().catch(console.error);
