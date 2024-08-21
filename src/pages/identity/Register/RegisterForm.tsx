import { Anchor, Checkbox, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { FormErrors, useForm } from '@mantine/form';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SubmitButton } from '#/components/forms';
import { TERMS_AND_CONDITIONS_LINK } from '#/constants/links';
import { CreateUserApiArg, useCreateUserMutation } from '#/services/api/user';
import { getDefaultFormConfig } from '#/services/forms';
import { MAIN_ROUTES } from '#/services/navigation';
import { showErrorNotification, showSuccessNotification } from '#/services/notifications';

import { RegisterFormValues, getSchema } from './Register.schema';

const initialRegisterValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
};

const RegisterForm: React.FC = () => {
  const [register, { isLoading: isRegisterLoading }] = useCreateUserMutation(); //  TODO: Set your hook

  const { t } = useTranslation();

  const schema = getSchema(t);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'register-form',
    initialValues: initialRegisterValues,
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    //  TODO: Set your payload
    const registerPayload: CreateUserApiArg = {
      user: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
    };

    try {
      await register(registerPayload).unwrap();

      showSuccessNotification({ message: t('identity.register.notification.success') });
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const handleValidationFailure = (errors: FormErrors) => {
    const firstErrorPath = Object.keys(errors)[0];

    form.getInputNode(firstErrorPath)?.focus();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleValidationFailure)}>
      <Stack>
        <TextInput
          label={t('user.firstName')}
          placeholder={t('user.firstName.placeholder')}
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label={t('user.lastName')}
          placeholder={t('user.lastName.placeholder')}
          {...form.getInputProps('lastName')}
        />

        <TextInput
          label={t('user.email')}
          placeholder={t('user.email.placeholder')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label={t('user.password')}
          placeholder={t('user.password.placeholder')}
          {...form.getInputProps('password')}
        />
      </Stack>

      <Checkbox
        mt="xl"
        label={
          <Text>
            <Trans
              t={t}
              i18nKey="identity.register.terms"
              components={{
                Anchor: <Anchor href={TERMS_AND_CONDITIONS_LINK} target="_blank" />,
              }}
            />
          </Text>
        }
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />

      <SubmitButton fullWidth mt="xl" loading={isRegisterLoading}>
        {t('identity.register')}
      </SubmitButton>

      <Group mt="xl" justify="center">
        <Anchor component={Link} size="xs" c="dimmed" to={MAIN_ROUTES.LOGIN}>
          {t('identity.register.link.login')}
        </Anchor>
      </Group>
    </form>
  );
};

export default RegisterForm;
