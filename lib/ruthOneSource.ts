export type RuthOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRuthOneRawNotes(rawText: string): RuthOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RuthOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ruth\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ruth 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ruth\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Ruth\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ruth 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ruth 1:${startVerse}` : `Ruth 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ruth 1 sections, received " + sections.length);
  }

  return sections;
}

const RUTH_ONE_RAW_NOTES = `# Ruth 1:1-2
# 🌾 A Family Leaves Bethlehem
---
## 📆 In The Days When The Judges Ruled

This tells us exactly when Ruth's story happens.

The judges led Israel before the nation ever had a king.

That whole period was marked by disorder and repeated cycles of sin.

Ruth's quiet story of loyalty unfolds inside that same troubled age.

📆 Sets the story in Israel's judges era

⚔️ That era was violent and disordered

👑 Israel had no king yet

📖 A quiet story amid loud chaos

## 😟 A Famine In The Land

A famine meant the crops failed and food ran dangerously short.

Bethlehem's name means house of bread.

The one town named for bread was the one place bread had run out.

That contrast pushed Elimelech's family to leave their homeland completely.

🌾 Famine means the food supply failed

🍞 Bethlehem's name means house of bread

😟 The house of bread had no bread

➡️ Hunger forced the family to leave

## 🧳 To Sojourn In The Country Of Moab

To sojourn means living somewhere without planning to stay for good.

Elimelech planned a short stay, not a permanent move.

Moab sat across the Dead Sea from Judah.

A traveler could reach it after a short journey by land.

The Moabites descended from Lot and often stood in tension with Israel.

Elimelech was choosing a foreign land in a moment of desperate need.

🧳 Sojourn means a temporary stay

🗺️ Moab sat near the Dead Sea

👥 Moabites descended from Lot

➡️ Desperation led the family abroad

## 👑 The Name Of The Man Was Elimelech

Elimelech's name means my God is king.

That is a bold statement of faith for a man about to leave the promised land.

His name claimed one truth.

His actions pointed toward a different direction.

Names in the Bible often carry meaning far beyond simple labels.

👑 Elimelech means my God is king

🚶 He still left the promised land

⚖️ His name and his choice conflicted

📖 Bible names often carry real meaning

## 🌸 The Name Of His Wife Naomi

Naomi's name means pleasant or sweetness.

Right now, her life still matches that name completely.

She still has a husband, two sons, and a hopeful new home.

Later in this same chapter, she will ask people to call her by a different name entirely.

🌸 Naomi means pleasant or sweetness

👨‍👩‍👦 Her family is still whole here

😊 Life still fits her name

➡️ That will not last the chapter

## 🤒 The Name Of His Two Sons Mahlon And Chilion

Mahlon's name is connected to a Hebrew word for sickness.

Chilion's name is connected to a Hebrew word for wasting away or pining.

Neither name sounds like a blessing spoken over a newborn son.

Both meanings will tragically come true before this chapter ends.

🤒 Mahlon points to sickness

😔 Chilion points to wasting away

👶 Strange names for two sons

📖 Both meanings come true soon

# Ruth 1:3-5
# 💔 Naomi Loses Everyone
---
## ⚰️ Elimelech Naomi's Husband Died

The man who led his family out of Bethlehem is now gone.

Naomi is left a widow in a foreign country far from her own people.

In this culture, a widow without sons had almost no legal protection or income.

Her situation has already turned dangerous, and the chapter has barely begun.

⚰️ Elimelech dies in a foreign land

👩 Naomi becomes a widow in Moab

⚠️ Widows had little legal protection

➡️ Danger arrives early in the story

## 💍 They Took Them Wives Of The Women Of Moab

Mahlon and Chilion each marry a Moabite woman.

Their wives are named Orpah and Ruth.

Israelite law later warned against marrying into nations that worshiped other gods.

The text does not condemn this marriage outright or explain the family's reasoning.

It simply records what happened, leaving the tension unresolved for now.

💍 Two sons marry Moabite women

📜 Israelite law warned against such ties

❓ The text offers no judgment here

➡️ The tension stays unresolved for now

## ❓ The Name Of The Other Was Ruth

Scholars are not fully certain what Ruth's name originally meant.

Many believe it was likely connected to friendship or companionship.

Orpah's name may relate to the back of the neck.

That image pictures someone turning back.

One woman's choices will end up matching her name far better than the other's.

❓ Ruth's exact meaning is uncertain

🤝 It was likely tied to friendship

🔙 Orpah's name may picture turning back

📖 Names hint at where each woman goes

## 📆 Dwelled There About Ten Years

Ten years is a long time for a marriage with no children born.

In this culture, children were seen as proof of God's blessing on a family.

The missing children quietly raise a hard question about this family's future.

That question becomes central to the rest of the whole book.

📆 Ten years pass with no children

👶 Children were seen as a blessing

❓ The family's future feels uncertain

📖 That question shapes the whole book

## 😢 Mahlon And Chilion Died Also Both Of Them

Both sons now die, just like their father before them.

Their names, sickness and wasting away, describe exactly what happened to them.

Naomi has now buried a husband and both of her sons in a foreign land.

She has lost every man who could have protected or provided for her.

⚰️ Both sons die in Moab

🤒 Their names matched their fate

😢 Naomi buries her whole family

➡️ No man is left to provide

## 🏚️ The Woman Was Left Of Her Two Sons And Her Husband

In this ancient world, a woman's security came through the men in her family.

A husband or a son normally owned land and provided daily protection.

Naomi now has neither a husband nor a son of her own.

She stands as one of the most vulnerable people in her entire society.

🏚️ Women depended on male relatives then

🌾 Land and safety came through men

👵 Naomi now has neither one

➡️ She stands among the most vulnerable

# Ruth 1:6-10
# 🛤️ Naomi Decides To Return
---
## 🍞 The LORD Had Visited His People In Giving Them Bread

To visit here means God stepped in and acted on His people's behalf.

The famine that pushed the family to Moab has finally lifted at home.

Bread returning to Bethlehem, the house of bread, feels like more than coincidence.

God's care for Israel becomes the reason Naomi finally decides to head home.

👋 Visited means God actively stepped in

🍞 Bread has returned to Bethlehem

🏠 The house of bread has bread again

➡️ That news sends Naomi home

## 🚪 Go, Return Each To Her Mother's House

Naomi tells Orpah and Ruth to go back to their own families.

Most verses like this one say father's house instead of mother's house.

Many scholars believe naming the mother here reflects real personal affection between the women.

Naomi is releasing them with kindness, not pushing them away out of anger.

🚪 Naomi sends them back home

👩 Mother's house is an unusual phrase

💗 It may reflect real affection

➡️ She releases them with kindness

## 🕊️ The LORD Deal Kindly With You

The word behind kindly is the Hebrew word hesed.

Hesed means loyal love that goes beyond what is required or expected.

Naomi prays that God will treat her daughters in law with that same loyal love.

This one word becomes the real theme running through the entire book of Ruth.

🕊️ Kindly translates the word hesed

🤝 Hesed means loyal, faithful love

🙏 Naomi prays this over both women

📖 Hesed becomes the theme of Ruth

## 🛌 That Ye May Find Rest

Rest here does not mean a nap or a vacation.

It means real security, a home and a husband who could provide for her.

A widow without that kind of rest faced a genuinely hard and uncertain life.

Naomi wants far more for these two women than she can currently offer them.

🛌 Rest means real household security

🏠 A husband could provide that security

⚠️ Widows faced real hardship without it

➡️ Naomi wants better for both women

## 😭 They Lifted Up Their Voice, And Wept

This is not quiet crying.

Grief in this culture was often loud, physical, and shared openly together.

All three women are facing a future that looks uncertain and painful.

Their shared tears show how close this family had actually become.

😭 Grief here was loud and open

👪 All three women shared this future

💔 Uncertainty made the moment painful

➡️ Their tears show real closeness

## 🤝 Surely We Will Return With Thee Unto Thy People

Both daughters in law say the same thing at first.

Neither one is ready to let Naomi travel home completely alone.

That shared answer will not last through the rest of the conversation.

One promise is about to be tested far more than the other.

🤝 Both women offer the same answer

🚶 Neither wants Naomi traveling alone

⏳ That agreement will soon be tested

➡️ One promise will hold, one will not

# Ruth 1:11-14
# 😢 Turn Again, My Daughters
---
## 👨‍👩‍👦 Are There Yet Any More Sons In My Womb

Naomi is describing a real custom, not just an old saying.

If a woman's husband died, a brother in law was expected to marry her.

That marriage kept the dead man's name and property inside the family line.

Naomi has no more sons to offer either woman under that custom.

👥 A real marriage custom is in view

⚖️ A brother in law would marry the widow

🌾 It kept property inside the family

➡️ Naomi has no sons left to offer

## ⏳ Would Ye Tarry For Them Till They Were Grown

Naomi pushes the idea to its absurd end on purpose.

Even if she remarried tonight and had new sons, they would still need years to grow up.

No woman could wait that long for a husband.

Naomi is not being cruel.

She is being completely honest with them.

⏳ Naomi pushes the idea to its limit

👶 New sons would need years to grow

🚫 No woman could wait that long

📖 Her honesty is a form of love

## ✋ The Hand Of The LORD Is Gone Out Against Me

The hand of the LORD is a common Old Testament picture of God's power at work.

Here it points to hardship, not blessing.

Naomi genuinely believes God has personally allowed her suffering.

She is not hiding her pain or pretending everything is fine.

✋ Hand of the LORD pictures God's power

⚠️ Here it points to hardship

😢 Naomi names her suffering honestly

📖 She does not hide her pain

## 🤗 But Ruth Clave Unto Her

Clave means held on tightly and refused to let go.

This exact word describes a husband holding fast to his wife back in Genesis.

Orpah's goodbye kiss and Ruth's tight hold happen in the very same verse.

One woman lets go, and one woman holds on for good.

🤗 Clave means holding on tightly

📖 Genesis uses this same strong word

👋 Orpah says goodbye and leaves

➡️ Ruth holds on and stays

# Ruth 1:15-18
# 🤝 Whither Thou Goest, I Will Go
---
## 🗿 Unto Her People, And Unto Her Gods

Naomi names the real choice in front of Ruth plainly.

Moab worshiped its own gods, including one called Chemosh.

Going back to Moab meant going back to that whole way of worship.

Staying with Naomi meant choosing Israel's God instead.

🗿 Moab worshiped its own gods

👑 Chemosh was Moab's chief god

🔀 Ruth faces a real choice

➡️ One path leads back to Moab

## 🧭 Whither Thou Goest, I Will Go

This is Ruth's answer to Naomi's whole speech about turning back.

She is not making a vague, emotional promise.

She commits to Naomi's future travel, her future home, and her future people.

A foreign widow chooses to follow another widow into total uncertainty.

🧭 Ruth commits to Naomi's path

🏠 Her future home is now Naomi's

👥 Her future people are now Naomi's

📖 Ruth chooses uncertainty out of loyalty

## 🌍 Thy People Shall Be My People, And Thy God My God

Ruth is not just choosing a new family.

She is choosing a new nation and a new God to worship.

This is a full conversion, not a polite gesture toward her mother in law.

A Moabite woman is about to become part of Israel's story completely.

🌍 Ruth adopts a new nation

🙏 Ruth adopts a new God

💯 This is full conversion, not politeness

📖 A Moabite becomes part of Israel

## ⚖️ The LORD Do So To Me, And More Also

This is a set oath formula used several times across the Old Testament.

It calls down a curse on the speaker if the promise gets broken.

Ruth is putting her own life behind this commitment to Naomi.

Nothing about this vow is casual or halfhearted.

⚖️ This is a formal oath formula

🔥 It invites a curse if broken

💪 Ruth stakes her life on it

📖 The vow is total, not casual

## 🪨 Stedfastly Minded To Go With Her

Stedfastly minded means Ruth's decision was completely settled.

Naomi tries to talk her out of it and simply gives up trying.

Ruth was never going to change her mind.

Her loyalty was already fixed before Naomi ever tested it with words.

🪨 Stedfastly means firmly, completely settled

🛑 Naomi finally stops arguing

💗 Ruth's mind was already made up

➡️ Loyalty like this cannot be talked out of

# Ruth 1:19-22
# 🥀 Naomi Becomes Mara
---
## 🏘️ Is This Naomi

The whole town reacts the moment Naomi walks back in.

Ten hard years in Moab had visibly changed how she looked.

The question is not really about recognizing her face.

It is about how far her life has fallen since she left.

🏘️ The whole town notices her return

😳 Years of hardship changed her look

❓ The question hints at her fall

➡️ Bethlehem sees the change immediately

## 🍋 Call Me Not Naomi, Call Me Mara

Naomi means pleasant.

Mara means bitter.

Naomi asks people to rename her based on what her life has become.

This is grief spoken out loud, not simple self pity.

🌸 Naomi means pleasant

🍋 Mara means bitter

😢 She renames herself after her grief

📖 Honest grief differs from self pity

## 👑 The Almighty Hath Dealt Very Bitterly With Me

The Almighty translates a Hebrew title, El Shaddai.

Abraham, Isaac, and Jacob all knew God by this same title.

Naomi is not doubting that God exists or that God is powerful.

She is naming her pain directly to the God she still believes controls it.

👑 The Almighty translates El Shaddai

😔 Naomi does not doubt God's power

🙏 She brings her pain straight to Him

📖 The patriarchs knew God by this title

## 🕳️ I Went Out Full, And The LORD Hath Brought Me Home Again Empty

Naomi left Bethlehem with a husband and two sons.

She returns with neither, and with no grandchildren either.

Full and empty describe her whole life, not just her pantry.

She says plainly that she believes God allowed this loss.

👪 She left full of family

🕳️ She returns completely empty

⚖️ Full and empty frame her whole story

📖 Naomi credits God with the loss

## 🌾 In The Beginning Of Barley Harvest

Barley ripened earlier in the year than wheat in this region.

This detail marks the exact season Naomi and Ruth arrive home.

A harvest also meant fields full of workers gathering grain by hand.

That detail is not filler.

It sets up exactly what happens next in Ruth's story.

🌾 Barley ripened earlier than wheat

📆 This marks the arrival season

👩‍🌾 Harvest fields were full of workers

➡️ This detail sets up chapter two
`.trim();

export const RUTH_ONE_PERSONAL_SECTIONS = parseRuthOneRawNotes(RUTH_ONE_RAW_NOTES);
