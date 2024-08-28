import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { clearAuth, refreshAccess } from '#/services/auth';
import { ErrorCodes } from '#/services/errors';
import { MockPostRefreshTokenApiArg, MockPostRefreshTokenApiResponse } from '#/services/mock';
import { RootState } from '#/services/store';

const environments = import.meta.env;

/*
  Multiple unauthorized errors handling: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors

  However, the Mutex cannot synchronize multiple browser tabs, so the problem may occur again.
  A possible case may be restoring tabs when opening the browser. In this case, a user will be logged out of all tabs.
*/

// TODO: Set your auth logic

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: environments.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const authAccount = (getState() as RootState).auth.authAccount;

    if (authAccount.token) {
      headers.set('Authorization', `Bearer ${authAccount.token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === ErrorCodes.Unauthorized) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      const authAccount = (api.getState() as RootState).auth.authAccount;

      const refreshPayload: MockPostRefreshTokenApiArg = {
        token: authAccount.token ?? '',
      };

      try {
        const refreshResult = await baseQuery(
          {
            url: '/refresh', // TODO: Set your url
            method: 'POST',
            body: refreshPayload,
          },
          api,
          extraOptions,
        );

        if (refreshResult.data && typeof refreshResult.data === 'object') {
          const { token } = refreshResult.data as MockPostRefreshTokenApiResponse;

          api.dispatch(refreshAccess({ token }));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearAuth());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
