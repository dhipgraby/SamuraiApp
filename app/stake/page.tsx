import Image from "next/image";
import LoopCards from "@/components/Cards/LoopCards";
import Approval from "./components/Approval";

export default function StakePage() {

  return (

    <div className={"ta-c"}>
      <h1 className="text-3xl items-center justify-center font-bold underline mb-3">
        Samurai Staking Pools
      </h1>
      <small className="text-yellow-400">Grow up with the community</small>
      <Image className="mt-4" src={"/icons/fire.png"} alt="fire" width={100} height={100} />
      <h1 className="text-xl">
        Stake your <span className="text-yellow-400">Yen Tokens</span> with the pool of your choice.
        <br />
        Increate your earnings daily with indifidual pools with fixed time frame.
        <br />
        Access to token Holders community rewards and <span className="text-yellow-400">upcoming Airdrops</span>.
      </h1>
    <br />
      <Approval />
      <LoopCards />
    </div>
  );
}