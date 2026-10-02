export type EzekielSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielSevenRawNotes(rawText: string): EzekielSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 7:${startVerse}` : `Ezekiel 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 7 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_SEVEN_RAW_NOTES = `# Ezekiel 7:1-4
# ⚖️ The End Has Come
---
## 🗺️ Thus Saith The Lord GOD Unto The Land Of Israel

God speaks this message straight to the land itself.

He is not just addressing one guilty person.

The ground, the cities, and the people all share the coming judgment.

This sets up a warning aimed at the whole nation at once.

🗺️ The message targets the whole land
👥 Not only one person's sin
🏙️ Cities and people share this judgment
📖 The whole nation stands under this word

## 🔁 An End, The End Is Come Upon The Four Corners Of The Land

"An end" is said twice here.

Saying it twice makes the warning sound final.

"The four corners of the land" means the entire territory.

It is not describing a literal shape.

No region of Israel is left out of this judgment.

🔁 End is repeated for emphasis
🗺️ Four corners means the whole territory
🙅 No region is left out
📖 This phrase opens the whole chapter's warning

## ⚖️ Judge Thee According To Thy Ways

"Judge" here means God will weigh Israel's own conduct.

This is not random disaster falling from nowhere.

God ties the coming punishment directly to real choices Israel made.

The judgment fits the crime instead of arriving blindly.

⚖️ Judge means weighing real conduct
🚫 This is not random disaster
🔗 Punishment is tied to real choices
📖 The judgment matches what was earned

## 🙅 All Thine Abominations

"Abominations" means things God finds utterly detestable.

In Ezekiel this word almost always points at idol worship.

Israel had filled the land with shrines to other gods.

That specific betrayal sits behind this whole chapter's anger.

🙅 Abominations means utterly detestable acts
🛐 The word usually points at idols
⛩️ Israel filled the land with shrines
📖 This betrayal drives the chapter's anger

## 😔 Mine Eye Shall Not Spare, Neither Will I Have Pity

An eye that will not spare is a picture of a judge who will not look away.

This is legal language, not an emotional outburst.

God is describing a verdict that will actually be carried out.

Mercy is not being denied forever, but it will not stop this sentence.

😔 An eye that will not look away
⚖️ This is legal language, not rage
📜 The verdict will be carried out
📖 Mercy will not stop this sentence

## 📖 Ye Shall Know That I Am The LORD

This exact line repeats constantly through the whole book of Ezekiel.

Judgment here is never only about punishment for its own sake.

It exists to prove something to people who had stopped believing it.

God wants Israel to recognize him as LORD when everything else has failed.

📖 This line repeats often in Ezekiel
🎯 Judgment is not only punishment
🙏 It proves who God really is
➡️ Knowing God is the real goal

# Ezekiel 7:5-9
# 🔁 The End Repeated Again
---
## 💥 An Evil, An Only Evil, Behold, Is Come

"An only evil" means a disaster with nothing else like it.

This is not one trouble among many troubles Israel has survived before.

The wording rules out any comparison to past hardships.

What is coming stands completely alone in its severity.

💥 Only evil means nothing else compares
🚫 Not one more ordinary hardship
📏 No past trouble matches this one
📖 This disaster stands completely alone

## 👀 It Watcheth For Thee

The end is pictured here as something alive and waiting.

"Watcheth" means it has been watching Israel closely, like a hunter.

This is not a sudden accident arriving out of nowhere.

Judgment has been patiently stalking its moment to arrive.

👀 The end is pictured as watching
🦁 Watcheth suggests a hunter stalking prey
⏳ It has waited for its moment
📖 Judgment is patient, not sudden

## 🌅 The Morning Is Come Unto Thee

"Morning" usually signals hope, a fresh new start.

Here morning brings judgment instead of relief.

The normal picture of a new day gets turned upside down.

This is the day Israel will not want to see arrive.

🌅 Morning usually means hope and relief
🔄 Here it brings judgment instead
😟 The normal picture is reversed
📖 This is a day no one wants

## 🏔️ Not The Sounding Again Of The Mountains

Mountains in Israel often echoed with shouts of joy at harvest time.

That joyful sound will not be heard this time.

The usual celebration that filled the hills will go silent.

Silence replaces the songs that normally rang across the land.

🏔️ Mountains once echoed with joy
🎶 Harvest shouts filled the hills
🔇 That joyful sound goes silent
📖 Celebration is replaced by silence

## ⏳ Now Will I Shortly Pour Out My Fury Upon Thee

"Shortly" means soon, with no more delay.

God had warned Israel through prophets for generations already.

The waiting period that Israel grew comfortable with is now over.

What was postponed for so long is about to happen at once.

⏳ Shortly means soon, no more delay
📢 Warnings had come for generations
😌 Israel grew comfortable with the wait
📖 The postponed judgment now arrives

## 🗡️ The LORD That Smiteth

"Smiteth" is an old word meaning strikes or attacks directly.

This title is new, added right here in verse nine.

God is not described only as a judge who decides a sentence.

He is described as the one personally carrying out the blow.

🗡️ Smiteth means strikes directly
🆕 This title appears here first
⚖️ God is more than a judge
📖 He personally carries out the blow

# Ezekiel 7:10-13
# 🌾 Buying And Selling Will Not Matter
---
## 🌱 The Rod Hath Blossomed, Pride Hath Budded

A rod here pictures a branch that has grown to its full shape.

"Blossomed" and "budded" describe something reaching its final, ripe stage.

Israel's pride and oppression have fully matured, like fruit ready to pick.

What was small and growing has now reached the point of harvest.

🌱 A rod pictures a growing branch
🌼 Blossomed means fully grown and ripe
💔 Pride has reached its final stage
📖 Ripe pride is ready for harvest

## 🔗 Violence Is Risen Up Into A Rod Of Wickedness

Violence itself has become the very power that rules the land.

It is pictured here as a rod, a symbol of authority and control.

Instead of good leaders holding that rod, violence now holds it.

Wickedness has taken over the role that justice should have filled.

🔗 Violence now acts like a ruler
👑 A rod pictures authority and control
🙅 Wickedness replaced true justice
📖 Violence rules where justice should

## 🔇 Neither Shall There Be Wailing For Them

Wailing was the loud, public mourning done for the dead.

Losing that mourning was considered a deep and lasting disgrace.

So many will die that proper grief will not even be possible.

Death on this scale leaves no room left for mourning rituals.

🔇 Wailing was loud public mourning
💔 Skipping it was a real disgrace
📊 Too many will die to mourn
📖 Grief itself becomes a casualty

## 💰 Let Not The Buyer Rejoice, Nor The Seller Mourn

Normally a buyer felt joy and a seller felt a small loss.

This coming disaster will erase that whole difference completely.

Neither side will actually get to keep what the deal was about.

Ordinary business transactions stop meaning anything in the face of exile.

💰 Buying normally brought real joy
😢 Selling normally brought a small loss
🙅 Neither side keeps what they gained
📖 Exile erases ordinary business meaning

## 🏡 The Seller Shall Not Return To That Which Is Sold

Israel's law normally let sold land return to its original family at the Jubilee.

This verse says that normal process will not happen this time.

Exile will remove people from the land long before any Jubilee arrives.

A law meant to protect families becomes meaningless under this judgment.

🏡 Land law allowed a later return
📅 That return happened at the Jubilee
🚫 Exile cancels that whole process
📖 A protective law becomes meaningless

## 💪 Neither Shall Any Strengthen Himself In The Iniquity Of His Life

"Strengthen himself" means find safety or support for the life he is living.

No one will be able to lean on sin and still feel secure.

The false confidence people built on wrongdoing will collapse completely.

Nothing sinful will be able to hold anyone up anymore.

💪 Strengthen himself means find real safety
🚫 Sin cannot offer true security
🏚️ False confidence will collapse
📖 Wrongdoing can no longer hold anyone up

# Ezekiel 7:14-18
# ⚔️ Sword, Famine, And Despair
---
## 📯 None Goeth To The Battle

A trumpet call normally meant soldiers would gather for war.

Here the trumpet sounds but no one answers the call.

Fear and hopelessness have already defeated the army before any fight starts.

The battle is lost in people's hearts long before it begins.

📯 A trumpet normally calls soldiers
🔇 This time no one answers
😨 Fear defeats the army first
📖 The battle is lost in advance

## ⚔️ The Sword Is Without, And The Pestilence And The Famine Within

Every possible location becomes dangerous in this one short line.

The sword describes the danger of open battle outside the city.

Pestilence and famine describe sickness and hunger trapped inside the city walls.

There is no safe direction left to run.

⚔️ Sword describes danger outside the city
🦠 Pestilence describes disease inside the walls
🍞 Famine describes hunger inside too
📖 No safe direction is left

## 🕊️ Like Doves Of The Valleys

Doves make a low, constant moaning sound.

Survivors fleeing to the mountains are compared to these grieving birds.

The comparison pictures people trembling, helpless, and mourning at once.

Even those who escape death still carry its weight with them.

🕊️ Doves make a mourning sound
⛰️ Survivors flee to the mountains
😢 The image shows grief and fear
📖 Escaping death still leaves its weight

## 🦵 All Knees Shall Be Weak As Water

This is a common Old Testament picture of total terror.

Weak knees describe legs that can no longer hold a person up.

Fear here is not just an emotion but a physical collapse.

The whole body gives out under the weight of what is coming.

🦵 Weak knees picture total terror
💧 Water describes legs giving way
😱 Fear becomes a physical collapse
📖 The body fails under the weight

## 👕 Gird Themselves With Sackcloth

Sackcloth was a rough, uncomfortable cloth worn only during deep grief.

Wearing it on purpose signaled a person's sorrow to everyone around them.

It was never comfortable clothing, and that was exactly the point.

Choosing pain over comfort showed how real the mourning was.

👕 Sackcloth was rough mourning cloth
👀 It signaled sorrow to everyone
😣 It was never comfortable on purpose
📖 Discomfort proved the grief was real

## 💇 Baldness Upon All Their Heads

Shaving the head was another ancient custom tied to mourning.

Hair was normally a sign of health, strength, or beauty.

Removing it on purpose showed that nothing about normal life mattered anymore.

Grief had taken over every visible part of a person's appearance.

💇 Shaved heads marked deep mourning
💪 Hair usually signaled strength or health
🚫 Removing it showed nothing felt normal
📖 Grief covered every visible part of life

# Ezekiel 7:19-22
# 💰 Silver And Gold Will Not Save Them
---
## 🪙 They Shall Cast Their Silver In The Streets

Silver and gold were normally the safest things a person could own.

Here people throw that same wealth away like garbage.

In a true crisis, money cannot buy food, safety, or rescue.

What people trusted most turns out to be completely useless.

🪙 Silver was normally trusted wealth
🗑️ Here it gets thrown away
🚫 Money cannot buy real rescue
📖 Trusted wealth turns out useless

## 🧱 The Stumblingblock Of Their Iniquity

A stumblingblock is anything that causes a person to trip and fall.

Here wealth itself becomes the thing that trips Israel into sin.

Gold and silver were used to make idols instead of staying honest tools.

The very riches God allowed became the path toward betraying him.

🧱 Stumblingblock means something that trips you
💰 Wealth itself became the trap here
🗿 Gold and silver built idols
📖 Riches became a path to betrayal

## 💎 The Beauty Of His Ornament

This phrase points to fine gold jewelry Israel once wore with pride.

God himself had given Israel reasons to be proud and blessed.

Instead of staying a sign of blessing, that same gold shaped idols.

A gift meant for honor became the material for betrayal.

💎 Ornament means fine gold jewelry
🎁 It began as a sign of blessing
🗿 It was reshaped into idols
📖 A gift became a betrayal

## 🏴 Into The Hands Of The Strangers For A Prey

"Strangers" here means foreign invaders, not friendly visitors.

"Prey" and "spoil" both describe property taken by force in war.

Everything Israel once owned will pass into enemy hands instead.

Losing it to outsiders made the shame of this judgment public.

🏴 Strangers means foreign invaders
⚔️ Prey means property seized in war
🤲 Israel's own things pass to enemies
📖 Outsiders make the shame public

## 🙈 My Face Will I Turn Also From Them

Turning away one's face is an old way of describing withdrawn favor.

God is not physically leaving, but his protection is lifted.

Without that covering, nothing stands between Israel and the coming danger.

A withdrawn face is as serious as a withdrawn defense.

🙈 Turning the face means withdrawn favor
🛡️ God's protection is lifted here
⚠️ Nothing shields Israel from danger
📖 A withdrawn face removes real defense

## 🕍 My Secret Place

"My secret place" refers to the innermost room of the temple.

Only the high priest could enter that room, and only once a year.

Here foreign robbers walk straight into that most sacred space.

A place meant to stay untouched by outsiders is being violated completely.

🕍 Secret place means the temple's inner room
👤 Normally only the high priest entered
🏴 Foreign robbers walk in instead
📖 The most sacred space is violated

# Ezekiel 7:23-27
# ⛓️ Every Leader Left Helpless
---
## ⛓️ Make A Chain

God tells Ezekiel to make a literal chain as a visible sign.

A chain pictures the captivity that is about to fall on Israel.

Ezekiel's actions often preached a message before his words did.

This simple object becomes a preview of the coming exile.

⛓️ A chain is a visible sign
🔒 It pictures coming captivity
🎭 Ezekiel often acted out his message
📖 The object previews the coming exile

## 🌍 The Worst Of The Heathen

"The worst of the heathen" points to the most brutal foreign nation available.

Many scholars connect this directly to the rising Babylonian empire.

God uses this harsh nation as the tool carrying out his judgment.

The instrument of punishment comes from completely outside Israel's own borders.

🌍 Heathen here means a foreign nation
🏛️ Many scholars point to Babylon
🔨 God uses them as his tool
📖 Judgment arrives from outside Israel

## 👑 The Pomp Of The Strong To Cease

"Pomp" means the proud display powerful men liked to show off.

Strong leaders in Israel trusted in status, wealth, and public honor.

All of that outward display is about to be stripped away completely.

What people once admired will simply stop existing.

👑 Pomp means proud public display
💪 Strong leaders trusted their status
🪓 That display is stripped away
📖 What people admired simply ends

## 🕊️ They Shall Seek Peace, And There Shall Be None

People will desperately search for safety once the disaster finally hits.

That search will come up completely empty every single time.

The text does not soften this with any hint of relief.

Searching for peace too late does not bring peace back.

🕊️ People will search for safety
🔍 The search will come up empty
🚫 No relief softens this line
📖 Peace sought too late never comes

## 📢 Rumour Shall Be Upon Rumour

A rumour here means an unconfirmed, panicked report spreading through the city.

Piling rumour upon rumour pictures total chaos and confusion everywhere.

No one can tell which report to actually trust anymore.

Fear itself starts spreading faster than any real information can.

📢 Rumour means an unconfirmed report
🌀 Rumours piling up picture chaos
❓ No one knows what to trust
📖 Fear spreads faster than facts

## 🧓 The Law Shall Perish From The Priest, And Counsel From The Ancients

Three normal sources of guidance are named together in this one verse.

Prophets gave visions, priests taught the law, and elders gave counsel.

This verse says all three will fail to help at the exact same time.

Every normal place people turned to for direction goes silent together.

🧓 Three sources of guidance are named
🔮 Prophets, priests, and elders each had a role
🔇 All three fail at once
📖 Every normal direction goes silent

## 👑 The King Shall Mourn, And The Prince Shall Be Clothed With Desolation

"Clothed with desolation" pictures despair wrapping around a person like a garment.

Even the king, the highest person in the land, is not spared this grief.

The ordinary people's hands are described as trembling right alongside him.

No rank in the whole nation stands above this coming sorrow.

👑 Desolation is pictured as clothing
😟 Even the king shares the grief
🤝 Common people tremble right with him
📖 No rank stands above this sorrow

## ⚖️ According To Their Deserts Will I Judge Them

"Deserts" here means what a person has actually earned through their own choices.

This closing line ties directly back to the chapter's opening warning.

The judgment was never random or unfair from the very start.

Israel receives exactly what their own actions had already decided.

⚖️ Deserts means what someone has earned
🔗 This echoes the chapter's opening line
🚫 Nothing here is random or unfair
📖 Israel receives what their choices decided
`.trim();

export const EZEKIEL_SEVEN_PERSONAL_SECTIONS = parseEzekielSevenRawNotes(EZEKIEL_SEVEN_RAW_NOTES);
