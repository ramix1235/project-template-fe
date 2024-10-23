import { act, renderHook, screen } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';

import { useGoBack } from './navigation.hooks';

describe('service: navigation hooks', () => {
  it('navigates to the previous page', () => {
    const Wrapper = ({ children }: React.PropsWithChildren) => {
      const router = createMemoryRouter(
        [
          {
            path: '/first-page',
            element: <p>First page</p>,
          },
          {
            path: '/second-page',
            element: (
              <div>
                <p>Second page</p>
                {children}
              </div>
            ),
          },
        ],
        {
          initialEntries: ['/first-page', '/second-page'],
        },
      );

      return <RouterProvider router={router} />;
    };

    // Push history state since MemoryRouter doesn't interact with window.history
    const originURL = window.location.href;

    window.history.pushState({ idx: 1 }, '', '/first-page');
    window.history.pushState({ idx: 2 }, '', '/second-page');

    const { result: useGoBackResult } = renderHook(() => useGoBack(), { wrapper: Wrapper });

    const secondPageContent = screen.getByText(/second/i);

    expect(secondPageContent).toBeInTheDocument();

    expect(useGoBackResult.current.canGoBack).toBe(true);

    act(() => useGoBackResult.current.goBack());

    // Restore history state
    window.history.replaceState(null, '', originURL);

    const firstPageContent = screen.getByText(/first/i);

    expect(firstPageContent).toBeInTheDocument();
  });

  it('cannot navigates to the previous page', () => {
    const { result: useGoBackResult } = renderHook(() => useGoBack(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(useGoBackResult.current.canGoBack).toBe(false);
  });
});
