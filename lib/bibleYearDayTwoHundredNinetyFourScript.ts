import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 294, written to the Day 1 standard.
 *
 * Luke opens his Gospel like a historian, then hands the story to two women
 * nobody in power was watching: an old, barren priest's wife and a poor
 * teenage girl in a town nobody respected. Both get visited by the same
 * angel. Both end up pregnant with impossible children. Chapter 3 closes
 * the day by tracing Jesus' human line all the way back past Abraham to
 * Adam, "which was the son of God" - so the last block runs shorter,
 * two- and three-line teaching, the way Day 14 handled a genealogy.
 * Seven blocks across Luke 1, 2, and 3.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 294,
  title: "Births, Promise, and Preparation",
  opening: [
    ["Hey. Good to have you back for this one.", 750],
    ["Day 294. We start a new Gospel today.", 700],
    ["An old priest gets struck silent for not believing an angel. A teenage girl gets the same angel and simply says yes.", 850],
    ["Nine months later, two impossible babies. One will announce the Messiah. One will be Him.", 850],
    ["Luke writes like a historian checking his sources, then tells the most tender birth story in the Bible.", 800],
    ["We are in Luke 1, 2, and 3. Two annunciations, two births, a boy in the temple, and a baptism.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 25, [
      "Luke opens by telling Theophilus exactly what he is doing: writing an orderly account, having traced everything carefully from the beginning. This Gospel wants to be checked, not just believed.",
      "Then he drops straight into the temple. Zacharias, a priest, is burning incense when an angel appears and tells him his old, barren wife Elisabeth will bear a son, and he is to name him John.",
      "Zacharias asks for proof. Whereby shall I know this? For I am an old man. Fair question, wrong angel to ask it of. Gabriel answers, I am Gabriel, that stand in the presence of God, and because you did not believe, you will not speak again until it happens.",
      "Elisabeth conceives and hides herself five months, saying the Lord has taken away her reproach. In one culture, in one woman's body, shame turns into the start of something enormous.",
    ]),
    g(1, 26, 38, [
      "Six months later, the same angel goes to Nazareth, to a virgin named Mary, engaged to a man named Joseph. Hail, thou that art highly favoured, the Lord is with thee.",
      "Gabriel tells her she will conceive and bear a son named Jesus, who will be called the Son of the Highest, and will reign forever on David's throne. Mary asks a practical question, not a doubting one. How shall this be, seeing I know not a man?",
      "The answer is the Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee. Not biology as anyone understood it. God doing something new inside an ordinary girl's body.",
      "And Mary's answer is the whole chapter in one line. Behold the handmaid of the Lord. Be it unto me according to thy word. Zacharias argued with the angel. Mary just agrees.",
    ]),
    g(1, 39, 56, [
      "Mary goes in haste to see Elisabeth, and the moment she says hello, the baby in Elisabeth's womb leaps, and Elisabeth is filled with the Holy Ghost. Blessed art thou among women, and blessed is the fruit of thy womb.",
      "Elisabeth, older, more established, more respected, says whence is this to me, that the mother of my Lord should come to me. She does not compete with the younger woman's news. She just recognizes it.",
      "Then Mary sings. My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour. For he hath regarded the low estate of his handmaiden. A poor, unknown girl says all generations will call her blessed, and she is right.",
      "He hath put down the mighty from their seats, and exalted them of low degree. He hath filled the hungry with good things, and the rich he hath sent empty away. Before Jesus says a single word, his mother is already describing the world he is going to turn upside down.",
    ]),
    g(1, 57, 80, [
      "Elisabeth's son is born, and on the eighth day the family wants to name him after his father. Elisabeth says no, he shall be called John. They check with Zacharias, who writes it down, since he still cannot speak. His name is John.",
      "The instant he writes it, his mouth opens and his tongue is loosed, and he speaks, praising God. Nine months of silence ends the moment he finally does what the angel told him to.",
      "Then Zacharias prophesies. Blessed be the Lord God of Israel, for he hath visited and redeemed his people. He is not just celebrating his own son. He sees this baby as the front edge of something God is doing for the whole nation.",
      "And to that baby directly: thou, child, shalt be called the prophet of the Highest, to give knowledge of salvation unto his people, to guide our feet into the way of peace. The chapter ends simply. The child grew, and was in the deserts till the day of his shewing unto Israel.",
    ]),
    g(2, 1, 20, [
      "Caesar Augustus issues a tax decree that moves an entire empire, and it lands Joseph and Mary, great with child, on the road to Bethlehem, the city of David, because that is where Joseph's family is from. Rome thinks it is counting people for money. God is fulfilling a promise made centuries earlier about where the Messiah would be born.",
      "She brings forth her firstborn son, wraps him in swaddling clothes, and lays him in a manger, because there is no room for them in the inn. The Son of God's first bed is a feeding trough, because a small town was full that week.",
      "Out in a field, shepherds keeping watch by night get the announcement first. Not priests. Not rulers. Shepherds. Fear not, for behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day a Saviour, which is Christ the Lord.",
      "Then a whole multitude of the heavenly host appears, praising God. Glory to God in the highest, and on earth peace, good will toward men. The shepherds go with haste, find exactly what they were told they would find, and go back glorifying and praising God for everything they had heard and seen.",
    ]),
    g(2, 21, 52, [
      "At eight days old the child is circumcised and named Jesus, exactly what the angel said before he was conceived. His parents bring him to Jerusalem for the required offering, and because they are poor, it is two turtledoves instead of a lamb.",
      "An old man named Simeon, promised by the Holy Ghost that he would not die before seeing the Lord's Christ, takes the baby in his arms and blesses God. Lord, now lettest thou thy servant depart in peace, for mine eyes have seen thy salvation. Then he tells Mary directly that a sword will pierce through her own soul too.",
      "Anna, a prophetess who has served in the temple for decades as a widow, comes in at that same moment and speaks of him to everyone waiting for redemption. Two elderly people, at the end of their own long waiting, are the first to publicly recognize who this child is.",
      "Twelve years later the family loses Jesus for three days, only to find him in the temple, sitting among the teachers, listening and asking questions, everyone astonished at his understanding. How is it that ye sought me? Wist ye not that I must be about my Father's business? Then he goes home and is subject to them, and Mary keeps all these things in her heart.",
    ]),
    g(3, 1, 38, [
      "Luke dates this precisely by name: Tiberius Caesar, Pontius Pilate, Herod, Annas and Caiaphas. Into that exact political moment, the word of God comes to John in the wilderness, and he preaches a baptism of repentance for the remission of sins.",
      "John does not soften it for anyone. O generation of vipers, who hath warned you to flee from the wrath to come? Bring forth fruits worthy of repentance, and do not lean on being Abraham's children as a safety net. When soldiers and tax collectors ask what to do, he gives them something concrete: stop extorting people, be content with your wages.",
      "Then Jesus himself comes to be baptized. As he prays, the heaven opens, the Holy Ghost descends like a dove, and a voice says, thou art my beloved Son, in thee I am well pleased. The one John said he was not worthy to untie the shoes of steps into the water anyway.",
      "The chapter closes with Jesus' genealogy, running backward through Joseph, through David, through Abraham, all the way to which was the son of Adam, which was the son of God. Luke's Gospel has spent two chapters showing you a baby in a feeding trough. This is him telling you exactly whose family that baby actually belongs to.",
    ]),
  ],
  closing: [
    ["So that is Day 294.", 700],
    ["An old man struck silent for doubting, and a young girl who simply said yes.", 750],
    ["Two women, one old and settled, one young and unmarried, carrying two impossible children in the same six months.", 800],
    ["A king counting his empire for taxes, and God using that count to put a baby exactly where the prophets said he would be born.", 850],
    ["Shepherds got the first announcement. Not priests. Not Caesar. Shepherds, in a field, at night.", 850],
    ["And by the end of chapter 3, a voice from heaven and a genealogy both say the same thing about who this child is.", 850],
    ["Tomorrow, Luke 4 through 6. Jesus starts teaching, and the kingdom he preaches does not look like anyone expected.", 850],
    ["For now, sit with Mary's line.", 750],
    ["Be it unto me according to thy word.", 800],
    ["Said before she knew what any of it would cost her.", 1200],
  ],
};
