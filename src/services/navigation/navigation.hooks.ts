import { useNavigate, To, NavigateOptions } from 'react-router-dom';

import { MAIN_ROUTES } from './navigation.constants';

export const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = (fallbackTo: To = MAIN_ROUTES.HOME, options?: NavigateOptions) => {
    const canGoBack = window.history.length > 1;

    navigate(canGoBack ? (-1 as To) : fallbackTo, options);
  };

  return { goBack };
};
