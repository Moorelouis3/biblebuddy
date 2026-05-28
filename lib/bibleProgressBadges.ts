export type BibleProgressBadge = {
  percent: number;
  title: string;
  shortTitle: string;
  symbol: string;
  colors: {
    from: string;
    to: string;
    ring: string;
  };
};

export const BIBLE_PROGRESS_BADGES: BibleProgressBadge[] = [
  { percent: 0, title: "Starter", shortTitle: "Starter", symbol: "0", colors: { from: "#253448", to: "#121b28", ring: "#8ea0b8" } },
  { percent: 5, title: "Seeker", shortTitle: "Seeker", symbol: "S", colors: { from: "#274060", to: "#1a2638", ring: "#7fb3ff" } },
  { percent: 10, title: "First Steps", shortTitle: "Steps", symbol: "10", colors: { from: "#2f4c3f", to: "#182b25", ring: "#8de7b7" } },
  { percent: 15, title: "Path Finder", shortTitle: "Path", symbol: "15", colors: { from: "#4c3c68", to: "#261d36", ring: "#c6a7ff" } },
  { percent: 20, title: "Word Walker", shortTitle: "Walker", symbol: "20", colors: { from: "#61452d", to: "#2d2118", ring: "#f2ba76" } },
  { percent: 25, title: "Quarter Way", shortTitle: "25%", symbol: "25", colors: { from: "#245260", to: "#142b34", ring: "#75d5ea" } },
  { percent: 30, title: "Faith Builder", shortTitle: "Builder", symbol: "30", colors: { from: "#5a2f44", to: "#2b1722", ring: "#f397bd" } },
  { percent: 35, title: "Scripture Student", shortTitle: "Student", symbol: "35", colors: { from: "#475229", to: "#242b17", ring: "#c8e57b" } },
  { percent: 40, title: "Steady Disciple", shortTitle: "Steady", symbol: "40", colors: { from: "#263f65", to: "#142035", ring: "#8fbaff" } },
  { percent: 45, title: "Covenant Keeper", shortTitle: "Keeper", symbol: "45", colors: { from: "#5b3f2c", to: "#2b1f17", ring: "#e3b06d" } },
  { percent: 50, title: "Halfway Pilgrim", shortTitle: "Halfway", symbol: "50", colors: { from: "#245c50", to: "#142f2b", ring: "#69e3c9" } },
  { percent: 55, title: "Wisdom Seeker", shortTitle: "Wisdom", symbol: "55", colors: { from: "#4f4965", to: "#252333", ring: "#bab5ff" } },
  { percent: 60, title: "Kingdom Learner", shortTitle: "Kingdom", symbol: "60", colors: { from: "#624f25", to: "#2f2613", ring: "#f1d071" } },
  { percent: 65, title: "Prophet Listener", shortTitle: "Listener", symbol: "65", colors: { from: "#56324e", to: "#291827", ring: "#e99cda" } },
  { percent: 70, title: "Truth Bearer", shortTitle: "Truth", symbol: "70", colors: { from: "#245075", to: "#13283b", ring: "#72c2ff" } },
  { percent: 75, title: "Promise Holder", shortTitle: "Promise", symbol: "75", colors: { from: "#38613b", to: "#1b301e", ring: "#8be993" } },
  { percent: 80, title: "Gospel Ready", shortTitle: "Gospel", symbol: "80", colors: { from: "#63333a", to: "#2f181c", ring: "#f1969e" } },
  { percent: 85, title: "Grace Runner", shortTitle: "Grace", symbol: "85", colors: { from: "#2f5b6a", to: "#172c34", ring: "#8bdcf2" } },
  { percent: 90, title: "Revelation Watcher", shortTitle: "Watcher", symbol: "90", colors: { from: "#4d3869", to: "#251b35", ring: "#c7a2ff" } },
  { percent: 95, title: "Final Stretch", shortTitle: "Final", symbol: "95", colors: { from: "#66582d", to: "#302a17", ring: "#f0dd84" } },
  { percent: 100, title: "Bible Finisher", shortTitle: "Finisher", symbol: "100", colors: { from: "#12604c", to: "#0b3028", ring: "#3cf0bc" } },
];

export function getBibleProgressBadge(overallPercent: number) {
  const safePercent = Math.max(0, Math.min(100, Math.floor(overallPercent || 0)));
  return [...BIBLE_PROGRESS_BADGES].reverse().find((badge) => safePercent >= badge.percent) || BIBLE_PROGRESS_BADGES[0];
}
