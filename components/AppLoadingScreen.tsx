import Image from "next/image";

type Props = {
  className?: string;
};

export default function AppLoadingScreen({ className = "" }: Props) {
  return (
    <div
      className={`relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-white ${className}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-6 text-center">
        <Image
          src="/TherealiconforBB.png"
          alt="Bible Buddy"
          width={112}
          height={112}
          priority
          className="h-24 w-24 rounded-[24px] object-cover sm:h-28 sm:w-28"
        />
        <p className="mt-4 text-2xl font-black tracking-tight text-[#111827] sm:text-[2rem]">
          BibleBuddy
        </p>
        <div className="mt-8 w-44 sm:w-52">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#dbe7f4] sm:h-2">
            <div className="bb-loading-bar h-full rounded-full bg-[#0056FD] shadow-[0_0_14px_rgba(0,86,253,0.24)]" />
          </div>
          <span className="sr-only">Loading Bible Buddy</span>
        </div>
      </div>

      <style>{`
        @keyframes bb-loading-sweep {
          0% { transform: translateX(-110%); width: 38%; }
          45% { width: 64%; }
          100% { transform: translateX(275%); width: 38%; }
        }
        .bb-loading-bar {
          animation: bb-loading-sweep 1.45s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
