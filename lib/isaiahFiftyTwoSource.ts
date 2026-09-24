export type IsaiahFiftyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyTwoRawNotes(rawText: string): IsaiahFiftyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+52:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 52 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+52:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+52:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 52 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 52,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 52:${startVerse}` : `Isaiah 52:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 52 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_TWO_RAW_NOTES = `# Isaiah 52:1-3
# 💪 Awake, Awake, Put On Thy Strength
---
## 🔁 Awake, Awake, Put On Thy Strength, O Zion

This is the third such awake, awake call in a row.

First the people asked God's arm to awake and act.

Then God told Jerusalem herself to awake and stand up.

Now the same command returns, this time about strength.

Zion is not asked to wait any longer.

🔁 This is the third such awake call
🙏 First the people asked God's arm to act
🏙️ Then God told Jerusalem to stand up
📖 Now Zion is told to put on strength

## 👗 Put On Thy Beautiful Garments, O Jerusalem, The Holy City

Beautiful garments means the fine clothes worn for a feast.

This is the opposite of mourning clothes, plain and torn.

Jerusalem was pictured earlier sitting in the dust like a mourner.

Now she is told to dress like the celebration already started.

Holy city means set apart for God once again.

👗 Beautiful garments means clothes worn for a feast
😢 This reverses the earlier picture of mourning
🎉 Jerusalem is told to dress for celebration
📖 Holy city means set apart for God again

## ✂️ There Shall No More Come Into Thee The Uncircumcised And The Unclean

Uncircumcised describes a man without the sign God gave Abraham's family.

Here it points to a foreign invader, not just any outsider.

Unclean describes anyone unfit to enter God's holy places.

Both words describe the same danger, an enemy breaking in.

This promises a city safe enough to be holy again.

✂️ Uncircumcised points to a foreign invader here
🚫 Unclean means unfit to enter God's holy places
⚔️ Both words describe the same kind of danger
📖 This promises safety not just survival

## 😔 Shake Thyself From The Dust, Arise, And Sit Down

Sitting in the dust was a sign of mourning or defeat.

Shake thyself pictures physically rising out of that posture of grief.

Arise and sit down does not mean sitting on the ground again.

It pictures sitting up on a throne, a seat of honor.

Three short steps move Jerusalem from the ground to dignity.

😔 Sitting in dust was a sign of mourning
🧹 Shake it off pictures rising out of grief
👑 Sit down here means sitting on a throne
📖 Three short steps move her to dignity

## ⛓️ Loose Thyself From The Bands Of Thy Neck, O Captive Daughter Of Zion

Bands means the ropes or chains put on a prisoner's neck.

Daughter of Zion is a common way the Bible names Jerusalem.

It pictures the whole city as a single person.

Captive daughter of Zion names exactly what happened to her.

The command tells her to remove chains already coming loose.

⛓️ Bands means chains put on a prisoner's neck
👧 Daughter of Zion pictures the whole city
🏙️ Captive names exactly what happened to her
📖 Freedom is being announced not just hoped for

## 💸 Ye Have Sold Yourselves For Nought, Ye Shall Be Redeemed Without Money

Sold yourselves for nought means their own sin caused this captivity.

They gained nothing of real value from that sin.

Redeemed means bought back out of captivity.

Without money means this rescue works nothing like a normal sale.

God simply sets His people free.

💸 Sold for nought means no real gain
⛓️ Redeemed means bought back from captivity
🚫 Without money means no normal sale
📖 God simply sets His people free

# Isaiah 52:4-6
# 🌍 My People Went Down Into Egypt
---
## 📅 My People Went Down Aforetime Into Egypt To Sojourn There

Aforetime is an old word meaning long ago.

Sojourn means staying somewhere without owning the land.

This recalls Jacob's family moving to Egypt during a famine.

That stay was meant to be temporary from the start.

Egypt is the first of two examples given in this verse.

📅 Aforetime means long ago in the past
🏕️ Sojourn means staying without owning the land
👨‍👩‍👧‍👦 This recalls Jacob's family moving to Egypt
📖 Egypt is the first of two examples

## ⚔️ The Assyrian Oppressed Them Without Cause

The Assyrian names a second foreign power.

This empire later crushed the northern kingdom of Israel.

Oppressed means ruled over harshly, taking more than was fair.

Without cause means Israel had done nothing to earn this.

Egypt and Assyria together give two full examples of foreign control.

⚔️ The Assyrian names a second foreign power
👊 Oppressed means ruled over harshly
❓ Without cause means this cruelty was not earned
📖 Two examples now stand behind this promise

## ❓ What Have I Here, Saith The LORD, That My People Is Taken Away For Nought

This is God asking His own question out loud.

He is not looking for information.

For nought repeats the same phrase from verse three.

No one gained anything legitimate by taking His people captive.

The question exposes the exile as an injustice.

❓ God asks this without looking for information
🔁 For nought repeats the phrase from verse three
⚖️ No one gained anything legitimate from this
📖 The exile is exposed as an injustice

## 😭 They That Rule Over Them Make Them To Howl

Howl describes loud, painful crying, not quiet sadness.

Rule over them names whoever controlled the exiled people.

Most directly, this points to Babylon.

This is a plain description of real, audible suffering.

The verse does not soften what captivity actually felt like.

😭 Howl means loud painful crying
👑 Rule over them names Israel's current captors
🔊 This describes real audible suffering
📖 The verse does not soften the pain

## 🗣️ My Name Continually Every Day Is Blasphemed

Blasphemed means spoken of with contempt or mockery.

A defeated, enslaved people made their God look weak to onlookers.

Continually every day means this was not one insult.

It was an ongoing pattern of mockery.

God treats an insult to His people as an insult to Himself.

🗣️ Blasphemed means spoken of with contempt
👀 A defeated people made their God look weak
📅 Continually every day means this was constant
📖 An insult to His people insults His name

## 🏷️ Therefore My People Shall Know My Name

Know my name here means far more than recognizing a title.

It means experiencing firsthand that God is who He claims to be.

Therefore ties this straight back to the mockery named in the verse before.

An insulted name is about to be proven true instead.

This promise answers the blasphemy directly.

🏷️ Know my name means real personal experience
🔗 Therefore ties this to the mockery just named
✅ God's name is about to be proven true
📖 This promise directly answers the blasphemy

## 🔥 I Am He That Doth Speak: Behold, It Is I

I am he echoes God's own words to Moses at the burning bush.

Doth speak means it is God Himself talking, not a messenger.

Behold, it is I repeats the same claim a second time for emphasis.

This places all the weight on God Himself.

The promise is proof, not just a message passed along.

🔥 I am he echoes God's words to Moses
🗣️ Doth speak means God Himself is talking
🔁 Behold it is I repeats the claim
📖 The promise is proof not just a message

# Isaiah 52:7-8
# 🏃 How Beautiful Upon The Mountains
---
## 🏃 How Beautiful Upon The Mountains Are The Feet Of Him That Bringeth Good Tidings

This pictures a messenger running across the hills toward Jerusalem.

Watchers on the city walls waited for a runner bringing news.

Feet stands in for the whole tired, dusty messenger.

Those feet are called beautiful only because of the news they carry.

The messenger himself is not the point.

🏃 This pictures a runner bringing news
🏔️ Mountains describes the hill country around Jerusalem
👣 Feet stands in for the whole messenger
📖 The feet are beautiful because of the news

## 📰 That Bringeth Good Tidings, That Publisheth Peace

Good tidings means welcome news.

Publisheth means announcing something loudly and publicly.

Peace here means the end of conflict and danger.

The messenger is not spreading a rumor.

He is making an official, public announcement.

📰 Good tidings means welcome news
📢 Publisheth means announcing loudly and publicly
🕊️ Peace means the end of conflict and danger
📖 This is an official announcement not a rumor

## 👑 Thy God Reigneth

This short phrase is the actual message the runner carries.

Reigneth means rules as king, actively in control.

Exiles had watched foreign kings rule over them for years.

This was the news that mattered most to them.

God had never stopped being king, even during exile.

👑 Reigneth means actively ruling as king
⛓️ Exiles had lived under foreign kings for years
🔥 This is the actual message being announced
📖 God never stopped being king

## 👀 Thy Watchmen Shall Lift Up The Voice, With The Voice Together Shall They Sing

Watchmen were stationed on the city walls.

They watched for both danger and for good news.

Lift up the voice pictures shouting once they spot the runner.

With the voice together means many watchmen crying out at once.

This is a whole city breaking into celebration together.

👀 Watchmen watched the walls for danger and news
📢 Lift up the voice means shouting out loud
🎤 Together means many watchmen crying out at once
📖 This is a whole city breaking into celebration

## 👁️ They Shall See Eye To Eye, When The LORD Shall Bring Again Zion

See eye to eye is an old idiom for witnessing something firsthand together.

It does not simply mean agreeing with someone.

Bring again means bring back, restoring something to where it started.

This names the exact moment the watchmen are celebrating.

It is the return of God's people from exile.

👁️ See eye to eye means witnessing together firsthand
🚫 It does not simply mean agreeing
🔙 Bring again means bring back and restore
📖 This names the return of God's people

# Isaiah 52:9-10
# 🎶 Break Forth Into Joy
---
## 🏚️ Break Forth Into Joy, Sing Together, Ye Waste Places Of Jerusalem

Waste places means the ruined, abandoned sections of the city.

The command to sing is spoken directly to those ruins.

It pictures rubble itself joining the celebration.

This shows the change reaching even the most broken parts.

No corner of the city is left out of the joy.

🏚️ Waste places means the city's ruined parts
🎵 Even the ruins are told to sing
🌍 This shows the change reaching every corner
📖 No part of the city is left out

## 🤗 The LORD Hath Comforted His People, He Hath Redeemed Jerusalem

Comforted and redeemed are named together here on purpose.

Comfort is the emotional promise, repeated often in this part of Isaiah.

Redeemed is the practical side, bought back out of captivity.

Together they say God has both felt for His people and acted.

Neither word alone would tell the full story.

🤗 Comforted names the emotional side of this promise
⛓️ Redeemed names the practical side bought back
🔗 Both words are placed together on purpose
📖 God both felt for His people and acted

## 💪 The LORD Hath Made Bare His Holy Arm In The Eyes Of All The Nations

Made bare pictures rolling up a sleeve to do hard work.

Arm is a repeated picture in Isaiah for God's own power.

In the eyes of all the nations means this was not done secretly.

Every watching nation was meant to see who did this.

💪 Made bare pictures rolling up a sleeve
🦾 Arm pictures God's own power acting
👀 This was done for all to see
📖 Everyone was meant to see who did it

## 🌍 All The Ends Of The Earth Shall See The Salvation Of Our God

Ends of the earth means every distant place, not just nearby nations.

This promise reaches far beyond the people who were exiled.

One nation's rescue is described as something the whole world will witness.

The scale of the promise keeps growing across this chapter.

🌍 Ends of the earth means every distant place
📈 This reaches beyond Israel alone
👁️ The whole world is meant to witness this
📖 The promise keeps growing larger across Isaiah

# Isaiah 52:11-12
# 🚶 Depart Ye, Depart Ye
---
## 📍 Depart Ye, Depart Ye, Go Ye Out From Thence, Touch No Unclean Thing

Thence means from there, pointing back to Babylon.

The doubled command matches the urgency of the earlier awake, awake calls.

Touch no unclean thing means staying ritually pure on the journey.

This departure is not just a change of address.

It is a return to holy living.

📍 Thence points back to the place of exile
🔁 The doubled command matches the earlier urgency
🚫 Touch no unclean thing means staying pure
📖 This is a return to holy living

## 🏺 Be Ye Clean, That Bear The Vessels Of The LORD

Vessels means the sacred bowls and tools used in temple worship.

They had been carried off to Babylon as plunder.

Bear the vessels means the honor of carrying them home.

Be ye clean sets the requirement for handling them.

Only those ritually pure could carry these sacred objects.

🏺 Vessels means the sacred bowls and tools
👊 They had been taken as plunder to Babylon
🙌 Bear the vessels means carrying them home
📖 Only the ritually clean could handle them

## 🏃 Ye Shall Not Go Out With Haste, Nor Go By Flight

Haste and flight both describe a rushed, panicked departure.

The first exodus out of Egypt happened exactly that way.

The bread had no time to rise before they left.

This return will be calm and unhurried instead.

No enemy is chasing this group out the door.

🏃 Haste and flight both mean a rushed departure
🍞 The first exodus out of Egypt was rushed
🚶 This return will be calm not desperate
📖 No enemy is chasing this group out

## 🧭 The LORD Will Go Before You, The God Of Israel Will Be Your Rereward

Go before means leading from the front.

It pictures a guide walking ahead on an unfamiliar road.

Rereward is an old military word for the rear guard.

Together the two pictures cover the whole group, front and back.

God guards every side of the journey home.

🧭 Go before means leading from the front
🛡️ Rereward names the old rear guard
🔄 Together the two pictures cover front and back
📖 God guards every side of the journey home

# Isaiah 52:13-15
# 😢 Behold, My Servant Shall Deal Prudently
---
## 🗣️ Behold, My Servant Shall Deal Prudently

My servant is a title Isaiah uses across several chapters.

It names a key figure central to the rest of this book.

Deal prudently means act with wisdom and skill.

Behold signals that something important is about to be revealed.

This verse opens a section that continues into the next chapter.

🗣️ My servant is a key figure in Isaiah
🧠 Deal prudently means act with wisdom and skill
👉 Behold signals something important is coming
📖 This section continues into the next chapter

## 📈 He Shall Be Exalted And Extolled, And Be Very High

This verse stacks three different words for greatness in a row.

Exalted means lifted up to a position of honor.

Extolled means praised highly by others.

Very high pushes that height as far as it can go.

Stacking three words together is Hebrew poetry's way of adding weight.

📈 Three different words for greatness stack here
👑 Exalted means lifted up to honor
🎉 Extolled means praised highly by others
📖 Stacking words shows words are not enough

## 👤 His Visage Was So Marred More Than Any Man

Visage means face or outward appearance.

Marred means damaged or disfigured, changed for the worse.

This line sits right beside the promise of exaltation before it.

The contrast between the two is jarring on purpose.

This sets up the suffering described in the next chapter.

👤 Visage means face or outward appearance
💔 Marred means damaged or disfigured
⚡ This sits beside the promise of exaltation
📖 This sets up the next chapter's suffering

## 🩸 So Shall He Sprinkle Many Nations

Sprinkle is a word tied to priestly ritual.

Blood or water was sprinkled to make something ceremonially clean.

Applying that word to nations, not just Israel, is a striking expansion.

This servant's suffering is pictured doing a priest's work on a larger scale.

Many nations means this reaches far past Israel's own borders.

🩸 Sprinkle is a priestly word for cleansing
🙏 This is normally what a priest's ritual did
🌍 Many nations means this reaches past Israel
📖 One servant's suffering does a priest's work

## 🤐 The Kings Shall Shut Their Mouths At Him

Shut their mouths pictures kings who normally have plenty to say.

Here they are left completely silent instead.

Earlier in this chapter, enemies spoke cruel words over defeated Jerusalem.

Here the direction reverses, powerful kings fall silent instead.

This silence comes from shock and reverence, not indifference.

🤐 Shut their mouths means left completely silent
😔 Earlier enemies spoke cruelly over defeated Jerusalem
🔄 Here the direction reverses completely
📖 This silence comes from shock and reverence

## 📭 That Which Had Not Been Told Them Shall They See

This describes nations who never received a direct message from God.

Had not been told means they lacked the usual way to learn this.

Shall they see means a direct, personal encounter, not a rumor.

Consider means thinking carefully about what they witness.

The chapter ends by pointing far beyond Israel's own borders.

📭 Had not been told means no message came
👁️ Shall they see means direct personal encounter
🤔 Consider means think carefully about what they see
📖 The chapter ends pointing far beyond Israel`.trim();

export const ISAIAH_FIFTY_TWO_PERSONAL_SECTIONS = parseIsaiahFiftyTwoRawNotes(ISAIAH_FIFTY_TWO_RAW_NOTES);
