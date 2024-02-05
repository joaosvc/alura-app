import { User } from "@/client/structs/types/next-auth";
import DashboardHeader from "./elements/header";

export default function DashboardPage({ user }: { user: User }) {
  return (
    <section className="min-h-screen text-gray-70 dark:text-white bg-white dark:bg-gray-900">
      <DashboardHeader user={user} />
    </section>
  );
}
