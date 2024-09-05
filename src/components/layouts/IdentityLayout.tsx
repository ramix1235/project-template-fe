import { Container, Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { DefaultLayout, DefaultLayoutProps } from '#/components/layouts';

const IdentityLayout: React.FC<DefaultLayoutProps> = (props) => {
  return (
    <DefaultLayout disabledNavbar disabledAside disabledPageHeader centered {...props}>
      <Container flex={1} size="xs" p={0}>
        <Paper p="lg" pos="relative" withBorder>
          <Outlet />
        </Paper>
      </Container>
    </DefaultLayout>
  );
};

export default IdentityLayout;
