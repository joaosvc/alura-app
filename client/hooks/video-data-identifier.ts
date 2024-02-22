interface VideoDataIdentifier {
  courseUuid: string;
  module: string;
  video: string;
}

export function getVideoIdentifierFrom(
  courseUuid: string,
  module: string,
  video: string
): string {
  return `${courseUuid}:${module}:${video}`;
}

export function getVideoDataFrom(identifier: string): VideoDataIdentifier {
  const [courseUuid, module, video] = identifier.split(":");

  if (!courseUuid || !module || !video) {
    throw new Error("Invalid video data identifier");
  }

  return {
    courseUuid,
    module,
    video,
  };
}
