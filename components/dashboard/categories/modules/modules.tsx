import { getCategoryModules } from "@/app/api/get-category-modules/get-category-modules";
import { CategoryModules as ICategoryModules } from "@/client/models/category/module";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";
import ModulesSkeleton from "./module/skeleton";
import UnavailableBox from "@/components/elements/unavailable-box";
import CourseCard from "./course/card";
import { setPageBaseTitle } from "@/client/hooks/use-page-title";

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
  const [isAvaliable, setAvaliable] = useState(true);
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
              setAvaliable(false);
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
  }, [category, user.jwtToken]);

  const ModulesContent = () => {
    if (loading) {
      return <ModulesSkeleton />;
    }
    const categories = Object.entries(modules);

    if (categories.length > 0) {
      return categories.map(([category, data]) => {
        const courses = Object.entries(data);

        return (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-bold mb-2 ml-2">{category}</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4">
              {courses.map(([course, data]) => (
                <CourseCard
                  key={course}
                  course={course}
                  courseData={data}
                  animation={true}
                />
              ))}
            </div>
          </div>
        );
      });
    } else {
      return (
        <UnavailableBox>
          {isAvaliable
            ? "Nenhum modulo disponível no momento"
            : "Categoria não encontrada"}
        </UnavailableBox>
      );
    }
  };

  return (
    <div className="flex flex-wrap mx-auto max-w-sm lg:max-w-5xl" {...props}>
      <ModulesContent />
    </div>
  );
}
