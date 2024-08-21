import { useAppDispatch, useAppSelector } from '#/services/store';

import { selectAuthAccount, selectIsGuest } from './auth.selectors';
import { clearAuth } from './auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const authAccount = useAppSelector(selectAuthAccount);
  const isGuest = useAppSelector(selectIsGuest);

  const logout = () => {
    return dispatch(clearAuth());
  };

  return { authAccount, isGuest, logout };
};
