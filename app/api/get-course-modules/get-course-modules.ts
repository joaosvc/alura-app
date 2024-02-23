import { ALURA_API_URL } from "@/client/hooks/get-alura-api";
import { RequestResponse } from "../protocols";
import { RequestError, SuccessRequest } from "../helpers";
import { CourseModules } from "@/client/models/course/module";

export const getCourseModules = async (
  courseUuid: string,
  jwtToken: string
): Promise<RequestResponse<CourseModules>> => {
  const response = await fetch(`${ALURA_API_URL}/course/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
    body: JSON.stringify({
      courseId: String(courseUuid ?? ""),
      videos: true,
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      return RequestError("course-not-found");
    } else if (response.status === 404) {
      return RequestError("page-not-found");
    } else {
      return RequestError("something-went-wrong");
    }
  }

  const data: CourseModules = await response.json();

  return SuccessRequest(<CourseModules>data);
};
