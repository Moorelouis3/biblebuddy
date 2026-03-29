// Script to seed "The Heart of David" devotional with all 21 days
// Run with: npx tsx scripts/seed-heart-of-david.ts
console.log("Executing: scripts/seed-heart-of-david.ts");

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
  return { book: "1 Samuel", chapter: 16 };
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
    day_title: "Chosen in the Field",
    devotional_text: `David's story does not begin in a palace. It begins in a field.

When Samuel comes to Jesse's house, everyone expects the next king to look strong, older, and impressive. But God is not looking at the same thing people are looking at. One by one the obvious choices pass by, and God says no.

Then David is called in from the sheep. He is young. He smells like the field, not the throne room. And yet that is the one God chooses.

That is one of the most important truths in David's whole life. God does not choose him because he looks like a king. God chooses him because of his heart. Scripture does not mean David is perfect. It means there is something real in him, something turned toward God.

Many people feel overlooked because they are not the loudest, oldest, most polished, or most impressive. David reminds us that heaven does not measure people the way earth does. God sees deeper than appearance. He sees motive, hunger, humility, and the kind of heart a person carries when no one is watching.`,
    bible_reading_reference: "1 Samuel 16",
    reflection_question: "Do you spend more time worrying about how people see you or about the kind of heart God sees in you?",
  },
  {
    day_number: 2,
    day_title: "The Heart of a Shepherd",
    devotional_text: `Before David ever leads people, he learns how to care for sheep.

That matters more than it sounds. Shepherding is quiet work. It is patient work. It is hidden work. It teaches attention, courage, and consistency. A shepherd has to protect what is weak, stay awake when others sleep, and keep going when nobody applauds.

Psalm 23 helps us see something beautiful. David did not only learn how to be a shepherd. He learned how to see God as his Shepherd. Somewhere in those lonely fields, David began to trust that the Lord guides, restores, protects, and stays near.

That is part of what shaped the heart of David. He was not just talented. He was formed in secret places. He learned worship before fame. He learned dependence before influence.

A lot of people want public impact without hidden formation. David's early life reminds us that the field is not wasted space. God often grows depth in private before He entrusts responsibility in public.`,
    bible_reading_reference: "Psalm 23",
    reflection_question: "What hidden season in your life may be teaching you things that public success never could?",
  },
  {
    day_number: 3,
    day_title: "The Boy Who Faced Goliath",
    devotional_text: `David walks into one of the most famous scenes in the Bible carrying food for his brothers and ends the day standing over Goliath.

What makes that story powerful is not just David's courage. It is the way he sees the moment. Everyone else sees a giant. David sees a man mocking the living God. Everyone else measures size. David measures covenant.

He refuses Saul's armor because he knows his strength is not in looking like a soldier. His confidence is in the Lord who delivered him before. He remembers the lion. He remembers the bear. He remembers what God has already done in secret, and that memory gives him boldness in public.

David is young, but his faith is not shallow. He knows that the battle is the Lord's. That is why he can step forward when everyone else steps back.

This story is not telling us to be reckless. It is showing us what happens when a person has spent enough time with God that fear no longer gets the final word. David's victory began long before the stone left the sling.`,
    bible_reading_reference: "1 Samuel 17",
    reflection_question: "What giant in your life feels bigger than it should because you have been looking at its size more than God's strength?",
  },
  {
    day_number: 4,
    day_title: "When Success Turns Dangerous",
    devotional_text: `After Goliath, David's life changes fast.

People sing about him. Saul notices him. Jonathan loves him. Victory opens doors, but it also opens a new kind of danger. Saul becomes jealous. The very gift that made David visible starts making him a target.

This chapter teaches something a lot of people learn the hard way. Blessing can attract opposition. Success can wake up envy in people who were fine with you as long as you stayed small. David does not do anything wrong to create Saul's jealousy. Saul's heart is simply not right with God.

And still, David has to live with the results. He learns that favor and pressure can arrive at the same time.

That matters for anyone who thinks that once God starts moving, life will get simple. Sometimes the next challenge comes because God is moving, not because He stopped moving. David's rise did not erase conflict. It changed the shape of it.`,
    bible_reading_reference: "1 Samuel 18",
    reflection_question: "Have you ever felt pressure or jealousy from others after God began opening doors in your life?",
  },
  {
    day_number: 5,
    day_title: "Running from Saul",
    devotional_text: `By 1 Samuel 19, David is no longer just a rising hero. He is a hunted man.

Saul throws a spear. David escapes. Michal helps him flee. The house is no longer safe, the king is no longer trustworthy, and the future is no longer clean and simple.

This is one of the deep tensions in David's story. He has already been anointed, but he is not yet reigning. He has promise over his life, but he is living under threat. That space between promise and fulfillment can be one of the hardest spaces to live in.

David learns there what many believers learn: being chosen by God does not mean life becomes easy. Sometimes it means you have to trust God more deeply because the road gets darker before the promise becomes visible.

David's life is becoming dramatic, but it is also becoming painful. That is part of what gives his Psalms so much weight later. He is not writing from theory. He knows what it feels like to need God in the middle of real danger.`,
    bible_reading_reference: "1 Samuel 19",
    reflection_question: "Where in your life do you feel caught between what God promised and what your current reality looks like?",
  },
  {
    day_number: 6,
    day_title: "A Friend Named Jonathan",
    devotional_text: `One of the most beautiful gifts in David's life is Jonathan.

Jonathan is Saul's son, which means he is the man who should have seen David as a threat. Instead, he loves David deeply and stands by him. That kind of friendship is rare and holy.

In 1 Samuel 20, Jonathan helps protect David even though it costs him something. He knows Saul's anger is real. He knows David is in danger. And he chooses loyalty over convenience.

This chapter matters because David's story is not only about battles, kingship, and failure. It is also about covenant friendship. God often strengthens people through faithful relationships, not just through dramatic miracles.

A friend like Jonathan is a mercy. Someone who tells the truth, takes risk for your good, and stays near in hard times can help carry you through seasons that might have crushed you alone.`,
    bible_reading_reference: "1 Samuel 20",
    reflection_question: "Do you have the kind of godly friendship that tells the truth and stays loyal even when life gets costly?",
  },
  {
    day_number: 7,
    day_title: "Living Like a Fugitive",
    devotional_text: `David's life gets even stranger in 1 Samuel 21.

He goes to Nob. He ends up in Gath. He eats holy bread. He acts insane to survive. None of this feels like the clean path people would imagine for a future king.

That is part of what makes David's story feel so real. It is not a straight line of victory. It is a life with fear, improvising, humiliation, and moments where survival becomes the only thing on the table.

And still, God does not lose David in all of that. Even in caves, foreign cities, and desperate moments, the Lord is still writing the story.

Some seasons of life feel disorienting like that. The future feels unclear. The next step is messy. Nothing looks royal. But God can still keep a person in the middle of a season that looks nothing like the promise spoken over them.`,
    bible_reading_reference: "1 Samuel 21",
    reflection_question: "Have you ever had a season that felt messy and humiliating even though you believed God still had a purpose over your life?",
  },
  {
    day_number: 8,
    day_title: "Whom Shall I Fear?",
    devotional_text: `Psalm 27 sounds like David writing from the middle of danger, not from a soft life.

"The Lord is my light and my salvation; whom shall I fear?" That is not denial. That is a declaration made against fear. David knows enemies are real. He knows evil is real. But he also knows the presence of God is stronger.

One of the most beautiful lines in this Psalm is David's hunger: "One thing I ask... that I may dwell in the house of the Lord." Even while surrounded by threat, his deepest desire is not only safety. It is nearness to God.

That is a huge part of the heart of David. He is not perfect, but he is hungry for God. Again and again, that hunger pulls him back toward the Lord.

When people talk about David being a man after God's heart, this is part of what they mean. He wanted God, not just God's help. He wanted presence, not just protection.`,
    bible_reading_reference: "Psalm 27",
    reflection_question: "When life gets heavy, do you mostly want God to fix things, or do you still want to be near Him Himself?",
  },
  {
    day_number: 9,
    day_title: "The Cave and the Cut Corner",
    devotional_text: `In 1 Samuel 24, David gets the chance many people would call obvious. Saul is vulnerable. David could kill him and end the chase.

But David refuses.

He cuts off a corner of Saul's robe, and even that troubles his heart. Why? Because David understands something important. Just because an opportunity is in front of you does not mean God wants you to take it that way.

David will not seize the throne through revenge. He will not force God's promise with his own hands. He trusts that if God truly made him king, God can bring it about without David stepping into murder.

This chapter shows real restraint. It shows the kind of fear of God that stops a person even when they have every emotional reason to strike back. David's heart is still soft enough to be checked by God in the middle of deep pain.`,
    bible_reading_reference: "1 Samuel 24",
    reflection_question: "Have you ever had a chance to get even or take control in a way that felt justified, but you knew it was not God's way?",
  },
  {
    day_number: 10,
    day_title: "The Voice of Abigail",
    devotional_text: `1 Samuel 25 is one of the most underrated chapters in David's life.

David is angry. Nabal has treated him with contempt. David is ready to answer insult with bloodshed. Then Abigail steps in with wisdom, humility, and courage.

She keeps David from making a terrible decision. That matters. Even a man after God's heart can get hot, offended, and dangerously close to doing something foolish. David needed someone wise enough to stop him.

Abigail becomes a picture of what godly wisdom looks like under pressure. She is brave without being loud. She is thoughtful without being passive. And David is humble enough to hear correction when it arrives through her.

That is a real strength. A person is in trouble when they can only hear themselves. David's willingness to stop, listen, and bless the Lord for sending Abigail says something important about his heart too.`,
    bible_reading_reference: "1 Samuel 25",
    reflection_question: "Are you humble enough to receive wise correction when God sends it through another person?",
  },
  {
    day_number: 11,
    day_title: "Mercy a Second Time",
    devotional_text: `David gets another chance to kill Saul in 1 Samuel 26.

That is important because mercy is one thing once. It is another thing twice. David is not acting on impulse anymore. He is choosing a way of life. He keeps refusing to take God's promise by sinful means.

He knows Saul is still dangerous. He knows the chase is still painful. But he also knows vengeance belongs to the Lord, not to him.

This chapter shows a kind of spiritual maturity. David is not just making one unusually noble choice. He is becoming the kind of man who keeps putting the matter back into God's hands.

That is difficult. A lot of people can surrender once. It is harder to surrender again when the same wound reopens. David teaches us that trust often has to be repeated, not just declared once.`,
    bible_reading_reference: "1 Samuel 26",
    reflection_question: "What situation in your life keeps tempting you to take control back instead of leaving it in God's hands?",
  },
  {
    day_number: 12,
    day_title: "King Over Judah",
    devotional_text: `David does not become king over all Israel in one quick moment.

In 2 Samuel 2, he first becomes king over Judah. That slow beginning matters. God is faithful, but He often unfolds promise in stages instead of all at once.

David also does not grab this step without prayer. He asks the Lord where to go. That small detail says a lot. Even after all these years, David is still depending on God's direction.

This chapter reminds us that real calling does not always arrive in one dramatic finish line. Sometimes it comes piece by piece, responsibility by responsibility, season by season.

David has finally moved out of pure survival mode, but even now the story is not finished. Partial fulfillment is still fulfillment, and it still requires faith.`,
    bible_reading_reference: "2 Samuel 2",
    reflection_question: "Are you able to thank God for partial progress, or do you only notice what has not fully happened yet?",
  },
  {
    day_number: 13,
    day_title: "King Over All Israel",
    devotional_text: `By 2 Samuel 5, David becomes king over all Israel.

This is a major turning point. The long years of waiting, hiding, fighting, and uncertainty lead to this moment. David also captures Jerusalem, and the city becomes central to the rest of his story.

What stands out in this chapter is not only achievement. It is the repeated reminder that the Lord was with David. That is the real center of his rise. The throne matters, but the presence of God matters more.

David also keeps asking God what to do in battle. Even as king, he is not supposed to become self-made in his mind. He still needs divine direction.

That is a good warning for all of us. New levels of responsibility can tempt people to stop praying. David at his best keeps remembering that success without dependence is still a dangerous place to live.`,
    bible_reading_reference: "2 Samuel 5",
    reflection_question: "When God gives you more responsibility, do you become more dependent on Him or more self-reliant?",
  },
  {
    day_number: 14,
    day_title: "David Danced Before the Lord",
    devotional_text: `2 Samuel 6 gives us one of the clearest pictures of David's worship.

The ark of God is being brought to Jerusalem, and David rejoices with all his strength. He dances before the Lord in a way that embarrasses Michal and likely shocks people who expected a king to act more polished.

But that is part of the heart of David. He cares more about honoring God than protecting his image. His worship is not casual. It is full, open, and alive.

Of course, the chapter also carries warning. Uzzah's death reminds everyone that God's holiness is real. Worship is joy, yes, but it is never careless. David has to learn that too.

This chapter holds together two things we need: deep joy in God's presence and deep reverence for God's holiness. David's life always seems strongest when those two stay together.`,
    bible_reading_reference: "2 Samuel 6",
    reflection_question: "Do you hold back your worship because you are too aware of how you look to other people?",
  },
  {
    day_number: 15,
    day_title: "A House for God and a Promise for David",
    devotional_text: `David wants to build a house for God in 2 Samuel 7.

That desire sounds noble, and in many ways it is. But God turns the conversation around. David is not the one who will build God's house. Instead, God says He will build David a house, meaning a lasting line, a future, a covenant promise.

This chapter matters because it shows David's heart in a beautiful moment. He wants to honor God. And then when God answers with even bigger grace, David responds in humility and wonder.

He sits before the Lord and asks, "Who am I?" That question sounds so right coming from him here. David sees that covenant mercy is bigger than anything he could have earned.

The heart of David is clearest not just in battle or worship, but also in humble amazement before the promises of God.`,
    bible_reading_reference: "2 Samuel 7",
    reflection_question: "When God gives grace bigger than what you expected, does it make you more entitled or more humble?",
  },
  {
    day_number: 16,
    day_title: "The Sin with Bathsheba",
    devotional_text: `David's story turns painfully in 2 Samuel 11.

He sees Bathsheba. He takes her. He tries to cover it. Then he arranges the death of Uriah. This chapter is dark because it shows how far even a deeply gifted and deeply worshipful man can fall when he stops guarding his heart.

David is no longer a young fugitive depending on God day by day in caves. He is powerful. Comfortable. Able to get what he wants. And that power becomes dangerous in his hands.

This part of David's life matters because the Bible refuses to protect its heroes from the truth. David is not a man after God's heart because he never sinned. He sinned terribly. The phrase means his life still had a deep pull toward God, even after serious failure.

But we should not soften the chapter. This sin is destructive, selfish, and devastating. It hurts Bathsheba, Uriah, David's house, and David's witness. Great calling does not cancel the need for daily obedience.`,
    bible_reading_reference: "2 Samuel 11",
    reflection_question: "What area of your life feels most dangerous right now because comfort, power, or secrecy could make compromise easier?",
  },
  {
    day_number: 17,
    day_title: "Create in Me a Clean Heart",
    devotional_text: `If 2 Samuel 11 shows David at his worst, Psalm 51 shows him turning back to God.

This Psalm is full of brokenness, confession, and honest repentance. David does not excuse himself. He does not blame pressure. He does not manage his image. He asks for mercy.

"Create in me a clean heart, O God." That line is one of the clearest windows into why David's life still matters to so many people. David fell hard, but he knew where to go with his sin. He went back to God with truth.

Repentance is not pretending the sin was small. Repentance is agreeing with God about how serious it was and asking Him to do what only He can do in the heart.

This Psalm does not erase consequences, but it does show the path back into honest relationship with God. That path is still open for broken people now.`,
    bible_reading_reference: "Psalm 51",
    reflection_question: "When you fail, do you become defensive and hidden, or do you become honest before God like David did here?",
  },
  {
    day_number: 18,
    day_title: "The Sword in David's House",
    devotional_text: `David is forgiven, but 2 Samuel 12 makes clear that consequences remain.

Nathan confronts him. David confesses. And yet the chapter still carries sorrow. The child dies. The house of David is marked by pain that will keep unfolding in later chapters.

This is one of the hardest truths in Scripture. Forgiveness is real, but sin still leaves damage. God restores relationship, but He does not always remove every earthly result of what was done.

David has to live with that. He has to grieve. He has to worship through loss. He has to keep walking with God while carrying the weight of what his choices set in motion.

That makes David's story painfully honest. Grace is not shallow. It is real enough to forgive the sinner and serious enough to tell the truth about the wreckage sin creates.`,
    bible_reading_reference: "2 Samuel 12",
    reflection_question: "Have you learned to receive God's forgiveness without pretending that sin leaves no real damage behind?",
  },
  {
    day_number: 19,
    day_title: "A Son Turns Against His Father",
    devotional_text: `By 2 Samuel 15, David is facing one of the most heartbreaking turns in his whole life. Absalom rises against him.

This is not just political pain. It is family pain. David has to flee Jerusalem while his own son leads a rebellion against him. That kind of grief cuts deep.

And still, even in this chapter, David keeps showing signs of surrender. He sends the ark back. He refuses to treat God's presence like a lucky object he can carry into crisis. He leaves room for God to decide what comes next.

That says a lot about the heart of David. Even in anguish, even while leaving the city barefoot and weeping, he knows the Lord is not something to be manipulated.

David's life at this stage is full of consequences, sorrow, and humility. The man who once ran from Saul is now running from his own son. Sin reaches far. But even here, David is still bringing himself back under God.`,
    bible_reading_reference: "2 Samuel 15",
    reflection_question: "When life breaks your heart, do you still leave room for God to be God, or do you start trying to control everything harder?",
  },
  {
    day_number: 20,
    day_title: "The Song at the End of the Battle",
    devotional_text: `2 Samuel 22 gives us David's song of praise near the later years of his life.

He looks back and remembers God as rock, fortress, deliverer, shield, and refuge. Those are not random worship words. They come from a man who has actually needed God to be all of those things.

This chapter is powerful because it lets us hear David interpret his whole life through worship. The battles, the caves, the throne, the enemies, the rescue, the pain, the victories, the waiting, all of it gets brought back to God in praise.

That is a beautiful part of spiritual maturity. A person starts seeing their history not just as events that happened, but as places where God carried them, corrected them, rescued them, and stayed with them.

David's life is messy, but by the end he still knows where the glory belongs. It belongs to God.`,
    bible_reading_reference: "2 Samuel 22",
    reflection_question: "If you looked back over your life as worship, where would you most clearly say, 'God really carried me there'?",
  },
  {
    day_number: 21,
    day_title: "The Last Charge of David",
    devotional_text: `David's life ends in 1 Kings 2.

He speaks to Solomon, gives final charges, and then dies after a life full of worship, war, victory, failure, repentance, covenant, heartbreak, and mercy. David's story is one of the fullest human stories in the Bible.

That is what makes the title so fitting. The heart of David is not the heart of a flawless man. It is the heart of a man who kept getting brought back toward God. Sometimes that happened through worship. Sometimes through tears. Sometimes through correction. Sometimes through pain.

David teaches us that a soft heart matters. A heart that can worship, repent, receive correction, love God's presence, and keep returning to the Lord matters.

That does not make sin light. David's failures were heavy. But it does show the kind of life God can still work through when a person refuses to stay far from Him forever. The heart of David is not perfection. It is return.`,
    bible_reading_reference: "1 Kings 2",
    reflection_question: "What do you want your life to say at the end: that you looked strong, or that your heart kept coming back to God?",
  },
];

const chapterStoryExpansions: Record<number, string> = {
  1: `If you stay inside 1 Samuel 16, the whole scene builds tension on purpose. Jesse's older sons pass in front of Samuel, and each one looks like the obvious choice. The chapter forces you to feel how strong the pull of appearance is.

Then David is brought in from the fields. That detail matters. He is not already in the room because no one expected him to be the answer. But God did. The oil is poured, and the Spirit of the Lord rushes upon him. That is the real turning point of the chapter.

So day one is not just a lesson about humility. It is the opening scene of David's story. God starts with the overlooked son in the field and says, this is the one.`,
  2: `Psalm 23 makes the shepherd years feel alive. Green pastures, still waters, dark valleys, a rod and staff, enemies at the table. David is not writing abstract poetry. He is turning real life with God into words.

That is why this day works as the next chapter in the story. Before David is a warrior or king, he is a boy learning what kind of Shepherd God is. Those private revelations become part of what later gives him courage.

The field is where David learns to trust God before he ever has to represent God in public.`,
  3: `1 Samuel 17 does not just tell you David fought Goliath. It lets you watch the whole build. The giant taunts. Israel freezes. David arrives with lunch. He hears the insult. Everyone around him thinks he is too small, too young, too unrealistic.

Then the chapter turns when David starts remembering. Lion. Bear. Deliverance. That is the real fuel of his courage. He is not just bold by temperament. He is interpreting the moment through what God has already done.

By the time the stone flies, the battle is already theological. Goliath is big, but he is not ultimate. That is why this scene pushes David's story forward so strongly.`,
  4: `1 Samuel 18 feels like the price of visibility. One song from the women and the atmosphere changes. David is successful, but Saul's eyes are no longer clean.

The chapter keeps showing David acting wisely while Saul grows darker. That contrast matters. One man's success is producing humility and favor. The other man's insecurity is producing suspicion and rage.

This is how the next chapter of David's life begins. Not with comfort after victory, but with the realization that public favor can put a target on your back.`,
  5: `1 Samuel 19 turns the danger from emotional to physical. Spears are thrown. Orders are given. Escape becomes necessary.

What makes the chapter heavy is that David is not running from a foreign enemy. He is running from the king he has faithfully served. That betrayal gives the story a different kind of pain.

So this day is not just about fear. It is the moment David's life changes from rising public hero to hunted man living between promise and survival.`,
  6: `1 Samuel 20 deepens the story by slowing it down enough to show friendship under pressure. Jonathan and David make plans, test Saul's intent, and speak honestly about what is happening.

The chapter hurts because Jonathan can see what his father has become, and David can feel how unsafe the future is. Yet covenant friendship stands in the middle of all of that.

That is why this day matters in the flow. David's story is not only about enemies and destiny. It is also about the people God gives you to help hold you steady while the story gets harder.`,
  7: `1 Samuel 21 is one of those chapters that makes David feel painfully real. He lies. He scrambles. He survives however he can. He ends up in humiliating territory.

That matters because the story is no longer clean heroism. The pressure is exposing fear and weakness too. David is still God's chosen man, but he is not gliding through this season untouched.

So this day pushes the devotional forward by showing what promise looks like when it has to live through confusion, desperation, and strange survival moments.`,
  8: `Psalm 27 sounds even stronger when you remember the chapters around it. David is not writing from a spa day. He is writing as someone who knows enemies, betrayal, and the need for courage.

That is why the Psalm's hunger is so striking. In the middle of threat, he still wants God's presence. He is not only trying to escape pain. He is trying to stay near the Lord.

This is the next part of the story because it lets you hear what David sounds like on the inside while the fugitive years are happening on the outside.`,
  9: `1 Samuel 24 is full of suspense. The cave, the hidden men, Saul vulnerable, David with the chance to end it. The chapter wants you to feel how easy it would have been to justify the wrong choice.

That is why David's restraint is so important. He does not only spare Saul. He refuses to grab the promise by violating God's heart. Even cutting the robe affects him deeply.

So this day is a real turning point. David is proving what kind of man he will be while he waits to become king.`,
  10: `1 Samuel 25 gives David a different kind of battle. No giant. No cave. No king. Just insult, ego, anger, and the speed with which a wounded man can head toward sin.

Abigail enters the story at exactly the right moment, and the chapter becomes a picture of God using wisdom to stop a future king from creating unnecessary bloodshed.

This keeps the story honest. David is brave, but he can still burn hot. He can still be redirected. And that humility to stop matters.`,
  11: `1 Samuel 26 repeats the Saul test on purpose. The chapter is asking whether David's mercy in the cave was a one-time moment or a real pattern in his heart.

David passes again. He takes the spear and water jug, but not Saul's life. He leaves judgment with God again.

That is why this day moves the story. Repeated obedience shapes identity. David is becoming the kind of king who does not seize power through vengeance.`,
  12: `2 Samuel 2 is quieter than the earlier chapters, but it matters because it shows promise unfolding slowly. David asks God, moves to Hebron, and begins reigning over Judah.

The chapter still has tension. Division remains. Conflict remains. But the story has clearly shifted. David is not only surviving anymore. He is beginning to carry real kingship.

That slow rise gives the story weight. God is fulfilling what He promised, but not in one easy leap.`,
  13: `2 Samuel 5 feels like long-awaited arrival. The tribes come. Jerusalem is taken. Victories grow. David's reign strengthens.

But even this chapter keeps showing dependence. David inquires of the Lord. He does not assume kingship means independence from God.

That is why this day is more than a coronation scene. It is the chapter where David's public calling becomes visible in full, while still being tied to God's presence.`,
  14: `2 Samuel 6 is one of the most vivid worship chapters in David's life. There is movement, music, awe, fear, and joy all at once.

The chapter refuses to let worship become shallow. Uzzah's death shows holiness. David's dancing shows delight. Both are necessary.

So this day keeps the story moving by showing what David does with power at his best: he turns it into worship before the Lord instead of image management before people.`,
  15: `2 Samuel 7 deepens David beautifully. He wants to honor God, but God answers with something larger: covenant promise over David's line and future.

Then David sits before the Lord in wonder. That posture matters. He is king, but here he is simply a man overwhelmed by grace.

This is one of the strongest windows into David's heart because it shows him receiving, not performing. Listening, not striving.`,
  16: `2 Samuel 11 is deliberately painful to read. David sees, sends, takes, hides, and finally arranges death. The chapter keeps descending.

That structure matters because it shows how sin spreads when it is fed instead of stopped. This is not one slip. It is a chain of choices.

So this day is the tragic turning point in the story. The man after God's heart has now wounded his own heart, his house, and many others.`,
  17: `Psalm 51 gives the inside voice after the outside disaster. Mercy, cleansing, truth in the inward being, a clean heart, a renewed spirit. The language is broken and hopeful at the same time.

That is why this day belongs exactly here. The story could not jump from Bathsheba to later consequences without stopping at repentance. This Psalm is the bridge.

David cannot undo what he did, but he can stop lying about it before God. And that honesty becomes one of the most important lessons in his whole life.`,
  18: `2 Samuel 12 is painful because grace and consequence stand together in the same chapter. Nathan confronts. David confesses. Forgiveness is spoken. Sorrow remains.

That tension is exactly why this chapter matters. It teaches that restoration with God is real, but sin is never small just because mercy is available.

This pushes the story forward into the second half of David's life, where he has to live not only as king, but as a forgiven man carrying the consequences of his own choices.`,
  19: `2 Samuel 15 is heartbreaking on a different level. Absalom's rebellion makes David's pain intensely personal. The conflict is now inside his own house.

The chapter feels heavy because David leaves Jerusalem weeping, barefoot, and humbled. Yet even there he keeps surrender in front of him. He sends the ark back. He leaves room for God.

So this day shows what David looks like under deep family pain: shaken, grieving, but still not trying to control God.`,
  20: `2 Samuel 22 lets David look backward and interpret his whole life through praise. The God who delivered him from enemies is the God he sings about now.

That retrospective worship matters. The story has had fields, giants, caves, songs, sin, repentance, and rebellion. Now David names God as the rock underneath all of it.

This day belongs near the end because it sounds like a man old enough to see his life as testimony, not just a pile of events.`,
  21: `1 Kings 2 is not flashy, but it is the proper ending. David gives final words, thinks about what must come after him, and dies.

The chapter lets the story close with inheritance, legacy, and unfinished things handed to the next generation. David's life was not neat, but it was full.

So the final lesson is not that David was flawless. It is that a life can be marked by real worship, real collapse, real repentance, and real return to God all the way to the end.`,
};

const cinematicExpansions: Record<number, string> = {
  1: `1 Samuel 16 is built like a scene with tension in every step. Son after son stands in front of Samuel, and every time what looks strong enough to men is passed over by God.

Then David is called in from the field. The smell of sheep follows him into the room, and God says this is the one. That is the first great shock of David's life: heaven chooses the boy no one even thought to bring in.`,
  2: `The shepherd years matter because they are where David learns what courage looks like without applause. Lions, bears, night watch, music, prayer, and long hidden hours are forming him.

Psalm 23 sounds richer when you remember it came from that world. David is learning the heart of a shepherd by living under the care of the Shepherd himself.`,
  3: `1 Samuel 17 feels like a full episode all by itself. The giant taunts. Israel freezes. David arrives carrying lunch. His brothers dismiss him. Saul questions him.

Then David steps into the valley with a sling and memory. He remembers what God already did in private, and that gives him courage in public. The giant falls, and David's world changes in one afternoon.`,
  4: `After Goliath, music and praise turn dangerous. One song from the crowd is enough to poison Saul's heart. Spears start flying. Favor starts drawing fire.

This is where David learns that public victory can open private warfare. The same success that lifts you can also expose who around you cannot handle God's hand on your life.`,
  5: `1 Samuel 19 changes the pace from tension to pursuit. Saul is no longer only jealous. He is hunting. Michal helps David flee, and the house itself becomes unsafe.

That chapter feels like the floor falling out. David has been anointed, but the road ahead now looks more like exile than kingship.`,
  6: `Jonathan's friendship lands in the story like mercy. He should have been threatened by David, but instead he loves him and protects him.

In 1 Samuel 20, their loyalty carries tears, danger, and covenant. This is the kind of friendship that keeps a person alive while the rest of the story is unraveling.`,
  7: `1 Samuel 21 is rough because David is surviving, not shining. He is hungry, scared, improvising, and then humiliated in enemy territory.

That messiness belongs in the story. The future king does not glide cleanly from calling to throne. He passes through odd, desperate, almost embarrassing chapters too.`,
  8: `Psalm 27 sounds like David writing with enemies close enough to feel. He is not denying fear. He is speaking over fear with hunger for God.

That is part of the drama of David's life. He keeps choosing the presence of God in chapters where most people would only be thinking about escape.`,
  9: `The cave scene in 1 Samuel 24 is one of the great moral tests in David's life. Saul is right there. The chance looks obvious. David's men are ready.

But David refuses to seize the throne through blood. Even cutting the robe stings his conscience. That is what makes the scene so strong: power is available, but David chooses restraint.`,
  10: `1 Samuel 25 shows another battlefield, but this one is emotional instead of military. David is insulted, his anger flares, and he is already heading toward revenge when Abigail steps in.

She changes the whole course of the chapter. Her wisdom stops David from staining his hands in a season where wounded pride could have wrecked his judgment.`,
  11: `In 1 Samuel 26 the test comes back around, and that is what makes it powerful. Mercy once could have been chance. Mercy twice becomes character.

David stands close enough to kill Saul again and still leaves the matter with God. Repeated surrender is shaping the kind of king he will become.`,
  12: `2 Samuel 2 feels quieter, but it carries major emotional weight. David is finally stepping into kingship, but only partially. Judah crowns him, yet the full promise is still unfolding slowly.

This is how a lot of God's fulfillments come. Not all at once, but piece by piece, while faith still has to stay awake.`,
  13: `By 2 Samuel 5 the story opens wide. Jerusalem is taken. David's reign grows stronger. Victories stack up. The crown now looks real in public, not only promised in private.

But the chapter keeps showing David asking God what to do. That is important. Arrival can be dangerous if it kills dependence.`,
  14: `2 Samuel 6 is alive with noise, movement, holiness, and joy. The ark is coming, David is dancing, and the city is watching.

But the chapter also stops cold at Uzzah's death, reminding everyone that God's presence is glorious and dangerous in the best sense. David's worship is strongest when delight and reverence stay together.`,
  15: `2 Samuel 7 feels intimate after all the movement. David wants to build God a house, and instead God speaks covenant over David's house and future.

Then David sits before the Lord stunned by grace. That image matters. A king sits small before a great God and realizes the promise is bigger than anything he could have built for himself.`,
  16: `2 Samuel 11 descends scene by scene. A rooftop. A glance. A message sent. A body taken. A cover-up attempted. A faithful soldier killed.

The chapter is dark because it shows how quickly desire, secrecy, and power can rot a person's judgment. David's story turns hard here on purpose.`,
  17: `Psalm 51 sounds like the walls have finally come down. David is no longer hiding behind the mechanics of the sin. He is standing exposed before God asking for mercy and a clean heart.

This is why the psalm is so powerful. It is not polished religion. It is a broken king telling the truth at last.`,
  18: `2 Samuel 12 brings Nathan's confrontation like a blade. David hears the story, burns with anger, then hears the words: "You are the man."

Forgiveness is spoken, but the chapter will not let consequence disappear. That is why it hits so hard. Grace is real, and damage is real too.`,
  19: `By 2 Samuel 15, the sorrow is inside David's own house. Absalom turns the nation and the family into a wound at the same time.

David leaves the city barefoot, weeping, and humbled. The mighty king now looks painfully human again, and that is exactly the point of the chapter.`,
  20: `2 Samuel 22 sounds like an older David looking back through war, caves, songs, rescue, sin, and survival and saying God was the rock under all of it.

It is worship with scar tissue in it. That is why the song feels earned.`,
  21: `1 Kings 2 closes David's story without pretending it was neat. He gives final charges, thinks about what must come next, and dies after a life full of brilliance and fracture.

That ending works because David's story was never about polished perfection. It was about a heart that kept getting called back toward God through every rise and collapse.`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  devotional_text: [day.devotional_text, chapterStoryExpansions[day.day_number] ?? null, cinematicExpansions[day.day_number] ?? null]
    .filter(Boolean)
    .join("\n\n"),
}));

async function main() {
  console.log("Starting to seed 'The Heart of David' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Heart of David",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through the life of David, from the shepherd fields to the throne, from Goliath to Bathsheba, from worship to repentance, and from youthful courage to a life that kept returning to God.",
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
  console.log("\nDone! 'The Heart of David' devotional is ready.");
}

main().catch(console.error);
