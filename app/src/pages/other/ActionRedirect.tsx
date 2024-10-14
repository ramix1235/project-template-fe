import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate, useResolvedPath, useSearchParams } from 'react-router-dom';

import { SetupPasswordFormType } from '#/components/forms';
import {
  MockPostActivateAccountApiArg,
  MockPostChangeEmailConfirmApiArg,
  useMockPostActivateAccountMutation,
  useMockPostChangeEmailConfirmMutation,
} from '#/mocks/api';
import { Splash } from '#/pages/other';
import { useAuth } from '#/services/auth';
import { MAIN_ROUTES } from '#/services/navigation';
import { showSuccessNotification } from '#/services/notifications';

/*
  Handled cases:

  1. Account activation:
  - call activateAccount endpoint
  - show success/error notification about ACTIVATE account action
  - logout if user authorized
  - redirect to the Login page
  link: /action/account-activate?code={code}

  2. Account invitation:
  - logout if user authorized
  - put params to the route state
  - redirect to the SetupPassword page
  - show success/error notification about SETUP password action
  - on success redirect to the Login page with pre-populated email field
  link: /action/password-setup?code={code}&email={email}

  3. Password resetting:
  - logout if user authorized
  - put params to the route state
  - redirect to the SetupPassword page
  - show success/error notification about RESET password action
  - on success redirect to the Login page
  link: /action/password-setup?code={code}&type=reset

  4. Email updating:
  - call changeEmail endpoint
  - show success/error notification about UPDATE email action
  - logout if user authorized
  - redirect to the Login page
  link: /action/email-change?code={code}
*/

// TODO: Set your links and search params

const ActionRedirect: React.FC = () => {
  const isActionCalled = useRef(false);

  const [activateAccount] = useMockPostActivateAccountMutation(); // TODO: Set your hook
  const [changeEmail] = useMockPostChangeEmailConfirmMutation(); // TODO: Set your hook

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isGuest, authLogout } = useAuth();

  const resolvedPath = useResolvedPath('.');

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const email = searchParams.get('email');
  const type = searchParams.get('type');

  const isActivateAccountRedirect = useMatch(`${resolvedPath.pathname}/account-activate`);
  const isChangeEmailConfirmRedirect = useMatch(`${resolvedPath.pathname}/email-change`);
  const isSetupPasswordRedirect = useMatch(`${resolvedPath.pathname}/password-setup`);

  useEffect(() => {
    if (!isActionCalled.current) {
      isActionCalled.current = true;

      if (isActivateAccountRedirect) {
        // TODO: Set your payload
        const activateAccountPayload: MockPostActivateAccountApiArg = {
          code: code ?? '',
        };

        activateAccount(activateAccountPayload)
          .unwrap()
          .then(() => {
            showSuccessNotification({
              message: t('identity.activateAccount.notification.success'),
            });
          })
          .finally(() => {
            if (!isGuest) {
              authLogout();
            }

            navigate(MAIN_ROUTES.LOGIN, { replace: true });
          });
      } else if (isChangeEmailConfirmRedirect) {
        // TODO: Set your payload
        const changeEmailConfirmPayload: MockPostChangeEmailConfirmApiArg = {
          code: code ?? '',
        };

        changeEmail(changeEmailConfirmPayload)
          .unwrap()
          .then(() => {
            showSuccessNotification({
              message: t('identity.changeEmail.notification.success'),
            });
          })
          .finally(() => {
            if (!isGuest) {
              authLogout();
            }

            navigate(MAIN_ROUTES.LOGIN, { replace: true });
          });
      } else if (isSetupPasswordRedirect) {
        if (!isGuest) {
          authLogout();
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
    isGuest,
    isActivateAccountRedirect,
    isChangeEmailConfirmRedirect,
    isSetupPasswordRedirect,
    code,
    email,
    type,
    navigate,
    authLogout,
    activateAccount,
    changeEmail,
  ]);

  return <Splash />;
};

export default ActionRedirect;
