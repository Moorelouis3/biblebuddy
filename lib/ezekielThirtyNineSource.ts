export type EzekielThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyNineRawNotes(rawText: string): EzekielThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 39:${startVerse}` : `Ezekiel 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 39 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_NINE_RAW_NOTES = `# Ezekiel 39:1-5
# ⚔️ Gog Falls On The Mountains
---
## 📢 Prophesy Against Gog

This is not a brand new message against Gog.

Chapter thirty eight already announced this same judgment once.

Ezekiel repeats the warning here to drive the point home a second time.

Repetition in prophecy is rarely filler.

It usually means the message is too important to risk the reader missing it.

📢 This repeats chapter thirty eight's warning

📣 Ezekiel drives the point home twice

⚠️ Repetition signals real importance

📖 God rarely wastes words in prophecy

## 👑 The Chief Prince Of Meshech And Tubal

Gog already carried this same title back in chapter thirty eight.

Meshech and Tubal were real nations in ancient Asia Minor.

Naming the title again before this second judgment speech is not an accident.

The highest ranking man in that whole coalition still cannot escape this.

👑 Chief prince repeats Gog's rank

🗺️ Meshech and Tubal sat in Asia Minor

🔁 The title appears again on purpose

📖 Rank offers Gog no protection

## 🔢 Leave But The Sixth Part Of Thee

"Sixth part" is a precise fraction, not a rough guess.

Five out of every six in Gog's army will not survive this.

Ancient war reports often used round numbers like half or most.

Naming one exact fraction instead makes this defeat feel measured, not exaggerated.

🔢 Sixth part means a precise fraction

💀 Five of six do not survive this

📏 Exact numbers feel measured, not exaggerated

📖 Only a small remnant walks away

## 🏔️ Bring Thee Upon The Mountains Of Israel

Gog started this invasion marching in from the far north.

That whole journey ends on one specific stage, the mountains of Israel.

This is the same location promised back in chapter thirty eight.

God is not improvising a location mid battle.

The ending place was fixed before the march even began.

🧭 The march began far in the north

🏔️ It ends on Israel's own mountains

📜 This matches chapter thirty eight's promise

📖 The battlefield was fixed in advance

## 🏹 Smite Thy Bow Out Of Thy Left Hand

"Smite" means to strike hard and suddenly.

God is the one knocking the weapon loose, not an enemy soldier.

The next line adds the arrows falling from Gog's right hand too.

Losing a weapon from each hand pictures a warrior stripped of all defense at once.

💥 Smite means a sudden hard strike

🏹 God knocks the bow loose himself

🤲 Both hands lose their weapons together

📖 Total disarmament, not a lucky hit

## 🦅 To Be Devoured

Leaving a body unburied for scavenging animals was considered a severe disgrace.

This same threat shows up throughout the Old Testament as a covenant curse.

A soldier expected a burial, even in defeat.

Gog's army will not even get that much dignity.

🦅 Ravenous birds means scavenging animals

💀 Unburied bodies were a real disgrace

📜 This curse appears elsewhere in the Old Testament

📖 Even defeat usually included burial

## 🏞️ Thou Shalt Fall Upon The Open Field

"Open field" is the opposite of a fortified city or a mountain stronghold.

There is no shelter here, nowhere to retreat to.

This detail matches the exposed, scavenged ending just described.

The defeat is as public and unprotected as it is total.

🏞️ Open field means no shelter nearby

🚫 There is nowhere left to retreat

👀 The defeat happens out in the open

➡️ Nothing about this ending stays hidden

## 🗣️ For I Have Spoken It

This short phrase closes out the whole first part of the chapter.

God is not predicting a mere possibility here.

A word spoken by God in prophecy functions like a settled fact.

The outcome was never really in doubt once God said it.

🗣️ God is not guessing or predicting

✅ His spoken word functions as settled fact

🔒 The outcome was never actually in doubt

📖 What God speaks, God accomplishes

# Ezekiel 39:6-10
# 🔥 Fire On Magog
---
## 🔥 I Will Send A Fire On Magog

Magog is the wider homeland behind Gog's entire coalition.

Fire here pictures sudden, consuming judgment, not a literal campfire.

The judgment reaches past the battlefield into Gog's own territory.

Nobody connected to this invasion stays untouched.

🔥 Fire pictures sudden consuming judgment

🗺️ Magog is Gog's wider homeland

🎯 Judgment reaches past the battlefield itself

📖 No one connected to this stays untouched

## 🏝️ Them That Dwell Carelessly In The Isles

"Carelessly" here means living without fear, feeling completely safe.

"Isles" was a broad Old Testament term for distant coastal lands.

These people were never part of Gog's army.

Their false sense of safety gets shaken by this judgment anyway.

😌 Carelessly means feeling completely safe

🏝️ Isles meant distant coastal lands

🚫 These people never joined the invasion

➡️ Even distant comfort gets shaken here

## 🧼 I Will Not Let Them Pollute My Holy Name Any More

"Pollute" means to treat something sacred as common or dirty.

Israel's exile had made watching nations doubt God's power and character.

That doubt is treated here like dirt on God's own reputation.

This judgment is partly about cleaning that reputation, not only punishing Gog.

🧼 Pollute means treating something sacred as common

🌍 Exile made nations doubt God's character

💭 That doubt looks like dirt on God's name

📖 This judgment cleans a reputation, not just punishes

## ✨ The Holy One In Israel

"Holy" means set apart, completely different from anything ordinary.

The heathen nations watching this will learn God by this title specifically.

They will not just hear a name, they will see a character proven.

Watching Gog fall becomes the nations' lesson in who God actually is.

✨ Holy means set apart from the ordinary

👀 Watching nations learn this title directly

🎯 They see character proven, not just a name

📖 Gog's fall teaches the nations who God is

## ⏳ Behold, It Is Come, And It Is Done

Two different tenses sit side by side here on purpose.

"It is come" sounds like the event just arrived.

"It is done" sounds like it already finished.

Prophetic certainty can describe a future event as if it already happened.

⏳ Come and done sit side by side

🔮 Come sounds like the event just arrived

✅ Done sounds like it already finished

📖 Prophecy can speak the future as settled fact

## 🪵 Burn Them With Fire Seven Years

Israel's soldiers will not need to chop wood for fuel for seven years.

Gog's own army supplies the firewood through its leftover weapons instead.

Shields, bows, spears, and handstaves all become nothing but fuel.

The defeated army's equipment ends up serving the very people it attacked.

🔥 Weapons become fuel instead of wood

🛡️ Shields, bows, and spears all burn

📆 Seven years of fuel from one defeat

📖 The attacker's own gear serves the defender

## 🔄 They Shall Spoil Those That Spoiled Them, And Rob Those That Robbed Them

Gog came specifically to plunder Israel, back in chapter thirty eight.

That exact plan reverses completely here.

Israel ends up taking from the very army that came to take from them.

The raid Gog planned becomes the raid Israel benefits from instead.

🔄 Gog's own plan reverses completely

💰 Israel takes from the would be takers

🎯 The planned raid benefits the defender instead

📖 What Gog intended for Israel returns on him

# Ezekiel 39:11-16
# ⚰️ The Valley Of Hamongog
---
## ⚰️ A Place There Of Graves In Israel

God promises Gog something an invader never expects, a burial plot.

Burial here is not an honor, it is proof the invasion is truly over.

A grave means a body stays in one place, not scattered across a battlefield.

Even this detail is decided in advance, not left to chance.

⚰️ Gog is promised a burial plot

🚫 This is proof, not an honor

📍 A grave means the threat stays buried

📖 Even burial is planned in advance

## 🌊 The Valley Of The Passengers On The East Of The Sea

"The sea" here most likely refers to the Dead Sea, east of the Jordan.

"Passengers" means ordinary travelers who regularly pass through that valley.

Choosing a well traveled valley means everyone will eventually see this.

A hidden battlefield would not carry the same lasting warning.

🌊 The sea likely means the Dead Sea

🚶 Passengers means ordinary regular travelers

👀 A well traveled valley guarantees witnesses

📖 A hidden battlefield would not warn anyone

## 👃 It Shall Stop The Noses Of The Passengers

This is a blunt, physical detail about the smell of mass death.

Ezekiel does not soften this image to make it comfortable.

The valley's new name later remembers this smell permanently.

Scripture sometimes teaches through discomfort instead of around it.

👃 This describes the smell of mass death

😬 Ezekiel does not soften the image

📛 The valley's later name recalls this

➡️ Scripture sometimes teaches through discomfort

## 📛 The Valley Of Hamongog

"Hamon" means multitude, and "Hamongog" means the multitude of Gog.

The place gets permanently renamed after the army that died there.

A map itself becomes a kind of monument to this defeat.

Anyone reading the name afterward is reminded why it exists.

📛 Hamongog means the multitude of Gog

🗺️ The place is renamed after this army

🏔️ A map becomes a lasting monument

📖 The name itself preserves the memory

## 📆 Seven Months Shall The House Of Israel Be Burying Of Them

Seven months is an unusually long cleanup for one battle.

The number communicates the sheer size of Gog's defeated army.

This is not a quick, tidy ending to the invasion.

The scale of the burial matches the scale of the earlier buildup.

📆 Seven months is an unusually long task

📊 It shows just how large Gog's army was

🚫 This is not a quick, tidy ending

📖 The cleanup matches the earlier buildup

## 🧹 That They May Cleanse The Land

Dead bodies left in the open were considered ritually unclean in Israel's law.

An unburied battlefield would leave the whole promised land defiled.

Burying every single body restores the land to a usable, holy condition.

This cleanup is about holiness, not just hygiene.

⚠️ Unburied bodies made the land unclean

🏞️ A defiled battlefield affected the whole land

🧹 Burial restores the land's usable condition

📖 This is about holiness, not only hygiene

## 🏆 It Shall Be To Them A Renown

"Renown" means a lasting reputation or fame.

Burying Gog's army becomes something Israel will be remembered for.

This is an unusual kind of fame, built on a burial detail.

Being remembered for faithfully finishing God's instructions still counts as renown.

🏆 Renown means a lasting reputation

⚰️ This fame comes from a burial task

🤔 An unusual source for lasting honor

📖 Faithfully finishing counts as real renown

## 👷 Men Of Continual Employment

This describes a dedicated search team, not random volunteers.

Their only job for months is to walk the land looking for remains.

Assigning full time workers shows how seriously this task was taken.

Nothing about cleansing the land was left to chance or neglect.

👷 This means a dedicated search team

🔍 Their only job is finding remains

📋 Full time workers show real seriousness

➡️ Nothing here was left to chance

## 🚩 When Any Seeth A Man's Bone, Then Shall He Set Up A Sign By It

Ordinary travelers help with this search, not just the official workers.

Setting up a sign marks the spot for burial crews to find later.

This system catches remains the dedicated searchers might otherwise miss.

Everyone in the land plays some small part in finishing the task.

🚶 Ordinary travelers help with this search

🚩 A sign marks the spot for burial crews

🔎 This catches what searchers might miss

📖 Everyone plays a part in finishing the task

## 🏙️ The Name Of The City Shall Be Hamonah

"Hamonah" is the feminine form of the same word meaning multitude.

A whole city, not just the valley, now carries this army's memory.

Two different places end up named after Gog's defeated multitude.

The defeat becomes part of the land's permanent geography.

📛 Hamonah also means multitude

🏙️ A whole city carries this memory now

🗺️ Two places are named after this defeat

📖 The judgment becomes permanent geography

# Ezekiel 39:17-20
# 🦅 A Sacrifice For The Birds And Beasts
---
## 🐦 Speak Unto Every Feathered Fowl, And To Every Beast Of The Field

God addresses animals directly here, almost like inviting guests.

This picture reverses the sacrifice system Israel knew from the law.

In the law, people brought animals to sacrifice to God.

Here, God invites animals to feast on the sacrifice He is making instead.

🦅 God speaks directly to the animals

🔄 This reverses the normal sacrifice pattern

🙏 Usually people bring animals to God

📖 Here God offers the sacrifice to them

## 🎯 Gather Yourselves On Every Side To My Sacrifice

Calling this a "sacrifice" is deliberate, not just a figure of speech.

A sacrifice in scripture is something set apart and given to God's purpose.

Gog's defeated army is being described using that exact sacrificial language.

Their defeat was never random, it was offered up with meaning.

🎯 Sacrifice is a deliberate, meaningful word

📜 It means something set apart for God's purpose

⚔️ Gog's army is described this way

📖 This defeat carried real meaning, not randomness

## 🦴 Ye Shall Eat Flesh, And Drink Blood

This describes scavenging birds and animals feeding on dead bodies.

The image is intentionally graphic, not softened for comfort.

It pictures total, undignified defeat for the fallen army.

A reader is meant to feel just how complete this judgment is.

🦴 This pictures scavengers feeding on bodies

😬 The image is intentionally graphic

💀 It shows a total, undignified defeat

📖 Completeness, not comfort, is the point

## 🗡️ The Princes Of The Earth

"Princes" here means rulers and high ranking leaders, not common soldiers.

Even the most powerful men in Gog's coalition end up as this feast.

Rank offered these leaders no protection from the outcome.

Whatever status they held in life made no difference here.

👑 Princes means high ranking rulers

⚔️ Even top leaders end up in this feast

🚫 Rank offered no protection at all

📖 Status in life changed nothing here

## 🐑 Rams, Of Lambs, And Of Goats, Of Bullocks, All Of Them Fatlings Of Bashan

This list compares Gog's soldiers to the finest sacrificial animals Israel knew.

"Bashan" was a fertile region famous for raising especially large, healthy livestock.

Comparing an army to prime livestock is a deliberately insulting, humbling image.

The language turns Gog's proud army into nothing more than dinner.

🐑 This compares soldiers to prime livestock

🌾 Bashan was famous for large healthy animals

😳 The comparison is deliberately humbling

📖 A proud army becomes nothing but dinner

## 🍖 Eat Fat Till Ye Be Full, And Drink Blood Till Ye Be Drunken

This describes total excess, more than enough food for every creature invited.

The scale of this one battlefield feast matches the scale of Gog's whole army.

Nothing about this judgment is small or partial.

Even the scavengers cannot finish what this defeat leaves behind.

🍖 This describes total, overwhelming excess

📊 Scale matches the size of Gog's army

🚫 Nothing here is small or partial

📖 Even scavengers cannot finish this defeat

## 🍽️ Filled At My Table With Horses And Chariots

Calling this "my table" makes the whole scene formally God's own feast.

Horses and chariots were the most valuable military equipment of that era.

Even the most expensive war machines end up as part of the meal.

Nothing Gog brought to this invasion survives this ending untouched.

🍽️ My table makes this God's own feast

🐎 Horses and chariots were top military assets

💥 Even this expensive equipment becomes part of it

📖 Nothing Gog brought survives untouched

# Ezekiel 39:21-24
# 🌍 What The Nations Will Know
---
## 🌟 I Will Set My Glory Among The Heathen

"Glory" here means God's visible greatness and reputation on display.

This judgment was never just a private matter between God and Gog.

Every watching nation gets to see exactly what just happened.

A defeat this public becomes a lesson for the whole world.

✨ Glory means visible greatness on display

🌍 This was never a private matter

👀 Every watching nation sees what happened

📖 A public defeat becomes a public lesson

## ⚖️ The Heathen Shall See My Judgment That I Have Executed

"Executed" here means carried out in full, not just announced.

Watching nations do not just hear a report about this.

They see the result with their own eyes.

Seeing a finished judgment lands differently than hearing a prediction.

⚖️ Executed means fully carried out

👂 Nations do not just hear a report

👁️ They witness the actual result

➡️ Seeing lands differently than merely hearing

## 🔁 So The House Of Israel Shall Know That I Am The LORD Their God

This refrain has echoed through nearly every chapter of Ezekiel so far.

Here it finally lands on Israel itself, not just the surrounding nations.

Israel's own people need this lesson every bit as much as Gog's armies.

Knowing who God is was always the point, for everyone involved.

🔁 This refrain echoes through Ezekiel's chapters

🏠 Here it lands on Israel itself

🤝 Israel needed this lesson too

📖 Knowing God was always the real point

## ❓ The Heathen Shall Know That The House Of Israel Went Into Captivity For Their Iniquity

God corrects a wrong conclusion the nations could easily have drawn.

Watching Israel's exile, outsiders might assume Israel's God was simply weak.

This verse states plainly that exile came from Israel's own sin, not God's weakness.

Getting the reason right mattered as much as the judgment itself.

❓ Nations might assume God was weak

🙅 That conclusion was always wrong

⚖️ Exile came from Israel's own sin

➡️ The reason mattered as much as the event

## 🙈 Therefore Hid I My Face From Them, And Gave Them Into The Hand Of Their Enemies

"Hid my face" is a common Old Testament picture for withdrawing favor and protection.

It does not mean God stopped existing or stopped caring completely.

It means Israel was left to face the natural consequences of their own choices.

Removing protection, not adding punishment, is what actually opened the door to defeat.

🙈 Hid my face means withdrawn protection

🚫 It does not mean God stopped caring

⚖️ Israel faced its own choices' consequences

📖 Removed protection opened the door to defeat

## 🚧 According To Their Uncleanness And According To Their Transgressions

"Uncleanness" and "transgressions" name two different angles on the same sin problem.

Uncleanness points to being unfit for God's presence.

Transgression points to actively crossing a line God had drawn.

Naming both makes clear this judgment was measured, not excessive.

🧼 Uncleanness means unfit for God's presence

🚧 Transgression means actively crossing a line

⚖️ Both angles describe the same real sin

📖 This judgment was measured, not excessive

# Ezekiel 39:25-29
# 🕊️ Mercy For The House Of Israel
---
## 👤 Now Will I Bring Again The Captivity Of Jacob

"Jacob" here stands for the whole nation descended from him, not one individual.

This phrase marks a clear turn from judgment back to restoration.

Everything leading up to this verse dealt with Gog's defeat and Israel's past sin.

Now the chapter pivots to what comes after both of those.

👤 Jacob stands for the whole nation

🔄 This marks a turn toward restoration

📜 Earlier verses dealt with judgment and sin

📖 Now the focus shifts to what comes next

## 💗 Have Mercy Upon The Whole House Of Israel

"Mercy" means kindness given to someone who has not earned it.

Nothing in the previous chapters suggested Israel deserved this turn toward restoration.

God's mercy is the only stated reason for what happens next.

The whole house means every part of the nation, not just a faithful remnant.

💗 Mercy means undeserved kindness

🚫 Nothing here suggests Israel earned this

🙏 God's mercy is the stated reason

📖 This mercy reaches the whole nation

## 💍 Will Be Jealous For My Holy Name

This same word "jealous" already appeared back in chapter thirty eight's warning against Gog.

There it described God's anger at Gog's invasion.

Here the same jealousy now works to restore and protect Israel instead.

One protective instinct produces both the judgment and the mercy in this story.

💍 Jealous already appeared in chapter thirty eight

😠 There it described anger at the invasion

🛡️ Here it protects and restores Israel

📖 One instinct explains both judgment and mercy

## 😔 After That They Have Borne Their Shame

"Borne their shame" means Israel actually lived through the consequences of exile first.

Restoration here does not skip past accountability.

The nation carried the weight of its own history before healing arrived.

Mercy followed consequence, it did not replace it.

😔 Borne their shame means living the consequences

🚫 Restoration does not skip accountability

⏳ Consequence came before healing arrived

➡️ Mercy followed, it did not replace

## 🕊️ When They Dwelt Safely In Their Land, And None Made Them Afraid

This exact kind of safety was the very thing that first drew Gog's attack back in chapter thirty eight.

Naming it again here means this peace is being restored, not just remembered.

The same vulnerability that invited disaster becomes the goal again anyway.

God is not afraid to restore the very safety that was once exploited.

🕊️ This safety first drew Gog's attack

🔁 Now it is being restored, not just recalled

💭 The same vulnerability becomes the goal again

📖 God restores safety even after it was exploited

## 🌍 Am Sanctified In Them In The Sight Of Many Nations

"Sanctified" means proven holy, shown to be exactly who God claims to be.

This happens specifically in front of many watching nations, not privately.

Israel's own restoration becomes a public demonstration, the same way Gog's defeat was.

Both the judgment and the rescue end up teaching the same watching world.

✨ Sanctified means proven holy publicly

🌍 This happens in front of many nations

🔄 Restoration teaches the same way judgment did

📖 Both events teach the same watching world

## 🏠 I Have Gathered Them Unto Their Own Land, And Have Left None Of Them Any More There

This promises a complete return, not a partial one.

Earlier exiles and returns in Israel's history were sometimes incomplete.

This verse specifically rules out leaving anyone behind.

The restoration matches the totality of the judgment that came before it.

🏠 This promises a complete return

📜 Earlier returns were sometimes incomplete

🚫 No one gets left behind here

➡️ Total restoration matches the total judgment

## 🤲 I Have Poured Out My Spirit Upon The House Of Israel

"Poured out" pictures abundance, not a careful, measured amount.

This same phrase appears again later in the prophet Joel, pointing toward a future outpouring.

God's presence here is not just promised, it is given generously.

This verse closes the chapter on relationship, not just on military defeat.

🌊 Poured out means generous abundance

🔮 Joel later repeats this same promise

🤲 God's presence is given, not just promised

📖 The chapter ends on relationship, not just war`.trim();

export const EZEKIEL_THIRTY_NINE_PERSONAL_SECTIONS = parseEzekielThirtyNineRawNotes(EZEKIEL_THIRTY_NINE_RAW_NOTES);
