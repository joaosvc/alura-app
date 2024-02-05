import { ALURA_API_URL } from "@/client/api/protocols";

export const getCategories = async (jwtToken: string): Promise<string[]> => {
  const response = await fetch(`${ALURA_API_URL}/categories`, {
    headers: {
      "X-JWT-Token": jwtToken,
    },
  });
  const data: { category: string }[] = Object.values(await response.json());

  console.log(process.env.ALURA_API_URL);
  return data.map(({ category }) => category);
};
