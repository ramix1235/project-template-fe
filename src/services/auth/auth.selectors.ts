import { RootState } from '#/services/store';

export const selectAuthAccount = (state: RootState) => state.auth.authAccount;
export const selectIsGuest = (state: RootState) => state.auth.authAccount.token === null;
