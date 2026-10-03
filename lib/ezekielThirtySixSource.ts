export type EzekielThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtySixRawNotes(rawText: string): EzekielThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 36:${startVerse}` : `Ezekiel 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 36 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_SIX_RAW_NOTES = `# Ezekiel 36:1-7
# 🗻 The Mountains Of Israel Answer Back
---
## 📢 Prophesy Unto The Mountains Of Israel

God tells Ezekiel to speak directly to the land itself.

Mountains cannot talk back or listen.

The land stands in for the whole nation here.

Addressing it this way makes the message feel physical, not just spiritual.

🗻 Mountains represent the whole nation
📢 God speaks straight to the land
🗣️ The land cannot answer back
📖 A physical promise for a physical land

## 😤 Aha, Even The Ancient High Places Are Ours In Possession

The enemy's taunt here is not simple political gloating.

High places could mean the literal hills of Israel.

It could also mean old worship sites built there.

Either way the enemy claims ancient sacred ground as a trophy.

This insult targets both the land and the God who owns it.

😤 Aha is a taunt of triumph
⛰️ High places means the ancient hills
🏴 The enemy claims it as a trophy
📖 The insult targets land and God

## 🗣️ Taken Up In The Lips Of Talkers

This phrase is an old way of saying Israel became the subject of gossip.

Other nations talked about Israel's fall the way people spread rumors.

The land's ruin turned into entertainment for outsiders.

That is worse than simply being ignored.

Mockery keeps getting repeated and remembered.

🗣️ Lips of talkers means gossip
📰 Nations treated Israel's fall as rumor
🎭 Ruin became entertainment for outsiders
📖 Mockery spreads further than silence

## 😢 An Infamy Of The People

Infamy means a shameful and well known reputation.

Israel did not only lose a war.

Israel became a story other nations told as a warning.

God speaks up for a people now known mostly for their downfall.

😢 Infamy means a shameful reputation
⚔️ Defeat became public humiliation
📣 Other nations told it as a warning
📖 God speaks up for the shamed

## 🧭 To The Hills, To The Rivers, And To The Valleys

God addresses every feature of the land, not only the mountains.

This list covers hills, rivers, and valleys together.

Nothing about the land was left out of this promise.

The whole geography of Israel gets included in what God is about to say.

🧭 Every feature of the land is named
🏞️ Hills, rivers, and valleys included
🚫 Nothing in the land left out
📖 The whole geography gets this promise

## 😡 A Prey And Derision To The Residue Of The Heathen

"Prey" means something hunted and taken for gain.

"Derision" means being laughed at and mocked.

Israel's ruined land suffered both at once.

It was plundered and ridiculed at the same time.

"Residue of the heathen" means the nations still left around Israel.

🏹 Prey means hunted and taken
😂 Derision means mocked openly
💔 Israel suffered both together
📖 Residue of the heathen means the surrounding nations

## 🔥 In The Fire Of My Jealousy

God's jealousy is not petty like human jealousy can be.

It means a fierce protectiveness over what belongs to Him.

That includes His people, His land, and His name.

Fire pictures how intense that protectiveness burns.

🔥 Fire pictures intense protectiveness
👑 God's jealousy protects what is His
🚫 Not petty like human jealousy
📖 His people, land, and name are guarded

## 🗺️ Against All Idumea

"Idumea" is simply another name for Edom.

Edom was the nation descended from Esau, Jacob's twin brother.

Edom had a long history of hostility toward Israel.

Naming this nation specifically singles out one real enemy, not a vague crowd.

🗺️ Idumea means Edom
👨‍👦 Edom descended from Esau
⚔️ Long history of hostility
📖 One real enemy named directly

## 💢 With Despiteful Minds

"Despiteful" is an old word for spiteful and full of contempt.

Edom's hostility was not simply strategic or political.

It came from a bitter, personal hatred toward Israel.

That kind of hatred wanted Israel's downfall for its own satisfaction.

💢 Despiteful means spiteful and bitter
🎯 Not just political strategy
💔 Personal hatred drove it
📖 Satisfaction, not safety, was the goal

## 🤚 I Have Lifted Up Mine Hand

Lifting a hand like this was an ancient way to swear an oath.

It worked much like raising a hand to testify in court today.

God is not merely threatening Edom here.

He is binding Himself to this exact outcome.

🤚 Lifting the hand means swearing an oath
⚖️ Works like a courtroom oath today
🎯 More than a threat
📖 God binds Himself to the outcome

# Ezekiel 36:8-12
# 🌳 The Land Will Bear Fruit Again
---
## 🌿 Ye Shall Shoot Forth Your Branches

This pictures the land itself coming back to life like a tree.

Branches shooting forth means new growth after a long dead season.

The land had been barren and scorned, verse after verse so far.

Now the picture suddenly turns toward life again.

🌿 Branches means new growth
🌳 The land is pictured as a tree
💀 It had been barren until now
📖 The tone turns toward life

## 🕊️ For They Are At Hand To Come

"They" are the exiles still living scattered in other nations.

"At hand" means close, not some vague future.

Their actual return is what makes the land's new growth matter.

This is a near event, not abstract hope.

🕊️ They means the exiled people
⏳ At hand means close, not distant
🌱 Growth matters because return is near
📖 A near promise, not abstract hope

## 🙌 I Will Turn Unto You

God had turned away from Israel earlier in Ezekiel because of their sin.

Turning back toward them now signals forgiveness and renewed attention.

This phrase carries a full reversal from judgment to favor.

Nothing Israel did earned this turn. God simply chose it.

🙌 God had turned away before
🔄 Turning back means renewed favor
⚖️ Judgment reverses into favor here
📖 This favor was not earned

## 🌾 Ye Shall Be Tilled And Sown

"Tilled" means the ground gets worked and prepared for planting.

"Sown" means seed actually goes into that ground.

Both words describe farming the land again after years of ruin.

An abandoned field cannot till or sow itself.

Someone has to return and do the work.

🌾 Tilled means the ground gets worked
🌱 Sown means seed goes in
🚜 Farming resumes after years of ruin
📖 People must return to do the work

## 🏙️ The Cities Shall Be Inhabited

Ruined cities sitting empty were a visible sign of judgment throughout this book.

Filling them with people again reverses that sign.

A city with no one living in it is just rubble with walls.

This promise is as physical as it is spiritual.

🏙️ Empty cities signaled judgment
🔄 Filled cities reverse that signal
🧱 A city needs people, not just walls
📖 The promise is physical and spiritual

## 🐑 I Will Multiply Man And Beast

This repeats a promise already made back in Genesis to Noah and Abraham.

Growth here covers both people and livestock together.

A nation needs both to actually survive and rebuild.

Numbers increasing is the opposite of the empty, abandoned land described earlier in the chapter.

🐑 Man and beast both multiply
📜 Echoes promises made to Noah and Abraham
🌍 A nation needs people and livestock
📖 Growth replaces emptiness

## 🏡 Will Do Better Unto You Than At Your Beginnings

God promises more than just restoring what was lost.

"Your beginnings" likely points back to Israel's early days, perhaps even the years in Egypt or the wilderness.

The restoration ahead is described as better than the start, not merely equal to it.

That is a remarkable promise after so much judgment.

🏡 Better than before is promised
📜 Beginnings may mean Egypt or the wilderness
⬆️ Restoration exceeds the original start
📖 A remarkable promise after judgment

## 🗣️ Ye Shall Know That I Am The LORD

This exact phrase repeats constantly throughout the book of Ezekiel.

It functions almost like a refrain, tying every judgment and every promise back to the same point.

God is not simply fixing problems for Israel's comfort.

He is proving who He actually is through everything that happens.

🗣️ A refrain repeated throughout Ezekiel
🔗 Ties judgment and promise together
🎯 Comfort is not the main point
📖 God proves who He is

## 🚫 Thou Shalt No More Henceforth Bereave Them Of Men

"Bereave" means to lose through death or being taken away.

The land itself is described here as if it had been swallowing its own people.

That picture matches the earlier accusation in verse thirteen that the land devours men.

This promise reverses that image completely going forward.

🚫 Bereave means losing people to death
🌍 The land is pictured as devouring
🔁 Matches the accusation from verse thirteen
📖 That image reverses starting now

# Ezekiel 36:13-15
# 🚫 No More Shall The Land Devour
---
## 😠 Thou Land Devourest Up Men

This is the accusation other nations made about Israel's land.

"Devourest" pictures the land as something hungry, swallowing its own people.

Constant wars, famine, and exile made the land feel cursed to live on.

That reputation followed Israel like a label.

😠 Devourest means swallowing up people
🌍 The land seemed hungry for its own
⚔️ Wars and famine built that reputation
📖 A curse label followed the land

## 💔 Hast Bereaved Thy Nations

"Bereaved" again means losing people.

This time it is described as the land's own fault.

That accusation sounds harsh.

It explains why the next promise matters so much.

💔 Bereaved means losing people
⚖️ Blame is placed on the land itself
😬 A harsh accusation to carry
📖 It sets up the promise ahead

## 🔄 Thou Shalt Devour Men No More

This flips the earlier accusation into a direct promise.

The land will no longer be a place where people are lost.

Safety, not danger, becomes its new reputation.

That reversal is the whole point of this short section.

🔄 Accusation flips into promise
🛡️ Loss gives way to safety
🏷️ A new reputation replaces the old
📖 Reversal is the whole point here

## 🙅 Thou Shalt Bear The Reproach Of The People No More

"Reproach" means public shame or blame.

Israel had carried that shame in front of watching nations for years.

This verse promises the shame itself will end, not just the suffering behind it.

Removing shame matters as much as removing danger.

🙅 Reproach means public shame
👀 Other nations watched that shame for years
🔚 The shame itself is promised to end
📖 Shame removed matters as much as danger

# Ezekiel 36:16-21
# 🕯️ Why The Exile Really Happened
---
## 📜 The Word Of The LORD Came Unto Me, Saying

This verse marks the start of a brand new message from God.

The first message in this chapter addressed the land directly.

This second message shifts to explain why the exile happened in the first place.

Ezekiel's messages often arrive using this same simple formula.

📜 A brand new message begins here
🔄 The first message addressed the land
🧭 This one explains the exile's cause
📖 A formula repeated throughout Ezekiel

## 🩸 Their Way Was Before Me As The Uncleanness Of A Removed Woman

This comparison points to a specific ceremonial law found earlier in the Bible.

A woman's monthly cycle made her ceremonially unclean for a set time under that law.

That impurity was temporary and completely normal, never treated as sin.

Comparing Israel's sin to it was meant to shock the reader.

Sin is neither temporary nor normal, unlike that monthly impurity.

🩸 Removed woman means ceremonial impurity
⏳ That impurity was temporary and normal
😳 Comparing sin to it was shocking
📖 Sin is neither temporary nor normal

## 🔥 I Poured My Fury Upon Them

This is not God losing control of His temper.

It describes deliberate judgment poured out like a liquid, total and complete.

Earlier chapters in Ezekiel already showed this fury in detail, from siege to scattering.

The fury had a clear reason, named plainly in the next line.

🔥 Fury describes deliberate judgment
💧 Poured pictures something total and complete
📜 Earlier chapters already showed this fury
📖 The reason comes next

## 🩸 For The Blood That They Had Shed Upon The Land

Bloodshed here means violence and injustice committed within Israel itself.

The land is described as if it absorbed that blood like a stain.

This was not only about wars with foreign nations.

It was about sin committed inside the nation itself.

🩸 Blood means violence and injustice
🌍 The land absorbed it like a stain
🏠 Sin inside the nation, not just war
📖 The land remembers what happened on it

## 🌪️ I Scattered Them Among The Heathen

Scattering describes the exile across many different nations, not one location.

This was not random. It was the direct result of their sin, as the text already explained.

"Heathen" simply means nations that did not worship the true God.

Being surrounded by those nations made Israel's identity even harder to hold onto.

🌪️ Scattered means spread across many nations
🎯 Not random, a direct result of sin
🌍 Heathen means nations without the true God
📖 Exile made identity harder to hold

## 😈 They Profaned My Holy Name

"Profaned" means treated as common or disgraced instead of sacred.

Israel carried God's name as His chosen people among the nations.

When they sinned and were judged, outsiders blamed God's reputation along with them.

God's name suffered damage that He never deserved.

😈 Profaned means treated as disgraced
🏷️ Israel carried God's name among nations
👀 Outsiders blamed God along with Israel
📖 God's name suffered damage undeserved

## 🗣️ These Are The People Of The LORD, And Are Gone Forth Out Of His Land

Watching nations drew the wrong conclusion from Israel's exile.

They assumed Israel's God must be weak, unable to protect His own people.

That mockery misunderstood the real reason for the exile.

Judgment, not weakness, is what actually sent Israel away.

🗣️ Nations mocked God as weak
🤔 They misread the real reason
⚖️ Judgment, not weakness, caused the exile
📖 The mockery got the story wrong

## 💔 I Had Pity For Mine Holy Name

God's motive for acting is named directly here.

He is not primarily moved by Israel's suffering in this verse.

He is moved by the damage done to how His name is seen.

That might sound uncomfortable at first.

It points to something bigger than Israel alone.

💔 God names His own motive here
🏷️ His name's reputation is at stake
😮 That might feel uncomfortable at first
📖 Something bigger than Israel is in view

# Ezekiel 36:22-23
# 📛 Not For Your Sake, But For My Name
---
## 🚫 I Do Not This For Your Sakes

God states plainly that Israel's restoration is not a reward for good behavior.

Nothing in the chapters leading up to this one shows Israel earning anything.

This line protects against pride creeping back into the very people being restored.

Grace, not merit, is the real foundation here.

🚫 Restoration is not a reward
📜 Israel has not earned this
🛡️ This guards against future pride
📖 Grace, not merit, is the foundation

## 🏷️ But For Mine Holy Name's Sake

God ties His own reputation to what happens to Israel.

Israel's exile had already made God look weak to watching nations.

Restoring Israel also restores how God's name is seen in the world.

This is the deeper reason behind everything promised in this chapter.

🏷️ God ties His name to Israel's fate
👀 Exile made God look weak to nations
🔄 Restoration repairs that reputation too
📖 This is the deeper reason behind the promise

## ✨ I Will Sanctify My Great Name

"Sanctify" means to set apart as holy, clearly separate from everything common.

God is not asking to be viewed as holy.

He is declaring that He will make it unmistakably clear.

Everyone watching will see it happen through what He does for Israel.

✨ Sanctify means set apart as holy
🗣️ Not a request, a declaration
👁️ The world will see it happen
📖 Israel becomes proof of God's holiness

## 👁️ When I Shall Be Sanctified In You Before Their Eyes

Israel becomes the visible demonstration of everything just promised.

"In you" means the proof happens through what God does for this specific people.

"Before their eyes" means the watching nations see it unfold firsthand, not through rumor.

Every blessing that follows in this chapter becomes evidence, not just comfort.

👁️ Israel becomes the visible proof
🎯 In you means proof through this people
🌍 Before their eyes means nations watch directly
📖 Blessings ahead double as evidence

# Ezekiel 36:24-28
# 💧 A New Heart And A New Spirit
---
## 🌍 I Will Gather You Out Of All Countries

This restates the promise made earlier in the chapter, now stated plainly.

The exile had scattered Israel into many different nations, not just one place.

Gathering them back means reversing that scattering completely, nation by nation.

🌍 Gathering reverses the earlier scattering
🗺️ Exile spread Israel into many nations
🔄 This is a complete reversal
📖 Promise restated plainly here

## 💦 Then Will I Sprinkle Clean Water Upon You

Sprinkling water was already a familiar ritual of cleansing under Israel's law.

Priests and ordinary people both used water this way to remove uncleanness.

Here God performs that same kind of cleansing Himself, directly on the nation.

This is not a cleansing from dirt.

It is a cleansing from sin itself.

💦 Sprinkling water was a familiar ritual
🙏 Normally performed by priests or the people
🙌 Here God performs it Himself
📖 This cleanses sin, not dirt

## 🧼 From All Your Filthiness, And From All Your Idols, Will I Cleanse You

"Filthiness" covers moral failure in general, not just the idol worship named next.

Idols are named specifically because they were Israel's most repeated sin throughout its history.

Both are promised a complete cleaning, not a partial fix.

🧼 Filthiness means moral failure broadly
🗿 Idols named as the repeated sin
💯 Both get a complete cleaning
📖 Not a partial fix, a full one

## ❤️ A New Heart Also Will I Give You

In Hebrew thought, the heart meant the center of a person's will and decisions, not just emotion.

A new heart means a new default direction for choosing right or wrong.

This is not advice to try harder.

It is a promise of being changed from the inside.

❤️ Heart means will and decision making
🧭 A new heart means a new direction
🙅 Not advice to simply try harder
📖 A promise of inward change

## 🪨 I Will Take Away The Stony Heart Out Of Your Flesh

A heart of stone pictures something hard, cold, and unable to feel or respond.

That describes a will that stayed stubborn through every warning in this book.

God promises to remove that stubbornness completely, not soften it slightly.

🪨 Stony heart means a hard, unfeeling will
🙉 Stubbornness ignored every earlier warning
🚫 Removed completely, not softened
📖 A full change, not a partial one

## 🌱 And I Will Give You An Heart Of Flesh

Flesh here means something soft, living, and able to feel and respond.

This is the direct opposite of the stony heart just described.

A heart that can feel guilt can also feel love and obedience.

That capacity is the real gift being promised.

🌱 Flesh means soft, living, responsive
🔄 The direct opposite of stone
💗 Able to feel guilt and love both
📖 That capacity is the real gift

## 🕊️ I Will Put My Spirit Within You

This goes a step further than just a changed heart.

God promises His own presence living inside the person, not only nearby.

Earlier in Israel's history, God's presence stayed in the temple building, not in each person.

This promise points toward a closeness never offered this way before.

🕊️ God's own presence moves inside
🏛️ Earlier, His presence stayed in the temple
🆕 This closeness is something new
📖 A relationship deeper than before

## 📏 Cause You To Walk In My Statutes

Israel already had God's laws given through Moses long before this.

The problem was never a lack of instructions.

The problem was an unwillingness and inability to actually keep them.

This new spirit supplies the power the law alone never gave.

📏 The law already existed before this
🙅 The problem was never missing instructions
💪 The real problem was unwillingness
📖 The new spirit supplies real power

## 🤝 Ye Shall Be My People, And I Will Be Your God

This exact sentence is the core covenant promise repeated throughout the whole Bible.

It appeared already to Abraham, and again through Moses at Sinai.

Repeating it here, after exile and judgment, proves the relationship was never permanently broken.

🤝 The core covenant promise repeated
📜 First given to Abraham and Moses
🔄 Said again after exile and judgment
📖 The relationship was never permanently broken

# Ezekiel 36:29-32
# 😳 Grateful, And Finally Ashamed
---
## 🌾 I Will Call For The Corn, And Will Increase It

"Corn" in this old English translation means grain in general, not modern corn on the cob.

Grain was the basic food supply an entire nation depended on to survive.

Calling for it and increasing it means guaranteeing the most basic need first.

🌾 Corn means grain in general
🍞 Grain was the basic food supply
📈 God promises to increase the supply
📖 The most basic need comes first

## 🙅 Ye Shall Receive No More Reproach Of Famine

Famine in the ancient world was not only hunger.

It was treated publicly as a sign of a god's anger or failure.

Removing the reproach means removing that public shame along with the hunger itself.

🙅 Famine carried public shame, not just hunger
⚖️ Shame implied divine anger or failure
🔚 Both the hunger and shame end
📖 Provision removes shame, not just hunger

## 😳 Then Shall Ye Remember Your Own Evil Ways

This is a surprising turn right in the middle of such a generous promise.

Restoration does not erase memory of what led to the exile in the first place.

Comfort and a clear conscience about the past are not the same thing.

😳 A surprising turn mid promise
🧠 Restoration does not erase memory
💭 Comfort differs from a clear conscience
📖 Blessing and memory of sin coexist

## 😔 Shall Lothe Yourselves In Your Own Sight

"Lothe" is an old spelling of loathe, meaning deep disgust.

This disgust points inward, at themselves, not outward at enemies.

That kind of honest reflection usually follows real grace, not fear.

Grace produced this response.

Fear never could have produced it the same way.

😔 Lothe means a deep disgust
🪞 Aimed inward, not at enemies
🙏 Honest reflection follows grace, not fear
📖 Grace produces this response, fear cannot

## ⚖️ For Your Iniquities And For Your Abominations

"Iniquity" names sin in a broad, general sense.

"Abomination" is a stronger word, used for sin that is especially detestable, often tied to idol worship.

Using both words together covers the full range of what Israel did wrong.

⚖️ Iniquity means sin broadly
🤢 Abomination means especially detestable sin
🗿 Often tied to idol worship
📖 Together they cover the full range

## 😳 Be Ashamed And Confounded For Your Own Ways

"Confounded" means thrown into confusion, unsure how to even respond.

This repeats the theme from verse twenty two, that God acts for His name.

Shame here is not a punishment.

It is an honest reaction to grace freely given.

😳 Confounded means thrown into confusion
🔁 Echoes the theme from verse twenty two
🙅 Shame here is not punishment
📖 An honest reaction to free grace

# Ezekiel 36:33-38
# 🌿 The Land Becomes Like Eden
---
## 🏙️ In The Day That I Shall Have Cleansed You

This verse ties cleansing and resettlement together explicitly.

The order matters. Cleansing comes first, then rebuilding follows.

This confirms what was promised back in verses twenty five through twenty eight.

🏙️ Cleansing and rebuilding are tied together
🥇 Cleansing comes first in the order
🔁 Confirms the promise from earlier verses
📖 Spiritual change leads to physical renewal

## 🚜 The Desolate Land Shall Be Tilled

This repeats the same farming language already used earlier in the chapter.

Working the ground again is proof the land has truly changed, not just a hopeful slogan.

Fields do not till themselves.

People had to come back first.

🚜 Repeats the farming language from before
✅ Proof of real change, not just words
👥 People had to return first
📖 Working the land confirms the promise

## 👀 In The Sight Of All That Passed By

Israel's ruin was not hidden from anyone.

Travelers passing through saw the devastation firsthand for years.

That public shame becomes a public witness instead once the land is restored.

Everyone who watched the fall also gets to watch the recovery.

👀 Ruin was visible to every traveler
🚶 Years of public devastation
🔄 Public shame becomes public witness
📖 The same witnesses see the recovery

## 🌳 This Land That Was Desolate Is Become Like The Garden Of Eden

This is a direct callback to the very first garden in Genesis.

Eden was the place of perfect provision before sin ever entered the world.

Comparing restored Israel to Eden is the highest possible compliment the land could receive.

It suggests recovery that goes beyond simply fixing what broke.

🌳 A direct callback to Genesis
🍎 Eden means perfect provision before sin
🏆 The highest compliment the land could get
📖 Recovery beyond simply fixing what broke

## 🏰 Fenced And Are Inhabited

"Fenced" here means walled and defended, not just marked by a property line.

Cities finally feel permanent and safe instead of exposed to raiders.

Being inhabited again means ordinary daily life has returned, not just rebuilt walls standing empty.

🏰 Fenced means walled and defended
🛡️ Cities feel safe, not exposed
🏠 Inhabited means daily life has returned
📖 Walls alone are not the point

## 📣 I The LORD Have Spoken It, And I Will Do It

This exact phrase appears throughout Ezekiel as a kind of signature guarantee.

Speaking and doing are tied together on purpose here.

God's word is never just an announcement waiting to come true later.

It is already as good as done the moment He says it.

📣 A signature phrase throughout Ezekiel
🔗 Speaking and doing are tied together
⏳ Not a future maybe
📖 God's word is as good as done

## 🙏 I Will Yet For This Be Enquired Of By The House Of Israel

God has already promised all of this plainly.

He still invites Israel to ask Him for it in prayer.

A guaranteed promise does not cancel out the value of praying for it anyway.

🙏 God still invites prayer for this
✅ The promise was already guaranteed
🙌 Prayer still has real value
📖 Guarantee and prayer are not opposites

## 🐑 I Will Increase Them With Men Like A Flock

This compares a growing population to a growing flock of sheep.

Shepherds across the ancient Near East measured wealth partly by how fast their flocks multiplied.

Applying that image to people pictures rapid, abundant growth after the land sat empty for so long.

🐑 People compared to a growing flock
📈 Flocks measured wealth by growth speed
🌍 Pictures rapid, abundant growth
📖 Fullness returns after long emptiness

## 🕊️ As The Holy Flock, As The Flock Of Jerusalem In Her Solemn Feasts

During major festivals, huge numbers of sacrificial animals poured into Jerusalem at once.

That image of crowded, overflowing flocks becomes the picture for how full the resettled cities will be.

The waste cities are promised the same kind of overwhelming fullness.

🕊️ Feast crowds brought huge flocks to Jerusalem
🏙️ That crowded image pictures the resettled cities
📈 Overwhelming fullness, not a slow trickle
📖 Even waste cities get filled this way
`.trim();

export const EZEKIEL_THIRTY_SIX_PERSONAL_SECTIONS = parseEzekielThirtySixRawNotes(EZEKIEL_THIRTY_SIX_RAW_NOTES);
