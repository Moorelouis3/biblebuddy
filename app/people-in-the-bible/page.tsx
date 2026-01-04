"use client";

import { useState, useEffect, useMemo } from "react";
import { type BiblePerson } from "../../lib/biblePeople";
import ReactMarkdown from "react-markdown";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Static list of Bible people names
const STATIC_PEOPLE_NAMES = [
  "Aaron",
  "Abdon",
  "Abednego",
  "Abel",
  "Abiathar",
  "Abigail",
  "Abimelech",
  "Abiram",
  "Abraham",
  "Absalom",
  "Adam",
  "Aeneas",
  "Agabus",
  "Agrippa I",
  "Agrippa II",
  "Ahab",
  "Ahaz",
  "Ahikam",
  "Ahithophel",
  "Alexander (coppersmith)",
  "Alexander (high priest family)",
  "Amaziah",
  "Amnon",
  "Amon",
  "Amos",
  "Amplias",
  "Ananias (Damascus)",
  "Ananias (high priest)",
  "Andrew",
  "Anna (prophetess)",
  "Annas",
  "Antipater",
  "Apelles",
  "Apollos",
  "Aquila",
  "Archippus",
  "Aristarchus",
  "Aristobulus",
  "Artemas",
  "Asher",
  "Asyncritus",
  "Athaliah",
  "Azariah",
  "Azariah (king)",
  "Azariah (priest)",
  "Azur",
  "Balaam",
  "Balak",
  "Barabbas",
  "Barnabas",
  "Bartholomew",
  "Baruch",
  "Baruch (scribe)",
  "Bathsheba",
  "Belshazzar",
  "Bernice",
  "Bethuel",
  "Bezalel",
  "Bildad",
  "Boaz",
  "Caiaphas",
  "Cain",
  "Caleb",
  "Chloe",
  "Claudia",
  "Cleopas",
  "Cornelius",
  "Crescens",
  "Crispus",
  "Cush",
  "Cyrus",
  "Dan",
  "Daniel",
  "Darius",
  "Dathan",
  "David",
  "Deborah",
  "Delilah",
  "Demas",
  "Dinah",
  "Dorcas",
  "Drusilla",
  "Ebed-Melech",
  "Ehud",
  "Eleazar",
  "Eli",
  "Eliashib",
  "Eliezer",
  "Elihu",
  "Elijah",
  "Eliphaz",
  "Elisha",
  "Elizabeth (mother of John the Baptist)",
  "Elnathan",
  "Elon",
  "Elymas",
  "Enoch",
  "Enos",
  "Epaphras",
  "Ephraim",
  "Erastus",
  "Esau",
  "Esther",
  "Euodia",
  "Eve",
  "Evil-Merodach",
  "Ezekiel",
  "Ezra",
  "Felix",
  "Festus",
  "Gabriel",
  "Gad",
  "Gaius",
  "Gamaliel",
  "Gedaliah",
  "Gemariah",
  "Geshem",
  "Gideon",
  "God",
  "Goliath",
  "Habakkuk",
  "Hagar",
  "Haggai",
  "Ham",
  "Haman",
  "Hanani",
  "Hananiah",
  "Hananiah (false prophet)",
  "Hannah",
  "Hermas",
  "Hermes",
  "Hermogenes",
  "Herod Antipas",
  "Herod the Great",
  "Hezekiah",
  "Hilkiah",
  "Holy Spirit",
  "Hosea",
  "Hoshea",
  "Huldah",
  "Hur",
  "Huram",
  "Hymenaeus",
  "Ibzan",
  "Ichabod",
  "Iddo",
  "Isaac",
  "Isaiah",
  "Ishbak",
  "Ishmael",
  "Ishmael (son of Nethaniah)",
  "Issachar",
  "Ithamar",
  "Jacob",
  "Jaddua",
  "Jairus",
  "James (brother of Jesus)",
  "James (son of Alphaeus)",
  "James (son of Zebedee)",
  "Japheth",
  "Jared",
  "Jason",
  "Jason (high priest)",
  "Jehoahaz",
  "Jehoiachin",
  "Jehoiakim",
  "Jehoram",
  "Jehoshaphat",
  "Jephthah",
  "Jeremiah",
  "Jeroboam",
  "Jesse",
  "Jesus",
  "Jesus Christ",
  "Jethro",
  "Jezebel",
  "Joab",
  "Joanna",
  "Job",
  "Joel",
  "Johanan",
  "John (apostle)",
  "John Hyrcanus",
  "John the Baptist",
  "Joiakim",
  "Jokshan",
  "Jonah",
  "Jonathan",
  "Jonathan (son of Saul)",
  "Jonathan Maccabeus",
  "Joseph (earthly father of Jesus)",
  "Joseph (husband of Mary)",
  "Joseph (son of Jacob)",
  "Joseph of Arimathea",
  "Joshua",
  "Josiah",
  "Jotham",
  "Judah",
  "Judas Iscariot",
  "Judas Maccabeus",
  "Judas of Galilee",
  "Jude",
  "Judith",
  "Julia",
  "Julius (centurion)",
  "Justus",
  "Kenan",
  "Keturah",
  "King Saul",
  "Korah",
  "Laban",
  "Lamech",
  "Lazarus",
  "Leah",
  "Levi",
  "Levi (son of Jacob)",
  "Levi (tax collector)",
  "Linus",
  "Lot",
  "Luke",
  "Lydia",
  "Mahalalel",
  "Malachi",
  "Malchus",
  "Manasseh",
  "Manasseh (son of Joseph)",
  "Manoah",
  "Mark",
  "Martha",
  "Mary (mother of Jesus)",
  "Mary Magdalene",
  "Mattathias",
  "Matthew",
  "Matthias",
  "Medan",
  "Melchizedek",
  "Menelaus",
  "Meshach",
  "Methuselah",
  "Micah",
  "Michal",
  "Midian",
  "Milcah",
  "Miriam",
  "Mishael",
  "Mnason",
  "Mordecai",
  "Moses",
  "Nahor",
  "Nahum",
  "Naomi",
  "Naphtali",
  "Nathan",
  "Nathan (prophet)",
  "Nebuchadnezzar",
  "Nehemiah",
  "Nereus",
  "Nicanor",
  "Nicodemus",
  "Nicolaus",
  "Noah",
  "Nympha",
  "Obadiah",
  "Obed",
  "Oholiab",
  "Olympas",
  "Onesimus",
  "Onesiphorus",
  "Onias",
  "Othniel",
  "Parmenas",
  "Patrobas",
  "Paul",
  "Pekah",
  "Peleg",
  "Perez",
  "Persis",
  "Peter",
  "Philemon",
  "Philip",
  "Philip (apostle)",
  "Philip (evangelist)",
  "Philologus",
  "Phinehas",
  "Phinehas (priest)",
  "Phlegon",
  "Phoebe",
  "Phygelus",
  "Pontius Pilate",
  "Priscilla",
  "Prochorus",
  "Publius",
  "Pudens",
  "Quartus",
  "Rabshakeh",
  "Rachel",
  "Rahab",
  "Rebekah",
  "Rehoboam",
  "Reu",
  "Rufus",
  "Ruth",
  "Samson",
  "Samuel",
  "Sanballat",
  "Sapphira",
  "Sarah",
  "Saul (king of Israel)",
  "Saul (later Paul)",
  "Secundus",
  "Sennacherib",
  "Sergius Paulus",
  "Serug",
  "Seth",
  "Shadrach",
  "Shallum",
  "Shamgar",
  "Shaphan",
  "Shealtiel",
  "Shem",
  "Shemaiah",
  "Shimei",
  "Shuah",
  "Silas",
  "Simeon",
  "Simeon (son of Jacob)",
  "Simon Maccabeus",
  "Simon Magus",
  "Simon of Cyrene",
  "Simon the Pharisee",
  "Simon the Tanner",
  "Simon the Zealot",
  "Solomon",
  "Sopater",
  "Stachys",
  "Stephen",
  "Susanna",
  "Susanna (Daniel)",
  "Susanna (Luke)",
  "Syntyche",
  "Tabitha",
  "Tamar",
  "Terah",
  "Thaddeus",
  "Theophilus",
  "Theudas",
  "Thomas",
  "Tiglath-Pileser",
  "Timon",
  "Timothy",
  "Titus",
  "Tobiah",
  "Tobiah (Ammonite)",
  "Tobiah (son of Tobit)",
  "Tobit",
  "Tryphaena",
  "Tryphosa",
  "Tychicus",
  "Urbanus",
  "Uriah (prophet)",
  "Uriah the Hittite",
  "Uzziah",
  "Vashti",
  "Zacchaeus",
  "Zadok",
  "Zebulun",
  "Zechariah",
  "Zechariah (father of John the Baptist)",
  "Zedekiah",
  "Zedekiah (false prophet)",
  "Zenas",
  "Zephaniah",
  "Zephaniah (priest)",
  "Zerah",
  "Zerubbabel",
  "Zimran",
  "Zipporah",
  "Zophar",
];

// Convert names to BiblePerson objects
function createStaticPeople(): BiblePerson[] {
  return STATIC_PEOPLE_NAMES.map((name, index) => ({
    id: `static-${index}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name: name,
    normalized_name: name.toLowerCase().trim(),
  }));
}

function normalizePersonMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*•\s+/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function PeopleInTheBiblePage() {
  const [people] = useState<BiblePerson[]>(createStaticPeople());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<BiblePerson | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);

  // Filter and sort people
  const filteredPeople = useMemo(() => {
    let filtered = people;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.normalized_name.includes(query)
      );
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter((person) =>
        person.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [people, searchQuery, selectedLetter]);

  // Group people by first letter for alphabet index
  const peopleByLetter = useMemo(() => {
    const grouped: Record<string, BiblePerson[]> = {};
    people.forEach((person) => {
      const firstLetter = person.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(person);
    });
    return grouped;
  }, [people]);

  // Generate notes when a person is selected
  useEffect(() => {
    async function generateNotes() {
      if (!selectedPerson) {
        setPersonNotes(null);
        return;
      }

      try {
        setLoadingNotes(true);
        setNotesError(null);

        // Generate notes using ChatGPT
        // Determine gender for pronoun usage (simple heuristic - can be improved)
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(selectedPerson.name);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";
        
        const prompt = `Generate detailed notes about ${selectedPerson.name} from the Bible using this EXACT markdown template structure. The person's name is already shown in the header - DO NOT include the name as a heading.

CRITICAL: You MUST use proper markdown formatting with # headers (single hash), double line breaks, and proper structure. The output will be rendered as markdown.

TEMPLATE TO GENERATE (USE EXACT MARKDOWN SYNTAX):

# 👤 Who ${whoPronoun} Is

(two short paragraphs)



# 📖 Their Role in the Story

(two to three short paragraphs)



# 🔥 Key Moments

- (short sentence)

- (short sentence)

- (short sentence)

- (short sentence)



# 📍 Where You Find ${pronoun}

- Book Chapter–Chapter

- Book Chapter–Chapter

- Book Chapter–Chapter



# 🌱 Why This Person Matters

(two to three short paragraphs)



MARKDOWN FORMATTING RULES (MANDATORY):
- Use # for ALL section headers (single hash mark)
- Use TWO blank lines (double line break) between each section
- Use - (hyphen) for ALL bullet points (key moments and locations) - NOT bullet dots
- DO NOT include the person's name in any header
- Keep paragraphs short
- Total length ~200–300 words
- Use emojis in headers exactly as shown
- Double line breaks between sections
- Cinematic, clear, Bible-study tone
- No filler phrases, no meta commentary`;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to generate notes: ${response.statusText}. ${errorText}`);
        }

        const json = await response.json();
        let generated = (json?.reply as string) ?? "";

        if (!generated || generated.trim().length === 0) {
          throw new Error("Generated notes are empty.");
        }

        // Display the generated notes directly (no database saving)
        setPersonNotes(generated);
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPerson]);

  // Scroll to letter section
  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery(""); // Clear search when selecting a letter
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HEADER */}
      <header className="w-full pt-4 pb-4 border-b border-gray-200 bg-white/60 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">People in the Bible</h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Meet the real people of the Bible
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          {/* SEARCH BAR */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null); // Clear letter filter when searching
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-6">
            {/* ALPHABET INDEX (LEFT SIDE) */}
            <div className="hidden md:block w-12 flex-shrink-0">
              <div className="sticky top-4 space-y-1">
                {ALPHABET.map((letter) => {
                  const hasPeople = peopleByLetter[letter] && peopleByLetter[letter].length > 0;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => scrollToLetter(letter)}
                      className={`w-full py-1 text-xs text-center rounded transition ${
                        selectedLetter === letter
                          ? "bg-blue-500 text-white font-semibold"
                          : hasPeople
                          ? "text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 cursor-default"
                      }`}
                      disabled={!hasPeople}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1">
              {filteredPeople.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchQuery || selectedLetter
                    ? "No people found. Try a different search or letter."
                    : "No people available yet."}
                  {(searchQuery || selectedLetter) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="block mx-auto mt-2 text-blue-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedLetter ? (
                    // Show only selected letter section
                    <div id={`letter-${selectedLetter}`}>
                      <h2 className="text-xl font-semibold mb-4">{selectedLetter}</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {filteredPeople.map((person) => (
                          <button
                            key={person.id}
                            type="button"
                            onClick={() => setSelectedPerson(person)}
                            className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                          >
                            {person.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Show all people grouped by letter
                    ALPHABET.map((letter) => {
                      const letterPeople = filteredPeople.filter((person) =>
                        person.name.toUpperCase().startsWith(letter)
                      );

                      if (letterPeople.length === 0) return null;

                      return (
                        <div key={letter} id={`letter-${letter}`}>
                          <h2 className="text-xl font-semibold mb-4">{letter}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {letterPeople.map((person) => (
                              <button
                                key={person.id}
                                type="button"
                                onClick={() => setSelectedPerson(person)}
                                className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                              >
                                {person.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PERSON PROFILE MODAL */}
      {selectedPerson && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedPerson(null);
                setPersonNotes(null);
                setNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedPerson.name}</h2>
            {selectedPerson.testament && (
              <p className="text-sm text-gray-600 mb-6">
                {selectedPerson.testament} Testament
              </p>
            )}

            {loadingNotes ? (
              <div className="text-center py-12 text-gray-500">
                Loading notes...
              </div>
            ) : notesError ? (
              <div className="text-center py-12 text-red-600">
                {notesError}
              </div>
            ) : personNotes ? (
              <div>
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4" {...props} />
                    ),
                  }}
                >
                  {normalizePersonMarkdown(personNotes)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No notes available yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

