import { ALURA_API_URL } from "@/client/api/protocols";
import { Category } from "@/client/models/category/category";
import { RequestResponse } from "../protocols";
import { RequestError, SuccessRequest } from "../helpers";

export const getCategories = async (
  jwtToken: string
): Promise<RequestResponse<Category[]>> => {
  const response = await fetch(`${ALURA_API_URL}/categories/modules`, {
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
  });

  if (!response.ok) {
    return RequestError("something-went-wrong");
  }

  const data: Category[] = Object.values(await response.json());

  return SuccessRequest(<Category[]>data);
};
