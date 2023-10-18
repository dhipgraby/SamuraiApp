'use client'
import { useEffect } from "react";
import { stakingStore } from "@/store/contracts/StakingStore";
import StakingPlatform from "@/contracts/functions/stakingPlatform";

export function UserStakeInPools() {

    const stakingContract = new StakingPlatform();

    //----------------- STORES --------------------
    const updateStakingData = stakingStore((state: any) => state.updatePools);
    const poolData = stakingStore((state: any) => state.poolData);
    const loadingData = stakingStore((state: any) => state.isLoading);

    useEffect(() => {
        if (loadingData || poolData[0] === undefined) return;

        const currentPoolData = poolData;

        (async () => {
            for (let i = 0; i < currentPoolData.length; i++) {
                currentPoolData[i].stakeIds.map(async (id:any, index:any) => {
                    const data = await stakingContract.getStakeData(id);
                    currentPoolData[i].stakeIds[index] = data;
                });
            }
            updateStakingData(currentPoolData);
        })();

    }, [loadingData]);

}
