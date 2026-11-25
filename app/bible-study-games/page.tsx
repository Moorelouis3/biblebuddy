import GamesMenu from "@/components/games/GamesMenu";

/**
 * The Games tab's landing page. It used to redirect straight to trivia
 * (Louis, 2026-09-02: the games button "should lead with the scrambled or
 * trivia page"), then became four plain rows; since 2026-11-25 it is the menu
 * in components/games/GamesMenu.tsx, built from Louis's mock-up. Scrambled
 * left the page on 2026-11-23.
 */
export default function BibleStudyGamesPage() {
  return <GamesMenu />;
}
