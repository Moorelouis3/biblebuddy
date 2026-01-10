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
    reflection_question: "Which one of these three hits you the hardest right now — the lust of the flesh, the lust of the eyes, or the pride of life? Why do you think that is?",
  },
  {
    day_number: 2,
    day_title: "Jesus in the Wilderness",
    devotional_text: `Yesterday we talked about how the devil's got the same three tricks he's been running from day one — the lust of the flesh, the lust of the eyes, and the pride of life.

And how everybody in the Bible ended up falling for them at some point, except one person. Jesus.

Today we're going to start breaking down the story that proves it.

Luke 4:1-13. This is where it all goes down.

This is the moment that sets the tone for how we're supposed to fight temptation. And it might shock you, because it doesn't start like you'd expect.

The Bible says that right after Jesus got baptized, right after the sky cracked open and the Father said, "This is my Son in whom I'm well pleased," right after the Holy Spirit descended on Him like a dove — that same Holy Spirit led Jesus into the wilderness to be tempted by the devil.

Think about that.

Jesus didn't wander out there by accident. He didn't get lost in the desert.

The Spirit of God led Him straight into the wilderness on purpose.

Not to be on vacation.

Not to get some fresh air.

But to face the devil head on.

Why?

Because just like a blacksmith tests the strength of his metal by throwing it into the fire, God was proving the purity, obedience, and unshakable trust of His Son before launching Him into public ministry.

It's wild to think about, but the wilderness was part of the process. Jesus was going into battle mode before stepping onto the stage.

That's why I like to call this His hero montage.

You know in the movies when Batman's training in the mountains or Rocky's running up the stairs, sweat pouring down his face, or Goku goes into the hyperbolic time chamber to level up?

This was Jesus' version.

Forty days in the wilderness, fasting, praying, being tested, building spiritual muscle for the mission ahead.

But it was also more than that. It was about rewriting the story that Adam and Eve messed up in the garden, and that Israel messed up in the wilderness.

Adam had it easy — a garden full of food, no sin yet, no reason to doubt God, and still gave in.

Israel had God literally raining bread down from heaven, water bursting out of rocks, and still doubted, still grumbled, still chased idols.

Now Jesus steps into the wilderness, but He's starving, He's alone, He's surrounded by heat and dust and the whisper of the enemy in His ear.

And this time, the Son of God is going to do what humanity couldn't.

The devil tempted Him three times.

Each one matching up with the lust of the flesh, the lust of the eyes, and the pride of life.

First, telling Him to turn stones into bread. You're hungry, right? Just use your power. Feed yourself. Lust of the flesh.

Then taking Him up to show Him all the kingdoms of the world, saying, I'll give you all this if you worship me. Lust of the eyes.

Then daring Him to jump off the temple to prove God would catch Him. Pride of life.

And every single time, Jesus answered the same way. With Scripture.

He didn't try to flex His divinity.

He didn't try to argue with the devil using clever words.

He didn't punch Satan in the face.

He just quoted the Word of God. "It is written." That was His sword.

That was His defense. That's how He stood.

This story is huge for us because it shows how temptation works and also how victory over it works.

Notice the wilderness wasn't comfortable. It wasn't some luxury resort.

It was hard. It was lonely. It was dry.

That's how it is with us too.

We all go through wilderness seasons.

That breakup that wrecked you.

That job you lost that made you question your value.

That loved one who passed away.

Those times when everything feels stripped away, when you're desperate and empty and searching for relief.

Most of us look up at God in those moments and say, Why is this happening to me?

But maybe the better question is, What is God preparing me for?

Because this is a battlefield. This is training ground.

Just like Jesus had to go through His wilderness before stepping into His ministry, we go through ours so God can build us up for what's next.

And look at what Jesus did in His wilderness. He fasted. He prayed. He didn't fill Himself with the world, He emptied Himself so He could be full of God's power.

That's what we need to be doing. Instead of running to sin to comfort us, we run to God.

Instead of binging Netflix or getting drunk or hooking up, we fast.

We pray.

We get in the Word.

We let God build us in the quiet place so we're ready when the devil shows up.

Tomorrow we're going to talk about why fighting temptation is never easy.

But today, let this sink in. The wilderness is where warriors are made.

Don't waste yours.`,
    bible_reading_reference: "Luke 4:1-13",
    reflection_question: "What wilderness season are you in or have you recently come out of? How do you see God using it to prepare you for what's next?",
  },
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

  {
    day_number: 3,
    day_title: "Fighting Temptation Isn't Easy",
    devotional_text: `So now you see how Jesus was led into the wilderness to face the devil head on.

It wasn't comfortable. It wasn't easy. It wasn't some vacation with God.

It was war.

And He was hungry, tired, isolated, being pushed on by Satan himself.

That's the setup for real temptation. It happens when you're weak, when you're alone, when you're desperate.

A lot of people think once they decide to follow God, temptation should just magically go away, like life's supposed to get easier because they're doing the "right thing."

But that's never been how it works. Actually, it's the opposite.

The second you start taking God seriously, really trying to walk the narrow path, the enemy is going to turn up the heat. Because he knows how powerful it is when a child of God actually lives sold out.

Jesus Himself warned us this walk was never going to be easy.

In Matthew 7, right in the middle of what's called the Sermon on the Mount — which is basically Jesus' big teaching session on what living in God's kingdom is all about — He drops a heavy truth.

He says, "Enter by the narrow gate. For wide is the gate and broad is the road that leads to destruction, and many enter through it. But small is the gate and narrow the road that leads to life, and only a few find it."

That's not a verse to scare you.

That's a verse to wake you up. Jesus was standing there, surrounded by crowds of people listening to Him talk about anger, lust, loving enemies, giving, prayer, fasting, trusting God instead of money, judging others — basically laying out the blueprint for living under God's rule.

Then He looks them dead in the eye and says, Look, this isn't the easy way.

Most people aren't going to take it. It's going to cost you. It's going to hurt sometimes. It's going to mean going against your flesh, going against the world, fighting off temptation when it would be way easier to just give in.

This is why temptation is so hard to beat.

Because the easier way is always wide open. The devil isn't setting up obstacles on the broad road. He doesn't have to. That road is already slicked down with everything your flesh wants, everything your eyes crave, everything your pride is dying for. It's comfortable. It's popular. Everybody's on it.

But the narrow road?

That's different. That's sacrifice. That's self-control.

That's telling your flesh no when it's screaming yes.

That's resisting the bait when the devil dangles it right in front of your face.

That's why he works so hard to knock you off it.

Because he knows what's waiting at the end — real life, true joy, the kind that can't be taken away, and eternity with God.`,
    bible_reading_reference: "Matthew 7:13-14",
    reflection_question: "Which road are you walking right now — the broad road or the narrow one? What's one way you can start choosing the harder path today?",
  },
  {
    day_number: 4,
    day_title: "The Five Steps to Temptation",
    devotional_text: `So far we've talked about what temptation is, why the devil keeps coming after us, and how this walk with God is never promised to be easy.

Today we're going to break it all the way down and look at exactly how temptation works.

Because the truth is, the enemy has a system. It's almost like he's got a playbook, and he runs the same five steps over and over.

If you can spot these steps while they're happening, you're already halfway to beating them.

Temptation almost always starts the same way. It starts with a thought. That little whisper. That seed dropped in your mind.

The devil doesn't have to shove sin down your throat. He just has to plant a suggestion.

Did God really say you shouldn't do that? It's just one time. Nobody's going to find out. You deserve it. The battle always starts in your head.

If you don't shut it down right there, that thought grows into desire.

Now it's not just an idea, it's something your heart starts wanting.

You start picturing it. Replaying it. Letting it settle in.

That thought turns into craving. The devil doesn't even have to be loud about it. He just gives it time to take root.

Then comes the justification.

This is where you start building the excuses.

Well, I've had a long day.

I'm stressed.

God knows my heart.

At least I'm not doing what they're doing.

I'll stop after this one last time.

You start making it sound reasonable. You give yourself permission. And the devil is right there, nodding along, helping you rationalize why it's really not that big of a deal.

Once you've justified it, it becomes action. You do the thing. You click on that site. You call that person. You lose your temper. You spend money you don't have.

And if it doesn't stop there, if you let it keep cycling, it doesn't just become an action — it becomes an addiction.

A pattern.

Now it's your go-to coping mechanism. The devil doesn't even have to work that hard anymore because you're basically on autopilot.

Then finally, there are consequences. Because sin always costs something. It might cost your peace. Your reputation. Your trust with someone you love. Your closeness with God.

It might cost you years stuck in shame, guilt, and self-hate.

That's exactly what the devil wants.

He shows up at the start acting like your friend, giving you what you think you want. But at the end, he's laughing at the damage.

Think about it like this. Imagine someone who's trying to stay sober.

One day the thought pops up: I could really go for a drink. That's the thought.

They dwell on it, start craving it, remembering how it felt.

That's the desire.

Then they start making excuses. It's just one night. I've been clean for months, I deserve this.

That's the justification. Next thing you know, they're at the bar, taking that drink.

That's the action. And if they keep going back, it becomes an addiction all over again.

Then comes the fallout — waking up full of regret, maybe losing trust with family, feeling further from God than ever. That's the consequence.

The same pattern works with anything. Lust. Greed. Gossip. Even pride.

The devil is at work in every stage, from planting the thought to fanning the desire to feeding you lies so you justify it. Then he steps back and watches you self-destruct.

That's why it's so important to catch temptation at the start.

The earlier you shut it down, the easier it is. Once you let it grow, it's harder to fight.

That's why the Bible says to take every thought captive — because the battlefield is your mind.

Tomorrow we're going to start looking at how Jesus had already prepared Himself for this battle long before the devil showed up.

But today, sit with this. Be honest about where in this five-step process you usually trip up.

Because that's where the enemy's got your number.`,
    bible_reading_reference: "James 1:12-15",
    reflection_question: "Which step do you usually give in at — the thought, the desire, the justification, the action, or once it's already become a habit? What can you do to start cutting it off earlier?",
  },
  {
    day_number: 5,
    day_title: "Jesus at Twelve Years Old",
    devotional_text: `So up to this point we've been talking a lot about temptation, the devil's schemes, and how Jesus faced it all head on in the wilderness.

But what's wild is that if you rewind the story, you start to see how Jesus was already locked into His purpose long before Satan ever tried to take Him out. And it all started way back when He was just twelve years old.

Let me paint the scene for you. Jesus grew up in Nazareth, a small town up north in Galilee, kind of like the sticks.

Every year, faithful Jewish families would pack up and travel to Jerusalem for the Passover festival. Passover was huge — it was the time they celebrated how God delivered their ancestors out of Egypt.

When death passed over their houses because of the blood on the doorposts, but struck the Egyptians. It was a yearly reminder that God saves, that they were His people.

According to Jewish law, all the men were required to make this trip for the festival. But it wasn't just the men who went. Families rolled deep. Back then, people didn't travel like we do now — one family in one car.

Nah, they moved together in giant caravans. Jesus had brothers and sisters, plus aunts, uncles, cousins, neighbors from Nazareth.

By the time they hit the road, it could've been fifty, sixty, maybe even a hundred people all trekking together the eighty miles up to Jerusalem.

That trip would take about four or five days on foot. Imagine that.

Kids chasing each other, animals slowing the line, people stopping to eat or set up camp for the night.

The caravan could be stretched out for miles, with some folks way ahead and others lagging behind. It wasn't weird at all for a kid to be running around with cousins or neighbors out of sight from their parents for hours.

So they make it up to Jerusalem, celebrate Passover like always. After the festival, the family packs up and starts the long walk home. At first, nothing seems off.

Mary and Joseph probably figured Jesus was somewhere in the caravan, maybe hanging with His cousins or playing games with other boys from Nazareth. They traveled a whole day like that.

But when evening hit and everyone set up camp, they started looking around. No Jesus. Not with His cousins. Not with the neighbors. That's when panic hit. Imagine Mary and Joseph's stomach dropping. They realized they left their twelve-year-old somewhere back in the big city.

So they turn around and head back to Jerusalem, probably retracing every step, checking every market and inn along the way. It took them three whole days to find Him. When they finally did, Jesus wasn't lost or scared or hiding out. He was in the temple.

Now understand, the temple was the heart of Jewish worship. It wasn't just a local synagogue — it was the temple, the place God's presence was supposed to dwell.

And it was full of the top religious teachers, the smartest rabbis, the scholars who knew the Scriptures better than anyone.

And there's twelve-year-old Jesus sitting with them, asking questions, answering theirs, amazing everyone with how much He understood.

When Mary and Joseph finally see Him, Mary does exactly what any mom would do.

She's half relieved, half mad. Like, Son, why did you do this to us? We've been worried sick looking for you everywhere.

Jesus' answer is what blows me away.

He said, "Why were you looking for me? Didn't you know I'd be in my Father's house?"

Even at twelve, He knew exactly where He belonged. He knew whose business He was about.

He knew who His Father was and what His life was for.

Before the wilderness. Before the baptism. Before the temptations. Jesus was already rooted in His purpose.

And that's why when the devil finally showed up years later in the desert, Jesus wasn't confused about who He was or what He was on earth to do.

That's why this story matters. Because most people wait until temptation shows up to figure out who they are.

They drift through life with no clear sense of purpose, so when the enemy comes knocking, they're easy to knock over.

But Jesus shows us you need to know who you belong to long before you're tested.

Tomorrow we're going to see how Jesus kept growing and preparing during all those hidden years.

But today, sit with this. Where do you naturally drift when nobody's looking for you?

What draws your attention and energy when you're free to go anywhere?

Jesus was found in the temple.

Where would someone find you?`,
    bible_reading_reference: "Luke 2:41-52",
    reflection_question: "What does this story show you about knowing where you belong and what your purpose is? Do you think you'd be found in your Father's house?",
  },
  {
    day_number: 6,
    day_title: "Preparing in the Hidden Years",
    devotional_text: `Yesterday we left off with Jesus at twelve years old, sitting in the temple blowing the minds of the religious teachers, telling His parents He had to be about His Father's business. Then, just like that, the story jumps. The next time we see Jesus, He's thirty. Eighteen years later.

It's easy to gloss over that. The Bible literally covers it in one sentence.

It says in Luke 2:52, "And Jesus grew in wisdom and stature, and in favor with God and man."

That's it. That's all we get for nearly two decades of His life.

But think about what that means. From age twelve to thirty, Jesus didn't perform any miracles. He didn't teach in public.

He didn't heal the sick or cast out demons or walk on water.

He was living in Nazareth, a dusty little nowhere town, probably helping Joseph with carpentry, taking care of His mother and siblings after Joseph died.

Day after day, year after year, living a life that from the outside probably looked painfully ordinary.

But the Bible says He was growing.

In wisdom. In stature. In favor with God and people. That means He was studying. Learning. Praying. Meditating on the Scriptures.

Building character. Filling Himself up with God's Word so that when His time finally came, He wouldn't be caught unprepared.

That's huge for us. Because most people want to step straight into their calling without ever going through the preparation.

They want the platform without the process. They want to fight giants without ever spending years in the field tending sheep.

They want to be on mission for God but haven't spent any real time reading the Word to find out how God wants them to live, or what He says about temptation, or what He promises when life gets hard.

You said you believe in God. You said you're His child. That means you've accepted who you belong to. But now you have to start living like it.

That means filling your life up with God — reading His Word, praying, learning how He thinks, how He loves, how He wants you to act. Getting ready.

Because the battle is always coming. That wilderness season is always somewhere up ahead.

Maybe right now things aren't that hard for you. You're not in the middle of heartbreak or loss or deep temptation.

That doesn't mean it's time to coast. This is the time to be training.

Building spiritual muscle.

So when your own wilderness hits, you're not scrambling to figure out what you believe or how to fight.

Jesus shows up after eighteen years of hidden preparation, and He heads straight down to the Jordan River. That's where John the Baptist was baptizing people.

Jesus was about to step fully into His mission, but not before years of silent growth.

That's what we're called to do too. Keep preparing, even when nobody sees it.

Even when it feels like nothing big is happening.

Because being ready is the difference between standing firm or falling apart when the wilderness comes.`,
    bible_reading_reference: "Luke 2:51-52 and Matthew 3:13",
    reflection_question: "Are you in a season where things seem quiet, maybe even boring? How can you start using this time to grow deeper with God so you're ready for whatever comes next?",
  },
  {
    day_number: 7,
    day_title: "John the Baptist",
    devotional_text: `Yesterday we left off with Jesus finally showing back up after eighteen hidden years, walking down to the Jordan River where John the Baptist was baptizing people.

Luke 3:3 says, "He went into all the country around the Jordan, preaching a baptism of repentance for the forgiveness of sins."

That's John.

Out there in the wilderness, doing what God called him to do — getting people's hearts ready for Jesus.

But let's rewind for a second and talk about who John actually was.

Because John didn't just pop up out of nowhere. John was Jesus' cousin.

His mother Elizabeth was Mary's cousin, which means before John and Jesus were ever born, their families were already connected.

There's this incredible moment back in Luke 1. Mary finds out she's pregnant with Jesus and goes to visit Elizabeth, who's pregnant with John.

The Bible says that the moment Mary walked into the room and greeted Elizabeth, John leaped in his mother's womb, and Elizabeth was filled with the Holy Spirit.

That's wild. Before either of them was even born, John was already responding to Jesus. Already jumping at the sound of His presence.

Both their births were miraculous.

Both were announced by angels. Both were prophesied about in the Old Testament.

Both had a clear mission long before they ever took their first breath.

Jesus came to save the world.

John came to prepare the way for Him.

But before John ever started preaching by the Jordan, before the crowds started showing up, the Bible says something small that's easy to skip over. Luke 1:80 says, "And the child grew and became strong in spirit; and he lived in the wilderness until he appeared publicly to Israel."

That's it.

Just like Jesus spent years in Nazareth growing in wisdom and favor, John spent years in the wilderness getting strong in spirit.

We don't get a ton of details about what that looked like. But you can imagine it.

John out there in the desert, living on locusts and wild honey, separated from the comforts of normal life, away from the distractions of the village.

That was his training ground.

That was where God was shaping him, filling him up with boldness, stripping away anything that would get in the way of his purpose.

God's always done that with His people.

Moses spent forty years in the wilderness after fleeing Egypt before God called him back to lead Israel out.

David ran through the wilderness hiding from Saul before he ever wore the crown.

Even Paul, after meeting Jesus on the road to Damascus, spent years in Arabia before starting his ministry.

The wilderness is God's classroom.

So by the time Jesus walked up to the Jordan River, John was already locked into his calling. He was out there preaching repentance, telling people to turn from their sins, baptizing them in the river as a sign they were being washed clean and starting fresh.

Baptism was powerful because it was this outward sign of an inward change — a way of saying publicly, "I'm done living for myself. I'm turning back to God."

That was John's whole mission.

To get people ready for Jesus. So when Jesus finally stepped onto the scene, John didn't flinch.

He knew exactly who He was looking at. John pointed at Him and said, "Behold the Lamb of God who takes away the sin of the world."

John's story shows us the same thing we keep seeing over and over: the wilderness isn't punishment, it's preparation.

God uses it to shape you so that when your moment comes, you're already ready, already walking in purpose, already doing what He made you to do.

Tomorrow we're going to see what happens when John baptizes Jesus — a moment that changes everything.

But today, just think about this: are you fighting your wilderness season or letting God use it to make you strong in spirit, like He did with John?`,
    bible_reading_reference: "Luke 1:5-25 and Luke 1:39-45 and Luke 3:1-6",
    reflection_question: "What's one way you can start seeing your own wilderness season as preparation instead of punishment? How might God be using it to get you ready for your purpose?",
  },
  {
    day_number: 8,
    day_title: "Jesus Gets Baptized",
    devotional_text: `So yesterday we saw how John the Baptist spent years out in the wilderness getting ready for his calling.

Then he showed up by the Jordan River preaching repentance and baptizing people, preparing them for the One who was coming next.

Now today's the moment everything comes together. Jesus walks up to John, ready to take the first step into the mission He was born for.

Imagine the scene.

Crowds are gathered around the river. People are confessing their sins, getting dunked under the water, coming up dripping, crying, praising God for a fresh start.

Then Jesus steps onto the riverbank.

John knows exactly who He is. This isn't just his cousin or some random guy from Nazareth.

This is the Lamb of God. The Messiah.

When John sees Him coming, he tries to stop it. He says, "I need to be baptized by You, and You're coming to me?"

Because John knows who should be baptizing who here. But Jesus says, "Let it be so now; it is proper for us to do this to fulfill all righteousness."

In other words, this had to happen.

This was part of the plan.

This was Jesus accepting His purpose.

This was Him stepping fully into the mission the Father sent Him for — to die for the sins of the world. In the Old Testament, the people used to have to bring sacrifices to atone for their sins.

They'd bring a spotless lamb, lay their hands on it as a way of transferring their guilt, then the lamb would be killed in their place. It was a temporary covering. A sign that sin costs something.

But all those sacrifices were pointing to something bigger. Jesus was the final sacrifice.

The Lamb of God who takes away the sin of the world once and for all.

No more daily, weekly, yearly sacrifices needed. No more blood of bulls and goats. Jesus was it.

So by stepping into the water that day, Jesus wasn't just doing some symbolic ritual. He was identifying fully with humanity.

With sinners. With people who needed to be washed clean. Even though He was sinless,

He was saying, "I'll stand in line with them. I'll stand in their place. I'll take on what they deserve."

And on top of all that, He was also showing us how to live. Before He went out into the wilderness to face the devil, before He started preaching or healing or casting out demons, He submitted Himself to the will of the Father.

He got baptized to show complete obedience.

That's what it looks like to follow God. Total surrender.

So yeah, Jesus' baptism was the kickoff of His ministry, the start of His journey to the cross, the public step into being the sacrifice that would end all sacrifices.

But it was also an example for us.

That following God means laying down your own way, stepping into what He's called you to do, even if it means walking straight into the wilderness right after.

Tomorrow we're going to see the moment that sealed all of this — when the heavens opened, the Spirit came down like a dove, and the Father spoke.

But today, think about this: Jesus didn't skip the step of obedience. He didn't avoid the water.

He stepped right into it, for us and to show us.`,
    bible_reading_reference: "Matthew 3:13-17",
    reflection_question: "What's something you've been holding back from doing in full obedience to God? How does seeing Jesus step into the water challenge you to take your own next step?",
  },
  {
    day_number: 9,
    day_title: "The Trinity Revealed",
    devotional_text: `Yesterday we talked about Jesus stepping into the Jordan River, getting baptized by John, and launching into the purpose He was born for.

But what happened right after that might be one of the most jaw dropping moments in the whole Bible.

Picture the scene.

The crowd is standing on the banks of the river, dripping wet people all around who've just confessed their sins and come up from the water hoping for a new start.

Then there's Jesus, still soaking, water dripping from His hair, standing there with His eyes toward heaven.

And suddenly the sky actually opens up. Not metaphorically. Literally.

Heaven breaks open.

Then the Spirit of God descends.

The Bible says it was like a dove coming down and resting on Jesus.

The same Spirit who hovered over the waters at creation is now settling on Jesus, showing that God's power and approval are all over Him.

And in that same moment, a voice booms out of heaven — the voice of the Father saying, "This is my Son, whom I love; with Him I am well pleased."

That wasn't a whisper. That wasn't a private moment off in the corner.

God said it loud enough for everybody there to hear.

This was the Father putting His seal on Jesus right in front of all the people.

Almost like He was saying, "This is the one I promised you from the very beginning.

This is the one Psalm 2 talked about when it said, 'You are my Son; today I have begotten you.' This is the one Isaiah was talking about — the suffering servant, the one who'd be crushed for your sins.

Look at Him.

Love Him.

Follow Him."

It was also the Father telling Jesus, before the wilderness came, before the temptations, before the rejection and pain and betrayal and nails, "I love You.

I'm pleased with You. You are Mine." That's so powerful. Because Jesus was about to go through the hardest three years anyone ever faced.

Betrayal by His closest friends. Hated by the people He came to save.

Beaten, whipped, mocked, spit on, nailed up naked on a cross.

But before any of that happened, the Father declared His love and approval so the Son could stand strong in it.

And honestly, that's what so many of us want deep down too.

To know God sees us.

That He's pleased.

That we're His. But here's what's wild — because of what Jesus did, you don't need the sky to rip open for God to say that over you.

The Bible says that if you're in Christ, you're adopted, chosen, dearly loved, sealed by the same Spirit who came down on Jesus that day.

So yeah, this moment was about the Trinity showing up — Father, Son, Spirit all together in one epic scene.

But it was also God putting His stamp on Jesus so everyone would know,

"This is Him.

This is the one.

The Lamb who takes away the sin of the world."

Jesus stepped fully into His purpose, and God made sure there was no confusion about who He was or why He came.

That's the Savior you're trusting. That's who's leading you.`,
    bible_reading_reference: "Matthew 3:13-17 and John 1:29-34",
    reflection_question: "Do you know what God's purpose is for you? Are you letting money, fear, or your situation hold you back from fully stepping into it, the way Jesus stepped into His?",
  },
  {
    day_number: 10,
    day_title: "Led by the Spirit into the Wilderness",
    devotional_text: `We've been walking through this whole story step by step.

From Jesus as a twelve-year-old in the temple, already locked into who He was and what His life was about. To eighteen hidden years in Nazareth, quietly growing in wisdom, stature, and favor with God and people.

Then we saw John the Baptist show up — Jesus' cousin, who spent his own years out in the wilderness getting strong in spirit, ready to prepare the way.

Then Jesus came down to the Jordan, stepped into the water, and let John baptize Him.

That was Jesus fully accepting His mission — the mission to be the Lamb of God, the final sacrifice for sins.

And right there the heavens opened, the Spirit descended on Him like a dove, and the Father declared for everyone to hear,

"This is my Son, whom I love; with Him I am well pleased."

It's this huge, public moment of affirmation.

But look at what happens immediately after that.

Matthew 4:1 says,

"Then Jesus was led by the Spirit into the wilderness to be tempted by the devil." Mark's Gospel says it even more intensely: "At once the Spirit sent Him out into the wilderness."

That might mess with your head.

The Spirit didn't lead Him to a throne or to start gathering crowds or building a following.

The Spirit led Him into a place of testing.

Right after God the Father publicly said, "I love You, I'm pleased with You," Jesus was led into hunger, isolation, and a face-to-face showdown with Satan himself.

And Jesus didn't waste that time.

The Bible says He fasted for forty days and forty nights.

That means He was praying, seeking His Father, getting spiritually locked in.

This was His training ground.

Before He ever performed a miracle or preached a sermon or faced the devil's temptations head on, Jesus was out there preparing.

Emptying Himself of the world, filling Himself up with the presence of God.

That's what the wilderness is for. It's not punishment — it's preparation.

It's where God strips away all the extra so you can get strong enough for what's coming.

That's what He did with Moses on the backside of the desert, with David hiding in caves from Saul, and even with John the Baptist living off locusts and wild honey until his time came.

And that's what He was doing with Jesus.

Most of us want to face temptation when it comes without ever preparing ahead of time.

We think we'll just be strong enough in the moment. But look at Jesus.

Before He ever spoke a word back to Satan, He had already spent forty days in prayer and fasting, building up spiritual muscle.

Maybe your wilderness doesn't look like rocks and sand.

Maybe it's a season of waiting, feeling hidden, or nothing big happening in your life. But that's not wasted time.

That's the time to prepare.

To dig into the Bible, learn what God says, pray, let Him work on your character, so that when temptation comes knocking, you're not scrambling.

You're ready.

Jesus didn't come out of the wilderness weak. He came out full of the power of the Spirit.

That's what happens when you let God use these quiet seasons to shape you. You come out stronger than ever, ready for whatever He's called you to do.`,
    bible_reading_reference: "Matthew 4:1-2 and Mark 1:12-13",
    reflection_question: "What does your wilderness look like right now? Are you letting it make you stronger by praying, reading, and preparing or are you just waiting around hoping life changes on its own?",
  },
  {
    day_number: 11,
    day_title: "Turn These Stones Into Bread",
    devotional_text: `So after forty days of fasting, praying, and getting spiritually locked in,

Jesus is standing in the wilderness hungry. Physically weak. His body empty.

And that's exactly when the devil shows up. Because temptation always comes strongest when your guard is down, when you're exhausted, when your needs are screaming the loudest.

Luke 4:3 says, "The devil said to him, 'If you are the Son of God, tell this stone to become bread.'"

Now a lot of people read that like Satan was questioning who Jesus was — "if you're really the Son of God…" But in the Greek, that word if is actually more like since.

The devil knew exactly who Jesus was. This wasn't a challenge to Jesus' identity. It was an attack on His mission.

The devil was basically saying, "Since you're the Son of God, why are you out here starving? You've got all this power.

Just skip this whole hunger thing. Turn these stones into bread. Fix your situation right now."

This is the lust of the flesh at work. It's your physical cravings. It's the part of you that says, "I want it now. I deserve it.

Why should I wait when I can satisfy myself immediately?"

Jesus was hungry — intensely, painfully hungry.

And the devil tried to get Him to use His power for Himself, to meet a need that wasn't evil in itself (bread isn't a sin), but to do it outside of God's timing, outside of God's purpose.

Because here's the truth — Jesus' hunger was part of the story.

It was part of the process.

This was how He was growing stronger, how He was learning to depend completely on the Father.

The fasting was exactly what was preparing Him to stand firm.

If He skipped it by turning rocks into bread, it would short-circuit everything God was doing in Him.

That's exactly how temptation works for us too.

The devil comes in when your flesh is craving something, and he whispers, "Why wait?

Why go through this hard season?

Just take it now.

You've got the power.

You've got the opportunity.

Who's it really hurting anyway?"

But Jesus doesn't flinch. He looks Satan dead in the face and says, "It is written:

Man shall not live on bread alone."

We're going to dive into exactly what that means tomorrow, where it came from, and how it ties back to Moses and Israel in the wilderness.

But for today, just see this for what it is: Jesus stood where every other human failed.

Adam couldn't do it. Israel couldn't do it. David couldn't do it. But Jesus did. He refused to let the cravings of the flesh override the purpose of God.`,
    bible_reading_reference: "Luke 4:1-4",
    reflection_question: "Where in your life is the devil trying to get you to satisfy a craving outside of God's timing or plan? What's your version of turning stones into bread?",
  },
  {
    day_number: 12,
    day_title: "Man Shall Not Live on Bread Alone",
    devotional_text: `Yesterday we left off with Jesus looking the devil dead in the face and saying, "It is written: Man shall not live on bread alone."

That was His answer to the first temptation — the devil telling Him to turn stones into bread, to give His body what it craved outside of God's timing.

But what's so powerful is where that quote came from. Because Jesus wasn't just coming up with some clever comeback.

He was quoting Moses, all the way back in Deuteronomy 8.

Moses was standing in front of a brand new generation of Israelites — the sons and daughters of the people who'd come out of Egypt.

Their parents had all died off in the wilderness because they wouldn't trust God. Over and over they grumbled, doubted, chased idols, put God to the test.

So now here was Moses, standing before their kids, getting them ready to finally enter the Promised Land.

And he tells them:

"Remember how the Lord your God led you all the way in the wilderness these forty years, to humble and test you in order to know what was in your heart… He humbled you, causing you to hunger and then feeding you with manna, which neither you nor your ancestors had known, to teach you that man does not live on bread alone but on every word that comes from the mouth of the Lord." -Deuteronomy 8:2-3

See, this was Moses reminding them of everything God had done.

How God had taken their parents out of slavery in Egypt — parted the Red Sea right in front of them so they could walk through on dry ground.

How a couple months later, when they ran out of water in the desert, they started whining, asking, "Is the Lord even with us or not?"

So God told Moses to strike the rock, and water gushed out. But the people still weren't satisfied.

They still doubted.

So God let them get hungry — not to harm them, but to humble them. To teach them that their real life didn't depend on bread.

It depended on God. Then He fed them with manna, bread from heaven that they never even heard of before, just to prove He was the one keeping them alive.

But even with all that, they still wouldn't fully trust Him. So God let that entire generation die off in the wilderness, wandering for forty years until only their children were left.

And now, right before crossing into a land with vineyards they didn't plant, houses they didn't build, wells they didn't dig — Moses was saying, "Don't think this is about bread. Don't think this is about stuff.

It's God who sustained you.

It's God who saved you.

Don't ever forget that."

That's the exact line Jesus pulled from when He faced the devil.

The devil tried to say, "Since you're the Son of God, turn these stones into bread. Feed your flesh. Use your power for yourself."

And Jesus said, "No. Man doesn't live on bread alone. My life isn't held together by food or comfort or quick fixes. It's held together by every word that comes from God."

The same goes for us. You might be tempted to think your life is about the money you make, the job you work, the food you eat, the stuff you chase.

But that's not what keeps you alive.

That's not what's carrying you through your wilderness.

It's God. His Word.

His promises.

His hand on your life even when you don't see it.`,
    bible_reading_reference: "Deuteronomy 8:1-10",
    reflection_question: "Where in your life are you putting more trust in "bread" — your paycheck, your comfort, your plans — than in God? How can you start depending on Him more today?",
  },
  {
    day_number: 13,
    day_title: "Israel's Wilderness Story",
    devotional_text: `Before we jump back into Jesus' showdown with the devil, we need to rewind about 1,400 years.

Because the words Jesus used to shut down Satan didn't come out of nowhere.

They came from a moment way back in Israel's story — a story that's all about slavery, freedom, wilderness, and trust.

It started in Egypt.

The Israelites had been living there for generations ever since the days of Joseph. But by this time, they weren't honored guests anymore.

They were slaves. Brutally oppressed, forced to build Pharaoh's cities, crying out under harsh masters who beat them down every day. They had no power to save themselves.

Then God raised up Moses.

Through burning bushes, stuttering speeches, and plagues that brought Egypt to its knees, God proved He was stronger than any empire, any false god, any king on earth.

The final plague — the death of the firstborn — broke Pharaoh's heart, and he finally let them go.

That's what the Passover celebrated every year: God sparing His people, saving them through the blood of a lamb, setting them free from slavery.

But it didn't stop there. Pharaoh changed his mind and chased them down with his entire army.

Israel was trapped — Red Sea in front of them, chariots behind them.

Then God did the impossible.

He split the waters so they could walk through on dry ground. When the Egyptians tried to follow, the waters crashed back and wiped them out completely.

That was supposed to be the beginning of a short journey.

From Egypt to Canaan — the land God promised Abraham, Isaac, and Jacob — was only about an eleven-day walk.

But it turned into forty years.

Why?

Because they wouldn't trust God.

Barely months after crossing the Red Sea, they ran out of water and started complaining. "Is God even with us? Did He just bring us out here to die?"

So God told Moses to strike a rock, and water gushed out. Not long after that, they complained about food.

God sent them manna from heaven every single day, but they still grumbled.

They longed to go back to Egypt — back to slavery — because at least there they knew what to expect.

When they finally got to the edge of the Promised Land, God told them to go in and take it.

But they sent spies who came back scared, saying the people there were giants.

And instead of trusting the God who just crushed Egypt and split the sea, Israel panicked.

They refused to go in.

They even talked about picking a new leader to take them back to Egypt.

That was the breaking point. God said, "Fine.

You won't trust Me to give you this land?

Then this entire generation will die out here in the wilderness.

Your children will be the ones to inherit it — not you."

So for forty long years, they wandered. Circling the same wilderness, watching loved ones die off, waiting for the next funeral until finally that entire unbelieving generation was gone.

Now here they were, forty years later. Moses stood in front of their sons and daughters — the new generation — on the border of the land God had promised all along.

They were finally about to cross over into a place with houses they didn't build, vineyards they didn't plant, wells they didn't dig — blessings they did nothing to earn.

Before they stepped in, Moses gathered them together to give them one last speech.

To remind them of everything God had done.

To warn them not to forget. To make sure they knew that the wilderness wasn't about bread, water, or comfort — it was about learning to trust that their real life came from God alone.

That's the moment Jesus would later quote when He stood face to face with the devil.

That's what we're going to look at tomorrow.

But today, just let the whole weight of this story sink in.

God had saved them from slavery, carried them through miracles, tested them in the wilderness, and was about to give them a home they didn't deserve.

The only question was whether they would remember who kept them alive — or run right back to chasing everything else.`,
    bible_reading_reference: "Exodus 16-17 and Numbers 13-14",
    reflection_question: "What's your own "wilderness story"? When has God carried you, provided for you, or tested you — and what has it taught you about where real life comes from?",
  },
  {
    day_number: 14,
    day_title: "How Jesus Replies",
    devotional_text: `So yesterday we walked through the whole backstory of Israel.

From slavery in Egypt to miracles in the wilderness to blowing it at the edge of the Promised Land — and now Moses is standing there, forty years later, talking to their kids.

He's about to send them into a land flowing with milk and honey.

They're going to live in houses they didn't build, eat from vineyards they didn't plant, drink from wells they didn't dig.

And Moses is basically saying: "Don't forget how you got here. Don't start thinking it was bread or water or your own cleverness that kept you alive. It was God. Always God."

That's the moment Jesus reached back to when He stood face to face with the devil.

Remember what the devil said?

"Since you're the Son of God, turn these stones into bread."

He was trying to get Jesus to satisfy His flesh on His own terms — to take a shortcut, to skip the process, to feed Himself without depending on the Father.

And Jesus answered by quoting Moses directly from Deuteronomy 8:3.

He said, "It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God."

Back then, Moses was telling Israel, "God let you hunger on purpose.

He wanted to teach you something. That you're not kept alive by bread.

You're kept alive by Him.

By His words. By His promises.

That's what really sustains you."

Now here was Jesus, literally starving in the wilderness, and He still refused to break that truth.

He didn't say, "Yeah, I'm hungry — might as well turn these stones into bread because I can."

He was basically saying, "No. My Father's word is what sustains Me.

If He wants Me hungry right now, I'll stay hungry.

I trust Him more than I trust My stomach."

That's what makes Jesus' answer so perfect.

Israel failed that test.

When they were hungry, they grumbled, doubted, complained, wished they could go back to slavery.

But Jesus passed it.

He stood in the same kind of wilderness, facing the same temptation — to take matters into His own hands — and He said, "No. I live on what God says. That's enough for Me."

Most of us crumble at way less.

We get a little uncomfortable, a little anxious about how things are going, and we start grabbing for our own solutions.

We forget that it's not the bread, the money, the job, the relationship that keeps us alive. It's God. It's His word.

It's His promises that actually hold everything together.

Tomorrow we're going to see the devil take another swing with a new temptation.

But for today, just let this sink in: Jesus won in the wilderness exactly where everyone else failed — by trusting the Word of God more than anything His flesh craved.`,
    bible_reading_reference: "Deuteronomy 8:2-5 and Luke 4:1-4",
    reflection_question: "Where are you tempted to meet your needs in your own way instead of trusting God's timing? What would it look like for you to really live on God's word right now, not just bread?",
  },
  {
    day_number: 15,
    day_title: "All These Kingdoms",
    devotional_text: `So after the devil tried to hit Jesus with the lust of the flesh — telling Him to turn stones into bread and satisfy Himself outside of God's timing — he comes right back with a second temptation.

Luke 4:5 says,

"The devil led him up to a high place and showed him in an instant all the kingdoms of the world."

Then he says,

"I will give you all their authority and splendor… if you worship me, it will all be yours."

This was the lust of the eyes.

It was greed. It was wanting more, wanting what you see, wanting to take control of everything around you.

The devil was basically saying, "Look at all this. I'll give you power.

I'll give you every nation, every throne, every bit of glory you can see.

All you have to do is bow down and worship me."

And notice — it was a shortcut.

Jesus came to earth with a mission: to defeat sin and death, to take back the kingdom, to redeem people from every tribe and nation and bring them under God's rule.

But the path to get there ran straight through suffering, betrayal, a bloody cross, and an empty tomb.

The devil was offering Him a way around all of that.

"Skip the wilderness. Skip the rejection. Skip the pain and humiliation.

I'll hand it all to you right now. No cross needed — just worship me."

That's how temptation works for us too.

It's the devil dangling stuff in front of your eyes — money, status, relationships, opportunities — whispering, "Take it now.

Why wait on God?

Why trust His timing?

Why go through all that struggle when I can hand it to you faster?

All you have to do is compromise just a little."

He does it by making us jealous of other people's lives.

We look at what someone else has — their marriage, their body, their following, their success — and start thinking, "I want that.

I deserve that.

I'll do whatever it takes to get it."

That's the lust of the eyes.

Wanting more because of what you see, instead of trusting that God knows exactly what's good for you, when it's good for you, and how it's going to come.

Jesus didn't bite.

He wasn't tempted by the shiny kingdoms, because He knew that wasn't the way.

He wasn't about to trade worshiping His Father for ruling the world on the devil's terms.

He wasn't going to take a shortcut that skipped the cross — because that cross was the whole point.

Tomorrow we're going to look at exactly how Jesus shut this temptation down.

But today, just let this hit you: the devil always offers shortcuts.

He promises you everything you see — as long as you're willing to worship him in little ways, compromise in little ways, bow your knee to something other than God.

The question is whether you'll take the bait or trust that what God has for you is worth waiting for, even if it costs more, even if it takes longer, even if it hurts.`,
    bible_reading_reference: "Luke 4:5-8",
    reflection_question: "Where are you tempted to take a shortcut right now — chasing what you see, instead of trusting God's way and God's timing?",
  },
  {
    day_number: 16,
    day_title: "Worship God Only",
    devotional_text: `So yesterday we looked at how the devil tried to tempt Jesus with all the kingdoms of the world.

He showed Him everything shiny — power, authority, splendor — and said, "It can all be yours, if you just worship me."

But Jesus didn't flinch. Luke 4:8 says, "Jesus answered, 'It is written:

Worship the Lord your God and serve Him only.'"

That wasn't random.

Jesus was quoting straight from Moses again.

This time from Deuteronomy 6, where Moses was standing in front of the new generation of Israelites, giving them one last speech before they finally stepped into the Promised Land.

See, Moses knew exactly what was waiting for them.

They were about to go into a land full of other nations who worshipped all kinds of idols — statues of fake gods, poles dedicated to demons, sacrifices made to spirits that demanded everything but gave nothing back.

Moses knew how easy it would be for Israel to look around, see how everyone else lived, and start thinking, "Maybe we'll try it their way.

Maybe their gods will give us what we want faster."

So he told them flat out: "Fear the Lord your God, serve Him only...

Do not follow other gods, the gods of the peoples around you; for the Lord your God who is among you is a jealous God." -Deuteronomy 6:13-15

This wasn't the first time Israel had a problem with idols.

Back when their parents were freed from Egypt, Moses went up Mount Sinai to get the Ten Commandments — literally the blueprint for how God wanted them to live.

But while he was up there, gone a little too long for their comfort, they panicked.

They didn't want to wait on God. So they melted down all their gold, shaped it into a calf, and started worshipping it. Dancing around, throwing a party, giving their hearts and trust to something they made with their own hands.

That's how quick people can turn from God when they're afraid or impatient.

So when Moses was talking to their kids forty years later, he was saying, "Don't be like your parents.

Don't get into this land, see what everybody else is doing, and start chasing other gods. Don't worship what they worship. Don't forget who brought you here."

That's exactly what Jesus stood on when Satan offered Him all the kingdoms.

The devil was basically saying, "I'll make You the king of the whole world — no suffering, no cross. Just bow to me." And Jesus shot it down immediately with, "No. It's written: Worship the Lord your God and serve Him only."

He refused to trade the Father's plan for the devil's shortcut.

He wasn't about to bow down to get what looked good, even if it meant the kingdoms of the world. Because Jesus knew what real worship is — it's giving your heart, trust, loyalty, and obedience to God alone.

Not to money, not to power, not to a false promise of easier, faster glory.

That's what idolatry looks like now too. It's not always a golden calf. It's whatever you look to for security, hope, validation — your paycheck, your reputation, your hustle, a relationship, the approval of people around you.

Anything that competes with God for first place in your heart is an idol.

And the devil is still dangling those deals every day: "Bow to this, chase this, trust this more than God, and I'll give you what you want faster."

Tomorrow we're going to see the third temptation, where the devil tries to twist Scripture itself.

But for today, just let this hit you: Jesus stood where Israel fell. He refused to bow to anyone but the Father. And that's exactly what you're called to do too.`,
    bible_reading_reference: "Deuteronomy 6:10-15 and Luke 4:5-8",
    reflection_question: "What's something in your life right now that might be trying to take God's place — something you trust or chase more than Him? How can you put God back in first place today?",
  },
  {
    day_number: 17,
    day_title: "The Pride of Life",
    devotional_text: `So after trying to get Jesus with the lust of the flesh — turning stones into bread — and the lust of the eyes — offering Him all the kingdoms of the world — the devil takes one last shot. This time he goes after the pride of life.

Luke 4:9 says, "The devil led him to Jerusalem and had him stand on the highest point of the temple."

That was the pinnacle, the very top of the temple in Jerusalem. Picture it — the most sacred place on earth for the Jews, the center of worship, where sacrifices were made and God's presence was supposed to dwell. And Satan brings Jesus right up to the top of it.

That pinnacle was no small ledge.

Historians say it was around 400 feet up from the Kidron Valley below.

Standing there would be like standing on the roof of a skyscraper, looking straight down.

Then the devil says, "If you are the Son of God, throw yourself down from here.

For it is written:

'He will command his angels concerning you… they will lift you up in their hands so that you will not strike your foot against a stone.'"

Look at that. The devil literally quoted Scripture. He twisted Psalm 91, which is about trusting God's protection when you walk in His ways — not jumping off buildings just to prove a point.

This was all about pride and recklessness.

It was Satan saying, "If you're really God's Son, you can do whatever you want. You can put yourself in any situation, no matter how foolish or dangerous, and God will have to save you. Test Him.

Prove how chosen you are. Take your life into your own hands."

That's the pride of life — living like you're invincible, like God owes you protection no matter how reckless you are, like you can run your own life on your own terms and God will just clean up the mess.

It's saying, "Look how special I am, look what I can do. I'll jump, and God will catch me because He has to."

Jesus wasn't having it. He wasn't about to play games with His Father's promises.

He knew you don't test God by putting yourself in stupid situations just to see if He'll bail you out. That's not faith. That's arrogance.

It's the same for us today.

People might not stand on top of a church and jump off to prove God loves them. But they take reckless spiritual risks all the time.

They live in ways they know God warned against — chasing sin, ignoring wisdom, diving into situations they were never meant to be in — and then expect God to rescue them without consequence.

That's pride.

That's saying, "I can live however I want, and God will still have to bless me and keep me safe."

Jesus stood firm where so many of us fail. He refused to twist God's Word to justify reckless living.

He didn't force God's hand to prove His identity.

He stayed humble, trusted His Father's plan, and didn't let pride or presumption take over.

Tomorrow we're going to see exactly how Jesus answered this temptation.

But for today, just let this sink in: you don't prove your faith by jumping off spiritual cliffs and daring God to catch you.

You prove it by obeying Him, trusting His timing, and living wisely under His care.`,
    bible_reading_reference: "Luke 4:9-12 and Psalm 91:11-12",
    reflection_question: "Where might you be living recklessly — expecting God to keep blessing and protecting you even when you're ignoring what He already told you to do?",
  },
  {
    day_number: 18,
    day_title: "Don't Test God",
    devotional_text: `Yesterday we saw the devil trying one last angle — taking Jesus up to the top of the temple in Jerusalem, telling Him to jump off, and twisting Scripture to say God would send angels to catch Him.

It was the ultimate pride play. "Prove how chosen you are. Force God to save you. Show off your position."

But Jesus shut it down instantly. Luke 4:12 says, "Jesus answered, 'It is said: Do not put the Lord your God to the test.'"

That wasn't just a general proverb. Jesus was quoting Moses again.

Back in Deuteronomy 6, while Moses was giving his final speech to the new generation of Israelites, he told them:

"Do not put the Lord your God to the test as you did at Massah." -Deuteronomy 6:16

Massah was one of those moments back in the wilderness where Israel completely failed the trust test. They were thirsty, hot, scared — and instead of crying out to God in faith, they turned on Him.

They demanded proof. They said, "Is the Lord even among us or not?"-Exodus 17:7

They basically told God, "If You're really with us, You better show up on our terms, right now."

That's what it means to test God.

It's putting yourself in reckless situations, making demands, refusing to trust unless God proves Himself in the way you want. It's saying,

"If You really love me, God, You'll do this for me. If You're really good, You'll fix this exactly how I say."

That's not faith.

That's pride.

That's putting God on trial.

Jesus refused to do it.

He didn't need to force His Father's hand to prove who He was. He didn't twist promises to justify something reckless. He simply trusted.

That's how He defeated the pride of life.

Now back to Moses. After all his warnings — about not forgetting God, not chasing other gods, not putting the Lord to the test — that new generation did finally go into the Promised Land.

Moses himself didn't get to enter because of his own moment of disobedience, but Joshua led them in.

They conquered cities, took the land God promised, settled down, started living the life their parents were too fearful to step into.

But here's the sad part. Over time, they still fell into the same cycles.

They got comfortable, started worshiping other gods, forgot the lessons of the wilderness.

God sent judges, then kings, then prophets to call them back over and over. Eventually it all fell apart — their nation split, foreign powers conquered them, and by the time Jesus showed up, they were living under Roman oppression, waiting again for God to save them.

That's why this story mattered so much.

When Jesus was in the wilderness, it wasn't just about Him proving something for Himself. He was standing in Israel's place — succeeding where they failed, trusting where they tested, worshiping where they wandered.

He was reliving their story and rewriting the ending. And He did it all perfectly so that one day He could lead not just Israel, but all of us, into the real Promised Land — into life with God forever.

Tomorrow we're going to pull all of this together and look at the steps Jesus used to fight temptation, so we can start fighting the same way.

But for today, just sit with this: every place Israel failed, every place we fail, Jesus stood firm.

He didn't test God — He trusted Him. And that's exactly why we can trust Him too.`,
    bible_reading_reference: "Deuteronomy 6:16-18 and Luke 4:9-12",
    reflection_question: "Where in your life have you been demanding that God prove Himself on your terms, instead of simply trusting Him? What would it look like to stop testing and start trusting?",
  },
  {
    day_number: 19,
    day_title: "Power & Purpose",
    devotional_text: `So we've walked through Jesus' entire wilderness season. Forty days of hunger, solitude, and head-to-head combat with the devil himself.

And every temptation that came at Him — the lust of the flesh, the lust of the eyes, the pride of life — Jesus shut it down with the Word, with trust, with total dependence on His Father.

But here's what's amazing: the wilderness wasn't the end. It was just the beginning.

Luke 4:14 says, "Jesus returned to Galilee in the power of the Spirit, and news about Him spread through the whole countryside."

That's huge. The same Spirit who led Him into the wilderness now fills Him with power to start His ministry.

Because the wilderness wasn't wasted time — it was preparation. The testing forged Him for everything that was about to come.

Healing the sick, casting out demons, teaching the crowds, confronting hypocrisy, going to the cross.

The wilderness made Him strong enough to handle it all.

But the challenges didn't stop. Right after this, Jesus goes back to His hometown, stands up in the synagogue, reads from Isaiah and basically declares, "I'm the one you've been waiting for."

And you know what happened?

They tried to throw Him off a cliff.

The Pharisees — the religious leaders who were supposed to love God most — became His biggest enemies. People questioned Him, doubted Him, mocked Him, plotted to kill Him.

That's how it works. Victory over temptation doesn't mean life gets easier. It means God's getting you ready for the next level.

The fight keeps going, but you're stronger now. You've proven you can stand when it's hard.

You've built spiritual muscle that God can now use for something bigger.

Same goes for you.

You're never going to be perfect.

Temptation doesn't magically disappear because you got through a tough season.

You still have flesh, you're still human, you'll still feel the pull.

But every time you fight it, every time you run to God instead of sin, your bond with Him gets deeper.

Your spirit gets sharper. Your witness gets brighter. You start to look more like Jesus.

And that's the real goal. Not just to be a "good person," not to check off spiritual boxes.

But to become someone God can pour Himself into so fully that it spills out everywhere you go.

His Spirit pours into you, and then it flows out — in how you love people, how you serve, how you stand firm when everything around you is falling apart.

So don't get discouraged. If you're battling temptation, if you're feeling the heat, it doesn't mean you're failing.

It means you're in the training ground. God's strengthening you, preparing you, building something in you that's going to matter way beyond this moment.

And when you come out of it, you'll be walking in more power, more purpose, more clarity than ever before.

Tomorrow we'll talk about why this story matters so much for your life — and how God's always using these battles to shape you into who He created you to be.`,
    bible_reading_reference: "Luke 4:14-30",
    reflection_question: "How have your wilderness seasons and victories over temptation made you stronger? What's one way you can let what God's poured into you spill out onto others this week?",
  },
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
        subtitle: "21 Day Devotional on How to Fight Temptation Like Jesus",
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

