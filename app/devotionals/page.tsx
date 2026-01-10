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

  // Get card color based on devotional title
  const getCardColor = (title: string): string => {
    // Special case: "The Tempting of Jesus" gets red
    if (title === "The Tempting of Jesus") {
      return "bg-red-50 border-red-200";
    }
    // Default: soft pastel green consistent with BibleBuddy's green UI
    return "bg-green-50 border-green-200";
  };

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
            {devotionals.map((devotional) => (
              <Link
                key={devotional.id}
                href={`/devotionals/${devotional.id}`}
              >
                <div
                  className={`${getCardColor(devotional.title)} border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition`}
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

