import { TFunction } from 'i18next';
import { z } from 'zod';

import { REQUIRED_LENGTH } from '#/services/auth';

export type LoginFormValues = {
  email: string;
  password: string;
};

const getLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email({ message: t('identity.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('identity.email') }) }),
    password: z
      .string()
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('identity.password') }) }),
  });

export const getSchema = (t: TFunction) => {
  const typedLoginSchema: z.ZodType<LoginFormValues> = getLoginSchema(t);

  return typedLoginSchema;
};
