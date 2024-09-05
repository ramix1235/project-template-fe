import { TFunction } from 'i18next';
import { z } from 'zod';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_IS_STRONG_REGEX,
  REQUIRED_LENGTH,
} from '#/services/auth';

export type ChangePasswordFormValues = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type SetupPasswordFormValues = Omit<ChangePasswordFormValues, 'currentPassword'>;

const getUntypedChangePasswordSchema = (t: TFunction) =>
  z.object({
    currentPassword: z.string().min(REQUIRED_LENGTH, {
      message: t('errors.required', { field: t('identity.setupPassword.currentPassword') }),
    }),
    password: z.string().superRefine((value, ctx) => {
      if (!PASSWORD_IS_STRONG_REGEX.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('user.password.errors.format', {
            minLength: MIN_PASSWORD_LENGTH,
            maxLength: MAX_PASSWORD_LENGTH,
          }),
        });
      }

      // Use it instead of default min function before superRefine to make correct validation order
      if (value.length < REQUIRED_LENGTH) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: REQUIRED_LENGTH,
          type: 'string',
          inclusive: true,
          message: t('errors.required', { field: t('user.password') }),
        });
      }
    }),
    confirmPassword: z.string().min(REQUIRED_LENGTH, {
      message: t('errors.required', { field: t('identity.setupPassword.confirmPassword') }),
    }),
  });

const getSetupPasswordSchema = (t: TFunction): z.ZodType<SetupPasswordFormValues> => {
  return getUntypedChangePasswordSchema(t).omit({ currentPassword: true });
};

const refineSchema = (
  t: TFunction,
  schema: z.ZodType<SetupPasswordFormValues | ChangePasswordFormValues>,
) =>
  schema.refine((values) => values.password === values.confirmPassword, {
    message: t('identity.setupPassword.confirmPassword.errors.match'),
    path: ['confirmPassword'],
  });

export const getSchema = (t: TFunction, isPasswordChange: boolean) => {
  const changePasswordSchema: z.ZodType<ChangePasswordFormValues> =
    getUntypedChangePasswordSchema(t);

  return refineSchema(t, isPasswordChange ? changePasswordSchema : getSetupPasswordSchema(t));
};
