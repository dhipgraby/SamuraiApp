import { z } from 'zod';

export const VendorsConfigSchema = z.object({
    feeRate: z.any().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }).refine((val) => parseInt(val, 10) >= 0, {
        message: "Minimum fee rate is 0%"
    }).refine((val) => parseInt(val, 10) < 100, {
        message: "Maximum fee rate is 99%"
    }).optional(),
    isTwoFactorEnabled: z.boolean(),
    isTwoFactorSmsEnabled: z.boolean(),
    email: z.string().email(),
    phoneNumber: z.string().min(2, { message: "Phone number is required" }).refine((val) => {
        return val === "" ? false : true;
    }, {
        message: "Phone number is required."
    }),
    phoneDialCode: z.string().min(2, { message: "Dial code is required" }).refine((val) => {
        return val === "" ? false : true;
    }, {
        message: "Dial code is required."
    }),
});

export type VendorsConfig = z.infer<typeof VendorsConfigSchema>;