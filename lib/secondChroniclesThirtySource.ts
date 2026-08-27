export type SecondChroniclesThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyRawNotes(rawText: string): SecondChroniclesThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 30:${startVerse}` : `2 Chronicles 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 2 Chronicles 30 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_RAW_NOTES = `# SecondChronicles 30:1-5
# 📯 Hezekiah's Call To Keep Passover
---
## 🗺️ Sent To All Israel And Judah

The word "Israel" here does not mean one unified nation.

The kingdom had split in two, Israel in the north and Judah in the south, many years before this.

By Hezekiah's time the northern kingdom had already fallen to Assyria or was close to falling.

Hezekiah reaches out anyway to whatever remained of his divided family.

This invitation crosses a border that had stood for generations.

🗺️ Israel and Judah were split kingdoms
⚔️ The north had already fallen to Assyria
✉️ Hezekiah still reached across the divide
📖 Family ties outlasted the political split

## 👨‍👦 Wrote Letters Also To Ephraim And Manasseh

Ephraim and Manasseh were two of the largest tribes making up the northern kingdom.

Naming them specifically is a way of naming the whole northern territory.

Both tribes descended from Joseph, one of Jacob's twelve sons.

Singling them out shows Hezekiah's invitation was detailed, not a vague gesture.

👨‍👦 Ephraim and Manasseh were Joseph's sons
🗾 They represented the wider northern kingdom
🎯 Naming them made the invitation specific
📖 This was no vague or careless gesture

## 📅 To Keep The Passover In The Second Month

The law normally required Passover in the first month of the year.

Numbers chapter nine allowed a second month exception, but only for someone unclean or away on a journey.

Here the whole nation uses that exception together.

Not enough priests were clean and not enough people had gathered in time.

Hezekiah bends the calendar rather than skip the feast entirely.

📅 Passover normally came in month one
📜 Numbers nine allowed a rare exception
👥 Judah used it for the whole nation
📖 A late Passover beat no Passover

## 🧹 The Priests Had Not Sanctified Themselves Sufficiently

Chapter twenty nine already described eight days spent cleaning the temple itself.

This verse says the priests themselves still were not fully ready.

Cleaning the building and preparing the people were two separate jobs.

Years of neglect under Ahaz could not be undone by one project alone.

🧹 The building had already been cleaned
👤 The priests still needed more time
⏳ Reform takes longer than one project
📖 Years of neglect leave a slow recovery

## 🧭 From Beersheba Even To Dan

Beersheba sat at the southern edge of the land.

Dan sat at the northern edge.

Naming both together was simply an old way of saying the whole land, one end to the other.

This decree was not aimed at one town or one tribe.

🧭 Beersheba marked the southern edge
🏔️ Dan marked the northern edge
🗺️ Together they meant the entire land
📖 No corner of the land was left out

## ⏳ Not Done It Of A Long Time In Such Sort As It Was Written

This admits the feast had not been kept the right way for a long time.

Some Passovers may have still happened here and there, informally.

"As it was written" means according to the law's exact instructions.

Ahaz's years of idolatry are the most likely reason for the gap.

⏳ The feast had been neglected a long time
📜 As it was written means by the law
💔 Ahaz's reign likely caused the gap
📖 True obedience means doing it the right way

# SecondChronicles 30:6-12
# ✉️ The Letter's Appeal, Mocked And Received
---
## 🏃 The Posts Went With The Letters

"Posts" here means royal runners, not modern mail carriers.

Kings used networks of messengers to move news and decrees quickly across the land.

This same system appears later in the book of Esther for a very different purpose.

Hezekiah uses the machinery of government to spread an invitation to worship.

🏃 Posts means royal runners or couriers
📨 They carried news across the kingdom
👑 The king's own system spread this call
📖 Government machinery served worship here

## 👴 Turn Again Unto The Lord God Of Abraham, Isaac, And Israel

Abraham, Isaac, and Israel are three generations of the same family.

Naming all three reminds a divided people of one shared ancestry.

Israel here is Jacob's later name, not the northern kingdom.

The appeal reaches past the political split to something older and deeper.

👴 Abraham, Isaac, Israel span three generations
🏠 They remind the nation of shared roots
🔀 Israel here means Jacob, not the kingdom
📖 Shared history outlasts a political split

## ⚔️ That Are Escaped Out Of The Hand Of The Kings Of Assyria

Assyria had already conquered or was close to conquering the northern kingdom.

Many of its people had been killed, deported, or scattered.

"Escaped" refers to whoever remained after that disaster.

Hezekiah's letter reaches survivors of a national tragedy.

⚔️ Assyria had crushed the northern kingdom
😢 Many people were killed or deported
🏃 Escaped means those who remained
📖 The letter reaches a broken remnant

## ⚠️ Be Not Ye Like Your Fathers

This is a warning, not a compliment to ancestors.

The fathers being mentioned are the recent kings and people who turned to idols.

Their unfaithfulness is the reason the nation ended up broken and scattered.

The letter asks the next generation to choose differently.

⚠️ This is a warning, not a compliment
💔 The fathers turned to other gods
🔗 Their choices led to national disaster
📖 A new generation is asked to choose again

## 🐂 Now Be Ye Not Stiffnecked, As Your Fathers Were

"Stiffnecked" pictures an ox refusing to turn its neck under the yoke.

It describes a person too stubborn to accept correction or guidance.

This same word describes Israel all the way back at Mount Sinai.

The letter asks for the opposite, a willing and teachable heart.

🐂 Stiffnecked pictures a stubborn ox
🚫 It means refusing correction
📜 The same word describes Sinai's Israel
📖 A soft heart replaces a stubborn one

## 😏 They Laughed Them To Scorn, And Mocked Them

Most of the messengers received laughter and mockery instead of a welcome.

Years of idolatry had left many people numb to any call toward God.

Not everyone responds to an honest invitation the same way.

This rejection makes the next verse's response even more striking.

😏 Most people responded with mockery
💔 Years of idolatry had numbed them
🚫 Rejection was the common reaction
📖 This sets up a striking contrast next

## ✋ The Hand Of God Was To Give Them One Heart

"The hand of God" is an old way of describing God acting directly in events.

"One heart" means the people were united in their willingness, not divided.

This unity happened in Judah, even while most of the north had mocked the same call.

God can create willingness that persuasion alone never could.

✋ Hand of God means direct divine action
❤️ One heart means shared willingness
🔀 Judah responded where the north mocked
📖 God can create willingness itself

# SecondChronicles 30:13-19
# 🩸 Keeping Passover With Unclean Hands
---
## 🍞 Much People To Keep The Feast Of Unleavened Bread

Passover and the feast of unleavened bread are actually one connected observance.

The Passover meal happened first, then seven days of eating bread without yeast followed.

Together they are often just called by either name.

A very large crowd gathered in Jerusalem to keep both parts.

🍞 Passover and unleavened bread are linked
📅 The feast lasted a full seven days
👥 A huge crowd gathered for it
📖 One name often covers both parts

## 👥 Took Away The Altars That Were In Jerusalem... Cast Them Into The Brook Kidron

This tearing down was done by the gathered people themselves, not only the king's officials.

The Kidron valley outside Jerusalem was already used as a dumping ground back in chapter twenty nine.

The same place that received the temple's filth now receives the city's pagan altars.

Reform had spread from the temple building into the streets of the city itself.

👥 The people tore these down themselves
🌊 Kidron was already the dumping site
🏙️ Reform reached beyond the temple walls
📖 Ordinary people carried reform forward

## 😳 The Priests And The Levites Were Ashamed, And Sanctified Themselves

Normally the priests and Levites would be the ones leading this kind of zeal.

Here the ordinary people's eagerness arrives first and shames the clergy into action.

Shame here works as a good and necessary push, not simple embarrassment.

Being outpaced by the people they were meant to lead is what finally moves them.

😳 Shame moved the priests to act
🔄 The people's zeal came first here
👥 Roles were reversed from the usual order
📖 Being outpaced can push people forward

## 🐑 The Levites Had The Charge Of The Killing Of The Passovers For Every One That Was Not Clean

Normally each family killed its own Passover lamb, not a priest or Levite.

Here the Levites step in only for those who could not do it in a clean state.

This was an emergency provision, not how Passover normally worked.

The rule bent so that unprepared people were not simply turned away.

🐑 Families normally killed their own lamb
🙌 Levites stepped in for the unclean
🚨 This was an emergency provision only
📖 The rule bent so none were turned away

## ⚠️ Yet Did They Eat The Passover Otherwise Than It Was Written

This line admits plainly that many people broke the letter of the law.

They ate the Passover while still ceremonially unclean, which the law did not allow.

The text does not hide or excuse this violation.

It sets up exactly why Hezekiah has to pray in the next verse.

⚠️ Many ate the Passover while unclean
📜 This broke the law's plain instruction
🚫 The text does not hide this fact
📖 It sets up Hezekiah's urgent prayer

## 🙏 Hezekiah Prayed For Them, Saying, The Good Lord Pardon Every One

Hezekiah does not turn these unprepared worshippers away.

Instead he prays directly for God's pardon on their behalf.

"Pardon" here means to forgive a fault rather than count it against someone.

A king willing to intercede for his people mattered as much as any law.

🙏 Hezekiah prays instead of punishing
❤️ Pardon means forgiving the fault
👑 A king interceded for his people
📖 Grace stepped in where the law was broken

## ❤️ Prepareth His Heart To Seek God... Though He Be Not Cleansed

This describes exactly what made someone acceptable despite being unclean.

A heart genuinely set on seeking God mattered more than perfect ritual preparation.

This does not throw out the law's importance elsewhere in scripture.

It shows God can look past incomplete obedience when the heart is honest.

❤️ A seeking heart mattered here
🚫 This does not erase the law elsewhere
👀 God can look past incomplete obedience
📖 Honesty of heart carried real weight

# SecondChronicles 30:20-22
# ❤️ The Lord Heals The People
---
## 🙏 The Lord Hearkened To Hezekiah, And Healed The People

"Healed" here does not describe a physical sickness being cured.

It means God restored and forgave the people despite their incomplete preparation.

This directly answers Hezekiah's prayer from the verse just before.

God's answer settles the tension the whole previous section built up.

🙏 Hearkened means God listened and answered
❤️ Healed means forgiven, not physically cured
✅ This answers Hezekiah's exact prayer
📖 God settled the chapter's central tension

## 📅 Kept The Feast Of Unleavened Bread Seven Days With Great Gladness

Seven days was the length the law originally set for this feast.

What stands out here is not the length but the gladness filling it.

A feast kept exactly on schedule could still feel hollow.

This one was full instead of empty.

📅 Seven days matched the law's original length
😊 Gladness is what stands out here
🚫 Correct timing alone is not the point
📖 A full feast beats a merely correct one

## 🗣️ Hezekiah Spake Comfortably Unto All The Levites

"Comfortably" here is an old way of saying he spoke straight to their hearts.

It describes warm, encouraging words, not simply a comfortable feeling.

The Levites had stepped up during the earlier shortage of ready priests.

Their extra effort earned this personal word from the king.

🗣️ Comfortably means speaking to the heart
❤️ These were warm and encouraging words
🙌 The Levites had stepped up earlier
📖 Extra effort earned personal recognition

## 📚 That Taught The Good Knowledge Of The Lord

Levites were not only ritual workers cutting meat and singing songs.

Part of their job was teaching the people what the Lord actually required.

This detail widens what their calling actually included.

Worship and instruction were never meant to be separated.

📚 Levites also had a teaching role
🚫 Their job was not ritual work alone
🗣️ They taught what the Lord required
📖 Worship and teaching stayed connected

# SecondChronicles 30:23-27
# 🎉 A Joy Too Big For One Week
---
## 📜 The Whole Assembly Took Counsel To Keep Other Seven Days

Nothing in the law required a second week of feasting.

This extension came from the people's own joy, not a command.

The whole assembly agreed together to keep going.

One week of worship was not enough to hold what they were feeling.

📜 The law never required a second week
😊 Joy, not command, drove the extension
👥 The whole assembly agreed together
📖 Their joy outgrew the first week

## 👑 Hezekiah King Of Judah Did Give To The Congregation A Thousand Bullocks And Seven Thousand Sheep

Hezekiah personally funded this second week out of his own resources.

A thousand bullocks and seven thousand sheep represent enormous royal generosity.

The princes gave a matching gift right alongside his.

Leadership here meant paying the actual cost of the celebration.

👑 Hezekiah personally funded the extension
🐂 A thousand bullocks shows real generosity
🤝 The princes matched his gift
📖 Leadership paid the celebration's real cost

## 🗺️ The Strangers That Came Out Of The Land Of Israel

"Strangers" here most likely describes people who had come from the fallen northern kingdom.

Some may not have been ethnic Israelites at all, only residents of that land.

Either way, this celebration reached beyond Judah's own citizens.

The joy in Jerusalem had pulled in people from outside its usual borders.

🗺️ Strangers likely came from the fallen north
🌍 Some may not have been ethnic Israelites
🚪 The celebration reached beyond Judah alone
📖 Joy in Jerusalem pulled in outsiders too

## 🏛️ Since The Time Of Solomon... There Was Not The Like In Jerusalem

Solomon's temple dedication happened many generations earlier in Israel's history.

That original celebration is treated in scripture as one of the greatest moments in the nation's worship.

This verse says nothing since then had matched what just happened under Hezekiah.

That comparison marks the scale of this moment as genuinely historic.

🏛️ Solomon's dedication was generations earlier
🌟 It stood as one of Israel's greatest moments
📈 Nothing since had matched this celebration
📖 Hezekiah's reform reached historic scale

## 🙏 Their Prayer Came Up To His Holy Dwelling Place, Even Unto Heaven

The priests close the whole celebration with a spoken blessing over the people.

Their prayer is described as physically rising up to heaven itself.

This is the same kind of ending chapter twenty nine used for its own celebration.

The chapter's real success was always God receiving this worship, not just the planning behind it.

🙏 Priests closed the feast with a blessing
⬆️ Their prayer is pictured rising to heaven
🔁 This mirrors chapter twenty nine's ending
📖 God receiving worship was the real success
`.trim();

export const SECOND_CHRONICLES_THIRTY_PERSONAL_SECTIONS = parseSecondChroniclesThirtyRawNotes(
  SECOND_CHRONICLES_THIRTY_RAW_NOTES,
);
