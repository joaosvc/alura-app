"use client";

import { getAtobURIDecode } from "@/client/hooks/get-atob-decode";
import { useCurrentUser } from "@/client/hooks/use-current-user";
import Modules from "@/components/dashboard/categories/modules/modules";

interface CategoryModulesProps {
  params: {
    category: string;
  };
}

export default function CategoryModules({ params }: CategoryModulesProps) {
  const user = useCurrentUser();
  const category = getAtobURIDecode(params.category);

  return (
    <div className="mt-32">
      <Modules user={user} category={category} />
    </div>
  );
}
