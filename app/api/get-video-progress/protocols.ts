export interface GetVideoProgressParams {
  userId: number;
  videoIdentifier: string;
}

export interface GetVideoProgressResult {
  progress: number;
  totalProgress: number;
}
