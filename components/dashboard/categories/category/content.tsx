import React from "react";
import UnavailableBox from "@/components/elements/unavailable-box";
import CategorySkeleton from "./skeleton";
import { Category } from "@/client/models/category/category";
import CategoryCard from "./card";

interface CategoryContentProps {
  categories: Category[];
  loading: boolean;
}

const CategoryContent = ({ categories, loading }: CategoryContentProps) => {
  if (loading) {
    return <CategorySkeleton />;
  } else if (categories.length === 0) {
    return (
      <UnavailableBox>Nenhuma categoria disponível no momento</UnavailableBox>
    );
  }

  return categories.map((category, index) => (
    <CategoryCard key={index} category={category} />
  ));
};

export default React.memo(CategoryContent);
