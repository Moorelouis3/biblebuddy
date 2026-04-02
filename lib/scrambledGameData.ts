export type ScrambledDifficulty = "easy" | "medium" | "hard";

export interface ScrambledQuestion {
  id: string;
  answer: string;
  reference: string;
  sourceLine: string;
  clue: string;
  difficulty: ScrambledDifficulty;
}

export interface ScrambledChapterPack {
  chapter: number;
  title: string;
  description: string;
  questions: ScrambledQuestion[];
}

export interface ScrambledBookPack {
  slug: string;
  name: string;
  shortLabel: string;
  shortDescription: string;
  louisIntro: string;
  accentClassName: string;
  chapters: ScrambledChapterPack[];
}

export interface ScrambledChapterProgress {
  completed: boolean;
  bestScore: number;
  lastPlayedAt: string;
}

export type ScrambledProgressMap = Record<string, ScrambledChapterProgress>;

type RawQuestion = [
  answer: string,
  reference: string,
  sourceLine: string,
  clue: string,
  difficulty: ScrambledDifficulty,
];

export const SCRAMBLED_PROGRESS_STORAGE_KEY = "bb_scrambled_progress_v1";

function createQuestions(bookSlug: string, chapter: number, questions: RawQuestion[]): ScrambledQuestion[] {
  return questions.map(([answer, reference, sourceLine, clue, difficulty], index) => ({
    id: `${bookSlug}-${chapter}-${String(index + 1).padStart(2, "0")}`,
    answer,
    reference,
    sourceLine,
    clue,
    difficulty,
  }));
}

function createGenesisChapter(
  chapter: number,
  description: string,
  questions: RawQuestion[],
): ScrambledChapterPack {
  return {
    chapter,
    title: `Genesis ${chapter}`,
    description,
    questions: createQuestions("genesis", chapter, questions),
  };
}

function createExodusChapter(
  chapter: number,
  description: string,
  questions: RawQuestion[],
): ScrambledChapterPack {
  return {
    chapter,
    title: `Exodus ${chapter}`,
    description,
    questions: createQuestions("exodus", chapter, questions),
  };
}

const GENESIS_CHAPTERS: ScrambledChapterPack[] = [
  createGenesisChapter(1, "Creation unfolds in order as God speaks light, sky, land, life, and humanity into place.", [
    ["light", "Genesis 1:3", "Let there be light", "The first thing God speaks into existence.", "easy"],
    ["day", "Genesis 1:5", "God called the light Day", "What God called the light.", "easy"],
    ["night", "Genesis 1:5", "the darkness he called Night", "What God called the darkness.", "easy"],
    ["earth", "Genesis 1:10", "God called the dry land Earth", "The name God gives the dry land.", "easy"],
    ["heaven", "Genesis 1:8", "God called the firmament Heaven", "What God called the firmament.", "medium"],
  ]),
  createGenesisChapter(2, "The chapter slows down to focus on Eden, Adam's formation, God's command, and the first marriage.", [
    ["dust", "Genesis 2:7", "formed man of the dust", "What man was formed from.", "easy"],
    ["eden", "Genesis 2:8", "a garden eastward in Eden", "The place where God planted the garden.", "easy"],
    ["river", "Genesis 2:10", "a river went out of Eden", "What went out of Eden to water the garden.", "easy"],
    ["garden", "Genesis 2:15", "put him into the garden", "The place Adam was put to dress and keep.", "easy"],
    ["breathed", "Genesis 2:7", "breathed into his nostrils", "What God did to give man the breath of life.", "medium"],
  ]),
  createGenesisChapter(3, "Temptation, disobedience, judgment, and exile reshape the whole human story in this chapter.", [
    ["tree", "Genesis 3:3", "the fruit of the tree", "The forbidden fruit came from this.", "easy"],
    ["serpent", "Genesis 3:1", "the serpent was more subtil", "The creature that speaks to the woman.", "easy"],
    ["naked", "Genesis 3:7", "they knew that they were naked", "What Adam and Eve realized about themselves after eating.", "easy"],
    ["sorrow", "Genesis 3:16", "I will greatly multiply thy sorrow", "What would be multiplied in childbearing.", "medium"],
    ["enmity", "Genesis 3:15", "I will put enmity between thee and the woman", "The conflict God puts between the serpent and the woman.", "medium"],
  ]),
  createGenesisChapter(4, "Cain and Abel bring offerings, jealousy turns deadly, and God marks the first murderer.", [
    ["cain", "Genesis 4:1", "she bare Cain", "Adam and Eve's first son.", "easy"],
    ["abel", "Genesis 4:2", "she again bare his brother Abel", "Cain's brother.", "easy"],
    ["offering", "Genesis 4:3", "Cain brought of the fruit of the ground an offering", "What both brothers brought to the LORD.", "easy"],
    ["brother", "Genesis 4:8", "Cain rose up against Abel his brother", "Who Cain rose up against.", "easy"],
    ["keeper", "Genesis 4:9", "Am I my brother's keeper", "The word Cain used in his famous question.", "medium"],
  ]),
  createGenesisChapter(5, "This genealogy traces Adam's family line and pauses on the remarkable life of Enoch.", [
    ["adam", "Genesis 5:1", "This is the book of the generations of Adam", "The man named at the start of the chapter.", "easy"],
    ["seth", "Genesis 5:3", "Adam lived an hundred and thirty years, and begat a son", "The son born in Adam's likeness after Abel.", "easy"],
    ["years", "Genesis 5:5", "all the days that Adam lived were nine hundred and thirty years", "What the chapter keeps counting in the genealogy.", "easy"],
    ["begat", "Genesis 5:6", "Seth lived an hundred and five years, and begat Enos", "The repeated genealogy word for fathering a son.", "medium"],
    ["enoch", "Genesis 5:24", "Enoch walked with God", "The man who walked with God and was not.", "medium"],
  ]),
  createGenesisChapter(6, "Human wickedness grows, but Noah finds grace and is told to build the ark.", [
    ["noah", "Genesis 6:8", "Noah found grace", "The man who found grace in the eyes of the LORD.", "easy"],
    ["grace", "Genesis 6:8", "found grace in the eyes of the LORD", "What Noah found in the eyes of the LORD.", "easy"],
    ["ark", "Genesis 6:14", "Make thee an ark", "What God told Noah to make.", "easy"],
    ["earth", "Genesis 6:11", "The earth also was corrupt", "What was corrupt before God.", "easy"],
    ["flood", "Genesis 6:17", "I, even I, do bring a flood of waters", "What God said He would bring on the earth.", "medium"],
  ]),
  createGenesisChapter(7, "Noah enters the ark, the rain begins, and the flood covers the earth.", [
    ["rain", "Genesis 7:12", "the rain was upon the earth", "What fell forty days and forty nights.", "easy"],
    ["waters", "Genesis 7:17", "the waters increased", "What lifted up the ark.", "easy"],
    ["ark", "Genesis 7:18", "the ark went upon the face of the waters", "What floated on the waters.", "easy"],
    ["clean", "Genesis 7:2", "Of every clean beast", "The kind of beasts Noah took by sevens.", "medium"],
    ["shut", "Genesis 7:16", "the LORD shut him in", "What the LORD did to Noah in the ark.", "medium"],
  ]),
  createGenesisChapter(8, "The flood begins to recede, the dove returns, and Noah worships after leaving the ark.", [
    ["dove", "Genesis 8:8", "Also he sent forth a dove", "The bird Noah sent out after the raven.", "easy"],
    ["olive", "Genesis 8:11", "an olive leaf pluckt off", "The kind of leaf the dove brought back.", "easy"],
    ["altar", "Genesis 8:20", "Noah builded an altar", "What Noah built after leaving the ark.", "easy"],
    ["window", "Genesis 8:6", "Noah opened the window of the ark", "What Noah opened after forty days.", "easy"],
    ["abated", "Genesis 8:3", "the waters were abated", "The KJV word for the waters going down.", "medium"],
  ]),
  createGenesisChapter(9, "God makes a covenant with Noah, gives the rainbow sign, and Noah's sons are named again.", [
    ["bow", "Genesis 9:13", "I do set my bow in the cloud", "The sign God set in the cloud.", "easy"],
    ["covenant", "Genesis 9:9", "I establish my covenant", "What God established with Noah.", "easy"],
    ["blood", "Genesis 9:4", "the blood thereof", "The life of the flesh is in this.", "easy"],
    ["shem", "Genesis 9:18", "Shem, and Ham, and Japheth", "One of Noah's sons whose name starts with S.", "easy"],
    ["japheth", "Genesis 9:27", "God shall enlarge Japheth", "The son whose name is tied to enlargement.", "medium"],
  ]),
  createGenesisChapter(10, "The nations spread out after the flood through the families of Noah's sons.", [
    ["nations", "Genesis 10:5", "after their nations", "What the families became in the earth.", "easy"],
    ["tongues", "Genesis 10:5", "every one after his tongue", "The word used for languages in this chapter.", "easy"],
    ["families", "Genesis 10:5", "after their families", "The group word repeated through the genealogy.", "easy"],
    ["nimrod", "Genesis 10:8", "Cush begat Nimrod", "The mighty one on the earth.", "medium"],
    ["mighty", "Genesis 10:9", "He was a mighty hunter", "How Nimrod is described before the LORD.", "medium"],
  ]),
  createGenesisChapter(11, "Babel rises in pride, languages are confused, and the line toward Abram is traced.", [
    ["babel", "Genesis 11:9", "the name of it is called Babel", "The city whose name is tied to confusion.", "easy"],
    ["brick", "Genesis 11:3", "let us make brick", "What the builders made thoroughly.", "easy"],
    ["tower", "Genesis 11:4", "let us build us a city and a tower", "What the people wanted to reach unto heaven.", "easy"],
    ["language", "Genesis 11:7", "there confound their language", "What the LORD confounded at Babel.", "easy"],
    ["terah", "Genesis 11:26", "Terah lived seventy years", "Abram's father.", "medium"],
  ]),
  createGenesisChapter(12, "Abram is called to leave home, builds altars, and travels through famine into Egypt.", [
    ["abram", "Genesis 12:1", "the LORD had said unto Abram", "The man God first calls in this chapter.", "easy"],
    ["sarai", "Genesis 12:5", "Abram took Sarai his wife", "Abram's wife before her name was changed.", "easy"],
    ["altar", "Genesis 12:7", "there builded he an altar", "What Abram built unto the LORD.", "easy"],
    ["famine", "Genesis 12:10", "there was a famine in the land", "What drove Abram down into Egypt.", "easy"],
    ["egypt", "Genesis 12:10", "Abram went down into Egypt", "The land Abram went down into during the famine.", "medium"],
  ]),
  createGenesisChapter(13, "Abram and Lot separate, and Lot chooses the well-watered plain toward Sodom.", [
    ["lot", "Genesis 13:5", "Lot also, which went with Abram", "Abram's nephew.", "easy"],
    ["plain", "Genesis 13:10", "all the plain of Jordan", "The part of Jordan Lot saw.", "easy"],
    ["sodom", "Genesis 13:12", "pitched his tent toward Sodom", "The city Lot pitched toward.", "easy"],
    ["bethel", "Genesis 13:3", "between Bethel and Hai", "The place Abram returned to at the start.", "medium"],
    ["strife", "Genesis 13:7", "there was a strife between the herdmen", "What broke out between the herdmen.", "medium"],
  ]),
  createGenesisChapter(14, "Kings go to war, Lot is captured, and Abram meets Melchizedek after victory.", [
    ["kings", "Genesis 14:9", "the king of Elam", "The kind of rulers fighting in this chapter.", "easy"],
    ["battle", "Genesis 14:8", "they joined battle", "What the kings joined in the vale of Siddim.", "easy"],
    ["spoil", "Genesis 14:11", "they took all the goods", "What was taken after the fighting.", "easy"],
    ["priest", "Genesis 14:18", "he was the priest of the most high God", "What Melchizedek was.", "medium"],
    ["tithe", "Genesis 14:20", "he gave him tithes of all", "What Abram gave Melchizedek.", "medium"],
  ]),
  createGenesisChapter(15, "God reassures Abram with stars, covenant promises, and a vision in the night.", [
    ["stars", "Genesis 15:5", "tell the stars", "What Abram was told to count.", "easy"],
    ["seed", "Genesis 15:5", "So shall thy seed be", "What God promised Abram would be multiplied.", "easy"],
    ["covenant", "Genesis 15:18", "the LORD made a covenant", "What the LORD made with Abram.", "easy"],
    ["sleep", "Genesis 15:12", "a deep sleep fell upon Abram", "What fell upon Abram at sunset.", "medium"],
    ["pieces", "Genesis 15:10", "divided them in the midst", "What Abram set each one against after dividing the animals.", "medium"],
  ]),
  createGenesisChapter(16, "Hagar flees into the wilderness, and Ishmael is promised before he is born.", [
    ["hagar", "Genesis 16:1", "she had an handmaid", "Sarai's Egyptian handmaid.", "easy"],
    ["ishmael", "Genesis 16:11", "thou shalt call his name Ishmael", "The son born to Hagar.", "easy"],
    ["angel", "Genesis 16:7", "the angel of the LORD found her", "Who found Hagar by a fountain.", "easy"],
    ["flee", "Genesis 16:6", "she fled from her face", "What Hagar did from Sarai's face.", "easy"],
    ["maid", "Genesis 16:2", "my maid", "The short word Sarai used for her servant woman.", "medium"],
  ]),
  createGenesisChapter(17, "God changes names, promises Isaac, and gives circumcision as the covenant sign.", [
    ["covenant", "Genesis 17:2", "I will make my covenant", "What God said He would make with Abram.", "easy"],
    ["sarah", "Genesis 17:15", "Sarah shall her name be", "Sarai's new name.", "easy"],
    ["isaac", "Genesis 17:19", "thou shalt call his name Isaac", "The promised son by Sarah.", "easy"],
    ["nations", "Genesis 17:4", "a father of many nations", "What God said Abram would become father of.", "easy"],
    ["token", "Genesis 17:11", "a token of the covenant", "The word used for the covenant sign.", "medium"],
  ]),
  createGenesisChapter(18, "The LORD visits Abraham, Sarah laughs, and Abraham intercedes for Sodom.", [
    ["laugh", "Genesis 18:12", "Sarah laughed within herself", "What Sarah did in the tent door.", "easy"],
    ["tent", "Genesis 18:10", "Sarah heard it in the tent door", "Where Sarah heard the promise.", "easy"],
    ["sodom", "Genesis 18:20", "the cry of Sodom", "The city Abraham intercedes for.", "easy"],
    ["fifty", "Genesis 18:24", "Peradventure there be fifty righteous", "The first number Abraham asks about.", "medium"],
    ["judge", "Genesis 18:25", "the Judge of all the earth", "What Abraham calls the LORD in his question.", "medium"],
  ]),
  createGenesisChapter(19, "Sodom falls in fire, Lot escapes, and his wife becomes a pillar of salt.", [
    ["lot", "Genesis 19:1", "Lot sat in the gate of Sodom", "The man sitting in the gate of Sodom.", "easy"],
    ["brimstone", "Genesis 19:24", "brimstone and fire", "What rained with fire on Sodom.", "medium"],
    ["pillar", "Genesis 19:26", "a pillar of salt", "What Lot's wife became.", "easy"],
    ["cave", "Genesis 19:30", "Lot dwelt in a cave", "Where Lot lived with his two daughters.", "easy"],
    ["zoar", "Genesis 19:22", "Haste thee, escape thither", "The little city Lot asked to flee into.", "medium"],
  ]),
  createGenesisChapter(20, "Abraham and Sarah stay in Gerar, and God warns Abimelech in a dream.", [
    ["dream", "Genesis 20:3", "God came to Abimelech in a dream", "How God came to Abimelech.", "easy"],
    ["sister", "Genesis 20:2", "She is my sister", "What Abraham said Sarah was.", "easy"],
    ["prophet", "Genesis 20:7", "for he is a prophet", "What God calls Abraham.", "medium"],
    ["prayer", "Genesis 20:17", "Abraham prayed unto God", "What Abraham offered for Abimelech.", "easy"],
    ["abimelech", "Genesis 20:2", "Abimelech king of Gerar", "The king of Gerar.", "medium"],
  ]),
  createGenesisChapter(21, "Isaac is born, Hagar departs, and Abraham makes a covenant near a well.", [
    ["isaac", "Genesis 21:3", "called the name of his son Isaac", "The son Sarah finally bore.", "easy"],
    ["weaned", "Genesis 21:8", "the child grew, and was weaned", "What happened to Isaac when Abraham made a great feast.", "medium"],
    ["lad", "Genesis 21:18", "lift up the lad", "The word God uses for Ishmael in the wilderness scene.", "easy"],
    ["well", "Genesis 21:19", "she saw a well of water", "What Hagar saw when God opened her eyes.", "easy"],
    ["lambs", "Genesis 21:28", "seven ewe lambs", "What Abraham set by themselves for the witness.", "medium"],
  ]),
  createGenesisChapter(22, "Abraham is tested on Mount Moriah, and God provides a ram instead of Isaac.", [
    ["moriah", "Genesis 22:2", "the land of Moriah", "The land where Abraham took Isaac.", "medium"],
    ["altar", "Genesis 22:9", "Abraham built an altar there", "What Abraham built on the mountain.", "easy"],
    ["knife", "Genesis 22:10", "took the knife", "What Abraham took in his hand.", "easy"],
    ["ram", "Genesis 22:13", "a ram caught in a thicket", "What God provided in place of Isaac.", "easy"],
    ["lad", "Genesis 22:12", "Lay not thine hand upon the lad", "The word the angel used for Isaac.", "easy"],
  ]),
  createGenesisChapter(23, "Sarah dies, and Abraham buys the cave of Machpelah as a burial place.", [
    ["sarah", "Genesis 23:2", "Sarah died", "The woman whose death opens the chapter.", "easy"],
    ["cave", "Genesis 23:9", "the cave of Machpelah", "What Abraham asked to buy from Ephron.", "easy"],
    ["ephron", "Genesis 23:8", "entreat for me to Ephron", "The man Abraham spoke to about the field.", "medium"],
    ["silver", "Genesis 23:16", "Abraham weighed to Ephron the silver", "What Abraham weighed out for the purchase.", "easy"],
    ["bury", "Genesis 23:4", "that I may bury my dead", "What Abraham wanted to do with Sarah.", "easy"],
  ]),
  createGenesisChapter(24, "Abraham's servant finds Rebekah at the well and brings her to Isaac.", [
    ["camel", "Genesis 24:10", "the servant took ten camels", "The animals the servant took on the journey.", "easy"],
    ["rebekah", "Genesis 24:15", "Rebekah came out", "The young woman who came to the well.", "easy"],
    ["well", "Genesis 24:16", "she went down to the well", "Where the servant first sees Rebekah.", "easy"],
    ["jewels", "Genesis 24:22", "a golden earring and two bracelets", "What the servant gave Rebekah.", "medium"],
    ["oath", "Genesis 24:9", "the servant put his hand under the thigh of Abraham", "What the servant swore to Abraham.", "medium"],
  ]),
  createGenesisChapter(25, "Abraham dies, and Jacob and Esau begin their story with a struggle over birthright.", [
    ["esau", "Genesis 25:25", "the first came out red", "Isaac's firstborn son.", "easy"],
    ["jacob", "Genesis 25:26", "his hand took hold on Esau's heel", "The younger twin brother.", "easy"],
    ["pottage", "Genesis 25:29", "Jacob sod pottage", "What Jacob was cooking when Esau came in faint.", "medium"],
    ["birthright", "Genesis 25:31", "Sell me this day thy birthright", "What Jacob asked Esau to sell.", "medium"],
    ["lentiles", "Genesis 25:34", "pottage of lentiles", "The kind of pottage Esau received.", "medium"],
  ]),
  createGenesisChapter(26, "Isaac stays in Gerar, prospers, and reopens wells despite conflict.", [
    ["wells", "Genesis 26:15", "the Philistines had stopped them", "What Abraham's servants had dug that Isaac reopened.", "easy"],
    ["gerar", "Genesis 26:1", "unto Gerar", "The place Isaac went during the famine.", "medium"],
    ["seed", "Genesis 26:12", "Isaac sowed in that land", "What Isaac sowed and received an hundredfold from.", "easy"],
    ["famine", "Genesis 26:1", "there was a famine in the land", "What came in the land besides the first famine.", "easy"],
    ["oath", "Genesis 26:31", "they sware one to another", "What Isaac and Abimelech made before parting.", "medium"],
  ]),
  createGenesisChapter(27, "Jacob takes Esau's blessing through disguise, goats, and a borrowed identity.", [
    ["venison", "Genesis 27:3", "make me savoury meat", "What Isaac wanted Esau to bring from the field.", "medium"],
    ["blessing", "Genesis 27:27", "he blessed him", "What Jacob received from Isaac.", "easy"],
    ["hairy", "Genesis 27:11", "Esau my brother is a hairy man", "How Jacob described Esau.", "easy"],
    ["voice", "Genesis 27:22", "The voice is Jacob's voice", "What Isaac said sounded like Jacob.", "easy"],
    ["goats", "Genesis 27:16", "the skins of the kids of the goats", "What Rebekah used to cover Jacob's hands.", "medium"],
  ]),
  createGenesisChapter(28, "Jacob sees the ladder at Bethel and makes a vow after sleeping on a stone.", [
    ["ladder", "Genesis 28:12", "a ladder set up on the earth", "What Jacob saw reaching to heaven.", "easy"],
    ["stone", "Genesis 28:18", "Jacob took the stone", "What Jacob set up for a pillar.", "easy"],
    ["vow", "Genesis 28:20", "Jacob vowed a vow", "What Jacob made after the dream.", "medium"],
    ["angels", "Genesis 28:12", "the angels of God ascending and descending", "Who Jacob saw on the ladder.", "easy"],
    ["bethel", "Genesis 28:19", "the name of that place Bethel", "The new name Jacob gave the place.", "medium"],
  ]),
  createGenesisChapter(29, "Jacob meets Rachel, serves Laban, and is given Leah first.", [
    ["laban", "Genesis 29:10", "the flock of Laban", "Rachel's father.", "easy"],
    ["rachel", "Genesis 29:9", "Rachel came with her father's sheep", "The daughter Jacob first loved.", "easy"],
    ["leah", "Genesis 29:23", "he took Leah his daughter", "The older sister given to Jacob first.", "easy"],
    ["wages", "Genesis 29:15", "what shall thy wages be", "What Laban asked Jacob about his work.", "medium"],
    ["seven", "Genesis 29:20", "Jacob served seven years", "How many years Jacob first served.", "easy"],
  ]),
  createGenesisChapter(30, "Jacob's household grows, and his flocks increase through long years with Laban.", [
    ["joseph", "Genesis 30:24", "she called his name Joseph", "Rachel's son born near the end of the chapter.", "easy"],
    ["hire", "Genesis 30:16", "I have surely hired thee", "Leah's word about Jacob that evening.", "medium"],
    ["rods", "Genesis 30:37", "Jacob took him rods", "What Jacob peeled before the flocks.", "medium"],
    ["cattle", "Genesis 30:43", "had much cattle", "What Jacob had much of at the end.", "easy"],
    ["mandrakes", "Genesis 30:14", "found mandrakes", "What Reuben found in the field.", "medium"],
  ]),
  createGenesisChapter(31, "Jacob secretly leaves Laban, Rachel takes the images, and a covenant heap is raised.", [
    ["laban", "Genesis 31:20", "to Laban the Syrian", "The man Jacob left behind.", "easy"],
    ["rachel", "Genesis 31:19", "Rachel had stolen the images", "The wife who stole the images.", "easy"],
    ["heap", "Genesis 31:46", "made an heap", "What Jacob and Laban made together.", "easy"],
    ["covenant", "Genesis 31:44", "let us make a covenant", "What Laban proposed between them.", "easy"],
    ["dream", "Genesis 31:24", "God came to Laban ... in a dream", "How God warned Laban.", "medium"],
  ]),
  createGenesisChapter(32, "Jacob fears Esau, wrestles through the night, and receives the name Israel.", [
    ["jacob", "Genesis 32:24", "Jacob was left alone", "The man left alone before the wrestling.", "easy"],
    ["esau", "Genesis 32:3", "Jacob sent messengers before him to Esau", "The brother Jacob feared meeting.", "easy"],
    ["wrestled", "Genesis 32:24", "there wrestled a man with him", "What the man did with Jacob until daybreak.", "medium"],
    ["present", "Genesis 32:13", "a present for Esau", "What Jacob prepared for Esau.", "easy"],
    ["israel", "Genesis 32:28", "thy name shall be called ... Israel", "Jacob's new name.", "easy"],
  ]),
  createGenesisChapter(33, "Jacob and Esau meet in peace, bowing and embracing after many years apart.", [
    ["esau", "Genesis 33:4", "Esau ran to meet him", "The brother who ran to meet Jacob.", "easy"],
    ["bowed", "Genesis 33:3", "he bowed himself to the ground", "What Jacob did before reaching Esau.", "medium"],
    ["present", "Genesis 33:10", "my blessing that is brought to thee", "The gift Jacob urged Esau to accept.", "easy"],
    ["succoth", "Genesis 33:17", "Jacob journeyed to Succoth", "The place where Jacob built booths.", "medium"],
    ["droves", "Genesis 33:8", "all this drove", "The word for the groups of animals Jacob sent ahead.", "medium"],
  ]),
  createGenesisChapter(34, "Dinah is defiled, her brothers answer deceitfully, and violence follows in Shechem.", [
    ["dinah", "Genesis 34:1", "Dinah the daughter of Leah", "Jacob's daughter named at the start.", "easy"],
    ["shechem", "Genesis 34:2", "Shechem the son of Hamor", "The man who took Dinah.", "easy"],
    ["circumcise", "Genesis 34:15", "every male of you be circumcised", "What Jacob's sons demanded of the men.", "medium"],
    ["city", "Genesis 34:25", "came upon the city boldly", "What Simeon and Levi attacked.", "easy"],
    ["deceit", "Genesis 34:13", "answered ... deceitfully", "How Jacob's sons answered.", "medium"],
  ]),
  createGenesisChapter(35, "Jacob returns to Bethel, buries idols, and Benjamin is born as Rachel dies.", [
    ["bethel", "Genesis 35:1", "Arise, go up to Bethel", "Where God told Jacob to go.", "easy"],
    ["idols", "Genesis 35:2", "Put away the strange gods", "What Jacob told his household to put away.", "easy"],
    ["benjamin", "Genesis 35:18", "his father called him Benjamin", "Rachel's son whose name was changed.", "easy"],
    ["pillar", "Genesis 35:14", "Jacob set up a pillar", "What Jacob set up where God talked with him.", "medium"],
    ["ephrath", "Genesis 35:19", "buried in the way to Ephrath", "The place connected with Rachel's burial.", "medium"],
  ]),
  createGenesisChapter(36, "Esau's family line is traced out in Edom with chiefs, mounts, and names.", [
    ["esau", "Genesis 36:1", "the generations of Esau", "The man whose generations are listed.", "easy"],
    ["edom", "Genesis 36:1", "who is Edom", "The other name for Esau's line.", "easy"],
    ["dukes", "Genesis 36:15", "These were dukes", "The title repeated through the chapter.", "medium"],
    ["mount", "Genesis 36:8", "Esau dwelt in mount Seir", "The geographic word before Seir.", "easy"],
    ["seir", "Genesis 36:8", "mount Seir", "The mountain region where Esau dwelt.", "medium"],
  ]),
  createGenesisChapter(37, "Joseph's dreams stir jealousy, and his brothers cast him into a pit before selling him.", [
    ["joseph", "Genesis 37:3", "Israel loved Joseph", "The son loved more than all his brothers.", "easy"],
    ["coat", "Genesis 37:3", "a coat of many colours", "The special garment Jacob made for Joseph.", "easy"],
    ["dreams", "Genesis 37:5", "Joseph dreamed a dream", "What Joseph kept telling his brothers.", "easy"],
    ["pit", "Genesis 37:24", "they cast him into a pit", "Where Joseph was thrown.", "easy"],
    ["sheaf", "Genesis 37:7", "my sheaf arose", "The farm image in Joseph's first dream.", "medium"],
  ]),
  createGenesisChapter(38, "Judah's household is tested, and Tamar is declared more righteous than he.", [
    ["judah", "Genesis 38:1", "Judah went down", "The brother at the center of the chapter.", "easy"],
    ["tamar", "Genesis 38:6", "whose name was Tamar", "Judah's daughter in law.", "easy"],
    ["signet", "Genesis 38:18", "thy signet, and thy bracelets, and thy staff", "One of the items Judah left as a pledge.", "medium"],
    ["scarlet", "Genesis 38:28", "a scarlet thread", "The color of the thread tied on the hand.", "medium"],
    ["twins", "Genesis 38:27", "twins were in her womb", "What Tamar was carrying.", "easy"],
  ]),
  createGenesisChapter(39, "Joseph prospers in Potiphar's house, resists temptation, and is cast into prison.", [
    ["joseph", "Genesis 39:2", "the LORD was with Joseph", "The man the LORD was with in Egypt.", "easy"],
    ["prison", "Genesis 39:20", "put him into the prison", "Where Joseph was placed after the false accusation.", "easy"],
    ["garment", "Genesis 39:12", "he left his garment in her hand", "What Joseph left behind as he fled.", "easy"],
    ["master", "Genesis 39:8", "my master wotteth not", "Who trusted Joseph with the house.", "easy"],
    ["prospered", "Genesis 39:23", "the LORD made it to prosper", "What the LORD made Joseph's work do.", "medium"],
  ]),
  createGenesisChapter(40, "Pharaoh's butler and baker dream in prison, and Joseph interprets both.", [
    ["baker", "Genesis 40:1", "the chief baker", "The prisoner's title connected with baskets.", "easy"],
    ["butler", "Genesis 40:1", "the chief butler", "The prisoner's title connected with the cup.", "easy"],
    ["dream", "Genesis 40:8", "we have dreamed a dream", "What troubled both prisoners.", "easy"],
    ["prison", "Genesis 40:3", "he put them in ward", "Where Joseph met them.", "easy"],
    ["baskets", "Genesis 40:16", "three white baskets", "What the baker saw in his dream.", "medium"],
  ]),
  createGenesisChapter(41, "Pharaoh dreams of cows and corn, and Joseph is lifted up to govern Egypt.", [
    ["pharaoh", "Genesis 41:1", "Pharaoh dreamed", "The ruler who dreamed at the river.", "easy"],
    ["corn", "Genesis 41:5", "ears of corn", "What grew on one stalk in the dream.", "easy"],
    ["kine", "Genesis 41:2", "well favoured kine", "The KJV word for cows in the dream.", "medium"],
    ["famine", "Genesis 41:30", "seven years of famine", "What would come after the years of plenty.", "easy"],
    ["plenty", "Genesis 41:29", "seven years of great plenty", "What the first seven years would bring.", "easy"],
  ]),
  createGenesisChapter(42, "Joseph's brothers come for corn, but they do not yet know the governor is Joseph.", [
    ["brethren", "Genesis 42:3", "Joseph's ten brethren", "The word used for Joseph's brothers.", "easy"],
    ["sacks", "Genesis 42:25", "into his sack", "Where Joseph had the money returned.", "easy"],
    ["corn", "Genesis 42:2", "buy for us from thence", "What Jacob sent his sons to buy in Egypt.", "easy"],
    ["egypt", "Genesis 42:3", "to buy corn in Egypt", "The land where the brothers went.", "easy"],
    ["simeon", "Genesis 42:24", "took from them Simeon", "The brother Joseph bound before their eyes.", "medium"],
  ]),
  createGenesisChapter(43, "Benjamin goes to Egypt, and Joseph's house prepares a feast for the brothers.", [
    ["benjamin", "Genesis 43:15", "and Benjamin", "The younger brother who finally went down.", "easy"],
    ["steward", "Genesis 43:16", "the ruler of his house", "The house official Joseph gave orders to.", "medium"],
    ["present", "Genesis 43:11", "carry down the man a present", "What Jacob told them to take to the man.", "easy"],
    ["feast", "Genesis 43:16", "these men shall dine with me at noon", "What Joseph prepared at noon.", "easy"],
    ["money", "Genesis 43:12", "take double money", "What Jacob told them to carry twice.", "easy"],
  ]),
  createGenesisChapter(44, "Joseph's silver cup is hidden, and Judah pleads when Benjamin is accused.", [
    ["silver", "Genesis 44:2", "the silver cup", "The kind of cup hidden in Benjamin's sack.", "easy"],
    ["cup", "Genesis 44:2", "Put my cup", "The object planted in the sack.", "easy"],
    ["sack", "Genesis 44:2", "in the sack's mouth", "Where the cup was hidden.", "easy"],
    ["governor", "Genesis 44:18", "thou art even as Pharaoh", "The title held by Joseph in Egypt.", "medium"],
    ["judah", "Genesis 44:18", "Then Judah came near unto him", "The brother who stepped forward to speak.", "easy"],
  ]),
  createGenesisChapter(45, "Joseph reveals himself, weeps over his brothers, and calls for Jacob to come to Goshen.", [
    ["joseph", "Genesis 45:3", "I am Joseph", "The brother who finally reveals himself.", "easy"],
    ["goshen", "Genesis 45:10", "the land of Goshen", "The land Joseph wanted Jacob to live in.", "medium"],
    ["father", "Genesis 45:9", "come down unto me", "Who Joseph wanted brought down quickly.", "easy"],
    ["wagons", "Genesis 45:19", "take you wagons", "The vehicles Pharaoh sent for Jacob's family.", "medium"],
    ["wept", "Genesis 45:2", "he wept aloud", "What Joseph did so loudly the Egyptians heard it.", "easy"],
  ]),
  createGenesisChapter(46, "Jacob journeys to Egypt, hears God's reassurance, and his family is counted.", [
    ["goshen", "Genesis 46:28", "to direct his face unto Goshen", "Where Judah was sent before Jacob.", "easy"],
    ["beersheba", "Genesis 46:1", "Israel came to Beersheba", "Where Jacob offered sacrifices before leaving.", "medium"],
    ["wagons", "Genesis 46:5", "in the wagons", "What carried the families into Egypt.", "easy"],
    ["souls", "Genesis 46:27", "all the souls of the house of Jacob", "The word used for the persons counted.", "medium"],
    ["judah", "Genesis 46:28", "he sent Judah before him", "The son Jacob sent ahead.", "easy"],
  ]),
  createGenesisChapter(47, "Joseph manages the famine in Egypt, and Jacob asks to be buried with his fathers.", [
    ["famine", "Genesis 47:13", "the famine was very sore", "What was very sore in the land.", "easy"],
    ["bread", "Genesis 47:15", "Give us bread", "What the Egyptians cried out for.", "easy"],
    ["cattle", "Genesis 47:17", "for the cattle of the herds", "What the people traded for bread.", "easy"],
    ["pharaoh", "Genesis 47:14", "Pharaoh's house", "The ruler whose house received the money.", "easy"],
    ["bury", "Genesis 47:29", "bury me not ... in Egypt", "What Jacob asked Joseph to do outside Egypt.", "easy"],
  ]),
  createGenesisChapter(48, "Jacob blesses Joseph's sons, crossing his hands so the younger receives the greater blessing.", [
    ["ephraim", "Genesis 48:14", "his right hand upon Ephraim's head", "The younger son who received the right hand.", "medium"],
    ["manasseh", "Genesis 48:14", "his left hand upon Manasseh's head", "The firstborn son of Joseph.", "medium"],
    ["hands", "Genesis 48:14", "guiding his hands wittingly", "What Jacob crossed while blessing.", "easy"],
    ["younger", "Genesis 48:19", "his younger brother shall be greater", "Which brother Jacob said would be greater.", "easy"],
    ["bless", "Genesis 48:20", "he blessed them that day", "What Jacob did to Joseph's sons.", "easy"],
  ]),
  createGenesisChapter(49, "Jacob blesses his sons, and the chapter pauses on Judah with the sceptre promise.", [
    ["sceptre", "Genesis 49:10", "The sceptre shall not depart from Judah", "What would not depart from Judah.", "medium"],
    ["judah", "Genesis 49:8", "Judah, thou art he", "The son whose line receives the sceptre promise.", "easy"],
    ["lion", "Genesis 49:9", "Judah is a lion's whelp", "The animal image used for Judah.", "easy"],
    ["benjamin", "Genesis 49:27", "Benjamin shall ravin as a wolf", "The son compared to a wolf.", "medium"],
    ["tribes", "Genesis 49:28", "the twelve tribes of Israel", "What the sons are called together.", "easy"],
  ]),
  createGenesisChapter(50, "Jacob is buried, Joseph forgives his brothers again, and Genesis closes with a coffin in Egypt.", [
    ["embalmed", "Genesis 50:2", "the physicians embalmed Israel", "What the physicians did to Jacob.", "medium"],
    ["coffin", "Genesis 50:26", "a coffin in Egypt", "Where Joseph was placed at the end of the book.", "easy"],
    ["bones", "Genesis 50:25", "carry up my bones", "What Joseph told his brethren to carry up.", "easy"],
    ["brethren", "Genesis 50:15", "Joseph's brethren saw", "The word used again for Joseph's brothers.", "easy"],
    ["wept", "Genesis 50:17", "Joseph wept", "What Joseph did when he heard their message.", "easy"],
  ]),
];

const EXODUS_CHAPTERS: ScrambledChapterPack[] = [
  createExodusChapter(1, "Israel multiplies in Egypt, and Pharaoh begins to oppress them with hard bondage.", [
    ["egypt", "Exodus 1:1", "the names of the children of Israel, which came into Egypt", "The land where Jacob's family lived.", "easy"],
    ["pharaoh", "Exodus 1:8", "there arose up a new king over Egypt", "The ruler over Egypt.", "easy"],
    ["bondage", "Exodus 1:14", "made their lives bitter with hard bondage", "What made Israel's lives bitter.", "medium"],
    ["midwives", "Exodus 1:15", "the king of Egypt spake to the Hebrew midwives", "The women Pharaoh spoke to about the Hebrew babies.", "medium"],
    ["river", "Exodus 1:22", "cast him into the river", "Where Pharaoh ordered the Hebrew sons to be cast.", "easy"],
  ]),
  createExodusChapter(2, "Moses is born, hidden in an ark of bulrushes, and later flees into Midian.", [
    ["ark", "Exodus 2:3", "she took for him an ark of bulrushes", "What Moses was placed in as a baby.", "easy"],
    ["bulrushes", "Exodus 2:3", "an ark of bulrushes", "The plant used to make Moses's little ark.", "medium"],
    ["daughter", "Exodus 2:5", "the daughter of Pharaoh came down", "Who found Moses by the river.", "easy"],
    ["midian", "Exodus 2:15", "Moses fled from the face of Pharaoh, and dwelt in the land of Midian", "The land Moses fled to.", "easy"],
    ["reeds", "Exodus 2:3", "laid it in the flags by the river's brink", "The plants near the river where Moses was hidden.", "medium"],
  ]),
  createExodusChapter(3, "God appears in the burning bush and calls Moses to bring Israel out of Egypt.", [
    ["bush", "Exodus 3:2", "the bush burned with fire", "What burned with fire but was not consumed.", "easy"],
    ["holy", "Exodus 3:5", "the place whereon thou standest is holy ground", "The kind of ground Moses was standing on.", "easy"],
    ["shoes", "Exodus 3:5", "put off thy shoes from off thy feet", "What Moses was told to remove.", "easy"],
    ["deliver", "Exodus 3:8", "I am come down to deliver them", "What God came down to do for Israel.", "medium"],
    ["memorial", "Exodus 3:15", "this is my memorial unto all generations", "What God called His name for all generations.", "medium"],
  ]),
  createExodusChapter(4, "Moses receives signs, Aaron joins him, and the people begin to believe God's message.", [
    ["serpent", "Exodus 4:3", "it became a serpent", "What the rod became on the ground.", "easy"],
    ["rod", "Exodus 4:2", "a rod", "What Moses had in his hand.", "easy"],
    ["leprous", "Exodus 4:6", "his hand was leprous as snow", "How Moses's hand looked in the sign.", "medium"],
    ["aaron", "Exodus 4:14", "is not Aaron the Levite thy brother", "The brother appointed to speak for Moses.", "easy"],
    ["believed", "Exodus 4:31", "the people believed", "What the people did after hearing the message.", "easy"],
  ]),
  createExodusChapter(5, "Moses and Aaron speak to Pharaoh, but Pharaoh increases the burden on the people.", [
    ["straw", "Exodus 5:7", "Ye shall no more give the people straw", "What Pharaoh stopped giving for brickmaking.", "easy"],
    ["bricks", "Exodus 5:7", "to make brick", "What the people still had to make.", "easy"],
    ["burdens", "Exodus 5:4", "get you unto your burdens", "The heavy work Pharaoh pressed on them.", "medium"],
    ["idle", "Exodus 5:8", "for they be idle", "How Pharaoh described the people.", "easy"],
    ["officers", "Exodus 5:14", "the officers of the children of Israel", "The leaders beaten because the work was not done.", "medium"],
  ]),
  createExodusChapter(6, "God repeats His covenant promises and names the fathers and leaders of Israel.", [
    ["covenant", "Exodus 6:4", "I have also established my covenant with them", "What God says He established with the fathers.", "easy"],
    ["redeem", "Exodus 6:6", "I will redeem you with a stretched out arm", "What God promised to do for Israel.", "medium"],
    ["arm", "Exodus 6:6", "with a stretched out arm", "What God said would be stretched out.", "easy"],
    ["levi", "Exodus 6:16", "these are the names of the sons of Levi", "The tribe named in the genealogy section.", "easy"],
    ["hosts", "Exodus 6:26", "bring out the children of Israel ... according to their armies", "The ordered groups of Israel under Moses and Aaron.", "medium"],
  ]),
  createExodusChapter(7, "Aaron's rod becomes a serpent, and the waters of Egypt turn to blood.", [
    ["blood", "Exodus 7:20", "all the waters that were in the river were turned to blood", "What the water became.", "easy"],
    ["river", "Exodus 7:20", "the waters that were in the river", "Where the first plague struck.", "easy"],
    ["magicians", "Exodus 7:11", "the magicians of Egypt", "Who tried to do the same with their enchantments.", "medium"],
    ["serpent", "Exodus 7:10", "Aaron's rod became a serpent", "What Aaron's rod became before Pharaoh.", "easy"],
    ["hardened", "Exodus 7:13", "he hardened Pharaoh's heart", "What happened to Pharaoh's heart.", "medium"],
  ]),
  createExodusChapter(8, "Frogs, lice, and flies cover Egypt as Pharaoh keeps hardening his heart.", [
    ["frogs", "Exodus 8:6", "the frogs came up", "The plague that covered the land first in this chapter.", "easy"],
    ["lice", "Exodus 8:17", "it became lice", "What the dust became.", "easy"],
    ["flies", "Exodus 8:24", "there came a grievous swarm of flies", "The swarm that filled Pharaoh's house.", "easy"],
    ["dust", "Exodus 8:17", "all the dust of the land became lice", "What became lice throughout Egypt.", "easy"],
    ["entreat", "Exodus 8:8", "Entreat the LORD", "What Pharaoh asked Moses to do.", "medium"],
  ]),
  createExodusChapter(9, "Murrain, boils, and hail fall on Egypt, and Pharaoh still refuses to yield.", [
    ["hail", "Exodus 9:23", "the LORD sent thunder and hail", "The plague that beat upon man and beast.", "easy"],
    ["boils", "Exodus 9:10", "it became a boil breaking forth with blains", "The plague that broke out on man and beast.", "easy"],
    ["blains", "Exodus 9:10", "a boil breaking forth with blains", "The KJV word paired with boils.", "medium"],
    ["murrain", "Exodus 9:3", "a very grievous murrain", "The disease that struck the cattle.", "medium"],
    ["thunder", "Exodus 9:23", "the LORD sent thunder and hail", "What came with the hail.", "easy"],
  ]),
  createExodusChapter(10, "Locusts and darkness strike Egypt before Pharaoh again refuses to let Israel go.", [
    ["locusts", "Exodus 10:14", "the locusts went up over all the land", "The plague that ate every herb.", "easy"],
    ["darkness", "Exodus 10:21", "that there may be darkness over the land of Egypt", "The plague that could be felt.", "easy"],
    ["herbs", "Exodus 10:15", "they did eat every herb of the land", "What the locusts ate.", "easy"],
    ["hardened", "Exodus 10:20", "the LORD hardened Pharaoh's heart", "What happened again to Pharaoh's heart.", "medium"],
    ["depart", "Exodus 10:28", "see my face no more", "What Moses had to do from Pharaoh's presence.", "medium"],
  ]),
  createExodusChapter(11, "God announces the final plague and tells Israel to prepare for departure.", [
    ["firstborn", "Exodus 11:5", "all the firstborn in the land of Egypt shall die", "Who would die in the last plague.", "easy"],
    ["jewels", "Exodus 11:2", "borrow ... jewels of silver, and jewels of gold", "What the people were told to ask from the Egyptians.", "medium"],
    ["midnight", "Exodus 11:4", "About midnight will I go out", "The time God said He would go out into Egypt.", "easy"],
    ["cry", "Exodus 11:6", "there shall be a great cry throughout all the land of Egypt", "What would be heard through Egypt.", "easy"],
    ["servants", "Exodus 11:8", "all these thy servants shall come down unto me", "Who Moses said would bow to him.", "medium"],
  ]),
  createExodusChapter(12, "Passover is established, the firstborn die, and Israel begins to leave Egypt.", [
    ["lamb", "Exodus 12:3", "they shall take to them every man a lamb", "What each household was to take.", "easy"],
    ["passover", "Exodus 12:11", "it is the LORD'S passover", "The name of the feast instituted here.", "easy"],
    ["blood", "Exodus 12:13", "the blood shall be to you for a token", "What was put on the houses as a token.", "easy"],
    ["unleavened", "Exodus 12:15", "seven days shall ye eat unleavened bread", "The kind of bread they were told to eat.", "medium"],
    ["midnight", "Exodus 12:29", "it came to pass, that at midnight the LORD smote", "The time the LORD smote the firstborn.", "easy"],
  ]),
  createExodusChapter(13, "The firstborn are sanctified, unleavened bread is remembered, and Israel is led by cloud and fire.", [
    ["cloud", "Exodus 13:21", "the LORD went before them by day in a pillar of a cloud", "What led Israel by day.", "easy"],
    ["fire", "Exodus 13:21", "by night in a pillar of fire", "What led Israel by night.", "easy"],
    ["firstborn", "Exodus 13:2", "Sanctify unto me all the firstborn", "Who the LORD said belonged to Him.", "medium"],
    ["bones", "Exodus 13:19", "Moses took the bones of Joseph", "What Moses carried out of Egypt.", "easy"],
    ["sanctify", "Exodus 13:2", "Sanctify unto me", "What God said to do with the firstborn.", "medium"],
  ]),
  createExodusChapter(14, "Israel passes through the Red Sea while Pharaoh's host is overthrown.", [
    ["sea", "Exodus 14:21", "the waters were divided", "What Israel crossed on dry ground.", "easy"],
    ["pillar", "Exodus 14:19", "the pillar of the cloud went from before their face", "What moved between Israel and Egypt.", "medium"],
    ["waters", "Exodus 14:22", "the waters were a wall unto them", "What stood like a wall on both sides.", "easy"],
    ["host", "Exodus 14:24", "the host of the Egyptians", "The army the LORD troubled.", "medium"],
    ["salvation", "Exodus 14:13", "Stand still, and see the salvation of the LORD", "What Moses told the people to see.", "medium"],
  ]),
  createExodusChapter(15, "Moses sings to the LORD after the sea, and the bitter waters of Marah are made sweet.", [
    ["song", "Exodus 15:1", "Then sang Moses and the children of Israel this song", "What Moses and Israel sang.", "easy"],
    ["horse", "Exodus 15:1", "the horse and his rider hath he thrown into the sea", "The animal named in the victory song.", "easy"],
    ["marah", "Exodus 15:23", "the name of it was called Marah", "The place with bitter waters.", "medium"],
    ["tree", "Exodus 15:25", "the LORD shewed him a tree", "What Moses cast into the waters.", "easy"],
    ["bitter", "Exodus 15:23", "the waters of Marah, for they were bitter", "How the waters of Marah tasted.", "easy"],
  ]),
  createExodusChapter(16, "God sends manna and quails in the wilderness and teaches Israel about the Sabbath.", [
    ["manna", "Exodus 16:15", "they said one to another, It is manna", "The bread from heaven.", "easy"],
    ["quails", "Exodus 16:13", "the quails came up", "The birds that covered the camp in the evening.", "easy"],
    ["sabbath", "Exodus 16:23", "To morrow is the rest of the holy sabbath", "The holy rest day named in this chapter.", "medium"],
    ["omer", "Exodus 16:36", "an omer is the tenth part of an ephah", "The measure used for manna.", "medium"],
    ["dew", "Exodus 16:14", "when the dew that lay was gone up", "What lifted before the manna appeared.", "easy"],
  ]),
  createExodusChapter(17, "Water comes from the rock, and Israel prevails over Amalek while Moses holds up his hands.", [
    ["rock", "Exodus 17:6", "thou shalt smite the rock", "What Moses struck for water.", "easy"],
    ["water", "Exodus 17:6", "there shall come water out of it", "What came from the rock.", "easy"],
    ["amalek", "Exodus 17:8", "Then came Amalek", "The people who fought with Israel.", "medium"],
    ["hands", "Exodus 17:11", "when Moses held up his hand, that Israel prevailed", "What Moses held up during the battle.", "easy"],
    ["altar", "Exodus 17:15", "Moses built an altar", "What Moses built after the victory.", "easy"],
  ]),
  createExodusChapter(18, "Jethro visits Moses and advises him to appoint rulers to help judge the people.", [
    ["jethro", "Exodus 18:1", "Jethro, the priest of Midian", "Moses's father in law.", "easy"],
    ["judges", "Exodus 18:26", "they judged the people at all seasons", "What the appointed rulers did for the people.", "medium"],
    ["rulers", "Exodus 18:21", "rulers of thousands, and rulers of hundreds", "What Jethro said Moses should appoint.", "easy"],
    ["wear", "Exodus 18:18", "Thou wilt surely wear away", "What Jethro warned would happen to Moses.", "medium"],
    ["mount", "Exodus 18:5", "to the mount of God", "Where Jethro came to meet Moses.", "easy"],
  ]),
  createExodusChapter(19, "Israel camps at Sinai and prepares to meet the LORD at the mountain.", [
    ["sinai", "Exodus 19:11", "upon mount Sinai", "The mountain where God came down.", "easy"],
    ["mountain", "Exodus 19:12", "Take heed to yourselves, that ye go not up into the mount", "What the people were not to touch.", "easy"],
    ["trumpet", "Exodus 19:16", "the voice of the trumpet exceeding loud", "What sounded loudly from the mountain.", "medium"],
    ["thunder", "Exodus 19:16", "there were thunders and lightnings", "What was heard at the mountain.", "easy"],
    ["sanctify", "Exodus 19:10", "Go unto the people, and sanctify them", "What Moses was told to do to the people.", "medium"],
  ]),
  createExodusChapter(20, "The Ten Commandments are spoken as Israel trembles at the mountain.", [
    ["commandments", "Exodus 20:1", "God spake all these words", "What this chapter is most known for.", "medium"],
    ["sabbath", "Exodus 20:8", "Remember the sabbath day", "The day Israel was told to remember.", "easy"],
    ["honour", "Exodus 20:12", "Honour thy father and thy mother", "What children were commanded to do toward parents.", "easy"],
    ["thunderings", "Exodus 20:18", "all the people saw the thunderings", "The KJV word for the sounds the people saw and feared.", "medium"],
    ["altar", "Exodus 20:24", "An altar of earth thou shalt make unto me", "What the LORD said to make of earth.", "easy"],
  ]),
  createExodusChapter(21, "God gives judgments about servants, injuries, and justice in daily life.", [
    ["servant", "Exodus 21:2", "If thou buy an Hebrew servant", "The person named at the beginning of the judgments.", "easy"],
    ["master", "Exodus 21:4", "his master shall give him a wife", "Who could give the servant a wife.", "easy"],
    ["judgments", "Exodus 21:1", "these are the judgments", "What God set before Israel here.", "medium"],
    ["ox", "Exodus 21:28", "If an ox gore a man or a woman", "The animal used in several case laws.", "easy"],
    ["ear", "Exodus 21:6", "his master shall bore his ear through", "What was pierced by the door.", "medium"],
  ]),
  createExodusChapter(22, "Restitution, mercy, and holiness are emphasized in many social laws.", [
    ["theft", "Exodus 22:1", "If a man shall steal an ox", "The kind of wrong that opens this chapter.", "medium"],
    ["restore", "Exodus 22:1", "he shall restore five oxen", "What the thief had to do.", "easy"],
    ["stranger", "Exodus 22:21", "Thou shalt neither vex a stranger, nor oppress him", "The person Israel was told not to oppress.", "easy"],
    ["widow", "Exodus 22:22", "Ye shall not afflict any widow", "One of the vulnerable people named here.", "easy"],
    ["holy", "Exodus 22:31", "ye shall be holy men unto me", "What kind of men Israel was to be.", "easy"],
  ]),
  createExodusChapter(23, "Justice, Sabbath rest, and the promise of an angel before Israel are given.", [
    ["angel", "Exodus 23:20", "Behold, I send an Angel before thee", "Who God said He would send before Israel.", "easy"],
    ["sabbath", "Exodus 23:12", "the seventh day thou shalt rest", "The weekly rest day repeated here.", "easy"],
    ["feast", "Exodus 23:14", "Three times thou shalt keep a feast", "What Israel was to keep three times in the year.", "easy"],
    ["false", "Exodus 23:1", "Thou shalt not raise a false report", "The kind of report forbidden.", "easy"],
    ["enemy", "Exodus 23:4", "If thou meet thine enemy's ox", "Whose ox Israel was still to help with.", "medium"],
  ]),
  createExodusChapter(24, "The covenant is confirmed with blood, and Moses ascends the mountain into the cloud.", [
    ["blood", "Exodus 24:8", "Moses took the blood, and sprinkled it on the people", "What Moses sprinkled on the people.", "easy"],
    ["covenant", "Exodus 24:8", "the blood of the covenant", "What the blood confirmed.", "easy"],
    ["cloud", "Exodus 24:15", "the cloud covered the mount", "What covered the mountain.", "easy"],
    ["elders", "Exodus 24:9", "Moses, and Aaron ... and seventy of the elders", "The leaders who went up with Moses.", "medium"],
    ["mount", "Exodus 24:12", "Come up to me into the mount", "Where God called Moses.", "easy"],
  ]),
  createExodusChapter(25, "Offerings are gathered and the ark, table, and candlestick are described.", [
    ["ark", "Exodus 25:10", "they shall make an ark", "The holy chest described first.", "easy"],
    ["mercyseat", "Exodus 25:17", "thou shalt make a mercy seat", "What covered the ark.", "medium"],
    ["candlestick", "Exodus 25:31", "thou shalt make a candlestick of pure gold", "The lampstand of pure gold.", "medium"],
    ["gold", "Exodus 25:11", "thou shalt overlay it with pure gold", "What covered the ark within and without.", "easy"],
    ["cherubims", "Exodus 25:18", "two cherubims of gold", "The figures made on the mercy seat.", "medium"],
  ]),
  createExodusChapter(26, "The tabernacle curtains, boards, veils, and covering details are given.", [
    ["tabernacle", "Exodus 26:1", "thou shalt make the tabernacle", "The dwelling structure described in this chapter.", "easy"],
    ["curtains", "Exodus 26:1", "with ten curtains", "What the tabernacle was to have.", "easy"],
    ["boards", "Exodus 26:15", "thou shalt make boards for the tabernacle", "What stood upright for the walls.", "easy"],
    ["veil", "Exodus 26:31", "thou shalt make a vail", "What divided the holy place from the most holy.", "medium"],
    ["coupling", "Exodus 26:6", "it shall be one tabernacle", "The joining idea repeated with taches and curtains.", "medium"],
  ]),
  createExodusChapter(27, "The altar, court, and oil for the lamp are appointed.", [
    ["altar", "Exodus 27:1", "thou shalt make an altar", "The brazen altar in the court.", "easy"],
    ["court", "Exodus 27:9", "thou shalt make the court of the tabernacle", "The outer area around the tabernacle.", "easy"],
    ["oil", "Exodus 27:20", "they bring thee pure oil olive beaten", "What was brought for the light.", "easy"],
    ["brass", "Exodus 27:2", "his horns shall be of the same", "The metal used heavily in this chapter.", "easy"],
    ["horns", "Exodus 27:2", "thou shalt make the horns of it", "What stood on the corners of the altar.", "medium"],
  ]),
  createExodusChapter(28, "Aaron's holy garments are described, including the breastplate and ephod.", [
    ["ephod", "Exodus 28:6", "they shall make the ephod", "The priestly garment made of gold and colors.", "medium"],
    ["breastplate", "Exodus 28:15", "thou shalt make the breastplate of judgment", "The piece worn on Aaron's chest.", "medium"],
    ["stones", "Exodus 28:17", "thou shalt set in it settings of stones", "What were set in the breastplate.", "easy"],
    ["mitre", "Exodus 28:39", "thou shalt make the mitre", "The headpiece for Aaron.", "medium"],
    ["garments", "Exodus 28:2", "holy garments for Aaron thy brother", "What was made for glory and beauty.", "easy"],
  ]),
  createExodusChapter(29, "Aaron and his sons are consecrated for priestly service with offerings and blood.", [
    ["consecrate", "Exodus 29:1", "to consecrate them, that they may minister", "What this chapter does for Aaron and his sons.", "medium"],
    ["ram", "Exodus 29:15", "thou shalt also take one ram", "One of the animals used in the consecration.", "easy"],
    ["blood", "Exodus 29:20", "take of the blood of the ram", "What was put on ear, thumb, and toe.", "easy"],
    ["priest", "Exodus 29:9", "the priest's office shall be theirs", "The office given to Aaron and his sons.", "easy"],
    ["anoint", "Exodus 29:7", "thou shalt take the anointing oil", "What Moses was to do with the oil.", "medium"],
  ]),
  createExodusChapter(30, "The incense altar, ransom money, laver, oil, and perfume are all appointed.", [
    ["incense", "Exodus 30:1", "thou shalt make an altar to burn incense upon", "What burned on the golden altar.", "easy"],
    ["laver", "Exodus 30:18", "thou shalt also make a laver of brass", "What held water for washing.", "medium"],
    ["anointing", "Exodus 30:25", "an holy anointing oil", "The special oil named in this chapter.", "medium"],
    ["ransom", "Exodus 30:12", "give every man a ransom for his soul", "What each man gave when numbered.", "medium"],
    ["spices", "Exodus 30:34", "take unto thee sweet spices", "What was used to make the incense.", "easy"],
  ]),
  createExodusChapter(31, "Bezalel and Aholiab are called, and the Sabbath and tables of stone are given.", [
    ["bezaleel", "Exodus 31:2", "I have called by name Bezaleel", "The craftsman filled with God's spirit.", "medium"],
    ["aholiab", "Exodus 31:6", "I have given with him Aholiab", "The helper named with Bezaleel.", "medium"],
    ["sabbath", "Exodus 31:15", "the sabbath of rest, holy to the LORD", "The covenant sign repeated here.", "easy"],
    ["tables", "Exodus 31:18", "two tables of testimony", "What God gave Moses when He finished speaking.", "easy"],
    ["stone", "Exodus 31:18", "tables of stone", "The material of the testimony tables.", "easy"],
  ]),
  createExodusChapter(32, "Israel makes the golden calf, Moses intercedes, and the tables are broken.", [
    ["calf", "Exodus 32:4", "he had made it a molten calf", "What Aaron fashioned from the gold.", "easy"],
    ["golden", "Exodus 32:8", "they have made them a molten calf", "The color tied to the idol they made.", "easy"],
    ["tables", "Exodus 32:19", "he cast the tables out of his hands", "What Moses broke beneath the mount.", "easy"],
    ["powder", "Exodus 32:20", "ground it to powder", "What Moses did to the calf.", "medium"],
    ["neck", "Exodus 32:9", "it is a stiffnecked people", "The word God used for the people.", "medium"],
  ]),
  createExodusChapter(33, "The tabernacle of meeting is set outside the camp, and Moses asks to see God's glory.", [
    ["glory", "Exodus 33:18", "I beseech thee, shew me thy glory", "What Moses asked to see.", "easy"],
    ["presence", "Exodus 33:14", "My presence shall go with thee", "What God promised would go with Moses.", "medium"],
    ["tent", "Exodus 33:7", "Moses took the tabernacle, and pitched it without the camp", "The simpler word for the meeting place outside the camp.", "easy"],
    ["cloudy", "Exodus 33:9", "the cloudy pillar descended", "How the pillar is described.", "medium"],
    ["goodness", "Exodus 33:19", "I will make all my goodness pass before thee", "What God said He would make pass before Moses.", "medium"],
  ]),
  createExodusChapter(34, "New tables are made, God's name is proclaimed, and Moses descends with a shining face.", [
    ["tables", "Exodus 34:1", "hew thee two tables of stone", "What Moses had to hew again.", "easy"],
    ["stone", "Exodus 34:1", "two tables of stone", "What the renewed tables were made of.", "easy"],
    ["merciful", "Exodus 34:6", "The LORD God, merciful and gracious", "One of the first attributes proclaimed by God.", "medium"],
    ["shine", "Exodus 34:29", "the skin of his face shone", "What Moses's face did after speaking with God.", "easy"],
    ["vail", "Exodus 34:33", "he put a vail on his face", "What Moses put on his face.", "medium"],
  ]),
  createExodusChapter(35, "The people are stirred to bring offerings and wise hearted work begins.", [
    ["sabbath", "Exodus 35:2", "the seventh day shall be an holy day", "The holy day repeated before the work starts.", "easy"],
    ["offering", "Exodus 35:5", "Take ye from among you an offering unto the LORD", "What the people were invited to bring.", "easy"],
    ["wisdom", "Exodus 35:10", "every wise hearted among you", "What kind of heart the workers needed.", "medium"],
    ["spin", "Exodus 35:25", "all the women that were wise hearted did spin", "What the skilled women did with their hands.", "medium"],
    ["willing", "Exodus 35:22", "as many as were willing hearted", "How the people were described when they brought gifts.", "easy"],
  ]),
  createExodusChapter(36, "The people bring so much that Moses has to restrain them from giving more.", [
    ["enough", "Exodus 36:7", "they had enough for all the work", "What the people had brought for the work.", "easy"],
    ["restrained", "Exodus 36:6", "the people were restrained from bringing", "What had to happen because the gifts kept coming.", "medium"],
    ["curtains", "Exodus 36:8", "made ten curtains", "What the wise hearted men made for the tabernacle.", "easy"],
    ["goats", "Exodus 36:14", "he made curtains of goats' hair", "The animals whose hair was used for the tent covering.", "easy"],
    ["boards", "Exodus 36:20", "he made boards for the tabernacle", "What formed the standing structure.", "easy"],
  ]),
  createExodusChapter(37, "Bezalel makes the ark, table, candlestick, incense altar, oil, and perfume.", [
    ["ark", "Exodus 37:1", "Bezaleel made the ark", "The holy chest Bezaleel made.", "easy"],
    ["table", "Exodus 37:10", "he made the table", "What was made for the shewbread.", "easy"],
    ["candlestick", "Exodus 37:17", "he made the candlestick of pure gold", "The lampstand made of pure gold.", "medium"],
    ["incense", "Exodus 37:25", "he made the incense altar", "What the small altar was for.", "easy"],
    ["perfume", "Exodus 37:29", "the pure incense of sweet spices", "The fragrant mixture made by the apothecary.", "medium"],
  ]),
  createExodusChapter(38, "The altar, laver, court, and offering totals are recorded.", [
    ["altar", "Exodus 38:1", "he made the altar of burnt offering", "What stood in the court for sacrifice.", "easy"],
    ["laver", "Exodus 38:8", "he made the laver of brass", "What was made from the women's lookingglasses.", "medium"],
    ["court", "Exodus 38:9", "he made the court", "The fenced area around the tabernacle.", "easy"],
    ["silver", "Exodus 38:25", "the silver of them that were numbered", "The metal counted from the congregation.", "easy"],
    ["brass", "Exodus 38:29", "the brass of the offering", "The metal of the offering totaled here.", "easy"],
  ]),
  createExodusChapter(39, "The priestly garments are finished and all the work of the tabernacle is completed.", [
    ["garments", "Exodus 39:1", "they made cloths of service", "What was made for Aaron to minister in.", "easy"],
    ["ephod", "Exodus 39:2", "he made the ephod", "The priestly garment described again here.", "medium"],
    ["breastplate", "Exodus 39:8", "he made the breastplate", "What held the rows of stones.", "medium"],
    ["mitre", "Exodus 39:28", "a mitre of fine linen", "The linen headpiece named here.", "medium"],
    ["finished", "Exodus 39:32", "Thus was all the work ... finished", "What happened to all the work of the tabernacle.", "easy"],
  ]),
  createExodusChapter(40, "The tabernacle is set up, anointed, and filled with the glory of the LORD.", [
    ["tabernacle", "Exodus 40:2", "On the first day ... shalt thou set up the tabernacle", "What Moses was told to set up.", "easy"],
    ["cloud", "Exodus 40:34", "then a cloud covered the tent", "What covered the tent of the congregation.", "easy"],
    ["glory", "Exodus 40:34", "the glory of the LORD filled the tabernacle", "What filled the tabernacle.", "easy"],
    ["anoint", "Exodus 40:9", "thou shalt take the anointing oil", "What Moses had to do to the tabernacle and vessels.", "medium"],
    ["journeys", "Exodus 40:36", "the cloud was taken up ... throughout all their journeys", "What the people did whenever the cloud was taken up.", "medium"],
  ]),
];

export const SCRAMBLED_BOOKS: ScrambledBookPack[] = [
  {
    slug: "genesis",
    name: "Genesis",
    shortLabel: "The beginning of everything - creation, humanity, the patriarchs, and God's covenant promises.",
    shortDescription: "Play through all 50 Genesis chapters with lighter Scripture word packs and on-demand hints.",
    louisIntro:
      "Genesis means beginning, and now you can work through the whole book chapter by chapter. These Scrambled packs are meant to help the big people, places, and covenant words from Genesis stay in your memory without making the questions feel too hard.",
    accentClassName: "border-[#e8b9c1] bg-[#f6dce1]",
    chapters: GENESIS_CHAPTERS,
  },
  {
    slug: "exodus",
    name: "Exodus",
    shortLabel: "Deliverance, wilderness, covenant, and the tabernacle as God leads Israel out of Egypt.",
    shortDescription: "Play through all 40 Exodus chapters with Scripture words tied to Moses, Pharaoh, Passover, Sinai, and the tabernacle.",
    louisIntro:
      "Exodus is the great rescue story, and these Scrambled packs keep the plagues, Passover, wilderness moments, covenant words, and tabernacle pieces close to your memory one chapter at a time.",
    accentClassName: "border-[#ecd6a9] bg-[#f8ead0]",
    chapters: EXODUS_CHAPTERS,
  },
];

export function getScrambledBook(bookSlug: string) {
  return SCRAMBLED_BOOKS.find((book) => book.slug === bookSlug) ?? null;
}

export function getScrambledChapter(bookSlug: string, chapterNumber: number) {
  return getScrambledBook(bookSlug)?.chapters.find((chapter) => chapter.chapter === chapterNumber) ?? null;
}

export function getScrambledProgressKey(bookSlug: string, chapterNumber: number) {
  return `${bookSlug}:${chapterNumber}`;
}
