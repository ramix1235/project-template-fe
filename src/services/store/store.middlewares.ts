import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import {
  ErrorCodes,
  isFetchBaseQueryError,
  isInvalidValidationRequestError,
} from '#/services/errors';
import { showErrorNotification } from '#/services/notifications';

// https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level

// TODO: Set your error handling

export const globalErrorsHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && isFetchBaseQueryError(action.payload)) {
    if (
      // Handle authorization errors in the api configuration
      action.payload.status === ErrorCodes.Unauthorized ||
      // Handle validation errors in the components
      isInvalidValidationRequestError(action.payload)
    ) {
      return next(action);
    }

    showErrorNotification(action.payload);
  }

  return next(action);
};
