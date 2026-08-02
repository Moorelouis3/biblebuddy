export type ExodusTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyNineRawNotes(rawText: string): ExodusTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 29:${startVerse}` : `Exodus 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Exodus 29 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_NINE_RAW_NOTES = `# Exodus 29:1-4
# 🐂 Gathering What The Ordination Requires
---
## 🐂 Take One Young Bullock, And Two Rams Without Blemish

"Hallow" means to set someone apart for a holy task.

This ordination needed three animals, one bullock and two rams.

"Without blemish" meant no defects, no injuries, nothing weak or damaged.

Only a flawless animal could represent something as important as a priest's whole life.

🐂 Hallow means set apart for God

🐏 Three animals were required in all

✅ Without blemish means completely flawless

📖 A priest's ordination demanded nothing less

## 🍞 Unleavened Bread, And Cakes Unleavened Tempered With Oil

"Unleavened" means made without yeast, so the bread could not rise.

Three separate baked items were required, bread, cakes, and thin wafers.

Unleavened food pointed back to the hurried night Israel left Egypt.

There was no time then for bread to rise before leaving.

Everything used in this ceremony had to match that same purity.

🍞 Unleavened means made without yeast

🥧 Three separate baked items were needed

🏃 It recalled Israel's hurried exit from Egypt

📖 Purity mattered even in the smallest details

## 🚪 Bring Unto The Door Of The Tabernacle Of The Congregation

The "door" was the entrance into the tabernacle's outer courtyard.

This was the boundary between ordinary life and God's dwelling place.

Aaron and his sons had to physically cross that line to begin.

Every step of this ceremony started at the threshold, not inside.

🚪 The door marked the courtyard entrance

🏕️ It separated ordinary life from God's presence

👣 Aaron had to cross that threshold first

📖 Every step of the ritual began there

## 💧 Wash Them With Water

This washing came before any garment or oil touched them.

Water here symbolized moral cleanness, not simply removing dirt.

No one could be dressed as a priest while still unclean.

The order mattered, cleansing always came before clothing.

💧 Washing symbolized moral cleanness

🚫 Uncleanness could not be dressed over

🔢 Cleansing always came before clothing

📖 Order in the ritual carried meaning

# Exodus 29:5-9
# 👘 Dressing And Anointing The Priests
---
## 👘 Put Upon Aaron The Coat, And The Robe Of The Ephod, And The Ephod, And The Breastplate

Chapter twenty eight already described every one of these garments in detail.

Here they are finally placed on Aaron's body for the first time.

Each layer went on in a fixed order, coat first, then robe, then ephod.

The breastplate came last, since it hung over the two earlier layers.

Putting on the garments turned Moses into the one performing Aaron's ordination.

👘 Chapter twenty eight already described these garments

📋 Each layer went on in a fixed order

🫀 The breastplate came last, over the rest

📖 Moses himself performed Aaron's ordination

## 👑 Put The Mitre Upon His Head, And Put The Holy Crown Upon The Mitre

The "mitre" was a wound linen turban worn only during service.

The "holy crown" was the gold plate engraved Holiness To The Lord.

That plate sat on the very front of the mitre, tied with blue cord.

Layering the crown onto the turban finished the entire head covering at once.

👑 Mitre means a wound linen turban

🥇 Holy crown refers to the gold plate

🔵 Blue cord tied the plate in place

📖 The head covering was finished last

## 🫗 Take The Anointing Oil, And Pour It Upon His Head, And Anoint Him

Pouring oil on the head marked someone as chosen for a specific office.

Kings and priests both received this same kind of anointing in Israel.

Only Aaron received oil poured directly on his head this way.

His sons would be anointed differently later, by sprinkling instead of pouring.

This difference marked Aaron as the one high priest, not merely one among many.

🫗 Pouring oil marked someone as chosen

👑 Kings and priests both received anointing

🎯 Only Aaron had oil poured on his head

📖 This marked him as the one high priest

## 🧢 Put The Bonnets On Them

Aaron's sons received coats and girdles, much simpler than the high priest's outfit.

A "bonnet" was a smaller linen head covering, not the tall mitre Aaron wore.

Every ordinary priest still needed real garments, just not the same rank of garments.

The difference in clothing marked the difference in office without erasing either one.

👨‍👦 Aaron's sons wore simpler garments

🧢 Bonnet means a smaller linen head covering

📉 Their clothing marked a lower office

📖 Simpler did not mean unimportant

## ♾️ The Priest's Office Shall Be Theirs For A Perpetual Statute

"Perpetual statute" means a law meant to last without any end date.

The priesthood was not a temporary assignment given only to this generation.

"Consecrate" comes from a phrase meaning to fill the hand.

Verse twenty four later fulfills that phrase, when their hands are literally filled.

This chapter does not just describe consecration, it enacts the meaning of its own word.

♾️ Perpetual statute means a law without end

✋ Consecrate literally means to fill the hand

🙌 Verse twenty four fulfills that phrase literally

📖 The ritual enacts its own meaning

# Exodus 29:10-14
# 🩸 The Bullock For Sin
---
## ✋ Aaron And His Sons Shall Put Their Hands Upon The Head Of The Bullock

Laying hands on an animal's head identified the offerer with that offering.

It was a way of saying, this animal now stands in my place.

Aaron and his sons pressed their guilt and need onto this one bullock.

The animal would carry what belonged to them into its own death.

✋ Laying on hands identified the offerer

🐂 The animal stood in their place

😔 Their guilt was pressed onto the bullock

📖 The animal carried what belonged to them

## 👁️ Kill The Bullock Before The LORD, By The Door Of The Tabernacle

"Before the LORD" means this killing happened in God's own presence, not hidden away.

The door of the tabernacle was already established as the ceremony's starting point.

Nothing about this offering was done in secret or off to the side.

God himself was the witness to every single step of this sacrifice.

👁️ Before the LORD means done in His presence

🚪 It happened again at the same doorway

🙈 Nothing was hidden or done in secret

📖 God witnessed every step of the offering

## 🐂 Put It Upon The Horns Of The Altar With Thy Finger

The altar had four raised corners shaped like animal horns.

Blood touched those horns first, before anything else happened to it.

Horns represented strength and power throughout the ancient world.

Marking the altar's points of strength with blood joined power to atonement.

🐂 Horns were the altar's four raised corners

💪 Horns symbolized strength in the ancient world

🩸 Blood touched the horns first

📖 Atonement was joined to the altar's strength

## ⚖️ Pour All The Blood Beside The Bottom Of The Altar

After the horns, every remaining drop of blood went to the base.

Nothing was saved back, reused, or treated as ordinary liquid.

A life was being poured out completely, not partially.

This total pouring matched the seriousness of what the sin offering represented.

🩸 Every remaining drop reached the base

🚫 Nothing was saved back or reused

⚖️ The life was poured out completely

📖 The pouring matched the offering's seriousness

## 🧈 The Fat That Covereth The Inwards, And The Caul That Is Above The Liver

The "caul" was a fatty membrane wrapped around the liver.

Fat, kidneys, and that membrane were considered the richest parts of the animal.

Ancient people prized fat as the best portion of any meal.

Giving God the fat meant giving Him the best part first.

🧈 Caul means a fatty membrane near the liver

👑 Fat was considered the richest part

🍽️ Ancient people prized fat as the best portion

📖 God received the best part first

## 🔥 The Flesh Of The Bullock, And His Skin, And His Dung, Shalt Thou Burn With Fire Without The Camp

Only the fat and blood of this bullock went on the altar.

The rest of the meat, hide, and waste burned outside the camp entirely.

No one ate any part of a sin offering for the high priest.

Hebrews later connects this detail to Jesus suffering outside a city gate.

🔥 The remaining meat burned outside the camp

🚫 No one ate this sin offering

🏕️ Outside the camp meant away from holy ground

📖 Hebrews later connects this to Jesus

# Exodus 29:15-18
# 🔥 The Ram Of The Burnt Offering
---
## 🐏 Aaron And His Sons Shall Put Their Hands Upon The Head Of The Ram

This is the second of three animals used in the ordination.

Laying on hands happens again, the same identifying act as before.

This time the animal became a burnt offering, not a sin offering.

A burnt offering was given completely to God, with nothing eaten by anyone.

🐏 This was the second of three animals

✋ Laying on hands happened again

🔥 This animal became a burnt offering

📖 Burnt offerings were given completely to God

## ⭕ Sprinkle It Round About Upon The Altar

This blood was not placed on the horns like the bullock's blood.

Instead it was thrown in a ring pattern around the altar's sides.

Different offerings used different blood patterns, each one meaningful on its own.

The ring pattern here marked total devotion rather than atonement for sin.

🔴 This blood was not placed on the horns

⭕ It was thrown in a ring pattern

🔥 The ram was a different kind of offering

📖 Different offerings used different blood patterns

## 🔪 Cut The Ram In Pieces, And Wash The Inwards Of Him

The ram's body was divided into its natural sections before burning.

Even the inward parts, the organs, were washed clean first.

Nothing unclean, not even hidden inward parts, could go on the altar.

Purity reached all the way to the parts no one could see.

🔪 The ram was divided into sections

🫁 Inwards means the internal organs

💧 Even hidden parts were washed clean

📖 Purity reached what no one could see

## 🔥 It Is A Burnt Offering Unto The LORD: It Is A Sweet Savour

A burnt offering meant the entire animal was consumed by fire.

Nothing from it was set aside for a priest or a family meal.

"Sweet savour" is not about literal smell, it describes God's acceptance.

This offering pictured complete surrender, holding nothing back for oneself.

🔥 The entire animal was consumed

🚫 Nothing was set aside to eat

👃 Sweet savour describes God's acceptance

📖 The offering pictured complete surrender

# Exodus 29:19-21
# 👂 Blood On Ear, Thumb, And Toe
---
## 🐏 Take The Other Ram

This third animal is the ram of consecration, named later in verse twenty two.

Two rams were needed because they served two completely different purposes.

The first ram was wholly burned, given up entirely to God.

This second ram would instead ordain Aaron and his sons for service.

🐏 This is the third and final animal

🙌 It is later called the ram of consecration

🔥 The first ram was wholly burned

📖 This ram ordained the priests for service

## 👂 Upon The Tip Of The Right Ear Of Aaron, And Upon The Tip Of The Right Ear Of His Sons, And Upon The Thumb Of Their Right Hand, And Upon The Great Toe Of Their Right Foot

Blood touched three specific places on Aaron and his sons.

The ear stood for hearing and obeying God's word.

The thumb stood for the work their hands would do.

The toe stood for the path their feet would walk.

Every part of a priest's daily life was marked and set apart.

👂 The ear represented hearing and obeying

👍 The thumb represented the work of the hands

👣 The toe represented the path they walked

📖 Blood marked every part of daily life

## 🔗 Sprinkle The Blood Upon The Altar Round About

The same blood touched both the priests and the altar itself.

That connection tied the priests permanently to the place they would serve.

A priest could never be separated from the altar after this moment.

The two belonged together from the very start of the office.

🩸 The same blood touched priests and altar

🔗 It tied the priests to the altar

🚫 They could not be separated afterward

📖 Priest and altar belonged together from the start

## 🕯️ Sprinkle It Upon Aaron, And Upon His Garments

This time blood and anointing oil were mixed together and sprinkled.

Blood and oil both touched Aaron's body and his garments at once.

"Hallowed" means made holy, set apart for God's own use.

Even the clothing itself became holy through this final sprinkling.

🩸 Blood and oil were mixed together

👘 Both his body and garments were touched

🕯️ Hallowed means made holy

📖 Even the clothing became holy

# Exodus 29:22-25
# 🙌 The Ram Of Consecration
---
## 🐑 For It Is A Ram Of Consecration

The "rump" refers to the fat tail of the sheep, a valued delicacy.

This is the first time the text names this ram directly, ram of consecration.

The right shoulder was added here, a portion not used with the earlier ram.

That shoulder becomes important again later, as part of the priest's regular income.

🐑 Rump means the sheep's fat tail

🏷️ This ram is now formally named

💪 The right shoulder was added here

📖 That shoulder returns later as income

## 🧺 One Loaf Of Bread, And One Cake Of Oiled Bread, And One Wafer Out Of The Basket

The bread prepared back in verse two now enters the ceremony.

It had waited in its basket through the entire ritual so far.

Meat and bread are about to be combined into a single offering.

Nothing prepared earlier in the chapter was set aside or wasted.

🧺 The bread waited in its basket until now

🍞 It now joins the ram in one offering

🔗 Meat and bread were combined together

📖 Nothing prepared earlier went unused

## 🙌 Put All In The Hands Of Aaron, And In The Hands Of His Sons

Their hands were physically filled with meat and bread at this moment.

This is the literal action behind the word consecrate, to fill the hand.

A "wave offering" was moved toward the altar and then pulled back.

That motion pictured giving the gift to God and receiving it back again.

🙌 Their hands were physically filled

✋ This enacts the word consecrate directly

🌊 A wave offering moved toward the altar

📖 It pictured giving and receiving back

## 🔥 Receive Them Of Their Hands, And Burn Them Upon The Altar

After the waving, the food was taken back and placed on the fire.

None of it became a meal for Aaron or his sons this time.

Every part of this particular offering belonged entirely to God.

The hands that were just filled gave everything back immediately.

🔥 The food was placed on the fire

🚫 None of it became a meal here

🙏 It belonged entirely to God

📖 Filled hands gave everything back at once

# Exodus 29:26-28
# 🍞 The Priest's Portion Forever
---
## 🫀 It Shall Be Thy Part

This one breast belonged to Moses alone, since he performed this ordination.

No other priest would ever receive this exact portion again this way.

Moses acted as priest only this one time, for this one ceremony.

After this chapter, Aaron's line would carry the priesthood forward permanently.

🫀 The breast belonged to Moses this time

👤 Moses acted as priest only once

🔁 This exact portion was never repeated

📖 Aaron's line carried the priesthood forward

## 🌊 Sanctify The Breast Of The Wave Offering, And The Shoulder Of The Heave Offering

A wave offering moved horizontally, toward the altar and back again.

A "heave offering" moved vertically instead, lifted up and set back down.

Breast and shoulder each used one of these two ceremonial motions.

Both motions said the same thing, this gift belongs to God first.

🌊 Wave offerings moved side to side

⬆️ Heave offerings moved up and down

🫀 The breast used the wave motion

📖 Both motions gave the gift to God first

## 🏞️ It Shall Be Aaron's And His Sons' By A Statute For Ever

The priests owned no land inheritance like the rest of Israel's tribes.

This portion from every future peace offering became their steady income instead.

"Statute for ever" means this arrangement was never meant to expire.

God provided for the priesthood through the very sacrifices they performed.

🏞️ Priests received no land inheritance

🍽️ This portion became their steady income

♾️ Statute for ever means it never expired

📖 God provided through the sacrifices themselves

# Exodus 29:29-30
# 👨‍👦 Garments Passed Down The Line
---
## 👘 The Holy Garments Of Aaron Shall Be His Sons' After Him

The garments belonged to the office of high priest, not to Aaron personally.

When Aaron died, the very same clothing passed to his successor.

This meant the priesthood outlived any one man who ever wore it.

The office continued even when the individual holding it did not.

👘 The garments belonged to the office itself

🔁 The same clothing passed to his successor

⏳ The priesthood outlived any single man

📖 The office continued beyond the individual

## 🔢 That Son That Is Priest In His Stead Shall Put Them On Seven Days

The number seven marks a complete, finished period throughout this chapter.

A new high priest wore Aaron's garments continuously for a full week.

This mirrored the seven days the altar itself needed to be consecrated.

Nothing in this ordination was rushed or treated as optional.

🔢 Seven marks a complete period

👘 The garments were worn for a full week

🔥 It mirrored the altar's own seven days

📖 Nothing here was rushed or optional

# Exodus 29:31-34
# 🍲 Eating What Made Atonement
---
## 🍲 Seethe His Flesh In The Holy Place

"Seethe" is an old word that simply means to boil.

This meal was cooked inside the holy place, not in an ordinary kitchen.

Even preparing food became part of a sacred act during this ceremony.

Nothing about this week treated cooking as separate from worship.

🍲 Seethe means to boil

🏕️ The meal was cooked in the holy place

🍽️ Cooking itself became part of worship here

📖 Nothing in this week was purely ordinary

## 🍽️ Aaron And His Sons Shall Eat The Flesh Of The Ram, And The Bread

This meal was shared only among the priests being ordained.

Eating together sealed the ceremony the way a shared meal often does.

The same animal used for atonement became the food that fed them.

Consecration was not only symbolic, it fed real people real food.

🍽️ The meal was shared among the priests

🤝 Shared eating sealed the ceremony

🐑 The same animal became their food

📖 Consecration included something as ordinary as a meal

## 🚧 A Stranger Shall Not Eat Thereof, Because They Are Holy

"Stranger" here means anyone outside Aaron's priestly family.

This food had become holy, set apart for a specific purpose only.

Holiness created a real boundary around who could take part.

Not every gift from God was meant for every person to share.

🚫 Stranger means anyone outside the priestly family

🕯️ The food had become holy

🚧 Holiness created a real boundary

📖 Not every gift was meant for everyone

## 🔥 If Ought Of The Flesh Of The Consecrations, Or Of The Bread, Remain Unto The Morning, Then Thou Shalt Burn The Remainder With Fire

Nothing holy was allowed to sit out and decay overnight.

Leftover food from this meal had to be burned, not saved or reused.

This prevented anything sacred from being treated carelessly later on.

Respect for what was holy did not end when the ceremony did.

🌙 Nothing holy could sit out overnight

🔥 Leftovers were burned, not saved

🚫 This prevented careless reuse later

📖 Respect for holy things did not end quickly

# Exodus 29:35-37
# 🧼 Seven Days To Consecrate The Altar
---
## 🔁 According To All Things Which I Have Commanded Thee: Seven Days Shalt Thou Consecrate Them

Everything described so far had to be repeated for seven full days.

This was not a single afternoon ceremony finished all at once.

Exact obedience mattered more here than convenience or speed.

God specified the timing, not just the actions themselves.

🔁 The ceremony repeated for seven full days

⏳ This was not finished in one afternoon

✅ Exact obedience mattered more than speed

📖 God specified timing, not only actions

## 🐂 Offer Every Day A Bullock For A Sin Offering For Atonement: And Thou Shalt Cleanse The Altar

A new bullock was sacrificed once every day of the seven.

The altar itself needed atonement, even though it was only wood and metal.

"Cleanse" here means the altar had to be purified before it could be used.

An object could become associated with sin simply by handling something imperfect.

🐂 A new bullock was offered daily

🔥 The altar itself needed atonement

🧼 Cleanse means purified before use

📖 Even objects needed to be made ready

## ✋ It Shall Be An Altar Most Holy: Whatsoever Toucheth The Altar Shall Be Holy

Holiness here was not just a description, it was contagious by contact.

Anything that touched this altar afterward became holy simply by touching it.

This is the opposite of how uncleanness usually worked in Israel's law.

God's holiness was powerful enough to spread outward, not only to be guarded.

🔥 The altar became most holy

✋ Touching it made something holy too

🔄 This reversed how uncleanness usually spread

📖 God's holiness spread outward by contact

# Exodus 29:38-42
# ☀️ The Offering Every Morning And Evening
---
## 🐑 Two Lambs Of The First Year Day By Day Continually

This verse introduces an offering that never stopped, day after day.

"Continually" means this pattern was not just for the seven ordination days.

From this point on, Israel's altar burned every single day without fail.

This daily offering later became known simply as the continual offering.

🐑 Two lambs were required daily

🔁 Continually means never stopping

🔥 The altar burned every day from now on

📖 This became known as the continual offering

## 🌅 The One Lamb Thou Shalt Offer In The Morning

One lamb opened each day, and a second lamb closed it.

Morning and evening framed the entire day inside an act of worship.

Every single day in Israel began and ended the exact same way.

This rhythm continued for generations, long after this chapter was written.

🌅 One lamb was offered each morning

🌆 A second lamb closed the evening

📅 This framed every day in worship

📖 The rhythm continued for generations

## 📏 A Tenth Deal Of Flour Mingled With The Fourth Part Of An Hin Of Beaten Oil

A "tenth deal" was an ancient unit, about the size of a small bowl.

A "hin" was a liquid measure, about the size of a jug.

Each lamb came with its own flour, oil, and wine, not meat alone.

Together these formed a small complete meal, not merely an animal sacrifice.

Grain, oil, and wine were the everyday staple foods of Israel's tables.

📏 Tenth deal was about a small bowl

🏺 Hin was about the size of a jug

🍽️ Each lamb came with a full meal

📖 Everyday foods were offered, not just meat

## ♾️ This Shall Be A Continual Burnt Offering Throughout Your Generations

The evening lamb repeated the exact same flour, oil, and wine as the morning.

Nothing about the pattern changed between the two ends of the day.

"Continual" meant this offering would carry on throughout every future generation.

God promises here to meet with Israel at this very doorway.

This offering was never only about sacrifice, it was about God drawing near.

🔁 The evening lamb matched the morning exactly

♾️ Continual meant every future generation

🚪 God promised to meet Israel at this doorway

📖 Sacrifice here was about God drawing near

# Exodus 29:43-46
# 🏕️ I Will Dwell Among Them
---
## ✨ There I Will Meet With The Children Of Israel, And The Tabernacle Shall Be Sanctified By My Glory

God repeats His promise to meet Israel at the tabernacle door.

This time He adds that His own glory will make the place holy.

No ritual, oil, or blood alone had the power to do this.

Only God's own presence could finish what human hands had started.

🤝 God repeats His promise to meet Israel

✨ His glory would sanctify the place

🩸 Blood and oil alone could not do this

📖 Only God's presence finished what hands began

## 🏕️ I Will Sanctify The Tabernacle Of The Congregation, And The Altar: I Will Sanctify Also Both Aaron And His Sons

Every major element from this chapter appears together in one final list.

The tabernacle, the altar, and the priests all needed the same thing.

Human ceremony prepared them, but God's own action truly made them holy.

This verse ties the whole chapter back to its real source of power.

🏕️ The tabernacle needed to be sanctified

🔥 So did the altar

👨‍👦 So did Aaron and his sons

📖 God's own action made them holy

## 🎯 I Will Dwell Among The Children Of Israel, And Will Be Their God

This is the real goal behind every instruction in this chapter.

God was not asking for ritual for its own sake.

He wanted to live among His people, close enough to be present daily.

This echoes the closeness lost back in the garden of Eden.

🏕️ God wanted to dwell among His people

🎯 Ritual was never the final goal

🌳 This echoes the closeness lost in Eden

📖 God wanted daily nearness, not distance

## ⛓️ That Brought Them Forth Out Of The Land Of Egypt, That I May Dwell Among Them

The exodus from Egypt was never only about escaping slavery.

Freedom was always meant to lead somewhere, to this very moment.

God rescued Israel so He could live close to them, not just release them.

The whole book of Exodus points forward to this one dwelling promise.

⛓️ The exodus was never only about escaping

🎯 Freedom was meant to lead somewhere

🏕️ God rescued Israel to live close to them

📖 Exodus points forward to this dwelling promise
`.trim();

export const EXODUS_TWENTY_NINE_PERSONAL_SECTIONS = parseExodusTwentyNineRawNotes(EXODUS_TWENTY_NINE_RAW_NOTES);
