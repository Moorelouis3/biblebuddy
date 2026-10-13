/**
 * Lock-screen controls for Bible Buddy's audio (Louis, 2026-10-11).
 *
 * Chapter audio and the Bible in One Year narration are long - often twenty
 * minutes or more. People listen with the phone in a pocket, and today the
 * moment the screen locks there is nothing to look at and nothing to press:
 * no title, no pause, no skip. They have to unlock, find the tab and scroll.
 *
 * navigator.mediaSession fixes that with no plugin and no native code. iOS
 * puts the title and artwork on the lock screen and in Control Centre, wires
 * the hardware and headphone buttons, and shows a working scrubber. It is a
 * web API, so this improves the website and the PWA at the same time as the
 * store app.
 *
 * What it does NOT do is keep audio running after the screen locks inside the
 * app - that needs UIBackgroundModes "audio" in Info.plist, which is Xcode
 * work. This is the half that can be written and shipped now; without it the
 * background mode would play audio with a blank lock screen.
 */

type MediaSessionTrack = {
  title: string;
  artist?: string;
  album?: string;
};

type MediaSessionHandlers = {
  onPlay: () => void;
  onPause: () => void;
  onSeek?: (seconds: number) => void;
  onSeekBy?: (offsetSeconds: number) => void;
};

/** Square artwork for the lock screen; the app icon is already the right shape. */
const ARTWORK = [
  { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
  { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
];

function session(): MediaSession | null {
  if (typeof navigator === "undefined") return null;
  return navigator.mediaSession ?? null;
}

export function setMediaSessionTrack(track: MediaSessionTrack | null): void {
  const ms = session();
  if (!ms) return;
  try {
    if (!track) {
      ms.metadata = null;
      return;
    }
    ms.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist ?? "Bible Buddy",
      album: track.album ?? "Bible Buddy",
      artwork: ARTWORK,
    });
  } catch {
    // MediaMetadata missing on older webviews. The controls still work.
  }
}

export function setMediaSessionHandlers(handlers: MediaSessionHandlers | null): void {
  const ms = session();
  if (!ms) return;

  const set = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
    try {
      ms.setActionHandler(action, handler);
    } catch {
      // Not every action is supported on every platform; skipping one is fine.
    }
  };

  if (!handlers) {
    for (const action of ["play", "pause", "stop", "seekto", "seekforward", "seekbackward"] as const) {
      set(action, null);
    }
    return;
  }

  set("play", () => handlers.onPlay());
  set("pause", () => handlers.onPause());
  set("stop", () => handlers.onPause());

  if (handlers.onSeek) {
    set("seekto", (details) => {
      if (typeof details.seekTime === "number") handlers.onSeek?.(details.seekTime);
    });
  }
  if (handlers.onSeekBy) {
    // The 10/30 second skips on the lock screen. Default to 15, which is what
    // iOS uses when the handler does not specify.
    set("seekforward", (details) => handlers.onSeekBy?.(details.seekOffset ?? 15));
    set("seekbackward", (details) => handlers.onSeekBy?.(-(details.seekOffset ?? 15)));
  }
}

export function setMediaSessionPlaying(isPlaying: boolean): void {
  const ms = session();
  if (!ms) return;
  try {
    ms.playbackState = isPlaying ? "playing" : "paused";
  } catch {
    // Read-only on some platforms.
  }
}

/** Drives the lock-screen scrubber. Safe to call often. */
export function setMediaSessionPosition(audio: HTMLAudioElement): void {
  const ms = session();
  if (!ms || typeof ms.setPositionState !== "function") return;
  try {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (duration <= 0) return;
    ms.setPositionState({
      duration,
      playbackRate: audio.playbackRate || 1,
      // Clamped: a position past duration throws, and currentTime can
      // momentarily exceed it at the very end of a track.
      position: Math.min(Math.max(audio.currentTime || 0, 0), duration),
    });
  } catch {
    // Ignore - a missing scrubber is not worth breaking playback over.
  }
}

export function clearMediaSession(): void {
  setMediaSessionTrack(null);
  setMediaSessionHandlers(null);
  const ms = session();
  if (!ms) return;
  try {
    ms.playbackState = "none";
  } catch {
    // Ignore.
  }
}
