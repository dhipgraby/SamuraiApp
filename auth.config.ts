import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "@/schemas/zod/auth-zod-schema";
import { AUTH_URL } from "@/lib/constants";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { UserRoles } from "./types/user-types";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (!validatedFields.success) return null;

                const { token } = validatedFields.data;

                try {
                    const response = await axios.get(`${AUTH_URL}auth/user`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data.rol === UserRoles.ADMIN) return { message: "This user is not allowed", status: 400 };

                    return {
                        name: response.data.name,
                        email: response.data.email,
                        rol: response.data.rol,
                        userStatus: response.data.userStatus,
                        isTwoFactorEnabled: response.data.isTwoFactorEnabled,
                        accessToken: token
                    };
                } catch (error) {
                    console.error("Signing server error", error); // Log the error
                    return { message: "Signing server error", status: 400 };
                }
            }
        })
    ],
} satisfies NextAuthConfig