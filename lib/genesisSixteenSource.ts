export type GenesisSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function normalizeReference(reference: string) {
  return reference.replace(/[–—]/g, "-").trim();
}

function parseReference(reference: string) {
  const normalized = normalizeReference(reference);
  const match = normalized.match(/^Genesis\s+16:(\d+)-(\d+)$/i);
  if (!match) throw new Error(`Could not parse Genesis 16 reference: ${reference}`);

  return {
    chapter: 16,
    startVerse: Number(match[1]),
    endVerse: Number(match[2]),
    reference: `Genesis 16:${match[1]}-${match[2]}`,
  };
}

function isSectionLine(line: string) {
  return /Genesis\s+16:\d+[–—-]\d+\s*$/i.test(line.trim());
}

function isEmojiLedLine(line: string) {
  const firstCharacter = Array.from(line.trim())[0] || "";
  return Boolean(firstCharacter) && !/[\p{L}\p{N}"'“”]/u.test(firstCharacter);
}

function parseGenesisSixteenRawNotes(rawText: string): GenesisSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").split("\n").map((line) => line.trim());
  const sections: GenesisSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionLine = lines[index];
    if (!isSectionLine(sectionLine)) {
      index += 1;
      continue;
    }

    const referenceMatch = sectionLine.match(/^(.+?)\s*(Genesis\s+16:\d+[–—-]\d+)\s*$/i);
    if (!referenceMatch) throw new Error(`Could not read Genesis 16 section: ${sectionLine}`);

    const icon = referenceMatch[1].trim();
    const parsedReference = parseReference(referenceMatch[2]);
    const title = lines[index + 1]?.trim() || "";
    index += 2;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !isSectionLine(lines[index])) {
      if (!lines[index]) {
        index += 1;
        continue;
      }

      const phraseTitle = lines[index];
      index += 1;
      const bodyLines: string[] = [];
      let consecutiveEmojiLines = 0;

      while (index < lines.length && !isSectionLine(lines[index])) {
        const line = lines[index];
        if (!line) {
          index += 1;
          continue;
        }

        bodyLines.push(line);
        consecutiveEmojiLines = isEmojiLedLine(line) ? consecutiveEmojiLines + 1 : 0;
        index += 1;

        if (consecutiveEmojiLines === 4) break;
      }

      if (!bodyLines.length || consecutiveEmojiLines !== 4) {
        throw new Error(`Incomplete Genesis 16 phrase card: ${phraseTitle}`);
      }

      phrases.push([phraseTitle, bodyLines.join("\n\n")]);
    }

    sections.push({
      ...parsedReference,
      title,
      icon,
      phrases,
    });
  }

  return sections;
}

export const GENESIS_SIXTEEN_RAW_NOTES = "👶 Genesis 16:1–6\nAbram Marries Hagar\n👩 Now Sarai Abram's Wife Bare Him No Children\nMany years had passed since God first promised Abram a son.\nYet Sarai was still barren, meaning she was unable to have children.\nThis reminds us that God's promise had still not been fulfilled.\n👩 Sarai was still barren\n⏳ Years had passed without a child\n📖 God's promise required faith and patience\n➡️ Sarai looks for another solution\n👩🏻 And She Had An Handmaid, An Egyptian, Whose Name Was Hagar\nA handmaid was a female servant who worked closely for her mistress.\nHagar was an Egyptian, and she was most likely acquired during Abram and Sarai's stay in Egypt (Genesis 12), when Pharaoh gave Abram servants, livestock, and other possessions.\nIronically, one decision made in Egypt would soon create another problem years later.\n👩🏻 Hagar was Sarai's personal servant\n🇪🇬 She was an Egyptian\n📖 She was likely acquired during Abram's time in Egypt\n➡️ She becomes part of God's unfolding story\n😔 Behold Now, The LORD Hath Restrained Me From Bearing\nSarai believed God had prevented her from having children.\nInstead of continuing to wait on God's timing, she began looking for another way to fulfill God's promise herself.\n😔 Sarai believed God had closed her womb\n⏳ She grew tired of waiting\n📖 She looked for a human solution\n➡️ A difficult decision follows\n🤲 I Pray Thee, Go In Unto My Maid\nThe phrase \"go in unto my maid\" means Sarai told Abram to have sexual relations with Hagar.\nThis sounds shocking today, but it was a recognized custom in the ancient Near East.\nIf a wife could not have children, she could give her servant to her husband.\nAny child born through the servant would legally belong to the wife.\nRachel later does this with Bilhah, and Leah does the same with Zilpah (Genesis 30).\n🤲 Sarai gives Hagar to Abram\n👶 This was an accepted custom in their culture\n📖 The child would legally belong to Sarai\n➡️ They attempt to fulfill God's promise themselves\n👶 It May Be That I May Obtain Children By Her\nSarai hoped to build a family through Hagar.\nInstead of trusting God to do the impossible, she tried to accomplish God's promise through human effort.\n👶 Sarai wanted a child through Hagar\n🤲 She chose human effort over waiting\n📖 She believed this would solve the problem\n➡️ The plan begins\n👂 And Abram Hearkened To The Voice Of Sarai\nThe word hearkened means he listened or obeyed.\nThe Bible does not say Abram acted out of lust.\nInstead, it simply says he agreed with Sarai's plan.\nLike Adam listening to Eve in Genesis 3, Abram listened to human reasoning instead of continuing to wait for God's timing.\n👂 Hearkened means listened\n🤝 Abram agreed with Sarai's plan\n📖 The Bible never says lust was his motive\n➡️ Abram acts without asking God\n👩🏻 And Sarai Abram's Wife Took Hagar Her Maid, The Egyptian\nSarai personally gave Hagar to Abram.\nThis was not Hagar's idea.\nThe decision began with Sarai.\n👩🏻 Sarai makes the decision\n🇪🇬 Hagar is given to Abram\n📖 The plan begins with Sarai\n➡️ Hagar's life changes forever\n⏳ After Abram Had Dwelt Ten Years In The Land Of Canaan\nThis happened ten years after Abram first entered Canaan.\nFor ten years, Abram and Sarai had waited for God's promise.\nWaiting became difficult, and they eventually tried to help God accomplish what He had already promised to do.\n⏳ Ten years had passed\n📖 Abram and Sarai grew weary of waiting\n🙏 Delayed promises often test our faith\n➡️ They take matters into their own hands\n💍 And Gave Her To Her Husband Abram To Be His Wife\nHagar became a secondary wife, sometimes called a concubine.\nAlthough this was accepted culturally, it was never God's original design for marriage, which was established in Genesis 2 as one man and one woman.\nThe problems that follow show why departing from God's design brings conflict.\n💍 Hagar became Abram's secondary wife\n📖 This followed ancient custom\n⚠️ It was not God's original design for marriage\n➡️ Trouble soon follows\n❤️ And He Went In Unto Hagar\nThis phrase simply means Abram had sexual relations with Hagar.\n❤️ Abram and Hagar had sexual relations\n📖 Hagar became Abram's wife\n➡️ The plan moves forward\n🤰 And She Conceived\nHagar became pregnant almost immediately.\nThe very thing Sarai had been unable to experience now happened through her servant.\n🤰 Hagar became pregnant\n👶 The plan appeared to work\n📖 New tension quickly develops\n➡️ Relationships begin to change\n👀 And When She Saw That She Had Conceived\nOnce Hagar realized she was pregnant, her attitude changed.\nShe now possessed something Sarai had wanted for years.\n👀 Hagar knew she was pregnant\n👶 Everything changed\n📖 Pride begins to grow\n➡️ Conflict follows\n😒 Her Mistress Was Despised In Her Eyes\nThe word mistress refers to Sarai, Hagar's master.\nThe word despised means looked down on or treated with contempt.\nHagar began looking down on Sarai because she could have children while Sarai could not.\n😒 Hagar looked down on Sarai\n👩 Sarai lost Hagar's respect\n📖 Pride damaged their relationship\n➡️ Conflict increases\n😠 And Sarai Said Unto Abram, My Wrong Be Upon Thee\nSarai blamed Abram for what had happened.\nEven though the idea had originally been hers, she now held Abram responsible for the painful situation.\n😠 Sarai blames Abram\n💔 The relationship becomes strained\n📖 Sin often leads to blame\n➡️ Sarai confronts Abram\n🤲 I Have Given My Maid Into Thy Bosom\nThe phrase \"into thy bosom\" means into your care or into your marriage bed.\nSarai is reminding Abram,\n\"I gave Hagar to you as your wife.\"\n🤲 Sarai reminds Abram of her decision\n💍 Hagar became Abram's wife\n📖 Sarai expresses her regret\n➡️ She feels betrayed\n😒 And When She Saw That She Had Conceived\nOnce Hagar became pregnant, she no longer viewed Sarai the same way.\nHer pregnancy changed the relationship between the two women.\n🤰 Hagar's pregnancy changed everything\n👀 Her attitude shifted\n📖 The conflict deepened\n➡️ Sarai continues speaking\n💔 I Was Despised In Her Eyes\nSarai says Hagar now treats her with contempt.\nThe servant had begun looking down on her mistress.\n💔 Sarai felt dishonored\n😒 Hagar no longer respected her\n📖 Pride divided the household\n➡️ Sarai appeals to God\n⚖️ The LORD Judge Between Me And Thee\nSarai asks God to decide who is right.\nShe leaves the matter in God's hands.\n⚖️ Sarai appeals to God\n🙏 She asks God to judge the situation\n📖 She seeks God's justice\n➡️ Abram responds\n🗣️ But Abram Said Unto Sarai\nAbram answers Sarai without arguing.\nHe leaves the decision regarding Hagar in Sarai's hands.\n🗣️ Abram responds calmly\n📖 He avoids arguing\n➡️ He gives Sarai authority\n✋ Behold, Thy Maid Is In Thy Hand\nAbram reminds Sarai that Hagar is still her servant.\nHe tells Sarai that she has authority over Hagar.\n✋ Hagar still belongs to Sarai's household\n👩 Sarai still has authority\n📖 Abram leaves the decision to her\n➡️ Sarai acts\n😢 Do To Her As It Pleaseth Thee\nAbram tells Sarai,\n\"Do what you think is best.\"\nHe does not defend Hagar or interfere.\n😢 Abram leaves the decision to Sarai\n📖 He does not take control of the situation\n➡️ Sarai responds harshly\n⚠️ And When Sarai Dealt Hardly With Her\nThe phrase \"dealt hardly\" means treated harshly or mistreated.\nThe Bible does not describe exactly what Sarai did, but it was severe enough that Hagar could no longer endure it.\n⚠️ Sarai treated Hagar harshly\n💔 Their relationship completely broke down\n📖 Sin continued producing more pain\n➡️ Hagar runs away\n🏃 She Fled From Her Face\nThe word fled means ran away.\nHagar escaped from Sarai's household and left on her own.\nWhat began as an attempt to help fulfill God's promise had now resulted in division, jealousy, blame, and broken relationships.\n🏃 Hagar runs away\n💔 The family is divided\n📖 Human solutions created greater problems\n➡️ God is about to meet Hagar in the wilderness\n👼 Genesis 16:7–14\nHagar Meets The Angel Of The LORD\n💧 And The Angel Of The LORD Found Her By A Fountain Of Water\nAfter running away from Sarai, Hagar found herself alone in the wilderness.\nThere, the Angel of the LORD found her beside a spring of water.\nThis is the first mention of the Angel of the LORD in the Bible.\nMany Bible scholars believe this is a pre-incarnate appearance of Jesus Christ because later in the passage the Angel speaks as God and receives worship.\n💧 Hagar fled into the wilderness\n👼 First mention of the Angel of the LORD\n📖 God sought Hagar while she was alone\n➡️ God meets Hagar where she is\n🏜️ In The Wilderness, By The Fountain In The Way To Shur\nShur was the desert region between Canaan and Egypt.\nSince Hagar was Egyptian, she was most likely trying to return home.\nThe journey from Hebron to the region of Shur was roughly 100–150 miles (160–240 km), meaning Hagar had likely been traveling for several days.\n🏜️ Shur was on the road to Egypt\n🇪🇬 Hagar was likely heading home\n📍 She had already traveled many miles\n➡️ God found her before she arrived\n❓ Hagar, Sarai's Maid, Whence Comest Thou?\nThe word whence means \"where have you come from?\"\nGod already knew the answer.\nLike when God asked Adam, \"Where art thou?\" He asked the question to invite Hagar to speak honestly about her situation.\n❓ Whence means where have you come from\n🙏 God already knew the answer\n📖 God invited Hagar to speak honestly\n➡️ Hagar responds\n❓ And Whither Wilt Thou Go?\nThe word whither means \"where are you going?\"\nAgain, God knew where Hagar was headed.\nThe question caused Hagar to think about her future.\n❓ Whither means where are you going\n🛤️ God causes Hagar to consider her path\n📖 God speaks personally to her\n➡️ Hagar answers\n😢 And She Said, I Flee From The Face Of My Mistress Sarai\nFor the first time, Hagar openly admits why she is running.\nShe doesn't blame anyone else.\nShe simply says she is fleeing from Sarai.\n😢 Hagar admits why she ran away\n🏃 She fled from Sarai\n📖 Hagar honestly answers God\n➡️ God gives instructions\n👼 And The Angel Of The LORD Said Unto Her\nThe Angel now tells Hagar what she must do.\nInstead of encouraging her to keep running, God gives her difficult instructions.\n👼 God now speaks\n📖 Hagar receives instructions\n➡️ God calls her to obey\n↩️ Return To Thy Mistress, And Submit Thyself Under Her Hands\nGod tells Hagar to return home.\nThe word submit means to place yourself under someone else's authority.\nAlthough Sarai had treated Hagar harshly, God did not tell Hagar to continue living in pride or rebellion.\nHe called her to humble herself.\n↩️ God tells Hagar to return\n🙏 Submit means to place yourself under authority\n📖 God calls Hagar to humility\n➡️ God follows His command with a promise\n🌟 I Will Multiply Thy Seed Exceedingly\nGod promises that Hagar's descendants will become very numerous.\nAlthough God's covenant would continue through Isaac, God still promised to bless Hagar's son with many descendants.\n🌟 God promises many descendants\n👶 Hagar's family would greatly increase\n📖 God blesses Ishmael's future\n➡️ God reveals more\n🔢 That It Shall Not Be Numbered For Multitude\nGod says Hagar's descendants will become so numerous that they cannot easily be counted.\nThis echoes God's earlier promise to Abram about his descendants.\n🔢 Hagar's descendants will become numerous\n👥 Her family will become a great people\n📖 God promises a large nation\n➡️ God reveals the child\n👶 Behold, Thou Art With Child, And Shalt Bear A Son\nGod confirms that Hagar is carrying a son.\nThis child was not a surprise to God.\nHe already knew the future.\n👶 Hagar is carrying a son\n🙏 God already knew the child\n📖 God reveals the baby's future\n➡️ God gives him a name\n📛 And Shalt Call His Name Ishmael\nThe name Ishmael (Hebrew: יִשְׁמָעֵאל — Yishma'el) means \"God hears\" or \"God has heard.\"\nHis name would forever remind Hagar that God heard her cries during her suffering.\n📛 Ishmael means \"God hears\"\n👂 God heard Hagar's cries\n📖 His name became a reminder of God's compassion\n➡️ God explains why\n😢 Because The LORD Hath Heard Thy Affliction\nThe word affliction means suffering, hardship, or distress.\nAlthough Hagar had acted proudly toward Sarai, God still saw her pain after she fled into the wilderness.\nGod cared for Hagar even while correcting her.\n😢 Affliction means suffering\n👂 God heard Hagar's distress\n📖 God shows both justice and compassion\n➡️ God reveals Ishmael's future\n🏜️ And He Will Be A Wild Man\nThe phrase wild man does not mean Ishmael would be evil.\nIt describes someone who would live freely, independently, and like a desert nomad rather than under the control of cities or kingdoms.\n🏜️ Wild man means independent\n🐪 Ishmael's descendants would live as desert nomads\n📖 They would value freedom\n➡️ God describes his future\n⚔️ His Hand Will Be Against Every Man\nThis means Ishmael's descendants would often be involved in conflict with others.\nThey would be known for their independence and willingness to fight for their survival.\n⚔️ Ishmael's descendants would often face conflict\n🛡️ They would fiercely defend themselves\n📖 Their history would include many struggles\n➡️ The prophecy continues\n⚔️ And Every Man's Hand Against Him\nJust as Ishmael's descendants would fight others, others would also fight against them.\nTheir history would often be marked by conflict from both sides.\n⚔️ Others would oppose Ishmael's descendants\n📖 Conflict would be mutual\n🛡️ They would endure continual struggles\n➡️ God finishes the prophecy\n👨‍👩‍👦 And He Shall Dwell In The Presence Of All His Brethren\nThis means Ishmael's descendants would continue living alongside their relatives rather than disappearing.\nHis family line would survive and remain near the descendants of Abraham.\n👨‍👩‍👦 Ishmael's family would continue\n🏕️ They would live near related peoples\n📖 His descendants would become a lasting nation\n➡️ Hagar responds\n🙏 And She Called The Name Of The LORD That Spake Unto Her\nHagar responds by worshiping God.\nShe recognizes that the God of Abram has also seen and cared for her.\n🙏 Hagar worships God\n❤️ She recognizes God's care\n📖 Her encounter changes her\n➡️ She gives God a new title\n👀 Thou God Seest Me\nIn Hebrew this is אֵל רֳאִי (El Roi), meaning \"The God Who Sees Me.\"\nHagar realizes she is not forgotten.\nEven alone in the wilderness, God saw her.\n👀 El Roi means \"The God Who Sees Me\"\n🙏 God sees those who feel forgotten\n📖 Hagar gives God this beautiful name\n➡️ She reflects on the encounter\n✨ For She Said, Have I Also Here Looked After Him That Seeth Me?\nHagar is amazed that she has encountered God and lived.\nShe is saying,\n\"Have I really seen the One who sees me?\"\nShe is overwhelmed that God not only saw her, but personally came to meet her.\n✨ Hagar is amazed by God's presence\n👀 God saw her before she saw Him\n📖 She marvels at God's compassion\n➡️ The place receives a name\n💧 Wherefore The Well Was Called Beer-lahai-roi\nBeer-lahai-roi (Hebrew: בְּאֵר לַחַי רֹאִי — Be'er Lachai Roi) means \"The Well of the Living One Who Sees Me.\"\nHagar named the well to remember forever that God saw her in her suffering.\n💧 Beer-lahai-roi means \"The Well of the Living One Who Sees Me\"\n👀 The name remembers God's compassion\n📖 The place became a testimony to God's faithfulness\n➡️ The location is identified\n📍 Behold, It Is Between Kadesh And Bered\nMoses gives the location so his readers would know where the well was.\nKadesh was an important oasis in the southern wilderness that Israel would later visit during the Exodus.\nBered was another nearby landmark.\nTogether, they identify the location of Hagar's encounter with God.\n📍 The well lay between Kadesh and Bered\n🏜️ Both were landmarks in the southern wilderness\n📖 Moses identifies the location for his readers\n➡️ Hagar's encounter is remembered\n👶 Genesis 16:15–16\nThe Birth Of Ishmael\n👶 And Hagar Bare Abram A Son\nHagar gave birth to Abram's first son.\nAlthough Ishmael was Abram's firstborn, he was not the son through whom God's covenant would continue.\nYears earlier, God had promised Abram that he would have an heir through His promise, and that son would later be Isaac.\nIshmael was born through human planning.\nIsaac would be born through God's promise.\n👶 Ishmael becomes Abram's first son\n📖 He is not the promised covenant son\n🙏 God is still working out His plan\n➡️ Abram names his son\n📛 And Abram Called His Son's Name, Which Hagar Bare, Ishmael\nAbram obeyed exactly what the Angel of the LORD had told Hagar.\nHe named the child Ishmael.\nIshmael (Hebrew: יִשְׁמָעֵאל — Yishma'el) means \"God hears.\"\nEvery time Abram or Hagar called his name, they were reminded that God had heard Hagar's suffering in the wilderness.\n📛 Abram obeys God's instruction\n👂 Ishmael means \"God hears\"\n📖 His name reminds them of God's compassion\n➡️ Moses records Abram's age\n🎂 And Abram Was Fourscore And Six Years Old\nA score means twenty years.\nSo:\nOne score = 20\nTwo score = 40\nThree score = 60\nFour score = 80\nFourscore and six means 86 years old.\nAbram was 86 years old when Ishmael was born.\nThis also shows that 11 years had passed since Abram first entered Canaan at age 75 (Genesis 12:4). Ten years passed before Hagar was given to Abram (Genesis 16:3), and about one more year passed before Ishmael was born.\n🎂 Fourscore means 80\n➕ Fourscore and six = 86 years old\n⏳ Eleven years have passed since Abram entered Canaan\n➡️ God's promised son has still not yet arrived\n👶 When Hagar Bare Ishmael To Abram\nMoses closes the chapter by recording the birth of Ishmael.\nAt this point, Abram likely believed Ishmael might be the promised son.\nHowever, God's covenant promise was still pointing to another child who had not yet been born.\nThe next chapter will reveal that God's plan was far greater than Abram yet understood.\n👶 Ishmael is born\n📖 Abram likely believes the promise has been fulfilled\n🙏 God is not finished revealing His plan\n➡️ The story continues with God's covenant";

export const GENESIS_SIXTEEN_PERSONAL_SECTIONS = parseGenesisSixteenRawNotes(
  GENESIS_SIXTEEN_RAW_NOTES,
);
