type UpgradeSuccessPageProps = {
  searchParams?: Promise<{ returnTo?: string }> | { returnTo?: string };
};

export default async function UpgradeSuccessPage({ searchParams }: UpgradeSuccessPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawReturnTo = typeof resolvedSearchParams.returnTo === "string" ? resolvedSearchParams.returnTo : "";
  const returnTo = rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//") ? rawReturnTo : "/dashboard?view=bible-year&day=1";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Welcome to BibleBuddy Pro.</h1>
        <p className="mb-6 text-xl text-gray-600">Your journey is now fully connected.</p>
        <p className="mb-4 text-base text-gray-600">
          You now have full access to deeper study tools, notes, and Pro features built to help you keep growing in God&apos;s Word.
        </p>
        <p className="mb-10 text-sm text-gray-500">Let&apos;s continue growing in God&apos;s Word.</p>
        <a
          href={returnTo}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Continue
        </a>
      </div>
    </div>
  );
}
