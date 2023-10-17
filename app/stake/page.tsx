'use client'
import { useEffect } from "react";
import { usePoolData } from "@/hooks/usePoolData";
import LoopCards from "@/components/Cards/LoopCards";
import { userStakeInPools } from "@/hooks/userStakeInPools";

export default function StakePage() {

  usePoolData()
  const { userStakes } = userStakeInPools()

  useEffect(() => {
    console.log("userStakes", userStakes);
  }, [userStakes])

  return (

    <div className={"text-center"}>
      <h1 className="text-3xl font-bold underline mb-3">
        Samurai Staking Pools
      </h1>
      <small className="text-yellow-400">Grow up with the community</small>

      <table className="table-fixed bg-black text-white p-5 w-full mt-8 rounded-lg ta-c">
        <tr className="bg-slate-500">
          <td className="p-3">Pool Id</td>
          <td>Pool Type</td>
          <td>User Stake Ids</td>
        </tr>
        {/* {poolData.map(pool =>
          <tr key={pool.index}>
            <td className="p-3">{pool.index}</td>
            <td>{pool.text}</td>
            <td>{pool.stakeIds.map((id: any) => `[${id}] `)}</td>
          </tr>
        )} */}
      </table>

      <LoopCards />
    </div>
  );
}