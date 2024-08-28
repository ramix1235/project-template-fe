import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { SubmitButton } from '#/components/forms';
import { getDefaultFormConfig } from '#/services/forms';
import {
  MockPostChangeEmailRequestApiArg,
  useMockPostChangeEmailRequestMutation,
} from '#/services/mock';
import { showErrorNotification, showSuccessNotification } from '#/services/notifications';

import { getSchema, ChangeEmailFormValues } from './ChangeEmailForm.schema';

const initialChangeEmailValues: ChangeEmailFormValues = {
  email: '',
  password: '',
};

const ChangeEmailForm: React.FC = () => {
  const [changeEmail, { isLoading: isChangeEmailLoading }] =
    useMockPostChangeEmailRequestMutation(); // TODO: Set your hook

  const { t } = useTranslation();

  const schema = getSchema(t);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'change-email-form',
    initialValues: initialChangeEmailValues,
  });

  const handleSubmit = async (values: ChangeEmailFormValues) => {
    // TODO: Set your payload
    const changeEmailPayload: MockPostChangeEmailRequestApiArg = {
      email: values.email,
      password: values.password,
    };

    try {
      await changeEmail(changeEmailPayload).unwrap();

      showSuccessNotification({ message: t('settings.changeEmail.notification.success') });
    } catch (error) {
      showErrorNotification(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <PasswordInput
          label={t('identity.setupPassword.currentPassword')}
          placeholder={t('identity.setupPassword.currentPassword.placeholder')}
          {...form.getInputProps('password')}
        />

        <TextInput
          label={t('user.email')}
          placeholder={t('user.email.placeholder')}
          {...form.getInputProps('email')}
        />
      </Stack>

      <SubmitButton fullWidth mt="xl" loading={isChangeEmailLoading} />
    </form>
  );
};

export default ChangeEmailForm;
