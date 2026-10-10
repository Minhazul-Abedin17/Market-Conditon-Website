'use client'
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa'; 
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                
                {/* Header Text */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">সাইন ইন</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Card Container */}
                <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-gray-100 sm:px-10">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#008738] hover:bg-[#00702e] focus:outline-none transition-colors"
                            >
                                সাইন ইন
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">অথবা</span>
                        </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-[12px] font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <span className="text-red-500 font-bold mr-2"><FcGoogle /></span> Google দিয়ে চালিয়ে যান
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <span className="text-black font-bold mr-2"><FaGithub /></span> GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        অ্যাকাউন্ট নেই? <a href="#" className="text-[#008738] font-medium hover:underline">সাইন আপ করুন</a>
                    </div>
                </div>

                {/* Back Home */}
                <div className="text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:underline">← হোম পেজে ফিরে যান</Link>
                    
                </div>

            </div>
        </div>
    );
};

export default SignInPage;