import { TFunction } from 'i18next';
import { createBrowserRouter } from 'react-router-dom';

import { IdentityLayout, UserLayout } from '#/components/layouts';
import { ErrorBoundary, NotFound } from '#/pages/other';

import { MAIN_ROUTES } from './navigation.constants';
import RouteInterceptor from './RouteInterceptor';

/*
  Route handle prop together with useMatches hook provides data management tool between route and child components.

  Parameters:
  - centered?: boolean; - page content position. Default value: false.
  - title?: (t: TFunction) => React.ReactNode; - title component in the page header section
  - crumb?: (t: TFunction) => React.ReactNode; - crumb portion for breadcrumbs component in the page header section

  About useMatches: https://reactrouter.com/en/main/hooks/use-matches#usematches
*/

// TODO: Set your routes

const router = createBrowserRouter([
  {
    path: MAIN_ROUTES.HOME,
    errorElement: <ErrorBoundary />,
    element: (
      <RouteInterceptor authRequired>
        <UserLayout />
      </RouteInterceptor>
    ),
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
      {
        path: MAIN_ROUTES.DEBUG,
        handle: {
          title: (t: TFunction) => t('debug'),
          crumb: (t: TFunction) => t('debug'),
        },
        async lazy() {
          const { Debug } = await import('#/pages/user');

          return {
            element: (
              <RouteInterceptor permissions={['user:debug']}>
                <Debug />
              </RouteInterceptor>
            ),
          };
        },
      },
    ],
  },
  {
    errorElement: <ErrorBoundary />,
    element: (
      <RouteInterceptor guestRequired>
        <IdentityLayout />
      </RouteInterceptor>
    ),
    children: [
      {
        path: MAIN_ROUTES.LOGIN,
        async lazy() {
          const { Login } = await import('#/pages/identity');

          return { element: <Login /> };
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
