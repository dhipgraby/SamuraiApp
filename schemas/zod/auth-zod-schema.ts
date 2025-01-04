import { z } from "zod";

const MIN_PSWD_LENGTH = 8;

export const PSWD_FIELD_VALIDATION = {
    TEST: {
        SPECIAL_CHAR: (value: string) =>
            /[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]+/.test(value),
        LOWERCASE: (value: string) => /[a-z]/.test(value),
        UPPERCASE: (value: string) => /[A-Z]/.test(value),
        NUMBER: (value: string) => /.*[0-9].*/.test(value)
    },
    MSG: {
        MIN_LEN: `Password must have ${MIN_PSWD_LENGTH} characters`,
        SPECIAL_CHAR: "Password must contain at least one special character",
        LOWERCASE: "Password must contain at least one lowercase letter",
        UPPERCASE: "Password must contain at least one uppercase letter",
        NUMBER: "Password must contain at least one number",
        MATCH: "Password must match"
    }
};

export const RecoverPasswordSchema = z.object({
    email: z.string().email()
});

export const LoginSchema = z.object({
    identifier: z.union([
        //username
        z.string().min(4, { message: "Must have at least 4 characters" }),
        //email
        z.string().email()
    ]),
    password: z.string().min(5, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
});

export const SignInSchema = z.object({
    token: z.string().min(10, {
        message: "Token is required"
    })
});

export const PasswordSchema = z
    .string()
    .min(MIN_PSWD_LENGTH, {
        message: PSWD_FIELD_VALIDATION.MSG.MIN_LEN
    })
    .refine(
        PSWD_FIELD_VALIDATION.TEST.SPECIAL_CHAR,
        PSWD_FIELD_VALIDATION.MSG.SPECIAL_CHAR
    )
    .refine(
        PSWD_FIELD_VALIDATION.TEST.LOWERCASE,
        PSWD_FIELD_VALIDATION.MSG.LOWERCASE
    )
    .refine(
        PSWD_FIELD_VALIDATION.TEST.UPPERCASE,
        PSWD_FIELD_VALIDATION.MSG.UPPERCASE
    )
    .refine(PSWD_FIELD_VALIDATION.TEST.NUMBER, PSWD_FIELD_VALIDATION.MSG.NUMBER);

export const SignUpSchema = z
    .object({
        username: z.string().min(4, { message: "Must have at least 4 characters" }),
        email: z.string().email(),
        password: PasswordSchema,
        confirmPassword: PasswordSchema
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            addFieldIssue("password", ctx);
            addFieldIssue("confirmPassword", ctx);
        }
    });

export const ResetPassowrdSchema = z
    .object({
        email: z.string().email()
    });

export const NewPasswordSchema = z
    .object({
        token: z.string(),
        password: PasswordSchema,
        confirmPassword: PasswordSchema
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            addFieldIssue("password", ctx);
            addFieldIssue("confirmPassword", ctx);
        }
    });

export const NewVoucherPasswordSchema = z
    .object({
        password: PasswordSchema,
        confirmPassword: PasswordSchema,
        code: z.string().min(16, { message: "Voucher code is required" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            addFieldIssue("password", ctx);
            addFieldIssue("confirmPassword", ctx);
        }
    });

// add custom error message
const addFieldIssue = (field: string, ctx: z.RefinementCtx) => {
    ctx.addIssue({
        code: "custom",
        message: PSWD_FIELD_VALIDATION.MSG.MATCH,
        path: [field],
        fatal: true
    });
};

export type LoginInputs = z.infer<typeof LoginSchema>;
export type RecoverPasswordInput = z.infer<typeof RecoverPasswordSchema>;
export type SignUpInputs = z.infer<typeof SignUpSchema>;
