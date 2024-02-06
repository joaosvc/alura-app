import { ALURA_API_URL } from "@/client/api/protocols";
import { CategoryModules } from "@/client/models/category/module";

export const getModules = async (
  category: string,
  jwtToken: string
): Promise<CategoryModules> => {
  const response = await fetch(`${ALURA_API_URL}/category/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
    body: JSON.stringify({ category: String(category ?? "") }),
  });
  const data: CategoryModules = await response.json();

  return <CategoryModules>data;
};
