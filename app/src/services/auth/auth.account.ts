import { getItem, removeItem, setItem } from '#/services/webStorage';

// TODO: Set your Auth Account interface based on auth data

export interface AuthAccount {
  permissions: string[];
  token?: string | null;
}

const guestAuthAccount: AuthAccount = {
  permissions: [],
};

export const WEB_STORAGE_ACCOUNT = 'authAccount';

export const setAuthAccount = (authAccount: AuthAccount) => {
  setItem(WEB_STORAGE_ACCOUNT, JSON.stringify(authAccount));
};

export const getAuthAccount = () => {
  const rawAuthAccount = getItem(WEB_STORAGE_ACCOUNT);

  const authAccount = rawAuthAccount
    ? (JSON.parse(rawAuthAccount) as AuthAccount)
    : guestAuthAccount;

  return authAccount;
};

export const clearAuthAccount = () => {
  removeItem(WEB_STORAGE_ACCOUNT);
};
