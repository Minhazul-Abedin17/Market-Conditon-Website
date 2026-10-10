
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const AllProduct = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Product[] = await res.json();

  const bnNumber = (value: number) =>
    value.toLocaleString("bn-BD");

  return (
    <section className="container mx-auto mt-5 rounded-3xl bg-[#f8f9f8] p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-xl">
            🛒
          </span>

          <h3 className="text-xl font-bold text-gray-900">
            সব পণ্য
          </h3>
        </div>

        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-600 ring-1 ring-gray-200">
          মোট {bnNumber(data.length)}টি পণ্য
        </span>
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";

            return (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    {item.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900">
                      {item.nameBn}
                    </h4>

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
                    ৳{bnNumber(item.today)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-gray-500">
                      গতকাল ৳{bnNumber(item.yesterday)}
                    </span>

                    {isUp && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        ↑ {bnNumber(item.change.pct)}%
                      </span>
                    )}

                    {isDown && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                        ↓ {bnNumber(item.change.pct)}%
                      </span>
                    )}

                    {!isUp && !isDown && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                        অপরিবর্তিত
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-5 text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default AllProduct;
