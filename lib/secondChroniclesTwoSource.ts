export type SecondChroniclesTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwoRawNotes(rawText: string): SecondChroniclesTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 2:${startVerse}` : `2 Chronicles 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWO_RAW_NOTES = `# SecondChronicles 2:1-2
# 🏗️ Solomon Decides To Build
---
## 🏠 An House For The Name Of The LORD

The name of the LORD stands for who God is and what He has done.

Building a house for His name means building it to honor Him.

It was never meant to hold God inside four walls.

David had already made this same point before he died.

Solomon is now stepping into a plan his father could not finish.

🏛️ The name means God's reputation

📜 The temple was never a container for God

👴 David made this same point earlier

📖 Solomon finishes what his father started

## 👑 An House For His Kingdom

Solomon planned two separate buildings, not one.

The first was the temple, a house for the LORD.

The second was a royal palace, a house for himself as king.

Kings in this era needed a grand residence to receive foreign visitors and run the government.

That palace project would later take thirteen years to complete.

👑 A second building was a royal palace

🏛️ It was separate from the temple

🌍 Kings needed a residence for state business

📖 The palace took years longer to finish

## 🧱 Threescore And Ten Thousand Men To Bear Burdens

Threescore means sixty, so this number is seventy thousand.

Bearers of burdens were laborers who carried stone, wood, and supplies by hand.

This was hard physical labor, not skilled craftsmanship.

A project this size needed an enormous supply chain just to move materials.

🔢 Threescore means sixty

🧱 Bearers of burdens carried materials

💪 This was hard physical labor

📖 A huge workforce moved the supplies

## ⛏️ Fourscore Thousand To Hew In The Mountain

Fourscore means eighty, so this number is eighty thousand.

To hew means to cut or shape stone with tools.

These men worked in mountain quarries cutting blocks for the temple's foundation and walls.

Quarry work was slow, exhausting, and dangerous long before power tools existed.

🔢 Fourscore means eighty

⛏️ To hew means to cut stone

🏔️ They worked in mountain quarries

📖 Stone cutting was slow and dangerous work

## 👷 Three Thousand And Six Hundred To Oversee Them

This smaller group did not carry stone or cut rock themselves.

They managed the massive workforce described in the rest of the verse.

Coordinating over a hundred and fifty thousand workers required real organization.

A project this size could collapse into chaos without clear leadership.

👷 Overseers managed the workforce

📋 They did not do the manual labor

🔢 They led over a hundred thousand workers

📖 Organization made the massive project possible

# SecondChronicles 2:3-6
# ✉️ Solomon Writes To Huram
---
## 🌊 Huram The King Of Tyre

Tyre was a wealthy port city on the coast north of Israel.

Its people were Phoenicians, famous across the ancient world as sailors and traders.

Huram had already supplied cedar for David's own palace years earlier.

Solomon is reaching out to a proven ally, not a stranger.

🌊 Tyre was a coastal trading city

⛵ Its people were skilled Phoenician sailors

🏛️ Huram had helped build David's palace

📖 Solomon is renewing a proven alliance

## 👴 As Thou Didst Deal With David My Father

Solomon is pointing back to a real earlier agreement, not making a vague request.

David is called his father because David was Solomon's actual biological father.

That earlier arrangement with David becomes the model for this new one.

Solomon is asking Huram to simply continue what already worked.

👴 David was Solomon's real father

🤝 An earlier deal already existed

🔁 Solomon asks Huram to repeat it

📖 Past faithfulness became the model for now

## 🕯️ Sweet Incense

Incense was a fragrant substance burned to produce smoke with a pleasant smell.

Priests burned it daily inside the temple as an act of worship.

The rising smoke pictured prayer ascending upward toward God.

This was one of several ongoing rituals Solomon lists as reasons for building.

🕯️ Incense was burned fragrant smoke

🙏 Priests burned it daily in worship

☁️ Rising smoke pictured prayer going up

📖 It was one purpose of the temple

## 🍞 The Continual Shewbread

Shewbread means bread of the presence.

Twelve loaves sat on a special table inside the temple at all times.

Each loaf represented one of the twelve tribes of Israel before God.

Priests replaced the loaves with fresh bread every week without fail.

🍞 Shewbread means bread of the presence

🔢 Twelve loaves stood for the twelve tribes

⏳ The bread was replaced weekly

📖 It stayed on the table without fail

## 📅 The Sabbaths, And The New Moons, And The Solemn Feasts

The sabbath was the weekly day of rest kept every seventh day.

New moons marked the start of each month with special offerings.

Solemn feasts were the yearly festivals like Passover and the Feast of Tabernacles.

Together these three named a full calendar of regular worship, not an occasional event.

📅 Sabbaths were the weekly day of rest

🌙 New moons marked each new month

🎉 Solemn feasts were yearly festivals

📖 Worship followed a full yearly calendar

## 🌟 Great Is Our God Above All Gods

Solomon is not admitting that other gods are real.

Nations around Israel worshipped many different gods of their own.

Solomon is declaring that the LORD alone deserves that title in truth.

The size of the temple he plans to build reflects the size of that claim.

🌟 Solomon is not admitting other gods are real

🌍 Neighboring nations worshipped many gods

👑 Only the LORD truly deserves the title

📖 The temple's size reflects that claim

## ♾️ Heaven And Heaven Of Heavens Cannot Contain Him

Heaven of heavens is an old way of saying the highest possible heaven.

Even that highest heaven is too small to hold all of God.

Solomon is admitting that no building, however grand, could ever contain God.

This makes his next question the obvious one to ask.

♾️ Heaven of heavens means the highest heaven

📏 Even that highest heaven cannot hold God

🏛️ No building could ever contain Him

📖 That truth leads straight into Solomon's question

## 🔥 Save Only To Burn Sacrifice Before Him

Solomon answers his own question about who is able to build God a house.

The temple was never meant to hold God like a container holds water.

Its real purpose was to be a place set apart for sacrifice and worship.

Solomon is being honest about what a building can and cannot do for God.

🔥 Solomon answers his own question

🚫 The temple could not contain God

🏛️ Its purpose was worship and sacrifice

📖 Solomon stays honest about the building's limits

# SecondChronicles 2:7-10
# 🌲 Solomon's Request For Materials
---
## 🎨 A Man Cunning To Work In Gold

Cunning in this old English does not mean sneaky or deceptive.

It means highly skilled and expert at a craft.

Solomon is asking for a master artisan, not a trickster.

The list of materials that follows shows just how broad that skill needed to be.

🎨 Cunning means highly skilled

🔨 It does not mean sneaky

👤 Solomon wants a master artisan

📖 The skill required covered many materials

## 💜 Purple, And Crimson, And Blue

These were expensive dyed fabrics, not ordinary cloth colors.

Tyre was famous across the ancient world for its purple dye made from sea snails.

Producing that dye took enormous labor, which made purple cloth a mark of wealth and royalty.

Requesting a craftsman skilled in these dyes shows how costly this temple project would be.

💜 Purple, crimson, and blue were costly dyes

🐚 Tyre's purple dye came from sea snails

👑 Purple cloth marked wealth and royalty

📖 The request signals a costly project

## 🏗️ Whom David My Father Did Provide

Solomon is not starting this project from nothing.

David had already gathered skilled workers and materials before he died.

That earlier preparation is described in detail back in First Chronicles.

Solomon is continuing his father's planning, not inventing it on his own.

🏗️ David had already gathered workers

📜 That preparation appears in First Chronicles

🔁 Solomon continues his father's planning

📖 The project began before Solomon was king

## 🌲 Cedar Trees, Fir Trees, And Algum Trees

Cedar trees from Lebanon were prized for their strength, size, and pleasant smell.

Fir trees provided a lighter, more flexible wood used alongside cedar.

Algum trees were a rare imported wood used for fine detail work.

None of these three grew in the hill country around Jerusalem.

🌲 Cedar was strong, large, and fragrant

🌳 Fir wood was lighter and flexible

🪵 Algum was a rare imported wood

📖 None of these trees grew near Jerusalem

## 🪓 Thy Servants Can Skill To Cut Timber In Lebanon

Can skill here is an old way of saying know how.

The Phoenicians of Tyre were famous for cutting and shipping timber from Lebanon's forests.

Solomon is relying on skill his own kingdom simply did not have.

This request only made sense because of Tyre's long experience in the timber trade.

🪓 Can skill means know how

🌲 Phoenicians were expert timber cutters

🤝 Solomon relied on skill Israel lacked

📖 Tyre's experience made this request possible

## 🏛️ Wonderful Great

This phrase is Solomon's own description of the temple he is planning.

He is not being modest about the scale of this project.

The size was meant to match the size of the God it honored.

Nearly every request in this letter flows from that one ambition.

🏛️ Solomon describes the temple as wonderful great

📏 He is not being modest about scale

⚖️ The size was meant to match God's greatness

📖 Every request flows from that ambition

## 🌾 Twenty Thousand Measures Of Wheat And Barley

A measure was a dry unit used for grain, similar in idea to a large sack.

Wheat and barley were the two staple grains of the ancient Near East.

Twenty thousand measures of each was an enormous shipment of food.

This grain would feed Huram's workers while they cut and hauled the timber.

🌾 A measure was a dry grain unit

🍞 Wheat and barley were staple grains

🔢 Twenty thousand measures was an enormous amount

📖 The grain fed Huram's own workers

## 🍷 Twenty Thousand Baths Of Wine And Oil

A bath was a liquid measure, about the size of a large jar.

Wine and oil were everyday staples, used for drinking, cooking, and light.

Paying with wine and oil alongside grain and wine shows this was a full food payment, not just money.

Solomon is compensating Huram's workers generously for a massive job.

🍷 A bath measured liquid goods

🫒 Wine and oil were daily staples

💰 This was a full payment in food

📖 Solomon paid generously for a huge job

# SecondChronicles 2:11-13
# 👑 Huram's Reply Begins
---
## ✍️ Answered In Writing

Huram sent back a formal written letter, not just a verbal message through a messenger.

Written diplomatic letters between kings were a serious, official form of communication.

The fact that this letter survives shows how significant this exchange was seen to be.

Two kings were putting a major building alliance on the record.

✍️ Huram sent a formal written letter

📜 Written letters were serious diplomacy

🗂️ This exchange was worth preserving

📖 Two kings put the alliance on record

## 🙌 Because The LORD Hath Loved His People

Huram was not an Israelite and did not worship the LORD as his own god.

Yet he still credits Israel's God with putting Solomon on the throne.

A foreign king openly recognizing the LORD's hand adds real weight to his words.

Even outsiders could see that Israel's success came from somewhere beyond themselves.

🙌 Huram was not an Israelite

👑 He still credits the LORD for Solomon's throne

🌍 An outsider recognized God's hand

📖 Israel's success was visible even beyond its borders

## 🌍 Blessed Be The LORD God Of Israel, That Made Heaven And Earth

To bless the LORD here means to speak well of Him and give Him honor.

Huram calls the LORD the maker of heaven and earth, a huge claim for a pagan king to make.

He is echoing language Solomon himself used just a few verses earlier.

The two kings end up agreeing about who God actually is.

🌍 To bless means to speak well of

🌌 Huram calls the LORD the maker of all

🔁 He echoes Solomon's own words

📖 Both kings agree on who God is

## 🎓 A Wise Son, Endued With Prudence And Understanding

Endued is an old word meaning gifted or equipped.

Huram is describing Solomon exactly the way Solomon asked God to make him.

That request for wisdom happened back at the start of the previous chapter.

An outside observer is now confirming that God actually answered that prayer.

🎓 Endued means gifted or equipped

🙏 This matches Solomon's own request for wisdom

✅ An outsider confirms the prayer answered

📖 That request came in the previous chapter

## 🛠️ I Have Sent A Cunning Man, Endued With Understanding

Huram is not sending materials this time, he is sending a person.

This craftsman will lead the detailed artistic work of the temple.

Sending your best worker to another kingdom was a major sign of trust.

Huram is investing his own people in Solomon's project.

🛠️ Huram sends a skilled person

🎨 This man leads the detailed craftwork

🤝 Sending him showed real trust

📖 Huram invested his own people in the project

## 👨‍👦 Of Huram My Father's

This second Huram is a different person from the king writing the letter.

He belonged to the king's own household, likely a senior craftsman or trusted official.

Sharing the name Huram between two different men can easily confuse a modern reader.

The next verses describe exactly who this particular craftsman was.

👨‍👦 This is a different Huram

🏠 He belonged to the king's household

😕 The shared name can confuse readers

📖 The next verses identify him clearly

# SecondChronicles 2:14-16
# 🛠️ The Craftsman And The Timber Plan
---
## 🇮🇱 The Son Of A Woman Of The Daughters Of Dan

This craftsman's mother came from the Israelite tribe of Dan.

That made him partly Israelite by birth, even though he grew up in Tyre.

A similar pairing of Israelite and foreign heritage shaped the craftsmen who built the tabernacle long before this.

God had already used mixed backgrounds like this to build His house.

🇮🇱 His mother was from the tribe of Dan

🧬 He was partly Israelite by birth

⛺ A similar pattern shaped the tabernacle's builders

📖 God had used mixed backgrounds before

## 🇹🇾 His Father Was A Man Of Tyre

This craftsman's father was Phoenician, from the very city sending the letter.

That gave him a Tyrian father and an Israelite mother in one household.

He grew up between two cultures instead of belonging fully to just one.

That dual background is exactly why he could bridge Solomon's project and Tyre's skill.

🇹🇾 His father was from Tyre

👪 He had parents from two nations

🌉 He grew up between two cultures

📖 That background let him bridge both sides

## 🔨 Skilful To Work In Gold, And In Silver, In Brass, In Iron, In Stone, And In Timber

This one craftsman could work in six completely different materials.

Modern workshops usually train a person in a single specialty, not six.

Mastering metal, stone, and wood together made him extremely rare for his time.

Huram is not exaggerating when he calls this a gift worth sending.

🔨 He worked in six different materials

🎯 Modern trades usually specialize in one

⭐ That range made him extremely rare

📖 Huram was not exaggerating his value

## 🖋️ To Grave Any Manner Of Graving, And To Find Out Every Device

To grave means to carve or engrave a design into a hard surface.

Any manner of graving means he could handle whatever pattern or style was needed.

To find out every device means he could solve new design problems on the spot.

Solomon needed a problem solver, not just someone who could follow instructions.

🖋️ To grave means to carve or engrave

🎨 He could handle any pattern requested

🧩 He could solve new problems himself

📖 Solomon needed a problem solver, not a copier

## 📦 Let Him Send Unto His Servants

This line confirms the payment terms Solomon offered back in verse ten.

Huram is agreeing to the deal without renegotiating any part of it.

Clear terms on both sides kept this massive project from stalling over money.

Two kings settling payment plainly let the actual building work begin.

📦 This confirms the payment from verse ten

🤝 Huram agrees without renegotiating

💰 Clear terms kept the project moving

📖 Settled payment let the real work begin

## 🚢 In Floats By Sea To Joppa

Floats were rafts made by tying logs together so they could be towed across water.

Cut timber traveled this way down the coast to the port city of Joppa.

Joppa sat about thirty five miles from Jerusalem, uphill through rugged terrain.

Getting the wood from a forest to a mountain temple took real logistical planning.

🚢 Floats were rafts of tied logs

🌊 Timber traveled by sea to Joppa

🏔️ Joppa sat uphill from Jerusalem

📖 Moving the wood took careful planning

# SecondChronicles 2:17-18
# 📊 The Workforce Is Numbered
---
## 🌍 The Strangers That Were In The Land Of Israel

Strangers here means foreigners living inside Israel's territory, not Israelites themselves.

Many were likely descendants of Canaanite peoples never fully driven out of the land.

Solomon drew his massive labor force from this foreign population, not from Israel's own tribes.

That choice kept ordinary Israelites free from years of forced construction labor.

🌍 Strangers means foreigners living in Israel

🏘️ Many descended from earlier Canaanite peoples

🧱 Solomon drew his workforce from this group

📖 Ordinary Israelites were spared this labor

## 📋 After The Numbering Wherewith David His Father Had Numbered Them

David had already counted this same foreign population years earlier.

Solomon is not starting a new count from scratch.

He is simply updating a list his father had already begun.

That continuity shows careful planning was passed down from one king to the next.

📋 David had already counted this group

🔁 Solomon updates an existing list

👴 Planning passed from father to son

📖 Careful planning spanned two reigns

## 🔢 An Hundred And Fifty Thousand And Three Thousand And Six Hundred

Old English often strings numbers together this way instead of writing one large figure.

This phrase adds up to one hundred fifty three thousand six hundred people.

That is the entire foreign workforce Solomon had available for the project.

A number this large shows just how massive the temple construction truly was.

🔢 Old English strings numbers together this way

➕ The total is 153,600 people

👷 That was the entire foreign workforce

📖 The number shows the project's true scale

## 🏛️ Three Thousand And Six Hundred Overseers To Set The People A Work

These closing verses repeat the same job categories named back in verse two.

Burden bearers, stone cutters, and overseers appear again in the exact same numbers.

Repeating the numbers at both the start and end frames this whole passage as one unit.

Solomon's planning was thorough enough to hold steady from the first verse to the last.

🏛️ The same job categories repeat here

🔁 The numbers match verse two exactly

📚 Repetition frames the whole passage together

📖 Solomon's planning held steady throughout`.trim();

export const SECOND_CHRONICLES_TWO_PERSONAL_SECTIONS = parseSecondChroniclesTwoRawNotes(SECOND_CHRONICLES_TWO_RAW_NOTES);
