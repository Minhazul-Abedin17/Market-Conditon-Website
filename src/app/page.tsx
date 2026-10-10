import Marquee from "./components/Marquee";
import Banner from "./components/Banner";
import PriceUp from "./components/PriceUp";
import PriceDown from "./components/PriceDown";
import AllProduct from "./components/AllProduct";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Banner />
      <PriceUp />
      <PriceDown />
      <AllProduct />
      <Footer />
    </div>
  );
}