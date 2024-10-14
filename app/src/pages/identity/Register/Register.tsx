import { Divider, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { GoogleButton, FacebookButton } from '#/components/forms';

import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text mb="md" size="lg" fw="bold">
        {t('identity.title', { type: t('identity.register') })}
      </Text>

      <Group grow>
        <GoogleButton radius="xl">{t('common.google')}</GoogleButton>
        <FacebookButton radius="xl">{t('common.facebook')}</FacebookButton>
      </Group>

      <Divider my="lg" label={t('identity.orEmail')} labelPosition="center" />

      <RegisterForm />
    </>
  );
};

export default Register;
