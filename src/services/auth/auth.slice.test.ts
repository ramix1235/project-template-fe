import { MOCK_AUTH_ACCOUNT, MOCK_GUEST_AUTH_ACCOUNT } from '#/tests';

import { authReducer, setAuth, clearAuth, refreshAccess, AuthState } from './auth.slice';

describe('service: auth slice', () => {
  it('returns the initial state', () => {
    const initialState: AuthState = {
      authAccount: MOCK_GUEST_AUTH_ACCOUNT,
    };

    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('sets auth account', () => {
    const previousState: AuthState = {
      authAccount: MOCK_GUEST_AUTH_ACCOUNT,
    };

    expect(
      authReducer(
        previousState,
        setAuth({
          account: MOCK_AUTH_ACCOUNT,
        }),
      ),
    ).toEqual({
      authAccount: MOCK_AUTH_ACCOUNT,
    });
  });

  it('clears auth account', () => {
    const previousState: AuthState = {
      authAccount: MOCK_AUTH_ACCOUNT,
    };

    expect(authReducer(previousState, clearAuth())).toEqual({
      authAccount: MOCK_GUEST_AUTH_ACCOUNT,
    });
  });

  it('refreshes auth token', () => {
    const previousState: AuthState = {
      authAccount: MOCK_AUTH_ACCOUNT,
    };

    expect(authReducer(previousState, refreshAccess({ token: 'refreshedToken' }))).toEqual({
      authAccount: {
        token: 'refreshedToken',
        permissions: MOCK_AUTH_ACCOUNT.permissions,
      },
    });
  });
});
