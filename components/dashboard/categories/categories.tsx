import { getCategories } from "@/app/api/get-categories/get-categories";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { Category } from "@/client/models/category/category";
import CategoryContent from "./category/content";

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

  return (
    <div
      className="flex flex-wrap justify-between mx-auto max-w-sm lg:max-w-5xl"
      {...props}
    >
      <CategoryContent categories={categories} loading={loading} />
    </div>
  );
}
