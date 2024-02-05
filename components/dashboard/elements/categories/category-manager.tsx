import { User } from "@/client/structs/types/next-auth";
import { useState } from "react";
import Categories from "./category/categories";
import ModulesManager from "./modules/modules-manager";

export default function CategoryManager({ user }: { user: User }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="flex flex-wrap justify-between mx-auto max-w-md lg:max-w-5xl mt-32 lg:mt-48">
      <Categories
        user={user}
        onSelectCategory={setSelectedCategory}
        hidden={!!selectedCategory}
      />

      <ModulesManager
        user={user}
        category={selectedCategory}
        hidden={!selectedCategory}
        back={() => setSelectedCategory(null)}
      />
    </section>
  );
}
