export type ExodusTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyOneRawNotes(rawText: string): ExodusTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Exodus 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+21:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Exodus\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 21:${startVerse}` : `Exodus 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 21 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_ONE_RAW_NOTES = `# Exodus 21:1-6

# ⛓️ Laws About Hebrew Servants

---

## ⚖️ Now These Are The Judgments Which Thou Shalt Set Before Them

Judgments here means case laws, specific practical rulings applying the Ten Commandments' broad principles to real, everyday situations Israel would actually face as a functioning community.

⚖️ Judgments means specific case laws applying broad principles to real situations

---

## ⛓️ If Thou Buy An Hebrew Servant, Six Years He Shall Serve

This describes debt servitude, a common ancient practice where someone paid off debt through labor, not the chattel slavery later practiced in other historical periods. Six years had a fixed, guaranteed limit.

⛓️ This describes debt servitude with a fixed limit, not permanent chattel slavery

---

## 👂 His Master Shall Bore His Ear Through With An Aul; And He Shall Serve Him For Ever

An aul was a sharp, pointed tool. A servant who genuinely loved his household could choose permanent service voluntarily, marked by a visible, physical sign at the doorpost, the threshold representing the household itself.

👂 An aul was a sharp, pointed tool used for this voluntary, permanent marking

🚪 The doorpost symbolized the household the servant was freely choosing to stay in

# Exodus 21:7-11

# 👰 Protections For Female Servants

---

## 👰 If A Man Sell His Daughter To Be A Maidservant, She Shall Not Go Out As The Menservants Do

This describes a specific arrangement functioning more like a marriage contract than ordinary servitude, since verse 8 shows she was intended for betrothal, requiring different protective rules than male servants.

👰 This arrangement functioned more like a marriage contract than ordinary servitude

---

## 🚫 To Sell Her Unto A Strange Nation He Shall Have No Power, Seeing He Hath Dealt Deceitfully With Her

This law specifically protects a vulnerable woman from being resold or mistreated, holding the man accountable if he fails to follow through on the marriage arrangement he initiated.

🚫 This protects a vulnerable woman from being resold if the arrangement falls through

---

## 🍞 Her Food, Her Raiment, And Her Duty Of Marriage, Shall He Not Diminish

Even if another wife is later taken, this woman's basic provisions, including marital rights, must still be fully maintained, real protection against being quietly neglected or abandoned.

🍞 This guarantees continued provision and marital rights even if another wife is added

# Exodus 21:12-14

# ⚖️ Murder Versus Accidental Death

---

## ⚔️ He That Smiteth A Man, So That He Die, Shall Be Surely Put To Death

Intentional murder carries the death penalty, treating the deliberate taking of human life with the utmost seriousness under this legal system.

⚔️ Deliberate, intentional murder carries the most serious penalty available

---

## 🏃 If A Man Lie Not In Wait, But God Deliver Him Into His Hand ... I Will Appoint Thee A Place Whither He Shall Flee

This distinguishes accidental killing from murder, promising a designated safe place, later developed into the full cities of refuge system described in the book of Numbers.

🏃 This distinguishes accidental death from murder, promising protection for the innocent

📖 This anticipates the full cities of refuge system later detailed in Numbers

---

## 🔪 If A Man Come Presumptuously Upon His Neighbour, To Slay Him With Guile ... Thou Shalt Take Him From Mine Altar

Presumptuously means deliberately and arrogantly. Even claiming sanctuary at God's own altar cannot protect someone guilty of premeditated murder, guile meaning deceitful trickery, closing off any legal loophole for calculated killing.

🔪 Presumptuously means deliberately and arrogantly; guile means deceitful trickery

⚖️ Even altar sanctuary cannot protect someone guilty of premeditated murder

# Exodus 21:15-17

# 👨‍👩‍👧 Serious Offenses Against Family

---

## 👊 He That Smiteth His Father, Or His Mother, Shall Be Surely Put To Death

Physically attacking a parent receives the same severe penalty as murder, showing how seriously this legal system protected family authority and honor within the household structure.

👊 Striking a parent carries the same severe penalty as murder itself

---

## 🚫 He That Stealeth A Man, And Selleth Him ... Shall Surely Be Put To Death

This law directly criminalizes kidnapping specifically for the purpose of selling another person into slavery, treating human trafficking as a capital offense under this legal system.

🚫 This directly criminalizes kidnapping someone to sell them into slavery

---

## 🗣️ He That Curseth His Father, Or His Mother, Shall Surely Be Put To Death

Cursing here means a serious, deliberate act of contempt and rejection toward parental authority, not simply an angry word spoken in a moment of frustration.

🗣️ Cursing here means deliberate, serious contempt, not a single angry outburst

# Exodus 21:18-21

# 🥊 Injury In A Fight

---

## 🥊 If He Rise Again, And Walk Abroad Upon His Staff, Then Shall He That Smote Him Be Quit

If an injured person recovers enough to walk again, even with support, the person who caused the injury is cleared of serious criminal liability, though still responsible for lost wages and medical costs.

🥊 Recovery clears serious criminal liability, though financial responsibility still remains

---

## 💰 He Shall Pay For The Loss Of His Time, And Shall Cause Him To Be Thoroughly Healed

This establishes real financial accountability, covering both lost income during recovery and the full cost of proper medical care, practical restitution for genuine harm caused.

💰 This requires covering both lost wages and complete medical care costs

# Exodus 21:22-27

# ⚖️ Serious Injury And "Eye For Eye"

---

## 👶 If Men Strive, And Hurt A Woman With Child, So That Her Fruit Depart From Her

This addresses accidental injury to a pregnant woman during an unrelated conflict, taking seriously the harm caused even when it wasn't the direct, intended target of the fight.

👶 This takes seriously unintended harm to a bystander during an unrelated conflict

---

## 👁️ Eye For Eye, Tooth For Tooth, Hand For Hand, Foot For Foot

This famous principle, called lex talionis, actually functioned as a limiting principle, restricting punishment to match the actual harm done, preventing excessive revenge rather than encouraging literal mutilation in practice.

👁️ This principle limited punishment to match actual harm, preventing excessive revenge

⚖️ In practice, this was typically applied through fair financial compensation, not literal retaliation

---

## 🦷 If A Man Smite The Eye Of His Servant ... He Shall Let Him Go Free For His Eye's Sake

Even servants receive real legal protection here, an owner causing permanent injury must grant immediate freedom, a genuine deterrent against abuse within a servitude system that still had real limits.

🦷 Servants received real protection: causing permanent injury required granting freedom

# Exodus 21:28-32

# 🐂 Laws About A Goring Ox

---

## 🐂 If An Ox Gore A Man Or A Woman, That They Die: Then The Ox Shall Be Surely Stoned

Even an animal's dangerous, deadly behavior receives formal legal address, though the primary consequence falls on the dangerous animal itself in a first, unprecedented incident.

🐂 Even a dangerous animal's fatal behavior receives formal, structured legal address

---

## ⚠️ If The Ox Were Wont To Push ... And It Hath Been Testified To His Owner, And He Hath Not Kept Him In

Wont means accustomed or habitual. If an owner already knew about a pattern of dangerous behavior and failed to act, he himself becomes legally liable too, not just the animal, real accountability for known, ignored risk.

⚠️ Wont means habitual, and known danger left unaddressed makes the owner liable too

---

## 💰 He Shall Give Unto Their Master Thirty Shekels Of Silver, And The Ox Shall Be Stoned

This same principle extends to protect servants specifically, setting a defined compensation amount, this same value later becomes significant again as the price paid to betray Jesus in the New Testament.

💰 This exact sum later becomes significant again as the price paid to betray Jesus

# Exodus 21:33-36

# 🕳️ Liability For Pits And Animals

---

## 🕳️ If A Man Shall Open A Pit ... And Not Cover It, And An Ox Or An Ass Fall Therein

This addresses everyday negligence, an uncovered pit left as a hazard, holding the person who created the dangerous condition financially responsible for resulting damage to someone else's property.

🕳️ This holds someone financially responsible for negligently created hazards

---

## 🐂 If One Man's Ox Hurt Another's, That He Die; Then They Shall Sell The Live Ox, And Divide The Money Of It

When there's no prior warning of danger, both parties share the loss fairly, splitting the value between them, a reasonable solution for a genuinely unexpected accident between equals.

🐂 Losses get shared fairly when the incident was a genuinely unexpected accident

---

## 📖 If It Be Known That The Ox Hath Used To Push In Time Past ... He Shall Surely Pay Ox For Ox

Once again, prior knowledge of danger changes the outcome entirely, an owner who ignored a known, dangerous pattern bears full responsibility for the resulting loss, not a shared burden.

📖 Known, ignored danger removes any shared responsibility, placing full liability on the owner`;

export const EXODUS_TWENTY_ONE_PERSONAL_SECTIONS = parseExodusTwentyOneRawNotes(EXODUS_TWENTY_ONE_RAW_NOTES);
