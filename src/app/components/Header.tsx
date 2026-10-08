
import Image from "next/image";
import LiveDate from "./LiveDate";


const Header = () => {
  
  return (
    <div className="flex justify-between container mx-auto mt-2">
      <div className="flex items-center gap-2">
        <Image className="bg-green-600 border rounded-xl p-2"
          src="/logo-icon.png"
          alt="Bazar Dor Logo"
          width={48}
          height={48}
        />

        <div>
          <h2 className="font-bold text-[18px]">বাজার দর</h2>
          <LiveDate/>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn border font-semibold rounded-2xl">
          সাইন ইন
        </button>

        <button className="btn bg-[#05893E] text-white font-semibold rounded-2xl">
          সাইন আপ
        </button>
      </div>
    </div>
  );
};

export default Header;