import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { DefaultLayout } from '#/components/layouts';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout disabledNavbar disabledAside disabledPageHeader centered>
      <Container ta="center">
        <Title>{t('errors.title')}</Title>

        <Text size="lg" c="dimmed">
          {t('errors.404.title')}
        </Text>
      </Container>
    </DefaultLayout>
  );
};

export default NotFound;
