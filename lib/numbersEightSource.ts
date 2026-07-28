export type NumbersEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersEightRawNotes(rawText: string): NumbersEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 8:${startVerse}` : `Numbers 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 8 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_EIGHT_RAW_NOTES = `# Numbers 8:1-4
# 🕯️ Lighting The Golden Lampstand
---
## 🔥 When Thou Lightest The Lamps
"Lightest" here means to kindle, to set burning - this is a standing instruction for Aaron's ongoing duty, not a one-time event. Every single evening, part of the priest's job was making sure the tabernacle's only light source was actually lit.
🔥 "Lightest" means to kindle, to set the lamps burning
🔁 A daily, standing duty, not a one-time act
🔑 The tabernacle had no windows - this was the only light inside
---
## 7️⃣ The Seven Lamps
The lampstand itself, described back in Exodus 25:31-37, had one central shaft with three branches curving out on each side, for a total of seven lamp-cups. Seven is the Bible's number for completeness, and this was the only piece of furniture in the tabernacle shaped like a tree - a small echo of the tree of life reaching back to Eden.
7️⃣ Seven separate lamp-cups on one branched gold stand
📖 Its full design was already given in Exodus 25:31-37
🌳 Its tree-like shape may echo the tree of life from Eden
---
## ➡️ Give Light Over Against The Candlestick
"Over against" is old English for "facing toward" or "opposite." The lamps were angled so their light shone forward, toward the front of the lampstand, lighting up the table of shewbread standing across the room rather than scattering light randomly in every direction.
➡️ "Over against" means facing toward, aimed at one spot
🍞 The light was aimed at the table of shewbread across the room
🔑 Purposeful lighting, not just a room lit by accident
---
## ✅ Aaron Did So...As The LORD Commanded Moses
This exact phrase - obedience matching command word for word - repeats constantly through Exodus, Leviticus, and Numbers whenever the tabernacle system is being set up. It's the Bible's way of certifying that nothing was improvised; every detail traces back to a direct command.
✅ A repeated formula certifying exact, careful obedience
🔁 The same phrase shows up throughout the tabernacle-building chapters
🔑 Nothing here was improvised or left to personal preference
---
## 🔨 This Work Of The Candlestick Was Of Beaten Gold
"Beaten" means hammered out by hand from one solid piece of gold, not poured into a mold or assembled from separate parts welded together. Every branch, cup, and flower design had to be worked out of a single block - one of the most difficult metalworking jobs in the whole tabernacle.
🔨 "Beaten" means hammered from a single solid block, not cast
🧱 No separate pieces were welded on afterward
🔑 One of the hardest metalworking tasks in the entire tabernacle
---
## 📐 According To The Pattern Which The LORD Had Shewed Moses
Back on Mount Sinai, God showed Moses an actual pattern - not just verbal instructions, but something Moses could see - for the lampstand and every other tabernacle furnishing (Exodus 25:9, 25:40). Hebrews 8:5 later calls this pattern a copy of something real in heaven, meaning the earthly lampstand was a physical stand-in for something spiritual.
📐 God showed Moses a visual pattern, not just spoken directions
📖 That moment is first described in Exodus 25:9 and 25:40
🔑 Hebrews 8:5 calls it a copy of a heavenly reality
---
## 🕎 The Candlestick's Place In The Room
The lampstand stood in the Holy Place, the first inner room of the tabernacle, directly across from the table of shewbread and just outside the veil that hid the ark. Only priests ever saw it burning - it lit their work, not a public display for the crowd outside.
🕎 Stood in the Holy Place, across from the table of shewbread
🚪 Positioned just outside the veil that hid the ark
👤 Only priests ever actually saw it lit, not the wider public

# Numbers 8:5-8
# 💧 Cleansing The Levites
---
## 🎯 Take The Levites...And Cleanse Them
This opens a brand-new command, separate from the lampstand instructions just given. "Cleanse" here means ceremonial purification, making someone ritually fit to approach holy things - it's not about being sinless, it's about being set apart and prepared.
🎯 A new command, unrelated to the lampstand instructions before it
✨ "Cleanse" means ceremonial readiness, not sinless perfection
🔑 Preparation for a specific role, not a moral judgment
---
## 💧 Sprinkle Water Of Purifying Upon Them
This sprinkling was a ceremonial washing marking the start of the Levites' new status, distinct from the specific "water of separation" mixed with a red heifer's ashes that gets introduced later, in Numbers 19. At this point in the story, that particular ritual hasn't been given yet - this is a simpler, earlier act of ceremonial cleansing.
💧 A ceremonial sprinkling marking a change in status
⏭️ Different from the ash-mixed water introduced later in Numbers 19
🔑 That more detailed ritual doesn't exist in the story yet at this point
---
## ✂️ Let Them Shave All Their Flesh
Every Levite had to shave his entire body, not just his head or face. This same full-body shave shows up for a cleansed leper in Leviticus 14:8-9 and for a Nazirite ending his vow in Numbers 6:9 - in each case, removing all the hair symbolized stripping away the old condition completely before starting fresh.
✂️ A full-body shave, not just the head or beard
📖 The same act marks a cleansed leper (Leviticus 14:8-9)
🔑 Removing all the hair pictured a complete, fresh start
---
## 👕 Let Them Wash Their Clothes
Washing the clothes matched washing the body - what a person wore was treated as an extension of themselves in this culture, so making the outside clean mattered alongside making the body clean. Nothing about the old, ordinary life was allowed to carry over unchanged into this new role.
👕 Clothing was treated as part of a person's own cleanness
🔄 Nothing from the old, ordinary life carried over untouched
🔑 Outward washing matched the inward change taking place
---
## 🪔 Water, Not Oil - Unlike The Priests
When Aaron and his sons were ordained as priests in Leviticus 8, they were washed with water and then specifically anointed with oil poured on their heads. The Levites here only get the water - no anointing oil at all - a small but real difference marking that Levites assist in the tabernacle, while only Aaron's family actually serves as priests.
🪔 Priests were washed with water, then anointed with oil
🚫 Levites in this chapter receive water only, no anointing oil
🔑 The missing oil marks a real difference in rank and role
---
## 🌾 A Young Bullock With His Meat Offering
In the KJV, "meat offering" is an old term for a grain offering - flour and oil, with no meat involved at all. Grain offerings never stood alone; they always accompanied an animal sacrifice, here paired with the young bullock about to be offered.
🌾 "Meat offering" in the KJV actually means a grain offering
🫒 Fine flour mixed with oil, no meat or flesh involved
🔑 Grain offerings always came paired with an animal sacrifice
---
## 🐂 Another Young Bullock...For A Sin Offering
A second bullock was required specifically as a sin offering. Even though the Levites were about to take on a position of service, they still needed atonement first - being chosen for a holy task didn't mean they were already without sin.
🐂 A second bullock, offered specifically for sin
🙇 Even Levites needed atonement before beginning their duties
🔑 Being chosen for holy work never meant being sinless already

# Numbers 8:9-14
# 🙌 The Ordination Ceremony
---
## 🏕️ Bring The Levites Before The Tabernacle...Gather The Whole Assembly
This wasn't a quiet, private ceremony - the entire nation was called to witness it. Making the Levites' new role public in front of everyone meant no Israelite could later claim confusion about who was authorized to handle the tabernacle's service.
🏕️ A public ceremony, witnessed by the entire nation
👀 No one could later claim confusion about the Levites' role
🔑 Public witness backed up a permanent change in status
---
## 👥 Six Hundred Thousand, By Representatives
Israel's fighting-age men alone numbered over 600,000 at this point (Numbers 1:46), so "the children of Israel" laying hands on the Levites almost certainly happened through the tribal elders and princes acting on the whole nation's behalf, not every single person physically touching every Levite. The act still counted as the whole nation's, even carried out through its representatives.
👥 Israel's men alone numbered over 600,000 (Numbers 1:46)
🧑‍🤝‍🧑 Elders and tribal leaders likely acted on everyone's behalf
🔑 A representative act still counted as belonging to the whole nation
---
## ✋ The Children Of Israel Shall Put Their Hands Upon The Levites
Laying on of hands was how ancient Israel formally transferred identity or responsibility from one party to another - the same gesture used when someone laid hands on a sacrifice before it died in their place. Here it marks the Levites as standing in for the rest of Israel in tabernacle service.
✋ A gesture that formally transferred identity or role
🔁 The same act used before an animal sacrifice
🔑 Marked the Levites as standing in for the rest of Israel
---
## 🌊 Aaron Shall Offer The Levites...For An Offering
The Hebrew word behind "offering" here is the same word used for a wave offering - something physically lifted and moved before God as a gift. The Levites themselves, as living people, were formally presented to God the same way a priest would present a portion of meat or bread.
🌊 The word used elsewhere for a "wave offering"
🙌 The Levites themselves were presented, not just an animal or grain
🔑 A living gift, offered the same way a physical gift would be
---
## 🔑 That They May Execute The Service Of The LORD
This whole ceremony exists for a stated purpose, spelled out plainly: qualifying the Levites to actually do the tabernacle's work. Nothing about the ritual was decorative - each step made them fit for a specific job still to come.
🔑 States the ceremony's whole purpose plainly
🛠️ Every step qualified them for real, specific work
🔧 Nothing here was decoration for its own sake
---
## 🐂 The Levites Shall Lay Their Hands Upon The Heads Of The Bullocks
Just as Israel laid hands on the Levites, the Levites now lay hands on the bullocks - the same gesture, one level down. This identifies the animals as standing in for the Levites themselves in the offering that follows.
🐂 The same laying-on-of-hands gesture, one step further
🔁 Mirrors what Israel just did to the Levites themselves
🔑 The bullocks now stand in for the Levites
---
## 🔥 The One For A Sin Offering, And The Other For A Burnt Offering
This exact pairing - one sin offering, one burnt offering - is the same combination used to ordain Aaron and his sons as priests back in Exodus 29 and Leviticus 8. The sin offering deals with guilt; the burnt offering, fully consumed on the altar, pictures total dedication with nothing held back.
🔥 The same offering pair used to ordain Aaron's priesthood
🙇 The sin offering deals with guilt and impurity first
🔑 The burnt offering pictures total, nothing-held-back dedication
---
## 🕊️ To Make An Atonement For The Levites
"Atonement" means covering, making right what sin had broken. Stated plainly here as the purpose of both sacrifices, this confirms that even the tribe about to be set apart for God's own service needed to be covered by blood first.
🕊️ "Atonement" means having sin covered, made right
🎯 Named directly as the purpose of both offerings
🔑 Even the tribe serving God still needed to be covered by blood
---
## 👨‍👦 Set The Levites Before Aaron, And Before His Sons
After being presented to God, the Levites are also formally presented to Aaron's family specifically - the priests they will now assist. This confirms the working relationship going forward: Levites serve under and alongside the priesthood, not as independent operators.
👨‍👦 Formally presented to Aaron's family, not just to God
🤝 Confirms the Levites' working relationship going forward
🔑 They serve alongside and under the priests, not independently
---
## ➗ Thus Shalt Thou Separate The Levites
"Separate" means set apart, marked out from the rest of Israel for a distinct purpose. From this point forward, the Levites are legally and religiously in a different category than every other tribe in the nation.
➗ "Separate" means marked out, set apart for a distinct purpose
🏷️ A permanent change in category, not a temporary assignment
🔑 Different legal and religious status than every other tribe
---
## 👑 The Levites Shall Be Mine
This is the ceremony's real bottom line, spoken by God directly: the Levites now belong to Him in a way no other tribe does. Everything explained in the rest of the chapter - the substitution for the firstborn, the service duties, the age limits - all flows from this one claim of ownership.
👑 God's direct claim: the Levites now belong to Him
🌳 Everything else in the chapter flows from this one claim
🔑 A different kind of ownership than any other tribe experiences

# Numbers 8:15-19
# 🎁 Levites Given In Place Of The Firstborn
---
## ⏭️ After That Shall The Levites Go In To Do The Service
Only after the entire ceremony just described - washing, shaving, sacrifice, presentation - were the Levites actually cleared to begin their work. The order matters: preparation always came before service, never the other way around.
⏭️ Actual service could only begin after the full ceremony
📋 Preparation came first, service came second, never reversed
🔑 The order itself teaches that readiness precedes duty
---
## 👶 Wholly Given Unto Me...Instead Of Such As Open Every Womb
"Open every womb" is an old idiom simply meaning the firstborn child. God is stating the underlying transaction plainly: the entire tribe of Levite men now legally substitutes for one specific son from every other family in Israel - the firstborn.
👶 "Open every womb" is an idiom for the firstborn child
🔁 One tribe now legally stands in for one son per family
🔑 A nationwide substitution, not a symbolic gesture only
---
## 💰 Redeeming The Firstborn
Because Levites could never literally equal the exact number of firstborn sons in Israel, a related law required any firstborn son beyond that matched count to be "redeemed" - bought back from God's claim - for five shekels of silver each (Numbers 3:46-47, worked out in the very next chapter's earlier verses). The Levite substitution and the silver redemption were two halves of the very same system.
💰 Extra firstborn sons beyond the Levite count needed redeeming
🥈 Redeemed for five shekels of silver each (Numbers 3:46-47)
🔑 Two halves of one system: substitution, then silver for the remainder
---
## 🐑 All The Firstborn...Are Mine, Both Man And Beast
God's claim covers every firstborn, human or animal. Firstborn animals were either sacrificed outright or redeemed with a substitute, following the pattern set back in Exodus 13:12-13 - a claim that reached into every corner of an Israelite household's life, not just its children.
🐑 God's claim on the firstborn covers people and animals both
📖 That pattern was already set in Exodus 13:12-13
🔑 A claim reaching into every part of a household's life
---
## 🌙 On The Day That I Smote Every Firstborn In The Land Of Egypt I Sanctified Them
This reaches all the way back to the night of the tenth plague and the first Passover (Exodus 12). Israel's firstborn sons were spared that night while Egypt's were not - and ever since, God has held a specific claim on every Israelite firstborn as a permanent reminder of that rescue.
🌙 A direct callback to the tenth plague and first Passover
🚪 Israel's firstborn were spared that night; Egypt's were not
🔑 The claim on the firstborn is a permanent memorial of that rescue
---
## 🔁 I Have Taken The Levites For All The Firstborn
Stated a second time, almost word for word - this repetition is deliberate, not careless writing. Scripture often restates a major legal point exactly to make sure it can't be missed or argued away later.
🔁 Nearly the same sentence stated a second time on purpose
📜 Deliberate repetition, not careless duplication
🔑 Restating a major legal point locks it in place
---
## 🎁 Given As A Gift To Aaron And To His Sons
The Levites aren't just given to God in the abstract - practically, they're handed over to Aaron's family as working help. This is the same relationship already spelled out back in Numbers 3:9 and 18:6, where the Levites are described as Aaron's gift from God.
🎁 Practically handed over to Aaron's family as working help
📖 The same relationship already described in Numbers 3:9 and 18:6
🔑 A gift from God to the priests specifically, not a vague role
---
## 🕊️ To Make An Atonement For The Children Of Israel
The Levites' service itself functions as a kind of ongoing atonement for the whole nation - by doing the tabernacle work correctly and carefully, they protect Israel from the danger of the sanctuary being handled wrong by ordinary, untrained people.
🕊️ Their service functions as protection for the whole nation
🛡️ Careful, trained handling of holy things prevents disaster
🔑 An ongoing role, not a one-time ceremonial act
---
## ⚠️ That There Be No Plague...When The Children Of Israel Come Nigh Unto The Sanctuary
This is a real, stated danger, not just poetic language - approaching holy things carelessly could cost lives, a threat that becomes tragically literal later when Korah's rebellion in Numbers 16 ends with a plague striking the camp. The Levites exist partly to prevent that exact outcome by managing access to the sanctuary correctly.
⚠️ A real danger, not just a figure of speech
💀 Becomes tragically literal later, in Korah's rebellion (Numbers 16)
🔑 The Levites' whole role helps prevent that kind of disaster

# Numbers 8:20-22
# ✅ Israel Obeys, The Levites Begin
---
## 🤝 Moses, And Aaron, And All The Congregation...Did
This wasn't carried out by leadership alone behind closed doors - the text specifically credits Moses, Aaron, and the whole congregation together with getting it done. Obedience here was a shared, communal act, not something delegated entirely to a few officials.
🤝 Credited to leadership and the whole congregation together
👥 A shared, communal act of obedience
🔑 Not something delegated entirely to a few officials
---
## 📏 According Unto All That The LORD Commanded Moses
"All" is doing real work in this sentence - not most of it, not the easy parts, every single detail. This precise-obedience language matches the same formula used at the end of the tabernacle's construction back in Exodus 39-40.
📏 "All" means every detail, not just the easy parts
📖 Matches the same formula from Exodus 39-40's construction account
🔑 Precision in obedience is treated as worth recording plainly
---
## 🧼 The Levites Were Purified...Aaron Made An Atonement For Them To Cleanse Them
This verse confirms the ceremony from earlier in the chapter actually happened exactly as commanded - washing, sacrifice, atonement, all carried out in practice, not just described as instructions on paper. Scripture often pairs a command with a matching report that it was fulfilled.
🧼 Confirms the earlier ceremony was actually carried out
📋 Instructions and fulfillment are both recorded, not just one
🔑 A command paired with proof that it was obeyed
---
## 🚪 After That Went The Levites In To Do Their Service
The Levites' actual working life begins here - everything before this point was preparation. From this moment on, they're functioning members of the tabernacle system, not candidates waiting to start.
🚪 The Levites' actual working life starts at this point
📋 Everything before this verse was preparation, not service
🔑 They move from candidates to functioning workers
---
## 🔒 As The LORD Had Commanded Moses...So Did They
The chapter closes its ceremony with the same obedience formula it used to open it, bookending the whole passage. This kind of repetition is Scripture's way of stamping a section "complete and correct," start to finish.
🔒 The same obedience formula that opened the ceremony
📖 Bookends the passage from start to finish
🔑 Scripture's way of marking a section complete and correct

# Numbers 8:23-26
# 📆 The Levites' Working Years
---
## 🎂 From Twenty And Five Years Old And Upward
This sets the minimum starting age for Levite service at twenty-five. "And upward" makes clear this is a floor, not a fixed age - anyone twenty-five or older was eligible to begin.
🎂 Twenty-five was the minimum starting age for service
⬆️ "And upward" means a floor, not one exact age
🔑 Anyone twenty-five or older could begin
---
## ❓ Twenty-Five Here, Thirty In Numbers 4 - A Training Period
Numbers 4 already set the age for carrying the tabernacle's holiest furniture at thirty, not twenty-five. Many readers understand this as describing two stages of the same career: a five-year period starting at twenty-five for training, learning, and lighter duties, followed by full active carrying-and-service work once a Levite turned thirty.
❓ Numbers 4 required age thirty for carrying holy furniture
🎓 This likely describes an earlier training or apprentice stage
🔑 Two stages of one career, not a contradiction between chapters
---
## 🛑 From The Age Of Fifty Years They Shall Cease
Fifty marks the far end of active Levite service - a specific, stated retirement age for the physically demanding parts of the work, unusually precise for the ancient world, where most labor simply continued as long as a person's body allowed.
🛑 Fifty was the stated retirement age from active duty
📏 Unusually specific for how labor limits worked in this era
🔑 A deliberate boundary, not just "whenever someone got too old"
---
## 🚫 Shall Serve No More
This specifically means the heavier, physically demanding parts of the job - not that a fifty-year-old Levite became useless or was pushed out of the tabernacle community entirely. The very next verse makes clear what continues instead.
🚫 Refers to the heavier, physically demanding duties only
👴 Doesn't mean a Levite became useless at fifty
🔑 The next verse explains what still continued
---
## 🛡️ Minister With Their Brethren...To Keep The Charge
"Keep the charge" means guard duty and oversight responsibility - watching, supervising, and helping without doing the heavy lifting themselves. Older Levites shifted into mentoring and guarding roles, passing on experience to the younger men still doing the physical work.
🛡️ "Keep the charge" means guarding and overseeing, not lifting
🧓 Older Levites shifted into mentoring and guarding roles
🔑 Experience got passed down rather than simply retired away
---
## 📖 A Later Change: Age Twenty Under David
Centuries later, when the tabernacle was about to become a permanent, fixed temple instead of something carried through the wilderness, King David lowered the starting age to twenty and dropped the retirement age altogether (1 Chronicles 23:24-27) - because heavy carrying and transport were no longer the main part of the job.
📖 David later lowered the starting age to twenty
🏛️ Recorded in 1 Chronicles 23:24-27, once the temple became permanent
🔑 The age rules changed because the actual job changed
---
## 📜 Thus Shalt Thou Do Unto The Levites Touching Their Charge
"Touching" here is an old word simply meaning "concerning" or "regarding." This closing line formally seals the whole set of age and duty regulations as settled law for the tribe, not a loose suggestion.
📜 "Touching" is old English for "concerning" or "regarding"
🔒 Formally seals these age and duty rules as settled law
🔑 A firm close to the chapter's regulations, not a loose guideline
`;

export const NUMBERS_EIGHT_PERSONAL_SECTIONS = parseNumbersEightRawNotes(NUMBERS_EIGHT_RAW_NOTES);
