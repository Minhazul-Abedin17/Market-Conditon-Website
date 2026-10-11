import Banner from "./components/Banner";
import PriceUp from "./components/PriceUp";
import PriceDown from "./components/PriceDown";
import AllProduct from "./components/AllProduct";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Marquee/>
      <Banner />
      <PriceUp />
      <PriceDown />
      <AllProduct />
    </div>
  );
}
