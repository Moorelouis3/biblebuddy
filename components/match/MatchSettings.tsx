"use client";

/**
 * The one Settings panel of Bible Buddy Match: music and sound effects on or
 * off. Opened from the home screen's gear and from the gear at the bottom of
 * every board (Louis, 2026-11-23: "a settings button to stop the music and
 * sounds"). The choices live in this device's storage (bb:clue-music,
 * bb:clue-sound), the same keys lib/match/sound.ts reads.
 */

import { useEffect, useState } from "react";
import { matchMusicOn, setMatchMusicOn } from "@/lib/match/sound";

export default function MatchSettings({ onClose }: { onClose: () => void }) {
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setSound(window.localStorage.getItem("bb:clue-sound") !== "off");
        setMusic(matchMusicOn());
      } catch {}
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    try {
      window.localStorage.setItem("bb:clue-sound", next ? "on" : "off");
    } catch {}
  };
  return (
    <div className="bbm-panelwrap" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bbm-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        <button
          type="button"
          className="bbm-btn-cream"
          onClick={() => {
            setMatchMusicOn(!music);
            setMusic(!music);
          }}
        >
          Music: {music ? "On" : "Off"}
        </button>
        <button type="button" className="bbm-btn-cream" onClick={toggleSound}>
          Sound effects: {sound ? "On" : "Off"}
        </button>
        <button type="button" className="bbm-btn-green" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
