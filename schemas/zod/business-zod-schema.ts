import * as z from 'zod';
import { FileSchema } from './form-zod-schema';

export type companyInfoDto = {
    companyName: string | undefined,
    registrationNumber: string | undefined,
    foundingDate: string | undefined,
    companyAddress: string | undefined,
    companyZipCode: string | undefined,
    companyCountry: string | undefined,
    companyPhone: string | undefined,
    companyDialCode: string | undefined,
    companyCity: string | undefined,
    companyEmail: string | undefined,
    companyMobile: string | undefined,
    companyMobileDialCode: string | undefined,
    companyOpAddress: string | undefined,
    companyOpZipCode: string | undefined,
    companyOpCountry: string | undefined,
    companyOpPhone: string | undefined,
    companyOpDialCode: string | undefined,
    companyOpCity: string | undefined,
    companyOpEmail: string | undefined,
    companyOpMobile: string | undefined,
    companyOpMobileDialCode: string | undefined,
}

export const BusinessCompanyInfoSchema = z.object({
    companyName: z.string().min(2, "Required").max(255),
    registrationNumber: z.string().min(2, "Required").max(50),
    foundingDate: z.string(),
    companyAddress: z.string().min(2, "Required").max(255),
    companyZipCode: z.string().min(2, "Required").max(255),
    companyCountry: z.string().refine(value => {
        return value.trim() !== "";
    }, {
        message: "Please select one option",
    }),
    companyPhone: z.string().optional(),
    companyDialCode: z.string().optional(),
    companyCity: z.string().min(2, "Required").max(255),
    companyEmail: z.string().email(),
    companyMobile: z.string().nullable().optional(),
    companyMobileDialCode: z.string().nullable().optional(),
    companyOpAddress: z.string().min(2, "Required").max(255),
    companyOpZipCode: z.string().min(2, "Required").max(255),
    companyOpCountry: z.string().refine(value => {
        return value.trim() !== "";
    }, {
        message: "Please select one option",
    }),
    companyOpPhone: z.string().optional(),
    companyOpDialCode: z.string().optional(),
    companyOpCity: z.string().min(2, "Required").max(255),
    companyOpEmail: z.string().email(),
    companyOpMobile: z.string().nullable().optional(),
    companyOpMobileDialCode: z.string().nullable().optional(),
});

export type BusinessKycDto = {
    legalForm: string | undefined;
    otherLegalForm: string | undefined,
    isOtherLegal: boolean,
    isOtherdocimiliaryReason: boolean,
    docimiliaryDeclaration: string | false[];
    docimiliaryReason?: string | undefined,
    numberOfEmployees: string | undefined;
    businessActivity: string | undefined;
    placeOfBusiness: string | undefined;
    annualNetProfit: string | undefined;
    sourceOfFunds: string | never[];
    otherFundsSouce: string | undefined;
    tradingVolume: string | undefined;
    isSigned?: string | undefined;
}

export const BusinessKycSchema = z.object({
    legalForm: z.string(),
    isOtherLegal: z.boolean().optional(),
    otherLegalForm: z.string().optional(),
    docimiliaryDeclaration: z.array(z.boolean()).length(2),
    isOtherdocimiliaryReason: z.boolean().optional(),
    docimiliaryReason: z.string().optional(),
    numberOfEmployees: z.string().refine(value => {
        return value.trim() !== ""; // Ensure the value is not empty after trimming
    }, {
        message: "Please select one option for number of employees",
    }),
    businessActivity: z.string().min(2, "Required").max(255),
    placeOfBusiness: z.string().min(2, "Required").max(255),
    annualNetProfit: z.string().min(1, "Required").max(255),
    sourceOfFunds: z.array(z.string()),
    otherFundsSouce: z.string().optional(),
    tradingVolume: z.string().min(2, "Required").max(255)
}).refine((data) => {
    const isOtherLegal = data.isOtherLegal;
    const otherLegalFormNotEmpty = data.otherLegalForm && data.otherLegalForm.trim() !== "";
    if (isOtherLegal) {
        if (!otherLegalFormNotEmpty) return false;
    }
    return true;
}, {
    message: "Please specify other",
    path: ["otherReason"]
}).refine((data) => {
    const legalFormNotEmpty = data.legalForm && data.legalForm.trim() !== "";
    const isOtherLegal = data.isOtherLegal;
    if (isOtherLegal === false) {
        if (!legalFormNotEmpty) return false;
    }
    return true;
}, {
    message: "At least one legal form must be selected or specify other type",
    path: ["legalForm"]
}).refine((data) => {
    const docimiliaryDeclaration = data.docimiliaryDeclaration.some(value => value === true)
    const isOtherdocimiliaryReason = data.isOtherdocimiliaryReason;
    if (!docimiliaryDeclaration && !isOtherdocimiliaryReason) return false
    return true;
}, {
    message: "At least one legal form must be selected or specify other",
    path: ["docimiliaryDeclaration"]
}).refine((data) => {
    const isOtherdocimiliaryReason = data.isOtherdocimiliaryReason;
    const docimiliaryReason = data.docimiliaryReason && data.docimiliaryReason.trim() !== "";
    if (isOtherdocimiliaryReason === true) {
        if (!docimiliaryReason) return false
    }
    return true;
}, {
    message: "c) is marked, please explain a reason",
    path: ["docimiliaryDeclaration"]
}).refine((data) => {
    const sourceOfFunds = data.sourceOfFunds && (data.sourceOfFunds.length > 0);
    const otherFundsSouce = data.otherFundsSouce && data.otherFundsSouce.trim() !== "";
    if (sourceOfFunds) return true;
    if (otherFundsSouce) return true;
    return false;
}, {
    message: "At least one source of funds must be selected or specify other",
    path: ["sourceOfFunds"]
});

export type BusinessAuthorizedSignaturesDto = {
    fullName: string | undefined,
    address: string | undefined,
    country: string | undefined,
    nationality: string | undefined,
    zipCode: string | undefined,
    roleInCompany: string | undefined,
    nationalIdExpiration: string | undefined,
    dateOfBirth: string | undefined,
    politicallyExposed: boolean,
    relativeExposed: boolean,
    signatureType: boolean,
    personalFile: any,
    personalReversedFile?: any,
    selfieFile: any,
    addressFile: any
}

export const BusinessAuthorizedSignaturesSchema = z.object({
    fullName: z.string().min(2, "This field is required").max(255),
    address: z.string().min(2, "This field is required").max(255),
    country: z.string().min(2, "This field is required").max(255),
    nationality: z.string().min(2, "This field is required").max(255),
    zipCode: z.any().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    roleInCompany: z.string().min(2, "This field is required").max(255),
    nationalIdExpiration: z.string().min(2, "This field is required").max(255),
    dateOfBirth: z.string().min(2, "This field is required").max(255),
    politicallyExposed: z.boolean().default(false),
    relativeExposed: z.boolean().default(false),
    signatureType: z.boolean().default(false),
    personalFile: FileSchema,
    personalReversedFile: FileSchema.optional(),
    selfieFile: FileSchema,
    addressFile: FileSchema
})

export type ContractingPartyDto = {
    contractingTicks: boolean[],
    cPersonName: string | undefined,
    cPersonAddress: string | undefined,
    cPersonNationality: string | undefined,
    cPersonRole: string | undefined,
    cSecondPersonName?: string | undefined,
    cSecondPersonAddress?: string | undefined,
    cSecondPersonNationality?: string | undefined,
    cSecondPersonRole?: string | undefined,
    cThirdPersonName?: string | undefined,
    cThirdPersonAddress?: string | undefined,
    cThirdPersonNationality?: string | undefined,
    cThirdPersonRole?: string | undefined,
    relavantInfo?: string | undefined,
    nameOfClient: string | undefined,
};

export const ContractingPartySchema = z.object({
    contractingTicks: z.array(z.boolean()).length(3).refine(values => {
        return values.some(value => value === true);
    }, {
        message: "Please select at least one option for contractingTicks",
    }),
    cPersonName: z.string().min(2, "This field is required").max(255),
    cPersonAddress: z.string().min(2, "This field is required").max(255),
    cPersonNationality: z.string().min(2, "This field is required").max(255),
    cPersonRole: z.string().min(2, "This field is required").max(255),
    cSecondPersonName: z.string().nullable().optional(),
    cSecondPersonAddress: z.string().nullable().optional(),
    cSecondPersonNationality: z.string().nullable().optional(),
    cSecondPersonRole: z.string().nullable().optional(),
    cThirdPersonName: z.string().nullable().optional(),
    cThirdPersonAddress: z.string().nullable().optional(),
    cThirdPersonNationality: z.string().nullable().optional(),
    cThirdPersonRole: z.string().nullable().optional(),
    relavantInfo: z.string().max(255, {
        message: "Max descriptio of 250 characters"
    }).nullable().optional(),
    nameOfClient: z.string().min(3, {
        message: "Please provide a full name of client or company"
    })
}).refine((data) => {
    const contractingTicks = data.contractingTicks;
    const personObj = [
        data.cPersonName,
        data.cPersonAddress,
        data.cPersonNationality,
        data.cPersonRole
    ]

    if (contractingTicks[2] === true) {
        if (personObj.some(value => value === "")) return false
    }
    return true
}, {
    message: "Specify at least 1 contracting person,",
    path: ["person"]
});

export type BusinessBeneficiaryDto = {
    firstFullName?: string;
    firstDateOfBirth?: string;
    firstNationality?: string;
    firstAddress?: string;
    firstCity?: string;
    firstZipCode?: number | null;
    firstCountry?: string;
    firstPoliticallyExposed?: boolean;
    firstDocumentExpiration?: string;
    firstDocumentFile?: any;
    firstDocumentReversedFile?: any;
    secondFullName?: string;
    secondDateOfBirth?: string | null;
    secondNationality?: string;
    secondAddress?: string;
    secondCity?: string;
    secondZipCode?: number | null;
    secondCountry?: string;
    secondPoliticallyExposed?: boolean;
    secondDocumentExpiration?: string | null;
    secondDocumentFile?: any;
    secondDocumentReversedFile?: any;
    thirdFullName?: string;
    thirdDateOfBirth?: string | null;
    thirdNationality?: string;
    thirdAddress?: string;
    thirdCity?: string;
    thirdZipCode?: number | null;
    thirdCountry?: string;
    thirdPoliticallyExposed?: boolean;
    thirdDocumentFile?: any;
    thirdDocumentReversedFile?: any;
    thirdDocumentExpiration?: string | null;
    contractingPartner?: string;
    announceChanges: boolean;
};

export const BusinessBeneficiarySchema = z.object({
    firstFullName: z.string().min(2, "This field is required").max(255),
    firstDateOfBirth: z.string().min(2, "This field is required").max(255),
    firstNationality: z.string().min(2, "This field is required").max(255),
    firstAddress: z.string().min(2, "This field is required").max(255),
    firstCity: z.string().min(2, "This field is required").max(255),
    firstZipCode: z.any().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    firstCountry: z.string().min(2, "This field is required").max(255),
    firstPoliticallyExposed: z.boolean(),
    firstDocumentExpiration: z.string(),
    firstDocumentFile: FileSchema,
    firstDocumentReversedFile: z.union([FileSchema, z.undefined()]),
    secondFullName: z.string().nullable().optional(),
    secondDateOfBirth: z.string().nullable().optional(),
    secondNationality: z.string().nullable().optional(),
    secondAddress: z.string().nullable().optional(),
    secondCity: z.string().nullable().optional(),
    secondZipCode: z.any().nullable().optional().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    secondCountry: z.string().nullable().optional(),
    secondPoliticallyExposed: z.boolean().optional(),
    secondDocumentExpiration: z.string().nullable().optional(),
    secondDocumentFile: z.union([FileSchema, z.undefined()]),
    secondDocumentReversedFile: z.union([FileSchema, z.undefined()]),
    thirdFullName: z.string().nullable().optional(),
    thirdDateOfBirth: z.string().nullable().optional(),
    thirdNationality: z.string().nullable().optional(),
    thirdAddress: z.string().nullable().optional(),
    thirdCity: z.string().nullable().optional(),
    thirdZipCode: z.any().optional().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    thirdCountry: z.string().nullable().optional(),
    thirdPoliticallyExposed: z.boolean().optional(),
    thirdDocumentExpiration: z.string().nullable().optional(),
    thirdDocumentFile: z.union([FileSchema, z.undefined()]),
    thirdDocumentReversedFile: z.union([FileSchema, z.undefined()]),
    contractingPartner: z.string().nullable().optional(),
    announceChanges: z.boolean()
});

export type BusinessDocumentationDto = {
    proofOfAddressFile: any,
    comercialRegistryFile?: any,
    corporateCharteFile?: any,
    associationArticlesFile?: any,
}

export const BusinessDocumentationSchema = z.object({
    proofOfAddressFile: FileSchema,
    comercialRegistryFile: z.union([FileSchema, z.undefined()]),
    corporateCharteFile: z.union([FileSchema, z.undefined()]),
    associationArticlesFile: z.union([FileSchema, z.undefined()]),
}).refine((data) => {
    const { proofOfAddressFile, comercialRegistryFile, corporateCharteFile, associationArticlesFile } = data;

    // Proof of address is always required
    if (!proofOfAddressFile) return false;
    // If commercial registry file is provided, no need to check further
    if (comercialRegistryFile) return true;
    // If commercial registry file is not provided, both corporateCharteFile and associationArticlesFile must be provided
    return corporateCharteFile && associationArticlesFile;
}, {
    message: "Proof of address is required. Additionally, Comercial Registry is required, but if you don't have this document, you must provide both Corporate Charter and Association Articles.",
    path: ["documentation"]
});

export const SignedFileSchema = z.object({
    signedFile: FileSchema
});