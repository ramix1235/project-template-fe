import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { API } from '#/services/api';
import { authReducer } from '#/services/auth';

import { globalErrorsHandler } from './store.middlewares';

const environments = import.meta.env;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([API.middleware, globalErrorsHandler]),
  devTools: environments.MODE === 'development',
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
