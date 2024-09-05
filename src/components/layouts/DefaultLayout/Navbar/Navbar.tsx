import { AppShell, AppShellNavbarProps, RemoveScroll, ScrollArea, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { MAIN_ROUTES } from '#/services/navigation';
import { Can } from '#/services/permissions';

import ButtonNavLink from './ButtonNavLink';

import classes from './Navbar.module.scss';

interface NavbarProps extends AppShellNavbarProps {
  enabledRemoveScroll?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  enabledRemoveScroll = false,
  withBorder = true,
  ...rest
}) => {
  const { t } = useTranslation();

  const items = [
    {
      label: t('home'),
      to: MAIN_ROUTES.HOME,
      permissions: ['user', 'create'],
    },
    {
      label: t('settings'),
      to: MAIN_ROUTES.SETTINGS,
      permissions: ['user', 'create'],
    },
  ];

  return (
    <RemoveScroll enabled={enabledRemoveScroll}>
      <AppShell.Navbar withBorder={withBorder} {...rest}>
        <Text p="md" className={classes.header} mod={{ 'data-with-border': withBorder }}>
          {t('navbar.header')}
        </Text>

        <AppShell.Section component={ScrollArea} px="md" grow>
          {items.map(({ label, to, permissions }) => {
            const element = <ButtonNavLink to={to}>{label}</ButtonNavLink>;
            const subject = permissions[0];
            const action = permissions[1];

            if (permissions?.length > 0) {
              return (
                <Can key={to} I={action} a={subject}>
                  {element}
                </Can>
              );
            }

            return element;
          })}
        </AppShell.Section>

        <Text p="md" className={classes.footer} mod={{ 'data-with-border': withBorder }}>
          {t('navbar.footer')}
        </Text>
      </AppShell.Navbar>
    </RemoveScroll>
  );
};

export default Navbar;
