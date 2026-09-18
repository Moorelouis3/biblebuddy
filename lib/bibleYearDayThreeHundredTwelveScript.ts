import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 312, written to the Day 1 standard.
 *
 * Acts 10-12: Cornelius and Peter's paired visions, the gospel crossing to
 * the Gentiles, the Jerusalem church accepting it, Antioch and the name
 * "Christians," and Peter's jailbreak against Herod's death. Seven blocks,
 * matching Day 311.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWELVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 312,
  title: "Gospel to Gentiles",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 312. Two men, in two different cities, have visions on the same day — and neither one understands yet what God is doing.", 800],
    ["Cornelius is a Roman soldier. A Gentile. Everything in Peter's whole life has taught him to stay away from a man like that.", 800],
    ["But God has been working on both of them before either one asks for anything.", 800],
    ["By the end of today, the gospel walks through a door nobody in the church thought was ever going to open.", 850],
    ["We are in Acts 10, 11, and 12. A vision, a sermon, a jailbreak, and a king who forgets who is actually in charge.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 16, [
      "There is a man in Caesarea named Cornelius. A centurion, a Gentile, and Luke makes a point of telling you what kind: devout, God-fearing along with his whole house, generous to the poor, and always praying.",
      "About three in the afternoon an angel comes to him plainly and says his name. Cornelius. He is terrified, asks what it is, Lord. The angel tells him: your prayers and your gifts to the poor have come up as a memorial before God. Send for a man called Peter, in Joppa, staying with Simon a tanner.",
      "The next day, while those messengers are still on the road, Peter goes up on a rooftop to pray around noon and gets hungry waiting on the meal. He falls into a trance and sees heaven open — a great sheet let down by its four corners, full of every kind of animal, clean and unclean together.",
      "A voice tells him, rise, Peter, kill and eat. Peter refuses. Not so, Lord, I have never eaten anything common or unclean. The voice answers: what God has cleansed, do not you call common. Three times this happens. Peter has no idea yet that the vision was never really about food.",
    ]),
    g(10, 17, 33, [
      "While Peter is still working out what he just saw, the three men Cornelius sent are standing at the gate downstairs asking for him by name. The Spirit tells him plainly: go with them, doubt nothing, I sent them myself.",
      "Peter goes down and hears their story — a Roman officer, warned by a holy angel to send for him, to hear what he has to say. He lodges them overnight, which is already a small miracle for a man raised to never eat at a Gentile's table.",
      "The next day he travels to Caesarea with some believers from Joppa. Cornelius is waiting, and he is not waiting alone. He has called together his relatives and close friends, because he expects this to matter to more than just him.",
      "Cornelius falls at Peter's feet like he is meeting a god. Peter pulls him up fast. Stand up, he says, I myself am only a man. Then he tells the room plainly: you know it is against our law for a Jew to visit a Gentile. But God has shown me not to call any man common or unclean.",
    ]),
    g(10, 34, 48, [
      "Peter opens his mouth and says the line that breaks the whole thing open. Of a truth I perceive that God is no respecter of persons. In every nation, whoever fears him and does what is right is accepted with him.",
      "Then he preaches. Jesus of Nazareth, anointed with the Holy Ghost and power, who went about doing good and healing everyone oppressed by the devil, because God was with him. They killed him, hanged him on a tree. God raised him the third day, and showed him openly — not to everyone, but to witnesses chosen beforehand, who ate and drank with him after he rose.",
      "He tells them Jesus commanded the apostles to preach and testify that he is the one ordained to judge the living and the dead, and that everyone who believes in him receives remission of sins through his name. No ceremony required first. No becoming a Jew first.",
      "And while Peter is still speaking, the Holy Ghost falls on everyone listening. The Jewish believers who came with him are astonished — the gift is being poured out on Gentiles too, they can hear them speak with tongues and magnify God. Peter says it plainly: can any man forbid water, that these should not be baptized, who have received the Holy Ghost as well as we? So they baptize them, right there.",
    ]),
    g(11, 1, 18, [
      "Word reaches Jerusalem before Peter does, and when he arrives the believers of the circumcision come at him hard. You went in to uncircumcised men, and ate with them.",
      "Peter does not argue. He just tells them everything in order — the sheet, the voice, the three men at the door, the Spirit telling him to go without doubting, Cornelius's own angel, and then the Holy Ghost falling on them exactly the way it fell on the apostles at the beginning.",
      "He remembers something the Lord said. John indeed baptized with water, but you shall be baptized with the Holy Ghost. And then his own question settles it for him. Forasmuch as God gave them the like gift as he did unto us, what was I, that I could withstand God?",
      "The room goes quiet. Then they glorify God and say something that reshapes the whole church. Then hath God also to the Gentiles granted repentance unto life. Not almost. Not eventually. Already.",
    ]),
    g(11, 19, 30, [
      "Meanwhile, believers scattered by the persecution after Stephen's death have been traveling — Phenice, Cyprus, Antioch — preaching, but only to Jews. Until some men of Cyprus and Cyrene reach Antioch and start telling Grecians about the Lord Jesus too. A great number believe, and turn to the Lord.",
      "Jerusalem hears about it and sends Barnabas to see for himself. He arrives, sees the grace of God, and instead of shutting it down he is glad, and exhorts them all to cleave unto the Lord with purpose of heart. Luke calls him a good man, full of the Holy Ghost and of faith. Much people are added because of him.",
      "Barnabas goes and finds Saul in Tarsus and brings him back to Antioch. The two of them spend a whole year assembled with that church, teaching much people. And it is in Antioch, not Jerusalem, that the disciples are called Christians first.",
      "A prophet named Agabus signifies by the Spirit that a great dearth is coming over all the world. So the disciples, every man according to his ability, determine to send relief to the brethren in Judea, and hand it to the elders by the hands of Barnabas and Saul.",
    ]),
    g(12, 1, 19, [
      "Herod stretches out his hand to vex the church. He kills James, John's brother, with the sword. When he sees it pleases the Jewish leaders, he arrests Peter too, in the days of unleavened bread, and hands him to four quaternions of soldiers to keep him.",
      "The church prays for him without ceasing. And on the very night before Herod plans to bring him out, Peter is asleep between two soldiers, bound with two chains. An angel of the Lord appears, light shines in the prison, and strikes Peter on the side to wake him. Arise up quickly. The chains fall off his hands.",
      "The angel tells him to gird himself, bind on his sandals, cast his garment about him, and follow. Peter does it, thinking he sees a vision, not something actually happening. They pass the first ward, then the second, reach the iron gate into the city, and it opens of its own accord. They walk one street together, and the angel is simply gone.",
      "Peter comes to himself. Now I know of a surety, that the Lord hath sent his angel, and hath delivered me out of the hand of Herod. He goes to the house where everyone is praying for him and knocks at the gate. A servant girl named Rhoda hears his voice, is so glad she runs to tell everyone without even opening it. They tell her she is mad. She keeps insisting. They say, it is his angel. Peter is still outside, knocking.",
    ]),
    g(12, 20, 25, [
      "They finally let him in and can hardly believe it. He waves them quiet, tells them how the Lord brought him out, and tells them to report it to James and the brethren. Then he leaves for another place.",
      "As soon as it is day there is no small stir among the soldiers about what has become of Peter. Herod searches for him, cannot find him, examines the keepers, and has them put to death. Then he leaves for Caesarea.",
      "Herod is highly displeased with the people of Tyre and Sidon, and they come begging for peace, because their country depends on his for food. On a set day he puts on royal apparel, sits on his throne, and makes an oration to them. The people shout back at him: it is the voice of a god, and not of a man.",
      "He does not correct them. He takes the praise. Immediately the angel of the Lord smites him, because he gave not God the glory, and he is eaten of worms and dies. But the word of God grows and multiplies. And Barnabas and Saul, their relief mission finished, return to Antioch, bringing John Mark with them.",
    ]),
  ],
  closing: [
    ["So that is Day 312.", 700],
    ["A soldier's prayers reaching heaven, a sheet full of unclean animals, and a door the whole early church thought was permanently shut.", 800],
    ["Cornelius did everything right, and still needed someone to come tell him about Jesus. Being a good man was never going to be enough on its own.", 850],
    ["Peter had to unlearn something his whole life had trained into him. What God has cleansed, do not you call common.", 850],
    ["And Herod, sitting on a throne soaking up worship that belonged to God, is struck down at the exact moment the gospel is breaking out of Jerusalem for good.", 850],
    ["The persecution that scattered the church did not stop it. It is the reason Gentiles in Antioch ever heard about Jesus at all.", 850],
    ["Tomorrow, Acts 13 through 15. Paul and Barnabas get sent out for real, and the church has to decide what it actually requires of a Gentile believer.", 850],
    ["For now, carry Peter's own question to Jerusalem.", 750],
    ["What was I, that I could withstand God.", 1200],
  ],
};
