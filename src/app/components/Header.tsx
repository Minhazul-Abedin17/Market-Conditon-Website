import Image from "next/image";
import LiveDate from "./LiveDate";
import UserInfo from "./UserInfo";
const Header = () => {
  return (
    <header className="mx-auto mt-2 flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-xl border bg-green-600 p-2"
          src="/logo-icon.png"
          alt="Bazar Dor Logo"
          width={48}
          height={48}
        />
        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            বাজার দর
          </h2>
          <LiveDate />
        </div>
      </div>
      <UserInfo/>
    </header>
  );
};
export default Header;