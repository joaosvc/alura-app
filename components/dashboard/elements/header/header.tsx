"use client";

import { signOut } from "next-auth/react";
import { User } from "@/client/structs/types/next-auth";
import Profile from "./profile";
import Link from "next/link";

export default function Header({ user }: { user: User }) {
  const handleLogout = async () => await signOut();

  return (
    <header className="flex flex-row justify-between items-center p-6 px-12 lg:px-8 mx-auto max-w-7xl">
      <Link href="/">
        <Profile user={user} type="dashboard" />
      </Link>

      <div className="cursor-pointer hover:underline" onClick={handleLogout}>
        {"Log out "}
        <span className="ml-1" aria-hidden="true">
          &rarr;
        </span>
      </div>
    </header>
  );
}
