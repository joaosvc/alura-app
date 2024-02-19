import React from "react";
import UnavailableBox from "@/components/elements/unavailable-box";
import ModulesSkeleton from "./skeleton";
import CourseCard from "../course/card";
import { CategoryModules } from "@/client/models/category/module";

interface ModulesContentProps {
  modules: CategoryModules;
  isAvailable: boolean;
  loading: boolean;
}

const ModulesContent = ({
  modules,
  isAvailable,
  loading,
}: ModulesContentProps) => {
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
        {isAvailable
          ? "Nenhum modulo disponível no momento"
          : "Categoria não encontrada"}
      </UnavailableBox>
    );
  }
};

export default React.memo(ModulesContent);
