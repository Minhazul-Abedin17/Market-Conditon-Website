
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const products: IProduct[] = await res.json();

  // ইংরেজি সংখ্যা বাংলায় দেখাবে
  const bnNumber = (value: number) =>
    value.toLocaleString("bn-BD", {
      maximumFractionDigits: 1,
    });

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-3 text-gray-900">
      <div className="mx-auto flex w-full items-center">
        <div className="w-full overflow-hidden">
          <MarqueeText
            className="py-1 text-sm sm:text-base"
            direction="right"
            duration={13}
          >
            {products.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="mx-4 inline-flex items-center gap-2 whitespace-nowrap sm:mx-6"
                >
                  {/* পণ্যের আইকন */}
                  <span className="text-lg sm:text-xl">
                    {product.categoryIcon || "🛒"}
                  </span>

                  {/* পণ্যের নাম */}
                  <span className="font-bold text-gray-800">
                    {product.nameBn}
                  </span>

                  {/* আজকের দাম */}
                  <span className="font-semibold text-gray-700">
                    {bnNumber(product.today)} টাকা/
                    {product.unit === "kg" ? "কেজি" : product.unit}
                  </span>

                  {/* দাম বাড়া বা কমা */}
                  {isUp && (
                    <span className="font-bold text-red-600">
                      ▲ {bnNumber(product.change.pct)}%
                    </span>
                  )}

                  {isDown && (
                    <span className="font-bold text-green-600">
                      ▼ {bnNumber(product.change.pct)}%
                    </span>
                  )}

                  {!isUp && !isDown && (
                    <span className="font-semibold text-gray-500">
                      অপরিবর্তিত
                    </span>
                  )}

                  {/* প্রতিটি পণ্যের মাঝে separator */}
                  <span className="ml-2 text-gray-300">●</span>
                </Link>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
