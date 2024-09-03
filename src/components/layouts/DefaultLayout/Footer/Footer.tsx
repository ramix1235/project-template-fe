import { AppShell, AppShellFooterProps, ElementProps, Group } from '@mantine/core';

import { LocaleSelect, ThemeSelect } from '#/components/base';

import classes from './Footer.module.scss';

interface FooterProps
  extends AppShellFooterProps,
    ElementProps<'footer', keyof AppShellFooterProps> {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <AppShell.Footer {...props}>
      <Group wrap="nowrap" h="100%" px="md" className={classes.container}>
        <ThemeSelect size="xs" />
        <LocaleSelect size="xs" />
      </Group>
    </AppShell.Footer>
  );
};

export default Footer;
