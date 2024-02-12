import { ALURA_API_URL } from "@/client/api/protocols";
import { RequestResponse } from "../protocols";
import { SuccessRequest } from "../helpers";

export const getVideoPlaylist = async (
  courseUuid: string,
  module: string,
  video: string
): Promise<RequestResponse<string>> => {
  return SuccessRequest(
    <string>`${ALURA_API_URL}/video/${courseUuid}/${module}/${video}`
  );
};
