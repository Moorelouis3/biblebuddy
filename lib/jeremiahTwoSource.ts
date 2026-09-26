export type JeremiahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwoRawNotes(rawText: string): JeremiahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 2:${startVerse}` : `Jeremiah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 2 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWO_RAW_NOTES = `# Jeremiah 2:1-3
# 💍 Remembered Love
---
## 💍 The Love Of Thine Espousals

"Espousals" means the time when two people were formally promised in marriage, before the wedding itself.

God speaks to Israel through Jeremiah using the language of a marriage.

He remembers a season when Israel loved him eagerly, like a new bride.

That memory sets up a painful contrast with the unfaithfulness this whole chapter describes.

The chapter opens with love, not accusation, on purpose.

💍 Espousals means a promise before marriage

👰 God pictures Israel as a young bride

❤️ Israel once loved God eagerly

📖 The chapter opens with love, not blame

## 🏜️ Thou Wentest After Me In The Wilderness

The wilderness here is the desert Israel crossed after leaving Egypt.

That land had no food, no water, and no safety of its own.

Israel followed God there with nothing to gain but his presence.

"A land that was not sown" means it could not grow crops to feed anyone.

Real devotion showed up most when comfort was the one thing missing.

God remembers that raw trust before anything else in this chapter.

🏜️ The wilderness offered no comfort at all

🌾 Not sown means the land grew nothing

🙌 Israel trusted God with nothing else

📖 God remembers that raw trust first

## 🌾 Israel Was Holiness Unto The Lord

"Holiness" means something set apart for God alone, not for common, everyday use.

Israel is compared next to firstfruits, the first and best part of a harvest.

Firstfruits always belonged to God before anyone else could touch them.

Anyone who devoured or harmed that offering broke a serious boundary.

The same principle applied to Israel itself in this verse.

God treated Israel like something reserved only for himself.

🌾 Holiness means set apart for God alone

🎁 Firstfruits were the harvest's first part

🚫 Touching what belonged to God broke a boundary

📖 God reserved Israel only for himself

# Jeremiah 2:4-8
# ❓ What Have I Done Wrong
---
## ⚖️ What Iniquity Have Your Fathers Found In Me

God is not the one on trial here despite the courtroom language.

He asks a question that expects one honest answer, none at all.

"Iniquity" means real, serious wrongdoing, not a small mistake.

The fathers followed "vanity" instead, empty things that could not help them.

Vanity here means worthless idols with no real power behind them.

The whole relationship broke down on Israel's side, not God's.

⚖️ God is not the one on trial

❓ Iniquity means serious, real wrongdoing

🌀 Vanity means worthless, powerless idols

📖 The failure sat on Israel's side

## 🐫 Where Is The Lord That Brought Us Up

This question should have carried gratitude, not silence.

God brought Israel out of Egypt through a literal desert of drought and deadly danger.

"The shadow of death" describes a place so harsh it felt close to dying.

No one stopped to ask where that same God had gone.

Israel enjoyed the rescue and quietly forgot the rescuer.

🐫 The question should have honored God

🏜️ The exodus crossed real drought and danger

💀 Shadow of death pictures near constant danger

📖 Israel forgot the rescuer, not the rescue

## 🚫 Ye Defiled My Land, And Made Mine Heritage An Abomination

God gave Israel a "plentiful country," full of good fruit and provision.

"Defiled" means made unclean, ruined for its intended, holy purpose.

"Mine heritage" refers to the promised land itself, given as an inheritance.

"Abomination" is one of the strongest Old Testament words for something God finds disgusting.

The gift itself became the very thing God found repulsive.

A blessing turned into an insult through Israel's own choices.

🍇 God gave a plentiful, fruitful land

🚫 Defiled means made unclean and ruined

🏚️ Heritage means the promised land itself

📖 The gift became an insult instead

## ⛈️ The Prophets Prophesied By Baal

"Pastors" here means the leaders responsible for guiding and protecting God's people.

Every layer of leadership failed at the same time in this verse.

Priests stopped seeking God, and legal experts stopped truly knowing him.

Prophets, who were supposed to speak for God, spoke for Baal instead.

Baal was a Canaanite storm and fertility god worshiped by Israel's neighbors.

When leadership fails together, the whole nation drifts with it.

👥 Pastors means the nation's leaders

🕎 Priests stopped seeking God at all

⛈️ Baal was a rival Canaanite storm god

📖 Failed leadership dragged the whole nation

# Jeremiah 2:9-13
# 💧 Two Evils
---
## 🗺️ Pass Over The Isles Of Chittim

Chittim points to Cyprus and the wider Mediterranean coastlands to the west.

Kedar points to Arab desert tribes far to the east.

God tells Israel to check both directions for a single example.

No other nation on earth had actually traded its real gods for false ones.

Israel's unfaithfulness was not normal, it was genuinely unheard of.

🗺️ Chittim points west toward Cyprus

🏜️ Kedar points east toward Arab tribes

🔍 God dares Israel to search everywhere

📖 No other nation had done this

## 🔄 Hath A Nation Changed Their Gods

God draws a sharp comparison here that should embarrass Israel.

Pagan nations at least stayed loyal to their own false, powerless gods.

Israel traded the one true, living God for something that could not help at all.

"Glory" here refers to God himself, the source of Israel's honor and identity.

Even idol worshipers were more consistent than God's own people.

🔄 Pagans stayed loyal to false gods

💔 Israel traded the true God away

👑 Glory refers to God himself

📖 Idol worshipers proved more consistent

## 💧 They Have Forsaken Me The Fountain Of Living Waters

A "fountain of living waters" means a spring that never runs dry.

God pictures himself as that constant, self renewing source of life.

Forsaking that fountain means walking away from something that could never fail on its own.

This is the first of the two evils named in this verse.

Leaving God meant leaving the only source that actually works.

💧 Living waters means a spring that never dries

🏞️ God pictures himself as that source

🚶 Forsaking means walking away completely

📖 Israel left the one true source

## 🪨 Hewed Them Out Cisterns, Broken Cisterns

A "cistern" is a manmade pit carved into rock to store rainwater.

Unlike a spring, a cistern holds nothing on its own and can crack over time.

"Broken" cisterns leak, so all the effort to store water is wasted anyway.

This pictures Israel replacing God with manmade religion that cannot actually hold anything.

The second evil was choosing hard work that still failed completely.

🪨 Cisterns were manmade pits for water

💦 Broken cisterns leak everything back out

🛠️ This pictures manmade, powerless religion

📖 Hard work still failed completely here

# Jeremiah 2:14-19
# 🦁 Self Inflicted Ruin
---
## ❓ Is He A Homeborn Slave

This question expects the answer no, not a real uncertainty.

Israel was never born into slavery like a homeborn slave inside someone else's house.

God rescued Israel out of Egypt and set the nation free.

The next question asks why a free nation now acts like plundered property.

Israel's suffering came from lost identity, not lost status.

❓ The question expects the answer no

🕊️ Israel was never born into slavery

🚪 God set the whole nation free

➡️ Lost identity caused this suffering

## 🦁 The Young Lions Roared Upon Him

This pictures a foreign army attacking Israel like a pack of lions.

Roaring lions terrify prey before they ever attack physically.

"Yelled" adds the sound of a whole pack closing in together.

The result named next is burned cities with no one left living in them.

The threat named here was already turning real and violent.

🦁 Lions picture an attacking foreign army

😱 Roaring terrifies prey before the attack

🏙️ Burned cities followed this attack

📖 The threat had already turned violent

## 👑 The Children Of Noph And Tahapanes Have Broken The Crown Of Thy Head

Noph and Tahapanes were both major cities inside Egypt.

"Broken the crown of thy head" is a picture of total humiliation and defeat.

Egypt, the nation Israel once trusted for protection, caused this damage instead.

The very ally Israel ran to became one more source of harm.

Wrong alliances tend to cost exactly what they promised to protect.

🇪🇬 Noph and Tahapanes were Egyptian cities

👑 Broken crown pictures total humiliation

🤝 Egypt harmed the nation it should protect

📖 Wrong alliances cost what they promised

## 🌊 To Drink The Waters Of Sihor

"Sihor" is another name connected to the Nile River in Egypt.

Drinking a nation's water is a picture of depending on that nation for help.

The next line asks the same question about Assyria and its river, the Euphrates.

Israel kept running between two foreign powers instead of trusting God alone.

Neither river could offer the safety only God had promised.

🌊 Sihor connects to Egypt's Nile River

🤲 Drinking water pictures depending on a nation

🔁 Israel ran between Egypt and Assyria

📖 Only God could offer real safety

# Jeremiah 2:20-25
# 🍇 The Vine Gone Wild
---
## ⛰️ Upon Every High Hill And Under Every Green Tree

This phrase became a stock description for pagan worship spread across Judah's landscape.

High hills and shady trees were common sites for Canaanite religious rituals.

"Playing the harlot" compares that worship to marital unfaithfulness.

God had already broken Israel's yoke, an image of freedom from slavery.

Freedom became an opportunity for unfaithfulness instead of loyalty.

⛰️ High hills marked pagan worship sites

🌳 Green trees offered the same shade

💔 Harlot pictures marital unfaithfulness to God

📖 Freedom turned into unfaithfulness instead

## 🍇 I Had Planted Thee A Noble Vine

A "noble vine" means a carefully chosen, high quality grapevine.

God pictures himself as a careful gardener who planted only the best seed.

"Wholly a right seed" means nothing about the planting was careless or accidental.

Somehow that same vine grew into something wild and unrecognizable.

"Degenerate" means it broke down from its original, intended quality.

The problem was never the planting, it was the growth that followed.

🍇 Noble vine means a carefully chosen plant

🌱 God planted only the very best seed

🥀 Degenerate means broken down from its purpose

📖 The growth failed, not the planting

## 🧼 Though Thou Wash Thee With Nitre

"Nitre" was a natural mineral used like soap in the ancient world.

Washing with nitre and soap pictures every outward effort to appear clean.

None of that outward effort reached the real problem underneath.

God says the stain of iniquity was still visible to him regardless.

Outward cleanup cannot fix a problem that sits in the heart.

🧼 Nitre worked like ancient soap

✨ Washing pictures outward effort to look clean

👁️ God still saw the deeper stain

📖 Outward cleanup cannot fix inward guilt

## 🐴 A Wild Ass Used To The Wilderness

This pictures a wild donkey driven by instinct during mating season.

"Snuffeth up the wind" describes an animal too worked up to think clearly.

The earlier "swift dromedary" image compares Israel to a camel running wild in every direction.

Both pictures describe chasing false gods with no self control at all.

Israel's idolatry looked less like a choice and more like an addiction.

🐴 A wild donkey pictures pure instinct

💨 Snuffeth up the wind means reckless urgency

🐫 The dromedary image adds constant wandering

📖 Idolatry looked more like addiction than choice

# Jeremiah 2:26-30
# 🙈 Ashamed As A Thief
---
## 🕵️ As The Thief Is Ashamed When He Is Found

Getting caught, not the sin itself, produced this shame.

Kings, priests, and prophets all share the same public embarrassment named here.

That shame only shows up after the trouble already arrives.

Real repentance looks very different from simply being caught.

Shame at being caught is not the same thing as sorrow over sin.

🕵️ Getting caught produced this shame

👑 Kings, priests, and prophets share the blame

⏰ The shame arrived only after trouble

📖 Being caught differs from real sorrow

## 🪵 Saying To A Stock, Thou Art My Father

This is not calling literal wood and stone their parents.

"Stock" means a carved wooden idol, and "stone" means a carved stone idol.

Israel treated lifeless material as the source of their life and identity.

Yet in real trouble, they still turned back and cried out to the LORD.

Convenience decided which god got credit and which god got blamed.

🪵 Stock means a carved wooden idol

🪨 Stone means a carved stone idol

🙏 Israel still cried to the LORD in trouble

📖 Convenience decided which god got credit

## 🏙️ According To The Number Of Thy Cities Are Thy Gods

Judah did not worship one false god, it worshiped many, city by city.

Each town apparently kept its own local deity for local problems.

God challenges those gods directly, daring them to help in this crisis.

None of them answer, because none of them were ever real.

A multiplied religion still could not multiply real help.

🏙️ Every city kept its own local god

📈 Judah's idols multiplied city by city

🤐 None of those gods could answer

📖 More gods did not mean more help

## ⚔️ Your Own Sword Hath Devoured Your Prophets

God had already disciplined Israel before this final judgment arrived.

"In vain" means the earlier correction accomplished nothing lasting.

Israel's own violence, not a foreign army, killed the prophets God sent.

That detail makes the coming judgment feel earned rather than sudden.

A people who kill their own warnings eventually run out of warnings.

⚔️ Israel's own violence killed its prophets

🚫 In vain means the discipline failed

📉 Earlier correction changed nothing lasting

➡️ A nation without warnings runs out of time

# Jeremiah 2:31-32
# 🌵 A Wilderness Unto Israel
---
## ❓ Have I Been A Wilderness Unto Israel

This question expects a firm no from anyone honest.

A wilderness offers no food, no water, and no real help.

God is asking whether he had ever actually failed to provide.

The people's own actions answer that question louder than their words.

God was never the empty place Israel treated him like.

❓ The question expects a clear no

🏜️ A wilderness offers no real help

🍞 God had actually always provided

📖 God was never truly empty or absent

## 👑 We Are Lords, We Will Come No More Unto Thee

"We are lords" means the people saw themselves as free to rule their own lives.

That declaration rejects God's authority in plain, direct words.

Coming "no more" describes walking away from worship completely, not drifting slowly.

This is the clearest, most direct rebellion stated so far in the chapter.

Independence from God was the actual goal, not an accident.

👑 Lords means ruling their own lives

🚫 The words reject God's authority directly

🚶 No more means walking away completely

➡️ Independence from God was the real goal

## 💍 Can A Maid Forget Her Ornaments

A bride's jewelry and wedding attire were treasured, memorable possessions.

No woman would realistically forget something she valued and wore with pride.

God compares himself to something just as valuable and impossible to forget honestly.

Yet Israel forgot him for more days than anyone could count.

What should have been unforgettable became easy to leave behind.

💍 Ornaments were treasured, memorable jewelry

👰 No bride forgets what she values

⏳ Israel forgot God for countless days

📖 The unforgettable became easy to leave

# Jeremiah 2:33-37
# 🩸 No Way To Hide It
---
## 💄 Why Trimmest Thou Thy Way To Seek Love

"Trimmest thy way" pictures carefully preparing an appearance to attract attention.

The image is of someone dressing and grooming to seduce a lover.

God compares Israel's idol worship to that same calculated pursuit.

Israel did not stumble into idolatry, it pursued it on purpose.

That practiced skill for chasing idols got passed on to others too.

💄 Trimmest thy way means preparing to seduce

🎯 Israel pursued idolatry on purpose

👥 That skill got passed to others

📖 Idolatry was learned, not accidental

## 🩸 The Blood Of The Souls Of The Poor Innocents

This names actual violence against people who had done nothing wrong.

Some worship of false gods in this era involved child sacrifice.

"Innocents" points to victims who never had a chance to defend themselves.

God says he did not need to search hard to find this evidence.

This was not hidden guilt, it was guilt in plain sight.

🩸 Innocents were victims who could not defend themselves

🔥 Some worship involved actual child sacrifice

👁️ God found this evidence without searching hard

📖 This guilt was never actually hidden

## 🙅 Because I Am Innocent, Surely His Anger Shall Turn From Me

Israel claims innocence here despite everything just described.

That claim contradicts the specific evidence God has already listed.

God answers this false claim with a direct legal challenge, I will plead with thee.

Denial does not change what the evidence already shows to be true.

A confident denial is not the same thing as an honest one.

🙅 Israel falsely claims to be innocent

📜 The claim contradicts God's own evidence

⚖️ God answers with a direct challenge

📖 Denial is not the same as truth

## 🔁 Thou Also Shalt Be Ashamed Of Egypt, As Thou Wast Ashamed Of Assyria

Israel had already tried trusting Assyria and ended up humiliated.

The same failed pattern is about to repeat itself with Egypt.

"Thine hands upon thine head" pictures a captive being led away in defeat.

Rejecting God's confidence meant repeating the exact same painful mistake.

A nation that will not learn from one failed alliance repeats it with another.

🏛️ Assyria already ended in humiliation

🔁 Egypt was about to repeat that pattern

⛓️ Hands upon the head pictures captivity

➡️ Rejecting God repeated the same mistake
`.trim();

export const JEREMIAH_TWO_PERSONAL_SECTIONS = parseJeremiahTwoRawNotes(JEREMIAH_TWO_RAW_NOTES);
