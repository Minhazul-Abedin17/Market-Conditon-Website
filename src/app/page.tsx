import Marquee from "../app/components/Marquee";
import Banner from "./components/Banner";
import PriceDown from "./components/PriceDown";
import PriceUp from "./components/PriceUp";


export default function Home() {
  return (
    <div>
      <Marquee/>
      <Banner/>
      <PriceUp/>
      <PriceDown/>
    </div>
  );
}
