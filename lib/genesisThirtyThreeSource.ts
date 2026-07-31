export type GenesisThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyThreeRawNotes(rawText: string): GenesisThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 33:${startVerse}` : `Genesis 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 33 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_THREE_RAW_NOTES = `# Genesis 33:1-3
# 🤝 Jacob Faces Esau At Last
---
## ⚔️ Esau Came, And With Him Four Hundred Men

Twenty years ago Esau promised to kill Jacob for stealing his blessing.

Jacob has not seen his brother since that day.

Four hundred men is the size of a small army.

Jacob still does not know if Esau is coming in anger or in peace.

⚔️ Esau once swore to kill Jacob

👀 Twenty years have passed since then

🪖 Four hundred men is a small army

➡️ Jacob still does not know Esau's intent

## 👩 He Divided The Children

"Handmaids" means female servants who also became Jacob's wives.

Bilhah served Rachel and Zilpah served Leah.

Both women bore Jacob sons who became tribes of Israel.

Jacob places them in a very deliberate order.

The order reveals exactly who Jacob loves most.

👩 Handmaids means female servants and wives

🧵 Bilhah served Rachel and Zilpah served Leah

👶 Both women bore sons for Jacob

➡️ Their placement reveals Jacob's true favorites

## 🔚 Rachel And Joseph Hindermost

"Hindermost" means placed at the very back of the line.

The safest place in a caravan was the back, farthest from danger up front.

Putting Rachel and Joseph there protected them first if Esau attacked.

It also reveals who Jacob loved most.

Genesis already showed Rachel as the wife Jacob wanted from the very beginning.

🔚 Hindermost means placed at the very back

🛡️ The back was the safest position

❤️ Rachel and Joseph were protected first

📖 The order reveals who Jacob loved most

## 🙇 He Bowed Himself To The Ground Seven Times

Bowing to the ground was a way of showing total submission to someone more powerful.

Jacob does this seven times as he walks toward Esau.

Seven was a number tied to completeness in the ancient world.

A full sevenfold bow was an unmistakable signal of humility.

Jacob is not just being polite.

He is publicly surrendering any claim to being Esau's equal.

🙇 Bowing showed total submission to someone

🙏 Seven bows signaled complete humility

🚶 Jacob approached Esau step by step

➡️ Jacob surrendered any claim to equality

# Genesis 33:4-7
# 🤗 Esau Runs To Meet Him
---
## 🏃 Esau Ran To Meet Him

Running was seen as beneath a man of Esau's rank in the ancient world.

Important men usually waited to be approached, not the other way around.

Esau ignores that custom completely.

His run says more than any spoken words could.

Whatever anger he carried for twenty years, it does not survive this moment.

🏃 Running was beneath a man of rank

👑 Important men waited to be approached

💔 Esau ignored that custom completely

➡️ Twenty years of anger did not survive

## 🫂 Fell On His Neck, And Kissed Him

This is the same picture of reconciliation used later for the prodigal son's father.

A kiss on the neck was a warm greeting between close family in this culture.

Esau is not performing politeness.

He is physically closing a distance that fear kept open for twenty years.

Both brothers weep together in this moment.

🫂 This mirrors the prodigal son's welcome home

💋 A neck kiss was a warm greeting

😭 Both brothers weep together here

📖 Fear no longer separates these two brothers

## 👀 Who Are Those With Thee?

Esau notices the large family standing behind Jacob and asks about them.

Jacob answers that God graciously gave him these children.

He still calls himself "thy servant" even though the danger has clearly passed.

Jacob credits God instead of taking pride in his own large family.

👀 Esau notices Jacob's large family

🗣️ Jacob credits God for his children

🙇 Jacob still calls himself Esau's servant

➡️ Humility continues even after the danger passes

## 🚶 After Came Joseph Near And Rachel

Each wife and her children approach Esau in a set order.

The handmaids go first, then Leah, then Rachel and Joseph last.

This is the same protective order Jacob arranged back in verse two.

Naming Joseph ahead of his mother Rachel hints at how much Jacob favors this particular son.

🚶 Each family group approaches in order

🔁 This repeats the order from verse two

👶 Joseph is named ahead of Rachel

📖 Jacob's favorite son is already obvious

# Genesis 33:8-11
# 🎁 Jacob Insists On The Gift
---
## 🐑 What Meanest Thou By All This Drove

"Drove" means a herd of animals moving together.

Esau is asking about the herds he passed on his way to meet Jacob.

Those herds were not random livestock.

Jacob sent them ahead in waves as a planned gift to soften Esau's anger.

The plan already worked before the two brothers even met face to face.

🐑 Drove means a moving herd of animals

🎁 Jacob sent the herds ahead as gifts

😌 The gift was meant to soften Esau

📖 The plan worked before they even met

## 💰 I Have Enough, My Brother

Esau surprises Jacob by refusing the gift at first.

"I have enough" shows Esau has already prospered on his own.

He does not need Jacob's wealth or his charity.

Calling him "my brother" shows the old hostility is genuinely gone.

💰 Esau has already grown wealthy himself

🙅 He does not need Jacob's charity

❤️ My brother replaces old hostility with warmth

➡️ Esau's prosperity is not Jacob's doing

## 🙅 I Have Seen Thy Face, As Though I Had Seen The Face Of God

Jacob is not calling Esau divine.

The night before, Jacob wrestled with God at a place he named Peniel.

There, Jacob expected judgment and received mercy instead.

Now Esau welcomes him with that same unearned mercy.

Seeing forgiveness on his brother's face reminds Jacob of the forgiveness he just received from God.

🙅 Jacob is not calling Esau divine

🌙 At Peniel, Jacob wrestled with God

🕊️ Jacob expected judgment and received mercy

📖 Esau's welcome echoes God's own mercy

## 🎁 He Urged Him, And He Took It

Jacob keeps insisting until Esau finally accepts the gift.

In this culture, receiving a gift confirmed that peace was truly restored.

A refused gift would have left the reconciliation in doubt.

Once Esau takes it, there is no question left between them.

🎁 Jacob insists until Esau accepts

🤝 Accepting a gift confirmed real peace

❓ A refused gift would leave doubt

📖 The gift settles the reconciliation for good

# Genesis 33:12-16
# 🐑 Jacob Declines Esau's Help
---
## 🐑 If Men Should Overdrive Them One Day, All The Flock Will Die

"Overdrive" means pushing animals to move faster than they safely can.

Jacob's flocks include very young animals still nursing.

Esau's four hundred men could travel fast, but Jacob's flocks could not.

Forcing that pace even for one day could kill the weaker animals.

🐑 Overdrive means pushing animals too hard

🍼 Young nursing animals cannot move quickly

🏃 Esau's men could travel much faster

📖 One hard day could kill the flock

## 🐢 I Will Lead On Softly

Jacob promises to travel slowly and catch up with Esau later at Seir.

"Seir" was the mountain region where Esau had already settled, later called Edom.

The rest of the chapter never actually shows Jacob traveling to Seir.

Jacob instead heads toward Succoth and then Shechem in Canaan.

The text does not explain the change of plans.

🐢 Jacob promises to travel slowly

🏔️ Seir was Esau's mountain home, later Edom

🚶 Jacob never actually arrives at Seir

📖 The text leaves that change unexplained

## 🛡️ Let Me Leave With Thee Some Of The Folk

Esau offers to leave some of his four hundred men as an armed escort.

On the surface, this looks like a generous, protective gesture.

An escort from Esau's men would also mean traveling under Esau's authority.

Jacob has already trusted God to protect his family this far.

🛡️ Esau offers some men as an escort

🎁 The offer looks generous on the surface

👑 An escort would mean Esau's authority

📖 Jacob already trusts God for protection

## ❓ What Needeth It?

Jacob politely turns down the offer of an escort.

"What needeth it" is an old way of saying there is no real need.

Jacob is not being rude or ungrateful.

He simply believes God's protection is already enough.

🙅 Jacob politely declines the escort

❓ What needeth it means no real need

😊 Jacob is not being rude here

📖 God's protection is enough for Jacob

# Genesis 33:17-20
# 🏠 Jacob Settles In Canaan
---
## 🏠 Built Him An House, And Made Booths For His Cattle

Abraham and Isaac mostly lived in tents.

Jacob instead builds an actual house at this stop.

A permanent house suggests he planned to stay for a while.

"Booths" were simple shelters made from branches for the animals.

The place takes its name, Succoth, straight from those shelters.

"Succoth" is a Hebrew word meaning shelters.

🏠 Jacob builds a real house here

⛺ Abraham and Isaac mostly lived in tents

🐑 Booths were branch shelters for animals

📖 Succoth means shelters in Hebrew

## 🌍 Jacob Came To Shalem, A City Of Shechem

Jacob has finally reached Canaan, the land God promised to Abraham's family.

"Shechem" names the wider area, and "Shalem" names the city inside it.

Jacob had lived away in Padanaram with Laban for twenty years.

He pitches his tent outside the city instead of moving in.

Even in the promised land, Jacob still lives like a traveler.

🌍 Jacob has finally reached the promised land

🏙️ Shalem was a city inside Shechem

🏡 Padanaram was Laban's homeland far away

➡️ Jacob still lives like a traveler

## 📜 He Bought A Parcel Of A Field

"Parcel" simply means a piece of land.

Jacob buys the ground he had already pitched his tent on.

He buys it from the children of Hamor, the local ruler's family.

The price was one hundred pieces of silver, paid before coins even existed.

This purchase becomes the first piece of Canaan legally owned by Jacob's own family.

📜 Parcel simply means a piece of land

👨 Hamor's family ruled that local area

💰 The price was one hundred pieces of silver

📖 This land becomes Jacob's first legal claim

## ⛪ He Called It EleloheIsrael

After finally reaching Canaan safely, Jacob's first act is worship.

An altar was a place set apart for sacrifice and worship.

The name given, EleloheIsrael, means God, the God of Israel.

Not long before this, God changed Jacob's own name to Israel.

The man once known for deception now worships openly as Israel.

The chapter that opened in fear closes in worship.

⛪ Jacob's first act in Canaan is worship

📖 EleloheIsrael means God, the God of Israel

🔄 God had just renamed Jacob as Israel

➡️ Fear at the chapter's start ends in worship`.trim();

export const GENESIS_THIRTY_THREE_PERSONAL_SECTIONS = parseGenesisThirtyThreeRawNotes(GENESIS_THIRTY_THREE_RAW_NOTES);
