import { Loader } from '@mantine/core';

import { DefaultLayout } from '#/components/layouts';

const Splash: React.FC = () => {
  return (
    <DefaultLayout disabled centered>
      <Loader />
    </DefaultLayout>
  );
};

export default Splash;
