import { ALURA_API_URL } from "@/client/api/protocols";
import { Category } from "@/client/models/category/category";

export const getCategories = async (jwtToken: string): Promise<Category[]> => {
  const response = await fetch(`${ALURA_API_URL}/categories/modules`, {
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
  });
  const data: Category[] = Object.values(await response.json());

  return <Category[]>data;
};
