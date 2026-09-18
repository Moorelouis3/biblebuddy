export type PsalmsEightyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyFiveRawNotes(rawText: string): PsalmsEightyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+85:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 85 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+85:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+85:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 85 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 85,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 85:${startVerse}` : `Psalms 85:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 85 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_FIVE_RAW_NOTES = `# Psalms 85:1-3
# 🌅 The LORD's Past Favor And Forgiveness
---
## 😊 Thou Hast Been Favourable Unto Thy Land

"Favourable" means kind, pleased, and openly generous toward someone.

Here it describes God's whole attitude turning warm toward the entire nation.

"Thy land" stands for the people who lived there, not just the dirt and hills.

The psalmist opens by remembering a time when God's kindness was obvious and complete.

😊 Favourable means kind and openly generous

🗺️ Thy land represents the whole nation

🙌 God's kindness once felt obvious

📖 The psalm opens by remembering that mercy

## 🏡 Brought Back The Captivity Of Jacob

"Jacob" here names the whole nation descended from him, not one man.

"Brought back the captivity" is an old phrase for reversing a nation's hard fortunes.

Many scholars believe it points to Israel's return from exile in Babylon.

The psalmist is thanking God for a real, remembered act of rescue.

🏡 Jacob names the whole nation

🔄 Brought back means fortunes were reversed

🏛️ Many scholars believe this points to Babylon

📖 The psalmist thanks God for a real rescue

## 🙏 Forgiven The Iniquity Of Thy People

"Iniquity" means guilt that comes from wrongdoing, not just an unlucky mistake.

The psalmist names the exact problem before praising the exact solution.

Forgiveness here is remembered as something God already gave the whole nation.

This sets up everything the rest of the psalm will ask for again.

🙏 Iniquity means guilt from real wrongdoing

✅ The exact problem gets named first

🎁 Forgiveness is remembered as already given

📖 This past mercy sets up the prayer ahead

## 🕊️ Covered All Their Sin. Selah

"Covered" pictures sin being hidden from view the way a blanket covers something.

This is the same picture behind the mercy seat that covered the ark inside the temple.

"Selah" is a musical or liturgical pause inserted for the reader to pause and reflect.

Here it follows a huge claim, God covering every single sin completely.

🕊️ Covered pictures sin hidden from view

📦 This recalls the mercy seat over the ark

⏸️ Selah marks a pause to reflect

📖 The pause follows a huge claim about mercy

## 😤 Taken Away All Thy Wrath

"Wrath" and "the fierceness of thine anger" say the same thing twice in a row.

Hebrew poetry often repeats one idea in two different phrases instead of adding a new one.

Both lines describe God's anger being completely removed, not just softened.

The repetition makes the removal feel total, not partial.

😤 Wrath and fierce anger restate one idea

🔁 Hebrew poetry often repeats for emphasis

🧯 God's anger is fully removed here

📖 Repetition makes the mercy feel complete

## 🔄 Turned Thyself From The Fierceness Of Thine Anger

"Turned thyself" pictures God physically turning his body away from something.

Anger is described here almost like a direction God was facing.

Turning away means that direction is no longer where God is looking.

The image gives a real shape to what forgiveness looked like.

🔄 Turned pictures a real change of direction

😠 Anger is described like a direction faced

👀 Turning away means anger is no longer aimed

📖 Forgiveness gets a real, physical shape here

# Psalms 85:4-7
# 🙌 A Prayer For Renewed Mercy
---
## 🔙 Turn Us, O God Of Our Salvation

"Turn us" is a request for God to restore and bring the people back to him.

"God of our salvation" names God by the very thing being asked for.

The title itself becomes part of the appeal, since it reminds God of his own character.

Naming God this way is not flattery, it is a real argument.

🔙 Turn us asks for full restoration

🏷️ God of our salvation names the request

💬 The title itself becomes an appeal

📖 Naming God this way is a real argument

## 🛑 Cause Thine Anger Toward Us To Cease

Verse three already said God's past wrath was taken away completely.

This verse still asks for present anger to stop, which can feel like a contradiction.

It is not one, since psalms like this often use past mercy as the reason to expect present help.

The people remember an old rescue while still living through a hard season.

🛑 This verse asks for present anger to end

⏳ Verse three already named a past mercy

🤝 Past mercy becomes the reason for new hope

📖 Memory of rescue fuels a fresh request

## ❓ Wilt Thou Be Angry With Us For Ever

This is phrased as a question, but it carries real anguish, not curiosity.

"For ever" does not predict an actual eternal outcome here.

It is the kind of thing a hurting person says when a hard season will not end.

Scripture allows this kind of honest, pained question directed straight at God.

❓ The question carries real anguish

⏳ For ever expresses a hard season, not fact

😣 Hurting people ask questions like this

📖 Scripture allows honest, pained questions to God

## 💤 Wilt Thou Not Revive Us Again

"Revive" means to bring back to life or full strength after a period of weakness.

The people feel worn down, almost lifeless, from the hardship they are living through.

"That thy people may rejoice in thee" names the goal of that reviving.

The point of being revived is not comfort alone, it is joy in God himself.

💤 Revive means brought back to full strength

😓 The people feel worn down and weak

😄 Rejoicing in God is the real goal

📖 Joy in God is the real aim

## 🤲 Shew Us Thy Mercy, O LORD

"Shew" is an old spelling of "show," meaning to display something openly.

"Mercy" here means compassion shown to someone who has not earned it.

The request is not for God to feel mercy privately, but to make it visible.

The people want to see proof of God's kindness again.

🤲 Shew is an old word for show

💝 Mercy means undeserved compassion

👀 The people want mercy made visible

📖 They want visible proof of kindness

## 🛡️ Grant Us Thy Salvation

"Salvation" here means real, practical rescue, not only a future promise.

This request follows right after mercy, but names something slightly different.

Mercy asks for compassion, salvation asks for actual deliverance from trouble.

The psalm moves from what God feels toward what God will do.

🛡️ Salvation means real, practical rescue

🎯 Mercy and salvation are two separate requests

⚙️ Salvation is about what God will do

📖 The prayer moves from feeling to action

# Psalms 85:8-9
# 👂 Listening For God's Answer
---
## 👂 I Will Hear What God The LORD Will Speak

The prayer suddenly shifts from asking to listening.

The psalmist stops talking and takes on the posture of someone waiting for an answer.

This models something a reader can copy, prayer includes silence, not only requests.

Real conversation with God goes both directions.

👂 The prayer shifts from asking to listening

🤫 The psalmist stops talking to wait

🔁 Prayer includes silence, not only requests

📖 Real conversation with God goes both ways

## ☮️ He Will Speak Peace Unto His People, And To His Saints

"Peace" here means the Hebrew idea of shalom, full wholeness, not just an absence of conflict.

"Saints" does not mean specially holy individuals in the later church sense.

It simply means the whole covenant people who belong to God.

God's coming word is described as peace before anything else is said.

☮️ Peace here means full wholeness, or shalom

👥 Saints means the whole covenant people

🚫 Not a title for a special few

📖 Peace comes first in what God will say

## 🚫 Let Them Not Turn Again To Folly

"Folly" means foolish, stubborn rebellion, not simple mistakes.

This is a quiet warning tucked inside a promise of peace.

The nation had already lived through the pain that folly caused before.

The prayer hopes for peace without repeating the same old failure.

🚫 Folly means stubborn, foolish rebellion

⚠️ A warning sits inside this promise

📜 The nation already knew folly's pain

📖 Peace should not lead back to failure

## 🙏 Surely His Salvation Is Nigh Them That Fear Him

"Nigh" is an old word meaning near or close by.

"Fear him" does not mean being scared of God like an enemy.

It means holding God in deep reverence and honest respect.

Salvation is described as already close to the people who honor God this way.

🙏 Nigh is an old word for near

😌 Fear here means deep reverence, not terror

🎯 Salvation is close to those who revere God

📖 Reverence puts a person near to rescue

## ✨ That Glory May Dwell In Our Land

"Glory" describes God's own visible presence and weight of holiness.

"Dwell" means to live somewhere permanently, not just visit.

This recalls the presence that filled the tabernacle and later the temple.

The psalmist wants more than rescue, he wants God living among the people again.

✨ Glory means God's visible presence

🏠 Dwell means living there permanently

🕍 This recalls the tabernacle and temple

📖 The psalmist wants God's presence, not just rescue

# Psalms 85:10-11
# 🤝 Mercy, Truth, Righteousness, And Peace Meet
---
## 🤝 Mercy And Truth Are Met Together

The psalmist pictures two qualities as people walking toward each other.

"Mercy" here is the Hebrew idea of loyal, covenant love that never gives up.

"Truth" means steady faithfulness, the kind that keeps its word.

Picturing them meeting shows these are not opposites fighting each other, they work as one.

🤝 Mercy and truth are pictured as people

💗 Mercy means loyal, covenant love

🗝️ Truth means steady, kept faithfulness

📖 The two work together, not against each other

## 💋 Righteousness And Peace Have Kissed Each Other

A kiss in this culture was a common greeting between close friends or reconciled parties.

"Righteousness" means living rightly in relationship with God and others.

"Peace" again carries the full idea of shalom, wholeness and rest.

The image says right living and true peace are no longer strangers, they now embrace.

💋 A kiss meant a warm greeting

⚖️ Righteousness means living rightly with God and others

🕊️ Peace again means full shalom

📖 Right living and peace now embrace

## 🌱 Truth Shall Spring Out Of The Earth

This pictures truth growing up from the ground the way a crop grows from seed.

It is not something forced from outside, it grows naturally once conditions are right.

The image suggests faithfulness becoming ordinary and expected again in the land.

Something planted long ago is finally producing fruit.

🌱 Truth is pictured growing like a crop

🌾 It grows naturally, not by force

🏞️ Faithfulness becomes ordinary in the land

📖 Something planted long ago bears fruit

## ☁️ Righteousness Shall Look Down From Heaven

This matches the picture right before it, truth rising from earth, righteousness leaning down from heaven.

Together the two images show heaven and earth meeting in the middle.

This echoes verse nine, where glory was asked to dwell in the land.

Heaven is not distant here, it is actively watching and reaching downward.

☁️ Righteousness leans down from heaven

🌍 Earth and heaven meet in this image

🔁 This echoes verse nine's request for glory

📖 Heaven reaches down instead of staying distant

# Psalms 85:12-13
# 🌾 The Land's Increase And The Path Ahead
---
## 🎁 The LORD Shall Give That Which Is Good

This states plainly that God is the source of every real good thing that follows.

It is a short line, but it sets up everything the rest of the verse promises.

Nothing described next comes from luck or human effort alone.

The credit is placed on God before the blessing is even named.

🎁 God is named as the source of good

📝 This short line sets up the promise

🚫 Nothing here comes from luck alone

📖 Credit goes to God before the blessing

## 🌾 Our Land Shall Yield Her Increase

"Increase" means a good harvest, crops and produce coming up from the ground.

In this culture a strong harvest was proof that a covenant with God was healthy.

Deuteronomy had already promised this exact kind of blessing for faithfulness generations earlier.

Physical, everyday abundance is treated as a spiritual sign, not just good luck.

🌾 Increase means a strong, real harvest

📜 A good harvest proved covenant health

📚 Deuteronomy already promised this kind of blessing

📖 Everyday abundance is treated as a spiritual sign

## 🚶 Righteousness Shall Go Before Him

"Go before" describes a herald walking ahead of a king to announce his coming.

Righteousness is pictured here as that herald, clearing the way and announcing God's approach.

This is the same quality named back in verse ten, now given a new role.

It does not just meet peace anymore, it leads the whole procession.

🚶 Go before pictures a royal herald

📯 Righteousness announces God's approach

🔁 Same quality named earlier in verse ten

📖 It now leads instead of just meeting peace

## 🛤️ Shall Set Us In The Way Of His Steps

"The way of his steps" means the actual path of a right, godly life.

The psalm began by asking God to turn the people back toward him.

It ends by describing exactly what that turned life looks like, walking in his footsteps.

The whole psalm moves from remembered mercy to a prayer for a changed path forward.

🛤️ The way of his steps means godly living

🔙 The psalm began asking to be turned back

👣 It ends with walking in God's footsteps

📖 The psalm moves from mercy to a path
`.trim();

export const PSALMS_EIGHTY_FIVE_PERSONAL_SECTIONS = parsePsalmsEightyFiveRawNotes(PSALMS_EIGHTY_FIVE_RAW_NOTES);
