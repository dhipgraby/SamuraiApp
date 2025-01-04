import NextAuth from "next-auth"
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      return true;
    },
    async session({ token, session }) {

      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
        session.user.rol = token.rol;
        session.user.name = token.name;
        session.user.email = token.email || undefined;
        session.user.userStatus = token.userStatus;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {

      if (!token.sub) return token;
      if (user) {
        token = {
          accessToken: user.accessToken,
          rol: user.rol,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
          name: user.name,
          email: user.email,
          userStatus: user.userStatus
        }
      }
      return token;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
