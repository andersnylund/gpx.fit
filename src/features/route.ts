import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const coordinateSchema = z.object({
  elevation: z.number().optional(),
  latitude: z.string().transform((lat) => parseFloat(lat)),
  longitude: z.string().transform((lat) => parseFloat(lat)),
  timestamp: z.string().optional(),
});

export type Coordinate = z.infer<typeof coordinateSchema>;

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
