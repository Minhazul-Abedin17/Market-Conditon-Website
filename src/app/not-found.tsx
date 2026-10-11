
import Link from "next/link";
import { FaHome, FaSearch, FaStore } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-10">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
          🛒
        </div>

        {/* Error Code */}
        <p className="mb-2 text-7xl font-extrabold tracking-wider text-[#05893E] sm:text-8xl">
          ৪০৪
        </p>

        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          দুঃখিত! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
          আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা লিংকটি ভুল।
          সাময়িক API বা সার্ভার সমস্যার কারণেও পণ্যের তথ্য
          দেখানো সম্ভব নাও হতে পারে।
        </p>

        {/* Possible Reasons */}
        <div className="mb-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-xl">🔗</p>
            <h2 className="mb-1 text-sm font-bold text-gray-800">
              ভুল লিংক
            </h2>
            <p className="text-xs leading-5 text-gray-500">
              পৃষ্ঠার ঠিকানা সঠিক আছে কি না যাচাই করুন।
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-xl">📦</p>
            <h2 className="mb-1 text-sm font-bold text-gray-800">
              পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-xs leading-5 text-gray-500">
              পণ্যটি সরানো হতে পারে অথবা আর উপলব্ধ নেই।
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-xl">⚙️</p>
            <h2 className="mb-1 text-sm font-bold text-gray-800">
              সার্ভার/API সমস্যা
            </h2>
            <p className="text-xs leading-5 text-gray-500">
              কিছুক্ষণ পর আবার চেষ্টা করে দেখুন।
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FaHome />
            হোম পেজে ফিরুন
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <FaSearch />
            পণ্য খুঁজুন
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaStore className="text-[#05893E]" />
            <span>
              <span className="font-semibold text-gray-700">বাজার দর</span>
              {" "}— প্রতিদিনের বাজারদর জানুন সহজেই।
            </span>
          </p>

          <p className="mt-3 text-xs text-gray-400">
            সমস্যাটি চলতে থাকলে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
