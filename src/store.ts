import { configureStore } from '@reduxjs/toolkit';
import { routesReducer, RoutesState } from './features/route';
import { smoothenedRouteMiddleware } from './features/smoothened-route-middleware';
import { tresholdReducer, TresholdState } from './features/treshold';

export type RootState = {
  routes: RoutesState;
  treshold: TresholdState;
};

export const createStore = () =>
  configureStore({
    reducer: {
      routes: routesReducer,
      treshold: tresholdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(smoothenedRouteMiddleware.middleware),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
