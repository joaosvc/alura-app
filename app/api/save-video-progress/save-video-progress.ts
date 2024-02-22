export default async function saveVideoProgress(
  userId: number,
  progress: number,
  totalProgress: number,
  videoIdentifier: string
) {
  const response = await fetch("/api/save-video-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      progress,
      totalProgress,
      videoIdentifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Error saving video progress.");
  }
}
