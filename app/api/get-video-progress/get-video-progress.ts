import { GetVideoProgressResult } from "./protocols";

export default async function getVideoProgress(
  userId: number,
  videoIdentifier: string
): Promise<GetVideoProgressResult | null> {
  const response = await fetch("/api/get-video-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      videoIdentifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Error retrieving video progress.");
  }
  const { data } = await response.json();

  return data;
}
