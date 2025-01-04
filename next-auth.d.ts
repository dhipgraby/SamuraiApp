
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  rol: number | any;
  isTwoFactorEnabled: boolean | any;
  isOAuth: boolean;
  accessToken: string | any;
  userStatus: string | any;
  email: string | any;
};

declare module "next-auth" {

  interface Session {
    user: ExtendedUser;
  }

  interface User extends ExtendedUser { }

  interface AdapterUser extends ExtendedUser { }

}
