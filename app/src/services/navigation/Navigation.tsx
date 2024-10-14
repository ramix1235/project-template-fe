import { RouterProvider, RouterProviderProps } from 'react-router-dom';

import { Splash } from '#/pages/other';

import Router from './Router';

const Navigation: React.FC<Omit<RouterProviderProps, 'router'>> = (props) => {
  return <RouterProvider router={Router} fallbackElement={<Splash />} {...props} />;
};

export default Navigation;
