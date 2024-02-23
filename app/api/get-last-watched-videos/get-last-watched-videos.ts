import { LastWatched } from "@/client/models/watched/last-watched";
import { RequestResponse } from "../protocols";
import { RequestError, SuccessRequest } from "../helpers";

export default async function getLastWatchedVideos(
  userId: number,
  count: number
): Promise<RequestResponse<LastWatched[]>> {
  const response = await fetch("/api/get-last-watched-videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      count,
    }),
  });

  if (!response.ok) {
    return RequestError("something-went-wrong");
  }
  const data: LastWatched[] = await response.json();

  return SuccessRequest(<LastWatched[]>data);
}
