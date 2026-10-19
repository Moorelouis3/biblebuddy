export type RevelationElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationElevenRawNotes(rawText: string): RevelationElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 11:${startVerse}` : `Revelation 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Revelation 11 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_ELEVEN_RAW_NOTES = `# Revelation 11:1-2
# 📏 Measuring The Temple
---
## 📏 A Reed Like Unto A Rod

A reed here means a long measuring stick, not a plant.

This kind of rod was about ten feet long.

Ezekiel once received a nearly identical rod for measuring a temple.

John now gets the same tool for a similar task.

Measuring something this closely means its details truly matter.

📏 A reed means a long measuring stick

📐 It measured about ten feet long

📜 Ezekiel used a similar rod before

📖 Measuring means every detail truly matters

## 🛐 Measure The Temple Of God, And The Altar, And Them That Worship Therein

This command is not really about construction measurements.

It pictures God taking careful account of what belongs to him.

Measuring the altar means marking it out as sacred ground.

Measuring the worshippers means God knows exactly who belongs to him.

Nothing here is random or overlooked.

God never loses track of his own people.

📏 Measuring pictures God taking careful account

🛐 The altar is marked as sacred ground

👥 Worshippers represent God's own people

📖 God never loses track of his own

## 🚷 It Is Given Unto The Gentiles

The word Gentiles here does not mean every nation on earth.

It means those who reject God and trample what is holy.

The outer court is left unmeasured on purpose.

This court pictures people who claim access to God without real faith.

God still tells true worship apart from empty religion.

🚷 Gentiles means those who reject God

🏛️ The outer court goes unmeasured on purpose

🎭 It pictures empty religion, not true faith

📖 God tells true worship from empty religion

## ⏳ Tread Under Foot Forty And Two Months

Forty and two months equals three and a half years.

This same length of time repeats again and again in Revelation.

It also matches the thousand two hundred and threescore days given to the two witnesses soon after.

Three and a half years pictures a limited season of hardship.

It is not meant to last forever.

God always sets a clear end to seasons of trouble.

🔢 Equals three and a half years

🔁 This same length repeats throughout Revelation

⏳ It matches the witnesses days exactly

📖 God always sets an end to hardship

# Revelation 11:3-6
# 🫒 Two Witnesses, Two Olive Trees
---
## 🧵 Clothed In Sackcloth

Sackcloth was a rough, uncomfortable material worn to show mourning or warning.

These two witnesses wear it the entire time they prophesy.

Their clothing itself preaches a message of coming judgment.

They will prophesy for the same thousand two hundred and threescore days already mentioned.

Their whole appearance matches the seriousness of what they are saying.

🧵 Sackcloth was rough, uncomfortable mourning clothing

📢 It preaches a message of judgment

⏳ They wear it the entire time

📖 Their appearance matches their serious message

## 🫒 These Are The Two Olive Trees, And The Two Candlesticks

This phrase points back to a vision in the book of Zechariah.

There two anointed leaders were pictured as olive trees feeding a lamp with endless oil.

These two witnesses carry that same picture of being fueled directly by God.

An olive tree never runs out of its own oil on its own.

God himself keeps these two witnesses supplied for their entire mission.

🫒 Points back to a vision in Zechariah

🕯️ Olive trees fed a lamp with oil

🔋 These witnesses are fueled directly by God

📖 God supplies them for their whole mission

## 🌦️ Power To Shut Heaven, That It Rain Not

This power directly echoes the prophet Elijah.

Elijah once prayed and stopped the rain completely.

No rain fell for three and a half years after that prayer.

That same length of time is given to these two witnesses.

God hands them the same kind of authority he once gave Elijah.

Their power proves they truly speak for God.

🌦️ Echoes the prophet Elijah directly

🚫 Elijah once stopped rain completely

⏳ No rain fell for years

📖 God gives them Elijah's own authority

## 🩸 Turn Them To Blood

This power directly echoes the prophet Moses.

Moses once turned the Nile River to blood during the plagues of Egypt.

These witnesses are given the same ability to strike the earth with plagues.

Moses confronted Pharaoh, and these witnesses will confront a future rebellious world.

Two different ages receive the same unmistakable sign of God's authority.

🩸 Echoes the prophet Moses directly

🌊 Moses turned the Nile to blood

⚡ These witnesses get the same power

📖 Both ages see God's unmistakable authority

# Revelation 11:7-10
# ⚰️ The Witnesses Are Killed
---
## 👹 The Beast That Ascendeth Out Of The Bottomless Pit

This is the first time Revelation mentions the beast by name.

The bottomless pit is the same deep prison already opened back in chapter nine.

This beast will become a major figure later in the book.

For now he appears only long enough to kill God's two witnesses.

Even this powerful enemy cannot act until God allows it.

👹 First mention of the beast by name

🕳️ The bottomless pit was opened in chapter nine

⚔️ He kills God's two witnesses here

📖 Even the beast acts under God's limits

## 🏙️ Which Spiritually Is Called Sodom And Egypt

The great city here is not named directly.

Readers can still tell it is Jerusalem.

Calling it Sodom and Egypt is not a literal title.

It is a symbol of a place that has turned against God.

Sodom stood for open sin.

Egypt stood for slavery and oppression.

Even God's own holy city can fall into both patterns.

🏙️ The great city is really Jerusalem

🔥 Sodom pictures open sin

⛓️ Egypt pictures slavery and oppression

📖 Even a holy city can fall this way

## ⚰️ Shall Not Suffer Their Dead Bodies To Be Put In Graves

Leaving a body unburied was considered a deep public shame in this culture.

A proper burial was something every family tried to guarantee their loved ones.

Denying it to these two witnesses was meant to mock and humiliate them.

Their enemies wanted the whole world to see them treated this way.

God still had the final word over their story.

⚰️ Leaving a body unburied was deep shame

🙏 Burial mattered greatly in this culture

😈 Enemies wanted to humiliate the witnesses

📖 God still had the final word

## 🎉 They That Dwell Upon The Earth Shall Rejoice Over Them, And Make Merry

The witnesses had spent years warning the world of judgment.

Their message made them deeply unwelcome everywhere they went.

Once they are dead, the world finally feels relief.

People even send each other gifts to celebrate their silence.

This celebration will turn out to be very short lived.

📢 Their warnings made the world uncomfortable

🎉 The world celebrates once they are dead

🎁 People send gifts to mark the moment

📖 Their celebration will not last long

# Revelation 11:11-14
# ⚡ Raised Up To Heaven
---
## 💨 The Spirit Of Life From God Entered Into Them

This moment echoes Ezekiel's vision of dry bones coming back to life.

Breath and spirit from God are what first make any body truly alive.

These two witnesses receive that same breath after three and a half days.

Their enemies thought their story was already finished.

God had one final move left to make.

💀 Echoes Ezekiel's vision of dry bones

💨 God's breath makes bodies truly alive

⏳ It happens after three and a half days

📖 God still had one final move

## ☁️ They Ascended Up To Heaven In A Cloud

A cloud often marks the presence and power of God in scripture.

Jesus himself ascended into heaven inside a cloud after his resurrection.

These two witnesses now follow that exact same pattern.

Their enemies can only watch and are powerless to stop it.

God rescues his faithful witnesses in plain public view.

☁️ Clouds often mark God's presence

🙌 Jesus ascended the same way before

👀 Enemies watch, completely powerless to stop it

📖 God rescues them in plain public view

## 🏚️ The Tenth Part Of The City Fell

This earthquake strikes the same great city mentioned earlier in this chapter.

A tenth of its buildings collapse immediately.

Seven thousand people die in the destruction.

This is a partial judgment, not the final one.

God is still giving the world a chance to turn back.

🏙️ Strikes the same city from before

🏚️ A tenth of the buildings collapse

💔 Seven thousand people die here

📖 God still leaves room to turn back

## 📯 The Third Woe Cometh Quickly

Revelation already announced three separate woes earlier in the book.

The first and second woes have now already happened.

This verse marks the end of the second one.

The third and final woe is coming very soon after this.

Each woe warns that worse judgment is still ahead.

📯 Three separate woes were announced earlier

✅ The first two woes already happened

⏭️ The third woe comes very soon

📖 Each woe warns worse judgment is coming

# Revelation 11:15-19
# 👑 The Seventh Trumpet Sounds
---
## 👑 The Kingdoms Of This World Are Become The Kingdoms Of Our Lord, And Of His Christ

The seventh trumpet is the last in a series of seven trumpet judgments.

Heaven does not announce more disaster this time.

Instead heaven announces a complete change of ownership.

Every kingdom on earth now belongs to God and to his Christ.

What looked like total chaos is actually God's plan reaching its goal.

📯 The seventh and final trumpet sounds

🔄 Heaven announces a change of ownership

👑 Every kingdom now belongs to God

📖 Chaos was always God's plan unfolding

## 🙇 Fell Upon Their Faces, And Worshipped God

These twenty four elders already appeared earlier in this book.

They represent the full company of God's redeemed people.

Falling on their faces is a posture of total surrender.

They worship the instant they hear heaven's announcement.

Their response models exactly how the reader should react too.

👴 Twenty four elders already appeared before

🙇 Falling down shows total surrender

🎶 They worship immediately at the news

📖 Their response models how we should react

## ⏳ Which Art, And Wast, And Art To Come

This phrase names God as the one who exists outside of time entirely.

He already existed long before anything else was made.

He exists fully right now.

He is also coming in power very soon.

This exact description was already used for God back in chapter one.

The elders use it now because God's promises are finally catching up with reality.

⏳ Names God as outside of time

🕰️ He already existed before everything

⚡ He is coming soon in power

📖 God's promises are catching up with reality

## 🏛️ There Were Lightnings, And Voices, And Thunderings, And An Earthquake, And Great Hail

The temple in heaven now stands wide open for everyone to see.

Inside it sits the ark of the covenant.

That is the same sacred object once hidden in Israel's holiest room.

No human has seen this ark directly since it vanished from history.

Lightning, thunder, voices, and hail now mark heaven's full attention on earth.

God's presence and his judgment are arriving together.

🏛️ The heavenly temple now stands open

📦 The ark of the covenant appears

🙈 No human has seen it in history

📖 God's presence and judgment arrive together
`.trim();

export const REVELATION_ELEVEN_PERSONAL_SECTIONS = parseRevelationElevenRawNotes(REVELATION_ELEVEN_RAW_NOTES);
