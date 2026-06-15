import { writeFileSync } from "fs";

type BookName = "Job" | "Psalms" | "Proverbs" | "Ecclesiastes" | "Song of Solomon" | "Isaiah" | "Jeremiah";

type ApiVerse = {
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type Section = {
  book: BookName;
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const isaiahChapters = Array.from({ length: 51 }, (_, index) => index + 16);
const jeremiahChapters = Array.from({ length: 9 }, (_, index) => index + 1);

const sectionIcons = ["⚖️", "🕯️", "🌩️", "👑", "🧭", "🔥", "📜", "💧", "🛡️", "🌱", "🎶", "🙏", "🌙", "☀️"];
const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "for", "from", "hath", "he", "his", "in", "into", "is", "of", "on", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "with"]);

function note(lines: string[]) {
  return lines.filter(Boolean).join("\n\n");
}

function normalize(text: string) {
  return text.replace(/[“”]/g, "\"").replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function titleCase(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, "");
      const lower = clean.toLowerCase();
      if (!clean) return "";
      if (clean.toUpperCase() === "LORD") return "LORD";
      if (index > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

function trimPhrase(raw: string) {
  let phrase = normalize(raw)
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/[:;,.!?]+$/g, "")
    .replace(badStart, "")
    .trim();

  const specials = [
    "I made a covenant with mine eyes",
    "I put on righteousness",
    "The Spirit of God hath made me",
    "The breath of the Almighty hath given me life",
    "God speaketh once",
    "Out of the whirlwind",
    "Where wast thou when I laid the foundations of the earth",
    "Hast thou commanded the morning",
    "He beholdeth all high things",
    "I know that thou canst do every thing",
    "I have heard of thee by the hearing of the ear",
    "Now mine eye seeth thee",
    "The LORD turned the captivity of Job",
    "The LORD blessed the latter end of Job more than his beginning",
    "Blessed is the man",
    "Nor sitteth in the seat of the scornful",
    "His delight is in the law of the LORD",
    "He shall be like a tree planted by the rivers of water",
    "The LORD knoweth the way of the righteous",
    "Why do the heathen rage",
    "Yet have I set my king upon my holy hill of Zion",
    "Thou art my Son",
    "Kiss the Son",
    "LORD how are they increased that trouble me",
    "Thou O LORD art a shield for me",
    "I laid me down and slept",
    "Hear me when I call",
    "Commune with your own heart upon your bed",
    "I will both lay me down in peace",
    "Give ear to my words O LORD",
    "Lead me O LORD in thy righteousness",
    "Let all those that put their trust in thee rejoice",
    "O LORD rebuke me not in thine anger",
    "Heal me for my bones are vexed",
    "The LORD hath heard the voice of my weeping",
    "O LORD my God in thee do I put my trust",
    "Save me from all them that persecute me",
    "The LORD shall judge the people",
    "What is man that thou art mindful of him",
    "Out of the mouth of babes and sucklings",
    "The heavens declare the glory of God",
    "The law of the LORD is perfect",
    "Let the words of my mouth",
    "The LORD also will be a refuge for the oppressed",
    "I will praise thee O LORD with my whole heart",
    "The wicked shall be turned into hell",
    "The LORD is King for ever and ever",
    "Help LORD for the godly man ceaseth",
    "The words of the LORD are pure words",
    "How long wilt thou forget me O LORD",
    "I will sing unto the LORD",
    "The fool hath said in his heart There is no God",
    "Who shall abide in thy tabernacle",
    "He that walketh uprightly",
    "Preserve me O God",
    "The LORD is the portion of mine inheritance",
    "Thou wilt not leave my soul in hell",
    "Keep me as the apple of the eye",
    "I will love thee O LORD my strength",
    "The LORD is my rock and my fortress",
    "The heavens declare his righteousness",
    "The statutes of the LORD are right",
    "Some trust in chariots",
    "The king shall joy in thy strength",
    "My God my God why hast thou forsaken me",
    "They pierced my hands and my feet",
    "They part my garments among them",
    "The LORD is my shepherd",
    "He maketh me to lie down in green pastures",
    "Yea though I walk through the valley of the shadow of death",
    "Thou preparest a table before me",
    "The earth is the LORD's",
    "Who shall ascend into the hill of the LORD",
    "Lift up your heads O ye gates",
    "Shew me thy ways O LORD",
    "Remember not the sins of my youth",
    "Mine eyes are ever toward the LORD",
    "The LORD is my light and my salvation",
    "One thing have I desired of the LORD",
    "Wait on the LORD",
    "The LORD is my strength and my shield",
    "Weeping may endure for a night",
    "Joy cometh in the morning",
    "Into thine hand I commit my spirit",
    "Be of good courage",
    "Blessed is he whose transgression is forgiven",
    "I acknowledged my sin unto thee",
    "The LORD looketh from heaven",
    "O taste and see that the LORD is good",
    "The angel of the LORD encampeth round about them",
    "The righteous cry and the LORD heareth",
    "With thee is the fountain of life",
    "Fret not thyself because of evildoers",
    "Trust in the LORD and do good",
    "Delight thyself also in the LORD",
    "Commit thy way unto the LORD",
    "Rest in the LORD and wait patiently for him",
    "The steps of a good man are ordered by the LORD",
    "I have been young and now am old",
    "The law of his God is in his heart",
    "LORD make me to know mine end",
    "I was dumb I opened not my mouth",
    "I waited patiently for the LORD",
    "He brought me up also out of an horrible pit",
    "Sacrifice and offering thou didst not desire",
    "Lo I come",
    "As the hart panteth after the water brooks",
    "Why art thou cast down O my soul",
    "Send out thy light and thy truth",
    "My heart is inditing a good matter",
    "God is our refuge and strength",
    "Be still and know that I am God",
    "The LORD of hosts is with us",
    "God is gone up with a shout",
    "Great is the LORD and greatly to be praised",
    "We have thought of thy lovingkindness O God",
    "None of them can by any means redeem his brother",
    "Man that is in honour and understandeth not",
    "Call upon me in the day of trouble",
    "The sacrifices of God are a broken spirit",
    "Have mercy upon me O God",
    "Wash me throughly from mine iniquity",
    "Against thee thee only have I sinned",
    "Create in me a clean heart O God",
    "Restore unto me the joy of thy salvation",
    "Why boastest thou thyself in mischief",
    "The goodness of God endureth continually",
    "I am like a green olive tree",
    "Save me O God by thy name",
    "God is mine helper",
    "Give ear to my prayer O God",
    "Cast thy burden upon the LORD",
    "What time I am afraid I will trust in thee",
    "Thou tellest my wanderings",
    "Put thou my tears into thy bottle",
    "Be merciful unto me O God",
    "My heart is fixed O God",
    "Do ye indeed speak righteousness O congregation",
    "The righteous shall rejoice when he seeth the vengeance",
    "Deliver me from mine enemies O my God",
    "I will sing of thy power",
    "Give us help from trouble",
    "Lead me to the rock that is higher than I",
    "When my heart is overwhelmed",
    "My soul waiteth upon God",
    "He only is my rock and my salvation",
    "Trust in him at all times",
    "My soul thirsteth for thee",
    "Thy lovingkindness is better than life",
    "Hear my voice O God in my prayer",
    "They encourage themselves in an evil matter",
    "Praise waiteth for thee O God in Sion",
    "Thou visitest the earth and waterest it",
    "Make a joyful noise unto God",
    "Come and hear all ye that fear God",
    "God be merciful unto us and bless us",
    "Let the people praise thee O God",
    "Let the nations be glad",
    "Let God arise",
    "A father of the fatherless",
    "Thou hast ascended on high",
    "Save me O God for the waters are come in unto my soul",
    "Zeal of thine house hath eaten me up",
    "They gave me also gall for my meat",
    "Make haste O God to deliver me",
    "Cast me not off in the time of old age",
    "Give the king thy judgments O God",
    "He shall have dominion also from sea to sea",
    "Truly God is good to Israel",
    "My feet were almost gone",
    "Until I went into the sanctuary of God",
    "Whom have I in heaven but thee",
    "God is the strength of my heart",
    "We see not our signs",
    "Thou didst divide the sea by thy strength",
    "I will remember the works of the LORD",
    "Thy way O God is in the sanctuary",
    "Give ear O my people to my law",
    "They forgat his works",
    "Turn us again O God",
    "Give ear O Shepherd of Israel",
    "Sing aloud unto God our strength",
    "Open thy mouth wide and I will fill it",
    "How long will ye judge unjustly",
    "Defend the poor and fatherless",
    "How amiable are thy tabernacles",
    "My soul longeth",
    "A day in thy courts is better than a thousand",
    "Wilt thou not revive us again",
    "Mercy and truth are met together",
    "Righteousness and peace have kissed each other",
    "Glorious things are spoken of thee",
    "All my springs are in thee",
    "My soul is full of troubles",
    "Lover and friend hast thou put far from me",
    "I have made a covenant with my chosen",
    "Lord thou hast been our dwelling place",
    "Teach us to number our days",
    "He that dwelleth in the secret place of the most High",
    "He shall give his angels charge over thee",
    "The LORD reigneth",
    "O come let us sing unto the LORD",
    "Today if ye will hear his voice",
    "Declare his glory among the heathen",
    "The LORD reigneth let the earth rejoice",
    "Ye that love the LORD hate evil",
    "Exalt ye the LORD our God",
    "Make a joyful noise unto the LORD",
    "Enter into his gates with thanksgiving",
    "His mercy is everlasting",
    "I will behave myself wisely",
    "Bless the LORD O my soul",
    "Who forgiveth all thine iniquities",
    "As far as the east is from the west",
    "The LORD is merciful and gracious",
    "Who laid the foundations of the earth",
    "He appointed the moon for seasons",
    "O give thanks unto the LORD call upon his name",
    "Remember his marvellous works",
    "He remembered his holy promise",
    "We have sinned with our fathers",
    "Nevertheless he regarded their affliction",
    "Let the redeemed of the LORD say so",
    "He maketh the storm a calm",
    "My heart is fixed O God",
    "Let his days be few",
    "Sit thou at my right hand",
    "The fear of the LORD is the beginning of wisdom",
    "Blessed is the man that feareth the LORD",
    "He raiseth up the poor out of the dust",
    "When Israel went out of Egypt",
    "Not unto us O LORD not unto us",
    "The dead praise not the LORD",
    "Precious in the sight of the LORD is the death of his saints",
    "O praise the LORD all ye nations",
    "His merciful kindness is great toward us",
    "His mercy endureth for ever",
    "The stone which the builders refused",
    "This is the day which the LORD hath made",
    "I am for peace",
    "I will lift up mine eyes unto the hills",
    "My help cometh from the LORD",
    "The LORD shall preserve thee",
    "Pray for the peace of Jerusalem",
    "Unto thee lift I up mine eyes",
    "If it had not been the LORD",
    "Our help is in the name of the LORD",
    "They that trust in the LORD shall be as mount Zion",
    "When the LORD turned again the captivity of Zion",
    "They that sow in tears shall reap in joy",
    "Except the LORD build the house",
    "Children are an heritage of the LORD",
    "Blessed is every one that feareth the LORD",
    "Many a time have they afflicted me",
    "Out of the depths have I cried unto thee",
    "There is forgiveness with thee",
    "I wait for the LORD",
    "Remember David and all his afflictions",
    "How good and how pleasant it is",
    "Behold bless ye the LORD",
    "Praise ye the LORD",
    "For the LORD hath chosen Jacob unto himself",
    "His mercy endureth for ever",
    "By the rivers of Babylon",
    "I will praise thee with my whole heart",
    "Thou hast searched me and known me",
    "I am fearfully and wonderfully made",
    "Search me O God",
    "Deliver me O LORD from the evil man",
    "Set a watch O LORD before my mouth",
    "I cried unto the LORD with my voice",
    "Bring my soul out of prison",
    "Teach me to do thy will",
    "Blessed be the LORD my strength",
    "Great is the LORD and greatly to be praised",
    "The LORD upholdeth all that fall",
    "The LORD is nigh unto all them that call upon him",
    "Put not your trust in princes",
    "He healeth the broken in heart",
    "Praise ye the LORD from the heavens",
    "Let every thing that hath breath praise the LORD",
    "The fear of the LORD is the beginning of knowledge",
    "My son hear the instruction of thy father",
    "Wisdom crieth without",
    "If thou wilt receive my words",
    "Then shalt thou understand the fear of the LORD",
    "Trust in the LORD with all thine heart",
    "In all thy ways acknowledge him",
    "My son despise not the chastening of the LORD",
    "Keep thy heart with all diligence",
    "Ponder the path of thy feet",
    "My son attend unto my wisdom",
    "Go to the ant thou sluggard",
    "Six things doth the LORD hate",
    "Keep my commandments and live",
    "Say unto wisdom Thou art my sister",
    "Doth not wisdom cry",
    "The fear of the LORD is to hate evil",
    "Wisdom hath builded her house",
    "Forsake the foolish and live",
    "A wise son maketh a glad father",
    "The memory of the just is blessed",
    "A false balance is abomination to the LORD",
    "He that winneth souls is wise",
    "A soft answer turneth away wrath",
    "Pride goeth before destruction",
    "Better is a little with righteousness",
    "A friend loveth at all times",
    "Death and life are in the power of the tongue",
    "House and riches are the inheritance of fathers",
    "Wine is a mocker strong drink is raging",
    "To do justice and judgment",
    "Train up a child in the way he should go",
    "Buy the truth and sell it not",
    "A righteous man falling down before the wicked",
    "A word fitly spoken",
    "Faithful are the wounds of a friend",
    "The wicked flee when no man pursueth",
    "He that covereth his sins shall not prosper",
    "Every word of God is pure",
    "Who can find a virtuous woman",
    "Strength and honour are her clothing",
    "Vanity of vanities saith the Preacher",
    "There is no new thing under the sun",
    "To every thing there is a season",
    "He hath made every thing beautiful in his time",
    "Better is an handful with quietness",
    "Keep thy foot when thou goest to the house of God",
    "Better is the sight of the eyes than the wandering of the desire",
    "A good name is better than precious ointment",
    "The end of a thing is better than the beginning",
    "Wisdom strengtheneth the wise",
    "There is not a just man upon earth",
    "The king's commandment",
    "The race is not to the swift",
    "Cast thy bread upon the waters",
    "Remember now thy Creator",
    "Fear God and keep his commandments",
    "Let him kiss me with the kisses of his mouth",
    "I am black but comely",
    "My beloved is mine and I am his",
    "The voice of my beloved",
    "I charge you O ye daughters of Jerusalem",
    "Who is this that cometh out of the wilderness",
    "Thou art all fair my love",
    "I sleep but my heart waketh",
    "My beloved is white and ruddy",
    "I am my beloved's and my beloved is mine",
    "Set me as a seal upon thine heart",
    "Love is strong as death",
    "Hear O heavens and give ear O earth",
    "Ah sinful nation",
    "Though your sins be as scarlet",
    "They shall beat their swords into plowshares",
    "Woe unto them that join house to house",
    "Holy holy holy is the LORD of hosts",
    "Here am I send me",
    "Behold a virgin shall conceive",
    "Unto us a child is born",
    "The people that walked in darkness",
    "A remnant shall return",
    "There shall come forth a rod out of the stem of Jesse",
    "With joy shall ye draw water out of the wells of salvation",
    "The burden of Babylon",
    "How art thou fallen from heaven",
    "The burden of Moab",
    "In mercy shall the throne be established",
    "The burden of Damascus",
    "Woe to the land shadowing with wings",
    "The burden of Egypt",
    "The burden of the desert of the sea",
    "The burden of the valley of vision",
    "The key of the house of David",
    "The LORD maketh the earth empty",
    "In this mountain shall the LORD of hosts make unto all people a feast",
    "He will swallow up death in victory",
    "Thou wilt keep him in perfect peace",
    "In returning and rest shall ye be saved",
    "Woe to them that go down to Egypt for help",
    "Behold a king shall reign in righteousness",
    "The LORD is our judge",
    "The wilderness and the solitary place shall be glad",
    "Be strong fear not",
    "Who hath measured the waters in the hollow of his hand",
    "They that wait upon the LORD shall renew their strength",
    "Fear thou not for I am with thee",
    "Behold my servant whom I uphold",
    "When thou passest through the waters",
    "I have redeemed thee",
    "I am the LORD and there is none else",
    "I have called thee by thy name",
    "Bel boweth down Nebo stoopeth",
    "Hearken unto me O house of Jacob",
    "The LORD hath called me from the womb",
    "A light to the Gentiles",
    "I gave my back to the smiters",
    "Awake awake put on strength O Zion",
    "How beautiful upon the mountains",
    "He was wounded for our transgressions",
    "With his stripes we are healed",
    "Ho every one that thirsteth",
    "Seek ye the LORD while he may be found",
    "There is no peace saith my God to the wicked",
    "Cry aloud spare not",
    "Arise shine for thy light is come",
    "The Spirit of the Lord GOD is upon me",
    "The year of the LORD's redeemed",
    "We are all as an unclean thing",
    "I create new heavens and a new earth",
    "Before I formed thee in the belly I knew thee",
    "I have put my words in thy mouth",
    "See I have this day set thee over the nations",
    "My people have committed two evils",
    "They have forsaken me the fountain of living waters",
    "The word of the LORD came to me",
    "Return thou backsliding Israel",
    "Break up your fallow ground",
    "Stand ye in the ways and see",
    "Amend your ways and your doings",
    "Trust ye not in lying words",
    "Is this house which is called by my name",
    "Oh that my head were waters",
  ];

  const lower = phrase.toLowerCase();
  const special = specials.find((item) => lower.startsWith(item.toLowerCase()));
  if (special) return titleCase(special);
  if (lower.includes("the lord blessed the latter end of job more than his beginning")) {
    return "The LORD Blessed the Latter End of Job More Than His Beginning";
  }

  let words = phrase.split(/\s+/).filter(Boolean).slice(0, 11);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  phrase = words.join(" ");
  return titleCase(phrase);
}

function wordCount(phrase: string) {
  return phrase.split(/\s+/).filter(Boolean).length;
}

function isWeakPhrase(phrase: string) {
  const lower = phrase.toLowerCase();
  if (wordCount(phrase) < 4) return true;
  if (wordCount(phrase) > 13) return true;
  if (/^(then|and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because)\b/.test(lower)) return true;
  if (/^(job answered|elihu answered|the lord answered|and he said|and said|then answered)\b/.test(lower)) return true;
  if (/\b(and|or|of|to|unto|with|from|in|on|by|that|which|when|because|the|his|their)$/i.test(phrase)) return true;
  return false;
}

function candidateSetsFromVerse(verse: ApiVerse) {
  const clauses = normalize(verse.text)
    .split(/[,;:.!?]/)
    .map(trimPhrase)
    .filter((phrase) => !isWeakPhrase(phrase));

  const words = normalize(verse.text).replace(/[;:,.!?()"']/g, "").split(/\s+/).filter(Boolean);
  const windows: string[] = [];
  for (let index = 0; index < words.length; index += 3) {
    const phrase = trimPhrase(words.slice(index, index + 8).join(" "));
    if (!isWeakPhrase(phrase)) windows.push(phrase);
  }

  return { clauses, windows };
}

function category(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (book === "Psalms") {
    if (/\b(lord|god|son|king|zion|holy|mercy|salvation|righteousness)\b/.test(lower)) return "psalmGod";
    if (/\b(blessed|delight|law|righteous|way|tree|fruit|prosper)\b/.test(lower)) return "psalmWisdom";
    if (/\b(enemies|heathen|rage|wicked|ungodly|scornful|anger|trouble|workers)\b/.test(lower)) return "psalmConflict";
    if (/\b(hear|call|cry|prayer|voice|trust|rejoice|peace|sleep|weeping|heal)\b/.test(lower)) return "psalmPrayer";
    return "psalmDetail";
  }

  if (book === "Proverbs") {
    if (/\b(wisdom|knowledge|understanding|instruction|discretion|counsel|reproof)\b/.test(lower)) return "proverbWisdom";
    if (/\b(my son|father|mother|hear|attend|keep|receive|forget not|bind)\b/.test(lower)) return "proverbInstruction";
    if (/\b(lord|fear of the lord|trust|acknowledge|chastening|honour the lord)\b/.test(lower)) return "proverbLord";
    if (/\b(wicked|sinners|evil|strange woman|sluggard|froward|hate|abomination)\b/.test(lower)) return "proverbWarning";
    if (/\b(heart|path|ways|feet|mouth|lips|eyes|tongue)\b/.test(lower)) return "proverbLife";
    return "proverbDetail";
  }

  if (book === "Ecclesiastes") {
    if (/\b(vanity|vexation|under the sun|profit|labour|travail)\b/.test(lower)) return "ecclesiastesVapor";
    if (/\b(wisdom|wise|folly|knowledge|madness)\b/.test(lower)) return "ecclesiastesWisdom";
    if (/\b(season|time|beautiful|eternity|world in their heart)\b/.test(lower)) return "ecclesiastesTime";
    if (/\b(god|house of god|vow|fear god|gift of god)\b/.test(lower)) return "ecclesiastesGod";
    if (/\b(poor|oppression|riches|silver|wealth|quietness|companion)\b/.test(lower)) return "ecclesiastesLife";
    return "ecclesiastesDetail";
  }

  if (book === "Song of Solomon") {
    if (/\b(beloved|love|fair|spouse|my dove|my sister|my friend)\b/.test(lower)) return "songLove";
    if (/\b(kiss|mouth|eyes|cheeks|hair|teeth|lips|neck|breasts|body)\b/.test(lower)) return "songDesire";
    if (/\b(daughters of jerusalem|charge you|stir not up|watchmen|city|streets)\b/.test(lower)) return "songWarning";
    if (/\b(garden|vineyard|apple tree|lilies|rose|cedar|mountains|wilderness)\b/.test(lower)) return "songImagery";
    return "songDetail";
  }

  if (book === "Isaiah") {
    if (/\b(woe|sinful|iniquity|rebellion|judgment|desolate|burden|babylon|moab)\b/.test(lower)) return "isaiahJudgment";
    if (/\b(remnant|return|salvation|comfort|forgiven|cleansed|scarlet|white as snow)\b/.test(lower)) return "isaiahHope";
    if (/\b(holy|lord of hosts|throne|seraphims|glory|send me|coal|altar)\b/.test(lower)) return "isaiahHoly";
    if (/\b(immanuel|child is born|son is given|rod|stem of jesse|branch|virgin)\b/.test(lower)) return "isaiahMessiah";
    if (/\b(nations|people|zion|jerusalem|swords|plowshares|mountain)\b/.test(lower)) return "isaiahNations";
    return "isaiahDetail";
  }

  if (book === "Jeremiah") {
    if (/\b(called|formed|belly|mouth|words|prophet|nations|sent)\b/.test(lower)) return "jeremiahCall";
    if (/\b(forsaken|backsliding|evil|sin|lying|idols|abominations|harlot)\b/.test(lower)) return "jeremiahSin";
    if (/\b(return|amend|ways|fallow|circumcise|seek|stand ye)\b/.test(lower)) return "jeremiahReturn";
    if (/\b(judgment|north|sword|destruction|burn|anger|wrath|punish)\b/.test(lower)) return "jeremiahJudgment";
    if (/\b(temple|house|name|sacrifices|offerings|shiloh)\b/.test(lower)) return "jeremiahTemple";
    if (/\b(tears|waters|weeping|hurt|grief|mourn|lamentation)\b/.test(lower)) return "jeremiahLament";
    return "jeremiahDetail";
  }

  if (/\b(covenant|righteousness|integrity|heart|eyes|steps|walked|poor|widow|fatherless|stranger|cause)\b/.test(lower)) return "integrity";
  if (/\b(elihu|wrath|answered|words|knowledge|mouth|doctrine|speak|speech)\b/.test(lower)) return "speech";
  if (/\b(god|lord|almighty|spirit|breath|maker|heaven|thunder|voice|majesty)\b/.test(lower)) return "god";
  if (/\b(whirlwind|earth|morning|sea|cloud|snow|hail|stars|light|darkness|rain|behemoth|leviathan|eagle|horse)\b/.test(lower)) return "creation";
  if (/\b(sin|wicked|judgment|justice|iniquity|hypocrite|righteous|condemn|justify)\b/.test(lower)) return "justice";
  if (/\b(soul|grief|weeping|affliction|trouble|death|grave|destruction|bones)\b/.test(lower)) return "lament";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  if (book === "Ecclesiastes") {
    return {
      ecclesiastesVapor: "🌫️",
      ecclesiastesWisdom: "🧭",
      ecclesiastesTime: "⏳",
      ecclesiastesGod: "🙏",
      ecclesiastesLife: "⚖️",
      ecclesiastesDetail: "🔎",
    }[kind as keyof {
      ecclesiastesVapor: string;
      ecclesiastesWisdom: string;
      ecclesiastesTime: string;
      ecclesiastesGod: string;
      ecclesiastesLife: string;
      ecclesiastesDetail: string;
    }];
  }

  if (book === "Song of Solomon") {
    return {
      songLove: "❤️",
      songDesire: "🌹",
      songWarning: "🕯️",
      songImagery: "🌿",
      songDetail: "🔎",
    }[kind as keyof {
      songLove: string;
      songDesire: string;
      songWarning: string;
      songImagery: string;
      songDetail: string;
    }];
  }

  if (book === "Isaiah") {
    return {
      isaiahJudgment: "⚖️",
      isaiahHope: "🌱",
      isaiahHoly: "🔥",
      isaiahMessiah: "👑",
      isaiahNations: "🌍",
      isaiahDetail: "🔎",
    }[kind as keyof {
      isaiahJudgment: string;
      isaiahHope: string;
      isaiahHoly: string;
      isaiahMessiah: string;
      isaiahNations: string;
      isaiahDetail: string;
    }];
  }

  if (book === "Jeremiah") {
    return {
      jeremiahCall: "📣",
      jeremiahSin: "⚠️",
      jeremiahReturn: "🧭",
      jeremiahJudgment: "⚖️",
      jeremiahTemple: "🏛️",
      jeremiahLament: "💧",
      jeremiahDetail: "🔎",
    }[kind as keyof {
      jeremiahCall: string;
      jeremiahSin: string;
      jeremiahReturn: string;
      jeremiahJudgment: string;
      jeremiahTemple: string;
      jeremiahLament: string;
      jeremiahDetail: string;
    }];
  }

  if (book === "Proverbs") {
    return {
      proverbWisdom: "🧭",
      proverbInstruction: "📜",
      proverbLord: "🙏",
      proverbWarning: "⚠️",
      proverbLife: "🌱",
      proverbDetail: "🔎",
    }[kind as keyof {
      proverbWisdom: string;
      proverbInstruction: string;
      proverbLord: string;
      proverbWarning: string;
      proverbLife: string;
      proverbDetail: string;
    }];
  }

  return {
    integrity: "⚖️",
    speech: "🗣️",
    god: "🙏",
    creation: "🌩️",
    justice: "📜",
    lament: "💧",
    detail: "🔎",
    psalmGod: "👑",
    psalmWisdom: "🌱",
    psalmConflict: "🛡️",
    psalmPrayer: "🙏",
    psalmDetail: "🎶",
  }[kind as keyof {
    integrity: string;
    speech: string;
    god: string;
    creation: string;
    justice: string;
    lament: string;
    detail: string;
    psalmGod: string;
    psalmWisdom: string;
    psalmConflict: string;
    psalmPrayer: string;
    psalmDetail: string;
  }];
}

function scorePhrase(book: BookName, phrase: string) {
  let score = isWeakPhrase(phrase) ? -100 : 0;
  const lower = phrase.toLowerCase();
  if (book === "Job") {
    if (/\b(covenant|righteousness|integrity|elihu|spirit|almighty|whirlwind|foundations|morning|behemoth|leviathan|captivity|blessed)\b/.test(lower)) score += 30;
    if (/\b(eyes|heart|poor|widow|fatherless|words|knowledge|voice|thunder|earth|sea|stars|repent|dust|ashes)\b/.test(lower)) score += 14;
  } else if (book === "Psalms") {
    if (/\b(blessed|law of the lord|tree planted|heathen rage|my king|thou art my son|kiss the son|shield|slept|peace|give ear|heal me)\b/.test(lower)) score += 32;
    if (/\b(lord|righteous|wicked|trust|rejoice|prayer|salvation|mercy|bed)\b/.test(lower)) score += 16;
  } else if (book === "Proverbs") {
    if (/\b(fear of the lord|my son|wisdom|instruction|trust in the lord|keep thy heart|ways acknowledge|path|strange woman|sluggard|lord hate)\b/.test(lower)) score += 34;
    if (/\b(knowledge|understanding|heart|mouth|lips|feet|evil|wicked|father|mother|reproof|diligence)\b/.test(lower)) score += 16;
  } else if (book === "Ecclesiastes") {
    if (/\b(vanity of vanities|under the sun|no new thing|season|time|beautiful in his time|house of god|fear god|gift of god)\b/.test(lower)) score += 34;
    if (/\b(labour|travail|wisdom|folly|vexation|poor|riches|quietness|vow|oppression)\b/.test(lower)) score += 16;
  } else if (book === "Song of Solomon") {
    if (/\b(my beloved|my love|daughters of jerusalem|charge you|set me as a seal|love is strong as death|cometh out of the wilderness)\b/.test(lower)) score += 34;
    if (/\b(kiss|vineyard|fair|rose|lilies|garden|watchmen|heart|voice|spouse)\b/.test(lower)) score += 16;
  } else if (book === "Isaiah") {
    if (/\b(holy holy holy|here am i|virgin shall conceive|unto us a child is born|people that walked in darkness|remnant shall return|rod out of the stem of jesse|wells of salvation)\b/.test(lower)) score += 36;
    if (/\b(sinful nation|scarlet|plowshares|woe|burden|babylon|moab|zion|jerusalem|lord of hosts)\b/.test(lower)) score += 18;
  } else {
    if (/\b(formed thee|belly i knew thee|put my words|fountain of living waters|broken cisterns|return backsliding|amend your ways|lying words|head were waters)\b/.test(lower)) score += 36;
    if (/\b(word of the lord|jerusalem|judah|evil|north|temple|house|idols|weeping|judgment|prophet)\b/.test(lower)) score += 18;
  }
  const words = wordCount(phrase);
  if (words >= 4 && words <= 9) score += 8;
  return score;
}

function bullets(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const clean = phrase.replace(/\bLORD\b/g, "LORD");
  const bulletMap: Record<string, string[]> = {
    integrity: ["⚖️ Moral testing", "👁️ Hidden motives", "🤲 Neighbor love", "📜 Account before God"],
    speech: ["🗣️ Speaker identified", "👂 Words weighed", "📜 Argument followed", "🧭 Debate clarified"],
    god: ["🙏 God is central", "🌬️ Life comes from Him", "👑 He judges rightly", "🕯️ Human limits exposed"],
    creation: ["🌩️ Creation speaks", "🌊 Human smallness", "👑 God's rule", "🧭 Wonder before answers"],
    justice: ["📜 Right and wrong", "⚖️ Judgment weighed", "🧭 Easy answers tested", "🙏 God sees fully"],
    lament: ["💧 Pain named", "🦴 Suffering felt", "🙏 Grief brought to God", "🕯️ Hope still sought"],
    detail: ["🔎 Exact wording", "📖 Scene followed", "🧭 Meaning located", "🕯️ Reader slowed down"],
    psalmGod: ["👑 The LORD reigns", "🕯️ His character leads", "🙏 Worship responds", "🛡️ Refuge is found"],
    psalmWisdom: ["🌱 Two ways compared", "📜 God's word loved", "🧭 Life directed", "🍎 Fruit over time"],
    psalmConflict: ["🛡️ Trouble is real", "⚖️ Rebellion exposed", "👑 God still rules", "🙏 Safety sought"],
    psalmPrayer: ["🙏 Prayer spoken", "💧 Need brought honestly", "🌙 Trust in the night", "🕯️ Peace received"],
    psalmDetail: ["🎶 Psalm language", "📖 Phrase noticed", "🧭 Heart directed", "🙏 Worship made plain"],
  };

  const list = bulletMap[kind] || bulletMap.detail;
  if (/tree planted/i.test(clean)) return ["🌱 Planted stability", "💧 Rivers of water", "🍎 Fruit in season", "🍃 Life that does not wither"];
  if (/whirlwind/i.test(clean)) return ["🌩️ Storm setting", "👑 God speaks", "🕯️ Job listens", "🧭 Questions become worship"];
  if (/leviathan|behemoth/i.test(clean)) return ["🐾 Powerful creature", "🌍 Created strength", "👑 God alone rules", "🕯️ Job's limits exposed"];
  if (/covenant with mine eyes/i.test(clean)) return ["👁️ Eyes disciplined", "⚖️ Desire judged", "🧭 Integrity guarded", "🙏 God sees the private life"];
  return list;
}

function explainJob(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/covenant with mine eyes/.test(lower)) {
    return note([
      `${phrase} means Job made a serious promise about what he would allow his eyes to desire.`,
      "He is not only defending public behavior. He is saying integrity reaches into private thoughts and hidden looks.",
      bullets("Job", phrase).join("\n"),
      "A beginner should see that Job's defense is not casual. He is asking God to examine the inner life as well as outward actions.",
    ]);
  }
  if (/put on righteousness|clothed me/.test(lower)) {
    return note([
      `${phrase} pictures righteousness like clothing Job wore openly.`,
      "Job is saying justice was not a decoration for rare moments. It shaped how people recognized his life.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps readers understand why Job cannot accept the charge that his suffering proves secret cruelty.",
    ]);
  }
  if (/spirit of god hath made me|breath of the almighty/.test(lower)) {
    return note([
      `${phrase} teaches that Elihu sees human life as a gift from God Himself.`,
      "Before Elihu corrects Job, he admits that his own breath and existence come from the Almighty.",
      bullets("Job", phrase).join("\n"),
      "The phrase keeps Elihu's speech from sounding like mere opinion. He is speaking under the truth that people live because God gives life.",
    ]);
  }
  if (/god speaketh once|in a dream|openeth the ears/.test(lower)) {
    return note([
      `${phrase} explains Elihu's claim that God can warn people in more than one way.`,
      "Elihu believes God is not silent just because people do not notice the form of His warning.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a reader follow Elihu's point: God may use dreams, pain, and correction to pull a person back from pride.",
    ]);
  }
  if (/out of the whirlwind/.test(lower)) {
    return note([
      `${phrase} marks the moment God finally answers Job.`,
      "The whirlwind is not a soft classroom setting. It surrounds God's speech with power, awe, and holy seriousness.",
      bullets("Job", phrase).join("\n"),
      "The phrase tells the reader to listen differently now. The debate has ended, and the Creator is speaking.",
    ]);
  }
  if (/where wast thou|foundations of the earth|commanded the morning/.test(lower)) {
    return note([
      `${phrase} turns Job's attention from his courtroom questions to God's creation wisdom.`,
      "God is not avoiding Job. He is showing that Job cannot govern the world or see all that God sees.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a beginner understand God's answer: Job does not get every explanation, but he is brought before the One who rules everything wisely.",
    ]);
  }
  if (/behemoth|leviathan|he beholdeth all high things/.test(lower)) {
    return note([
      `${phrase} points to created power that Job cannot tame or command.`,
      "God uses mighty creatures to show the difference between human limits and divine rule.",
      bullets("Job", phrase).join("\n"),
      "The phrase is not random animal detail. It teaches Job that proud strength in creation still belongs under God's authority.",
    ]);
  }
  if (/i know that thou canst do every thing|now mine eye seeth thee|dust and ashes/.test(lower)) {
    return note([
      `${phrase} is Job's humbled response after hearing the LORD.`,
      "Job does not pretend his pain was small. But he stops speaking as though he can judge the whole order of God's world.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps readers see repentance as a return to reverence when God's greatness becomes clear.",
    ]);
  }
  if (/turned the captivity of job|blessed the latter end/.test(lower)) {
    return note([
      `${phrase} shows the LORD restoring Job after the long season of loss and accusation.`,
      "The ending does not erase the suffering, but it does reveal that Job's story was never abandoned by God.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a beginner see that restoration belongs to the LORD, not to the friends' shallow explanations.",
    ]);
  }

  const kind = category("Job", phrase);
  const openings: Record<string, string> = {
    integrity: `${phrase} belongs to Job's final defense of his integrity.`,
    speech: `${phrase} helps identify how the speeches in Job are moving.`,
    god: `${phrase} puts God, not human opinion, at the center of the argument.`,
    creation: `${phrase} draws the reader into God's wisdom over the created world.`,
    justice: `${phrase} presses the justice question that runs through Job.`,
    lament: `${phrase} gives language to suffering instead of hiding it.`,
    detail: `${phrase} gives the reader a concrete handle on this part of Job.`,
  };
  const second: Record<string, string> = {
    integrity: "Job is asking to be weighed honestly, not judged by the friends' simple formula that suffering must prove guilt.",
    speech: "The book is careful about who is speaking, because each speaker brings a different kind of counsel or correction.",
    god: "Job and his friends have spoken many words, but the book keeps pulling the reader back to the God who knows more than they do.",
    creation: "The creation language widens the scene until Job's suffering is held before the Creator of the whole world.",
    justice: "The phrase matters because Job is wrestling with righteousness, guilt, and God's government of the world.",
    lament: "The pain is not treated as an abstract idea. It is voiced in words a suffering person can actually say.",
    detail: "The wording may feel small, but it keeps the reader close to the exact movement of the passage.",
  };
  const closing: Record<string, string> = {
    integrity: "That matters because Job is asking God to weigh his conduct, not letting the friends define him from his pain alone.",
    speech: "That helps a beginner track the debate instead of blending every speaker into one voice.",
    god: "That matters because Job's story cannot be understood without remembering that God sees more than every human speaker.",
    creation: "That helps the reader feel the scale of God's wisdom before trying to solve Job's suffering too quickly.",
    justice: "That keeps the question honest: righteousness, guilt, suffering, and God's rule are all being weighed.",
    lament: "That helps the reader hear grief as part of faithful wrestling, not as something to skip.",
    detail: "That small handle keeps the reader attached to the actual wording of Job.",
  };

  return note([openings[kind], second[kind], bullets("Job", phrase).join("\n"), closing[kind]]);
}

function explainProverbs(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/fear of the lord|beginning of knowledge|beginning of wisdom|knowledge of god/.test(lower)) {
    return note([
      `${phrase} means wisdom starts with reverence for the LORD, not with self-confidence.`,
      "Proverbs does not begin by telling the reader to be clever. It begins by teaching the reader to stand rightly before God.",
      "🙏 Reverence first\n🧭 Wisdom directed\n📜 Knowledge humbled\n🌱 Life can grow",
      "The phrase helps a beginner see why Bible wisdom is moral and spiritual, not just smart advice.",
    ]);
  }
  if (/my son|instruction of thy father|law of thy mother|receive my words|attend unto my wisdom|forget not my law/.test(lower)) {
    return note([
      `${phrase} places wisdom inside teachable listening.`,
      "The reader is addressed like a child being trained for life. Wisdom must be received, remembered, and guarded before it can shape the path.",
      "📜 Instruction heard\n👂 Listening heart\n🏠 Family teaching\n🧭 Path shaped",
      "The phrase helps a beginner understand why Proverbs repeats this family language so often.",
    ]);
  }
  if (/wisdom crieth|wisdom entereth|understanding|discretion|counsel|reproof|knowledge/.test(lower)) {
    return note([
      `${phrase} treats wisdom as something that calls, corrects, and protects.`,
      "Wisdom is not hidden because God wants people confused. It calls out, gives understanding, and warns before foolish choices harden.",
      "🧭 Wisdom calls\n📜 Understanding grows\n⚠️ Reproof warns\n🛡️ Discretion protects",
      "The phrase helps the reader see wisdom as active guidance, not just information.",
    ]);
  }
  if (/trust in the lord|all thine heart|acknowledge him|direct thy paths|honour the lord|chastening of the lord/.test(lower)) {
    return note([
      `${phrase} teaches trust that gives the LORD the whole path, not only religious moments.`,
      "The heart, the ways, the possessions, and even correction are brought under God's care. Wisdom learns to depend on Him.",
      "🙏 Trust surrendered\n❤️ Whole heart\n🧭 Ways acknowledged\n🌱 Correction received",
      "The phrase helps a beginner see trust as daily direction, not a vague feeling.",
    ]);
  }
  if (/keep thy heart|ponder the path|path of the just|feet|mouth|lips|eyes|tongue/.test(lower)) {
    return note([
      `${phrase} shows wisdom guarding the parts of life that steer a person.`,
      "Proverbs speaks about heart, mouth, eyes, feet, and path because choices do not stay private. Inner direction becomes outward walking.",
      "❤️ Heart guarded\n👄 Words watched\n👀 Eyes directed\n👣 Path examined",
      "The phrase helps the reader connect small daily choices to the direction of the whole life.",
    ]);
  }
  if (/sinners entice|consent thou not|evil way|strange woman|wicked|froward|abomination|six things doth the lord hate/.test(lower)) {
    return note([
      `${phrase} warns the reader before sin looks normal or harmless.`,
      "Proverbs names enticement, crooked speech, violence, lust, pride, lying, and destructive friendship so the reader can recognize danger early.",
      "⚠️ Temptation named\n🛑 Consent refused\n👄 Crooked speech exposed\n🧭 Escape path shown",
      "The phrase helps a beginner see warning as mercy, not merely restriction.",
    ]);
  }
  if (/go to the ant|sluggard|little sleep|poverty|diligent|hands/.test(lower)) {
    return note([
      `${phrase} uses ordinary work to teach watchfulness and discipline.`,
      "The ant becomes a small teacher. Proverbs makes laziness visible before it becomes poverty, disorder, and regret.",
      "🐜 Ant observed\n⏳ Delay exposed\n🤲 Diligence learned\n🌱 Future protected",
      "The phrase helps the reader see that wisdom includes habits, time, and work.",
    ]);
  }
  if (/virtuous woman|strength and honour|price is far above rubies|heart of her husband|openeth her mouth with wisdom|children arise up/.test(lower)) {
    return note([
      `${phrase} shows wisdom embodied in a faithful, capable life.`,
      "Proverbs 31 is not a random ideal pasted onto the end. It gathers wisdom into character, work, speech, generosity, and fear of the LORD.",
      "💎 Worth honored\n🤲 Work faithful\n👄 Wisdom spoken\n🙏 LORD feared",
      "The phrase helps a beginner see noble wisdom as a whole-life pattern, not just a list of tasks.",
    ]);
  }
  if (/soft answer|false balance|word fitly spoken|faithful are the wounds|death and life|power of the tongue|buy the truth|sell it not/.test(lower)) {
    return note([
      `${phrase} teaches that words and honesty carry real weight before God.`,
      "Proverbs treats speech, business, correction, and truth as spiritual matters. A mouth can heal, wound, deceive, or preserve life.",
      "👄 Speech weighed\n⚖️ Honesty required\n🧭 Truth guarded\n🌱 Life protected",
      "The phrase helps the reader see wisdom in everyday conversations and choices.",
    ]);
  }
  if (/pride goeth|righteousness|justice and judgment|wicked flee|covereth his sins|righteous man falling down|wealth|poor/.test(lower)) {
    return note([
      `${phrase} puts character, justice, and humility in front of the reader.`,
      "Proverbs will not let people separate wisdom from righteousness. Pride, hidden sin, injustice, and greed bend a life away from God.",
      "⚖️ Justice sought\n🛑 Pride exposed\n💧 Sin confessed\n🌱 Humility guarded",
      "The phrase helps a beginner understand wisdom as moral formation, not clever strategy.",
    ]);
  }
  if (/strange woman|keep my commandments|wisdom cry|wisdom hath builded|forsake the foolish|fear of the lord is to hate evil/.test(lower)) {
    return note([
      `${phrase} sets wisdom and folly in direct contrast.`,
      "These chapters show both voices calling. Wisdom invites life, while folly and forbidden desire invite ruin with a pleasant sound.",
      "🧭 Wisdom calls\n⚠️ Folly tempts\n❤️ Desire tested\n🌱 Life chosen",
      "The phrase helps the reader recognize that not every invitation leads to life.",
    ]);
  }

  const kind = category("Proverbs", phrase);
  const openings: Record<string, string> = {
    proverbWisdom: `${phrase} points to wisdom as trained understanding, not quick opinion.`,
    proverbInstruction: `${phrase} asks the reader to become teachable before trying to be impressive.`,
    proverbLord: `${phrase} keeps wisdom anchored in relationship to the LORD.`,
    proverbWarning: `${phrase} names danger clearly so the reader does not walk into it blindly.`,
    proverbLife: `${phrase} connects the inner life with the path a person actually walks.`,
    proverbDetail: `${phrase} gives the reader one concrete handle for following Proverbs carefully.`,
  };
  const second: Record<string, string> = {
    proverbWisdom: "Proverbs teaches by shaping judgment, desire, speech, work, and choices over time.",
    proverbInstruction: "The repeated call to listen shows that wisdom must be received before it can be practiced.",
    proverbLord: "The LORD is not added to wisdom later. He is the center that makes wisdom true.",
    proverbWarning: "The warning is practical mercy. It shows the end of a path before the reader is trapped on it.",
    proverbLife: "Heart, mouth, feet, and path language helps the reader see that wisdom is embodied.",
    proverbDetail: "The line may be brief, but it keeps the reader attached to the exact wording.",
  };
  const list: Record<string, string> = {
    proverbWisdom: "🧭 Wisdom sought\n📜 Instruction received\n👂 Reproof heard\n🌱 Understanding grows",
    proverbInstruction: "📜 Teaching given\n👂 Listening required\n🏠 Formation at home\n🧭 Life directed",
    proverbLord: "🙏 LORD trusted\n❤️ Heart surrendered\n🧭 Path directed\n🌱 Discipline received",
    proverbWarning: "⚠️ Danger named\n🛑 Path avoided\n👄 Words tested\n🧭 Wisdom protects",
    proverbLife: "❤️ Heart watched\n👄 Speech weighed\n👣 Feet guided\n🌱 Life guarded",
    proverbDetail: "🔎 Phrase noticed\n📖 Line followed\n🧭 Meaning located\n🌱 Wisdom practiced",
  };
  const closing: Record<string, string> = {
    proverbWisdom: "The phrase helps a beginner see wisdom as a way of life learned under God.",
    proverbInstruction: "The phrase keeps the reader from treating Proverbs as random sayings instead of fatherly training.",
    proverbLord: "The phrase shows that wise living begins with trusting and honoring God.",
    proverbWarning: "The phrase helps the reader recognize danger before it becomes a pattern.",
    proverbLife: "The phrase shows that the heart and the path cannot be separated.",
    proverbDetail: "The phrase helps the reader slow down and understand the proverb on its own terms.",
  };

  return note([openings[kind], second[kind], list[kind], closing[kind]]);
}

function explainEcclesiastes(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/good name|end of a thing|just man upon earth|wisdom strengtheneth|king's commandment|race is not to the swift|cast thy bread|remember now thy creator|fear god|keep his commandments/.test(lower)) {
    return note([
      `${phrase} presses the reader toward sober wisdom before life is over.`,
      "The later chapters of Ecclesiastes keep testing life under the sun, but they also press toward reverence, humility, and remembering God before old age and death.",
      "🧭 Wisdom sober\n⏳ Life brief\n🙏 Creator remembered\n📜 Commandments kept",
      "The phrase helps a beginner see that Ecclesiastes does not end in emptiness; it leads the reader toward fearing God.",
    ]);
  }
  if (/vanity of vanities|under the sun|no profit|vexation of spirit|no new thing/.test(lower)) {
    return note([
      `${phrase} names the frustration of life when everything is measured only from below.`,
      "Ecclesiastes uses this language to make the reader feel the limits of labor, pleasure, memory, and achievement without God at the center.",
      "🌫️ Life feels vapor-like\n☀️ Under the sun\n🔁 Cycles repeat\n🧭 Meaning is tested",
      "The phrase helps a beginner see that Ecclesiastes is asking honest questions about meaning, not mocking faith.",
    ]);
  }
  if (/wisdom|wise|folly|madness|knowledge|sorrow/.test(lower)) {
    return note([
      `${phrase} tests what wisdom can and cannot solve by itself.`,
      "The Preacher values wisdom, but he also shows that wisdom cannot erase death, sorrow, injustice, or the limits of human control.",
      "🧭 Wisdom examined\n⚠️ Folly exposed\n💧 Sorrow admitted\n🙏 Limits faced",
      "The phrase keeps the reader from treating wisdom like a shortcut around human weakness.",
    ]);
  }
  if (/season|time to|beautiful in his time|world in their heart|beginning to the end/.test(lower)) {
    return note([
      `${phrase} teaches that human life moves inside times people do not control.`,
      "Ecclesiastes 3 names birth, death, planting, losing, mourning, dancing, silence, and speech under God's larger rule.",
      "⏳ Time appointed\n🌱 Life changes\n👑 God sees whole\n🕯️ Humans see partly",
      "The phrase helps a beginner understand time as something received, not mastered.",
    ]);
  }
  if (/gift of god|house of god|keep thy foot|vow|fear thou god|god is in heaven/.test(lower)) {
    return note([
      `${phrase} turns the reader from restless control toward reverent worship.`,
      "Ecclesiastes does not answer emptiness with noise. It teaches people to listen, fear God, receive His gifts, and speak carefully before Him.",
      "🙏 Reverence learned\n👂 Listening first\n🎁 Gifts received\n👄 Words weighed",
      "The phrase helps the reader see worship as humble attention before God.",
    ]);
  }
  if (/two are better than one|handful with quietness|oppression|silver|riches|labour/.test(lower)) {
    return note([
      `${phrase} examines daily life without pretending wealth or work can carry everything.`,
      "Work, money, loneliness, oppression, and companionship are all tested. Ecclesiastes asks what really remains when gain cannot satisfy the soul.",
      "⚖️ Work weighed\n💰 Wealth limited\n🤝 Companionship valued\n🌫️ Gain questioned",
      "The phrase helps a beginner read Ecclesiastes as practical honesty about life in a broken world.",
    ]);
  }

  const kind = category("Ecclesiastes", phrase);
  const openings: Record<string, string> = {
    ecclesiastesVapor: `${phrase} slows the reader down before the vapor-like feel of life under the sun.`,
    ecclesiastesWisdom: `${phrase} weighs wisdom honestly without pretending wisdom makes people unlimited.`,
    ecclesiastesTime: `${phrase} places the moment inside God's larger timing.`,
    ecclesiastesGod: `${phrase} redirects the reader toward reverence before God.`,
    ecclesiastesLife: `${phrase} tests ordinary life to show what can and cannot satisfy.`,
    ecclesiastesDetail: `${phrase} gives the reader one concrete handle for following Ecclesiastes carefully.`,
  };
  const second: Record<string, string> = {
    ecclesiastesVapor: "The Preacher is exposing how fragile achievement and memory feel when they are treated as ultimate.",
    ecclesiastesWisdom: "Wisdom is better than folly, but Ecclesiastes also admits that wisdom cannot remove every grief.",
    ecclesiastesTime: "People experience pieces of time, while God sees the whole work from beginning to end.",
    ecclesiastesGod: "Reverence keeps the reader from answering life's frustration with careless speech or empty religion.",
    ecclesiastesLife: "The book looks directly at work, wealth, friendship, oppression, and pleasure without pretending they are enough.",
    ecclesiastesDetail: "The line may be brief, but it helps the reader follow the argument instead of flattening the book.",
  };
  const list: Record<string, string> = {
    ecclesiastesVapor: "🌫️ Vapor named\n☀️ Under the sun\n🔁 Limits felt\n🧭 Meaning tested",
    ecclesiastesWisdom: "🧭 Wisdom valued\n⚠️ Folly exposed\n💧 Sorrow admitted\n🙏 Limits faced",
    ecclesiastesTime: "⏳ Time appointed\n🌱 Season changes\n🕯️ Humans see partly\n👑 God sees whole",
    ecclesiastesGod: "🙏 Reverence learned\n👂 Listening first\n🎁 Gifts received\n👄 Words weighed",
    ecclesiastesLife: "⚖️ Life weighed\n💰 Gain limited\n🤝 Companions matter\n🌫️ Satisfaction tested",
    ecclesiastesDetail: "🔎 Phrase noticed\n📖 Line followed\n🧭 Meaning located\n🙏 Reverence kept",
  };
  const closing: Record<string, string> = {
    ecclesiastesVapor: "The phrase helps a beginner feel the question Ecclesiastes is forcing into the open.",
    ecclesiastesWisdom: "The phrase helps the reader value wisdom without turning it into an idol.",
    ecclesiastesTime: "The phrase helps the reader receive time with humility instead of pretending to control it.",
    ecclesiastesGod: "The phrase shows that reverence is the right posture when life feels too large to master.",
    ecclesiastesLife: "The phrase helps the reader test ordinary life honestly before God.",
    ecclesiastesDetail: "The phrase keeps the reader close to Ecclesiastes' exact argument.",
  };

  return note([openings[kind], second[kind], list[kind], closing[kind]]);
}

function explainSong(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/beloved is mine|i am my beloved|set me as a seal|love is strong as death|voice of my beloved/.test(lower)) {
    return note([
      `${phrase} speaks about covenant love as personal, devoted, and difficult to ignore.`,
      "Song of Solomon uses poetry rather than plain instruction. The language of belonging, voice, and seal helps the reader feel love as commitment, desire, and delight.",
      "❤️ Love belongs\n🕯️ Desire awakened\n🤲 Commitment held\n🔥 Love is strong",
      "The phrase helps a beginner read the book as poetic celebration of faithful love, not random romantic fragments.",
    ]);
  }
  if (/daughters of jerusalem|charge you|stir not up|watchmen|found me|city/.test(lower)) {
    return note([
      `${phrase} warns the reader to handle desire with patience and care.`,
      "The repeated charge to the daughters of Jerusalem matters because love is powerful. The poem honors desire without treating it as something careless.",
      "🕯️ Desire guarded\n⏳ Timing matters\n🏙️ Search named\n❤️ Love treated seriously",
      "The phrase helps the reader see that Song of Solomon celebrates love while still teaching restraint.",
    ]);
  }
  if (/kiss|mouth|eyes|hair|teeth|lips|neck|breasts|body|white and ruddy/.test(lower)) {
    return note([
      `${phrase} uses embodied poetry to show delight between lovers.`,
      "The images are not meant to be read like a technical description. They are poetic comparisons that express admiration, beauty, longing, and joy.",
      "🌹 Beauty praised\n👀 Admiration spoken\n❤️ Desire delighted\n🕯️ Poetry carries feeling",
      "The phrase helps a beginner understand the imagery as love poetry, not as a flat list of body parts.",
    ]);
  }
  if (/vineyard|garden|lilies|rose|apple tree|wilderness|mountains|cedars|spices/.test(lower)) {
    return note([
      `${phrase} uses creation imagery to make love feel alive and fruitful.`,
      "Gardens, vineyards, spices, mountains, and lilies give the poem a world of scent, color, movement, and longing.",
      "🌿 Garden imagery\n🍇 Love fruitful\n🌹 Beauty pictured\n⛰️ Longing moves",
      "The phrase helps the reader follow the poem's emotional world without forcing every image into a wooden definition.",
    ]);
  }

  const kind = category("Song of Solomon", phrase);
  const openings: Record<string, string> = {
    songLove: `${phrase} expresses love as delight, belonging, or commitment.`,
    songDesire: `${phrase} belongs to the poem's language of admiration and desire.`,
    songWarning: `${phrase} slows the reader down around the timing and seriousness of love.`,
    songImagery: `${phrase} uses vivid imagery to carry the feeling of the song.`,
    songDetail: `${phrase} gives the reader one concrete line to hold while reading the poem.`,
  };
  const second: Record<string, string> = {
    songLove: "Song of Solomon teaches through poetry, so love is shown through voice, longing, presence, and belonging.",
    songDesire: "The poem honors embodied affection while keeping it inside the larger movement of devoted love.",
    songWarning: "The warning language reminds the reader that desire is strong and should not be treated carelessly.",
    songImagery: "The image is doing emotional work, helping the reader feel beauty, distance, invitation, or delight.",
    songDetail: "The line may be brief, but it helps the reader stay inside the poem rather than flattening it.",
  };
  const list: Record<string, string> = {
    songLove: "❤️ Love named\n🤲 Belonging held\n🕯️ Desire honored\n🔥 Commitment felt",
    songDesire: "🌹 Beauty praised\n👀 Admiration spoken\n❤️ Desire delighted\n🕯️ Poetry carries feeling",
    songWarning: "🕯️ Desire guarded\n⏳ Timing matters\n🏙️ Search named\n❤️ Love treated seriously",
    songImagery: "🌿 Image noticed\n🍇 Feeling carried\n🌹 Beauty pictured\n⛰️ Longing moves",
    songDetail: "🔎 Phrase noticed\n📖 Poem followed\n❤️ Love understood\n🕯️ Meaning slowed",
  };
  const closing: Record<string, string> = {
    songLove: "The phrase helps the reader see love as personal and covenant-shaped.",
    songDesire: "The phrase helps a beginner read desire as poetic delight rather than crude description.",
    songWarning: "The phrase keeps love from being treated as careless impulse.",
    songImagery: "The phrase helps the reader understand why the poem speaks through pictures.",
    songDetail: "The phrase keeps the reader close to the actual line of the song.",
  };

  return note([openings[kind], second[kind], list[kind], closing[kind]]);
}

function explainIsaiah(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/hear o heavens|sinful nation|scarlet|white as snow|swords into plowshares|woe unto them/.test(lower)) {
    return note([
      `${phrase} brings Judah's rebellion, judgment, and invitation to cleansing into sharp focus.`,
      "Isaiah begins like a covenant lawsuit. God exposes sin, calls for repentance, promises cleansing, and shows Zion's future hope.",
      "⚖️ Sin exposed\n💧 Cleansing offered\n🏙️ Zion addressed\n🌱 Hope still open",
      "The phrase helps a beginner see that judgment in Isaiah is not random anger; it is God confronting covenant rebellion.",
    ]);
  }
  if (/holy holy holy|lord of hosts|here am i|send me|coal|altar|unclean lips/.test(lower)) {
    return note([
      `${phrase} centers the reader on the holiness of the LORD and Isaiah's call.`,
      "Isaiah sees the King, feels his uncleanness, receives cleansing, and is sent. The call begins with God's holiness, not Isaiah's confidence.",
      "🔥 Holy LORD\n👄 Unclean lips\n💧 Cleansing given\n📣 Prophet sent",
      "The phrase helps a beginner understand why Isaiah's message carries the weight of God's throne room.",
    ]);
  }
  if (/virgin shall conceive|immanuel|child is born|son is given|walked in darkness|prince of peace/.test(lower)) {
    return note([
      `${phrase} points to hope through the promised child and God's presence with His people.`,
      "Isaiah places royal hope inside dark days. The child language speaks of God's answer to fear, failed kings, and deep darkness.",
      "👑 Coming king\n🌑 Darkness answered\n🕯️ Light given\n🙏 God with us",
      "The phrase helps the reader see messianic hope growing inside judgment, not outside it.",
    ]);
  }
  if (/remnant shall return|rod out of the stem of jesse|branch|wells of salvation|joy shall ye draw water/.test(lower)) {
    return note([
      `${phrase} shows that judgment will not erase God's promise to preserve and restore.`,
      "Isaiah speaks of a remnant, Jesse's root, righteous rule, and salvation like water drawn with joy.",
      "🌱 Remnant preserved\n👑 Jesse's branch\n💧 Salvation drawn\n🎶 Joy returns",
      "The phrase helps a beginner see that Isaiah's hope is rooted in God's faithfulness after judgment.",
    ]);
  }
  if (/burden of babylon|fallen from heaven|burden of moab|howl|desolate|nations/.test(lower)) {
    return note([
      `${phrase} announces that the nations also stand under the LORD's rule.`,
      "Isaiah's burden oracles show that Babylon, Moab, and every proud power are accountable to God, not outside His reach.",
      "🌍 Nations judged\n⚖️ Pride exposed\n🏙️ Cities humbled\n👑 LORD rules",
      "The phrase helps the reader understand that Isaiah is not only about Judah; God rules the nations.",
    ]);
  }

  const kind = category("Isaiah", phrase);
  const openings: Record<string, string> = {
    isaiahJudgment: `${phrase} names rebellion, pride, or coming judgment without softening it.`,
    isaiahHope: `${phrase} keeps hope alive inside a book full of warning.`,
    isaiahHoly: `${phrase} draws the reader toward the holiness and majesty of the LORD.`,
    isaiahMessiah: `${phrase} points toward the promised king and God's answer to darkness.`,
    isaiahNations: `${phrase} places peoples and kingdoms under the LORD's rule.`,
    isaiahDetail: `${phrase} gives the reader one concrete line for following Isaiah carefully.`,
  };
  const second: Record<string, string> = {
    isaiahJudgment: "Isaiah shows that sin damages worship, justice, leadership, and nations, so God confronts it truthfully.",
    isaiahHope: "Hope in Isaiah is not denial. It is God's promise breaking into judgment and failure.",
    isaiahHoly: "The LORD's holiness explains both the seriousness of sin and the mercy of cleansing.",
    isaiahMessiah: "The royal promise matters because human kings fail, but God still promises righteous rule.",
    isaiahNations: "The nations are not outside God's sight. Their pride, violence, and future are all before Him.",
    isaiahDetail: "The line may be brief, but it keeps the reader attached to the actual prophetic wording.",
  };
  const list: Record<string, string> = {
    isaiahJudgment: "⚖️ Sin confronted\n🏙️ People warned\n🔥 Pride exposed\n🙏 Repentance needed",
    isaiahHope: "🌱 Remnant hope\n💧 Mercy offered\n👑 Promise kept\n🎶 Salvation named",
    isaiahHoly: "🔥 Holy LORD\n👄 Human uncleanness\n💧 Cleansing given\n📣 Sending follows",
    isaiahMessiah: "👑 Promised king\n🕯️ Light in darkness\n🙏 God with us\n🌱 Rule restored",
    isaiahNations: "🌍 Nations seen\n⚖️ Powers judged\n🏙️ Cities humbled\n👑 LORD reigns",
    isaiahDetail: "🔎 Phrase noticed\n📖 Oracle followed\n🧭 Meaning located\n🙏 Reader slowed",
  };
  const closing: Record<string, string> = {
    isaiahJudgment: "The phrase helps a beginner feel why Isaiah's warnings are morally serious.",
    isaiahHope: "The phrase helps the reader see mercy shining inside judgment.",
    isaiahHoly: "The phrase keeps God's holiness at the center of Isaiah's message.",
    isaiahMessiah: "The phrase helps the reader recognize hope centered on God's promised king.",
    isaiahNations: "The phrase helps the reader see that God's rule reaches beyond Israel and Judah.",
    isaiahDetail: "The phrase keeps the reader close to Isaiah's actual words.",
  };

  return note([openings[kind], second[kind], list[kind], closing[kind]]);
}

function explainJeremiah(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/formed thee|belly i knew thee|put my words|set thee over the nations|ordained thee a prophet/.test(lower)) {
    return note([
      `${phrase} shows Jeremiah's calling began with God's knowledge and command, not Jeremiah's confidence.`,
      "Jeremiah is young and afraid, but the LORD gives him words, authority, and a mission to speak to nations and kingdoms.",
      "📣 God calls\n👄 Words given\n🌍 Nations addressed\n🛡️ Fear answered",
      "The phrase helps a beginner see that prophetic ministry begins with God's initiative.",
    ]);
  }
  if (/two evils|forsaken me|fountain of living waters|broken cisterns|backsliding|played the harlot/.test(lower)) {
    return note([
      `${phrase} explains Judah's sin as leaving the living God for something that cannot hold life.`,
      "Jeremiah does not describe idolatry as a small mistake. It is covenant unfaithfulness, a turning from the fountain to cracked substitutes.",
      "⚠️ God forsaken\n💧 Living water refused\n🕳️ Broken cisterns chosen\n🧭 Return needed",
      "The phrase helps readers understand why Jeremiah's warnings are so emotional and serious.",
    ]);
  }
  if (/return|amend your ways|break up your fallow ground|circumcise yourselves|stand ye in the ways|ask for the old paths/.test(lower)) {
    return note([
      `${phrase} calls the people to turn back before judgment becomes unavoidable.`,
      "The LORD is not merely announcing disaster. He is calling for changed ways, softened hearts, and a return to the path they abandoned.",
      "🧭 Return called\n🌱 Ground broken\n❤️ Heart addressed\n👣 Old paths sought",
      "The phrase helps a beginner see repentance as real turning, not religious wording.",
    ]);
  }
  if (/lying words|temple of the lord|house which is called by my name|shiloh|burn incense|sacrifices/.test(lower)) {
    return note([
      `${phrase} exposes false trust in religious places and phrases without obedience.`,
      "Jeremiah warns that temple language cannot protect people who keep practicing injustice, idolatry, and rebellion.",
      "🏛️ Temple named\n⚠️ False trust exposed\n⚖️ Justice required\n🙏 Obedience matters",
      "The phrase helps the reader see that sacred language cannot replace a surrendered life.",
    ]);
  }
  if (/out of the north|evil appeareth|sword|destruction|anger|wrath|punish|judgment/.test(lower)) {
    return note([
      `${phrase} names judgment as the consequence of covenant rebellion.`,
      "Jeremiah's warnings are heavy because the people have refused correction. The coming disaster is tied to long resistance, not random cruelty.",
      "⚖️ Judgment announced\n🔥 Sin confronted\n🏙️ City warned\n🙏 Mercy rejected",
      "The phrase helps a beginner connect Jeremiah's hard words to the seriousness of persistent rebellion.",
    ]);
  }
  if (/head were waters|eyes a fountain|weeping|hurt of the daughter|balm in gilead|mourn/.test(lower)) {
    return note([
      `${phrase} lets the reader hear grief inside the prophetic message.`,
      "Jeremiah does not speak judgment coldly. He grieves over the wound of the people and the ruin their sin is bringing.",
      "💧 Tears named\n💔 Wound felt\n🏙️ People mourned\n🙏 Grief brought before God",
      "The phrase helps readers see that biblical warning can come with deep sorrow.",
    ]);
  }

  const kind = category("Jeremiah", phrase);
  const openings: Record<string, string> = {
    jeremiahCall: `${phrase} belongs to Jeremiah's calling and the LORD's words placed in his mouth.`,
    jeremiahSin: `${phrase} names the people's covenant unfaithfulness without hiding it.`,
    jeremiahReturn: `${phrase} calls for real turning, not surface religion.`,
    jeremiahJudgment: `${phrase} warns that rebellion has consequences before the LORD.`,
    jeremiahTemple: `${phrase} tests whether worship language is matched by obedience.`,
    jeremiahLament: `${phrase} carries grief over the wound of God's people.`,
    jeremiahDetail: `${phrase} gives the reader one concrete line for following Jeremiah carefully.`,
  };
  const second: Record<string, string> = {
    jeremiahCall: "The prophet does not invent the message. He receives words from the LORD and must speak them faithfully.",
    jeremiahSin: "Jeremiah shows sin as relational betrayal, not merely rule-breaking.",
    jeremiahReturn: "The call to return reaches the heart, the habits, and the public ways of the people.",
    jeremiahJudgment: "The warning is severe because the people keep refusing correction.",
    jeremiahTemple: "Jeremiah confronts religious confidence that avoids justice and obedience.",
    jeremiahLament: "The prophet's sorrow helps the reader feel the human cost of rebellion.",
    jeremiahDetail: "The line may be brief, but it keeps the reader close to Jeremiah's actual wording.",
  };
  const list: Record<string, string> = {
    jeremiahCall: "📣 Call received\n👄 Words given\n🌍 Nations addressed\n🛡️ Fear answered",
    jeremiahSin: "⚠️ Sin named\n💧 Fountain forsaken\n🕳️ False hope chosen\n🧭 Return needed",
    jeremiahReturn: "🧭 Turn back\n🌱 Heart broken up\n👣 Old paths sought\n🙏 Mercy still calls",
    jeremiahJudgment: "⚖️ Judgment warned\n🔥 Rebellion exposed\n🏙️ City addressed\n🙏 Correction refused",
    jeremiahTemple: "🏛️ Temple named\n⚠️ False trust exposed\n⚖️ Justice required\n🙏 Obedience matters",
    jeremiahLament: "💧 Tears named\n💔 Wound felt\n🏙️ People mourned\n🙏 Grief spoken",
    jeremiahDetail: "🔎 Phrase noticed\n📖 Oracle followed\n🧭 Meaning located\n🙏 Reader slowed",
  };
  const closing: Record<string, string> = {
    jeremiahCall: "The phrase helps a beginner see that Jeremiah speaks because God sends him.",
    jeremiahSin: "The phrase helps the reader understand why Jeremiah's warnings are so serious.",
    jeremiahReturn: "The phrase teaches repentance as a changed direction before God.",
    jeremiahJudgment: "The phrase keeps judgment connected to persistent rebellion.",
    jeremiahTemple: "The phrase shows that worship language cannot replace obedience.",
    jeremiahLament: "The phrase helps the reader hear sorrow inside the warning.",
    jeremiahDetail: "The phrase keeps the reader close to the exact text.",
  };

  return note([openings[kind], second[kind], list[kind], closing[kind]]);
}

function explainPsalm(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/except the lord build|build the house|children are an heritage|feareth the lord|eat the labour of thine hands|afflicted me|cords of the wicked/.test(lower)) {
    return note([
      `${phrase} teaches dependence on the LORD in ordinary life, family life, and long endurance.`,
      "These songs do not treat home, work, children, and affliction as separate from worship. They place daily life under the LORD's care.",
      "🏠 House under God\n🌱 Family received\n🛡️ Affliction endured\n🙏 Dependence learned",
      "The phrase helps a beginner see that faith belongs in the home and the field, not only in the sanctuary.",
    ]);
  }
  if (/out of the depths|forgiveness with thee|wait for the lord|hope in the lord|remember david|swore unto david|ark of thy strength|chosen zion|vowed unto the mighty god of jacob/.test(lower)) {
    return note([
      `${phrase} brings deep need together with forgiveness, waiting, and covenant promise.`,
      "The worshiper cries from the depths, waits for mercy, and remembers that God's promise to David still carries hope for His people.",
      "💧 Depths named\n🙏 Forgiveness sought\n🕯️ Waiting faith\n📜 Promise remembered",
      "The phrase teaches that hope is not denial. It is waiting on the LORD who forgives and keeps covenant.",
    ]);
  }
  if (/good and pleasant|brethren dwell together|bless ye the lord|servants of the lord|chosen jacob|idols|whatsoever the lord pleased/.test(lower)) {
    return note([
      `${phrase} shows worship as shared life before the living LORD.`,
      "Unity, blessing, praise, and the rejection of idols all belong together because the LORD is not a silent image. He is the God who chooses, rules, and receives praise.",
      "🤝 Unity cherished\n🎶 Praise offered\n👑 Living LORD\n🪨 Idols exposed",
      "The phrase helps a beginner see that true worship shapes both community and loyalty.",
    ]);
  }
  if (/mercy endureth for ever|rivers of babylon|forgotten thee o jerusalem|whole heart|magnified thy word|perfect that which concerneth me|sihon king|og king|og the king|kingdoms of canaan|give thanks|god of gods|lord of lords|god of heaven|smote great kings|daughter of babylon/.test(lower)) {
    return note([
      `${phrase} holds lasting mercy beside exile, memory, and personal praise.`,
      "These psalms remember God's repeated mercy, grieve over Zion in exile, and then answer with whole-hearted praise before the LORD.",
      "💧 Mercy repeated\n🏙️ Zion remembered\n🎶 Praise with whole heart\n📜 Word magnified",
      "The phrase helps the reader understand praise as memory: remembering mercy, grief, and God's faithfulness together.",
    ]);
  }
  if (/searched me|known me|fearfully and wonderfully made|search me o god|evil man|watch before my mouth|incline not my heart|grieved with those that rise|give thanks unto thy name/.test(lower)) {
    return note([
      `${phrase} brings the hidden life under the LORD who knows and keeps His people.`,
      "The psalmist is known before speaking, formed before birth, and still asks God to guard the mouth, heart, and path from evil.",
      "🔎 God searches\n🌱 Life formed\n👄 Mouth guarded\n🧭 Heart directed",
      "The phrase helps a beginner see that being known by God is both comfort and a call to holiness.",
    ]);
  }
  if (/cried unto the lord|refuge|bring my soul out of prison|teach me to do thy will|lord my strength|traineth my hands|what is man|soul thirsteth|lovingkindness in the morning|salvation unto kings|great waters|mouth speaketh vanity|strange children|daughters may be as corner stones/.test(lower)) {
    return note([
      `${phrase} turns fear, loneliness, and battle into prayer for refuge and mercy.`,
      "The psalmist does not pretend to be strong enough alone. He asks for rescue, teaching, deliverance, and help from the LORD.",
      "🙏 Cry for refuge\n🛡️ Soul rescued\n🧭 Will taught\n⚔️ Strength given",
      "The phrase gives a beginner words for pressure without making self-reliance the answer.",
    ]);
  }
  if (/great is the lord|greatly to be praised|upholdeth all that fall|nigh unto all them|trust in princes|healeth the broken|number of the stars|glory of thy kingdom|majesty of his kingdom|everlasting kingdom|son of man/.test(lower)) {
    return note([
      `${phrase} praises the LORD as great, near, and faithful to the weak.`,
      "These psalms move from God's greatness to His tenderness. He rules creation, keeps truth, lifts the fallen, and heals the brokenhearted.",
      "👑 Great LORD\n🤲 Fallen upheld\n💧 Broken healed\n⭐ Creation numbered",
      "The phrase helps the reader see that God's greatness does not make Him distant.",
    ]);
  }
  if (/praise ye the lord from the heavens|praise him in the heights|sing unto the lord a new song|let every thing that hath breath|praise him with|kings of the earth|bind their kings/.test(lower)) {
    return note([
      `${phrase} calls all creation and every breath into praise.`,
      "The final psalms widen the choir until heavens, earth, people, instruments, and breath itself answer the LORD.",
      "🌌 Heavens praise\n🌍 Earth answers\n🎺 Instruments join\n💨 Breath worships",
      "The phrase helps a beginner feel the ending of Psalms: all life is summoned to praise the LORD.",
    ]);
  }
  if (/lord reigneth|earth rejoice|love the lord hate evil|exalt ye the lord|holy hill|clouds and darkness|righteousness and judgment|judah rejoiced|thy judgments|exalted far above all gods|all the people see his glory|graven images|idols/.test(lower)) {
    return note([
      `${phrase} teaches the reader to see the LORD as the holy King, not as one power among many.`,
      "His reign makes the earth rejoice, but it also calls evil what it is. Worship and holiness belong together.",
      "👑 King who reigns\n🌍 Earth that answers\n⚖️ Righteous throne\n🔥 Evil rejected",
      "The phrase keeps praise from becoming vague. The God being praised is holy, righteous, and ruling.",
    ]);
  }
  if (/joyful noise unto the lord|gates with thanksgiving|mercy is everlasting|behave myself wisely|perfect way|new song|right hand|holy arm|remembered his mercy|sing unto the lord|make a loud noise/.test(lower)) {
    return note([
      `${phrase} shows worship moving from the mouth into the whole life.`,
      "Thanksgiving belongs at the gate, and wise conduct belongs inside the house. The psalm connects public praise with daily obedience.",
      "🎶 Joyful praise\n🙏 Thankful entrance\n🧭 Wise conduct\n🕯️ Mercy remembered",
      "The phrase helps a beginner see that worship is not only a song. It trains the way a person walks.",
    ]);
  }
  if (/forgiveth all thine iniquities|east is from the west|merciful and gracious|bless the lord o my soul|redeemeth thy life|kingdom ruleth over all/.test(lower)) {
    return note([
      `${phrase} teaches the soul to remember the LORD's mercy personally.`,
      "Psalm 103 names forgiveness, healing, redemption, compassion, and patience so the reader does not reduce God to only rules or only feelings.",
      "🙏 Sin forgiven\n💧 Mercy near\n🌅 Distance from guilt\n👑 Life redeemed",
      "The phrase gives the reader a reason to bless the LORD from the inside, not only repeat praise on the outside.",
    ]);
  }
  if (/foundations of the earth|moon for seasons|sendest forth thy spirit|creatures|leviathan|renewest the face|honour and majesty|clothed with honour|who stretchest out the heavens|maketh the clouds|springs into the valleys/.test(lower)) {
    return note([
      `${phrase} places creation under the wisdom and care of the LORD.`,
      "The psalm looks at land, sea, animals, seasons, food, breath, and renewal. Everything depends on God more than it depends on itself.",
      "🌍 Earth established\n🌙 Seasons appointed\n🐟 Creatures supplied\n💨 Breath given",
      "The phrase helps the reader see creation as ordered, sustained, and alive before God.",
    ]);
  }
  if (/call upon his name|remember his marvellous works|holy promise|went out with joy|covenant|abraham|jacob|one kingdom to another people|works of the lord|declare the works/.test(lower)) {
    return note([
      `${phrase} calls God's people to remember the works He has already done.`,
      "Psalm 105 turns history into worship. Abraham, Joseph, Moses, Egypt, and the promised land are remembered because God's covenant did not fail.",
      "📜 Covenant remembered\n🧭 History retold\n🔥 Works made known\n🎶 Praise continues",
      "The phrase teaches that Bible memory is not trivia. It is how faith learns to trust God's promise again.",
    ]);
  }
  if (/we have sinned|nevertheless he regarded|affliction|remembered for them his covenant|redeemed of the lord|storm a calm|soon forgat|mingled among the heathen|sacrificed their sons|sacrificed their daughters|there was none to help|lovingkindness of the lord|give thanks unto the lord|mercy endureth|gather us from among the heathen|give thanks unto thy holy name/.test(lower)) {
    return note([
      `${phrase} holds Israel's failure beside the LORD's mercy.`,
      "These psalms do not hide rebellion, forgetfulness, or trouble. They show the LORD seeing affliction, remembering covenant mercy, and rescuing people who cry to Him.",
      "💧 Sin confessed\n📜 Covenant mercy\n🛡️ Rescue given\n🌊 Trouble calmed",
      "The phrase helps the reader understand mercy without pretending the failure was small.",
    ]);
  }
  if (/my heart is fixed|sit thou at my right hand|fear of the lord|beginning of wisdom|days be few|priest for ever|works of the lord are great|give us help from trouble|through god we shall do valiantly|judge among the heathen|right hand shall strike/.test(lower)) {
    return note([
      `${phrase} brings prayer, justice, Messiah, and wisdom into one field of vision.`,
      "Psalms 109-111 move through enemies, the king seated at God's right hand, priestly rule, and the fear of the LORD as true wisdom.",
      "🙏 Steady heart\n⚖️ Justice requested\n👑 Royal Messiah\n🕯️ Wisdom begins",
      "The phrase helps the reader see that worship includes hard prayers and holy hope, not only easy comfort.",
    ]);
  }
  if (/man that feareth the lord|raiseth up the poor|israel went out of egypt|tremble thou earth|not unto us|dead praise not|wealth and riches|trust in the lord|our god is in the heavens|house of israel trust|bless them that fear/.test(lower)) {
    return note([
      `${phrase} teaches reverence by showing who the LORD is and what idols cannot do.`,
      "The righteous fear the LORD, the poor are lifted, Israel is brought out of Egypt, and lifeless idols are exposed as powerless.",
      "🕯️ Holy fear\n🤲 Poor lifted\n🌊 Exodus remembered\n🪨 Idols exposed",
      "The phrase keeps worship centered on the living God, not on human pride or handmade substitutes.",
    ]);
  }
  if (/precious in the sight|praise the lord all ye nations|merciful kindness|mercy endureth|stone which the builders refused|day which the lord hath made/.test(lower)) {
    return note([
      `${phrase} shows the LORD's mercy reaching grief, nations, and rejected places.`,
      "Psalms 116-118 move from personal deliverance to worldwide praise and then to the rejected stone becoming central by God's doing.",
      "💧 Mercy endured\n🌍 Nations called\n🪨 Rejected stone\n☀️ Day made by God",
      "The phrase helps a beginner see that praise can rise from rescue, not just from easy circumstances.",
    ]);
  }
  if (/delight in thy statutes|thy word|thy testimonies|thy precepts|thy commandments|thy judgments|thy law|according to thy word|quicken me|be merciful unto me|i might not sin|vanity|iniquity have dominion|hiding place and my shield|all riches|before kings/.test(lower)) {
    return note([
      `${phrase} teaches the reader to treat God's word as a path for the whole life.`,
      "Psalm 119 is not only praising Scripture as an idea. It shows the heart learning, obeying, remembering, praying, and walking by what God has spoken.",
      "📜 Word treasured\n🧭 Path directed\n🙏 Prayer shaped\n🌱 Obedience practiced",
      "The phrase helps a beginner see Scripture as light for real choices, not just a religious object.",
    ]);
  }
  if (/i am for peace|lift up mine eyes|help cometh from the lord|preserve thee|pray for the peace of jerusalem|lift i up mine eyes|lying lips|deceitful tongue|brethren and companions|give thanks unto the name/.test(lower)) {
    return note([
      `${phrase} gives pilgrims simple words for dependence on the LORD.`,
      "The songs of ascent teach worshipers to look up, seek help, pray for peace, and trust the LORD's preserving care on the journey.",
      "⛰️ Eyes lifted\n🛡️ Help promised\n🏙️ Peace prayed for\n🙏 Dependence spoken",
      "The phrase helps the reader pray while walking, waiting, traveling, or feeling surrounded.",
    ]);
  }
  if (/if it had not been the lord|help is in the name|trust in the lord shall be as mount zion|turned again the captivity|sow in tears|reap in joy/.test(lower)) {
    return note([
      `${phrase} teaches rescue and restoration as the LORD's work from beginning to end.`,
      "These ascent psalms remember danger, protection, stability, captivity reversed, tears sown, and joy harvested by God's mercy.",
      "🛡️ Rescue remembered\n⛰️ Trust made steady\n🌱 Tears sown\n🎶 Joy restored",
      "The phrase helps a beginner name both sides of faith: what God saved them from and what God is bringing them into.",
    ]);
  }
  if (/god be merciful unto us|cause his face to shine|thy way may be known|saving health among all nations|people praise thee|nations be glad|earth yield her increase|judge the people righteously|govern the nations/.test(lower)) {
    return note([
      `${phrase} connects God's blessing with His purpose for the nations.`,
      "Psalm 67 does not treat blessing as something to hoard. Israel asks for mercy so the whole earth may know God's way.",
      "🌍 Nations included\n🙏 Mercy requested\n🎶 Praise multiplied\n🌾 Blessing bears fruit",
      "That helps readers see mission and worship together: God blesses so His name is known.",
    ]);
  }
  if (/righteous be glad|rejoice before god|exceedingly rejoice|sing unto god|extol him|rideth upon the heavens/.test(lower)) {
    return note([
      `${phrase} calls God's people to rejoice because the LORD is present and victorious.`,
      "Psalm 68 does not present praise as shallow excitement. The joy rises because God acts, leads, defends, and reigns.",
      "🎶 Praise rises\n👑 God is victorious\n🛡️ His people are helped\n🙏 Joy answers His works",
      "That helps a beginner see worship as a response to who God is and what He has done.",
    ]);
  }
  if (/let god arise|father of the fatherless|widows|ascended on high|daily loadeth us|chariots of god/.test(lower)) {
    return note([
      `${phrase} presents God as the victorious helper of the vulnerable.`,
      "Psalm 68 celebrates God's power, but that power is not cold. He defends the fatherless, cares for widows, and carries His people.",
      "👑 God arises\n🛡️ The weak are defended\n⛰️ Victory is celebrated\n🙏 Burdens are carried",
      "That helps a beginner see God's majesty and mercy standing together.",
    ]);
  }
  if (/waters are come|mire|zeal of thine house|gall for my meat|vinegar|reproach hath broken|poor and sorrowful/.test(lower)) {
    return note([
      `${phrase} gives language to suffering that is deep, public, and costly.`,
      "Psalm 69 speaks of sinking, shame, enemies, and zeal for God's house. The pain is not hidden from prayer.",
      "💧 Deep distress\n🔥 Zeal for God\n🍋 Bitter treatment\n🙏 The sufferer cries out",
      "That helps readers understand why this psalm becomes important for seeing righteous suffering.",
    ]);
  }
  if (/make haste|deliver me|old age|king thy judgments|dominion also from sea to sea|name shall endure/.test(lower)) {
    return note([
      `${phrase} moves from urgent help to the hope of righteous rule.`,
      "Psalms 70-72 bring personal need, aging weakness, and the longing for a king who judges with righteousness.",
      "🙏 Help needed now\n🕯️ Weakness admitted\n👑 Righteous king desired\n🌍 Rule reaches the nations",
      "That helps readers see prayer and kingdom hope meeting in the same worship life.",
    ]);
  }
  if (/god is good to israel|feet were almost gone|sanctuary of god|whom have i in heaven|strength of my heart|portion for ever/.test(lower)) {
    return note([
      `${phrase} teaches faith when life feels unfair and the wicked seem comfortable.`,
      "Psalm 73 does not pretend envy is impossible. It brings confusion into worship until God's presence changes the way the psalmist sees.",
      "⚖️ Life feels unfair\n🧭 Worship gives perspective\n💔 The heart is corrected\n👑 God becomes the portion",
      "That helps a beginner see worship as the place where distorted vision can be healed.",
    ]);
  }
  if (/see not our signs|divide the sea|works of the lord|thy way o god|give ear o my people|forgat his works|tempted god/.test(lower)) {
    return note([
      `${phrase} calls God's people to remember His works instead of drifting into unbelief.`,
      "Psalms 74, 77, and 78 hold pain, memory, and warning together. The past works of God teach the present generation how to trust.",
      "📜 Israel's memory\n🌊 God delivered before\n⚠️ Forgetfulness warned\n🙏 Faith is taught",
      "That helps readers see Bible memory as spiritual survival, not trivia.",
    ]);
  }
  if (/god is the judge|judah is god known|more glorious and excellent|give thanks|cup is in the lord's hand/.test(lower)) {
    return note([
      `${phrase} places human pride under God's judgment and glory.`,
      "Psalms 75 and 76 remind the reader that God lifts up, puts down, and is known by His power among His people.",
      "⚖️ God judges\n👑 God is known\n🛡️ Pride is humbled\n🎶 Thanks is given",
      "That helps readers understand judgment as part of God's public reign.",
    ]);
  }
  if (/turn us again|shepherd of israel|open thy mouth wide|sing aloud unto god|how long wilt thou be angry/.test(lower)) {
    return note([
      `${phrase} asks God to restore His people and teach them to listen again.`,
      "Psalms 79-81 move through judgment, restoration, worship, and the grief of not listening to God.",
      "💧 Judgment felt\n🙏 Restoration requested\n🎶 Worship called for\n👂 Listening matters",
      "That helps a beginner see restoration as returning to God, not merely escaping consequences.",
    ]);
  }
  if (/judge unjustly|defend the poor|fatherless|amiable are thy tabernacles|soul longeth|day in thy courts/.test(lower)) {
    return note([
      `${phrase} joins justice with longing for God's presence.`,
      "Psalms 82-84 show that worship is not separated from righteousness. God cares about unjust judgment and welcomes longing for His house.",
      "⚖️ Justice required\n🛡️ The weak defended\n🏠 God's house desired\n🙏 The heart longs",
      "That helps readers see God's presence as holy, beautiful, and morally serious.",
    ]);
  }
  if (/revive us again|mercy and truth are met|righteousness and peace|glorious things|springs are in thee/.test(lower)) {
    return note([
      `${phrase} points to revival, covenant beauty, and hope centered in Zion.`,
      "Psalms 85-87 pray for renewed life and speak of God's city as a place where blessing flows outward.",
      "🌱 Revival requested\n🤝 Mercy and truth meet\n🏙️ Zion remembered\n💧 Life springs from God",
      "That helps a beginner see restoration as both personal renewal and hope for God's people.",
    ]);
  }
  if (/soul is full of troubles|lover and friend|covenant with my chosen|dwelling place|number our days/.test(lower)) {
    return note([
      `${phrase} brings darkness, covenant hope, and human frailty before God.`,
      "Psalms 88-90 are not shallow. They include deep darkness, God's promise to David, and the prayer to live wisely under time's limits.",
      "🌑 Darkness named\n📜 Covenant remembered\n⏳ Days are numbered\n🙏 Wisdom is requested",
      "That helps readers see that faith can pray honestly even when the chapter feels heavy.",
    ]);
  }
  if (/secret place of the most high|angels charge|good thing to give thanks|lord reigneth|habitation of thy throne/.test(lower)) {
    return note([
      `${phrase} teaches refuge and worship under the reign of the LORD.`,
      "Psalms 91-93 move from protection to thanksgiving to the proclamation that the LORD reigns.",
      "🛡️ Refuge promised\n🎶 Thanks is good\n👑 The LORD reigns\n⚖️ His throne is righteous",
      "That helps readers rest in God's rule without treating refuge as a magic slogan.",
    ]);
  }
  if (/come let us sing|today if ye will hear|declare his glory|among the heathen|lord made the heavens|new song/.test(lower)) {
    return note([
      `${phrase} calls people to worship the LORD with listening hearts and public praise.`,
      "Psalms 95 and 96 join singing, warning, mission, and creation's joy before the LORD.",
      "🎶 Worship invited\n👂 Hearts must listen\n🌍 Glory declared\n👑 The Creator reigns",
      "That helps a beginner see worship as joyful obedience, not only music.",
    ]);
  }
  if (/give ear to the words of my mouth|hear my prayer|give ear to my prayer/.test(lower)) {
    return note([
      `${phrase} asks God to listen closely to urgent prayer.`,
      "The psalmist is not giving a performance. He is bringing words, fear, and need before the God who can save.",
      "🙏 Prayer spoken\n👂 God asked to hear\n🛡️ Help needed\n🕯️ Trust stays open",
      "That helps a beginner see prayer as honest dependence, not polished religious speech.",
    ]);
  }
  if (/boastest thou thyself|goodness of god endureth|green olive tree|trusted in the abundance|deceitful tongue/.test(lower)) {
    return note([
      `${phrase} contrasts proud evil with the steady goodness of God.`,
      "The psalm exposes the person who trusts in harm, lies, and power, then answers with trust in God's mercy.",
      "🌿 Faithful endurance\n⚠️ Boasting exposed\n🕊️ Mercy trusted\n👑 God's goodness lasts",
      "That helps readers see why the faithful do not need to copy the methods of the wicked.",
    ]);
  }
  if (/save me o god by thy name|god is mine helper|strangers are risen|oppressors seek after my soul/.test(lower)) {
    return note([
      `${phrase} asks God to sustain the faithful when enemies rise up.`,
      "Psalm 54 is short, but it is direct: the threatened worshiper looks to God's name, help, and truth.",
      "🛡️ Rescue requested\n🙏 God's name trusted\n⚖️ Enemies answered\n🎶 Praise follows help",
      "That helps a beginner see prayer as bringing real danger to the God who can uphold the soul.",
    ]);
  }
  if (/give ear to my prayer|cast thy burden|wings like a dove|friend|companion|violence and strife|evening and morning/.test(lower)) {
    return note([
      `${phrase} gives words for fear, betrayal, and the weight of trouble.`,
      "Psalm 55 does not minimize pain. It brings turmoil, betrayal, and burden-bearing into prayer before the LORD.",
      "💧 Betrayal hurts\n🙏 Prayer keeps speaking\n🕊️ Escape is desired\n🛡️ The LORD sustains",
      "That helps readers understand that God invites honest prayer when the heart feels overloaded.",
    ]);
  }
  if (/what time i am afraid|tears into thy bottle|be merciful unto me|heart is fixed|awake up my glory/.test(lower)) {
    return note([
      `${phrase} turns fear and tears into trust before God.`,
      "Psalms 56 and 57 show faith speaking while danger is still active, not after all pressure disappears.",
      "💧 Tears remembered\n🛡️ Fear answered by trust\n🕊️ Mercy requested\n🎶 Praise rises",
      "That helps a beginner see courage as trust in God's mercy, not pretending fear is gone.",
    ]);
  }
  if (/speak righteousness|righteous shall rejoice|deliver me from mine enemies|sing of thy power|scatter them|defend me/.test(lower)) {
    return note([
      `${phrase} asks God to judge evil and defend the righteous.`,
      "These psalms are not embarrassed by justice. They bring violent, lying, and oppressive enemies before the God who rules rightly.",
      "⚖️ Justice requested\n🛡️ Protection needed\n👑 God rules evil\n🎶 Deliverance becomes praise",
      "That helps readers see judgment as part of God's care for a world damaged by wickedness.",
    ]);
  }
  if (/give us help from trouble|through god we shall do valiantly|rock that is higher|heart is overwhelmed|strong tower/.test(lower)) {
    return note([
      `${phrase} reaches for God as help when human strength is not enough.`,
      "Psalms 60 and 61 move from defeat or overwhelm toward the LORD as the higher rock and sure help.",
      "🪨 Higher refuge\n🙏 Help requested\n⚔️ Human strength limited\n👑 God gives victory",
      "That helps a beginner see weakness as the place where prayer looks upward.",
    ]);
  }
  if (/soul waiteth upon god|rock and my salvation|trust in him at all times|pour out your heart|lovingkindness is better than life|my soul thirsteth/.test(lower)) {
    return note([
      `${phrase} teaches the soul to rest and thirst for God Himself.`,
      "Psalms 62 and 63 are not merely asking for gifts. They speak of God as rock, salvation, refuge, and better than life.",
      "🪨 God is steady\n💧 The soul thirsts\n🙏 The heart pours out\n🕊️ Trust rests in Him",
      "That helps readers see devotion as wanting God, not only wanting relief.",
    ]);
  }
  if (/hear my voice|evil matter|praise waiteth|visitest the earth|joyful noise|come and hear|what he hath done for my soul/.test(lower)) {
    return note([
      `${phrase} moves from protection into praise for what God has done.`,
      "Psalms 64-66 bring hidden schemes, answered prayer, creation's blessing, and public testimony under God's praise.",
      "🛡️ Hidden danger exposed\n🌾 Creation blessed\n🎶 Praise invited\n🙏 Testimony shared",
      "That helps a beginner see praise as remembering God's protection and telling others what He has done.",
    ]);
  }
  if (/fret not|trust in the lord|delight thyself|commit thy way|rest in the lord|wait patiently|steps of a good man|young and now am old|law of his god/.test(lower)) {
    return note([
      `${phrase} teaches patient faith when wickedness seems to be winning.`,
      "Psalm 37 does not tell the reader to ignore evil. It teaches the righteous to trust, wait, do good, and let the LORD judge the final outcome.",
      "🕰️ Waiting faith\n🌱 Steady obedience\n⚖️ Wickedness will not last\n🙏 The LORD orders the path",
      "That helps a beginner see patience as active trust, not passive resignation.",
    ]);
  }
  if (/make me to know mine end|opened not my mouth|stranger with thee|frailty|handbreadth|vanity/.test(lower)) {
    return note([
      `${phrase} faces the shortness of life without pretending people are stronger than they are.`,
      "Psalm 39 turns human frailty into prayer, asking God for wisdom before life passes like a shadow.",
      "⏳ Life is brief\n🕯️ Frailty is admitted\n🙏 Prayer asks for wisdom\n👑 Hope stays with God",
      "That helps readers think soberly about time without falling into despair.",
    ]);
  }
  if (/waited patiently|horrible pit|miry clay|new song|sacrifice and offering|lo i come|delight to do thy will/.test(lower)) {
    return note([
      `${phrase} shows rescue becoming obedience and praise.`,
      "Psalm 40 moves from being lifted out of the pit to offering God a willing heart, not empty religious performance.",
      "🕳️ Rescue from the pit\n🎶 A new song\n📜 God's will embraced\n🙏 Obedience from the heart",
      "That helps a beginner see that deliverance is meant to form worship and surrender.",
    ]);
  }
  if (/hart panteth|cast down o my soul|hope thou in god|deep calleth unto deep|send out thy light|thy truth/.test(lower)) {
    return note([
      `${phrase} gives words for spiritual thirst, discouragement, and renewed hope.`,
      "Psalms 42 and 43 do not shame a downcast soul. They teach the soul to speak honestly and hope again in God.",
      "💧 Thirst for God\n🌊 Deep sorrow\n🕯️ Hope preached to the soul\n🙏 God's light requested",
      "That helps readers see faith as a conversation with God and with the troubled heart.",
    ]);
  }
  if (/my heart is inditing|king|fairer than|throne o god|queen|daughter/.test(lower)) {
    return note([
      `${phrase} belongs to royal praise that lifts the reader's eyes to the beauty and rule of the king.`,
      "Psalm 45 uses wedding and kingdom language to celebrate majesty, righteousness, and covenant joy.",
      "👑 Royal beauty\n📜 Righteous rule\n🎶 Praise overflowing\n💍 Covenant joy",
      "That helps a beginner read the psalm as worshipful royal poetry, not a random love song.",
    ]);
  }
  if (/god is our refuge|be still|lord of hosts is with us|gone up with a shout|great is the lord|lovingkindness/.test(lower)) {
    return note([
      `${phrase} anchors safety and worship in God's reign over the whole earth.`,
      "Psalms 46-48 answer fear with the presence, rule, and praise of God.",
      "🏰 God is refuge\n👑 God reigns\n🌍 Nations are under Him\n🎶 Praise fills the city",
      "That helps readers see refuge as confidence in God's nearness and kingship.",
    ]);
  }
  if (/redeem his brother|riches|honour|like the beasts|understandeth not|mouth of the righteous/.test(lower)) {
    return note([
      `${phrase} warns that wealth and status cannot rescue a person from death or judgment.`,
      "Psalm 49 strips away false confidence so the reader does not mistake money, honor, or public success for salvation.",
      "💰 Wealth has limits\n⚰️ Death humbles all\n🧭 Wisdom is needed\n👑 God alone redeems",
      "That helps a beginner see why the Bible refuses to worship success.",
    ]);
  }
  if (/call upon me|day of trouble|offer unto god thanksgiving|broken spirit|have mercy upon me|wash me|against thee|create in me|restore unto me/.test(lower)) {
    return note([
      `${phrase} brings trouble, worship, or sin into honest speech before God.`,
      "Psalms 50 and 51 expose empty religion and then show true repentance: mercy asked for, sin confessed, and a clean heart desired.",
      "💧 Sin confessed\n🙏 Mercy requested\n🕊️ Clean heart desired\n🎶 True worship restored",
      "That helps readers see repentance as returning honestly to God, not hiding behind religious words.",
    ]);
  }
  if (/our fathers trusted|thou didst deliver|he trusted on the lord|from my mother's belly|thou art my god/.test(lower)) {
    return note([
      `${phrase} remembers earlier trust while the present moment still feels painful.`,
      "The psalmist looks back at God's faithfulness and at his own life with God, even while asking why help feels far away now.",
      "🧠 Past deliverance remembered\n🙏 Present pain prayed\n🕯️ Trust keeps speaking\n👑 The LORD is still God",
      "That helps readers see faith wrestling honestly without cutting itself off from memory.",
    ]);
  }
  if (/be not far|none to help|bulls|bashan|gaped upon me|poured out like water|bones are out|heart is like wax|strength is dried|tongue cleaveth/.test(lower)) {
    return note([
      `${phrase} describes suffering as surrounding pressure that the sufferer cannot escape alone.`,
      "Psalm 22 stacks images of weakness, danger, and bodily collapse so the reader feels the desperation of the prayer.",
      "💧 Weakness exposed\n🛡️ Enemies surround\n🙏 Help is needed\n🕯️ The prayer keeps reaching",
      "That helps a beginner understand the psalm as lived agony before God, not a calm religious speech.",
    ]);
  }
  if (/my god my god|forsaken me|pierced my hands|part my garments|cast lots|laugh me to scorn|deliver my soul/.test(lower)) {
    return note([
      `${phrase} gives language to deep suffering while the prayer is still directed to God.`,
      "Psalm 22 is not vague sadness. It names abandonment, mockery, weakness, and enemies, yet keeps crying toward the LORD.",
      "💧 Suffering named\n🙏 God still addressed\n🕯️ Hope fights through pain\n👑 The LORD hears",
      "That helps a beginner see why this psalm becomes so important for understanding the suffering of Christ.",
    ]);
  }
  if (/lord is my shepherd|green pastures|still waters|restoreth my soul|valley of the shadow|preparest a table|goodness and mercy/.test(lower)) {
    return note([
      `${phrase} shows the LORD caring for His people like a shepherd who stays near.`,
      "Psalm 23 is not only peaceful scenery. It teaches guidance, provision, courage, and fellowship with God even near death.",
      "🐑 Shepherd care\n🌿 Provision\n🛡️ Courage in danger\n🏠 Life with the LORD",
      "That helps readers see comfort as trust in the LORD's presence, not the absence of hard valleys.",
    ]);
  }
  if (/earth is the lord's|ascend into the hill|clean hands|pure heart|king of glory|lift up your heads/.test(lower)) {
    return note([
      `${phrase} presents the LORD as Creator, holy King, and the One worthy to enter in glory.`,
      "Psalm 24 joins creation, holiness, and kingship so worshipers understand who they are approaching.",
      "🌍 The earth belongs to God\n🕊️ Holiness matters\n👑 The King enters\n🙏 Worship opens the gates",
      "That helps a beginner see worship as coming before the holy King, not simply having a religious feeling.",
    ]);
  }
  if (/shew me thy ways|teach me thy paths|sins of my youth|mine eyes are ever|secret of the lord|wait on thee/.test(lower)) {
    return note([
      `${phrase} asks the LORD for guidance, mercy, and covenant instruction.`,
      "Psalm 25 speaks like someone who knows he needs direction and forgiveness at the same time.",
      "🧭 Guidance requested\n💧 Mercy needed\n📜 The LORD teaches\n🙏 Trust keeps waiting",
      "That helps readers understand that guidance is not only about decisions. It is about walking humbly with God.",
    ]);
  }
  if (/lord is my light|one thing have i desired|beauty of the lord|wait on the lord|be of good courage/.test(lower)) {
    return note([
      `${phrase} turns fear into focused desire for the LORD Himself.`,
      "Psalm 27 has enemies and danger, but its center is not panic. Its center is seeking the LORD's face and waiting for Him.",
      "🕯️ The LORD gives light\n🏠 Presence is desired\n🛡️ Courage is strengthened\n🙏 Waiting becomes faith",
      "That helps a beginner see courage as worshipful dependence, not self-confidence.",
    ]);
  }
  if (/strength and my shield|voice of my supplications|weeping may endure|joy cometh|turned for me my mourning/.test(lower)) {
    return note([
      `${phrase} shows prayer moving from need into praise because the LORD helps His people.`,
      "These psalms are honest about crying, danger, and sorrow, but they also remember that God can turn mourning into joy.",
      "🙏 Prayer rises\n🛡️ Help is received\n💧 Sorrow is named\n☀️ Joy returns",
      "That helps readers see praise as the answer to mercy, not a denial of grief.",
    ]);
  }
  if (/into thine hand i commit my spirit|be of good courage|transgression is forgiven|acknowledged my sin|covered my sin|hiding place/.test(lower)) {
    return note([
      `${phrase} brings either trust or confession directly before the LORD.`,
      "Psalms 31 and 32 teach two kinds of honest speech: entrusting yourself to God and confessing sin without hiding.",
      "🤲 Trust surrendered\n💧 Sin confessed\n🛡️ God becomes hiding place\n🕯️ Courage grows",
      "That helps a beginner see that safety with God includes both dependence and repentance.",
    ]);
  }
  if (/lord looketh from heaven|word of the lord is right|taste and see|angel of the lord|righteous cry|fountain of life|wicked borroweth|mercy o lord/.test(lower)) {
    return note([
      `${phrase} teaches the reader to measure life by the LORD's goodness, sight, and faithful care.`,
      "These psalms contrast human pride and trouble with the God who sees, hears, shelters, and gives life.",
      "👑 The LORD sees\n🛡️ The LORD shelters\n🎶 Praise remembers\n🌊 Life comes from Him",
      "That helps readers understand goodness as something tasted in trusting the LORD, not merely defined from a distance.",
    ]);
  }
  if (/put my trust|save me from all them|tear my soul like a lion|rending it in pieces/.test(lower)) {
    return note([
      `${phrase} turns danger into direct prayer instead of private panic.`,
      "The psalmist is not describing mild annoyance. He feels hunted, exposed, and in need of rescue only the LORD can give.",
      "🛡️ Real danger\n🙏 Trust spoken aloud\n🦁 Enemy pressure\n👑 The LORD can save",
      "That helps a beginner see trust as something prayed while fear is still present.",
    ]);
  }
  if (/according to my righteousness|mine integrity|hearts and reins|rewarded evil|wickedness of the wicked/.test(lower)) {
    return note([
      `${phrase} brings integrity and hidden motives before God's judgment.`,
      "The psalmist is asking the LORD to examine the case honestly, including what people cannot see from the outside.",
      "⚖️ Integrity tested\n🕯️ Motives searched\n👑 God judges rightly\n🙏 Prayer asks for truth",
      "That matters because biblical justice is not only about public appearance. The LORD weighs the heart.",
    ]);
  }
  if (/pit|ditch|mischief shall return|violent dealing|whet his sword|bent his bow/.test(lower)) {
    return note([
      `${phrase} shows evil turning back on the person who planned it.`,
      "The psalm does not treat wickedness as clever forever. Sin digs, bends, aims, and schemes, but God can make it collapse on itself.",
      "🕳️ Trap imagery\n⚖️ Reversal of evil\n👑 God sees the scheme\n🛡️ The righteous can pray",
      "That helps readers understand why the psalms can ask God for judgment without pretending revenge belongs to us.",
    ]);
  }
  if (/praise the lord|sing praise|excellent is thy name|whole heart|marvellous works/.test(lower)) {
    return note([
      `${phrase} turns God's help into remembered praise.`,
      "The psalmist does not only ask for rescue. He also names the LORD's works so worship can answer what God has done.",
      "🎶 Praise spoken\n🧠 Works remembered\n👑 God's name honored\n🙏 The heart responds",
      "That helps a beginner see praise as testimony, not just religious decoration.",
    ]);
  }
  if (/what is man|mouth of babes|son of man|dominion over/.test(lower)) {
    return note([
      `${phrase} slows the reader down before the mystery of human smallness and human honor.`,
      "Psalm 8 looks at the greatness of the heavens, then wonders that God still cares for mankind.",
      "🌙 Human smallness\n👑 God-given honor\n🌍 Creation under care\n🙏 Wonder becomes praise",
      "That matters because the psalm teaches humility without making human life meaningless.",
    ]);
  }
  if (/lord shall judge|wicked shall be turned|lord is king|refuge for the oppressed|arise o lord/.test(lower)) {
    return note([
      `${phrase} places injustice under the rule of the LORD.`,
      "The psalms do not pretend evil is harmless. They bring evil before the Judge who sees, remembers, and acts rightly.",
      "⚖️ Evil is weighed\n👑 The LORD reigns\n🛡️ The oppressed have refuge\n🙏 Prayer asks God to act",
      "That helps readers understand judgment as hope for those who are being crushed by wickedness.",
    ]);
  }
  if (/how long wilt thou forget|help lord|godly man ceaseth|fool hath said|there is no god/.test(lower)) {
    return note([
      `${phrase} gives words for a world where faithfulness seems weak and evil seems loud.`,
      "The psalmist is not writing from comfort only. He is praying from pressure, confusion, and grief.",
      "💧 Trouble named\n🛡️ Evil exposed\n🙏 Prayer continues\n🕯️ Hope refuses to quit",
      "That helps a beginner see lament as faithful speech, not spiritual failure.",
    ]);
  }
  if (/preserve me|portion of mine inheritance|not leave my soul|apple of the eye|my rock and my fortress/.test(lower)) {
    return note([
      `${phrase} teaches refuge by naming the LORD as the safe place of the worshiper.`,
      "These psalms keep returning to God as portion, shield, rock, fortress, and keeper.",
      "🛡️ Protection sought\n👑 The LORD is enough\n🌙 Trust in danger\n🙏 Prayer rests in Him",
      "That helps readers see that refuge is not mainly a place. It is the LORD Himself.",
    ]);
  }
  if (/some trust in chariots|king shall joy|strength o lord|anointed|holy hill/.test(lower)) {
    return note([
      `${phrase} connects royal victory to the LORD's strength rather than human power.`,
      "The king is not meant to be independent from God. His joy, rescue, and triumph come from the LORD.",
      "👑 The king depends\n🛡️ God saves\n⚔️ Human strength is limited\n🙏 Praise follows victory",
      "That helps a beginner read the royal psalms as worship, not just national pride.",
    ]);
  }
  if (/blessed is the man/.test(lower)) {
    return note([
      `${phrase} opens the Psalms by describing the life God calls truly blessed.`,
      "Blessing here is not luck. It is the settled good of walking in God's way instead of being shaped by wicked counsel.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see that Psalms begins with a choice of paths.",
    ]);
  }
  if (/delight is in the law of the lord|tree planted/.test(lower)) {
    return note([
      `${phrase} shows that the blessed life is rooted in God's instruction.`,
      "The picture is slow and living: roots by water, fruit in season, and a life that does not dry up when pressure comes.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps a beginner connect meditation on God's word with a life that grows over time.",
    ]);
  }
  if (/why do the heathen rage|set my king|thou art my son|kiss the son/.test(lower)) {
    return note([
      `${phrase} belongs to Psalm 2's picture of nations resisting the LORD's appointed King.`,
      "The psalm does not panic over rebellion. It shows God ruling above it and calling people to submit with wisdom.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers understand why Psalm 2 became so important for reading the Messiah and God's kingdom.",
    ]);
  }
  if (/shield for me|laid me down and slept|salvation belongeth unto the lord/.test(lower)) {
    return note([
      `${phrase} turns danger into trust before the LORD.`,
      "David is surrounded by trouble, yet he speaks as someone guarded by God, not controlled by fear.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see faith praying in the middle of pressure, not only after pressure is gone.",
    ]);
  }
  if (/commune with your own heart|lay me down in peace|put gladness in my heart/.test(lower)) {
    return note([
      `${phrase} teaches quiet trust when the day is ending and the heart is still stirred up.`,
      "Psalm 4 does not deny distress. It brings distress into prayer until peace becomes possible.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps a beginner see that biblical peace is not pretending; it is resting under God's care.",
    ]);
  }
  if (/give ear to my words|lead me o lord|trust in thee rejoice/.test(lower)) {
    return note([
      `${phrase} shows prayer asking God for attention, guidance, and refuge.`,
      "Psalm 5 is morning prayer shaped by God's holiness and by the danger of wickedness around the worshiper.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers hear prayer as dependence: God must lead, protect, and make the way straight.",
    ]);
  }
  if (/rebuke me not|heal me|voice of my weeping|depart from me/.test(lower)) {
    return note([
      `${phrase} gives a suffering person words to bring weakness before God.`,
      "Psalm 6 is honest about fear, pain, tears, and the need for mercy.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see that lament is not faithlessness. It is pain turning toward the LORD.",
    ]);
  }

  const kind = category("Psalms", phrase);
  const openings: Record<string, string> = {
    psalmGod: `${phrase} directs the reader's attention to the LORD's rule and character.`,
    psalmWisdom: `${phrase} helps explain the wise path this psalm sets before the reader.`,
    psalmConflict: `${phrase} names real opposition without making trouble the final word.`,
    psalmPrayer: `${phrase} gives prayer language for need, fear, trust, or joy.`,
    psalmDetail: `${phrase} carries one concrete movement in the psalm's worship language.`,
  };
  const second: Record<string, string> = {
    psalmGod: "The psalm teaches readers to measure life from God's throne, not from the noise of circumstances.",
    psalmWisdom: "The wording contrasts a life rooted in God with a life carried along by wickedness.",
    psalmConflict: "The psalm is honest about enemies, rebellion, and distress while still looking to the LORD.",
    psalmPrayer: "The phrase matters because Psalms teaches people how to bring the whole heart before God.",
    psalmDetail: "The line may be brief, but it helps the reader follow the psalm's movement from trouble toward trust.",
  };
  const closing: Record<string, string> = {
    psalmGod: "That matters because the psalm teaches worship before it teaches technique.",
    psalmWisdom: "That helps a beginner see the Psalms as a guide for the whole life, not only private emotion.",
    psalmConflict: "That keeps the reader from thinking faith means there is no pressure, no enemies, and no fear.",
    psalmPrayer: "That helps readers learn how to pray with their actual heart in front of God.",
    psalmDetail: "That small line helps the reader stay inside the song instead of jumping to a broad topic.",
  };

  return note([openings[kind], second[kind], bullets("Psalms", phrase).join("\n"), closing[kind]]);
}

function explain(book: BookName, phrase: string) {
  if (book === "Job") return explainJob(phrase);
  if (book === "Proverbs") return explainProverbs(phrase);
  if (book === "Ecclesiastes") return explainEcclesiastes(phrase);
  if (book === "Song of Solomon") return explainSong(phrase);
  if (book === "Isaiah") return explainIsaiah(phrase);
  if (book === "Jeremiah") return explainJeremiah(phrase);
  return explainPsalm(phrase);
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 5) {
    chunks.push(verses.slice(index, index + 5));
  }
  if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) {
    const last = chunks.pop()!;
    const previous = chunks.pop()!;
    const keep = Math.max(3, previous.length - last.length);
    chunks.push(previous.slice(0, keep));
    chunks.push([...previous.slice(keep), ...last]);
  }
  return chunks;
}

function isNearDuplicate(phrase: string, selected: string[]) {
  const lower = phrase.toLowerCase();
  return selected.some((item) => {
    const other = item.toLowerCase();
    return lower.includes(other) || other.includes(lower);
  });
}

function cleanFallbackWindow(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/\b(and if|why then should i|that i should|but the way|and in his law)\b/.test(lower) && !/^(why|but)\b/.test(lower)) return false;
  if (/^(eyes|heart|way|law|righteous|wicked|almighty|lord|god)\b/i.test(phrase) && wordCount(phrase) > 6) return false;
  return true;
}

function selectPhrases(book: BookName, chunk: ApiVerse[]) {
  const sets = chunk.map(candidateSetsFromVerse);
  const clausePool = [...new Set(sets.flatMap((set) => set.clauses))].sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const windowPool = [...new Set(sets.flatMap((set) => set.windows).filter(cleanFallbackWindow))].sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const selected: string[] = [];

  for (const phrase of clausePool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 6) return selected;
  }

  if (selected.length >= 4) return selected;

  for (const phrase of windowPool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 6) return selected;
  }

  return selected;
}

function makeSection(book: BookName, chapter: number, chunk: ApiVerse[], sectionIndex: number): Section | null {
  const phrases = selectPhrases(book, chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk[chunk.length - 1].verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  const title = phrases[0];
  const icon = sectionIcons[(chapter + startVerse + sectionIndex) % sectionIcons.length];
  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title,
    icon,
    phrases: phrases.map((phrase) => [`${phraseIcon(book, phrase)} ${phrase}`, explain(book, phrase)]),
  };
}

async function getChapter(book: BookName, chapter: number) {
  const apiBook = book === "Psalms" ? "Psalm" : book;
  const url = `https://bible-api.com/${encodeURIComponent(`${apiBook} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/^\[\n/, "")
    .replace(/\n\]$/, "")
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^/gm, "  ")
    .trimStart();
}

async function buildBook(book: BookName, chapters: number[]) {
  const sections: Section[] = [];
  for (const chapter of chapters) {
    const apiChapter = await getChapter(book, chapter);
    chunkVerses(apiChapter.verses).forEach((chunk, index) => {
      const section = makeSection(book, chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  return sections;
}

async function main() {
  const isaiahSections = await buildBook("Isaiah", isaiahChapters);
  const jeremiahSections = await buildBook("Jeremiah", jeremiahChapters);

  writeFileSync(
    "lib/isaiahSixteenToSixtySixPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type IsaiahPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Isaiah" };

export const ISAIAH_16_66_PERSONAL_SECTIONS = [
${serialize(isaiahSections)}
] as const satisfies readonly IsaiahPhraseSectionInput[];
`,
  );

  writeFileSync(
    "lib/jeremiahOneToNinePersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type JeremiahPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Jeremiah" };

export const JEREMIAH_1_9_PERSONAL_SECTIONS = [
${serialize(jeremiahSections)}
] as const satisfies readonly JeremiahPhraseSectionInput[];
`,
  );

  console.log(`Wrote ${isaiahSections.length} Isaiah sections.`);
  console.log(`Wrote ${jeremiahSections.length} Jeremiah sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
