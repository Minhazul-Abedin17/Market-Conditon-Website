"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  image: string;
  change: {
    dir: string;
    pct: number;
  };
}

interface Category {
  id: string;
  slug?: string;
  icon: string;
  nameBn: string;
}

export default function ItemPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("🛒");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(
            "https://openapi.programming-hero.com/api/bazardor/categories",
            { cache: "no-store" }
          ),
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
            { cache: "no-store" }
          ),
        ]);

        if (!categoryRes.ok || !productRes.ok) {
          throw new Error("ডেটা লোড করা যায়নি");
        }

        const categories: Category[] = await categoryRes.json();
        const data: Product[] = await productRes.json();

        const selectedCategory = categories.find(
          (item) => (item.slug || item.id) === slug
        );

        setCategoryName(selectedCategory?.nameBn || "পণ্য");
        setCategoryIcon(selectedCategory?.icon || "🛒");
        setProducts(data);
      } catch (error) {
        console.log("পণ্য লোড করতে সমস্যা হয়েছে:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-high") {
      return a.today - b.today;
    }

    if (sortBy === "high-low") {
      return b.today - a.today;
    }

    return 0;
  });

  if (loading) {
    return (
      <p className="py-10 text-center text-gray-500">
        পণ্য লোড হচ্ছে...
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="mb-5 inline-block text-sm font-semibold text-green-700 hover:text-green-800"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mb-6 rounded-2xl bg-green-50 p-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{categoryIcon}</span>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {categoryName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {categoryName} পণ্যের আজকের দাম
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              সব পণ্য
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </div>

        {products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-green-50 p-3 text-3xl">
                    {product.image || "🛒"}
                  </span>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      প্রতি{" "}
                      {product.unit === "kg" ? "কেজি" : product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ৳{product.today.toLocaleString("bn-BD")}
                  </p>

                  {product.change?.dir === "up" && (
                    <p className="mt-2 text-sm font-semibold text-red-600">
                      ↑ {product.change.pct}% দাম বেড়েছে
                    </p>
                  )}

                  {product.change?.dir === "down" && (
                    <p className="mt-2 text-sm font-semibold text-green-600">
                      ↓ {product.change.pct}% দাম কমেছে
                    </p>
                  )}

                  <p className="mt-4 border-t border-gray-100 pt-3 text-sm font-semibold text-green-700">
                    বিস্তারিত দেখুন →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
