/* eslint-disable react-hooks/exhaustive-deps */
import { getCategoryModules } from "@/app/api/get-category-modules/get-category-modules";
import { CategoryModules as ICategoryModules } from "@/client/models/category/module";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { setPageBaseTitle } from "@/client/hooks/use-page-title";
import ModulesContent from "./module/content";

interface ModulesProps extends HTMLProps<HTMLDivElement> {
  user: User;
  category: string;
}

export default function CategoryModules({
  user,
  category,
  ...props
}: ModulesProps) {
  const [modules, setModules] = useState<ICategoryModules>({});
  const [isAvailable, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchModules = async (category: string, jwtToken: string) => {
        setLoading(true);

        try {
          const modulesResponse = await getCategoryModules(category, jwtToken);

          if (modulesResponse.success) {
            setModules(modulesResponse.body!);

            setPageBaseTitle(category);
          } else {
            if (modulesResponse.error === "category-not-found") {
              setAvailable(false);
              setPageBaseTitle("Categoria não encontrada");
            } else {
              throw new Error(modulesResponse.error);
            }
          }
        } catch (error) {
          console.error(`Error fetching modules of ${category}`, error);
        } finally {
          setLoading(false);
        }
      };

      if (category && user.jwtToken) {
        fetchModules(category, user.jwtToken);
      }
    }
  }, []);

  return (
    <div className="flex flex-wrap mx-auto max-w-sm lg:max-w-5xl" {...props}>
      <ModulesContent
        modules={modules}
        isAvailable={isAvailable}
        loading={loading}
      />
    </div>
  );
}
