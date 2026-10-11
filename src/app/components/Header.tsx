import Image from "next/image";
import LiveDate from "./LiveDate";
import UserInfo from "./UserInfo";
import Link from "next/link";
const Header = () => {
  return (
    <header className="mx-auto mt-2 flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <Link href={'/'} className="flex items-center gap-2">
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
      </Link>
      <UserInfo/>
    </header>
  );
};
export default Header;