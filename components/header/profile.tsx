import { User } from "@/client/structs/types/next-auth";
import { HTMLProps } from "react";

interface ProfileProps extends HTMLProps<HTMLDivElement> {
  user: User;
  type?: "dashboard" | "user";
}

export default function Profile({ user, type, ...props }: ProfileProps) {
  const isDashboard = !type || type === "dashboard";

  return (
    <div className="flex flex-col" {...props}>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {isDashboard ? "Dashboard" : user.name}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {isDashboard ? `Welcome back, ${user.name}!` : user.email}
      </p>
    </div>
  );
}
