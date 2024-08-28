/* eslint-disable @typescript-eslint/no-explicit-any */

// About safe error handling: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { i18n } from '#/services/internationalization';

export enum ErrorCodes {
  // HTTP status code
  InternalServerError = 500,
  Unauthorized = 401,

  // An error that occurred during execution of `fetch` or the `fetchFn` callback option
  FetchError = 'FETCH_ERROR',
  // An error happened during parsing.
  // Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
  // or an error occurred while executing a custom `responseHandler`.
  ParsingError = 'PARSING_ERROR',
  // Request timed out
  TimeoutError = 'TIMEOUT_ERROR',
  // A custom error type that you can return from your `queryFn` where another error might not make sense.
  CustomError = 'CUSTOM_ERROR',
}

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
};

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export type HttpError = Extract<FetchBaseQueryError, { status: number }>;

export const isHttpError = (error: unknown): error is HttpError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
};

// TODO: Add error handling for your API
export const getErrorText = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  // JS built-in error object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  // RTK thunk error: https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (isFetchBaseQueryError(error)) {
    if (isHttpError(error)) {
      // Handle http errors here
      if (error.status === ErrorCodes.InternalServerError) {
        return i18n.t('errors.500.title');
      }
    }
  }

  return i18n.t('errors.common');
};
