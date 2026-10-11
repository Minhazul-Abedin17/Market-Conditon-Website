const Footer = () => {
  return (
    <footer className="mx-auto mt-6 flex w-full max-w-6xl flex-col justify-between gap-3 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:p-6">
      <p className="text-xs font-semibold text-[#1D271F]">
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </p>

      <p className="text-xs text-gray-500 sm:text-right">
        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
      </p>
    </footer>
  );
};
export default Footer;