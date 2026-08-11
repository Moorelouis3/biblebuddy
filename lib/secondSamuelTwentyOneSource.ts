export type SecondSamuelTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwentyOneRawNotes(rawText: string): SecondSamuelTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 21:${startVerse}` : `2 Samuel 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Samuel 21 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWENTY_ONE_RAW_NOTES = `# SecondSamuel 21:1-4
# 🌾 Famine And Bloodguilt
---
## 🌾 A Famine In The Days Of David Three Years

A famine here is not just bad weather.

In the Bible a long famine often points to something broken between God and the people.

Three years in a row was severe for crops, animals, and daily survival.

David does not simply wait it out.

He goes straight to God and asks why.

That instinct sets up everything else in this chapter.

🌾 Famine means a national crisis

❓ David asks why, not just when

📆 Three years shows real severity

📖 David treats it as a spiritual question

## 🙏 David Enquired Of The LORD

To enquire of the LORD means more than wondering out loud.

It was a formal way of asking God for an answer.

Usually this happened through a priest or a prophet.

David is not guessing at the cause of the famine.

He waits for God to actually answer him.

This becomes David's pattern throughout his whole reign.

🙏 Enquired means formally seeking God's answer

👳 Often done through a priest or prophet

❓ David is not just guessing

📖 David seeks God before acting

## 🩸 It Is For Saul, And For His Bloody House

God tells David exactly why the famine came.

The land is under judgment because of something Saul did.

Saul's bloody house means his family carries the guilt for what he did.

This particular act against the Gibeonites is not described anywhere else in Samuel.

The reader only learns about it here, after the fact.

Unpunished bloodguilt could bring judgment on the whole land, not just the person responsible.

🩸 Bloody house means Saul's family carries guilt

📜 This act is not recorded earlier in Samuel

⚖️ Bloodguilt could bring judgment on the land

📖 Unresolved sin has consequences beyond one person

## 🏛️ The Gibeonites Were Of The Remnant Of The Amorites

The Gibeonites were not Israelites.

They were a Canaanite people, part of the Amorites who lived in the land before Israel arrived.

Long before David, they tricked Joshua into a peace treaty by pretending to come from a distant country.

Joshua and Israel's leaders swore an oath to protect them.

That oath is the reason this whole chapter exists.

🏛️ Gibeonites were Amorites, not Israelites

🤥 They tricked Joshua into a treaty

🤝 Israel's leaders swore to protect them

📖 That old oath still mattered generations later

## ⚔️ Saul Sought To Slay Them In His Zeal

Zeal usually sounds like a good thing.

Here it describes misguided passion that broke a promise instead of honoring God.

Saul attacked people Israel was sworn to protect.

He likely thought he was helping Israel or Judah by removing outsiders.

Good intentions did not cancel out breaking a sworn oath.

⚔️ Zeal here means misguided passion

🚫 Saul broke a sworn national promise

🤔 He may have thought he was helping

📖 Good intentions do not excuse broken oaths

## ⚖️ Wherewith Shall I Make The Atonement

To make atonement means to repair a wrong and satisfy what justice requires.

David is not asking how to apologize.

He is asking what it will take to make this right in God's eyes.

In this culture, spilled blood usually demanded a real cost, not just words.

David treats the Gibeonites as people owed a real debt, not an inconvenience.

⚖️ Atonement means repairing a wrong, not apologizing

💰 Ancient justice required a real cost

🙏 David seeks to satisfy God and the Gibeonites

📖 He treats their loss as a real debt

# SecondSamuel 21:5-9
# ⚖️ The Gibeonites Demand Justice
---
## 😠 The Man That Consumed Us

The man refers to Saul, though the Gibeonites do not use his name at first.

To consume here means to try to wipe out completely.

The Gibeonites are describing an attempted destruction of their entire people, not a small conflict.

Their anger has had years to build with no resolution.

😠 The man means Saul

🔥 Consumed means tried to wipe out

👥 They describe near total destruction

📖 Years of unresolved anger surface here

## 7️⃣ Let Seven Men Of His Sons Be Delivered Unto Us

Seven often represents completeness in the Bible.

The Gibeonites are not picking a random number.

They want a full measure of justice.

That matches the scale of what Saul tried to do to them.

In this culture, losing a family's sons could feel like a fitting answer to an attempted wipeout.

This does not mean the sons were personally guilty of Saul's actions.

🔢 Seven represents completeness here

⚖️ They want justice matching the harm

👨‍👦 A family's sons pay a heavy price

📖 The sons were not personally guilty

## 🏔️ We Will Hang Them Up Unto The LORD In Gibeah Of Saul

Gibeah was Saul's own hometown.

Executing his descendants there made the punishment impossible to miss or explain away.

Hanging up the bodies publicly was also meant as a lasting, visible warning.

The location itself becomes part of the message.

🏔️ Gibeah was Saul's hometown

👁️ Public execution made it unmistakable

📢 Location itself carried a message

📖 Justice landed exactly where it started

## 🕊️ The King Spared Mephibosheth, The Son Of Jonathan

This chapter actually has two different men named Mephibosheth.

This one is Jonathan's son, the same Mephibosheth David has already been caring for since chapter nine.

David spares him because of the oath he made to Jonathan back in First Samuel.

A different Mephibosheth, Saul's own son through Rizpah, is not spared.

Keeping the two straight matters for understanding the rest of the story.

🕊️ Two different men share this name

🤝 Protected by David's oath to Jonathan

👶 David has cared for him since chapter nine

📖 A different Mephibosheth is not spared

## 👩 The Two Sons Of Rizpah The Daughter Of Aiah

Rizpah was one of Saul's concubines.

A concubine held a real place in the household but with fewer rights than a wife.

She already appears earlier in the book, caught in a power struggle after Saul's death.

Her two sons, Armoni and this second Mephibosheth, are handed over here.

👩 Rizpah was one of Saul's concubines

📉 She had fewer rights than a wife

😢 Her own two sons are handed over

📖 She pays for a promise Saul broke

## 👰 The Five Sons Of Michal The Daughter Of Saul

This verse names Michal, but that is likely a copying mistake.

Michal was David's wife and the Bible says plainly she had no children.

First Samuel names Michal's sister Merab as the one given to Adriel the Meholathite.

Many translations and manuscripts correct this verse to read Merab instead of Michal.

Either way, these five men were Saul's grandsons through his daughter's marriage to Adriel.

👰 Michal here is likely a copying error

🚫 Michal is elsewhere said to be childless

📜 Merab, her sister, married Adriel instead

📖 These five were Saul's grandsons

## 🌾 In The Beginning Of Barley Harvest

Barley harvest fell in the spring, around the time of Passover.

This small detail sets the exact season for what happens next.

Rizpah's vigil, coming up in the next verses, will stretch for months from this point.

A precise time marker like this shows how carefully this event was remembered.

🌾 Barley harvest means early spring

📅 It marks the exact starting point

⏳ Rizpah's vigil begins from here

📖 The detail shows careful memory of the event

# SecondSamuel 21:10-11
# 🕊️ Rizpah's Vigil
---
## 🧵 Took Sackcloth, And Spread It For Her Upon The Rock

Sackcloth was a rough, uncomfortable cloth worn or used in deep mourning.

Rizpah spreads it out on the rock near her sons' bodies and stays there herself.

She is not performing a quick ritual and leaving.

She sets up what becomes a long, physical watch.

🧵 Sackcloth signals deep mourning

🪨 She stays at the rock herself

⏳ This becomes a long watch, not a ritual

📖 Grief here takes physical, lasting form

## 🌧️ Until Water Dropped Upon Them Out Of Heaven

This phrase simply means until the rain finally came.

Barley harvest in spring to the first rains could mean several months without a drop.

Rizpah guarded her sons' bodies through the dry season, day after day.

The length of her watch shows the depth of her devotion.

🌧️ Water dropping means the rain finally came

📆 The dry season could last months

🔥 Rizpah endured the heat that whole time

📖 Her watch shows deep devotion

## 🦅 Suffered Neither The Birds Of The Air To Rest On Them By Day, Nor The Beasts Of The Field By Night

Leaving a body unburied and exposed was considered a lasting shame in this culture.

Scavenging birds and animals would treat an unburied body as easy prey.

Rizpah physically guards her sons and their five relatives from that final indignity.

She gives them a measure of dignity that no one else provided.

🦅 Exposed bodies faced scavenging birds and animals

😔 Being unburied was a lasting shame

🛡️ Rizpah personally guards them from that

📖 She restores dignity no one else gave

## 📣 It Was Told David What Rizpah Had Done

Word of Rizpah's vigil eventually reaches David.

Her private grief becomes the reason the whole story gets resolved.

One mother's persistence changes how the king handles the remaining bones of Saul's family.

A quiet, unnoticed act ends up shaping a national decision.

📣 Rizpah's vigil reaches the king

👑 It moves David to act

🦴 It leads to proper burial for everyone

📖 One person's persistence changed the outcome

# SecondSamuel 21:12-14
# 🦴 Bones Brought Home
---
## 🏙️ Took The Bones Of Saul And The Bones Of Jonathan His Son From The Men Of Jabeshgilead

The men of Jabeshgilead had rescued Saul's and Jonathan's bodies years earlier.

Saul had once saved that city from an enemy siege, back in First Samuel.

They risked real danger to retrieve the bodies and give them a temporary burial.

David now takes over what that loyal city started long ago.

🏙️ Jabeshgilead once owed Saul a great debt

🛡️ Saul had saved that city from siege

🦴 They rescued his body out of loyalty

📖 David continues what loyal people began

## 💀 Stolen Them From The Street Of Bethshan, Where The Philistines Had Hanged Them

After Saul died in battle, the Philistines hung his body on the city wall of Bethshan.

This was meant as a public humiliation of a defeated enemy king.

The men of Jabeshgilead took the bodies down under real risk.

They refused to let their former king's disgrace stand any longer than it had to.

💀 The Philistines displayed Saul's body publicly

🏴 It was meant as humiliation

🌙 Jabeshgilead's men took real risk to remove it

📖 They refused to leave disgrace unanswered

## 🦴 They Gathered The Bones Of Them That Were Hanged

This includes the seven sons and grandsons handed over to the Gibeonites.

Their bodies had been exposed since Rizpah began her long watch.

David finally gives all of them, Saul's line and Saul himself, proper burial together.

The whole family's remains are treated with the same honor at last.

🦴 The seven executed men are included

⏳ They had been exposed since the harvest

👨‍👩‍👧 The whole family is buried together

📖 Honor finally reaches everyone, not just Saul

## ⚰️ In The Sepulchre Of Kish His Father

A sepulchre was a family burial tomb, often cut into rock.

Kish was Saul's father, already introduced back in First Samuel.

Burying Saul with his own father closes out the story with real dignity.

A king who died in disgrace ends this chapter properly honored.

⚰️ Sepulchre means a family burial tomb

👴 Kish was Saul's own father

🏠 Burial restores Saul to his family line

📖 Dignity replaces disgrace at the end

## 🌧️ After That God Was Intreated For The Land

Intreated means God finally responded with favor.

The famine that opened this chapter ends only after this act of justice and honor.

The bloodguilt from Saul's broken oath is finally answered.

Doing right by the Gibeonites and by Saul's family both mattered to God.

🌧️ Intreated means God finally answered favorably

🌾 The famine ends after this

⚖️ Bloodguilt from verse one is resolved

📖 Justice and honor both mattered here

# SecondSamuel 21:15-17
# ⚔️ David Nearly Falls In Battle
---
## 😓 David Waxed Faint

Waxed is an old way of saying became.

David became exhausted in the middle of this battle.

He is older now, well past the young shepherd who once faced Goliath alone.

This moment marks a real turning point in how David's men treat him.

😓 Waxed means became

👴 David is now an older king

⚔️ He grows exhausted mid battle

📖 His men respond by protecting him differently

## 🗿 Ishbibenob, Which Was Of The Sons Of The Giant

This fighter belonged to a line of unusually large warriors from Gath.

The Bible calls this family line the giant or the giants at several points.

Four such warriors appear together across the rest of this chapter.

Their presence recalls Goliath, the most famous giant Israel ever faced.

🗿 Ishbibenob came from a giant line

🏙️ This family was based in Gath

🔢 Four such warriors appear in this chapter

📖 Their presence echoes Goliath's story

## ⚖️ The Weight Of Whose Spear Weighed Three Hundred Shekels Of Brass In Weight

A shekel was a small unit of weight, not a coin here.

Three hundred shekels of brass comes out to about the weight of a large bowling ball.

That is an enormous weight for a single spearhead.

The detail shows exactly how outmatched David suddenly was.

⚖️ A shekel measured weight, not money

🏋️ About as heavy as a bowling ball

🗡️ That is an enormous spearhead

📖 The weight shows how outmatched David was

## 🛡️ Abishai The Son Of Zeruiah Succoured Him, And Smote The Philistine

To succour someone means to come to their aid in a moment of danger.

Abishai was Joab's brother and one of David's most loyal fighters.

He steps in and kills the giant before David can be harmed.

Loyalty from David's inner circle saves his life here.

🛡️ Succoured means came to the rescue

👥 Abishai was Joab's brother

⚔️ He kills the giant himself

📖 Loyal men save the king's life

## 🕯️ That Thou Quench Not The Light Of Israel

Light of Israel is a way of naming David as the source of the nation's hope.

To quench a light means to put it out completely.

David's men are telling him plainly that his life matters more than his presence on the battlefield.

From this point forward, they insist he stay out of direct combat.

🕯️ Light of Israel means David himself

🚫 Quench means put out completely

❤️ His men value his life over his presence

📖 They insist he stay off the front line

# SecondSamuel 21:18-22
# 🗡️ Four Giants Fall
---
## ⚔️ Sibbechai The Hushathite Slew Saph

Sibbechai was one of David's mighty men, listed later in Second Samuel and Chronicles.

Saph was another warrior from the same giant line as Ishbibenob.

This is the second of four giant killings grouped together in this chapter.

Skilled, loyal soldiers, not David himself, handle each of these threats now.

⚔️ Sibbechai was one of David's mighty men

🗿 Saph belonged to the same giant line

🔢 This is the second of four killings

📖 David's men now carry this fight

## 🧶 Elhanan The Son Of Jaareoregim, A Bethlehemite, Slew The Brother Of Goliath The Gittite

This verse can look confusing next to the famous story of David and Goliath.

First Chronicles twenty tells the same event but names the giant Lahmi, Goliath's brother, more clearly.

Many scholars believe a small copying difference between the two accounts caused this confusion.

Either way, this is not a claim that someone else killed Goliath himself.

🧶 This verse can look like a contradiction

📜 Chronicles names the giant Lahmi instead

🤝 Many scholars see this as a copying difference

📖 David's own defeat of Goliath still stands

## 🧵 The Staff Of Whose Spear Was Like A Weaver's Beam

This exact phrase was already used to describe Goliath's own spear.

A weaver's beam was the thick rotating bar that held threads in place on a loom.

Comparing a spear shaft to it paints a picture of something heavy and substantial.

The repeated description ties this giant's family line directly back to Goliath.

🧵 A weaver's beam was a thick loom bar

🗡️ It describes an unusually heavy spear shaft

🔁 This same phrase described Goliath's spear

📖 The description links this family to Goliath

## 🖐️ On Every Hand Six Fingers, And On Every Foot Six Toes

This warrior had six fingers on each hand and six toes on each foot.

That totals twenty four digits instead of the usual twenty.

This kind of trait can run in families across generations.

The Bible records it here as a plain, specific detail, not as a symbol.

🖐️ Six fingers and six toes on each side

🔢 That totals twenty four digits

👪 Such traits can run in families

📖 The detail is recorded plainly, not symbolically

## 👑 Jonathan The Son Of Shimeah The Brother Of David

This Jonathan is not Saul's son from earlier chapters.

He is David's own nephew, the son of David's brother Shimeah.

He kills the fourth giant after that giant defies Israel.

Family loyalty runs through this whole battle, from Abishai to this nephew.

👑 This Jonathan is David's own nephew

👨‍👦 His father Shimeah was David's brother

🗡️ He kills the fourth giant

📖 Family loyalty carries this whole section

## 4️⃣ These Four Were Born To The Giant In Gath

Four different giants fall in this short stretch of the chapter.

Not one of them is defeated by David personally this time.

Loyal soldiers around David finish what Goliath's family line kept starting.

The king who once faced a giant alone is now surrounded by others willing to fight for him.

🔢 Four giants fall across these verses

🛡️ David's own men handle each fight

🔁 Goliath's family line keeps producing threats

📖 David is no longer facing giants alone
`.trim();

export const SECOND_SAMUEL_TWENTY_ONE_PERSONAL_SECTIONS = parseSecondSamuelTwentyOneRawNotes(
  SECOND_SAMUEL_TWENTY_ONE_RAW_NOTES,
);
