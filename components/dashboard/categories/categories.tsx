import { getCategories } from "@/app/api/get-categories/get-categories";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { Category } from "@/client/models/category/category";
import CategorySkeleton from "./category/skeleton";
import CategoryCard from "./category/card";
import UnavailableBox from "@/components/elements/unavailable-box";

interface CategoriesProps extends HTMLProps<HTMLDivElement> {
  user: User;
}

export default function Categories({ user, ...props }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchCategories = async () => {
        setLoading(true);

        try {
          const categoriesResponse = await getCategories(user.jwtToken);

          if (categoriesResponse.success) {
            setCategories(categoriesResponse.body!);
          } else {
            throw new Error(categoriesResponse.error);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      };

      if (user.jwtToken) {
        fetchCategories();
      }
    }
  }, [user.jwtToken]);

  const CategoryContent = () => {
    if (loading) {
      return <CategorySkeleton />;
    }

    if (categories.length > 0) {
      return categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ));
    } else {
      return (
        <UnavailableBox>Nenhuma categoria disponível no momento</UnavailableBox>
      );
    }
  };

  return (
    <div
      className="flex flex-wrap justify-between mx-auto max-w-sm lg:max-w-5xl"
      {...props}
    >
      <CategoryContent />
    </div>
  );
}
