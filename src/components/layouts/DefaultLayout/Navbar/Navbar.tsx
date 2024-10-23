import {
  AppShell,
  AppShellNavbarProps,
  RemoveScroll,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
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
  ...props
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
      <AppShell.Navbar withBorder={withBorder} {...props}>
        <Text mod={{ 'data-with-border': withBorder }} className={classes.header}>
          {t('navbar.header')}
        </Text>

        <AppShell.Section component={ScrollArea} grow>
          <Stack p="md">
            {items.map(({ label, to, permissions }) => {
              const element = <ButtonNavLink to={to}>{label}</ButtonNavLink>;

              if (permissions?.length > 0) {
                const subject = permissions[0];
                const action = permissions[1];

                return (
                  <Can key={to} I={action} a={subject}>
                    {element}
                  </Can>
                );
              }

              return element;
            })}
          </Stack>
        </AppShell.Section>

        <Text mod={{ 'data-with-border': withBorder }} className={classes.footer}>
          {t('navbar.footer')}
        </Text>
      </AppShell.Navbar>
    </RemoveScroll>
  );
};

export default Navbar;
