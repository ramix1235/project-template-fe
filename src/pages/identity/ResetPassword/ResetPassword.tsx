import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text size="lg" fw="bold" mb="md">
        {t('identity.resetPassword')}
      </Text>

      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
