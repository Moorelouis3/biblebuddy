import type { ClueCard } from "../types";
import { genesisArt, ref } from "../ref";

/**
 * Genesis deck, People 1-25 (Notion roster order). Cards 1-5 keep the clues
 * transcribed from Louis's mockups, except Adam (revised by Louis
 * 2026-11-22). Only Joseph has art so far; every other card shows the
 * neutral fallback until its art exists. Every reference was checked against
 * public/kjv/<book>/<chapter>.json.
 */

const person = (c: Omit<ClueCard, "deck" | "category">): ClueCard => ({ ...c, deck: "genesis", category: "person" });

export const GENESIS_PEOPLE: ClueCard[] = [
  person({
    id: "god",
    number: 1,
    answer: "God",
    accepted: ["the lord", "lord", "lord god", "yahweh", "jehovah", "god almighty", "the lord god", "i am", "elohim"],
    art: genesisArt("god"),
    clues: [
      { text: "I asked a man whether he had entered the storehouses of the snow.", ref: ref("Job 38:22") },
      { text: "I told a prophet to take a scroll and write on it again after a king burned the first one.", ref: ref("Jeremiah 36:27–28") },
      { text: "When a man asked to see my glory, I covered him with my hand in a cleft in the rock.", ref: ref("Exodus 33:18–23") },
      { text: "I told Moses, “I AM WHO I AM.”", ref: ref("Exodus 3:14") },
      { text: "In the beginning, I created the heavens and the earth.", ref: ref("Genesis 1:1") },
    ],
    altTopClues: [
      { text: "I told a discouraged prophet I had kept seven thousand who never bowed to Baal.", ref: ref("1 Kings 19:18") },
      { text: "I asked an angry prophet whether he did well to be angry about a plant.", ref: ref("Jonah 4:9–10") },
    ],
    teaching:
      "God is the Creator of everything. Genesis opens with him making the heavens and the earth. He revealed his name to Moses as I AM, showed Moses his glory from a cleft in the rock, and answered Job out of the whirlwind. Through every story in Genesis, he is the one who speaks, promises and keeps his word. See Genesis 1:1; Exodus 3:14; 33:18–23; Job 38.",
  }),
  person({
    id: "adam",
    number: 2,
    answer: "Adam",
    accepted: ["adam the first man", "the first man"],
    art: genesisArt("adam"),
    clues: [
      { text: "After my son was born, I lived another 800 years.", ref: ref("Genesis 5:4") },
      { text: "Luke traces Jesus’ family line all the way back to me.", ref: ref("Luke 3:23–38") },
      { text: "I hid among the trees when I heard God in the garden.", ref: ref("Genesis 3:8–10") },
      { text: "God brought the animals to me to see what I would call them.", ref: ref("Genesis 2:19–20") },
      { text: "God formed me from the dust and breathed life into me.", ref: ref("Genesis 2:7") },
    ],
    altTopClues: [
      { text: "Jude describes Enoch as the seventh from me.", ref: ref("Jude 1:14") },
      { text: "Paul said death reigned from my time to Moses.", ref: ref("Romans 5:14") },
      { text: "I lived 930 years in all, and then I died.", ref: ref("Genesis 5:5") },
    ],
    teaching:
      "Adam was the first man. God formed him from the dust, breathed life into him, and placed him in the garden of Eden. Adam named the animals, and God made Eve to be his wife. After they ate from the forbidden tree, they hid from God and were sent out of the garden. Luke’s family line of Jesus reaches back to him. See Genesis 2–3; 5:1–5; Luke 3:38.",
    study: { label: "Explore Adam’s Story", href: "/blog/who-was-adam" },
  }),
  person({
    id: "eve",
    number: 3,
    answer: "Eve",
    accepted: ["eva", "chavah", "havah"],
    art: genesisArt("eve"),
    clues: [
      { text: "After Abel died, I said God had given me another child in his place.", ref: ref("Genesis 4:25") },
      { text: "Paul worried the Corinthians could be led astray the way I was.", ref: ref("2 Corinthians 11:3") },
      { text: "My husband named me because I would be the mother of all the living.", ref: ref("Genesis 3:20") },
      { text: "I gave my husband fruit from the tree after I ate it.", ref: ref("Genesis 3:6") },
      { text: "God made me from one of Adam’s ribs.", ref: ref("Genesis 2:21–22") },
    ],
    teaching:
      "Eve was the first woman. God made her from Adam’s rib, and Adam named her because she would be the mother of all the living. The serpent deceived her, and she ate the forbidden fruit and gave some to Adam. Later she became the mother of Cain, Abel and Seth. See Genesis 2:21–25; 3; 4:1–2, 25.",
    study: { label: "Explore Eve’s Story", href: "/blog/who-was-eve" },
  }),
  person({
    id: "cain",
    number: 4,
    answer: "Cain",
    accepted: ["kain"],
    art: genesisArt("cain"),
    clues: [
      { text: "I built a city and named it after my son.", ref: ref("Genesis 4:17") },
      { text: "Jude warned about people who followed my way.", ref: ref("Jude 1:11") },
      { text: "I brought God an offering from the ground I worked.", ref: ref("Genesis 4:2–3") },
      { text: "I asked God whether I was my brother’s keeper.", ref: ref("Genesis 4:9") },
      { text: "I killed my brother Abel.", ref: ref("Genesis 4:8") },
    ],
    teaching:
      "Cain was the firstborn son of Adam and Eve. He worked the ground, and when God accepted Abel’s offering but not his, Cain grew angry and killed his brother. When God asked where Abel was, Cain asked if he was his brother’s keeper. God sent him away as a wanderer, and he built a city named after his son Enoch. See Genesis 4:1–17; Jude 1:11.",
  }),
  person({
    id: "noah",
    number: 5,
    answer: "Noah",
    accepted: ["noe", "noach"],
    art: genesisArt("noah"),
    clues: [
      // Louis, 2026-11-22: "ark" and "flood" are saved for the 1-point clue.
      { text: "God found me righteous in a world of unrighteousness.", ref: ref("Genesis 7:1") },
      { text: "Ezekiel named me alongside Daniel and Job.", ref: ref("Ezekiel 14:14") },
      { text: "Peter called me a preacher of righteousness.", ref: ref("2 Peter 2:5") },
      { text: "I sent out a dove that came back with an olive leaf.", ref: ref("Genesis 8:10–11") },
      { text: "God told me to build an ark before the flood.", ref: ref("Genesis 6:13–18") },
    ],
    altTopClues: [
      { text: "My father hoped I would bring comfort from the hard work of our hands.", ref: ref("Genesis 5:29") },
      { text: "Jesus said the days before his return would be like my days.", ref: ref("Luke 17:26") },
      { text: "I planted a vineyard and drank too much of its wine.", ref: ref("Genesis 9:20–21") },
    ],
    teaching:
      "Noah lived when the earth was full of violence, yet God found him righteous. God told him to build an ark for his family and the animals before the flood. When the waters went down, a dove brought back an olive leaf, and God set a rainbow in the sky as a promise never to flood the earth again. See Genesis 6–9; 2 Peter 2:5.",
  }),
  person({
    id: "abraham",
    number: 6,
    answer: "Abraham",
    accepted: ["abram", "avraham", "abraham the father of many nations", "father abraham"],
    art: genesisArt("abraham"),
    clues: [
      { text: "Melchizedek blessed me, and I gave him a tenth of everything.", ref: ref("Genesis 14:18–20") },
      { text: "James says I was called the friend of God.", ref: ref("James 2:23") },
      { text: "God changed my name and said I would be the father of many nations.", ref: ref("Genesis 17:5") },
      { text: "God told me to leave my country and go to a land he would show me.", ref: ref("Genesis 12:1") },
      { text: "God tested me by asking me to offer my son Isaac.", ref: ref("Genesis 22:1–2") },
    ],
    altTopClues: [
      { text: "I buried my wife in the cave of Machpelah.", ref: ref("Genesis 23:19") },
      { text: "I armed my servants and rescued my nephew from four kings.", ref: ref("Genesis 14:14–16") },
      { text: "Paul says I believed God, and it was counted to me as righteousness.", ref: ref("Romans 4:3") },
    ],
    teaching:
      "Abraham, first called Abram, left his home when God called him and went to Canaan. God promised him a land and more descendants than the stars, and renamed him the father of many nations. In old age he and Sarah had Isaac, and Abraham trusted God even when he was asked to offer his son. See Genesis 12:1–3; 15:5–6; 17:5; 21:1–5; 22.",
    study: { label: "Explore Abraham’s Story", href: "/bible-buddies/abraham" },
  }),
  person({
    id: "sarah",
    number: 7,
    answer: "Sarah",
    accepted: ["sarai", "sara"],
    art: genesisArt("sarah"),
    clues: [
      { text: "Peter tells wives to follow my example, since I called my husband lord.", ref: ref("1 Peter 3:6") },
      { text: "I died in Hebron when I was 127 years old.", ref: ref("Genesis 23:1–2") },
      { text: "I gave my servant Hagar to my husband so I could have children through her.", ref: ref("Genesis 16:1–3") },
      { text: "I laughed when I heard I would have a son in my old age.", ref: ref("Genesis 18:10–12") },
      { text: "I was Abraham’s wife and the mother of Isaac.", ref: ref("Genesis 21:2–3") },
    ],
    teaching:
      "Sarah, first called Sarai, was Abraham’s wife. For years she had no children, so she gave her servant Hagar to Abraham. When God promised her a son in her old age, she laughed. Then God kept his word, and she gave birth to Isaac. She died at 127 and was buried at Machpelah. See Genesis 16; 18:10–15; 21:1–7; 23:1–2, 19.",
    study: { label: "Explore Sarah’s Story", href: "/blog/who-was-sarah" },
  }),
  person({
    id: "lot",
    number: 8,
    answer: "Lot",
    accepted: ["lott"],
    art: genesisArt("lot"),
    clues: [
      { text: "Peter calls me a righteous man, troubled by the wicked people around me.", ref: ref("2 Peter 2:7–8") },
      { text: "When my uncle let me choose, I picked the well-watered plain of the Jordan.", ref: ref("Genesis 13:10–11") },
      { text: "My uncle Abram rescued me after kings carried me off as a captive.", ref: ref("Genesis 14:12–16") },
      { text: "Angels took me by the hand and led me out of Sodom.", ref: ref("Genesis 19:16") },
      { text: "My wife looked back and became a pillar of salt.", ref: ref("Genesis 19:26") },
    ],
    teaching:
      "Lot was Abraham’s nephew. He travelled with Abraham to Canaan, then chose the well-watered land near Sodom. Abraham rescued him when he was taken captive. Before God destroyed Sodom, angels led Lot and his family out, but his wife looked back and became a pillar of salt. Peter calls Lot a righteous man. See Genesis 13; 14:12–16; 19; 2 Peter 2:7–8.",
  }),
  person({
    id: "hagar",
    number: 9,
    answer: "Hagar",
    accepted: ["agar", "haggar"],
    art: genesisArt("hagar"),
    clues: [
      { text: "Paul uses me as a picture of Mount Sinai in Arabia.", ref: ref("Galatians 4:24–25") },
      { text: "An angel found me by a spring on the way to Shur.", ref: ref("Genesis 16:7") },
      { text: "I called the Lord “the God who sees me.”", ref: ref("Genesis 16:13") },
      { text: "I was Sarai’s Egyptian servant, and she gave me to Abram as a wife.", ref: ref("Genesis 16:1–3") },
      { text: "I gave birth to Abram’s son Ishmael.", ref: ref("Genesis 16:15") },
    ],
    teaching:
      "Hagar was Sarah’s Egyptian servant. Sarah gave her to Abraham, and she became the mother of Ishmael. When she ran away, an angel met her by a spring, and she called the Lord the God who sees her. Later she and Ishmael were sent away, and God cared for them in the wilderness. See Genesis 16; 21:9–21; Galatians 4:24–25.",
    study: { label: "Explore Hagar’s Story", href: "/blog/who-was-hagar" },
  }),
  person({
    id: "ishmael",
    number: 10,
    answer: "Ishmael",
    accepted: ["ismael", "ishmail", "ishmeal"],
    art: genesisArt("ishmael"),
    clues: [
      { text: "I lived 137 years, and my twelve sons became twelve princes.", ref: ref("Genesis 25:16–17") },
      { text: "I grew up in the wilderness and became an archer.", ref: ref("Genesis 21:20") },
      { text: "My mother found me a wife from the land of Egypt.", ref: ref("Genesis 21:21") },
      { text: "Before I was born, an angel said I would be a wild man.", ref: ref("Genesis 16:11–12") },
      { text: "I was the son of Abraham and Hagar.", ref: ref("Genesis 16:15") },
    ],
    teaching:
      "Ishmael was Abraham’s first son, born to Sarah’s servant Hagar. Before he was born, an angel told Hagar to name him Ishmael. After Isaac was born, Ishmael and Hagar were sent away, but God was with the boy, and he grew up in the wilderness as an archer. God made him the father of twelve princes. See Genesis 16; 21:9–21; 25:12–17.",
  }),
  person({
    id: "isaac",
    number: 11,
    answer: "Isaac",
    accepted: ["issac", "isaak", "yitzhak", "itzhak"],
    art: genesisArt("isaac"),
    clues: [
      { text: "I dug again the wells my father had dug, after the Philistines filled them in.", ref: ref("Genesis 26:18") },
      { text: "I went out to the field in the evening to meditate.", ref: ref("Genesis 24:63") },
      { text: "I was forty years old when I married Rebekah.", ref: ref("Genesis 25:20") },
      { text: "My father laid me on an altar, but God provided a ram instead.", ref: ref("Genesis 22:9–13") },
      { text: "I was the son Abraham and Sarah had in their old age.", ref: ref("Genesis 21:2–3") },
    ],
    teaching:
      "Isaac was the son God promised to Abraham and Sarah, born when they were old. When God tested Abraham, Isaac was laid on the altar, and God provided a ram instead. Isaac married Rebekah and became the father of twins, Esau and Jacob. When he was old and could not see, Jacob tricked him into giving the blessing. See Genesis 21:1–7; 22; 24; 25:19–26; 27.",
  }),
  person({
    id: "rebekah",
    number: 12,
    answer: "Rebekah",
    accepted: ["rebecca", "rebeca", "rebekka", "rebeka", "rebecka", "rebekah"],
    art: genesisArt("rebekah"),
    clues: [
      { text: "Paul says I was told the older would serve the younger before my sons were born.", ref: ref("Romans 9:10–12") },
      { text: "I gave a stranger a drink at the well and watered his camels too.", ref: ref("Genesis 24:18–20") },
      { text: "My brother Laban ran out to meet the servant who came for me.", ref: ref("Genesis 24:29") },
      { text: "I had twins, and they struggled together inside me.", ref: ref("Genesis 25:22–24") },
      { text: "I helped Jacob trick Isaac into blessing him instead of Esau.", ref: ref("Genesis 27:6–10") },
    ],
    teaching:
      "Rebekah was the woman Abraham’s servant found at a well when she offered water to him and his camels. She married Isaac and became the mother of twins, Esau and Jacob, who struggled before they were born. God told her the older would serve the younger, and she later helped Jacob receive Isaac’s blessing. See Genesis 24; 25:20–26; 27.",
    study: { label: "Explore Rebekah’s Story", href: "/blog/who-was-rebekah" },
  }),
  person({
    id: "esau",
    number: 13,
    answer: "Esau",
    accepted: ["edom", "esaw"],
    art: genesisArt("esau"),
    clues: [
      { text: "Hebrews warns us not to be godless like me.", ref: ref("Hebrews 12:16") },
      { text: "I married two Hittite women, and it grieved my parents.", ref: ref("Genesis 26:34–35") },
      { text: "I was a skilful hunter, a man of the field.", ref: ref("Genesis 25:27") },
      { text: "I was born red and hairy all over.", ref: ref("Genesis 25:25") },
      { text: "I sold my birthright to my brother Jacob for a bowl of stew.", ref: ref("Genesis 25:29–34") },
    ],
    teaching:
      "Esau was the older twin son of Isaac and Rebekah. He was born red and hairy and grew up a hunter. One day he came in hungry and sold his birthright to Jacob for stew, and later Jacob received the blessing Esau expected. Years later, Esau ran to meet Jacob and embraced him. See Genesis 25:24–34; 27; 33:1–4.",
  }),
  person({
    id: "jacob",
    number: 14,
    answer: "Jacob",
    accepted: ["israel", "jakob", "jacobs", "yaakov"],
    art: genesisArt("jacob"),
    clues: [
      { text: "I told my father-in-law I had served him twenty years, fourteen for his daughters.", ref: ref("Genesis 31:41") },
      { text: "Hosea says I took my brother by the heel in the womb.", ref: ref("Hosea 12:3") },
      { text: "I dreamed of a ladder reaching up to heaven.", ref: ref("Genesis 28:12") },
      { text: "I wrestled with God, and he changed my name to Israel.", ref: ref("Genesis 32:24–28") },
      { text: "I tricked my father Isaac and took my brother Esau’s blessing.", ref: ref("Genesis 27:18–29") },
    ],
    altTopClues: [
      { text: "I told Pharaoh my years had been few and evil.", ref: ref("Genesis 47:9") },
      { text: "I crossed my hands to bless the younger grandson first.", ref: ref("Genesis 48:14") },
      { text: "I set up the stone I slept on as a pillar and poured oil on it.", ref: ref("Genesis 28:18") },
    ],
    teaching:
      "Jacob was the younger twin son of Isaac and Rebekah. He took Esau’s birthright and blessing, then fled and dreamed of a ladder to heaven. He worked for Laban for Leah and Rachel, and had twelve sons. After he wrestled with God, his name became Israel, and his sons became the twelve tribes. See Genesis 25:26; 27–29; 32:24–28; 35:22–26.",
  }),
  person({
    id: "laban",
    number: 15,
    answer: "Laban",
    accepted: ["labban"],
    art: genesisArt("laban"),
    clues: [
      { text: "I said our heap of stones would be a witness between me and my son-in-law.", ref: ref("Genesis 31:48") },
      { text: "I searched every tent for my missing household gods.", ref: ref("Genesis 31:33–35") },
      { text: "I ran to the well to meet Abraham’s servant when I saw my sister’s bracelets.", ref: ref("Genesis 24:29–30") },
      { text: "My nephew Jacob said I changed his wages ten times.", ref: ref("Genesis 31:7") },
      { text: "I gave Leah to Jacob instead of Rachel on his wedding night.", ref: ref("Genesis 29:23–25") },
    ],
    teaching:
      "Laban was Rebekah’s brother and the father of Leah and Rachel. Jacob worked for him seven years for Rachel, but Laban gave him Leah first and made him work seven more. Laban kept changing Jacob’s wages. When Jacob left, Laban chased him, and they made a covenant with a heap of stones. See Genesis 24:29–31; 29:15–30; 31.",
  }),
  person({
    id: "leah",
    number: 16,
    answer: "Leah",
    accepted: ["lea", "leia"],
    art: genesisArt("leah"),
    clues: [
      { text: "When my fourth son was born, I said, “Now I will praise the Lord.”", ref: ref("Genesis 29:35") },
      { text: "My eyes were called weak, while my sister was beautiful.", ref: ref("Genesis 29:17") },
      { text: "My husband buried me in the cave where Abraham and Sarah lay.", ref: ref("Genesis 49:31") },
      { text: "My husband loved my younger sister more than me.", ref: ref("Genesis 29:30") },
      { text: "My father tricked Jacob into marrying me before Rachel.", ref: ref("Genesis 29:23–25") },
    ],
    teaching:
      "Leah was Laban’s older daughter. Jacob loved her sister Rachel, but Laban gave Leah to him first. Though Jacob loved Rachel more, God saw Leah and gave her children, including Reuben, Levi and Judah. Jesus came from Judah’s line. Jacob buried her in the family tomb with Abraham and Sarah. See Genesis 29:16–35; 49:31.",
    study: { label: "Explore Leah’s Story", href: "/blog/who-is-leah" },
  }),
  person({
    id: "rachel",
    number: 17,
    answer: "Rachel",
    accepted: ["rahel", "rachael", "rachelle"],
    art: genesisArt("rachel"),
    clues: [
      { text: "Jeremiah heard me weeping for my children in Ramah.", ref: ref("Jeremiah 31:15") },
      { text: "I hid my father’s household gods under a camel saddle and sat on them.", ref: ref("Genesis 31:34") },
      { text: "I died giving birth on the way to Bethlehem.", ref: ref("Genesis 35:16–19") },
      { text: "Jacob worked seven years for me, and they felt like a few days.", ref: ref("Genesis 29:20") },
      { text: "I was the mother of Joseph and Benjamin.", ref: ref("Genesis 35:24") },
    ],
    teaching:
      "Rachel was Laban’s younger daughter and Jacob’s beloved wife. Jacob worked seven years for her, but was tricked into marrying Leah first. For a long time Rachel had no children, then God gave her Joseph. She died giving birth to Benjamin near Bethlehem, and Jeremiah pictures her weeping for her children. See Genesis 29; 30:22–24; 35:16–20; Jeremiah 31:15.",
    study: { label: "Explore Rachel’s Story", href: "/blog/who-was-rachel" },
  }),
  person({
    id: "reuben",
    number: 18,
    answer: "Reuben",
    accepted: ["ruben", "rueben", "reubin"],
    art: genesisArt("reuben"),
    clues: [
      { text: "Moses prayed that my tribe would live and not die.", ref: ref("Deuteronomy 33:6") },
      { text: "I found mandrakes in the field and brought them to my mother.", ref: ref("Genesis 30:14") },
      { text: "I lost my birthright because I dishonoured my father’s bed.", ref: ref("1 Chronicles 5:1") },
      { text: "I talked my brothers out of killing Joseph and planned to rescue him.", ref: ref("Genesis 37:21–22") },
      { text: "I was Jacob’s firstborn son, born to Leah.", ref: ref("Genesis 29:32") },
    ],
    teaching:
      "Reuben was Jacob’s firstborn son, born to Leah. When his brothers wanted to kill Joseph, Reuben talked them into throwing him in a pit, hoping to rescue him later. Because he sinned with his father’s concubine, he lost the rights of the firstborn. Still, his tribe received land in Israel. See Genesis 29:32; 35:22; 37:21–30; 49:3–4; 1 Chronicles 5:1.",
  }),
  person({
    id: "simeon",
    number: 19,
    answer: "Simeon",
    accepted: ["symeon", "simon of jacob", "shimon"],
    art: genesisArt("simeon"),
    clues: [
      { text: "When the tribes were counted in Moab, my families numbered 22,200.", ref: ref("Numbers 26:14") },
      { text: "My tribe’s land lay inside the land of Judah.", ref: ref("Joshua 19:1") },
      { text: "Leah named me because the Lord heard that she was unloved.", ref: ref("Genesis 29:33") },
      { text: "With my brother Levi, I killed the men of Shechem.", ref: ref("Genesis 34:25") },
      { text: "Joseph had me bound and kept in Egypt while my brothers went home.", ref: ref("Genesis 42:24") },
    ],
    teaching:
      "Simeon was Jacob’s second son, born to Leah. With his brother Levi, he attacked the city of Shechem after their sister Dinah was mistreated. When the brothers went to Egypt for grain, Joseph kept Simeon bound until they came back with Benjamin. His tribe later lived within Judah’s land. See Genesis 29:33; 34; 42:24; 43:23; Joshua 19:1.",
  }),
  person({
    id: "levi",
    number: 20,
    answer: "Levi",
    accepted: ["levy", "leevi"],
    art: genesisArt("levi"),
    clues: [
      { text: "My sons were Gershon, Kohath and Merari.", ref: ref("Exodus 6:16") },
      { text: "Leah named me hoping her husband would now be joined to her.", ref: ref("Genesis 29:34") },
      { text: "Both of Moses’ parents came from my family.", ref: ref("Exodus 2:1") },
      { text: "With my brother Simeon, I took revenge on Shechem.", ref: ref("Genesis 34:25–26") },
      { text: "God gave my tribe the work of carrying and caring for the tabernacle.", ref: ref("Numbers 1:50") },
    ],
    teaching:
      "Levi was Jacob’s third son, born to Leah. With Simeon, he took revenge on Shechem, and Jacob rebuked them both. Moses and Aaron came from Levi’s family, and God set apart his tribe to serve at the tabernacle. The Levites received no land of their own, because the Lord was their inheritance. See Genesis 29:34; 34; Exodus 2:1; Numbers 1:50; Joshua 13:33.",
  }),
  person({
    id: "judah",
    number: 21,
    answer: "Judah",
    accepted: ["juda", "judas of jacob", "yehuda"],
    art: genesisArt("judah"),
    clues: [
      { text: "I went up to Timnath to my sheepshearers.", ref: ref("Genesis 38:12") },
      { text: "My father called me a lion’s cub.", ref: ref("Genesis 49:9") },
      { text: "I suggested selling Joseph to the Ishmaelites instead of killing him.", ref: ref("Genesis 37:26–27") },
      { text: "I offered to stay as a slave in Egypt in Benjamin’s place.", ref: ref("Genesis 44:33") },
      { text: "Revelation calls Jesus the Lion of my tribe.", ref: ref("Revelation 5:5") },
    ],
    teaching:
      "Judah was Jacob’s fourth son, born to Leah. He suggested selling Joseph instead of killing him, but years later he offered his own life in place of Benjamin. Jacob called him a lion’s cub and said the sceptre would not leave Judah. King David and Jesus came from his tribe. See Genesis 29:35; 37:26–27; 44:18–34; 49:8–10; Revelation 5:5.",
  }),
  person({
    id: "joseph",
    number: 22,
    answer: "Joseph",
    accepted: ["josef", "joesph", "zaphnath-paaneah", "zaphnathpaaneah"],
    art: genesisArt("joseph"),
    clues: [
      { text: "I married Asenath, the daughter of a priest of On.", ref: ref("Genesis 41:45") },
      { text: "Hebrews says that by faith I gave instructions about my bones.", ref: ref("Hebrews 11:22") },
      { text: "I dreamed my brothers’ sheaves bowed down to my sheaf.", ref: ref("Genesis 37:7") },
      { text: "I explained Pharaoh’s dreams of seven fat cows and seven thin cows.", ref: ref("Genesis 41:25–27") },
      { text: "My father gave me a coat of many colours.", ref: ref("Genesis 37:3") },
    ],
    altTopClues: [
      { text: "A psalm says my feet were hurt with chains after I was sold as a servant.", ref: ref("Psalms 105:17–18") },
      { text: "My bones were buried at Shechem in the ground my father bought.", ref: ref("Joshua 24:32") },
      { text: "I named my firstborn son because God made me forget my trouble.", ref: ref("Genesis 41:51") },
    ],
    teaching:
      "Joseph was the first son of Jacob and Rachel. Jacob gave him a special coat, and his brothers sold him into slavery. In Egypt, Joseph interpreted Pharaoh’s dreams and helped store food before a famine. Years later, he forgave his brothers and provided for his family. See Genesis 30:22–24; 37; 41; 45.",
    study: { label: "Explore Joseph’s Story", href: "/blog/who-was-joseph" },
  }),
  person({
    id: "benjamin",
    number: 23,
    answer: "Benjamin",
    accepted: ["benjamen", "benjamim", "ben-oni", "benoni"],
    art: genesisArt("benjamin"),
    clues: [
      { text: "My father said I would tear like a wolf.", ref: ref("Genesis 49:27") },
      { text: "Paul said he came from my tribe.", ref: ref("Romans 11:1") },
      { text: "My dying mother named me Ben-oni, but my father gave me another name.", ref: ref("Genesis 35:18") },
      { text: "Joseph’s silver cup was found in my sack.", ref: ref("Genesis 44:12") },
      { text: "I was Rachel’s second son and Joseph’s only full brother.", ref: ref("Genesis 35:24") },
    ],
    teaching:
      "Benjamin was Jacob’s youngest son and Rachel’s second, born as she died near Bethlehem. After Joseph was lost, Jacob held Benjamin close. In Egypt, Joseph tested his brothers by hiding his silver cup in Benjamin’s sack. Benjamin’s tribe later gave Israel King Saul and the apostle Paul. See Genesis 35:16–18; 42–45; 49:27; Romans 11:1.",
  }),
  person({
    id: "potiphar",
    number: 24,
    answer: "Potiphar",
    accepted: ["potifar", "potipher", "potiphur"],
    art: genesisArt("potiphar"),
    clues: [
      { text: "Pharaoh’s chief butler and chief baker were held in my house.", ref: ref("Genesis 40:3") },
      { text: "I was an officer of Pharaoh and captain of the guard.", ref: ref("Genesis 37:36") },
      { text: "I bought a Hebrew slave from the Ishmaelites.", ref: ref("Genesis 39:1") },
      { text: "I put my Hebrew slave in charge of everything I owned.", ref: ref("Genesis 39:4–6") },
      { text: "My wife falsely accused Joseph, and I put him in prison.", ref: ref("Genesis 39:19–20") },
    ],
    teaching:
      "Potiphar was an Egyptian officer of Pharaoh, the captain of the guard. He bought Joseph from the Ishmaelites and saw that the Lord made everything Joseph did succeed, so he put Joseph over his whole house. When Potiphar’s wife falsely accused Joseph, Potiphar had him thrown into prison. See Genesis 37:36; 39; 40:3.",
  }),
  person({
    id: "pharaoh",
    number: 25,
    answer: "Pharaoh",
    accepted: ["pharaoh of egypt", "the pharaoh", "pharoah", "pharao", "farao"],
    art: genesisArt("pharaoh"),
    clues: [
      { text: "I asked a very old visitor how old he was.", ref: ref("Genesis 47:8") },
      { text: "I gave my new governor an Egyptian name, Zaphnath-paaneah.", ref: ref("Genesis 41:45") },
      { text: "On my birthday I restored my chief butler and hanged my chief baker.", ref: ref("Genesis 40:20–22") },
      { text: "I put my ring on Joseph’s hand and set him over all Egypt.", ref: ref("Genesis 41:41–42") },
      { text: "I dreamed seven thin cows ate seven fat cows.", ref: ref("Genesis 41:1–4") },
    ],
    teaching:
      "This Pharaoh was the king of Egypt in Joseph’s day. He had two troubling dreams about cows and grain, and Joseph explained them as seven years of plenty followed by seven of famine. Pharaoh made Joseph ruler over Egypt, then welcomed Jacob’s family and gave them land in Goshen. See Genesis 40:20–22; 41; 47:1–10.",
  }),
];
