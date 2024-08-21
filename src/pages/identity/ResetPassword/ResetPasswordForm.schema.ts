import { TFunction } from 'i18next';
import { z } from 'zod';

import { REQUIRED_LENGTH } from '#/services/auth';

export type ResetPasswordFormValues = {
  email: string;
};

const getResetPasswordSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email({ message: t('user.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.email') }) }),
  });

export const getSchema = (t: TFunction) => {
  const typedResetPasswordSchema: z.ZodType<ResetPasswordFormValues> = getResetPasswordSchema(t);

  return typedResetPasswordSchema;
};
