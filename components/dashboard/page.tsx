import { User } from "@/client/structs/types/next-auth";
import Header from "./elements/header/header";
import CategoryManager from "./elements/categories/category-manager";

export default function DashboardPage({ user }: { user: User }) {
  /** FAKE JWT TOKEN */
  user.jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzIjoxNzA5MzIzOTEwNDg4fQ.Djo3Lir4OkXUD53gQw-FwlolEMKQ4S93U9LPBF13wftLJH-kWuOw68YtGx2c8Q6YPWPLkqELxGvaxIIv8uee9g";

  return (
    <section className="min-h-screen text-gray-70 dark:text-white bg-white dark:bg-gray-900">
      <Header user={user} />
      <CategoryManager user={user} />
    </section>
  );
}
