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

    // Mock window.history.length = 2 to avoid fallback redirection since MemoryRouter doesn't interact with window.history
    const originHistoryLength = window.history.length;
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 2,
    });

    const { result: useGoBackResult } = renderHook(() => useGoBack(), { wrapper: Wrapper });

    const secondPageContent = screen.getByText(/second/i);

    expect(secondPageContent).toBeInTheDocument();

    expect(useGoBackResult.current.canGoBack).toBe(true);

    act(() => useGoBackResult.current.goBack());

    const firstPageContent = screen.getByText(/first/i);

    expect(firstPageContent).toBeInTheDocument();

    // Restore window.history.length
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: originHistoryLength,
    });
  });

  it('cannot navigates to the previous page', () => {
    const { result: useGoBackResult } = renderHook(() => useGoBack(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(useGoBackResult.current.canGoBack).toBe(false);
  });
});
