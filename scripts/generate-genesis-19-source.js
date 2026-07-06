const fs = require("fs");
const path = require("path");

const attachmentPath = "C:\\Users\\Moore\\.codex\\attachments\\77e0f9fe-a430-4470-a009-953959a01604\\pasted-text.txt";
const outputPath = path.join(__dirname, "..", "lib", "genesisNineteenSource.ts");

const raw = fs.readFileSync(attachmentPath, "utf8");

const out = `export type GenesisNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisNineteenRawNotes(rawText: string): GenesisNineteenPersonalSection[] {
  const lines = rawText.replace(/\\r\\n/g, "\\n").trim().split("\\n");
  const sections: GenesisNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\\s+(.+?)\\s+Genesis\\s+19:(\\d+)(?:[â€“â€”-](\\d+))?\\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch = lines[index]?.trim().match(/^##\\s+(.+)$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 19 section title after verse " + startVerse);
    }
    const title = sectionTitleMatch[1].trim();
    index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\\s+/.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^###\\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseTitle = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^###\\s+/.test(lines[index].trim()) &&
        !/^#\\s+/.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 19 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 19:" + startVerse
          : "Genesis 19:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 19 sections, received " + sections.length);
  }

  return sections;
}

export const GENESIS_NINETEEN_RAW_NOTES = ${JSON.stringify(raw)};

export const GENESIS_NINETEEN_PERSONAL_SECTIONS = parseGenesisNineteenRawNotes(GENESIS_NINETEEN_RAW_NOTES);
`;

fs.writeFileSync(outputPath, out, "utf8");
