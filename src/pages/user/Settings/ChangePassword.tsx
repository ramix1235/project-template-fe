import { Container, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { SetupPasswordFormType, SetupPasswordForm } from '#/components/forms';
import { PageHeaderToolbar } from '#/components/layouts';

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeaderToolbar>
        <Text ta="right" lineClamp={3}>
          {t('pageHeader.toolbar')}
        </Text>
      </PageHeaderToolbar>

      <Container p={0} size="xs">
        <SetupPasswordForm type={SetupPasswordFormType.Change} />
      </Container>
    </>
  );
};

export default ChangePassword;
