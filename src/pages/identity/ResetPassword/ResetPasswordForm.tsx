import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { BackButton, SubmitButton } from '#/components/forms';
import { getDefaultFormConfig } from '#/services/forms';
import {
  MockPostResetPasswordRequestApiArg,
  useMockPostResetPasswordRequestMutation,
} from '#/services/mock';
import { MAIN_ROUTES } from '#/services/navigation';
import { showErrorNotification, showSuccessNotification } from '#/services/notifications';

import { getSchema, ResetPasswordFormValues } from './ResetPasswordForm.schema';

const initialResetPasswordValues: ResetPasswordFormValues = {
  email: '',
};

const ResetPasswordForm: React.FC = () => {
  const [resetPassword, { isLoading: isResetPasswordLoading }] =
    useMockPostResetPasswordRequestMutation(); //  TODO: Set your hook

  const { t } = useTranslation();

  const schema = getSchema(t);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'reset-password-form',
    initialValues: initialResetPasswordValues,
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    //  TODO: Set your payload
    const resetPasswordPayload: MockPostResetPasswordRequestApiArg = {
      email: values.email,
    };

    try {
      await resetPassword(resetPasswordPayload).unwrap();

      showSuccessNotification({ message: t('identity.resetPassword.notification.success') });
    } catch (error) {
      showErrorNotification(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={t('user.email')}
        placeholder={t('user.email.placeholder')}
        {...form.getInputProps('email')}
      />

      <Group grow mt="xl">
        <BackButton to={MAIN_ROUTES.LOGIN} />
        <SubmitButton loading={isResetPasswordLoading} />
      </Group>
    </form>
  );
};

export default ResetPasswordForm;
