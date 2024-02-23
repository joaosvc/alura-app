interface VideoDataIdentifier {
  courseUuid: string;
  module: string;
  video: string;
  episode: number;
}

export function getVideoIdentifierFrom(
  courseUuid: string,
  module: string,
  video: string,
  episode: number
): string {
  return `${courseUuid}:${module}:${video}:${episode}`;
}

export function getVideoDataFrom(identifier: string): VideoDataIdentifier {
  const [courseUuid, module, video, episode] = identifier.split(":");

  if (!courseUuid || !module || !video || !episode) {
    throw new Error("Invalid video data identifier");
  }

  return {
    courseUuid,
    module,
    video,
    episode: parseInt(episode),
  };
}
