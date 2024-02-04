import NextAuth, { NextAuthOptions } from "next-auth";
import PrismaClient from "@/client/prisma";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(PrismaClient),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("missing-credentials");
        }

        const existingUser = await PrismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser || !existingUser.password) {
          throw new Error("user-not-found");
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new Error("invalid-credentials");
        }

        return { ...existingUser, id: existingUser.id.toString() };
      },
    }),
  ],
};

const AuthHandler = NextAuth(authOptions);

export { AuthHandler as GET, AuthHandler as POST };
