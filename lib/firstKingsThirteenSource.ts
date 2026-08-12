export type FirstKingsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsThirteenRawNotes(rawText: string): FirstKingsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsThirteen\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsThirteen\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsThirteen\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 13:${startVerse}` : `1 Kings 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 1 Kings 13 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_THIRTEEN_RAW_NOTES = `# FirstKingsThirteen 13:1-3
# 🗣️ A Prophet Cries Against The Altar
---
## 🕊️ There Came A Man Of God Out Of Judah

"Man of God" means someone sent to speak directly for the LORD.

This prophet is never named in the whole chapter.

Jeroboam gets named again and again.

The story keeps its spotlight on the message, not the messenger.

🕊️ Man of God means a true prophet

📛 This prophet stays unnamed throughout

👑 Jeroboam is named again and again

📖 The message matters more than the messenger

## 🔥 Jeroboam Stood By The Altar To Burn Incense

Burning incense was normally a priest's job, not a king's.

Jeroboam had already made himself a priest back in chapter twelve.

He built new altars and even his own festival calendar.

Standing at this altar himself put that rebellion on display.

🔥 Burning incense was normally a priest's job

👑 Jeroboam already crowned himself a priest

📅 He created his own festival calendar

📖 This moment displays that ongoing rebellion

## 📯 He Cried Against The Altar In The Word Of The LORD

To cry against something means to publicly condemn it out loud.

The prophet does not whisper this warning in private.

He speaks it right in front of the king and the crowd.

This judgment matches the very public sin it condemns.

📯 Cried against means condemned out loud

👑 The king hears the warning directly

👀 The crowd hears it too

📖 Public sin gets a public judgment

## 👶 A Child Shall Be Born Unto The House Of David, Josiah By Name

God names a king who has not been born yet.

Centuries will pass before Josiah ever sits on Judah's throne.

When Josiah finally reigns, he tears down this very altar.

A promise this specific could only come from God.

👶 Josiah is named centuries early

👑 He later reigns over Judah

🔥 Josiah tears down this altar

📖 Only God names history in advance

## 🦴 Men's Bones Shall Be Burnt Upon Thee

Dead bodies made a person or place ceremonially unclean under the law.

Burning human bones on this altar would defile it completely.

This was not ordinary destruction.

It was permanent disqualification from ever being used again.

🦴 Bones made things ceremonially unclean

🔥 Burning bones defiles the altar

🚫 This was not ordinary destruction

📖 The altar could never be pure again

## 🪨 The Altar Shall Be Rent, And The Ashes That Are Upon It Shall Be Poured Out

God does not ask Jeroboam to simply trust the words.

He gives a sign that happens on the very same day.

The altar itself will crack open before anyone can doubt it.

Proof arrives immediately, not centuries later like the promise about Josiah.

🪨 A sign confirms the spoken word

⚡ The altar splits open that same day

👀 Nobody has to wait to see proof

📖 Immediate proof backs up the distant promise

# FirstKingsThirteen 13:4-6
# 😡 The King's Hand Reaches Out
---
## ✋ Put Forth His Hand From The Altar, Saying, Lay Hold On Him

Jeroboam does not argue back with words.

He orders his men to grab the prophet on the spot.

A king who built his own altar cannot stand being publicly corrected.

Force is his first response to a warning he does not like.

✋ Jeroboam skips straight to force

👮 He orders the prophet seized

👑 Correction wounds his pride quickly

➡️ His reaction reveals his character

## 🖐️ His Hand Dried Up, So That He Could Not Pull It In Again

"Dried up" means the hand instantly went stiff and lifeless.

Jeroboam could no longer bend it or pull it back.

The very hand raised to punish the prophet is the one struck.

Divine judgment lands exactly where the pride began.

🖐️ Dried up means suddenly stiff and lifeless

🚫 Jeroboam cannot move his own hand

🎯 The judgment strikes the guilty hand

📖 Pride and punishment land in the same place

## 🪨 The Altar Also Was Rent

The sign from the first verse happens exactly as promised.

The altar cracks open and the ashes spill onto the ground.

Two different signs happen in this same moment.

A withered hand and a broken altar both prove the same word true.

🪨 The altar cracks open as promised

💨 Ashes spill out onto the ground

🖐️ A hand and an altar both break

📖 Two signs confirm the same word

## 🙏 Intreat Now The Face Of The LORD Thy God

"Intreat" is an old word for begging someone earnestly.

Jeroboam does not call the LORD "my God" here.

He calls Him "thy God," speaking to the prophet, not to God directly.

A proud king suddenly needs the very man he tried to arrest.

🙏 Intreat means to beg earnestly

👑 Jeroboam avoids calling God his own

🗣️ He speaks through the prophet instead

📖 Pride turns to desperate need instantly

## 🤲 The Man Of God Besought The LORD, And The King's Hand Was Restored

The prophet prays for the very king who just tried to seize him.

God answers that prayer right away.

Mercy reaches Jeroboam even though nothing about his heart has changed.

Kindness here is not the same as approval of his sin.

🤲 The prophet prays for his attacker

⚡ God restores the hand immediately

❤️ Mercy comes before any real change

📖 Kindness does not mean approval

## 🎁 That My Hand May Be Restored Me Again

This request is personal, not political.

Jeroboam is not asking to be forgiven for his idols.

He only wants his own body working again.

A physical miracle here does not fix a spiritual problem.

🎁 The plea is about his hand only

🚫 He does not ask forgiveness for idols

🖐️ His body heals, his heart does not

📖 One miracle cannot replace real repentance

# FirstKingsThirteen 13:7-10
# 🍞 The Reward He Will Not Take
---
## 🏠 Come Home With Me, And Refresh Thyself, And I Will Give Thee A Reward

This invitation sounds like simple hospitality.

Accepting it would have linked God's true prophet to Jeroboam's court.

A reward from Jeroboam would look like approval of his new religion.

The offer is generous, but the trap hides underneath it.

🏠 The invitation looks like kindness

🔗 Accepting it would create a link

👑 A reward would suggest approval

📖 A generous offer can still be a trap

## 🏡 If Thou Wilt Give Me Half Thine House

"Half thine house" was a way of offering an enormous reward.

The same kind of phrase shows up later when a king offers half his kingdom.

Jeroboam is not offering a small gift.

He is offering wealth large enough to buy loyalty.

🏡 Half thine house means an enormous reward

👑 Esther later hears a similar offer

💰 Jeroboam offers real wealth, not a token

📖 Big rewards can still hide big traps

## 🙅 I Will Not Go In With Thee

The prophet refuses without hesitation.

No amount of wealth can undo what God commanded him.

Obedience matters more to him than comfort or gain.

His answer settles the matter completely.

🙅 He refuses without hesitation

💰 Wealth cannot outweigh obedience

🎯 Obedience matters more than comfort

➡️ His answer settles it at once

## 🍞 Neither Will I Eat Bread Nor Drink Water In This Place

Sharing a meal in this culture was a sign of friendship or alliance.

Eating with Jeroboam would have looked like approving of his altar.

The prophet refuses food to keep his message completely separate from the king.

Some meals carry more weight than just food.

🍞 Shared meals signaled friendship or alliance

🚫 Eating here would suggest approval

🎯 Refusing food protects his message

📖 Some meals carry real meaning

## 📜 For So Was It Charged Me By The Word Of The LORD

This is not the prophet's own idea of caution.

God gave him this exact command before he ever arrived in Bethel.

The instruction covers eating, drinking, and even his route home.

Every detail of his obedience was already spelled out for him.

📜 God gave this command in advance

🍞 It covers eating and drinking

🧭 It even covers his route home

📖 Every detail was already spelled out

## 🧭 Nor Turn Again By The Same Way That Thou Camest

Retracing the same road would mean lingering near Jeroboam's territory.

The command forces a clean, complete break from Bethel.

Taking a different way removes any chance to be followed or delayed.

Obedience here even shapes something as small as his travel route.

🧭 Retracing his steps risked staying too close

🚪 The command forces a clean break

🛤️ A new route avoids being followed

📖 Obedience even shapes small details

## 🚶 So He Went Another Way, And Returned Not By The Way That He Came To Bethel

The prophet obeys the command exactly as given.

Every part of God's instruction is followed at this point.

This obedience makes what happens later in the chapter so painful.

He got it right once, in full.

🚶 The prophet obeys fully here

✅ Every instruction is kept exactly

😔 This makes his later failure painful

➡️ Full obedience happens, but only for now

# FirstKingsThirteen 13:11-14
# 👴 The Old Prophet Hears The News
---
## 🏘️ Now There Dwelt An Old Prophet In Bethel

A true prophet of the LORD is already living inside Jeroboam's own city.

This does not mean Bethel itself was faithful to God.

It means at least one man there still carried that calling.

His presence sets up everything that happens for the rest of the chapter.

🏘️ A real prophet lives in Bethel

🚫 Bethel itself was not faithful

👴 One faithful man still remained there

📖 His presence shapes the rest of the story

## 👂 His Sons Came And Told Him All The Works That The Man Of God Had Done

News of the withered hand and the broken altar spreads fast.

The old prophet's own sons are the ones who bring him the report.

Family conversations carry this story before it reaches him directly.

Word of God's power rarely stays quiet for long.

👂 News spreads quickly through the city

👨‍👦 His own sons deliver the report

🗣️ Family talk carries the story first

📖 God's power rarely stays quiet

## ❓ What Way Went He? For His Sons Had Seen What Way The Man Of God Went

The old prophet wants to know exactly which road the man took.

His sons had watched him leave and remembered the direction.

This question is the first step of a chase, not just curiosity.

His true motive is not explained yet, and that gap matters.

❓ He asks the exact direction taken

👀 His sons had already watched him leave

🐎 This question starts a pursuit

📖 His true motive stays hidden for now

## 🐴 Saddle Me The Ass. So They Saddled Him The Ass, And He Rode Thereon

An ass here is simply a donkey, the normal transportation for a journey like this.

The old prophet does not send someone else to fetch the man.

He goes himself, in a hurry, right after hearing the news.

His urgency says something about how badly he wants to catch up.

🐴 An ass means a donkey

🏃 He does not send anyone else

⏱️ He leaves in a hurry

📖 His urgency reveals his intent

## 🌳 And Went After The Man Of God, And Found Him Sitting Under An Oak

An oak tree was a natural landmark and a common resting spot in this region.

The prophet had stopped, likely to rest after the long walk from Bethel.

Finding him seated makes it easy for the old man to catch up and talk.

A simple resting spot becomes the setting for a dangerous conversation.

🌳 An oak served as a landmark

😌 The prophet was resting there

🗣️ Resting made conversation easy

📖 A quiet spot turns dangerous

## 🗣️ Art Thou The Man Of God That Camest From Judah? And He Said, I Am

The old prophet confirms exactly who he is speaking to before saying anything else.

The man of God answers honestly and openly.

Nothing about his answer suggests he suspects any danger.

His honesty here is about to be used against him.

🗣️ The old prophet confirms his identity

✅ The man of God answers honestly

😌 No suspicion is shown yet

📖 Honesty is about to be exploited

# FirstKingsThirteen 13:15-19
# 🍽️ The Meal That Should Never Have Happened
---
## 🏠 Then He Said Unto Him, Come Home With Me, And Eat Bread

This is the same invitation Jeroboam offered earlier in the chapter.

This time it comes from a fellow prophet instead of a king.

An invitation from someone who claims the same calling is harder to refuse.

The temptation has changed its shape, not its danger.

🏠 The same invitation returns again

👴 This time it comes from a prophet

🤔 A peer's offer is harder to refuse

📖 The danger wears a new disguise

## 🙅 I May Not Return With Thee, Nor Go In With Thee

The man of God gives the exact same refusal he gave Jeroboam.

At this point he is still standing firm on God's command.

His answer shows he has not forgotten what was charged to him.

Faithfulness so far has held under real pressure.

🙅 He repeats his original refusal

🎯 He still remembers God's command

💪 His faithfulness is holding firm

➡️ The real test is still coming

## 📜 For It Was Said To Me By The Word Of The LORD

He restates the same reasoning he gave earlier on the road.

His obedience is not based on personal preference.

It rests entirely on a specific word he was given directly.

That word is about to be challenged by a false one.

📜 He restates the same reasoning

🎯 His obedience rests on God's word

🛡️ Personal preference plays no part

📖 A false word is coming next

## 👴 I Am A Prophet Also As Thou Art

The old prophet claims the same title and calling as the man of God.

Shared identity makes his coming lie far more convincing.

A stranger's invitation is easy to doubt.

A fellow prophet's invitation feels safe to trust.

👴 He claims the same calling

🤝 Shared identity builds instant trust

🚫 A stranger would be easy to doubt

📖 Trust makes deception more effective

## 👼 An Angel Spake Unto Me By The Word Of The LORD

The old prophet claims new instructions came from an angel.

He never explains why God would contradict what was already commanded.

A message that reverses a clear command deserves real suspicion.

New claims should never simply override what God has already said plainly.

👼 He claims a new message from an angel

❓ He never explains the sudden reversal

🚩 A command reversal deserves suspicion

📖 New claims cannot override a clear word

## 🤥 But He Lied Unto Him

The narrator steps in here to remove all doubt.

This is not a misunderstanding or an honest mistake.

The old prophet is telling a deliberate lie.

The reader is meant to see this clearly, even though the man of God could not.

🤥 The narrator calls this a lie plainly

🚫 This is not a simple mistake

👀 The reader sees what he could not

📖 Clear deception still fooled a faithful man

## 🍞 So He Went Back With Him, And Did Eat Bread In His House, And Drank Water

The man of God finally breaks the command he had kept perfectly until now.

One convincing lie undoes obedience that survived a king's reward.

The meal itself looks harmless on the surface.

Underneath it, he has just stepped outside of God's protection.

🍞 He finally eats the forbidden meal

💔 One lie undid perfect obedience

😌 The meal looks harmless on the surface

📖 He has stepped outside God's protection

# FirstKingsThirteen 13:20-22
# ⚖️ Judgment Spoken At The Table
---
## 🗣️ As They Sat At The Table, The Word Of The LORD Came Unto The Prophet That Brought Him Back

The true word of the LORD comes to the old prophet, not to the man of God.

This is a strange twist, since the old prophet is the one who lied.

God still speaks true words through someone acting in bad faith.

The message itself remains true even when the messenger is not trustworthy.

🗣️ The true word comes to the deceiver

😲 That twist is unexpected

🎯 God's word stays true regardless

📖 A message can be true, a messenger not

## ⚖️ Forasmuch As Thou Hast Disobeyed The Mouth Of The LORD

Judgment is announced against the man of God, not the one who lied to him.

Being deceived did not cancel out his responsibility to obey.

He heard God's command directly and clearly, before anyone else spoke to him.

Obedience is measured against what a person was told first.

⚖️ Judgment falls on the man of God

😔 Deception did not remove his responsibility

🎯 He heard the command first, directly

📖 Obedience is judged by the first word

## 🍞 Hast Eaten Bread And Drunk Water In The Place

The judgment names the exact command that was broken.

It matches the exact wording of the original instruction, word for word.

Nothing about this violation was vague or accidental.

God's word had already covered this exact situation ahead of time.

🍞 The judgment names the exact violation

🎯 It matches the original command's wording

🚫 Nothing here was vague or unclear

📖 God's word already covered this moment

## ⚰️ Thy Carcase Shall Not Come Unto The Sepulchre Of Thy Fathers

"Carcase" is an old word for a dead body.

Being buried with one's ancestors was considered a mark of honor in this culture.

Losing that burial was a real and lasting form of dishonor.

The punishment reaches beyond his life and into how he would be remembered.

⚰️ Carcase means a dead body

🪦 Family burial was a mark of honor

💔 Losing it meant lasting dishonor

📖 This judgment outlives his own life

# FirstKingsThirteen 13:23-25
# 🦁 The Lion On The Road
---
## 🐴 After He Had Eaten Bread, He Saddled For Him The Ass

Life goes on as if nothing serious just happened.

The old prophet still prepares the donkey for his guest's return trip.

No one stops him or warns him again before he leaves.

The most dangerous moment of the whole chapter is about to begin quietly.

🐴 Life continues as if nothing happened

🚪 No one stops him from leaving

🤫 No further warning comes first

📖 Danger begins in a quiet moment

## 🦁 A Lion Met Him By The Way, And Slew Him

Lions were a real danger in this region during this period.

This encounter is not simply bad luck on a dangerous road.

It happens right after the judgment was spoken at the table.

Timing turns an ordinary danger into a clear act of judgment.

🦁 Lions were a real danger here

⏱️ The timing follows the judgment directly

🎯 This was not ordinary bad luck

📖 Timing reveals the hand of judgment

## 🐴 His Carcase Was Cast In The Way, And The Ass Stood By It, The Lion Also Stood By The Carcase

A lion that kills prey almost never leaves the body alone afterward.

Here the lion simply stands beside the body without eating it.

The donkey stands calmly next to the same lion that should threaten it.

Nature is behaving in a way that only makes sense as a sign from God.

🦁 Lions normally eat what they kill

🐴 The donkey stays calm beside the lion

🚫 Nothing about this scene is normal

📖 Only God explains this behavior

## 👀 Men Passed By, And Saw The Carcase Cast In The Way

Ordinary travelers stumble onto this strange scene by chance.

They see exactly what should not be possible, a lion at rest beside a body and a donkey.

Word of it spreads back to the city from there.

A private judgment becomes a public witness within hours.

👀 Travelers discover the strange scene

🦁 A resting lion should not be possible

🗣️ Word spreads back to the city

📖 A private judgment becomes public news

# FirstKingsThirteen 13:26-30
# 😢 Burying The Man Of God
---
## 😔 It Is The Man Of God, Who Was Disobedient Unto The Word Of The LORD

The old prophet understands instantly what has happened and why.

He names the true cause correctly, even though he caused it himself.

His own lie is the reason the man of God ever disobeyed at all.

Guilt and honesty sit together in this one sentence.

😔 He instantly understands what happened

🎯 He names the true cause correctly

💔 His own lie caused the disobedience

📖 Guilt and honesty appear together here

## 🦁 The Lion Had Not Eaten The Carcase, Nor Torn The Ass

This detail gets repeated for a reason.

A normal lion would have eaten or damaged something by now.

The story wants the reader to notice this is not normal lion behavior twice.

Repetition here works like an underline drawn beneath the truth.

🦁 This unnatural detail repeats on purpose

🚫 Normal lions do not behave this way

✍️ Repetition underlines the truth

📖 God controlled this scene completely

## 🐴 The Prophet Took Up The Carcase Of The Man Of God, And Laid It Upon The Ass

The old prophet personally handles the body with real care.

He does not send a servant to do this difficult task.

Someone who caused this death now carries the weight of it himself.

His actions here show real remorse, even if his words never fully explain it.

🐴 He personally carries the body

🙋 He does not send a servant

💔 He carries the weight of his own guilt

📖 His actions show real remorse

## 🏙️ Brought It Back, And The Old Prophet Came To The City, To Mourn And To Bury Him

Mourning in this culture was done openly and often shared by a whole community.

The old prophet brings the body all the way back to his own home city.

He takes full responsibility for the burial instead of leaving it to others.

Bringing him home is the last respect he can offer after the lie that cost him everything.

🏙️ The body returns to the old prophet's city

👥 Mourning was usually a shared, public act

🪦 He takes responsibility for the burial

📖 This is his last act of respect

## ⚰️ He Laid His Carcase In His Own Grave

The old prophet gives up his own family burial place.

This was normally reserved for himself or his own household.

Giving away that spot was a costly, permanent gesture.

It shows honor toward a man he had personally deceived.

⚰️ He gives up his own grave site

👪 That plot was meant for his family

💰 The gesture was costly and permanent

📖 It honors the very man he deceived

## 😢 They Mourned Over Him, Saying, Alas, My Brother!

"Alas, my brother" was a common cry of grief spoken at a burial.

Calling him "brother" is striking, since the two men had only just met.

That word suggests real sorrow, not just formal custom.

Even a deception this serious did not erase genuine human grief.

😢 Alas my brother was a grief cry

🤝 Brother is a striking word to use

❤️ It suggests real sorrow, not formality

📖 Grief remained genuine despite the deception

# FirstKingsThirteen 13:31-32
# 🪦 Bury Me Beside Him
---
## 🪦 When I Am Dead, Then Bury Me In The Sepulchre Wherein The Man Of God Is Buried

The old prophet plans his own burial around this one grave.

He wants his bones to rest beside the very man he deceived.

Later scripture explains why this choice mattered so much.

When King Josiah destroys the altars of Bethel, this shared grave is the one left undisturbed.

🪦 He plans his burial around this grave

🤝 He wants rest beside the man he wronged

👑 Josiah later destroys the altars of Bethel

📖 This one grave is the one spared

## 🦴 Lay My Bones Beside His Bones

This request looks back at his own guilt honestly.

He does not ask for forgiveness in these words.

He simply wants his own bones protected through the true prophet's legacy.

A costly kind of honor follows him even into death.

🦴 He asks to share the same bones' rest

😔 He does not ask for forgiveness outright

🛡️ His bones gain protection through the true prophet

📖 Honor still follows him into death

## 🏘️ Against All The Houses Of The High Places Which Are In The Cities Of Samaria

This prophecy was never only about the one altar in Bethel.

Samaria refers to the wider northern kingdom, full of similar shrines.

The warning reaches every high place across the whole territory.

One small sign at Bethel points toward a much larger judgment still to come.

🏘️ Samaria means the whole northern kingdom

🔥 Many shrines share this same warning

🗺️ The judgment reaches far beyond Bethel

📖 One sign points to a larger judgment

## ✅ Shall Surely Come To Pass

Centuries will pass before this full judgment plays out.

Time does not weaken a promise made by God.

Josiah's reforms, still generations away, will prove every word of this true.

A delay is never the same as a cancellation.

✅ The promise stands despite the long delay

⏳ Centuries pass before it is fulfilled

👑 Josiah later proves every word true

📖 A delay is never a cancellation

# FirstKingsThirteen 13:33-34
# 💔 A King Who Never Turns Back
---
## 🚫 After This Thing Jeroboam Returned Not From His Evil Way

A withered hand, a broken altar, and a public miracle changed nothing in his heart.

Jeroboam saw undeniable proof of God's power firsthand.

He still chooses to continue exactly as before.

Seeing a miracle is never the same as truly changing direction.

🚫 Nothing about his heart changes here

👀 He witnessed undeniable proof firsthand

🔁 He continues exactly as before

📖 A miracle does not guarantee real change

## 👥 Made Again Of The Lowest Of The People Priests Of The High Places

Priests were supposed to come only from the tribe of Levi under God's law.

Jeroboam ignores that requirement completely.

He appoints priests from any tribe he chooses.

Breaking this rule strips the priesthood of the calling God had actually given it.

👥 Priests were meant to come from Levi only

🚫 Jeroboam ignores that requirement entirely

🎯 He appoints priests from any tribe

📖 This strips the priesthood of its true calling

## 🙋 Whosoever Would, He Consecrated Him

This phrase means the position was open to anyone willing to take it.

No calling from God and no proper training were required at all.

Wanting the job was treated as reason enough to receive it.

A sacred office became available to whoever simply asked for it.

🙋 Anyone willing could take the role

🚫 No true calling was required

💼 Desire alone earned the position

📖 A sacred office became easy to claim

## ⚰️ This Thing Became Sin Unto The House Of Jeroboam, Even To Cut It Off

This single choice becomes the reason his whole family line eventually falls.

Later chapters record that downfall in full detail.

One stubborn refusal to change outweighs one dramatic miracle at the altar.

A hardened heart carries consequences far beyond just one man's lifetime.

⚰️ This sin dooms his whole family line

📖 Later chapters record that downfall

⚖️ One refusal outweighs one miracle

➡️ A hardened heart outlives one lifetime
`.trim();

export const FIRST_KINGS_THIRTEEN_PERSONAL_SECTIONS = parseFirstKingsThirteenRawNotes(FIRST_KINGS_THIRTEEN_RAW_NOTES);
