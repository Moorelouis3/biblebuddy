export type IsaiahNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahNineteenRawNotes(rawText: string): IsaiahNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 19:${startVerse}` : `Isaiah 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 19 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_NINETEEN_RAW_NOTES = `# Isaiah 19:1-4
# ⛈️ The LORD Enters Egypt In Judgment
---
## 📜 The Burden Of Egypt

A "burden" in the Old Testament does not mean a heavy object to carry.

It means a message of coming judgment spoken against a nation.

Isaiah uses this same word to open oracles against Babylon, Moab, and Damascus.

Egypt now receives one of its own.

This chapter answers what happens when the true God turns against a mighty empire.

📜 Burden means a judgment oracle
🌍 Isaiah gave burdens to many nations
🏛️ Egypt now receives its own
📖 This chapter shows what happens next

---
## ☁️ The LORD Rideth Upon A Swift Cloud

Ancient peoples near Egypt pictured their storm gods riding on clouds.

Baal, a Canaanite god, was often described the same way in ancient poetry.

Isaiah takes that familiar picture and gives it to the true God instead.

It is the real LORD who rides the storm, not any pagan deity.

A swift cloud shows speed and power arriving without warning.

Egypt is about to learn who actually controls the sky.

☁️ Storm gods were pictured riding clouds
⚡ Isaiah gives that image to the LORD
🌬️ Swift shows sudden, unstoppable power
📖 The true God controls the sky

---
## 🐂 The Idols Of Egypt Shall Be Moved At His Presence

Egypt worshiped dozens of gods tied to nature and animals.

Hapi was the god believed to control the Nile flood.

Apis was a sacred bull worshiped as a living god in Memphis.

Osiris and Isis ruled over death and the afterlife in Egyptian belief.

None of these gods can stand when the real LORD arrives.

Moved pictures statues shaking or toppling, powerless before Him.

🐂 Apis was a sacred bull god
🌊 Hapi ruled over the Nile flood
⚱️ Osiris and Isis ruled the afterlife
📖 None of them can stand before the LORD

---
## ❤️ The Heart Of Egypt Shall Melt In The Midst Of It

The heart in Hebrew thought was the seat of courage, not just emotion.

Melt is a common Old Testament picture for confidence draining away completely.

Soldiers whose hearts melted could no longer stand and fight.

Egypt's famous strength and pride are about to collapse from the inside.

No enemy army has even arrived yet.

The fear itself is the first blow.

❤️ Heart meant courage, not just feeling
💧 Melt pictures confidence draining away
🛡️ Soldiers with melted hearts cannot fight
📖 Fear itself strikes before battle begins

---
## ⚔️ I Will Set The Egyptians Against The Egyptians

God announces that He will cause Egypt to fight itself.

This is not a foreign invasion at first.

Brother against brother and neighbor against neighbor describes families turning on each other.

Egypt's long history included real periods of civil war between rival regions.

A kingdom that cannot unite against itself cannot stand against an outside enemy either.

⚔️ God causes Egypt to fight itself
🏘️ Brother turns against brother and neighbor
📚 Egypt had real periods of civil war
📖 A divided kingdom cannot stand against outsiders

---
## 🗺️ City Against City, And Kingdom Against Kingdom

Egypt was not always one single unified nation.

It was regularly divided into competing regional powers.

Kingdom against kingdom may point to exactly that kind of internal split.

Rival rulers in the Nile delta and in the south often struggled for control.

This prophecy pictures that old pattern of division breaking out again.

🗺️ Egypt was often split into regions
👑 Rival rulers competed for control
🌊 North and south often struggled apart
📖 Old patterns of division return again

---
## 💨 The Spirit Of Egypt Shall Fail, And I Will Destroy The Counsel Thereof

Spirit here means courage and resolve, the will to keep going.

Counsel means the wise advice and planning of Egypt's leaders.

Both are about to collapse at the same time.

A nation cannot function without either its courage or its wisdom.

God is not just defeating Egypt from outside.

He is taking away what Egypt needs to defend itself at all.

💨 Spirit means courage and resolve
🧠 Counsel means the leaders' wise planning
⚖️ Both collapse together, not one alone
📖 Egypt loses what it needs to survive

---
## 🔮 To The Idols, And To The Charmers, And To Them That Have Familiar Spirits, And To The Wizards

Charmers means people who claimed to cast magic spells.

Familiar spirits means mediums who claimed to speak with the spirits of the dead.

Wizards means fortune tellers who claimed hidden, secret knowledge.

Egypt was famous throughout the ancient world for this kind of occult practice.

When real trouble comes, panicked people run to whatever seems to offer answers.

None of it will be able to help them now.

🔮 Charmers claimed to cast spells
👻 Familiar spirits claimed contact with the dead
🧙 Wizards claimed hidden secret knowledge
📖 None of it can help them now

---
## ✋ The Egyptians Will I Give Over Into The Hand Of A Cruel Lord

God says He will hand Egypt over to a harsh ruler.

This did not stay just a threat.

Within about a century of this prophecy, Assyria's king Esarhaddon conquered Egypt.

Later, Egypt fell under other foreign powers as well.

A nation that trusted in its own strength ended up ruled by outsiders.

✋ God hands Egypt to a harsh ruler
⚔️ Assyria later conquered Egypt for real
🏛️ Other foreign powers ruled Egypt after
📖 Egypt's own strength could not save it

---
## 👑 A Fierce King Shall Rule Over Them, Saith The LORD Of Hosts

LORD of hosts is a title for God as commander over heaven's armies.

It names Him as more powerful than any human king or empire.

The word saith marks this as God's own direct promise, not Isaiah's guess.

A fierce foreign king ruling Egypt is not an accident of history.

It happens because the LORD of hosts decided it would.

👑 LORD of hosts names God as commander
📯 He outranks every human king
🗣️ Saith marks this as God's own word
📖 History unfolds because the LORD decided it

# Isaiah 19:5-10
# 🌊 The Nile Itself Turns Against Egypt
---
## 🌊 The Waters Shall Fail From The Sea

Egyptian writers sometimes called the wide Nile River a sea because of its size.

The whole nation depended completely on that one river for survival.

Fail means the water simply stops behaving the way it always had.

Egypt without a flowing, flooding Nile is nearly a contradiction in terms.

The very thing that made Egypt possible is about to break down.

🌊 The sea here means the Nile
🏞️ Egypt depended completely on this river
💧 Fail means the water stops behaving normally
📖 The source of Egypt's life breaks down

---
## 🏜️ The River Shall Be Wasted And Dried Up

Egypt's entire farming system relied on the Nile's yearly flood.

That flood deposited rich soil across the fields every single year.

Wasted and dried up pictures that cycle simply stopping.

No flood means no new soil and no harvest the following year.

A dried Nile was not a small inconvenience.

It meant famine across the whole nation.

🌾 The Nile's flood fed Egypt's farms
🏜️ Wasted and dried up means the cycle stops
🍞 No flood eventually means no harvest
📖 A dried Nile meant famine for Egypt

---
## 🚧 They Shall Turn The Rivers Far Away

Egypt built canals and channels to spread Nile water across the land.

Turn the rivers far away pictures those channels running dry or abandoned.

Brooks of defence likely means protective waterways used near fortified cities.

Even engineered water systems could not survive this judgment.

Human planning could not outlast what God was doing to the river itself.

🚧 Egypt built canals across the land
🏰 Brooks of defence protected fortified cities
🛠️ Even engineered systems could not survive
📖 Human planning could not outlast this judgment

---
## 🌾 The Reeds And Flags Shall Wither

Reeds and flags are both water loving plants that grew thick along the Nile.

They needed constant moisture to stay green and alive.

Once the water disappeared, these plants died first and fastest.

Withered reeds were an early, visible sign that something was deeply wrong.

Anyone walking the riverbank could see the judgment before it reached the cities.

🌾 Reeds and flags needed constant water
🥀 They died first once water vanished
👀 Withering plants were an early warning sign
📖 Judgment was visible before it reached cities

---
## 📜 The Paper Reeds By The Brooks

Paper reeds means papyrus, a tall plant that grew thick along the Nile.

Egyptians pounded and pressed papyrus stems into sheets used for writing.

The English word paper actually comes from this same plant's name.

Papyrus was also woven into the light boats mentioned in the chapter before this one.

Even this famous, useful plant could not survive without water.

📜 Paper reeds means papyrus plant
✍️ Egyptians made writing sheets from it
🛶 The same plant built light boats
📖 Even papyrus could not survive without water

---
## 🌱 Every Thing Sown By The Brooks Shall Wither, Be Driven Away, And Be No More

Egyptian farmers planted crops directly along the banks where the Nile watered them.

Sown means planted seed, the entire food supply for the coming year.

Three separate verbs pile up here, wither, be driven away, be no more.

That kind of repetition in Hebrew poetry signals total, complete destruction.

This is not a partial bad harvest.

It is the whole food system collapsing at once.

🌱 Sown means the planted food crop
📉 Three verbs pile up for emphasis
🍽️ This pictures total food system collapse
📖 Not a bad year, a total collapse

---
## 🎣 The Fishers Also Shall Mourn

The Nile supported a major fishing industry that fed much of Egypt.

Cast angle means fishing with a hook and line.

Spreading nets across the water was another common fishing method.

Both kinds of fishermen appear here, covering the whole industry.

When the river dies, every fisherman's livelihood dies with it.

🎣 Cast angle means hook and line fishing
🕸️ Nets covered a different fishing method
🐟 The Nile fed a huge fishing industry
📖 A dead river ends every livelihood at once

---
## 🌿 They That Work In Fine Flax

Flax is a plant grown to make linen thread and cloth.

Egypt was famous across the ancient world for high quality linen.

Growing flax required steady irrigation from the same failing river.

Confounded means left ashamed and unable to do their work.

An entire skilled trade collapses along with the water that fed it.

🌿 Flax was grown to make linen
🧵 Egypt was famous for fine linen
😔 Confounded means ashamed and unable to work
📖 A whole trade collapses with the river

---
## 🧶 They That Weave Networks Shall Be Confounded

Networks here does not mean computer systems or connections.

It means woven cloth, checkered or netted linen fabric made from flax thread.

Egyptian weavers turned raw flax into some of the finest cloth in the ancient world.

This verse names two connected trades, growers and weavers, both ruined together.

An entire supply chain breaks down from the first stage to the last.

🧶 Networks means woven checkered cloth
🪢 Weavers turned flax into fine cloth
🔗 Growers and weavers are named together
📖 The whole supply chain breaks down

---
## 🚪 All That Make Sluices And Ponds For Fish

Sluices were manmade gates used to control water flow into ponds.

These ponds were built to raise fish for food, an early form of fish farming.

Broken in the purposes thereof means their whole business plan collapses.

Even carefully engineered systems built to outlast a dry season could not survive this.

The judgment reaches every level of Egypt's economy, from farmers to fish farmers.

🚪 Sluices were gates controlling water flow
🐠 Ponds raised fish as an early farm
📉 Broken in purpose means the plan fails
📖 Judgment reaches every level of the economy

# Isaiah 19:11-15
# 🏛️ The Wisdom Of Egypt Fails
---
## 🏛️ The Princes Of Zoan Are Fools

Zoan was an ancient Egyptian city in the Nile delta, also called Tanis.

It served as a royal city and center of government at different points in Egypt's history.

Calling its princes fools is a direct insult to Egypt's own ruling class.

Egypt prided itself on wisdom, praised for centuries across the ancient world.

That reputation is about to be publicly overturned.

🏛️ Zoan was a royal Egyptian city
👑 Its princes ruled from that city
🧠 Egypt was famous for its wisdom
📖 That reputation is about to be overturned

---
## 🐂 The Counsel Of The Wise Counsellors Of Pharaoh Is Become Brutish

Brutish means acting without sense, like an animal instead of a person.

Pharaoh's advisers were trained specifically to give wise, careful counsel.

Isaiah says that training has completely failed them.

The very people paid to think clearly can no longer think clearly at all.

God is the one causing this confusion, as later verses make plain.

🐂 Brutish means acting without sense
🎓 These advisers were trained for wisdom
🌀 Their training has completely failed
📖 God is the one causing the confusion

---
## 👑 I Am The Son Of The Wise, The Son Of Ancient Kings

Egyptian nobles took pride in claiming descent from famous wise men and old royal lines.

This kind of boast was a matter of public status and honor.

Isaiah pictures Pharaoh's own advisers no longer able to live up to that claim.

A proud family history means nothing once the wisdom itself is gone.

Isaiah's question is sharp on purpose.

He wants Egypt to feel the gap between its claim and its reality.

👑 Nobles claimed descent from wise ancestors
🏺 This boast was about status and honor
📉 A proud past cannot replace present wisdom
📖 Isaiah wants Egypt to feel that gap

---
## 🔁 Where Are They, Where Are Thy Wise Men

Isaiah repeats the question where twice for emphasis.

This is a direct challenge, daring Egypt's wise men to prove themselves.

If their wisdom were real, they could explain what God is about to do.

They cannot, because their wisdom was never able to reach that far.

Human wisdom has a limit that God's plans simply do not share.

🔁 Where is repeated twice for emphasis
🎯 This is a direct challenge to Egypt
🚧 Human wisdom cannot reach this far
📖 God's plans go beyond human limits

---
## 🏛️ The Princes Of Noph Are Deceived

Noph is another name for Memphis, one of ancient Egypt's most important capital cities.

Memphis sat near the head of the Nile delta, a center of religion and government.

Naming both Zoan and Noph covers Egypt's leadership from two of its major centers.

Deceived means these leaders are fooled, not just foolish on their own.

Something outside them is clouding their judgment, as the next verse explains.

🏛️ Noph is another name for Memphis
🕌 Memphis was a major religious center
🗺️ Two cities cover Egypt's whole leadership
📖 Something outside them clouds their judgment

---
## 🏗️ The Stay Of The Tribes Thereof

Stay means support, like a pillar holding up a building.

These leaders were supposed to be the pillars supporting Egypt's tribes and regions.

Instead of holding the nation steady, they have led it astray.

Seduced means they talked Egypt into trusting something false.

A pillar that leads the building astray is worse than no pillar at all.

🏗️ Stay means a supporting pillar
🇪🇬 Leaders were meant to support the tribes
🌀 Seduced means led into something false
📖 A failed pillar is worse than none

---
## 🌀 The LORD Hath Mingled A Perverse Spirit

Mingled means mixed in, like pouring something into a container already in use.

Perverse spirit means a spirit of confusion and twisted judgment.

This is not Egypt losing its wisdom by accident.

The LORD Himself is the one mixing in this confusion as judgment.

This matches a pattern seen elsewhere in scripture, God handing people over to their own bad choices.

🌀 Mingled means mixed in on purpose
🧠 Perverse spirit means twisted judgment
✋ God Himself causes this confusion
📖 This matches a pattern seen elsewhere

---
## 🍷 As A Drunken Man Staggereth In His Vomit

This is one of the most vivid, humiliating pictures in the whole chapter.

A drunk man cannot walk straight and cannot even avoid his own sickness.

Egypt's leadership is pictured exactly that way, out of control and disgraced.

Every decision they make from here only makes things worse.

Great, proud Egypt is reduced to this one degrading image.

🍷 A drunk man cannot walk straight
🤢 He cannot even avoid his own sickness
📉 Egypt's leaders are pictured the same way
📖 Proud Egypt is reduced to this image

---
## 🐍 Which The Head Or Tail, Branch Or Rush, May Do

This is a Hebrew idiom for every level of society, top to bottom.

Head pictures the leaders, tail pictures the lowest workers.

Branch pictures the powerful, rush pictures the weak and small.

Isaiah uses this exact same pairing again later in chapter nine.

No one in Egypt, from the highest ruler to the poorest worker, can fix this.

🐍 Head and tail means leaders and lowest
🌿 Branch and rush means powerful and weak
🔁 Isaiah reuses this pairing in chapter nine
📖 No one in Egypt can fix this

# Isaiah 19:16-17
# 😨 Egypt Trembles Before Judah
---
## 😨 Egypt Shall Be Like Unto Women

In this ancient culture, open combat was seen as men's role.

Comparing Egypt to women here is about lost strength in a fight, not personal worth.

The point is that Egypt will be as powerless to fight back as a civilian army.

This kind of comparison shows up elsewhere in the Old Testament for a defeated army.

Isaiah is describing complete panic, not making a statement about anyone's character.

⚔️ Warfare was seen as men's role then
🏳️ The point is lost strength, not worth
😱 Egypt becomes powerless like a civilian army
📖 This pictures total panic, not character

---
## ✋ The Shaking Of The Hand Of The LORD Of Hosts

A raised, shaking hand in scripture pictures God about to strike in judgment.

This is the same LORD of hosts named earlier in this chapter.

Egypt spent this whole chapter trusting idols, wise men, and its own strength.

None of those could shake like this hand is about to shake.

The real threat was never a human army.

It was God's own hand raised against them.

✋ A shaking hand pictures coming judgment
👑 This is the same LORD of hosts
🛡️ Idols and wise men could not compare
📖 God's hand was the real threat all along

---
## 🇮🇱 The Land Of Judah Shall Be A Terror Unto Egypt

Judah was a small kingdom compared to the ancient superpower of Egypt.

This verse pictures a total reversal of the normal balance of power.

Mighty Egypt becomes afraid of a nation it would usually never fear.

The fear has nothing to do with Judah's army or size.

It has everything to do with the God Judah belongs to.

🇪🇬 Egypt was the ancient superpower
🇮🇱 Judah was small by comparison
🔁 This verse reverses the normal balance
📖 The fear is really about Judah's God

---
## 📌 The Counsel Of The LORD Of Hosts, Which He Hath Determined Against It

Determined means already decided, not merely threatened or possible.

Everything in this chapter, the civil war, the dried Nile, the confused leaders, traces back to one decision.

God's plan is called counsel here, the same word used for Pharaoh's failed advisers earlier.

Egypt's counsel failed completely.

God's counsel, by contrast, cannot fail or be talked out of happening.

📌 Determined means already decided for certain
🔗 Every judgment in this chapter traces back here
⚖️ Counsel here echoes Pharaoh's failed advisers
📖 God's counsel cannot fail like theirs did

# Isaiah 19:18-22
# 🕊️ Egypt Turns To Worship The LORD
---
## 🗣️ Five Cities In The Land Of Egypt Speak The Language Of Canaan

The language of Canaan means Hebrew, the language spoken in Judah.

Egyptian cities speaking Hebrew and swearing loyalty to the LORD would have shocked the first hearers.

This pictures Egyptians converting, not simply Judah surviving as a nation.

The number five is not necessarily exact.

It may simply mean a meaningful group of cities.

A chapter that began with Egypt's downfall now turns toward Egypt's worship.

🗣️ Language of Canaan means Hebrew
🇪🇬 Egyptian cities would speak Judah's language
🙏 This pictures Egyptians turning to worship
📖 The chapter turns from downfall to worship

---
## 📜 One Shall Be Called, The City Of Destruction

Ancient Hebrew manuscripts do not all agree on this exact phrase.

Some copies read the city of destruction.

Others read the city of the sun instead.

The two Hebrew words look almost identical, differing by a single letter.

City of the sun likely points to Heliopolis, an Egyptian city built around sun worship.

Either reading fits this chapter, an old center of pagan worship being renamed or overturned.

📜 Manuscripts differ by a single letter
☀️ One reading points to Heliopolis
💥 The other reading means city of destruction
📖 Either way, worship in that city changes

---
## 🔥 An Altar To The LORD In The Midst Of The Land Of Egypt

An altar was the physical place where sacrifices and worship happened.

Under the law, Israel's altars belonged in the land God gave them, centered on Jerusalem.

An altar to the LORD inside Egypt itself is a strikingly unusual picture.

It shows true worship of God spreading beyond Israel's own borders entirely.

This is one of the clearest Old Testament pictures of worship reaching the nations.

🔥 An altar was the place of sacrifice
🇮🇱 Israel's worship was normally centered on Jerusalem
🌍 This altar sits inside Egypt instead
📖 True worship reaches beyond Israel's borders

---
## 🗿 A Pillar At The Border Thereof To The LORD

A pillar was a standing stone set up to mark and remember something important.

Placing one at Egypt's border works like a boundary marker and a public witness.

Anyone entering or leaving Egypt would see this open sign of devotion to the LORD.

Both the altar and the pillar mark Egypt as belonging to God in some way.

The nation that once enslaved Israel now marks its own land for God's worship.

🗿 A pillar was a standing memorial stone
🚩 It marked Egypt's border as a witness
👀 Travelers would see this public devotion
📖 Egypt's own land now points to God

---
## 🪧 For A Sign And For A Witness Unto The LORD Of Hosts

A sign points to something true, and a witness testifies to it publicly.

The altar and pillar from the verse before now get a stated purpose.

They exist to permanently announce that Egypt belongs to the LORD of hosts.

This is not a private, hidden devotion.

It is meant to be seen and remembered for a long time.

🪧 A sign points to something true
🗣️ A witness testifies publicly to it
⏳ This devotion is meant to last
📖 Egypt's worship is meant to be seen

---
## 📢 They Shall Cry Unto The LORD Because Of The Oppressors, And He Shall Send Them A Saviour

Egypt will face oppressors of its own and will finally cry out to the LORD for help.

This mirrors Israel's own story, crying out to God under oppression in Egypt long before.

Saviour here means a deliverer, someone raised up to rescue a nation from trouble.

The nation that once oppressed Israel now receives the same kind of rescue Israel once needed.

God's pattern of hearing a cry for help is not limited to His original people.

📢 Egypt cries out under its own oppressors
🔁 This mirrors Israel's own story in Egypt
🦸 A saviour means a raised up deliverer
📖 God's rescue is not limited to Israel

---
## 🤝 The LORD Shall Be Known To Egypt

Known here means far more than simply hearing facts about God.

In Hebrew thought, to know someone often meant a real, personal relationship.

Egypt worshiped many gods throughout its history without truly knowing the real one.

This verse pictures that finally changing, for the nation as a whole.

Knowledge of God moves from Israel outward to a former enemy.

🤝 Known means real relationship, not just facts
🇪🇬 Egypt worshiped many gods but not this one
🔁 This verse pictures that finally changing
📖 Knowledge of God spreads to a former enemy

---
## 🐑 They Shall Do Sacrifice And Oblation, Yea, They Shall Vow A Vow

Sacrifice and oblation name two kinds of offerings, animal and grain, used in worship.

Egyptians bringing both shows a full, genuine adoption of worship toward the LORD.

To vow a vow means making a serious, binding promise to God.

The phrase is doubled in Hebrew style for emphasis, showing how seriously it is meant.

And perform it matters just as much as the vow itself.

A promise to God that is kept, not just spoken.

🐑 Sacrifice and oblation cover two offering types
🙏 A vow was a serious binding promise
🔁 Doubling the word shows how serious it is
📖 The vow is kept, not just spoken

---
## ✋ He Shall Smite And Heal It

Smite means to strike hard, the same judgment described throughout this chapter.

Pairing smite with heal in the very same verse is not a contradiction.

God's judgment throughout scripture often aims at bringing a nation back, not simply destroying it.

The dried Nile, the civil war, and the confused leaders were the smiting.

The altar, the worship, and the vow are the healing that follows.

✋ Smite means to strike hard in judgment
💚 Heal follows the smiting in the same verse
🔄 Judgment here aims at return, not ruin
📖 The whole chapter moves from smiting to healing

---
## 🙏 He Shall Be Intreated Of Them, And Shall Heal Them

Intreated means persuaded or moved to respond, the same word used for prayer being heard.

Egypt's cry for help back in the earlier verse is answered here directly.

God does not stay distant after judging Egypt.

He responds to their turning back the same way He responds to Israel's.

The chapter closes this section by treating Egypt like a genuine part of God's story.

🙏 Intreated means God is moved to respond
📢 This answers Egypt's earlier cry for help
🤲 God responds the way He does to Israel
📖 Egypt becomes a real part of God's story

# Isaiah 19:23-25
# 🛣️ A Highway Joins Egypt And Assyria
---
## 🛣️ There Shall Be A Highway Out Of Egypt To Assyria

Egypt and Assyria were two of the greatest powers of the ancient world.

For most of Isaiah's lifetime, they were bitter rivals and enemies.

A highway pictures safe, open travel between two places that once feared each other.

This kind of peaceful road between longtime enemies would have sounded almost impossible.

Isaiah pictures a future where old hostility no longer controls the relationship.

🛣️ A highway means safe, open travel
⚔️ Egypt and Assyria were longtime rivals
🕊️ This pictures old hostility ending
📖 An impossible sounding peace becomes real

---
## 🤝 The Egyptians Shall Serve With The Assyrians

Serve here does not necessarily mean slavery or conquest.

It can describe worshiping together or working alongside one another as equals.

Two nations that spent generations fighting are pictured standing side by side.

This reverses everything the rest of the chapter has described.

Judgment on Egypt does not end in ruin.

It ends in partnership instead.

🤝 Serve here can mean working together
⚖️ Old enemies are pictured as equals
🔄 This reverses the chapter's earlier judgment
📖 Judgment ends in partnership, not ruin

---
## ⚖️ Israel Shall Be The Third With Egypt And With Assyria

Israel was the smallest of these three nations by far.

Yet here Israel stands as an equal third alongside two ancient superpowers.

This is a remarkable reversal of how the ancient world usually ranked nations.

Israel's importance was never really about size or military strength.

Its role was always to carry God's blessing to the nations around it.

🇮🇱 Israel was the smallest of the three
⚖️ Here it stands as an equal third
📏 Size was never Israel's real importance
📖 Its role was carrying blessing to others

---
## 🌍 A Blessing In The Midst Of The Land

God promised Abraham that all nations would be blessed through his family.

This verse pictures that ancient promise finally reaching Egypt and Assyria directly.

In the midst of the land means this blessing sits at the center, not off to the side.

Two former enemies of Israel become carriers of the same blessing Israel carries.

The promise made to one man in Genesis reaches an entire region here.

📜 God promised Abraham blessing for all nations
🎯 This promise now reaches Egypt and Assyria
🌍 The blessing sits at the center
📖 One promise now reaches a whole region

---
## 🏷️ Blessed Be Egypt My People

My people is a title used throughout scripture almost exclusively for Israel.

Hearing God apply it to Egypt here is startling on purpose.

The nation that once enslaved Israel is now called God's own people.

This is the clearest sign in the whole chapter that judgment was never the end goal.

Egypt is not just spared.

Egypt is adopted.

🏷️ My people was normally Israel's title
😮 Hearing it for Egypt is startling
⛓️ Egypt once enslaved Israel, now this
📖 Egypt is not spared, Egypt is adopted

---
## 🏺 Assyria The Work Of My Hands, And Israel Mine Inheritance

Three nations receive three different titles in this one closing verse.

Egypt is called my people, Assyria is called the work of my hands.

Israel keeps its original title, mine inheritance, the nation God chose first.

Each title is real and none of them cancels out the others.

The chapter that opened with Egypt's idols melting ends with nations sharing God's blessing together.

🏺 Assyria is called the work of God's hands
👑 Israel keeps its title, God's inheritance
🔗 Three nations, three titles, one blessing
📖 The chapter ends in shared blessing, not ruin
`.trim();

export const ISAIAH_NINETEEN_PERSONAL_SECTIONS = parseIsaiahNineteenRawNotes(ISAIAH_NINETEEN_RAW_NOTES);
