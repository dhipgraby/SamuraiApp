import Input from "@/components/Inputs/Input"
import PoolCard from '@/components/Cards/PoolCard';
import pools from "@/data/pools";
import { GetContractAddresses } from "@/hooks/actions/GetContractAddresses";
import { useGetStakingData }from "@/hooks/actions/GetStakingData";

import { StakingProps } from "@/dto/stakingDto";




export default async function StakePage() {

  
    const fetchData = async () => {
      const contractAddresses = await GetContractAddresses();
      return contractAddresses;
    };

  return (
    <div>
      <div className={"text-center"}>
        <h1 className="text-3xl font-bold underline mb-3">
          Samurai Staking Pools
        </h1>
        <small className="text-yellow-400">Grow up with the community</small>
      </div>
      <div className="container w-fit my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center">
          {pools.map(async (pool) => (
            <div key={pool.index} className="m-4">
              <PoolCard {...pool} useGetStakingData={useGetStakingData} />
              <Input
                text={"Stake Yen"}
                type={"number"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}