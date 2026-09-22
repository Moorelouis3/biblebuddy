export type IsaiahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThreeRawNotes(rawText: string): IsaiahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 3:${startVerse}` : `Isaiah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Isaiah 3 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THREE_RAW_NOTES = `# Isaiah 3:1-3
# 🥖 The Whole Stay Removed
---
## 👑 The Lord, The LORD Of Hosts, Doth Take Away

Lord here does not mean the same word as LORD written in all capital letters.

The first is Adonai, a title of authority and ownership.

The second is LORD of hosts, the divine name paired with command over armies.

Stacking both titles together removes any doubt that this warning will happen.

👑 Lord is a title of ownership

⚔️ LORD Of Hosts commands every army

🔠 KJV capitals mark God's own name

📖 Together the titles guarantee this warning
---
## 🍞 The Stay And The Staff, The Whole Stay Of Bread, And The Whole Stay Of Water

Stay and staff both describe something a person leans on for support.

Bread and water were not small luxuries in ancient Jerusalem.

They were the baseline supplies a city needed to survive at all.

Removing the stay of bread and water pictures a coming famine.

It was likely tied to the siege that would later close in on the city.

🍞 Stay means something leaned on for support

💧 Bread and water were baseline survival

🏙️ A city could not function without them

📖 Their removal pictures a coming famine
---
## ⚔️ The Mighty Man, And The Man Of War

Mighty man describes someone known simply for physical strength.

Man of war names a trained soldier, a separate and more specific role.

Together the two names cover raw strength and organized military skill.

God removes both categories from Judah at the very same time.

💪 Mighty man means raw personal strength

🗡️ Man of war means trained soldiers

🛡️ Together they covered all military defense

📖 Both are removed at the same time
---
## ⚖️ The Judge, And The Prophet, And The Prudent, And The Ancient

Judge names someone who settled legal disputes and kept order in the community.

Prophet names someone who spoke for God and warned the nation when it strayed.

Prudent describes a person wise and skilled at practical decisions.

Ancient here means a respected elder, not simply someone old in years.

⚖️ Judge kept legal order in the land

🗣️ Prophet spoke for God to the nation

🧠 Prudent means practically wise

📖 Ancient means a respected elder leader
---
## 🔨 The Captain Of Fifty, And The Honourable Man, And The Counsellor, And The Cunning Artificer, And The Eloquent Orator

Captain of fifty names someone who commanded a small military unit.

Honourable man describes someone who held public respect and status.

Counsellor names an advisor who helped shape the king's major decisions.

Cunning artificer names a skilled craftsman who shaped raw materials into objects.

Eloquent orator names someone who could move a crowd with persuasive words.

Every kind of leader named across these three verses disappears together.

🎖️ Captain of fifty led a small unit

👑 Honourable man held public standing

🗣️ Counsellor advised the king directly

📖 Every kind of leader vanishes together
---
# Isaiah 3:4-7
# 👶 Babes Shall Rule Over Them
---
## 👶 I Will Give Children To Be Their Princes

This does not mean God would literally hand the throne to toddlers.

Children here pictures leaders without the experience real judgment requires.

God is describing the quality of leadership Judah is about to get.

It matches the punishment named in the previous verses, removed wisdom and skill.

👶 Children pictures inexperienced leadership

🚫 Not a literal group of toddlers

📉 It matches the judgment just described

📖 The nation loses wise leaders
---
## 😩 And Babes Shall Rule Over Them

Babes intensifies the picture already set up by children in the line before.

Even an infant cannot make decisions for a household, let alone a nation.

The verse repeats the same idea twice for emphasis.

Judah's coming leadership crisis could not be stated more strongly.

😩 Babes intensifies the picture further

🏠 An infant cannot lead a household

🔁 The idea repeats for emphasis

📖 The leadership crisis is stated at its strongest
---
## 🌍 The People Shall Be Oppressed, Every One By Another, And Every One By His Neighbour

No outside enemy gets named as the cause of this oppression.

The harm described comes from inside the community itself.

Neighbor turns against neighbor once real leadership disappears.

A nation without order eventually turns on itself.

🌍 No outside enemy is named here

🏘️ The harm comes from inside the community

🤝 Neighbor turns against neighbor

📖 Disorder eventually turns inward
---
## 😤 The Child Shall Behave Himself Proudly Against The Ancient, And The Base Against The Honourable

Normal social order in this culture placed real weight on respecting elders.

This verse pictures that respect collapsing completely.

Base describes someone of low social standing, the opposite of honourable.

Every expected order gets reversed once judgment falls.

👴 Elders normally received real respect

📉 This verse pictures that respect collapsing

⬇️ Base means low standing, opposite of honourable

📖 Expected order is reversed by judgment
---
## 🧥 Thou Hast Clothing, Be Thou Our Ruler

This pictures a desperate scene after the real leaders are gone.

People grab literally any man who still owns a coat.

Owning clothing became proof enough of having some resources left.

The bar for leadership has fallen to almost nothing.

🧥 Clothing becomes proof of having resources

🙋 Any man who owns a coat gets grabbed

📉 The bar for leadership has collapsed

📖 Desperation replaces real qualification
---
## 🏚️ And Let This Ruin Be Under Thy Hand

Ruin here does not describe a small, temporary problem.

It names the wrecked state of the whole nation at this point.

The people are asking this man to take charge of a disaster, not a kingdom.

Nobody sane would want the job they are offering him.

🏚️ Ruin describes the whole nation's wreck

👋 They hand him a disaster, not a kingdom

🙅 No one really wants this job

📖 The offer reveals how bad things are
---
## 🩺 I Will Not Be An Healer

Healer here is used as a picture for someone who can fix a broken situation.

The man refuses the moment he is offered the role of ruler.

He explains himself by pointing out he has no food or clothing of his own.

Even the man they turned to admits there is nothing left to work with.

🩺 Healer pictures someone who fixes problems

🙅 He refuses the role right away

🍞 He has no food or clothing himself

📖 There is nothing left to work with
---
# Isaiah 3:8-9
# 🏚️ Jerusalem Is Ruined
---
## 🏚️ Jerusalem Is Ruined, And Judah Is Fallen

Jerusalem was the capital, and Judah was the whole surrounding nation.

Naming both together means no part of the country escapes this judgment.

Ruined and fallen describe a complete collapse, not a partial setback.

The two names cover the city and the country as a single unit.

🏛️ Jerusalem names the capital city

🗺️ Judah names the whole surrounding nation

📉 Ruined and fallen mean complete collapse

📖 No part of the country is spared
---
## 🗣️ Their Tongue And Their Doings Are Against The LORD

Tongue points to what the people said, and doings points to what they did.

Naming both together closes off any excuse of good intentions.

Words and actions had both turned against God, not just one or the other.

This is the direct reason Isaiah gives for the ruin just described.

🗣️ Tongue means what the people said

🖐️ Doings means what the people did

🚫 No excuse of good intentions remains

📖 This is the stated reason for the ruin
---
## 👀 To Provoke The Eyes Of His Glory

This phrase pictures sin as something done in plain sight of God.

Eyes of his glory means God's own presence watching directly.

Provoke means to deliberately stir up anger, not simply to disappoint.

Judah's sin was not hidden or accidental in Isaiah's description.

👀 Eyes of his glory means God watching directly

😠 Provoke means deliberately stirring anger

🚫 Sin was not hidden from God

📖 It was done in plain sight
---
## 😐 The Shew Of Their Countenance Doth Witness Against Them

Countenance means the expression on a person's face.

Shew is an old spelling of show, meaning what that expression reveals.

Their own faces gave away their guilt without a single word spoken.

No formal accusation was even needed to prove the case against them.

😐 Countenance means facial expression

👁️ Shew means what that face reveals

🤐 Their own faces proved their guilt

📖 No formal accusation was even needed
---
## 🏙️ They Declare Their Sin As Sodom, They Hide It Not

Sodom was the city destroyed generations earlier for its open, unashamed sin.

Comparing Judah to Sodom was the harshest comparison Isaiah could make.

Hide it not means the people sinned openly, without shame or secrecy.

The comparison links this chapter back to the destruction Genesis records.

🏙️ Sodom was destroyed for open sin

⚡ This is the harshest comparison possible

🙈 Hide it not means sinning without shame

📖 The comparison recalls Genesis directly
---
## 💔 Woe Unto Their Soul! For They Have Rewarded Evil Unto Themselves

Woe was a word used to announce coming disaster or grief.

Rewarded evil unto themselves means the punishment was self inflicted.

Judah is not a victim of outside forces in this description.

Their own choices are what produced the coming judgment.

💔 Woe announces coming disaster

🔄 Rewarded evil means self inflicted judgment

🚫 Judah is not an outside victim here

📖 Their own choices produced this outcome
---
# Isaiah 3:10-12
# ⚖️ Well With Him, Ill With Him
---
## ✅ Say Ye To The Righteous, That It Shall Be Well With Him

Righteous here means someone who stayed faithful despite the surrounding sin.

This promise interrupts a long string of warnings with real hope.

Well with him is a direct promise of good outcome, not a vague wish.

Judgment on the nation does not erase this promise for individuals.

✅ Righteous means staying faithful despite sin

🎁 Well with him promises a real good outcome

🚫 National judgment does not erase this

📖 Individual faithfulness still matters
---
## 🌾 For They Shall Eat The Fruit Of Their Doings

Fruit pictures the natural result that grows out of a person's actions.

Good actions were expected to produce a good harvest in return.

This is a common Bible principle applied here to the righteous person.

The promise from the line before now gets its reasoning explained.

🌾 Fruit pictures results growing from actions

🌱 Good actions were expected to yield good

🔗 The principle links to the promise before

📖 Actions and outcomes are connected
---
## ⚠️ Woe Unto The Wicked! It Shall Be Ill With Him

Wicked describes someone who chose to sin despite knowing better.

This promise mirrors the one just given to the righteous, only reversed.

Ill with him promises real, specific harm, not vague misfortune.

Isaiah places both promises side by side so the contrast cannot be missed.

⚠️ This mirrors the promise to the righteous

🔄 It is reversed for the wicked

💥 Ill with him promises specific harm

📖 The two promises sit side by side
---
## ✋ For The Reward Of His Hands Shall Be Given Him

Reward of his hands points back to what a person actually did.

This is the same fruit principle from verse ten, now applied in reverse.

The wicked receive back exactly what their own actions produced.

Nobody in this picture is punished for someone else's choices.

✋ Reward of his hands means what he did

🔄 Same principle as verse ten, reversed

🎯 He receives what his actions produced

📖 No one is punished for another's choice
---
## 👶 As For My People, Children Are Their Oppressors, And Women Rule Over Them

Children and women here describe leaders acting without real experience or authority.

This picture already appeared once before in verse four.

Many scholars read it as describing weak and illegitimate rule.

It likely does not point to literal age or gender at all.

🔁 This returns to the picture from verse four

👶 Children pictures inexperienced leadership again

❓ Many scholars read it as weak, illegitimate rule

📖 The earlier judgment is restated here
---
## 🛤️ They Which Lead Thee Cause Thee To Err, And Destroy The Way Of Thy Paths

Err means to wander off course, to go the wrong direction.

This is not a case of leaders simply failing to help.

These leaders are actively steering the people toward destruction.

Bad leadership here is described as harmful, not merely absent.

🧭 Err means wandering off course

🚫 This is not passive failure

⚠️ Leaders actively steer people toward harm

📖 Bad leadership is harmful, not just absent
---
# Isaiah 3:13-15
# 🍇 The LORD Standeth Up To Plead
---
## ⚖️ The LORD Standeth Up To Plead

Plead here is a courtroom word, not a word about begging.

It describes the role of a prosecutor bringing formal charges.

God is pictured stepping into His own courtroom to bring the case Himself.

This continues the same legal picture Isaiah opened the whole book with.

⚖️ Plead is a courtroom word here

👨‍⚖️ It describes bringing formal charges

🙌 God brings the case Himself

📖 The picture continues from chapter one
---
## 🧑‍⚖️ And Standeth To Judge The People

Judge names a second courtroom role, separate from the prosecutor role before it.

God is pictured filling both roles at once, prosecutor and judge.

No other party is needed to help weigh this case.

The verdict comes directly from the one who brought the charges.

🧑‍⚖️ Judge is a second courtroom role

🔀 God fills both roles at once

🚫 No outside party is needed here

📖 The verdict comes straight from God
---
## 👴 The LORD Will Enter Into Judgment With The Ancients Of His People, And The Princes Thereof

This case is not brought against the nation in general terms.

Ancients and princes names the specific leaders standing trial.

The people described earlier as oppressed are not the ones being judged here.

Isaiah keeps the blame pointed squarely at those who led badly.

👴 Ancients and princes names specific leaders

🎯 The case targets them directly

🙅 The oppressed people are not on trial

📖 Blame stays with those who led badly
---
## 🍇 For Ye Have Eaten Up The Vineyard

Vineyard becomes a picture for Israel and Judah used often later in Isaiah.

A vineyard needed careful, patient tending to produce a harvest.

Eaten up pictures leaders consuming what they were only meant to care for.

They treated something entrusted to them as their own private meal.

🍇 Vineyard pictures Israel and Judah

🌱 It needed careful, patient tending

🍽️ Eaten up means consuming what was entrusted

📖 Leaders treated it as their own meal
---
## 🏠 The Spoil Of The Poor Is In Your Houses

Spoil means goods taken by force, the same word used for war plunder.

This is not a vague accusation about general unfairness.

Isaiah names exact stolen property sitting inside these leaders' own homes.

The evidence for the charge is physically present in the room.

⚔️ Spoil means goods taken by force

🏠 Stolen property sits in their own homes

🎯 The accusation is specific, not vague

📖 The evidence is physically present
---
## 😢 What Mean Ye That Ye Beat My People To Pieces, And Grind The Faces Of The Poor

This question is asked for effect, not because God needs an answer.

Beat to pieces and grind the faces both picture violent, grinding oppression.

Grinding faces borrows the picture of a millstone crushing grain.

The image makes the leaders' cruelty impossible to soften or explain away.

❓ The question is rhetorical, not literal

💥 Beat to pieces pictures violent oppression

⚙️ Grinding faces borrows a millstone image

📖 The cruelty cannot be softened
---
# Isaiah 3:16-18
# 💍 The Daughters Of Zion
---
## 💃 The Daughters Of Zion Are Haughty

Daughters of Zion refers to the women of Jerusalem as a group.

Haughty describes pride that shows itself openly in how a person acts.

This shifts the chapter's focus from corrupt leaders to a different kind of sin.

Pride here is being called out just as directly as the leaders' corruption was.

💃 Daughters of Zion means Jerusalem's women

😏 Haughty means pride shown openly

🔀 The focus shifts to a new sin

📖 Pride is called out just as directly
---
## 👀 And Walk With Stretched Forth Necks And Wanton Eyes

Stretched forth necks pictures a stiff, deliberately superior posture.

Wanton eyes describes a flirtatious, attention seeking way of looking at others.

Both details describe body language meant to be noticed by everyone around.

The sin described here is about display, not private thought.

👀 Stretched necks picture a superior posture

😉 Wanton eyes means flirtatious, attention seeking looks

📢 Both details are meant to be noticed

📖 This sin is about display
---
## 🚶 Walking And Mincing As They Go

Mincing describes small, affected steps taken to look elegant on purpose.

It is not a normal, natural way of walking.

The word pictures someone performing for an audience with every step.

Every detail in this verse points back to the same theme, pride on display.

🚶 Mincing means small, affected steps

🎭 It is walking as a performance

👥 Every step is aimed at an audience

📖 Pride on display is the theme
---
## 🔔 And Making A Tinkling With Their Feet

Tinkling ornaments describes small bells or decorations worn around the ankles.

Each step made a light, ringing sound on purpose.

The sound was designed to draw attention the same way the walk did.

Sound joins posture and eyes as one more tool for being noticed.

🔔 Small ankle bells made a ringing sound

👣 The sound came with every step

📢 It was designed to draw attention

📖 Sound joined posture and eyes as a tool
---
## 🩹 The LORD Will Smite With A Scab The Crown Of The Head Of The Daughters Of Zion

The judgment here directly answers the pride just described.

Scab describes a disfiguring skin affliction, the opposite of an admired appearance.

Crown of the head was the very place styled hair once drew attention to.

The exact place used to show off beauty becomes the place judgment lands.

🩹 Scab means a disfiguring affliction

👑 Crown of the head once drew admiration

🔄 Judgment lands on that exact spot

📖 Pride's place becomes the place of shame
---
## 🫣 And The LORD Will Discover Their Secret Parts

Discover here is an old word meaning to uncover or expose.

This pictures the humiliation of being stripped, a real practice done to captives.

It reverses every effort spent on appearance and attention in the verses before.

Total exposure replaces the display these women had worked so hard to create.

🫣 Discover means to uncover or expose

⛓️ It pictures the humiliation done to captives

🔄 It reverses their careful display

📖 Exposure replaces the appearance they built
---
## 🎀 In That Day The Lord Will Take Away The Bravery Of Their Tinkling Ornaments

Bravery is an old word for fine, showy finery, not courage.

In that day ties this judgment to the same phrase used twice already in chapter two.

Tinkling ornaments recalls the ankle bells named just a few verses earlier.

This line opens a long list of exactly what will be stripped away.

🎀 Bravery meant fine, showy finery

🔁 In that day recalls chapter two's refrain

🔔 Tinkling ornaments recalls the earlier ankle bells

📖 It opens a list of what gets stripped
---
# Isaiah 3:19-23
# 📿 Every Ornament Named
---
## 📿 The Chains, And The Bracelets, And The Mufflers

Eighteen separate pieces of jewelry and clothing get named across the next several verses.

Naming every single item one by one would miss the actual point being made.

The list moves from head to foot, covering nearly everything a wealthy woman wore.

Chains, bracelets, earrings, veils, and mantles all turn up somewhere in it.

Nothing decorative from head to foot was left off this list.

The sheer length of it shows how complete the coming loss will be.

📿 Eighteen items are named in total

🧍 The list runs head to foot

🚫 Not listing each one misses the point

📖 The length shows how complete the loss is
---
# Isaiah 3:24
# 🔥 Beauty Traded For Grief
---
## 🫧 Instead Of Sweet Smell There Shall Be Stink

Sweet smell points to perfume, a normal luxury for wealthy women.

Stink is the flat opposite, decay instead of fragrance.

This line begins a set of direct reversals that close out the chapter.

Each reversal named here matches something lost from the list just given.

🫧 Sweet smell means perfume, a real luxury

🤢 Stink is the flat opposite of perfume

🔄 This begins a set of direct reversals

📖 Each reversal echoes the list before it
---
## 🎗️ And Instead Of A Girdle A Rent

A girdle was a fine belt or sash, often part of a well made outfit.

A rent is a tear or a torn piece of rope, the opposite of anything fine.

The trade pictures fine clothing replaced with something ragged and broken.

Even something as small as a belt does not escape this reversal.

🎗️ Girdle means a fine belt or sash

✂️ Rent means a tear or torn rope

🔄 Fine clothing becomes ragged instead

📖 Even small details do not escape
---
## 💇 And Instead Of Well Set Hair Baldness

Well set hair describes hair carefully styled and arranged, a mark of care and status.

Baldness in this culture was a common sign of mourning or captivity.

The trade moves from a symbol of pride to a symbol of grief.

This reversal targets the exact appearance so carefully built up earlier in the chapter.

💇 Well set hair showed careful styling

😢 Baldness signaled mourning or captivity

🔄 Pride is traded for grief

📖 It targets the appearance built up earlier
---
## 🪢 And Instead Of A Stomacher A Girding Of Sackcloth

A stomacher was a decorated panel worn over the chest as a fashion piece.

Sackcloth was coarse, rough material worn specifically for mourning or repentance.

The trade moves from a decorative fashion piece to a garment of grief.

This is the same pattern already used for smell, girdle, and hair.

🪢 Stomacher was a decorated chest panel

😔 Sackcloth was rough mourning cloth

🔄 Fashion is traded for grief again

📖 The same reversal pattern continues
---
## 🔥 And Burning Instead Of Beauty

Burning likely points to a branded or scarred mark, possibly from captivity.

Beauty names everything the daughters of Zion had built their identity around.

This closes the list of reversals with the sharpest contrast yet.

The whole section ends by trading their most prized possession for a permanent scar.

🔥 Burning likely means a branded mark

💄 Beauty was their whole built up identity

🔄 It closes the list of reversals

📖 Their prized possession is traded for a scar
---
# Isaiah 3:25-26
# 😭 Her Gates Shall Lament And Mourn
---
## ⚔️ Thy Men Shall Fall By The Sword, And Thy Mighty In The War

Mighty man and man of war were the very roles removed back in verse two.

Now the chapter describes them falling in battle instead.

The warning named at the start becomes a literal outcome by the end.

The chapter closes its opening list with the very fate it warned about.

⚔️ This fulfills the warning from verse two

💪 The mighty man now falls in battle

🔄 Warning becomes literal outcome here

📖 The chapter's opening list is completed
---
## 🚪 And Her Gates Shall Lament And Mourn

Gates here stand in for the whole city of Jerusalem.

City gates were normally busy places, full of trade, news, and legal decisions.

Picturing the gates themselves in mourning shows a city gone completely silent.

Even its most active, public place has fallen quiet with grief.

🚪 Gates stand in for the whole city

🗣️ Gates were normally busy, active places

🤫 Mourning gates picture total silence

📖 Even the busiest place has gone quiet
---
## 🪑 And She Being Desolate Shall Sit Upon The Ground

Jerusalem is pictured here as a grieving woman, not just a broken building.

Sitting on the ground was a well known posture of mourning in this culture.

Desolate means left empty and stripped of everything that once filled it.

This image of the city as a mourning woman continues directly into the next chapter.

🪑 Jerusalem is pictured as a grieving woman

😢 Sitting on the ground signaled mourning

📭 Desolate means emptied and stripped

📖 The image continues into chapter four
`.trim();

export const ISAIAH_THREE_PERSONAL_SECTIONS = parseIsaiahThreeRawNotes(ISAIAH_THREE_RAW_NOTES);
