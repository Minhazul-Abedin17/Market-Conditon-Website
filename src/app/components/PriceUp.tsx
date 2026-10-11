import Link from "next/link";
interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  today: number;
  yesterday: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}
const PriceUp = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    },
  );
  const data: Product[] = await res.json();
  const upPrice = data
    .filter((item) => item.change.dir === "up" && item.today > item.yesterday)
    .slice(0, 5);
  return (
    <section className="container mx-auto mt-5 rounded-3xl bg-gray-50 p-4 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
          ↑
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          <p className="mt-1 text-sm text-gray-500">যেসব পণ্যের দাম বেড়েছে</p>
        </div>
      </div>
      {upPrice.length === 0 ? (
        <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
          আজ দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {upPrice.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="block"
            >
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-100 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl">
                    {item.categoryIcon || "🛒"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.nameBn}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-500">আজকের দাম</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ৳{item.today.toLocaleString("bn-BD")}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    গতকাল ৳{item.yesterday.toLocaleString("bn-BD")}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    ↑ {item.change.pct.toLocaleString("bn-BD")}% দাম বেড়েছে
                  </span>
                  <p className="mt-4 border-t border-gray-100 pt-3 text-sm font-semibold text-green-700">
                    বিস্তারিত দেখুন →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
export default PriceUp;
