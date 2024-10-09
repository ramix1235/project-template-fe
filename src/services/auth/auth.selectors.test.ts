import { RootState } from '#/services/store';
import { MOCK_API, MOCK_AUTH_ACCOUNT, MOCK_GUEST_AUTH_ACCOUNT } from '#/tests';

import { selectAuthAccount, selectIsGuest } from './auth.selectors';

describe('service: auth selectors', () => {
  it('selects account', () => {
    const state: RootState = {
      auth: {
        authAccount: MOCK_AUTH_ACCOUNT,
      },
      api: MOCK_API,
    };

    const authAccount = selectAuthAccount(state);

    expect(authAccount).toEqual(MOCK_AUTH_ACCOUNT);
  });

  it('selects negative guest status', () => {
    const state: RootState = {
      auth: {
        authAccount: MOCK_AUTH_ACCOUNT,
      },
      api: MOCK_API,
    };

    const isGuest = selectIsGuest(state);

    expect(isGuest).toBe(false);
  });

  it('selects positive guest status', () => {
    const state: RootState = {
      auth: {
        authAccount: MOCK_GUEST_AUTH_ACCOUNT,
      },
      api: MOCK_API,
    };

    const isGuest = selectIsGuest(state);

    expect(isGuest).toBe(true);
  });
});
