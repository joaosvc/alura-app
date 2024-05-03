import NextAuth, { NextAuthOptions } from "next-auth";
import PrismaClient from "@/client/prisma";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AUTH_ROUTE_SIGNIN } from "@/routes";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(PrismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: AUTH_ROUTE_SIGNIN,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.ENV_NODE === "development",
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any | null> {
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

        return { ...existingUser };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      token.jwtToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzIjoxNzE3MzM2NjMyMjQ4fQ.iHdKZoZz859V_-QMEFDnpJ54oLhMoKr7SiOIZX1gsmyoNfKVmqlzs9Lwq6q5bSpx3dFIRn0zVIONGqvYMfQMLg"";

      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          lastname: token.lastname,
          email: token.email,
          jwtToken: token.jwtToken,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        /** FAKE JWT TOKEN */
        user.jwtToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzIjoxNzE3MzM2NjMyMjQ4fQ.iHdKZoZz859V_-QMEFDnpJ54oLhMoKr7SiOIZX1gsmyoNfKVmqlzs9Lwq6q5bSpx3dFIRn0zVIONGqvYMfQMLg"";

        token = {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          jwtToken: user.jwtToken,
        };
      }

      return token;
    },
  },
};

export const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
