import { useEffect } from 'react';

import { FormErrors, UseFormReturnType } from '@mantine/form';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { isInvalidValidationRequestError } from '#/services/errors';

// TODO: Set your error handling

export const useFormErrorHandler = <FormValues>(
  form: UseFormReturnType<FormValues>,
  error?: FetchBaseQueryError | SerializedError,
) => {
  // To focus on the right field, you should keep the same order of fields in the UI and in the validation schema
  const firstErrorFocus = (errors: FormErrors) => {
    const firstErrorPath = Object.keys(errors)[0];

    form.getInputNode(firstErrorPath)?.focus();
  };

  useEffect(() => {
    if (error && isInvalidValidationRequestError(error)) {
      // show first error for field from the errors list
      const mappedErrors = Object.entries(error.data.errors).reduce((all, [field, errors]) => {
        return { ...all, [field]: errors[0] };
      }, {});

      form.setErrors(mappedErrors);

      firstErrorFocus(mappedErrors);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { firstErrorFocus };
};
