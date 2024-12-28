import * as z from "zod";

export const CreateDepositSchema = z.object({
    eurAmount: z.any().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }).refine((val) => parseInt(val, 10) >= 98, {
        message: "Minimum to deposit is 100 eur"
    }),
});

export const ResendVoucherSchema = z.object({
    voucherId: z.number().min(1, "Id is required")
});


export const CreateVoucherSchema = z.object({
    fiatAmount: z.any().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }).refine((val) => parseInt(val, 10) > 2, {
        message: "Minimum to amount is 3 eur"
    }).refine((val) => parseInt(val, 10) < 1001, {
        message: "Maximum to amount is 1,000 eur"
    }),
    email: z.union([
        z.literal(''),
        z.string().email(),
    ]).optional(),
    sendSms: z.boolean().optional(),
    phoneNumber: z.string().max(16).optional(),
}).refine((data: any) => {
    const email = data.email;
    const phoneNumber = data.phoneNumber;

    if (!email && !phoneNumber) return false
    return true;
}, {
    message: "Please provide at least an email address or a phone number.",
    path: ["userContactError"]
});

export type ResendVoucherSchemaType = z.infer<typeof ResendVoucherSchema>;
export type CreateVoucherSchemaType = z.infer<typeof CreateVoucherSchema>;
export type CreateDepositSchemaType = z.infer<typeof CreateDepositSchema>;