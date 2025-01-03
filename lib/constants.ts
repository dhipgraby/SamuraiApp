export const KRAKEN_API_URL = process.env.KRAKEN_API_URL || "https://api.kraken.com/";
export const AUTH_SECRET = process.env.AUTH_SECRET || "default_secret";
export const AUTH_URL = process.env.AUTH_API || "http://localhost:3001/";

export const USERS_LOCAL_API = "http://localhost:3002/";
export const USERS_API = process.env.NEXT_PUBLIC_USERS_API || USERS_LOCAL_API;

export const INDIVIDUAL_KYC_URL = `${USERS_API}kyc/individual/`;
export const BUSINESS_KYC_URL = `${USERS_API}kyc/business/`;
export const PDF_DOWNLOAD_URL = `${USERS_API}kyc/business/download-pdf`;
export const PDF_URL = `${USERS_API}kyc/business/template`;

console.log("Using Auth: ", AUTH_URL);
console.log("Using Users: ", USERS_API);