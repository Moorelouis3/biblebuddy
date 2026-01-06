"use client";

import { useState, useEffect, useMemo } from "react";
import { type BiblePerson } from "../../lib/biblePeople";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_PEOPLE_LIST } from "../../lib/biblePeopleList";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Static list of Bible people names (legacy - now using BIBLE_PEOPLE_LIST)
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
  // Use the new comprehensive list with aliases
  return BIBLE_PEOPLE_LIST.map((entry, index) => ({
    id: `static-${index}-${entry.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name: entry.name,
    normalized_name: entry.name.toLowerCase().trim(),
  }));
}

function normalizePersonMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
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
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

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

  // Load user ID and completion state
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoadingProgress(false);
          return;
        }

        setUserId(user.id);

        // Extract username from user metadata (same pattern as dashboard)
        const meta: any = user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);

        // Fetch all completed people for this user (batch query)
        const { data, error } = await supabase
          .from("people_progress")
          .select("person_name")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error loading people progress:", error);
        } else {
          const completedSet = new Set<string>();
          data?.forEach((row) => {
            // Store normalized name (lowercase, trimmed) for matching
            completedSet.add(row.person_name.toLowerCase().trim());
          });
          setCompletedPeople(completedSet);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoadingProgress(false);
      }
    }

    loadUserAndProgress();
  }, []);

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

        const personNameKey = selectedPerson.name.toLowerCase().trim();

        // STEP 1: Check database FIRST (mandatory short-circuit)
        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("[bible_people_notes] Error checking bible_people_notes:", existingError);
        }

        // MANDATORY SHORT-CIRCUIT: If notes exist, return immediately
        // DO NOT continue to generation - this prevents duplicate ChatGPT calls
        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          console.log(`[bible_people_notes] Found existing notes for ${selectedPerson.name}, returning immediately (ChatGPT will NOT be called)`);
          setPersonNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // GUARANTEE: If we reach here, notes do NOT exist in database
        // This is the ONLY path where ChatGPT should be called
        let notesText = "";

        // STEP 2: Generate notes using ChatGPT
        // Determine gender for pronoun usage (simple heuristic - can be improved)
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(selectedPerson.name);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";
        
        const prompt = `You are Little Louis. Generate Bible study style notes for ${selectedPerson.name} from Scripture using the EXACT markdown structure below.

CRITICAL RENDERING RULES (MANDATORY):
- Use ONLY markdown
- Use SINGLE # for all section headers
- INSERT TWO FULL LINE BREAKS AFTER EVERY SECTION
- INSERT TWO FULL LINE BREAKS AFTER EVERY PARAGRAPH GROUP
- DO NOT use markdown bullet characters (*, -, •)
- Use EMOJIS as bullets instead
- Emojis must start each bullet line
- No hyphens anywhere
- No compact spacing
- Spacing matters more than word count

The person's name is already shown in the UI. DO NOT include their name as a header.

---

TEMPLATE (FOLLOW EXACTLY):

# 👤 Who ${whoPronoun} Is

Write two short paragraphs explaining who this person is.





# 📖 Their Role in the Story

Write two to three short paragraphs explaining what role this person plays in the biblical narrative.





# 🔥 Key Moments

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.





# 📍 Where You Find ${pronoun}

📖 Book Chapter range

📖 Book Chapter range

📖 Book Chapter range





# 🌱 Why This Person Matters

Write two to three short paragraphs explaining why this person is important and what we learn from them.





FINAL RULES:
- Every section must be separated by TWO blank lines
- Every paragraph block must be separated by TWO blank lines
- Do not compress content
- No lists without emojis
- Keep it cinematic, Bible study focused, and clear`;

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
        const generated = (json?.reply as string) ?? "";

        if (!generated || generated.trim().length === 0) {
          throw new Error("Generated notes are empty.");
        }

        // STEP 3: Race condition protection - check again before saving
        const { data: existingCheck, error: checkError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error("[bible_people_notes] Error checking for duplicates:", checkError);
        }

        // MANDATORY: If row exists now, use it and DO NOT save (another request created it)
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          console.log(`[bible_people_notes] Notes were created by another request for ${selectedPerson.name}, using existing (skipping save)`);
          notesText = existingCheck.notes_text;
        } else {
          // No row exists - upsert to handle race conditions gracefully
          console.log(`[bible_people_notes] Upserting notes for ${selectedPerson.name}`);
          const { error: upsertError } = await supabase
            .from("bible_people_notes")
            .upsert(
              {
                person_name: personNameKey,
                notes_text: generated,
              },
              {
                onConflict: "person_name",
              }
            );

          if (upsertError) {
            console.error("[bible_people_notes] Error upserting notes to bible_people_notes:", upsertError);
            // Continue to use generated text even if save fails
            notesText = generated;
          } else {
            // STEP 4: Re-read from database (never trust in-memory generated text)
            const { data: savedData, error: readError } = await supabase
              .from("bible_people_notes")
              .select("notes_text")
              .eq("person_name", personNameKey)
              .maybeSingle();

            if (readError) {
              console.error("[bible_people_notes] Error re-reading notes:", readError);
              notesText = generated;
            } else if (savedData?.notes_text) {
              notesText = savedData.notes_text;
            } else {
              notesText = generated;
            }
          }
        }

        setPersonNotes(notesText);
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
          {/* SEARCH BAR AND RESET BUTTON */}
          <div className="mb-6 flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search for a name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null); // Clear letter filter when searching
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
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
                        {filteredPeople.map((person) => {
                          const personKey = person.name.toLowerCase().trim();
                          const isCompleted = completedPeople.has(personKey);
                          return (
                            <button
                              key={person.id}
                              type="button"
                              onClick={() => setSelectedPerson(person)}
                              className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                isCompleted
                                  ? "bg-green-50 border-green-300 hover:bg-green-100"
                                  : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                              }`}
                            >
                              {person.name}
                            </button>
                          );
                        })}
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
                            {letterPeople.map((person) => {
                              const personKey = person.name.toLowerCase().trim();
                              const isCompleted = completedPeople.has(personKey);
                              return (
                                <button
                                  key={person.id}
                                  type="button"
                                  onClick={() => setSelectedPerson(person)}
                                  className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                    isCompleted
                                      ? "bg-green-50 border-green-300 hover:bg-green-100"
                                      : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                                  }`}
                                >
                                  {person.name}
                                </button>
                              );
                            })}
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
                  }}
                >
                  {normalizePersonMarkdown(personNotes)}
                </ReactMarkdown>

                {/* MARK AS FINISHED BUTTON */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const personKey = selectedPerson.name.toLowerCase().trim();
                      const isCompleted = completedPeople.has(personKey);
                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            // Prevent event from bubbling up
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId) return;

                            const personNameKey = selectedPerson.name.toLowerCase().trim();

                            try {
                              if (isCompleted) {
                                // TOGGLE: Unmark as learned
                                const { error } = await supabase
                                  .from("people_progress")
                                  .delete()
                                  .eq("user_id", userId)
                                  .eq("person_name", personNameKey);

                                if (error) {
                                  console.error("Error unmarking person as finished:", error);
                                  alert("Failed to unmark as finished. Please try again.");
                                } else {
                                  // Decrement profile_stats.people_learned_count
                                  const { data: currentStats, error: statsFetchError } = await supabase
                                    .from("profile_stats")
                                    .select("people_learned_count, username")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  if (statsFetchError && statsFetchError.code !== 'PGRST116') {
                                    console.error("Error fetching profile_stats:", statsFetchError);
                                  } else {
                                    // Calculate new count (never go below 0)
                                    const currentCount = currentStats?.people_learned_count || 0;
                                    const newCount = Math.max(0, currentCount - 1);

                                    // Use existing username if available
                                    const finalUsername = currentStats?.username || username || "User";

                                    // Update with decremented count
                                    const { error: statsUpdateError } = await supabase
                                      .from("profile_stats")
                                      .upsert(
                                        {
                                          user_id: userId,
                                          username: finalUsername,
                                          people_learned_count: newCount,
                                          updated_at: new Date().toISOString(),
                                        },
                                        {
                                          onConflict: "user_id",
                                        }
                                      );

                                    if (statsUpdateError) {
                                      console.error("Error updating profile_stats:", statsUpdateError);
                                    }
                                  }

                                  // Update local state - remove from completed set
                                  setCompletedPeople((prev) => {
                                    const next = new Set(prev);
                                    next.delete(personNameKey);
                                    return next;
                                  });
                                  // Close the modal after unmarking
                                  setSelectedPerson(null);
                                  setPersonNotes(null);
                                  setNotesError(null);
                                }
                              } else {
                                // Mark as learned (existing logic)
                                // Insert completion
                                const { error } = await supabase
                                  .from("people_progress")
                                  .upsert(
                                    {
                                      user_id: userId,
                                      person_name: personNameKey,
                                    },
                                    {
                                      onConflict: "user_id,person_name",
                                    }
                                  );

                                if (error) {
                                  console.error("Error marking person as finished:", error);
                                  alert("Failed to mark as finished. Please try again.");
                                } else {
                                  // ACTION TRACKING: Insert into master_actions
                                  // Get username if not already loaded
                                  let actionUsername = username;
                                  if (!actionUsername && userId) {
                                    const { data: { user } } = await supabase.auth.getUser();
                                    if (user) {
                                      const meta: any = user.user_metadata || {};
                                      actionUsername =
                                        meta.firstName ||
                                        meta.first_name ||
                                        (user.email ? user.email.split("@")[0] : null) ||
                                        "User";
                                    }
                                  }

                                  const { error: actionError } = await supabase
                                    .from("master_actions")
                                    .insert({
                                      user_id: userId,
                                      username: actionUsername || "User",
                                      action_type: "person_learned",
                                      reference_type: "person",
                                      reference_id: personNameKey,
                                    });

                                  if (actionError) {
                                    console.error("Error logging action to master_actions:", actionError);
                                    // Don't block the UI - continue even if action logging fails
                                  }

                                  // ACTION TRACKING: Increment profile_stats.people_learned_count
                                  // Get username if not already loaded
                                  let statsUsername = username;
                                  if (!statsUsername && userId) {
                                    const { data: { user } } = await supabase.auth.getUser();
                                    if (user) {
                                      const meta: any = user.user_metadata || {};
                                      statsUsername =
                                        meta.firstName ||
                                        meta.first_name ||
                                        (user.email ? user.email.split("@")[0] : null) ||
                                        "User";
                                    }
                                  }

                                  // First, ensure the row exists (upsert with default values)
                                  const { data: currentStats, error: statsFetchError } = await supabase
                                    .from("profile_stats")
                                    .select("people_learned_count, username")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  if (statsFetchError && statsFetchError.code !== 'PGRST116') {
                                    console.error("Error fetching profile_stats:", statsFetchError);
                                  } else {
                                    // Calculate new count
                                    const currentCount = currentStats?.people_learned_count || 0;
                                    const newCount = currentCount + 1;

                                    // Use existing username if available, otherwise use extracted username
                                    const finalUsername = currentStats?.username || statsUsername || "User";

                                    // Upsert with incremented count and username (creates row if doesn't exist)
                                    const { error: statsUpdateError } = await supabase
                                      .from("profile_stats")
                                      .upsert(
                                        {
                                          user_id: userId,
                                          username: finalUsername,
                                          people_learned_count: newCount,
                                          updated_at: new Date().toISOString(),
                                        },
                                        {
                                          onConflict: "user_id",
                                        }
                                      );

                                    if (statsUpdateError) {
                                      console.error("Error updating profile_stats:", statsUpdateError);
                                    }
                                  }

                                  // Update local state
                                  setCompletedPeople((prev) => {
                                    const next = new Set(prev);
                                    next.add(personNameKey);
                                    return next;
                                  });
                                  // Close the modal after marking as finished
                                  setSelectedPerson(null);
                                  setPersonNotes(null);
                                  setNotesError(null);
                                }
                              }
                            } catch (err) {
                              console.error("Error toggling person as finished:", err);
                              alert("Failed to update. Please try again.");
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition ${
                            isCompleted
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {isCompleted
                            ? `✓ Unmark ${selectedPerson.name} as finished`
                            : `Mark ${selectedPerson.name} as finished`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No notes available yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Reset Progress</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to reset your People in the Bible progress? This will remove all completion marks and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!userId) {
                    setShowResetModal(false);
                    return;
                  }

                  try {
                    const { error } = await supabase
                      .from("people_progress")
                      .delete()
                      .eq("user_id", userId);

                    if (error) {
                      console.error("Error resetting progress:", error);
                      alert("Failed to reset progress. Please try again.");
                    } else {
                      // Reset profile_stats.people_learned_count to 0
                      const { data: currentStats } = await supabase
                        .from("profile_stats")
                        .select("username")
                        .eq("user_id", userId)
                        .maybeSingle();

                      const finalUsername = currentStats?.username || username || "User";

                      const { error: statsError } = await supabase
                        .from("profile_stats")
                        .upsert(
                          {
                            user_id: userId,
                            username: finalUsername,
                            people_learned_count: 0,
                            updated_at: new Date().toISOString(),
                          },
                          {
                            onConflict: "user_id",
                          }
                        );

                      if (statsError) {
                        console.error("Error resetting profile_stats:", statsError);
                        // Don't block UI - continue even if stats reset fails
                      }

                      // Clear local state
                      setCompletedPeople(new Set());
                      setShowResetModal(false);
                    }
                  } catch (err) {
                    console.error("Error resetting progress:", err);
                    alert("Failed to reset progress. Please try again.");
                  }
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

