export type JoshuaNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaNineRawNotes(rawText: string): JoshuaNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 9:${startVerse}` : `Joshua 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 9 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_NINE_RAW_NOTES = `# Joshua 9:1-2
# 😨 The Kings Gather Together
---
## 🗺️ On This Side Jordan

This side of Jordan means the west bank, the land Israel already entered.

These kings live close to Israel, not far away.

Word of Jericho and Ai reached every king in the land.

Fear was already spreading before Israel took another step.

A won battle rarely stays a private victory for long.

🗺️ This side of Jordan means the west bank

😨 Every nearby king felt the threat

📰 News of Jericho and Ai spread fast

📖 A victory rarely stays private for long

## ⛰️ In The Hills, And In The Valleys

This phrase covers every kind of ground in Canaan at once.

Hills describes the high country in the center of the land.

Valleys describes the lower, flatter ground between them.

The great sea named later in the verse means the Mediterranean.

No region was too far or too different to join together.

⛰️ Hills means the high central country

🌾 Valleys means the lower ground between them

🌊 The great sea is the Mediterranean coast

📖 Every part of the land joined together

## 🏛️ The Hittite, And The Amorite

These names describe six different peoples living inside Canaan.

Each group controlled its own cities, languages, and local gods.

God had already named these same nations back in Genesis and Deuteronomy.

They were the exact peoples Israel was told to remove from the land.

Divided enemies were about to try something new.

🏛️ Six separate peoples lived inside Canaan

📜 God named these nations back in Genesis

🎯 Israel was told to remove them

📖 Divided enemies were about to unite

## 🤝 With One Accord

One accord means acting together with total, shared agreement.

These kings usually competed with each other, not stood side by side.

Two straight losses at Jericho and Ai forced a new plan.

Fear can unite even longtime rivals against a common danger.

This united army never actually fights Israel in this chapter.

🤝 One accord means total shared agreement

⚔️ These kings normally competed with each other

😨 Two defeats forced them to unite

📖 This army never actually attacks Israel

# Joshua 9:3-6
# 🎭 The Gibeonites Work Wilily
---
## 🏙️ The Inhabitants Of Gibeon

Gibeon was a major Hivite city, not a small unknown village.

It sat only a short distance from Israel's camp at Gilgal.

Joshua chapter ten later calls it as great as a royal city.

Its people chose deception over joining the coalition from verse two.

Fear pushed Gibeon toward a very different survival plan than war.

🏙️ Gibeon was a major Hivite city

📏 It sat close to Israel's camp

👑 Joshua ten calls it a royal city

📖 Gibeon chose deception instead of war

## 🎭 Did Work Wilily

Wilily is an old word that means cunningly or craftily.

The Gibeonites did not attack Israel or try to hide from them.

Instead they built an entire false story to survive.

Every detail of their plan was staged carefully in advance.

Deception, not weapons, becomes their whole strategy for survival.

🎭 Wilily means cunningly or craftily

🚫 They did not fight or hide

🛠️ They built a false story instead

📖 Deception became their whole strategy

## 👥 Made As If They Had Been Ambassadors

This does not mean they were sent by a real government.

Ambassadors were official messengers sent from one nation to another.

The Gibeonites only pretended to hold that respected role.

Israel's own law allowed peace treaties with distant nations, not nearby ones.

Playing the part of a distant nation was the whole point of the act.

👥 They only pretended to be ambassadors

📜 Real ambassadors came from distant nations

⚖️ Israel's law allowed peace with distant lands only

📖 Their disguise depended on seeming far away

## 🐴 Old Sacks Upon Their Asses

Sacks and donkeys were normal gear for anyone traveling long distances.

The Gibeonites chose old, worn out sacks instead of new ones.

A long journey would naturally wear down travel gear like this.

Every prop in their disguise was picked to support the same lie.

Nothing about their appearance was left to chance.

🐴 Asses and sacks were normal travel gear

👜 They chose old sacks on purpose

🛤️ Worn gear was meant to suggest distance

📖 Every prop supported the same lie

## 🍷 Wine Bottles, Old, And Rent, And Bound Up

Wine bottles here means wineskins made from animal hide, not glass.

A new wineskin stays smooth, soft, and fully sealed.

An old one cracks and splits and needs patching to hold wine.

Rent means torn, and bound up means patched back together.

Even the wine containers were staged to look well used.

🍷 Wine bottles were animal skin wineskins

🆕 New wineskins stayed smooth and sealed

✂️ Rent means torn, bound up means patched

📖 Even the wineskins were staged as old

## 👣 Old Shoes And Clouted Upon Their Feet

Clouted means patched with an extra scrap of material.

Real long journeys wore down sandals until they needed repair.

The Gibeonites wore shoes patched to copy that exact kind of wear.

Old, mended clothing sent the same message as the worn shoes.

Every visible detail was chosen to make distance look real.

👣 Clouted means patched with extra material

🥾 Long journeys wore down real sandals

🎭 Their shoes copied that exact wear

📖 Distance was performed down to the shoes

## 🍞 The Bread Of Their Provision Was Dry And Mouldy

Dry, moldy bread looks like proof of a very long trip.

But Gibeon sat close enough to reach Gilgal within a few days.

Fresh bread does not turn moldy that fast on a short walk.

The bread was deliberately aged, not naturally stale from travel.

The strongest piece of their evidence was also the most staged.

🍞 Moldy bread suggested a long journey

📏 Gibeon actually sat close to Gilgal

⏱️ A short trip could not age bread

📖 Their best evidence was completely staged

## 🗣️ We Be Come From A Far Country

This is the exact lie their whole disguise was built to support.

A league here means a formal peace treaty between two peoples.

Israel's law allowed exactly this kind of treaty with far off nations.

The Gibeonites needed Israel to believe this one claim above all else.

Everything in this section leads to this single sentence.

🗣️ This lie was the whole disguise's point

🤝 A league meant a formal peace treaty

📜 Only distant nations could receive this treaty

📖 One claim carried their entire plan

# Joshua 9:7-13
# 🗣️ A Story Built On Distance
---
## 🤔 Peradventure Ye Dwell Among Us

Peradventure is an old word that simply means perhaps.

The men of Israel voice real suspicion right away.

God's law forbade any treaty with nations living inside Canaan.

Their doubt was actually the correct response to what they were seeing.

Israel almost catches the lie before it even fully forms.

🤔 Peradventure is an old word for perhaps

🚫 God's law forbade treaties inside Canaan

👀 Israel's suspicion was actually correct

📖 The truth was almost caught immediately

## 🙇 We Are Thy Servants

Offering to become servants was a common way to surrender peacefully.

It placed the Gibeonites beneath Israel instead of as equals.

This language was meant to sound humble and harmless.

A submissive tone made their story easier to believe.

Humility became one more tool inside their disguise.

🙇 Servants meant a peaceful surrender

⬇️ It placed them beneath Israel socially

😇 The tone sounded humble on purpose

📖 Humility was part of the performance

## ❓ Who Are Ye? And From Whence Come Ye?

Joshua asks the two exact questions that could expose their lie.

A truthful answer here would have ended the deception instantly.

Instead the Gibeonites answer with more prepared, false detail.

Good questions still fail when the answers are already rehearsed.

Asking the right question is not the same as checking the answer.

❓ Joshua asked the exact right questions

🎯 A true answer would have exposed them

🎭 They answered with rehearsed false detail

📖 Right questions still need real verification

## 🙏 Because Of The Name Of The LORD Thy God

The Gibeonites claim they came only because of Israel's God.

This echoes Rahab's earlier confession back in Joshua chapter two.

Even a lie can repeat a true and important idea.

God's reputation had genuinely spread among the nations of Canaan.

Fear of the LORD, real or performed, was already changing the region.

🙏 They claimed to come for God's name

🪢 This echoes Rahab's confession in chapter two

🌍 God's reputation had spread through Canaan

📖 Even a lie repeated a true idea

## 📢 The Fame Of Him, And All That He Did In Egypt

Fame here means Israel's God had become widely known and feared.

All that he did in Egypt points back to the ten plagues.

News of that kind of power would keep spreading for years.

The exodus was not old history to the nations around Canaan.

What happened in Egypt was still shaping decisions decades later.

📢 Fame means widely known and feared

⚡ Egypt refers to the ten plagues

🕰️ That news kept spreading for years

📖 The exodus still shaped choices later

## 👑 The Two Kings Of The Amorites

Sihon ruled Heshbon, and Og ruled Bashan, both east of the Jordan.

Israel defeated both kings back in the book of Numbers.

These were recent victories, not distant legend to nearby nations.

Naming them shows the Gibeonites had current, accurate information.

Their lie was built on true facts, which made it far more convincing.

👑 Sihon ruled Heshbon, Og ruled Bashan

📖 Numbers records Israel's earlier defeat of both

🕰️ These victories were recent, not old legend

➡️ True facts made their false story convincing

## 👴 Our Elders And All The Inhabitants Of Our Country Spake To Us

This detail claims their whole nation authorized this exact mission.

Elders were the respected leaders who normally made major decisions.

Inventing this backstory made a few men sound like an official delegation.

A convincing lie needs supporting characters, not just one bare claim.

Every layer of their story reinforced the layer before it.

👴 Elders were the respected local leaders

🎭 This made a few men sound official

🧩 Every detail reinforced the layer before it

📖 A convincing lie needs full support

## 🍞 This Our Bread We Took Hot For Our Provision

They claim their bread was hot and fresh the day they left home.

Hot bread turning moldy fits a story of many days of travel.

But Gibeon never sat far enough away for that story to be true.

The explanation was built to match the moldy bread from verse five.

The lie now had an explanation for its own evidence.

🍞 They claimed the bread was fresh once

📅 Moldy bread fit a long travel story

📏 Gibeon was never actually that far

📖 Their lie explained its own evidence

## 🍷 Old By Reason Of The Very Long Journey

The Gibeonites even explain why their wineskins now look worn out.

New wineskins cracking over time was common, believable detail.

Every prop from verses four and five now has a matching story.

A lie this complete was built to survive close questioning.

Their whole disguise finally closes into one seamless account.

🍷 They explained the worn wineskins too

🧠 The detail was common and believable

🧩 Every prop now matched a story

📖 The disguise closed into one account

# Joshua 9:14-15
# 🤝 A League Made Without Asking God
---
## 🍽️ The Men Took Of Their Victuals

Sharing food together was a normal way to seal a peace agreement.

Eating what a group offered signaled trust and acceptance of their claims.

This small action carried far more legal weight than a modern meal.

Israel had just accepted the Gibeonites' whole story with one shared meal.

A treaty was being sealed before anyone said a formal word.

🍽️ Shared food helped seal ancient agreements

🤝 Eating signaled trust and acceptance

📜 This carried real legal weight

📖 Trust was sealed before words were spoken

## 🙏 Asked Not Counsel At The Mouth Of The LORD

Israel skips a step that had guided every major decision before this.

The mouth of the LORD points to consulting God through the priest.

Numbers chapter twenty seven describes this method using the Urim.

This is the first major choice made in Canaan without asking God first.

One skipped question opens the door to the rest of this chapter's trouble.

🙏 They skipped asking God for guidance

👨‍⚖️ The priest normally consulted God this way

📜 Numbers twenty seven describes that method

📖 One skipped step caused lasting trouble

## 🕊️ Joshua Made Peace With Them

This was not a casual or temporary arrangement between two groups.

Peace here meant a full, formal treaty with real legal force.

Once made, this kind of agreement could not simply be canceled later.

Joshua's decision here will bind Israel for generations to come.

A single choice at Gilgal outlives the men who made it.

🕊️ Peace meant a full formal treaty

⚖️ It carried real, lasting legal force

🔒 It could not simply be canceled later

📖 One choice bound generations after it

## 🙌 The Princes Of The Congregation Sware Unto Them

Swearing an oath meant calling on God's own name as a witness.

Breaking a vow made this way was treated as a sin against God.

This is why the oath still holds even after the lie is discovered.

A promise made in God's name outweighed the anger of being deceived.

The next section shows exactly how seriously Israel takes that oath.

🙌 An oath called on God as witness

⚠️ Breaking it was a sin against God

🔗 The oath holds even after deception

📖 A vow in God's name outweighed anger

# Joshua 9:16-21
# 😠 The Deception Discovered
---
## ⏱️ At The End Of Three Days

A truly far country would take much longer than three days to reach.

This short window is the first real proof their story was false.

The lie could only survive as long as no one checked nearby.

Three days was all it took for the truth to surface.

Distance, once tested, exposed exactly what their disguise had hidden.

⏱️ Three days is far too short

🔍 This exposed the story as false

🚶 The lie relied on no one checking

📖 Distance itself gave away the truth

## 🏘️ Gibeon, And Chephirah, And Beeroth, And Kirjathjearim

These four cities formed one connected Gibeonite alliance, not just one town.

This made the newly sworn treaty far bigger than Israel first realized.

An entire regional power had just secured protection through deception.

The stakes of Joshua's oath were larger than a single village's safety.

Israel had unknowingly bound itself to a whole network of cities.

🏘️ Four cities formed one Gibeonite alliance

📈 The treaty was bigger than expected

🌐 An entire regional power gained protection

📖 Israel was bound to a whole network

## 😠 All The Congregation Murmured Against The Princes

Murmured means openly complained, the same word used often in the wilderness years.

The people are furious that their own leaders were deceived so easily.

God's command to remove Canaan's nations now seems broken because of this treaty.

This anger echoes the same restless spirit Israel showed toward Moses long ago.

Old patterns of complaint resurface the moment things go wrong again.

😠 Murmured means openly complained

📜 The wilderness generation murmured the same way

⚖️ God's command now seemed broken

📖 Old complaint patterns resurfaced quickly

## 🙌 We Have Sworn Unto Them By The LORD God Of Israel

The princes refuse to break a vow even though it rests on a lie.

An oath sworn in God's name still had to be honored completely.

Being tricked into a promise did not cancel the promise itself.

This decision protects God's own reputation more than the people's comfort.

Keeping a hard promise mattered more than getting even.

🙌 An oath in God's name still stood

🔒 Being deceived did not cancel the vow

🛡️ God's reputation mattered more than comfort

📖 A hard promise still had to be kept

## ⚡ Lest Wrath Be Upon Us

Wrath here means God's own anger and judgment against broken vows.

The princes feared consequences for the whole nation, not just themselves.

This same principle returns generations later in the story of King Saul.

Second Samuel twenty one shows a famine caused by Saul breaking this oath.

A promise kept here in Joshua still mattered hundreds of years afterward.

⚡ Wrath means God's anger and judgment

🇮🇱 The whole nation could bear the consequence

🕰️ Saul later broke this same oath

📖 The promise still mattered generations later

## 🪓 Hewers Of Wood And Drawers Of Water

This phrase names permanent manual labor, not an execution or an exile.

Hewers of wood gathered fuel, and drawers of water carried it daily.

This kind of work later supported the tabernacle's constant need for both.

The Gibeonites survive, but only inside a life of ongoing service.

Mercy and consequence arrive together in the very same sentence.

🪓 Hewers of wood gathered fuel daily

💧 Drawers of water carried it constantly

⛺ This labor served the tabernacle's needs

📖 Mercy and consequence arrived together

# Joshua 9:22-27
# ⛓️ Cursed Yet Spared
---
## 🎭 Wherefore Have Ye Beguiled Us

Beguiled means tricked or deceived through clever, deliberate misdirection.

Joshua confronts them directly instead of pretending the treaty never happened.

He names the exact lie about being very far away.

Confrontation, not secrecy, is how Joshua handles the discovery.

The truth gets spoken out loud before any punishment is decided.

🎭 Beguiled means tricked through deliberate deception

🗣️ Joshua confronted them directly and openly

🎯 He named the exact lie told

📖 Truth was spoken before punishment came

## 🚫 Now Therefore Ye Are Cursed

This curse is not a spoken wish for their destruction.

It is a formal, permanent change to their social and legal standing.

Genesis chapter nine already spoke of Canaan serving under a curse.

This moment carries out that much older prophecy in real history.

Words spoken generations earlier finally take a concrete, lasting shape.

🚫 This curse changed their legal standing

📜 It was not a wish for destruction

🕰️ Genesis nine already predicted this outcome

📖 An old prophecy took real shape here

## ⛪ Hewers Of Wood And Drawers Of Water For The House Of My God

This servitude is tied specifically to the sanctuary, not general slavery.

The Gibeonites end up serving Israel's worship, not just Israel's households.

This role kept them near God's presence for the rest of their history.

Nehemiah later lists temple servants likely descended from this very group.

Judgment placed them permanently inside the very worship they once threatened.

⛪ This servitude served the sanctuary directly

🏠 It was not ordinary household slavery

🕰️ Nehemiah later lists similar temple servants

📖 Judgment placed them inside true worship

## 😨 We Were Sore Afraid Of Our Lives

Sore here means greatly, not physically painful or sick.

The Gibeonites finally admit fear, not respect, drove their whole plan.

Self preservation, not faith, was their real motive from the very start.

Even so, their fear leads them into a lasting place inside Israel.

A motive that began in fear still produced a real, permanent bond.

😨 Sore here means greatly, not painful

🎭 Fear, not faith, drove their plan

🧠 Self preservation was their real motive

📖 Fear still produced a lasting bond

## 🙇 As It Seemeth Good And Right Unto Thee To Do Unto Us, Do

The Gibeonites now offer Joshua complete authority over their fate.

There is no more negotiating or explaining left for them to do.

Total surrender replaces the clever scheme they used only days earlier.

Their survival now depends entirely on Joshua's mercy alone.

The tricksters of verse four end this chapter as men who simply beg.

🙇 They gave Joshua total authority

🚫 No more negotiating was left

🎭 Surrender replaced their earlier scheme

📖 Their survival now depended on mercy

## 🛡️ That They Slew Them Not

This does not mean the congregation's anger simply faded on its own.

Joshua actively steps in and protects the Gibeonites from the people's rage.

Keeping an oath meant defending the very people who deceived him.

Leadership here means enforcing a hard promise, not just making one.

Joshua's integrity is proven by what he protects, not just what he says.

🛡️ Joshua actively protected the Gibeonites

😠 The people's anger did not fade alone

🔒 Keeping the oath meant real defense

📖 Integrity showed in protection, not just words

## 🕰️ Even Unto This Day

This phrase signals a note added by whoever compiled the book of Joshua.

It means the Gibeonites' servant role still existed at the time of writing.

A deal made from fear at Gilgal became a lasting, generations long arrangement.

This ordinary phrase quietly links the story to real history readers could check.

Some old choices leave marks that outlast everyone who made them.

🕰️ This marks a note added later

⏳ The arrangement lasted for generations

🔗 It linked the story to real history

📖 Some choices outlast everyone who made them
`.trim();

export const JOSHUA_NINE_PERSONAL_SECTIONS = parseJoshuaNineRawNotes(JOSHUA_NINE_RAW_NOTES);
