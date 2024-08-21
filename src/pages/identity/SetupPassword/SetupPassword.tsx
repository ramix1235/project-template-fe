import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { SetupPasswordForm } from '#/components/forms';

const SetupPassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text size="lg" fw="bold" mb="md">
        {t('identity.setupPassword')}
      </Text>

      <SetupPasswordForm />
    </>
  );
};

export default SetupPassword;
