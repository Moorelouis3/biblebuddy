declare module "ffmpeg-static" {
  /** Absolute path to the bundled ffmpeg binary, or null if unavailable. */
  const ffmpegPath: string | null;
  export default ffmpegPath;
}
