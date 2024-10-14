import { TFunction } from 'i18next';
import { z } from 'zod';

import { REQUIRED_LENGTH } from '#/services/auth';

export type ResetPasswordFormValues = {
  email: string;
};

export const getSchema = (t: TFunction): z.ZodType<ResetPasswordFormValues> =>
  z.object({
    email: z
      .string()
      .email({ message: t('user.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.email') }) }),
  });
