export type ExodusFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFourteenRawNotes(rawText: string): ExodusFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Exodus 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+14:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Exodus\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 14:${startVerse}` : `Exodus 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 14 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FOURTEEN_RAW_NOTES = `# Exodus 14:1-4
# 🗺️ A Trap Set On Purpose
---
## 🗺️ Encamp Before Pihahiroth, Between Migdol And The Sea

"Pihahiroth" was a real, identifiable location on Egypt's eastern border, not a vague wilderness spot.

Migdol and Baalzephon were nearby landmarks that helped mark the exact camp site.

God is not sending Israel out to wander aimlessly here.

He is placing them at one specific, trackable point on the map.

That kind of detail only makes sense if God already knows exactly what happens next.

🗺️ Pihahiroth was a real place

📍 Migdol and Baalzephon mark the spot

🚫 Not a random wilderness location

📖 God already knows what comes next

---

## 🪤 They Are Entangled In The Land, The Wilderness Hath Shut Them In

This line is not Israel's own fear, it is a prediction of what Pharaoh will think.

"Entangled" means trapped and confused, unable to find a way out.

Pharaoh will see Israel camped against the sea and assume they made a wandering mistake.

God planned this exact appearance of weakness on purpose.

The trap is not real for Israel, it is bait set for Pharaoh.

🪤 This predicts Pharaoh's thinking, not Israel's fear

😕 Entangled means trapped and confused

👀 Pharaoh will see them as lost

📖 The apparent trap is bait for Pharaoh

---

## 😤 I Will Harden Pharaoh's Heart

"Harden" means Pharaoh's heart grows stubborn and unwilling to change.

This same phrase has appeared again and again since the early plagues in Exodus.

Each time, Pharaoh's own choices and God's judgment work in the same direction.

This chapter marks the final and most dramatic use of that pattern.

God is not forcing a good man to do evil here.

He is confirming the direction Pharaoh has already chosen for himself.

😤 Harden means stubborn and unwilling

🔁 This pattern repeats since the plagues began

🎯 This is the pattern's final use

📖 God confirms the choice Pharaoh already made

---

## 📛 That The Egyptians May Know That I Am The LORD

This whole confrontation exists to prove one specific point.

"The LORD" translates God's personal covenant name, not just a generic title for deity.

Egypt worshiped many gods tied to the Nile, the sun, and Pharaoh himself.

This final showdown will show all of Egypt whose power actually rules creation.

The goal was never simply escape.

The goal was revealing exactly who God is.

🎯 This whole event proves one point

📛 The LORD is God's personal covenant name

🛕 Egypt worshiped many rival gods

📖 The goal was revealing who God is

# Exodus 14:5-9
# 🐎 Pharaoh Gives Chase
---
## 😔 Why Have We Done This, That We Have Let Israel Go

Pharaoh already agreed to let Israel go after the tenth plague.

Now that the shock has faded, he regrets losing his entire slave labor force.

Fear and grief made him agree, but those feelings did not last.

This shows how quickly a real decision can be undone once the pain fades.

Pharaoh's change of heart sets the whole chase in this chapter into motion.

😔 Pharaoh already let Israel go once

💸 He now regrets losing his workers

⏳ His grief did not last long

➡️ His change of heart starts the chase

---

## 🏇 He Made Ready His Chariot, And Took His People With Him

Pharaoh does not send his army out alone.

He personally prepares his own chariot and joins the chase himself.

A king leading troops in person showed how seriously he took this pursuit.

This was not a minor matter handled by lower officers.

Pharaoh staked his own presence and reputation on catching Israel.

🏇 Pharaoh joins the chase himself

👑 A king leading troops shows real seriousness

🚫 This was no minor matter

📖 Pharaoh staked his own reputation on this

---

## 🏆 Six Hundred Chosen Chariots, And All The Chariots Of Egypt

"Chosen chariots" means Egypt's elite, best trained fighting units, not ordinary soldiers.

Six hundred of these top chariots led the charge.

Behind them came every other chariot Egypt had available.

Pharaoh commits his entire military strength to this one pursuit.

Nothing was held back in reserve.

🏆 Chosen chariots means Egypt's elite forces

🔢 Six hundred of the very best led

🚗 Every remaining chariot followed behind

📖 Egypt commits its entire military strength

---

## 🔁 The LORD Hardened The Heart Of Pharaoh

Verse four already announced that God would harden Pharaoh's heart.

This verse confirms it actually happened.

Pharaoh's own regret and pride worked together with God's stated plan.

Neither cancels out the other in this story.

Both are true at the same time.

🔁 Verse four already announced this hardening

✅ This verse confirms it happened

🤝 Pharaoh's pride and God's plan work together

📖 Both causes are true at once

---

## ✋ Went Out With An High Hand

"An high hand" is an old way of describing a bold, confident exit.

Israel did not sneak out of Egypt in secret shame.

They walked out in full view of everyone.

Ten plagues had already proven God's power to protect them.

That confidence makes Pharaoh's sudden pursuit even more alarming.

✋ High hand means bold and confident

🚶 Israel left openly, not in secret

💪 Ten plagues had already proven God's power

➡️ Confidence turns to danger fast

# Exodus 14:10-12
# 😨 Trapped Between Sea And Army
---
## 😨 They Were Sore Afraid

"Sore" here means severely or intensely, not physical soreness.

Israel is trapped with the sea ahead and Pharaoh's army closing in behind.

Their fear in this moment is real and understandable.

Anyone boxed in like this would feel the same terror.

The text does not shame them for feeling afraid.

😨 Sore means severely or intensely

🌊 The sea blocked their path forward

🐎 Pharaoh's army closed in behind

📖 Their fear here is understandable

---

## 🙏 The Children Of Israel Cried Out Unto The LORD

Fear did not stop Israel from turning to God first.

Crying out here means calling on God directly for rescue.

This instinct was right, even before their next words turn toward blame.

The same breath that prays can still complain a moment later.

Both reactions sit side by side in this same scene.

🙏 Crying out means calling for rescue

✅ Their instinct to pray was right

😤 Complaint follows right after the prayer

📖 Fear can hold two reactions at once

---

## 🪦 Because There Were No Graves In Egypt

This complaint drips with sarcasm, not a real question about burial sites.

Egypt actually had plenty of graves and famous tombs.

The people are really accusing Moses of leading them out only to die in the desert.

Fear has twisted their memory of how badly they suffered as slaves.

Sharp words like these often come from panic, not honest reasoning.

🪦 This complaint is sarcasm, not a real question

🏺 Egypt actually had famous tombs and graves

😡 They accuse Moses of leading them to die

📖 Panic twists memory more than it reveals truth

---

## ⛓️ Better For Us To Serve The Egyptians

Faced with real danger, some in Israel would rather go back to slavery than risk freedom.

Slavery felt certain and familiar, even though it was brutal.

Freedom in the wilderness felt uncertain and frightening in this moment.

This same struggle repeats again and again through the rest of Exodus and Numbers.

Trusting God with an unknown future is often harder than staying with a known misery.

⛓️ Slavery felt certain, even though brutal

🏜️ Freedom felt uncertain and frightening

🔁 This struggle repeats through Exodus and Numbers

📖 Trusting God is harder than staying familiar

# Exodus 14:13-14
# 🛑 Moses Calls For Stillness
---
## 🛑 Fear Ye Not, Stand Still, And See The Salvation Of The LORD

Moses answers panic with calm instructions, not more information.

"Stand still" means stop trying to fix this by their own strength.

"Salvation" here means a physical, visible rescue, not just a future promise.

Moses asks the people to watch God work instead of scrambling for a plan of their own.

Trust looks like stillness here, not passivity.

🛑 Moses answers panic with calm words

✋ Stand still means stop relying on themselves

👁️ Salvation means a visible, physical rescue

📖 Trust here looks like stillness

---

## 🔮 Ye Shall See Them Again No More For Ever

Moses makes an absolute promise, not a hopeful guess.

The Egyptian army chasing them right now will never threaten Israel again.

This certainty comes before Israel has seen any part of the miracle yet.

Moses speaks this confidently on God's word alone.

Faith here means believing an outcome before it happens.

🔮 Moses speaks a certain promise, not a guess

🚫 This army will never threaten them again

⏳ Said before the miracle even begins

📖 Faith believes the outcome before it happens

---

## 🤐 The LORD Shall Fight For You, And Ye Shall Hold Your Peace

"Hold your peace" means stay quiet and stop struggling, not simply feel calm inside.

Israel has no real army and no weapons to fight Egypt with.

God tells them plainly that this battle belongs entirely to Him.

Their only role is to trust and let Him act.

That is a hard thing to do while an army is closing in.

🤐 Hold your peace means stop struggling

⚔️ Israel has no army of its own

🙌 This battle belongs entirely to God

📖 Their only role is trust

# Exodus 14:15-18
# 🌊 God Tells Moses To Move
---
## ❓ Wherefore Criest Thou Unto Me

This question sounds surprising directed at Moses in the middle of a crisis.

God is not rebuking prayer itself.

The moment for standing still and crying out has already passed.

Now God calls Moses to move forward in action instead.

Prayer and obedience both matter, but each has its own moment.

❓ This question sounds surprising in a crisis

🙏 God is not rebuking prayer itself

⏱️ The moment for crying out has passed

📖 Now is the moment for action

---

## 🪄 Lift Thou Up Thy Rod, And Stretch Out Thine Hand Over The Sea

This is the same rod Moses used throughout the plagues in Egypt.

It struck the Nile, called down hail, and brought on the locusts.

Now that same simple wooden staff performs the greatest miracle of the whole book.

God does not need a new tool for a bigger task.

He uses the same instrument of obedience all along the way.

🪄 The same rod worked through every plague

🌊 It struck the Nile and called the locusts

🎯 Now it performs the greatest miracle yet

📖 God reuses the same tool of obedience

---

## 🏜️ The Children Of Israel Shall Go On Dry Ground Through The Midst Of The Sea

God does not promise a shallow crossing or a narrow path around the water.

He promises dry ground running straight through the middle of the sea itself.

This detail matters because a flooded path would trap chariots and slow families down.

The ground stays completely dry the entire way across.

Every detail of this miracle removes a reason to be afraid.

🏜️ Dry ground means no mud at all

🛣️ The path runs through the sea's middle

🐫 A wet path would have trapped the people

📖 Every detail here removes fear

---

## 💪 I Will Get Me Honour Upon Pharaoh

God repeats His purpose here for the third time in this chapter.

This moment must prove beyond doubt who actually holds real power.

Egypt will finally see it directly, not just hear about it secondhand.

Israel will see it too, and remember it for generations.

The whole event exists to answer one question about who God really is.

🔁 God repeats His purpose a third time

👀 Egypt will see this proof directly

📜 Israel will remember it for generations

📖 The event answers who God really is

# Exodus 14:19-20
# 🕊️ The Pillar Takes Its Post
---
## 🕊️ The Angel Of God Removed And Went Behind Them

This same angel had been leading Israel out in front the whole journey so far.

Now it moves to a completely different position, behind the people instead.

That change turns a guide into a guard.

God's presence now stands directly between Israel and the approaching army.

Protection here is not distant, it is right beside the danger itself.

🕊️ This angel had led Israel from the front

🔄 It now moves to stand behind them

🛡️ A guide becomes a guard here

📖 God's presence stands beside the danger itself

---

## ☁️ The Pillar Of The Cloud Went From Before Their Face

The pillar of cloud had guided Israel by day since they left Egypt in chapter thirteen.

It is the same visible sign of God's presence, now used a different way.

Instead of only leading, it now blocks and shields.

One object does two different jobs depending on what the moment requires.

God's guidance and God's protection often come from the very same source.

☁️ This is the same pillar from chapter thirteen

🧭 It had guided Israel by day so far

🚧 Now it blocks instead of only leading

📖 Guidance and protection share one source

---

## 🌑 A Cloud And Darkness To Them, But It Gave Light By Night To These

The exact same pillar produces two opposite effects at the very same time.

Egypt sees only darkness and confusion, unable to advance safely.

Israel sees light, enough to keep moving through the night without fear.

This is one object working two ways at once, not two separate objects.

God can protect one group and confuse another using the very same act.

🌑 Egypt experiences only darkness and confusion

💡 Israel experiences light through the night

🎯 One object, two completely different effects

📖 God protects and confuses with the same act

# Exodus 14:21-22
# 🧱 The Sea Splits Open
---
## 🙌 Moses Stretched Out His Hand Over The Sea

Moses does exactly what God commanded back in verse sixteen, without hesitation.

His hand alone has no power to move an ocean.

Obedience here is simple, even though the result is anything but simple.

The miracle belongs to God, the action belongs to Moses.

Faith often looks like doing the small, plain thing God actually asked for.

🙌 Moses obeys the exact command from verse sixteen

✋ His hand has no power on its own

🤝 The miracle is God's, the action is Moses's

📖 Faith often means doing the plain thing asked

---

## 🌬️ A Strong East Wind All That Night

God does not simply erase the sea with a snap of power.

He uses a real, physical wind that blows for hours through the entire night.

This shows God working through creation, not bypassing it entirely.

The waiting through a long night also tested Israel's patience and trust.

A miracle can still take time, even while it is fully God's work.

🌬️ God uses a real physical wind

🌙 The wind blows all through the night

🌍 God works through creation, not around it

📖 A miracle can still take real time

---

## 🧱 The Waters Were A Wall Unto Them On Their Right Hand, And On Their Left

The water does not simply drain away or trickle into puddles.

It stands upright on both sides like solid walls.

That image describes something structurally impossible under normal conditions.

Israel walks through a corridor of water held in place by nothing but God's command.

This detail makes the miracle impossible to explain away as coincidence.

🧱 The water stands like solid walls

↔️ Walls rise on both the right and left

🚫 This defies any normal explanation

📖 Only God's command holds the water in place

# Exodus 14:23-25
# 🛞 Egypt Walks Into The Trap
---
## 🐎 The Egyptians Pursued, And Went In After Them To The Midst Of The Sea

Pharaoh's entire army follows Israel straight into the very trap God described back in verse three.

Nothing stops them from walking onto the open seabed themselves.

Confidence and rage override any caution they might have had.

The same path that saves Israel becomes the path that destroys Egypt.

One road, two completely different outcomes depending on who walks it.

🐎 Egypt's whole army enters the sea

🪤 This is the trap God described earlier

😡 Rage overrides any real caution

📖 One path, two very different outcomes

---

## 🌌 In The Morning Watch

Ancient Israel divided the night into set watches for guarding a camp.

The "morning watch" covers the hours just before dawn, the last watch of the night.

Israel had walked through the sea for hours by this point, likely most of the night.

Egypt's pursuit and eventual destruction happen right as the sky begins to lighten.

Time details like this ground the miracle in one real, specific night.

🌌 Israel divided the night into set watches

🌅 Morning watch means just before dawn

⏳ Israel had already crossed for hours

📖 A real night grounds this real miracle

---

## 🛞 Took Off Their Chariot Wheels, That They Drave Them Heavily

Chariots were Egypt's most feared and powerful weapon of war.

God disables that exact strength at the worst possible moment for Egypt.

Wheels coming loose in wet sand would turn fast chariots into stuck, useless carts.

Egypt's greatest military advantage becomes a helpless liability in seconds.

God does not need to match Egypt's strength, He simply removes it.

🛞 Chariots were Egypt's most feared weapon

💥 God disables that exact strength here

🚫 Stuck wheels turn chariots into dead weight

📖 God removes strength instead of matching it

---

## 🏳️ Let Us Flee From The Face Of Israel

Even the Egyptian soldiers see clearly what is actually happening around them.

They do not credit Israel's own strength or clever tactics.

They say plainly that the LORD Himself fights against them.

An enemy soldier recognizing God's hand carries real weight in this scene.

The truth of this moment is undeniable to everyone present, including Israel's own attackers.

🏳️ Egyptian soldiers see the truth themselves

🙅 They do not credit Israel's own strength

🙌 They say the LORD fights against them

📖 Even the enemy admits what is happening

# Exodus 14:26-29
# 💀 The Sea Closes On Egypt
---
## 🔁 Stretch Out Thine Hand Over The Sea, That The Waters May Come Again

God gives Moses a second command, mirroring the first one back in verse sixteen.

The same action that opened the sea will now close it.

Nothing about this reversal needs a different tool or a longer process.

One simple, obedient motion undoes what the earlier motion started.

God's power does not need new methods, only the same steady obedience.

🔁 This mirrors the command from verse sixteen

🌊 The same action now closes the sea

✋ One simple motion reverses the miracle

📖 God's power needs no new methods

---

## 💪 The Sea Returned To His Strength When The Morning Appeared

"His strength" describes the sea returning to its normal, full force.

This happens right as morning light appears, closing the window Israel had all night to cross.

The timing was not a coincidence.

Israel finishes crossing just before the water returns to normal.

Every detail lines up exactly when it needs to.

💪 His strength means the sea's normal force

🌅 This happens right as morning appears

⏱️ Israel finishes just before the water returns

📖 Every detail lines up exactly on time

---

## 🙌 The LORD Overthrew The Egyptians In The Midst Of The Sea

The text credits this destruction directly to God, not to the sea itself or to chance.

Water is simply the instrument God chooses to use here.

This same sea had just protected Israel only moments earlier.

Now it becomes the tool of Egypt's complete defeat.

The very same act of God rescues one side and judges the other.

🙌 The LORD gets direct credit for this

🌊 Water is only God's chosen instrument

🛡️ The same sea had just protected Israel

📖 One act both rescues and judges

---

## 💀 There Remained Not So Much As One Of Them

This line states the outcome as completely as possible.

Not a single soldier from Pharaoh's pursuing force survives this event.

This total defeat ends Egypt's ability to threaten Israel for the rest of Exodus.

The chase that opened this chapter closes with total, final silence.

Nothing is left to chase Israel with anymore.

💀 No soldier survives the pursuing army

🚫 This total defeat ends the military threat

🔚 The chase closes with total silence

📖 Nothing is left to chase Israel with

---

## 🚶 The Children Of Israel Walked Upon Dry Land In The Midst Of The Sea

While Egypt's entire army drowns, Israel walks the same path on genuinely dry ground.

This is not a fresh miracle, it is the same one that opened the chapter's crossing.

Two very different outcomes happen at the exact same moment, on the exact same seabed.

God's protection over Israel never wavered through the whole event.

Deliverance and judgment happen side by side, not one after the other.

🚶 Israel walks the same path, still dry

⚰️ Egypt's whole army drowns at the same time

🎯 Two outcomes, one seabed, one moment

📖 Deliverance and judgment happen side by side

# Exodus 14:30-31
# 🙏 Israel Believes At Last
---
## 🏁 Thus The LORD Saved Israel That Day

This line marks the official end of Israel's slavery and pursuit by Egypt.

"That day" points back to one specific, real day in history, not a vague legend.

Everything since chapter one of Exodus has been building toward this exact moment.

Israel is now fully and finally free.

The rescue this chapter tells about is complete.

🏁 This marks the true end of the pursuit

📅 That day points to one real, specific day

📜 Exodus has built toward this moment

📖 Israel's rescue is now complete

---

## 👀 Israel Saw The Egyptians Dead Upon The Sea Shore

Israel does not simply hear a rumor about Egypt's defeat from a messenger.

They see the bodies themselves, washed up along the shore.

That direct sight removes any possible doubt about what actually happened.

Seeing the evidence firsthand makes the deliverance impossible to explain away later.

God gives His people undeniable proof, not just a comforting story.

👀 Israel sees the proof with their own eyes

🌊 Bodies wash up along the shore

🚫 This removes any possible doubt

📖 God gives proof, not just a story

---

## 😳 The People Feared The LORD, And Believed The LORD, And His Servant Moses

"Feared" here means deep reverence and awe, not simple terror.

Seeing God's power firsthand moves the people to real trust, at least for now.

Their belief covers both God directly and Moses as His chosen leader.

This moment stands as a genuine high point of faith for the whole nation.

Later chapters will show that trust wavering again and again in the wilderness.

This verse still captures something real and true about this one moment.

😳 Feared here means deep reverence and awe

🙏 Seeing God's power moved them to trust

🤝 Their belief covers God and Moses both

📖 This trust will waver again later
`.trim();

export const EXODUS_FOURTEEN_PERSONAL_SECTIONS = parseExodusFourteenRawNotes(EXODUS_FOURTEEN_RAW_NOTES);
