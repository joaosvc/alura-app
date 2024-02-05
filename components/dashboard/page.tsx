import { User } from "@/client/structs/types/next-auth";

export default function DashboardPage({ user }: { user: User }) {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      <div className="text-white">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </section>
  );
}
