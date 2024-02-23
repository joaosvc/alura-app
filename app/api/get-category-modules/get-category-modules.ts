import { ALURA_API_URL } from "@/client/hooks/get-alura-api";
import { CategoryModules } from "@/client/models/category/module";
import { RequestResponse } from "../protocols";
import { RequestError, SuccessRequest } from "../helpers";

export const getCategoryModules = async (
  category: string,
  jwtToken: string
): Promise<RequestResponse<CategoryModules>> => {
  const response = await fetch(`${ALURA_API_URL}/category/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
    body: JSON.stringify({ category: String(category ?? "") }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      return RequestError("category-not-found");
    } else if (response.status === 404) {
      return RequestError("page-not-found");
    } else {
      return RequestError("something-went-wrong");
    }
  }

  const data: CategoryModules = await response.json();

  return SuccessRequest(<CategoryModules>data);
};
