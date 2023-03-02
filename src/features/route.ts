import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RoutesState {
  route?: Coordinate[];
  selectedRoute?: Coordinate[];
  smoothenedRoute?: Coordinate[];
}

const initialState: RoutesState = {};

const counterSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.route = action.payload;
      state.selectedRoute = undefined;
      state.smoothenedRoute = undefined;
    },
    setSelectedRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.selectedRoute = action.payload;
    },
    setSmoothenedRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.smoothenedRoute = action.payload;
    },
  },
});

export const { setRoute, setSelectedRoute, setSmoothenedRoute } = counterSlice.actions;
export const routesReducer = counterSlice.reducer;
