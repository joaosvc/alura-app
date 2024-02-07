export interface RequestResponse<T> {
  success: boolean;
  error?: string;
  body?: T;
}
