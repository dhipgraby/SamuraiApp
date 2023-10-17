'use client'
import { useEffect } from "react";
import { userStore } from "@/store/user";
import { stakingStore } from "@/store/contracts/StakingStore";
import StakingPlatform from "@/contracts/functions/stakingPlatform";

export function userStakeInPools() {

    const stakingContract = new StakingPlatform();

    //----------------- STORES --------------------
    const userAddress = userStore((state) => state.address);
    const updateStakingData = stakingStore((state) => state.updatePools);
    const poolData = stakingStore((state) => state.poolData);
    const loadingData = stakingStore((state) => state.isLoading);

    useEffect(() => {
        if (loadingData || poolData[0] === undefined) return;

        const currentPoolData = poolData;

        (async () => {
            for (let i = 0; i < currentPoolData.length; i++) {
                currentPoolData[i].stakeIds.map(async (id, index) => {
                    const data = await stakingContract.getStakeData(id);
                    currentPoolData[i].stakeIds[index] = data;
                });
            }
            updateStakingData(currentPoolData);
        })();

    }, [loadingData, userAddress]);

}
