import Image from "next/image";

type Props = {
  className?: string;
};

export default function AppLoadingScreen({ className = "" }: Props) {
  return (
    <div
      className={`relative flex min-h-screen min-h-[100svh] overflow-hidden bg-[#0757f2] ${className}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[#0757f2]" />
      <Image
        src="/desktoploading.png"
        alt="Bible Buddy is loading"
        fill
        priority
        sizes="100vw"
        className="hidden object-contain object-center sm:block"
      />
      <Image
        src="/mobileloading.png"
        alt="Bible Buddy is loading"
        fill
        priority
        sizes="100vw"
        className="object-contain object-center sm:hidden"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[15vh] flex justify-center sm:bottom-[13vh]">
        <div className="w-[170px] sm:w-[240px]">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/25 shadow-[0_0_24px_rgba(255,255,255,0.22)] sm:h-2">
            <div className="bb-loading-bar h-full rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.85)]" />
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
