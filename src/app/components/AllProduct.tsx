
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  today: number;
  yesterday: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

// বাংলা সংখ্যায় রূপান্তর
const formatPrice = (value: number) => {
  return new Intl.NumberFormat("bn-BD", {
    numberingSystem: "beng",
    maximumFractionDigits: 2,
  }).format(value);
};

const AllProduct = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Product[] = await res.json();

  return (
    <section
      id="products"
      className="mx-auto mt-5 w-full max-w-6xl rounded-3xl bg-[#f8f9f8] p-4 sm:p-6"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
            🛒
          </span>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              সব পণ্য
            </h2>

            <p className="mt-1 text-[12px] font-semibold text-gray-500">
              মোট {formatPrice(data.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                  {item.categoryIcon || "🛒"}
                </span>

                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">
                    {item.nameBn}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.categoryNameBn}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  ৳{formatPrice(item.today)}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    গতকাল ৳{formatPrice(item.yesterday)}
                  </span>

                  {item.change?.dir === "up" && (
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                      ↑ {formatPrice(item.change.pct)}%
                    </span>
                  )}

                  {item.change?.dir === "down" && (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                      ↓ {formatPrice(item.change.pct)}%
                    </span>
                  )}

                  {item.change?.dir !== "up" &&
                    item.change?.dir !== "down" && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                        অপরিবর্তিত
                      </span>
                    )}
                </div>

                <p className="mt-4 border-t border-gray-100 pt-3 text-sm font-semibold text-green-700">
                  বিস্তারিত দেখুন →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProduct;
