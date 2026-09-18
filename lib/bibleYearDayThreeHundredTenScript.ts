import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 310, written to the Day 1 standard.
 *
 * Acts 4-6: the arrest of Peter and John, Ananias and Sapphira, the angel who
 * opens the prison, Gamaliel's counsel, and the choosing of the seven that
 * puts Stephen on stage. Seven blocks, matching Day 309.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 310,
  title: "Bold Witness and Shared Life",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 310. Yesterday ended with a beggar leaping through the temple. Today, the men who healed him get arrested for it.", 800],
    ["The exact people who crucified Jesus are now running the trial, and they can't figure out what to do with two fishermen.", 800],
    ["Inside the church, a couple lies about money and drops dead on the spot. Later, seven men get chosen just to make sure nobody's widow goes hungry.", 850],
    ["This is what it costs, and what it actually looks like, to be the church five minutes after Pentecost.", 800],
    ["We are in Acts 4, 5, and 6. Threats, prison, an angel, a wise old Pharisee, and the first deacons.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 12, [
      "Peter and John are still talking to the crowd when the priests, the captain of the temple, and the Sadducees show up, grieved that they taught the people, and preached through Jesus the resurrection from the dead.",
      "They arrest them and hold them overnight — there's no time left in the day for a trial. But the sermon already worked. Many of them which heard the word believed, and the number of the men was about five thousand.",
      "In the morning the rulers, elders, and scribes assemble, Annas the high priest and Caiaphas among them, and ask the only question that matters to them: by what power, or by what name, have ye done this?",
      "Peter, filled with the Holy Ghost, doesn't flinch. By the name of Jesus Christ of Nazareth, whom ye crucified, whom God raised from the dead, even by him doth this man stand here before you whole. Neither is there salvation in any other. There is none other name under heaven given among men, whereby we must be saved.",
    ]),
    g(4, 13, 22, [
      "The council sees the boldness of Peter and John, and perceives that they are unlearned and ignorant men, and they marvel — and they take knowledge of them, that they had been with Jesus.",
      "They can't argue with the evidence either way. The healed man is standing right there next to Peter and John, so they have nothing to say against it.",
      "So they settle for a threat. They command them not to speak at all nor teach in the name of Jesus. Peter and John answer, whether it be right in the sight of God to hearken unto you more than unto God, judge ye. For we cannot but speak the things which we have seen and heard.",
      "They let them go. They can't find a way to punish them, because all the people are glorifying God for what happened. And Luke adds one detail on the way out: the man healed was above forty years old. This wasn't some trick played on a child.",
    ]),
    g(4, 23, 37, [
      "Released, Peter and John go straight back to their own company and report everything the priests said. And the believers don't pray for safety. They pray for more boldness: grant unto thy servants, that with all boldness they may speak thy word.",
      "When they've prayed, the place where they're gathered is shaken, and they are all filled with the Holy Ghost, and they speak the word of God with boldness. God answers by shaking the room, not by removing the threat outside it.",
      "Then Luke shows you what that boldness produces at home. The multitude of them that believed were of one heart and of one soul, and had all things common. Neither was there any among them that lacked.",
      "One man in particular sells land and lays the money at the apostles' feet — Joses, a Levite from Cyprus, whom the apostles nickname Barnabas, son of consolation. Remember that name. He is not done showing up in this book.",
    ]),
    g(5, 1, 11, [
      "Then comes Ananias, with his wife Sapphira. They sell a possession too — but they keep back part of the price for themselves, and bring the rest as if it were the whole amount.",
      "Peter isn't fooled. Ananias, why hath Satan filled thine heart to lie to the Holy Ghost, and to keep back part of the price of the land? While it remained, was it not thine own? Nobody made them give everything. The sin was never the keeping. It was the pretending.",
      "Peter says it plainly: thou hast not lied unto men, but unto God. Ananias hears that and falls down, and gives up the ghost. Young men wrap him up and carry him out before his own wife even knows what happened.",
      "About three hours later Sapphira walks in, still not knowing, and repeats the same lie to Peter's face. She falls down at his feet the same way. Great fear came upon all the church, and upon as many as heard these things. This is the same church that was just praised for holding everything in common.",
    ]),
    g(5, 12, 32, [
      "Many signs and wonders are done among the people, and the believers keep meeting together at Solomon's porch. People start carrying the sick out into the streets, hoping that even Peter's shadow might fall on them as he passes.",
      "The high priest and the Sadducees, filled with indignation, arrest the apostles and shut them in the common prison. That night an angel of the Lord opens the prison doors and walks them out, and tells them: go, stand and speak in the temple to the people all the words of this life.",
      "So at daybreak, the very men who were locked up are back teaching in the temple — while the council sends officers to fetch them from a cell that is still locked and still guarded. The officers come back baffled: the prison truly found we shut with all safety... but when we had opened, we found no man within.",
      "Brought in without force, because the officers are afraid of being stoned by the crowd, the apostles hear the same charge again — and give the same answer, sharper this time. We ought to obey God rather than men. The God of our fathers raised up Jesus, whom ye slew and hanged on a tree.",
    ]),
    g(5, 33, 42, [
      "That answer cuts them to the heart, and they take counsel to kill the apostles outright. Then a Pharisee named Gamaliel, a teacher of the law respected by everyone in the room, stands up and asks for the men to be put outside for a moment.",
      "He reminds the council of two failed revolutionaries, Theudas and Judas of Galilee — both drew a following, both were killed, both movements scattered to nothing the moment the leader died. His logic is simple. If this counsel or this work be of men, it will come to nought. But if it be of God, ye cannot overthrow it; lest haply ye be found even to fight against God.",
      "They take the advice — but not without beating the apostles first, and commanding them again not to speak in the name of Jesus, before letting them go.",
      "And here is the line that should stop you. They depart from the presence of the council, rejoicing that they were counted worthy to suffer shame for his name. Not despite the beating. Because of it. And daily, in the temple and in every house, they keep right on teaching and preaching Jesus Christ.",
    ]),
    g(6, 1, 15, [
      "The church keeps growing, and the growing pains show up fast. A murmuring starts — the Grecian widows complaining that they're being overlooked in the daily distribution of food while the Hebrew widows aren't.",
      "The twelve don't brush this off, but they also don't try to do everything themselves. It is not reason that we should leave the word of God, and serve tables. So they have the whole community choose seven men, full of the Holy Ghost and wisdom, to run the daily care of the widows, freeing the apostles for prayer and the ministry of the word.",
      "First on the list is Stephen, a man full of faith and of the Holy Ghost. He's not just handling food. Full of faith and power, he does great wonders and miracles among the people — until men from a synagogue start arguing with him and can't out-argue him.",
      "Unable to beat him honestly, they get liars to accuse him of blasphemy against Moses and against God, and drag him before the council. And in that moment, with false witnesses lined up against him, all that sat in the council, looking steadfastly on him, saw his face as it had been the face of an angel.",
    ]),
  ],
  closing: [
    ["So that is Day 310.", 700],
    ["Threats, a lie that costs two lives, a prison an angel walks straight through, and a council that can't win an argument no matter how many times it tries.", 800],
    ["Look at what actually holds the early church together through all of it. Not cleverness, not charisma. Boldness asked for in prayer, and people who genuinely shared what they had.", 850],
    ["Ananias and Sapphira didn't have to give everything. They just weren't allowed to pretend they had.", 800],
    ["And when the apostles get beaten for preaching, Luke doesn't record them licking their wounds. They leave rejoicing.", 850],
    ["Tomorrow, Acts 7 through 9. Stephen finishes what starts here, and the man holding the coats at his death is about to meet Jesus on a road to Damascus.", 850],
    ["For now, carry Gamaliel's line about the whole movement.", 800],
    ["If it be of God, ye cannot overthrow it.", 750],
    ["Lest haply ye be found even to fight against God.", 1200],
  ],
};
