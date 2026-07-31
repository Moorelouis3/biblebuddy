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
This law is given right after Nadab and Abihu, back in Leviticus 10:1-2, offered "strange fire" the LORD hadn't commanded and were struck dead instantly, inside the tabernacle itself. That death is the reason this whole chapter exists - it's the warning label attached to the most dangerous, most sacred moment in Israel's whole religious calendar.
⚰️ Recalls Nadab and Abihu's deaths in Leviticus 10
🔥 They died for offering unauthorized "strange fire"
📜 Their deaths are the reason this chapter's rules exist
---
## 🚫 That He Come Not At All Times Into The Holy Place Within The Vail
The "holy place within the vail" is the Most Holy Place, the innermost room of the tabernacle where the ark sat - separated from everything else by a thick curtain called the "vail." Even Aaron, the high priest himself, could not just walk in whenever he wanted; entering carelessly or too often was a fatal risk, not merely against etiquette.
🚪 The "vail" is the curtain sealing off the innermost room
⚠️ Even the high priest couldn't enter whenever he pleased
☠️ Careless entry here was a fatal risk, not just bad manners
---
## 🛐 Before The Mercy Seat, Which Is Upon The Ark
The "mercy seat" is the solid gold lid covering the ark of the covenant, and it was considered the exact earthly location of God's throne, resting above the two carved cherubim on top of the ark. This one object, in this one room, was the single most sacred point on earth in Israel's entire world.
🏆 The mercy seat is the gold lid on top of the ark
👑 Considered the exact earthly location of God's throne
📍 The single most sacred point in Israel's whole world
---
## ☁️ I Will Appear In The Cloud Upon The Mercy Seat
God announces He will personally show up over the mercy seat in a cloud - the same visible cloud of glory that filled the tabernacle back in Exodus 40. This isn't a symbolic figure of speech; it's a warning that God's actual, overwhelming presence would be right there, which is exactly why unauthorized approach was so deadly.
☁️ The same cloud of glory that filled the tabernacle in Exodus 40
🙌 Not just symbolic - God's presence was genuinely there
⚡ Explains exactly why unauthorized approach was so deadly

# Leviticus 16:3-5
# 👕 Plain Linen, Not Royal Robes
---
## 🐂 With A Young Bullock For A Sin Offering, And A Ram For A Burnt Offering
Before Aaron can do anything for the nation, he has to deal with his own sin first. A bullock (young bull) covers his personal sin offering, and a ram covers his own burnt offering - the order matters, because an unclean priest could never make anyone else clean.
🐂 A young bull for Aaron's own sin offering
🐏 A ram for his own burnt offering
📜 He must be cleansed himself before cleansing anyone else
---
## 👔 The Holy Linen Coat...The Linen Breeches...A Linen Girdle...The Linen Mitre
This is a deliberate downgrade from Aaron's usual outfit. Exodus 28 describes his everyday high priestly clothing as gold, blue, purple, and scarlet, set with precious stones - "garments of glory and beauty." On this one day, all of that is set aside for plain white linen, head to foot.
👔 Aaron's normal robes are gold, jeweled, and colorful
🤍 On this day he wears plain, undyed white linen instead
📉 A deliberate downgrade, not an accident of wardrobe
---
## 🙇 These Are Holy Garments
Even though they're plain, the linen garments are still called holy - set apart for this use alone. Humility and holiness aren't opposites here; the plainest clothing Aaron owns is also the most sacred clothing he owns, reserved only for the one day he enters the Most Holy Place.
🙇 Plain doesn't mean less holy - it means differently holy
🗓️ Reserved for this one specific day only
⚖️ Humility and holiness are shown to go together
---
## 🛁 Therefore Shall He Wash His Flesh In Water, And So Put Them On
A full-body wash comes before dressing, not after - Aaron approaches the day already cleansed, then covers that cleansing with plain, undyed linen. It's a visual picture of a man stripped down to nothing but basic purity before the most important task of his year.
🛁 A full bath happens before he even gets dressed
🧼 Purity comes first, clothing comes second
🖼️ A visual picture of a man stripped down to the basics
---
## 🐐 Two Kids Of The Goats For A Sin Offering, And One Ram For A Burnt Offering
Once Aaron's own offerings are set, the nation's animals are named: two young goats for the people's sin offering, plus a ram for their burnt offering. Two goats, not one, is unusual - and the next section explains exactly why two are needed for a single sin offering.
🐐 Two young goats provided by the whole congregation
🐏 Plus a ram for the people's burnt offering
❓ Two goats for one offering is unusual - explained next

# Leviticus 16:6-10
# 🎲 Two Goats, One Lot
---
## ⚖️ Make An Atonement For Himself, And For His House
"Atonement" means covering over sin so that it no longer blocks a relationship with God - here it covers Aaron personally and his whole household, including his surviving sons. No one, not even the high priest's own family, gets a free pass around this requirement.
⚖️ "Atonement" means covering sin so it no longer blocks God's presence
🏠 Covers Aaron's entire household, not just himself
🚫 No exemption, even for the high priest's own family
---
## 🚪 Present Them Before The LORD At The Door Of The Tabernacle Of The Congregation
Both goats are brought together to the same spot, the entrance of the tent of meeting, before anyone knows which goat will do what. Neither goat is chosen in advance by looks, health, or preference - the decision happens next, and it isn't Aaron's to make.
⛺ Both goats brought to the same entrance together
👀 Neither is pre-selected by appearance or preference
🎯 The real decision is about to be made a different way
---
## 🎲 Aaron Shall Cast Lots Upon The Two Goats
"Casting lots" was an accepted ancient method - something like marked stones or sticks drawn or thrown - used to let God, not human judgment, make a decision. It shows up elsewhere in the Old Testament (dividing the Promised Land, choosing Saul as king) as a recognized way to remove human bias entirely.
🎲 An ancient method like drawing marked stones or sticks
🙌 Used to remove human bias from the decision completely
📖 The same method used elsewhere for major decisions in Israel
---
## 🕊️ One Lot For The LORD, And The Other Lot For The Scapegoat
"Scapegoat" is the King James translation of a Hebrew word ("Azazel") whose exact meaning is debated - most likely "the goat that goes away" or "the goat of removal." One goat's fate is death as a sacrifice; the other's fate is to carry sin away alive. Both outcomes are decided by God, not chosen ahead of time.
🕊️ "Scapegoat" translates a debated Hebrew term, likely "removal"
☠️ One goat's assigned fate is death as a sacrifice
🚶 The other's assigned fate is to carry sin away alive
---
## 🩸 The Goat Upon Which The LORD's Lot Fell...Offer Him For A Sin Offering
Whichever goat the lot marks for the LORD is slaughtered as the actual sin offering, its blood used inside the Most Holy Place. This goat's death does the covering; the other goat, coming up next, does something entirely different with that same sin.
🩸 This goat is killed as the literal sin offering
🏛️ Its blood is what enters the Most Holy Place
🔀 The other goat handles the same sin a different way
---
## 🕊️ Presented Alive Before The LORD, To Make An Atonement With Him
Before it's ever sent anywhere, the second goat is formally presented alive in front of the LORD, just like the first goat was in verse 7. Its role in the atonement is decided here, even though the actual sending-away doesn't happen until later in the chapter.
🕊️ Formally presented alive, matching the first goat's presentation
📜 Its role in the atonement is fixed at this moment
⏳ The actual release comes later in the chapter, not yet
---
## 🐐 To Let Him Go For A Scapegoat Into The Wilderness
The second goat isn't killed at all - it stays alive and is set apart to be released later in the chapter. Two goats, two different pictures of the same forgiveness: one shows sin being paid for, the other shows sin being carried away and gone for good.
🐐 This goat stays alive through the whole ceremony
🖼️ One goat pictures payment, the other pictures removal
✅ Together they picture one complete, whole forgiveness

# Leviticus 16:11-14
# 🩸 Behind The Veil
---
## 🐂 Kill The Bullock Of The Sin Offering Which Is For Himself
Before Aaron can carry any blood behind the veil, he first has to kill his own bullock - the offering that covers his own sin. He cannot represent the people in the Most Holy Place while his own sin is still unresolved.
🐂 Aaron's own bullock is killed first, before anything else
🙋 He deals with his own sin before representing anyone else's
📜 The order in the text isn't random - it's the required sequence
---
## 🔥 A Censer Full Of Burning Coals Of Fire...His Hands Full Of Sweet Incense Beaten Small
A censer is a small metal firepan for carrying hot coals. "Sweet incense beaten small" means fragrant resin ground down into fine powder, the same incense recipe detailed back in Exodus 30. Aaron carries both together toward the one room in the world where incense had ever been offered like this.
🔥 A censer is a portable firepan for hot coals
🌿 "Sweet incense beaten small" means finely ground fragrant resin
📖 Same incense recipe first given back in Exodus 30
---
## 🚪 Bring It Within The Vail
This is the actual moment Aaron physically crosses through the curtain into the Most Holy Place - the point of no return for the whole ceremony, and the one moment all year that any human being stood in that room.
🚪 The exact moment he crosses through the curtain
🔒 The point of no return for the whole ceremony
📅 The one moment in the entire year anyone stood in that room
---
## ☁️ That The Cloud Of The Incense May Cover The Mercy Seat...That He Die Not
The rising incense smoke forms a cloud that hides the mercy seat, and by extension God's own manifest presence, from Aaron's direct view. Exodus 33:20 already established that no one can see God's face and live - this cloud is a literal, physical safeguard against that exact danger.
☁️ Incense smoke visually hides the mercy seat from Aaron
👁️ Connects to Exodus 33:20 - no one sees God's face and lives
🛡️ A literal physical safeguard, not just ceremonial smoke
---
## ✋ Sprinkle It With His Finger Upon The Mercy Seat Eastward
Aaron applies the bullock's blood with his own finger, not a tool, directly onto the top of the mercy seat, facing east. This is the first of two separate blood applications in this same verse - applied on top of the mercy seat itself.
✋ Applied with his own finger, not a ceremonial tool
📍 Placed directly on top of the mercy seat, facing east
1️⃣ The first of two separate applications in this one verse
---
## 🩸 Before The Mercy Seat Shall He Sprinkle...Seven Times
A second, separate application follows - this time in front of the mercy seat rather than on it, repeated seven times, the Bible's number for completeness. This is the single most sacred blood application performed anywhere in Israel's entire system of worship.
2️⃣ A second, separate application, in front rather than on top
7️⃣ Seven times, the Bible's number for completeness
🏆 The most sacred blood application in all of Israel's worship

# Leviticus 16:15-19
# 🩸 Cleansing Holy Place, Tent, And Altar
---
## 🐐 Kill The Goat Of The Sin Offering, That Is For The People
Now the process just done for Aaron's own sin (verses 11-14) is repeated with the LORD's-lot goat, this time on behalf of the whole nation. Same room, same mercy seat, same sevenfold sprinkling - but for the people's sin instead of the high priest's own.
🐐 The same process repeated, now for the nation's sin
🔁 Same room, same mercy seat, same sevenfold pattern
👥 This time it's the people's sin being covered, not Aaron's
---
## 🏛️ Make An Atonement For The Holy Place, Because Of The Uncleanness Of The Children Of Israel
Notice what's being cleansed here: not just people, but the holy place itself. The idea is that Israel's ongoing sin throughout the year had actually contaminated God's dwelling by association, and it required its own yearly cleansing, not just the people's.
🏛️ The holy place itself needed cleansing, not only the people
🧼 A year's worth of sin was pictured as contaminating the space
📅 This is why the ceremony had to happen every single year
---
## ⛺ That Remaineth Among Them In The Midst Of Their Uncleanness
This closing phrase in verse 16 is easy to skim past, but it says something remarkable: God's tent stayed put, in the middle of an imperfect, sinning people, all year long. This whole ceremony exists precisely because God chose ongoing closeness over distance.
⛺ God's tent stayed among the people all year, not just on this day
💛 Shows God chose closeness over distance from an imperfect people
📜 This ceremony exists because of that ongoing closeness, not despite it
---
## 🚫 There Shall Be No Man In The Tabernacle Of The Congregation When He Goeth In
While Aaron performs this innermost atonement, every other person - priests included - is required to leave the tent entirely. Not even his fellow priests are allowed to witness or assist with this specific act; it is his alone to perform, for everyone.
🚫 Everyone else must leave, priests included
👤 This specific act belongs to Aaron completely alone
🙏 He stands in for the entire congregation at this moment
---
## 🐮 He Shall Go Out Unto The Altar...And Make An Atonement For It
After finishing inside, Aaron moves back out to the bronze altar in the courtyard and applies blood there too, extending the same cleansing outward from the innermost room to the most public, everyday piece of tabernacle furniture.
🐮 Moves from the innermost room out to the courtyard altar
📤 Extends the same cleansing from private to public space
🔗 Ties the whole tabernacle complex into one connected ritual
---
## 🐮 Put It Upon The Horns Of The Altar Round About
The "horns" are the four projecting corners built onto the top of the altar, shaped like animal horns, considered the altar's most sacred points. Applying blood there marks the altar's most significant spots specifically, not just anywhere on its surface.
🐮 "Horns" are the four projecting corners atop the altar
📍 Considered the altar's most sacred specific points
🎯 Blood is applied there deliberately, not just anywhere
---
## 7️⃣ Sprinkle Of The Blood Upon It...Seven Times, And Cleanse It, And Hallow It
A separate sevenfold sprinkling follows the horns application, this time cleansing and formally setting the altar apart for holy use again. "Hallow" means to declare something holy - the altar isn't just cleaned here, it's officially re-dedicated.
7️⃣ A separate sevenfold sprinkling, distinct from the horns application
🧼 Cleanses the altar so it can return to holy use
📜 "Hallow" means formally declaring something holy, not just clean

# Leviticus 16:20-22
# 🐐 The Scapegoat Sent Away
---
## 🤲 Aaron Shall Lay Both His Hands Upon The Head Of The Live Goat
Laying on hands elsewhere in Leviticus (like chapter 1's burnt offering) usually uses one hand to identify an offering with the offerer. Using both hands here, on the still-living goat, marks this as a uniquely deliberate, weighty transfer - not a routine gesture.
🤲 Most offerings elsewhere use only one hand
✋ Both hands here signals something unusually deliberate
🐐 Done to a goat that is still alive, not being killed
---
## 🗣️ Confess Over Him All The Iniquities Of The Children Of Israel...Putting Them Upon The Head Of The Goat
Aaron speaks the nation's sins out loud over the goat, and the text pictures those sins as actually being transferred onto the animal's head. This is the clearest single picture in the whole Old Testament of sin being moved off of people and onto a substitute.
🗣️ Aaron speaks the people's sins aloud over the goat
📦 The text pictures sin being physically transferred onto it
🖼️ The clearest Old Testament picture of sin moved onto a substitute
---
## 🚶 Send Him Away By The Hand Of A Fit Man Into The Wilderness
A specifically chosen, capable man - not a random bystander - is given the job of leading the goat out. "Fit" means suited and ready for the task, since walking a goat out into open wilderness and returning safely was real, physically demanding work.
🚶 A specifically chosen man, not a random volunteer
💪 "Fit" means suited and physically ready for the task
🏜️ Leading the goat out and returning safely was real work
---
## 🏜️ Bear Upon Him All Their Iniquities Unto A Land Not Inhabited
The goat carries the confessed sins into empty, uninhabited wilderness - about as far from the camp, and from God's dwelling at its center, as a picture could get. The sin isn't just covered; in this image it's carried away and gone.
🏜️ Released into empty land, far from any habitation
📏 About as far from the camp's center as the image allows
✅ Pictures sin as carried away and gone, not merely hidden

# Leviticus 16:23-28
# 🧼 Undressing, Washing, Burning
---
## 👔 Put Off The Linen Garments...And Shall Leave Them There
Aaron takes off the plain linen he wore into the Most Holy Place and leaves it behind in the tabernacle itself - those specific garments were used for this one task and this one task only, never worn casually again afterward.
👔 The linen worn inside is left behind in the tabernacle
🔒 Reserved for this exact task, not reused for ordinary wear
🗓️ Fresh linen would be needed again the following year
---
## 🛁 Wash His Flesh With Water In The Holy Place...Put On His Garments
A second full washing, then Aaron changes back into his normal, colorful high priestly garments - the ones set aside back in verse 4. The most sacred part of the day is finished, and he returns to his everyday priestly role.
🛁 A second full-body wash, separate from the earlier one
👑 He returns to his normal, colorful high priestly clothing
🔁 Marks the shift back from this one sacred task to ordinary duty
---
## 🔥 Offer His Burnt Offering, And The Burnt Offering Of The People
Only after all the sin-offering blood work is finished do the burnt offerings - the ram for himself, the ram for the people, from verses 3 and 5 - finally get offered. Burnt offerings represent complete dedication to God, fittingly placed after the sin problem has already been dealt with.
🔥 The burnt offerings come after all the blood work is done
🐏 These are the rams named back in verses 3 and 5
🙌 Represents dedication to God, placed after sin is addressed
---
## 🔥 The Fat Of The Sin Offering Shall He Burn Upon The Altar
The fat portions of the sin offering animals are burned on the altar as their own separate act, following the same fat-burning pattern used for ordinary sin offerings throughout Leviticus 4. Even in this unique ceremony, the chapter still follows familiar sacrificial rules.
🔥 Fat portions are burned separately on the altar
🔗 Matches the ordinary sin offering pattern from Leviticus 4
📜 Shows this unique day still follows familiar sacrificial rules
---
## 👕 He That Let Go The Goat For The Scapegoat Shall Wash His Clothes
Even the man whose only job was walking the goat out into the wilderness has to wash before re-entering the camp. Contact with the sin-carrying goat, even indirectly through this task, still required the same cleansing used elsewhere in Leviticus for uncleanness.
👕 Even the goat-handler must wash before re-entering camp
🔗 The same cleansing pattern used elsewhere for uncleanness
🐐 Shows how seriously the goat's sin-bearing role was treated
---
## 🚶 Shall One Carry Forth Without The Camp
"Without the camp" is a specific location, not a throwaway detail - outside the boundary where the community and God's dwelling both sat. Sin-bearing remains this significant couldn't stay inside the camp in any form, even as ashes waiting to be dealt with.
🚶 A specific place, outside the whole community's boundary
🏕️ Sin-bearing remains couldn't stay inside the camp at all
📍 The location itself carries theological weight, not just logistics
---
## 🔥 They Shall Burn In The Fire Their Skins, And Their Flesh, And Their Dung
The bullock and the sin-offering goat's remains - skin, meat, waste, everything - are burned completely, rather than eaten by the priests the way many sin offerings normally were. Nothing of an offering this significant could be casually consumed.
🔥 Every part is burned completely, nothing set aside
🍽️ Unlike many sin offerings, priests do not eat any part of this one
⚖️ Reflects how uniquely serious this particular offering was
---
## 👕 He That Burneth Them Shall Wash His Clothes, And Bathe His Flesh In Water
A third person in this chapter - after Aaron and the goat-handler - who touches something connected to this day's sin offerings also has to wash before returning to camp. The pattern repeats deliberately: contact with sin-bearing objects always requires cleansing before rejoining the community.
👕 A third person in the chapter required to wash before returning
🔁 The pattern of contact-then-cleansing repeats deliberately
📜 Shows the rule applied consistently, not just to Aaron

# Leviticus 16:29-31
# 📅 A Statute Forever
---
## 📆 In The Seventh Month, On The Tenth Day Of The Month
Israel's religious calendar begins in the spring, with the first month (Abib/Nisan) marking Passover. Counting forward, the seventh month falls in early autumn - this date became permanently fixed as what is still observed today as Yom Kippur, the Day of Atonement.
📆 The religious year starts in spring, at the first month
🍂 The seventh month falls in early autumn
🕯️ This date is still observed today as Yom Kippur
---
## 😔 Ye Shall Afflict Your Souls
"Afflict your souls" is the Bible's standard idiom for fasting and serious self-denial, not physical self-harm. This single day of the year required this kind of humbling from absolutely everyone, matching the weight of what was happening at the tabernacle on their behalf.
😔 An idiom for fasting and serious self-denial, not self-harm
📅 Required of everyone, on this one specific day each year
⚖️ Matches the seriousness of what was happening at the tabernacle
---
## 🚫 Do No Work At All, Whether It Be One Of Your Own Country, Or A Stranger
The command reaches beyond native-born Israelites to any long-term foreign resident living among them ("stranger that sojourneth"). No one living within the community was exempt from observing this day, regardless of birth or background.
🌍 Includes foreign residents living long-term among Israel
🚫 No full exemption based on birth or background
👥 The whole community observed the day together, no exceptions
---
## 🧼 For On That Day Shall The Priest Make An Atonement For You, To Cleanse You
This verse states the purpose in plain terms: on this single day, atonement is made for the entire nation's sin from the whole year, all at once. Every detail earlier in the chapter exists to make this one sentence true.
🧼 States the day's whole purpose in plain terms
📅 Covers the entire nation's sin from the whole year, at once
🔗 Every earlier detail in the chapter serves this one purpose
---
## 🛌 It Shall Be A Sabbath Of Rest Unto You
Beyond the weekly Sabbath, this day gets the same rest status - the highest category of rest Israel's calendar had, reserved for the very few most significant days of the year.
🛌 Given the same rest status as the weekly Sabbath
🏆 The highest rest category on Israel's calendar
📅 Reserved for only the most significant days of the year

# Leviticus 16:32-34
# 🔁 An Everlasting Statute
---
## 👑 The Priest, Whom He Shall Anoint...In His Father's Stead
This looks ahead to every future high priest, not just Aaron personally. Whoever inherits the office after him - son after father, generation after generation - is bound to carry out this exact same ceremony, in the exact same way.
👑 Applies to every future high priest, not only Aaron
👨‍👦 Passed down father to son as the office continues
🔁 The exact same ceremony repeats across generations
---
## 👔 Shall Put On The Linen Clothes, Even The Holy Garments
The plain white linen from verse 4 gets named again here, confirming this is a fixed, permanent uniform for this one task specifically - not a one-time choice Aaron happened to make that first year.
👔 The same plain linen from verse 4 is named again
🔒 A fixed, permanent uniform for this one task only
📜 Confirms it was never just Aaron's personal choice
---
## 🏛️ Make An Atonement For The Holy Sanctuary...The Tabernacle...The Altar...The Priests...All The People
The closing verse lists everything this one day covers: the innermost sanctuary, the tent itself, the altar, the priests, and the whole congregation. Nothing in Israel's entire religious system is left outside this day's reach.
🏛️ Lists sanctuary, tabernacle, altar, priests, and people
📋 Functions as a summary of everything the day accomplishes
🌐 Nothing in the whole religious system is left uncovered
---
## 📅 An Everlasting Statute...Once A Year
"Everlasting" here means for as long as this covenant system was in place - a fixed, permanent, annual requirement, not an occasional or optional observance whenever convenient.
📅 A fixed annual requirement, not an occasional one
🔒 "Everlasting" describes its permanence within this covenant system
🗓️ Once a year, every year, without exception
---
## ✅ And He Did As The LORD Commanded Moses
The chapter's closing line confirms the instructions were actually carried out, not merely given. This same closing formula appears throughout Leviticus, quietly underlining that obedience, not just correct instruction, is the point of the whole book.
✅ Confirms the instructions were carried out, not just recorded
🔗 The same closing formula recurs throughout Leviticus
📖 Obedience, not just correct instruction, is the book's real point
`;

export const LEVITICUS_SIXTEEN_PERSONAL_SECTIONS = parseLeviticusSixteenRawNotes(LEVITICUS_SIXTEEN_RAW_NOTES);
