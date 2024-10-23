import { act, renderHook } from '@testing-library/react';

import * as store from '#/services/store';
import { MOCK_AUTH_ACCOUNT, MOCK_GUEST_AUTH_ACCOUNT } from '#/tests';

import { useAuth } from './auth.hooks';
import { clearAuth, setAuth } from './auth.slice';

describe('service: auth hooks', () => {
  it('initiates login action', () => {
    const mockDispatch = vi.fn();

    vi.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(store, 'useAppSelector')
      .mockReturnValueOnce(MOCK_GUEST_AUTH_ACCOUNT)
      .mockReturnValueOnce(true);

    const { result: useAuthResult } = renderHook(() => useAuth());

    act(() => useAuthResult.current.authLogin(MOCK_AUTH_ACCOUNT));

    expect(mockDispatch).toHaveBeenCalledWith(setAuth({ authAccount: MOCK_AUTH_ACCOUNT }));
  });

  it('initiates logout action', () => {
    const mockDispatch = vi.fn();

    vi.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(store, 'useAppSelector')
      .mockReturnValueOnce(MOCK_AUTH_ACCOUNT)
      .mockReturnValueOnce(false);

    const { result: useAuthResult } = renderHook(() => useAuth());

    act(() => useAuthResult.current.authLogout());

    expect(mockDispatch).toHaveBeenCalledWith(clearAuth());
  });
});
