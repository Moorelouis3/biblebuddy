export type EzekielThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtySevenRawNotes(rawText: string): EzekielThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 37:${startVerse}` : `Ezekiel 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 37 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_SEVEN_RAW_NOTES = `# Ezekiel 37:1-3
# 🦴 The Valley Of Dry Bones
---
## 🤲 The Hand Of The LORD Was Upon Me

"Hand of the LORD" is the phrase Ezekiel uses when a vision is about to take hold of him.

It means God has taken control of him by force.

Ezekiel uses this same phrase to open his most intense visions.

He cannot resist it or walk away once it falls on him.

🤲 Hand of the LORD means forced control

👁️ This opens Ezekiel's most intense visions

🚫 Ezekiel cannot resist or walk away

📖 Only God can explain what comes next

## 🌬️ Carried Me Out In The Spirit

This was not a physical trip on foot or by any animal.

Ezekiel is transported in a vision while his body likely stayed in one place.

The same kind of experience lifted him into visions back in earlier chapters.

What he is about to see is real, even though his body never moved.

🌬️ Carried in the spirit means a vision

🧍 His body likely never left its place

🔁 The same experience happened in earlier chapters

📖 A vision can feel just as real

## 🦴 The Valley Which Was Full Of Bones

This was not a single grave or a small battlefield.

The valley stretched out with bones scattered everywhere Ezekiel looked.

Bones in ancient thought stood for something already finished, already dead beyond repair.

God chose the most hopeless picture available to make His next point.

🦴 The valley held bones everywhere he looked

⚰️ Bones meant something already finished and dead

🚫 Not one grave but an entire battlefield

📖 God chose the most hopeless picture possible

## 🏜️ There Were Very Many

This was not a handful of bones in one corner.

The valley was covered with bodies from however this death happened.

The scale itself is part of the message God is building.

A small loss would not carry the same weight as a whole army.

🏜️ Many means the whole valley was covered

💀 This was not a small or isolated loss

📏 Scale matters to the point God is making

📖 A huge loss sets up a bigger miracle

## 🍂 They Were Very Dry

"Very dry" means these people had been dead a long time, not recently killed.

Fresh bones could still suggest some flicker of hope.

Dry, bleached bones meant decades of death with zero chance of natural recovery.

Israel's exile felt exactly that hopeless to the people living through it.

🍂 Very dry means long dead, not fresh

⏳ Dry bones left zero natural hope

😔 This matched how exiled Israel actually felt

📖 Hopelessness is the starting point of this vision

## ❓ Can These Bones Live

God already knows there is no natural way for this to happen.

He is not asking because He needs information.

He is asking so Ezekiel has to decide how he will answer.

The question tests whether Ezekiel will trust God beyond what he can see.

❓ God already knows the answer is no

🧠 The question is not a search for information

🙋 It forces Ezekiel to choose his own answer

📖 Trust is tested before the miracle ever starts

## 🙏 O Lord GOD, Thou Knowest

Ezekiel does not say yes and does not say no.

"Thou knowest" hands the whole impossible question back to God.

That answer is not a dodge, it is actually deep trust.

Ezekiel admits he has no idea, but God certainly does.

🙏 Thou knowest hands the question back to God

🤷 Ezekiel admits he has no answer himself

🔑 This is trust, not avoidance or doubt

📖 Honest not knowing can still be real faith

# Ezekiel 37:4-6
# 🗣️ Prophesy Upon These Bones
---
## 🗣️ Prophesy Upon These Bones

God tells Ezekiel to preach a sermon to a pile of dead bones.

Bones cannot hear, understand, or respond in any natural sense.

God is not asking Ezekiel to convince them, only to speak His word.

The power was always going to come from the word, not from Ezekiel's skill.

🗣️ God tells him to preach to bones

🙉 Bones cannot hear in any normal sense

💬 The word carries the power, not Ezekiel

📖 Obedience matters more than how it looks

## 👂 Hear The Word Of The LORD

This command sounds pointless aimed at something with no ears.

Bones cannot literally hear a single word Ezekiel says.

"Hear the word of the LORD" is Ezekiel's standard phrase for full surrender to God's command.

God's command can reach even what seems completely lifeless.

👂 Hear here does not mean physical hearing

🦴 Bones cannot literally hear a human voice

📣 This phrase means full surrender to God's word

📖 God's command can reach even the lifeless

## 💨 I Will Cause Breath To Enter Into You

"Breath" here is the same Hebrew word used for spirit and for wind.

It is the exact word used when God first breathed life into Adam.

God is not just rebuilding bodies, He is doing creation all over again.

The same power that made the first man is making a new nation here.

💨 Breath, spirit, and wind share one word

🧍 This is the same word from Adam's creation

🔁 God repeats the first creation in this valley

📖 One nation gets remade by the same power

## 🦴 I Will Lay Sinews Upon You

"Sinews" means the tendons that connect muscle to bone and allow movement.

God rebuilds the body in a specific order, not all at once.

First sinews, then flesh, then skin, each layer added on top of the last.

It reads like watching a body grow, only run backward from decay.

🦴 Sinews means tendons connecting muscle to bone

🧱 God rebuilds the body layer by layer

🔄 Decay runs backward right in front of him

📖 God restores in order, not all at once

## ✅ Ye Shall Know That I Am The LORD

This exact line repeats throughout the whole book of Ezekiel.

Every judgment and every miracle points back to this one purpose.

God is not performing a trick, He is proving who He actually is.

The valley of bones exists to answer one question, who is the LORD.

✅ This phrase repeats again and again in Ezekiel

🎯 Every miracle points back to this one purpose

🚫 This is proof, not a magic trick

📖 The whole vision answers who the LORD is

# Ezekiel 37:7-10
# 🔊 The Bones Come Together
---
## 👂 There Was A Noise, And Behold A Shaking

Ezekiel obeys before he sees any sign the vision will actually work.

The noise and the shaking come only after he starts speaking.

Obedience happens first, the miracle follows after.

Faith here looks like speaking to bones before anything moves.

👂 A noise comes only after he obeys

🫨 Shaking follows obedience, not the other way around

🙋 Ezekiel speaks before he sees any result

📖 Obedience always comes before the miracle

## 🦴 Bone To His Bone

Each bone finds its exact, matching partner, not a random pile.

Nothing stays scattered or mismatched in this rebuilding.

The precision shows this is design, not an accident of wind or noise.

God restores exactly what was lost, piece by piece.

🦴 Each bone finds its exact matching partner

🧩 Nothing stays scattered or mismatched here

🎯 Precision shows design, not accident

📖 God restores exactly what was lost

## 🚫 But There Was No Breath In Them

A full body is not the same thing as a living body.

Sinews, flesh, and skin now cover every bone perfectly.

Something essential is still completely missing, and anyone watching would notice it.

Looking whole and actually being alive are two different things.

🚫 A full body is not a living one

👀 Flesh and skin now cover every bone

❌ Something essential is still completely missing

📖 Looking alive is not the same as living

## 🌬️ Prophesy Unto The Wind

Ezekiel now speaks to something different from before.

The first command went to the bones themselves.

This second command goes to the wind, the same word used for breath and spirit.

Two separate acts of prophecy were needed to finish the work.

🌬️ This command now targets the wind itself

🔁 Wind, breath, and spirit share one word again

🗣️ Two separate prophecies complete the whole miracle

📖 Some restoration takes more than one step

## 🧭 Come From The Four Winds

"Four winds" means every direction at once, north, south, east, and west.

This is not a gentle breeze from one side of the valley.

Life comes rushing in from the entire horizon, not a single gust.

God calls in complete, total life, from every direction there is.

🧭 Four winds means every direction at once

🌪️ This is not one gentle, single breeze

🌍 Life rushes in from the entire horizon

📖 God calls in complete, total life

## 🪖 An Exceeding Great Army

These bones do not just come back to life, they stand up as soldiers.

A valley of corpses becomes a massive, organized fighting force.

The image matches what Israel actually needed, strength to return and rebuild.

God does not restore His people halfway.

🪖 Dead bones rise up as soldiers

💪 A valley of corpses becomes a real army

🏗️ Israel needed strength to rebuild, not just survive

📖 God restores fully, never only halfway

# Ezekiel 37:11-14
# 🏚️ The Whole House Of Israel
---
## 🏚️ These Bones Are The Whole House Of Israel

God removes all doubt and explains the vision Himself.

The bones do not represent one tribe or one city.

They stand for the entire nation, north and south together.

Nothing about this restoration was ever meant to be partial.

🔍 God explains the vision Himself

🌍 Bones stand for the whole nation

🤝 North and south are both included

📖 This restoration was never meant to be partial

## 😔 Our Bones Are Dried, And Our Hope Is Lost

This is the people's own words about themselves, not God's description.

Exile had convinced them their story was finished.

"Dried" bones became their own picture for a future that felt completely gone.

Despair this deep is exactly what God is about to answer.

😔 These are the people's own despairing words

⚰️ Exile convinced them their story was over

🍂 Dried bones became their own picture of despair

📖 God answers despair this deep directly

## ✂️ We Are Cut Off For Our Parts

"Cut off for our parts" means they felt completely severed from their own future.

It is the language of a branch cut away from its tree.

They did not just feel sad, they felt erased from what was coming next.

That is the exact feeling this entire vision exists to undo.

✂️ Cut off means severed from any future

🌿 Like a branch cut away from its tree

😞 They felt erased, not just sad

📖 This whole vision exists to undo that feeling

## ⚱️ I Will Open Your Graves

This picture is drawn from the bones vision, not a new teaching about the body.

God is describing a whole people being brought back from national death, exile itself.

"Graves" here stands for every place they were scattered and as good as buried.

Coming up out of the grave means coming home to the land of Israel.

⚱️ Graves here means the land of exile

🏠 Opening graves means coming home, not dying

🌍 This image covers a whole scattered people

📖 National death and national homecoming is the picture

## 🙌 When I Have Opened Your Graves

This refrain returns again, now attached to the return from exile itself.

Every stage of this vision circles back to the same purpose.

The homecoming itself becomes proof of who God is.

Israel will not just be restored, they will understand why.

🙌 The refrain returns one more time

🔁 Every stage circles back to one purpose

🏠 Homecoming itself becomes proof of God

📖 Israel is restored and shown why

## 💨 I Shall Put My Spirit In You

This repeats the same breath and spirit language from earlier in the chapter.

The bones needed breath to live, the nation needs spirit to live too.

Physical bodies and a whole scattered people get the exact same kind of life.

God's spirit, not politics or human effort, is what truly brings them home.

💨 Same breath and spirit language as before

🦴 Bones needed breath, the nation needs spirit

🏠 God's spirit brings them home, not politics

📖 One kind of life for bodies and nations

## 🗣️ I The LORD Have Spoken It, And Performed It

God does not just make a promise and leave it hanging.

Speaking and doing are placed right next to each other on purpose.

Everything said earlier in this vision will actually happen, not just sound good.

God's word and God's action are never two separate things.

🗣️ Speaking and doing sit side by side

✅ Nothing here is a promise left hanging

🔗 God's word and God's action always match

📖 What God says, He actually performs

# Ezekiel 37:15-17
# 🪵 The Two Sticks
---
## 🪵 Take Thee One Stick

A "stick" here likely means a flat piece of wood smooth enough to write on.

Ezekiel was told to act this out in public, not just describe it in words.

Writing a name on it marked exactly which group that stick represented.

This was a visual sermon anyone passing by could actually watch happen.

🪵 Stick likely means a flat writing tablet

✍️ Ezekiel wrote a name right on it

👀 This sermon was meant to be watched

📖 God often used visible signs, not only words

## 👑 For Judah, And For The Children Of Israel His Companions

Judah represents the southern kingdom, the nation still standing in Ezekiel's own day.

"His companions" means the tribes already joined with Judah, mainly Benjamin.

This stick stood for the half of the nation that had not yet fully collapsed.

Even that half was still living far from home in exile.

👑 Judah means the southern kingdom

🤝 Companions means tribes already joined with Judah

🏚️ This half had not yet fully collapsed

📖 Even the standing half was still in exile

## 🌲 The Stick Of Ephraim

Ephraim stands for the northern kingdom, called Israel, led by Joseph's descendants.

That kingdom had already fallen to Assyria more than a century before this vision.

Naming a stick after a nation already destroyed makes the promise even bolder.

God is promising to reunite a kingdom that no longer existed on any map.

🌲 Ephraim means the northern kingdom, Israel

💥 That kingdom had fallen to Assyria already

🗺️ It no longer existed on any map

📖 God promises to reunite what was destroyed

## 🤝 Join Them One To Another Into One Stick

Ezekiel physically holds two separate sticks together as one in his own hand.

The audience watches a split nation become one object right in front of them.

This is the same message as the bones, scattered things made whole again.

The sign itself became the sermon, no further words were even needed yet.

🤝 Two sticks become one in his hand

👁️ A split nation turns into one object

🦴 Same message as the bones, made whole

📖 The sign itself preached before words did

# Ezekiel 37:18-22
# 👑 One Nation, One King
---
## ❓ Wilt Thou Not Shew Us What Thou Meanest

The people's curiosity is exactly what this kind of sign was meant to create.

Ezekiel's strange public actions were designed to make people ask questions first.

An explanation lands harder once someone has already wondered about it themselves.

God uses a visible mystery before He gives the answer to it.

❓ The sign is meant to spark questions

🧠 Curiosity makes the explanation land harder

👀 Ezekiel's actions always draw people in first

📖 God often answers after the question is asked

## 🙌 I Will Take The Stick Of Joseph

God Himself is the one who performs this reunion, not a treaty or a war.

No human negotiation could have mended a split this old and this deep.

The two kingdoms had been divided since the days of Solomon's son Rehoboam.

Only God's own hand could undo a split that old.

🙌 God Himself performs this reunion

⚔️ No treaty or war could mend this split

📆 The division dated back to Rehoboam's day

📖 Only God's hand could undo it

## ✋ One In Mine Hand

Verse seventeen already showed the sticks becoming one in Ezekiel's own hand.

Here God shifts the credit to His own hand instead.

Ezekiel's act was only ever a picture of what God Himself would really do.

The real power behind the unity was always God's, never the prophet's.

✋ Ezekiel's hand only pictured the real one

🙌 God's hand does the actual work

🎭 The sign was a picture, not the power

📖 Real unity always comes from God's hand

## 👀 Before Their Eyes

This sign act had to be seen, not just heard about secondhand.

Ezekiel's prophecies often worked this way throughout the whole book.

A watching crowd could not later claim they misheard or misunderstood.

Public proof mattered as much as the words spoken alongside it.

👀 The sign had to be seen directly

📣 Ezekiel's prophecies often worked through action

🚫 No one could claim they misheard this

📖 Public proof backed up the public promise

## 🌍 From Among The Heathen, Whither They Be Gone

"Heathen" here simply means the surrounding nations, not an insult on its own.

Israel had been scattered into many of those nations by conquest and exile.

"Whither they be gone" covers every single place any of them ended up.

No corner they were scattered into was outside God's reach to gather from.

🌍 Heathen here just means surrounding nations

🧭 Israel had scattered into many of them

📍 Whither they be gone covers every location

📖 No corner was outside God's reach

## 🔄 Gather Them On Every Side

This regathering does not come from only one direction.

Exiles had scattered toward Babylon, Egypt, and many other places by now.

God promises to pull them back in from every side at once.

A scattering that took generations gets reversed by one single promise.

🔄 Gathering comes from every direction, not one

🗺️ Exiles had scattered toward several nations

⏳ Generations of scattering face one reversal

📖 God's gathering matches the scale of the loss

## 👑 One Nation And One King

Since Solomon's son Rehoboam, Israel had lived as two separate, often rival kingdoms.

This verse promises to end that split for good.

One king over the whole people reverses centuries of division at the root.

The split itself, not just the exile, is what God is promising to heal.

👑 Two rival kingdoms become one again

📆 The split had lasted since Rehoboam's time

🩹 This heals the division, not only the exile

📖 God fixes the root problem, not the symptom

## 🚫 No More Two Kingdoms Any More At All

The doubled wording here is deliberate, no more, any more, at all.

It leaves no room to imagine the split ever returning later.

This is not a temporary peace between two kingdoms.

It is a permanent end to the division itself.

🚫 The wording stacks up on purpose

🔒 No room is left for the split

⏳ This is not a temporary peace

📖 It is a permanent end to the division

# Ezekiel 37:23-25
# 🕊️ Cleansed And Ruled By David
---
## 🚫 Neither Shall They Defile Themselves Any More With Their Idols

Political reunion alone was never going to be the whole promise.

God ties the nation's future together with their worship, not just their borders.

The same idols that caused the exile in the first place get removed for good.

A united nation still worshiping idols would only repeat the same old failure.

🚫 Unity alone was never the whole promise

🗿 Idols caused the exile in the first place

🩹 This removes the root cause, not just borders

📖 A united nation still needs a clean heart

## 🤝 So Shall They Be My People, And I Will Be Their God

This exact formula runs throughout the whole Bible as the core covenant promise.

It works almost like ancient marriage language, full belonging on both sides.

God is not just rescuing Israel, He is renewing the relationship underneath the rescue.

Every promise in this chapter leads back to this one covenant line.

🤝 This is the Bible's core covenant formula

💍 It reads like ancient marriage language

❤️ The relationship matters more than the rescue

📖 Every promise here leads back to this line

## 👑 David My Servant Shall Be King Over Them

By Ezekiel's day, the historical King David had already been dead for centuries.

This does not mean David himself would be raised to rule again.

"David" became a title for a future king from David's own family line.

The New Testament later points to Jesus as the fulfillment of exactly this promise.

👑 The historical David was already long dead

👨‍👦 David here means a future king, his heir

🔮 This promise points far beyond Ezekiel's own day

📖 The New Testament names Jesus as its fulfillment

## 🐑 One Shepherd

Ezekiel already used shepherd imagery for Israel's leaders back in an earlier chapter.

Bad shepherds there scattered and neglected the flock for their own gain.

This one shepherd finally leads with the people's good in mind.

Divided, competing leadership gets replaced by one trustworthy king.

🐑 Shepherd imagery already appeared earlier in this book

😠 Earlier shepherds neglected the flock for themselves

✅ This shepherd finally leads for the people's good

📖 Divided leadership becomes one trustworthy king

## 🌍 The Land That I Have Given Unto Jacob My Servant

This promise reaches all the way back to Jacob, generations before Ezekiel's own time.

The same land promised to the patriarchs is the land now being returned.

Exile never actually canceled that original promise, it only delayed it.

God's oldest promises and His newest promises point to the exact same land.

🌍 This promise reaches back to Jacob himself

📜 The same land was promised generations earlier

⏳ Exile delayed the promise, it never canceled it

📖 Old and new promises point to one land

## 👑 David Shall Be Their Prince For Ever

This verse shifts the word from king earlier to prince here.

"Prince" suggests a ruler who still answers to someone higher.

That higher authority is God Himself, the true King over everyone.

Even David's promised heir rules under God, not instead of Him.

👑 The title shifts from king to prince

🙇 Prince suggests a ruler under someone higher

👆 That higher authority is God Himself

📖 Even the promised king answers to God

# Ezekiel 37:26-28
# 🏛️ An Everlasting Covenant
---
## 🕊️ A Covenant Of Peace

A "covenant" is a formal, binding promise, not a casual intention.

Earlier covenants in Israel's story were sometimes broken by the people themselves.

This one is called everlasting, built to never need replacing again.

God is closing the door on every previous broken agreement.

🕊️ A covenant means a formal, binding promise

💔 Earlier covenants had been broken before

🔒 This one is called everlasting on purpose

📖 God closes the door on past failures

## 🏛️ Set My Sanctuary In The Midst Of Them

A "sanctuary" means God's own dwelling place, His temple among the people.

This is not God visiting occasionally from somewhere far away.

He plans to live at the very center of the nation permanently.

Everlasting nearness, not an occasional appearance, is the actual promise here.

🏛️ Sanctuary means God's own dwelling place

📍 God settles at the nation's center

🚫 Not a visit, a permanent presence

📖 Nearness, not distance, is the real promise

## ⛺ My Tabernacle Also Shall Be With Them

"Tabernacle" recalls the portable tent where God's presence once dwelt with Israel.

That tent had traveled with them long before any permanent temple was built.

Naming it here ties this future promise back to Israel's very earliest days with God.

The same presence that led them out of Egypt would stay with them again.

⛺ Tabernacle recalls the wilderness tent

🚶 That tent traveled with Israel long ago

🔁 This ties back to Israel's earliest days

📖 The same presence returns to stay

## 🌍 The Heathen Shall Know

This purpose reaches beyond Israel to every watching nation around them.

The refrain "ye shall know" from earlier now widens to the heathen shall know.

Israel's restoration was always meant to be seen by the whole world, not kept private.

What God does for one people becomes a witness to everyone watching.

🌍 The purpose widens beyond Israel alone

🔁 Ye shall know widens to the heathen

👀 Israel's restoration was never meant to stay private

📖 One people's rescue becomes a witness to all

## ✨ Do Sanctify Israel

"Sanctify" means to set apart as holy, belonging distinctly to God alone.

This chapter began with a nation that felt completely finished and forgotten.

It ends with that same nation set apart, alive, and unmistakably God's own.

Dry bones became a sanctified, living people in the space of one vision.

✨ Sanctify means set apart as holy

🏚️ The chapter began with a nation left dead

🌱 It ends with that nation alive, set apart

📖 Dry bones became a sanctified people
`.trim();

export const EZEKIEL_THIRTY_SEVEN_PERSONAL_SECTIONS = parseEzekielThirtySevenRawNotes(EZEKIEL_THIRTY_SEVEN_RAW_NOTES);
