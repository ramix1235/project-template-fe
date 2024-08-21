import { AppShell, AppShellFooterProps, ElementProps, Group, useMatches } from '@mantine/core';

import { LocaleSelect, ThemeSelect } from '#/components/base';

interface FooterProps
  extends AppShellFooterProps,
    ElementProps<'footer', keyof AppShellFooterProps> {}

const Footer: React.FC<FooterProps> = (props) => {
  const justify = useMatches({
    base: 'center',
    md: 'end',
  });

  return (
    <AppShell.Footer {...props}>
      <Group h="100%" justify={justify} px="md">
        <ThemeSelect size="xs" />
        <LocaleSelect size="xs" />
      </Group>
    </AppShell.Footer>
  );
};

export default Footer;
