# Images needed for The Obedience of Abraham (1–15 November)

Four images, same house style as the Proverbs set. Give ChatGPT one prompt at
a time, download the result, and drop it in the path listed. Nothing in the
images should contain **text** — the titles are drawn by the app on top.

House style, repeated in every prompt below so each image matches:
photoreal cinematic oil-painting look, deep near-black background, warm gold
and amber light, strong rim lighting, dark vignette at the edges.

---

## 1. Event header art — the one the page needs now

Save as: `public/events/abraham-banner-art.png` (square, 1024×1024)

> A photoreal cinematic painting of Abraham as an old Hebrew patriarch standing
> outdoors at night, head tilted back, looking up at a sky full of stars. Long
> grey beard, weathered sunburnt face, simple coarse desert robes in cream and
> deep brown, a staff in one hand. Behind him the dark outline of a tent and the
> edge of a desert plain. The sky is near-black with thousands of small stars
> and a warm gold glow low on the horizon lighting one side of his face. Heavy
> gold and amber palette, strong rim lighting, dark vignette at the edges, deep
> near-black background. Square composition, the figure slightly right of
> centre, plenty of dark empty sky on the left. Oil painting realism, highly
> detailed, no text, no lettering, no watermark.

Why the left side must stay dark and empty: the page lays the title and the
"15 days to go" badge over the left half of this image.

## 2. Email banner — for the launch newsletter

Save as: `public/events/abraham-email-banner.jpg` (landscape, 1536×1024)

> Same subject and style as above, but a wide landscape composition: Abraham
> standing small on the right under an enormous star-filled night sky over the
> desert, the horizon low, the left two thirds of the frame open sky. Photoreal
> cinematic oil painting, deep near-black background, warm gold and amber light,
> dark vignette. No text, no lettering, no watermark.

## 3. Pop-up image, desktop

Save as: `public/events/abraham-popup-desktop.png` (landscape, 1536×1024)

> A photoreal cinematic painting of God's covenant with Abraham: an old
> patriarch kneeling on desert ground at night with both arms raised, a shaft of
> warm gold light breaking through the dark sky onto him, stars scattered across
> the blackness above. Coarse cream and brown robes, long grey beard. Landscape
> composition with the figure centred and large, empty dark sky above his head.
> Heavy gold and amber palette, strong rim lighting, dark vignette, deep
> near-black background. Oil painting realism, no text, no lettering.

## 4. Pop-up image, mobile

Save as: `public/events/abraham-popup-mobile.png` (square, 1024×1024)

> The same covenant scene as above, recomposed tight and square: Abraham from
> the waist up, arms raised, face lit gold from above, stars behind him. Same
> photoreal cinematic style, deep near-black background, gold and amber light,
> dark vignette. No text, no lettering.

---

After the files are in `public/events/`, the header art is picked up
automatically (`bannerArt` in `lib/communityEvents.ts`). The two pop-up images
are only needed when the launch pop-up is switched on for Abraham, the way
`ProverbsLaunchPopup` works for October.
