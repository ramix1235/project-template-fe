import { TFunction } from 'i18next';
import { z } from 'zod';

import { REQUIRED_LENGTH } from '#/services/auth';

export type ChangeEmailFormValues = {
  email: string;
  currentPassword: string;
};

const getChangeEmailSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email({ message: t('user.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.email') }) }),
    currentPassword: z.string().min(REQUIRED_LENGTH, {
      message: t('errors.required', { field: t('identity.setupPassword.currentPassword') }),
    }),
  });

export const getSchema = (t: TFunction) => {
  const typedChangeEmailSchema: z.ZodType<ChangeEmailFormValues> = getChangeEmailSchema(t);

  return typedChangeEmailSchema;
};
