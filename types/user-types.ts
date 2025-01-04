export enum UserRoles {
    NO_ROLE = 0,
    INDIVIDUAL = 1,
    BUSINESS = 2,
    ADMIN = 3
}

export enum UserStatus {
    PROCESSING = 0,
    VERIFIED = 1,
    REQUEST = 2,
    BANNED = 3,
}

export enum BusinessFormStages {
    COMPANY_INFO = 1,
    COMPANY_KYC = 2,
    AUTH_SIGNATURES = 3,
    CONTRACTING_PARTY = 4,
    BENEFICIARY = 5,
    DOCUMENTATION = 6,
    SIGN_PDF = 7,
    PROCESSING = 8,
    REQUEST = 9,
}

export interface IndividualProfileProps {
    phoneNumber: string | null;
    phoneDialCode: string | null;
    residenceAddress: string | null;
    residenceCountry: string | null;
    incomeEstimations: string;
    industry: string;
    currentOccupation: string;
    activeInSectors: boolean | string;
    originOfFunds: string;
    otherFundsOrigin: string | null;
    ultimateBeneficiary: boolean | string;
    beneficiary: string;
    isPhoneVerified: boolean;
    documentType: string;
    identityUrl: string | null;
    personalIdFile: any;
    personalIdReversedFile: any;
    id_expiration: string;
    residenceProofUrl: string | null;
    proofOfResidenceFile: any;
    proofOfResidence: string | null;
    videoFile: string | null;
    lastStep: number;
}

export interface PersonalInfoProps {
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    nationality: string | null;
    politicallyExposed: boolean | null | string
}

export interface UserSession {
    name: string;
    email: string;
    rol: number;
    userStatus: number;
    isTwoFactorEnabled: boolean;
    accessToken: string;
};

export interface KycProfileExtended {
    estimatedAnnualIncomeEUR: string;
    estimatedNetWealthEUR: string;
    expectedTradingVolumePerYearEUR: string;
}