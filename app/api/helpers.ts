import { RequestResponse } from "./protocols";

export const RequestError = <T>(error: string): RequestResponse<T> => ({
  success: false,
  error,
});

export const SuccessRequest = <T>(body: T): RequestResponse<T> => {
  return {
    success: true,
    body: body,
  };
};
