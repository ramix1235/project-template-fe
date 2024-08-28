import { Anchor, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { FormErrors, useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { SubmitButton } from '#/components/forms';
import { AuthAccount, setAuth } from '#/services/auth';
import { getDefaultFormConfig } from '#/services/forms';
import { MockPostLoginApiArg, useMockPostLoginMutation } from '#/services/mock';
import { MAIN_ROUTES } from '#/services/navigation';
import { showErrorNotification } from '#/services/notifications';
import { useAppDispatch } from '#/services/store';

import { getSchema, LoginFormValues } from './LoginForm.schema';

interface LocationState {
  email?: string;
}

const initialLoginValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [login, { isLoading: isLoginLoading }] = useMockPostLoginMutation(); // TODO: Set your hook

  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state as LocationState | null;
  const email = state?.email;

  const schema = getSchema(t);
  const form = useForm({
    ...getDefaultFormConfig(schema),
    name: 'login-form',
    initialValues: { ...initialLoginValues, email: email ?? initialLoginValues.email },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    // TODO: Set your payload
    const loginPayload: MockPostLoginApiArg = {
      email: values.email,
      password: values.password,
    };

    try {
      const result = await login(loginPayload).unwrap();

      // TODO: Set your auth data
      const authAccount: AuthAccount = {
        permissions: result.permissions,
        token: result.token,
      };

      dispatch(setAuth({ account: authAccount }));
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

      <Stack mt="xl" gap="xs">
        <Group>
          <Anchor component={Link} size="xs" c="dimmed" to={MAIN_ROUTES.RESET_PASSWORD}>
            {t('identity.link.forgotPassword')}
          </Anchor>
        </Group>

        <SubmitButton loading={isLoginLoading}>{t('identity.login')}</SubmitButton>
      </Stack>

      <Group mt="xl" justify="center">
        <Anchor component={Link} size="xs" c="dimmed" to={MAIN_ROUTES.REGISTER}>
          {t('identity.login.link.register')}
        </Anchor>
      </Group>
    </form>
  );
};

export default LoginForm;
