import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 311, written to the Day 1 standard.
 *
 * Acts 7-9: Stephen's speech and stoning, the scattering that turns into a
 * mission, Philip with Simon and the Ethiopian eunuch, and Saul's conversion
 * on the road to Damascus. Seven blocks, matching Day 310.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_ELEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 311,
  title: "Stephen, Saul, and Conversion",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 311. This is the day everything turns. A man gets stoned to death for preaching, and the man guarding the coats becomes the greatest missionary who ever lived.", 800],
    ["Stephen doesn't get a trial that goes anywhere. He gets a speech, a vision of heaven opening, and a pile of rocks.", 800],
    ["And Saul — who watches it happen and approves — is about to get knocked flat on a desert road by the same Jesus he thinks he's fighting.", 850],
    ["In between, Philip baptizes a sorcerer's whole city, and then a foreign official reading Isaiah alone in a chariot.", 850],
    ["We are in Acts 7, 8, and 9. A martyrdom, a scattering, and a conversion nobody saw coming.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 16, [
      "Stephen stands before the council and doesn't defend himself point by point. He starts telling Israel's whole story, all the way back to Abraham: the God of glory appeared unto our father Abraham, and said, Get thee out of thy country, and from thy kindred, and come into the land which I shall shew thee.",
      "He makes sure they hear this detail. God gave Abraham no inheritance in it, no, not so much as to set his foot on. Yet God promised it to him and to his seed after him, while Abraham was still childless. The promise arrived a long time before the proof.",
      "He moves fast through the patriarchs, Isaac, Jacob, the twelve, and lands on Joseph. Moved with envy, sold into Egypt. But God was with him, and delivered him out of his afflictions.",
      "Famine drives Jacob's family into Egypt, and the second visit Joseph makes himself known to his own brothers. Jacob dies there, and his body is carried back to be buried in the ground Abraham had bought. Even the burial site is a promise kept early.",
    ]),
    g(7, 17, 43, [
      "When the time of the promise draws near, a new king arises which knew not Joseph, and deals subtilly with Israel, casting out their infant children so they will not live. Moses is born into exactly that danger, and Pharaoh's own daughter ends up raising him.",
      "At forty years old he tries to defend his people himself, strikes down an Egyptian, supposing his brethren would understand that God, by his hand, would deliver them. But they understood not. The next day one of his own asks, who made thee a ruler and a judge over us? Moses flees.",
      "Forty more years pass before God meets him in a burning bush in the wilderness: I have seen, I have seen the affliction of my people... and am come down to deliver them. This Moses whom they refused is the same man God sends to be their ruler and deliverer.",
      "And Stephen's point lands hard. Even after the wonders, the Red Sea, the forty years, their hearts turned back again into Egypt. They tell Aaron, make us gods, and worship a calf they built with their own hands. The pattern Stephen is describing is the pattern sitting in front of him right now.",
    ]),
    g(7, 44, 60, [
      "Stephen traces the tabernacle through the wilderness, through David, to Solomon, who finally builds God a house. Then he quotes the prophets against the very building these men are proud of: heaven is my throne, and earth is my footstool... what house will ye build me? God was never contained by a building.",
      "Then Stephen stops recounting history and turns the whole speech on them. Ye stiffnecked and uncircumcised in heart and ears, ye do always resist the Holy Ghost: as your fathers did, so do ye. Which of the prophets have not your fathers persecuted? And now you have betrayed and murdered the Just One himself.",
      "That is the line that ends it. They are cut to the heart, and gnash on him with their teeth. But Stephen, full of the Holy Ghost, looks up and says, behold, I see the heavens opened, and the Son of man standing on the right hand of God.",
      "They stop their ears, rush him, and stone him outside the city, while a young man named Saul stands guarding the clothes of the men throwing the stones. Stephen kneels down and cries with a loud voice, Lord, lay not this sin to their charge. And then he falls asleep.",
    ]),
    g(8, 1, 25, [
      "Saul was consenting unto his death. That same day a great persecution breaks out against the Jerusalem church, and believers scatter across Judaea and Samaria, everyone except the apostles. Saul makes havock of the church, entering house after house, hauling men and women off to prison.",
      "But the scattering does something the persecution never intended. They that were scattered abroad went every where preaching the word. Philip goes down to Samaria and preaches Christ there, and unclean spirits come out, and the lame and the palsied are healed. Great joy fills that city.",
      "Before Philip arrived, a sorcerer named Simon had the whole city convinced he was some great power of God. Even Simon believes Philip's preaching and gets baptized, then Peter and John come down and lay hands on the believers so they receive the Holy Ghost.",
      "Simon sees this and offers money for the power to do it himself. Peter doesn't soften it. Thy money perish with thee... thy heart is not right in the sight of God. Simon's fear finally shows. Pray ye to the Lord for me, that none of these things which ye have spoken come upon me.",
    ]),
    g(8, 26, 40, [
      "An angel sends Philip south, out onto a desert road, where an Ethiopian official, a eunuch in charge of the queen's whole treasury, is riding home reading Isaiah out loud in his chariot.",
      "The Spirit tells Philip to run up and join him. He was led as a sheep to the slaughter, the eunuch is reading, and he asks Philip the only question that matters. Of whom speaketh the prophet this, of himself, or of some other man?",
      "Philip began at the same scripture, and preached unto him Jesus. No preamble, no argument. He just shows this stranger that the whole passage was pointing at Christ the entire time.",
      "They come to water, and the eunuch asks the most direct question in the chapter. What doth hinder me to be baptized? Nothing does. Philip baptizes him right there, and the Spirit catches Philip away, and the eunuch went on his way rejoicing, alone again, but not the same.",
    ]),
    g(9, 1, 19, [
      "Saul is still breathing out threatenings and slaughter, and gets letters from the high priest authorizing him to drag Damascus believers back in chains. On the road, a light from heaven suddenly shines around him, and he falls to the ground.",
      "A voice says, Saul, Saul, why persecutest thou me? He asks who is speaking, and the answer should stop anyone. I am Jesus whom thou persecutest. The men traveling with him hear the voice but see no one. Saul stands up blind, and is led by the hand into Damascus.",
      "Three days he sits without sight, without food, without water. Meanwhile God speaks to a disciple named Ananias in a vision and tells him to go find Saul. Ananias objects, Lord, I have heard by many of this man, how much evil he hath done, but God answers: he is a chosen vessel unto me... I will shew him how great things he must suffer for my name's sake.",
      "Ananias goes anyway, lays hands on the very man who came to arrest people like him, and calls him brother Saul. Something like scales falls from Saul's eyes, and he receives his sight, and is baptized, and eats for the first time in three days.",
    ]),
    g(9, 20, 43, [
      "Straightway Saul preaches Christ in the synagogues, that he is the Son of God, and everyone who hears him is stunned. Is not this he that destroyed them which called on this name in Jerusalem? The Jews in Damascus take counsel to kill him, so the disciples let him down the city wall by night in a basket.",
      "In Jerusalem the believers are still afraid of him, nobody there believes he is really a disciple, until Barnabas takes him in and vouches for him to the apostles, telling them how he had seen the Lord in the way, and preached boldly at Damascus.",
      "Then Peter goes out to the saints at Lydda and finds a man named Aeneas, paralyzed and bedridden for eight years. Aeneas, Jesus Christ maketh thee whole: arise, and make thy bed. He does, immediately, and the whole area turns to the Lord.",
      "At Joppa a disciple named Tabitha, known for good works and care for the poor, dies, and the widows show Peter the coats and garments she made while she was alive. Peter kneels, prays, and says, Tabitha, arise. She opens her eyes and sits up. And the churches through Judaea, Galilee, and Samaria have rest, and keep multiplying.",
    ]),
  ],
  closing: [
    ["So that is Day 311.", 700],
    ["A stoning, a scattering that turns into a mission, and the church's worst enemy becoming one of its loudest voices.", 800],
    ["Stephen's last words echo Jesus' own: Lord, lay not this sin to their charge. He forgives the men killing him while they are still doing it.", 850],
    ["And Saul, the man holding the coats, is exactly who Jesus goes and gets. Not someone easier. The hardest case in the room.", 850],
    ["Ananias is the one who has to walk into that. Terrified, obedient anyway, calling his enemy brother.", 850],
    ["Everywhere the persecution scattered the church, the church just kept preaching. The thing meant to kill it multiplied it instead.", 850],
    ["Tomorrow, Acts 10 through 12. Peter gets a vision that breaks open who the gospel is actually for.", 850],
    ["For now, carry the line Stephen died saying.", 800],
    ["Lord Jesus, receive my spirit.", 750],
    ["Lord, lay not this sin to their charge.", 1200],
  ],
};
