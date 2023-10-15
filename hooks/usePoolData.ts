import { useState, useEffect } from "react";
import { useStakingContract } from "./useStakingContract";
import { userStore } from "@/store/user";
import { poolsInfo } from "@/data/pools";

export function usePoolData() {
  const userAddress = userStore((state) => state.address);
  const [poolData, setPoolData] = useState(poolsInfo);
  const stakingContracts: any = [];

  for (let i = 0; i < poolData.length; i++) {
    const poolType = i;

    const { getUserStakeIdsInPool } = useStakingContract({ poolType });

    stakingContracts.push({ getUserStakeIdsInPool, poolType });
  }

  useEffect(() => {
    const updatePoolData = async () => {

      const updatedData = await Promise.all(

        stakingContracts.map(async (contract) => {

          const { getUserStakeIdsInPool, poolType } = contract;
          const pool = poolData.find((el) => el.index === poolType);

          if (pool) {
            const result = getUserStakeIdsInPool;
            const userIds = result.data?.length ? result.data.map((data) => parseInt(data)) : [];
            return { ...pool, userIds };
          }

          return pool;
        })
      );

      setPoolData(updatedData);
    };

    updatePoolData();
  }, [userAddress]);

  return {
    poolData
  };
}
