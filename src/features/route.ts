import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RoutesState {
  route?: Coordinate[];
  selectedRoute?: Coordinate[];
}

const initialState: RoutesState = {};

export const counterSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.route = action.payload;
    },
    setSelectedRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const { setRoute, setSelectedRoute } = counterSlice.actions;
export const routesReducer = counterSlice.reducer;
