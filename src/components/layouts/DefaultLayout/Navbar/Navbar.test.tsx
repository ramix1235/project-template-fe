import { AppShell } from '@mantine/core';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { setAuth } from '#/services/auth';
import * as permissions from '#/services/permissions';
import { attachMantine, attachPermissions, attachStore, MOCK_AUTH_ACCOUNT } from '#/tests';

import Navbar from './Navbar';

describe('component: Navbar', () => {
  it('displays with header and footer borders', () => {
    const { mantineWrapper } = attachMantine();

    vi.spyOn(permissions, 'Can').mockImplementation(({ children }) => <>{children}</>);

    render(
      <AppShell>
        <Navbar />
      </AppShell>,
      {
        wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
      },
    );

    const navbarHeaderContent = screen.getByText('navbar.header');

    expect(navbarHeaderContent).toHaveAttribute('data-with-border', 'true');
  });

  it('displays without header and footer borders', () => {
    const { mantineWrapper } = attachMantine();

    vi.spyOn(permissions, 'Can').mockImplementation(({ children }) => <>{children}</>);

    render(
      <AppShell>
        <Navbar withBorder={false} />
      </AppShell>,
      {
        wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
      },
    );

    const navbarHeaderContent = screen.getByText('navbar.header');

    expect(navbarHeaderContent).not.toHaveAttribute('data-with-border');
  });

  it('hides/displays navigation buttons according to the permissions', () => {
    const { store, storeWrapper } = attachStore({
      preloadedState: {
        auth: {
          authAccount: MOCK_AUTH_ACCOUNT,
        },
      },
    });
    const { mantineWrapper } = attachMantine();
    const { permissionsWrapper } = attachPermissions();

    render(
      <AppShell>
        <Navbar />
      </AppShell>,
      {
        wrapper: ({ children }) =>
          storeWrapper(mantineWrapper(permissionsWrapper(<MemoryRouter>{children}</MemoryRouter>))),
      },
    );

    const homeButtonNavLink = screen.getByRole('link', { name: 'home' });
    const settingsButtonNavLink = screen.getByRole('link', { name: 'settings' });

    expect(homeButtonNavLink).toBeInTheDocument();
    expect(settingsButtonNavLink).toBeInTheDocument();

    act(() =>
      store.dispatch(setAuth({ account: { ...MOCK_AUTH_ACCOUNT, permissions: ['user:useless'] } })),
    );

    expect(homeButtonNavLink).not.toBeInTheDocument();
    expect(settingsButtonNavLink).not.toBeInTheDocument();
  });
});
