import { IMAGE_THUMBS } from "./imageThumbs.generated";

/**
 * The small copy of a picture, for the places that draw it small.
 *
 * Study covers are 500 to 900 KB each and were downloaded at full size to be
 * shown as thumbnails. scripts/make-image-thumbs.mjs writes a 400 px WebP of
 * each and lists them; this looks a picture up in that list.
 *
 * Anything not in the list comes back unchanged: a cover added since the
 * script last ran, a picture in Supabase storage, an empty value. So it is
 * always safe to wrap a src in this, and it is only right to do so where the
 * cover is drawn small (up to about 200 px wide). A cover shown large should
 * keep the original.
 */
export function imageThumb<T extends string | null | undefined>(src: T): T | string {
  if (!src) return src;
  return IMAGE_THUMBS[src] ?? src;
}
