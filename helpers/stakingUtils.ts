import { ethers } from "ethers";

export const formatEther = (value) => {
  return parseInt(ethers.formatEther(value.toString())).toLocaleString();
};
