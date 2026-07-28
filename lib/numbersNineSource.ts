export type NumbersNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersNineRawNotes(rawText: string): NumbersNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 9:${startVerse}` : `Numbers 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Numbers 9 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_NINE_RAW_NOTES = `# Numbers 9:1-5
# 📅 Passover, One Year Later
---
## 🏕️ Spoken In The Wilderness Of Sinai
Israel has been camped at the base of Mount Sinai since Exodus 19, and they're still there right now. Every major event since then - the Ten Commandments, the tabernacle's construction, the priests' ordination, the Levites' assignment - all happened on this same stretch of ground, and this chapter still takes place before the nation marches anywhere.
🏕️ Israel has been camped at Sinai since Exodus 19
📖 Every major event since then happened on this same ground
🔑 They're still here, not yet moving, as this chapter opens
---
## ⏪ Earlier Than It Looks
This date - the first month of the second year - actually comes before the census that opened chapter 1, which happened in the second month of that same year (Numbers 1:1). The book of Numbers groups material by topic, not strict time order, so it puts the census and the Levite instructions first and only circles back afterward to tell this slightly earlier Passover story.
⏪ This event actually happened one month before Numbers 1's census
📚 Numbers groups material by topic, not always by strict order
🔑 A reminder that Bible books don't always tell events in sequence
---
## 🎉 Let The Children Of Israel Also Keep The Passover
"Also" signals a repeat command - Passover was already instituted once, back in Exodus 12, the night Israel left Egypt. Now, one year later, God tells them to do it again, turning a one-time rescue event into a yearly, repeating tradition.
🎉 "Also" marks this as a repeat, not a brand-new command
📖 First given in Exodus 12, the night of the escape from Egypt
🔑 A one-time rescue becomes a yearly repeating observance
---
## 🕰️ At His Appointed Season
"Appointed season" translates a Hebrew word (moed) meaning a fixed, scheduled time set by God himself, not a date the people could pick for convenience. The same word describes Israel's other yearly feasts later in the Law - these dates weren't suggestions.
🕰️ "Appointed season" means a fixed date set by God, not by the people
📅 The same word describes Israel's other yearly feasts
🔑 Sacred timing, not a convenient or flexible date
---
## 📆 The Fourteenth Day Of This Month, At Even
"Even" is old English for evening, right around sunset. In this culture, a new day was counted as starting at evening, not at midnight or sunrise, so "the fourteenth day...at even" points to the specific twilight hour when the Passover lamb was to be killed and eaten - the exact same timing given back in Exodus 12:6.
📆 "Even" means evening, around sunset
🌙 Days were counted as starting at evening, not midnight
🔑 The exact same timing first set in Exodus 12:6
---
## 📜 All The Rites...All The Ceremonies Thereof
"Rites" and "ceremonies" here are close in meaning, and the doubling is deliberate - it's the text's way of saying every single detail, not just the headline instruction to eat a lamb. Nothing about the original Passover - the blood, the herbs, the posture of eating it ready to travel - was allowed to be quietly dropped or simplified a year later.
📜 Two similar words used together for full emphasis
🚫 Nothing from the original instructions could be dropped
🔑 "According to all" means every detail, not just the main idea
---
## 🗣️ Moses Spake Unto The Children Of Israel
The command travels in a clear chain: God speaks to Moses, and only then does Moses pass it on to the people. This same relay pattern - never the people hearing directly, always through Moses - shows up constantly through Exodus, Leviticus, and Numbers, and it's part of why Moses is described elsewhere as uniquely close to God.
🗣️ The command passes from God to Moses, then to the people
🔁 The same relay pattern repeats constantly in these books
🔑 Moses functions as the one authorized go-between
---
## ✅ According To All That The LORD Commanded...So Did The Children Of Israel
This exact obedience formula - command given, then confirmation it was carried out precisely - is the same language used again and again to close out the tabernacle's construction in Exodus 39-40 and the Levites' ordination in chapter 8. It's Scripture's way of certifying that nothing was skipped or altered.
✅ The same formula used to close the tabernacle-building account
📖 Matches the ordination language from Numbers 8
🔑 A certification that nothing was skipped or changed
---
## 🔄 A Full Circle Moment
This is the first anniversary of the night Israel left Egypt. Keeping Passover again, in the wilderness, before they've even reached the promised land, ties their present situation - still travelers, still dependent on God - back to the night everything began, reminding them why they're out here at all.
🔄 The first anniversary of the night Israel left Egypt
🚶 Kept even mid-journey, before reaching the promised land
🔑 A yearly reminder of why the journey started in the first place

# Numbers 9:6-8
# ❓ A Problem Nobody Expected
---
## 💀 Defiled By The Dead Body Of A Man
Touching a human corpse made a person ceremonially unclean under the Law - a separate category from moral sin, more like a temporary status that barred someone from sacred activity until it passed (the full cleansing ritual for this specific kind of defilement gets spelled out later, in Numbers 19). It's specifically a human body in view here, not an animal carcass, which followed different rules (Leviticus 11).
💀 Touching a human corpse made someone ceremonially unclean
⏳ A temporary status, not a moral judgment on the person
🔑 Different rules applied to animal carcasses (Leviticus 11)
---
## 🚫 They Could Not Keep The Passover On That Day
Ceremonial uncleanness barred a person from Passover entirely for as long as it lasted - not a minor inconvenience, but a real exclusion from one of Israel's most important yearly observances. These particular men had no idea this situation was even possible until it happened to them.
🚫 Uncleanness meant total exclusion from Passover, not a minor delay
😟 A real, unexpected problem for these specific men
🔑 No existing law yet told them what to do about it
---
## 🙋 They Came Before Moses And Before Aaron
The men bring their problem to both of Israel's top leaders together - Moses, the nation's leader, and Aaron, the high priest overseeing all things sacred. Bringing a ceremonial question to Aaron specifically, not just Moses, makes sense given that this is exactly the kind of purity question that fell under priestly authority.
🙋 Brought to both Moses and Aaron together
👑 Aaron's presence fits since this is a priestly, ceremonial question
🔑 They went to the proper authorities rather than deciding on their own
---
## 🗣️ Wherefore Are We Kept Back?
Notice what these men are NOT saying - they're not looking for a loophole to skip a duty they didn't want. They genuinely want to participate and are upset that circumstances outside their control are stopping them. Their complaint is really a request for a way to obey, not an excuse to disobey.
🗣️ Not an excuse to skip Passover, but a request to still keep it
❤️ Genuine desire to worship despite being blocked
🔑 A complaint that's really a request to obey, not avoid obeying
---
## 🤲 Stand Still, And I Will Hear What The LORD Will Command
Rather than guessing or making up an answer on the spot, Moses pauses the whole situation and goes to ask God directly. This same pattern - a genuinely new legal question with no existing rule, resolved by Moses inquiring of God rather than deciding himself - happens again later with Zelophehad's daughters in Numbers 27.
🤲 Moses doesn't guess - he goes to ask God directly
⏸️ "Stand still" means wait, not "the answer is no"
🔑 The same pattern repeats later in Numbers 27

# Numbers 9:9-14
# 🗓️ The Second Passover
---
## 👨‍👩‍👧‍👦 Of You Or Of Your Posterity
"Posterity" means descendants - children, grandchildren, and everyone born after. By phrasing the answer this way, God makes clear this new provision isn't a one-time exception for these particular defiled men; it becomes a permanent part of the Law for every future generation facing the same problem.
👨‍👩‍👧‍👦 "Posterity" means future descendants, not just this generation
📜 A permanent addition to the Law, not a one-time exception
🔑 Future Israelites facing this exact problem are already covered
---
## 💀 Unclean By Reason Of A Dead Body
This restates the exact problem just raised in verses 6-7 - corpse defilement - confirming that the case brought to Moses is now officially covered by law, not just answered informally for one group of men.
💀 Restates the same corpse-defilement problem from verses 6-7
✅ Confirms their specific case is now covered by real law
🔑 An informal question just became an official, lasting rule
---
## 🚶 Or Be In A Journey Afar Off
A second, separate excuse gets added here that nobody had even asked about - being away on a long trip when Passover falls. God expands the provision beyond the exact question raised, covering a related problem before anyone has to ask about it separately.
🚶 A second valid excuse, added even though nobody asked about it
➕ God expands the provision beyond the original question
🔑 Two distinct, separate reasons someone might miss the date
---
## ✅ Yet He Shall Keep The Passover Unto The LORD
The core provision: someone who missed the regular date for a valid reason doesn't simply lose the chance for the whole year. There's a real, legitimate makeup opportunity built into the Law itself.
✅ Missing the date for a valid reason doesn't mean losing it entirely
🔁 A real makeup opportunity, built directly into the Law
🔑 God provides for the honest, unavoidable gap, not just the ideal case
---
## 📆 The Fourteenth Day Of The Second Month
The makeup date is exactly one month after the regular date, same day of the month, same evening timing. Jewish tradition later calls this exact provision "Pesach Sheni," the Second Passover, and it's still observed by some Jewish communities today.
📆 Exactly one month after the regular Passover date
🕯️ Later Jewish tradition calls this "Pesach Sheni," the Second Passover
🔑 A tradition still recognized in some Jewish communities today
---
## 🌿 Eat It With Unleavened Bread And Bitter Herbs
Both elements callback directly to the original Passover meal in Exodus 12. The unleavened (flat, without yeast) bread recalled how fast Israel had to leave Egypt - no time to let dough rise. The bitter herbs recalled the bitterness of their years of slavery there.
🌿 Both elements repeat the original meal from Exodus 12
🍞 Unleavened bread recalled the rushed, no-time-to-rise departure
🔑 Bitter herbs recalled the bitterness of slavery in Egypt
---
## 🦴 Leave None Of It Unto The Morning, Nor Break Any Bone Of It
This exact detail repeats Exodus 12:46 word for word - nothing about the makeup Passover was allowed to be a shortened or simplified version. Centuries later, John 19:36 points back to this very rule, connecting the unbroken Passover lamb to Jesus, whose bones also weren't broken at the crucifixion.
🦴 Repeats Exodus 12:46's rule exactly, no shortcuts allowed
✝️ John 19:36 later connects this rule to Jesus at the cross
🔑 A small ritual detail carrying a much bigger meaning forward
---
## 📋 According To All The Ordinances Of The Passover
"Ordinances" simply means laws or rules. This closing line makes sure nobody assumes the makeup date is a lighter, easier version - every single requirement of the regular Passover still applies in full, one month late.
📋 "Ordinances" means laws or established rules
🚫 Not a lighter or easier version of the observance
🔑 Every requirement still applies in full, just one month later
---
## ⚠️ The Man That Is Clean...And Forbeareth To Keep The Passover
"Forbeareth" is old English for refuses or holds back. This describes a completely different person than the ones in verses 6-8 - someone with no valid excuse at all who simply chooses not to bother.
⚠️ "Forbeareth" means refuses or deliberately holds back
🚷 A totally different case than the honestly-defiled men earlier
🔑 No valid excuse - just a choice not to participate
---
## ✂️ That Soul Shall Be Cut Off From Among His People
"Cut off" is a severe covenant idiom - being removed from the community and its promises, whether through death, exile, or God's own direct judgment; scholars debate the exact mechanism, but everyone agrees it marks total severance from Israel's covenant life. This penalty applies only to willful refusal, never to the innocent cases just described.
✂️ "Cut off" means total severance from Israel's covenant community
⚖️ The exact mechanism is debated, but the severity isn't
🔑 This only applies to willful refusal, never an honest excuse
---
## 🎒 That Man Shall Bear His Sin
"Bear his sin" is another set idiom, meaning the person is held personally responsible for the consequences, with no one else to blame. The contrast with verses 6-8 is deliberate: those men brought their problem to God through Moses instead of just skipping quietly, and got a provision; this man simply refuses, and gets the opposite outcome.
🎒 "Bear his sin" means personal responsibility, no one else to blame
🔀 The exact opposite outcome of the men in verses 6-8
🔑 The difference is bringing the problem to God versus ignoring it
---
## 🌍 If A Stranger Shall Sojourn Among You
"Sojourn" means to live temporarily as a foreigner in someone else's land - not a citizen, but a long-term resident. "Stranger" here refers to a non-Israelite living within the camp or, later, within the land.
🌍 "Sojourn" means living temporarily as a resident foreigner
🧭 "Stranger" means a non-Israelite living among the people
🔑 Not a citizen by birth, but present and living among Israel
---
## 🤝 One Ordinance, Both For The Stranger, And For Him That Was Born In The Land
This is a genuinely striking piece of ancient law: the exact same rule applies regardless of ethnic background. A foreign resident who wanted to keep the Passover was held to, and given, the identical standard as a native-born Israelite - no separate, lesser track.
🤝 The same law applied to foreigners and native-born Israelites alike
⚖️ No separate or lesser track based on ethnic background
🔑 Striking equal treatment for its time, written directly into the Law

# Numbers 9:15-19
# ☁️ The Cloud Covers The Tabernacle
---
## 🏗️ On The Day That The Tabernacle Was Reared Up
"Reared up" means erected or set up for the first time - this points back to Exodus 40, the day Moses finished assembling the tabernacle exactly one month before this chapter's Passover (Exodus 40:17 dates it to the first day of that same first month).
🏗️ "Reared up" means erected, set up for the first time
📖 Points back to the tabernacle's assembly in Exodus 40
🔑 That event happened just two weeks before this chapter's Passover
---
## 📜 The Tent Of The Testimony
This is another name for the tabernacle, emphasizing what it held at its center - the stone tablets of the Ten Commandments, kept inside the ark. Calling it "the testimony" ties the whole structure back to the covenant law given at Sinai, not just a generic worship tent.
📜 An alternate name for the tabernacle
🪨 Named for the stone tablets of the Law kept inside it
🔑 Ties the whole structure back to the covenant given at Sinai
---
## 🌥️ The Cloud Covered The Tabernacle
This same cloud already appeared back in Exodus 40:34-35, so thick with God's own presence that even Moses couldn't enter. Here in Numbers, the focus shifts from that one dramatic moment to how the cloud functioned every single day going forward, guiding the camp's daily life.
🌥️ The same cloud first described in Exodus 40:34-35
🚪 So thick with God's presence that even Moses couldn't enter then
🔑 Numbers now shows how it functioned day by day, ongoing
---
## 🔥 As It Were The Appearance Of Fire, Until The Morning
At night, the same visible sign that looked like a cloud by day took on the appearance of fire, providing both a marker of God's presence and, practically, light for the camp in the darkness. Two forms, one continuous presence.
🔥 The same sign appeared as fire at night instead of cloud
💡 Practically useful too - light for the whole camp after dark
🔑 Two visible forms, but one single, continuous presence
---
## 🔁 So It Was Alway
This wasn't a one-time spectacle that happened only on the tabernacle's opening day - it became the constant, ongoing pattern for the entire wilderness journey, which would eventually stretch on for forty years.
🔁 Not a one-time event - this became the constant daily pattern
⏳ Continued for the entire wilderness journey, all forty years
🔑 Reliability, not a rare miracle Israel could no longer count on
---
## 🚩 When The Cloud Was Taken Up...They Journeyed
The cloud lifting off the tabernacle functioned as literal marching orders - there was no separate announcement, no council meeting to decide it was time to move. The visible sign itself was the command.
🚩 The cloud lifting was the actual signal to start moving
📢 No separate announcement needed - the sign itself was the order
🔑 God's presence directly controlled the camp's schedule
---
## ⛺ Where The Cloud Abode, There They Pitched Their Tents
"Abode" means stayed or rested - the exact same root word used for God "dwelling" among his people elsewhere in the Law. Israel's campsite for the night wasn't chosen by scouting good ground or water - it was wherever the cloud itself came to rest.
⛺ "Abode" means stayed or rested in one place
💧 Campsites weren't chosen by scouting - only by where the cloud stopped
🔑 The same root word used elsewhere for God "dwelling" with his people
---
## 📢 At The Commandment Of The LORD They Journeyed, And...Pitched
This phrase - "at the commandment of the LORD" - repeats constantly through the rest of this passage. The point is deliberate repetition: the cloud's movement wasn't weather or coincidence, it was God speaking through a visible sign instead of words.
📢 A phrase repeated deliberately, several times, through this passage
🌤️ The cloud's movement was God's speech, not random weather
🔑 Repetition here is the text's way of underlining the point
---
## ⏳ When The Cloud Tarried Long...They Kept The Charge Of The LORD, And Journeyed Not
"Tarried" means lingered or stayed put. "Kept the charge" means they held their assigned post faithfully. The harder discipline here isn't obeying a command to move - it's staying obediently still, sometimes for a long stretch, with no idea how long the wait will last.
⏳ "Tarried" means lingered, stayed in one place
🛑 "Kept the charge" means faithfully holding their assigned post
🔑 Waiting still, with no timeline given, is its own kind of obedience

# Numbers 9:20-23
# ⏱️ Two Days, Or A Month, Or A Year
---
## 🔢 Whether It Were Two Days, Or A Month, Or A Year
The range given here is deliberately wide - from a couple of days to twelve full months - to make one point unmistakable: Israel had zero ability to predict or plan how long they'd stay anywhere. Every bit of scheduling power belonged to God alone.
🔢 A deliberately wide range, from days to a full year
📅 Israel had no way to predict or plan their own schedule
🔑 All scheduling power belonged to God, not the people
---
## 🏕️ The Children Of Israel Abode In Their Tents, And Journeyed Not
Restating the waiting scenario from verse 19, now stretched to its most extreme case - a cloud that might not move for an entire year. Living for that long without knowing when to expect movement tested patience far beyond a single long wait.
🏕️ Restates the waiting scenario, now at its most extreme
📆 A cloud that might stay put for an entire year
🔑 Sustained patience, tested far beyond a single long wait
---
## ⚡ When It Was Taken Up, They Journeyed
The moment the cloud lifted - after two days or after a year, it made no difference - the response had to be immediate. No lingering to finish other business first, no delay for convenience.
⚡ The response to the cloud lifting had to be immediate
🚫 No lingering to finish other business, no delay for convenience
🔑 The same instant obedience applied no matter how long the wait was
---
## 🌙 Whether It Was By Day Or By Night That The Cloud Was Taken Up, They Journeyed
Even a night departure - packing an entire camp of families, animals, and the tabernacle itself in the dark - didn't earn a delay until morning. Full readiness was expected at any hour, not just convenient daylight ones.
🌙 Even a night departure required moving immediately, no waiting for daylight
🌃 Packing an entire camp in darkness was still expected without delay
🔑 Total readiness at any hour, not just the convenient ones
---
## 📢 At The Commandment Of The LORD They Rested...And...Journeyed
The chapter restates this phrase one final time, closing the passage the same way it built it - through repetition, not new information. By this point the reader has heard it enough times that the point can't be missed: nothing here was random.
📢 The closing repetition of the same phrase used throughout
🔁 Builds and closes the passage through repetition, not new content
🔑 By now the reader can't miss the point: nothing was random
---
## ✋ By The Hand Of Moses
Even though the cloud communicated visibly and directly, without spoken words, Moses still functioned as the leader who translated that sign into actual, practical camp orders. The sign came from God; the logistics of moving hundreds of thousands of people still ran through Moses.
✋ Moses still translated the visible sign into practical orders
🗣️ The sign came from God; the logistics still ran through Moses
🔑 Direct divine guidance didn't remove the need for human leadership
---
## 🌱 A Whole Generation Living This Way
Stack this chapter's timing details together and a bigger picture appears: for forty years, an entire nation lived without a calendar of their own making, waiting on a cloud to tell them when to stay and when to go. It's one of the clearest wilderness pictures in the whole Bible of daily, practical trust replacing the ordinary human need to plan ahead.
🌱 Forty years lived without a self-made calendar or schedule
☁️ Daily life ran entirely on watching the cloud, not planning ahead
🔑 One of the Bible's clearest pictures of practical, moment-by-moment trust
`;

export const NUMBERS_NINE_PERSONAL_SECTIONS = parseNumbersNineRawNotes(NUMBERS_NINE_RAW_NOTES);
