import { TFunction } from 'i18next';
import { createBrowserRouter } from 'react-router-dom';

import { UserLayout } from '#/components/layouts';
import { ErrorBoundary, NotFound } from '#/pages/other';

import { MAIN_ROUTES } from './navigation.constants';

// TODO: Set your routes

const router = createBrowserRouter([
  {
    path: MAIN_ROUTES.HOME,
    errorElement: <ErrorBoundary />,
    element: <UserLayout />,
    children: [
      {
        index: true,
        handle: {
          centered: true,
          title: (t: TFunction) => t('home'),
          crumb: (t: TFunction) => t('home'),
        },
        async lazy() {
          const { Home } = await import('#/pages/user');

          return { element: <Home /> };
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
