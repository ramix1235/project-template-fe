import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text mb="md" size="lg" fw="bold">
        {t('identity.resetPassword')}
      </Text>

      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
