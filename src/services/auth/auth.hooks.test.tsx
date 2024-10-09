import { act, renderHook } from '@testing-library/react';

import * as store from '#/services/store';
import { MOCK_AUTH_ACCOUNT } from '#/tests';

import { useAuth } from './auth.hooks';
import { clearAuth } from './auth.slice';

describe('service: auth hooks', () => {
  it('initiates logout action', () => {
    const mockDispatch = vi.fn();

    vi.spyOn(store, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(store, 'useAppSelector')
      .mockReturnValueOnce(MOCK_AUTH_ACCOUNT)
      .mockReturnValueOnce(false);

    const { result: useAuthResult } = renderHook(() => useAuth());

    act(() => useAuthResult.current.logout());

    expect(mockDispatch).toHaveBeenCalledWith(clearAuth());
  });
});
