"use client";

/**
 * The site-wide Bible version, as a hook: `[version, setVersion]`, shaped like
 * the `useState` it replaces in the readers.
 *
 * It starts on "kjv" (what the server renders, and the app's own default),
 * then takes the reader's saved choice once the page is on screen, and keeps
 * in step with a change made on any other screen. See
 * lib/bibleVersionPreference.ts for where the choice lives and who obeys it.
 *
 * In its own file because a module with a hook in it cannot be imported by a
 * server route, and the preference functions themselves have no such limit.
 */

import { useCallback, useEffect, useState } from "react";
import {
  onBibleVersionChange,
  pullBibleVersionFromAccount,
  readPreferredBibleVersion,
  savePreferredBibleVersion,
  type BibleVersion,
} from "./bibleVersionPreference";

export function useBibleVersion(): [BibleVersion, (version: BibleVersion) => void] {
  const [version, setVersion] = useState<BibleVersion>("kjv");

  useEffect(() => {
    const adopt = () => {
      const saved = readPreferredBibleVersion();
      if (saved) setVersion(saved);
    };
    adopt();
    const stop = onBibleVersionChange(adopt);
    void pullBibleVersionFromAccount();
    return stop;
  }, []);

  const choose = useCallback((next: BibleVersion) => {
    setVersion(next);
    savePreferredBibleVersion(next);
  }, []);

  return [version, choose];
}
