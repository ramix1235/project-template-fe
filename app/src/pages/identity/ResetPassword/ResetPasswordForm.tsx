import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { BackButton } from '#/components/base';
import { SubmitButton } from '#/components/forms';
import {
  MockPostResetPasswordRequestApiArg,
  useMockPostResetPasswordRequestMutation,
} from '#/mocks/api';
import { getDefaultFormConfig, useFormErrorHandler } from '#/services/forms';
import { showSuccessNotification } from '#/services/notifications';

import { getSchema, ResetPasswordFormValues } from './ResetPasswordForm.schema';

const initialResetPasswordValues: ResetPasswordFormValues = {
  email: '',
};

const ResetPasswordForm: React.FC<React.ComponentPropsWithoutRef<'form'>> = (props) => {
  const [resetPassword, { isLoading: isResetPasswordLoading, error: resetPasswordError }] =
    useMockPostResetPasswordRequestMutation(); //  TODO: Set your hook

  const { t } = useTranslation();

  const schema = getSchema(t);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'reset-password-form',
    initialValues: initialResetPasswordValues,
  });

  const { firstErrorFocus } = useFormErrorHandler(form, resetPasswordError);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    //  TODO: Set your payload
    const resetPasswordPayload: MockPostResetPasswordRequestApiArg = {
      email: values.email,
    };

    await resetPassword(resetPasswordPayload).unwrap();

    showSuccessNotification({ message: t('identity.resetPassword.notification.success') });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, firstErrorFocus)} {...props}>
      <TextInput
        label={t('user.email')}
        placeholder={t('user.email.placeholder')}
        {...form.getInputProps('email')}
      />

      <Group mt="xl" grow>
        <BackButton />
        <SubmitButton loading={isResetPasswordLoading} />
      </Group>
    </form>
  );
};

export default ResetPasswordForm;