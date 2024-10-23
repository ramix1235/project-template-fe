import { render, screen } from '@testing-library/react';

import * as navigation from '#/services/navigation';
import { attachMantine } from '#/tests';

import BackButton from './BackButton';

describe('component: BackButton', () => {
  it('enabled when can go back', async () => {
    const { mantineWrapper } = attachMantine();

    const mockGoBack = vi.fn();

    vi.spyOn(navigation, 'useGoBack').mockReturnValue({
      canGoBack: true,
      goBack: mockGoBack,
    });

    render(<BackButton />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const backButton = screen.getByRole('button');

    expect(backButton).toBeEnabled();
  });

  it('disabled when cannot go back', async () => {
    const { mantineWrapper } = attachMantine();

    const mockGoBack = vi.fn();

    vi.spyOn(navigation, 'useGoBack').mockReturnValue({
      canGoBack: false,
      goBack: mockGoBack,
    });

    render(<BackButton />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const backButton = screen.getByRole('button');

    expect(backButton).toBeDisabled();
  });
});
