export type JeremiahEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahEightRawNotes(rawText: string): JeremiahEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 8:${startVerse}` : `Jeremiah 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 8 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_EIGHT_RAW_NOTES = `# Jeremiah 8:1-3
# 💀 Bones Dragged From The Grave
---
## 💀 They Shall Bring Out The Bones Of The Kings Of Judah

"Bones" means what remained of a body long after burial.

Digging up a grave was considered one of the worst possible insults in this culture.

Kings, princes, priests, and prophets were all buried with honor when they died.

This judgment reaches back and shames people already generations dead.

A nation's disgrace could reach even into its own graves.

💀 Bones means a body long buried

👑 Kings and priests died with honor

📉 The judgment reached even the dead

📖 Disgrace stretched into their own graves

## 🌞 Spread Them Before The Sun, And The Moon, And All The Host Of Heaven

"Host of heaven" means the sun, moon, and every visible star.

These people had worshiped those very lights instead of the LORD.

Now the same sun and moon would look down on their exposed bones.

Their false gods could do nothing to hide their shame.

The objects of their worship became witnesses to their disgrace.

🌞 Host of heaven means sun moon stars

🙏 They had worshiped those same lights

👀 Now those lights witnessed their shame

📖 False gods could not hide them

## 🗑️ They Shall Be For Dung Upon The Face Of The Earth

"Dung" here means waste left in the open, not gathered or buried.

Normal burial was a bare minimum of dignity in this culture.

Leaving a body exposed denied that dignity completely.

No family would be left to gather these bones and bury them properly.

This was judgment with no one left to grieve.

🗑️ Dung means waste left in the open

⚰️ Burial was the bare minimum of dignity

🚫 These bodies would be denied even that

📖 Judgment left no one to grieve

## ☠️ Death Shall Be Chosen Rather Than Life

This is not a single person feeling hopeless for a moment.

This describes an entire remaining population wishing for death over the coming trouble.

Normally people cling to life no matter how hard things get.

Here that instinct itself has been reversed by the coming judgment.

The scale of what was coming made death look like relief.

☠️ Not one person but a whole population

🔄 Normally people cling to life

📉 Here that instinct is reversed

📖 The judgment ahead made death look like relief

# Jeremiah 8:4-7
# 🦢 Birds Know Their Season, My People Do Not
---
## ↩️ Shall They Fall, And Not Arise? Shall He Turn Away, And Not Return?

This is not really a question about someone tripping and getting back up.

God is describing an entire nation's refusal to turn back to him.

Falling and rising was the normal, expected pattern after any stumble.

Turning away and never returning was not normal at all.

The line names how unnatural their stubbornness truly was.

❓ Not a question about physical falling

🔄 Falling and rising was the normal pattern

🚫 Turning away and never returning was not

📖 God names how unnatural their stubbornness was

## 🐎 Slidden Back By A Perpetual Backsliding

"Backsliding" means slipping back into old sin after appearing to turn from it.

"Perpetual" means this was not a one time relapse.

It had become their constant, repeated pattern instead.

The people kept holding fast to deceit instead of letting it go.

A habit repeated long enough starts to feel normal.

🐎 Backsliding means slipping back into old sin

🔁 Perpetual means constant not occasional

🤥 They held fast to deceit instead

📖 A repeated habit starts to feel normal

## 🕊️ The Stork In The Heaven Knoweth Her Appointed Times

The stork, turtledove, crane, and swallow were all migratory birds known throughout Israel.

Each species returned at the exact same season every single year without fail.

Farmers set their calendars by watching these birds arrive and leave.

Even wild animals kept the natural order God built into creation.

God's own people could not read a timing far more important than a bird's migration.

🕊️ These birds all migrated on schedule

📅 Farmers set calendars by their arrival

🌎 Even animals kept God's natural order

📖 God's people missed a timing that mattered more

## 🙉 My People Know Not The Judgment Of The LORD

Birds follow an instinct they cannot even explain.

God's people had something far greater, his own spoken word.

Yet they were the ones who failed to keep the appointed time.

Knowing more only made their failure worse, not better.

Instinct guided the birds home while stubbornness kept Israel away.

🙉 Birds follow instinct without being taught

📜 God's people had his own spoken word

⚖️ Knowing more made the failure worse

📖 Instinct led birds home not Israel

# Jeremiah 8:8-12
# ✒️ The Pen Of The Scribes Is In Vain
---
## 📚 We Are Wise, And The Law Of The LORD Is With Us

Having a copy of the law was not the same as obeying it.

The people pointed to the written scrolls as proof they were fine.

God says that confidence itself was the problem, not the solution.

Owning the text without living it was worthless.

Knowledge without obedience never made anyone right with God.

📚 Owning the law was not obeying it

🗂️ They pointed to scrolls as proof

❌ That confidence was itself the problem

📖 Knowledge without obedience never counts

## ✒️ The Pen Of The Scribes Is In Vain

Scribes were trained experts who copied and explained the law for a living.

Their pens were supposed to preserve God's word accurately and honestly.

Instead they had changed or twisted the law to say what pleased people.

A trained expert misusing his skill can do more damage than an untrained fool.

Even the professionals meant to guard the truth had turned against it.

✒️ Scribes copied and explained the law

🖊️ Their pens should have preserved it faithfully

🎭 Instead they twisted it to please people

📖 Even the experts turned against the truth

## 💰 Every One From The Least Even Unto The Greatest Is Given To Covetousness

This corruption was not limited to a few powerful people at the top.

It reached every single level of society, rich and poor alike.

"Covetousness" means a restless craving for more than a person needs.

No class in the nation had escaped this same disease.

When greed reaches everyone, no one is left to correct it.

💰 Covetousness means craving more than enough

📊 This reached every level of society

🚫 No class had escaped this disease

📖 Widespread greed leaves no one to correct it

## ✌️ Saying, Peace, Peace

"Peace" repeated twice was meant to sound extra reassuring.

Local leaders told people everything was fine when it clearly was not.

This exact block of verses already appeared word for word back in chapter six.

Repeating the same warning twice showed how little the first one changed.

False comfort from a leader can be more dangerous than honest bad news.

✌️ Peace repeated twice sounded extra reassuring

🤥 Leaders said all was fine

🔁 This same warning already appeared in chapter six

📖 Repeating it twice shows nothing had changed

# Jeremiah 8:13-17
# 🍇 No Grapes, No Figs, No Peace
---
## 🍇 There Shall Be No Grapes On The Vine, Nor Figs On The Fig Tree

The vine and fig tree together were the standard picture of peace and blessing in this culture.

Sitting under your own vine and fig tree meant safety, rest, and enough to eat.

God says he will strip away that entire picture completely.

Even the leaves themselves will wither and fall away.

Removing the most basic sign of blessing was itself a message.

🍇 Vine and fig tree meant peace and safety

🍃 Even the leaves will wither away

🚫 God strips away that entire picture

📖 Losing the sign itself was the message

## 🍷 Given Us Water Of Gall To Drink

"Gall" means a bitter poisonous plant, the opposite of refreshing water.

Thirsty people expect relief when they finally get something to drink.

Instead God gives them something bitter and harmful.

The picture describes judgment that tastes as bad as it feels.

There was no relief left anywhere, not even in a simple cup of water.

🍷 Gall means a bitter poisonous plant

💧 Thirsty people expect relief from water

☠️ Instead they got something bitter and harmful

📖 No relief was left anywhere

## 🐎 The Snorting Of His Horses Was Heard From Dan

Dan sat at the far northern edge of the land of Israel.

Armies invading from the north always reached Dan first.

Hearing enemy horses already at Dan meant the invasion had already begun.

The danger was no longer distant news from a foreign report.

It had reached the nation's own front doorstep.

🐎 Dan sat at Israel's northern edge

⚔️ Invading armies always reached Dan first

🚪 The danger had reached the front door

📖 This was no longer distant news

## 🐍 I Will Send Serpents, Cockatrices, Among You, Which Will Not Be Charmed

"Cockatrice" is an old word for a venomous snake, not the mythical creature people picture today.

Snake charmers in this culture could normally calm and control dangerous snakes.

God says these snakes would ignore even a trained charmer completely.

The judgment itself could not be managed, soothed, or talked out of coming.

Nothing left in human skill could stop what was coming.

🐍 Cockatrice means an old word for viper

🎶 Charmers normally could calm snakes

🚫 These snakes ignored even a trained charmer

📖 Nothing in human skill could stop it

# Jeremiah 8:18-22
# 🩹 Is There No Balm In Gilead
---
## 💔 When I Would Comfort Myself Against Sorrow, My Heart Is Faint In Me

This is Jeremiah speaking in his own voice, not just relaying a message.

He tries to comfort himself and cannot find any relief.

A true prophet does not deliver bad news from a safe distance.

Jeremiah carries the same grief he is asked to announce.

His own exhaustion becomes part of the message itself.

💔 Jeremiah speaks in his own voice

😔 He cannot comfort himself either

🗣️ A prophet does not stay distant

📖 His grief becomes part of the message

## 🏛️ Is Not The LORD In Zion? Is Not Her King In Her?

The people ask this rhetorically, assuming the answer obviously protects them.

This is the same false confidence already exposed back in chapter seven.

Having God's temple in their city was never an automatic safety net.

The question itself reveals how little they had actually learned.

A right answer to a wrong question never brings real safety.

🏛️ They assumed the temple protected them

🔁 This echoes the false confidence from chapter seven

🚫 God's presence was never automatic safety

📖 The wrong question still felt reassuring to them

## 🌾 The Harvest Is Past, The Summer Is Ended, And We Are Not Saved

Harvest and summer marked a fixed window for gathering food before winter came.

Once that window closed, no amount of effort could bring it back.

The same fixed window applied to their chance to turn back to God.

That window had now fully closed.

They had simply waited and done nothing.

A missed season cannot simply be repeated on demand.

🌾 Harvest marked a fixed window for food

⏳ Once closed effort could not reopen it

🚪 Their chance to turn back also closed

📖 A missed season cannot be repeated

## 🩹 Is There No Physician There

"Balm" means a well known healing ointment made from a fragrant tree resin.

Gilead was a region famous for producing and trading this exact balm.

Genesis already mentioned traders carrying Gilead's balm on their way to Egypt.

The question assumes a real remedy exists somewhere close by.

Some wounds are spiritual, not physical.

No balm or doctor could ever reach that kind of wound.

🌿 Balm meant a plant made healing ointment

🐫 Gilead traded this exact balm in Genesis

💔 This wound was spiritual not physical

📖 No doctor on earth could reach it
`.trim();

export const JEREMIAH_EIGHT_PERSONAL_SECTIONS = parseJeremiahEightRawNotes(JEREMIAH_EIGHT_RAW_NOTES);
