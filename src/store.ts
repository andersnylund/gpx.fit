import { configureStore } from '@reduxjs/toolkit';
import { routesReducer, RoutesState } from './features/route';
import { smoothenedRouteMiddleware } from './features/smoothened-route-middleware';
import { thresholdReducer, ThresholdState } from './features/threshold';

export type RootState = {
  routes: RoutesState;
  threshold: ThresholdState;
};

export const createStore = () =>
  configureStore({
    reducer: {
      routes: routesReducer,
      threshold: thresholdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(smoothenedRouteMiddleware.middleware),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
