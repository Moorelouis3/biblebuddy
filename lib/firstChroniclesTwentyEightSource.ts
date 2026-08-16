export type FirstChroniclesTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyEightRawNotes(rawText: string): FirstChroniclesTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 28:${startVerse}` : `1 Chronicles 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Chronicles 28 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_EIGHT_RAW_NOTES = `# FirstChronicles 28:1-3
# 🏛️ David Gathers Every Leader In Israel
---
## 🏛️ David Assembled All The Princes Of Israel

"Princes" here means the appointed leaders over Israel's tribes, not royal children.

David called every level of leadership into one room at once.

Chapter twenty seven already listed these same officers by name and by job.

Nothing in this speech was said privately or behind closed doors.

A public handoff makes a promise much harder to quietly undo later.

🏛️ Princes means appointed tribal leaders
📜 Chapter twenty seven named these officers
👥 Every level of leadership attended
📖 A public handoff resists quiet reversal

---
## 🗓️ The Captains Of The Companies That Ministered To The King By Course

"By course" means these captains served in a fixed monthly rotation.

Each division took one month of duty, then handed it to the next.

"Ministered" here means served the king officially, not any priestly work.

Twelve rotating commanders meant twelve different men had to hear this speech.

David wanted the whole year's leadership standing in the same room.

🔁 By course means monthly rotation
⚔️ These captains commanded army divisions
🙋 Ministered means served the king
📖 All twelve commanders heard this together

---
## 💰 The Stewards Over All The Substance And Possession Of The King

"Substance" means property and wealth, including herds, fields, vineyards, and stored goods.

These stewards managed David's farms and flocks across the whole kingdom.

Money handlers were called in beside generals and princes for one reason.

Building a temple would take enormous funds, not only enormous faith.

David gathered the men who controlled the treasury before he asked for anything.

🌾 Substance means property, herds, and land
🧾 Stewards managed the royal estates
🏗️ A temple needed money, not only faith
📖 David gathered the purse holders first

---
## 🛡️ With The Mighty Men, And With All The Valiant Men

"Mighty men" names David's famous elite warriors, listed back in chapter eleven.

"Valiant men" describes soldiers proven brave in real battle.

These were fighters, not builders or priests.

David invites them to hear about a house of worship anyway.

The temple was never meant to be the priests' private project.

A whole nation was being handed one job.

🛡️ Mighty men were David's elite warriors
📜 Chapter eleven lists them by name
⚔️ Soldiers were invited to a worship plan
📖 The temple belonged to the whole nation

---
## 🧡 Hear Me, My Brethren, And My People

A king could simply issue orders to the men standing before him.

David opens by calling them brothers instead.

"Brethren" means fellow Israelites, family in the covenant sense.

He then stands up on his feet, an effort worth noting for an old king.

First Kings one describes David near the end of his life, weak and bedbound.

This speech cost him something physical before it cost him anything else.

🗣️ David speaks as brother, not master
👴 Standing up cost an aging king effort
🛏️ First Kings one shows him bedbound
📖 Respect opened the request before authority did

---
## 🏠 An House Of Rest For The Ark Of The Covenant

"House of rest" means a permanent home, an end to constant moving.

The ark had traveled in a tent since the wilderness days of Moses.

Every stop meant taking the tabernacle apart and carrying it again.

David wanted the ark to finally stop moving.

"Footstool of our God" pictures God enthroned above the ark, feet resting on it.

The image says God is seated as king, no longer on the march.

⛺ The ark had moved since Moses
🛑 House of rest means permanent home
👣 Footstool pictures God enthroned above
📖 A settled ark meant a settled kingdom

---
## ⚔️ Thou Hast Been A Man Of War, And Hast Shed Blood

This does not mean God called David's wars sinful.

Many of those battles were fought at God's own command.

The reason is about fitness, not guilt.

A house meant for rest could not be built by hands trained for war.

Second Samuel seven records God first giving David this answer.

David had carried that no for many years before repeating it here.

🚫 God refused David, not David's wars
🕊️ A house of rest needed peaceful hands
📜 Second Samuel seven records the original answer
📖 God can refuse a good desire

# FirstChronicles 28:4-5
# 🎯 A Choice Narrowed Down Four Times
---
## 🔄 Howbeit The LORD God Of Israel Chose Me

"Howbeit" is old English for "however" or "even so."

David has just said God refused his request.

This word turns the sentence toward what God did give him instead.

The refusal and the calling sit side by side in one breath.

David does not treat one as cancelling out the other.

🔤 Howbeit means however or even so
↩️ The word pivots toward what God gave
🤝 Refusal and calling sit together
📖 A closed door did not mean rejection

---
## 🧭 He Hath Chosen Judah To Be The Ruler

God's choice narrows step by step inside this one verse.

First the tribe of Judah out of all twelve tribes.

Then the house of Jesse out of all Judah's families.

Then David out of Jesse's own sons.

Genesis forty nine already promised the ruler would come from Judah.

This is not a new decision, it is an old promise reaching David.

🔻 The choice narrows four separate times
👪 Tribe, then family, then one son
📜 Genesis forty nine promised Judah's ruler
📖 David inherited an ancient promise

---
## 🙂 Among The Sons Of My Father He Liked Me

"Liked" here means chose with pleasure, not merely preferred.

The Hebrew carries the sense of taking delight in someone.

First Samuel sixteen tells how Samuel passed over seven older brothers.

David was so overlooked that nobody thought to call him from the sheep.

The word liked answers that whole scene.

God's delight found the son his own family forgot.

😊 Liked means chose with real delight
🐑 David was left with the sheep
📜 First Samuel sixteen tells that story
📖 God delights in the overlooked one

---
## 🧒 For The LORD Hath Given Me Many Sons

David had at least nineteen named sons across several wives.

Chapter three of this book lists them by mother and by city.

Solomon was not the oldest, and he was not the obvious heir.

Second Samuel three names Amnon as David's firstborn.

Adonijah had already tried to seize the throne in First Kings one.

Choosing Solomon meant passing over older brothers, exactly as God chose David.

👶 David had at least nineteen sons
📜 Chapter three lists them all
👑 Solomon was not the eldest heir
📖 God passed over older brothers again

---
## 🪑 To Sit Upon The Throne Of The Kingdom Of The LORD

The throne is called the LORD's throne, not David's or Solomon's.

Israel's kings were treated as men seated in a chair belonging to God.

A king ruled as a steward, never as an owner.

That framing limited a king's power at the very moment it granted it.

Solomon receives a seat he can occupy but never possess.

👑 The throne belonged to God
🧾 Kings ruled as stewards, not owners
⚖️ Divine ownership limited royal power
📖 Solomon received a seat, not a possession

# FirstChronicles 28:6-8
# 📜 A Promise With A Condition Attached
---
## 👦 I Have Chosen Him To Be My Son

This does not mean Solomon was divine or born differently than other men.

Ancient kings across the region were often called sons of their god.

Israel used that same language for its king with one difference.

The relationship was given by covenant, not claimed by nature.

God chose to call Solomon son, and that choosing is the whole point.

Second Samuel seven gives this same promise to David first.

🚫 This does not make Solomon divine
🌍 Neighboring kings used similar language
🤝 The bond came by covenant
📖 Sonship here is given, not inherited

---
## ⚖️ If He Be Constant To Do My Commandments

"Constant" means steady over time, not perfect on any single day.

The promise in the verse before sounds unconditional.

This word attaches a real condition to it.

God committed to the family line permanently.

Any individual king's own reign still depended on obedience.

First Kings eleven shows Solomon failing exactly this test late in life.

🕰️ Constant means steady, not flawless
🔗 The promise carries a real condition
👑 The line held, individual reigns did not
📖 First Kings eleven records Solomon's drift

---
## 👀 In The Sight Of All Israel The Congregation Of The LORD

"Congregation" means the assembled people of Israel gathered as one body.

David turns from Solomon and addresses the entire room.

The charge is not for the new king alone.

Keeping the commandments is placed on everyone standing there.

An obedient king over a disobedient nation would not keep this land.

The inheritance David names belongs to their children, not to them.

👥 Congregation means Israel assembled as one
🔀 David widens the charge past Solomon
🏠 An obedient king needs an obedient nation
📖 The land was held for the children

---
## 👂 In The Audience Of Our God

"Audience" here means hearing, not a crowd of spectators.

David says God is listening to this charge as it is spoken.

The leaders in the room are witnesses on one level.

God is the witness that actually matters.

Ancient covenants were normally sworn before witnesses who could enforce them.

David names the only witness nobody could bribe or outlive.

👂 Audience means hearing, not a crowd
👁️ God is called the true witness
📜 Covenants needed enforcing witnesses
📖 One witness could not be bribed

---
## 🌍 That Ye May Possess This Good Land

Israel already lived in the land at this very moment.

"Possess" here means to keep holding it, not to conquer it fresh.

Deuteronomy repeatedly ties staying in the land to obedience.

Owning land and keeping land were treated as two different things.

The warning quietly predicts the exile that later came true.

Chronicles was written for readers who had already lost that land once.

🏡 Israel already lived in the land
🔒 Possess means keep, not conquer
📉 The warning foreshadows the exile
📖 Its first readers had lost it

# FirstChronicles 28:9-10
# ❤️ Know Thou The God Of Thy Father
---
## 🤝 Know Thou The God Of Thy Father

"Know" in Hebrew means far more than knowing facts about someone.

It carries the sense of personal, lived relationship.

David does not tell Solomon to study God from a distance.

"The God of thy father" names a faith Solomon inherited but did not own.

A father's God has to become the son's God or the line breaks.

🧠 Know means relationship, not facts
👪 Inherited faith is not owned faith
🔁 Each generation must choose again
📖 Solomon had to make it personal

---
## ❤️ Serve Him With A Perfect Heart And With A Willing Mind

"Perfect" here does not mean sinless or flawless.

The Hebrew word means whole, undivided, all of one piece.

A perfect heart is a heart not split between two loyalties.

"Willing mind" means serving because you want to, not because you must.

David names both the heart and the will on purpose.

Duty without desire was never the standard.

🧩 Perfect means whole and undivided
🙌 Willing mind means serving gladly
💔 A split heart fails the standard
📖 God asks for desire, not only duty

---
## 🔍 The LORD Searcheth All Hearts

"Searcheth" pictures examining something carefully, the way one searches a house.

David adds that God understands all the imaginations of the thoughts.

"Imaginations" here means the intentions forming before anyone acts.

God reads motive at the stage nobody else can see it.

For a king, that is a sobering line.

Public obedience cannot cover a private motive.

🏠 Searcheth pictures a careful search
💭 Imaginations means intentions before action
👑 Kings cannot hide motive from God
📖 Private motive matters as much as action

---
## 🚪 If Thou Seek Him, He Will Be Found Of Thee

This is a promise and a warning packed into one sentence.

"Found of thee" means God allows Himself to be found.

Nobody corners God by effort alone.

"Forsake" means to abandon deliberately, not to stumble occasionally.

The opposite of seeking here is not failure, it is walking away.

David is describing the direction of a life, not a single bad day.

🔎 Seeking God is always answered
🎁 Found of thee means God permits it
🚶 Forsake means deliberate abandonment
📖 Direction matters more than one failure

---
## 🏗️ The LORD Hath Chosen Thee To Build An House For The Sanctuary

"Sanctuary" means a holy place set apart, not a general house of worship.

The word points at the innermost holy rooms, not the whole complex.

David tells Solomon the choosing came first, before any building.

Solomon is not volunteering for this work.

"Take heed" means pay careful attention, a warning tucked inside an honor.

Being chosen by God is not the same as being safe.

🏛️ Sanctuary means a holy set apart place
🎯 The choosing came before the work
⚠️ Take heed means pay careful attention
📖 Being chosen carries real weight

---
## 💪 Be Strong, And Do It

This phrase echoes what Moses said to Joshua in Deuteronomy thirty one.

The pattern is the same, an old leader handing unfinished work to a younger one.

Joshua received a land to take, Solomon receives a house to build.

"Be strong" is not a pep talk about confidence.

It means keep going when the work outlasts your enthusiasm.

David knows this job will take Solomon seven full years.

📜 Moses said this same thing to Joshua
🔄 An old leader hands over unfinished work
🏗️ Solomon's task would take seven years
📖 Strength means endurance, not enthusiasm

# FirstChronicles 28:11-13
# 📐 The Pattern Handed To Solomon
---
## 📐 David Gave To Solomon The Pattern Of The Porch

"Pattern" means an architectural plan, a real design to build from.

The same Hebrew word describes the plan God gave Moses for the tabernacle.

Exodus twenty five says Moses was shown a pattern on the mountain.

Solomon is not inventing a temple, he is copying one.

The design came down, it did not come up.

📐 Pattern means an architectural plan
⛰️ Moses received the same kind of plan
📜 Exodus twenty five records that moment
📖 The design came down from God

---
## 🏛️ Of The Houses Thereof, And Of The Treasuries Thereof

"Houses thereof" means the separate rooms and buildings inside the temple complex.

"Treasuries" were secure storerooms for gold, silver, and dedicated gifts.

"Upper chambers" were rooms on a second level above the main hall.

"Inner parlours" means the innermost rooms, the private interior spaces.

The plan covers storage and service rooms, not only the holy places.

Even the closets of God's house were designed on purpose.

🚪 Houses thereof means interior rooms
🔐 Treasuries were secure storerooms
🪜 Upper chambers sat on a second level
📖 Even storage rooms were designed deliberately

---
## 🕊️ The Place Of The Mercy Seat

The "mercy seat" was the solid gold lid covering the ark of the covenant.

Two carved cherubim stood on it with wings spread over the top.

On the Day of Atonement, blood was sprinkled there once a year.

Leviticus sixteen describes that yearly ritual in full.

This one spot was the meeting place between God and Israel.

The whole enormous building existed to house that single lid.

🟨 The mercy seat was the ark's gold lid
🩸 Blood was sprinkled there yearly
📜 Leviticus sixteen describes that ritual
📖 The temple existed to house that spot

---
## 🌬️ The Pattern Of All That He Had By The Spirit

David says the plan came to him by God's Spirit.

This was not architectural talent or personal preference.

"By the spirit" claims a source outside himself.

Exodus thirty one makes the same claim about the tabernacle craftsmen.

God has given design ability directly to people before.

Skill in building is treated here as a spiritual gift.

🌬️ The plan came by God's Spirit
🎨 Design is treated as a gift
🔨 Exodus thirty one names Spirit filled craftsmen
📖 Skill can be given, not only learned

---
## 🎁 The Treasuries Of The Dedicated Things

"Dedicated things" were spoils and gifts set apart for God permanently.

Chapter twenty six names war plunder given by David and his commanders.

Once dedicated, an item could never return to ordinary use.

A separate treasury kept those gifts from mixing with regular funds.

The plan included where holy money would be stored.

Keeping the two apart was itself an act of worship.

🎁 Dedicated things were permanently set apart
⚔️ Much of it came from war spoils
🏦 A separate treasury held them
📖 Holy funds stayed separate on purpose

---
## 🔁 Also For The Courses Of The Priests And The Levites

"Courses" means the twenty four rotating shifts organized in chapter twenty four.

David is handing over the staffing plan along with the blueprint.

A building is not a temple until someone serves inside it.

"Vessels of service" means the physical tools used in worship.

The plan covers the structure, the schedule, and the equipment.

Nothing about the worship of God was left to improvisation.

🗓️ Courses means rotating priestly shifts
👷 Staffing came with the blueprint
🍽️ Vessels means worship tools
📖 Nothing in worship was left improvised

# FirstChronicles 28:14-18
# ⚖️ Gold And Silver Weighed Out Piece By Piece
---
## ⚖️ He Gave Of Gold By Weight For Things Of Gold

"By weight" means every item had a set amount of metal assigned to it.

Gold and silver were measured, not estimated by eye.

Talents and shekels were weights long before they were ever coins.

Specifying weight fixed both the size and the value of each object.

David is not handing over a pile of metal.

He is handing over an itemized account.

⚖️ By weight means exact measured amounts
🪙 Weights fixed size and value
🚫 Nothing was estimated by eye
📖 David handed over precise accounting

---
## 🕯️ Even The Weight For The Candlesticks Of Gold

A "candlestick" here means a lampstand burning olive oil, not a wax candle.

The tabernacle had one golden lampstand with seven branches.

Second Chronicles four says Solomon's temple held ten of them.

Silver lampstands are listed too, likely meant for outer areas.

"According to the use of every candlestick" means weight matched each lamp's job.

Different rooms called for different amounts of light.

🛢️ Candlestick means an oil lampstand
🔟 Solomon's temple held ten of them
🥈 Silver ones served outer areas
📖 Weight matched each lamp's actual purpose

---
## 🍞 The Tables Of Shewbread, For Every Table

"Shewbread" means bread of the presence, twelve loaves set before God.

Leviticus twenty four commands fresh loaves every Sabbath.

Twelve loaves stood for the twelve tribes of Israel.

The tabernacle had one such table, Solomon's temple had several.

Each table needed its own weight of gold assigned to it.

The tribes were represented in bread, before God, without a break.

🍞 Shewbread means bread of the presence
🔢 Twelve loaves stood for twelve tribes
🗓️ Fresh loaves were set each Sabbath
📖 Israel stayed represented before God constantly

---
## 🍴 Pure Gold For The Fleshhooks, And The Bowls, And The Cups

"Fleshhooks" were long forks used to lift meat out of boiling pots.

First Samuel two describes priests using them at the sacrifices.

"Basons" were wide bowls that caught and carried sacrificial blood.

These are butcher tools and cleaning tools, made of solid gold.

The messiest work in the temple used the most valuable metal.

Nothing about serving God was treated as beneath care.

🍖 Fleshhooks lifted meat from boiling pots
🥣 Basons caught sacrificial blood
✨ Even messy tools were solid gold
📖 No task in worship was minor

---
## 🔥 For The Altar Of Incense Refined Gold By Weight

"Refined" means gold purified by fire until other metals burn away.

Refined gold is softer and more valuable than mixed gold.

The altar of incense stood directly in front of the most holy place.

Incense burning there pictured the prayers of the people rising.

Psalm one hundred forty one uses that exact image.

The nearer an object stood to God, the purer its gold had to be.

🔥 Refined means purified by fire
🙏 Incense pictured prayers rising upward
📜 Psalm one forty one uses that image
📖 Nearness to God demanded greater purity

---
## 🛞 The Pattern Of The Chariot Of The Cherubims

The ark is called a chariot here, a word used nowhere else for it.

Cherubim are powerful angelic beings, not the round babies of later art.

Their spread wings formed the seat above the ark.

Ezekiel one later describes God's throne moving on wheels and living creatures.

Calling the ark a chariot says God is not tied to one address.

The throne could move, and one day it would.

🛞 The ark is called a chariot
👼 Cherubim are powerful, not babyish
📜 Ezekiel one describes a moving throne
📖 God's throne was never fixed in place

# FirstChronicles 28:19-21
# 🤲 Be Strong And Do The Work
---
## ✍️ The LORD Made Me Understand In Writing By His Hand Upon Me

David says the plan came to him in written form.

"His hand upon me" is a common phrase for God's power resting on a prophet.

Ezekiel and Elijah both describe the hand of the LORD the same way.

David is claiming this design was revealed, not remembered.

Solomon receives paper, and behind the paper, an authority he cannot argue with.

✍️ The plan arrived in written form
🤚 Hand upon me means God's power
📜 Ezekiel uses the same phrase
📖 The blueprint carried divine authority

---
## 🦁 Be Strong And Of Good Courage, Fear Not, Nor Be Dismayed

"Dismayed" means shattered or broken down by fear, worse than simply afraid.

David stacks four commands into one line for a reason.

He knows Solomon is young and the task is enormous.

First Kings three has Solomon calling himself a little child.

These are the same words God spoke to Joshua before Jericho.

A father is handing his son the exact courage he once needed.

😰 Dismayed means broken by fear
👶 Solomon called himself a little child
📜 Joshua heard these same words
📖 Courage gets passed down deliberately

---
## 🫂 He Will Not Fail Thee, Nor Forsake Thee

"Fail" here means to let go or slacken the grip.

"Forsake" means to abandon and walk away.

The promise covers both a slow drift and a sudden departure.

Deuteronomy thirty one gives this promise to Joshua word for word.

Hebrews thirteen quotes it again for ordinary believers.

One promise carried from Moses to Solomon to the church.

✋ Fail means to loosen a grip
🚪 Forsake means to abandon outright
📜 Moses gave Joshua the same promise
📖 Hebrews thirteen repeats it for everyone

---
## 🧰 Every Willing Skilful Man, For Any Manner Of Service

"Willing" and "skilful" are named here as two separate qualifications.

Skill without willingness builds nothing.

Willingness without skill builds badly.

Exodus thirty five uses the same pair for the tabernacle workers.

David is telling Solomon the workforce is already assembled.

The hardest part of a project is rarely the plan.

🙋 Willing and skilful are separate traits
🔨 Skill alone was never enough
📜 Exodus thirty five names the same pair
📖 The workforce was ready before the work

---
## 🤝 The Princes And All The People Will Be Wholly At Thy Commandment

"Wholly" means completely, with nothing held back.

David closes by promising his son the one thing money cannot buy.

The leaders in this room have already agreed to follow Solomon.

A young king's greatest danger is a divided court.

David spent his final speech removing that danger.

The last gift a father gave was other people's loyalty.

💯 Wholly means completely, nothing withheld
👥 The leaders already agreed to follow
⚔️ A divided court endangers young kings
📖 David's last gift was secured loyalty
`.trim();

export const FIRST_CHRONICLES_TWENTY_EIGHT_PERSONAL_SECTIONS = parseFirstChroniclesTwentyEightRawNotes(
  FIRST_CHRONICLES_TWENTY_EIGHT_RAW_NOTES
);
