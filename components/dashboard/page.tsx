import { User } from "@/client/structs/types/next-auth";
import Header from "./elements/header/header";
import Categories from "./elements/categories/categories";

export default function DashboardPage({ user }: { user: User }) {
  return (
    <section className="min-h-screen text-gray-70 dark:text-white bg-white dark:bg-gray-900">
      <Header user={user} />

      <div className="mt-32 lg:mt-48">
        <Categories user={user} />
      </div>
    </section>
  );
}
