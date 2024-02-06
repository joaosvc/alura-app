"use client";

import { useCurrentUser } from "@/client/hooks/use-current-user";
import CategoryManager from "@/components/dashboard/elements/categories/category-manager";

export default function Dashboard() {
  const user = useCurrentUser();

  return <CategoryManager user={user} />;
}
