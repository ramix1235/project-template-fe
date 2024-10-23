import { notifications } from '@mantine/notifications';
import { act, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import * as auth from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';
import { attachMantine, MOCK_EMAIL, MOCK_GUEST_AUTH_ACCOUNT, spyMutationHook } from '#/tests';

import ActionRedirect from './ActionRedirect';

describe('component: ActionRedirect', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostActivateAccountMutation', {
      isSuccess: true,
    });
    spyMutationHook(mockApi, 'useMockPostChangeEmailConfirmMutation', {
      isSuccess: true,
    });
    vi.spyOn(auth, 'useAuth').mockReturnValue({
      authAccount: MOCK_GUEST_AUTH_ACCOUNT,
      isGuest: true,
      authLogin: vi.fn(),
      authLogout: vi.fn(),
    });
  });

  afterEach(() => {
    act(() => {
      notifications.clean();
    });
  });

  it('account activation has success redirection and notification', async () => {
    const { mantineWrapper } = attachMantine({ attachNotificationsSystem: true });

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.ACTION_REDIRECT,
          element: <ActionRedirect />,
        },
        {
          path: MAIN_ROUTES.LOGIN,
          element: <p>Login page</p>,
        },
      ],
      {
        initialEntries: ['/action/account-activate?code=mockCode'],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const successNotification = await screen.findByText(
      'identity.activateAccount.notification.success',
    );

    expect(successNotification).toBeInTheDocument();

    const loginPageContent = screen.getByText(/login/i);

    expect(loginPageContent).toBeInTheDocument();
  });

  it('account invitation has correct redirection', async () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.ACTION_REDIRECT,
          element: <ActionRedirect />,
        },
        {
          path: MAIN_ROUTES.SETUP_PASSWORD,
          element: <p>Setup password page</p>,
        },
      ],
      {
        initialEntries: [`/action/password-setup?code=mockCode&email=${MOCK_EMAIL}`],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const setupPasswordPageContent = screen.getByText(/setup password/i);

    expect(setupPasswordPageContent).toBeInTheDocument();
  });

  it('password resetting has correct redirection', async () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.ACTION_REDIRECT,
          element: <ActionRedirect />,
        },
        {
          path: MAIN_ROUTES.SETUP_PASSWORD,
          element: <p>Setup password page</p>,
        },
      ],
      {
        initialEntries: ['/action/password-setup?code=mockCode&type=reset'],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const setupPasswordPageContent = screen.getByText(/setup password/i);

    expect(setupPasswordPageContent).toBeInTheDocument();
  });

  it('email updating has success redirection and notification', async () => {
    const { mantineWrapper } = attachMantine({ attachNotificationsSystem: true });

    const router = createMemoryRouter(
      [
        {
          path: MAIN_ROUTES.ACTION_REDIRECT,
          element: <ActionRedirect />,
        },
        {
          path: MAIN_ROUTES.LOGIN,
          element: <p>Login page</p>,
        },
      ],
      {
        initialEntries: ['/action/email-change?code=mockCode'],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const successNotification = await screen.findByText(
      'identity.changeEmail.notification.success',
    );

    expect(successNotification).toBeInTheDocument();

    const loginPageContent = screen.getByText(/login/i);

    expect(loginPageContent).toBeInTheDocument();
  });
});
