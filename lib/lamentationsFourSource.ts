export type LamentationsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLamentationsFourRawNotes(rawText: string): LamentationsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LamentationsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Lamentations\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Lamentations 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Lamentations\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Lamentations\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Lamentations 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Lamentations 4:${startVerse}` : `Lamentations 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Lamentations 4 sections, received " + sections.length);
  }

  return sections;
}

const LAMENTATIONS_FOUR_RAW_NOTES = `# Lamentations 4:1-3
# 🥇 How Is The Gold Become Dim
---
## 🥇 How Is The Gold Become Dim

Gold does not naturally go dim or dark over time.

"Dim" here is a sign something has gone deeply wrong.

The verse opens by comparing Jerusalem's glory to shining gold.

That same glory is now compared to gold gone dull.

🥇 Gold does not naturally go dim

⚠️ Dim pictures something badly wrong

👑 Jerusalem's glory once shone like gold

📖 That glory is now compared to dullness

---
## 🏛️ The Stones Of The Sanctuary

The sanctuary was the holy part of the temple where only priests could serve.

Its stones were meant to stay set in place, honored and untouched.

Now those same stones lie scattered at the top of every street.

A sacred building has been torn apart and dumped out in public.

🏛️ Sanctuary meant the temple's holy section

🪨 Its stones were meant to stay set

🛣️ They now lie scattered in the streets

📖 A sacred building was torn apart publicly

---
## 👑 The Precious Sons Of Zion

Sons of Zion means the people of Jerusalem, not literal children only.

Comparable to fine gold means they were once treated as valuable and rare.

A whole population is pictured here as a treasure worth protecting.

That is the measure the next line will use for comparison.

👑 Sons of Zion means Jerusalem's people

💛 Fine gold pictures something valuable and rare

🏙️ The whole population counted as treasure

📖 That value sets up the comparison ahead

---
## 🏺 Esteemed As Earthen Pitchers

An earthen pitcher was a cheap clay jar made for everyday use.

Potters made thousands of these, and a broken one was never missed.

People once worth gold are now treated as worthless clay.

The comparison measures exactly how far their value has fallen.

🏺 An earthen pitcher was a cheap clay jar

🔨 Potters made these jars by the thousand

📉 Gold worth has dropped to clay worth

📖 The fall in value is measured exactly

---
## 🐺 The Sea Monsters Draw Out The Breast

"Sea monsters" here likely means jackals, wild animals common near Jerusalem.

Even jackals nurse their own pups without hesitation.

The verse starts with an animal that gets parenting right.

That comparison sets up the shock of the next line.

🐺 Sea monsters here likely means jackals

🍼 Jackals nurse their own pups naturally

✅ Even wild animals care for their young

📖 This comparison sets up a sharp contrast

---
## 🐦 Become Cruel, Like The Ostriches

Ancient writers believed ostriches abandoned their eggs and forgot their young.

That belief, true or not, made the ostrich a symbol of neglect.

Daughter of my people means Jerusalem's own people as a whole.

Jerusalem's mothers are described here as acting worse than that neglectful bird.

🐦 Ancient writers saw ostriches as neglectful parents

🥚 The ostrich became a symbol of abandonment

👑 Daughter of my people means Jerusalem's people

📖 Jerusalem's own mothers now act the same

# Lamentations 4:4-6
# 👶 The Tongue Of The Sucking Child
---
## 👶 The Tongue Of The Sucking Child

A sucking child means a nursing infant, too young to ask for food.

Cleaveth to the roof of his mouth means the tongue sticks from pure thirst.

This pictures a baby too dehydrated even to cry properly.

Siege conditions had cut off food and water from the youngest first.

👶 A sucking child means a nursing infant

💧 Cleaveth here means stuck fast from thirst

😢 Babies were too dehydrated even to cry

📖 The siege struck the youngest first

---
## 🍞 No Man Breaketh It Unto Them

Breaking bread was the normal way a parent fed a hungry child.

Here no one can break bread because no bread is left to break.

This is not refusal, it is total scarcity during the siege.

Even willing parents had nothing left to give their own children.

🍞 Breaking bread was the normal way to feed

🚫 No bread was left to break

⚠️ This describes scarcity, not refusal

📖 Parents had nothing left to give

---
## 🍽️ They That Did Feed Delicately

Feeding delicately means eating rich, carefully prepared food every day.

This describes Jerusalem's wealthier families before the siege began.

Those same people are now described sitting desolate in the streets.

Wealth gave no protection once the siege reached everyone equally.

🍽️ Feeding delicately means eating rich food daily

💰 This describes Jerusalem's wealthier families

🛣️ They now sit desolate in the streets

📖 Wealth gave no protection from the siege

---
## 🔴 Brought Up In Scarlet Embrace Dunghills

Scarlet dye was expensive, so wearing it marked a person as wealthy.

Being "brought up in scarlet" means raised in comfort and status.

A dunghill was a pile of waste and manure outside the city.

People once dressed in costly cloth now search dunghills for food.

🔴 Scarlet dye marked someone as wealthy

👑 Brought up in scarlet means raised in comfort

🗑️ A dunghill was a pile of waste

📖 Wealth has collapsed into searching trash

---
## 🔥 Greater Than The Sin Of Sodom

Sodom was the city God destroyed for its extreme wickedness in Genesis.

Comparing Jerusalem's punishment to Sodom names the worst example readers would know.

This is a shocking claim, not a casual comparison.

The next line explains exactly what makes this punishment feel worse.

🔥 Sodom was destroyed for extreme wickedness

📖 This names the worst example readers knew

😮 The comparison is meant to shock

➡️ The next line explains why it feels worse

---
## ⚡ No Hands Stayed Upon Her

Sodom was destroyed suddenly, in a single moment, by fire from heaven.

"No hands stayed on her" means no human effort could have stopped it.

Jerusalem's destruction instead came slowly, through a long and grinding siege.

A slow fall can weigh heavier than a quick one.

⚡ Sodom fell suddenly, in one moment

🚫 No human hands could have stopped it

🐌 Jerusalem's fall came slowly instead

📖 A slow fall can weigh heavier

# Lamentations 4:7-9
# ❄️ Her Nazarites Were Purer Than Snow
---
## ❄️ Her Nazarites Were Purer Than Snow

Nazarites were people under a special vow of devotion described in Numbers.

Purer than snow and whiter than milk describe healthy, vibrant skin.

This describes their appearance before the famine, not a moral claim alone.

The chapter starts with health so the coming change hits harder.

🙏 Nazarites were under a special vow

❄️ Purer than snow pictures healthy skin

🥛 Whiter than milk continues that picture

📖 Health now makes the coming change hit harder

---
## 💎 Their Polishing Was Of Sapphire

Ruddy means a healthy reddish color in the skin, a sign of strength.

Rubies and sapphire were prized gemstones known for their rich color and shine.

Stacking three gemstone comparisons paints a picture of real, vivid beauty.

This is the high point the chapter is about to tear down.

❤️ Ruddy means a healthy reddish color

💎 Rubies and sapphire were prized gemstones

🎨 Three comparisons paint vivid, real beauty

📖 This is the high point about to fall

---
## 🙂 Their Visage Is Blacker Than A Coal

Visage means a person's face or outward appearance.

Blacker than a coal pictures skin darkened by starvation and exposure.

Not known in the streets means friends could no longer recognize them.

Suffering had changed their faces beyond what neighbors could identify.

🙂 Visage means a person's face

🖤 Blacker than coal pictures darkened skin

❓ Friends could no longer recognize them

📖 Suffering changed their faces completely

---
## 🦴 Their Skin Cleaveth To Their Bones

Skin cleaving to the bones pictures a body with almost no flesh left.

"It is become like a stick" compares a limb to a dry, brittle branch.

This is the physical result of the long famine described earlier.

The poem does not look away from what starvation actually does.

🦴 Skin on bones pictures almost no flesh

🪵 Like a stick pictures a dry limb

🍽️ This is the result of long famine

📖 The poem does not look away

---
## ⚔️ Slain With The Sword Are Better

A sword death came quickly, often within moments.

Death by hunger instead stretched out over days and weeks of suffering.

Calling the sword "better" shows just how brutal starvation really was.

This is an honest, uncomfortable comparison, not an exaggeration.

⚔️ A sword death came quickly

⏳ Hunger stretched suffering over weeks

😔 Calling the sword better shows its weight

📖 This honest comparison is not exaggeration

---
## 📉 For Want Of The Fruits Of The Field

Pine away means to waste away slowly, losing strength day by day.

Fruits of the field means the crops normally grown outside the city.

The siege cut off every farm and field from the people inside.

Starvation here came from a siege, not from a failed harvest.

📉 Pine away means wasting away slowly

🌾 Fruits of the field means normal crops

🚧 The siege cut off every farm

📖 This famine came from the siege itself

# Lamentations 4:10-12
# 💗 The Hands Of The Pitiful Women
---
## 💗 The Hands Of The Pitiful Women

Pitiful here means compassionate and tenderhearted, the opposite of cruel.

These were ordinary mothers, not women known for violence.

Naming them as pitiful makes what happens next even harder to read.

Even the most caring people were broken by this level of famine.

💗 Pitiful means compassionate and tenderhearted

👩 These were ordinary, caring mothers

😢 Naming them this way makes it harder

📖 Even caring people were broken by famine

---
## 😱 They Were Their Meat

This verse describes mothers resorting to eating their own children.

Moses had warned centuries earlier that siege famine could reach this point.

That warning is recorded in Deuteronomy 28 as a curse.

The horror here is presented as the warning finally coming true.

😱 Mothers resorted to eating their children

📜 Moses warned of this centuries earlier

⚠️ The warning sits in Deuteronomy 28

📖 A long warned curse finally came true

---
## ⚖️ The LORD Hath Accomplished His Fury

Accomplished here means fully carried out, not left half finished.

This was not a random disaster or bad luck striking the city.

The chapter names the LORD directly as the one behind the judgment.

Fury poured out completely is harder to read than fury held back.

⚖️ Accomplished means fully carried out

🎲 This was not random bad luck

👆 The LORD is named directly

📖 Full judgment is harder to read

---
## 🔥 Kindled A Fire In Zion

This describes the actual burning of Jerusalem by the Babylonian army.

Devoured the foundations means the fire reached down to the very base of buildings.

2 Kings 25 records this same burning as a historical event.

The poetry here is describing something that genuinely happened, not just a feeling.

🔥 This describes Jerusalem actually burning

🏚️ The fire reached down to foundations

📜 2 Kings 25 records this same event

📖 This poetry describes a real history

---
## 🏔️ The Kings Of The Earth Would Not Have Believed

Jerusalem's walls and hilltop location made it seem impossible to capture.

Nations around the ancient world assumed the city could never fall.

Many also believed God's presence in the temple protected the city permanently.

That confidence made the coming news even harder to accept.

🏔️ Jerusalem's location seemed impossible to capture

🌍 Other nations assumed it could never fall

🏛️ Many trusted the temple for protection

📖 That confidence made the fall shocking

---
## 🚪 Entered Into The Gates Of Jerusalem

Gates were the most heavily defended part of any ancient city wall.

An enemy inside the gates meant the last line of defense had failed.

What once seemed unthinkable had actually happened in plain fact.

The verse states this plainly, without softening how shocking it was.

🚪 Gates were the city's most defended part

🛡️ Enemy inside the gates meant total failure

😮 The unthinkable had actually happened

📖 The verse states this without softening it

# Lamentations 4:13-15
# 🗣️ For The Sins Of Her Prophets
---
## 🗣️ For The Sins Of Her Prophets

These prophets are the false prophets condemned earlier in Jeremiah's own book.

They told the people peace was coming when disaster was actually near.

False comfort from trusted leaders left people unprepared for what came.

The chapter names leadership failure as a real cause of the disaster.

🗣️ These were the false prophets Jeremiah named

☮️ They promised peace that never came

😢 False comfort left people unprepared

📖 Leadership failure helped cause this disaster

---
## ⚖️ Shed The Blood Of The Just

The just here means innocent and righteous people, not criminals.

Some priests and prophets were complicit in killing those who spoke the truth.

Jeremiah himself was threatened and imprisoned for preaching an unpopular warning.

Silencing the truth did not stop the judgment the truth had predicted.

⚖️ The just means innocent, righteous people

🩸 Leaders were complicit in killing truth tellers

📖 Jeremiah himself was threatened for preaching

➡️ Silencing truth never stopped the judgment

---
## 👁️ Wandered As Blind Men In The Streets

This pictures the corrupt priests and prophets stumbling in confusion.

Blindness here is not physical, it describes moral and spiritual disorientation.

Leaders who once guided others could no longer find their own way.

Guilt and judgment had left them lost in the very city they ruled.

👁️ Blindness here means moral confusion

🚶 Leaders are pictured stumbling in the streets

🤷 They could no longer find their way

📖 Guilt left them lost in their own city

---
## 🩸 Could Not Touch Their Garments

These leaders had become ceremonially unclean through bloodshed.

Touching an unclean person's clothing would spread that uncleanness to others.

Priests who were supposed to stay pure had made themselves untouchable instead.

The very system meant to protect holiness now condemned its own leaders.

🩸 Bloodshed made them ceremonially unclean

👕 Touching their clothing would spread it

🙏 Priests were supposed to stay pure

📖 Their own system now condemned them

---
## 📯 Depart Ye, It Is Unclean

This is the exact warning cry used for lepers under the law.

Leviticus required an unclean person to shout this to warn others away.

Former leaders are now treated with the same public rejection as lepers.

Status and office gave them no protection from this disgrace.

📯 This was the warning cry for lepers

📜 Leviticus required that exact warning

🙅 Leaders now faced the same rejection

📖 Status gave them no protection here

---
## 🧳 They Shall No More Sojourn There

Sojourn means to live somewhere temporarily as an outsider or guest.

These leaders fled Jerusalem hoping other nations would take them in.

Instead, other nations refused to even let them stay as guests.

Rejection followed them past their own city and past their own people.

🧳 Sojourn means living somewhere as a guest

🏃 Leaders fled hoping for shelter elsewhere

🚫 Other nations refused to take them in

📖 Rejection followed them everywhere they went

# Lamentations 4:16-18
# 💨 The Anger Of The LORD Hath Divided Them
---
## 💨 The Anger Of The LORD Hath Divided Them

Divided here means scattered apart, no longer a single gathered people.

This describes the exile that sent Judah's survivors to different lands.

"He will no more regard them" names a season where comfort was withheld.

This is judgment described honestly, without softening its weight.

💨 Divided means scattered, not gathered

🗺️ This describes the exile to other lands

🚫 Comfort was withheld for a season

📖 Judgment is described honestly here

---
## 👴 They Favoured Not The Elders

Elders were older leaders normally shown automatic respect in this culture.

Priests also normally received special honor because of their office.

Conquest and exile erased those customary protections for everyone.

Judgment treated the honored and the ordinary the exact same way.

👴 Elders normally received automatic respect

🙏 Priests normally received special honor

⚖️ Conquest erased those usual protections

📖 Judgment treated everyone the same way

---
## 👀 Our Eyes As Yet Failed

Eyes failing here pictures exhaustion from staring and hoping too long.

Vain help means hope placed in something that was never going to come.

The people kept watching the horizon for rescue that never arrived.

Hope itself can wear a person down when it keeps being disappointed.

👀 Eyes failing pictures exhausted hoping

🚫 Vain help means hope placed wrongly

🌅 They watched the horizon for rescue

📖 Disappointed hope can wear a person down

---
## 📍 A Nation That Could Not Save Us

This nation most likely refers to Egypt, Judah's hoped for ally.

Jeremiah had already warned that trusting Egypt was a mistake.

Egypt could not stop Babylon from taking Jerusalem in the end.

Trusting the wrong source of help left them disappointed twice over.

📍 This nation likely refers to Egypt

📜 Jeremiah had warned against trusting Egypt

🛡️ Egypt could not stop Babylon's advance

📖 Wrong hope brought double disappointment

---
## 🏹 They Hunt Our Steps

Hunting here pictures enemies tracking people the way hunters track prey.

This left people unable to move safely even inside their own streets.

A city meant to feel safe had become a place of constant danger.

Safety had disappeared even in the most familiar parts of home.

🏹 Hunting pictures tracking people like prey

🚷 People could not move safely in the streets

🏙️ The city no longer felt safe

📖 Even home held constant danger now

---
## ⏰ Our End Is Come

Days are fulfilled means the time appointed for judgment had fully arrived.

This is not a guess about the future, it states a present reality.

The repetition of "our end" emphasizes just how final this moment felt.

There is no more room here for denial or delay.

⏰ Days fulfilled means the appointed time arrived

📍 This states a present reality, not a guess

🔁 Repeating our end stresses finality

📖 There is no more room for denial

# Lamentations 4:19-22
# 🦅 Swifter Than The Eagles Of The Heaven
---
## 🦅 Swifter Than The Eagles Of The Heaven

Eagles were a common ancient picture for speed, not gentleness.

This exact comparison also describes Saul and Jonathan in 2 Samuel.

Calling pursuers faster than eagles means escape was never realistic.

There was no outrunning what was coming for them.

🦅 Eagles pictured speed in ancient writing

📜 2 Samuel uses this same comparison

🏃 Escape was never realistically possible

📖 There was no outrunning this pursuit

---
## 🏜️ They Laid Wait For Us In The Wilderness

The wilderness was normally a place people fled to for safety.

Pursuers had already anticipated that and set ambushes there.

Both the city and the open country had become unsafe.

Every possible direction of escape had already been closed off.

🏜️ The wilderness was normally a safe retreat

🪤 Pursuers had already set ambushes there

🚫 Both city and country were unsafe

📖 Every direction of escape was closed

---
## 💨 The Breath Of Our Nostrils

This idiom names someone whose life felt essential to everyone else's survival.

It refers here to the king, most likely Zedekiah himself.

A nation's hope often rested heavily on one single leader.

Losing that one person felt like losing the ability to breathe.

💨 This idiom names someone seen as essential

👑 It refers here to the king, Zedekiah

🏙️ A nation's hope rested on one leader

📖 Losing him felt like losing their breath

---
## 🌳 Under His Shadow We Shall Live

A king's shadow pictures the protection and alliance he could offer.

The people believed his rule would keep them safe among other nations.

"Taken in their pits" describes his actual capture by the enemy.

The very protection they trusted was the first thing to fail.

🌳 A king's shadow pictures protection offered

🤝 People trusted his rule to keep them safe

🕳️ Taken in their pits describes his capture

📖 Their trusted protection failed first

---
## 🏴 Rejoice And Be Glad, O Daughter Of Edom

Edom was a neighboring nation that celebrated when Jerusalem fell.

This line is deliberately sarcastic, not a genuine blessing.

The book of Obadiah condemns Edom for this same gloating.

Celebrating another nation's disaster was never going to go unanswered.

🏴 Edom celebrated Jerusalem's fall

😏 This line is sarcastic, not sincere

📜 Obadiah condemns this same gloating

📖 Celebrating disaster never goes unanswered

---
## 🍷 Thou Shalt Be Drunken, And Naked

The cup here pictures God's judgment passed from nation to nation.

Drinking from that cup meant experiencing the same disaster firsthand.

Being drunken and naked pictures public shame and total humiliation.

Edom's turn for judgment was coming next, despite its mocking.

🍷 The cup pictures God's judgment passed on

😵 Drinking it meant experiencing disaster firsthand

😳 Drunken and naked pictures public shame

📖 Edom's own judgment was coming next

---
## ✅ The Punishment Of Thine Iniquity Is Accomplished

Accomplished here means complete, with nothing further left to pay.

This verse promises that Zion's exile will one day actually end.

Judgment with a clear end point is different from judgment without limit.

The chapter that opened in ruin closes with a real promise of hope.

✅ Accomplished means complete, nothing left to pay

🏠 Zion's exile is promised to end

⏳ This judgment has a clear limit

📖 Ruin closes here with real hope

---
## 👆 He Will Visit Thine Iniquity, O Daughter Of Edom

Visit here means to actively intervene and bring consequences.

Edom's gloating in verse twenty one is about to catch up with it.

Discover thy sins means expose them publicly for everyone to see.

The chapter ends by turning the lens toward Edom's coming reckoning.

👆 Visit means God will actively intervene

😏 Edom's gloating is about to catch up

🔦 Discover thy sins means public exposure

📖 The chapter ends on Edom's reckoning
`.trim();

export const LAMENTATIONS_FOUR_PERSONAL_SECTIONS = parseLamentationsFourRawNotes(LAMENTATIONS_FOUR_RAW_NOTES);
