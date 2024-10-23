import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import * as auth from '#/services/auth';
import { attachMantine, MOCK_AUTH_ACCOUNT } from '#/tests';

import LogoutButton from './LogoutButton';

describe('component: LogoutButton', () => {
  it('initiates logout action', async () => {
    const { mantineWrapper } = attachMantine();

    const mockLogout = vi.fn();

    vi.spyOn(auth, 'useAuth').mockReturnValue({
      authAccount: MOCK_AUTH_ACCOUNT,
      isGuest: false,
      authLogin: vi.fn(),
      authLogout: mockLogout,
    });

    render(<LogoutButton />, { wrapper: ({ children }) => mantineWrapper(children) });

    const logoutButton = screen.getByRole('button');

    await userEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
