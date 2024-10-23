import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { attachMantine } from '#/tests';

import ButtonNavLink from './ButtonNavLink';

import classes from './ButtonNavLink.module.scss';

describe('component: ButtonNavLink', () => {
  it('activates/inactivates button status according to the current route', async () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter(
      [
        {
          path: '/first-page',
          element: (
            <div>
              <ButtonNavLink to="/first-page">First page</ButtonNavLink>,
              <ButtonNavLink to="/second-page">Second page</ButtonNavLink>
            </div>
          ),
        },
        {
          path: '/second-page',
          element: (
            <div>
              <ButtonNavLink to="/first-page">First page</ButtonNavLink>,
              <ButtonNavLink to="/second-page">Second page</ButtonNavLink>
            </div>
          ),
        },
      ],
      {
        initialEntries: ['/first-page'],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const firstPageButtonNavLink = screen.getByRole('link', { name: /first/i });
    const secondPageButtonNavLink = screen.getByRole('link', { name: /second/i });

    expect(firstPageButtonNavLink).toHaveClass(classes.active);
    expect(secondPageButtonNavLink).not.toHaveClass(classes.active);

    await userEvent.click(secondPageButtonNavLink);

    expect(firstPageButtonNavLink).not.toHaveClass(classes.active);
    expect(secondPageButtonNavLink).toHaveClass(classes.active);
  });
});
