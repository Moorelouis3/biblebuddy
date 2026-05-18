type Props = {
  className?: string;
};

export default function AppLoadingScreen({ className = "" }: Props) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-white px-6 text-slate-950 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <p className="text-3xl font-black tracking-tight sm:text-4xl">Bible Buddy</p>
        <p className="mt-3 text-sm font-semibold text-slate-500">Loading...</p>
      </div>
    </div>
  );
}
