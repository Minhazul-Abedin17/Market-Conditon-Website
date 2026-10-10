"use client";

import Link from "next/link";
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

interface ProductListProps {
  category: string;
  categoryName: string;
  categoryIcon: string;
}

const ProductList = ({
  category,
  categoryName,
  categoryIcon,
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(category)}`
        );

        if (!res.ok) {
          throw new Error("পণ্যের তালিকা লোড করা যায়নি");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API থেকে সঠিক পণ্যের তালিকা পাওয়া যায়নি");
        }

        setProducts(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        setProducts([]);
        setError(
          err instanceof Error
            ? err.message
            : "পণ্য লোড করতে সমস্যা হয়েছে"
        );
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [category]);

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
      <div className="py-10 text-center text-gray-500">
        পণ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
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

      {error ? (
        <p className="py-10 text-center text-red-600">{error}</p>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              মোট{" "}
              <span className="font-bold text-gray-800">
                {products.length}
              </span>{" "}
              টি পণ্য
            </p>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                সাজান:
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-high">কম দাম থেকে বেশি</option>
                <option value="high-low">বেশি দাম থেকে কম</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <p className="py-10 text-center text-gray-500">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sortedProducts.map((product) => {
                const rate = product.change?.pct ?? 0;
                const isIncrease = product.change?.dir === "up";
                const isDecrease = product.change?.dir === "down";

                return (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                    className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <div className="h-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-gray-50 p-3 text-3xl">
                          {product.image || "🛒"}
                        </span>

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {product.nameBn}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            প্রতি {product.unit}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <p className="text-sm text-gray-500">
                          আজকের দাম
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                          {typeof product.today === "number"
                            ? product.today.toLocaleString("bn-BD")
                            : "—"}{" "}
                          টাকা
                        </p>

                        {(isIncrease || isDecrease) && (
                          <p
                            className={`mt-2 text-sm font-semibold ${
                              isIncrease
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {isIncrease ? "▲" : "▼"}{" "}
                            {rate.toLocaleString("bn-BD")}%{" "}
                            {isIncrease ? "দাম বেড়েছে" : "দাম কমেছে"}
                          </p>
                        )}

                        <p className="mt-3 text-sm font-semibold text-green-700">
                          বিস্তারিত দেখুন →
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;