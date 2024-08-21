import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const environments = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: environments.VITE_API_URL,
});

export const API = createApi({
  baseQuery,
  endpoints: () => ({}),
});
