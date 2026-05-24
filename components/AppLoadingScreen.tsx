type Props = {
  className?: string;
};

export default function AppLoadingScreen({ className = "" }: Props) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center px-6 ${className}`}
      style={{ backgroundColor: "#F5F7FA", color: "#111827" }}
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-3xl font-black tracking-tight sm:text-4xl">Bible Buddy</p>
        <p className="mt-3 text-sm font-semibold" style={{ color: "#6B7280" }}>Loading...</p>
      </div>
    </div>
  );
}
