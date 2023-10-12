import Input from "@/components/Inputs/Input"
import PoolCard from '@/components/Cards/PoolCard';
import StakingInfoCard from '@/components/Cards/StakingInfoCard';
import { Address } from "@/dto/tokenDto";


const pools = [
    { index: 0, duration: "1 day", text: "One-Day Staking", reward: "5%"},
    { index: 1, duration: "1 week", text: "One-Week Staking", reward: "7%"},
    { index: 2, duration: "1 month", text: "One-Month Staking", reward: "10%"},
    { index: 3, duration: "6 months", text: "Six-Month Staking", reward: "30%"},
    { index: 4, duration: "12 months", text: "One-Year Staking", reward: "50%"},
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