/* eslint-disable @typescript-eslint/no-explicit-any */

// About safe error handling: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  MockedInvalidRequestResponse,
  MockedInvalidRequestValidationResponse,
} from '#/mocks/errors';
import { i18n } from '#/services/internationalization';

// TODO: Set your error handling

export enum ErrorCodes {
  // HTTP status code
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

const isErrorWithMessage = (error: unknown): error is { message: string } => {
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

type HttpError = Extract<FetchBaseQueryError, { status: number }>;

const isHttpError = (error: unknown): error is HttpError => {
  return isFetchBaseQueryError(error) && typeof (error as any).status === 'number';
};

type InvalidRequestError = Omit<HttpError, 'data'> & { data: MockedInvalidRequestResponse };

const isInvalidRequestError = (error: unknown): error is InvalidRequestError => {
  return isHttpError(error) && typeof (error.data as any).code === 'number';
};

type InvalidValidationRequestError = Omit<HttpError, 'data'> & {
  data: MockedInvalidRequestValidationResponse;
};

export const isInvalidValidationRequestError = (
  error: unknown,
): error is InvalidValidationRequestError => {
  return isHttpError(error) && typeof (error.data as any).errors === 'object';
};

export const getErrorText = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  // JS built-in error object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  // RTK thunk error: https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (isInvalidRequestError(error)) {
    return error.data.message;
  }

  return i18n.t('errors.common');
};
