type Props = {
  className?: string;
};

export default function AppLoadingScreen({ className = "" }: Props) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-black px-6 text-white ${className}`}>
      <div className="flex flex-col items-center text-center">
        <img
          src="/NewNewNewNewIcon.png"
          alt="Bible Buddy"
          className="h-44 w-44 object-contain drop-shadow-[0_18px_42px_rgba(255,255,255,0.18)] sm:h-56 sm:w-56"
        />
        <p className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Bible Buddy</p>
      </div>
    </div>
  );
}
