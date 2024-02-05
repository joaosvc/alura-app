import { getCategories } from "@/app/api/auth/get-categories/get-categories";
import { User } from "@/client/structs/types/next-auth";
import { useEffect, useState } from "react";
import CategorySkeleton from "./category-skeleton";
import CategoryCard from "./category-card";

const jwtToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzIjoxNzA5MzIzOTEwNDg4fQ.Djo3Lir4OkXUD53gQw-FwlolEMKQ4S93U9LPBF13wftLJH-kWuOw68YtGx2c8Q6YPWPLkqELxGvaxIIv8uee9g";

export default function Categories({ user }: { user: User }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await getCategories(jwtToken));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-wrap justify-between mx-auto max-w-md lg:max-w-5xl">
      {loading && false ? (
        <CategorySkeleton />
      ) : categories.length > 0 || loading ? (
        categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full p-6 rounded-md bg-gray-800">
          <p>Nenhuma categoria disponivel no momento</p>
        </div>
      )}
    </section>
  );
}
