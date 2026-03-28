export type BibleReferenceAliasEntry = {
  canonical: string;
  aliases: string[];
};

export const EXTRA_BIBLE_PERSON_ALIASES: BibleReferenceAliasEntry[] = [
  { canonical: "Paul", aliases: ["Apostle Paul", "Paul the Apostle", "Saul of Tarsus"] },
  { canonical: "Peter", aliases: ["Simon son of Jonah", "Simon Bar-Jonah", "Apostle Peter"] },
  { canonical: "Matthew", aliases: ["Matthew the tax collector", "Levi the tax collector"] },
  { canonical: "Thomas", aliases: ["Thomas Didymus"] },
  { canonical: "Mary Magdalene", aliases: ["Mary of Magdala"] },
  { canonical: "Mark", aliases: ["John Mark", "Mark the Evangelist"] },
  { canonical: "Luke", aliases: ["Luke the physician", "Luke the doctor"] },
  { canonical: "John the Baptist", aliases: ["John the Baptizer"] },
  { canonical: "Jesus", aliases: ["Christ Jesus", "Jesus the Messiah", "Lord Jesus", "Lord Jesus Christ"] },
];

export const EXTRA_BIBLE_PLACE_ALIASES: BibleReferenceAliasEntry[] = [
  { canonical: "Gennesaret (lake)", aliases: ["Sea of Galilee", "Lake of Gennesaret", "Lake Gennesaret", "Sea of Tiberias"] },
  { canonical: "Gethsemane (garden)", aliases: ["Garden of Gethsemane"] },
  { canonical: "City of David (Jerusalem)", aliases: ["City of David"] },
  { canonical: "Patmos (island)", aliases: ["Isle of Patmos"] },
  { canonical: "Bethlehem of Judea", aliases: ["Bethlehem Judah", "Bethlehem in Judea"] },
  { canonical: "Bethlehem Ephrathah", aliases: ["Bethlehem Ephratah"] },
  { canonical: "Garden of Eden", aliases: ["Eden garden"] },
  { canonical: "Kidron (brook)", aliases: ["Brook Kidron"] },
  { canonical: "Galilee (region)", aliases: ["Region of Galilee"] },
  { canonical: "Jerusalem", aliases: ["Holy City"] },
];

export const EXTRA_BIBLE_KEYWORD_ALIASES: BibleReferenceAliasEntry[] = [
  { canonical: "Holy Spirit", aliases: ["Holy Ghost"] },
  { canonical: "Word of God", aliases: ["word became flesh"] },
  { canonical: "Son of Man", aliases: ["the Son of Man"] },
  { canonical: "Son of God", aliases: ["the Son of God"] },
  { canonical: "Bread of Life", aliases: ["bread from heaven"] },
  { canonical: "Living Water", aliases: ["living waters"] },
  { canonical: "Fear of the Lord", aliases: ["fear of God"] },
  { canonical: "Day of the Lord", aliases: ["day of Yahweh"] },
  { canonical: "Chief Cornerstone", aliases: ["corner stone"] },
];
