"use client";

import { useCurrentUser } from "@/client/hooks/use-current-user";
import Categories from "@/components/dashboard/categories/categories";

export default function Dashboard() {
  const user = useCurrentUser();

  return (
    <div className="mt-16 lg:mt-32">
      <Categories user={user} />
    </div>
  );
}
