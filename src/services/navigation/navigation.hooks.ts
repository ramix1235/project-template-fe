import { useNavigate, To, NavigateOptions } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  const canGoBack = window.history.state?.idx > 0;

  const goBack = (options?: NavigateOptions) => {
    navigate(-1 as To, options);
  };

  return { canGoBack, goBack };
};