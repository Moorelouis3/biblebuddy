"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { type BiblePerson } from "../../lib/biblePeople";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_PEOPLE_LIST } from "../../lib/biblePeopleList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";
import CreditLimitModal from "../../components/CreditLimitModal";
import CreditEducationModal from "../../components/CreditEducationModal";
// Utility to get/set session flag for education modal
const EDUCATION_MODAL_SESSION_KEY = "bbCreditEducationModalShown";

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
    // Credit state for modal logic
    const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null; ignore_credit_phase1: boolean | null } | null>(null);
    const prevCreditsRef = useRef<number | null>(null);
    const [showEducationModal, setShowEducationModal] = useState(false);
    // Fetch profile_stats for credit state (now includes ignore_credit_phase1)
    useEffect(() => {
      async function fetchProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await supabase
          .from("profile_stats")
          .select("is_paid, daily_credits, ignore_credit_phase1")
          .eq("user_id", user.id)
          .maybeSingle();
        if (!error && data) {
          setProfile({
            is_paid: data.is_paid === true,
            daily_credits: typeof data.daily_credits === "number" ? data.daily_credits : null,
            ignore_credit_phase1: data.ignore_credit_phase1 === true,
          });
          prevCreditsRef.current = typeof data.daily_credits === "number" ? data.daily_credits : null;
        }
      }
      fetchProfile();
    }, []);

    // Listen for credit changes (simulate: poll every 2s for demo, or update after credit use)
    useEffect(() => {
      if (!profile || profile.is_paid || profile.ignore_credit_phase1) return;
      const interval = setInterval(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await supabase
          .from("profile_stats")
          .select("is_paid, daily_credits, ignore_credit_phase1")
          .eq("user_id", user.id)
          .maybeSingle();
        if (!error && data && data.is_paid !== true && data.ignore_credit_phase1 !== true) {
          const prev = prevCreditsRef.current;
          const curr = typeof data.daily_credits === "number" ? data.daily_credits : null;
          const shouldTrigger = prev === 5 && curr === 4;
          console.log("PHASE1 DEBUG:", {
            isPaid: data.is_paid,
            previousCredits: prev,
            newCredits: curr,
            ignoreCreditPhase1: data.ignore_credit_phase1,
            shouldTrigger
          });
          // Only trigger if prev was 5, now 4, and ignore_credit_phase1 is false
          if (shouldTrigger) {
            setShowEducationModal(true);
          }
          prevCreditsRef.current = curr;
        }
      }, 2000);
      return () => clearInterval(interval);
    }, [profile]);
    // Modal close handler
    const handleCloseEducationModal = () => setShowEducationModal(false);
    // When user sets ignore, update profile state
    const handleSetIgnore = () => {
      setProfile((prev) => prev ? { ...prev, ignore_credit_phase1: true } : prev);
    };
  const [people] = useState<BiblePerson[]>(createStaticPeople());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<BiblePerson | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());

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

  // Handle person selection with study view limit check
  const handlePersonClick = async (person: BiblePerson) => {
    if (!userId) {
      // Not logged in - allow access (they'll need to log in to see notes anyway)
      setSelectedPerson(person);
      return;
    }

    console.log("[PEOPLE_PAGE] Person clicked:", person.name);

    // Log study view for analytics (no restrictions)
    const insertSuccess = await logStudyView(userId, username, "person");
    if (!insertSuccess) {
      console.error("[PEOPLE_PAGE] Failed to log study_view, but allowing access anyway");
    }

    // Allow access
    setSelectedPerson(person);
  };

  // Generate notes when a person is selected
  useEffect(() => {
    if (!selectedPerson) {
      setPersonNotes(null);
      setPersonCreditBlocked(false);
      return;
    }

    if (userId && loadingProgress) {
      setLoadingNotes(true);
      setNotesError(null);
      setPersonNotes(null);
      setPersonCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      try {
        setLoadingNotes(true);
        setNotesError(null);
        setPersonNotes(null);
        setPersonCreditBlocked(false);

        const person = selectedPerson;
        if (!person) {
          return;
        }

        const personNameKey = person.name.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedPeople.has(personNameKey);

          if (!isCompleted) {
            const isViewed = viewedPeople.has(personNameKey);

            if (!isViewed) {
              console.log("PHASE1 DEBUG: Credit BEFORE API call", profile?.daily_credits);
              const creditResponse = await fetch("/api/consume-credit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  actionType: ACTION_TYPE.person_viewed,
                }),
              });

              if (!creditResponse.ok) {
                setPersonCreditBlocked(true);
                return;
              }

              const creditResult = (await creditResponse.json()) as {
              // After API call, re-fetch profile to get updated credits
              const { data: afterData, error: afterError } = await supabase
                .from("profile_stats")
                .select("daily_credits")
                .eq("user_id", userId)
                .maybeSingle();
              console.log("PHASE1 DEBUG: Credit AFTER API call", afterData?.daily_credits);
                ok: boolean;
                reason?: string;
              };

              if (!creditResult.ok) {
                setPersonCreditBlocked(true);
                return;
              }

              setViewedPeople((prev) => {
                const next = new Set(prev);
                next.add(personNameKey);
                return next;
              });
            }
          }
        }

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
          console.log(`[bible_people_notes] Found existing notes for ${person.name}, returning immediately (ChatGPT will NOT be called)`);
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
  }, [selectedPerson, userId, loadingProgress, completedPeople, viewedPeople]);

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
        {/* PHASE 1 EDUCATION MODAL */}
        <CreditEducationModal
          open={showEducationModal}
          onClose={handleCloseEducationModal}
          userId={userId}
          ignoreCreditPhase1={!!profile?.ignore_credit_phase1}
          onSetIgnore={handleSetIgnore}
        />
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
                        {filteredPeople.map((person) => {
                          const personKey = person.name.toLowerCase().trim();
                          const isCompleted = completedPeople.has(personKey);
                          return (
                            <button
                              key={person.id}
                              type="button"
                              onClick={() => handlePersonClick(person)}
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
                                  onClick={() => handlePersonClick(person)}
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

            {personCreditBlocked ? null : loadingNotes ? (
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

                            if (isCompleted) {
                              // Already completed - do nothing
                              return;
                            }

                            try {
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
                                // Always fetch username fresh from auth to ensure we have the correct value
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = "User"; // Default fallback
                                
                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                console.log(`[MASTER_ACTIONS] Inserting with username: ${actionUsername}, user_id: ${userId}`);

                                // Format person name for action_label (capitalize properly)
                                const formatPersonName = (name: string): string => {
                                  return name.split(' ').map(word => {
                                    if (/^\d+$/.test(word)) return word; // Keep numbers as-is
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                  }).join(' ');
                                };

                                const personDisplayName = formatPersonName(selectedPerson.name);

                                // Insert into master_actions with action_label
                                console.log("[MASTER_ACTIONS] inserting:", { action_type: ACTION_TYPE.person_learned, action_label: personDisplayName });
                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: ACTION_TYPE.person_learned,
                                    action_label: personDisplayName,
                                  });

                                if (actionError) {
                                  console.error("Error logging action to master_actions:", actionError);
                                  console.error("Attempted username:", actionUsername);
                                  // Don't block the UI - continue even if action logging fails
                                } else {
                                  console.log(`[MASTER_ACTIONS] Successfully logged person_learned: ${personDisplayName}`);
                                }

                                // UPDATE profile_stats: Count from people_progress table
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

                                // Count all people_progress rows for this user
                                const { count, error: countError } = await supabase
                                  .from("people_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (countError) {
                                  console.error("Error counting people_progress:", countError);
                                  alert(`Failed to update stats: ${countError.message}`);
                                } else {
                                  console.log(`[PEOPLE LEARNED] Count from database: ${count}`);
                                  
                                  // Get existing username if available
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select("username, chapters_completed_count, notes_created_count, places_discovered_count, keywords_mastered_count")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername = currentStats?.username || statsUsername || "User";
                                  
                                  // Calculate total_actions as sum of all counts
                                  const totalActions = 
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (currentStats?.keywords_mastered_count || 0);

                                  // Update profile_stats with count from database
                                  const { error: statsUpdateError } = await supabase
                                    .from("profile_stats")
                                    .upsert(
                                      {
                                        user_id: userId,
                                        username: finalUsername,
                                        people_learned_count: count || 0,
                                        total_actions: totalActions,
                                        updated_at: new Date().toISOString(),
                                      },
                                      {
                                        onConflict: "user_id",
                                      }
                                    );

                                  if (statsUpdateError) {
                                    console.error("Error updating profile_stats:", statsUpdateError);
                                    alert(`Failed to update profile stats: ${statsUpdateError.message}`);
                                  } else {
                                    console.log(`[PEOPLE LEARNED] Successfully updated profile_stats.people_learned_count to ${count}`);
                                    
                                    // Also update notes_created_count by counting from notes table
                                    const { count: notesCount, error: notesCountError } = await supabase
                                      .from("notes")
                                      .select("*", { count: "exact", head: true })
                                      .eq("user_id", userId);

                                    if (!notesCountError && notesCount !== null) {
                                      // Get all counts to calculate total_actions
                                      const { data: allStats } = await supabase
                                        .from("profile_stats")
                                        .select("chapters_completed_count, people_learned_count, places_discovered_count, keywords_mastered_count")
                                        .eq("user_id", userId)
                                        .maybeSingle();

                                      const totalActions = 
                                        (allStats?.chapters_completed_count || 0) +
                                        (notesCount || 0) +
                                        (allStats?.people_learned_count || 0) +
                                        (allStats?.places_discovered_count || 0) +
                                        (allStats?.keywords_mastered_count || 0);

                                      const { error: notesUpdateError } = await supabase
                                        .from("profile_stats")
                                        .update({
                                          notes_created_count: notesCount || 0,
                                          total_actions: totalActions,
                                        })
                                        .eq("user_id", userId);

                                      if (!notesUpdateError) {
                                        console.log(`[NOTES COUNT] Updated notes_created_count to ${notesCount}`);
                                      }
                                    }
                                  }
                                }

                                // Update local state
                                setCompletedPeople((prev) => {
                                  const next = new Set(prev);
                                  next.add(personNameKey);
                                  return next;
                                });
                                
                                // Trigger button animation
                                setIsAnimating(true);
                                
                                // Close the modal after animation completes
                                setTimeout(() => {
                                  setSelectedPerson(null);
                                  setPersonNotes(null);
                                  setNotesError(null);
                                  setIsAnimating(false);
                                }, 400); // Animation duration: 200ms scale down + 200ms scale up
                              }
                            } catch (err) {
                              console.error("Error marking person as finished:", err);
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={isAnimating ? {
                            animation: 'scale-down-bounce 0.4s ease-in-out'
                          } : undefined}
                        >
                          {isCompleted
                            ? `✓ ${selectedPerson.name} marked as finished`
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

      <CreditLimitModal
        open={personCreditBlocked}
        userId={userId}
        onClose={() => {
          setPersonCreditBlocked(false);
          setSelectedPerson(null);
          setPersonNotes(null);
          setNotesError(null);
        }}
      />

    </div>
  );
}

