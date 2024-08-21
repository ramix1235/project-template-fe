import { TFunction } from 'i18next';
import { z } from 'zod';

import { User } from '#/services/api/user';
import {
  MAX_EMAIL_LENGTH,
  MAX_FIELD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_IS_STRONG_REGEX,
  REQUIRED_LENGTH,
} from '#/services/auth';

export type RegisterFormValues = Required<
  Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>
> & {
  terms: boolean;
};

const getRegisterSchema = (t: TFunction) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.firstName') }) })
      .refine(
        (value) => value.length <= MAX_FIELD_LENGTH,
        (value) => ({
          message: t('errors.max', { n: value.length, y: MAX_FIELD_LENGTH }),
        }),
      ),
    lastName: z
      .string()
      .trim()
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.lastName') }) })
      .refine(
        (value) => value.length <= MAX_FIELD_LENGTH,
        (value) => ({
          message: t('errors.max', { n: value.length, y: MAX_FIELD_LENGTH }),
        }),
      ),
    email: z
      .string()
      .email({ message: t('user.email.errors.format') })
      .min(REQUIRED_LENGTH, { message: t('errors.required', { field: t('user.email') }) })
      .refine(
        (value) => value.length <= MAX_EMAIL_LENGTH,
        (value) => ({
          message: t('errors.max', { n: value.length, y: MAX_EMAIL_LENGTH }),
        }),
      ),
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
    terms: z.boolean().refine((value) => value, {
      message: t('identity.register.terms.errors.required'),
    }),
  });

export const getSchema = (t: TFunction) => {
  const typedRegisterSchema: z.ZodType<RegisterFormValues> = getRegisterSchema(t);

  return typedRegisterSchema;
};
