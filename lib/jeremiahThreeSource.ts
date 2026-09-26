export type JeremiahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThreeRawNotes(rawText: string): JeremiahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 3:${startVerse}` : `Jeremiah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 3 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THREE_RAW_NOTES = `# Jeremiah 3:1-3
# 🙅 A Whore's Forehead
---
## 📜 If A Man Put Away His Wife, And She Go From Him, And Become Another Man's

This line quotes an actual marriage law, not a new question.

The law in Deuteronomy said once a divorced wife remarried, her first husband could never take her back.

That rule kept marriage from being treated as something people left and returned to freely.

Jeremiah opens the whole chapter with this law before saying anything else.

📜 The line quotes a real marriage law
🚫 A first husband could not remarry her
💍 The rule protected marriage from carelessness
📖 Jeremiah opens with the law on purpose

## 🧹 Shall Not That Land Be Greatly Polluted

"Polluted" means made unclean in a way that spreads beyond the two people involved.

The law said this kind of remarriage would bring guilt onto the whole land.

Idolatry gets described the same way later in this very chapter.

God is using a law everyone already knew to make His next line land harder.

🧹 Polluted means made unclean
🗺️ The guilt could spread to the land
🔁 Idolatry gets called pollution too
📖 A familiar law makes the next line land

## 🙌 Yet Return Again To Me, Saith The LORD

By the law just quoted, God had every right to refuse Israel.

Israel had done far worse than remarry, it had chased "many lovers," other gods and other nations.

God still invites Israel back despite the legal ground He just laid out.

This is not God overlooking sin, it is God choosing mercy the law did not require.

⚖️ The law gave God a right to refuse
💔 Many lovers means other gods and nations
🙌 God still invites Israel back
📖 Mercy goes beyond what the law required

## 🌧️ The Showers Have Been Withholden, And There Hath Been No Latter Rain

The "latter rain" fell in early spring and ripened crops right before harvest.

Losing that rain meant a failed harvest and real hunger for the whole country.

The law of Moses had already warned that persistent sin would shut up the sky like this.

The drought was not bad luck, it was the land answering back.

🌧️ Latter rain ripened crops before harvest
🌾 Losing it meant a failed harvest
📜 The law warned sin would stop the rain
📖 The drought was consequence, not luck

## 👁️ Thou Hadst A Whore's Forehead, Thou Refusedst To Be Ashamed

A forehead is the most visible part of a person, impossible to hide.

Calling it a whore's forehead means the sin was worn openly, not kept secret.

"Refusedst to be ashamed" adds that Israel felt no embarrassment about what showed.

Shame usually slows sin down, and this verse says shame never even started.

👁️ A forehead cannot be hidden
😳 The sin was open, not secret
🙅 Israel felt no shame at all
📖 No shame meant nothing held it back

# Jeremiah 3:4-6
# 👨‍👧 My Father, The Guide Of My Youth
---
## 🗣️ Wilt Thou Not From This Time Cry Unto Me, My Father

God is picturing words Israel has not actually said yet.

"My father" is intimate, childlike language, not a formal title.

"Guide of my youth" recalls the exodus years, when God led Israel like a father teaching a child to walk.

God is handing Israel the exact words that could begin real reconciliation.

🗣️ God pictures words Israel has not said
👨‍👧 My father is intimate, childlike language
🚶 Guide of my youth recalls the exodus
📖 God offers the words for reconciliation

## ❓ Will He Reserve His Anger For Ever

These are the very questions Israel should have been asking, hoping the answer was no.

Instead of asking, Israel kept sinning "as thou couldest," to the fullest extent possible.

No one paused to check whether God's patience had actually run out.

Israel never tried to find out because it never really stopped to ask.

❓ These are the questions Israel avoided
🚫 Israel sinned to the fullest extent
🙈 No one checked if patience ran out
📖 Israel never stopped long enough to ask

## 👑 In The Days Of Josiah The King

Josiah was one of Judah's most faithful kings, known for tearing down idols.

This message came while his reform was actively happening in Judah.

"Backsliding Israel" refers to the northern kingdom, already destroyed by Assyria about a century earlier.

God points to Israel's fall as a warning Judah could still learn from.

👑 Josiah was one of Judah's most faithful kings
🏛️ Reform was happening as this was spoken
🗺️ Backsliding Israel means the fallen northern kingdom
📖 Judah could still learn from Israel's fall

## ⛰️ Gone Up Upon Every High Mountain And Under Every Green Tree

High hills and shady trees were common outdoor sites for Canaanite worship.

The phrase became a stock description for idol worship spread across the land.

"Played the harlot" compares that worship to marital unfaithfulness again.

Israel did not sin quietly, it happened openly across the whole country.

⛰️ High hills hosted Canaanite worship
🌳 Green trees offered the same shade
💔 Harlot pictures unfaithfulness to God
📖 The sin spread across the whole land

# Jeremiah 3:7-10
# 📜 A Bill Of Divorce
---
## 🗣️ I Said, Turn Thou Unto Me. But She Returned Not

God had already made this exact appeal to Israel once before.

"Turn thou unto me" was a real offer, not a rhetorical question.

Israel's answer was silence, no change and no return.

Judah watched this whole exchange happen and saw Israel refuse.

🗣️ God had appealed to Israel before
🤲 Turn thou unto me was a real offer
🙉 Israel's answer was silence
📖 Judah watched the whole refusal happen

## 📜 I Had Put Her Away, And Given Her A Bill Of Divorce

A bill of divorce was a formal, legal document ending a marriage under Israelite law.

God treats Israel's exile by Assyria as that same legal divorce.

This was not a private disagreement, it was a completed, public separation.

Judah had just watched a real divorce happen, with real consequences.

📜 A bill of divorce was a formal document
⚖️ Exile functioned like a legal divorce
🔚 The separation was completed, not threatened
📖 Judah watched real consequences unfold

## 🗡️ Her Treacherous Sister Judah Feared Not, But Went And Played The Harlot Also

"Treacherous" means willing to betray trust, worse than simply unfaithful.

Judah saw exactly what happened to Israel and copied it anyway.

Fear here would have meant learning caution from a visible warning.

Watching a consequence and repeating it makes Judah's guilt heavier, not lighter.

🗡️ Treacherous means willing to betray trust
👀 Judah saw Israel's fate firsthand
😨 Fear would have meant learning caution
📖 Judah's guilt grew heavier, not lighter

## 🪨 Defiled The Land, And Committed Adultery With Stones And With Stocks

"Stones and stocks" means carved idols made of rock and wood.

Calling idol worship adultery with lifeless objects makes the insult sharper on purpose.

"The lightness of her whoredom" means Israel treated this unfaithfulness casually.

Worshiping something that cannot see or hear became an easy, careless choice.

🪨 Stones and stocks means carved idols
🪵 Wood and rock stood in for real gods
😐 Lightness means acting without hesitation
📖 A lifeless choice was made carelessly

## 🎭 Judah Hath Not Turned Unto Me With Her Whole Heart, But Feignedly

"Feignedly" means pretending, going through the motions without real sincerity.

Judah under Josiah was outwardly reforming, tearing down idols and restoring temple worship.

God says that outward change never actually reached the heart underneath.

Looking repentant differs from being repentant.

🎭 Feignedly means pretending, not sincere
🏛️ Judah's reform was mostly outward
❤️ The heart underneath had not changed
📖 Looking repentant differs from being repentant

# Jeremiah 3:11-13
# ⚖️ Only Acknowledge Thine Iniquity
---
## ⚖️ The Backsliding Israel Hath Justified Herself More Than Treacherous Judah

This is a hard, surprising ranking of two guilty nations, not a compliment.

Israel sinned without ever seeing Judah's example of guilt and punishment first.

Judah sinned after watching Israel's exile happen and still copied it.

A warned sin carries heavier guilt than one committed blind.

⚖️ This ranks two guilty nations, not one
🙈 Israel sinned without any warning example
👀 Judah sinned after watching Israel fall
📖 A warned sin carries heavier guilt

## 🧭 Go And Proclaim These Words Toward The North

"Toward the north" points to Assyria, where Israel's exiles had been scattered since 722 BC.

Jeremiah is told to send an actual message toward people gone for generations.

The invitation to return is offered even to a nation many assumed was finished.

God's mercy reaches people who had stopped expecting to be spoken to at all.

🧭 North points toward Assyria's exiles
📢 Jeremiah sends a real message there
🔙 Return is offered after generations
📖 Mercy reaches those who stopped expecting it

## 💗 I Am Merciful, Saith The LORD, And I Will Not Keep Anger For Ever

This answers the very question asked back in verse five.

"Merciful" is God naming His own character, not a hopeful guess from Jeremiah.

Anger in this passage is real and deserved, but it is never called permanent.

Judgment and mercy stand here as both true at once.

❓ This answers the question from verse five
💗 Merciful is God naming His own character
🔥 Anger is real but never permanent here
📖 Judgment and mercy are both true at once

## 🙋 Only Acknowledge Thine Iniquity, That Thou Hast Transgressed

"Iniquity" means real, serious guilt, not a small mistake.

The one condition for return is honest acknowledgment, not a list of rituals.

"Scattered thy ways to the strangers" pictures loyalty spread among many foreign gods.

Naming the sin out loud opens the door back into the relationship.

⚖️ Iniquity means real, serious guilt
🙋 The only condition is honest acknowledgment
🔀 Scattered ways means divided loyalty
📖 Naming the sin opens the door back

# Jeremiah 3:14-16
# 📦 I Am Married Unto You
---
## 💍 Turn, O Backsliding Children, For I Am Married Unto You

God restates the marriage image from the start of the chapter.

Legally, Israel's unfaithfulness could have ended this relationship completely.

God still calls Himself married instead of divorced and moved on.

The invitation to return rests on a bond God refuses to call broken.

💍 God restates the marriage image again
⚖️ The unfaithfulness could have ended it
🙌 God still calls Himself married to them
📖 The invitation rests on an unbroken bond

## 🏙️ I Will Take You One Of A City, And Two Of A Family

This describes a small, scattered remnant, not a whole nation returning at once.

Even one person from a city, or two from a family, would be gathered.

"Zion" refers to Jerusalem, the site of the temple mount.

A remnant this small still counted as real restoration in God's eyes.

🏙️ This pictures a small, scattered remnant
👤 One from a city, two from a family
⛰️ Zion refers to Jerusalem's temple mount
📖 A small remnant still counted as real restoration

## 👥 I Will Give You Pastors According To Mine Heart

"Pastors" here means leaders and shepherds over God's people.

This directly answers chapter two's complaint that Israel's leaders had all failed.

"According to mine heart" means these leaders would reflect what God wants.

Their job is named plainly, to feed the people real understanding.

👥 Pastors means leaders and shepherds
🔁 This answers the earlier failed leadership
❤️ These leaders reflect God's own heart
📖 Their job is feeding real understanding

## 📦 They Shall Say No More, The Ark Of The Covenant Of The LORD

The ark of the covenant was the sacred box holding the stone tablets from Moses.

It had been the central symbol of God's presence since the days of Moses.

This verse pictures a future where the ark will not even be missed.

A future without the ark is coming, because God's presence will replace the symbol.

📦 The ark held the tablets from Moses
⛪ It symbolized God's presence for centuries
🔮 A future without the ark is coming
📖 God's presence will replace the symbol

# Jeremiah 3:17-19
# 👑 The Throne Of The LORD
---
## 👑 They Shall Call Jerusalem The Throne Of The LORD

A throne is where a king rules from, the visible center of his authority.

Calling Jerusalem God's throne means the city becomes where His rule is recognized.

This future includes "all the nations," not only Israel and Judah returning home.

God's plan here reaches far beyond fixing one broken relationship.

👑 A throne marks a king's ruling place
🏙️ Jerusalem becomes that recognized center
🌍 All the nations are included here
📖 God's plan reaches beyond just Israel

## 💭 Neither Shall They Walk Any More After The Imagination Of Their Evil Heart

"Imagination of their evil heart" names the inner desires behind the idol worship.

This describes a real change of heart, not forced obedience.

The earlier promise of new pastors and God's own presence explains how this becomes possible.

Real change reaches the source of the sin, not just the behavior.

💭 This names the inner root of idolatry
🚫 It describes willing change, not force
🔗 New leaders and presence make it possible
📖 Real change reaches the source, not behavior

## 🤝 The House Of Judah Shall Walk With The House Of Israel

Judah and Israel had split into two separate kingdoms centuries earlier.

This verse pictures both nations reunited and walking together again.

"Out of the land of the north" points again to their shared exile.

An old division lasting for generations is described here as fully healed.

🗺️ Judah and Israel had split apart for centuries
🤝 Both nations are pictured walking together
🧭 North points to their shared exile
📖 The old division is fully healed here

## 👨‍👧 How Shall I Put Thee Among The Children

This verse pictures God speaking like a parent unsure how to include a child.

"Among the children" points back to sonship and family standing.

"A goodly heritage of the hosts of nations" describes the best portion of land of any nation.

God's hesitation here is not doubt about the gift, it is longing for real loyalty.

👨‍👧 God speaks like a parent including a child
👪 Among the children points to family standing
🌍 The heritage outranks other nations' portions
📖 God longs for real loyalty, not gratitude

# Jeremiah 3:20-22
# 🩹 I Will Heal Your Backslidings
---
## 💔 Surely As A Wife Treacherously Departeth From Her Husband

This restates the marriage picture one final time before the closing appeal.

"Treacherously" means the departure was a real betrayal of trust.

The comparison is stated as certain fact, "surely," not as an exaggeration.

Israel is accused here of walking away on purpose, not drifting slowly.

💔 This restates the marriage picture again
🗡️ Treacherously means a real betrayal
✅ Surely marks this as stated fact
📖 Israel walked away on purpose

## ⛰️ A Voice Was Heard Upon The High Places, Weeping

The high places were the very hilltops where Israel once worshiped false gods.

Now those same locations are filled with weeping instead of idol worship.

"Supplications" means urgent, pleading prayers, not casual requests.

The places built for rebellion become the places where repentance finally begins.

⛰️ High places once hosted idol worship
😭 Now those places are filled with weeping
🙏 Supplications means urgent, pleading prayers
📖 Rebellion's location becomes repentance's location

## 🔀 They Have Perverted Their Way, And They Have Forgotten The LORD

"Perverted" means twisted away from its intended, right direction.

This names two failures together, wrong action and a forgotten relationship.

Forgetting God was not one moment, it built up over years of small choices.

Recognizing both problems clearly is what led to the weeping described just before.

🔀 Perverted means twisted from the right path
💔 Wrong action and forgetting God stand together
⏳ Forgetting God built up gradually
📖 Clear recognition led to real weeping

## 🩹 Return, Ye Backsliding Children, And I Will Heal Your Backslidings

"Heal" pictures backsliding as a wound needing treatment, not just a mistake needing forgiveness.

This is the same word used throughout the chapter, now finally met with a cure.

The people's response comes right after, "we come unto thee," matching action to invitation.

Calling God "the LORD our God" completes the reconciliation this chapter has been building toward.

🩹 Heal pictures backsliding as a wound
🔁 The same word finally gets a cure
🏃 The people respond right away
📖 The chapter's reconciliation is now complete

# Jeremiah 3:23-25
# 😳 We Have Sinned Against The LORD
---
## 🗣️ Truly In Vain Is Salvation Hoped For From The Hills

This is the people's own confession, spoken in the voice God gave them.

The hills again point to the high places used for idol worship all through this chapter.

"In vain" means all that hoped for help never actually arrived.

The confession finally states plainly what the whole chapter has already proven.

🗣️ This is the people's own confession
⛰️ Hills point back to idol worship sites
🚫 In vain means the help never came
📖 Words finally match what already happened

## ✅ Truly In The LORD Our God Is The Salvation Of Israel

This sentence directly answers the failed hope named just before it.

Repeating "truly" twice in one verse marks both halves as equally certain.

Calling God "our God" uses the same restored, personal language promised earlier.

The confession moves from what does not work to who truly does.

✅ This answers the failed hope directly
🔁 Truly repeats twice for equal certainty
🙌 Our God uses restored, personal language
📖 The confession names who truly saves

## 🔥 Shame Hath Devoured The Labour Of Our Fathers From Our Youth

"Devoured" pictures shame consuming years of honest work completely.

Flocks and herds represent a family's wealth and food supply in this culture.

Naming "our fathers" admits this pattern of sin stretches back generations.

The people are finally owning a much longer history of failure.

🔥 Devoured pictures shame consuming years of work
🐑 Flocks and herds meant a family's wealth
👴 Our fathers admits generations of failure
📖 The people own a longer history

## 🙋 We Have Sinned Against The LORD Our God, We And Our Fathers

This is a direct, unqualified admission, not an excuse.

"From our youth even unto this day" claims the sin was constant.

"Have not obeyed the voice" names the specific failure plainly.

The chapter that opened with an accusation ends with the people agreeing it was true.

🙋 This is a direct, unqualified admission
⏳ From youth to now means constant sin
🙉 Not obeyed names the specific failure
📖 The chapter ends in honest agreement
`.trim();

export const JEREMIAH_THREE_PERSONAL_SECTIONS = parseJeremiahThreeRawNotes(JEREMIAH_THREE_RAW_NOTES);
