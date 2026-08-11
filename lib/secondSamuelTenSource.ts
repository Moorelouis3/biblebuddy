export type SecondSamuelTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTenRawNotes(rawText: string): SecondSamuelTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 10:${startVerse}` : `2 Samuel 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Samuel 10 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TEN_RAW_NOTES = `
# SecondSamuel 10:1-5
# ✂️ Hanun Insults David's Servants
---
## 👑 The King Of The Children Of Ammon Died

This king is Nahash, ruler of Ammon east of the Jordan River.

Ammon descended from Lot, the nephew of Abraham.

David and Nahash already shared a real history, named in the next verse.

One royal death is about to test that old friendship.

👑 The king was Nahash of Ammon

🌍 Ammon descended from Lot

🤝 David and Nahash shared history

📖 A death will test that bond

## 👑 Hanun His Son Reigned In His Stead

A new king now sits on Ammon's throne without any experience yet.

Reigned in his stead simply means Hanun took his father's place as king.

Ancient succession usually passed straight from father to son like this.

Untested rulers were often the easiest ones to manipulate with fear.

👑 Hanun replaces his father Nahash

🔄 Reigned in his stead means took over

🌱 New kings were often untested

📖 Untested rulers are easy to manipulate

## 🤝 As His Father Shewed Kindness Unto Me

This kindness likely happened while Saul hunted David as a fugitive.

Ammon and Saul were bitter enemies since the war in First Samuel eleven.

David's exile from Saul may have made him a welcome guest in Ammon.

Many scholars believe political friendship, not just personal favor, stands behind this.

David is not inventing a debt.

He is remembering a real one.

🤝 Kindness recalls history with Nahash

⚔️ Ammon and Saul were enemies

🏃 David was likely a welcome exile

📖 David remembers a real debt

## 🕊️ David Sent To Comfort Him By The Hand Of His Servants

Sending official comforters to a new king was normal diplomatic practice.

It publicly recognized the young ruler as a legitimate head of state.

By the hand of his servants means through his own chosen officials.

This was meant as an honor, not an intrusion.

🕊️ Comfort embassies were normal diplomacy

👑 It recognized Hanun as legitimate

✋ By the hand means through officials

📖 The gesture was meant as honor

## 🧔 The Princes Of The Children Of Ammon Said Unto Hanun Their Lord

Princes here means Ammon's royal advisors and nobles, not Hanun's own children.

A brand new king often leaned heavily on these older, experienced voices.

Hanun had no track record yet to judge David's intentions for himself.

Whoever controlled his ear controlled his first major decision as king.

🧔 Princes means royal advisors, not sons

👑 New kings leaned on older voices

❓ Hanun had no track record yet

📖 Whoever advised him shaped his choice

## 🔍 To Search The City, And To Spy It Out, And To Overthrow It

The princes accuse David's comforters of really being enemy spies.

David had shown no history of plotting against Ammon at all.

Fear can turn an honest gesture into a suspected attack.

This paranoid guess is about to start a war nobody needed.

🔍 Princes accuse the men of spying

🙅 David had no history of plotting

😨 Fear twisted an honest gesture

📖 A false guess starts a real war

## 🧔 Shaved Off The One Half Of Their Beards

A grown beard was a mark of dignity and full manhood in this culture.

Shaving off only half made the humiliation impossible to hide or ignore.

A full beard could not simply be covered up like torn clothing.

Every person who saw these men instantly knew they had been shamed.

🧔 A beard signaled dignity and honor

✂️ Half shaved meant humiliation on display

👀 It could not be hidden away

📖 Everyone could see the shame at once

## ✂️ Cut Off Their Garments In The Middle, Even To Their Buttocks

Hanun's men cut their robes off at the waist, exposing them completely.

Public nakedness carried deep shame in the ancient Near East.

These were royal ambassadors, not common prisoners or criminals.

Sending them home exposed made the insult impossible to hide.

✂️ Robes were cut off at the waist

😳 Public nakedness meant deep shame

👑 These were royal ambassadors, not criminals

📖 The insult traveled home with them

## 😳 The Men Were Greatly Ashamed

Shame in this culture could feel worse than physical injury.

These men could not simply walk back into Jerusalem looking like this.

Their humiliation reflected directly on David and on all of Israel.

An insult to the messenger was an insult to the king who sent him.

😳 Shame could outweigh physical injury

🚶 They could not return looking like this

👑 Their shame reflected on David himself

📖 Insulting messengers insulted the whole nation

## 🏙️ Tarry At Jericho Until Your Beards Be Grown

Jericho sat near the Jordan River, on the road back into Israel.

David lets his men wait there instead of walking home half shaved.

Beards took real weeks to grow back to a normal length.

David protects their dignity before he ever plans to answer the insult.

🏙️ Jericho sat along the road home

⏳ Beards needed real time to regrow

🛡️ David protected their dignity first

📖 Kindness came before any retaliation

# SecondSamuel 10:6-8
# ⚔️ Ammon Hires An Army
---
## 👃 They Stank Before David

To stink before someone was an old idiom for becoming truly hated.

Ammon's leaders realize their insult cannot simply be taken back.

They expect retaliation is now coming.

So they scramble to prepare for war instead of peace.

Fear now drives every decision Hanun makes.

👃 Stink before someone meant being hated

😨 Ammon cannot take back the insult

⚔️ They expect retaliation is coming

📖 Fear now drives Hanun's decisions

## 💰 Hired The Syrians Of Bethrehob, And The Syrians Of Zoba

Ammon cannot fight Israel alone, so it hires outside help.

Bethrehob and Zoba were Aramean kingdoms to the north, in modern Syria.

Zoba was already a frequent, powerful enemy named back in chapter eight.

Hired soldiers meant Ammon's own army was not enough by itself.

💰 Ammon hires outside mercenary help

🗺️ Bethrehob and Zoba sat in Syria

⚔️ Zoba already opposed Israel before

📖 Ammon's own army was not enough

## 🏔️ Of King Maacah A Thousand Men, And Of Ishtob Twelve Thousand Men

Maacah was a small Aramean kingdom near Mount Hermon.

Ishtob was the region called Tob, east of the Jordan River.

Added together, Ammon hired thirty three thousand foreign soldiers.

That was a massive force for one insult to provoke.

🏔️ Maacah sat near Mount Hermon

🗺️ Ishtob was the region called Tob

🔢 Thirty three thousand soldiers hired total

📖 One insult provoked a massive army

## 🛡️ Sent Joab, And All The Host Of The Mighty Men

The mighty men were David's elite corps of professional soldiers.

They were not part time farmers called up for a single battle.

Joab commanded this force as David's top general and his own nephew.

Sending Israel's best troops shows how seriously David takes this threat.

🛡️ Mighty men were elite professional soldiers

👨‍👦 Joab was David's own nephew

⚔️ Joab commanded Israel's top troops

📖 David sent his very best against Ammon

## 🏙️ Put The Battle In Array At The Entering In Of The Gate

The gate here belongs to Rabbah, Ammon's capital city.

Ammon's own soldiers stayed close to defend their home city walls.

Every gate was a city's most vulnerable and most guarded point.

Ammon plans to fight from a position of home field advantage.

🏙️ The gate belonged to Rabbah

🏰 Ammon's troops guarded their own city

🚪 Gates were a city's weak point

📖 Ammon fought with home advantage

## 🌾 The Syrians Were By Themselves In The Field

Two separate enemy forces now surround Joab's army at once.

Ammon's troops wait at the gate behind him.

The hired Syrian mercenaries wait out in the open field ahead.

Joab faces a two front battle before a single sword is drawn.

⚔️ Two enemy forces surrounded Joab

🏰 Ammon waited behind at the gate

🌾 Syrians waited ahead in the field

📖 Joab faced a two front battle

# SecondSamuel 10:9-14
# 🛡️ Joab And Abishai Split The Battle
---
## ⚔️ The Front Of The Battle Was Against Him Before And Behind

Joab realizes he is caught between two enemy lines at once.

One army waits ahead in the open field.

The other waits behind him near the city gate.

A trained general has to split his own force to survive this.

⚔️ Enemies surrounded Joab front and back

🌾 One army waited in the field

🏰 The other waited near the gate

📖 Joab had to split his forces

## 🥇 He Chose Of All The Choice Men Of Israel

Choice men means the strongest, most skilled soldiers in the whole army.

Joab hand picks this elite group himself instead of trusting random assignment.

He puts them against the tougher of the two enemy forces, the Syrians.

A wise general saves his best fighters for the harder fight.

🥇 Choice men meant the strongest soldiers

🫡 Joab hand picked this elite group

⚔️ He aimed them at the Syrians

📖 Best fighters faced the harder fight

## 👨‍👦 The Rest He Delivered Into The Hand Of Abishai His Brother

Abishai is Joab's own brother, also a son of Zeruiah, David's sister.

David's family supplies several of Israel's top military commanders.

Abishai takes charge of the remaining troops facing the Ammonites.

Two brothers now command two separate battle lines side by side.

👨‍👦 Abishai was Joab's own brother

👪 David's family filled top army posts

🎯 Abishai faced the Ammonite troops

📖 Two brothers led two battle lines

## 🤝 If The Syrians Be Too Strong For Me, Then Thou Shalt Help Me

Joab lays out a simple mutual aid plan before the fighting starts.

Whichever brother struggles first, the other one comes running to help.

Neither line is meant to stand completely alone in this battle.

A clear plan made under pressure often decides who survives it.

🤝 Joab plans mutual aid in advance

🏃 Whoever struggles first gets backup

🚫 Neither brother fights fully alone

📖 A clear plan under pressure matters

## 💪 Let Us Play The Men For Our People, And For The Cities Of Our God

Play the men was an old way of saying act with courage.

Joab reminds his troops exactly who and what they are fighting for.

Our people means their families waiting safely back home.

The cities of our God means towns tied to Israel's covenant with the LORD.

💪 Play the men meant act bravely

👪 Our people meant families back home

🏙️ Cities of our God meant covenant towns

📖 Joab named exactly what was at stake

## 🙏 The LORD Do That Which Seemeth Him Good

Joab fights hard, but he does not claim to control the final result.

This same phrase appears elsewhere in scripture when someone trusts God's judgment completely.

Courage and surrender to God sit side by side in this one sentence.

Joab's confidence rests on God, not only on Israel's swords.

🙏 Joab leaves the outcome to God

📜 This phrase appears elsewhere in scripture

⚖️ Courage and surrender sit together here

📖 Confidence rests on God, not swords

## 🏃 They Fled Before Him

Joab's elite unit breaks the Syrian line almost immediately.

A hired army often lacks the loyalty of soldiers defending their own home.

Mercenaries run when the fight turns costly, since no homeland is at stake.

The first half of Joab's two front problem disappears in this one verse.

🏃 The Syrians broke and fled

💰 Mercenaries lacked real loyalty

🏠 No homeland was at stake for them

📖 One front of the battle ended fast

## 😨 Then Fled They Also Before Abishai, And Entered Into The City

Ammon's own courage depended entirely on their hired Syrian allies.

The moment the Syrians ran, Ammon's own troops lost their nerve too.

They retreat behind Rabbah's walls instead of continuing the fight.

One army's collapse instantly decided the other army's next move.

😨 Ammon's courage depended on their allies

🏃 They fled once the Syrians ran

🏰 Ammon retreated behind Rabbah's walls

📖 One collapse decided the whole battle

## 🛑 So Joab Returned From The Children Of Ammon, And Came To Jerusalem

Joab does not chase the retreating army into the city.

A siege of a walled capital takes far more than one day's victory.

Joab pulls his troops back home to Jerusalem instead.

This war is far from finished, even though the first battle is won.

🛑 Joab does not press the siege

🏰 A capital city needed a real siege

🏙️ He returns his troops to Jerusalem

📖 This war is only just beginning

# SecondSamuel 10:15-19
# 🐎 David Defeats The Syrians
---
## 🔁 When The Syrians Saw That They Were Smitten, They Gathered Themselves Together

One lost battle does not end this war for the Syrians.

They regroup instead of scattering home for good.

Losing a fight and losing a war are two very different things.

Round two is already forming before Israel can even celebrate round one.

🔁 The Syrians regroup after losing

🚫 One loss did not end the war

⚔️ A second fight is forming already

📖 Israel's celebration would have to wait

## 👑 Hadarezer Sent, And Brought Out The Syrians That Were Beyond The River

Hadarezer already appeared in chapter eight as a powerful Syrian king.

Beyond the river means the Euphrates, far to the northeast of Israel.

Hadarezer calls in reinforcements from deep inside his own kingdom.

This is now a much bigger conflict than one border skirmish.

👑 Hadarezer already appeared in chapter eight

🌊 Beyond the river meant the Euphrates

📯 He called in fresh reinforcements

📖 This grew into a much bigger war

## 🎖️ Shobach The Captain Of The Host Of Hadarezer Went Before Them

Shobach commands this new, larger Syrian army as its top general.

Naming a specific commander shows how organized and serious this force was.

Hadarezer is no longer treating this as a minor border dispute.

A named leader always raises the stakes of an ancient battle account.

🎖️ Shobach commanded the new army

📛 A named leader signals real seriousness

⚔️ Hadarezer treated this war as major

📖 The stakes rise with a real name

## 👑 David Gathered All Israel Together

Joab led the first battle, but David leads this one himself.

Gathering all Israel means a full national army, not just a standing unit.

The king personally steps in when the threat grows large enough.

David is treating Hadarezer's new army as a direct threat to the whole nation.

👑 David personally leads this time

🇮🇱 All Israel means the full army

⚠️ The threat had grown large enough

📖 David saw this as a national danger

## 🌊 Passed Over Jordan, And Came To Helam

Crossing the Jordan River meant leaving Israel's own territory behind.

Helam sat somewhere east, likely near the region controlled by Hadarezer.

Israel is now fighting this war on enemy ground, not its own.

David chooses to meet this threat far from home instead of waiting for it.

🌊 Crossing Jordan left home territory

🗺️ Helam sat east, near enemy land

⚔️ Israel fought this war away from home

📖 David met the threat before it arrived

## 🏃 The Syrians Fled Before Israel

David's larger, personally led army breaks this second Syrian force too.

Two separate Syrian armies have now failed against Israel in this one chapter.

Hadarezer's reinforcements could not reverse the outcome after all.

Fresh troops alone were never going to be enough.

🏃 The second Syrian army also fled

🔁 Two armies failed in one chapter

⚔️ Fresh troops could not change the outcome

📖 Numbers alone could not win this war

## 🐎 Slew The Men Of Seven Hundred Chariots, And Forty Thousand Horsemen

Chariots were the most feared and expensive weapon of this era.

Seven hundred chariots represented a serious, well funded military machine.

Forty thousand horsemen added even more force behind that number.

This was not a small skirmish.

It was a decisive, crushing defeat.

🐎 Chariots were the era's deadliest weapon

🔢 Seven hundred chariots were destroyed

👥 Forty thousand horsemen also fell

📖 This was a decisive, crushing defeat

## 💔 Smote Shobach The Captain Of Their Host, Who Died There

Shobach, the named commander from verse sixteen, dies in this same battle.

Losing the top general often broke an ancient army's will to keep fighting.

Israel did not just win a battle.

It removed enemy leadership completely.

⚔️ Shobach dies in this battle

💔 Losing a top leader broke morale

🏆 Israel removed the enemy's leadership

📖 This threat ends where it began

## 😨 The Syrians Feared To Help The Children Of Ammon Any More

Every king who once served Hadarezer now makes peace with Israel instead.

Ammon's hired protection has completely vanished after two crushing defeats.

One insult to David's messengers has cost Ammon its entire alliance system.

Ammon is left standing alone, exactly where its fear first began.

🤝 Hadarezer's vassal kings made peace instead

💔 Ammon's alliance system collapsed completely

😨 One insult cost Ammon everything

📖 Ammon stands alone, right where fear began
`.trim();

export const SECOND_SAMUEL_TEN_PERSONAL_SECTIONS = parseSecondSamuelTenRawNotes(SECOND_SAMUEL_TEN_RAW_NOTES);
