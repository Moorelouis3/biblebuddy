export type EzekielFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyFourRawNotes(rawText: string): EzekielFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+44:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 44 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+44:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+44:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 44 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 44,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 44:${startVerse}` : `Ezekiel 44:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 44 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_FOUR_RAW_NOTES = `# Ezekiel 44:1-3
# 🚪 The Shut Gate For The Prince
---
## 🚪 The Gate Of The Outward Sanctuary Which Looketh Toward The East

This is the same outer east gate the glory of the LORD just entered through.

That entrance happened at the very end of chapter forty three.

Outward sanctuary means the outer court, the part of the temple complex ordinary worshippers could reach.

Ezekiel is led back to this exact spot on purpose.

The guide wants him watching this gate specifically, not touring the rest of the grounds.

🚪 Outward sanctuary means the outer court
🔁 Same gate the glory entered before
👁️ Ezekiel is led back here on purpose
📖 This gate is about to carry new meaning

## 🔒 This Gate Shall Be Shut, It Shall Not Be Opened

God himself gives Ezekiel a flat command about this one gate.

No one, not a priest, and not even the prince, will ever walk through it again.

A closed gate like this was never normal in a building meant for daily use.

Its closing marks something that will never repeat, not just a lock on a door.

🚪 God commands this gate closed for good
🚫 No one will ever walk through it again
🔒 Closed gates were never normal in daily life
📖 This closing marks something that never repeats

## 👑 Because The LORD... Hath Entered In By It

This is the reason the gate is sealed, stated outright.

God himself passed through this exact opening when his glory returned to the temple.

That single entrance made the gate too holy for ordinary use ever again.

Once God uses a doorway, it stops being an ordinary doorway.

👑 God passed through this exact gate
✨ That entrance made it uniquely holy
🚪 It can never return to ordinary use
📖 Ordinary things change once God uses them

## 🍞 It Is For The Prince... To Eat Bread Before The LORD

The gate is not completely unused, it has one narrow exception.

The prince refers to a future ruler in this vision.

He serves under God instead of acting like an independent king.

He alone may sit inside the gate's chamber to share a meal in God's presence.

Even this exception stays small compared to what the gate once allowed.

👑 The prince is this vision's future ruler
🍞 He alone may eat here before the LORD
🚪 Even his use stays narrow and limited
📖 One exception does not undo the closing

## 🚶 He Shall Enter By The Way Of The Porch Of That Gate

The porch is the covered entry area attached to the gate structure.

The prince reaches his seat through this side passage, never through the main gate opening itself.

He leaves the same restricted way he came in.

This path keeps him near the gate's holiness without ever crossing the sealed opening God used.

🏛️ Porch means the covered entry structure
🚶 The prince uses a side path only
🔁 He leaves the same restricted way
📖 Nearness to holiness still has real limits

# Ezekiel 44:4-9
# 🌟 Glory Returns, No More Strangers
---
## 🧭 Brought He Me The Way Of The North Gate Before The House

Ezekiel is moved to a different vantage point than the east gate he just saw sealed.

The north gate gives him a fresh, direct view of the temple building's front.

Changing his position lets him witness the same glory from a second angle.

🧭 Ezekiel is moved to a new vantage point
🏛️ The north gate faces the temple's front
👁️ A second angle confirms the same glory
📖 God repeats proof rather than leaving doubt

## ✨ The Glory Of The LORD Filled The House... And I Fell Upon My Face

This is the second time in two chapters this exact scene plays out.

Repeating it this closely is not filler, it confirms chapter forty three's return truly happened.

Falling on his face remains Ezekiel's only fitting response to seeing it.

🔁 This repeats chapter forty three's scene
✅ Repetition confirms the return truly happened
😳 Falling down remains Ezekiel's only response
📖 God makes sure this truth is not missed

## 👀 Mark Well, And Behold With Thine Eyes, And Hear With Thine Ears

Mark well means pay close, careful attention, not a casual glance.

God stacks three separate commands to watch, see, and hear together here.

This introduces a long section of specific rules about to follow.

The stacking signals that what comes next matters enough to demand full attention.

👀 Mark well means pay very close attention
👂 Three commands to watch, see, and hear
📜 This introduces detailed rules ahead
📖 Important instructions get repeated emphasis

## 🚪 The Entering In Of The House, With Every Going Forth Of The Sanctuary

This phrase points ahead to a detailed set of entrance and exit rules covered later in the chapter.

Who can come in, who must stay out, and how people leave are all about to be spelled out.

Even traffic patterns around a holy space carried real meaning in this vision.

🚪 This points to entrance and exit rules
🚶 Who can enter and who must stay out
🔁 Even how people left carried meaning
📖 Traffic patterns here were never random

## ✋ Let It Suffice You Of All Your Abominations

Abominations means things God finds deeply detestable, usually tied to idol worship, not just ordinary mistakes.

Suffice means enough, as in a warning that enough is finally enough.

God calls Israel rebellious before he even lists the specific charge.

This line works like a parent saying enough is enough before explaining what went wrong.

🚫 Abominations means things God finds detestable
✋ Suffice means enough, it stops here
😠 Rebellious names the problem before details
📖 God's patience has a real limit

## ✂️ Strangers, Uncircumcised In Heart, And Uncircumcised In Flesh

Circumcision marked a person as formally included in God's covenant with Israel.

Uncircumcised in flesh means someone who never received that sign at all.

Uncircumcised in heart means someone who even if marked outwardly never actually loved or trusted God.

Letting people without either kind of devotion handle sacred duties polluted the entire sanctuary.

✂️ Circumcision marked covenant membership
🫀 Uncircumcised in heart means no real devotion
🚫 Both kinds were let into sacred duties
📖 Outward signs without inward devotion still fail

## 🤝 They Have Broken My Covenant Because Of All Your Abominations

Covenant means the binding agreement God made with Israel, full of promises on both sides.

Letting outsiders without true devotion handle holy things violated the terms of that agreement.

This was not a small oversight, it broke something formally promised.

🤝 Covenant means a binding agreement with God
💔 This practice broke that agreement's terms
⚠️ It was not a small oversight
📖 Sacred agreements carry real weight

## 📋 Ye Have Set Keepers Of My Charge... For Yourselves

Charge here means a responsibility entrusted to someone else to guard carefully.

Israel was supposed to personally guard God's holy things, not hand that job away.

Instead they appointed their own substitutes to do that sacred work for them.

Outsourcing a responsibility God gave personally was itself part of the failure.

📋 Charge means a responsibility to guard carefully
👤 Israel was meant to guard it personally
🔄 They handed the job to substitutes instead
📖 Outsourcing a sacred duty was itself the failure

## 🚫 No Stranger... Shall Enter Into My Sanctuary

This verse closes the complaint with a permanent new rule.

The exact failure named earlier is now formally banned going forward.

Even a stranger living peacefully among Israel's own people falls under this same restriction.

🚫 This verse bans the exact failure named earlier
🔒 The rule applies going forward, permanently
🏘️ Even strangers living among Israel are included
📖 A named problem gets a lasting fix

# Ezekiel 44:10-14
# ⚖️ The Levites Who Went Astray
---
## 👳 The Levites That Are Gone Away Far From Me... After Their Idols

Levites were the tribe set apart to assist with temple service, one step below the priests.

Some Levites had joined the rest of Israel in worshipping idols during the years leading up to the exile.

This verse names that specific failure before explaining its consequence.

👳 Levites assisted with temple service
🛐 Some Levites had worshipped idols too
📜 This verse names their specific failure
📖 Even temple servants can wander

## ⚖️ They Shall Even Bear Their Iniquity

To bear iniquity means to carry the responsibility and consequence for a sin.

These Levites are not erased from service completely, but they do pay a real price for what they did.

That price is spelled out in the next few verses.

⚖️ Bear iniquity means carry sin's consequence
💔 These Levites pay a real price
📜 That price is spelled out next
📖 Consequences follow even a partial failure

## 🙏 Yet They Shall Be Ministers In My Sanctuary

Yet signals mercy mixed in with the judgment just described.

These Levites keep a real role, they are not thrown out of service entirely.

Mercy and consequence can exist together in the same decision.

🙏 Yet signals mercy inside the judgment
👳 They keep a real role in service
⚖️ Mercy and consequence coexist here
📖 Judgment does not always mean total loss

## 🚪 Having Charge At The Gates Of The House... They Shall Slay The Burnt Offering

Their new assigned duties are specific and limited.

Guarding gates and slaughtering animals for sacrifice were necessary jobs, but not the most sacred ones.

Someone still had to do this work for worship to function at all.

🚪 Guarding the gates was one assigned duty
🔪 Slaying offerings was another assigned duty
🧱 Necessary work, not the most sacred
📖 Every duty still mattered to worship

## 📉 Caused The House Of Israel To Fall Into Iniquity

Their failure was not private, it influenced other people.

Serving idols openly, in view of others, encouraged the whole nation further into sin.

Leaders carry extra weight because their choices do not stay contained to themselves.

👥 Their sin was not private
📉 It helped pull others into idolatry
⚖️ Leaders carry extra responsibility
📖 Influence multiplies the weight of a choice

## ✋ Have I Lifted Up Mine Hand Against Them

Lifting up the hand here pictures making a formal, binding oath, like raising a hand to swear in court.

God is not reacting emotionally, he is issuing an official, lasting decision.

This same phrase marks serious divine oaths elsewhere in scripture.

✋ Lifting the hand pictures a formal oath
⚖️ This is an official decision, not a mood
📜 The same phrase marks oaths elsewhere
📖 God's judgments are not impulsive

## 🚫 They Shall Not Come Near Unto Me, To Do The Office Of A Priest

This is the specific limit placed on these Levites going forward.

They keep their ministry role but lose access to full priestly duties permanently.

The most holy place in particular stays completely off limits to them.

🚫 Full priestly duties are now off limits
🏛️ The most holy place stays closed to them
👳 Their ministry role still continues elsewhere
📖 Consequences can be specific, not total

## 😔 They Shall Bear Their Shame, And Their Abominations

Shame here is not only an emotion, it functions as part of the consequence itself.

Carrying shame publicly reminded this group, and everyone watching, what their idolatry had cost.

A visible consequence teaches a different lesson than a private one.

😔 Shame functions as part of the consequence
👀 It stayed visible to everyone watching
📜 It reminded the group what idolatry cost
📖 A visible consequence teaches by itself

## 🔑 I Will Make Them Keepers Of The Charge Of The House

This closes their story on a settled, permanent assignment rather than open ended punishment.

Their new job covers general service and support work throughout the temple grounds.

A real, lasting place in God's house still remained for them.

🔑 Their new role is settled and permanent
🧹 It covers general service and support work
🏠 They still keep a real place here
📖 Even a limited place can be lasting

# Ezekiel 44:15-16
# 👳 The Sons Of Zadok
---
## 🏆 The Sons Of Zadok, That Kept The Charge Of My Sanctuary

Zadok was a priest who stayed faithful to God during a dangerous power struggle over the throne.

That struggle is recorded in the Book of Kings.

While the rest of the nation drifted into idolatry, Zadok's family line kept doing their assigned duties faithfully.

Loyalty during a hard season now earns this family a lasting reward.

👳 Zadok stayed faithful during a power struggle
🛐 His family kept duties during national idolatry
🏆 Faithfulness now earns a lasting reward
📖 Loyalty in hard seasons is remembered

## ✅ They Shall Come Near To Me To Minister Unto Me

This is the exact privilege the Levites in the verses above lost completely.

Only Zadok's line keeps full access to the most sacred duties, including handling the fat and the blood of offerings.

The same failure led to two very different outcomes.

✅ This is the privilege the other Levites lost
🩸 Handling fat and blood was a top duty
👑 Only Zadok's line keeps full access
📖 The same failure gets two different outcomes

## 🍽️ They Shall Come Near To My Table

My table refers to the altar.

It is pictured here as a place where God and his priests meet closely, almost like sharing a meal together.

This image softens the formality of sacrifice into something closer to relationship.

Zadok's family gets this closeness because they stayed close to God when it was hard to.

🍽️ My table pictures the altar as shared closeness
🤝 Sacrifice here reads as relationship, not distance
👳 This closeness rewards past faithfulness
📖 Nearness to God is never random

# Ezekiel 44:17-19
# 👘 Priestly Garments
---
## 🌿 They Shall Be Clothed With Linen Garments

Linen was a plant based fabric, cool and breathable compared to animal based wool.

Priests wore it specifically while serving inside the most sacred areas of the temple.

The material itself was chosen on purpose, not left to personal preference.

🌿 Linen is a plant based fabric
❄️ It stays cool compared to wool
🏛️ Required specifically in the inner court
📖 Even fabric choice carried intention

## 🐑 No Wool Shall Come Upon Them

Wool comes from sheep, and it traps heat and causes sweating far more than linen does.

Banning wool here connects to the next verse's concern about priests sweating during service.

A small clothing detail protected something bigger about how priests served.

🐑 Wool comes from sheep and traps heat
💦 It causes more sweating than linen
🔗 This connects to the next verse's concern
📖 A small detail protected something bigger

## 🧢 Linen Bonnets Upon Their Heads, And Shall Have Linen Breeches Upon Their Loins

Bonnets here means simple linen head coverings, not decorative hats.

Breeches means an undergarment covering the waist and thighs.

Every piece of the required uniform used the same cool, breathable material.

🧢 Bonnets means simple linen head coverings
👖 Breeches means a linen undergarment
🌿 Every piece used the same material
📖 Consistency mattered down to the undergarments

## 💦 Not Gird Themselves With Any Thing That Causeth Sweat

This explains exactly why wool was banned in the verse before it.

Sweating during sacred service was treated as inappropriate, not simply uncomfortable.

The concern was reverence in God's presence, not comfort for its own sake.

💦 This explains wool's ban from before
🚫 Sweating in service was seen as inappropriate
🙏 Reverence mattered more than comfort
📖 Even perspiration could affect holiness here

## 👔 They Shall Put Off Their Garments... And They Shall Put On Other Garments

Utter court means the outer court, the public area where ordinary people gathered.

Priests had to change clothes completely before stepping into that public space.

The sacred linen never left the holy chambers where it was stored.

🏘️ Utter court means the public outer court
👔 Priests changed clothes before entering it
🗄️ Sacred linen stayed in the holy chambers
📖 Holy items stayed separate from public reach

## ✨ They Shall Not Sanctify The People With Their Garments

Sanctify means to make something holy or set apart.

Some apparently believed simply touching sacred clothing could transfer holiness to an ordinary person.

This verse corrects that assumption directly.

✨ Sanctify means to make something holy
🙅 Clothing alone could not transfer holiness
📜 This verse corrects that assumption
📖 Holiness does not spread by touch alone

# Ezekiel 44:20-22
# 📏 Rules For Daily Priestly Life
---
## ✂️ Neither Shall They Shave Their Heads, Nor Suffer Their Locks To Grow Long

Shaving the head completely was a mourning or pagan worship practice in surrounding cultures.

Letting hair grow long and wild could signal neglect or an unusual vow.

Priests were told to avoid both extremes.

✂️ Shaving the head marked pagan mourning rites
🌱 Long wild hair could signal neglect
⚖️ Priests were told to avoid both extremes
📖 Even grooming reflected priestly order

## ✂️ They Shall Only Poll Their Heads

Poll here means a simple, regular trim, neither shaved nor overgrown.

This kept priests looking orderly without copying pagan mourning customs.

A small habit like a haircut still reflected the balance this chapter is built on.

✂️ Poll means a simple regular trim
🙅 It avoided copying pagan customs
⚖️ It kept priests looking orderly
📖 Even haircuts reflected priestly balance

## 🍷 Neither Shall Any Priest Drink Wine, When They Enter Into The Inner Court

This rule is specific to active duty inside the inner court, not a lifetime ban on wine itself.

A clear mind mattered during sacred service, since mistakes in that role carried real consequences.

A similar wine restriction appears earlier for priests in the Book of Leviticus.

🍷 This bans wine during inner court duty
🧠 A clear mind mattered during sacred service
📜 Leviticus gives a similar earlier restriction
📖 Service required full, sober attention

## 💍 Neither Shall They Take For Their Wives A Widow, Nor Her That Is Put Away

Put away refers to a divorced woman in this context.

These marriage restrictions applied specifically to priests, not to the rest of Israel's men.

The goal was keeping the priestly household itself set apart, the same way the temple was set apart.

💍 Put away means a divorced woman here
👳 These rules applied specifically to priests
🏠 The priestly household was also set apart
📖 Holiness reached into daily family life

## 💍 A Widow That Had A Priest Before

This one narrow exception allowed marrying the widow of a previous priest.

That specific widow already understood and had lived inside the expectations of priestly life.

A small exception like this still fit the larger pattern of protecting the priesthood's integrity.

💍 One exception, a former priest's widow
🧠 She already understood priestly life
🧩 It still fit the larger protective pattern
📖 Even exceptions served the same purpose

# Ezekiel 44:23-27
# ⚖️ Teaching, Judging, And Staying Clean
---
## 📏 Teach My People The Difference Between The Holy And Profane

Profane here does not mean cursing, it means ordinary or common, the opposite of holy.

Priests carried real teaching responsibility, not only ritual duties.

Ordinary people depended on priests to understand this difference correctly in daily life.

📏 Profane means ordinary, not cursing
👳 Priests carried real teaching duties
🧠 People depended on them to understand this
📖 Holiness required ongoing instruction

## 🔍 Cause Them To Discern Between The Unclean And The Clean

Discern means to recognize a real difference, not guess at one.

Clean and unclean rules covered food, illness, and ritual situations throughout the Law.

Getting this wrong could mean unknowingly bringing impurity into worship.

🔍 Discern means recognize a real difference
🍽️ Clean and unclean rules covered many areas
⚠️ Getting it wrong risked worship itself
📖 Right teaching protected the whole community

## ⚖️ In Controversy They Shall Stand In Judgment

Priests also served as judges for disputes among the people, beyond their temple duties.

They were expected to rule by God's own standards, not personal opinion.

This gave the priesthood real civic responsibility, not just ceremonial duty.

⚖️ Priests also judged disputes among people
📜 They ruled by God's standards, not opinion
🏛️ This gave them real civic responsibility
📖 Holiness and justice were never separated

## 🕯️ They Shall Hallow My Sabbaths

Hallow means to treat as holy and set apart from ordinary days.

Priests were responsible for modeling proper sabbath observance for everyone else.

Keeping this one responsibility protected a rhythm God had built into the whole nation's life.

🕯️ Hallow means treat as holy
👳 Priests modeled sabbath keeping for others
📅 Sabbath was a rhythm for national life
📖 Leaders model the habits they teach

## ⚰️ They Shall Come At No Dead Person To Defile Themselves

Contact with a dead body made a person ceremonially unclean under the Law.

Priests were held to a stricter standard here than ordinary Israelites.

Their constant nearness to holy things explains why.

⚰️ Dead bodies caused ceremonial uncleanness
👳 Priests held to a stricter standard
🏛️ Their nearness to holy things explains why
📖 Greater access came with greater restriction

## 👨‍👩‍👧 But For Father, Or For Mother, Or For Son, Or For Daughter

Immediate family created one clear, limited exception to the rule above.

Grief for a close family member outweighed the usual purity concern in this specific case.

Even a strict rule like this still made room for real human compassion.

👨‍👩‍👧 Immediate family was one clear exception
😢 Grief outweighed purity rules here
❤️ Strict holiness still allowed compassion
📖 Mercy was written into the Law itself

## ⏳ After He Is Cleansed, They Shall Reckon Unto Him Seven Days

Reckon means to count out a specific waiting period.

Even after the required cleansing ritual, a priest stayed outside full temple service for seven more days.

Seven days echoes the same complete cycle seen throughout this entire vision.

🔢 Reckon means to count out a period
⏳ Seven extra days followed the cleansing
🔁 Seven echoes this vision's complete cycles
📖 Full restoration here was never instant

## 🐑 He Shall Offer His Sin Offering

Even a priest returning from a permitted, compassionate exception still needed a sin offering before resuming service.

This was not about blaming him for mourning his family.

It shows how seriously this vision treats the boundary between death and holy ground, no matter the reason crossed.

🐑 A sin offering was still required
❤️ This was not blame for mourning
⚖️ Death and holiness were kept apart
📖 Even sympathetic cases followed the same pattern

# Ezekiel 44:28-31
# 🎁 The Priests' Inheritance
---
## 🙌 I Am Their Inheritance... I Am Their Possession

Inheritance usually meant land passed down through a family in Israel.

Priests received no land allotment at all when the twelve tribes divided the territory.

Instead, God himself is named as what they receive in its place.

🗺️ Inheritance usually meant family land
🚫 Priests received no land allotment
🙌 God himself is named as their portion
📖 Nearness to God replaced owning ground

## 🍖 They Shall Eat The Meat Offering, And The Sin Offering, And The Trespass Offering

Certain portions of these offerings were set aside by law for the priests to eat as food.

This is the practical way God's promise in the verse before actually provided for daily life.

Owning no land did not mean going without provision.

🍖 Set offering portions were food for priests
🙌 This is how God's promise provided for them
🚫 No land did not mean no provision
📖 God's provision can look different than expected

## 🌾 The First Of All The Firstfruits Of All Things... Shall Be The Priest's

Firstfruits means the very first and best portion of a harvest, given before anyone used the rest.

Oblation means a gift formally offered to God.

Giving the first portion rather than the leftovers was itself an act of trust.

🌾 Firstfruits means the first, best harvest
🎁 Oblation means a gift offered to God
🙏 Giving first, not leftover, showed trust
📖 Priority in giving reflects priority of love

## 🍞 Give Unto The Priest The First Of Your Dough, That He May Cause The Blessing To Rest

This specific gift of dough connects a person's ordinary household giving to a real spiritual outcome.

Supporting God's priests was tied directly to inviting blessing into one's own home.

Generosity here was never framed as a loss, but as an open door.

🍞 The dough gift was a household offering
🙏 It connected giving to inviting blessing
🚪 Generosity was framed as an open door
📖 Supporting God's work blesses the giver too

## 💀 Not Eat Of Any Thing That Is Dead Of Itself, Or Torn

Dead of itself means an animal that died naturally or from disease, not a proper sacrifice.

Torn means killed by a wild predator rather than slaughtered correctly.

Both kinds of meat still carried blood handled improperly, which the Law treated as unclean.

Priests held the highest standard in the land because of how closely they served.

💀 Dead of itself means died naturally or sick
🐺 Torn means killed by a predator
🩸 Both left blood handled improperly
📖 Closest service required the highest standard`.trim();

export const EZEKIEL_FORTY_FOUR_PERSONAL_SECTIONS = parseEzekielFortyFourRawNotes(EZEKIEL_FORTY_FOUR_RAW_NOTES);
