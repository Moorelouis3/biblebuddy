export type FirstSamuelSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelSixRawNotes(rawText: string): FirstSamuelSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 6:${startVerse}` : `1 Samuel 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Samuel 6 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_SIX_RAW_NOTES = `# FirstSamuel 6:1-3
# 🙏 Philistines Seek A Cure
---
## 🕰️ Seven Months

The ark had now sat among the Philistines for seven months.

Seven is a number the Bible often uses for something complete or finished.

That length of time shows how long the suffering was allowed to continue.

The Philistines are only now ready to act.

🕰️ Seven months of ongoing suffering

🔢 Seven often signals something complete

⏳ Relief was delayed, not instant

📖 Patience under judgment finally ran out

## 🔮 Called For The Priests And The Diviners

"Diviners" were people who claimed to predict the future using omens and rituals.

Israel's law strictly forbade this kind of practice.

For the Philistines, divination was a normal part of religious life.

They now turn to their own religious experts for an answer.

🔮 Diviners claimed to predict the future

🚫 Israel's law forbade this practice

🙏 A normal practice for the Philistines

📖 They seek answers their own way

## 📦 Tell Us Wherewith We Shall Send It To His Place

"His place" means the ark's rightful home among the people of Israel.

The Philistines no longer want to keep it or destroy it.

They only want to know the safest way to give it back.

Seven months of disaster taught them exactly what they were dealing with.

📦 His place means the ark's true home

🙅 They no longer want to keep it

🤝 They only want a safe return

📖 Disaster taught them who they faced

## 🎁 Send It Not Empty

Returning a sacred object empty handed counted as a real insult in this culture.

A gift needed to travel with it to make things right.

That custom explains why the priests do not just say send it back.

They are about to prescribe exactly what that gift should be.

🎁 Empty return was seen as disrespect

🤲 A gift needed to go with it

📜 Custom shaped the priests' plan

📖 Respect mattered even in defeat

## ⚖️ A Trespass Offering

A "trespass offering" was an Israelite sacrifice made to repay God for a specific wrong.

It was not a normal act of worship.

It was restitution for guilt.

The Philistines using this exact term shows how completely they now admit their fault.

⚖️ Trespass offering means restitution for guilt

🙅 Not a normal act of worship

🗣️ They borrow an Israelite legal term

📖 Their fault is now fully admitted

## 🩹 Then Ye Shall Be Healed

The priests connect the offering directly to relief from the emerods.

Chapter five already described that same suffering in detail.

Sending it back was never only about being polite.

Healing was the real goal behind every step of this plan.

🩹 Offering connects to healing from emerods

📜 Chapter five already showed the suffering

🙏 Not politeness but hope for relief

📖 Physical healing was the real goal

# FirstSamuel 6:4-6
# 🐭 The Priests Prescribe An Offering
---
## ❓ What Shall Be The Trespass Offering

The Philistines ask their own religious leaders for a specific answer.

They already agreed an offering was needed back in verse three.

Now they need to know exactly what that offering should look like.

The priests are about to give a very specific answer.

❓ They ask for a specific answer

✅ Verse three already settled the need

🎯 Now they need the exact plan

📖 A specific answer is coming next

## 🐭 Five Golden Emerods, And Five Golden Mice

The priests tell them to make small gold models of what afflicted them.

An "emerod" was a painful sore, already explained in chapter five.

Making an image of a problem and offering it to a god was common ancient practice.

The hope was that the model would carry the sickness away instead of the person.

🩹 Emerods were the painful sores

🐭 Mice show a second cause of ruin

🗿 Images offered the problem to a god

📖 A common ancient healing custom

## 👑 According To The Number Of The Lords

Five gold emerods and five gold mice matched the five Philistine lords exactly.

Chapter five already introduced the five major Philistine cities.

Making five of each object meant every city shared the blame together.

No single city could claim this was someone else's problem.

👑 Five items matched five Philistine lords

🏙️ Five cities already named in chapter five

🤝 Every city shared the same guilt

📖 No city could claim innocence

## 🙌 Give Glory Unto The God Of Israel

"Give glory" here does not mean the Philistines start worshiping Israel's God.

It means they are forced to admit He is real and powerful.

Their own experience over five months already proved that to them.

This is respect forced by fear, not a change of religion.

🙌 Give glory means forced acknowledgment

💪 They admit His power is real

😨 Fear taught them this lesson

📖 Respect here is not worship

## 🤞 Peradventure He Will Lighten His Hand

"Peradventure" is an old word meaning perhaps or maybe.

"Lighten" here means make less severe, not remove completely.

The priests are not promising the plan will work.

They are only offering their best guess at what might help.

🤞 Peradventure means perhaps or maybe

📉 Lighten means less severe, not gone

🎲 No guarantee is being promised

📖 This is their best guess

## 💔 Wherefore Then Do Ye Harden Your Hearts

The priests bring up a story from Israel's own history to make their point.

"Harden your hearts" means to stubbornly refuse to listen despite clear warnings.

They are warning their own people not to repeat someone else's mistake.

💔 Harden your hearts means stubborn refusal

🗣️ The priests use it as a warning

⚠️ They urge their people not to repeat it

📖 Old mistakes carry a lasting lesson

## 👑 As The Egyptians And Pharaoh

Pharaoh refused to release Israel even after repeated plagues struck Egypt.

That story from the book of Exodus was famous across the ancient world.

Even Philistine priests, generations later, still knew it well enough to reference it.

Their own crisis now looks like Pharaoh's, right down to the plagues.

👑 Pharaoh refused Israel again and again

📜 The Exodus story was widely known

🕰️ Remembered generations after it happened

📖 Their crisis now mirrors Pharaoh's own

## ✨ When He Had Wrought Wonderfully Among Them

"Wrought wonderfully" means performed incredible miracles that could not be explained away.

The plagues on Egypt eventually forced Pharaoh to let Israel go free.

The priests are quietly warning that resisting God rarely ends well.

Their own five months of suffering already proves the same point.

✨ Wrought wonderfully means incredible miracles

🇪🇬 Egypt was eventually forced to let go

⚠️ Resisting God rarely ends well

📖 Their own suffering proves the point

# FirstSamuel 6:7-9
# 🐄 A Test With Two Nursing Cows
---
## 🛒 Make A New Cart

The cart had to be brand new, never used for hauling or farm work before.

Nothing common or ordinary could carry something this holy.

That newness matters for the test about to happen.

If the cows still went the right way, no old habit could explain it.

🛒 The cart had to be brand new

🚫 No common or ordinary use before

🧪 This detail begins the test

📖 Nothing ordinary carries something holy

## 🐄 Two Milch Kine, On Which There Hath Come No Yoke

"Milch kine" means nursing mother cows, still feeding their own calves.

A "yoke" is the wooden frame used to train an animal to pull a cart.

These particular cows had never worn one or been trained to pull anything.

Untrained animals normally will not walk a straight line on command.

🐄 Milch kine means nursing mother cows

🪵 Yoke means the training harness

🚫 These cows had never worn one

📖 Untrained animals do not walk straight

## 👶 Bring Their Calves Home From Them

The nursing calves were taken away and shut up separately from their mothers.

A mother cow's strongest instinct is to return to her own calf.

Sending the mothers away from their babies made the test even harder to explain.

If the cows still walked away from home, only something beyond nature could explain it.

👶 Calves were separated from their mothers

🐄 Mother cows instinctively return to babies

🧪 Removing calves made the test harder

📖 Only something beyond nature explains it

## 🛐 Take The Ark Of The LORD, And Lay It Upon The Cart

God's own law had specific instructions for carrying the ark.

Levites were meant to carry it on poles.

That instruction has not been given yet in this part of the story.

The Philistines only know their own pagan methods for moving sacred objects.

This detail quietly sets up trouble that shows up later in Israel's history.

🛐 Levites, not carts, were meant to carry it

🚫 The Philistines do not know that law

⚠️ This choice causes trouble later on

📖 A pagan method carries a holy object

## 📦 The Jewels Of Gold... In A Coffer

A "coffer" was a small box or chest, not a large container.

The gold emerods and mice rode inside that box.

It sat right beside the ark itself.

Placing them together tied the gift directly to the cause of the suffering.

📦 Coffer means a small box or chest

🐭 The gold objects rode inside it

📍 It sat right beside the ark

📖 The gift stayed tied to its cause

## 🛣️ If It Goeth Up By The Way Of His Own Coast To Bethshemesh

"Bethshemesh" was the nearest Israelite town, home to priests from the tribe of Levi.

The test only works if the cows go there completely on their own.

Every natural instinct in these cows pointed the opposite direction, back toward their calves.

If they still went to Bethshemesh, the priests agreed it could only be God's hand.

🛣️ Bethshemesh was the nearest Israelite town

👨‍👦 Home to priests from the tribe of Levi

🧭 Every instinct pointed the other way

📖 Only God could explain that path

## 🎲 It Was A Chance That Happened To Us

"Chance" here means blind luck, with no real cause behind it.

The priests design a serious religious test.

Yet they still leave room to blame the whole plague on coincidence.

Their own hearts have not fully caught up to what their words already suggest.

🎲 Chance means blind luck, no real cause

🧪 They still design a real test

🤷 They leave room to doubt anyway

📖 Their hearts lag behind their words

# FirstSamuel 6:10-12
# 🛤️ The Cart Goes Straight To Israel
---
## ✅ The Men Did So

The Philistines follow through on the entire plan exactly as the priests described it.

Despite their own doubts from the verse before, they still obey completely.

Testing God rarely comes with full confidence attached.

Obedience here happens alongside real uncertainty.

✅ They follow the plan exactly

🤔 Doubt did not stop obedience

🧪 Testing rarely feels fully certain

📖 They obey despite their uncertainty

## 🔒 Shut Up Their Calves At Home

The calves are locked away where their mothers cannot reach them.

That single detail makes the coming journey even harder to explain naturally.

Every part of the setup is designed to remove any normal explanation.

🔒 Calves are locked away at home

🚫 This removes any easy explanation

🧪 Every detail strengthens the test

📖 Nothing ordinary could cause this

## 🐭 The Coffer With The Mice Of Gold And The Images Of Their Emerods

Both offerings from earlier in the chapter travel together in the same small box.

Nothing about the plan changes once the cart actually starts moving.

The priests' full instructions are carried out with no shortcuts taken.

🐭 Both gold objects travel together

📦 They ride in the same box

✅ No shortcuts were taken

📖 The full plan gets carried out

## 🐄 The Kine Took The Straight Way... Lowing As They Went

"Lowing" means mooing, the sound cows make when distressed or calling for their calves.

The cows cried out the whole way there.

Their instincts still pointed home, not forward.

Pain did not stop their obedience.

That combination is the whole point of this test.

🐄 Lowing means mooing in distress

😢 They cried the whole way there

🧭 Home pulled at them the whole time

📖 Pain did not silence their obedience

## ➡️ Turned Not Aside To The Right Hand Or To The Left

Nobody was driving or steering this cart in any direction.

A perfectly straight path with no driver has no normal explanation.

The cows were not wandering or grazing along the way either.

This detail alone answers the very question the priests set out to test.

➡️ No driver steered the cart

🎯 A straight path needs no explanation

🚫 The cows never wandered off course

📖 This detail answers the whole test

## 👑 The Lords Of The Philistines Went After Them

All five Philistine rulers personally follow the cart to see the outcome for themselves.

This was too important a question to leave to a messenger's report.

They needed to witness the proof firsthand before believing it.

👑 All five rulers follow personally

📩 Too important to trust to a report

👀 They needed to see it themselves

📖 Firsthand proof mattered more than words

# FirstSamuel 6:13-16
# 🌾 Bethshemesh Rejoices And Worships
---
## 🌾 Reaping Their Wheat Harvest In The Valley

Wheat harvest in ancient Israel happened in late spring, around early summer.

That detail places this whole story at a specific, ordinary time of year.

An everyday workday is about to be interrupted by something extraordinary.

🌾 Wheat harvest fell in late spring

📅 This marks a specific season

👨‍🌾 An ordinary workday is underway

📖 The extraordinary interrupts the everyday

## 😊 They Lifted Up Their Eyes, And Saw The Ark, And Rejoiced

The people of Bethshemesh react with pure joy at what they see.

Seven months of a captured, missing ark come to an end in this one moment.

Their reaction stands in sharp contrast to how the Philistines reacted to the same object.

😊 Bethshemesh reacts with pure joy

⏳ Seven months of absence finally end

🔄 A sharp contrast to Philistine fear

📖 The same ark, two very different reactions

## 🌾 The Field Of Joshua, A Bethshemite

This Joshua is an ordinary local farmer, not the famous leader from the book of Joshua.

Sharing a name does not mean sharing an identity.

The Bible often repeats common names across very different people.

🌾 This Joshua is a local farmer

🚫 Not the famous leader from Joshua's book

🔁 The Bible often repeats common names

📖 Same name, completely different person

## 🔥 They Clave The Wood Of The Cart, And Offered The Kine A Burnt Offering

The men break apart the cart itself to use as fuel for a sacrifice.

A "burnt offering" meant the entire animal was consumed completely on the altar.

Normally, nursing cows would never be used for a sacrifice like this.

Their overwhelming relief pushes them straight into worship, even outside the usual rules.

🔥 The cart becomes the sacrifice's fuel

🐄 Burnt offering means fully consumed

⚠️ These cows broke normal sacrifice rules

📖 Relief pushed them straight into worship

## 👨‍👦 The Levites Took Down The Ark

Bethshemesh was one of the towns set aside for the tribe of Levi.

Levites were the only people authorized to handle the ark directly.

For the first time in this whole story, the correct people finally carry it.

👨‍👦 Bethshemesh was a Levite town

✅ Levites alone could handle the ark

🔄 The correct method is finally used

📖 Order returns after months of chaos

## 🙏 Offered Burnt Offerings And Sacrificed Sacrifices

Two different kinds of offerings happen together in this one moment.

A burnt offering showed total devotion, with nothing held back.

Other sacrifices were often shared and eaten together as a community meal.

Worship and celebration happen side by side here.

🙏 Two different offerings happen together

🔥 Burnt offerings showed total devotion

🍽️ Other sacrifices were often shared meals

📖 Worship and celebration mixed together

## 🏃 The Five Lords... Returned To Ekron The Same Day

The Philistine rulers watch the proof happen right in front of them.

They do not stay to worship or to say anything more.

They simply turn around and go home the same day.

Confirming the miracle was enough for them without changing anything else.

🏃 The lords leave the same day

👀 They witness the full proof

🚫 No worship, no further response

📖 Confirming truth did not require change

# FirstSamuel 6:17-18
# 🗿 The Full Tally Of Guilt
---
## 🏙️ Ashdod, Gaza, Askelon, Gath, Ekron

These five cities formed the heart of Philistine territory.

Chapter five only followed the ark through three of them, Ashdod, Gath, and Ekron.

Here, all five cities are named together for the first time.

Every ruler now shares the same public responsibility.

🏙️ Five cities formed Philistine territory

📜 Chapter five named only three of them

🤝 All five now stand together

📖 Shared guilt, publicly recorded

## 🧱 Fenced Cities, And... Country Villages

"Fenced cities" means towns protected by walls.

"Country villages" means the smaller, unwalled settlements around them.

The gold mice covered every kind of place, not just the five main capitals.

The suffering had reached ordinary people everywhere, not only the powerful.

🧱 Fenced cities means walled towns

🌾 Country villages means unwalled settlements

🗺️ The offering covered every place

📖 Suffering reached everyone, not just leaders

## 🪨 The Great Stone Of Abel

Many scholars believe an early copying difference affected this name.

Some ancient manuscripts simply read "the great stone" without the added word.

Either way, the stone served as a lasting, physical landmark.

It gave later readers a real place to point to.

🪨 A large stone served as a landmark

📜 Some manuscripts read it slightly differently

📍 A real place readers could visit

📖 History anchored in a physical marker

## 📆 Which Stone Remaineth Unto This Day

This phrase tells the original readers the stone was still standing when this book was written.

That was long after the actual event took place.

Ancient writers often used details like this to show a story really happened.

It was an invitation to go check, not just take their word for it.

📆 The stone stood long after the event

✅ A way to prove the story was real

🧭 Readers could go check it themselves

📖 History invited verification, not blind trust

# FirstSamuel 6:19-21
# 😱 The Cost Of Looking Into The Ark
---
## 👁️ He Smote The Men Of Bethshemesh, Because They Had Looked Into The Ark

God's own law forbade anyone but specific priests from looking directly at the uncovered ark.

The ark represented God's own holy presence, not just a valuable object.

Even genuine joy and worship did not excuse crossing that line.

Curiosity in the wrong place carried a real and serious cost.

👁️ Looking into the ark broke God's law

🛐 The ark represented His holy presence

⚠️ Even genuine worship did not excuse it

📖 Curiosity carried a real cost

## 🔢 Fifty Thousand And Threescore And Ten Men

"Threescore and ten" is an old way of saying seventy.

Many scholars believe an early copying difference affected this specific number.

Some ancient manuscripts and versions record only seventy men, without the much larger figure.

Bethshemesh was a small town, which makes the smaller number easier to picture.

🔢 Threescore and ten means seventy

📜 Manuscripts differ on the larger number

🏘️ Bethshemesh was a small town

📖 Honest scholarship weighs both readings

## 😢 The People Lamented

"Lamented" means they mourned with real, visible grief.

Grief here is not the same thing as repentance.

They are sad about the loss of life, not yet examining their own actions.

The next verse shows that deeper realization starting to form.

😢 Lamented means visible, real mourning

🚫 Grief is not the same as repentance

🤔 Their own actions go unexamined

📖 A deeper realization comes next

## ❓ Who Is Able To Stand Before This Holy LORD God

This question is not about strength.

It is about holiness, a purity so complete that sin cannot survive near it.

Bethshemesh finally understands what the Philistines already admitted back in chapter five.

Even God's own covenant people are not automatically safe from that holiness.

❓ The question is about holiness, not strength

✨ Holiness means a purity sin cannot survive

🔁 Israel now echoes the Philistines' own fear

📖 Covenant never removed the need for reverence

## 🚪 To Whom Shall He Go Up From Us

The men of Bethshemesh want the ark moved somewhere else entirely.

That reaction matches the exact pattern already seen across the Philistine cities.

Fear of holiness can affect anyone standing too close to it.

The same ark now needs a new resting place again.

🚪 Bethshemesh wants the ark relocated

🔁 This matches the Philistine pattern exactly

😨 Fear of holiness touches anyone nearby

📖 The ark needs a new resting place

## 🏘️ Kirjathjearim

"Kirjathjearim" means city of forests, a town sitting up in the hill country.

It becomes the ark's next stop after leaving Bethshemesh.

The ark will actually stay there for years, well into the next chapter.

🏘️ Kirjathjearim means city of forests

⛰️ Located up in the hill country

🏠 The ark's very next resting place

📖 It stays there for years to come

## ⬆️ Come Ye Down, And Fetch It Up To You

"Down" and "up" here describe elevation, not compass direction.

Bethshemesh sat lower in the land than Kirjathjearim did.

Directional language like this shows up often throughout the Bible.

It is worth noticing every time it appears.

⬆️ Down and up describe elevation here

⛰️ Kirjathjearim sat higher than Bethshemesh

🧭 Not compass direction, but land height

📖 A pattern worth noticing throughout scripture
`.trim();

export const FIRST_SAMUEL_SIX_PERSONAL_SECTIONS = parseFirstSamuelSixRawNotes(FIRST_SAMUEL_SIX_RAW_NOTES);
