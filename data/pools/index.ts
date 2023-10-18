import { Pool } from '@/dto/stakingDto';
import { oneDayContract, oneWeekContract, oneMonthContract, oneYearContract, sixMonthContract } from '@/contracts/contractData';

export const pools: Pool[] = [
    { index: 0, address: oneDayContract.address },
    { index: 1, address: oneWeekContract.address },
    { index: 2, address: oneMonthContract.address },
    { index: 3, address: oneYearContract.address },
    { index: 4, address: sixMonthContract.address },
];

export const poolsInfo: any[] = [
    { id: 0, duration: "1 day", text: "One-Day Pool", reward: "5%", stakeIds: [] },
    { id: 1, duration: "1 week", text: "One-Week Pool", reward: "7%", stakeIds: [] },
    { id: 2, duration: "1 month", text: "One-Month Pool", reward: "10%", stakeIds: [] },
    { id: 3, duration: "6 months", text: "Six-Month Pool", reward: "30%", stakeIds: [] },
    { id: 4, duration: "12 months", text: "One-Year Pool", reward: "50%", stakeIds: [] },
];

