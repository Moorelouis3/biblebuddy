export type ExodusTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwelveRawNotes(rawText: string): ExodusTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 12:${startVerse}` : `Exodus 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Exodus 12 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWELVE_RAW_NOTES = `# Exodus 12:1-6
# 🗓️ A New Calendar And A Chosen Lamb
---
## 🗓️ This Month Shall Be Unto You The Beginning Of Months

God resets Israel's calendar starting here.

This month becomes the first month of their whole year.

Later this month gets a name, Abib, and still later it is called Nisan.

Egypt no longer sets the rhythm of Israel's time.

The exodus itself becomes the new starting point for every year that follows.

🗓️ This month becomes month one
📛 Later called Abib, then Nisan
🚫 Egypt no longer sets their calendar
📖 The exodus becomes Israel's new starting point

## 🐑 A Lamb For An House

Each household selects and sets apart one lamb.

The date is fixed, the tenth day of this new first month.

This decision happens before anyone knows what will happen four days later.

Israel is asked to trust and act before the full plan is explained.

🐑 One lamb belongs to each house
📆 Chosen on the tenth day
❓ The full plan is not known yet
📖 Trust comes before understanding here

## 👥 According To The Number Of The Souls

"Souls" here simply means people.

A family too small to eat a whole lamb joins with the nearest household.

The number of people eating decides how much lamb is needed.

Nothing about this meal was designed to be wasted or left uneaten.

👥 Souls means people, not spirits
🏠 Small families joined a neighbor
🍽️ The portion matched the eaters
📖 Nothing here was meant to go to waste

## ✅ Without Blemish, A Male Of The First Year

"Without blemish" means the animal must be completely flawless.

No disease, no injury, and no visible defect were allowed.

A male in its first year was still young and in its prime condition.

God receives the best available animal, never the leftover or the damaged one.

✅ Without blemish means flawless
🐑 A young male, first year
🚫 No disease or injury allowed
📖 God receives the best, not the leftover

## 📆 Kill It In The Evening

The lamb is chosen on day ten but not killed until day fourteen.

That gap gives four full days to watch the animal closely.

A flaw missed at first glance would show up given enough time.

The whole assembly kills their lambs together, in the evening, on the same day.

📆 Four days between choosing and killing
👀 Time reveals any hidden flaw
🌇 All Israel kills lambs the same evening
📖 One nation moves together on this night

# Exodus 12:7-11
# 🩸 Blood, Bread, And A Meal Eaten Standing
---
## 🚪 The Two Side Posts And The Upper Door Post

The blood goes on the door frame itself, not inside the house.

"Side posts" are the two upright beams framing the doorway.

The "upper door post" is the beam above them, later called the lintel.

Together they mark the whole entrance with visible protection.

🚪 Blood marks the door frame
📏 Side posts are the two uprights
🔝 Upper door post is the beam above
📖 The whole entrance is marked

## 🍞 Roast With Fire, And Unleavened Bread, And With Bitter Herbs

"Unleavened bread" means bread made without yeast, so it never rises.

There was no time that night to wait for dough to rise.

"Bitter herbs" gave the meal a harsh, unpleasant taste on purpose.

That bitterness recalled the years Israel spent as slaves in Egypt.

🍞 Unleavened bread has no yeast
⏳ No time was left for rising
🌿 Bitter herbs recall slavery's bitterness
📖 The meal itself told the story

## 🔥 Nor Sodden At All With Water, But Roast With Fire

"Sodden" is an old word for boiled.

Only roasting over fire was allowed, not boiling in water.

Roasting kept the animal whole and visible from head to leg.

That wholeness matched the completeness required through the entire meal.

🔥 Sodden means boiled
🚫 Boiling was not allowed here
👁️ Roasting kept the animal whole
📖 Wholeness mattered through the whole meal

## 🔥 Ye Shall Let Nothing Of It Remain Until The Morning

Whatever meat was left over had to be burned before morning came.

Nothing sacred about this meal could be treated as an ordinary leftover.

There was also no time for leftovers, since Israel would leave that same night.

The instruction matches the urgency running through the rest of this chapter.

🔥 Leftovers had to be burned
🚫 Nothing treated as ordinary food
⏳ No time remained for leftovers anyway
📖 Urgency shaped every detail of this night

## 🥾 Your Loins Girded, Your Shoes On Your Feet

"Girded" means clothing tucked up and secured for fast movement.

Israel eats this meal fully dressed, sandals on, ready to walk out the door.

Nobody eats this meal relaxed at a leisurely table.

The posture itself says this family expects to leave within hours.

🥾 Girded means clothes secured for travel
👣 Shoes stay on through the meal
🏃 The posture signals sudden departure
📖 Readiness itself becomes part of worship

## 🩸 It Is The LORD's Passover

This is the first time the word "passover" appears in the Bible.

The name describes exactly what is about to happen, the LORD passing over marked homes.

Every earlier detail in this chapter, the lamb, the blood, the haste, builds toward this one name.

The meal and the name explain each other.

📛 Passover appears here for the first time
🩸 The name describes God passing over homes
🐑 Every earlier detail builds toward it
📖 The meal and the name explain each other

# Exodus 12:12-14
# 💀 Judgment Announced, A Feast Promised
---
## ⚡ Against All The Gods Of Egypt I Will Execute Judgment

This plague is not aimed at Pharaoh alone.

Egypt worshiped many gods, often tied to the Nile, the sun, and Pharaoh himself.

This judgment strikes at that entire system all at once.

The LORD proves He outranks every god Egypt trusted.

⚡ This plague targets Egypt's whole religion
🌞 Egypt worshiped gods tied to sun and Nile
👑 Even Pharaoh was treated as divine
📖 The LORD outranks every god of Egypt

## 🩸 When I See The Blood, I Will Pass Over You

The blood works as a "token," a visible sign marking a protected house.

God does not need reminding, the sign is for Israel's own assurance.

Judgment moves through the land, but marked houses are spared entirely.

Protection here depends on the blood, not on anything the family has earned.

🩸 The blood is a visible token
🛡️ Marked houses are fully spared
🚫 Protection is not earned by merit
📖 The sign, not the family, saves the house

## 📖 Ye Shall Keep It A Feast By An Ordinance For Ever

An "ordinance" is a binding, official command, not a suggestion.

This night becomes a permanent yearly feast, not a single event.

Every future generation of Israel is meant to keep this same feast.

One night of deliverance turns into a lasting national memory.

🕯️ Ordinance means a binding command
🗓️ This becomes a yearly feast
👪 Every future generation keeps it
📖 One night becomes lasting memory

# Exodus 12:15-20
# 🍞 Seven Days Without Leaven
---
## 🍞 Seven Days Shall Ye Eat Unleavened Bread

"Leaven" is yeast, or anything that makes dough rise.

For seven full days, all leaven must be removed from every house.

This connects directly to the hurried, unrisen bread eaten while fleeing Egypt.

A whole week keeps that hurried night in Israel's memory every year.

🍞 Leaven means yeast or any riser
🏠 All leaven leaves the house
⏳ It recalls the night of hurried flight
📖 A week keeps that memory alive yearly

## 🚫 That Soul Shall Be Cut Off From Israel

"Cut off" describes complete separation from Israel's covenant community.

Anyone who eats leavened bread during these seven days faces this penalty.

The severity of this penalty shows the command was never meant as optional.

Belonging to Israel here is tied to obedience, not just birth.

🚫 Cut off means complete separation
🍞 The penalty targets eating leaven
⚖️ This was never treated as optional
📖 Belonging required obedience, not just birth

## 🛐 An Holy Convocation, No Manner Of Work Shall Be Done

A "holy convocation" is an official, sacred gathering of the whole community.

Both the first and the seventh day of the feast carry this status.

Ordinary work stops on these two days, much like a modern holiday.

Only preparing food is allowed as a specific exception.

🛐 Convocation means an official sacred gathering
📅 The first and seventh days both count
🍽️ Food preparation is the one exception
📖 Ordinary work stops on these two days

## 📅 In This Selfsame Day Have I Brought Your Armies Out

"Selfsame day" ties this feast to the exact date of the exodus itself.

"Armies" here does not mean soldiers, it describes Israel organized like a marching nation.

The feast is not just symbolic, it is anchored to a real calendar date.

Keeping the feast means remembering a specific day, not a vague idea.

📅 Selfsame day means this exact date
🪖 Armies describes an organized, marching nation
📌 The feast is anchored to a real date
📖 Remembering here means remembering precisely

## 🌍 Whether He Be A Stranger, Or Born In The Land

This law applies equally to any foreigner living among Israel.

A "stranger" here means someone dwelling among Israel, not a visitor passing through.

The same rule and the same penalty apply no matter someone's birth.

God's commands were never limited only to those born into the nation.

🌍 The law applies to strangers too
🏘️ Stranger here means someone living among Israel
⚖️ Birth origin changes nothing here
📖 God's law was never limited by birth

# Exodus 12:21-24
# 🌿 Moses Instructs The Elders
---
## 👴 Draw Out And Take You A Lamb According To Your Families

Moses now passes God's instructions from the start of this chapter down to the people.

"Elders" were the recognized leaders representing each family and tribe.

Each family unit takes responsibility for its own lamb.

Leadership here means passing God's word on accurately, not adding to it.

👴 Elders led each family and tribe
🐑 Each family took its own lamb
🗣️ Moses passed God's word accurately
📖 Leadership means faithful transmission, not invention

## 🌿 Take A Bunch Of Hyssop, And Dip It In The Blood

"Hyssop" was a small, leafy plant common throughout the region.

Its cluster of stems made it useful for sprinkling liquid.

The "bason" held the collected blood so the hyssop could be dipped in it.

This ordinary garden plant becomes the tool that applies the lamb's blood.

🌿 Hyssop was a small leafy plant
💧 Its stems worked well for sprinkling
🥣 The bason held the collected blood
📖 An ordinary plant applies the blood

## 🚪 None Of You Shall Go Out At The Door Of His House

Israel must stay completely inside once the blood is applied.

Nobody is told to stand guard or fight off danger themselves.

Safety depends entirely on staying behind the marked door.

Trusting the blood meant trusting it enough to do nothing else.

🚪 Everyone stays inside that night
🛡️ No one is told to defend the house
🩸 Safety depends only on the blood
📖 Trust here meant staying still

## 👹 Will Not Suffer The Destroyer To Come In

"Suffer" here is an old word meaning allow or permit.

"The destroyer" describes the agent carrying out this final plague.

God actively blocks the destroyer from entering any blood marked home.

Protection here is active, not simply the absence of danger.

🚫 Suffer means allow or permit
👹 The destroyer carries out the plague
🩸 Blood marked homes are blocked from harm
📖 Protection here is active, not passive

## 📖 An Ordinance To Thee And To Thy Sons For Ever

This instruction repeats the word "ordinance" already explained back in verse fourteen.

The command now extends explicitly to future sons, meaning future generations.

A single historical night becomes a command handed down family by family.

Every generation inherits the same responsibility to remember and obey.

📖 Ordinance repeats the promise from verse fourteen
👨‍👦 Sons here means future generations
🔁 One night becomes a lasting family command
➡️ Every generation inherits this responsibility

# Exodus 12:25-28
# 👨‍👧 Teaching The Next Generation
---
## 🗺️ When Ye Be Come To The Land Which The LORD Will Give You

This command looks forward to a land Israel has not even reached yet.

"This service" refers to the whole Passover ritual just described.

God expects obedience to continue long after Egypt is far behind them.

A command born in slavery is meant to outlast the escape itself.

🗺️ This looks ahead to the promised land
🐑 Service means the whole Passover ritual
⏳ Obedience is meant to outlast Egypt
📖 A slavery era command outlives slavery

## ❓ What Mean Ye By This Service?

God builds a question directly into the command itself.

He expects children to notice this yearly ritual and ask about it.

That question becomes the doorway for parents to retell the whole story.

The feast was designed to teach, not just to be performed.

❓ Children are expected to ask
👪 Parents answer with the whole story
🗓️ This repeats every single year
📖 The feast was built to teach

## 🙇 It Is The Sacrifice Of The LORD's Passover

Parents answer with the specific name and the specific reason behind it.

The explanation names exactly what happened, God passing over Israel's houses in judgment.

Before anything in this plan has even happened yet, the people respond in worship.

Trusting God's plan in advance, not just after seeing results, is worship too.

🗣️ Parents explain the exact reason
🩸 God passed over Israel's houses
🙇 Israel worships before the events happen
📖 Trusting in advance is real worship

## ✅ The Children Of Israel Went Away, And Did As The LORD Had Commanded

Obedience here is immediate, with no recorded delay or objection.

Every instruction given through Moses and Aaron gets carried out exactly.

This obedience stands in real contrast to Israel's later complaints in the wilderness.

A nation that starts in full obedience will not always stay that way.

✅ Obedience here is immediate
🗣️ Every instruction is carried out exactly
⚖️ This contrasts later wilderness complaints
📖 Early obedience does not guarantee lasting obedience

# Exodus 12:29-30
# 🌙 Midnight Strikes
---
## 🌙 At Midnight The LORD Smote All The Firstborn

This plague reaches every level of Egyptian society at the same hour.

Pharaoh's own household is struck exactly like a prisoner's household in the dungeon.

Wealth and power offer no protection at all from this judgment.

The warning given back in chapter eleven arrives exactly as spoken.

🌙 Midnight strikes every household at once
👑 Pharaoh's house is not spared
🔒 A prisoner's house is struck the same
📖 The chapter eleven warning arrives exactly as spoken

## 😭 There Was Not A House Where There Was Not One Dead

This describes total, universal loss across the entire land of Egypt.

No family, rich or poor, escapes this single devastating night.

The great cry mentioned here is the sound of a whole nation grieving at once.

Only houses marked with the lamb's blood were exempt from this loss.

😭 Loss reaches literally every house
👑 Rich and poor both suffer it
🩸 Only blood marked homes are spared
📖 A whole nation cries out together

# Exodus 12:31-36
# 🚪 Pharaoh Finally Lets Israel Go
---
## 🌙 He Called For Moses And Aaron By Night

Pharaoh summons Moses and Aaron in the middle of the night, not the next morning.

That timing alone shows real, immediate urgency after this devastating loss.

The man who once refused to even meet with Moses now sends for him directly.

Grief accomplishes what nine earlier plagues could not.

🌙 Pharaoh summons them at night
⏳ The urgency is immediate
👑 He now seeks Moses out directly
📖 Grief succeeds where plagues alone had not

## 🙏 Bless Me Also

Pharaoh, after everything, asks Moses for a blessing.

This is the same ruler who once mocked the LORD by name back in chapter five.

Total devastation has replaced his earlier defiance with sudden, desperate humility.

Even the hardest heart in this story ends up asking for grace.

🙏 Pharaoh asks for a blessing
😤 He once mocked the LORD entirely
💔 Devastation replaces his defiance
📖 Even Pharaoh ends up asking for grace

## 😨 The Egyptians Were Urgent Upon The People

Ordinary Egyptian citizens now push Israel to leave as fast as possible.

Their fear is that any further delay could bring even more disaster on Egypt.

This completely reverses the resistance to Israel's departure seen throughout the earlier plagues.

Fear succeeds in accomplishing what Pharaoh's own stubbornness could not stop.

😨 Egyptians now fear more disaster
🏃 They push Israel to leave fast
🔁 This reverses their earlier resistance
📖 Fear moves what stubbornness could not

## 🍞 Their Kneadingtroughs Being Bound Up In Their Clothes

A "kneadingtrough" is the container used for mixing bread dough.

Israel leaves so quickly that dough goes with them still unfinished, wrapped in cloth.

They carry these troughs on their own shoulders, ready to move immediately.

Even this small household detail confirms just how sudden this departure really was.

🍞 A kneadingtrough mixes bread dough
👕 Dough traveled wrapped in cloth
🎒 Troughs were carried on their shoulders
📖 Even small details confirm the sudden exit

## 💰 Jewels Of Silver, And Jewels Of Gold

This fulfills a specific promise God made back in chapters three and eleven.

Israel does not steal this wealth, the Egyptians hand it over willingly.

"Spoiled" here means Israel left with real riches, not empty handed after years of slavery.

A promise spoken years earlier lands exactly the way God said it would.

📜 Fulfills a promise from chapters three and eleven
🤲 Egyptians gave these gifts willingly
💰 Spoiled means Israel left with real wealth
📖 A years old promise lands exactly as spoken

# Exodus 12:37-39
# 🚶 The Journey Begins
---
## 🔢 About Six Hundred Thousand On Foot That Were Men

This number counts only adult men, not the whole population.

Once wives and children are added, the true total was likely well over two million people.

"Rameses" and "Succoth" mark the starting point and the first stop of this journey.

An entire nation moves out of Egypt at the same time.

🔢 Six hundred thousand counts only men
👨‍👩‍👧‍👦 The full total was likely over two million
🗺️ Rameses to Succoth marks the first leg
📖 A whole nation moves together at once

## 🌍 A Mixed Multitude Went Up Also With Them

Not everyone who left Egypt that night was ethnically Israelite.

Some Egyptians and other outsiders joined this journey toward freedom too.

God's rescue that night reached beyond the twelve tribes alone.

Mercy shown to Israel spilled over onto anyone willing to leave with them.

🌍 Not everyone leaving was Israelite
🤝 Others joined the journey too
🕊️ Rescue reached beyond the twelve tribes
📖 Mercy spilled beyond Israel alone

## ⏳ They Could Not Tarry

"Tarry" means to wait or delay.

There was no time left to let the bread dough rise before leaving.

This detail explains a very practical reason behind the ongoing yearly tradition.

A rushed departure becomes a permanent yearly reminder of that same rush.

⏳ Tarry means wait or delay
🍞 No time remained for the bread to rise
📖 A practical detail became a lasting tradition
➡️ The rush itself is remembered every year

# Exodus 12:40-42
# ⏳ Four Hundred And Thirty Years
---
## 🏕️ The Sojourning Of The Children Of Israel

"Sojourning" means living somewhere as a temporary resident, not a permanent citizen.

This number counts the whole span connected to Egypt, starting with Abraham's own promise.

It includes both the peaceful years and the later generations spent enslaved.

This exact number fulfills the timeline God gave Abraham back in Genesis fifteen.

🏕️ Sojourning means living as a temporary resident
📆 Four hundred thirty years total
📜 It fulfills Abraham's timeline from Genesis fifteen
📖 A generations old promise lands on time

## 🪖 All The Hosts Of The LORD Went Out

"Hosts" describes Israel as an organized company, almost like an army in formation.

The exact day matters as much as the number of years itself.

Nothing about this departure happens vaguely or by rough guess.

God keeps precise track of promises across four centuries.

🪖 Hosts describes Israel as an organized company
📅 The exact day is named specifically
🎯 Nothing here happens by rough guess
📖 God tracks His promises with precision

## 🌙 A Night To Be Much Observed Unto The LORD

This specific night receives its own lasting, sacred significance.

It stands next to the broader Passover feast described earlier in the chapter.

Every future generation of Israel is meant to remember and honor this exact night.

One night of deliverance becomes a permanent fixture on Israel's calendar.

🌙 This night gets its own significance
🗓️ It stands alongside the Passover feast
👪 Future generations honor it too
📖 One night becomes permanent on the calendar

# Exodus 12:43-51
# 📜 Who May Keep The Passover
---
## 🚫 There Shall No Stranger Eat Thereof

A "stranger" here means someone with no covenant commitment to Israel's God.

This is not a rule about ethnicity or nationality by itself.

Participation in Passover was always tied to genuine belonging, not ancestry alone.

The next few verses explain exactly how an outsider could actually join in.

🚫 Stranger means no covenant commitment
🌍 This is not about ethnicity alone
🤝 Belonging mattered more than ancestry
📖 The next verses explain how to join

## ✂️ When Thou Hast Circumcised Him, Then Shall He Eat Thereof

A servant purchased for money could still fully join this meal.

Circumcision, first given to Abraham in Genesis seventeen, was the sign of joining the covenant.

Once circumcised, that servant was treated as a true participant, not an outsider.

Real inclusion was always available to anyone willing to join the covenant fully.

💰 A purchased servant could still join
✂️ Circumcision was the covenant sign from Genesis seventeen
🤝 A circumcised servant became a true participant
📖 Inclusion was open to anyone willing to join

## ⏳ A Foreigner And An Hired Servant Shall Not Eat Thereof

This verse draws a clear line between two different kinds of outsiders.

A "hired servant" worked temporarily and could leave at any time.

Someone only passing through never joined the covenant the way a circumcised servant did.

Lasting commitment, not simple proximity, decided who could share this meal.

⏳ A hired servant worked temporarily
🚶 Passing through was not the same as joining
✂️ Commitment, shown through circumcision, made the difference
📖 Belonging required commitment, not just proximity

## 🦴 Neither Shall Ye Break A Bone Thereof

This instruction required keeping the lamb's body whole and intact.

Eating happened inside one house, with nothing carried outside to share elsewhere.

New Testament writers later connect this same detail directly to Jesus at His crucifixion.

His bones stayed unbroken during the crucifixion, matching this ancient instruction exactly.

🦴 The lamb's body stayed whole
🏠 The meal stayed inside one house
✝️ New Testament writers connect this to Jesus
📖 His unbroken bones matched this ancient rule

## 🌍 Let All His Males Be Circumcised

Any foreign stranger could fully join Israel's Passover under this specific condition.

Every male in that household had to be circumcised first, not just the head of the family.

Once circumcised, that household was treated exactly like one born in the land.

The door to full belonging was genuinely open, not just symbolically offered.

🌍 A foreign stranger could fully join
👨‍👦 Every male in the house was included
🤝 Circumcision meant equal standing
📖 The door to belonging was genuinely open

## ⚖️ One Law Shall Be To Him That Is Homeborn

Once someone joined the covenant, one single law applied to everyone equally.

"Homeborn" means someone born into Israel by birth.

No second class status remained for a stranger who had genuinely joined.

Equal law for every covenant member was written into Passover from the very start.

⚖️ One law applied to everyone
🏠 Homeborn means born into Israel
🚫 No second class status remained
📖 Equal law was built in from the start

## 📜 The LORD Did Bring The Children Of Israel Out By Their Armies

This final line confirms exactly what four hundred thirty years of promise finally accomplished.

"By their armies" again describes Israel leaving as one organized, unified nation.

One devastating night of judgment and one obedient meal changed Israel's entire future.

The chapter that began with a new calendar ends with a new, free nation.

📜 This closes centuries of promise
🪖 Armies means one organized nation
🌙 One night changed everything
📖 A new calendar ends in a new nation
`.trim();

export const EXODUS_TWELVE_PERSONAL_SECTIONS = parseExodusTwelveRawNotes(EXODUS_TWELVE_RAW_NOTES);
