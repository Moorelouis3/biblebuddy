"use client";

// Slim "Add to Home Screen" banner shown under the app header on the home
// screen. Purely presentational — HomeInstallBanner owns the display rules,
// environment detection, and persistence.

type InstallBannerProps = {
  onAdd?: () => void;
  onDontShowAgain?: () => void;
  /** Override copy, e.g. the in-app-browser "open in Safari or Chrome" message. */
  headline?: string;
  subline?: string;
  /** Hide the Add link when tapping it can't do anything (in-app browsers). */
  showAddLink?: boolean;
};

export default function InstallBanner({
  onAdd,
  onDontShowAgain,
  headline = "Add Bible Buddy to your home screen",
  subline = "Opens like an app. Keeps your streak in reach.",
  showAddLink = true,
}: InstallBannerProps) {
  return (
    <div className="mx-auto mb-3 w-full max-w-xl px-1">
      <style>{`
        @keyframes bbInstallPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(47, 127, 232, 0); }
          50% { box-shadow: 0 0 0 7px rgba(47, 127, 232, 0.2); }
        }
        @keyframes bbInstallSheen {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        .bb-install-pulse { animation: bbInstallPulse 1.7s ease-in-out 3 both; }
        .bb-install-sheen { animation: bbInstallSheen 2.4s ease-in-out 3 both; }
        @media (prefers-reduced-motion: reduce) {
          .bb-install-pulse, .bb-install-sheen { animation: none !important; }
        }
      `}</style>
      <section className="relative overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3 shadow-[0_10px_24px_rgba(14,26,58,0.08)]">
        <div
          aria-hidden
          className="bb-install-sheen pointer-events-none absolute inset-y-0 left-0 w-[70px] bg-[linear-gradient(100deg,rgba(47,127,232,0)_0%,rgba(47,127,232,0.10)_50%,rgba(47,127,232,0)_100%)]"
        />
        <div className="flex items-center gap-3">
          <img
            src="/icons/icon-192.png"
            alt=""
            width={38}
            height={38}
            className="h-[38px] w-[38px] shrink-0 rounded-[11px] shadow-[0_2px_6px_rgba(14,26,58,0.25)]"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-snug text-[var(--bb-text-primary,#111827)]">{headline}</p>
            <p className="mt-0.5 text-xs leading-snug text-[var(--bb-text-secondary,#4b5563)]">{subline}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-5 pl-[50px]">
          {showAddLink ? (
            <button
              type="button"
              onClick={onAdd}
              className="bb-install-pulse -ml-1.5 rounded-lg px-1.5 py-0.5 text-sm font-extrabold text-[var(--bb-accent,#2f7fe8)]"
            >
              Add
            </button>
          ) : null}
          <button
            type="button"
            onClick={onDontShowAgain}
            className="text-xs font-medium text-[color-mix(in_srgb,var(--bb-text-secondary,#4b5563)_60%,transparent)]"
          >
            Don&apos;t show again
          </button>
        </div>
      </section>
    </div>
  );
}
