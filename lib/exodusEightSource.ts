export type ExodusEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusEightRawNotes(rawText: string): ExodusEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 8:${startVerse}` : `Exodus 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 8 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_EIGHT_RAW_NOTES = `# Exodus 8:1-4
# 🐸 The Plague Of Frogs Is Threatened
---
## 🗣️ Let My People Go, That They May Serve Me

This exact demand already opened God's confrontation with Pharaoh back in chapter seven.

"Serve" means formal worship, not simple obedience or plain labor.

God repeats the identical wording before the second plague even begins.

The goal behind the demand has not changed since the very first warning.

🗣️ Serve means worship, not plain obedience

🔁 The same demand opened chapter seven

🎯 Freedom was never the final purpose alone

📖 Worship was the real goal all along

## 🐸 I Will Smite All Thy Borders With Frogs

Frogs were not a random choice for this second plague.

Egyptians connected frogs with Heqet, a goddess of fertility and childbirth shown with a frog's head.

People called on Heqet during pregnancy, expecting her protection over new life.

This plague turns her supposed blessing into an inescapable curse instead.

🐸 Heqet was Egypt's frog headed fertility goddess

🤰 People called on her during childbirth

🔄 Her blessing becomes an inescapable curse

📖 The plague strikes Egyptian worship directly

## 🌊 The River Shall Bring Forth Frogs Abundantly

The Nile had just turned to blood in the plague right before this one.

Now that very same river becomes the source of the next disaster.

Egyptians worshiped the Nile as the god Hapi and depended on it for daily life.

The one resource Egypt trusted most keeps turning against the nation itself.

🌊 The Nile caused the plague just before this

🙏 Egyptians worshiped the Nile as the god Hapi

🔁 Their most trusted resource turns against them again

➡️ Judgment keeps moving through Egypt's own gods

## 🍞 Into Thine Ovens, And Into Thy Kneadingtroughs

A "kneadingtrough" was a container used for mixing bread dough by hand.

This list moves from the bedroom to the kitchen without skipping a single room.

No private space in an Egyptian home stays untouched by this plague.

Even the food about to be baked gets invaded before it is even made.

🍞 Kneadingtrough means a bread mixing container

🛏️ The plague reaches bedrooms and kitchens alike

🏠 No private space in the home is spared

📖 Nothing in daily life escapes this plague

## 👑 Both On Thee, And Upon Thy People

This plague does not stay at a safe distance from the king himself.

Pharaoh's own palace and person are named specifically as targets here.

Egyptian kings were treated as living gods, untouchable by ordinary suffering.

This plague refuses to grant Pharaoh that kind of exemption.

👑 Pharaoh himself is named as a target

🏛️ Egyptian kings were treated as living gods

🚫 No exemption is granted because of his status

➡️ Even a king cannot escape this plague

# Exodus 8:5-7
# 🐸 Frogs Cover The Land
---
## 🌊 Over The Streams, Over The Rivers, And Over The Ponds

Aaron again acts as the hands carrying out Moses' instructions, the pairing set up back in chapter seven.

The list of water sources reaches far beyond the Nile alone.

Streams, rivers, and ponds are all named together in the same command.

Nothing counts as a safe backup source once every kind of water is included.

🌊 Aaron again carries out the command

🗺️ The list covers streams, rivers, and ponds

🚫 No water source is left as a backup

📖 This mirrors how completely the first plague spread

## 🐸 The Frogs Came Up, And Covered The Land Of Egypt

The threat spoken back in verse two becomes full reality here with no delay at all.

Nature obeys the exact command God gave through Aaron's rod.

Every frog in Egypt's water rises up together at the same moment.

Pharaoh will spend this whole chapter refusing to obey nearly as quickly as this.

🐸 The threat becomes reality immediately

⚡ Nature obeys without delay or hesitation

🌍 Every part of Egypt is affected at once

➡️ Nature obeys faster than Pharaoh ever will

## 🔮 The Magicians Did So With Their Enchantments

"Enchantments" refers to trained ritual or magical practices, not simple stage tricks.

Egypt's magicians manage to copy this sign, the same way they copied blood in the river.

Producing more frogs only adds to a disaster that already exists.

They can copy the plague, but not one single time do they manage to remove one.

🔮 Enchantments means trained ritual practices

🐸 The magicians add more frogs to Egypt

🚫 They never manage to remove a single one

📖 Counterfeit power can copy, but it cannot heal

# Exodus 8:8-11
# 🙏 Pharaoh Begs For Relief
---
## 🙏 Intreat The LORD, That He May Take Away The Frogs

"Intreat" is an old spelling of entreat, meaning to beg or plead earnestly.

This is the first time in the whole confrontation that Pharaoh asks for prayer on his own.

He also offers, for the first time, to actually let Israel go and sacrifice.

Real pressure has genuinely broken through his resistance, at least for the moment.

🙏 Intreat means to beg or plead

🗣️ This is Pharaoh's first request for prayer

✅ He also offers to release Israel here

📖 Real pressure produced a real, if brief, change

## ⏰ Glory Over Me: When Shall I Intreat For Thee

This unusual phrase is an old way of inviting Pharaoh to claim the honor of choosing the timing.

Moses hands Pharaoh full control over exactly when the frogs will disappear.

Letting Pharaoh choose removes any later excuse that the timing was rigged or accidental.

Whatever moment Pharaoh names, the LORD will meet it precisely.

⏰ Glory over me means claim the honor

🎯 Pharaoh gets to set the exact timing

🚫 This removes any excuse of coincidence

📖 God will meet whatever moment Pharaoh names

## 🌟 That Thou Mayest Know That There Is None Like Unto The LORD Our God

Pharaoh chooses tomorrow rather than asking for the frogs to vanish immediately.

That delay itself becomes part of the proof, since nothing about the timing helps Moses.

The stated purpose behind this whole exchange is theological, not simple relief from pests.

Egypt is meant to learn that this power belongs to the LORD alone, not to chance.

🌟 Pharaoh chooses tomorrow, not instant relief

⏳ The delay itself strengthens the proof

🚫 The point here is not chance or sorcery

📖 The goal is knowing God has no equal

## 🌊 They Shall Remain In The River Only

Frogs already lived in the Nile as part of the normal created order before this plague.

The plague did not create frogs out of nothing, it let existing frogs overrun the land.

Removing them means putting them back exactly where they belonged in the first place.

God is shown restoring order here, not only removing a punishment.

🌊 Frogs already existed in the river before this

🌪️ The plague let them overrun the land

🔄 Removing them restores the created order

📖 God restores order, not just relief

# Exodus 8:12-15
# 💔 Relief Comes, Then Pharaoh Hardens Again
---
## 🙏 Moses Cried Unto The LORD Because Of The Frogs

"Cried unto" describes urgent, earnest prayer, not a quiet or routine request.

Moses follows through immediately on the promise he just made to Pharaoh.

He does not wait or delay before bringing this request to God.

His obedience here stands in sharp contrast to what Pharaoh is about to do.

🙏 Cried unto means urgent, earnest prayer

⚡ Moses acts on his promise right away

✅ He keeps his word without delay

➡️ His obedience contrasts with Pharaoh's coming betrayal

## 💀 The Frogs Died Out Of The Houses, Out Of The Villages, And Out Of The Fields

Verse eleven said the frogs would simply return to the river and stay there.

Instead they die suddenly across every part of Egypt at the exact same time.

The removal of one problem creates an entirely new and unexpected one.

Even a promised relief carries consequences nobody fully planned for.

💀 The frogs die everywhere instead of returning

📜 This is not what verse eleven described

🔄 Removing one problem creates a new one

📖 Even relief can carry unexpected consequences

## 🤢 They Gathered Them Together Upon Heaps: And The Land Stank

"Heaps" means large piles gathered up in one place.

Egyptians pile the dead frogs together across the whole land.

The rotting smell lingers long after the actual plague has technically ended.

Relief on paper still leaves behind a very real, physical mess to clean up.

🤢 Heaps means large gathered piles

🗺️ Piles cover the whole land of Egypt

👃 The stench lingers after the plague ends

📖 Relief still leaves real consequences behind

## 🪨 When Pharaoh Saw That There Was Respite, He Hardened His Heart

"Respite" means a break or relief from hardship.

The instant the pressure lifts, Pharaoh reverses the promise he made only days earlier.

His earlier offer to let Israel go was never a real change of heart.

Fear had produced words that comfort could not turn into lasting action.

🪨 Respite means a break from hardship

⏳ Relief comes, and the promise breaks instantly

😔 This reveals fear, not genuine change

📖 Words made under pressure can prove empty

# Exodus 8:16-19
# 🦟 The Plague Of Lice
---
## 🦟 Smite The Dust Of The Land, That It May Become Lice

The first two plagues both came with a clear warning delivered to Pharaoh in advance.

This third plague strikes with no announcement and no chance to prepare.

The very ground Egyptians walk on every day becomes the source of torment.

Nothing about daily life is safe once even the dust itself turns against the nation.

🦟 This plague arrives with no warning

📜 The first two plagues both gave notice

🌍 Ordinary dust becomes a source of torment

📖 Nothing in daily life remains untouched

## 🌍 All The Dust Of The Land Became Lice Throughout All The Land Of Egypt

Dust exists everywhere, in every field, road, and house across the entire nation.

This plague does not target one resource like the Nile or a handful of animals.

It reaches every square inch of ground Egypt actually stands on.

Total control over something this small proves power over something far larger than water.

🌍 Dust covers literally everywhere in Egypt

🚫 No single resource or region is spared

🔬 Power over dust proves power over everything

📖 Small details prove the largest point

## 🚫 To Bring Forth Lice, But They Could Not

Egypt's magicians had managed to copy both earlier plagues, blood and frogs, at least on some scale.

Here, for the first time, they attempt the same trick and fail completely.

Their counterfeit power finally reaches a clear and visible limit.

Whatever method they used before, it cannot reach down to something as small as lice.

🚫 This is the first plague they cannot copy

📜 They had copied both earlier plagues before

⚖️ Their counterfeit power hits a real limit

📖 Fake power cannot match the smallest true miracle

## ✋ This Is The Finger Of God

"The finger of God" is an old idiom describing direct, personal divine action.

Even Pharaoh's own magicians are forced to admit this power comes from a real, higher source.

They are the very people Pharaoh trusted to explain away every earlier sign.

Yet even their own admission does not soften Pharaoh's hardened response toward Moses.

✋ Finger of God means direct divine action

🗣️ Even his own magicians admit this

🚫 They cannot explain this one away

📖 Admitting truth differs from obeying truth

# Exodus 8:20-24
# 🪰 The Plague Of Flies
---
## 🌅 Lo, He Cometh Forth To The Water

Pharaoh kept a regular routine of visiting the Nile each morning, likely tied to worship of Hapi.

God already used this exact habit to set up the very first plague back in chapter seven.

After the sudden, unannounced lice, this fourth plague returns to giving Pharaoh advance warning.

The same predictable pattern of warning and response starts over again here.

🌅 Pharaoh kept a regular morning river routine

📜 This routine already set up the first plague

🔁 This plague returns to giving advance warning

📖 The pattern of warning and response repeats

## 🪰 I Will Send Swarms Of Flies Upon Thee, And Upon Thy Servants

"Swarms" describes a thick, overwhelming mass of insects moving together, not a scattered few.

This threat names Pharaoh, his servants, and his people all together in one sentence.

Every level of Egyptian society is named as a direct target this time.

Nobody in the whole nation can stay comfortably out of reach.

🪰 Swarms means a thick, overwhelming mass

👑 Pharaoh himself is named as a target

👥 His servants and people are named too

📖 No level of society stays out of reach

## 🗺️ I Will Sever In That Day The Land Of Goshen

"Sever" means to separate or set completely apart from something else.

Goshen was the specific region of Egypt where Israel's people lived.

This is the first plague in the whole confrontation to spare Israel's territory by name.

The difference between Egypt's suffering and Israel's safety becomes visible for the first time.

🗺️ Sever means to separate completely

🏡 Goshen was Israel's own region in Egypt

🆕 This is the first plague to spare it

📖 Israel's safety becomes visible, not just claimed

## ⚖️ I Will Put A Division Between My People And Thy People

This deliberate division rules out any idea that the plagues are random natural disasters.

Calling Israel "my people" and Egypt "thy people" draws a clear line in one sentence.

A disaster striking randomly does not stop precisely at a national border.

These plagues are shown here to be targeted acts, not chance events.

⚖️ This rules out a random natural disaster

🗣️ My people and thy people draws a line

🚫 Random disasters do not stop at borders

📖 These plagues are targeted, not accidental

## 🏚️ The Land Was Corrupted By Reason Of The Swarm Of Flies

"Corrupted" here means ruined or seriously damaged, not just dirtied or annoying.

This plague causes real, lasting harm to the land and daily life across Egypt.

It reaches beyond mere discomfort into genuine devastation for the whole nation.

Egypt is left dealing with damage, not simply an unpleasant inconvenience.

🏚️ Corrupted means ruined or seriously damaged

🌍 Damage spreads across the whole nation

🚫 This is not a minor inconvenience

📖 Real devastation follows this plague

# Exodus 8:25-28
# 🤝 Pharaoh Tries A Partial Compromise
---
## 🏠 Go Ye, Sacrifice To Your God In The Land

Pharaoh offers Israel permission to worship, but only while staying inside Egypt's borders.

This falls far short of what God originally commanded back in chapter three.

A partial compromise can look generous while quietly avoiding the real demand.

Permission without freedom is not the same thing as obedience.

🏠 Pharaoh allows worship only inside Egypt

📜 This falls short of God's actual command

🎭 A partial offer can look generous

📖 Permission without freedom is not obedience

## 📖 It Is Not Meet So To Do

"Meet" is an old word meaning fitting or proper.

Moses is not simply saying Pharaoh's offer is inconvenient or unwise.

He is saying it is genuinely improper, not a workable option at all.

Refusing a compromise on principle is different from refusing one out of stubbornness.

📖 Meet means fitting or proper

🚫 Moses calls this offer genuinely improper

⚖️ This is a matter of principle, not preference

➡️ Some compromises cannot be accepted at all

## 🐂 Will They Not Stone Us?

Many of the animals Israel would sacrifice, such as rams and cattle, were sacred to Egyptian gods.

Egyptians worshiped creatures connected to gods like Apis and Khnum, both pictured as cattle or rams.

Killing those very animals openly, in front of Egyptians, in Egypt itself, risked real violence.

Moses names a genuine danger here, not an excuse to avoid worship.

🐂 Sacred Egyptian animals were the sacrifice itself

🙏 Apis and Khnum were pictured as cattle

⚠️ Doing this openly risked real violence

📖 This is a genuine danger, not an excuse

## 🚶 We Will Go Three Days' Journey Into The Wilderness

This is the exact same request Moses first brought to Pharaoh back in chapter three.

Moses refuses to let a partial compromise quietly replace the original, specific command.

The distance matters because it puts real space between Israel and Egyptian eyes.

Holding the line here keeps the mission from being watered down bit by bit.

🚶 This matches the original request from chapter three

📏 Real distance was always part of the plan

🚫 Moses will not accept a lesser version

📖 The original command stays the standard

## 🙏 Only Ye Shall Not Go Very Far Away: Intreat For Me

Pharaoh finally agrees to let Israel leave Egypt itself, a real step forward from verse twenty five.

He still tries to control the distance, adding a limit God never gave him room to set.

His closing request is for his own relief, not for Israel's actual good.

Even a real concession here still comes wrapped around self interest.

🙏 Pharaoh finally allows them to leave Egypt

📏 He still tries to limit the distance

🙋 His final request centers on himself

📖 Even progress can still carry self interest

# Exodus 8:29-32
# 🔁 Deceit Continues
---
## ⚠️ Let Not Pharaoh Deal Deceitfully Any More

Moses directly names Pharaoh's pattern before agreeing to pray for him again.

Pharaoh has now promised release and broken that promise more than once already in this chapter.

Calling out the pattern honestly is different from simply trusting the same promise blindly again.

Moses prays again anyway, but he does so with his eyes fully open this time.

⚠️ Moses names Pharaoh's pattern out loud

🔁 This is not the first broken promise

👀 Moses no longer trusts blindly

📖 Honesty does not stop Moses from acting

## 🙏 Moses Went Out From Pharaoh, And Intreated The LORD

Moses keeps his word the moment he leaves Pharaoh's presence, without any delay.

This is now the second time in this same chapter that Moses prays exactly as promised.

His consistency stands in sharp contrast to Pharaoh's repeated broken promises.

Faithfulness here looks like simply doing what was already said, every single time.

🙏 Moses acts the moment he leaves

🔁 This is his second kept prayer here

⚖️ His consistency contrasts with Pharaoh's broken word

📖 Faithfulness means doing what was already promised

## 🪰 There Remained Not One

Every single fly disappears completely, with no stragglers left behind anywhere.

This is not a partial improvement or a gradual fading away of the problem.

The totality of the removal matches the totality God has shown in every plague so far.

Nothing about this outcome leaves room for doubt about who caused it.

🪰 Every single fly is removed

🚫 This is not a partial or gradual fix

💯 The totality matches every plague before it

📖 The outcome leaves no room for doubt

## 🪨 Pharaoh Hardened His Heart At This Time Also, Neither Would He Let The People Go

This is now the fourth time in two chapters that Pharaoh's hardened heart is named directly.

Exactly as Moses warned only verses earlier, relief brings no lasting change in Pharaoh at all.

The same cycle of promise, relief, and betrayal will carry through the plagues still ahead.

Pattern, not surprise, defines Pharaoh's response to every single sign shown to him.

🪨 This is the fourth hardening named so far

📜 Moses had warned this exact thing would happen

🔁 The same cycle will repeat again ahead

📖 Pattern, not surprise, defines Pharaoh's response`.trim();

export const EXODUS_EIGHT_PERSONAL_SECTIONS = parseExodusEightRawNotes(EXODUS_EIGHT_RAW_NOTES);
