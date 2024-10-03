import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getMe } from "@/features/user/get-me";
import { loginUser } from "@/features/user/login-user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/register",
    signOut: "/sign-out",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { accessToken, refreshToken } = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          if (!accessToken || !refreshToken) return null;

          const user = await getMe(accessToken);
          if (!user) return null;
          return {
            ...user,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.refreshToken = user.refreshToken;
        token.id = +user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 5;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
        firstName: token.firstName,
        lastName: token.lastName,
        avatar: token.avatar,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
};
