// @/hooks/actions/GetContractAddresses
import { Address } from "@/dto/tokenDto";
import { StakePoolAddressesProps } from "@/dto/stakingDto";

// function is used to get contract addresses from the .env file
export async function GetContractAddresses(): Promise<StakePoolAddressesProps> {
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