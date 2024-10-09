import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TFunction } from 'i18next';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';

import { attachMantine } from '#/tests';

import CrumbBackButton from './CrumbBackButton';

describe('component: CrumbBackButton', () => {
  it('navigates to the previous crumb', async () => {
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
              element: (
                <div>
                  <p>Parent page</p>
                </div>
              ),
            },
            {
              path: '/parent-page/child-page',
              handle: {
                crumb: (t: TFunction) => t('crumb2'),
              },
              element: (
                <div>
                  <CrumbBackButton />
                  <p>Child page</p>
                </div>
              ),
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

    const crumbBackButton = screen.getByRole('button');
    const childPageContent = screen.getByText(/child/i);

    expect(childPageContent).toBeInTheDocument();

    await userEvent.click(crumbBackButton);

    const parentPageContent = screen.getByText(/parent/i);

    expect(parentPageContent).toBeInTheDocument();
  });
});
