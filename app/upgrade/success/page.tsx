import UpgradeSuccessClient from "@/components/UpgradeSuccessClient";

type UpgradeSuccessPageProps = {
  searchParams?: Promise<{ returnTo?: string; session_id?: string }> | { returnTo?: string; session_id?: string };
};

export default async function UpgradeSuccessPage({ searchParams }: UpgradeSuccessPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawReturnTo = typeof resolvedSearchParams.returnTo === "string" ? resolvedSearchParams.returnTo : "";
  const returnTo = rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//") ? rawReturnTo : "/dashboard";
  const sessionId = typeof resolvedSearchParams.session_id === "string" ? resolvedSearchParams.session_id : "";

  return <UpgradeSuccessClient returnTo={returnTo} sessionId={sessionId} />;
}
