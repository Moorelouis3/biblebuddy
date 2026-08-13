export type SecondKingsSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsSeventeenRawNotes(rawText: string): SecondKingsSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsSeventeen\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsSeventeen\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsSeventeen\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 17:${startVerse}` : `2 Kings 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 2 Kings 17 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_SEVENTEEN_RAW_NOTES = `# SecondKingsSeventeen 17:1-4
# 👑 Hoshea Becomes King, Then Assyria's Vassal
---
## 📅 In The Twelfth Year Of Ahaz King Of Judah

Kings in Israel and Judah are dated against each other's reigns.

Ahaz was already ruling in Judah when this note was written.

Hoshea begins his reign twelve years into Ahaz's rule.

This dating habit keeps both thrones lined up on one timeline.

Hoshea will turn out to be the last king Israel ever has.

📅 Dated by the other kingdom's king

👑 Ahaz already reigns in Judah

🕰️ Twelve years into Ahaz's rule

📖 Hoshea becomes Israel's final king

## 🏙️ Hoshea The Son Of Elah To Reign In Samaria

Hoshea reigns from Samaria, the capital city of the northern kingdom.

He rules for nine years total, according to this verse.

No other king of Israel will ever reign after him.

The name Hoshea means salvation.

The man carrying that name cannot save his own kingdom.

🏙️ Hoshea rules from Samaria

🔢 His reign lasts nine years

🚫 No Israelite king follows him

📖 His own name means salvation

## ⚖️ Did That Which Was Evil In The Sight Of The LORD

This exact sentence describes almost every king Israel ever had.

Evil here means covenant unfaithfulness, not simply personal bad behavior.

It centers on false worship more than everyday morality.

Every king of the northern kingdom carried this same verdict.

Hoshea inherits two centuries of that unbroken pattern.

⚖️ Evil means covenant unfaithfulness here

🛐 The verdict centers on worship

👑 Every northern king shares this verdict

📖 Hoshea inherits two centuries of it

## 😕 But Not As The Kings Of Israel That Were Before Him

This phrase sounds like a compliment hidden inside a condemnation.

Hoshea is still called evil in the sentence just before it.

He is only less evil than the kings who came before him.

Ahab and his family had devoted the northern throne fully to Baal.

Being less bad than Ahab still leaves Hoshea guilty before God.

😕 Sounds like a compliment, is not

👑 Hoshea is still called evil

🔥 Ahab's family fully served Baal

📖 Less bad is still guilty

## 🤝 Hoshea Became His Servant, And Gave Him Presents

Servant here means a vassal king paying tribute to a stronger empire.

Shalmaneser the Fifth was the Assyrian king demanding this submission.

Presents is a polite word for tribute, not a friendly gift.

Ahaz used this same strategy with Assyria one chapter earlier.

Buying safety with tribute never fixes the deeper problem of unfaithfulness.

🤝 Servant means a paying vassal

👑 Shalmaneser the Fifth demands tribute

📦 Presents really means tribute paid

📖 Tribute never fixes unfaithfulness

## ✉️ He Had Sent Messengers To So King Of Egypt

Hoshea secretly asks Egypt for help against Assyria.

So was an Egyptian ruler, though scholars still debate exactly who he was.

Turning to Egypt directly breaks his submission to Assyria.

A vassal king is never allowed to seek a rival protector.

This is the conspiracy that will cost Hoshea his freedom.

✉️ Hoshea secretly contacts Egypt

❓ So's identity is debated

🚫 Vassals cannot seek rival protectors

📖 This conspiracy costs him everything

## 🔒 Shut Him Up, And Bound Him In Prison

Assyria discovers the secret conspiracy with Egypt.

Hoshea is arrested and imprisoned by his own overlord.

The text never says whether Hoshea dies in prison or survives.

Israel now has no king at all for the first time in its history.

The nation is left leaderless right as the Assyrian army approaches.

🔒 Assyria discovers the conspiracy

⛓️ Hoshea is arrested and imprisoned

👑 Israel now has no king

📖 The nation stands leaderless before Assyria

# SecondKingsSeventeen 17:5-9
# ⚔️ The Siege And Fall Of Samaria
---
## 🛡️ Besieged It Three Years

Besieged means the Assyrian army surrounded Samaria to cut off supplies.

Samaria sat on a hill, which made it hard to capture quickly.

Three years shows how long the city actually held out.

Hoshea himself is already in prison during this entire siege.

The city fights on even with its own king gone.

🛡️ Besieged means surrounded to starve out

⛰️ Samaria's hill made it defensible

🔢 The siege lasts three full years

📖 The city holds even without its king

## 🏙️ In The Ninth Year Of Hoshea The King Of Assyria Took Samaria

The siege that started in Hoshea's seventh year finally succeeds.

The Assyrian king who besieged Samaria was likely Shalmaneser the Fifth.

Assyrian records credit the actual capture to his successor, Sargon the Second.

The Bible names only the office, the king of Assyria, not one man.

Either way, the northern kingdom of Israel ends here for good.

🏙️ Samaria finally falls to Assyria

👑 Sargon the Second likely completed it

📜 The Bible names only the office

📖 The northern kingdom ends here for good

## 🚶 Carried Israel Away Into Assyria

Assyria's standard policy was mass deportation of conquered peoples.

Removing a population broke its ability to organize any rebellion.

These exiled Israelites become known later as the ten lost tribes.

Unlike Judah's later exile, this deportation is never reversed.

The northern kingdom disappears from history at this exact moment.

🚶 Assyria deported conquered populations routinely

🚫 Deportation prevented any future rebellion

🔟 These become the ten lost tribes

📖 The northern kingdom disappears from history

## 🗺️ Halah And In Habor By The River Of Gozan, And In The Cities Of The Medes

These are real regions inside the Assyrian empire, not vague places.

Halah and Gozan sat in northern Mesopotamia, far from Israel's homeland.

The cities of the Medes lay even farther east, near modern Iran.

Scattering Israelites across such distant regions sped up their assimilation.

They are pulled far enough away that return becomes impossible.

🗺️ These are real Assyrian regions

🧭 Halah and Gozan sat in Mesopotamia

🏔️ The Medes lived farther east still

📖 Distance made assimilation nearly certain

## ✍️ The Children Of Israel Had Sinned Against The LORD Their God

The writer now pauses the story to explain why this happened.

Sinned means they broke the covenant they had agreed to keep.

This is not political bad luck striking an innocent nation.

Verses seven through twenty three give the Bible's fullest explanation for a national collapse.

Every detail from here forward supports that one central claim.

✍️ The writer pauses to explain

📜 Sinned means broken covenant terms

🚫 This was not random bad luck

📖 Every detail ahead supports this claim

## 🕊️ Which Had Brought Them Up Out Of The Land Of Egypt

This clause reminds the reader exactly who delivered Israel from slavery.

The LORD is named here as their rescuer before He is named as their judge.

That order matters, since it makes their unfaithfulness even worse.

They owed their entire existence as a nation to this God.

Judgment now falls on the very people He once carried out of bondage.

🕊️ God is named as rescuer first

⛓️ He delivered them from Egyptian slavery

💔 Their unfaithfulness ignores that rescue

📖 Judgment falls on the ones He freed

## 😨 And Had Feared Other Gods

Feared here means worshipped and served, not simply felt afraid of.

Israel gave to false gods the reverence that belonged only to the LORD.

This single phrase summarizes centuries of the northern kingdom's worship.

Everything listed in the following verses grows out of this one root sin.

😨 Feared here means worshipped

🛐 Reverence went to false gods

🌳 This sin has centuries of history

📖 Every sin below grows from this root

## 📜 Walked In The Statutes Of The Heathen

Statutes here means the customs and laws that shaped pagan worship.

Heathen refers to the Canaanite nations already living in the land.

The LORD had driven those nations out for these very practices.

Israel now adopts the exact customs God had judged before them.

Copying a judged people invites the same judgment on yourself.

📜 Statutes means the customs of worship

🌍 Heathen means the Canaanite nations

🚫 God had judged those nations already

📖 Copying them invites the same judgment

## ⛰️ They Built Them High Places In All Their Cities

High places were local hilltop shrines built outside the temple system.

True worship was meant to be centered at the temple in Jerusalem.

Building them in every city means this was not one bad decision.

It was a nationwide habit repeated in place after place.

⛰️ High places were local hilltop shrines

🏛️ Worship belonged at the temple only

🏙️ Every city built its own shrine

📖 This was a nationwide habit

# SecondKingsSeventeen 17:10-14
# 🌳 Every Hill And Every Warning
---
## 🗿 They Set Them Up Images And Groves In Every High Hill

Images here means carved idols representing false gods.

Groves refers to wooden poles honoring the Canaanite goddess Asherah.

Asherah worship was usually paired with worship of the god Baal.

Every high hill means this covered the whole landscape of Israel.

🗿 Images means carved idol statues

🌳 Groves means wooden Asherah poles

🔥 Asherah worship paired with Baal

📖 This covered the whole landscape

## 🌲 And Under Every Green Tree

Green tree language marks a site tied to fertility worship.

These trees were thought to connect worshippers to the power of nature itself.

The phrase appears again and again across the Old Testament as a warning sign.

Wherever this phrase shows up, pagan worship is happening nearby.

🌲 Green tree marks fertility worship

🌱 Trees symbolized nature's power

🔁 The phrase repeats across the Old Testament

📖 It always signals pagan worship nearby

## 🕯️ They Burnt Incense In All The High Places

Burning incense was a normal part of ancient worship everywhere.

The problem was never the incense itself.

The problem was where it was burned and to whom.

High places instead of the temple made every offering illegitimate.

🕯️ Incense itself was not the problem

📍 Location and object mattered most

🚫 High places made offerings illegitimate

📖 Right worship needed the right place

## 🛠️ Wrought Wicked Things To Provoke The LORD To Anger

Wrought is an old word simply meaning did or performed.

Provoke means to deliberately stir someone toward anger.

This was not careless drifting into bad habits.

The text frames this as defiance aimed straight at God.

🛠️ Wrought means did or performed

😠 Provoke means deliberately stirring anger

🎯 This was intentional, not careless

📖 Defiance was aimed straight at God

## 📝 They Served Idols, Whereof The LORD Had Said Unto Them, Ye Shall Not Do This Thing

Whereof is an old word meaning about which or concerning which.

Ye is simply the old word for you, spoken to a group.

God had already forbidden this exact practice in the law of Moses.

This was not ignorance, since the command had been given directly.

Israel breaks a rule they already knew by name.

📝 Whereof means concerning which

🗣️ Ye is the old word for you

📜 God had forbidden this by name

➡️ They knew the rule and broke it

## ⚖️ The LORD Testified Against Israel, And Against Judah

Testified means God formally warned them, like a witness stating facts on record.

Both kingdoms receive this same warning, not just the northern one.

Judah's failure later in this chapter will not come as a surprise.

God gave clear notice before any judgment ever arrived.

⚖️ Testified means formally warned on record

🇮🇱 Both kingdoms receive this warning

📢 Judah is warned too, not just Israel

📖 Warning always comes before judgment

## 👁️ By All The Prophets, And By All The Seers

Seers is an older word for prophets who received visions.

All the prophets means this was not one lone voice crying out.

Generation after generation of messengers repeated the same call.

Israel had no excuse of never being warned.

👁️ Seers means prophets who saw visions

🔁 Many prophets repeated the same message

🗣️ Generations of messengers spoke up

📖 Israel cannot claim no warning came

## 🔄 Turn Ye From Your Evil Ways, And Keep My Commandments

This is the actual content of what every prophet was saying.

Turn means a full change of direction, not a small adjustment.

The call always paired repentance with obedience to the law.

God's warnings were never vague.

They named the exact fix needed.

🔄 Turn means a full change of direction

📜 Keep my commandments means obey the law

🎯 The message was never vague

📖 Repentance and obedience were named directly

## 🐂 They Would Not Hear, But Hardened Their Necks

Hardened their necks is an old idiom for stubborn refusal.

The image comes from an ox that refuses to bend under the yoke.

Hearing in the Bible often means obeying, not just listening.

They heard the words perfectly well and simply refused to obey.

🐂 Hardened necks pictures a stubborn ox

👂 Hearing here means obeying

🚫 They refused on purpose, not by accident

📖 The words were heard and rejected

# SecondKingsSeventeen 17:15-17
# 🔥 Vanity, Calves, And Fire
---
## 🚫 They Rejected His Statutes, And His Covenant

Rejected means they knowingly refused, not that they simply forgot.

Statutes were the specific laws God gave at Sinai.

Covenant was the larger binding relationship those laws lived inside.

They did not misplace the rules.

They threw out the whole relationship instead.

🚫 Rejected means knowingly refused

📜 Statutes were the laws from Sinai

🤝 Covenant was the whole relationship

📖 They threw out the relationship itself

## 💨 They Followed Vanity, And Became Vain

Vanity here means something empty and worthless, like idols themselves.

The Old Testament often calls idols vanity because they cannot act or save.

Became vain means the worshippers themselves grew as empty as what they worshipped.

A person becomes like the god they choose to serve.

💨 Vanity means empty and worthless

🗿 Idols cannot act or save anyone

🪞 Worshippers become like their idols

📖 You become like what you worship

## 📋 Left All The Commandments Of The LORD Their God

This phrase widens the charge from specific sins to total abandonment.

All means nothing was kept, not even the basics.

The commandments once defined this nation's whole identity.

By this point almost nothing of that identity remains.

📋 All means nothing was kept

🆔 Commandments once defined their identity

💔 That identity is now nearly gone

📖 Total abandonment, not partial failure

## 🔥 Made Them Molten Images, Even Two Calves

Molten means metal that was melted down and poured into a shape.

These two calves point straight back to Jeroboam's golden calves at Bethel and Dan.

Jeroboam built them two centuries earlier so people would not travel to Jerusalem.

The kingdom's founding sin is still alive at the moment of its collapse.

🔥 Molten means melted and shaped metal

🐂 These are Jeroboam's calves again

🏛️ He built them to replace Jerusalem

📖 The founding sin outlives the kingdom

## ⭐ Worshipped All The Host Of Heaven, And Served Baal

Host of heaven refers to the sun, moon, and stars treated as gods.

Many ancient nations worshipped the sky itself as divine power.

Baal was the Canaanite storm god tied to rain and crops.

Israel now worships nearly every rival god available to them.

⭐ Host of heaven means sun, moon, stars

🌌 Ancient nations treated the sky as divine

⛈️ Baal was the Canaanite storm god

📖 Israel worshipped nearly every rival god

## 👶 Caused Their Sons And Their Daughters To Pass Through The Fire

This phrase describes child sacrifice offered to the god Molech.

The law of Moses named this practice by name and forbade it directly.

Parents burned their own children believing it pleased their god.

This is the darkest sin listed anywhere in this chapter.

🔥 This describes child sacrifice to Molech

📜 The law forbade this by name

💔 Parents sacrificed their own children

📖 This is the chapter's darkest sin

## 🔮 Used Divination And Enchantments

Divination means trying to predict the future through omens or magic.

Enchantments means casting spells or chanting charms over people or objects.

The law of Moses forbade both practices in Deuteronomy chapter eighteen.

Israel sought guidance from magic instead of asking God directly.

🔮 Divination means predicting by omens

✨ Enchantments means casting spells or charms

📜 Deuteronomy eighteen forbids both practices

📖 They sought magic instead of God

## 💰 Sold Themselves To Do Evil In The Sight Of The LORD

Sold themselves is a vivid way of describing total surrender to sin.

The image is of a person trading away their own freedom.

Nothing forced Israel into this.

They chose every one of these sins themselves.

💰 Sold themselves means total surrender

⛓️ They traded away their own freedom

🙋 No one forced this choice on them

📖 Every sin listed here was chosen

# SecondKingsSeventeen 17:18-20
# ⚖️ Israel Falls, Judah Is Warned
---
## 😠 The LORD Was Very Angry With Israel

This anger is not a sudden outburst but the result of centuries of patience running out.

Every warning in verses seven through seventeen led toward this moment.

God's anger here is judicial, tied directly to broken covenant terms.

It is never described as random or without real cause.

😠 Anger follows centuries of patience

⏳ Every warning built toward this moment

⚖️ This anger is judicial, not random

📖 Real cause always precedes real judgment

## 🔟 There Was None Left But The Tribe Of Judah Only

This states plainly how total the collapse of the north really was.

Ten tribes are effectively gone from the biblical story after this chapter.

Judah alone remains to carry David's family line forward.

The promise to David now depends on one surviving tribe.

🔟 Ten tribes are effectively gone

🇮🇱 Judah alone survives this collapse

👑 David's line depends on Judah now

📖 One tribe carries the whole promise

## 🇮🇱 Judah Kept Not The Commandments Of The LORD Their God

The writer refuses to let Judah feel superior to Israel here.

Judah watched the north fall and still did not change course.

This same charge against Israel now gets applied to Judah too.

No kingdom in this story gets treated as automatically innocent.

🇮🇱 Judah is not treated as innocent

👀 Judah watched Israel fall and ignored it

📋 The same charge now applies to Judah

📖 No kingdom here gets a free pass

## 📋 Walked In The Statutes Of Israel Which They Made

Judah did not invent new sins.

They copied the customs Israel had already made.

A bad neighbor's example can spread faster than anyone expects.

Judah had David's example available and chose Israel's instead.

📋 Judah copied Israel's own customs

🏘️ Bad examples spread between neighbors

👑 David's example was still available

📖 Judah chose the worse example anyway

## 🌱 The LORD Rejected All The Seed Of Israel

Seed here means descendants, the whole family line of Jacob.

All signals this judgment was not limited to a few guilty leaders.

The entire nation shares in the consequence of its own choices.

This is a rejection of the people, not just their kings.

🌱 Seed means descendants of Jacob

📋 All means the whole nation

👥 Consequence lands on the people, not just kings

📖 A whole nation shares this judgment

## 🏴 Delivered Them Into The Hand Of Spoilers

Spoilers means raiders who plunder and take whatever they want.

God allows enemy nations to become the tool of this judgment.

Assyria becomes the visible hand behind an invisible verdict.

The empire thinks it is conquering on its own.

It is only carrying out God's verdict without knowing it.

🏴 Spoilers means raiders who plunder

🛠️ God uses enemies as His tool

🇦🇸 Assyria becomes the visible hand

📖 Assyria carries out an invisible verdict

# SecondKingsSeventeen 17:21-23
# 🐂 The Sin That Started It All
---
## ✂️ He Rent Israel From The House Of David

Rent is an old word meaning torn or split apart violently.

This looks back to the kingdom's division under Solomon's son Rehoboam.

The house of David refers to Judah's ongoing royal family line.

Ten of the twelve tribes tore away from that line at that split.

✂️ Rent means torn apart violently

👑 This recalls the split under Rehoboam

🇮🇱 The house of David means Judah's royal line

📖 Ten tribes tore away at that split

## 👑 They Made Jeroboam The Son Of Nebat King

Jeroboam becomes the very first king of the new northern kingdom.

He is always identified by his father Nebat throughout this book.

That careful naming keeps him distinct from any other Jeroboam later on.

His reign becomes the pattern every future northern king repeats.

👑 Jeroboam becomes the first northern king

🆔 He is named by his father Nebat

🔁 His reign sets the pattern ahead

📖 Every later king repeats his pattern

## 🚗 Jeroboam Drave Israel From Following The LORD

Drave is simply the old past tense of drove.

Jeroboam actively steered his people away from true worship.

This was not neglect.

It was deliberate policy from the very start.

🚗 Drave means drove, an old past tense

🧭 Jeroboam steered his people away

🎯 This was policy, not neglect

📖 The wrong direction was set on purpose

## 🐂 Made Them Sin A Great Sin

Jeroboam sets up golden calves at Bethel and Dan for a political reason.

He feared his people would return their loyalty to Jerusalem and David's line.

A political fear reshaped the entire nation's worship for two centuries.

One king's insecurity became every citizen's daily temptation.

🐂 Golden calves solved a political fear

🏛️ He feared a return to Jerusalem

⏳ This reshaped worship for two centuries

📖 One king's fear became everyone's temptation

## 🔁 The Children Of Israel Walked In All The Sins Of Jeroboam

This exact phrase repeats constantly across the books of Kings.

It becomes a kind of label attached to nearly every northern king.

Not one king from the north ever fully broke this pattern.

Nineteen kings later, the description still fits perfectly.

🔁 This phrase repeats across the book

🏷️ It labels almost every northern king

🚫 No king ever fully broke it

📖 Nineteen kings later, it still fits

## 🕰️ So Was Israel Carried Away Out Of Their Own Land To Assyria Unto This Day

Unto this day marks the writer's own present moment, not ours.

The exile was already old news by the time this book was written.

This detail proves the writer had real access to Israel's history.

The sin begun by one king ends in the loss of the whole land.

🕰️ Unto this day means the writer's own time

✍️ The exile was already old news

📚 This shows real historical memory

📖 One king's sin costs the whole land

# SecondKingsSeventeen 17:24-28
# 🦁 Assyria Resettles Samaria
---
## 🔄 The King Of Assyria Brought Men From Babylon, And From Cuthah

Assyria followed a standard policy of population exchange after conquest.

Conquered peoples were moved out, and other conquered peoples were moved in.

Babylon and Cuthah were both cities within the wider Assyrian empire.

These transplanted families become the ancestors of the later Samaritans.

🔄 Assyria practiced population exchange after war

🏙️ Babylon and Cuthah lay within the empire

👥 Foreign families now settle in Israel

📖 They become ancestors of the Samaritans

## 🔀 Placed Them In The Cities Of Samaria Instead Of The Children Of Israel

Instead of makes the substitution explicit and permanent.

The original population is gone, and a new one takes its place.

This is exactly why the northern tribes never return as a nation.

Someone else now lives in the towns Israel once called home.

🔀 Instead of means a full substitution

🚪 The original population is simply gone

🏚️ New families fill Israel's old towns

📖 This is why the tribes never return

## ❓ They Feared Not The LORD

The new residents arrive with no knowledge of Israel's God at all.

They keep worshipping whatever gods they had brought from home.

Fear here again means reverence and worship, not simple emotion.

A land once devoted to the LORD now sits nearly empty of His worship.

❓ New residents know nothing of the LORD

🗺️ They kept worshipping their old gods

🙏 Fear here means reverence and worship

📖 The land sits nearly empty of true worship

## 🦁 Therefore The LORD Sent Lions Among Them

Lions still lived wild in this region during this period.

The text presents this as a direct act of God's judgment.

It answers the disrespect described in the previous verse.

A land under God still answers to Him, even under new tenants.

🦁 Wild lions still lived in this region

⚖️ The text calls this direct judgment

👊 It answers the previous verse's disrespect

📖 The land still answers to God

## 🌍 Know Not The Manner Of The God Of The Land

Many ancient peoples believed each land had its own local deity.

Manner here means the correct customs required to worship that god.

The new settlers assume the lions are that local god's complaint.

They are more right than they realize, without meaning to be.

🌍 Ancient peoples believed in local deities

📜 Manner means the correct customs required

🦁 They read the lions as a complaint

📖 They are right without meaning to be

## 📍 Carry Thither One Of The Priests Whom Ye Brought From Thence

Thither is an old word meaning to that place.

Thence is an old word meaning from that place.

The king of Assyria orders a captured priest sent back to Samaria.

A practical political problem gets a practical religious solution.

📍 Thither means to that place

🔙 Thence means from that place

👑 Assyria's king sends a priest back

📖 A political problem gets a religious fix

## 🧑‍🏫 Taught Them How They Should Fear The LORD

This priest was one of the very priests exiled from Israel's own high places.

Bethel was the exact site of Jeroboam's original golden calf.

True worship of the LORD is now taught from a corrupted shrine.

The teaching is real, but the setting is still compromised from the very start.

🧑‍🏫 The priest was exiled from Israel

🐂 Bethel once held Jeroboam's golden calf

🏛️ True teaching happens at a corrupted shrine

📖 Even reform starts from compromised ground

# SecondKingsSeventeen 17:29-31
# 🗿 Each Nation Kept Its Own Gods
---
## 🗿 Every Nation Made Gods Of Their Own

Each transplanted people group keeps worshipping its home gods.

Resettlement did not erase anyone's original religion.

The result is many different gods worshipped side by side in one land.

This sets up the specific list the next two verses describe.

🗿 Each group kept its home gods

🚫 Resettlement did not erase religion

🌍 Many gods now share one land

📖 The next verses name them directly

## 🏛️ Put Them In The Houses Of The High Places Which The Samaritans Had Made

These were the very shrines Israel had built for its own idols.

The foreign settlers simply move into buildings already standing.

Samaritans here refers to the region's new mixed population, not yet a distinct religion.

Old Israelite idolatry supplies the physical space for new pagan idolatry.

🏛️ These were Israel's own former shrines

🚪 Settlers moved into standing buildings

👥 Samaritans means this new mixed population

📖 Old idolatry supplied space for new idolatry

## 🗿 The Men Of Babylon Made Succothbenoth

Succothbenoth was a god associated with the Babylonian goddess Zarpanitu.

Naming it this specifically shows real historical memory, not invention.

Each transplanted group is named with the god it actually worshipped.

The list reads like a record, not a vague generalization.

🗿 Succothbenoth ties to a Babylonian goddess

📚 This detail shows real historical memory

📋 Each group gets its actual god named

📖 The list reads as a real record

## 💀 The Men Of Cuth Made Nergal

Nergal was a real Mesopotamian god tied to death and plague.

He was worshipped widely in the region Cuth had come from.

A god of death now receives worship in the land of the living God.

The contrast between Nergal and the LORD could hardly be sharper.

💀 Nergal was a god of death

🌍 He came from the region of Cuth

⚖️ Death now competes with the living God

📖 The contrast could hardly be sharper

## 🗿 The Men Of Hamath Made Ashima

Ashima was a deity worshipped by the people who came from Hamath.

Little detail about Ashima survives outside this one biblical mention.

Its brief mention here still confirms the same historical pattern.

Every settled group brings its god with it, without exception.

🗿 Ashima came from the people of Hamath

📉 Little else survives about this god

🔁 The same pattern repeats each time

📖 Every group brought its own god

## 🗿 The Avites Made Nibhaz And Tartak

The Avites worshipped two gods at once, not just one.

Little is known about Nibhaz and Tartak beyond their names here.

Multiple gods per group shows how layered this idolatry really was.

One settled family alone could bring an entire pantheon with them.

🗿 The Avites worshipped two gods

❓ Little else is known about them

🧩 Multiple gods show layered idolatry

📖 One family could bring a pantheon

## 🔥 The Sepharvites Burnt Their Children In Fire To Adrammelech And Anammelech

This is the exact same child sacrifice already condemned earlier in this chapter.

Adrammelech and Anammelech were gods worshipped by the people of Sepharvaim.

Foreign settlers repeat Israel's worst sin without Israel even teaching it to them.

Child sacrifice was never unique to Israel.

It was a wider regional horror.

🔥 This repeats the child sacrifice from before

🗿 Adrammelech and Anammelech were Sepharvite gods

🌍 Foreign settlers repeat this on their own

📖 Child sacrifice was a regional horror

# SecondKingsSeventeen 17:32-34
# 🎭 They Feared The LORD, And Served Their Own Gods
---
## 👤 Made Unto Themselves Of The Lowest Of Them Priests Of The High Places

These new priests were not from the tribe of Levi at all.

The lowest of them means people chosen without any regard for qualification.

This copies the exact same failure Jeroboam started two centuries earlier.

Real worship of the LORD requires more than just calling someone a priest.

👤 These priests were not Levites

📉 They were chosen without qualification

🔁 This repeats Jeroboam's original failure

📖 A title alone does not make worship real

## 🎭 They Feared The LORD, And Served Their Own Gods

This sentence is the chapter's clearest picture of religious mixing.

They add the LORD to their worship without ever giving up their own gods.

Real devotion to God does not share space with other gods.

A little bit of true worship next to idols is still idolatry.

🎭 This sentence pictures religious mixing

➕ The LORD gets added, not chosen fully

🚫 True devotion shares no space

📖 A little idolatry is still idolatry

## 🗺️ After The Manner Of The Nations Whom They Carried Away From Thence

These settlers keep the exact worship habits of their original homelands.

Assyria moved their bodies but never touched their beliefs.

A change of address rarely produces a change of heart.

Old habits travel with people wherever they get resettled.

🗺️ They kept their homeland worship habits

🚚 Assyria moved bodies, not beliefs

🏠 A new address rarely changes the heart

📖 Old habits travel with the people

## 🔁 Unto This Day They Do After The Former Manners

This is the second time this exact phrase appears in this chapter.

It marks the writer's own lifetime, long after these events occurred.

The mixed worship described here was still ongoing when this book was written.

This pattern eventually shapes the later Samaritans of the New Testament era.

🔁 This phrase appears a second time

🕰️ It marks the writer's own lifetime

📚 The mixed worship was still ongoing

📖 This shapes the later Samaritans

## 🆔 The Children Of Jacob, Whom He Named Israel

Jacob was renamed Israel by God back in the book of Genesis.

That new name meant something like one who strives with God.

The chapter now uses both names in one single breath.

The people meant to carry that name are the ones who abandoned it.

🆔 Jacob was renamed Israel in Genesis

💪 The name means one who strives with God

📛 Both names appear in one breath

📖 The name bearers abandoned what it meant

# SecondKingsSeventeen 17:35-41
# 📜 What The Covenant Actually Asked
---
## 🤝 The LORD Had Made A Covenant, And Charged Them

Covenant means a binding agreement with clear terms on both sides.

Charged means God gave them a direct command to keep.

This covenant goes back to Mount Sinai in the book of Exodus.

What follows lists that covenant's actual terms.

🤝 Covenant means a binding agreement

📢 Charged means a direct command

⛰️ This goes back to Mount Sinai

📖 The terms follow directly after this

## 1️⃣ Ye Shall Not Fear Other Gods, Nor Bow Yourselves To Them

This restates the very first of the ten commandments plainly.

Fear here again means worship and reverence, not simple emotion.

Bowing was a physical act of submission before a ruler or a god.

Every sin listed earlier in this chapter breaks this one exact command.

☝️ This restates the first commandment

🙏 Fear means worship and reverence here

🙇 Bowing meant physical submission

📖 Every earlier sin breaks this command

## 💪 With Great Power And A Stretched Out Arm

This phrase describes God's rescue of Israel out of Egypt.

A stretched out arm pictures strength reaching out to act decisively.

This exact phrase repeats often throughout the books of Moses.

The God who rescued them this way still expects their loyalty.

💪 This describes the rescue from Egypt

🦾 A stretched out arm pictures decisive strength

🔁 This phrase repeats often in Moses' books

📖 The rescuer still expects loyalty

## ✅ Him Shall Ye Fear, And Him Shall Ye Worship

This is the positive command paired with the earlier warning against other gods.

Fear and worship belong together.

They are not two separate options to choose between.

The command names exactly one proper object for both.

✅ This is the positive command

🔗 Fear and worship belong together

🥇 Only one object fits both

📖 The command leaves no other option

## 👀 Ye Shall Observe To Do For Evermore

Observe to do means actually practicing the law, not merely knowing it.

Evermore means this obligation was never meant to expire.

No future generation was ever exempted from this command.

This chapter shows exactly how far that obedience eventually drifted.

👀 Observe to do means real practice

♾️ Evermore means the command never expires

🚫 No generation was ever exempted

📖 This chapter shows how far it drifted

## 🧠 The Covenant That I Have Made With You Ye Shall Not Forget

Forgetting here is treated as its own kind of sin.

Memory itself becomes a covenant duty, not just an obedience duty.

Israel's whole history in this chapter reads like a long act of forgetting.

A nation cannot keep terms it has stopped remembering.

🧠 Forgetting counts as its own sin

📜 Memory itself was a covenant duty

📖 This chapter reads like slow forgetting

➡️ You cannot keep what you forget

## 🛡️ He Shall Deliver You Out Of The Hand Of All Your Enemies

This promise was always attached to faithfulness, never offered unconditionally.

Protection from enemies depended on loyalty to this one God alone.

Israel wanted the safety this verse promises without the loyalty it required.

A promise cannot be claimed apart from its condition.

🛡️ Protection was tied to faithfulness

🔗 Loyalty was the condition attached

😕 Israel wanted safety without loyalty

📖 A promise needs its condition kept

## 🔀 Howbeit They Did Not Hearken

Howbeit is an old word meaning however or nevertheless.

Hearken means to listen and then actually obey.

This same refusal already appeared earlier in this exact chapter.

The covenant's clear terms met a flat and final refusal.

🔀 Howbeit means however or nevertheless

👂 Hearken means listening and obeying

🔁 This refusal already appeared earlier

📖 Clear terms met a final refusal

## 🗿 So These Nations Feared The LORD, And Served Their Graven Images

Graven images means idols carved or cast by human hands.

This closing verdict describes the transplanted nations, not the original Israelites.

The exact same failure that doomed Israel now describes their replacements too.

Changing who lives in the land did not change the pattern of sin.

🗿 Graven images means idols made by hand

👥 This describes the transplanted nations

🔁 The same failure repeats with new people

📖 New residents, same old pattern

## 👨‍👩‍👧 Both Their Children, And Their Children's Children

This closing phrase tracks the sin across multiple future generations.

A parent's mixed worship becomes a child's inherited normal.

The chapter began with one king's failure and ends with a whole people's habit.

Unto this day, the final words of the chapter, mean the writer still saw it happening.

👨‍👩‍👧 Sin passes down through generations

🏠 A parent's habit becomes a child's normal

➡️ The chapter opened with one king's failure

📖 It closes as a whole people's habit
`.trim();

export const SECOND_KINGS_SEVENTEEN_PERSONAL_SECTIONS = parseSecondKingsSeventeenRawNotes(SECOND_KINGS_SEVENTEEN_RAW_NOTES);
