export type GenesisFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortySixRawNotes(rawText: string): GenesisFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 46:${startVerse}` : `Genesis 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 46 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_SIX_RAW_NOTES = `# Genesis 46:1-4
# 🐂 Sacrifice At Beersheba
---
## 🙏 Offered Sacrifices Unto The God Of His Father Isaac

Beersheba sat at the southern edge of Canaan, the last stop before leaving the promised land.

Isaac had lived there and built an altar of his own back in Genesis twenty six.

Jacob stops to worship at the same place his father once worshiped.

This sacrifice marks the last act of worship before Egypt begins.

🗺️ Beersheba marks Canaan's southern edge

🙏 Isaac had worshiped there before him

📍 Jacob honors his father's ground

📖 One last act of worship before Egypt

---

## 📛 Jacob, Jacob

God calls Jacob by name twice in a row.

That kind of double call marks an important moment in scripture.

Abraham and Moses both hear their names spoken the same way at key turning points.

The repetition itself is a signal before God even says what comes next.

📛 A name spoken twice marks importance

🔁 Abraham and Moses heard this too

⏳ The signal comes before the message

📖 God gets full attention before He speaks

---

## 🗣️ Here Am I

Jacob answers without hesitation.

Here am I means full attention and full willingness to listen.

He does not ask what God wants before agreeing to listen first.

This short answer matches the same words Abraham once gave in Genesis twenty two.

🗣️ Here am I means ready attention

✅ Jacob answers before asking why

🔁 Abraham used this same phrase

📖 Willingness comes before understanding

---

## 😨 Fear Not To Go Down Into Egypt

Jacob had good reason to be afraid of this move.

Egypt was a foreign land full of foreign gods, far from the land God had promised his family.

God speaks directly into that fear before Jacob even asks a question.

The command not to fear comes with a promise attached to it.

😨 Jacob had real reason for fear

🌍 Egypt worshiped different gods entirely

🛡️ God speaks before Jacob can ask

📖 The command comes with a promise attached

---

## 🌱 I Will There Make Of Thee A Great Nation

This promise reaches back to God's covenant with Abraham.

Jacob's family enters Egypt as a small clan of about seventy people.

God says plainly that Egypt is where that clan will grow into a nation.

The place Jacob fears becomes the place God chooses for growth.

📜 Echoes God's covenant with Abraham

👪 The family enters as a small clan

🌱 Egypt becomes the place of growth

📖 Fear and promise sit side by side

---

## ⬆️ I Will Also Surely Bring Thee Up Again

This promise wraps around the whole story still to come.

God says He will go down into Egypt with Jacob, and also bring him back up again.

Jacob dies in Egypt, but his body later gets carried back to Canaan for burial.

The promise covers far more than just this one trip.

⬇️ God goes down into Egypt too

⬆️ God promises to bring him back up

⚰️ Jacob is later buried back in Canaan

📖 One promise covers his whole future

---

## 👋 Joseph Shall Put His Hand Upon Thine Eyes

This phrase means Joseph will be present at Jacob's death, closing his eyes as a final act of honor.

In this culture, the nearest loved one performed that gesture for the dying.

Jacob had believed for years that Joseph was dead.

God promises the opposite ending, Joseph present and caring for him at the very end.

👋 Closing the eyes was a final honor

❤️ The nearest loved one performed it

😭 Jacob once believed Joseph was dead

📖 God promises the opposite ending

# Genesis 46:5-7
# 🛤️ The Whole Household Moves
---
## 🐴 Carried Jacob Their Father In The Wagons Which Pharaoh Had Sent

Jacob was old and could not make this journey on foot.

Pharaoh had already sent wagons all the way from Egypt for this exact purpose, back in chapter forty five.

Riding in a wagon instead of walking was also a mark of honor for someone this important.

Every generation of the family moves together in this one caravan.

👴 Jacob was too old to walk the distance

🎁 Pharaoh had already sent the wagons

👑 Riding marked Jacob as honored

📖 The whole family travels as one group

---

## 🐑 Which They Had Gotten In The Land Of Canaan

This detail proves the family left nothing behind.

Every animal and every possession earned honestly in Canaan travels with them into Egypt.

They are not arriving as refugees with empty hands.

They arrive as a household bringing its own wealth into a new land.

🐑 Nothing was left behind in Canaan

💰 Their wealth traveled with them

🚫 They did not arrive empty handed

📖 A household, not a band of refugees

---

## 👨‍👩‍👧‍👦 His Sons, And His Sons' Sons With Him, His Daughters, And His Sons' Daughters

This verse counts far more than the twelve named sons of Jacob.

Grandsons, granddaughters, and other daughters all traveled together as one extended family.

The text takes time to name every layer of the family tree.

That level of detail sets up the exact headcount coming later in the chapter.

👨‍👩‍👧‍👦 More than twelve sons made this trip

🌳 Grandchildren traveled with the family

📋 Every layer of the family gets named

📖 This sets up the headcount ahead

# Genesis 46:8-15
# 📜 The Sons Of Leah
---
## 📜 These Are The Names Of The Children Of Israel, Which Came Into Egypt

This genealogy is not filler placed between two more exciting scenes.

The names form an official record of exactly who entered Egypt as one family.

Centuries later, these same family names become the twelve tribes of Israel.

Every name here is the start of an entire nation's story.

📜 This is an official family record

👪 These names become the twelve tribes

🌱 A nation starts with this list

📖 Every name here matters later

---

## 👩 Shaul The Son Of A Canaanitish Woman

Simeon's sons are listed like the others, except for one detail added about Shaul.

His mother was Canaanite, not part of Jacob's own family line.

The text does not hide or smooth over that detail.

Jacob's family already included some mixing with the surrounding nations, even at this early point.

👩 Shaul's mother was Canaanite

📝 The text names this openly

🌍 The family already included outsiders

📖 Nothing here gets hidden or smoothed over

---

## ⚰️ But Er And Onan Died In The Land Of Canaan

Er and Onan were two of Judah's sons.

Both had already died before this journey, back in Genesis thirty eight.

The text still lists their names here, even though neither one reached Egypt.

Remembering the dead alongside the living was part of how a family genealogy worked in this culture.

⚰️ Er and Onan died young

📖 Judah's sons from that earlier chapter

🕯️ Even the dead get remembered here

➡️ A family record includes its losses

---

## 👧 With His Daughter Dinah

Dinah is the only daughter named by name in this branch of the family.

Her story filled all of Genesis thirty four, the account of her mistreatment in Shechem.

Naming her here shows she was never forgotten or erased from the family record.

👧 Dinah is named in this branch

📖 Genesis thirty four told her story

❤️ She is remembered, not erased

➡️ One name can carry a whole story

---

## 🔢 All The Souls Of His Sons And His Daughters Were Thirty And Three

This total counts everyone born to Jacob through Leah, plus her grandchildren.

Thirty and three simply means thirty three in the plain counting used today.

The number closes out Leah's branch of the family before the next branch begins.

🔢 Thirty and three means thirty three

👪 Leah's whole branch gets counted

📊 The total closes out her section

📖 Each wife's family gets its own count

# Genesis 46:16-18
# 👨‍👩‍👧 The Sons Of Zilpah
---
## 👧 Serah Their Sister

Serah is the second daughter named in this whole genealogy, alongside Dinah.

She belongs to the line of Asher, one of Zilpah's sons.

Naming her here shows daughters were not always left out of these official family records.

👧 Serah is the second daughter named

👨‍👩‍👧 She belongs to Asher's family line

📜 Daughters were not always left out

📖 A second name worth remembering here

---

## 👰 Whom Laban Gave To Leah His Daughter

Zilpah was the servant Laban gave to Leah on her wedding day, back in Genesis twenty nine.

Her sons through Jacob still count as full family, even though she began as a servant.

This detail explains why Zilpah's children get their own separate count in this list.

👰 Zilpah was Leah's wedding servant

📖 Genesis twenty nine explains her origin

👪 Her sons still count as full family

➡️ Status at birth did not erase their place

---

## 🔢 Even Sixteen Souls

This total covers every child and grandchild counted through Zilpah.

Sixteen is smaller than Leah's own total of thirty three, since Zilpah had fewer sons overall.

The chapter keeps every branch of the family separately numbered on purpose.

🔢 Sixteen souls through Zilpah's line

📊 Smaller than Leah's own total

🌳 Every branch gets its own number

📖 Careful counting marks the whole chapter

# Genesis 46:19-22
# 👑 The Sons Of Rachel
---
## ❤️ The Sons Of Rachel Jacob's Wife, Joseph, And Benjamin

Rachel was the wife Jacob loved most, and this line calls her out by name instead of just listing sons.

Joseph and Benjamin were her only two children.

Joseph had already risen to power in Egypt years before this list was written.

Benjamin was the youngest of all Jacob's sons.

❤️ Rachel is named as the favored wife

👦 Joseph and Benjamin were her only sons

👑 Joseph already ruled in Egypt by now

📖 Benjamin was the family's youngest son

---

## 👶 Were Born Manasseh And Ephraim

Manasseh and Ephraim were born to Joseph in Egypt before his family ever arrived.

These two grandsons later become full tribes of Israel in their own right.

No other grandson of Jacob ever receives that same honor.

👶 Manasseh and Ephraim were born in Egypt

🌟 Both later became full tribes

🎖️ No other grandson received that honor

📖 An unusual place in the family line

---

## 🏙️ Asenath The Daughter Of Potipherah Priest Of On

On was a major Egyptian city, later known by the Greek name Heliopolis, meaning city of the sun.

It served as a center of Egyptian sun worship.

Joseph married the daughter of one of that city's own priests.

That marriage placed Joseph firmly inside Egypt's highest religious and social circles.

🏙️ On was an Egyptian city of sun worship

⛩️ Later called Heliopolis by the Greeks

👨‍👩‍👧 Joseph married a priest's daughter there

📖 The marriage placed him among Egypt's elite

---

## 🔢 All The Souls Were Fourteen

This count includes Joseph, Benjamin, and all of their children together.

Fourteen is the total for Rachel's entire branch, the smallest of the four branches listed in this chapter.

A small number does not mean a small legacy, since Joseph alone changes the future of the whole family.

🔢 Fourteen souls make up Rachel's branch

📊 The smallest branch in this whole count

👑 Joseph alone reshapes the family's future

📖 Small numbers do not mean small impact

# Genesis 46:23-25
# 🕊️ The Sons Of Bilhah
---
## 👦 The Sons Of Dan, Hushim

Only one son is listed for Dan here, named Hushim.

Other Old Testament lists give Dan's descendants different names, showing how genealogies could be recorded slightly differently across books.

The single name here still secures Dan's place among the twelve tribes.

👦 Only one son listed for Dan

📚 Other lists record him differently

✅ Dan still holds a place among the tribes

📖 Small entries still count in the record

---

## 👰 Which Laban Gave Unto Rachel His Daughter

Bilhah was the servant Laban gave to Rachel on her wedding day, the same way Zilpah went to Leah.

Rachel struggled for years to have children of her own.

She offered Bilhah to Jacob to build the family through her instead.

Dan and Naphtali both come from that arrangement.

👰 Bilhah was Rachel's wedding servant

😔 Rachel struggled to have children herself

👶 Dan and Naphtali came through Bilhah

📖 Family could grow through more than one path

---

## 🔢 All The Souls Were Seven

This total closes out the fourth and final branch of Jacob's family.

Seven is the smallest number of any branch listed in the whole chapter.

Four branches, four wives, four separate counts, all feeding into one family.

🔢 Seven souls close Bilhah's branch

📊 The smallest total in the chapter

👪 Four branches make one family

📖 Every branch still belongs to the whole

# Genesis 46:26-27
# 🔢 Counting The Whole Household
---
## ➕ Besides Jacob's Sons' Wives, All The Souls Were Threescore And Six

Threescore means sixty, an old way of counting in groups of twenty called a score.

Threescore and six means sixty six people total.

That number leaves out the wives Jacob's sons married along the way, since they were not his own bloodline.

🔢 Threescore means sixty

➕ Threescore and six means sixty six

🚫 Wives married in are not counted here

📖 Only Jacob's direct bloodline gets this number

---

## 🌍 All The Souls Of The House Of Jacob, Which Came Into Egypt, Were Threescore And Ten

Seventy is the final, complete number of Jacob's household entering Egypt.

This number includes Jacob himself, plus Joseph and his two sons already living there.

Many scholars connect this number to the seventy nations named in Genesis ten.

The same number later marks the seventy elders named in the book of Numbers.

🔢 Threescore and ten means seventy

👴 Jacob himself is counted in this number

🌍 Many scholars link it to Genesis ten

📖 A small family about to become a nation

# Genesis 46:28-30
# 🐴 Joseph Meets His Father
---
## 🏃 He Sent Judah Before Him Unto Joseph, To Direct His Face Unto Goshen

Judah travels ahead of the whole caravan as a messenger and guide.

This is the same Judah who once offered himself in place of Benjamin back in chapter forty four.

He is trusted now to lead his father safely to the exact meeting place.

🏃 Judah travels ahead as a guide

📖 The same Judah from chapter forty four

🤝 He is trusted to lead his father

➡️ A changed man given a new task

---

## 🐴 Joseph Made Ready His Chariot, And Went Up To Meet Israel His Father

Joseph does not wait for his father to arrive at the palace.

He personally travels out to Goshen instead, in his own chariot, ahead of everyone else in his household.

A ruler of Egypt's stature could have simply sent servants to fetch his father.

🐴 Joseph rides out in his own chariot

🏃 He goes to his father, not the reverse

👑 A ruler chooses personal effort here

📖 Power did not replace love

---

## 🤗 He Fell On His Neck, And Wept On His Neck A Good While

This is a full embrace, not a formal greeting between a powerful official and an old man.

Joseph weeps for a long stretch of time, not just a brief tear.

About twenty two years of separation, since chapter thirty seven, come pouring out in this one moment.

🤗 Falling on the neck means a full embrace

😭 Joseph weeps for a long while

📆 About twenty two years of separation end here

📖 Grief and joy arrive together

---

## 😌 Now Let Me Die, Since I Have Seen Thy Face

Jacob is not asking to die right away.

He means his life now feels complete, since he believed for years that Joseph was dead.

Seeing Joseph's face alive again gives Jacob a peace nothing else could have given him.

😌 Jacob feels his life is now complete

😭 He once believed Joseph was gone

👀 Seeing his face brings real peace

📖 A father's long grief finally ends

# Genesis 46:31-34
# 🐑 Every Shepherd Is An Abomination
---
## 📋 I Will Go Up, And Shew Pharaoh

Joseph plans this conversation with Pharaoh carefully before it happens.

He wants to control exactly how his family gets introduced to the most powerful man in Egypt.

Nothing about this reunion is left to chance.

📋 Joseph plans the introduction carefully

👑 Pharaoh is the most powerful man in Egypt

🎯 Nothing is left to chance here

📖 Careful planning protects the whole family

---

## ❓ What Is Your Occupation

Joseph predicts exactly what Pharaoh will ask before it happens.

He is not guessing, he already knows how Pharaoh's court operates from his own years there.

Preparing his brothers for this exact question protects them from stumbling into a risky answer.

❓ Joseph predicts Pharaoh's exact question

🎓 He knows the court from experience

🛡️ Preparation protects his brothers here

📖 Joseph still watches over his family

---

## 🐑 Thy Servants' Trade Hath Been About Cattle From Our Youth Even Until Now

Joseph coaches his brothers on exactly what to say if Pharaoh questions them.

He wants them to be completely honest about being shepherds, not hide it.

Their honesty is actually part of the plan, not a risk to it.

🗣️ Joseph coaches his brothers on their answer

🐑 They should admit being shepherds plainly

✅ Honesty is part of the plan

📖 Truth can serve a bigger purpose

---

## 🌾 That Ye May Dwell In The Land Of Goshen

Goshen was a fertile region in northeastern Egypt, well suited for raising flocks.

Joseph wants his family settled there specifically, apart from the rest of Egyptian society.

Being honest about their trade was the very thing that would secure them this exact land.

🌾 Goshen was fertile land for flocks

🗺️ Joseph wants them settled there specifically

🏡 Separate land kept the family together

📖 Honesty secured the exact place they needed

---

## 🚫 Every Shepherd Is An Abomination Unto The Egyptians

Abomination is a strong word meaning something viewed as deeply offensive.

Egyptians associated shepherds with wandering foreigners and viewed the trade as beneath their own culture.

This built in prejudice actually works in the family's favor here.

It keeps Jacob's household living apart in Goshen, away from Egyptian idolatry.

🚫 Abomination means deeply offensive to them

🐑 Egyptians looked down on shepherds

🏡 That prejudice kept the family separate

📖 Separation protected their identity for generations
`.trim();

export const GENESIS_FORTY_SIX_PERSONAL_SECTIONS = parseGenesisFortySixRawNotes(GENESIS_FORTY_SIX_RAW_NOTES);
