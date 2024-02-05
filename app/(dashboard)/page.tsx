"use client";

import DashboardPage from "@/components/dashboard/page";
import LoadingPage from "@/components/loading/loading-page";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return <LoadingPage />;
  }

  return <DashboardPage user={session.user} />;
}
