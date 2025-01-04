import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const callbacks: any = {};
const providers = [
  Credentials
];

callbacks.signIn = async function signIn(user: any, account: any) {
  if (account.provider === "credentials") return true;
  return false;
};

callbacks.jwt = async function jwt(token: any, user: any) {
  if (user) {
    token = {
      accessToken: user.accessToken,
      rol: user.rol,
      name: user.name,
      email: user.email,
      userStatus: user.userStatus,
      isTwoFactorEnabled: user.isTwoFactorEnabled
    };
  }
  return token;
};

callbacks.session = async function session(session: any, token: any) {
  session.accessToken = token.accessToken;
  session.rol = token.rol;
  session.name = token.name;
  session.email = token.email;
  session.userStatus = token.userStatus;
  session.isTwoFactorEnabled = token.isTwoFactorEnabled;
  return session;
};

const options: NextAuthConfig = {
  callbacks,
  providers
};

export default NextAuth(options);