export type FirstKingsSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsSeventeenRawNotes(rawText: string): FirstKingsSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsSeventeen\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsSeventeen\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsSeventeen\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 17:${startVerse}` : `1 Kings 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Kings 17 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_SEVENTEEN_RAW_NOTES = `# FirstKingsSeventeen 17:1
# ⚡ Elijah Confronts A King
---
## Elijah The Tishbite

"Tishbite" identifies Elijah by his hometown.

Tishbe sat in Gilead, a rugged region east of the Jordan.

Most prophets in scripture receive a family record before they ever speak.

Elijah receives none of that here.

He simply appears, already confronting the king.

Scripture cares more about the message than the messenger's resume.

🏘️ Tishbite means from the town Tishbe
🗺️ Gilead lies east of the Jordan
📜 No family record is given here
📖 Message matters more than pedigree

## As The LORD God Of Israel Liveth

This is a solemn oath formula, not a casual phrase.

Elijah ties his own credibility directly to God's existence.

Ahab's kingdom had turned to worship Baal, a storm and rain god.

Elijah names the true God first, before he says anything else.

The true God gets named before the false one is ever mentioned.

🗣️ This is a solemn oath, not chatter
👑 Ahab's kingdom had turned to Baal
🌩️ Baal was a storm and rain god
📖 The true God gets named first

## Before Whom I Stand

"Before whom I stand" is an old way of describing service, not just standing nearby.

It pictures a servant waiting in a king's court, ready for orders.

Elijah says he stands that way before the LORD, not before Ahab.

A prophet's true master was never the throne in front of him.

That loyalty is the whole reason he can speak so boldly to a king.

🧍 Before whom I stand means active service
👑 Elijah serves God, not King Ahab
🫡 It pictures a servant awaiting orders
➡️ True loyalty enables Elijah's bold words

## There Shall Not Be Dew Nor Rain These Years

This drought is not a random natural disaster.

Baal was worshiped as the god who controlled rain, storms, and fertility.

By announcing a drought in the LORD's name, Elijah challenges Baal directly on his own turf.

No rain would fall until the true God said otherwise.

The weather itself becomes the argument for who actually rules Israel.

🌦️ The drought was no accident
🌩️ Baal claimed control over rain and storms
⚔️ Elijah challenges Baal on his own ground
📖 The weather itself proves who truly rules

## But According To My Word

This does not mean Elijah controls the weather by his own power.

His word only carries weight because it is tied to what God has already told him.

The drought will end only when God gives Elijah a new word to speak.

Until then, Elijah's own silence keeps the sky closed.

A true prophet's authority always traces back to God's own voice.

🗝️ Elijah's word is not his own power
🤐 The drought ends only when God says so
🔒 Silence keeps the sky closed for now
📖 Prophetic authority traces back to God

# FirstKingsSeventeen 17:2-7
# 🐦 Fed By Ravens At The Brook
---
## Hide Thyself By The Brook Cherith

"Cherith" was a small stream, not a well known river.

The exact location is not certain today.

God sends Elijah into hiding right after his boldest public moment.

Ahab and Jezebel were not going to react calmly to that prophecy.

Obedience here meant disappearing, not staying to defend himself.

🏞️ Cherith was a small, obscure stream
❓ Its exact location is unknown today
🫥 God sends Elijah into hiding
➡️ Obedience meant retreat, not defending himself

## I Have Commanded The Ravens To Feed Thee

Ravens were considered unclean birds under the law, scavengers that fed on carrion.

God chooses one of the least likely creatures to keep His prophet alive.

This is not the method most readers would expect God to use.

The provision itself makes a point before Elijah ever eats a bite.

God can use what looks unclean to accomplish something completely clean.

🐦‍⬛ Ravens were considered unclean scavenger birds
😮 An unlikely choice to feed a prophet
🍞 God provides through an unexpected source
📖 Unclean means can still serve a clean purpose

## Bread And Flesh In The Morning, And Bread And Flesh In The Evening

The ravens deliver food twice a day, every single day.

That steady rhythm echoes the daily manna God gave Israel in the wilderness.

Elijah never has to store up food or worry about tomorrow's meal.

Each delivery only covers one day at a time.

God's provision here is faithful, not stockpiled.

🌅 Food arrives morning and evening
🍞 The pattern echoes wilderness manna
📆 Provision covers only one day at a time
📖 Faithful provision does not require a stockpile

## The Brook Dried Up, Because There Had Been No Rain

Elijah announced this drought himself back in verse one.

Now the same drought reaches his own hiding place and dries up his water supply.

God's judgment on the land does not skip over His own prophet.

Elijah has to trust God for a new plan, not just live off the old one.

The man who called down the drought still has to live inside it.

💧 The brook Elijah relied on dries up
⚖️ Elijah is not exempt from his own prophecy
🔄 A new plan from God becomes necessary
➡️ Even prophets must trust one step ahead

# FirstKingsSeventeen 17:8-12
# 🏘️ A Widow Gathering Sticks In Zarephath
---
## Get Thee To Zarephath, Which Belongeth To Zidon

Zidon was the home region of Jezebel, Ahab's own wife.

God sends His prophet to hide in enemy territory, not away from it.

Baal worship was strongest in exactly this part of the land.

Elijah's food and safety will come from the last place anyone would expect.

God can provide for His prophet even inside hostile ground.

🗺️ Zidon was Jezebel's own home region
⚔️ This was the heart of Baal worship
🙈 Nobody would expect safety to come from here
📖 God provides even on hostile ground

## I Have Commanded A Widow Woman There To Sustain Thee

The widow has no idea yet that God has already assigned her this role.

Widows in this culture were often among the poorest and most vulnerable people.

God's plan includes her before she ever agrees to it.

She will end up sustaining a prophet while barely able to feed her own son.

God had already made the arrangement before Elijah even arrived.

👀 The widow does not know yet
🕊️ Widows were among the most vulnerable
📜 God arranged this before Elijah arrived
➡️ Her poverty does not disqualify her role

## Gathering Of Sticks

Gathering sticks was normally a task for servants or children.

Wood was needed daily just to cook a single meal.

The widow doing this herself signals she has no one left to send.

That small detail reveals just how alone and poor she really is.

Elijah meets her at the lowest point of her day.

🪵 Gathering sticks was usually a servant's task
👤 She has no one left to send
🍲 Wood was needed daily just to cook
📖 Elijah meets her at her lowest point

## Fetch Me, I Pray Thee, A Little Water In A Vessel

Elijah's first request is small, water in a drought is not an unusual ask.

Even a stranger passing through might ask a local for water.

This opening request costs the widow very little.

It is the easiest possible way for Elijah to test her willingness to help.

A small yes here opens the door for a much bigger ask next.

💧 Water is a small, reasonable request
🚶 A stranger might normally ask for this
🔑 A small yes opens the door further
➡️ The real test has not started yet

## Bring Me, I Pray Thee, A Morsel Of Bread In Thine Hand

This second request costs far more than the first one did.

Bread meant using food from a household already facing starvation.

Elijah raises the stakes only after she has already agreed to help once.

The widow does not yet know Elijah is testing her faith, not just her hospitality.

Real trust is often revealed one costly request at a time.

🍞 Bread costs far more than water did
📈 The stakes rise after her first yes
🙈 She does not know this is a test
📖 Trust reveals itself one request at a time

## An Handful Of Meal In A Barrel, And A Little Oil In A Cruse

A "barrel" here means a large clay jar used to store dry grain.

A "cruse" is a small jug, usually just big enough for cooking oil.

The widow says both containers are nearly empty.

She has exactly one meal left before she and her son expect to starve.

Her honesty here is the whole reason the rest of the story can happen.

🏺 A barrel means a large storage jar
🫙 A cruse means a small oil jug
🍽️ Only one meal remains for her family
📖 Her honesty opens the door to the miracle

# FirstKingsSeventeen 17:13-16
# ✨ The Meal And Oil That Never Ran Out
---
## Fear Not

"Fear not" appears throughout scripture right before God asks someone for something difficult.

Elijah says it here right before asking a starving widow to feed him first.

The command to not fear does not remove the difficulty of the request.

It simply promises the difficulty will not end in disaster.

Faith is being asked to move forward even while afraid.

🛑 Fear not usually comes before a hard ask
🍞 The hard ask here is feeding him first
🤝 The promise does not remove the difficulty
📖 Faith moves forward even while afraid

## Make Me Thereof A Little Cake First

This does not mean Elijah is being selfish with a dying family's last food.

He is asking her to act on faith before she sees any proof it will work.

Giving first, before providing for herself and her son, becomes the actual test.

Her answer to that request decides whether the miracle even begins.

Faith here means acting before the evidence arrives.

🚫 Not selfishness, but a test of faith
🍰 She must give before she sees proof
🔑 Her response opens or closes the miracle
➡️ Faith acts before the evidence arrives

## The Barrel Of Meal Shall Not Waste, Neither Shall The Cruse Of Oil Fail

This is a direct promise from God through Elijah, not a guess or a hope.

"Waste" means the meal will not run out, no matter how much she uses.

The promise is tied to a clear ending point, the day the LORD sends rain.

God provides exactly enough for exactly as long as the drought lasts.

Nothing about the miracle outlasts its actual purpose.

📜 This is a direct promise, not a guess
♾️ Waste means the meal will not run out
📆 The promise lasts until the drought ends
📖 God provides exactly as long as needed

## She, And He, And Her House, Did Eat Many Days

"Her house" means her whole household, not just herself and her son.

The drought Elijah announced in verse one lasted about three and a half years.

That means this single jar and jug fed a whole household for that entire stretch.

The New Testament later points back to this exact miracle in Luke and James.

A widow's small act of faith became a story retold for centuries.

🏠 Her house means her whole household
📆 Drought lasted about three and a half years
🫙 One jar and jug fed them fully
📖 This miracle gets retold later in scripture

# FirstKingsSeventeen 17:17-19
# 💔 The Widow's Son Falls Sick
---
## The Son Of The Woman, The Mistress Of The House

"Mistress of the house" is a title, not just a description.

It marks her as the one running the household since she has no husband present.

The text keeps naming her by that role right before disaster strikes.

Everything she has built and protected is about to be threatened at once.

Her identity as provider is exactly what is now under attack.

🏡 Mistress of the house is a title
👩 She runs the household alone
⚠️ Disaster strikes right after this reminder
➡️ Her role as provider is now threatened

## There Was No Breath Left In Him

This phrase makes clear the boy has actually died, not merely fainted.

The text does not soften what has happened.

The miracle of provision from the last section is suddenly overshadowed by a real death.

Physical survival was never the widow's only fear.

Losing her son meant losing the one reason she kept surviving at all.

☠️ No breath left means he had died
🚫 The text does not soften this
😢 Provision could not prevent this loss
📖 Her son was her deeper hope

## What Have I To Do With Thee, O Thou Man Of God

This phrase is an old idiom, closer to "why did you get involved in my life."

The widow is not making small talk in her grief.

She is accusing Elijah of somehow bringing this disaster with him.

Grief often looks for something or someone to blame.

Her pain is real, even though her accusation is not accurate.

🗣️ The phrase means why did you interfere
😠 She accuses Elijah of causing this
💔 Grief often searches for someone to blame
➡️ Her pain is real, her accusation is not

## Art Thou Come Unto Me To Call My Sin To Remembrance

Many people in the ancient world assumed personal tragedy meant personal sin.

The widow believes her son's death is punishment finally catching up with her.

The rest of scripture, including the book of Job, pushes back hard on that assumption.

Suffering and sin are not always directly connected.

Her theology here is understandable, but it is not correct.

⚖️ She assumes tragedy means personal sin
📖 Job pushes back on that same idea
🔗 Suffering and sin are not always linked
➡️ Understandable belief does not make it true

## Carried Him Up Into A Loft, Where He Abode

A "loft" was an upper room, often the only private space in a small house.

Elijah personally carries the boy's body there himself.

He does not send the widow away or hand off the task to anyone else.

He stays close to the grief instead of stepping back from it.

Compassion here looks like physical presence, not just spoken sympathy.

🏠 A loft was the home's upper room
🤲 Elijah carries the boy himself
🙋 He does not hand off the task
📖 Compassion means staying close, not stepping back

# FirstKingsSeventeen 17:20-22
# 🙏 Elijah's Prayer For Life
---
## He Cried Unto The LORD

Elijah does not have a script or a formula ready for this moment.

He brings the raw situation straight to God instead of trying to fix it alone.

Crying out here is not weakness.

It is the fastest way to reach the only one who can actually help.

Prayer in a crisis often starts exactly this simply.

🗣️ Elijah brings the crisis straight to God
🚫 He does not rely on his own power
💪 Crying out is not weakness here
📖 Simple, honest prayer meets real crisis

## Hast Thou Also Brought Evil Upon The Widow With Whom I Sojourn

Elijah's prayer sounds almost like a complaint directed at God.

He asks bluntly whether God has caused this tragedy on top of everything else.

Scripture allows this kind of honest, pointed question in prayer.

"Sojourn" means Elijah has been staying with her as a guest, not a stranger passing through.

Honest prayer does not require polished, careful language.

❓ Elijah questions God directly and bluntly
🏠 Sojourn means staying as a welcomed guest
🗣️ Scripture allows this kind of honest prayer
➡️ Honest prayer does not need polish

## He Stretched Himself Upon The Child Three Times

This physical act was not a magic ritual with guaranteed results.

Elijah lays his own body over the child's, as if willing life back into him.

Repeating the action three times shows persistence, not a formula that must be followed exactly.

The posture matches how desperately Elijah is praying.

His whole body is involved in this request, not just his words.

🙏 Not a magic ritual with guaranteed results
🤲 Elijah lays his body over the child
🔁 Three times shows persistence, not formula
📖 His whole body joins the prayer

## Let This Child's Soul Come Into Him Again

Elijah asks for something only God has the power to give, life itself.

The prophet has no ability to raise the dead on his own.

God answers, and the boy's life actually returns.

This is the first recorded resurrection in the Bible.

Life belongs to God alone, even when a prophet is the one praying.

✨ Elijah asks for life itself
🚫 No prophet can raise the dead alone
🌟 This is scripture's first recorded resurrection
📖 Life belongs to God alone

# FirstKingsSeventeen 17:23-24
# 📖 A Widow's Faith Confirmed
---
## Brought Him Down Out Of The Chamber Into The House

Elijah carried the boy's body up into the loft back in verse nineteen.

Now he carries him back down, alive.

The same journey happens twice, but the second trip carries a completely different weight.

Scripture often repeats an action to highlight exactly what has changed.

Death went up the stairs, and life came back down them.

⬆️ The boy went up the stairs in death
⬇️ He comes back down them alive
🔁 The same journey, a different outcome
📖 Repetition highlights exactly what changed

## Delivered Him Unto His Mother

Elijah does not keep the moment for himself.

He hands the boy directly back to the one who loved him most.

Her own hands once gathered sticks for what she believed was a final meal.

Those same hands now hold a living son instead.

The miracle is not finished until it reaches her hands.

🤲 Elijah hands the boy back to her
🪵 Her hands once gathered sticks for death
👶 Those same hands now hold life
📖 The miracle finishes in her hands

## See, Thy Son Liveth

Elijah does not explain the miracle or defend how it happened.

He simply points to the result standing in front of her.

Three words carry more weight here than any lengthy explanation could.

Some truths are better shown than argued.

The proof is standing right in front of her, breathing.

👀 Elijah simply points to the result
🗣️ Three words carry the whole weight
🚫 No lengthy explanation is offered
📖 Some truths are shown, not argued

## Now By This I Know That Thou Art A Man Of God

The widow already trusted Elijah enough to share her last meal with him.

This miracle moves her from trusting him to fully knowing the truth about him.

"The word of the LORD in thy mouth is truth" means she now believes everything he has said.

Her declaration closes the chapter on the same note it opened with, the reliability of God's word.

What started as a prophet's oath in verse one ends as a widow's confession in verse twenty four.

🤝 She moves from trust to full conviction
🗣️ She now believes everything Elijah has said
🔁 The chapter closes echoing how it opened
📖 A widow's confession answers a prophet's oath
`.trim();

export const FIRST_KINGS_SEVENTEEN_PERSONAL_SECTIONS = parseFirstKingsSeventeenRawNotes(FIRST_KINGS_SEVENTEEN_RAW_NOTES);
