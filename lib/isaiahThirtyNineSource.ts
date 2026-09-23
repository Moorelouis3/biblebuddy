export type IsaiahThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyNineRawNotes(rawText: string): IsaiahThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 39:${startVerse}` : `Isaiah 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 39 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_NINE_RAW_NOTES = `# Isaiah 39:1-2
# 🎁 Envoys From Babylon
---
## 👑 Merodachbaladan, The Son Of Baladan, King Of Babylon

Merodachbaladan was a real king, known from ancient records outside the Bible.

He ruled Chaldea, the region that later became the heart of the Babylonian empire.

Assyria was the dominant power of this era.

Babylon kept trying to break free from it.

Merodachbaladan seized the Babylonian throne more than once in open defiance of Assyria.

A rebel king reaching out to Judah was reaching out to a fellow enemy of the same empire.

This gift was not simple kindness.

It was politics.

👑 Merodachbaladan was a real Babylonian king

⚔️ Assyria was the era's dominant power

🤝 Babylon and Judah shared a common enemy

📖 This gift carried a political purpose

## ✉️ Sent Letters And A Present

Sending letters and a gift was the normal way ancient kings opened diplomatic contact.

A present like this was never just a courtesy.

It was an opening move, feeling out whether Judah might become an ally.

Babylon and Judah were both under Assyria's shadow at this time.

A shared enemy made an unlikely friendship worth exploring.

Hezekiah was being tested, not just congratulated.

✉️ Letters and gifts opened royal diplomacy

🎯 This gift was a diplomatic opening move

🛡️ Babylon and Judah shared Assyria as an enemy

📖 Hezekiah was being tested, not congratulated

## 💊 He Had Been Sick, And Was Recovered

This phrase links directly back to the previous chapter.

Isaiah thirty eight already told how Hezekiah was sick to the point of death.

God added fifteen years to his life after that prayer.

News like a king's recovery traveled far in the ancient world.

Second Chronicles adds that the Babylonian envoys also came to ask about a wonder done in the land.

That wonder was the shadow moving backward on the sundial.

Hezekiah's healing was never a private event.

🔗 This links back to Isaiah thirty eight

💊 God added fifteen years to his life

🌍 News of the recovery traveled far

📖 Envoys came for the recovery and the sign

## 🔓 Shewed Them The House Of His Precious Things

Shewed simply means showed, an old spelling still common in the King James Version.

Hezekiah personally walked the Babylonian envoys through his own royal treasury.

A treasury like this was normally guarded and kept private.

Opening it to foreign visitors was an unusual and telling choice.

Second Chronicles says plainly that Hezekiah's heart was lifted up with pride at this time.

Pride had crept in right after his greatest moment of humility.

🏰 Shewed is an old word for showed

🔓 Hezekiah opened his private treasury to strangers

😳 This exposure was unusual for a king

📖 Pride followed his greatest moment of humility

## 🙈 That Hezekiah Shewed Them Not

This phrase means Hezekiah held nothing back at all.

Every treasure, every weapon, every valuable object in the kingdom was put on display.

Total transparency to a foreign power was never wise, even for an honored guest.

Kings usually kept their military and financial strength hidden from outsiders.

Isaiah is about to reveal just how costly that openness will become.

🙈 Nothing in the kingdom stayed hidden

⚔️ Even his military strength was revealed

🚫 Foreign transparency was rarely a wise move

📖 This openness is about to carry a cost

# Isaiah 39:3-4
# ❓ Isaiah Questions The King
---
## 🚶 Then Came Isaiah The Prophet Unto King Hezekiah

Isaiah does not wait to be summoned.

He walks straight into the palace to question the king himself.

A prophet's job included holding even a good king accountable.

Hezekiah had just been the hero of chapters thirty six through thirty eight.

No king, however faithful, was ever above a hard question from God's prophet.

🚶 Isaiah approached the king without being summoned

📜 Prophets held even good kings accountable

👑 Hezekiah had just been the story's hero

📖 No king stood above God's correction

## 📍 From Whence Came They Unto Thee

Whence is an old word meaning from where.

Isaiah already knows these are foreign visitors.

His question is not really about geography.

It is designed to make Hezekiah explain himself out loud.

Good questions can expose what a person has not yet admitted, even to themselves.

📍 Whence is an old word for where

🎯 Isaiah's question was not about geography

🗣️ It pushed Hezekiah to explain himself

📖 A good question can expose the heart

## 🌍 Even From Babylon

Babylon was not the empire threatening Judah in Hezekiah's own lifetime.

Assyria held that role throughout chapters thirty six and thirty seven.

Hezekiah says the word Babylon here with no sense of danger in it.

That name is about to carry a weight he does not yet understand.

The very kingdom offering friendship today will be the kingdom that conquers tomorrow.

🌍 Babylon was not yet Judah's enemy

⚔️ Assyria was the danger in Hezekiah's day

😌 Hezekiah names Babylon without any fear

📖 Today's friend becomes tomorrow's conqueror

## 🗣️ There Is Nothing Among My Treasures That I Have Not Shewed Them

Hezekiah repeats his own openness without any hint of regret.

He does not sense he has done anything wrong yet.

Answering honestly here still does not make the choice a wise one.

A clear conscience is not the same thing as good judgment.

Isaiah is about to show him the difference.

🗣️ Hezekiah repeats his answer with no regret

😇 He does not yet sense any wrongdoing

⚖️ Honesty and wisdom are not the same thing

📖 Isaiah is about to show him the gap

# Isaiah 39:5-7
# ⚠️ The Word That Follows
---
## 👑 Hear The Word Of The LORD Of Hosts

LORD of hosts is a title for God as commander over every army in heaven and on earth.

This is not Isaiah's personal opinion being offered.

It is a formal announcement carrying the full weight of God's own authority.

Hear here means more than simply listening.

It means prepare, because what follows will not be undone.

👑 LORD of hosts means commander over all armies

📜 This message carries God's own authority

👂 Hear means prepare, not just listen

📖 What comes next will not be undone

## 👀 Behold, The Days Come

Behold is an old word meaning pay close attention, look here.

Days come is a common prophetic phrase pointing toward a future certainty.

Isaiah does not name an exact year.

He announces the event as settled, even though it is still far off.

Certainty from God does not depend on timing being revealed.

👀 Behold means look here, pay attention

📅 Days come signals a certain future event

🔮 No exact year is given

📖 God's certainty does not depend on timing

## 🏛️ Shall Be Carried To Babylon

This is the first time Isaiah names Babylon as Judah's future captor.

Assyria was still the empire everyone feared at this point in the story.

Babylon would not even rise to full power for about another century.

God was revealing an enemy that did not yet exist as a real threat.

A true prophet can name tomorrow's danger before today's experts see it coming.

🏛️ Babylon is named as the future captor

⚔️ Assyria was still the current threat

⏳ Babylon's rise was still a century away

📖 True prophecy can see past today's danger

## 🔁 Nothing Shall Be Left, Saith The LORD

This judgment matches the totality of Hezekiah's own display.

He showed the envoys everything he owned.

Now everything he owns is what will be carried away.

The punishment mirrors the exact shape of the sin.

What Hezekiah revealed freely will be taken from him completely.

🔁 The judgment mirrors Hezekiah's own display

👐 He once showed everything freely

📦 Now everything will be taken away

📖 The punishment matches the shape of the sin

## 👶 They Shall Be Eunuchs In The Palace Of The King Of Babylon

Eunuchs were male servants who could not have children of their own, often serving inside a royal court.

Some of Hezekiah's own descendants would grow up serving a foreign king instead of ruling their own people.

This part of the prophecy came true generations later.

Daniel and his three friends were taken to serve in exactly this kind of Babylonian court.

A judgment announced in Hezekiah's palace was still unfolding a hundred years afterward.

👶 Eunuchs could not have children of their own

👑 Hezekiah's own descendants would serve a foreign king

📚 This came true many years later

📖 Daniel later lived out this very prophecy

# Isaiah 39:8
# 🕊️ Peace In His Own Days
---
## 😌 Good Is The Word Of The LORD Which Thou Hast Spoken

Hezekiah does not argue with this prophecy the way he might have expected to.

He calls a message about future captivity good.

In chapter thirty eight he wept and pleaded when his own life was threatened.

Here the threat falls on his children and grandchildren instead of himself.

Many scholars believe his calm response reveals more relief than real grief.

😌 Hezekiah accepts this news calmly

😢 He once wept over his own life

👪 This threat falls on later generations instead

📖 Calm here may hide quiet relief

## 🕊️ There Shall Be Peace And Truth In My Days

Peace and truth in my days means safety for the rest of his reign.

It does not mean God's warning about Babylon was cancelled.

Manasseh, the very son born during Hezekiah's added fifteen years, later became one of Judah's most wicked kings.

His sins helped push the nation closer to the exile Isaiah just described.

A peaceful ending for one king did not erase the cost still coming for his family.

🕊️ Peace here means safety in his own reign

🚫 God's warning about Babylon was not cancelled

👑 Manasseh later became a wicked king

📖 One king's peace did not erase the cost
`.trim();

export const ISAIAH_THIRTY_NINE_PERSONAL_SECTIONS = parseIsaiahThirtyNineRawNotes(ISAIAH_THIRTY_NINE_RAW_NOTES);
