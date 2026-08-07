export type DeuteronomyFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyFifteenRawNotes(rawText: string): DeuteronomyFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 15:${startVerse}` : `Deuteronomy 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 15 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_FIFTEEN_RAW_NOTES = `# Deuteronomy 15:1-6
# 🔓 The Year Of Release
---
## 🔓 At The End Of Every Seven Years Thou Shalt Make A Release

"Release" does not mean letting a person go free.

It means canceling a debt someone still owed.

Every seven years, Israel held a scheduled reset for loans.

The land itself already rested on this same seven year rhythm.

Now money follows that pattern too.

🔓 Release means canceling a debt, not freedom

📅 The reset came every seven years

🌾 The land already rested on this rhythm

📖 Now debts followed the same pattern

---
## 🤝 Every Creditor That Lendeth Ought Unto His Neighbour Shall Release It

A "creditor" is anyone owed money by someone else.

"Ought" is an old word for something owed, a debt.

"Neighbour" means a fellow Israelite living nearby, not a stranger.

This rule reached every single loan inside the community.

No creditor could claim an exception for their own case.

🤝 Creditor means anyone owed money

💳 Ought is an old word for debt

🏘️ Neighbour means a fellow Israelite

📖 No loan inside Israel was exempt

---
## 🚫 He Shall Not Exact It Of His Neighbour, Or Of His Brother

"Exact" means to demand payment by force.

The law bans chasing down a debt once the seventh year arrives.

"Brother" repeats "neighbour" to close off any loophole.

Family ties could not be used to justify collecting anyway.

The debt was fully canceled, not just delayed.

🚫 Exact means demanding payment by force

⛔ Chasing the debt down was banned

👪 Brother closes off any loophole

📖 The debt ended completely, not later

---
## 👑 Because It Is Called The LORD's Release

This release was not a generous choice a creditor could skip.

It carried God's own name attached to it.

Canceling debt became an act of obedience, not charity.

Refusing to release a debt meant defying the LORD directly.

👑 The release carried God's own name

📜 Canceling debt was obedience, not charity

⚖️ Refusing it meant defying the LORD

📖 God attached his name to this law

---
## 🌍 Of A Foreigner Thou Mayest Exact It Again

A "foreigner" here means someone outside Israel's covenant community.

This person was not living under Israel's sabbath calendar.

Collecting a foreigner's debt was still allowed after the seventh year.

The distinction marked covenant identity, not hostility toward outsiders.

🌍 Foreigner means outside the covenant

📆 Foreigners kept no sabbath calendar

💰 Their debts could still be collected

📖 This marked identity, not hostility

---
## 👫 That Which Is Thine With Thy Brother Thine Hand Shall Release

"Thy brother" narrows the release to fellow Israelites specifically.

The command repeats "thine hand" to make the action personal.

Every creditor released the debt themselves, not through someone else.

This law bound the whole nation, one household at a time.

👫 Brother narrows this to fellow Israelites

✋ Thine hand makes the action personal

🏠 Every household carried this duty

📖 One law, kept household by household

---
## 🎯 Save When There Shall Be No Poor Among You

This verse states God's goal for Israel, not a guarantee.

A community with no poor at all was the ideal outcome.

That outcome depended on how Israel handled money like this release.

Generosity here was meant to reshape the whole nation, not just help one neighbor.

🎯 No poor was God's stated goal

🌱 The ideal depended on obedience

💵 Generosity could reshape the nation

📖 A goal, not an automatic guarantee

---
## 🎧 Only If Thou Carefully Hearken Unto The Voice Of The LORD Thy God

"Hearken" means to listen closely and then act on what is heard.

The word "only" ties the promise of no poverty directly to obedience.

Israel would not stumble into that blessing by accident.

Every command mattered, not just the release law alone.

🎧 Hearken means listening and then acting

🔗 Only ties blessing to obedience

🎲 The blessing was not automatic

📖 Every command mattered, not one alone

---
## 💸 Thou Shalt Lend Unto Many Nations, But Thou Shalt Not Borrow

Lending to other nations pictured a position of strength, not risk.

A lender held power over the terms of a deal.

Borrowing instead would have signaled weakness or need.

God's blessing on Israel would put them in the stronger position.

💸 Lending pictured strength, not risk

👑 A lender controlled the terms

📉 Borrowing would signal weakness

📖 Blessing meant strength over other nations

---
## 👑 Thou Shalt Reign Over Many Nations, But They Shall Not Reign Over Thee

"Reign" here pictures influence and independence, not a literal throne.

Israel would not answer to foreign rulers or foreign debts.

This same lending and reigning language returns later in Deuteronomy 28.

There it becomes a measure of whether Israel kept the whole covenant.

👑 Reign pictures independence, not a throne

🔓 Israel would answer to no foreign power

🔮 This language returns in Deuteronomy 28

📖 It became a measure of covenant faithfulness

# Deuteronomy 15:7-11
# ✋ Open Thine Hand Wide
---
## 🏘️ Within Any Of Thy Gates In Thy Land

"Gates" refers to a person's own town, the place people gathered daily.

A poor neighbor was not a distant, faceless problem.

He lived right inside the same town as the one being addressed.

This command could never be pushed off onto someone farther away.

🏘️ Gates means a person's own town

👤 The poor neighbor lived close by

🚫 The duty could not be pushed away

📖 Help was owed right where you lived

---
## 💔 Thou Shalt Not Harden Thine Heart, Nor Shut Thine Hand

Two images describe the same failure from two directions.

A hardened heart refuses to feel for someone in need.

A shut hand refuses to act even if the heart softens.

Both the feeling and the action had to stay open.

💔 A hard heart refuses to feel

✋ A shut hand refuses to act

🔗 Both attitude and action mattered

📖 Neither one alone was enough

---
## 🖐️ Thou Shalt Open Thine Hand Wide Unto Him

This phrase directly reverses the "shut hand" from the verse before.

"Wide" rules out a small, grudging gift given just to comply.

The command pictures generosity with no measured limit set in advance.

🖐️ Wide reverses the shut hand image

🚫 A grudging small gift was not enough

📏 No limit was set in advance

📖 Generosity here had no ceiling

---
## 💰 Shalt Surely Lend Him Sufficient For His Need

"Sufficient for his need" measures the gift by the need itself.

The amount was not decided by what felt convenient to give.

A person's actual situation set the real size of the loan.

💰 Sufficient means enough, not a token

📏 Need set the size, not convenience

⚖️ The gift matched the real situation

📖 Real need decided the real amount

---
## 📆 The Seventh Year, The Year Of Release, Is At Hand

This verse names a real temptation hiding inside the release law.

Someone could refuse to lend simply because forgiveness was coming soon.

The law anticipates people gaming a good system for selfish reasons.

Naming the temptation out loud was meant to guard against it.

📆 A real temptation is named here

🧮 Some might refuse loans near release year

⚠️ The law anticipates people gaming it

📖 Naming the trap helped guard against it

---
## 👁️ Thine Eye Be Evil Against Thy Poor Brother

"Evil eye" is an old idiom for a stingy, grudging attitude.

It does not describe a curse or anything supernatural here.

The idiom pictures someone eyeing a poor man with resentment instead of care.

👁️ Evil eye is an idiom, not a curse

💢 It pictures a stingy, grudging attitude

🙅 Resentment replaces care in this idiom

📖 An old phrase for a hard heart

---
## 📢 He Cry Unto The LORD Against Thee, And It Be Sin Unto Thee

The poor man's complaint did not stop with the person who refused him.

It reached God directly, as a real appeal for justice.

Refusing a poor brother turned into sin against God, not just against a neighbor.

📢 The complaint reached God directly

⚖️ God heard it as a real appeal

🙏 Refusal became sin against God

📖 Not just a wrong between neighbors

---
## 😔 Thine Heart Shall Not Be Grieved When Thou Givest Unto Him

"Grieved" here describes a resentful, reluctant attitude while giving.

The command reaches past the act of giving into the giver's attitude.

Cheerful generosity was the standard, not grudging compliance.

😔 Grieved means giving with resentment

🎯 The command reaches the giver's attitude

😊 Cheerful giving was the real standard

📖 How you gave mattered as much as what

---
## 🌾 The LORD Thy God Shall Bless Thee In All Thy Works

Generosity here connects to a promised blessing on all of Israel's labor.

The blessing was not limited to the exact amount given away.

Every field, flock, and task shared in that same promised reward.

🌾 Blessing was promised on all labor

💵 It was not limited to the gift itself

🐑 Fields, flocks, and tasks all shared it

📖 Generosity opened a wider blessing

---
## ♾️ The Poor Shall Never Cease Out Of The Land

This line sounds like it contradicts the promise back in verse four.

Verse four names the ideal, a land with no poor at all.

This verse names the reality Israel would likely still face.

The command to give stayed permanent no matter which one was true.

♾️ Poverty would likely remain a reality

🎯 Verse four named the ideal instead

🔁 Reality and ideal were held together

📖 The command to give never expired

# Deuteronomy 15:12-15
# 🕊️ Let Him Go Free
---
## 👫 If Thy Brother, An Hebrew Man, Or An Hebrew Woman, Be Sold Unto Thee

Being "sold" here usually meant a person selling their own labor to pay off debt.

This was not the same as the permanent, brutal slavery practiced elsewhere.

Both a Hebrew man and a Hebrew woman are named as covered by this law.

👫 Sold usually meant paying off a debt

🚫 This differed from permanent foreign slavery

⚖️ Both men and women were covered

📖 Debt servitude, not lifelong bondage

---
## 🔓 Then In The Seventh Year Thou Shalt Let Him Go Free From Thee

Six years was the fixed cap on this kind of service.

The seventh year counted from when that person was first sold, not a shared calendar date.

Every servant received a guaranteed personal release, no matter when their service began.

🔓 Six years was the fixed limit

📆 Each servant's seventh year was personal

✅ Release was guaranteed, not optional

📖 No servant served past that cap

---
## 🎁 Thou Shalt Not Let Him Go Away Empty

Freedom alone was not considered enough of a gift.

A person leaving with nothing would likely fall right back into debt.

The law required sending him out ready to start again.

🎁 Freedom alone was not enough

🔁 Empty hands would restart the poverty cycle

🌱 The law required a real fresh start

📖 True release included real provision

---
## 🐑 Thou Shalt Furnish Him Liberally Out Of Thy Flock, And Out Of Thy Floor, And Out Of Thy Winepress

Three named sources cover three different kinds of wealth.

The flock provided livestock, the floor provided grain, the winepress provided wine.

Together they formed a real starter kit for beginning independent life.

🐑 Flock, floor, and winepress named together

🌾 They cover livestock, grain, and wine

🧰 Together they formed a real starter kit

📖 A full send off, not a partial one

---
## 🙏 Of That Wherewith The LORD Thy God Hath Blessed Thee Thou Shalt Give Unto Him

The master's own wealth is described here as a blessing already received.

Giving some of it away did not really cost the master anything.

Passing along blessing already given was the whole reasoning behind the gift.

🙏 The master's wealth was already a blessing

🔁 Sharing it did not create a real loss

➡️ Blessing received was meant to be passed on

📖 Giving reflected what had already been given

---
## 🇪🇬 Thou Shalt Remember That Thou Wast A Bondman In The Land Of Egypt

This memory formula repeats often throughout Deuteronomy for a reason.

Israel was told to treat their own servants the way they wished Egypt had treated them.

Remembering slavery in Egypt turned a legal rule into a personal motive.

🇪🇬 A memory formula repeated through Deuteronomy

🔁 Treat servants how Egypt should have treated Israel

❤️ Memory turned law into personal motive

📖 Their own history shaped their own mercy

# Deuteronomy 15:16-18
# 👂 The Pierced Ear
---
## ❤️ I Will Not Go Away From Thee

Staying was presented here as a real choice, not a forced outcome.

A servant could take the freedom offered or decline it voluntarily.

This verse gives the servant's own reason for choosing to remain.

❤️ Staying was a real, voluntary choice

🔓 Freedom was still fully offered first

🗣️ The servant explains his own reason

📖 This choice belonged to the servant

---
## 🏠 Because He Loveth Thee And Thine House, Because He Is Well With Thee

Two separate reasons are given for wanting to stay.

The first is genuine affection for the master and the household.

The second is simply being treated well during those six years.

Both reasons assume the household was not an abusive place to be.

🏠 Two separate reasons are given here

❤️ The first reason is real affection

😊 The second reason is good treatment

📖 Fair treatment made staying imaginable

---
## 🔨 Thou Shalt Take An Aul, And Thrust It Through His Ear Unto The Door

An "aul" is an old word for a sharp, pointed awl.

The ritual pierced the servant's ear while it rested against the doorpost.

The door of the house stood for the household itself.

Marking the ear this way made the servant's choice visible and permanent.

🔨 Aul means a sharp, pointed tool

🚪 The door stood for the household

👂 The ear was marked at the doorpost

📖 A visible, permanent sign of that choice

---
## ⏳ He Shall Be Thy Servant For Ever

"For ever" here most likely means for the rest of that servant's working life.

It does not describe an eternal, unending state beyond death.

The bond became permanent because the servant chose it freely.

⏳ For ever likely means his working lifetime

🚫 Not an eternal state beyond death

🤝 The bond was chosen, not forced

📖 A permanent choice, freely made

---
## 👩 Unto Thy Maidservant Thou Shalt Do Likewise

This law explicitly extends the same option to female servants.

A woman could choose to stay under the same voluntary process.

Naming her separately made sure she was not quietly left out.

👩 Female servants received the same option

⚖️ The same voluntary process applied

📋 She is named so she is not overlooked

📖 Equal treatment written directly into the law

---
## 😕 It Shall Not Seem Hard Unto Thee, When Thou Sendest Him Away Free

This line speaks directly to the master's likely reluctance.

Losing a trained, familiar worker after six years would feel like a real loss.

God addresses that resistance before it can turn into resentment.

😕 The master's reluctance is named directly

📉 Losing a good worker felt like a loss

🛑 God addresses the resistance up front

📖 Honest about a real temptation to resist

---
## 💵 He Hath Been Worth A Double Hired Servant To Thee, In Serving Thee Six Years

A hired worker was paid wages and could leave at any time.

A bond servant worked without wages for the full six years straight.

That steady, full time labor made him worth double an ordinary hire.

💵 Hired workers were paid and could leave

🔁 A bond servant worked steadily, unpaid

📈 That labor was worth double a hire

📖 Six years already repaid the debt in full

# Deuteronomy 15:19-23
# 🐑 The Firstling Sanctified
---
## ✨ All The Firstling Males That Come Of Thy Herd And Of Thy Flock Thou Shalt Sanctify

A "firstling" is the first male offspring born to an animal.

"Sanctify" means to set something apart entirely for God's use.

This law echoes the firstborn consecration from the exodus out of Egypt.

The very first male of every herd and flock belonged to God automatically.

✨ Firstling means the first male born

🎯 Sanctify means set apart for God

🇪🇬 It echoes the exodus firstborn law

📖 The first male belonged to God

---
## 🚫 Thou Shalt Do No Work With The Firstling Of Thy Bullock, Nor Shear The Firstling Of Thy Sheep

An animal already set apart for God could not be used for ordinary profit.

Working a bullock or shearing a sheep were both normal ways to gain value from an animal.

Both uses were banned here before the animal was ever offered.

🚫 A sanctified animal was not for profit

🐂 Working the bullock was banned

🐑 Shearing the sheep was banned too

📖 It stayed fully devoted until offered

---
## 🍽️ Thou Shalt Eat It Before The LORD Thy God Year By Year In The Place Which The LORD Shall Choose

Being set apart for God did not mean the animal was only burned up.

The family ate it together as a shared, sacred meal instead.

That meal happened at the one central place named back in chapter twelve.

🍽️ The family shared it as a meal

🔥 It was not simply burned entirely

🏛️ The meal happened at the chosen place

📖 Worship here included a real family meal

---
## 🦵 And If There Be Any Blemish Therein, As If It Be Lame, Or Blind

"Blemish" means a physical flaw like lameness or blindness.

An animal with a real flaw could not be offered as a sacrifice.

This standard protected the principle of giving God the best, not the leftover.

🦵 Blemish means a real physical flaw

🐑 Lame or blind animals were excluded

🎁 The rule protected giving God the best

📖 Not the leftover, the best available

---
## 🏘️ Thou Shalt Eat It Within Thy Gates

A blemished firstling was never simply thrown away or wasted.

It could still be eaten locally, at home, like ordinary meat.

This kept the animal's value while removing it from sacred use.

🏘️ A flawed animal was still eaten

🚫 Nothing here went to waste

🏠 It was eaten locally, not centrally

📖 Value was kept even outside sacred use

---
## 🦌 The Unclean And The Clean Person Shall Eat It Alike, As The Roebuck, And As The Hart

Once a firstling fell outside sacred use, it was treated like ordinary wild game.

The roebuck and hart were the same wild deer named back in chapter fourteen.

Purity rules that applied to sacrificial meat no longer applied to this meal.

🦌 It became ordinary meat, like wild game

🔗 Roebuck and hart were named in chapter fourteen

🧹 Sacrificial purity rules no longer applied

📖 Different meal, different set of rules

---
## 🩸 Only Thou Shalt Not Eat The Blood Thereof

One rule stayed fixed no matter the animal's condition.

Blood was still poured out on the ground like water.

Deuteronomy repeats this blood rule again and again for one reason.

The blood represented the life itself, and life belonged to God alone.

🩸 The blood rule never changed

💧 Blood was poured out like water

🔁 Deuteronomy repeats this rule often

📖 Life belonged to God alone
`.trim();

export const DEUTERONOMY_FIFTEEN_PERSONAL_SECTIONS = parseDeuteronomyFifteenRawNotes(DEUTERONOMY_FIFTEEN_RAW_NOTES);
