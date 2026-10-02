export type LamentationsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLamentationsFiveRawNotes(rawText: string): LamentationsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LamentationsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Lamentations\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Lamentations 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Lamentations\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Lamentations\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Lamentations 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Lamentations 5:${startVerse}` : `Lamentations 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Lamentations 5 sections, received " + sections.length);
  }

  return sections;
}

const LAMENTATIONS_FIVE_RAW_NOTES = `# Lamentations 5:1-3
# 🙏 Remember, O LORD, What Is Come Upon Us
---
## 🙏 Remember, O LORD, What Is Come Upon Us

Remember here does not mean God forgot.

It is a plea for God to look and act.

The whole book has already described disaster after disaster.

This final chapter opens as one last direct prayer to God.

🙏 Remember means look and act

📖 God had not actually forgotten

😢 The book has already shown real disaster

➡️ This chapter becomes one final prayer

---
## 👀 Consider, And Behold Our Reproach

Consider and behold both mean the same thing here.

They ask God to look closely, not just glance.

Reproach means public shame and disgrace in front of other nations.

Jerusalem was once honored, and now it is mocked openly.

👀 Consider and behold both mean look closely

😳 Reproach means public shame and disgrace

🌍 Other nations were watching and mocking

📖 Honor had turned into open disgrace

---
## 🏞️ Our Inheritance Is Turned To Strangers

Inheritance means the family land each tribe received long ago.

That land was a gift tied to God's promise.

Strangers here means foreign people who now control that same land.

Losing it felt like losing the promise itself.

🏞️ Inheritance means land each family received

🤝 It was tied to God's promise

🌍 Strangers now control that same land

📖 Losing it felt like losing the promise

---
## 🏠 Our Houses To Aliens

Aliens here means foreign people living in what used to be Israelite homes.

These were not visitors or guests.

Many houses sat empty from death or exile, and strangers simply moved in.

Even shelter itself no longer belonged to the people who built it.

🏠 Aliens means foreigners now living in their homes

🚪 These were not guests or visitors

⚰️ Many houses sat empty from death or exile

📖 Even shelter no longer belonged to them

---
## 👶 We Are Orphans And Fatherless

Many fathers had died in the war or the siege itself.

Calling the whole nation fatherless describes a shared, communal loss.

Not everyone was a literal orphan, but the loss felt that total.

The image makes the grief easier to feel than numbers could.

👶 Fatherless describes massive loss of life

⚔️ Many fathers died in war or siege

🤝 The whole nation shares this one loss

📖 The image makes the grief feel real

---
## 👩 Our Mothers Are As Widows

A widow in this culture had little legal protection and no income.

Comparing mothers to widows pictures women left with no provider.

Husbands were dead, missing, or taken away in exile.

The nation itself now resembles a house with no one left to lead it.

👩 Widows had little protection and no income

💔 Mothers were left with no provider

🧳 Husbands were dead, missing, or exiled

📖 The nation resembles a home with no leader

# Lamentations 5:4-6
# 💧 We Have Drunken Our Water For Money
---
## 💧 We Have Drunken Our Water For Money

Water from a well or river was normally free and shared by everyone.

Now the people had to pay a foreign power just to drink it.

This was not a small inconvenience.

It meant losing control over the most basic resource there is.

💧 Water was normally free and shared

💰 They now had to pay to drink

🏜️ This was no small inconvenience

📖 Basic survival itself now had a price

---
## 🪵 Our Wood Is Sold Unto Us

Wood for cooking and warmth came from the land's own forests.

Selling it back to the people who once owned that land is a cruel reversal.

Every daily task now cost money that used to cost nothing.

Occupation reached into the smallest corners of ordinary life.

🪵 Wood once came freely from their land

🔁 Selling it back is a cruel reversal

📉 Daily tasks now cost money instead of nothing

📖 Occupation touched the smallest parts of life

---
## ⛓️ Our Necks Are Under Persecution

Necks under persecution pictures an ox bent under a heavy yoke.

A yoke is the wooden bar laid across an animal's neck to force labor.

The people describe themselves the same way, bent under forced labor.

This is not a figure of speech about stress alone.

⛓️ A yoke sat across an animal's neck

🐂 It forced the animal into labor

😣 The people felt bent the same way

📖 This describes forced labor, not stress alone

---
## 😓 We Labour, And Have No Rest

The law had promised regular rest, including a weekly Sabbath.

Under occupation, that rest had disappeared completely.

Work never stopped, with no built in pause to recover.

Losing rest was its own kind of loss, separate from the labor itself.

😓 The law had promised regular rest

🚫 That rest disappeared under occupation

♾️ Work continued without any pause

📖 Losing rest was its own kind of loss

---
## 🤝 We Have Given The Hand To The Egyptians

Giving the hand was an ancient gesture of pledging loyalty or submission.

Judah had done this with Egypt and also with Assyria.

Both were desperate attempts to buy protection or food through alliance.

Trusting foreign powers instead of God had failed both times.

🤝 Giving the hand meant pledging loyalty

🇪🇬 Judah tried this with Egypt

🏹 They tried the same with Assyria

📖 Trusting foreign powers failed both times

---
## 🍞 To Be Satisfied With Bread

Satisfied with bread means simply having enough food to survive.

This was not a request for luxury or comfort.

A once proud nation was reduced to begging other countries for basic meals.

That reduction is part of what made the humiliation so complete.

🍞 Satisfied with bread meant basic survival

🙏 This was not a request for luxury

😔 A proud nation was reduced to begging

📖 That reduction completed the humiliation

# Lamentations 5:7-9
# 📜 Our Fathers Have Sinned, And Are Not
---
## 📜 Our Fathers Have Sinned, And Are Not

Are not here means the earlier generation has already died.

Their sin was real and it stretched back years before this disaster.

The people are not denying their own guilt, as verse sixteen will admit.

They are naming how long this pattern of sin had been building.

📜 Are not means that generation has died

⚠️ Their sin went back years before this

🙏 The people still admit their own guilt

📖 This names how long the pattern ran

---
## ⚖️ We Have Borne Their Iniquities

Iniquities here means the guilt and consequences of sin, not just the acts.

Consequences from earlier generations had landed on the people now alive.

This matches warnings given centuries earlier in the law of Moses.

A nation's sin rarely stays contained to just one generation.

⚖️ Iniquities means the guilt of sin

⏳ Consequences landed on the current generation

📜 The law of Moses had warned of this

📖 A nation's sin rarely stays contained

---
## 🔄 Servants Have Ruled Over Us

Servants here means people from the lowest social class.

Under normal order, servants did not govern anyone.

Conquest flipped that order completely.

Former servants now commanded people who once ruled over them.

The reversal itself was part of the shame, not just the loss of freedom.

🔄 Servants were normally the lowest class

👑 They did not normally govern anyone

⚔️ Conquest flipped that order completely

📖 The reversal added to the shame

---
## 🙅 There Is None That Doth Deliver Us Out Of Their Hand

Deliver means to rescue someone from danger or captivity.

The people had looked for a human rescuer and found none.

Egypt could not help, and no other nation stepped in either.

This verse states a hard fact before the prayer turns back to God.

🙅 Deliver means to rescue from danger

🔍 They searched for a human rescuer

🚫 No nation stepped in to help

➡️ The prayer later turns back to God

---
## 🏃 We Gat Our Bread With The Peril Of Our Lives

Gat is an old form of the word got.

Getting bread should be an ordinary, safe task.

Here it meant risking death just to find something to eat.

Even the simplest daily need had become genuinely dangerous.

🏃 Gat is an old word for got

🍞 Getting bread is normally safe

⚠️ Here it risked death instead

📖 Even eating had become dangerous

---
## ⚔️ Because Of The Sword Of The Wilderness

The wilderness here means the open, unguarded country outside the city.

Sword of the wilderness pictures armed raiders roaming that open land.

People had to leave the city's walls to gather any food at all.

Every trip outside meant facing armed strangers with no protection.

⚔️ Sword of the wilderness means armed raiders

🏜️ The wilderness was open, unguarded land

🚶 People left the walls just to eat

📖 Every trip outside risked attack

# Lamentations 5:10-12
# 🔥 Our Skin Was Black Like An Oven
---
## 🔥 Our Skin Was Black Like An Oven

This does not describe sunburn or dirt on the skin.

Long starvation can cause fever that darkens and damages the skin.

Comparing it to an oven pictures heat burning from the inside out.

The famine was not just hunger, it was a slow physical breakdown.

🔥 This is not sunburn or dirt

🤒 Starvation caused fever that darkened skin

🍞 An oven pictures heat from inside

📖 Famine caused real physical breakdown

---
## 🌾 Because Of The Terrible Famine

Terrible here means extreme, not simply unpleasant.

This famine came from a long siege that cut off every food supply.

The word choice signals this was far past ordinary hunger.

Chapter four already described how severe this same famine became.

🌾 Terrible here means extreme

🚧 The siege cut off every food supply

📍 This went far past ordinary hunger

📖 Chapter four already described its severity

---
## 😢 They Ravished The Women In Zion

Ravished means raped, a brutal reality of ancient warfare.

Zion refers to Jerusalem, the city under direct attack.

The verse does not soften or hide what actually happened to these women.

Naming it plainly is part of being honest about the cost of war.

😢 Ravished means raped

🏙️ Zion refers to Jerusalem itself

🗣️ The verse does not hide this

📖 Naming it plainly is honest about war

---
## 🏘️ And The Maids In The Cities Of Judah

Maids here means young, unmarried women.

Cities of Judah means towns outside the capital, scattered across the region.

This shows the violence reached far beyond Jerusalem alone.

No town was distant enough to be spared from the invasion.

🏘️ Maids means young, unmarried women

🗺️ Cities of Judah means towns beyond the capital

📍 The violence reached far beyond Jerusalem

📖 No town was distant enough to be spared

---
## ⚰️ Princes Are Hanged Up By Their Hand

Princes here means Judah's own leaders and officials.

Hanged up by their hand describes a brutal public execution.

Public executions of leaders were meant to humiliate, not just kill.

Conquerors wanted everyone watching to see power completely erased.

⚰️ Princes means Judah's leaders and officials

🗣️ This describes a brutal public execution

😳 Public deaths were meant to humiliate

📖 Watchers saw power completely erased

---
## 👴 The Faces Of Elders Were Not Honoured

Elders normally received automatic respect in this culture.

Not honoured means that respect was stripped away without exception.

Age and status, which once guaranteed protection, no longer mattered at all.

Conquest treated every generation the exact same way.

👴 Elders normally received automatic respect

🚫 Not honoured means that respect vanished

📛 Age no longer guaranteed any protection

📖 Conquest treated every generation the same

# Lamentations 5:13-15
# ⚙️ They Took The Young Men To Grind
---
## ⚙️ They Took The Young Men To Grind

Grinding grain by hand with a millstone was ordinary, exhausting work.

In this culture, it was usually done by women or household servants.

Forcing young men into it was meant as a public humiliation.

Their strength was turned into forced, degrading labor instead.

⚙️ Grinding grain by hand was exhausting work

👩 It was normally done by women or servants

😔 Forcing young men into it humiliated them

📖 Their strength became forced labor instead

---
## 🪵 And The Children Fell Under The Wood

Children here were forced to carry heavy loads of firewood.

Fell under the wood pictures them collapsing from exhaustion under that weight.

This was labor far too heavy for a child's body.

Even the youngest were not spared from the occupation's demands.

🪵 Children carried heavy loads of firewood

😣 They collapsed from exhaustion under the weight

👶 This labor was too heavy for a child

📖 Even the youngest were not spared

---
## 🚪 The Elders Have Ceased From The Gate

The city gate was where elders once gathered to settle disputes.

It worked something like a courthouse and a town square combined.

That gathering had completely stopped under occupation.

A center of order and justice for the city had simply gone silent.

🚪 The gate was where elders settled disputes

🏛️ It worked like a courthouse and square

🔇 That gathering had completely stopped

📖 A center of order had gone silent

---
## 🎵 The Young Men From Their Musick

Musick is an old spelling of music.

Young men's singing and celebration were a normal part of daily life.

That sound had stopped along with everything else that once felt normal.

Silence itself became one more sign of how much had changed.

🎵 Musick is an old spelling of music

🎶 Young men's singing was once normal

🔇 That sound had completely stopped

📖 Silence became its own sign of loss

---
## 💔 The Joy Of Our Heart Is Ceased

Ceased means stopped entirely, not just reduced.

This is a stronger claim than simply feeling less happy.

The people describe joy itself as gone, not dimmed.

Grief this deep leaves no room left for celebration.

💔 Ceased means stopped entirely

📉 This is stronger than feeling less happy

🚫 Joy itself was described as gone

📖 Deep grief leaves no room for celebration

---
## 💃 Our Dance Is Turned Into Mourning

Dance here pictures weddings, festivals, and other joyful gatherings.

Mourning pictures loud public grieving, the opposite of celebration.

The verse describes a complete reversal, not a partial decline.

Every occasion for joy had become an occasion for grief instead.

💃 Dance pictures weddings and festivals

😭 Mourning pictures loud public grieving

🔄 This is a complete reversal

📖 Every joyful occasion became a grieving one

# Lamentations 5:16-18
# 👑 The Crown Is Fallen From Our Head
---
## 👑 The Crown Is Fallen From Our Head

A crown here pictures honor and dignity, not only a king's actual crown.

Fallen means that honor is completely gone, not just damaged.

The nation once held a respected place among other peoples.

That standing had collapsed along with the city itself.

👑 A crown pictures honor and dignity

📉 Fallen means that honor is completely gone

🌍 The nation once held respected standing

📖 That standing collapsed with the city

---
## ⚠️ Woe Unto Us, That We Have Sinned

Woe is an old word for deep sorrow or warning of disaster.

This line names sin directly as the reason for the suffering.

The people are not blaming bad luck or only blaming their enemies.

Honest confession sits right in the middle of this lament.

⚠️ Woe is an old word for deep sorrow

🙋 This names sin as the real reason

🚫 They are not blaming only bad luck

📖 Honest confession sits inside this lament

---
## 😔 For This Our Heart Is Faint

Faint here means weak and overwhelmed, not simply tired.

Grief this heavy drains a person physically, not only emotionally.

The heart failing pictures exhaustion from carrying sorrow for too long.

The body itself shows what the loss has done.

😔 Faint means weak and overwhelmed

🫀 Grief drains a person physically too

⏳ This pictures exhaustion from carrying sorrow

📖 The body shows what loss has done

---
## 👁️ For These Things Our Eyes Are Dim

Dim here means worn out from crying for a long time.

Eyes growing dim pictures tears that never really stopped.

This matches the same image used earlier in chapter two.

The grief in this book is not brief or occasional.

👁️ Dim means worn out from crying

💧 It pictures tears that never stopped

🔁 Chapter two used this same image

📖 This grief was not brief or occasional

---
## 🏔️ Because Of The Mountain Of Zion, Which Is Desolate

Mountain of Zion refers to the hill where the temple once stood.

Desolate means completely empty and abandoned.

The most sacred site in the nation now sat in total ruin.

This was the spiritual center of the whole book's grief.

🏔️ Mountain of Zion means the temple's hill

🏚️ Desolate means empty and abandoned

🙏 The most sacred site now sat ruined

📖 This was the grief's spiritual center

---
## 🦊 The Foxes Walk Upon It

Foxes moving freely over ruins is a picture of total abandonment.

A place once filled with priests and worshippers now holds wild animals instead.

No rebuilding had started yet when this was written.

The image leaves the reader sitting in the ruin, not past it.

🦊 Foxes picture total abandonment

🙏 Priests once filled this same place

🏗️ No rebuilding had started yet

📖 The image leaves the reader in the ruin

# Lamentations 5:19-22
# ♾️ Thou, O LORD, Remainest For Ever
---
## ♾️ Thou, O LORD, Remainest For Ever

This line shifts the focus away from the ruined city for a moment.

Everything else in this chapter has fallen apart or disappeared.

God's existence and rule are named as the one thing that has not.

That contrast is the turning point of the whole prayer.

♾️ God's rule is named as unchanging

🏙️ Everything else has fallen apart

🔄 This verse shifts the chapter's focus

📖 This contrast becomes the prayer's turning point

---
## 👑 Thy Throne From Generation To Generation

Throne pictures a ruler's authority, not just a physical chair.

Judah's own earthly throne had just been destroyed in this disaster.

God's throne is described as continuing without any interruption.

One kind of rule had ended, while another never will.

👑 Throne pictures a ruler's authority

💔 Judah's own throne had just fallen

♾️ God's throne continues without interruption

📖 One rule ended while another never will

---
## ❓ Wherefore Dost Thou Forget Us For Ever

This question echoes the plea to remember back in verse one.

It is an honest complaint, not a denial of faith.

The people ask how long this silence from God will last.

Scripture allows this kind of raw question inside real prayer.

❓ This echoes the plea in verse one

🗣️ It is an honest complaint, not unbelief

⏳ They ask how long the silence will last

📖 Scripture allows raw questions in prayer

---
## 💔 And Forsake Us So Long Time

Forsake means to abandon completely, leaving nothing behind.

So long time underlines just how drawn out this suffering had felt.

The question is not rhetorical flattery toward God.

It is a genuine request for God to explain how long this will continue.

💔 Forsake means to abandon completely

⏳ So long time stresses the long wait

🗣️ This is not empty flattery

📖 It asks God how long this continues

---
## 🔄 Turn Thou Us Unto Thee, O LORD

Turn here is the same word often translated repent elsewhere in scripture.

The people ask God to start the turning, not themselves alone.

This matches a pattern seen in Hosea and Jeremiah as well.

Real repentance is pictured here as something God enables first.

🔄 Turn here means something close to repent

🙏 They ask God to start the turning

📜 Hosea and Jeremiah use this same pattern

📖 God enables real repentance first

---
## ➡️ And We Shall Be Turned

This line follows directly from the request just before it.

The people's turning depends on God's action, not the other way around.

Human effort alone could not undo this kind of disaster.

The prayer places its hope in God's power, not their own strength.

➡️ This follows the request before it

🙏 Their turning depends on God's action

🚫 Human effort alone could not fix this

📖 Hope rests in God's power, not theirs

---
## 🕰️ Renew Our Days As Of Old

As of old points back to earlier years of peace and blessing.

Renew means restore, not literally turn back time itself.

The request pictures a return to covenant life as it was meant to be.

This is hope aimed forward, even while grief still remains present.

🕰️ As of old means earlier years of blessing

🔄 Renew means restore, not reverse time

🤝 This pictures a return to covenant life

📖 Hope points forward even inside grief

---
## ⚡ But Thou Hast Utterly Rejected Us

This final line does not pretend the pain is already resolved.

Utterly rejected states the current reality plainly, without softening it.

Wroth is an old word meaning intensely angry.

The book ends here without a tidy, comfortable conclusion.

Honest prayer can hold both real hope and real pain in the same breath.

⚡ This line does not pretend pain is resolved

😠 Wroth is an old word for intensely angry

📕 The book ends without a tidy conclusion

📖 Honest prayer holds both hope and pain
`.trim();

export const LAMENTATIONS_FIVE_PERSONAL_SECTIONS = parseLamentationsFiveRawNotes(LAMENTATIONS_FIVE_RAW_NOTES);
