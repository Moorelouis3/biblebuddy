import { permanentRedirect } from "next/navigation";
import { WISDOM_BOOKS_PAGE_PATH } from "../../../../lib/wisdomOfProverbsProducts";

// The printed-books page moved to /books/wisdom-of-proverbs (2026-09-22).
export default function EventBooksRedirect() {
  permanentRedirect(WISDOM_BOOKS_PAGE_PATH);
}
