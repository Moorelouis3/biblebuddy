export type SecondChroniclesSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesSevenRawNotes(rawText: string): SecondChroniclesSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 7:${startVerse}` : `2 Chronicles 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 7 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_SEVEN_RAW_NOTES = `# SecondChronicles 7:1-3
# 🔥 Fire Falls On The New Temple
---
## 🙏 When Solomon Had Made An End Of Praying

Solomon had just finished a long prayer of dedication in chapter six.

God answers immediately instead of leaving Solomon waiting.

God had been listening the entire time Solomon spoke.

Every person watching could see the answer arrive at once.

🙏 Solomon had just finished praying

⏱️ God answered right away

👂 God had been listening the whole time

📖 Everyone watching saw the answer arrive

---

## 🔥 The Fire Came Down From Heaven

Fire falling from the sky was a sign that God accepted a sacrifice.

This same sign happened when Aaron's priesthood first began in Leviticus nine.

It happened again later when Elijah faced the prophets of Baal.

God confirmed his approval of this new house the same way he had before.

🔥 Fire from heaven meant God accepted

📜 Aaron's ordination saw this same sign

⚡ Elijah later saw it too

📖 God confirmed the temple the same way

---

## 🐂 Consumed The Burnt Offering And The Sacrifices

A burnt offering was fully burned up on the altar instead of eaten.

It stood for total surrender, an entire animal given completely to God.

"Consumed" here means the fire actually burned it up completely.

Nothing about this offering was left over or wasted.

🐂 Burnt offering means fully burned up

🙌 It pictured total surrender to God

🔥 Consumed means burned up completely

📖 Nothing was left over or wasted

---

## ✨ The Glory Of The LORD Filled The House

Glory here means the visible weight of God's own presence.

This same glory once filled the tabernacle in Exodus forty.

That presence has now moved from a tent into a permanent house.

This was no ordinary building anymore.

God himself had moved in.

✨ Glory means God's visible presence

⛺ The same glory once filled the tabernacle

🏛️ Now it fills a permanent house

📖 God himself had moved in

---

## 🚪 The Priests Could Not Enter Into The House Of The LORD

The glory filling the temple was so strong the priests could not walk inside.

The same thing happened when Moses finished the tabernacle centuries earlier.

The priests were not being punished or turned away.

God's presence was simply too powerful to approach right then.

🚪 Priests could not enter the house

⛺ The same thing happened to Moses

🚫 Not punishment, just overwhelming glory

📖 God's presence was too strong to approach

---

## 🙇 They Bowed Themselves With Their Faces To The Ground

Bowing with your face to the ground was the deepest form of worship here.

This was not a private, quiet moment.

The whole crowd bowed together at once.

Their words afterward, mercy endureth for ever, repeat throughout the book of Psalms.

🙇 Bowing to the ground meant deep worship

👥 The whole crowd responded together

🗣️ Their words echo through the Psalms

📖 Worship followed the fire immediately

# SecondChronicles 7:4-7
# 🐂 The Dedication Sacrifice
---
## 🤝 The King And All The People Offered Sacrifices

This sacrifice was not Solomon acting alone as king.

The whole nation joined him in giving to God.

A king and his people rarely act together this completely.

This moment marked Israel united in worship on the temple's very first day.

🤝 King and people offered together

👑 Solomon did not act alone

🇮🇱 The whole nation joined the worship

📖 Unity marked the temple's very first day

---

## 🐂 Twenty And Two Thousand Oxen And An Hundred And Twenty Thousand Sheep

These numbers describe an enormous royal sacrifice, far beyond any single family's gift.

Most of these animals became peace offerings, meals shared and eaten by the worshippers.

A sacrifice this size could feed the entire gathered nation.

The scale of the gift matched the scale of what God had just done.

🐂 Oxen and sheep numbered in the thousands

🍖 Most became meals for the people

🎉 The whole nation could eat together

📖 The gift matched God's own greatness

---

## 🏛️ Dedicated The House Of God

To dedicate a building meant setting it apart for one single purpose.

This house would never serve as a home, a market, or a fortress.

From this day forward it belonged only to the worship of God.

The dedication made that purpose permanent, not just symbolic for one day.

🏛️ Dedicated means set apart for one purpose

🚫 Never to be used for anything else

🙏 Reserved only for worship

📖 The purpose became permanent that day

---

## 📋 The Priests Waited On Their Offices

"Offices" here means the specific duties already assigned to each priest.

Every priest already had a job to do during temple worship.

This was not confusion or improvising in the moment.

Each man simply carried out the role he had already been given.

📋 Offices means assigned duties

✅ Every priest already had a role

🚫 Nothing was improvised that day

📖 Each man did the job he was given

---

## 🎶 The Levites Also With Instruments Of Musick

These instruments were not a random addition to the ceremony.

King David himself had designed and assigned them years earlier.

First Chronicles twenty five already describes David organizing the Levites into musical groups.

Their music that day fulfilled a plan David never lived to see finished.

🎶 Instruments were David's own design

📜 First Chronicles describes his plan

👑 David set this up years earlier

📖 His plan was fulfilled after his death

---

## 📯 The Priests Sounded Trumpets Before Them

Trumpets in temple worship marked major, formal moments, not casual music.

Only priests were allowed to sound them, never ordinary Levites or singers.

The trumpet blast signaled the whole assembly to respond together.

Every ear in the crowd knew exactly what the sound meant.

📯 Trumpets marked formal, major moments

🚫 Only priests could sound them

👂 The blast cued the whole crowd

📖 Everyone understood the signal instantly

---

## 🔨 Solomon Hallowed The Middle Of The Court

Solomon's own bronze altar could not physically hold this much sacrifice.

So he set apart more ground in the court to use as well.

"Hallowed" here means set apart specifically for God's use.

This detail reveals just how much Israel was offering that day.

🔨 Hallowed means set apart for use

📏 The bronze altar was too small

🐑 The offering was simply too large

📖 The gift outgrew the altar itself

# SecondChronicles 7:8-11
# 📅 The Feast Comes To A Close
---
## 📅 Solomon Kept The Feast Seven Days

This was the Feast of Tabernacles, held every year in the seventh month.

It celebrated the harvest and remembered Israel living in tents after leaving Egypt.

Solomon chose this exact festival for the temple's grand opening.

A new building met one of Israel's oldest yearly traditions.

📅 This was the Feast of Tabernacles

🌾 It celebrated the yearly harvest

⛺ It remembered the wilderness years

📖 A new building met an old story

---

## 🗺️ From The Entering In Of Hamath Unto The River Of Egypt

This phrase describes the full length of the promised land.

Hamath sat far north, near what is now Syria.

The river of Egypt sat far south, near the border of Sinai.

People traveled from both ends of the kingdom for this one celebration.

🗺️ Hamath marked the northern border

🏜️ The river of Egypt marked the south

🚶 People came from both ends

📖 The whole promised land showed up

---

## 🎊 In The Eighth Day They Made A Solemn Assembly

The dedication of the altar lasted seven full days.

The Feast of Tabernacles itself lasted another seven days.

The eighth day added one final gathering after both were complete.

Leviticus twenty three had already commanded this exact eighth day assembly.

🎊 The eighth day was one final gathering

🔢 Two separate seven day periods came first

📜 Leviticus already commanded this pattern

📖 The celebration closed with proper order

---

## 😊 Glad And Merry In Heart

Everyone went home joyful instead of exhausted or resentful.

The text credits their joy to what God had shown, not the party itself.

David, Solomon, and Israel are all named together as receiving God's goodness.

Three generations of one story reach a happy ending in this verse.

😊 The people left joyful, not exhausted

🙏 Their joy came from God's goodness

👨‍👦 David, Solomon, and Israel named together

📖 Three generations share one happy ending

---

## ✅ Thus Solomon Finished The House Of The LORD

Building the temple had taken about seven years, described earlier in the book of Kings.

Solomon also built his own royal palace, which took even longer to finish.

Both projects are mentioned here together to close out the whole building era.

This verse marks the official end of Solomon's greatest construction project.

✅ The temple was finally complete

🏰 Solomon's own palace is mentioned too

📆 Building had taken about seven years

📖 This closes Solomon's greatest project

---

## 🌟 He Prosperously Effected

This phrase simply means every plan Solomon set out to build actually succeeded.

Nothing was left half finished or abandoned partway through.

That kind of success was itself a sign of God's blessing on his reign.

Solomon's wisdom and God's blessing worked together to finish the task.

🌟 Every plan he made succeeded

🚫 Nothing was left half finished

🙌 Success itself showed God's blessing

📖 Wisdom and blessing worked together

# SecondChronicles 7:12-16
# 🌙 The LORD Appears By Night
---
## 🌙 The LORD Appeared To Solomon By Night

God had already appeared to Solomon once before, in a dream at Gibeon.

That first appearance is recorded earlier in the book of First Kings.

This second appearance comes right after the public dedication ends.

Both the public fire and this private word confirm the very same message.

🌙 This was God's second appearance to Solomon

😴 The first came as a dream at Gibeon

🤫 This time God spoke to him privately

📖 Public fire and private words agreed

---

## 👂 I Have Heard Thy Prayer

This directly answers the long prayer Solomon prayed back in chapter six.

God does not leave that prayer hanging without a response.

He confirms he heard every single request Solomon made that day.

A prayer spoken out loud in chapter six gets a spoken answer here.

👂 God directly answers chapter six's prayer

🙏 Nothing Solomon asked went unheard

🗣️ A spoken prayer gets a spoken answer

📖 God chose to respond, not stay silent

---

## 📍 Have Chosen This Place To Myself For An House Of Sacrifice

God is not just accepting the temple, he is claiming it as his own.

"Chosen" means this exact location was picked on purpose, not just convenient.

This same hill was where Abraham once offered Isaac in Genesis twenty two.

One location carries meaning across many generations of the same family.

📍 God claims this place as his own

🎯 Chosen means picked on purpose

📜 The same hill saw Abraham and Isaac

📖 One place, many generations of meaning

---

## ☀️ If I Shut Up Heaven That There Be No Rain

This names the first of three specific judgments God could send.

Rain mattered enormously in a land that depended completely on it for crops.

Locusts and pestilence are named right after this one in the same verse.

All three judgments were tools God could use to get his people's attention.

☀️ Drought is the first judgment named

🌾 Rain meant survival for crops

🦗 Locusts and plague are named next

📖 All three judgments aimed at Israel's attention

---

## 🏷️ If My People Which Are Called By My Name

"Called by my name" means Israel belonged to God in a public, official way.

This is not a description of every person on earth.

It points specifically to the one covenant nation God had already chosen.

Being called by his name came with real responsibility, not just privilege.

🏷️ Called by my name means belonging

🇮🇱 This points to Israel specifically

🚫 Not a promise for every nation

📖 Belonging carried real responsibility

---

## 🙇 Shall Humble Themselves And Pray And Seek My Face

This verse lists four separate actions, not one vague feeling.

Humbling themselves meant admitting they were wrong instead of making excuses.

Seeking God's face meant wanting God himself, not just relief from trouble.

Each step listed here builds on the one before it.

🙇 Four separate actions are listed here

😔 Humbling means admitting real fault

👀 Seeking his face means wanting God himself

📖 Each step builds toward the next

---

## 🔄 And Turn From Their Wicked Ways

Prayer alone was never going to be enough on its own.

This final step required an actual change in behavior, not just words.

Turning meant walking in a new direction than before.

Without this step, the other three actions stayed incomplete.

🔄 Turning means an actual change

🗣️ Words alone were not enough

🚶 A new direction, not just talk

📖 This step completes the other three

---

## 🕊️ Then Will I Hear From Heaven And Will Forgive Their Sin

God promises three separate results here, matched to Israel's four actions.

Hearing comes first, God actually listens to what is prayed.

Forgiving comes next, the guilt itself gets removed.

Healing the land comes last, the actual consequences get reversed.

🕊️ Three promises answer Israel's actions

👂 Hearing means God actually listens

🧼 Forgiving removes the guilt itself

📖 Healing reverses the actual consequences

---

## 👁️ Mine Eyes Shall Be Open And Mine Ears Attent

"Attent" is an old word meaning fully attentive and ready to listen.

God is not just permitting prayer at this location.

He is promising to actively watch for it.

This ties his own attention to one particular building and place.

👁️ Attent means fully attentive

🏛️ God ties his attention to this place

🙏 Prayer here gets real attention

📖 One building, God's ongoing attention

---

## 🏠 I Have Chosen And Sanctified This House

"Sanctified" means set apart as holy, not shared with anything common.

God says his name will stay there forever, not just for one generation.

His eyes and his heart are both described as staying there continually.

This is the strongest promise of permanence given anywhere in the chapter.

🏠 Sanctified means set apart as holy

♾️ God's name stays there forever

❤️ God's heart stays there too

📖 This is the chapter's strongest promise

# SecondChronicles 7:17-18
# 👑 The Promise To Solomon
---
## 🚶 If Thou Wilt Walk Before Me As David Thy Father Walked

God sets David up as the standard Solomon must match.

David was not perfect, but he stayed loyal to God his whole life.

This promise now depends on Solomon's own obedience, not his father's legacy.

A good father's example does not automatically carry over to the next generation.

🚶 David set the standard to follow

👑 David was loyal, not perfect

⚖️ Solomon's own obedience now matters

📖 A parent's example is not automatic

---

## 📜 And Do According To All That I Have Commanded Thee

This points back to every specific law God gave through Moses.

It is not a vague call to be a good person in general.

Obedience here meant following actual, detailed commands.

God expected the same standard from a king that he expected from anyone else.

📜 Points back to the law of Moses

🚫 Not a vague call to be good

✅ Real obedience means real commands

📖 Kings are not held to a lower standard

---

## 👑 Then Will I Stablish The Throne Of Thy Kingdom

"Stablish" is an older spelling of establish, meaning made secure and lasting.

This confirms the promise God already made to David in Second Samuel seven.

The throne would stay within David's own family line going forward.

That promise ultimately points ahead to Jesus, born from David's own line.

👑 Stablish means made secure and lasting

🤝 This confirms the promise to David

👨‍👦 The throne stays in David's family

📖 That promise points ahead to Jesus

---

## 🛡️ There Shall Not Fail Thee A Man To Be Ruler In Israel

This does not promise every single king will be perfect.

It promises David's family line itself will never completely disappear.

Many kings after Solomon failed badly, and still the promise held.

The line survived exile and centuries of hardship until it reached Jesus.

🛡️ Not a promise every king is perfect

👪 David's family line will not disappear

⏳ The line survived exile and centuries

📖 The promise held until it reached Jesus

# SecondChronicles 7:19-22
# ⚠️ The Warning If Israel Turns Away
---
## ⚠️ But If Ye Turn Away And Forsake My Statutes

The word shifts here from thou, meaning Solomon alone, to ye, meaning the whole nation.

This warning was never just about one king's personal choices.

Every future generation of Israel is included in this same condition.

The blessing from verse eighteen could just as easily become a curse.

⚠️ The warning shifts from thou to ye

🇮🇱 Now the whole nation is included

👨‍👦‍👦 Every future generation is included too

📖 A blessing can become a curse

---

## 🗿 And Shall Go And Serve Other Gods And Worship Them

This names the exact sin that would eventually destroy the kingdom.

Serving other gods meant giving to idols the loyalty only God deserved.

This was not a hypothetical danger.

It actually happened later in Israel's history, recorded in Second Kings.

🗿 This names the exact coming sin

💔 Loyalty was given to idols instead

⏳ Second Kings records the failure

📖 This warning actually came true later

---

## 🌱 Then Will I Pluck Them Up By The Roots

This pictures Israel as a plant God himself had planted in this land.

Plucking up by the roots means total removal, not a trim or a setback.

A plant pulled out by its roots does not simply grow back on its own.

This image points directly toward the coming exile out of the promised land.

🌱 Israel is pictured as a planted tree

🚫 Roots means total removal, not a trim

🏜️ A plant like that cannot regrow easily

📖 This points toward the coming exile

---

## 🏛️ This House Which I Have Sanctified Will I Cast Out Of My Sight

Even the temple itself was not permanently protected from judgment.

The very building called holy back in verse sixteen could still be abandoned.

Sanctified status did not make the building untouchable.

God's presence, not the stone and gold, was what actually made it holy.

🏛️ Even the temple was not immune

🔓 Holy status did not make it untouchable

✨ God's presence made it holy, not stone

📖 The building itself could be abandoned

---

## 🗯️ A Proverb And A Byword Among All Nations

A proverb here meant a cautionary example other nations would repeat as a lesson.

A byword meant the nation's own name would become an insult or a punchline.

Israel was meant to be a light to other nations, not a warning story.

This reversal would be humiliating precisely because Israel was supposed to represent God well.

🗯️ Proverb means a cautionary example

😬 Byword means becoming an insult

💡 Israel was meant to be a light

📖 This reversal would be deeply humiliating

---

## 😲 Shall Be An Astonishment To Every One That Passeth By

"Astonishment" here means shocked silence, not simple surprise.

Travelers passing a ruined temple would stop and stare in disbelief.

A building this famous falling apart would draw attention from every direction.

Its fall would match its former glory.

😲 Astonishment means shocked silence

🚶 Travelers would stop and stare

🌍 The ruin would draw wide attention

📖 Its fall would match its former glory

---

## ❓ Why Hath The LORD Done Thus Unto This Land And Unto This House

This imagines a future conversation between two people looking at the ruins.

One person naturally would ask why such a holy place had fallen apart.

Putting the question directly into the text makes the coming disaster feel certain.

This is not written as a maybe, it is written as something that will happen.

❓ A future question is imagined here

👥 Two people discuss the ruins

😢 The question shows real confusion

📖 The disaster is treated as certain

---

## 🔑 Because They Forsook The LORD God Of Their Fathers

This is the answer given to the question just asked in the verse before.

The cause and effect are stated plainly, with no confusion left for the reader.

Forsaking God led directly to losing both the land and the temple.

Second Kings twenty five later shows this exact prediction actually happening.

🔑 This answers the question directly

➡️ Forsaking God caused the loss

🏚️ Both the land and temple were lost

📖 Second Kings shows this exactly fulfilled

---

## ⚖️ Therefore Hath He Brought All This Evil Upon Them

This is the chapter's final verse, and it ends on judgment, not celebration.

The word evil here means disaster and consequence, not moral wickedness from God.

Everything promised back in verses twelve through twenty two connects to this one line.

The whole chapter moves from glory at the start to warning at the very end.

⚖️ The chapter ends on judgment

🌩️ Evil here means disaster, not wickedness

🔗 This connects to every warning before it

📖 Glory opens the chapter, warning closes it
`.trim();

export const SECOND_CHRONICLES_SEVEN_PERSONAL_SECTIONS = parseSecondChroniclesSevenRawNotes(SECOND_CHRONICLES_SEVEN_RAW_NOTES);
