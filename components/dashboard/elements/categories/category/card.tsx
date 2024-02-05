import { Category } from "@/client/models/category/category";
import { HTMLProps } from "react";

interface CategoryCardProps extends HTMLProps<HTMLDivElement> {
  category: Category;
}

export default function CategoryCard({
  category: { category, modules },
  ...props
}: CategoryCardProps) {
  const previewModules = modules.slice(0, 7);

  return (
    <div className="w-1/2 lg:w-1/4 p-2" {...props}>
      <div className="p-3 lg:p-6 pb-1 lg:pb-2 h-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
        <h2 className="text-lg font-bold mb-1">{category}</h2>

        <div className="h-14 lg:h-16 w-full text-sm lg:text-base text-gray-600 overflow-hidden">
          <p className="line-clamp-2">{previewModules.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
