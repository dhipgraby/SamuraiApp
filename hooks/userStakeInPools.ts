'use client'
import { useState, useEffect } from "react";
import { userStore } from "@/store/user";
import { stakingStore } from "@/store/contracts/StakingStore";
import StakingPlatform from "@/contracts/functions/stakingPlatform";

export function userStakeInPools() {

    const stakingContract = new StakingPlatform();

    const [userStakes, setUserStakes] = useState<any>([]);

    //----------------- STORES --------------------
    const userAddress = userStore((state) => state.address);
    const poolData = stakingStore((state) => state.poolData)
    const loadingData = stakingStore((state) => state.isLoading)

    useEffect(() => {
        if (loadingData) return

        const stakeData: any = [];

        (async () => {
            for (let i = 0; i < poolData.length; i++) {
                poolData[i].stakeIds.map(async (id: number) => {
                    const data: any = await stakingContract.getStakeData(id)
                    stakeData.push(data)
                })
            }
            setUserStakes(stakeData)
        })();

    }, [loadingData])

    return {
        userStakes
    };
}
