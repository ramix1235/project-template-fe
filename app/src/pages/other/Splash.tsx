import { Loader } from '@mantine/core';

import { DefaultLayout } from '#/components/layouts';

const Splash: React.FC = () => {
  return (
    <DefaultLayout disabled centered>
      <Loader size="lg" />
    </DefaultLayout>
  );
};

export default Splash;
