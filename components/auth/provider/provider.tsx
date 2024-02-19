"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import TokenValidation from "./token/token-validation";

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session;
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}

      {!session.user.jwtToken && <TokenValidation />}
    </SessionProvider>
  );
}
