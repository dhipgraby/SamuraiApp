import { useState, useEffect } from "react";
import { useStakingReadContract } from "./useStakingReadContract";
import { userStore } from "@/store/user";
import { stakingStore } from "@/store/contracts/StakingStore";
import { PoolProps } from "@/dto/stakingDto";

export function usePoolData() {

  const poolData = stakingStore((state) => state.poolData)
  const updateStakingData = stakingStore((state) => state.updatePools)
  const updateLoadingData = stakingStore((state) => state.updateLoading)
  const isLoading = stakingStore((state) => state.isLoading)
  const userAddress = userStore((state) => state.address);

  const stakingContracts: any = [];

  for (let i = 0; i < poolData.length; i++) {
    const poolType = i;

    const { getUserStakeIdsInPool } = useStakingReadContract({ poolType });

    stakingContracts.push({ getUserStakeIdsInPool, poolType });
  }

  useEffect(() => {
    const updatePoolData = async () => {

      if (!isLoading) updateLoadingData(true)

      const updatedData = await Promise.all(

        stakingContracts.map(async (contract) => {

          const { getUserStakeIdsInPool, poolType } = contract;

          const pool = poolData.find((el: PoolProps) => el.id === poolType);

          if (pool) {
            const result = getUserStakeIdsInPool;
            const stakeIds = result.data?.length ? result.data.map((data) => parseInt(data)) : [];
            return { ...pool, stakeIds };
          }

          return pool;
        })
      );

      updateStakingData(updatedData);
      updateLoadingData(false)
    };

    updatePoolData();
  }, [userAddress]);

}
