export type IsaiahFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyOneRawNotes(rawText: string): IsaiahFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 41:${startVerse}` : `Isaiah 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Isaiah 41 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_ONE_RAW_NOTES = `# Isaiah 41:1-4
# ⚖️ God Summons The Nations To Court
---
## 🏝️ Keep Silence Before Me, O Islands

"Islands" does not mean small landmasses out in the ocean.

It refers to distant coastlands and nations far from Israel.

God pictures himself opening a courtroom and calling it to order.

Keep silence means stop arguing long enough to actually listen.

This chapter opens like a trial, not a casual conversation.

🏝️ Islands means distant coastlands and nations
⚖️ God pictures a courtroom opening
🤫 Silence means stop arguing and listen
📖 This chapter opens as a trial

## 💪 Let The People Renew Their Strength

This does not mean the same renewed strength promised back in chapter forty.

There, waiting on the LORD gave tired people fresh energy.

Here, God is challenging the nations to gather their best case.

Renew their strength means come forward with your strongest arguments ready.

This is a legal challenge, not a spiritual promise.

🔁 Not the same promise as chapter forty
💪 There it meant fresh energy from God
⚖️ Here it means bring your strongest case
📖 A legal challenge, not a spiritual promise

## 👑 Who Raised Up The Righteous Man From The East

This righteous man is a powerful king, not yet named.

Later chapters in Isaiah reveal him plainly as Cyrus.

Cyrus was the Persian king who would go on to conquer Babylon.

"From the east" points to Persia's location relative to Israel.

God claims full credit for raising up this foreign ruler.

👑 A powerful king, not yet named
🏛️ Isaiah later names him as Cyrus
🗺️ The east points to Persia's location
📖 God claims credit for raising him up

## 🏛️ Made Him Rule Over Kings

Cyrus did not simply win a single battle.

He built an empire that ruled over many other kings.

God says plainly that he is the one who caused this to happen.

A pagan king's whole rise still stayed under God's own control.

👑 Cyrus ruled over many other kings
🏛️ He built a whole empire
🙌 God says he caused this to happen
📖 A pagan king still answers to God

## 🗡️ He Gave Them As The Dust To His Sword

"Dust" and "driven stubble" both picture something weightless and easily scattered.

Cyrus's enemies fell before him as easily as dust falls before a blowing wind.

Stubble is the dry leftover stalks from a finished harvest.

A strong wind can carry stubble away without any real effort.

This pictures a conquest with almost no resistance at all.

💨 Dust pictures something weightless
🌾 Stubble means dry harvest stalks
🗡️ His enemies fell without real resistance
📖 God gave this an effortless conquest

## 🏃 He Pursued Them, And Passed Safely

Cyrus chased down his enemies and came through completely unharmed.

"The way that he had not gone with his feet" describes new, unfamiliar ground.

He advanced into territory no army of his had crossed before.

Nothing about that unfamiliar path slowed his advance at all.

🏃 Cyrus pursued his enemies safely
🗺️ He crossed ground never crossed before
🛡️ Unfamiliar territory did not slow him
📖 God's hand made the path safe

## ⏳ I The LORD, The First, And With The Last

God names himself as the one behind every event in this story.

"The first" means he already existed before history began.

"With the last" means he will still be present when history ends.

No king rises or falls outside of God's own timeline.

⏳ The first means before history began
🏁 The last means present at its end
👑 No king rises outside God's timeline
📖 God authors the whole story

# Isaiah 41:5-7
# 🔨 The Nations Build A False Security
---
## 😨 The Isles Saw It, And Feared

"It" refers to Cyrus's sudden rise to power just described.

News like that traveled fast across the ancient world.

Distant nations panicked at the thought of that kind of power on the move.

Fear like this often pushes people toward whatever feels safe, even if it is false.

📰 It refers to Cyrus's rise to power
🏝️ Distant nations heard the news fast
😨 Fear spread across the ancient world
📖 Fear pushed people toward false safety

## 🤝 Every One Said To His Brother, Be Of Good Courage

This encouragement sounds warm, but it is aimed at the wrong solution.

Instead of turning to God, frightened people turn to each other.

Together they decide to build something they can see and touch.

Real courage built on an idol is still no courage at all.

🤝 Neighbors encourage each other here
🙅 Not encouragement toward turning to God
🗿 Together they choose to build an idol
📖 Courage built on a lie is empty

## 🪵 So The Carpenter Encouraged The Goldsmith

Making an idol took several different skilled workers.

A carpenter shaped the wooden frame underneath.

A goldsmith covered the outside in gold to make it look impressive.

Each worker cheered the others on toward finishing a fake god.

🪵 A carpenter shaped the wooden frame
✨ A goldsmith covered it in gold
🤝 Workers encouraged each other's effort
📖 Skilled hands still cannot make a real god

## 🔧 It Is Ready For The Sodering

"Sodering" is an old spelling of soldering, joining metal pieces together with heat.

The hammer worker and the anvil worker both had to finish their part first.

Only once every piece was joined could the idol be called finished.

Careful teamwork went into building something that still had no life in it.

🔧 Sodering means joining metal with heat
🔨 Two different workers finished each part
🗿 The idol still had no real life
📖 Skill cannot put life into metal

## 🔨 Fastened It With Nails, That It Should Not Be Moved

Once assembled, the idol still needed to be nailed down.

A statue that can tip over or fall apart is not much of a god.

The nails were meant to stop the whole thing from moving on its own.

This same detail was already mocked back in chapter forty.

🔨 Nails kept the statue from falling
🗿 A nailed down god is a weak god
🔁 Chapter forty already mocked this detail
📖 A god that cannot stand needs help standing

# Isaiah 41:8-10
# 🤝 But Thou, Israel, Art My Servant
---
## 🔄 But Thou, Israel, Art My Servant

The word "but" marks a sharp turn from the panicked nations just described.

The nations scrambled to build a false god out of fear.

Israel instead gets a personal word straight from the real one.

"Servant" here means someone chosen for a purpose, not a slave with no value.

🔄 But marks a sharp turn in the scene
🗿 Nations built a false god in fear
🤝 Servant here means chosen for a purpose
📖 God speaks personally to his people

## 🌱 The Seed Of Abraham My Friend

"Seed" simply means descendants.

Abraham is remembered elsewhere in scripture as God's friend.

That same friendship God had with Abraham is now claimed for his descendants.

Being chosen here was never something Israel had to earn.

🌱 Seed means descendants
🤝 Abraham is remembered as God's friend
👪 That friendship extends to his descendants
📖 Being chosen was never earned

## 🌍 Taken From The Ends Of The Earth

This looks back at Israel scattered far away during the exile.

No distance was too far for God to still call his people home.

"Not cast thee away" answers the exiles' fear of being permanently abandoned.

That exact fear about being forgotten returns again later in this same chapter.

🌍 Points to Israel scattered in exile
🧭 No distance was too far for God
🙅 Not cast away answers their fear
📖 That same fear returns later in this chapter

## 💪 I Will Strengthen Thee, Yea, I Will Help Thee

God stacks three separate promises back to back here.

Strengthen means giving inner power to keep going.

Help means active support along the way.

Uphold with the right hand pictures a firm, steady grip.

The right hand already stood for power back in chapter forty.

💪 Strengthen means inner power to continue
🤝 Help means active support along the way
✋ Uphold pictures a steady, firm grip
📖 The right hand again pictures God's power

# Isaiah 41:11-13
# 🛡️ Enemies Who Strive With Thee
---
## 😳 Incensed Against Thee Shall Be Ashamed And Confounded

"Incensed" means filled with intense anger.

"Confounded" means left completely confused, with no way to answer back.

Enemies who rage against Israel will end up publicly humiliated instead.

Their anger will not actually get them what they wanted.

😠 Incensed means filled with anger
😳 Confounded means left utterly confused
🙅 Their anger will not succeed
📖 Rage against God's people backfires

## 🔍 Thou Shalt Seek Them, And Shalt Not Find Them

This is not describing a narrow military defeat.

It pictures enemies vanishing so completely that searching turns up nothing.

Their disappearance would be total, not partial.

A very similar fate already described the proud nations back in chapter forty.

🔍 Not just a narrow defeat
💨 Enemies vanish completely here
🙅 Searching for them finds nothing
📖 Total disappearance, not partial

## 💨 As Nothing, And As A Thing Of Nought

This exact vanity language already described the nations back in chapter forty.

There it applied to proud empires who trusted their own strength.

Here it applies specifically to whoever attacks God's people.

The same emptiness waits for anyone who chooses to oppose them.

🔁 Same language used in chapter forty
👑 There it described proud empires
⚔️ Here it targets Israel's attackers
📖 Opposing God's people ends in emptiness

## ✋ I The LORD Thy God Will Hold Thy Right Hand

This promise repeats almost word for word from verse ten.

Hebrew writers often repeated a promise like this to help it stick.

God is not just saying this once and moving on.

He wants Israel to hear this truth enough times to actually believe it.

🔁 Repeats the promise from verse ten
📣 Repetition helps a promise stick
✋ God holds Israel's hand again
📖 He wants this truth truly believed

# Isaiah 41:14-16
# 🌾 A Worm Becomes A Threshing Tool
---
## 🐛 Fear Not, Thou Worm Jacob

"Worm" pictures something small, weak, and easily crushed underfoot.

God is not insulting Israel with this word.

He is naming exactly how helpless they actually felt during the exile.

Calling them a worm makes the promise that follows even more surprising.

🐛 Worm pictures something small and weak
😔 This names how helpless they felt
🙅 God is not insulting them here
📖 It sets up a surprising promise

## 👪 Thy Redeemer, The Holy One Of Israel

A "redeemer" was a close relative with a legal duty to rescue family.

That relative could buy back land, cancel a debt, or free someone from slavery.

God takes on that same family role for Israel here.

"Holy One" names him as completely set apart from every idol just mocked.

👪 Redeemer means a rescuing relative
💰 That role covered debt and freedom
🤝 God takes on that same role
📖 Holy One sets him apart from idols

## 🌾 A New Sharp Threshing Instrument Having Teeth

A threshing instrument was a farm tool dragged over cut grain.

Sharp teeth or blades on the bottom separated grain from stalks.

God pictures turning the weak worm into that same kind of sharp tool.

The very thing that felt crushed now becomes the thing doing the crushing.

🌾 A threshing tool separated grain from stalks
🔪 Sharp teeth did the actual cutting
🐛 The weak worm becomes this tool
📖 The crushed becomes the one who crushes

## ⛰️ Thresh The Mountains, And Beat Them Small

Mountains here picture large, powerful obstacles or enemies.

Threshing a mountain down into dust is a deliberately impossible sounding image.

That is the whole point, God is promising the impossible for his people.

⛰️ Mountains picture large obstacles
🌾 Threshing pictures grinding something down small
🚫 The whole image sounds impossible
📖 God promises the impossible for Israel

## 🌬️ Fan Them, And The Wind Shall Carry Them Away

Winnowing was the ancient process of tossing cut grain into the air.

Wind blew away the light, worthless chaff that came loose.

The heavier, valuable grain fell back down and was kept.

Israel's enemies are pictured as that chaff, gone completely once the wind hits them.

🌬️ Winnowing tossed grain into the air
💨 Wind carried the worthless chaff away
🌾 Valuable grain stayed behind
📖 Enemies are pictured as that chaff

# Isaiah 41:17-20
# 🌳 Rivers In The Wilderness
---
## 🏜️ The Poor And Needy Seek Water

This pictures the real physical thirst exiles faced crossing the desert home.

"Tongue faileth for thirst" describes a mouth too dry to even speak.

God is not offering a vague spiritual comfort here.

He is promising to meet an actual physical need.

🏜️ Pictures real thirst on the journey home
👅 A dry tongue could barely speak
💧 God promises real physical help
📖 Not vague comfort, an actual need met

## 👂 I The LORD Will Hear Them

God answers the exiles' desperate cry directly.

"Forsake" means to abandon someone completely.

"Will not forsake them" answers the same fear named earlier in this chapter.

Being scattered far from home never actually meant being forgotten.

👂 God hears their desperate cry
🙅 Forsake means abandoned completely
🧭 Distance never meant being forgotten
📖 This answers the fear from earlier

## 🏞️ I Will Open Rivers In High Places

Water normally flows downhill and collects in low places.

This promise flips that picture completely, with rivers appearing in high places too.

The wilderness itself, usually the driest place around, gets filled with pools of water.

This is not ordinary rainfall, it pictures a deliberate reversal of nature.

🏞️ Water normally collects in low places
⛰️ This promise puts rivers up high
🏜️ Even the wilderness fills with pools
📖 A deliberate reversal of nature

## 🌲 The Cedar, The Shittah Tree, And The Myrtle

None of these trees grow naturally out in a desert.

"Shittah" is the acacia tree, the same wood later used to build the tabernacle.

Cedar, myrtle, fir, pine, and box trees all appear together in this list.

Planting all of them together pictures a desert slowly turning into a forest.

🌲 None of these trees grow in a desert
🪵 Shittah is the acacia tree
⛺ That same wood built the tabernacle
📖 A desert pictured turning into a forest

## 👀 That They May See, And Know, And Consider, And Understand

Four separate verbs are stacked together in a row here.

Hebrew poetry often repeats an idea like this for emphasis, not new information.

The miracle itself is not just kindness, it is meant as proof.

God wants this point to be impossible to miss.

🔁 Four verbs stacked for emphasis
🌳 The miracle proves something, not just helps
👀 God wants this impossible to miss
📖 The Holy One of Israel gets the credit

# Isaiah 41:21-24
# ❓ The Idols Are Put On Trial
---
## ⚖️ Produce Your Cause, Saith The LORD

The courtroom scene from verse one returns here.

"Produce your cause" means present your actual legal case.

God is not asking politely, he is issuing a real legal challenge.

This time the challenge is aimed straight at the idols.

⚖️ The courtroom scene returns here
📜 Produce your cause means present your case
🗿 The challenge targets the idols directly
📖 God issues a real legal demand

## 👑 The King Of Jacob

This title pairs an ordinary word, king, with Jacob's own covenant name.

It reminds the reader exactly who is judging this trial.

The one issuing the challenge is Israel's own God, not a stranger.

👑 King of Jacob names the judge here
🤝 Jacob is Israel's own covenant name
⚖️ Israel's own God runs this trial
📖 The judge is not a stranger

## 🧪 Shew The Former Things, What They Be

God proposes the first half of a simple, fair test.

Explaining the past accurately would be one way to prove real power.

Any idol claiming to be a god should manage at least this much.

🧪 God proposes the first half of a test
⏳ Explaining the past would prove real power
🗿 Any real god should manage this much
📖 The test starts with looking backward

## 🔮 Declare Us Things For To Come

This is the second half of the same test.

Predicting the future accurately would be the other clear proof of power.

This same test appears again and again throughout the book of Isaiah.

A real god should be able to manage at least one of the two.

🔮 The test's second half looks forward
📜 Isaiah repeats this same test often
🗿 A real god should pass one half
📖 History's true author alone can predict it

## 🗿 That We May Know That Ye Are Gods

Fulfilled prophecy is the actual proof God keeps pointing back to.

An idol carved by human hands cannot know the future.

Only the one who actually controls history can predict it accurately.

🔮 Fulfilled prophecy is the real proof
🗿 Idols cannot know the future
📜 Only history's true author can predict it
📖 Proof, not decoration, is the real test

## 😳 Do Good, Or Do Evil, That We May Be Dismayed

God widens the challenge to include literally anything at all.

Do something good or do something harmful, either one would count as proof.

Not one idol manages to do either thing on its own.

The dare itself exposes exactly how powerless these idols really are.

😳 The challenge widens to anything at all
🗿 Not one idol can do either
🎭 The dare exposes their powerlessness
📖 Total silence answers a wide open dare

## 🚫 An Abomination Is He That Chooseth You

"Abomination" is strong, specific Bible language for something God finds detestable.

This exact word appears throughout the Torah aimed directly at idol worship.

The trial ends here with a clear verdict on idols and their worshippers alike.

🚫 Abomination means something God detests
📜 The word targets idol worship specifically
⚖️ This is the trial's clear verdict
📖 Idols and worship of them both fail

# Isaiah 41:25-27
# 🗺️ God Names The Coming Conqueror Again
---
## 🔁 I Have Raised Up One From The North

This is the same ruler introduced back in verse two.

Persia's armies would approach Babylon from the north as well as the east.

God repeats the claim that he personally raised up this king.

Nothing about this conqueror's rise happens outside God's own plan.

🔁 Same ruler introduced back in verse two
🗺️ Persia's armies approached from the north
👑 God repeats that he raised him up
📖 Nothing here happens outside God's plan

## 🧱 Come Upon Princes As Upon Morter

"Morter" is a mixture of clay, straw, and water trampled by foot before building.

Workers walked over it again and again to make it soft enough to use.

This coming ruler will crush powerful princes just as easily as feet crush wet mortar.

🧱 Morter is a mixture trampled by foot
🦶 Feet made it soft enough to use
👑 Princes get crushed just as easily
📖 Total domination, pictured plainly

## 🏺 As The Potter Treadeth Clay

A potter often softened clay by walking on it with bare feet.

That process happened before the clay ever touched a wheel.

Pairing this with the mortar picture doubles the image of total, easy control.

🏺 A potter trampled clay to soften it
🦶 This happened before the wheel
🧱 It doubles the mortar image
📖 Total control, described two different ways

## 🤐 There Is None That Sheweth, Yea, There Is None That Declareth

This line answers the very challenge God issued back in verse twenty two.

No idol and no false prophet had ever managed to predict this ruler's rise.

That silence itself becomes part of the evidence against them.

🔁 Answers the challenge from verse twenty two
🗿 No idol predicted this ruler's rise
🤐 Their silence becomes evidence
📖 Real prophecy has one true source

## 🏙️ The First Shall Say To Zion, Behold, Behold Them

"Good tidings" already described Zion's own announcement back in chapter forty.

Now God promises Jerusalem a messenger of its own.

The same comfort offered to the whole world circles back to the city that needed it most.

🔁 Good tidings recalls chapter forty
🏙️ Jerusalem gets its own messenger
🌍 The same comfort reaches the whole world
📖 Comfort circles back to Jerusalem

# Isaiah 41:28-29
# 🌬️ The Verdict Is Vanity And Confusion
---
## 🧠 There Was No Counsellor

God looked among the idols and their defenders for a real response.

"Counsellor" means an advisor a king would consult for wisdom.

Not one idol or defender could answer the challenge from verse twenty two.

Total silence becomes the trial's final piece of evidence.

👀 God looked for a real response
🧠 Counsellor means a trusted advisor
🤐 Not one could answer the challenge
📖 Silence closes the case completely

## 💨 They Are All Vanity, Their Works Are Nothing

"Vanity" translates the same Hebrew word for breath or vapor used back in chapter forty.

It describes something that looks solid but actually has no real substance.

This final verdict now covers every idol discussed throughout this whole chapter.

🔁 Same vanity word from chapter forty
💨 It means something with no real substance
🗿 This verdict covers every idol here
📖 Looks solid, actually empty

## 🔥 Their Molten Images Are Wind And Confusion

"Molten images" are idols made by pouring melted metal into a mold.

Pairing wind with confusion joins together emptiness and chaos in one final phrase.

The chapter that opened with a courtroom summons closes with a clear, final verdict.

The LORD alone has ever truly controlled history.

🔥 Molten images are cast from melted metal
🌬️ Wind and confusion pair emptiness with chaos
⚖️ The trial closes with a final verdict
📖 The LORD alone has ever controlled history
`.trim();

export const ISAIAH_FORTY_ONE_PERSONAL_SECTIONS = parseIsaiahFortyOneRawNotes(ISAIAH_FORTY_ONE_RAW_NOTES);
