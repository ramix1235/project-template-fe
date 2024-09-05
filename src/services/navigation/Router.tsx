import { TFunction } from 'i18next';
import { createBrowserRouter } from 'react-router-dom';

import { IdentityLayout, UserLayout } from '#/components/layouts';
import { ErrorBoundary, NotFound } from '#/pages/other';

import { MAIN_ROUTES, SETTINGS_ROUTES } from './navigation.constants';
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
      <RouteInterceptor authRequired permissions={['user:create']}>
        <UserLayout />
      </RouteInterceptor>
    ),
    children: [
      {
        index: true,
        handle: {
          title: (t: TFunction) => t('home'),
          crumb: (t: TFunction) => t('home'),
        },
        async lazy() {
          const { Home } = await import('#/pages/user');

          return {
            element: <Home />,
          };
        },
      },
      {
        path: MAIN_ROUTES.SETTINGS,
        handle: {
          centered: true,
          title: (t: TFunction) => t('settings'),
          crumb: (t: TFunction) => t('settings'),
        },
        children: [
          {
            index: true,
            async lazy() {
              const { Settings } = await import('#/pages/user');

              return { element: <Settings /> };
            },
          },
          {
            path: SETTINGS_ROUTES.CHANGE_EMAIL,
            handle: {
              title: (t: TFunction) => t('settings.changeEmail'),
              crumb: (t: TFunction) => t('settings.changeEmail'),
            },
            async lazy() {
              const { ChangeEmail } = await import('#/pages/user');

              return { element: <ChangeEmail /> };
            },
          },
          {
            path: SETTINGS_ROUTES.CHANGE_PASSWORD,
            handle: {
              title: (t: TFunction) => t('settings.changePassword'),
              crumb: (t: TFunction) => t('settings.changePassword'),
            },
            async lazy() {
              const { ChangePassword } = await import('#/pages/user');

              return { element: <ChangePassword /> };
            },
          },
        ],
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
      {
        path: MAIN_ROUTES.REGISTER,
        async lazy() {
          const { Register } = await import('#/pages/identity');

          return { element: <Register /> };
        },
      },
      {
        path: MAIN_ROUTES.RESET_PASSWORD,
        async lazy() {
          const { ResetPassword } = await import('#/pages/identity');

          return { element: <ResetPassword /> };
        },
      },
      {
        path: MAIN_ROUTES.SETUP_PASSWORD,
        async lazy() {
          const { SetupPassword } = await import('#/pages/identity');

          return { element: <SetupPassword /> };
        },
      },
    ],
  },
  {
    path: MAIN_ROUTES.ACTION_REDIRECT,
    errorElement: <ErrorBoundary />,
    async lazy() {
      const { ActionRedirect } = await import('#/pages/other');

      return { element: <ActionRedirect /> };
    },
  },
  {
    path: '*',
    errorElement: <ErrorBoundary />,
    element: <NotFound />,
  },
]);

export default router;
