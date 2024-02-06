import { getModules } from "@/app/api/get-modules/get-modules";
import { CategoryModules } from "@/client/models/category/module";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useState } from "react";
import CourseCard from "./course/card";
import ModulesSkeleton from "./module/modules-skeleton";

interface ModulesManagerProps extends HTMLProps<HTMLDivElement> {
  user: User;
  category?: string | null;
  back: () => void;
}

export default function ModulesManager({
  user,
  category,
  back,
  ...props
}: ModulesManagerProps) {
  const [modules, setModules] = useState<CategoryModules>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (category: string, jwtToken: string) => {
      setModules({});
      setLoading(true);

      try {
        setModules(await getModules(category, jwtToken));
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category && user.jwtToken) {
      fetchData(category, user.jwtToken);
    }
  }, [category, user.jwtToken]);

  const ModulesContent = () => {
    if (loading) {
      return <ModulesSkeleton />;
    }
    const categories = Object.entries(modules);

    if (categories.length > 0) {
      return categories.map(([category, data]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-bold mb-2 ml-2">{category}</h2>

          <div className="w-full flex flex-wrap mx-auto max-w-full">
            {Object.entries(data).map(([courseName, icon]) => (
              <CourseCard key={courseName} course={courseName} icon={icon} />
            ))}
          </div>
        </div>
      ));
    } else {
      return (
        <div className="w-full flex justify-center">
          <div className="w-11/12 lg:w-full flex items-center justify-center p-6 pr-3 pl-3 rounded-md bg-gray-100 dark:bg-gray-800">
            <p>Nenhum modulo disponível no momento</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto mt-16 lg:mt-24" {...props}>
      <div className="w-full flex flex-wrap justify-between">
        <ModulesContent />
      </div>
    </div>
  );
}
