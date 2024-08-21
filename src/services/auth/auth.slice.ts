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
    // TODO: It was created to debug permissions
    temporaryChangePermissions: (state, action: PayloadAction<AuthAccount['permissions']>) => {
      state.authAccount.permissions = action.payload;
    },
  },
});

export const { setAuth, clearAuth, temporaryChangePermissions } = authSlice.actions;

export const authReducer = authSlice.reducer;
