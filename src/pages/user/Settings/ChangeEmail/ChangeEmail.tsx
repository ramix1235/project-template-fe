import { Container, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { PageHeaderToolbar } from '#/components/layouts';

import ChangeEmailForm from './ChangeEmailForm';

const ChangeEmail: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeaderToolbar>
        <Text lineClamp={1}>{t('pageHeader.toolbar')}</Text>
      </PageHeaderToolbar>

      <Container size="xs" p={0}>
        <ChangeEmailForm />
      </Container>
    </>
  );
};

export default ChangeEmail;
