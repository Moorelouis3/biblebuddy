"use client";
import { useParams } from "next/navigation";

export default function CharacterStudySlugPage() {
  const params = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Character Study: {params?.slug}</h1>
      <p className="mt-2 text-gray-600">Coming soon: Details for this Bible character.</p>
    </div>
  );
}
