import LiveDate from "./LiveDate";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="container mx-auto mt-4 px-3 sm:px-4">
      <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-[#f8f9f8] p-6 shadow-sm sm:p-8 md:flex-row md:gap-8 lg:p-10">

        {/* Left Content */}
        <div className="w-full flex-1">
          <div className="flex flex-col items-start gap-3">
            {/* Live Date Badge */}
            <div className="inline-flex items-center rounded-full bg-[#e8f5e9] px-3.5 py-1 text-xs font-medium text-[#1e6038]">
              <LiveDate />
            </div>

            {/* Main Title */}
            <h2 className="text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h2>
          </div>

          {/* Description & CTA Button */}
          <div className="mt-3">
            <p className="max-w-xl text-xs sm:text-sm font-normal leading-relaxed text-gray-500">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#008a45] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-200 hover:bg-[#00753a] hover:shadow-lg focus:outline-none"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-[220px] shrink-0 sm:max-w-[260px] md:w-[35%] lg:max-w-[300px]">
          <Image
            src="/bazar-hero.png"
            alt="আজকের বাজারের দাম"
            width={600}
            height={600}
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;