import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import * as navigation from '#/services/navigation';
import { attachMantine } from '#/tests';

import BackButton from './BackButton';

describe('component: BackButton', () => {
  it('initiates a redirect to the default fallback path on click', async () => {
    const { mantineWrapper } = attachMantine();

    const mockGoBack = vi.fn();

    vi.spyOn(navigation, 'useGoBack').mockReturnValue({
      goBack: mockGoBack,
    });

    render(<BackButton />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const backButton = screen.getByRole('button');

    await userEvent.click(backButton);

    expect(mockGoBack).toHaveBeenCalledWith(navigation.MAIN_ROUTES.HOME);
  });

  it('initiates a redirect to the specified fallback path on click', async () => {
    const { mantineWrapper } = attachMantine();

    const mockGoBack = vi.fn();

    vi.spyOn(navigation, 'useGoBack').mockReturnValue({
      goBack: mockGoBack,
    });

    render(<BackButton fallbackTo="/fallback-page" />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const backButton = screen.getByRole('button');

    await userEvent.click(backButton);

    expect(mockGoBack).toHaveBeenCalledWith('/fallback-page');
  });
});
