export type JeremiahThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyThreeRawNotes(rawText: string): JeremiahThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 33:${startVerse}` : `Jeremiah 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Jeremiah 33 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_THREE_RAW_NOTES = `# Jeremiah 33:1-3
# 🙏 A Promise From Prison
---
## 📿 The Word Of The LORD Came Unto Jeremiah The Second Time

This is not Jeremiah's first message from God in this book.

The first one came last chapter, right after he bought the field in Anathoth.

Jeremiah has not moved since then.

He is still inside the same prison courtyard, waiting on God to explain more.

📿 Second time means a continued message
🏺 The first came last chapter
⛓️ Jeremiah is still imprisoned
📖 God returns to explain more

## 🏺 The LORD That Formed It, To Establish It

This verse names God three times in one breath, maker, former, and LORD.

Repeating a name three times is a Hebrew way of adding full weight and certainty.

"Formed" pictures a potter shaping something still soft and unfinished.

"To establish" means to set something firmly in place so it will last.

🏺 The name LORD repeats three times
💪 Repetition adds full weight
🎨 Formed pictures shaping soft clay
📖 Establish means set to last

## 🙏 Call Unto Me, And I Will Answer Thee

This is a direct invitation to pray, not a vague suggestion.

God tells Jeremiah to bring his confusion and his questions straight to Him.

The promise of an answer comes attached to the invitation itself.

Prayer here is not a formality, it is how God planned to keep speaking to him.

🙏 Call means bring it to God
🗣️ Jeremiah is invited to ask
✅ An answer is promised too
📖 Prayer keeps the conversation open

## 🔭 Great And Mighty Things, Which Thou Knowest Not

This phrase promises Jeremiah real information he does not have yet.

Much of this chapter answers that promise directly, piece by piece.

The future of Judah, the coming Branch, and a lasting covenant are all still ahead.

God is not just comforting Jeremiah, He is about to teach him something new.

🔭 Mighty things means hidden knowledge
📜 This chapter fulfills that promise
🌿 The Branch is still ahead
➡️ God is about to teach something new

# Jeremiah 33:4-6
# 🏚️ Houses Thrown Down
---
## ⛰️ Thrown Down By The Mounts, And By The Sword

Mounts here means the siege ramps piled up against Jerusalem's walls.

Soldiers used packed earth to climb over the walls instead of breaking through.

"Sword" stands for every soldier killed in the actual fighting.

Houses across the whole city were being destroyed by both of these at once.

⛰️ Mounts means siege ramps
🧱 Ramps let soldiers climb over
⚔️ Sword means death in battle
📖 Houses fell to both at once

## 💀 Fill Them With The Dead Bodies Of Men

This describes houses used as makeshift graves during the siege.

So many people were dying that homes filled with bodies instead of families.

God names this horror plainly instead of softening it.

The fighting itself became the tool God used to carry out judgment already decided.

💀 Dead bodies filled the houses
🏚️ Homes became makeshift graves
😨 God names the horror plainly
➡️ The fighting carried out judgment

## 🙈 I Have Hid My Face From This City

To hide one's face means to withdraw protection and favor.

God chose to step back because of the city's own sin.

This explains why the siege succeeded at all.

Judgment here is not random disaster.

It is God withdrawing His covering.

🙈 Hid face means withdrew favor
💔 God chose to step back
🏹 This explains the siege's success
📖 Judgment means God's covering removed

## 🏥 I Will Bring It Health And Cure

This verse turns sharply from judgment to healing in the very same breath.

"Health and cure" pictures a sick patient being restored, not just punished and left broken.

"Abundance of peace and truth" promises more than just an end to the fighting.

Real peace here includes honesty and faithfulness returning to the whole relationship.

🏥 Health and cure means restoration
💊 Judgment turns into healing here
☮️ Peace means more than no war
📖 Truth and peace return together

# Jeremiah 33:7-9
# 🔙 Captivity Returned
---
## 🗺️ Cause The Captivity Of Judah And Israel To Return

Judah and Israel had split into two separate kingdoms centuries earlier.

Israel, the northern kingdom, had already fallen to Assyria generations before this.

Judah, the southern kingdom, is the one about to fall to Babylon now.

This promise reaches past the current disaster to reunite both scattered peoples one day.

🗺️ Judah and Israel were split kingdoms
🏹 Israel had already fallen to Assyria
🏚️ Judah is about to fall too
📖 Both are promised a future return

## 🏗️ Build Them, As At The First

"As at the first" points back to the nation's early, settled years.

God promises restoration, not something brand new and unfamiliar.

The picture is a return to stability, not a strange replacement.

What was broken down by war will one day be built back up.

🏗️ As at the first means restored
🔙 Not something new and strange
🏠 Stability is the picture here
➡️ What fell will be rebuilt

## 🧼 Cleanse Them From All Their Iniquity

Cleanse and pardon describe two different sides of the same forgiveness.

To cleanse pictures washing away a stain that made someone unfit to approach God.

To pardon pictures a legal debt being completely cancelled.

Together they promise both a changed record and a changed condition.

🧼 Cleanse means washing away a stain
⚖️ Pardon means a cancelled debt
📜 Both describe real forgiveness
📖 Record and condition both change

## 📛 A Name Of Joy, A Praise And An Honour

Jerusalem's name had become a byword for disaster among the surrounding nations.

This promises the exact opposite reputation in the future.

Other nations will hear about God's goodness toward His people and notice it.

Even outsiders will end up praising what God has done here.

📛 A name of joy means a new reputation
😔 The old reputation was disaster
👂 Other nations will hear and notice
➡️ Even outsiders will praise this

## 😮 They Shall Fear And Tremble For All The Goodness

Fear here does not mean being afraid of harm.

It means standing in awe of something far bigger than expected.

Nations will react this way to kindness, not to a display of raw power.

God's goodness toward His people becomes its own kind of witness to the world.

😮 Fear here means awe not fright
💪 Normally awe follows raw power
❤️ Here it follows kindness instead
📖 Goodness becomes its own witness

# Jeremiah 33:10-11
# 🎉 Joy Returns To Ruined Streets
---
## 🏚️ Desolate Without Man And Without Beast

This describes total emptiness, not just a quiet city.

No man means no families, no markets, no daily life at all.

No beast means even the animals are gone from the streets.

Jeremiah is describing a place as empty as it is possible for a place to be.

🏚️ Desolate means totally empty
👪 No man means no daily life
🐑 No beast means animals gone too
📖 This emptiness could not be more total

## 💍 The Voice Of The Bridegroom, And The Voice Of The Bride

Wedding celebrations were loud, public, and joyful events in this culture.

A bridegroom and bride's voices filled the streets during the festivities.

Hearing those voices again means ordinary life and ordinary joy have returned.

A ruined, silent city will one day host weddings again.

💍 Weddings were loud public events
🗣️ Their voices filled real streets
🎉 Hearing them means joy returned
➡️ A silent city will host weddings again

## 🙏 The Sacrifice Of Praise Into The House Of The LORD

A sacrifice of praise was an offering given purely out of thanksgiving.

It was not required to pay for any sin, unlike other offerings.

People bringing these again means worship itself has fully resumed.

The verse closes by repeating the promise of captivity returning.

🙏 Sacrifice of praise means pure thanksgiving
🚫 Not required to pay for sin
🎶 Worship fully resumes again
📖 The promise of return repeats here

# Jeremiah 33:12-13
# 🐑 Shepherds Return To The Hills
---
## 🐑 An Habitation Of Shepherds Causing Their Flocks To Lie Down

This pictures peaceful, everyday shepherd life returning to ruined land.

Flocks lying down calmly is a sign that no danger is near.

Shepherds could not safely rest their flocks during a war or a siege.

Ordinary, quiet farming life becomes proof that real peace has returned.

🐑 Flocks lying down means safety
🧑‍🌾 Shepherds return to ordinary life
⚔️ War made this impossible before
📖 Calm farming proves real peace

## 🔢 Pass Again Under The Hands Of Him That Telleth Them

To tell the flock meant counting each sheep one at a time.

A shepherd did this every evening to check that none were lost.

The cities named here cover mountains, lowlands, the south, and Benjamin.

Together they cover the whole territory of Judah, not just one corner.

🔢 Telleth means counting sheep one by one
🌙 Shepherds counted flocks every evening
🗺️ These cities cover all of Judah
➡️ The whole land is promised, not one corner

# Jeremiah 33:14-16
# 🌿 The Branch Of Righteousness
---
## 🤝 That Good Thing Which I Have Promised

This callback points to earlier promises already made through Jeremiah.

Chapter thirty one named a new, lasting covenant as this same good thing.

God is not introducing a new idea here, He is confirming an older one.

Israel and Judah are both named together as one shared promise.

🤝 This points to an earlier promise
📜 Chapter thirty one named it first
✅ God confirms, not invents, this
📖 Israel and Judah share one promise

## 🌿 I Will Cause The Branch Of Righteousness To Grow Up Unto David

Branch is a title for a future king from David's own family line.

A branch growing from an old tree pictures new life from something that looks finished.

David's own royal line had been reduced to almost nothing by this point in the story.

This same title appears again in chapter twenty three with the same promise attached.

🌿 Branch means a future king
🌳 It pictures new growth from an old line
👑 David's line looked nearly finished
📖 Chapter twenty three names this Branch too

## ⚖️ He Shall Execute Judgment And Righteousness In The Land

This coming king is described by what He will actually do, not just His title.

Judgment means ruling with justice, correcting real wrongs instead of ignoring them.

Righteousness means ruling in a way that matches God's own character.

Judah's current kings have failed at exactly this job throughout this entire book.

⚖️ Judgment means ruling with justice
👑 Righteousness means ruling like God
😔 Current kings have failed at this
➡️ A better king is coming

## 🏷️ The LORD Our Righteousness

This new name is given to Jerusalem itself, not to the king alone.

A city's name in this culture often described its character or its hope.

Jerusalem's own righteousness never came from the people's own good behavior.

The name says plainly that God Himself is the city's only righteousness.

🏙️ The name belongs to the city
🏷️ Names described character or hope
🙅 Not based on the people's behavior
📖 God is the city's righteousness

# Jeremiah 33:17-18
# 👑 A Throne And An Altar That Never End
---
## 📉 David Shall Never Want A Man To Sit Upon The Throne

To "want" here means to lack, not to desire something.

This promises an unbroken line of David's descendants on the throne.

Earthly kings from this line stopped sitting on any throne for centuries after this.

This promise ultimately points forward to a king whose reign truly never ends.

📉 Want here means lack, not desire
👑 This promises an unbroken royal line
⏳ Earthly kings stopped soon after this
📖 It points to a reign without end

## 🙏 The Priests The Levites... To Do Sacrifice Continually

Levites were the one tribe set apart to serve as priests in Israel.

Burnt offerings and meat offerings were two different categories of regular temple worship.

This promises worship itself will keep continuing, alongside David's unending throne.

A king and a priesthood are promised together, not one without the other.

🙏 Levites were Israel's priestly tribe
🔥 Burnt and meat offerings were regular worship
🏛️ Worship is promised to continue too
📖 King and priesthood are paired promises

# Jeremiah 33:19-22
# ☀️ A Covenant As Sure As Day And Night
---
## ☀️ If Ye Can Break My Covenant Of The Day, And Of The Night

God compares His promise to something that sounds impossible to break.

Day following night has never once failed in all of recorded history.

God uses that reliability as the measuring stick for His own promises.

If the sun and the night cycle are unbreakable, so is this covenant.

☀️ Day and night never fail
🌙 This cycle has never once broken
📏 God uses it as a measuring stick
📖 His covenant is just as fixed

## 🔒 Then May Also My Covenant Be Broken With David My Servant

This verse sets up a condition that can never actually be met.

Breaking day and night is impossible, so breaking this covenant is impossible too.

Both the throne and the priesthood are tied to this same guarantee.

God ties His unbreakable word to the most reliable pattern humans can see.

🔒 This sets an impossible condition
🌗 Day and night cannot be broken
👑 The throne is tied to this
➡️ God ties His word to the sky's pattern

## ⭐ The Host Of Heaven Cannot Be Numbered, Neither The Sand Of The Sea Measured

Host of heaven refers to the stars, too many to ever fully count.

Sand of the sea pictures something too vast to ever measure by hand.

Both pictures describe something far beyond human ability to track.

God promises David's descendants will multiply on that same impossible scale.

⭐ Host of heaven means the stars
🏖️ Sand of the sea means countless grains
🔭 Both are beyond human counting
📖 David's line will multiply the same way

# Jeremiah 33:23-26
# 👪 The Two Families
---
## 😔 The Two Families Which The LORD Hath Chosen, He Hath Cast Them Off

The two families here means the kingdoms of Israel and Judah.

People around Jeremiah were openly saying God had permanently rejected both of them.

Losing the temple and the throne made that rejection feel like settled fact to them.

God quotes this complaint directly before answering it plainly.

👪 Two families means Israel and Judah
😔 People believed God rejected them for good
🏚️ Losing the temple made it feel final
📖 God quotes this doubt before answering it

## 😨 Despised My People, That They Should Be No More A Nation

This is the real fear sitting underneath the complaint in this verse.

Not just punishment, but total erasure as a people and a nation.

Centuries of exile could easily feel like proof that this fear was true.

God is about to directly contradict this exact fear in His response.

😨 The real fear was total erasure
⏳ Exile made this fear feel real
🚫 Not just punishment but disappearance
➡️ God directly answers this fear next

## 🔁 If My Covenant Be Not With Day And Night

God repeats the exact same proof He already used earlier in this chapter.

Day and night have never once failed to follow their fixed order.

Using the same proof twice shows how firmly God wants this point to land.

The reliability of creation itself becomes God's answer to Judah's deepest fear.

🔁 God repeats His earlier proof
☀️ Day and night still never fail
💪 Repeating it adds extra weight
📖 Creation itself answers Judah's fear

## 🚫 I Will Cast Away The Seed Of Jacob, And David My Servant

This verse states the one thing God promises will never actually happen.

Jacob's descendants and David's royal line will not be thrown away for good.

The chapter closes by directly denying the fear raised earlier in this same passage.

It ends on mercy and a promised return, not on abandonment.

🚫 This denies total abandonment
👪 Jacob's descendants are not cast away
👑 David's line is not cast away
📖 The chapter ends on mercy and return
`.trim();

export const JEREMIAH_THIRTY_THREE_PERSONAL_SECTIONS = parseJeremiahThirtyThreeRawNotes(JEREMIAH_THIRTY_THREE_RAW_NOTES);
