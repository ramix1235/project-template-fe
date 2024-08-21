import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAuth } from '#/services/auth';

interface LogoutButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
  const { t } = useTranslation();

  const { logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <Button variant="light" onClick={handleLogoutClick} {...props}>
      {t('identity.logout')}
    </Button>
  );
};

export default LogoutButton;
