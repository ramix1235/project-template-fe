import { act, render, screen } from '@testing-library/react';
import { TFunction } from 'i18next';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';

import { attachMantine } from '#/tests';

import PageTitle from './PageTitle';

describe('component: PageTitle', () => {
  it('shows title according to the nested routes', async () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter(
      [
        {
          path: '/parent-page',
          element: <Outlet />,
          children: [
            {
              index: true,
              handle: {
                title: (t: TFunction) => t('title1'),
              },
              element: (
                <div>
                  <PageTitle />
                  <p>Parent page</p>
                </div>
              ),
            },
            {
              path: '/parent-page/child-page',
              handle: {
                title: (t: TFunction) => t('title2'),
              },
              element: (
                <div>
                  <PageTitle />
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

    const title = screen.getByRole('heading');

    expect(title).toHaveTextContent(/title2/);

    await act(() => router.navigate('/parent-page'));

    expect(title).toHaveTextContent(/title1/);
  });
});
