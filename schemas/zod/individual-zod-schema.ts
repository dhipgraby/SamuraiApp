import { z } from "zod";
import { FileSchema } from "./form-zod-schema";
import { FileProps } from "@/types/components";

//STEP 1
export const PhoneNumberSchema = z.object({
  phoneDialCode: z.string().min(2, {
    message: "Dial Code can't be empty"
  }),
  phoneNumber: z.string().min(5, {
    message: "Phone number must be at least 6 characters"
  }).max(12)
});

export const PhoneValidationSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

//STEP 2
export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters."
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters."
  }),
  dateOfBirth: z.string(),
  nationality: z.string(),
  politicallyExposed: z.boolean({
    required_error: "Politically field is required"
  })
});

//STEP 3
export type IdFormFields = {
  personalIdFile: FileProps | undefined;
  personalIdReversedFile: FileProps | undefined;
  documentType: string;
  id_expiration: string;
  videoFile: any | undefined;
};

export const IdVerificationSchema = z.object({
  documentType: z.enum([
    "CountryId",
    "Passport"
  ]),
  personalIdFile: FileSchema,
  videoFile: z.any(),
  personalIdReversedFile: FileSchema.optional(),
  id_expiration: z.string().min(6, "Required")
}).refine((data) => {

  if (data.documentType === "CountryId") {
    if (!data.personalIdReversedFile) return false
  }
  return true;
}, {
  message: "If you choose national id, reversed side required",
  path: ["personalIdReversedFile"]
});

//STEP 4

export type ResidenceFormFields = {
  residenceAddress: string;
  residenceCountry: string;
  proofOfResidence: string;
  proofOfResidenceFile: any;
};

export const ResidenceInfoSchema = z.object({
  residenceAddress: z.string().min(2, {
    message: "Residence address is required."
  }),
  residenceCountry: z.string().min(2, {
    message: "Select a country."
  }),
  proofOfResidence: z.enum([
    "Utility Bill",
    "Bank Statement",
    "Residence certificate"
  ]),
  proofOfResidenceFile: FileSchema
});

//STEP 5
export const FinancialInfoSchema = z.object({
  estimatedAnnualIncomeEUR: z.string().min(2, {
    message: "Field required."
  }),
  estimatedNetWealthEUR: z.string().min(2, {
    message: "Field required."
  }),
  expectedTradingVolumePerYearEUR: z.string().min(2, {
    message: "Field required."
  }),
  industry: z.enum([
    "Accommodation and food service activities",
    "Activities of extraterritorial organisations and bodies",
    "Activities of households as employers of domestic personnel",
    "Administrative and support service activities",
    "Agriculture, forestry and fishing",
    "Arts, entertainment and recreation",
    "Construction",
    "Education",
    "Electricity, gas, steam and air-conditioning supply",
    "Financial and Insurance activities",
    "Human health and social work activities",
    "Information and communication",
    "Manufacturing",
    "Mining and quarrying",
    "Undifferentiated goods -and services- producing activities of private households for own use",
    "Professional, scientific and technical activities",
    "Public administration and defence; compulsory social security",
    "Real estate activities",
    "Water supply; Sewerage, waste management and remediation activities",
    "Transportation and storage",
    "Wholesale and retail trade; repair of motor vehicles and motorcycles",
    "Other service activities"
  ]),
  currentOccupation: z.string().min(2, {
    message: "Current occupation field is required."
  }),
  activeInSectors: z.enum(["YES", "NO"])
});

//STEP 6

export type OriginOfFundsType = {
  employmentIncome: boolean | string;
  saleOfRealEstate: boolean | string;
  saleOfSharesOrInvestment: boolean | string;
  loan: boolean | string;
  saleOfCompany: boolean | string;
  inheritance: boolean | string;
  giftOrDonation: boolean | string;
  pensionFunds: boolean | string;
  gamblingWinnings: boolean | string;
  ultimateBeneficiary: string;
  other: string;
}
export const OriginOfFundsSchema = z.object({
  employmentIncome: z.boolean(),
  saleOfRealEstate: z.boolean(),
  saleOfSharesOrInvestment: z.boolean(),
  loan: z.boolean(),
  saleOfCompany: z.boolean(),
  inheritance: z.boolean(),
  giftOrDonation: z.boolean(),
  pensionFunds: z.boolean(),
  gamblingWinnings: z.boolean(),
  ultimateBeneficiary: z.enum(["YES", "NO"]),
  isOther: z.boolean().optional(),
  other: z.string().optional()
}).refine(obj => {
  const isOther = obj.isOther
  const otherSource = obj.other
  if (isOther) {
    if (!otherSource || otherSource?.length < 3) {
      return false
    }
  }
  return true
}, {
  message: "Specify other.",
  path: ["funds-origin"],
}).refine(obj => {
  const objects = Object.values(obj).filter(value => typeof value === "boolean" && value).length >= 1;
  return objects
}, {
  message: "At least one category must be selected.",
  path: ["funds-origin"],
});

export type ResidenceInfoSchemaInput = z.infer<typeof ResidenceInfoSchema>;
export type PhoneNumberSchemaInput = z.infer<typeof PhoneNumberSchema>;

export type IndividualFormInputs = z.infer<typeof PersonalInfoSchema>;
export type IdDocumentFormInputs = z.infer<typeof IdVerificationSchema>;
