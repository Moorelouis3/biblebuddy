export type EzekielTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyFourRawNotes(rawText: string): EzekielTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 24:${startVerse}` : `Ezekiel 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 24 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_FOUR_RAW_NOTES = `# Ezekiel 24:1-5
# 🫕 The Sign Of The Boiling Pot
---
## 👂 Write Thee The Name Of The Day

This command was not just about keeping a calendar.

God told Ezekiel to mark this exact date because of what it would prove later.

The ninth year, tenth month, tenth day matches the day the siege of Jerusalem actually began.

Second Kings records that same date on the ground in Jerusalem.

Ezekiel was hundreds of miles away in Babylon when he wrote it down.

That gap in distance is what makes the detail so striking.

📅 The date names year, month, day
🏰 It matches the siege in Second Kings
📏 Ezekiel wrote it from far away in Babylon
📖 This detail proves it was revealed, not guessed

## ⚔️ The King Of Babylon Set Himself Against Jerusalem

Setting himself against a city was the language of a siege.

Babylon's army surrounded Jerusalem and cut off every way in or out.

Food and water inside the walls would only shrink from this day forward.

This siege did not end quickly.

It dragged on for well over a year before the city finally fell.

⚔️ Set himself against means a siege began
🚧 Babylon surrounded the city completely
⏳ The siege lasted over a year
📖 This single day started the final countdown

## 🎭 Utter A Parable Unto The Rebellious House

A parable here is an acted out story, not just spoken words.

God often used a parable when a plain warning had already failed to land.

The rebellious house is a name Ezekiel has used for Israel throughout this book.

It points to a pattern of ignoring God that goes back generations.

This time the parable would center on a pot set over a fire.

🎭 Parable means an acted out story
📢 Plain warnings had already failed
🏠 Rebellious house names Israel's old pattern
📖 This parable centers on a boiling pot

## 🍲 Set On A Pot, And Also Pour Water Into It

Picture a cooking pot being filled and set over a fire.

That image is the whole parable in one sentence.

Jerusalem is about to be sealed in and heated up like that pot.

Nobody inside can simply step out once a siege like this begins.

Think of a lid dropped onto a pot that is already starting to boil.

There is no quick way out once that kind of heat starts.

🍲 The pot stands for Jerusalem
🔥 The fire stands for the siege
🚪 Nobody inside can simply leave
📖 The parable has already begun

## 🍖 Fill It With The Choice Bones

Choice bones means the best cuts of meat, not scraps or leftovers.

A family saved the good pieces of meat for special occasions only.

This parable pot gets filled with the good pieces too, not just the leftovers.

That detail shows nobody important gets left out of this judgment.

Even Jerusalem's leaders and nobles are included in the pot.

Status offers no protection once the fire is lit.

🍖 Choice bones means the best cuts
👑 Leaders and nobles are included too
🚫 Status offers no protection here
📖 Nobody important is left out

# Ezekiel 24:6-8
# 🩸 Blood Left Exposed
---
## ⚠️ Woe To The Bloody City

Woe is a cry of coming disaster, not just a complaint.

The bloody city names Jerusalem by her guilt, not by her name.

Her guilt is bloodshed, people hurt and killed through violence and injustice.

The pot image returns here, this time with a layer of scum floating on top.

That scum pictures corruption sitting right on the surface for anyone to see.

No matter how long the pot cooks, that scum will not boil away on its own.

⚠️ Woe announces coming disaster
🩸 Bloody city names Jerusalem's guilt
🍲 Scum pictures corruption on the surface
📖 This corruption will not simply boil away

## 🎲 Bring It Out Piece By Piece, Let No Lot Fall Upon It

No lot means no random drawing, nothing left to chance.

Normally a lot decided who faced punishment and who walked away.

Here every single piece comes out of the pot, nothing chosen at random.

That means judgment reaches everyone in the city, not just a chosen few.

Nobody gets to hide behind luck this time.

🎲 Lot means a random drawing
🚫 No lot means nothing left to chance
🍲 Every piece comes out of the pot
📖 Judgment reaches everyone, not just a few

## 🙈 She Poured It Not Upon The Ground, To Cover It With Dust

Israel's law called for spilled blood to be covered with dust after a killing.

That covering was a way of showing respect and dealing honestly with a death.

Jerusalem instead poured her blood out in the open and left it exposed.

Exposed blood was treated as a cry for justice, much like Abel's blood back in Genesis four.

Jerusalem displayed her guilt instead of hiding it or making it right.

🩸 Law required covering spilled blood
🙈 Covering showed respect for the dead
📢 Exposed blood cried out for justice
📖 Jerusalem displayed her guilt instead of hiding it

## 👁️ That It Might Cause Fury To Come Up To Take Vengeance

God says plainly that He is the one who left this blood uncovered.

He set it on the rock Himself so the guilt would stay visible.

Leaving it exposed guarantees that justice will eventually come looking for it.

This was never going to quietly fade away on its own.

God made sure the evidence demanded a response.

👁️ God left the blood uncovered Himself
🪨 The rock kept the guilt visible
⚖️ Visible guilt demands a response
📖 Justice was always going to come looking

# Ezekiel 24:9-14
# 🔥 The Pot Burned Empty
---
## 🔥 I Will Even Make The Pile For Fire Great

This judgment is about to grow bigger, not smaller.

The fire under the pot is turned up to its highest point.

What began as a siege is building toward total destruction by fire.

History confirms this happened just as described, since Jerusalem later burned when the city fell.

The warning in this parable becomes a real event only a short time later.

🔥 The judgment grows larger, not smaller
📈 The fire is turned up fully
🏙️ A siege builds toward full destruction
📖 History later confirms this fire was real

## 🪵 Heap On Wood, Kindle The Fire, Consume The Flesh

The instructions build in intensity, one step at a time.

More wood, then a hotter fire, then the meat itself is gone.

Spice it well makes the destruction sound almost like ordinary cooking.

That tone makes the coming judgment feel calm instead of dramatic.

Even the bones, the hardest part left, are told to burn completely.

Nothing of the old city is meant to survive this fire.

🪵 Heap on wood means more fuel added
🍲 Spice it well sounds like ordinary cooking
🦴 Even the bones must burn completely
📖 Nothing of the city is meant to survive

## 🥘 That The Brass Of It May Be Hot, And May Burn

Brass here means the bronze metal the pot itself is made from.

Once the meat and bones are gone, the empty pot goes back on the coals.

The point is no longer cooking anything inside it.

The pot itself, the city's own structure, is what finally gets burned clean.

The corruption was never just in what the city held.

It had soaked into the city itself.

🥘 Brass means the pot's own bronze metal
🔥 The empty pot is set on the coals
🏙️ The city itself gets burned, not just contents
📖 Corruption had soaked into the city itself

## 🧽 Her Great Scum Went Not Forth Out Of Her

This does not mean the city simply failed one cleaning attempt.

It means the corruption resisted every single attempt to remove it.

No amount of heat or effort brought the impurity out.

At some point the scum itself has to be destroyed along with the fire.

Ordinary cleaning was never going to be enough here.

🧽 Cleaning did not work here
🔁 Every attempt to purify her failed
🚫 The impurity simply would not come out
📖 Only the fire itself can finish this

## 💔 In Thy Filthiness Is Lewdness

Lewdness names deep sexual and moral corruption, much of it tied to idol worship.

God had already sent smaller warnings to try to correct this, like famine and earlier threats.

None of those smaller corrections actually worked.

This is why only a full judgment is left on the table now.

Smaller warnings only work on people willing to listen.

💔 Lewdness names deep moral corruption
📢 Smaller warnings came first
🚫 None of those warnings worked
📖 Only full judgment is left now

## 🔄 I Will Not Go Back, Neither Will I Spare, Neither Will I Repent

Repent here means God changing His mind, not God turning from sin.

In other moments in scripture, God relented after someone pleaded with Him.

This time God states plainly that the verdict will not be reversed.

There is no appeal left for Jerusalem to make.

The outcome is now treated as already settled.

🔄 Repent here means changing a decision
🙏 Other times God had relented before
🛑 This time the verdict will not change
📖 The outcome is already settled

# Ezekiel 24:15-18
# 💔 A Sign Without Mourning
---
## 👁️ The Desire Of Thine Eyes

This phrase refers to Ezekiel's own wife, the person he loved most.

God announces her coming death to Ezekiel directly, before it even happens.

This is one of the most personal moments in the whole book.

Ezekiel is not just delivering a message about someone else's loss this time.

The loss about to happen is his own.

👁️ Desire of thine eyes names his wife
💔 God announces her death in advance
🗣️ This message is deeply personal
📖 Ezekiel is not just a messenger this time

## ⚡ With A Stroke

With a stroke describes a sudden death, not a slow illness.

There was no warning period, no time to prepare.

That suddenness is part of what makes this sign so sharp.

The shock had to be real for the sign to actually land.

A long illness would have softened the impact Ezekiel had to show.

⚡ A stroke means sudden death
⏱️ No warning time was given
😮 The shock is part of the sign
📖 A slow death would not have worked

## 😶 Neither Shalt Thou Mourn Nor Weep

This command does not mean Ezekiel felt nothing.

It means God forbids him from showing the grief he actually feels.

Losing a spouse without any public grieving would have shocked everyone watching him.

That shock is exactly the point God is making.

Ezekiel's silence becomes the message itself.

😶 Grief is felt but not shown
👀 Everyone watching would notice the silence
🎯 The shock itself is the message
📖 Ezekiel's silence becomes the sign

## 🧢 Bind The Tire Of Thine Head Upon Thee

Tire means a turban or head covering worn as everyday clothing.

Normal mourning in this culture included removing that covering completely.

Ezekiel is told to leave his turban on instead.

He also keeps his shoes on, dressed like any ordinary day.

From the outside he looks like a man with nothing wrong at all.

That ordinary appearance in the middle of real grief is the hardest part of the sign.

🧢 Tire means a turban or head covering
👔 Normal mourning meant removing it
🙂 Ezekiel looks like it is an ordinary day
📖 The ordinary appearance hides real grief

## 🤐 Cover Not Thy Lips, And Eat Not The Bread Of Men

Covering the lips was a normal mourning gesture in this culture.

The bread of men names the comfort meal friends traditionally brought to someone grieving.

Ezekiel is told to skip both customs completely.

He will not hide his face, and he will not accept any comfort meal.

Every visible sign of mourning anyone would expect is removed from this picture.

🤐 Covering the lips was a mourning custom
🍞 Bread of men names the comfort meal
🚫 Ezekiel skips both customs completely
📖 Every expected sign of grief disappears

## 📆 So I Spake Unto The People In The Morning

Ezekiel received this command and his wife's death arrived within the same single day.

He spoke to the people in the morning, exactly as God had commanded him.

By evening his wife had died.

He still did not mourn her publicly, following the command exactly.

That kind of obedience is almost impossible to imagine.

📆 Command and death came the same day
🗣️ Morning words, evening loss
🤐 No public mourning, exactly as commanded
📖 This obedience is almost impossible to imagine

# Ezekiel 24:19-24
# 📣 Ezekiel Explains The Sign
---
## 👀 Wilt Thou Not Tell Us What These Things Are To Us

The people watching Ezekiel noticed his strange behavior right away.

A man who does not mourn his own wife stands out immediately.

Their question is exactly what God wanted them to ask.

A sign only works once someone stops and wonders what it means.

Ezekiel's silence was never meant to go unnoticed.

👀 People noticed Ezekiel's strange behavior
❓ Their question was the whole point
🎯 A sign only works once noticed
📖 Ezekiel's silence was meant to be seen

## 🏛️ I Will Profane My Sanctuary, The Excellency Of Your Strength

Profane means taking something holy and making it common.

Sanctuary names the Jerusalem Temple, the center of Israel's worship.

The excellency of your strength is another name for that same Temple.

It was the nation's greatest source of pride and confidence.

God announces that pride and confidence are about to collapse.

🏛️ Profane means stripping away holiness
⛪ Sanctuary names the Jerusalem Temple
💪 Excellency of your strength is the same Temple
📖 Israel's pride and confidence will collapse

## 🏙️ Your Sons And Your Daughters Whom Ye Have Left Shall Fall By The Sword

Ezekiel was already living in exile in Babylon with other captives.

This warning is about family members still left behind in Jerusalem.

Those remaining relatives are about to die in the city's final destruction.

The exiles hearing this message are about to lose people back home.

Distance did not protect anyone from this coming loss.

🏙️ Ezekiel already lived in exile
🏠 This warns about family left in Jerusalem
⚔️ Those relatives will die in the siege
📖 Distance could not protect them from this loss

## 👥 Ye Shall Not Cover Your Lips, Nor Eat The Bread Of Men

God now applies the exact same rules to the whole community.

When news of the Temple's destruction finally arrives, nobody will mourn in the normal way.

The devastation will be too massive for ordinary customs to even apply.

Public mourning may also be too dangerous once the city actually falls.

Ezekiel's strange behavior becomes everyone's shared experience.

👥 The same rule now covers everyone
🏛️ This happens once the Temple falls
⚠️ The devastation will be too massive for customs
📖 Ezekiel's behavior becomes everyone's experience

## 🎯 Thus Ezekiel Is Unto You A Sign

God says this out loud so nobody misses the connection.

Ezekiel's unmourned loss was never just his own personal tragedy.

It was a living preview of what the whole nation is about to feel.

Watching him should have told the exiles exactly what was coming.

A sign only works if people are willing to read it.

🎯 God names Ezekiel plainly as a sign
💔 His loss previewed the nation's loss
👀 Watching him revealed what was coming
📖 A sign only works if people read it

# Ezekiel 24:25-27
# 🗣️ The Day His Mouth Opens
---
## ⛪ The Joy Of Their Glory, The Desire Of Their Eyes

This phrase again points back to the Temple in Jerusalem.

It was the nation's greatest pride and its deepest comfort.

This verse looks ahead to the actual day the Temple finally falls.

Everything already promised through the parable is about to become history.

The day being described here is not symbolic anymore, it is real.

⛪ This phrase again points to the Temple
💎 It was the nation's pride and comfort
📅 This verse points to the actual fall
📖 The symbol is about to become history

## 🏃 He That Escapeth In That Day Shall Come Unto Thee

This does not describe just any random traveler.

It points to one specific survivor who will reach the exiles with news.

Ezekiel chapter thirty three later shows this exact moment actually happening.

A man who escapes Jerusalem's fall travels to Babylon and reports what happened.

This verse is a promise written years before that meeting took place.

🏃 One specific survivor is meant here
📰 He brings real news to the exiles
⏳ This promise came years before it happened
📖 Ezekiel chapter thirty three shows this happening

## 🤐 Thy Mouth Shall Be Opened To Him Which Is Escaped

Ezekiel had been living under long periods of restricted speech since chapter three.

He could only speak the specific messages God gave him, nothing else freely.

That restriction finally lifts on the day this news actually arrives.

From that point on, Ezekiel's ministry shifts toward messages of future hope.

Silence was never permanent, and it had a clear expiration point the whole time.

🤐 Ezekiel had lived under restricted speech
🔓 That restriction lifts when the news arrives
🔄 His ministry then shifts toward hope
📖 The silence had a clear expiration point

## 🔁 They Shall Know That I Am The LORD

This exact phrase repeats constantly throughout the whole book of Ezekiel.

It names the real purpose behind every warning, sign, and judgment so far.

None of this was ultimately about punishment for its own sake.

Every event, including Ezekiel's own grief, was meant to reveal who God truly is.

The goal all along was recognition, not just correction.

🔁 This phrase repeats throughout Ezekiel
🎯 It names the real purpose behind judgment
🙅 Punishment was never the final goal
📖 Recognition was the goal all along
`.trim();

export const EZEKIEL_TWENTY_FOUR_PERSONAL_SECTIONS = parseEzekielTwentyFourRawNotes(EZEKIEL_TWENTY_FOUR_RAW_NOTES);
