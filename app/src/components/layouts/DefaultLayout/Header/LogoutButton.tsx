import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAuth } from '#/services/auth';

interface LogoutButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
  const { t } = useTranslation();

  const { authLogout } = useAuth();

  return (
    <Button variant="light" onClick={authLogout} {...props}>
      {t('identity.logout')}
    </Button>
  );
};

export default LogoutButton;
