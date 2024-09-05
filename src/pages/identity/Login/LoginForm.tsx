import { Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { AnchorLink } from '#/components/base';
import { SubmitButton } from '#/components/forms';
import { MockPostLoginApiArg, useMockPostLoginMutation } from '#/mocks/api';
import { AuthAccount, setAuth } from '#/services/auth';
import { getDefaultFormConfig, useFormErrorHandler } from '#/services/forms';
import { MAIN_ROUTES } from '#/services/navigation';
import { useAppDispatch } from '#/services/store';

import { getSchema, LoginFormValues } from './LoginForm.schema';

interface LocationState {
  email?: string;
}

const initialLoginValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC<React.ComponentPropsWithoutRef<'form'>> = (props) => {
  const [login, { isLoading: isLoginLoading, error: loginError }] = useMockPostLoginMutation(); // TODO: Set your hook

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

  const { firstErrorFocus } = useFormErrorHandler(form, loginError);

  const handleSubmit = async (values: LoginFormValues) => {
    // TODO: Set your payload
    const loginPayload: MockPostLoginApiArg = {
      email: values.email,
      password: values.password,
    };

    const result = await login(loginPayload).unwrap();

    // TODO: Set your auth data
    const authAccount: AuthAccount = {
      permissions: result.permissions,
      token: result.token,
    };

    dispatch(setAuth({ account: authAccount }));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, firstErrorFocus)} {...props}>
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
          <AnchorLink size="xs" c="dimmed" to={MAIN_ROUTES.RESET_PASSWORD}>
            {t('identity.link.forgotPassword')}
          </AnchorLink>
        </Group>

        <SubmitButton loading={isLoginLoading}>{t('identity.login')}</SubmitButton>
      </Stack>

      <Group mt="xl" justify="center">
        <AnchorLink size="xs" c="dimmed" to={MAIN_ROUTES.REGISTER}>
          {t('identity.login.link.register')}
        </AnchorLink>
      </Group>
    </form>
  );
};

export default LoginForm;
