import { AppShell, AppShellFooterProps, Group } from '@mantine/core';
import { clsx } from 'clsx';

import { LocaleSelect, ThemeSelect } from '#/components/base';

import classes from './Footer.module.scss';

const Footer: React.FC<AppShellFooterProps> = ({ className, ...props }) => {
  return (
    <AppShell.Footer className={clsx(classes.root, className)} {...props}>
      <Group h="100%" wrap="nowrap" className={classes.container}>
        <ThemeSelect size="xs" />
        <LocaleSelect size="xs" />
      </Group>
    </AppShell.Footer>
  );
};

export default Footer;
