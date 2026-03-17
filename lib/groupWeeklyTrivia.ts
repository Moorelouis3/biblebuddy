import type { SeriesTriviaQuestion } from "./seriesContent";

export type WeeklyGroupTriviaTheme = {
  key: string;
  subjectTitle: string;
  subjectLine: string;
  intro: string;
  questions: SeriesTriviaQuestion[];
};

export type WeeklyGroupTriviaSetRecord = {
  id: string;
  post_id: string;
  group_id: string;
  week_key: string;
  subject_key: string;
  subject_title: string;
  intro: string | null;
  questions: SeriesTriviaQuestion[];
  created_at: string;
};

const THEMES: WeeklyGroupTriviaTheme[] = [
  {
    key: "twelve_disciples",
    subjectTitle: "The 12 Disciples",
    subjectLine: "This week's trivia is about the 12 disciples.",
    intro: "Ten quick questions on the men Jesus called to follow Him closely.",
    questions: [
      { id: "disciples-1", question: "Which disciple was known as a tax collector before following Jesus?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Matthew" }, { label: "C", text: "Thomas" }, { label: "D", text: "Philip" }], correctAnswer: "B", explanation: "Matthew was a tax collector before Jesus called him." },
      { id: "disciples-2", question: "Which two brothers were fishermen when Jesus called them?", options: [{ label: "A", text: "Peter and Andrew" }, { label: "B", text: "Matthew and Thomas" }, { label: "C", text: "Philip and Bartholomew" }, { label: "D", text: "Simon and Judas" }], correctAnswer: "A", explanation: "Peter and Andrew were brothers and fishermen." },
      { id: "disciples-3", question: "Which disciple doubted Jesus' resurrection until he saw Him?", options: [{ label: "A", text: "John" }, { label: "B", text: "Thomas" }, { label: "C", text: "James" }, { label: "D", text: "Andrew" }], correctAnswer: "B", explanation: "Thomas is remembered for doubting until he saw the risen Jesus." },
      { id: "disciples-4", question: "Who betrayed Jesus for thirty pieces of silver?", options: [{ label: "A", text: "Judas Iscariot" }, { label: "B", text: "Peter" }, { label: "C", text: "Matthew" }, { label: "D", text: "Thaddaeus" }], correctAnswer: "A", explanation: "Judas Iscariot betrayed Jesus." },
      { id: "disciples-5", question: "Which disciple is often called 'the beloved disciple'?", options: [{ label: "A", text: "James" }, { label: "B", text: "John" }, { label: "C", text: "Philip" }, { label: "D", text: "Bartholomew" }], correctAnswer: "B", explanation: "John is traditionally identified as the beloved disciple." },
      { id: "disciples-6", question: "Who said, 'You are the Christ, the Son of the living God'?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Thomas" }, { label: "C", text: "Matthew" }, { label: "D", text: "James son of Alphaeus" }], correctAnswer: "A", explanation: "Peter made that confession in Matthew 16." },
      { id: "disciples-7", question: "Which disciple replaced Judas after the resurrection?", options: [{ label: "A", text: "Silas" }, { label: "B", text: "Matthias" }, { label: "C", text: "Barnabas" }, { label: "D", text: "Mark" }], correctAnswer: "B", explanation: "Matthias was chosen in Acts 1 to replace Judas." },
      { id: "disciples-8", question: "Which brothers were nicknamed 'sons of thunder'?", options: [{ label: "A", text: "Peter and Andrew" }, { label: "B", text: "James and John" }, { label: "C", text: "Philip and Bartholomew" }, { label: "D", text: "Simon and Jude" }], correctAnswer: "B", explanation: "James and John were called Boanerges, or sons of thunder." },
      { id: "disciples-9", question: "Which disciple brought Nathanael to Jesus?", options: [{ label: "A", text: "Andrew" }, { label: "B", text: "Philip" }, { label: "C", text: "Peter" }, { label: "D", text: "Matthew" }], correctAnswer: "B", explanation: "Philip told Nathanael about Jesus in John 1." },
      { id: "disciples-10", question: "How many disciples did Jesus appoint as His closest apostles?", options: [{ label: "A", text: "7" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "70" }], correctAnswer: "C", explanation: "Jesus appointed 12 apostles." },
    ],
  },
  {
    key: "paul",
    subjectTitle: "Paul",
    subjectLine: "This week's trivia is about Paul the apostle.",
    intro: "Ten questions on Paul's conversion, ministry, and letters.",
    questions: [
      { id: "paul-1", question: "What was Paul's name before he was commonly called Paul?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "Silas" }, { label: "C", text: "Simeon" }, { label: "D", text: "Stephen" }], correctAnswer: "A", explanation: "Paul was first known as Saul." },
      { id: "paul-2", question: "On what road did Jesus appear to Paul?", options: [{ label: "A", text: "Jericho Road" }, { label: "B", text: "Road to Bethlehem" }, { label: "C", text: "Road to Damascus" }, { label: "D", text: "Road to Caesarea" }], correctAnswer: "C", explanation: "Paul encountered Jesus on the road to Damascus." },
      { id: "paul-3", question: "Who was sent by God to pray for Paul after his conversion?", options: [{ label: "A", text: "Barnabas" }, { label: "B", text: "Ananias" }, { label: "C", text: "Peter" }, { label: "D", text: "Timothy" }], correctAnswer: "B", explanation: "Ananias was sent to restore Paul's sight." },
      { id: "paul-4", question: "Which young coworker did Paul call 'my true son in the faith'?", options: [{ label: "A", text: "Mark" }, { label: "B", text: "Luke" }, { label: "C", text: "Timothy" }, { label: "D", text: "Apollos" }], correctAnswer: "C", explanation: "Paul spoke of Timothy this way in his letters." },
      { id: "paul-5", question: "Which island was Paul shipwrecked on?", options: [{ label: "A", text: "Cyprus" }, { label: "B", text: "Malta" }, { label: "C", text: "Crete" }, { label: "D", text: "Patmos" }], correctAnswer: "B", explanation: "Paul was shipwrecked on Malta in Acts 28." },
      { id: "paul-6", question: "Which letter contains the 'fruit of the Spirit'?", options: [{ label: "A", text: "Galatians" }, { label: "B", text: "Romans" }, { label: "C", text: "Ephesians" }, { label: "D", text: "Colossians" }], correctAnswer: "A", explanation: "Galatians 5 lists the fruit of the Spirit." },
      { id: "paul-7", question: "Which city was Paul from?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Antioch" }, { label: "C", text: "Tarsus" }, { label: "D", text: "Philippi" }], correctAnswer: "C", explanation: "Paul was from Tarsus in Cilicia." },
      { id: "paul-8", question: "Who traveled with Paul on his first missionary journey?", options: [{ label: "A", text: "Barnabas" }, { label: "B", text: "Timothy" }, { label: "C", text: "Titus" }, { label: "D", text: "Luke" }], correctAnswer: "A", explanation: "Barnabas traveled with Paul on the first missionary journey." },
      { id: "paul-9", question: "Which book records much of Paul's missionary work?", options: [{ label: "A", text: "Romans" }, { label: "B", text: "Acts" }, { label: "C", text: "Hebrews" }, { label: "D", text: "Revelation" }], correctAnswer: "B", explanation: "The book of Acts records Paul's journeys and ministry." },
      { id: "paul-10", question: "What did Paul say he had fought and finished near the end of his life?", options: [{ label: "A", text: "The law and the prophets" }, { label: "B", text: "The good fight and the race" }, { label: "C", text: "The battle and the mission" }, { label: "D", text: "The trial and the journey" }], correctAnswer: "B", explanation: "Paul said, 'I have fought the good fight, I have finished the race, I have kept the faith.'" },
    ],
  },
  {
    key: "wilderness",
    subjectTitle: "Israelites in the Wilderness",
    subjectLine: "This week's trivia is about Israel in the wilderness.",
    intro: "Ten questions on the wilderness years, manna, testing, and God's faithfulness.",
    questions: [
      { id: "wilderness-1", question: "How many years did Israel wander in the wilderness?", options: [{ label: "A", text: "7" }, { label: "B", text: "12" }, { label: "C", text: "40" }, { label: "D", text: "70" }], correctAnswer: "C", explanation: "Israel wandered in the wilderness for 40 years." },
      { id: "wilderness-2", question: "What food did God provide from heaven?", options: [{ label: "A", text: "Bread and fish" }, { label: "B", text: "Manna" }, { label: "C", text: "Quail only" }, { label: "D", text: "Figs" }], correctAnswer: "B", explanation: "God gave manna from heaven to feed Israel." },
      { id: "wilderness-3", question: "Who struck the rock when water came out at Horeb?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Joshua" }, { label: "C", text: "Moses" }, { label: "D", text: "Caleb" }], correctAnswer: "C", explanation: "Moses struck the rock and water came out." },
      { id: "wilderness-4", question: "Which two spies brought a faithful report about Canaan?", options: [{ label: "A", text: "Joshua and Caleb" }, { label: "B", text: "Moses and Aaron" }, { label: "C", text: "Phinehas and Eleazar" }, { label: "D", text: "Nadab and Abihu" }], correctAnswer: "A", explanation: "Joshua and Caleb trusted God when the others did not." },
      { id: "wilderness-5", question: "What visible sign led Israel by night?", options: [{ label: "A", text: "A pillar of fire" }, { label: "B", text: "A bright star" }, { label: "C", text: "Lightning" }, { label: "D", text: "An angel with a torch" }], correctAnswer: "A", explanation: "God led them by a pillar of fire at night." },
      { id: "wilderness-6", question: "At what mountain did God give the law to Israel?", options: [{ label: "A", text: "Mount Carmel" }, { label: "B", text: "Mount Sinai" }, { label: "C", text: "Mount Zion" }, { label: "D", text: "Mount Hermon" }], correctAnswer: "B", explanation: "God gave the law at Mount Sinai." },
      { id: "wilderness-7", question: "What idol did Israel make while Moses was on the mountain?", options: [{ label: "A", text: "A golden calf" }, { label: "B", text: "A bronze serpent" }, { label: "C", text: "A silver dove" }, { label: "D", text: "A carved lion" }], correctAnswer: "A", explanation: "Israel made a golden calf in rebellion." },
      { id: "wilderness-8", question: "What did God send after the people complained for meat?", options: [{ label: "A", text: "Doves" }, { label: "B", text: "Quail" }, { label: "C", text: "Fish" }, { label: "D", text: "Lambs" }], correctAnswer: "B", explanation: "God sent quail when they grumbled for meat." },
      { id: "wilderness-9", question: "What object did Moses lift up so bitten people could look and live?", options: [{ label: "A", text: "A bronze serpent" }, { label: "B", text: "A gold staff" }, { label: "C", text: "The ark" }, { label: "D", text: "A silver shield" }], correctAnswer: "A", explanation: "Moses lifted up the bronze serpent in the wilderness." },
      { id: "wilderness-10", question: "Which river stood before Israel when they finally entered the land?", options: [{ label: "A", text: "Nile" }, { label: "B", text: "Jordan" }, { label: "C", text: "Euphrates" }, { label: "D", text: "Jabbok" }], correctAnswer: "B", explanation: "Israel crossed the Jordan to enter the promised land." },
    ],
  },
  {
    key: "old_testament",
    subjectTitle: "Old Testament",
    subjectLine: "This week's trivia is a broad Old Testament challenge.",
    intro: "Ten questions across creation, kings, prophets, and major Old Testament moments.",
    questions: [
      { id: "ot-1", question: "Who built the ark?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Moses" }, { label: "C", text: "Noah" }, { label: "D", text: "David" }], correctAnswer: "C", explanation: "Noah built the ark." },
      { id: "ot-2", question: "Who led Israel out of Egypt?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Moses" }, { label: "C", text: "Aaron" }, { label: "D", text: "Samuel" }], correctAnswer: "B", explanation: "Moses led Israel out of Egypt." },
      { id: "ot-3", question: "Who killed Goliath?", options: [{ label: "A", text: "Saul" }, { label: "B", text: "Jonathan" }, { label: "C", text: "David" }, { label: "D", text: "Abner" }], correctAnswer: "C", explanation: "David killed Goliath with a sling and stone." },
      { id: "ot-4", question: "Who was swallowed by a great fish?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Jonah" }, { label: "C", text: "Daniel" }, { label: "D", text: "Jeremiah" }], correctAnswer: "B", explanation: "Jonah was swallowed by a great fish." },
      { id: "ot-5", question: "Who interpreted Pharaoh's dreams in Egypt?", options: [{ label: "A", text: "Joseph" }, { label: "B", text: "Moses" }, { label: "C", text: "Aaron" }, { label: "D", text: "Samuel" }], correctAnswer: "A", explanation: "Joseph interpreted Pharaoh's dreams." },
      { id: "ot-6", question: "Who was the wisest king of Israel?", options: [{ label: "A", text: "David" }, { label: "B", text: "Saul" }, { label: "C", text: "Solomon" }, { label: "D", text: "Hezekiah" }], correctAnswer: "C", explanation: "Solomon was famous for wisdom." },
      { id: "ot-7", question: "Who stayed faithful in the lions' den?", options: [{ label: "A", text: "Ezekiel" }, { label: "B", text: "Daniel" }, { label: "C", text: "Nehemiah" }, { label: "D", text: "Ezra" }], correctAnswer: "B", explanation: "Daniel was thrown into the lions' den." },
      { id: "ot-8", question: "What city had walls that fell after Israel marched around it?", options: [{ label: "A", text: "Jericho" }, { label: "B", text: "Ai" }, { label: "C", text: "Nineveh" }, { label: "D", text: "Hebron" }], correctAnswer: "A", explanation: "The walls of Jericho fell." },
      { id: "ot-9", question: "Who rebuilt the walls of Jerusalem?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Nehemiah" }, { label: "C", text: "Zerubbabel" }, { label: "D", text: "Joshua the priest" }], correctAnswer: "B", explanation: "Nehemiah led the rebuilding of Jerusalem's walls." },
      { id: "ot-10", question: "Which prophet confronted the prophets of Baal on Mount Carmel?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Elisha" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Hosea" }], correctAnswer: "A", explanation: "Elijah confronted the prophets of Baal on Mount Carmel." },
    ],
  },
  {
    key: "bible_characters",
    subjectTitle: "Bible Character Studies",
    subjectLine: "This week's trivia is about standout Bible characters.",
    intro: "Ten questions on the lives, faith, failures, and lessons from Bible people.",
    questions: [
      { id: "characters-1", question: "Who left Ur to follow God's call?", options: [{ label: "A", text: "Isaac" }, { label: "B", text: "Jacob" }, { label: "C", text: "Abraham" }, { label: "D", text: "Lot" }], correctAnswer: "C", explanation: "Abraham left Ur in obedience to God." },
      { id: "characters-2", question: "Who wrestled with God and was renamed Israel?", options: [{ label: "A", text: "Esau" }, { label: "B", text: "Jacob" }, { label: "C", text: "Joseph" }, { label: "D", text: "Moses" }], correctAnswer: "B", explanation: "Jacob was renamed Israel after wrestling." },
      { id: "characters-3", question: "Who remained loyal to Naomi and said, 'Your God will be my God'?", options: [{ label: "A", text: "Esther" }, { label: "B", text: "Ruth" }, { label: "C", text: "Hannah" }, { label: "D", text: "Deborah" }], correctAnswer: "B", explanation: "Ruth spoke those words to Naomi." },
      { id: "characters-4", question: "Who was thrown into a pit by his brothers and later rose in Egypt?", options: [{ label: "A", text: "Benjamin" }, { label: "B", text: "Joseph" }, { label: "C", text: "Judah" }, { label: "D", text: "Samuel" }], correctAnswer: "B", explanation: "Joseph was betrayed by his brothers and later rose to power in Egypt." },
      { id: "characters-5", question: "Who prayed for a son and gave Samuel to the Lord?", options: [{ label: "A", text: "Sarah" }, { label: "B", text: "Rachel" }, { label: "C", text: "Hannah" }, { label: "D", text: "Miriam" }], correctAnswer: "C", explanation: "Hannah prayed for Samuel and dedicated him to God." },
      { id: "characters-6", question: "Who was a queen who risked her life to save her people?", options: [{ label: "A", text: "Vashti" }, { label: "B", text: "Esther" }, { label: "C", text: "Bathsheba" }, { label: "D", text: "Abigail" }], correctAnswer: "B", explanation: "Esther risked her life to intercede for the Jews." },
      { id: "characters-7", question: "Who was called a man after God's own heart?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Saul" }, { label: "C", text: "David" }, { label: "D", text: "Solomon" }], correctAnswer: "C", explanation: "David was described as a man after God's own heart." },
      { id: "characters-8", question: "Who lost everything yet continued to wrestle with God in suffering?", options: [{ label: "A", text: "Jeremiah" }, { label: "B", text: "Job" }, { label: "C", text: "Elijah" }, { label: "D", text: "Jonah" }], correctAnswer: "B", explanation: "Job endured immense suffering while clinging to God." },
      { id: "characters-9", question: "Who led as both prophetess and judge in Israel?", options: [{ label: "A", text: "Miriam" }, { label: "B", text: "Deborah" }, { label: "C", text: "Anna" }, { label: "D", text: "Huldah" }], correctAnswer: "B", explanation: "Deborah judged Israel and led with wisdom and courage." },
      { id: "characters-10", question: "Who was a Pharisee and ruler who came to Jesus by night?", options: [{ label: "A", text: "Zacchaeus" }, { label: "B", text: "Joseph of Arimathea" }, { label: "C", text: "Nicodemus" }, { label: "D", text: "Gamaliel" }], correctAnswer: "C", explanation: "Nicodemus came to Jesus by night in John 3." },
    ],
  },
  {
    key: "bible_places",
    subjectTitle: "Bible Places",
    subjectLine: "This week's trivia is about Bible places and why they matter.",
    intro: "Ten questions on the lands, cities, mountains, and waters across Scripture.",
    questions: [
      { id: "places-1", question: "In what city was Jesus born?", options: [{ label: "A", text: "Nazareth" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Bethlehem" }, { label: "D", text: "Capernaum" }], correctAnswer: "C", explanation: "Jesus was born in Bethlehem." },
      { id: "places-2", question: "On what mountain did Moses receive the law?", options: [{ label: "A", text: "Mount Zion" }, { label: "B", text: "Mount Sinai" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Nebo" }], correctAnswer: "B", explanation: "Moses received the law on Mount Sinai." },
      { id: "places-3", question: "Which river did Jesus get baptized in?", options: [{ label: "A", text: "Jordan" }, { label: "B", text: "Nile" }, { label: "C", text: "Euphrates" }, { label: "D", text: "Jabbok" }], correctAnswer: "A", explanation: "Jesus was baptized in the Jordan River." },
      { id: "places-4", question: "What city was known for its walls falling in Joshua's day?", options: [{ label: "A", text: "Ai" }, { label: "B", text: "Jericho" }, { label: "C", text: "Hebron" }, { label: "D", text: "Samaria" }], correctAnswer: "B", explanation: "Jericho's walls fell after Israel marched around them." },
      { id: "places-5", question: "What sea did Jesus calm during a storm?", options: [{ label: "A", text: "Dead Sea" }, { label: "B", text: "Mediterranean Sea" }, { label: "C", text: "Sea of Galilee" }, { label: "D", text: "Red Sea" }], correctAnswer: "C", explanation: "Jesus calmed the storm on the Sea of Galilee." },
      { id: "places-6", question: "What city was Paul traveling to when he encountered Jesus?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Damascus" }, { label: "C", text: "Rome" }, { label: "D", text: "Antioch" }], correctAnswer: "B", explanation: "Paul was on the road to Damascus." },
      { id: "places-7", question: "Where was Jesus crucified?", options: [{ label: "A", text: "Bethany" }, { label: "B", text: "Golgotha" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Emmaus" }], correctAnswer: "B", explanation: "Jesus was crucified at Golgotha, the place of the skull." },
      { id: "places-8", question: "What land was promised to Abraham and his descendants?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Canaan" }, { label: "C", text: "Babylon" }, { label: "D", text: "Assyria" }], correctAnswer: "B", explanation: "God promised the land of Canaan." },
      { id: "places-9", question: "What city is often called the holy city in Scripture?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethlehem" }, { label: "C", text: "Nazareth" }, { label: "D", text: "Tyre" }], correctAnswer: "A", explanation: "Jerusalem is the holy city throughout Scripture." },
      { id: "places-10", question: "Where was John when he received the Revelation?", options: [{ label: "A", text: "Crete" }, { label: "B", text: "Cyprus" }, { label: "C", text: "Patmos" }, { label: "D", text: "Malta" }], correctAnswer: "C", explanation: "John received the Revelation while on Patmos." },
    ],
  },
  {
    key: "jesus",
    subjectTitle: "Jesus",
    subjectLine: "This week's trivia is centered on Jesus.",
    intro: "Ten questions on the life, words, miracles, and mission of Jesus.",
    questions: [
      { id: "jesus-1", question: "Who baptized Jesus?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "John the Baptist" }, { label: "C", text: "Zechariah" }, { label: "D", text: "James" }], correctAnswer: "B", explanation: "John the Baptist baptized Jesus." },
      { id: "jesus-2", question: "What was Jesus' first recorded miracle in John's Gospel?", options: [{ label: "A", text: "Healing a blind man" }, { label: "B", text: "Walking on water" }, { label: "C", text: "Turning water into wine" }, { label: "D", text: "Feeding the five thousand" }], correctAnswer: "C", explanation: "Jesus turned water into wine at Cana." },
      { id: "jesus-3", question: "How many days was Jesus in the wilderness being tempted?", options: [{ label: "A", text: "7" }, { label: "B", text: "12" }, { label: "C", text: "30" }, { label: "D", text: "40" }], correctAnswer: "D", explanation: "Jesus was tempted in the wilderness for 40 days." },
      { id: "jesus-4", question: "What did Jesus say is the greatest commandment?", options: [{ label: "A", text: "Love your neighbor" }, { label: "B", text: "Love the Lord your God" }, { label: "C", text: "Pray without ceasing" }, { label: "D", text: "Forgive seventy times seven" }], correctAnswer: "B", explanation: "Jesus said the greatest commandment is to love the Lord your God." },
      { id: "jesus-5", question: "Who denied Jesus three times?", options: [{ label: "A", text: "John" }, { label: "B", text: "Thomas" }, { label: "C", text: "Peter" }, { label: "D", text: "Matthew" }], correctAnswer: "C", explanation: "Peter denied Jesus three times before the rooster crowed." },
      { id: "jesus-6", question: "How many people were fed with five loaves and two fish, besides women and children?", options: [{ label: "A", text: "500" }, { label: "B", text: "2,000" }, { label: "C", text: "3,000" }, { label: "D", text: "5,000" }], correctAnswer: "D", explanation: "Jesus fed five thousand men with five loaves and two fish." },
      { id: "jesus-7", question: "What prayer did Jesus teach His disciples as a model?", options: [{ label: "A", text: "The Shema" }, { label: "B", text: "The Lord's Prayer" }, { label: "C", text: "The High Priestly Prayer" }, { label: "D", text: "The Prayer of Jabez" }], correctAnswer: "B", explanation: "Jesus taught the Lord's Prayer." },
      { id: "jesus-8", question: "Who carried Jesus' cross part of the way to Golgotha?", options: [{ label: "A", text: "Joseph of Arimathea" }, { label: "B", text: "Simon of Cyrene" }, { label: "C", text: "Nicodemus" }, { label: "D", text: "Barabbas" }], correctAnswer: "B", explanation: "Simon of Cyrene carried Jesus' cross." },
      { id: "jesus-9", question: "On what day did Jesus rise from the dead?", options: [{ label: "A", text: "The third day" }, { label: "B", text: "The second day" }, { label: "C", text: "The seventh day" }, { label: "D", text: "The fortieth day" }], correctAnswer: "A", explanation: "Jesus rose on the third day." },
      { id: "jesus-10", question: "What title did Thomas give Jesus after seeing the risen Christ?", options: [{ label: "A", text: "Rabbi and Prophet" }, { label: "B", text: "King of Israel" }, { label: "C", text: "My Lord and my God" }, { label: "D", text: "Messiah and Savior" }], correctAnswer: "C", explanation: "Thomas said, 'My Lord and my God!'" },
    ],
  },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function getTriviaWeekStart(date = new Date()): Date {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay();
  const daysSinceTuesday = (day + 5) % 7;
  utc.setUTCDate(utc.getUTCDate() - daysSinceTuesday);
  return utc;
}

export function getTriviaWeekKey(date = new Date()): string {
  const weekStart = getTriviaWeekStart(date);
  return `${weekStart.getUTCFullYear()}-${pad(weekStart.getUTCMonth() + 1)}-${pad(weekStart.getUTCDate())}`;
}

export function getWeeklyGroupTriviaTheme(date = new Date()): WeeklyGroupTriviaTheme {
  const weekStart = getTriviaWeekStart(date);
  const seed = Math.floor(weekStart.getTime() / (7 * 24 * 60 * 60 * 1000));
  const theme = THEMES[((seed % THEMES.length) + THEMES.length) % THEMES.length];
  return theme;
}

export function buildWeeklyGroupTrivia(date = new Date()) {
  const theme = getWeeklyGroupTriviaTheme(date);
  return {
    weekKey: getTriviaWeekKey(date),
    subjectKey: theme.key,
    subjectTitle: theme.subjectTitle,
    subjectLine: theme.subjectLine,
    intro: theme.intro,
    questions: theme.questions,
  };
}

export function parseWeeklyTriviaQuestions(value: unknown): SeriesTriviaQuestion[] {
  if (!Array.isArray(value)) return [];
  return value.filter((question) => {
    if (!question || typeof question !== "object") return false;
    const maybe = question as SeriesTriviaQuestion;
    return typeof maybe.id === "string" && typeof maybe.question === "string" && Array.isArray(maybe.options);
  }) as SeriesTriviaQuestion[];
}
