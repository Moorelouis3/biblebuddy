export type PsalmsEightyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyRawNotes(rawText: string): PsalmsEightyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+80:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 80 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+80:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+80:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 80 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 80,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 80:${startVerse}` : `Psalms 80:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 80 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_RAW_NOTES = `# Psalms 80:1-3
# 🐑 Give Ear, O Shepherd Of Israel
---
## 🐑 Give Ear, O Shepherd Of Israel

"Give ear" is an old way of asking someone to listen closely.

Calling God "Shepherd of Israel" pictures him guiding, feeding, and protecting the whole nation.

This same title appears when Jacob blesses Joseph in Genesis 49.

The psalm opens by asking that same shepherding care to show up now.

👂 Give ear means listen closely

🐑 Shepherd pictures guiding and protecting

📜 Jacob used this title in Genesis

📖 The psalm asks for that care now

## 🐑 Thou That Leadest Joseph Like A Flock

"Joseph" here stands for the whole northern kingdom of Israel.

Two of Joseph's sons, Ephraim and Manasseh, became large tribes within that kingdom.

Calling God the shepherd who leads Joseph pictures the nation as a flock needing guidance.

A shepherd walks ahead of the sheep and chooses their path for them.

🐑 Joseph stands for the northern kingdom

👶 Ephraim and Manasseh were Joseph's sons

🧭 A shepherd walks ahead and leads

📖 Israel is pictured as a needy flock

## 👼 Thou That Dwellest Between The Cherubims

The cherubims were two gold angelic figures on top of the ark of the covenant.

Their wings stretched out and met above the ark's cover, called the mercy seat.

God's presence was pictured as enthroned in that space between them.

Approaching that space meant approaching God's own throne on earth.

👼 Cherubims topped the ark of the covenant

🕊️ Their wings met above the mercy seat

👑 God was pictured enthroned there

📖 It represented God's throne on earth

## 💡 Shine Forth

"Shine forth" pictures God's glory breaking out like sudden light.

In the wilderness, God's presence over the tabernacle was sometimes seen as a visible glow.

The request is not for comfort words but for God to be seen acting.

This same plea returns twice more before the psalm ends.

💡 Shine forth pictures sudden glory

🔥 God's presence once appeared as glow

👀 The plea asks to see God act

📖 This request returns twice more

## 👨‍👩‍👧 Before Ephraim And Benjamin And Manasseh

This names three of the tribes whose camps stood nearest the ark in the wilderness.

Ephraim and Manasseh both came from Joseph, while Benjamin was Joseph's full brother.

Naming these three ties the psalm to Rachel's own children and grandchildren.

The prayer pictures God's strength marching out in front of that same camp again.

👨‍👩‍👧 Three tribes camped near the ark

👶 Ephraim and Manasseh came from Joseph

🤝 Benjamin was Joseph's full brother

📖 These tribes traced back to Rachel

## 🔁 Turn Us Again, O God, And Cause Thy Face To Shine

This line becomes a refrain repeated three times across the psalm.

"Turn us again" is a request for national restoration, not a change of direction while walking.

"Cause thy face to shine" pictures God's favor the way sunlight pictures warmth.

Losing God's face meant losing his blessing and protection.

🔁 This refrain repeats three times

🔄 Turn us again means restore us

☀️ A shining face pictures God's favor

📖 Losing it meant losing blessing

# Psalms 80:4-7
# 😢 How Long Wilt Thou Be Angry
---
## 📛 O LORD God Of Hosts

"LORD" in small capitals translates God's own personal name.

"God of hosts" names God as commander over heaven's armies.

Putting both titles together stacks God's personal covenant name with his total power.

The prayer appeals to the biggest possible picture of who God is.

📛 LORD translates God's own name

⚔️ Hosts means heaven's armies

👑 Both titles combine name and power

📖 The prayer appeals to God's full might

## ❓ How Long Wilt Thou Be Angry Against The Prayer Of Thy People

This is a direct, unpolished question asked straight to God.

The psalm does not pretend the nation feels fine.

Even prayer itself seems to be met with anger here.

Honest complaint like this counts as real prayer throughout the Bible.

❓ A direct question asked to God

😣 The nation admits real pain

🙏 Even prayer feels unanswered here

📖 Honest complaint counts as real prayer

## 🍞 Thou Feedest Them With The Bread Of Tears

"Bread" was the basic daily food in this culture, eaten at nearly every meal.

Picturing tears as bread means grief has become the nation's constant diet.

This food does not nourish the way bread should.

It only deepens the very sorrow it claims to feed.

🍞 Bread was daily, basic food

😢 Tears replace that daily food

🌀 This food does not nourish

📖 It deepens sorrow instead

## 🥤 Givest Them Tears To Drink In Great Measure

This repeats the same picture with drink instead of food.

"Great measure" means a large, overflowing amount, not a small taste.

Naming both bread and drink covers every basic need with the same grief.

Suffering here touches every part of daily life, not just one area.

🥤 Drink repeats the same picture

📏 Great measure means overflowing amount

🍽️ Both food and drink are covered

📖 Grief touches every daily need

## ⚔️ Thou Makest Us A Strife Unto Our Neighbours

"Strife" here means Israel has become something neighboring nations fight over or mock.

Bordering nations often took advantage of a weakened, defeated Israel.

This was not private suffering but a public, visible disgrace.

Neighboring nations could see exactly what had happened to Israel.

⚔️ Strife means a target for conflict

🌍 Neighboring nations took advantage

👀 The disgrace was public, not private

📖 Neighbors could see the collapse

## 😆 Our Enemies Laugh Among Themselves

This adds mockery on top of the suffering already described.

The laughter happens privately, among the enemies themselves, not even to Israel's face.

That detail makes the mockery feel even more dismissive.

Israel's pain has become other people's private entertainment.

😆 Enemies mock privately

🙈 Not even said to Israel's face

👎 That makes it more dismissive

📖 Pain became others' entertainment

## 🔁 Turn Us Again, O God Of Hosts, And Cause Thy Face To Shine

This is the same refrain from verse three, said again with a fuller title.

"O God" has grown into "O God of hosts," a title naming his full military power.

Repeating the plea shows the crisis has not lifted.

Each repetition asks the same rescue with rising urgency.

🔁 The same refrain returns again

⚔️ The title now includes hosts

⏳ The crisis has not lifted

📖 Each repeat raises the urgency

# Psalms 80:8-13
# 🍇 Thou Hast Brought A Vine Out Of Egypt
---
## 🍇 Thou Hast Brought A Vine Out Of Egypt

Israel is pictured here as a vine instead of a flock or a nation.

Bringing the vine "out of Egypt" replays the exodus as a story about planting.

A vine takes years of careful tending before it produces anything.

The image already hints at how much care this planting required.

🍇 Israel becomes a vine here

🚪 Out of Egypt recalls the exodus

🌱 Vines need years of careful care

📖 The image hints at required care

## 🌍 Thou Hast Cast Out The Heathen, And Planted It

"Heathen" refers to the Canaanite nations already living in the land.

"Cast out" points to the conquest under Joshua that cleared room for Israel.

"Planted it" pictures God personally settling Israel into that cleared ground.

The nation's presence in Canaan is credited entirely to God's own hand.

🌍 Heathen means the Canaanite nations

⚔️ Cast out points to Joshua's conquest

🌱 Planted pictures God settling Israel

📖 Credit goes entirely to God

## 🧹 Thou Preparedst Room Before It, And Didst Cause It To Take Deep Root

Preparing room meant clearing away whatever would have crowded out new growth.

Deep roots let a plant survive drought and storms that would kill a shallow one.

Together these two details describe a planting meant to last, not a quick success.

Verse nine ends by saying that lasting plan actually worked, filling the whole land.

🧹 Room was cleared for new growth

🌳 Deep roots survive drought and storms

⏳ The plan was built to last

📖 Filling the land shows it worked

## ⛰️ The Hills Were Covered With The Shadow Of It

This vine has grown enormous, covering hills with its shade.

"The boughs thereof were like the goodly cedars" compares its branches to Lebanon's famous trees.

Cedars were prized across the ancient world for their size and strength.

The picture is of a small, transplanted vine becoming towering and dominant.

⛰️ The vine's shade covered hills

🌲 Its boughs matched cedar trees

🏆 Cedars were prized for size

📖 A small vine became dominant

## 🌊 She Sent Out Her Boughs Unto The Sea, And Her Branches Unto The River

"The sea" here likely points to the Mediterranean coast to the west.

"The river" likely points to the Euphrates, far to the northeast.

Together they describe the vine's growth reaching Israel's widest promised borders.

The picture is national strength at its fullest extent, not just a healthy plant.

🌊 Sea likely means the Mediterranean

🏞️ River likely means the Euphrates

🗺️ Together they mark Israel's borders

📖 This describes strength at its height

## 🧱 Why Hast Thou Then Broken Down Her Hedges

A hedge or wall around a vineyard kept animals and thieves from destroying it.

Breaking down that hedge left the vine completely exposed to harm.

"All they which pass by the way do pluck her" pictures random passersby stealing its fruit freely.

The question asks why God removed protection he once provided himself.

🧱 Hedges protected vineyards from harm

🚫 Breaking it removed that protection

🚶 Passersby now steal freely

📖 The question asks why God allowed it

## 🐗 The Boar Out Of The Wood Doth Waste It

A wild boar was seen in this culture as a filthy, destructive animal.

"Waste" here means to tear up and ruin, not simply to eat.

Picturing an unclean animal ruining the vine adds insult to the damage.

The image pictures chaos invading something once carefully tended.

🐗 A boar was seen as unclean

💥 Waste means torn up and ruined

😖 An unclean animal adds insult

📖 Chaos invades what was once tended

## 🦁 The Wild Beast Of The Field Doth Devour It

This adds a second animal image to the boar already mentioned.

"Devour" pictures complete consumption, leaving nothing behind.

Two destructive pictures stacked together show the damage from more than one angle.

The vine that once filled the whole land is now being eaten alive.

🦁 A second animal image appears

🍽️ Devour means complete consumption

🔁 Two pictures show damage fully

📖 The vine is being eaten alive

# Psalms 80:14-16
# 🙏 Return, We Beseech Thee
---
## 🙏 Return, We Beseech Thee, O God Of Hosts

"Beseech" is an old, urgent word for begging.

This asks God to physically return his attention and care to the vine he once tended.

Naming him "God of hosts" again appeals to his full power to act.

The tone grows more desperate with each repeated line.

🙏 Beseech means urgent begging

🔄 The plea asks God to return

⚔️ God of hosts appeals to full power

📖 The tone grows more desperate

## 👀 Look Down From Heaven, And Behold

"Look down" and "behold" both ask God to actually see the damage, not just know about it.

Heaven is pictured here as the place God watches over the world from above.

The plea is not for private feeling but for God's visible attention.

Two words stacked together intensify the urgency of the request.

👀 Look down asks God to truly see

🙌 Behold repeats the same request

🌌 Heaven pictures God's vantage point

📖 Two words intensify the urgency

## 🚶 Visit This Vine

"Visit" here means to come personally and act, not simply observe.

The same word describes God visiting Sarah earlier in Genesis to fulfill a promise.

Asking God to visit the vine asks for direct, hands on involvement again.

The prayer wants presence and action, not distant sympathy.

🚶 Visit means to come and act

📜 The same word appears in Genesis

🤲 It asks for hands on involvement

📖 The plea wants action, not sympathy

## ✋ The Vineyard Which Thy Right Hand Hath Planted

God's "right hand" pictures his own strength and personal effort.

Saying his right hand planted it credits the nation's existence entirely to God.

This ties directly back to the vine image introduced in verse eight.

Nothing about this nation's existence happened by accident.

✋ Right hand pictures God's strength

🌱 God's hand planted this vineyard

🔗 It ties back to verse eight

📖 Nothing here happened by accident

## 👑 The Branch That Thou Madest Strong For Thyself

This branch may point toward Israel's king or toward the nation as a whole.

"Madest strong for thyself" means God built this branch to serve his own purposes.

The same idea returns later in verse seventeen with slightly different words.

Whatever it means exactly, this branch belongs to God, not to itself.

👑 The branch may mean Israel's king

💪 Madest strong means God built it

🔁 The idea returns in verse seventeen

📖 The branch belongs to God

## 🔥 It Is Burned With Fire, It Is Cut Down

Fire and cutting down describe two different pictures of total destruction.

A burned vine cannot simply regrow the way a cut one sometimes can.

Naming both together leaves no room to soften how bad the damage is.

"They perish at the rebuke of thy countenance" shows this destruction came from God's own anger.

🔥 Fire pictures total loss

🪓 Cutting down adds a second image

💔 Together they show complete damage

📖 The rebuke came from God himself

# Psalms 80:17-19
# 🙌 So Will Not We Go Back From Thee
---
## ✋ Let Thy Hand Be Upon The Man Of Thy Right Hand

"The man of thy right hand" likely points to Israel's king, standing at God's side.

Asking for God's hand upon him is a request for strength and protection.

Some readers connect "thy right hand" back to Benjamin, whose name means son of the right hand.

Either way, the prayer asks God to personally support this chosen leader.

✋ Hand upon him means support

👑 The man likely means Israel's king

👶 Right hand may recall Benjamin's name

📖 The prayer asks for God's backing

## 👤 The Son Of Man Whom Thou Madest Strong For Thyself

"Son of man" here simply means a human being, not yet the later title for Jesus.

This phrase parallels "the branch" from verse fifteen, describing the same figure.

Many Christians later read this verse as pointing forward toward Jesus.

The Old Testament text itself is speaking first about Israel's own king.

👤 Son of man means a human here

🌿 It parallels the branch in verse fifteen

✝️ Christians later saw it pointing to Jesus

📖 The original sense points to Israel's king

## 🤝 So Will Not We Go Back From Thee

This is a vow of continued loyalty, made in the middle of suffering.

The nation promises not to abandon God even while still waiting for rescue.

"Quicken us" means make us alive again, not simply comfort us.

The vow and the request for life are offered together, not one before the other.

🤝 A vow made during suffering

🙏 The nation refuses to abandon God

❤️ Quicken means make alive again

📖 The vow and the plea stand together

## 🗣️ We Will Call Upon Thy Name

Calling on God's name means entering real, ongoing worship, not a one time request.

This promise answers back to the psalm's opening request for God to hear and act.

The nation commits to worship even before the rescue has actually arrived.

Faith here is choosing to worship first, not waiting until things improve.

🗣️ Calling on his name means real worship

🔁 It answers back to the psalm's opening

⏳ The vow comes before rescue arrives

📖 Faith worships first, not last

## 🔁 Turn Us Again, O LORD God Of Hosts, Cause Thy Face To Shine

This is the third and final time this refrain appears in the psalm.

The title has grown from "O God" to "O God of hosts" to now "O LORD God of hosts."

Each repetition names more of who God is while the crisis itself stays unresolved.

The psalm ends not with an answer but with a settled, repeated hope.

🔁 The refrain appears a third time

📈 God's title grows fuller each time

❓ The crisis stays unresolved

📖 The psalm ends in repeated hope`.trim();

export const PSALMS_EIGHTY_PERSONAL_SECTIONS = parsePsalmsEightyRawNotes(PSALMS_EIGHTY_RAW_NOTES);
