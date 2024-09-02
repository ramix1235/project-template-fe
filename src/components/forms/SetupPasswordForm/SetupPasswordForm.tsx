import { PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { SubmitButton } from '#/components/forms';
import {
  MockPostChangePasswordApiArg,
  MockPostResetPasswordApiArg,
  MockPostSetupPasswordApiArg,
  useMockPostChangePasswordMutation,
  useMockPostResetPasswordMutation,
  useMockPostSetupPasswordMutation,
} from '#/mocks/api';
import { getDefaultFormConfig, useFormErrorHandler } from '#/services/forms';
import { MAIN_ROUTES } from '#/services/navigation';
import { showSuccessNotification } from '#/services/notifications';

import {
  ChangePasswordFormValues,
  SetupPasswordFormType,
  getSchema,
  SetupPasswordFormValues,
} from './SetupPasswordForm.schema';

/*
  SetupPasswordFormType has three types:
  1. Setup - password/confirm password fields, setupPassword API, setup password notification
  2. Change - password/confirm password/current password fields, changePassword API, change password notification
  3. Reset - password/confirm password fields, resetPassword API, change password notification

  You can pass type as prop or via route state.
*/

interface LocationState {
  code?: string;
  email?: string;
  type?: SetupPasswordFormType;
}

interface SetupPasswordFormProps {
  type?: SetupPasswordFormType;
}

const initialSetupPasswordValues: SetupPasswordFormValues = {
  password: '',
  confirmPassword: '',
};

const initialChangePasswordValues: ChangePasswordFormValues = {
  ...initialSetupPasswordValues,
  currentPassword: '',
};

const SetupPasswordForm: React.FC<SetupPasswordFormProps> = ({
  type = SetupPasswordFormType.Setup,
}) => {
  const [setupPassword, { isLoading: isSetupPasswordLoading, error: setupPasswordError }] =
    useMockPostSetupPasswordMutation(); // TODO: Set your hook
  const [changePassword, { isLoading: isChangePasswordLoading, error: changePasswordError }] =
    useMockPostChangePasswordMutation(); // TODO: Set your hook
  const [resetPassword, { isLoading: isResetPasswordLoading, error: resetPasswordError }] =
    useMockPostResetPasswordMutation(); // TODO: Set your hook

  const isLoading = isSetupPasswordLoading || isChangePasswordLoading || isResetPasswordLoading;
  const error = setupPasswordError || changePasswordError || resetPasswordError;

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;
  const code = state?.code;
  const email = state?.email;
  const formType = state?.type ?? type;

  const isPasswordReset = formType === SetupPasswordFormType.Reset;
  const isPasswordChange = formType === SetupPasswordFormType.Change;

  const schema = getSchema(t, isPasswordChange);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'setup-password-form',
    initialValues: isPasswordChange ? initialChangePasswordValues : initialSetupPasswordValues,
  });

  useFormErrorHandler(form, error);

  const handleSubmit = async (values: SetupPasswordFormValues | ChangePasswordFormValues) => {
    if (isPasswordChange && 'currentPassword' in values) {
      // TODO: Set your payload
      const changePasswordPayload: MockPostChangePasswordApiArg = {
        currentPassword: values.currentPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await changePassword(changePasswordPayload).unwrap();

      showSuccessNotification({
        message: t('identity.setupPassword.change.notification.success'),
      });

      return;
    }

    if (isPasswordReset) {
      // TODO: Set your payload
      const resetPasswordPayload: MockPostResetPasswordApiArg = {
        code: code ?? '',
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await resetPassword(resetPasswordPayload).unwrap();

      showSuccessNotification({
        message: t('identity.setupPassword.reset.notification.success'),
      });

      navigate(MAIN_ROUTES.LOGIN, { replace: true });

      return;
    }

    // TODO: Set your payload
    const setupPasswordPayload: MockPostSetupPasswordApiArg = {
      code: code ?? '',
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    await setupPassword(setupPasswordPayload).unwrap();

    showSuccessNotification({ message: t('identity.setupPassword.setup.notification.success') });

    navigate(MAIN_ROUTES.LOGIN, { replace: true, state: { email } });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {isPasswordChange && (
          <PasswordInput
            label={t('identity.setupPassword.currentPassword')}
            placeholder={t('identity.setupPassword.currentPassword.placeholder')}
            {...form.getInputProps('currentPassword')}
          />
        )}

        <PasswordInput
          label={t('user.password')}
          placeholder={t('user.password.placeholder')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label={t('identity.setupPassword.confirmPassword')}
          placeholder={t('identity.setupPassword.confirmPassword.placeholder')}
          {...form.getInputProps('confirmPassword')}
        />
      </Stack>

      <SubmitButton fullWidth mt="xl" loading={isLoading} />
    </form>
  );
};

export default SetupPasswordForm;
