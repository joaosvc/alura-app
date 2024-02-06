import { getCategories } from "@/app/api/get-categories/get-categories";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useState } from "react";
import { Category } from "@/client/models/category/category";
import CategorySkeleton from "./skeleton";
import CategoryCard from "./card";

interface CategoriesProps extends HTMLProps<HTMLDivElement> {
  user: User;
  onSelectCategory: (category: string) => void;
}

export default function Categories({
  user,
  onSelectCategory,
  ...props
}: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        setCategories(await getCategories(user.jwtToken));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user.jwtToken) {
      fetchData();
    }
  }, [user.jwtToken]);

  const CategoryContent = () => {
    if (loading) {
      return <CategorySkeleton />;
    }

    if (categories.length > 0) {
      return categories.map((category, index) => (
        <CategoryCard
          key={index}
          category={category}
          onClick={() => onSelectCategory(category.category)}
        />
      ));
    } else {
      return (
        <div className="w-full flex justify-center">
          <div className="w-11/12 lg:w-full flex items-center justify-center p-6 pr-3 pl-3 rounded-md bg-gray-100 dark:bg-gray-800">
            <p>Nenhuma categoria disponível no momento</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto mt-20 lg:mt-48" {...props}>
      <div className="w-full flex flex-wrap justify-between mx-auto max-w-full">
        <CategoryContent />
      </div>
    </div>
  );
}
