"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import decodeJWTToken from "@/client/hooks/decode-jwt-token";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface TokenValidadtionWrapperProps {
  children: React.ReactNode;
  session: Session;
}

interface JWTTokenPayload {
  expires: number;
}

export default function TokenValidadtionWrapper({
  children,
  session,
}: TokenValidadtionWrapperProps) {
  const [invalidToken, setInvalidToken] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const { expires } = decodeJWTToken(
        session.user?.jwtToken as string
      ) as JWTTokenPayload;

      setInvalidToken(expires < Date.now());
    });

    return () => clearInterval(interval);
  });
  return <>{children}</>;
}
