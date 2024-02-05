import { ALURA_API_URL } from "@/client/api/protocols";
import { Module } from "@/client/models/category/module";

export const getModules = async (
  category: string,
  jwtToken: string
): Promise<Module[]> => {
  const response = await fetch(`${ALURA_API_URL}/category/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
    body: JSON.stringify({ category }),
  });
  const data: Module[] = await response.json();

  return <Module[]>data;
};
