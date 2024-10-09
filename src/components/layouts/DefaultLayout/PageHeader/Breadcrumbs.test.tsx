import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TFunction } from 'i18next';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';

import { attachMantine } from '#/tests';

import Breadcrumbs from './Breadcrumbs';

describe('component: Breadcrumbs', () => {
  it('shows crumbs according to the nested routes', async () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter(
      [
        {
          path: '/parent-page',
          handle: {
            crumb: (t: TFunction) => t('crumb1'),
          },
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Breadcrumbs />,
            },
            {
              path: '/parent-page/child-page',
              handle: {
                crumb: (t: TFunction) => t('crumb2'),
              },
              element: <Breadcrumbs />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/parent-page/child-page'],
      },
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const parentCrumb = screen.getByRole('link', { name: 'crumb1' });
    const childCrumb = screen.getByRole('link', { name: 'crumb2' });

    expect(parentCrumb).toBeInTheDocument();
    expect(childCrumb).toBeInTheDocument();

    await userEvent.click(parentCrumb);

    expect(parentCrumb).toBeInTheDocument();
    expect(childCrumb).not.toBeInTheDocument();
  });
});
