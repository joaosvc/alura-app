import { getModules } from "@/app/api/get-modules/get-modules";
import { CategoryModules as ICategoryModules } from "@/client/models/category/module";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";
import ModulesSkeleton from "./module/skeleton";
import UnavailableBox from "@/components/elements/unavailable-box";
import CourseCard from "./course/card";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retryFetchInterval: NodeJS.Timeout | null = null;

    const fetchModules = async (category: string, jwtToken: string) => {
      setLoading(true);

      try {
        setModules(await getModules(category, jwtToken));
        setLoading(false);

        if (retryFetchInterval) {
          clearInterval(retryFetchInterval);
        }
      } catch (error) {
        console.error(`Error fetching modules of ${category}`, error);

        retryFetchInterval = setInterval(() => {
          fetchModules(category, jwtToken);
        }, 5000);
      }
    };

    if (category && user.jwtToken) {
      fetchModules(category, user.jwtToken);
    }

    return () => {
      if (retryFetchInterval) clearInterval(retryFetchInterval);
    };
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
        <UnavailableBox>Nenhum modulo disponível no momento</UnavailableBox>
      );
    }
  };

  return (
    <div className="flex flex-wrap mx-auto max-w-sm lg:max-w-5xl" {...props}>
      <ModulesContent />
    </div>
  );
}
