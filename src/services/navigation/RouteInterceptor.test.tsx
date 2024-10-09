import { act, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { clearAuth, setAuth } from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';
import {
  attachPermissions,
  attachStore,
  MOCK_AUTH_ACCOUNT,
  MOCK_GUEST_AUTH_ACCOUNT,
} from '#/tests';

import RouteInterceptor from './RouteInterceptor';

describe('component: RouteInterceptor', () => {
  it('redirects to the public page on logout', () => {
    const { store, storeWrapper } = attachStore({
      preloadedState: {
        auth: {
          authAccount: MOCK_AUTH_ACCOUNT,
        },
      },
    });
    const { permissionsWrapper } = attachPermissions();

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.LOGIN,
          element: (
            <RouteInterceptor guestRequired>
              <p>Public page</p>
            </RouteInterceptor>
          ),
        },
        {
          path: MAIN_ROUTES.HOME,
          element: (
            <RouteInterceptor authRequired>
              <p>Private page</p>
            </RouteInterceptor>
          ),
        },
      ],
      {
        initialEntries: [MAIN_ROUTES.HOME],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => storeWrapper(permissionsWrapper(children)),
    });

    const privatePageContent = screen.getByText(/private/i);

    expect(privatePageContent).toBeInTheDocument();

    act(() => store.dispatch(clearAuth()));

    const publicPageContent = screen.getByText(/public/i);

    expect(publicPageContent).toBeInTheDocument();
  });

  it('redirects to the private page on login', () => {
    const { store, storeWrapper } = attachStore({
      preloadedState: {
        auth: {
          authAccount: MOCK_GUEST_AUTH_ACCOUNT,
        },
      },
    });
    const { permissionsWrapper } = attachPermissions();

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.LOGIN,
          element: (
            <RouteInterceptor guestRequired>
              <p>Public page</p>
            </RouteInterceptor>
          ),
        },
        {
          path: MAIN_ROUTES.HOME,
          element: (
            <RouteInterceptor authRequired>
              <p>Private page</p>
            </RouteInterceptor>
          ),
        },
      ],
      {
        initialEntries: [MAIN_ROUTES.LOGIN],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => storeWrapper(permissionsWrapper(children)),
    });

    const publicPageContent = screen.getByText(/public/i);
    expect(publicPageContent).toBeInTheDocument();

    act(() => store.dispatch(setAuth({ account: MOCK_AUTH_ACCOUNT })));

    const privatePageContent = screen.getByText(/private/i);

    expect(privatePageContent).toBeInTheDocument();
  });

  it('redirects to the access denied page', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        errorElement: <div>Access denied page</div>,
        element: (
          <RouteInterceptor permissions={['user:create']}>
            <p>Permission page</p>
          </RouteInterceptor>
        ),
      },
    ]);

    // Mock console.error to silence permission error from RouteInterceptor
    const originalError = console.error;
    console.error = vi.fn();

    render(<RouterProvider router={router} />);

    // Restore console.error
    console.error = originalError;

    const accessDeniedPageContent = screen.getByText(/access/i);

    expect(accessDeniedPageContent).toBeInTheDocument();
  });
});
