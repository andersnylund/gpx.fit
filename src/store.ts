import { configureStore } from '@reduxjs/toolkit';
import { routesReducer } from './features/route';
import { tresholdReducer } from './features/treshold';

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    treshold: tresholdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
