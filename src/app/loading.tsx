"use client";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-green-50 px-4 py-12 text-center">
      <div className="mb-8 flex items-center gap-2">
        <span className="text-4xl">🛒</span>
        <h1 className="text-3xl font-extrabold text-green-700">
          বাজারদর
        </h1>
      </div>
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
        <div className="absolute h-28 w-28 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>

        <div className="animate-bounce text-5xl">
          🥬
        </div>
      </div>
      <h2 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">
        একটু অপেক্ষা করুন...
      </h2>

      <p className="max-w-md text-sm leading-7 text-gray-600 sm:text-base">
        আপনার জন্য আজকের বাজারের সর্বশেষ দাম সংগ্রহ করা হচ্ছে।
        চাল, ডাল, তেল, সবজি ও অন্যান্য পণ্যের তথ্য নিয়ে
        আমরা ফিরে আসছি!
      </p>
      <div className="mt-6 flex items-center gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600"></span>
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600 [animation-delay:150ms]"></span>
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]"></span>
      </div>
      <p className="mt-8 rounded-full border border-green-200 bg-white px-5 py-2 text-sm font-medium text-green-700 shadow-sm">
        🌿 সঠিক দামে, সবার জন্য
      </p>
    </div>
  );
}