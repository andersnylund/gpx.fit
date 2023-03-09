import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { smoothen } from '~/smoothen';
import { RootState } from '~/store';
import { setSelectedRoute, setSmoothenedRoute } from './route';
import { setThreshold } from './threshold';

export const smoothenedRouteMiddleware = createListenerMiddleware<RootState>();

smoothenedRouteMiddleware.startListening({
  matcher: isAnyOf(setThreshold, setSelectedRoute),
  effect: (_, { dispatch, getState }) => {
    const {
      routes: { selectedRoute },
      threshold: { threshold },
    } = getState();
    if (selectedRoute && threshold) {
      const smoothenedRoute = smoothen(selectedRoute, threshold);
      dispatch(setSmoothenedRoute(smoothenedRoute));
    }
  },
});
