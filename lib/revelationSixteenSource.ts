export type RevelationSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationSixteenRawNotes(rawText: string): RevelationSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 16:${startVerse}` : `Revelation 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Revelation 16 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_SIXTEEN_RAW_NOTES = `# Revelation 16:1-2
# 📯 The First Vial Begins
## 📯 Go Your Ways, And Pour Out The Vials

This command comes from inside the temple described in the last chapter.

No one could enter that temple until the seven plagues were finished.

So this voice speaks from the only one who could still act from inside it, God himself.

The angels are not acting on their own idea here.

They are carrying out a direct order from the throne room.

📯 The voice comes from inside the temple

⏳ No one could enter until now

👑 The order comes from God himself

📖 Angels obey an order, not their own will

## 🤢 A Noisome And Grievous Sore

"Noisome" means foul and disgusting, often describing a horrible smell.

"Grievous" means severe and painful, not minor.

This recalls the sixth plague of Egypt, boils breaking out on people and animals.

That plague struck Pharaoh's own magicians directly.

This plague strikes anyone who chose to worship the beast instead.

🤢 Noisome means foul and disgusting

🔥 Grievous means severe and painful

🐫 This recalls the boils plague in Egypt

📖 Now it strikes those who worshipped the beast

## 🔖 The Men Which Had The Mark Of The Beast

The mark of the beast was already explained back in Revelation chapter thirteen.

It marked people as loyal subjects inside the beast's kingdom.

Receiving it once allowed someone to buy and sell freely.

Now that same mark becomes the very reason for this judgment.

The thing that once offered safety becomes a liability here instead.

🔖 The mark was explained in chapter thirteen

💰 It once allowed buying and selling

⚠️ Now it marks who gets struck

📖 False safety became a real liability

# Revelation 16:3
# 🌊 The Second Vial: Blood In The Sea
## ⚰️ As The Blood Of A Dead Man

Blood from a living body still carries life within it.

Blood from a dead body is corrupted and tied to death.

John specifically compares the sea to that second kind of blood.

The entire sea does not just turn red.

It becomes associated with death itself.

This sea is now saturated with death.

⚰️ Blood from a dead body is corrupted

🌊 This blood connects to death itself

🎨 The sea does more than just turn red

📖 The whole sea now carries death

## 🐟 Every Living Soul Died In The Sea

"Every living soul" here points to every living creature inside the sea itself.

That includes fish, and every other creature living in salt water.

The second trumpet back in Revelation chapter eight already killed a third of sea creatures.

This vial goes much further than that earlier judgment.

Nothing in the entire sea survives this one.

🐟 This means every living sea creature

📯 The second trumpet killed a third earlier

🌊 This vial goes far beyond that one

📖 Nothing in the sea survives this time

# Revelation 16:4-7
# 💧 The Third Vial And A Voice From The Altar
## 💧 Upon The Rivers And Fountains Of Waters

Rivers and fountains supplied the only fresh drinking water in this world.

No plumbing system existed to fall back on if that supply failed.

The sea was already ruined by the vial before this one.

Turning these waters to blood ruins every remaining source of water to drink.

This plague leaves nothing clean left to swallow.

💧 Rivers and fountains meant drinking water

🚱 No backup water system existed

🌊 The sea was already ruined first

📖 Now every water source is gone

## ⏳ Thou Art Righteous, O Lord, Which Art, And Wast, And Shalt Be

This phrase names God as eternal, present now, in the past, and in the future.

That same three part description already appeared back in Revelation chapter one.

The angel is not describing a new quality of God here.

The angel is confirming that this unchanging God judges rightly.

An eternal judge cannot be fooled by time or circumstance.

⏳ This names God as fully eternal

🔁 The same phrase appeared in chapter one

⚖️ The angel confirms God judges rightly

📖 An eternal judge cannot be fooled

## 🩸 They Have Shed The Blood Of Saints And Prophets

This plague is not random or disconnected from a cause.

It directly answers something that already happened, people killing faithful believers and prophets.

The punishment matches the original crime closely.

Those who poured out blood now have only blood left to drink.

⚖️ This judgment directly matches a crime

🩸 They shed the blood of the faithful

🥤 Now blood is all they have to drink

📖 The punishment mirrors what they did

## 🥤 Thou Hast Given Them Blood To Drink

"Worthy" in this verse does not describe something good.

It means fully deserved.

The text does not soften this judgment or explain it away.

It states plainly that this punishment fits the crime committed.

This is justice, not cruelty without cause.

⚖️ Worthy here means fully deserved

🚫 The text does not soften this

🩸 Blood for blood is the punishment

📖 This is justice, not random cruelty

## ❓ Another Out Of The Altar

This voice comes from a new, unnamed speaker, not the angel from the verse before.

Many connect it to the altar itself responding.

Earlier chapters already pictured martyrs crying out from under that same altar.

Whoever speaks here agrees completely with what the angel just said.

Heaven itself confirms that this judgment is fair.

❓ This voice is new and unnamed

🙏 Earlier martyrs cried from this altar

🤝 This voice agrees with the angel

📖 Heaven confirms the judgment is fair

# Revelation 16:8-9
# ☀️ The Fourth Vial: Scorching Heat
## 🔑 Power Was Given Unto Him To Scorch Men With Fire

The sun does not gain this power on its own.

The verse says power was given to it, meaning permission came from outside itself.

Even nature's most basic source of warmth needs that permission before it can harm this severely.

Nothing in creation acts outside of God's ultimate control, not even the sun.

☀️ The sun did not act on its own

🔑 Power was given, meaning permission granted

🌍 Even the sun stays under control

📖 Nothing acts outside of God's authority

## 🤬 Blasphemed The Name Of God

This pain does not turn people toward God.

Instead, it drives them to curse his name.

"Blasphemed" means they spoke against God with open contempt.

They know exactly who controls these plagues and still choose anger over surrender.

🔥 Great pain does not bring repentance

🤬 Blasphemed means cursing God openly

👁️ They know God controls the plagues

📖 They choose anger over surrender

## 🔄 Repented Not To Give Him Glory

"Repented" means turning away from sin and back toward God.

The text says plainly that this never happens here.

Every plague in this chapter gives people a chance to turn.

Every single time, that chance gets refused instead.

🔄 Repented means turning back to God

🚫 This turning never actually happens

⏳ Every plague offers a fresh chance

📖 Every chance gets refused instead

# Revelation 16:10-11
# 🌑 The Fifth Vial: Darkness And Pain
## 👑 The Seat Of The Beast

"Seat" here means a throne or a center of ruling power, not a literal chair.

This plague strikes the very center of the beast's kingdom directly.

Earlier plagues hit nature itself, the sea, the rivers, the sun.

This one goes straight for the throne at the center of the opposition.

👑 Seat means a throne of power

🎯 This plague strikes the center directly

🌍 Earlier plagues struck nature itself

📖 This one targets the opposition's throne

## 🌑 His Kingdom Was Full Of Darkness

This recalls the ninth plague of Egypt, when darkness covered the land for three days.

That darkness struck Pharaoh's kingdom directly.

Israel still had light the entire time, in the very same land.

Here darkness covers the beast's entire kingdom the same way.

The same God who judged Egypt is judging this kingdom now.

🌑 This recalls Egypt's ninth plague

👑 Darkness struck Pharaoh's kingdom then

😈 Now it covers the beast's kingdom

📖 The same God judges both kingdoms

## 😖 They Gnawed Their Tongues For Pain

This pictures agony severe enough that people bite down on their own tongues.

The pain from the earlier sores has not stopped.

Darkness now adds confusion and fear on top of it.

Suffering is stacking here, plague after plague, with no relief between them.

😖 This pictures severe physical agony

🤕 Earlier sores still have not healed

🌑 Darkness adds confusion on top

📖 Suffering stacks without any relief

## 🖐️ Repented Not Of Their Deeds

"Deeds" here points to actual actions, not just a wrong attitude.

The text already said they would not repent of their pain in the verse before.

Now it adds that they would not repent of their actions either.

Both their suffering and their sin fail to produce any real change.

🖐️ Deeds means actions, not attitude

😣 They already refused to repent of pain

💀 Now they refuse to repent of sin

📖 Neither pain nor sin changes them

# Revelation 16:12-16
# ⚔️ The Sixth Vial And The Road To Armageddon
## 🌊 The Great River Euphrates

The Euphrates was one of the great rivers of the ancient world.

It marked the eastern edge of the land promised to Israel.

Ancient invading armies, including Assyria and Babylon, crossed this very river before.

This river already carried real historical danger long before this moment.

🌊 The Euphrates was a major ancient river

🗺️ It marked the promised land's eastern edge

⚔️ Past invasions crossed this river too

📖 This river already carried real danger

## 🚧 The Water Thereof Was Dried Up

A river this wide normally worked like a natural wall.

It blocked large armies from crossing quickly or easily.

Drying it up removes that protection completely.

The road now stands open for whatever comes next.

🚧 Rivers normally blocked armies naturally

🌊 This protection is removed completely

🛣️ The road now lies open

📖 Removing a barrier invites what follows

## 👑 The Way Of The Kings Of The East

This points to kings and armies arriving from beyond that dried river.

The text does not name a specific nation here.

It leaves the identity deliberately open ended.

What matters most is that the path toward this final battle is now clear.

👑 Kings of the east are unnamed

🗺️ They come from beyond the river

❓ Their identity stays open ended

📖 The path to battle is now clear

## 🐸 Three Unclean Spirits Like Frogs

Frogs were the second plague God sent on Egypt long ago.

Jewish law also listed frogs among unclean creatures.

These spirits are compared to frogs because they are repulsive and impure, not harmless.

Their frog like appearance signals exactly what kind of influence they carry.

🐸 Frogs were Egypt's second plague

🚫 Frogs counted as unclean animals

👹 These spirits are impure, not harmless

📖 Their appearance signals their influence

## 🐉 Out Of The Mouth Of The Dragon, And Out Of The Mouth Of The Beast, And Out Of The Mouth Of The False Prophet

The dragon is Satan himself, named plainly back in Revelation chapter twelve.

The beast is the political power described in chapter thirteen.

The false prophet is the religious deceiver introduced later in that same chapter.

All three evil powers now work together at once, out in the open.

🐉 The dragon is Satan himself

👹 The beast is the political power

🗣️ The false prophet deceives through religion

📖 All three work together openly now

## ✨ The Spirits Of Devils, Working Miracles

A real miracle does not automatically prove something comes from God.

These spirits genuinely perform signs, not fake tricks.

Their power is real, but their source is evil.

The miracle itself is never proof enough on its own.

✨ These miracles are genuinely real

👹 Their source is evil, not God

🚫 Miracles alone do not prove truth

📖 Power never replaces a right source

## 🧲 To Gather Them To The Battle Of That Great Day Of God Almighty

These spirits actively work to gather rulers toward one final confrontation.

This is not a battle God gets dragged into.

Evil powers are the ones pulling the nations toward this moment.

God still controls the outcome no matter who calls the armies together.

🧲 Evil spirits gather the nations

⚔️ One final battle is approaching

👹 Evil powers initiate the gathering

📖 God still controls the final outcome

## ✝️ Behold, I Come As A Thief

This sentence suddenly breaks away from the vision itself.

Christ speaks directly here, the same way he did back in chapter three.

A thief gives no warning before arriving.

This warns every reader to stay spiritually ready, not just characters inside the vision.

✝️ Christ speaks directly in this moment

🔁 He used this same warning before

🕵️ A thief gives no advance warning

📖 Readers must stay spiritually ready always

## 👕 Keepeth His Garments, Lest He Walk Naked

Garments here picture righteous character, not literal clothing.

Staying dressed means staying prepared and faithful.

Walking naked here pictures public shame and spiritual unreadiness.

This image calls for readiness, not a literal warning about clothing.

👕 Garments picture righteous character

✅ Staying dressed means staying faithful

😳 Nakedness pictures shame and unreadiness

📖 The warning calls for spiritual readiness

## 🏔️ Called In The Hebrew Tongue Armageddon

"Armageddon" likely comes from a Hebrew phrase meaning the hill of Megiddo.

Megiddo overlooked a major valley where many historic battles already happened in Israel's history.

The name itself carries the weight of countless past conflicts.

John uses a real, familiar battlefield to picture this final confrontation.

🏔️ Armageddon likely means hill of Megiddo

⚔️ Megiddo saw many historic battles

🗺️ The location was real and familiar

📖 A known battlefield pictures this final one

# Revelation 16:17-21
# 🌍 The Seventh Vial: It Is Done
## 🏁 It Is Done

This phrase announces that the wrath poured out across this whole chapter has fully run its course.

Every earlier vial built toward this exact moment.

Nothing is left to finish after this one.

The judgment phase of Revelation reaches its climax right here.

🏁 This announces total completion

🥣 Every earlier vial led to this

⏳ Nothing is left to finish

📖 The judgment reaches its climax here

## ⚡ Voices, And Thunders, And Lightnings

This same combination of voices, thunders, and lightnings already appeared earlier in Revelation.

Each time, it marked a major turning point in the story.

Its return here signals that something enormous is happening again.

This is heaven's own way of marking a historic moment.

⚡ This combination appeared before

🔁 It always marks a turning point

📢 Its return signals something enormous

📖 Heaven marks this as historic

## 🌍 A Great Earthquake, Such As Was Not Since Men Were Upon The Earth

The text goes out of its way to call this the worst earthquake in all of human history.

No earlier disaster compares to it, not even the ones already recorded in Revelation.

This is not exaggeration for effect.

John is marking this as a genuinely unprecedented event.

🌍 This outranks every earthquake in history

📏 Nothing recorded before compares to it

🚫 This is not exaggeration

📖 John marks this as unprecedented

## 🏙️ The Great City Was Divided Into Three Parts

Many connect "the great city" here directly to Babylon, named just a few words later in this same verse.

Its complete collapse happens into three separate pieces.

A city built on pride and power cannot even hold itself together under this judgment.

🏙️ The great city likely means Babylon

💥 It collapses into three pieces

💔 Pride could not hold it together

📖 Power fails under real judgment

## 🧠 Great Babylon Came In Remembrance Before God

This does not mean God had somehow forgotten Babylon until this moment.

"Came in remembrance" means the time has arrived to act on a judgment already decided long ago.

Babylon here represents an entire system of pride, idolatry, and oppression, not only one ancient city.

That system's reckoning has now fully arrived.

🧠 God never actually forgot Babylon

⏰ Remembrance means the time has arrived

🏛️ Babylon pictures a whole corrupt system

📖 That system's reckoning has arrived

## 🍷 The Cup Of The Wine Of The Fierceness Of His Wrath

A cup of wine already pictured judgment earlier in the Old Testament and in Revelation.

Drinking it meant experiencing the full force of whatever was poured inside.

"Fierceness" means this cup is poured out at full strength, not watered down.

Babylon finally drinks exactly what it poured out on others for so long.

🍷 A cup pictures judgment in scripture

💪 Fierceness means full, undiluted strength

⚖️ Babylon drinks what it poured out

📖 Judgment finally matches the crime

## 🏝️ Every Island Fled Away, And The Mountains Were Not Found

Islands and mountains were the most permanent, unmovable features people knew in the ancient world.

This verse says plainly that even those disappear.

Nothing in the physical world is stable enough to resist this judgment.

The old, familiar landscape itself is being undone.

🏝️ Islands and mountains seemed unmovable

💨 Even these disappear completely here

🌍 Nothing physical resists this judgment

📖 The old landscape is being undone

## ⚖️ Every Stone About The Weight Of A Talent

A talent was an ancient unit of weight, close to seventy five pounds.

Hailstones that size are not a minor storm.

Each one falls like a massive weapon dropped from the sky.

This is the heaviest hail judgment described anywhere in the Bible.

⚖️ A talent weighed about seventy five pounds

🧊 These are enormous hailstones, not small ones

💥 Each one falls like a weapon

📖 This is the heaviest hail in scripture

## 🤬 Men Blasphemed God Because Of The Plague Of The Hail

Like every plague before it in this chapter, this one still produces cursing instead of repentance.

Seven total plagues have now fallen, one after another.

Every single time, people respond with blasphemy, never surrender.

This chapter ends exactly the way it began, judgment poured out, and hearts still unmoved.

🤬 This plague produces cursing again

🥣 Seven plagues have now all fallen

💔 Hearts never once turned to God

📖 Judgment poured out, hearts still unmoved
`.trim();

export const REVELATION_SIXTEEN_PERSONAL_SECTIONS = parseRevelationSixteenRawNotes(REVELATION_SIXTEEN_RAW_NOTES);
