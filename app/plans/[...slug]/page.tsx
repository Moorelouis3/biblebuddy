import { redirect } from "next/navigation";

type PlansCatchAllPageProps = {
  params: { slug?: string[] };
};

export default async function PlansCatchAllPage({ params }: PlansCatchAllPageProps) {
  const slug = params.slug ?? [];
  redirect(`/bible-studies/${slug.join("/")}`);
}
