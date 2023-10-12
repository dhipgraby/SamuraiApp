import { ethers } from "ethers";

export const formatEther = (value: any) => {
  return parseInt(ethers.formatEther(value.toString())).toLocaleString();
};
