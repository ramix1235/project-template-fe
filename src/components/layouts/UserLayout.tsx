import { Outlet } from 'react-router-dom';

import { DefaultLayout } from '#/components/layouts';

const UserLayout: React.FC = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default UserLayout;
