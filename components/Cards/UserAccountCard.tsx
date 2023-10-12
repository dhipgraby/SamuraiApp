'use client'
import { formatEther } from "@/helpers/stakingUtils";
import { useStakingData} from "@/hooks/useStaking";
import { Address } from "@/dto/tokenDto";

interface StakeProps {
  escrowAddress: Address | undefined;
  stakingPoolAddress: Address | undefined;
  tokenStakingPlatformAddress: Address | undefined;
  tokenAddress: Address | undefined;
}

const UserAccountCard = ({
  escrowAddress,
  stakingPoolAddress,
  tokenStakingPlatformAddress,
  tokenAddress,
}: StakeProps) => {

  const { 
    escrowBalance, 
    userStakeIds, 
    userStakeRewards, 
    userStakeBalance, 
    userStakeAllowance, 
    userStakeData 
  } = useStakingData({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress });

  console.log(userStakeData)
  return (
    <div className="text-center text-purple-500">
      {userStakeData && (
        <div>
          <p>Escrow Balance: {escrowBalance}</p>
          <p>User Stake Ids: {userStakeIds}</p>
          <p>User Stake Rewards: {userStakeRewards}</p>
          <p>User Stake Balance: {userStakeBalance}</p>
          <p>User Stake Allowance: {userStakeAllowance}</p>
          <div>
  <h3>User Stake Data:</h3>
  {userStakeData ? (
    <div className="border border-gray-300 rounded">
      {Object.keys(userStakeData).map((key: any, index) => (
        <p key={index} className="text-left">
          {key}: {userStakeData[key]}
        </p>
      ))}
    </div>
  ) : (
    "Loading..."
  )}
</div>
        </div>
      )}
    </div>
  );
};
export default UserAccountCard;
