import { Container, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '#/components/base';
import { SETTINGS_ROUTES } from '#/services/navigation';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    {
      label: t('settings.changeEmail'),
      to: SETTINGS_ROUTES.CHANGE_EMAIL,
    },
    {
      label: t('settings.changePassword'),
      to: SETTINGS_ROUTES.CHANGE_PASSWORD,
    },
  ];

  return (
    <Container flex={1} size="xs" p={0}>
      <Stack>
        {items.map(({ label, to }) => (
          <ButtonLink key={to} fullWidth variant="light" to={to}>
            {label}
          </ButtonLink>
        ))}
      </Stack>
    </Container>
  );
};

export default Settings;
