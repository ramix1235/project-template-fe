import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { API } from '#/services/api';
import { authReducer } from '#/services/auth';

import { globalErrorsHandler } from './store.middlewares';

const environments = import.meta.env;

const rootReducer = combineReducers({
  auth: authReducer,
  [API.reducerPath]: API.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([API.middleware, globalErrorsHandler]),
    preloadedState,
    devTools: environments.MODE === 'development',
  });

  // Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
