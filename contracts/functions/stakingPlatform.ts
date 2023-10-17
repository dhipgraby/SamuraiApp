import { ethers } from 'ethers';
import { StakingContractDto } from '@/dto/contractsDto';
import { stakingPlatformContract } from '../contractData';

declare global {
    interface Window {
        ethereum: any;
    }
}

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

        const data = {
            "id": userStakeData[0],
            "user": userStakeData[1],
            "amount": userStakeData[2],
            "pool": userStakeData[3],
            "endTime": userStakeData[4],
            "reward": userStakeData[5],
            "claimed": userStakeData[6],
        }

        return data
    }

    async fetchMarketAuctions() {
        await this.checkConnect();
        const auctions = await this.contract?.fetchMarketAuctions();
        console.log(auctions);
        return auctions;
    }
}
