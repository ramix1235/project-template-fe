import { Container, Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { DefaultLayout } from '#/components/layouts';

const IdentityLayout: React.FC = () => {
  return (
    <DefaultLayout disabledNavbar disabledAside disabledPageHeader centered>
      <Container flex={1} size="xs" p={0}>
        <Paper p="lg" pos="relative" withBorder>
          <Outlet />
        </Paper>
      </Container>
    </DefaultLayout>
  );
};

export default IdentityLayout;
