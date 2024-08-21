import { Navigate } from 'react-router-dom';

import { useAuth } from '#/services/auth';

import { MAIN_ROUTES } from './navigation.constants';

interface RouteInterceptorProps {
  authRequired?: boolean;
  guestRequired?: boolean;
}

const RouteInterceptor: React.FC<React.PropsWithChildren<RouteInterceptorProps>> = ({
  children,
  authRequired = false,
  guestRequired = false,
}) => {
  const { isGuest } = useAuth();

  if (guestRequired && !isGuest) {
    return <Navigate to={MAIN_ROUTES.HOME} replace />;
  }

  if (authRequired && isGuest) {
    return <Navigate to={MAIN_ROUTES.LOGIN} replace />;
  }

  return children;
};

export default RouteInterceptor;
