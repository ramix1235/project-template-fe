import { useEffect } from 'react';

import { UseFormReturnType } from '@mantine/form';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { isInvalidValidationRequestError } from '#/services/errors';

// TODO: Set your error handling

export const useFormErrorHandler = <FormValues>(
  form: UseFormReturnType<FormValues>,
  error?: FetchBaseQueryError | SerializedError,
) => {
  useEffect(() => {
    if (error && isInvalidValidationRequestError(error)) {
      // show first error for field from the errors list
      const mappedErrors = Object.entries(error.data.errors).reduce((all, [field, errors]) => {
        return { ...all, [field]: errors[0] };
      }, {});

      form.setErrors(mappedErrors);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
};
