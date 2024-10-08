import { ALURA_API_URL } from "@/client/hooks/get-alura-api";
import { RequestResponse } from "../protocols";
import { RequestError, SuccessRequest } from "../helpers";
import { Video } from "@/client/models/course/video";

export const getVideoData = async (
  courseUuid: string,
  module: string,
  video: string,
  jwtToken: string,
  thumbnail: boolean = true,
  videoUrl: boolean = false
): Promise<RequestResponse<Video>> => {
  const response = await fetch(`${ALURA_API_URL}/course/video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Token": jwtToken,
    },
    body: JSON.stringify({
      courseId: String(courseUuid ?? ""),
      module: String(module ?? ""),
      video: String(video ?? ""),
      thumbnail: thumbnail,
      videoUrl: videoUrl,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return RequestError("page-not-found");
    } else {
      return RequestError("something-went-wrong");
    }
  }

  const videoData: Video = await response.json();

  return SuccessRequest(<Video>videoData);
};
