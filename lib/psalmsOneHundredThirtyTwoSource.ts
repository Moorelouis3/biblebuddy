export type PsalmsOneHundredThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyTwoRawNotes(rawText: string): PsalmsOneHundredThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+132:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 132 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+132:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+132:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 132 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 132,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 132:${startVerse}` : `Psalms 132:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 132 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_TWO_RAW_NOTES = `# Psalms 132:1-5
# 😴 David's Vow To Find A Resting Place
---
## 😓 Remember David, And All His Afflictions

"Afflictions" here does not mean David's sins or troubles in general.

It points to the hardship David pushed through chasing one specific goal.

He drove himself hard to find a permanent home for the ark of God.

The prayer asks God to remember that effort, not to overlook a fault.

😓 Afflictions means hardship, not sin

🎯 The hardship centered on one goal

📦 Finding a home for God's ark

📖 The prayer asks God to remember the effort

## 🤝 Sware Unto The LORD, And Vowed Unto The Mighty God Of Jacob

A vow was a binding promise, not just a passing wish.

Speaking it aloud to God meant staying committed no matter the cost.

"The mighty God of Jacob" recalls Jacob's wrestling match in Genesis.

That night, Jacob received a new name, Israel.

Naming God this way ties David's vow to Israel's own founding story.

🤝 A vow was a binding promise

🗣️ Speaking it aloud meant full commitment

🥊 It recalls Jacob's wrestling match

📖 David's vow echoes Israel's founding story

## 🏠 I Will Not Come Into The Tabernacle Of My House, Nor Go Up Into My Bed

David vows to give up ordinary home comfort until his goal is done.

"Tabernacle of my house" simply means his own household, his home.

Refusing his own bed was a way of refusing rest and comfort.

Think of staying at your desk all night until one task is finished.

David treats finding a home for God's ark with that same urgency.

🏠 Tabernacle of my house means his home

🛏️ Refusing his bed means refusing comfort

💻 Like staying up until a task is done

📖 David treats God's house with that urgency

## 🔁 I Will Not Give Sleep To Mine Eyes, Or Slumber To Mine Eyelids

This line says the same thing twice in two different ways.

Hebrew poetry often repeats an idea to press it home.

Sleep and slumber are treated as one thing, not two separate acts.

The repetition shows how complete David's vow really was.

🔁 The line repeats the same idea

📣 Hebrew poetry repeats for emphasis

😴 Sleep and slumber are one idea twice

📖 The repeat shows how serious the vow was

## 📍 Until I Find Out A Place For The LORD, An Habitation For The Mighty God Of Jacob

"A place" does not mean a spot to visit once.

It means a permanent resting place for the ark of the covenant.

At this point in David's life, the ark still had no permanent home.

It had been kept in tents and private houses for years.

David's whole vow points toward what would eventually become the temple.

📍 A place means a permanent home

📦 It is a home for the ark

⛺ Until now, the ark had no home

📖 This vow points toward the temple

# Psalms 132:6-10
# 📦 Finding The Ark And Worshiping At His Footstool
---
## ❓ Lo, We Heard Of It At Ephratah

"It" refers to the ark of the covenant mentioned in the vow.

Ephratah is a name connected to the region near Bethlehem.

The text does not explain the exact link between that name and this story.

Many scholars believe it marks where Israel first heard news of the ark's location.

❓ It refers to the ark of the covenant

📍 Ephratah is linked to the Bethlehem area

🔎 The text does not spell out the link

📖 It marks hearing news of the ark

## 🌲 We Found It In The Fields Of The Wood

"The fields of the wood" translates a Hebrew word meaning Jaar.

That name points to Kirjathjearim, whose name literally means city of forests.

The ark had rested quietly there for about twenty years.

No one had yet brought it up to a proper home for God.

🌲 Fields of the wood means Jaar

🏘️ Jaar points to Kirjathjearim

⏳ The ark rested there twenty years

📖 No one had brought it home yet

## 👑 We Will Worship At His Footstool

"His footstool" does not mean God literally rests His feet on an object.

In Bible language, a footstool describes what sits beneath a king's throne.

Calling the ark, and later the temple, God's footstool pictures His throne above.

"His tabernacles" simply refers to the place set apart for God to dwell.

Worshiping at the footstool means approaching the ground beneath where God is enthroned.

👑 Footstool sits beneath a throne

📦 The ark pictured God's footstool

🪑 It points to God's throne above

📖 Worship happens beneath where God reigns

## 😴 Arise, O LORD, Into Thy Rest

David spent verses one through five refusing his own rest.

Now he asks God to rise up and take rest of His own.

"The ark of thy strength" ties God's own power directly to the ark's presence.

The chapter turns here from David's effort to God's own arrival.

😴 David gave up his own rest first

👑 Now he asks God to take rest

💪 The ark pictures God's strength

📖 The focus shifts to God's arrival

## 👕 Let Thy Priests Be Clothed With Righteousness

Clothing was a common Bible picture for a person's condition or character.

Being "clothed with righteousness" means the priests are marked as right before God.

The same verse also asks the saints to shout for joy.

"Saints" here simply means God's faithful people, not a special title.

This clothing picture returns again later in the psalm.

👕 Clothing pictures a person's condition

⚖️ Righteousness means being right before God

🙌 Saints means God's faithful people

📖 This clothing image returns again later

## 🤝 For Thy Servant David's Sake Turn Not Away The Face Of Thine Anointed

"Thine anointed" refers to the reigning king from David's line.

Anointing with oil marked someone as chosen and set apart by God.

The prayer leans on God's own promise to David to back this request.

"Turn not away the face" is a picture of refusing to answer a request.

🤝 Thine anointed means the current Davidic king

🫗 Anointing marked someone as chosen by God

🙏 The prayer leans on God's promise to David

📖 Turning away the face means refusing a request

# Psalms 132:11-14
# 🤝 The LORD's Oath To David
---
## ✅ The LORD Hath Sworn In Truth Unto David

"Sworn in truth" means this oath was certain, not just a wish.

God is not making a request here, He is making a promise.

"He will not turn from it" means God will not go back on His word.

This echoes God's covenant made with David in Second Samuel.

✅ Sworn in truth means fully certain

📜 God is promising, not requesting

🔒 He will not turn from it stands firm

📖 This echoes God's covenant with David

## 🌱 Of The Fruit Of Thy Body Will I Set Upon Thy Throne

"Fruit of thy body" is an old way of saying offspring or descendants.

God promises that David's own descendant will sit on his throne.

This promise reaches beyond Solomon toward a king who reigns forever.

The New Testament identifies that final king as Jesus Christ.

🌱 Fruit of thy body means offspring

👑 A descendant will sit on the throne

♾️ The promise reaches beyond Solomon

📖 The New Testament names that king as Jesus

## 📋 If Thy Children Will Keep My Covenant And My Testimony

Verse eleven sounded like an unconditional promise with no strings attached.

This verse now adds a condition about keeping God's covenant and teaching.

The two are not contradictions, they cover two different promises.

The line of David continuing forever was never in doubt.

Whether each individual son kept the throne without interruption depended on obedience.

🔀 Verse eleven sounds unconditional

📋 Verse twelve adds a condition

♾️ David's line was never in doubt

📖 Individual kings' reigns still depended on obedience

## 🔍 The LORD Hath Chosen Zion

David spent the start of this psalm searching for a home for God.

Now the psalm reveals that God had already chosen that home Himself.

Zion refers to the hill in Jerusalem where the temple would stand.

God's own desire, not just David's effort, secured Zion's place forever.

🔍 David searched for God's home

👑 God had already chosen it

🏔️ Zion is the temple hill in Jerusalem

📖 God's own desire secured the choice

## 🏔️ This Is My Rest For Ever: Here Will I Dwell

David asked God to arise into His rest back in verse eight.

Here God answers by naming Zion His resting place forever.

"For ever" means this choice was never meant to be temporary.

The city David longed to give God now belongs to Him for good.

😴 Verse eight asked God to take rest

🏔️ God answers by naming Zion His rest

♾️ For ever means this is permanent

📖 Zion now belongs to God for good

# Psalms 132:15-18
# 🌱 Blessing Poured Out On Zion
---
## 🍞 I Will Abundantly Bless Her Provision

"Her provision" refers to Zion's food supply and daily needs.

"Abundantly" means far more than enough, not just barely sufficient.

God promises that even the poorest in the city will have bread.

This blessing flows directly out of God choosing Zion back in verse thirteen.

🍞 Her provision means Zion's food supply

📈 Abundantly means more than enough

🙏 Even the poor will have bread

📖 This flows from God choosing Zion

## 👕 I Will Also Clothe Her Priests With Salvation

Verse nine asked God to clothe the priests with righteousness.

Here God answers that prayer by clothing them with salvation instead.

The prayer asked, and this later verse shows the answer given.

Shouting for joy repeats exactly what verse nine already asked for.

👕 Verse nine asked for that clothing

🎁 God answers with salvation instead

🔁 The prayer's answer matches its request

📖 Joy repeats what was already asked

## 🐂 I Will Make The Horn Of David To Bud

A horn in the Bible is a common picture for strength and power.

Animals used their horns to fight, so the image meant force, not decoration.

"To bud" pictures new growth, like a plant starting to sprout.

Putting the two together, God promises fresh strength rising up for David's line.

🐂 A horn pictures strength and power

⚔️ Horns meant force, not decoration

🌱 To bud means new growth starting

📖 God promises fresh strength for David's line

## 🪔 I Have Ordained A Lamp For Mine Anointed

A lamp left burning overnight meant a household was still alive and occupied.

Elsewhere in the Bible, a lamp for David's line pictures an unbroken dynasty.

Kings later in Israel's history recall this same lamp promise.

God is promising that David's family line will not go dark.

🪔 A burning lamp meant a home was alive

👑 A lamp pictures an unbroken dynasty

📜 Later kings recall this same promise

📖 David's line was promised not to go dark

## 😳 His Enemies Will I Clothe With Shame

Clothing appears again here, the same picture used throughout this psalm.

Priests were clothed with righteousness, and later with salvation.

Now enemies are clothed with shame instead.

"Flourish" means the crown will grow and thrive, not just survive.

The chapter that opened with David refusing rest ends with his crown thriving forever.

👕 Clothing images run through this psalm

😳 Enemies get clothed with shame instead

👑 Flourish means the crown thrives

📖 The chapter ends where David's line thrives
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_TWO_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyTwoRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_TWO_RAW_NOTES
);
