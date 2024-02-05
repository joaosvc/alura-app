import { signOut } from "next-auth/react";
import { User } from "@/client/structs/types/next-auth";

export default function DashboardHeader({ user }: { user: User }) {
  const handleLogout = async () => await signOut();

  return (
    <header className="flex justify-between items-center p-6 px-12 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {user.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
      <div className="cursor-pointer hover:underline" onClick={handleLogout}>
        Log out{" "}
        <span className="ml-1" aria-hidden="true">
          &rarr;
        </span>
      </div>
    </header>
  );
}
