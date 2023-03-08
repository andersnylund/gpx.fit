import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { smoothen } from '~/smoothen';
import { RootState } from '~/store';
import { setSelectedRoute, setSmoothenedRoute } from './route';
import { setTreshold } from './treshold';

export const smoothenedRouteMiddleware = createListenerMiddleware<RootState>();

smoothenedRouteMiddleware.startListening({
  matcher: isAnyOf(setTreshold, setSelectedRoute),
  effect: (_, { dispatch, getState }) => {
    const {
      routes: { selectedRoute },
      treshold: { treshold },
    } = getState();
    if (selectedRoute && treshold) {
      const smoothenedRoute = smoothen(selectedRoute, treshold);
      dispatch(setSmoothenedRoute(smoothenedRoute));
    }
  },
});
