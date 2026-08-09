export type FirstSamuelTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwoRawNotes(rawText: string): FirstSamuelTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 2:${startVerse}` : `1 Samuel 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Samuel 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWO_RAW_NOTES = `# FirstSamuel 2:1-3
# 🎶 Hannah's Prayer Of Praise
---
## 😢 My Heart Rejoiceth In The LORD

Hannah is the same woman who once wept so hard a priest thought she was drunk.

"Rejoiceth" means the joy has burst out into open praise, not quiet relief.

This prayer answers the very prayer she prayed in tears one chapter earlier.

Grief and worship can come from the exact same person.

They just do not come at the exact same time.

😢 She once wept before this same LORD

🎉 Rejoiceth means joy spoken out loud

🔁 This prayer answers her earlier one

📖 Grief and praise can share one story

## 🐂 Mine Horn Is Exalted

A "horn" in the Bible pictures the horn of a strong wild animal, like a bull or ram.

Lifting the horn is a picture of confidence after being pushed down for years.

Hannah had been mocked and shamed for years before Samuel was born.

Now she pictures herself standing tall instead of bowed under insult.

🐂 Horn pictures an animal's strength

💪 A lifted horn means new confidence

😔 Hannah had been shamed for years

📖 She now stands tall instead of bowed

## 🗣️ My Mouth Is Enlarged Over Mine Enemies

"Enlarged" here means her mouth is finally free to speak boldly.

For years Hannah had no answer for Peninnah's taunting about her empty womb.

Now she has an answer, and it is bigger than any insult thrown at her.

Her enemies are silenced by what God has done, not by her own cleverness.

🗣️ Enlarged means free to speak boldly

😤 Peninnah had taunted her for years

🛡️ God gave her the final answer

📖 Silence comes from what God did

## ✨ There Is None Holy As The LORD

"Holy" means set apart, completely different from everything and everyone else.

Nothing in creation compares to God, not the false gods of Israel's neighbors, not any person.

Hannah is not comparing degrees of goodness here.

She is saying God stands in a category of His own.

✨ Holy means set apart and unique

🚫 No false god compares to Him

🎯 This is not a matter of degree

📖 God stands in a category alone

## 🪨 Neither Is There Any Rock Like Our God

"Rock" was a common Bible title for God, picturing something solid and unmovable.

A rock cannot be worn down or knocked over by a storm.

Hannah had nothing solid to stand on when she was childless and mocked.

Now she names the one solid thing that never moved.

🪨 Rock pictures something solid and unmovable

🌩️ Storms cannot knock a rock over

😢 She once had nothing solid to stand on

📖 God was solid the whole time

## ⚖️ By Him Actions Are Weighed

This closes the opening praise with a warning, not just celebration.

"Weighed" pictures a set of scales, the same kind used to measure grain or silver.

God does not judge by appearances or loud claims about oneself.

He judges every action for what it actually is.

⚖️ Weighed pictures scales used for trade

👀 God does not judge by appearance

🎭 Loud claims do not fool Him

📖 Every action is measured honestly

# FirstSamuel 2:4-10
# ⚖️ The LORD Turns Fortunes Upside Down
---
## 🏹 The Bows Of The Mighty Men Are Broken

A "bow" here stands for military power, the weapon of professional soldiers.

"Mighty men" were the strongest warriors a nation had, the ones everyone counted on.

Hannah is not talking about one battle but a pattern God repeats.

The people who look unstoppable are never actually safe from Him.

🏹 Bow stands for military power

💪 Mighty men were the strongest warriors

🔁 This is a pattern, not one event

📖 No army is unstoppable before God

## 🎽 They That Stumbled Are Girded With Strength

"Girded" means wrapped and tied on, like a belt fastened around the waist.

Someone who stumbles is weak and unsteady on their feet.

God takes that same unsteady person and fastens strength onto them like armor.

The weak do not just recover, they end up dressed for battle.

🩹 Stumbled means weak and unsteady

🎽 Girded means strength fastened on like armor

🔄 Weakness turns into readiness for battle

📖 God dresses the weak for battle

## 🍞 They That Were Full Have Hired Out Themselves For Bread

People who once had plenty of food are pictured begging to work just to eat.

"Hired out themselves" means selling their own labor for the most basic wage.

This is the picture of someone who fell from comfort to desperation.

Wealth in this song is never treated as permanent or earned.

🍞 Full once meant plenty of food

👷 Hired out means working just for bread

📉 Comfort fell into desperation

📖 Wealth here is never permanent

## 🤰 The Barren Hath Born Seven

This line is Hannah's own story written into the song.

She was the barren woman in this chapter's opening, unable to have a child for years.

"Seven" in the Bible often pictures fullness, not a literal head count.

Hannah is not just describing a general truth, she is describing herself.

🤰 Barren describes Hannah's own years

🔢 Seven often pictures fullness in scripture

🪞 The song mirrors her own story

📖 God's pattern became her own life

## 💀 The LORD Killeth, And Maketh Alive

Hannah names God as the one who controls both ends of life.

Ancient people often credited fate or other gods with life and death.

This line puts that authority in one place only, the LORD Himself.

Nothing about birth or death happens outside His control.

💀 God controls both death and life

🌍 Other gods often got that credit

☝️ Hannah puts the authority in one place

📖 Nothing escapes His control

## 🌫️ He Raiseth Up The Poor Out Of The Dust

"Dust" pictures the lowest possible place a person could sit or lie.

A poor person in this world had almost no path upward on their own.

God is the one shown physically lifting them from the ground.

Hannah even pictures the pillars of the earth as belonging to this same LORD.

The same God who holds up the whole world can lift up one poor family.

🌫️ Dust pictures the lowest place possible

🧎 The poor had no path upward alone

🏛️ The pillars of the earth are His too

📖 The God of the world lifts one family

## 🙏 He Will Keep The Feet Of His Saints

"Saints" here means God's faithful people, not a special class of holy figures.

"Keep the feet" is a picture of guarding someone from stumbling or falling.

The promise is protection along the path, not a life with no danger.

Verse nine closes by warning that raw strength alone will never win the day.

🙏 Saints means God's faithful people

🦶 Keep the feet means guard from falling

🛤️ The promise is a guarded path

📖 Strength alone never wins the day

## 👑 He Shall Give Strength Unto His King

This is a surprising line, because Israel does not have a king yet.

When Hannah prays this, judges lead Israel, not kings.

This prayer looks forward to Saul and David, both still years away.

Hannah's private prayer ends up describing Israel's future government.

👑 Israel had no king yet

⏳ Judges still led the nation then

🔮 This looks forward to Saul and David

📖 Her private prayer shapes future history

## 🌱 Exalt The Horn Of His Anointed

"Anointed" is the same root word behind the later Hebrew title "Messiah."

This line echoes the horn image from Hannah's very first line in verse one.

What began as one woman's personal joy ends as a promise about God's future king.

That promise later reaches its fullest point in Jesus, called the Anointed One.

👑 Anointed is the root behind Messiah

🔁 It echoes her own horn from verse one

🌱 Personal joy becomes a national promise

📖 The promise later points to Jesus

# FirstSamuel 2:11-17
# 🍖 Eli's Sons Corrupt The Offering
---
## 🏡 Elkanah Went To Ramah To His House

Ramah was the family's hometown, a walk from Shiloh where the tabernacle stood.

Elkanah and Hannah return home.

Samuel stays behind at Shiloh.

This is the same journey the family had made every year for the yearly sacrifice.

Leaving Samuel there was the fulfillment of the vow Hannah made in chapter one.

🏡 Ramah was the family's hometown

🚶 Elkanah and Hannah travel home without Samuel

🔁 This mirrors their yearly trip pattern

📖 Samuel stays as Hannah's fulfilled vow

## 👦 The Child Did Minister Unto The LORD Before Eli The Priest

"Minister" means Samuel performed regular duties in the tabernacle, even as a young boy.

Eli was the high priest at Shiloh, the man responsible for training him.

A small child serving in the tabernacle was unusual, not the normal path to priesthood.

This detail sets Samuel up in sharp contrast to the men described next.

👦 Minister means regular tabernacle duties

👴 Eli was Shiloh's high priest

⭐ A child serving here was unusual

📖 Samuel contrasts with the next two men

## 😈 The Sons Of Eli Were Sons Of Belial

"Belial" was a Hebrew word for someone worthless and wicked, not a name for a demon here.

Calling someone a "son of Belial" was a strong ancient insult about their character.

This label appears before either son does a single thing in the story.

The narrator wants the reader to already know what kind of men these are.

😈 Belial means worthless and wicked

🏷️ It was a harsh character label

⏱️ The label comes before any action

📖 The reader is warned in advance

## 😲 They Knew Not The LORD

This is a shocking line, since Eli's sons served as priests every single day.

Knowing rituals and knowing the LORD personally are not the same thing.

A person can stand at the altar for years and still be a stranger to God.

Position in a religious system never guarantees a real relationship with Him.

😲 A shocking line for working priests

📿 Rituals are not the same as knowing God

🚶 A stranger to God can serve for years

📖 Position never guarantees a real relationship

## 📜 The Priests' Custom With The People

"Custom" here means a regular practice, but this one had quietly turned corrupt.

The law actually specified which exact portions belonged to the priests from a sacrifice.

Eli's sons replaced God's rule with their own unwritten habit.

A wrong practice repeated often enough can start to feel normal.

📜 Custom means a regular practice

⚖️ The law set exact priestly portions

🔁 A new corrupt habit replaced the law

📖 Wrong practices can start feeling normal

## 🍴 A Fleshhook Of Three Teeth In His Hand

A "fleshhook" was a large fork used to pull cooked meat out of a pot.

Three sharp teeth let it grab a solid piece of meat quickly.

This detail shows the corruption was not sneaky at all.

It used a specific tool, in plain sight, at the altar itself.

🍴 Fleshhook was a large meat fork

🔱 Three teeth grabbed meat quickly

👀 The corruption happened in plain sight

📖 The sin used a real, physical tool

## ⚖️ All That The Fleshhook Brought Up The Priest Took For Himself

God's law gave the priest a specific portion, not whatever the hook happened to grab.

This method let the priest's servant take as much meat as the hook could pull up.

The fat of the sacrifice belonged to God alone and had to be burned first.

Taking meat before the fat was burned skipped God's own portion completely.

Greed replaced a fair, measured share with an unlimited grab.

⚖️ God's law set a fixed portion

🔥 God's fat portion was skipped first

🎣 The hook let them grab without limit

📖 Greed replaced a fair measured share

## 🔥 Give Flesh To Roast For The Priest

The priest's servant demanded raw meat for roasting before the sacrifice was even finished.

"Sodden" is an old word meaning boiled, the proper way meat was prepared here.

Demanding raw meat instead broke normal practice.

Raw meat also weighed more and was worth more.

The demand was really about getting the largest possible portion, not personal taste.

🔥 Roasting was the priest's own preference

🍲 Sodden means the proper boiled meat

🚫 Raw meat broke normal practice

📖 The real goal was a bigger portion

## ⚠️ I Will Take It By Force

This is a direct threat spoken to a worshipper who came to offer a sacrifice to God.

"By force" means the priest's servant was ready to use physical power to get his way.

A place meant for worship had turned into a place people feared.

The very men meant to represent God had become something to be afraid of.

⚠️ A direct threat against a worshipper

💪 By force means using physical power

😨 Worship had become something to fear

📖 God's representatives became frightening instead

## 🤢 Men Abhorred The Offering Of The LORD

The narrator now states plainly that the sin of these young men was very great.

"Abhorred" means people came to hate or feel disgust toward something.

Ordinary worshippers began avoiding sacrifice because of what Eli's sons had turned it into.

One family's corruption ended up damaging the whole nation's worship.

🤢 Abhorred means hatred or disgust

📏 Called very great with no soft word

🙅 Worshippers began avoiding sacrifice entirely

📖 A leader's sin never stays private

# FirstSamuel 2:18-21
# 👦 Samuel Grows Before The LORD
---
## 🔀 Samuel Ministered Before The LORD, Being A Child

This line deliberately follows right after the story of Eli's corrupt sons.

The contrast is not accidental, the narrator wants both pictures side by side.

Samuel is still just a boy, too young for the priestly duties his teachers hold.

A child's faithfulness sits right next to grown men's corruption on the same page.

🔀 Placed right after the corrupt sons

🎯 The contrast is deliberate, not accidental

👦 Samuel is still just a boy

📖 A child's faithfulness beats grown corruption

## 👘 Girded With A Linen Ephod

An "ephod" was a simple priestly garment, often just a linen apron worn over clothing.

Only priests normally wore an ephod, not a child still in training.

Giving Samuel one of these marks him as already devoted to tabernacle service.

Linen itself was a plain, undyed fabric, not a rich or costly one.

👘 Ephod was a simple priestly garment

🚫 Normally only priests wore one

⭐ Samuel wearing one marked him as devoted

📖 Linen was plain, not costly

## 🧵 His Mother Made Him A Little Coat

Hannah gave Samuel to the tabernacle, but she did not stop being his mother.

A handmade coat was a personal act of love from far away.

This detail balances Hannah's sacrifice with her ongoing care.

Giving a child to God's service was never the same as giving up love for him.

🧵 Hannah kept sewing for her son

❤️ A handmade coat showed lasting love

⚖️ Sacrifice and care both stayed true

📖 Her love for him never ended

## 📅 When She Came Up With Her Husband To Offer The Yearly Sacrifice

This was the same yearly trip already described back in chapter one.

Every year the family traveled to Shiloh for a set religious festival.

That yearly rhythm gave Hannah a reliable chance to see Samuel grow up.

A family scattered by a vow still found a way to stay connected.

📅 The same yearly trip from chapter one

🚶 The family traveled for a set festival

👁️ It gave Hannah a chance to see him

📖 A vow did not erase the family bond

## 🙏 The LORD Give Thee Seed Of This Woman

Eli speaks a blessing over Elkanah and Hannah as a kind of thank you.

"Seed" here simply means more children, more offspring for the family.

Eli calls Samuel a loan, the very word Hannah used for her own vow in chapter one.

A blessing spoken by a priest carried real weight in this culture.

🙏 Eli speaks a blessing of thanks

🌱 Seed means more children

🔙 Loan echoes Hannah's own vow language

📖 A priest's blessing carried real weight

## 👋 The LORD Visited Hannah

"Visited" is an old Bible word meaning God took direct, personal action.

It does not describe a casual appearance, but God stepping in to act.

The same word describes God acting for His people at other key moments in scripture.

Hannah's years of childlessness end because God Himself stepped in.

👋 Visited means direct personal action

🚫 Not a casual appearance

🔑 The same word marks other key moments

📖 God Himself ended her childlessness

## 📈 She Bare Three Sons And Two Daughters

Hannah has five more children after giving Samuel to the tabernacle.

This detail shows God's generosity went beyond just answering her original prayer.

She gave up one son and received five more children in return.

The child Samuel himself simply kept growing before the LORD through all of this.

👶 Five more children born after Samuel

🎁 God's generosity went beyond her request

➕ One given, five more received

📖 Samuel kept growing through it all

# FirstSamuel 2:22-25
# 😠 Eli Rebukes His Sons Too Late
---
## 👴 Now Eli Was Very Old

Eli's age is mentioned right before his failure as a father is described.

Old age here explains his limited energy, not his inaction as an excuse.

Eli had led Israel a long time by this point in the story.

His age helps explain why real discipline may already feel out of reach for him.

👴 Eli's age is mentioned deliberately

⚠️ It explains limits, not excuses inaction

📆 He had led Israel a long time

📖 Discipline already feels out of reach

## 📢 Heard All That His Sons Did Unto All Israel

This was not a private rumor, the whole nation already knew about it.

"All Israel" shows how far the scandal had spread beyond the tabernacle itself.

Eli's sons had damaged the reputation of Israel's entire worship system.

Everyone could see the problem except the two men causing it.

📢 The scandal reached the whole nation

🌍 All Israel shows how far it spread

💔 Israel's whole worship system was damaged

📖 Everyone but the guilty men could see it

## 💔 How They Lay With The Women That Assembled At The Door Of The Tabernacle

This sin runs deeper than the stolen meat from earlier in the chapter.

These women served at the tabernacle's entrance, likely helping with its daily work.

Eli's sons used their priestly position to sexually exploit the very women who served there.

Their corruption had grown from stealing food to abusing their spiritual authority completely.

💔 A deeper sin than the stolen meat

🚪 These women served at the tabernacle's door

⚠️ Priests exploited the very women who served

📖 Their corruption had grown much worse

## ❓ Why Do Ye Such Things?

Eli finally speaks up, but only with a question, not a real command.

A father with real authority could have removed his sons from their duties.

Asking why instead of acting shows how weak Eli's response actually was.

Words alone were never going to be enough to stop this.

❓ Eli only asks a question

🚫 He never removes them from duty

📉 Weak words instead of real action

📖 Words alone could not stop it

## 😐 It Is No Good Report That I Hear

Eli's own language stays surprisingly mild for what is actually happening.

"No good report" sounds more like disappointment than outrage.

A father confronting theft and abuse needed stronger words than this.

The softness of Eli's language matches the softness of his actual discipline.

😐 Eli's language stays surprisingly mild

📉 It sounds like disappointment, not outrage

💬 The situation needed far stronger words

📖 Soft words matched his soft discipline

## 🎯 Ye Make The LORD's People To Transgress

Eli finally names the real damage, that his sons are leading others into sin.

Worshippers who saw the corruption may have started copying it or losing faith entirely.

Sin from a leader rarely stays contained to that leader alone.

This is the clearest, truest thing Eli says in the whole confrontation.

🎯 Eli finally names the real damage

🌊 Others may copy it or lose faith

🔗 A leader's sin rarely stays contained

📖 This is Eli's clearest true statement

## ⚖️ If One Man Sin Against Another, The Judge Shall Judge Him

Ancient Israel had judges to settle disputes between one person and another.

This system worked for ordinary conflicts like theft or broken promises.

But sin against God Himself needed a mediator that human courts could not provide.

"Intreat" is an old word meaning to plead on someone's behalf before God.

⚖️ Judges settled disputes between people

📜 It worked for ordinary conflicts

🕊️ Sin against God needs a true mediator

📖 Intreat means pleading on someone's behalf

## 👂 They Hearkened Not Unto The Voice Of Their Father

"Hearkened" is an old word for listening in a way that leads to obeying.

Eli's sons heard him speak, but nothing in their behavior actually changed.

Their refusal to listen shows how far gone they already were.

Years of choosing evil had already sealed the fate the LORD now confirms.

👂 Hearkened means listening that leads to obeying

🚫 They heard him but did not change

📢 Their refusal showed how far gone they were

📖 Years of sin had sealed their fate

# FirstSamuel 2:26-30
# 📯 A Man Of God Confronts Eli
---
## 🔁 The Child Samuel Grew On

This phrase nearly repeats what was already said back in verse twenty one.

Scripture is marking time passing steadily through this whole story.

Eli's sons stayed the same, but Samuel kept moving forward.

The repetition itself is part of the point being made here.

🔁 This nearly repeats verse twenty one

⏳ Time is passing steadily through the story

📈 Samuel kept moving forward, unlike Eli's sons

📖 The repetition itself makes the point

## ⚖️ In Favour Both With The LORD, And Also With Men

Samuel's growth is described on two levels at once, spiritual and social.

He is not just liked by people, and not just approved by God alone.

This exact same description is used centuries later for the boy Jesus in Luke's Gospel.

A life that pleases both God and people is presented here as the healthy pattern.

⚖️ Growth described on two levels at once

🙏 Not favor with God alone

🤝 Not favor with people alone

📖 Luke later uses this same line for Jesus

## 📯 There Came A Man Of God Unto Eli

"Man of God" was a title used for a true prophet speaking for the LORD.

This unnamed prophet appears once in this story and is never named.

His message matters more here than his own identity or background.

God sends this warning through a stranger Eli had likely never met.

📯 Man of God means a true prophet

❓ He appears once and is unnamed

🎯 His message matters more than his identity

📖 God sends a warning through a stranger

## 👴 Did I Plainly Appear Unto The House Of Thy Father, When They Were In Egypt

This looks all the way back to Aaron, Eli's ancestor and Israel's first priest.

God chose Aaron's family for the priesthood back in the days of slavery in Egypt.

The prophet is reminding Eli that this privilege was a gift, not something his family earned.

A gift given generations ago can still be taken back if it is abused.

👴 This looks back to Aaron's family

🎁 The priesthood began as a gift in Egypt

🚫 It was never something they earned

📖 A gift can still be taken back

## 👘 To Wear An Ephod Before Me

This lists one of the specific privileges given only to Aaron's priestly line.

The ephod already appeared earlier in this chapter on young Samuel too.

The prophet contrasts the corrupt priests who wear it with the boy who does not.

A privilege meant for holy service was being worn by men living far from holiness.

👘 One of Aaron's specific privileges

🔗 The ephod already appeared on Samuel

⚖️ Corrupt men wore what Samuel did not

📖 Holy clothing on unholy men

## 🐂 Wherefore Kick Ye At My Sacrifice

"Kick" pictures an animal rebelling against the very owner who feeds it.

Eli's sons are compared to livestock turning against its own master.

The sacrifice belonged to God, yet His own priests were fighting His instructions.

This is a sharp, almost embarrassing image chosen on purpose.

🐂 Kick pictures an animal rebelling

🚜 Like livestock turning on its owner

⚔️ Priests fought against God's own instructions

📖 A sharp image chosen on purpose

## ⚖️ Honourest Thy Sons Above Me

This is the exact charge against Eli himself, not just against his sons.

Eli knew about the corruption and still let his sons keep serving as priests.

Loving his sons was never the sin, valuing them over God's instructions was.

"Chiefest" names the very best portion, the part meant to honor God first, and Eli's sons grew fat on it.

⚖️ The exact charge against Eli himself

🚫 He let them keep serving anyway

❤️ Valuing them over God was the sin

📖 They grew fat on God's best portion

## ⚖️ Them That Honour Me I Will Honour

This states the pattern behind everything about to happen to Eli's family.

Honoring God is not just a feeling, it shows up in choices and actions.

"Despise" here does not require open hatred, just treating God's word as unimportant.

What Eli's family gave to God, they now receive back in return.

⚖️ States the pattern behind what comes next

🙏 Honoring God shows up in choices

😐 Despise means treating God's word as unimportant

📖 What they gave, they now receive back

# FirstSamuel 2:31-36
# 💀 Judgment Pronounced On Eli's House
---
## 💪 I Will Cut Off Thine Arm

In the Bible, an "arm" is a common picture for strength and power.

Cutting off the arm pictures removing a family's influence and authority completely.

This is not a literal amputation but a picture of losing all standing.

Eli's family had power because of the priesthood, and that power is now ending.

💪 Arm is a Bible picture for strength

✂️ Cutting it off means losing influence

🚫 Not a literal amputation

📖 Their priestly power is now ending

## ⏳ That There Shall Not Be An Old Man In Thine House

This means Eli's male descendants will no longer live to see old age.

Living to old age in this culture was already seen as a sign of blessing.

This judgment removes that blessing specifically from Eli's own family line.

Honor stolen from God becomes honor lost by the family that stole it.

⏳ No male heir reaches old age

🎖️ Old age was normally seen as blessing

🚫 That blessing is removed from this family

📖 Honor stolen from God becomes honor lost

## 🏕️ Thou Shalt See An Enemy In My Habitation

"Habitation" refers to the tabernacle, God's dwelling place among His people.

This warns that Israel's own worship center will one day face an enemy.

This word is fulfilled later when the ark itself is captured by the Philistines.

Even the tabernacle was not too sacred to face real consequences.

🏕️ Habitation means the tabernacle itself

⚔️ An enemy will one day invade it

📦 Later fulfilled when the ark is captured

📖 Nothing was too sacred to escape judgment

## 😢 To Consume Thine Eyes, And To Grieve Thine Heart

"Consume thine eyes" pictures grief so heavy it wears down the body itself.

This names Eli's own ongoing suffering as he watches his family's decline.

Eli will not just hear about this judgment.

He will watch it unfold personally, for the rest of his life.

Witnessing it may be the hardest part of the whole punishment.

😢 Names Eli's own ongoing suffering

👁️ Consume thine eyes pictures heavy grief

👀 Eli will watch it happen personally

📖 Witnessing it is the hardest part

## ✅ This Shall Be A Sign Unto Thee

God gives Eli a specific, checkable proof that this whole warning is true.

A vague prophecy is easy to doubt, but a dated sign is not.

The sign names Hophni and Phinehas, the two corrupt sons from the start of the chapter.

Both sons will die on the exact same day, an oddly specific detail to predict in advance.

✅ A specific checkable proof is given

👥 It names Hophni and Phinehas directly

📅 Both will die the exact same day

📖 First Samuel four confirms it exactly

## 🙏 I Will Raise Me Up A Faithful Priest

God promises a replacement in the very same breath as this judgment.

"Faithful" stands in direct contrast to everything just described about Hophni and Phinehas.

Many see this promise pointing toward Zadok, a priest who later replaces Eli's line under Solomon.

Judgment in this chapter is never the whole story.

A promise sits right alongside it.

🙏 A replacement promised alongside judgment

✅ Faithful contrasts directly with Eli's sons

👤 Many point this toward the priest Zadok

📖 A promise sits right beside the judgment

## 🏠 I Will Build Him A Sure House

"House" here means a lasting family line, not a physical building.

This same kind of promise language is later used for King David's own line.

A "sure house" means one that will not collapse the way Eli's family line just did.

God is describing a stability that Eli's own descendants had thrown away.

🏠 House means a lasting family line

👑 Similar language later describes David's line

🧱 Sure means it will not collapse

📖 Stability that Eli's family threw away

## 🙇 Put Me, I Pray Thee, Into One Of The Priests' Offices, That I May Eat A Piece Of Bread

This is the exact plea a future descendant of Eli will be reduced to speaking.

"Crouch" back in the verse before this is a posture of begging, not a normal greeting.

"A piece of bread" is the smallest, most basic kind of payment imaginable.

Verse twenty nine already condemned this family for growing fat off stolen offerings.

The chapter's closing image is deliberately the opposite of where it started.

🙇 A future descendant reduced to begging

🙏 Crouch is a posture of begging

🍞 A piece of bread is the lowest pay

📖 The chapter ends as its own reversal
`.trim();

export const FIRST_SAMUEL_TWO_PERSONAL_SECTIONS = parseFirstSamuelTwoRawNotes(FIRST_SAMUEL_TWO_RAW_NOTES);
