export type DeuteronomyThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirtyRawNotes(rawText: string): DeuteronomyThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 30:${startVerse}` : `Deuteronomy 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Deuteronomy 30 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTY_RAW_NOTES = `# Deuteronomy 30:1-3
# 🔄 The Blessing And The Curse Remembered
---
## 📜 The Blessing And The Curse

"Blessing" and "curse" point back to two long lists Moses already gave.

Chapter 27 gave the curses at Mount Ebal.

Chapter 28 gave both blessings and curses in full detail.

Moses is not introducing something new here.

He is calling back to what Israel already heard.

📜 Blessing and curse were already spoken
⛰️ Curses were given at Mount Ebal
📋 Chapter 28 laid out both lists
📖 Moses recalls what Israel already heard

---

## 🧠 Thou Shalt Call Them To Mind Among All The Nations

To "call to mind" means more than simply recalling facts.

It means letting the truth sink in and change something.

This happens while Israel is scattered among other nations.

Exile becomes the place where the lesson finally lands.

Distance from home is what makes the memory sharp.

🧠 Call to mind means more than recall
🌍 This happens while scattered among nations
💔 Exile is where the lesson lands
📖 Distance sharpens the memory here

---

## ⚡ Whither The LORD Thy God Hath Driven Thee

The exile is described here as God's own act.

This does not erase Israel's responsibility for breaking the covenant.

Chapters 27 and 28 already warned this would happen.

God works through the consequences Israel brought on themselves.

Even judgment stays inside God's sovereign hand.

⚡ Exile is called God's own act
⚖️ Israel's sin still caused the exile
📜 Chapters 27 and 28 warned of this
📖 Even judgment stays under God's hand

---

## 🔄 And Shalt Return Unto The LORD Thy God

"Return" here means far more than a change of address.

It means turning back to God after turning away from him.

The Hebrew idea behind repentance is literally a turning around.

This return is the hinge the entire chapter turns on.

Everything good that follows depends on this one word.

🔄 Return means turning back to God
🚶 It pictures repentance as a turn
🔑 This word is the chapter's hinge
📖 Every blessing depends on this turn

---

## ❤️ With All Thine Heart, And With All Thy Soul

This exact phrase already appeared in Deuteronomy chapter 6.

It describes total devotion, not a partial or halfhearted effort.

"Heart" pictures the mind and will together in this culture.

"Soul" pictures the whole life force of a person.

Together they leave no part of a person held back.

❤️ This phrase repeats from Deuteronomy 6
🧠 Heart pictures the mind and will
🌬️ Soul pictures a person's whole life
📖 Nothing is held back in this return

---

## 🌅 The LORD Thy God Will Turn Thy Captivity

"Turn thy captivity" is an idiom for reversing a disaster.

It pictures fortune flipped completely in the opposite direction.

"Have compassion" adds warmth to what could sound like a bare legal fix.

This is not a reluctant God grudgingly restoring what was lost.

It is a compassionate God actively reversing Israel's ruin.

🔄 Turn captivity means reversing disaster
❤️ Compassion adds warmth to the promise
🙌 God restores Israel actively, not reluctantly
📖 Ruin gets reversed, not just tolerated

---

## 🌍 Gather Thee From All The Nations

This promise assumes Israel will be scattered across many countries.

"Gather" pictures God personally collecting his people from far away.

No single nation holds every exiled Israelite at once.

God's regathering reaches across every place they end up.

This theme returns throughout the prophets many centuries later.

🌍 Israel gets scattered across many nations
🤲 Gather pictures God collecting his people
🗺️ No one nation holds every exile
➡️ Prophets return to this theme later

# Deuteronomy 30:4-6
# 🌌 No Distance Too Far
---
## 🌌 If Any Of Thine Be Driven Out Unto The Outmost Parts Of Heaven

"Outmost parts of heaven" is a poetic way to say the farthest possible place.

It does not describe an actual location past the sky.

The phrase is deliberate exaggeration to make a point.

No matter how far Israel scatters, they are not out of reach.

Distance itself has a limit that this promise ignores.

🌌 Outmost parts of heaven means farthest place
🚫 It is not a real location
📏 The phrase is deliberate exaggeration
📖 No distance puts Israel out of reach

---

## 🔁 From Thence Will The LORD Thy God Gather Thee, And From Thence Will He Fetch Thee

"Gather" and "fetch" repeat the same idea for emphasis.

Repetition in Hebrew poetry usually signals something worth stressing.

God does not simply wait for Israel to find their way back.

He goes and gets them himself.

This is an active rescue, not a passive open door.

🔁 Gather and fetch repeat for emphasis
📢 Repetition signals something worth stressing
🏃 God goes and gets Israel himself
📖 This rescue is active, not passive

---

## 👴 Bring Thee Into The Land Which Thy Fathers Possessed

"Thy fathers" points back to Abraham, Isaac, and Jacob.

They lived in this same land generations earlier as strangers.

The promise is not a new piece of real estate.

It is the very land already tied to the covenant.

Returning home means returning to a promise centuries old.

👴 Thy fathers means Abraham, Isaac, Jacob
🗺️ They lived in this same land
📜 The promise is not new territory
📖 Return connects to a centuries old vow

---

## 📈 And Multiply Thee Above Thy Fathers

This promises growth beyond what the patriarchs themselves saw.

Abraham, Isaac, and Jacob never lived to see a full nation.

Israel after restoration will exceed even their ancestors' numbers.

The comeback is not just a return to normal.

It is described as greater than what came before.

📈 Growth will exceed the patriarchs' own
👴 They never saw a full nation
🔄 This is not a return to normal
📖 The comeback exceeds what came before

---

## ✂️ The LORD Thy God Will Circumcise Thine Heart

Physical circumcision was the sign of the covenant since Abraham.

"Circumcise thine heart" borrows that image for something deeper.

It pictures God cutting away whatever blocks real devotion.

This is not a task Israel can perform on themselves.

God himself does the cutting this time.

✂️ Circumcision was the sign since Abraham
❤️ This borrows the image for the heart
🚧 It removes whatever blocks devotion
📖 God does the cutting, not Israel

---

## ❤️ To Love The LORD Thy God With All Thine Heart, And With All Thy Soul, That Thou Mayest Live

The purpose of the changed heart is named directly here.

A circumcised heart naturally turns toward loving God.

This love is not forced or fearful obedience.

It flows from the change God performed inside them.

Real life, not just survival, depends on this love.

🎯 The changed heart aims at love
❤️ Love flows from what God changed
🚫 This is not forced obedience
📖 Real life depends on this love

# Deuteronomy 30:7-10
# ⚔️ Curses Reversed
---
## 🔄 Put All These Curses Upon Thine Enemies

The curses named in chapters 27 and 28 do not simply disappear.

Here they get redirected onto Israel's enemies instead.

What Israel deserved for disobedience now lands somewhere else.

This is a complete reversal, not a cancellation.

The same weight of judgment still exists, just relocated.

📜 The curses do not disappear
🔄 They redirect onto Israel's enemies
⚖️ This is reversal, not cancellation
📖 Judgment gets relocated, not erased

---

## 💔 And On Them That Hate Thee, Which Persecuted Thee

This names two specific groups by their actions, not just enemies in general.

"Hate thee" points to hostility, private opposition to Israel.

"Persecuted thee" points to active harm already done to Israel.

Both groups face the very curses Israel once faced.

The people who caused Israel's suffering inherit the consequences instead.

💔 Hate thee means private hostility
🗡️ Persecuted thee means active harm done
🎯 Both groups named by their actions
📖 Israel's sufferers inherit the consequence instead

---

## 🚶 And Thou Shalt Return And Obey The Voice Of The LORD

"Return" repeats the same word already used in verses 2 and 3.

Obedience is not optional once the return happens.

Hearing God's voice and obeying it are treated as one action here.

A real return always shows up as real obedience.

Words alone would not be enough to prove the change.

🔄 Return repeats the earlier promise
👂 Hearing and obeying are treated as one
✅ A real return shows up as obedience
📖 Words alone do not prove change

---

## 📋 Do All His Commandments Which I Command Thee This Day

"All" leaves no room for picking and choosing.

Partial obedience is not the standard being described here.

"This day" ties the command to Moses' own generation directly.

The same full obedience applies to every generation after them.

The bar never lowers over time.

📋 All leaves no room for picking
🚫 Partial obedience is not the standard
📅 This day ties it to Moses' moment
📖 The bar never lowers later

---

## 🌾 Plenteous In Every Work Of Thine Hand, In The Fruit Of Thy Body, And In The Fruit Of Thy Cattle, And In The Fruit Of Thy Land

"Plenteous" means abundant, more than enough.

This covers labor, children, livestock, and crops in one sweep.

The list matches the blessings already promised back in chapter 28.

Nothing about daily life is left untouched by this blessing.

Obedience reaches into every ordinary corner of Israel's life.

🌾 Plenteous means abundant, more than enough
👶 The list covers labor, children, herds, crops
🔗 It matches chapter 28's earlier promise
📖 Blessing reaches every ordinary corner

---

## 😊 The LORD Will Again Rejoice Over Thee For Good, As He Rejoiced Over Thy Fathers

God is described here with genuine joy, not bare tolerance.

"Rejoice over thee" pictures delight, the way a parent delights in a child.

"As he rejoiced over thy fathers" ties this back to Abraham, Isaac, and Jacob.

The relationship being restored is personal, not just contractual.

God wants Israel back, not merely obedient.

😊 God is shown with genuine joy
👪 Rejoice pictures a parent's delight
👴 This echoes joy shown to the fathers
📖 God wants Israel back, not just obedient

---

## 📚 If Thou Shalt Hearken Unto The Voice Of The LORD Thy God, To Keep His Commandments And His Statutes Which Are Written In This Book Of The Law

"This book of the law" points to the written text of Deuteronomy itself.

The commands are not vague oral tradition passed around loosely.

They exist in a fixed, written form Israel can check against.

A written law cannot be quietly reshaped over time.

The written text keeps the covenant accountable to something fixed.

📚 This book of the law is Deuteronomy
✍️ The commands are written, not just spoken
🔒 Written law resists being reshaped later
📖 The written text keeps the covenant fixed

---

## 🔁 And If Thou Turn Unto The LORD Thy God With All Thine Heart, And With All Thy Soul

This closing condition repeats the same total devotion phrase again.

Three times now this chapter has used heart and soul together.

Repetition this heavy signals exactly what the whole chapter is about.

Restoration was never only about location or possessions.

It was always first about the direction of the heart.

🔁 This phrase repeats a third time
📢 Heavy repetition signals the chapter's real point
📍 Restoration is not just about location
📖 It is first about the heart's direction

# Deuteronomy 30:11-14
# 🙌 Not Too Hard, Not Too Far
---
## 🙈 For This Commandment Which I Command Thee This Day, It Is Not Hidden From Thee, Neither Is It Far Off

"Hidden" means secret or kept out of reach.

Moses says plainly that God's law is not a secret.

"Far off" means distant or impossible to access.

This corrects any excuse that obedience is somehow out of reach.

Israel cannot claim ignorance or genuine impossibility here.

🙈 Hidden means kept secret or out of reach
📏 Far off means distant or inaccessible
🚫 This removes the ignorance excuse
📖 The law was never impossible to reach

---

## ☁️ It Is Not In Heaven, That Thou Shouldest Say, Who Shall Go Up For Us To Heaven

This corrects a specific wrong assumption someone might make.

A reader might imagine the law requires some impossible spiritual quest.

Moses names that excuse directly before Israel can even raise it.

No one has to climb into heaven to find this command.

It was already given, plainly, in the pages just read.

☁️ This corrects a false assumption
🧗 No one must climb into heaven
📜 The command was already given plainly
📖 It sits in the pages just read

---

## 🌊 Neither Is It Beyond The Sea, That Thou Shouldest Say, Who Shall Go Over The Sea For Us

The sea repeats the same idea from a different direction.

Ancient travel across open sea was slow, dangerous, and rare.

Moses rules out this excuse just as firmly as the first.

Neither height nor distance stands between Israel and obedience.

Every possible excuse of impossibility gets closed off in turn.

🌊 The sea repeats the same excuse
⛵ Ancient sea travel was slow and rare
🚫 This excuse gets ruled out too
📖 Every impossibility excuse closes off here

---

## 📨 And Bring It Unto Us, That We May Hear It, And Do It

This exact clause appears at the end of both verse 12 and verse 13.

An imagined messenger would hear the command and bring it back.

That messenger's whole job is made obsolete by what comes next.

Moses points out there is no need for a go between.

The command already sits close enough that no courier is required.

🔁 This clause repeats in both verses
📨 A messenger would fetch and return it
🚫 That job becomes obsolete instantly
📖 No courier is required for this command

---

## 📏 But The Word Is Very Nigh Unto Thee, In Thy Mouth, And In Thy Heart

"Nigh" means near, close at hand.

"In thy mouth" pictures words already known well enough to speak.

"In thy heart" pictures the law already understood, not still a mystery.

Access was never the real obstacle to obedience.

The New Testament later quotes this exact verse in Romans 10.

📏 Nigh means near, close at hand
🗣️ In thy mouth means already known
❤️ In thy heart means already understood
📖 Romans 10 later quotes this verse

---

## 🏁 That Thou Mayest Do It

Knowing the law was never presented as the finish line.

The whole point of nearness is that action becomes possible.

A command that is near but never obeyed accomplishes nothing.

This short phrase quietly closes the whole argument.

Nearness exists so obedience can actually happen.

🏁 Knowing was never the finish line
⚡ Nearness makes action possible
🚫 Unobeyed law accomplishes nothing
📖 Nearness exists so obedience can happen

# Deuteronomy 30:15-18
# ⚖️ Life And Death Set Before You
---
## 🛤️ I Have Set Before Thee This Day Life And Good, And Death And Evil

Moses presents obedience and disobedience as two clear paths.

"Life and good" describes one direction, "death and evil" the other.

There is no third neutral option offered here.

Every choice Israel makes leans toward one path or the other.

The stakes are named as plainly as possible.

🛤️ Two clear paths are set out
✅ Life and good is one direction
❌ Death and evil is the other
📖 No neutral third option exists

---

## ❤️ To Love The LORD Thy God, To Walk In His Ways, And To Keep His Commandments

Three actions are listed together as one connected package.

"Love" describes the heart's attachment to God.

"Walk in his ways" describes daily behavior matching that love.

"Keep his commandments" describes concrete obedience to specific instructions.

Love without action or action without love both fall short here.

❤️ Love describes the heart's attachment
🚶 Walk in his ways describes daily behavior
📋 Keep commandments describes concrete obedience
📖 All three belong together, not apart

---

## 🌱 That Thou Mayest Live And Multiply

This repeats a promise already given earlier in the chapter.

"Live" points to more than mere biological survival.

"Multiply" points to a growing, thriving population in the land.

Obedience is tied directly to national flourishing, not just personal safety.

A whole future is riding on this single choice.

🌱 Live means more than mere survival
📈 Multiply means a growing, thriving nation
🔗 Obedience is tied to flourishing
📖 A whole future rides on this choice

---

## 💔 But If Thine Heart Turn Away, So That Thou Wilt Not Hear

The warning begins exactly where the promise began, at the heart.

"Turn away" describes a heart quietly drifting from God over time.

Not hearing follows naturally once the heart has already turned.

The outward disobedience starts as an inward drift first.

What happens inside always shows up outside eventually.

💔 The heart drifts first, quietly
👂 Not hearing follows the drifted heart
🔄 Inward drift becomes outward disobedience
📖 What happens inside shows outside eventually

---

## 🧲 But Shalt Be Drawn Away, And Worship Other Gods, And Serve Them

"Drawn away" pictures being pulled off course, not choosing all at once.

This describes a slow pull rather than a single sudden decision.

"Worship" and "serve" describe two connected acts of devotion misplaced.

Both words already applied to the true God throughout this book.

Here they get redirected toward gods that are not real.

🧲 Drawn away pictures a slow pull
🐌 This is gradual, not sudden
🙏 Worship and serve describe devotion misplaced
📖 Real devotion gets redirected toward false gods

---

## 📢 I Denounce Unto You This Day, That Ye Shall Surely Perish

"Denounce" means to declare formally and publicly.

This is not a private warning whispered quietly to a few.

Moses states the consequence openly before the entire nation.

"Surely perish" leaves no soft alternative reading available.

The warning is as direct as the promise offered earlier.

📢 Denounce means declared formally, publicly
👥 This warning is stated before everyone
⚠️ Surely perish leaves no soft reading
📖 The warning matches the promise's directness

---

## 🔄 And That Ye Shall Not Prolong Your Days Upon The Land

This directly reverses the promise of long life in the land.

That promise appears repeatedly throughout Deuteronomy already.

Losing the land was always presented as a real possibility.

The gift of the land was never treated as unconditional.

Obedience was always the thread holding the promise together.

🔄 This reverses the promised long life
🔁 That promise repeats earlier in Deuteronomy
🚫 The land gift was never unconditional
📖 Obedience holds the promise together

# Deuteronomy 30:19-20
# 🎯 Therefore Choose Life
---
## ⚖️ I Call Heaven And Earth To Record This Day Against You

This is a formal legal idiom, not a poetic flourish.

Ancient treaties often called on witnesses that would outlast both parties.

Heaven and earth outlast every human generation involved.

Calling them as witnesses makes this moment permanently binding.

No one can later claim the terms were unclear.

⚖️ This is a formal legal idiom
🤝 Ancient treaties named lasting witnesses
🌍 Heaven and earth outlast every generation
📖 The terms stay permanently on record

---

## 🔁 That I Have Set Before You Life And Death, Blessing And Cursing

This restates the same choice from verse 15 one more time.

Repeating it here signals the chapter is reaching its climax.

Every major theme from the chapter gets summarized in one line.

The whole covenant renewal comes down to this single decision.

Nothing new is added, only the weight is increased.

🔁 This restates the choice from verse 15
📈 Repetition signals the chapter's climax
📋 The whole chapter compresses into one line
📖 Weight increases without adding anything new

---

## 🎯 Therefore Choose Life

This short command is the most famous line in the chapter.

"Choose" makes clear this decision belongs to Israel, not fate.

God does not force the outcome despite offering the promise.

Free response was always part of how this covenant works.

Two words carry the weight of everything said before them.

🎯 Choose life is the chapter's most famous line
🙋 Choose means the decision belongs to Israel
🚫 God does not force the outcome
📖 Two words carry the whole chapter's weight

---

## 🤝 That Thou Mayest Love The LORD Thy God, And That Thou Mayest Obey His Voice, And That Thou Mayest Cleave Unto Him

"Cleave" means to stay firmly attached, the same word used for marriage in Genesis 2.

Love, obedience, and cleaving are named together as one whole response.

This is not a distant, formal relationship being described.

The language is closer to marriage than to a legal contract.

Israel's bond with God was always meant to feel this personal.

🤝 Cleave means staying firmly attached
💍 The same word describes marriage in Genesis 2
❤️ Love, obedience, cleaving form one response
📖 This bond is personal, not just legal

---

## 🌱 For He Is Thy Life, And The Length Of Thy Days

This is not simply saying that God gives long life.

It says God himself is the source that life depends on.

Length of days was already promised earlier in this chapter.

Here it gets tied directly back to God's own person.

Life outside this relationship was never really presented as an option.

🌱 God is the source life depends on
⏳ Length of days repeats an earlier promise
🔗 It ties back to God's own person
📖 Life apart from God was never offered

---

## 🔄 Sware Unto Thy Fathers, To Abraham, To Isaac, And To Jacob

The chapter closes exactly where the whole story of Israel began.

Abraham, Isaac, and Jacob each received this same promise personally.

"Sware" means God bound himself with an oath, not a casual offer.

Everything in Deuteronomy has been building toward this one inheritance.

The land was never a new idea, only a long delayed delivery.

🔄 The chapter closes where Israel's story began
👴 Abraham, Isaac, Jacob each received this promise
🖋️ Sware means bound by an oath
📖 The land was a delayed delivery, not new
`.trim();

export const DEUTERONOMY_THIRTY_PERSONAL_SECTIONS = parseDeuteronomyThirtyRawNotes(DEUTERONOMY_THIRTY_RAW_NOTES);
