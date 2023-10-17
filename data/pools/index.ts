import { Pool } from '@/dto/stakingDto';
import oneDayStakingContractAbi from '@/contracts/abi/oneDayStakingContractAbi.json';
import oneWeekStakingContractAbi from '@/contracts/abi/oneWeekStakingContractAbi.json';
import oneMonthStakingContractAbi from '@/contracts/abi/oneMonthStakingContractAbi.json';
import oneYearStakingContractAbi from '@/contracts/abi/oneYearStakingContractAbi.json';
import sixMonthStakingContractAbi from '@/contracts/abi/sixMonthStakingContractAbi.json';

export const pools: Pool[] = [
    { index: 0, duration: "1 day", text: "One-Day Pool", reward: "5%", abi: oneDayStakingContractAbi },
    { index: 1, duration: "1 week", text: "One-Week Pool", reward: "7%", abi: oneWeekStakingContractAbi },
    { index: 2, duration: "1 month", text: "One-Month Pool", reward: "10%", abi: oneMonthStakingContractAbi },
    { index: 3, duration: "6 months", text: "Six-Month Pool", reward: "30%", abi: sixMonthStakingContractAbi },
    { index: 4, duration: "12 months", text: "One-Year Pool", reward: "50%", abi: oneYearStakingContractAbi },
];

export const poolsInfo: any[] = [
    { index: 0, duration: "1 day", text: "One-Day Pool", reward: "5%", stakeIds: [] },
    { index: 1, duration: "1 week", text: "One-Week Pool", reward: "7%", stakeIds: [] },
    { index: 2, duration: "1 month", text: "One-Month Pool", reward: "10%", stakeIds: [] },
    { index: 3, duration: "6 months", text: "Six-Month Pool", reward: "30%", stakeIds: [] },
    { index: 4, duration: "12 months", text: "One-Year Pool", reward: "50%", stakeIds: [] },
];

