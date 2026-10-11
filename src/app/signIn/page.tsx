"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };
  const { data, error } = await authClient.signIn.email({
    ...user,
    callbackURL: "/",
  });
  if (data) {
    toast.success("সফলভাবে সাইন ইন হয়েছে!", {
      icon: "✅",
      duration: 3000,
    });
  }
  if (error) {
    toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
      icon: "⚠️",
      duration: 3000,
    });
  }
};

const SignInPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3f4f6] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            🛒
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900">সাইন ইন</h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ইমেইল
              </label>

              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </label>

              <input
                name="password"
                type="password"
                required
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#008738] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00702e]"
            >
              সাইন ইন করুন
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex w-full min-w-0 items-center justify-center gap-3 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              <FcGoogle className="shrink-0 text-xl" />
              <span className="whitespace-nowrap font-bold">
                Google দিয়ে চালিয়ে যান
              </span>
            </button>

            <button
              type="button"
              className="flex w-full min-w-0 items-center justify-center gap-3 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              <FaGithub className="shrink-0 text-xl" />
              <span className="whitespace-nowrap font-bold">
                GitHub দিয়ে চালিয়ে যান
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signUp"
              className="font-bold text-[#008738] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
