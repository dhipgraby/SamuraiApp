'use client'
import { usePoolData } from "@/hooks/usePoolData";
import LoopCards from "@/components/Cards/LoopCards";

export default function StakePage() {

  const { poolData } = usePoolData()

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
          {poolData.map(pool =>
            <tr>
              <td className="p-3">{pool.index}</td>
              <td>{pool.text}</td>
              <td>{pool.userIds.map((id: any) => `[${id}] `)}</td>
            </tr>
          )}
        </table>

        <LoopCards />
      </div>
  );
}