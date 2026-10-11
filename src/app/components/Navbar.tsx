"use client";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
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
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setNavs(data));
  }, []);

  const selectedItem = navs.find(
    (item) => (item.slug || item.id) === selectedCategory,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-4">
          {navs.map((item) => {
            const categorySlug = item.slug || item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(categorySlug)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${
                  selectedCategory === categorySlug
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.nameBn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
