export type JudgesNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesNineRawNotes(rawText: string): JudgesNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 9:${startVerse}` : `Judges 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Judges 9 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_NINE_RAW_NOTES = `# Judges 9:1-3
# 👑 Abimelech Makes His Case At Shechem
---
## 👪 Went To Shechem Unto His Mother's Brethren

Abimelech was Gideon's son through a concubine who lived in the city of Shechem.

A concubine held a real but lower status than a full wife in this culture.

Because his mother's family lived in Shechem, that side of his family was purely Canaanite, not one of Israel's tribes.

Abimelech goes to that side first because they owe Gideon's other seventy sons nothing.

👪 Abimelech's mother was a concubine

🏙️ Her family lived in Shechem

🚫 That family owed Gideon's sons nothing

📖 He chose the friendliest audience

## 👑 Whether Is Better For You, Either That All The Sons Of Jerubbaal Reign Over You, Or That One Reign Over You

Jerubbaal is the name Gideon earned after tearing down his father's altar to Baal.

Abimelech frames a false choice between seventy rulers or one ruler.

Splitting power among seventy sons was never actually a real plan anyone proposed.

The real question was whether Abimelech alone would rule, not whether Shechem preferred one ruler over many.

👑 Jerubbaal is the name Gideon earned

❓ Abimelech poses a false choice

🚫 Seventy joint rulers was never real

➡️ The real question was Abimelech alone

## 🩸 Remember Also That I Am Your Bone And Your Flesh

Bone and flesh is an old idiom for shared blood and close kinship.

Abimelech reminds Shechem that his mother came from their own city, not from Gideon's tribe.

He is asking them to choose family loyalty over any debt owed to Gideon's other sons.

This appeal works because Shechem was never fully loyal to Israel in the first place.

🩸 Bone and flesh means close kinship

👪 Abimelech shares Shechem's own bloodline

⚖️ He asks for loyalty, not principle

📖 Blood ties override tribal duty here

## 🗣️ Their Hearts Inclined To Follow Abimelech

Shechem's leaders relay Abimelech's message to the rest of the city.

The city chooses him for one simple reason, he is their own relative.

Gideon's refusal of the crown and his rescue of Israel are never even mentioned as factors.

A single word, brother, outweighs everything Gideon had done for the whole nation.

🗣️ Leaders spread Abimelech's message

👪 He is our brother decided it

🙈 Gideon's rescue of Israel goes unmentioned

➡️ One word outweighed years of leadership

# Judges 9:4-6
# 🗡️ The Murder Of Seventy Brothers
---
## ⛩️ Threescore And Ten Pieces Of Silver Out Of The House Of Baalberith

Baalberith means lord of the covenant, a Canaanite god worshipped at Shechem.

The money for Abimelech's coup comes directly out of a pagan temple treasury.

This is the same number as the brothers he is about to kill, seventy pieces for seventy lives.

A false god funds the murder of Gideon's true family.

⛩️ Baalberith means lord of the covenant

💰 Temple money funded the coup

🔢 Seventy pieces echoed seventy brothers

📖 A false god funded this murder

## 💸 Hired Vain And Light Persons, Which Followed Him

Vain and light describes reckless men with nothing to lose, willing to do violence for pay.

These were not soldiers loyal to a cause, they were mercenaries loyal to money.

Abimelech needed outside muscle because Gideon's own household would never help him.

A coup built on hired violence rarely stays under control.

💸 Vain and light means reckless mercenaries

🗡️ They fought for pay, not loyalty

🚫 Gideon's household would never help him

➡️ Hired violence rarely stays controlled

## 🪨 Slew His Brethren The Sons Of Jerubbaal, Being Threescore And Ten Persons, Upon One Stone

Threescore and ten means seventy, matching the number of sons Gideon had in chapter eight.

Upon one stone suggests a single formal execution site, not seventy separate killings.

This detail marks the murder as a deliberate massacre, not a chaotic battle.

Only one brother survives this single, calculated act of slaughter.

🔢 Threescore and ten means seventy

🪨 One stone marks one execution site

⚰️ This was a planned massacre

📖 Only one brother survives

## 🙈 For He Hid Himself

Jotham survives only because he hides while his seventy brothers are killed.

Being the youngest, he was likely considered the least threatening or easiest to overlook.

His survival sets up the only voice left to challenge Abimelech's new kingship.

One hidden brother is about to speak for all seventy who cannot.

🙈 Jotham survives by hiding

👶 He was the youngest brother

🗣️ He becomes the lone surviving voice

➡️ He will speak for the dead

## 🏛️ All The Men Of Shechem Gathered Together, And All The House Of Millo

The house of Millo likely refers to a fortress or a ruling body within the city.

Its exact meaning is debated.

Both groups together represent the full political power of Shechem.

No one in the city objects to what Abimelech has just done to his own brothers.

The whole city's leadership backs a king who came to power through murder.

🏛️ Millo was likely a fortress or council

🤝 Both groups back Abimelech together

🙊 No one objects to the murders

📖 Shechem crowns a murderer as king

## 🌳 Made Abimelech King, By The Plain Of The Pillar That Was In Shechem

This same sacred tree site appears earlier, where Joshua once set up a covenant stone under an oak at Shechem.

Crowning Abimelech at this exact spot borrows the weight of that older, holy memory.

The location gave his kingship a false sense of legitimacy it never truly earned.

A sacred place cannot make an unholy act righteous.

🌳 The pillar site had deep history

📜 Joshua once made a covenant there

👑 The place gave false legitimacy

➡️ A holy site cannot bless an unholy act

# Judges 9:7-9
# 🌳 Jotham Tells His Fable
---
## 👂 Hearken Unto Me, Ye Men Of Shechem, That God May Hearken Unto You

Hearken is an old word meaning listen carefully and take heed.

Jotham frames this speech as something with real stakes before God, not just a public complaint.

He is asking God to judge Shechem based on whether they truly listen now.

His opening line already predicts how seriously this moment will be taken.

👂 Hearken means listen and take heed

🙏 Jotham frames this before God himself

⚖️ Their listening decides God's response

➡️ The stakes are set before the fable begins

## ⛰️ He Went And Stood In The Top Of Mount Gerizim

Mount Gerizim was the mountain where Israel once pronounced blessings after entering the promised land.

Its twin, Mount Ebal, was used for curses in that same ceremony.

Jotham stands on the mountain of blessing to deliver something closer to a curse.

The location itself carries a bitter irony given what he is about to say.

⛰️ Gerizim was the mountain of blessing

⚖️ Ebal was its paired mountain of curses

🎭 Jotham speaks from the blessing side

📖 The setting itself carries irony

## 🫒 The Trees Went Forth On A Time To Anoint A King Over Them

Jotham begins a fable, a short story using trees to stand in for people.

Anointing with oil was the normal way Israel marked a new king or priest.

The fable lets Jotham criticize Shechem's choice without directly accusing anyone yet.

A story can say what a direct accusation might not survive saying.

🌳 Trees represent people in this fable

🫒 Anointing was how kings were marked

🎭 A story hides a sharp critique

➡️ Indirect words can carry direct danger

## 🕯️ Should I Leave My Fatness, Wherewith By Me They Honour God And Man

Fatness here refers to olive oil, used in offerings to God and in everyday cooking and lamps.

The olive tree is the first and most valuable tree asked to rule.

It refuses because ruling would mean giving up its true, useful purpose.

Real value comes from what something contributes, not from holding power over others.

🫒 Fatness means valuable olive oil

🕯️ Oil served both worship and daily life

🙅 The olive tree refuses to rule

📖 True value lies in useful purpose

# Judges 9:10-13
# 🍇 The Fig Tree And The Vine Refuse
---
## 🍇 Then Said The Trees To The Fig Tree, Come Thou, And Reign Over Us

After both the olive tree and the trees themselves have already spoken, the invitation moves to a second valuable tree.

This is now the second time the exact same invitation gets repeated word for word.

The story is building a pattern before it reaches the tree that finally says yes.

A repeated invitation makes the coming acceptance feel even more alarming.

🍇 A second valuable tree is asked

🔁 The same invitation repeats again

⏳ The story builds toward one final answer

➡️ Repeated refusals make the next yes alarming

## 🍯 Should I Forsake My Sweetness, And My Good Fruit

The fig tree gives the same kind of answer the olive tree already gave.

Its sweetness and good fruit were valued as food across the ancient Near East.

Ruling over other trees would mean giving up the very thing that made it worth having.

The fable repeats this pattern on purpose, to build toward one final answer.

🍯 Sweetness meant valuable, edible fruit

🔁 The fig tree repeats the olive's answer

🙅 It refuses to trade fruit for power

📖 The pattern builds toward the final answer

## 🍷 Should I Leave My Wine, Which Cheereth God And Man

Wine was poured out as a drink offering to God in Israel's worship, alongside ordinary meals.

Cheereth means it brings joy, both to God's offerings and to human celebration.

The vine is the third valuable tree in a row to refuse the crown.

Three genuinely useful trees have now turned down power for the same reason.

🍷 Wine was used in drink offerings

😊 Cheereth means it brings real joy

🔁 This is the third refusal in a row

📖 Three useful trees all reject power

## 🏆 And Go To Be Promoted Over The Trees

This same phrase appears after each tree's refusal, promoted over the trees.

Being promoted here means gaining status, not gaining any real ability to help.

Every valuable tree sees ruling as a demotion in usefulness, not an honor.

The fable quietly argues that real leaders are chosen for what they contribute.

🔁 This exact phrase repeats each refusal

🏆 Promoted here means status, not usefulness

📉 Ruling looks like a demotion to them

➡️ Leaders should be chosen for what they give

# Judges 9:14-15
# 🌵 The Bramble Says Yes
---
## 🌵 Then Said All The Trees Unto The Bramble, Come Thou, And Reign Over Us

A bramble is a low, thorny, worthless shrub, nothing like the fruitful trees before it.

After three valuable trees refuse, the trees turn to the least valuable plant of all.

The fable's punchline is that only something with nothing to offer wants the crown.

Desperation for a king leads straight to the worst possible choice.

🌵 A bramble is a worthless thorny shrub

📉 It is the least valuable option left

🎭 Only the useless plant wants power

➡️ Desperation led to the worst choice

## 🌫️ Put Your Trust In My Shadow

A low thorny bramble casts barely any real shade at all.

The bramble is promising protection it has no real ability to give.

This is a direct picture of what Shechem has just done with Abimelech.

Empty promises of shelter often come from the ones least able to provide it.

🌫️ A bramble gives almost no real shade

🎭 It promises protection it cannot give

👑 This mirrors Shechem trusting Abimelech

📖 Empty shelter often hides real danger

## 🔥 Let Fire Come Out Of The Bramble, And Devour The Cedars Of Lebanon

Cedars of Lebanon were among the tallest, strongest, most valuable trees in the ancient world.

A bramble catches fire easily and burns fast, unlike a slow burning cedar.

The threat sounds absurd on its surface, a weed threatening to destroy mighty trees.

Jotham is warning that the least worthy choice could still destroy everyone around him.

🌲 Cedars of Lebanon were the mightiest trees

🔥 A bramble burns fast and spreads easily

⚠️ The threat sounds absurd but is real

➡️ The least worthy choice can destroy everyone

# Judges 9:16-21
# ⚖️ Jotham's Curse And Escape
---
## ⚖️ If Ye Have Done Truly And Sincerely, In That Ye Have Made Abimelech King

Jotham now steps out of the fable and applies it directly to Shechem's own choice.

Truly and sincerely means honestly, with real integrity, not just convenient loyalty.

He is asking Shechem to judge its own action by that honest standard.

The fable was never really about trees, it was always about this exact decision.

🎭 Jotham applies the fable directly now

⚖️ Truly and sincerely means real integrity

❓ He asks Shechem to judge itself

📖 The fable was always about this choice

## 🛡️ My Father Fought For You, And Adventured His Life Far, And Delivered You Out Of The Hand Of Midian

This father is Gideon, the very man Shechem's leaders have just ignored.

Adventured his life far means he personally risked death fighting for their safety.

Gideon's deliverance in the earlier chapters directly protected the people of Shechem too.

Jotham reminds them of a debt they have already chosen to forget.

🛡️ Gideon risked his life for them

⚔️ Adventured his life far means real danger

🏙️ Shechem was protected by his victory

➡️ They forgot a debt they truly owed

## 🗣️ Ye Are Risen Up Against My Father's House This Day, And Have Slain His Sons

Jotham names the murder plainly, with no softening language at all.

He places the blame on Shechem's leaders, not only on Abimelech who swung the sword.

Funding, hiring, and crowning a killer makes a city guilty alongside him.

Silence and support can be their own kind of participation in violence.

🗣️ Jotham names the murder directly

⚖️ He blames Shechem, not only Abimelech

💰 Funding a killer shares the guilt

📖 Support can be its own participation

## 🤝 Then Rejoice Ye In Abimelech, And Let Him Also Rejoice In You

Jotham offers a real, if unlikely, alternative to the coming disaster.

If Shechem's choice was honest, then this alliance could still work out peacefully.

He is not only cursing them, he leaves room for a different outcome.

The rest of the chapter shows which path Shechem actually chose.

🤝 Jotham offers a peaceful alternative

❓ It depends on their true honesty

⚖️ He leaves room for either outcome

➡️ The chapter shows which path they took

## 🔥 Let Fire Come Out From Abimelech, And Devour The Men Of Shechem

This is the curse half of the fable's warning, now spoken as a real prediction.

Jotham says the fire will burn in both directions, king against city and city against king.

He is not just angry, he is forecasting exactly how this alliance will end.

The rest of the chapter is this exact curse playing out in full.

🔥 This is the curse from the fable

🔁 Fire threatens both sides of the deal

🔮 Jotham forecasts how this alliance ends

➡️ The rest of the chapter fulfills this curse

## 💧 Jotham Ran Away, And Fled, And Went To Beer, And Dwelt There

Beer simply means well in Hebrew, and several places in the Bible share this name.

Jotham escapes immediately after speaking, knowing his words put him in real danger.

He never appears again in the story after delivering this one speech.

His single fable is the only resistance Gideon's murdered sons ever receive.

💧 Beer means well in Hebrew

🏃 Jotham fled right after speaking

👋 He never appears in the story again

📖 His fable was the only resistance offered

# Judges 9:22-25
# 😈 God Sends A Spirit Of Discord
---
## 🔢 When Abimelech Had Reigned Three Years Over Israel

Three years is a short reign compared to the judges who ruled for decades.

This is also the first time in the book anyone is called king rather than judge or deliverer.

The word choice signals that something is different, and wrong, about this rule.

A short, troubled reign is already implied before the trouble is even described.

🔢 Three years is a short reign here

👑 He is called king, not judge

⚠️ The word choice signals trouble ahead

📖 Something is different about this rule

## 😈 God Sent An Evil Spirit Between Abimelech And The Men Of Shechem

This does not mean God created evil, it means God allowed discord as a form of judgment.

A very similar evil spirit later troubles King Saul in the book of Samuel.

The same alliance that murdered seventy brothers together now turns against itself.

God's judgment often works through people destroying the very thing they built on sin.

😈 God allowed discord as judgment

🔁 A similar spirit later troubles Saul

💔 The murderous alliance turns on itself

➡️ Sin often destroys what it built

## 🗡️ The Men Of Shechem Dealt Treacherously With Abimelech

Treacherously means they broke trust and turned against someone they had supported.

The same city that crowned him now works secretly to bring him down.

Jotham's curse specifically named this exact kind of betrayal between the two sides.

What was sown in murder is now being reaped in betrayal.

🗡️ Treacherously means breaking trust and turning

🔁 Shechem now betrays its own king

🔮 Jotham's curse specifically named this

📖 What was sown is now being reaped

## ⏸️ That The Cruelty Done To The Threescore And Ten Sons Of Jerubbaal Might Come

The text pauses here to explain why any of this discord is happening.

It ties the coming disaster directly back to the murder of Gideon's seventy sons.

Both Abimelech, who killed them, and Shechem, who paid for it, share the blame.

The narrator wants the reader to see this as justice, not random chaos.

⏸️ The narrator pauses to explain the cause

🔁 It ties back to the seventy murders

⚖️ Both Abimelech and Shechem share guilt

📖 This is framed as justice, not chaos

## 🏔️ The Men Of Shechem Set Liers In Wait For Him In The Top Of The Mountains

Liers in wait means bandits hidden along the roads, ready to ambush travelers.

This directly hurt Abimelech's own trade and authority over the region around Shechem.

Robbing travelers was likely a deliberate insult meant to humiliate his rule.

Betrayal here starts quietly, with robbery, before it grows into open rebellion.

🏔️ Liers in wait means hidden bandits

💰 The robbery hurt Abimelech's authority

😏 It likely humiliated his rule on purpose

➡️ Small betrayal grows into open rebellion

# Judges 9:26-29
# 🗣️ Gaal's Bold Challenge
---
## 🚶 Gaal The Son Of Ebed Came With His Brethren, And Went Over To Shechem

Gaal is a new outsider who arrives looking for power exactly where discord already exists.

The men of Shechem quickly put their confidence in him instead of Abimelech.

Shechem's loyalty to Abimelech had already completely collapsed.

A city already turning treacherous is easy prey for the next ambitious man.

🚶 Gaal arrives as a new outsider

🤝 Shechem quickly trusts him instead

💔 Their loyalty to Abimelech had collapsed

➡️ Discord makes a city easy prey

## ⛩️ Went Into The House Of Their God, And Did Eat And Drink, And Cursed Abimelech

The house of their god is Baalberith's temple, the same one that funded Abimelech's coup.

This was likely a harvest festival, a normal seasonal celebration in this culture.

Cursing Abimelech turns a religious festival into open political rebellion.

The very temple that once made him king now hosts the plot against him.

⛩️ This is Baalberith's own temple

🍇 A harvest festival was normal here

🗣️ The feast becomes open rebellion

📖 The temple that crowned him now curses him

## ❓ Who Is Abimelech...Is Not He The Son Of Jerubbaal? And Zebul His Officer

Gaal directly attacks Abimelech's right to rule in front of the whole crowd.

He reminds them that Abimelech is only half Shechemite, through his mother, not fully one of them.

He also names Zebul, Abimelech's officer, as a target worth removing too.

Public shame like this was a powerful weapon in this honor based culture.

❓ Gaal attacks Abimelech's legitimacy directly

👪 He calls out Abimelech's mixed lineage

🎯 Zebul is named as a target too

📖 Public shame carried real political weight

## 🏙️ Serve The Men Of Hamor The Father Of Shechem

Hamor was the original Canaanite founder of Shechem, back in the days of Jacob in Genesis.

Gaal is appealing to old Canaanite pride over Abimelech's mixed Israelite and Canaanite blood.

He wants Shechem to remember its ancient identity instead of its recent king.

This is an appeal to ethnic pride dressed up as a political argument.

🏙️ Hamor founded Shechem long ago

🩸 Gaal appeals to pure Canaanite pride

👑 He contrasts this with Abimelech's mixed blood

➡️ Ethnic pride becomes his political weapon

## 👑 Would To God This People Were Under My Hand! Then Would I Remove Abimelech

Gaal is not just criticizing Abimelech, he is openly declaring his own ambition to replace him.

He speaks with the same overconfidence Abimelech once had at the start of this chapter.

Increase thine army is a direct taunt, daring Abimelech to actually fight him.

Gaal's boast is about to be tested far sooner than he expects.

👑 Gaal openly wants Abimelech's power

🎭 His confidence mirrors Abimelech's own

😤 He directly taunts Abimelech to fight

➡️ His boast will be tested very soon

# Judges 9:30-33
# 🌙 Zebul's Secret Warning
---
## 😠 Zebul The Ruler Of The City Heard The Words Of Gaal...His Anger Was Kindled

Zebul is Abimelech's own officer, still loyal despite the city's growing rebellion.

He overhears Gaal's public boast against both his rival and his own position.

His anger drives him to act immediately, protecting Abimelech's interests in secret.

Not everyone in Shechem has turned against Abimelech, at least not yet.

👔 Zebul is Abimelech's loyal officer

👂 He overhears Gaal's public boast

😠 His anger drives quick action

📖 Not everyone in Shechem had turned

## 🤫 He Sent Messengers Unto Abimelech Privily

Privily means secretly, hidden from Gaal and the rest of the city.

Zebul is playing a double game, staying visibly loyal to Gaal in public.

This secret warning gives Abimelech the exact advantage he needs to strike first.

Betrayal in this chapter runs in every direction, not only against Abimelech.

🤫 Privily means done in complete secret

🎭 Zebul plays loyal to Gaal in public

📩 His warning gives Abimelech the advantage

➡️ Betrayal runs in every direction here

## 🌙 Now Therefore Up By Night, Thou And The People That Is With Thee

Zebul gives Abimelech a full military plan, not just a warning.

Moving by night let Abimelech's forces get into position completely undetected.

This kind of tactical detail shows Zebul's genuine skill and loyalty as an officer.

A good plan from an insider is more valuable than a warning alone.

🌙 Zebul suggests a night movement

🕵️ It keeps Abimelech's forces hidden

🧠 Zebul reveals real tactical skill

📖 An insider's plan beats a warning alone

## 🎯 Do To Them As Thou Shalt Find Occasion

This phrase leaves the exact method of attack entirely up to Abimelech's judgment.

Zebul has set the trap, but Abimelech alone will decide how it closes.

This open ended instruction gives Abimelech maximum freedom to respond to whatever happens.

The stage is now fully set for the battle in the very next verses.

🎯 Zebul leaves the method to Abimelech

🪤 The trap is set, not yet sprung

🕊️ Abimelech gets full freedom to act

➡️ The battle is set up next

# Judges 9:34-41
# ⚔️ The Battle At The Gate
---
## 🔢 Abimelech Rose Up, And All The People That Were With Him, By Night, And They Laid Wait Against Shechem In Four Companies

Four companies means Abimelech's forces split into four separate ambush positions.

This matches the exact tactic Zebul suggested, moving and hiding under cover of night.

Splitting into four groups let Abimelech surround the city from multiple directions at once.

Gaal's boast is about to meet a carefully prepared and disciplined enemy.

🔢 Four companies means four ambush positions

🌙 This follows Zebul's exact plan

🎯 It let Abimelech surround the city

➡️ Gaal's boast meets real preparation

## 🚶 Abimelech Rose Up From Lying In Wait

Gaal walks straight into the gate entrance completely unaware that Abimelech's ambush is already in position.

Standing at the gate was normally a show of civic authority and confidence.

The very moment Gaal steps forward to look strong, his hidden enemy rises to strike.

Confidence displayed at the wrong moment can turn into the worst possible timing.

🚶 Gaal stands boldly at the gate

🪤 Abimelech's ambush rises at that moment

😲 Gaal has no idea what is coming

📖 Confidence at the wrong time backfires

## 🎭 Thou Seest The Shadow Of The Mountains As If They Were Men

Zebul deliberately lies to Gaal about what he is actually seeing.

He downplays the approaching army as nothing more than shifting shadows on the hills.

This buys Abimelech's forces critical extra time to get fully into position.

Zebul is still fighting for Abimelech, now through simple, effective deception.

🎭 Zebul deliberately deceives Gaal here

⛰️ He blames it on shadows, not soldiers

⏳ This buys Abimelech extra time

📖 Zebul still fights for his king

## 👀 See There Come People Down By The Middle Of The Land, And Another Company By The Plain Of Meonenim

Gaal insists a second time that he really does see approaching soldiers.

Meonenim likely names a specific known landmark near Shechem.

This detail shows Gaal genuinely noticing the danger, even while Zebul keeps stalling him.

Gaal's own eyes are telling him the truth his pride will not let him accept in time.

👀 Gaal insists a second time

🗺️ Meonenim was a known local landmark

⚠️ He genuinely notices real danger

➡️ His pride ignores what his eyes tell him

## 🗣️ Where Is Now Thy Mouth, Wherewith Thou Saidst, Who Is Abimelech, That We Should Serve Him?

Zebul throws Gaal's own boastful words from earlier in the chapter right back at him.

The timing is deliberate, waiting until Gaal can no longer talk his way out.

Zebul forces Gaal to either fight immediately or lose all credibility in front of the city.

Big talk without real strength always eventually meets a moment like this one.

🗣️ Zebul quotes Gaal's own earlier boast

⏰ The timing traps Gaal completely

⚔️ Gaal must fight or lose credibility

➡️ Big talk eventually meets a real test

## ⚔️ Gaal Went Out Before The Men Of Shechem, And Fought With Abimelech

Gaal is forced into battle without the full preparation his boast implied he had.

Fighting before the men of Shechem means the whole city watches this fight unfold.

His earlier confidence never matched his actual military readiness.

Words spoken in a feast do not always survive contact with a real battlefield.

⚔️ Gaal fights unprepared for real battle

👀 The whole city watches this happen

📉 His confidence outran his readiness

📖 Bold words do not guarantee victory

## 🏃 Abimelech Chased Him, And He Fled Before Him, And Many Were Overthrown And Wounded

Fled before him means Gaal's forces broke and ran rather than holding their ground.

Casualties pile up specifically during the chase toward the city gate itself.

Abimelech's careful ambush plan produces exactly the decisive result Zebul had promised.

The rebellion Gaal started collapses within a single fight.

🏃 Gaal's forces broke and fled

🩸 Casualties piled up near the gate

🎯 Abimelech's ambush plan fully worked

➡️ The rebellion collapsed in one fight

## 🏘️ Abimelech Dwelt At Arumah: And Zebul Thrust Out Gaal And His Brethren

Arumah was likely a nearby town Abimelech used as his base of operations.

Zebul finishes the job by physically expelling Gaal and his family from Shechem.

Gaal disappears from the story completely after this single failed challenge.

Zebul's loyalty, tested through the whole chapter, is fully proven here.

🏘️ Arumah was likely Abimelech's base

🚪 Zebul physically expels Gaal's family

👋 Gaal vanishes from the story

📖 Zebul's loyalty is fully proven

# Judges 9:42-45
# 🔥 Shechem Is Destroyed
---
## 📅 And It Came To Pass On The Morrow, That The People Went Out Into The Field

This transition phrase marks a new day after the battle against Gaal.

The people of Shechem seem to believe the fighting from the day before is over.

Returning to ordinary farm work shows they had no idea what was coming next.

This calm moment makes the ambush that follows even more brutal by contrast.

📅 This marks the day after Gaal's defeat

🌾 People return to ordinary farm work

😲 They have no idea what is coming

➡️ Calm makes the coming ambush harsher

## 🔁 He Took The People, And Divided Them Into Three Companies, And Laid Wait In The Field

Abimelech repeats the exact ambush tactic that already worked once against Gaal.

This time the target is not a rival army but the ordinary people of Shechem working their fields.

Splitting into three companies again let him strike from multiple directions at once.

A tactic that defeats soldiers is now turned against unarmed civilians.

🔁 Abimelech repeats his winning tactic

🎯 Three companies strike from multiple sides

🌾 The targets are unarmed field workers

📖 A war tactic now targets civilians

## 💥 He Rose Up Against Them, And Smote Them

The people leaving the city that day were simply going about ordinary farm work.

They had no warning that their own king had already turned his army against them.

Smote them describes a sudden, violent attack with no chance to prepare or flee.

This is the moment Zebul's earlier warning tactic is used against Shechem instead of for it.

🚶 They left for ordinary farm work

😲 They had no warning of attack

💥 Smote means a sudden violent strike

➡️ Abimelech's own tactic turns on Shechem

## ☀️ He Fought Against The City All That Day

This assault lasts a full day, far longer and more thorough than the quick battle against Gaal.

Taking the city means Abimelech's forces break through Shechem's defenses completely.

The people killed here include ordinary residents, not only soldiers or rebels.

Jotham's curse of fire from Abimelech against Shechem is now literally happening.

☀️ The assault lasted an entire day

🏙️ Abimelech's forces fully take the city

🩸 Ordinary residents die, not only soldiers

📖 Jotham's curse is now literally happening

## 🧂 Beat Down The City, And Sowed It With Salt

Beating down the city means tearing its walls and buildings apart completely.

Sowing a place with salt was a symbolic ancient Near Eastern act of total cursing.

Salt made land useless for growing crops, marking the site as permanently ruined.

Abimelech is not just conquering his own hometown, he is trying to erase it forever.

🧱 Beat down means total demolition

🧂 Salt symbolized a permanent curse

🚫 It marked the land as ruined

📖 Abimelech tried to erase his own city

# Judges 9:46-49
# 🗼 The Tower Of Shechem Burns
---
## 🏰 The Men Of The Tower Of Shechem...Entered Into An Hold Of The House Of The God Berith

Berith is another name for Baalberith, the same covenant god named earlier in the chapter.

An hold means a fortified stronghold, likely attached to or built near the temple itself.

Survivors flee to this location expecting the temple to offer them real protection.

The same false god that funded Abimelech's rise cannot save the people who trusted it.

⛩️ Berith is the same god as Baalberith

🏰 An hold means a fortified stronghold

🙏 They expect the temple to protect them

📖 The false god cannot save them

## ⛰️ Abimelech Gat Him Up To Mount Zalmon, And All The People That Were With Him

Mount Zalmon rises near Shechem, giving easy access to nearby wooded hillsides.

Abimelech personally leads the effort himself, rather than only commanding from a distance.

This hands on involvement shows how determined he is to finish what he started.

The king who began this chapter with murder now finishes it the same way.

⛰️ Zalmon was a wooded hill near Shechem

🪓 Abimelech personally leads this attack

💪 His hands on involvement shows determination

➡️ He finishes the chapter as he started it

## 🌿 Took An Axe In His Hand, And Cut Down A Bough From The Trees

A bough is simply a cut branch, easy for one man to carry and stack.

Abimelech gives a direct order by demonstrating the action himself first.

This detail echoes Jotham's fable, where trees stood in for people in this exact story.

Wood from real trees now becomes the literal fuel for the fable's fire coming true.

🌿 A bough is a cut tree branch

🪓 Abimelech demonstrates the order himself

🎭 This echoes Jotham's tree fable directly

📖 Real wood fuels the fable's fire

## 🔥 Set The Hold On Fire Upon Them

About a thousand people die together in this single fire.

Men and women together shows this was not a battle against armed soldiers alone.

Fire consuming a wooden stronghold made escape nearly impossible for anyone trapped inside.

Jotham's curse of fire from the bramble is now fulfilled in the most literal way possible.

🔢 About a thousand people died together

👪 Men and women died, not just soldiers

🔥 The wooden stronghold made escape impossible

📖 Jotham's fire curse is now literally fulfilled

# Judges 9:50-57
# 💀 Abimelech's Death At Thebez
---
## 🏘️ Then Went Abimelech To Thebez, And Encamped Against Thebez, And Took It

Thebez was a separate town, likely allied with or similar to Shechem in its resistance.

Abimelech moves immediately from destroying his own hometown to attacking another city.

His violence had become a pattern, not a single act of personal revenge.

A king built on murder keeps finding new reasons to keep killing.

🏘️ Thebez was a separate resisting town

🔁 Abimelech moves straight to a new target

⚠️ His violence became an ongoing pattern

➡️ A murderous king keeps finding new targets

## 🗼 There Was A Strong Tower Within The City, And Thither Fled All The Men And Women

This tower closely mirrors the tower of Shechem that Abimelech just destroyed by fire.

Everyone in the city, not only soldiers, gathers here for safety.

The story deliberately repeats the exact same setup as the previous disaster.

Abimelech is about to try the same winning tactic one more time.

🗼 This tower mirrors Shechem's own tower

👪 The whole city gathers there for safety

🔁 The story repeats the same setup

📖 Abimelech tries the same tactic again

## 🚪 Went Hard Unto The Door Of The Tower To Burn It With Fire

Abimelech tries the exact same fire tactic that worked at the tower of Shechem.

Getting close to the door was necessary to set the wooden structure alight.

This closeness is also what puts him directly under the wall above.

The tactic that made him victorious once is the same one that puts him in danger now.

🔥 Abimelech repeats his fire tactic

🚪 He must get close to the door

⚠️ That closeness puts him under the wall

➡️ His winning tactic becomes his danger

## 🪨 A Certain Woman Cast A Piece Of A Millstone Upon Abimelech's Head, And All To Brake His Skull

A millstone was a heavy round stone normally used by hand to grind grain into flour.

Even a broken piece of one was heavy enough to crush a skull from above.

An unnamed woman, not a soldier, ends the reign of a king who murdered seventy men.

The lowest and least expected person in this culture becomes the one who stops him.

🪨 A millstone was a heavy grinding stone

💥 Even a piece could crush a skull

👩 An unnamed woman strikes the fatal blow

📖 The least expected person stopped a king

## 🗡️ Draw Thy Sword, And Slay Me, That Men Say Not Of Me, A Woman Slew Him

Abimelech is dying, but his final concern is entirely about his own reputation.

Being killed by a woman was considered a uniquely shameful death in this warrior culture.

His armourbearer's sword thrust cannot actually hide the truth of what really happened.

This exact story is remembered and referenced generations later, in the book of Second Samuel.

🗡️ Abimelech's dying concern is his reputation

😳 Dying by a woman was seen as shameful

🎭 A second death cannot hide the truth

📖 This story is remembered generations later

## 💨 When The Men Of Israel Saw That Abimelech Was Dead, They Departed Every Man Unto His Place

No successor is named, no new king rises to take Abimelech's place.

His entire following simply disbands the moment he dies.

A kingship built on murder and hired violence collapses just as suddenly as it began.

The three year experiment with a king ends with nothing built to last.

🚫 No successor takes Abimelech's place

💨 His followers simply scatter home

📉 A murder built kingship collapses fast

➡️ Nothing from his rule was built to last

## ⚖️ Thus God Rendered The Wickedness Of Abimelech, Which He Did Unto His Father, In Slaying His Seventy Brethren

Rendered means repaid or given back, a word used for settling a debt in full.

The chapter closes by naming exactly what this whole story was really about.

Abimelech's death by a woman's hand answers the murder of his seventy brothers directly.

The narrator wants no doubt left that this was justice, not simple misfortune.

⚖️ Rendered means repaid in full

🔁 This closes the loop from verse five

🩸 His death answers his brothers' murder

📖 The narrator names this as justice

## 🔗 All The Evil Of The Men Of Shechem Did God Render Upon Their Heads: And Upon Them Came The Curse Of Jotham

Shechem's own destruction and burning tower are named here as their share of the same justice.

The chapter explicitly ties this ending back to Jotham's exact warning from earlier in the chapter.

One brother, hiding and alone, spoke a warning that came true in complete detail.

The whole bloody chapter closes by confirming that Jotham's fable was never just a story.

🔥 Shechem's destruction was their own judgment

🔗 This ties directly back to Jotham's curse

🗣️ One hidden brother's warning came fully true

📖 The fable was never just a story
`.trim();

export const JUDGES_NINE_PERSONAL_SECTIONS = parseJudgesNineRawNotes(JUDGES_NINE_RAW_NOTES);
