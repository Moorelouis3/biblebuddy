// Script to seed "The Calling of Moses" devotional with all 21 days
// Run with: npx tsx scripts/seed-calling-of-moses.ts
console.log("Executing: scripts/seed-calling-of-moses.ts");

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
  return { book: "Exodus", chapter: 1 };
}

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const baseDevotionalDays: DevotionalDay[] = [
  {
    day_number: 1,
    day_title: "When Fear Ruled Egypt",
    devotional_text: `The story of Moses starts before Moses can even speak.

Exodus 1 is full of fear. Pharaoh sees the Hebrew people growing and decides that blessing is a threat. Fear turns into control. Control turns into cruelty. Soon, the order goes out to kill the Hebrew baby boys.

That is the dark world Moses is born into. His life begins under pressure, under evil, under a king who thinks he can stop the plan of God. But Pharaoh is not in charge of the final story. God is.

This chapter matters because the calling of Moses does not begin at the burning bush. It begins in pain. It begins in a world where power looks one sided. Many callings start the same way.

And before Moses ever leads, two women fear God more than Pharaoh. That sets the tone for the whole story. The fear of God is stronger than the fear of man.`,
    bible_reading_reference: "Exodus 1",
    reflection_question: "Where do you feel pressure to fear people more than you fear God?",
  },
  {
    day_number: 2,
    day_title: "A Basket on the Nile",
    devotional_text: `Moses' mother hides him as long as she can. Then she makes a basket, coats it, and places him among the reeds on the Nile.

That scene is full of faith and heartbreak. She is letting go because holding on will kill him. A sister watches from a distance. Then Pharaoh's daughter finds the child.

The same river tied to death becomes the path God uses for rescue. The same royal house that ordered destruction becomes the place where Moses is protected.

This is the kind of thing only God can do. He can turn danger into deliverance. Before Moses can walk, God is already writing mercy into his story.

Sometimes the beginning of your calling is not your courage. Sometimes it is the faith of the people who covered you before you could stand on your own.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "Have you ever had to trust God by letting go of something you deeply loved?",
  },
  {
    day_number: 3,
    day_title: "Raised Between Two Worlds",
    devotional_text: `Moses grows up in Pharaoh's house, but Pharaoh's house is never fully home.

He has Egyptian education, language, and access. But he is also Hebrew. That tension matters. Moses is raised between power and pain, privilege and oppression, palace and slavery.

God often shapes leaders in tension. Moses learns Egypt from the inside and suffering from the outside. Later, that will matter when he stands before Pharaoh without being owned by Pharaoh's world.

Some of the hardest parts of your story may actually be preparation. The things that make you feel split may be the very things God uses to prepare you to speak into more than one world.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "Where in your life do you feel caught between two worlds?",
  },
  {
    day_number: 4,
    day_title: "The Day Moses Snapped",
    devotional_text: `Moses sees an Egyptian beating a Hebrew. He looks around, kills the Egyptian, and hides the body in the sand.

This is one of the biggest turns in his life. Moses sees real injustice, but he tries to solve it in the flesh. He wants to act, but he acts in the wrong way.

The next day he learns that people know. Pharaoh wants him dead. Moses runs.

This part of the story matters because calling does not erase weakness. Moses is not a flat hero. He is a real man with anger, fear, and bad timing. He sees the right problem and chooses the wrong answer.

God will still use him, but first Moses has to learn what failure feels like.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "Have you ever tried to force a good result in a bad way because you were tired of waiting?",
  },
  {
    day_number: 5,
    day_title: "Running to Midian",
    devotional_text: `Moses runs to Midian because staying in Egypt means death.

At a well, he helps the daughters of Reuel when other shepherds push them aside. Even in exile, Moses still moves toward justice. Soon he is welcomed into a new home.

That matters. Moses leaves Egypt as a fugitive, not a hero. But even in discipline, God provides. Midian is not proof that God gave up on him. Midian is where God begins to reshape him.

Failure sent Moses into the wilderness, but the wilderness was still under God's rule.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "Has there been a place in your life that felt like exile but later became training?",
  },
  {
    day_number: 6,
    day_title: "A Home in the Wilderness",
    devotional_text: `Moses marries Zipporah. He has sons. He becomes a shepherd.

That sounds simple, but it is a huge change. He once lived around courts and kings. Now he lives around sheep, dust, and long quiet days. The pace of his life is slower, humbler, and hidden.

Those hidden years matter. Moses is learning patience. He is learning care. He is learning how to guide weak things through dry places. Later, all of that will matter.

Do not despise quiet years. God often teaches in silence what will be needed in public later.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "What quiet season in your life might actually be training instead of delay?",
  },
  {
    day_number: 7,
    day_title: "God Heard the Groaning",
    devotional_text: `While Moses is in Midian, Israel is still suffering in Egypt.

Then Exodus says something beautiful: God heard their groaning. God remembered His covenant. God saw. God knew.

That does not mean He was late. It means He was about to act. And while the people were crying in one place, God had already been preparing the answer in another place.

Moses probably felt hidden. Israel probably felt forgotten. But neither was true. God was moving on both sides of the story at the same time.

That is still how God works.`,
    bible_reading_reference: "Exodus 2",
    reflection_question: "Where do you need to remember that God hears, sees, and knows even before you see movement?",
  },
  {
    day_number: 8,
    day_title: "The Fire in the Bush",
    devotional_text: `Moses is doing something ordinary when the extraordinary appears.

He is leading the flock when he sees a bush on fire that does not burn up. He turns aside to look, and God calls his name: "Moses, Moses."

That first answer matters: "Here I am."

Before Moses hears the hard assignment, he gives God his attention. Calling often starts there. Not with a full plan, but with a willing ear.

The bush burns in the wilderness, not the temple. God can turn dry ground into holy ground anytime He wants.`,
    bible_reading_reference: "Exodus 3",
    reflection_question: "What distractions make it hard for you to slow down and notice when God may be getting your attention?",
  },
  {
    day_number: 9,
    day_title: "Take Off Your Sandals",
    devotional_text: `The first thing God tells Moses is not to go. It is to stop.

"Take off your sandals, for the place where you are standing is holy ground."

Moses is being reminded that this story is not mainly about Moses. It is about the holiness of God. Before he carries authority, he must learn reverence. Before he speaks to Pharaoh, he must bow before the Lord.

God then says He is the God of Abraham, Isaac, and Jacob. Moses hides his face because he is afraid to look at God.

Holy awe is not weakness. It is the right response to the presence of God.`,
    bible_reading_reference: "Exodus 3",
    reflection_question: "Do you approach God more casually than reverently right now?",
  },
  {
    day_number: 10,
    day_title: "I Have Seen, I Have Heard, I Have Come Down",
    devotional_text: `God tells Moses that He has seen the misery of His people, heard their cries, and come down to rescue them.

Then comes the turn: "So now, go. I am sending you to Pharaoh."

God is the rescuer, but He chooses to involve Moses in the rescue. Calling is not about God needing help. It is about God inviting people into His work.

The shepherd in Midian is suddenly told that his quiet life is about to collide with the purposes of heaven.

That is what calling feels like sometimes. God lets you know what breaks His heart, then He sends you toward it.`,
    bible_reading_reference: "Exodus 3",
    reflection_question: "What burden has God put in front of you that may be part of your calling?",
  },
  {
    day_number: 11,
    day_title: "Who Am I?",
    devotional_text: `Moses answers God with insecurity: "Who am I that I should go to Pharaoh?"

That question is honest. Moses knows his past. He knows he failed in Egypt. He knows he ran. He does not feel like the kind of man who should confront a king.

God does not answer by building up Moses' ego. He says, "I will be with you."

That changes the whole thing. The answer to "Who am I?" is not self-confidence. It is the presence of God.

Many people stay stuck because they keep staring at their weakness instead of God's nearness.`,
    bible_reading_reference: "Exodus 3",
    reflection_question: "Where are you asking 'Who am I?' when God may be answering with 'I will be with you'?",
  },
  {
    day_number: 12,
    day_title: "What If They Don't Believe Me?",
    devotional_text: `Moses keeps bringing up fears. What if they do not believe me? What if they do not listen? What if my words fail?

God responds with signs. The staff becomes a serpent. The hand is made sick and then healed. Water becomes blood.

Then Moses talks about his speech. He feels weak in the very place the calling seems to require strength.

God answers, "Who gave human beings their mouths? ... I will help you speak."

The God who made the mouth is not limited by the weakness of the mouth. That is a word for anyone who feels disqualified by what feels weakest in them.`,
    bible_reading_reference: "Exodus 4",
    reflection_question: "What weakness do you keep bringing up to God as the reason you cannot obey Him?",
  },
  {
    day_number: 13,
    day_title: "Please Send Someone Else",
    devotional_text: `At some point Moses stops hiding behind questions and says the real thing: "Please send someone else."

That is such an honest moment. He understands the assignment now. He just does not want it to be him.

For the first time, the text says the Lord's anger burns against Moses. Even so, God gives Aaron to help him.

That is grace and seriousness together. The calling is not removed. It is adjusted.

Moses teaches us that God can work with weak people, but delay can become disobedience if we keep resisting what He has made plain.`,
    bible_reading_reference: "Exodus 4",
    reflection_question: "Is there an area where your fear has become delay, and your delay has become disobedience?",
  },
  {
    day_number: 14,
    day_title: "Back to Egypt",
    devotional_text: `Moses heads back toward the place he once fled.

That matters. Obedience often means going back toward the place where you failed, not to relive the failure, but to obey God in a new way.

God even tells Moses ahead of time that Pharaoh will be hard. In other words, obedience will not mean easy.

When Moses and Aaron first speak to the elders of Israel, the people believe and bow down in worship. That must have felt like hope.

But first hope is not the same as final breakthrough. Moses is about to learn that things can get worse before they get better.`,
    bible_reading_reference: "Exodus 4",
    reflection_question: "Have you ever obeyed God and still felt afraid because you knew resistance was waiting?",
  },
  {
    day_number: 15,
    day_title: "When Obedience Makes Things Worse",
    devotional_text: `Moses tells Pharaoh, "Let my people go." Pharaoh responds by making life harder.

The people are beaten. The burden grows. And the leaders of Israel blame Moses.

Then Moses turns to God and says, in effect, Why did You send me if this is what happens?

That question is important because it shows us where Moses takes his pain. He does not hide it from God. He brings it to God.

Sometimes the first result of obedience is not relief, but pressure. That does not mean God is absent. It may mean He is exposing the chains before He breaks them.`,
    bible_reading_reference: "Exodus 5",
    reflection_question: "When obedience brings pressure, do you run from God or bring the pain honestly to Him?",
  },
  {
    day_number: 16,
    day_title: "Power Against Egypt",
    devotional_text: `The plagues are not random. They are acts of judgment, rescue, and revelation.

Water turns to blood. Frogs, gnats, flies, disease, darkness. Egypt is being shown that its gods are powerless before the Lord.

And Moses is learning trust one step at a time. He does not wake up with giant faith all at once. He keeps going back to Pharaoh, keeps hearing from God, and keeps obeying.

That is how trust grows. Not by one big speech, but by repeated dependence.

Moses once tried to change Egypt with his own strength. Now he is learning that true power comes from God alone.`,
    bible_reading_reference: "Exodus 7",
    reflection_question: "Where is God teaching you to trust Him one step at a time instead of all at once?",
  },
  {
    day_number: 17,
    day_title: "The Night Everything Changed",
    devotional_text: `Then comes Passover.

This is the night history turns. A lamb. Blood on the doorposts. A meal eaten in haste. Sandals on feet. Staff in hand. The people must be ready.

Rescue comes God's way, not man's way.

For Moses, this night is the breaking point of years of pressure. The thing that looked impossible finally happens. Pharaoh tells them to go.

Calling can feel slow for years and then move fast all at once. This was that night for Moses.`,
    bible_reading_reference: "Exodus 12",
    reflection_question: "Has God ever taken something in your life from long waiting to sudden movement?",
  },
  {
    day_number: 18,
    day_title: "The Sea in Front, The Army Behind",
    devotional_text: `Freedom had barely started when panic hit.

Israel stands at the sea with Pharaoh's army behind them. The people panic. Moses says, "Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you."

That is a big moment because this is the same Moses who once ran from Egypt. Growth happened.

Then God parts the sea. The people walk through. Egypt is crushed.

The miracle is dramatic, but the lesson is deeper: the man who once felt least able has learned to hear God under pressure and obey.`,
    bible_reading_reference: "Exodus 14",
    reflection_question: "What feels like a Red Sea in front of you right now?",
  },
  {
    day_number: 19,
    day_title: "Tired of Carrying Everyone",
    devotional_text: `After the sea comes the long work of leadership.

Moses has to carry complaints, fear, need, and pressure. In Numbers 11, he reaches a breaking point and tells God the load is too heavy.

That honesty matters. Even a man used in miracles still gets tired. Even a man who hears from God still needs help.

God responds by sharing the load.

This is one of the great leadership lessons in Moses' story: calling does not remove your limits. There is no holiness in acting stronger than you are.`,
    bible_reading_reference: "Numbers 11",
    reflection_question: "Where are you carrying more than God asked you to carry alone?",
  },
  {
    day_number: 20,
    day_title: "Sinai, The Calf, and the Broken Tablets",
    devotional_text: `Moses goes up Sinai and meets with God, but while he is on the mountain the people build the golden calf.

When Moses comes down and sees it, he breaks the tablets. That moment is not random rage. It is a sign that the covenant had already been shattered in the camp.

Still, what stands out next is even more powerful: Moses intercedes. He pleads for mercy. He stands in the gap for the people.

This is Moses at his best. Not just confronting sin, but carrying people before God.

He is becoming more than a deliverer. He is becoming a mediator.`,
    bible_reading_reference: "Exodus 32",
    reflection_question: "When people fail around you, do you only react, or do you also pray for them?",
  },
  {
    day_number: 21,
    day_title: "He Fulfilled His Calling",
    devotional_text: `The end of Moses' life is painful and beautiful.

Because of his own sin, Moses does not enter the promised land. That is hard. The man who led the people there does not step in himself.

But Deuteronomy 34 does not end in failure. It ends in fulfillment. Moses sees the land. He dies under the care of God. And Scripture says there had not arisen a prophet like Moses, whom the Lord knew face to face.

Moses did not get every detail he may have wanted, but he fulfilled his calling.

That is the goal. Not fame. Not ease. Faithfulness.

Moses heard God, wrestled with fear, obeyed anyway, and finished the work God gave him to do.`,
    bible_reading_reference: "Deuteronomy 34",
    reflection_question: "If your life ended with the words 'they fulfilled their calling,' what would need to be true between now and then?",
  },
];

const devotionalTextExpansions: Record<number, string> = {
  1: `Pharaoh is not just being cruel for no reason. He is scared. He sees the Hebrew people multiplying, and he thinks growth means danger. That is what fear does when it is not brought under God. It starts seeing enemies everywhere. It starts justifying evil in the name of safety.

That matters because a lot of the pain in Moses' story begins with a ruler trying to protect his throne. Pharaoh wants control. God is building a people. Pharaoh thinks he can crush what God has blessed, but no king is strong enough to stop the promise of God.

Moses is not even named yet, but the stage is already being set for the kind of man he will need to become. He will grow up in a world where power can be abusive, where leaders can be hardhearted, and where obedience to God will cost something.

That is part of why this opening chapter is so important. It teaches us that calling usually begins long before we recognize it. God was at work in Moses' life before Moses ever knew God was writing a story with his name on it.`,
  2: `Try to picture that moment like a real scene. A mother placing her baby into the Nile. A sister standing far enough away not to be seen, but close enough to watch. A princess coming down to bathe. It feels small and huge at the same time. One little basket floating in a river, and yet the future of Israel is inside it.

Scripture even lets us see God's irony in the scene. Pharaoh tried to use the Nile as an instrument of death. God turns the Nile into the path of deliverance. The very place that should have swallowed Moses becomes the place that carries him into protection.

Moses is then nursed by his own mother and raised in Pharaoh's house. Only God can write something like that. Moses will grow up near wealth, near influence, near education, but he will never fully belong to that world.

Sometimes God saves you in ways that feel both painful and beautiful. Sometimes rescue does not look clean. It looks like tears, uncertainty, and trust. But it is still rescue.`,
  3: `Moses' childhood must have been complicated. He likely learned the ways of Egyptian royalty. He would have seen temples, wealth, power, polished halls, and the language of empire. He would have known what it meant to walk through rooms built for kings. But somewhere in all of that, he also knew he was Hebrew. He knew his people were the slaves under Egyptian power, not the family seated on the throne.

That kind of tension can either break a person or prepare them. In Moses' case, God uses it. Moses learns how Egypt thinks. He learns how power speaks. He learns what the palace looks like from the inside. Later, when he walks back into it as God's messenger, he is not entering a world he has never seen. He knows it. He has lived there.

And still, all that education and access could not answer the deeper question of identity. Was he Egyptian because of where he was raised? Or Hebrew because of where he came from? Was he a prince, or was he part of an oppressed people?

Many people know that feeling in a different form. They know what it is like to live between two worlds, two stories, two expectations. Moses reminds us that God can use complicated identity, not just simple stories. God does not waste tension. He can turn it into preparation.

And that is part of what makes Moses such a powerful person to study. He is not only a man of miracles. He is a man who spent years trying to understand where he belonged. That inner tension becomes part of the drama of his whole life.`,
  4: `Moses' anger makes sense, but his action is still wrong. That is one of the reasons this scene is so powerful. The Bible does not flatten him into a perfect hero. It lets us see the mix inside him. He cares about justice. He hates oppression. He sees someone being beaten and something in him erupts.

But caring about the right thing does not always mean handling it the right way. Moses wants to rescue his people, but he tries to do it with hidden violence, with his own timing, and with his own strength. He buries the body in the sand, but what he really cannot bury is the fact that he acted outside of God's way.

Then comes the painful line the next day: "Who made you ruler and judge over us?" That had to cut. Moses may have thought he was stepping in as a deliverer, but the people did not see him that way. They saw a man out of control.

This is part of Moses' training too. Before God uses him publicly, Moses has to learn that zeal is not enough. Passion is not enough. A real calling needs God's timing, God's method, and God's presence, not just strong emotion.`,
  5: `Midian looks like the place where Moses' first big dream dies. He is no longer in the palace. He is no longer near influence. He is no longer even close to the people he probably thought he would help. He is far away, exposed, and starting over.

But even there, Moses is still Moses. At the well he cannot ignore injustice. He sees the daughters of Reuel being pushed aside, and he steps in. That little scene matters because it shows that exile did not erase his core burden. He still moves toward protection. He still notices wrong. He still has the heart of someone meant to stand in the gap.

Reuel welcomes him, gives him a place to stay, and eventually Moses becomes part of the family. That is grace. God did not have to provide a home in Midian, but He did. He did not have to give Moses a table, a wife, and a future there, but He did.

Sometimes the place you call your detour becomes the place where God keeps you alive long enough to become ready. Midian was not Moses' final assignment, but it was an important classroom.`,
  6: `We often skip these years because they do not look dramatic. No plagues. No bush on fire. No sea splitting open. Just marriage, children, sheep, and long stretches of wilderness.

But that hidden life may have been some of the most important formation Moses ever received. Shepherding trains the eye. It teaches patience, attention, endurance, and care. It teaches you to move at the pace of weaker things. It teaches you how to keep going when the landscape is dry and there is no crowd cheering you on.

Moses also learns family life here. He becomes a husband to Zipporah and a father to sons. That matters too. Calling is not only shaped in dramatic public moments. It is shaped in ordinary private faithfulness.

Forty years is a long time. Long enough for Egypt to feel distant. Long enough for the palace to feel like another life. Long enough for a man to wonder if the biggest part of his story is behind him. But God had not forgotten Moses. Hidden does not mean discarded.`,
  7: `Those four words are so comforting: God heard. God remembered. God saw. God knew. The people may have felt buried under slavery, but heaven was not silent. God was not casually observing pain from a distance. He was engaged with it.

And notice the timing. Moses is in Midian when this is said. That means the answer to Israel's suffering is already alive, already being formed, already in process, even though the people cannot see it yet. That is how God often works. He begins answers before we even know how to ask the right question.

This part of the story also helps people who feel forgotten in their own wilderness. Moses may have wondered if his life had shrunk into a shepherd's routine. Israel may have wondered if their cries were lost in the dust. Neither was true. God was moving in both stories at once.

When Scripture says God remembered, it does not mean He had forgotten and suddenly recalled something. It means He is about to act on what He promised. Covenant love is waking up in visible form.`,
  8: `The burning bush scene is so famous that it can start feeling normal, but it is not normal at all. A shepherd in the wilderness sees fire that does not consume. That alone tells you something about God. His fire is real, powerful, and holy, but it does not depend on natural rules to sustain itself.

And then God speaks Moses' name twice. "Moses, Moses." There is something personal in that. God is not only giving an assignment. He is calling a man. He is drawing attention, awakening identity, and inviting response.

Moses says, "Here I am." He does not know where this is going yet. He does not know the cost. He does not know the pressure that is coming. But that simple answer opens the next chapter of his life.

Try to picture the scene. Desert silence. Sheep nearby. Heat, dust, and then a flame bright enough to interrupt the whole day. No crowd. No music. No dramatic buildup. Just one man and one holy interruption. That is often how God works. He breaks into ordinary life and makes it impossible for you to stay the same.

So much of calling begins with that kind of interruption. God meets people in normal routines, on regular days, in everyday places. Then one holy interruption changes everything. The question is whether we will turn aside long enough to notice.`,
  9: `Holiness is one of the biggest themes in Moses' life. Before God gives him a mission, He gives him a revelation of who He is. That order matters. Moses is not first handed strategy. He is first confronted with sacred presence.

Taking off his sandals is a sign of humility. Moses cannot stroll into this moment casually. He cannot stay in control. He cannot approach God as if God is just another voice in the desert. Holy ground demands surrender.

Then God identifies Himself as the God of Abraham, Isaac, and Jacob. In other words, the God speaking to Moses is not a new God making up a random plan. He is the covenant God, the same God tied to promise, history, and faithfulness across generations.

Moses hides his face because awe has entered the scene. That is good for us to remember. We need intimacy with God, yes, but we also need reverence. Real closeness to God never removes wonder. It deepens it.`,
  10: `When God says, "I have seen... I have heard... I have come down," He is revealing His heart. He is not distant from suffering. He is not blind to oppression. He is not cold toward human pain. He sees it, hears it, and moves toward it.

Then He says, "I am sending you." That is where a lot of people get uncomfortable. We love the idea that God cares. We get nervous when God's care starts involving us. But this is a pattern in Scripture. God often reveals His burden, then invites a person into the work that flows from it.

Moses is not the savior of Israel. God is. But Moses will be the human instrument God uses. That means Moses must learn something every called person must learn: being used by God is not the same as replacing God. You are part of the work, but you are not the source of the power.

The same is true now. Sometimes God lets you feel a burden because He is drawing you near His own heart. And sometimes that burden is not just for prayer. It is also an invitation to step into obedience.`,
  11: `Moses' question is so human. "Who am I?" He is basically saying, You have the wrong man. I know my history. I know my limitations. I know what happened the last time I tried to step into this story.

God does not answer with a pep talk. He does not say, Moses, you are enough. He says, "I will be with you." That is better. So much better. Because self-confidence is shaky ground, but God's presence is solid ground.

A lot of people get stuck right here. They keep rehearsing their weakness instead of leaning on God's nearness. They build whole lives around disqualifying themselves. Moses shows us that insecurity does not have to be the end of the story, but it does have to stop being the loudest voice.

Calling is rarely carried by people who feel naturally impressive. It is usually carried by people who learn that God's presence matters more than their resume.`,
  12: `Moses keeps imagining every possible way the assignment could fail. They will not believe me. They will not listen. I do not speak well. My weakness will get exposed. All of that is familiar. Fear loves to rehearse failure before obedience even starts.

God does not shame Moses for naming the fear, but He also does not let the fear rule the story. He gives signs. He gives words. He gives assurance. He meets Moses in the exact places where Moses feels weakest.

This is one of the deepest comforts in the chapter: God is not surprised by human limitation. He made Moses. He knows his personality, his speech, his past, and his fears better than Moses does. And still He calls him.

That means your weakness may be real without being final. The place where you feel least impressive may become one of the places where God's strength becomes most visible.`,
  13: `This is one of the most revealing lines in Moses' whole life: "Please send someone else." At last the excuses stop sounding theological and start sounding personal. Moses knows what God is asking, and he does not want it.

That honesty is painful but helpful. Sometimes disobedience sounds spiritual at first. It sounds like humility, caution, or careful thinking. But eventually the real issue comes out. We know what God is saying. We just do not want the cost that comes with saying yes.

God's anger shows us that this moment is serious. But His response also shows grace. He gives Aaron. He provides help. He does not throw Moses away because Moses is scared. He strengthens him and keeps the mission moving.

That is encouraging. God can work with reluctant people. But reluctance still has to bow. There comes a point where the loving thing to do is stop negotiating and obey.`,
  14: `Imagine what it felt like for Moses to walk back toward Egypt. Every step was a step toward the place of his old failure, the place where Pharaoh once wanted him dead, the place where he had tried and failed before. Obedience was not abstract. It had geography. It meant going somewhere hard.

God also tells him ahead of time that Pharaoh will be stubborn. That matters because it keeps Moses from confusing resistance with failure. Just because the path is hard does not mean the assignment is wrong. Sometimes God prepares us by telling us not to expect quick ease.

Still, when Moses gathers the elders and they believe, it must have felt like light breaking in. After all the fear and hesitation, there is worship. There is hope. There is the sense that maybe this really is happening.

But hope at the beginning of a story is not always the same as immediate victory. Moses is about to learn that the space between promise and fulfillment can still be painful.`,
  15: `This chapter is one of the most relatable parts of Moses' story because it captures what it feels like when obedience seems to backfire. Moses obeys, speaks God's word, and the situation gets worse. The people suffer more. Pharaoh gets harsher. The leaders blame the very man who came to help them.

Then Moses goes back to God with his confusion. That is important. He does not pretend everything is fine. He does not use fake spiritual language. He asks the kind of question many believers ask in private: Lord, why did You send me if this is what happened?

That question is not the death of faith. In many ways, it is part of real faith. Moses is still talking to God, still bringing the pain to God, still trying to understand God inside the pressure. Honest prayer is better than silent bitterness.

Sometimes obedience uncovers darkness before it breaks it. Sometimes the enemy tightens his grip when he knows the chains are about to come off. That is painful, but it is not pointless.`,
  16: `Each plague is a confrontation. Egypt is learning that its gods cannot save, its king is not ultimate, and its systems are not stronger than the word of the Lord. Moses stands in the middle of that conflict again and again, watching God expose false power.

And every round forces Moses to trust more deeply. He cannot fake his way through this. He has to hear God, say what God says, and wait for God to act. That repeated rhythm changes a person. Moses is becoming more steady because he keeps seeing God do what only God can do.

There is something cinematic about these chapters too. The Nile struck. Frogs everywhere. Darkness swallowing the land. Pharaoh hardening his heart again and again. Moses walking in and out of the royal court carrying the word of the Lord while all Egypt starts to realize that their throne is not bigger than Israel's God.

It is also worth noticing that this whole stretch is not only dramatic. It is exhausting. Repeating the same demand before a hardhearted king, facing the same rejection, waiting through the same tension, would drain almost anyone. Yet Moses keeps showing up.

That is what trust often looks like in real life. Not one giant heroic moment, but repeated obedience in the face of ongoing resistance.`,
  17: `Passover is one of the richest nights in the Bible. It is rescue, judgment, covenant, and preparation all at once. The people are told exactly what to do, and that matters. Deliverance does not come through panic. It comes through trusting the word God gave.

For Moses, this had to feel like the long tension finally snapping. Years in Midian. The burning bush. All the excuses. All the confrontations. All the plagues. And now, in one night, the story shifts. Egypt releases what it never wanted to release.

Still, even this night shows that salvation belongs to God. Moses is crucial, but the blood on the doorposts is not his invention. The timing is not his invention. The rescue is not his achievement. He is obeying inside a salvation God designed.

Calling feels healthiest when it stays there. Important, yes. Responsible, yes. But never pretending the miracle depends on us being the savior.`,
  18: `The Red Sea moment is one of the most cinematic scenes in the whole Bible because it traps the people between two impossibilities. Water in front. Army behind. No obvious path out. It is the kind of moment where panic sounds reasonable.

But listen to Moses now. This is not the man who ran in Exodus 2. This is a man who can stand under pressure and speak faith into chaos. "Stand firm." Growth has happened in him. Not because his personality changed overnight, but because he has spent enough time hearing God that he can still hear Him when fear is loud.

Then God opens a road where there was no road. Wind. Walls of water. Ground where there should not be ground. The same sea that looked like the end becomes the doorway to freedom. That is the kind of miracle people remember for generations. But even inside that miracle, Moses is still learning the same lesson: the Lord fights for His people, and the Lord knows the path they cannot yet see.

Some seas are not crossed by strategy. They are crossed by trust and by following the God who makes ways through impossible places.`,
  19: `The wilderness after the miracles may be one of the hardest parts of Moses' life. It is one thing to face Pharaoh. It is another thing to carry a frustrated people day after day. Complaints pile up. Pressure piles up. Need piles up. And eventually Moses tells God, I cannot carry this by myself.

That moment matters because it gives tired leaders permission to be honest. Moses is not less spiritual because he admits the weight is too much. He is being truthful. God never asked him to be superhuman. He asked him to stay dependent.

God responds by giving help, by sharing the load, by showing that the burden of leadership was never meant to sit on one pair of shoulders alone. That is grace in the middle of burnout.

There is a lesson here for anyone trying to carry too much. Feeling overwhelmed does not always mean you are failing. Sometimes it means you are finally seeing your limits clearly enough to ask for the help God was always willing to give.`,
  20: `When Moses comes down the mountain and sees the golden calf, the broken tablets are more than an outburst. They are a picture. The people have already broken covenant in their hearts, and Moses' shattered stone reflects the shattered reality in the camp.

But Moses does not stop at anger. He goes back into the presence of God. He intercedes. He pleads. He stands between holy judgment and a sinful people and asks for mercy. That is one of the reasons Moses is such a powerful figure in Scripture. He is not only a confrontational leader. He is a praying leader.

Sinai is full of contrast. Fire on the mountain. Glory in the cloud. Then idolatry in the camp below. Moses is standing between those two worlds, feeling the holiness of God and the failure of man at the same time. That tension is one of the heaviest parts of leadership.

This is also where Moses starts to look even more like a mediator. He knows the people are wrong. He does not excuse their sin. But he still loves them enough to carry them before God.

That combination is rare and beautiful. Truth without intercession becomes cold. Intercession without truth becomes shallow. Moses shows both.`,
  21: `The end of Moses' story teaches something deep about success in the kingdom of God. Moses does not get every outcome he wanted. He does not physically step into the promised land. By worldly standards, some people might call that tragic.

But Scripture does not summarize his life as a waste. It honors him. It remembers the intimacy he had with God, the faithfulness of his obedience, and the unique role he played in God's plan. Moses' life is measured by calling, not by comfort.

There is something deeply moving about Deuteronomy 34. Moses goes up the mountain, sees the land, and dies there with the Lord's care over him. It is quiet, holy, and heavy. No spotlight. No crowd. Just the end of a long life of obedience. A man who faced Pharaoh, crossed seas, climbed mountains, and carried a nation now rests in the hands of God.

That is important for all of us. Faithfulness and visible reward are not always the same thing on this side of heaven. Sometimes a person fulfills exactly what God asked of them and still ends their story holding unresolved grief. Moses did. And he was still one of the greatest servants in Scripture.

So the real question is not, Did Moses get everything he wanted? The real question is, Did Moses do what God gave him to do? And the answer is yes. He heard God, wrestled honestly, kept going, and finished as a man shaped by the presence of the Lord.`,
};

const devotionalDays: DevotionalDay[] = baseDevotionalDays.map((day) => ({
  ...day,
  devotional_text: devotionalTextExpansions[day.day_number]
    ? `${day.devotional_text}\n\n${devotionalTextExpansions[day.day_number]}`
    : day.devotional_text,
}));

const devotionalDayOverrides: Record<number, Partial<DevotionalDay>> = {
  1: {
    bible_reading_reference: "Exodus 1",
  },
  2: {
    bible_reading_reference: "Exodus 2",
  },
  3: {
    bible_reading_reference: "Hebrews 11",
  },
  4: {
    bible_reading_reference: "Acts 7",
  },
  5: {
    day_title: "A Home in the Wilderness",
    bible_reading_reference: "Psalm 90",
    devotional_text: `Moses does not go from Egypt straight to the spotlight. He goes into the wilderness.

That hidden life matters more than most people realize. Moses marries Zipporah. He becomes part of Jethro's family. He has sons. He learns the slow life of a shepherd. Day after day, year after year, he walks dry ground, watches sheep, and lives far away from the palace he once knew.

Psalm 90 is the only Psalm tied directly to Moses, and you can feel the wilderness in it. It sounds like a man who has learned how small human life is and how great God is. It sounds like a man who knows what it means to count his days and ask God for wisdom.

That is part of Moses' story too. Not just power. Not just plagues. Not just mountains on fire. Also hidden years. Family years. Quiet years. The kind of years where God trains a man deeply before using him publicly.

If your life feels slower than you wanted, this chapter in Moses' story should encourage you. God does some of His best shaping in seasons that look uneventful from the outside.`,
    reflection_question: "What hidden or slower season in your life might actually be part of God's training, not proof that you are behind?",
  },
  6: {
    day_title: "The Fire in the Bush",
    bible_reading_reference: "Exodus 3",
    devotional_text: `One normal day in the wilderness becomes the day that changes everything.

Moses is out with the flock when he sees a bush burning without being consumed. That alone is enough to stop him. But then God calls his name. Not a crowd. Not a king. Not a priest. Moses. In the quiet of the desert, God speaks directly to the man He has chosen.

This scene is so important because it shows how calling begins. God interrupts ordinary life with holy presence. Moses is not chasing a platform. He is not trying to force a new future. He is doing normal work when the God of Abraham, Isaac, and Jacob breaks in.

The burning bush is not just about spectacle. It is about invitation. God is drawing Moses near. He is revealing that the next part of Moses' life will not be built on self-effort, but on the presence of the living God.

Many people want a calling but do not want the interruption that comes with it. Moses teaches us that real calling begins when we turn aside long enough to notice what God is doing.`,
    reflection_question: "Has God been trying to get your attention in an area of your life that you keep walking past because it feels too ordinary?",
  },
  7: {
    day_title: "Who Am I?",
    bible_reading_reference: "Exodus 4",
    devotional_text: `The moment God calls Moses, Moses starts listing reasons it should be someone else.

What if they do not believe me? What if they do not listen? What if I cannot speak well enough? What if my weakness gets exposed? Under all of those questions is one deeper fear: Who am I to do this?

Exodus 4 is one of the most honest chapters in Moses' story because it shows how human fear responds to divine calling. Moses is not acting bold. He is nervous, hesitant, and trying to imagine every possible way this could go wrong.

And still, God does not back away. He gives signs. He gives words. He gives help. He even gives Aaron. The point is not that Moses suddenly becomes fearless. The point is that God's calling survives Moses' insecurity.

This chapter matters for anyone who feels unqualified. God is not waiting for you to feel impressive before He can use you. He is looking for obedience that leans on His strength instead of your own.`,
    reflection_question: "What excuse or insecurity do you keep putting in front of God when He may already be telling you to move forward?",
  },
  8: {
    day_title: "When Obedience Makes Things Worse",
    bible_reading_reference: "Exodus 5",
    devotional_text: `Moses finally obeys and walks into Pharaoh's world with the word of God.

And at first, everything gets worse.

Pharaoh hardens his heart. The work gets heavier. The people suffer more. Instead of looking like a deliverer, Moses suddenly looks like the man who made their lives harder. That is brutal. It is one thing to fear Pharaoh. It is another thing to obey God and still have people turn on you.

This is one of the most painful parts of the story because it reminds us that obedience is not always followed by instant relief. Sometimes obedience stirs up the battle. Sometimes the chains shake before they break. Sometimes the first visible result of doing what God said is more pressure, not less.

Moses takes that pain back to God. He does not hide it. He asks hard questions. And that is part of faith too. Real faith does not mean pretending the pain is not real. It means bringing the pain honestly to the Lord.`,
    reflection_question: "Have you ever obeyed God and then felt confused because life got harder instead of easier?",
  },
  9: {
    day_title: "I Will Bring You Out",
    bible_reading_reference: "Exodus 6",
    devotional_text: `After the pressure of Exodus 5, God speaks again.

Exodus 6 is full of strong promises. "I will bring you out." "I will free you." "I will redeem you." "I will take you as my own people." God keeps talking to Moses because Moses needs more than assignment. He needs reassurance. He needs to remember who is actually carrying this story.

This chapter is important because it pulls Moses' eyes off Pharaoh for a minute and puts them back on God. Pharaoh is loud. Opposition is loud. Discouragement is loud. But God's promise is deeper than all of it.

Moses also learns something every leader has to learn: just because people are discouraged does not mean God has changed His mind. Israel struggles to hear because they are crushed in spirit. That does not make God's word less true.

Sometimes one of the holiest things God does is simply repeat Himself to a tired person until their faith can breathe again.`,
    reflection_question: "Which promise of God do you need to hear again right now because pressure has made you forget it?",
  },
  10: {
    day_title: "Power Against Egypt",
    bible_reading_reference: "Exodus 7",
    devotional_text: `Now the showdown really begins.

Exodus 7 is not just about a miracle. It is about authority. Moses and Aaron stand in Pharaoh's world carrying God's word, and Egypt starts to learn that Israel's God is not one more tribal god among many. He is Lord.

The Nile turns to blood. What Egypt trusted becomes unclean. What Egypt depended on becomes a sign of judgment. Moses is watching God confront a whole system of false power one step at a time.

And this is where Moses keeps growing. He is no longer the man reacting in his own strength like he did in Exodus 2. Now he waits for God's word, speaks God's word, and watches God act. That pattern is changing him.

The chapter reminds us that calling is not only about compassion. It is also about confrontation. Sometimes God sends you into places where His truth must stand against lies that have been ruling for a long time.`,
    reflection_question: "Where is God teaching you to rely on His authority instead of trying to force things in your own strength?",
  },
  11: {
    day_title: "Frogs, Flies, and a Hard Heart",
    bible_reading_reference: "Exodus 8",
    devotional_text: `The pressure on Egypt keeps building, but Pharaoh keeps resisting.

Exodus 8 shows the strange mix that often appears in hard hearts. Pharaoh wants relief, but not surrender. He wants the plague gone, but he does not want to obey God. That is a dangerous place to live.

Moses sees that up close. He keeps coming back with the same message. He keeps watching Pharaoh bargain, delay, and harden himself again. And every round teaches the same lesson: when pride rules the heart, even clear evidence is not enough by itself.

There is also something steady about Moses in this chapter. He keeps returning, keeps speaking, keeps obeying. That matters. Faithfulness is not always dramatic. Sometimes it looks like bringing the same word back into the same hard room until God finishes what He started.

This chapter warns us not to confuse temporary emotion with real surrender. Pharaoh felt pressure. He did not bow. Those are not the same thing.`,
    reflection_question: "Is there an area where you want relief from pressure more than you want real surrender to God?",
  },
  12: {
    day_title: "Hail, Fire, and Fear",
    bible_reading_reference: "Exodus 9",
    devotional_text: `By Exodus 9, Egypt is getting hit from every side.

Disease, boils, hail, and fire fall on the land, and the scale of the judgment keeps rising. Pharaoh even starts saying things that sound close to confession. He admits he has sinned. But even then, his heart does not truly bend.

That is sobering. A person can say the right words in the middle of pain and still not actually change. Moses is learning to watch not only what people say under pressure, but what kind of heart remains after the pressure lifts.

This chapter also shows God's mercy inside judgment. Warnings are given. Space is given. Opportunities to respond are given. God is not reckless. He is just, patient, and clear.

Moses is living inside a story where God's power is undeniable, but he is also learning how stubborn the human heart can be when pride does not want to let go.`,
    reflection_question: "Have you ever said the right spiritual words in a hard moment without really letting God change your heart?",
  },
  13: {
    day_title: "Darkness Before Freedom",
    bible_reading_reference: "Exodus 10",
    devotional_text: `Locusts come. Darkness covers the land. Egypt feels the weight of judgment in a way it cannot ignore.

There is something powerful about this chapter because darkness is not only physical. It feels symbolic. Egypt, with all its glory and gods and control, is being shown for what it really is when the light of God is withdrawn.

Moses is still standing in the middle of that story, still speaking, still watching Pharaoh resist. By now, he has seen again and again that God does not need quick circumstances to prove His power. God can lead a story through stages and still be fully in control.

This chapter also reminds us that freedom can be very close while the situation still looks dark. Some of the darkest moments in Scripture happen right before major deliverance.

So do not judge the whole story by the chapter where the lights are off. God may be closer to breakthrough than you think.`,
    reflection_question: "What dark season in your life are you tempted to misread as the end when it may only be the chapter before deliverance?",
  },
  14: {
    day_title: "The Last Warning",
    bible_reading_reference: "Exodus 11",
    devotional_text: `Exodus 11 feels like the room going quiet before the final blow.

God tells Moses what is coming next. The last plague will break Egypt in a way the others have not. The firstborn will die, and Pharaoh will finally let the people go.

This chapter matters because it shows that God is never guessing. Moses may be living one step at a time, but God sees the whole path. He knows when Pharaoh will break. He knows when the captivity will end. He knows what the final turning point will be.

For Moses, this has to deepen trust. He is no longer just reacting to crisis. He is hearing God ahead of crisis. He is learning that the Lord is not trapped inside events. The Lord rules over them.

Sometimes the final warning before breakthrough is also the moment that reveals just how serious the battle really was.`,
    reflection_question: "How does it change your faith to remember that God sees the full story even when you can only see the next step?",
  },
  15: {
    day_title: "The Night Everything Changed",
    bible_reading_reference: "Exodus 12",
  },
  16: {
    day_title: "The Sea in Front, The Army Behind",
    bible_reading_reference: "Exodus 14",
  },
  17: {
    day_title: "Meeting God at Sinai",
    bible_reading_reference: "Exodus 19",
    devotional_text: `After Egypt, after the sea, after all the movement, Moses leads the people to Sinai.

This is one of the holiest parts of his story. Thunder. Smoke. Boundaries. The mountain shaking under the presence of God. Everything about Exodus 19 tells the people that they are not dealing with an ordinary force. The God who rescued them is also the God who is holy.

For Moses, Sinai is not just a location. It is part of his calling. He is the one going up and down the mountain, receiving the word of God and carrying it back to the people. He is standing in the space between heaven's holiness and earth's fear.

This chapter shows that Moses was not only called to bring people out of Egypt. He was called to bring them near the presence of God.

That is still a beautiful part of spiritual leadership. Not just helping people escape bondage, but helping them encounter the God who set them free.`,
    reflection_question: "Do you want God's help more than you want God's presence, or are you still hungry for both?",
  },
  18: {
    day_title: "The Calf and the Broken Tablets",
    bible_reading_reference: "Exodus 32",
  },
  19: {
    bible_reading_reference: "Numbers 11",
  },
  20: {
    day_title: "The Final Song of Moses",
    bible_reading_reference: "Deuteronomy 32",
    devotional_text: `By the time we reach Deuteronomy 32, Moses is an old man near the end of his assignment.

And what does he do? He sings. He gives Israel a final song full of warning, memory, truth, and covenant language. This is not the voice of a shallow leader. This is the voice of a man who has walked with God through deserts, rebellions, miracles, grief, and glory.

There is something beautiful about Moses ending with words that look forward. He is not only thinking about his own life. He is thinking about the next generation. He wants them to remember who God is, what God has done, and what happens when people forget Him.

This chapter lets us see Moses not just as a rescuer, but as a shepherd of memory. He is trying to leave Israel with truth strong enough to outlive him.

That matters for all of us. A faithful life does not only finish its own race. It also leaves behind something true for the people coming after.`,
    reflection_question: "What truth from your walk with God do you want the people after you to remember because you lived it clearly?",
  },
  21: {
    bible_reading_reference: "Deuteronomy 34",
  },
};

const chapterStoryExpansions: Record<number, string> = {
  1: `If you read Exodus 1 slowly, the chapter keeps getting darker. First Pharaoh is worried. Then he starts controlling. Then he enslaves. Then he commands death. That is how evil often grows. It rarely starts by showing its full face at once. It hardens step by step.

The chapter also makes room for quiet courage. Shiphrah and Puah do not look powerful on paper, but they fear God more than Pharaoh, and that changes the story. Before Moses is ever floating in a basket, God is already using brave obedience to protect the future.

So day one of Moses' story is not really about comfort. It is about pressure, power, fear, and hidden courage. That is where the story starts. Not in glory, but in a world already at war with the purposes of God.`,
  2: `Exodus 2 reads like a film. A mother hiding a child. A basket sealed and set in the reeds. A sister watching from a distance. A princess moved with compassion. Then the surprising turn: Moses' own mother is brought back into the story to nurse him.

But the same chapter keeps moving. Moses grows up, sees the suffering of the Hebrew people, kills an Egyptian, gets exposed, and runs. So the chapter carries both rescue and failure. Mercy and impulsiveness. Protection and collapse.

That is why Moses' story feels so human. Even in the chapter where God preserves his life, you can already see the cracks in the man he will become. God saves him early, but He is still going to have to shape him deeply.`,
  3: `Hebrews 11 does something powerful with Moses' story. It does not just retell events. It tells you how heaven sees them. Moses' parents hid him by faith. Moses refused to be known only as Pharaoh's daughter's son by faith. He chose mistreatment with God's people over the temporary pleasures of sin by faith.

That matters because the palace years were not just about identity tension. They were also about choices. Moses had access to comfort, status, and the full machinery of Egypt. But the deeper pull in him was toward the people of God and the promises of God.

So this day is not random. It shows you that even before the burning bush, Moses' heart was already being bent away from Egypt's glory and toward God's story.`,
  4: `Acts 7 lets Stephen retell Moses' early life with sharp focus. Moses is rescued, educated, mighty in words and deeds, then driven by a burden for his people. But when he tries to act in his own timing, he is rejected and forced to flee.

Stephen's retelling shows the tragedy clearly: Moses thought the people would understand that God was using him to rescue them, but they did not. That had to be painful. He was already reaching toward calling, but he was reaching the wrong way.

Then Midian comes into view again. Not as an accident, but as the next stage in the story. Acts 7 helps us see Moses' life as one long preparation, not just a collection of random scenes.`,
  5: `Psalm 90 gives the wilderness years emotional weight. It sounds like a man who has watched years pass, graves multiply, people fade, and God remain. "Teach us to number our days" is not a throwaway line. It sounds like someone shaped by long time and hard ground.

So while this day covers Moses' home in the wilderness, the Psalm lets you feel the deeper lesson of that season. Moses is not just passing time. He is learning how brief life is, how holy God is, and how much wisdom a human being really needs.

That makes the Midian years feel less empty. They were not dead years. They were the years where Moses was learning how to see life through the eyes of eternity.`,
  6: `Exodus 3 is one of those chapters where almost every line matters. Moses sees the bush, turns aside, hears his name, removes his sandals, and learns that the God speaking is the God of covenant history.

Then God reveals His heart and His mission. He has seen. He has heard. He has come down. And Moses is the one He is sending. This is not just a mystical moment. It is the hinge of Moses' whole life.

The chapter moves from wonder to assignment, from holy ground to hard calling. That is why it feels so alive. God is not only showing Moses something beautiful. He is bringing Moses into the burden of divine rescue.`,
  7: `Exodus 4 keeps the burning bush conversation going, but now the focus shifts to Moses' resistance. Sign after sign, excuse after excuse. It is almost painful to watch because you can feel how afraid Moses is.

But the chapter is also generous. God gives what Moses needs. A sign in the staff. A sign in the hand. Words for his mouth. Aaron as help. The chapter is not only about Moses doubting. It is about God patiently answering fear without surrendering the assignment.

So this day really is the next part of the story. Moses has heard the call in Exodus 3. Now in Exodus 4 he has to wrestle with what it will cost him to say yes.`,
  8: `Exodus 5 is where the story gets heavy fast. Moses and Aaron obey. Pharaoh mocks God. The workload increases. The people suffer more. And Moses becomes the face people blame.

It is such an important chapter because it destroys the shallow idea that obedience always produces instant improvement. Sometimes obedience exposes the chains in a sharper way. Sometimes the enemy tightens down before the breakthrough comes.

And right there at the end of the chapter, Moses talks back to God from the pain. That is not polished faith. That is wounded faith. But it is still faith, because he is still bringing it to the Lord.`,
  9: `Exodus 6 feels like God speaking steady words into a shaken man. The chapter is packed with "I will" promises. God is almost rebuilding Moses from the inside by repeating what He intends to do.

The people cannot fully hear because they are crushed in spirit. That makes the chapter even sadder and even more important. God's word is strong, but human despair can still be heavy.

So the lesson here is not random encouragement. It is this: when the story gets dark, God often responds by saying again what He already said, until faith has something solid to stand on.`,
  10: `Exodus 7 opens the plague story and changes the whole atmosphere. Aaron's staff becomes a serpent. The Nile turns to blood. Pharaoh sees power and still refuses to bow.

This chapter is the first full collision between Egypt's world and the word of the Lord. Moses is no longer only the man with excuses. He is now standing in the court of power carrying God's message into enemy territory.

That is part of the growth of Moses. His story is moving from inward hesitation to outward obedience. He is still dependent, still learning, but he is now walking into the exact place fear once told him to avoid.`,
  11: `Exodus 8 keeps pressing the same conflict. Frogs. Gnats. Flies. Pharaoh says enough to sound close to surrender, then hardens again.

That repetition is the point. This chapter lets you feel the grind of the battle. Moses is not winning through one speech. He is staying faithful through repeated cycles of resistance.

It also gives you a close look at the human heart. Pharaoh wants relief without repentance. He wants the pain lifted without the pride broken. And that is a warning that still matters now.`,
  12: `Exodus 9 raises the pressure again. Disease strikes livestock. Boils spread. Hail and fire fall. The chapter feels like judgment getting louder.

Yet even here God gives warning, which means His justice is not careless. People are told what is coming. They are given room to respond. That detail matters.

For Moses, this chapter keeps teaching the same thing at a deeper level: God is patient, powerful, and never confused about who is really in control.`,
  13: `Exodus 10 brings locusts and then darkness, and the tone gets almost apocalyptic. Egypt is unraveling. What once looked unshakable is being stripped down in front of everyone.

The darkness is especially powerful because it feels bigger than weather. It feels like a sign that Egypt's light was never ultimate. God's word can darken a kingdom and still keep His people moving toward freedom.

Moses is still in that story, still carrying the next word of God into the same hardened room. That repeated obedience is part of the story too.`,
  14: `Exodus 11 is quiet compared to the chapters around it, but the quiet feels heavy. God tells Moses the final plague is coming, and you can feel the story tightening toward its turning point.

This chapter is about certainty. God knows what is next. He knows when Pharaoh will bend. He knows when Egypt will finally let go. Moses is not living inside random chaos. He is living inside a story God sees from beginning to end.

That matters because sometimes the last warning before deliverance is the moment that proves God had the whole ending in His hand all along.`,
  15: `Exodus 12 is full of movement. Lambs chosen. Blood placed. Bread baked in haste. Sandals on feet. Staffs in hand. It feels like a people standing in the doorway between slavery and freedom.

Then the night falls and history turns. Egypt breaks. Pharaoh lets them go. The chapter is heavy and holy at the same time.

For Moses, this is the night where years of waiting, confrontation, fear, and obedience all collide in one moment. The lesson of the chapter is not just that God delivers. It is that He delivers in a way that teaches His people to remember forever.`,
  16: `Exodus 14 slows the whole escape down long enough for fear to explode. The people see the sea, see the army, and panic. Everything about the scene says trapped.

Then Moses speaks one of the most important lines in his story: "Stand firm." That line matters because it shows who he is becoming. The man who once ran now stands. The man who once acted in flesh now waits on God under pressure.

And then the sea opens. This chapter is not just a miracle chapter. It is a formation chapter. It shows what years of hearing God are producing inside Moses.`,
  17: `Exodus 19 changes the story from deliverance to encounter. The people are out of Egypt, but now they must learn who the God is who brought them out.

Thunder, smoke, boundaries, consecration, and fear fill the chapter. Moses moves up and down the mountain carrying God's words. He is no longer only a deliverer. He is becoming a mediator between holy presence and trembling people.

That is why this day matters in the flow. Moses' story is not only about getting people free. It is about bringing them into covenant nearness with God.`,
  18: `Exodus 32 is brutal because of the contrast. Moses is with God on the mountain while the people are making a calf below. Glory above. Idolatry below.

When Moses comes down, the broken tablets show outwardly what has already been broken inwardly. But the chapter does not end with anger alone. It moves into intercession. Moses pleads. Moses stands in the gap.

That means this chapter shows two crucial parts of Moses' heart at once: he can confront sin honestly, and he can still carry broken people before God in prayer.`,
  19: `Numbers 11 puts you in the long middle of leadership. The miracles are behind, the promised land is ahead, and the daily burden is grinding Moses down.

Complaints rise. Moses reaches his limit. He tells God the load is too heavy. That honesty is part of the chapter's power. It shows that even great leaders can crack under constant pressure.

And God meets him there, not by shaming him, but by sharing the load. This day pushes the story forward by showing what Moses' calling costs over time.`,
  20: `Deuteronomy 32 feels like Moses looking at the whole story from the end and turning it into a song. He is remembering covenant, warning Israel, and testifying to who God has been.

This chapter gives Moses' final words the weight they deserve. He is not just ending a life. He is handing truth forward.`,
  21: `Deuteronomy 34 is the final scene, and it is quiet in a holy way. Moses climbs, sees, and dies under God's care.

The chapter does not read like a wasted life. It reads like the end of a long assignment carried out in the presence of God. Moses' story closes not with spectacle, but with faithfulness remembered.

That is why the final lesson fits the whole devotional. The calling of Moses was never mainly about arriving somewhere famous. It was about hearing God, obeying God, and belonging to God all the way to the end.`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  ...(devotionalDayOverrides[day.day_number] || {}),
  devotional_text: chapterStoryExpansions[day.day_number]
    ? `${(devotionalDayOverrides[day.day_number]?.devotional_text ?? day.devotional_text)}\n\n${chapterStoryExpansions[day.day_number]}`
    : (devotionalDayOverrides[day.day_number]?.devotional_text ?? day.devotional_text),
}));

async function main() {
  console.log("Starting to seed 'The Calling of Moses' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Calling of Moses",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through the life of Moses. Walk from the Nile to Midian, from the burning bush to Pharaoh, from Sinai to the edge of the promised land, and see what it looks like to hear God and still fulfill your calling.",
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

  let successCount = 0;
  let failCount = 0;

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
      failCount++;
    } else {
      console.log(`Day ${day.day_number}: ${day.day_title}`);
      successCount++;
    }
  }

  console.log("\nSeed Summary:");
  console.log(`  Successfully seeded: ${successCount} days`);
  if (failCount > 0) {
    console.log(`  Failed: ${failCount} days`);
  }
  console.log("\nDone! 'The Calling of Moses' devotional is ready.");
}

main().catch(console.error);
