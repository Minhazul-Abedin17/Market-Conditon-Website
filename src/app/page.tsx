import Banner from "./components/Banner";
import PriceUp from "./components/PriceUp";
import PriceDown from "./components/PriceDown";
import AllProduct from "./components/AllProduct";


export default function Home() {
  return (
    <div className="bg-gray-50">
      <Banner />
      <PriceUp />
      <PriceDown />
      <AllProduct />
    </div>
  );
}
