import { act, renderHook, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

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

    const { result: useGoBackResult } = renderHook(() => useGoBack(), { wrapper: Wrapper });

    const secondPageContent = screen.getByText(/second/i);

    expect(secondPageContent).toBeInTheDocument();

    // Mock window.history.length = 2 to avoid fallback redirection since MemoryRouter doesn't interact with window.history
    const originHistoryLength = window.history.length;
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 2,
    });

    act(() => useGoBackResult.current.goBack());

    // Restore window.history.length
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: originHistoryLength,
    });

    const firstPageContent = screen.getByText(/first/i);

    expect(firstPageContent).toBeInTheDocument();
  });

  it('navigates to the fallback page', () => {
    const Wrapper = ({ children }: React.PropsWithChildren) => {
      const router = createMemoryRouter(
        [
          {
            path: '/current-page',
            element: (
              <div>
                <p>Current page</p>
                {children}
              </div>
            ),
          },
          {
            path: '/fallback-page',
            element: <p>Fallback page</p>,
          },
        ],
        {
          initialEntries: ['/current-page'],
        },
      );

      return <RouterProvider router={router} />;
    };

    const { result: useGoBackResult } = renderHook(() => useGoBack(), { wrapper: Wrapper });

    const currentPageContent = screen.getByText(/current/i);

    expect(currentPageContent).toBeInTheDocument();

    act(() => useGoBackResult.current.goBack('/fallback-page'));

    const fallbackPageContent = screen.getByText(/fallback/i);

    expect(fallbackPageContent).toBeInTheDocument();
  });
});
