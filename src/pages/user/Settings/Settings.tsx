import { Button, Container, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SETTINGS_ROUTES } from '#/services/navigation';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container flex={1} size="xs" p={0}>
      <Stack>
        <Button component={Link} fullWidth variant="light" to={SETTINGS_ROUTES.CHANGE_EMAIL}>
          {t('settings.changeEmail')}
        </Button>
        <Button component={Link} fullWidth variant="light" to={SETTINGS_ROUTES.CHANGE_PASSWORD}>
          {t('settings.changePassword')}
        </Button>
      </Stack>
    </Container>
  );
};

export default Settings;
