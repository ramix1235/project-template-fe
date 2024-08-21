import { TFunction } from 'i18next';
import { z } from 'zod';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_IS_STRONG_REGEX,
  REQUIRED_LENGTH,
} from '#/services/auth';

export enum SetupPasswordFormType {
  Setup = 'setup',
  Change = 'change',
  Reset = 'reset',
}

export type SetupPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordFormValues = SetupPasswordFormValues & {
  currentPassword: string;
};

const getSetupPasswordSchema = (t: TFunction) =>
  z.object({
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

const getChangePasswordSchema = (t: TFunction) =>
  getSetupPasswordSchema(t).extend({
    currentPassword: z.string().min(REQUIRED_LENGTH, {
      message: t('errors.required', { field: t('identity.setupPassword.currentPassword') }),
    }),
  });

const refineSchema = (
  t: TFunction,
  schema: z.ZodType<SetupPasswordFormValues | ChangePasswordFormValues>,
) =>
  schema.refine((values) => values.password === values.confirmPassword, {
    message: t('identity.setupPassword.confirmPassword.errors.match'),
    path: ['confirmPassword'],
  });

export const getSchema = (t: TFunction, isPasswordChange: boolean) => {
  const typedSetupPasswordSchema: z.ZodType<SetupPasswordFormValues> = getSetupPasswordSchema(t);
  const typedChangePasswordSchema: z.ZodType<ChangePasswordFormValues> = getChangePasswordSchema(t);

  return refineSchema(t, isPasswordChange ? typedChangePasswordSchema : typedSetupPasswordSchema);
};
