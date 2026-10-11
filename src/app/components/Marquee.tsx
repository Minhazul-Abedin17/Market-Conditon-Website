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
  let products: IProduct[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
  } catch (error) {
    console.error("Marquee API error:", error);
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-3 text-gray-900">
      <MarqueeText 
        className="py-1 text-sm sm:text-base"
        direction="right"
        duration={10}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="mx-4 inline-flex items-center gap-2 whitespace-nowrap sm:mx-6"
          >
            <span className="text-lg sm:text-xl">
              {product.categoryIcon || "🛒"}
            </span>

            <span className="font-bold text-gray-800">
              {product.nameBn}
            </span>

            <span className="font-semibold text-gray-700">
              {product.today.toLocaleString("bn-BD")} টাকা/
              {product.unit === "kg" ? "কেজি" : product.unit}
            </span>

            {product.change?.dir === "up" && (
              <span className="font-bold text-red-600">
                ▲ {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}

            {product.change?.dir === "down" && (
              <span className="font-bold text-green-600">
                ▼ {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}

            {product.change?.dir !== "up" &&
              product.change?.dir !== "down" && (
                <span className="font-semibold text-gray-500">
                  অপরিবর্তিত
                </span>
              )}

            <span className="ml-2 text-gray-300">●</span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
