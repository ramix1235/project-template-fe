import { AppShell, AppShellHeaderProps, Burger, ElementProps, Group, Image } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LOGO_SIZE } from '#/components';
import { useAuth } from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';

import LogoutButton from './LogoutButton';

import viteLogo from '/vite.svg';

interface HeaderProps
  extends AppShellHeaderProps,
    ElementProps<'header', keyof AppShellHeaderProps> {
  disabledNavbar?: boolean;
  openedBurgerMenu: boolean;
  toggleBurgerMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  disabledNavbar = false,
  openedBurgerMenu,
  toggleBurgerMenu,
  ...rest
}) => {
  const { t } = useTranslation();

  const { isGuest } = useAuth();

  return (
    <AppShell.Header {...rest}>
      <Group wrap="nowrap" h="100%" justify="space-between" px="md">
        <Group wrap="nowrap" gap="xs">
          <Link to={MAIN_ROUTES.HOME}>
            <Image src={viteLogo} width={LOGO_SIZE} height={LOGO_SIZE} alt={t('common.logo')} />
          </Link>

          {!disabledNavbar && (
            <Burger opened={openedBurgerMenu} onClick={toggleBurgerMenu} hiddenFrom="md" />
          )}
        </Group>

        {!isGuest && <LogoutButton />}
      </Group>
    </AppShell.Header>
  );
};

export default Header;
