import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthAccount, clearAuthAccount, getAuthAccount, setAuthAccount } from './authAccount';

export interface AuthState {
  authAccount: AuthAccount;
}

const initialState: AuthState = {
  authAccount: getAuthAccount(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ account: AuthAccount }>) => {
      setAuthAccount(action.payload.account);

      state.authAccount = getAuthAccount();
    },
    clearAuth: (state) => {
      clearAuthAccount();

      state.authAccount = getAuthAccount();
    },
    refreshAccess: (
      state,
      action: PayloadAction<{
        token: AuthAccount['token'];
      }>,
    ) => {
      const { token } = action.payload;

      const updatedAccount = {
        ...state.authAccount,
        token,
      };

      setAuthAccount(updatedAccount);

      state.authAccount = getAuthAccount();
    },
  },
});

export const { setAuth, clearAuth, refreshAccess } = authSlice.actions;

export const authReducer = authSlice.reducer;
