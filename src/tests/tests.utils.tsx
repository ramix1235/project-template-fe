import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { screen } from '@testing-library/react';
import { Provider as StoreProvider } from 'react-redux';

import { mockedAllPermissions } from '#/mocks/api';
import { AuthAccount } from '#/services/auth';
import { PermissionsProvider } from '#/services/permissions';
import { AppStore, RootState, setupStore } from '#/services/store';
import { cssVariablesResolver, theme } from '#/services/theme';

export const MOCK_EMAIL = 'mock@mail.com';
export const MOCK_PASSWORD = 'Qwerty1!';

export const MOCK_AUTH_ACCOUNT: AuthAccount = {
  permissions: mockedAllPermissions,
  token: `mockToken-${Date.now()}`,
};
export const MOCK_GUEST_AUTH_ACCOUNT: AuthAccount = {
  permissions: [],
};

export const MOCK_API: RootState['api'] = {
  queries: {},
  mutations: {},
  subscriptions: {},
  provided: {},
  config: {
    reducerPath: 'api',
    online: true,
    focused: true,
    middlewareRegistered: false,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    keepUnusedDataFor: 60,
    invalidationBehavior: 'delayed',
  },
};

const baseHookResult = {
  originalArgs: undefined,
  data: undefined,
  error: undefined,
  endpointName: 'mock-endpointName',
  startedTimeStamp: Date.now() - 100,
  fulfilledTimeStamp: Date.now(),

  isUninitialized: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const spyMutationHook = (api: any, hookName: string, data: unknown) => {
  const trigger = vi.fn(() => ({
    data,
    error: undefined,

    requestId: 'mock-requestId',
    abort: vi.fn(),
    unwrap: vi.fn().mockResolvedValue(data),
    reset: vi.fn(),
  }));

  const result = {
    ...baseHookResult,
    data,
    reset: vi.fn(),
  };

  return vi.spyOn(api, hookName).mockReturnValue([trigger, result]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const spyQueryHook = (api: any, hookName: string, data: unknown) => {
  const result = {
    ...baseHookResult,
    data,
    currentData: undefined,
    requestId: 'mock-requestId',
    refetch: vi.fn(),
  };

  return vi.spyOn(api, hookName).mockReturnValue(result);
};

export const attachStore = (
  options: {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
  } = {},
) => {
  const { preloadedState = {}, store = setupStore(preloadedState) } = options;

  return {
    store,
    storeWrapper: (ui: React.ReactNode) => <StoreProvider store={store}>{ui}</StoreProvider>,
  };
};

export const attachMantine = (
  options: {
    attachNotificationsSystem?: boolean;
  } = {},
) => {
  const { attachNotificationsSystem = false } = options;

  return {
    mantineWrapper: (ui: React.ReactNode) => (
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        cssVariablesResolver={cssVariablesResolver}
      >
        {attachNotificationsSystem && <Notifications position="top-right" />}
        {ui}
      </MantineProvider>
    ),
  };
};

export const attachPermissions = () => {
  return {
    permissionsWrapper: (ui: React.ReactNode) => <PermissionsProvider>{ui}</PermissionsProvider>,
  };
};

export const hasFormAnyErrors = () => {
  const allParagraphs = screen.queryAllByRole('paragraph');
  const hasFormAnyErrors = allParagraphs.some((el) =>
    el.classList.contains('mantine-InputWrapper-error'),
  );

  return hasFormAnyErrors;
};
