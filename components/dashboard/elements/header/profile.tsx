import { User } from "@/client/structs/types/next-auth";

interface ProfileProps {
  user: User;
  type?: "dashboard" | "user";
}

export default function Profile({ user, type }: ProfileProps) {
  const isDashboard = type === "dashboard";

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {isDashboard ? "Dashboard" : user.name}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {isDashboard ? `Welcome back, ${user.name}!` : user.email}
      </p>
    </div>
  );
}
