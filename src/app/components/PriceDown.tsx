interface Product {
  id: number;
  nameBn: string;
  category: string;
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

const PriceDown = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Product[] = await res.json();
  const downPrice = data
    .filter(
      (item) => item.change?.dir === "down" && item.today < item.yesterday,
    )
    .slice(0, 5);
  const bnNumber = (value: number) => value.toLocaleString("bn-BD");
  return (
    <section className="container mx-auto rounded-3xl bg-[#f8f9f8] p-4 sm:p-6  mt-5">
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-lg text-green-600">
          ↓
        </span>
        <h3 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h3>
      </div>
      {/* Product Cards */}
      {downPrice.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {downPrice.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                  {item.categoryIcon || "🛒"}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900">{item.nameBn}</h4>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  ৳{bnNumber(item.today)}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    গতকাল ৳{bnNumber(item.yesterday)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                    ↓ {bnNumber(item.change.pct)}%
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-5 text-sm text-gray-500">
          আজ দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};
export default PriceDown;
