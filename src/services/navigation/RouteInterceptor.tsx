import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAuth } from '#/services/auth';
import { usePermissions } from '#/services/permissions';

import { MAIN_ROUTES } from './navigation.constants';

interface RouteInterceptorProps {
  authRequired?: boolean;
  guestRequired?: boolean;
  permissions?: string[];
}

const RouteInterceptor: React.FC<React.PropsWithChildren<RouteInterceptorProps>> = ({
  children,
  authRequired = false,
  guestRequired = false,
  permissions = [],
}) => {
  const { t } = useTranslation();
  const ability = usePermissions();

  const { isGuest } = useAuth();

  if (guestRequired && !isGuest) {
    return <Navigate to={MAIN_ROUTES.HOME} replace />;
  }

  if (authRequired && isGuest) {
    return <Navigate to={MAIN_ROUTES.LOGIN} replace />;
  }

  if (permissions.length > 0) {
    const hasPermissions = permissions.every((permission) => {
      const [subject, action] = permission.split(':');

      return ability.can(action, subject);
    });

    if (!hasPermissions) {
      throw new Error(t('errors.permission'));
    }
  }

  return children;
};

export default RouteInterceptor;
