export type ActsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsSevenRawNotes(rawText: string): ActsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 7:${startVerse}` : `Acts 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Acts 7 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_SEVEN_RAW_NOTES = `# Acts 7:1-3
# ⚖️ Stephen Begins His Defense
---
## ⚖️ Are These Things So

The high priest opens Stephen's trial with this one question.

Chapter six ended with false witnesses accusing Stephen of blasphemy against Moses and the temple.

These things points back to that exact charge.

Stephen does not panic or back down.

He answers instead with the longest speech in the whole book of Acts.

⚖️ The high priest opens the trial
📜 These things means the chapter six charge
🗣️ Stephen gives the longest speech in Acts
📖 He answers calmly, not in panic

---
## 🤝 Men, Brethren, And Fathers, Hearken

Stephen opens with respect, not defiance.

Brethren means fellow Jews, the ordinary members of the crowd.

Fathers means the elders and leaders of the council itself.

Hearken is an old word for pay close attention.

Stephen wants the whole room listening before he builds his case from their own scriptures.

🤝 Brethren means the ordinary crowd
👴 Fathers means the council's elders
👂 Hearken means pay close attention
📖 Stephen builds his case from their own scriptures

---
## ✨ The God Of Glory Appeared Unto Our Father Abraham

Stephen starts the story long before the charge against him, with Abraham.

God of glory names God's majesty, not a lesser vision or a dream.

Abraham was father to this entire Jewish audience, not only to Stephen.

This meeting happened while Abraham was still in Mesopotamia, before he ever reached the city of Charran.

Stephen is already rooting his whole defense in Israel's own earliest history.

✨ God of glory means a real majestic appearance
👴 Abraham is father to the whole room
🗺️ Mesopotamia lay between two great rivers
📖 Stephen roots his case in Israel's own history

---
## 🚶 Get Thee Out Of Thy Country, And From Thy Kindred

God's call to Abraham demanded leaving everything familiar.

Country meant his homeland, kindred meant his extended family and clan.

In the ancient world, identity was tied to land and family far more than it is today.

Leaving both meant giving up protection, inheritance, and belonging all at once.

Abraham obeyed before God even named the destination.

🚶 Country meant homeland, kindred meant family
🏠 Identity was tied to land and family
⚠️ Leaving both meant losing real protection
📖 Abraham obeyed before knowing the destination

# Acts 7:4-8
# 📜 The Promise Before The Child
---
## 🏺 Then Came He Out Of The Land Of The Chaldaeans, And Dwelt In Charran

The Chaldaeans were the people of the region around Ur, in southern Mesopotamia.

Abraham's family left that land and settled for a time in Charran, also called Haran.

Charran sat further northwest, along the route toward Canaan.

This was only a stop along the way, not the final destination.

🏺 Chaldaeans were the people of Ur
🗺️ Charran sat northwest, along the route
🚶 Charran was a stop, not the end
📖 The real destination was still ahead

---
## 🗺️ When His Father Was Dead, He Removed Him Into This Land

This land refers to Canaan, the land the council's own ancestors still lived in.

Genesis records Abraham's father, Terah, living to a very old age.

Some ancient manuscripts give Terah's age at death differently than others.

Many scholars believe that difference explains why Stephen's timeline here reads slightly differently than a plain reading of Genesis.

Stephen is not inventing a new story, he is following a version of the record his audience would have recognized.

🗺️ This land means Canaan itself
👴 Terah was Abraham's father
📜 Ancient manuscripts differ slightly on his age
📖 Stephen follows a record his audience knew

---
## 🚫 He Gave Him None Inheritance In It, No, Not So Much As To Set His Foot On

God promised Abraham this entire land, yet Abraham never owned even a small plot of it.

He lived there as a stranger his whole life, pitching tents rather than building a permanent home.

The promise was real, but its fulfillment was not immediate.

Faith here meant trusting a promise that would not be kept in the believer's own lifetime.

🚫 Abraham never owned any of it
⛺ He lived there as a stranger
⏳ The promise was real but delayed
📖 Faith meant trusting beyond his own lifetime

---
## 👶 Yet He Promised To Give It To Him And To His Seed, When As Yet He Had No Child

Seed means descendants, the children and grandchildren who would come after Abraham.

God made this promise while Abraham had no children at all.

That detail matters because it means the promise rested entirely on God's word, not on anything Abraham could already see.

Faith had to carry the weight that evidence could not yet provide.

🌳 Seed means Abraham's future descendants
👶 Abraham had no children yet
🙏 The promise rested on God's word alone
📖 Faith carried what evidence could not yet show

---
## ⛓️ His Seed Should Sojourn In A Strange Land, And Be Entreated Evil Four Hundred Years

Sojourn means to live somewhere for a time without belonging there permanently.

The strange land refers to Egypt, where Abraham's descendants would eventually move.

Bondage means slavery, and entreat them evil means they would be treated cruelly.

Four hundred years is a long, round figure for the length of that hardship, matching a related number in Genesis.

God told Abraham about this suffering centuries before any of it happened.

🌍 Sojourn means living somewhere without belonging
🔗 Bondage and cruelty point to Egypt
⏳ Four hundred years spans a long hardship
📖 God named the suffering centuries early

---
## ⚖️ The Nation To Whom They Shall Be In Bondage Will I Judge

God promised judgment on Egypt long before Moses was even born.

Will I judge means God himself would hold that nation accountable for its cruelty.

The exodus plagues, centuries later, were the fulfillment of this exact promise.

God's patience with evil is never the same as ignoring it.

⚖️ God promised to judge Egypt himself
⏳ The promise came centuries before Moses
🌊 The exodus plagues fulfilled this word
📖 Patience with evil is not ignoring it

---
## ✂️ He Gave Him The Covenant Of Circumcision

Circumcision was the physical sign marking a man as part of God's covenant people.

It was performed on the eighth day after a baby boy's birth.

The covenant itself was the promise and relationship, circumcision was only its outward mark.

This sign connected every male descendant physically to Abraham's original promise.

✂️ Circumcision was the covenant's physical sign
📅 It happened on the eighth day
🤝 The covenant was the promise itself
📖 The sign connected every generation to Abraham

---
## 🌳 Abraham Begat Isaac, And Isaac Begat Jacob, And Jacob Begat The Twelve Patriarchs

This short genealogy moves quickly through three generations in one verse.

Isaac was the promised son, born after years of waiting.

Jacob later had twelve sons, whose families became the twelve tribes of Israel.

Patriarchs here simply means these founding fathers of the nation.

Stephen is reminding the council that the whole nation sitting in judgment of him traces back to this same promise.

👨‍👦 Three generations move by in one verse
⏳ Isaac was the long awaited promised son
🌳 Jacob's twelve sons became twelve tribes
📖 The council traces back to this promise

# Acts 7:9-16
# 🌾 From Egypt Rescue To A Grave In Canaan
---
## 👥 The Patriarchs, Moved With Envy, Sold Joseph Into Egypt

The patriarchs here means Joseph's own brothers, the sons of Jacob.

Envy means a bitter jealousy over Joseph's favoured place in the family.

Selling a brother into slavery was a severe betrayal, not a petty argument.

Stephen compresses the whole story from Genesis into one short, honest sentence.

👥 Patriarchs means Joseph's own brothers
💔 Envy means bitter jealousy
⛓️ Selling him was a severe betrayal
📖 Stephen compresses the whole story honestly

---
## 🙏 But God Was With Him

This short line carries the whole turning point of Joseph's story.

Every betrayal Joseph suffered did not remove God's presence from his life.

Stephen is already building toward a pattern, a chosen man rejected by his own people yet still used by God.

That exact pattern is about to repeat with Moses, and again with Jesus himself.

🙏 God never left Joseph
🔁 Rejection did not cancel God's purpose
➡️ The same pattern repeats with Moses
📖 It also points forward to Jesus

---
## ⛓️ Delivered Him Out Of All His Afflictions

Afflictions here covers the betrayal by his brothers, slavery, and false imprisonment Joseph suffered in Egypt.

Delivered means rescued, though the rescue did not happen quickly.

Joseph spent years in these hard circumstances first.

God's deliverance in Joseph's story came gradually, through real suffering, not instantly.

The same slow pattern of deliverance through hardship will repeat with Moses and with Israel as a whole nation.

⛓️ Afflictions covers betrayal, slavery, and prison
⏳ Deliverance came gradually, not instantly
😔 Real suffering came before the rescue
📖 This same pattern repeats with Moses

---
## 🤝 Gave Him Favour And Wisdom In The Sight Of Pharaoh

Favour means Pharaoh's unusual goodwill toward a foreign slave.

Wisdom here means the practical skill Joseph showed in managing Egypt's resources.

Pharaoh made Joseph governor, meaning ruler, over the entire country.

A prisoner with no status became the second most powerful man in Egypt.

🤝 Favour means Pharaoh's unusual goodwill
💡 Wisdom means real practical skill
👑 Governor means ruler over all Egypt
📖 A prisoner became Egypt's top ruler

---
## 🌾 A Dearth Over All The Land Of Egypt And Chanaan

Dearth means a severe famine, a shortage of food across the whole region.

Chanaan, usually spelled Canaan, was the land where Jacob's family still lived.

Sustenance means basic food needed to survive.

This same famine is what eventually pushes Jacob's whole family toward Egypt.

🌾 Dearth means a severe famine
🗺️ Chanaan is the usual spelling Canaan
🍞 Sustenance means basic food to survive
📖 The famine pushes the family toward Egypt

---
## 👴 Jacob Sent Out Our Fathers First

Jacob sent his older sons to Egypt to buy grain during the famine.

He did not go himself and did not yet send Benjamin, his youngest.

This first trip is where Joseph first recognizes his brothers, though they do not recognize him.

Family caution and old grief both shape Jacob's careful decision here.

🌾 The sons went to buy grain
👴 Jacob stayed behind himself
👀 Joseph recognized them, they did not recognize him
📖 Old grief shaped Jacob's caution

---
## 🎭 At The Second Time Joseph Was Made Known To His Brethren

Made known means revealed, Joseph finally tells his brothers who he really is.

This happens on their second trip to Egypt, not the first.

Joseph's kindred, meaning his whole family line, becomes known to Pharaoh at the same time.

A secret kept through years of suffering and power is finally brought into the open.

🎭 Made known means Joseph reveals himself
🔁 It happens on the second trip
👑 Pharaoh learns of Joseph's family too
📖 A long secret comes into the open

---
## 🔢 All His Kindred, Threescore And Fifteen Souls

Threescore and fifteen is an old way of counting, meaning seventy five.

Souls here simply means people, counting every member of the traveling family.

This number differs slightly from the seventy given in Genesis.

Stephen is likely using a Greek Old Testament count that includes a few extra names.

Either way, the point is the same, a small family group moved into Egypt.

🔢 Threescore and fifteen means seventy five
👪 Souls means every person counted
📜 Greek Old Testament counts a few more names
📖 A small family group entered Egypt

---
## ⚰️ Jacob Went Down Into Egypt, And Died

Jacob spent his final years in Egypt, not in the promised land.

Genesis records that he still asked to be buried back in Canaan.

Our fathers here means the rest of the family who died in Egypt over the generations that followed.

The promise of the land had not disappeared, even though none of them lived to possess it yet.

⚰️ Jacob died in Egypt, not Canaan
🙏 He still asked to be buried home
👪 Our fathers means the generations after him
📖 The promise outlived every one of them

---
## 🏙️ Carried Over Into Sychem, And Laid In The Sepulchre That Abraham Bought

Sychem, usually spelled Shechem, was a city in the heart of Canaan.

Sepulchre means a burial tomb, in this case one purchased generations earlier.

Stephen's account here blends two separate burial traditions from Genesis.

Jacob was buried near Hebron, while Joseph's bones were later buried at Shechem.

Many scholars believe Stephen is summarizing the family's overall burial story in Canaan.

He is not giving a separate account for each patriarch.

Emmor, the father of Sychem, was the local ruler Abraham originally bought the land from.

🏙️ Sychem is usually spelled Shechem
⚰️ Sepulchre means a burial tomb
📜 Stephen blends two separate burial traditions
📖 The land promise reached even into death

# Acts 7:17-19
# 👶 A King Who Did Not Know Joseph
---
## ⏳ The Time Of The Promise Drew Nigh

Drew nigh is an old way of saying came close.

The promise refers back to God's word to Abraham in verses six and seven.

That word named four hundred years of hardship, followed by deliverance.

The people grew and multiplied means the small family of seventy five had become a large nation by this point.

Growth itself was part of the promise beginning to come true.

⏳ Drew nigh means came close
📜 The promise points back to verse six
🌱 The family grew into a nation
📖 Growth was the promise starting to work

---
## 👑 Another King Arose, Which Knew Not Joseph

Generations had passed since Joseph served as governor of Egypt.

A new king, often called a new Pharaoh, had no personal memory or loyalty tied to Joseph's legacy.

Without that old connection, the Israelites lost their protected status in Egypt.

Favour that depends on one person's memory rarely survives that person's death.

👑 A new king had no memory of Joseph
⏳ Generations had passed since then
🛡️ Their protected status disappeared with him
📖 Favour tied to memory rarely lasts

---
## 🐍 Dealt Subtilly With Our Kindred, And Evil Entreated Our Fathers

Subtilly is an old spelling of subtly, meaning cunning or deceptive.

This king did not attack Israel openly at first, he worked against them cleverly.

Evil entreated means they were treated with cruelty, likely through forced labor and harsh conditions.

Oppression often begins quietly before it turns openly violent.

🐍 Subtilly means cunning or deceptive
🙈 He did not attack them openly at first
⛓️ Evil entreated means cruel treatment
📖 Oppression often starts quiet before turning violent

---
## 👶 Cast Out Their Young Children, To The End They Might Not Live

This describes a policy of killing Israelite infants to control the nation's growth.

To the end they might not live means the purpose was to prevent these babies from surviving at all.

Exodus records this as part of Pharaoh's broader plan against the Israelites.

Moses himself was born directly into this exact danger.

👶 This describes killing Israelite infants
🎯 The goal was stopping their survival
📜 Exodus records this same policy
📖 Moses was born right into this danger

# Acts 7:20-22
# 👑 Moses Raised In Pharaoh's House
---
## 👶 Moses Was Born, And Was Exceeding Fair

Exceeding fair means unusually beautiful or well formed, even as a newborn.

Exodus describes his parents, Amram and Jochebed, noticing this about him right away.

This detail is not vanity.

It sets up why his family found him so hard to give up to the river.

A child's appearance becomes part of the reason his story survives at all.

👶 Exceeding fair means unusually beautiful
👪 His parents were Amram and Jochebed
💔 It explains their hard choice later
📖 His appearance became part of his survival

---
## 🏠 Nourished Up In His Father's House Three Months

His parents hid him at home for three months.

They risked their own lives under the infant death order from verse nineteen.

Nourished simply means cared for and raised during this time.

Three months was as long as they could realistically keep the secret.

Courage here looked like quiet, risky, everyday care, not a dramatic rescue.

🏠 His parents hid him at home
⚠️ They risked their lives under that order
⏳ Three months was as long as possible
📖 Courage looked like quiet daily risk

---
## 🌊 When He Was Cast Out, Pharaoh's Daughter Took Him Up

Cast out here refers to Moses being placed in the river, as told in Exodus, not abandonment out of cruelty.

Pharaoh's daughter rescued him and raised him as her own son inside the Egyptian royal household.

The very king's family that ordered Israelite deaths ended up raising Israel's future deliverer.

God placed Moses at the center of the system that would one day fall because of him.

🌊 Cast out means placed in the river
👑 Pharaoh's daughter raised him as her own
🔄 The oppressor's house raised the deliverer
📖 God placed him inside the very system

---
## 📚 Learned In All The Wisdom Of The Egyptians, And Mighty In Words And In Deeds

Egyptian education at this level covered law, administration, and strategy at the highest level available anywhere in the ancient world.

Mighty in words and in deeds means Moses became a capable speaker and an effective leader.

This forty year Egyptian upbringing prepared him with real skills long before God called him at the burning bush.

God does not waste the years spent in unexpected places.

📚 Egyptian education was the best available
🗣️ Mighty in words means a strong speaker
💪 Mighty in deeds means an effective leader
📖 God used those years later

# Acts 7:23-29
# 🔥 Moses Flees To Midian
---
## 🔢 When He Was Full Forty Years Old

Stephen divides Moses' life into three clean forty year periods, Egypt, Midian, and the wilderness.

This first forty years covers his upbringing inside Pharaoh's household.

Forty is used elsewhere in scripture to mark a complete season of testing or preparation.

Moses spends the first third of his life simply growing into who he will become.

🔢 Moses' life divides into three forty year spans
👑 The first covers his years in Egypt
⏳ Forty often marks a season of preparation
📖 This is only his first third

---
## ❤️ It Came Into His Heart To Visit His Brethren

Despite his Egyptian upbringing, Moses still identifies the Israelites as his own people.

Brethren here means his own Hebrew kinsmen, not the Egyptians who raised him.

This visit was a deliberate choice, not an accident.

Identity by birth outlasted decades of Egyptian education and comfort.

❤️ Moses still claimed Israel as his own
👥 Brethren means his Hebrew kinsmen
🎯 This was a deliberate choice
📖 Birth identity outlasted Egyptian comfort

---
## ⚔️ Seeing One Of Them Suffer Wrong, He Defended Him, And Smote The Egyptian

Moses witnesses an Egyptian mistreating a fellow Hebrew.

Smote means he struck the Egyptian, and Exodus confirms the blow was fatal.

Moses acted on real compassion, but he acted alone and violently, without any calling from God yet.

Good instincts without God's timing can still lead to real damage.

⚔️ Smote means he struck a fatal blow
❤️ His motive was real compassion
⏰ He acted without God's timing or call
📖 Good instincts alone can still cause harm

---
## 🤔 He Supposed His Brethren Would Have Understood, But They Understood Not

Moses assumed his own people would immediately recognize him as their coming deliverer.

They did not, and his actions the next day only confirm that misunderstanding.

Being chosen by God does not guarantee that others will recognize it right away.

Moses will spend forty more years waiting before this calling becomes undeniable to everyone, including himself.

🤔 Moses expected to be recognized
❌ His own people did not see it
⏳ Calling is not always obvious to others
📖 Forty more years would pass first

---
## 🤝 Sirs, Ye Are Brethren, Why Do Ye Wrong One To Another

The next day, Moses tries to make peace between two fighting Hebrews.

Ye are brethren reminds them that they belong to the same oppressed people and should not be fighting each other.

Moses is already showing the instinct of a mediator, not just a fighter.

That same instinct will define much of his later role leading Israel through the wilderness.

🤝 Moses tries to make peace this time
👥 He reminds them they are brethren
⚖️ He acts as a mediator, not a fighter
📖 This instinct defines his later leadership

---
## 👤 Who Made Thee A Ruler And A Judge Over Us

The man being corrected rejects Moses' authority outright.

This question is sharp and personal, challenging Moses' right to intervene at all.

Stephen is deliberately echoing this same rejection, since Israel is about to do the same thing to Jesus centuries later.

A chosen deliverer rejected by his own people becomes a repeating pattern across scripture.

❌ The man rejects Moses' authority
🗣️ The question is sharp and personal
🔁 Stephen is echoing a repeating pattern
📖 Israel later rejects Jesus the same way

---
## 🏃 Then Fled Moses, And Was A Stranger In The Land Of Madian

Fled means Moses ran for his life once word of the killing spread.

Madian, usually spelled Midian, was a region east of Egypt, across the Red Sea.

Stranger here means he lived there as a foreigner with no status or inheritance.

Abraham once lived the same way in Canaan.

Moses begat two sons there, beginning a quiet, hidden family life far from Egypt's palace.

🏃 Fled means running for his life
🗺️ Madian, or Midian, lay east of Egypt
🧍 Stranger means a foreigner with no status
📖 A hidden family life began there

---
## 🙏 Where He Begat Two Sons

Exodus names these two sons as Gershom and Eliezer.

Gershom's name reflects the word stranger, matching Moses' own description of himself as a stranger in Midian.

Eliezer's name means my God is help, naming God's rescue of Moses from Pharaoh.

Even the children's names quietly tell Moses' own story.

👶 Exodus names them Gershom and Eliezer
🧍 Gershom's name echoes the word stranger
🙏 Eliezer's name means my God is help
📖 Even their names tell Moses' story

# Acts 7:30-34
# 🔥 The Burning Bush
---
## 🔢 When Forty Years Were Expired

This marks the end of Moses' second forty year span, his years as a shepherd in Midian.

Expired here simply means completed, not expired in the modern sense of spoiled or invalid.

An entire adult lifetime passed in quiet obscurity before God called him again.

God's timing often looks like delay from the inside and preparation from the outside.

🔢 This ends Moses' second forty years
⏳ Expired here means completed
🐑 He spent it quietly as a shepherd
📖 Delay from inside is preparation from outside

---
## 🔥 An Angel Of The Lord In A Flame Of Fire In A Bush

Mount Sina, usually spelled Sinai, was the mountain where God would later give the law.

A flame of fire in a bush means fire that did not consume the plant.

That was an unmistakable sign, this was no ordinary fire.

Angel of the Lord in passages like this often means a direct appearance of God himself.

It does not mean a separate created being.

The place and the sign together announce that something entirely outside nature is happening.

🏔️ Sinai is where the law was later given
🔥 The fire burned without consuming the bush
👼 Angel of the Lord can mean God himself
📖 Nature itself was interrupted here

---
## 😲 Moses Wondered At The Sight, And Drew Near To Behold It

Wondered means Moses was amazed, not frightened yet.

Drew near shows simple human curiosity pulling him toward something unexplainable.

God often meets people in the middle of an ordinary task, here a shepherd simply tending his flock.

Curiosity, not already having a plan, is what put Moses in the right place to hear God speak.

😲 Wondered means amazed, not yet afraid
👣 Drew near shows simple curiosity
🐑 God met him during an ordinary task
📖 Curiosity put him in the right place

---
## 👴 I Am The God Of Abraham, And Of Isaac, And Of Jacob

God identifies himself by naming three generations by name, Abraham, Isaac, and Jacob.

This is not a new or foreign god speaking.

It is the same God from the promise given back in verses two through eight.

Trembled means Moses shook with reverent fear.

Durst not behold means he did not dare look directly at the sight any longer.

👴 God names three generations by name
🔗 The same God from the earlier promise
😨 Trembled means shook with reverent fear
📖 He no longer dared to look

---
## 👣 Put Off Thy Shoes From Thy Feet, For The Place Is Holy Ground

Removing shoes was a sign of respect and humility in the ancient Near East, much like removing a hat today.

Holy ground means this ground was set apart by God's own presence, not something special in the dirt itself.

The holiness came entirely from who was present, not from the location on a map.

Any place becomes holy the moment God chooses to meet someone there.

👣 Removing shoes showed respect and humility
📍 Holy ground means set apart by God's presence
🙏 The holiness came from God, not the dirt
📖 God's presence makes a place holy

---
## 👀 I Have Seen, I Have Seen The Affliction Of My People

The repeated phrase, I have seen, I have seen, emphasizes just how closely God had been watching Israel's suffering.

Groaning describes the sound of people in deep, ongoing pain.

Am come down to deliver them shows God stepping personally into the problem, not sending deliverance from a distance.

God's silence during four hundred years of hardship was never the same as God's absence.

👀 The repeated phrase shows close attention
😢 Groaning means deep, ongoing pain
⬇️ God came down personally to act
📖 Silence was never the same as absence

# Acts 7:35-38
# 🕊️ Moses The Rejected Deliverer
---
## 🔁 This Moses Whom They Refused, The Same Did God Send

Stephen deliberately repeats the same rejection line from verse twenty seven.

The man Israel rejected as a ruler is the exact man God chose to send as ruler and deliverer.

Human rejection and divine appointment can sit on the very same person at the very same time.

Stephen is building toward the obvious comparison his audience cannot yet admit, Jesus faced this same pattern.

🔁 Stephen repeats the earlier rejection
❌ Israel rejected the man God chose
✅ Rejection did not cancel the appointment
📖 Jesus faced this same pattern later

---
## ⚡ Shewed Wonders And Signs In Egypt, In The Red Sea, And In The Wilderness

Wonders and signs means miraculous acts that proved God's power was behind Moses.

These miracles covered three settings.

Egypt during the plagues, the Red Sea at the crossing, and the wilderness for forty years.

Signs always pointed past Moses himself, toward the God who sent him.

A miracle without that pointing would only be a magic trick, not a sign.

⚡ Wonders and signs proved God's power
🗺️ They spanned Egypt, the sea, and the wilderness
👆 Signs always pointed past Moses to God
📖 A sign must point beyond itself

---
## 🔮 A Prophet Shall The Lord Your God Raise Up Unto You, Like Unto Me

Moses himself predicted that God would send another prophet like him someday.

Like unto me means this future prophet would share Moses' role as a mediator between God and the people.

Jewish teaching already expected this promise to point to a specific, future figure.

Stephen's audience would have instantly recognized this as a direct claim that Jesus is that promised prophet.

🔮 Moses predicted a future prophet like himself
🤝 That prophet would mediate between God and people
📜 Jewish teaching expected a specific figure
📖 Stephen points this straight at Jesus

---
## ✋ By The Hand Of The Angel Which Appeared To Him In The Bush

This phrase ties Moses' whole mission directly back to the burning bush scene in verses thirty and thirty one.

By the hand means through the agency or power of that same messenger.

Stephen is showing his listeners that Moses' authority did not come from himself.

It came from that one specific divine encounter.

A calling traced back to a real moment is harder to dismiss than a vague claim.

🔥 This ties back to the burning bush
✋ By the hand means through that messenger
🙏 Moses' authority came from that encounter
📖 A traceable calling is harder to dismiss

---
## 📜 Received The Lively Oracles To Give Unto Us

Lively oracles is an old phrase meaning living, active words from God.

This refers to the law given to Moses at Mount Sinai.

It was God's own living instruction, not a dead set of old rules.

The church in the wilderness simply means the gathered assembly of Israel during their wilderness years.

Stephen is reminding the council that the law itself was never meant to be a lifeless, fixed tradition.

📜 Lively oracles means living, active words
🏔️ This refers to the law from Sinai
⛺ Church in the wilderness means Israel's assembly
📖 The law was never meant lifeless

# Acts 7:39-43
# 🐂 The Golden Calf And Its Judgment
---
## 🔁 Our Fathers Would Not Obey, But Thrust Him From Them

Stephen turns the word refused from verse thirty five into a wider pattern covering the whole wilderness generation.

Thrust him from them means they actively pushed Moses' leadership away in their hearts.

This rejection did not stop at one incident, it became a recurring attitude.

Stephen is building a case that resisting God's chosen messengers has deep roots in Israel's history.

🔁 Rejection becomes a wider, recurring pattern
🙅 Thrust him from them means active resistance
⏳ It was not a single incident
📖 Resisting messengers has deep historical roots

---
## 💔 In Their Hearts Turned Back Again Into Egypt

Physically, the people were still in the wilderness heading toward the promised land.

In their hearts means their desires and loyalty had already reversed direction.

Turning back toward Egypt meant longing for slavery's familiar comfort over freedom's hard uncertainty.

A heart can travel backward even while the feet keep moving forward.

🚶 Their bodies still moved toward Canaan
💔 Their hearts had already turned back
⛓️ They longed for Egypt's familiar comfort
📖 Hearts can turn back while feet walk on

---
## 👁️ Make Us Gods To Go Before Us

With Moses away on the mountain, the people demanded a visible god they could see and follow.

We wot not what is become of him means they did not know what happened to him.

That uncertainty made them grow impatient.

This demand came from Aaron, the very man left in charge while Moses was gone.

Impatience with an unseen God often looks for a shortcut into something visible instead.

👁️ They wanted a god they could see
⏳ Wot not means simply did not know
👤 Aaron was the leader left in charge
📖 Impatience looks for visible shortcuts

---
## 🐂 Made A Calf, And Rejoiced In The Works Of Their Own Hands

The calf was shaped from melted gold jewelry, likely styled after Egyptian bull idols the people had seen before.

Offered sacrifice unto the idol means they treated this man made object as worthy of worship.

Works of their own hands is a pointed phrase.

This was not a rescuing god, just an object they built themselves.

Worshiping something you built yourself is worship aimed in exactly the wrong direction.

🐂 The calf copied Egyptian bull idols
🙌 They worshiped an object they built
🔨 Their own hands made this idol
📖 Worship aimed at yourself misses God

---
## ⭐ God Turned, And Gave Them Up To Worship The Host Of Heaven

Host of heaven refers to the sun, moon, and stars, worshiped as gods by many surrounding nations.

Gave them up means God let the consequences of their choice run their natural course.

God did not force them to stop.

Stephen quotes the prophet Amos here.

Idol worship was not one failure, it was a pattern across generations.

Letting people experience the weight of their own choices is itself a form of judgment.

⭐ Host of heaven means sun, moon, and stars
🔄 Gave them up means letting consequences run
📜 Stephen quotes the prophet Amos
📖 Experiencing consequences can itself be judgment

---
## 🏛️ The Tabernacle Of Moloch, And I Will Carry You Away Beyond Babylon

Moloch was a pagan god associated with child sacrifice in the ancient Near East.

Remphan likely refers to a star deity, possibly linked to a planet in some ancient traditions.

Carry you away beyond Babylon points to the later exile.

Israel was forcibly removed from their own land for this same pattern of idolatry.

The golden calf in the wilderness and the exile centuries later are connected by the exact same root problem.

🔥 Moloch was linked to child sacrifice
⭐ Remphan likely named a star deity
🏛️ Babylon points to the later exile
📖 One root problem spans centuries

# Acts 7:44-50
# ⛺ A God Who Will Not Be Boxed In
---
## ⛺ The Tabernacle Of Witness, According To The Fashion That He Had Seen

Tabernacle of witness was the portable tent of worship built during Israel's wilderness years.

Fashion that he had seen means an exact pattern God showed Moses.

He built it to match that pattern, not his own design.

This detail matters because it proves true worship follows God's instructions, not human preference or creativity.

The tabernacle traveled with the people instead of tying worship to one fixed location.

⛺ Tabernacle of witness means the wilderness worship tent
📐 Fashion means an exact pattern from God
🚫 It was not Moses' own design
📖 True worship follows God's instructions

---
## 📜 Our Fathers Brought In With Jesus Into The Possession Of The Gentiles

Jesus here is simply an older English spelling of Joshua, the leader after Moses.

Possession of the Gentiles refers to the land of Canaan, previously occupied by other nations.

Drave out means God forced those nations out ahead of Israel's arrival.

This was Joshua's generation entering the promised land, centuries before the Jesus the council was accusing Stephen of preaching.

📜 Jesus here is an old spelling of Joshua
🗺️ Possession of the Gentiles means Canaan
⚔️ Drave out means God forced nations out
📖 This Joshua is not the gospel Jesus

---
## ⚔️ Whom God Drave Out Before The Face Of Our Fathers

Drave out means forcibly removed, an old past tense of drive.

Before the face of our fathers means this happened while the Israelites themselves watched it unfold.

The conquest of Canaan was not something Israel accomplished purely by its own military strength.

Stephen credits God directly for clearing the land ahead of the people's arrival.

⚔️ Drave out means forcibly removed
👀 It happened while Israel watched
💪 It was not Israel's strength alone
📖 God is credited for clearing the land

---
## 👑 Unto The Days Of David, Who Found Favour Before God

Several generations pass quickly between Joshua's conquest and King David's reign.

Found favour means David was specifically approved and blessed by God.

David desired to build a permanent tabernacle, a fixed house of worship, for God.

Good intentions, even from a favoured king, are not the same as God's actual instruction.

⏳ Generations pass quickly in this verse
👑 Favour means God's specific approval
🏗️ David wanted a permanent house of worship
📖 Good intentions are not instruction

---
## 🏛️ But Solomon Built Him An House

This house refers to the temple in Jerusalem, built after David's death.

David was not permitted to build it himself, that task passed to his son Solomon instead.

This temple stood as the center of Jewish worship for centuries, until the council Stephen now faces.

Stephen's own accusers are fiercely protective of this exact building.

🏛️ This house means the Jerusalem temple
👑 Solomon, not David, actually built it
⏳ It stood as the center for centuries
📖 The council defends this exact building

---
## 🙌 The Most High Dwelleth Not In Temples Made With Hands

This is the turning point of Stephen's whole speech.

Dwelleth not means God's presence was never actually confined inside any building, even the temple itself.

Made with hands is the exact phrase the council accused Stephen of using against the temple.

Now Stephen uses that same phrase himself, quoting scripture.

Stephen is not attacking the temple, he is reminding the room what even Solomon already admitted when he dedicated it.

🏛️ God was never confined to one building
✋ Made with hands is the council's own accusation
📜 Stephen quotes scripture, not his own idea
📖 Even Solomon admitted this at the dedication

---
## 🌌 Heaven Is My Throne, And Earth Is My Footstool

This is a direct quotation from the prophet Isaiah.

Throne and footstool together picture God's rule as larger than the entire universe, let alone one building.

What house will ye build me is a question with an obvious answer, no human structure could ever contain God.

The whole point of the quotation is scale, nothing built by hands could ever be big enough for God.

📜 Stephen quotes the prophet Isaiah directly
🌌 Throne and footstool picture God's total rule
🏗️ No human structure could contain God
📖 The quotation is entirely about scale

---
## ✋ Hath Not My Hand Made All These Things

This closing question reverses the whole argument about buildings made by human hands.

God's own hand made everything that exists, including the materials any temple is built from.

The true maker does not need to live inside something made by the things he created.

Stephen ends this long historical review by pointing straight at the God who cannot be boxed into any single place.

✋ God's hand made everything that exists
🏗️ The temple's own materials came from God
🚫 The maker need not live inside his creation
📖 God cannot be boxed into one place

# Acts 7:51-53
# 😤 Stephen Turns The Charge Around
---
## 🐂 Ye Stiffnecked And Uncircumcised In Heart And Ears

Stiffnecked is an old image for stubbornness, like an animal that refuses to turn its neck toward its master.

Uncircumcised in heart and ears does not mean a physical lack, every man in that room was circumcised.

It means their hearts and ears had not truly been changed or set apart.

Their bodies still carried the covenant sign.

Stephen is making the sharpest possible accusation, that the outward sign never reached the inward reality.

🐂 Stiffnecked pictures stubborn refusal
❤️ Uncircumcised in heart means unchanged inside
👂 Uncircumcised in ears means unwilling to truly listen
📖 The sign never reached the inside

---
## 🙅 Ye Do Always Resist The Holy Ghost, As Your Fathers Did, So Do Ye

Stephen directly connects this council to every act of rebellion traced through his entire speech.

Resist the Holy Ghost means actively fighting against God's own guidance and correction.

As your fathers did, so do ye closes the pattern from this whole speech.

Rejection repeats across every single generation, since Abraham.

This is the exact moment the speech stops being history and becomes a direct accusation.

🔁 Stephen connects them to the whole pattern
🙅 Resist the Holy Ghost means active rebellion
👴 Fathers and sons repeat the same rejection
📖 History becomes direct accusation here

---
## ❓ Which Of The Prophets Have Not Your Fathers Persecuted

This is not a real question, it expects the answer none.

Persecuted means harassed, attacked, or killed for speaking God's word.

The Just One refers to Jesus, described this way elsewhere in Acts as the sinless, righteous one.

Stephen names his audience's ancestors as the same people who killed those who predicted Jesus.

He now accuses this council of killing Jesus himself.

❓ The question expects the answer none
⚔️ Persecuted means attacked for God's word
✝️ The Just One means Jesus
📖 Stephen names them betrayers and murderers

---
## 👼 Received The Law By The Disposition Of Angels, And Have Not Kept It

Disposition of angels reflects a Jewish tradition that angels were present when God gave the law to Moses at Sinai.

Receiving the law this way made it an extraordinary gift, not an ordinary human tradition.

Have not kept it is the final charge.

The very law they claim to defend so fiercely, they have failed to obey themselves.

Stephen's whole defense ends by turning the original blasphemy charge back onto the council itself.

👼 Disposition of angels means angels were present
🎁 The law was an extraordinary gift
🚫 Have not kept it is the final charge
📖 The charge turns back onto the council

# Acts 7:54-56
# 😇 Heaven Opens
---
## 💔 Cut To The Heart, And They Gnashed On Him With Their Teeth

Cut to the heart describes a deep, painful emotional reaction, here used negatively rather than leading to repentance.

Gnashed with their teeth is a physical picture of furious rage, grinding teeth in anger rather than grief.

The same phrase, cut to the heart, is used positively in Acts two when the crowd repents after Peter's sermon.

Here the identical reaction turns toward violence instead of toward God.

💔 Cut to the heart means deep emotional pain
😡 Gnashed teeth pictures furious rage
🔁 The same phrase appears in Acts two
📖 This time it turns toward violence

---
## 👀 Full Of The Holy Ghost, Looked Up Stedfastly Into Heaven

Full of the Holy Ghost repeats the exact description first given of Stephen back in chapter six.

Stedfastly means with a steady, unwavering gaze, the same word used of the council staring at him earlier.

In the most violent moment of his life, Stephen's attention is fixed entirely upward, not on the angry crowd.

Where someone looks in a crisis often reveals where their real security lies.

🕊️ This repeats his chapter six description
👀 Stedfastly means a steady, unwavering gaze
⬆️ His attention stayed fixed upward
📖 A crisis reveals where real security lies

---
## 🤝 Saw The Glory Of God, And Jesus Standing On The Right Hand Of God

The right hand of God was the position of highest honor and authority next to a king.

Standing here is unusual, since Jesus is more often described as sitting at God's right hand in other passages.

Many scholars believe Jesus is pictured standing here specifically to welcome Stephen, like rising to receive an honored guest.

Stephen sees, in his final moments, exactly who he has been defending this whole speech.

👑 The right hand meant highest honor
🧍 Standing here is unusual compared to other passages
🤝 It likely pictures Jesus rising to welcome him
📖 Stephen sees who he has been defending

---
## 🌌 I See The Heavens Opened, And The Son Of Man Standing On The Right Hand Of God

Son of man is the same title Jesus used for himself throughout the gospels.

This is the only place in the entire book of Acts where someone besides Jesus uses this specific title.

Opened heavens is a rare and significant image in scripture, marking a direct, visible connection between heaven and earth.

Stephen names exactly what he sees, out loud, in front of the very council that condemned Jesus for similar claims.

🔑 Son of man is Jesus' own chosen title
🙋 Only Stephen ever uses this title
🌌 Opened heavens pictures a rare direct connection
📖 Stephen says this out loud before the council

# Acts 7:57-60
# 🪦 Stephen's Death
---
## 👂 Cried Out With A Loud Voice, And Stopped Their Ears

Stopped their ears means they physically covered their ears, refusing to hear another word.

This action pictures exactly what Stephen already accused them of, being uncircumcised in the ears back in verse fifty one.

With one accord means the whole group moved together as a single, unified mob.

They are living out the very charge Stephen just brought against them.

👂 Stopped their ears means refusing to listen
🔁 This matches Stephen's own earlier charge
👥 One accord means the mob moved as one
📖 They proved the charge true by acting

---
## ⚖️ Cast Him Out Of The City, And Stoned Him

Stoning was the legal penalty for blasphemy under Jewish law.

Cast him out of the city follows the same law, since executions by stoning happened outside the city walls.

What follows reads more like a mob killing than a legal execution.

No trial or Roman authority is mentioned here at all.

The form of the law was used, but the spirit of justice was not.

⚖️ Stoning was the legal penalty for blasphemy
🚪 Executions happened outside the city walls
😡 This reads like a mob, not a trial
📖 The form of law was used, not justice

---
## 👤 The Witnesses Laid Down Their Clothes At A Young Man's Feet, Whose Name Was Saul

Removing outer clothing made the violent work of stoning easier to carry out.

Laying clothes at Saul's feet suggests Saul held some position of respect or oversight among those present.

This is the first mention of Saul in the entire book of Acts, later known as the apostle Paul.

The man who approved Stephen's death will soon become one of the most important missionaries in Christian history.

👕 Removing clothes made the stoning easier
👤 Saul held some respected position there
📖 This is Saul's first appearance in Acts
➡️ He will soon become the apostle Paul

---
## 🙏 Calling Upon God, And Saying, Lord Jesus, Receive My Spirit

Stephen prays directly to Jesus while he is being killed, treating him as fully God.

Receive my spirit echoes words Jesus himself spoke on the cross, committing his spirit to the Father.

Stephen's final prayer shows exactly who he believed was waiting for him on the other side of death.

Stephen traced one pattern through his whole speech, a rejected deliverer who is really God's chosen one.

That same pattern becomes true for Stephen's own death.

🙏 Stephen prays directly to Jesus
✝️ His words echo Jesus on the cross
❤️ This shows Stephen's belief about Jesus
📖 Stephen's own pattern becomes true for him

---
## 😴 Lord, Lay Not This Sin To Their Charge

Stephen's final words are a prayer of forgiveness for the very people killing him.

Lay not this sin to their charge means asking God not to hold this specific act against them.

This directly mirrors Jesus' own prayer from the cross, asking the Father to forgive those responsible for his death.

Fell asleep is a gentle phrase for death.

Early Christians used it because they believed death was not the end of the story.

🙏 Stephen prays forgiveness for his killers
✝️ This mirrors Jesus' prayer on the cross
😴 Fell asleep is a gentle word for death
📖 Christians saw death as not the end
`.trim();

export const ACTS_SEVEN_PERSONAL_SECTIONS = parseActsSevenRawNotes(ACTS_SEVEN_RAW_NOTES);
