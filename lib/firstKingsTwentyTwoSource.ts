export type FirstKingsTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTwentyTwoRawNotes(rawText: string): FirstKingsTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTwentyTwo\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTwentyTwo\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTwentyTwo\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 22:${startVerse}` : `1 Kings 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 1 Kings 22 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TWENTY_TWO_RAW_NOTES = `# FirstKingsTwentyTwo 22:1-4
# 🕊️ Three Years Without War
---
## 🕊️ Three Years Without War Between Syria And Israel

This quiet stretch follows two hard battles in chapter twenty, where Israel already beat Syria twice.

Ahab had let the Syrian king Benhadad go free instead of finishing him off.

That mercy bought a pause, not a lasting peace.

The calm here is about to break.

🕊️ Three years of quiet followed two wars

👑 Ahab had spared Benhadad earlier

⏳ Peace here was only a pause

📖 A spared enemy rarely stays at peace

## 👑 Jehoshaphat The King Of Judah Came Down

Jehoshaphat ruled Judah, the southern kingdom, while Ahab ruled Israel, the northern kingdom.

The two kingdoms had split apart generations earlier after Solomon's son lost most of the tribes.

Jehoshaphat traveling north to visit Ahab was a friendly, unusual move between two nations that were often rivals.

This visit sets up the alliance the rest of the chapter turns on.

👑 Jehoshaphat ruled the southern kingdom of Judah

🗺️ Ahab ruled the northern kingdom of Israel

🤝 This visit was a friendly, rare move

➡️ The alliance forms right here

## 🏙️ Ramoth In Gilead Is Ours

Ramothgilead was a city east of the Jordan River, inside land Israel already controlled by right.

It also served as a city of refuge.

That meant a safe place where someone could flee after an accidental killing.

Syria was holding onto it anyway, likely from an earlier war Israel had not fully won back.

Ahab wants it returned, by force if needed.

🏙️ Ramothgilead sat east of the Jordan

🛡️ It was one of Israel's cities of refuge

⚔️ Syria held it despite Israel's claim

📖 Ahab wants what he believes is rightfully his

## 🐴 I Am As Thou Art

Jehoshaphat answers with total commitment, not a cautious maybe.

My people as thy people, my horses as thy horses is a total pledge.

Jehoshaphat is putting his whole army at Ahab's disposal.

This is the language of a full military alliance, not just polite support.

Jehoshaphat commits before he even asks what God thinks about the plan.

🐴 Jehoshaphat pledges his whole army

🤝 This is a full military alliance

⚡ He commits before asking God first

➡️ Loyalty moved faster than wisdom here

# FirstKingsTwentyTwo 22:5-9
# 🔍 Jehoshaphat Asks For A True Prophet
---
## 🙏 Enquire, I Pray Thee, At The Word Of The Lord

Jehoshaphat catches the missing step only after he has already promised his army.

He asks Ahab to check with God before the battle begins.

This request shows Jehoshaphat still feared the LORD even while yoked to an unfaithful king.

It also exposes how far Ahab's own instincts had drifted from seeking God first.

🙏 Jehoshaphat asks to consult the LORD

⏳ The request comes after the promise, not before

❤️ Jehoshaphat still feared God despite the alliance

📖 Faithful instincts can survive in unfaithful company

## 🗣️ About Four Hundred Men

Ahab gathers a huge crowd of prophets, four hundred strong, to answer Jehoshaphat's request.

A number that large suggests a paid royal court of prophets who told the king what he wanted to hear.

They answer with one unified voice, Go up, for the LORD shall deliver it into the hand of the king.

Numbers alone never proved a message was true.

🗣️ Four hundred prophets gather at once

💰 A large group suggests a paid court

📣 They all agree with one voice

📖 A crowd agreeing is not proof

## ❓ Is There Not Here A Prophet Of The Lord Besides

Jehoshaphat is not convinced by the chorus of yes.

He asks a pointed question, is there really no one else to ask.

His instinct tells him something is missing from that unified answer.

That instinct turns out to be exactly right.

❓ Jehoshaphat questions the crowd's answer

👀 He senses something is missing

🎯 His instinct proves completely correct

➡️ One honest question exposed four hundred false ones

## 😠 I Hate Him

Ahab names Micaiah the son of Imlah, then immediately admits he hates him.

Micaiah's name itself means who is like the LORD.

That fits a prophet who refuses to soften God's word.

Ahab hates him for one reason only, he never prophesies good concerning me, but evil.

Ahab wants comfort, not truth, and already knows which one Micaiah will give him.

😠 Ahab openly admits hating Micaiah

📖 Micaiah's name means who is like the LORD

🎯 Ahab hates him for telling the truth

➡️ Wanting comfort over truth is a dangerous habit

# FirstKingsTwentyTwo 22:10-12
# 🐂 Four Hundred Prophets Say Go Up
---
## 👑 Sat Each On His Throne, Having Put On Their Robes

Both kings dress in full royal robes and sit formally at the city gate.

The gate of Samaria was the public square where official business and judgments normally happened.

This staged setting makes the prophecy performance feel like an official state ceremony.

Everything about the scene is designed to look convincing.

👑 Both kings dress in full royal robes

🏛️ The city gate was the public court

🎭 The scene is staged like an official ceremony

➡️ Appearances were built to convince, not to inform

## 🐂 Horns Of Iron

Zedekiah acts out his prophecy instead of just speaking it, a common practice among prophets of that era.

Horns picture a bull goring and pushing down an enemy.

That was a common image of military power in that culture.

His claim is bold, with these shalt thou push the Syrians until thou have consumed them.

A dramatic prop does not make a prophecy come from God.

🐂 Horns pictured a bull's goring strength

🎭 Zedekiah acted the prophecy out physically

⚔️ He promised total victory over Syria

📖 A convincing show is not truth

## 📣 Go Up To Ramothgilead, And Prosper

Every single one of the four hundred prophets repeats the same message.

Unified agreement can feel like proof, especially to two kings who already wanted to hear it.

Nothing here has actually been tested against God's real word yet.

The size of the chorus is about to be exposed as meaningless.

📣 All four hundred prophets agree completely

🎯 Their unity feels convincing but proves nothing

⏳ Their words have not been tested yet

➡️ A loud chorus can still be entirely wrong

# FirstKingsTwentyTwo 22:13-14
# 📨 The Messenger's Pressure
---
## 🗣️ Let Thy Word Be Like The Word Of One Of Them

A royal messenger goes to fetch Micaiah and pressures him along the way.

He tells Micaiah that every other prophet already agrees, so he should just match them.

This is peer pressure aimed at a prophet, urging him to blend in rather than speak plainly.

The messenger cares about a smooth outcome, not an honest one.

🗣️ A messenger pressures Micaiah beforehand

👥 He urges Micaiah to match the crowd

🎯 The pressure favors comfort over honesty

➡️ Peer pressure can reach even a prophet

## 🔥 As The Lord Liveth, What The Lord Saith Unto Me, That Will I Speak

Micaiah answers with a solemn oath, swearing by the LORD's own life.

He flatly refuses to shape his message to please anyone, king or messenger.

This single line sets up everything Micaiah says for the rest of the chapter.

A true prophet answers to God first, not to whoever is listening.

🔥 Micaiah swears a solemn oath

🚫 He refuses to shape his message

🎯 This line sets up the whole scene

📖 A true prophet answers to God alone

# FirstKingsTwentyTwo 22:15-18
# 🐑 Sarcasm And Scattered Sheep
---
## 🎭 Go, And Prosper

Micaiah's first answer to Ahab copies the exact words the four hundred prophets already used.

Ahab immediately senses something is off in Micaiah's tone.

Most readers understand this line as dripping sarcasm, mocking the false chorus rather than agreeing with it.

Micaiah is showing Ahab exactly how hollow that unified message really sounded.

🎭 Micaiah echoes the false prophets' exact words

👂 Ahab senses the mocking tone right away

🪞 The line mirrors the crowd to expose it

➡️ Sarcasm exposed the empty chorus

## ⚖️ Tell Me Nothing But That Which Is True

Ahab actually catches the sarcasm and calls Micaiah out for it.

He demands the real word this time, not a mocking copy of the crowd.

Ahab already suspects the truth will be bad news for him.

He asks for honesty anyway, which shows he still respects the difference between a true prophet and a paid one.

⚖️ Ahab catches Micaiah's sarcasm

🎯 He demands the real prophecy now

😬 Ahab expects bad news is coming

📖 Even Ahab knew truth and flattery were different

## 🐑 Sheep That Have Not A Shepherd

Micaiah now speaks plainly, describing Israel scattered on the hills like sheep with no shepherd to guide them.

In that culture, a shepherd's death or absence left the flock exposed and directionless.

The image quietly predicts that Israel's king, their shepherd, will not survive this battle.

The LORD's own words follow, let them return every man to his house in peace.

That means the war itself was never necessary.

🐑 Scattered sheep picture a leaderless army

👑 The missing shepherd points to the king's death

⚔️ The image predicts Israel's defeat

📖 This war was never necessary

# FirstKingsTwentyTwo 22:19-23
# 👁️ The Vision Of The Heavenly Council
---
## 🪑 I Saw The Lord Sitting On His Throne

Micaiah now describes an actual vision, not just a warning.

He saw the LORD enthroned, with the host of heaven, God's angelic servants, standing on his right and left.

This scene resembles other moments where a prophet is shown God's throne room directly.

Isaiah later saw the LORD high and lifted up in a similar way.

Micaiah is revealing where his message actually came from.

🪑 Micaiah describes seeing God's throne directly

👼 The host of heaven stood on both sides

📚 This matches other prophetic throne visions

➡️ Micaiah shows exactly where his words came from

## 🗣️ Who Shall Persuade Ahab

In the vision, the LORD asks who will lure Ahab into battle at Ramothgilead so that he falls there.

Different spirits offer different plans, until one steps forward with an answer.

This scene pictures God's sovereignty over events that still involve real choices by real spirits.

Ahab's death is not a random accident in this account, it is already settled in heaven before the battle starts.

🗣️ God asks who will lure Ahab to battle

💭 Multiple spirits offer different plans

👑 God's sovereignty covers the whole outcome

📖 Ahab's death was already settled before the battle

## 👻 I Will Be A Lying Spirit In The Mouth Of All His Prophets

A spirit volunteers to influence the four hundred prophets so they all speak falsely with one voice.

This does not mean God invented a lie from nothing.

Ahab had already rejected true prophets again and again, including Elijah and the warnings in chapter twenty.

Here God allows Ahab's own chosen advisors to seal the deception.

Ahab had already chosen those voices for himself.

👻 A spirit offers to deceive the prophets

🚫 God does not invent the lie from nothing

🔁 Ahab had already rejected true prophets before

📖 God let Ahab's own choice seal his fate

## 🎯 The Lord Hath Put A Lying Spirit In The Mouth Of All These Thy Prophets

Micaiah states the conclusion plainly to Ahab's face.

The unified message from the four hundred prophets was never from God at all.

Micaiah has now fully answered the demand for the truth, holding nothing back.

Ahab has heard exactly what he did not want to hear.

🎯 Micaiah states the vision's meaning plainly

🚫 The four hundred prophets never spoke for God

🗣️ Micaiah holds nothing back this time

➡️ Ahab finally gets the truth he asked for

# FirstKingsTwentyTwo 22:24-28
# 👊 Zedekiah Strikes Micaiah
---
## 👊 Smote Micaiah On The Cheek

Zedekiah, the prophet who made the iron horns, responds to Micaiah's words with a physical blow instead of an answer.

Striking someone on the cheek was a deep public insult in that culture, not simply an act of violence.

His question, which way went the Spirit of the LORD from me to speak unto thee, drips with mockery.

A slap cannot settle whether a prophecy is true.

👊 Zedekiah strikes Micaiah in anger

😔 A cheek strike was a public insult

🎭 His question mocks Micaiah's claim

📖 Violence never proves who spoke for God

## 🚪 When Thou Shalt Go Into An Inner Chamber To Hide Thyself

Micaiah answers Zedekiah with a prediction instead of an argument.

He says Zedekiah will one day be running to hide himself in fear.

The exact fulfillment of this line is never described in the text, but the warning stands on its own.

Micaiah lets his words carry the weight, not his fists.

🚪 Micaiah predicts Zedekiah's future fear

🏃 He pictures Zedekiah hiding in terror

🤐 The text never confirms the exact fulfillment

➡️ Micaiah answers violence with prophecy, not force

## 🍞 Bread Of Affliction And Water Of Affliction

Ahab orders Micaiah locked away with the bare minimum needed to survive.

Bread and water of affliction describes prison rations meant to punish, not to sustain comfortably.

The order comes with a condition, until I come in peace, showing Ahab still expects to return victorious.

Ahab is betting his own freedom on Micaiah being wrong.

🍞 Bread of affliction means harsh prison rations

⛓️ Micaiah is jailed for telling the truth

🎯 Ahab still expects to return in peace

📖 Ahab bet everything on Micaiah being wrong

## ❓ If Thou Return At All In Peace, The Lord Hath Not Spoken By Me

Micaiah offers his own test, an ancient way to prove whether a prophet truly spoke for God.

If Ahab comes home safely, Micaiah is willing to be called a false prophet.

He then turns to the crowd and says, hearken, O people, every one of you.

That call makes everyone present a witness.

Micaiah stakes his entire reputation on being right.

❓ Micaiah offers a testable prophecy

⚖️ His whole reputation rests on this outcome

👥 He calls the whole crowd to witness it

➡️ A true prophet is willing to be tested

# FirstKingsTwentyTwo 22:29-33
# 🛡️ Ahab's Disguise
---
## ⚔️ The King Of Israel And Jehoshaphat Went Up To Ramothgilead

Despite hearing Micaiah's clear warning, both kings march ahead with the attack anyway.

Nothing in the text suggests Ahab or Jehoshaphat seriously reconsidered after the prophecy.

Hearing a true warning and acting on it turned out to be two very different things.

The battle Micaiah predicted is now underway.

⚔️ Both kings proceed despite the warning

🚫 Neither king reconsiders the plan

😔 Hearing truth did not change their choice

➡️ A warning ignored still comes true

## 🎭 I Will Disguise Myself

Ahab hides his royal identity before entering the battle, while asking Jehoshaphat to keep wearing his own royal robes.

This looks like Ahab trying to dodge his own fate by making himself an ordinary soldier in the crowd.

It also quietly puts Jehoshaphat at greater risk in his place.

Ahab is not being fully honest with his own ally.

🎭 Ahab hides his identity in battle

👑 Jehoshaphat stays dressed as a king

⚠️ This shifts danger onto Jehoshaphat instead

📖 Ahab tried to outrun a fate already spoken

## ⚔️ Fight Neither With Small Nor Great, Save Only With The King Of Israel

The king of Syria gives his thirty two chariot captains a single focused order, target Ahab alone.

This command likely traces back to Ahab humiliating Syria's earlier king Benhadad in chapter twenty.

Personal revenge is now driving military strategy on the Syrian side.

Ahab's disguise is about to run straight into a plan built specifically to find him.

⚔️ Syria's captains are ordered to target Ahab only

😤 This likely traces back to Ahab's earlier mercy

🎯 Revenge shaped Syria's whole battle plan

➡️ A disguise cannot outrun a targeted search

## 😱 Surely It Is The King Of Israel

The Syrian captains spot Jehoshaphat's royal robes and mistake him for Ahab.

They turn their whole attack toward him, and Jehoshaphat cries out in the danger of the moment.

Once the captains realize their mistake, they pull back and stop pursuing him.

Jehoshaphat survives a danger that was never really meant for him.

😱 Captains mistake Jehoshaphat for Ahab

⚔️ They turn their attack onto him directly

🙏 Jehoshaphat cries out and the danger passes

📖 Jehoshaphat survived an attack aimed at someone else

# FirstKingsTwentyTwo 22:34-38
# 🏹 The Random Arrow
---
## 🏹 Drew A Bow At A Venture

A single unnamed soldier fires an arrow without even aiming at a specific target.

That arrow finds the one narrow gap between the joints of Ahab's armor, the small unprotected seam near the chest.

What looks like pure chance lands with impossible precision.

No disguise could shield Ahab from what had already been declared true.

🏹 An arrow is shot with no real aim

🎯 It strikes the one gap in his armor

🎲 Random chance produced an exact hit

📖 No disguise could undo a settled word

## 🩸 Turn Thine Hand, And Carry Me Out Of The Host

Ahab, badly wounded, orders his chariot driver to pull him out of the fighting.

He tries to hide the severity of his wound from his own troops to avoid causing panic.

The battle keeps raging around him regardless of his injury.

Even now, Ahab is managing appearances instead of facing what is happening to him.

🩸 Ahab is struck and badly wounded

🤫 He hides the wound from his troops

⚔️ The battle continues around him

➡️ Ahab still managed appearances while dying

## 🌇 Died At Even

Ahab has himself propped upright in his chariot facing the enemy, likely to keep his army from losing morale.

He dies slowly through the day, with blood running down into the bottom of the chariot.

He finally dies at evening, right as the sun goes down.

The king who tried to control every appearance could not control this outcome.

🌇 Ahab dies slowly as the sun sets

🪑 He stayed propped upright to hide his death

🩸 Blood pooled in the chariot as he bled

📖 Even a king could not control this ending

## 🐕 The Dogs Licked Up His Blood

Word spreads through the camp at sunset, and every soldier heads home.

Ahab's body is carried back to Samaria and washed there, where the dogs come and lick up his blood.

This directly echoes Elijah's earlier judgment against Ahab in chapter twenty one.

In the place where dogs licked the blood of Naboth, dogs would lick Ahab's blood too.

A word spoken years earlier by a prophet Ahab despised comes true in exact detail.

🐕 Dogs licked Ahab's blood in Samaria

📜 This echoes Elijah's judgment from chapter twenty one

⏳ Years passed between the word and its fulfillment

📖 God's word outlasted a king who ignored it

# FirstKingsTwentyTwo 22:39-40
# 📜 Ahab's Reign Summarized
---
## 🐘 The Ivory House Which He Made

The book of the chronicles of the kings of Israel is a royal record.

It no longer survives today and is only referenced here.

Ahab's ivory house likely means a palace decorated with carved ivory inlays, a sign of enormous wealth.

Archaeologists have actually found ivory carvings at the ancient site of Samaria, matching this exact description.

Ahab built real luxury even while leading Israel deeper into idol worship.

📜 The chronicles were a lost royal record

🐘 Ivory house means a palace with carved ivory

🏺 Archaeologists found matching ivory pieces at Samaria

📖 Ahab built luxury while leading Israel into idolatry

## 👑 Ahaziah His Son Reigned In His Stead

Ahab's death closes one of the most idol filled reigns in Israel's whole history.

His son Ahaziah now takes the throne of the northern kingdom.

The narrative is about to shift attention toward Jehoshaphat's reign in the south before picking Ahaziah's story back up.

One king's story ends exactly where the prophets said it would.

👑 Ahaziah succeeds his father Ahab

🔚 Ahab's reign ends as prophesied

🔀 The story now shifts toward Judah

➡️ A prophecy fulfilled in full detail

# FirstKingsTwentyTwo 22:41-46
# 👑 Jehoshaphat's Reign Summarized
---
## 🎂 Thirty And Five Years Old When He Began To Reign

Jehoshaphat became king of Judah at thirty five and reigned for twenty five years.

His mother's name, Azubah the daughter of Shilhi, is recorded here.

The writer includes this detail for nearly every king of Judah.

Naming the mother reflects how much influence a queen mother often carried in the royal household.

These details tie Jehoshaphat firmly into Judah's ongoing royal line.

🎂 Jehoshaphat began reigning at thirty five

📆 He reigned twenty five years total

👩 His mother Azubah is named directly

📖 A queen mother often held real influence

## 🛤️ He Walked In All The Ways Of Asa His Father

Jehoshaphat generally followed the faithful example of his father Asa, doing what was right in the LORD's eyes.

This stands in sharp contrast to Ahab's reign in the north, which the chapter has just finished describing.

Nevertheless, the high places, local worship sites outside the Jerusalem temple, were not removed.

Even a good king in Judah left one significant reform unfinished.

🛤️ Jehoshaphat followed his father Asa's example

⚖️ This contrasts sharply with Ahab's reign

🏔️ The high places were never removed

📖 Even good kings can leave reform unfinished

## 🤝 Jehoshaphat Made Peace With The King Of Israel

This peace explains why an alliance with Ahab was even possible at the start of the chapter.

The two kingdoms had been divided and often hostile since Solomon's son lost the northern tribes generations earlier.

Jehoshaphat's peace with Israel comes with real cost, as this chapter just showed by nearly costing him his life.

Peace between the two kingdoms was hard won and dangerous to maintain.

🤝 Jehoshaphat made peace with Israel

⚔️ The two kingdoms had long been divided

⚠️ That peace nearly cost him his life

➡️ Peace can carry a real and hidden cost

## 🚫 The Remnant Of The Sodomites

Sodomites here refers to male shrine prostitutes connected to Canaanite fertility worship, not a modern usage of the word.

Jehoshaphat continues his father Asa's earlier reform by removing those who remained in the land.

This detail shows Jehoshaphat actively pushing back against pagan worship practices, even while leaving the high places standing.

His reform was real, even if it was not complete.

🚫 Sodomites meant male shrine prostitutes

🔁 This continues Asa's earlier reform

🙏 Jehoshaphat pushed back against pagan worship

📖 Real reform does not require perfection

# FirstKingsTwentyTwo 22:47-49
# ⚓ Edom And The Wrecked Ships
---
## 👑 There Was Then No King In Edom

Edom, a nation south of Judah, had no king of its own at this time.

Only a deputy had been appointed to govern it.

This detail reflects Edom's subject status, going back to when King David conquered the region generations earlier.

The note is brief, but it marks Judah's continued authority over a neighboring people.

Small details like this quietly track the shifting borders of the ancient world.

👑 Edom had no king of its own

🗺️ Edom sat south of Judah

⚔️ David had conquered Edom generations earlier

📖 A missing king still marked real authority

## ⚓ Ships Of Tharshish To Go To Ophir For Gold

Tharshish ships were large ocean going trade vessels, named for a distant western port they were originally built to reach.

Ophir was a region famous across the ancient world for producing high quality gold.

Jehoshaphat wanted the same profitable trade route Solomon had once used successfully.

Wanting Solomon's success did not guarantee Jehoshaphat would get Solomon's result.

⚓ Ships of Tharshish were large trade vessels

🥇 Ophir was famous for high quality gold

📈 Jehoshaphat wanted Solomon's old trade route

➡️ Wanting success does not repeat it

## 💥 The Ships Were Broken At Eziongeber

Eziongeber was Judah's port city on the Red Sea, the launching point for this entire venture.

The ships were wrecked there before they ever completed the voyage to Ophir.

A parallel account in Second Chronicles fills in the missing reason.

Jehoshaphat had partnered with wicked King Ahaziah on this venture, and Chronicles ties the failure directly to that partnership.

The mission collapsed before it ever really began.

💥 The ships wrecked at Eziongeber

🏴‍☠️ Eziongeber was Judah's Red Sea port

📚 Chronicles ties the failure to a bad partnership

📖 A flawed partnership sank the whole venture

# FirstKingsTwentyTwo 22:50-53
# 🔀 Endings And A New Beginning
---
## 🚫 Jehoshaphat Would Not

Ahaziah, Ahab's son, offers to send his own servants along on a second attempt at the shipping venture.

This time, Jehoshaphat turns him down flatly.

The fleet had already wrecked once, and Ramothgilead nearly cost him his life.

Jehoshaphat finally seems to have learned something about partnering with Ahab's household.

A costly lesson finally lands.

🚫 Jehoshaphat refuses Ahaziah's offer

🔁 Ahaziah proposes a second joint venture

📚 Jehoshaphat had already paid for one bad partnership

➡️ A hard lesson finally changed his choice

## 🪦 Jehoshaphat Slept With His Fathers

This is a common Biblical way of describing a peaceful, natural death rather than one in battle or disgrace.

Jehoshaphat is buried in the city of David, the same royal burial ground used for Judah's kings.

His son Jehoram now takes the throne, continuing the family line all the way back to David.

Jehoshaphat's story closes with far more peace than Ahab's ever did.

🪦 Slept with his fathers means a peaceful death

🏙️ He was buried in the city of David

👑 His son Jehoram succeeds him

📖 His ending contrasts sharply with Ahab's

## 👑 Ahaziah Began To Reign Over Israel

The chapter closes by picking the northern kingdom's story back up, right where Ahab's death left off.

Ahaziah reigns only two years, a short reign compared to his father's twenty two.

The text says he walked in the way of his father and in the way of his mother.

That names both Ahab and Jezebel as his models.

Nothing about the direction of the northern kingdom has changed with the new king.

👑 Ahaziah begins his short reign

📆 He reigns only two years

👥 He follows both Ahab and Jezebel's example

➡️ A new king kept the old direction

## 🔥 He Served Baal, And Worshipped Him

Baal was the Canaanite storm and fertility god that Ahab and Jezebel had promoted throughout Ahab's whole reign.

Ahaziah continues that same worship.

He follows the pattern set by Jeroboam generations earlier, the first king who made Israel sin with false worship.

The chapter ends with the LORD provoked to anger, the same tension that has driven this entire section of Kings.

Israel's northern kingdom closes chapter twenty two exactly where it started, still walking away from God.

🔥 Baal was Canaanite's storm and fertility god

👥 Ahaziah continued Ahab and Jezebel's worship

🔁 Jeroboam's old pattern of sin repeats again

📖 The kingdom ends this chapter unchanged
`.trim();

export const FIRST_KINGS_TWENTY_TWO_PERSONAL_SECTIONS = parseFirstKingsTwentyTwoRawNotes(FIRST_KINGS_TWENTY_TWO_RAW_NOTES);
