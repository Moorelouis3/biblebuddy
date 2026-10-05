export type HoseaNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaNineRawNotes(rawText: string): HoseaNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 9:${startVerse}` : `Hosea 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hosea 9 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_NINE_RAW_NOTES = `# Hosea 9:1-4
# 🌾 The Harvest Became A Curse
---
## 🎉 Rejoice Not, O Israel, For Joy, As Other People

Israel is told not to celebrate the harvest the way its neighbors did.

Other nations credited Baal, a fertility god, for a full cornfloor.

Celebrating that way was really worship of a false god in disguise.

The joy itself had become tangled up with disloyalty to the LORD.

🎉 Israel is told to stop this harvest joy
🌽 Other nations thanked Baal for good crops
🙅 That kind of joy honored a false god
📖 The celebration itself had become disloyal

## 💔 Thou Hast Gone A Whoring From Thy God

Whoring here does not describe a literal act in this line.

Hosea uses marriage and unfaithfulness as a picture for the whole book.

Israel had a covenant with God, much like a marriage vow.

Chasing after Baal broke that vow the same way an affair would.

💔 Whoring is a marriage picture here
📜 Israel's covenant with God worked like a vow
🔄 Chasing Baal broke that vow
📖 Unfaithfulness describes worship, not just morals

## 🌀 Thou Hast Loved A Reward Upon Every Cornfloor

A cornfloor was a hard, flat space where grain was threshed.

Reward here means payment, the price Baal worship was believed to buy.

Many scholars believe this points to rituals performed at the threshing floor itself.

Israel treated a good harvest as Baal's payment instead of the LORD's gift.

🌀 A cornfloor was a threshing floor
💰 Reward means a payment they believed they earned
🛐 Rituals there were aimed at Baal
📖 The harvest was really the LORD's gift

## 🍇 The Floor And The Winepress Shall Not Feed Them

The floor is the same threshing floor already named for grain.

The winepress was where grapes were crushed to make wine.

Both were the two main sources of food and income for this farming nation.

God promises that both will fail at once, not just one crop.

🍇 The winepress crushed grapes for wine
🌾 Floor and winepress were the main food sources
📉 Both will fail together, not just one
📖 The false reward will not pay out

## 🗺️ They Shall Not Dwell In The LORD's Land

The land of Israel was never just real estate in this story.

It was the specific gift tied to God's covenant with His people.

Losing the land meant losing the sign of that whole relationship.

The punishment strikes at the deepest symbol of belonging to God.

🗺️ The land was tied to the covenant
🏠 It was a sign of belonging to God
💔 Losing it meant losing that sign
📖 The punishment reaches the relationship itself

## 🔄 Ephraim Shall Return To Egypt, And They Shall Eat Unclean Things In Assyria

Egypt was the land of slavery Israel's ancestors were rescued from.

Returning there pictures losing everything the exodus had won for them.

Assyria was the real empire that would soon conquer and deport Israel.

Unclean food means meals that broke God's dietary law given through Moses.

🔄 Egypt pictures a return to old slavery
⚔️ Assyria was the empire about to conquer them
🍽️ Unclean food broke God's dietary law
📖 Exile would undo their freedom and their worship

## 😔 Their Sacrifices Shall Be Unto Them As The Bread Of Mourners

Bread of mourners was food eaten around a dead body.

Touching a corpse made a person ritually unclean under the law.

Comparing their offerings to that bread means the offerings themselves were unclean.

Worship meant to please God had instead become something defiling.

😔 Bread of mourners was eaten near the dead
🚫 Touching death made a person unclean
🙅 Their offerings were being compared to that bread
📖 Worship meant to please God instead defiled it

## 🚪 Their Bread For Their Soul Shall Not Come Into The House Of The LORD

The house of the LORD means the temple in Jerusalem.

Bread for their soul describes food eaten as part of worship.

This line promises their worship would never reach that temple again.

Exile would cut Israel off from the one place God chose to meet them.

🚪 The house of the LORD means the temple
🍞 Bread for the soul means worship meals
🚫 That worship would never arrive there
📖 Exile cut them off from meeting God

# Hosea 9:5-9
# ⏰ The Days Of Reckoning Arrive
---
## 📆 What Will Ye Do In The Solemn Day, And In The Day Of The Feast Of The LORD

The solemn day and the feast of the LORD were set yearly festivals.

Passover and the Feast of Tabernacles are two clear examples of these.

The question is not really asking for an answer about logistics.

It points out that exile would make keeping these festivals impossible.

📆 These were Israel's yearly worship festivals
🕊️ Passover and Tabernacles are two examples
❓ The question is not about logistics
📖 Exile would make the festivals impossible

## 💀 They Are Gone Because Of Destruction

This line looks ahead to people already fleeing coming judgment.

Destruction here means the coming Assyrian conquest, not a vague disaster.

The people are pictured as already gone, as if it already happened.

Prophecy often speaks of the future this way to show how certain it is.

💀 Destruction means the coming Assyrian conquest
🏃 The people are pictured as already fleeing
⏳ The future is described as already happening
📖 This shows how certain the judgment was

## 🏺 Egypt Shall Gather Them Up, Memphis Shall Bury Them

Egypt here is pictured as a refuge for those fleeing Assyria.

Memphis was a major Egyptian city famous for its burial grounds.

Naming Memphis pictures many Israelites dying as refugees far from home.

Even the escape route from judgment would end in death.

🏺 Egypt was a refuge from Assyria
⚰️ Memphis was known for its burial grounds
💔 Many refugees would die there instead
📖 Even the escape ended in death

## 🌵 The Pleasant Places For Their Silver, Nettles Shall Possess Them

Pleasant places for their silver describes valuable homes and property.

Nettles and thorns are the weeds that take over abandoned land.

The picture is wealthy houses left empty and overgrown with weeds.

What once showed off Israel's wealth would become a ruin no one wanted.

🌵 Pleasant places means valuable homes
🌿 Nettles are weeds that take over ruins
🏚️ Wealthy houses would sit empty and overgrown
📖 Israel's wealth would become an abandoned ruin

## ⏳ The Days Of Visitation Are Come, The Days Of Recompence Are Come

Visitation in the Bible usually means God coming to inspect closely.

Recompence means paying back exactly what is deserved.

Both words describe the same coming moment of reckoning, said twice for weight.

The warning is no longer about someday, it has arrived.

⏳ Visitation means God inspecting closely
⚖️ Recompence means paying back what is owed
🔔 Both words describe the same reckoning
📖 The warning has now arrived

## 🤪 The Prophet Is A Fool, The Spiritual Man Is Mad

This is not God's own verdict on His true prophets.

It is how a corrupt nation now talked about anyone speaking for God.

Mocking true prophets as crazy is what happens when guilt runs too deep to hear truth.

Calling the messenger mad was easier than facing what the message said.

🤪 This is the nation's own mocking words
🙉 A guilty nation could not bear to listen
🗣️ Calling the prophet mad silenced the message
📖 Mockery was easier than facing the truth

## 👁️ The Watchman Of Ephraim Was With My God

A watchman stood on a high place to warn a city of danger.

This likely pictures the true prophet, the one meant to warn Israel.

Being with my God describes standing close to the LORD as a guide.

The true watchman was never the problem Israel was facing.

👁️ A watchman warned a city of danger
📣 This pictures the true prophet's role
🤝 Being with God means standing as His guide
📖 The true watchman was not Israel's problem

## 🪤 The Prophet Is A Snare Of A Fowler In All His Ways

A fowler was someone who hunted birds using a hidden trap.

A snare of a fowler means a trap built to catch something unaware.

This verse shifts to describe the false prophets Israel listened to instead.

Instead of warning the people, these false voices led them into disaster.

🪤 A fowler hunted birds with hidden traps
🐦 A snare catches something unaware
🗣️ This describes Israel's false prophets
📖 False voices led people into disaster

## 🧮 They Have Deeply Corrupted Themselves, As In The Days Of Gibeah

Gibeah was the site of a horrifying crime recorded in the book of Judges.

A visiting woman was attacked there, and the whole nation was shaken by it.

Comparing the present corruption to Gibeah names a historic low point for Israel.

The nation had fallen back to one of its worst remembered failures.

🧮 Gibeah was tied to a horrifying crime
📘 That story is told in Judges
📉 The present sin matched that low point
📖 Israel had fallen back to its worst failures

## ⚖️ Therefore He Will Remember Their Iniquity, He Will Visit Their Sins

Remember here does not mean God simply recalls old facts.

It means God now holds Israel responsible for what it has done.

Visit in this kind of verse means to inspect closely and then act.

The sins Israel hoped were forgotten were still fully on record.

⚖️ Remember means holding Israel responsible
🔍 Visit means inspecting closely before acting
🗒️ The sins were never actually forgotten
📖 Every sin stayed fully on record

# Hosea 9:10-14
# 🍇 Sweet Beginning, Bitter End
---
## 🍇 I Found Israel Like Grapes In The Wilderness

Finding grapes in a dry wilderness would be a rare, delightful surprise.

This pictures how God first found and delighted in Israel long ago.

The moment points back to the early wilderness years after the exodus.

God's first feelings toward this nation were tender, not harsh.

🍇 Grapes in the wilderness were a rare surprise
🥰 This pictures God's early delight in Israel
🗺️ It points back to the exodus years
📖 God's first feelings here were tender

## 🌳 I Saw Your Fathers As The Firstripe In The Fig Tree At Her First Time

Firstripe figs were the earliest fruit of the season, prized above the rest.

Farmers treasured the very first fig more than any fig that came later.

This continues the same picture of God's early, special delight in Israel.

Nothing about this nation's beginning suggested the betrayal that followed.

🌳 Firstripe figs were the season's first fruit
🏆 Farmers prized the first fig most of all
🥰 This continues God's early delight in Israel
📖 The beginning hinted at no betrayal

## 🛐 They Went To Baalpeor, And Separated Themselves Unto That Shame

Baalpeor names a false god Israel worshipped on the journey to Canaan.

This recalls a specific event recorded back in the book of Numbers.

Shame was a mocking label used for Baal worship throughout this book.

The sweet grapes and figs turned quickly into open betrayal.

🛐 Baalpeor was a false god from Numbers
📘 That story is told earlier in the Bible
😔 Shame was a mocking name for Baal worship
📖 Sweetness turned quickly into betrayal

## 🪞 Their Abominations Were According As They Loved

Abominations means things God finds utterly detestable, not minor missteps.

This line says Israel became as repulsive as the idols it chased.

People slowly start to resemble whatever they give their deepest love to.

Loving worthless gods eventually made the nation itself worthless to God.

🪞 Abominations means utterly detestable things
❤️ Israel became like what it loved
🔄 People resemble what they love most
📖 Worthless worship made the nation worthless too

## 🐦 As For Ephraim, Their Glory Shall Fly Away Like A Bird, From The Birth, And From The Conception

Glory here means Ephraim's honor, strength, and future as a people.

A bird flying away pictures something sudden and impossible to call back.

Naming birth, the womb, and conception covers every single stage of life.

No generation, born or unborn, would be spared from this loss.

🐦 A flying bird pictures sudden, final loss
👑 Glory means Ephraim's honor and future
🤰 Birth, womb, and conception cover every stage
📖 No generation would escape this loss

## 💔 Though They Bring Up Their Children, Yet Will I Bereave Them

Bereave means to be robbed of someone through death.

Even children raised safely to adulthood were not promised safety here.

This goes beyond the earlier warning about birth and the womb.

The loss would reach families who thought the worst was already behind them.

💔 Bereave means losing someone through death
👶 Even grown children were not promised safety
➕ This goes beyond the earlier warning
📖 The loss would reach families who felt safe

## 😢 Woe Also To Them When I Depart From Them

Woe is a cry of grief, not a small complaint.

God departing was the one loss worse than any other listed here.

Every disaster in this chapter flows from this deeper separation.

Losing God's presence was always the real tragedy underneath the rest.

😢 Woe is a cry of real grief
🚶 God's own departure is named directly
🌊 Every disaster flows from this separation
📖 Losing God's presence was the deeper tragedy

## 🏙️ Ephraim, As I Saw Tyrus, Is Planted In A Pleasant Place

Tyrus is the ancient city of Tyre, famous for its wealth and comfort.

Being planted in a pleasant place pictures a secure, prosperous location.

Ephraim is compared to Tyre at the height of its comfort and success.

That comparison makes what comes next even harder to expect.

🏙️ Tyrus is the wealthy city of Tyre
🌴 A pleasant place means comfort and security
📈 Ephraim is compared to Tyre at its best
📖 That comfort makes the next line unexpected

## ⚔️ Ephraim Shall Bring Forth His Children To The Murderer

Bring forth children normally describes one of life's greatest joys.

This line reverses that joy into something horrifying instead.

Murderer here points to soldiers who would kill Israel's children in the coming invasion.

Even new life would be born only to meet violence.

⚔️ Bringing forth children usually brings joy
🔄 This verse reverses that joy completely
🗡️ The murderer points to invading soldiers
📖 New life would meet violence instead of joy

## 🙏 Give Them, O LORD: What Wilt Thou Give? Give Them A Miscarrying Womb And Dry Breasts

This is the prophet Hosea speaking directly to God in prayer.

A miscarrying womb and dry breasts describe a complete end to having children.

Asking for this sounds harsh until the previous verse is remembered.

Hosea prays that no children be born rather than watch them die by violence.

🙏 Hosea prays this directly to God
🤰 Miscarrying and dry breasts mean no children
⚔️ The previous verse named children dying violently
📖 No birth felt kinder than birth into death

# Hosea 9:15-17
# 🥀 Rejected, Rootless, And Cast Away
---
## 📍 All Their Wickedness Is In Gilgal: For There I Hated Them

Gilgal was once a place of covenant renewal, back in the book of Joshua.

By this point in Israel's history it had become a center for corrupt worship.

Naming Gilgal points to a place that once meant something good gone badly wrong.

God names a specific location, not a vague, general complaint.

📍 Gilgal once meant covenant renewal in Joshua
📉 It later became a center of corrupt worship
🔄 A good place had gone badly wrong
📖 God names a specific guilty place

## 🚪 The Wickedness Of Their Doings I Will Drive Them Out Of Mine House

Mine house pictures the land and the nation as belonging to God himself.

Driving them out means removing them from that household entirely.

This continues the picture of Israel as a family God once welcomed in.

Persistent wrongdoing finally led to eviction, not just correction.

🚪 Mine house pictures the land as God's household
🚫 Driving them out means complete removal
👪 Israel had once been welcomed like family
📖 Persistent wrongdoing led to eviction

## 🚫 I Will Love Them No More: All Their Princes Are Revolters

Revolters means leaders who actively rebelled against God's authority.

This is not God's love failing on its own.

The nation's own leadership chose rebellion again and again.

Withdrawn love follows a leadership that never stopped turning away.

🚫 Revolters means leaders in active rebellion
💔 This is not God's love failing alone
👑 The nation's own leaders chose rebellion
📖 Withdrawn love followed constant leadership failure

## 🌳 Ephraim Is Smitten, Their Root Is Dried Up, They Shall Bear No Fruit

A root carries water and life up into the rest of a tree.

Smitten here means struck down by a heavy, deliberate blow.

A dried root cannot be fixed by caring for the branches above it.

No fruit means no future generations growing from this nation.

🌳 A root carries life to the whole tree
💥 Smitten means struck down deliberately
🥀 A dried root cannot be saved from above
📖 No fruit means no future generations

## 👶 Though They Bring Forth, Yet Will I Slay Even The Beloved Fruit Of Their Womb

Fruit of the womb is a Bible phrase simply meaning children.

Beloved shows these children would be dearly loved, not unwanted.

Even children who are born and deeply loved would not be spared here.

This is the harshest line in a chapter already full of loss.

👶 Fruit of the womb means children
❤️ Beloved shows these children were loved deeply
⚔️ Even loved children would not be spared
📖 This is the chapter's harshest warning

## 🌍 My God Will Cast Them Away, Because They Did Not Hearken Unto Him, And They Shall Be Wanderers Among The Nations

Hearken means to listen closely enough to actually obey.

Cast away names the final result of refusing to hearken for so long.

Wanderers among the nations pictures a people scattered with no homeland of their own.

The whole chapter's warnings land here, on a nation without a home.

🌍 Hearken means listening closely enough to obey
🚫 Cast away is the final result of refusing
🗺️ Wanderers means scattered with no homeland
📖 The chapter's warnings all land on this loss
`.trim();

export const HOSEA_NINE_PERSONAL_SECTIONS = parseHoseaNineRawNotes(HOSEA_NINE_RAW_NOTES);
