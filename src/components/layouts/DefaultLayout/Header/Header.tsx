import { AppShell, AppShellHeaderProps, Burger, Group, Image } from '@mantine/core';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { HEADER_LOGO_SIZE } from '#/components';
import { AnchorLink } from '#/components/base';
import { useAuth } from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';

import LogoutButton from './LogoutButton';

import viteLogo from '/vite.svg';

import classes from './Header.module.scss';

interface HeaderProps extends AppShellHeaderProps {
  disabledNavbar?: boolean;
  openedBurgerMenu: boolean;
  toggleBurgerMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  className,
  disabledNavbar = false,
  openedBurgerMenu,
  toggleBurgerMenu,
  ...props
}) => {
  const { t } = useTranslation();

  const { isGuest } = useAuth();

  return (
    <AppShell.Header className={clsx(classes.root, className)} {...props}>
      <Group h="100%" justify="space-between" wrap="nowrap">
        <Group gap="xs" wrap="nowrap">
          <AnchorLink to={MAIN_ROUTES.HOME}>
            <Image
              src={viteLogo}
              width={HEADER_LOGO_SIZE}
              height={HEADER_LOGO_SIZE}
              alt={t('common.logo')}
            />
          </AnchorLink>

          {!disabledNavbar && (
            <Burger hiddenFrom="md" opened={openedBurgerMenu} onClick={toggleBurgerMenu} />
          )}
        </Group>

        {!isGuest && <LogoutButton />}
      </Group>
    </AppShell.Header>
  );
};

export default Header;
