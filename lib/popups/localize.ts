/**
 * A popup from lib/popups/catalog.ts in the reader's language.
 *
 * The catalog stays the one list, in English: the admin Popups tab, the
 * reports and the rules all read it as it is. This only swaps the words a
 * person reads, at the moment the popup is drawn.
 *
 * English readers get the catalog entry untouched, so the catalog is the only
 * source of English. Every other language looks each field up under
 * `shell.popup.<popup id>.<field>` (lib/i18n/messages/<lang>/shell.ts) and
 * keeps the catalog's English for any field that has no key.
 */

import { en, type MessageKey } from "../i18n/messages/en";
import type { Translate } from "../i18n/useT";
import type { PopupDefinition } from "./catalog";

export function localizePopup(popup: PopupDefinition, t: Translate): PopupDefinition {
  if (t.language === "en") return popup;
  const base = `shell.popup.${popup.id}`;
  const say = (field: string, english: string): string => {
    const key = `${base}.${field}`;
    return english && key in en ? t(key as MessageKey) : english;
  };

  const headline = say("headline", popup.headline);
  const accent = say("headlineAccent", popup.headlineAccent);
  const event = popup.event;
  const poster = event?.poster;

  return {
    ...popup,
    pill: say("pill", popup.pill),
    headline,
    // The underlined words must end the headline (FeaturePopup slices them off it).
    headlineAccent: headline.endsWith(accent) ? accent : "",
    description: say("description", popup.description),
    cardTitle: say("cardTitle", popup.cardTitle),
    cardLine: say("cardLine", popup.cardLine),
    steps: popup.steps.map((step, index) => ({
      title: say(`step${index + 1}.title`, step.title),
      detail: say(`step${index + 1}.detail`, step.detail),
    })),
    cta: { ...popup.cta, label: say("cta", popup.cta.label) },
    ctaInSection: say("ctaInSection", popup.ctaInSection),
    footnote: say("footnote", popup.footnote),
    event: event
      ? {
          ...event,
          facts: [say("fact1", event.facts[0]), say("fact2", event.facts[1])],
          bullets: event.bullets.map((bullet, index) => say(`bullet${index + 1}`, bullet)),
          doneTitle: say("doneTitle", event.doneTitle),
          doneLine: say("doneLine", event.doneLine),
          poster: poster
            ? {
                ...poster,
                alt: say("poster.alt", poster.alt),
                title: [say("poster.title1", poster.title[0]), say("poster.title2", poster.title[1])],
                lead: [say("poster.lead1", poster.lead[0]), say("poster.lead2", poster.lead[1])],
                features: poster.features.map((feature, index) => ({
                  ...feature,
                  title: say(`poster.feature${index + 1}.title`, feature.title),
                  text: say(`poster.feature${index + 1}.text`, feature.text),
                })),
                verse: say("poster.verse", poster.verse),
                verseRef: say("poster.verseRef", poster.verseRef),
                ctaLabel: say("poster.cta", poster.ctaLabel),
              }
            : undefined,
        }
      : undefined,
  };
}
