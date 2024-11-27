import { ethers } from 'ethers';
import { StakingContractDto } from '@/dto/contractsDto';
import { stakingPlatformContract } from '../contractData';
import { parseAmount } from '@/helpers/converter';
import { stakeDataInPoolDto } from '@/dto/stakingDto';



export default class StakingPlatform {
    private signer: ethers.Signer | null = null;
    private contract: ethers.Contract | null = null;
    private contractData: StakingContractDto;

    constructor() {
        this.contractData = stakingPlatformContract;
    }

    async connect() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum)
        this.signer = await provider.getSigner();
        this.contract = new ethers.Contract(this.contractData.address, this.contractData.abi, this.signer);
    }

    async checkConnect() {
        if (!this.contract) {
            await this.connect();
        }
    }

    async getUserStakeIdsInPool(poolType: number) {
        await this.checkConnect();
        const userStakeIds = await this.contract?.getUserStakeIdsInPool(this.signer, poolType);
        console.log(userStakeIds);
        return userStakeIds
    }

    async getStakeData(stakeId: number) {
        await this.checkConnect();
        const userStakeData = await this.contract?.getStakeData(stakeId);

        const data: stakeDataInPoolDto = {
            "id": userStakeData[0].toString().replace("n", ""),
            "user": userStakeData[1],
            "amount": parseAmount(userStakeData[2]),
            "pool": userStakeData[3].toString().replace("n", ""),
            "endTime": userStakeData[4].toString().replace("n", ""),
            "reward": parseAmount(userStakeData[5]),
            "claimed": userStakeData[6],
        }

        return data
    }
}
