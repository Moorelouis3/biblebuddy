"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface Devotional {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  total_days: number;
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDevotionals() {
      try {
        const { data, error } = await supabase
          .from("devotionals")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading devotionals:", error);
          return;
        }

        setDevotionals(data || []);
      } catch (err) {
        console.error("Error loading devotionals:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDevotionals();
  }, []);

  // Background colors for cards (can be expanded later)
  const cardColors = [
    "bg-yellow-100 border-yellow-200",
    "bg-blue-100 border-blue-200",
    "bg-purple-100 border-purple-200",
    "bg-green-100 border-green-200",
    "bg-orange-100 border-orange-200",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Devotionals</h1>
          <div className="text-gray-500">Loading devotionals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Devotionals</h1>

        {devotionals.length === 0 ? (
          <div className="text-gray-500">
            No devotionals available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devotionals.map((devotional, index) => (
              <Link
                key={devotional.id}
                href={`/devotionals/${devotional.id}`}
              >
                <div
                  className={`${cardColors[index % cardColors.length]} border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition`}
                >
                  <h2 className="text-xl font-bold mb-1">{devotional.title}</h2>
                  <p className="text-sm text-gray-600">{devotional.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

