export type HoseaTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaTwoRawNotes(rawText: string): HoseaTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 2:${startVerse}` : `Hosea 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Hosea 2 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_TWO_RAW_NOTES = `# Hosea 2:1-3
# ⚖️ The Nation Taken To Court
---
## 🔄 Say Ye Unto Your Brethren, Ammi

Ammi is a Hebrew word that simply means my people.

Chapter one ended with God naming a son Loammi, meaning not my people.

This verse flips that same word back into a blessing.

The whole nation is told to start calling each other by the reversed name.

🔄 Ammi means my people

👶 Loammi was the opposite name

✅ The reversal undoes the judgment name

📖 A whole nation gets a new name

## 💔 To Your Sisters, Ruhamah

Ruhamah means pitied, or shown mercy.

Chapter one closed with a daughter named Loruhamah, meaning no mercy.

This verse reverses that name the same way Ammi reversed Loammi.

Both reversals arrive together, side by side, as one announcement.

💔 Loruhamah meant no mercy

🔄 Ruhamah reverses that name

👭 Sisters here means the women of the nation

📖 Two judgment names get undone at once

## ⚖️ Plead With Your Mother, Plead

Plead is legal language, the kind used when someone brings a formal case.

The mother here stands for the nation of Israel as a whole.

God is not having a private argument, He is opening a trial.

Hosea's own children become the witnesses calling their mother into court.

⚖️ Plead means bring a legal case

🗺️ The mother represents the whole nation

📢 God is opening a public trial

📖 Hosea's children stand as the witnesses

## 📜 She Is Not My Wife, Neither Am I Her Husband

This sounds like a divorce announcement, stated in plain legal terms.

In this culture a husband could end a marriage by a formal declaration.

God is not ending the covenant completely.

He is naming its broken state out loud.

📜 This echoes a formal divorce statement

⚖️ A husband could end things by declaring it

🚫 The covenant is named as broken

📖 The marriage picture becomes a lawsuit

## 🚨 Let Her Therefore Put Away Her Whoredoms Out Of Her Sight

Whoredoms here is not one sin, it is a whole pattern of unfaithfulness.

Prophets regularly pictured Israel's idol worship as cheating on a spouse.

Putting away means a complete removal, not a partial cleanup.

The demand is as serious as asking an unfaithful spouse to end an affair.

🚨 Whoredoms means a pattern of unfaithfulness

🖼️ Idolatry is pictured as adultery

🧹 Put away means a full removal

📖 The demand matches ending a real affair

## 😳 Lest I Strip Her Naked, And Set Her As In The Day That She Was Born

Public nakedness was a real shame punishment used in the ancient world.

Being set as the day she was born pictures total exposure, back to nothing.

This punishes the same unfaithfulness pictured as adultery back in verse two.

The threat fits the pictured affair, it is not random cruelty.

😳 Public nakedness was a real shame penalty

🍼 As in birth means stripped to nothing

⚖️ The punishment matches the pictured crime

📖 The threat fits the pictured affair

## 🏜️ Make Her As A Wilderness, And Set Her Like A Dry Land, And Slay Her With Thirst

A wilderness in this region was not just empty, it was dangerous and lifeless.

Dry land pictures a place where nothing can grow without God's gift of rain.

Thirst became a real danger in a land that depended on seasonal rain.

The punishment removes the very things the nation credited to other gods.

🏜️ Wilderness meant a dangerous, lifeless place

🌵 Dry land cannot grow anything on its own

💧 Thirst was a real danger here

📖 God removes what false gods were credited for

# Hosea 2:4-5
# 👧 A Mother's Choice, A Family's Fate
---
## 👶 I Will Not Have Mercy Upon Her Children

The children here are the people of Israel, not literal individual babies.

Their fate is tied to their mother's unfaithfulness, the nation's own choice.

This connects back to the name Loruhamah, no mercy, from chapter one.

A generation inherits a consequence it did not choose to start.

👶 Children here means the people of Israel

🔗 Their fate follows the mother's choice

💔 This echoes the name Loruhamah

📖 A generation inherits a consequence

## 🏷️ They Be The Children Of Whoredoms

This repeats a phrase already used of the children in chapter one.

It is not a personal accusation against any one child's behavior.

It names the family's identity as shaped by the mother's unfaithfulness.

A name like this one kept the whole community aware of why judgment was coming.

🔁 This phrase repeated from chapter one

🚫 It is not about personal guilt

🏷️ It names an identity, not a crime

📖 The name kept judgment visible to everyone

## 💰 Their Mother Hath Played The Harlot

Harlot is the KJV word for a prostitute, someone paid for unfaithfulness.

Calling the nation a harlot was the strongest insult a prophet could use.

It was not meant to describe actual prostitution by Hosea's wife alone.

It pictured Israel's worship of other gods as a paid betrayal of God.

💰 Harlot meant a paid, unfaithful partner

🗣️ This was the strongest insult available

🙏 It pictures worship given to other gods

📖 Betrayal, not prostitution, is the real point

## 💔 I Will Go After My Lovers, That Give Me My Bread And My Water

Lovers here stands for the false gods Israel worshipped, especially Baal.

Bread and water meant the most basic food and drink a family needed.

Wool, flax, oil, and drink round out the list of everyday provisions.

Israel credited these ordinary gifts to Baal instead of to the LORD who gave them.

💔 Lovers means the false gods Israel chased

🍞 Bread and water were basic daily needs

🧵 Wool and flax provided clothing material

📖 Israel thanked the wrong god for these gifts

# Hosea 2:6-7
# 🌵 A Path Blocked On Purpose
---
## 🌾 I Will Hedge Up Thy Way With Thorns

A hedge of thorns was a real farming method to block animals from a field.

Here God uses that same method to block Israel's path to her false gods.

The blocking is not random cruelty.

It protects her from a path that only leads to more harm.

🌾 Thorn hedges were a real farming tool

🚧 God blocks the path to false gods

🛑 The block protects, it does not just punish

📖 A closed door can still be mercy

## 🧱 Make A Wall, That She Shall Not Find Her Paths

A wall here works the same way as the thorn hedge just described.

It blocks her from ever finding her way back to her old lovers.

Losing the path is presented as part of the rescue, not just the punishment.

Confusion becomes the first step toward her eventually coming home.

🧱 A wall blocks the same old path

🚫 She cannot find her way back to idols

🎯 Losing the path starts the rescue

📖 Confusion becomes a step toward coming home

## 🏃 She Shall Follow After Her Lovers, But Shall Not Overtake Them

Overtake means to catch up to and reach something.

Israel keeps chasing her false gods but the chase goes nowhere.

This is the direct result of the hedge and wall just set up.

The false gods cannot deliver, no matter how hard she runs after them.

🏃 Overtake means to catch up and reach

🚫 The chase goes nowhere this time

🌾 This result comes from the hedge and wall

📖 False gods cannot deliver, however hard she runs

## 🔄 I Will Go And Return To My First Husband

This is the turning point of the whole chapter, spoken by the unfaithful wife herself.

First husband means the LORD, the one she left to chase other lovers.

She finally admits that life was better under the covenant she broke.

Hardship, not comfort, is what finally gets her attention.

🔄 This marks the chapter's turning point

💍 First husband refers back to the LORD

🙋 She finally admits life was better before

📖 Hardship succeeds where comfort had failed

# Hosea 2:8-9
# 🌾 Crediting The Wrong God
---
## 🌾 She Did Not Know That I Gave Her Corn, And Wine, And Oil

Corn, wine, and oil were the three staple products of life in ancient Israel.

Grain fed the people, wine lifted spirits at meals, and oil fueled lamps and cooking.

Israel assumed these came from Baal, the local storm and fertility god.

The LORD, not Baal, had been the true source behind every harvest all along.

🌾 Corn, wine, and oil were daily staples

💡 Oil fueled lamps and cooking

⛈️ Baal was wrongly credited as the source

📖 The LORD was the true giver all along

## 💰 Multiplied Her Silver And Gold, Which They Prepared For Baal

Silver and gold here means Israel's growing national wealth, not just personal jewelry.

That wealth grew under God's provision during the prosperous reign named in chapter one.

Instead of thanking the LORD, the nation used that wealth to make items for Baal worship.

The gift itself got turned into material for the very idol that replaced the giver.

💰 Silver and gold meant national wealth

📈 This wealth grew under God's provision

🛐 It was spent on worship of Baal

📖 The gift was turned against the giver

## ⏳ I Will Return, And Take Away My Corn In The Time Thereof

Taking away corn at harvest time meant removing it exactly when it was expected.

The timing makes the loss impossible to miss or explain away.

This answers verse eight directly, the very gifts credited to Baal are removed.

God shows that He, not Baal, controls whether the harvest ever arrives.

⏳ The timing makes the loss unmistakable

🔁 This answers verse eight directly

🌾 The credited gifts get taken back

📖 God proves He controls the harvest

## 🧵 Recover My Wool And My Flax Given To Cover Her Nakedness

Wool and flax were the two main materials used to make clothing in this region.

Covering nakedness here means basic clothing, not only the shame from verse three.

These were gifts the LORD had given, now called His own again, taken back.

The nation that misused a gift ends up losing the gift itself.

🧵 Wool and flax made ancient clothing

👗 Covering nakedness means basic clothing here

🔄 God reclaims His own gift

📖 Misusing a gift can cost the gift

# Hosea 2:10-13
# 🎪 Every Celebration Silenced
---
## 🔍 I Will Discover Her Lewdness In The Sight Of Her Lovers

Discover here means expose or uncover, not find out for the first time.

Lewdness points back to the shameful exposure already threatened in verse three.

This time the exposure happens in front of the very lovers she chased.

The false gods she trusted cannot shield her from this public shame.

🔍 Discover means expose, not find out

😳 This echoes the shame from verse three

👥 It happens in front of her lovers

📖 False gods cannot protect her from shame

## 🙌 None Shall Deliver Her Out Of Mine Hand

Deliver means to rescue or save from danger.

Mine hand pictures God's direct power and control over what happens next.

Israel had trusted military alliances and other gods to deliver her before.

None of those will work once God Himself decides to act.

🙌 Deliver means to rescue from danger

✋ God's hand pictures His direct power

🤝 Alliances and idols had been trusted instead

📖 Nothing rescues her once God acts

## 🎉 I Will Cause All Her Mirth To Cease

Mirth means joyful celebration, the kind connected to festivals and worship.

This is not a small inconvenience, it removes the whole rhythm of community life.

Israel's calendar was built around these recurring celebrations all year long.

Taking away the celebrations exposes how empty worship without God really is.

🎉 Mirth means festive, joyful celebration

📅 These festivals shaped the whole calendar

🕳️ Removing them empties daily community life

📖 Celebration without God proves hollow

## 📆 Her Feast Days, Her New Moons, And Her Sabbaths

Feast days were set yearly festivals like Passover and the Feast of Tabernacles.

New moons marked the start of each month with a special offering.

Sabbaths were the weekly day of rest commanded back at Mount Sinai.

This list covers the entire rhythm of Israel's religious calendar, not one holiday.

📆 Feast days were Israel's yearly festivals

🌙 New moons marked each new month

🛑 Sabbaths were the weekly day of rest

📖 The whole religious calendar is named here

## 🍇 I Will Destroy Her Vines And Her Fig Trees

Vines and fig trees were common symbols of peace and settled prosperity.

Having your own vine and fig tree meant a safe, stable life.

Destroying them removes the very picture of security Israel had come to expect.

The threat targets the comfort she trusted instead of the God who gave it.

🍇 Vines and figs pictured peace and safety

🏡 Owning them meant a stable life

💥 Destroying them removes that false security

📖 Comfort, not God, had become the real trust

## 💸 These Are My Rewards That My Lovers Have Given Me

Rewards here is the word for payment given to a prostitute for her services.

Israel is quoted actually saying this out loud, crediting Baal for her own blessings.

The quote makes her confusion painfully specific, not just a general accusation.

Naming her own words this plainly makes the coming correction impossible to miss.

💸 Rewards was payment language for a harlot

🗣️ Israel is quoted saying this herself

🎯 The quote makes the charge specific

📖 Her own words convict her here

## 🌲 I Will Make Them A Forest, And The Beasts Of The Field Shall Eat Them

Turning cared for orchards into a wild forest pictures total abandonment of the land.

Beasts eating the produce means no one is left to harvest or protect it.

A forest in this image is not peaceful, it is a sign of ruin.

Cultivated land left untended quickly reverts to wilderness in this climate.

🌲 A forest here pictures abandonment, not peace

🐗 Wild beasts eat the unprotected crop

🏚️ No one remains to harvest it

📖 Untended land reverts to wild ruin

## 💎 She Decked Herself With Her Earrings And Her Jewels, And Went After Her Lovers

Decking herself with jewelry describes getting dressed up for worship.

It reads like someone getting ready for a date.

Earrings and jewels may also point to items worn in Baal worship ceremonies.

Forgat me means the LORD quietly faded from her daily memory.

The real danger was not one dramatic moment.

It was years of God being quietly left out.

💎 Decking herself describes dressing up for worship

🛐 Jewelry may connect to Baal ceremonies

🧠 Forgat me means God faded from memory

📖 Slow forgetting was the real danger

# Hosea 2:14-15
# 🏜️ Wooing Her Back Into The Wilderness
---
## 💞 I Will Allure Her, And Bring Her Into The Wilderness

Allure means to win someone over gently, the opposite of force.

The wilderness was where Israel first became a nation after leaving Egypt.

God is not just punishing her, He is taking her back to where the relationship started.

Sometimes love has to clear everything else away before it can be heard.

💞 Allure means winning someone over gently

🏕️ The wilderness is where Israel first began

🔄 God returns her to where it started

📖 Love sometimes needs empty space to be heard

## 🗣️ Speak Comfortably Unto Her

Comfortably here is closer to speaking tenderly, not just saying something nice.

The same Hebrew phrase describes speaking kindly to someone who is grieving.

After chapters of courtroom language and threats, the tone changes completely here.

Judgment was never the final word, tenderness was always waiting underneath it.

🗣️ Comfortably means speaking tenderly

😢 The same phrase fits comforting grief

🔀 The tone shifts from courtroom to comfort

📖 Tenderness was waiting under the judgment

## 🍇 I Will Give Her Her Vineyards From Thence

Vineyards here are the same vines destroyed back in verse twelve.

What was torn down in judgment gets rebuilt as a fresh gift.

Thence simply means from that place, referring back to the wilderness.

The exact thing lost in judgment returns restored on the other side.

🍇 These are the same vines from verse twelve

🔨 Judgment is followed by rebuilding

📍 Thence means from that same place

📖 What was lost comes back restored

## ⚠️ The Valley Of Achor For A Door Of Hope

Achor means trouble, and it was a real valley near Jericho.

Achor got its grim name after a man named Achan was judged there, in Joshua chapter seven.

Turning a valley named trouble into a door of hope reverses its whole reputation.

The very place tied to an old disaster becomes the entrance to a new beginning.

⚠️ Achor means trouble, a real valley

📜 It was named after Achan's judgment

🚪 This valley becomes a door of hope

📖 An old disaster site becomes a new start

# Hosea 2:16-17
# 🏷️ New Names For A New Marriage
---
## 💍 Thou Shalt Call Me Ishi

Ishi is Hebrew for my husband, a warm, personal term.

It is the opposite of a formal legal title.

It sounds almost like a pet name.

After all the courtroom language earlier in this chapter, this word feels completely different.

The relationship is being rebuilt as a marriage again, not a lawsuit.

💍 Ishi means my husband, a warm term

⚖️ This contrasts the earlier legal language

❤️ It sounds personal, almost like a pet name

📖 The lawsuit turns back into a marriage

## 🛑 Shalt Call Me No More Baali

Baali means my Baal, or my lord, using the storm god's own name.

Even calling God by a title that echoed Baal's name had to end.

This is more than ending idol worship.

It is cleaning the very language of the idol's trace.

Words shape how people think, so even a name had to change.

🛑 Baali echoed the name of the idol Baal

🧹 Even the language had to be cleaned

🗣️ Words were shaping how people thought

📖 The idol's trace had to disappear completely

## 🛐 I Will Take Away The Names Of Baalim Out Of Her Mouth

Baalim is the plural of Baal, covering every local storm and fertility god worshipped.

Taking the names out of her mouth means she will stop speaking them at all.

This goes further than destroying idols.

It erases the very vocabulary of idol worship.

A people cannot keep worshipping gods whose names they no longer even say.

🛐 Baalim means the many local Baal gods

🤐 Her mouth will stop speaking those names

🧼 The vocabulary of idolatry gets erased

📖 Unspoken names cannot keep being worshipped

## 🧠 They Shall No More Be Remembered By Their Name

This promises more than silence.

It promises an eventual forgetting.

Future generations will not even recognize the names of these old gods.

Baal worship had been a real danger in Israel for generations before this.

Removing the memory itself protects children not yet born from ever being tempted by it.

🧠 This promises more than silence

👶 Future generations will not know these names

⚠️ Baal worship endangered generations before this

📖 Removing memory protects children not yet born

# Hosea 2:18-20
# 🕊️ A Covenant With Everything, And A Marriage Vow
---
## 🤝 I Will Make A Covenant For Them With The Beasts Of The Field

A covenant here means a binding agreement, usually made between people.

Making one with wild animals is unusual.

It extends peace beyond the nation itself.

Beasts of the field, birds, and crawling things cover every category of wild creature.

Even creation itself gets pulled into this promised peace.

🤝 A covenant is a binding agreement

🐾 This one extends to wild animals

🐦 Beasts, birds, and crawling things cover all creatures

📖 Creation itself joins in this promised peace

## 🏹 I Will Break The Bow And The Sword And The Battle Out Of The Earth

Bow, sword, and battle together stand for all human warfare, not three separate items.

Breaking them out of the earth means war itself will stop, at least for a time.

This answers the broken bow promised earlier in chapter one, but in reverse.

There God broke Israel's own military strength, here He breaks war itself as a threat.

🏹 Bow, sword, and battle mean all warfare

🛑 War itself is removed, not just one army

🔄 This reverses chapter one's broken bow

📖 Safety here does not depend on weapons

## 🐑 Make Them To Lie Down Safely

Lying down safely was the picture of a flock resting without fear of attack.

Shepherds and farmers lived with constant danger from wild animals and raiders.

This picture connects back to the wilderness journey described earlier in this chapter.

Peace here is not just the absence of war.

It is the presence of real rest.

🐑 This pictures a flock resting unafraid

🐺 Real danger from animals and raiders was constant

🏕️ It connects back to the wilderness journey

📖 Peace means rest, not just no war

## 💍 I Will Betroth Thee Unto Me For Ever

Betroth means a formal engagement, a legally binding promise to marry.

This is addressed directly to Israel, now spoken to as thee, singular and personal.

For ever makes this promise permanent, unlike the earlier judgments that had an end point.

The relationship broken by unfaithfulness is being rebuilt from its very foundation.

💍 Betroth means a binding promise to marry

👆 Thee makes this personal, not just national

♾️ For ever makes the promise permanent

📖 The relationship rebuilds from its foundation

## ⚖️ I Will Betroth Thee Unto Me In Righteousness, And In Judgment

Righteousness means doing what is right, consistently and completely.

Judgment here means fair, right ruling, not punishment.

These two words describe the kind of husband God will be, not Israel's qualifications.

A marriage built on these two traits could never be built on manipulation or unfairness.

⚖️ Righteousness means consistently doing what is right

👨‍⚖️ Judgment here means fair ruling, not punishment

💍 Both describe God as the husband

📖 This marriage cannot be built on unfairness

## 🤍 In Lovingkindness, And In Mercies

Lovingkindness is the Hebrew word chesed, covenant loyalty that keeps showing up.

Mercies pictures the deep compassion of a parent toward a helpless child.

Four qualities now describe this marriage, righteousness, judgment, lovingkindness, and mercies.

None of these were true of Israel's past.

They describe only what God brings to this marriage.

🤍 Lovingkindness is chesed, steady covenant loyalty

🤱 Mercies pictures a parent's deep compassion

🔢 Four qualities now describe this marriage

📖 All four come from God, not Israel

## 🤝 I Will Even Betroth Thee Unto Me In Faithfulness: And Thou Shalt Know The LORD

Faithfulness is the fifth and final quality completing this new marriage vow.

Know here means far more than knowing facts about someone.

In this kind of covenant language, to know means a close, loyal, lived out relationship.

The whole point of this new marriage is finally knowing God, not just knowing about Him.

🤝 Faithfulness is the fifth covenant quality

🧠 Know means more than facts here

❤️ It means a close, loyal relationship

📖 Knowing God is this marriage's whole goal

# Hosea 2:21-23
# 🌍 A Chain Of Mercy From Heaven To Earth
---
## 🔗 I Will Hear The Heavens, And They Shall Hear The Earth

This pictures a chain of requests passed down, like a relay instead of one command.

God hears the heavens, meaning the sky that controls rain in this farming culture.

The heavens then hear the earth, which needs that rain to produce anything at all.

Every harvest depends on this chain working all the way down, link by link.

🔗 This pictures a chain, not one command

🌧️ Heavens control the rain in this culture

🌍 Earth needs that rain to produce anything

📖 A whole chain must work for a harvest

## 🌾 The Earth Shall Hear The Corn, And The Wine, And The Oil

The chain keeps extending, now reaching the crops themselves.

Corn, wine, and oil are the same three staples named back in verse eight.

What Israel wrongly credited to Baal now flows from a restored, working chain under God.

The exact blessing once stolen by misplaced worship gets fully restored here.

🔗 The chain keeps extending to the crops

🌾 Corn, wine, and oil repeat from verse eight

🔄 These gifts now flow from God again

📖 A stolen blessing gets fully restored

## 🌾 They Shall Hear Jezreel

Jezreel began this chapter's story as a name of warning, back in chapter one.

Jezreel can also mean God sows, not only the valley of bloodshed.

At the end of the chain, even the name Jezreel gets to hear good news.

The same word that opened in judgment closes here in restoration.

🌾 Jezreel can mean God sows

⚔️ It began as a name of judgment

🔗 It sits at the chain's very end

📖 The same name now carries good news

## 🌱 I Will Sow Her Unto Me In The Earth

Sowing pictures planting seed in the ground, expecting a harvest later.

This plays directly on Jezreel's own meaning, God sows, now acted out for real.

Israel becomes the seed, planted by God Himself back into the land.

What was scattered in judgment gets deliberately replanted in mercy.

🌱 Sowing means planting seed for a harvest

🌾 This acts out Jezreel's own meaning

🇮🇱 Israel becomes the seed God plants

📖 Scattering in judgment turns into replanting

## 💔 I Will Have Mercy Upon Her That Had Not Obtained Mercy

This directly reverses the name Loruhamah, no mercy, from chapter one.

The one who had not obtained mercy now receives it in full.

Nothing about Israel's record earned this change.

The reversal comes from God's choice alone.

💔 This reverses Loruhamah, no mercy

🔄 The unmerciful verdict gets overturned

🎁 Nothing in Israel's record earned this

📖 God's own choice drives the reversal

## 🚫 I Will Say To Them Which Were Not My People, Thou Art My People

This reverses the name Loammi, not my people, from the very start of chapter one.

The reversal is spoken directly, as a declaration, not a hope for someday.

Paul later quotes this exact reversal in Romans to describe Gentiles being welcomed in.

A name built to announce judgment becomes the very name that welcomes people in.

🚫 This reverses Loammi, not my people

📢 It is spoken as a direct declaration

✝️ Paul later quotes this in Romans

📖 A judgment name becomes a welcome

## 🗣️ They Shall Say, Thou Art My God

This is the matching response to God's declaration in the line before it.

A relationship this broken needed both sides speaking, not just God announcing.

The whole chapter started with a lawsuit against an unfaithful wife.

It ends with both voices agreeing, finally, on who they belong to.

🗣️ This answers God's declaration directly

🤝 Both sides now speak, not just God

⚖️ The chapter began as a lawsuit

📖 It ends in agreement about belonging
`.trim();

export const HOSEA_TWO_PERSONAL_SECTIONS = parseHoseaTwoRawNotes(HOSEA_TWO_RAW_NOTES);
