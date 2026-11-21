#!/usr/bin/env node
/**
 * Draws the Light and Dark tiles for the Bible Cover shelf
 * (public/covers/light-thumb.webp, dark-thumb.webp): a miniature Bible Buddy
 * home screen - greeting, stats, Verse of the Day, a bookshelf with real study
 * covers - so the two plain looks sit beside the picture covers as something
 * worth choosing (Louis, 2026-11-21: "it looks lame next to the covers").
 * Drawn, not screenshotted, so no reader's name or numbers end up on it.
 *   node scripts/generate-mode-thumbs.mjs
 */
import sharp from "sharp";

const W = 600, H = 800;

const MODES = {
  light: {
    bg: "#F4F7FC", bg2: "#E8F0FE", card: "#FFFFFF", border: "#DBE7F4",
    text: "#0E1A3A", sub: "#5F6B85", accent: "#0056FD", accentText: "#FFFFFF",
    chips: ["#FFF3E6", "#EEFAF3", "#F5F2FF"], chipBorder: ["#F4DCC8", "#CDE9DC", "#DDD6F3"],
    verseBg: "url(#verseLight)", nav: "#FFFFFF", navDot: "#C6D2E4", shadow: 0.1,
  },
  dark: {
    bg: "#0B1017", bg2: "#111A26", card: "#161D28", border: "#2A3444",
    text: "#F1F5F9", sub: "#94A3B8", accent: "#6EA4FF", accentText: "#06142E",
    chips: ["#161D28", "#161D28", "#161D28"], chipBorder: ["#2A3444", "#2A3444", "#2A3444"],
    verseBg: "url(#verseDark)", nav: "#161D28", navDot: "#3A475B", shadow: 0.45,
  },
};

const COVERS = [
  "public/beginning-of-everything-cover.webp",
  "public/Wisdomofproverbsnewcover.png",
  "public/bible-in-one-year-cover.png",
];

function svg(m) {
  const chip = (x, i, n, label) => `
    <rect x="${x}" y="168" width="168" height="72" rx="20" fill="${m.chips[i]}" stroke="${m.chipBorder[i]}" stroke-width="2"/>
    <circle cx="${x + 32}" cy="204" r="15" fill="${i === 1 ? "none" : m.accent}" opacity="${i === 1 ? 1 : 0.85}" stroke="${m.accent}" stroke-width="${i === 1 ? 6 : 0}"/>
    <text x="${x + 58}" y="202" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="900" fill="${m.text}">${n}</text>
    <text x="${x + 58}" y="226" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${m.sub}">${label}</text>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="page" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.bg2}"/><stop offset="0.5" stop-color="${m.bg}"/></linearGradient>
    <linearGradient id="verseLight" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EDE7FF"/><stop offset="0.6" stop-color="#F7E9F2"/><stop offset="1" stop-color="#FFE9D6"/></linearGradient>
    <linearGradient id="verseDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#161D28"/><stop offset="0.7" stop-color="#18233A"/><stop offset="1" stop-color="#1E3156"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#page)"/>
  <!-- top bar -->
  <text x="36" y="58" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="900" fill="${m.text}">Bible Buddy</text>
  <circle cx="470" cy="50" r="22" fill="${m.card}" stroke="${m.border}" stroke-width="2"/>
  <circle cx="528" cy="50" r="22" fill="${m.accent}" opacity="0.9"/>
  <!-- greeting -->
  <text x="36" y="128" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="900" fill="${m.text}">Good morning</text>
  <text x="36" y="154" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="${m.sub}">Let's grow closer to God today.</text>
  ${chip(36, 0, "12", "Day Streak")}${chip(216, 1, "13%", "of Bible")}${chip(396, 2, "L5", "Level")}
  <!-- verse of the day -->
  <rect x="36" y="262" width="528" height="208" rx="28" fill="${m.verseBg}" stroke="${m.border}" stroke-width="2"/>
  <text x="62" y="302" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="900" letter-spacing="3" fill="${m.sub}">VERSE OF THE DAY</text>
  <text x="62" y="348" font-family="Georgia, 'Times New Roman', serif" font-size="27" font-weight="700" fill="${m.text}">Be still, and know</text>
  <text x="62" y="384" font-family="Georgia, 'Times New Roman', serif" font-size="27" font-weight="700" fill="${m.text}">that I am God.</text>
  <text x="62" y="430" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="900" fill="${m.accent}">Psalm 46:10 · KJV</text>
  <!-- bookshelf -->
  <text x="36" y="522" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="${m.text}">Your Bookshelf</text>
  ${[0, 1, 2].map((i) => `<rect x="${36 + i * 180}" y="540" width="168" height="230" rx="20" fill="${m.card}" stroke="${m.border}" stroke-width="2"/>`).join("")}
  ${[0, 1, 2].map((i) => `<rect x="${52 + i * 180}" y="736" width="136" height="20" rx="10" fill="${i === 0 ? m.accent : m.border}"/>`).join("")}
  <!-- bottom nav -->
  <rect x="120" y="776" width="360" height="56" rx="28" fill="${m.nav}" stroke="${m.border}" stroke-width="2" opacity="0.98"/>
  ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${168 + i * 66}" cy="804" r="${i === 0 ? 12 : 9}" fill="${i === 0 ? m.accent : m.navDot}"/>`).join("")}
</svg>`);
}

for (const [name, m] of Object.entries(MODES)) {
  const covers = await Promise.all(
    COVERS.map((src) => sharp(src).resize(136, 176, { fit: "cover", position: "top" }).png().toBuffer()),
  );
  const rounded = await Promise.all(
    covers.map((buf) =>
      sharp(buf)
        .composite([{ input: Buffer.from(`<svg width="136" height="176"><rect width="136" height="176" rx="12" fill="#fff"/></svg>`), blend: "dest-in" }])
        .png()
        .toBuffer(),
    ),
  );
  // Composite at full size first: sharp resizes before it composites when
  // both are in one pipeline, which put the covers outside the frame.
  const full = await sharp(svg(m))
    .composite(rounded.map((input, i) => ({ input, left: 52 + i * 180, top: 552 })))
    .png()
    .toBuffer();
  await sharp(full)
    .resize(300, 400)
    .webp({ quality: 82 })
    .toFile(`public/covers/${name}-thumb.webp`);
  console.log(`public/covers/${name}-thumb.webp`);
}
