export type SecondSamuelTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwelveRawNotes(rawText: string): SecondSamuelTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 12:${startVerse}` : `2 Samuel 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Samuel 12 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWELVE_RAW_NOTES = `# SecondSamuel 12:1-6
# 🐑 Nathan's Parable
---
## 📨 The LORD Sent Nathan Unto David

Nathan is the prophet who already spoke to David back in chapter seven.

Kings in this era answered to almost no one on earth.

God sends Nathan anyway, straight into the palace.

A prophet's job included confronting a king, not just blessing him.

📨 Nathan is a prophet, not a soldier
👑 Kings normally answered to no one
🚪 God sends him straight to David
📖 A prophet's job includes confrontation

## 🏙️ There Were Two Men In One City

Nathan opens with a story, not an accusation.

This kind of story gets a ruler to judge a case before he realizes it is about him.

The wise woman of Tekoa uses this exact same trick later in chapter fourteen.

David has no idea yet that he is the defendant.

🏙️ A story opens, not an accusation
⚖️ It gets David to judge a case first
🔁 The same trick returns in chapter fourteen
➡️ David does not know he is on trial

## 🐑 One Little Ewe Lamb

The poor man in the story owns exactly one animal.

The rich man owns whole flocks and herds.

That gap between one and many sets up everything that follows.

🐑 The poor man owns only one lamb
🐄 The rich man owns entire flocks
⚖️ A wide gap between having little and much
📖 That gap becomes the whole point later

## 🍽️ It Did Eat Of His Own Meat, And Drank Of His Own Cup

These details go far beyond simple ownership.

The lamb ate from the man's own plate and drank from his own cup.

It even slept in his arms like a member of the family.

Nathan is not describing livestock, he is describing love.

🍽️ The lamb shared the man's own food
🛏️ It slept in his arms like family
❤️ This was love, not just ownership
📖 David is meant to feel that love

## 🚫 Spared To Take Of His Own Flock

"Spared" here means the rich man was unwilling to use what he already owned.

A traveler arrived needing a meal, a real social duty in this culture.

The rich man had more than enough to cover that duty easily.

He chose to steal instead of give up even one animal of his own.

🚫 Spared means he refused to use his own
🧳 A traveler's meal was a real duty
💰 He had more than enough to give
📖 He chose theft over his own sacrifice

## 🔥 As The LORD Liveth

This is a solemn oath, calling on God's own existence as the guarantee.

David is not casually annoyed, he is furious.

He swears out loud before even hearing who the real man is.

🔥 An oath sworn on God's own life
😠 David is genuinely furious here
🗣️ He swears before knowing the true target
➡️ Strong anger, aimed at the wrong man

## 🔢 He Shall Restore The Lamb Fourfold

Fourfold repayment for a stolen sheep matches the actual law in Exodus twenty two.

David quotes the correct legal penalty without even trying.

He is about to hand down real justice against himself and not know it.

🔢 Fourfold matches the law in Exodus
⚖️ David names the correct legal penalty
🪞 He is judging his own future sentence
📖 Real justice, aimed in the wrong direction

## 💔 Because He Had No Pity

The final charge is not only theft.

It is the total absence of pity for someone with so little.

That charge quietly describes David's own crime against Uriah.

A man with everything took the one thing another man loved.

💔 The charge is a lack of pity
🪞 It quietly matches David's own sin
👨‍👩‍👧 A rich man took the one loved thing
📖 The verdict is about to turn on him

# SecondSamuel 12:7-10
# 🎯 Thou Art The Man
---
## 🎯 Thou Art The Man

Four words end the parable and expose the truth.

Nathan has been building toward this single moment the whole time.

David just sentenced himself without realizing it.

🎯 Four words collapse the whole story
🪤 The parable was building to this line
😳 David sentenced himself without knowing
📖 The truth lands all at once

## 👑 I Anointed Thee King Over Israel

God lists what He personally gave David, starting with the throne itself.

None of David's power came from his own scheming.

Every gift traces back to God's own choice to lift him up.

👑 Kingship itself came from God
🎁 Nothing here was David's own doing
🙌 God chose to lift him up
📖 Every gift traces back to God

## 🏠 Thy Master's Wives Into Thy Bosom

This phrase describes David inheriting Saul's entire royal household.

Passing a king's household to his successor was a real custom in this world.

It is not a claim that David literally married each of Saul's wives.

The point is total royal inheritance, not one specific detail.

🏠 Royal households passed to the new king
👑 David inherited Saul's whole position
🚫 Not a claim about one specific marriage
📖 The gift was total, not partial

## ➕ If That Had Been Too Little

God says plainly that David's problem was never scarcity.

More would have been given if David had simply asked.

He already had far more than enough before he ever wronged Uriah.

➕ God would have given even more
🙅 David's problem was never a lack
💰 He already had more than enough
📖 The sin came from wanting, not needing

## 😤 Despised The Commandment Of The LORD

"Despised" is a strong word, stronger than simply breaking a rule.

It means treating God's command with real contempt.

This is not framed as a mistake, it is framed as a rejection.

😤 Despised means treated with contempt
🚫 Not framed as a simple mistake
⚖️ It is named as a rejection
📖 Sin here is personal, not accidental

## ⚔️ Killed Uriah The Hittite With The Sword

David never personally swung a blade against Uriah.

He arranged for the Ammonites to strike the fatal blow instead in chapter eleven.

God still names it as David's own killing.

Distance from the act does not remove the guilt behind it.

⚔️ David arranged the death, not swung the blade
🎯 God still calls it David's killing
🚫 Distance does not remove real guilt
📖 Planning harm is still causing harm

## 🗡️ The Sword Shall Never Depart From Thine House

This consequence is lasting, not a single punishment.

David used the sword to end Uriah's life in secret.

Now the sword becomes a permanent feature of his own family's future.

Later chapters show this playing out again and again within his own sons.

🗡️ A lasting consequence, not one event
🔁 The sword he used now follows his house
👨‍👦 His own sons carry this out later
📖 Consequences can outlive the original sin

# SecondSamuel 12:11-12
# ☀️ Judgment Before The Sun
---
## 🏚️ I Will Raise Up Evil Against Thee Out Of Thine Own House

This trouble will not come from an outside enemy.

It will rise from inside David's own family.

Chapters fifteen through eighteen show Absalom's rebellion fulfilling this exact warning.

🏚️ Trouble comes from inside his own house
👨‍👦 Not an outside enemy this time
🔮 Absalom's rebellion later fulfills this
📖 The greatest threats come from within

## 👁️ He Shall Lie With Thy Wives In The Sight Of This Sun

This specific warning is fulfilled word for word later in chapter sixteen.

Absalom does this openly on a rooftop in front of all Israel.

The prophecy here is not vague, it is precise.

👁️ A specific, exact warning is given
🏠 Chapter sixteen fulfills it precisely
🎯 Not a vague threat but a precise one
📖 God's warnings often land exactly as spoken

## 🤐 Give Them Unto Thy Neighbour

The word "neighbour" stays vague on purpose here.

The reader eventually learns this neighbour is David's own son Absalom.

Holding the name back for now sharpens the shock when it arrives.

🤐 The neighbour is left unnamed here
👨‍👦 It turns out to be his own son
🎭 Withholding the name builds real tension
➡️ The full weight lands later in the story

## ☀️ Before All Israel, And Before The Sun

David hid his sin carefully, planning it in secret.

God promises the judgment will be the opposite of hidden.

Hidden sin does not stay hidden from God, even when it stays hidden from people.

☀️ David's sin was done in secret
📢 God's judgment will be fully public
🙈 Hidden acts are never hidden from God
📖 What is buried in secret still surfaces

# SecondSamuel 12:13
# 💔 I Have Sinned
---
## 💔 I Have Sinned Against The LORD

David offers no excuse and no blame toward anyone else.

Compare this to Saul, who made excuses when confronted back in first Samuel fifteen.

Five plain words replace what could have been a long defense.

💔 No excuse, no blame shifting here
🪞 A sharp contrast with Saul's excuses
🗣️ Five plain words, nothing more
📖 Real confession needs no defense

## 🕊️ The LORD Also Hath Put Away Thy Sin

Forgiveness arrives immediately after confession, not after some earned penalty.

Nathan speaks it the moment David admits the truth.

Grace here is instant, not something David has to work toward first.

🕊️ Forgiveness comes right after confession
⏱️ It arrives instantly, not later
🎁 Grace, not something earned first
📖 God forgives the moment truth is spoken

## ⚖️ Thou Shalt Not Die

The law actually required death for both adultery and murder.

David legally deserved that exact sentence under Moses' law.

Mercy overrides the strict letter of the law here, though real consequences still follow.

⚖️ The law required death for this
📜 David legally deserved that sentence
🙏 Mercy overrides the law's letter
📖 Forgiven does not mean consequence free

# SecondSamuel 12:14
# ⚰️ The Child Shall Surely Die
---
## 📢 Given Great Occasion To The Enemies Of The LORD To Blaspheme

David's sin as king gave surrounding nations a reason to mock Israel's God.

A king was supposed to represent his God well to watching neighbors.

This sin carried a public cost, not only a private one.

📢 Surrounding nations gain a reason to mock
👑 A king represents his God publicly
💔 The cost reaches beyond David alone
📖 Leaders' choices carry a public weight

## ⚰️ The Child Also That Is Born Unto Thee Shall Surely Die

Forgiveness in verse thirteen does not erase every consequence of the sin.

That is a hard but important difference to hold onto.

Being forgiven and being spared every outcome are not the same thing.

⚰️ A real consequence still follows
🕊️ Forgiveness already happened in verse thirteen
⚖️ Forgiven and consequence free are not the same
📖 Grace and consequence can exist together

# SecondSamuel 12:15-18
# 🙏 David's Fast For The Child
---
## 👩 The Child That Uriah's Wife Bare Unto David

The text still calls her Uriah's wife here, not David's wife.

That small wording choice is not an accident.

It quietly keeps the original wrong attached to this moment.

👩 She is still called Uriah's wife
✍️ That wording is a deliberate choice
🔗 It keeps the original sin attached
📖 Small details can carry real weight

## 🙏 Besought God For The Child

David turns to prayer instead of despair or anger at God.

Compare this to how secretly he handled the original sin.

His grief, unlike his sin, plays out completely in the open.

🙏 David turns to prayer, not despair
🤫 His sin was handled in secret
📢 His grief is handled openly instead
📖 Honest grief looks different from hidden sin

## 🌍 Fasted, And Went In, And Lay All Night Upon The Earth

Fasting and lying on bare ground were common ancient postures of desperate prayer.

These were not private feelings kept quiet inside.

They were physical acts of humbling himself before God.

🌍 Lying on the ground showed humility
🍽️ Fasting was a common prayer posture
🙇 A physical, not just private, plea
📖 His body matched his desperate prayer

## 👴 The Elders Of His House Arose

These were senior household officials, not random servants.

Their personal attempt to intervene shows how extreme David's grief looked.

They try to raise him from the ground themselves.

👴 Elders were senior household officials
😟 Their concern shows how extreme this looked
🤲 They personally try to raise him up
📖 Even senior officials felt compelled to act

## 😨 How Will He Then Vex Himself

The servants reason from what they already witnessed.

David would not listen to them while the child was still alive.

They fear his reaction will be even worse once hope is fully gone.

😨 The servants fear the worst reaction
👂 He would not listen while the child lived
💭 They reason from what they already saw
➡️ Fear of grief shapes their silence

## 📆 On The Seventh Day

The whole ordeal lasts exactly one week.

The child is never given a name anywhere in the text.

Solomon later receives a name, this child never does.

📆 The wait lasts exactly seven days
🚫 The child is never named in the text
👶 Solomon later gets a name, not this child
📖 A brief life, still recorded with care

## 🤐 The Servants Of David Feared To Tell Him

Fear, not cruelty, explains their silence.

They whisper among themselves instead of speaking directly to the king.

That whispering is exactly what tips David off in the next section.

🤐 Fear explains their silence, not cruelty
🗣️ They whisper instead of speaking directly
👂 That whispering becomes the giveaway
📖 Silence can still communicate the truth

# SecondSamuel 12:19-23
# 🍞 David Rises And Eats
---
## 👀 David Perceived That The Child Was Dead

David reads the truth from the servants' whispering alone.

Nobody has told him anything directly yet.

His composure already begins returning before anyone says a word.

👀 He reads the truth from whispering alone
🗣️ No one has told him directly yet
😌 His composure starts returning early
📖 David faces the truth before it is spoken

## 🛁 Washed, And Anointed Himself, And Changed His Apparel

Normal ancient mourning meant staying unwashed, unoiled, and in plain or torn clothing.

David deliberately reverses every one of those mourning signs.

He is choosing to end the mourning period on his own terms.

🛁 He reverses every mourning sign
😢 Normal mourning meant unwashed and unoiled
👔 New clothing signals mourning has ended
📖 David chooses when grief's outward signs stop

## 🕍 Came Into The House Of The LORD, And Worshipped

Worship comes before eating, before comfort, before anything else.

His first act after mourning is aimed straight at God.

That order reveals exactly where David's trust actually rests.

🕍 Worship comes first, before comfort
🍞 Eating happens only after that
🎯 His first move points straight to God
📖 Priorities reveal where real trust lives

## ❓ What Thing Is This That Thou Hast Done

The servants expected grief to grow heavier after death, not lighter.

David's behavior looks backwards by their normal expectations.

Their confusion sets up his own explanation in the next verses.

❓ His behavior looks backwards to them
📈 They expected grief to grow, not shrink
😕 Their confusion is completely understandable
➡️ David is about to explain himself

## 🙏 Who Can Tell Whether GOD Will Be Gracious To Me

David's fasting was genuine hope while the outcome was still open.

It was never a guaranteed bargain that forced God's hand.

Once the outcome was settled, that kind of hope no longer applied.

🙏 Fasting was hope while the outcome was open
🚫 Not a bargain that forced God's hand
⏳ That hope applied only before the ending
📖 Prayer hopes for grace, it cannot demand it

## 🌙 I Shall Go To Him, But He Shall Not Return To Me

This is one of the Old Testament's clearest hints of hope beyond death.

David expects a future reunion with his son.

The child cannot come back to this life, but David can still go to him.

🌙 A clear hint of hope beyond death
👶 David expects a future reunion
🚫 The child cannot return to this life
📖 Hope reaches further than this life alone

# SecondSamuel 12:24-25
# 👶 Solomon Is Born
---
## 🤝 David Comforted Bathsheba His Wife

She is finally called his wife here, plainly and without qualification.

Earlier in this chapter she was still named as Uriah's wife.

That shift signals a real marriage now stands where the sin once stood.

🤝 She is now named simply his wife
🔁 Earlier verses still called her Uriah's wife
💍 A real marriage now stands here
📖 The sin is not erased, but life continues

## 🕊️ He Called His Name Solomon

The name Solomon likely relates to the Hebrew word for peace.

It is a hopeful name arriving after real judgment and real grief.

New beginnings can follow even the hardest chapters of a story.

🕊️ Solomon likely relates to the word peace
😔 It follows real judgment and grief
🌱 A hopeful name after a hard season
📖 New beginnings can follow real loss

## ❤️ The LORD Loved Him

This is a rare, direct statement of God's own affection for a person.

It marks Solomon as specially favored despite the story around his birth.

God can work real good through a genuinely broken situation.

❤️ A rare, direct statement of God's love
👶 Solomon is marked as specially favored
🌧️ This despite the story around his birth
📖 God brings good through broken situations

## 📛 He Called His Name Jedidiah, Because Of The LORD

Jedidiah means beloved of the LORD, a second, more personal name.

Nathan is the one who delivers this tender nickname.

The same prophet who spoke the hardest rebuke of David's life now delivers this gift.

📛 Jedidiah means beloved of the LORD
🗣️ Nathan personally delivers this name
⚖️ The same prophet who delivered the rebuke
📖 Judgment and grace came through the same man

# SecondSamuel 12:26-31
# 👑 Rabbah Falls
---
## 🏙️ Rabbah Of The Children Of Ammon

Rabbah was the capital city of Ammon.

This is the very siege Joab was fighting back in chapter eleven, verse one.

The war that gave David cover for his sin is finally being resolved.

🏙️ Rabbah was Ammon's capital city
🔗 The same siege from chapter eleven
🎯 The cover story is finally resolved
📖 Old threads finally tie back together

## 💧 The City Of Waters

This phrase likely names the lower city, built around the water supply.

Joab captures that section first, before the stronger citadel above it.

The hardest part of the fight, the royal fortress, still remains.

💧 Likely the lower city, near the water
🏰 The stronger citadel still remains
⚔️ Joab takes the easier section first
📖 The real battle is not finished yet

## 🎗️ Lest I Take The City, And It Be Called After My Name

Joab could finish this conquest and claim the glory himself.

Instead he deliberately holds back and calls David forward.

This is a real act of loyalty from a general with the power to take the credit.

🎗️ Joab could easily claim this victory
🤝 He deliberately calls David forward instead
👑 Real loyalty from a powerful general
📖 Credit given freely is a real gift

## 👑 A Talent Of Gold

A talent was an ancient weight, close to seventy five pounds.

A crown that heavy was never meant for daily wear.

It functioned as a royal display piece, not an everyday object.

👑 A talent weighed close to seventy five pounds
🚫 Far too heavy for daily wear
🎭 It served as a royal display piece
📖 Some symbols exist to be seen, not worn

## 🎯 It Was Set On David's Head

The king who stayed home in chapter eleven now personally leads this final battle.

He physically returns to the front of his own army.

Wearing the conquered crown marks his public return to real leadership.

🎯 David personally leads this final battle
🏠 A contrast with staying home in chapter eleven
👑 Wearing the crown marks his return
📖 Leadership resumes where it once failed

## 🪚 Put Them Under Saws, And Under Harrows Of Iron

This describes harsh treatment of the conquered Ammonite population.

Many scholars believe this describes forced labor rather than mass execution.

It reflects this era's brutal norms for treating a defeated enemy.

🪚 Likely describes forced labor, not execution
⚔️ Reflects this era's harsh war customs
🌍 Not a specific command from God
📖 Ancient warfare was rarely gentle

## 🏙️ So David And All The People Returned Unto Jerusalem

This closes the entire arc that opened back in chapter eleven, verse one.

The war that once served as David's cover is finally finished.

The sword God promised in verse ten of this chapter has not even begun yet.

🏙️ This closes the chapter eleven arc
🏁 The covering war is finally finished
🗡️ The promised sword has not started yet
📖 One ending, with a harder one still ahead
`.trim();

export const SECOND_SAMUEL_TWELVE_PERSONAL_SECTIONS = parseSecondSamuelTwelveRawNotes(SECOND_SAMUEL_TWELVE_RAW_NOTES);
