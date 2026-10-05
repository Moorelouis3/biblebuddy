export type JoelThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoelThreeRawNotes(rawText: string): JoelThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoelThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joel\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joel 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joel\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Joel\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joel 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joel 3:${startVerse}` : `Joel 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Joel 3 sections, received " + sections.length);
  }

  return sections;
}

const JOEL_THREE_RAW_NOTES = `# Joel 3:1-3
# ⚖️ Nations Judged For Scattering Israel
---
## 📅 In Those Days, And In That Time

This phrase points forward to a specific future moment, not right now.

Joel already described a day when God would pour out His Spirit in chapter two.

That same future moment now gets its own fuller explanation here.

The timing is tied to Judah's actual return from exile.

📅 This points to a future moment
🔮 It follows Joel's earlier promise in chapter two
🔗 Both passages share the same timing
➡️ Restoration and judgment arrive together

## 🏠 When I Shall Bring Again The Captivity Of Judah And Jerusalem

"Bring again the captivity" means reversing the exile and restoring the people to their land.

This is not a vague hope, it names Judah and Jerusalem specifically.

The judgment on the nations that follows is tied directly to this restoration.

One cannot happen without the other in this chapter's logic.

🏠 Bring again the captivity means reversing exile
🎯 Judah and Jerusalem are named specifically
🔗 Restoration and judgment are tied together
📖 One does not happen without the other

## ⚖️ I Will Also Gather All Nations, And Will Bring Them Down Into The Valley Of Jehoshaphat

"Jehoshaphat" means the LORD judges.

Many scholars believe the name is symbolic here, not a literal map location.

This valley becomes a courtroom where every nation stands trial.

The name itself announces the outcome before the trial even begins.

⚖️ Jehoshaphat means the LORD judges
🗺️ Many scholars read this as a symbolic place
🏛️ A courtroom for every nation
📖 The name announces the verdict already

## 📜 Whom They Have Scattered Among The Nations, And Parted My Land

This verse states the actual crime being judged in this chapter.

Israel was not just defeated, its people were scattered and its land divided up.

God calls the land His own, not simply Israel's possession.

Judging the nations here directly answers this specific wrong.

📜 This verse names the actual crime
🌍 Israel was scattered and the land divided
🏡 God calls the land His own
📖 The judgment directly answers this wrong

## 🎲 They Have Cast Lots For My People

Casting lots here means randomly dividing captives like property to be split up.

People were treated as objects to win in a game of chance.

This detail shows how far losing a war had stripped away their dignity.

God names this specific cruelty before judging it.

🎲 Casting lots means dividing captives randomly
👤 People were treated like property
💔 This stripped away their dignity
📖 God names this cruelty specifically

## 👦 Given A Boy For An Harlot, And Sold A Girl For Wine

This names an even more specific and painful detail of that cruelty.

Children were traded away for small, careless payments.

A boy's life or a girl's future was priced the same as a drink.

This is the exact wrong the rest of the chapter answers.

👦 Children were traded for tiny payments
🍷 A girl's future was priced like wine
😢 Human lives were treated carelessly
📖 This is the wrong being judged here

# Joel 3:4-8
# 💰 Tyre, Sidon, And Philistia's Crimes
---
## ❓ What Have Ye To Do With Me, O Tyre, And Zidon, And All The Coasts Of Palestine

This question challenges three specific regions by name.

Tyre and Zidon were wealthy trading cities on the coast north of Israel.

"Palestine" here refers to Philistia, Israel's coastal neighbor to the southwest.

God is not speaking in vague generalities, He names exact accusers.

❓ A direct challenge to three regions
🏙️ Tyre and Zidon were wealthy trading cities
🗺️ Palestine here means Philistia
📖 God names exact accusers, not vague ones

## ⚖️ Swiftly And Speedily Will I Return Your Recompence Upon Your Own Head

"Recompence" means payback, whatever was done is repaid in kind.

These nations expected to profit from Judah's weakness without any cost.

God promises that cost will land specifically on their own heads.

The timing is emphasized twice, swiftly and speedily, with no long delay.

⚖️ Recompence means payback in kind
💸 They expected to profit at no cost
🎯 The cost lands on their own heads
📖 The timing is urgent, not delayed

## 💰 Ye Have Taken My Silver And My Gold, And Have Carried Into Your Temples My Goodly Pleasant Things

This names the actual theft behind the general charge.

Temple treasures, likely plundered during an earlier raid, ended up in pagan temples.

Calling them "my silver and my gold" makes this personal, not just national loss.

Putting God's treasures in a false god's temple added insult to injury.

💰 Silver and gold were taken
🏛️ They ended up in pagan temples
😠 God calls the loss personal
📖 This added insult to the theft

## 🇬🇷 The Children Also Of Judah And The Children Of Jerusalem Have Ye Sold Unto The Grecians

This is one of the earliest direct Bible references to the Greeks by name.

Judah's own children were sold into slavery across a very long distance.

Selling people that far away was meant to make any rescue impossible.

This is the specific slave trade God now promises to reverse.

🇬🇷 Grecians is an early Bible reference to Greeks
⛓️ Judah's children were sold into slavery
🌊 The distance was meant to prevent rescue
📖 God promises to reverse this trade

## 🙌 I Will Raise Them Out Of The Place Whither Ye Have Sold Them

God promises to personally recover the very people who were sold away.

No distance was far enough to place them outside His reach.

This directly undoes the plan to make rescue impossible.

The same word used to sell them now describes God's rescue instead.

🙌 God promises to recover the sold captives
🌍 No distance placed them outside His reach
🔄 This undoes the earlier plan
📖 God's rescue reverses their sale

## 🏜️ They Shall Sell Them To The Sabeans, To A People Far Off

"Sabeans" were traders from a distant kingdom, likely in the Arabian peninsula.

The roles are now completely reversed, Judah becomes the seller instead of the sold.

This is the exact same cruelty measured back onto the ones who committed it.

What was done to Judah's children is now done to theirs.

🏜️ Sabeans were distant Arabian traders
🔄 Judah now sells instead of being sold
⚖️ This is the same cruelty measured back
📖 Their own children face what Judah's faced

# Joel 3:9-13
# ⚔️ The Call To War And The Harvest Of Judgment
---
## 📢 Proclaim Ye This Among The Gentiles

God now summons the very nations He just judged into one final gathering.

This is not a private sentence, it is announced publicly among them all.

The summons itself is part of the judgment, not separate from it.

No nation gets judged quietly in a corner.

📢 A public summons, not a quiet sentence
🌍 Sent out among all the nations
⚖️ The summons is part of the judgment
➡️ No nation is judged quietly

## ⚔️ Prepare War, Wake Up The Mighty Men

God ironically calls the nations to arm themselves for battle.

This is not a real battle plan, it is a summons to their own trial.

Their warriors are being gathered for judgment, not for victory.

The call to war is really a call to appear in court.

⚔️ Nations are called to arm themselves
🎭 This is irony, not a real battle plan
🏛️ Warriors are gathered for judgment
➡️ A call to war is really a summons

## 🔄 Beat Your Plowshares Into Swords, And Your Pruninghooks Into Spears

This line flips a far more famous one found in Isaiah and Micah.

Isaiah and Micah picture swords beaten into plowshares, a future of peace.

Here the direction is deliberately reversed, tools of peace become tools of war.

The reversal fits this scene exactly.

God is calling nations to judgment here, not peace.

🔄 This reverses a familiar peace prophecy
🕊️ Isaiah and Micah picture the opposite
⚔️ Peace tools become war tools here
📖 The reversal fits a judgment scene

## 🎭 Let The Weak Say, I Am Strong

This sounds like encouragement, but it is actually a trap.

False confidence is marching these nations straight toward their own defeat.

Real strength was never on their side in this chapter.

Believing a lie about your own strength does not make it true.

🎭 This sounds like encouragement but is not
💪 False confidence leads to defeat here
🚫 Real strength was never on their side
➡️ Believing a lie does not make it true

## 🗣️ Thither Cause Thy Mighty Ones To Come Down, O LORD

The voice suddenly shifts here from God speaking to someone praying to God.

Many scholars believe this is Joel himself interrupting with a short prayer.

He asks God's own mighty ones to come down and finish the task.

Prophecy and prayer sit side by side in this single verse.

🗣️ The speaker suddenly shifts here
🙏 Joel likely interrupts with his own prayer
💪 He asks for God's mighty ones
📖 Prophecy and prayer share this verse

## 👑 For There Will I Sit To Judge All The Heathen Round About

God names Himself directly as the one who will judge, not a proxy or an angel.

"Sit to judge" pictures a king or magistrate presiding over a courtroom.

This explains exactly why all these nations were gathered in the first place.

The whole scene has been building toward this one verdict.

👑 God Himself is the judge, not a proxy
🪑 Sitting to judge pictures a courtroom
🎯 This explains why the nations were gathered
📖 The whole scene builds to this verdict

## 🌾 Put Ye In The Sickle, For The Harvest Is Ripe

A sickle is a curved blade used to cut down ripe grain.

Harvest imagery pictures judgment as something fully ready, not rushed or early.

The nations have had time to repent, and that time is now finished.

This same harvest picture returns later in the book of Revelation.

🌾 A sickle cuts down ripe grain
⏳ Ripe harvest means judgment fully ready
⌛ Their time to repent has ended
📖 Revelation later reuses this same picture

## 🍇 The Press Is Full, The Fats Overflow

A winepress crushed grapes inside a pit dug into the ground.

The juice collected below was called the fat.

A full, overflowing press pictures wickedness piled up past its limit.

Harvest and judgment share one single image here.

🍇 A winepress crushed grapes in a pit
📈 Overflow pictures wickedness past its limit
🌾 Harvest and judgment share one image
📖 Both pictures describe the same reckoning

# Joel 3:14-17
# 🌑 The Valley Of Decision And The LORD's Refuge
---
## 👥 Multitudes, Multitudes In The Valley Of Decision

Repeating the word multitudes pictures an enormous, overwhelming crowd.

"Valley of decision" renames the same valley of Jehoshaphat from verse two.

The name now highlights what happens there, a final decision and verdict.

One place carries two names, each pointing to the same coming judgment.

👥 Repetition pictures an overwhelming crowd
🏞️ Valley of decision renames the valley of Jehoshaphat
⚖️ The name highlights the coming verdict
📖 One place, two names, one judgment

## 📅 The Day Of The LORD Is Near In The Valley Of Decision

"The day of the LORD" is a phrase Joel has used throughout this whole book.

It names a specific future moment of God's direct judgment on earth.

Here that same day finally arrives at the place named for decision.

A theme building since chapter one reaches its climax in this verse.

📅 Day of the LORD appears throughout Joel
⚖️ It means God's direct judgment on earth
🏞️ It arrives at the valley of decision
📖 A theme from chapter one reaches its climax

## 🌑 The Sun And The Moon Shall Be Darkened, And The Stars Shall Withdraw Their Shining

This same picture of darkened skies already appeared back in chapter two.

Joel repeats it here on purpose, tying both chapters to the same event.

Cosmic darkness pictures the sheer scale of this coming judgment.

Nothing in creation stays calm when the day of the LORD arrives.

🌑 This picture already appeared in chapter two
🔁 Joel repeats it to link both chapters
🌌 Darkness pictures the judgment's massive scale
📖 Even creation reacts to this coming day

## 🦁 The LORD Also Shall Roar Out Of Zion, And Utter His Voice From Jerusalem

A roar pictures a lion, the sound an approaching predator makes before it attacks.

This same roaring image also opens the book of Amos.

God's own voice here carries the weight and danger of that roar.

The sound itself announces that judgment has already begun.

🦁 A roar pictures an approaching lion
📜 Amos opens with this same image
📢 God's voice carries that same danger
➡️ The sound announces judgment has begun

## 🌍 The Heavens And The Earth Shall Shake

This describes judgment on a scale beyond any human war or disaster.

Even the sky and the ground themselves respond to God's voice.

This same shaking language appears in other prophets describing the day of the LORD.

Nothing stays fixed when God Himself steps directly into history.

🌍 Judgment here exceeds any human disaster
🌌 Sky and ground both respond to God
📜 Other prophets use this same shaking language
📖 Nothing stays fixed when God steps in

## 😨 The LORD Will Be The Hope Of His People, And The Strength Of The Children Of Israel

The same roar that terrifies the nations becomes shelter for God's own people.

"Hope" here means a safe refuge, not just a wish for something good.

This sudden turn protects Israel from the very judgment just described.

One voice brings two completely different outcomes, terror for enemies, safety for His people.

😨 The same roar terrifies the nations
🛡️ Hope here means a safe refuge
🔄 Israel is protected from this judgment
📖 One voice brings two different outcomes

## 🎯 So Shall Ye Know That I Am The LORD Your God Dwelling In Zion, My Holy Mountain

This whole ordeal has a clear purpose beyond simply punishing wrongdoing.

God wants to be known, not merely feared from a distance.

"Dwelling in Zion" means God's presence is centered there permanently.

Judgment and God's nearness are connected throughout this entire chapter.

🎯 Judgment serves a clear purpose
👁️ God wants to be known, not just feared
🏔️ Dwelling in Zion means permanent presence
📖 Judgment and nearness are connected here

## ✨ Then Shall Jerusalem Be Holy, And There Shall No Strangers Pass Through Her Any More

"Holy" here means fully set apart for God alone, nothing common mixed in.

"Strangers" means foreign invaders and oppressors, not simply visitors.

This promises lasting safety after generations of invasion and exile.

The chapter's violence finally gives way to permanent peace.

✨ Holy means fully set apart for God
🚫 Strangers means foreign invaders, not visitors
🛡️ This promises lasting safety
📖 Violence gives way to permanent peace

# Joel 3:18-21
# 🍇 Final Blessing And Judah's Eternal Dwelling
---
## 🍇 The Mountains Shall Drop Down New Wine, And The Hills Shall Flow With Milk

This pictures overwhelming abundance, more than the land could ever naturally produce.

"New wine" and "milk" were everyday signs of a rich, well fed land.

This same phrase describes the promised land itself back in the book of Exodus.

Desolation in earlier verses now gives way to overflowing blessing.

🍇 This pictures overwhelming abundance
🥛 New wine and milk signal a rich land
📜 Exodus uses this same promised land phrase
📖 Desolation gives way to blessing here

## 🏕️ A Fountain Shall Come Forth Of The House Of The LORD, And Shall Water The Valley Of Shittim

"Shittim" was Israel's last camp before crossing into the promised land.

That same camp was also the site of Israel's worst idolatry, recorded in Numbers.

Watering that valley pictures healing reaching Israel's worst failure.

This same river from God's house later reappears in Ezekiel and Revelation.

🏕️ Shittim was Israel's last camp before Canaan
💔 The same camp saw Israel's worst sin
💧 Watering it pictures total healing
📖 Ezekiel and Revelation reuse this river image

## 🏜️ Egypt Shall Be A Desolation, And Edom Shall Be A Desolate Wilderness

Egypt and Edom were two of Israel's oldest, most persistent enemies.

Egypt enslaved Israel for generations.

Edom descended from Jacob's own brother Esau.

Both nations now face the exact opposite of the abundance just promised to Judah.

Old, long running hostility finally receives a final answer.

🏜️ Egypt and Edom were old enemies
⛓️ Egypt enslaved Israel for generations
👨‍👦 Edom descended from Esau, Jacob's brother
📖 Their desolation contrasts Judah's abundance

## ⚖️ For The Violence Against The Children Of Judah, Because They Have Shed Innocent Blood In Their Land

This names the specific charge behind Egypt and Edom's coming judgment.

"Innocent blood" is a serious legal term for unjustified killing.

This is not vague hostility, it is a concrete crime being punished.

God's judgments in this chapter always name a real, specific wrong.

⚖️ This names the specific charge
🩸 Innocent blood means unjustified killing
🎯 A concrete crime, not vague hostility
📖 God always names a specific wrong

## ♾️ Judah Shall Dwell For Ever, And Jerusalem From Generation To Generation

This permanence is set directly against Egypt and Edom's coming desolation.

Nations that abused Judah will disappear completely.

Judah's own dwelling never ends.

This promise answers the whole chapter's opening complaint about scattered, exiled people.

What was broken at the beginning is made permanent by the end.

♾️ Judah's dwelling is permanent
📉 Their abusers will disappear instead
🔄 This answers the chapter's opening complaint
📖 What was broken becomes permanent

## 🩸 I Will Cleanse Their Blood That I Have Not Cleansed

This line answers the innocent blood named back in verse nineteen.

"Cleanse" here means avenge or deal fully with that unpunished bloodshed.

Many scholars read this verse slightly differently here.

The original Hebrew behind it is unusually difficult.

Either reading agrees the wrong named earlier does not stay unresolved.

🩸 This answers verse nineteen's innocent blood
⚖️ Cleanse here means avenge or deal with fully
📜 The Hebrew here is unusually difficult
📖 The unresolved wrong does not stay unresolved

## 🔚 For The LORD Dwelleth In Zion

These are the final words of the entire book of Joel.

The same claim appeared back in verse seventeen, and now it closes the book.

Judgment, restoration, and blessing all rest on this one unshaken fact.

God's presence in Zion is the final word, not the chapter's violence.

🔚 These are Joel's final written words
🔁 The same claim appeared in verse seventeen
🏔️ Everything in the chapter rests on this
➡️ God's presence is the final word
`.trim();

export const JOEL_THREE_PERSONAL_SECTIONS = parseJoelThreeRawNotes(JOEL_THREE_RAW_NOTES);
