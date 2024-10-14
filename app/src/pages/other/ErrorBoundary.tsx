import { Button, Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { DefaultLayout } from '#/components/layouts';
import { getErrorText } from '#/services/errors';

const ErrorBoundary: React.FC = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <DefaultLayout disabledNavbar disabledAside disabledPageHeader centered>
      <Container ta="center">
        <Title>{t('errors.title')}</Title>

        <Text c="red">{getErrorText(error)}</Text>

        <Button variant="light" mt="lg" onClick={handleReloadClick}>
          {t('common.reload')}
        </Button>
      </Container>
    </DefaultLayout>
  );
};

export default ErrorBoundary;
