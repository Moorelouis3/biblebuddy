export type FirstSamuelFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelFourRawNotes(rawText: string): FirstSamuelFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 4:${startVerse}` : `1 Samuel 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_FOUR_RAW_NOTES = `# FirstSamuel 4:1-4
# ⚔️ Defeat Sends Israel To Fetch The Ark
---
## 🗣️ The Word Of Samuel Came To All Israel

This line connects straight back to the end of chapter three.

Samuel had just been confirmed there as a prophet trusted nationwide.

"All Israel" means the message reached far past his hometown.

Samuel himself stays offstage for the rest of this chapter.

🗣️ Word of Samuel means his prophetic message

🌍 All Israel means the whole nation

🔗 Connects straight back to chapter three

📖 Samuel stays offstage this chapter

## 🪨 Pitched Beside Ebenezer

"Pitched" is an old word for setting up camp.

"Ebenezer" means stone of help in Hebrew.

Samuel later renames this same spot after a true victory.

Here, at this early defeat, the name does not fit yet.

🪨 Pitched means setting up camp

📛 Ebenezer means stone of help

⏳ The name later fits a real victory

📖 Here, the name does not fit yet

## 🏹 The Philistines Pitched In Aphek

Aphek was a Philistine stronghold near the coastal plain.

The two armies camped only a few miles apart.

Israel and the Philistines had been enemies for generations.

This is the same enemy Samson fought in the book of Judges.

🏹 Aphek was a Philistine stronghold

📏 The camps sat only miles apart

⚔️ Longtime enemies from the Judges era

📖 The same foe Samson once fought

## 💥 Israel Was Smitten Before The Philistines

"Smitten" means struck down and defeated in battle.

This was Israel's first loss in the chapter, not its last.

Nothing in the text blames bad luck or weak strategy.

The real question comes next, and it is why God allowed this.

💥 Smitten means struck down in battle

🥇 The first of two defeats

🚫 No blame on luck or strategy

📖 The real question is why God allowed it

## 🔢 About Four Thousand Men

Four thousand soldiers died in this single battle.

That number would have devastated a small nation like Israel.

This count becomes a grim comparison later in the chapter.

The next battle in this same chapter turns out far worse.

🔢 Four thousand men died here

💔 A devastating loss for a small nation

📊 It sets up a grim comparison

📖 The next battle turns out worse

## ❓ Wherefore Hath The LORD Smitten Us

"Wherefore" is an old word for why.

The elders correctly recognize that God allowed this defeat.

They never stop to ask what sin might have caused it.

Asking why without asking what went wrong is only half the question.

❓ Wherefore is an old word for why

👀 The elders rightly blame the LORD

🚫 They never ask what sin caused it

📖 Half a question is not enough

## 📦 Let Us Fetch The Ark Of The Covenant Of The LORD

The ark of the covenant was the sacred chest holding God's presence among His people.

Bringing it from Shiloh onto a battlefield was an unusual, drastic decision.

Nothing like this had been done before in living memory.

This request treats the ark itself as the fix, not the LORD.

📦 The ark held God's presence among His people

🚚 Moving it to battle was drastic

🆕 Nothing like this had been done

📖 The plan centers on an object

## 🛡️ That It May Save Us Out Of The Hand Of Our Enemies

The elders expect the ark to work almost like a weapon.

Nowhere in their words is there a call to seek God.

True deliverance in the Old Testament always required the LORD Himself.

This misunderstanding sets up everything that goes wrong in this chapter.

🛡️ They treat the ark like a weapon

🙏 No call here to seek God

🔑 Deliverance always required the LORD Himself

📖 This error shapes the whole chapter

## 👼 Which Dwelleth Between The Cherubims

Cherubim were powerful heavenly beings, not the soft figures often pictured today.

Two gold cherubim statues sat facing each other on top of the ark.

The space between them was considered the place where God's presence rested on earth.

Carrying the ark into battle meant carrying that meeting place along with the army.

👼 Cherubim were powerful heavenly beings

✨ Gold statues sat on the ark's lid

📍 That space marked God's presence

📖 The army carried that meeting place

## 👥 The Two Sons Of Eli, Hophni And Phinehas, Were There With The Ark

Hophni and Phinehas were the corrupt priests condemned back in chapter two.

Chapter three had already named God's coming judgment against Eli's house.

Their presence with the ark here is not a small detail.

Israel's most sacred object now sits in the hands of the least faithful men.

👥 Hophni and Phinehas were the corrupt priests

⚖️ Chapter three already named judgment against them

🚨 Their presence signals disaster ahead

📖 Sacred object, unfaithful hands

# FirstSamuel 4:5-9
# 😱 The Philistines Fear Israel's God
---
## 📢 All Israel Shouted With A Great Shout

The camp celebrates as though the battle is already won.

That confidence rests in a symbol, not in a changed heart toward God.

The ground itself is said to shake from the noise.

Loud celebration before the fighting even starts is a warning sign, not a good one.

📢 The camp celebrates before the fighting starts

🎯 Confidence rests in a symbol, not repentance

🌍 Loud enough to shake the ground

📖 Early celebration here is a warning sign

## 👂 What Meaneth The Noise Of This Great Shout In The Camp Of The Hebrews

"Meaneth" is an old spelling of means.

"Hebrews" was a common outside term for the people of Israel.

The Philistines hear the shout from a distance and grow concerned.

Their fear starts before they even know what caused the noise.

👂 Meaneth is an old spelling of means

🏷️ Hebrews was an outside name for Israel

😟 The Philistines grow concerned from far off

📖 Their fear starts before they know why

## 💡 They Understood That The Ark Of The LORD Was Come Into The Camp

Word about Israel's God had clearly reached the Philistines before this day.

Rumors from Israel's escape out of Egypt had spread for generations.

The Philistines recognized the ark at once, without needing it explained.

That recognition shows this God's reputation reached far past Israel's own borders.

💡 The Philistines already knew of this ark

📜 Exodus rumors had spread for generations

🎯 They recognized it without explanation

📖 God's reputation reached beyond Israel's borders

## 😨 God Is Come Into The Camp

The Philistines assume this God works like their own gods, bound to an object.

"Woe unto us" is an old cry of dread and distress.

"Heretofore" is an old word meaning before this time.

Their fear is real, even though their picture of God is not accurate.

😨 They assume God is bound to an object

😱 Woe unto us is a cry of dread

🆕 Heretofore is an old word for before

📖 Real fear built on a wrong picture

## ⚡ Who Shall Deliver Us Out Of The Hand Of These Mighty Gods

The Philistines use the plural word "Gods" here, revealing their own polytheism.

They assume Israel's one God must actually be several gods.

That misunderstanding does not make their fear any less genuine.

Even a wrong picture of God can still produce real terror.

⚡ Gods is plural, showing their polytheism

🙅 They assume Israel worships many gods

😰 Their fear is genuine despite the error

📖 A wrong picture of God can still terrify

## 🐸 These Are The Gods That Smote The Egyptians With All The Plagues In The Wilderness

This is a direct memory of the ten plagues from the book of Exodus.

That event had happened many generations earlier than this battle.

Word of it had survived that long inside Philistine memory and fear.

A neighboring nation still feared what this God had done long before.

🐸 A memory of the Exodus plagues

⏳ That event happened many generations earlier

🧠 The memory survived in Philistine fear

📖 A neighbor still feared this God's history

## 💪 Be Strong, And Quit Yourselves Like Men

"Quit yourselves like men" is an old idiom meaning act with courage.

This line works as a rallying cry meant to push past fear.

The Philistine commanders lean on fear of losing status, not fear of Israel's God.

Courage built on pride is not the same thing as faith.

💪 Quit yourselves like men means act with courage

📣 A rallying cry against fear

🏆 Fear of losing status drives them

📖 Courage here is not the same as faith

## ⛓️ That Ye Be Not Servants Unto The Hebrews, As They Have Been To You

This line points back to real history between these two nations.

Philistines had ruled over Israel at times during the period of the judges.

Israel had also defeated Philistine forces at other points in that same period.

Power had traded hands between these two nations for generations before this chapter.

⛓️ Points back to real Philistine history

📜 Philistines had ruled Israel at times

🔄 Israel had also defeated them before

📖 Power traded hands for generations

# FirstSamuel 4:10-11
# 💔 The Ark Is Taken, The Priests Are Slain
---
## ⚔️ The Philistines Fought, And Israel Was Smitten

This is the second defeat inside the same chapter.

The ark's presence did not change the outcome of the battle.

Israel had assumed the ark alone would guarantee a win.

That assumption turns out to be badly wrong.

⚔️ The chapter's second defeat

📦 The ark did not change the outcome

🙅 Israel wrongly trusted the ark alone

📖 That assumption proves badly wrong

## 🏃 They Fled Every Man Into His Tent

This phrase describes a full, chaotic retreat, not an orderly withdrawal.

Soldiers scattered back to their own camps in panic.

Total collapse like this usually has a deeper cause behind it.

The deeper cause was a nation that had not returned to God.

🏃 A full retreat, not an orderly one

😱 Soldiers scattered in panic

🧩 Total collapse usually has a deeper cause

📖 The real cause was distance from God

## 🔢 Thirty Thousand Footmen

This second loss was far worse than the four thousand from earlier.

"Footmen" refers to foot soldiers, the ordinary infantry of the army.

The rising death count shows how much worse things grew once the ark was captured.

This ranks among the largest single battle losses in the Old Testament.

🔢 Far worse than the earlier four thousand

🚶 Footmen means ordinary foot soldiers

📈 Losses grew after the ark was taken

📖 One of the largest defeats recorded

## 📦 The Ark Of God Was Taken

This had never happened before in Israel's history.

The ark had led Israel through the wilderness into the promised land.

Losing it here was not just a military defeat.

It meant losing the very symbol of God's presence with the nation.

📦 Never before lost in Israel's history

🏜️ The ark had led Israel through the wilderness

💔 More than a military loss

📖 The symbol of God's presence was gone

## ⚰️ Hophni And Phinehas Were Slain

Chapter two already recorded God's promise that both sons would die the same day.

That exact warning is fulfilled here, word for word.

Their deaths mark the end of a corrupt line of priests.

God's spoken judgment, once given, does not fail to happen.

⚰️ Both die the same day, as promised

📜 Chapter two's warning is fulfilled exactly

👥 Their deaths end a corrupt priestly line

📖 Spoken judgment does not fail

# FirstSamuel 4:12-18
# 🏃 Eli Falls At The News
---
## 🏃 There Ran A Man Of Benjamin Out Of The Army

Benjamin was one of the twelve tribes of Israel, near Shiloh.

This unnamed messenger ran the whole distance to deliver the news himself.

The text leaves him nameless, keeping the focus on the message he carries.

🏃 A messenger from the tribe of Benjamin ran

🗺️ Benjamin's territory sat near Shiloh

🤐 He is never named in the text

📖 The focus stays on his message

## 📏 Came To Shiloh The Same Day

The battle had taken place at Aphek, a real distance from Shiloh.

Covering that ground in a single day took enormous physical effort.

His urgency matched the weight of the news he was carrying.

📏 Aphek to Shiloh was real distance

🏃 Running it in one day took effort

⏱️ His urgency matched his news

📖 Bad news traveled as fast as he ran

## 👕 With His Clothes Rent, And With Earth Upon His Head

"Rent" is an old word meaning torn.

Torn clothes and dust on the head were common signs of mourning in this culture.

Anyone who saw him coming would sense disaster before he spoke a word.

👕 Rent means torn

🌍 Torn clothes and dust signaled mourning

👀 His appearance announced disaster first

📖 Mourning customs spoke before he did

## 👁️ Eli Sat Upon A Seat By The Wayside Watching, For His Heart Trembled For The Ark Of God

Eli's fear here centers on the ark, not first on his own sons.

This detail hints at what will actually break him later in this chapter.

Watching the road for hours shows how heavily this outcome weighed on him.

👁️ Eli watched the road for news

📦 His fear centers on the ark first

💔 This hints at what will break him

📖 The long wait shows the weight on him

## 📣 All The City Cried Out

The city reacts to the messenger's news before Eli even hears it.

Eli is blind now, so he cannot see the commotion around him.

He has to ask someone else what the noise even means.

📣 The city reacts before Eli hears

👁️‍🗨️ His blindness hides the commotion from him

❓ He must ask what the noise meant

📖 He learns secondhand, through sound alone

## 👴 Eli Was Ninety And Eight Years Old, And His Eyes Were Dim

This restates and sharpens the fading eyesight first named in chapter three.

Ninety eight was an extraordinary age for this period of history.

His physical blindness has mirrored his slowness to fully deal with his sons' sin.

👴 Ninety eight was an extraordinary age

😔 His eyes were dim, as chapter three noted

🔗 Physical blindness echoes his spiritual slowness

📖 The same picture returns at the end

## 🗣️ What Is There Done, My Son

Eli calls the messenger "my son," the same warm phrase he used with Samuel.

He asks directly for the truth, even sensing pain is coming.

His tenderness stays present even as the worst news of his life nears.

🗣️ My son echoes his words to Samuel

❓ Eli asks directly for the truth

💔 He senses painful news approaching

📖 His tenderness holds under dread

## ⚔️ Israel Is Fled Before The Philistines

This is the first piece of bad news the messenger delivers.

A full retreat like this signals a complete national defeat, not a small setback.

Eli hears this first, and it is not what finally breaks him.

⚔️ The first piece of bad news

🏃 A full retreat, not a small setback

👴 Eli hears this news first

📖 Not yet what breaks him

## 👥 Thy Two Sons Also, Hophni And Phinehas, Are Dead

This is the second, more personal loss the messenger names.

Chapter three had already promised this exact judgment would come.

Even hearing his own sons are dead does not make Eli collapse.

👥 The second, more personal loss

📜 Chapter three had already promised this

😔 Even this news does not break him

📖 Something heavier is still coming

## 📦 And The Ark Of God Is Taken

This is the third and final piece of news, saved for last.

This is the detail Eli had been watching the road for since verse thirteen.

The order of the report builds toward the one thing that finally breaks him.

📦 The last and heaviest piece of news

👁️ This is what Eli had dreaded

📈 The order builds toward the breaking point

📖 This is the detail that does it

## ⚰️ He Fell From Off The Seat Backward By The Side Of The Gate, And His Neck Brake, And He Died

Eli does not collapse at the news about his sons.

He collapses at the mention of the ark, the detail he feared most.

"Brake" is an old spelling of broke.

His death is instant and physical, not a slow decline.

⚰️ He did not collapse at his sons' deaths

📦 He collapsed at the mention of the ark

💥 His death was instant, not gradual

📖 Brake is an old spelling of broke

## 📅 He Had Judged Israel Forty Years

"Judged" here means he led the nation, not just a courtroom role.

Forty years was a long, complete span of leadership by ancient standards.

His story ends here, leaving the nation's leadership deeply unsettled.

📅 Judged means he led the nation

⏳ Forty years was a long span

🌪️ He leaves the nation unsettled

📖 A long leadership ends in one sudden moment

# FirstSamuel 4:19-22
# 👶 The Glory Has Departed
---
## 🤰 His Daughter In Law, Phinehas' Wife, Was With Child, Near To Be Delivered

This woman was Phinehas' wife, making her Eli's daughter in law.

She was extremely close to giving birth when the news arrived.

Her story closes out the chapter's picture of a household in total collapse.

🤰 Phinehas' wife, Eli's daughter in law

📅 She was near to giving birth

🏚️ Her story closes the household's collapse

📖 New life arrives inside disaster

## 😢 She Bowed Herself And Travailed, For Her Pains Came Upon Her

"Travailed" is an old word for going into labor.

The shock of the news triggers her labor at once.

Grief and physical crisis strike her in the very same moment.

😢 Travailed means went into labor

⚡ Shock triggered her labor at once

💔 Grief and crisis struck together

📖 Her body reacted before her mind could

## 🙅 Fear Not, For Thou Hast Born A Son. But She Answered Not, Neither Did She Regard It

The women around her offer the normal words meant to comfort a new mother.

She does not respond at all, not even to celebrate a newborn son.

Her silence says more than words could about the depth of her grief.

🙅 The women offer normal comfort words

🤐 She does not respond, even to a son

😔 Her silence speaks louder than words

📖 A newborn cannot outweigh this grief

## 📛 She Named The Child Ichabod, Saying, The Glory Is Departed From Israel

"Ichabod" is a Hebrew name meaning no glory or where is the glory.

Naming a child was often used to mark a major event in ancient Israel.

This ranks among the saddest names given to anyone in the Old Testament.

📛 Ichabod means no glory in Hebrew

✍️ Names often marked major events

😢 One of the saddest names in scripture

📖 The name preserves this tragedy permanently

## 💔 Because The Ark Of God Was Taken, And Because Of Her Father In Law And Her Husband

She lists three losses here, but names the ark first, not the people.

That order matches Eli's own reaction earlier in this chapter.

For both of them, losing God's presence weighed heavier than losing family.

💔 She names the ark before the people

🔗 It matches Eli's own reaction earlier

⚖️ God's presence weighed heaviest for both

📖 The ark's loss outweighs personal grief here

## 🔁 The Glory Is Departed From Israel: For The Ark Of God Is Taken

This exact phrase gets repeated twice within two verses.

Repetition in Hebrew writing was a common way to underline the main point.

The chapter opened in the silence of God's rare word.

It closes in the silence of His absent presence.

🔁 The same phrase repeats on purpose

📖 Repetition marks the chapter's central point

🔇 The chapter opens and closes in absence

➡️ Israel's real crisis was distance from God
`.trim();

export const FIRST_SAMUEL_FOUR_PERSONAL_SECTIONS = parseFirstSamuelFourRawNotes(FIRST_SAMUEL_FOUR_RAW_NOTES);
