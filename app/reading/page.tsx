import BibleMenu from "../../components/bible/BibleMenu";
import RequireAccount from "../../components/RequireAccount";

/**
 * The Bible tab's landing page: every book of the Bible.
 *
 * Since 2026-11-26 the menu itself is components/bible/BibleMenu.tsx, built
 * from Louis's mock-up (a picture per book, tabs, search, progress). Before
 * that this file was the menu: a plain two-column list of names.
 *
 * Members only, since 2026-11-08. Another way into the reader, so it locks
 * with it - a wall around the chapters with their index left open is not a
 * wall. See components/RequireAccount.
 */
export default function ReadingPage() {
  return (
    <RequireAccount>
      <BibleMenu />
    </RequireAccount>
  );
}
