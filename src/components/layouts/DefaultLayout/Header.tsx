import { AppShell, AppShellHeaderProps, Burger, ElementProps, Group } from '@mantine/core';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { MAIN_ROUTES } from '#/services/navigation';

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

  return (
    <AppShell.Header {...rest}>
      <Group h="100%" justify="space-between" px="md">
        {!disabledNavbar && (
          <Burger opened={openedBurgerMenu} onClick={toggleBurgerMenu} hiddenFrom="md" />
        )}
        <Link to={MAIN_ROUTES.HOME}>
          <img
            className={clsx({ 'mantine-visible-from-md': !disabledNavbar })}
            src={viteLogo}
            alt={t('logo.alt')}
          />
        </Link>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
