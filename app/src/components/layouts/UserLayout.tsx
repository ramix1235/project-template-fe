import { Outlet } from 'react-router-dom';

import { DefaultLayout, DefaultLayoutProps } from '#/components/layouts';

const UserLayout: React.FC<DefaultLayoutProps> = (props) => {
  return (
    <DefaultLayout {...props}>
      <Outlet />
    </DefaultLayout>
  );
};

export default UserLayout;
