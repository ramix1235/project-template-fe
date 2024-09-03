import { TFunction } from 'i18next';
import { z } from 'zod';

import { REQUIRED_LENGTH } from '#/services/auth';

export type ChangeEmailFormValues = {
  email: string;
  password: string;
};

export const getSchema = (t: TFunction): z.ZodType<ChangeEmailFormValues> =>
  z.object({
    password: z.string().min(REQUIRED_LENGTH, {
      message: t('errors.required', { field: t('identity.setupPassword.currentPassword') }),
    }),
    email: z
      .string()
      .email({ message: t('user.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.email') }) }),
  });
