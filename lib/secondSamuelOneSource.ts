export type SecondSamuelOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelOneRawNotes(rawText: string): SecondSamuelOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 1:${startVerse}` : `2 Samuel 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_ONE_RAW_NOTES = `
# SecondSamuel 1:1-4
# 🏕️ Word Reaches David At Ziklag
---
## 📜 After The Death Of Saul

This chapter opens exactly where the book of First Samuel ended.

Saul died on Mount Gilboa in the final chapter of that book.

First and Second Samuel were originally one long scroll in the Hebrew Bible.

They were divided later simply because the combined text was too long for one scroll.

The story does not pause here.

It keeps moving forward from that same battlefield.

📜 First and Second Samuel were one scroll
⚔️ Saul died on Mount Gilboa
✂️ They were divided later, not rewritten
➡️ The story continues from that battlefield

---
## 🏕️ Returned From The Slaughter Of The Amalekites

This line looks back to the raid David just finished in the previous chapter.

Amalekites had burned Ziklag.

They also carried off David's wives and his men's families.

David chased them down, recovered everyone, and defeated that Amalekite raiding band.

He is only just back from that victory when this new report arrives.

Two different Amalekite storylines are now running through these opening chapters.

🔥 Amalekites had burned David's home town
👨‍👩‍👧 He recovered every captured family
⚔️ He had just won that battle
📖 Another Amalekite now enters the story

---
## 🏕️ Abode Two Days In Ziklag

Ziklag was a small town the Philistines had given David during his years among them.

He used it as a safe base.

Saul still hunted him as an enemy during this same season.

Two days of quiet rest follow a hard week of battle and rescue.

That quiet is about to end the moment this messenger arrives.

🏕️ Ziklag was David's base under the Philistines
😴 Two days of rest after battle
🚶 A messenger is about to arrive
➡️ The quiet is about to break

---
## 😔 His Clothes Rent, And Earth Upon His Head

Tearing your own clothing was a common way to show grief or shock in this culture.

Placing dirt or ashes on the head added a visible layer of mourning to the same message.

A person did not need to say a word for others to understand something terrible had happened.

His appearance alone told David the news before he ever opened his mouth.

😔 Torn clothes signaled grief or shock
🪨 Earth on the head added mourning
🤐 No words were needed yet
➡️ His look announced bad news first

---
## 🙇 Fell To The Earth, And Did Obeisance

Obeisance means bowing all the way down in respect, usually before a king.

This man was treating David as Israel's next ruler before Saul was even confirmed dead.

Soldiers and messengers used this posture toward whoever held real power at the moment.

His body language already answers a question the chapter has not asked out loud yet.

🙇 Obeisance means a deep formal bow
👑 He treats David like a king
🗣️ Actions here speak before words do
➡️ The question of who rules is already forming

---
## 🗺️ Out Of The Camp Of Israel Am I Escaped

The man claims to be a survivor fleeing the very battle that killed Saul.

Calling it an escape suggests the Israelite camp was overrun, not just defeated.

David has no way yet to check whether this stranger is telling the truth.

Everything David learns for the next several verses comes from this one unverified source.

🗺️ He claims to flee that battle
💥 Escape implies the camp was overrun
❓ David cannot verify him yet
➡️ One source shapes everything that follows

---
## 💔 Saul And Jonathan His Son Are Dead Also

This is the line that actually answers David's question, buried at the end of a longer report.

Saul's death alone would already be massive news for the whole kingdom.

Jonathan's death lands even heavier, since he was David's closest friend and covenant partner.

Their friendship was sealed back in First Samuel chapter eighteen with a personal vow.

That vow is about to shape everything David does for the rest of this chapter.

💔 Both Saul and Jonathan are dead
👑 Saul's death shakes the whole kingdom
🤝 Jonathan was David's closest friend
📖 Their covenant shapes what comes next

# SecondSamuel 1:5-10
# 🗡️ The Amalekite's Story
---
## ❓ How Knowest Thou That Saul And Jonathan His Son Be Dead

David does not simply accept the report and start mourning right away.

He presses the messenger for exactly how he knows something this serious.

A king cannot afford to act on a rumor when the throne itself is at stake.

This question sets up the detailed account that fills the rest of the section.

❓ David demands proof, not rumor
👑 The throne is what is at stake
🗣️ His question forces a fuller account
➡️ That account fills the rest of the section

---
## 🏔️ As I Happened By Chance Upon Mount Gilboa

Mount Gilboa is the same battlefield named in the closing chapter of First Samuel.

The young man claims he simply stumbled onto the scene, not that he took part in the fight.

That detail matters, since a man who only arrived late has less reason to be trusted completely.

His story is about to grow far more specific than a chance encounter would explain.

🏔️ Gilboa matches the battle from 1 Samuel 31
🎲 He claims he only stumbled in
❓ A late arrival should know less
➡️ His story is about to grow oddly detailed

---
## 🗡️ Saul Leaned Upon His Spear

This detail does not match the death of Saul recorded in the previous chapter.

There, Saul falls on his own sword after his armor bearer refuses to kill him.

Here, the young man describes Saul alive and upright, leaning on a spear.

Readers are meant to notice the gap between these two accounts, not smooth it over.

⚔️ Chapter 31 has him fall on his sword
🗡️ This account has Saul alive on a spear
🚩 The two stories do not match
➡️ Readers are meant to catch the gap

---
## 🐎 I Am An Amalekite

Amalekites were a longstanding enemy nation, tied all the way back to Israel's exodus from Egypt.

David had just fought and defeated an Amalekite raiding party in the chapter before this one.

An Amalekite standing in David's own camp, claiming credit for killing Saul, is a loaded detail.

His nationality alone should make David cautious about trusting anything he says next.

🐎 Amalekites were a longtime enemy nation
⚔️ David had just fought Amalekites in chapter 30
🚩 His nationality is a warning sign
➡️ David should be cautious of his claim

---
## 🙏 For Anguish Is Come Upon Me

Anguish here means severe physical pain, not simply sadness or fear.

The young man claims Saul was badly wounded but still alive and suffering.

He presents his story as a mercy killing done at a dying king's own request.

Whether or not this ever happened, it is exactly the story most likely to win David's favor.

🙏 Anguish means severe physical pain
🗡️ He claims Saul asked to die
🎭 It is framed as mercy, not murder
➡️ It is also the safest story to tell

---
## 💨 My Life Is Yet Whole In Me

This phrase means Saul was still fully alive when he supposedly spoke these words.

It directly conflicts with First Samuel's account.

There, Saul is already fatally wounded by archers before he falls on his sword.

The young man's version keeps Saul conscious and capable of asking someone else to finish the job.

Small details like this keep building a story that quietly contradicts what readers already know happened.

💨 Whole in me means fully alive
🏹 1 Samuel has Saul already dying from arrows
🧩 The details keep not lining up
➡️ Readers already know a different version

---
## 👑 The Crown That Was Upon His Head, And The Bracelet

A crown and a royal bracelet were brought back together.

Both served as physical proof of a king's identity and rank.

Bringing these two items back served as evidence that the man was telling the truth.

It also served as a formal transfer of kingship symbols straight into David's hands.

Whether or not the story behind them was true, the objects themselves were very real.

👑 The crown proved royal identity
💍 The bracelet marked rank as well
📦 Both were meant as evidence
➡️ They also transfer kingship symbols to David

---
## 🎁 Brought Them Hither Unto My Lord

Calling David "my lord" already treats him as the new ruling authority.

The young man is not just reporting news, he is presenting a gift meant to earn favor.

Kings in this era often rewarded whoever delivered word of a rival's downfall.

He has every reason to expect thanks, a title, or a place in David's court.

🎁 The items are framed as a gift
👑 Calling David lord assumes his new rule
💰 Messengers expected reward for such news
➡️ He is expecting a reward, not judgment

# SecondSamuel 1:11-13
# 😢 David Mourns For Saul
---
## 👕 Took Hold On His Clothes, And Rent Them

David responds to this news with the same mourning gesture the earlier messenger used.

Tearing his own royal clothing was a costly, public act, not a private feeling kept quiet.

Nothing about David's reaction here looks like a man celebrating his rival's death.

His grief looks completely genuine, whatever the truth of the young man's story turns out to be.

👕 Torn clothes signaled real public grief
💰 Tearing royal cloth was a costly act
😢 David shows no hidden celebration
➡️ His grief reads as genuine

---
## 👥 Likewise All The Men That Were With Him

David's entire company joins him in this same act of mourning.

This was not one man's private sorrow but a shared response across David's whole camp.

Their loyalty to David extends naturally into sharing whatever David himself is feeling.

A king's grief, in this culture, quickly becomes his people's grief as well.

👥 David's whole camp mourns with him
🔗 Their loyalty mirrors David's own reaction
🏕️ Grief spreads across the entire company
➡️ A king's sorrow becomes his people's sorrow

---
## 🍽️ Mourned, And Wept, And Fasted Until Even

Three separate actions are named here, not one vague feeling.

Mourning describes the outward rituals of grief.

Weeping means the physical tears themselves.

Fasting means going without food at all.

All three continue until evening, marking out a full and deliberate day of grief.

This was not a quick moment of sadness but a whole day set apart for it.

🍽️ Fasting meant going without food
😭 Weeping added physical, visible tears
🕯️ Even means until evening arrived
➡️ A full day was set apart for grief

---
## 🤝 For Saul, And For Jonathan His Son

David mourns Saul by name, despite years of Saul hunting him as an enemy.

He does not treat Saul's death as justice finally arriving or a threat removed.

Jonathan is named beside his father, honoring the friendship that outlasted Saul's jealousy.

David's grief covers both a former enemy and his closest friend in the very same breath.

🤝 Saul hunted David for years
👑 David still mourns him by name
💛 Jonathan is honored right beside him
📖 Grief covers enemy and friend together

---
## 🇮🇱 For The People Of The LORD, And For The House Of Israel

David's mourning widens out from two individual men to the entire nation.

Losing a king and his heir in battle threatened the stability of the whole kingdom.

Calling Israel "the people of the LORD" ties this national loss back to God's covenant with them.

This is not only personal grief, it is grief over what the whole nation just lost.

🇮🇱 Grief widens from two men to a nation
👑 A king's death threatened national stability
✝️ The phrase ties Israel back to God's covenant
➡️ This is national loss, not only personal loss

---
## ❓ Whence Art Thou

David already asked where the man came from back in verse three.

This second question about his origin signals David is no longer just gathering information.

Asking again, this time in front of witnesses, starts building toward a formal judgment.

The tone of David's questions has shifted from curiosity to something closer to interrogation.

❓ David already asked this once before
🔁 Asking again signals a shift in purpose
⚖️ It starts building toward a judgment
➡️ Curiosity has turned into interrogation

---
## 🐎 The Son Of A Stranger, An Amalekite

This answer confirms the man is not an Israelite by birth.

"Stranger" here marks him as a foreigner living among Israel's enemies.

It sets him apart from God's own covenant people.

Confirming his nationality out loud, in front of witnesses, matters for what David does next.

Under Israel's law, harming God's anointed king carried a weight this man was about to learn firsthand.

🐎 He is confirmed as a foreigner
🚫 Stranger marks him as outside Israel
⚖️ His nationality matters for what follows
➡️ He is about to learn it firsthand

# SecondSamuel 1:14-16
# ⚔️ The Amalekite Is Executed
---
## 🛑 Destroy The LORD's Anointed

Anointed means set apart for God's service by having oil poured over the head.

Saul was anointed king by Samuel all the way back in First Samuel chapter ten.

Even after Saul turned against David, David refused to raise a hand against him for that exact reason.

Claiming to have killed Saul meant claiming to have struck someone God himself had set apart.

🛑 Anointed means set apart with oil
👑 Samuel anointed Saul back in chapter 10
🚫 David never struck Saul himself
📖 Claiming that killing is claiming a grave act

---
## 😠 How Wast Thou Not Afraid

David's question is not really asking for an explanation.

It is exposing how reckless the young man's own story makes him look.

If his account is true, he openly admits to killing a king with his own hands.

David treats the confession itself as damning, whether or not any of it actually happened.

😠 The question exposes his own story
🗣️ He openly admitted killing a king
⚖️ David treats the confession as damning
➡️ His own words become the evidence

---
## ⚔️ Go Near, And Fall Upon Him

David does not carry out the execution with his own hands.

He orders one of his own young men to strike the fatal blow instead.

This mirrors how David has avoided personally harming Saul throughout his entire story.

Justice is carried out immediately, in front of everyone who just heard the confession.

⚔️ David orders another man to strike
🚫 He again avoids harming Saul himself
⚡ Judgment happens immediately, not later
➡️ It happens in front of every witness

---
## 🩸 Thy Blood Be Upon Thy Head

This phrase is a set expression meaning the man's death is his own fault, not David's.

The same idiom shows up elsewhere in the Old Testament to place blame squarely on one person.

David is making clear this execution is justice, not personal anger or revenge.

The responsibility for what happens next rests entirely on the words the man chose to say.

🩸 The phrase means self caused guilt
📖 The same idiom appears elsewhere in scripture
⚖️ David frames this as justice, not revenge
➡️ His own words carry the blame

---
## 🗣️ Thy Mouth Hath Testified Against Thee

David explains exactly why this man is being executed.

His own spoken words, not any outside witness, become the evidence used against him.

Whether the young man actually killed Saul or only claimed to, the claim itself was fatal.

Boasting about striking down God's anointed king was never going to end well in David's camp.

🗣️ His own words become the evidence
❓ Truth or lie, the claim was fatal
🚫 Boasting about that act was dangerous
📖 It closes the case David just opened

# SecondSamuel 1:17-20
# 🎼 The Song Of The Bow
---
## 🎼 Lamented With This Lamentation

A lamentation is a formal poem of mourning, written to be spoken or sung aloud.

This is not a spontaneous outburst of grief but a carefully composed piece of writing.

David, already known for his skill with music and poetry, composes this one himself.

The next several verses are that poem, quoted directly in the text.

🎼 Lamentation means a formal mourning poem
✍️ It was composed, not spontaneous
🎵 David was already known for music
➡️ The poem itself follows next

---
## 🏹 The Use Of The Bow

This phrase is widely understood as the title of the poem, not an archery lesson.

Song titles in the ancient world were sometimes drawn from a striking image inside the poem itself.

Jonathan's own bow appears later in the lament, tying the title directly to its content.

Teaching this song to Judah meant teaching them to remember this moment, not to shoot arrows.

🏹 It is likely the poem's title
🎯 Titles often echoed an image inside the poem
📌 Jonathan's bow appears later in the text
📖 Teaching it meant remembering, not archery

---
## 📜 The Book Of Jasher

The Book of Jasher is mentioned only a couple of times in the entire Bible.

It was likely a now lost collection of songs and records about Israel's early history.

This verse points to it as an outside source, the way a modern writer might cite another book.

Its existence reminds readers that scripture itself sometimes references other writings we no longer have.

📜 Jasher is named only rarely in scripture
❓ The book itself has since been lost
✍️ It is cited here as an outside source
➡️ Not every ancient writing survived to today

---
## 👑 The Beauty Of Israel Is Slain Upon Thy High Places

"The beauty of Israel" is a poetic title for Saul, and likely for Jonathan as well.

It presents them as the nation's glory and pride, not just its rulers.

"High places" points back to the elevated battlefield on Mount Gilboa where they died.

The line opens the poem by naming exactly what Israel just lost.

👑 Beauty of Israel names Saul and Jonathan
🏔️ High places points to Gilboa's terrain
💔 It names the nation's loss up front
📖 It sets the tone for the whole poem

---
## 🔁 How Are The Mighty Fallen

This exact line repeats three times across the poem, working as a refrain.

A refrain in ancient poetry marks the emotional center readers are meant to keep returning to.

"Mighty" refers to Saul, Jonathan, and the warriors who died alongside them.

Every time this line returns, it forces the same shock to land all over again.

🔁 This line repeats three times total
🎵 Refrains mark a poem's emotional center
⚔️ Mighty refers to the fallen warriors
➡️ Each repeat forces the shock to land again

---
## 🏙️ Tell It Not In Gath

Gath was one of the five major Philistine cities, home to Goliath in an earlier chapter.

David is asking that this news be kept from Israel's enemies as long as possible.

Letting rival nations celebrate Israel's defeat would only deepen the nation's shame.

The request shows David guarding his people's dignity even in the middle of deep personal grief.

🏙️ Gath was a major Philistine city
🛡️ David wants the news kept from enemies
😔 Enemy celebration would deepen Israel's shame
➡️ He guards his people even in grief

---
## 🎉 Lest The Daughters Of The Philistines Rejoice

Philistine women were known for celebrating military victories with public songs and dancing.

Israel's own women had done exactly this after David defeated Goliath, back in First Samuel eighteen.

David does not want that same celebration turned around and aimed at Israel now.

The image paints a vivid picture of exactly what humiliation would look like if this news spread.

🎉 Philistine women celebrated victories publicly
🎵 Israel's women once did the same for David
🔄 David fears that scene reversed on Israel
➡️ The image makes the humiliation vivid

# SecondSamuel 1:21-23
# 🏔️ Cursed Ground, Honored Warriors
---
## 🌧️ Let There Be No Dew, Neither Rain, Upon You

David speaks directly to Mount Gilboa itself, as if the land could hear him.

This is a poetic curse, asking the very ground to go dry and lifeless.

Blaming the land was a common way ancient poetry expressed grief too large for ordinary words.

The curse marks Gilboa forever as the place where Israel's king and his sons fell.

🌧️ David addresses the mountain directly
🏜️ It is a poetic curse of dryness
😢 Grief this size overflowed into poetry
📖 It marks Gilboa as the place of loss

---
## 🌾 Fields Of Offerings

This phrase likely refers to fields whose grain would normally be brought as an offering to God.

David's curse asks that even these fields stop producing anything at all.

Cursing land tied to worship makes the request even more severe than an ordinary curse.

Nothing about this mountain, in David's poem, is allowed to feel ordinary again.

🌾 The fields once supplied grain offerings
🚫 David curses them into total barrenness
✝️ Cursing worship related land raises the weight
➡️ Nothing on Gilboa stays ordinary in this poem

---
## 🛡️ The Shield Of The Mighty Is Vilely Cast Away

Warriors in this era rubbed their leather shields with oil to keep them strong and usable.

"Vilely cast away" describes a shield abandoned in disgrace, left to rot in the open.

A discarded shield was a visible symbol of defeat on an ancient battlefield.

This image captures the whole army's collapse in a single discarded piece of equipment.

🛡️ Shields were oiled to stay strong
😔 This one lies abandoned in disgrace
⚔️ A dropped shield symbolized defeat
➡️ One object captures the army's whole collapse

---
## 🫗 As Though He Had Not Been Anointed With Oil

This line carries a double meaning built around the same word, oil.

On one level, it describes Saul's actual shield, left uncared for and unoiled on the field.

On another level, it recalls Saul's real anointing as king, poured out with oil by Samuel.

The poem lets an ordinary battlefield detail echo the sacred moment that made Saul king in the first place.

🫗 Oil appears twice with two meanings
🛡️ One meaning is a neglected shield
👑 The other recalls Saul's anointing as king
📖 The poem ties battlefield loss to sacred history

---
## 🏹 The Bow Of Jonathan Turned Not Back

This line praises Jonathan specifically as a skilled and fearless archer.

"Turned not back" means his bow never failed to strike its target, even under pressure.

Jonathan's courage in battle was already shown earlier in First Samuel, in his raid on a Philistine garrison.

The poem honors his skill in the very same breath that mourns his death.

🏹 Jonathan is praised as a skilled archer
🎯 His bow never failed under pressure
⚔️ His courage was shown earlier in 1 Samuel
➡️ Skill and grief are honored together

---
## 🗡️ The Sword Of Saul Returned Not Empty

This line gives Saul the same kind of praise just given to Jonathan.

It means Saul's sword struck true in battle, right up until the very end.

Whatever David's history with Saul, this poem refuses to remember him only as a failure.

Honoring an enemy's courage after his death was considered honorable in this culture, not weakness.

🗡️ Saul is praised the same way as Jonathan
⚔️ His sword struck true until the end
🙇 David refuses to remember only failure
📖 Honoring a fallen rival was seen as honorable

---
## 🦅 Swifter Than Eagles, Stronger Than Lions

Comparing warriors to eagles and lions was a common form of praise in ancient poetry.

Eagles represented speed.

Lions represented raw strength and courage.

Applying both images to Saul and Jonathan together elevates them above ordinary soldiers.

The poem is building them into legendary figures worth remembering for generations.

🦅 Eagles were a common image for speed
🦁 Lions represented strength and courage
👑 Both images elevate Saul and Jonathan together
➡️ The poem is building lasting legends

# SecondSamuel 1:24-27
# 💔 How Are The Mighty Fallen
---
## 👗 Ye Daughters Of Israel, Weep Over Saul

David now turns his address from the mountain itself to the women of Israel.

Calling out to the daughters of Israel directly widens the mourning across the whole nation.

Women, as noted earlier, were often the ones who led public songs of celebration or grief in this culture.

David is asking them to turn that same public voice toward mourning instead.

👗 David now addresses Israel's women
🇮🇱 It widens mourning across the nation
🎵 Women often led public songs
➡️ He asks that voice to turn to grief

---
## 💰 Clothed You In Scarlet

Scarlet dye was expensive and difficult to produce in the ancient world.

Wearing it marked wealth and status that most ordinary people could never afford on their own.

Crediting Saul with this luxury reminds Israel that his reign brought real prosperity, not only conflict.

The poem asks the people to remember the good years alongside the loss.

💰 Scarlet dye was costly to produce
👑 Wearing it marked wealth and status
📈 It credits Saul with real prosperity
➡️ The poem asks Israel to remember both

---
## 🔁 How Are The Mighty Fallen In The Midst Of The Battle

This is the poem's central refrain returning for a second time.

Adding "in the midst of the battle" grounds the grief back in the actual moment of death.

The repetition is deliberate, not careless, pulling the listener back to the same devastating line.

Each return of this phrase carries more weight than the last, since so much has been said between them.

🔁 The refrain returns a second time
⚔️ This version names the battle itself
🎵 Repetition here is deliberate, not careless
➡️ Each return carries more weight than before

---
## 😢 I Am Distressed For Thee, My Brother Jonathan

The poem shifts here from talking about Saul and Jonathan to speaking directly to Jonathan.

Calling him "my brother" reflects the covenant friendship they formed back in First Samuel eighteen, not a blood relation.

This is the most personal moment in the entire lament, David's own private grief breaking through.

Everything said before this line was public poetry, this line is a friend speaking to a friend.

😢 David now speaks directly to Jonathan
🤝 Brother reflects covenant friendship, not blood
💔 It is the poem's most personal line
➡️ Public poetry gives way to private grief

---
## 💛 Passing The Love Of Women

This line describes the depth of covenant loyalty between David and Jonathan, not a romantic relationship.

Covenant friendship in this culture could carry a level of loyalty rarely matched elsewhere, even inside a marriage.

Jonathan had already given up his own claim to the throne to support David becoming king.

The poem measures their bond by comparing it to the strongest kind of love the culture knew.

💛 This describes covenant loyalty, not romance
🤝 Jonathan gave up his claim to the throne
👑 Their bond outmatched even marriage loyalty
📖 The poem measures it against love itself

---
## 🗡️ The Weapons Of War Perished

The refrain returns one final time, now widened beyond just Saul and Jonathan.

"Weapons of war" stands in for the whole military strength Israel lost that day.

The poem closes not with comfort but with the full weight of the loss left standing.

David's lament ends here, but the story of who will lead Israel next is only beginning.

🗡️ The refrain returns a final time
⚔️ Weapons of war means Israel's whole strength
😔 The poem closes on loss, not comfort
➡️ Who leads Israel next is still open
`.trim();

export const SECOND_SAMUEL_ONE_PERSONAL_SECTIONS = parseSecondSamuelOneRawNotes(
  SECOND_SAMUEL_ONE_RAW_NOTES,
);
