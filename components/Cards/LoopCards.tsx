'use client'
import { useEffect } from "react";
import { userStakeInPools } from "@/hooks/userStakeInPools";
import PoolCard from "./PoolCard"
import { stakingStore } from "@/store/contracts/StakingStore";
import { PoolProps } from "@/dto/stakingDto";
import { usePoolData } from "@/hooks/usePoolData";

export default function LoopCards() {

    usePoolData()
    userStakeInPools()

    const poolData = stakingStore((state) => state.poolData)
    const isLoading = stakingStore((state) => state.isLoading)

    useEffect(() => {
        console.log(poolData);
    }, [poolData])

    if (isLoading) return (
        <h1>Loading Staking Pools...</h1>
    )

    return (
        <div className="container w-fit my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap justify-center">
                {poolData.map((pool: PoolProps) => (
                    <div key={pool.id} className="m-4">
                        <PoolCard {...pool} />                   
                    </div>
                ))}
            </div>
        </div>
    )
}
