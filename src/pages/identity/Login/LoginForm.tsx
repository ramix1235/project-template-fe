import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { FormErrors, useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { SubmitButton } from '#/components/forms';
import { LoginUserApiArg, useLazyLoginUserQuery } from '#/services/api/user';
import { AuthAccount, setAuth } from '#/services/auth';
import { getDefaultFormConfig } from '#/services/forms';
import { mockedAccount } from '#/services/mock';
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
  const [login, { isLoading: isLoginLoading }] = useLazyLoginUserQuery(); // TODO: Set your hook

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
    const loginPayload: LoginUserApiArg = {
      password: values.password,
      username: values.email,
    };

    try {
      const result = await login(loginPayload).unwrap();

      // TODO: Set your auth data
      const authAccount: AuthAccount = {
        ...mockedAccount,
        token: result.split(':')[1],
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
          label={t('identity.email')}
          placeholder={t('identity.email.placeholder')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label={t('identity.password')}
          placeholder={t('identity.password.placeholder')}
          {...form.getInputProps('password')}
        />
      </Stack>

      <SubmitButton fullWidth mt="xl" loading={isLoginLoading}>
        {t('identity.login')}
      </SubmitButton>
    </form>
  );
};

export default LoginForm;
