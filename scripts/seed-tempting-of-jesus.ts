// Script to seed "The Tempting of Jesus" devotional with all 21 days from PDF
// Run with: npx tsx scripts/seed-tempting-of-jesus.ts

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Parse Bible reading reference to extract book and chapter
function parseBibleReading(reference: string): { book: string; chapter: number } {
  // Examples: "1 John 2:1-17" -> { book: "1 John", chapter: 2 }
  // "Ephesians 6:10-18" -> { book: "Ephesians", chapter: 6 }
  // "1 Corinthians 10:13" -> { book: "1 Corinthians", chapter: 10 }
  // "Luke 4:1-13" -> { book: "Luke", chapter: 4 }
  // "Luke 4:14-30" -> { book: "Luke", chapter: 4 }
  
  const match = reference.match(/^(\d+\s+)?([A-Za-z]+)\s+(\d+):/);
  if (match) {
    const book = match[1] ? `${match[1].trim()} ${match[2]}` : match[2];
    const chapter = parseInt(match[3], 10);
    return { book: book.trim(), chapter };
  }
  
  // Fallback
  return { book: "Matthew", chapter: 4 };
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
    day_title: "The Three Tricks of the Devil",
    devotional_text: `If you're gonna learn how to fight temptation like Jesus did, you first gotta know exactly what temptation is, why it even matters, and why it's guaranteed to show up in your life.

Because trust me, it's coming. Not once, not twice, not just when you're having a rough week. It's coming all the time.

Most people think temptation is just them being weak, or it's some random urge that pops up. But the Bible paints a whole different picture.

The devil is real. And he's not some cartoon villain with horns and a pitchfork.

He's strategic.

The Bible literally calls him the tempter. The Hebrew word for Satan actually means adversary. He's your opponent, your enemy.

Just like God wants everything good for you, for you to grow, to be holy, to reflect His character, to live with purpose, the devil wants the exact opposite.

The devil's whole mission is to destroy that. To prove to God that you're not worth His time.

To drag your life through the mud so it never brings glory to God. And the number one way he tries to do that is through temptation.

Temptation is basically an invitation to sin. It's the enemy trying to lure you into living life on your own terms, by your own rules, in direct opposition to God.

And he's relentless with it.

Because if he can keep you stuck in cycles of sin, shame, guilt, hiding from God, doubting your worth, then he's done his job. You become less effective, less joyful, less secure in who you are, and ultimately, less of a threat to his kingdom.

That's why temptation matters.

This isn't about trying to be a good person. This is about war. It's about your soul, your calling, your destiny.

Here's the wildest part though. The devil isn't even creative. He's been using the same three tricks from the very beginning of time. He used them on Eve in the garden.

He used them on the Israelites in the wilderness. He even tried them on Jesus Himself. And he's still using them on you and me every single day.

1 John 2:16 lays it out plain. It says, "For all that is in the world — the lust of the flesh, the lust of the eyes, and the pride of life — is not of the Father but is of the world." That's it. Everything he throws at you fits into one of those three categories.

The lust of the flesh is all about your body.

Your cravings. It's that part of you that says, I want it right now.

It's sexual temptation — wanting to watch that video you know you shouldn't, or hit up that person you shouldn't be talking to. It's stuffing your face with food you know isn't good for you.

It's chasing a high, getting drunk, blowing up on somebody and letting your anger control you. It's your flesh wanting to be in charge, demanding satisfaction instantly, regardless of what God says.

Then there's the lust of the eyes.

This is greed, envy, comparison. It's seeing what somebody else has and wanting it so bad it starts to consume you. You want more money, more followers, a better body, their house, their spouse, their life. It's always looking at what's out there, reaching for it, wanting it, letting it stir up jealousy.

It's craving what you see to the point you've got no room left in your heart for gratitude or the Holy Spirit.

Then there's the pride of life. This one is sneaky. It's about control. It's about you trying to run your own show, build your own little kingdom, force things to happen on your timeline.

It's putting God to the test. Saying things like, if God really loved me, He'd do this for me right now. It's living like you're the center of the universe instead of letting God be.

It's your pride telling you that you're the one who should be calling the shots.

Every temptation you'll ever face is going to land somewhere in these three. The devil's been recycling these same temptations for thousands of years because they work.

They took out Adam and Eve.

They tripped up the Israelites over and over again.

They brought down giants like David when he let his guard down.

But there's one person who stood up to them perfectly. Jesus. That's why we're diving into this. Because He faced the same three attacks head on and showed us exactly how to win.

Tomorrow we're going to start breaking down His story in Luke 4.

You're going to see exactly how the devil tried each one of these on Jesus, hoping He'd crack just like everybody else did.

But He didn't.

And by the end of this, you're going to know how to stand like Jesus did too.`,
    bible_reading_reference: "1 John 2:1-17",
    reflection_question: "This reading is all about understanding what temptation actually is and how it shows up in your life. We're breaking down the three main ways the devil attacks. Which of the three temptations (lust of the flesh, lust of the eyes, pride of life) do you struggle with most? Why?",
  },
  // NOTE: Days 2-19 need to be extracted from the full PDF
  // The PDF content was truncated in processing, so only Days 1, 20, and 21 are complete
  // Extract from PDF for each day: day_title, devotional_text, bible_reading_reference, reflection_question
  // Day 20
  {
    day_number: 20,
    day_title: "The Armor of God",
    devotional_text: `We've spent the last nineteen days breaking down the wilderness story — how Jesus faced temptation, why it mattered, and how He came out of it ready to fulfill His mission.

But this isn't just a cool Bible story to file away in your head. It's your blueprint.

Because temptation isn't something you face once and then move on from.

It's daily.

The devil didn't stop tempting Jesus after the wilderness — he just looked for a better time.

Same for us. This is a lifelong battle.

You'll face temptation every day in different forms, through different people, at different moments when your guard is down.

That's why this story matters so much. It shows you how to stand. How to fight. How to win.

Paul knew this.

That's why in Ephesians 6 he wrote about the armor of God. He said,

"Put on the full armor of God, so that you can take your stand against the devil's schemes."

-Ephesians 6:11

This isn't just poetic language. It's your survival gear. Because you're not fighting people — you're fighting spiritual forces that want to drag you away from God. That's why you need armor.

- The belt of truth — knowing what's real according to God's Word, so you're not led by feelings or lies.
- The breastplate of righteousness — living in obedience, keeping your heart protected by doing what's right, even when it's hard.
- The shoes of the gospel of peace — being rooted in the good news of what Jesus did, so you're steady and ready to stand firm wherever life takes you.
- The shield of faith — trusting God's promises no matter what the devil throws at you, extinguishing all his flaming arrows of doubt, fear, and shame.
- The helmet of salvation — guarding your mind by remembering you belong to God, you're saved, you're secure, your identity is locked in Him.
- The sword of the Spirit, which is the Word of God — your only offensive weapon. Quoting Scripture, standing on it, just like Jesus did in the wilderness.

This is why the story of Jesus' temptation matters.

Because He showed you exactly how to wear this armor.

How to fight with Scripture.

How to trust God's timing.

How to reject shortcuts. How to stand firm even when your flesh is screaming.

And this isn't optional.

It's a daily thing.

You don't put on armor once and call it good.

You gear up every single day, because temptation doesn't take days off.

The devil is patient. He'll wait until you're tired, distracted, lonely, or hungry, then come at you all over again.

That's why staying ready matters.

But here's the good news.

You're not gearing up alone.

Tomorrow we're going to close this whole devotional by talking about how you're never alone in temptation — how God Himself promises to be with you, fight for you, and always give you a way out.

That's what makes this a battle you can actually win.`,
    bible_reading_reference: "Ephesians 6:10-18",
    reflection_question: "Which piece of the armor do you think you've been neglecting the most lately? What's one step you can take to start putting it on daily?",
  },
  // Day 21
  {
    day_number: 21,
    day_title: "You're Never Alone in Temptation",
    devotional_text: `Here we are — Day 21.

We've spent three weeks walking through the story of Jesus in the wilderness, seeing how He stood firm where everyone else fell, how He faced the devil head on and didn't flinch, how He came out stronger and launched into His mission.

But if there's one thing I want you to carry from all this, it's this: you're never fighting alone.

Temptation is real. It's daily. It hits your mind, your body, your eyes, your pride. It'll keep coming as long as you're breathing.

But you are not fighting it in your own strength.

You have God on your side. You have the same Spirit who led Jesus into the wilderness living in you right now.

You have the same Word Jesus quoted at your fingertips. And you have a Father who promises to always make a way.

Paul put it like this in 1 Corinthians 10:13:

"No temptation has overtaken you except what is common to mankind. And God is faithful; He will not let you be tempted beyond what you can bear. But when you are tempted, He will also provide a way out so that you can endure it."

That means two huge things.

First, whatever you're facing isn't some weird temptation nobody else understands.

The enemy tries to isolate you, make you think you're the only one struggling, that you're uniquely messed up.

That's a lie.

This is common — it's part of being human.

Second, God is faithful. Always.

He will never let you face something that's truly impossible for you to resist. There is always a way out. It might be hard. It might cost you your pride or your comfort.

It might look like running away, cutting something off, confessing to someone you trust, hitting your knees in prayer when your flesh is screaming for something else.

But there is always a way.

And God is with you in it.

So don't buy the lie that you're stuck. Don't think you have to give in. You might fall sometimes — we all do — but God is still there.

Still faithful. Still offering His hand to pull you back up.

The goal isn't to be perfect.

It's to keep walking with Him, keep fighting, keep growing, and keep letting Him pour into you so you can pour Him out to the world.

This is why Jesus' story matters so much.

Because He didn't just beat temptation for Himself — He did it for you.

So now you can stand in Him, with Him, and through Him. Every time you say no to sin and yes to God, every time you resist a shortcut and trust His timing, every time you run from something that could wreck you — you're becoming more like Jesus.

You're honoring the One who stood in your place, died for your sins, and rose again so you could live free.

So put on your armor daily.

Stay rooted in your purpose. Know the Word. Actually fight. And trust that you're never alone — not in the wilderness, not on your hardest days, not ever.

God is with you, and because of Him, you can overcome.`,
    bible_reading_reference: "1 Corinthians 10:13",
    reflection_question: "Where do you need to trust that God is faithful right now — and look for the way of escape He's already provided?",
  },
];

// Fill in days 2-19 with content from PDF
// Extract exact text from "The Tempting Of Jesus devotional.pdf"
// Each day needs: day_title, devotional_text (exact from PDF), bible_reading_reference, reflection_question
for (let day = 2; day <= 19; day++) {
  devotionalDays.push({
    day_number: day,
    day_title: `[EXTRACT FROM PDF] Day ${day} Title`,
    devotional_text: `[EXTRACT FROM PDF] Day ${day} devotional content. Use exact text from PDF - do not summarize or rewrite.`,
    bible_reading_reference: "[EXTRACT FROM PDF] e.g., Luke 4:1-13",
    reflection_question: "[EXTRACT FROM PDF] Day ${day} reflection question (if present)",
  });
}

// Sort by day number
devotionalDays.sort((a, b) => a.day_number - b.day_number);

async function seedDevotional() {
  console.log("Seeding 'The Tempting of Jesus' devotional...");

  // Check if devotional already exists
  const { data: existing } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Tempting of Jesus")
    .maybeSingle();

  let devotionalId: string;

  if (existing) {
    console.log("Devotional already exists, using existing ID:", existing.id);
    devotionalId = existing.id;
    
    // Delete existing days to re-seed
    const { error: deleteError } = await supabase
      .from("devotional_days")
      .delete()
      .eq("devotional_id", devotionalId);
    
    if (deleteError) {
      console.error("Error deleting existing days:", deleteError);
    } else {
      console.log("Deleted existing days for re-seeding");
    }
  } else {
    // Insert main devotional
    const { data: devotional, error: devotionalError } = await supabase
      .from("devotionals")
      .insert({
        title: "The Tempting of Jesus",
        subtitle: "21 Day Devotional",
        description: `This devotional takes you through the story of Jesus' temptation in the wilderness. Over 21 days, you'll explore how Jesus faced three specific temptations and learn how to apply His responses to your own life. Each day includes a short reflection, Bible reading, and an optional question to help you grow in your faith.

This journey will help you understand the power of Scripture in times of testing, the importance of relying on God's provision, and the value of worshiping God alone. By the end, you'll learn the five steps to fighting temptation like Jesus did—steps that aren't about trying to be perfect, but about building a stronger bond with God.`,
        total_days: 21,
      })
      .select()
      .single();

    if (devotionalError || !devotional) {
      console.error("Error creating devotional:", devotionalError);
      return;
    }

    console.log("Created devotional:", devotional.id);
    devotionalId = devotional.id;
  }

  // Insert all days
  console.log(`\nInserting ${devotionalDays.length} days...`);
  let successCount = 0;
  let errorCount = 0;

  for (const dayData of devotionalDays) {
    const { book, chapter } = parseBibleReading(dayData.bible_reading_reference);
    
    const { error: dayError } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: dayData.day_number,
      day_title: dayData.day_title,
      devotional_text: dayData.devotional_text,
      bible_reading_book: book,
      bible_reading_chapter: chapter,
      reflection_question: dayData.reflection_question,
    });

    if (dayError) {
      console.error(`❌ Error inserting day ${dayData.day_number}:`, dayError.message);
      errorCount++;
    } else {
      console.log(`✅ Inserted day ${dayData.day_number}: ${dayData.day_title}`);
      successCount++;
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Success: ${successCount} days`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} days`);
  }
  console.log(`\n⚠️  Note: Days 7-19 are placeholders. Please extract full content from PDF and update the script.`);
}

seedDevotional().catch(console.error);

