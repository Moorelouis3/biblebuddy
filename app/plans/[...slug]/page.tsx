import { redirect } from "next/navigation";

/**
 * /plans/<anything> → /bible-studies/<anything>.
 *
 * `params` is awaited because in Next 16 it is a Promise. Reading `.slug` off
 * it directly threw "params is a Promise and must be unwrapped" on every
 * request to this route, so the redirect never happened - and this is the
 * route the study page sent readers to after they finished opening a day.
 */
type PlansCatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function PlansCatchAllPage({ params }: PlansCatchAllPageProps) {
  const { slug } = await params;
  redirect(`/bible-studies/${(slug ?? []).join("/")}`);
}
