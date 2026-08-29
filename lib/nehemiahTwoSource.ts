export type NehemiahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahTwoRawNotes(rawText: string): NehemiahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 2:${startVerse}` : `Nehemiah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Nehemiah 2 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_TWO_RAW_NOTES = `# Nehemiah 2:1-3
# 😨 Nehemiah's Sad Face Before The King
---
## 🗓️ In The Month Nisan

Nisan was a Hebrew month that falls in our March and April.

Chapter one happened back in the month Chisleu, four months earlier.

Nehemiah had been carrying this grief silently the whole time.

He waited for the right moment instead of acting in a rush.

🗓️ Nisan falls in March and April

⏳ Four months passed since chapter one

🤐 Nehemiah carried his grief silently

📖 He waited for the right moment

## 😐 I Had Not Been Beforetime Sad In His Presence

Beforetime means never before this moment.

Cupbearers were expected to always appear calm and pleasant.

A sad face near the king could look like plotting against him.

Nehemiah had kept his grief completely hidden until now.

😐 Beforetime means never before now

🍷 Cupbearers had to appear calm

⚠️ A sad face could look like plotting

📖 Nehemiah had hidden his grief until now

## 👑 This Is Nothing Else But Sorrow Of Heart

The king read Nehemiah's face correctly on his own.

Sorrow of heart means a deep inward grief, not a passing mood.

No one had told the king anything yet.

He simply noticed what a friend would notice.

👑 The king read his face correctly

💔 Sorrow of heart means deep inward grief

🤫 No one had told him anything

📖 He noticed what a friend would notice

## 😨 Then I Was Very Sore Afraid

Sore here means extremely, not sick or hurt.

Nehemiah's own fear tells us how dangerous this moment was.

A servant caught grieving near the king risked being seen as disloyal.

His fear did not stop him from answering honestly.

😨 Sore means extremely, not injured

⚠️ The moment carried real danger

🎭 Grief near the king looked disloyal

📖 Fear did not stop his honesty

## 🗣️ Let The King Live For Ever

This was a standard court greeting, not a private wish.

Servants and officials used it before speaking to Persian kings.

Nehemiah is buying himself a moment before the real answer.

The custom shows how carefully every word had to be chosen.

🗣️ This was a standard court greeting

👑 Officials used it before Persian kings

⏱️ Nehemiah gains a moment before answering

📖 Court speech had to be chosen carefully

## ⚰️ The Place Of My Fathers' Sepulchres

Sepulchres means burial tombs, the resting place of ancestors.

Family tombs marked a deep and lasting connection to a homeland.

Nehemiah is naming the reason grief and love, not politics.

This answer explains his sadness without yet asking for anything.

⚰️ Sepulchres means ancestral burial tombs

🏡 Tombs marked a lasting connection to home

❤️ Grief here came from love, not politics

📖 This explains his sadness before any request

# Nehemiah 2:4-6
# 🙏 A Silent Prayer Between Two Sentences
---
## 👑 For What Dost Thou Make Request

The king is now directly inviting Nehemiah to ask for something.

This kind of open offer from a Persian king was rare.

Nehemiah has one brief moment to answer before the chance passes.

Everything he says next has to be exactly right.

👑 The king invites a direct request

🎁 This kind of offer was rare

⏱️ Nehemiah has only a brief moment

📖 His next words have to be exactly right

## 🙏 So I Prayed To The God Of Heaven

Nehemiah prayed in the space of a single heartbeat.

The king was still standing right in front of him.

This shows prayer does not always need a quiet room.

A short silent prayer can happen in the middle of a conversation.

🙏 Nehemiah prayed in an instant

👑 The king stood right in front of him

🤐 Prayer does not need a quiet room

📖 Even a conversation can hold a silent prayer

## 🗣️ If It Please The King, And If Thy Servant Have Found Favour In Thy Sight

This phrase is another layer of careful court language.

Nehemiah is showing full respect before his actual request.

Favour in thy sight means being viewed with approval and good will.

He is not demanding anything.

He is asking humbly.

🗣️ This is careful court language

🙇 Nehemiah shows respect before asking

💛 Favour in thy sight means approval

📖 He is asking humbly, not demanding

## 🎯 That I May Build It

This is the actual request hiding underneath all the polite language.

Nehemiah wants permission to travel to Jerusalem and rebuild the wall.

Everything said before this line was preparation for this one moment.

The real ask is short, but it carries everything chapter one was about.

🎯 This is the real request

🧱 He asks to rebuild the wall

🗣️ Earlier words prepared for this moment

📖 One short line carries all of chapter one

## 👸 The Queen Also Sitting By Him

This detail is easy to miss on a quick reading.

Persian queens did not normally sit in on official meetings like this.

Some scholars believe her presence hints this was a more personal, informal moment.

Small details like this show the writer was really there.

👸 Queens rarely joined meetings like this

🤔 Many scholars believe this was personal

✍️ Small details show the writer was there

📖 Nehemiah remembered even this small moment

## ⏳ I Set Him A Time

Nehemiah gave the king an actual timeframe for his return.

This detail shows real planning, not just a vague wish.

Later chapters reveal Nehemiah kept this promise and returned to Persia.

A clear plan made the king comfortable saying yes.

⏳ Nehemiah gave a real timeframe

📝 This shows real planning, not a wish

🔙 He later returned to Persia as promised

📖 A clear plan made the king say yes

# Nehemiah 2:7-8
# 📜 Letters For The Journey
---
## 📜 Let Letters Be Given Me

Nehemiah is asking for official Persian travel documents.

These letters worked like a royal passport through the empire.

Without them, local officials had no reason to help or protect him.

Ezra had once refused an armed escort and relied only on prayer.

Nehemiah instead asks for official paperwork to secure safe passage.

📜 Nehemiah asks for official documents

🛂 The letters worked like a passport

🤝 Officials needed a reason to help him

📖 He chose paperwork instead of an escort

## 🗺️ The Governors Beyond The River

This title referred to Persian officials over the whole region past the Euphrates.

Judah was one small province inside that much larger territory.

These governors answered directly to the king in Persia.

Nehemiah needed their cooperation to travel safely through their land.

🗺️ This meant officials past the Euphrates

🏛️ Judah was a small province inside it

👑 These governors answered to the king

📖 Nehemiah needed their safe cooperation

## 🌲 Asaph The Keeper Of The King's Forest

Asaph managed a royal forest, likely somewhere in the region of Lebanon.

His title shows the Persian empire kept careful control over valuable resources.

Nehemiah needed his permission to legally take timber for building.

This is the only place in the Bible this man is named.

🌲 Asaph managed a royal forest

👑 Persia controlled its valuable resources

🪵 Nehemiah needed permission for timber

📖 Asaph appears only this one time

## 🚪 Timber To Make Beams For The Gates

The city gates needed strong wooden beams to support their structure.

Fire had already destroyed the wooden parts mentioned back in chapter one.

Stone alone could not rebuild a working, closing gate.

This request shows Nehemiah had already planned exactly what building required.

🚪 Gates needed strong wooden beams

🔥 Fire had destroyed the wood before

🪨 Stone alone could not finish a gate

📖 Nehemiah had already planned what building needed

## ✋ According To The Good Hand Of My God Upon Me

This exact phrase appears several times across Ezra and Nehemiah.

It credits God directly for a favorable outcome with a human king.

Nehemiah refuses to take personal credit for the king saying yes.

The same phrase describes Ezra's earlier journey to Jerusalem.

✋ This phrase repeats across both books

🙌 It credits God for the outcome

🚫 Nehemiah refuses to take personal credit

📖 The same words describe Ezra's journey

# Nehemiah 2:9-10
# ⚔️ The First Enemies Appear
---
## 🛡️ Captains Of The Army And Horsemen

The king sent armed soldiers along with Nehemiah for this journey.

This detail stands in contrast to Ezra's earlier decision to travel unguarded.

Ezra had wanted to publicly trust God rather than ask for troops.

Nehemiah's mission instead came with a visible royal escort.

🛡️ Soldiers traveled with Nehemiah this time

🙏 Ezra had traveled without an escort

✝️ Ezra trusted God publicly instead

📖 Nehemiah's mission carried a royal escort

## 🏙️ Sanballat The Horonite

Horonite likely means he came from Beth Horon or a similar town.

Sanballat held real political power in the region near Samaria.

He becomes Nehemiah's most persistent opponent through the rest of the book.

Many scholars believe his name honors the moon god Sin.

🏙️ Horonite likely names his hometown

👑 Sanballat held power near Samaria

😠 He becomes Nehemiah's main opponent

📖 His name likely points to a pagan background

## 📋 Tobiah The Servant, The Ammonite

Servant here likely means an official title, not a literal slave.

Ammonite marks him as coming from a nation with a long history of conflict with Israel.

Tobiah later marries into a prominent Jewish family, giving him inside influence.

His mixed connections make him a uniquely dangerous opponent.

📋 Servant here means an official title

🗺️ Ammonite marks a rival nation

💍 Tobiah later marries into a Jewish family

📖 His mixed ties make him dangerous

## 😡 It Grieved Them Exceedingly

Exceedingly means to an extreme, unusual degree.

These men were not just annoyed.

They felt a deep and real threat.

Someone was seeking good for Israel.

That alone angered them deeply.

😡 Exceedingly means to an extreme degree

⚠️ This was not simple annoyance

🎯 Someone was seeking good for Israel

📖 Their anger reveals what they had to lose

# Nehemiah 2:11-14
# 🌙 A Secret Night Ride Around The Walls
---
## 🛌 Was There Three Days

Nehemiah rested and gathered information before taking any public action.

Ezra also waited three days after first arriving in Jerusalem.

This pause let travel weariness pass before serious work began.

Patience here comes before the plan, not instead of it.

🛌 Nehemiah rested before acting

🔁 Ezra also waited three days

⏳ Weariness needed time to pass

📖 Patience came before the plan

## 🌙 I Arose In The Night

Nehemiah chose darkness on purpose, not out of fear.

A public survey too early could have stirred up opposition immediately.

He wanted facts first, before anyone could interfere with his plans.

Wise leaders often gather information quietly before announcing a decision.

🌙 Nehemiah chose darkness on purpose

🚫 An early public survey risked opposition

🔍 He wanted facts before announcing anything

📖 Quiet planning came before any decision

## 💡 What My God Had Put In My Heart To Do

Nehemiah describes his plan as something God placed inside him.

This is not a claim of a dramatic vision or voice.

It describes a settled, God given sense of purpose and direction.

The same kind of language appears elsewhere describing a calling.

💡 God placed this plan in him

🙅 This was not a dramatic vision

🧭 It was a settled sense of purpose

📖 Scripture often describes a calling this way

## 🐴 Neither Was There Any Beast With Me, Save The Beast That I Rode Upon

Nehemiah kept this first trip small and quiet on purpose.

Only one animal and a handful of men went with him.

A large group at night would have drawn immediate attention.

Small scale planning matched the secrecy of the whole mission.

🐴 Only one animal went with him

🤏 The group stayed small on purpose

👀 A large group would draw attention

📖 Small scale matched the secrecy

## 🚪 The Gate Of The Valley

This gate sat on the western side of Jerusalem's wall.

It opened toward the Hinnom Valley, a low area outside the city.

Starting here let Nehemiah begin his loop around the broken wall.

Gates like this one gave the only real way in or out.

🚪 This gate faced the Hinnom Valley

🗺️ It sat on the western wall

🔄 Nehemiah began his loop here

📖 Gates controlled entry to the city

## 🚪 The Dung Port

Port here is an older word for a gate, not a harbor.

This gate was used to carry waste out of the city.

Its name was not glamorous, but its location mattered greatly.

Later in the book, this same gate gets faithfully repaired.

🚪 Port here is an older word for gate

🗑️ This gate carried waste out

📍 Its plain name still mattered

📖 This gate is later repaired faithfully

## ⛲ The Gate Of The Fountain, And To The King's Pool

The fountain gate stood near a natural spring outside the city.

The king's pool was likely a reservoir connected to that same water source.

Water access was essential to any city under siege or rebuilding.

Nehemiah is checking every piece of infrastructure, not just the walls.

⛲ This gate stood near a spring

💧 The king's pool held that water

🏙️ Water access mattered to the whole city

📖 Nehemiah checked infrastructure, not just walls

## 🪨 No Place For The Beast That Was Under Me To Pass

The rubble here was piled too high for an animal to climb over.

This detail proves Nehemiah actually rode the wall's full perimeter that night.

He had to dismount and continue the rest of the survey on foot.

The damage was worse than any report could have described.

🪨 Rubble was piled too high to cross

🐴 This proves he rode the wall himself

🚶 He continued the rest on foot

📖 The damage was worse than any report

# Nehemiah 2:15-16
# 🤫 No One Knew Yet
---
## 🏞️ Went I Up In The Night By The Brook

This brook is likely the Kidron Valley, east of the city.

Rubble blocked his path here just like it had elsewhere.

Nehemiah kept surveying even after his animal could no longer pass.

His commitment to seeing the full damage did not stop at one obstacle.

🏞️ This brook is likely the Kidron Valley

🪨 Rubble blocked his path again

🚶 He kept surveying on foot

📖 One obstacle did not stop him

## 🧭 The Rulers Knew Not Whither I Went

Whither is an old word meaning to where.

Even Jerusalem's own leaders had no idea what Nehemiah was doing.

This secrecy protected the plan from gossip and from early opposition.

Nehemiah wanted facts settled before any debate could begin.

🧭 Whither is an old word for where

🤷 Even local leaders did not know

🤐 Secrecy kept the plan safe

📖 Facts came before any debate

## 📋 Neither Had I As Yet Told It To The Jews, Nor To The Priests, Nor To The Nobles, Nor To The Rulers

Nehemiah lists every group in the city, one by one.

Priests, nobles, and rulers together represented the entire local leadership.

Not a single one of them had been told anything yet.

This complete list shows just how carefully guarded the secret was.

📋 Nehemiah lists every group by name

⛪ Priests, nobles, and rulers led the city

🤐 None of them knew yet

📖 The list shows how guarded it was

## 🔨 Nor To The Rest That Did The Work

This phrase points ahead to the workers who will soon rebuild the wall.

Even the future builders had not yet heard the plan.

Nehemiah wanted the survey finished before recruiting a single worker.

His method was to observe first, then organize, then act.

🔨 This points to the future builders

🤷 Even they did not know yet

🔍 The survey came before recruiting

📖 Observe, then organize, then act

# Nehemiah 2:17-18
# 🧱 The People Say Yes
---
## 🗣️ Ye See The Distress That We Are In

Nehemiah finally speaks publicly after days of silent observation.

He does not lecture the people.

He simply names what they already feel.

Distress here means real, ongoing hardship.

Naming a shared problem out loud is often the first step toward fixing it.

🗣️ Nehemiah finally speaks publicly

👂 He names what people already feel

😔 Distress means real ongoing hardship

📖 Naming a problem starts the fix

## 😳 That We Be No More A Reproach

Reproach means public shame, the same word used back in chapter one.

Nehemiah connects tonight's plan directly to his earlier private prayer.

The broken wall was not just unsafe.

It was a source of humiliation.

Removing that shame becomes the whole point of the project.

😳 Reproach means public shame again

🔗 This connects to chapter one's prayer

🧱 The wall was a source of humiliation

📖 Removing shame becomes the whole goal

## ✋ The Hand Of My God Which Was Good Upon Me

Nehemiah gives the people evidence, not just an emotional appeal.

He tells them exactly how God had worked through the king.

A public testimony builds real confidence, more than a simple command could.

This same phrase has now appeared several times across the book.

✋ Nehemiah offers evidence, not just emotion

👑 He explains how God worked through the king

💪 Testimony builds confidence better than command

📖 This phrase has repeated across the book

## 🙌 Let Us Rise Up And Build

This is the people's own response, not a command from Nehemiah.

Their quick agreement shows the testimony had genuinely persuaded them.

Rising up here pictures leaving passive despair for active work.

A shared decision like this carries far more weight than one man's order.

🙌 This is the people's own response

✅ Testimony had genuinely persuaded them

🏃 Rising up means leaving despair behind

📖 A shared decision carries real weight

## 🤝 They Strengthened Their Hands For This Good Work

This is an idiom meaning they encouraged one another and got ready.

It does not describe a literal physical exercise.

The same phrase appears earlier in Ezra describing a similar moment.

United resolve is what turns a plan into an actual project.

🤝 This idiom means encouraging one another

🚫 It is not a literal exercise

🔁 The same phrase appears in Ezra

📖 United resolve turns plans into projects

# Nehemiah 2:19-20
# 🚫 No Portion, No Right, No Memorial
---
## 🐫 Geshem The Arabian

Geshem was likely a powerful tribal leader controlling trade routes nearby.

He becomes the third member of a consistent group of opponents.

Sanballat, Tobiah, and Geshem each represented a different regional power.

Together they surrounded Judah on multiple sides at once.

🐫 Geshem likely controlled nearby trade routes

👥 He is the third opponent named

🗺️ Each man represented a different region

📖 Together they surrounded Judah on all sides

## 😂 They Laughed Us To Scorn, And Despised Us

Scorn means open, public mockery meant to humiliate.

These men expected laughter alone to end the project quickly.

Despised here means treated as worthless or beneath notice.

Mockery was their first weapon, before any physical threat came later.

😂 Scorn means open public mockery

🎯 They expected laughter to stop the project

👎 Despised means treated as worthless

📖 Mockery came before any physical threat

## ⚠️ Will Ye Rebel Against The King

This accusation was far more dangerous than simple mockery.

Rebellion against the Persian king could be punished as a serious crime.

The enemies knew Nehemiah's permission depended entirely on the king's continued favor.

This question tried to plant fear right where Nehemiah felt safest.

⚠️ This charge was more than mockery

⚖️ Rebellion could be punished as a crime

🎯 They targeted his royal permission

📖 Fear was aimed at his safest ground

## 🌌 The God Of Heaven, He Will Prosper Us

Nehemiah answers a political threat with a spiritual declaration.

He does not argue about Persian law or royal politics at all.

Prosper here means God will cause the work to succeed.

His confidence rests on God, not on his own legal standing.

🌌 Nehemiah answers with a spiritual declaration

🚫 He skips arguing Persian politics

📈 Prosper means God will bring success

📖 His confidence rests on God alone

## 📜 Ye Have No Portion, Nor Right, Nor Memorial, In Jerusalem

Portion, right, and memorial are three separate legal and covenant terms.

Portion means a share of the land or inheritance.

Right means a legal claim recognized by the community.

Memorial means a lasting name or remembrance within the city.

Nehemiah is telling these men plainly that Jerusalem's future is not theirs.

📜 Three separate covenant terms are used

🏡 Portion means a share of the land

⚖️ Right means a recognized legal claim

📖 Jerusalem's future was never theirs to claim
`.trim();

export const NEHEMIAH_TWO_PERSONAL_SECTIONS = parseNehemiahTwoRawNotes(NEHEMIAH_TWO_RAW_NOTES);
