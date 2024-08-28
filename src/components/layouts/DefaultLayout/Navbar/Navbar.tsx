import { AppShell, AppShellNavbarProps, ElementProps, ScrollArea, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { MAIN_ROUTES } from '#/services/navigation';
import { Can } from '#/services/permissions';

import NavButton from './NavButton';

import classes from './Navbar.module.scss';

interface NavbarProps extends AppShellNavbarProps, ElementProps<'div', keyof AppShellNavbarProps> {}

const Navbar: React.FC<NavbarProps> = ({ withBorder = true, ...rest }) => {
  const { t } = useTranslation();

  return (
    <AppShell.Navbar withBorder={withBorder} {...rest}>
      <Text p="md" className={classes.header} mod={{ 'data-with-border': withBorder }}>
        {t('navbar.header')}
      </Text>

      <AppShell.Section component={ScrollArea} px="md" grow>
        <Can I="create" a="user">
          <NavButton to={MAIN_ROUTES.HOME}>{t('home')}</NavButton>
        </Can>
        <Can I="create" a="user">
          <NavButton to={MAIN_ROUTES.SETTINGS}>{t('settings')}</NavButton>
        </Can>
      </AppShell.Section>

      <Text p="md" className={classes.footer} mod={{ 'data-with-border': withBorder }}>
        {t('navbar.footer')}
      </Text>
    </AppShell.Navbar>
  );
};

export default Navbar;
