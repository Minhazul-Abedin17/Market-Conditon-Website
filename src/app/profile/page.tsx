"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signIn");
        },
      },
    });
  };
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authClient.updateUser({
        name: name,
        image: image,
      });
      toast.success("তথ্য হালনাগাদ হয়েছে");
    } catch (error) {
      console.error(error);
      toast.error("আপডেট করতে সমস্যা হয়েছে!");
    }
  };
  return (
    <div className="min-h-screen bg-[#F2F5F3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
              {image || user?.image ? (
                <img
                  src={image || user?.image}
                  alt={user?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-400 text-3xl" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {user?.name || "Rezwan Ahmed"}
              </h2>
              <p className="text-sm text-gray-400">
                {user?.email || "rezwanahmed@gmail.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-red-300 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto justify-center"
          >
            <FaSignOutAlt className="transform rotate-180" />
            <span>সাইন আউট</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-6">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.name || "আপনার নাম লিখুন"}
                className="w-full px-4 py-3 bg-[#FAFBFB] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                ছবি URL (Image URL)
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-[#FAFBFB] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#05893E] hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm text-sm"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
