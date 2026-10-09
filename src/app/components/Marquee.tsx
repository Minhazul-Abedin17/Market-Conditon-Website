import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Products data fetch failed");
  }

  const products: IProduct[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-2 text-black">
      <div className="mx-auto flex max-w-7xl items-center px-2 sm:px-4">

      

        
        <div className="w-full overflow-hidden">
          <MarqueeText
            className="py-1 text-sm sm:text-base"
            direction="right"
            duration={10}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="mx-4 inline-flex items-center gap-2 whitespace-nowrap sm:mx-6"
              >
               
                <span className="text-base sm:text-lg">
                  {product.categoryIcon}
                </span>

               
                <span className="font-semibold">
                  {product.nameBn}
                </span>

                
                <span>
                  ৳{product.today}/{product.unit}
                </span>

               
                {product.change.dir === "up" ? (
                  <span className="font-semibold text-green-400">
                    ▲ {product.change.pct}%
                  </span>
                ) : (
                  <span className="font-semibold text-red-400">
                    ▼ {product.change.pct}%
                  </span>
                )}

                <span className="text-gray-500">•</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;