export type FirstKingsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsNineRawNotes(rawText: string): FirstKingsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsNine\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsNine\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsNine\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 9:${startVerse}` : `1 Kings 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Kings 9 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_NINE_RAW_NOTES = `# FirstKingsNine 9:1-3
# 😌 The LORD Appears A Second Time
---
## ✨ All Solomon's Desire Which He Was Pleased To Do

Solomon built many things beyond the temple and the palace.

Verse one groups all of it under one phrase, his desire.

Later in this chapter he adds cities, a wall, and even a fleet of ships.

That single phrase quietly points ahead to everything still coming.

🏗️ His desire covers many projects

🏙️ More building is still ahead

📜 The chapter lists it later

📖 One phrase, an entire building program

---

## 🔁 The LORD Appeared To Solomon The Second Time

This is not Solomon's first visit from God.

Years earlier God appeared to him in a dream at Gibeon.

In that dream Solomon asked for wisdom instead of riches.

Now, with the temple finished, God comes to speak again.

🔁 A second appearance from God

💭 The first came in a dream

🧠 Solomon once asked for wisdom

📖 God returns now that the house is built

---

## 🏔️ As He Had Appeared Unto Him At Gibeon

Gibeon was a high place where Israel worshiped before the temple existed.

It sat a few miles northwest of Jerusalem.

Solomon had gone there to offer sacrifices early in his reign.

That is where his famous request for wisdom took place.

🏔️ Gibeon was a worship site

🧭 It sat near Jerusalem

🔥 Solomon offered sacrifices there

📖 His wisdom request happened at Gibeon

---

## 🕊️ I Have Hallowed This House

"Hallowed" means set apart as holy and belonging fully to God.

The temple was not simply a beautiful building anymore.

God's own declaration made it sacred.

No architecture or craftsmanship could have done that alone.

🕊️ Hallowed means set apart as holy

🏛️ Not just a beautiful building

🙏 God's word made it sacred

📖 Holiness came from God, not craftsmanship

---

## 📛 To Put My Name There For Ever

In the Bible, a name often stands for a person's presence and character.

God putting His name in the temple means He was choosing to be present there.

That presence stayed tied to this one location for the rest of the Old Testament.

It made the temple the center of worship for the whole nation.

📛 A name stands for presence

🏛️ God chose the temple as His place

🗺️ One location held His presence

📖 The temple became worship's center

---

## 💗 Mine Eyes And Mine Heart Shall Be There Perpetually

God promises constant, personal attention to this one place.

"Perpetually" means without stopping, forever.

Eyes picture watching, and heart pictures caring.

This was not a distant blessing said once and forgotten.

👀 Eyes picture God watching

💓 Heart pictures God caring

⏳ Perpetually means without stopping

📖 God's attention here never stops

---

# FirstKingsNine 9:4-9
# ⚖️ A Promise With A Warning Attached
---
## 🚶 If Thou Wilt Walk Before Me

To walk before someone means to live under their watch.

It pictures obedience carried out in daily life.

God is not asking for a single decision.

He is asking for a whole life lived His way.

🚶 Walking before God means obedience

📆 It happens in daily life

🙏 Not just one decision

📖 A whole life lived His way

---

## 👴 As David Thy Father Walked, In Integrity Of Heart

Father here refers to David, Solomon's own father.

In the Bible the word father can also stretch further back to any ancestor.

"Integrity of heart" means honesty all the way through.

There is no gap between how a person acts in public and in private.

👴 Father means David here

📜 Father can also mean ancestor

💯 Integrity means honesty all the way through

📖 No gap between public and private

---

## 👑 There Shall Not Fail Thee A Man Upon The Throne

This is God renewing the promise He first made to David.

Second Samuel seven recorded that promise, a family line that would rule forever.

Solomon is hearing that same covenant restated for himself.

This promise fuels the later hope for a coming king from David's line.

👑 God renews David's promise

📜 Second Samuel first recorded it

👨‍👦 Solomon hears it restated

📖 This promise fuels later hope for a king

---

## 🔀 If Ye Shall At All Turn From Following Me

Notice the pronoun change from thou to ye.

God moves from speaking to Solomon alone to speaking about the whole nation.

Ye and your children means every generation of Israel, not just the king.

The warning is now corporate, not personal.

🔀 Thou becomes ye here

🌍 The warning widens to the nation

👶 Your children means future generations

📖 A corporate warning, not personal

---

## 👋 Will I Cast Out Of My Sight

The temple was never an unconditional guarantee of safety.

God warns that He could remove His presence from this very building.

Babylon fulfilled that warning by destroying the temple in 586 BC.

Holiness was never magic protection against Israel's own unfaithfulness.

👋 God could remove His presence

💥 Babylon later destroyed the temple

📅 That happened in 586 BC

📖 Holiness was never automatic protection

---

## 😬 A Proverb And A Byword

Proverb here means a well known saying people repeat.

It is usually repeated as a warning to others.

Byword means a name that becomes shorthand for shame.

Israel would become the example other nations warned their children about.

😬 Proverb means a repeated saying

⚠️ Often used as a warning

💔 Byword means shorthand for shame

📖 Israel becomes a warning example

---

## 😲 Shall Be Astonished, And Shall Hiss

Astonished here means shocked, not simply surprised.

Hissing was an ancient gesture of scorn and mockery, not just a sound of surprise.

Travelers passing the ruined temple would react with both horror and contempt.

A building once considered the glory of Israel would become a warning sign instead.

😲 Astonished means shocked

🐍 Hissing showed scorn and mockery

🚶 Travelers would react this way

📖 Glory turned into a warning sign

---

## 🙏 Because They Forsook The LORD Their God

This is the reason given for the coming disaster.

Forsook means abandoned completely, not drifted from by accident.

The same God who saved their fathers out of Egypt gets abandoned by their descendants.

The cause named is the people's heart, not the temple's stones.

🙏 Forsook means abandoned completely

🚪 Not an accident, a choice

📜 The same God who saved Egypt's slaves

📖 The people's heart caused this, not the temple

---

# FirstKingsNine 9:10-14
# 🏙️ Twenty Cities After Twenty Years
---
## 🕰️ At The End Of Twenty Years

Building both houses took two decades of Solomon's reign.

The temple alone took seven years to build.

The palace took another thirteen years after that.

Together those two projects filled Solomon's first twenty years as king.

🕰️ Twenty years covers both builds

🛕 The temple took seven years

🏰 The palace took thirteen more

📖 Both projects filled two decades

---

## 🌲 Hiram The King Of Tyre Had Furnished Solomon

Hiram was the king of Tyre, a wealthy trading city on the coast north of Israel.

Years earlier he supplied Solomon with cedar and fir trees for the temple and palace.

He also supplied gold for the many furnishings inside those buildings.

That earlier partnership is why Solomon now owes him payment.

🌲 Hiram ruled the city of Tyre

🪵 He supplied cedar and fir wood

🥇 He also supplied gold

📖 That deal is why payment is due

---

## 🏘️ Solomon Gave Hiram Twenty Cities In The Land Of Galilee

Kings rarely gave away their own territory to settle a debt.

Galilee sat in the northern part of Solomon's kingdom, near Tyre's own border.

Handing over twenty cities there was Solomon's way of paying off years of imported materials.

It shows just how large a debt the building projects had created.

🏘️ Twenty cities changed hands

🗺️ Galilee bordered Hiram's territory

💰 This settled a building debt

📖 The debt was massive

---

## 😒 They Pleased Him Not

Hiram inspected the cities and was not impressed.

He may have expected wealthier or more useful territory for his years of supplies.

His disappointment shows Solomon's payment did not match Hiram's expectations.

Even two allied kings could disagree over what counted as a fair trade.

😒 Hiram was unimpressed

🤔 He expected more value

⚖️ Payment did not match his expectations

📖 Even allies can disagree over trade

---

## 🏷️ The Land Of Cabul

Hiram renamed the cities Cabul out of disappointment.

Many scholars believe the name plays on a Hebrew word meaning good for nothing.

Renaming land was a way of publicly recording an insult.

The name Cabul stuck, the text says, to that very day.

🏷️ Cabul was Hiram's new name

✍️ Renaming recorded his insult publicly

🗺️ The name lasted for generations

📖 It may mean good for nothing

---

## 🤝 My Brother

Hiram calls Solomon "my brother" even while complaining to him.

Ancient kings often used family language like this between equals, not literal blood relation.

Letters between kings in this era regularly used the same kind of address.

The title shows respect even in the middle of a real disagreement.

🤝 Brother was diplomatic language

👑 Kings used this between equals

✉️ Ancient royal letters did the same

📖 Respect stayed even during disagreement

---

## 🥇 Sixscore Talents Of Gold

Sixscore means one hundred twenty.

A score was an old way of counting by twenties.

A talent was a unit of weight, close to seventy five pounds.

That means Hiram sent Solomon around nine thousand pounds of gold.

🥇 Sixscore means one hundred twenty

📏 A score counted by twenties

⚖️ A talent weighed about seventy five pounds

📖 That is around nine thousand pounds of gold

---

# FirstKingsNine 9:15-19
# 🧱 What The Labor Force Built
---
## 👷 The Levy Which King Solomon Raised

A levy was a forced draft of workers, not a voluntary job.

Solomon required labor from his kingdom to complete these massive projects.

This same labor system was already introduced back in chapter five.

Large ancient building projects almost always depended on this kind of forced work.

👷 Levy means forced labor

🏗️ Workers built these projects

📜 Chapter five introduced this system

📖 Ancient kingdoms relied on forced work

---

## 🧱 Millo

Millo comes from a Hebrew word meaning to fill.

Many scholars believe it was a terraced structure supporting part of Jerusalem's fortifications.

It likely helped level and expand the ridge the city was built on.

Millo appears several more times later in the story of Jerusalem.

🧱 Millo means to fill

🏔️ It may have been a terrace structure

🏙️ It expanded Jerusalem's ridge

📖 Millo returns later in the story

---

## 🧱 The Wall Of Jerusalem

Solomon expanded and strengthened the city's defenses.

A stronger wall protected both the temple and the growing capital.

This was part of turning Jerusalem into a true capital city, not just David's old stronghold.

Walls in this era were the main defense against any invading army.

🧱 Solomon strengthened the wall

🛡️ It protected the temple and city

🏛️ Jerusalem became a true capital

📖 Walls were the main defense

---

## 🏰 Hazor, And Megiddo, And Gezer

These three cities guarded major roads through Solomon's kingdom.

Hazor sat in the north, controlling routes toward Syria.

Megiddo overlooked a valley so important that armies fought there for centuries.

Gezer guarded the road connecting the coast to Jerusalem.

🏰 Three fortress cities guarded roads

🧭 Hazor watched the northern routes

⚔️ Megiddo overlooked a famous valley

📖 Gezer guarded the coastal road

---

## 🎁 Pharaoh King Of Egypt Had Gone Up, And Taken Gezer

Egypt's Pharaoh had captured Gezer from the Canaanites living there.

He then gave the captured city to his own daughter as a wedding gift.

That daughter was already married to Solomon.

A Pharaoh handing over conquered land was an unusually generous political gesture.

🎁 Pharaoh captured Gezer first

👰 He gave it as a dowry

💍 His daughter had married Solomon

📖 That gesture was politically unusual

---

## 🏜️ Tadmor In The Wilderness

Tadmor sat far out in the desert, along a major trade route.

It later grew into the famous city known as Palmyra.

Controlling a desert outpost like this protected caravans crossing long, dangerous stretches.

Solomon's building reached well beyond Israel's normal borders.

🏜️ Tadmor sat deep in the desert

🐫 It guarded a trade route

🏛️ It later became Palmyra

📖 Solomon's reach extended past Israel's borders

---

## 🐎 Cities For His Chariots, And Cities For His Horsemen

Store cities were supply depots that stockpiled grain, oil, and other goods.

Chariot cities and horsemen cities housed Solomon's growing military forces.

Together they formed a network supporting trade and national defense.

This whole list shows how large Solomon's kingdom infrastructure had grown.

🐎 Chariot cities housed his forces

📦 Store cities held supplies

🗺️ Together they formed a network

📖 Solomon's infrastructure had grown large

---

# FirstKingsNine 9:20-22
# 🛠️ Who Built It, And Who Ruled It
---
## 🏛️ Amorites, Hittites, Perizzites, Hivites, And Jebusites

These were five of the peoples who lived in Canaan before Israel arrived.

Joshua's conquest removed many of their cities but not every family or town.

By Solomon's time their descendants still lived scattered across the land.

Naming all five groups together shows just how many different peoples remained.

🏛️ Five Canaanite peoples remained

🗺️ They lived in the land before Israel

⚔️ Joshua's conquest was not total

📖 Their descendants were still there

---

## ⚔️ Not Able Utterly To Destroy

This admits plainly that Israel's conquest of Canaan was never fully complete.

Joshua and Judges already describe pockets of Canaanites surviving in the land.

That incomplete conquest is what leaves this labor force available generations later.

The text does not hide or soften that history.

⚔️ Conquest was never fully complete

📜 Joshua and Judges said the same

👥 Survivors remained for generations

📖 The text does not hide this

---

## ⛓️ Did Solomon Levy A Tribute Of Bondservice

Bondservice meant permanent forced labor, not a temporary work project.

These descendants of Canaan became Solomon's ongoing construction workforce.

This tribute of labor is separate from a tax paid in money or goods.

It was their bodies and their work that were being demanded.

⛓️ Bondservice means permanent forced labor

🏗️ Canaanite descendants built for Solomon

💰 This tribute was labor, not money

📖 Their work itself was the demand

---

## 🇮🇱 Of The Children Of Israel Did Solomon Make No Bondmen

This verse draws a sharp line between Israelites and everyone else.

No Israelite was forced into this permanent kind of labor.

Earlier chapters do mention Israelites called up for temporary building work.

That earlier levy was different, temporary service, not lifelong bondage.

🇮🇱 Israelites were kept out of bondservice

🚧 They were not permanent laborers

📜 Earlier chapters mention temporary levies

📖 Temporary service differs from bondage

---

## 🛡️ His Princes, And His Captains, And Rulers Of His Chariots

Instead of forced labor, Israelites filled leadership and military roles.

Princes and captains ran the kingdom's government and army.

Others commanded the chariots and cavalry described earlier in this chapter.

Solomon built two very different systems side by side, one free and one forced.

🛡️ Israelites led instead of labored

👑 Princes ran the government

⚔️ Captains led the army

📖 Two systems existed side by side

---

# FirstKingsNine 9:23-25
# 🏛️ Officers, A Palace, And A Finished House
---
## 👥 Five Hundred And Fifty

These were the chief officers who supervised Solomon's many workers.

Chapter five mentioned a much larger number, three thousand three hundred, overseeing the people.

The text does not fully explain the difference between the two counts.

Many scholars believe these five hundred fifty were a higher tier of senior supervisors.

👥 Chief officers supervised the work

📜 Chapter five gave a bigger number

🤔 The text does not explain the gap

📖 These were likely senior supervisors

---

## 🏠 Unto Her House Which Solomon Had Built For Her

Pharaoh's daughter had her own separate palace built just for her.

A later passage in Second Chronicles explains why she could not stay near the ark.

The places where the ark had been were considered too holy for her to live in.

Solomon kept sacred space and family living space clearly apart.

🏠 She got her own palace

📜 Second Chronicles explains the reason

🕊️ Ark related places stayed holy

📖 Sacred space stayed separate from home

---

## 🕎 Three Times In A Year Did Solomon Offer

Israel required three yearly pilgrimage feasts for every man to attend.

Those were Passover, the Feast of Weeks, and the Feast of Tabernacles.

Solomon personally led sacrifices at these three set times.

A king modeling this practice mattered as much as the sacrifices themselves.

🕎 Three feasts were required yearly

🍞 Passover began the yearly cycle

🌾 Weeks and Tabernacles followed later

📖 Solomon modeled faithful worship

---

## 🔥 Burnt Offerings And Peace Offerings

A burnt offering was completely consumed by fire, given wholly to God.

A peace offering was partly burned and partly shared as a meal.

Together they combined total surrender with fellowship and celebration.

Solomon offered both kinds regularly, not just at the temple's dedication.

🔥 Burnt offerings were fully given

🍽️ Peace offerings became a shared meal

🙏 Together they showed surrender and joy

📖 Solomon offered both regularly

---

## 🏁 So He Finished The House

This line closes a building project that began several chapters earlier.

Chapter six first described the temple's construction in detail.

Now, after years of work, the whole account is finally complete.

The house built for God's name was finished exactly as promised.

🏁 A years long project ends here

🛕 Chapter six began the construction

⏳ Years of work are complete

📖 The house was finished as promised

---

# FirstKingsNine 9:26-28
# ⛵ A Navy And Foreign Gold
---
## ⛵ A Navy Of Ships In Eziongeber

Eziongeber was a port city at the northern tip of the Red Sea.

Solomon built ships there to trade far beyond his own borders.

This location gave landlocked Israel rare direct access to sea trade.

A navy this far south shows how wide Solomon's ambitions had grown.

⛵ Eziongeber was a Red Sea port

🚢 Solomon built ships there

🗺️ It gave Israel access to sea trade

📖 His ambitions reached far beyond Israel

---

## 📍 Beside Eloth, On The Shore Of The Red Sea

Eloth, also called Elath, sat right next to Eziongeber on the coast.

This region marked the southern edge of Solomon's kingdom.

Ships launched from here could reach ports far down the African and Arabian coasts.

Controlling this stretch of coastline opened trade routes Israel never had before.

📍 Eloth sat beside Eziongeber

🧭 It marked the kingdom's southern edge

🌍 Ships could reach distant coasts

📖 New trade routes opened here

---

## ⚓ Shipmen That Had Knowledge Of The Sea

Israel was not a seafaring nation and had little sailing experience.

Solomon needed Hiram's Phoenician sailors, who had generations of sea knowledge.

Tyre's people were famous throughout the ancient world for shipbuilding and navigation.

This partnership let Israel share in trade it could never have reached alone.

⚓ Israel lacked sailing experience

🌊 Phoenicians supplied skilled sailors

🛠️ Tyre was famous for shipbuilding

📖 Partnership opened trade Israel could not reach alone

---

## 🏆 Ophir

Ophir was a distant region famous across the ancient world for fine gold.

Its exact location is still debated among scholars today.

Some place it in Arabia, others in East Africa or even India.

Wherever it was, the name alone signaled the very best gold available.

🏆 Ophir was famous for gold

🗺️ Its exact location is debated

🌍 Arabia, Africa, and India are all guesses

📖 The name signaled the finest gold

---

## 💰 Four Hundred And Twenty Talents

A talent was a unit of weight close to seventy five pounds.

Four hundred twenty talents adds up to around thirty one thousand pounds of gold.

That is an extraordinary single shipment, even for a wealthy king.

This voyage alone added enormous wealth to Solomon's kingdom.

💰 A talent weighed about seventy five pounds

⚖️ The total was around thirty one thousand pounds

🚢 One voyage brought this much gold

📖 Ophir's gold enriched Solomon's kingdom
`.trim();

export const FIRST_KINGS_NINE_PERSONAL_SECTIONS = parseFirstKingsNineRawNotes(FIRST_KINGS_NINE_RAW_NOTES);
