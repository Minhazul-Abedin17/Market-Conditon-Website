import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetails = async ({ params }: PageProps) => {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );
  const products: IProduct[] = await res.json();
  const item = products.find((product) => product.slug === slug);

  if (!item) {
    return (
      <div className="p-8 text-center text-gray-600">
        পণ্য পাওয়া যায়নি!
      </div>
    );
  }

  const detailRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${item.id}`,
    {
      cache: "no-store",
    }
  );

  const product: IProduct = await detailRes.json();

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#eef4ee] px-3 py-5 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-bold text-gray-800">
            {product.nameBn}
          </span>
        </div>

        <section className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
              {product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {product.categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                বাংলাদেশের বাজারদরের সর্বশেষ তথ্য
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f5f8f3] px-5 py-3">
            <p className="text-xs text-gray-500">আজকের বাজারদর</p>
            <p className="text-2xl font-extrabold text-gray-900">
              ৳{product.today.toLocaleString("bn-BD")}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
            <p
              className={`mt-1 text-xs font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp
                ? `▲ ${product.change.pct.toLocaleString("bn-BD")}%`
                : isDown
                  ? `▼ ${product.change.pct.toLocaleString("bn-BD")}%`
                  : "দাম অপরিবর্তিত"}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-4 sm:p-6">
          <h2 className="mb-4 text-base font-extrabold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600">
                আজকের দাম
              </p>
              <p className="mt-1 text-xl font-extrabold text-green-600">
                ৳{product.today.toLocaleString("bn-BD")}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600">
                গতকালের দাম
              </p>
              <p className="mt-1 text-xl font-extrabold text-gray-900">
                ৳{product.yesterday.toLocaleString("bn-BD")}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600">
                পরিবর্তন
              </p>
              <p
                className={`mt-1 text-xl font-extrabold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                গতকালের তুলনায়
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-6 text-base font-extrabold text-gray-900">
            বাজারভিত্তিক দামের তালিকা
          </h2>
          {product.markets && product.markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-700">
                    <th className="px-3 py-3 font-bold">বাজার</th>
                    <th className="px-3 py-3 font-bold">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-bold">
                      সর্বনিম্ন দাম
                    </th>
                    <th className="px-3 py-3 text-right font-bold">
                      সর্বোচ্চ দাম
                    </th>
                    <th className="px-3 py-3 text-right font-bold">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-0 hover:bg-green-50"
                    >
                      <td className="px-3 py-3 font-bold text-gray-900">
                        {market.market}
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {market.division}
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-green-600">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-red-600">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-gray-900">
                        {((market.min + market.max) / 2).toLocaleString(
                          "bn-BD",
                          { maximumFractionDigits: 1 }
                        )}{" "}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
              বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};
export default ProductDetails;