export type MicahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahFourRawNotes(rawText: string): MicahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 4:${startVerse}` : `Micah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Micah 4 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_FOUR_RAW_NOTES = `# Micah 4:1-5
# 🕊️ Swords Beaten Into Plowshares
---
## 🏛️ The Mountain Of The House Of The LORD

"The mountain of the house of the LORD" names the temple hill in Jerusalem.

That hill was never the tallest peak around it.

Micah pictures a day when it is raised above every mountain and hill on earth.

"In the last days" marks this as a future, decisive era, not a random moment.

The image describes honor, not literal geology.

🏛️ Mountain of the house means the temple hill

⛰️ It becomes greater than every mountain

📅 Last days marks a decisive future era

📖 The image is about honor not geology
---
## 🌊 People Shall Flow Unto It

This pictures crowds moving toward Jerusalem the way water flows downhill.

Normally people do not flow uphill toward a mountain.

Micah's picture reverses that, showing nations drawn upward by desire rather than force.

No army marches them there.

They come because they want to.

🌊 Flow pictures water moving downhill

⛰️ Nations move uphill here instead

🙌 They come by desire not force

📖 No army marches them to Zion
---
## ⚔️ Many Nations Shall Come

Earlier in Micah, nations show up as threats and invaders.

Here the same word "nations" describes willing worshippers instead.

That shift is the whole point of the vision.

The same people who once brought armies now bring themselves to learn from God.

⚔️ Nations once meant threats and invaders

🙏 Now nations means willing worshippers

🔄 The same word carries a reversed meaning

📖 Former enemies now come to learn
---
## 🧭 Let Us Go Up To The Mountain Of The LORD

"Go up" is the regular Hebrew way of describing travel toward Jerusalem.

The city sits high in the hill country, so every approach is literally upward.

Here it also carries a second meaning, going up in devotion and purpose.

Nations are quoting each other, inviting one another to make the trip together.

🧭 Go up describes the literal climb

🏙️ Jerusalem sits high in the hills

🙌 It also pictures rising devotion

📖 Nations invite each other to go
---
## 📚 He Will Teach Us Of His Ways, And We Will Walk In His Paths

"His ways" means God's own pattern for living, not a list of rituals.

"Walk in his paths" pictures daily life following a trail someone already marked out.

Teaching comes first, then walking follows what was taught.

The nations are not guessing at what pleases God anymore.

📚 Ways means God's own pattern for life

🚶 Paths pictures a marked trail to follow

🔁 Teaching comes before the walking

📖 Nations no longer guess at God's will
---
## 🔄 The Law Shall Go Forth Of Zion, And The Word Of The LORD From Jerusalem

Normally a small nation received law from a bigger empire, not the other way around.

Here the direction is completely reversed.

Zion becomes the source, and the nations become the students.

The word of the LORD repeats the same idea using a second phrase for emphasis.

🔄 Law normally flows the other way

🏙️ Zion becomes the source instead

🎓 Nations become the students here

📖 One idea stated twice for emphasis
---
## ⚖️ He Shall Judge Among Many People, And Rebuke Strong Nations Afar Off

Judging here does not mean condemning.

It means settling real disputes honestly, the way a trusted leader settles arguments.

"Afar off" shows God's authority is not limited to Israel's own borders.

Even distant, powerful nations answer to him.

⚖️ Judge means settling disputes honestly

🌍 Afar off means far beyond Israel

💪 Even powerful nations answer to God

📖 His authority has no borders
---
## 🗡️ They Shall Beat Their Swords Into Plowshares, And Their Spears Into Pruninghooks

A "plowshare" is the metal blade on a farming plow that cuts into soil.

A "pruninghook" is a curved farming tool used to trim vines and branches.

Both were made by melting down weapons and reshaping the metal into farm tools.

War equipment becomes food producing equipment instead.

🗡️ Plowshare means a plow blade for soil

🌿 Pruninghook means a curved vine cutting tool

🔥 Weapons get melted and reshaped

📖 War tools become farming tools
---
## 🎓 Nation Shall Not Lift Up A Sword Against Nation, Neither Shall They Learn War Any More

"Learn war" means formal training for battle, not just fighting by instinct.

Armies spent real time and resources learning how to fight well.

Micah pictures a future where that training simply stops happening.

Not fewer wars, but no more war training at all.

🎓 Learn war means formal battle training

⏳ Armies once trained constantly for war

🛑 That training completely stops here

📖 This pictures the total end of war
---
## 🍇 Sit Every Man Under His Vine And Under His Fig Tree

Vines and fig trees take years to mature and bear fruit.

Owning one that you could sit under meant real, settled security.

This was common shorthand across the Old Testament for peace and prosperity at home.

Nobody was chasing you off your own land anymore.

🍇 Vine and fig tree take years to grow

🏡 Owning one meant settled security

🕊️ This phrase was shorthand for peace

📖 Nobody drives you off your land
---
## 😨 None Shall Make Them Afraid

Fear was a constant companion for small nations surrounded by bigger empires.

This promise removes that fear completely, not just reduces it.

Safety here is not wishful thinking.

It is a direct result of the peace described in the verses just before this one.

😨 Fear was constant for small nations

🛑 This removes fear completely not partly

🔗 Safety flows from the peace just described

📖 This security is a direct promise
---
## ⚔️ The Mouth Of The LORD Of Hosts Hath Spoken It

"LORD of hosts" names God as commander over heaven's armies.

That title makes this promise of peace especially striking.

The one powerful enough to wage endless war instead guarantees endless peace.

A promise from this particular name carries total certainty.

⚔️ LORD of hosts means commander of heaven's armies

🕊️ This title makes the peace promise striking

✅ Certainty comes from who is speaking

📖 The strongest commander promises lasting peace
---
## 🌍 All People Will Walk Every One In The Name Of His God

This admits plainly that other nations keep worshipping their own gods, even in this future era.

Micah does not pretend everyone converts at once.

Judah answers that same fact differently.

We will walk in the name of the LORD our God for ever and ever.

Other nations choose their own path.

Judah commits to one path, permanently.

🌍 Other nations keep their own gods

🚫 Micah does not claim everyone converts

🙏 Judah answers with permanent commitment

📖 Everyone walks somewhere, Judah walks with God
# Micah 4:6-8
# 🐑 The Lame Remnant Gathered
---
## 🦵 Will I Assemble Her That Halteth

"Halteth" is an old word for limping or walking with an injury.

God pictures the exiled people as wounded and struggling to keep up.

He does not wait for them to heal before gathering them.

He assembles them exactly as they are, limping and all.

🦵 Halteth means limping or injured

💔 The exiles are pictured as wounded

🤝 God gathers them before they heal

📖 He takes them exactly as they are
---
## 🏚️ Her That Is Driven Out, And Her That I Have Afflicted

"Driven out" describes people forced from their homes, most likely through exile.

"I have afflicted" is surprising, since God names himself as the one who sent the hardship.

This is not God denying his own judgment.

It is God moving from discipline into mercy for the very same people.

🏚️ Driven out means forced from home

⚖️ God admits sending the hardship himself

🔄 Judgment now turns into mercy

📖 The same people receive both from God
---
## 🌱 I Will Make Her That Halted A Remnant

A "remnant" is a small surviving group left after a much larger loss.

The very people once described as limping become the group God preserves.

Weakness here is not the end of the story.

It is the starting point for what God rebuilds.

🌱 Remnant means a small surviving group

🦵 The limping become the preserved group

🏗️ Weakness is not the final word

📖 God rebuilds starting from this point
---
## 🌍 Her That Was Cast Far Off A Strong Nation

"Cast far off" describes people scattered away from their homeland entirely.

This is a bigger loss than just limping or injury.

Yet God promises to turn even total scattering into real national strength.

The more distant the exile, the greater the reversal becomes.

🌍 Cast far off means totally scattered

💪 God turns scattering into real strength

📏 This loss is bigger than injury

📖 Greater exile becomes a greater reversal
---
## ⏳ The LORD Shall Reign Over Them In Mount Zion From Henceforth, Even For Ever

"Henceforth" means starting from this moment forward, without interruption.

This is not a temporary rescue that eventually ends.

Mount Zion specifically, not just Israel in general, becomes the center of that permanent reign.

The rest of the chapter builds entirely on this one promise.

⏳ Henceforth means starting now without end

🏔️ Zion specifically becomes the center

🔁 This reign never ends again

📖 The whole chapter builds on this promise
---
## 🐑 O Tower Of The Flock, The Strong Hold Of The Daughter Of Zion

A "tower of the flock" was a raised shepherd's post used to watch over sheep at night.

"Daughter of Zion" is a common way the Old Testament personifies Jerusalem as a woman.

"Strong hold" names a fortified place built for real protection.

Jerusalem is pictured here as both a watchtower and a fortress at once.

🐑 Tower of the flock was a shepherd's post

👩 Daughter of Zion personifies Jerusalem

🏰 Strong hold means a fortified place

📖 Jerusalem is pictured as watchtower and fortress
---
## 👑 The Kingdom Shall Come To The Daughter Of Jerusalem

"The first dominion" names the kingdom's original glory, the kind of rule Israel had under David.

That same authority is promised to return, not a lesser replacement for it.

The city that lost its king gets its kingdom handed back.

This promise sets up the question asked just two verses later, why is there no king now.

👑 First dominion means the original Davidic glory

🔁 The same authority is promised back

🏙️ Jerusalem regains its kingdom

📖 This sets up the next question asked
# Micah 4:9-13
# 🌾 Pain Now, Threshing Later
---
## 👑 Is There No King In Thee?

This question exposes a real crisis, not a rhetorical flourish.

Judah's monarchy was collapsing or already gone by the time this is asked.

A king provided leadership, protection, and a visible sign of God's covenant with David.

Losing one meant losing all three at once.

👑 This question names a real crisis

🏛️ The king gave leadership and protection

🤝 Kings signaled God's covenant with David

📖 Losing the king meant losing all three
---
## 🧠 Is Thy Counsellor Perished?

A "counsellor" was a trusted royal advisor who guided the king's decisions.

Losing the counsellor alongside the king means losing wise guidance at every level.

The question pictures total leadership collapse, not just one empty throne.

Nobody is left who knows what to do next.

🧠 Counsellor means a trusted royal advisor

🏛️ Wise guidance is gone at every level

💥 This pictures total leadership collapse

📖 Nobody is left who knows what to do
---
## 🤰 Pangs Have Taken Thee As A Woman In Travail

"Travail" is the old word for labor pain during childbirth.

It is intense, unavoidable, and a sign that something is about to happen.

Micah uses it to describe the sharp, forced crisis facing Jerusalem.

Pain like this cannot be ignored or delayed.

🤰 Travail means labor pain in childbirth

⏰ It signals something about to happen

😖 Jerusalem faces this same sharp crisis

📖 Pain this intense cannot be ignored
---
## 🏙️ Shalt Thou Go Forth Out Of The City, And Thou Shalt Dwell In The Field

Leaving the city for open fields meant losing walls, shelter, and protection.

This pictures the siege and exile Jerusalem's people were about to face.

The field was not a retreat to safety.

It was exposure to real danger outside the city's defenses.

🏙️ Leaving the city meant losing protection

🌾 The open field offered no shelter

⚠️ This pictures siege and exile ahead

📖 The field was exposure not safety
---
## ⏳ Thou Shalt Go Even To Babylon

In Micah's own lifetime, Assyria was the major threat, not Babylon.

Babylon did not conquer Jerusalem until more than a century later.

Naming Babylon by name here is a striking, specific prediction ahead of its time.

The exile would come from a direction nobody expected yet.

⏳ Assyria, not Babylon, threatened in Micah's time

🔮 Babylon rose to power a century later

🎯 This names the threat before it existed

📖 The real danger came from an unexpected place
---
## 💰 There The LORD Shall Redeem Thee From The Hand Of Thine Enemies

"Redeem" means to buy back or rescue someone from captivity.

The promise of rescue is given before the exile even begins.

God names Babylon as the place of exile and the place of future redemption in the same breath.

Judgment and rescue are not opposites here.

💰 Redeem means to buy back or rescue

📍 Rescue is promised before exile begins

🔄 Babylon holds both judgment and rescue

📖 Judgment and mercy arrive together here
---
## ⚔️ Many Nations Are Gathered Against Thee

This describes a real military coalition forming against Jerusalem.

Multiple enemy nations joining together made the threat far more dangerous.

Chapter four opened with nations streaming to Zion in peace.

Now, within the same chapter, nations gather against Zion for war.

⚔️ Nations gathered as a real coalition

💪 Multiple enemies made the threat worse

🔄 This chapter opened with peaceful nations

📖 The same chapter now shows nations at war
---
## 🚫 Let Her Be Defiled

"Defiled" means made unclean or disgraced, often through violence or desecration.

The enemy coalition wants more than military victory.

They want Zion humiliated and stripped of its holiness.

This is an attack aimed at identity, not just territory.

🚫 Defiled means made unclean or disgraced

👁️ Enemies want more than a military win

💔 They want Zion's holiness stripped away

📖 This attack targets identity not land
---
## 👁️ They Know Not The Thoughts Of The LORD, Neither Understand They His Counsel

The enemy nations see only their own plan, a coalition gathering for an easy win.

They do not see the much larger plan God is running underneath their own.

Their gathering against Zion is actually the means God uses to judge them.

Confidence built on a wrong read of the situation is no real confidence at all.

👁️ Enemies see only their own plan

🎯 God runs a larger plan underneath

⚖️ Their own gathering becomes their judgment

📖 Wrong confidence is not real confidence
---
## 🌾 He Shall Gather Them As The Sheaves Into The Floor

A "threshing floor" was a flat, hard surface where cut grain was beaten to separate it.

"Sheaves" are bundled stalks of grain gathered for exactly this process.

The enemies think they are the ones doing the gathering.

Instead, God is the one gathering them, straight toward their own destruction.

🌾 Threshing floor was where grain was beaten

🌿 Sheaves means bundled stalks of grain

🔄 The gatherers become the ones gathered

📖 God gathers them toward their own defeat
---
## 🔄 Arise And Thresh, O Daughter Of Zion

Zion shifts from victim to the one doing the threshing in this verse.

Threshing meant beating grain hard enough to separate it from the useless husk.

The nation under attack becomes the instrument God uses to judge the attackers.

This reversal is the whole point of the chapter's ending.

🔄 Zion shifts from victim to actor

🌾 Threshing beats grain free of husk

⚔️ Zion becomes the instrument of judgment

📖 This reversal closes out the chapter
---
## 🐂 I Will Make Thine Horn Iron, And I Will Make Thy Hoofs Brass

"Horn" and "hoofs" describe Zion as a powerful threshing ox.

Iron and brass were the strongest metals available at the time.

A real ox threshes grain by trampling it underfoot again and again.

God is equipping Zion with unmatched strength for this exact task.

🐂 Horn and hoofs picture Zion as an ox

⚙️ Iron and brass were the strongest metals

🦶 Oxen thresh grain by trampling it

📖 God equips Zion with unmatched strength
---
## 🙏 I Will Consecrate Their Gain Unto The LORD, And Their Substance Unto The Lord Of The Whole Earth

"Consecrate" means to formally set apart something for God's own use.

Armies normally kept their own plunder after a victory like this one.

Zion's winnings go in a different direction entirely, straight to God.

The text shifts here from LORD in full capitals to Lord in regular capitals.

That shift marks two different Hebrew titles for the same God.

The victory was never about Zion gaining wealth for itself.

🙏 Consecrate means set apart for God

📜 LORD shifts to Lord in this verse

🔄 Zion's winnings go to God instead

📖 The victory was never about Zion's gain
`.trim();

export const MICAH_FOUR_PERSONAL_SECTIONS = parseMicahFourRawNotes(MICAH_FOUR_RAW_NOTES);
