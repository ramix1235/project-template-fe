import { Container } from '@mantine/core';

import { SetupPasswordFormType, SetupPasswordForm } from '#/components/forms';

const ChangePassword: React.FC = () => {
  return (
    <Container size="xs" p={0}>
      <SetupPasswordForm type={SetupPasswordFormType.Change} />
    </Container>
  );
};

export default ChangePassword;
