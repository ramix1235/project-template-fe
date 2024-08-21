import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate, useResolvedPath, useSearchParams } from 'react-router-dom';

import { SetupPasswordFormType } from '#/components/forms';
import { Splash } from '#/pages/other';
import { CreateUserApiArg, useCreateUserMutation } from '#/services/api/user';
import { useAuth } from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';
import { showErrorNotification, showSuccessNotification } from '#/services/notifications';

/*
  Handled cases:

  1. Account activation:
  - call makeAction endpoint
  - show success/error notification about ACTIVATE account action
  - logout if user authorized
  - redirect to the Login page
  link: /action/email-confirm?code={code}

  2. Account invitation:
  - put params to the route state
  - logout if user authorized
  - redirect to the SetupPassword page
  - show success/error notification about SET password action
  - on success redirect to the Login page with pre-populated email field
  link: /action/password-setup?code={code}&email={email}

  3. Email updating:
  - call makeAction endpoint
  - show success/error notification about UPDATE email action
  - logout if user authorized
  - redirect to the Login page
  link: /action/email-confirm?code={code}&type=update

  4. Password resetting:
  - put params to the route state
  - logout if user authorized
  - redirect to the SetupPassword page
  - show success/error notification about RESET password action
  - on success redirect to the Login page
  link: /action/password-setup?code={code}&type=reset
*/

const ActionRedirect: React.FC = () => {
  const isActionCalled = useRef(false);

  const [makeAction] = useCreateUserMutation(); // TODO: Set your hook

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isGuest, logout } = useAuth();

  const resolvedPath = useResolvedPath('.');
  const [searchParams] = useSearchParams();

  const isEmailConfirmRedirect = useMatch(`${resolvedPath.pathname}/email-confirm`);
  const isPasswordSetupRedirect = useMatch(`${resolvedPath.pathname}/password-setup`);

  useEffect(() => {
    if (!isActionCalled.current) {
      isActionCalled.current = true;

      const code = searchParams.get('code') ?? '';
      const type = searchParams.get('type') ?? '';

      // Set your payload
      const actionPayload: CreateUserApiArg = {
        user: {
          username: code,
        },
      };

      if (isEmailConfirmRedirect) {
        makeAction(actionPayload)
          .unwrap()
          .then(() => {
            const isEmailUpdate = type === 'update';
            const message = isEmailUpdate
              ? t('identity.emailConfirm.update.notification.success')
              : t('identity.emailConfirm.activate.notification.success');

            showSuccessNotification({ message });
          })
          .catch((error: unknown) => showErrorNotification(error))
          .finally(() => {
            if (isGuest) {
              navigate(MAIN_ROUTES.LOGIN, { replace: true });
            } else {
              logout();
            }
          });
      } else if (isPasswordSetupRedirect) {
        const email = searchParams.get('email') ?? '';

        if (!isGuest) {
          logout();
        }

        navigate(MAIN_ROUTES.SETUP_PASSWORD, {
          replace: true,
          state: {
            code,
            email,
            type: type === 'reset' ? SetupPasswordFormType.Reset : SetupPasswordFormType.Setup,
          },
        });
      }
    }
  }, [
    t,
    searchParams,
    isGuest,
    isEmailConfirmRedirect,
    isPasswordSetupRedirect,
    navigate,
    logout,
    makeAction,
  ]);

  return <Splash />;
};

export default ActionRedirect;
