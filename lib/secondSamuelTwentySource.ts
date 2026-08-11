export type SecondSamuelTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwentyRawNotes(rawText: string): SecondSamuelTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 20:${startVerse}` : `2 Samuel 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 20 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWENTY_RAW_NOTES = `# SecondSamuel 20:1-3
# 😤 Sheba Calls Israel To Rebellion
---
## 😈 A Man Of Belial

"Belial" is an old word for someone worthless and wicked.

Calling Sheba a man of Belial marks him as trouble from the first line.

The same term appears elsewhere in this book for other troublemakers.

The narrator warns the reader who this man really is before he even speaks.

😈 Belial means worthless and wicked

🚩 The label warns the reader early

🔁 The same term appears elsewhere in this book

📖 Sheba is trouble before he speaks

## 📯 He Blew A Trumpet

A trumpet blast was how ancient Israel called men to war or to a meeting.

Sheba does not ask for permission first.

He blows the horn the way a king announces war.

That single sound reaches Israelite camps still gathered near the Jordan.

It turns one man's grudge into the start of a wider revolt.

📯 A trumpet signaled war or meeting

👑 Sheba acts like a king

🌊 The sound reaches the whole camp

📖 One grudge becomes a revolt

## 🚫 We Have No Part In David, Neither Have We Inheritance In The Son Of Jesse

This is a formal announcement that Israel is breaking away from David's rule.

Calling him only the son of Jesse refuses to use his title as king.

King Saul once used this same insult against David years earlier.

Sheba is not just leaving.

He is publicly stripping David's royal title away with these words.

🚫 No part in David means secession

👑 Son of Jesse refuses his title

😤 Saul used this insult before

📖 Sheba strips David's title in words

## 🏃 Every Man Of Israel Went Up From After David

The northern tribes do not hesitate.

They abandon David almost immediately.

This happens right after the bitter argument between Israel and Judah in chapter nineteen.

That unresolved quarrel becomes the spark Sheba needed to pull Israel away.

One loud voice was enough because the ground was already unstable.

🏃 Israel abandons David immediately

😤 This follows the quarrel in chapter nineteen

🔥 The unresolved anger sparks the revolt

📖 A shaky foundation breaks fast

## 🤝 The Men Of Judah Clave Unto Their King

"Clave" is an old word meaning stuck close and stayed loyal.

Judah alone stays with David.

Every other tribe walks away from him.

This same split already showed itself at the end of chapter nineteen.

Judah's loyalty here comes from blood ties, not from universal love for David.

🤝 Clave means stuck close and loyal

🦁 Judah alone stays with David

🚶 Every other tribe walks away

📖 Blood ties explain Judah's loyalty

## 🔒 Put Them In Ward

"Ward" is an old word for guarded confinement, not a normal home.

David takes back the ten concubines Absalom had publicly taken in chapter sixteen.

He provides for them but does not visit them again.

This is not mercy alone.

It also protects David from any further scandal.

🔒 Ward means guarded confinement

👑 These women were Absalom's public claim

🍞 David provides but stays away

📖 Protection here is not pure mercy

## 😔 Shut Up Unto The Day Of Their Death, Living In Widowhood

These ten women are neither fully wives nor fully set free.

They live the rest of their lives without a husband and without remarriage.

Nathan once warned David that his own house would suffer for his sins.

This quiet, sad detail is part of how that warning came true.

😔 Neither wife nor fully free

🚫 No husband and no remarriage

📜 Nathan once warned David of this

📖 A quiet fulfillment of that warning

# SecondSamuel 20:4-7
# 🐴 David Sends Abishai, Not Amasa
---
## 📅 Assemble Me The Men Of Judah Within Three Days

David gives Amasa his first real assignment as the new army commander.

Amasa had led Absalom's rebel army just one chapter earlier.

David is testing whether Amasa can be trusted with power this fast.

Three days is a short, urgent deadline for gathering an entire tribe's fighters.

📅 Three days was a short deadline

⚔️ Amasa had led Absalom's rebel army

🤔 David is testing his new commander

📖 Trust is being measured quickly

## ⏳ He Tarried Longer Than The Set Time

"Tarried" is an old word for delayed or stayed too long.

Amasa does not return with the men of Judah on schedule.

The text never says whether this was disloyalty or simple difficulty.

That delay opens a gap that David cannot afford to leave open.

⏳ Tarried means delayed too long

🐴 Amasa misses his own deadline

❓ The Bible does not say why

📖 A short delay creates a real gap

## ⚠️ Sheba The Son Of Bichri Do Us More Harm Than Did Absalom

Absalom had an army, a plan, and time to prepare his rebellion.

Sheba has almost none of that, yet David still fears him more.

A scattered rebel with nothing to lose can be harder to catch than a planned war.

David worries Sheba will vanish into the countryside before Judah is ready.

⚠️ David fears Sheba more than Absalom

🏰 Absalom had an army and a plan

🏃 Sheba has almost nothing to lose

📖 A loose rebel is hard to catch

## 🗡️ Take Thou Thy Lord's Servants

David does not send Amasa to chase Sheba down.

He instead sends Abishai, using the phrase thy lord's servants for Joab's own men.

This choice quietly reveals David does not fully trust Amasa yet.

Command has shifted back toward Joab's side of the family without saying so directly.

🗡️ David bypasses Amasa entirely

🤐 Trust in Amasa is already thin

🔄 Command shifts back to Joab's side

📖 Power moves without a public word

## 🏯 Lest He Get Him Fenced Cities, And Escape Us

"Fenced cities" were towns built with strong walls for defense.

If Sheba reaches one, a long siege could drag on for months.

David wants Sheba caught in the open, before he can hide behind stone walls.

Speed matters more here than following the normal chain of command.

🏯 Fenced cities means walled towns

⏱️ A siege could drag on for months

🏃 David wants Sheba caught in the open

📖 Speed mattered more than protocol here

## 📯 Joab's Men, And The Cherethites, And The Pelethites, And All The Mighty Men

The Cherethites and Pelethites were foreign soldiers who served as David's personal bodyguard.

The mighty men were an elite group of David's most skilled warriors.

Together they formed the core of David's real military power in Jerusalem.

Notice this force marches out under Joab's men, not officially under Amasa.

📯 Cherethites and Pelethites were bodyguards

🛡️ Mighty men were elite warriors

👑 Together they held real military power

📖 Joab controls the army in practice

## 🚶 They Went Out Of Jerusalem, To Pursue After Sheba

The pursuit begins immediately, straight from the capital city.

There is no delay this time, unlike Amasa's slow gathering of Judah.

Jerusalem empties of its best soldiers within days of the city's return to peace.

The kingdom barely has time to catch its breath before chasing the next threat.

🚶 The pursuit starts immediately

🐢 Amasa had been much slower

🏙️ Jerusalem sends out its best troops

📖 One crisis follows right after another

# SecondSamuel 20:8-10
# 🗡️ Joab Murders Amasa
---
## 🪨 When They Were At The Great Stone Which Is In Gibeon

Gibeon was a city a few miles northwest of Jerusalem.

A large, well known stone there apparently served as a landmark or meeting point.

Amasa finally catches up with Joab's forces at this exact spot.

This ordinary landmark becomes the site of an extraordinary betrayal.

🪨 Gibeon sat near Jerusalem

📍 A famous stone marked this spot

🐴 Amasa finally catches up here

📖 An ordinary place hides a betrayal

## 🎭 As He Went Forth It Fell Out

Joab wore a soldier's coat with a sword belted at his side.

The text says the sword slipped loose as Joab stepped forward to greet Amasa.

Whether this was an accident or planned, it put a weapon back in Joab's free hand.

That small detail explains how Joab was armed without Amasa noticing anything wrong.

🗡️ Joab wore a belted sword

🎭 The sword conveniently slipped loose

🤔 Accident or setup, the text does not say

📖 Now Joab held a free weapon

## 🙏 Art Thou In Health, My Brother?

This greeting sounds warm and completely normal between soldiers.

Joab even reaches out to kiss Amasa, a common greeting between men in this culture.

The friendly words and gesture are only meant to lower Amasa's guard.

Kindness here is being used as a weapon, not as real affection.

🙏 The greeting sounds warm and normal

💋 A kiss was a common greeting

🎭 Friendly words hide a real threat

📖 Kindness becomes Joab's weapon

## 👁️ Amasa Took No Heed To The Sword That Was In Joab's Hand

"Took no heed" means Amasa simply did not notice the danger.

He is focused on the kiss and the friendly greeting, not on Joab's other hand.

That one moment of distraction costs Amasa his life.

Attention, not strength, decided who survived this meeting.

👁️ Took no heed means did not notice

🎭 Amasa is distracted by the greeting

💀 One distracted moment costs his life

📖 Attention decided who survived here

## 🩸 Smote Him Therewith In The Fifth Rib, And Shed Out His Bowels

Joab strikes Amasa once in the stomach with a hidden blade.

Shed out his bowels is blunt, graphic language for a fatal wound.

Joab used this exact method to kill Abner years earlier, in chapter three.

This is not a new tactic.

Joab is repeating a move that worked for him before.

🩸 One strike killed Amasa instantly

🗡️ Joab used a hidden blade

🔁 Joab killed Abner the same way

📖 This betrayal was not Joab's first

## ⚰️ Struck Him Not Again, And He Died

One blow was enough.

Joab never needed to strike Amasa again.

That single fatal strike ends the life of David's newly appointed commander.

Joab and Abishai then continue on, chasing after Sheba without pause.

The murder barely slows down the mission it happened in the middle of.

⚰️ One blow ended Amasa's life

🎖️ David's new commander is dead

🏃 Joab and Abishai resume the chase

📖 The mission barely pauses for murder

# SecondSamuel 20:11-13
# 🧹 The Army Follows Joab Again
---
## 📣 He That Favoureth Joab, And He That Is For David, Let Him Go After Joab

One of Joab's own men stands over the body and shouts this line to the army.

It quietly equates loyalty to Joab with loyalty to David himself.

No soldier has time to question that logic in the middle of a chase.

Within moments, command has been reclaimed without any real vote or debate.

📣 A soldier shouts this line loudly

🤝 Loyalty to Joab equals loyalty to David

🏃 No one stops to question it

📖 Command is reclaimed without a vote

## 🩸 Amasa Wallowed In Blood In The Midst Of The Highway

"Wallowed" pictures a body lying in a spreading pool of blood.

Amasa's corpse blocks the main road that Joab's whole army must travel.

Soldiers marching past keep stopping to stare at their fallen commander.

A dead body in the road can stall an entire military campaign.

🩸 Wallowed means lying in spreading blood

🛣️ Amasa's body blocks the main road

👀 Soldiers keep stopping to stare

📖 One corpse can stall an army

## 🧹 Removed Amasa Out Of The Highway Into The Field

An unnamed soldier takes the initiative to clear the road himself.

He drags Amasa's body off the highway and lays it in a nearby field.

Nobody ordered this.

He acts on his own to keep the army moving.

Small, practical decisions like this kept ancient campaigns from grinding to a halt.

🧹 A soldier clears the road himself

🛤️ Amasa's body is moved to a field

🤷 Nobody ordered this action

📖 Small decisions kept campaigns moving

## 🧣 Cast A Cloth Upon Him

Covering a body with cloth was a simple act of basic decency.

It also hides the grim sight from soldiers still marching past.

A covered body draws far less attention than an exposed one.

The goal is speed.

Getting the army's focus back on the road mattered more than mourning here.

🧣 Covering a body showed basic decency

🙈 A cloth hides the grim sight

👀 A covered body draws less attention

📖 Speed mattered more than mourning here

## 🏃 All The People Went On After Joab

Once the road is clear, the whole army resumes the chase at once.

The delay caused by Amasa's death lasts only a matter of minutes.

Joab has fully regained command of David's entire military force.

One brutal act just reshaped the chain of command for the rest of the campaign.

🏃 The whole army resumes the chase

⏱️ The delay lasted only minutes

🎖️ Joab now commands the full army

📖 One act reshaped command for good

## 🛣️ To Pursue After Sheba The Son Of Bichri

The chase for Sheba never actually stopped.

It only paused for a few minutes.

Every soldier now understands exactly who leads them again.

The target has not changed, only the man giving the orders has.

Order is restored to the army faster than anyone might expect.

🛣️ The chase never really stopped

⏸️ It only paused briefly

🎯 The target Sheba stays the same

📖 Order returns faster than expected

# SecondSamuel 20:14-19
# 🏙️ The Wise Woman Of Abel
---
## 🗺️ He Went Through All The Tribes Of Israel Unto Abel, And To Bethmaachah

Sheba runs far north, deep into Israelite territory near the region of Dan.

Abel of Bethmaachah sat near the northern edge of the whole kingdom.

Fleeing this far shows Sheba hoped distance alone might save him.

Distance does not save him.

Joab's army follows him the whole way north.

🗺️ Sheba flees far to the north

📍 Abel sat near the kingdom's edge

🏃 Distance was Sheba's only real plan

📖 Joab's army follows the whole way

## 🏗️ Cast Up A Bank Against The City, And It Stood In The Trench

A bank here means a ramp of earth built up against a city wall.

Armies built these ramps so soldiers and equipment could reach the top of the wall.

The trench was likely the ditch or moat that normally protected the city.

Joab's men are settling in for a serious, prolonged siege.

🏗️ A bank was a ramp of earth

🧱 Ramps helped armies reach the wall

🕳️ The trench was the city's moat

📖 Joab is settling in for a siege

## 🔨 Battered The Wall, To Throw It Down

Ancient armies used heavy beams or tools to physically pound through walls.

This kind of attack could take the city down within days, not months.

Abel is not just being threatened.

It is actively being destroyed piece by piece.

The wise woman speaks up before her whole city is leveled.

🔨 Battering tools could break a wall

⏱️ The city could fall within days

💥 Abel is being actively destroyed

📖 Someone speaks before it is too late

## 📣 Then Cried A Wise Woman Out Of The City

A wise woman was a recognized, respected voice in an ancient Israelite town.

She is not a soldier, yet she is the one who steps forward to negotiate.

Wisdom, not weapons, is about to decide what happens to this whole city.

A similar wise woman appeared earlier in this book, in chapter fourteen.

📣 A wise woman calls out first

🧠 Wisdom carried real authority in Israel

🕊️ She steps forward to negotiate peace

📖 A similar figure appeared in chapter fourteen

## 🙏 Hear The Words Of Thine Handmaid

Handmaid is an old, humble way a woman addressed a powerful man.

She could have just given orders.

Instead she chooses careful, respectful language.

The danger facing her city is real and immediate.

That combination of humility and confidence makes her instantly persuasive.

🙏 Handmaid was a humble self title

🗣️ She chooses careful respectful language

⚠️ Her city faces real danger

📖 Humility here becomes real persuasion power

## 📜 They Shall Surely Ask Counsel At Abel, And So They Ended The Matter

She quotes an old saying that people already trusted about her city.

Abel had a reputation as the place to go for wise, peaceful solutions.

Disputes that reached Abel reportedly got settled there, without more violence.

She reminds Joab that destroying Abel would destroy that reputation forever.

📜 She quotes an old, trusted saying

🧠 Abel was known for wise solutions

🕊️ Disputes ended there without violence

📖 Destroying Abel destroys its reputation

## 🏙️ Thou Seekest To Destroy A City And A Mother In Israel

Calling Abel a mother is not random language.

Ancient Israel sometimes used mother city for a leading town that smaller towns depended on.

She is saying Joab is not attacking one small target.

He is attacking something the whole region depends on.

🏙️ Mother city meant a leading town

🏘️ Smaller towns depended on it

🎯 Joab is not attacking one target

📖 A whole region is at risk here

## 🕊️ Why Wilt Thou Swallow Up The Inheritance Of The LORD

The land of Israel was not just political territory to its people.

It was understood as belonging to God himself, given to Israel to steward.

Swallowing up part of that inheritance was not simply a military act.

In her eyes, Joab would be stealing from God, not only from Israel.

🕊️ The land belonged to God

📜 Israel was meant to steward it

⚔️ Destroying Abel was more than politics

📖 She frames this as stealing from God

## 🚶 Come Near Hither, That I May Speak With Thee

She does not shout her demands from a distance.

She calls Joab close enough for a real, face to face conversation.

That request alone shows she believes calm words can still work.

Not every conflict has to end in violence if someone is willing to talk first.

🚶 She calls Joab in close

🗣️ A real conversation might still work

🕊️ Calm words could prevent more violence

📖 Someone has to be willing to talk

# SecondSamuel 20:20-22
# ☮️ Sheba's Head Ends The Siege
---
## 🙅 Far Be It, Far Be It From Me, That I Should Swallow Up Or Destroy

Repeating far be it twice is a strong way of denying an accusation in Hebrew.

Joab is answering her fear directly, insisting he never wanted to destroy her city.

This kind of doubled denial shows up elsewhere in the Old Testament for real emphasis.

Joab's actual target has always been one single man, not the whole town.

🙅 Repeating a denial adds real force

🗣️ Joab answers her fear directly

🎯 His real target is one man

📖 The city was never his goal

## ⛰️ A Man Of Mount Ephraim, Sheba The Son Of Bichri By Name

Sheba was introduced earlier in this chapter as a Benjamite, not an Ephraimite.

This likely means Sheba was living or operating out of the hill country of Ephraim.

Tribal identity and the region someone lived in were not always the same thing.

Joab makes sure the woman knows exactly who he is really after.

⛰️ Mount Ephraim was his current base

👤 Sheba was actually a Benjamite

🗺️ Tribe and home region could differ

📖 Joab names his exact target

## ☝️ Deliver Him Only, And I Will Depart From The City

Joab offers a clear, simple trade to end the siege peacefully.

One man's life in exchange for the safety of everyone else in Abel.

This is a real off ramp for the city, not a bluff.

The choice now belongs entirely to the people inside the walls.

☝️ Joab offers a simple trade

⚖️ One life for the whole city

🚪 A real way out is offered

📖 The choice now belongs to Abel

## 🗣️ His Head Shall Be Thrown To Thee Over The Wall

The woman answers with total confidence, not hesitation or fear.

She already knows her city will choose to hand Sheba over.

Her authority over the people inside Abel is completely secure.

One woman's word is about to end an entire military siege.

🗣️ She answers with total confidence

👑 Her authority over the city is real

🤝 She trusts the people will agree

📖 One woman's word ends a siege

## 🧠 Then The Woman Went Unto All The People In Her Wisdom

She does not simply issue an order.

She persuades the whole city together instead.

Her earlier reputation for wisdom is what makes people listen now.

Leadership here comes from trust, not from any official title or weapon.

🧠 She persuades instead of commands

🗣️ Her reputation makes people listen

🤝 Trust, not title, gives her power

📖 Real leadership does not need a weapon

## ⚔️ They Cut Off The Head Of Sheba The Son Of Bichri, And Cast It Out To Joab

Presenting an enemy's head was an ancient way of proving a rebellion was truly over.

It gave Joab undeniable proof without forcing him to search the whole city himself.

The whole town survives because one man's life is exchanged for peace.

Brutal as it is, this ending saves far more lives than it takes.

⚔️ A head proved the rebellion was over

✅ Joab gets undeniable proof quickly

🏙️ The whole town survives instead

📖 One life is traded for many

## 📯 He Blew A Trumpet, And They Retired From The City, Every Man To His Tent

This trumpet call answers the very one Sheba blew back in verse one.

That first blast started a rebellion, this one officially ends it.

Every man to his tent now means peace, not the earlier call to abandon the king.

The chapter closes the same way it opened, but the meaning has completely flipped.

📯 This trumpet closes the story

🔁 It echoes Sheba's trumpet from verse one

☮️ The same phrase now means peace

📖 The meaning of the chapter flips completely

# SecondSamuel 20:23-26
# 📜 David's Officials Listed Again
---
## 🎖️ Joab Was Over All The Host Of Israel

Joab murdered David's own newly appointed commander earlier in this very chapter.

Despite that, he ends the chapter back in full command of the army.

David needs Joab's skill and loyalty more than he wants to punish him right now.

Power in this kingdom does not always follow justice cleanly.

🎖️ Joab regains full military command

🗡️ He murdered Amasa earlier in this chapter

👑 David needs him more than he wants justice

📖 Power and justice do not always match

## 🛡️ Benaiah The Son Of Jehoiada Was Over The Cherethites And Over The Pelethites

Benaiah commanded David's personal bodyguard of foreign soldiers.

He will later play a key role helping Solomon secure the throne.

His loyalty to David's household runs deeper than loyalty to any one commander.

This short mention plants a name the reader will meet again.

🛡️ Benaiah led David's personal bodyguard

👑 He later helps Solomon take the throne

🤝 His loyalty runs deep and steady

📖 A small mention plants a bigger role

## 💰 Adoram Was Over The Tribute

Tribute here means forced labor that Israelites owed the king.

This same system of forced labor will cause real trouble generations later.

Adoram, later called Adoniram, is the very official stoned during Rehoboam's reign.

That future riot in first Kings twelve begins with the exact office named here.

💰 Tribute meant forced labor for the king

⚠️ This office causes trouble later

💀 The same official is stoned in Kings

📖 A small title becomes a future flashpoint

## ✍️ Jehoshaphat The Son Of Ahilud Was Recorder

A recorder kept official records and served as a kind of royal historian.

This role helped preserve accurate memory of the kingdom's major decisions.

The same official also appears earlier in David's officer list back in chapter eight.

Stable government needs someone tracking what actually happened, not just rumors.

✍️ Recorder means an official record keeper

📚 He preserved memory of royal decisions

🔁 The same man appears back in chapter eight

📖 Good government needs accurate records

## 📝 Sheva Was Scribe, And Zadok And Abiathar Were The Priests

A scribe handled the kingdom's writing, correspondence, and official documents.

Naming a scribe here shows how organized David's government had already become.

Zadok and Abiathar are two separate priests serving David at the same time.

Their shared position keeps two important priestly lines connected to the throne.

📝 A scribe handled royal documents

🏛️ This shows real government organization

🙏 Zadok and Abiathar served together

📖 Two priestly lines stay tied to David

## 👑 Ira Also The Jairite Was A Chief Ruler About David

Ira is a lesser known figure who only appears in this one list.

Jairite likely means he came from the family line of a man named Jair.

Some translations describe his role closer to a personal priest for David.

Even minor names in these lists once held real responsibility close to the king.

👑 Ira is rarely mentioned elsewhere

👪 Jairite points to the family of Jair

🙏 His role may have been priestly

📖 Minor names still held real responsibility
`.trim();

export const SECOND_SAMUEL_TWENTY_PERSONAL_SECTIONS = parseSecondSamuelTwentyRawNotes(SECOND_SAMUEL_TWENTY_RAW_NOTES);
