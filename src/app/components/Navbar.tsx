
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItems {
  id: string;
  slug?: string;
  icon: string;
  nameBn: string;
}

export default function Home() {
  const [navs, setNavs] = useState<NavItems[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("chal");

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setNavs(data))
      .catch((error) => console.log("ক্যাটাগরি লোড করতে সমস্যা:", error));
  }, []);

  return (
    <main className=" bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-4">
          {navs.map((item) => {
            const categorySlug = item.slug || item.id;

            return (
              <Link
                key={item.id}
                href={`/item/${categorySlug}`}
                onClick={() => setSelectedCategory(categorySlug)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${
                  selectedCategory === categorySlug
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
