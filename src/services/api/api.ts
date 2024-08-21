import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '#/services/store';

const environments = import.meta.env;

// TODO: Set your auth logic
// Refresh token example: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery

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

export const API = createApi({
  baseQuery,
  endpoints: () => ({}),
});
