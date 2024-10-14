import { useAppDispatch, useAppSelector } from '#/services/store';

import { AuthAccount } from './auth.account';
import { selectAuthAccount, selectIsGuest } from './auth.selectors';
import { clearAuth, setAuth } from './auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectAuthAccount);
  const isGuest = useAppSelector(selectIsGuest);

  const authLogin = (authAccount: AuthAccount) => {
    return dispatch(setAuth({ authAccount }));
  };

  const authLogout = () => {
    return dispatch(clearAuth());
  };

  return { authAccount: account, isGuest, authLogin, authLogout };
};
