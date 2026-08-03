export type LeviticusSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusSixteenRawNotes(rawText: string): LeviticusSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 16:${startVerse}` : `Leviticus 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Leviticus 16 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_SIXTEEN_RAW_NOTES = `# Leviticus 16:1-2
# ⚱️ After The Death Of The Two Sons Of Aaron
---
## ⚰️ After The Death Of The Two Sons Of Aaron

This law comes right after a tragedy.

Nadab and Abihu were Aaron's own sons.

They offered fire the LORD never commanded.

Both died instantly inside the tabernacle.

That death is the reason this whole chapter exists.

⚰️ Nadab and Abihu died suddenly

🔥 They offered fire God never commanded

📜 Their deaths caused this whole chapter

📖 God now protects the next priest

## 🚪 Come Not At All Times Into The Holy Place Within The Vail

The vail was a thick curtain.

It sealed off the innermost room of the tabernacle.

That room held the ark of the covenant.

Even Aaron could not walk in whenever he wanted.

Entering carelessly was not just rude.

It could cost him his life.

🚪 Vail means the sealing curtain

🏛️ It guarded the innermost room

⚠️ Even Aaron needed a reason to enter

📖 Careless entry risked death itself

## 🛐 Before The Mercy Seat, Which Is Upon The Ark

The mercy seat was a solid gold lid.

It covered the ark of the covenant.

Two carved cherubim faced each other on top of it.

Israel believed this was the exact place God's throne rested on earth.

One room held the single most sacred object in the whole nation.

🏆 Mercy seat means the gold lid

📦 It rested on top of the ark

👑 Considered God's throne on earth

📖 The most sacred object in Israel

## ☁️ I Will Appear In The Cloud Upon The Mercy Seat

God announces He will show up in a cloud.

This is the same cloud of glory that filled the tabernacle in Exodus forty.

It was not a symbol or a figure of speech.

God's actual presence would rest right there.

That is exactly why entering without care was so dangerous.

☁️ Same cloud that filled the tabernacle

🙌 Not a symbol, an actual presence

⚡ Explains why care mattered so much

📖 God's presence made the room deadly

# Leviticus 16:3-5
# 👕 Plain Linen, Not Royal Robes
---
## 🐂 With A Young Bullock For A Sin Offering, And A Ram For A Burnt Offering

Aaron must deal with his own sin first.

A bullock is a young bull, used here as his sin offering.

A ram covers his own burnt offering.

The order matters.

An unclean priest could never make anyone else clean.

🐂 Bullock means a young bull

🐏 Covers Aaron's own sin first

📜 Order matters before helping others

📖 An unclean priest cannot cleanse others

## 👔 The Holy Linen Coat

This is a deliberate downgrade.

Aaron's everyday robes were gold, blue, purple, and scarlet.

Exodus twenty eight calls them garments of glory and beauty.

On this one day he sets all of that aside.

Plain white linen replaces it, head to foot.

👔 Normal robes were gold and jeweled

🤍 Plain linen replaces it today

📉 A deliberate downgrade, not an accident

📖 Humility fits this one sacred day

## 🧵 The Linen Breeches Upon His Flesh

Breeches were simple undergarments, not decorative at all.

A girdle was a cloth belt tied at the waist.

A mitre was a wrapped linen headpiece, not a jeweled crown.

Every piece named here is plain and functional.

Nothing about this outfit was meant to impress anyone.

🧵 Breeches were plain, simple undergarments

🪢 Girdle means a tied cloth belt

🧢 Mitre means a wrapped linen headpiece

📖 Nothing about this outfit impressed anyone

## 🙇 These Are Holy Garments

Plain does not mean less holy.

These linen clothes are still set apart for this use alone.

The plainest clothing Aaron owns is also his most sacred clothing.

Humility and holiness are not opposites here.

They are worn on the same body on the same day.

🙇 Plain does not mean less holy

🗓️ Reserved for this one sacred day

⚖️ Humility and holiness work together

📖 The plainest clothes are the holiest

## 🛁 Therefore Shall He Wash His Flesh In Water, And So Put Them On

A full wash comes before the clothes go on, not after.

Aaron approaches this day already cleansed.

Then he covers that cleansing with plain linen.

The order pictures a man stripped down to basic purity.

Nothing about the day starts with appearance.

🛁 A full wash happens first

🧼 Purity comes before the clothing

🖼️ Pictures a man stripped to basics

📖 The day starts with purity, not appearance

## 🐐 Two Kids Of The Goats For A Sin Offering, And One Ram For A Burnt Offering

Once Aaron's own offerings are set, the nation's animals get named.

Two young goats are provided for the people's sin offering.

A ram covers the people's burnt offering.

Two goats for one sin offering is unusual.

The next section explains exactly why two are needed.

🐐 Two young goats for the people

🐏 One ram for their burnt offering

❓ Two goats for one offering is unusual

📖 The next verses explain why

# Leviticus 16:6-10
# 🎲 Two Goats, One Lot
---
## ⚖️ Make An Atonement For Himself, And For His House

Atonement means covering sin so it no longer blocks a relationship with God.

This covers Aaron personally.

It also covers his whole household, including his surviving sons.

No one gets a free pass around this requirement.

Not even the high priest's own family.

⚖️ Atonement means covering sin before God

🏠 Covers Aaron's whole household too

🚫 No exemption, not even for family

📖 Everyone needed the same covering

## 🚪 Present Them Before The LORD At The Door Of The Tabernacle Of The Congregation

Both goats are brought to the same entrance together.

This happens before anyone knows which goat will do what.

Neither goat is chosen by looks or health.

The real decision happens next.

It is not Aaron's decision to make.

⛺ Both goats brought to one entrance

👀 Neither goat is preselected by looks

🎯 The real decision comes next

📖 The choice belongs to God, not Aaron

## 🎲 Aaron Shall Cast Lots Upon The Two Goats

Casting lots was an accepted ancient method for making a decision.

It likely used marked stones or sticks, thrown or drawn.

The method let God decide, not human judgment.

The Old Testament uses this same method elsewhere.

Dividing the promised land and choosing Saul as king both used it.

🎲 Casting lots means drawing marked stones

🙌 It removed human judgment completely

🗺️ Used elsewhere for major decisions

📖 God decided the outcome, not Aaron

## 🕊️ One Lot For The LORD, And The Other Lot For The Scapegoat

Scapegoat translates a Hebrew word scholars still debate.

It likely means the goat that goes away.

One goat's fate is death as a sacrifice.

The other goat's fate is to carry sin away alive.

God decided both outcomes before anyone knew which was which.

🕊️ Scapegoat likely means goat of removal

☠️ One goat dies as a sacrifice

🚶 The other carries sin away alive

📖 God fixed both outcomes by lot

## 🩸 The Goat Upon Which The LORD's Lot Fell, Offer Him For A Sin Offering

The goat marked for the LORD is slaughtered as the sin offering.

Its blood is carried into the Most Holy Place.

This goat's death does the covering.

The other goat still waiting does something different with that same sin.

🩸 This goat dies as the sin offering

🏛️ Its blood enters the Most Holy Place

🔀 The other goat handles sin differently

📖 One death covers the whole nation

## 🕊️ Presented Alive Before The LORD, To Make An Atonement With Him

The second goat is formally presented alive before the LORD.

Verse seven already showed both goats presented this same way.

Its role in the atonement is fixed right here.

The actual sending away does not happen until later in the chapter.

🕊️ Presented alive, matching verse seven

📜 Its role is fixed at this moment

⏳ The release still waits for later

📖 Atonement can happen before the act

## 🐐 To Let Him Go For A Scapegoat Into The Wilderness

This second goat is never killed.

It stays alive and waits to be released later in the chapter.

Two goats give two pictures of the same forgiveness.

One goat shows sin being paid for.

The other shows sin being carried away and gone for good.

🐐 This goat stays alive the whole time

🖼️ One goat pictures payment for sin

🚶 The other pictures sin carried away

📖 Together they picture whole forgiveness

# Leviticus 16:11-14
# 🩸 Behind The Veil
---
## 🐂 Kill The Bullock Of The Sin Offering Which Is For Himself

Before Aaron carries blood behind the vail, he kills his own bullock first.

This bullock covers his own sin, not the nation's.

He cannot represent the people while his own sin sits unresolved.

The order in the text is not random.

It is the required sequence every single year.

🐂 His own bullock is killed first

🙋 He deals with his own sin first

📜 The order is required, not random

📖 He must be clean before serving others

## 🔥 A Censer Full Of Burning Coals Of Fire

A censer is a small metal pan for carrying hot coals.

Sweet incense beaten small means fragrant resin ground into fine powder.

Exodus thirty already describes this exact incense recipe.

Aaron carries both toward the one room no one else may enter.

🔥 Censer means a small firepan

🌿 Incense beaten small means ground fragrant resin

📖 Exodus thirty gives this same recipe

➡️ Both are carried toward the one forbidden room

## 🚪 Bring It Within The Vail

This is the moment Aaron physically crosses the curtain.

He enters the Most Holy Place, the one room reserved for God's presence.

This crossing marks the point of no return for the whole ceremony.

Only one man, on one day of the year, ever stood here.

🚪 The exact moment he crosses the curtain

🔒 The point of no return begins here

📅 Only one day a year allowed this

📖 One man stood where no one else could

## ☁️ That The Cloud Of The Incense May Cover The Mercy Seat, That He Die Not

The rising smoke forms a cloud that hides the mercy seat from view.

Exodus thirty three already warned that no one can see God's face and live.

This cloud is a real, physical safeguard against that exact danger.

It is not decoration.

It is protection.

☁️ Smoke hides the mercy seat from view

👁️ Recalls Exodus, no one sees God's face

🛡️ A real safeguard, not decoration

📖 The smoke protects Aaron's life

## ✋ Sprinkle It With His Finger Upon The Mercy Seat Eastward

Aaron applies the blood with his own finger, not a tool.

He places it directly on top of the mercy seat, facing east.

This is the first of two separate blood applications in this same verse.

Every motion here follows an exact, required pattern.

✋ Applied with his own finger

📍 Placed on the mercy seat facing east

☝️ The first of two applications

📖 Every motion follows an exact pattern

## 🩸 Before The Mercy Seat Shall He Sprinkle Seven Times

A second, separate application follows the first one.

This time the blood goes in front of the mercy seat, not on top of it.

It is repeated seven times, the number the Bible often uses for completeness.

This is the single most sacred blood application performed anywhere in Israel's worship.

🔁 A second, separate application follows

🔢 Seven times signals full completeness

🏆 The most sacred blood act in Israel

📖 Completeness matters more than repetition alone

# Leviticus 16:15-19
# 🩸 Cleansing Holy Place, Tent, And Altar
---
## 🐐 Kill The Goat Of The Sin Offering, That Is For The People

The same process just done for Aaron is now repeated.

This time it happens for the whole nation, not just the high priest.

Same room, same mercy seat, same sevenfold sprinkling.

Only the person being covered has changed.

🐐 The same process repeats for the people

🔁 Same room, same mercy seat, same pattern

👥 The nation's sin is covered this time

📖 One pattern covers every kind of sin

## 🏛️ Make An Atonement For The Holy Place, Because Of The Uncleanness Of The Children Of Israel

Notice what gets cleansed here.

Not just people, but the holy place itself.

A year of Israel's sin was pictured as contaminating God's own dwelling.

That contamination required its own yearly cleansing, separate from the people's.

🏛️ The holy place itself needed cleansing

🧼 A year of sin contaminated the space

📅 This is why the day repeats yearly

📖 Even God's dwelling needed covering

## ⛺ That Remaineth Among Them In The Midst Of Their Uncleanness

This closing phrase is easy to skim past.

It says something remarkable.

God's tent stayed among an imperfect, sinning people all year long.

This entire ceremony exists because God chose closeness over distance.

⛺ God's tent stayed among the people

💛 God chose closeness, not distance

📜 This ceremony protects that nearness

📖 The chapter exists because God stayed

## 🚫 There Shall Be No Man In The Tabernacle Of The Congregation When He Goeth In

While Aaron performs this innermost act, everyone else must leave the tent.

Even the other priests are sent out.

No one may witness or help with this specific task.

It belongs to Aaron alone, for the sake of everyone else.

🚫 Everyone else leaves, priests included

👤 This act belongs to Aaron alone

🙏 He stands in for the whole nation

📖 Some moments cannot be shared

## 🐮 He Shall Go Out Unto The Altar, And Make An Atonement For It

After finishing inside, Aaron moves back out to the courtyard.

He applies blood at the bronze altar there too.

The same cleansing now moves from the innermost room to the most public space.

One connected ritual ties the whole tabernacle together.

🐮 He moves from inside to the courtyard

📤 Cleansing spreads from private to public

🔗 One ritual ties the tabernacle together

📖 Holiness reaches every part of the space

## 🐮 Put It Upon The Horns Of The Altar Round About

The horns were four projecting corners built onto the altar's top.

They were shaped like animal horns.

These were considered the altar's most sacred points.

Applying blood there marked the altar's most significant spots on purpose.

🐮 Horns means the altar's four corners

📍 Considered the altar's most sacred points

🎯 Blood is placed there on purpose

📖 The most sacred spots get the most care

## 🔢 Sprinkle Of The Blood Upon It Seven Times, And Cleanse It, And Hallow It

A separate sevenfold sprinkling follows the horns application.

Hallow means to formally declare something holy.

The altar is not just cleaned here.

It is set apart again for holy use.

🔢 A separate sevenfold sprinkling follows

📜 Hallow means declared officially holy

🧼 The altar is cleansed, not just wiped

📖 The altar returns fit for holy use

# Leviticus 16:20-22
# 🐐 The Scapegoat Sent Away
---
## 🤲 Aaron Shall Lay Both His Hands Upon The Head Of The Live Goat

Other offerings in Leviticus use only one hand for this gesture.

Using both hands here signals something unusually deliberate.

This goat is still alive, not being killed.

The weight of this moment is heavier than a routine offering.

🤲 Most offerings use only one hand

✋ Both hands here means real weight

🐐 The goat stays alive through this

📖 Some moments carry more weight than others

## 🗣️ Confess Over Him All The Iniquities Of The Children Of Israel

Aaron speaks the nation's sins out loud over the goat.

The text pictures those sins as being moved onto the animal's head.

This is the clearest single picture in the Old Testament of sin transferred onto a substitute.

Words here are not just symbolic.

They mark a real transfer in the story's own logic.

🗣️ Sins are spoken aloud over the goat

📦 The text pictures sin moving onto it

🖼️ The clearest Old Testament picture of substitution

📖 A substitute carries what people cannot

## 🚶 Send Him Away By The Hand Of A Fit Man Into The Wilderness

A specifically chosen man gets this job, not a random bystander.

Fit means suited and ready for hard, physical work.

Walking a goat into open wilderness and returning safely took real strength.

This was demanding labor, not a symbolic errand.

🚶 A chosen man, not a volunteer

💪 Fit means physically ready for the task

🏜️ The trip demanded real strength

📖 Even this errand required careful choosing

## 🏜️ Bear Upon Him All Their Iniquities Unto A Land Not Inhabited

The goat carries the confessed sins into empty, uninhabited land.

That land sits as far from the camp as this picture could reach.

The camp's center held God's own dwelling.

In this image, sin is not just covered.

It is carried away and gone.

🏜️ Released into empty, uninhabited land

📏 As far from the camp as possible

✅ Sin pictured as carried away, not hidden

📖 Removal completes what covering started

# Leviticus 16:23-28
# 🧼 Undressing, Washing, Burning
---
## 👔 Put Off The Linen Garments, And Shall Leave Them There

Aaron removes the plain linen he wore into the Most Holy Place.

He leaves it behind in the tabernacle itself.

These garments were used for this one task only.

They were never worn again for ordinary use.

👔 The linen stays behind in the tabernacle

🔒 Reserved only for this one task

🗓️ Fresh linen would be needed next year

📖 Some clothing exists for one moment only

## 🛁 Wash His Flesh With Water In The Holy Place, And Put On His Garments

A second full wash happens here, separate from the earlier one.

Aaron then changes back into his normal, colorful priestly clothing.

Verse four already set those garments aside for this moment.

The most sacred part of the day is now finished.

He returns to his everyday priestly role.

🛁 A second full wash, separate from before

👑 He returns to his normal robes

🔁 Marks the shift back to ordinary duty

📖 Sacred moments end, ordinary duty resumes

## 🔥 Offer His Burnt Offering, And The Burnt Offering Of The People

Only now do the burnt offerings finally get offered.

These are the same rams named back in verses three and five.

A burnt offering pictures complete dedication to God.

It fittingly comes after the sin problem is already resolved.

🔥 The burnt offerings come only now

🐏 These rams were named earlier in the chapter

🙌 Burnt offerings picture full dedication

📖 Dedication follows once sin is resolved

## 🔥 The Fat Of The Sin Offering Shall He Burn Upon The Altar

The fat portions of the sin offering animals are burned separately.

This follows the same pattern already used for ordinary sin offerings.

Leviticus four describes that same fat burning pattern.

Even this unique day still follows familiar sacrificial rules.

🔥 Fat portions are burned on the altar

🔗 Matches the pattern from Leviticus four

📜 Even this rare day follows familiar rules

📖 Consistency runs through the whole system

## 👕 He That Let Go The Goat For The Scapegoat Shall Wash His Clothes

Even the man whose only job was walking the goat out must wash.

He must wash before returning to the camp.

Contact with the sin carrying goat still required cleansing.

The same rule applies elsewhere in Leviticus for uncleanness.

👕 Even the goat handler must wash

🔗 The same cleansing rule applies elsewhere

🐐 Contact with the goat still counted

📖 No task here was truly minor

## 🚶 Shall One Carry Forth Without The Camp

Without the camp names a specific place, not a vague direction.

It means outside the boundary where the community and God's tent both sat.

Remains this significant could not stay inside the camp in any form.

Even as ashes waiting to be dealt with, they had to leave.

🚶 A specific place outside the camp's edge

🏕️ Sin bearing remains could not stay inside

📍 Location carried real theological weight

📖 Even ashes could not remain within

## 🔥 They Shall Burn In The Fire Their Skins, And Their Flesh, And Their Dung

The bullock and the goat's remains are burned completely.

Skin, meat, and waste, everything is included.

Many ordinary sin offerings let the priests eat part of the meat.

Nothing from an offering this significant could be eaten at all.

🔥 Every part is burned completely

🍽️ Priests do not eat any of this one

⚖️ Reflects how uniquely serious this offering was

📖 Total burning matched total seriousness

## 👕 He That Burneth Them Shall Wash His Clothes, And Bathe His Flesh In Water

A third person in this chapter now has to wash too.

First Aaron, then the goat handler, now the one who burns the remains.

Anyone who touches something tied to this day's sin offerings must cleanse before returning.

The pattern repeats on purpose.

👕 A third person required to wash

🔁 Contact with sin required cleansing every time

📜 The rule applied to everyone, not only Aaron

📖 Holiness applied evenly across every role

# Leviticus 16:29-31
# 📅 A Statute Forever
---
## 📆 In The Seventh Month, On The Tenth Day Of The Month

Israel's religious year begins in spring, with Passover in the first month.

Counting forward, the seventh month falls in early autumn.

This exact date became fixed forever.

Today it is still observed as Yom Kippur, the Day of Atonement.

📆 Israel's year began in spring

🍂 The seventh month falls in autumn

🕯️ Still observed today as Yom Kippur

📖 One fixed date carries the whole meaning

## 😔 Ye Shall Afflict Your Souls

Afflict your souls is the Bible's standard phrase for fasting and serious self denial.

It does not mean physical self harm.

This single day each year required this from absolutely everyone.

The weight of the day matched the weight of what happened at the tabernacle.

😔 Afflict your souls means fasting and self denial

🚫 Not a call to physical harm

📅 Required of everyone, one day a year

📖 The fast matched the day's seriousness

## 🌍 Whether It Be One Of Your Own Country, Or A Stranger That Sojourneth Among You

This command reaches beyond native born Israelites.

It includes any foreign resident living long term among them.

No one living within the community was exempt.

Birth and background made no difference on this one day.

🌍 Includes foreign residents living among Israel

🚫 No exemption based on birth

👥 The whole community observed it together

📖 One day bound everyone equally

## 🧼 For On That Day Shall The Priest Make An Atonement For You, To Cleanse You

This verse states the day's whole purpose plainly.

On this one day, atonement covers the entire nation's sin from the whole year.

It happens all at once.

Every earlier detail in the chapter exists to make this one sentence true.

🧼 States the day's purpose plainly

📅 Covers the whole year's sin at once

🔗 Every earlier detail serves this purpose

📖 One sentence explains the entire chapter

## 🛌 It Shall Be A Sabbath Of Rest Unto You

This day gets the same rest status as the weekly Sabbath.

That was the highest category of rest on Israel's calendar.

Only a handful of days each year reached that level.

This day earned that rank for a reason.

🛌 Ranked with the weekly Sabbath

🏆 The highest rest category available

📅 Reserved for only a few days

📖 Its rank matched its importance

# Leviticus 16:32-34
# 🔁 An Everlasting Statute
---
## 👑 In His Father's Stead

This looks ahead to every future high priest, not only Aaron.

Whoever inherits the office after him is bound to this ceremony.

Son follows father, generation after generation.

The exact same ceremony repeats across every generation.

👑 Applies to every future high priest

👨‍👦 Passed from father to son

🔁 The ceremony repeats every generation

📖 One rule outlives any single priest

## 👔 Shall Put On The Linen Clothes, Even The Holy Garments

The plain linen from verse four gets named again here.

This confirms it as a fixed, permanent uniform.

It was never just Aaron's personal choice that first year.

Every future high priest wears the same plain linen.

👔 The same linen from verse four

🔒 A fixed uniform for this one task

📜 Never just Aaron's personal choice

📖 Plain clothing became permanent law

## 🏛️ Make An Atonement For The Holy Sanctuary, And The Tabernacle Of The Congregation, And For The Altar

This closing verse lists everything the day covers.

The innermost sanctuary, the tent itself, and the altar all get named.

The priests and the whole congregation are named too.

Nothing in Israel's entire religious system sits outside this day's reach.

🏛️ Lists sanctuary, tent, and altar

📋 Summarizes everything the day accomplishes

👥 Priests and people are both included

📖 Nothing was left uncovered

## 📅 An Everlasting Statute Unto You, To Make An Atonement For The Children Of Israel Once A Year

Everlasting here means for as long as this covenant system stood.

This was a fixed, permanent requirement.

It happened annually, not whenever convenient.

One day a year covered what the rest of the year could not undo alone.

📅 A fixed requirement, not occasional

🔒 Everlasting means fixed within the covenant

🗓️ Observed once a year, without exception

📖 One day carried the whole system

## ✅ And He Did As The LORD Commanded Moses

This closing line confirms the instructions were actually carried out.

Not merely given, but obeyed.

The same closing formula appears throughout the book of Leviticus.

Obedience, not just correct instruction, is the point of the whole book.

✅ Confirms obedience, not just instruction

🔗 The same closing line repeats often

📖 Obedience is the book's real point

➡️ A command is only complete once obeyed
`.trim();

export const LEVITICUS_SIXTEEN_PERSONAL_SECTIONS = parseLeviticusSixteenRawNotes(LEVITICUS_SIXTEEN_RAW_NOTES);
