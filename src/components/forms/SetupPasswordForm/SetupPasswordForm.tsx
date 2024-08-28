import { PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { SubmitButton } from '#/components/forms';
import { CreateUserApiArg, useCreateUserMutation } from '#/services/api/user';
import { getDefaultFormConfig } from '#/services/forms';
import { MAIN_ROUTES } from '#/services/navigation';
import { showErrorNotification, showSuccessNotification } from '#/services/notifications';

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
  const [setupPassword, { isLoading: isSetupPasswordLoading }] = useCreateUserMutation(); // TODO: Set your hook
  const [changePassword, { isLoading: isChangePasswordLoading }] = useCreateUserMutation(); // TODO: Set your hook
  const [resetPassword, { isLoading: isResetPasswordLoading }] = useCreateUserMutation(); // TODO: Set your hook

  const isLoading = isSetupPasswordLoading || isChangePasswordLoading || isResetPasswordLoading;

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

  const handleSubmit = async (values: SetupPasswordFormValues | ChangePasswordFormValues) => {
    if (isPasswordChange && 'currentPassword' in values) {
      // TODO: Set your payload
      const changePasswordPayload: CreateUserApiArg = {
        user: {
          username: values.currentPassword,
          password: values.password,
        },
      };

      try {
        await changePassword(changePasswordPayload).unwrap();

        showSuccessNotification({
          message: t('identity.setupPassword.change.notification.success'),
        });
      } catch (error) {
        showErrorNotification(error);
      }

      return;
    }

    if (isPasswordReset) {
      // TODO: Set your payload
      const resetPasswordPayload: CreateUserApiArg = {
        user: {
          username: code,
          password: values.password,
        },
      };

      try {
        await resetPassword(resetPasswordPayload).unwrap();

        showSuccessNotification({
          message: t('identity.setupPassword.reset.notification.success'),
        });
        navigate(MAIN_ROUTES.LOGIN, { replace: true });
      } catch (error) {
        showErrorNotification(error);
      }

      return;
    }

    // TODO: Set your payload
    const setupPasswordPayload: CreateUserApiArg = {
      user: {
        username: code,
        password: values.password,
      },
    };

    try {
      await setupPassword(setupPasswordPayload).unwrap();

      showSuccessNotification({ message: t('identity.setupPassword.setup.notification.success') });
      navigate(MAIN_ROUTES.LOGIN, { replace: true, state: { email } });
    } catch (error) {
      showErrorNotification(error);
    }
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
