export type FirstSamuelThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelThirtyRawNotes(rawText: string): FirstSamuelThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 30:${startVerse}` : `1 Samuel 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Samuel 30 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_THIRTY_RAW_NOTES = `# FirstSamuel 30:1-3
# 🔥 Ziklag Is Found Burned With Fire
---
## 🚶 Come To Ziklag On The Third Day

David and his men left Aphek and marched back toward Ziklag.

Achish had just sent them away from the Philistine army in the chapter before this one.

The third day marks how long that return journey took.

That timing means the raid on Ziklag happened while David was gone.

🚶 David marched home from Aphek

⏳ The third day measures the return trip

🏹 The city was raided while empty

📖 David had no chance to defend it

---
## 🏜️ The Amalekites Had Invaded The South

The Amalekites were a nomadic raiding people east and south of Israel.

Saul had already been commanded to destroy them completely, back in chapter fifteen.

That command was not fully carried out then.

The south refers to the Negev, the dry region David had been raiding from Ziklag.

🏜️ Amalekites were nomadic raiders

📜 Saul was told to destroy them earlier

❌ That command went unfinished

📖 The south means the Negev region

---
## 🏘️ Smitten Ziklag, And Burned It With Fire

Ziklag was the Philistine town Achish had given David to live in.

David had used it as his home base for over a year.

Burning the town destroyed everything his people owned in it.

The Amalekites left nothing standing.

🏘️ Ziklag was David's home base

🔥 Amalekites burned the entire town

💔 Everything David's people owned was lost

📖 Nothing was left standing

---
## 👥 Had Taken The Women Captives, That Were Therein

The Amalekites did not kill the people living in Ziklag.

They took every woman and child alive instead.

Captives could be sold or kept as slaves and were worth more alive than dead.

This was not mercy, it was a different kind of cruelty.

👥 Every woman and child taken alive

💰 Captives held more value than bodies

⛓️ Slavery, not death, awaited them

📖 This was cruelty, not mercy

---
## 👴 They Slew Not Any, Either Great Or Small

Great or small means the Amalekites spared everyone regardless of age or status.

No one in Ziklag was killed in the raid.

That detail matters because every captured family member is still alive to be rescued.

The rest of the chapter depends on that one fact.

👴 Great or small means every age

🩹 No one in Ziklag was killed

🙌 Every captive is still alive

📖 Rescue is still possible

---
## 🏚️ It Was Burned With Fire

David and his men arrived home to smoke and ruins instead of their families.

They had no warning before seeing the destruction.

The city they expected to find safe was completely gone.

The next verses show exactly how they reacted.

🏚️ David's men found only ruins

😱 They had no warning

🏠 Their expected safety was gone

➡️ Their reaction comes next

# FirstSamuel 30:4-6
# 😢 David Encouraged Himself In The Lord
---
## 😭 Lifted Up Their Voice And Wept

"Lifted up their voice and wept" means open, public weeping, not quiet tears.

Ancient grief was expressed loudly and physically, not held in privately.

David's whole company wept together as one group.

Nothing about their pain was hidden.

😭 Open, public weeping, not quiet

📢 Ancient grief was loud, not private

👥 The whole company wept together

📖 Nothing about their pain was hidden

---
## 💧 Until They Had No More Power To Weep

"No more power to weep" means the men cried themselves into physical exhaustion.

Their grief did not fade, it simply ran out of strength.

Six hundred men reaching that state together shows how total the loss felt.

This is the emotional low point of the chapter.

💧 They wept until physically exhausted

🔋 Grief did not fade, strength did

👥 600 men reached this point together

📖 This is the chapter's low point

---
## 👰 David's Two Wives Were Taken Captives

Ahinoam the Jezreelitess and Abigail the wife of Nabal the Carmelite are named directly.

Abigail became David's wife after Nabal died, back in chapter twenty five.

David's personal loss matches everyone else's loss in his camp.

He grieves alongside his men, not from a safe distance.

👰 Ahinoam and Abigail named directly

📜 Abigail married David after Nabal's death

🤝 David's loss matches his men's loss

📖 He grieves alongside them, not apart

---
## 💔 David Was Greatly Distressed

David carries the personal grief of losing his own family.

He also carries the responsibility of leading six hundred grieving men.

Both burdens land on him at the exact same moment.

Nothing in his story so far has weighed this heavily.

💔 David grieves his own family

👑 He also leads 600 grieving men

⚖️ Both burdens hit at once

📖 Nothing has weighed on him this heavily

---
## 🪨 The People Spake Of Stoning Him

Stoning was the era's method of mob execution.

David's own men are talking about killing their own leader.

Grief has turned into blame, and David is the closest target.

His camp's loyalty has never come closer to breaking than it does here.

🪨 Stoning was mob execution by rock

😠 David's own men turn on him

🎯 Grief becomes blame aimed at David

📖 His camp's loyalty nearly breaks here

---
## 👨‍👩‍👧 Every Man For His Sons And For His Daughters

Every single man in David's camp lost family members in the raid.

That shared loss explains why the anger spreads so fast through the whole group.

No one is untouched, so no one is thinking clearly.

David has no ally left standing who is not also in pain.

👨‍👩‍👧 Every man lost family members

🔥 Shared loss spreads anger fast

🌀 No one is thinking clearly

📖 David stands with no untouched ally

---
## 🙏 David Encouraged Himself In The Lord His God

No prophet, priest, or friend is there to comfort David this time.

He turns directly to God on his own instead of waiting for someone else to help.

This is the turning point of the whole chapter.

Everything that happens next flows from this one decision.

🙏 No one else is there to help

💪 David turns to God himself

🔄 This is the chapter's turning point

📖 Everything after flows from this choice

# FirstSamuel 30:7-8
# 📿 David Enquires Of The Lord
---
## 🩸 Abiathar The Priest, Ahimelech's Son

Abiathar was the only priest who survived Saul's massacre of Nob, back in chapter twenty two.

He escaped to David and has served as his priest ever since.

Naming him as Ahimelech's son reminds the reader of that history.

His presence in David's camp is a direct result of Saul's cruelty.

🩸 Abiathar survived Saul's massacre at Nob

🤝 He has served David ever since

📜 Ahimelech's son recalls that history

📖 Saul's cruelty put him in David's camp

---
## 👕 Bring Me Hither The Ephod

The ephod was a priestly garment that held the Urim and Thummim.

Those objects were used to receive yes or no answers from God.

David used this same method back in chapter twenty three before another rescue mission.

He returns to a proven method instead of guessing at what to do.

👕 The ephod held the Urim and Thummim

❓ It gave yes or no answers

🔁 David used this method before

📖 He returns to a proven method

---
## 🙏 David Enquired At The Lord

David asks for God's direction before taking any action.

Earlier in his life, David sometimes acted first and dealt with consequences later.

Here, grief and anger do not stop him from asking permission first.

This choice shapes everything that goes right for the rest of the chapter.

🙏 David asks before acting

⏸️ Grief does not rush this choice

✅ He seeks permission, not just relief

📖 This choice shapes the whole chapter

---
## ✌️ Pursue: For Thou Shalt Surely Overtake Them, And Without Fail Recover All

God answers with two separate promises, not just one.

The first promise is that David's pursuit will succeed.

The second promise is that everything taken will be recovered completely.

David now moves forward already knowing the outcome instead of hoping for it.

✌️ Two promises are given, not one

🏃 The pursuit will succeed

📦 Everything will be recovered fully

📖 David moves forward already assured

# FirstSamuel 30:9-15
# 🥖 An Egyptian Found In The Field
---
## 🔢 The Six Hundred Men That Were With Him

Six hundred is the same total number of men who have followed David since chapter twenty seven.

That number has stayed loyal through exile, Philistine service, and now this crisis.

Not one of David's own soldiers deserted him in this chapter, despite the anger in verse six.

Their grief is real, yet their loyalty still holds.

🔢 600 is David's full standing force

🤝 They stayed loyal through years of exile

😠 Anger in verse 6 did not break it

📖 Loyalty held despite raw grief

---
## 💧 Came To The Brook Besor

A brook here means a seasonal stream, not a permanent river.

Besor marked a natural point along the pursuit route south of Ziklag.

Crossing it meant leaving familiar ground and committing fully to the chase.

The brook becomes the dividing line for what happens next.

💧 A brook is a seasonal stream

🗺️ Besor marked the pursuit route

🚶 Crossing it meant full commitment

📖 The brook becomes a dividing line

---
## 😩 Two Hundred Abode Behind, Which Were So Faint

Faint means physically exhausted, not afraid or unwilling.

These men had already marched for days before this pursuit even began.

Their bodies could not go any farther.

Their hearts still wanted to keep going.

😩 Faint means physically exhausted

🚶 Days of marching came before this

💔 Willing hearts, unable bodies

➡️ This sets up a later conflict

---
## 🌍 They Found An Egyptian In The Field

This man is a foreigner with no loyalty to either side of the conflict.

Finding him alone and abandoned in an open field was pure chance.

That chance meeting becomes the reason David's entire mission succeeds.

Help sometimes arrives through the most unlikely person available.

🌍 A foreigner with no side to take

🎲 Finding him was pure chance

🔑 He becomes the key to success

📖 Help arrived through an unlikely person

---
## 🍞 And Gave Him Bread, And He Did Eat

David's men are mid crisis, exhausted, and grieving their own families.

They still stop to feed a stranger who poses no threat to them.

That choice reflects the same compassion David showed Saul earlier in his story.

Kindness under pressure becomes the reason David gets his family back.

🍞 They fed a helpless stranger

😮‍💨 They were mid crisis themselves

🕊️ Compassion echoes David sparing Saul

📖 Kindness leads to getting his family back

---
## 🍇 A Piece Of A Cake Of Figs, And Two Clusters Of Raisins

A cake of figs was pressed, dried fruit shaped into a solid block.

Raisin clusters were dried grapes still attached to their stems.

Both were common travel food because they lasted a long time without spoiling.

These were simple foods, not a feast, yet enough to save a life.

🍇 Fig cakes were pressed dried fruit

🍒 Raisin clusters were dried grapes

🎒 Both were long lasting travel food

📖 Simple food was enough to save him

---
## ⚡ His Spirit Came Again To Him

"His spirit came again to him" means his strength and alertness returned after eating.

Before this, he had been too weak to even speak clearly.

Food and water bring him back from the edge of death.

Now he is able to answer David's questions.

⚡ His strength and alertness returned

😶 He had been too weak to speak

🩺 Food brought him back from death

📖 Now he can answer questions

---
## ⏳ Because Three Days Agone I Fell Sick

Three days matches exactly how long David's own men were away from Ziklag.

That timing detail confirms this Egyptian was part of the same raiding party.

His Amalekite master left him behind simply because he was sick.

The raid party's own cruelty toward its own servant becomes David's opportunity.

⏳ Three days matches the raid's timing

🎯 He was part of the same raid

🤒 His master left him because sick

📖 Their cruelty became David's opportunity

---
## ⛓️ Servant To An Amalekite

This man belonged to someone as property, not as a paid worker.

Slavery within Amalekite raiding bands was common in this era.

His own master abandoned him without food, water, or care.

That abandonment says more about the Amalekites than any battle could.

⛓️ He was property, not a paid worker

🏜️ Slavery was common among raiders

🚫 His master left him with nothing

📖 Abandonment reveals who the Amalekites are

---
## 🗺️ We Made An Invasion Upon The South Of The Cherethites

The Cherethites were a people closely tied to the Philistines in this region.

The Egyptian's account matches what David already found at Ziklag.

His information confirms this raid hit more than just one town.

David now knows exactly who to chase and where they likely went.

🗺️ Cherethites were tied to the Philistines

✅ His account matches Ziklag's ruins

🌍 The raid hit more than one town

📖 David now knows who and where

---
## 🤝 Swear Unto Me By God, That Thou Wilt Neither Kill Me

An oath sworn by God was considered unbreakable in this culture.

The Egyptian fears David will kill him once he is no longer useful.

He is asking for real protection, not just a spoken promise.

His fear reveals how little mercy he has known from any master so far.

🤝 An oath by God was unbreakable

😨 He fears being killed once useless

🛡️ He asks for real protection

📖 He has known little mercy so far

---
## 🧭 I Will Bring Thee Down To This Company

Once his safety is guaranteed, the Egyptian becomes fully cooperative.

He agrees to lead David straight to the Amalekite camp.

A man with no loyalty to either side ends up deciding the whole outcome.

David's mercy toward one abandoned servant unlocks the rescue of everyone else.

🧭 Safety guaranteed, cooperation follows

🤝 He agrees to lead the way

⚖️ One outsider decides the outcome

📖 Mercy to him rescues everyone else

# FirstSamuel 30:16-19
# 🎉 The Amalekite Camp Is Found
---
## 🎉 Spread Abroad Upon All The Earth, Eating And Drinking, And Dancing

The Amalekites are celebrating their raid without any guard posted.

Eating, drinking, and dancing describes a full victory party, not a watchful camp.

Their overconfidence leaves them completely unprepared for David's arrival.

The same carelessness that let them destroy Ziklag now works against them.

🎉 A victory party, not a guarded camp

🍷 Eating, drinking, and dancing describe it

😴 No guard was posted at all

📖 Their own carelessness turns against them

---
## 💰 Because Of All The Great Spoil

Spoil means everything valuable taken during a raid or war.

The Amalekites had raided more than just Ziklag on this campaign.

Their haul from multiple towns explains the scale of the celebration.

They believed they had already gotten away with everything.

💰 Spoil means everything taken in a raid

🏘️ Multiple towns had been raided

🎊 Their haul explains the celebration

📖 They believed they had already won

---
## ⏰ Smote Them From The Twilight Even Unto The Evening Of The Next Day

"Twilight even unto the evening of the next day" covers nearly a full day of fighting.

David's men do not stop once the surprise attack begins.

Thoroughness, not just surprise, is what makes this victory complete.

They finish the job instead of settling for a quick win.

⏰ Fighting lasted almost a full day

🗡️ David's men never let up

💯 Thoroughness completed the victory

📖 They finished instead of settling early

---
## 🐫 There Escaped Not A Man Of Them, Save Four Hundred Young Men, Which Rode Upon Camels, And Fled

Camels allowed a small group to outrun David's men on foot.

Four hundred escaping out of a much larger raiding force still counts as a near total defeat.

Amalekites as a people are not wiped out here, despite Saul's earlier command.

That surviving remnant shows up again later in Israel's history.

🐫 Camels let some outrun the pursuit

📉 Four hundred escaped, most did not

⚔️ Amalekites are defeated, not erased

📖 A remnant survives for later history

---
## ✅ David Recovered All That The Amalekites Had Carried Away: And David Rescued His Two Wives

Every person and possession taken from Ziklag is recovered in this one battle.

David's own wives, Ahinoam and Abigail, are rescued along with everyone else's family.

God's promise back in verse eight is now completely fulfilled.

Nothing was left to chance or partial recovery.

✅ Everyone taken is recovered

👰 Ahinoam and Abigail are rescued too

🙌 God's promise from verse 8 is kept

📖 Nothing is left partially recovered

---
## 🔁 There Was Nothing Lacking To Them, Neither Small Nor Great

"David recovered all" repeats a phrase from verse eighteen for emphasis.

Not one child, spouse, or animal is missing from the final count.

The totality of this rescue mirrors the totality of the earlier loss.

What was completely taken is now completely restored.

🔁 The phrase repeats for emphasis

👨‍👩‍👧‍👦 Not one person is missing

⚖️ Total loss meets total restoration

📖 What was taken is fully restored

# FirstSamuel 30:20-25
# ⚖️ A Statute And An Ordinance For Israel
---
## 🐑 David Took All The Flocks And The Herds, Which They Drave Before Those Other Cattle

Livestock taken from the Amalekites is treated separately from the rescued people.

Herding this many animals required driving them together as one large group.

This spoil represents pure gain, on top of everyone getting their families back.

David personally claims this portion as his own.

🐑 Livestock is treated separately from people

🐄 Herding required driving them as one group

📈 This spoil is pure gain

📖 David claims this portion himself

---
## 👋 When David Came Near To The People, He Saluted Them

David personally goes to greet the two hundred men left behind at the brook.

A salute here means a warm, respectful greeting, not a punishment.

The commander who won the battle chooses humility over pride when he returns.

That choice sets the tone for what happens next.

👋 David personally greets the 200 men

🤝 A salute meant a warm greeting

🙇 He chooses humility, not pride

➡️ That choice shapes what happens next

---
## 👎 The Wicked Men And Men Of Belial

Belial was a term for worthlessness, used here to describe men acting selfishly.

Not every man in David's army agrees with sharing the spoil equally.

These men want to punish the two hundred for staying behind.

Their attitude threatens to divide the very army that just won together.

👎 Belial means worthlessness, used for selfish men

🚫 Not everyone agrees on equal sharing

⚔️ They want to punish the 200

📖 Their attitude threatens to divide the army

---
## 🚫 We Will Not Give Them Ought Of The Spoil

These men want to withhold the recovered goods.

They are not talking about withholding the rescued families themselves.

They draw a hard line between what was earned and what was simply given back.

That line ignores how much the two hundred still contributed by guarding the camp's rear.

🚫 They want to withhold spoil, not families

📏 They draw a line on what counts

🛡️ They ignore the rear guard's contribution

📖 Their plan would divide the army

---
## 🛑 Ye Shall Not Do So, My Brethren

David immediately overrules the selfish men without hesitation.

Calling them my brethren still treats them as family, even in sharp disagreement.

Correction and love are not opposites in how David leads here.

His tone models how to disagree without breaking relationship.

🛑 David overrules them without hesitation

🤝 He still calls them brethren

❤️ Correction and love work together

📖 He models disagreement without division

---
## 🙏 With That Which The Lord Hath Given Us

David reminds everyone that the victory came from God, not from human skill alone.

If God gave the spoil, no single group of soldiers can claim sole ownership.

That reasoning removes the argument entirely instead of just settling it.

David wins the debate by changing what the debate is actually about.

🙏 David credits God with the victory

🤲 No soldier can claim sole ownership

🧠 This removes the argument, not settles it

📖 David reframes the whole debate

---
## 🎒 As His Part Is That Goeth Down To The Battle, So Shall His Part Be That Tarrieth By The Stuff

Tarrieth by the stuff means staying behind to guard the supplies and gear.

David rules that guarding duty earns the exact same share as fighting duty.

Every role in a mission matters, even the ones that never see combat.

This ruling protects the weakest and most exhausted members of David's army.

🎒 Tarrieth by the stuff means guarding gear

⚖️ Guard duty earns an equal share

🧩 Every role in the mission matters

📖 The ruling protects the exhausted men

---
## 📜 He Made It A Statute And An Ordinance For Israel Unto This Day

David's ruling here becomes permanent military law, not just a one time decision.

Unto this day tells the original reader this rule was still followed when the book was written.

One fair choice under pressure outlives the man who made it.

This is one of the earliest recorded military laws credited to David personally.

📜 The ruling becomes permanent law

📅 Unto this day means it still applied later

🏛️ One fair choice outlives its author

📖 An early law credited to David himself

# FirstSamuel 30:26-31
# 🎁 David Sends Gifts To The Elders Of Judah
---
## 🎁 Sent Of The Spoil Unto The Elders Of Judah, Even To His Friends

David shares his recovered wealth with towns that had shown him kindness during his fugitive years.

Calling them friends reveals relationships built long before David ever became king.

This gift builds goodwill across Judah, the tribe David will soon rule from.

Generosity here is also, quietly, laying groundwork for what comes next in his story.

🎁 David shares spoil with past allies

🤝 Friends means relationships built earlier

👑 Judah is the tribe David will rule

📖 Generosity quietly builds his future

---
## 🗺️ To Them Which Were In Bethel, And To Them Which Were In South Ramoth, And To Them Which Were In Jattir

These are towns scattered across the southern territory of Judah.

Most modern readers will not recognize any of these names, and that is expected.

The exact locations matter less than what the list represents as a whole.

Together, these towns map out the entire region loyal to David.

🗺️ Towns scattered across southern Judah

❓ Most names are unfamiliar today

🧩 The full list matters more than one name

📖 It maps David's loyal region

---
## 🔁 And To Them Which Were In Aroer, And To Them Which Were In Siphmoth, And To Them Which Were In Eshtemoa

This second group of towns continues the same pattern of gift giving.

Repeating the same phrase for each town emphasizes how widely David spreads his generosity.

No single town gets special treatment.

This pattern of fairness matches the equal sharing rule David just made in verse twenty five.

🔁 The list repeats the same phrase

🌍 Generosity spreads widely, not narrowly

⚖️ No town is treated as special

📖 It echoes the fairness of verse 25

---
## 🏕️ To Them Which Were In The Cities Of The Jerahmeelites, And To Them Which Were In The Cities Of The Kenites

The Jerahmeelites and Kenites were smaller clans living within Judah's territory, not full tribes.

The Kenites in particular had a long standing friendly relationship with Israel going back to Moses' father in law.

Including them shows David's generosity crossing clan lines, not just tribal ones.

David is quietly building a wide network of loyalty before he ever wears a crown.

🏕️ Smaller clans living within Judah

🤝 Kenites had ties back to Moses

🌐 Generosity crosses clan lines

📖 David builds loyalty before the crown

---
## 📍 And To Them Which Were In Hormah, And To Them Which Were In Chorashan, And To Them Which Were In Athach

Hormah was the site of Israel's earlier defeat mentioned back in Numbers chapter fourteen.

That same location now receives a gift from David instead of carrying only defeat in its history.

Chorashan and Athach are smaller towns with no other mention anywhere else in scripture.

Even towns history barely remembers still mattered enough for David to include them.

📍 Hormah recalls an old defeat in Numbers 14

🎁 The town now receives a gift instead

❓ Chorashan and Athach appear nowhere else

📖 Forgotten towns still mattered to David

---
## 🏛️ To Them Which Were In Hebron

Hebron is the most historically significant town on this entire list.

It was already tied to the burial place of Abraham, Isaac, and Jacob generations earlier.

Hebron is also the exact city where David will soon be anointed king over Judah.

The list ends on the one place that points straight to where David's story goes next.

🏛️ Hebron holds deep patriarchal history

⚰️ Abraham and Jacob were buried nearby

👑 David will be anointed king there soon

📖 The list ends pointing to his future

---
## 🚶 The Places Where David Himself And His Men Were Wont To Haunt

Haunt here simply means the places David regularly visited, not anything ghostly.

This closing line confirms every gift went somewhere David already had a personal connection.

The chapter that opened with total loss closes with David restoring relationships across an entire region.

Ziklag was destroyed, but David's influence across Judah only grows stronger by the chapter's end.

🚶 Haunt means places regularly visited

🤝 Every gift went to a real connection

📈 Loss at Ziklag becomes growth in Judah

📖 The chapter ends on restored influence
`.trim();

export const FIRST_SAMUEL_THIRTY_PERSONAL_SECTIONS = parseFirstSamuelThirtyRawNotes(
  FIRST_SAMUEL_THIRTY_RAW_NOTES,
);
