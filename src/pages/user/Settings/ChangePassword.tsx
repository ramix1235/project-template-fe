import { Container, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { SetupPasswordFormType, SetupPasswordForm } from '#/components/forms';
import { PageHeaderToolbar } from '#/components/layouts';

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeaderToolbar>
        <Text lineClamp={1}>{t('pageHeader.toolbar')}</Text>
      </PageHeaderToolbar>

      <Container size="xs" p={0}>
        <SetupPasswordForm type={SetupPasswordFormType.Change} />
      </Container>
    </>
  );
};

export default ChangePassword;
