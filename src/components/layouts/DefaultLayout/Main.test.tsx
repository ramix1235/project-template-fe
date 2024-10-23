import { AppShell } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { attachMantine } from '#/tests';

import Main from './Main';

import classes from './Main.module.scss';

describe('component: Main', () => {
  it('centers content according to the route setting', () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter([
      {
        path: '/',
        handle: {
          centered: true,
        },
        element: (
          <AppShell>
            <Main />
          </AppShell>
        ),
      },
    ]);

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const centeredMain = screen.getByRole('main');

    expect(centeredMain).toHaveClass(classes.centered);
  });
});
