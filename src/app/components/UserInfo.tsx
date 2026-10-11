"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // রাউটিংয়ের জন্য
import { FaCaretDown, FaSignOutAlt, FaUser } from "react-icons/fa";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signIn"); 
        },
      },
    });
  };

  console.log(user);

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex gap-2 items-center cursor-pointer p-1 rounded-lg hover:bg-base-200 transition-all"
          >
            <div className="avatar placeholder">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center overflow-hidden">
                {user?.image ? (
                  <img
                    src={user?.image as string}
                    alt={user?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold uppercase">
                    {user?.name ? (
                      user.name.charAt(0)
                    ) : (
                      <FaUser className="text-white text-base" />
                    )}
                  </span>
                )}
              </div>
            </div>
            <span className="font-bold text-[15px] text-slate-800">
              {user?.name || "User"}
            </span>
            <FaCaretDown className="text-gray-500 text-sm" />
          </div>
          <div
            tabIndex={0}
            className="dropdown-content menu z-[1] p-5 shadow-xl bg-white rounded-3xl w-64 border border-gray-100 mt-2"
          >
            <div className="mb-4">
              <h3 className="font-bold text-gray-400 text-base">
                {user?.name || "User Name"}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {user?.email || "user@gmail.com"}
              </p>
            </div>
            <ul className="space-y-3 pt-2">
              <li>
                <a
                  href="/profile"
                  className="flex items-center gap-3 text-slate-800 text-base font-semibold hover:bg-gray-100 p-2 rounded-lg"
                >
                  <FaUser className="text-slate-800 text-lg" />
                  <span>আমার প্রোফাইল</span>
                </a>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 text-red-500 text-base font-semibold hover:bg-red-50 p-2 rounded-lg w-full text-left"
                >
                  <FaSignOutAlt className="text-red-500 text-lg transform rotate-180" />
                  <span>সাইন আউট</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signIn"
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:px-4"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signUp"
            className="rounded-xl bg-[#05893E] px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-4"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};
export default UserInfo;