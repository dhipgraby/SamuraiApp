import Input from "@/components/Inputs/Input"
import PoolCard from '@/components/Cards/PoolCard';
import StakingInfoCard from '@/components/Cards/StakingInfoCard';
import { Address } from "@/dto/tokenDto";

import poolImg1 from "@/public/nfts/001.jpg"
import poolImg2 from "@/public/nfts/002.jpg"
import poolImg3 from "@/public/nfts/003.jpg"
import poolImg4 from "@/public/nfts/004.jpg"
import poolImg5 from "@/public/nfts/005.jpg"
import poolImg6 from "@/public/nfts/006.jpg"
import poolImg7 from "@/public/nfts/007.jpg"
import poolImg8 from "@/public/nfts/008.jpg"


const pools = [
    { index: 1, duration: "1 day", text: "One-Day Staking", reward: "5%", image: poolImg1 },
    { index: 2, duration: "1 week", text: "One-Week Staking", reward: "7%", image: poolImg2 },
    { index: 3, duration: "1 month", text: "One-Month Staking", reward: "10%", image: poolImg3 },
    { index: 4, duration: "6 months", text: "Six-Month Staking", reward: "30%", image: poolImg4 },
    { index: 5, duration: "12 months", text: "One-Year Staking", reward: "50%", image: poolImg5 },
    { index: 6, duration: "custom", text: "Custom Staking", reward: "Not Set", image: poolImg6 },
    { index: 7, duration: "special1", text: "Special_1 Staking", reward: "Not set", image: poolImg7 },
    { index: 8, duration: "special2", text: "Special_2 Staking", reward: "Not set", image: poolImg8 },
];

interface StakeProps {
    escrowAddress: Address | undefined;
    stakingPoolAddress: Address | undefined;
    tokenStakingPlatformAddress: Address | undefined;
    tokenAddress: Address | undefined;
  }
  
  async function getContracts(): Promise<StakeProps> {
    const tokenStakingPlatformAddress = process.env.STAKINGPLATFORM_ADDRESS as Address | undefined;
    const escrowAddress = process.env.ESCROW_ADDRESS as Address | undefined;
    const stakingPoolAddress = process.env.ONE_DAY_POOL_ADDRESS as Address | undefined;
    const tokenAddress = process.env.YENTOKEN_ADDRESS as Address | undefined;

    return {
      escrowAddress: escrowAddress,
      stakingPoolAddress: stakingPoolAddress,
      tokenStakingPlatformAddress: tokenStakingPlatformAddress,
      tokenAddress: tokenAddress,
    }
  }

export default async function StakePage() {

    const { escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress } = await getContracts();
  

  return (
    <div>
      <div className={"text-center"}>
        <h1 className="text-3xl font-bold underline mb-3">
          Samurai Staking Pools
        </h1>
        <small className="text-yellow-400">Grow up with the community</small>
      </div>
      <div className="container w-fit my-12 mx-auto px-4 md:px-12">
        <div>
          <StakingInfoCard 
              escrowAddress={escrowAddress}
              stakingPoolAddress={stakingPoolAddress}
              tokenStakingPlatformAddress={tokenStakingPlatformAddress}
              tokenAddress={tokenAddress}
              />
        </div>
        <div className="flex flex-wrap justify-center">
          {pools.map((pool) => (
            <div key={pool.index} className="m-4">
              <PoolCard {...pool} />
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