import { ethers } from "ethers";

export const formatEther = (value: any) => {
  return parseInt(ethers.formatEther(value.toString())).toLocaleString();
};

/**
 * Converts a Unix timestamp to a human-readable date string.
 * @param {number} timestamp - The Unix timestamp to convert.
 * @returns {string} - The formatted date string.
 */
export const convertTimestampToDate = (timestamp: number): string => {
  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString('en-US', {
   // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  return formattedDate;
};
