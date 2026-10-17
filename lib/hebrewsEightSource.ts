export type HebrewsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsEightRawNotes(rawText: string): HebrewsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 8:${startVerse}` : `Hebrews 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Hebrews 8 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_EIGHT_RAW_NOTES = `# Hebrews 8:1-2
# 👑 Such An High Priest
---
## 📝 This Is The Sum

"Sum" means the main point, not a list of numbers added up.

The writer has just spent seven whole chapters on Jesus as priest.

Now he stops to say one sentence sums up all of it.

Jesus himself, seated as high priest, is the main point.

📝 Sum means the main point

📚 Seven chapters led to this moment

👑 Jesus as priest is the point

📖 Everything builds toward this one truth

---
## 🪑 Set On The Right Hand Of The Throne

Sitting down at God's right hand marked a finished work.

It was not a brief pause to rest.

Priests under the old law never sat down to serve.

No chair ever sat in the ancient tabernacle.

Jesus sits because his priestly work is already complete.

🪑 Sitting marks a finished work

🧍 Old priests never sat to serve

🏛️ No chair existed in the tabernacle

📖 Jesus sits because his work is done

---
## 🌌 The Majesty In The Heavens

"Majesty" is a reverent title for God himself.

It is not just a poetic description.

Calling God "the Majesty" names his supreme royal authority.

"The heavens" here points to God's own throne room.

It is not simply the sky overhead.

Jesus sits beside that same supreme authority.

👑 Majesty is a title for God

🏰 It names his supreme authority

🌌 Heavens points to God's throne room

📖 Jesus sits beside that authority

---
## 🏛️ Minister Of The Sanctuary And Of The True Tabernacle

"Minister" here means one who serves, not a government official.

"Sanctuary" means the holy space set apart for God's presence.

"The true tabernacle" means the real, heavenly original Moses only copied.

God himself pitched that tabernacle.

It was not built by any human hands.

🙏 Minister means one who serves

🏛️ Sanctuary means the holy space

🗺️ True tabernacle is the heavenly original

📖 Built by God and not by man

# Hebrews 8:3-5
# 🏔️ According To The Pattern
---
## 📋 Ordained To Offer Gifts And Sacrifices

"Ordained" means officially appointed to a task.

Every high priest in Israel was ordained to offer gifts and sacrifices.

That was simply the job itself.

This new priest needs to have something to offer as well.

📋 Ordained means officially appointed

🎁 Every priest offered gifts and sacrifices

⚙️ That was the whole job

📖 This priest needs something to offer

---
## 📌 It Is Of Necessity

"Necessity" means something absolutely required, not optional.

Every true priest must have an actual offering to present.

Jesus could not rightly be called a priest without something to offer.

He offers himself, not an animal or a grain gift.

📌 Necessity means absolutely required

🎁 A priest needs an offering to give

✝️ Jesus offers himself

📖 That offering makes him a true priest

---
## 🌍 He Should Not Be A Priest

This does not mean Jesus was unfit to be a priest.

It means that if he stayed only on earth, Israel already had priests.

The Levitical priests already held that earthly job under the law.

Jesus had to serve somewhere else entirely, in heaven itself.

🌍 Not a claim Jesus was unfit

📋 Levitical priests held the earthly job

🏛️ That role was already filled on earth

📖 Jesus serves in heaven instead

---
## 🌑 Serve Unto The Example And Shadow Of Heavenly Things

"Shadow" here means a copy or outline of something real.

A shadow shows the shape of an object but not the object itself.

The earthly tabernacle and its priests were only that kind of shadow.

The real, heavenly version is what they were always pointing toward.

🌑 Shadow means a copy not real

👤 A shadow shows shape not substance

🏛️ The earthly tabernacle was only a shadow

📖 It pointed toward the real heavenly one

---
## 📜 According To The Pattern Shewed To Thee In The Mount

"Shewed" is an old spelling of showed.

God gave Moses an exact pattern for building the tabernacle.

Moses saw this pattern on Mount Sinai.

This happened before any actual building began.

Every measurement had to match what God had already shown him.

📜 Shewed is an old spelling of showed

🏔️ God showed Moses an exact pattern

⛺ Moses saw it on Mount Sinai

📖 Everything had to match that pattern

# Hebrews 8:6-7
# 🤝 A Better Covenant
---
## ⬆️ A More Excellent Ministry

Jesus now holds a priestly service greater than anything before it.

"Ministry" here means the actual work and service of a priest.

Every earlier comparison in this letter has been building toward this line.

His service outranks the whole earthly priesthood completely.

⬆️ Jesus holds a greater priestly service

🙏 Ministry means the work of a priest

📈 Every earlier comparison built toward this

📖 His service outranks the earthly priesthood

---
## 🤝 The Mediator Of A Better Covenant

"Mediator" means someone who stands between two parties to bring them together.

Jesus stands between God and his people in exactly that role.

A covenant is a binding agreement between two parties.

This covenant is better than the one that came before it.

Jesus personally guarantees that this agreement holds.

🤝 Mediator stands between two parties

✝️ Jesus mediates between God and people

📜 Covenant means a binding agreement

📖 Jesus guarantees this one holds

---
## 🔮 Established Upon Better Promises

"Better promises" points forward to the new covenant promises coming later in this chapter.

Those promises include a changed heart and a God who remembers sins no more.

The old covenant only offered rules written on stone tablets.

This one offers something written directly into a person.

🔮 Better promises point to verses coming next

❤️ They include a changed heart

🪨 The old covenant used stone tablets

📖 This one writes on the heart

---
## 🚫 If That First Covenant Had Been Faultless

"Faultless" means without any flaw at all.

The old covenant was never meant to be the final word.

If it had truly been perfect, no second covenant would ever be needed.

The very existence of a second covenant proves the first fell short.

🚫 Faultless means without any flaw

⏳ The old covenant was not the final word

🔁 A perfect covenant would need no replacement

📖 The second proves the first fell short

# Hebrews 8:8-9
# 📜 Finding Fault With Them
---
## 👥 Finding Fault With Them

"Them" refers to Israel, the people living under the first covenant.

God is not blaming the covenant itself as badly designed.

He is pointing out that the people kept breaking their side of it.

That failure is exactly why a new covenant became necessary.

👥 Them refers to Israel

📜 The covenant itself was not the flaw

💔 The people kept breaking their side

📖 This is why a new covenant was needed

---
## 📜 The Days Come Saith The Lord

This whole passage quotes the prophet Jeremiah, written centuries earlier.

Jeremiah originally spoke these words long before Jesus ever came.

The writer uses that old prophecy to prove the new covenant was already promised.

Nothing about this new covenant was a sudden, last minute idea.

📜 This quotes the prophet Jeremiah

⏳ Jeremiah spoke it centuries earlier

✅ It proves the new covenant was promised

📖 Nothing here was a last minute idea

---
## 👑 The House Of Israel And The House Of Judah

Israel had once been one united nation under one king.

After Solomon's reign, the kingdom split into two separate parts.

"The house of Israel" became the northern ten tribes.

"The house of Judah" became the southern kingdom that included Jerusalem.

👑 Israel was once one united nation

✂️ It split after Solomon's reign

⬆️ House of Israel means the northern tribes

📖 House of Judah means the southern kingdom

---
## 🏺 Lead Them Out Of The Land Of Egypt

This points directly back to the Exodus, Israel's rescue from slavery.

God made his first covenant with the people right after that rescue.

He led them personally, like a father taking a child by the hand.

That same God is the one now promising something greater.

🏺 This points back to the Exodus

🤝 God made this covenant after that rescue

🫱 He led them like a father

📖 The same God promises something greater

---
## 💔 They Continued Not In My Covenant

Israel repeatedly broke the terms of that first covenant.

"I regarded them not" does not mean God simply gave up on them.

It describes God withdrawing covenant blessing because the people broke their own promise.

Their failure sets up the very need for the new covenant described next.

💔 Israel repeatedly broke the covenant

🚫 Regarded them not means withdrew blessing

⚖️ The people broke their own promise

📖 This sets up the new covenant

# Hebrews 8:10-12
# ❤️ Written In Their Hearts
---
## 🧠 I Will Put My Laws Into Their Mind

The old covenant gave laws written on stone tablets and scrolls.

A person had to read or hear the law from outside themselves.

This new covenant places the law inside a person's own mind instead.

Obedience becomes something understood from within, not just followed from without.

🪨 The old law was written on stone

📖 A person heard the law from outside

🧠 The new law starts inside the mind

➡️ Obedience now comes from within

---
## ❤️ Write Them In Their Hearts

"Heart" in this verse does not mean the organ that pumps blood.

In the Bible, the heart means a person's whole inner self.

God is not simply instructing people anymore.

He is changing what they actually want to obey.

❤️ Heart means the inner self

🧭 It includes a person's will

📜 God once only gave instructions

📖 Now he changes what people want

---
## 📜 I Will Be To Them A God And They Shall Be To Me A People

This exact phrase is the ancient covenant formula running through the whole Bible.

God used nearly the same words with Abraham and with Moses.

Repeating it here confirms a real and lasting relationship.

This new covenant does not replace that relationship.

It fulfills what came before.

📜 This is the Bible's covenant formula

👴 God used it with Abraham and Moses

🤝 It confirms an ongoing relationship

📖 The new covenant fulfills it

---
## 🚪 They Shall Not Teach Every Man His Neighbour

This does not mean teaching will completely disappear under the new covenant.

It means knowing God will no longer depend on one tribe's priest.

Under the old system, ordinary people had to go through priests to know God.

Under the new covenant, direct access to God becomes available to everyone.

🚫 Teaching does not fully disappear

🙏 Knowing God no longer needs a go between

🚪 Old system required going through priests

📖 Direct access becomes open to everyone

---
## 📊 From The Least To The Greatest

This phrase covers every level of ancient society, poor to powerful.

Under the old system, access to God often depended on rank or role.

Common people needed priests as their only way of approaching God.

This new covenant removes that entire rank system between people and God.

📊 This covers every level of society

👑 Access once depended on rank or role

🙏 Common people needed priests to approach God

📖 This covenant removes that rank system

---
## ⚖️ Their Sins And Their Iniquities Will I Remember No More

"Iniquities" means deep wrongdoing repeated over time.

It is more serious than a single mistake.

"Remember no more" does not mean God simply forgets.

It means God chooses never to hold those sins against the person again.

That complete forgiveness is the whole point this quotation builds toward.

⚖️ Iniquities means deep repeated wrongdoing

🧠 Remember no more is not simple forgetting

🙏 God chooses not to hold it against them

📖 This complete forgiveness is the chapter's point

# Hebrews 8:13
# ⏳ Ready To Vanish Away
---
## 🆕 He Hath Made The First Old

Simply calling something "new" already marks the old version as outdated.

God naming a new covenant through Jeremiah already announced the first covenant's end.

That announcement came centuries before Jesus ever arrived.

The old system was living on borrowed time long before it actually ended.

🆕 Calling it new marks the old outdated

📜 God announced this through Jeremiah

⏳ That announcement came centuries early

📖 The old system was already ending

---
## 🧵 Ready To Vanish Away

"Decayeth and waxeth old" describes something fading out, like worn cloth.

This letter was likely written before the Jerusalem temple was destroyed.

The sacrifices and priesthood there were still active at that time.

Their deeper meaning was already fading away.

Within a few decades the temple itself would be gone completely.

🧵 Decayeth and waxeth old means fading out

🏛️ The temple still stood when this was written

⏳ Its meaning was already fading

📖 It was destroyed within decades
`.trim();

export const HEBREWS_EIGHT_PERSONAL_SECTIONS = parseHebrewsEightRawNotes(HEBREWS_EIGHT_RAW_NOTES);
